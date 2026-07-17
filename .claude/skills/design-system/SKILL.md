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
5. **All text is translatable.** `getTranslations` from `next-intl/server` (server) or `useTranslations` from `next-intl` (client). One namespace-bound `t` per namespace -- bind a second function (e.g. `const tCommon = useTranslations("common")`) to access another namespace. The legacy `@/hooks/useTranslation` wrapper is deprecated for new code. Never hard-code user-facing English.
6. **Logical CSS for direction.** Use `ms-`/`me-`/`ps-`/`pe-`/`inset-s-`/`inset-e-`/`border-s`/`border-e`/`text-start`/`text-end`. The site supports Arabic and Urdu (RTL). Hard-coded `left-`/`right-`/`ml-`/`mr-`/`pl-`/`pr-` breaks RTL.
7. **Locale-aware formatters.** `numberFormat()` from `@/lib/utils/numbers`, `dateTimeFormat()` from `@/lib/utils/date`. Never `toLocaleString` / `Intl.NumberFormat` directly.
8. **`useRtlFlip()` for directional icons** (right-pointing arrows/chevrons). Or use `ChevronNext`/`ChevronPrev` from `@/components/Chevron`.
9. **Markdown content goes through `MdComponents`.** The `<Card>` markdown shortcode is backed by `@/components/MarkdownCard` (a thin wrapper around the `ui/card` primitives with an MDX-friendly prop shape). For app code, compose the primitives directly from `@/components/ui/card`.
10. **Storybook stories ship with new UI components.** No automated unit tests; Storybook + Chromatic + types are the verification layer.
11. **Don't add new layouts.** There are six canonical layouts (`TopicLayout`, `StaticLayout`, `DocsLayout`, `TutorialLayout`, `ContentLayout`, `BaseLayout`). New sectioned content goes in `src/data/topics/<key>.ts` as a `TopicLayout` config -- not a new layout component. See `references/layouts.md`.

## Highest-Value Gotchas (read these now)

These are landmines where the code looks reasonable but the pattern is wrong. The full set is in `references/gotchas.md`; these are the ones that come up most often.

### Imports that look right but aren't

