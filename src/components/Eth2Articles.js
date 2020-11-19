import React from "react"
import styled from "styled-components"

import Translation from "../components/Translation"
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
    title: <Translation id="page-eth2articles-danny-ryan-title-1" />,
    description: <Translation id="page-eth2articles-danny-ryan-date-1" />,
    link: "https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/",
  },
  {
    title: <Translation id="page-eth2articles-danny-ryan-title-2" />,
    description: <Translation id="page-eth2articles-danny-ryan-date-2" />,
    link: "https://blog.ethereum.org/2020/10/01/eth2-quick-update-no-18/",
  },
  {
    title: <Translation id="page-eth2articles-danny-ryan-title-3" />,
    description: <Translation id="page-eth2articles-danny-ryan-date-3" />,
    link: "https://blog.ethereum.org/2020/09/22/eth2-quick-update-no-17/",
  },
  {
    title: <Translation id="page-eth2articles-danny-ryan-title-4" />,
    description: <Translation id="page-eth2articles-danny-ryan-date-4" />,
    link: "https://blog.ethereum.org/2020/09/14/eth2-quick-update-no-16/",
  },
]

const benArticles = [
  {
    title: <Translation id="page-eth2articles-ben-edginton-title-1" />,
    description: <Translation id="page-eth2articles-ben-edgington-date-1" />,
    link:
      "https://hackmd.io/@benjaminion/eth2_news/https%3A%2F%2Fhackmd.io%2F%40benjaminion%2Fwnie2_201031",
  },
  {
    title: <Translation id="page-eth2articles-ben-edginton-title-2" />,
    description: <Translation id="page-eth2articles-ben-edgington-date-2" />,
    link:
      "https://hackmd.io/@benjaminion/eth2_news/https%3A%2F%2Fhackmd.io%2F%40benjaminion%2Fwnie2_201018",
  },
  {
    title: <Translation id="page-eth2articles-ben-edginton-title-3" />,
    description: <Translation id="page-eth2articles-ben-edgington-date-3" />,
    link:
      "https://hackmd.io/@benjaminion/eth2_news/https%3A%2F%2Fhackmd.io%2F%40benjaminion%2Fwnie2_201002",
  },
  {
    title: <Translation id="page-eth2articles-ben-edginton-title-4" />,
    description: <Translation id="page-eth2articles-ben-edginton-date-4" />,
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
