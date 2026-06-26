# Design Tokens (Tailwind v4, CSS-first)

The project does NOT have a `tailwind.config.ts`. Tokens are defined in CSS using Tailwind v4's `@theme` directive. Anyone reaching for `tailwind.config.ts` is working from outdated info.

## File Layout

`src/styles/global.css` is the single CSS entrypoint. It imports the Tailwind base + project token files in this fixed order:

```
colors.css            # Foundational palette (raw HSL triplets in CSS vars)
semantic-tokens.css   # Semantic abstraction layer (light + dark mode mappings)
theme.css             # @theme inline -- registers tokens into Tailwind utilities
base.css              # Element defaults (h1-h6 sizing, body, links, code blocks)
utilities.css         # @utility directives for things @theme can't express
docsearch.css         # Vendor CSS for the Algolia DocSearch plugin
```

Order matters: foundational palette -> semantic abstraction -> Tailwind registration -> element defaults -> custom utilities. Don't reorganize without understanding the cascade.

## The Three-Layer Token Architecture

### Layer 1: Foundational Palette (`colors.css`)

Raw color values. HSL triplets stored as CSS custom properties:

```css
--gray-50: 0 0% 98%;
--gray-100: 0 0% 96%;  /* TODO: Confirm */
--purple-600: 264 70% 50%;
--blue-500: ...;
```

These are *foundational* -- they don't change with light/dark mode. Reach for them only when a semantic token doesn't exist (rare, and a last resort).

Available palettes: gray (50-950), purple (50-900), blue, pink, teal, yellow, red, green, orange (100/800/900 only), amber-500, cyan-500.

### Layer 2: Semantic Abstraction (`semantic-tokens.css`)

This is where you get colors for Claude-driven work. Light mode in `:root`, dark mode in `.dark`:

```css
:root {
  --body: var(--gray-900);
  --background: var(--gray-50);
  ...
}
.dark {
  --body: var(--gray-50);
  --background: var(--gray-900);
  ...
}
```

#### Semantic token catalog

**Text:**
- `--body` (default text)
- `--body-medium` (secondary text)
- `--body-light` (tertiary text)
- `--body-inverse` (text on dark surfaces)

**Backgrounds:**
- `--background` (page bg)
- `--background-highlight`
- `--background-low`
- `--background-medium`
- `--background-high`

**Borders:**
- `--border`
- `--border-high-contrast`
- `--border-low-contrast`
- `--border-hover`

**Primary:**
- `--primary`
- `--primary-high-contrast`
- `--primary-low-contrast`
- `--primary-hover`
- `--primary-visited`
- `--primary-action`
- `--primary-action-hover`

**Accents** (used for variation, e.g., `CardBanner background="accent-a"`):
- `--accent-a` / `--accent-a-hover`
- `--accent-b` / `--accent-b-hover`
- `--accent-c` / `--accent-c-hover`

**Status:**
- `--success` / `--success-light` / `--success-dark` / `--success-border`
- `--error` / `--error-light` / `--error-dark` / `--error-border`
- `--warning` / `--warning-light` / `--warning-dark` / `--warning-border`

**Domain-specific:**
- `--staking-gold` / `--staking-green` / `--staking-blue` / `--staking-red` (with `-fill` variants)

**Gradients** are not semantic-token CSS vars -- they're `@utility` classes in `utilities.css` (see "Gradient backgrounds" below).

**Shadows** are not CSS-variable tokens. Elevation uses the Tailwind default scale (`shadow-md`/`-lg`/`-xl`); the only custom utilities in `utilities.css` are `shadow-primary-xl` and `shadow-primary-no-blur-*` (plus the `hover-lift-*` composites). Don't add new custom shadows -- see the rule in SKILL.md.

### Layer 3: Tailwind Registration (`theme.css`)

The `@theme inline` block registers tokens as Tailwind utilities:

```css
@theme inline {
  --color-body: hsla(var(--body));
  --color-background: hsla(var(--background));
  ...
}
```

`inline` is critical: it tells Tailwind NOT to resolve the variable at build time. The `hsla(var(--body))` call resolves at runtime, which is what makes light/dark mode work via the `.dark` class on a parent.

