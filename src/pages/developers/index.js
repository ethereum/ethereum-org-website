import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"

import { translateMessageId } from "../../utils/translations"
import Card from "../../components/Card"
import Callout from "../../components/Callout"
import Link from "../../components/Link"
import Translation from "../../components/Translation"

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
  margin-top: 0rem;
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
    title: <Translation id="page-developers-learn" />,
    description: <Translation id="page-developers-learn-desc" />,
    url: "/developers/docs/",
    button: <Translation id="page-developers-read-docs" />,
  },
  {
    emoji: ":woman_teacher:",
    title: <Translation id="page-developers-learn-tutorials" />,

    description: <Translation id="page-developers-learn-tutorials-desc" />,
    url: "/developers/tutorials/",
    button: <Translation id="page-developers-learn-tutorials-cta" />,
  },
  {
    emoji: ":woman_scientist:",
    title: <Translation id="page-developers-start" />,
    description: <Translation id="page-developers-start-desc" />,
    url: "/developers/learning-tools/",
    button: <Translation id="page-developers-play-code" />,
  },
  {
    emoji: ":construction_worker:",
    title: <Translation id="page-developers-set-up" />,
    description: <Translation id="page-developers-setup-desc" />,
    url: "/developers/local-environment/",
    button: <Translation id="page-developers-choose-stack" />,
  },
]

