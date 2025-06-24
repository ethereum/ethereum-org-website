import { pick } from "lodash"
import { notFound } from "next/navigation"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import { DappCategoryEnum } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"

import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { dappsCategories } from "@/data/dapps/categories"

const VALID_CATEGORIES = Object.values(DappCategoryEnum)

const isValidCategory = (category: string): category is DappCategoryEnum =>
  VALID_CATEGORIES.includes(category as DappCategoryEnum)

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

  const category = dappsCategories[slug[0]]
  const CategoryIcon = category.icon

  if (!isValidCategory(slug[0])) {
    notFound()
  }

  return (
    <I18nProvider locale={locale} messages={messages}>
      <div className="flex flex-row justify-between gap-4 px-4 py-10 md:px-8">
        <div className="flex flex-1 flex-col gap-4">
          <Breadcrumbs slug={"/dapps"} />
          <h1>{category.name} dapps</h1>
          <p>{category.description}</p>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <CategoryIcon className="h-36 w-52 text-primary" />
        </div>
      </div>
      <MainArticle className="flex flex-col gap-10 py-10">
        <div className="flex flex-col px-4 md:px-8">
          <h2>Highlights</h2>
        </div>

        <div className="flex flex-col px-4 md:px-8">
          <h2>All {category.name} dapps</h2>
        </div>
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

  if (!isValidCategory(firstSegment)) {
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
