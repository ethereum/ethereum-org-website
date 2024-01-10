import fs from "fs"
import path from "path"

import type { Root } from "hast"
import sizeOf from "image-size"
import { getPlaiceholder } from "plaiceholder"
import type { Plugin } from "unified"
import { visit } from "unist-util-visit"

import {
  checkIfImageIsTranslated,
  getTranslatedImgPath,
} from "@/lib/utils/i18n"

import { DEFAULT_LOCALE } from "../constants"

interface Options {
  dir: string
  srcPath: string
  locale: string
}

type ImageNode = {
  type: 'element'
  tagName: 'img'
  properties: {
    src: string
    height?: number
    width?: number
    aspectRatio?: number
    blurDataURL?: string
    placeholder?: 'blur' | 'empty'
  }
}

/**
 * Handles:
 * "//"
 * "http://"
 * "https://"
 * "ftp://"
 */
const absolutePathRegex = /^(?:[a-z]+:)?\/\//

const generateInternalImagePlaceholder = async (node: ImageNode): Promise<string> => {
  const buffer: Buffer = fs.readFileSync(path.join("public", node.properties.src))
  return (await getPlaiceholder(buffer)).base64
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

const setImagePlaceholders = async (images: ImageNode[], srcPath: string) => {
  const DATA_DIR = path.join("src/data/placeholders", srcPath)
  // Create placeholder data directory for current page if none exists
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })

  const DATA_PATH = path.join(DATA_DIR, "data.json")
  // Create placeholder data file if none exists
  if (!fs.existsSync(DATA_PATH)) fs.writeFileSync(DATA_PATH, "{}")

  const placeholdersCached = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"))
  const placeholdersClone = structuredClone(placeholdersCached)
  // Generate placeholder for internal images (requires async/await; keep this at the end outside of the visit function)
  for (const image of images) {
    const { src } = image.properties

    // Skip externally hosted images
    if (src.startsWith("http")) continue

    // Look for cached placeholder data
    const cachedPlaceholder: string | undefined = placeholdersClone[src]
    // Assign cached placeholder data if available, else generate new placeholder
    const base64 = cachedPlaceholder || await generateInternalImagePlaceholder(image)
    // Assign base64 placeholder data to image node `blurDataURL` property
    image.properties.blurDataURL = base64
    // If cached value was not available, add newly generated placeholder data to clone
    if (!cachedPlaceholder) {
      placeholdersClone[src] = base64
    }
  }
  const isEmpty = Object.keys(placeholdersClone).length === 0
  if (isEmpty) {
    fs.rmSync(DATA_PATH)
    return
  }
  const isUnchanged = JSON.stringify(placeholdersCached) === JSON.stringify(placeholdersClone)
  if (isUnchanged) return

  // Write placeholdersClone to DATA_PATH as JSON
  fs.writeFileSync(DATA_PATH, JSON.stringify(placeholdersClone, null, 2))
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

const setImageSize: Plugin<[Options], Root> = (options) => {
  const opts = options || {}
  const dir = opts.dir
  const srcPath = opts.srcPath
  const locale = opts.locale

  return async (tree, _file) => {
    // Instantiate an empty array for image nodes
    const images: ImageNode[] = []

    visit(tree, "element", (node) => {
      if (node.tagName === "img" && node.properties) {
        const src = node.properties.src as string
        const dimensions = getImageSize(src, dir)

        if (!dimensions) {
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
        node.properties.width = dimensions.width
        node.properties.height = dimensions.height
        node.properties.aspectRatio =
          (dimensions.width || 1) / (dimensions.height || 1)

        // Add image node to images array
        images.push(node)
      }
    })

    setImagePlaceholders(images, srcPath)
  }
}

export default setImageSize
