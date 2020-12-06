import React, { useState } from "react"
import styled from "styled-components"
import Highlight, { defaultProps } from "prism-react-renderer"

import Translation from "../components/Translation"
import CopyToClipboard from "./CopyToClipboard"
import Emoji from "./Emoji"
import { ButtonPrimary } from "./SharedStyledComponents"

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  margin-bottom: 1rem;
`

const HightlightContainer = styled.div`
  border-radius: 4px;
  width: 100%;
  max-height: ${({ isCollapsed }) => (isCollapsed ? "200px" : "fit-content")};
  overflow: scroll;
`

const CopyButton = styled(ButtonPrimary)`
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
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

const BottomBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.25rem 1rem;
`

const StyledPre = styled.pre`
  margin: 0;
`

// TODO remove extra line
const Codeblock = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const className = props.children.props.className || ""
  const matches = className.match(/language-(?<lang>.*)/)
  const language =
    matches && matches.groups && matches.groups.lang ? matches.groups.lang : ""
  const shouldShowCopyWidget = ["js", "json", "python", "solidity"].includes(
    language
  )
  const shouldShowLineNumbers = language !== "bash"

  return (
    <Container>
      <HightlightContainer isCollapsed={isCollapsed}>
        <Highlight
          {...defaultProps}
          code={props.children.props.children}
          language={language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <StyledPre style={style} className={className}>
              {tokens.map((line, i) => {
                console.log({ line })
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
            </StyledPre>
          )}
        </Highlight>
      </HightlightContainer>
      <BottomBar>
        <CopyButton onClick={() => setIsCollapsed(!isCollapsed)}>
          {/* TODO: Change to icon or translate */}
          {isCollapsed ? "More" : "Less"}
        </CopyButton>
        {shouldShowCopyWidget && (
          <CopyToClipboard text={props.children.props.children}>
            {(isCopied) => (
              <CopyButton>
                {!isCopied ? (
                  <>
                    <Emoji text=":clipboard:" size={1} />{" "}
                    <Translation id="page-codeblock-copy" />
                  </>
                ) : (
                  <>
                    <Emoji text=":white_check_mark:" size={1} />{" "}
                    <Translation id="page-codeblock-copied" />
                  </>
                )}
              </CopyButton>
            )}
          </CopyToClipboard>
        )}
      </BottomBar>
    </Container>
  )
}

export default Codeblock
