---
name: data-layer
description: This skill provides patterns for working with the data-layer module. Use when creating/editing files in src/data-layer/, src/lib/data/, or adding new data sources.
---

# Data Layer

## Architecture

```
src/data-layer/           # Isolated, framework-agnostic module
├── api/                  # Fetch functions (one per data source)
├── index.ts              # Getter functions (pure passthrough)
└── registry.ts           # Task registry (hourly/daily)

src/lib/data/             # Next.js caching adapter
└── index.ts              # Cached wrappers via createCachedGetter()
```

## Rules

### 1. Getters must be pure passthrough

In `src/data-layer/index.ts`, getter functions must only call `getData<T>(TASK_ID)` with no transformations:

```typescript
// Correct
export async function getEventsData(): Promise<EventItem[] | null> {
  return getData<EventItem[]>(FETCH_EVENTS_TASK_ID)
}

// Wrong - no transformations in getters
export async function getEventsData(): Promise<EventItem[] | null> {
  const data = await getData<EventItem[]>(FETCH_EVENTS_TASK_ID)
  return data?.map((e) => ({ ...e, computed: derive(e) })) ?? null
}
```

All transformations belong in the fetch task (`src/data-layer/api/`), not in the getter.

### 2. Expose via lib/data for caching

When a data function needs caching/revalidation, add a cached wrapper in `src/lib/data/index.ts`:

```typescript
export const getEventsData = createCachedGetter(
  dataLayer.getEventsData,
  ["events-data"],
  CACHE_REVALIDATE_DAY  // or CACHE_REVALIDATE_HOUR
)
```

## Adding a New Data Source

1. Create fetch function in `src/data-layer/api/fetchNewData.ts`:
   ```typescript
   export const FETCH_NEW_DATA_TASK_ID = "fetch-new-data"

   export async function fetchNewData(): Promise<YourDataType> {
     // Fetch and transform data here
   }
   ```

2. Add getter in `src/data-layer/index.ts`:
   ```typescript
   export async function getNewData(): Promise<YourDataType | null> {
     return getData<YourDataType>(FETCH_NEW_DATA_TASK_ID)
   }
   ```

3. Register in `src/data-layer/registry.ts` (hourlyTasks or dailyTasks)

4. Add cached wrapper in `src/lib/data/index.ts`:
   ```typescript
   export const getNewData = createCachedGetter(
     dataLayer.getNewData,
     ["new-data"],
     CACHE_REVALIDATE_HOUR
   )
   ```
