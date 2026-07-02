import { type ReactNode } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { cn } from "@/lib/utils/cn"

/**
 * GRADIENTS
 *
 * The canonical gradient system. Brand-hue washes share one engine
 * (`gradient-core` in utilities.css) exposed as two functional utilities:
 *
 *   bg-tint-<color>   vertical wash (to bottom)
 *   bg-fade-<color>   horizontal wash (to right); dark stops inverted
 *
 * `<color>` is any theme color token (accent-a/b/c, primary, ...), resolved via
 * --value(--color-*), so it is constrained to the palette.
 *
 * Modifiers / companions:
 *   /N                 base opacity % (default 5); each stop adds a fixed offset
 *   from-* to-*        native Tailwind stop positions
 *   gradient-reverse           flip direction 180deg
 *   gradient-use-light/-dark   force one mode's intensity across both modes
 *   [--grad-*]                 inline one-off tweak (stop offset or --grad-angle)
 *
 * Named design gradients (bg-linear-primary/-secondary/-tertiary,
 * bg-radial-primary) cover specific one-off site gradients. Always layer a wash
 * over a solid background (bg-background). Toggle light/dark with the Storybook
 * theme switcher -- every swatch flips natively.
 *
 * A related border treatment, gradient-ring-* (a 1px gradient border via a
 * ::before underlay, open at the bottom), is in the GradientRing story below.
 */

