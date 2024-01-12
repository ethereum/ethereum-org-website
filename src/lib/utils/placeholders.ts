import fs from "fs"
import path from "path"

import { StaticImageData } from "next/image"
import { getPlaiceholder } from "plaiceholder"

import { ImageNode, ImagePlaceholder, PlaceholderCache, PlaceholderData } from "@/lib/types"

import { getHashFromBuffer } from "@/lib/utils/crypto"

import { PLACEHOLDER_IMAGE_DIR, SITE_URL } from "@/lib/constants"

/**
 * INTERNAL FUNCTIONS:
 */

/**
 * Reads the placeholder cache for a given source path.
 * @param src The source path.
 * @returns An object containing the cache data and the cache path.
 */
const readPlaceholderCache = (src: string): PlaceholderCache => {
  // Generate kebab-case filename from srcPath, ie: /content/nft => content-nft-data.json
  const filename = path.join(src, "data.json").replaceAll("/", "-").slice(1)

  // Make directory for current page if none exists
  if (!fs.existsSync(PLACEHOLDER_IMAGE_DIR)) fs.mkdirSync(PLACEHOLDER_IMAGE_DIR, { recursive: true })

  const cachePath = path.join(PLACEHOLDER_IMAGE_DIR, filename)

  const existsCache = fs.existsSync(cachePath)

  const cache: PlaceholderData = existsCache ? JSON.parse(fs.readFileSync(cachePath, "utf8")) : {}
  return { cache, cachePath }
}

/**
 * Writes the placeholder cache to a file.
 * @param cache - The cache object.
 * @param cachePath - The path to the cache file.
 * @param isSame - Indicates whether the cached value has changed.
 */
const writePlaceholderCache = ({ cache, cachePath }: PlaceholderCache, isSame: boolean): void => {
  // If cache is still empty, delete JSON file and return
  if (Object.keys(cache).length === 0) {
    fs.rmSync(cachePath, { recursive: true, force: true })
    return
  }

  // If cached value has not changed, return without writing to file system
  if (isSame) return

  // Write results to cache file
  fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2))
}

/**
 * Retrieves a buffer from an image.
 * If the image is of type StaticImageData, it fetches the image from a URL.
 * If the image is of type ImageNode, it loads the image data from the file system as a buffer.
 * @param image The image to retrieve the buffer from.
 * @returns A buffer containing the image data.
 */
const getBufferFromImage = async (image: StaticImageData | ImageNode): Promise<Buffer> => {
  // If StaticImageType ("src" in image), fetch image from URL
  if ("src" in image) {
    const input = path.join(SITE_URL, image.src)
    const res = await fetch(input)
    return Buffer.from(await res.arrayBuffer())
  } else {
    // If ImageNode, load image data from file system as buffer
    return fs.readFileSync(path.join("public", image.properties.src))
  }
}

/**
 * Assigns placeholder properties to an image object.
 * If the image object has a "src" property, it sets the "blurDataURL" property for the static image.
 * Otherwise, it sets the "blurDataURL" and "placeholder" properties in the "properties" object of the image node.
 * @param image - The image object to assign placeholder properties to.
 * @param base64 - The base64 string to set as the "blurDataURL" property.
 */
const assignPlaceholderProps = (image: StaticImageData | ImageNode, base64: string) => {
  if ("src" in image) {
    image.blurDataURL = base64
  } else {
    image.properties.blurDataURL = base64
    image.properties.placeholder = "blur"
  }
}

/**
 * Processes an image by generating a placeholder and assigning it to the image properties.
 * If a cached placeholder with the same hash exists, it is used instead of generating a new one.
 * @param image - The image to process, can be either a StaticImageData or an ImageNode.
 * @param cache - The cache object to store the generated placeholders.
 * @param size - The size of the generated placeholder image in pixels. Default is 16.
 * @returns A promise that resolves to a boolean indicating whether a cached placeholder was used.
 */
const processImage = async (image: StaticImageData | ImageNode, cache: PlaceholderData, size: number = 16): Promise<boolean> => {
  const imgRef = "src" in image ? image.src : image.properties.src

  // Skip externally hosted images
  if (imgRef.startsWith("http")) return true

  // Load image as buffer
  const buffer = await getBufferFromImage(image)

  // Get hash fingerprint of image data (no security implications; fast algorithm prioritized)
  const hash = await getHashFromBuffer(buffer, { algorithm: "SHA-1", length: 8 })

  // Look for cached placeholder data with matching hash
  const cachedPlaceholder: ImagePlaceholder | null = cache[imgRef]?.hash === hash ? cache[imgRef] : null

  // Get base64 from cached placeholder if available, else generate new placeholder
  const { base64 } = cachedPlaceholder || await getPlaiceholder(buffer, { size })

  // Assign placeholder image props: blurDataURL, (placeholder)
  assignPlaceholderProps(image, base64)

  // If cached value was not available, add newly generated placeholder data
  if (!cachedPlaceholder) {
    cache[imgRef] = { hash, base64 }
  }

  // Return boolean indicating whether cached value was used
  return !!cachedPlaceholder
}

/**
 * EXPORTED FUNCTIONS:
 */

/**
 * Sets the placeholder from a static image.
 * @param image - The statically imported image data, of type StaticImageData.
 * @param size - The size of the placeholder in pixels.
 * @returns A promise that resolves when the placeholder is set.
 */
export const setPlaceholderFromStatic = async (image: StaticImageData, size?: number): Promise<void> => {
  const imgRef = image.src
  const { cache, cachePath } = readPlaceholderCache(imgRef)

  const isSame = await processImage(image, cache, size)

  // Write cache
  writePlaceholderCache({ cache, cachePath }, isSame)
}

/**
 * Sets image placeholders for the given array of images.
 * 
 * @param images - The array of images to set placeholders for.
 * @param srcPath - The source page path for the images.
 * @returns A promise that resolves to void.
 */
export const setPlaceholdersFromImageNodes = async (images: ImageNode[], srcPath: string, size?: number): Promise<void> => {
  const cacheData = readPlaceholderCache(srcPath)

  let isSame = true

  // Generate placeholder for internal images
  for (const image of images) {
    isSame = isSame && await processImage(image, cacheData.cache, size)
  }

  writePlaceholderCache(cacheData, isSame)
}
