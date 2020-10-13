import React from "react"
import styled from "styled-components"
import Emoji from "../components/Emoji"

// TODO merge with InfoBanner.js
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

const Warning = ({ children, emoji }) => {
  return (
    <InfoContainer>
      {emoji && <Emoji text={emoji} />}
      {children}
    </InfoContainer>
  )
}

export default Warning
