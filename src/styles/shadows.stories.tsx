import { type CSSProperties } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { Grid } from "@/components/ui/grid"

import { cn } from "@/lib/utils/cn"

/**
 * SHADOW REFERENCE
 *
 * Post-cleanup inventory of the project's box-shadows. The old multi-layer
 * CSS-variable token set (shadow-window-box, shadow-table-box, shadow-drop,
 * shadow-svg-button-link, shadow-widget, etc.) has been removed in favor of
 * Tailwind defaults plus two small custom utilities.
 *
 * KEY: each shadow is demoed on a box whose SIZE matches its real-world use --
 * a full-width-card shadow looks wrong on a thumbnail, and a table-row hairline
 * disappears on a large box. `size` (sm/md/lg) drives the demo box dimensions.
 *
 * Toggle light/dark with the Storybook theme switcher.
 *
 * Buckets:
 *   1. Custom utilities  - shadow-primary-xl, shadow-primary-no-blur-* (utilities.css).
 *   2. Tailwind defaults - shadow-md/lg/xl/2xl/xs (framework primitives, the default choice).
 *   3. Arbitrary one-offs - remaining inline shadow-[...] values.
 *   4. Color-only smell  - shadow-<color> with no size class (likely no-ops).
 */

const meta = {
  title: "Design System / Shadows",
  parameters: {
    chromatic: { disableSnapshot: true },
    layout: "fullscreen",
  },
} satisfies Meta

export default meta

type ShadowSize = "sm" | "md" | "lg"
type ShadowValueClass = "token" | "tailwind" | "arbitrary" | "color-only"

type ShadowSpec = {
  /** Display name -- utility class or short identifier. */
  name: string
  /** Tailwind classes applied to the demo box (must produce the shadow). */
  className?: string
  /** Inline style alternative for raw values not expressible as a class. */
  style?: CSSProperties
  /** Drives the demo box size to match the real-world element. */
  size: ShadowSize
  valueClass: ShadowValueClass
  /** Human-readable recipe summary. */
  value: string
  /** Typical element this shadow sits on (size + kind). */
  element: string
  /** Where it's used (file:line). */
  usage: string[]
  /** Unification note / smell. */
  notes?: string
}

const sizeBox: Record<ShadowSize, string> = {
  sm: "h-16 w-28",
  md: "h-40 w-64",
  lg: "h-56 w-full",
}

const valueClassBadge: Record<ShadowValueClass, string> = {
  token: "bg-success/20 text-success-dark",
  tailwind: "bg-accent-a/15 text-accent-a",
  arbitrary: "bg-warning/20 text-warning-dark",
  "color-only": "bg-error/20 text-error-dark",
}

const valueClassLabel: Record<ShadowValueClass, string> = {
  token: "named token",
  tailwind: "tailwind",
  arbitrary: "arbitrary",
  "color-only": "color-only",
}

/**
 * One shadow, one demo box sized to its real use. Generous padding around the
 * box so the shadow (which extends outside the box) is fully visible. Sits on
 * bg-background so translucent shadows read correctly; flips with the theme
 * toggle.
 */
const ShadowSwatch = ({ spec }: { spec: ShadowSpec }) => (
  <div className="flex flex-col gap-3 rounded-xl border border-body-light p-5">
    <div className="flex min-h-44 items-center justify-center rounded-lg bg-background p-10">
      <div
        className={cn(
          "rounded-lg bg-background-highlight",
          sizeBox[spec.size],
          spec.className
        )}
        style={spec.style}
      />
    </div>

    <div className="flex items-center gap-2">
      <span
        className={cn(
          "rounded px-1.5 py-0.5 text-[10px] font-bold uppercase",
          valueClassBadge[spec.valueClass]
        )}
      >
        {valueClassLabel[spec.valueClass]}
      </span>
      <span className="rounded bg-body-light/40 px-1.5 py-0.5 text-[10px] font-bold text-body-medium uppercase">
        {spec.size}
      </span>
      <span className="font-mono text-sm font-bold break-all">{spec.name}</span>
    </div>

    <p className="font-mono text-xs break-all text-body-medium">{spec.value}</p>

    <p className="text-xs text-body-medium">
      <span className="font-bold">On:</span> {spec.element}
    </p>

    <div className="text-xs text-body-medium">
      <span className="font-bold">Used in:</span>{" "}
      {spec.usage.length ? spec.usage.join(", ") : "(no references found)"}
    </div>

    {spec.notes && (
      <p className="rounded bg-warning-light px-2 py-1 text-xs text-warning-dark">
        {spec.notes}
      </p>
    )}
  </div>
)

const Section = ({
  title,
  description,
  specs,
}: {
  title: string
  description: string
  specs: ShadowSpec[]
}) => (
  <section className="flex flex-col gap-5 px-6 py-8">
    <div className="space-y-1">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="max-w-4xl text-sm text-body-medium">{description}</p>
    </div>
    <Grid columns={3}>
      {specs.map((spec) => (
        <ShadowSwatch key={spec.name} spec={spec} />
      ))}
    </Grid>
  </section>
)

