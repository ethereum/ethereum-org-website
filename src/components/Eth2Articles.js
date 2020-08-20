import React from "react"
import styled from "styled-components"

import CardList from "./CardList"

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Column = styled.div`
  flex: 1 1 45%;
  min-width: 300px;
  margin-right: 2rem;
`

const benArticles = [
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

const dannyArticles = [
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

const Eth2Articles = () => {
  return (
    <Container>
      <Column>
        <h4>Danny Ryan (Ethereum Foundation)</h4>
        <CardList content={dannyArticles} />
      </Column>
      <Column>
        <h4>Ben Edginton (PegaSys, ConsenSys)</h4>
        <CardList content={benArticles} />
      </Column>
    </Container>
  )
}

export default Eth2Articles
