/**
 * Abstract storage getter for data-layer tasks.
 *
 * This provides a storage-agnostic interface that can be swapped between
 * different storage implementations (Netlify Blobs, S3, etc.).
 */

import type { tasks } from "../registry"
import type { StorageMetadata } from "../types"

import { netlifyBlobsStorage } from "./netlifyBlobs"

type TaskId = (typeof tasks)[number]["id"]

/**
 * Storage implementation interface for getting data.
 * Implementations must provide a get method that retrieves data by task ID.
 */
export interface GetStorageImplementation {
  /**
   * Retrieve data for a task
   * @param taskId - The task ID to use as the storage key
   * @returns The stored data with metadata, or null if not found
   */
  get<T>(taskId: TaskId): Promise<{ data: T; metadata: StorageMetadata } | null>
}

/**
 * Default storage implementation to use.
 * Uses Netlify Blobs for all environments.
 */
const defaultStorage: GetStorageImplementation = netlifyBlobsStorage

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
