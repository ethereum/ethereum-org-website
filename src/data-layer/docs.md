# Data Layer

Centralized system for fetching and storing external data using Trigger.dev scheduled jobs and Netlify Blobs storage.

## Architecture

```
src/data-layer/
├── fetchers/         # Fetch functions (one per data source)
├── mocks/            # Mock JSON files for local development
├── index.ts          # Public API - typed getter functions
├── tasks.ts          # KEYS constant + Trigger.dev scheduled tasks
└── storage.ts        # get/set abstraction (Netlify Blobs or mock files)

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
6. **Add cached wrapper** in `src/lib/data/index.ts`

## Environment Variables

**Production:**
- `SITE_ID` - Netlify site ID (auto-provided)
- `NETLIFY_BLOBS_TOKEN` - Netlify Blobs access token
- `TRIGGER_PROJECT_ID` - Trigger.dev project ID

**Local development:**
- `USE_MOCK_DATA=true` - Use mock storage

## Mock Data

Regenerate mocks from production:

```bash
npx dotenv-cli -e .env -- npx ts-node -r tsconfig-paths/register -O '{"module":"commonjs"}' src/data-layer/mocks/generate-mocks.ts
```
