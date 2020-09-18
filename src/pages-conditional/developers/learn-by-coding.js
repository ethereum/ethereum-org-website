import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import { useIntl } from "gatsby-plugin-intl"
import { Twemoji } from "react-emoji-render"

import PageMetadata from "../../components/PageMetadata"
import Translation from "../../components/Translation"
import Button from "../../components/Button"
import Link from "../../components/Link"
import { Mixins } from "../../components/Theme"
import ActionCard from "../../components/ActionCard"
import ProductCard from "../../components/ProductCard"
import {
  Divider,
  Content,
  EdnPage,
} from "../../components/SharedStyledComponents"
import InfoBanner from "../../components/InfoBanner"
import studioGif from "../../assets/ethereum-studio.gif"
import CalloutBanner from "../../components/CalloutBanner"

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 6rem;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.m}) {
    padding-left: 4rem;
    padding-right: 4rem;
  }
  @media screen and (min-width: ${(props) => props.theme.breakpoints.l}) {
    padding-top: 8rem;
    padding-left: 6rem;
    padding-right: 6rem;
  }
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 896px;
  margin-top: -1rem;
`
const H1 = styled.h1`
  color: ${(props) => props.theme.colors.text};
  ${Mixins.textLevel2}
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

const ButtonRow = styled.div`
  display: flex;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column-reverse;
  }
`

const StyledButton = styled(Button)`
  margin-right: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin-right: 0rem;
    margin-bottom: 0.5rem;
  }
`

const LearnSubtitle = styled.p`
  ${Mixins.textLevel4}
  color: ${(props) => props.theme.colors.text200};
  max-width: 45ch;
`

const Gif = styled.img`
  margin-top: 4rem;
`

const H2 = styled.h2`
  margin-top: 4rem;
  margin-bottom: 2rem;

  max-width: 35ch;
  color: ${(props) => props.theme.colors.text};
  line-height: 1.4;
  font-weight: 400;
  font-size: 1.5rem;
`

const TemplateSection = styled.section`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-bottom: 8rem;
  text-align: center;
`

const LearnSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8rem;
  text-align: center;
`

const Card = styled.div`
  margin: 4rem 1rem 0;
  flex: 1;
  min-width: 260px;
  max-width: 400px;

  display: flex;
  flex-direction: column;
`

const CardTitle = styled.h3`
  margin: 0;
`

const CardDescription = styled.p`
  color: ${(props) => props.theme.colors.text200};
  margin: 2rem 0 1rem;
`

const CardLink = styled.div`
  margin-top: auto;
`

const Emoji = styled(Twemoji)`
  & > img {
    width: 3em !important;
    height: 3em !important;
    margin-bottom: 0 !important;
  }
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

const TemplateCard = ({ template }) => (
  <Card>
    <Emoji svg text={template.icon} />
    <div>
      <CardTitle>
        <Translation id={template.title} />
      </CardTitle>
      <CardDescription>
        <Translation id={template.description} />
      </CardDescription>
    </div>
    <CardLink>
      <Link to={template.link.url}>
        <Translation id={template.link.text} />
      </Link>
    </CardLink>
  </Card>
)

const ActionCardContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`

const ResourceCard = styled(ActionCard)`
  flex: 0 1 300px;
`

const templates = [
  {
    title: "page-build-hello-world-title",
    description: "page-build-hello-world-description",
    link: {
      url: "https://studio.ethereum.org/1",
      text: "page-build-hello-world-link-text",
    },
    icon: ":wave:",
  },
  {
    title: "page-build-coin-contract-title",
    description: "page-build-coin-contract-description",
    link: {
      url: "https://studio.ethereum.org/2",
      text: "page-build-coin-contract-link-text",
    },
    icon: ":key:",
  },
  {
    title: "page-build-crypto-pizza-title",
    description: "page-build-crypto-pizza-description",
    link: {
      url: "https://studio.ethereum.org/3",
      text: "page-build-crypto-pizza-link-text",
    },
    icon: ":pizza:",
  },
]

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
    <EdnPage>
      <PageMetadata
        title={intl.formatMessage({ id: "page-build-meta-title" })}
        description={intl.formatMessage({ id: "page-build-meta-description" })}
        image={data.ogImage.childImageSharp.fixed.src}
      />
      <Header>
        <H1>Learn by coding</H1>
        <Subtitle>
          These tools will help you experiment with Ethereum if you prefer a
          more interactive learning experience.
        </Subtitle>
        {/* <Subtitle>
          Would you rather get started in a local development environment?
          <br />
          <Link to="/developers/set-up-local-environment/">
            Choose your stack
          </Link>
          .
        </Subtitle> */}

        {/* <ButtonRow>
          <StyledButton to="https://studio.ethereum.org">
            <Translation id="page-build-try-button" />
          </StyledButton>
          <StyledButton isSecondary to="/en/developers/docs/IDEs/">
            Learn about IDEs
          </StyledButton>
        </ButtonRow> 
        <Gif src={studioGif} loading="eager" alt="Ethereum Studio preview" />
        <Caption>
          <Translation id="page-build-powered-by" />{" "}
          <Link to="https://superblocks.com">Superblocks</Link>
        </Caption>*/}
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
      {/*  <TemplateSection>
        {templates.map((template, idx) => {
          return <TemplateCard key={idx} template={template} />
        })}
      </TemplateSection> */}

      <CalloutBanner
        image={data.learn.childImageSharp.fluid}
        title="Learn with documentation"
        description="Want to learn more? Go to our documentation to find the explanations
          you need."
      >
        <div>
          <Button to="/en/developers/docs/">Browse docs</Button>
        </div>
      </CalloutBanner>

      {/* <LearnSection>
        <h2>
          <Translation id="page-build-learn-more-cta" />
        </h2>
        <LearnSubtitle>
          Want to learn more? Go to our documentation to find the explanations
          you need.
        </LearnSubtitle>
        <Button isSecondary={true} to="/en/developers/docs/">
          <Translation id="learn-more" />
        </Button>
    </LearnSection> */}
    </EdnPage>
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

// TODO get larger ogImage (1200px width)
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
    remix: file(relativePath: { eq: "build/remix.png" }) {
      ...learningToolImage
    }
    ethdotbuild: file(relativePath: { eq: "build/eth-dot-build.png" }) {
      ...learningToolImage
    }
    studio: file(relativePath: { eq: "build/studio.png" }) {
      ...learningToolImage
    }
    ogImage: file(relativePath: { eq: "ethereum-studio-image.png" }) {
      childImageSharp {
        fixed(width: 896) {
          src
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
