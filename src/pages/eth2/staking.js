import React, { useState } from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import Breadcrumbs from "../../components/Breadcrumbs"
import ButtonLink from "../../components/ButtonLink"
import Card from "../../components/Card"
import Emoji from "../../components/Emoji"
import GhostCard from "../../components/GhostCard"
import CalloutBanner from "../../components/CalloutBanner"
import Link from "../../components/Link"
import Warning from "../../components/Warning"

import PageMetadata from "../../components/PageMetadata"
import {
  CardContainer,
  Content,
  Page,
  Divider,
  Eth2Header,
  Eth2HeaderGradient,
} from "../../components/SharedStyledComponents"

const HeroCard = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  margin-bottom: 4rem;
  border-radius: 2px;
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
    /* margin-right: -2rem;
    margin-left: -2rem;
    margin-top: -2rem; */
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

const HeroContainer = styled.div`
  padding-left: 0rem;
  padding-right: 2rem;
  padding-top: 0rem;
  padding-bottom: 0rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding-top: 0rem;
    padding-left: 0rem;
    padding-bottom: 0rem;
  }
`

const HeroCopy = styled.div`
  padding-left: 4rem;
  padding-right: 2rem;
  padding-top: 8rem;
  padding-bottom: 8rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: -6rem;
    margin-left: -4rem;
    padding-bottom: 4rem;
    padding-right: 0rem;
  }
`

const StyledCallout = styled(CalloutBanner)`
  margin-left: 0rem;
  margin-right: 0rem;
`

const Hero = styled(Img)`
  flex: 1 1 50%;
  max-width: 500px;
  background-size: cover;
  background-repeat: no-repeat;
  align-self: center;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    display: flex;
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
  color: ${(props) => props.theme.colors.text200};
  max-width: 480px;
  margin-top: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: 20px;
  }
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

const StyledCard = styled(Card)`
  flex: 1 1 30%;
  min-width: 240px;
  margin: 1rem;
  padding: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 1 1 30%;
  }
`

const BoxText = styled.div`
  font-size: 20px;
`

const Box = styled.div`
  padding: 1.5rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  margin: 2rem 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin: 2rem 0;
  }
`

const StyledWarning = styled(Warning)`
  margin: 0rem 0 2rem;
  width: 100%;
`

const Vision = styled.div`
  margin-top: 4rem;
`

const OptionContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column;
  }
`

const Option = styled.div`
  border-radius: 32px;
  border: 1px solid
    ${(props) =>
      props.isActive ? props.theme.colors.primary : props.theme.colors.text};
  color: ${(props) =>
    props.isActive ? props.theme.colors.primary : props.theme.colors.text};
  box-shadow: ${(props) =>
    props.isActive ? props.theme.colors.tableBoxShadow : `none`};
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  margin: 0.5rem;
  cursor: pointer;
`

const OptionText = styled.div`
  font-size: 24px;
  line-height: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: 16px;
    font-weight: 600;
  }
`

const StakeContainer = styled.div`
  margin: 0 auto;
  max-width: ${(props) => props.theme.breakpoints.m};
  display: flex;
  flex-direction: column;
  text-align: center;
`

const paths = [
  {
    emoji: ":money_with_wings:",
    title: "Rewards",
    description:
      "Rewards are given for actions that help the network reach consensus. You'll get rewards for batching transactions into a new block or checking the work of other validators because that's what keeps the chain running securely.",
  },
  {
    emoji: ":warning:",
    title: "Risks",
    description:
      "Although you can earn rewards for doing work that benefits the network, you can lose ETH for malicious actions, going offline, and failing to validate.",
  },
  {
    emoji: ":clipboard:",
    title: "Requirements",
    description:
      "You'll need 32ETH to become a full validator or some ETH to join a staking pool. You'll also need to run an 'Eth1' or mainnet client. The launchpad will walk you through the process and hardware requirements. Alternatively, you can use a backend API.",
    url: "/developers/docs/apis/backend/#available-libraries",
    link: "View backend APIs",
  },
]

