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

**Gradients & shadows** also live here (`--radial-a`, `--card-gradient`, `--gradient-main`, complex shadows).

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
- **Custom radii**: `--radius-4xl: 2rem`
- **Animations**: `--animate-spin-30`, `--animate-pulse-light`, `--animate-fade-in`, `--animate-blink`, etc.

> **Spacing**: Tailwind v4 generates fractional spacing classes automatically (e.g., `mt-3.5`, `mt-7.5`, `inset-s-3.75`). The custom `--spacing-7_5`, `--spacing-10_5`, etc. defined in this file may be vestigial from v3 and worth verifying as a cleanup item. Don't rely on the underscore notation -- use the v4 native fractional syntax (`mt-7.5`, not `mt-7_5`).

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

`bg-gradient-main`, `bg-card-gradient-secondary`, `bg-radial-a`, `bg-ten-year-gradient`. Use these instead of inlining a multi-stop `bg-linear-to-br from-[#...] via-[#...] to-[#...]`.

### Grid templates

`grid-cols-bento`, `grid-cols-fill-3`, `grid-cols-fill-4`, `grid-cols-fill-8`, `grid-cols-fill-10`, `grid-cols-fit-4`. Plus staking-specific grid templates.

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
- `grid-cols-[200px_1fr]` -- but check the custom `grid-cols-*` utilities above first; `grid-cols-bento`, `grid-cols-fill-N`, `grid-cols-fit-4` already exist for common cases

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

Headings (`<h1>` through `<h6>`) get sizing and `font-black` from `base.css`:
- `<h1>`: `text-4xl lg:text-5xl`
- `<h2>`: `text-3xl lg:text-4xl`
- `<h3>`: `text-2xl lg:text-3xl`
- `<h4>`: `text-xl lg:text-2xl`
- `<h5>`: `text-lg`
- `<h6>`: `text-base`

This means `<h1>Hello</h1>` already looks correct. Writing `<div className="text-5xl font-bold">Hello</div>` is reinventing -- and it loses semantics.

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
- **A new gradient** → `utilities.css` as `@utility`. Reference foundational/semantic vars.
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
