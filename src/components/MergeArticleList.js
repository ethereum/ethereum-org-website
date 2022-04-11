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
    title: "Announcing the Kintsugi Merge Testnet",
    description: "Ethereum Foundation",
    link: "https://blog.ethereum.org/2021/12/20/kintsugi-merge-testnet/",
  },
]

const MergeArticleList = () => (
  <Container>
    <CardList content={reads} />
  </Container>
)

export default MergeArticleList
