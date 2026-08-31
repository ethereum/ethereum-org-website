# Component Catalog

Reference for the components in `src/components/ui/` and notable feature components. For the "which import wins" decision tree, see `canonical-imports.md`. For confusion landmines, see `gotchas.md`.

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

### `ArrowNext` / `ArrowPrev` (`ui/arrow`)

```tsx
import { ArrowNext, ArrowPrev } from "@/components/ui/arrow"
```

RTL-aware Lucide `ArrowRight`/`ArrowLeft` wrappers (bake in `rtl:-scale-x-100`). Use for directional "forward/back" arrows -- `LinkWithArrow` and `CardLinkFake`'s `withForwardArrow` both render `ArrowNext`. Chevron equivalents: `ChevronNext`/`ChevronPrev` from `@/components/Chevron`.

## Cards & Containers

### `Card` (+ parts)

```tsx
import {
  Card,
  CardBanner,
  CardButtonFake,
  CardContent,
  CardEmoji,
  CardFooter,
  CardHeader,
  CardIconContainer,
  CardLinkFake,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
```

The canonical card primitive, driven by CSS variables set on `Card` (`--card-pad`, `--content-space`, `--banner-radius`). **Pick variants, don't reach for `className`** -- a padding/background/radius/text override via `className` means the variant matrix is missing a case. The full system (anatomy, interaction rules, every part's variants, checklist) lives in **`card-walkthrough.md`** -- read that for any card work. Quick facts:

- `variant`: `base` (default grey) | `nested` (for colored sections) | `ghost` (no bg) | `header-bar` (highlight header row, bordered card).
- `size`: `lg | base (default) | md | sm | xs` -- controls `--card-pad` / `--content-space`; `xs` = zero padding for edge-to-edge banners.
- `href` makes the whole card the link and auto-applies the hover affordance + lift; the footer CTA is then `CardButtonFake`/`CardLinkFake`, never a real `Button`/`ButtonLink` (nested-anchor invalid HTML).
- Card is always vertical (`flex flex-col`); there is no `orientation` variant.
- `CardIconContainer` (Lucide icon) is preferred over `CardEmoji` for new/refactored cards.

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
- Applies `gap-4`. `className` is spread last, so override the gap (or `--grid-item-min` / `--grid-repeat`) per call site only when genuinely needed. **If you override the gap, mirror it in `--grid-gap`** (e.g. `gap-x-8 [--grid-gap:--spacing(8)]`): the `grid-cols-auto-*` fold math assumes the gutter via `var(--grid-gap, 1rem)`, and with a wider real gap the even-share term is computed against the wrong gutter -- a second column may **never** form.

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

