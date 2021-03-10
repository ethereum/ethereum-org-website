import React from "react"
import styled from "styled-components"
import CardList from "./CardList"

const Container = styled.div`
  margin-bottom: 4rem;
`

const reads = [
  {
    title: "Ethereum 1.x",
    description: "EthHub",
    link: "https://docs.ethhub.io/ethereum-roadmap/ethereum-1.x/",
  },
  {
    title: "The 1.x Files: The Stateless Ethereum Tech Tree",
    description: "Ethereum Foundation",
    link:
      "https://blog.ethereum.org/2020/01/28/eth1x-files-the-stateless-ethereum-tech-tree/",
  },
]

const Eth2DockingList = () => (
  <Container>
    <CardList content={reads} />
  </Container>
)

export default Eth2DockingList
