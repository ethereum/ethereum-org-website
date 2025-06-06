import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import { Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { dataLoader } from "@/lib/utils/data/dataLoader"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import LocalEnvironmentPage from "./_components/local-environment"

import { getLocalEnvironmentFrameworkData } from "@/lib/api/ghRepoData"

const loadData = dataLoader([
  ["frameworksListData", getLocalEnvironmentFrameworkData],
])

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  setRequestLocale(locale)

  const [frameworksListData] = await loadData()

  // Get i18n messages
  const allMessages = await getMessages({ locale })
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

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
