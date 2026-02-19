---
title: "Migrate GitHub Contributors from Build-time API Calls to Scheduled Data-Layer Tasks"
slug: "github-contributors-data-layer-migration"
category: "performance-issues"
severity: "high"
symptoms:
  - "26,900 GitHub API calls per build (97% redundancy)"
  - "Build failures due to rate limit exceeded (5,000 calls/hour)"
  - "~30 minute build time on Netlify"
  - "No cross-worker cache sharing in Next.js parallel builds"
components:
  - "src/lib/utils/contributors.ts"
  - "src/lib/utils/gh.ts"
  - "src/data-layer/"
  - "Trigger.dev scheduled tasks"
  - "Netlify Blobs storage"
tags:
  - "data-layer"
  - "trigger.dev"
  - "github-api"
  - "caching"
  - "rate-limiting"
  - "next.js"
resolved_at: "2026-01-27"
---

# GitHub Contributors Data-Layer Migration

## Problem

The site made **26,900 GitHub API calls** during every production build to fetch contributor information, when only **~734 unique paths** needed to be queried.

### Symptoms

- Build failures when GitHub rate limits exceeded (5,000 req/hour)
- ~30 minute build times on Netlify
- Logs showing same paths fetched multiple times across workers

### Root Causes

1. **No cross-worker cache sharing**: Next.js uses 13 worker processes during build, each with isolated memory
2. **Fresh cache per page render**: Each app page created a new empty `commitHistoryCache`
3. **Duplicate legacy path calls**: API called twice for identical URLs (current + legacy path)
4. **Multiple historical paths per app page**: 6 paths checked per page (most don't exist)
5. **Multiple renders per locale**: 25 locales × 2 passes = 50 renders per page

### Call Multiplication

| Factor | Multiplier |
|--------|------------|
| App pages | 39 |
| × Historical paths per page | × 6 |
| × Locales | × 25 |
| × Renders per locale | × 2 |
| × Legacy duplicate call | × 2 |
| **Subtotal (app pages)** | **23,400** |
| + Markdown pages | + ~3,500 |
| **Total** | **~26,900** |

## Solution

Migrate to data-layer infrastructure: fetch contributor data via scheduled Trigger.dev task, store in Netlify Blobs, read during builds with zero API calls.

### Architecture

```
Trigger.dev (weekly, Sundays midnight UTC)
    ↓
fetchGitHubContributors() - fetches from GitHub API (~734 calls)
    ↓
set(KEYS.GITHUB_CONTRIBUTORS, data) - stores in Netlify Blobs
    ↓
Build time: getGitHubContributors()
    ↓
unstable_cache + React cache (request dedup)
    ↓
storage.get() - retrieves from Netlify Blobs
    ↓
contributors.ts uses pre-computed data (zero API calls)
```

### Files Changed

| File | Change |
|------|--------|
| `src/lib/types.ts` | Added `GitHubContributorsData` type |
| `src/data-layer/fetchers/fetchGitHubContributors.ts` | **New** - Scheduled fetcher |
| `src/data-layer/mocks/fetch-github-contributors.json` | **New** - Mock data for local dev |
| `src/data-layer/tasks.ts` | Added `WEEKLY` array, registered task |
| `src/data-layer/index.ts` | Added `getGitHubContributors()` getter |
| `src/lib/data/index.ts` | Added cached wrapper with daily TTL |
| `src/lib/utils/contributors.ts` | Now uses data-layer instead of direct API |

### Key Implementation Details

**Type Definition** (`src/lib/types.ts`):
```typescript
export type GitHubContributorsData = {
  content: Record<string, FileContributor[]>   // slug → contributors
  appPages: Record<string, FileContributor[]>  // pagePath → contributors
  generatedAt: string
}
```

**Consumer Code** (`src/lib/utils/contributors.ts`):
```typescript
import { getGitHubContributors } from "@/lib/data"

export const getMarkdownFileContributorInfo = async (slug, locale, fileLang, _) => {
  const contributorsData = await getGitHubContributors()
  const gitHubContributors = contributorsData?.content[slug] ?? []
  // ... rest unchanged
}

export const getAppPageContributorInfo = async (pagePath, locale, _) => {
  const contributorsData = await getGitHubContributors()
  const gitHubContributors = contributorsData?.appPages[pagePath] ?? []
  // ... rest unchanged
}
```

**Task Registration** (`src/data-layer/tasks.ts`):
```typescript
const WEEKLY: Task[] = [
  [KEYS.GITHUB_CONTRIBUTORS, fetchGitHubContributors],
]

export const weeklyTask = schedules.task({
  id: "weekly-data-fetch",
  cron: "0 0 * * 0", // Sundays at midnight UTC
  run: () => runTasks(WEEKLY),
})
```

## Results

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| API calls per build | 26,900 | 0 | 100% reduction |
| API calls per week | 26,900 × n builds | ~734 | 97% reduction |
| Rate limit risk | Critical | Safe | Eliminated |

## Prevention

### When to Use Data-Layer vs Direct API

| Scenario | Approach |
|----------|----------|
| Data changes rarely (daily/weekly) | Data-layer with scheduled task |
| Data needed across many pages | Data-layer (shared storage) |
| Real-time data required | Direct API with proper caching |
| Single page needs data | Direct API acceptable |

### Warning Signs

- Same API endpoint called multiple times in build logs
- API calls proportional to `pages × locales × workers`
- Rate limit warnings during builds
- Build times increasing with page count

### Testing

```bash
# Local development - use mock data
USE_MOCK_DATA=true pnpm dev

# Test the fetcher manually
pnpm trigger:dev
```

## Related Documentation

- [GitHub API Calls Diagnostic](../../github-api-calls-diagnostic.md) - Original problem analysis
- [Data Layer Documentation](../../src/data-layer/docs.md) - Architecture guide
- [API Keys](../../api-keys.md) - Environment variable setup
