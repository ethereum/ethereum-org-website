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
  {
    title: "The State of Eth2, June 2020",
    description: "2 June 2020",
    link: "https://blog.ethereum.org/2020/06/02/the-state-of-eth2-june-2020/",
  },
]

const benArticles = [
  {
    title: "What’s New in Eth2 #52",
    description: "19 September 2020",
    link:
      "https://hackmd.io/@benjaminion/eth2_news/https%3A%2F%2Fhackmd.io%2F%40benjaminion%2Fwnie2_200919",
  },
  {
    title: "What’s New in Eth2 #51",
    description: "5 September 2020",
    link:
      "https://hackmd.io/@benjaminion/eth2_news/https%3A%2F%2Fhackmd.io%2F%40benjaminion%2Fwnie2_200905",
  },
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
