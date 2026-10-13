---
name: devdocs-diagrams
description: Use when converting a developer-docs schematic PNG (gas.png, evm.png, tx.png, accounts.png, nodes.png, attestation_schematic.png, ...) into an interactive or static React diagram, or when editing src/components/Diagrams/ (DiagramNode, DiagramGroup, DiagramConnector, DiagramElbow, DiagramBadge, DiagramPill, DiagramFigure, GasTx). One PR per diagram.
---

# Devdocs diagrams

Developer docs schematics (adapted from _Ethereum EVM illustrated_) are being
replaced, one PR per PNG, by theme-aware, translatable, accessible React
figures built from a shared set of primitives. PR 1 converted `gas-tx.png` and
introduced the primitives. Start every later PR here; also load the
`design-system` skill.

Human-facing docs: Storybook **Components / Data Viz / Diagrams / Overview**
(`src/components/Diagrams/diagrams-overview.mdx`). Keep this file and that page
in sync.

## File locations

| What                           | Where                                                                                                        |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| Primitives (Server Components) | `src/components/Diagrams/diagram-*.tsx`, exported from `index.ts`                                            |
| Tooltip trigger (client)       | `src/components/Diagrams/diagram-tooltip-target.tsx`                                                         |
| A diagram                      | `src/components/Diagrams/<Name>/index.tsx` (+ `model.ts`, `<name>-player.tsx` if interactive)                |
| Strings                        | `src/intl/en/component-diagrams.json`, keys prefixed `<diagram>-`                                            |
| Tokens                         | `diagram-*` in `src/styles/semantic-tokens.css` + `theme.css`                                                |
| Keyframes                      | `--animate-diagram-{flow,travel-x,travel-y,pop}` in `src/styles/theme.css`                                   |
| MD registration                | `docsComponents` in `src/layouts/Docs.tsx`                                                                   |
| Namespace loading              | `LAYOUT_NAMESPACES.docs` (`src/lib/utils/translations.ts`) and `.storybook/next-intl.ts` `ns` (already done) |
| Stories                        | co-located `*.stories.tsx`, titles `Components / Data Viz / Diagrams / <Name>`                               |

## Recipe

1. **Inventory the PNG.** Open it. List nodes (entity = blue, state = orange,
   chip = pale sub-box), groups (outlined grey vs dashed tinted), connectors
   (solid = call, dashed = message/flow; arrow ends; elbows), pills, badges and
   titles. Map each to a primitive. If something doesn't fit, **add a variant**
   to the closest primitive (`tv()`), don't create a new component. Check the
   "Extra grammar" column below first.
2. **Strings.** Add `<diagram>-*` keys to `component-diagrams.json`: labels,
   one-line `-definition`s for each node and badge, `-title`, `-caption`, and a
   `-description` that narrates the whole drawing in prose (it is the text
   alternative). One sentence per key; interpolate numbers as ICU args.
3. **Server Component.** `async` + `getTranslations("component-diagrams")`.
   Shape: `DiagramFigure` > `DiagramTitle` + a CSS grid. Nodes go in columns;
   connectors go in **their own lanes** between them and stretch to fill. Use
   `orientation="responsive"` so lanes turn vertical below `md`. Share the grid
   template string between rows that must align.
4. **Interactive? Add an island.**
   - Write a plain-TS `model.ts` (no React). The drawing, readout, caption and
     screen-reader text all read from it.
   - The `"use client"` player wraps the server drawing as `children` and only
     sets `data-*` flags (and CSS vars like `--diagram-level`) on a
     `group/diagram` wrapper. The drawing reacts with
     `group-data-[...]/diagram:` classes.
   - Write those classes as literal strings so Tailwind sees them.
   - Use design-system `Button`/`ButtonGroup` with `aria-pressed`, plus
     `numberFormat()`.
   - Captions go in `role="status"`.
5. **Wire in.** Register in `docsComponents`. Replace the `![...](x.png)` line
   in **English markdown only**, keeping the "adapted from" caption line.
   Leave the PNG and translated markdown alone (the intl pipeline handles
   them).
6. **Stories and checks** (below), then a draft PR.

## Rules that bite

- **Radix `asChild` + Server Component children renders nothing after
  hydration.** React serializes server-passed elements as lazy references,
  which `Slot` can't clone. Always go through `DiagramTooltipTarget`, which
  creates the trigger element on the client. Never wrap a server-rendered node
  in `<Tooltip asChild>` directly.
- `@/components/Tooltip` renders `null` on the server unless you pass
  `renderChildrenOnServer` (`DiagramTooltipTarget` does).
- Containers with children expose only their **label** as the tooltip trigger,
  so nested nodes and badges keep their own.
- Titles are `DiagramTitle` (`<p>`), never headings: diagrams must not enter
  the page ToC.
- Labels wrap. Never use `whitespace-nowrap` on node or badge labels.
  Vertical-lane pills already use `writing-mode: vertical-rl`.
