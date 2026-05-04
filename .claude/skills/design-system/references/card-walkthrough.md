# Walkthrough: "I Need a Card"

A worked example of using the design system correctly when adding card-shaped UI.

## Step 1: Identify what you actually need

Before reaching for a primitive, name the shape:

- **A linkable summary card** with title, description, optional image -> `Card`
- **A whole-card-clickable wrapper for non-card content** (multiple interactive elements inside) -> `LinkBox` + `LinkOverlay`
- **A skeleton loading placeholder** -> `SkeletonCard`
- **An app/product listing** -> existing domain-specific component (e.g., `AppCard`, `Layer2ProductCard`) -- only if data shape matches
- **Markdown shortcode** -- `MdComponents` already wires this up; just use `<Card>` in markdown

## Step 2: Compose `Card`

For a typical linkable card with a banner image:

```tsx
import { Card, CardBanner, CardContent, CardTitle, CardParagraph } from "@/components/ui/card"
import Image from "next/image"

<Card href="/articles/proof-of-stake">
  <CardBanner background="accent-a">
    <Image src={posIllustration} alt="Stylized validators staking ETH" />
  </CardBanner>
  <CardContent>
    <CardTitle>Proof of Stake</CardTitle>
    <CardParagraph>How Ethereum secures the network.</CardParagraph>
  </CardContent>
</Card>
```

### What's happening

- `Card` with `href` automatically wraps in `BaseLink`, gets a `group/link` class for hover propagation, and handles internal/external/file detection.
- `CardBanner` `background="accent-a"` uses the `--accent-a` semantic token (light/dark aware).
- `CardContent`, `CardTitle`, `CardParagraph` provide the typographic rhythm without inline class chains.

## Step 3: When the shape doesn't quite match

If your card needs a layout `Card` doesn't directly support, the answer is *almost always* "add a variant to `Card`," not "create a new component file."

### Example: horizontal layout

You need a card with the image to the left of the content.

**Wrong**: Make `HorizontalCard.tsx` with `flex items-center gap-8`.

**Right**: Add `layout="horizontal"` variant to `Card`.

```tsx
// In ui/card.tsx, add to the variants:
const cardVariants = tv({
  base: "rounded-2xl text-body",
  variants: {
    layout: {
      vertical: "flex flex-col",
      horizontal: "flex flex-row items-center gap-8",
    },
  },
  defaultVariants: { layout: "vertical" },
})

// Then use:
<Card href="..." layout="horizontal">
  <CardBanner size="thumbnail">...</CardBanner>
  <CardContent>...</CardContent>
</Card>
```

See `references/variant-vs-new.md` for the full pattern.

## Step 4: When you genuinely need a domain-specific card

If you're building UI that:
- Has its own data fetching shape
- Composes Card + Tag + Avatar + specific layout for a recurring product/wallet/network listing
- Has its own loading/error states

...then a wrapper component makes sense. Look at `Layer2ProductCard` or `AppCard` for the pattern: they compose `Card` underneath and add domain-specific structure on top. Don't reinvent the card shell.

## What NOT to Do

```tsx
// DON'T: Inline the card shell
<div className="flex flex-col gap-3 rounded-3xl border border-[rgba(159,43,212,0.11)] bg-card-gradient-secondary p-6 hover:bg-card-gradient-secondary-hover hover:shadow-lg">
  <h3 className="text-2xl font-bold">Title</h3>
  <p className="text-body-medium">Description</p>
</div>
```

This recreates `Card` poorly:
- Hex border instead of token (`border-primary/10` would work)
- Manual padding/spacing
- Manually-styled headings instead of `CardTitle`
- No href handling
- No hover-group propagation
- Not consistent with other cards on the site

```tsx
// DO: Use Card with the right variant
<Card href="..." decoration="purple-gradient">  {/* once the variant exists */}
  <CardContent>
    <CardTitle>Title</CardTitle>
    <CardParagraph>Description</CardParagraph>
  </CardContent>
</Card>
```

## Pre-Merge Checklist for a Card

- [ ] Imports `Card` from `@/components/ui/card` (NOT `@/components/Card`)
- [ ] If linkable, uses `Card href="..."` instead of wrapping in a separate `<a>`
- [ ] No raw color hex values (use `border-primary/10`, `bg-accent-a`, etc.)
- [ ] Heading is `CardTitle` (NOT a manually-styled `<div>` or `<h3>`)
- [ ] Description is `CardParagraph` (NOT `<p className="text-body-medium">`)
- [ ] Image inside `CardBanner` (NOT a sibling of `Card`)
- [ ] If image needs containment, uses `<CardBanner fit="contain">` to get the auto-blur backdrop
- [ ] Story exists (`*.stories.tsx`) for any new variant added
- [ ] Tested in light AND dark mode (Storybook + Chromatic)
- [ ] Tested with verbose-language (German/Spanish) text to verify no overflow
- [ ] Tested with RTL locale (Arabic) -- nothing breaks
