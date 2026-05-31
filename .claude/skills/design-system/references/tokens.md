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

Existing named gradient utilities include `bg-gradient-main`, `bg-card-gradient`/`-secondary`/`-secondary-hover`, `bg-radial-a`/`bg-radial-b`, `bg-gradient-banner`, `bg-banner-grid-gradient`, `bg-gradient-staking`. **Always check `utilities.css` for an existing one before writing any `bg-linear-*` / `from-*` / `to-*` chain.** A multi-stop gradient typed inline at a call site is a red flag - it almost always belongs in a named utility.

Gradients are the highest-duplication area of the styling system (the same recipe gets hand-copied dozens of times). The full inventory is in `docs/gradient-audit.md`; a Storybook story lives at `src/styles/gradients.stories.tsx` (Design System / Gradients). The codebase is converging on a small, **closed** set of named gradient utilities - one class per gradient, with everything baked into the definition.

#### How to reason about a gradient (decision ladder)

Walk down until one fits:

1. **A single design gradient reused across pages?** -> named `@utility` backed by CSS vars (the `bg-radial-a` pattern). Light/dark is handled for free by redefining the var under `.dark`.
2. **Same shape, our-brand hue varies (tints/washes)?** -> use a named utility from the closed set (e.g. `bg-tint-accent-a`). The hue is encoded in the class name from an approved list - **never** a free argument and **never** re-spelled inline.
3. **Owned by a specific component?** -> the component variant *applies* the named utility (e.g. `Card decoration="accent-a"` maps to `bg-tint-accent-a`). It does not redeclare the gradient. The utility is the single source of truth.
4. **Genuine one-off / external brand color?** -> see the hex policy below.
5. **A transparent->opaque fade/mask?** -> not a color decision; it's a mask utility. Leave it; out of scope for the color system.

#### The rules the closed set enforces (don't break them at a call site)

- **No our-brand hex.** Hex (`from-[#...]`) is an absolute last resort, permitted **only** to match an exact *external* brand color (wallet logos, community-hub city brands). Anything representing *our* brand uses semantic tokens (`accent-a/b/c`, `primary`, `body`) with the alpha modifier (`from-accent-a/10`).
- **Compass directions only.** The 8 keyword directions (`to-t/tr/r/br/b/bl/l/tl`). No custom angles (`bg-linear-65`) - they add clutter without earning their keep.
- **Stops at 0% / 50% / 100% only.** No arbitrary stop positions (`from-20%`, `to-97%`, `from-[60%]`).
- **One shared opacity ramp**, theme-aware via CSS vars - not re-chosen per use.
- **RTL.** Vertical gradients (`to-t`/`to-b`) are RTL-safe. Directional gradients (horizontal/diagonal fades) must flip for RTL - bake the flip into the utility definition so consumers never hand-write `rtl:from-... rtl:to-...`.

#### Shape of a token gradient utility (repo-idiomatic)

Color triplets are comma-separated; apply alpha with `hsla(var(--token), <alpha>)`. Put the opacity ramp in theme-aware vars so dark mode flips automatically:

```css
/* semantic-tokens.css */
:root { --tint-from: 0.05; --tint-to: 0.10; }
.dark { --tint-from: 0.10; --tint-to: 0.20; }

/* utilities.css */
@utility bg-tint-accent-a {
  background-image: linear-gradient(to bottom,
    hsla(var(--accent-a), var(--tint-from)),
    hsla(var(--accent-a), var(--tint-to)));
}
```

For an external brand color (the hex exception), only the hue varies - pass it as a custom property and keep direction/opacity/dark locked in the definition (`color-mix` applies the ramp to an arbitrary hex):

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

> Why a closed named set rather than one open functional (`bg-tint-*` with `--value()`) utility? A functional utility accepts *any* hue, which just relocates the inconsistency to the call site. A fixed list of named utilities is constrained by design - you can only apply an approved one. Reserve parameterization for the genuinely open dimension (external brand hue), and lock everything else.

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

Headings (`<h1>` through `<h6>`) get sizing and `font-bold` from `base.css`:
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
- **A new gradient** → `utilities.css` as `@utility`, referencing foundational/semantic vars. First walk the gradient decision ladder above and confirm an existing utility doesn't already cover it. Follow the closed-set rules (no our-brand hex, compass directions only, 0/50/100 stops, shared opacity ramp, RTL-flipped if directional).
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
