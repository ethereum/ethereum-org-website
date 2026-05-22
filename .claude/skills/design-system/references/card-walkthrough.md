# Walkthrough: "I Need a Card"

The Card primitive in `@/components/ui/card` has been deliberately standardized so that almost every card-shaped UI in the site can be expressed by *composing the parts and choosing variants*, not by writing one-off Tailwind chains via `className`. **If you find yourself reaching for `className` to adjust padding, spacing, background, border-radius, or typography on a card or its parts, stop and look for the variant first.** Adding a new variant is preferred over `className` overrides; `className` overrides are a sign the variant matrix is missing a case worth filling in.

The Card system is driven by CSS custom properties set at the `Card` level (`--card-pad`, `--content-space`, `--banner-radius`) which child parts read. This means: change a variant on the parent, every child responds correctly. Override one prop on the parent, you usually don't have to touch any child.

## The Anatomy

```
Card                         <- parent wrapper, owns CSS vars + background
  CardHeader                 <- optional; often holds a CardBanner or CardEmoji
    CardBanner | CardEmoji
  CardContent                <- the body; expands to fill height
    CardTitle
    CardParagraph
    (other content)
  CardFooter                 <- optional; CTAs, trailing links; pushed to bottom
```

`Card` defaults to vertical stacking (`flex flex-col`). The `orientation` variant exists but only `col` is in production use; don't reach for `row` or `unset` without coordinating with design.

## Step 1: Compose the Parts

```tsx
import {
  Card,
  CardBanner,
  CardContent,
  CardFooter,
  CardHeader,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"

<Card href="/articles/proof-of-stake">
  <CardHeader>
    <CardBanner background="accent-a">
      <Image src={posIllustration} alt="Stylized validators staking ETH" />
    </CardBanner>
  </CardHeader>
  <CardContent>
    <CardTitle>Proof of Stake</CardTitle>
    <CardParagraph>How Ethereum secures the network.</CardParagraph>
  </CardContent>
  <CardFooter>
    <ButtonLink href="/learn-more">Learn more</ButtonLink>
  </CardFooter>
</Card>
```

### `Card` with `href`

When you pass `href`, `Card` automatically wraps in `BaseLink` and adds a `group/link` class so descendants can react to card-level hover/focus. You don't need to nest your own `<a>` for "whole card clickable" cards.

## Step 2: Pick the `background` Variant

| Variant | When to use |
|---|---|
| `base` (default) | Standard card on the default page background. Gives `bg-background-highlight` (grey). |
| `nested` | When the Card sits inside a section that already has a non-default background. Gives `bg-background` (white in light, black in dark) so it visually pops out from the colored container. |
| `header-bar` | "Top bar" appearance: only the `CardHeader` region gets the highlight background, the rest is bordered. Use when design calls for a labeled bar at the top of the card. |
| `none` | No background. The Card behaves more like an outlined container. `--banner-radius` is automatically widened (since the banner's edge IS the card's edge), so any `CardBanner` matches the outer corner radius. |
| `gradient` | Avoid unless design explicitly asks. |
| `radial-a` | Avoid unless design explicitly asks. |

## Step 3: Pick the `spacing` Variant

`spacing` controls two CSS variables:
- `--card-pad`: padding around each subcomponent (Header/Content/Footer), and the *implicit* spacing between them (because Header zeros its bottom-pad and Footer zeros its top-pad).
- `--content-space`: vertical rhythm between elements inside `CardContent`.

| Variant | `--card-pad` | `--content-space` | When to use |
|---|---|---|---|
| `lg` | 24px (32px at md+) | 32px | Hero/feature cards with a lot of content |
| `base` (default) | 16px (24px at md+) | 1lh (~the body line-height) | Most cards |
| `md` | 16px | 16px | Slightly tighter |
| `sm` | 10px | 10px | Compact list cards |
| `xs` | 0 | 4px | No padding; use when the banner image needs to extend to all edges of the Card |

## Step 4: Border Radius "Just Works"

`Card`'s border-radius is computed from `--banner-radius` + `--card-pad`. The default `--banner-radius` is 4px and it's bumped to 16px when `background="none"` (no inset padding to bridge). You almost never need to override card or banner radius directly. If you do, set `--banner-radius` on the `Card` rather than overriding the `rounded-` class on either element.

