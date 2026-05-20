"use client"

import { useState } from "react"
import { Check, ChevronDown, ChevronUp, Copy } from "lucide-react"

import CopyToClipboard from "@/components/CopyToClipboard"

import { cn } from "@/lib/utils/cn"

import { LINES_BEFORE_COLLAPSABLE } from "@/lib/constants"

import { useTranslation } from "@/hooks/useTranslation"

type CodeblockClientProps = {
  html: string
  codeText: string
  languageLabel: string
  allowCollapse: boolean
  shouldShowLineNumbers: boolean
  totalLines: number
  fromHomepage: boolean
  className?: string
}

const CodeblockClient = ({
  html,
  codeText,
  languageLabel,
  allowCollapse,
  shouldShowLineNumbers,
  totalLines,
  fromHomepage,
  className,
}: CodeblockClientProps) => {
  const { t } = useTranslation("common")

  const codeLineCount = Math.max(totalLines - 1, 1)
  const isCollapsable =
    !fromHomepage && allowCollapse && codeLineCount > LINES_BEFORE_COLLAPSABLE
  const [isCollapsed, setIsCollapsed] = useState(isCollapsable)

  const showLanguageLabel = !fromHomepage && languageLabel.length > 0
  const showCopy = !fromHomepage
  const showCornerCollapse = isCollapsable && !isCollapsed
  const hasCornerUi = showLanguageLabel || showCopy || showCornerCollapse

  return (
    /* Force LTR — codeblocks shouldn't inherit RTL from Arabic/Urdu pages.
       Context: https://github.com/ethereum/ethereum-org-website/issues/6202 */
    <div
      dir="ltr"
      className={cn(
        "codeblock-shiki group/codeblock relative my-8",
        hasCornerUi && "has-corner",
        shouldShowLineNumbers && "line-numbers",
        isCollapsable && isCollapsed && "is-collapsed",
        className
      )}
    >
      <div
        data-code-surface
        className="overflow-auto rounded-md bg-background-highlight text-primary"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {hasCornerUi && (
        <div className="pointer-events-none absolute inset-e-4 top-1.5 flex items-center gap-1 font-mono text-[10px] leading-none tracking-[0.08em] text-disabled uppercase">
          {showCornerCollapse && (
            <button
              type="button"
              onClick={() => setIsCollapsed(true)}
              aria-label={t("show-less")}
              className="pointer-events-auto inline-flex h-6 items-center gap-1 rounded px-1.5 opacity-0 transition-opacity group-focus-within/codeblock:opacity-100 group-hover/codeblock:opacity-100 hover:text-primary focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-primary"
            >
              <ChevronUp className="size-3" aria-hidden="true" />
            </button>
          )}
          {showCopy && (
            <CopyToClipboard
              text={codeText}
              className="pointer-events-auto inline-flex h-6 items-center gap-1 rounded px-1.5 text-disabled opacity-0 transition-opacity group-focus-within/codeblock:opacity-100 group-hover/codeblock:opacity-100 hover:text-primary focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-primary"
            >
              {(isCopied) => (
                <>
                  <span className="sr-only">
                    {isCopied ? t("copied") : t("copy")}
                  </span>
                  {isCopied ? (
                    <Check className="size-3" aria-hidden="true" />
                  ) : (
                    <Copy className="size-3" aria-hidden="true" />
                  )}
                </>
              )}
            </CopyToClipboard>
          )}
          {showLanguageLabel && (
            <span className="px-1" aria-hidden="true">
              {languageLabel}
            </span>
          )}
        </div>
      )}

      {isCollapsable && isCollapsed && (
        <button
          type="button"
          onClick={() => setIsCollapsed(false)}
          aria-label={`${t("show-all")} (${codeLineCount})`}
          className="codeblock-expander group/expander"
        >
          <span>
            {t("show-all")}{" "}
            <span className="text-disabled transition-colors duration-[120ms] ease-out group-hover/expander:text-primary">
              ({codeLineCount})
            </span>
          </span>
          <ChevronDown className="size-3.5" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

export default CodeblockClient
