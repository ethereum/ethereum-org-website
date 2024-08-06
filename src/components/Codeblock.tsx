import React, { useState } from "react"
import { useTranslation } from "next-i18next"
import Highlight, {
  defaultProps,
  Language,
  PrismTheme,
} from "prism-react-renderer"
import Prism from "prism-react-renderer/prism"
import { Box, BoxProps, Flex, useColorModeValue } from "@chakra-ui/react"

// https://github.com/FormidableLabs/prism-react-renderer/tree/master#custom-language-support
import CopyToClipboard from "@/components/CopyToClipboard"
import Emoji from "@/components/Emoji"

import { LINES_BEFORE_COLLAPSABLE } from "@/lib/constants"
;(typeof global !== "undefined" ? global : window).Prism = Prism
require("prismjs/components/prism-solidity")

const TopBarItem = (props: BoxProps) => {
  const bgColor = useColorModeValue("#f7f7f7", "#363641")

  return (
    <Box
      border="1px"
      borderRadius="base"
      borderColor="searchBorder"
      bg={bgColor}
      ms={2}
      py={1}
      px={2}
      _hover={{
        cursor: "pointer",
        color: "text100",
        transform: "scale(1.04)",
        boxShadow: "1px 1px 8px 1px rgba(0, 0, 0, 0.5)",
      }}
      {...props}
    />
  )
}

const codeTheme = {
  light: {
    plain: {
      backgroundColor: "#fafafa",
      color: "#333333",
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
      backgroundColor: "#2a2734",
      color: "#9a86fd",
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

export type CodeblockProps = {
  allowCollapse?: boolean
  codeLanguage: string
  fromHomepage?: boolean
  children: React.ReactNode
}

const Codeblock = ({
  children,
  allowCollapse = true,
  codeLanguage,
  fromHomepage = false,
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

  let className: string
  if (React.isValidElement(children)) {
    className = children?.props?.className
  } else {
    className = codeLanguage || ""
  }

  const matches = className?.match(/language-(.*)/)
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
    <Box position="relative" dir="ltr">
      <Box
        borderRadius="base"
        border={fromHomepage ? "none" : "1px solid"}
        borderColor="border"
        maxH={
          isCollapsed
            ? `calc((1.2rem * ${LINES_BEFORE_COLLAPSABLE}) + 4.185rem)`
            : "none"
        }
        overflow="scroll"
        mb={fromHomepage ? 0 : 4}
      >
        <Highlight
          {...defaultProps}
          code={codeText}
          language={language as Language}
          theme={selectedTheme as PrismTheme}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <Box
              as="pre"
              style={style}
              className={className}
              pt={hasTopBar ? "2.75rem" : 6}
              pb={6}
              ps={4}
              m={0}
              overflow="visible"
              minW="full"
              w="fit-content"
            >
              {tokens.map((line, i) => {
                return i === tokens.length - 1 &&
                  line[0].content === "" ? null : (
                  <Box
                    key={i}
                    display="table-row"
                    {...getLineProps({ line, key: i })}
                  >
                    {shouldShowLineNumbers && (
                      <Box
                        as="span"
                        display="table-cell"
                        textAlign="end"
                        pe={8}
                        userSelect="none"
                        opacity={0.4}
                      >
                        {i + 1}
                      </Box>
                    )}
                    <Box as="span" display="table-cell">
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </Box>
                  </Box>
                )
              })}
              {!fromHomepage && (
                <Flex
                  className={className}
                  justify="flex-end"
                  position="absolute"
                  top={3}
                  insetInlineEnd={4}
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
                              <Emoji text=":clipboard:" fontSize="md" />{" "}
                              {t("copy")}
                            </>
                          ) : (
                            <>
                              <Emoji text=":white_check_mark:" fontSize="md" />{" "}
                              {t("copied")}
                            </>
                          )}
                        </TopBarItem>
                      )}
                    </CopyToClipboard>
                  )}
                </Flex>
              )}
            </Box>
          )}
        </Highlight>
      </Box>
    </Box>
  )
}

export default Codeblock
