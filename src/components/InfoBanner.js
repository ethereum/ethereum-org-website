import React from "react"
import styled from "styled-components"
import EmojiHolder from "../components/EmojiHolder"

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  border: 1px solid #a4a4f3; /* TODO add color to theme */
  background-color: ${(props) => props.theme.colors.searchBackground};
  border-radius: 4px;
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

// const Emoji = styled(EmojiHolder)`
//   font-size: 24px;
//   margin-right: 1.5rem;
//   width: 5.5em !important;
//   height: 5.5em !important;
//   & > img {
//     width: 5.5em !important;
//     height: 5.5em !important;
//   }
// `

const InfoBanner = ({ emoji, children }) => {
  return (
    <InfoContainer>
      <EmojiHolder text={emoji} size={2} />
      <InfoCopy>{children}</InfoCopy>
    </InfoContainer>
  )
}

export default InfoBanner
