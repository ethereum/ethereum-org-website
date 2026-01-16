# Data Layer Documentation

The data layer is a centralized system for fetching, storing, and retrieving external data for the Ethereum.org website. It uses Trigger.dev for scheduled background jobs and Netlify Blobs for persistent storage.

## Overview

The data layer provides:
- **Scheduled data fetching** - Automated background jobs that fetch data from external APIs
- **Persistent storage** - Centralized storage for fetched data using Netlify Blobs
- **Type-safe access** - Clean public API with automatic type inference
- **Framework-agnostic design** - Core data-layer has no framework dependencies
- **Mock data support** - Local development without external dependencies

## Architecture

```
src/data-layer/
├── api/              # Data fetching functions (one per external data source)
├── storage/          # Storage abstraction layer (unified Storage interface)
├── trigger/          # Trigger.dev scheduled tasks (parallelized)
├── mocks/            # Mock data files for local development
├── index.ts          # Public API - typed getter functions
├── registry.ts        # Central registry of all tasks
└── types.ts          # Shared type definitions (including Storage interface)

src/lib/data/
└── index.ts          # Next.js adapter - adds caching layer
```

## Key Rules

### 1. Data-layer getters must be pure passthrough

```typescript
// ✅ Correct
export async function getEventsData(): Promise<EventItem[] | null> {
  return getData<EventItem[]>(FETCH_EVENTS_TASK_ID)
}

// ❌ Wrong - no transformations in getters
export async function getEventsData(): Promise<EventItem[] | null> {
  const data = await getData<EventItem[]>(FETCH_EVENTS_TASK_ID)
  return data?.map((e) => ({ ...e, computed: derive(e) })) ?? null
}
```

Put all transformations in the fetch task (`/api`), not in the getter.

### 2. Expose via `@/lib/data` for caching

If a data function needs caching/revalidation, expose it through `@/lib/data`:

```typescript
// src/lib/data/index.ts
export const getEventsData = createCachedGetter(
  dataLayer.getEventsData,
  ["events-data"],
  CACHE_REVALIDATE_DAY
)
```

Direct `@/data-layer` imports work but have no caching.

## Components

### 1. Public API (`src/data-layer/index.ts`)

The data-layer exports a clean, framework-agnostic public API with typed getter functions:

```typescript
import { getEthPrice, getL2beatData } from "@/data-layer"

// Types flow automatically - no generics needed!
const price = await getEthPrice() // Returns MetricReturnData | null
const l2beat = await getL2beatData() // Returns L2beatData | null
```

**Available Functions:**
- `getEthPrice()` - Ethereum price data
- `getL2beatData()` - L2BEAT scaling summary
- `getAppsData()` - Apps organized by category
- `getGrowThePieData()` - GrowThePie fundamentals
- `getGrowThePieBlockspaceData()` - GrowThePie blockspace data
- `getGrowThePieMasterData()` - GrowThePie master data
- `getCommunityPicks()` - Community picks
- `getCalendarEvents()` - Community calendar events
- `getRSSData()` - RSS feeds from community blogs
- `getAttestantPosts()` - Attestant blog posts
- `getBeaconchainEpochData()` - Beaconchain epoch data
- `getBeaconchainEthstoreData()` - Beaconchain ETH store data
- `getBlobscanStats()` - Blobscan statistics
- `getEthereumMarketcapData()` - Ethereum market cap
- `getEthereumStablecoinsMcapData()` - Ethereum stablecoins market cap
- `getGFIs()` - GitHub good first issues
- `getGitHistory()` - GitHub commit history
- `getGithubRepoData()` - GitHub repository data
- `getStablecoinsData()` - Ethereum stablecoins data
- `getTotalEthStakedData()` - Total ETH staked
- `getTotalValueLockedData()` - Total value locked

**Benefits:**
- ✅ No internal details exposed (no task IDs or storage paths)
- ✅ Automatic type inference
- ✅ Framework-agnostic (can be extracted to separate service)

### 2. Next.js Adapter (`src/lib/data/index.ts`)

The adapter provides Next.js-specific caching using `unstable_cache`:

