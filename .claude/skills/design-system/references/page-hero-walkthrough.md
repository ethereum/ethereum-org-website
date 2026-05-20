# Walkthrough: "I Need a Page Hero"

A worked example of adding a page hero correctly.

## Step 1: Pick the right Hero variant

`@/components/Hero` exports 5 hero shapes. Pick by what your page needs:

| Hero | When to use |
|---|---|
| `ContentHero` | Most internal pages: 2-column with image, breadcrumb, buttons. The workhorse. |
| `HubHero` | Hub/landing pages: full-bleed background image with overlay text card. |
| `HomeHero` | Homepage only. Async server component with optimized image loading. |
| `SimpleHero` | Text-only with breadcrumb + buttons. No image. |
| `MdxHero` | Long-form articles: minimal breadcrumb + h1, optimized for reading. |

If none of these fit, **stop and ask**. Don't reach for `PageHero` (deprecated). Don't invent a new hero.

## Step 2: Compose

### `ContentHero` (most common)

```tsx
import { getTranslations } from "next-intl/server"
import { ContentHero } from "@/components/Hero"
import heroImage from "@/public/images/topics/proof-of-stake.png"

export default async function Page() {
  const t = await getTranslations("page-pos")
  return (
    <main>
      <ContentHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/topics", label: "Topics" },
        ]}
        heroImg={heroImage}
        header={t("hero-header")}
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

### `SimpleHero` (text-only)

```tsx
import { SimpleHero } from "@/components/Hero"

<SimpleHero
  breadcrumbs={[...]}
  header={t("eyebrow")}
  title={t("title")}
  description={t("description")}
/>
```

### `MdxHero` (article-style)

```tsx
import { MdxHero } from "@/components/Hero"

<MdxHero
  breadcrumbs={[...]}
  title={t("title")}
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
// DON'T: Use deprecated PageHero
import PageHero from "@/components/PageHero"
<PageHero ... />
```

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

- [ ] Imports from `@/components/Hero` (NOT `@/components/PageHero`)
- [ ] Picks the right Hero variant for the page type
- [ ] All copy comes from `t()` -- no hard-coded English
- [ ] Hero image is passed as a static import (`heroImg={heroImage}`)
- [ ] Breadcrumbs are populated (most pages should have them)
- [ ] Tested in light + dark mode
- [ ] Tested in RTL locale (Arabic) -- text alignment, button order, image placement all sensible
- [ ] Tested in verbose-language (German) -- title doesn't overflow
- [ ] Page is a Server Component (no `"use client"` unless required)
