import pick from "lodash.pick"

import { Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { dataLoader } from "@/lib/utils/data/dataLoader"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import LocalEnvironmentPage from "./_components/local-environment"

import { getMessages } from "@/i18n/loadMessages"
import { getLocalEnvironmentFrameworkData } from "@/lib/api/ghRepoData"

const loadData = dataLoader([
  ["frameworksListData", getLocalEnvironmentFrameworkData],
])

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  const [frameworksListData] = await loadData()

  // Get i18n messages
  const allMessages = await getMessages(locale)
  const requiredNamespaces = getRequiredNamespacesForPage(
    "/developers/local-environment"
  )
  const messages = pick(allMessages, requiredNamespaces)

  return (
    <I18nProvider locale={locale} messages={messages}>
      <LocalEnvironmentPage frameworksList={frameworksListData} />
    </I18nProvider>
  )
}

export default Page
