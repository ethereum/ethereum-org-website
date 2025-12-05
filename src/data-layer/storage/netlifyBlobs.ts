import { getStore } from "@netlify/blobs"

import type { tasks } from "../registry"
import type { StorageMetadata } from "../types"

import type { GetStorageImplementation } from "./getter"
import type { StorageImplementation } from "./setter"

type TaskId = (typeof tasks)[number]["id"]

/**
 * Netlify Blobs storage implementation for data-layer tasks.
 *
 * Uses Netlify Blobs to store task data with metadata.
 * The store name "data-layer" acts as a namespace for all task data.
 *
 * Store is initialized lazily to avoid errors when environment isn't configured.
 */
let store: ReturnType<typeof getStore> | null = null

function getBlobStore() {
  if (!store) {
    // Check if Netlify Blobs is configured
    // In local development, these might not be set
    const siteID = process.env.NETLIFY_BLOBS_SITE_ID || ""
    const token = process.env.NETLIFY_BLOBS_TOKEN || ""

    if (siteID && token) {
      // Manual configuration for local development
      // getStore accepts options object with name, siteID, and token
      store = getStore({
        name: "data-layer",
        siteID,
        token,
      } as Parameters<typeof getStore>[0])
    } else {
      // Try automatic configuration (works in Netlify environment)
      // This will use NETLIFY_BLOBS_CONTEXT if available
      store = getStore("data-layer")
    }
  }
  return store
}

export const netlifyBlobsStorage: StorageImplementation &
  GetStorageImplementation = {
  async set(
    taskId: TaskId,
    data: unknown,
    metadata?: StorageMetadata
  ): Promise<void> {
    try {
      // Initialize store lazily (only when actually needed)
      const blobStore = getBlobStore()

      // Serialize data to JSON
      const jsonData = JSON.stringify(data)

      // Store with metadata (Netlify Blobs accepts metadata as a Record<string, string>)
      const blobMetadata: Record<string, string> = metadata
        ? {
            storedAt: metadata.storedAt,
          }
        : {}

      await blobStore.set(taskId, jsonData, {
        metadata: blobMetadata,
      })

      console.log(`[Netlify Blobs] Stored data for task: ${taskId}`)
    } catch (error) {
      console.error(
        `[Netlify Blobs] Failed to store data for task: ${taskId}`,
        error
      )
      throw error
    }
  },

  async get<T>(
    taskId: TaskId
  ): Promise<{ data: T; metadata: StorageMetadata } | null> {
    try {
      // Initialize store lazily (only when actually needed)
      const blobStore = getBlobStore()

      // Get the blob data
      const blob = await blobStore.get(taskId, {
        type: "text",
      })

      if (!blob) {
        console.log(`[Netlify Blobs] No data found for task: ${taskId}`)
        return null
      }

      // Parse JSON data
      const data = JSON.parse(blob) as T

      // Get metadata from blob
      // getMetadata returns { etag, metadata } where metadata is a Record<string, string>
      const blobMetadataResult = await blobStore.getMetadata(taskId)
      const storedAtValue = blobMetadataResult?.metadata?.storedAt
      const metadata: StorageMetadata = {
        storedAt:
          storedAtValue && typeof storedAtValue === "string"
            ? storedAtValue
            : new Date().toISOString(),
      }

      console.log(`[Netlify Blobs] Retrieved data for task: ${taskId}`)
      return { data, metadata }
    } catch (error) {
      console.error(
        `[Netlify Blobs] Failed to retrieve data for task: ${taskId}`,
        error
      )
      throw error
    }
  },
}
