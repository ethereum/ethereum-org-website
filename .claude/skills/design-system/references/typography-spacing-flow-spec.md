# Typography & Spacing Flow -- Spec

Status: Shipped on the `ui-headers` branch. The opt-in `.flow` system lives in `base.css` and is applied to markdown content (`ContentContainer`, plus the `MainArticle` in the `Docs`/`Static`/`Tutorial` layouts) and to migrated React pages, with a Storybook kitchen-sink. The `<Section>` component refactor remains a separate follow-up. The durable rules are now distilled into `spacing-typography.md` (canonical); this doc holds the design rationale and edge cases.

This document defines the target model for how headings, paragraphs, lists, and the vertical spacing between them work site-wide. It replaces the current mess -- per-layout heading wrappers, commented-out overrides, ad-hoc `mt-*/mb-*` on individual elements, two competing list-spacing sources, and arbitrary `text-[2.5rem]` values -- with a single, default-driven system.

When the migration lands, the durable rules here get distilled into `spacing-typography.md` and the migration scaffolding (phases, status notes) is dropped.

## Goals

1. Authoring the common case is just semantic HTML inside a `.flow` region: `<h2>Title</h2>` then `<p>Body</p>`. No `className`. The defaults produce correct sizing, line-height, and spacing.
2. `className` is the documented rare exception for intentional design deviations, not the everyday tool.
3. The "heading sits close to the content it introduces, far from the block before it" asymmetry the designers asked for is produced automatically.
4. The entire rhythm derives from ONE declared base, so it scales coherently -- including responsively, by changing a single variable.
5. Everything is built from Tailwind standard tokens (the `--spacing()` scale, breakpoint tokens, `--text-*` utilities), not raw values, so it reads as idiomatic Tailwind.

## The model

One base unit, `--space`, responsive: `--spacing(4)` (16px) on mobile, `--spacing(6)` (24px) from `lg`. Every gap is a multiple of it, applied as `margin-top` (space-before). No `em`, no `lh` -- a single coherent ladder.

| Gap | multiple | mobile / desktop |
|---|---|---|
| default -- any sibling to any sibling (heading->content, p->p, p->list, image->p) | `1x` | 16 / 24 |
| list items (li->li) | `0.5x` | 8 / 12 |
| above a subsection heading (`h3`/`h4`) | `2x` | 32 / 48 |
| above a section boundary (`h1`/`h2`, or an explicit `<section>`) | `3x` | 48 / 72 |
| above a CTA / button group (`[data-flow="cta"]`) | `2x` | 32 / 48 |

The "hug" the designers wanted is NOT a special tight gap below headings -- it is the `1x` default. The grouping reads correctly because headings have MORE space ABOVE them than below: a section heading is `3:1` (above:below), a subsection `2:1`. That asymmetry is the whole mechanism.

Rules live in `src/styles/base.css` (`@layer base`), opt-in via the `.flow` class:

```css
:root       { --space: calc(var(--spacing) * 4); }           /* 16px (== --spacing(4)) */
@variant lg { :root { --space: calc(var(--spacing) * 6); } } /* 24px */

@layer base {
  /* SCOPE (abbreviated below) = direct children of the region OR of any <section>
     one level inside it that hasn't opted out:
       :where(.flow, .flow section:not([data-flow="skip"]))
     `:where()` keeps it zero-specificity so a utility class always wins, and `+`
     never matches a first child -- so no first-child reset is needed. */

  SCOPE > * + *               { margin-top: var(--space); }            /* 1x default */
  SCOPE > * + :is(h2, h3, h4) { margin-top: calc(var(--space) * 2); }  /* 2x above a heading */
  SCOPE > * + section,
  :where(.flow) > * + :is(h1, h2) { margin-top: calc(var(--space) * 3); } /* 3x section boundary */
  SCOPE > * + [data-flow="cta"]   { margin-top: calc(var(--space) * 2); } /* 2x above a CTA group */
  SCOPE > * + :is(ul, ol)         { margin-top: var(--space); }           /* restore list top gap */

  /* Lists own their vertical rhythm; indentation is left to the list itself
     (ui/list's `ms-6`, or the legacy global start-margin for raw lists) -- adding
     padding here would double the indent. */
  :where(.flow) :is(ul, ol) { margin-bottom: 0; }
  :where(.flow) li          { margin-bottom: 0; }
  :where(.flow) li + li     { margin-top: calc(var(--space) * 0.5); }
}
```

Two subtleties in the shipped rules:

- **`h2` is matched twice.** It appears in both the `2x` heading rule and the `3x` boundary rule. A top-level `h2` (direct child of `.flow`) matches both, and source order makes the later `3x` rule win -- a section break. An `h2` *inside* a `<section>` only matches the `2x` rule, but as the section's first child it has no preceding sibling, so it gets nothing and the `<section>` boundary owns the gap. Net: top-level `h2` = `3x`, nested section heading = the section's `3x`, an `h2` mid-section (rare) = `2x`.
- **The explicit list top-gap rule** (`* + :is(ul, ol)`) is required because the legacy global `ul/ol` rule sets `margin-top: 0` at specificity `(0,0,1)`, which would otherwise beat the zero-specificity `* + *` default and leave a list with no space above it.

