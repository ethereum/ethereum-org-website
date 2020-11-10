import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import Card from "../components/Card"
import Callout from "../components/Callout"
import Link from "../components/Link"
import Emoji from "../components/Emoji"
import ButtonLink from "../components/ButtonLink"
import PageMetadata from "../components/PageMetadata"
import MeetupList from "../components/MeetupList"
import {
  CardContainer,
  Content,
  Page,
} from "../components/SharedStyledComponents"

const HeroContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
`

const HeroCopyContainer = styled.div`
  position: absolute;
  flex: 1;
  max-width: 1504px;
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

const HeroCopy = styled.div`
  opacity: 0.9;
  position: relative;
  z-index: 3;
  background: ${(props) => props.theme.colors.background};
  padding: 2rem;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.border};
  margin: 2rem;
  @media (max-width: 1240px) {
    margin-top: -2rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: -4rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-top: 2rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin: 0;
  }
`

const H1 = styled.h1`
  font-style: normal;
  font-weight: normal;
  // font-family: "SFMono-Regular", monospace;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 32px;
  line-height: 110%;
  // background: ${(props) => props.theme.colors.ednBackground};
  padding: 0.5rem;
`
/**
 * Reddit (ethereum, ethfinance, ethdev, ethtrader, ethstaker)
 * Discord
 *
 * Ethereum Magicians
 */
const Subtitle = styled.div`
  font-size: 20px;
  line-height: 140%;
  text-align: center;
  color: ${(props) => props.theme.colors.text300};
`

const SubtitleWithMargin = styled(Subtitle)`
  margin-bottom: 1.5rem;
`

const MonoSubtitle = styled.h2`
  margin-top: 2rem;
`

const PageIntro = styled.p`
  color: ${(props) => props.theme.colors.text200};
`

const Hero = styled(Img)`
  position: absolute;
  top: 0;
  left: 0;
  flex: 1 1;
  max-width: 1504px;
  background-size: cover;
  background-repeat: no-repeat;
  align-self: center;
  // margin-top: 3rem;
  // margin-left: 2rem;
  // @media (min-width: ${(props) => props.theme.breakpoints.m}) {
  //   align-self: center;
  // }
  // @media (max-width: ${(props) => props.theme.breakpoints.m}) {
  //   margin-top: 0;
  //   margin-left: 0;
  // }
`

const Image = styled(Img)`
  max-width: 400px;
  margin-top: 4rem;
`

const ImageContainer = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
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

const Column = styled.div`
  flex: 1 1 33%;
  margin-bottom: 1.5rem;
  margin-right: 2rem;
  width: 100%;
`
const RightColumn = styled(Column)`
  margin-right: 0;
`
const IntroColumn = styled(Column)`
  margin-top: 8rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 0;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin-right: 0;
  }
`

const StyledCard = styled(Card)`
  background: ${(props) => props.theme.colors.cardGradient};

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
    background: ${(props) =>
      props.theme.colors.cardGradient2}; //tableBackgroundHover
    transition: transform 0.1s;
    transform: scale(1.02);
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

const daos = [
  {
    title: `LexDAO`,
    to: `https://lexdao.org`,
    twitterHandle: `@lex_DAO`,
    twitterTo: `https://twitter.com/lex_DAO`,
    description: `Legal engineering`,
  },
  {
    title: `Machi X`,
    to: `https://machix.com`,
    twitterHandle: `@MachiXOfficial`,
    twitterTo: `https://twitter.com/MachiXOfficial`,
    description: `Art community`,
  },
  {
    title: `MarketingDAO`,
    to: `https://marketingdao.org/`,
    twitterHandle: `@MarketingDAO`,
    twitterTo: `https://twitter.com/MarketingDAO`,
    description: `Community focused on marketing Ethereum`,
  },
  {
    title: `MetaCartel`,
    to: `https://metacartel.org`,
    twitterHandle: `@Meta_Cartel`,
    twitterTo: `https://twitter.com/Meta_Cartel`,
    description: `DAO incubator`,
  },
  {
    title: `MetaCartel Ventures`,
    to: `https://metacartel.xyz`,
    twitterHandle: `@VENTURE_DAO`,
    twitterTo: `https://twitter.com/VENTURE_DAO`,
    description: `Venture for pre-seed crypto projects`,
  },
  {
    title: `MetaClan`,
    to: `https://discord.gg/euUeZVp`,
    twitterHandle: `@MetaClanDAO`,
    twitterTo: `https://twitter.com/MetaClanDAO`,
    description: `esports`,
  },
  {
    title: `MetaGame`,
    to: `https://metagame.wtf`,
    twitterHandle: `@MetaFam`,
    twitterTo: `https://twitter.com/MetaFam`,
    description: `MMORPG Game Mechanics for Real Life`,
  },
  {
    title: `MetaFactory`,
    to: `https://metafactory.ai`,
    twitterHandle: `@TheMetaFactory`,
    twitterTo: `https://twitter.com/TheMetaFactory`,
    description: `Digiphysical Apparel Brands`,
  },
  {
    title: `MolochDAO`,
    to: `https://molochdao.com`,
    twitterHandle: `@MolochDAO`,
    twitterTo: `https://twitter.com/MolochDAO`,
    description: `Community focused on funding Ethereum development`,
  },
  {
    title: `ΜΓΔ`,
    to: `https://daohaus.club/dao/v1/0x1b3d7efb93ec432b0d1d56880c23303979b379e9) (Meta Gamma Delta`,
    twitterHandle: `@metagammadelta`,
    twitterTo: `https://twitter.com/metagammadelta`,
    description: `Women-led projects`,
  },
  {
    title: `Raid Guild`,
    to: `https://raidguild.org`,
    twitterHandle: `@RaidGuild`,
    twitterTo: `https://twitter.com/RaidGuild`,
    description: `Web3 devs`,
  },
  {
    title: `DAOSquare`,
    to: `https://www.daosquare.io`,
    twitterHandle: `@DAOSquare`,
    twitterTo: `https://twitter.com/DAOSquare`,
    description: `Promote the DAO concept in non-tech field and help people create value through DAO.`,
  },
]

