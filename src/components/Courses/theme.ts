import type { CSSProperties } from "react"

import { cn } from "@/lib/utils/cn"

import type { CoursePreset, CourseTheme } from "@/data/courses"

import { generateMutedPalette, generatePalette, toHex } from "./course-palette"

const hsl = (token: string) => `hsl(var(--${token}))`

/*
 * Built from the raw palette vars: the `--color-*` theme vars are tree-shaken
 * when no utility uses them. `fill` carries white text at 4.5:1 or better;
 * `strong`/`bright` are text-safe accents on light/dark backgrounds.
 * The palette has no mid oranges, so those are literal.
 */
const PALETTES: Record<
  CoursePreset,
  { fill: string; strong: string; bright: string }
> = {
  purple: {
    fill: hsl("purple-600"),
    strong: hsl("purple-800"),
    bright: hsl("purple-400"),
  },
  orange: { fill: "#c2410c", strong: "#9a3412", bright: "#fb923c" },
  teal: {
    fill: `color-mix(in srgb, ${hsl("teal-700")}, ${hsl("teal-800")})`,
    strong: hsl("teal-900"),
    bright: hsl("teal-400"),
  },
  blue: {
    fill: hsl("blue-600"),
    strong: hsl("blue-800"),
    bright: hsl("blue-400"),
  },
  pink: {
    fill: hsl("pink-700"),
    strong: hsl("pink-800"),
    bright: hsl("pink-400"),
  },
}

/**
 * A course theme, or `muted`: the low-chroma palette for teaser cards, never
 * a course's own colour
 */
type ThemeStyleInput = CourseTheme | "muted"

const paletteFor = (theme: ThemeStyleInput) => {
  if (typeof theme === "string" && theme !== "muted") return PALETTES[theme]
  const { fill, strong, bright } =
    theme === "muted" ? generateMutedPalette() : generatePalette(theme.hue)
  return { fill: toHex(fill), strong: toHex(strong), bright: toHex(bright) }
}

/** Stable id for comparing themes, e.g. `purple` or `hue-220` */
export const themeId = (theme: CourseTheme) =>
  typeof theme === "string" ? theme : `hue-${theme.hue}`

/**
 * Exploration styling: each course sets `--course*` vars on a wrapper and
 * everything inside (path, buttons, art) reads them.
 */
export const courseThemeStyle = (theme: ThemeStyleInput) => {
  const { fill, strong, bright } = paletteFor(theme)
  return {
    "--course": fill,
    "--course-strong": strong,
    "--course-bright": bright,
    // Tint amounts come from the courses layout, which raises them in dark mode
    "--course-soft": `color-mix(in oklab, ${fill} var(--course-soft-amount, 14%), var(--color-background))`,
    "--course-softer": `color-mix(in oklab, ${fill} var(--course-softer-amount, 7%), var(--color-background))`,
  } as CSSProperties
}

/**
 * Inside a lesson every course looks the same: the site's primary purple, so
 * the course colours stay an overview-page signal (hub, course page, path).
 */
export const lessonThemeStyle = () => courseThemeStyle("purple")

/** Course-coloured text that keeps contrast in light and dark mode */
export const courseText = "text-(--course-strong) dark:text-(--course-bright)"

/** Tint of the course colour over the page background, for SVG fills */
export const courseMix = (percent: number) =>
  `color-mix(in oklab, var(--course) ${percent}%, var(--color-background))`

/**
 * Pressable "3D" button skin, layered on `<Button variant="ghost">`. Radius
 * matches ui/Button at size md (`rounded`); use `rounded-lg` beside size lg.
 */
export const chunkyButton = cn(
  "min-h-12 rounded border-0 border-b-4 px-6 text-base font-bold tracking-wide uppercase",
  "border-(--course-strong) bg-(--course) text-white",
  "hover-link:!text-white hover-link:brightness-110 active:text-white",
  "active:translate-y-0.5 active:border-b-2",
  "disabled:border-transparent disabled:bg-disabled disabled:text-background"
)

/** Neutral pressable skin for secondary actions */
export const chunkyButtonSecondary = cn(
  "min-h-12 rounded border-2 border-b-4 border-border bg-background px-6 text-base font-bold tracking-wide text-body uppercase",
  "hover-link:!text-body hover-link:bg-background-highlight active:text-body",
  "active:translate-y-0.5 active:border-b-2"
)

/**
 * Pick state for an answer tile: course colour while picking, then only the
 * verdict's colours once graded (`data-result="correct" | "incorrect"`).
 */
export const pickedTile = cn(
  "data-[state=checked]:not-data-result:border-(--course) data-[state=checked]:not-data-result:bg-(--course-softer)",
  "data-[result=correct]:border-green-700 data-[result=correct]:bg-success-light dark:data-[result=correct]:border-green-400 dark:data-[result=correct]:bg-success-dark",
  "data-[result=incorrect]:border-error data-[result=incorrect]:bg-error-light dark:data-[result=incorrect]:border-red-400 dark:data-[result=incorrect]:bg-error-dark"
)

export type PickResult = "correct" | "incorrect"

/**
 * Letter marker inside a `group/option` tile, following `pickedTile`. Takes
 * the tile's result so a graded pick never keeps the course colour.
 */
export const pickedMarker = (result?: PickResult) =>
  cn(
    "border-2 text-sm font-bold transition-colors",
    result === "correct" && "border-green-700 bg-green-700 text-white",
    result === "incorrect" && "border-error bg-error text-white",
    !result &&
      "border-border text-body-medium group-data-[state=checked]/option:border-(--course) group-data-[state=checked]/option:bg-(--course) group-data-[state=checked]/option:text-white"
  )

/** Pressable answer tile (choice options, tokens) */
export const chunkyTile = cn(
  "rounded-2xl border-2 border-b-4 border-border bg-background text-body transition-[transform,background-color,border-color] duration-150",
  "hover:bg-background-highlight active:translate-y-0.5 active:border-b-2"
)

/**
 * Step prompt: the step's `h2`, styled as reading text because prompts run
 * to full sentences. `font-normal` overrides the base heading weight.
 */
export const stepPrompt = "m-0 text-lg leading-relaxed font-normal"

/** Pill for the header stat chips and the profile button beside them */
export const statChip =
  // Start padding about the gap above and below a 24px icon, so a round
  // avatar sits snugly in the pill's rounded end
  "m-0 flex items-center gap-2 rounded-full border-2 border-border bg-background py-1 ps-[7px] pe-3.5 text-lg font-bold tabular-nums"
