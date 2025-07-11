import { pick } from "lodash"
import { notFound } from "next/navigation"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import { AppCategoryEnum } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { getHighlightedApps } from "@/lib/utils/apps"
import { dataLoader } from "@/lib/utils/data/dataLoader"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { appsCategories } from "@/data/apps/categories"

import { BASE_TIME_UNIT } from "@/lib/constants"

import AppsHighlight from "../../_components/AppsHighlight"
import AppsTable from "../../_components/AppsTable"
import CategoriesNav from "../../_components/CategoriesNav"
import SuggestAnApp from "../../_components/SuggestAnApp"

import { fetchApps } from "@/lib/api/fetchApps"

const VALID_CATEGORIES = Object.values(AppCategoryEnum)

const isValidCategory = (category: string): category is AppCategoryEnum =>
  VALID_CATEGORIES.includes(category as AppCategoryEnum)

// 24 hours
const REVALIDATE_TIME = BASE_TIME_UNIT * 24

const loadData = dataLoader([["appsData", fetchApps]], REVALIDATE_TIME * 1000)

const Page = async ({
  params,
}: {
  params: { locale: string; slug: string[] }
}) => {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const [appsData] = await loadData()

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/apps")
  const messages = pick(allMessages, requiredNamespaces)

  // Normalize slug to lowercase
  const normalizedSlug = slug[0].toLowerCase()

  // Find category by matching the slug
  const categoryEntry = Object.entries(appsCategories).find(
    ([, categoryData]) => categoryData.slug === normalizedSlug
  )

  if (!categoryEntry) {
    notFound()
  }

  const [categoryEnum, category] = categoryEntry
  const CategoryIcon = category.icon

  if (!isValidCategory(categoryEnum)) {
    notFound()
  }

  // Get highlighted apps (apps with highlight=true)
  const highlightedApps = getHighlightedApps(
    appsData,
    3,
    categoryEnum as AppCategoryEnum
  )

  return (
    <I18nProvider locale={locale} messages={messages}>
      <div className="flex flex-col-reverse justify-between gap-8 px-4 pb-4 pt-11 md:px-8 lg:flex-row">
        <div className="mb-4 flex flex-1 flex-col gap-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/apps">ALL APPS</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="me-[0.625rem] ms-[0.625rem] text-gray-400">
                /
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>{category.name.toUpperCase()}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-[2.5rem] leading-[1.4] md:text-5xl">
            {category.name} apps
          </h1>
          <div className="text-xl leading-[1.4] text-body-medium">
            {category.description}
          </div>
        </div>
        <div className="flex flex-1 items-start justify-start lg:items-center lg:justify-center">
          <CategoryIcon className="h-20 w-20 text-primary lg:h-40 lg:w-40" />
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 md:px-8">
        <CategoriesNav activeCategory={categoryEnum} />
      </div>

      <MainArticle className="flex flex-col gap-32 py-10">
        <div className="flex flex-col px-4 md:px-8">
          <h2>Highlights</h2>
          <AppsHighlight apps={highlightedApps} />
        </div>

        <div className="flex flex-col px-4 md:px-8">
          <AppsTable apps={appsData[category.name]} />
        </div>

        <div className="flex flex-col px-4 md:px-8">
          <SuggestAnApp />
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
    namespace: "page-apps",
  })

  // Normalize slug to lowercase
  const normalizedSlug = firstSegment.toLowerCase()

  // Find category by matching the slug
  const categoryEntry = Object.entries(appsCategories).find(
    ([, categoryData]) => categoryData.slug === normalizedSlug
  )

  if (!categoryEntry) {
    notFound()
  }

  const [categoryEnum, category] = categoryEntry

  if (!isValidCategory(categoryEnum)) {
    notFound()
  }

  // Format category name for display
  const formattedCategory = category.name

  const title = t("page-apps-meta-title", { category: formattedCategory })
  const description = t("page-apps-meta-description", {
    category: formattedCategory,
  })

  return await getMetadata({
    locale,
    slug: ["apps", "categories", normalizedSlug],
    title,
    description,
  })
}

export default Page
