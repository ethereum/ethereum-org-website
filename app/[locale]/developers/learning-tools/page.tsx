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

import LearningTools from "./_components/learning-tools"
import LearningToolsJsonLD from "./page-jsonld"

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params

  setRequestLocale(locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage(
    "/developers/learning-tools"
  )
  const messages = pick(allMessages, requiredNamespaces)

  const commitHistoryCache: CommitHistory = {}
  const { contributors } = await getAppPageContributorInfo(
    "developers/learning-tools",
    locale as Lang,
    commitHistoryCache
  )

  return (
    <>
      <LearningToolsJsonLD locale={locale} contributors={contributors} />

      <I18nProvider locale={locale} messages={messages}>
        <LearningTools />
      </I18nProvider>
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = params

  const t = await getTranslations({
    locale,
    namespace: "page-developers-learning-tools",
  })

  return await getMetadata({
    locale,
    slug: ["developers", "learning-tools"],
    title: t("page-learning-tools-meta-title"),
    description: t("page-learning-tools-meta-desc"),
  })
}

export default Page
