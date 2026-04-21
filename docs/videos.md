# Video Gallery & Embeds

Documentation for the ethereum.org video feature: the gallery page (`/videos/`), individual video landing pages (`/videos/[slug]/`), and the `<VideoWatch>` embed component for MDX content pages.

## Architecture Overview

Videos use a **filesystem-based data layer**. Each video is a directory under `public/content/videos/` containing an `index.md` file with YAML frontmatter (metadata) and a markdown body (transcript).

```
public/content/videos/
  ├─ ai-agents-interview-luna/
  │   └─ index.md          ← frontmatter + transcript body
  ├─ blobspace-101-dencun/
  │   └─ index.md
  └─ blockchain-101-visual-demo/
      └─ index.md
```

### Frontmatter Schema

Every video `index.md` requires the following YAML frontmatter:

```yaml
---
title: "Video Title"
description: "A brief summary of the video content."
lang: en
youtubeId: "dQw4w9WgXcQ"        # YouTube video ID
uploadDate: 2025-01-15           # YYYY-MM-DD format
duration: "1:08:42"              # H:MM:SS or M:SS format
educationLevel: intermediate     # beginner | intermediate | advanced
topic:                           # Array of tags (used for gallery filtering)
  - "scaling"
  - "layer-2"
format: interview                # presentation | explainer | interview | tutorial | panel
author: Channel Name             # Creator/channel attribution
breadcrumb: "Short Label"        # Optional — custom breadcrumb label
customThumbnailUrl: "https://..."  # Optional — falls back to YouTube default
---
```

The markdown body below the frontmatter is the **transcript**. It is rendered in a collapsible accordion on the video landing page and embedded in the `VideoObject` JSON-LD schema for SEO.

### Type Definitions

| Type | File | Purpose |
|---|---|---|
| `VideoFrontmatter` | `src/lib/interfaces.ts` | Frontmatter shape (extends `SharedFrontmatter`) |
| `VideoData` | `src/lib/types.ts` | Full parsed video: `{ slug, content, frontmatter }` |
| `VideoCardData` | `src/lib/types.ts` | Flat serializable data for client gallery component |
| `VideoFormat` | `src/lib/types.ts` | Union: `"presentation" \| "explainer" \| "interview" \| "tutorial" \| "panel"` |

## Pages

### Gallery (`/videos/`)

- **File:** `app/[locale]/videos/page.tsx`
- Server-rendered page with `SimpleHero` and `VideoGalleryFilter` client component
- Uses `getVideos(locale)` to fetch all video metadata at build time
- JSON-LD: `CollectionPage` + `ItemList` (top 10 newest videos)

### Landing Page (`/videos/[slug]/`)

- **File:** `app/[locale]/videos/[slug]/page.tsx`
- Uses `generateStaticParams()` via `getVideoSlugs()` to statically generate all video pages
- Renders: YouTube embed → publish date → collapsible transcript accordion → `FeedbackCard`
- JSON-LD: `VideoObject` with full transcript text
- Transcript rendered via `renderSimpleMarkdown()` from `src/lib/md/renderSimple.tsx`

## Gallery Filtering

The `VideoGalleryFilter` component (`app/[locale]/videos/_components/VideoGalleryFilter.tsx`) is a `"use client"` component providing:

- **Category pills** — defined in `app/[locale]/videos/constants.ts` (7 categories mapping to topic tags)
- **Text search** — filters across title, description, and topic tags
- **Sort** — newest, oldest, or alphabetical
- **Active filter strip** — shows dismissible tags for active filters

### Category Configuration

Categories are defined in `constants.ts` as an array mapping keys to arrays of topic tags. To add or modify categories, edit this file:

```typescript
// app/[locale]/videos/constants.ts
export const VIDEO_CATEGORIES = [
  {
    key: "how-ethereum-works",
    labelKey: "page-videos-category-how-ethereum-works",  // i18n key
    tags: ["consensus", "blockchain", "cryptography", ...],
  },
  // ...
] as const
```

Each category's `labelKey` must have a corresponding entry in `src/intl/en/page-videos.json`.

## VideoWatch Embed Component

The `VideoWatch` server component (`src/components/Videos/VideoWatch/index.tsx`) enables embedding videos inline within MDX content pages (e.g., topic pages under `public/content/`).

### Usage in MDX

```mdx
<VideoWatch slug="blockchain-101-visual-demo" />
```

Optional `startTime` prop:

```mdx
<VideoWatch slug="blockchain-101-visual-demo" startTime="120" />
```

The component renders:
- YouTube embed
- Video title and first sentence of description
- Link to full transcript on the video landing page

It is registered as a `baseComponent` in `app/[locale]/[...slug]/page.tsx`, so it is available in any MDX content page without additional imports.

For general guidance on editing markdown content pages, see [Editing Pages](./editing-markdown.md).

## Data Access Utilities

All data access functions live in `src/lib/utils/videos.ts`:

| Function | Returns | Purpose |
|---|---|---|
| `getVideoSlugs()` | `string[]` | Scans `public/content/videos/` for directory names |
| `getVideoData(slug, locale?)` | `VideoData` | Parses `index.md` frontmatter + body, with i18n override support |
| `getVideos(locale?)` | `VideoCardData[]` | Returns all videos as flat card data for the gallery |
| `getDefaultThumbnailUrl(youtubeId)` | `string` | Returns YouTube `sddefault.jpg` thumbnail URL |

All functions use **module-scoped `Map` caches** that persist for the duration of a build to avoid redundant filesystem reads.

### i18n Support

`getVideoData()` always reads the English source first for full metadata, then overlays `title` and `description` from a translated `index.md` if one exists at:

```
public/content/translations/{locale}/videos/{slug}/index.md
```

## SEO & Structured Data

### Video Landing Pages

Each video landing page includes `VideoObject` JSON-LD (`app/[locale]/videos/[slug]/page-jsonld.tsx`):

- `name`, `description`, `uploadDate`, `duration` (ISO 8601 via `toIsoDuration()`)
- `thumbnailUrl`, `embedUrl`, `contentUrl`
- `transcript` — full plain text (markdown stripped, XSS-escaped)
- `publisher` — Ethereum Foundation organization
- `educationalLevel`, `inLanguage`, `creator`

### Gallery Page

The gallery page includes `CollectionPage` + `ItemList` JSON-LD (`app/[locale]/videos/page-jsonld.tsx`):

- Links to the 10 most recent videos
- `BreadcrumbList` structured data

### Sitemap

Video pages are explicitly added to the sitemap in `app/sitemap.ts` with `changeFrequency: "monthly"` and `priority: 0.6`. Each video URL includes hreflang alternates for all supported locales.

## Navigation

Videos are linked in the **Learn** section of the site navigation via `src/lib/nav/buildNavigation.ts`:

```typescript
{
  id: "learn/videos",
  label: t("nav-videos-label"),
  description: t("nav-videos-description"),
  href: "/videos/",
}
```

Translation keys `nav-videos-label` and `nav-videos-description` live in `src/intl/en/common.json`.

## Translation Namespace

Video page UI strings use the `page-videos` namespace (`src/intl/en/page-videos.json`). The `/videos/` prefix is registered in `src/lib/utils/translations.ts` to map to this namespace.

## Adding a New Video

See the public contributing guide at [/contributing/adding-videos/](/contributing/adding-videos/) for the step-by-step process, including listing criteria and frontmatter field reference. The quick version:

1. Create `public/content/videos/{slug}/index.md` with frontmatter + transcript
2. Add i18n keys to `src/intl/en/page-videos.json` if using new category tags
3. Run `pnpm build` to verify the page generates correctly
