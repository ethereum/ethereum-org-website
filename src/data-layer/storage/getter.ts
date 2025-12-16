/**
 * Abstract storage getter for data-layer tasks.
 *
 * This provides a storage-agnostic interface that can be swapped between
 * different storage implementations (Netlify Blobs, S3, etc.).
 */

import type { Storage, StorageMetadata, TaskId } from "../types"

import { mockStorage } from "./mockStorage"
import { netlifyBlobsStorage } from "./netlifyBlobsStorage"

/**
 * Default storage implementation to use.
 * Uses mock storage in development if USE_MOCK_DATA is set, otherwise Netlify Blobs.
 */
const defaultStorage: Storage =
  process.env.USE_MOCK_DATA === "true" ? mockStorage : netlifyBlobsStorage

/**
 * Get data from storage
 * @param taskId - The task ID to retrieve data for
 * @returns The stored data, or null if not found
 */
export async function getData<T>(taskId: TaskId): Promise<T | null>

/**
 * Get data from storage with metadata
 * @param taskId - The task ID to retrieve data for
 * @param options - Configuration options
 * @param options.withMetadata - Set to true to include metadata
 * @returns The stored data with metadata, or null if not found
 */
export async function getData<T>(
  taskId: TaskId,
  options: { withMetadata: true }
): Promise<{ data: T; metadata: StorageMetadata } | null>

/**
 * Implementation
 */
export async function getData<T>(
  taskId: TaskId,
  options?: { withMetadata?: boolean }
): Promise<T | { data: T; metadata: StorageMetadata } | null> {
  try {
    const result = await defaultStorage.get<T>(taskId)

    if (!result) {
      // Log when data is not found (this is expected if data hasn't been populated yet)
      console.warn(`[Data Layer] No data found for task: ${taskId}`)
      return null
    }

    return options?.withMetadata ? result : result.data
  } catch (error) {
    // Log the error with context for debugging
    const errorMessage = error instanceof Error ? error.message : String(error)
    const errorStack = error instanceof Error ? error.stack : undefined

    // Log full error details
    console.error(`[Data Layer] Error retrieving data for task "${taskId}":`)
    console.error(`  Error message: ${errorMessage}`)
    console.error(`  USE_MOCK_DATA: ${process.env.USE_MOCK_DATA}`)
    if (errorStack) {
      console.error(`  Stack trace:`, errorStack)
    }

    // Re-throw the original error to preserve its message and stack
    // This ensures mockStorage's detailed error messages are visible
    throw error
  }
}
