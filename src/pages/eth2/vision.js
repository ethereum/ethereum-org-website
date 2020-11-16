import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import Card from "../../components/Card"
import Link from "../../components/Link"
import Emoji from "../../components/Emoji"
// import Trilemma from "../../components/Trilemma"

import Breadcrumbs from "../../components/Breadcrumbs"
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
    );*/
  }
`

const Hero = styled(Img)`
  flex: 1 1 50%;
  max-width: 500px;
  background-size: cover;
  background-repeat: no-repeat;
  margin-top: 3rem;
  margin-right: 3rem;
  align-self: center;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-top: 0;
    margin-right: 0;
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

const StyledCardContainer = styled(CardContainer)`
  margin-top: 2rem;
  margin-bottom: 3rem;
`

const TwoColumnContent = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
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

const CenterH2 = styled(H2)`
  text-align: center;
  margin-bottom: 2rem;
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
  border: 0px;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 1 1 30%;
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

const CentralContent = styled.div`
  margin: 0rem 12rem;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 0rem 0rem;
  }
`

const TrilemmaContainer = styled.div`
  margin: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 4rem 0;
  }
`

const StyledBreadcrumbs = styled(Breadcrumbs)`
  justify-content: center;
`

const paths = [
  {
    emoji: ":vertical_traffic_light:",
    title: "Clogged  network",
    description:
      "Ethereum needs to reduce network congestion and improve speeds to better service a global user base.",
  },
  {
    emoji: ":minidisc:",
    title: "Disk space",
    description:
      "Running a node is getting harder as the network grows. This will only get harder with efforts to scale the network.",
  },
  {
    emoji: ":high_voltage_sign:",
    title: "Too much energy",
    description:
      "Ethereum uses too much electricity. The technology that keeps the network secure needs to be more sustainable.",
  },
]

const upgrades = [
  {
    emoji: ":police_car_light:",
    title: "The beacon chain",
    description:
      "The first Eth2 addition to the ecosystem. The beacon chain is a new, separate chain that will introduce staking to Ethereum and lay the groundwork for future upgrades.",
    url: "/eth2/beacon-chain/",
    button: "More on the beacon chain",
    date: "December 1, 2020",
  },
  {
    emoji: ":chains:",
    title: "Shard chains",
    description:
      "Shard chains will spread the load of the network into 64 new blockchains. Shards have the potential to drastically improve transaction speed – up to 100,000 per second.",
    url: "/eth2/shard-chains/",
    button: "More on the shard chains",
    date: "Estimate: 2021",
  },
  {
    emoji: ":ship:",
    title: "The docking",
    description:
      "Mainnet Ethereum will need to “dock” with the beacon chain at some point. This will enable staking for the entire network and signal the end of energy-intensive mining.",
    url: "/eth2/docking/",
    button: "More on the docking",
    date: "Estimate: 2022",
  },
]

const VisionPage = ({ data, location }) => {
  return (
    <Page>
      <PageMetadata
        title="Ethereum 2.0 (Eth2) vision"
        description="An overview of the impact the Eth2 upgrades will have on Ethereum, and the challenges they must overcome."
      />
      <Content>
        <HeroCard>
          <HeroContainer>
            <Title>The Eth2 Vision</Title>
            <Eth2Header>
              <Eth2HeaderGradient>A digital future</Eth2HeaderGradient> on a
              global scale
            </Eth2Header>
            <Subtitle>
              Grow Ethereum until it's powerful enough to help all of humanity.
            </Subtitle>
          </HeroContainer>
          <Hero fluid={data.eth.childImageSharp.fluid} />
        </HeroCard>
        <StyledBreadcrumbs slug={location.pathname} startDepth={1} />
        <CentralContent>
          <CenterH2>The need for Eth2 upgrades</CenterH2>
          <p>
            The Ethereum protocol that launched in 2015 has had incredible
            success. But the Ethereum community always expected that a few key
            upgrades would be necessary to unlock Ethereum's full potential.
          </p>
          <p>
            High demand is driving up transaction fees that make Ethereum
            expensive for the average user. The disk space needed to run an
            Ethereum client is growing at a fast rate. And the underlying Proof
            of Work consensus algorithm that keeps Ethereum secure and
            decentralized has a big environmental impact.
          </p>
          <p>
            What is commonly referred to as Eth2 is a set of upgrades that
            address these problems and more. This set of upgrades was{" "}
            <Link to="https://blog.ethereum.org/2015/03/03/ethereum-launch-process/">
              originally called "Serenity"
            </Link>
            , and have been an active area of research and development{" "}
            <Link to="https://blog.ethereum.org/2014/01/15/slasher-a-punitive-proof-of-stake-algorithm/">
              going back to 2014
            </Link>
            . Now that the technology is ready, these upgrades will rearchitect
            Ethereum to make it more scalable, secure, and sustainable – to make
            life better for existing users and entice new ones. All while
            preserving Ethereum's core value of decentralization.
          </p>
          <p>
            This means there’s no on-switch for Eth2. Improvements will ship
            incrementally over time.
          </p>
        </CentralContent>
      </Content>
      <Divider />
      <Content>
        <CenterH2>Today's problems</CenterH2>
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
        {/* <TrilemmaContainer>
              <Trilemma />
            </TrilemmaContainer> */}
      </Content>
      <Divider />
      <Content>
        <CentralContent>
          <CenterH2>Understanding the Eth2 vision</CenterH2>
          <h3>
            Scalability <Emoji text=":rocket:" />
          </h3>
          <p>
            Ethereum needs to be able to handle more transactions per second
            without increasing the size of the{" "}
            <Link to="/developers/docs/nodes-and-clients/#what-are-nodes-and-clients">
              nodes
            </Link>{" "}
            in the network. Increasing node size isn't practical because only
            those with powerful and expensive computers could do it. To scale,
            Ethereum needs more transactions per second, coupled with more
            nodes. More nodes means more security.{" "}
          </p>
          <p>
            The <Link to="/eth2/shard-chains/">shard chain upgrade</Link> will
            spread the load of the network into 64 new chains. This will give
            Ethereum room to breathe by reducing congestion and improving speeds
            beyond the current 15-45 transactions per second limit.{" "}
          </p>
          <p>
            And even though there will be more chains, this will actually
            require less work from validators - the maintainers of the network".
            Validators will only need to "run" their shard and not the entire
            Ethereum chain. This makes nodes more lightweight, allowing Ethereum
            to scale and remain decentralized.
          </p>
          <h3>
            Security <Emoji text=":shield:" />
          </h3>
          <p>
            The Eth2 upgrades improve Ethereum's security against coordinated
            attacks, like a <Link to="/glossary/#51-attack">"51% attack"</Link>.
            This is a type of attack where if someone controls the majority of
            the network they can force through fraudulent changes.
          </p>
          <p>
            The transition to{" "}
            <Link to="/developers/docs/consensus-mechanisms/pos/">
              proof-of-stake
            </Link>{" "}
            means that the Ethereum protocol has greater disincentives against
            attack. This is because in proof-of-stake, the validators who secure
            the network must stake significant amounts of ETH into the protocol.
            If they try and attack the network, the protocol can automatically
            destroy their ETH.
          </p>
          <p>
            This isn't possible in{" "}
            <Link to="/developers/docs/consensus-mechanisms/pow/">
              proof-of-work
            </Link>
            , where the best a protocol can do is force entities who secure the
            network (
            <Link to="/developers/docs/consensus-mechanisms/pow/mining/">
              miners
            </Link>
            ) to lose mining rewards they would have otherwise earned. To
            achieve the equivalent effect in proof-of-work, the protocol would
            have to be able to destroy all of a miner's equipment if they try
            and cheat.
          </p>
          <p>
            Ethereum's security model also needs to change because of the
            introduction of <Link to="/eth2/shard-chains/">shard chains</Link>.
            The <Link to="/eth2/beacon-chain/">Beacon Chain</Link> lets us
            randomly assign validators to different shards - this makes it
            virtually impossible for validators to ever collude by attacking a
            specific shard. Sharding isn't as secure on a proof-of-work
            blockchain, because miners can't be controlled by the protocol in
            this way.
          </p>
          <p>
            Staking also means you don’t need to invest in elite hardware to
            "run" an{" "}
            <Link to="/developers/docs/nodes-and-clients/">Ethereum node</Link>.
            This should encourage more people to become a validator, increasing
            the network’s decentralization and decreasing the attack surface
            area.
          </p>
          <p>
            You can become a validator by{" "}
            <Link to="/eth2/staking/">staking your ETH</Link>.
          </p>
          <h3>
            Sustainability <Emoji text=":evergreen_tree:" />
          </h3>
          <p>Ethereum needs to be greener.</p>
          <p>
            It's no secret that Ethereum and other blockchains like Bitcoin are
            energy intensive because of{" "}
            <Link to="/developers/docs/consensus-mechanisms/pow/mining/">
              mining
            </Link>
            . But Ethereum is moving towards being secured by ETH, not computing
            power – via <Link to="/eth2/staking/">staking</Link> and{" "}
            <Link to="/developers/docs/consensus-mechanisms/pos/">
              proof-of-stake
            </Link>
            .
          </p>
          <p>
            Although staking will be introduced by{" "}
            <Link to="/eth2/beacon-chain/">the beacon chain</Link>, the Ethereum
            we use today will run in parallel for a period of time, before it
            "merges" or{" "}
            <Link to="/eth2/docking/">"docks" with the Eth2 upgrades"</Link>.
            One system secured by ETH, the other by computing power. This is
            because, at first, <Link to="/eth2/shard-chains/">shards</Link>{" "}
            won't be able to handle things like our accounts or{" "}
            <Link to="/dapps">dapps</Link>. So we can’t just forget about the{" "}
            <Link to="/developers/docs/consensus-mechanisms/pow/">
              proof-of-work
            </Link>{" "}
            secured <Link to="/glossary/#mainnet">mainnet</Link>.{" "}
          </p>
          <p>
            Once the beacon chain and the shard chain upgrades are up and
            running, work will begin on{" "}
            <Link to="/eth2/docking/">docking mainnet with the new system</Link>
            . This will turn mainnet into a shard so that it’s secured by ETH
            and far less energy intensive.{" "}
          </p>
        </CentralContent>
      </Content>
      <Divider />
      <Content>
        <H2>Explore the upgrades</H2>
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
      </Content>
    </Page>
  )
}

export default VisionPage

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
  }
`
