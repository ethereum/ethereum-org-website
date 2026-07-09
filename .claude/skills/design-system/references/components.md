# Component Catalog

Reference for the components in `src/components/ui/` and notable feature components. For the "which import wins" decision tree, see `canonical-imports.md`. For confusion landmines, see `gotchas.md`.

> **STATUS**: This document is the skeleton. Sections marked TODO need their canonical-usage examples filled in during the next pass.

## Conventions

Each entry has:

- **Import path**
- **What it's for** (one-line use case)
- **Canonical usage** (shortest valid invocation)
- **Notable props/variants**
- **Gotchas worth knowing**

## Buttons & Links

### `Button` / `ButtonLink`

```tsx
import { Button, ButtonLink } from "@/components/ui/buttons/Button"
```

The canonical clickable. `Button` for `<button>`-class actions; `ButtonLink` for `<a>`-class navigation (handles internal/external/file detection via `BaseLink`).

```tsx
<Button>Click me</Button>
<ButtonLink href="/about">About</ButtonLink>
```

**Variants**: `solid | outline | ghost | link` (default `solid`)
**Sizes**: `lg | md | sm` (default `md`)
**Other props**: `isSecondary` (flips text/border to body color; _only applies to `outline`/`ghost`_), `asChild` (Radix Slot), `toId` (smooth-scroll to element), `customEventOptions` (Matomo override).

`"use client"` because of click tracking and `scrollIntoView`.

### `BaseLink` / `InlineLink` / `LinkWithArrow`

```tsx
import InlineLink, { BaseLink, LinkWithArrow } from "@/components/ui/Link"
```

ALL anchor tags. Auto-detects external (new tab + sr-only "(opens in new tab)"), mailto, files (`.pdf`), hashes, and locale-aware routing.

| Export                 | When to use                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| `InlineLink` (default) | In-prose links (has `visited:` styling)                                                      |
| `BaseLink`             | Inside `LinkOverlay`, as `ButtonLink` `asChild` slot, or when `visited:` styling is unwanted |
| `LinkWithArrow`        | CTA arrow links, RTL-flip-aware                                                              |

`"use client"` because of `usePathname` and tracking.

## Cards & Containers

### `Card` (+ parts)

```tsx
import {
  Card,
  CardBanner,
  CardContent,
  CardEmoji,
  CardFooter,
  CardHeader,
  CardIconContainer,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
```

The canonical card primitive. **Driven by CSS variables set on `Card`** (`--card-pad`, `--content-space`, `--banner-radius`) so children respond automatically when you change a parent variant. `Card` with `href` automatically wraps in `BaseLink` and adds a `group/link` class so descendants can react to card-level hover/focus.

**Core principle**: pick variants, don't reach for `className`. If you're tempted to override padding, spacing, background, border-radius, or text color via `className`, the variant matrix is probably missing a case — add the variant in `card.tsx` instead. See `card-walkthrough.md` for the full guide.

```tsx
<Card href="/x" variant="base" size="base">
  <CardHeader>
    <CardBanner background="accent-a">
      <Image src="..." alt="..." />
    </CardBanner>
  </CardHeader>
  <CardContent>
    <CardTitle>Title</CardTitle>
    <CardParagraph>Description</CardParagraph>
  </CardContent>
  <CardFooter>
    <ButtonLink href="...">CTA</ButtonLink>
  </CardFooter>
</Card>
```

**`Card` variants**:

- `variant`: `base` (default, `bg-background-highlight` grey) | `nested` (`bg-background`, use when inside a colored section) | `ghost` (no bg; auto-widens `--banner-radius` for edge-to-edge banners) | `header-bar` (highlight only on the header, bordered card, header laid out as an icon+text row with bottom border — all baked in, just drop a `CardHeader` inside).
- `size`: `lg | base (default) | md | sm | xs`. Controls `--card-pad` (between/around parts) and `--content-space` (within `CardContent`). `xs` = zero padding for edge-to-edge banner imagery.
- `href`: pass to wrap in `BaseLink` and get whole-card-clickable behavior with `group/link` propagation.
- Card is always vertical (`flex flex-col`); there is no `orientation` variant.

