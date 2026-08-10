# Gotchas

The highest-value content in this skill. Each entry is a place where the code looks reasonable but the pattern is wrong, or where two paths exist and only one is right.

## Imports That Look Right But Aren't

### `@/components/MarkdownCard` vs `@/components/ui/card`

`@/components/MarkdownCard` is a thin wrapper that composes the `ui/card` primitives with an MDX-friendly prop shape (`emoji`, `title`, `description`, `ctaLabel`, `href`). It's what the `<Card>` markdown shortcode resolves to via `MdComponents`. Importing it from app code is not wrong, but it's usually a smell — the wrapper's narrow prop surface fights you the moment you need a banner, a custom layout, or anything beyond emoji+title+desc.

**Use `@/components/ui/card`** and compose the parts directly for app code. Reach for `MarkdownCard` only when you have an existing MDX-style call shape to preserve.

### `@/components/ui/tooltip` vs `@/components/Tooltip`

The bare Radix tooltip (`@/components/ui/tooltip`) is hover-only and has no mobile fallback. The mobile-aware wrapper is `@/components/Tooltip` (no `ui/` prefix).

**Use `@/components/Tooltip`** unless you specifically need the bare Radix primitive (rare; mostly used inside `@/components/Tooltip` itself).

### `Dialog` from two different files

`@/components/ui/dialog` exports `Dialog`, `DialogContent`, etc. (vanilla shadcn-style).

`@/components/ui/dialog-modal` ALSO exports `Dialog`, `DialogContent`, etc. -- but those are **`tv`-styled, different from `dialog.tsx`**. Same names, different visuals.

**Within a feature, don't mix.** Pick one file as your dialog source. The default export from `dialog-modal` is `Modal` (the high-level convenience); use that when you can.

### Import heroes from `@/components/Hero`

Heroes are named exports of `@/components/Hero`: `PageHero` (the workhorse), `HubHero`, `HomeHero`. `PageHero` takes discrete props -- `breadcrumbs`, an optional `eyebrow`, an aside (`heroImg` **or** `heroComponent`, mutually exclusive), `title`, `description`, `buttons`, `variant`. `title` is always the `<h1>` -- there is no `header` prop (it was removed). (The former `MdxHero` was removed too -- use `PageHero` text-only with `variant="no-divider"`.)

### Image imports are camelCase -- but SVG-as-component can't be

Name raster image imports (`.png`/`.webp` used as `src` / `StaticImageData`) in **camelCase** (`heroImage`, `manDogCardImage`). SVGs are the exception: `@svgr/webpack` makes `import X from "foo.svg"` a **React component** rendered `<X />`, and JSX reads a lowercase-initial tag as a DOM element -- so a camelCase SVG import silently renders a bogus `<foo />` instead of the icon. To satisfy the camelCase convention _and_ render, either store the (camelCase) import in a **capitalized** field and destructure it (`{ Icon: robustImage }` -> `<Icon />`, e.g. in a data-driven `.map`), or import the URL form (`import robustImage from "foo.svg?url"`) and use `<Image src={robustImage} …>`. Don't reach for `?url` blindly -- it yields a plain URL string, so `<Image>` then needs explicit `width`/`height`.

## Component Behaviors You'd Miss

### `Button isSecondary` does nothing on `solid` and `link` variants

In `Button.tsx` lines 67-69, there's an early-out: `["solid", "link"].includes(variant || "solid")`. So `<Button isSecondary>...</Button>` (defaulting to `solid`) silently does nothing. `isSecondary` only takes effect on `outline` and `ghost` variants.

### `CardBanner fit="contain"` auto-clones a single child as a blurred backdrop

If you pass `<CardBanner fit="contain"><Image .../></CardBanner>` with **one** child, you get a blurred-bg + sharp-fg automatically (Card.tsx lines 95-119). Pass two children and you lose this magic.

### A bare `CardBanner` on a link card mismatches its corner radius

