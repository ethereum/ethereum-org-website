import { type ReactNode } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { cn } from "@/lib/utils/cn"

const meta = {
  title: "Design System / Colors",
  parameters: {
    // Do not create snapshots for any stories in the file.
    chromatic: { disableSnapshot: true },
  },
} satisfies Meta

export default meta

/* ================================================================== */
/* COLOR USAGE AUDIT                                                   */
/* ------------------------------------------------------------------ */
/* Companion to the gradient audit (src/styles/gradients.stories.tsx). */
/* Inventories how flat colors are actually USED across the repo, with */
/* the use-context preserved: a background color is demoed as a box    */
/* fill, a text color as text on a production-like surface, a border   */
/* color as a bordered box, a fill/stroke color as an icon.            */
/*                                                                     */
/* Within each context, values split three ways:                      */
/*   token - themed semantic token (primary, accent-a/b/c, body...).   */
/*           Theme-aware and healthy; listed with rough counts.        */
/*   shade - one-off raw palette shade (-50..-950). The sprawl.        */
/*   hex   - literal hex. INCLUDED only when it's a one-off tint we    */
/*           could standardize; external brand hex (wallets, hubs,     */
/*           social) is SKIPPED and only summarized.                   */
/*                                                                     */
/* Flips with the Storybook theme toggle. Full written inventory lives */
/* in docs/color-audit.md (local working doc, git-excluded).           */
/* ================================================================== */

type ColorContext = "text" | "bg" | "border" | "fill"
type ColorValueClass = "token" | "shade" | "hex"

type ColorSpec = {
  /** The utility or identifier, e.g. "text-gray-500". */
  name: string
  context: ColorContext
  valueClass: ColorValueClass
  /** Tailwind classes applied to the demo element (the colored part). */
  className?: string
  /** Surface bg for text/fill demos. Defaults to bg-background. */
  surface?: string
  /** Resolved value / short recipe summary. */
  value: string
  /** Where it's used (file:line). Rough count + examples for ubiquitous tokens. */
  usage: string[]
  /** Smell / unification note. */
  notes?: string
}

const valueClassBadge: Record<ColorValueClass, string> = {
  token: "bg-success/20 text-success-dark",
  shade: "bg-warning/20 text-warning-dark",
  hex: "bg-error/20 text-error-dark",
}

const valueClassLabel: Record<ColorValueClass, string> = {
  token: "token",
  shade: "raw shade",
  hex: "hex",
}

const SampleIcon = ({ stroke }: { stroke: boolean }) => (
  <svg viewBox="0 0 24 24" className="size-10" strokeWidth={stroke ? 2 : 0}>
    <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 21.4l1.4-6.8L2.2 9.9l6.9-.8z" />
  </svg>
)