**`CardHeader`**: no own variants. The parent `Card variant="header-bar"` applies the row layout / bottom border to descendant headers automatically.

**`CardContent` variants**:

- `spacing` (optional override): `lg | md | sm | xs`. Replaces `--content-space` locally when the body needs a different rhythm from the card-level `size`. Omit to inherit.
- Expands to fill height (`flex-1`) so `CardFooter` pushes to the bottom and footers align across cards of varying content.
- Default text color is `text-body-medium`; `CardTitle` and `<strong>` re-assert `text-body`. Don't set per-paragraph colors.

**`CardFooter` variants**:

- `buttons`: `full (default)` stretches buttons/ButtonLinks to full width with centered text | `compact` sizes them to fit | `inherit` opts out so children render at intrinsic width.

**`CardBanner` variants**:

- `background`: `body (default)` | `accent-a` | `accent-b` | `accent-c` | `primary` | `none`. `none` only when the image won't cover the full rectangle.
- `size`: `full | lg | base (default) | sm | thumbnail-lg | thumbnail`. Use these instead of `className="h-..."` to stay on-rhythm. `thumbnail-lg` is a 128px square; `thumbnail` is 64px — both `shrink-0` for small logo/icon placements.
- `fit`: `cover (default) | contain`. With `fit="contain"` and a single `<Image>` child, the banner auto-clones the image as a blurred backdrop. Two children breaks the magic.
- `zoom`: `true (default) | false`. Controls hover zoom propagation from a parent `group/link`.
- Placement: inside `CardHeader` for padded; as a direct child of `Card` (pair with `Card size="xs"` or `variant="ghost"`) for edge-to-edge.

**`CardTitle` variants**:

- `variant`: `semibold | bold (default) | black`.
- `spacing` (gap before a following `CardParagraph` only): `quarter (default) | none | inherit`. Uses `:has(+...)` selector.
- **`asChild`**: required when `<h3>` would break the document's heading outline. Pass your own semantic tag inside.

**`CardParagraph` variants**:

- `size`: omit (16px / `text-body-medium`) | `sm` (14px). Avoid other sizes.
- `variant`: `uppercase | subtitle`.
- `textColor="body"`: re-assert base body color (rare; inherits correctly by default).

**`CardEmoji`**: wraps `<Emoji text=":rocket:" />` in a fixed-size `div` to prevent layout shift on client-side hydration. Typically lives in `CardHeader`.

**`CardIconContainer`**: Lucide counterpart to `CardEmoji` — wraps an icon child, forces it to `size-12` (48px), and tints it `text-primary`. **Preferred over `CardEmoji` for new/refactored cards** as part of the gradual emoji-to-Lucide migration; reach for an emoji only to match existing emoji cards or when no fitting icon exists.

### `Grid`

```tsx
import { Grid } from "@/components/ui/grid"
```

Responsive grid for laying out a collection of items (cards, tiles, badges). Renders **at most `columns`** columns at full width and folds to fewer as the viewport narrows -- items shrink to a min width, then a column drops. **Use this instead of hand-rolling `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`** or reaching for the raw `grid-cols-auto-*` utility — for **variable-length collections that fold one column at a time**.

**When NOT to use the default (auto-fill) mode**: a _fixed, known_ set that must reflow **symmetrically** — e.g. exactly 4 cards that go `4 → 2×2 → 1` and should **never** show a lone 3-up row. Auto-fill folds `4 → 3 → 2 → 1`, so it introduces that orphan intermediate. For those, use the **`balanced`** variant (below), or keep an explicit breakpoint grid (`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4`).

```tsx
<Grid columns={3}>
  {items.map((item) => (
    <Card key={item.id} href={item.href}>
      ...
    </Card>
  ))}
</Grid>
```

**`Grid` variants**:

- `columns`: `2`–`12` (default `4`). Max column count at full width; maps to a static `grid-cols-auto-N` class.
- `size`: `small (7rem) | narrow (12rem) | base (18rem, default) | wide (22rem) | wider (26rem)`. The **min item width** (`--grid-item-min`) — the floor an item shrinks to before a column drops, and so the fold-aggressiveness lever. Pick by item shape: `small` for badges, `base` for standard content cards, `wide`/`wider` for horizontal items like callouts. Larger sizes wrap sooner; keep `columns` small enough that N items of the chosen width fit (min ≤ container/N).
- `fit`: `boolean` (auto-fill mode only). Default keeps empty tracks (`auto-fill`); `fit` collapses them (`auto-fit`) so a partially-filled row stretches to fill the width.
- `balanced`: `2 | 4`. A fixed, deterministic **breakpoint** reflow (overrides `columns` via `!important`; `size`/`fit` inert). `balanced={4}` → `4 → 2×2 → 1`, never an orphan 3-up row (which auto-fill produces); `balanced={2}` → `2 → 1` at `md`, a breakpoint-driven alternative to `columns={2}` (which folds by content width). Both fold `1 → 2` at `md`. Use with a **fixed set** of that many items (or a multiple).
- Applies `gap-4`. `className` is spread last, so override the gap (or `--grid-item-min` / `--grid-repeat`) per call site only when genuinely needed.

### `Section`

```tsx
import { Section } from "@/components/ui/section"
```

Top-level `<section>` wrapper with scroll-margin pre-set for sticky-nav offset.

```tsx
<Section id="my-section" className="space-y-8">
  {/* content */}
</Section>
```

**Variants**: `responsiveFlex` (col -> row at md), `scrollMargin: "tabNav"` (extra scroll-mt for TabNav layouts).

**Common usage**: high-level `Section` with an `id` (for hash navigation) and a `space-y-n` class for vertical rhythm. Don't try to convert page sections into flex containers unless the layout calls for it -- vertical stacking with `space-y-*` is the dominant pattern across the site.

**Sub-components** (`SectionBanner`, `SectionContent`, `SectionHeader`, `SectionTag`): exist in the file but are only meaningfully used on the homepage. Other pages tend to compose `Section` with raw heading + content. Don't reach for the sub-components for new work without confirming the homepage pattern is what you want.

> File header has a `// TODO: Add to design system` comment -- vestigial from prior DS attempts; the component is stable, ignore the TODO.

### `Flex` / `Center` / `Stack` / `HStack` / `VStack`

```tsx
import { Center, Flex, HStack, Stack, VStack } from "@/components/ui/flex"
```

Layout primitives.

| Component | Default classes                    |
| --------- | ---------------------------------- |
| `Flex`    | `flex`                             |
| `Center`  | `flex items-center justify-center` |
| `Stack`   | `flex flex-col gap-2`              |
| `HStack`  | `flex flex-row items-center gap-2` |
| `VStack`  | `flex flex-col items-center gap-2` |

`Stack` supports a `separator` prop that clones a separator element between children:

```tsx
<Stack separator={<HR />}>{items}</Stack>
```

### `LinkBox` / `LinkOverlay`

```tsx
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
```

Whole-card-clickable without nesting `<a>` in `<a>`.

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

`LinkBox` without a `LinkOverlay` somewhere inside doesn't work.

### `EdgeScrollContainer` / `EdgeScrollItem`

```tsx
import {
  EdgeScrollContainer,
  EdgeScrollItem,
} from "@/components/ui/edge-scroll-container"
```

Preferred horizontal scroll primitive (over `Carousel` and `Swiper`). See "Horizontal scroll / carousel" section below for the full picture.

## Overlay Primitives

### `Modal` (default) / `Dialog` (named) -- `ui/dialog-modal`

```tsx
import Modal from "@/components/ui/dialog-modal"
```

Higher-level convenience for typical modal needs. `tv` slots with `size` and `variant`.

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

