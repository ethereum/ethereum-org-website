/**
 * Post-processing for generated images: chroma-key removal, edge checks, trim, resize.
 * Pure pixel math over sharp's raw RGBA buffer; no model calls.
 */

import sharp from "sharp"

export type ImageType = "cutout" | "full-bleed"
export type KeyColor = "green" | "magenta"

export const KEY_HEX: Record<KeyColor, string> = {
  green: "#00FF00",
  magenta: "#FF00FF",
}

interface Raw {
  data: Buffer
  width: number
  height: number
}

const toRaw = async (input: string | Buffer): Promise<Raw> => {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  return { data, width: info.width, height: info.height }
}

// How strongly a pixel leans toward the key hue; ~255 for the key itself, <=0 for
// neutral or off-key colors. Relative, so it tolerates the model's "almost #00FF00".
const spillOf = (key: KeyColor, r: number, g: number, b: number) =>
  key === "green" ? g - Math.max(r, b) : Math.min(r, b) - g

/** Median background color and spill, sampled from the outermost pixel ring. */
const sampleBackground = ({ data, width, height }: Raw, key: KeyColor) => {
  const samples: [number, number, number][] = []
  const push = (x: number, y: number) => {
    const i = (y * width + x) * 4
    samples.push([data[i], data[i + 1], data[i + 2]])
  }
  for (let x = 0; x < width; x++) {
    push(x, 0)
    push(x, height - 1)
  }
  for (let y = 0; y < height; y++) {
    push(0, y)
    push(width - 1, y)
  }
  const median = (c: 0 | 1 | 2) =>
    samples.map((s) => s[c]).sort((a, b) => a - b)[samples.length >> 1]
  const bg: [number, number, number] = [median(0), median(1), median(2)]
  return { bg, spill: spillOf(key, ...bg) }
}

/**
 * Alpha from spill relative to the sampled background, then unmix the background out
 * of partially transparent pixels and clamp any residual key-hue tint (despill).
 */
export const chromaKey = async (input: string | Buffer, key: KeyColor) => {
  const raw = await toRaw(input)
  const { bg, spill: bgSpill } = sampleBackground(raw, key)
  if (bgSpill < 120) {
    throw new Error(
      `Border does not look like a ${key} key (median rgb ${bg.join(",")}). Was this generated as a chroma cutout?`
    )
  }
  const lo = bgSpill * 0.15
  const hi = bgSpill * 0.85
  const { data, width, height } = raw
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)))
  for (let i = 0; i < data.length; i += 4) {
    let r = data[i]
    let g = data[i + 1]
    let b = data[i + 2]
    const s = spillOf(key, r, g, b)
    let a = s <= lo ? 1 : s >= hi ? 0 : 1 - (s - lo) / (hi - lo)
    if (a < 0.03) a = 0
    if (a > 0 && a < 1) {
      r = (r - (1 - a) * bg[0]) / a
      g = (g - (1 - a) * bg[1]) / a
      b = (b - (1 - a) * bg[2]) / a
    }
    data[i] = clamp(r)
    data[i + 1] = clamp(g)
    data[i + 2] = clamp(b)
    data[i + 3] = Math.round(a * 255)
  }

  // Despill only the rim near transparency: dark ink blended with the key reads as
  // opaque, so its tint survives unmixing. Interior colors are left untouched.
  const R = 2
  const alpha = Uint8Array.from(
    { length: width * height },
    (_, p) => data[p * 4 + 3]
  )
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const p = y * width + x
      if (alpha[p] === 0) continue
      let rim = alpha[p] < 255
      for (let dy = -R; !rim && dy <= R; dy++) {
        for (let dx = -R; !rim && dx <= R; dx++) {
          const nx = x + dx
          const ny = y + dy
          if (nx >= 0 && ny >= 0 && nx < width && ny < height) {
            rim = alpha[ny * width + nx] < 255
          }
        }
      }
      if (!rim) continue
      const i = p * 4
      const [r, g, b] = [data[i], data[i + 1], data[i + 2]]
      if (key === "green") {
        data[i + 1] = Math.min(g, Math.round((r + b) / 2))
      } else {
        const excess = (r + b) / 2 - g
        if (excess > 0) {
          data[i] = clamp(r - excess)
          data[i + 2] = clamp(b - excess)
        }
      }
    }
  }
  return raw
}

