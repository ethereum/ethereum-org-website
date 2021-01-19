import React, { useState, useContext } from "react"
import styled, { ThemeContext } from "styled-components"
import Highlight, { defaultProps } from "prism-react-renderer"

import Translation from "../components/Translation"
import CopyToClipboard from "./CopyToClipboard"
import Emoji from "./Emoji"

const LINES_BEFORE_COLLAPSABLE = 8

const Container = styled.div`
  position: relative;
  margin-bottom: 1rem;
`

const HightlightContainer = styled.div`
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.border};
  width: 100%;
  max-height: ${({ isCollapsed }) =>
    isCollapsed
      ? `calc((1.2rem * ${LINES_BEFORE_COLLAPSABLE}) + 4.185rem)`
      : "fit-content"};
  overflow: scroll;
`

const StyledPre = styled.pre`
  padding-top: ${({ hasTopBar }) => (hasTopBar ? "2.75rem" : "1.5rem")};
  margin: 0;
`

const Line = styled.div`
  display: table-row;
`

const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`

const LineContent = styled.span`
  display: table-cell;
`

const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  top: 0.75rem;
  right: 1rem;
`

const TopBarItem = styled.div`
  border: 1px solid ${(props) => props.theme.colors.searchBorder};
  border-radius: 4px;
  background: ${({ theme }) => (theme.isDark ? "#363641" : "#F7F7F7")};
  margin-left: 0.5rem;
  padding: 0.25rem 0.5rem;

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.text100};
    transform: scale(1.04);
    box-shadow: 1px 1px 8px 1px rgba(0, 0, 0, 0.5);
  }
`

const codeTheme = {
  light: {
    plain: {
      backgroundColor: "#fafafa",
      color: "#333",
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
        style: { color: "#888" },
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

const Codeblock = ({ children, allowCollapse = true, codeLanguage }) => {
  const codeText = React.Children.map(children, (child) => {
    return getValidChildrenForCodeblock(child)
  }).join("")

  const [isCollapsed, setIsCollapsed] = useState(allowCollapse)
  const className = children?.props?.className || codeLanguage || ""
  const matches = className.match(/language-(?<lang>.*)/)
  const language = matches?.groups?.lang || ""

  const shouldShowCopyWidget = ["js", "json", "python", "solidity"].includes(
    language
  )
  const shouldShowLineNumbers = language !== "bash"
  const totalLines = codeText.split("\n").length
  const themeContext = useContext(ThemeContext)
  const theme = themeContext.isDark ? codeTheme.dark : codeTheme.light
  return (
    <Container>
      <HightlightContainer isCollapsed={isCollapsed}>
        <Highlight
          {...defaultProps}
          code={codeText}
          language={language}
          theme={theme}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <StyledPre
              style={style}
              className={className}
              hasTopBar={
                shouldShowCopyWidget ||
                totalLines - 1 > LINES_BEFORE_COLLAPSABLE
              }
            >
              {tokens.map((line, i) => {
                return i === tokens.length - 1 &&
                  line[0].content === "" ? null : (
                  <Line key={i} {...getLineProps({ line, key: i })}>
                    {shouldShowLineNumbers && <LineNo>{i + 1}</LineNo>}
                    <LineContent>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </LineContent>
                  </Line>
                )
              })}
              <TopBar>
                {allowCollapse && totalLines - 1 > LINES_BEFORE_COLLAPSABLE && (
                  <TopBarItem onClick={() => setIsCollapsed(!isCollapsed)}>
                    {isCollapsed ? (
                      <Translation id="show-all" />
                    ) : (
                      <Translation id="show-less" />
                    )}
                  </TopBarItem>
                )}

                {shouldShowCopyWidget && (
                  <CopyToClipboard text={codeText}>
                    {(isCopied) => (
                      <TopBarItem>
                        {!isCopied ? (
                          <>
                            <Emoji text=":clipboard:" size={1} />{" "}
                            <Translation id="copy" />
                          </>
                        ) : (
                          <>
                            <Emoji text=":white_check_mark:" size={1} />{" "}
                            <Translation id="copied" />
                          </>
                        )}
                      </TopBarItem>
                    )}
                  </CopyToClipboard>
                )}
              </TopBar>
            </StyledPre>
          )}
        </Highlight>
      </HightlightContainer>
    </Container>
  )
}

export default Codeblock