## When the Variants Don't Cover Your Case

If you genuinely need something the variant matrix doesn't offer, **add a variant to the primitive in `src/components/ui/card.tsx`**. Don't paper over it with `className` on the call site. The point of standardization is that the next person searching for "how do I make this card 32px-padded" sees a `spacing="lg"` option, not an in-place class chain.

When *should* you use `className`? Things that are genuinely outside the Card's structural responsibility: layout context (`max-w-`, `col-span-`), data attributes for testing, animation hooks. Not padding, spacing, background, border radius, or text styling.

## Sub-Components in Detail

### `CardHeader`

```tsx
<CardHeader>...</CardHeader>
<CardHeader variant="bar">
  <Icon /> <span>Label</span>
</CardHeader>
```

- Inherits `--card-pad` from the parent.
- Defaults to `padding-bottom: 0` so the *only* gap between Header and Content is Content's top-pad. Override with `spacing="inherit"` if you need full padding on the bottom.
- `variant="bar"` makes it `flex flex-row items-center` with a bottom border — used for icon-plus-text "bar" headers, often paired with `Card background="header-bar"`.
- Common children: `CardBanner`, `CardEmoji`, or a small heading row.

### `CardContent`

```tsx
<CardContent>
  <CardTitle>...</CardTitle>
  <CardParagraph>...</CardParagraph>
</CardContent>
<CardContent spacing="sm">{/* tighter rhythm than the Card's default */}</CardContent>
```

- Inherits `--card-pad` and `--content-space` from the parent.
- Sets `space-y-(--content-space)` so children get consistent vertical rhythm without anyone setting margins.
- Expands to fill height (`flex-1`), which is why `CardFooter` lands at the bottom and footers align across a row of variable-height cards.
- Override `spacing` when you want children to sit closer than the Card-level `--content-space`. Useful when `Card spacing="lg"` is correct for outer padding but the body needs less internal air.
- Default text color is `text-body-medium`; `CardTitle` and `<strong>` are re-asserted as `text-body` so they stand out. You don't need to set text colors on individual paragraphs.

### `CardFooter`

```tsx
<CardFooter>
  <ButtonLink href="...">CTA</ButtonLink>
</CardFooter>
<CardFooter buttons="compact">...</CardFooter>
```