const DevelopersPage = ({ data }) => {
  const intl = useIntl()

  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-developer-meta-title", intl)}
        description={translateMessageId("page-developers-meta-desc", intl)}
      />
      <Content>
        <HeroContainer>
          <HeroCopyContainer>
            <HeroCopy>
              <H1>
                <b>
                  <Translation id="page-developers-title-1" />
                </b>
                <br />
                <Translation id="page-developers-title-2" />
                <br /> <Translation id="page-developers-title-3" />
              </H1>
              <Subtitle>
                <Translation id="page-developers-subtitle" />
              </Subtitle>
            </HeroCopy>
          </HeroCopyContainer>
          <Hero
            fluid={data.ednHero.childImageSharp.fluid}
            alt={translateMessageId("alt-eth-blocks", intl)}
            loading="eager"
          />
        </HeroContainer>
        <MonoSubtitle>
          <Translation id="page-developers-get-started" />
        </MonoSubtitle>
        <StyledCardContainer>
          {paths.map((path, idx) => (
            <StyledCard
              key={idx}
              emoji={path.emoji}
              title={path.title}
              description={path.description}
            >
              <ButtonLink to={path.url}>{path.button}</ButtonLink>
            </StyledCard>
          ))}
        </StyledCardContainer>
        <TwoColumnContent>
          <IntroColumn>
            <h2>
              <Translation id="page-developers-about" />
            </h2>
            <SubtitleWithMargin>
              <Translation id="page-developers-about-desc" />
            </SubtitleWithMargin>
            <p>
              <Translation id="page-developers-about-desc-2" />
            </p>
            <p>
              <Translation id="page-developers-feedback" />{" "}
              <Link to="https://discord.gg/CetY6Y4">
                <Translation id="page-developers-discord" />
              </Link>
            </p>
          </IntroColumn>
          <StyledCallout
            image={data.developers.childImageSharp.fixed}
            title={translateMessageId("page-developers-improve-ethereum", intl)}
            description={translateMessageId(
              "page-developers-improve-ethereum-desc",
              intl
            )}
            alt={translateMessageId("alt-eth-blocks", intl)}
          >
            <div>
              <ButtonLink to="https://github.com/ethereum/ethereum-org-website">
                <Translation id="page-developers-contribute" />
              </ButtonLink>
            </div>
          </StyledCallout>
        </TwoColumnContent>
      </Content>
      <GrayContainer>
        <Content>
          <h2>
            <Translation id="page-developers-explore-documentation" />
          </h2>
        </Content>
        {/* TODO use the same source as SideNav for these sections */}
        <ThreeColumnContent>
          <Column>
            <h3>
              <Translation id="page-developers-docs-introductions" />
            </h3>
            <Link to="/developers/docs/intro-to-ethereum/">
              <Translation id="page-developers-intro-eth-link" />
            </Link>
            <p>
              <Translation id="page-developers-into-eth-desc" />
            </p>

            <Link to="/developers/docs/intro-to-ether/">
              <Translation id="page-developers-intro-ether-link" />
            </Link>
            <p>
              <Translation id="page-developers-intro-ether-desc" />
            </p>

            <Link to="/developers/docs/dapps/">
              <Translation id="page-developers-intro-dapps-link" />
            </Link>
            <p>
              <Translation id="page-developers-intro-dapps-desc" />
            </p>

            <Link to="/developers/docs/ethereum-stack/">
              <Translation id="page-developers-intro-stack" />
            </Link>
            <p>
              <Translation id="page-developers-intro-stack-desc" />
            </p>

            <Link to="/developers/docs/web2-vs-web3/">
              <Translation id="page-developers-web3-link" />
            </Link>
            <p>
              <Translation id="page-developers-web3-desc" />
            </p>

            <Link to="/developers/docs/programming-languages/">
              <Translation id="page-developers-languages" />
            </Link>
            <p>
              <Translation id="page-developers-language-desc" />
            </p>
            <ImageContainer>
              <Image fixed={data.doge.childImageSharp.fixed} />
            </ImageContainer>
          </Column>
          <Column>
            <h3>
              <Translation id="page-developers-fundamentals" />
            </h3>
            <Link to="/developers/docs/accounts/">
              <Translation id="page-developers-accounts-link" />
            </Link>
            <p>
              <Translation id="page-developers-account-desc" />
            </p>

            <Link to="/developers/docs/transactions/">
              <Translation id="page-developers-transactions-link" />
            </Link>
            <p>
              <Translation id="page-developers-transactions-desc" />
            </p>

            <Link to="/developers/docs/blocks/">
              <Translation id="page-developers-blocks-link" />
            </Link>
            <p>
              <Translation id="page-developers-block-desc" />
            </p>

            <Link to="/developers/docs/evm/">
              <Translation id="page-developers-evm-link" />
            </Link>
            <p>
              <Translation id="page-developers-evm-desc" />
            </p>

            <Link to="/developers/docs/gas/">
              <Translation id="page-developers-gas-link" />
            </Link>
            <p>
              <Translation id="page-developers-gas-desc" />
            </p>

            <Link to="/developers/docs/nodes-and-clients/">
              <Translation id="page-developers-node-clients-link" />
            </Link>
            <p>
              <Translation id="page-developers-node-clients-desc" />
            </p>

            <Link to="/developers/docs/networks/">
              <Translation id="page-developers-networks-link" />
            </Link>
            <p>
              <Translation id="page-developers-networks-desc" />
            </p>

            <Link to="/developers/docs/consensus-mechanisms/pow/mining/">
              <Translation id="page-developers-mining-link" />
            </Link>
            <p>
              <Translation id="page-developers-mining-desc" />
            </p>
          </Column>
          <RightColumn>
            <h3>
              <Translation id="page-developers-stack" />
            </h3>
            <Link to="/developers/docs/smart-contracts/">
              <Translation id="page-developers-smart-contracts-link" />
            </Link>
            <p>
              <Translation id="page-developers-smart-contracts-desc" />
            </p>

            <Link to="/developers/docs/frameworks/">
              <Translation id="page-developers-frameworks-link" />
            </Link>
            <p>
              <Translation id="page-developers-frameworks-desc" />
            </p>

            <Link to="/developers/docs/apis/javascript/">
              <Translation id="page-developers-js-libraries-link" />
            </Link>
            <p>
              <Translation id="page-developers-js-libraries-desc" />
            </p>

            <Link to="/developers/docs/apis/backend/">
              <Translation id="page-developers-api-link" />
            </Link>
            <p>
              <Translation id="page-developers-api-desc" />
            </p>

            <Link to="/developers/docs/data-and-analytics/block-explorers/">
              <Translation id="page-developers-block-explorers-link" />
            </Link>
            <p>
              <Translation id="page-developers-block-explorers-desc" />
            </p>

            <Link to="/developers/docs/security/">
              <Translation id="page-developers-security-link" />
            </Link>
            <p>
              <Translation id="page-developers-security-desc" />
            </p>

            <Link to="/developers/docs/storage/">
              <Translation id="page-developers-storage-link" />
            </Link>
            <p>
              <Translation id="page-developers-storage-desc" />
            </p>

            <Link to="/developers/docs/ides/">
              <Translation id="page-developers-dev-env-link" />
            </Link>
            <p>
              <Translation id="page-developers-dev-env-desc" />
            </p>

            <h3>
              <Translation id="page-developers-advanced" />
            </h3>
            <Link to="/developers/docs/standards/tokens/">
              <Translation id="page-developers-token-standards-link" />
            </Link>
            <p>
              <Translation id="page-developers-token-standards-desc" />
            </p>

            <Link to="/developers/docs/mev/">
              <Translation id="page-developers-mev-link" />
            </Link>
            <p>
              <Translation id="page-developers-mev-desc" />
            </p>

            <Link to="/developers/docs/oracles/">
              <Translation id="page-developers-oracles-link" />
            </Link>
            <p>
              <Translation id="page-developers-oracle-desc" />
            </p>

            <Link to="/developers/docs/scaling/">
              <Translation id="page-developers-scaling-link" />
            </Link>
            <p>
              <Translation id="page-developers-scaling-desc" />
            </p>
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
