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

const dannyArticles = [
  {
    title: "Eth2 quick update no. 14: Testnet edition",
    description: "3 August 2020",
    link: "https://blog.ethereum.org/2020/08/03/eth2-quick-update-no-14/",
  },
  {
    title: "Eth2 quick update no. 13: Testnets, testnets, testnets!",
    description: "23 July 2020",
    link: "https://blog.ethereum.org/2020/07/23/eth2-quick-update-no-13/",
  },
  {
    title: "Eth2 quick update no. 12: Deposit contract news",
    description: "23 June 2020",
    link: "https://blog.ethereum.org/2020/06/23/eth2-quick-update-no-12/",
  },
  {
    title: "The State of Eth2, June 2020",
    description: "2 June 2020",
    link: "https://blog.ethereum.org/2020/06/02/the-state-of-eth2-june-2020/",
  },
]

const benArticles = [
  {
    title: "What’s New in Eth2 #50: Medalla Meltdown redux",
    description: "22 August 2020",
    link:
      "https://hackmd.io/@benjaminion/eth2_news/https%3A%2F%2Fhackmd.io%2F%40benjaminion%2Fwnie2_200822",
  },
  {
    title: "What’s New in Eth2 #49: Medalla meltdown special edition",
    description: "17 August 2020",
    link:
      "https://hackmd.io/@benjaminion/eth2_news/https%3A%2F%2Fhackmd.io%2F%40benjaminion%2Fwnie2_200817",
  },
  {
    title: "What’s New in Eth2 #48: Medalla Testnet",
    description: "08 August 2020",
    link:
      "https://hackmd.io/@benjaminion/eth2_news/https%3A%2F%2Fhackmd.io%2F%40benjaminion%2Fwnie2_200808",
  },
  {
    title: "What’s New in Eth2 #47: Phase 0",
    description: "27 June 2020",
    link:
      "https://hackmd.io/@benjaminion/eth2_news/https%3A%2F%2Fhackmd.io%2F%40benjaminion%2Fwnie2_200725",
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
