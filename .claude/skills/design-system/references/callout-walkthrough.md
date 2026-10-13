# Walkthrough: "I Need a Callout"

A worked example of using the design system correctly when adding an in-content callout — a card-shaped block with an optional image banner, title, description, and optional CTA buttons.

## Step 1: Confirm it's a `Callout`

`Callout` is one of several similar-looking primitives. Pick by what you're actually building:

- **Card-shaped promotional/educational block, with an optional image banner, title, description, and 0–2 CTA buttons** → `Callout`
- **Linkable summary card in a grid (list of things)** → `Card`
- **In-prose notice or warning** → `<Alert variant="info|warning|error|success|update">`
- **Top-of-page full-bleed ribbon** → `<Alert variant="banner">`
- **Whole-card-clickable wrapper around arbitrary content** → `LinkBox` + `LinkOverlay`

If you're tempted to inline `flex flex-col rounded-base bg-linear-primary ... p-8` with an `<img>` overhang, you're reinventing `Callout`.

## Step 2: Compose `Callout`

The default export covers the common shape:

```tsx
import Callout from "@/components/ui/callout"
import { ButtonLink } from "@/components/ui/buttons/Button"
;<Callout
  image={someImage}
  alt="Stylized illustration"
  title={t("page-x-callout-title")}
  description={t("page-x-callout-description")}
>
  <ButtonLink href="/...">{t("page-x-callout-cta")}</ButtonLink>
</Callout>
```

### What's happening

