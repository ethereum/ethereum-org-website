import { pick } from "lodash"
import dynamic from "next/dynamic"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { CommitHistory, Lang, PageParams } from "@/lib/types"

import FeedbackCard from "@/components/FeedbackCard"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import { Skeleton, SkeletonCardContent } from "@/components/ui/skeleton"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getTutorialsData } from "@/lib/utils/md"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import TutorialsPageJsonLD from "./page-jsonld"

const TutorialsList = dynamic(() => import("./_components/tutorials"), {
  ssr: false,
  loading: () => (
    <div className="mt-8 w-full md:w-2/3">
      <div className="grid w-full grid-cols-3 gap-2 px-8 pb-16 pt-12 sm:grid-cols-4 lg:gap-4 2xl:grid-cols-5">
        {Array.from({ length: 30 }).map((_, index) => (
          <Skeleton key={"tag" + index} className="h-8 rounded-full" />
        ))}
      </div>
      {Array.from({ length: 5 }).map((_, index) => (
        <SkeletonCardContent key={"card" + index} className="p-8" />
      ))}
    </div>
  ),
})

const TutorialSubmitModal = dynamic(() => import("./_components/modal"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-40 rounded border p-3">
      <Skeleton className="h-5 w-full" />
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

  return (
    <>
      <TutorialsPageJsonLD
        locale={locale}
        internalTutorials={internalTutorials}
        contributors={contributors}
      />
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
