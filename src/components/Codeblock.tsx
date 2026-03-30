"use client"

import React, { useState } from "react"
import { Clipboard, ClipboardCheck } from "lucide-react"
import { useTheme } from "next-themes"
import { Highlight, Prism, type PrismTheme, themes } from "prism-react-renderer"

import CopyToClipboard from "@/components/CopyToClipboard"
import { Button } from "@/components/ui/buttons/Button"
import { Flex } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"

import { LINES_BEFORE_COLLAPSABLE } from "@/lib/constants"

import { useTranslation } from "@/hooks/useTranslation"

// Register Solidity language support
// https://github.com/FormidableLabs/prism-react-renderer#custom-language-support
;(typeof global !== "undefined" ? global : window).Prism = Prism
require("prismjs/components/prism-solidity")

const makeTransparent = (theme: PrismTheme): PrismTheme => ({
  ...theme,
  plain: { ...theme.plain, backgroundColor: "transparent" },
})

const lightTheme = makeTransparent(themes.oneLight)
const darkTheme = makeTransparent(themes.duotoneDark)

const getValidChildrenForCodeblock = (child: unknown): string | undefined => {
  try {
    if (typeof child !== "string") {
      const element = child as React.ReactElement<{ children: unknown }>
      return getValidChildrenForCodeblock(element.props.children)
    } else {
      return child
    }
  } catch {
    console.error(`Codeblock children is not valid`)
  }
}

export type CodeblockProps = React.HTMLAttributes<HTMLDivElement> & {
  allowCollapse?: boolean
  codeLanguage: string
  fromHomepage?: boolean
}

const Codeblock = ({
  children,
  allowCollapse = true,
  codeLanguage,
  fromHomepage = false,
  className,
}: CodeblockProps) => {
  const { t } = useTranslation("common")
  const { resolvedTheme } = useTheme()
  const codeTheme = resolvedTheme === "dark" ? darkTheme : lightTheme

  const codeText = React.Children.toArray(children)
    .map((child) => {
      if (!child) return
      return getValidChildrenForCodeblock(child)
    })
    .join("")

  const [isCollapsed, setIsCollapsed] = useState(allowCollapse)

  let langClass: string
  if (React.isValidElement<{ className?: string }>(children)) {
    langClass = children?.props?.className || ""
  } else {
    langClass = codeLanguage || ""
  }

  const matches = langClass?.match(/language-(.*)/)
  const language = matches?.[1] || ""

  const shouldShowCopyWidget = ["js", "json", "python", "solidity"].includes(
    language
  )
  const shouldShowLineNumbers = language !== "bash"
  const totalLines = codeText.split("\n").length

  const hasTopBar =
    shouldShowCopyWidget || totalLines - 1 > LINES_BEFORE_COLLAPSABLE

  return (
    /* Overwrites codeblocks inheriting RTL styling in Right-To-Left script languages (e.g., Arabic) */
    /* Context: https://github.com/ethereum/ethereum-org-website/issues/6202 */
    <div className={cn("relative", className)} dir="ltr">
      <div
        className="overflow-auto rounded bg-background-highlight text-primary"
        style={{
          maxHeight: isCollapsed
            ? `calc((1.2rem * ${LINES_BEFORE_COLLAPSABLE}) + 4.185rem)`
            : "none",
        }}
      >
        <Highlight code={codeText} language={language} theme={codeTheme}>
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={cn(
                "m-0 w-fit min-w-full overflow-visible py-6 ps-4",
                hasTopBar && "pt-[2.75rem]"
              )}
              style={style}
            >
              {tokens.map((line, i) => {
                return i === tokens.length - 1 && line[0].empty ? null : (
                  <div
                    key={i}
                    style={{ display: "table-row" }}
                    {...getLineProps({ line })}
                  >
                    {shouldShowLineNumbers && (
                      <span className="table-cell select-none pe-8 text-end opacity-40">
                        {i + 1}
                      </span>
                    )}
                    <span className="table-cell">
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </span>
                  </div>
                )
              })}
              {!fromHomepage && (
                <Flex className="absolute end-4 top-3 justify-end gap-2">
                  {allowCollapse &&
                    totalLines - 1 > LINES_BEFORE_COLLAPSABLE && (
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
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  )
}

export default Codeblock
