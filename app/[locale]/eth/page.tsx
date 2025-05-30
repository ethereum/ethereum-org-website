import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { CommitHistory, Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { pick } from "@/lib/utils/lodash"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import EthPage from "./_components/eth"

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Lang }>
}) {
  const { locale } = await params

  setRequestLocale(locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/eth")
  const pickedMessages = pick(allMessages, requiredNamespaces)

  const commitHistoryCache: CommitHistory = {}
  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo("eth", locale as Lang, commitHistoryCache)

  return (
    <I18nProvider locale={locale} messages={pickedMessages}>
      <EthPage
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

  const t = await getTranslations({ locale, namespace: "page-eth" })

  return await getMetadata({
    locale,
    slug: ["eth"],
    title: t("page-eth-whats-eth-meta-title"),
    description: t("page-eth-whats-eth-meta-desc"),
    image: "/images/eth.png",
  })
}
