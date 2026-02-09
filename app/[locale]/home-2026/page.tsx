import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import Homepage2026 from "@/components/Homepage/Homepage2026"

import { LOCALES_CODES } from "@/lib/constants"

import { getAccountHolders, getApyRates, getGrowThePieData } from "@/lib/data"

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params

  if (!LOCALES_CODES.includes(locale)) return notFound()

  setRequestLocale(locale)

  const [growThePieData, accountHolders, apyRates] = await Promise.all([
    getGrowThePieData(),
    getAccountHolders(),
    getApyRates(),
  ])

  const accountHoldersValue =
    accountHolders && "value" in accountHolders
      ? accountHolders.value
      : 290_000_000
  const transactionsToday =
    growThePieData && "value" in growThePieData.txCount
      ? growThePieData.txCount.value
      : 0
  const apyData = apyRates ?? {
    traditional: { label: "Traditional Savings", apy: 0.5 },
    ethereum: { label: "Ethereum Apps", apyMin: 4, apyMax: 8 },
  }

  return (
    <Homepage2026
      locale={locale as Lang}
      accountHolders={accountHoldersValue}
      transactionsToday={transactionsToday}
      apyData={apyData}
    />
  )
}

export default Page
