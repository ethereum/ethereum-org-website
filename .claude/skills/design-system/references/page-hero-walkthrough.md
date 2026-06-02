# Walkthrough: "I Need a Page Hero"

A worked example of adding a page hero correctly.

## Step 1: Pick the right Hero variant

`@/components/Hero` exports 4 hero shapes. Pick by what your page needs:

| Hero | When to use |
|---|---|
| `PageHero` | The workhorse for most internal pages. 2-column with image, breadcrumb (or `header` eyebrow), and up to two buttons -- **or** text-only when you omit `heroImg`. Absorbed the former `ContentHero` and `SimpleHero`. |
| `HubHero` | Hub/landing pages: full-bleed background image with overlay text card. |
| `HomeHero` | Homepage only. Async server component with optimized image loading. |
| `MdxHero` | Long-form articles: minimal breadcrumb + h1, optimized for reading. |

If none of these fit, **stop and ask**. Don't invent a new hero. Always import `PageHero` as a named export from `@/components/Hero`.

## Step 2: Compose

Prop order convention (include only what's present): `breadcrumbs` **or** `header`, then `heroImg`, `title`, `description`, `buttons`, `variant`, `className`.

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

`breadcrumbs` accepts either a `{ slug }` object (rendered by the standardized `Breadcrumbs` component) **or** a fully custom `<Breadcrumb>` element -- reach for the custom element when the slug-derived links don't map to real routes. With `breadcrumbs`, `title` is the page `<h1>`.

### `PageHero` with an eyebrow (`header`)

`breadcrumbs` and `header` are **mutually exclusive** (a discriminated union). Pass `header` instead of `breadcrumbs` to render a small uppercase eyebrow as the `<h1>` in the breadcrumb slot; this demotes `title` to `<h2>` (the same structure as `HubHero`).

```tsx
<PageHero
  header={t("hero-eyebrow")}
  heroImg={heroImg}
  title={t("hero-title")}
  description={t("hero-description")}
/>
```

### `PageHero` text-only (no image)

Omit `heroImg` for a text-only hero. Add `variant="no-divider"` when the next section already supplies its own top border (otherwise you'll get a double rule).

```tsx
<PageHero
  breadcrumbs={{ slug: "/community/" }}
  title={t("title")}
  description={t("description")}
  buttons={[{ content: t("cta"), href: "/get-involved" }]}
/>
```

### `MdxHero` (article-style)

```tsx
import { MdxHero } from "@/components/Hero"

<MdxHero breadcrumbs={{ slug: "/developers/docs/" }} title={t("title")} />
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
  <h2 className="mt-8 mb-0 text-[2.5rem] !leading-xs font-bold lg:mt-12 lg:text-5xl">{title}</h2>
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
- [ ] Passes exactly one of `breadcrumbs` or `header` to `PageHero` (they're mutually exclusive)
- [ ] All copy comes from `t()` -- no hard-coded English
- [ ] Hero image is passed as a static import (`heroImg={heroImage}`)
- [ ] Breadcrumbs are populated (most pages should have them)
- [ ] Tested in light + dark mode
- [ ] Tested in RTL locale (Arabic) -- text alignment, button order, image placement all sensible
- [ ] Tested in verbose-language (German) -- title doesn't overflow
- [ ] Page is a Server Component (no `"use client"` unless required)
