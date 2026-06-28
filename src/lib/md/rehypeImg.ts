import fs from "fs"
import path from "path"

import sizeOf from "image-size"
import { getPlaiceholder } from "plaiceholder"
import { visit } from "unist-util-visit"

import { getHashFromBuffer } from "@/lib/utils/crypto"
import {
  checkIfImageIsTranslated,
  getTranslatedImgPath,
} from "@/lib/utils/i18n"

import { DEFAULT_LOCALE, PLACEHOLDER_IMAGE_DIR } from "@/lib/constants"

import { toPosixPath } from "../utils/relativePath"

interface Options {
  dir: string
  srcPath: string
  locale: string
}

type ImageNode = {
  type: "element"
  tagName: "img"
  properties: {
    src: string
    height?: number
    width?: number
    aspectRatio?: number
    blurDataURL?: string
    placeholder?: "blur" | "empty"
  }
}

type Path = string

type Placeholder = {
  hash: string
  base64: string
}

type PlaceholderData = Record<Path, Placeholder>

/**
 * Handles:
 * "//"
 * "http://"
 * "https://"
 * "ftp://"
 */
const absolutePathRegex = /^(?:[a-z]+:)?\/\//

// Video clips are authored as `![](./x.mp4)`. Orientation is chosen by the
// renderer from a `-portrait` filename suffix; for ISO-BMFF containers we also
// probe intrinsic dimensions (below) so the rendered element can reserve layout
// space and avoid CLS, and so we can skip image-only steps (blur placeholders).
const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov"]

// Subset of `VIDEO_EXTENSIONS` that `getVideoSize` can parse (ISO base media
// file format). `.webm` is Matroska/EBML — recognized as video for rendering,
// but not probed here (falls back to intrinsic CSS sizing).
const ISO_BMFF_EXTENSIONS = [".mp4", ".mov"]

// Guard against OOM if an oversized clip is ever committed: skip probing files
// larger than this (short UI clips are well under 1 MB).
const MAX_PROBE_BYTES = 64 * 1024 * 1024

// Memoize probed dimensions per build: the same clip is compiled across every
// locale and twice per page (content + metadata). Keyed by path + size + mtime
// so edits in `next dev` aren't served stale.
const videoSizeCache = new Map<
  string,
  { width: number; height: number } | undefined
>()

// Resolve a markdown src against the page's source dir, mirroring `getImageSize`.
// Returns undefined for remote (`http(s)://`, `//`) sources.
const resolveLocalPath = (src: string, dir: string): string | undefined => {
  if (absolutePathRegex.exec(src)) return undefined
  // Treat `/` as a relative path, according to the server
  const shouldJoin = !path.isAbsolute(src) || src.startsWith("/")
  return dir && shouldJoin ? path.join(dir, src) : src
}

const getImageSize = (src: string, dir: string) => {
  const resolved = resolveLocalPath(src, dir)
  if (!resolved) return
  return sizeOf(resolved)
}

// Read intrinsic pixel dimensions from an mp4/mov `tkhd` (track header) box in
// pure JS. `image-size` can't read video, and shelling out to `ffprobe` isn't
// safe to rely on in the build image. Walks only the `moov > trak > tkhd` path;
// the track's display dimensions are always the final two 16.16 fixed-point
// fields of `tkhd`. The whole file is read because `moov` may sit at the tail
// (non-`+faststart` clips); a value within ~1px from the pixel-aspect ratio is
// fine since it only seeds the reserved box. Does not account for a rotation
// matrix (our clips aren't rotated). Fail-safe: returns undefined on any parse
// issue, so the renderer falls back to intrinsic CSS sizing without breaking
// the build.
const getVideoSize = (
  src: string,
  dir: string
): { width: number; height: number } | undefined => {
  const resolved = resolveLocalPath(src, dir)
  if (!resolved) return undefined
  // Only ISO-BMFF is parseable here; webm et al. fall back to CSS sizing.
  if (!ISO_BMFF_EXTENSIONS.includes(path.extname(resolved).toLowerCase())) {
    return undefined
  }
  try {
    const { size, mtimeMs } = fs.statSync(resolved)
    if (size > MAX_PROBE_BYTES) return undefined
    const cacheKey = `${resolved}:${size}:${mtimeMs}`
    if (videoSizeCache.has(cacheKey)) return videoSizeCache.get(cacheKey)

    const result = parseIsoBmffSize(fs.readFileSync(resolved))
    videoSizeCache.set(cacheKey, result)
    return result
  } catch {
    return undefined
  }
}

// Parse the first visual track's dimensions from an ISO-BMFF buffer; see
// `getVideoSize` for the contract. Throws are caught by the caller.
const parseIsoBmffSize = (
  buf: Buffer
): { width: number; height: number } | undefined => {
  // Find the first child box of `type` within [start, end); returns its
  // payload range [contentStart, boxEnd], or undefined.
  const findBox = (
    start: number,
    end: number,
    type: string
  ): [number, number] | undefined => {
    let offset = start
    while (offset + 8 <= end) {
      let size = buf.readUInt32BE(offset)
      const boxType = buf.toString("ascii", offset + 4, offset + 8)
      // size === 1 means a 64-bit largesize follows; our clips never need it.
      if (size === 1) return undefined
      if (size === 0) size = end - offset // extends to container end
      if (size < 8 || offset + size > end) return undefined
      if (boxType === type) return [offset + 8, offset + size]
      offset += size
    }
    return undefined
  }

  const moov = findBox(0, buf.length, "moov")
  if (!moov) return undefined

  let cursor = moov[0]
  while (cursor < moov[1]) {
    const trak = findBox(cursor, moov[1], "trak")
    if (!trak) break
    const tkhd = findBox(trak[0], trak[1], "tkhd")
    if (tkhd) {
      const width = buf.readUInt32BE(tkhd[1] - 8) / 65536
      const height = buf.readUInt32BE(tkhd[1] - 4) / 65536
      // Skip non-visual tracks (audio tkhd carries 0x0).
      if (width > 0 && height > 0) {
        return { width: Math.round(width), height: Math.round(height) }
      }
    }
    cursor = trak[1]
  }
  return undefined
}

