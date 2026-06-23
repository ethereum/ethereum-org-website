# Canonical Imports

When two or more imports look like they could solve the same problem, this document tells you which one is correct. Read it cold before reaching for any UI primitive.

## Cards

Three "Card" things exist. Most of the time you want the first.

### Use `@/components/ui/card`

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
```

The canonical card primitive. Composable parts. If `href` is provided, the card auto-wraps in `BaseLink` and propagates a `group/link` class so descendant text can react to card-level hover.

`CardBanner` props worth knowing:

- `background`: `"accent-a" | "accent-b" | "accent-c" | "primary" | "body" | "none"` (default `body`)
- `size`: `"full" | "lg" | "base" | "sm" | "thumbnail-lg" | "thumbnail"` (default `base`)
- `fit`: `"cover" | "contain"` (default `cover`)
- `zoom`: `true` (default) | `false` — when the parent `Card` has `href`, controls whether the image scales on hover/focus via `group/link`

When `fit="contain"` and you pass a single `<Image>` child, the banner auto-clones it as a blurred backdrop behind a sharp foreground. Pass two children and you lose this magic.

### Markdown shortcode lives in `@/components/MarkdownCard`

The `<Card>` MDX shortcode (registered in `MdComponents`) is backed by `@/components/MarkdownCard`, which composes the `ui/card` primitives with an MDX-friendly prop shape (`emoji`, `title`, `description`, `ctaLabel`, `href`). Use this wrapper if you have an existing MDX-style API to preserve. For new app code, compose the `ui/card` primitives directly — they're more flexible.

### Domain-specific cards exist (`AppCard`, `EthPriceCard`, etc.)

These are feature components. Don't reuse them outside their domain.

### Use `@/components/ui/grid` to lay out a collection of cards/items

```tsx
import { Grid } from "@/components/ui/grid"
```

`<Grid columns={N}>` instead of hand-rolling `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`. Renders at most `columns` columns and folds down responsively; tune the per-item min width with `size` and switch `auto-fill`→`auto-fit` with `fit`. See `components.md` for the variant matrix. (The raw `grid-cols-auto-*` utility backs it; the older `grid-cols-fill-*` / `grid-cols-fit-*` classes are legacy.)

Exception: a _fixed_ set of **4 cards** that must reflow **symmetrically** (`4 → 2×2 → 1`, never a lone 3-up row) wants `<Grid balanced={4}>` (a fixed breakpoint ladder that overrides `columns`; `balanced={2}` exists for a fixed pair) or an explicit breakpoint grid — auto-fill would introduce an orphan intermediate row.

## Modal / Dialog

Three import paths. Pick by use case.

### Default: `Modal` from `@/components/ui/dialog-modal`

```tsx
import Modal from "@/components/ui/dialog-modal"
```

The high-level convenience: title + content + optional action button, with `size: "md" | "lg" | "xl"` and `variant: "simulator" | "unstyled"`. This is what you want 90% of the time.

```tsx
<Modal
  title="Are you sure?"
  actionButton={{ label: "Confirm", onClick: handleConfirm }}
  isOpen={isOpen}
  setIsOpen={setIsOpen}
>
  Body content here.
</Modal>
```

### When you need fine-grained Radix control: `@/components/ui/dialog`

```tsx
import { Dialog, DialogContent, DialogTrigger, ... } from "@/components/ui/dialog"
```

The vanilla shadcn-style primitive. Use only when you need direct Radix Dialog control (rare; e.g., inside `Command`).

### Landmine: re-exports from `dialog-modal`

`@/components/ui/dialog-modal` also exports named `Dialog`, `DialogContent`, etc. -- but those are the **`tv`-styled** versions, not the same as the ones from `@/components/ui/dialog`. Different file, different styles. **Pick one source and stick with it within a feature.**

## Tooltip

Two imports. Almost always the first one is correct.

### Use `@/components/Tooltip`

```tsx
import Tooltip from "@/components/Tooltip"
```

Mobile-aware (falls back from hover-only Radix Tooltip to click-driven Popover on touch devices), Matomo-tracked, scroll-close behavior. This is the one you want.

### Avoid `@/components/ui/tooltip`

```tsx
// Avoid unless you have a specific reason:
import { Tooltip, TooltipContent } from "@/components/ui/tooltip"
```

The bare Radix primitive. Only used inside `@/components/Tooltip` itself.

## Buttons

Single source of truth. Don't roll your own.

```tsx
import { Button, ButtonLink } from "@/components/ui/buttons/Button"
```

- `Button` -- `<button>`-like
- `ButtonLink` -- `<a>`-like, handles internal/external/file detection via `BaseLink`

Variants: `solid | outline | ghost | link` (default `solid`). Sizes: `lg | md | sm` (default `md`).

`isSecondary` flips text/border to body color -- but only applies to `outline` and `ghost`. Setting `isSecondary` on a `solid` or `link` button does nothing (silent no-op).

## Anchors / Links

```tsx
// Default export -- in-prose links with visited styling:
import InlineLink from "@/components/ui/Link"

