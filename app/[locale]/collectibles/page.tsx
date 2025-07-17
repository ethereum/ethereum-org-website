import { pick } from "lodash"
import { getMessages, setRequestLocale } from "next-intl/server"

import { Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import CollectiblesPage from "./_components/collectibles"

// API endpoints
export const BASE_URL = "https://ethereum-org-collectibles.vercel.app"
const BADGES_API = `${BASE_URL}/api/badges`
const STATS_API = `${BASE_URL}/api/stats`

// Data fetching
async function fetchBadges() {
  const res = await fetch(BADGES_API)
  if (!res.ok) throw new Error("Failed to fetch badges")
  return res.json()
}
async function fetchStats() {
  const res = await fetch(STATS_API)
  if (!res.ok) throw new Error("Failed to fetch stats")
  return res.json()
}

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

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Lang }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  // Fetch data
  const [badges, stats]: [Badge[], Stats] = await Promise.all([
    fetchBadges(),
    fetchStats(),
  ])

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/collectibles/")
  const pickedMessages = pick(allMessages, requiredNamespaces)

  return (
    <I18nProvider locale={locale} messages={pickedMessages}>
      <CollectiblesPage badges={badges} stats={stats} locale={locale} />
    </I18nProvider>
  )
}
