# Walkthrough: "I Need a Callout"

A worked example of using the design system correctly when adding an in-content callout — a card-shaped block with an optical anchor (image or emoji), title, description, and optional CTA buttons.

## Step 1: Confirm it's a `Callout`

`Callout` is one of several similar-looking primitives. Pick by what you're actually building:

- **Card-shaped promotional/educational block, with image/emoji at the top, title, description, and 0–2 CTA buttons** → `Callout`
- **Linkable summary card in a grid (list of things)** → `Card`
- **In-prose notice or warning** → `<Alert variant="info|warning|error|success|update">`
- **Top-of-page full-bleed ribbon** → `<Alert variant="banner">`
- **Whole-card-clickable wrapper around arbitrary content** → `LinkBox` + `LinkOverlay`

If you're tempted to inline `flex flex-col rounded-2xl bg-gradient-to-r ... p-8` with an `<img>` overhang, you're reinventing `Callout`.

## Step 2: Compose `Callout`

The default export covers the common shape:

```tsx
import Callout from "@/components/ui/callout"
import { ButtonLink } from "@/components/ui/buttons/Button"

<Callout
  image={someImage}
  alt="Stylized illustration"
  title={t("page-x-callout-title")}
  description={t("page-x-callout-description")}
>
  <ButtonLink href="/...">{t("page-x-callout-cta")}</ButtonLink>
</Callout>
```

### What's happening

- `Callout` wraps `CalloutRoot` (the `<aside>`) → optional `CalloutBanner` → `CalloutContent` → `CalloutTitle` + `CalloutDescription` + optional `CalloutButtons`.
- `image` is the optical anchor at the top. It overflows the gradient card via paired `mt-24` (reservation) / `-mt-24` (banner offset) so the image floats above. The reservation is gated to `@max-3xl/callout` and only applies when a banner is present (so emoji-only callouts don't reserve space).
- `title` and `description` are literal strings — the call site resolves intl. Do **not** reintroduce `titleKey` / `descriptionKey` props; those were removed during unification.
- Children render inside `CalloutButtons`. The buttons slot uses `mt-auto pt-8` so it pins to the bottom of the content area.

## Step 3: Banner shape — image vs emoji

One optical anchor at a time, enforced by the `BannerProp` discriminated union:

```ts
{ image?: ImageProps["src"]; emoji?: never }
| { image?: never; emoji?: string }
```

- `image` renders a `<CalloutBanner>` with the image. Banner area reserves 96px above the gradient card for the overlap effect.
- `emoji` renders a `<CalloutEmoji>` *inside* the content area (no banner). The aside skips the 96px reservation entirely (via `has-[[data-label=callout-banner]]:` gate), so the gradient card sits flush at the top.
- Pass neither for a content-only callout.

## Step 4: Side-by-side equalization (automatic)

When two or more `<Callout>`s share a parent at `md+` viewport, banners pin to a 16rem min-height (256px) and buttons bottom-align across cards via `mt-auto`. Single callouts and stacked callouts (below `md`) retain natural banner height.

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  <Callout image={...} title={...} description="Short copy.">
    <ButtonLink href="#">A</ButtonLink>
  </Callout>
  <Callout image={...} title={...} description="A much longer description that wraps to multiple lines.">
    <ButtonLink href="#">B</ButtonLink>
  </Callout>
</div>
```

The equalization rule lives on `CalloutBanner` as:

```
@max-3xl/callout:md:[aside:not(:only-child)_&]:min-h-64
```

— "inside a small-container layout, at `md+` viewport, when the wrapping aside has a sibling aside, pin banner to 16rem." The `md:` gate is hardcoded to Tailwind's default 768px breakpoint, which matches the `md:grid-cols-2` pattern used across `gas`, `learn`, `layer-2`, and `stablecoins`. If you use a different parent breakpoint, equalization may misalign — flag it.

## Step 5: Variants

| Variant | Title font-size | Description font-size | Notes |
|---|---|---|---|
| `large` (default) | `text-2xl` (`text-3xl` at `@3xl/callout`) | `text-xl` (20px) | Biggest text scale; default for prominent CTAs |
| `medium` | inherits (`text-3xl` at `@3xl/callout`) | `text-base` (16px) | Mid scale |
| `small` | `text-xl` (`text-2xl` at `@3xl/callout`) | `text-base` (16px) | Tightest |

Variant naming reflects visual prominence, not gap size. `large` has the same gap as `small` (16px / `--spacing(4)`); only this scaling axis differs.

## Step 6: Heading level (`as` prop)

`CalloutTitle` renders `<h2>` by default. When the callout sits inside an h2-introduced section, pass `as="h3"` (or `as="h4"` for deeper nesting) to keep the heading hierarchy clean:

```tsx
<Callout as="h3" image={...} title={...} description={...} />
```

## Step 7: CSS variable hooks

Layout values are driven by CSS variables on the aside. Variants override these; pages can override per-instance via `className`.

| Variable | Default | Overridable on |
|---|---|---|
| `--callout-padding` | `--spacing(8)` (32px), `--spacing(12)` at `@3xl/callout` | All variants |
| `--callout-content-gap` | `--spacing(4)` (16px) | Variants (currently no variant overrides) |
| `--title-font-size` | Set by each variant | Variants |
| `--content-font-size` | `var(--text-base)` (16px) | Variants |

Adding a variant follows the existing pattern — set the variable on the aside in the variant's `cn()` block:

```tsx
// In ui/callout.tsx, inside variants:
xl: cn(
  "[--callout-padding:--spacing(16)]",
  "[--title-font-size:var(--text-4xl)]",
  "[--content-font-size:var(--text-2xl)]",
),
```

Avoid the `**:data-[label=callout-content]:...` descendant-selector pattern for new variants — push the rule onto `CalloutContent` directly, or use a CSS variable hook so the slot owns its own behavior.

## Step 8: When the shape doesn't quite match

Almost always the answer is "add a variant" or "expose a CSS variable hook" rather than "create a new component."

- **Different image overflow amount** — currently the `-mt-24` is hardcoded on `CalloutBanner`. The clean evolution is a `--callout-banner-overflow` CSS variable that both the aside's reservation and the banner's negative margin read. Worth doing before the second consumer requests it.
- **Different banner alignment** (top-anchor vs centered) — `grid place-items-center` is the current default; the alignment could become a variant if a use case demands it.
- **Image with hard-coded sizing** — don't override the image's `sizes` attribute per-call without a strong reason. The component-level `sizes="(min-width: 768px) 400px, calc(100vw - 64px)"` is tuned to the layout's actual breakpoints and the `max-h-64` cap.

## Step 9: Storybook story

`src/components/ui/callout.stories.tsx` is the single source. Add a story only when you're introducing a new variant or shape that the existing stories don't cover. Variant-axis stories opt out of Chromatic at the meta level; the `Composites` story stays in Chromatic and uses real intl keys so the Storybook locale toolbar exercises RTL and verbose-language layouts.

## Pre-merge checklist

- [ ] Used `image` *or* `emoji`, never both (TS would reject anyway).
- [ ] `title` / `description` are translated at the call site (no `titleKey` / `descriptionKey`).
- [ ] If using `as`, the resulting heading level matches the section's hierarchy.
- [ ] If introducing a new visual treatment, it lives as a variant or CSS variable hook on `ui/callout`, not a sibling component.
- [ ] Storybook coverage updated if the new variant/shape isn't already represented.