// Named exports for specific uses:
import {
  BaseLink, // No visited styling. Use inside LinkOverlay or as ButtonLink's asChild slot.
  LinkWithArrow, // Explicit CTA arrow. Reserved for unique cases where the arrow is part of the design intent.
  ExternalLinkIcon, // Just the icon component (rare).
} from "@/components/ui/Link"
```

`InlineLink` / `BaseLink` auto-detect external URLs (opens new tab + screen-reader hint), `mailto:`, files (`.pdf` etc.), hashes, and locale-aware routing. **External-link styling is handled by the primitive itself -- you don't need `LinkWithArrow` to indicate externality.** Reach for `LinkWithArrow` only when the arrow is a deliberate CTA cue on an internal link.

### Do NOT use raw `<a>` tags

A raw `<a>` bypasses external-link safety, RTL flipping, locale routing, and Matomo tracking. Effectively never the right choice in this codebase.

### Whole-card-clickable: `LinkBox` + `LinkOverlay`

```tsx
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
```

For when an entire card should be clickable but contains other interactive elements (you can't nest `<a>` inside `<a>`).

```tsx
<LinkBox>
  <h3>
    <LinkOverlay asChild>
      <BaseLink href="/x">Title</BaseLink>
    </LinkOverlay>
  </h3>
  <p>
    Other content; the LinkOverlay's :before pseudo covers the whole LinkBox.
  </p>
</LinkBox>
```

If you use `LinkBox` without `LinkOverlay` somewhere inside, the whole-card-click pattern won't work.

## Heroes

```tsx
import { HomeHero, HubHero, MdxHero, PageHero } from "@/components/Hero"
```

| Hero | Use case |
|---|---|
| `PageHero` | The workhorse for most internal pages. 2-column with image, breadcrumb (or `header` eyebrow), and up to two buttons -- **or** text-only when you omit `heroImg`. |
| `HubHero` | Full-bleed hero image with overlay text card. |
| `HomeHero` | Homepage only. Async server component. |
| `MdxHero` | Minimal: breadcrumb + h1. For long-form articles. |

### `PageHero` props

`PageHero` is a **named** export from `@/components/Hero` and takes discrete props (not a single `content` object):

```tsx
import { PageHero } from "@/components/Hero"
```

Pass `breadcrumbs` **or** `header` (mutually exclusive eyebrow slot), plus `heroImg` (optional -- omit for text-only), `title`, `description`, `buttons` (up to two), and `variant`.

## Banners / Callouts / Alerts

### Inline notice AND top-of-page ribbon: `Alert`

```tsx
import { Alert, AlertContent, AlertDescription } from "@/components/ui/alert"
```

One primitive covers both shapes via `variant`:

| Use case                                         | Variant                                     |
| ------------------------------------------------ | ------------------------------------------- |
| In-prose notice                                  | `info` `error` `success` `warning` `update` |
| Full-bleed top-of-page ribbon (white-on-primary) | `banner`                                    |

```tsx
// Top-of-page ribbon:
<Alert variant="banner">{t("page-roadmap-banner-notification")}</Alert>

// In-content warning:
<Alert variant="warning">
  <AlertContent>
    <AlertDescription>{t("warning-text")}</AlertDescription>
  </AlertContent>
