/**
 * Type definitions for the data-layer module.
 */

import type { tasks } from "./registry"

export type TaskId = (typeof tasks)[number]["id"]

/**
 * Metadata stored alongside data.
 */
export interface StorageMetadata {
  storedAt: string
}

/**
 * Result shape when retrieving data with metadata.
 */
export interface StorageResult<T> {
  data: T
  metadata: StorageMetadata
}

/**
 * Unified storage interface.
 * Implementations must provide both get and set methods.
 */
export interface Storage {
  /**
   * Retrieve data for a task.
   * @param taskId - The task ID to use as the storage key
   * @returns The stored data with metadata, or null if not found
   */
  get<T>(taskId: TaskId): Promise<StorageResult<T> | null>

  /**
   * Store data for a task with optional metadata.
   * @param taskId - The task ID to use as the storage key
   * @param data - Data to store (will be serialized)
   * @param metadata - Optional metadata about the stored data
   */
  set(taskId: TaskId, data: unknown, metadata?: StorageMetadata): Promise<void>
}
