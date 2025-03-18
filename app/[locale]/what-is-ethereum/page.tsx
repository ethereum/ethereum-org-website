import pick from "lodash.pick"

import { Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { dataLoader } from "@/lib/utils/data/dataLoader"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import WhatIsEthereumPage from "./_components/what-is-ethereum"

import { getMessages } from "@/i18n/loadMessages"
import { fetchGrowThePie } from "@/lib/api/fetchGrowThePie"

const loadData = dataLoader([["growThePieData", fetchGrowThePie]])

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  // Get i18n messages
  const allMessages = await getMessages(locale)
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

export default Page
