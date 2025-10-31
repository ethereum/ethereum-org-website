import { MetricReturnData } from "@/lib/types"

import { externalServices } from "@/data/external-services"

export type ExternalDataMap = Record<
  string,
  MetricReturnData | Record<string, MetricReturnData>
>

// TODO: Make fetchExternalDAily, fetchExternalWeekly, fetchExternalHourly, etc...

export const fetchExternalData = async (): Promise<ExternalDataMap> => {
  const results = await Promise.all(
    externalServices.map(async (service) => {
      try {
        const data = await service.function()
        return { key: service.key, data: data as MetricReturnData }
      } catch (error) {
        return {
          key: service.key,
          data: {
            error: error instanceof Error ? error.message : String(error),
          } as MetricReturnData,
        }
      }
    })
  )

  return results.reduce((acc, { key, data }) => {
    acc[key] = data
    return acc
  }, {} as ExternalDataMap)
}

// Allow running this file directly from the CLI:
//   npx tsx src/lib/utils/data/refactor/fetchExternalData.ts
if (require.main === module) {
  import("dotenv/config").then(async () => {
    try {
      const data = await fetchExternalData()
      console.log(data)
      process.exit(0)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error running fetchExternalData:", error)
      process.exit(1)
    }
  })
}
