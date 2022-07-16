import React from "react"
import styled from "styled-components"
import Translation from "./Translation"

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

const DivAnchor = styled.div`
  height: 80px;
  margin-top: -80px;
`

export interface IProps {
  hrefId: string
}

export const SkipLink: React.FC<IProps> = ({ hrefId }) => {
  return (
    <Div>
      <Anchor href={hrefId}>
        <Translation id="skip-to-main-content" />
      </Anchor>
    </Div>
  )
}

export const SkipLinkAnchor: React.FC<{ id: string }> = ({ id }) => {
  return <DivAnchor id={id}></DivAnchor>
}
