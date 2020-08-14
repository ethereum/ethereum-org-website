import React from "react"
import styled from "styled-components"
import { Twemoji } from "react-emoji-render"
import Img from "gatsby-image"
import { graphql } from "gatsby"

const Table = styled.div`
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  background: ${(props) => props.theme.colors.white600};
  border: 1px solid ${(props) => props.theme.colors.white800};
  overflow-x: scroll;
  width: 100%;
  display: block;
  border-radius: 4px;
  margin: 4rem 0rem;
`

const TableHeader = styled.tr`
  font-size: 14px;
  text-transform: uppercase;
  background: ${(props) => props.theme.colors.white600};
  padding-left: 1rem;
`

const Image = styled(Img)``

const Cell = styled.p`
  width: auto;
  margin-bottom: 0rem;
  color: ${(props) => props.theme.colors.text300};
  width: max-content;
  padding: 0rem 1rem;
`
const Data = styled.td`
  background: ${(props) => props.theme.colors.white};
  width: auto;
  padding: 1rem 2rem;
`

const TableRow = styled.tr`
  font-size: 14px;
  background: white;
  border: 1px solid #e0e0e0;
`

const Feature = styled.th`
  margin: 1rem;
  width: auto;
  font-weight: 500;
`

const Emoji = styled(Twemoji)`
  margin-right: 0.5rem;
`

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const WalletTable = ({ data }) => {
  const wallets = [
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
    <TableContainer>
      <Table>
        <TableHeader>
          <Feature>
            <Cell />
          </Feature>
          <Feature>
            <Cell>Name</Cell>
          </Feature>
          <Feature>
            <Cell>Type</Cell>
          </Feature>
          <Feature>
            <Cell>No fees</Cell>
          </Feature>
          <Feature>
            <Cell>Dapps</Cell>
          </Feature>
          <Feature>
            <Cell>Buy with card</Cell>
          </Feature>
          <Feature>
            <Cell>Financial tools</Cell>
          </Feature>
          <Feature>
            <Cell>Withdraw to card</Cell>
          </Feature>
          <Feature>
            <Cell>Limits protection</Cell>
          </Feature>
          <Feature>
            <Cell>High-volume</Cell>
          </Feature>
          <Feature>
            <Cell>Token swaps</Cell>
          </Feature>
          <Feature>
            <Cell>Multi-signature</Cell>
          </Feature>
        </TableHeader>
        {wallets.map((wallet, idx) => {
          return (
            <TableRow key={idx}>
              <Data>{wallet.image}</Data>
              <Data>{wallet.title}</Data>
              <Data>{wallet.type}</Data>
              <Data>
                <Emoji svg text={wallet.fees} />
              </Data>
              <Data>
                <Emoji svg text={wallet.dapps} />
              </Data>
              <Data>
                <Emoji svg text={wallet.buy} />
              </Data>
              <Data>
                <Emoji svg text={wallet.defi} />
              </Data>
              <Data>
                <Emoji svg text={wallet.withdraw} />
              </Data>
              <Data>
                <Emoji svg text={wallet.limits} />
              </Data>
              <Data>
                <Emoji svg text={wallet.volume} />
              </Data>
              <Data>
                <Emoji svg text={wallet.swaps} />
              </Data>
              <Data>
                <Emoji svg text={wallet.multisig} />
              </Data>
            </TableRow>
          )
        })}
      </Table>

      {wallets.map((wallet, idx) => {
        return (
          <Table key={idx}>
            <TableHeader>
              <Feature>
                <Cell />
              </Feature>
              <Feature>
                <Data>{wallet.title}</Data>
              </Feature>
            </TableHeader>
            <TableRow>
              <Data>Transaction fees</Data>
              <Data>
                <Emoji svg text={wallet.fees} />
              </Data>
            </TableRow>
            <TableRow>
              <Data>Dapps</Data>
              <Data>
                <Emoji svg text={wallet.dapps} />
              </Data>
            </TableRow>
            <TableRow>
              <Data>Buy with card</Data>
              <Data>
                <Emoji svg text={wallet.buy} />
              </Data>
            </TableRow>
            <TableRow>
              <Data>Financial tools</Data>
              <Data>
                <Emoji svg text={wallet.defi} />
              </Data>
            </TableRow>
            <TableRow>
              <Data>Withdraw to card</Data>
              <Data>
                <Emoji svg text={wallet.withdraw} />
              </Data>
            </TableRow>
            <TableRow>
              <Data>Transaction limits</Data>
              <Data>
                <Emoji svg text={wallet.limits} />
              </Data>
            </TableRow>
            <TableRow>
              <Data>High volume</Data>
              <Data>
                <Emoji svg text={wallet.volume} />
              </Data>
            </TableRow>
            <TableRow>
              <Data>Token swaps</Data>
              <Data>
                <Emoji svg text={wallet.swaps} />
              </Data>
            </TableRow>
            <TableRow>
              <Data>Multi-signature</Data>
              <Data>
                <Emoji svg text={wallet.multisig} />
              </Data>
            </TableRow>
          </Table>
        )
      })}
    </TableContainer>
  )
}

export default WalletTable

export const query = graphql`
  query {
    argent: file(relativePath: { eq: "home/argent.png" }) {
      childImageSharp {
        fluid(maxWidth: 80) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
