import { type CSSProperties, type ReactNode } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { cn } from "@/lib/utils/cn"

/**
 * GRADIENT AUDIT
 *
 * Single-pane inventory of every color gradient on the site, grouped by the
 * pattern that produces it, so the current sprawl is visible and can be unified.
 * Full written inventory (every file:line) lives in docs/gradient-audit.md.
 *
 * Toggle light/dark with the Storybook theme switcher in the toolbar -- each
 * swatch flips natively, so there is one demo box per card.
 *
 * Buckets:
 *   1. Named utilities   - CSS-variable-backed @utility classes (canonical set).
 *   2. Token-based inline - bg-linear-* with semantic tokens (accent-a/b/c...).
 *   3. Hardcoded hex      - bg-linear-* with literal hex (the sprawl).
 *   4. Data-driven brand  - per-entity hues from data files (hubs, wallets).
 *   5. Functional masks   - transparent->opaque fades; not color, out of scope.
 */

const meta = {
  title: "Design System / Gradients",
  parameters: {
    chromatic: { disableSnapshot: true },
    layout: "fullscreen",
  },
} satisfies Meta

export default meta

type GradientKind = "linear" | "radial" | "flat"

type GradientSpec = {
  /** Display name -- utility class or short identifier */
  name: string
  /** Tailwind classes applied to the swatch (must include a bg-linear/bg-* direction) */
  className?: string
  /** Inline style alternative for raw CSS values not expressible as classes */
  style?: CSSProperties
  /** Human-readable recipe summary */
  value: string
  kind: GradientKind
  /** Where it's used (file:line). For repeated recipes, count + examples. */
  usage: string[]
  /** Unification note / smell */
  notes?: string
}

const kindBadge: Record<GradientKind, string> = {
  linear: "bg-primary/15 text-primary",
  radial: "bg-accent-a/15 text-accent-a",
  flat: "bg-warning/20 text-warning-dark",
}

/** One gradient, one demo box. Flips with the Storybook theme toggle. */
const Swatch = ({ spec }: { spec: GradientSpec }) => (
  <div className="flex flex-col gap-3 rounded-xl border border-body-light p-5">
    {/* Demo box sits on the real page surface (bg-background) so translucent
        gradients read correctly; both flip with the theme toggle. */}
    <div
      className={cn(
        "h-40 w-full rounded-lg border border-black/10 bg-background dark:border-white/10",
        spec.className
      )}
      style={spec.style}
    />

    <div className="flex items-center gap-2">
      <span
        className={cn(
          "rounded px-1.5 py-0.5 text-[10px] font-bold uppercase",
          kindBadge[spec.kind]
        )}
      >
        {spec.kind}
      </span>
      <span className="font-mono text-sm font-bold break-all">{spec.name}</span>
    </div>

    <p className="font-mono text-xs break-all text-body-medium">{spec.value}</p>

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
  <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">{children}</div>
)