This file also registers:
- **Custom breakpoints** (NOT Tailwind defaults):
  - `sm: 480px`
  - `md: 768px`
  - `lg: 992px`  ← non-Tailwind-default
  - `xl: 1280px`
  - `2xl: 1536px`
- **Canonical radius**: `--radius-base` (`= var(--radius-2xl)`, 1rem). Use the `rounded-base` utility as the default corner radius for cards, list/table containers, banners, and most rounded surfaces -- prefer it over reaching for `rounded-2xl`/`rounded-xl`/`rounded-3xl` directly. (`--radius-4xl: 2rem` is no longer a custom override -- Tailwind v4 ships `4xl` in its default scale, so `rounded-4xl` still works for the larger full-bleed/hero surfaces that intentionally use it.)
- **Animations**: `--animate-spin-30`, `--animate-pulse-light`, `--animate-fade-in`, `--animate-blink`, etc.

> **Spacing**: Tailwind v4 generates fractional spacing classes automatically (e.g., `mt-3.5`, `mt-7.5`, `inset-s-3.75`). The custom `--spacing-7_5`, `--spacing-10_5`, etc. defined in this file may be vestigial from v3 and worth verifying as a cleanup item. Don't rely on the underscore notation -- use the v4 native fractional syntax (`mt-7.5`, not `mt-7_5`).

### Layout spacing tokens (`page`, `space`, `hero`)

Beyond the numeric scale, `theme.css` registers three *named, responsive* spacing families (fed by CSS vars in `base.css`). Prefer these over raw `px-4 md:px-8` chains or arbitrary `p-(--var)`/`calc(var(--var)*N)` for the metric they own -- they keep page padding and vertical rhythm coherent from a single variable:

| Family | CSS var (`base.css`) | Responsive value | Utilities | Use for |
|---|---|---|---|---|
| `page` | `--page-pad` | 1rem mobile / 2rem (`md`) | `p-page`, `px-page`, `pb-page`, `gap-page`, `*-page-2x` | standard page/section horizontal padding |
| `space` | `--space` | 1rem mobile / 1.5rem (`lg`) | `mt-space`, `gap-space`, `space-y-space-2x`, `*-space-half/-2x/-3x/-4x` | the `.flow` rhythm unit, used manually outside a flow region |
| `hero` | `--hero-pad` | 2rem | `p-hero`, `px-hero`, `py-hero-2x`, `pe-hero`, `*-hero-half/-1.5x/-2x/-3x` | `PageHero` internal padding |

`.flow` applies the `space` unit automatically (see `spacing-typography.md`); the explicit `space` utilities are for manual gaps/margins. These are the canonical layout-spacing system -- distinct from the vestigial `--spacing-7_5`-style numeric tokens noted above.

## Custom Utilities (`utilities.css`)

Things `@theme` can't express are defined as `@utility` directives:

### Named z-index scale

Use these instead of arbitrary `z-[N]` values:

| Utility | Value |
|---|---|
| `z-hide` | -1 |
| `z-base` | 0 |
| `z-docked` | 10 |
| `z-dropdown` | 1000 |
| `z-sticky` | 1100 |
| `z-banner` | 1200 |
| `z-overlay` | 1300 |
| `z-modal` | 1400 |
| `z-popover` | 1500 |
| `z-skipLink` | 1600 |
| `z-toast` | 1700 |
| `z-tooltip` | 1800 |

### Gradient backgrounds

**One-off design gradients** are named `@utility` classes: `bg-linear-primary`, `bg-linear-secondary`, `bg-linear-tertiary`, and `bg-radial-primary`. **Always check `utilities.css` for an existing one before writing any `bg-linear-*` / `from-*` / `to-*` chain.** A multi-stop gradient typed inline at a call site is a red flag - it almost always belongs in a utility.

For subtle **brand-hue washes** behind content, use the `bg-tint-*` / `bg-fade-*` family (below) - do not write a new named utility per color. A Storybook story lives at `src/styles/gradients.stories.tsx` (Design System / Gradients).

#### How to reason about a gradient (decision ladder)

Walk down until one fits:

