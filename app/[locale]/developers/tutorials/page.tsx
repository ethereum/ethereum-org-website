import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import { Lang } from "@/lib/types"

import FeedbackCard from "@/components/FeedbackCard"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getTutorialsData } from "@/lib/utils/md"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import TutorialSubmitModal from "./_components/modal"
import TutorialsList from "./_components/tutorials"

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  setRequestLocale(locale)

  const t = await getTranslations({
    locale,
    namespace: "page-developers-tutorials",
  })

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage(
    "/developers/tutorials"
  )
  const messages = pick(allMessages, requiredNamespaces)

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])
  const dir = contentNotTranslated ? "ltr" : "unset"

  const internalTutorials = await getTutorialsData(locale)

  return (
    <I18nProvider locale={locale} messages={messages}>
      <MainArticle
        className="mx-auto my-0 mt-16 flex w-full flex-col items-center"
        dir={dir}
      >
        <h1 className="no-italic mb-4 text-center font-monospace text-[2rem] font-semibold uppercase leading-[1.4] max-sm:mx-4 max-sm:mt-4 sm:mb-[1.625rem]">
          {t("page-tutorial-title")}
        </h1>
        <p className="mb-4 text-center leading-xs text-body-medium">
          {t("page-tutorial-subtitle")}
        </p>

        <TutorialSubmitModal dir={dir} />

        <TutorialsList internalTutorials={internalTutorials} />

        <FeedbackCard />
      </MainArticle>
    </I18nProvider>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const t = await getTranslations({
    locale,
    namespace: "page-developers-tutorials",
  })

  return await getMetadata({
    locale,
    slug: ["developers", "tutorials"],
    title: t("page-tutorials-meta-title"),
    description: t("page-tutorials-meta-description"),
  })
}

export default Page
