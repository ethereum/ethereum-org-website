import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import Card from "../../components/Card"
import Link from "../../components/Link"

import Button from "../../components/Button"
import PageMetadata from "../../components/PageMetadata"
import {
  Content,
  Divider,
  EdnPage,
  InfoBanner,
  GrayContainer,
} from "../../components/SharedStyledComponents"
import Select from "react-select"
import Callout from "../../components/Callout"

const StyledSelect = styled(Select)`
  width: 100%;
  max-width: 640px;
  padding: 0rem;
  margin-top: 2rem;
  color: black;
  /* Component */
  .react-select__control {
    border: 1px solid ${(props) => props.theme.colors.searchBorder};
    background: ${(props) => props.theme.colors.searchBackground};
    /* Dropdown arrow */
    .react-select__indicator {
      color: ${(props) => props.theme.colors.searchBorder};
    }
    &.react-select__control--is-focused {
      border-color: ${(props) => props.theme.colors.primary} !important;
      box-shadow: 0 0 0 1px ${(props) => props.theme.colors.primary} !important;
      .react-select__value-container {
        border-color: ${(props) => props.theme.colors.primary} !important;
      }
    }
  }
  .react-select__placeholder {
    color: ${(props) => props.theme.colors.text200};
  }
  .react-select__single-value {
    color: ${(props) => props.theme.colors.text};
  }
  .react-select__menu {
    background: ${(props) => props.theme.colors.searchBackground};
    color: ${(props) => props.theme.colors.text};
  }
  .react-select__input {
    color: ${(props) => props.theme.colors.text};
  }
  .react-select__option {
    &:hover {
      background-color: ${(props) => props.theme.colors.selectHover};
    }
    &:active {
      background-color: ${(props) => props.theme.colors.selectActive};
      color: ${(props) => props.theme.colors.buttonColor} !important;
    }
  }
  .react-select__option--is-focused {
    background-color: ${(props) => props.theme.colors.selectHover};
  }
  .react-select__option--is-selected {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.buttonColor};
    &:hover {
      background-color: ${(props) => props.theme.colors.primary};
    }
  }
`

const HeroContent = styled(Content)`
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    padding: 1rem 2rem 2rem;
  }
  margin-bottom: 2rem;
`

const Slogan = styled.h1`
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
  margin-bottom: 2rem;
`

const MonoSubtitle = styled.h2`
  margin-bottom: 0rem;
`

const HeroContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column-reverse;
  }
  margin-top: 2rem;
  background: ${(props) => props.theme.colors.cardGradient};
`

const Hero = styled(Img)`
  flex: 1 1 100%;
  max-width: 800px;
  background-size: cover;
  background-repeat: no-repeat;
  margin-top: 3rem;
  margin-left: 2rem;
`

const Image = styled(Img)`
  max-width: 400px;
  margin-top: 4rem;
`

const HeroBox = styled.div`
  background: ${(props) => props.theme.colors.background};
  padding: 2rem;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.border};
  margin-top: -10rem;
  margin-left: 2rem;
`

const Header = styled.header`
  margin-top: 12rem;
  @media (max-width: 1280px) {
    margin-top: 8rem;
  }
  @media (max-width: 1160px) {
    margin-top: 7rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 4rem;
  }
  @media (max-width: 920px) {
    margin-top: 2rem;
  }
  @media (max-width: 870px) {
    margin-top: 1rem;
  }
  @media (max-width: 840px) {
    margin-top: 0;
  }
`

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -1rem;
  margin-right: -1rem;
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
  flex: 1 0 33%;
  justify-content: flex-end;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    max-width: 100%;
  }
  margin-bottom: 1.5rem;
  margin-right: 2rem;
  width: 100%;
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

const StyledCallout = styled(Callout)`
  max-width: 50%;
`

const paths = [
  {
    emoji: ":woman_student:",
    title: "Learn Ethereum development",
    description: "Read up on Ethereum development with our docs",
    url: "/en/developers/learn/",
    button: "Read the docs",
  },
  {
    emoji: ":woman_scientist:",
    title: "Start experimenting",
    description: "Want to experiment first, ask questions later?",
    url: "/en/build/",
    button: "Play with code",
  },
  {
    emoji: ":construction_worker:",
    title: "Set up local environment",
    description: "Get your stack ready to start building.",
    url: "/en/choose-stack/",
    button: "Choose your stack",
  },
]

const StackContainer = styled(Content)`
  /* border: 1px solid ${(props) => props.theme.colors.border}; */
/*   border-radius: 4px;
 */  /* padding: 3rem 2rem; */
  /* margin: 2rem; */
  /* width: 96%; */
