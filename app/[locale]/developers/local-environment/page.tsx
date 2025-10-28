import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { CommitHistory, Lang, PageParams } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { dataLoader } from "@/lib/utils/data/dataLoader"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import LocalEnvironmentPage from "./_components/local-environment"
import LocalEnvironmentJsonLD from "./page-jsonld"

import { getLocalEnvironmentFrameworkData } from "@/lib/api/ghRepoData"

const loadData = dataLoader([
  ["frameworksListData", getLocalEnvironmentFrameworkData],
])

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params

  setRequestLocale(locale)

  const [frameworksListData] = await loadData()

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
