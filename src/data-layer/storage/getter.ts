import type { Storage, StorageMetadata, TaskId } from "../types"

import { mockStorage } from "./mockStorage"
import { netlifyBlobsStorage } from "./netlifyBlobsStorage"

const defaultStorage: Storage =
  process.env.USE_MOCK_DATA === "true" ? mockStorage : netlifyBlobsStorage

/** Get data from storage. Pass `{ withMetadata: true }` to include metadata. */
export async function getData<T>(taskId: TaskId): Promise<T | null>
export async function getData<T>(
  taskId: TaskId,
  options: { withMetadata: true }
): Promise<{ data: T; metadata: StorageMetadata } | null>
export async function getData<T>(
  taskId: TaskId,
  options?: { withMetadata?: boolean }
): Promise<T | { data: T; metadata: StorageMetadata } | null> {
  try {
    const result = await defaultStorage.get<T>(taskId)

    if (!result) {
      console.warn(`[Data Layer] No data found for task: ${taskId}`)
      return null
    }

    return options?.withMetadata ? result : result.data
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error(`[Data Layer] Error for "${taskId}": ${errorMessage}`)
    throw error
  }
}
