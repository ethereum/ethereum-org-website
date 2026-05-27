# Add builder blog to developer hub

## Summary

Launches a new blog section under `/developers/blog/` for the Builder Growth team to publish long-form technical content. Ships with three real posts and the infrastructure to easily add more.

## What this adds

### Blog infrastructure

- **`BlogLayout`** — new layout template for individual blog posts, with table of contents, breadcrumbs, reading time, and file contributors. Mirrors the established `TutorialLayout` patterns.
- **`BlogPostMetadata`** — metadata strip component showing author, team, tags, published date, and reading time.
- **`/developers/blog/` listing page** — server-rendered listing sorted by publish date (newest first), with per-post tags, team attribution, and reading time.
- **`getBlogPostsData`** utility — uses the shared `getContentListData` helper to load posts from `blogPosts.json` slug registry. Adding a new post only requires creating a content directory and appending its slug to the JSON array.
- **`BlogFrontmatter` interface** — extends `SharedFrontmatter` with `author`, `published`, `team`, `tags`, `sourceUrl`, `image`, `breadcrumb`, and `hideEditButton`.

### Blog posts (3 launch posts + 1 test post)

| Post | Author | Published | Type |
|---|---|---|---|
| Building on Ethereum in 2026 | Philip Krause | 2026-05-07 | Original |
| Privacy apps on Ethereum | Philip Krause | 2026-04-14 | Syndicated from X |
| Agentic commerce infrastructure | Rick | 2026-03-27 | Syndicated from rick.build |

### Author personas (3 new entries in `KNOWN_PERSONS`)

- **Philip Krause** — EF Builder Growth. `alumniOf`: BuidlGuidl, fija Finance, FAU Erlangen-Nürnberg. `knowsAbout`: AI agents, Solidity security, Foundry, Scaffold-ETH, ZK/Noir, L2, protocol roadmap.
- **Sophia Dew** — EF Builder Growth. `alumniOf`: Stanford, Stanford Blockchain Club, Gitcoin, Celo Foundation. `knowsAbout`: AI agents, onchain agent standards, MCP tooling, agent security, developer relations.
- **Rick** — EF Builder Growth. `url`: rick.build. `knowsAbout`: agentic commerce, onchain agent standards, sovereign AI, agent wallets, SpeedRunEthereum.

### JSON-LD structured data

- **Listing page** (`page-jsonld.tsx`) — `CollectionPage` schema with `ItemList` of all posts, full breadcrumb trail, and contributor list.
- **Individual posts** (`page-jsonld.tsx` in `[...slug]`) — enhanced to emit `BlogPosting` type for blog slugs, with author resolution via `KNOWN_PERSONS` alias map.

### Developer hub integration

- "Recent updates" carousel on `/developers/` page linking to latest blog posts.
- Blog listed in breadcrumb navigation as "Builder updates" via custom i18n mapping.

## Design decisions

### Syndication strategy

Some launch posts are republished from content originally shared on X / personal blogs. The approach:

- **ethereum.org is canonical** — no `rel=canonical` pointing elsewhere, no `sameAs` on the article. Google will prefer the ethereum.org version due to higher domain authority and better crawlability (X increasingly blocks crawlers).
- **`sourceUrl` in frontmatter** — metadata-only field recording the original URL. Not consumed by any UI component today, but available for future programmatic use (e.g., rendering the attribution link from `BlogPostMetadata`, filtering syndicated vs. original posts).
- **Attribution in the markdown body** — an italic line at the top of each syndicated post links to the original. Written directly in the content rather than generated from a component. This was chosen over building dedicated UI because the launch has only 2-3 syndicated posts and the markdown approach gets translated by the i18n pipeline just like the rest of the body.
- **No JSON-LD syndication predicates** — `isBasedOn` implies creative transformation (not accurate for near-verbatim republication). `sameAs` could create canonicalization ambiguity. The cleanest approach is no schema relationship at all.

### `sourceUrl` without `source`

The `TutorialFrontmatter` has both `source` (display label) and `sourceUrl` (link). We added only `sourceUrl` to `BlogFrontmatter` because the display label can be derived from the URL if we ever build the component, and we are not building it now.

### Team attribution: display-only

The `team` field in frontmatter is rendered as a display string in `BlogPostMetadata` ("EF Builder Growth"). It is not a JSON-LD entity — we intentionally avoid creating an `Organization` node for sub-teams because they are not independently verifiable entities. Author profiles already encode team affiliation via `jobTitle` and `worksFor` pointing to the Ethereum Foundation `@id`.

### `blogPosts.json` slug registry

New posts are added by creating a `public/content/developers/blog/<slug>/index.md` directory and appending the slug to `src/data/blogPosts.json`. This mirrors the `internalTutorials.json` pattern and keeps the content data layer simple — no database, no API, just filesystem + a JSON manifest.

### Author resolution via `ENTITY_ALIASES`

The frontmatter `author` field uses the human-readable display name (e.g., `"Philip Krause"`, not the kebab-case key). The JSON-LD system resolves it to the correct `KNOWN_PERSONS` entry via the `ENTITY_ALIASES` map, which indexes by profile key, `.name`, and GitHub handle (all case-insensitive). This means authors can use their natural name in frontmatter without needing to know the internal key.

## Files changed

### New files (14)

| File | Purpose |
|---|---|
| `app/[locale]/developers/blog/page.tsx` | Blog listing page |
| `app/[locale]/developers/blog/page-jsonld.tsx` | `CollectionPage` JSON-LD for listing |
| `src/layouts/Blog.tsx` | Blog post layout template + MDX components |
| `src/components/BlogPostMetadata.tsx` | Author/team/date/tags metadata strip |
| `src/data/blogPosts.json` | Slug registry (3 posts) |
| `src/intl/en/page-developers-blog.json` | i18n strings for blog pages |
| `public/content/developers/blog/building-on-ethereum-in-2026/index.md` | Post: Building on Ethereum in 2026 |
| `public/content/developers/blog/privacy-apps-on-ethereum/index.md` | Post: Privacy apps on Ethereum |
| `public/content/developers/blog/agentic-commerce-infrastructure/index.md` | Post: Agentic commerce infrastructure |
| `public/content/developers/blog/scaffold-eth-2-ai-extension/index.md` | Test post (scaffold-eth) |
| `public/images/developers/blog/builder-blog-hero.png` | Blog hero image |
| `public/images/developers/blog/builder-tile-*.png` | Developer hub tile images |

### Modified files (10)

| File | Change |
|---|---|
| `src/lib/interfaces.ts` | Added `BlogFrontmatter` interface with `sourceUrl` |
| `src/lib/types.ts` | Added `IBlogPost` type |
| `src/lib/utils/md.ts` | Added `getBlogPostsData`, shared `getContentListData` helper |
| `src/lib/utils/layout.ts` | Registered `BlogLayout` in layout resolver |
| `src/lib/utils/translations.ts` | Added `/developers/blog` namespace mapping |
| `src/lib/jsonld/persons.ts` | Added 3 author personas (Philip, Sophia, Rick) |
| `src/layouts/index.ts` | Exported `BlogLayout` |
| `src/intl/en/common.json` | Added "Builder updates" breadcrumb key |
| `src/intl/en/page-developers-index.json` | Added blog carousel copy for developer hub |
| `app/[locale]/[...slug]/page-jsonld.tsx` | Enhanced to emit `BlogPosting` for blog slugs |
| `app/[locale]/developers/page.tsx` | Added "Recent updates" carousel section |
