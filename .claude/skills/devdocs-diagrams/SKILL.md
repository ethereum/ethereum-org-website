---
name: devdocs-diagrams
description: Use when converting a developer-docs schematic PNG (gas.png, evm.png, tx.png, accounts.png, nodes.png, attestation_schematic.png, ...) into an interactive or static React diagram, or when editing src/components/Diagrams/ (DiagramNode, DiagramGroup, DiagramConnector, DiagramElbow, DiagramBadge, DiagramPill, DiagramFigure, GasTx). One PR per diagram.
---

# Devdocs diagrams

Developer docs schematics (adapted from _Ethereum EVM illustrated_) are being
replaced, one PR per PNG, by theme-aware, translatable, accessible React
figures built from a shared set of primitives. PR 1 converted `gas-tx.png` and
introduced the primitives. `gas.png` (`GasEvm`, on the gas and EVM pages) followed on `InteractiveDiagram`, then `tx.png` (`TxApply`) and `evm.png` (`EvmZones`). Start every later PR here; also load the
`design-system` skill.

`GasTx` is drawn as a simple isometric fuel rig (`GasTx/gas-rig.tsx`) on the
shared anatomy primitives in `Diagrams/anatomy/`:

| Piece                                                   | What it does                                                                        |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `isoProjection(x, y)`                                   | `P`, `line`, `path`, `box`, `disc`, `cylinder` for one plate origin                 |
| `IsoPlate`                                              | the world-state slab (`data-anatomy-plate`)                                         |
| `IsoSolid`                                              | a box with three-tint shading and a hairline outline (`state`: rest, lit, hover)    |
| `IsoCylinder`                                           | a cylinder with an optional level fill                                              |
| `IsoPipe`                                               | neutral 1.25px pipe; `flowing` turns it orange with a one-shot dash flow            |
| `AnatomyLabels`                                         | concept labels + leaders, focusable, drive hover; drops what doesn't fit            |
| `DiagramStage`                                          | the single Card container: illustration + controls panel                            |
| `DIAGRAM_COLOR`, `anatomyFill`, `DIAGRAM_SVG_FALLBACKS` | `--diagram-*` colour values with fallbacks, the shading formula, root SVG fallbacks |

Mark the drawing's root `<svg>` with `data-anatomy-drawing` and give it
`ISO_SVG_CLASS`. Lazy-load the drawing (`next/dynamic`, `ssr: false`) with a
same-size placeholder. Use this family when a diagram reads better as a
machine than as boxes and arrows; otherwise compose the box-and-arrow
primitives. Either way, follow the rules below.

## Rules every diagram must follow

Later diagrams must follow these. The shared pieces live in
`src/components/Diagrams/anatomy/` (story: Components / Data Viz / Diagrams /
Anatomy).

- **No vanishing lines.** Colours come only from the `--diagram-*` tokens in
  `src/styles` (`--diagram-bg`, `-plate`, `-edge`, `-pipe`, `-entity`, `-gas`,
  `-revert`), used through static literal classes (`stroke-diagram-pipe`,
  never a string-built class) or `DIAGRAM_COLOR` values that carry a
  fallback. The drawing's root `<svg>` spreads `DIAGRAM_SVG_FALLBACKS`
  (`fill="none" stroke="currentColor"`), so a missing utility degrades to a
  neutral line instead of nothing or black. Shapes that must not be stroked
  say so (`stroke="none"` or `stroke-none`).
- **Guard.** `tests/e2e/diagram-strokes.spec.ts` walks every shape of every
  `DiagramStage` on the pages it lists, for every preset and step, in light
  and dark, and fails if a shape that should be stroked has no visible stroke
  or any fill is black. Add each new diagram's page to it, and give the
  next-step button `data-diagram-next`.
- **Nothing black, nothing unresolved.** Every fill and stroke resolves to a
  site token in both themes. An unset SVG fill renders black, so set one on
  every shape (even clip-path geometry). Audit with a script, not by eye.
- **Shading formula.** A solid's three faces are tints of one hue mixed with
  the background token: `color-mix(in oklab, var(<hue>) N%, var(--background))`
  with N = 15% (top), 30% (inline-start face), 45% (inline-end face). Mixing
  with the dark background makes the same formula adapt to dark mode.
  `anatomyFill(hue, face)` implements it.
