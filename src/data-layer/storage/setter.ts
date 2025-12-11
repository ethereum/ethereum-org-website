/**
 * Abstract storage setter for data-layer tasks.
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

export async function setData<T>(taskId: TaskId, data: T): Promise<void> {
  const metadata: StorageMetadata = {
    storedAt: new Date().toISOString(),
  }

  await defaultStorage.set(taskId, data, metadata)
}