const Section = ({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) => (
  <section className="flex flex-col gap-5 px-6 py-8">
    <div className="space-y-1">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="max-w-4xl text-sm text-body-medium">{description}</p>
    </div>
    {children}
  </section>
)

/* ------------------------------------------------------------------ */
/* 1. NAMED UTILITIES                                                 */
/* ------------------------------------------------------------------ */

const namedUtilities: GradientSpec[] = [
  {
    name: "bg-gradient-main / bg-main-gradient",
    className: "bg-gradient-main",
    kind: "linear",
    value:
      "102.7deg, rgba(185,185,241,.2), rgba(84,132,234,.2) 51.56%, rgba(58,142,137,.2)",
    usage: [
      "wallets:307",
      "run-a-node:179",
      "layer-2:360",
      "layer-2/networks:170",
      "staking:54",
    ],
    notes:
      "Two utilities alias the same --gradient-main. Collapse to one name.",
  },
  {
    name: "bg-feedback-gradient",
    className: "bg-feedback-gradient",
    kind: "linear",
    value:
      "light = --gradient-main; dark = bespoke gray ramp (#2c2c32->#44404d->#303038)",
    usage: ["FeedbackCard:67"],
    notes: "Light reuses --gradient-main but dark is a separate gray ramp.",
  },
  {
    name: "bg-gradient-banner",
    className: "bg-gradient-banner",
    kind: "radial",
    value: "radial 155% at 50% 0%, lilac .16 -> .48 -> blue .16 -> transparent",
    usage: ["community/events:282"],
  },
  {
    name: "bg-banner-grid-gradient",
    className: "bg-banner-grid-gradient",
    kind: "linear",
    value: "90deg, 127/127/213 .2 -> 132/145/221 .2 -> 145/234/228 .2",
    usage: ["bug-bounty:757"],
  },
  {
    name: "bg-radial-a",
    className: "bg-radial-a",
    kind: "radial",
    value:
      "radial at 50% -30%, purple-500 .08 -> .24 -> blue-500 .08 -> transparent",
    usage: [
      "WhitepaperBridge:41",
      "GetStartedGrid:97",
      "resources:183",
      "developers:754",
      "10years:99",
      "SuggestAnApp:8",
    ],
    notes: "Most-reused decorative wash. Candidate canonical hero/section bg.",
  },
  {
    name: "bg-radial-b",
    className: "bg-radial-b",
    kind: "radial",
    value:
      "radial at 50% -15%, purple-500 .24 -> blue-500 .08 -> transparent (2-stop radial-a)",
    usage: ["BrowseApps:32", "community/events:282 (dark)"],
    notes: "Near-duplicate of bg-radial-a. Consider merging.",
  },
  {
    name: "bg-linear-bug-bounty-title",
    className: "bg-linear-bug-bounty-title bg-clip-text",
    kind: "linear",
    value:
      "to left, #f7cbc0 -> #f4b1ab -> #8476d9 -> #85acf9 -> #1c1ce1 -> #000",
    usage: ["bug-bounty:266 (text clip)"],
    notes: "Single-use, page-specific. Likely stays bespoke.",
  },
  {
    name: "bg-gradient-staking",
    className: "bg-gradient-staking",
    kind: "linear",
    value: "gold .1 13% -> green .1 44% -> pink .1 83%",
    usage: ["Staking/StakingHierarchy:110"],
  },
  {
    name: "bg-card-gradient",
    className: "bg-card-gradient",
    kind: "linear",
    value: "123deg, white .2 59%, rgba(174,110,203,.13)",
    usage: ["base card surface (consumed mostly via -secondary)"],
  },
  {
    name: "bg-card-gradient-secondary",
    className: "bg-card-gradient-secondary",
    kind: "linear",
    value: "95deg, rgba(211,145,242,.12), rgba(159,43,212,.12) (dark .24)",
    usage: [
      "SubpageCard:37",
      "WhitepaperBridge:76",
      "ui/callout:46",
      "10years swipers",
    ],
  },
  {
    name: "bg-card-gradient-secondary-hover",
    className: "bg-card-gradient-secondary-hover",
    kind: "linear",
    value:
      "95deg, rgba(211,145,242,.2), rgba(159,43,212,.2) (hover of -secondary)",
    usage: ["SubpageCard:37", "roadmap/ReleaseCarousel:168"],
    notes: "Could be one token + a hover/opacity modifier.",
  },
  {
    name: "bg-roadmap-card-gradient",
    className: "bg-roadmap-card-gradient",
    kind: "linear",
    value: "dark only: 123deg, rgba(34,34,34,.2) 40%, rgba(174,110,203,.13)",
    usage: ["roadmap/roadmap:135"],
    notes:
      "Declared only under .dark -- empty in light mode. Dark cousin of bg-card-gradient.",
  },
  {
    name: "bg-ten-year-gradient",
    className: "bg-ten-year-gradient",
    kind: "linear",
    value: "100deg, #f6c9ea 55%, #c7a9f1 (dark: #1e151b -> #000)",
    usage: [],
    notes: "DEFINED BUT UNUSED -- no references. Removal candidate.",
  },
  {
    name: "bg-gradient-step-1",
    className: "bg-gradient-step-1",
    kind: "flat",
    value: "rgba(127,127,213,.2) -- a flat color, NOT a gradient",
    usage: ["BrowseApps:85"],
    notes:
      "Misnamed: registered as --color-gradient-step-1. Rename to a color token.",
  },
]

export const NamedUtilities: StoryObj = {
  render: () => (
    <Section
      title="1. Named utilities (CSS-variable-backed)"
      description="Canonical reusable set in semantic-tokens.css + utilities.css. Primary unification target -- note the duplicate aliases, the unused token, and the misnamed flat color."
    >
      <Grid>
        {namedUtilities.map((spec) => (
          <Swatch key={spec.name} spec={spec} />
        ))}
      </Grid>
    </Section>
  ),
}

/* ------------------------------------------------------------------ */
/* 2. TOKEN-BASED INLINE                                              */
/* ------------------------------------------------------------------ */

const tokenInline: GradientSpec[] = [
  {
    name: "accent-a -> accent-c wash (MOST DUPLICATED)",
    className:
      "bg-linear-to-r from-accent-a/10 to-accent-c/10 dark:from-accent-a/20 dark:to-accent-c-hover/20",
    kind: "linear",
    value: "to-r, accent-a/10 -> accent-c/10 (dark /20 -> c-hover/20)",
    usage: [
      "~8 sites:",
      "ActionCard:51",
      "StakingComparison:126",
      "StakingLaunchpadWidget:60",
      "gas:144",
      "get-eth:244",
      "roadmap/_vision:96",
      "Simulator:149",
      "stablecoins:465",
    ],
    notes:
      "Hand-copied ~8 times. Promote to a single named utility (e.g. bg-accent-wash).",
  },
  {
    name: "Card tint family /5 -> /10 (accent-a)",
    className:
      "bg-linear-to-b from-accent-a/5 to-accent-a/10 dark:from-accent-a/10 dark:to-accent-a/20",
    kind: "linear",
    value: "to-b, hue/5 -> hue/10 (dark /10 -> /20)",
    usage: [
      "Card variants card.tsx:163-170 (a/b/c/primary/body)",
      "re-inlined: OrganizerCTA:18",
      "ToolModalContents:56",
      "support:176",
      "CollectiblesContent:86",
      "EventCard:52,107(body)",
    ],
    notes:
      "Inline copies should consume the Card variant instead of re-spelling it.",
  },
  {
    name: "Card tint stronger /5 -> /15 (accent-c shown)",
    className: "bg-linear-to-b from-accent-c/5 to-accent-c/15",
    kind: "linear",
    value: "to-b, hue/5 -> hue/15",
    usage: [
      "collectibles:113,124,135 (a/b/c)",
      "what-is-ethereum:304,350",
      "community/events:440,504",
    ],
    notes: "Just a stronger stop of the Card family; fold into a variant/prop.",
  },
  {
    name: "Positioned section wash (from-20% to-60%)",
    className:
      "bg-linear-to-b from-20% to-60% from-accent-c/10 to-accent-c/5 dark:from-accent-c/20 dark:to-accent-c/10",
    kind: "linear",
    value: "to-b, hue/10 @20% -> hue/5 @60%",
    usage: ["10years/data.tsx:3-8 (a/b/c x2)", "start:74 (to-t)"],
  },
  {
    name: "Section default fade to transparent",
    className:
      "bg-linear-to-b from-accent-a/10 to-accent-a/0 dark:from-accent-a/15 dark:to-accent-a/5",
    kind: "linear",
    value: "to-b, accent-a/10 -> accent-a/0",
    usage: ["ui/section.tsx:38"],
  },
  {
    name: "run-a-node 3-stop",
    className:
      "bg-linear-to-br from-accent-b/5 via-primary/10 to-accent-b/15 dark:from-accent-b/20 dark:via-primary/15 dark:to-accent-a/20",
    kind: "linear",
    value: "to-br, accent-b/5 -> primary/10 -> accent-b/15",
    usage: ["run-a-node:322"],
  },
  {
    name: "primary -> primary-low-contrast",
    className: "bg-linear-to-r from-primary to-primary-low-contrast",
    kind: "linear",
    value: "to-r, primary -> primary-low-contrast (opaque)",
    usage: ["roadmap/ReleaseCarousel:185"],
  },
  {
    name: "white -> primary/10",
    className:
      "bg-linear-to-br from-white to-primary/10 dark:from-transparent dark:to-primary/10",
    kind: "linear",
    value: "to-br, white -> primary/10 (dark: transparent -> primary/10)",
    usage: ["resources:142"],
  },
  {
    name: "error / success price cards",
    className: "bg-linear-to-b from-error/10",
    kind: "linear",
    value: "to-b from-error/10  |  to-t from-success/20",
    usage: ["EthPriceCard:46,47"],
  },
  {
    name: "blue-500 -> pink-600 (positioned)",
    className:
      "bg-linear-to-br from-blue-500/20 from-10% to-pink-600/20 to-90%",
    kind: "linear",
    value: "to-br, blue-500/20 @10% -> pink-600/20 @90%",
    usage: ["run-a-node:358", "apps/[application]:375 (blue->blue variant)"],
  },
]

export const TokenBasedInline: StoryObj = {
  render: () => (
    <Section
      title="2. Token-based inline Tailwind"
      description="Gradients written inline using semantic tokens (accent-a/b/c, primary, body). Good color hygiene, but the same recipes are hand-copied across many files. Each card shows one distinct recipe; 'Used in' lists the duplicate sites."
    >
      <Grid>
        {tokenInline.map((spec) => (
          <Swatch key={spec.name} spec={spec} />
        ))}
      </Grid>
    </Section>
  ),
}

/* ------------------------------------------------------------------ */
/* 3. HARDCODED HEX                                                   */
/* ------------------------------------------------------------------ */

const hexInline: GradientSpec[] = [
  {
    name: "FloatingCard primary",
    className: "bg-linear-to-b from-[#5c1eb4] to-[#7b3fd8]",
    kind: "linear",
    value: "to-b, #5c1eb4 -> #7b3fd8",
    usage: ["Homepage/FloatingCard:19"],
    notes: "Close to purple-700/500 -- replace with palette tokens.",
  },
  {
    name: "FeatureCards ownership",
    className: "bg-gradient-to-b from-purple-700 to-purple-500",
    kind: "linear",
    value: "to-b, purple-700 -> purple-500",
    usage: ["Homepage/FeatureCards:52"],
    notes:
      "Deprecated v3 `bg-gradient-to-b` syntax; migrate to v4 `bg-linear-to-b`.",
  },
  {
    name: "StartWithEthereumFlow slide 1",
    className:
      "bg-linear-to-r from-[#f4effe] to-[#faf6fe] dark:from-[#0f0a19] dark:to-[#0a0811]",
    kind: "linear",
    value: "to-r, #f4effe -> #faf6fe (dark #0f0a19 -> #0a0811)",
    usage: ["StartWithEthereumFlow:131"],
    notes: "1 of 3 near-identical step slides with hand-picked tints.",
  },
  {
    name: "StartWithEthereumFlow slide 2",
    className:
      "bg-linear-to-b from-[#f4fbfa] to-[#e8f6f5] dark:from-[#02100f] dark:to-[#000908]",
    kind: "linear",
    value: "to-b, #f4fbfa -> #e8f6f5 (dark #02100f -> #000908)",
    usage: ["StartWithEthereumFlow:146"],
  },
  {
    name: "StartWithEthereumFlow slide 3",
    className:
      "bg-linear-to-b from-[#ecf1fd] to-[#f6f8fe] dark:from-[#070c18] dark:to-[#02060f]",
    kind: "linear",
    value: "to-b, #ecf1fd -> #f6f8fe (dark #070c18 -> #02060f)",
    usage: ["StartWithEthereumFlow:160"],
  },
  {
    name: "10years torch-history",
    className:
      "bg-linear-to-b from-[#161A36] via-[#161A36] via-60% to-[#9C63F8]",
    kind: "linear",
    value: "to-b, #161A36 (to 60%) -> #9C63F8",
    usage: ["10years:209"],
  },
  {
    name: "stablecoins Aave banner",
    className: "bg-linear-to-tr from-[#5cb8c4] to-[#aa589b]",
    kind: "linear",
    value: "to-tr, #5cb8c4 -> #aa589b",
    usage: ["stablecoins:265"],
    notes: "Per-dapp banner. Brand-ish; document but likely stays bespoke.",
  },
  {
    name: "stablecoins Summer.fi banner",
    className: "bg-linear-to-br from-[#c7efe6] to-[#eeeac7]",
    kind: "linear",
    value: "to-br, #c7efe6 -> #eeeac7",
    usage: ["stablecoins:284"],
  },
]

export const HardcodedHex: StoryObj = {
  render: () => (
    <Section
      title="3. Hardcoded hex inline Tailwind"
      description="The real sprawl -- literal hex values instead of palette tokens. Several approximate existing palette colors and one still uses the deprecated v3 `bg-gradient-to-*` prefix."
    >
      <Grid>
        {hexInline.map((spec) => (
          <Swatch key={spec.name} spec={spec} />
        ))}
      </Grid>
    </Section>
  ),
}

/* ------------------------------------------------------------------ */
/* 4. DATA-DRIVEN BRAND                                               */
/* ------------------------------------------------------------------ */

const dataDriven: GradientSpec[] = [
  {
    name: "community-hub: Buenos Aires",
    className:
      "bg-gradient-to-b from-[#74ACDF]/5 to-[#74ACDF]/10 dark:from-[#74ACDF]/20 dark:to-[#74ACDF]/10",
    kind: "linear",
    value: "to-b, hue/5 -> hue/10 (dark /20 -> /10); hue = #74ACDF",
    usage: ["community-hubs.ts -- 8 hubs share this shape"],
    notes:
      "Same shape, only hue varies (8 cities). Generate from a helper + hue.",
  },
  {
    name: "community-hub: Rome",
    className:
      "bg-linear-to-b from-[#AF4796]/5 to-[#AF4796]/10 dark:from-[#AF4796]/20 dark:to-[#AF4796]/10",
    kind: "linear",
    value: "hue = #AF4796",
    usage: ["community-hubs.ts:57"],
  },
  {
    name: "wallet brand color (e.g. Coinbase)",
    className: "bg-linear-to-b from-[#0052FF] to-97%",
    kind: "linear",
    value: "to-b, from-[brandHex] -> transparent; one per wallet",
    usage: ["wallet-data.ts -- 52 wallets via WalletSubComponent:63"],
    notes:
      "Per-wallet hue. Not a collapse target, but fix the typo'd key `twGradiantBrandColor`.",
  },
]

export const DataDrivenBrand: StoryObj = {
  render: () => (
    <Section
      title="4. Data-driven brand gradients"
      description="Per-entity hues from data files (8 community hubs, 52 wallets). Hues are intentional, so not collapse targets -- but the shared shape could come from one helper that takes a hue, instead of re-spelling the class string per entry."
    >
      <Grid>
        {dataDriven.map((spec) => (
          <Swatch key={spec.name} spec={spec} />
        ))}
      </Grid>
    </Section>
  ),
}

/* ------------------------------------------------------------------ */
/* 5. FUNCTIONAL MASKS                                                */
/* ------------------------------------------------------------------ */

const functionalMasks: GradientSpec[] = [
  {
    name: "codeblock collapse fade",
    style: {
      background:
        "linear-gradient(to bottom, transparent, hsla(var(--background-highlight)))",
    },
    kind: "linear",
    value: "to bottom, transparent -> --background-highlight",
    usage: ["codeblock.css:81"],
    notes: "Functional fade into the surface, not a color gradient.",
  },
  {
    name: "TableOfContents scroll mask",
    style: {
      background: "#888",
      maskImage: "linear-gradient(to bottom, transparent 0, white 1rem)",
      WebkitMaskImage: "linear-gradient(to bottom, transparent 0, white 1rem)",
    },
    kind: "linear",
    value: "mask: to bottom, transparent 0 -> white 1rem",
    usage: ["TableOfContents:118"],
    notes: "Functional mask (shown over gray).",
  },
  {
    name: "edge-scroll-container mask",
    style: {
      background: "#888",
      maskImage:
        "linear-gradient(to right, transparent, white 2rem, white calc(100% - 2rem), transparent)",
      WebkitMaskImage:
        "linear-gradient(to right, transparent, white 2rem, white calc(100% - 2rem), transparent)",
    },
    kind: "linear",
    value: "mask: to right, transparent -> white -> white -> transparent",
    usage: ["ui/edge-scroll-container:33", "ToolModalContents:83"],
    notes: "Functional edge-fade mask.",
  },
]

export const FunctionalMasks: StoryObj = {
  render: () => (
    <Section
      title="5. Functional masks (not decorative)"
      description="Transparent->opaque gradients used as scroll/overflow masks and fades. Listed so they aren't swept into the color-unification effort -- they are structural."
    >
      <Grid>
        {functionalMasks.map((spec) => (
          <Swatch key={spec.name} spec={spec} />
        ))}
      </Grid>
    </Section>
  ),
}

/* ------------------------------------------------------------------ */
/* Overview                                                           */
/* ------------------------------------------------------------------ */

export const AllGradients: StoryObj = {
  render: () => (
    <div className="divide-y divide-body-light">
      <Section
        title="1. Named utilities"
        description="Canonical reusable set -- primary unification target."
      >
        <Grid>
          {namedUtilities.map((spec) => (
            <Swatch key={spec.name} spec={spec} />
          ))}
        </Grid>
      </Section>
      <Section
        title="2. Token-based inline"
        description="Semantic-token recipes, hand-copied across files."
      >
        <Grid>
          {tokenInline.map((spec) => (
            <Swatch key={spec.name} spec={spec} />
          ))}
        </Grid>
      </Section>
      <Section
        title="3. Hardcoded hex"
        description="Literal hex -- the sprawl."
      >
        <Grid>
          {hexInline.map((spec) => (
            <Swatch key={spec.name} spec={spec} />
          ))}
        </Grid>
      </Section>
      <Section
        title="4. Data-driven brand"
        description="Per-entity hues from data files."
      >
        <Grid>
          {dataDriven.map((spec) => (
            <Swatch key={spec.name} spec={spec} />
          ))}
        </Grid>
      </Section>
      <Section
        title="5. Functional masks"
        description="Structural fades, out of scope for color unification."
      >
        <Grid>
          {functionalMasks.map((spec) => (
            <Swatch key={spec.name} spec={spec} />
          ))}
        </Grid>
      </Section>
    </div>
  ),
}
