import React from "react"
import styled from "styled-components"
import CardList from "./CardList"

const Container = styled.div`
  margin-bottom: 4rem;
`

const reads = [
  {
    title: "Ethmerge",
    description: "Ethmerge",
    link: "https://ethmerge.com/",
  },
  {
    title:
      "The State of The Merge: An Update on Ethereum’s Merge to Proof of Stake in 2022",
    description: "Consensys",
    link: "https://consensys.net/blog/news/the-state-of-the-merge-an-update-on-ethereums-merge-to-proof-of-stake-in-2022/",
  },
  {
    title: "Announcing the Ropsten Merge Testnet",
    description: "Ethereum Foundation",
    link: "https://blog.ethereum.org/2022/05/30/ropsten-merge-announcement/",
  },
  {
    title: "Execution layer specs",
    description: "Ethereum Foundation",
    link: "https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/merge.md",
  },
  {
    title: "Consensus layer specs",
    description: "Ethereum Foundation",
    link: "https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix",
  },
  {
    title: "Engine API specs",
    description: "Ethereum Foundation",
    link: "https://github.com/ethereum/execution-apis/tree/main/src/engine",
  },
]

const MergeArticleList = () => (
  <Container>
    <CardList content={reads} />
  </Container>
)

export default MergeArticleList