- **Plate (world state).** `--background-highlight` fill, a thin
  `--border-high-contrast` edge, side faces a slightly darker tint of that
  neutral (25% / 40%). Never black.
- **Colour roles.** Blue (`accent-a`) = accounts and contracts. Orange
  (`diagram-state`; `yellow-700` light, `yellow-600` dark, a true orange,
  not gold) = gas and value: tanks, levels, flowing gas, glow, meters.
  Neutral = structure: plate (`border-high-contrast` edge), pipes at rest
  (`body-medium`), leader lines. The failure state uses `diagram-revert`.
- **Line weight: hairlines, hierarchy by colour.** Every outline and leader
  is 0.6px (non-scaling). `--diagram-line-faint` for seams and panel lines,
  `--diagram-line` for outlines at rest, `--diagram-line-strong` for the
  hovered part. Pipes are thin tubes: a 1.4px `body-medium` stroke with a
  0.4px plate-coloured highlight; a one-shot orange dash flows along a pipe
  only while gas (or, in `TxApply`, value) moves through it.
- **Fills.** Light role tints at rest (`--diagram-mix-*`: 7/14/22% light,
  20/32/45% dark, top lightest); the active or hovered part takes the
  stronger `--diagram-mix-*-active` shares (15/30/45%, 30/50/70% dark).
- **Active state.** The part to watch takes its role colour: stronger tints
  and a role-coloured hairline (blue for accounts and contracts, orange for
  gas), and its label and leader switch to that colour. Never the site
  `primary`, never a heavier stroke.
- **Detail (static).** 2 to 4 small marks per object that say what it is,
  from `isoDetail` (`anatomy/detail.tsx`): a bevel on the plate, seams and a
  base band on boxes, a name plate on accounts, a rim and level marks on a
  tank, cells on memory and storage, lines on a slip. Build every detail
  element once at module level (`const SENDER_DETAIL = ...`) and render it
  as-is: React skips an element it has seen, so steps and hovers never
  re-render it. Budget: about 300 SVG nodes per diagram (they run 80-110).
