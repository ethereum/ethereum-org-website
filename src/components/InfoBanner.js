import React from "react"
import styled from "styled-components"
import Emoji from "./Emoji"

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  border: 1px solid #a4a4f3; /* TODO add color to theme */
  background-color: ${(props) => props.theme.colors.searchBackground};
  border-radius: 2px;
  margin: 0 2rem 0;
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    max-width: 876px;
    margin: 0 auto;
  }
`

const InfoCopy = styled.p`
  margin-bottom: 0px;
  color: ${(props) => props.theme.colors.text};
`

const InfoBanner = ({ emoji, children }) => {
  return (
    <InfoContainer>
      <Emoji text={emoji} size={2} mr={`1.5em`} />
      <InfoCopy>{children}</InfoCopy>
    </InfoContainer>
  )
}

export default InfoBanner
