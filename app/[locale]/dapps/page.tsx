import pick from "lodash.pick"
import { getTranslations } from "next-intl/server"

import type { CommitHistory, Lang, Params } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import DappsPage from "./_components/dapps"

import { loadMessages } from "@/i18n/loadMessages"

export default async function Page({ params }: { params: Promise<Params> }) {
  const { locale } = await params

  // Get i18n messages
  const allMessages = await loadMessages(locale)
  const requiredNamespaces = getRequiredNamespacesForPage("/dapps")
  const pickedMessages = pick(allMessages, requiredNamespaces)

  const commitHistoryCache: CommitHistory = {}
  const { contributors, lastEditLocaleTimestamp } =
    await getPageContributorInfo("dapps", locale as Lang, commitHistoryCache)

  return (
    <I18nProvider locale={locale} messages={pickedMessages}>
      <DappsPage
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

  const t = await getTranslations({ locale })

  return await getMetadata({
    locale,
    slug: ["dapps"],
    title: t("common.decentralized-applications-dapps"),
    description: t("page-dapps.page-dapps-desc"),
    image: "/images/doge-computer.png",
  })
}
