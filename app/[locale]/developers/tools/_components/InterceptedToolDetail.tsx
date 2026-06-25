import { notFound } from "next/navigation"

import { getToolDetailData } from "../page-data"

import ToolDetail from "./ToolDetail"
import ToolDetailModal from "./ToolDetailModal"

/**
 * Shared body for the intercepting modal slots (index-level and category-level).
 * Server-renders the tool detail inside the client modal shell.
 */
const InterceptedToolDetail = async ({
  locale,
  category,
  tool,
}: {
  locale: string
  category: string
  tool: string
}) => {
  const detail = await getToolDetailData(locale, category, tool)
  if (!detail) notFound()

  return (
    <ToolDetailModal title={detail.tool.name}>
      <ToolDetail
        locale={locale}
        tool={detail.tool}
        categoryLabels={detail.categoryLabels}
        subcategoryLabels={detail.subcategoryLabels}
        tagLabels={detail.tagLabels}
        labels={detail.labels}
      />
    </ToolDetailModal>
  )
}

export default InterceptedToolDetail