/** One color, one demo that reflects its real use-context. */
const ColorSwatch = ({ spec }: { spec: ColorSpec }) => {
  const surface = spec.surface ?? "bg-background"

  let demo: ReactNode
  if (spec.context === "bg") {
    demo = (
      <div
        className={cn(
          "h-24 w-full rounded-lg border border-black/10 dark:border-white/10",
          spec.className
        )}
      />
    )
  } else if (spec.context === "text") {
    demo = (
      <div
        className={cn(
          "flex h-24 w-full items-center justify-center rounded-lg border border-black/10 dark:border-white/10",
          surface
        )}
      >
        <span className={cn("text-2xl font-bold", spec.className)}>
          Aa Ethereum 123
        </span>
      </div>
    )
  } else if (spec.context === "border") {
    demo = (
      <div className="flex h-24 w-full items-center justify-center rounded-lg bg-background">
        <div className={cn("h-16 w-32 rounded-lg border-4", spec.className)} />
      </div>
    )
  } else {
    // fill / stroke
    const isStroke = spec.name.startsWith("stroke")
    demo = (
      <div
        className={cn(
          "flex h-24 w-full items-center justify-center rounded-lg border border-black/10 dark:border-white/10",
          surface,
          isStroke ? cn("fill-none", spec.className) : spec.className
        )}
      >
        <SampleIcon stroke={isStroke} />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-body-light p-5">
      {demo}

      <div className="flex items-center gap-2">
        <span
          className={cn(
            "rounded px-1.5 py-0.5 text-[10px] font-bold uppercase",
            valueClassBadge[spec.valueClass]
          )}
        >
          {valueClassLabel[spec.valueClass]}
        </span>
        <span className="font-mono text-sm font-bold break-all">
          {spec.name}
        </span>
      </div>

      <p className="font-mono text-xs break-all text-body-medium">
        {spec.value}
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
}

const AuditGrid = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {children}
  </div>
)

const AuditSection = ({
  title,
  description,
  specs,
}: {
  title: string
  description: string
  specs: ColorSpec[]
}) => (
  <section className="flex flex-col gap-5 px-6 py-8">
    <div className="space-y-1">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="max-w-4xl text-sm text-body-medium">{description}</p>
    </div>
    <AuditGrid>
      {specs.map((spec) => (
        <ColorSwatch key={`${spec.context}-${spec.name}`} spec={spec} />
      ))}
    </AuditGrid>
  </section>
)

/** A standalone note card -- used to record the SKIPPED external brand hex. */
const SkipNote = ({ title, body }: { title: string; body: string }) => (
  <section className="px-6 py-8">
    <div className="max-w-4xl rounded-xl border border-dashed border-body-medium bg-background-highlight p-5">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-1 text-sm text-body-medium">{body}</p>
    </div>
  </section>
)

/* ------------------------------------------------------------------ */
/* TEXT                                                               */
/* ------------------------------------------------------------------ */

const textTokens: ColorSpec[] = [
  {
    name: "text-body",
    context: "text",
    valueClass: "token",
    className: "text-body",
    value: "gray-900 (dark: gray-100) -- default body text. ~132 uses.",
    usage: ["ubiquitous (layouts, prose, cards)"],
  },
  {
    name: "text-body-medium",
    context: "text",
    valueClass: "token",
    className: "text-body-medium",
    value: "gray-500 (dark: gray-400) -- secondary text. ~242 uses.",
    usage: ["ubiquitous (captions, descriptions, meta)"],
  },
  {
    name: "text-primary",
    context: "text",
    valueClass: "token",
    className: "text-primary",
    value: "purple-600 (dark: purple-400). ~96 uses.",
    usage: ["links, CTAs across src/components + app/"],
  },
  {
    name: "text-primary-hover",
    context: "text",
    valueClass: "token",
    className: "text-primary-hover",
    value: "purple-500 (dark: purple-300). ~37 uses.",
    usage: ["link/button hover states"],
  },
  {
    name: "text-accent-a",
    context: "text",
    valueClass: "token",
    className: "text-accent-a",
    value: "blue-600 (dark: blue-400). ~22 uses.",
    usage: ["accent highlights"],
  },
  {
    name: "text-accent-b",
    context: "text",
    valueClass: "token",
    className: "text-accent-b",
    value: "pink-600 (dark: pink-400). ~13 uses.",
    usage: ["accent highlights"],
  },
  {
    name: "text-accent-c",
    context: "text",
    valueClass: "token",
    className: "text-accent-c",
    value: "teal-700 (dark: teal-400). ~13 uses.",
    usage: ["accent highlights"],
  },
  {
    name: "text-error",
    context: "text",
    valueClass: "token",
    className: "text-error",
    value: "red-700. ~16 uses.",
    usage: ["form errors, validation"],
  },
  {
    name: "text-success",
    context: "text",
    valueClass: "token",
    className: "text-success",
    value: "green-600. ~15 uses.",
    usage: ["success messaging"],
  },
  {
    name: "text-warning-dark",
    context: "text",
    valueClass: "token",
    className: "text-warning-dark",
    value: "yellow-900. ~5 uses.",
    usage: ["warning text on light warning surfaces"],
  },
  {
    name: "text-disabled",
    context: "text",
    valueClass: "token",
    className: "text-disabled",
    value: "gray-400 (dark: gray-500). ~26 uses.",
    usage: ["disabled inputs, inactive states"],
  },
  {
    name: "text-body-inverse",
    context: "text",
    valueClass: "token",
    className: "text-body-inverse",
    surface: "bg-body",
    value: "white (dark: black) -- shown here on bg-body.",
    usage: ["text on inverse/dark surfaces"],
  },
]

const textShades: ColorSpec[] = [
  {
    name: "text-gray-500",
    context: "text",
    valueClass: "shade",
    className: "text-gray-500",
    value: "raw gray-500 -- overlaps the text-body-medium token.",
    usage: [
      "UpgradeTableOfContents:25",
      "Breadcrumbs/index:89",
      "apps/[application]/page:294",
    ],
    notes: "Use text-body-medium instead of a raw gray shade.",
  },
  {
    name: "text-gray-400",
    context: "text",
    valueClass: "shade",
    className: "text-gray-400",
    value: "raw gray-400 -- overlaps text-disabled / body-menu.",
    usage: ["Breadcrumbs separators", "apps/[application]/page:310"],
    notes: "Maps to a body/disabled token.",
  },
  {
    name: "text-green-700 (bug-bounty 'low')",
    context: "text",
    valueClass: "shade",
    className: "text-green-700 dark:text-green-300",
    value: "severity-badge text color, paired with bg-green-500/15.",
    usage: ["BugBountyCards:22"],
    notes: "Severity badge palette -- candidate for a severity token set.",
  },
  {
    name: "text-yellow-700 (bug-bounty 'medium')",
    context: "text",
    valueClass: "shade",
    className: "text-yellow-700 dark:text-yellow-300",
    value: "severity-badge text color.",
    usage: ["BugBountyCards:23", "bug-bounty/page:665"],
  },
  {
    name: "text-orange-700 (bug-bounty 'high')",
    context: "text",
    valueClass: "shade",
    className: "text-orange-700 dark:text-orange-300",
    value: "severity-badge text color.",
    usage: ["BugBountyCards:24", "bug-bounty/page:688"],
  },
  {
    name: "text-red-700 (bug-bounty 'critical')",
    context: "text",
    valueClass: "shade",
    className: "text-red-700 dark:text-red-300",
    value: "severity-badge text color.",
    usage: ["BugBountyCards:25"],
  },
  {
    name: "text-green-400 (terminal)",
    context: "text",
    valueClass: "shade",
    className: "text-green-400",
    surface: "bg-gray-900",
    value: "terminal prompt color (shown on a dark terminal surface).",
    usage: ["ui/terminal-typewriter:68"],
    notes: "Terminal-themed; could become a scoped terminal token.",
  },
  {
    name: "text-amber-100 (terminal)",
    context: "text",
    valueClass: "shade",
    className: "text-amber-100",
    surface: "bg-gray-900",
    value: "terminal body/cursor color.",
    usage: ["ui/terminal-typewriter:74,77"],
  },
]

const textHex: ColorSpec[] = [
  {
    name: "text-[#787878] (staking h4)",
    context: "text",
    valueClass: "hex",
    className: "text-[#787878]",
    value: "#787878 -- one-off gray, not a token.",
    usage: ["staking/page:56"],
    notes: "One-off; closest tokens are body-medium / gray-400.",
  },
]

/* ------------------------------------------------------------------ */
/* BACKGROUND                                                         */
/* ------------------------------------------------------------------ */

const bgTokens: ColorSpec[] = [
  {
    name: "bg-primary",
    context: "bg",
    valueClass: "token",
    className: "bg-primary",
    value: "purple-600 (dark: purple-400). ~31 uses.",
    usage: ["primary buttons, CTAs"],
  },
  {
    name: "bg-primary-low-contrast",
    context: "bg",
    valueClass: "token",
    className: "bg-primary-low-contrast",
    value: "purple-100 (dark: purple-900). ~23 uses.",
    usage: ["subtle primary surfaces, containers"],
  },
  {
    name: "bg-primary-hover",
    context: "bg",
    valueClass: "token",
    className: "bg-primary-hover",
    value: "purple-500 (dark: purple-300). ~12 uses.",
    usage: ["button hover backgrounds"],
  },
  {
    name: "bg-body-light",
    context: "bg",
    valueClass: "token",
    className: "bg-body-light",
    value: "gray-200 (dark: gray-600). ~13 uses.",
    usage: ["light content sections, dividers"],
  },
  {
    name: "bg-accent-a",
    context: "bg",
    valueClass: "token",
    className: "bg-accent-a",
    value: "blue-600 (dark: blue-400). ~13 uses.",
    usage: ["accent backgrounds"],
  },
  {
    name: "bg-accent-c",
    context: "bg",
    valueClass: "token",
    className: "bg-accent-c",
    value: "teal-700 (dark: teal-400). ~9 uses.",
    usage: ["accent backgrounds"],
  },
  {
    name: "bg-success / bg-success-light",
    context: "bg",
    valueClass: "token",
    className: "bg-success-light",
    value: "success green-100 light surface (bg-success = green-600).",
    usage: ["success banners, indicators (~9 + ~6)"],
  },
  {
    name: "bg-error / bg-error-light",
    context: "bg",
    valueClass: "token",
    className: "bg-error-light",
    value: "error red-100 light surface (bg-error = red-700).",
    usage: ["error banners (~6 + ~5)"],
  },
  {
    name: "bg-warning-light",
    context: "bg",
    valueClass: "token",
    className: "bg-warning-light",
    value: "yellow-100. ~5 uses.",
    usage: ["warning callouts"],
  },
  {
    name: "bg-disabled",
    context: "bg",
    valueClass: "token",
    className: "bg-disabled",
    value: "gray-400 (dark: gray-500). ~6 uses.",
    usage: ["disabled component fills"],
  },
  {
    name: "bg-body-inverse",
    context: "bg",
    valueClass: "token",
    className: "bg-body-inverse",
    value: "white (dark: black). ~5 uses.",
    usage: ["inverse surfaces"],
  },
]

const bgShades: ColorSpec[] = [
  {
    name: "bg-green-500/15 (severity low)",
    context: "bg",
    valueClass: "shade",
    className: "bg-green-500/15",
    value: "translucent severity badge surface.",
    usage: ["BugBountyCards:22"],
    notes:
      "Severity set (green/yellow/orange/red @ /15) -- collapse into a severity token scale.",
  },
  {
    name: "bg-yellow-500/15 (severity medium)",
    context: "bg",
    valueClass: "shade",
    className: "bg-yellow-500/15",
    value: "translucent severity badge surface.",
    usage: ["BugBountyCards:23"],
  },
  {
    name: "bg-orange-500/15 (severity high)",
    context: "bg",
    valueClass: "shade",
    className: "bg-orange-500/15",
    value: "translucent severity badge surface.",
    usage: ["BugBountyCards:24"],
  },
  {
    name: "bg-red-500/15 (severity critical)",
    context: "bg",
    valueClass: "shade",
    className: "bg-red-500/15",
    value: "translucent severity badge surface.",
    usage: ["BugBountyCards:25"],
  },
  {
    name: "bg-green-100 / blue-100 / pink-100 ... (founders badges)",
    context: "bg",
    valueClass: "shade",
    className: "bg-green-100",
    value:
      "founder badge fills; full set spans green/blue/pink/yellow/purple-100.",
    usage: ["founders page badges (multiple)"],
    notes: "Per-founder color set built from raw -100 shades.",
  },
  {
    name: "bg-blue-600 / blue-400 / blue-200 / blue-100 (maturity tooltip)",
    context: "bg",
    valueClass: "shade",
    className: "bg-blue-600",
    value: "network-maturity tooltip tiers (high->minimal).",
    usage: ["Layer2NetworksTable/NetworkMaturityTooltip:23,30,37,44"],
    notes: "Maturity scale -- see the hex twin in NetworkMaturity.tsx.",
  },
  {
    name: "bg-purple-50 / teal-100 / blue-100 (GetStartedGrid icons)",
    context: "bg",
    valueClass: "shade",
    className: "bg-teal-100",
    value: "card icon background tints.",
    usage: ["Homepage/GetStartedGrid:47,64,81"],
  },
  {
    name: "bg-gray-800 (modal overlay)",
    context: "bg",
    valueClass: "shade",
    className: "bg-gray-800",
    value: "dark overlay / panel surface.",
    usage: ["ui/sheet:37", "ui/persistent-panel:137"],
    notes: "Overlay surfaces should use a background token.",
  },
  {
    name: "bg-gray-900 / gray-100 (stablecoins cards)",
    context: "bg",
    valueClass: "shade",
    className: "bg-gray-900",
    value: "dark/light stablecoin comparison cards.",
    usage: ["stablecoins/page:303,311,319"],
  },
  {
    name: "bg-teal-600 / teal-500 / blue-500 ... (translatathon)",
    context: "bg",
    valueClass: "shade",
    className: "bg-teal-600",
    value: "leaderboard tier colors built from raw shades.",
    usage: ["translatathon/leaderboard/Leaderboard:14,21"],
  },
]

const bgHex: ColorSpec[] = [
  {
    name: "bg-[#3C4CEB] (maturity: high)",
    context: "bg",
    valueClass: "hex",
    className: "bg-[#3C4CEB]",
    value: "#3C4CEB -- near blue-600 token.",
    usage: ["NetworkMaturity:54"],
    notes:
      "Maturity scale (4 hex) -- candidate for a named maturity token set.",
  },
  {
    name: "bg-[#6995F7] (maturity: medium)",
    context: "bg",
    valueClass: "hex",
    className: "bg-[#6995F7]",
    value: "#6995F7 -- near blue-400 token.",
    usage: ["NetworkMaturity:68"],
  },
  {
    name: "bg-[#CADFFB] (maturity: low)",
    context: "bg",
    valueClass: "hex",
    className: "bg-[#CADFFB]",
    value: "#CADFFB -- near blue-200 token.",
    usage: ["NetworkMaturity:84"],
  },
  {
    name: "bg-[#E8F1FF] (maturity: minimal)",
    context: "bg",
    valueClass: "hex",
    className: "bg-[#E8F1FF]",
    value: "#E8F1FF -- near blue-100 token.",
    usage: ["NetworkMaturity:102"],
  },
  {
    name: "app-highlight peach",
    context: "bg",
    valueClass: "hex",
    className: "bg-[#FFE3D3]",
    value: "#FFE3D3 -- pastel app highlight.",
    usage: ["StartWithEthereumFlow/LetUseSomeApps:33", "run-a-node/page:427"],
    notes:
      "App-highlight family (#FFE3D3/#E1FEFA/#D1D1FF + community-page tints) -- unify into a few highlight tokens.",
  },
  {
    name: "app-highlight mint",
    context: "bg",
    valueClass: "hex",
    className: "bg-[#E1FEFA]",
    value: "#E1FEFA -- pastel app highlight.",
    usage: ["StartWithEthereumFlow/LetUseSomeApps:48,63"],
  },
  {
    name: "app-highlight lavender",
    context: "bg",
    valueClass: "hex",
    className: "bg-[#D1D1FF]",
    value: "#D1D1FF -- pastel app highlight.",
    usage: ["StartWithEthereumFlow/LetUseSomeApps:78"],
  },
  {
    name: "community section cyan",
    context: "bg",
    valueClass: "hex",
    className: "bg-[#ccfcff] dark:bg-[#293233]",
    value: "#ccfcff (dark #293233) -- community/node section tint.",
    usage: ["community/page:232", "run-a-node/page:405"],
  },
  {
    name: "simulator surface",
    context: "bg",
    valueClass: "hex",
    className: "bg-[#e8e8e8] dark:bg-[#171717]",
    value: "#e8e8e8 / #171717 -- simulator + resources surfaces.",
    usage: ["Simulator/ConnectWeb3/Web3App:30", "resources/page:140"],
    notes: "Should map to background / background-highlight tokens.",
  },
]

/* ------------------------------------------------------------------ */
/* BORDER                                                             */
/* ------------------------------------------------------------------ */

const borderTokens: ColorSpec[] = [
  {
    name: "border-body-light",
    context: "border",
    valueClass: "token",
    className: "border-body-light",
    value: "gray-200 (dark: gray-600) -- default border. ~29 uses.",
    usage: ["cards, dividers, containers (ubiquitous)"],
  },
  {
    name: "border-primary",
    context: "border",
    valueClass: "token",
    className: "border-primary",
    value: "purple-600 (dark: purple-400). ~20 uses.",
    usage: ["focused/active borders"],
  },
  {
    name: "border-body",
    context: "border",
    valueClass: "token",
    className: "border-body",
    value: "gray-900 (dark: gray-100). ~12 uses.",
    usage: ["high-contrast borders"],
  },
  {
    name: "border-error",
    context: "border",
    valueClass: "token",
    className: "border-error",
    value: "red-700. ~11 uses.",
    usage: ["invalid input borders"],
  },
  {
    name: "border-accent-a",
    context: "border",
    valueClass: "token",
    className: "border-accent-a",
    value: "blue-600 (dark: blue-400). ~9 uses.",
    usage: ["accent borders"],
  },
  {
    name: "border-accent-c",
    context: "border",
    valueClass: "token",
    className: "border-accent-c",
    value: "teal-700 (dark: teal-400). ~7 uses.",
    usage: ["accent borders"],
  },
  {
    name: "border-disabled",
    context: "border",
    valueClass: "token",
    className: "border-disabled",
    value: "gray-400 (dark: gray-500). ~9 uses.",
    usage: ["disabled field borders"],
  },
]

const borderShades: ColorSpec[] = [
  {
    name: "border-gray-300",
    context: "border",
    valueClass: "shade",
    className: "border-gray-300",
    value: "raw gray-300 -- overlaps border-hover token.",
    usage: ["AB/TestDebugPanel:66"],
    notes: "Single use (debug panel); trivially mappable to a border token.",
  },
]

const borderHex: ColorSpec[] = [
  {
    name: "StartWithEthereumFlow border (lavender)",
    context: "border",
    valueClass: "hex",
    className: "border-[#ebe0fd] dark:border-[#1c112f]",
    value: "#ebe0fd / #1c112f -- step-slide border (light/dark pair).",
    usage: ["StartWithEthereumFlow/index:135"],
    notes:
      "Three step-slide border pairs (lavender/teal/blue) -- unify with the slide bg tints.",
  },
  {
    name: "StartWithEthereumFlow border (teal)",
    context: "border",
    valueClass: "hex",
    className: "border-[#b2e2de] dark:border-[#083935]",
    value: "#b2e2de / #083935 -- step-slide border (light/dark pair).",
    usage: ["StartWithEthereumFlow/index:150"],
  },
  {
    name: "StartWithEthereumFlow border (blue)",
    context: "border",
    valueClass: "hex",
    className: "border-[#d7e1fc] dark:border-[#192853]",
    value: "#d7e1fc / #192853 -- step-slide border (light/dark pair).",
    usage: ["StartWithEthereumFlow/index:164"],
  },
]

/* ------------------------------------------------------------------ */
/* FILL / STROKE                                                      */
/* ------------------------------------------------------------------ */

const fillStrokeTokens: ColorSpec[] = [
  {
    name: "fill-primary",
    context: "fill",
    valueClass: "token",
    className: "fill-primary",
    value: "purple-600 (dark: purple-400). ~6 uses.",
    usage: ["icon fills"],
  },
  {
    name: "fill-primary-hover",
    context: "fill",
    valueClass: "token",
    className: "fill-primary-hover",
    value: "purple-500 (dark: purple-300). ~2 uses.",
    usage: ["icon hover fills"],
  },
  {
    name: "stroke-body",
    context: "fill",
    valueClass: "token",
    className: "stroke-body",
    value: "gray-900 (dark: gray-100). ~4 uses.",
    usage: ["icon strokes"],
  },
  {
    name: "stroke-primary-hover",
    context: "fill",
    valueClass: "token",
    className: "stroke-primary-hover",
    value: "purple-500 (dark: purple-300). ~4 uses.",
    usage: ["icon stroke hover"],
  },
]

/* ------------------------------------------------------------------ */
/* Story exports                                                      */
/* ------------------------------------------------------------------ */

export const TextColors: StoryObj = {
  render: () => (
    <div className="divide-y divide-body-light">
      <AuditSection
        title="Text - themed tokens"
        description="Theme-aware semantic tokens for text. The healthy default; demoed as text on the page surface (bg-background)."
        specs={textTokens}
      />
      <AuditSection
        title="Text - raw shades"
        description="One-off numbered palette shades used directly as text color. Mostly bug-bounty severity badges and terminal styling."
        specs={textShades}
      />
      <AuditSection
        title="Text - one-off hex"
        description="Literal hex text color that is NOT external brand. External-brand text hex (Discord/Twitter/Reddit/etc.) is skipped -- see note below."
        specs={textHex}
      />
      <SkipNote
        title="Skipped: external-brand text hex"
        body="~6 social/platform brand colors (Discord #7289da, Twitter #1da1f2, Reddit #ff4301, YouTube #ff0000, Stack Exchange #48a2da, Lens #BEBF3B) in SocialListItem / WalletSubComponent / PresetFilters. Intentional brand colors -- not standardized."
      />
    </div>
  ),
}

export const BackgroundColors: StoryObj = {
  render: () => (
    <div className="divide-y divide-body-light">
      <AuditSection
        title="Background - themed tokens"
        description="Theme-aware semantic tokens used as solid background fills."
        specs={bgTokens}
      />
      <AuditSection
        title="Background - raw shades"
        description="One-off numbered palette shades used as fills. The main sprawl: bug-bounty severity, founders badges, maturity tooltip, stablecoins, translatathon, overlays."
        specs={bgShades}
      />
      <AuditSection
        title="Background - one-off hex"
        description="Literal hex fills that are NOT external brand: the maturity scale, pastel app-highlight tints, and surfaces that should be background tokens."
        specs={bgHex}
      />
      <SkipNote
        title="Skipped: external-brand background hex"
        body="~52 wallet brand colors (src/data/wallets/wallet-data.ts, twBackgroundColor) + 9 community-hub brand colors (src/data/community-hubs.ts). Per-entity brand identity -- intentionally not standardized."
      />
    </div>
  ),
}

export const BorderColors: StoryObj = {
  render: () => (
    <div className="divide-y divide-body-light">
      <AuditSection
        title="Border - themed tokens"
        description="Theme-aware semantic tokens used as borders/outlines/rings. Border hygiene is strong."
        specs={borderTokens}
      />
      <AuditSection
        title="Border - raw shades"
        description="Raw palette shades used as borders. Almost none -- a single debug-panel border."
        specs={borderShades}
      />
      <AuditSection
        title="Border - one-off hex"
        description="Literal hex borders that are NOT external brand: the StartWithEthereumFlow step-slide border pairs."
        specs={borderHex}
      />
      <SkipNote
        title="Skipped: external-brand border hex"
        body="9 community-hub brand colors reused as borders (src/data/community-hubs.ts). Same per-entity brand identity as the hub backgrounds."
      />
    </div>
  ),
}

export const FillStrokeColors: StoryObj = {
  render: () => (
    <div className="divide-y divide-body-light">
      <AuditSection
        title="Fill / stroke - themed tokens"
        description="SVG/icon fill and stroke colors. This context is ~100% semantic tokens -- no raw shades or hex found. A clean bill of health."
        specs={fillStrokeTokens}
      />
    </div>
  ),
}

const allColorSections: {
  title: string
  description: string
  specs: ColorSpec[]
}[] = [
  {
    title: "Text - tokens",
    description: "Healthy themed text tokens.",
    specs: textTokens,
  },
  {
    title: "Text - raw shades",
    description: "Text shade sprawl.",
    specs: textShades,
  },
  {
    title: "Text - one-off hex",
    description: "Non-brand text hex.",
    specs: textHex,
  },
  {
    title: "Background - tokens",
    description: "Healthy themed fills.",
    specs: bgTokens,
  },
  {
    title: "Background - raw shades",
    description: "Fill shade sprawl.",
    specs: bgShades,
  },
  {
    title: "Background - one-off hex",
    description: "Non-brand fill hex.",
    specs: bgHex,
  },
  {
    title: "Border - tokens",
    description: "Healthy themed borders.",
    specs: borderTokens,
  },
  {
    title: "Border - raw shades",
    description: "Border shade sprawl.",
    specs: borderShades,
  },
  {
    title: "Border - one-off hex",
    description: "Non-brand border hex.",
    specs: borderHex,
  },
  {
    title: "Fill / stroke - tokens",
    description: "Icon colors (all tokens).",
    specs: fillStrokeTokens,
  },
]

/** Every audited color, all contexts and value-classes, in one pane. */
export const AllColors: StoryObj = {
  render: () => (
    <div className="divide-y divide-body-light">
      {allColorSections.map(({ title, description, specs }) => (
        <AuditSection
          key={title}
          title={title}
          description={description}
          specs={specs}
        />
      ))}
      <SkipNote
        title="Skipped throughout: external-brand hex"
        body="~52 wallet brand colors + 9 community-hub brand colors + ~6 social/platform brand colors. Per-entity brand identity; documented but not standardized."
      />
    </div>
  ),
}
