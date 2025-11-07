import { fetchExternalData } from "@/lib/utils/data/fetchExternalData"
import { storeExternalData } from "@/lib/utils/data/storeExternalData"

import { externalServicesHourly } from "@/data/external-services"

import "dotenv/config"

/**
 * CRON job function to fetch and store external data in Redis.
 * This version runs hourly.
 * Optionally set EXTERNAL_DATA_TTL_SECONDS environment variable to set TTL for stored data.
 */
export const externalDataStorageCRONHourly = async () => {
  try {
    console.log("Starting external data fetch and storage (hourly)...")
    const externalData = await fetchExternalData(externalServicesHourly)

    const success = await storeExternalData(externalData)

    if (success) {
      console.log("External data storage completed successfully")
    } else {
      console.error("External data storage completed with errors")
      process.exit(1)
    }
  } catch (error) {
    console.error("Error in external data storage CRON:", error)
    process.exit(1)
  }
}

// Run if executed directly
if (require.main === module) {
  externalDataStorageCRONHourly()
}
