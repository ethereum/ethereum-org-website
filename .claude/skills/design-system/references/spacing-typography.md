# Spacing & Typography

The most common source of "one-off styling" in this codebase is ad-hoc spacing and heading sizing decisions. This reference centralizes the canonical patterns so you don't reinvent them per-page.

## Heading Sizes

Headings (`<h1>`-`<h6>`) are styled by `src/styles/base.css` element defaults. **Just write the semantic tag.** Don't reinvent with `<div className="text-Xxl font-bold">`.

All headings default to `font-black` (weight 900) via `base.css`. **Do not re-apply a weight** -- a hardcoded `font-bold`/`font-semibold` on a heading sits in the utilities layer and silently overrides the base `font-black`, which is exactly the drift the heading-weight standardization removed. If you need a lighter weight for an eyebrow/kicker/label, that's a deliberate `font-normal`/`font-medium` choice, not a default.

| Tag | Default sizing | When to use |
|---|---|---|
| `<h1>` | `text-4xl lg:text-5xl font-black` | Page title -- ONE per page |
| `<h2>` | `text-3xl lg:text-4xl font-black` | Top-level section title |
| `<h3>` | `text-2xl lg:text-3xl font-black` | Subsection title |
| `<h4>` | `text-xl lg:text-2xl font-black` | Sub-subsection title |
| `<h5>` | `text-lg font-black` | Small heading |
| `<h6>` | `text-base font-black` | Smallest heading; also used in `Alert`/`Callout` titles |

### Overrides

If you need a heading at a different size (because the design calls for it), override on the element:

```tsx
<h2 className="text-4xl lg:text-5xl">A larger h2</h2>
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

### The "page title" gap

There's a recurring `text-[2.5rem]` arbitrary value in `MdComponents` for in-article page titles. This is a known gap pending a `--text-page-title` token decision. Until that lands, the arbitrary value is the convention there; don't reinvent your own page-title size. (Note: `PageHero` does **not** use this value -- its title is `text-3xl ... lg:text-6xl` -- so don't copy `text-[2.5rem]` into hero work.)

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
| Container horizontal padding | Handled by `Section`/page layout, not per-component |

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
7. **Arbitrary `text-[2.5rem]` for in-article titles** -- known gap; don't add new instances

The pattern: when you reach for arbitrary values or inline class chains, pause and check whether a primitive already does this. The answer is almost always yes.
