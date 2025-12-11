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
  const result = await defaultStorage.get<T>(taskId)

  if (!result) {
    return null
  }

  return options?.withMetadata ? result : result.data
}
