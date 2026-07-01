import type { Meta, StoryObj } from "@storybook/nextjs"

import { cn } from "@/lib/utils/cn"

/**
 * SHADOWS
 *
 * Canonical reference for the design system's shadow options: the Tailwind
 * default scale, the two custom utilities, and the hover-lift-* utilities.
 * Each option is one row with a small and a large box so its weight reads at
 * both scales.
 *
 * Toggle light/dark with the Storybook theme switcher. Tailwind-default
 * shadows recolor to the body color in dark mode (via a global rule); the
 * custom raw-box-shadow utilities keep their primary tint.
 */

const meta = {
  title: "Design System / Shadows",
  parameters: {
    chromatic: { disableSnapshot: true },
    layout: "fullscreen",
  },
} satisfies Meta

export default meta

type ShadowRowSpec = {
  /** Utility class name (also the row label). */
  name: string
  /** Class(es) applied to the demo boxes. */
  className: string
}

const tailwindDefaults: ShadowRowSpec[] = [
  { name: "shadow-none", className: "shadow-none" },
  { name: "shadow-2xs", className: "shadow-2xs" },
  { name: "shadow-xs", className: "shadow-xs" },
  { name: "shadow-sm", className: "shadow-sm" },
  { name: "shadow-md", className: "shadow-md" },
  { name: "shadow-lg", className: "shadow-lg" },
  { name: "shadow-xl", className: "shadow-xl" },
  { name: "shadow-2xl", className: "shadow-2xl" },
]

const customShadows: ShadowRowSpec[] = [
  { name: "shadow-primary-xl", className: "shadow-primary-xl" },
  {
    name: "shadow-primary-no-blur-0.5",
    className: "shadow-primary-no-blur-0.5",
  },
  { name: "shadow-primary-no-blur-1", className: "shadow-primary-no-blur-1" },
  { name: "shadow-primary-no-blur-2", className: "shadow-primary-no-blur-2" },
]

const hoverLifts: ShadowRowSpec[] = [
  { name: "hover-lift-xs", className: "hover-lift-xs" },
  { name: "hover-lift-base", className: "hover-lift-base" },
  { name: "hover-lift-sm", className: "hover-lift-sm" },
  { name: "hover-lift-md", className: "hover-lift-md" },
]

/** One option: monospace label + a small and a large box on a padded surface. */
const ShadowRow = ({ name, className }: ShadowRowSpec) => (
  <div className="flex flex-col gap-6 border-b border-body-light py-12 sm:flex-row sm:items-center">
    <code className="w-72 shrink-0 font-mono text-sm font-bold text-body">
      {name}
    </code>
    <div className="flex flex-1 items-center gap-16 ps-2">
      <div
        className={cn(
          "size-16 shrink-0 rounded-lg bg-background-highlight",
          className
        )}
      />
      <div
        className={cn(
          "h-36 w-64 shrink-0 rounded-lg bg-background-highlight",
          className
        )}
      />
    </div>
  </div>
)

const Group = ({
  title,
  description,
  rows,
}: {
  title: string
  description: string
  rows: ShadowRowSpec[]
}) => (
  <section className="flex flex-col px-10 py-12">
    <h2 className="text-2xl font-bold">{title}</h2>
    <p className="mt-1 mb-2 max-w-3xl text-sm text-body-medium">
      {description}
    </p>
    <div className="flex flex-col">
      {rows.map((row) => (
        <ShadowRow key={row.name} {...row} />
      ))}
    </div>
  </section>
)

export const All: StoryObj = {
  render: () => (
    <div className="divide-y divide-body-light bg-background">
      <Group
        title="Tailwind defaults"
        description="The framework elevation scale -- the default choice for most surfaces (dropdowns/tooltips: md, cards/popovers/modals: lg, large sheets: xl). Recolors to the body color in dark mode."
        rows={tailwindDefaults}
      />
      <Group
        title="Custom utilities"
        description="Project-specific shadows in utilities.css, written as raw box-shadow so they keep their primary tint in dark mode. shadow-primary-no-blur-* is spacing-scaled: -1 = 4px offset, -0.5 = 2px."
        rows={customShadows}
      />
      <Group
        title="Hover-lift utilities"
        description="Composite hover effects (scale + shadow transition). Hover a box to see the lift -- use these for interactive cards/links instead of a manual resting/hover shadow pair."
        rows={hoverLifts}
      />
    </div>
  ),
}
