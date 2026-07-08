# Walkthrough: "I Need a Page Hero"

A worked example of adding a page hero correctly.

## Step 1: Pick the right Hero variant

`@/components/Hero` exports 4 hero shapes. Pick by what your page needs:

| Hero | When to use |
|---|---|
| `PageHero` | The workhorse for most internal pages. 2-column with breadcrumbs, an optional `eyebrow`, an aside (`heroImg` **or** `heroComponent`), and up to two buttons -- **or** text-only when you pass neither aside. With `variant="no-divider"` and no aside/`description` it's the minimal breadcrumb + h1 article hero (the `StaticLayout` default). Absorbed the former `ContentHero`, `SimpleHero`, and `MdxHero`. |
| `HubHero` | Hub/landing pages: full-bleed background image with overlay text card. |
| `HomeHero` | Homepage only. Async server component with optimized image loading. |

If none of these fit, **stop and ask**. Don't invent a new hero. Always import `PageHero` as a named export from `@/components/Hero`.

## Step 2: Compose

Prop order convention (include only what's present, matching the component's argument order): `breadcrumbs`, `eyebrow`, `heroImg` **or** `heroComponent`, `title`, `description`, `buttons`, `blurDataURL`, `variant`, `className`.

### `PageHero` with breadcrumbs (most common)

```tsx
import { getTranslations } from "next-intl/server"
import { PageHero } from "@/components/Hero"
import heroImg from "@/public/images/topics/proof-of-stake.png"

export default async function Page() {
  const t = await getTranslations("page-pos")
  return (
    <main>
      <PageHero
        breadcrumbs={{ slug: "/staking/" }}
        heroImg={heroImg}
        title={t("hero-title")}
        description={t("hero-description")}
        buttons={[
          { content: t("primary-cta"), href: "/about" },
          { content: t("secondary-cta"), href: "/learn", variant: "outline" },
        ]}
      />
      {/* page content */}
    </main>
  )
}
```

`breadcrumbs` accepts either a `{ slug }` object (rendered by the standardized `Breadcrumbs` component) **or** a fully custom `<Breadcrumb>` element -- reach for the custom element when the slug-derived links don't map to real routes. `title` is always the page `<h1>`.

### `PageHero` with an `eyebrow`

`eyebrow` is an optional `ReactNode` rendered between the breadcrumbs and the title -- use it for a small status indicator, tag, or label. It does not change the heading hierarchy (`title` stays the `<h1>`).

```tsx
<PageHero
  breadcrumbs={{ slug: "/bug-bounty/" }}
  eyebrow={
    <div className="flex items-center gap-2">
      <div className="size-2 rounded-full bg-success" />
      <p className="text-sm uppercase">{t("status-active")}</p>
    </div>
  }
  title={t("hero-title")}
  description={t("hero-description")}
/>
```

> There is no `header` prop. (It was removed -- it previously rendered a small uppercase eyebrow as the `<h1>` and demoted `title` to `<h2>`. The title is now always the `<h1>`; use breadcrumbs for the slot above it and `eyebrow` for anything extra.)

### `PageHero` with a `heroComponent` (instead of an image)

Pass `heroComponent` (a `ReactNode`) to render an arbitrary widget -- a leaderboard, stats panel, etc. -- where the image would sit. `heroImg` and `heroComponent` are **mutually exclusive** at the type level (a discriminated union; passing both is a compile error). The difference is mobile stacking: a `heroImg` stacks **above** the text, while a `heroComponent` folds **below** it. Both sit beside the text on desktop.

```tsx
<PageHero
  breadcrumbs={{ slug: "/bug-bounty/" }}
  heroComponent={<Leaderboard content={topHunters} />}
  title={t("hero-title")}
  description={t("hero-description")}
/>
```

### `PageHero` text-only (no aside)

Omit both `heroImg` and `heroComponent` for a text-only hero. Add `variant="no-divider"` when the next section already supplies its own top border (otherwise you'll get a double rule).

```tsx
<PageHero
  breadcrumbs={{ slug: "/community/" }}
  title={t("title")}
  description={t("description")}
  buttons={[{ content: t("cta"), href: "/get-involved" }]}
/>
```

### `PageHero` article-style (replaces the former `MdxHero`)

For the minimal breadcrumb + h1 reading hero (what `StaticLayout` renders for non-hub pages), use a text-only `PageHero` with `variant="no-divider"` and no `description`. `description` is optional on `PageHero`, so omitting it yields just the breadcrumb and title.

```tsx
<PageHero
  breadcrumbs={{ slug }}
  title={frontmatter.title}
  variant="no-divider"
/>
```

## Step 3: Translation, not English

All user-facing copy in the hero comes from `t()`. Don't hard-code English. Add new keys to `src/intl/en/[page-namespace].json`.

The page above is a Server Component (default), so it uses `getTranslations` from `next-intl/server`. Don't add `"use client"` to use `useTranslations` -- the hero primitives handle their own client boundaries where needed.

## Step 4: Image

- Use a static import (`import heroImage from "@/public/..."`) so Next.js can optimize at build time
- Pass the imported `StaticImageData` directly: `heroImg={heroImage}` (not as an object)
- The hero component handles `next/image` internals -- you don't need to render `<Image>` yourself
- Hero images are decorative -- the component renders them with `alt=""`. Don't pass alt text; hero illustrations on this site don't carry content that needs description

## What NOT to Do

```tsx
// DON'T: Inline a hero from scratch
<section className="relative">
  <h1 className="mt-8 mb-4 text-md uppercase font-normal">{eyebrow}</h1>
  <h2 className="mt-8 mb-0 text-[2.5rem] !leading-xs lg:mt-12 lg:text-5xl">{title}</h2>
  <p className="mt-4 mb-8 text-xl !leading-xs lg:text-2xl">{description}</p>
  <div className="flex gap-4">{buttons}</div>
</section>
```

Reasons it's wrong:
- Arbitrary `text-[2.5rem]` and `!important` overrides are fragile
- No breadcrumb
- No hero image handling
- Won't be visually consistent with other hero pages
- Loses the heading hierarchy (`<h2>` should be `<h1>`)

## Pre-Merge Checklist for a New Page Hero

- [ ] Imports the hero as a named export from `@/components/Hero`
- [ ] Picks the right Hero variant for the page type
- [ ] Passes `breadcrumbs` to `PageHero`; uses at most one aside (`heroImg` **or** `heroComponent`, never both)
- [ ] All copy comes from `t()` -- no hard-coded English
- [ ] Hero image is passed as a static import (`heroImg={heroImage}`)
- [ ] Breadcrumbs are populated (most pages should have them)
- [ ] Tested in light + dark mode
- [ ] Tested in RTL locale (Arabic) -- text alignment, button order, image placement all sensible
- [ ] Tested in verbose-language (German) -- title doesn't overflow
- [ ] Page is a Server Component (no `"use client"` unless required)
