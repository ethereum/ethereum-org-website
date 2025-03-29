import pick from "lodash.pick"
import { getTranslations } from "next-intl/server"

import type { CommitHistory, Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import VisionPage from "./_components/vision"

import { loadMessages } from "@/i18n/loadMessages"

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  // Get i18n messages
  const allMessages = await loadMessages(locale)
  const requiredNamespaces = getRequiredNamespacesForPage("/roadmap/vision")
  const messages = pick(allMessages, requiredNamespaces)

  const commitHistoryCache: CommitHistory = {}
  const { contributors, lastEditLocaleTimestamp } =
    await getPageContributorInfo(
      "roadmap/vision",
      locale as Lang,
      commitHistoryCache
    )

  return (
    <I18nProvider locale={locale} messages={messages}>
      <VisionPage
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

  const t = await getTranslations({ locale, namespace: "page-roadmap-vision" })

  return await getMetadata({
    locale,
    slug: ["roadmap", "vision"],
    title: t("page-roadmap-vision-meta-title"),
    description: t("page-roadmap-vision-meta-desc"),
  })
}

export default Page
