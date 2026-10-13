/**
 * Colours for isometric diagrams. They come from the `--diagram-*` tokens in
 * src/styles/semantic-tokens.css (registered as Tailwind colours in
 * theme.css), so the drawing follows light and dark mode and nothing is
 * hard-coded. Every class here is a static literal (no string-built Tailwind
 * classes), and every inline colour carries a fallback, so a missing
 * variable can never make a stroke vanish or a fill turn black.
 *
 * Colour roles: blue = accounts and contracts, orange = gas and value,
 * neutral = structure (plate, pipes at rest, leader lines).
 */

const token = (name: string, fallback: string) =>
  `hsla(var(${name}, ${fallback}))`

/** Inline colour values (for `color-mix` and style props), with fallbacks. */
export const DIAGRAM_COLOR = {
  bg: token("--diagram-bg", "0, 0%, 100%"),
  plate: token("--diagram-plate", "0, 0%, 97%"),
  edge: token("--diagram-edge", "0, 0%, 55%"),
  pipe: token("--diagram-pipe", "0, 0%, 38%"),
  entity: token("--diagram-entity", "235, 81%, 58%"),
  gas: token("--diagram-gas", "26, 90%, 37%"),
} as const

export type AnatomyHue = "entity" | "gas" | "neutral"
export type AnatomyFace = "top" | "start" | "end"

// Share of the hue in each face's tint: lightest on top. The shares are
// tokens (15/30/45% light, about double in dark so blue and orange still read
// as colour), and mixing with the background adapts each theme.
const FACE_MIX: Record<AnatomyFace, string> = {
  top: "var(--diagram-mix-top, 15%)",
  start: "var(--diagram-mix-start, 30%)",
  end: "var(--diagram-mix-end, 45%)",
}
// The plate is neutral: its top is the plate token, its sides a slightly
// darker tint of the same neutral.
const PLATE_MIX: Record<AnatomyFace, string | null> = {
  top: null,
  start: "25%",
  end: "40%",
}

/** Fill for one face of a solid: `color-mix(in oklab, hue N%, background)`. */
export const anatomyFill = (hue: AnatomyHue, face: AnatomyFace) => {
  if (hue === "neutral") {
    const mix = PLATE_MIX[face]
    return mix
      ? `color-mix(in oklab, ${DIAGRAM_COLOR.edge} ${mix}, ${DIAGRAM_COLOR.plate})`
      : DIAGRAM_COLOR.plate
  }
  return `color-mix(in oklab, ${DIAGRAM_COLOR[hue]} ${FACE_MIX[face]}, ${DIAGRAM_COLOR.bg})`
}

/** A level or flow of the hue itself (e.g. gas in a tank). */
export const anatomyStrong = (hue: Exclude<AnatomyHue, "neutral">) =>
  `color-mix(in oklab, ${DIAGRAM_COLOR[hue]} 70%, ${DIAGRAM_COLOR.bg})`

/** Outline class per hue, at rest (a little softer in dark mode). */
export const ANATOMY_STROKE: Record<AnatomyHue, string> = {
  entity: "stroke-diagram-entity-rest",
  gas: "stroke-diagram-gas-rest",
  neutral: "stroke-diagram-edge",
}

/**
 * The part to watch keeps its role colour at full strength and gets a
 * heavier stroke (blue for accounts and contracts, orange for gas).
 */
export const ANATOMY_LIT_STROKE: Record<AnatomyHue, string> = {
  entity: "stroke-diagram-entity [stroke-width:2]",
  gas: "stroke-diagram-gas [stroke-width:2]",
  neutral: "stroke-diagram-edge [stroke-width:2]",
}

/** Text colour for an active label, matching its object's role. */
export const ANATOMY_LIT_TEXT: Record<AnatomyHue, string> = {
  entity: "text-diagram-entity",
  gas: "text-diagram-gas",
  neutral: "text-body",
}

/**
 * Presentation attributes for a diagram's root `<svg>`: children inherit a
 * visible stroke and no fill unless a class or style sets their own, so a
 * missing utility degrades to a neutral line, never to nothing or black.
 */
export const DIAGRAM_SVG_FALLBACKS = {
  fill: "none",
  stroke: "currentColor",
} as const
