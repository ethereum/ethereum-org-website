# Builder Blog — Implementation Summary

> [!IMPORTANT]
> All six epics from the implementation plan have been executed. This document summarizes the completed work.

## Architecture overview

The blog reuses existing infrastructure where possible without modifying files outside the blog's scope:

- **`BlogLayout`** — A self-contained layout template ([Blog.tsx](file:///Users/melissanelson/builder-hub-blog/src/layouts/Blog.tsx)) modeled on the Tutorial layout. It shares the same page shell pattern (flexbox wrapper, `MainArticle`, breadcrumbs, `TableOfContents`, `FileContributors`, `FeedbackCard`) but swaps in `BlogPostMetadata` for the metadata strip. The Tutorial template is **not** modified.
- **Shared `getContentListData()`** — A generic utility in [md.ts](file:///Users/melissanelson/builder-hub-blog/src/lib/utils/md.ts) that handles slug resolution, locale fallback, frontmatter parsing, and reading-time calculation. Both `getTutorialsData()` and `getBlogPostsData()` delegate to it with type-specific mappers, eliminating ~55 lines of duplicated data-fetching logic.
- **`KNOWN_PERSONS`** — Author attribution uses the existing JSON-LD persons registry. Author `worksFor` always points directly to the Ethereum Foundation org (`@id: "https://ethereum.foundation/#organization"`). Team affiliation is encoded textually in each person's `jobTitle` (e.g., `"Developer Advocate, Builder Growth"`) and `description`, not as a separate Organization entity — see *Team attribution design* below.
- **`EdgeScrollContainer`** — The "Recent updates" carousel on the developers hub page reuses the existing scroll container.

## Team attribution design

Team attribution (e.g., "EF Builder Growth") is **display-only** — it does not enter the JSON-LD knowledge graph.

**Rationale:** The Builder Growth team has no independent web identity (no website, Wikidata entry, or social profiles). Creating a standalone `Organization` node would produce a thin, unverifiable entity that dilutes the strong EF entity signal for SEO/LLMO rather than strengthening it.

**How it works:**

- **JSON-LD graph** — Each author's `worksFor` in `KNOWN_PERSONS` points to the EF org. Team context is carried by `jobTitle` (e.g., `"Developer Advocate, Builder Growth"`) and `description`. Search engines and LLMs extract team affiliation from these natural-language fields.
- **UI** — `BlogPostMetadata` reads `frontmatter.team`. When present, it renders that value; when omitted, it falls back to the i18n default `page-blog-team-attribution` (`"EF Builder Growth"`). This supports cross-team guest posts without any JSON-LD changes.
- **Frontmatter** — `team` is an optional field in `BlogFrontmatter`. Omit it for the default team; set it explicitly for guest posts from other teams.

## Files created

| File | Purpose |
|---|---|
| [Blog.tsx](file:///Users/melissanelson/builder-hub-blog/src/layouts/Blog.tsx) | Blog layout template (self-contained, modeled on Tutorial layout) |
| [BlogPostMetadata.tsx](file:///Users/melissanelson/builder-hub-blog/src/components/BlogPostMetadata.tsx) | Blog-specific metadata strip (author, date, reading time, tags, team attribution) |
| [blogPosts.json](file:///Users/melissanelson/builder-hub-blog/src/data/blogPosts.json) | Blog post slug registry (mirrors `internalTutorials.json` pattern) |
| [page.tsx](file:///Users/melissanelson/builder-hub-blog/app/%5Blocale%5D/developers/blog/page.tsx) | Blog listing page ("View all") |
| [page-jsonld.tsx](file:///Users/melissanelson/builder-hub-blog/app/%5Blocale%5D/developers/blog/page-jsonld.tsx) | Blog listing page JSON-LD (CollectionPage schema) |
| [page-developers-blog.json](file:///Users/melissanelson/builder-hub-blog/src/intl/en/page-developers-blog.json) | Blog-specific i18n strings |
| [scaffold-eth-2-ai-extension/index.md](file:///Users/melissanelson/builder-hub-blog/public/content/developers/blog/scaffold-eth-2-ai-extension/index.md) | Sample blog post for E2E validation |

## Files modified

| File | Change |
|---|---|
| [interfaces.ts](file:///Users/melissanelson/builder-hub-blog/src/lib/interfaces.ts) | Added `BlogFrontmatter` interface with optional `team` and `sourceUrl` fields |
| [types.ts](file:///Users/melissanelson/builder-hub-blog/src/lib/types.ts) | Added `BlogFrontmatter` to `Frontmatter` intersection; added `IBlogPost` type |
| [layout.ts](file:///Users/melissanelson/builder-hub-blog/src/lib/utils/layout.ts) | Added `"blog"` to slug-based layout detection |
| [layouts/index.ts](file:///Users/melissanelson/builder-hub-blog/src/layouts/index.ts) | Registered `BlogLayout` + `blogComponents` in layout/component mappings |
| [translations.ts](file:///Users/melissanelson/builder-hub-blog/src/lib/utils/translations.ts) | Added blog prefix namespace + layout namespace |
| [md.ts](file:///Users/melissanelson/builder-hub-blog/src/lib/utils/md.ts) | Added shared `getContentListData()` helper; refactored `getTutorialsData()` and added `getBlogPostsData()` to use it |
| [page-developers-index.json](file:///Users/melissanelson/builder-hub-blog/src/intl/en/page-developers-index.json) | Added blog section i18n keys |
| [developers/page.tsx](file:///Users/melissanelson/builder-hub-blog/app/%5Blocale%5D/developers/page.tsx) | Added recent posts carousel (EdgeScrollContainer) between courses and docs |
| [[...slug]/page-jsonld.tsx](file:///Users/melissanelson/builder-hub-blog/app/%5Blocale%5D/%5B...slug%5D/page-jsonld.tsx) | Enhanced `@type` to emit `BlogPosting` for blog slugs |

## Syndication strategy

Some launch posts are republished from content originally shared on X (Twitter) by Builder Growth team members. The strategy:

- **Ethereum.org is the canonical URL.** No `rel=canonical` pointing to X. No JSON-LD syndication predicates (e.g., `isBasedOn` or `sameAs`) — schema.org has no clean property for syndication, and adding one would risk diluting canonical authority.
- **`sourceUrl`** — An optional frontmatter field in `BlogFrontmatter`. Set it to the original X post URL for syndicated content. Omit it for original content. Nothing consumes this field programmatically yet; it exists as structured metadata for potential future use (e.g., rendering an attribution link in `BlogPostMetadata`).
- **Attribution** — For syndicated posts, include a one-liner in the markdown body (e.g., `*Originally shared on [X by @author](https://x.com/...).*`). This is reader-facing attribution, not a machine signal.
- **Long-term** — All blog posts will be original content. Syndicated posts are a launch expedient. When a post is rewritten as original content, remove `sourceUrl` from its frontmatter and the attribution line from its body.

## Translation support

- **UI strings**: `page-developers-blog.json` registered in `PREFIX_PATH_NAMESPACE_MAP` and `LAYOUT_NAMESPACES`. The intl pipeline will auto-propagate to all 24 non-English locales.
- **Markdown content**: `getBlogPostsData()` has locale-aware path fallback. Blog content is **not** in `DO_NOT_TRANSLATE_PATHS`, so the intl pipeline will pick it up automatically. If blog posts should stay English-only, add `/developers/blog/` to `DO_NOT_TRANSLATE_PATHS` in `src/scripts/intl-pipeline/constants.ts`.

## Remaining tasks

1. **Add Builder Growth team members** to `KNOWN_PERSONS` in `src/lib/jsonld/persons.ts` — each entry should use `worksFor: { "@id": "https://ethereum.foundation/#organization" }` and encode team in `jobTitle` (e.g., `"Developer Advocate, Builder Growth"`)
2. **Replace sample blog post** with real launch content authored by the Builder Growth team
3. **Create bespoke blog OG share image** — design and add to `public/images/developers/blog/`, then register in the `imageForSlug` array in `src/lib/utils/metadata.ts` (blog pages currently fall back to the site-wide default share card)
4. **Consider CODEOWNERS** entry for `public/content/developers/blog/` for quick-turn merge process
5. **Verify dev server** renders correctly at `/developers/blog/` and `/developers/blog/scaffold-eth-2-ai-extension/`