/*   background: ${(props) => props.theme.colors.ednBackground}; */
`

const DevelopersPage = ({ data }) => {
  return (
    <EdnPage>
      <HeroContent>
        <HeroContainer>
          <Header>
            <HeroBox>
              <Slogan>
                <b>Ethereum</b>
                <br /> developer
                <br /> network
              </Slogan>

              <Subtitle>
                A builders manual for Ethereum. By builders, for builders.
              </Subtitle>
              <StyledSelect />
            </HeroBox>
          </Header>
          <Hero
            fluid={data.ednHero.childImageSharp.fluid}
            alt="Illustration of blocks being organised like an ETH symbol"
            loading="eager"
          />
        </HeroContainer>
      </HeroContent>
      <Content>
        <MonoSubtitle>How would you like to get started?</MonoSubtitle>
        <CardContainer>
          {paths.map((path, idx) => {
            return (
              <StyledCard
                key={idx}
                emoji={path.emoji}
                title={path.title}
                description={path.description}
              >
                <Button to={path.url}>{path.button}</Button>
              </StyledCard>
            )
          })}
        </CardContainer>
        <TwoColumnContent>
          <Column>
            <h2>What is the Ethereum developer network (EDN)?</h2>
            <Subtitle>
              The EDN is a resource to help you build with Ethereum. It includes
              documentation on all the foundational topics as well as the stack.
              Plus there are tutorials to get you up and running.
            </Subtitle>
            <p>
              Inspired by the Mozilla developer network, we thought Ethereum
              needed a place to house great developer content and resources.
              Like our friends at Mozilla, everything here is open-source and
              ready for you to extend and improve.
            </p>
            <p>
              If you have any feedback, reach out to us via a GitHub issue or on
              our <Link to="https://discord.gg/CetY6Y4">Discord server</Link>.
            </p>
          </Column>

          <StyledCallout
            image={data.developers.childImageSharp.fixed}
            title="Help us make EDN better"
            description="Like ethereum.org, these docs are a community effort. Create a PR if you see mistakes, room for improvement, or new opportunties to help Ethereum developers."
          >
            <div>
              <Button to="#">Contribute</Button>
            </div>
          </StyledCallout>
        </TwoColumnContent>
      </Content>
      <GrayContainer>
        <Content>
          <h2>Explore the network documentation</h2>
        </Content>
        <ThreeColumnContent>
          <Column>
            <h3>Introductions</h3>
            <Link to="/en/developers/learn/blockchain-basics/">
              Blockchain basics
            </Link>
            <p>An introduction to blockchain and Ethereum</p>

            <Link to="/en/developers/learn/dapps/">Intro to dapps</Link>
            <p>An introduction to decentralized applications</p>

            <Link to="/en/developers/learn/web2-vs-web3/">Web2 vs Web3</Link>
            <p>How the web3 world of development is different</p>

            <Link to="/en/developers/learn/programming-languages/">
              Programming languages
            </Link>
            <p>Using Ethereum with familiar languages</p>

            <Image fixed={data.doge.childImageSharp.fixed} />
          </Column>
          <Column>
            <h3>Fundamentals</h3>
            <Link to="/en/developers/learn/accounts/">Accounts</Link>
            <p>Contracts or people on the network</p>

            <Link to="/en/developers/learn/Transactions/">Transactions</Link>
            <p>The way Ethereum state changes</p>

            <Link to="/en/developers/learn/evm/">
              The Ethereum virtual machine (EVM)
            </Link>
            <p>The computer that processes transactions</p>

            <Link to="/en/developers/learn/gas/">Gas</Link>
            <p>Ether needed to power transactions</p>

            <Link to="/en/developers/learn/blocks/">Blocks</Link>
            <p>Batches of transactions added to the blockchain</p>

            <Link to="/en/developers/learn/block-explorers/">
              Block explorers
            </Link>
            <p>Your portal to Ethereum data</p>

            <Link to="/en/developers/learn/mining/">Mining</Link>
            <p>How new blocks are created and consensus is reached</p>

            <Link to="/en/developers/learn/networks/">Networks</Link>
            <p>An overview of mainnet and the test networks</p>

            <Link to="/en/developers/learn/nodes-and-clients/">
              Nodes and clients
            </Link>
            <p>How blocks and transactions are verified in the network</p>
          </Column>
          <Column>
            <h3>The stack</h3>
            <Link to="/en/developers/learn/intro-to-stack/">
              Intro to the stack
            </Link>
            <p>An introduction to the Ethereum stack</p>

            <Link to="/en/developers/learn/smart-contracts/">
              Smart contracts
            </Link>
            <p>The logic behind dapps – self-executing agreements</p>

            <Link to="/en/developers/learn/javascript-client-libraries/">
              Javascript libraries
            </Link>
            <p>Using javascript to interact with smart contracts</p>

            <Link to="/en/developers/learn/security/">Security</Link>
            <p>Security measures to consider during development</p>

            <Link to="/en/developers/learn/storage/">Storage</Link>
            <p>How to handle dapp storage</p>

            <Link to="/en/developers/learn/frameworks/">
              Development frameworks
            </Link>
            <p>Tools for helping speed up development</p>

            <Link to="/en/developers/learn/IDEs/">
              Development environments
            </Link>
            <p>IDEs that are suitable for dapp development</p>

            <h3>Advanced</h3>
            <Link to="/en/developers/learn/tokens/">Token standards</Link>
            <p>An overview of accepted token standards</p>

            <Link to="/en/developers/learn/oracles/">Oracles</Link>
            <p>Getting off-chain data into your smart contracts</p>

            <Link to="/en/developers/learn/scaling/">Scaling</Link>
            <p>Solutions for faster transactions</p>
          </Column>
        </ThreeColumnContent>
      </GrayContainer>
    </EdnPage>
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
