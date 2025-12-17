import { getStore } from "@netlify/blobs"

import type { Storage, StorageMetadata, StorageResult, TaskId } from "../types"

let store: ReturnType<typeof getStore> | null = null

function getBlobStore() {
  if (store) return store

  const siteID = process.env.NETLIFY_BLOBS_SITE_ID
  const token = process.env.NETLIFY_BLOBS_TOKEN

  if (!siteID || !token) {
    throw new Error(
      "Missing NETLIFY_BLOBS_SITE_ID or NETLIFY_BLOBS_TOKEN env vars"
    )
  }

  store = getStore({
    name: "data-layer",
    siteID,
    token,
  } as Parameters<typeof getStore>[0])

  return store
}

export const netlifyBlobsStorage: Storage = {
  async get<T>(taskId: TaskId): Promise<StorageResult<T> | null> {
    const blobStore = getBlobStore()
    const blob = await blobStore.get(taskId, { type: "text" })

    if (!blob) return null

    const data = JSON.parse(blob) as T
    const blobMetadataResult = await blobStore.getMetadata(taskId)
    const storedAtValue = blobMetadataResult?.metadata?.storedAt
    const metadata: StorageMetadata = {
      storedAt:
        typeof storedAtValue === "string"
          ? storedAtValue
          : new Date().toISOString(),
    }

    return { data, metadata }
  },

  async set(
    taskId: TaskId,
    data: unknown,
    metadata?: StorageMetadata
  ): Promise<void> {
    const blobStore = getBlobStore()
    await blobStore.set(taskId, JSON.stringify(data), {
      metadata: metadata ? { storedAt: metadata.storedAt } : {},
    })
  },
}
