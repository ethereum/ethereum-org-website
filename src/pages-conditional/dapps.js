import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import Card from "../components/Card"
import CalloutBanner from "../components/CalloutBanner"
import ExpandableCard from "../components/ExpandableCard"
import GhostCard from "../components/GhostCard"
import Link from "../components/Link"
import Warning from "../components/Warning"
import Emoji from "../components/Emoji"
import Eth2Articles from "../components/Eth2Articles"
import Eth2Diagram from "../components/Eth2Diagram"
import ButtonLink from "../components/ButtonLink"
import PageMetadata from "../components/PageMetadata"
import {
  CardContainer,
  Content,
  Page,
  Divider,
  Eth2Header,
  Eth2HeaderGradient,
} from "../components/SharedStyledComponents"

const HeroContainer = styled.div`
  padding-left: 2rem;
  padding-top: 8rem;
  padding-bottom: 8rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding-top: 6rem;
    padding-left: 2rem;
    padding-bottom: 4rem;
  }
`

const HeroCard = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  margin-bottom: 0rem;
  border-radius: 2px;
  padding: 0rem 4rem;
  /* background: linear-gradient(
    285.24deg,
    #f7cbc0 0%,
    #fbeae3 17.81%,
    #f4b1ab 29.8%,
    #8476d9 49.78%,
    #85acf9 54.14%,
    #1c1ce1 61.77%,
    #000000 69.77%
  ); */
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    margin-right: -2rem;
    margin-left: -2rem;
    margin-top: -2rem;
    /* background: linear-gradient(
      360deg,
      #f7cbc0 0%,
      #fbeae3 -0.19%,
      #f4b1ab 5.8%,
      #8476d9 16.78%,
      #85acf9 26%,
      #1c1ce1 36.77%,
      #000000 57.77%
    ); */
  }
`

const Hero = styled(Img)`
  flex: 1 1 50%;
  background-size: cover;
  background-repeat: no-repeat;
  margin-top: 3rem;
  margin-right: 3rem;
  @media (min-width: ${(props) => props.theme.breakpoints.m}) {
    align-self: center;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-top: 0;
    margin-left: 0;
  }
`

const Title = styled.h1`
  text-transform: uppercase;
  font-size: 14px;
  color: ${(props) => props.theme.colors.text300};
`

const Subtitle = styled.div`
  font-size: 24px;
  line-height: 140%;
  max-width: 560px;
  color: ${(props) => props.theme.colors.text200};
  margin-top: 1rem;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    font-size: 20px;
  }
`

const Row = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
`

const TwoColumnContent = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-left: 2rem;
  margin-right: 2rem;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0rem;
    margin-right: 0rem;
  }
`

const H2 = styled.h2`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
`

const Column = styled.div`
  flex: 1 1 33%;
  margin-bottom: 1.5rem;
  margin-right: 2rem;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-right: 0rem;
    margin-left: 0rem;
  }
`

const CentreCard = styled(Card)`
  flex: 1 1 30%;
  min-width: 240px;
  margin: 1rem;
  padding: 1.5rem;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 1 1 30%;
  }
`

const StyledButton = styled(ButtonLink)`
  margin-right: 1rem;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-bottom: 1rem;
  }
`

const StyledCardContainer = styled(CardContainer)`
  margin-top: 2rem;
  margin-bottom: 3rem;
`

const StyledCard = styled(Card)`
  flex: 1 1 30%;
  min-width: 240px;
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  margin: 1rem;
  padding: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 1 1 30%;
  }

  &:hover {
    border-radius: 4px;
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    background: ${(props) => props.theme.colors.tableBackgroundHover};
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`

const FullWidthContainer = styled(Page)`
  margin: 0rem 0rem;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.ednBackground};
  padding: 2rem 0rem;
`

const StepBox = styled.div`
  border: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.ednBackground};
  padding: 0rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const H3 = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 0.5rem;
  a {
    display: none;
  }
