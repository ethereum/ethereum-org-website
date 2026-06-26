import { getTranslations } from "next-intl/server"

import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"

import type {
  DeveloperToolsCategory,
  DeveloperToolWithCategory,
} from "../types"

import ToolsCatalog from "./ToolsCatalog"

const SUGGEST_RESOURCE_ISSUE_URL =
  "https://github.com/ethereum/builder-resources/issues/new?template=add-resource.yml"

type ToolsPageBodyProps = {
  locale: string
  tools: DeveloperToolWithCategory[]
  categories: DeveloperToolsCategory[]
  categoryLabels: Record<string, string>
  subcategoryLabels: Record<string, string>
  countByCategory: Record<string, number>
  totalCount: number
  currentCategoryId?: string
}

/**
 * Shared body for `/developers/tools` and `/developers/tools/[category]`:
 * the filterable catalog and the suggest-a-resource CTA. Tool detail is its
 * own route (`[category]/[tool]`), shown as a modal via interception.
 */
const ToolsPageBody = async ({
  locale,
  tools,
  categories,
  categoryLabels,
  subcategoryLabels,
  countByCategory,
  totalCount,
  currentCategoryId,
}: ToolsPageBodyProps) => {
  const t = await getTranslations({
    locale,
    namespace: "page-developers-tools",
  })

  return (
    <MainArticle className="space-y-20 px-page pt-4 pb-10">
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
      <div className="flex flex-col items-center gap-4 rounded-base bg-radial-a p-12">
        <h2>{t("page-developers-tools-suggest-resource-title")}</h2>
        <p>{t("page-developers-tools-suggest-resource-description")}</p>
        <ButtonLink
          href={SUGGEST_RESOURCE_ISSUE_URL}
          variant="outline"
          className="w-fit"
          hideArrow
        >
          {t("page-developers-tools-suggest-resource-button")}
        </ButtonLink>
      </div>
    </MainArticle>
  )
}

export default ToolsPageBody
