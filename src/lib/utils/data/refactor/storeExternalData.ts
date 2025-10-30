import { ExternalDataMap } from "./fetchExternalData"
import { redisStoreFunction } from "./redisStoreFunction"
import { supabaseStoreFunction } from "./supabaseStoreFunction"

/**
 * Stores external data using multiple storage methods (Redis and Supabase).
 * This function abstracts the storage layer, making it easy to swap storage implementations.
 *
 * @param data The external data map to store
 * @returns Promise that resolves to true if storage was successful, false otherwise
 */
export const storeExternalData = async (
  data: ExternalDataMap
): Promise<boolean> => {
  if (Object.keys(data).length === 0) {
    console.warn("No data to store")
    return false
  }
  console.log("Storing external data...")
  const successRedis = await redisStoreFunction(data)
  const successSupabase = await supabaseStoreFunction(data)

  return successRedis && successSupabase
}