/* ------------------------------------------------------------------ */
/* 1. CUSTOM UTILITIES                                                */
/* ------------------------------------------------------------------ */

const customUtilities: ShadowSpec[] = [
  {
    name: "shadow-primary-xl",
    className: "shadow-primary-xl",
    size: "lg",
    valueClass: "token",
    value:
      "shadow-xl tinted with primary-low-contrast (80% light / 50% dark)",
    element: "large framed boxes / window-style containers",
    usage: ["WindowBox:15", "HighlightCard/IconBox:9", "DownloadAWallet:80"],
  },
  {
    name: "shadow-primary-no-blur-* (e.g. -1)",
    className: "shadow-primary-no-blur-1",
    size: "md",
    valueClass: "token",
    value:
      "N x --spacing offset, no blur, primary-low-contrast (functional: -1 = 4px, -0.5 = 2px)",
    element: "buttons / avatars / FAQ icon / app tiles on hover",
    usage: [
      "Button:25 (hover-link)",
      "ui/avatar (0.5 & 1)",
      "Faq:24",
      "LetUseSomeApps:142",
    ],
    notes:
      "Raw box-shadow utility -- immune to the global dark-mode --tw-shadow-color override that recolors Tailwind-pipeline shadows.",
  },
]

export const CustomUtilities: StoryObj = {
  render: () => (
    <Section
      title="1. Custom utilities"
      description="The project-specific shadow utilities in utilities.css after the cleanup. Both write box-shadow directly (so they keep their color in dark mode). Everything else uses Tailwind defaults."
      specs={customUtilities}
    />
  ),
}

/* ------------------------------------------------------------------ */
/* 2. TAILWIND DEFAULTS                                               */
/* ------------------------------------------------------------------ */

const tailwindDefaults: ShadowSpec[] = [
  {
    name: "shadow-xs",
    className: "shadow-xs",
    size: "sm",
    valueClass: "tailwind",
    value: "Tailwind default xs (minimal)",
    element: "table row hover states",
    usage: ["translatathon/leaderboard:72", "acknowledgements:199"],
  },
  {
    name: "shadow-md",
    className: "shadow-md",
    size: "md",
    valueClass: "tailwind",
    value: "Tailwind default md",
    element: "dropdowns, tooltips, small panels",
    usage: [
      "MobileButtonDropdown:7",
      "Nav/Menu/MenuContent:65",
      "ui/tooltip:20",
      "ui/select:76",
    ],
  },
  {
    name: "shadow-lg",
    className: "shadow-lg",
    size: "md",
    valueClass: "tailwind",
    value: "Tailwind default lg",
    element: "cards, popovers, floating panels",
    usage: [
      "SubpageCard:37",
      "ui/popover:30",
      "ui/dialog:39",
      "Homepage/FloatingCard:17",
    ],
  },
  {
    name: "shadow-xl",
    className: "shadow-xl",
    size: "lg",
    valueClass: "tailwind",
    value: "Tailwind default xl",
    element: "full-width sheets / persistent side panels",
    usage: ["ui/persistent-panel:142", "ui/sheet:47", "ui/chart:180"],
  },
  {
    name: "shadow-2xl",
    className: "shadow-2xl",
    size: "lg",
    valueClass: "tailwind",
    value: "Tailwind default 2xl",
    element: "major feature boxes / collectibles",
    usage: ["UpgradeStatus:23", "CollectiblesContent:130"],
  },
]

export const TailwindDefaults: StoryObj = {
  render: () => (
    <Section
      title="2. Tailwind default shadows"
      description="Framework elevation primitives -- now the default choice for most surfaces (cards, dialogs, popovers, panels). shadow-none also appears as a reset."
      specs={tailwindDefaults}
    />
  ),
}

/* ------------------------------------------------------------------ */
/* 3. ARBITRARY ONE-OFFS                                              */
/* ------------------------------------------------------------------ */

const arbitrary: ShadowSpec[] = [
  {
    name: "tag offset shadow-[2px_2px]",
    className: "shadow-[2px_2px]",
    size: "sm",
    valueClass: "arbitrary",
    value: "2px 2px (no color -> uses --tw-shadow-color / current color)",
    element: "tag buttons on hover",
    usage: ["ui/tag:156"],
    notes:
      "Color-less offset; pairs with the status hover:shadow-<color> to tint. Could fold into shadow-primary-no-blur-0.5 if it standardizes on primary.",
  },
]

export const ArbitraryOneOffs: StoryObj = {
  render: () => (
    <Section
      title="3. Arbitrary one-offs"
      description="Remaining inline shadow-[...] values. The avatar, link/icon, FAQ, and app-tile offsets and the modal/side-nav shadows were migrated to shadow-primary-no-blur-* / Tailwind defaults; only the tag offset remains."
      specs={arbitrary}
    />
  ),
}