- **Cards**: `import { Card } from "@/components/ui/card"` is canonical for app code. The `<Card>` markdown shortcode is backed by `@/components/MarkdownCard` — that wrapper is rarely imported from app code, since composing the `ui/card` parts directly is more flexible.
- **Tooltips**: `import Tooltip from "@/components/Tooltip"` (mobile-aware, Matomo-tracked, scroll-close). **Not** `import { Tooltip } from "@/components/ui/tooltip"` (that's the bare Radix primitive used internally).
- **Modals**: `import Modal from "@/components/ui/dialog-modal"` (default export, the high-level convenience) for typical modal needs. `@/components/ui/dialog` is the vanilla shadcn-style primitive for fine-grained Radix control. Same names exported from both files; **do not mix sources within a feature**.
- **Heroes**: import from `@/components/Hero` (`PageHero`, `HubHero`, `HomeHero`). `PageHero` is the canonical workhorse, covering image, component-aside (`heroComponent`), text-only, and article-style heroes (`variant="no-divider"`, no aside). `title` is always the `<h1>` (no `header` prop); an optional `eyebrow` sits above it. The old `MdxHero` was removed -- use `PageHero` text-only for the breadcrumb + h1 article shape it used to provide.

### Stale shadcn token names that don't resolve

`bg-popover`, `text-popover-foreground`, `bg-accent`, `text-accent-foreground`, `bg-muted`, `text-muted-foreground`, `focus:ring-ring`, `ring-offset-background` appear in `ui/select.tsx`, `ui/dialog.tsx`, `ui/dropdown-menu.tsx`, `ui/tabs.tsx` but are **NOT defined** in this project's tokens. They render incorrectly. If you touch these files, replace with project semantic tokens (`bg-background-highlight`, `text-body`, `bg-accent-a`, `text-body-medium`, etc.). Don't introduce new uses.

### `useColorModeValue` is a Chakra leftover

Used in 5 places. Don't introduce new uses. Use Tailwind `dark:` variant + semantic tokens.

### Subtle component behaviors

- `<Button isSecondary>` only takes effect on `outline` and `ghost` variants. Silent no-op on `solid`/`link`.
- **`Card` is variant-driven, not `className`-driven.** Padding, spacing, background, border-radius, and text color are owned by the `variant` / `size` variants and the CSS vars they set (`--card-pad`, `--content-space`, `--banner-radius`). Adjusting any of those via `className` on `Card`/`CardContent`/`CardHeader`/`CardFooter` is the wrong escape hatch — add a variant case in `card.tsx` instead. See `references/card-walkthrough.md`.
- `<CardBanner fit="contain">` with a single `<Image>` child auto-clones it as a blurred backdrop. Pass two children and you lose this magic.
- `LinkBox` requires a `LinkOverlay` somewhere inside; without it, the whole-card-clickable pattern doesn't work.
- `commonControlClasses` in `ui/checkbox.tsx` is shared by `Switch`. Editing it changes both.

### No `Heading` primitive -- use semantic tags

`base.css` styles `<h1>`-`<h6>` with the right sizes and `font-black`. Just write `<h1>Title</h1>`. Override the size on a heading element when really needed (`<h2 className="text-h1">` for an `h2` at `h1` size), but don't re-apply a weight -- a utility-layer `font-bold` silently overrides the base `font-black`. Reinventing with `<div className="text-5xl font-bold">` loses semantics and screen-reader navigation.

### Match a heading size with `text-h1`-`text-h6`, never the raw responsive pair

There are six size utilities -- `text-h1` through `text-h6` (`src/styles/utilities.css`) -- one per heading level. Each bundles the **font-size and line-height** for that level (responsive, e.g. `text-h2` = `text-3xl lg:text-4xl`). `base.css` itself `@apply`s these to the real `<h1>`-`<h6>` tags, so they are the single source of truth for heading sizing.

Whenever you want a non-heading element (or a heading you're resizing) to read at a given heading level's size, use the utility -- **not** the responsive pair it expands to:

```tsx
// Wrong -- reconstructs h2 sizing by hand; drifts if the scale changes
<p className="text-3xl lg:text-4xl">Looks like an h2</p>

// Right -- one token, stays in sync with the heading scale
<p className="text-h2">Looks like an h2</p>
```

`text-h*` sets size and line-height **only** -- it does *not* set `font-black`. Real headings get their weight from `base.css`; on other elements, set weight separately if you want it.

### Spacing: `.flow` + the `page`/`space`/`hero` tokens, not hand-rolled margins

Vertical rhythm between prose blocks is the opt-in `.flow` system -- wrap a region in `flow`, write semantic tags, and skip `mt-*`/`mb-*`. Page/section padding, the flow unit (used manually), and hero padding come from named responsive tokens -- `px-page`/`p-page`, `mt-space`/`gap-space`, `p-hero` -- not `px-4 md:px-8` chains or arbitrary `p-(--var)`. App pages follow a `<main className="p-page"> > <MainArticle className="flow"> > <Section id>` skeleton. Details in `references/spacing-typography.md`; token table in `references/tokens.md`.

### Shadows: default to the Tailwind scale; almost never add a custom one

Elevation uses the **Tailwind default scale** -- `shadow-sm`/`-md`/`-lg`/`-xl`/`-2xl`, `shadow-none` to reset. Pick by surface: dropdowns/tooltips `shadow-md`, cards/popovers/modals `shadow-lg`, large framed boxes/sheets `shadow-xl`. There is **no custom multi-layer token set**.

Only **two** project shadows exist, both in `utilities.css`, for the brand-tinted look defaults can't express:
- `shadow-primary-xl` -- `shadow-xl` tinted with `primary-low-contrast`, for large framed / window-style boxes.
- `shadow-primary-no-blur-*` -- functional, spacing-scaled solid (no-blur) offset (`-1` = 4px, `-0.5` = 2px) in `primary-low-contrast`, for hard hover offsets.

Before reaching for anything new: a default almost always fits, and a **hover lift is the `hover-lift-*` utility** (`-xs`/`-base`/`-sm`/`-md`) or `Card hoverLift` -- not a bespoke shadow swap. If you genuinely need a custom shadow, write it as a **raw `box-shadow`** (like the two above), never an arbitrary `shadow-[...]`: arbitrary shadows route their color through `--tw-shadow-color`, which the global `* { dark:shadow-body }` rule overrides in dark mode, silently graying your color. Raw `box-shadow` utilities are immune.

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
- **`references/callout-walkthrough.md`** -- Load when adding or modifying an in-content `Callout` (image/emoji + title + description + CTA); covers banner shape, side-by-side equalization, variants, and the CSS variable hooks.
- **`references/page-hero-walkthrough.md`** -- Load when starting a new page that needs a hero; an end-to-end worked example.
- **`references/layouts.md`** -- Load when you're tempted to create a new layout, when adding a new topic-hub section, or when refactoring a one-off `src/layouts/md/<Section>Layout` file. The canonical inventory plus the rule that new layouts are very rare.
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
