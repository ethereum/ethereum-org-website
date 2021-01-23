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

// TODO move into /data/ directory
const dannyArticles = [
  {
    title: "The State of Eth2, Jan 2021",
    description: "20 January 2021",
    link: "https://blog.ethereum.org/2021/01/20/the-state-of-eth2-january-2021/",
  },
  {
    title: "Eth2 quick update no. 21",
    description: "27 November 2020",
    link: "https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/",
  },
  {
    title: "Eth2 quick update no. 20",
    description: "13 November 2020",
    link: "https://blog.ethereum.org/2020/11/13/eth2-quick-update-no-20/",
  },
  {
    title: "Eth2 quick update no. 19",
    description: "4 November 2020",
    link: "https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/",
  },
]

// TODO move into /data/ directory
const benArticles = [
  {
    title: "What's New in Eth2 - 30 December 2020",
    description: "30 December 2020",
    link:
      "https://hackmd.io/@benjaminion/eth2_news/https%3A%2F%2Fhackmd.io%2F%40benjaminion%2Fwnie2_201230",
  },
  {
    title: "What’s New in Eth2 - 12 December 2020",
    description: "12 December 2020",
    link:
      "https://hackmd.io/@benjaminion/eth2_news/https%3A%2F%2Fhackmd.io%2F%40benjaminion%2Fwnie2_201212",
  },
  {
    title: "What's New in Eth2 #57",
    description: "30 November 2020",
    link:
      "https://hackmd.io/@benjaminion/eth2_news/https%3A%2F%2Fhackmd.io%2F%40benjaminion%2Fwnie2_201130",
  },
  {
    title: "What’s New in Eth2 #56",
    description: "13 November 2020",
    link:
      "https://hackmd.io/@benjaminion/eth2_news/https%3A%2F%2Fhackmd.io%2F%40benjaminion%2Fwnie2_201113",
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