/* ------------------------------------------------------------------ */
/* 4. COLOR-ONLY SMELL                                                */
/* ------------------------------------------------------------------ */

const colorOnly: ShadowSpec[] = [
  {
    name: "hover:shadow-primary",
    className: "shadow-primary",
    size: "sm",
    valueClass: "color-only",
    value: "sets --tw-shadow-color only; no shadow-<size> companion",
    element: "tags on hover",
    usage: ["ui/tag:14,28,58"],
    notes:
      "In Tailwind v4 shadow-<color> only sets the shadow COLOR. With no shadow-<size> alongside it likely renders nothing -- VERIFY in-app before treating as intentional.",
  },
  {
    name: "hover:shadow-accent-a / -b / -c",
    className: "shadow-accent-a",
    size: "sm",
    valueClass: "color-only",
    value: "shadow color only (accent family)",
    element: "concept tags on hover",
    usage: ["ui/tag:22,24,26"],
    notes: "Same color-only pattern -- verify whether any elevation renders.",
  },
  {
    name: "hover:shadow-success / -warning / -error (+ dark/light)",
    className: "shadow-success",
    size: "sm",
    valueClass: "color-only",
    value: "shadow color only (status family)",
    element: "status tags on hover",
    usage: ["ui/tag:16,18,20,30,32,34,64,70,76"],
    notes: "Same color-only pattern across status tag variants.",
  },
  {
    name: "hover:shadow-body / -body-medium",
    className: "shadow-body",
    size: "sm",
    valueClass: "color-only",
    value: "shadow color only (body family)",
    element: "neutral tags on hover",
    usage: ["ui/tag:13,52", "ProductList:95"],
  },
]

export const ColorOnlySmell: StoryObj = {
  render: () => (
    <Section
      title="4. Color-only shadows (smell -- verify)"
      description="ui/tag.tsx applies hover:shadow-<token> with no shadow-<size> companion. In Tailwind v4 shadow-<color> sets only the shadow COLOR, so these likely produce NO visible elevation. Flagged for verification -- not asserted as broken. Boxes below are deliberately flat to show the (probable) no-op."
      specs={colorOnly}
    />
  ),
}

/* ------------------------------------------------------------------ */
/* Tailwind default scale (quick reference)                           */
/* ------------------------------------------------------------------ */

/** The full Tailwind v4 default box-shadow scale, smallest to largest. */
const tailwindScale = [
  "shadow-none",
  "shadow",
  "shadow-2xs",
  "shadow-xs",
  "shadow-sm",
  "shadow-md",
  "shadow-lg",
  "shadow-xl",
  "shadow-2xl",
] as const

/**
 * Plain reference grid: every default Tailwind shadow class on an identical
 * landscape box, ~4 across. No usage/recipe metadata -- just the visual scale.
 */
export const TailwindScale: StoryObj = {
  render: () => (
    <section className="flex flex-col gap-5 px-6 py-8">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">Tailwind default shadow scale</h2>
        <p className="max-w-4xl text-sm text-body-medium">
          Every framework-default <code>shadow-*</code> utility on an identical
          landscape box. Toggle light/dark with the theme switcher.
        </p>
      </div>
      <Grid columns={4}>
        {tailwindScale.map((shadow) => (
          <div key={shadow} className="flex flex-col items-center gap-3">
            <div
              className={cn(
                "h-40 w-full rounded-lg bg-background-highlight",
                shadow
              )}
            />
            <span className="font-mono text-xs font-bold">{shadow}</span>
          </div>
        ))}
      </Grid>
    </section>
  ),
}

/* ------------------------------------------------------------------ */
/* Overview                                                           */
/* ------------------------------------------------------------------ */

const overviewSections: {
  title: string
  description: string
  specs: ShadowSpec[]
}[] = [
  {
    title: "1. Custom utilities",
    description: "shadow-primary-xl + shadow-primary-no-blur-*.",
    specs: customUtilities,
  },
  {
    title: "2. Tailwind defaults",
    description: "Framework elevation primitives (the default choice).",
    specs: tailwindDefaults,
  },
  {
    title: "3. Arbitrary one-offs",
    description: "Remaining inline shadow recipes.",
    specs: arbitrary,
  },
  {
    title: "4. Color-only smell",
    description: "shadow-<color> with no size (probable no-ops).",
    specs: colorOnly,
  },
]

/** Every audited shadow, all buckets, each on a box sized to its real use. */
export const AllShadows: StoryObj = {
  render: () => (
    <div className="divide-y divide-body-light">
      {overviewSections.map(({ title, description, specs }) => (
        <Section
          key={title}
          title={title}
          description={description}
          specs={specs}
        />
      ))}
    </div>
  ),
}
