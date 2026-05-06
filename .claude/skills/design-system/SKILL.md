---
name: design-system
description: Use when building, refactoring, or styling any UI in the ethereum.org Next.js site (`src/components/`, `app/`, `src/styles/`, `public/content/`, or any `.tsx`/`.mdx`/`.css` change that affects the rendered UI). Provides canonical component choices, design tokens, RTL/i18n rules, server/client guidance, and the "use a variant, not a new component" pattern for the project's Tailwind v4 + Radix + shadcn-style design system.
---

# ethereum.org Design System

Tailwind v4 (CSS-first config, no `tailwind.config.ts`) + React 18 / Next.js App Router + Radix UI primitives + shadcn-style component layer. Tokens live in CSS. Read this file fully on activation; pull from `references/` only when the listed trigger applies.

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
5. **All text is translatable.** `getTranslations` (server) or `useTranslations` (client) from `next-intl`. Never hard-code user-facing English.
6. **Logical CSS for direction.** Use `ms-`/`me-`/`ps-`/`pe-`/`inset-s-`/`inset-e-`/`border-s`/`border-e`/`text-start`/`text-end`. The site supports Arabic and Urdu (RTL). Hard-coded `left-`/`right-`/`ml-`/`mr-`/`pl-`/`pr-` breaks RTL.
7. **Locale-aware formatters.** `numberFormat()` from `@/lib/utils/numbers`, `dateTimeFormat()` from `@/lib/utils/date`. Never `toLocaleString` / `Intl.NumberFormat` directly.
8. **`useRtlFlip()` for directional icons** (right-pointing arrows/chevrons). Or use `ChevronNext`/`ChevronPrev` from `@/components/Chevron`.
9. **Markdown content goes through `MdComponents`.** The legacy `@/components/Card` (default export) is reserved for markdown shortcodes -- never import it from app code; use `@/components/ui/card`.
10. **Storybook stories ship with new UI components.** No automated unit tests; Storybook + Chromatic + types are the verification layer.

## Highest-Value Gotchas (read these now)

These are landmines where the code looks reasonable but the pattern is wrong. The full set is in `references/gotchas.md`; these are the ones that come up most often.

### Imports that look right but aren't

