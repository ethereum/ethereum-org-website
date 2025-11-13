/**
 * Supabase client utility for storing and retrieving external data.
 */

import { unstable_cache } from "next/cache"
import type { SupabaseClient } from "@supabase/supabase-js"

let supabaseClient: SupabaseClient | null = null
let hasWarned = false

/**
 * Initialize and return a Supabase client instance.
 */
export const getSupabaseClient = async (): Promise<SupabaseClient | null> => {
  if (supabaseClient) {
    return supabaseClient
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseAnonKey) {
    try {
      const { createClient } = await import("@supabase/supabase-js")
      supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
      return supabaseClient
    } catch (error) {
      console.error("Failed to initialize Supabase client:", error)
    }
  }

  if (!hasWarned) {
    console.warn(
      "Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables."
    )
    hasWarned = true
  }

  return null
}

/**
 * Store external data in Supabase with the standard key.
 * This abstracts the Supabase-specific storage logic for external data.
 *
 * @param key The data key (e.g., "beaconchainEpoch", "ethPrice")
 * @param value The data value to store
 * @returns Promise that resolves to true if storage was successful, false otherwise
 */
export const storeSupabase = async (
  key: string,
  value: unknown
): Promise<boolean> => {
  const client = await getSupabaseClient()
  if (!client) {
    console.warn("Supabase client not available, skipping storage")
    return false
  }

  try {
    // Upsert the data (insert or update if key already exists)
    const { error } = await client.from("external_data").upsert(
      {
        key: `external-data:${key}`,
        value: value,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "key",
      }
    )

    if (error) {
      console.error(`Failed to store data in Supabase for key "${key}":`, error)
      return false
    }

    return true
  } catch (error) {
    console.error(`Failed to store data in Supabase for key "${key}":`, error)
    return false
  }
}

/**
 * Internal function to fetch data from Supabase without caching.
 * This is the underlying function that will be cached by unstable_cache.
 */
async function fetchSupabaseDataUncached<T>(key: string): Promise<T | null> {
  const client = await getSupabaseClient()
  if (!client) {
    return null
  }

  try {
    const { data, error } = await client
      .from("external_data")
      .select("value")
      .eq("key", `external-data:${key}`)
      .single()

    if (error || !data) {
      return null
    }

    return data.value as T
  } catch (error) {
    console.error(
      `Failed to retrieve data from Supabase for key "${key}":`,
      error
    )
    return null
  }
}

/**
 * Retrieve external data from Supabase.
 * The result will be cached using Next.js unstable_cache.
 *
 * @param key The data key to retrieve
 * @param revalidateSeconds Revalidation time in seconds for Next.js caching.
 * @returns Promise that resolves to the data, or null if not found
 */
export const getSupabaseData = async <T>(
  key: string,
  revalidateSeconds: number
): Promise<T | null> => {
  const cachedFetch = unstable_cache(
    async () => fetchSupabaseDataUncached<T>(key),
    ["supabase-data", key],
    {
      revalidate: revalidateSeconds,
      tags: [`external-data:${key}`],
    }
  )
  return await cachedFetch()
}