`Card`'s outer radius is `--card-pad + --banner-radius`, but a `CardBanner` rounds at only `--banner-radius`. Wrapping the banner in a `CardHeader` lets the `--card-pad` inset bridge the difference so the corners stay concentric. Drop the banner straight into `Card` (no header) on any padded size and the banner's squarer corners poke past the card outline; add an `href` and the variant-aware hover has no inset to breathe against. Only go bare with `size="xs"` (`--card-pad: 0`), where the two radii collapse to the same value. This bit the video / hackathon / story / latest card grids until their banners were wrapped in `CardHeader` (July 2026).

### `LinkBox` requires `LinkOverlay` somewhere inside

The whole-card-clickable pattern uses a `before:absolute` pseudo-element on `LinkOverlay`. Use `LinkBox` without `LinkOverlay` and the click-the-whole-card behavior breaks.

### `commonControlClasses` in `ui/checkbox.tsx` is shared by Switch

`Checkbox.tsx` exports a `commonControlClasses` constant that is also imported by `Switch`. Editing it changes both. If you're adjusting checkbox styling, you're adjusting switches too -- audit both before merging.

### `Stack`'s `separator` prop clones a separator between children

`<Stack separator={<hr className="border-t border-border" />}>` puts the separator element between every pair of children automatically. Useful pattern; many devs miss it and end up rendering separators manually.

## Styling Anti-Patterns

### `<div onClick>` for a clickable thing

No keyboard support, no `role`, no focus management. Use `<Button>` (or `<Button variant="ghost">` for icon-only) instead. If you really do need a non-button clickable, add `role="button"`, `tabIndex={0}`, and keyboard handlers -- but the answer is almost always "use Button."

### `<button>` with manual styling instead of `Button`

Same problem -- bypasses focus rings, hover states, and a11y baseline. Use `Button` from `@/components/ui/buttons/Button`, even for icon-only buttons (use `variant="ghost"` and `aria-label`).

### Reinventing a heading with a `<div>`

`<div className="text-5xl font-bold">Hello</div>` is wrong. Headings are styled by `base.css` defaults on `<h1>` through `<h6>`. Use the semantic tag and override sizes only when really needed -- with the `text-h1`-`text-h6` utilities (e.g. `<h2 className="text-h1">`), never a hand-reconstructed `text-3xl lg:text-4xl`. Those same `text-h*` utilities are also how you give a non-heading element a heading-level size.

### Inlining instead of composing

If you're writing `flex items-center gap-X rounded-Y border bg-... p-Z` to make a card, you're reinventing `<Card>`. If you're writing `text-Xxl font-bold` to make a numeric stat, you're reinventing `<BigNumber>` (which exists at `@/components/BigNumber`).

**Any time you reach for `className`, ask: "Is there a primitive that already does this?"** Some className use is fine (small overrides, layout adjustments), but every reach should raise the question. If you're chaining 4+ utilities to recreate something a primitive does, stop and use the primitive.

### Using `cva` for new components

The team prefers `tailwind-variants` (`tv`) for new and refactored work. No bulk migration of existing `cva` components -- swap to `tv` opportunistically when you're touching one for another reason. For _new_ components, always use `tv`.

## Hidden Side Effects

### Server / Client component composition is fine in both directions

A Server Component can render a Client Component (the boundary is established at the Client Component itself). A Client Component can also render Server Components passed in via `children` -- React Server Components support this composition.

Example: `ui/Link.tsx` is `"use client"`. `ui/card.tsx` is a Server Component that imports `BaseLink`. Using `<Card href="...">` from a Server-Component page is fine -- the client boundary lives at `BaseLink`, not at `Card` and not at the page.

Just be aware which side of the boundary you're on when adding hooks/effects.

### `Button` is `"use client"` because of click tracking and `scrollIntoView` (`toId` prop)

Static buttons get unnecessarily forced into client. Splitting would be invasive; for now, just know this is true.

### `Callout` consolidation is complete

The legacy `Callout.tsx`/`CalloutSSR.tsx` and `CalloutBanner.tsx`/`CalloutBannerSSR.tsx` client/server pairs were unified into a single server-renderable `Callout` at `@/components/ui/callout` (see `callout-walkthrough.md`). The root-level files were removed; don't reintroduce them. `BannerNotification` was absorbed into `Alert` as `variant="banner"` in May 2026 in the same direction-of-travel.

### Event tracking is automatic on `Button` and `Link`

