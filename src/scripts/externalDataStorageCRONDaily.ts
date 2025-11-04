import { fetchExternalData } from "@/lib/utils/data/refactor/fetchExternalData"
import { storeExternalData } from "@/lib/utils/data/refactor/storeExternalData"

import { externalServicesDaily } from "@/data/external-services"

import "dotenv/config"

/**
 * CRON job function to fetch and store external data in Redis.
 * This version runs daily.
 * Optionally set EXTERNAL_DATA_TTL_SECONDS environment variable to set TTL for stored data.
 */
export const externalDataStorageCRONDaily = async () => {
  try {
    console.log("Starting external data fetch and storage (daily)...")
    const externalData = await fetchExternalData(externalServicesDaily)

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
  externalDataStorageCRONDaily()
}