- `Callout` wraps `CalloutRoot` (the `<aside>`) → optional `CalloutBanner` → `CalloutMain` → (`CalloutContent` → `CalloutTitle` + `CalloutDescription`) + optional `CalloutButtons`. `CalloutMain` is the internal flex parent that gives the title/description block and the buttons block their asymmetric spacing (title↔description tight, content↔buttons loose); `CalloutContent` holds only the heading + description.
- `image` is the optical anchor at the top. It overflows the gradient card via paired `mt-24` (reservation) / `-mt-24` (banner offset) so the image floats above. The reservation is gated to `@max-3xl/callout` and only applies when a banner is present (so banner-less callouts don't reserve space).
- `title` and `description` are literal strings — the call site resolves intl. Do **not** reintroduce `titleKey` / `descriptionKey` props; those were removed during unification.
- Children render inside `CalloutButtons`. The buttons slot uses `mt-auto` so it pins to the bottom of the main area.

## Step 3: Banner shape — image or none

The only optical anchor is `image`:

- `image` renders a `<CalloutBanner>` with the image. Banner area reserves 96px above the gradient card for the overlap effect.
- Omit `image` for a content-only callout. The aside skips the 96px reservation entirely (via the `has-[[data-label=callout-banner]]:` gate), so the gradient card sits flush at the top.

There is no `emoji` prop / `CalloutEmoji` slot — do not reintroduce it; use an `image` banner or go banner-less.

## Step 4: Side-by-side equalization (automatic)

When two or more `<Callout>`s share a parent at `md+` viewport, banners pin to a 16rem min-height (256px) and buttons bottom-align across cards via `mt-auto`. Single callouts and stacked callouts (below `md`) retain natural banner height.

```tsx
<Grid columns={2} size="wide">
  <Callout image={...} title={...} description="Short copy.">
    <ButtonLink href="#">A</ButtonLink>
  </Callout>
  <Callout image={...} title={...} description="A much longer description that wraps to multiple lines.">
    <ButtonLink href="#">B</ButtonLink>
  </Callout>
</Grid>
```

The equalization rule lives on `CalloutBanner` as:

```
@max-3xl/callout:md:[aside:not(:only-child)_&]:min-h-64
```

— "inside a small-container layout, at `md+` viewport, when the wrapping aside has a sibling aside, pin banner to 16rem." The `md:` gate is hardcoded to Tailwind's default 768px breakpoint. The canonical side-by-side layout is now `<Grid columns={2} size="wide">` (see `components.md`); `size="wide"` (22rem min item) is chosen so the grid's content-width 2→1 fold lands near `md`, keeping the visible column count and the equalization roughly in sync on full-width sections. Note the two are now gated differently — equalization by viewport (`md:`), the grid fold by content width — so in a narrower parent they can diverge (e.g. callouts visually stacked but still banner-equalized because they remain DOM siblings at `md+`). Flag it if equalization looks off.

## Step 5: Variants

Two size variants, both fully responsive across the `@3xl/callout` container breakpoint:

| Variant          | Title @ `@max-3xl/callout` → `@3xl/callout` | Description @ `@max-3xl/callout` → `@3xl/callout` | Notes                                                                                           |
| ---------------- | ------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `base` (default) | `text-2xl` (24px) → `text-3xl` (30px)       | `text-lg` (18px) → `text-xl` (20px)               | Default scale; use for prominent CTAs                                                           |
| `sm`             | `text-xl` (20px) → `text-2xl` (24px)        | `text-base` (16px) → `text-lg` (18px)             | Tighter; use when the callout is secondary to surrounding content or stacked at narrower widths |

Variant naming reflects visual prominence (text scale only); gap and padding are unchanged across variants. Only `base` / `sm` exist — the old `large` / `medium` / `small` names are gone.

## Step 6: Heading level (`as` prop)

`CalloutTitle` renders `<h2>` by default. When the callout sits inside an h2-introduced section, pass `as="h3"` (or `as="h4"` for deeper nesting) to keep the heading hierarchy clean:

```tsx
<Callout as="h3" image={...} title={...} description={...} />
```

## Step 7: CSS variable hooks

Layout values are driven by CSS variables on the aside. Variants override these; pages can override per-instance via `className`.

| Variable              | Default                                                  | Set by   | Notes                                                                                                                                                                                      |
| --------------------- | -------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--callout-padding`   | `--spacing(8)` (32px), `--spacing(12)` at `@3xl/callout` | Root     | Banner horizontal padding and `CalloutMain` padding both read this                                                                                                                         |
| `--spacing-unit`      | `0.25lh`                                                 | Root     | Line-height-relative rhythm unit. `CalloutContent` uses `gap-(--spacing-unit)` (title↔description tight); `CalloutMain` uses `gap-[calc(var(--spacing-unit)*4)]` (content↔buttons loose) |
| `--title-font-size`   | Variant-driven, responsive at `@3xl/callout`             | Variants | See Step 5 table                                                                                                                                                                           |
| `--content-font-size` | Variant-driven, responsive at `@3xl/callout`             | Variants | See Step 5 table                                                                                                                                                                           |

Adding a variant follows the existing pattern — set the variables on the aside in the variant's `cn()` block, mirroring `base` / `sm`. Two authoring constraints (visible in `ui/callout.tsx`): responsive overrides need the `*:@3xl/callout:[--var:...]` shape (the `@container/callout` lives on the aside itself, so the override must descend through a child), and new variants shouldn't use `**:data-[label=...]` descendant selectors — push rules onto the slot component or a CSS variable hook instead.

## Step 8: When the shape doesn't quite match

Almost always the answer is "add a variant" or "expose a CSS variable hook" rather than "create a new component."

- **Different image overflow amount** — currently the `-mt-24` is hardcoded on `CalloutBanner`. The clean evolution is a `--callout-banner-overflow` CSS variable that both the aside's reservation and the banner's negative margin read. Worth doing before the second consumer requests it.
- **Different banner alignment** (top-anchor vs centered) — `grid place-items-center` is the current default; the alignment could become a variant if a use case demands it.
- **Image with hard-coded sizing** — don't override the image's `sizes` attribute per-call without a strong reason. The component-level `sizes="(min-width: 768px) 400px, calc(100vw - 64px)"` is tuned to the layout's actual breakpoints and the `max-h-64` cap.

## Step 9: Storybook story

`src/components/ui/callout.stories.tsx` is the single source. Add a story only when you're introducing a new variant or shape that the existing stories don't cover. Variant-axis stories opt out of Chromatic at the meta level; the `Composites` story stays in Chromatic and uses real intl keys so the Storybook locale toolbar exercises RTL and verbose-language layouts.

## Pre-merge checklist

- [ ] `title` / `description` are translated at the call site (no `titleKey` / `descriptionKey`).
- [ ] `variant` is `base` (default) or `sm` — the old `large` / `medium` / `small` names were removed.
- [ ] If using `as`, the resulting heading level matches the section's hierarchy.
- [ ] If introducing a new visual treatment, it lives as a variant or CSS variable hook on `ui/callout`, not a sibling component.
- [ ] Storybook coverage updated if the new variant/shape isn't already represented.
