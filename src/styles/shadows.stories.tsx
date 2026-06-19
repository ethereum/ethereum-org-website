import { type CSSProperties, type ReactNode } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { cn } from "@/lib/utils/cn"

/**
 * SHADOW AUDIT
 *
 * Companion to the gradient and color audits. Single-pane inventory of every
 * box-shadow on the site, grouped by how it's produced, so the sprawl is
 * visible and can be unified.
 *
 * KEY: each shadow is demoed on a box whose SIZE matches its real-world use --
 * a full-width-card shadow looks wrong on a thumbnail, and a table-row hairline
 * disappears on a large box. `size` (sm/md/lg) drives the demo box dimensions.
 *
 * Toggle light/dark with the Storybook theme switcher -- shadows that have
 * dark-mode token variants flip natively.
 *
 * Buckets:
 *   1. Named tokens   - CSS-variable-backed shadow utilities (the canonical set).
 *   2. Tailwind defaults - shadow-md/lg/xl/2xl/xs (framework primitives).
 *   3. Arbitrary one-offs - shadow-[...] / inline boxShadow (the sprawl).
 *   4. Color-only smell  - shadow-<color> with no size class (likely no-ops).
 *
 * Full written inventory lives in docs/shadow-audit.md (local, git-excluded).
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

const Grid = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {children}
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
    <Grid>
      {specs.map((spec) => (
        <ShadowSwatch key={spec.name} spec={spec} />
      ))}
    </Grid>
  </section>
)

/* ------------------------------------------------------------------ */
/* 1. NAMED TOKENS                                                    */
/* ------------------------------------------------------------------ */

const namedTokens: ShadowSpec[] = [
  {
    name: "shadow-window-box",
    className: "shadow-window-box",
    size: "lg",
    valueClass: "token",
    value: "5-layer purple-tinted elevation (--shadow-window-box-1..5)",
    element: "large floating windows / modal-like cards",
    usage: ["WindowBox:15", "HighlightCard:9", "DownloadAWallet:73"],
  },
  {
    name: "shadow-widget",
    className: "shadow-widget",
    size: "md",
    valueClass: "token",
    value: "4-layer directional widget shadow (RTL-aware, --shadow-widget)",
    element: "floating widget panel (audio player)",
    usage: ["ListenToPlayer/PlayerWidget:143"],
  },
  {
    name: "shadow-svg-button-link",
    className: "shadow-svg-button-link",
    size: "md",
    valueClass: "token",
    value: "4-layer purple glow (--shadow-svg-button-link-1..4)",
    element: "interactive SVG link buttons",
    usage: ["ProductTable/PresetFilters:87"],
  },
  {
    name: "shadow-svg-button-link-hover",
    className: "shadow-svg-button-link-hover",
    size: "md",
    valueClass: "token",
    value: "hover glow variant of shadow-svg-button-link (shown un-hovered)",
    element: "SVG link buttons on hover",
    usage: ["PresetFilters:87 (hover)"],
  },
  {
    name: "shadow-card-hover",
    className: "shadow-card-hover",
    size: "md",
    valueClass: "token",
    value: "--shadow-body-md + --shadow-body-lg (gray elevation lift)",
    element: "cards on hover (shown un-hovered)",
    usage: ["card hover states"],
  },
  {
    name: "shadow-table-box",
    className: "shadow-table-box",
    size: "lg",
    valueClass: "token",
    value: "3-layer soft elevation (--table-box-shadow)",
    element: "full-width table / list containers",
    usage: [
      "ActionCard:44",
      "BugBountyCards:105",
      "DataProductCard:42",
      "tutorials:261",
    ],
  },
  {
    name: "shadow-table-box-hover",
    className: "shadow-table-box-hover",
    size: "lg",
    valueClass: "token",
    value: "0px 8px 17px rgba(0,0,0,.15)",
    element: "table/card containers on hover (shown un-hovered)",
    usage: ["BugBountyCards:106", "ActionCard:44"],
  },
  {
    name: "shadow-table-item-box",
    className: "shadow-table-item-box",
    size: "sm",
    valueClass: "token",
    value: "0 1px 1px rgba(0,0,0,.1) (hairline)",
    element: "individual table rows / list items",
    usage: [
      "FeedbackWidget/FixedDot:27",
      "community/page:196",
      "bug-bounty/page:381,760",
    ],
  },
  {
    name: "shadow-drop",
    className: "shadow-drop",
    size: "md",
    valueClass: "token",
    value: "0 4px 17px 0 rgba(0,0,0,.08)",
    element: "floating widgets / browse boxes / dropdowns",
    usage: ["Quiz/QuizWidget:109", "BrowseApps:55", "layer-2/page:371"],
  },
  {
    name: "shadow-tooltip",
    className: "shadow-tooltip",
    size: "sm",
    valueClass: "token",
    value: "0 0 16px var(--tooltip-shadow)",
    element: "tooltips (small floating)",
    usage: ["tooltip surfaces"],
  },
  {
    name: "shadow-menu-accordion",
    className: "shadow-menu-accordion",
    size: "sm",
    valueClass: "token",
    value: "inset top+bottom rgba shadows (recessed)",
    element: "nav menu accordion (inset)",
    usage: ["nav menu accordion"],
  },
  {
    name: "shadow-grid-yellow-box-shadow",
    className: "shadow-grid-yellow-box-shadow",
    size: "sm",
    valueClass: "token",
    value: "8px 8px 0px 0px #ffe78e (solid offset, no blur)",
    element: "colored accent block (solid offset)",
    usage: ["grid accent blocks"],
    notes:
      "Hardcoded brand-ish hex baked into a token; solid offset, not blur.",
  },
  {
    name: "shadow-grid-blue-box-shadow",
    className: "shadow-grid-blue-box-shadow",
    size: "sm",
    valueClass: "token",
    value: "8px 8px 0px 0px #a7d0f4 (solid offset, no blur)",
    element: "colored accent block (solid offset)",
    usage: ["grid accent blocks"],
  },
]

