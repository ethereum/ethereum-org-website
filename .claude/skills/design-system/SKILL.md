---
name: design-system
description: Use when building, refactoring, or styling any UI in the ethereum.org Next.js site (`src/components/`, `app/`, `src/styles/`, `public/content/`, or any `.tsx`/`.mdx`/`.css` change that affects the rendered UI). Provides canonical component choices, design tokens, RTL/i18n rules, server/client guidance, and the "use a variant, not a new component" pattern for the project's Tailwind v4 + Radix + shadcn-style design system.
---

# ethereum.org Design System

Tailwind v4 (CSS-first config, no `tailwind.config.ts`) + React 19 / Next.js App Router + Radix UI primitives + shadcn-style component layer. Tokens live in CSS. Read this file fully on activation; pull from `references/` only when the listed trigger applies.

## The Core Habit: Reuse Over Reinvent

The single highest-leverage habit for keeping this codebase consistent: **when you need new UI, look for a primitive or variant first, only invent if nothing fits.** Most "new component" instincts are actually "new variant" instincts in disguise.

Before you write any UI code, ask:
- Is there a primitive that already does this? (`Card`, `Button`, `Alert`, `Tag`, `Hero/*`)
- Is the difference small enough to express as a *variant* on an existing primitive?
- Can I compose existing primitives instead of inlining a long Tailwind class chain?

If you find yourself writing `flex items-center gap-X rounded-Y border bg-... p-Z` for a card-like thing, you're reinventing `<Card>`. If you write `<p className="text-4xl font-bold">N</p>` for a stat, you're reinventing `<BigNumber>`. If you write `<div className="text-5xl font-bold">Title</div>`, you're reinventing `<h1>` (which is already styled by `base.css`). **Compose, don't inline.**

When the existing primitive doesn't quite fit, the answer is usually "add a variant," not "create a new file." See `references/variant-vs-new.md`.

## Top Rules

1. **No raw `<a>` or `<button>`.** Use `<Button>`/`<ButtonLink>` from `@/components/ui/buttons/Button` and `InlineLink`/`BaseLink`/`LinkWithArrow` from `@/components/ui/Link`. These primitives handle event tracking, external-link safety, locale routing, and focus rings.
2. **No raw color values.** Use semantic tokens (`text-body`, `bg-background`, `border-border`, `text-primary`). Hex literals and `rgb()` calls bypass dark mode.
3. **Prefer adding a variant** to an existing primitive over creating a new component. Card, Button, Alert, Tag are the most common targets.
4. **Server Components by default.** Only `"use client"` when you need state, effects, browser APIs, or inline event handlers.
5. **All text is translatable.** `getTranslations` from `next-intl/server` (server) or `useTranslations` from `next-intl` (client). One namespace-bound `t` per namespace -- bind a second function (e.g. `const tCommon = useTranslations("common")`) to access another namespace. The legacy `@/hooks/useTranslation` wrapper is deprecated for new code. Never hard-code user-facing English. **In an `app/[locale]/` page or `generateMetadata`, call `setRequestLocale(locale)` before any next-intl API** or on-demand renders throw `static to dynamic ... reason: headers` -- see `references/i18n-rtl.md`.
6. **Logical CSS for direction.** Use `ms-`/`me-`/`ps-`/`pe-`/`inset-s-`/`inset-e-`/`border-s`/`border-e`/`text-start`/`text-end`. The site supports Arabic and Urdu (RTL). Hard-coded `left-`/`right-`/`ml-`/`mr-`/`pl-`/`pr-` breaks RTL.
7. **Locale-aware formatters.** `numberFormat()` from `@/lib/utils/numbers`, `dateTimeFormat()` from `@/lib/utils/date`. Never `toLocaleString` / `Intl.NumberFormat` directly.
8. **`useRtlFlip()` for directional icons** (right-pointing arrows/chevrons). Or use `ChevronNext`/`ChevronPrev` from `@/components/Chevron`.
9. **Markdown content goes through `MdComponents`.** The `<Card>` markdown shortcode is backed by `@/components/MarkdownCard` (a thin wrapper around the `ui/card` primitives with an MDX-friendly prop shape). For app code, compose the primitives directly from `@/components/ui/card`.
10. **Storybook stories ship with new UI components.** No automated unit tests; Storybook + Chromatic + types are the verification layer.
11. **Don't add new layouts.** There are six canonical layouts (`TopicLayout`, `StaticLayout`, `DocsLayout`, `TutorialLayout`, `ContentLayout`, `BaseLayout`). New sectioned content goes in `src/data/topics/<key>.ts` as a `TopicLayout` config -- not a new layout component. See `references/layouts.md`.

