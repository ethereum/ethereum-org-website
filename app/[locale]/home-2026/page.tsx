import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import Homepage2026 from "@/components/Homepage/Homepage2026"

import { getMetadata } from "@/lib/utils/metadata"

import { LOCALES_CODES } from "@/lib/constants"

import { getAccountHolders, getGrowThePieData } from "@/lib/data"

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params

  if (!LOCALES_CODES.includes(locale)) return notFound()

  setRequestLocale(locale)

  const [growThePieData, accountHolders] = await Promise.all([
    getGrowThePieData(),
    getAccountHolders(),
  ])

  // Handle null cases - throw error if required data is missing
  if (!growThePieData) {
    throw new Error("Failed to fetch GrowThePie data")
  }
  if (!accountHolders || "error" in accountHolders) {
    throw new Error("Failed to fetch account holders data")
  }

  const accountHoldersValue = accountHolders.value
  const transactionsToday =
    "value" in growThePieData.txCount ? growThePieData.txCount.value : 0

  return (
    <Homepage2026
      locale={locale as Lang}
      accountHolders={accountHoldersValue}
      transactionsToday={transactionsToday}
    />
  )
}

export default Page

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = params

  const t = await getTranslations({ locale, namespace: "page-index" })
  return getMetadata({
    locale,
    slug: ["home-2026"],
    title: t("page-index-meta-title"),
    description: t("page-index-meta-description"),
  })
}
