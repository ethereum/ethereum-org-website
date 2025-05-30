import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { CommitHistory, Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getLastGitCommitDateByPath } from "@/lib/utils/gh"
import { pick } from "@/lib/utils/lodash"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import GetEthPage from "./_components/get-eth"

import { routing } from "@/i18n/routing"

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Lang }>
}) {
  const { locale } = await params

  setRequestLocale(locale)

  const lastDataUpdateDate = getLastGitCommitDateByPath(
    "src/data/exchangesByCountry.ts"
  )

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/get-eth")
  const pickedMessages = pick(allMessages, requiredNamespaces)

  const commitHistoryCache: CommitHistory = {}
  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo(
      "get-eth",
      locale as Lang,
      commitHistoryCache
    )

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

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
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