```typescript
import { getEthPrice } from "@/lib/data"

// Automatically cached + typed ✨
const price = await getEthPrice()
```

**Cache Durations:**
- **1 hour** (`BASE_TIME_UNIT`) - Most frequently updated data (prices, metrics, feeds)
- **24 hours** (`BASE_TIME_UNIT * 24`) - Less frequently changing data (apps, community picks, GitHub repo data)

**Why separate adapter?**
- Caching is the app's concern, not the data-layer's
- Data-layer stays framework-agnostic
- Easy to adjust cache settings per data source
- Easy to extract data-layer to its own service later

### 3. API Functions (`/api`)

Each API function:
- Fetches data from an external source
- Exports a unique `TASK_ID` constant
- Returns typed data
- Handles errors gracefully
- Includes console logging

Example:
```typescript
export const FETCH_ETH_PRICE_TASK_ID = "fetch-eth-price"

export async function fetchEthPrice(): Promise<MetricReturnData> {
  // Fetch logic...
  return { value: price, timestamp: Date.now() }
}
```

### 4. Storage Layer (`/storage`)

**Unified Storage Interface** (`types.ts`):
```typescript
export interface Storage {
  get<T>(taskId: TaskId): Promise<StorageResult<T> | null>
  set(taskId: TaskId, data: unknown, metadata?: StorageMetadata): Promise<void>
}
```

**Implementations:**
- `netlifyBlobsStorage.ts` - Production storage using Netlify Blobs
- `mockStorage.ts` - Local development using JSON files

**Public API** (`getter.ts` / `setter.ts`):
- `getData<T>(taskId)` - Retrieve data without metadata
- `getData<T>(taskId, { withMetadata: true })` - Retrieve data with metadata
- `setData<T>(taskId, data)` - Store data with automatic metadata

**Storage Configuration:**
- Requires `SITE_ID` (auto-provided by Netlify) and `NETLIFY_BLOBS_TOKEN` environment variables
- Throws error if credentials are missing (no silent fallback)
- Use `USE_MOCK_DATA=true` for local development

### 5. Registry (`registry.ts`)

Central registry organizing tasks by schedule:
- `dailyTasks` - Tasks that run daily at midnight UTC
- `hourlyTasks` - Tasks that run hourly
- `tasks` - Combined array of all tasks

Each task entry:
```typescript
{
  id: "fetch-eth-price",
  fetchFunction: fetchEthPrice
}
```

### 6. Trigger.dev Tasks (`/trigger/tasks`)

**Daily Task** (`daily.ts`):
- Runs at midnight UTC (`0 0 * * *`)
- Executes all tasks in `dailyTasks` registry **in parallel** using `Promise.allSettled`
- Stores results using `setData`
- Individual task failures don't stop other tasks

**Hourly Task** (`hourly.ts`):
- Runs every hour (`0 * * * *`)
- Executes all tasks in `hourlyTasks` registry **in parallel** using `Promise.allSettled`
- Stores results using `setData`
- Individual task failures don't stop other tasks

**Why consolidated tasks?**
Trigger.dev free tier limits to 10 schedules. By consolidating into 2 tasks (daily/hourly), we stay within limits while supporting many data sources.

**Why parallelized?**
Tasks now run concurrently instead of sequentially, dramatically reducing execution time.

## Usage

### In App Code (Recommended)

Use the Next.js adapter for automatic caching:

```typescript
import { getEthPrice, getL2beatData } from "@/lib/data"

// In a Next.js page or API route
export default async function Page() {
  const price = await getEthPrice() // Cached + typed ✨
  const l2beat = await getL2beatData()
  
  return <div>Price: {price?.value}</div>
}
```

### Direct Data-Layer Access

For non-Next.js contexts or when you don't need caching:

```typescript
import { getEthPrice } from "@/data-layer"

const price = await getEthPrice() // Returns MetricReturnData | null
```

### Type Imports

Import types from their canonical locations:

```typescript
import type { MetricReturnData, L2beatData } from "@/lib/types"
import { getEthPrice, getL2beatData } from "@/lib/data"
```

## Testing

Unit tests are available in `tests/unit/data-layer/`:

