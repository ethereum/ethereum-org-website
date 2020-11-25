import React from "react"
import styled from "styled-components"
import Emoji from "./Emoji"

const InfoContainer = styled.div`
  color: ${(props) => props.theme.colors.black300};
  padding: 1.5rem;
  background: ${(props) => props.theme.colors.infoBanner};
  display: flex;
  flex-direction: column;

  a {
    color: ${(props) => props.theme.colors.infoLink};
    &:hover {
      color: ${(props) => props.theme.colors.infoLinkHover};
    }
  }
`

const Content = styled.span``

const InfoBanner = ({ className, emoji, children }) => {
  return (
    <InfoContainer className={className}>
      {emoji && <Emoji svg mb={"0.5rem"} text={emoji} />}
      <Content>{children}</Content>
    </InfoContainer>
  )
}

export default InfoBanner
