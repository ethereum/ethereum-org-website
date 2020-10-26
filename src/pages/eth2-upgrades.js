import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import Card from "../components/Card"
import Callout from "../components/Callout"
import CalloutBanner from "../components/CalloutBanner"
import Link from "../components/Link"
import Warning from "../components/Warning"
import Emoji from "../components/Emoji"

import Button from "../components/Button"
import PageMetadata from "../components/PageMetadata"
import {
  CardContainer,
  Content,
  Page,
  GrayContainer,
} from "../components/SharedStyledComponents"

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
  }
  margin-top: 2rem;
  margin-bottom: 4rem;
  padding-left: 4rem;
  padding-top: 8rem;
  padding-bottom: 8rem;
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
`

const Slogan = styled.p`
  font-style: normal;
  font-weight: normal;
  font-weight: 800;
  font-size: 64px;
  line-height: 100%;
  max-width: 780px;
  margin-bottom: 0rem;
  color: ${(props) => props.theme.colors.white600};
`

const SloganGradient = styled.p`
  font-weight: 800;
  font-size: 64px;
  line-height: 100%;
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

const Hero = styled(Img)``

const Image = styled(Img)`
  max-width: 400px;
  margin-top: 4rem;
`

const ImageContainer = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
`

const Row = styled.div`
  display: flex;
  align-items: flex-start;
`

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`

const StyledCardContainer = styled(CardContainer)`
  margin-top: 2rem;
  margin-bottom: 3rem;
`

const TwoColumnContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
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

const StyledCallout = styled(Callout)`
  min-height: 100%;
  @media (min-width: ${(props) => props.theme.breakpoints.m}) {
    flex: 1 1 416px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin-right: 0;
    margin-left: 0;
  }
`
const StyledButton = styled(Button)`
  margin-right: 1rem;
`

const Definition = styled.div`
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.white700};
  background-color: ${(props) => props.theme.colors.background};
  padding: 1rem;
  margin-right: 2rem;
  width: 100%;
  z-index: 999;
`

const GhostBox = styled.div`
  top: 739px;
  position: absolute;
  width: 46.5%;
  height: 22%;
  left: 40px;
  background-color: ${(props) => props.theme.colors.white600};
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.white700};
  padding: 1rem;
  margin-right: 2rem;
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

const WarningMessage = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledWarning = styled(Warning)`
  margin-top: 0rem;
  margin-left: 2rem;
  width: 100%;
`

const Vision = styled.div`
  margin-top: 4rem;
`

const paths = [
  {
    emoji: ":rocket:",
    title: "More scalable",
    description:
      "Ethereum needs to support 1000s of transactions per second, to make applications faster and cheaper to use.",
  },
  {
    emoji: ":evergreen_tree:",
    title: "More sustainable",
    description:
      "Ethereum needs to be better for the environment. The technology today requires too much computing power and energy.",
  },
  {
    emoji: ":shield:",
    title: "More secure",
    description:
      "Ethereum needs to be easier to run.  Better accessibility will mean more people in the network, so increased decentralization and security.",
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

const Eth2UpgradesPage = ({ data }) => {
  return (
    <Page>
      <PageMetadata
        title="Ethereum Developer Resources"
        description="Documentation, tutorials, and tools for developers building on Ethereum."
      />
      <Content>
        <HeroContainer>
          <Title>The ETH2 Upgrades</Title>
          <Slogan>Upgrading Ethereum to</Slogan>
          <Row>
            <SloganGradient>radical</SloganGradient>
            <Slogan>new heights</Slogan>
          </Row>
          <Subtitle>
            The Ethereum we know and love, just more secure, more sustainable,
            and more scalable...
          </Subtitle>
          <ButtonRow>
            <StyledButton to="#">Explore upgrades</StyledButton>
            <StyledButton isSecondary to="#">
              Wait, what's Ethereum?
            </StyledButton>
          </ButtonRow>
        </HeroContainer>
        <GhostBox />
        <Row>
          <Definition>
            <H2>What is Eth2?</H2>
            Eth2 is the collective term for a set of upgrades planned to make
            Ethereum more scalable, secure, and sustainable. It includes several
            distinct but interconnected upgrades, worked on by lots of different
            teams. As some of the upgrades are a work in progress, some of the
            information on these pages may change.
          </Definition>
          <StyledWarning>
            <WarningMessage>
              <H2>What do you need to do?</H2>
              You do not need to do anything with any ETH you’re already
              holding. Beware of scammers telling you otherwise You may need to
              do something if you’re a dapp developer or run an Ethereum 1.0
              node. <Link to="#">What to do about Eth2</Link>
            </WarningMessage>
          </StyledWarning>
        </Row>
        <Vision>
          <H2>
            The vision
            <Emoji marginLeft={0.5} text=":sparkles:" />
          </H2>
          <p>
            If we want to bring Ethereum into the mainstream and remain
            competitive with other blockchains we have to improve:
            sustainability, security, and scalability.
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
          <CalloutBanner
            image={data.eth.childImageSharp.fluid}
            title="Dive into the vision"
            description="How are we going to make Ethereum more scalable, secure, and sustainable?"
          >
            <div>
              <Button to="/en/developers/tutorials/">The Eth2 vision</Button>
            </div>
          </CalloutBanner>
        </Vision>
        <H2>The Eth2 upgrades</H2>
        <p>
          Eth2 is a series of upgrades that will be built and implemented
          separately from the Ethereum we use today but then merged with it.
          That means the work shouldn’t cause any disruption to the network.
          These upgrades should be viewed as separate things that will happen at
          different times dependent on the success of the upgrade that came
          before.
        </p>
        <CardContainer>
          {upgrades.map((upgrade, idx) => {
            return (
              <StyledCard
                key={idx}
                emoji={upgrade.emoji}
                title={upgrade.title}
                description={upgrade.description}
              >
                <h6>{upgrade.date}</h6>
                <Button to={upgrade.url}>{upgrade.button}</Button>
              </StyledCard>
            )
          })}
        </CardContainer>
      </Content>
    </Page>
  )
}

export default Eth2UpgradesPage

export const query = graphql`
  query {
    eth: file(relativePath: { eq: "eth2/eth2_eth.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    doge: file(relativePath: { eq: "eth2/eth2_doge.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
