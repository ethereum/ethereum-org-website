import type { GrowThePieData } from "@/lib/types"

export const fetchGrowThePie = async (): Promise<GrowThePieData> => {
  // Use Netlify's URL environment variables
  const baseUrl =
    process.env.URL || process.env.DEPLOY_URL || "http://localhost:3000"
  const response = await fetch(`${baseUrl}/api/growthepie`)
  if (!response.ok) {
    console.log(response.status, response.statusText)
    throw new Error("Failed to fetch growthepie data")
  }
  return response.json()
}
