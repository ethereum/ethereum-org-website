/**
 * Course colours generated from an OKLCH hue, for courses beyond the named
 * presets. Lightness is solved per hue so every colour meets its contrast
 * target whatever the hue; see the courses skill's widgets reference.
 */

type Rgb = [number, number, number]

/** Linear-light sRGB from OKLCH, clipped to the sRGB gamut */
const oklchToLinear = (l: number, c: number, hue: number): Rgb => {
  const a = c * Math.cos((hue * Math.PI) / 180)
  const b = c * Math.sin((hue * Math.PI) / 180)
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3
  const clip = (x: number) => Math.min(1, Math.max(0, x))
  return [
    clip(4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_),
    clip(-1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_),
    clip(-0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_),
  ]
}

const luminance = ([r, g, b]: Rgb) => 0.2126 * r + 0.7152 * g + 0.0722 * b

export const contrast = (a: Rgb, b: Rgb) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

export const toHex = (rgb: Rgb) =>
  "#" +
  rgb
    .map((x) => (x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055))
    .map((x) =>
      Math.round(x * 255)
        .toString(16)
        .padStart(2, "0")
    )
    .join("")

export const WHITE: Rgb = [1, 1, 1]
/** The site's dark-mode page background is black */
export const BLACK: Rgb = [0, 0, 0]

/** Lightest (or, with `darkBackground`, darkest) colour meeting `ratio` */
const solve = (
  hue: number,
  chroma: number,
  ratio: number,
  against: Rgb,
  darkBackground = false
) => {
  let [lo, hi] = [0, 1]
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2
    const passes = contrast(oklchToLinear(mid, chroma, hue), against) >= ratio
    // On white, passing means dark enough: try lighter. On black, the reverse
    if (passes !== darkBackground) lo = mid
    else hi = mid
  }
  return oklchToLinear(darkBackground ? hi : lo, chroma, hue)
}

/** Contrast targets, with a margin over WCAG AA (4.5:1) */
export const PALETTE_TARGETS = { fill: 4.7, strong: 7.5, bright: 10 }

export const generatePalette = (hue: number) => ({
  // White text on the fill
  fill: solve(hue, 0.17, PALETTE_TARGETS.fill, WHITE),
  // Course-coloured text on the light background
  strong: solve(hue, 0.13, PALETTE_TARGETS.strong, WHITE),
  // Course-coloured text on the dark background
  bright: solve(hue, 0.12, PALETTE_TARGETS.bright, BLACK, true),
})