const meta = {
  title: "Design System / Gradients",
  parameters: {
    chromatic: { disableSnapshot: true },
    layout: "padded",
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** Gradient demo box over a solid surface, with sample text to gauge contrast. */
const Swatch = ({ classes }: { classes: string }) => (
  <figure className="space-y-1.5">
    <div
      className={cn(
        "flex h-28 items-end rounded-base border border-body/10 bg-background p-3",
        classes
      )}
    >
      <span className="rounded bg-background/70 px-1.5 py-0.5 text-sm font-medium text-body backdrop-blur-xs">
        Sample text
      </span>
    </div>
    <figcaption className="text-xs text-body">
      <code>{classes}</code>
    </figcaption>
  </figure>
)

const Section = ({
  title,
  hint,
  cols = 4,
  children,
}: {
  title: string
  hint?: string
  cols?: 2 | 3 | 4
  children: ReactNode
}) => (
  <section className="space-y-3">
    <div className="space-y-0.5">
      <h3 className="text-lg font-bold text-body">{title}</h3>
      {hint ? <p className="max-w-prose text-sm text-body">{hint}</p> : null}
    </div>
    <div
      className={cn(
        "grid gap-4",
        cols === 2 && "grid-cols-1 sm:grid-cols-2",
        cols === 3 && "grid-cols-2 md:grid-cols-3",
        cols === 4 && "grid-cols-2 md:grid-cols-4"
      )}
    >
      {children}
    </div>
  </section>
)

/** bg-tint-* and bg-fade-* across the brand-hue tokens. */
export const Washes: Story = {
  render: () => (
    <div className="space-y-8">
      <Section
        title="bg-tint-* -- vertical wash"
        hint="The default wash: subtle, top-to-bottom, behind content."
      >
        <Swatch classes="bg-tint-accent-a" />
        <Swatch classes="bg-tint-accent-b" />
        <Swatch classes="bg-tint-accent-c" />
        <Swatch classes="bg-tint-primary" />
      </Section>
      <Section
        title="bg-fade-* -- horizontal wash"
        hint="Left-to-right companion; dark-mode stops are inverted vs tint."
      >
        <Swatch classes="bg-fade-accent-a" />
        <Swatch classes="bg-fade-accent-b" />
        <Swatch classes="bg-fade-accent-c" />
        <Swatch classes="bg-fade-primary" />
      </Section>
    </div>
  ),
}

/** /N base-opacity modifier -- additive ramp keeps the interval constant. */
export const BaseOpacity: Story = {
  render: () => (
    <Section
      title="Base opacity -- /N"
      hint="Default base is 5. Stops add fixed offsets (light n / n+10), so the interval stays constant as the base rises -- no blowout at higher values."
    >
      <Swatch classes="bg-tint-accent-a" />
      <Swatch classes="bg-tint-accent-a/10" />
      <Swatch classes="bg-tint-accent-a/15" />
      <Swatch classes="bg-tint-accent-a/20" />
    </Section>
  ),
}

/** Native from-* / to-* stop positions. */
export const StopPositions: Story = {
  render: () => (
    <Section
      title="Stop positions -- from-* / to-*"
      cols={3}
      hint="Standard Tailwind stop utilities drive the wash. Omit both for a full 0%->100% fade."
    >
      <Swatch classes="bg-tint-accent-a/15" />
      <Swatch classes="bg-tint-accent-a/15 from-25% to-75%" />
      <Swatch classes="bg-tint-accent-a/15 from-50%" />
    </Section>
  ),
}

/** Direction flip. */
export const Direction: Story = {
  render: () => (
    <Section
      title="gradient-reverse"
      cols={2}
      hint="Flips 180deg: tint to-bottom -> to-top, fade to-right -> to-left. One class for both families."
    >
      <Swatch classes="bg-tint-accent-a/15" />
      <Swatch classes="bg-tint-accent-a/15 gradient-reverse" />
      <Swatch classes="bg-fade-accent-a/15" />
      <Swatch classes="bg-fade-accent-a/15 gradient-reverse" />
    </Section>
  ),
}

/** Per-mode intensity override -- best seen by toggling the theme switcher. */
export const ModeIntensity: Story = {
  render: () => (
    <Section
      title="gradient-use-light / gradient-use-dark"
      cols={3}
      hint="Force one mode's intensity in both modes. Toggle the Storybook theme to compare -- use-light softens the boosted dark wash when it hurts text contrast."
    >
      <Swatch classes="bg-tint-accent-a/15" />
      <Swatch classes="bg-tint-accent-a/15 gradient-use-light" />
      <Swatch classes="bg-tint-accent-a/15 gradient-use-dark" />
    </Section>
  ),
}

/** gradient-ring-* demo: a 1px gradient border via a ::before underlay. The
    inner surface is intentionally left without a rounding class -- the utility
    clips the first child to its own radius automatically. */
const Ring = ({ classes }: { classes: string }) => (
  <figure className="space-y-1.5">
    <div className={classes}>
      <div className="flex h-28 items-center justify-center bg-radial-primary p-3 text-sm text-body">
        Ring content
      </div>
    </div>
    <figcaption className="text-xs text-body">
      <code>{classes}</code>
    </figcaption>
  </figure>
)

/** gradient-ring-* -- color from the name, radius from an optional modifier. */
export const GradientRing: Story = {
  render: () => (
    <div className="space-y-8">
      <Section
        title="gradient-ring-* -- color from the name"
        cols={2}
        hint="Color is any theme token (--value(--color-*)). Opacity stops are fixed (24/8 light, 40/20 dark) -- you pick the hue, not the translucency. The bottom edge is intentionally open."
      >
        <Ring classes="gradient-ring-primary-hover" />
        <Ring classes="gradient-ring-accent-a" />
        <Ring classes="gradient-ring-accent-b" />
        <Ring classes="gradient-ring-accent-c" />
      </Section>
      <Section
        title="Radius -- optional /modifier (default 4xl)"
        cols={4}
        hint="Append /<scale> to set the radius; the +1px on the ::before is computed automatically and the first child inherits the same radius (no rounded-* needed on it)."
      >
        <Ring classes="gradient-ring-primary" />
        <Ring classes="gradient-ring-primary/3xl" />
        <Ring classes="gradient-ring-primary/2xl" />
        <Ring classes="gradient-ring-primary/lg" />
      </Section>
    </div>
  ),
}

/** Named design gradients for specific one-off site gradients. */
export const NamedGradients: Story = {
  render: () => (
    <Section
      title="Named design gradients"
      cols={2}
      hint="@utility classes for specific, reused site gradients (light/dark baked in). Reach for the bg-tint-*/bg-fade-* family for brand-hue washes instead of adding new ones here."
    >
      <Swatch classes="bg-linear-primary" />
      <Swatch classes="bg-radial-primary" />
    </Section>
  ),
}
