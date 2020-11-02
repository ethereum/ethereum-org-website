import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import Card from "../../components/Card"
import ExpandableCard from "../../components/ExpandableCard"
import StakingPaths from "../../components/StakingPaths"
import Link from "../../components/Link"

import PageMetadata from "../../components/PageMetadata"
import {
  CardContainer,
  Content,
  Page,
  GrayContainer,
  Divider,
} from "../../components/SharedStyledComponents"

const HeroContainer = styled.div`
  padding-left: 4rem;
  padding-right: 2rem;
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
  margin-bottom: 4rem;
  border-radius: 2px;
  background: linear-gradient(
    285.24deg,
    #f7cbc0 0%,
    #fbeae3 17.81%,
    #f4b1ab 29.8%,
    #8476d9 49.78%,
    #85acf9 54.14%,
    #1c1ce1 61.77%,
    #000000 69.77%
  );
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    margin-right: -2rem;
    margin-left: -2rem;
    margin-top: -2rem;
    background: linear-gradient(
      360deg,
      #f7cbc0 0%,
      #fbeae3 -0.19%,
      #f4b1ab 5.8%,
      #8476d9 16.78%,
      #85acf9 26%,
      #1c1ce1 36.77%,
      #000000 57.77%
    );
  }
`

const Hero = styled(Img)`
  flex: 1 1 50%;
  max-width: 500px;
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

const SloganGradient = styled.p`
  font-weight: 800;
  font-size: 64px;
  line-height: 120%;
  max-width: 720px;
  margin-right: 1rem;
  background-clip: text;
  background-image: linear-gradient(
    285.24deg,
    #f7cbc0 0%,
    #fbeae3 17.81%,
    #f4b1ab 29.8%,
    #8476d9 49.78%,
    #85acf9 54.14%,
    #d2d2f9 69.77%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    font-size: 48px;
  }
`

const Title = styled.h1`
  text-transform: uppercase;
  font-size: 14px;
  color: ${(props) => props.theme.colors.white600};
`

const Subtitle = styled.div`
  font-size: 24px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.white700};
  max-width: 480px;
  margin-top: 1rem;
`

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
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

const Definition = styled.div`
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background};
  padding: 1rem;
  margin-right: 2rem;
  width: 100%;
  z-index: 999;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-bottom: 1rem;
  }
`

const StyledCard = styled(Card)`
  flex: 1 1 30%;
  min-width: 240px;
  margin: 1rem;
  padding: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 1 1 30%;
  }
`

const BoxText = styled.p`
  font-size: 20px;
`

const Box = styled.div`
  padding: 1.5rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  margin: 2rem 4rem;
`

const WarningMessage = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledDefinition = styled(Definition)`
  margin-top: 0rem;
  margin-left: 2rem;
  margin-right: 0rem;
  width: 100%;
  border: 0px;
  background-color: #ccfcff;
`

const Vision = styled.div`
  margin-top: 4rem;
`
const LeftColumn = styled.div`
  width: 100%;
`

const RightColumn = styled.div`
  width: 100%;
  margin-left: 2rem;
  flex-direction: column;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-left: 0rem;
    flex-direction: column;
  }
`

const Faq = styled.div`
  display: flex;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const paths = [
  {
    emoji: ":money_with_wings:",
    title: "Rewards",
    description: "Placeholder.",
  },
  {
    emoji: ":warning:",
    title: "Risks",
    description:
      "You can’t withdraw your funds or your rewards until shards are live.",
  },
  {
    emoji: ":clipboard:",
    title: "Requirements",
    description:
      "You'll need 32ETH to become a full validator or some ETH to join a staking pool. Your computer will need the following specs:",
  },
]

