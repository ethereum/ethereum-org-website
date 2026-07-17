# Plan: Migrate GitHub Contributors to Data Layer

## Summary

Replace the current per-request GitHub API fetching with pre-computed data stored in Netlify Blobs via the existing data-layer infrastructure. This eliminates ~173K-347K API calls per build.

## Files to Delete (Previous Implementation)

- `src/scripts/github/getGitHubContributors.ts`
- `src/data/github/contributors.json`
- `src/data/github/app-contributors.json`
- `.github/workflows/get-github-contributors.yml`

## Files to Create

### 1. `src/data-layer/fetchers/fetchGitHubContributors.ts`

New fetcher that:
- Fetches contributors for all content files from GitHub API
- Fetches contributors for all app pages
- Returns `GitHubContributorsData` type
- Follows existing fetcher patterns (logging, error handling, rate limiting)

```typescript
export const FETCH_GITHUB_CONTRIBUTORS_TASK_ID = "fetch-github-contributors"

export async function fetchGitHubContributors(): Promise<GitHubContributorsData> {
  // Fetch all content file contributors
  // Fetch all app page contributors
  // Return combined data
}
```

### 2. `src/data-layer/mocks/fetch-github-contributors.json`

Mock data for local development with `USE_MOCK_DATA=true`.

## Files to Modify

### 1. `src/lib/types.ts`

Add type definition:
```typescript
export type GitHubContributorsData = {
  content: Record<string, FileContributor[]>  // slug -> contributors
  appPages: Record<string, FileContributor[]> // pagePath -> contributors
  generatedAt: string
}
```

### 2. `src/data-layer/tasks.ts`

- Add import for `fetchGitHubContributors`
- Add key: `GITHUB_CONTRIBUTORS: "fetch-github-contributors"`
- Add to `DAILY` array: `[KEYS.GITHUB_CONTRIBUTORS, fetchGitHubContributors]`

### 3. `src/data-layer/index.ts`

Add getter:
```typescript
export const getGitHubContributors = () =>
  get<GitHubContributorsData>(KEYS.GITHUB_CONTRIBUTORS)
```

### 4. `src/lib/data/index.ts`

Add cached wrapper:
```typescript
export const getGitHubContributors = createCachedGetter(
  dataLayer.getGitHubContributors,
  ["github-contributors"],
  CACHE_REVALIDATE_DAY
)
```

### 5. `src/lib/utils/gh.ts`

- Remove the static JSON imports I added earlier
- Remove `getStaticContentContributors` and `getStaticAppContributors`
- Keep `fetchAndCacheGitHubContributors` as fallback for dev/new files

### 6. `src/lib/utils/contributors.ts`

Update to use data-layer:
```typescript
import { getGitHubContributors } from "@/lib/data"

export const getMarkdownFileContributorInfo = async (...) => {
  const contributorsData = await getGitHubContributors()
  let gitHubContributors = contributorsData?.content[slug] || null

  // Fallback to API if not in data layer (new files during dev)
  if (!gitHubContributors) {
    gitHubContributors = await fetchAndCacheGitHubContributors(...)
  }
  // ... rest unchanged
}

export const getAppPageContributorInfo = async (...) => {
  const contributorsData = await getGitHubContributors()
  let uniqueGitHubContributors = contributorsData?.appPages[pagePath] || null

  // Fallback to API if not in data layer
  if (!uniqueGitHubContributors) {
    // ... existing API fetch logic
  }
  // ... rest unchanged
}
```

## Data Flow

```
Trigger.dev (daily)
    ↓
fetchGitHubContributors() - fetches from GitHub API
    ↓
set(KEYS.GITHUB_CONTRIBUTORS, data) - stores in Netlify Blobs
    ↓
Page render calls getGitHubContributors()
    ↓
unstable_cache + React cache (request dedup)
    ↓
storage.get() - retrieves from Netlify Blobs
    ↓
contributors.ts uses data (zero API calls)
```

## Implementation Order

1. Delete previous implementation files
2. Add `GitHubContributorsData` type to `src/lib/types.ts`
3. Create `src/data-layer/fetchers/fetchGitHubContributors.ts`
4. Create `src/data-layer/mocks/fetch-github-contributors.json`
5. Update `src/data-layer/tasks.ts` (key + import + DAILY registration)
6. Update `src/data-layer/index.ts` (add getter)
7. Update `src/lib/data/index.ts` (add cached wrapper)
8. Update `src/lib/utils/gh.ts` (remove static imports/functions)
9. Update `src/lib/utils/contributors.ts` (use data-layer)
10. Run `pnpm lint:fix` and `npx tsc --noEmit`

## Notes

- **No filesystem access** in Trigger.dev - use GitHub Contents API to list files
- Rate limiting: Use delays between requests (100-500ms)
- App pages list: Predefined static list (changes infrequently)
- Content files: Use GitHub API `GET /repos/{owner}/{repo}/contents/{path}` to recursively list `public/content/`

## GitHub API for File Discovery

```typescript
// List directory contents recursively
async function listContentFiles(path = "public/content"): Promise<string[]> {
  const url = `https://api.github.com/repos/ethereum/ethereum-org-website/contents/${path}`
  const response = await fetch(url, {
    headers: { Authorization: `token ${token}` }
  })
  const items = await response.json()

  const slugs: string[] = []
  for (const item of items) {
    if (item.type === "dir" && item.name !== "translations") {
      // Recursively list subdirectories
      slugs.push(...await listContentFiles(item.path))
    } else if (item.name === "index.md") {
      // Found a content file, extract slug
      slugs.push(path.replace("public/content/", ""))
    }
  }
  return slugs
}
```