**`size`**: `md | lg | xl`
**`variant`**: `simulator | unstyled`

### `Dialog` -- `ui/dialog`

```tsx
import { Dialog, DialogContent, DialogTrigger, ... } from "@/components/ui/dialog"
```

Vanilla shadcn-style. Use only when you need fine-grained Radix control (rare).

### `Sheet` vs `PersistentPanel` (slide-in panels)

Both render a slide-in panel from a side. They're not interchangeable -- pick by mount semantics:

| Component         | Mount behavior                                    | Underlying primitive           | Compositional parts                                            |
| ----------------- | ------------------------------------------------- | ------------------------------ | -------------------------------------------------------------- |
| `Sheet`           | Mounts/unmounts each open                         | Radix Dialog (battle-tested)   | `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription` |
| `PersistentPanel` | Lazy-mounts on first open, then **stays mounted** | Custom (`FocusScope` directly) | None                                                           |

Use `Sheet` for ordinary side-panel UI -- the conventional choice with the better-trodden Radix Dialog underneath:

```tsx
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
```

**`side`**: `top | bottom | left | right` (default `right`). `SheetClose` wraps `Button variant="ghost" isSecondary`. `hideOverlay` prop on `SheetContent`.

Use `PersistentPanel` when content is expensive to render or when state should survive close (filter forms, big paginated lists, stateful editors):

```tsx
import { PersistentPanel } from "@/components/ui/persistent-panel"
```

`"use client"`. Lazy mount + stay mounted means the second open is instant. No header/footer/title sub-components.

> **Future**: There's an open question about consolidating these two using Radix Dialog's `forceMount` prop for the persistent case. Tracked in the cleanup tracking issue. For now, use them as documented above.

### `Popover`

```tsx
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
```

Radix Popover with Arrow. Default `align="center" sideOffset=4`. Uses `z-popover`.

### `Tooltip` (bare) -- DON'T import this directly

```tsx
// DON'T:
import { Tooltip, TooltipContent } from "@/components/ui/tooltip"
```

Bare hover-only Radix tooltip. Used only inside `@/components/Tooltip`. Use `@/components/Tooltip` instead.

#### Floating surfaces (Popover, Tooltip) -- the `popover-outline` utility + `nested`

Both `PopoverContent` and `TooltipContent` share the `popover-outline` utility (`src/styles/utilities.css`) for their border + elevation. It exists because a plain CSS `border` traces only the content box and **severs the Radix `Arrow`** (a separate SVG outside the box). `popover-outline` instead draws the 1px themed border *and* the lift as a stack of `drop-shadow()` filters, which follow the box + arrow as one shape.

- **Don't add `border`/`box-shadow` back.** Depth must stay inside the same `filter` -- a `box-shadow` halo becomes the filter's input and the border drop-shadows would trace the faded halo edge and vanish. Adjust elevation by editing the utility, not the call site.
- **No `overflow-hidden` on the content** -- it clips the Arrow.
- **Shadow color is themed** via `hsla(var(--body), var(--shadow-opacity))`; `--shadow-opacity` (`0.1` light / `0.15` dark) is set inside the utility, so in dark mode the lift is a light halo by design, not a bug.
- **`nested` prop** (both components, and `@/components/Tooltip`): swaps the surface + arrow fill from `bg-background-highlight` to the base `bg-background`. Pass it when the floating surface opens over a container that is itself `bg-background-highlight` (e.g. a wallet table row on hover) and would otherwise blend in.

### `DropdownMenu`

```tsx
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, ... } from "@/components/ui/dropdown-menu"
```

Many subparts. Note: this file currently uses several stale shadcn class names that don't resolve in this project's tokens (see `gotchas.md`).

`DropdownMenuContent` is capped to `--radix-dropdown-menu-content-available-height` and scrolls (`overflow-y-auto`) by default, so long menus never overflow off-screen on short displays -- don't hand-roll `max-h`/`overflow` on the consumer. Pass `scrollAffordance` for the up/down chevron + fade indicators (instead of a native scrollbar) when content is clipped; the affordance logic lives in `ui/dropdown-menu-scroll-area.tsx`. `ButtonDropdown` is the reference consumer.

