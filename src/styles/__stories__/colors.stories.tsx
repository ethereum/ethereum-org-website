import { type ReactNode } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { cn } from "@/lib/utils/cn"

/**
 * COLORS
 *
 * The design system's available colors: the raw palette scales and the
 * theme-aware semantic tokens layered on top. Every swatch is a live utility
 * (`bg-<token>`) -- toggle the Storybook theme switcher to watch the semantic
 * tokens flip between light and dark.
 *
 * In components, reach for a semantic token (`body`, `primary`, `accent-a/b/c`,
 * `background`, `border`, `success`/`error`/`warning`, `staking-*`); drop to a
 * raw palette shade only when no semantic token fits.
 */

const meta = {
  title: "Design System / Colors",
  parameters: {
    chromatic: { disableSnapshot: true },
    layout: "padded",
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** One color: a filled chip over the page surface + its utility class name. */
const Chip = ({ className }: { className: string }) => (
  <figure className="space-y-1">
    <div
      className={cn("h-16 w-full rounded-lg border border-body/10", className)}
    />
    <figcaption className="font-mono text-xs break-all text-body-medium">
      {className}
    </figcaption>
  </figure>
)

const Group = ({
  title,
  description,
  classes,
}: {
  title: string
  description?: string
  classes: string[]
}) => (
  <section className="space-y-3">
    <div className="space-y-0.5">
      <h3 className="text-lg font-bold text-body">{title}</h3>
      {description ? (
        <p className="max-w-prose text-sm text-body-medium">{description}</p>
      ) : null}
    </div>
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
      {classes.map((className) => (
        <Chip key={className} className={className} />
      ))}
    </div>
  </section>
)

const Stack = ({ children }: { children: ReactNode }) => (
  <div className="space-y-10">{children}</div>
)

/* ------------------------------------------------------------------ */
/* Raw palette scales                                                 */
/* ------------------------------------------------------------------ */

const palette: { title: string; classes: string[] }[] = [
  {
    title: "Gray",
    classes: [
      "bg-gray-100",
      "bg-gray-150",
      "bg-gray-200",
      "bg-gray-300",
      "bg-gray-400",
      "bg-gray-500",
      "bg-gray-600",
      "bg-gray-700",
      "bg-gray-800",
      "bg-gray-900",
    ],
  },
  {
    title: "Purple",
    classes: [
      "bg-purple-50",
      "bg-purple-100",
      "bg-purple-200",
      "bg-purple-300",
      "bg-purple-400",
      "bg-purple-500",
      "bg-purple-600",
      "bg-purple-700",
      "bg-purple-800",
      "bg-purple-900",
    ],
  },
  {
    title: "Blue",
    classes: [
      "bg-blue-50",
      "bg-blue-100",
      "bg-blue-200",
      "bg-blue-300",
      "bg-blue-400",
      "bg-blue-500",
      "bg-blue-600",
      "bg-blue-700",
      "bg-blue-800",
      "bg-blue-900",
    ],
  },
  {
    title: "Pink",
    classes: [
      "bg-pink-50",
      "bg-pink-100",
      "bg-pink-200",
      "bg-pink-300",
      "bg-pink-400",
      "bg-pink-500",
      "bg-pink-600",
      "bg-pink-700",
      "bg-pink-800",
      "bg-pink-900",
    ],
  },
  {
    title: "Teal",
    classes: [
      "bg-teal-50",
      "bg-teal-100",
      "bg-teal-200",
      "bg-teal-300",
      "bg-teal-400",
      "bg-teal-500",
      "bg-teal-600",
      "bg-teal-700",
      "bg-teal-800",
      "bg-teal-900",
    ],
  },
  {
    title: "Orange",
    classes: ["bg-orange-100", "bg-orange-800", "bg-orange-900"],
  },
]

/* ------------------------------------------------------------------ */
/* Semantic tokens (theme-aware)                                      */
/* ------------------------------------------------------------------ */

const semantic: { title: string; description?: string; classes: string[] }[] = [
  {
    title: "Body & text",
    description: "Foreground/content colors and disabled state.",
    classes: [
      "bg-body",
      "bg-body-medium",
      "bg-body-light",
      "bg-body-inverse",
      "bg-body-menu",
      "bg-body-menu-low",
      "bg-body-menu-medium",
      "bg-body-menu-high",
      "bg-disabled",
    ],
  },
  {
    title: "Surface",
    description: "Page and panel backgrounds.",
    classes: [
      "bg-background",
      "bg-background-highlight",
      "bg-background-low",
      "bg-background-medium",
      "bg-background-high",
    ],
  },
  {
    title: "Border",
    description: "Border/outline hues (shown as fills here).",
    classes: [
      "bg-border",
      "bg-border-high-contrast",
      "bg-border-low-contrast",
      "bg-border-hover",
    ],
  },
  {
    title: "Primary",
    classes: [
      "bg-primary",
      "bg-primary-high-contrast",
      "bg-primary-low-contrast",
      "bg-primary-hover",
      "bg-primary-visited",
      "bg-primary-action",
      "bg-primary-action-hover",
    ],
  },
  {
    title: "Accent",
    classes: [
      "bg-accent-a",
      "bg-accent-a-hover",
      "bg-accent-b",
      "bg-accent-b-hover",
      "bg-accent-c",
      "bg-accent-c-hover",
    ],
  },
  {
    title: "Success",
    classes: [
      "bg-success",
      "bg-success-light",
      "bg-success-dark",
      "bg-success-border",
    ],
  },
  {
    title: "Error",
    classes: ["bg-error", "bg-error-light", "bg-error-dark", "bg-error-border"],
  },
  {
    title: "Warning",
    classes: [
      "bg-warning",
      "bg-warning-light",
      "bg-warning-dark",
      "bg-warning-border",
    ],
  },
  {
    title: "Staking",
    description: "Domain-specific staking tiers, each with a -fill companion.",
    classes: [
      "bg-staking-gold",
      "bg-staking-gold-fill",
      "bg-staking-green",
      "bg-staking-green-fill",
      "bg-staking-blue",
      "bg-staking-blue-fill",
      "bg-staking-red",
      "bg-staking-red-fill",
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Stories                                                            */
/* ------------------------------------------------------------------ */

/** The raw palette scales (theme-independent foundation). */
export const Palette: Story = {
  render: () => (
    <Stack>
      {palette.map(({ title, classes }) => (
        <Group key={title} title={title} classes={classes} />
      ))}
    </Stack>
  ),
}

/** The theme-aware semantic tokens layered on the palette. */
export const SemanticTokens: Story = {
  render: () => (
    <Stack>
      {semantic.map(({ title, description, classes }) => (
        <Group
          key={title}
          title={title}
          description={description}
          classes={classes}
        />
      ))}
    </Stack>
  ),
}