1. **A single design gradient reused across pages?** -> a named `@utility` (the `bg-linear-*` / `bg-radial-primary` pattern), with direction, stops, and light/dark baked into the definition (the `dark:` variant lives in the utility, not at the call site).
2. **A subtle brand-hue wash behind content?** -> the `bg-tint-*` (vertical) / `bg-fade-*` (horizontal) family. `*` is a theme color token (`accent-a/b/c`, `primary`, ...) resolved via `--value(--color-*)`, so it's constrained to the palette - **never** a free hex, **never** re-spelled inline.
3. **Owned by a specific component?** -> the component variant *applies* the utility (e.g. `CardBanner background="accent-a"` maps to `bg-tint-accent-a`). It does not redeclare the gradient.
4. **Genuine one-off / external brand color?** -> see the hex policy below.
5. **A transparent->opaque fade/mask?** -> not a color decision; it's a mask utility. Leave it; out of scope for the color system.

#### The `bg-tint-*` / `bg-fade-*` wash family

A single engine (`gradient-core` in `utilities.css`) holds the gradient body + light/dark variants; `bg-tint-*` and `bg-fade-*` are thin `@apply` wrappers differing only in direction and dark behavior. Always layer a wash over a solid base (`bg-background`) - `cn()` is configured (`extendTailwindMerge` in `src/lib/utils/cn.ts`) so the wash doesn't collide with `bg-background` and drop it.

| Class | Effect |
|---|---|
| `bg-tint-<color>` | Vertical wash (to bottom). |
| `bg-fade-<color>` | Horizontal wash (to right); dark stops inverted vs tint. |
| `…/N` modifier | Base opacity % (default 5). Stops add fixed offsets: light `n / n+10`, dark `n+5 / n+15` - constant interval at any base. |
| `from-* to-*` | Native Tailwind stop positions (e.g. `from-25% to-75%`); omit for a full fade. |
| `gradient-reverse` | Flip direction 180deg (tint -> to top, fade -> to left). |
| `gradient-use-light` | Render dark mode at the lighter intensities - use when the boosted dark wash hurts text contrast. |
| `gradient-use-dark` | Render light mode at the dark intensities. |
| `[--grad-*]` inline | Fine-tune a stop offset or `--grad-angle` for a one-off. |

Examples: `bg-background bg-tint-accent-b`, `bg-background bg-fade-primary/8 gradient-reverse`, `bg-background bg-tint-accent-c gradient-use-light`.

#### Rules (don't break them at a call site)

- **No our-brand hex.** `from-[#...]` is a last resort, permitted **only** to match an exact *external* brand color (wallet logos, community-hub city brands). Our brand uses tokens (`accent-a/b/c`, `primary`, `body`).
- **Use the family; don't hand-build washes.** Don't reconstruct `bg-linear-* from-accent-a/10 to-...` at a call site - that's what `bg-tint-*`/`bg-fade-*` are for. Direction comes from the family (+ `gradient-reverse`); the opacity ramp is shared, not re-chosen per use.
- **RTL.** `bg-tint-*` is vertical -> RTL-safe. `bg-fade-*` is horizontal/directional -> confirm the direction reads correctly in Arabic/Urdu.

#### External brand color (the hex exception)

When only the hue varies and it's a genuine external brand, pass it as a custom property and keep direction/opacity/dark locked in a dedicated utility (`color-mix` applies the ramp to an arbitrary hex):

```css
@utility bg-brand-tint {
  background-image: linear-gradient(to bottom,
    color-mix(in srgb, var(--brand-color) 5%, transparent),
    color-mix(in srgb, var(--brand-color) 10%, transparent));
}
```
```tsx
<div className="bg-brand-tint" style={{ "--brand-color": brandHex } as CSSProperties} />
```

> Why a functional `bg-tint-*` (with `--value(--color-*)`) rather than a hardcoded class per color? It stays constrained - `--value(--color-*)` only resolves existing palette tokens, so an arbitrary hue can't sneak in, and the recipe lives once in `gradient-core` instead of being copied per color. The closed set is enforced by the palette, not by a hand-maintained list of near-identical utilities. The one genuinely open dimension (external brand hex) gets the `bg-brand-tint` pattern above.