## Highest-Value Gotchas (index)

Landmines where the code looks reasonable but the pattern is wrong. One line each; the canonical write-ups live in the named reference.

- **Look-alike imports** -- Tooltip (`@/components/Tooltip`, not `ui/tooltip`), Modal (`ui/dialog-modal` vs `ui/dialog`; don't mix sources within a feature), Card (`ui/card` for app code, not `MarkdownCard`), Heroes (named exports of `@/components/Hero`; `title` is always the `<h1>`, no `header` prop). Decision trees: `references/canonical-imports.md`.
- **Stale shadcn token names** (`bg-popover`, `bg-muted`, `text-muted-foreground`, ...) linger in a few `ui/` files but don't resolve in this project's tokens. Don't add new uses. List: `references/tokens.md`; replacements: `references/cleanup-playbook.md`.
- **`useColorModeValue` is a deprecated Chakra leftover** -- use `dark:` + semantic tokens.
- **`Card` is variant-driven, not `className`-driven.** Padding/spacing/background/radius/text color go through `variant`/`size`; a `className` override means a missing variant case. Full system: `references/card-walkthrough.md`. Surprise behaviors (`isSecondary` no-op on `solid`, `CardBanner fit="contain"` auto-backdrop, `LinkBox` needs `LinkOverlay`, `commonControlClasses` shared with `Switch`): `references/gotchas.md`.
- **No `Heading` primitive** -- `base.css` styles `<h1>`-`<h6>`; just write the tag. To match a heading level's size anywhere, use `text-h1`-`text-h6` (size + line-height only) -- never the raw `text-3xl lg:text-4xl` pair, and never re-apply a weight on a real heading. Canonical write-up: `references/spacing-typography.md`.
- **Spacing is `.flow` + the `page`/`space`/`hero` tokens**, not hand-rolled margins. App pages follow a `<main className="p-page"> > <MainArticle className="flow"> > <Section id>` skeleton. Details: `references/spacing-typography.md`; token table: `references/tokens.md`.
- **Locale formatting** -- one stray `toLocaleString` remains in `ui/chart.tsx`; don't add more. Use `numberFormat()`.

### Shadows: default to the Tailwind scale

Pick by surface: dropdowns/tooltips `shadow-md`, cards/popovers/modals `shadow-lg`, large framed boxes/sheets `shadow-xl`. Three rules:

1. Only two custom shadows exist (`shadow-primary-xl`, `shadow-primary-no-blur-*`, both in `utilities.css`) -- anything new needs a brand-tint justification.
2. Hover elevation is the `hover-lift-*` utility or `Card hoverLift` (both `motion-safe`-gated), never a per-component resting/hover shadow pair.
3. A genuinely-needed custom shadow is a raw `box-shadow` `@utility`, never an arbitrary `shadow-[...]` -- arbitrary shadows route color through `--tw-shadow-color`, which the global `* { dark:shadow-body }` rule grays out in dark mode.

Old-shadow-token mapping table: `references/cleanup-playbook.md`.

## Quick "Where Do I Import From?" Cheatsheet

| I need... | Import |
|---|---|
| Card | `import { Card, CardBanner, CardContent, CardTitle, CardParagraph } from "@/components/ui/card"` |
| Modal/Dialog (typical) | `import Modal from "@/components/ui/dialog-modal"` (default export) |
| Side sheet | `import { Sheet, ... } from "@/components/ui/sheet"` |
| Tooltip | `import Tooltip from "@/components/Tooltip"` (NOT `@/components/ui/tooltip`) |
| Button | `import { Button, ButtonLink } from "@/components/ui/buttons/Button"` |
| Anchor (in prose) | `import InlineLink from "@/components/ui/Link"` (default) |
| Anchor (CTA with arrow) | `import { LinkWithArrow } from "@/components/ui/Link"` |
| Page hero | `import { PageHero, HubHero } from "@/components/Hero"` |
| Inline alert | `import { Alert, AlertContent, AlertDescription } from "@/components/ui/alert"` |
| Top-of-page banner | `import { Alert } from "@/components/ui/alert"` then `<Alert variant="banner">` |
| Big numeric display | `import BigNumber from "@/components/BigNumber"` |
| Layout | `import { Stack, HStack, VStack, Flex, Center } from "@/components/ui/flex"` |
| Number formatting | `import { numberFormat } from "@/lib/utils/numbers"` |
| Date formatting | `import { dateTimeFormat } from "@/lib/utils/date"` |
| RTL flip helper | `import { useRtlFlip } from "@/hooks/useRtlFlip"` |

For full decision trees with all the look-alike landmines, see `references/canonical-imports.md`.

## When to Load Each Reference

Pull these in only when the trigger applies. Don't read them all upfront.

- **`references/canonical-imports.md`** -- unsure which of several look-alike imports is canonical.
- **`references/components.md`** -- the full component inventory with variants and usage.
- **`references/tokens.md`** -- adding a token, gradients, z-index, semantic-token choices, work in `src/styles/`.
- **`references/spacing-typography.md`** -- page/section layout, heading sizes, spacing rhythm, the `.flow` system.
- **`references/gotchas.md`** -- unexpected primitive behavior; the long-tail confusion patterns.
- **`references/variant-vs-new.md`** -- before creating any new component file.
- **`references/cleanup-playbook.md`** -- refactoring existing anti-patterns; the "old pattern -> new pattern" map.
- **`references/i18n-rtl.md`** -- user-facing text, number/date formatting, RTL, translation keys, `setRequestLocale`.
- **`references/server-vs-client.md`** -- `"use client"` decisions and SSR-boundary structure.
- **`references/a11y.md`** -- interactive elements, forms, images, heading hierarchy.
- **`references/card-walkthrough.md`** -- any card-shaped UI work.
- **`references/callout-walkthrough.md`** -- adding or modifying an in-content `Callout`.
- **`references/page-hero-walkthrough.md`** -- a new page that needs a hero.
- **`references/layouts.md`** -- layout selection, new topic hubs, one-off layout refactors.
- **`references/new-component-checklist.md`** -- before opening a PR for a new component.

## Other Project Skills That May Apply

- **`data-layer`** -- For data fetching/sources. UI work that needs data should compose with this.

## Pre-Merge Smoke Test

Before opening a PR for any UI work:

- [ ] No raw `<a>` or `<button>`
- [ ] No hard-coded colors (`#hex`, `rgb()`, `hsla()`); semantic tokens only
- [ ] No `left-`/`right-`/`ml-`/`mr-`/`pl-`/`pr-` (use logical equivalents)
- [ ] All user-facing strings translatable
- [ ] `numberFormat()`/`dateTimeFormat()` for formatting (not native APIs)
- [ ] Server Components wherever possible
- [ ] New UI primitives have a `.stories.tsx`
- [ ] Headings use `<h1>`-`<h6>` (not `<div className="text-5xl font-bold">`)
- [ ] If introducing a new component, justify why it isn't a variant of an existing one
