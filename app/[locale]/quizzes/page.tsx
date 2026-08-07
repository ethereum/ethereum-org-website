import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import HubHero from "@/components/Hero/HubHero"
import I18nProvider from "@/components/I18nProvider"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { getQuizStats } from "@/data-layer"

import QuizzesPage from "./_components/quizzes"
import PageJsonLD from "./page-jsonld"

import heroImg from "@/public/images/heroes/quizzes-hub-hero.png"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  // Must precede any next-intl call, or the locale is read from headers and the
  // page silently drops from static to dynamic rendering.
  setRequestLocale(locale)

  const t = await getTranslations("learn-quizzes")
  const tCommon = await getTranslations("common")

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/quizzes")
  const messages = pick(allMessages, requiredNamespaces)

  const { contributors } = await getAppPageContributorInfo(
    "quizzes",
    locale as Lang
  )

  // Null until the daily Matomo fetch lands; the community panel hides in that case
  const communityStats = await getQuizStats()

  return (
    <>
      <PageJsonLD locale={locale} contributors={contributors} />

      <HubHero
        heroImg={heroImg}
        title={tCommon("quizzes-title")}
        header={t("test-your-knowledge")}
        description={t("quizzes-subtitle")}
      />

      <I18nProvider locale={locale} messages={messages}>
        <QuizzesPage communityStats={communityStats} />
      </I18nProvider>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations()

  return await getMetadata({
    locale,
    slug: ["quizzes"],
    title: `${t("common.quizzes-title")} | ethereum.org`,
    description: t("learn-quizzes.quizzes-subtitle"),
    image: "/images/heroes/quizzes-hub-hero.png",
  })
}

export default Page
