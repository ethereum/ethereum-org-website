import pick from "lodash.pick"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import { Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import QuizzesPage from "./_components/quizzes"

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  setRequestLocale(locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/quizzes")
  const messages = pick(allMessages, requiredNamespaces)

  return (
    <I18nProvider locale={locale} messages={messages}>
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
    title: t("common.quizzes-title"),
    description: t("learn-quizzes.quizzes-subtitle"),
    image: "/images/heroes/quizzes-hub-hero.png",
  })
}

export default Page
