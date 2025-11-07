import { pick } from "lodash"
import { notFound } from "next/navigation"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import {
  AppCategoryEnum,
  type CommitHistory,
  type Lang,
  type PageParams,
  type SectionNavDetails,
} from "@/lib/types"

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
import TabNav from "@/components/ui/TabNav"

import { extractAppsData, getHighlightedApps } from "@/lib/utils/apps"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getExternalData } from "@/lib/utils/data/getExternalData"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { appsCategories } from "@/data/apps/categories"

import AppsHighlight from "../../_components/AppsHighlight"
import AppsTable from "../../_components/AppsTable"
import SuggestAnApp from "../../_components/SuggestAnApp"

import AppsCategoryJsonLD from "./page-jsonld"

const VALID_CATEGORIES = Object.values(AppCategoryEnum)

const isValidCategory = (category: string): category is AppCategoryEnum =>
  VALID_CATEGORIES.includes(category as AppCategoryEnum)

const Page = async ({
  params,
}: {
  params: PageParams & { catetgoryName: string }
}) => {
  const { locale, catetgoryName } = params
  setRequestLocale(locale)

  // Fetch apps data with 24-hour revalidation
  const appsDataRaw = await getExternalData(["appsData"], 86400)
  const appsData = extractAppsData(
    appsDataRaw?.appsData as
      | { value: Record<string, unknown> }
      | { error: string }
      | undefined
  )

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

  const navSections: SectionNavDetails[] = Object.values(appsCategories).map(
    ({ name, icon: Icon, slug }) => ({
      key: slug,
      label: t(name),
      href: `/apps/categories/${slug}`,
      icon: (<Icon className="h-4 w-4" />) as React.ReactElement,
    })
  )

  const commitHistoryCache: CommitHistory = {}
  const { contributors } = await getAppPageContributorInfo(
    "apps/categories/[catetgoryName]",
    locale as Lang,
    commitHistoryCache
  )

  return (
    <>
      <AppsCategoryJsonLD
        locale={locale}
        categoryName={categoryEnum}
        category={category}
        appsData={appsData}
        contributors={contributors}
      />
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
          <TabNav
            sections={navSections}
            activeSection={categoryEnum}
            customEventOptions={{
              eventCategory: "categories_page",
              eventAction: "navigation",
            }}
          />

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
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; catetgoryName: string }
}) {
  const { locale, catetgoryName } = params
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
