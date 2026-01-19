import { DeveloperAppsResponse } from "@/lib/types"

export async function fetchDeveloperApps(): Promise<DeveloperAppsResponse[]> {
  const url =
    "https://raw.githubusercontent.com/BuidlGuidl/Developer-Tooling/refs/heads/main/output/results.json"

  console.log("Starting GitHub developer apps data fetch")

  const response = await fetch(url)

  if (!response.ok) {
    const status = response.status
    console.warn("GitHub developer apps fetch non-OK", { status, url })
    const error = `GitHub responded with status ${status}`
    throw new Error(error)
  }

  const json: DeveloperAppsResponse[] = await response.json()

  console.log("Successfully fetched GitHub developer apps data")

  return json
}