### `Select`

```tsx
import { Select, SelectTrigger, SelectContent, ... } from "@/components/ui/select"
```

Radix Select. Same stale-shadcn-token issue as `DropdownMenu`.

### `Command`

```tsx
import { Command, ... } from "@/components/ui/command"
```

Imports from `cmdk`.

## Form Inputs

### `Input`

```tsx
import { Input } from "@/components/ui/input"
```

**Props**: `size: md | sm`, `hasError: boolean`. (Default omits `size` from `InputHTMLAttributes` to free the prop.)

### `Textarea`

```tsx
import { Textarea } from "@/components/ui/textarea"
```

Same shape as `Input`.

### `Checkbox` / `Switch`

```tsx
import Checkbox from "@/components/ui/checkbox"
import Switch from "@/components/ui/switch"
```

Both share styling via `commonControlClasses` exported from `checkbox.tsx`. Editing that constant affects both.

## Display

### `Tag`

```tsx
import { Tag, TagButton, TagsInlineText } from "@/components/ui/tag"
```

Big variant matrix.

```tsx
<Tag status="success">Live</Tag>
```

**`status`**: `normal | tag | success | error | warning | update | accent-a | accent-b | accent-c | primary | tag-green | tag-yellow | tag-red`
**`variant`**: `subtle | high-contrast | solid | outline`
**`size`**: `small | medium`

### `TagFilter`

```tsx
import TagFilter from "@/components/ui/tag-filter"
```

Controlled, presentational multi-select chip filter built on `TagButton` -- a wrapping chip row with an optional show-more/show-less expander. **Reach for this instead of hand-rolling a `TagButton` row** whenever a page filters a list by tags. Selection and match semantics (AND vs OR) live in the parent; the component only renders chips and reports toggles.

```tsx
<TagFilter
  tags={getTagCounts(items, (i) => i.tags)} // [name, count][], caller pre-sorts/filters
  value={selectedTags}
  onChange={setSelectedTags}
  defaultVisible={12} // chips before the expander; selected-but-hidden tags stay pinned-visible
/>
```

**Props**: `tags` (`[name, count][]`, rendered as-is), `value` / `onChange` (controlled), `defaultVisible` (cutoff; omit to show all), `showCount` (default `true`, formats via `numberFormat(locale)`), `className`. Pair with `getTagCounts` from `@/lib/utils/tags` to build count-descending entries from any item list.

### `Alert`

```tsx
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertTitle,
  AlertEmoji,
  AlertIcon,
  AlertCloseButton,
} from "@/components/ui/alert"
```

Notice/callout primitive. Covers both inline article callouts and the full-bleed top-of-page ribbon.

```tsx
// Inline content callout (description only):
<Alert variant="warning">
  <AlertContent>
    <AlertDescription>Heads up.</AlertDescription>
  </AlertContent>
</Alert>

// Inline content callout (bold lead-in + body):
<Alert variant="info">
  <AlertContent>
    <AlertTitle>{t("note-label")}</AlertTitle>
    <AlertDescription>
      <p>{t("note-body")}</p>
    </AlertDescription>
  </AlertContent>
</Alert>

// Top-of-page ribbon (full-bleed, white-on-primary):
<Alert variant="banner">{t("page-roadmap-banner-notification")}</Alert>
```

**`variant`**: `info | error | success | warning | update | banner`

**Element**: renders `<aside>` for `variant="banner"` (the ribbon is tangential to main content), otherwise `<div>`. There is no `size` prop -- older docs mentioned a `size: "full"` variant that never existed; full-bleed treatment now lives in `variant="banner"`.

**ARIA role**: no role applied by default. The site is primarily editorial, so error/warning/etc. variants are visual emphasis, not runtime UI state, and shouldn't announce on page load. Opt in when the alert is genuinely dynamic:

