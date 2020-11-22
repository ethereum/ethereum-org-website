import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import Card from "../../components/Card"
import Callout from "../../components/Callout"
import Link from "../../components/Link"

import ButtonLink from "../../components/ButtonLink"
import PageMetadata from "../../components/PageMetadata"
import {
  CardContainer,
  Content,
  Page,
  GrayContainer,
} from "../../components/SharedStyledComponents"

const HeroContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column-reverse;
  }
  margin-top: 2rem;
  margin-bottom: 4rem;
  background: ${(props) => props.theme.colors.cardGradient};
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

const HeroCopy = styled.div`
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
  font-family: "SFMono-Regular", monospace;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 32px;
  line-height: 110%;
  background: ${(props) => props.theme.colors.ednBackground};
  padding: 0.5rem;
`

const Subtitle = styled.div`
  font-size: 20px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
`
const SubtitleWithMargin = styled(Subtitle)`
  margin-bottom: 1.5rem;
`

const MonoSubtitle = styled.h2`
  margin-bottom: 0rem;
`

const Hero = styled(Img)`
  flex: 1 1 50%;
  max-width: 800px;
  background-size: cover;
  background-repeat: no-repeat;
  margin-top: 3rem;
  margin-left: 2rem;
  @media (min-width: ${(props) => props.theme.breakpoints.m}) {
    align-self: center;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-top: 0;
    margin-left: 0;
  }
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
  flex: 1 1 22%;
  min-width: 240px;
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  margin: 1rem;
  padding: 1.5rem;
  @media (max-width: 1120px) {
    flex: 1 1 40%;
  }

  &:hover {
    border-radius: 4px;
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    background: ${(props) => props.theme.colors.tableBackgroundHover};
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

const paths = [
  {
    emoji: ":woman_student:",
    title: "Learn Ethereum development",
    description:
      "Read up on core concepts and the Ethereum stack with our docs",
    url: "/en/developers/docs/",
    button: "Read the docs",
  },
  {
    emoji: ":woman_teacher:",
    title: "Learn through tutorials",
    description:
      "Learn Ethereum development step-by-step from builders who have already done it.",
    url: "/en/developers/tutorials/",
    button: "Select a topic",
  },
  {
    emoji: ":woman_scientist:",
    title: "Start experimenting",
    description: "Want to experiment first, ask questions later?",
    url: "/en/developers/learning-tools/",
    button: "Play with code",
  },
  {
    emoji: ":construction_worker:",
    title: "Set up local environment",
    description:
      "Get your stack ready for building by configuring a development environment.",
    url: "/en/developers/local-environment/",
    button: "Choose your stack",
  },
]

const DevelopersPage = ({ data }) => {
  return (
    <Page>
      <PageMetadata
        title="Ethereum Developer Resources"
        description="Documentation, tutorials, and tools for developers building on Ethereum."
      />
      <Content>
        <HeroContainer>
          <HeroCopyContainer>
            <HeroCopy>
              <H1>
                <b>Ethereum</b> <br />
                developer <br /> resources
              </H1>
              <Subtitle>
                A builders manual for Ethereum. By builders, for builders.
              </Subtitle>
            </HeroCopy>
          </HeroCopyContainer>
          <Hero
            fluid={data.ednHero.childImageSharp.fluid}
            alt="Illustration of blocks being organised like an ETH symbol"
            loading="eager"
          />
        </HeroContainer>
        <MonoSubtitle>How would you like to get started?</MonoSubtitle>
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
        <TwoColumnContent>
          <IntroColumn>
            <h2>About these developer resources</h2>
            <SubtitleWithMargin>
              ethereum.org is here to help you build with Ethereum with
              documentation on foundational concepts as well as the development
              stack. Plus there are tutorials to get you up and running.
            </SubtitleWithMargin>
            <p>
              Inspired by the{" "}
              <Link to="https://developer.mozilla.org/en-US/">
                Mozilla Developer Network
              </Link>
              , we thought Ethereum needed a place to house great developer
              content and resources. Like our friends at Mozilla, everything
              here is open-source and ready for you to extend and improve.
            </p>
            <p>
              If you have any feedback, reach out to us via a GitHub issue or on
              our <Link to="https://discord.gg/CetY6Y4">Discord server</Link>.
            </p>
          </IntroColumn>
          <StyledCallout
            image={data.developers.childImageSharp.fixed}
            title="Help us make ethereum.org better"
            description="Like ethereum.org, these docs are a community effort. Create a PR if you see mistakes, room for improvement, or new opportunties to help Ethereum developers."
          >
            <div>
              <ButtonLink to="https://github.com/ethereum/ethereum-org-website">
                Contribute
              </ButtonLink>
            </div>
          </StyledCallout>
        </TwoColumnContent>
      </Content>
      <GrayContainer>
        <Content>
          <h2>Explore the documentation</h2>
        </Content>
        {/* TODO use the same source as SideNav for these sections */}
        <ThreeColumnContent>
          <Column>
            <h3>Introductions</h3>
            <Link to="/developers/docs/intro-to-ethereum/">
              Intro to Ethereum
            </Link>
            <p>An introduction to blockchain and Ethereum</p>

            <Link to="/developers/docs/dapps/">Intro to dapps</Link>
            <p>An introduction to decentralized applications</p>

            <Link to="/developers/docs/ethereum-stack/">
              Intro to the stack
            </Link>
            <p>An introduction to the Ethereum stack</p>

            <Link to="/developers/docs/web2-vs-web3/">Web2 vs Web3</Link>
            <p>How the web3 world of development is different</p>

            <Link to="/developers/docs/programming-languages/">
              Programming languages
            </Link>
            <p>Using Ethereum with familiar languages</p>
            <ImageContainer>
              <Image fixed={data.doge.childImageSharp.fixed} />
            </ImageContainer>
          </Column>
          <Column>
            <h3>Fundamentals</h3>
            <Link to="/developers/docs/accounts/">Accounts</Link>
            <p>Contracts or people on the network</p>

            <Link to="/developers/docs/transactions/">Transactions</Link>
            <p>The way Ethereum state changes</p>

            <Link to="/developers/docs/blocks/">Blocks</Link>
            <p>Batches of transactions added to the blockchain</p>

            <Link to="/developers/docs/evm/">
              The Ethereum virtual machine (EVM)
            </Link>
            <p>The computer that processes transactions</p>

            <Link to="/developers/docs/gas/">Gas</Link>
            <p>Ether needed to power transactions</p>

            <Link to="/developers/docs/nodes-and-clients/">
              Nodes and clients
            </Link>
            <p>How blocks and transactions are verified in the network</p>

            <Link to="/developers/docs/networks/">Networks</Link>
            <p>An overview of mainnet and the test networks</p>

            <Link to="/developers/docs/consensus-mechanisms/pow/mining/">
              Mining
            </Link>
            <p>How new blocks are created and consensus is reached</p>
          </Column>
          <RightColumn>
            <h3>The stack</h3>
            <Link to="/developers/docs/smart-contracts/">Smart contracts</Link>
            <p>The logic behind dapps – self-executing agreements</p>

            <Link to="/developers/docs/frameworks/">
              Development frameworks
            </Link>
            <p>Tools for helping speed up development</p>

            <Link to="/developers/docs/apis/javascript/">
              Javascript libraries
            </Link>
            <p>Using javascript to interact with smart contracts</p>

            <Link to="/developers/docs/apis/backend/">Backend APIs</Link>
            <p>Using libraries to interact with smart contracts</p>

            <Link to="/developers/docs/data-and-analytics/block-explorers/">
              Block explorers
            </Link>
            <p>Your portal to Ethereum data</p>

            <Link to="/developers/docs/security/">Security</Link>
            <p>Security measures to consider during development</p>

            <Link to="/developers/docs/storage/">Storage</Link>
            <p>How to handle dapp storage</p>

            <Link to="/developers/docs/ides/">Development environments</Link>
            <p>IDEs that are suitable for dapp development</p>

            <h3>Advanced</h3>
            <Link to="/developers/docs/standards/tokens/">Token standards</Link>
            <p>An overview of accepted token standards</p>

            <Link to="/developers/docs/oracles/">Oracles</Link>
            <p>Getting off-chain data into your smart contracts</p>

            <Link to="/developers/docs/layer-2-scaling/">Scaling</Link>
            <p>Solutions for faster transactions</p>
          </RightColumn>
        </ThreeColumnContent>
      </GrayContainer>
    </Page>
  )
}
export default DevelopersPage

export const query = graphql`
  query {
    ednHero: file(relativePath: { eq: "enterprise-eth.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    developers: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      childImageSharp {
        fixed(height: 200) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    doge: file(relativePath: { eq: "doge-computer.png" }) {
      childImageSharp {
        fixed(height: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    ogImage: file(relativePath: { eq: "enterprise-eth.png" }) {
      childImageSharp {
        fixed(width: 1200) {
          src
        }
      }
    }
  }
`
