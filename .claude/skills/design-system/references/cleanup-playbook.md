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
// For gradients, check utilities.css for an existing one (e.g., bg-gradient-main, bg-card-gradient-secondary).
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
<div className="flex flex-col gap-3 rounded-3xl border border-[rgba(159,43,212,0.11)] bg-card-gradient-secondary p-6 hover:bg-card-gradient-secondary-hover hover:shadow-lg">
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
  header={...}      // small uppercase eyebrow (h1); or use `breadcrumbs` instead
  heroImg={...}     // omit for a text-only hero
  title={...}       // large heading
  description={...}
  buttons={[...]}   // up to two
/>
```

Porting an older `content={{ title, header, subtitle, image, alt }}` shape? Mind the field swap: the old `title` was the eyebrow (now `header`), the old `header` was the large heading (now `title`), `image`/`alt` -> `heroImg` (decorative), and `isReverse` is gone (the layout auto-reverses when `heroImg` is present). See `references/page-hero-walkthrough.md`.

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

Gradients are the highest-duplication area of the styling system. The target is one class per gradient, with direction/stops/opacity/dark/RTL baked into the definition - no recipe rebuilt at a call site. See `tokens.md` ("Gradient backgrounds") for the decision ladder and rules; full inventory in `docs/gradient-audit.md`.

### Inlined multi-stop hex gradient -> token utility

```tsx
// Before:
className="bg-linear-to-br from-[#7f7fd5]/20 via-[#86a8e7]/20 to-[#91eae4]/20"

// After (if a token gradient matches):
className="bg-gradient-main"

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

### Misnamed / dead gradient tokens

- `bg-gradient-step-1` is a flat color, not a gradient - it's a `--color-*` token. Use it as a color (`bg-...`) and don't treat it as a gradient.
- Duplicate aliases (e.g. two utilities pointing at the same `--gradient-*` var) should collapse to one name.
- A gradient `@utility` with zero references is dead - remove it rather than carry it.

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
