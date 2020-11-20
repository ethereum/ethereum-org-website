import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Icon from "./Icon"
import Link from "./Link"
import Img from "gatsby-image"

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  width: 100%;
  margin: 3rem 0;
  display: grid;
  grid-gap: 1rem;
  @media (min-width: ${(props) => props.theme.breakpoints.m}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: ${(props) => props.theme.breakpoints.xl}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Item = styled.div`
  display: grid;
  grid-template-columns: 2fr auto;
  grid-template-rows: auto auto;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    grid-template-columns: auto;
  }
  color: ${(props) => props.theme.colors.text} !important;
  box-shadow: 0 1px 1px 1px ${(props) => props.theme.colors.tableItemBoxShadow};
  margin-bottom: 1px;
  padding: 1rem;
  width: 100%;
  color: #000;
  border-radius: 4px;
  &:hover {
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`

const Header = styled.div`
  grid-column: 1;
  grid-row: 1;
  font-size: 24px;
  font-weight: 400;
  text-align: left;
`

const Description = styled.div`
  grid-column: 1;
  grid-row: 2;
  text-align: left;
  margin: 1.5rem 0;
`

const TwitterButton = styled(Link)`
  grid-column: 2;
  grid-row: 1;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    grid-column: 1;
    grid-row: 3;
  }
  display: flex;
  align-items: center;
  text-decoration: none;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  color: ${(props) => props.theme.colors.text};
  &:hover {
    box-shadow: 0 0 1px ${(props) => props.theme.colors.primary};
  }
  &:hover path {
    fill: ${(props) => props.theme.colors.primary};
  }
  background: #51a0eb30;
`

const Glyph = styled.div`
  text-align: center;
  display: flex;
  flex-direection: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 0.325rem;
  path {
    fill: ${(props) => props.theme.colors.text};
  }
  float: left;
  font-size: ${(props) => props.theme.fontSizes.s};
`

const Handle = styled.div`
  margin: 2px 6px 2px 0;
  font-size: 13px;
`

const DaoImage = styled(Img)`
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    margin: -3rem 0 0rem;
    grid-column: 2 / 3;
    grid-row: 1 / 4;
  }
  @media (min-width: ${(props) => props.theme.breakpoints.xl}) {
    margin: -3rem 0 2rem;
    grid-column: 2 / 4;
    grid-row: 1 / 6;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
`

const DaoList = ({ content, image }) => {
  const [daos, setDaos] = useState()
  useEffect(() => {
    const list = content.map((item) => {
      item.randomNumber = Math.floor(Math.random() * content.length)
      return item
    })
    list.sort((a, b) => a.randomNumber - b.randomNumber)
    setDaos(list)
  }, [])

  return (
    <Container>
      {daos &&
        daos.map(
          ({ title, to, twitterHandle, twitterTo, description }, idx) => (
            <Item key={idx}>
              <Header>
                <Link to={to}>{title}</Link>
              </Header>
              <TwitterButton to={twitterTo} hideArrow={true}>
                <Glyph>
                  <Icon name="twitter" size={"1rem"} />
                </Glyph>
                <Handle>{twitterHandle}</Handle>
              </TwitterButton>
              <Description>{description}</Description>
            </Item>
          )
        )}
      <DaoImage fluid={image} loading="eager" />
    </Container>
  )
}

export default DaoList
