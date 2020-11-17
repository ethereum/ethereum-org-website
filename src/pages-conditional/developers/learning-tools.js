import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import PageMetadata from "../../components/PageMetadata"
import Translation from "../../components/Translation"
import ButtonLink from "../../components/ButtonLink"
import ProductCard from "../../components/ProductCard"
import { Content, Page } from "../../components/SharedStyledComponents"
import InfoBanner from "../../components/InfoBanner"
import CalloutBanner from "../../components/CalloutBanner"
import { Mixins } from "../../theme"

const StyledPage = styled(Page)`
  margin-top: 4rem;
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 896px;
  padding: 0 2rem;
`
const H1 = styled.h1`
  ${Mixins.textLevel2}
  margin-top: 0;
  color: ${(props) => props.theme.colors.text};
  font-style: normal;
  font-weight: normal;
  font-family: "SFMono-Regular", monospace;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 32px;
  line-height: 140%;
  text-align: center;
  margin-bottom: 0rem;
`

const Subtitle = styled.h2`
  ${Mixins.textLevel4}
  color: ${(props) => props.theme.colors.text300};
  max-width: 55ch;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
`

const SubtitleTwo = styled(Subtitle)`
  margin-top: 0rem;
`

const StackContainer = styled(Content)`
  border: 1px solid ${(props) => props.theme.colors.border};
  justify-content: flex-start;
  border-radius: 4px;
  padding: 3rem 2rem;
  margin: 2rem;
  width: 96%;
  background: ${(props) => props.theme.colors.ednBackground};
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    width: 100%;
    margin-left: 0rem;
    margin-right: 0rem;
    border-radius: 0px;
  }
`

const ActionCardContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`

const LearningToolsPage = ({ data }) => {
  const sandboxes = [
    {
      name: "Ethereum Studio",
      description: "page-learning-tools-studio-description",
      url: "https://studio.ethereum.org",
      image: data.studio.childImageSharp.fixed,
      alt: "Ethereum Studio",
      background: "#2B2B2B",
      gitHubUrl: "https://github.com/SuperblocksHQ/ethereum-studio",
      gitHubRepo: data.studioGitHub.repository,
      subjects: ["Solidity"],
    },
    {
      name: "Remix",
      description: "page-learning-tools-remix-description",
      url: "https://remix.ethereum.org",
      image: data.remix.childImageSharp.fixed,
      alt: "Remix",
      background: "#5098D6",
      gitHubUrl: "https://github.com/ethereum/remix-project",
      gitHubRepo: data.remixGitHub.repository,
      subjects: ["Solidity", "Vyper"],
    },
    {
      name: "Eth.build",
      description: "page-learning-tools-eth-dot-build-description",
      url: "https://eth.build/",
      image: data.ethdotbuild.childImageSharp.fixed,
      alt: "eth.build",
      background: "#000000",
      gitHubUrl: "https://github.com/austintgriffith/eth.build",
      gitHubRepo: data.ethdotbuildGitHub.repository,
      subjects: ["web3"],
    },
  ]

  const games = [
    {
      name: "CryptoZombies",
      description: "page-build-cryptozombies-description",
      url: "https://cryptozombies.io/en/solidity",
      image: data.cryptoZombie.childImageSharp.fixed,
      alt: "CryptoZombies",
      background: "#2B2F48",
      gitHubUrl: "https://github.com/loomnetwork/cryptozombie-lessons",
      gitHubRepo: data.cryptoZombieGitHub.repository,
    },
    {
      name: "Ethernauts",
      description: "page-build-ethernauts-description",
      url: "https://ethernaut.openzeppelin.com/",
      image: data.oz.childImageSharp.fixed,
      alt: "Open Zeppelin Ethernaut",
      background: "#4F62DC",
      gitHubUrl: "https://github.com/OpenZeppelin/ethernaut",
      gitHubRepo: data.ozGitHub.repository,
    },
    {
      name: "Vyper.fun",
      description: "page-build-vyperfun-description",
      url: "https://vyper.fun",
      image: data.vyperfun.childImageSharp.fixed,
      alt: "Vyper.fun",
      background: "#ffffff",
      gitHubUrl: "https://github.com/vyperfun/vyper.fun",
      gitHubRepo: data.vyperfunGitHub.repository,
    },
  ]

  const bootcamps = [
    {
      name: "ChainShot",
      description: "page-build-chainshot-description",
      url: "https://www.chainshot.com",
      image: data.chainshot.childImageSharp.fixed,
      alt: "ChainShot",
      background: "#111F29",
    },
    {
      name: "ConsenSys Academy",
      description: "page-build-consensys-academy-description",
      url: "https://consensys.net/academy/bootcamp/",
      image: data.consensys.childImageSharp.fixed,
      alt: "ConsenSys Academy",
      background: "#F6F7F9",
    },
  ]

  return (
    <StyledPage>
      <PageMetadata
        title="Developer learning tools"
        description="Web-based coding tools and interactive learning experiences to help you experiment with Ethereum development."
      />
      <Header>
        <H1>Learn by coding</H1>
        <Subtitle>
          These tools will help you experiment with Ethereum if you prefer a
          more interactive learning experience.
        </Subtitle>
      </Header>
      <StackContainer>
        <SubtitleTwo>Code sandboxes</SubtitleTwo>
        <p>
          These sandboxes will give you a space to experiment with writing smart
          contracts and understanding Ethereum.
        </p>
        <ActionCardContainer>
          {sandboxes.map((sandbox, idx) => {
            return (
              <ProductCard
                key={idx}
                background={sandbox.background}
                url={sandbox.url}
                alt={sandbox.alt}
                image={sandbox.image}
                name={sandbox.name}
                gitHubUrl={sandbox.gitHubUrl}
                gitHubRepo={sandbox.gitHubRepo}
                subjects={sandbox.subjects}
              >
                <Translation id={sandbox.description} />
              </ProductCard>
            )
          })}
        </ActionCardContainer>
        <InfoBanner emoji=":point_up:">
          Remix is not just a sandbox. Many developers write, compile and deploy
          their smart contracts using Remix.
        </InfoBanner>
      </StackContainer>
      <StackContainer>
        <SubtitleTwo>Interactive game tutorials</SubtitleTwo>
        <p>
          Learn while you play. These tutorials get you through the basics using
          gameplay.
        </p>
        <ActionCardContainer>
          {games.map((game, idx) => {
            return (
              <ProductCard
                key={idx}
                background={game.background}
                url={game.url}
                alt={game.alt}
                image={game.image}
                name={game.name}
                gitHubUrl={game.gitHubUrl}
                gitHubRepo={game.gitHubRepo}
              >
                <Translation id={game.description} />
              </ProductCard>
            )
          })}
        </ActionCardContainer>
      </StackContainer>
      <StackContainer>
        <SubtitleTwo>Developer bootcamps</SubtitleTwo>
        <p>Paid online courses to get you up to speed, fast.</p>
        <ActionCardContainer>
          {bootcamps.map((bootcamp, idx) => {
            return (
              <ProductCard
                key={idx}
                url={bootcamp.url}
                background={bootcamp.background}
                alt={bootcamp.alt}
                image={bootcamp.image}
                name={bootcamp.name}
              >
                <Translation id={bootcamp.description} />
              </ProductCard>
            )
          })}
        </ActionCardContainer>
      </StackContainer>
      <Content>
        <CalloutBanner
          image={data.learn.childImageSharp.fluid}
          title="Learn with documentation"
          description="Want to learn more? Go to our documentation to find the explanations
          you need."
        >
          <div>
            <ButtonLink to="/en/developers/docs/">Browse docs</ButtonLink>
          </div>
        </CalloutBanner>
      </Content>
    </StyledPage>
  )
}

export default LearningToolsPage

export const learningToolImage = graphql`
  fragment learningToolImage on File {
    childImageSharp {
      fixed(height: 100, quality: 100) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const learningToolLanguages = graphql`
  fragment learningToolLanguages on GitHub_LanguageConnection {
    nodes {
      name
    }
  }
`

export const query = graphql`
  query {
    zeroX: file(relativePath: { eq: "build/0x.png" }) {
      ...learningToolImage
    }
    chainshot: file(relativePath: { eq: "build/chainshot.png" }) {
      ...learningToolImage
    }
    consensys: file(relativePath: { eq: "build/consensys.png" }) {
      ...learningToolImage
    }
    cryptoZombie: file(relativePath: { eq: "build/crypto-zombie.png" }) {
      ...learningToolImage
    }
    cryptoZombieGitHub: github {
      repository(owner: "loomnetwork", name: "cryptozombie-lessons") {
        stargazerCount
        languages(orderBy: { field: SIZE, direction: DESC }, first: 2) {
          ...devtoolLanguages
        }
      }
    }
    oz: file(relativePath: { eq: "build/oz.png" }) {
      ...learningToolImage
    }
    ozGitHub: github {
      repository(owner: "OpenZeppelin", name: "ethernaut") {
        stargazerCount
        languages(orderBy: { field: SIZE, direction: DESC }, first: 2) {
          ...devtoolLanguages
        }
      }
    }
    vyperfun: file(relativePath: { eq: "build/vyperfun.png" }) {
      ...learningToolImage
    }
    vyperfunGitHub: github {
      repository(owner: "vyperfun", name: "vyper.fun") {
        stargazerCount
        languages(orderBy: { field: SIZE, direction: DESC }, first: 2) {
          ...devtoolLanguages
        }
      }
    }
    remix: file(relativePath: { eq: "build/remix.png" }) {
      ...learningToolImage
    }
    remixGitHub: github {
      repository(owner: "ethereum", name: "remix-project") {
        stargazerCount
        languages(orderBy: { field: SIZE, direction: DESC }, first: 2) {
          ...devtoolLanguages
        }
      }
    }
    ethdotbuild: file(relativePath: { eq: "build/eth-dot-build.png" }) {
      ...learningToolImage
    }
    ethdotbuildGitHub: github {
      repository(owner: "austintgriffith", name: "eth.build") {
        stargazerCount
        languages(orderBy: { field: SIZE, direction: DESC }, first: 2) {
          ...devtoolLanguages
        }
      }
    }
    studio: file(relativePath: { eq: "build/studio.png" }) {
      ...learningToolImage
    }
    studioGitHub: github {
      repository(owner: "SuperblocksHQ", name: "ethereum-studio") {
        stargazerCount
        languages(orderBy: { field: SIZE, direction: DESC }, first: 2) {
          ...devtoolLanguages
        }
      }
    }
    learn: file(relativePath: { eq: "enterprise-eth.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
