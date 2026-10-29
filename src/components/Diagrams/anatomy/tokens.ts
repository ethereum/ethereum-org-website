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
 *
 * Every line is a hairline (1px, non-scaling); hierarchy comes from
 * colour: `line-faint` for seams and panel lines, `line` for outlines,
 * `line-strong` for the hovered part. Fills are light role tints at rest;
 * only the active or hovered part takes the full role colour.
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
  shadow: token("--diagram-shadow", "0, 0%, 7%"),
} as const

export type AnatomyHue = "entity" | "gas" | "neutral"
export type AnatomyFace = "top" | "start" | "end"
/** How a part is drawn: at rest, active in the current step, or hovered. */
export type AnatomyState = "rest" | "lit" | "hover"

// Share of the hue in each face's tint: lightest on top. The shares are
// tokens (light at rest, stronger when active or hovered, about double in
// dark so blue and orange still read as colour); mixing with the background
// adapts each theme.
const FACE_MIX: Record<AnatomyFace, string> = {
  top: "var(--diagram-mix-top, 7%)",
  start: "var(--diagram-mix-start, 14%)",
  end: "var(--diagram-mix-end, 22%)",
}
const FACE_MIX_ACTIVE: Record<AnatomyFace, string> = {
  top: "var(--diagram-mix-top-active, 15%)",
  start: "var(--diagram-mix-start-active, 30%)",
  end: "var(--diagram-mix-end-active, 45%)",
}
// The plate is neutral: its top is the plate token, its sides a slightly
// darker tint of the same neutral.
const PLATE_MIX: Record<AnatomyFace, string | null> = {
  top: null,
  start: "25%",
  end: "40%",
}

/**
 * Fill for one face of a solid: `color-mix(in oklab, hue N%, background)`,
 * stronger when the part is active or hovered.
 */
export const anatomyFill = (
  hue: AnatomyHue,
  face: AnatomyFace,
  state: AnatomyState = "rest"
) => {
  if (hue === "neutral") {
    const mix = PLATE_MIX[face]
    return mix
      ? `color-mix(in oklab, ${DIAGRAM_COLOR.edge} ${mix}, ${DIAGRAM_COLOR.plate})`
      : DIAGRAM_COLOR.plate
  }
  const share = state === "rest" ? FACE_MIX[face] : FACE_MIX_ACTIVE[face]
  return `color-mix(in oklab, ${DIAGRAM_COLOR[hue]} ${share}, ${DIAGRAM_COLOR.bg})`
}

/** A level or flow of the hue itself (e.g. gas in a tank). */
export const anatomyStrong = (hue: Exclude<AnatomyHue, "neutral">) =>
  `color-mix(in oklab, ${DIAGRAM_COLOR[hue]} 70%, ${DIAGRAM_COLOR.bg})`

/** Outline class per hue at rest: the neutral outline line for every role. */
export const ANATOMY_STROKE: Record<AnatomyHue, string> = {
  entity: "stroke-diagram-line",
  gas: "stroke-diagram-line",
  neutral: "stroke-diagram-line",
}

/**
 * The part to watch in this step: its outline takes its role colour (blue
 * for accounts and contracts, orange for gas). Same hairline width.
 */
export const ANATOMY_LIT_STROKE: Record<AnatomyHue, string> = {
  entity: "stroke-diagram-entity",
  gas: "stroke-diagram-gas",
  neutral: "stroke-diagram-line-strong",
}

/** The hovered or focused part: the strongest line. */
export const ANATOMY_HOVER_STROKE = "stroke-diagram-line-strong"

/** Outline class for a part in a given state. */
export const anatomyStroke = (hue: AnatomyHue, state: AnatomyState) =>
  state === "hover"
    ? ANATOMY_HOVER_STROKE
    : state === "lit"
      ? ANATOMY_LIT_STROKE[hue]
      : ANATOMY_STROKE[hue]

/** Seams, panel lines and other static detail. */
export const ANATOMY_DETAIL_STROKE = "stroke-diagram-line-faint"

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
