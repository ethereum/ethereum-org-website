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
