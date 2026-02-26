# Data Layer

Centralized system for fetching and storing external data using Trigger.dev scheduled jobs and Netlify Blobs storage.

## Architecture

```
src/data-layer/
├── fetchers/         # Fetch functions (one per data source)
├── mocks/            # Mock JSON files for local development
├── index.ts          # Public API - typed getter functions
├── tasks.ts          # KEYS constant + Trigger.dev scheduled tasks
├── storage.ts        # get/set abstraction (Netlify Blobs or mock files)
└── s3.ts             # S3 image upload utility for external images

src/lib/data/
└── index.ts          # Next.js caching adapter
```

## Key Rules

### 1. Getters must be pure passthrough

```typescript
// Correct
export const getEventsData = () => get<EventItem[]>(KEYS.EVENTS)

// Wrong - no transformations in getters
export const getEventsData = async () => {
  const data = await get<EventItem[]>(KEYS.EVENTS)
  return data?.map(transform) ?? null
}
```

All transformations belong in the fetcher (`/fetchers`).

### 2. KEYS is the single source of truth

All storage keys are defined in `KEYS` in `tasks.ts`. The getter in `index.ts` and the task tuple in `DAILY`/`HOURLY` must use the same key.

### 3. Use `@/lib/data` for caching

```typescript
// src/lib/data/index.ts
export const getEventsData = createCachedGetter(
  dataLayer.getEventsData,
  ["events-data"],
  CACHE_REVALIDATE_DAY
)
```

Direct `@/data-layer` imports work but have no caching.

## Adding a New Data Source

1. **Create fetcher** in `src/data-layer/fetchers/fetchNewData.ts`
2. **Add type** to `src/lib/types.ts` (if needed)
3. **Add key** to `KEYS` in `tasks.ts`
4. **Add task tuple** to `DAILY` or `HOURLY` in `tasks.ts`
5. **Add getter** in `src/data-layer/index.ts`
6. **Add mock file** at `src/data-layer/mocks/{key}.json` for local development
7. **Add cached wrapper** in `src/lib/data/index.ts`

## S3 Image Uploads

External images should be uploaded to S3 to reduce Next.js `remotePatterns` complexity. Use `s3.ts` in fetchers:

```typescript
import { uploadToS3, uploadManyToS3 } from "../s3"

// Single image
const logoUrl = await uploadToS3(event.logoImage, "events/logos")

// Batch upload (parallel)
const urls = await uploadManyToS3(imageUrls, "apps/banners")
```

Key features:
- **SSRF protection** - Blocks private network addresses
- **Deduplication** - SHA256 hash prevents re-uploads
- **5MB limit** - Large images return `null`
- **Immutable caching** - 1-year cache headers

Always handle `null` returns with fallback values.

## Environment Variables

**Production:**
- `SITE_ID` - Netlify site ID (auto-provided)
- `NETLIFY_BLOBS_TOKEN` - Netlify Blobs access token
- `TRIGGER_PROJECT_ID` - Trigger.dev project ID

**S3 Image Storage:**
- `S3_REGION` - AWS region (e.g., `us-east-1`)
- `S3_ENDPOINT` - S3-compatible endpoint URL
- `S3_ACCESS_KEY_ID` - Access key ID
- `S3_SECRET_ACCESS_KEY` - Secret access key
- `S3_IMAGE_BUCKET` - Bucket name for images

**Local development:**
- `USE_MOCK_DATA=true` - Use mock storage

