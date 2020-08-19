import React from "react"
import styled from "styled-components"
import { Twemoji } from "react-emoji-render"

const InfoContainer = styled.div`
  width: 100%;
  max-width: 876px;
  color: ${(props) => props.theme.colors.black300};
  padding: 16px 24px;
  background: #ffe3d3;
  border-radius: 4px;
  border: #ff7324 1px solid;
  display: flex;
  margin-top: 2rem;
`

const Emoji = styled(Twemoji)`
  margin-right: 1rem;
  & > img {
    width: 1.5em !important;
    height: 1.5em !important;
    min-width: 24px;
    min-height: 24px;
  }
`

const Warning = ({ emoji, children }) => {
  return (
    <InfoContainer>
      <Emoji svg text={emoji} />
      {children}
    </InfoContainer>
  )
}

export default Warning
