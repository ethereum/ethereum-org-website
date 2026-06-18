# Spacing & Typography

The most common source of "one-off styling" in this codebase is ad-hoc spacing and heading sizing decisions. This reference centralizes the canonical patterns so you don't reinvent them per-page.

## Heading Sizes

Headings (`<h1>`-`<h6>`) are styled by `src/styles/base.css` element defaults. **Just write the semantic tag.** Don't reinvent with `<div className="text-Xxl font-bold">`.

Sizing for each level lives in one place: the `text-h1`-`text-h6` utilities in `src/styles/utilities.css`. Each bundles the **font-size and line-height** for that level (responsive). `base.css` `@apply`s `text-h1` to `<h1>`, `text-h2` to `<h2>`, and so on -- so these utilities are the single source of truth for heading sizing.

All headings default to `font-black` (weight 900) via `base.css`. The `text-h*` utilities carry size/line-height **only** -- not the weight. **Do not re-apply a weight** on a real heading -- a hardcoded `font-bold`/`font-semibold` sits in the utilities layer and silently overrides the base `font-black`, which is exactly the drift the heading-weight standardization removed. If you need a lighter weight for an eyebrow/kicker/label, that's a deliberate `font-normal`/`font-medium` choice, not a default.

| Tag | Sizing utility | Expands to | When to use |
|---|---|---|---|
| `<h1>` | `text-h1` | `text-4xl lg:text-5xl` | Page title -- ONE per page |
| `<h2>` | `text-h2` | `text-3xl lg:text-4xl` | Top-level section title |
| `<h3>` | `text-h3` | `text-2xl lg:text-3xl` | Subsection title |
| `<h4>` | `text-h4` | `text-xl lg:text-2xl` | Sub-subsection title |
| `<h5>` | `text-h5` | `text-md lg:text-xl` | Small heading |
| `<h6>` | `text-h6` | `text-sm lg:text-md` | Smallest heading; also used in `Alert`/`Callout` titles |

### Matching a heading size on any element

To make a non-heading element read at a given heading level's size, apply the utility -- never reconstruct the responsive pair by hand:

```tsx
// Wrong -- hand-reconstructs h2 sizing; drifts when the scale changes
<p className="text-3xl lg:text-4xl">Looks like an h2</p>

// Right -- one token, stays in sync with base.css
<p className="text-h2">Looks like an h2</p>
```

This is size and line-height only -- it does not apply `font-black`. Set weight separately on a non-heading element if the design wants it.

### Overrides

If you need a real heading at a different level's size (because the design calls for it), reuse the matching utility on the element:

```tsx
<h2 className="text-h1">A larger h2</h2>
```

Don't override structurally (e.g., using `<h1>` for an `<h3>`-sized element just to get the size). Heading hierarchy matters for screen readers.

### Skip-level prevention

Don't go from `<h2>` to `<h4>`. Screen reader users navigate by heading level, and gaps confuse the structure. If you need a smaller-looking heading, use the right level and override the size class.

### Hero "title" vs "header"

`Hero/*` components use:
- `header` -- a small uppercase eyebrow, rendered as `<h1>` (intentional in `HubHero` and `PageHero`). In `PageHero`, supplying `header` demotes `title` to `<h2>`, so the eyebrow is the page `<h1>`.
- `title` -- the visible large title (the `<h1>` when no `header` eyebrow is passed)
- `description` -- the lead paragraph

In `PageHero` the eyebrow slot is a discriminated union: pass **either** `breadcrumbs` (a `{ slug }` object or a custom `<Breadcrumb>` element) **or** `header` -- not both. Don't conflate these fields. See `references/page-hero-walkthrough.md`.

### Markdown page titles