(`calc(var(--spacing) * N)` is used rather than the `--spacing(N)` function form because it is plain CSS that resolves regardless of where it sits in the build; they are equivalent.)

### Responsive (the payoff)

One `@variant lg` step on `--space` rescales the entire ladder. This is what replaces the dozens of per-element `md:`/`lg:` margin overrides currently scattered across pages -- never a hard-coded px media query.

### Section boundaries

- **Markdown** (flat stream, no `<section>` elements): the `h2` IS the boundary, so `content -> h2` gets `3x`. An image never precedes an `h2` in markdown (images follow their heading), so "image belongs to this section, before the heading" can't occur here.
- **React** (a `<Section>` per `h2`, which renders `<section>`): an explicit `<section>` is the boundary and gets `3x` -- but only when it sits inside a `.flow` parent. A `<Section>` in a non-flow parent would need the component-level approach instead (see "Section component", below). The section's own first-child heading is zeroed, so the boundary gap and the heading's own gap never double up.

### CTA / button groups

A button group is a bare flex `<div>` with no element selector, so it carries a `data-flow="cta"` marker to claim `2x` above (it concludes a thought and invites action; CTAs trail, so only the top gap matters). This marker is interim: in real content a CTA group folds into a component or class that owns this spacing (the way the hero's buttons do), not a hand-added attribute.

### Edge cases

- Heading immediately after a heading (`h2` then `h3`): the `h3` is preceded by a heading, matched by `* + :is(h3,h4)` -> `2x` (separated). Correct.
- First child of `.flow`: `margin-top: 0` (a section's first-child heading relies on this so the boundary owns the gap).
- A list directly after a heading gets the `1x` default (the heading hugs it), like any block.

## Appearance: element defaults

Heading sizes are element defaults in `base.css` (responsive at `lg`); just write the semantic tag.

| Tag | Size |
|---|---|
| `h1` | `text-4xl lg:text-5xl` |
| `h2` | `text-3xl lg:text-4xl` |
| `h3` | `text-2xl lg:text-3xl` |
| `h4` | `text-xl lg:text-2xl` |
| `h5` | `text-md lg:text-xl` |
| `h6` | `text-sm lg:text-md` |

The duplicate font-weight block in `base.css` is collapsed to a single `h1-h6 { font-black }` (weight 900 -- the heading-weight standardization that landed with the dev merge). Do **not** re-apply a weight on a heading: a utility-layer `font-bold`/`font-semibold` silently overrides the base `font-black`. The `text-[2.5rem]` arbitrary size formerly on `Heading1` in `MdComponents` has been removed -- in-article page titles use the `h1` default (heroes own their own titles; no dedicated token).

## Line-height policy

Line-height comes from the size-token pairing in `theme.css` (`--text-4xl--line-height: 1.2`, etc.); body uses `--leading-base` (1.6).

- The bare size utility (or element default) already applies the paired line-height -- nothing extra for the common case.
- Do NOT override line-height per component. Migration removes the `leading-xs` baked into `commonHeadingAttributes` in `MdComponents` and scattered `!leading-xs` instances.
- For an intentional one-off, use the slash form `text-{size}/{leading}` (e.g. `text-base/base`) rather than a separate `leading-*` class.

## Markdown heading anchors (must preserve)

The `MdComponents` heading wrappers had their spacing/leading stripped; the structural behavior was preserved:
- The custom `{#kebab-id}` -> `id` attribute.
- The `IdAnchor` child rendering the hover link icon and the `group` / `data-group` hooks.
- The `scroll-mt-*` offset so anchored navigation isn't clipped by the sticky nav.

Only the presentational noise was removed: `my-8`, `leading-xs`, `text-[2.5rem]`. Appearance comes from element defaults; spacing from `.flow`.

## Where `.flow` is applied

- **Markdown content:** `.flow` is on the content container -- `ContentContainer` (the `ContentLayout` body) and the `MainArticle` in the `Docs`/`Static`/`Tutorial` layouts. All MDX prose gets the rhythm, and the `MdComponents` element wrappers carry no spacing of their own -- only id + anchor + scroll-margin.
- **App pages (`page.tsx`):** wrap prose-like regions in `.flow`; use `Stack` / `gap` / `Section` for component composition. Prose-like = a sequence of mixed headings/paragraphs/lists; composition = repeated like-shaped blocks (cards, grid items).

## Section component (open / planned)

`<Section>` (`ui/section.tsx`) is used in ~28 files and currently provides no inter-section spacing and no flow. The plan (a separate, focused follow-up, given the blast radius):

1. Inline the one `responsiveFlex` use (TrustLogos) and delete the variant -- removing the only layout-container case.
2. Add `flow` to `<Section>`'s base classes so section content flows naturally (now safe without the layout variant).
3. Standardize scroll-margin (bump the base to the larger value, drop the `tabNav` variant -- 5 uses, all covered).
4. Triage subcomponents: keep used ones (`SectionContent`, `SectionTag`); verify/remove `SectionBanner` (1 use); fold `SectionHeader`'s hard-coded `text-5xl/6xl` into the heading system.

Spacing between sections: the `.flow > * + section` rule already covers `<Section>`s that live inside a `.flow` parent. When the Section refactor lands, ensure the gap is owned by ONE mechanism (the flow rule OR a component margin), never both.

## Layout & MdComponents consolidation

Shared markdown element rendering should live in ONE place. The layouts (`Docs`, `Static`, `Tutorial`, etc.) each carry their own (largely commented-out) `const Heading2` / `const Pre` / `const Paragraph` -- the same wrappers replicated per layout. Target: the canonical HTML-element map lives once in `MdComponents` (`htmlElements`); layouts pass through only the custom React components their content uses; delete the dead per-layout blocks. Verify the exact duplication when this phase starts.

## Override policy

`className` is the escape hatch for genuine, intentional deviations:
- Size override on the element: `<h2 className="text-4xl lg:text-5xl">`.
- A one-off spacing deviation only when truly warranted -- treat it as a smell to revisit.

Discouraged (what we are removing): per-element `my-8`/`mt-8 mb-4`, `!leading-*`, arbitrary `text-[Xrem]`, `<div className="text-5xl font-bold">` instead of a heading tag.

## Verification

No unit tests in this project; Storybook + Chromatic is the regression net.
- `src/components/ui/__stories__/FlowRhythm.stories.tsx` -- a `KitchenSink` story (full mixed article: eyebrow, h1, image->h2, p->p, h3 + lists, h4, blockquote, sections, CTA groups) and a compact `RatioReference`. Both snapshot at `md` (mobile) and `2xl` (desktop) to lock the single-variable rescale.
- Chromatic locks the rhythm so any regression is a visible diff.
- Optional later: an ESLint guard flagging new `text-[*rem]` and per-element heading margins in content.

## Migration status

Shipped on `ui-headers`:

- `--space` + the `.flow` rules in `base.css`; kitchen-sink story; this spec.
- Line-height: component-level `leading-*` overrides removed from `MdComponents`.
- Appearance: `text-[2.5rem]` on the in-article title removed; font-weight collapsed to a single `font-black`.
- `.flow` applied to the markdown content container; per-element spacing stripped from the `MdComponents` wrappers.
- App pages migrated opportunistically to semantic tags + `.flow` / `Stack` (long tail ongoing).
- Durable rules distilled into `spacing-typography.md` (canonical).

Remaining:

- `<Section>` refactor (see "Section component" above) -- add `flow` to its base, standardize scroll-margin, triage subcomponents.
- Layouts / `MdComponents` consolidation: one canonical element map, delete any dead per-layout wrappers.
- Remove the legacy global `ul/ol/li` block from `base.css` once nothing outside `.flow` relies on it.
- Optional ESLint guardrail flagging new `text-[*rem]` / per-element heading margins in content.

## Decisions

- Base token: `--space`, defined once globally and responsive -- `--spacing(4)` (16px) mobile, `--spacing(6)` (24px) desktop. Chosen as the Tailwind step that pairs well with the primary-heading size.
- Multiples: `1x` default (incl. heading->content), `0.5x` list items, `2x` above a subsection heading (h3/h4) and above a CTA group, `3x` above a section boundary (h1/h2 or `<section>`).
- All gaps are `margin-top` (space-before), matching Tailwind `space-y-*`.
- No `em`/`lh` in the flow rhythm -- a single `--space` ladder. (Earlier iterations used an `em` hug; dropped for consistency. PageHero still uses `lh` internally for its own description block -- component-local, acceptable.)
- The heading "hug" is the `1x` default; the close-below/far-above asymmetry comes from the larger above-heading gaps, not a special hug value.
- Page-title size: the `h1` default; heroes own page titles.
- CTA spacing: interim `data-flow="cta"` marker (`2x` above); folds into a component/class in real content.
- `<section>` element counts as a section boundary (`3x`) when inside a `.flow` parent.
- `.flow` is opt-in and scoped; legacy global list margins stay until the migration removes them.

## Open

- The `<Section>` refactor (above) -- separate follow-up; avoid double-spacing the section gap.
- Whether the interim `data-flow="cta"` marker becomes a real CTA component/class.
- PageHero uses `space-y-[0.5lh]` for its description while the flow uses `--space` multiples; align or leave as an accepted component-local choice.
- Final `--space` tuning across the full migration (values validated in the POC, not yet against real long-form content).
