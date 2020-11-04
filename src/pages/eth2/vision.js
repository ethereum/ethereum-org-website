import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import Card from "../../components/Card"
import Link from "../../components/Link"
import Emoji from "../../components/Emoji"
import Trilemma from "../../components/Trilemma"

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
  color: ${(props) => props.theme.colors.white600};
`

const Subtitle = styled.div`
  font-size: 24px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.white700};
  max-width: 480px;
  margin-top: 1rem;
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
    date: "November 2020",
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
        title="Ethereum 2.0 vision"
        description="An overview of staking and where to do it"
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
        <Breadcrumbs slug={location.pathname} startDepth={1} />
        <H2>The need for Eth2 upgrades</H2>
        <TwoColumnContent>
          <Column>
            <p>
              Ethereum, like any technology, needs constant improvement to
              better meet the needs of its users. The Ethereum we use today has
              unlocked tremendous possibilities and hinted at what’s possible.
              But there’s room for improvement.
            </p>
            <p>
              High demand is driving up transaction fees that make Ethereum
              expensive for the average user. The disk space needed to run an
              Ethereum client is growing at a fast rate. And the underlying
              Proof of Work consensus algorithm that keeps Ethereum secure and
              decentralized has a big environmental impact.
            </p>
          </Column>
          <Column>
            <p>
              What is commonly referred to as Eth2 is a set of upgrades that
              address these problems and more. These upgrades will rearchitect
              Ethereum to make it more scalable, secure, and sustainable – to
              make life better for existing users and entice new ones. All while
              preserving Ethereum's core value of decentralization
            </p>
            <p>
              This means there’s no on-switch for Eth2. Improvements will ship
              incrementally over time.
            </p>
          </Column>
        </TwoColumnContent>
        <H2>Today's problems</H2>
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
        <TrilemmaContainer>
          <Trilemma />
        </TrilemmaContainer>
      </Content>
      <Divider />
      <H2>Understanding the Eth2 vision</H2>
      <Content>
        <CentralContent>
          <h3>
            Scalability <Emoji text=":rocket:" />
          </h3>
          <p>
            Ethereum needs to be able to handle more transactions per second
            without increasing the size of the{" "}
            <Link to="/en/developers/docs/nodes-and-clients/#what-are-nodes-and-clients">
              nodes
            </Link>{" "}
            in the network. Increasing node size isn't practical because only
            those with super computers could do it. To scale, Ethereum needs
            more transactions per second, coupled with more nodes. More nodes
            means more security.{" "}
          </p>
          <p>
            The <Link to="/en/eth2/shard-chains/">shard chain upgrade</Link>
            will spread the load of the network into 64 new chains. This will
            give Ethereum room to breathe by reducing congestion and improving
            speeds beyond the current 15-45 transactions per second limit.{" "}
          </p>
          <p>
            And even though there will be more chains it's actually less work
            for maintainers of the network, the “validators”. Validators will
            only need to "run" their shard and not the entire Ethereum chain.
            This makes nodes more lightweight, allowing Ethereum to scale and
            remain decentralized.
          </p>
          <h3>
            Security <Emoji text=":shield:" />
          </h3>
          <p>
            With the <Link to="/en/eth2/shard-chains/">shard chain</Link>{" "}
            upgrade improving scalability, Ethereum's security needs updating
            too.
          </p>
          <p>
            Sharding is not compatible with Ethereum’s security model today:{" "}
            <Link to="/en/developers/docs/mining/">mining</Link>. But the{" "}
            <Link to="/en/eth2/beacon-chain/">beacon chain upgrade</Link> will
            introduce validators to the Ethereum ecosystem. And unlike miners,
            validators can keep a sharded Ethereum secure. Coordinated by the
            beacon chain, validators will be randomly assigned to shards and
            regularly reassigned. This makes collusion with other validators
            near-impossible, keeping shards safe. Mining can’t be controlled in
            the same way.
          </p>
          <p>
            Staking also means you don’t need to invest in elite hardware to
            "run" an Ethereum node. This should encourage more people to become
            a validator, increasing the network’s decentralization and
            decreasing the attack surface area.
          </p>
          <p>
            You can become a validator by{" "}
            <Link to="/en/eth2/staking/">staking your ETH</Link>.
          </p>
          <h3>
            Sustainability <Emoji text=":evergreen_tree:" />
          </h3>
          <p>Ethereum needs to be greener.</p>
          <p>
            It's no secret that Ethereum and other blockchains like Bitcoin are
            energy intensive. But Ethereum is moving towards being secured by
            ETH, not computing power – via{" "}
            <Link to="/en/eth2/staking/">staking</Link>.
          </p>
          <p>
            Although staking will be introduced by{" "}
            <Link to="/en/eth2/beacon-chain/">the beacon chain</Link>, the
            Ethereum we use today will run in parallel. One secured by ETH, the
            other by computing power. This is because{" "}
            <Link to="/en/eth2/shard-chains/">shards</Link> won't be able to
            handle things like our accounts or smart contracts (the logic behind
            Ethereum applications). So we can’t just forget about mainnet.{" "}
          </p>
          <p>
            Once the beacon chain and the shard chain upgrades are up and
            running, work will begin on{" "}
            <Link to="/en/eth2/docking/">
              docking mainnet with the new system
            </Link>
            . This will turn mainnet into a shard so that it’s secured by ETH
            and far less energy-intensive.{" "}
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
