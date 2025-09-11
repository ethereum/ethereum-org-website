import { pick } from "lodash"
import { notFound } from "next/navigation"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import { AppCategoryEnum } from "@/lib/types"

import { SimpleHero } from "@/components/Hero"
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
  params: { locale: string; catetgoryName: string }
}) => {
  const { locale, catetgoryName } = await params
  setRequestLocale(locale)

  const [appsData] = await loadData()

  const t = await getTranslations({ locale, namespace: "page-apps" })

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/apps")
  const messages = pick(allMessages, requiredNamespaces)

  // Normalize slug to lowercase
  const normalizedSlug = catetgoryName.toLowerCase()

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

  // Get highlighted apps (apps with highlight=true)
  const highlightedApps = getHighlightedApps(
    appsData,
    3,
    categoryEnum as AppCategoryEnum
  )

  return (
    <I18nProvider locale={locale} messages={messages}>
      <div className="flex flex-col gap-12">
        <SimpleHero
          breadcrumbs={
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/apps" className="uppercase">
                    {t("page-apps-all-apps")}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="me-[0.625rem] ms-[0.625rem] text-gray-400">
                  /
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {t(category.name).toUpperCase()}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          }
          title={t(category.name)}
          subtitle={t(category.description)}
        />

        <div className="flex flex-col gap-4 px-4 md:px-8">
          <CategoriesNav activeCategory={categoryEnum} />
        </div>

        <MainArticle className="flex flex-col gap-32 py-10">
          <div className="flex flex-col px-4 md:px-8">
            <h2>{t("page-apps-highlights-title")}</h2>
            <AppsHighlight
              apps={highlightedApps}
              matomoCategory={`category_page`}
            />
          </div>

          <div className="flex flex-col px-4 md:px-8">
            <AppsTable apps={appsData[categoryEnum]} />
          </div>

          <div className="flex flex-col px-4 md:px-8">
            <SuggestAnApp />
          </div>
        </MainArticle>
      </div>
    </I18nProvider>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; catetgoryName: string }>
}) {
  const { locale, catetgoryName } = await params
  const t = await getTranslations({ locale, namespace: "page-apps" })

  // Normalize slug to lowercase
  const normalizedSlug = catetgoryName.toLowerCase()

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

  const title = t(category.metaTitle)
  const description = t(category.metaDescription)

  return await getMetadata({
    locale,
    slug: ["apps", "categories", normalizedSlug],
    title,
    description,
  })
}

export default Page
