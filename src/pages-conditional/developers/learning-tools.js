import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"

import { getDefaultMessage } from "../../utils/translations"
import PageMetadata from "../../components/PageMetadata"
import Translation from "../../components/Translation"
import ButtonLink from "../../components/ButtonLink"
import ProductCard from "../../components/ProductCard"
import InfoBanner from "../../components/InfoBanner"
import CalloutBanner from "../../components/CalloutBanner"
import { Mixins } from "../../theme"
import {
  Content,
  CardGrid,
  Page,
} from "../../components/SharedStyledComponents"

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

const StyledCardGrid = styled(CardGrid)`
  margin-bottom: 2rem;
`

const LearningToolsPage = ({ data }) => {
  const intl = useIntl()

  const sandboxes = [
    {
      name: "Ethereum Studio",
      description: "page-learning-tools-studio-description",
      url: "https://studio.ethereum.org",
      image: data.studio.childImageSharp.fixed,
      alt: "Ethereum Studio",
      background: "#2B2B2B",
    },
    {
      name: "Remix",
      description: "page-learning-tools-remix-description",
      url: "https://remix.ethereum.org",
      image: data.remix.childImageSharp.fixed,
      alt: "Remix",
      background: "#5098D6",
    },
    {
      name: "Eth.build",
      description: "page-learning-tools-eth-dot-build-description",
      url: "https://eth.build/",
      image: data.ethdotbuild.childImageSharp.fixed,
      alt: "eth.build",
      background: "#000000",
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
    },
    {
      name: "Ethernauts",
      description: "page-build-ethernauts-description",
      url: "https://ethernaut.openzeppelin.com/",
      image: data.oz.childImageSharp.fixed,
      alt: "Open Zeppelin Ethernaut",
      background: "#4F62DC",
    },
    {
      name: "Vyper.fun",
      description: "page-build-vyperfun-description",
      url: "https://vyper.fun",
      image: data.vyperfun.childImageSharp.fixed,
      alt: "Vyper.fun",
      background: "#ffffff",
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
        title={intl.formatMessage({
          id: "page-learning-tools-meta-title",
          defaultMessage: getDefaultMessage("page-learning-tools-meta-title"),
        })}
        description={intl.formatMessage({
          id: "page-learning-tools-meta-desc",
          defaultMessage: getDefaultMessage("page-learning-tools-meta-desc"),
        })}
      />
      <Header>
        <H1>
          <Translation id="page-learning-tools-coding" />
        </H1>
        <Subtitle>
          <Translation id="page-learning-tools-coding-subtitle" />
        </Subtitle>
      </Header>
      <StackContainer>
        <SubtitleTwo>
          <Translation id="page-learning-tools-sandbox" />
        </SubtitleTwo>
        <p>
          <Translation id="page-learning-tools-sandbox-desc" />
        </p>
        <StyledCardGrid>
          {sandboxes.map((sandbox, idx) => {
            return (
              <ProductCard
                key={idx}
                background={sandbox.background}
                url={sandbox.url}
                alt={sandbox.alt}
                image={sandbox.image}
                name={sandbox.name}
              >
                <Translation id={sandbox.description} />
              </ProductCard>
            )
          })}
        </StyledCardGrid>
        <InfoBanner emoji=":point_up:" shouldCenter={true}>
          <Translation id="page-learning-tools-remix-description-2" />
        </InfoBanner>
      </StackContainer>
      <StackContainer>
        <SubtitleTwo>
          <Translation id="page-learning-tools-game-tutorials" />
        </SubtitleTwo>
        <p>
          <Translation id="page-learning-tools-game-tutorials-desc" />
        </p>
        <StyledCardGrid>
          {games.map((game, idx) => {
            return (
              <ProductCard
                key={idx}
                background={game.background}
                url={game.url}
                alt={game.alt}
                image={game.image}
                name={game.name}
              >
                <Translation id={game.description} />
              </ProductCard>
            )
          })}
        </StyledCardGrid>
      </StackContainer>
      <StackContainer>
        <SubtitleTwo>
          <Translation id="page-learning-tools-bootcamps" />
        </SubtitleTwo>
        <p>
          <Translation id="page-learning-tools-bootcamps-desc" />
        </p>
        <StyledCardGrid>
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
        </StyledCardGrid>
      </StackContainer>
      <Content>
        <CalloutBanner
          image={data.learn.childImageSharp.fluid}
          title={intl.formatMessage({
            id: "page-learning-tools-documentation",
            defaultMessage: getDefaultMessage(
              "page-learning-tools-documentation"
            ),
          })}
          description={intl.formatMessage({
            id: "page-learning-tools-documentation-desc",
            defaultMessage: getDefaultMessage(
              "page-learning-tools-documentation-desc"
            ),
          })}
        >
          <div>
            <ButtonLink to="/en/developers/docs/">
              <Translation id="page-learning-tools-browse-docs" />
            </ButtonLink>
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
    oz: file(relativePath: { eq: "build/oz.png" }) {
      ...learningToolImage
    }
    vyperfun: file(relativePath: { eq: "build/vyperfun.png" }) {
      ...learningToolImage
    }
    remix: file(relativePath: { eq: "build/remix.png" }) {
      ...learningToolImage
    }
    ethdotbuild: file(relativePath: { eq: "build/eth-dot-build.png" }) {
      ...learningToolImage
    }
    studio: file(relativePath: { eq: "build/studio.png" }) {
      ...learningToolImage
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
