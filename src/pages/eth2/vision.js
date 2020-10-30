import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import Card from "../../components/Card"
import Callout from "../../components/Callout"
import ExpandableCard from "../../components/ExpandableCard"
import StakingPaths from "../../components/StakingPaths"
import CalloutBanner from "../../components/CalloutBanner"
import Link from "../../components/Link"
import Warning from "../../components/Warning"
import Emoji from "../../components/Emoji"
import Trilemma from "../../components/Trilemma"

import ButtonLink from "../../components/ButtonLink"
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

const Slogan = styled.p`
  font-style: normal;
  font-weight: normal;
  font-weight: 800;
  font-size: 40px;
  line-height: 100%;
  max-width: 780px;
  margin-bottom: 0rem;
  color: ${(props) => props.theme.colors.white600};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    font-size: 48px;
  }
`

const SloganGradient = styled.p`
  font-weight: 800;
  font-size: 40px;
  line-height: 120%;
  max-width: 720px;
  margin-right: 0.75rem;
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

const Image = styled(Img)``

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
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
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

const ThreeColumnContent = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0rem 2rem;
  width: 100%;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
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

const HeroCopyContainer = styled.div`
  flex: 0 1 500px;
  max-width: 500px;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex: 0 1 400px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 100%;
    max-width: 100%;
    max-height: 340px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    max-height: 280px;
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

const StyledButton = styled(ButtonLink)`
  margin-right: 1rem;
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

const GhostBox = styled.div`
  top: 739px;
  position: absolute;
  width: 46.5%;
  height: 22%;
  left: 40px;
  background-color: ${(props) => props.theme.colors.white600};
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 1rem;
  margin-right: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    top: 1043px;
    width: 87%;
    height: 31.5%;
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

const Disclaimer = styled.div`
  margin: 0rem 12rem;
  display: flex;
  text-align: center;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 0rem 2rem;
  }
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
`

const StakingColumns = styled.div`
  display: flex;
  align-items: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const StakingLeftColumn = styled.div``

const StakingRightColumn = styled.div`
  display: flex;
  flex-direction: center;
  margin: 0rem 2rem;
  margin-left: 8rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 0rem;
    margin-top: 2rem;
  }
`

const LeftColumn = styled.div`
  width: 50%;
  margin-left: 2rem;
  margin-top: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 100%;
    margin-left: 0rem;
    margin-top: 2rem;
  }
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

const StakingImage = styled.div`
  display: flex;
  justify-content: center;
`

