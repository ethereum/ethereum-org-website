import React from "react"
import styled from "styled-components"

import Link from "./Link"

const articles = [
  {
    title: "What's new in Eth2",
    description: "Ben Edgington (PegaSys, ConsenSys)",
    link:
      "https://hackmd.io/@benjaminion/eth2_news/https%3A%2F%2Fhackmd.io%2F%40benjaminion%2Fwnie2_200725",
  },
  {
    title: "The state of Eth2",
    description: "Danny Ryan (Ethereum Foundation)",
    link: "https://blog.ethereum.org/2020/06/02/the-state-of-eth2-june-2020/",
  },
  {
    title: "Ethereum 2.0 phases",
    description: "ETHHub",
    link:
      "https://docs.ethhub.io/ethereum-roadmap/ethereum-2.0/eth-2.0-phases/",
  },
  {
    title: "Ethereum.org blog",
    link: "https://blog.ethereum.org/category/research-and-development/",
  },
]

const Table = styled.div`
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  margin-top: 2rem;
`

const Item = styled(Link)`
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

const Content = styled.div`
  display: flex;
  flex-direction: column;
`

const ItemTitle = styled.div``
const ItemDesc = styled.p`
  margin-bottom: 0;
  opacity: 0.6;
`

const RightContainer = styled.div`
  display: flex;
  align-items: right;
  align-content: flex-start;
  flex: 1 1 50%;
  margin-right: 1rem;
  flex-wrap: wrap;
`
const LeftContainer = styled.div`
  display: flex;
  flex: 1 1 50%;
  margin-right: 1rem;
`
// TODO create generalized CardList / TableCard
// TODO prop if ordered list or unordered
const Eth2List = () => {
  return (
    <Table>
      {articles.map((article, idx) => {
        return (
          <Item key={idx} to={article.link}>
            <Content>
              <LeftContainer>
                <ItemTitle>{article.title}</ItemTitle>
              </LeftContainer>
              <RightContainer>
                <ItemDesc>{article.description}</ItemDesc>
              </RightContainer>
            </Content>
          </Item>
        )
      })}
    </Table>
  )
}

export default Eth2List
