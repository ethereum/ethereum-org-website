import React from "react"
import styled from "styled-components"
import Highlight, { defaultProps } from "prism-react-renderer"
import { Twemoji } from "react-emoji-render"

import CopyToClipboard from "./CopyToClipboard"
import { FakeButton } from "./SharedStyledComponents"

const CopyCode = styled(FakeButton)`
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.buttonColor};
  border: 1px solid transparent;
  &:hover {
    background-color: ${(props) => props.theme.colors.primaryHover};
  }
  &:active {
    background-color: ${(props) => props.theme.colors.primaryActive};
  }
`

const CopyCodeContainer = styled.div`
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
    <div>
      <Highlight
        {...defaultProps}
        code={props.children.props.children}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style} className={className}>
            {tokens.map((line, i) => (
              <Line key={i} {...getLineProps({ line, key: i })}>
                {shouldShowLineNumbers && <LineNo>{i + 1}</LineNo>}
                <LineContent>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </LineContent>
              </Line>
            ))}
            {shouldShowCopyWidget && (
              <CopyCodeContainer>
                <CopyToClipboard text={props.children.props.children}>
                  {(isCopied) => (
                    <CopyCode>
                      {!isCopied ? (
                        <div>
                          <Twemoji svg text=":clipboard:" /> Copy
                        </div>
                      ) : (
                        <div>
                          <Twemoji svg text=":white_check_mark:" /> Copied
                        </div>
                      )}
                    </CopyCode>
                  )}
                </CopyToClipboard>
              </CopyCodeContainer>
            )}
          </pre>
        )}
      </Highlight>
    </div>
  )
}

export default Codeblock
