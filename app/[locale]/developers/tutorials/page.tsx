import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import FeedbackCard from "@/components/FeedbackCard"
import ContentHero, { ContentHeroProps } from "@/components/Hero/ContentHero"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getTutorialsData } from "@/lib/utils/md"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import TutorialSubmitModal from "./_components/modal"
import TutorialsList from "./_components/tutorials-lazy"
import TutorialsPageJsonLD from "./page-jsonld"

import heroImg from "@/public/images/doge-computer.png"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

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

  const { contributors } = await getAppPageContributorInfo(
    "developers/tutorials",
    locale as Lang
  )

  const heroProps: ContentHeroProps = {
    breadcrumbs: { slug: "developers/tutorials", startDepth: 1 },
    heroImg,
    title: t("page-tutorial-title"),
    description: t("page-tutorial-subtitle"),
    buttons: [
      <TutorialSubmitModal key="submit" dir={dir}>
        {t("page-tutorial-submit-btn")}
      </TutorialSubmitModal>,
    ],
  }

  return (
    <>
      <TutorialsPageJsonLD
        locale={locale}
        internalTutorials={internalTutorials}
        contributors={contributors}
      />
      <I18nProvider locale={locale} messages={messages}>
        <ContentHero {...heroProps} />
        <MainArticle
          className="mx-auto my-0 flex w-full flex-col items-center"
          dir={dir}
        >
          <TutorialsList internalTutorials={internalTutorials} />

          <FeedbackCard />
        </MainArticle>
      </I18nProvider>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

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
