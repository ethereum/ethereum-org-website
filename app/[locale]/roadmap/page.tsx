import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { CommitHistory, Lang, PageParams } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import RoadmapPage from "./_components/roadmap"
import RoadmapPageJsonLD from "./page-jsonld"

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params

  setRequestLocale(locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/roadmap")
  const messages = pick(allMessages, requiredNamespaces)

  const commitHistoryCache: CommitHistory = {}
  const { contributors } = await getAppPageContributorInfo(
    "roadmap",
    locale as Lang,
    commitHistoryCache
  )

  return (
    <I18nProvider locale={locale} messages={messages}>
      <RoadmapPageJsonLD locale={locale} contributors={contributors} />
      <RoadmapPage />
    </I18nProvider>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = params

  const t = await getTranslations({ locale, namespace: "page-roadmap" })

  return await getMetadata({
    locale,
    slug: ["roadmap"],
    title: t("page-roadmap-meta-title"),
    description: t("page-roadmap-meta-description"),
    image: "/images/roadmap/roadmap-hub-hero.png",
  })
}

export default Page