#### Gradient-border ring (`gradient-ring-*`)

A separate utility for a **1px gradient *border*** (not a fill wash). It paints `bg-background` over a rounded box and lays a 1px-larger gradient `::before` behind it (`z-hide`), so only a 1px ring shows along the top and sides; **the bottom edge is intentionally open**.

- **Color from the name**, radius from an optional `/modifier` (default `4xl`): `gradient-ring-accent-a`, `gradient-ring-primary-hover`, `gradient-ring-accent-a/3xl`, `gradient-ring-primary/[1.25rem]`. Color is `--value(--color-*)` (palette-constrained, like the washes).
- **The radius is also applied to the first child**, so the inner surface needs no `rounded-*` of its own.
- Opacity stops are **fixed** (24/8 light, 40/20 dark) -- you choose the hue, not the translucency.

Demo: the `GradientRing` story in `src/styles/gradients.stories.tsx`. Reach for it instead of hand-rolling the `before:-inset-px before:rounded-[calc(...)]` pattern at a call site.

Gotchas:

- **`overflow-hidden`/`overflow-clip` ancestors clip the ring** -- the `::before` bleeds 1px outside the box, so a clipping ancestor eats the border. The most common failure.
- **A color token is mandatory** -- `gradient-ring` alone (no color) generates nothing; there is no default hue.
- **`& > :first-child` rounds the *first direct child* only** -- if the visual surface isn't the first child (wrapper div, multiple top-level children, a Fragment that reshapes the DOM), the corner clip lands on the wrong element.
- **It owns the element's background** (`bg-background`) and relies on the `::before` sitting at `z-index: -1` behind it -- drop it on an element that needs a *different* background and the trick breaks.

### Grid templates

For responsive card/item grids, use the **`Grid` component** (`@/components/ui/grid`) -- it wraps the `grid-cols-auto-*` utility with `columns`, `size`, and `fit` variants. See `components.md`.

`grid-cols-auto-N` (N = max columns, any integer) is a functional utility: at most N columns, each at least `--grid-item-min` wide (default `18rem`), folding to fewer columns as the viewport narrows. Set `--grid-repeat: auto-fit` to collapse empty tracks (default is `auto-fill`). `grid-cols-bento` covers the 12-col bento layout. Plus staking-specific grid templates.

The enumerated `grid-cols-fill-N` / `grid-cols-fit-4` utilities are legacy (pre-`Grid`); existing usages are being migrated to `Grid`. Don't use them for new work.

### Misc

`underline-offset-3`, `animate-pause`.

## Arbitrary Values: Priority Order

Tailwind v4 lets you bypass the scale with arbitrary syntax (`p-[12px]`, `mt-[1.5rem]`, `inset-s-[8px]`). **Avoid this.** The standard scale and its fractional values cover most needs.

Priority order for spacing/sizing values (best to worst):

1. **Standard scale** -- `mt-3`, `mt-8`, `inset-s-4`. Use whenever possible.
2. **Fractional scale (v4 native)** -- `mt-3.5`, `inset-s-3.75`. If you genuinely need a fractional value.
3. **Arbitrary syntax with token-derived values** -- `inset-s-[15px]` is poor when `inset-s-3.75` would do the same thing. Same for `inset-s-[0.875rem]` vs `inset-s-3.5`.
4. **Arbitrary syntax with novel values** -- last resort, only when nothing else fits.

A `[Xpx]` or `[Xrem]` arbitrary in a className is a red flag. It's almost always a token waiting to be used. Same for arbitrary border, radius, and other values.

The exceptions are genuinely arbitrary cases:
- `w-[calc(100%-2rem)]` -- calc expressions
- `aspect-[3/2]` -- aspect ratios that don't have a token
- `grid-cols-[200px_1fr]` -- but for responsive card/item grids use the `Grid` component (or its `grid-cols-auto-*` utility), and `grid-cols-bento` for the bento layout. See "Grid templates" above.

## Dark Mode

Dark mode is class-based. The `@custom-variant dark (&:where(.dark, .dark *))` directive in `global.css` defines the variant. The `.dark` class lives on a parent (typically `<html>` or `<body>`).

