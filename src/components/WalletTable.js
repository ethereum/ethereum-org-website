import React from "react"
import styled from "styled-components"
import { Twemoji } from "react-emoji-render"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import Link from "./Link"

const Table = styled.div`
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  background: ${(props) => props.theme.colors.white600};
  border: 1px solid ${(props) => props.theme.colors.white800};
  overflow-x: scroll;
  width: 100%;
  display: block;
`

const Item = styled(Link)`
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.text} !important;
  box-shadow: 0 1px 1px ${(props) => props.theme.colors.tableItemBoxShadow};
  margin-bottom: 1px;
  padding: 1rem;
  width: 100%;
  color: #000;

  &:hover {
    border-radius: 4px;
    box-shadow: 0 0 1px ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.tableBackgroundHover};
  }
`

const TableHeader = styled.tr`
  font-size: 14px;
  text-transform: uppercase;
  background: ${(props) => props.theme.colors.white600};
  padding-left: 1rem;
`

const TableRow = styled.tr`
  font-size: 14px;
  background: white;
`

const Feature = styled.th`
  margin: 1rem;
  width: 600px;
`

const Flag = styled(Twemoji)`
  margin-right: 0.5rem;
`

const Emoji = styled(Twemoji)`
  margin-right: 0.5rem;
`

const WalletTable = ({ data }) => {
  const wallets = [
    {
      image: data.argent.childImageSharp.fixed,
      title: "Argent",
      type: "Mobile",
      fees: ":white_check_mark:",
      dapps: ":white_check_mark:",
      buy: ":white_check_mark:",
      defi: ":white_check_mark:",
      withdraw: ":x:",
      limits: ":white_check_mark:",
      volume: ":x:",
      swaps: ":white_check_mark:",
      multisig: ":x:",
    },
    {
      image: "",
      title: "Argent",
      type: "Mobile",
      fees: ":white_check_mark:",
      dapps: ":white_check_mark:",
      buy: ":white_check_mark:",
      defi: ":white_check_mark:",
      withdraw: ":x:",
      limits: ":white_check_mark:",
      volume: ":x:",
      swaps: ":white_check_mark:",
      multisig: ":x:",
    },
    {
      image: "",
      title: "Argent",
      type: "Mobile",
      fees: ":white_check_mark:",
      dapps: ":white_check_mark:",
      buy: ":white_check_mark:",
      defi: ":white_check_mark:",
      withdraw: ":x:",
      limits: ":white_check_mark:",
      volume: ":x:",
      swaps: ":white_check_mark:",
      multisig: ":x:",
    },
    {
      image: "",
      title: "Argent",
      type: "Mobile",
      fees: ":white_check_mark:",
      dapps: ":white_check_mark:",
      buy: ":white_check_mark:",
      defi: ":white_check_mark:",
      withdraw: ":x:",
      limits: ":white_check_mark:",
      volume: ":x:",
      swaps: ":white_check_mark:",
      multisig: ":x:",
    },
    {
      image: "",
      title: "Argent",
      type: "Mobile",
      fees: ":white_check_mark:",
      dapps: ":white_check_mark:",
      buy: ":white_check_mark:",
      defi: ":white_check_mark:",
      withdraw: ":x:",
      limits: ":white_check_mark:",
      volume: ":x:",
      swaps: ":white_check_mark:",
      multisig: ":x:",
    },
    {
      image: "",
      title: "Argent",
      type: "Mobile",
      fees: ":white_check_mark:",
      dapps: ":white_check_mark:",
      buy: ":white_check_mark:",
      defi: ":white_check_mark:",
      withdraw: ":x:",
      limits: ":white_check_mark:",
      volume: ":x:",
      swaps: ":white_check_mark:",
      multisig: ":x:",
    },
    {
      image: "",
      title: "Argent",
      type: "Mobile",
      fees: ":white_check_mark:",
      dapps: ":white_check_mark:",
      buy: ":white_check_mark:",
      defi: ":white_check_mark:",
      withdraw: ":x:",
      limits: ":white_check_mark:",
      volume: ":x:",
      swaps: ":white_check_mark:",
      multisig: ":x:",
    },
    {
      image: "",
      title: "Argent",
      type: "Mobile",
      fees: ":white_check_mark:",
      dapps: ":white_check_mark:",
      buy: ":white_check_mark:",
      defi: ":white_check_mark:",
      withdraw: ":x:",
      limits: ":white_check_mark:",
      volume: ":x:",
      swaps: ":white_check_mark:",
      multisig: ":x:",
    },
    {
      image: "",
      title: "Argent",
      type: "Mobile",
      fees: ":white_check_mark:",
      dapps: ":white_check_mark:",
      buy: ":white_check_mark:",
      defi: ":white_check_mark:",
      withdraw: ":x:",
      limits: ":white_check_mark:",
      volume: ":x:",
      swaps: ":white_check_mark:",
      multisig: ":x:",
    },
  ]
  return (
    <Table>
      <TableHeader>
        <Feature />
        <Feature>Name</Feature>
        <Feature>Type</Feature>
        <Feature>No fees</Feature>
        <Feature>Dapps</Feature>
        <Feature>Buy with card</Feature>
        <Feature>Financial tools</Feature>
        <Feature>Withdraw to card</Feature>
        <Feature>Limits protection</Feature>
        <Feature>High-volume</Feature>
        <Feature>Token swaps</Feature>
        <Feature>Multi-signature</Feature>
      </TableHeader>
      {wallets.map((wallet, idx) => {
        return (
          <TableRow key={idx}>
            <td>
              <Img fixed={wallet.image} />
            </td>
            <td>{wallet.title}</td>
            <td>{wallet.type}</td>
            <td>
              <Emoji svg text={wallet.fees} />
            </td>
            <td>
              <Emoji svg text={wallet.dapps} />
            </td>
            <td>
              <Emoji svg text={wallet.buy} />
            </td>
            <td>
              <Emoji svg text={wallet.defi} />
            </td>
            <td>
              <Emoji svg text={wallet.withdraw} />
            </td>
            <td>
              <Emoji svg text={wallet.limits} />
            </td>
            <td>
              <Emoji svg text={wallet.volume} />
            </td>
            <td>
              <Emoji svg text={wallet.swaps} />
            </td>
            <td>
              <Emoji svg text={wallet.multisig} />
            </td>
          </TableRow>
        )
      })}
    </Table>
  )
}

export default WalletTable

export const query = graphql`
  query {
    argent: file(relativePath: { eq: "home/cats.png" }) {
      childImageSharp {
        fixed(width: 80) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
