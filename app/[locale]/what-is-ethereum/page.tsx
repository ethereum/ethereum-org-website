import pick from "lodash.pick"
import { getTranslations } from "next-intl/server"

import { Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { dataLoader } from "@/lib/utils/data/dataLoader"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import WhatIsEthereumPage from "./_components/what-is-ethereum"

import { loadMessages } from "@/i18n/loadMessages"
import { fetchGrowThePie } from "@/lib/api/fetchGrowThePie"

const loadData = dataLoader([["growThePieData", fetchGrowThePie]])

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  // Get i18n messages
  const allMessages = await loadMessages(locale)
  const requiredNamespaces = getRequiredNamespacesForPage("/what-is-ethereum")
  const messages = pick(allMessages, requiredNamespaces)

  // Load data
  const [data] = await loadData()

  return (
    <I18nProvider locale={locale} messages={messages}>
      <WhatIsEthereumPage data={data.txCount} />
    </I18nProvider>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const t = await getTranslations({
    locale,
    namespace: "page-what-is-ethereum",
  })

  return await getMetadata({
    locale,
    slug: ["what-is-ethereum"],
    title: t("page-what-is-ethereum-meta-title"),
    description: t("page-what-is-ethereum-meta-description"),
    image: "/images/what-is-ethereum.png",
  })
}

export default Page
