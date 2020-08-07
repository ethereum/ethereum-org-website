import React from "react"
import styled from "styled-components"

import Link from "./Link"

const leftarticles = [
  {
    title: "Eth2 quick update no. 14",
    description: "3 August 2020",
    link: "https://blog.ethereum.org/2020/08/03/eth2-quick-update-no-14/",
  },
  {
    title: "Eth2 quick update no. 13",
    description: "23 July 2020",
    link: "https://blog.ethereum.org/2020/07/23/eth2-quick-update-no-13/",
  },
  {
    title: "Eth2 quick update no. 12",
    description: "23 June 2020",
    link: "https://blog.ethereum.org/2020/06/23/eth2-quick-update-no-12/",
  },
  {
    title: "The State of Eth2, June 2020",
    description: "2 June 2020",
    link: "https://blog.ethereum.org/2020/06/02/the-state-of-eth2-june-2020/",
  },
]

const rightarticles = [
  {
    title: "What’s New in Eth2",
    description: "25 July 2020",
    link:
      "https://hackmd.io/@benjaminion/eth2_news/https%3A%2F%2Fhackmd.io%2F%40benjaminion%2Fwnie2_200725",
  },
  {
    title: "What’s New in Eth2",
    description: "10 July 2020",
    link:
      "https://hackmd.io/@benjaminion/eth2_news/https%3A%2F%2Fhackmd.io%2F%40benjaminion%2Fwnie2_200710",
  },
  {
    title: "What’s New in Eth2",
    description: "27 June 2020",
    link:
      "https://hackmd.io/@benjaminion/eth2_news/https%3A%2F%2Fhackmd.io%2F%40benjaminion%2Fwnie2_200627",
  },
  {
    title: "What’s New in Eth2",
    description: "12 June 2020",
    link:
      "https://hackmd.io/@benjaminion/eth2_news/https%3A%2F%2Fhackmd.io%2F%40benjaminion%2Fwnie2_200612",
  },
]

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-right: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-right: 0rem;
    width: 100%;
  }
`

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-left: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-left: 0rem;
    width: 100%;
  }
`

const LeftTable = styled.div`
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  margin: 2rem 0rem;
  width: 100%;
`

const RightTable = styled.div`
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  margin: 2rem 0rem;
  width: 100%;
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

const TitleContainer = styled.div``

const Title = styled.p`
  margin: 1rem 0rem;
  font-size: 20px;
  padding-bottom: 1rem;
  color: ${(props) => props.theme.colors.text300};
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

const TwoColumn = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

// TODO create generalized CardList / TableCard
// TODO prop if ordered list or unordered
const Eth2List = () => {
  return (
    <TwoColumn>
      <LeftColumn>
        <h4>Danny Ryan (Ethereum Foundation)</h4>
        <LeftTable>
          {leftarticles.map((leftarticle, idx) => {
            return (
              <Item key={idx} to={leftarticle.link}>
                <Content>
                  <LeftContainer>
                    <ItemTitle>{leftarticle.title}</ItemTitle>
                  </LeftContainer>
                  <RightContainer>
                    <ItemDesc>{leftarticle.description}</ItemDesc>
                  </RightContainer>
                </Content>
              </Item>
            )
          })}
        </LeftTable>
      </LeftColumn>
      <RightColumn>
        <h4>Ben Edginton (PegaSys, ConsenSys)</h4>
        <RightTable>
          {rightarticles.map((rightarticle, idx) => {
            return (
              <Item key={idx} to={rightarticle.link}>
                <Content>
                  <LeftContainer>
                    <ItemTitle>{rightarticle.title}</ItemTitle>
                  </LeftContainer>
                  <RightContainer>
                    <ItemDesc>{rightarticle.description}</ItemDesc>
                  </RightContainer>
                </Content>
              </Item>
            )
          })}
        </RightTable>
      </RightColumn>
    </TwoColumn>
  )
}

export default Eth2List
