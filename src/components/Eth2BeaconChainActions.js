import React from "react"
import styled from "styled-components"
import CardList from "./CardList"
import { CardContainer } from "./SharedStyledComponents"
import Card from "./Card"
import ButtonLink from "./ButtonLink"

const Container = styled.div`
  margin-bottom: 4rem;
`

const Row = styled.div`
  display: flex;
  align-items: flex-start;
`

const StyledCardContainer = styled.div`
  display: flex;
  padding-top: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const StyledCardLeft = styled(Card)`
  margin-left: 0rem;
  margin-right: 1rem;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-right: 0rem;
    margin-bottom: 2rem;
  }
`

const StyledCardRight = styled(Card)`
  margin-left: 0rem;
  margin-left: 1rem;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-left: 0rem;
  }
`

const H3 = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 2rem;
  a {
    display: none;
  }
`

const StyledButtonLink = styled(ButtonLink)`
  margin-bottom: 0.75rem;
`

const Eth2BeaconChainActions = ({ data }) => {
  const datapoints = [
    {
      title: "beaconscan",
      /* image: data.beaconscan.childImageSharp.fixed, */
      link: "https://beaconscan.com",
      description: "Eth2 Beacon Chain explorer – Etherscan for Eth2",
    },
    {
      title: "beaconcha.in",
      /* image: data.beaconchain.childImageSharp.fixed, */
      link: "https://beaconcha.in",
      description: "Open source Eth2 Beacon Chain explorer",
    },
  ]

  const reads = [
    {
      title: "Two Point Oh: The Beacon Chain",
      description: "Status",
      link: "https://our.status.im/two-point-oh-the-beacon-chain/",
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
      <StyledCardContainer>
        <StyledCardLeft
          emoji=":money_with_wings:"
          title="Become a staker"
          description="Staking is live! If you want to stake your ETH to help secure the network, make sure you’re aware of the risks."
        >
          <StyledButtonLink to="https://launchpad.ethereum.org">
            Get started
          </StyledButtonLink>
          <ButtonLink isSecondary to="/eth2/staking/">
            Learn about staking
          </ButtonLink>
        </StyledCardLeft>
        <StyledCardRight
          emoji=":computer:"
          title="Run a beacon client"
          description="Ethereum needs as many clients running as possible. Help with this Ethereum public good!"
        >
          <ButtonLink isSecondary to="/eth2/get-involved/">
            Run a beacon client
          </ButtonLink>
        </StyledCardRight>
      </StyledCardContainer>
      <H3>Explore the data</H3>
      <CardList content={datapoints} />
      <H3>Read more</H3>
      <CardList content={reads} />
    </Container>
  )
}

export default Eth2BeaconChainActions

// TODO update these to component static queries
export const DataLogo = graphql`
  fragment DataLogo on File {
    childImageSharp {
      fixed(width: 24) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const query = graphql`
  query {
    beaconscan: file(relativePath: { eq: "eth2/etherscan.png" }) {
      ...DataLogo
    }
    beaconchain: file(relativePath: { eq: "eth2/beaconchainemoji.png" }) {
      ...DataLogo
    }
  }
`
