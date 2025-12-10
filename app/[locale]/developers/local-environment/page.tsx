import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { CommitHistory, Lang, PageParams } from "@/lib/types"
import type { Framework } from "@/lib/interfaces"

import I18nProvider from "@/components/I18nProvider"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { FETCH_GITHUB_REPO_DATA_TASK_ID } from "@/data-layer/api/fetchGithubRepoData"
import { getCachedData } from "@/data-layer/storage/cachedGetter"

import { BASE_TIME_UNIT } from "@/lib/constants"

import LocalEnvironmentPage from "./_components/local-environment"
import LocalEnvironmentJsonLD from "./page-jsonld"

import { frameworksList } from "@/lib/data/frameworks"

// In seconds - GitHub repo data doesn't change frequently, so use 24 hours
const REVALIDATE_TIME = BASE_TIME_UNIT * 24

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params

  setRequestLocale(locale)

  // Fetch GitHub repo data from data layer with Next.js caching
  const githubRepoDataResult = await getCachedData<
    Record<string, { starCount: number; languages: string[] }>
  >(FETCH_GITHUB_REPO_DATA_TASK_ID, REVALIDATE_TIME)

  // Combine static framework list with GitHub repo data
  const frameworksListData: Framework[] = frameworksList.map((framework) => {
    const repoData = githubRepoDataResult?.[framework.githubUrl]
    return {
      ...framework,
      starCount: repoData?.starCount,
      languages: repoData?.languages?.slice(0, 2),
    }
  })

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage(
    "/developers/local-environment"
  )
  const messages = pick(allMessages, requiredNamespaces)

  const commitHistoryCache: CommitHistory = {}
  const { contributors } = await getAppPageContributorInfo(
    "developers/local-environment",
    locale as Lang,
    commitHistoryCache
  )

  return (
    <>
      <LocalEnvironmentJsonLD
        locale={locale}
        frameworksListData={frameworksListData}
        contributors={contributors}
      />

      <I18nProvider locale={locale} messages={messages}>
        <LocalEnvironmentPage frameworksList={frameworksListData} />
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
    namespace: "page-developers-local-environment",
  })

  return await getMetadata({
    locale,
    slug: ["developers", "local-environment"],
    title: t("page-local-environment-setup-meta-title"),
    description: t("page-local-environment-setup-meta-desc"),
  })
}

export default Page
