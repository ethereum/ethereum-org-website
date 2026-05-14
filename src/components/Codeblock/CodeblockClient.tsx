"use client"

import { useState } from "react"
import { Clipboard, ClipboardCheck } from "lucide-react"

import CopyToClipboard from "@/components/CopyToClipboard"
import { Button } from "@/components/ui/buttons/Button"
import { Flex } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"

import { LINES_BEFORE_COLLAPSABLE } from "@/lib/constants"

import { useTranslation } from "@/hooks/useTranslation"

type CodeblockClientProps = {
  html: string
  codeText: string
  allowCollapse: boolean
  shouldShowCopyWidget: boolean
  shouldShowLineNumbers: boolean
  totalLines: number
  fromHomepage: boolean
  className?: string
}

const CodeblockClient = ({
  html,
  codeText,
  allowCollapse,
  shouldShowCopyWidget,
  shouldShowLineNumbers,
  totalLines,
  fromHomepage,
  className,
}: CodeblockClientProps) => {
  const { t } = useTranslation("common")
  const [isCollapsed, setIsCollapsed] = useState(allowCollapse)

  const isCollapsable = totalLines - 1 > LINES_BEFORE_COLLAPSABLE
  const hasTopBar = shouldShowCopyWidget || isCollapsable
  const showButtons = !fromHomepage && hasTopBar

  return (
    /* Overwrites codeblocks inheriting RTL styling in Right-To-Left script languages (e.g., Arabic) */
    /* Context: https://github.com/ethereum/ethereum-org-website/issues/6202 */
    <div className={cn("relative", className)} dir="ltr">
      <div
        className={cn(
          "codeblock-shiki overflow-auto rounded bg-background-highlight text-primary",
          hasTopBar && "has-top-bar",
          shouldShowLineNumbers && "line-numbers"
        )}
        style={{
          maxHeight: isCollapsed
            ? `calc((1.2rem * ${LINES_BEFORE_COLLAPSABLE}) + 4.185rem)`
            : "none",
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {showButtons && (
        <Flex className="absolute end-4 top-3 z-10 justify-end gap-2">
          {allowCollapse && isCollapsable && (
            <Button
              variant="outline"
              className="bg-background-highlight"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? t("show-all") : t("show-less")}
            </Button>
          )}
          {shouldShowCopyWidget && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="bg-background-highlight"
            >
              <CopyToClipboard text={codeText}>
                {(isCopied) =>
                  !isCopied ? (
                    <>
                      {t("copy")}
                      <Clipboard className="size-[1em]" />
                    </>
                  ) : (
                    <>
                      {t("copied")}
                      <ClipboardCheck className="size-[1em]" />
                    </>
                  )
                }
              </CopyToClipboard>
            </Button>
          )}
        </Flex>
      )}
    </div>
  )
}

export default CodeblockClient
