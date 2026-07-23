# Walkthrough: "I Need a Card"

The Card primitive in `@/components/ui/card` has been deliberately standardized so that almost every card-shaped UI in the site can be expressed by *composing the parts and choosing variants*, not by writing one-off Tailwind chains via `className`. **If you find yourself reaching for `className` to adjust padding, spacing, background, border-radius, or typography on a card or its parts, stop and look for the variant first.** Adding a new variant is preferred over `className` overrides; `className` overrides are a sign the variant matrix is missing a case worth filling in.

The Card system is driven by CSS custom properties set at the `Card` level (`--card-pad`, `--content-space`, `--banner-radius`) which child parts read. This means: change a variant on the parent, every child responds correctly. Override one prop on the parent, you usually don't have to touch any child.

## The Anatomy

```
Card                         <- parent wrapper, owns CSS vars + variant
  CardHeader                 <- optional; often holds a CardBanner, CardEmoji, or CardIconContainer
    CardBanner | CardEmoji | CardIconContainer
  CardContent                <- the body; expands to fill height
    CardTitle
    CardParagraph
    (other content)
  CardFooter                 <- optional; CTAs, trailing links; pushed to bottom
```

`Card` always stacks its children vertically (`flex flex-col`); there is no `orientation` variant. If you need a row layout, that's a discussion with design — don't fake it with `className`.

## Step 1: Compose the Parts

```tsx
import {
  Card,
  CardBanner,
  CardButtonFake,
  CardContent,
  CardFooter,
  CardHeader,
  CardLinkFake,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"

{/* single CTA: href makes the whole card a link (auto outline/fill + lift); CardButtonFake is the CTA */}
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
    <CardButtonFake>Learn more</CardButtonFake>
  </CardFooter>
</Card>
```

### `Card` with `href`

When you pass `href`, `Card` automatically wraps in `BaseLink` and adds a `group/link` class so descendants can react to card-level hover/focus. You don't need to nest your own `<a>` for "whole card clickable" cards.

**Two hover signals that can stack -- keep their meanings distinct:**

- An **outline ring** (or, on a `ghost` card, a **`bg-background-highlight` fill**) means the **whole card is the click target**. An `href` `Card` renders this automatically (see Interaction props).
- **`hoverLift`** (the card raises on hover) means the card **carries an action**. An `href` `Card` applies it **automatically** -- a link *is* an action -- so you never pass `hoverLift` by hand on a link card. Pass it manually only on a **non-link** card that still holds an action (multiple buttons, or an inline link in the copy).

**The number of actions decides the shape. This is the canonical rule -- follow it for every new/refactored card:**

- **One CTA -> the whole card is the link.** Put `href` on the `Card` and it handles the affordance automatically (outline/fill, lift, cursor). Render the footer CTA as a **`CardButtonFake`** (button-shaped) or **`CardLinkFake`** (text link) -- never a real `ButtonLink`/`Button`/`LinkWithArrow`, which nests an interactive `<a>`/`<button>` inside the card's own anchor (invalid HTML, broken keyboard/hit-target). (See the `InteractionPatterns` story.)
- **Two or more CTAs -> the card is NOT a link, but carries actions.** Multiple independent actions can't collapse into one card-level link, so drop `href`, use real `ButtonLink`s (each its own target), and add `hoverLift` by hand. Reach for `CardFooter buttons="compact"` when they should sit inline.
- **No button, action is an inline link in the copy -> non-link card that carries an action.** Keep the card a plain `<div>` (no `href`), use an `InlineLink` in the copy, and add `hoverLift` by hand. No outline ring, which would falsely imply the entire card is a single link.