- Inherits `--card-pad` from the parent.
- Defaults to `padding-top: 0` (mirrors `CardHeader`'s `padding-bottom: 0`); the gap between Content and Footer comes from Content's bottom-pad. Override with `spacing="inherit"` if needed (rare).
- `buttons="full"` (default): buttons and ButtonLinks stretch to full width and center their text. Use this when you want CTAs to span the card.
- `buttons="compact"`: buttons size to fit their content. Use for trailing-link style or when the button shouldn't dominate.
- The `rounded` variant (`fit`) is a proof-of-concept for fitting button radius to the Card's outer radius; **not yet implemented anywhere**. Don't reach for it without coordinating with design.

### `CardBanner`

```tsx
<CardBanner>
  <Image src="..." alt="..." />
</CardBanner>
<CardBanner background="none" fit="contain">
  <Image src={logo} alt="Vendor logo" />
</CardBanner>
```

- For banner images. Default `background="body"` paints a tinted placeholder so loading images don't flash unstyled. Use `background="none"` only when the image will *not* cover the full rectangle and a tint behind it would look wrong.
- `size` variants: `full | lg | base | sm | thumbnail`. Prefer one of these over `className="h-..."` — the height tokens are part of the design system's vertical rhythm.
- `fit="contain"` with a *single* `<Image>` child triggers an auto-blurred-backdrop effect: the same image is cloned, scaled, blurred, and placed behind to fill any letterboxing. If you pass two children, you lose this magic and need to provide your own backdrop.
- Placement:
  - Inside `CardHeader` (most common): the banner respects `--card-pad` and gets `--banner-radius`-rounded corners.
  - As a direct child of `Card` (no `CardHeader` wrapper): the banner extends to the card's edges (no padding). Pair with `Card spacing="xs"` for an edge-to-edge image card.

### `CardEmoji`

```tsx
<CardHeader>
  <CardEmoji text=":rocket:" />
</CardHeader>
```

- Renders a large emoji inside a fixed-size `div` so there's no layout shift when the client-side `Emoji` component hydrates.
- Typically lives in `CardHeader`. If you don't use a header, you can drop it directly in `CardContent`, but the header placement is the standard.

### `CardTitle`

```tsx
<CardTitle>Default <h3>, bold variant</CardTitle>
<CardTitle variant="semibold">Smaller, semibold</CardTitle>
<CardTitle asChild><h2>Use h2 when nested inside the doc outline requires it</h2></CardTitle>
```

- Renders as `<h3>` by default. **You MUST use `asChild` and pass your own semantic tag** when the card sits before the first `<h2>` (or anywhere h3 would break the heading outline). Heading order is an a11y requirement, not a stylistic choice.
- `variant`: `semibold | bold (default) | black` — different visual weights for different card prominence. Pick by visual hierarchy, not arbitrarily.
- `spacing` controls the gap between the title and the immediately-following `CardParagraph` (uses `:has(+...)`):
  - `half` (default): half of `--content-space`. Tight binding between title and lead paragraph.
  - `quarter`: tighter yet (25%).
  - `none`: zero gap.
  - `inherit`: full `--content-space` (treats it like any other content element).
- Default text color is `text-body` (re-asserted against CardContent's `text-body-medium` default).

### `CardParagraph`

```tsx
<CardParagraph>Standard body text in a card.</CardParagraph>
<CardParagraph size="sm">Smaller (14px) variant for dense cards.</CardParagraph>
```

- Renders a `<p data-label="card-paragraph">`.
- Defaults to 16px (`text-body-medium` via the Content default). `size="sm"` gives 14px. Avoid other text sizes; if you need something genuinely different, that's a discussion for design.
- Spacing between paragraphs is owned by `CardContent`'s `space-y-(--content-space)`.
- The first `CardParagraph` *immediately following* a `CardTitle` gets the title-spacing variant treatment (see `CardTitle` above).

## A Note on `hoverEffect`

`Card` has a `hoverEffect` variant currently scaffolded as a proof-of-concept for designers. It is **not used in production code** and may be removed before this work ships. Don't build new patterns on top of it; if you need hover behavior, use the existing `group/link` propagation that `href`-Cards already provide.

## What NOT to Do

```tsx
// DON'T: inline the card shell with one-off classes
<div className="flex flex-col gap-3 rounded-3xl border bg-background-highlight p-6 hover:shadow-lg">
  <h3 className="text-2xl font-bold">Title</h3>
  <p className="text-body-medium">Description</p>
</div>

// DON'T: reach for className to adjust padding/spacing
<Card className="p-8">
  <CardContent className="space-y-2 p-8">...</CardContent>
</Card>

// DON'T: override text color per-paragraph
<CardParagraph className="text-body">...</CardParagraph>
```

```tsx
// DO: compose the primitives and pick variants
<Card spacing="lg">
  <CardContent spacing="sm">
    <CardTitle>Title</CardTitle>
    <CardParagraph>Description</CardParagraph>
  </CardContent>
</Card>
```

## Pre-Merge Checklist

- [ ] Imports from `@/components/ui/card` (NOT `@/components/Card` — that's the markdown shortcode)
- [ ] If linkable, uses `Card href="..."` (not a wrapping `<a>`)
- [ ] No `className` on `Card`/parts that adjusts padding, background, spacing, border-radius, or text color — those go through variants
- [ ] Heading is `CardTitle`; uses `asChild` if `<h3>` would break heading outline
- [ ] Description is `CardParagraph`
- [ ] Image lives in a `CardBanner` (inside `CardHeader` for padded, or as a direct child of `Card` with `spacing="xs"` for edge-to-edge)
- [ ] If image needs containment, `fit="contain"` is used to get the auto-blur backdrop
- [ ] If you added a new variant case to `card.tsx`, story coverage is updated
- [ ] Tested in light AND dark mode
- [ ] Tested with verbose-language (German/Spanish) text — no overflow
- [ ] Tested with RTL locale (Arabic) — nothing breaks
