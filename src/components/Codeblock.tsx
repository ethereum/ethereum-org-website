import React, { useState } from "react"
import { useTranslation } from "next-i18next"
import Highlight, {
  defaultProps,
  Language,
  PrismTheme,
} from "prism-react-renderer"
import Prism from "prism-react-renderer/prism"

// https://github.com/FormidableLabs/prism-react-renderer/tree/master#custom-language-support
import CopyToClipboard from "@/components/CopyToClipboard"
import Emoji from "@/components/Emoji"
import { Flex } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"

import { LINES_BEFORE_COLLAPSABLE } from "@/lib/constants"

import useColorModeValue from "@/hooks/useColorModeValue"
;(typeof global !== "undefined" ? global : window).Prism = Prism
require("prismjs/components/prism-solidity")

const TopBarItem = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "ms-2 rounded border px-2 py-1 shadow-[1px_1px_8px_1px_rgba(var(--black),_0.5)] transition-transform duration-100",
        "hover:scale-105 hover:cursor-pointer hover:bg-gray-200 hover:shadow-md hover:transition-transform hover:duration-100",
        "bg-background-highlight hover:bg-background",
        className
      )}
      {...props}
    />
  )
}

const codeTheme = {
  light: {
    plain: {
      backgroundColor: "#f7f7f7", // background-highlight (gray-50)
      color: "#6C24DF", // primary (purple-600)
    },
    styles: [
      {
        style: { color: "#6c6783" },
        types: ["comment", "prolog", "doctype", "cdata", "punctuation"],
      },
      {
        style: { opacity: 0.7 },
        types: ["namespace"],
      },
      {
        style: { color: "#e09142" },
        types: ["tag", "operator", "number"],
      },
      {
        style: { color: "#ff7324" },
        types: ["property", "function"],
      },
      {
        style: { color: "#888888" },
        types: ["tag-id", "selector", "atrule-id"],
      },
      {
        style: { color: "#474b5e" },
        types: ["attr-name"],
      },
      {
        style: { color: "#498bb5" },
        types: [
          "boolean",
          "string",
          "entity",
          "url",
          "attr-value",
          "keyword",
          "control",
          "directive",
          "unit",
          "statement",
          "regex",
          "at-rule",
          "placeholder",
          "variable",
        ],
      },
      {
        style: { textDecorationLine: "line-through" },
        types: ["deleted"],
      },
      {
        style: { textDecorationLine: "underline" },
        types: ["inserted"],
      },
      {
        style: { fontStyle: "italic" },
        types: ["italic"],
      },
      {
        style: { fontWeight: "bold" },
        types: ["important", "bold"],
      },
      {
        style: { color: "#c4b9fe" },
        types: ["important"],
      },
    ],
  },
  dark: {
    // Pulled from `defaultProps.theme` for potential customization
    plain: {
      backgroundColor: "#121212", // background-highlight (gray-900)
      color: "#B38DF0", // primary (purple-400)
    },
    styles: [
      {
        style: { color: "#6c6783" },
        types: ["comment", "prolog", "doctype", "cdata", "punctuation"],
      },
      {
        style: { opacity: 0.7 },
        types: ["namespace"],
      },
      {
        style: { color: "#e09142" },
        types: ["tag", "operator", "number"],
      },
      {
        style: { color: "#9a86fd" },
        types: ["property", "function"],
      },
      {
        style: { color: "#eeebff" },
        types: ["tag-id", "selector", "atrule-id"],
      },
      {
        style: { color: "#c4b9fe" },
        types: ["attr-name"],
      },
      {
        style: { color: "#ffcc99" },
        types: [
          "boolean",
          "string",
          "entity",
          "url",
          "attr-value",
          "keyword",
          "control",
          "directive",
          "unit",
          "statement",
          "regex",
          "at-rule",
          "placeholder",
          "variable",
        ],
      },
      {
        style: { textDecorationLine: "line-through" },
        types: ["deleted"],
      },
      {
        style: { textDecorationLine: "underline" },
        types: ["inserted"],
      },
      {
        style: { fontStyle: "italic" },
        types: ["italic"],
      },
      {
        style: { fontWeight: "bold" },
        types: ["important", "bold"],
      },
      {
        style: { color: "#c4b9fe" },
        types: ["important"],
      },
    ],
  },
}

const getValidChildrenForCodeblock = (child) => {
  try {
    if (typeof child !== "string") {
      return getValidChildrenForCodeblock(child.props.children)
    } else {
      return child
    }
  } catch (e) {
    /*For now available: code without wrappers like div
    * example:
    * <Codeblock codeLanguage="language-js">
        const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/your-api-key"){"\n"}
        web3.eth.getBlockNumber().then(console.log)
      </Codeblock>
    * */
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
  const selectedTheme = useColorModeValue(codeTheme.light, codeTheme.dark)

  const codeText = React.Children.toArray(children)
    .map((child) => {
      if (!child) return
      return getValidChildrenForCodeblock(child)
    })
    .join("")

  const [isCollapsed, setIsCollapsed] = useState(allowCollapse)

  let langClass: string
  if (React.isValidElement(children)) {
    langClass = children?.props?.className
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
    /* Overwrites codeblocks inheriting RTL styling in Right-To-Left script languages (e.g. Arabic) */
    /* Context: https://github.com/ethereum/ethereum-org-website/issues/6202 */
    <div className={cn("relative", className)} dir="ltr">
      <div
        className="overflow-scroll rounded"
        style={{
          maxHeight: isCollapsed
            ? `calc((1.2rem * ${LINES_BEFORE_COLLAPSABLE}) + 4.185rem)`
            : "none",
        }}
      >
        <Highlight
          {...defaultProps}
          code={codeText}
          language={language as Language}
          theme={selectedTheme as PrismTheme}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={cn(
                "m-0 w-fit min-w-full overflow-visible py-6 ps-4",
                hasTopBar && "pt-[2.75rem]",
                className
              )}
              style={style}
            >
              {tokens.map((line, i) => {
                return i === tokens.length - 1 &&
                  line[0].content === "" ? null : (
                  <div
                    key={i}
                    style={{ display: "table-row" }}
                    {...getLineProps({ line, key: i })}
                  >
                    {shouldShowLineNumbers && (
                      <span className="table-cell select-none pe-8 text-end opacity-40">
                        {i + 1}
                      </span>
                    )}
                    <span className="table-cell">
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </span>
                  </div>
                )
              })}
              {!fromHomepage && (
                <Flex
                  className={cn("absolute end-4 top-3 justify-end", className)}
                >
                  {allowCollapse &&
                    totalLines - 1 > LINES_BEFORE_COLLAPSABLE && (
                      <TopBarItem onClick={() => setIsCollapsed(!isCollapsed)}>
                        {isCollapsed ? t("show-all") : t("show-less")}
                      </TopBarItem>
                    )}
                  {shouldShowCopyWidget && (
                    <CopyToClipboard text={codeText}>
                      {(isCopied) => (
                        <TopBarItem>
                          {!isCopied ? (
                            <>
                              <Emoji text=":clipboard:" className="text-md" />{" "}
                              {t("copy")}
                            </>
                          ) : (
                            <>
                              <Emoji
                                text=":white_check_mark:"
                                className="text-md"
                              />{" "}
                              {t("copied")}
                            </>
                          )}
                        </TopBarItem>
                      )}
                    </CopyToClipboard>
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
