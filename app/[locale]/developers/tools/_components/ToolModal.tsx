"use client"

import { useMemo } from "react"
import { useSearchParams } from "next/navigation"

import type { DeveloperToolWithCategory } from "../types"
import { getToolKey } from "../utils"

import ToolModalContents, { type ToolModalLabels } from "./ToolModalContents"
import ToolModalWrapper from "./ToolModalWrapper"

type ToolModalProps = {
  tools: DeveloperToolWithCategory[]
  categoryLabels: Record<string, string>
  subcategoryLabels: Record<string, string>
  tagLabels: Record<string, string>
  labels: ToolModalLabels
}

/**
 * Opens the tool details modal based on the `?tool=` (or legacy `?toolId=`)
 * search param. Reading the param client-side keeps the host page statically
 * renderable; unknown keys simply leave the modal closed.
 */
const ToolModal = ({
  tools,
  categoryLabels,
  subcategoryLabels,
  tagLabels,
  labels,
}: ToolModalProps) => {
  const searchParams = useSearchParams()
  const toolKey = searchParams.get("tool") ?? searchParams.get("toolId")

  const activeTool = useMemo(
    () =>
      toolKey ? tools.find((tool) => getToolKey(tool) === toolKey) : undefined,
    [tools, toolKey]
  )

  return (
    <ToolModalWrapper variant="unstyled" open={!!activeTool}>
      {activeTool && (
        <ToolModalContents
          tool={activeTool}
          categoryLabels={categoryLabels}
          subcategoryLabels={subcategoryLabels}
          tagLabels={tagLabels}
          labels={labels}
        />
      )}
    </ToolModalWrapper>
  )
}

export default ToolModal
