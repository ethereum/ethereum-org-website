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
    title: "Finalized no. 27",
    description: "26 July 2021",
    link: "https://blog.ethereum.org/2021/07/26/finalized-no-27/",
  },
  {
    title: "Finalized no. 26",
    description: "25 May 2021",
    link: "https://blog.ethereum.org/2021/05/25/finalized-no-26/",
  },
  {
    title: "Finalized no. 25",
    description: "2 April 2021",
    link: "https://blog.ethereum.org/2021/04/02/finalized-no-25/",
  },
  {
    title: "Finalized no. 24",
    description: "24 March 2021",
    link: "https://blog.ethereum.org/2021/03/24/finalized-no-24/",
  },
]

// TODO move into /data/ directory
const benArticles = [
  {
    title: "What’s New in Eth2 – #75",
    description: "13 August 2021",
    link:
      "https://hackmd.io/@benjaminion/eth2_news/https%3A%2F%2Fhackmd.io%2F%40benjaminion%2Fwnie2_210813",
  },
  {
    title: "What's New in Eth2 - #74",
    description: "30 July 2021",
    link:
      "https://hackmd.io/@benjaminion/eth2_news/https%3A%2F%2Fhackmd.io%2F%40benjaminion%2Fwnie2_210730",
  },
  {
    title: "What’s New in Eth2 - #73",
    description: "16 July 2021",
    link:
      "https://hackmd.io/@benjaminion/eth2_news/https%3A%2F%2Fhackmd.io%2F%40benjaminion%2Fwnie2_210716",
  },
  {
    title: "What's New in Eth2 – #72",
    description: "2 July 2021",
    link:
      "https://hackmd.io/@benjaminion/eth2_news/https%3A%2F%2Fhackmd.io%2F%40benjaminion%2Fwnie2_210702",
  },
]

const Eth2Articles = () => (
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

export default Eth2Articles
