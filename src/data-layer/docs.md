# Data Layer Documentation

The data layer is a centralized system for fetching, storing, and retrieving external data for the Ethereum.org website. It uses Trigger.dev for scheduled background jobs and Netlify Blobs for persistent storage.

## Overview

The data layer provides:
- **Scheduled data fetching** - Automated background jobs that fetch data from external APIs
- **Persistent storage** - Centralized storage for fetched data using Netlify Blobs
- **Type-safe access** - TypeScript interfaces for accessing stored data
- **Mock data support** - Local development without external dependencies

## Architecture

```
src/data-layer/
├── api/              # Data fetching functions (one per external data source)
├── storage/          # Storage abstraction layer (getter/setter)
├── trigger/          # Trigger.dev scheduled tasks
├── mocks/            # Mock data files for local development
├── registry.ts        # Central registry of all tasks
└── types.ts          # Shared type definitions
```

### Components

#### 1. API Functions (`/api`)

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

#### 2. Storage Layer (`/storage`)

**Getter** (`getter.ts`):
- `getData<T>(taskId)` - Retrieve data without metadata
- `getData<T>(taskId, { withMetadata: true })` - Retrieve data with metadata

**Setter** (`setter.ts`):
- `setData<T>(taskId, data)` - Store data with automatic metadata

**Implementations**:
- `netlifyBlobs.ts` - Production storage using Netlify Blobs
- `mockStorage.ts` - Local development using JSON files

#### 3. Registry (`registry.ts`)

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

#### 4. Trigger.dev Tasks (`/trigger/tasks`)

**Daily Task** (`daily.ts`):
- Runs at midnight UTC (`0 0 * * *`)
- Executes all tasks in `dailyTasks` registry
- Stores results using `setData`

**Hourly Task** (`hourly.ts`):
- Runs every hour (`0 * * * *`)
- Executes all tasks in `hourlyTasks` registry
- Stores results using `setData`

**Why consolidated tasks?**
Trigger.dev free tier limits to 10 schedules. By consolidating into 2 tasks (daily/hourly), we stay within limits while supporting many data sources.

## Usage

### Retrieving Data

```typescript
import { getData } from "@/data-layer/storage/getter"
import { FETCH_ETH_PRICE_TASK_ID } from "@/data-layer/api/fetchEthPrice"

// Get data without metadata
const priceData = await getData(FETCH_ETH_PRICE_TASK_ID)

// Get data with metadata (includes storedAt timestamp)
const priceDataWithMeta = await getData(FETCH_ETH_PRICE_TASK_ID, {
  withMetadata: true
})
```

### Storing Data

```typescript
import { setData } from "@/data-layer/storage/setter"
import { FETCH_ETH_PRICE_TASK_ID } from "@/data-layer/api/fetchEthPrice"

const data = { value: 3000, timestamp: Date.now() }
await setData(FETCH_ETH_PRICE_TASK_ID, data)
```

## Adding a New Data Source

1. **Create API function** in `/api`:
   ```typescript
   // src/data-layer/api/fetchNewData.ts
   export const FETCH_NEW_DATA_TASK_ID = "fetch-new-data"
   
   export async function fetchNewData(): Promise<YourDataType> {
     // Fetch logic...
   }
   ```

2. **Add to registry** in `registry.ts`:
   ```typescript
   import { FETCH_NEW_DATA_TASK_ID, fetchNewData } from "./api/fetchNewData"
   
   // Add to dailyTasks or hourlyTasks array
   {
     id: FETCH_NEW_DATA_TASK_ID,
     fetchFunction: fetchNewData,
   }
   ```

3. **Task is automatically discovered** by Trigger.dev and will run on the appropriate schedule

## Environment Variables

Required for production:
- `TRIGGER_PROJECT_ID` - Trigger.dev project ID
- `NETLIFY_BLOBS_SITE_ID` - Netlify Blobs site ID
- `NETLIFY_BLOBS_TOKEN` - Netlify Blobs access token

Optional for local development:
- `USE_MOCK_DATA=true` - Use mock storage instead of Netlify Blobs

## Error Handling

- **Sentry Integration** - All task failures are automatically reported to Sentry
- **Retry Logic** - Trigger.dev handles retries (configured in `trigger.config.ts`)
- **Graceful Degradation** - Individual task failures don't stop other tasks from running

## Storage Metadata

Each stored item includes metadata:
```typescript
{
  storedAt: "2024-01-01T00:00:00.000Z" // ISO timestamp
}
```

This allows tracking when data was last updated.

## Troubleshooting

### Mock storage not working
- Ensure `USE_MOCK_DATA=true` is set in `.env`
- Verify mock files exist in `/data-layer/mocks/`
- Regenerate mocks if needed

### Trigger.dev tasks not running
- Check `TRIGGER_PROJECT_ID` is set
- Verify task is registered in `registry.ts`
- Check Trigger.dev dashboard for errors

### Storage errors
- Verify Netlify Blobs credentials are set
- Check network connectivity
- Review Sentry for error details

