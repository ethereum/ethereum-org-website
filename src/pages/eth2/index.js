import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import Card from "../../components/Card"
import CalloutBanner from "../../components/CalloutBanner"
import ExpandableCard from "../../components/ExpandableCard"
import GhostCard from "../../components/GhostCard"
import Link from "../../components/Link"
import Warning from "../../components/Warning"
import Emoji from "../../components/Emoji"
import Eth2Articles from "../../components/Eth2Articles"
import Eth2Diagram from "../../components/Eth2Diagram"
import ButtonLink from "../../components/ButtonLink"
import PageMetadata from "../../components/PageMetadata"
import {
  CardContainer,
  Content,
  Page,
  Divider,
  Eth2Header,
  Eth2HeaderGradient,
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
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
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

const Disclaimer = styled.div`
  margin: 0rem 12rem;
  display: flex;
  text-align: center;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 0rem 2rem;
  }
`

const StyledWarning = styled(Warning)`
  margin-left: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 2rem 0;
    max-width: 100%;
  }
`

const Vision = styled.div`
  margin-top: 4rem;
`

const ContributeCard = styled.div`
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0rem 3rem;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-left: 0rem;
    margin-right: 0rem;
    flex-direction: column;
    align-items: flex-start;
  }
`

const StyledCallout = styled(CalloutBanner)`
  margin-left: 0rem;
  margin-right: 0rem;
`

const ContributeButton = styled(ButtonLink)`
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
    margin-top: 1.5rem;
  }
`

const Staking = styled.div`
  padding: 4rem;
  background: ${(props) => props.theme.colors.cardGradient};
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 2rem;
  }
`

const StakingColumns = styled.div`
  display: flex;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const CenterH2 = styled(H2)`
  text-align: center;
`

const StakingLeftColumn = styled.div``

const StakingRightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0rem 2rem;
  margin-left: 8rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    align-items: flex-start;
    flex-direction: column-reverse;
    margin: 0rem;
    margin-top: 2rem;
  }
`

const StakingCard = styled(StyledCard)`
  margin: 0;
`

const StakingImage = styled(Img)`
  margin: 3rem 0;
  align-self: center;
  width: 100%;
  max-width: 320px;
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
  margin-top: 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const ResearchContainer = styled.div`
  margin-top: 2rem;
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

const Eth2IndexPage = ({ data }) => {
  return (
    <Page>
      <PageMetadata
        title="The Eth2 upgrades"
        description="An overview of the Ethereum 2.0 upgrades and the vision they hope to make a reality."
      />
      <Content>
        <HeroCard>
          <HeroContainer>
            <Title>The ETH2 Upgrades</Title>
            <Eth2Header>
              Upgrading Ethereum to{" "}
              <Eth2HeaderGradient>radical</Eth2HeaderGradient> new heights
            </Eth2Header>
            <Subtitle>
              The Ethereum we know and love, just more scalable, more secure,
              and more sustainable...
            </Subtitle>
            <ButtonRow>
              <StyledButton to="/eth2/beacon-chain/">
                Explore upgrades
              </StyledButton>
              <StyledButton isSecondary to="/what-is-ethereum/">
                Wait, what's Ethereum?
              </StyledButton>
            </ButtonRow>
          </HeroContainer>
          <Hero fluid={data.doge.childImageSharp.fluid} />
        </HeroCard>

        <Row>
          <GhostCard>
            <H2>What is Eth2?</H2>
            Eth2 refers to a set of interconnected upgrades that will make
            Ethereum more scalable, more secure, and more sustainable. These
            upgrades are being built by multiple teams from across the Ethereum
            ecosystem.
          </GhostCard>
          <StyledWarning>
            <H2>What do you need to do?</H2>
            If you're a dapp user or ETH holder, you don't need to do anything.
            If you're a developer or want to start staking, there are ways you
            can get involved today. <br />
            <Link to="/eth2/get-involved/">Get involved in Eth2</Link>
          </StyledWarning>
        </Row>
        <Vision>
          <H2>
            The vision
            <Emoji ml={`0.5rem`} text=":sparkles:" />
          </H2>
          <p>
            To bring Ethereum into the mainstream and serve all of humanity, we
            have to make Ethereum more scalable, secure, and sustainable.
          </p>
          <CardContainer>
            {paths.map((path, idx) => {
              return (
                <CentreCard
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
      <StyledCallout
        image={data.eth.childImageSharp.fluid}
        title="Dive into the vision"
        description="How are we going to make Ethereum more scalable, secure, and sustainable? All while keeping Ethereum's core ethos of decentralization."
      >
        <div>
          <ButtonLink to="/en/eth2/vision/">The Eth2 vision</ButtonLink>
        </div>
      </StyledCallout>
      <Content>
        <H2>The Eth2 upgrades</H2>
        <p>
          Eth2 is a set of upgrades that improve the scalability, security, and
          sustainability of Ethereum. Although each is being worked on in
          parallel, they have certain dependencies that determine when they will
          be deployed.
        </p>
        <StyledCardContainer>
          {upgrades.map((upgrade, idx) => {
            return (
              <StyledCard
                key={idx}
                emoji={upgrade.emoji}
                title={upgrade.title}
                description={upgrade.description}
              >
                <h6>{upgrade.date}</h6>
                <ButtonLink to={upgrade.url}>{upgrade.button}</ButtonLink>
              </StyledCard>
            )
          })}
        </StyledCardContainer>
        {/* <Eth2Diagram /> */}
        <ContributeCard>
          <div>
            <H2>Want to help with Eth2?</H2>
            There’s plenty of opportunities to weigh in on the Eth2 upgrades,
            help with testing, and even earn rewards in the process.
          </div>
          <ContributeButton isSecondary to="/eth2/get-involved/">
            Get involved
          </ContributeButton>
        </ContributeCard>
        <Disclaimer>
          <em>
            This is not the official roadmap. This is how we view what’s
            happening based on the information out there. But this is
            technology, things can change in an instant. So please don’t read
            this as a commitment.
          </em>
        </Disclaimer>
      </Content>

      <Staking>
        <H2>Staking is here</H2>
        <StakingColumns>
          <StakingLeftColumn>
            <p>
              Key to the Eth2 upgrades is the introduction of staking. If you
              want to use your ETH to help secure the Ethereum network, make
              sure you follow these steps.
            </p>
            <h3>1. Set up with the launchpad</h3>
            <p>
              To stake in Eth2 you’ll need to use the launchpad – this will walk
              you through the process.
            </p>
            <ButtonLink to="https://launchpad.ethereum.org">
              Visit staking launchpad
            </ButtonLink>
            <h3>2. Confirm staking address</h3>
            <p>
              Before you stake your ETH, be sure to check you’ve got the right
              address. You must have gone through the launchpad before doing
              this.
            </p>
            <ButtonLink to="/eth2/deposit-contract/">
              Confirm deposit contract address
            </ButtonLink>
          </StakingLeftColumn>
          <StakingRightColumn>
            <StakingCard
              emoji=":money_with_wings:"
              title="Learn about staking"
              description="The beacon chain will bring staking to Ethereum. This means if you have ETH, you can do a public good by securing the network and earn more ETH in the process."
            >
              <ButtonLink to="/eth2/staking/">More on staking</ButtonLink>
            </StakingCard>
            <StakingImage fluid={data.rhino.childImageSharp.fluid} />
          </StakingRightColumn>
        </StakingColumns>
      </Staking>
      <Divider />
      <Content>
        <CenterH2>Frequently asked questions</CenterH2>
        <Faq>
          <LeftColumn>
            <ExpandableCard
              contentPreview="Eth2 is a set of distinct upgrades with different ship dates."
              title="When will Eth2 ship?"
            >
              <p>
                <Link to="/eth2/beacon-chain/">The Beacon Chain</Link> should go
                live on December 1, 2020.
              </p>
              <p>
                <Link to="/eth2/shard-chains/">Shard chains</Link> will be the
                second upgrade, expected in 2021.
              </p>
              <p>
                <Link to="/eth2/docking/">The docking</Link>, or the merging of{" "}
                <Link to="/glossary/#mainnet">mainnet</Link> into a shard, will
                come later after a successful implementation of shard chains.
              </p>
            </ExpandableCard>
            <ExpandableCard
              contentPreview="It’s not accurate to think of Eth2 as a separate blockchain."
              title="Is Eth2 a separate blockchain?"
            >
              <p>
                Think of Eth2 as a set of upgrades being added to improve the
                Ethereum we use today. These upgrades include the creation of a
                new chain called the beacon chain and up to 64 chains known as
                shards.{" "}
              </p>
              <p>
                These are separate to the{" "}
                <Link to="/glossary/#mainnet">Ethereum mainnet</Link> we use
                today but won’t replace it. Instead mainnet will dock or "merge"
                with this parallel system that’s being added over time.
              </p>
              <p>
                In other words the Ethereum we use today will eventually embody
                all the features that we’re aiming towards in{" "}
                <Link to="/eth2/vision/">the Eth2 vision</Link>.
              </p>
              <p>
                To learn more, check out{" "}
                <Link to="/eth2/beacon-chain/">the Eth2 upgrades</Link>.
              </p>
            </ExpandableCard>
            <ExpandableCard
              contentPreview="You don't have to do anything right now to prepare for Eth2."
              title="How do I prepare for Eth2?"
            >
              <p>
                Eth holders certainly don't need to do anything. Your ETH will
                not need changing or upgrading. There's almost certain to be
                scams telling you otherwise, so be careful.
              </p>
              <p>
                The <Link to="/eth2/shard-chains/">shard chain</Link> and{" "}
                <Link to="/eth2/docking/">docking</Link> upgrades may impact
                dapp developers. But the specifications have not been finalised
                yet, so there's no immediate action required.
              </p>
              <p>
                You can discuss with the Eth2 research and development team over
                at <Link to="https://ethresear.ch">etheresear.ch</Link>.
              </p>
            </ExpandableCard>
            <ExpandableCard
              contentPreview="Eth1 refers to the Ethereum mainnet you transact on today."
              title="What is Eth1?"
            >
              <p>
                Whenever you send a transaction or use a dapp today, you're
                using Eth1. This is the Ethereum that is secured by{" "}
                <Link to="/developers/docs/mining/">miners</Link>.
              </p>
              <p>
                "Eth1", or <Link to="/glossary/#mainnet"> mainnet</Link>, will
                continue to run as normal until{" "}
                <Link to="/eth2/docking/">the docking</Link>. After that,
                validators will secure the network via{" "}
                <Link to="/developers/docs/consensus-mechanisms/pos/">
                  proof-of-stake
                </Link>{" "}
                instead of{" "}
                <Link to="/developers/docs/consensus-mechanisms/pow/mining/">
                  miners
                </Link>
                . Anyone can become a validator by{" "}
                <Link to="/eth2/staking/">staking their ETH</Link>.
              </p>
              <p>
                The beacon chain and shard chain upgrades will not disrupt Eth1
                as they are being built out separately.
              </p>
            </ExpandableCard>
            <ExpandableCard
              contentPreview="You’ll need to use the staking launchpad or join a staking pool."
              title="How do I stake?"
            >
              <p>
                To become a full validator on the network, you'll need to stake
                32 ETH. If you don't have that much, or aren't willing to stake
                that much, you can join staking pools. These pools will let you
                stake less and earn fractions of the total rewards.
              </p>
              <p>
                <Link to="/eth2/staking/">More on staking</Link>
              </p>
            </ExpandableCard>
          </LeftColumn>
          <RightColumn>
            <ExpandableCard
              contentPreview="Your dapp won’t be affected by any imminent upgrades. However future upgrades may require some changes."
              title="What do I need to do with my dapp?"
            >
              <p>
                For now, there's no actions to take. But we recommend you stay
                up to date with developments on the{" "}
                <Link to="/eth2/shard-chains/">shard chain</Link> and{" "}
                <Link to="/eth2/docking/">docking</Link> upgrades.
              </p>
              <ul>
                <li>
                  Danny Ryan of the Ethereum foundation regularly updates the
                  community via the{" "}
                  <Link to="https://blog.ethereum.org">ethereum.org blog</Link>.
                </li>
                <li>
                  Ben Edginton of ConsenSys has a weekly Eth2 newsletter:{" "}
                  <Link to="https://eth2.news">What's new in Eth2?</Link>.
                </li>
              </ul>
              <p>
                You can also join the discussion on Eth2 research and
                development at{" "}
                <Link to="https://ethresear.ch">etheresear.ch</Link>.
              </p>
            </ExpandableCard>
            <ExpandableCard
              contentPreview="Many different teams from all over the community are working on the various Eth2 upgrades."
              title="Who's building Eth2?"
            >
              <p>The Eth2 client teams:</p>
              <p>
                <ul>
                  <li>
                    <Link to="https://trinity.ethereum.org/">Trinity</Link>{" "}
                    (Python implementation)
                  </li>
                  <li>
                    <Link to="https://sigmaprime.io/">Lighthouse</Link> (Rust
                    implementation)
                  </li>
                  <li>
                    <Link to="https://nimbus.team/">Nimbus</Link> (Nim
                    implementation)
                  </li>
                  <li>
                    <Link to="https://prysmaticlabs.com/">Prysm</Link> (Go
                    implementation)
                  </li>
                  <li>
                    <Link to="https://nethermind.io/">Cortex</Link> (.NET
                    implementation)
                  </li>
                  <li>
                    <Link to="https://pegasys.tech/teku-ethereum-2-for-enterprise/">
                      Teku
                    </Link>{" "}
                    (Java implementation)
                  </li>
                  <li>
                    <Link to="https://github.com/chainsafe/lodestar#getting-started">
                      Lodestar
                    </Link>{" "}
                    (JavaScript implementation)
                  </li>
                </ul>
              </p>
            </ExpandableCard>
            <ExpandableCard
              contentPreview="The Ethereum we use today needs to offer a better experience to end users and network participants."
              title="Why is Eth2 needed?"
            >
              <p>
                The Eth2 upgrades will help Ethereum scale in a decentralized
                way, while maintaining security, and increasing sustainability.
              </p>
              <p>
                Perhaps the most obvious problem is that Ethereum needs to be
                able to handle more than 15-45 transactions per second. But the
                Eth2 upgrades also address some other problems with Ethereum
                today.
              </p>
              <p>
                The network is in such high demand that it's making Ethereum
                expensive to use. Nodes in the network are struggling under the
                size of Ethereum and the amount of data their computers are
                having to process. And the underlying algorithm that keeps
                Ethereum secure and decentralized is energy intensive andd needs
                to be greener.
              </p>
              <p>
                A lot of what's changing with{" "}
                <Link to="/eth2/beacon-chain/">the Eth2 upgrades</Link> has
                always been on the Ethereum roadmap, even since 2015. But
                current conditions are making the need for the upgrades even
                greater.
              </p>
              <p>
                For more on why Eth2's needed, check out the{" "}
                <Link to="/eth2/vision/">Eth2 vision</Link>.
              </p>
            </ExpandableCard>
            <ExpandableCard
              contentPreview="You don't have to be technical to contribute. The community is looking for contributions from all kinds of skillsets."
              title="How can I contribute to Eth2?"
            >
              <p>
                The most active role you can play is to{" "}
                <Link to="/eth2/staking/">stake your ETH</Link>.
              </p>
              <p>
                You may also want to run a second client to help improve client
                diversity.{" "}
                <Link to="/eth2/get-involved/">Check out the Eth2 clients</Link>
                .
              </p>
              <p>
                If you're more technical, you can help catch bugs in the new
                clients via the{" "}
                <Link to="/eth2/get-involved/bug-bounty/">
                  Bug bounty program
                </Link>
                .
              </p>
              <p>
                You can also weigh in on the technical discussions with Ethereum
                researchers at{" "}
                <Link to="https://ethresear.ch">ethresear.ch</Link>.
              </p>
            </ExpandableCard>
          </RightColumn>
        </Faq>
      </Content>
      <Divider />
      <Content>
        <H2>Stay up to date</H2>
        <p>
          Get the latest from the researchers and developers working on the Eth2
          upgrades.
        </p>
        <Eth2Articles />
        <ResearchContainer>
          <H2>Take part in the research</H2>
          <p>
            Ethereum researchers and enthusiasts alike meet here to discuss
            research efforts, including everything Eth2.
          </p>
          <ButtonLink to="https://ethresear.ch/">
            Head to ethresear.ch
          </ButtonLink>
        </ResearchContainer>
        {/* <Divider />
            <H2>Not sure what to do about Eth2?</H2>
            <p>
              Check to see if you need to do anything to get ready for Eth2.{" "}
            </p>
            <p>
              <em>HINT: you probably don’t need to do anything.</em>
            </p>
        <ButtonLink to="#">Check</ButtonLink> */}
      </Content>
    </Page>
  )
}

export default Eth2IndexPage

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
    doge: file(relativePath: { eq: "eth2/eth2_doge.png" }) {
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