> There is no `Textarea` -- it was removed with zero consumers. Re-add the stock shadcn primitive if a multi-line input is ever needed.

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
- `AlertEmoji` -- **deprecated**: emoji glyph aligned to start. Alert glyphs are moving to Lucide icons; use `AlertIcon` for new content
- `AlertIcon` -- Lucide-style SVG slot (inherits variant's text color). Child SVG is 24px; `size="lg"` (40px) and `size="xl"` (48px) scale it up -- use the variant, not a `[&>svg]:size-*` override
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

**Migration**: `BannerNotification` and `BugBountyBanner` no longer exist -- replace any lingering import with `<Alert variant="banner">` (recipe in `cleanup-playbook.md`).

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

> The old `@/components/ui/divider` file is gone -- both `HR` and `Divider` live in `@/components/ui/hr`. Siblings: `Blockquote` (`@/components/ui/blockquote`) and `KBD` (`@/components/ui/kbd`), both default exports wired as the `blockquote` / `kbd` MDX elements.

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

`--edge-spacing` defaults to `1rem` (`md:2rem`) so it tracks `px-page`. On the standard model — `px-page` on `<main>`, page content sitting in that padded column — the negative-margin breakout lands flush with the page padding and needs **no override**. Don't reach for a flat `[--edge-spacing:Nrem]`: if it exceeds the surrounding horizontal padding at any breakpoint (e.g. `2rem` while mobile `px-page` is `1rem`), the breakout overshoots and the page scrolls horizontally. Override it only for a genuine exception where the surrounding padding really differs from `px-page`.

### `Swiper` (deprecation track)

```tsx
// DON'T use for new work:
import { Swiper, ... } from "@/components/ui/swiper"
```

`"use client"`, wraps swiper.js. On the deprecation track. Migrate existing consumers to `EdgeScrollContainer`.

**i18n requirement:** `Swiper` binds `useTranslations("component-swiper")` for its a11y slide announcements. Every page that renders one must ship that namespace to the client — register the route in `src/lib/utils/translations.ts` (`EXACT_PATH_ADDITIONAL_NAMESPACES` / `PREFIX_PATH_ADDITIONAL_NAMESPACES`) or add `"component-swiper"` to the page's `pick()` for its `I18nProvider`. Missing it means screen readers announce raw key tails (`swiper-next-slide`). Currently registered: `/` (hand-pick), `/developers/` (scoped providers), `/start/`, `/10years/`, `/apps/`.

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

> Has the lone remaining `value.toLocaleString()` in `src/` (in its tooltip formatter). Replace with `numberFormat()` when touching this file.

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

The `Banners/` subdirectory is gone (`BannerNotification` -> `<Alert variant="banner">`). The remaining `*Banner*`-named files at the root of `src/components/`:

- `EnvWarningBanner` -- exemplary thin wrap of `<Alert variant="warning">`
- `TranslationBanner` -- floating Arabic/Urdu translation feedback CTA; still a raw `<aside>` (deprecation candidate -- migrate to `<Alert variant="banner">` next time it's touched)
- The legacy root-level `Callout*` files were unified into `@/components/ui/callout` (see `callout-walkthrough.md`); unrelated to the top-of-page ribbon.

> There is no `Faq` component -- for an expandable Q&A list, reach for `ExpandableCard` (`@/components/ExpandableCard`).

### `MdComponents`

```tsx
// Used internally by next-mdx-remote, not imported in app code:
import { MdComponents } from "@/components/MdComponents"
```

The shortcode registry for markdown content. To add a markdown shortcode, add the component to `MdComponents`.

### `MarkdownVideo` (markdown clips)

Renders `![](./x.mp4)` in markdown content (reached via `MarkdownImage`; not imported in app code) — the modern GIF replacement: silent, looping, plays only while on-screen, no autoplay under `prefers-reduced-motion`.

**Playback controls are always visible** so any user can stop the looping motion (WCAG 2.2.2) — a clip that loops past 5s needs a pause affordance, not one gated on `prefers-reduced-motion`. A user pause is latched in a ref and suppresses the in-view autoplay branch, otherwise scrolling away and back restarts the clip they just stopped. PiP/cast/download are turned off (`controlsList`, `disablePictureInPicture`, `disableRemotePlayback`) to keep the control surface minimal on decorative clips. Keep `preload="metadata"`: these clips are offscreen-gated by design, and `auto` downloads every clip on the page in full at load.

**Sizing convention**: an optional `#WxH` fragment on the markdown src declares the clip's intrinsic dimensions — `![](./demo.mp4#800x400)` — and sizes the box to the clip's own aspect ratio (landscape fills the content width; taller-than-wide is height-capped). Without it, a fixed 16:9 box (9:16 via the `-portrait` filename suffix) letterboxes the clip with `object-contain`.

Use the fragment for any off-ratio clip — screen captures usually are. It's presentation metadata only: browsers strip fragments before requesting, so the asset URL stays canonical (one CDN/browser cache entry, no file renames) and references without it — e.g. not-yet-repropagated translations — still play in the default box. **Never rename a video asset to encode metadata.** Implementation notes: `rehypeImg` and `MarkdownImage` strip the fragment before extension checks (an mp4 falling into the image path makes `image-size` throw at build); `MarkdownVideo` sets `width`/`height` attributes plus explicit CSS `aspect-ratio` because the attribute→ratio mapping is unreliable on `<video>` and `h-auto` overrides the height attribute — together they reserve the box before video metadata loads (no CLS).

## Components NOT to Use

### Legacy / deprecated

- `@/components/PageHero` (old default export) -- the canonical `PageHero` is a named export from `@/components/Hero`.
- `@/hooks/useColorModeValue` -- Chakra leftover; use Tailwind `dark:` variant

### Removed with zero consumers (restorable from git history)

Deleted after verifying zero consumers; listed so a future search finds the removal rather than assuming the component never existed: `Faq/` (prefer `ExpandableCard`), `ui/textarea.tsx`, `CodeModal.tsx`, `GitStars.tsx`, `IntersectionObserverReveal.tsx`, `StatErrorMessage.tsx`, `UpgradeTableOfContents.tsx`, `ScrollDepthTracker.tsx`.

`src/components/AB/` looks equally orphaned but is **kept deliberately** -- zero consumers is the normal state between experiments. See `docs/ab-testing.md`.

### Markdown shortcode wrapper

- `@/components/MarkdownCard` -- backs the `<Card>` markdown shortcode (registered in `MdComponents`). Composes the `@/components/ui/card` primitives with an MDX-friendly prop shape (`emoji` _or_ `icon` (mutually exclusive; prefer a Lucide `icon`), `title`, `description`, `ctaLabel`, `href`). Importing it from app code is allowed but rare — most app-code cards should compose the primitives directly from `@/components/ui/card`.
