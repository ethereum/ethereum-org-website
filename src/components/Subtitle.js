import React from "react"
import styled from "styled-components"

const SubtitleMessage = styled.div`
  font-size: 20px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
  border-left: 2px solid ${(props) => props.theme.colors.primary};
  padding: 0rem 1rem;
`

const Subtitle = ({ children }) => {
  return <SubtitleMessage>{children}</SubtitleMessage>
}
export default Subtitle
