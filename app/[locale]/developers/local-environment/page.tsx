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

import { frameworksList } from "@/data/frameworks"

import LocalEnvironmentPage from "./_components/local-environment"
import LocalEnvironmentJsonLD from "./page-jsonld"

import { getGithubRepoData } from "@/lib/data"

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params

  setRequestLocale(locale)

  // Fetch GitHub repo data using the new data-layer function (already cached)
  const githubRepoData = await getGithubRepoData()

  // Handle null case - throw error if required data is missing
  if (!githubRepoData) {
    throw new Error("Failed to fetch GitHub repo data")
  }

  // Merge static framework data with GitHub repo data
  const frameworksListData: Framework[] = frameworksList.map((framework) => {
    const repoData = githubRepoData[framework.githubUrl]
    return {
      ...framework,
      starCount: repoData?.starCount,
      languages: repoData?.languages?.slice(0, 2), // Limit to first 2 languages
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
