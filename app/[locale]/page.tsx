import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { PageParams } from "@/lib/types"

import Homepage2026 from "@/components/Homepage/Homepage2026"

import { getMetadata } from "@/lib/utils/metadata"

import { DEFAULT_LOCALE, LOCALES_CODES } from "@/lib/constants"

import IndexPageJsonLD from "./page-jsonld"

import { getAccountHolders, getGrowThePieData } from "@/lib/data"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  if (!LOCALES_CODES.includes(locale)) return notFound()

  setRequestLocale(locale)

  const [accountHoldersData, growThePieData] = await Promise.all([
    getAccountHolders(),
    getGrowThePieData(),
  ])

  if (!accountHoldersData) {
    throw new Error("Failed to fetch account holders data")
  }
  if (!growThePieData) {
    throw new Error("Failed to fetch GrowThePie data")
  }

  const accountHolders =
    "value" in accountHoldersData ? accountHoldersData.value : null

  const transactionsToday =
    "value" in growThePieData.txCount ? growThePieData.txCount.value : null

  return (
    <>
      <IndexPageJsonLD locale={locale} />
      <Homepage2026
        locale={locale}
        accountHolders={accountHolders}
        transactionsToday={transactionsToday}
      />
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  try {
    const t = await getTranslations("page-index")
    return await getMetadata({
      locale,
      slug: [""],
      title: t("page-index-meta-title"),
      description: t("page-index-meta-description"),
    })
  } catch (error) {
    const t = await getTranslations({
      locale: DEFAULT_LOCALE,
      namespace: "common",
    })

    // Return basic metadata for invalid paths
    return {
      title: t("page-not-found"),
      description: t("page-not-found-description"),
    }
  }
}

export default Page
