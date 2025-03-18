import pick from "lodash.pick"

import { Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getLastModifiedDateByPath } from "@/lib/utils/gh"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import GetEthPage from "./_components/get-eth"

import { getMessages } from "@/i18n/loadMessages"

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Lang }>
}) {
  const { locale } = await params

  const lastDataUpdateDate = getLastModifiedDateByPath(
    "src/data/exchangesByCountry.ts"
  )

  // Get i18n messages
  const allMessages = await getMessages(locale)
  const requiredNamespaces = getRequiredNamespacesForPage("/get-eth")
  const pickedMessages = pick(allMessages, requiredNamespaces)

  return (
    <I18nProvider locale={locale} messages={pickedMessages}>
      <GetEthPage lastDataUpdateDate={lastDataUpdateDate} />
    </I18nProvider>
  )
}