export const NamedTokens: StoryObj = {
  render: () => (
    <Section
      title="1. Named tokens (CSS-variable-backed)"
      description="The canonical shadow set in semantic-tokens.css + theme.css. Several are multi-layer, theme-aware (light/dark), and RTL-aware. Hover variants are shown in their resting (applied) state so the recipe is visible."
      specs={namedTokens}
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
      description="Framework elevation primitives used directly. Coherent on their own, but they sit alongside the named-token set above with no clear rule for when to use which (shadow-none also appears ~11x as a reset)."
      specs={tailwindDefaults}
    />
  ),
}

/* ------------------------------------------------------------------ */
/* 3. ARBITRARY ONE-OFFS                                              */
/* ------------------------------------------------------------------ */

const arbitrary: ShadowSpec[] = [
  {
    name: "avatar offset (2px / 4px)",
    style: { boxShadow: "4px 4px 0 hsla(var(--primary-low-contrast))" },
    size: "sm",
    valueClass: "arbitrary",
    value: "shadow-[2px_2px_0_var(--avatar-base-shadow-color)] (4px on larger)",
    element: "avatars on hover (size-6 .. size-16)",
    usage: ["ui/avatar:25,30,35,40"],
    notes:
      "Real value uses --avatar-base-shadow-color; demoed here with primary-low-contrast. Solid offset, scales by avatar size.",
  },
  {
    name: "link/icon hover offset",
    className: "shadow-[4px_4px_hsla(var(--primary-low-contrast))]",
    size: "md",
    valueClass: "arbitrary",
    value: "4px 4px hsla(var(--primary-low-contrast)) (solid offset)",
    element: "links / app tiles / FAQ icon on hover",
    usage: [
      "ui/buttons/Button:24",
      "Faq/index:24",
      "StartWithEthereumFlow/LetUseSomeApps:142",
    ],
    notes:
      "Same offset recipe re-spelled across files -- candidate for one named offset-accent shadow.",
  },
  {
    name: "tag offset shadow-[2px_2px]",
    className: "shadow-[2px_2px]",
    size: "sm",
    valueClass: "arbitrary",
    value: "2px 2px (no color -> uses current color)",
    element: "tags",
    usage: ["ui/tag:156"],
    notes: "Color-less offset; relies on inherited shadow color.",
  },
  {
    name: "dialog modal blur",
    style: {
      boxShadow:
        "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
    },
    size: "lg",
    valueClass: "arbitrary",
    value: "2-layer deep blur, hsl-based",
    element: "modal dialogs",
    usage: ["ui/dialog-modal:14"],
    notes: "Bespoke modal blur -- overlaps shadow-window-box intent.",
  },
  {
    name: "side-nav edge line",
    style: { boxShadow: "1px 0px 0px rgba(0,0,0,0.1)" },
    size: "md",
    valueClass: "arbitrary",
    value: "1px 0px 0px rgba(0,0,0,.1) (right hairline)",
    element: "side nav (used as a border)",
    usage: ["SideNav:140"],
    notes: "Shadow used as a 1px border -- prefer a real border token.",
  },
  {
    name: "data-product inset line",
    style: { boxShadow: "rgb(0 0 0 / 10%) 0px -1px 0px inset" },
    size: "md",
    valueClass: "arbitrary",
    value: "inset top hairline",
    element: "image placeholder top edge",
    usage: ["DataProductCard:48"],
  },
]

export const ArbitraryOneOffs: StoryObj = {
  render: () => (
    <Section
      title="3. Arbitrary one-offs (the sprawl)"
      description="Inline shadow-[...] / boxShadow values hand-written per site. Offset-accent shadows (avatars, links, FAQ, tags) repeat the same recipe; a couple use box-shadow as a border substitute."
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
/* Overview                                                           */
/* ------------------------------------------------------------------ */

const overviewSections: {
  title: string
  description: string
  specs: ShadowSpec[]
}[] = [
  {
    title: "1. Named tokens",
    description: "CSS-variable-backed canonical set.",
    specs: namedTokens,
  },
  {
    title: "2. Tailwind defaults",
    description: "Framework elevation primitives.",
    specs: tailwindDefaults,
  },
  {
    title: "3. Arbitrary one-offs",
    description: "Inline shadow recipes -- the sprawl.",
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
