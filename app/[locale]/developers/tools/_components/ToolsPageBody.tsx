import { getTranslations } from "next-intl/server"

import ContentFeedback from "@/components/ContentFeedback"
import MainArticle from "@/components/MainArticle"
import { Section } from "@/components/ui/section"

import {
  type DeveloperToolsCategory,
  type DeveloperToolWithCategory,
  toToolCard,
} from "@/lib/utils/developerToolsData"

import ToolsCatalog from "./ToolsCatalog"

type ToolsPageBodyProps = {
  locale: string
  /** Full records; projected to `ToolCardData` here, before the client boundary. */
  tools: DeveloperToolWithCategory[]
  categories: DeveloperToolsCategory[]
  categoryLabels: Record<string, string>
  subcategoryLabels: Record<string, string>
  countByCategory: Record<string, number>
  countBySubcategory: Record<string, number>
  totalCount: number
  currentCategoryId?: string
}

/**
 * Shared body for `/developers/tools` and `/developers/tools/[category]`:
 * the filterable catalog and the suggest-a-resource CTA. Tool detail is its
 * own route (`[tool]`), shown as a modal via interception.
 */
const ToolsPageBody = async ({
  locale,
  tools,
  categories,
  categoryLabels,
  subcategoryLabels,
  countByCategory,
  countBySubcategory,
  totalCount,
  currentCategoryId,
}: ToolsPageBodyProps) => {
  const t = await getTranslations({
    locale,
    namespace: "page-developers-tools",
  })
  const tCommon = await getTranslations({ locale, namespace: "common" })
  const tTable = await getTranslations({ locale, namespace: "table" })

  return (
    <main className="pb-page">
      <MainArticle className="px-page pt-4">
        <ToolsCatalog
          // Reset client filter/search state when navigating between categories
          key={currentCategoryId ?? "all"}
          locale={locale}
          // Slim projection: only what the island reads crosses to the client.
          tools={tools.map(toToolCard)}
          categories={categories}
          currentCategoryId={currentCategoryId}
          countByCategory={countByCategory}
          countBySubcategory={countBySubcategory}
          totalCount={totalCount}
          categoryLabels={categoryLabels}
          subcategoryLabels={subcategoryLabels}
          labels={{
            searchPlaceholder: t("page-developers-tools-search-placeholder"),
            allCategories: t("page-developers-tools-categories-title"),
            resultsLabel: t("page-developers-tools-results-label"),
            noResults: t("page-developers-tools-no-results"),
            cropsNative: t("page-developers-tools-crops-native"),
            filtersToggle: tTable("table-filters"),
            applyLabel: t("page-developers-tools-show-results"),
            closeLabel: tCommon("close"),
            suggestButton: t("page-developers-tools-suggest-resource-button"),
          }}
        />
      </MainArticle>

      <Section className="px-page">
        <ContentFeedback />
      </Section>
    </main>
  )
}

export default ToolsPageBody