const StakingPage = ({ data }) => {
  return (
    <Page>
      <PageMetadata
        title="Ethereum staking"
        description="An overview of staking and where to do it"
      />
      <Content>
        <HeroCard>
          <HeroContainer>
            <Title>How to stake your ETH</Title>
            <SloganGradient>Ethereum staking</SloganGradient>
            <Subtitle>
              Staking is a public good for the Ethereum ecosystem. You can help
              secure the network and earn rewards in the process.
            </Subtitle>
          </HeroContainer>
          <Hero fluid={data.robot.childImageSharp.fluid} />
        </HeroCard>
        <Row>
          <Definition>
            <H2>What is staking?</H2>
            Staking is the act of depositing 32ETH to activate validator
            software. As a validator you’ll be responsible for storing data,
            processing transactions, and adding new blocks to the blockchain.
            This will keep Ethereum secure for everyone and earn you new ETH in
            the process. Staking is new to Ethereum and being introduced by the
            launch of <Link to="/en/eth2/beacon-chain/">the beacon chain</Link>.
          </Definition>
          <StyledDefinition>
            <WarningMessage>
              <H2>Ready to stake?</H2>
              <p>Double check the staking address you’ve been given here.</p>
              <Link to="/en/eth2/deposit-contract/">
                Check the deposit contract address
              </Link>
            </WarningMessage>
          </StyledDefinition>
        </Row>
        <Vision>
          <H2>Staking</H2>
          <CardContainer>
            {paths.map((path, idx) => {
              return (
                <StyledCard
                  key={idx}
                  emoji={path.emoji}
                  title={path.title}
                  description={path.description}
                />
              )
            })}
          </CardContainer>
        </Vision>
      </Content>
      <H2>How to stake</H2>
      <p>
        It all depends on how much you are willing to stake. 32 is what you need
        to become a full validator however it is possible to stake less.{" "}
      </p>
      <h3>How much are you willing to stake?</h3>
      <StakingPaths />
      <Divider />
      <Content>
        <Row>
          <Column>
            <H2>Proof-of-stake explained</H2>
            <p>
              Staking is what you need to do to become a validator in a
              proof-of-stake system. This is a consensus mechanism that is going
              to replace the proof-of-work system currently in place. Consensus
              mechanisms are what keep blockchains like Ethereum secure and
              decentralized. More on{" "}
              <Link to="/en/developers/docs/consensus-mechanisms/">
                consensus mechanisms
              </Link>
              .
            </p>
            <p>Proof-of-stake helps secure the network in a number of ways:</p>
            <h3>Your ETH is at stake</h3>
            <p>
              Because you have to stake your ETH in order to validate
              transactions and create new blocks, you can lose it if you decide
              to try and cheat the system.{" "}
            </p>
            <h3>More validators, more security</h3>
            <p>
              In a decentralized network like Ethereum it is possible to corrupt
              it if you control 51% of it. For example you could get 51% of
              validators to state that your balance reads 1,000,000 ETH and not
              1 ETH. But, to control 51% of validators, you’d need to own 51% of
              the ETH in the system – that’s a lot!{" "}
            </p>
            <p>
              Staking makes joining the network as a validator more accessible
              so it’s likely that there’ll be more validators in the network
              than exists today. This will make this kind of attack even harder
              as the cost of an attack will increase.
            </p>
          </Column>
          <Column>
            <Box>
              <H2>Proof-of-stake and Eth2 upgrades</H2>
              <BoxText>
                <ul>
                  <li>Proof of stake will arrive with the beacon chain</li>
                  <li>
                    Ethereum will have a proof-of-stake beacon chain and a
                    proof-of-work mainnet for the forseeable future
                  </li>
                  <li>
                    During this time, stakers will be adding new blocks to the
                    beacon chain but not processing mainnet transactions
                  </li>
                  <li>
                    Ethereum will fully transition to a proof-of-stake system
                    once the Ethereum mainnet becomes a shard
                  </li>
                  <li>Only then can you withdraw your stake</li>
                </ul>
              </BoxText>
            </Box>
          </Column>
        </Row>
        <H2>Benefits of staking to Ethereum</H2>
        <CardContainer>
          <StyledCard
            emoji=":evergreen_tree:"
            title="More sustainable"
            description="Validators don’t need energy-intensive computers in order to participate in a proof-of-stake system – just a laptop or smart phone. This will make Ethereum better for the environment."
          />
          <StyledCard
            emoji=":globe_showing_americas:"
            title="More accessible"
            description="With easier hardware requirements and the opportunity to pool if you don’t have 32ETH, more people will be able to join the network. This will make Ethereum more decentralized and secure by decreasing the attack surface area."
          />
          <StyledCard
            emoji=":old_key:"
            title="Unlocks sharding"
            description="Sharding is only possible with a proof-of-stake system. Sharding a proof-of-work system would dilute the amount of computing power needed to corrupt the network, making it easier for malicious miners to control shards. This isn’t the case with randomly-assigned stakers in proof of stake."
          >
            <Link to="/en/eth2/shard-chains/">More on sharding</Link>
          </StyledCard>
        </CardContainer>
      </Content>
    </Page>
  )
}

export default StakingPage

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
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    robot: file(relativePath: { eq: "eth2/eth2_robot.png" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
