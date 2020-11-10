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
  Divider,
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

const PageTitle = styled(H1)`
  text-align: center;
`

const H2 = styled.h2`
  font-style: normal;
  font-weight: normal;
  // font-family: "SFMono-Regular", monospace;
  font-weight: 300;
  font-size: 24px;
  line-height: 110%;
  // background: ${(props) => props.theme.colors.ednBackground};
  padding: 0.25rem;
`

const Li = styled.li`
  color: ${(props) => props.theme.colors.text400};
`

const PageSubtitle = styled.div`
  font-size: 20px;
  line-height: 140%;
  text-align: center;
  color: ${(props) => props.theme.colors.text300};
`

const SubtitleWithMargin = styled(PageSubtitle)`
  margin-bottom: 1.5rem;
`

const MonoSubtitle = styled.h2`
  margin-top: 2rem;
`

const P = styled.p`
  color: ${(props) => props.theme.colors.text400};
`

const Hero = styled(Img)`
  position: absolute;
  top: 0;
  left: 0;
  flex: 1 1;
  border-radius: 4px;
  max-width: 1504px;
  min-height: 238px;
  background-size: cover;
  background-repeat: no-repeat;
  align-self: center;
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

const jobs = [
  { title: `Cryptocurrency Jobs`, to: `https://cryptocurrencyjobs.co/` },
  { title: `Crypto.jobs`, to: `https://crypto.jobs/` },
  { title: `Careers at ConsenSys`, to: `https://careers.labs.consensys.net/` },
  { title: `Blocktribe`, to: `https://blocktribe.com/` },
]

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
              <PageTitle>
                Ethereum <b>community</b> center
              </PageTitle>
              <PageSubtitle>Welcome.</PageSubtitle>
            </HeroCopy>
          </HeroCopyContainer>
        </HeroContainer>
        <MonoSubtitle>Get involved in the Ethereum Community!</MonoSubtitle>
        <P>
          The Ethereum community includes tens of thousands of developers,
          technologists, users, HODLers, and enthusiasts all over the world.
          There are many ways to get involved in the Ethereum community: you can
          attend an event, join a meetup group, contribute to a project, or
          participate in one of many online forums about Ethereum.
        </P>
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
        <Divider />
        {/* TODO: Refactor and style */}
        <div style={{ marginBottom: "5rem" }}>
          <H1>
            <Emoji text=":calendar:" size={2} mr={`2rem`} />
            Upcoming Events
          </H1>
          <P>
            Every month, there are major Ethereum events around the world.
            Consider attending one near you to meet more people in the
            community, learn about employment opportunities, and develop new
            skills.
          </P>
          <ul>
            {events
              .filter(({ endDate }) => endDate > new Date())
              .map(
                ({ title, to, sponsor, description, startDate, endDate }) => (
                  <Li>
                    <Link to={to}>{title}</Link> ({sponsor}) - {description} (
                    {startDate.toLocaleDateString()} -{" "}
                    {endDate.toLocaleDateString()})
                  </Li>
                )
              )}
          </ul>
          <P>
            Have an event to add to this list?{" "}
            <Link to="https://github.com/ethereum/ethereum-org-website#how-can-i-contribute">
              Add it!
            </Link>
          </P>
        </div>
        <Divider />
        <div style={{ marginBottom: "5rem" }}>
          <H1>
            {/* TODO: Social media buttons (with consistent theme) */}
            <Emoji text=":world_map:" size={2} mr={`2rem`} />
            Online Communities
          </H1>
          {forums.map(({ to, title, description }) => (
            <P>
              <Link to={to}>{title}</Link> - <em>{description}</em>
            </P>
          ))}
        </div>
        <Divider />
        <div style={{ marginBottom: "5rem" }}>
          <H1>
            {/* TODO: Legal Twitter logo, possible twitter feed widget */}
            <Emoji text=":baby_chick:" size={2} mr={`2rem`} />
            Ethereum on Twitter
          </H1>
          <P>
            The Ethereum community is very active on Twitter - not sure where to
            start?
          </P>
          <Link to="https://hive.one/ethereum/">
            List of influential Ethereum twitter accounts
          </Link>
        </div>
        <Divider />
        <div style={{ marginBottom: "5rem" }}>
          <H1>
            <Emoji text=":bank:" size={2} mr={`2rem`} />
            Decentralized Autonomous Organizations (DAOs)
          </H1>
          {daos.map(({ title, to, twitterHandle, twitterTo, description }) => (
            <P>
              <Link to={to}>{title}</Link>{" "}
              <Link to={twitterTo}>{twitterHandle}</Link> -{" "}
              <em>{description}</em>
            </P>
          ))}
        </div>
        <Divider />
        <div style={{ marginBottom: "5rem" }}>
          <H1>
            {/* TODO: Get legally usable Meetup logo */}
            <Emoji text=":busts_in_silhouette:" size={2} mr={`2rem`} />
            Ethereum Meetup Groups
          </H1>
          <P>
            "Meetups" are small events held by groups of Ethereum enthusiasts -
            a chance for people interested in Ethereum to get together, talk
            about Ethereum, and learn about recent developments.
          </P>
          <MeetupList />
          <br />
          <P>
            Interested in starting your own meetup? Check out the{" "}
            <Link to="https://consensys.net/developers/buidlnetwork/">
              BUIDL Network
            </Link>
            , an initiative by ConsenSys to help support Ethereum’s meetup
            communities.
          </P>
          <P>
            This is a non-exhaustive list built by our community. Know of an
            active meetup group to add to this list?{" "}
            <Link to="https://github.com/ethereum/ethereum-org-website#content-contributions">
              Please add it
            </Link>
            !
          </P>
        </div>
        <Divider />
        <div style={{ marginBottom: "5rem" }}>
          <H1>
            <Emoji text=":woman-raising-hand:" size={2} mr={`2rem`} />
            How can I get involved?
          </H1>
          <P>
            The Ethereum community includes people of many different backgrounds
            and skillsets. Whether you’re a developer, an artist, or an
            accountant, there are ways to get involved. Here’s a list of
            suggestions that might help you get started.
          </P>
          <H2>Developers</H2>
          <ul>
            <Li>
              Learn about and try Ethereum at{" "}
              <Link to="/en/developers/">ethereum.org/developers/</Link>
            </Li>
            <Li>
              <Link to="https://gitcoin.co/">Find a bounty on Gitcoin</Link>,
              work on a small or large technical issue, earn crypto!
            </Li>
            <Li>
              Attend an <Link to="http://ethglobal.co/">ETHGlobal</Link>{" "}
              hackathon near you!
            </Li>
            <Li>
              Check out{" "}
              <Link to="/developers/docs/programming-languages/">
                projects related to your area of expertise or programming
                language of choice
              </Link>
            </Li>
            <Li>
              Watch or participate in the{" "}
              <Link to="https://www.youtube.com/playlist?list=PLaM7G4Llrb7zfMXCZVEXEABT8OSnd4-7w">
                Core Dev calls
              </Link>
            </Li>
            <Li>
              <Link to="https://esp.ethereum.foundation/wishlist/">
                Ecosystem Support Program's wishlist
              </Link>
              - tooling, documentation, and infrastructure areas where the
              Ethereum Ecosystem Support Program is actively seeking grant
              applications
            </Li>
          </ul>
          <H2>Researchers & Academics</H2>
          <P>
            Do you have a background in mathematics, cryptography, or economics?
            You might be interested in some of the cutting-edge work being done
            within the Ethereum ecosystem
          </P>
          <ul>
            <Li>
              <Link to="https://challenges.ethereum.org/">
                Challenges.ethereum.org
              </Link>
              - a series of high-value research bounties, where you can earn
              >$100,000 USD
            </Li>
            <Li>
              <Link to="https://ethresear.ch">Ethresear.ch</Link> - Ethereum’s
              primary forum for research, and the world’s most influential forum
              for cryptoeconomics
            </Li>
            <Li>
              <Link to="https://esp.ethereum.foundation/wishlist/">
                Ecosystem Support Program's wishlist
              </Link>
              - research areas where the Ethereum Ecosystem Support Program is
              actively seeking grant applications
            </Li>
          </ul>
          <H2>Have non-technical skills, and aren’t sure where to start?</H2>
          <P>
            If you’re not a developer, it can be hard to know where to start in
            Ethereum. Here are a few suggestions, along with resources for
            specific professional backgrounds.
          </P>
          <ul>
            <Li>
              <b>Organize a meetup in your city</b>
              <ul>
                <Li>
                  Not sure how to start? The{" "}
                  <Link to="https://consensys.net/developers/buidlnetwork/">
                    BUIDL network
                  </Link>
                  can help.
                </Li>
              </ul>
            </Li>
            <Li>
              <b>Write content about Ethereum</b>
              <ul>
                <Li>
                  Ethereum needs good writers who can explain its value in plain
                  language
                </Li>
                <Li>
                  Not ready to publish your own articles? Consider contributing
                  to the existing content on community resources like{" "}
                  <Link to="https://docs.ethhub.io/">EthHub</Link>, or propose
                  new content for ethereum.org!
                </Li>
              </ul>
            </Li>
            <Li>
              <b>Offer to take notes for community calls</b>
              <ul>
                <Li>
                  There are many open-source community calls, and having
                  notetakers is a huge help. If you’re interested, join the
                  Ethereum Cat Herders chat{" "}
                  <Link to="https://gitter.im/ethereum-cat-herders/meeting-notes-and-summaries">
                    here
                  </Link>
                  , and introduce yourself!
                </Li>
              </ul>
            </Li>
            <Li>
              <b>Translate Ethereum content into your native language</b>
              <ul>
                <Li>
                  ethereum.org maintains a translation program that translates
                  the website, and other resources, into many different
                  languages
                </Li>
                <Li>
                  Find out how to get involved{" "}
                  <Link to="/languages/#ethereum-org-translation-program">
                    here
                  </Link>
                </Li>
              </ul>
            </Li>
          </ul>
          <H2>Financial professional or accountant</H2>
          <ul>
            <Li>
              Ethereum is home to the “Decentralized Finance” ecosystem - a
              network of protocols and applications that offer an alternative
              financial system. If you’re a financial professional, check out
              some DeFi apps at{" "}
              <Link to="https://defipulse.com/">DeFi Pulse</Link> or{" "}
              <Link to="https://defiprime.com">DeFiPrime</Link>
            </Li>
            <Li>
              Accountant? Assets on Ethereum - ETH, tokens, DeFi, etc -
              introduce many novel accounting issues. You could start by
              checking out some projects that aim to help users of
              cryptocurrency solve their bookkeeping & accounting challenges,
              like <Link to="https://veriledger.io/">VeriLedger</Link> or
              <Link to="https://rotki.com/">Rotki</Link>
            </Li>
          </ul>
          <H2>Product Managers</H2>
          <ul>
            <Li>
              The Ethereum ecosystem needs your talents! Many companies are
              hiring for product manager roles. If you want to start by
              contributing to an open source project, get in touch with the{" "}
              <Link to="https://gitter.im/ethereum-cat-herders/community?source=orgpage">
                Ethereum Cat Herders
              </Link>
              or <Link to="https://www.metacartel.org/">MetaCartel</Link>
            </Li>
          </ul>
          <H2>Marketing</H2>
          <ul>
            <Li>
              There are many marketing and communications positions in the
              Ethereum ecosystem!
            </Li>
            <Li>
              A great way to get started is to join{" "}
              <Link to="https://marketingdao.org/">MarketingDAO</Link> - an
              organization dedicated to marketing Ethereum and applications
              built on Ethereum.
            </Li>
          </ul>
        </div>
        <Divider />
        <div style={{ marginBottom: "5rem" }}>
          <H1>
            <Emoji text=":woman_office_worker:" size={2} mr={`2rem`} />
            Ethereum Jobs
          </H1>
          <P>
            <b>Want to find a job working in Ethereum?</b>
          </P>
          <ul>
            {jobs.map(({ title, to }) => (
              <Li>
                <Link to={to}>{title}</Link>
              </Li>
            ))}
          </ul>
        </div>
        <div>
          <div>
            <Image fixed={data.discord.childImageSharp.fixed} alt="Discord" />
          </div>
          <div>
            <Image
              fixed={data.ethGlobal.childImageSharp.fixed}
              alt="ETH Global"
            />
          </div>
          <div>
            <Image fixed={data.gitter.childImageSharp.fixed} alt="Gitter" />
          </div>
          <div>
            <Image fixed={data.reddit.childImageSharp.fixed} alt="Reddit" />
          </div>
          <div>
            <Image
              fixed={data.stackExchange.childImageSharp.fixed}
              alt="Stack Exchange"
            />
          </div>
          <div>
            <Image fixed={data.twitter.childImageSharp.fixed} alt="Twitter" />
          </div>
          <div>
            <Image fixed={data.github.childImageSharp.fixed} alt="GitHub" />
          </div>
          <div>
            <Image fixed={data.youtube.childImageSharp.fixed} alt="YouTube" />
          </div>
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
    discord: file(relativePath: { eq: "community/button-discord.png" }) {
      childImageSharp {
        fixed(height: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    ethGlobal: file(relativePath: { eq: "community/button-eth-global.png" }) {
      childImageSharp {
        fixed(height: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    gitter: file(relativePath: { eq: "community/button-gitter.png" }) {
      childImageSharp {
        fixed(height: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    reddit: file(relativePath: { eq: "community/button-reddit.png" }) {
      childImageSharp {
        fixed(height: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    stackExchange: file(
      relativePath: { eq: "community/button-stack-exchange.png" }
    ) {
      childImageSharp {
        fixed(height: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    twitter: file(relativePath: { eq: "community/button-twitter.png" }) {
      childImageSharp {
        fixed(height: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    github: file(relativePath: { eq: "community/button-github.png" }) {
      childImageSharp {
        fixed(height: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    youtube: file(relativePath: { eq: "community/button-youtube.png" }) {
      childImageSharp {
        fixed(height: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
