import pick from "lodash.pick"
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

import { BASE_TIME_UNIT } from "@/lib/constants"

import ResourcesPage from "./_components/resources"

import { fetchGrowThePie } from "@/lib/api/fetchGrowThePie"

// In seconds
const REVALIDATE_TIME = BASE_TIME_UNIT * 1

const loadData = dataLoader(
  [["growThePieData", fetchGrowThePie]],
  REVALIDATE_TIME * 1000
)

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  setRequestLocale(locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/resources")
  const messages = pick(allMessages, requiredNamespaces)

  // Load data
  const [growThePieData] = await loadData()
  const { txCostsMedianUsd } = growThePieData

  return (
    <I18nProvider locale={locale} messages={messages}>
      <ResourcesPage txCostsMedianUsd={txCostsMedianUsd} />
    </I18nProvider>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const t = await getTranslations({ locale, namespace: "page-resources" })

  return await getMetadata({
    locale,
    slug: ["resources"],
    title: t("page-resources-meta-title"),
    description: t("page-resources-meta-description"),
    image: "/images/heroes/guides-hub-hero.jpg",
  })
}

export default Page