```bash
# Run all unit tests
npm run test:unit
```

Tests validate:
- ✅ Functions execute without errors
- ✅ Return types match expected structures
- ✅ Handle null cases gracefully
- ✅ Data structure validation when data is present

See `tests/unit/data-layer/getters.spec.ts` for test examples.

## Adding a New Data Source

1. **Create API function** in `/api`:
   ```typescript
   // src/data-layer/api/fetchNewData.ts
   export const FETCH_NEW_DATA_TASK_ID = "fetch-new-data"
   
   export async function fetchNewData(): Promise<YourDataType> {
     // Fetch logic...
   }
   ```

2. **Add type to `src/lib/types.ts`** (if not already defined):
   ```typescript
   export type YourDataType = {
     // type definition
   }
   ```

3. **Add getter function** to `src/data-layer/index.ts`:
   ```typescript
   import { FETCH_NEW_DATA_TASK_ID } from "./api/fetchNewData"
   import type { YourDataType } from "@/lib/types"
   
   export async function getNewData(): Promise<YourDataType | null> {
     return getData<YourDataType>(FETCH_NEW_DATA_TASK_ID)
   }
   ```

4. **Add to registry** in `registry.ts`:
   ```typescript
   import { FETCH_NEW_DATA_TASK_ID, fetchNewData } from "./api/fetchNewData"
   
   // Add to dailyTasks or hourlyTasks array
   {
     id: FETCH_NEW_DATA_TASK_ID,
     fetchFunction: fetchNewData,
   }
   ```

5. **Add adapter function** to `src/lib/data/index.ts`:
   ```typescript
   export const getNewData = unstable_cache(
     () => dataLayer.getNewData(),
     ["new-data"],
     { revalidate: CACHE_REVALIDATE_HOUR }
   )
   ```

6. **Task is automatically discovered** by Trigger.dev and will run on the appropriate schedule

## Environment Variables

**Required for production:**
- `SITE_ID` - Netlify site ID (auto-provided by Netlify during builds)
- `NETLIFY_BLOBS_TOKEN` - Netlify Blobs access token (required, throws error if missing)
- `TRIGGER_PROJECT_ID` - Trigger.dev project ID

**Optional for local development:**
- `USE_MOCK_DATA=true` - Use mock storage instead of Netlify Blobs

## Error Handling

- **Parallel Execution** - Tasks run concurrently using `Promise.allSettled`
- **Graceful Degradation** - Individual task failures don't stop other tasks from running
- **Error Logging** - All errors are logged with task context
- **Retry Logic** - Trigger.dev handles retries (configured in `trigger.config.ts`)

## Storage Metadata

Each stored item includes metadata:
```typescript
{
  storedAt: "2024-01-01T00:00:00.000Z" // ISO timestamp
}
```

This allows tracking when data was last updated.

## Mock Data

Mock data files are stored in `src/data-layer/mocks/` and can be regenerated:

```bash
npx dotenv-cli -e .env -- npx ts-node -r tsconfig-paths/register -O '{"module":"commonjs"}' src/data-layer/mocks/generate-mocks.ts
```

This pulls data from Netlify Blobs storage and saves it as JSON files for local development.

## Troubleshooting

### Mock storage not working
- Ensure `USE_MOCK_DATA=true` is set in `.env`
- Verify mock files exist in `/data-layer/mocks/`
- Regenerate mocks if needed: `npm run generate-mocks` (if script exists)

### Netlify Blobs errors
- Verify `SITE_ID` (auto-provided by Netlify) and `NETLIFY_BLOBS_TOKEN` are set
- Check error message for specific configuration issues
- Storage will throw clear error if credentials are missing

### Trigger.dev tasks not running
- Check `TRIGGER_PROJECT_ID` is set
- Verify task is registered in `registry.ts`
- Check Trigger.dev dashboard for errors
- Tasks run in parallel - check logs for individual task failures

### Type errors
- Ensure types are defined in `src/lib/types.ts`
- Import types from `@/lib/types`, not from data-layer
- Import functions from `@/lib/data` (adapter) or `@/data-layer` (direct)
