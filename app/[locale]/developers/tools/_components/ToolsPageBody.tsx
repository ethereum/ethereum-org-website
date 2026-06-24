import { Suspense } from "react"
import { getTranslations } from "next-intl/server"

import MainArticle from "@/components/MainArticle"

import type {
  DeveloperToolsCategory,
  DeveloperToolWithCategory,
} from "../types"

import SuggestAResource from "./SuggestAResource"
import ToolModal from "./ToolModal"
import ToolsCatalog from "./ToolsCatalog"

type ToolsPageBodyProps = {
  locale: string
  tools: DeveloperToolWithCategory[]
  categories: DeveloperToolsCategory[]
  categoryLabels: Record<string, string>
  subcategoryLabels: Record<string, string>
  tagLabels: Record<string, string>
  countByCategory: Record<string, number>
  totalCount: number
  currentCategoryId?: string
}

/**
 * Shared body for `/developers/tools` and `/developers/tools/[category]`:
 * the filterable catalog, the suggest-a-resource CTA, and the tool modal.
 */
const ToolsPageBody = async ({
  locale,
  tools,
  categories,
  categoryLabels,
  subcategoryLabels,
  tagLabels,
  countByCategory,
  totalCount,
  currentCategoryId,
}: ToolsPageBodyProps) => {
  const t = await getTranslations({
    locale,
    namespace: "page-developers-tools",
  })

  return (
    <>
      <MainArticle className="space-y-20 px-4 pt-4 pb-10 md:px-8">
        <ToolsCatalog
          // Reset client filter/search state when navigating between categories
          key={currentCategoryId ?? "all"}
          locale={locale}
          tools={tools}
          categories={categories}
          currentCategoryId={currentCategoryId}
          countByCategory={countByCategory}
          totalCount={totalCount}
          categoryLabels={categoryLabels}
          subcategoryLabels={subcategoryLabels}
          labels={{
            searchPlaceholder: t("page-developers-tools-search-placeholder"),
            allCategories: t("page-developers-tools-categories-title"),
            resultsLabel: t("page-developers-tools-results-label"),
            noResults: t("page-developers-tools-no-results"),
          }}
        />
        <SuggestAResource
          title={t("page-developers-tools-suggest-resource-title")}
          description={t("page-developers-tools-suggest-resource-description")}
          buttonLabel={t("page-developers-tools-suggest-resource-button")}
        />
      </MainArticle>

      {/* useSearchParams requires a Suspense boundary on static routes */}
      <Suspense>
        <ToolModal
          locale={locale}
          tools={tools}
          categoryLabels={categoryLabels}
          subcategoryLabels={subcategoryLabels}
          tagLabels={tagLabels}
          labels={{
            links: t("page-developers-tools-modal-links"),
            website: t("page-developers-tools-modal-website"),
            social: t("page-developers-tools-modal-social"),
          }}
        />
      </Suspense>
    </>
  )
}

export default ToolsPageBody