</Alert>
```

`variant="banner"` renders `<aside>` (tangential to main content); other variants render `<div>`. No ARIA role by default -- pass `role="status"` for polite dynamic announcements (e.g. filter result counts) or `role="alert"` for genuine assertive errors. See `references/components.md` for the full parts inventory.

### Do NOT import `BannerNotification`

```tsx
// DON'T -- file deleted May 2026:
import BannerNotification from "@/components/Banners/BannerNotification"
```

The `Banners/` subdirectory is gone. Use `<Alert variant="banner">` for top-of-page ribbons.

### Card-shaped in-content callouts: `Callout`

```tsx
import Callout, {
  CalloutBanner,
  CalloutButtons,
  CalloutContent,
  CalloutDescription,
  CalloutRoot,
  CalloutTitle,
} from "@/components/ui/callout"
```

Server-renderable, takes literal `title` / `description` strings (call site resolves intl). Optional `image` banner (overhangs the gradient card); omit for a content-only callout. `variant`: `base` (default) | `sm`. Children render as buttons via `CalloutButtons`.

```tsx
<Callout image={someImage} alt="..." title={t("...")} description={t("...")}>
  <ButtonLink href="/...">{t("...")}</ButtonLink>
</Callout>
```

The default export covers the common shape. The named primitives are available for custom composition (interleaving children between parts, applying classNames on individual slots). The legacy `Callout` / `CalloutSSR` / `CalloutBanner` / `CalloutBannerSSR` files at the root of `src/components/` were removed during the unification — do not reintroduce.

Side-by-side equalization is automatic: when two or more `Callout`s share a parent at `md+` viewport, banners pin to a 16rem min-height and buttons bottom-align across cards. See `callout-walkthrough.md`.

## Tabs / Tab Navigation

Two different shapes. Pick by what changes when the user clicks.

### When clicking a tab swaps panels: `Tabs`

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
```

Radix-driven tabs that swap content panels.

### When clicking navigates within a long page: `TabNav`

```tsx
import TabNav from "@/components/ui/TabNav"
```

URL-fragment-driven section navigation. Uses `useActiveHash` to highlight the current section based on scroll position. Different shape -- accepts a `sections` array.

## Layout primitives

```tsx
import { Center, Flex, HStack, Stack, VStack } from "@/components/ui/flex"
```

`Stack` (default `flex-col gap-2`) supports a `separator` prop that clones a separator element between children. Use these instead of writing `flex flex-col gap-2` everywhere.

## Avatars

```tsx
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
} from "@/components/ui/avatar"
```

Don't inline a `<div className="rounded-full">` for a user avatar -- use `AvatarFallback`.

## Tags

```tsx
import { Tag, TagButton } from "@/components/ui/tag"
import TagFilter from "@/components/ui/tag-filter"
```

Big variant matrix: `status` × `variant` × `size`. See `references/components.md` for the full set. `TagFilter` is the controlled multi-select chip filter for tag-filtered lists -- prefer it over a hand-rolled `TagButton` row.

## Tables

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table"
```

Variants: `simple | minimal | minimal-striped | simple-striped | product | highlight-first-column`.

For markdown-rendered tables, `mdxTableComponents` shims the same primitive.

Domain-specific tables (`DataTable`, `Layer2NetworksTable`, `FindWalletProductTable`, `StablecoinsTable`, `ProductTable`) wrap `ui/table` for specific data shapes. Use them only if the data shape matches.

## i18n & Formatting Utilities

For locale-aware number/date formatting, RTL helpers, and directional-icon imports, see `references/i18n-rtl.md`. Quick pointers:

- `numberFormat` / `dateTimeFormat` from `@/lib/utils/numbers` and `@/lib/utils/date`
- `useRtlFlip` from `@/hooks/useRtlFlip`
- `ChevronNext` / `ChevronPrev` from `@/components/Chevron` (RTL-aware)

## Markdown Content

For MDX/Markdown files in `public/content/`, the shortcodes are wired up in `@/components/MdComponents`. Don't invent new shortcodes -- if the markdown needs a new component, add it to `MdComponents` so the shortcode is consistent with the rest of the content.
