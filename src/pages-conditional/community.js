import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import CardList from "../components/CardList"
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
import daos from "../data/community/daos.json"
import forums from "../data/community/forums.json"
import events from "../data/community/events.json"
import jobs from "../data/community/jobs.json"
import ProductCard from "../components/ProductCard"

const HeroContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
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

const ForumEntry = styled.div`
  flex-direction: row;
  justify-content: flex-start;
`

const SocialButton = styled(Img)``

const ForumGraphic = styled(SocialButton)`
  margin-right: 1rem;
  /*
  TODO: Should lay left side of ForumEntry
  TODO: Make graphic clickable without [arrow] for extenal link
  Render new graphics at different sizes
  Max size should fit comfortably on mobile
  */
`

const ForumText = styled.div`
  flex: 1;
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
const ActionCardContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`

const TwoColumnContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
`

const Column = styled.div`
  flex: 1 0 33%;
  justify-content: flex-end;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    max-width: 100%;
  }
  margin-bottom: 1.5rem;
  margin-right: 2rem;
  width: 100%;
`

const ColumnImage = styled(Img)`
  flex: 1 1 100%;
  max-width: 800px;
  background-size: cover;
  background-repeat: no-repeat;
`
// const socialPlatforms = {
//   discord: `discord`,
//   ethGlobal: `ethGlobal`,
//   gitter: `gitter`,
//   reddit: `reddit`,
//   stackExchange: `stackExchange`,
//   twitter: `twitter`,
//   github: `github`,
//   youtube: `youtube`,
// }

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

const dateParse = (dateString) => {
  const parts = dateString.split("-")
  return new Date(parts[0], parts[1] - 1, parts[2])
}
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
        <H2>Get involved in the Ethereum Community!</H2>
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
              .filter(({ endDate }) => {
                const yesterday = new Date()
                yesterday.setDate(yesterday.getDate() - 1)
                return dateParse(endDate) > yesterday
              })
              .map(
                (
                  { title, to, sponsor, description, startDate, endDate },
                  idx
                ) => (
                  <Li key={idx}>
                    <Link to={to}>{title}</Link> ({sponsor}) - {description} (
                    {dateParse(startDate).toLocaleDateString()} -{" "}
                    {dateParse(endDate).toLocaleDateString()})
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

        <HeroContainer>
          <Hero
            fluid={data.onlineCommunities.childImageSharp.fluid}
            alt="Online communities artwork"
            loading="eager"
          />
          <HeroCopyContainer>
            <HeroCopy>
              <PageTitle>Online Communities</PageTitle>
              <PageSubtitle>
                Have a favorite platform? Friends of Ethereum are everywhere,
                and all are welcome!
              </PageSubtitle>
            </HeroCopy>
          </HeroCopyContainer>
        </HeroContainer>
        <CardList
          content={forums.map(({ title, to, description, platform }) => {
            const returnObject = { title, description, link: to }
            return platform
              ? {
                  ...returnObject,
                  image: data[platform].childImageSharp.fixed,
                }
              : returnObject
          })}
        />
        <CardList
          content={[
            {
              title: "Ethereum on Twitter",
              description:
                "The Ethereum community is very active on Twitter - not sure where to start?\nList of influential Ethereum twitter accounts",
              image: data.twitter.childImageSharp.fixed,
              link: "https://hive.one/ethereum/",
            },
          ]}
        />
        {/* TODO: Possible twitter feed widget */}
        <Divider />
        <div style={{ marginBottom: "5rem" }}>
          <H1>
            <Emoji text=":bank:" size={2} mr={`2rem`} />
            Decentralized Autonomous Organizations (DAOs)
          </H1>
          <TwoColumnContent>
            <Column>
              {daos.map(
                ({ title, to, twitterHandle, twitterTo, description }, idx) => (
                  <P key={idx}>
                    <Link to={to}>{title}</Link>{" "}
                    <Link to={twitterTo}>{twitterHandle}</Link> -{" "}
                    <em>{description}</em>
                  </P>
                )
              )}
            </Column>
            <Column>
              <ColumnImage
                fluid={data.meetupHero.childImageSharp.fluid}
                alt="Illustration of blocks being organised like an ETH symbol"
                loading="eager"
              />
            </Column>
          </TwoColumnContent>
        </div>
        <Divider />
        <div style={{ marginBottom: "5rem" }}>
          <H1>
            {/* TODO: Get legally usable Meetup logo */}
            <Emoji text=":busts_in_silhouette:" size={2} mr={`2rem`} />
            Ethereum Meetup Groups
          </H1>
          <TwoColumnContent>
            <Column>
              <P>
                "Meetups" are small events held by groups of Ethereum
                enthusiasts - a chance for people interested in Ethereum to get
                together, talk about Ethereum, and learn about recent
                developments.
              </P>
              <MeetupList />
              <P>
                Interested in starting your own meetup? Check out the{" "}
                <Link to="https://consensys.net/developers/stack/buidlnetwork/">
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
            </Column>
            <Column>
              <ColumnImage
                fluid={data.meetupHero.childImageSharp.fluid}
                alt="Illustration of blocks being organised like an ETH symbol"
                loading="eager"
              />
            </Column>
          </TwoColumnContent>
        </div>
        <Divider />
        {/* -- Get Involved ----------------------------------------------------------------- */}
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
          <TwoColumnContent>
            <Column>
              <H2>Developers</H2>
              <ul>
                <Li>
                  Learn about and try Ethereum at{" "}
                  <Link to="/en/developers/">ethereum.org/developers/</Link>
                </Li>
                <Li>
                  <Link to="https://gitcoin.co/">Find a bounty on Gitcoin</Link>
                  , work on a small or large technical issue, earn crypto!
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
            </Column>
            <Column>
              <ColumnImage
                fluid={data.meetupHero.childImageSharp.fluid}
                alt="Illustration of blocks being organised like an ETH symbol"
                loading="eager"
              />
            </Column>
          </TwoColumnContent>
          <TwoColumnContent>
            <Column>
              <ColumnImage
                fluid={data.meetupHero.childImageSharp.fluid}
                alt="Illustration of blocks being organised like an ETH symbol"
                loading="eager"
              />
            </Column>
            <Column>
              <H2>Researchers & Academics</H2>
              <P>
                Do you have a background in mathematics, cryptography, or
                economics? You might be interested in some of the cutting-edge
                work being done within the Ethereum ecosystem
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
                  <Link to="https://ethresear.ch">Ethresear.ch</Link> -
                  Ethereum’s primary forum for research, and the world’s most
                  influential forum for cryptoeconomics
                </Li>
                <Li>
                  <Link to="https://esp.ethereum.foundation/wishlist/">
                    Ecosystem Support Program's wishlist
                  </Link>
                  - research areas where the Ethereum Ecosystem Support Program
                  is actively seeking grant applications
                </Li>
              </ul>
            </Column>
          </TwoColumnContent>
          <TwoColumnContent>
            <Column>
              {" "}
              <H2>
                Have non-technical skills, and aren’t sure where to start?
              </H2>
              <P>
                If you’re not a developer, here are a few suggestions along with
                resources for specific professional backgrounds.
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
                      Ethereum needs good writers who can explain its value in
                      plain language
                    </Li>
                    <Li>
                      Not ready to publish your own articles? Consider
                      contributing to the existing content on community
                      resources like{" "}
                      <Link to="https://docs.ethhub.io/">EthHub</Link>, or
                      propose new content for ethereum.org!
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
                      ethereum.org maintains a translation program that
                      translates the website, and other resources, into many
                      different languages
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
            </Column>
            <Column>
              <ColumnImage
                fluid={data.meetupHero.childImageSharp.fluid}
                alt="Illustration of blocks being organised like an ETH symbol"
                loading="eager"
              />
            </Column>
          </TwoColumnContent>
          <TwoColumnContent>
            <Column>
              <ColumnImage
                fluid={data.meetupHero.childImageSharp.fluid}
                alt="Illustration of blocks being organised like an ETH symbol"
                loading="eager"
              />
            </Column>
            <Column>
              <H2>Financial professional or accountant</H2>
              <ul>
                <Li>
                  Ethereum is home to the “Decentralized Finance (DeFi)”
                  ecosystem - a network of protocols and applications that offer
                  an alternative financial system. If you’re a financial
                  professional, check out some DeFi apps at{" "}
                  <Link to="https://defipulse.com/">DeFi Pulse</Link> or{" "}
                  <Link to="https://defiprime.com">DeFiPrime</Link>
                </Li>
                <Li>
                  Accountant? Assets on Ethereum - ETH, tokens, DeFi, etc -
                  introduce many novel accounting issues. You could start by
                  checking out some projects that aim to help users of
                  cryptocurrency solve their bookkeeping & accounting
                  challenges, like{" "}
                  <Link to="https://veriledger.io/">VeriLedger</Link> or
                  <Link to="https://rotki.com/">Rotki</Link>
                </Li>
              </ul>
            </Column>
          </TwoColumnContent>
          <TwoColumnContent>
            <Column>
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
            </Column>
            <Column>
              <ColumnImage />
            </Column>
          </TwoColumnContent>
        </div>
        <Divider />
        {/* -- Ethereum Jobs ----------------------------------- */}
        <div style={{ marginBottom: "5rem" }}>
          <H1>
            <Emoji text=":woman_office_worker:" size={2} mr={`2rem`} />
            Ethereum Jobs
          </H1>
          <ActionCardContainer>
            {jobs.map(({ id, name, description, url, background }) => (
              <ProductCard
                key={id}
                url={url}
                background={background}
                name={name}
                description={description}
              />
            ))}
          </ActionCardContainer>
        </div>
      </Content>
    </Page>
  )
}
export default CommunityPage

export const query = graphql`
  query {
    communityHero: file(relativePath: { eq: "community/hero.png" }) {
      childImageSharp {
        fluid(maxWidth: 1504) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    meetupHero: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    onlineCommunities: file(
      relativePath: { eq: "community/online-communities.png" }
    ) {
      childImageSharp {
        fluid(maxWidth: 1504) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    discord: file(relativePath: { eq: "community/button-discord.png" }) {
      childImageSharp {
        fixed(height: 48) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    ethGlobal: file(relativePath: { eq: "community/button-eth-global.png" }) {
      childImageSharp {
        fixed(height: 48) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    gitter: file(relativePath: { eq: "community/button-gitter.png" }) {
      childImageSharp {
        fixed(height: 48) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    reddit: file(relativePath: { eq: "community/button-reddit.png" }) {
      childImageSharp {
        fixed(height: 48) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    stackExchange: file(
      relativePath: { eq: "community/button-stack-exchange.png" }
    ) {
      childImageSharp {
        fixed(height: 48) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    twitter: file(relativePath: { eq: "community/button-twitter.png" }) {
      childImageSharp {
        fixed(height: 75) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    github: file(relativePath: { eq: "community/button-github.png" }) {
      childImageSharp {
        fixed(height: 48) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    youtube: file(relativePath: { eq: "community/button-youtube.png" }) {
      childImageSharp {
        fixed(height: 48) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
