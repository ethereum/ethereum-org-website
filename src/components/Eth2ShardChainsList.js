import React from "react"
import styled from "styled-components"
import CardList from "./CardList"

const Container = styled.div`
  margin-bottom: 4rem;
`

const Eth2ShardChainsList = () => {
  const reads = [
    {
      title: "Why sharding is great: demystifying the technical properties",
      description: "Vitalik Buterin",
      link: "https://vitalik.ca/general/2021/04/07/sharding.html",
    },
    {
      title: "A rollup-centric roadmap",
      description: "Vitalik Buterin",
      link:
        "https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698",
    },
    {
      title: "The Beacon Chain Ethereum 2.0 explainer you need to read first",
      description: "Ethos.dev",
      link: "https://ethos.dev/beacon-chain/",
    },
    {
      title: "Sharding consensus",
      description: "Ethereum Foundation",
      link: "https://blog.ethereum.org/2020/03/27/sharding-consensus/",
    },
  ]

  return (
    <Container>
      <CardList content={reads} />
    </Container>
  )
}

export default Eth2ShardChainsList
