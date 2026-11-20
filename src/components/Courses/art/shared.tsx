import { cn } from "@/lib/utils/cn"

import { isoProjection } from "./iso"

/*
 * Shared pieces for the decorative isometric art, tinted by the surrounding
 * `--course` vars. Shades are fixed against white/the course hue (not the
 * page background) so objects stay vivid in both themes.
 */

// `tone="light"` swaps to pale shades for use on a course-coloured surface
export const TOP = "var(--art-top)"
export const LEFT = "var(--art-left)"
export const RIGHT = "var(--art-right)"
export const SHADOW = "var(--art-shadow)"

export const TONES = {
  base: "[--art-top:color-mix(in_oklab,var(--course)_55%,white)] [--art-left:var(--course)] [--art-right:var(--course-strong)] [--art-shadow:color-mix(in_oklab,var(--course-strong)_22%,transparent)]",
  light:
    "[--art-top:white] [--art-left:color-mix(in_oklab,white_72%,var(--course))] [--art-right:color-mix(in_oklab,white_45%,var(--course))] [--art-shadow:rgb(0_0_0/0.18)]",
}

const FLOAT_CSS = `
@media (prefers-reduced-motion: no-preference) {
  .course-art-float { animation: course-art-float 4s ease-in-out infinite; }
  .course-art-float-late { animation: course-art-float 4s ease-in-out 1.2s infinite; }
}
@keyframes course-art-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
`

export type Iso = ReturnType<typeof isoProjection>

export const Box = ({
  iso,
  x,
  y,
  z,
  w,
  d,
  h,
}: Record<"x" | "y" | "z" | "w" | "d" | "h", number> & { iso: Iso }) => {
  const b = iso.box(x, y, z, w, d, h)
  return (
    <g>
      <polygon points={b.left} fill={LEFT} />
      <polygon points={b.right} fill={RIGHT} />
      <polygon points={b.top} fill={TOP} />
    </g>
  )
}

export const Shadow = ({
  cx,
  cy,
  rx,
}: {
  cx: number
  cy: number
  rx: number
}) => <ellipse cx={cx} cy={cy} rx={rx} ry={rx * 0.32} fill={SHADOW} />

export type ArtTone = keyof typeof TONES

/** 200x160 frame shared by every course illustration and scenery piece */
export const ArtFrame = ({
  tone = "base",
  className,
  children,
}: {
  tone?: ArtTone
  className?: string
  children: React.ReactNode
}) => (
  <svg
    viewBox="0 0 200 160"
    aria-hidden
    className={cn("h-auto w-full overflow-visible", TONES[tone], className)}
  >
    <style>{FLOAT_CSS}</style>
    {children}
  </svg>
)

export { isoProjection }