To use dark-mode-specific overrides on a property that doesn't have a semantic token:

```tsx
<div className="bg-white dark:bg-gray-900" />  // OK if no semantic token fits
<div className="bg-background" />              // Better -- token swaps automatically
```

The `useColorModeValue` hook (Chakra leftover) is **deprecated**. Don't introduce new uses; replace with `dark:` variants when touching code that has it.

## Element Defaults (`base.css`)

`<body>` automatically gets `bg-background font-body leading-base text-body`. You don't need to repeat these on top-level page wrappers.

Headings (`<h1>` through `<h6>`) get sizing and `font-black` from `base.css`. Sizing comes from the `text-h1`-`text-h6` utilities in `src/styles/utilities.css`, which `base.css` `@apply`s to each tag (size + line-height only -- the `font-black` is applied separately):
- `<h1>` -> `text-h1` (`text-4xl lg:text-5xl`)
- `<h2>` -> `text-h2` (`text-3xl lg:text-4xl`)
- `<h3>` -> `text-h3` (`text-2xl lg:text-3xl`)
- `<h4>` -> `text-h4` (`text-xl lg:text-2xl`)
- `<h5>` -> `text-h5` (`text-md lg:text-xl`)
- `<h6>` -> `text-h6` (`text-sm lg:text-md`)

This means `<h1>Hello</h1>` already looks correct. Writing `<div className="text-5xl font-bold">Hello</div>` is reinventing -- and it loses semantics. To make any element match a heading level's size, apply the `text-h*` utility (e.g. `text-h2`) rather than hand-reconstructing the responsive pair -- see `references/spacing-typography.md` "Heading Sizes."

`<a>` tags get `text-primary` + underline + `focus-visible` outline.

`<pre>`, `<code>`, `<kbd>`, `<samp>` get `font-monospace text-base`. Code blocks (`pre:has(code)`) are also force-LTR globally so RTL languages don't flip code.

## Stale shadcn Token Names (DO NOT USE)

These appear in `ui/select.tsx`, `ui/dialog.tsx`, `ui/dropdown-menu.tsx`, `ui/tabs.tsx` but are **NOT defined** in this project's tokens. They're vestigial shadcn defaults from the migration:

- `bg-popover` → use `bg-background-highlight` or appropriate semantic
- `text-popover-foreground` → `text-body`
- `bg-accent` / `text-accent-foreground` → use semantic accent tokens
- `text-muted-foreground` → `text-body-medium`
- `bg-muted` → `bg-background-medium` or appropriate
- `focus:ring-ring` → use the project's focus-visible pattern
- `ring-offset-background` → use `bg-background`

If you're touching one of these primitives, replace the stale tokens. See `cleanup-playbook.md`.

## Where to Add a New Token

Decide based on what you're adding:

- **A new semantic color** → `semantic-tokens.css` (must include both light and dark values), then register in `theme.css`'s `@theme inline` block.
- **A brand-hue wash** → use the `bg-tint-*` / `bg-fade-*` family; don't add a new utility. **A new one-off design gradient** → `utilities.css` as `@utility`, referencing foundational/semantic vars (no our-brand hex, light/dark + RTL baked into the definition). First walk the gradient decision ladder above and confirm an existing utility doesn't already cover it.
- **A new custom spacing/radius/breakpoint** → `theme.css` (under `@theme inline`).
- **A foundational color** → `colors.css` (only if a new hue family is being added; rare).

Don't add raw hex values to component className. If a color doesn't exist as a token, add it to the token system first.

## Common Mistakes

- Hard-coding `#hex` or `rgb(...)` in component classes -- use semantic tokens
- Reaching for `text-gray-900` / `bg-white` -- use `text-body` / `bg-background` so dark mode works
- Using `z-[10000]` or other arbitrary z-index values -- use the named `z-*` scale
- Inlining a multi-stop `bg-linear-to-br from-[#...]` -- check `utilities.css` for an existing gradient first
- Assuming `lg` is `1024px` -- it's `992px` in this project
- Using `theme()` function in CSS -- deprecated in Tailwind v4; use `var()` references
