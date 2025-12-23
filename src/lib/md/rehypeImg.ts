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
import { loadImageBuffer } from "@/lib/utils/image"

import { DEFAULT_LOCALE, PLACEHOLDER_IMAGE_DIR } from "@/lib/constants"

import { toPosixPath } from "../utils/relativePath"

interface Options {
  dir: string
  srcPath: string
  locale: string
}

interface ImageData {
  buffer: Buffer
  width: number
  height: number
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

type Placeholder = {
  hash: string
  base64: string
}

type PlaceholderData = Record<string, Placeholder>

const absolutePathRegex = /^(?:[a-z]+:)?\/\//

/**
 * Load image with dimensions using shared buffer loader.
 */
async function loadImageWithDimensions(
  publicPath: string
): Promise<ImageData | null> {
  const buffer = await loadImageBuffer(publicPath)
  if (!buffer) return null

  try {
    const dims = sizeOf(buffer)
    if (dims.width && dims.height) {
      return { buffer, width: dims.width, height: dims.height }
    }
    return null
  } catch {
    return null
  }
}

interface ProcessedImage {
  node: ImageNode
  buffer: Buffer
}

/**
 * Generate blur placeholders for processed images.
 */
async function setImagePlaceholders(
  images: ProcessedImage[],
  srcPath: string
): Promise<void> {
  if (images.length === 0) return

  const FILENAME = toPosixPath(path.join(srcPath, "data.json"))
    .replaceAll("/", "-")
    .slice(1)

  // Check if we can use the filesystem cache
  const canUseCache = fs.existsSync("public")
  let placeholdersCached: PlaceholderData = {}
  let DATA_PATH = ""

  if (canUseCache) {
    if (!fs.existsSync(PLACEHOLDER_IMAGE_DIR)) {
      fs.mkdirSync(PLACEHOLDER_IMAGE_DIR, { recursive: true })
    }
    DATA_PATH = path.join(PLACEHOLDER_IMAGE_DIR, FILENAME)
    if (fs.existsSync(DATA_PATH)) {
      placeholdersCached = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"))
    }
  }

  let isChanged = false

  for (const { node, buffer } of images) {
    const { src } = node.properties
    if (src.startsWith("http")) continue

    const hash = await getHashFromBuffer(buffer, {
      algorithm: "SHA-1",
      length: 8,
    })

    const cached =
      placeholdersCached[src]?.hash === hash ? placeholdersCached[src] : null
    const { base64 } = cached || (await getPlaiceholder(buffer, { size: 16 }))

    node.properties.blurDataURL = base64
    node.properties.placeholder = "blur"

    if (!cached) {
      placeholdersCached[src] = { hash, base64 }
      isChanged = true
    }
  }

  if (!canUseCache || !isChanged) return

  if (Object.keys(placeholdersCached).length === 0) {
    fs.rmSync(DATA_PATH, { recursive: true, force: true })
    return
  }

  fs.writeFileSync(DATA_PATH, JSON.stringify(placeholdersCached, null, 2))
}

/**
 * Rehype plugin to set image dimensions, src paths, and blur placeholders.
 * Loads images from local filesystem or CDN fallback for serverless.
 */
const rehypeImg = (options: Options) => {
  const { dir, srcPath, locale } = options

  return async (tree) => {
    const pendingImages: Array<{ node: ImageNode; src: string }> = []

    visit(tree, "element", (node) => {
      if (node.tagName === "img" && node.properties) {
        const src = node.properties.src as string
        if (!absolutePathRegex.exec(src)) {
          pendingImages.push({ node: node as ImageNode, src })
        }
      }
    })

    const processedImages: ProcessedImage[] = []

    for (const { node, src } of pendingImages) {
      const imagePath =
        path.isAbsolute(src) && !src.startsWith("/") ? src : path.join(dir, src)

      // Always set the absolute src path (so relative paths don't break in browser)
      const originalPath = path.join(srcPath, src).replace(/\\/g, "/")
      const translatedImgPath = getTranslatedImgPath(originalPath, locale)
      const imageIsTranslated = checkIfImageIsTranslated(translatedImgPath)

      node.properties.src =
        imageIsTranslated && locale !== DEFAULT_LOCALE
          ? translatedImgPath
          : originalPath

      // Try to load image for dimensions and blur placeholder
      const imageData = await loadImageWithDimensions(imagePath)
      if (!imageData) continue

      node.properties.width = imageData.width
      node.properties.height = imageData.height
      node.properties.aspectRatio = imageData.width / imageData.height

      processedImages.push({ node, buffer: imageData.buffer })
    }

    await setImagePlaceholders(processedImages, srcPath)
  }
}

export default rehypeImg
