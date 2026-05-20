# Internationalization & RTL

The site supports 25 languages, including **Arabic** and **Urdu** (RTL). Translations live in `src/intl/[locale]/` (JSON UI strings) and `public/content/translations/[locale]/` (markdown content). UI strings are managed through Crowdin.

## Translation

### Server Components (preferred)

```tsx
import { getLocale, getTranslations } from "next-intl/server"

export default async function Page() {
  const t = await getTranslations("page-namespace")
  const locale = await getLocale()
  return <h1>{t("page-title")}</h1>
}
```

### Client Components

```tsx
"use client"
import { useTranslations } from "next-intl"

export function Widget() {
  const t = useTranslations("widget-namespace")
  return <p>{t("widget-description")}</button>
}
```

### Never hard-code English

If a string is rendered to a user, it must come from a translation key. The exception is dev-only debug UI (e.g., `AB/TestDebugPanel`) and developer-facing internal copy.

If you find yourself wanting to hard-code, add the key to `src/intl/en/[namespace].json` and use `t()`.

## RTL: Logical CSS Properties

Always use logical equivalents instead of physical directions:

| Don't use | Use instead |
|---|---|
| `left-X` | `inset-s-X` |
| `right-X` | `inset-e-X` |
| `ml-X` | `ms-X` |
| `mr-X` | `me-X` |
| `pl-X` | `ps-X` |
| `pr-X` | `pe-X` |
| `border-l` | `border-s` |
| `border-r` | `border-e` |
| `text-left` | `text-start` |
| `text-right` | `text-end` |

Same for arbitrary values: `inset-s-[2rem]`, `me-[1.25rem]`, etc. (Note: prefer the standard spacing scale over arbitrary values regardless of direction -- see `references/spacing-typography.md`.)

### When physical positioning is fine

Only when the position genuinely doesn't depend on reading direction:
- Centered overlays: `left-1/2 -translate-x-1/2` (centered, not directional)
- Top/bottom positioning: `top-X`, `bottom-X` (vertical, not directional)
- Decorative elements that should look the same in LTR and RTL

If you're unsure, default to logical.

## Directional Icons

Right-pointing arrows and chevrons that imply "forward" need to mirror in RTL.

### Pattern: `useRtlFlip`

```tsx
"use client"
import { useRtlFlip } from "@/hooks/useRtlFlip"
import { cn } from "@/lib/utils/cn"
import { ChevronRight } from "lucide-react"

export function NextLink() {
  const { twFlipForRtl } = useRtlFlip()
  return <ChevronRight className={cn("size-4", twFlipForRtl)} />
}
```

`twFlipForRtl` returns `"-scale-x-100"` in RTL locales, `""` otherwise.

### Pattern: pre-flipped icons

For the most common directional icons, the project provides RTL-aware wrappers:

```tsx
import { ChevronNext, ChevronPrev } from "@/components/Chevron"
```

These automatically flip in RTL. Prefer them over the raw Lucide chevrons.

### Icons that should NOT flip

Some icons are non-directional even when they look it:
- A "send" airplane icon -- universal, don't flip
- A "play" triangle -- always points to "next" but conventionally not flipped
- Spinners, loaders -- circular motion, don't flip
- Anything with built-in mirror symmetry

## Locale-Aware Formatting

### Numbers

```tsx
import { numberFormat } from "@/lib/utils/numbers"

const formatted = numberFormat(locale, { maximumFractionDigits: 2 }).format(1234.5678)
// In Urdu: "۱٬۲۳۴٫۵۷"  (uses arabext numerals)
// In Arabic and other locales: "1,234.57"  (latn numerals)
```

`numberFormat` wraps `Intl.NumberFormat` with the right numbering system rules: Urdu (`ur`) uses `arabext`; everything else uses `latn`. (Arabic does NOT use `arab` numerals in this project.)

**Never use** `Intl.NumberFormat` or `value.toLocaleString()` directly -- they don't enforce the project's numbering-system rules.

### Dates

