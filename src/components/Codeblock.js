import React from "react"
import styled from "styled-components"
import Highlight, { defaultProps } from "prism-react-renderer"

import CopyToClipboard from "./CopyToClipboard"
import Emoji from "./Emoji"
import { ButtonPrimary } from "./SharedStyledComponents"

const CopyButton = styled(ButtonPrimary)`
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
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
              <CopyButtonContainer>
                <CopyToClipboard text={props.children.props.children}>
                  {(isCopied) => (
                    <CopyButton>
                      {!isCopied ? (
                        <>
                          <Emoji text=":clipboard:" size={1} /> Copy
                        </>
                      ) : (
                        <>
                          <Emoji text=":white_check_mark:" size={1} /> Copied
                        </>
                      )}
                    </CopyButton>
                  )}
                </CopyToClipboard>
              </CopyButtonContainer>
            )}
          </pre>
        )}
      </Highlight>
    </div>
  )
}

export default Codeblock