- **Shadow.** One soft ground shadow under the plate and a small contact
  shadow under each object, both `isoShadow` (a footprint filled with the
  drawing's radial gradient from `IsoDefs`). No SVG filters, no CSS blur.
  Labels may sit on shadows (`data-anatomy-shadow` is skipped in the hit test).
- **Show the quantity moving.** Levels change with the step (a tank fills,
  drains as gas burns, drains the rest back), a burning part glows orange in
  proportion (`IsoSolid glow`: top face and outline tinted toward the gas
  hue alone, never blended with blue), and readouts count up in step with the
  drawing (`useCountUp`, the one JS-driven motion: a one-shot ~700ms tween,
  instant under reduced motion).
- **Simple parts.** One simple solid per object, at most one icon per object,
  each object on its own footprint (no overlaps).
- **Labels.** Concept names only, single line, 12px, fully outside the plate
  (including its sloping front edge across the label's whole width), each
  with a short straight (or single-elbow) leader that never crosses a pipe, a
  solid or another label. Labels are focusable; there is no tooltip.
  `AnatomyLabels` drops any label that would leave the drawing, touch any
  shape (the plate included) or touch another label or leader, earlier spots
  winning, so narrow screens fall back to fewer labels plus the figcaption.
- **One shell: `InteractiveDiagram`** (`src/components/Diagrams/interactive-diagram.tsx`).
  Every interactive diagram uses it, so controls sit in the same places
  everywhere. It wraps `DiagramFigure` (intro text as the figcaption, above)
  and `DiagramStage` (one card). From a 640px card width (container query)
  the illustration takes the remaining width and a 15rem panel sits on the
  inline-end side, vertically centred; narrower, the panel sits directly
  under the illustration, same order. Slots, top to bottom:
  1. `presets`: `DiagramPresets`, "Example values" as a segmented control
     (vertical full-width rows in the side panel, a row when stacked).
     Optional: a diagram with one fixed example (`TxApply`, `EvmZones`)
     leaves it out and drives its steps with `useStepPlayer`
     (`src/components/Diagrams/use-step-player.ts`: step 0 idle, then 1-n).
  2. `transport`: `DiagramTransport`, the primary action (full width in the
     side panel; "Send transaction", "Run", ...), then previous, "Step x of
     n", next, reset as 32px icon buttons. Same icons and order everywhere;
     next carries `data-diagram-next` for the stroke guard.
  3. `stepCaption`: `DiagramCaption`, a polite live region sized to its
     longest step (pass every caption), so nothing jumps.
  4. `readout`: `DiagramReadout`, a compact two-column list with right-aligned
     tabular mono numbers.
- **Values are not gas.** Only gas flows orange. A pipe that carries a value
  (e.g. EvmZones' EVM → storage pipe) stays a neutral tube; the receiving part
  lights instead. ETH value counts as value in `TxApply` (orange flow), since
  the colour roles there are accounts vs. money.
- **Numbers that must add up** live in the model as integers (whole gwei in
  `TxApply`), formatted only at the edge with `numberFormat`.
- **Hover and focus (built into the shell).** Wrap each part's shapes (and
  its static detail) in `<g data-part="id">`, with the same id as its label
  spot. Pointing at a part or its label, or focusing the label, draws the
  part's outline in `line-strong` (`usePartState(...).state(id)` returns
  `"hover"`), turns its label to its role colour, dims the other parts to
  70% and shows "Label: definition" in the status line. Touch: a tap selects
  a part. Screen readers get the definition through the label's
  `aria-describedby`.
- **Framing (built into the shell).** A figure header in small mono caps
  ("Fig. N · Title"; pass `fig={N}` from the markdown), a status line under
  the drawing (mono, two lines reserved; the step at rest, the hovered
  part's definition on hover) and a legend of the role colours, one word
  each.
- **Performance.** Animate only opacity, transform and stroke-dashoffset (no
  fill or stroke transitions). Each player uses `useDiagramInView`: the
  drawing chunk loads when the figure comes within 200px of the viewport,
  and runs, timers and CSS animations pause while it is off screen
  (`paused` → `data-paused`). The docs layout knows every diagram, so the
  server wrapper (`index.tsx`) imports its player through a client
  `lazy-player.tsx` (`next/dynamic`): the player is still server-rendered,
  but its client code loads only on pages that render it.
- **Dark mode.** The same tint tokens, about double light mode's, with one
  step lighter hues (`blue-300`, `yellow-500`), so blue and orange still read
  as colour.
- **Verify.** Screenshot light and dark at 1440px, 1024px and 390px (2x),
  with reduced motion and RTL, and each step of each preset. Check no black
  paint, no label collisions, no labels on shapes or the plate, no leader
  crossings, nothing clipped. Translated pages keep the old image until the
  intl pipeline runs, so check RTL with `dir="rtl"` or the `ar` story.

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

| PNG                                     | Used in                                        | Extra grammar it needs beyond PR 1                                                 |
| --------------------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------- |
| `tx-block.png`                          | `blocks/`                                      | State node holding pill chips                                                      |
| `accounts.png`                          | `accounts/`                                    | Stacked "multiple" outline; bidirectional S-elbows; list of state rows             |
| `nodes.png`                             | `nodes-and-clients/`                           | Circle entity "You"; ETH logo badge; chip list in a node                           |
| `diagram.png`                           | `nodes-and-clients/run-a-node/`                | Group title at bottom; free-floating labels above/below a bidirectional line       |
| `eth1eth2client.png`                    | `nodes-and-clients/`                           | Segmented node ("p2p" part); pills on elbow lines; fan-out network stubs           |
| `node-architecture-text-background.png` | `nodes-and-clients/node-architecture/`         | Dashed entity group; bullet lists in nodes; peer mesh with off-canvas dotted links |
| `attestation_schematic.png`             | `consensus-mechanisms/pos/attestations/`       | Merging lines; filled-orange circle; tab pills (`shape="tab"`); block chain row    |
| `reorg-schematic.png`                   | `consensus-mechanisms/pos/attack-and-defense/` | Undirected edges (`arrow="none"`); free-text annotations                           |
| `multiple-keys.png`                     | `consensus-mechanisms/pos/keys/`               | Fan-out tree (several `DiagramElbow`s) with tab pills; row labels                  |
| `validator-key-schematic.png`           | `consensus-mechanisms/pos/keys/`               | Three-way tree; bracket rail connector on the start side                           |

Bracket rails, off-canvas mesh links and segmented nodes have no primitive
yet. Add them as variants in the PR that first needs them.