In-article (markdown) page titles render as a plain `<h1>` from the layout (`Docs`/`Static`/`Tutorial`) -- the `text-4xl lg:text-5xl` default, no special token. (Historical note: this used to be a `text-[2.5rem]` arbitrary value in `MdComponents`; it's been removed.) `PageHero` owns hero titles separately (`text-3xl ... lg:text-6xl`) -- don't copy hero sizes into article titles or vice versa.

## Content Spacing: the `.flow` rhythm

For prose-like content -- a sequence of mixed headings, paragraphs, and lists -- vertical spacing is owned by the opt-in **`.flow`** system, not by per-element `mt-*`/`mb-*`. Add `flow` to the content region and write semantic tags; the rhythm is automatic.

```tsx
<div className="flow">
  <h2>Section title</h2>
  <p>Body copy. No margin classes needed.</p>
  <h3>Subsection</h3>
  <p>More copy.</p>
</div>
```

It's already applied in markdown content -- the `MainArticle` in the `ContentLayout`, `Docs`, `Static`, and `Tutorial` layouts -- so MDX prose just works. On React pages, add `flow` to a prose region yourself (it is **not** a default on `MainArticle`, since many pages use it as a grid/layout container).

**The rhythm.** One responsive base unit `--space` (`--spacing(4)` = 16px mobile, `--spacing(6)` = 24px from `lg`); every gap is a `margin-top` multiple of it:

| Gap | Multiple | mobile / desktop |
|---|---|---|
| default -- any block to any block (heading->content, p->p, p->list, image->p) | `1x` | 16 / 24 |
| between list items (`li`->`li`) | `0.5x` | 8 / 12 |
| above a subsection heading (`h3`/`h4`) | `2x` | 32 / 48 |
| above a section boundary (a top-level `h1`/`h2`, or a `<section>`) | `3x` | 48 / 72 |
| above a CTA/button group (`[data-flow="cta"]`) | `2x` | 32 / 48 |

The designers' "heading hugs the content it introduces" effect is the `1x` default *below* a heading combined with the larger gap *above* it (3:1 for a section, 2:1 for a subsection) -- not a special tight value.

**Scope.** `flow` styles the direct children of the region *and* the direct children of any `<section>` one level inside it -- so wrap a group of `<h2>` + content in `<Section>`/`<section>` and it gets the rhythm without its own `flow` class. A component that renders its own `<section>` but manages its own spacing opts out with `data-flow="skip"`. The rules are zero-specificity (`:where()`), so a plain utility class still overrides any gap when you genuinely need an exception.

**To nest a group, reach for `<section>` (or `<Section>`), not `<div>`.** Flow reaches one level into a `<section>`, but a `<div>` is opaque to it -- its children get no rhythm at all:

```tsx
// children space correctly -- flow reaches one level into <section>
<div className="flow">
  <h2>Title</h2>
  <section>
    <h3>Subsection</h3>
    <p>Spaced.</p>
    <p>Spaced.</p>
  </section>
</div>

// the <div> blocks flow -- its children get NO rhythm
<div className="flow">
  <h2>Title</h2>
  <div>
    <h3>Subsection</h3>
    <p>No space above me.</p>
    <p>No space above me.</p>
  </div>
</div>
```

**`.flow` vs `Stack`/`gap`.** Use `.flow` for *prose* (mixed heading/paragraph/list streams). Use `Stack`/`gap-*` (below) for *composition* -- repeated like-shaped blocks (cards, grid items, control rows). Don't put both on the same container.

Full design rationale and edge cases: `references/typography-spacing-flow-spec.md`.

## Spacing Scale

Tailwind v4 generates the full spacing scale automatically, including fractional values. You can use `mt-3.5` (14px), `mt-7.5` (30px), `inset-s-3.75` (15px), etc. without anything extra in `theme.css`. **Avoid nit-picky granularity** -- `mt-8` is good, `mt-9` is rarely worth it. Stick to common increments unless the design genuinely calls for a fractional value.

Common increments: `0`, `0.5` (2px), `1` (4px), `2` (8px), `3` (12px), `4` (16px), `6` (24px), `8` (32px), `12` (48px), `16` (64px), `20`, `24`, `32`, `48`, `64` ...

If you do need a fractional value, prefer scale syntax over arbitrary syntax. See "Arbitrary Values" in `references/tokens.md` for the priority order.

### Common patterns

| Use case | Class |
|---|---|
| Tight inline spacing (icon-text gap) | `gap-2` (8px) |
| Default item spacing in a list | `gap-4` (16px) |
| Between major content elements | `gap-6` or `gap-8` |
| Between content blocks within a section | `gap-12` (48px) or `gap-16` (64px) |
| Between sections on a page | `gap-16` to `gap-24` (64-96px) |
| Section padding (vertical) | `py-16` to `py-24` |
| Container horizontal padding | The `page` padding token (`px-page`), via `Section`/page layout -- not per-component |

These are heuristics, not rules. Match what surrounding components use rather than picking arbitrarily.

### Stack over `space-y-*`

Prefer the project's `Stack` primitive over `space-y-X` classes:

```tsx
// Less consistent:
<div className="flex flex-col space-y-4">{children}</div>

// More consistent:
import { Stack } from "@/components/ui/flex"
<Stack className="gap-4">{children}</Stack>
```

`Stack` defaults to `flex flex-col gap-2`. It also has a `separator` prop:

```tsx
<Stack separator={<Divider />}>{items}</Stack>
```

`HStack` (`flex-row items-center`) and `VStack` (`flex-col items-center`) are also available.

### `Section` for page-level padding

`@/components/ui/section` handles the `<section>` wrapper with appropriate scroll-margin (so sticky-nav doesn't clip the heading when navigating to anchors). Use it for top-level page sections instead of writing your own `<section className="...">` chain.

### Page padding (`--page-pad`), rhythm (`--space`), hero (`--hero-pad`) tokens

Three responsive design tokens back the standard page metrics; all are registered in `theme.css` so they generate Tailwind spacing utilities (full table in `references/tokens.md`):

- **`--page-pad`** -- standard page/section horizontal padding: `--spacing(4)` (1rem) on mobile, `--spacing(8)` (2rem) from `md`. Use the `page` utilities (`px-page`, `p-page`, `pb-page`, `gap-page`, and the `*-page-2x` step) instead of hard-coding `px-4 md:px-8` or an arbitrary `px-(--page-pad)`. Keeps horizontal page padding consistent across pages.
- **`--space`** -- the `.flow` rhythm base (`--spacing(4)` mobile, `--spacing(6)` from `lg`). `.flow` applies it automatically; when you need the same unit *manually* (an explicit gap or margin outside a flow region), reach for the `space` utilities (`mt-space`, `gap-space`, `space-y-space-2x`, `mt-space-half`, `mt-space-3x`, ...) rather than re-deriving `mt-4 lg:mt-6`.
- **`--hero-pad`** -- `PageHero`'s internal padding (`--spacing(8)`, 2rem). Use the `hero` utilities (`p-hero`, `px-hero`, `py-hero-2x`, `pe-hero`, `*-hero-half/-1.5x/-2x/-3x`) rather than arbitrary `p-(--pad)`/`calc(var(--pad)*1.5)`. Mostly internal to `PageHero`, but available for hero-adjacent chrome.

Prefer these tokens over the raw scale for page padding, flow rhythm, and hero padding so the metrics stay coherent and scale from a single variable.

**Canonical app-page skeleton.** Non-markdown pages (`app/[locale]/<route>/page.tsx`) compose these:

```tsx
<main className="p-page pt-page-2x">              {/* page padding from the `page` token */}
  <MainArticle className="flow space-y-space-4x">  {/* flow rhythm; `space` gaps between sections */}
    <Section id="overview">                        {/* chunk with header IDs for anchor nav */}
      <h2>Overview</h2>                            {/* semantic tags; size from base.css, rhythm from flow */}
      <p>...</p>
    </Section>
    {/* more <Section> blocks */}
  </MainArticle>

  {/* End-of-page actions live OUTSIDE the article -- see references/layouts.md */}
  <ContentFeedback />
</main>
```

## Logical Spacing for RTL

Always use logical equivalents for direction-dependent spacing:

| Don't use | Use instead |
|---|---|
| `ml-X` | `ms-X` |
| `mr-X` | `me-X` |
| `pl-X` | `ps-X` |
| `pr-X` | `pe-X` |
| `border-l` | `border-s` |
| `border-r` | `border-e` |
| `text-left` | `text-start` |
| `text-right` | `text-end` |
| `left-X` | `inset-s-X` |
| `right-X` | `inset-e-X` |

Same for arbitrary values: `inset-s-[12px]`, `me-[2rem]`.

Vertical (`top-`, `bottom-`, `mt-`, `mb-`, `pt-`, `pb-`) is fine -- it's not direction-dependent.

## Breakpoints (Non-Default)

The project resets Tailwind defaults. From `src/styles/theme.css`:

| Token | Value | Common use |
|---|---|---|
| `sm` | 480px | Mobile landscape / large phone |
| `md` | 768px | Tablet |
| `lg` | 992px (NOT Tailwind's 1024px) | Desktop |
| `xl` | 1280px | Wide desktop |
| `2xl` | 1536px | Ultra-wide |

Mobile-first: write base styles for mobile, layer responsive prefixes (`sm:`, `md:`, `lg:`) for larger screens.

Most components need at most 2-3 breakpoint tiers. If you find yourself writing 4+ responsive variants, the component is doing too much -- decompose.

## Typography Scale

Tailwind text size utilities. Pair with leading utilities (`leading-base`, `leading-tight`, etc.).

| Class | Size | Common use |
|---|---|---|
| `text-2xs` | 10px | Fine print, tags |
| `text-xs` | 12px | Tags, captions, helper text |
| `text-sm` | 14px | Secondary body, button labels (sm) |
| `text-base` | 16px | Body text default |
| `text-md` | 18px | Slightly emphasized body |
| `text-lg` | 20px | Lead paragraphs, h5 |
| `text-xl` | 24px | h4 (mobile) |
| `text-2xl` | 28px | h3 (mobile), h4 (desktop) |
| `text-3xl` | 32px | h2 (mobile), h3 (desktop) |
| `text-4xl` | 40px | h1 (mobile), h2 (desktop) |
| `text-5xl` | 48px | h1 (desktop) |
| `text-6xl` / `text-7xl` | 56-72px | Special: `HomeHero` only |

The "Common use" column maps these raw sizes to heading levels for reference. When your intent is "match a heading level's size," reach for the `text-h1`-`text-h6` utilities (see "Heading Sizes" above) instead of the raw class -- they bundle the responsive size + line-height and track `base.css`.

Use semantic tokens (`text-body`, `text-body-medium`, `text-body-light`, `text-primary`, etc.) for color. See `references/tokens.md`.

### Don't mix arbitrary text sizes

`text-[2.5rem]`, `text-[1.125rem]`, etc. should be a last resort. They bypass the responsive scale and get inconsistent across the site. If a design calls for a size that isn't in the scale, raise it as a design question rather than baking the arbitrary value into a component.

## Arbitrary Values

Quick rule: prefer scale syntax over arbitrary syntax even for fractional values. See `references/tokens.md` for the full discussion. For responsive card/item grids, use the `Grid` component (`@/components/ui/grid`) or its `grid-cols-auto-*` utility rather than arbitrary track sizes; `grid-cols-bento` covers the bento layout -- documented in `tokens.md` under "Grid templates."

## Common One-Off Styling Anti-Patterns

These are the recurring patterns that cause "every page looks slightly different":

1. **Inline `<div className="flex flex-col gap-4">` chains** -- use `Stack`
2. **Custom card shells with hand-picked padding/border/radius** -- use `Card`
3. **`<p className="text-Xxl font-bold">` for prominent numbers** -- use `BigNumber`
4. **`<div className="text-5xl font-bold">` for headings** -- use `<h1>`-`<h6>`
5. **Page-level `<section className="my-32 py-16 px-4">`** -- use `Section`
6. **Page-level horizontal padding hand-rolled** -- check the page layout, not the section
7. **Per-element `mt-*`/`mb-*` chains on prose** -- add `.flow` to the content region and let the rhythm own the spacing

The pattern: when you reach for arbitrary values or inline class chains, pause and check whether a primitive already does this. The answer is almost always yes.
