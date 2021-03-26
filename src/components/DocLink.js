import React from "react"
import styled from "styled-components"
import Icon from "./Icon"
import Link from "./Link"
import Emoji from "./Emoji"

const Container = styled(Link)`
  position: relative;
  z-index: 1;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  flex: 1;
  width: 100%;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 2px;
  color: ${(props) => props.theme.colors.text};
  border: 1px solid ${(props) => props.theme.colors.border};
  &:hover {
    box-shadow: 0 0 1px ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.tableBackgroundHover};
    border-radius: 4px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 100%;
  }
`

const TextCell = styled.div`
  flex: 1;
  flex-direction: column;
  color: ${(props) => props.theme.colors.text};
`

const Title = styled.p`
  color: ${(props) => props.theme.colors.text300};
  font-weight: 600;
  margin: 0;
`

const Arrow = styled(Icon)`
  margin: 0rem 1.5rem;
  align-self: center;
  min-width: 2rem;
`

const EmojiCell = styled.div`
  display: flex;
  align-items: center;
`

const DocLink = ({ to, title, className }) => (
  <Container to={to} className={className}>
    <EmojiCell>
      <Emoji size={1} text=":page_with_curl:" mr={`1rem`} />
    </EmojiCell>
    <TextCell>
      <Title>{title}</Title>
    </TextCell>
    <Arrow name="arrowRight" color={(props) => props.theme.colors.text} />
  </Container>
)

export default DocLink
