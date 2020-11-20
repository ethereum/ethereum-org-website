import React from "react"
import styled from "styled-components"

import CardList from "./CardList"

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const LeftColumn = styled.div`
  flex: 1 1 45%;
  min-width: 300px;
  margin-right: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-right: 0rem;
  }
`

const RightColumn = styled.div`
  flex: 1 1 45%;
  min-width: 300px;
  margin-left: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-left: 0rem;
  }
`

const dannyArticles = [
  {
    title: "Eth2 quick update no. 19",
    description: "4 November 2020",
    link: "https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/",
  },
  {
    title: "Eth2 quick update no. 18: Spadina Postmortem",
    description: "1 October 2020",
    link: "https://blog.ethereum.org/2020/10/01/eth2-quick-update-no-18/",
  },
  {
    title: "Eth2 quick update no. 17: Announcing Spadina Launchpad",
    description: "22 September 2020",
    link: "https://blog.ethereum.org/2020/09/22/eth2-quick-update-no-17/",
  },
  {
    title: "Eth2 quick update no. 16",
    description: "14 September 2020",
    link: "https://blog.ethereum.org/2020/09/14/eth2-quick-update-no-16/",
  },
]

const benArticles = [
  {
    title: "What’s New in Eth2 #55",
    description: "31 October 2020",
    link:
      "https://hackmd.io/@benjaminion/eth2_news/https%3A%2F%2Fhackmd.io%2F%40benjaminion%2Fwnie2_201031",
  },
  {
    title: "What’s New in Eth2 #54",
    description: "18 October 2020",
    link:
      "https://hackmd.io/@benjaminion/eth2_news/https%3A%2F%2Fhackmd.io%2F%40benjaminion%2Fwnie2_201018",
  },
  {
    title: "What’s New in Eth2 #53",
    description: "02 October 2020",
    link:
      "https://hackmd.io/@benjaminion/eth2_news/https%3A%2F%2Fhackmd.io%2F%40benjaminion%2Fwnie2_201002",
  },
  {
    title: "What’s New in Eth2 #52",
    description: "19 September 2020",
    link:
      "https://hackmd.io/@benjaminion/eth2_news/https%3A%2F%2Fhackmd.io%2F%40benjaminion%2Fwnie2_200919",
  },
]

const Eth2Articles = () => {
  return (
    <Container>
      <LeftColumn>
        <h4>Danny Ryan (Ethereum Foundation)</h4>
        <CardList content={dannyArticles} />
      </LeftColumn>
      <RightColumn>
        <h4>Ben Edgington (PegaSys, ConsenSys)</h4>
        <CardList content={benArticles} />
      </RightColumn>
    </Container>
  )
}

export default Eth2Articles