- Logical CSS only. Inline arrowheads, lines and tokens already mirror in RTL;
  directional icons get `rtl:-scale-x-100`.
- No hex or `rgb()`. Inside tinted fills use `text-body`, not
  `text-body-medium`.
- In `tv()` slot styles, a `className` override with the same utility group
  wins (e.g. `size-20` beats the badge's `size-24`).

## Motion

- CSS only: `stroke-dashoffset` (`animate-diagram-flow` on dashed lines via
  `lineClassName`), travelling dot (`tokenClassName`), opacity,
  `animate-diagram-pop`, and the badge gauge (`level`).
- One-shot, 500-700 ms, ease-out. No idle or looping animation.
- One moving element at a time, and it is the only element in `primary`.
- Reduced motion: the token is `motion-reduce:invisible`, transitions are
  `motion-reduce:transition-none`, and the flow is `motion-reduce:animate-none`.
  Steps jump to their end state; the controls still work with a longer dwell.

## Tokens

Full light and dark table with contrast ratios: see the Overview MDX.

| Role                    | Token                                           |
| ----------------------- | ----------------------------------------------- |
| Entity stroke and icons | `accent-a`                                      |
| Entity fill             | `diagram-entity-fill`                           |
| State stroke and icons  | `diagram-state`                                 |
| State fill              | `diagram-state-fill`                            |
| Dashed group            | `diagram-group-fill` (+ `diagram-state` stroke) |
| Revert                  | `diagram-revert`                                |
| Connectors              | `body-medium`                                   |
| Outlined container      | `border-high-contrast`                          |
| Pill                    | `background-low`                                |
| The one moving element  | `primary`                                       |

If a new pair is needed, compute WCAG contrast in **both** themes (text 4.5:1,
strokes 3:1) before adding a token.

## Story checklist

- One story per state. Interactive diagrams take an `initialStep` prop so each
  step is a deterministic static snapshot.
- `Dark` (`globals: { theme: "dark" }`), `Rtl` (`globals: { locale: "ar" }`),
  `Mobile` (`globals: { viewport: { value: "base", isRotated: false } }`),
  `ReducedMotion`.
- `chromatic.modes`: `viewportModes` base and lg. Chromatic already runs with
  `prefersReducedMotion: "reduce"` globally.
- Open the stories in `pnpm storybook`; `build-storybook` doesn't execute them.
- Screenshot at 2x in both themes and at 360 px. Check arrow alignment,
  clipped text and contrast.
- Run `pnpm lint`, `pnpm type-check`, `pnpm build-storybook` and `pnpm lint:md`.
- Chromatic CI skips draft PRs; the link appears when the PR is ready for
  review.

## Remaining diagrams

All files sit next to the listed `index.md` under
`public/content/developers/docs/`.

| PNG                                     | Used in                                        | Extra grammar it needs beyond PR 1                                                                                        |
| --------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `gas.png`                               | `gas/` and `evm/`                              | Circle entity (`shape="circle"`); dashed **entity** group; elbows; a line passing through badges; edge leaving the canvas |
| `evm.png`                               | `evm/`                                         | Nested filled entity containers; large icon tiles; title + subtitle pair. No connectors                                   |
| `tx.png`                                | `transactions/`                                | "?" glyph over a labelled dashed arrow (simplest one)                                                                     |
| `tx-block.png`                          | `blocks/`                                      | State node holding pill chips                                                                                             |
| `accounts.png`                          | `accounts/`                                    | Stacked "multiple" outline; bidirectional S-elbows; list of state rows                                                    |
| `nodes.png`                             | `nodes-and-clients/`                           | Circle entity "You"; ETH logo badge; chip list in a node                                                                  |
| `diagram.png`                           | `nodes-and-clients/run-a-node/`                | Group title at bottom; free-floating labels above/below a bidirectional line                                              |
| `eth1eth2client.png`                    | `nodes-and-clients/`                           | Segmented node ("p2p" part); pills on elbow lines; fan-out network stubs                                                  |
| `node-architecture-text-background.png` | `nodes-and-clients/node-architecture/`         | Dashed entity group; bullet lists in nodes; peer mesh with off-canvas dotted links                                        |
| `attestation_schematic.png`             | `consensus-mechanisms/pos/attestations/`       | Merging lines; filled-orange circle; tab pills (`shape="tab"`); block chain row                                           |
| `reorg-schematic.png`                   | `consensus-mechanisms/pos/attack-and-defense/` | Undirected edges (`arrow="none"`); free-text annotations                                                                  |
| `multiple-keys.png`                     | `consensus-mechanisms/pos/keys/`               | Fan-out tree (several `DiagramElbow`s) with tab pills; row labels                                                         |
| `validator-key-schematic.png`           | `consensus-mechanisms/pos/keys/`               | Three-way tree; bracket rail connector on the start side                                                                  |

Bracket rails, off-canvas mesh links and segmented nodes have no primitive
yet. Add them as variants in the PR that first needs them.
