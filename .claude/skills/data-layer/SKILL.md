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
