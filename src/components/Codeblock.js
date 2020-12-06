import React from "react"
import styled from "styled-components"
import Highlight, { defaultProps } from "prism-react-renderer"

import Translation from "../components/Translation"
import CopyToClipboard from "./CopyToClipboard"
import Emoji from "./Emoji"
import Icon from "./Icon"
import { ButtonPrimary } from "./SharedStyledComponents"

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 300px;
  margin-bottom: 1rem;
`

const HightlightContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  max-height: 300px;
  overflow: scroll;
`

const CopyButton = styled(ButtonPrimary)`
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  position: absolute;
  right: 1rem;
  top: 1rem;
`

const CopyButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
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

const StyledButtonPrimary = styled(ButtonPrimary)`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
`

const StyledIcon = styled(Icon)`
  fill: black;
  &:hover {
    fill: black;
  }
`

const StyledPre = styled.pre`
  margin: 0;
`

// TODO remove extra line
const Codeblock = (props) => {
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
      <HightlightContainer>
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
      <StyledButtonPrimary>
        <StyledIcon name="expand" />
      </StyledButtonPrimary>
      {shouldShowCopyWidget && (
        <CopyButtonContainer>
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
        </CopyButtonContainer>
      )}
    </Container>
  )
}

export default Codeblock
