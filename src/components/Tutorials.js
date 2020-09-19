import React from "react"
import styled from "styled-components"
import { Twemoji } from "react-emoji-render"

import CardList from "./CardList"

const Table = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  width: 100%;
  margin-bottom: 0rem;
`

const StyledCardList = styled(CardList)`
  margin-bottom: -2rem;
`

const Item = styled.div`
  text-decoration: none;
  display: flex;
  font-family: "SFMono-Regular", monospace;
  text-transform: uppercase;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text} !important;
  box-shadow: 0 1px 1px ${(props) => props.theme.colors.tableItemBoxShadow};
  background: ${(props) => props.theme.colors.cardGradient};
  margin-bottom: 1px;
  margin-top: 0rem;
  padding: 1rem;
  width: 100%;
`
const Emoji = styled(Twemoji)`
  margin-right: 1rem;
`

const smartContractTutorials = [
  {
    title: "Write a 'hello world' smart contract",
    description: "ethereum.org",
    link: "/en/developers/tutorials/hello-world-contract/",
  },
  {
    title: "Logging data from smart contracts with events",
    description: "jdourlens, EthereumDev",
    link: "/en/developers/tutorials/logging-events-smart-contracts/",
  },
]

const nodesTutorials = [
  {
    title: "How to run a light node with Geth",
    description: "Brian Gu ",
    link: "en/developers/tutorials/run-light-node-geth/",
  },
  {
    title: "How to turn your Raspberry Pi into a node",
    description: "EthereumOnArm",
    link: "/en/developers/tutorials/run-node-raspberry-pi/",
  },
]

const securityTutorials = [
  {
    title: "Smart contract security guidelines",
    description: "Trailofbits",
    link: "/en/developers/tutorials/security-guidelines/",
  },
  {
    title: "Secure development workflow",
    description: "Trailofbits",
    link: "/en/developers/tutorials/secure-development-workflow/7",
  },
  {
    title: "Token security checklist",
    description: "Trailofbits",
    link: "/en/developers/tutorials/token-security/",
  },
  {
    title: "Overview of contract testing tools",
    description: "Trailofbits",
    link: "/en/developers/tutorials/testing-products/",
    caption: "Advanced",
  },
  {
    title: "Overview of contract testing tools: Slither",
    description: "Trailofbits",
    link: "/en/developers/tutorials/testing-products/slither/",
    caption: "Advanced",
  },
  {
    title: "Overview of contract testing tools: Manticore",
    description: "Trailofbits",
    link: "/en/developers/tutorials/testing-products/manticore/",
    caption: "Advanced",
  },
  {
    title: "Overview of contract testing tools:  Echidna",
    description: "Trailofbits",
    link: "/en/developers/tutorials/testing-products/echidna/",
    caption: "Advanced",
  },
]

const Tutorials = () => {
  return (
    <div>
      <Table>
        <Item>
          <Emoji svg text=":page_with_curl:" /> Smart contracts
        </Item>
        <StyledCardList content={smartContractTutorials} />
      </Table>
      <Table>
        <Item>
          <Emoji svg text=":computer:" /> Nodes and clients
        </Item>
        <StyledCardList content={nodesTutorials} />
      </Table>
      <Table>
        <Item>
          <Emoji svg text=":shield:" /> Security
        </Item>
        <StyledCardList content={securityTutorials} />
      </Table>
    </div>
  )
}

export default Tutorials
