import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import { CommitHistory, Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import QuizzesPage from "./_components/quizzes"
import QuizzesPageJsonLD from "./page-jsonld"

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  setRequestLocale(locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/quizzes")
  const messages = pick(allMessages, requiredNamespaces)

  const commitHistoryCache: CommitHistory = {}
  const { contributors } = await getAppPageContributorInfo(
    "quizzes",
    locale as Lang,
    commitHistoryCache
  )

  return (
    <I18nProvider locale={locale} messages={messages}>
      <QuizzesPageJsonLD locale={locale} contributors={contributors} />
      <QuizzesPage />
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
    slug: ["quizzes"],
    title: `${t("common.quizzes-title")} | ethereum.org`,
    description: t("learn-quizzes.quizzes-subtitle"),
    image: "/images/heroes/quizzes-hub-hero.png",
  })
}

export default Page
