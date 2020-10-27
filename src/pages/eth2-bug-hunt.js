import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import Card from "../components/Card"
import Leaderboard from "../components/Leaderboard"
import Callout from "../components/Callout"
import ExpandableCard from "../components/ExpandableCard"
import CalloutBanner from "../components/CalloutBanner"
import Link from "../components/Link"
import Warning from "../components/Warning"
import Emoji from "../components/Emoji"
import Eth2Articles from "../components/Eth2Articles"

import Button from "../components/Button"
import PageMetadata from "../components/PageMetadata"
import {
  CardContainer,
  Content,
  Page,
  GrayContainer,
  Divider,
} from "../components/SharedStyledComponents"

const HeroContainer = styled.div`
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 8rem;
  padding-bottom: 8rem;
  width: 50%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding-top: 6rem;
    padding-left: 2rem;
    padding-bottom: 4rem;
  }
`

const LeaderboardContainer = styled.div`
  padding-left: 0rem;
  padding-right: 2rem;
  padding-top: 4rem;
  padding-bottom: 8rem;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const HeroCard = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
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
  font-size: 64px;
  line-height: 100%;
  max-width: 780px;
  margin-bottom: 0rem;
  color: ${(props) => props.theme.colors.white600};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    font-size: 48px;
  }
`

const SloganGradient = styled.h1`
  font-weight: 800;
  font-size: 48px;
  line-height: 140%;
  max-width: 720px;
  margin-top: 1rem;
  background-clip: text;
  background-image: linear-gradient(
    285.24deg,
    #f7cbc0 0%,
    #fbeae3 17.81%,
    #f4b1ab 29.8%,
    #8476d9 49.78%,
    #85acf9 54.14%,
    #1c1ce1 61.77%,
    #000000 69.77%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    font-size: 48px;
  }
`

const Title = styled.p`
  text-transform: uppercase;
  font-size: 14px;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 0rem;
  margin-left: 0.5rem;
`

const Subtitle = styled.div`
  font-size: 24px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
  max-width: 480px;
  margin-top: 1rem;
`

const Image = styled(Img)``

const Row = styled.div`
  display: flex;
  align-items: center;
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

const StyledButton = styled(Button)`
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
  margin-top: 0rem;
  margin-left: 2rem;
  width: 100%;
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

const ContributeButton = styled(Button)`
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

const On = styled.div`
  width: 8px;
  height: 8px;
  background: ${(props) => props.theme.colors.success400};
  border-radius: 64px;
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

const StakingImage = styled.div`
  display: flex;
  justify-content: center;
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

const Eth2BugHuntPage = ({ data }) => {
  const bugHunters = [
    {
      title: "Name",
      description: "Points",
      link: "https://github.com",
      image: data.example.childImageSharp.fixed,
      emoji: ":trophy:",
    },
    {
      title: "Name",
      description: "Points",
      link: "https://github.com",
      image: data.example.childImageSharp.fixed,
    },
    {
      title: "Name",
      description: "Points",
      link: "https://github.com",
      image: data.example.childImageSharp.fixed,
    },
    {
      title: "Name",
      description: "Points",
      link: "https://github.com",
      image: data.example.childImageSharp.fixed,
    },
    {
      title: "Name",
      description: "Points",
      link: "https://github.com",
      image: data.example.childImageSharp.fixed,
    },
  ]
  return (
    <Page>
      <PageMetadata
        title="The Eth2 upgrades"
        description="An overview of the Ethereum 2.0 upgrades and the vision they hope to make a reality."
      />
      <Content>
        <HeroCard>
          <HeroContainer>
            <Row>
              <On />
              <Title>Open for submissions</Title>
            </Row>
            <SloganGradient>Eth2 bug bounties</SloganGradient>
            <Subtitle>
              Earn up to $50,000 USD and a place on our leaderboard by finding
              Eth2 protocols and clients bugs.
            </Subtitle>
            <ButtonRow>
              <StyledButton to="#">Submit a bug</StyledButton>
              <StyledButton isSecondary to="#">
                What we're looking for
              </StyledButton>
            </ButtonRow>
          </HeroContainer>
          <LeaderboardContainer>
            <Leaderboard content={bugHunters} />
            <Button isSecondary to="#">
              See full leaderboard
            </Button>
          </LeaderboardContainer>
        </HeroCard>
      </Content>
    </Page>
  )
}

export default Eth2BugHuntPage

export const Avatar = graphql`
  fragment Avatar on File {
    childImageSharp {
      fixed(width: 40) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const query = graphql`
  query {
    example: file(relativePath: { eq: "eth2/avatar_example.png" }) {
      ...Avatar
    }
  }
`
