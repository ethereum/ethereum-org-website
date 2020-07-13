import React from "react"
import styled from "styled-components"

import Link from "./Link"

const Table = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
`

const Item = styled(Link)`
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
  margin-bottom: 0;
  opacity: 0.6;
`

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  margin-right: 2rem;
`
const RightContainer = styled.div`
  display: flex;
  align-items: center;
  width: 25%;
  margin-right: 1rem;
  flex-wrap: wrap;
`

const CardList = ({ content }) => {
  return (
    <Table>
      {content.map((listItem, idx) => {
        const { title, description, caption, link } = listItem
        return (
          <Item key={idx} to={link}>
            <LeftContainer>
              <ItemTitle>{title}</ItemTitle>
              <ItemDesc>{description}</ItemDesc>
            </LeftContainer>
            <RightContainer>
              <ItemDesc>{caption}</ItemDesc>
            </RightContainer>
          </Item>
        )
      })}
    </Table>
  )
}

export default CardList
