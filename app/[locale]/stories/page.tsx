import { Suspense } from "react"
import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { PageParams } from "@/lib/types"
import { StoryCategory } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"

import { getMetadata } from "@/lib/utils/metadata"
import { getAllCategories } from "@/lib/utils/stories"
import {
  getAllStories,
  getFeaturedStories,
  getStoriesByCategory,
} from "@/lib/utils/stories"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import FeaturedStories from "./_components/FeaturedStories"
import StoriesFilters from "./_components/StoriesFilters"
import StoriesGrid from "./_components/StoriesGrid"
import StoriesHero from "./_components/StoriesHero"

interface PageProps {
  params: PageParams
  searchParams: { category?: string }
}

export default async function Page({ params, searchParams }: PageProps) {
  const { locale } = params

  setRequestLocale(locale)

  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/stories")
  const pickedMessages = pick(allMessages, requiredNamespaces)

  const t = await getTranslations({ locale, namespace: "page-stories" })

  // Validate category param against valid enum values
  const validCategories = getAllCategories()
  const categoryParam = searchParams.category
  const selectedCategory =
    categoryParam && validCategories.includes(categoryParam as StoryCategory)
      ? (categoryParam as StoryCategory)
      : null

  const allStories = getAllStories()
  const featuredStories = getFeaturedStories()
  const filteredStories = selectedCategory
    ? getStoriesByCategory(selectedCategory)
    : allStories

  return (
    <I18nProvider locale={locale} messages={pickedMessages}>
      <MainArticle className="mx-auto flex w-full flex-col items-center">
        <StoriesHero />

        {!selectedCategory && <FeaturedStories stories={featuredStories} />}

        <section className="w-full px-4 py-8 md:px-8">
          <div className="mb-8 flex flex-col gap-4">
            {!selectedCategory && (
              <h2 className="text-2xl font-bold md:text-3xl">
                {t("page-stories-all-stories-title")}
              </h2>
            )}
            <Suspense fallback={null}>
              <StoriesFilters
                selectedCategory={selectedCategory}
                resultCount={filteredStories.length}
              />
            </Suspense>
          </div>
          <StoriesGrid stories={filteredStories} />
        </section>
      </MainArticle>
    </I18nProvider>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = params

  const t = await getTranslations({ locale, namespace: "page-stories" })
  return await getMetadata({
    locale,
    slug: ["stories"],
    title: t("page-stories-meta-title"),
    description: t("page-stories-meta-description"),
  })
}
