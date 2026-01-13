import type { Storage, StorageMetadata, TaskId } from "../types"

import { mockStorage } from "./mockStorage"
import { netlifyBlobsStorage } from "./netlifyBlobsStorage"

const defaultStorage: Storage =
  process.env.USE_MOCK_DATA === "true" ? mockStorage : netlifyBlobsStorage

export async function setData<T>(taskId: TaskId, data: T): Promise<void> {
  const metadata: StorageMetadata = { storedAt: new Date().toISOString() }
  await defaultStorage.set(taskId, data, metadata)
}
