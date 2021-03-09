import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"

import Link from "./Link"

const Table = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  width: 100%;
  margin-bottom: 2rem;
`

const Item = styled.div`
  cursor: pointer;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.text} !important;
  box-shadow: 0 1px 1px ${(props) => props.theme.colors.tableItemBoxShadow};
  margin-bottom: 1px;
  padding: 1rem;
  width: 100%;
  color: #000;
  &:hover {
    border-radius: 4px;
    box-shadow: 0 0 1px ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.tableBackgroundHover};
  }
`

const ItemLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.text} !important;
  box-shadow: 0 1px 1px ${(props) => props.theme.colors.tableItemBoxShadow};
  margin-bottom: 1px;
  padding: 1rem;
  width: 100%;
  color: #000;
  &:hover {
    border-radius: 4px;
    box-shadow: 0 0 1px ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.tableBackgroundHover};
  }
`

const ItemTitle = styled.div``

const ItemDesc = styled.div`
  font-size: ${(props) => props.theme.fontSizes.s};
  margin-bottom: 0;
  opacity: 0.6;
`

const LeftContainer = styled.div`
  flex: 1 1 75%;
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
`
const RightContainer = styled.div`
  flex: 1 0 25%;
  display: flex;
  align-items: center;
  margin-right: 1rem;
  flex-wrap: wrap;
`

const Image = styled(Img)`
  min-width: 20px;
  margin-right: 1rem;
  margin-top: 4px;
`

const CardList = ({ content, className, clickHandler }) => (
  <Table className={className}>
    {content.map((listItem, idx) => {
      const { title, description, caption, link, image, alt, id } = listItem
      const isLink = !!link
      return isLink ? (
        <ItemLink key={id || idx} to={link}>
          {image && <Image fixed={image} alt={alt} />}
          <LeftContainer>
            <ItemTitle>{title}</ItemTitle>

            <ItemDesc>{description}</ItemDesc>
          </LeftContainer>
          {caption && (
            <RightContainer>
              <ItemDesc>{caption}</ItemDesc>
            </RightContainer>
          )}
        </ItemLink>
      ) : (
        <Item key={idx} onClick={() => clickHandler(idx)}>
          {image && <Image fixed={image} alt={alt} />}
          <LeftContainer>
            <ItemTitle>{title}</ItemTitle>

            <ItemDesc>{description}</ItemDesc>
          </LeftContainer>
          {caption && (
            <RightContainer>
              <ItemDesc>{caption}</ItemDesc>
            </RightContainer>
          )}
        </Item>
      )
    })}
  </Table>
)

export default CardList
