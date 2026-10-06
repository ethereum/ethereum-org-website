---
name: data-layer
description: This skill provides patterns for working with the data-layer module. Use when creating/editing files in src/data-layer/, src/lib/data/, or adding new data sources.
---

# Data Layer

## Architecture

```
src/data-layer/
├── fetchers/         # Fetch functions (one per data source)
│   └── developer-tools/  # Multi-file fetcher (builder resources, GitHub/npm stats, ranking)
├── index.ts          # Public API - typed getter functions
├── tasks.ts          # KEYS constant + Trigger.dev scheduled tasks
├── storage.ts        # get/set abstraction (Netlify Blobs or mock files)
├── s3.ts             # S3 image upload utility for external images
├── docs.md           # Module documentation
├── mocks/            # Mock data files for local development
└── .env.example      # Environment variables for data-layer/Trigger.dev

src/lib/data/
└── index.ts          # Next.js caching adapter (createCachedGetter)
```

## Environment Variables

The data-layer uses a **dedicated `.env.local`** at `src/data-layer/.env.local`, separate from the root `.env.local`: `cp src/data-layer/.env.example src/data-layer/.env.local`, fill in the keys (see `.env.example` for all options), then `pnpm trigger:dev` runs tasks locally. `GITHUB_TOKEN_READ_ONLY` and Sentry vars are shared with the main app (configure in both files); everything else (API keys, Netlify Blobs tokens, S3 credentials, Trigger.dev config) is data-layer only. In production, configure vars in the Trigger.dev project dashboard — the app and data-layer run in separate environments.

## Key Files

`tasks.ts` defines the `KEYS` constant and the `WEEKLY`/`DAILY`/`HOURLY` task tuples; `index.ts` holds the one-liner getters — snippets for both under "Adding a New Data Source" below.

### storage.ts - Storage Abstraction

`get<T>(key)` / `set(key, data)` switch between Netlify Blobs (prod) and local mock JSON files (`USE_MOCK_DATA=true` for local development).

### s3.ts - Image Upload Utility

Centralized S3 upload for external images. Fetchers use this to upload external images to a single S3 bucket, reducing Next.js `remotePatterns` complexity.

```typescript
// Upload single image
const s3Url = await uploadToS3(sourceUrl, "events/logos")

// Batch upload (parallel)
const s3Urls = await uploadManyToS3(urls, "apps/banners")
```

Key features:

- **SSRF protection** - Blocks private/internal network addresses
- **Deduplication** - SHA256 hash of source URL as key
- **Existence check** - Skips if already uploaded
- **5MB size limit** - Returns `null` for large images
- **Content-Type detection** - From header or URL extension fallback

## Rules

### 1. Getters must be pure passthrough

No transformations in `index.ts` - just `get<T>(KEYS.X)`:

```typescript
// Correct
export const getEventsData = () => get<EventItem[]>(KEYS.EVENTS)

// Wrong - no transformations in getters
export const getEventsData = () => {
  const data = await get<EventItem[]>(KEYS.EVENTS)
  return data?.map(transform) ?? null
}
```

All transformations belong in the fetcher (`src/data-layer/fetchers/`).

### 2. KEYS is the single source of truth

All task IDs are defined in `KEYS` in `tasks.ts`. The getter in `index.ts` and the task tuple in `WEEKLY`/`DAILY`/`HOURLY` must use the same key.

### 3. Expose via lib/data for caching

Add cached wrapper in `src/lib/data/index.ts`:

```typescript
export const getEventsData = createCachedGetter(
  dataLayer.getEventsData,
  ["events-data"],
  CACHE_REVALIDATE_DAY // or CACHE_REVALIDATE_HOUR
)
```

The `revalidate` parameter is `number | false`. Passing `false` is a deliberate pattern to keep a route fully static — a finite revalidate opts the page into ISR, which fails on Netlify for pages reading `public/content/` files. Example: `getStaticAppsData` in `src/lib/data/index.ts`, used by components embedded in MDX pages (data refreshes only on deploy).

### 4. Use S3 for external images

External images should be uploaded to S3 in the fetcher to centralize image domains:

```typescript
// In fetcher - correct
import { uploadToS3 } from "../s3"

const logoUrl = await uploadToS3(event.logoImage, "events/logos")
return { ...event, logoImage: logoUrl ?? "" }
```

Always handle `null` returns (upload failures) with fallback/empty string.

### 5. Keep fetchers isolated from the app

Fetchers run on Trigger.dev — a separate runtime, deployment, and bundle from the Next.js app. They cannot assume the app's filesystem, environment, or modules are available.

Any import or runtime dependency reaching outside `src/data-layer/` is a warning sign. Allowed: types (`@/lib/types`, `@/lib/interfaces`), pure constants (`@/lib/constants`), and pure utility functions with no app-runtime dependencies. Not allowed: anything that reads `process.cwd()`, anything from `app/` or `public/`, anything from `src/components/`, or `src/lib/data/` (which wraps the data layer and would create a cycle).

If a fetcher needs data that lives in the app — content files, frontmatter, etc. — fetch it over the network via the GitHub API and treat the repo as an external system. See `fetchGitHubContributors.ts` for the pattern. Don't work around this with `additionalFiles` in `trigger.config.ts`; bundling app files into the data-layer deployment re-creates the coupling.

## Adding a New Data Source

1. **Create fetcher** in `src/data-layer/fetchers/fetchNewData.ts`:

   ```typescript
   export async function fetchNewData(): Promise<YourDataType> {
     // Fetch and transform data here
   }
   ```

2. **Add key** to `KEYS` in `src/data-layer/tasks.ts`:

   ```typescript
   export const KEYS = {
     // ...existing keys
     NEW_DATA: "fetch-new-data",
   } as const
   ```

3. **Add task tuple** to `WEEKLY`, `DAILY`, or `HOURLY` in `tasks.ts` (getter and tuple must use the same `KEYS` entry — Rule 2):

   ```typescript
   const DAILY: TaskDef[] = [
     // ...existing tasks
     [KEYS.NEW_DATA, fetchNewData],
   ]
   ```

4. **Add getter** in `src/data-layer/index.ts`:

   ```typescript
   export const getNewData = () => get<YourDataType>(KEYS.NEW_DATA)
   ```

5. **Add mock file** at `src/data-layer/mocks/fetch-new-data.json` (read when `USE_MOCK_DATA=true`)

6. **Add cached wrapper** in `src/lib/data/index.ts`:
   ```typescript
   export const getNewData = createCachedGetter(
     dataLayer.getNewData,
     ["new-data"],
     CACHE_REVALIDATE_HOUR
   )
   ```
