import path from "path"

import type { Root } from "hast"
import sizeOf from "image-size"
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

/**
 * Handles:
 * "//"
 * "http://"
 * "https://"
 * "ftp://"
 */
const absolutePathRegex = /^(?:[a-z]+:)?\/\//

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

  return (tree, _file) => {
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
      }
    })
  }
}

export default setImageSize
