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
**Other props**: `isSecondary` (flips text/border to body color; *only applies to `outline`/`ghost`*), `asChild` (Radix Slot), `toId` (smooth-scroll to element), `customEventOptions` (Matomo override).

`"use client"` because of click tracking and `scrollIntoView`.

### `BaseLink` / `InlineLink` / `LinkWithArrow`

```tsx
import InlineLink, { BaseLink, LinkWithArrow } from "@/components/ui/Link"
```

ALL anchor tags. Auto-detects external (new tab + sr-only "(opens in new tab)"), mailto, files (`.pdf`), hashes, and locale-aware routing.

| Export | When to use |
|---|---|
| `InlineLink` (default) | In-prose links (has `visited:` styling) |
| `BaseLink` | Inside `LinkOverlay`, as `ButtonLink` `asChild` slot, or when `visited:` styling is unwanted |
| `LinkWithArrow` | CTA arrow links, RTL-flip-aware |

`"use client"` because of `usePathname` and tracking.

## Cards & Containers

### `Card` (+ parts)

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

The canonical card primitive. `rounded-2xl text-body`. With `href`, wraps in `BaseLink` and propagates a `group/link` class so descendant text can react to card-level hover.

```tsx
<Card href="/x">
  <CardBanner background="accent-a">
    <Image src="..." alt="..." />
  </CardBanner>
  <CardContent>
    <CardTitle>Title</CardTitle>
    <CardParagraph>Description</CardParagraph>
  </CardContent>
</Card>
```

**`CardBanner` props**:
- `background`: `accent-a | accent-b | accent-c | primary | body | none` (default `body`)
- `size`: `full | thumbnail` (default `full`)
- `fit`: `cover | contain` (default `cover`)
- **Magic**: `fit="contain"` with a single `<Image>` child auto-clones it as a blurred backdrop.

**`CardTitle` variants**: `semibold | bold | black` (default `bold`).

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

| Component | Default classes |
|---|---|
| `Flex` | `flex` |
| `Center` | `flex items-center justify-center` |
| `Stack` | `flex flex-col gap-2` |
| `HStack` | `flex flex-row items-center gap-2` |
| `VStack` | `flex flex-col items-center gap-2` |

`Stack` supports a `separator` prop that clones a separator element between children:

```tsx
<Stack separator={<Divider />}>{items}</Stack>
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
  <p>Other content; the LinkOverlay's :before pseudo covers the whole LinkBox.</p>
</LinkBox>
```

`LinkBox` without a `LinkOverlay` somewhere inside doesn't work.

### `EdgeScrollContainer` / `EdgeScrollItem`

```tsx
import { EdgeScrollContainer, EdgeScrollItem } from "@/components/ui/edge-scroll-container"
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

| Component | Mount behavior | Underlying primitive | Compositional parts |
|---|---|---|---|
| `Sheet` | Mounts/unmounts each open | Radix Dialog (battle-tested) | `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription` |
| `PersistentPanel` | Lazy-mounts on first open, then **stays mounted** | Custom (`FocusScope` directly) | None |

Use `Sheet` for ordinary side-panel UI -- the conventional choice with the better-trodden Radix Dialog underneath:

```tsx
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
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
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
```

Radix Popover with Arrow. Default `align="center" sideOffset=4`. Uses `z-popover`.

### `Tooltip` (bare) -- DON'T import this directly

```tsx
// DON'T:
import { Tooltip, TooltipContent } from "@/components/ui/tooltip"
```

Bare hover-only Radix tooltip. Used only inside `@/components/Tooltip`. Use `@/components/Tooltip` instead.

### `DropdownMenu`

```tsx
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, ... } from "@/components/ui/dropdown-menu"
```

Many subparts. Note: this file currently uses several stale shadcn class names that don't resolve in this project's tokens (see `gotchas.md`).

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
import { Avatar, AvatarBase, AvatarImage, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
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
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
```

Custom chevron rotation, RTL `dir(rtl)` variant included.

### `Breadcrumb`

```tsx
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from "@/components/ui/breadcrumb"
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
import { Skeleton, SkeletonLines, SkeletonCard, SkeletonCardContent, SkeletonCardGrid } from "@/components/ui/skeleton"
```

`SkeletonCard` composes `Card` for consistency.

### `Spinner`

```tsx
import Spinner from "@/components/ui/spinner"
```

Wraps `Loader2` from Lucide.

### `Divider` (deprecation track)

```tsx
import Divider from "@/components/ui/divider"
```

Project-specific look: `my-16 h-1 w-[10%] bg-primary-high-contrast` purple bar. **Largely deprecated in current usage.** For visual section separation, prefer a border (`border-t border-border` on a subsequent element) over rendering a `<Divider />`. Don't introduce new `Divider` usage; existing uses can be left until a deliberate cleanup.

### `Table`

```tsx
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table"
```

`tv` with slots, React context.

**Variants**: `simple | minimal | minimal-striped | simple-striped | product | highlight-first-column`

The `product` variant currently has stale shadcn tokens (`hover:bg-muted/50`, `text-muted-foreground`).

### Horizontal scroll / carousel

Three components exist in this space:

| Component | Status |
|---|---|
| `EdgeScrollContainer` (`@/components/ui/edge-scroll-container`) | **Preferred** for new horizontal scroll lists |
| `Carousel` (`@/components/ui/carousel`) | Not recommended for new work; has unresolved RTL issues. Status pending team discussion |
| `Swiper` (deprecation track) | Don't use for new work; on the path to removal |

`EdgeScrollContainer` is a CSS-driven horizontal scroll with snap and edge mask:

```tsx
import { EdgeScrollContainer, EdgeScrollItem } from "@/components/ui/edge-scroll-container"
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
import { List, OrderedList, UnorderedList, ListItem } from "@/components/ui/list"
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
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
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
<h1>Title</h1>           // text-4xl lg:text-5xl, font-bold (from base.css)
<h2>Subtitle</h2>        // text-3xl lg:text-4xl, font-bold
```

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
import { ContentHero, HomeHero, HubHero, MdxHero, SimpleHero } from "@/components/Hero"
```

See `canonical-imports.md` for selection.

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

- `@/components/PageHero` -- use `@/components/Hero/*` instead
- `@/hooks/useColorModeValue` -- Chakra leftover; use Tailwind `dark:` variant

### Reserved

- `@/components/Card` (default export) -- reserved for markdown shortcode; use `@/components/ui/card`