```tsx
import { dateTimeFormat } from "@/lib/utils/date"

const formatted = dateTimeFormat(locale, { dateStyle: "medium" }).format(new Date())
// Handles calendar (Hijri for Arabic), numbering system, locale-correct ordering
```

**Never use** `Intl.DateTimeFormat`, `.toLocaleDateString()`, or `.toLocaleTimeString()` directly.

## Language-Specific Behaviors

### Code blocks force LTR globally

`base.css` includes:

```css
pre:has(code) {
  direction: ltr;
  text-align: left;
}
```

Code is always read LTR, even inside an RTL document. Don't fight this -- it's intentional. If you need to override the direction of a non-code element inside an RTL context, use `dir="ltr"` explicitly.

### Urdu uses native numerals for ordered lists

`base.css` lines 97-107:

```css
:lang(ur) ol {
  list-style-type: urdu;
  /* Persian fallback */
}
```

Triggered by `:lang(ur)`, not `dir`. Don't override this in components.

### Verbose languages can overflow

German, Spanish, French, and others can produce significantly longer strings than English. Avoid:
- Fixed widths on text containers
- `whitespace-nowrap` on UI labels (unless it's part of the design intent and you've tested across locales)
- Heading sizes without responsive breakpoints

Test with the language picker; the dev server supports locale switching.

## BiDi (Bidirectional) Text Handling

When inserting LTR-only chunks (numbers, units, math expressions, code identifiers, URLs) into a paragraph that may render in an RTL locale, the chunk can flip or scramble unless explicitly marked.

For markdown content, the `intl-pipeline` handles BiDi wrapping automatically. **For React components rendering mixed-direction text, you need to wrap the LTR-only chunks yourself.**

### Pattern

```tsx
// Number with unit: "5.6 GB" should always read left-to-right, even in RTL paragraph
<p>{t("storage-line", { size: <span dir="ltr">5.6 GB</span> })}</p>

// Math expression: "2 + 2 = 4"
<span dir="ltr">2 + 2 = 4</span>

// Code identifier in prose: "the function calculateGas() returns..."
<span dir="ltr">calculateGas()</span>
```

### When to wrap

- Numbers with units (`5.6 GB`, `100 ETH`, `42°F`)
- Math expressions
- Code/identifier references in prose
- URLs displayed inline
- Any LTR-only token that might end up adjacent to RTL-locale text

### When NOT to wrap

- Pure-text content -- it'll inherit the document direction correctly
- Numbers used purely for display (e.g., a stat in a `BigNumber`) where the surrounding context is also a number; the formatter handles direction
- Inside `<pre>` / `<code>` blocks -- already force-LTR by `base.css`

## Translatable Strings: Where They Go

### UI strings (buttons, labels, alerts, placeholders)

`src/intl/[locale]/[namespace].json` -- managed via Crowdin.

When adding a new key:
1. Add to `src/intl/en/[namespace].json` (English source of truth)
2. The translation pipeline picks it up
3. Reference via `t("namespace.key")` (where namespace is the file basename)

### Markdown content

`public/content/translations/[locale]/[path]` -- one tree per language.

**Don't manually edit non-English markdown files.** The intl-pipeline propagates English changes; manual edits get overwritten.

### Heading IDs

H1-H4 headings in markdown require a custom `{#lower-kebab-id}`. Enforced by markdownlint pre-commit hook. Run `pnpm lint:md:fix` to auto-add.

## Common Mistakes

- Using `left-`/`right-`/`ml-`/`mr-`/`pl-`/`pr-` for layout (use logical equivalents)
- Hard-coding English in JSX
- `value.toLocaleString()` -- use `numberFormat()`
- `new Date().toLocaleDateString()` -- use `dateTimeFormat()`
- Right-pointing chevrons without `useRtlFlip` (or use `ChevronNext` from `@/components/Chevron`)
- Manually editing translated markdown files -- let the pipeline propagate
- Adding `whitespace-nowrap` without considering verbose-language overflow