(A **pure navigation card** -- an `href` tile with no footer CTA, e.g. a media/thumbnail tile -- still gets the automatic outline/fill *and* lift from its `href`; there's just no CTA to add.)

**Rule: a link card needs interior padding, and its banner belongs in a `CardHeader`.** Because an `href` card renders a variant-aware hover state (fill or ring) tight to its outer edge, its contents must sit inset from that edge. In practice:

- If a link card contains a `CardBanner`, **wrap it in a `CardHeader` by default** so the `--card-pad` inset keeps the banner clear of the hover treatment and its corners concentric with the card. Don't drop a bare `CardBanner` straight into an `href` `Card`.
- Avoid `size="xs"` (which zeroes `--card-pad`) on a link card unless the layout supplies padding another way.

The sanctioned exceptions are cards that arrange the banner differently and **bake the padding into the banner itself** rather than relying on a `CardHeader` -- e.g. `PathwayCard` (`src/components/cards/pathway-card.tsx`), whose banner sits beside the text in a container-query row layout and carries its own `p-*`. If you're building a new bespoke link-card arrangement, follow that model: inset the banner somehow, don't leave it flush.

## Step 2: Pick the `variant`

| Variant | When to use |
|---|---|
| `base` (default) | Standard card on the default page background. Gives `bg-background-highlight` (grey). |
| `nested` | When the Card sits inside a section that already has a non-default background. Gives `bg-background` (white in light, black in dark) so it visually pops out from the colored container. |
| `ghost` | No background -- a transparent, outlined-style container. `--banner-radius` is automatically widened so an edge-to-edge `CardBanner` matches the outer corner radius. As a **link** (`href`), a ghost card fills with `bg-background-highlight` on hover instead of showing an outline ring (see Interaction props). |
| `header-bar` | "Top bar" appearance: only the `CardHeader` region gets the highlight background, the rest is bordered, and the header gets row layout (icon + text) with a bottom border. The variant bakes in all of this — just drop a `CardHeader` inside, no extra props. |

## Step 3: Pick the `size`

`size` controls two CSS variables:
- `--card-pad`: padding around each subcomponent (Header/Content/Footer), and the *implicit* spacing between them (because the parent zeros Header's bottom-pad and Footer's top-pad).
- `--content-space`: vertical rhythm between elements inside `CardContent`.

| Variant | `--card-pad` | `--content-space` | When to use |
|---|---|---|---|
| `lg` | 24px (32px at md+) | 32px | Hero/feature cards with a lot of content |
| `base` (default) | 16px (24px at md+) | 1lh (~the body line-height) | Most cards |
| `md` | 16px | 16px | Slightly tighter |
| `sm` | 10px | 10px | Compact list cards |
| `xs` | 0 | 4px | No padding; use when the banner image needs to extend to all edges of the Card |

### Interaction props: `border`, `hoverLift` (and the automatic `href` hover state)

Two independent booleans layer edge/interaction treatment on top of `variant`/`size` -- they're additive, so combine freely:

| Prop | Effect | When |
|---|---|---|
| `border` | Static hairline edge (`ring ring-border`). It's a `ring`, so it never shifts layout. | A resting outline on `nested`/`ghost` cards that need definition against their background. |
| `hoverLift` | +1% scale + shadow on hover (300ms). | **Auto-applied on every `href` `Card`** -- don't pass it there. Pass it by hand only on a **non-link** card that carries an action (multiple buttons, or an inline link in the copy), where it signals "interactive content here." |

**There is no `hoverOutline` prop anymore.** Every Card with an `href` gets a hover affordance automatically, chosen by `variant` -- you don't set it:

- **`ghost` link cards fill on hover** with `bg-background-highlight` and show *no* outline. A ghost card is transparent at rest, so the fill is the affordance; an offset ring would clip against a flush banner and read as noise. This is the treatment for the site's media/link cards (video, hackathon, story, and latest-article grids).
- **`base`, `nested`, and `header-bar` link cards keep the outline ring** (`ring-transparent` at rest -> `ring-primary-hover` on hover). They already sit on a fill, so a hover fill would be invisible; the ring is what reads.

It's implemented with `compoundVariants` keyed on an internal `interactive` flag (set from `href`, omitted from the public `CardProps`) -- not a variant you pass, and not a class you can hand-apply to a non-link card. An `href` card gets both the outline/fill and the lift automatically; a non-link card that carries an action gets `hoverLift` alone, applied by hand.

`border` composes with the ring on non-ghost link cards: the `ring-border` shows at rest and `hover:ring-primary-hover` takes over, reading as a resting border that brightens to primary. On a `ghost` link card there is no hover ring, so a `border` simply stays as the resting outline while the highlight fills behind it. These props replaced the old `hoverEffect="lift"` prop.

## Step 4: Border Radius "Just Works"

`Card`'s border-radius is computed from `--banner-radius` + `--card-pad`. The default `--banner-radius` is 4px and it's bumped to 16px when `variant="ghost"` (no inset padding to bridge). You almost never need to override card or banner radius directly. If you do, set `--banner-radius` on the `Card` rather than overriding the `rounded-` class on either element.

## When the Variants Don't Cover Your Case

If you genuinely need something the variant matrix doesn't offer, **add a variant to the primitive in `src/components/ui/card.tsx`**. Don't paper over it with `className` on the call site. The point of standardization is that the next person searching for "how do I make this card 32px-padded" sees a `size="lg"` option, not an in-place class chain.

When *should* you use `className`? Things that are genuinely outside the Card's structural responsibility: layout context (`max-w-`, `col-span-`), data attributes for testing, animation hooks. Not padding, spacing, background, border radius, or text styling.

## Sub-Components in Detail

### `CardHeader`

```tsx
<CardHeader>...</CardHeader>
```

- Inherits `--card-pad` from the parent.
- Defaults to `padding-bottom: 0` so the *only* gap between Header and Content is Content's top-pad.
- No own variants. When the parent `Card` uses `variant="header-bar"`, the header automatically gets row layout (`flex items-center gap-4`), a bottom border, and its `padding-bottom` restored — all via descendant selectors on the parent. You don't pass anything extra to `CardHeader`.
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
- The `spacing` override (`lg | md | sm | xs`) replaces `--content-space` locally when the body needs a different rhythm from the card-level `size`. Useful when `Card size="lg"` is correct for outer padding but the body needs less internal air. Omit the prop to inherit.
- Default text color is `text-body-medium`; `CardTitle` and `<strong>` are re-asserted as `text-body` so they stand out. You don't need to set text colors on individual paragraphs.

### `CardFooter`

```tsx
{/* single CTA on an href card (auto outline/fill + lift) */}
<CardFooter>
  <CardButtonFake>CTA</CardButtonFake>
</CardFooter>
{/* two CTAs on a non-link, hoverLift card */}
<CardFooter buttons="compact">
  <ButtonLink href="...">Primary</ButtonLink>
  <ButtonLink href="..." variant="outline">Secondary</ButtonLink>
</CardFooter>
```

- Inherits `--card-pad` from the parent.
- Defaults to `padding-top: 0` (mirrors `CardHeader`'s `padding-bottom: 0`); the gap between Content and Footer comes from Content's bottom-pad. The parent restores the top-pad automatically for `variant="header-bar"`.
- `buttons="responsive"` (default): CTAs span full width on a narrow card and shrink to fit once the card is wide enough (a `@container` query, not the viewport). The right default for most single- and multi-CTA footers.
- `buttons="full"`: CTAs always stretch to full width with centered text.
- `buttons="compact"`: CTAs always size to fit their content. Use for trailing-link style or when the button shouldn't dominate.
- `buttons="inherit"`: opt out — children render at their own intrinsic width (what `CardLinkFake` uses).
- The layout variants target both real buttons (`[button]`) and `CardButtonFake` (`[data-label=button-link]`), so they apply whichever you use. Which one to use is the single-vs-multiple-CTA rule under [`Card` with `href`](#card-with-href): one CTA -> `CardButtonFake` in an `href` card; two+ -> real `ButtonLink`s in a non-link card.

### `CardButtonFake`

```tsx
<Card href="/proof-of-stake">
  ...
  <CardFooter>
    <CardButtonFake>Learn more</CardButtonFake>
  </CardFooter>
</Card>
```

- The **only** correct way to render a footer CTA inside an `href` `Card`. It's a presentational `<div>` mirror of `Button` (rendered via `Button asChild`), so it reuses every Button style but is **not** an interactive element -- no nested `<a>`/`<button>` inside the card's anchor.
- Accepts Button's `variant`, `size`, and `isSecondary`. It carries `data-label="button-link"`, so `CardFooter`'s `buttons` layout variants size it exactly like a real button.
- Trailing icons mirror a real link: the external-link NE arrow appears **automatically** when the card's `href` is external; pass `hideArrow` to suppress it, or `withChevron` for a trailing chevron (the chevron yields to the NE arrow on external cards unless `hideArrow` is set).
- Button's `hover-link` styling fires from the card's `group/link`, so hovering anywhere on the card animates the fake button identically to a real hover -- you don't (and can't) hand-wire hover styles onto it.
- Never use it on a non-link card (there's nothing to click) and never use a real `Button`/`ButtonLink` as the sole CTA of an `href` card (invalid nested anchor). See the single-vs-multiple-CTA rule above.

**On an `href` card, use `CardButtonFake` — not a real `Button`/`ButtonLink`.** When the `Card` itself carries the `href` (whole-card link), a real button in the footer nests an interactive control inside the card's anchor — invalid HTML and a focus/click trap. `CardButtonFake` is a presentational `<div>` with full Button styling (`variant`/`size`/`isSecondary`) that lights up from the card's `group/link` hover, so it reads as the card's CTA without being a second control:

```tsx
<Card href={app.url} variant="nested" border>
  {/* ...header / content... */}
  <CardFooter buttons="full">
    <CardButtonFake>Learn more</CardButtonFake>
      </CardFooter>
</Card>
```

**This is the preferred shape for a card with a single trailing action:** lift the destination onto the `Card` `href` and render the CTA as a `CardButtonFake`. Keep real `ButtonLink`s (and no `href` on the `Card`) only when the card has **multiple** distinct actions — it can't collapse to one card-level link — or when it's a non-clickable card that just holds inline links.

### `CardLinkFake`

```tsx
<Card href="/layer-2/learn">
  ...
  <CardFooter buttons="inherit">
    <CardLinkFake withForwardArrow>Learn more</CardLinkFake>
  </CardFooter>
</Card>
```

- The link-styled sibling of `CardButtonFake`: use it when the single CTA of an `href` card should read as a **text link** rather than a button. Same rule applies -- a real `InlineLink`/`LinkWithArrow` inside an `href` card nests an anchor in the card's anchor, so use this presentational `<div>` mirror instead.
- Renders as a non-interactive `<div>`: the text underlines off the card's `group/link` hover/focus, so the whole card lights up identically to hovering the link.
- **`withForwardArrow`** adds the trailing right-arrow (the `LinkWithArrow` look). The external-link NE arrow is added **automatically** when the card's `href` is external; pass **`hideArrow`** to suppress it. The icon juggling mirrors `CardButtonFake` (external NE arrow vs. forward arrow). Carries `data-label="card-link"`.
- Pair with `CardFooter buttons="inherit"` -- the `responsive`/`full`/`compact` layout variants target buttons, not this, so `inherit` lets it render at its intrinsic `w-fit` width.
- Same footer choice as the button case: `CardButtonFake` for a button-shaped CTA, `CardLinkFake` for a text-link CTA. Both require the whole-card `href`; neither belongs on a non-link card.

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
- `size` variants: `full | lg | base | sm | thumbnail-lg | thumbnail`. Prefer one of these over `className="h-..."` — the height tokens are part of the design system's vertical rhythm. `thumbnail-lg` (128px square) and `thumbnail` (64px square) both `shrink-0` for small logo/icon placements above content.
- `fit="contain"` with a *single* `<Image>` child triggers an auto-blurred-backdrop effect: the same image is cloned, scaled, blurred, and placed behind to fill any letterboxing. If you pass two children, you lose this magic and need to provide your own backdrop.
- `zoom`: **opt-in** (off by default) -- pass `zoom` to propagate the parent `group/link` hover/focus into an image scale-up. Use it on media/thumbnail tiles where the image should react; leave it off elsewhere so the card's own hover (lift + ring/fill) isn't doubled by an image scale. There is no `zoom={false}` -- just omit it.
- Placement:
  - **Inside `CardHeader` (the default -- prefer this):** the banner insets by `--card-pad` and its `--banner-radius` corners stay concentric with the card's outer radius. Required on **link** cards (`href`): the inset keeps the hover state clear of the image and the corner radii aligned.
  - As a bare direct child of `Card` (no `CardHeader`): the banner extends flush to the card's edges. Only safe for a true edge-to-edge image, and pair it with `Card size="xs"` (`--card-pad: 0`) so the banner radius and the card's outer radius match. A bare banner on a padded size (`sm`/`md`/`base`) clips at `--banner-radius` while the card corner is `--card-pad + --banner-radius` -- a visible mismatch, and on a link card the hover treatment has no room to breathe. (See the bare-banner gotcha.)

### `CardEmoji`

```tsx
<CardHeader>
  <CardEmoji text=":rocket:" />
</CardHeader>
```

- Renders a large emoji inside a fixed-size `div` so there's no layout shift when the client-side `Emoji` component hydrates.
- Typically lives in `CardHeader`. If you don't use a header, you can drop it directly in `CardContent`, but the header placement is the standard.
- **Prefer `CardIconContainer` with a Lucide icon for new/refactored cards** (see below). We're migrating card glyphs from emoji to Lucide over time — reach for `CardEmoji` only when matching existing emoji-based cards or when no suitable icon exists.

### `CardIconContainer`

```tsx
import { Sparkles } from "lucide-react"

<CardHeader>
  <CardIconContainer>
    <Sparkles />
  </CardIconContainer>
</CardHeader>
```

- The Lucide counterpart to `CardEmoji`: wraps any icon child, forces it to `size-12` (48px) via `*:size-12`, and tints it `text-primary`. Don't set width/height on the icon yourself — the container handles sizing.
- Same placement rules as `CardEmoji` (lives in `CardHeader` by convention).
- **Preferred for new and refactored cards.** Part of the gradual emoji-to-Lucide migration — favor a Lucide icon over an emoji glyph wherever a fitting icon is available.
- Via `MarkdownCard`, pass the `icon` prop instead of `emoji` (they're mutually exclusive): `<MarkdownCard icon={<Sparkles />} ... />`.

### `CardTitle`

```tsx
<CardTitle>Default <h3>, text-2xl</CardTitle>
<CardTitle size="sm">Smaller (text-lg)</CardTitle>
<CardTitle size="lg">Larger (text-3xl)</CardTitle>
<CardTitle asChild><h2>Use h2 when nested inside the doc outline requires it</h2></CardTitle>
```

- Renders as `<h3>` by default. **You MUST use `asChild` and pass your own semantic tag** when the card sits before the first `<h2>` (or anywhere h3 would break the heading outline). Heading order is an a11y requirement, not a stylistic choice.
- `size`: `sm (text-lg) | lg (text-3xl)`; omit for the default `text-2xl`. This controls **size only** -- the weight is always `font-black`, inherited from the base heading style. There is no per-weight variant anymore (the old `variant="semibold|bold|black"` API was replaced when headings were standardized on `font-black`).
- `spacing` controls the gap between the title and the immediately-following `CardParagraph` (uses `:has(+...)`):
  - `quarter` (default): one-quarter of `--content-space`. Tight binding between title and lead paragraph.
  - `none`: zero gap.
  - `inherit`: full `--content-space` (treats it like any other content element).
- Default text color is `text-body` (re-asserted against CardContent's `text-body-medium` default).
- The title does **not** underline on card hover -- the card's outline/fill + lift (+ banner zoom, cursor) carry the "clickable" signal. (A `CardLinkFake` *does* underline on hover, since it mirrors a real text link.)

### `CardParagraph`

```tsx
<CardParagraph>Standard body text in a card.</CardParagraph>
<CardParagraph size="sm">Smaller (14px) variant for dense cards.</CardParagraph>
```

- Renders a `<p data-label="card-paragraph">`.
- Defaults to 16px (`text-body-medium` via the Content default). `size="sm"` gives 14px. Avoid other text sizes; if you need something genuinely different, that's a discussion for design.
- Spacing between paragraphs is owned by `CardContent`'s `space-y-(--content-space)`.
- The first `CardParagraph` *immediately following* a `CardTitle` gets the title-spacing variant treatment (see `CardTitle` above).
- `textColor="body"` re-asserts the base body color (rare; the default `text-body-medium` is correct for most prose).
- `variant`: `uppercase | subtitle` for eyebrow/subtitle treatments.

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
<Card size="lg">
  <CardContent spacing="sm">
    <CardTitle>Title</CardTitle>
    <CardParagraph>Description</CardParagraph>
  </CardContent>
</Card>
```

## Pre-Merge Checklist

- [ ] Imports from `@/components/ui/card` (NOT `@/components/MarkdownCard` — that's the MDX shortcode wrapper)
- [ ] If linkable, uses `Card href="..."` (not a wrapping `<a>`)
- [ ] An `href` `Card` gets the outline/fill and lift automatically -- don't pass `hoverLift` on a link card. Single CTA -> `href` + `CardButtonFake` (or `CardLinkFake` for a text-link CTA), never a real `ButtonLink`/`Button`/`LinkWithArrow` (nested anchor). Non-link action cards -> no `href`, real `ButtonLink`s (two+) or an `InlineLink`, plus `hoverLift` by hand
- [ ] No `className` on `Card`/parts that adjusts padding, background, spacing, border-radius, or text color — those go through variants
- [ ] Heading is `CardTitle`; uses `asChild` if `<h3>` would break heading outline
- [ ] Description is `CardParagraph`
- [ ] Image lives in a `CardBanner`, wrapped in `CardHeader` (the default -- keeps banner radius concentric and gives link-hover room). Bare banner only for a true edge-to-edge image, paired with `size="xs"` so radii match
- [ ] If image needs containment, `fit="contain"` is used to get the auto-blur backdrop
- [ ] If you added a new variant case to `card.tsx`, story coverage is updated
- [ ] Tested in light AND dark mode
- [ ] Tested with verbose-language (German/Spanish) text — no overflow
- [ ] Tested with RTL locale (Arabic) — nothing breaks
