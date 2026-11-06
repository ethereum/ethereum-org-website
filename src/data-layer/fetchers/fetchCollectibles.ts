import { fetchRetry } from "./fetchRetry"

const BASE_URL = "https://ethereum-org-collectibles.vercel.app/api"

export type Badge = {
  id: string
  name: string
  image: string
  link: string
  category: string
  year: string
  description: string
  collectors_count: number
}

export type Stats = {
  collectorsCount: number
  uniqueAddressesCount: number
  collectiblesCount: number
}

export type CollectiblesData = {
  badges: Badge[]
  stats: Stats
}

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetchRetry(`${BASE_URL}/${path}`)
  if (!response.ok) {
    throw new Error(`Collectibles API ${path}: ${response.status}`)
  }
  return response.json()
}

export async function fetchCollectibles(): Promise<CollectiblesData> {
  const [badges, stats] = await Promise.all([
    fetchJson<Badge[]>("badges"),
    fetchJson<Stats>("stats"),
  ])
  return { badges, stats }
}
