import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { CommitHistory, Lang, PageParams } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { extractFrameworkGitHubData } from "@/lib/utils/data/refactor/extractExternalData"
import { getExternalData } from "@/lib/utils/data/refactor/getExternalData"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { frameworksList } from "@/data/frameworks/frameworks"

import LocalEnvironmentPage from "./_components/local-environment"
import LocalEnvironmentJsonLD from "./page-jsonld"

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params

  setRequestLocale(locale)

  // Fetch daily data (framework GitHub data) with 24-hour revalidation
  const dailyData = await getExternalData(["frameworkGitHubData"], 86400)

  // Extract framework GitHub data
  const frameworkGitHubData = extractFrameworkGitHubData(dailyData)

  // Combine static framework data with GitHub data
  const frameworksListData = frameworksList.map((framework) => {
    const githubData = frameworkGitHubData?.[framework.id]
    return {
      ...framework,
      starCount: githubData?.starCount,
      languages: githubData?.languages?.slice(0, 2),
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
