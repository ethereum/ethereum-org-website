import { pick } from "lodash"
import { notFound } from "next/navigation"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"

import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

const VALID_CATEGORIES = [
  "defi",
  "collectibles",
  "social",
  "rwa",
  "stablecoins",
]

const Page = async ({
  params,
}: {
  params: { locale: string; slug: string[] }
}) => {
  const { locale, slug } = await params
  setRequestLocale(locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/dapps")
  const messages = pick(allMessages, requiredNamespaces)

  const category = VALID_CATEGORIES.includes(slug[0])

  if (!category) {
    notFound()
  }

  return (
    <I18nProvider locale={locale} messages={messages}>
      <MainArticle>
        <h1>{slug.length === 1 && slug[0]}</h1>
      </MainArticle>
    </I18nProvider>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>
}) {
  const { locale, slug } = await params
  const [firstSegment] = slug

  const t = await getTranslations({
    locale,
    namespace: "page-dapps",
  })

  const category = VALID_CATEGORIES.includes(firstSegment)
  if (!category) {
    notFound()
  }

  // Format category name for display (capitalize first letter)
  const formattedCategory =
    firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1)

  const title = t("page-dapps-meta-title", { category: formattedCategory })
  const description = t("page-dapps-meta-description", {
    category: formattedCategory,
  })

  return await getMetadata({
    locale,
    slug: ["dapps", "categories", ...slug],
    title,
    description,
  })
}

export default Page
