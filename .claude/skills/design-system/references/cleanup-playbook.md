# Cleanup Playbook

When you encounter an anti-pattern in existing code, this is the canonical replacement. Use this as the script for cleanup-track work.

## Raw `<a>` -> `InlineLink` / `BaseLink`

```tsx
// Before:
<a href="/about">About</a>

// After (in-prose):
import InlineLink from "@/components/ui/Link"
<InlineLink href="/about">About</InlineLink>

// After (CTA with arrow):
import { LinkWithArrow } from "@/components/ui/Link"
<LinkWithArrow href="/about">About</LinkWithArrow>

// After (whole-card-clickable):
import { LinkOverlay } from "@/components/ui/link-box"
import { BaseLink } from "@/components/ui/Link"
<LinkOverlay asChild><BaseLink href="/about">...</BaseLink></LinkOverlay>
```

## Raw `<button>` -> `Button`

```tsx
// Before:
<button onClick={onClick} className="flex text-inherit"><Icon /></button>

// After (icon-only):
import { Button } from "@/components/ui/buttons/Button"
<Button variant="ghost" size="sm" onClick={onClick} aria-label="Description"><Icon /></Button>

// After (text):
<Button variant="solid" onClick={onClick}>Click me</Button>
```

## `<div onClick>` -> `Button`

```tsx
// Before:
<div className="cursor-pointer" onClick={onClick}>...</div>

// After:
<Button variant="ghost" onClick={onClick}>...</Button>
```

## Hard-coded color hex -> semantic token

```tsx
// Before:
className="bg-[#FF0000]"
className="border-[rgba(159,43,212,0.11)]"
className="from-[#5c1eb4] to-[#7b3fd8]"

// After:
className="bg-error"
className="border-primary/10"
// For gradients, check utilities.css for an existing one (e.g., bg-linear-primary, bg-linear-secondary).
// If no token fits, add it to semantic-tokens.css before using a hex value in a component.
```

## Stale shadcn token names -> project semantic tokens

These appear in `ui/select.tsx`, `ui/dialog.tsx`, `ui/dropdown-menu.tsx`, `ui/tabs.tsx` and DON'T resolve in this project's tokens.

| Stale | Replace with |
|---|---|
| `bg-popover` | `bg-background-highlight` (or appropriate semantic background) |
| `text-popover-foreground` | `text-body` |
| `bg-accent` | `bg-accent-a` (or `accent-b`/`accent-c` as appropriate) |
| `text-accent-foreground` | `text-body-inverse` (verify per-context) |
| `text-muted-foreground` | `text-body-medium` |
| `bg-muted` | `bg-background-medium` |
| `focus:ring-ring` | Use the project's `focus-visible:` outline pattern |
| `ring-offset-background` | `bg-background` |

These are best-guess mappings; verify with a Storybook visual check before merging.

## `useColorModeValue` -> Tailwind `dark:`

```tsx
// Before (Chakra leftover):
import useColorModeValue from "@/hooks/useColorModeValue"
const bgColor = useColorModeValue("white", "gray.900")
return <div style={{ background: bgColor }} />

// After:
return <div className="bg-background" />  // Token swaps automatically
// Or, if no semantic token fits:
return <div className="bg-white dark:bg-gray-900" />
```

## `<div className="text-5xl font-bold">` -> semantic heading

```tsx
// Before:
<div className="text-5xl font-bold">Page Title</div>

// After:
<h1>Page Title</h1>  // base.css already styles this
```

If you need a heading at a different level's size, reuse the matching `text-h*` utility on the element:

```tsx
<h2 className="text-h1">Custom-sized Heading</h2>  // h2 semantics, h1 size
```

## `text-3xl lg:text-4xl` (to match a heading size) -> `text-h*`

```tsx
// Before -- hand-reconstructs h2 sizing; drifts when the scale changes:
<p className="text-3xl lg:text-4xl">Looks like an h2</p>

// After -- one token, tracks base.css (size + line-height only, no weight):
<p className="text-h2">Looks like an h2</p>
```