`

const paths = [
  {
    emoji: ":rocket:",
    title: "More scalable",
    description:
      "Ethereum needs to support 1000s of transactions per second, to make applications faster and cheaper to use.",
  },
  {
    emoji: ":shield:",
    title: "More secure",
    description:
      "Ethereum needs to be more secure. As the adoption of Ethereum grows, the protocol needs to become more secure against all forms of attack.",
  },
  {
    emoji: ":evergreen_tree:",
    title: "More sustainable",
    description:
      "Ethereum needs to be better for the environment. The technology today requires too much computing power and energy.",
  },
]

const upgrades = [
  {
    emoji: ":police_car_light:",
    title: "The Beacon Chain",
    description:
      "The first Eth2 addition to the ecosystem. The Beacon Chain will coordinate the new system, bring staking to Ethereum and lay the groundwork for future upgrades.",
    url: "/en/eth2/beacon-chain/",
    button: "More on the Beacon Chain",
    date: "December 1, 2020",
  },
  {
    emoji: ":chains:",
    title: "Shard chains",
    description:
      "Shard chains will expand Ethereum's capacity to process transactions and store data. The shards themselves will gain more features over time, rolled out in multiple phases.",
    url: "/en/eth2/shard-chains/",
    button: "More on the shard chains",
    date: "Estimate: 2021",
  },
  {
    emoji: ":ship:",
    title: "The docking",
    description:
      "Mainnet Ethereum will need to “dock” or “merge” with the beacon chain at some point. This will enable staking for the entire network and signal the end of energy-intensive mining.",
    url: "/en/eth2/docking/",
    button: "More on the docking",
    date: "Estimate: 2022",
  },
]

const DappsPage = ({ data }) => {
  return (
    <Page>
      <PageMetadata
        title="Decentralized applications (dapps)"
        description="Unstoppable applications that run on Ethereum."
      />
      <Content>
        <HeroCard>
          <HeroContainer>
            <Title>Decentralized applications</Title>
            <Eth2Header>Ethereum-powered tools and services</Eth2Header>
            <Subtitle>
              Dapps are a growing movement of applications that use Ethereum to
              disrupt business models or invent new ones.
            </Subtitle>
            <ButtonRow>
              <StyledButton to="#">Explore dapps</StyledButton>
              <StyledButton isSecondary to="#">
                What are dapps?
              </StyledButton>
            </ButtonRow>
          </HeroContainer>
          <Hero fluid={data.doge.childImageSharp.fluid} />
        </HeroCard>
      </Content>
      <FullWidthContainer>
        <Content>
          <H2>Get started with dapps</H2>
          <p>
            To really try a dapp, you'll need a wallet and some ETH. A wallet
            will you allow you to connect, or log in. And you'll need ETH to pay
            any <Link to="/glossary/#transaction-fee">transaction fees</Link>.
          </p>
          <Row>
            <StepBox>
              <div>
                <H3>Get some ETH</H3>
                <p>Dapp actions cost a transaction fee</p>
              </div>
              <ButtonLink isSecondary to="/eth/">
                Get ETH
              </ButtonLink>
            </StepBox>
            <StepBox>
              <div>
                <H3>Set up a wallet</H3>
                <p>A wallet is your “login” for a dapp</p>
              </div>
              <ButtonLink isSecondary to="/wallets/">
                Find wallet
              </ButtonLink>
            </StepBox>
            <StepBox>
              <div>
                <H3>Ready?</H3>
                <p>Choose a dapp to try out</p>
              </div>
              <ButtonLink to="#">Go</ButtonLink>
            </StepBox>
          </Row>
        </Content>
      </FullWidthContainer>
    </Page>
  )
}

export default DappsPage

export const query = graphql`
  query {
    eth: file(relativePath: { eq: "eth2/eth2_eth.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    rhino: file(relativePath: { eq: "eth2/eth2_rhino.png" }) {
      childImageSharp {
        fluid(maxWidth: 320) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    doge: file(relativePath: { eq: "doge-computer.png" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    ethresearch: file(relativePath: { eq: "eth2/ethresearch.png" }) {
      childImageSharp {
        fixed(width: 300) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
