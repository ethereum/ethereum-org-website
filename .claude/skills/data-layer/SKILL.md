---
name: data-layer
description: This skill provides patterns for working with the data-layer module. Use when creating/editing files in src/data-layer/, src/lib/data/, or adding new data sources.
---

# Data Layer

## Architecture

```
src/data-layer/
├── fetchers/         # Fetch functions (one per data source)
├── index.ts          # Public API - typed getter functions
├── tasks.ts          # KEYS constant + Trigger.dev scheduled tasks
├── storage.ts        # get/set abstraction (Netlify Blobs or mock files)
├── s3.ts             # S3 image upload utility for external images
└── mocks/            # Mock data files for local development

src/lib/data/
└── index.ts          # Next.js caching adapter (createCachedGetter)
```

## Key Files

### tasks.ts - Single Source of Truth

Defines all task keys and scheduled jobs:

```typescript
export const KEYS = {
  ETH_PRICE: "fetch-eth-price",
  L2BEAT: "fetch-l2beat",
  // ...
} as const

const DAILY: Task[] = [
  [KEYS.APPS, fetchApps],
  [KEYS.EVENTS, fetchEvents],
]

const HOURLY: Task[] = [
  [KEYS.ETH_PRICE, fetchEthPrice],
  [KEYS.BEACONCHAIN, fetchBeaconChain],
]
```

### index.ts - Simple Getters

One-liner passthrough functions:

```typescript
export const getEthPrice = () => get<MetricReturnData>(KEYS.ETH_PRICE)
export const getL2beatData = () => get<L2beatData>(KEYS.L2BEAT)
```

### storage.ts - Storage Abstraction

Simple get/set that switches between Netlify Blobs (prod) and local JSON files (dev):

```typescript
export async function get<T>(key: string): Promise<T | null>
export async function set(key: string, data: unknown): Promise<void>
```

Uses `USE_MOCK_DATA=true` env var for local development.

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

All task IDs are defined in `KEYS` in `tasks.ts`. The getter in `index.ts` and the task tuple in `DAILY`/`HOURLY` must use the same key.

### 3. Expose via lib/data for caching

Add cached wrapper in `src/lib/data/index.ts`:

```typescript
export const getEventsData = createCachedGetter(
  dataLayer.getEventsData,
  ["events-data"],
  CACHE_REVALIDATE_DAY  // or CACHE_REVALIDATE_HOUR
)
```

### 4. Use S3 for external images

External images should be uploaded to S3 in the fetcher to centralize image domains:

```typescript
// In fetcher - correct
import { uploadToS3 } from "../s3"

const logoUrl = await uploadToS3(event.logoImage, "events/logos")
return { ...event, logoImage: logoUrl ?? "" }
```

Always handle `null` returns (upload failures) with fallback/empty string.

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

3. **Add task tuple** to `DAILY` or `HOURLY` in `tasks.ts`:
   ```typescript
   const DAILY: Task[] = [
     // ...existing tasks
     [KEYS.NEW_DATA, fetchNewData],
   ]
   ```

4. **Add getter** in `src/data-layer/index.ts`:
   ```typescript
   export const getNewData = () => get<YourDataType>(KEYS.NEW_DATA)
   ```

5. **Add mock file** at `src/data-layer/mocks/fetch-new-data.json` for local development

6. **Add cached wrapper** in `src/lib/data/index.ts`:
   ```typescript
   export const getNewData = createCachedGetter(
     dataLayer.getNewData,
     ["new-data"],
     CACHE_REVALIDATE_HOUR
   )
   ```
