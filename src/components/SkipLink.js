import React from "react"
import styled from "styled-components"

const Div = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
`

const Anchor = styled.a`
  line-height: 2rem;
  position: absolute;
  top: -3rem;
  margin-left: 0.5rem;
  color: ${(props) => props.theme.colors.background};
  text-decoration: none;

  &:focus {
    position: static;
  }
`

const SkipLink = ({ hrefId }) => {
  return (
    <Div>
      <Anchor href={hrefId}>Skip to Main Content</Anchor>
    </Div>
  )
}

export default SkipLink
