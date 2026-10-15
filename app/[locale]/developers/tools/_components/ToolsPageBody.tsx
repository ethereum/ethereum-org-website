import { getTranslations } from "next-intl/server"

import ContentFeedback from "@/components/ContentFeedback"
import MainArticle from "@/components/MainArticle"
import { Section } from "@/components/ui/section"

import {
  type DeveloperToolsCategory,
  type DeveloperToolWithCategory,
  toToolCard,
  toToolDetail,
} from "@/lib/utils/developerToolsData"

import ToolsCatalog from "./ToolsCatalog"

type ToolsPageBodyProps = {
  locale: string
  /** Full records; projected to `ToolCardData` here, before the client boundary. */
  tools: DeveloperToolWithCategory[]
  categories: DeveloperToolsCategory[]
  categoryLabels: Record<string, string>
  subcategoryLabels: Record<string, string>
  tagLabels: Record<string, string>
  countByCategory: Record<string, number>
  countBySubcategory: Record<string, number>
  totalCount: number
  currentCategoryId?: string
}

/**
 * Shared body for `/developers/tools` and `/developers/tools/[category]`:
 * the filterable catalog and the suggest-a-resource CTA. Tool detail opens in
 * a client-side modal; the `[tool]` route is the standalone page.
 */
const ToolsPageBody = async ({
  locale,
  tools,
  categories,
  categoryLabels,
  subcategoryLabels,
  tagLabels,
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
  const tItem = await getTranslations({
    locale,
    namespace: "component-catalog-item",
  })
  const labels = { categoryLabels, subcategoryLabels, tagLabels }

  return (
    <main className="pb-page">
      <MainArticle className="px-page pt-4">
        <ToolsCatalog
          // Reset client filter/search state when navigating between categories
          key={currentCategoryId ?? "all"}
          locale={locale}
          // Slim projection: only what the island reads crosses to the client.
          tools={tools.map((tool) => ({
            ...toToolCard(tool),
            detail: toToolDetail(tool, { locale, t, tCommon, tItem, labels }),
          }))}
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
            filtersToggle: tTable("table-filters"),
            applyLabel: t("page-developers-tools-show-results"),
            closeLabel: tCommon("close"),
            suggestButton: t("page-developers-tools-suggest-resource-button"),
            modal: {
              close: tCommon("close"),
              category: t("page-developers-tools-modal-category"),
              tags: t("page-developers-tools-modal-tags"),
              fullDetails: t("page-developers-tools-modal-full-details"),
              repository: t("page-developers-tools-modal-repository"),
              repositories: t("page-developers-tools-modal-repositories"),
              package: t("page-developers-tools-modal-package"),
              packages: t("page-developers-tools-modal-packages"),
              sourceCode: tItem("catalog-item-source-code"),
              linkLabel: tItem.raw("catalog-item-link-label"),
            },
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