/**
 * Sets image placeholders for the given array of images.
 *
 * @param images - The array of images to set placeholders for.
 * @param srcPath - The source page path for the images.
 * @returns A promise that resolves to void.
 */
const setImagePlaceholders = async (
  images: ImageNode[],
  srcPath: string
): Promise<void> => {
  // Generate kebab-case filename from srcPath, ie: /content/nft => content-nft-data.json
  const FILENAME = toPosixPath(path.join(srcPath, "data.json"))
    .replaceAll("/", "-")
    .slice(1)

  // Make directory for current page if none exists
  if (!fs.existsSync(PLACEHOLDER_IMAGE_DIR))
    fs.mkdirSync(PLACEHOLDER_IMAGE_DIR, { recursive: true })

  const DATA_PATH = path.join(PLACEHOLDER_IMAGE_DIR, FILENAME)
  const existsCache = fs.existsSync(DATA_PATH)
  const placeholdersCached: PlaceholderData = existsCache
    ? JSON.parse(fs.readFileSync(DATA_PATH, "utf8"))
    : {}
  let isChanged = false

  // Generate placeholder for internal images
  for (const image of images) {
    const { src } = image.properties

    // Skip externally hosted images
    if (src.startsWith("http")) continue

    // Load image data from file system as buffer
    const buffer: Buffer = fs.readFileSync(path.join("public", src))

    // Get hash fingerprint of image data (no security implications; fast algorithm prioritized)
    const hash = await getHashFromBuffer(buffer, {
      algorithm: "SHA-1",
      length: 8,
    })

    // Look for cached placeholder data with matching hash
    const cachedPlaceholder: Placeholder | null =
      placeholdersCached[src]?.hash === hash ? placeholdersCached[src] : null

    // Get base64 from cached placeholder if available, else generate new placeholder
    const { base64 } =
      cachedPlaceholder || (await getPlaiceholder(buffer, { size: 16 }))

    // Assign base64 placeholder data to image node `blurDataURL` property
    image.properties.blurDataURL = base64
    image.properties.placeholder = "blur"

    // If cached value was not available, add newly generated placeholder data
    if (!cachedPlaceholder) {
      placeholdersCached[src] = { hash, base64 }
      isChanged = true
    }
  }

  // If cache is still empty, delete JSON file and return
  if (Object.keys(placeholdersCached).length === 0) {
    fs.rmSync(DATA_PATH, { recursive: true, force: true })
    return
  }

  // If cached value has not changed, return without writing to file system
  if (!isChanged) return

  // Write results to cache file
  fs.writeFileSync(DATA_PATH, JSON.stringify(placeholdersCached, null, 2))
}

/**
 * NOTE: source code copied from the `rehype-img-size` plugin and adapted to our
 * needs. https://github.com/ksoichiro/rehype-img-size
 *
 * Set local image size, aspect ratio, and full src path properties to img tags.
 *
 * @param options.dir Directory to resolve image file path
 * @param options.srcDir Directory where the image src attr is going to point
 */

const rehypeImg = (options: Options) => {
  const opts = options || {}
  const dir = opts.dir
  const srcPath = opts.srcPath
  const locale = opts.locale

  return async (tree) => {
    // Instantiate an empty array for image nodes
    const images: ImageNode[] = []

    visit(tree, "element", (node) => {
      if (node.tagName === "img" && node.properties) {
        const src = node.properties.src as string
        const ext = path.extname(src).toLowerCase()
        const isVideo = VIDEO_EXTENSIONS.includes(ext)

        // `image-size` can't read video, so use the mp4 `tkhd` reader for clips.
        // Both yield intrinsic width/height the renderer uses to reserve space.
        const dimensions = isVideo
          ? getVideoSize(src, dir)
          : getImageSize(src, dir)

        // Skip non-video files that have no detectable dimensions
        if (!dimensions && !isVideo) {
          return
        }

        // Replace slashes from windows paths with forward slashes
        const originalPath = path.join(srcPath, src).replace(/\\/g, "/")
        const translatedImgPath = getTranslatedImgPath(originalPath, locale)
        const imageIsTranslated = checkIfImageIsTranslated(translatedImgPath)

        // If translated image exists and current locale is not 'en', use it instead of original
        node.properties.src =
          imageIsTranslated && locale !== DEFAULT_LOCALE
            ? translatedImgPath
            : originalPath

        if (dimensions) {
          node.properties.width = dimensions.width
          node.properties.height = dimensions.height
          node.properties.aspectRatio =
            (dimensions.width || 1) / (dimensions.height || 1)
        }

        // Only generate blur placeholders for images, not videos
        if (!isVideo) {
          images.push(node)
        }
      }
    })

    await setImagePlaceholders(images, srcPath)
  }
}

export default rehypeImg
