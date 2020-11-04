import React from "react"
import styled from "styled-components"
import Icon from "./Icon"
import Link from "./Link"

const Container = styled(Link)`
  text-decoration: none;
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: row;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.colors.preBorder};
  // box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  &:hover {
    box-shadow: 0 0 1px ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.tableBackgroundHover};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 100%;
  }
`

const TextDiv = styled.div`
  flex: 1;
  flex-direction: column;
  color: ${(props) => props.theme.colors.text};
`

const Chevron = styled(Icon)`
  margin-left: 1rem;
  align-self: center;
`

const Title = styled.p`
  color: ${(props) => props.theme.colors.text300};
  font-weight: bold;
  margin-bottom: 0.5rem;
`

const Description = styled.p`
  color: ${(props) => props.theme.colors.text300};
  margin: 0;
`

const DocLink = ({ to, title, description }) => {
  return (
    <Container to={to}>
      <TextDiv>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </TextDiv>
      <Chevron
        name="chevronRight"
        color={(props) => props.theme.colors.text}
      ></Chevron>
    </Container>
  )
}

export default DocLink