`@/components/ui/Link.tsx` and `@/components/ui/buttons/Button.tsx` auto-fire Matomo events when `customEventOptions` is omitted (with sensible defaults). Manually wiring `trackCustomEvent` in a new component is usually unnecessary if you're using these primitives.

### A horizontal scroller in the article column pushes the ToC off-screen

`ContentLayout` lays the article and the ToC `<aside>` out as a flex row from `lg` up. The article is a flex item with the default `min-width: auto`, so it can never shrink below its content's **intrinsic minimum** -- and a horizontal scroller (`overflow-x-auto` around a wide tab row or a `min-w-*` table) still reports its full un-scrolled width there. `min-width` on the scroller does **not** help: it lowers a floor, it doesn't cap what the element contributes upward. The article then freezes at `max-w-4xl` and shoves the aside past the viewport edge, giving the whole page a horizontal scrollbar just above `lg`.

**Put `contain-inline-size` on the scroll container** (or a block-level wrapper of it) so it sizes as if it had no inline content. Two live examples: `StakingConsiderations` (wraps a `TabNav`) and the at-a-glance table in `app/[locale]/staking/page.tsx`. Don't apply it to an element that is itself a flex item in a shrink-to-fit context -- containment collapses it to zero width (this is why the fix can't live inside `TabNav`, whose wrapper is a flex item on `/developers/tutorials/`).

### `cn()` can silently drop a custom utility that looks like a Tailwind one

`cn()` runs `tailwind-merge`, which classifies classes by name pattern and keeps only the last of any conflicting pair. A project utility whose name shadows a native pattern gets mis-grouped: `text-h1`-`text-h6` read as **text-color**, so `cn("text-h2", "text-primary")` returned just `text-primary` and the heading silently rendered at its default size (this shipped in the staking option boxes). `bg-tint-*`/`bg-fade-*` had the same problem against `bg-color`.

Both are now taught to `tailwind-merge` in `src/lib/utils/cn.ts` via `extendTailwindMerge`. **Any new utility named like a native one needs a matching `classGroups` entry there** -- and if a class you passed to `cn()` seems to have no effect, check its group before touching the CSS.

### A `.flow` `<Section>` that is a flex/grid row silently offsets its items

The `.flow` rhythm adds `margin-top` to 2nd+ children of any section it scopes -- and its scope is a _descendant_ selector (`.flow section:not([data-flow="skip"])`), so it reaches **nested** sections too. A `<Section>` that is itself a flex/grid container (text+image row, card grid) therefore needs `data-flow="skip"`, or its image/2nd column gets pushed down within the row. Easy to miss on a nested section. See `spacing-typography.md`.

## Tokens That Aren't Real

These class names appear in `ui/select.tsx`, `ui/dialog.tsx`, `ui/dropdown-menu.tsx`, `ui/tabs.tsx` but are **NOT defined** in this project's tokens. They're stale shadcn defaults that don't resolve:

- `bg-popover`, `text-popover-foreground`
- `bg-accent`, `text-accent-foreground`
- `bg-muted`, `text-muted-foreground`
- `focus:ring-ring`, `ring-offset-background`

If you're touching one of these files, replace these with semantic tokens (see `tokens.md` and `cleanup-playbook.md`). Don't introduce new usage of these names.

## Internationalization Landmines

### Hard-coded `left-`/`right-`/`ml-`/`mr-`/`pl-`/`pr-` breaks RTL

Use logical equivalents: `inset-s-`, `inset-e-`, `ms-`, `me-`, `ps-`, `pe-`. The site supports Arabic and Urdu. The `ui/select.tsx` and `ui/dropdown-menu.tsx` files currently have a number of these violations; don't add more.

### `<Translation>` with a glossary link needs an `I18nProvider`

`<Translation>` server-renders fine on its own, but it turns a `/glossary/#term` link into `GlossaryTooltip` -- a `"use client"` component reading the `glossary-tooltip` namespace from the client context. So a page with a glossary-link `<Translation>` must wrap it in `I18nProvider` (carrying that namespace), even if it has no other client i18n. A plain `<a href="/foo">` does NOT trigger this. See `server-vs-client.md`.

### `toLocaleString` / `Intl.NumberFormat` without locale wrappers

