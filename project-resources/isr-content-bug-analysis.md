# ISR + public/content Bug Analysis

## Summary

Looks like there is a bug where ISR-revalidated pages that read markdown from `public/content` (blog, tutorials, developers hub) lose that content after ~24 hours because Netlify's serverless function does not have access to `public/content` at runtime.

---

## Question 1: Will it work on the live site?

**Yes, initially. No, after ~24 hours.**

All three pages (`/developers/`, `/developers/blog/`, `/developers/tutorials/`) are marked as **● SSG with ISR** (revalidation) by Next.js because they call `getAppPageContributorInfo()` → `getGitHubContributors()` → `unstable_cache(..., { revalidate: 86400 })`.

Here's the timeline:

1. **During `next build`** — `public/content` IS on disk. Pages are statically pre-rendered. Blog posts, internal tutorials — all correctly baked into the HTML. **This is what gets served on first load after deploy.**

2. **After ~24 hours** — The ISR cache expires. Netlify's serverless function re-renders the page. In the serverless environment, `public/content` is NOT available (excluded by `outputFileTracingExcludes`). `getBlogPostsData()` returns `[]`. The blog section disappears.

So the deploy preview shows the *already-broken* state because its ISR cache already expired (or the CDN served the serverless re-render). **On a fresh production deploy, blog posts WILL appear, but will vanish after the first ISR revalidation cycle (~24 hours).**

This is the exact same lifecycle documented in `docs/solutions/integration-issues/netlify-isr-404-async-server-components.md`.

## Question 2: Is this unique to blog?

**No. The tutorials page has the identical issue — it just masks it.**

Here's how every comparable section handles this:

| Page | Reads `public/content`? | Data fallback? | ISR? | Broken after revalidation? |
|---|---|---|---|---|
| `/developers/` | **Yes** (blog posts) | None — section hides entirely | Yes | **Yes** — blog section vanishes |
| `/developers/blog/` | **Yes** (blog posts) | None — "No posts found" | Yes | **Yes** — empty state |
| `/developers/tutorials/` | **Yes** (57 internal tutorials) | **Yes** — 46 external tutorials from bundled JSON | Yes | **Partially** — internal tutorials silently drop, externals still show |
| `/developers/tools/` | No — data from API | N/A | Dynamic (uses `searchParams`) | No |
| `/use-cases/` | No — no fs reads in page | N/A | Yes | No |
| `/learn/` | No — no fs reads in page | N/A | Yes | No |
| `[...slug]` catch-all | Yes — but fully static | N/A | No (`generateStaticParams`) | No |

The key distinction is: **pages that are ISR AND read from `public/content` at the page level will fail after cache expiry.** Most pages avoid this naturally because:

- They get their data from APIs (data layer), not the filesystem
- Or they're fully static (catch-all with `generateStaticParams`)
- Or they use `searchParams` which makes them dynamic (re-rendered every request, but still no filesystem access)

The tutorials page has lived with this bug because the external tutorials JSON provides enough content to make the page look functional. The internal tutorials have been silently dropping after each ISR cycle, but nobody noticed because the page doesn't look "empty."
