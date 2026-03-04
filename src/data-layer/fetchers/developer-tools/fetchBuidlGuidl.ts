import { DeveloperToolsResponse } from "@/lib/types"

export async function fetchBuidlGuidl(): Promise<DeveloperToolsResponse[]> {
  const url =
    "https://raw.githubusercontent.com/BuidlGuidl/Developer-Tooling/refs/heads/main/output/results.json"

  console.log("Starting BuidlGuidl developer tooling data fetch")

  const response = await fetch(url)

  if (!response.ok) {
    const status = response.status
    console.warn("GitHub developer apps fetch non-OK", { status, url })
    const error = `GitHub responded with status ${status}`
    throw new Error(error)
  }

  const json: DeveloperToolsResponse[] = await response.json()

  console.log("Successfully fetched BuidlGuidl developer tooling data")

  return json
}
