import React, { ReactNode } from "react"
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"

import Link from "./Link"
import { ImageProp } from "../types"

const Table = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  width: 100%;
`

const Item = styled.div`
  cursor: pointer;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.text} !important;
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 1rem;
  width: 100%;
  color: #000000;
  margin-bottom: 1rem;
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
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 1rem;
  width: 100%;
  color: #000000;
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

const Image = styled(GatsbyImage)`
  min-width: 20px;
  margin-right: 1rem;
  margin-top: 4px;
`

export type CardListItem = {
  title?: ReactNode
  description?: ReactNode
  caption?: ReactNode
  link?: string
  id?: string | number
} & ImageProp

export interface IProps {
  content: Array<CardListItem>
  className?: string
  clickHandler?: (idx: string | number) => void
}

const CardList: React.FC<IProps> = ({
  content,
  className,
  clickHandler = () => null,
}) => (
  <Table className={className}>
    {content.map((listItem, idx) => {
      const { title, description, caption, link, image, alt, id } = listItem
      const isLink = !!link
      return isLink ? (
        <ItemLink key={id || idx} to={link}>
          {image && <Image image={image} alt={alt} />}
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
          {image && <Image image={image} alt={alt} />}
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
