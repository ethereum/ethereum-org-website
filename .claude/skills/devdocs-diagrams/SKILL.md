---
name: devdocs-diagrams
description: Use when converting a developer-docs schematic PNG (gas.png, evm.png, tx.png, accounts.png, nodes.png, attestation_schematic.png, ...) into an interactive React diagram, or when editing src/components/Diagrams/ (InteractiveDiagram, the anatomy primitives, GasTx, GasEvm, TxApply, EvmZones, or any diagram folder), or reviewing a diagram's content for accuracy. One PR per diagram, or per page when diagrams share one.
---

# Devdocs diagrams

Developer-docs schematics (adapted from _Ethereum EVM illustrated_) are being replaced, one PR per PNG, by theme-aware, translatable, accessible interactive figures. Each is a small isometric "anatomy" drawing on shared primitives, inside one shared shell (`InteractiveDiagram`). Done so far: `gas-tx.png` (`GasTx`), `gas.png` (`GasEvm`), `tx.png` (`TxApply`) and `evm.png` (`EvmZones`). Also load the `design-system` skill.

This file is the canonical reference. The Storybook page **Components / Data Viz / Diagrams / Overview** is a short visual intro that links here; don't duplicate rules there.

## File shape

Every diagram folder has the same files:

| File                     | Role                                                                                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<Name>/index.tsx`       | Server wrapper, the default export registered in `docsComponents`. Wraps the player in `DiagramMessages prefix="<key-prefix>"`                          |
| `<Name>/lazy-player.tsx` | `"use client"` `next/dynamic` import of the player. Keeps its JS off docs pages that don't render it (the docs layout imports every diagram statically) |
| `<Name>/player.tsx`      | `"use client"` state: presets, `useStepPlayer`, model view, strings, the `InteractiveDiagram` slots                                                     |
| `<Name>/rig.tsx`         | The isometric drawing, `memo`-wrapped default export. Server-rendered with the player                                                                   |
| `<Name>/model.ts`        | Plain TS, no React: presets, steps, `get<Name>View(preset, step)`, and the drawing's viewBox size `<NAME>_SIZE`                                         |
| `<Name>/*.stories.tsx`   | Co-located stories, title `Components / Data Viz / Diagrams / <Name>`                                                                                   |

Shared pieces in `src/components/Diagrams/`:

| Piece                     | What it does                                                                                                                                    |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `interactive-diagram.tsx` | `InteractiveDiagram` shell plus `DiagramPresets`, `DiagramTransport`, `DiagramCaption`, `DiagramReadout`, `DiagramCountUp`, `useDiagramFormat`  |
| `use-step-player.ts`      | `useStepPlayer({ idle, last, initial, dwellMs, dwellReducedMs, paused })`: step state, `run`, `goTo`, `reset`                                   |
| `diagram-hover.tsx`       | Shared hover/focus state (`usePartState`, `useHoverTargets`) and `useDiagramInView` (pauses off screen)                                         |
| `diagram-messages.tsx`    | Server component: hands the player only its own strings plus shared `diagram-*` ones                                                            |
| `diagram-figure.tsx`      | `<figure id="fig-N">` (`my-space-2x`), the centred caption under the card, the screen-reader description, the no-JS style                       |
| `anatomy/iso.tsx`         | `isoProjection` (`P`, `line`, `path`, `box`, `cylinder`, `footprint`), `IsoPlate`, `IsoSolid`, `IsoCylinder`, `IsoPipe`, `IsoDefs`, `isoShadow` |
| `anatomy/detail.tsx`      | `isoDetail`: seams, plates, cells, vents, tank marks                                                                                            |
| `anatomy/labels.tsx`      | `AnatomyLabels`: concept labels with leaders, collision-dropped, one tab stop                                                                   |
| `anatomy/stage.tsx`       | `DiagramStage`: the single card, illustration plus panel                                                                                        |
| `anatomy/tokens.ts`       | `DIAGRAM_COLOR`, `anatomyFill`, stroke classes, `DIAGRAM_SVG_FALLBACKS`                                                                         |

Strings: `src/intl/en/component-diagrams.json`, keys prefixed `<key-prefix>-` per diagram (`gas-tx-`, `gas-evm-`, `tx-apply-`, `evm-zones-`), shared ones `diagram-` (counter, previous/next/reset, presets label, readout label, reverted, legend, figure number, parts group). Tokens: `--diagram-*` in `src/styles/semantic-tokens.css`, registered in `theme.css`. Keyframes: `--animate-diagram-{flow,travel-y,pop}` in `theme.css`.

## Recipe

1. **Read the PNG.** List what it shows and decide what a reader should _watch_ change, step by step. Map each concept to one simple solid on the plate (world state). Pick 2-4 presets of example values only if comparing them teaches something.
2. **Model** (`model.ts`). Presets, steps, and a pure `get<Name>View` that returns everything the drawing, readout, captions and status read: levels, lit part, which parts are reached, caption key, values. Numbers that must add up are integers (e.g. whole gwei), so the readout sums exactly. Every number the figure shows comes from the model (costs, limits, the example's amounts), never from a string.
   - **Steps.** New diagrams use idle = 0 and steps 1 to N, like `TxApply` and `EvmZones` (`GasTx` and `GasEvm` predate this and use idle = -1 internally; their players map it). Readers see steps numbered 1 to N everywhere: the counter's `current`, and `Step {step}:` in each caption. Aim for 3 to 5 steps, one thing moving per step, and one lit part per step (`litPart`).
   - **Part ids.** One id per drawn part, used three ways that must match: `<g data-part="id">` in the rig, the label spot's `id`, and the key into the player's labels and definitions (`<prefix>-label-<id>`, `<prefix>-definition-<id>`).
3. **Strings.** Labels, one-line `-definition-<part>`s, `-title`, `-caption` (one line under the card), `-description` (narrates the whole drawing; it is the text alternative), `-step-*` captions and short `-status-*` lines. **Every number is an ICU param** (`{limit}`, `{cost}`, `{step}`), formatted by the player with `useDiagramFormat()` (wraps `numberFormat`: arabext digits for `ur`, locale grouping elsewhere). Never write digits into a string. Opcode names and code stay as literal text. Idle copy invites the reader to act with the same words as the controls: "Choose a scenario and send the transaction..." for a diagram with presets, "Apply the transaction to follow..." without.
4. **Rig** (`rig.tsx`). Geometry, detail and shadows built once at module level; `<g data-part="id">` per part; root `<svg aria-hidden data-anatomy-drawing {...DIAGRAM_SVG_FALLBACKS} className={ISO_SVG_CLASS}>`; `AnatomyLabels` with spots in priority order. Use `useTranslations` only for shared strings like `diagram-reverted`. `export default memo(Rig)`.
5. **Player** (`player.tsx`). `useStepPlayer` (never a hand-rolled timer), `useMemo` the view per preset and step, `useMemo` labels and definitions on `t`. Readout numbers that move use `<DiagramCountUp value delay />`. Pass every caption the preset can show to `DiagramCaption all`.
6. **Wire in.** `index.tsx` wraps the lazy player in `DiagramMessages` (no extra wrapper: the `<figure>` carries `my-space-2x` and takes `className`); import it in `src/layouts/Docs.tsx` and add it to `docsComponents`. Swap the `![...](x.png)` line in **English markdown only** for `<Name />` (no `fig`: the page numbers it) and drop the PNG's "adapted from" credit line: the diagrams are original drawings. Leave the PNG and translated markdown alone; the intl pipeline propagates.
7. **Stories and checks** (below), then the PR.

## Content accuracy

A diagram teaches, so its numbers and words get the same review as the page text. Before a PR:

- **Use the page's own example.** If the text around the figure works an example (Bob sends Alice 1 ETH at 190 + 10 gwei for 21,000 gas on `/transactions/`), the figure uses exactly those numbers and its readout must match the page's results. Otherwise pick round, plausible values and label them as scenarios.
- **Check every protocol number against the source.** Opcode costs and rules against the current fork (evm.codes, the EIPs): PUSH1 3, MSTORE 3 plus memory expansion, SSTORE 22,100 for a cold slot set from zero (20,000 + 2,100, EIP-2929/2200). The program counter is a **byte offset**, not an opcode index (PUSH1 is two bytes). Intrinsic gas of 21,000 is the base for a call with no input data, so call it the base cost. Note the source of each number in a comment in `model.ts`.
- **Words with protocol meaning.** Gas is _used_ (or consumed), never "burned": burning means the base fee leaving circulation, and the figures sit next to text that uses it that way. Unused gas is _returned_ to the sender (the page may say "refunded"; don't confuse it with the storage refund). Storage writes persist only if the call doesn't revert. When a part's definition generalises ("only storage persists"), scope it to what's drawn ("of the parts shown").
- **Name pedagogical simplifications.** A transaction is applied atomically; showing value, fee and nonce as separate steps is a teaching order, not the protocol's (which charges the fee and bumps the nonce before execution). Keep such orders consistent with the page text, and don't claim an order the spec contradicts.
- **Read it in place.** Check the figure against the paragraphs before and after it on every page that uses it: it should illustrate what was just said, not introduce terms the page hasn't. A diagram can appear on several pages (`GasTx` on `/transactions/` and `/gas/`, `GasEvm` on `/gas/` and `/evm/`), each with its own `fig={N}`.

## Visual rules

- **No vanishing lines.** Colours come only from `--diagram-*` tokens, through static literal classes (`stroke-diagram-pipe`, never string-built) or `DIAGRAM_COLOR` values with fallbacks. The root `<svg>` spreads `DIAGRAM_SVG_FALLBACKS` (`fill="none" stroke="currentColor"`). Shapes that must not be stroked say so (`stroke="none"` / `stroke-none`). An unset SVG fill renders black, so set one on every shape, clip geometry included.
- **Colour roles.** Blue (`--diagram-entity`) = accounts, contracts and the EVM. Orange (`--diagram-gas`) = gas: tanks, levels, flowing gas, glow, meters. Values are not gas: a pipe carrying a stored word stays a neutral tube and the receiving part lights instead (EvmZones' storage pipe). The one exception is ETH in `TxApply`, where the roles are accounts vs. money, so ETH flows orange and the legend says "Value". Neutral = structure: plate, pipes at rest, leaders. Failure uses `--diagram-revert`.
- **Lines.** Every outline and leader is 1px (non-scaling; on 1x screens anything thinner renders below 3:1). Hierarchy by colour, not width: `--diagram-line-faint` seams, `--diagram-line` outlines, `--diagram-line-strong` the hovered part. Pipes are 1.4px tubes with a 0.4px decorative highlight; a one-shot orange dash flows only while gas moves.
- **Fills.** `anatomyFill(hue, face, state)`: `color-mix(in oklab, hue N%, background)`, top lightest. Rest shares `--diagram-mix-*` (7/14/22% light, 20/32/45% dark); the active or hovered part takes `--diagram-mix-*-active` (15/30/45%, 30/50/70% dark). Dark uses one step lighter hues (`blue-300`, `yellow-500`). Plate: `--diagram-plate` top, sides a darker neutral tint.
- **Active part.** Takes its role colour (tint and outline), and its label and leader switch to it. Never the site `primary`, never a heavier stroke.
- **Detail and shadow.** 2-4 small marks per object from `isoDetail`. One ground shadow under the plate and a contact shadow per object (`isoShadow`, radial gradient from `IsoDefs`). No SVG filters, no CSS blur. Budget about 300 SVG nodes per diagram (they run 100-135).
- **Simple parts.** One solid per object, at most one icon, each on its own footprint. Show quantities moving: levels fill and drain, a working part glows in proportion, readouts count up with the drawing.
- **Tanks.** `IsoCylinder` with `level` (0-1): the liquid's surface is the cylinder's own cross-section ellipse, outlined like the top and base, from the top ellipse at full to exactly the base ellipse at empty, then it fades out. `levelDelay` (ms) holds the motion back to follow a flow (e.g. `GasTx` waits 700ms for the message to arrive).
- **Labels.** Concept names, single line, 14px, fully outside the plate, short straight or single-elbow leaders that cross nothing. `AnatomyLabels` drops any label that would leave the drawing, touch a shape or touch another label or leader (earlier spots win); narrow screens fall back to fewer labels plus the caption. Before its first measurement (server HTML) only the top three spots show, so order spots by priority.
- **Type.** 14px (`text-sm`) minimum for every piece of diagram text: labels, figure header, status line, legend, tags. Sans throughout; monospace only for the readout numbers, where digits line up.

## Shell (`InteractiveDiagram`)

One card, so controls sit in the same places everywhere. From a 640px card width (container query) a 15rem panel sits on the inline-end side; narrower it stacks under the illustration. Illustration column: figure header in small caps ("Fig. N · Title", from `fig`), drawing, status line (sans, two lines reserved; the step at rest, "Label: definition" on hover), legend. Panel, top to bottom:

1. `DiagramPresets` (optional; omit for a diagram with one fixed example): "Choose scenario", a segmented `ui/radio-group` (radio roles, one tab stop, arrow keys).
2. `DiagramTransport`: primary action (full width of the panel, disabled while running), then previous, the counter, next, reset. Pass `current` (1 to `total` for a step, 0 at idle) and `total`: it shows "Step 2 of 4", and "4 steps" at idle.
3. `DiagramCaption`: polite `role="status"`; sized by empty CSS-content sizers (`content: attr(data-sizer)`), one per possible caption, so the height never jumps and the text appears in the page only once.
4. `DiagramReadout`: two columns, mono tabular numbers.

Hover and focus are built in: wrap each part in `<g data-part="id">` with the same id as its label spot. Pointing at a part or label, or focusing the label, outlines the part in `line-strong`, colours its label, dims the others to 70% and shows the definition in the status line. A tap selects a part on touch.

## Accessibility

- **Figure numbers and anchors.** `remarkFigureNumbers` (`src/lib/md/compile.ts`) numbers every `<…Diagram />` element on a docs page in order and passes `fig={n}`; images aren't counted, and a `fig` written in the markdown wins. `fig` renders "Fig. N" in the header and the `<figure>`'s `id="fig-N"` (`figure` gets `scroll-mt-32` from `base.css`), so `#fig-2` links to it. Name every diagram component `<Name>Diagram` or it won't be numbered.
- `<figure>` with a centred `<figcaption>` under the card (14px, `text-body-medium`) and the `-description` linked by `aria-describedby`. The drawing is `aria-hidden`.
- Labels are **one tab stop** (roving tabindex) in a `role="group"` named by `diagram-parts-label`; arrow keys (mirrored in RTL), Home and End move between visible labels. Each label's definition is its `aria-describedby`.
- Step changes are announced once by the caption's `role="status"`; the status line is `aria-hidden`.
- Reduced motion: nothing moves, steps jump to their end state, dwell is longer, count-ups are instant.
- Contrast: text 4.5:1 and graphics 3:1 in both themes; compute it before adding a token.

## Performance

- Server-rendered: the idle drawing is in the page HTML (about 2.5-3 KB gzipped per diagram), so no placeholder pop-in and something to show without JS. Without JS a `<noscript>` style in `DiagramFigure` hides the controls panel (`data-diagram-panel`), widens the drawing and shows the `-description` as text, so the walkthrough is still readable. No extra strings.
- Client JS loads only on pages that render the diagram (`lazy-player.tsx`). Strings ship only with the diagram (`DiagramMessages`); `component-diagrams` is not a layout namespace.
- Fonts: only the site's existing faces (Inter, IBM Plex Mono 400). Never add a weight or style for a diagram: `next/font` preloads every face on every page.
- Animate only opacity, transform and stroke-dashoffset. Runs, timers and CSS animations pause off screen (`useDiagramInView` → `data-paused`).
- The only JS-driven motion is `DiagramCountUp` (a ~700ms tween), a leaf so it re-renders only its own text. Rigs are memoised; static detail is built at module level.
- Label collision checks wait until the drawing nears the viewport, then re-run on resize and once fonts load.

## Stories and checks

- Stories: idle, each step (`initialStep`), each preset, `Dark`, `Rtl` (`globals: { locale: "ar" }`), mobile (`viewport: base`), a hover story with a play function that focuses a label. Chromatic already runs with reduced motion, so no separate reduced-motion story. Open them in `pnpm storybook`; `build-storybook` doesn't execute them.
- **Snapshots: key states only.** Set `chromatic: { disableSnapshot: true }` on the meta and opt in per story with `disableSnapshot: false`: idle, the final step, the failure end state (e.g. out of gas), dark, RTL and mobile. Step-by-step and hover stories stay unsnapshotted. Don't add a mobile story when the meta's modes already include the `base` viewport.
- No e2e guard for strokes: static token classes and the `var()` fallbacks in `DIAGRAM_SVG_FALLBACKS` prevent vanishing lines, and the snapshots show it if one breaks.
- Screenshot light and dark at 1440px, 1024px and 390px, RTL, every step: no black paint, no label collisions, no labels on shapes, no leader crossings, nothing clipped.
- `pnpm lint`, `pnpm type-check`, `pnpm lint:md`, `pnpm build-storybook`.

## Remaining PNGs

All next to the listed `index.md` under `public/content/developers/docs/`: `tx-block.png` (`blocks/`), `accounts.png` (`accounts/`), `nodes.png` and `eth1eth2client.png` (`nodes-and-clients/`), `diagram.png` (`nodes-and-clients/run-a-node/`), `node-architecture-text-background.png` (`nodes-and-clients/node-architecture/`), `attestation_schematic.png` (`consensus-mechanisms/pos/attestations/`), `reorg-schematic.png` (`consensus-mechanisms/pos/attack-and-defense/`), `multiple-keys.png` and `validator-key-schematic.png` (`consensus-mechanisms/pos/keys/`).