const forums = [
  {
    title: `e/ethereum`,
    to: `https://www.reddit.com/r/ethereum/`,
    description: `All things Ethereum`,
  },
  {
    title: "r/ethfinance",
    to: "https://www.reddit.com/r/ethfinance/",
    description: "The financial side of Ethereum, including DeFi",
  },
  {
    title: "r/ethdev",
    to: "https://www.reddit.com/r/ethdev/",
    description: "Focused on Ethereum development",
  },
  {
    title: "r/ethtrader",
    to: "https://www.reddit.com/r/ethtrader/",
    description: "Trends & market analysis",
  },
  {
    title: "r/ethstaker",
    to: "https://www.reddit.com/r/ethstaker/",
    description: "Welcome to all interested in staking on Ethereum",
  },
  {
    title: "Fellowship of Ethereum Magicians",
    to: "https://ethereum-magicians.org",
    description: "Community oriented around technical standards in Ethereum",
  },
  {
    title: "Ethereum Stackexchange",
    to: "https://ethereum.stackexchange.com",
    description: "Discussion and help for Ethereum developers",
  },
  {
    title: "Ethereum Research",
    to: "https://ethresear.ch",
    description:
      "The most influential messageboard for cryptoeconomic research",
  },
  {
    title: "Ethereum Gitter",
    to: "https://gitter.im/ethereum/home",
    description: "Chat room for the Ethereum github repo",
  },
  {
    title: "Ethereum Cat Herders",
    to: "https://gitter.im/ethereum-cat-herders/community?source=orgpage",
    description:
      "Community oriented around offering project management support to Ethereum development",
  },
  {
    title: "Ethereum Hackers",
    to: "https://ethglobal.co/discord",
    description:
      "Discord chat run by ETHGlobal: an online community for Ethereum hackers all over the world",
  },
  {
    title: "CryptoDevs Discord",
    to: "https://discord.gg/5W5tVb3",
    description: "Ethereum development focused Discord community",
  },
]

const events = [
  // (Reminder: Month is zero indexed)
  {
    title: `This is old, should not display`,
    to: `https://www.ethereum.com/`,
    sponsor: `Ethereum Foundation`,
    description: `test event that happened in the past and should not be rendered`,
    startDate: new Date(2020, 9, 2),
    endDate: new Date(2020, 9, 22),
  },
  {
    title: `Hacking Decentralized Commerce`,
    to: `https://gitcoin.co/hackathon/conflux-hack/`,
    sponsor: `Gitcoin`,
    description: `Virtual Hackathon`,
    startDate: new Date(2020, 10, 2),
    endDate: new Date(2020, 10, 22),
  },
  {
    title: `Dutch Blockchain Week`,
    to: `https://dutchblockchainweek.com/`,
    sponsor: `Dutch Blockchain Week 2020`,
    description: `Virtual Conference`,
    startDate: new Date(2020, 11, 2),
    endDate: new Date(2020, 11, 8),
  },
  {
    title: `Dutch Blockchain Awards`,
    to: `https://awards.computable.nl/dutch-blockchain-awards`,
    sponsor: `Dutch Blockchain Awards 2020`,
    description: `Nominate a person, project or organization`,
    startDate: new Date(2020, 11, 4),
    endDate: new Date(2020, 11, 4),
  },
]

const paths = [
  {
    emoji: ":world_map:",
    title: "Online Communities",
    description:
      "Hundreds of thousands of Ethereum enthusiasts gather in these online forums to share news, talk about recent developments, debate technical issues, and imagine the future.",
    url: "#online-communities",
    button: "Say Hello!",
  },
  {
    emoji: ":woman-raising-hand:",
    title: "How can I get involved?",
    description:
      "Want to contribute to Ethereum more directly? Check out how to get involved below for a list of ways that you can contribute based on your skills and professional background.",
    url: "#how-can-i-get-involved",
    button: "Get Involved!",
  },
  {
    emoji: ":bank:",
    title: "Decentralized Autonomous Organizations",
    description:
      "These groups leverage Ethereum technology to facilitate organization and collaboration. For instance, for controlling membership, voting on proposals, or managing pooled assets. While DAOs are still experimental, they offer opportunities for you to find groups that you identify with, find collaborators, and grow your impact on the Ethereum community.",
    url: "#decentralized-autonomous-organizations-daos",
    button: "More about DAOs",
  },
]

