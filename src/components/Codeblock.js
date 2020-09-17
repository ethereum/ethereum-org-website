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

const Codeblock = (props) => {
  const className = props.children.props.className || ""
  const matches = className.match(/language-(?<lang>.*)/)
  const language =
    matches && matches.groups && matches.groups.lang ? matches.groups.lang : ""
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
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
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
          </pre>
        )}
      </Highlight>
    </div>
  )
}

export default Codeblock
