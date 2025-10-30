import { MetricReturnData } from "@/lib/types"

import { externalServices } from "@/data/external-services"

export type ExternalDataMap = Record<
  string,
  MetricReturnData | Record<string, MetricReturnData>
>

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