The `text-h1`-`text-h6` utilities (`src/styles/utilities.css`) are the single source of truth for heading sizing. Anytime the intent is "match heading level N's size," use `text-hN` rather than the raw responsive size classes.

## `<p className="text-Xxl font-bold">number</p>` -> `BigNumber`

```tsx
// Before:
<p className="text-4xl font-bold">$3000</p>
<p className="text-2xl font-bold">1st place</p>

// After:
import BigNumber from "@/components/BigNumber"
<BigNumber>$3000</BigNumber>
```

## Inlined avatar circle -> `AvatarFallback`

```tsx
// Before:
<div className="grid size-8 place-items-center rounded-full text-body-inverse">
  {name.charAt(0)}
</div>

// After:
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
<Avatar><AvatarFallback>{name.charAt(0)}</AvatarFallback></Avatar>
```

## Custom card shell -> `Card` composition

```tsx
// Before:
<div className="flex flex-col gap-3 rounded-3xl border border-[rgba(159,43,212,0.11)] bg-linear-secondary p-6 hover:bg-linear-tertiary hover:shadow-lg">
  <h3>Title</h3>
  <p>Description</p>
</div>

// After:
import { Card, CardContent, CardTitle, CardParagraph } from "@/components/ui/card"
<Card decoration="purple-gradient">  {/* once the variant is added */}
  <CardContent>
    <CardTitle>Title</CardTitle>
    <CardParagraph>Description</CardParagraph>
  </CardContent>
</Card>
```

If the matching variant doesn't exist yet, add it to `Card` before this cleanup.

## `value.toLocaleString()` -> `numberFormat()`

```tsx
// Before:
{value.toLocaleString()}
new Intl.NumberFormat(locale).format(value)

// After:
import { numberFormat } from "@/lib/utils/numbers"
{numberFormat(locale, options).format(value)}
```

## Native date methods -> `dateTimeFormat()`

```tsx
// Before:
date.toLocaleDateString()
date.toLocaleTimeString()
new Intl.DateTimeFormat(locale).format(date)

// After:
import { dateTimeFormat } from "@/lib/utils/date"
dateTimeFormat(locale, options).format(date)
```

## Hard-coded `left-`/`right-` -> logical equivalents

```tsx
// Before:
className="left-2 mr-4 pl-8 border-l text-left"

// After:
className="inset-s-2 me-4 ps-8 border-s text-start"
```

(Only physical positioning is OK for genuinely non-directional cases like centering or vertical positioning.)

## Right-pointing icon -> RTL-aware

```tsx
// Before:
import { ChevronRight } from "lucide-react"
<ChevronRight className="size-4" />

// After (option A: project's RTL-aware wrapper):
import { ChevronNext } from "@/components/Chevron"
<ChevronNext className="size-4" />

// After (option B: useRtlFlip + base icon):
"use client"
import { ChevronRight } from "lucide-react"
import { useRtlFlip } from "@/hooks/useRtlFlip"
import { cn } from "@/lib/utils/cn"
const { twFlipForRtl } = useRtlFlip()
<ChevronRight className={cn("size-4", twFlipForRtl)} />
```

## Hard-coded English string -> translation

```tsx
// Before:
<h1>Welcome to Ethereum</h1>

// After (Server Component):
import { getTranslations } from "next-intl/server"
const t = await getTranslations("page-namespace")
<h1>{t("welcome-heading")}</h1>

// After (Client Component):
"use client"
import { useTranslations } from "next-intl"
const t = useTranslations("page-namespace")
<h1>{t("welcome-heading")}</h1>
```

Add the new key to `src/intl/en/[namespace].json`.

> **Data fetching patterns** (Server Component data, caching, sources) are out of scope for this design-system skill. See the `data-layer` skill for canonical fetching guidance.

## `PageHero`: discrete props, not a `content` object

`PageHero` (from `@/components/Hero`) takes discrete props:

```tsx
import { PageHero } from "@/components/Hero"
<PageHero
  breadcrumbs={{ slug }} // fills the slot above the title
  eyebrow={...}          // optional ReactNode (status/tag) above the title
  heroImg={...}          // or `heroComponent` (mutually exclusive); omit both for text-only
  title={...}            // large heading -- always the <h1>
  description={...}
  buttons={[...]}        // up to two
/>
```

