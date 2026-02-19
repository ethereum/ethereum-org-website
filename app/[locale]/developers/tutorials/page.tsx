import { pick } from "lodash"
import dynamic from "next/dynamic"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { CommitHistory, Lang, PageParams } from "@/lib/types"

import FeedbackCard from "@/components/FeedbackCard"
import ContentHero, { ContentHeroProps } from "@/components/Hero/ContentHero"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import { Skeleton, SkeletonCardContent } from "@/components/ui/skeleton"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getTutorialsData } from "@/lib/utils/md"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import TutorialSubmitModal from "./_components/modal"
import TutorialsPageJsonLD from "./page-jsonld"

import heroImg from "@/public/images/doge-computer.png"

const TutorialsList = dynamic(() => import("./_components/tutorials"), {
  ssr: false,
  loading: () => (
    <div className="mt-8 w-full md:w-2/3">
      <div className="border-b border-border px-8 pb-6 pt-8">
        {/* Skill tabs + search skeleton */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={"skill" + index}
                className="h-8 w-24 rounded-full"
              />
            ))}
          </div>
          <Skeleton className="h-10 w-full rounded sm:w-64" />
        </div>
        {/* Tag pills skeleton */}
        <div className="mt-5 flex flex-wrap gap-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={"tag" + index} className="h-8 w-20 rounded-full" />
          ))}
        </div>
      </div>
      {Array.from({ length: 5 }).map((_, index) => (
        <SkeletonCardContent key={"card" + index} className="p-8" />
      ))}
    </div>
  ),
})

const Page = async ({ params }: { params: PageParams }) => {
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

  const commitHistoryCache: CommitHistory = {}
  const { contributors } = await getAppPageContributorInfo(
    "developers/tutorials",
    locale as Lang,
    commitHistoryCache
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

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}) {
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