Use `numberFormat()` from `@/lib/utils/numbers` and `dateTimeFormat()` from `@/lib/utils/date`. They handle Urdu/Arabic numbering systems and calendar correctly.

There's currently exactly one violation: `ui/chart.tsx:241`. Don't add more.

### Directional icons: use `ChevronNext` / `ChevronPrev`

Right-pointing arrows and chevrons that imply "forward" need to mirror in RTL. **`@/components/Chevron`'s `ChevronNext` and `ChevronPrev` are the way -- don't reinvent.**

```tsx
import { ChevronNext } from "@/components/Chevron"
return <ChevronNext className="size-4" />
```

Use `useRtlFlip` only when you need to flip a non-chevron directional icon (a curved arrow, etc.) where no project wrapper exists.

### Code blocks force LTR globally

`base.css` includes `pre:has(code) { direction: ltr; text-align: left; }`. This is intentional -- code is always read LTR. Don't fight it.

### Urdu uses `list-style-type: urdu` for ordered lists

Configured in `base.css` lines 97-107. Persian fallback. Triggered by `:lang(ur)`, not `dir`. Don't override.

### Bare `<ul>`/`<li>` inherit legacy global list styles

`base.css` still ships global `ul`/`ol` rules (start margin + `disc` markers, TODO-slated for removal) and a global `li` bottom margin. A non-prose `<ul>` (nav menu, card list) needs `m-0 list-none` on the `ul` and `m-0` on the `li`s or it renders indented with stray spacing. And once `list-none` removes the markers, Safari/VoiceOver drops list semantics -- add `role="list"` to keep the list announced.

## Heading Hierarchy

### One `<h1>` per page

`PageHero` and `HubHero` both render `<h1>`. Most React-page heroes do. Most markdown layouts auto-render the page `title` from frontmatter as the `<h1>`.

The `Static` layout now follows this same rule: it renders `frontmatter.title` as the `<h1>` through its hero (`PageHero` for normal pages, `HubHero` for the guides hub), so a markdown `# Title` in the body is **redundant** -- it's hidden via CSS (`**:[h1]:hidden` in `Static.tsx`) and the English content has had it removed. Do NOT add a `# Title` to Static markdown. (The CSS hide is transitional, covering non-English content that still carries the legacy `#` line until the pipeline strips it.)

### Eyebrow text in `HubHero` is rendered as `<h1>`

`HubHero` uses `<h1>` for its uppercase eyebrow when `title` is set. This is content-correct (the eyebrow IS the page title for SEO).

## Things Not Used Anymore

### `useColorModeValue` (`@/hooks/useColorModeValue`)

Chakra leftover, used in 5 places. Don't introduce new uses. Replace with Tailwind `dark:` variants when touching code that has it.

## Random Footguns

### `Tooltip` has `z-[10000]`

`@/components/Tooltip/index.tsx:115` uses `z-[10000]` instead of `z-tooltip` (1800). Should use the named token. Flagged for cleanup; don't replicate.

### `MdComponents` heading sizes are arbitrary

`MdComponents/index.tsx:47,59,74,89` overrides h1/h2 with `text-[2.5rem]`, `text-[2rem]`. These are markdown-specific sizing rules. Don't replicate the arbitrary values in non-markdown code.

### `MdComponents` uses `text-[2.5rem]` for the page title

This arbitrary "page title size" suggests we need a `--text-page-title` token (or a `Heading` primitive). Until that exists, the arbitrary value is the convention in markdown rendering. Don't copy it elsewhere -- `PageHero`'s title uses the scale (`text-3xl ... lg:text-6xl`), not `text-[2.5rem]`.

### `BigNumber` exists -- USE IT

`@/components/BigNumber` is a real component for prominent numeric displays. If you find yourself writing `<p className="text-4xl font-bold">$3000</p>`, you should be using `BigNumber` instead.

### `scroll-mt` is automatic on headings and sections

`base.css` applies `scroll-mt-32` to every `h1`--`h6` and `<section>`, so anchored navigation isn't clipped by the sticky nav. Don't hand-add `scroll-mt-*` to a heading or section, and don't carry over hacks like `scroll-mt-28` / `-scroll-mt-80` -- it's handled globally.