Porting an older `content={{ title, header, subtitle, image, alt }}` shape? Mind the field swap: the old `title` was the eyebrow and the old `header` was the large heading -- now `title` is the large heading **and** the `<h1>` (there is no `header` prop; use `breadcrumbs` for the slot above it, and `eyebrow` for any extra label). `image`/`alt` -> `heroImg` (decorative; or `heroComponent` for a widget), and `isReverse` is gone (the layout auto-places the aside). See `references/page-hero-walkthrough.md`.

## `BannerNotification` -> `Alert variant="banner"`

```tsx
// Before (file no longer exists -- import is broken):
import BannerNotification from "@/components/Banners/BannerNotification"
<BannerNotification shouldShow={isPageIncomplete}>
  <Translation id="page-developers-docs:banner-page-incomplete" />
</BannerNotification>

// After:
import { Alert } from "@/components/ui/alert"
{isPageIncomplete && (
  <Alert variant="banner">
    <Translation id="page-developers-docs:banner-page-incomplete" />
  </Alert>
)}
```

`BannerNotification` was deleted in May 2026; if you find the import in stale code, this is the replacement. The `shouldShow` prop has no equivalent on `Alert` -- gate at the JSX level (`{condition && <Alert>...</Alert>}`).

`BugBountyBanner` (a thin one-off wrapper around `BannerNotification`) was deleted in the same pass with no replacement file -- inline `<Alert variant="banner">` at the call site.

## Inline `<strong>` lead-in inside `Alert` -> `AlertTitle` + `AlertDescription`

```tsx
// Before:
<Alert variant="info">
  <AlertContent>
    <p className="mt-0"><strong>Heads up</strong></p>
    <p className="mt-4">Some description text...</p>
  </AlertContent>
</Alert>

// After:
import { AlertTitle, AlertDescription } from "@/components/ui/alert"
<Alert variant="info">
  <AlertContent>
    <AlertTitle>Heads up</AlertTitle>
    <AlertDescription>
      <p>Some description text...</p>
    </AlertDescription>
  </AlertContent>
</Alert>
```

`AlertTitle` is the canonical "bold standard-font-size lead-in line" for an Alert -- use it whenever an alert needs a bold opening line. `AlertDescription` normalizes paragraph spacing internally, so no `mt-`/`mb-` classes are needed on the body paragraphs. The Alert sub-components are designed so callers don't apply manual typography or spacing inside the Alert.

## Arbitrary z-index -> named z scale

```tsx
// Before:
className="z-[10000]"
className="z-[1500]"

// After:
className="z-tooltip"  // 1800
className="z-popover"  // 1500
```

See `tokens.md` for the full named z-index scale.

## Gradients -> named utilities (closed set)

Gradients are the highest-duplication area of the styling system. The target is one class per gradient, with direction/stops/opacity/dark/RTL baked into the definition - no recipe rebuilt at a call site. See `tokens.md` ("Gradient backgrounds") for the decision ladder and rules; the live inventory is the `src/styles/gradients.stories.tsx` story (Design System / Gradients).

### Inlined multi-stop hex gradient -> token utility

```tsx
// Before:
className="bg-linear-to-br from-[#7f7fd5]/20 via-[#86a8e7]/20 to-[#91eae4]/20"

// After (if a token gradient matches):
className="bg-linear-primary"

// If no existing gradient matches: add a new @utility to utilities.css, then use it.
```

### Re-spelled token recipe -> named utility / Card variant

```tsx
// Before (this exact recipe is hand-copied dozens of times):
className="bg-linear-to-b from-accent-a/5 to-accent-a/10 dark:from-accent-a/10 dark:to-accent-a/20"

// After (closed-set named utility):
className="bg-tint-accent-a"

// After (when it's a card): use the Card variant, which applies the utility internally:
<Card decoration="accent-a">...</Card>
```

### Our-brand hex -> semantic token

