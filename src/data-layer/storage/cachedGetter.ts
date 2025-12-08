/**
 * Cached getter wrapper for Next.js integration.
 *
 * Wraps the data layer getter with Next.js caching and revalidation support.
 * This allows pages to use the data layer while maintaining Next.js cache control.
 */

import { unstable_cache } from "next/cache"

import type { tasks } from "../registry"

import { getData } from "./getter"

type TaskId = (typeof tasks)[number]["id"]

/**
 * Get data from storage with Next.js caching and revalidation.
 *
 * @param taskId - The task ID to retrieve data for
 * @param revalidate - Revalidation time in seconds (default: 60)
 * @returns The stored data, or null if not found
 */
export async function getCachedData<T>(
  taskId: TaskId,
  revalidate: number = 60
): Promise<T | null> {
  return unstable_cache(
    async () => {
      return await getData<T>(taskId)
    },
    [taskId],
    {
      revalidate,
      tags: [`data-layer-${taskId}`],
    }
  )()
}

/**
 * Get data from storage with metadata and Next.js caching.
 *
 * @param taskId - The task ID to retrieve data for
 * @param revalidate - Revalidation time in seconds (default: 60)
 * @returns The stored data with metadata, or null if not found
 */
export async function getCachedDataWithMetadata<T>(
  taskId: TaskId,
  revalidate: number = 60
): Promise<{ data: T; metadata: { storedAt: string } } | null> {
  return unstable_cache(
    async () => {
      return await getData<T>(taskId, { withMetadata: true })
    },
    [taskId],
    {
      revalidate,
      tags: [`data-layer-${taskId}`],
    }
  )()
}