const band = ({ width, height }: Raw) =>
  Math.max(2, Math.round(Math.min(width, height) * 0.01))

const EDGES = ["top", "bottom", "left", "right"] as const
type Edge = (typeof EDGES)[number]

const edgePixels = (raw: Raw, edge: Edge, depth: number) => {
  const { width, height } = raw
  const idx: number[] = []
  for (let d = 0; d < depth; d++) {
    if (edge === "top" || edge === "bottom") {
      const y = edge === "top" ? d : height - 1 - d
      for (let x = 0; x < width; x++) idx.push((y * width + x) * 4)
    } else {
      const x = edge === "left" ? d : width - 1 - d
      for (let y = 0; y < height; y++) idx.push((y * width + x) * 4)
    }
  }
  return idx
}

/** Cutout: no visible subject pixel may sit in the outer band of any edge. */
export const checkCutoutEdges = (raw: Raw) => {
  const depth = band(raw)
  const touching = EDGES.filter((edge) =>
    edgePixels(raw, edge, depth).some((i) => raw.data[i + 3] > 25)
  )
  return touching.map((e) => `subject touches ${e} edge`)
}

/** Full-bleed: a near-uniform strip along an edge suggests a border or blank margin. */
export const checkFullBleedEdges = (raw: Raw) => {
  const depth = band(raw) * 2
  return EDGES.flatMap((edge) => {
    const px = edgePixels(raw, edge, depth)
    const lum = px.map(
      (i) =>
        0.2126 * raw.data[i] +
        0.7152 * raw.data[i + 1] +
        0.0722 * raw.data[i + 2]
    )
    const mean = lum.reduce((a, b) => a + b, 0) / lum.length
    const sd = Math.sqrt(
      lum.reduce((a, b) => a + (b - mean) ** 2, 0) / lum.length
    )
    return sd < 2.5 ? [`flat strip on ${edge} edge (sd ${sd.toFixed(2)})`] : []
  })
}

/** Bounding box of pixels with visible alpha. */
const alphaBounds = ({ data, width, height }: Raw) => {
  let left = width
  let top = height
  let right = -1
  let bottom = -1
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > 8) {
        if (x < left) left = x
        if (x > right) right = x
        if (y < top) top = y
        if (y > bottom) bottom = y
      }
    }
  }
  if (right < 0) throw new Error("Keyed image is fully transparent")
  return { left, top, width: right - left + 1, height: bottom - top + 1 }
}

export interface ProcessOptions {
  type: ImageType
  keyColor?: KeyColor
  /** Skip keying: the model already returned real alpha. */
  nativeAlpha?: boolean
  /** Transparent padding around the trimmed subject, as a fraction of its larger side. */
  pad?: number
  /** Resize so the longer side is at most this many px (never upscales). */
  maxSize?: number
}

export const processImage = async (
  input: string | Buffer,
  output: string,
  opts: ProcessOptions
) => {
  if (opts.type === "full-bleed") {
    const raw = await toRaw(input)
    const issues = checkFullBleedEdges(raw)
    let img = sharp(input)
    if (opts.maxSize) {
      img = img.resize(opts.maxSize, opts.maxSize, {
        fit: "inside",
        withoutEnlargement: true,
      })
    }
    await img.toFile(output)
    return { issues }
  }

  const raw = opts.nativeAlpha
    ? await toRaw(input)
    : await chromaKey(input, opts.keyColor ?? "green")
  const issues = checkCutoutEdges(raw)
  const box = alphaBounds(raw)
  const padPx = Math.round(Math.max(box.width, box.height) * (opts.pad ?? 0.02))
  let img = sharp(raw.data, {
    raw: { width: raw.width, height: raw.height, channels: 4 },
  })
    .extract(box)
    .extend({
      top: padPx,
      bottom: padPx,
      left: padPx,
      right: padPx,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
  if (opts.maxSize) {
    // extract/extend must materialize before resize, or sharp reorders the pipeline
    const buf = await img.png().toBuffer()
    img = sharp(buf).resize(opts.maxSize, opts.maxSize, {
      fit: "inside",
      withoutEnlargement: true,
    })
  }
  await img.toFile(output)
  return { issues }
}