```tsx
// Before (our-brand purples typed as hex):
className="bg-linear-to-b from-[#5c1eb4] to-[#7b3fd8]"

// After (semantic tokens; or the named utility once it exists):
className="bg-linear-to-b from-primary to-primary-hover"
```

Hex is permitted **only** to match an exact *external* brand color (wallet logos, community-hub city brands). For those, don't re-spell the class per entry - pass the hue to a single locked utility:

```tsx
// Before (per-entity, repeated 50+ times in data):
twGradiantBrandColor: "from-[#0052FF]"   // applied with bg-linear-to-b at the call site

// After: only the hue varies; direction/opacity/dark fixed by the utility
<div className="bg-brand-tint" style={{ "--brand-color": brandHex } as CSSProperties} />
```

### Deprecated v3 gradient syntax -> v4

```tsx
// Before (Tailwind v3):
className="bg-gradient-to-b from-purple-700 to-purple-500"

// After (v4 - the project standard):
className="bg-linear-to-b from-purple-700 to-purple-500"
```

### Dead gradient utilities

- A gradient `@utility` with zero references is dead - remove it rather than carry it.
- Don't add a second `@utility` that duplicates an existing gradient under a new name; reuse the existing one.

## Deprecated shadow tokens -> Tailwind defaults / two custom utilities

The old multi-layer CSS-variable shadow set was removed in favor of the Tailwind default scale plus two custom utilities. Map any remaining reference to a default first; only the brand-tinted cases use a custom. The consistent swaps:

| Old custom | Replace with | Notes |
|---|---|---|
| `shadow-table-box` | `shadow-xl` | full-width list/article containers |
| `shadow-drop` | `shadow-lg` | floating tiles / widgets / dropdowns |
| `shadow-widget` | `shadow-lg` | |
| `shadow-svg-button-link` | `shadow-lg` | |
| `shadow-window-box` | `shadow-primary-xl` (custom) | brand-tinted large framed boxes |
| `shadow-[4px_4px_…primary-low-contrast]` | `shadow-primary-no-blur-1` (custom) | solid hover offset (`-1` = 4px, `-0.5` = 2px) |
| `shadow-table-item-box` | drop it | hairline rarely read; remove unless clearly needed |
| `shadow-table-box-hover` (hover lift) | `Card hoverEffect="lift"` / `hover-lift-*` | not a manual shadow swap |
| `shadow-[1px_0px_0px_…]` (edge line) | a real `border` / `border-e` | shadow-as-border is a smell |

Rules:
- **Default to the Tailwind scale** (`shadow-md`/`-lg`/`-xl`). A custom shadow needs a brand-tint justification.
- **Hover elevation is `hover-lift-*`** (`-xs`/`-base`/`-sm`/`-md`) or `Card hoverEffect="lift"`, never a per-component resting/hover shadow pair.
- **Custom shadows are raw `box-shadow`** (`@utility` writing the property directly), never arbitrary `shadow-[...]` -- arbitrary shadows route color through `--tw-shadow-color`, which `* { dark:shadow-body }` overrides to gray in dark mode.

## Inline `<div className="flex flex-col gap-2">` -> `Stack`

```tsx
// Before:
<div className="flex flex-col gap-2">{children}</div>

// After:
import { Stack } from "@/components/ui/flex"
<Stack className="gap-2">{children}</Stack>
```

(Stack already defaults to `flex-col gap-2`, so often you can drop the className entirely.)

## Per-section `src/layouts/md/<Section>Layout` -> `TopicLayout` config