- `role="status"` -- polite live region (e.g. filter "no results" empty state)
- `role="alert"` -- assertive live region (e.g. form submission failure)

`role` is a plain pass-through HTML attribute -- no custom prop needed.

**Parts**:

- `AlertContent` -- wraps the body (flex column, takes remaining width)
- `AlertTitle` -- bold standard-font-size lead-in line for an alert. Renders `<p>` (not a heading -- changed from `<h6>` to avoid jumping heading levels in flow content); `asChild` available for `Slot`. **Use this whenever an alert needs a bold opening line** -- don't roll your own `<p><strong>...</strong></p>`.
- `AlertDescription` -- prose container for the alert body. Handles paragraph spacing internally (first `<p>` has `mt-0`, last has `mb-0`, others have `mb-4`). **Wrap body paragraphs in this** -- don't apply your own `mt-`/`mb-` classes to paragraphs inside an Alert.
- `AlertEmoji` -- emoji glyph aligned to start
- `AlertIcon` -- Lucide-style SVG slot (inherits variant's text color)
- `AlertCloseButton` -- dismiss button (`<X />`)

**Anti-pattern**: don't manually compose a bold-lead-in-plus-body shape with inline `<strong>` and margin classes:

```tsx
// DON'T:
<Alert variant="info">
  <AlertContent>
    <p className="mt-0"><strong>Some initial text</strong></p>
    <p className="mt-4">Some description text...</p>
  </AlertContent>
</Alert>

// DO:
<Alert variant="info">
  <AlertContent>
    <AlertTitle>Some initial text</AlertTitle>
    <AlertDescription>
      <p>Some description text...</p>
    </AlertDescription>
  </AlertContent>
</Alert>
```

The sub-components handle font weight, color, and paragraph spacing -- callers shouldn't be adding `mt-`/`mb-`/`font-bold` to paragraphs inside an Alert.

**Migration**: `BannerNotification` was absorbed in May 2026 -- replace any lingering `<BannerNotification shouldShow>...` with `<Alert variant="banner">...`. The standalone `BugBountyBanner` wrapper was removed in the same pass; inline `<Alert variant="banner">` at the call site.

### `Avatar`

```tsx
import {
  Avatar,
  AvatarBase,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
} from "@/components/ui/avatar"
```

Uses `tv` slots with React context. `"use client"` because of `useState(hasError)`.

### `Tabs`

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
```

Pure Radix wrapper. Same stale-shadcn-token issue as `DropdownMenu`/`Select`.

### `TabNav`

```tsx
import TabNav from "@/components/ui/TabNav"
```

Custom horizontal nav for long-page section navigation. URL-fragment-driven, uses `useActiveHash`. Different shape from `Tabs` -- accepts a `sections` array.

### `Accordion`

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
```

Custom chevron rotation, RTL `dir(rtl)` variant included.

### `Breadcrumb`

```tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
```

> Gotcha: The current-page item is rendered as `<span role="link" aria-disabled="true">` -- the `role="link"` is misleading; should arguably be a plain styled `<span>`. Aware-only; don't fix in passing.

### `Progress`

```tsx
import { Progress } from "@/components/ui/progress"
```

**`color`**: `disabled | primary`

### `ScrollArea` / `ScrollBar`

```tsx
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
```

### `Skeleton`

```tsx
import {
  Skeleton,
  SkeletonLines,
  SkeletonCard,
  SkeletonCardContent,
  SkeletonCardGrid,
} from "@/components/ui/skeleton"
```

`SkeletonCard` composes `Card` for consistency.

### `Spinner`

```tsx
import Spinner from "@/components/ui/spinner"
```

Wraps `Loader2` from Lucide.

### `HR` (and the deprecated `Divider`)

```tsx
import HR from "@/components/ui/hr" // default export
```

The canonical horizontal rule, also wired as the `hr` MDX element. Always carries `my-space-3x` vertical rhythm. Default (no props) is a plain full-width rule. Two optional axes:

- **`variant`**: `narrow` -- the short legacy purple bar (`h-1 w-1/10 bg-primary-high-contrast`). **Deprecated direction** (per design); it exists only to back the `Divider` wrapper. Don't reach for it in new work -- a plain `<HR />` is the going-forward separator.
- **`position`**: `indent` -- insets both sides by the responsive `page` padding token via `mx-page` (`--spacing-page`, the same `--page-pad` used for page gutters). Use margin (`mx-`), not padding (`px-`): a default `HR` renders its line as the top border, which spans the full border-box and ignores padding -- only margin shortens it. Only for a full-bleed `HR`; skip it when the rule already sits inside a padded section (e.g. a `px-page` `Section`), or you'll double the gutter.

```tsx
<HR />               // plain full-width rule
<HR position="indent" /> // inset on both sides by the page gutter
```

**`Divider` is deprecated** -- a thin `forwardRef` wrapper that renders `<HR variant="narrow" />`, kept only for backward compatibility and exported (named) from the same file: `import { Divider } from "@/components/ui/hr"`. Don't introduce new `Divider` usage; reach for `HR` directly. For plain section separation, a border on a following element (`border-t border-border`) is still lighter than rendering a rule.

> Moved during the MDX-primitive extraction: the old `@/components/ui/divider` file is gone -- both `HR` and `Divider` now live in `@/components/ui/hr`. Siblings `Blockquote` (`@/components/ui/blockquote`) and `KBD` (`@/components/ui/kbd`) were extracted the same way (both default exports, wired as the `blockquote` / `kbd` MDX elements).

### `Table`

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

`tv` with slots, React context.

**Variants**: `simple | minimal | minimal-striped | simple-striped | product | highlight-first-column`

The `product` variant currently has stale shadcn tokens (`hover:bg-muted/50`, `text-muted-foreground`).

### Horizontal scroll / carousel

Three components exist in this space:

| Component                                                       | Status                                                                                  |
| --------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `EdgeScrollContainer` (`@/components/ui/edge-scroll-container`) | **Preferred** for new horizontal scroll lists                                           |
| `Carousel` (`@/components/ui/carousel`)                         | Not recommended for new work; has unresolved RTL issues. Status pending team discussion |
| `Swiper` (deprecation track)                                    | Don't use for new work; on the path to removal                                          |

`EdgeScrollContainer` is a CSS-driven horizontal scroll with snap and edge mask:

```tsx
import {
  EdgeScrollContainer,
  EdgeScrollItem,
} from "@/components/ui/edge-scroll-container"
```

CSS-var driven (`--edge-spacing`, `--edge-mask-size`, `--edge-overflow-y-pad`). Mask fade only at `2xl+`.

### `Swiper` (deprecation track)

```tsx
// DON'T use for new work:
import { Swiper, ... } from "@/components/ui/swiper"
```

`"use client"`, wraps swiper.js. On the deprecation track. Migrate existing consumers to `EdgeScrollContainer`.

### `List` / `OrderedList` / `UnorderedList` / `ListItem`

```tsx
import {
  List,
  OrderedList,
  UnorderedList,
  ListItem,
} from "@/components/ui/list"
```

> `base.css` still has legacy global `ul`/`ol` styles flagged for removal. List migration is in progress.

### `TerminalTypewriter`

```tsx
import TerminalTypewriter from "@/components/ui/terminal-typewriter"
```

`"use client"`. Animated terminal-style typing.

### `TruncatedText`

```tsx
import TruncatedText from "@/components/ui/TruncatedText"
```

`"use client"`. Show-more/show-less expansion. Uses `LINE_CLAMP_CLASS_MAPPING` constant -- pass an integer line count via prop.

### `Chart`

```tsx
import { Chart, ... } from "@/components/ui/chart"
```

Recharts wrapper.

> Has the lone remaining `value.toLocaleString()` in `src/` (line 241). Replace with `numberFormat()` when touching this file.

### `Collapsible`

```tsx
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"
```

Radix Collapsible.

### `ErrorBoundary`

```tsx
import ErrorBoundary from "@/components/ui/error-boundary"
```

Class component (`getDerivedStateFromError`), integrates with `@sentry/nextjs`. `"use client"`.

## No `Heading` Primitive Exists

There's a `Heading.stories.tsx` file but it just renders raw `<h1>` through `<h6>`. The headings are styled by `base.css` element defaults. Use semantic tags directly:

```tsx
<h1>Title</h1>           // text-h1 (text-4xl lg:text-5xl) + font-black, from base.css
<h2>Subtitle</h2>        // text-h2 (text-3xl lg:text-4xl) + font-black
```

Sizing is owned by the `text-h1`-`text-h6` utilities (`src/styles/utilities.css`), which `base.css` `@apply`s to each tag. To make a non-heading element match a heading level's size, apply the utility directly (`<p className="text-h2">`) -- it carries size + line-height only, not `font-black`. Don't hand-reconstruct `text-3xl lg:text-4xl`.

For markdown-rendered content, sizing comes from `MdComponents`.

If you need specific in-page typography that isn't a heading (e.g., a big numeric stat), use `BigNumber` from `@/components/BigNumber` -- it exists.

## Notable Feature Components

### `BigNumber` -- USE FOR LARGE NUMERIC DISPLAYS

```tsx
import BigNumber from "@/components/BigNumber"
```

For prominent numeric displays (e.g., "$3000" prize amounts, statistics). Don't inline `<p className="text-4xl font-bold">N</p>`.

### Heroes -- `@/components/Hero`

```tsx
import { HomeHero, HubHero, PageHero } from "@/components/Hero"
```

See `canonical-imports.md` for selection. (The former `MdxHero` was removed -- use `PageHero` text-only with `variant="no-divider"`.)

### Banner-named components

The `Banners/` subdirectory was removed in May 2026. `BannerNotification` is now `<Alert variant="banner">`; the standalone `BugBountyBanner` wrapper was deleted (inline `<Alert variant="banner">` at call sites).

The remaining `*Banner*`-named files at the root of `src/components/` are:

- `EnvWarningBanner` -- exemplary thin wrap of `<Alert variant="warning">`
- `TranslationBanner` -- floating Arabic/Urdu translation feedback CTA; still a raw `<aside>` (deprecation candidate -- could be migrated to `<Alert variant="banner">` next time it's touched)
- (The legacy `Callout` / `CalloutBanner` / `CalloutSSR` / `CalloutBannerSSR` files at the root of `src/components/` were unified into `@/components/ui/callout` — see `canonical-imports.md` and `callout-walkthrough.md`. Unrelated to the top-of-page ribbon.)

### `Faq`

```tsx
import { Faq, FaqContent, FaqItem, FaqTrigger } from "@/components/Faq"
```

Compositional FAQ primitive. Stories exist; ready for use in pages that need an expandable Q&A list.

### `MdComponents`

```tsx
// Used internally by next-mdx-remote, not imported in app code:
import { MdComponents } from "@/components/MdComponents"
```

The shortcode registry for markdown content. To add a markdown shortcode, add the component to `MdComponents`.

## Components NOT to Use

### Legacy / deprecated

- `@/components/PageHero` (old default export) -- the canonical `PageHero` is a named export from `@/components/Hero`.
- `@/hooks/useColorModeValue` -- Chakra leftover; use Tailwind `dark:` variant

### Markdown shortcode wrapper

- `@/components/MarkdownCard` -- backs the `<Card>` markdown shortcode (registered in `MdComponents`). Composes the `@/components/ui/card` primitives with an MDX-friendly prop shape (`emoji` _or_ `icon` (mutually exclusive; prefer a Lucide `icon`), `title`, `description`, `ctaLabel`, `href`). Importing it from app code is allowed but rare — most app-code cards should compose the primitives directly from `@/components/ui/card`.