- **Cards**: `import { Card } from "@/components/ui/card"` is canonical. **Not** `import Card from "@/components/Card"` (default export of that file is reserved for markdown shortcodes).
- **Tooltips**: `import Tooltip from "@/components/Tooltip"` (mobile-aware, Matomo-tracked, scroll-close). **Not** `import { Tooltip } from "@/components/ui/tooltip"` (that's the bare Radix primitive used internally).
- **Modals**: `import Modal from "@/components/ui/dialog-modal"` (default export, the high-level convenience) for typical modal needs. `@/components/ui/dialog` is the vanilla shadcn-style primitive for fine-grained Radix control. Same names exported from both files; **do not mix sources within a feature**.
- **Heroes**: import from `@/components/Hero` (`ContentHero`, `SimpleHero`, `HubHero`, `MdxHero`, `HomeHero`). **Not** `@/components/PageHero` (deprecation track).

### Stale shadcn token names that don't resolve

`bg-popover`, `text-popover-foreground`, `bg-accent`, `text-accent-foreground`, `bg-muted`, `text-muted-foreground`, `focus:ring-ring`, `ring-offset-background` appear in `ui/select.tsx`, `ui/dialog.tsx`, `ui/dropdown-menu.tsx`, `ui/tabs.tsx` but are **NOT defined** in this project's tokens. They render incorrectly. If you touch these files, replace with project semantic tokens (`bg-background-highlight`, `text-body`, `bg-accent-a`, `text-body-medium`, etc.). Don't introduce new uses.

### `useColorModeValue` is a Chakra leftover

Used in 5 places. Don't introduce new uses. Use Tailwind `dark:` variant + semantic tokens.

### Subtle component behaviors

- `<Button isSecondary>` only takes effect on `outline` and `ghost` variants. Silent no-op on `solid`/`link`.
- `<CardBanner fit="contain">` with a single `<Image>` child auto-clones it as a blurred backdrop. Pass two children and you lose this magic.
- `LinkBox` requires a `LinkOverlay` somewhere inside; without it, the whole-card-clickable pattern doesn't work.
- `commonControlClasses` in `ui/checkbox.tsx` is shared by `Switch`. Editing it changes both.

### No `Heading` primitive -- use semantic tags

`base.css` styles `<h1>`-`<h6>` with the right sizes and `font-bold`. Just write `<h1>Title</h1>`. Override the size class on the heading element when really needed (`<h2 className="text-4xl">`). Reinventing with `<div className="text-5xl font-bold">` loses semantics and screen-reader navigation.

### One stray `toLocaleString` in `ui/chart.tsx:241`

Don't add more. Use `numberFormat()`.

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
| Page hero | `import { ContentHero, SimpleHero, HubHero, MdxHero } from "@/components/Hero"` |
| Inline alert | `import { Alert, AlertContent, AlertDescription } from "@/components/ui/alert"` |
| Top-of-page banner | `import BannerNotification from "@/components/Banners/BannerNotification"` |
| Big numeric display | `import BigNumber from "@/components/BigNumber"` |
| Layout | `import { Stack, HStack, VStack, Flex, Center } from "@/components/ui/flex"` |
| Number formatting | `import { numberFormat } from "@/lib/utils/numbers"` |
| Date formatting | `import { dateTimeFormat } from "@/lib/utils/date"` |
| RTL flip helper | `import { useRtlFlip } from "@/hooks/useRtlFlip"` |

For full decision trees with all the look-alike landmines, see `references/canonical-imports.md`.

## When to Load Each Reference

Pull these in only when the trigger applies. Don't read them all upfront.

- **`references/canonical-imports.md`** -- Load when you're about to import a component and aren't sure which file is canonical (Card, Modal, Tooltip, Hero, Tabs all have multiple plausible imports).
- **`references/components.md`** -- Load when you need the full inventory: what each component is for, its variants, its canonical usage example.
- **`references/tokens.md`** -- Load when you need to add a new token, define a gradient, choose a z-index, or are unsure which semantic token applies. Also: when working in `src/styles/`.
- **`references/spacing-typography.md`** -- Load when laying out a page or section, deciding heading sizes, choosing spacing rhythms, or working with text density.
- **`references/gotchas.md`** -- Load when you hit unexpected behavior in a primitive (auto-blur backdrop, slot-prop coupling, hidden client boundary, etc.) or want the long-tail confusion patterns beyond what's inline above.
- **`references/variant-vs-new.md`** -- Load when you're tempted to create a new component file. Read this first to confirm whether a variant is the right answer.
- **`references/cleanup-playbook.md`** -- Load when refactoring existing code that has anti-patterns (one-off styling, raw `<a>`/`<button>`, hex colors, hard-coded English, etc.). The "old pattern -> new pattern" map.
- **`references/i18n-rtl.md`** -- Load when adding user-facing text, formatting numbers/dates, working with directional spacing, or writing translation keys.
- **`references/server-vs-client.md`** -- Load when deciding whether to mark a component `"use client"`, structuring a page that mixes static and interactive parts, or refactoring across the SSR boundary.
- **`references/a11y.md`** -- Load when adding interactive elements (modals, dropdowns, custom click targets), building forms, or working with images and headings.
- **`references/card-walkthrough.md`** -- Load when starting any card-shaped UI work; an end-to-end worked example.
- **`references/page-hero-walkthrough.md`** -- Load when starting a new page that needs a hero; an end-to-end worked example.
- **`references/new-component-checklist.md`** -- Load before opening a PR for a new component. The pre-merge checklist.

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
