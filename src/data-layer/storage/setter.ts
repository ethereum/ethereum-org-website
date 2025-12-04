/**
 * Abstract storage setter for data-layer tasks.
 *
 * This provides a storage-agnostic interface that can be swapped between
 * different storage implementations (Netlify Blobs, S3, etc.).
 */

import type { tasks } from "../registry"
import type { StorageMetadata } from "../types"

import { netlifyBlobsStorage } from "./netlifyBlobs"

type TaskId = (typeof tasks)[number]["id"]

/**
 * Storage implementation interface.
 * Implementations must provide a set method that stores data by task ID.
 */
export interface StorageImplementation {
  /**
   * Store data for a task with optional metadata
   * @param taskId - The task ID to use as the storage key
   * @param data - Data to store (will be serialized)
   * @param metadata - Optional metadata about the stored data
   */
  set(taskId: TaskId, data: unknown, metadata?: StorageMetadata): Promise<void>
}

/**
 * Default storage implementation to use.
 * Uses Netlify Blobs for all environments.
 */
const defaultStorage: StorageImplementation = netlifyBlobsStorage

export async function setData<T>(taskId: TaskId, data: T): Promise<void> {
  const metadata: StorageMetadata = {
    storedAt: new Date().toISOString(),
  }

  await defaultStorage.set(taskId, data, metadata)
}
