import pick from "lodash.pick"
import { getTranslations } from "next-intl/server"

import type { CommitHistory, Lang, Params } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import LearnPage from "./_components/learn"

import { loadMessages } from "@/i18n/loadMessages"

export default async function Page({ params }: { params: Promise<Params> }) {
  const { locale } = await params

  // Get i18n messages
  const allMessages = await loadMessages(locale)
  const requiredNamespaces = getRequiredNamespacesForPage("/learn")
  const messages = pick(allMessages, requiredNamespaces)

  const commitHistoryCache: CommitHistory = {}
  const { contributors, lastEditLocaleTimestamp } =
    await getPageContributorInfo("learn", locale as Lang, commitHistoryCache)

  return (
    <I18nProvider locale={locale} messages={messages}>
      <LearnPage
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

  const t = await getTranslations({ locale, namespace: "page-learn" })

  return await getMetadata({
    locale,
    slug: ["learn"],
    title: t("page-learn-meta-title"),
    description: t("hero-subtitle"),
    image: "/images/heroes/learn-hub-hero.png",
  })
}
