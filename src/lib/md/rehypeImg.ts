import { execSync } from "child_process"
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

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov"]

/**
 * Get video dimensions using ffprobe. Falls back gracefully if ffprobe
 * is not installed or the file cannot be probed.
 */
const getVideoSize = (
  src: string,
  dir: string
): { width: number; height: number } | undefined => {
  if (absolutePathRegex.exec(src)) {
    return
  }
  const shouldJoin = !path.isAbsolute(src) || src.startsWith("/")
  let filePath = src
  if (dir && shouldJoin) {
    filePath = path.join(dir, src)
  }
  try {
    const output = execSync(
      `ffprobe -v quiet -select_streams v:0 -show_entries stream=width,height -of csv=p=0:s=x "${filePath}"`,
      { encoding: "utf8", timeout: 5000 }
    ).trim()
    const [w, h] = output.split("x").map(Number)
    if (w && h) return { width: w, height: h }
  } catch {
    // ffprobe not available or failed — dimensions will be omitted
  }
  return undefined
}

const getImageSize = (src: string, dir: string) => {
  if (absolutePathRegex.exec(src)) {
    return
  }
  // Treat `/` as a relative path, according to the server
  const shouldJoin = !path.isAbsolute(src) || src.startsWith("/")

  if (dir && shouldJoin) {
    src = path.join(dir, src)
  }
  return sizeOf(src)
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