```tsx
// Before -- a section gets its own layout file that duplicates 90% of every other section's layout:
// src/layouts/md/Staking.tsx
export const StakingLayout = ({ children, frontmatter, slug, ... }) => {
  const { t } = useTranslation("page-staking")
  const dropdownLinks = { text: t("..."), items: [ /* ... */ ] }
  const heroProps = { ...frontmatter, breadcrumbs: { slug, startDepth: 1 }, heroImg: { ... } }
  return <ContentLayout dropdownLinks={dropdownLinks} heroSection={<PageHero {...heroProps} />}>{children}</ContentLayout>
}

// After -- the data lives in a config file, no layout component needed:
// src/data/topics/staking.ts
import type { TopicConfig } from "."
export const staking: TopicConfig = {
  translationNs: "page-staking",
  dropdown: {
    textKey: "page-staking-dropdown-staking-options",
    ariaLabelKey: "page-staking-dropdown-staking-options-alt",
    matomoCategory: "Staking dropdown",
    items: [
      { textKey: "page-staking-dropdown-home", href: "/staking/", matomoEvent: "clicked staking home" },
      // ...
    ],
  },
  heroImage: { width: 800, height: 605 },
}

// src/layouts/index.ts
export const layoutMapping = {
  // ...
  staking: TopicLayout,  // was: StakingLayout
}
```

After the move:
- Keep the section's MDX component bundle (`stakingComponents`) in `src/layouts/md/<key>.tsx`; only the layout export goes away.
- Delete any per-section heading overrides (`Heading1`/`Heading2`/etc. with extra className). The defaults in `MdComponents` are the baseline.
- If the section needs a swap-in component (HubHero on a specific slug, content after the markdown), use `config.hubHero` or the `afterContent` prop -- don't fork a new layout.

See `references/layouts.md` for the full inventory and `docs/topic-layout-refactor.md` for the worked migration.

## One-off styled layout/heading wrappers -> semantic tags + `.flow` + `Section`

Older pages defined local styled wrappers to hand-manage heading sizes, margins, and columns -- `const H2 = (p) => <h2 className="mt-12 mb-8 leading-xs" {...p} />`, `Text`, `GappedPage`, `TwoColumnContent`, `Width60`/`Width40`, `Container`, etc. Delete them; the design system owns all three concerns.

```tsx
// Before:
const H2 = (props) => <h2 className="mt-12 mb-8 leading-xs" {...props} />
const Text = ({ className, ...props }) => <p className={cn("mb-6", className)} {...props} />
const Width60 = (props) => <div className="w-full flex-[3]" {...props} />
<GappedPage><Content><H2>Title</H2><Text>Body</Text></Content></GappedPage>

// After -- semantic tags in a `flow` region, chunked with `<Section>`:
<MainArticle className="flow space-y-space-4x">
  <Section id="title"><h2>Title</h2><p>Body</p></Section>
</MainArticle>
```

Heading size comes from `base.css` (`text-h*`), vertical rhythm from `.flow`, page padding + section gaps from the `page`/`space` tokens. Full skeleton in `spacing-typography.md`; end-of-page-action placement in `layouts.md`.

## Per-element `mt-*`/`mb-*` rhythm -> `.flow`

```tsx
// Before -- every block hand-spaced, often with responsive overrides:
<h2 className="mt-12 mb-6">Title</h2>
<p className="mb-6 lg:mb-8">Body</p>

// After -- wrap in a `flow` region; spacing is automatic and responsive:
<div className="flow"><h2>Title</h2><p>Body</p></div>
```

`.flow` derives every gap from one responsive `--space` ladder. Don't reintroduce per-element margins inside a flow region.

## Hard-coded / arbitrary page padding -> `page` / `hero` tokens

```tsx
// Before:
className="px-8 pb-8 max-lg:pt-12"
className="p-(--pad) lg:px-[calc(var(--pad)*1.5)] lg:py-[calc(var(--pad)*2)]"

// After -- named, responsive spacing tokens:
className="px-page pb-page"
className="p-hero lg:px-hero-1.5x lg:py-hero-2x"
```

`page` = standard page/section padding; `hero` = `PageHero` padding. Table in `tokens.md`.

## `Page` / `ContentContainer` (MdComponents) -> `<main>` + `<MainArticle className="flow">`

Both were removed (June 2026) -- they were thin wrappers around `Flex`/`MainArticle`.

```tsx
// Before (import now broken):
import { Page, ContentContainer } from "@/components/MdComponents"
<Page><ContentContainer>{children}</ContentContainer></Page>

// After:
import MainArticle from "@/components/MainArticle"
<main className="p-page"><MainArticle className="flow">{children}</MainArticle></main>
```