const StakingPage = ({ data, location }) => {
  const [isSoloStaking, setIsSoloStaking] = useState(true)

  const pools = [
    {
      image: data.ethhub.childImageSharp.fixed,
      title: "Pool 1",
      link: "https://google.com",
    },
    {
      image: data.ethhub.childImageSharp.fixed,
      title: "Pool 1",
      link: "https://google.com",
    },
  ]
  return (
    <Page>
      <PageMetadata
        title="Ethereum staking"
        description="An overview of Ethereum staking: the risks, rewards, requirements, and where to do it."
      />
      <Content>
        <HeroCard>
          <HeroContainer>
            <HeroCopy>
              <Title>How to stake your ETH</Title>
              <Eth2Header>
                Stake your ETH to become an{" "}
                <Eth2HeaderGradient>Ethereum validator</Eth2HeaderGradient>
              </Eth2Header>
              <Subtitle>
                Staking is a public good for the Ethereum ecosystem. You can
                help secure the network and earn rewards in the process.
              </Subtitle>
            </HeroCopy>
          </HeroContainer>
          <Hero fluid={data.rhino.childImageSharp.fluid} />
        </HeroCard>
        <Vision>
          <Breadcrumbs slug={location.pathname} startDepth={1} />
          <H2>Staking</H2>
          <p>
            Staking is the act of depositing 32ETH to activate validator
            software. As a validator you’ll be responsible for storing data,
            processing transactions, and adding new blocks to the blockchain.
            This will keep Ethereum secure for everyone and earn you new ETH in
            the process. This process, known as proof-of-stake, is being
            introduced by the{" "}
            <Link to="/eth2/beacon-chain/">the Beacon Chain</Link>.
          </p>
          <CardContainer>
            {paths.map((path, idx) => {
              return (
                <StyledCard
                  key={idx}
                  emoji={path.emoji}
                  title={path.title}
                  description={path.description}
                >
                  {path.url && <Link to={path.url}>{path.link}</Link>}
                </StyledCard>
              )
            })}
          </CardContainer>
        </Vision>
      </Content>
      <Divider />
      <Content>
        <StakeContainer>
          <H2>How to stake</H2>
          <p>
            It all depends on how much you are willing to stake. You'll need 32
            to become a full validator, but it is possible to stake less.{" "}
          </p>
          <h3>How much are you willing to stake?</h3>
          <OptionContainer>
            <Option
              isActive={isSoloStaking}
              onClick={() => setIsSoloStaking(true)}
            >
              <Emoji mr={`1rem`} text=":moneybag:" />
              <OptionText>32 ETH</OptionText>
            </Option>
            <Option
              isActive={!isSoloStaking}
              onClick={() => setIsSoloStaking(false)}
            >
              <Emoji mr={`1rem`} text=":swimmer:" />
              <OptionText>Less than 32 ETH</OptionText>
            </Option>
          </OptionContainer>
          {isSoloStaking && (
            <GhostCard>
              <StyledWarning>
                <H2>Withdrawals won't be live right away</H2>
                <div>
                  You won't be able to withdraw your stake until future upgrades
                  are deployed. Withdrawals should be available once mainnet has{" "}
                  <Link to="/eth2/docking/">
                    docked with the Beacon Chain system
                  </Link>
                  .
                </div>
              </StyledWarning>
              <h3>Stake solo and run a validator</h3>
              <p>
                To begin the staking process, you’ll need to use the Eth2
                launchpad. This will walk you through all the setup. Part of
                staking is running an Eth2 client, which is a local copy of the
                blockchain. This can take a while to download onto your
                computer.
              </p>
              <ButtonLink mb={`2rem`} to="https://launchpad.ethereum.org">
                Start staking
              </ButtonLink>
              <h3>Check the deposit address</h3>
              <p>
                If you’ve already followed the setup instructions on the
                launchpad, you’ll know you need to send a transaction to the
                staking deposit contract. We recommend you check the address
                very carefully. You can find the official address on
                ethereum.org and a number of other trusted sites.
              </p>
              <ButtonLink mb={`2rem`} to="/eth2/deposit-contract/">
                Check deposit address
              </ButtonLink>
            </GhostCard>
          )}
          {!isSoloStaking && (
            <GhostCard>
              <h3>Stake in a pool</h3>
              <p>
                If you have less than 32 ETH, you will be able to add a smaller
                stake to staking pools. Some companies can do it all on your
                behalf so you won't have to worry about staying online. Here are
                some companies to check out.
              </p>
              <p>
                <Link to="https://beaconcha.in/stakingServices">
                  See staking services
                </Link>
              </p>
              {/* <CardList content={pools} /> */}
              <StyledWarning>
                <H2>Do your own research</H2>
                <div>
                  Most staking services are waiting for the{" "}
                  <Link to="/eth2/beacon-chain/">Beacon Chain upgrade</Link> to
                  go live before they accept any deposits. Use this time to do
                  some research and figure out which service might be best for
                  you.
                </div>
              </StyledWarning>
            </GhostCard>
          )}
        </StakeContainer>
      </Content>
      <Divider />
      <StyledCallout
        image={data.rhino.childImageSharp.fluid}
        title="Join the staker community"
        description="r/ethstaker is a community for everyone to discuss staking on Ethereum – join for advice, support, and to talk all thing staking."
      >
        <div>
          <ButtonLink to="https://www.reddit.com/r/ethstaker/">
            Join r/ethstaker
          </ButtonLink>
        </div>
      </StyledCallout>
      <Content>
        <Row>
          <Column>
            <H2>Proof-of-stake explained</H2>
            <p>
              Staking is what you need to do to become a validator in a
              proof-of-stake system. This is a consensus mechanism that is going
              to replace the proof-of-work system currently in place. Consensus
              mechanisms are what keep blockchains like Ethereum secure and
              decentralized.{" "}
              <Link to="/developers/docs/consensus-mechanisms/">
                More on consensus mechanisms
              </Link>
            </p>

            <p>Proof-of-stake helps secure the network in a number of ways:</p>
            <h3>Your ETH is at stake</h3>
            <p>
              Because you have to stake your ETH in order to validate
              transactions and create new blocks, you can lose it if you decide
              to try and cheat the system.
            </p>
            <h3>More validators, more security</h3>
            <p>
              In a blockchain like Ethereum it is possible to corrupt it if you
              control <Link to="/glossary/#51-attack">51% of the network</Link>.
              For example you could get 51% of validators to state that your
              balance reads 1,000,000 ETH and not 1 ETH. But, to control 51% of
              validators, you’d need to own 51% of the ETH in the system –
              that’s a lot!
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
                  <li>Proof of stake will arrive with the Beacon Chain.</li>
                  <li>
                    Ethereum will have a proof-of-stake Beacon Chain and a
                    proof-of-work mainnet for the forseeable future.
                  </li>
                  <li>
                    During this time, stakers will be adding new blocks to the
                    Beacon Chain but not processing{" "}
                    <Link to="/glossary/#mainnet">mainnet</Link> transactions.
                  </li>
                  <li>
                    Ethereum will fully transition to a proof-of-stake system
                    once the Ethereum mainnet becomes a shard.
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
            <Link to="/eth2/shard-chains/">More on sharding</Link>
          </StyledCard>
        </CardContainer>
      </Content>
    </Page>
  )
}

export default StakingPage

export const poolImage = graphql`
  fragment poolImage on File {
    childImageSharp {
      fixed(height: 20) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const query = graphql`
  query {
    rhino: file(relativePath: { eq: "eth2/eth2_rhino.png" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    consensys: file(relativePath: { eq: "projects/consensys.png" }) {
      ...poolImage
    }
    ethhub: file(relativePath: { eq: "projects/ethhub.png" }) {
      ...poolImage
    }
    etherscan: file(
      relativePath: { eq: "projects/etherscan-logo-circle.png" }
    ) {
      ...poolImage
    }
  }
`