const TrilemmaContainer = styled.div`
  margin: 4rem;
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
      "Ethereum needs to reduce network congestion and improve speeds to better service a global user base.",
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
    url: "#",
    button: "More on the beacon chain",
    date: "November 2020",
  },
  {
    emoji: ":chains:",
    title: "Shard chains",
    description:
      "Shard chains will spread the load of the network into 64 new blockchains. Shards have the potential to drastically improve transaction speed – up to 100,000 per second.",
    url: "#",
    button: "More on the shard chains",
    date: "Estimate: 2021",
  },
  {
    emoji: ":ship:",
    title: "The docking",
    description:
      "Mainnet Ethereum will need to “dock” with the beacon chain at some point. This will enable staking for the entire network and signal the end of energy-intensive mining.",
    url: "#",
    button: "More on the docking",
    date: "Estimate: 2022",
  },
]

const VisionPage = ({ data }) => {
  return (
    <Page>
      <PageMetadata
        title="Ethereum 2.0 vision"
        description="An overview of staking and where to do it"
      />
      <Content>
        <HeroCard>
          <HeroContainer>
            <Title>Eth2 Vision</Title>
            <Slogan>Make Ethereum powerful enough to</Slogan>
            <Row>
              <SloganGradient> deliver change</SloganGradient>
              <Slogan>on a global scale</Slogan>
            </Row>
            <Subtitle>
              The vision of Eth2 is to make sure we can grow the network while
              retaining everything we know and love about Ethereum today.
            </Subtitle>
          </HeroContainer>
          <Hero fluid={data.eth.childImageSharp.fluid} />
        </HeroCard>
        <H2>Why are Eth2 upgrades needed??</H2>
        <Row>
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
        </Row>
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
        <LeftColumn>
          <H2>The challenge of decentralized scaling</H2>
          <p>
            A naive way to solve Ethereum's problems would be to make it more
            centralized. But decentralization is too important. It’s
            decentralization that gives Ethereum censorship resistance,
            openness, data privacy and near-unbreakable security.
          </p>
          <p>
            Ethereum’s vision is to be more scalable and secure, but also to
            remain decentralized. Achieving these 3 qualities is a problem known
            as the scalability trilemma.
          </p>
          <p>
            The Eth2 upgrades aim to solve the trilemma but there are
            significant challenges.
          </p>
        </LeftColumn>
        <TrilemmaContainer>
          <Trilemma />
        </TrilemmaContainer>
      </Content>
      <Divider />
      <Content>
        <H2>Understanding the Eth2 vision</H2>
        <Row>
          <Column>
            <h3>
              Scalability <Emoji text=":rocket:" />
            </h3>
            <p>
              Ethereum needs to be able to handle more transactions per second.{" "}
            </p>
            <p>
              Currently, the network can handle 15-45 transactions per second,
              dependent on the complexity. Compared to more centralized
              blockchains or traditional finance companies, this is low.
            </p>
            <p>
              Besides the obvious downside of long wait times, this poses a risk
              to Ethereum’s decentralization. Intermediaries may enter the
              network offering greater speeds but with a centralization trade
              off. Not only is this against Ethereum’s philosophy,
              centralization of any kind always poses a risk for a decentralized
              network. Centralization creates larger attack surfaces.
            </p>
            <p>
              One of the Eth2 upgrades is <Link to="#">sharding</Link>. This
              will give Ethereum room to scale by spreading the load of the
              network into 64 new chains. This will give Ethereum room to
              breathe, reducing the congestion and improving speeds.{" "}
            </p>
            <p>
              And even though this adds more chains to the network it actually
              reduces the amount of work for maintainers of the network, the
              “validators”. This reduction makes this work more accessible – you
              can do it on a smart phone. This is great news for making Ethereum
              more decentralized.
            </p>
            <h3>
              Security <Emoji text=":shield:" />
            </h3>
            <p>As Ethereum scales, it needs to become more secure.</p>
            <p>
              With so much value currently locked in Ethereum, any kind of
              scaling needs to be done securely. That’s why sharding is the
              second planned upgrade after the introduction of{" "}
              <Link to="#">the beacon chain</Link>.
            </p>
            <p>
              Sharding is not compatible with Ethereum’s security model today:
              mining. But the beacon chain will introduce{" "}
              <Link to="#">staking</Link>. This allows anyone to stake their ETH
              to become a validator (someone who processes transactions and
              creates new blocks). The beacon chain randomly assigns stakers to
              shards and regularly reassigns them. This ensures it’s
              near-impossible to compromise a shard through collusion with other
              validators. Mining can’t be controlled in the same way.
            </p>
            <p>
              Staking also means you don’t need to invest in elite hardware to
              participate in Ethereum. This should encourage more people to
              become a validator, increasing the network’s decentralization and
              decreasing the attack surface area. With Ethereum there’s strength
              in numbers.
            </p>
          </Column>
          <Column>
            <h3>
              Sustainability <Emoji text=":evergreen_tree:" />
            </h3>
            <p>Ethereum needs to be greener.</p>
            <p>
              WIt's no secret that Ethereum and other blockchains like Bitcoin
              are energy intensive. But the staking that the beacon chain
              introduces is sustainable because ETH will secure the network, not
              computing power.
            </p>
            <p>
              However, this won’t happen overnight with the launch of the beacon
              chain. For a while, the beacon chain and the Ethereum we use today
              will run in parallel. One secured by ETH, the other by computing
              power.
            </p>
            <p>
              This is necessary because the new shards will not be able to
              handle things like our accounts or smart contracts (the logic
              behind Ethereum applications). So we can’t just forget about
              mainnet.{" "}
            </p>
            <p>
              Once the beacon chain and the shard chain upgrades are up and
              running, work will begin on{" "}
              <Link to="#">docking mainnet with the new system</Link>. This will
              involve turning mainnet into a shard so that it’s secured by ETH.{" "}
            </p>
            <p>
              This work is still very much in a research and prototyping phase.{" "}
            </p>
          </Column>
        </Row>
        <Divider />
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
