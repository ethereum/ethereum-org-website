import pick from "lodash.pick"
import { getTranslations } from "next-intl/server"

import type { CommitHistory, Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getPageContributorInfo } from "@/lib/utils/contributors"
import { getLastModifiedDateByPath } from "@/lib/utils/gh"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import GetEthPage from "./_components/get-eth"

import { loadMessages } from "@/i18n/loadMessages"

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
  const allMessages = await loadMessages(locale)
  const requiredNamespaces = getRequiredNamespacesForPage("/get-eth")
  const pickedMessages = pick(allMessages, requiredNamespaces)

  const commitHistoryCache: CommitHistory = {}
  const { contributors, lastEditLocaleTimestamp } =
    await getPageContributorInfo("get-eth", locale as Lang, commitHistoryCache)

  return (
    <I18nProvider locale={locale} messages={pickedMessages}>
      <GetEthPage
        lastDataUpdateDate={lastDataUpdateDate}
        contributors={contributors}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
      />
    </I18nProvider>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const t = await getTranslations({ locale, namespace: "page-get-eth" })

  return await getMetadata({
    locale,
    slug: ["get-eth"],
    title: t("page-get-eth-meta-title"),
    description: t("page-get-eth-meta-desc"),
  })
}