const CommunityPage = ({ data }) => {
  return (
    <Page>
      <PageMetadata
        title="Ethereum Community Center"
        description="Learn how to get involved in the Ethereum Community"
      />
      <Content>
        <HeroContainer>
          <Hero
            fluid={data.communityHero.childImageSharp.fluid}
            alt="Community artwork"
            loading="eager"
          />
          <HeroCopyContainer>
            <HeroCopy>
              <H1>
                Ethereum <b>community</b> center
              </H1>
              <Subtitle>Welcome.</Subtitle>
            </HeroCopy>
          </HeroCopyContainer>
        </HeroContainer>
        <MonoSubtitle>Get involved in the Ethereum Community!</MonoSubtitle>
        <PageIntro>
          The Ethereum community includes tens of thousands of developers,
          technologists, users, HODLers, and enthusiasts all over the world.
          There are many ways to get involved in the Ethereum community: you can
          attend an event, join a meetup group, contribute to a project, or
          participate in one of many online forums about Ethereum.
        </PageIntro>
        <StyledCardContainer>
          {paths.map((path, idx) => {
            return (
              <StyledCard
                key={idx}
                emoji={path.emoji}
                title={path.title}
                description={path.description}
              >
                <ButtonLink to={path.url}>{path.button}</ButtonLink>
              </StyledCard>
            )
          })}
        </StyledCardContainer>
        {/* TODO: Refactor and style */}
        <div style={{ marginBottom: "5rem" }}>
          <h1>
            <Emoji text=":calendar:" size={2} mr={`2rem`} />
            Upcoming Events
          </h1>
          <p>
            Every month, there are major Ethereum events around the world.
            Consider attending one near you to meet more people in the
            community, learn about employment opportunities, and develop new
            skills.
          </p>
          <ul>
            {events
              .filter(({ endDate }) => endDate > new Date())
              .map(
                ({ title, to, sponsor, description, startDate, endDate }) => (
                  <li>
                    <Link to={to}>{title}</Link> ({sponsor}) - {description} (
                    {startDate.toLocaleDateString()} -{" "}
                    {endDate.toLocaleDateString()})
                  </li>
                )
              )}
          </ul>
          <p>
            Have an event to add to this list?{" "}
            <Link to="https://github.com/ethereum/ethereum-org-website#how-can-i-contribute">
              Add it!
            </Link>
          </p>
        </div>
        <div style={{ marginBottom: "5rem" }}>
          <h1>
            {/* TODO: Social media buttons (with consistent theme) */}
            <Emoji text=":world_map:" size={2} mr={`2rem`} />
            Online Communities
          </h1>
          {forums.map(({ to, title, description }) => (
            <p>
              <Link to={to}>{title}</Link> - <em>{description}</em>
            </p>
          ))}
        </div>
        <div style={{ marginBottom: "5rem" }}>
          <h1>
            {/* TODO: Legal Twitter logo, possible twitter feed widget */}
            <Emoji text=":baby_chick:" size={2} mr={`2rem`} />
            Ethereum on Twitter
          </h1>
          <p>
            The Ethereum community is very active on Twitter - not sure where to
            start?
          </p>
          <Link to="https://hive.one/ethereum/">
            List of influential Ethereum twitter accounts
          </Link>
        </div>
        <div style={{ marginBottom: "5rem" }}>
          <h1>Decentralized Autonomous Organizations (DAOs)</h1>
          {daos.map(({ title, to, twitterHandle, twitterTo, description }) => (
            <p>
              <Link to={to}>{title}</Link>{" "}
              <Link to={twitterTo}>{twitterHandle}</Link> -{" "}
              <em>{description}</em>
            </p>
          ))}
        </div>
        <div style={{ marginBottom: "5rem" }}>
          <h1>
            {/* TODO: Get legally usable Meetup logo */}
            <Emoji text=":busts_in_silhouette:" size={2} mr={`2rem`} />
            Ethereum Meetup Groups
          </h1>
          <p>
            "Meetups" are small events held by groups of Ethereum enthusiasts -
            a chance for people interested in Ethereum to get together, talk
            about Ethereum, and learn about recent developments.
          </p>
          <MeetupList />
          <br />
          <p>
            Interested in starting your own meetup? Check out the{" "}
            <Link to="https://consensys.net/developers/buidlnetwork/">
              BUIDL Network
            </Link>
            , an initiative by ConsenSys to help support Ethereum’s meetup
            communities.
          </p>
          <p>
            This is a non-exhaustive list built by our community. Know of an
            active meetup group to add to this list?{" "}
            <Link to="https://github.com/ethereum/ethereum-org-website#content-contributions">
              Please add it
            </Link>
            !
          </p>
        </div>
      </Content>
    </Page>
  )
}
export default CommunityPage

export const query = graphql`
  query {
    communityHero: file(relativePath: { eq: "communityHero.png" }) {
      childImageSharp {
        fluid(maxWidth: 1504) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
