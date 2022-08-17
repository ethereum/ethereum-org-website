import React, { useState } from "react"
import { useIntl } from "react-intl"
import { graphql, PageProps } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "@emotion/styled"

import type { Context } from "../types"

import ActionCard from "../components/ActionCard"
import ButtonLink from "../components/ButtonLink"
import Icon from "../components/Icon"
import CalloutBanner from "../components/CalloutBanner"
import CodeModal from "../components/CodeModal"
import Codeblock from "../components/Codeblock"
import Morpher from "../components/Morpher"
import PageMetadata from "../components/PageMetadata"
import StatsBoxGrid from "../components/StatsBoxGrid"
import Translation from "../components/Translation"
import TitleCardList, { ITitleCardItem } from "../components/TitleCardList"
import {
  CardContainer,
  Content,
  GrayContainer,
  LeftColumn,
} from "../components/SharedStyledComponents"
import { translateMessageId, isLangRightToLeft } from "../utils/translations"
import PreMergeBanner from "../components/PreMergeBanner"

import SimpleWalletContent from "!!raw-loader!../data/SimpleWallet.sol"
import SimpleTokenContent from "!!raw-loader!../data/SimpleToken.sol"
import CreateWalletContent from "!!raw-loader!../data/CreateWallet.js"
import SimpleDomainRegistryContent from "!!raw-loader!../data/SimpleDomainRegistry.sol"

const Hero = styled(GatsbyImage)`
  width: 100%;
  min-height: 380px;
  max-height: 440px;
  background-size: cover;
  background: no-repeat 50px;
  margin-bottom: 2rem;
`

const StyledContent = styled(Content)`
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 1rem;
  }
`

const H1 = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    font-size: 2rem;
  }
`

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  margin: 0 auto;
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 2rem;
  padding: 0 2rem;
`

const ButtonRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const StyledButtonLink = styled(ButtonLink)`
  gap: 0.5rem;
  margin-top: 0rem;
  display: flex;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-top: 1rem;
    margin-left: 0rem;
  }
`

const CodeExampleContent = styled(Content)`
  @media (max-width: ${({ theme }) => theme.breakpoints.s}) {
    padding: 1rem;
  }
`

const CodeboxModal = styled(CodeModal)`
  .modal-component-container {
    padding: 0;
    left: 0;
    right: 0;
    bottom: 0;
    top: 50%;
  }
  .modal-component {
    max-width: 100%;
    max-height: 50%;
    padding: 0rem;
  }
  .modal-component-content {
    margin-top: 3rem;
    width: 100%;
    overflow: auto;
  }
`

const IntroRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  margin-top: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column-reverse;
    margin: 0rem;
  }
`

const RowReverse = styled.div`
  display: flex;
  flex-direction: row-reverse;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    align-items: center;
  }
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    align-items: center;
  }
`

const ImageContainer = styled.div`
  background: "#f1fffd";
  display: flex;
  height: 100%;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 75%;
  }
`

const Description = styled.p`
  color: ${(props) => props.theme.colors.text200};
  max-width: 55ch;
  text-align: center;
  align-self: center;
  font-size: 1.25rem;
  margin-top: 1rem;
`

const StyledGrayContainer = styled(GrayContainer)`
  box-shadow: inset 0px 0px 0px
    ${(props) => props.theme.colors.tableItemBoxShadow};
  padding: 0rem;
  padding-bottom: 4rem;
  margin-top: 0rem;
`
const StyledCard = styled(ActionCard)`
  min-width: 480px;
  margin: 1rem;
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.text};
  background: ${(props) => props.theme.colors.background};
  box-shadow: ${(props) => props.theme.colors.cardBoxShadow};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 0;
    min-width: min(100%, 240px);
  }
`
const Tout = styled(ActionCard)`
  min-width: 400px;
  margin: 1rem;
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.text};
  background: ${(props) => props.theme.colors.background};
  box-shadow: ${(props) => props.theme.colors.cardBoxShadow};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 0;
    min-width: min(100%, 240px);
  }
`
const StyledCardContainer = styled(CardContainer)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin: 0rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    grid-template-columns: 1fr;
  }
`

const IntroImage = styled(GatsbyImage)`
  width: 100%;
  background-size: cover;
  background: no-repeat 50px;
`

const FeatureImage = styled(GatsbyImage)`
  width: 100%;
`

const Subtitle = styled.div`
  margin-bottom: 2rem;
  font-size: 1.25rem;
  line-height: 140%;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    font-size: 1rem;
  }
`

const EthereumIntroContainer = styled.div`
  background: ${(props) => props.theme.colors.homeBoxTurquoise};
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  padding-left: 2rem;
  width: 100%;
  height: 720px;
  margin-top: -1px;
  border-top: 1px solid ${(props) => props.theme.colors.text};
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    height: 100%;
    padding-top: 2rem;
    padding-left: 0rem;
    padding-bottom: 2rem;
  }
`

const FinanceContainer = styled.div`
  background: ${(props) => props.theme.colors.homeBoxOrange};
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 720px;
  margin-top: -1px;
  border-top: 1px solid ${(props) => props.theme.colors.text};
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    height: 100%;
    height: 100%;
    padding-top: 2rem;
    padding-right: 0rem;
    padding-bottom: 2rem;
  }
`

const NftContainer = styled.div`
  background: ${(props) => props.theme.colors.homeBoxMint};
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 720px;
  margin-top: -1px;
  border-top: 1px solid ${(props) => props.theme.colors.text};
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    height: 100%;
    height: 100%;
    padding-top: 2rem;
    padding-right: 0rem;
    padding-bottom: 2rem;
  }
`

const InternetContainer = styled.div`
  background: ${(props) => props.theme.colors.homeBoxPink};
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  padding-left: 2rem;
  height: 720px;
  width: 100%;
  margin-top: -1px;
  margin-bottom: 0rem;
  border-top: 1px solid ${(props) => props.theme.colors.text};
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    height: 100%;
    padding-top: 2rem;
    padding-left: 0rem;
    padding-bottom: 2rem;
  }
`

const DeveloperContainer = styled.div`
  background: ${(props) => props.theme.colors.homeBoxPurple};
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 720px;
  width: 100%;
  margin-top: -1px;
  border-top: 1px solid ${(props) => props.theme.colors.text};
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    height: 100%;
  }
`

const FeatureContent = styled(LeftColumn)`
  padding: 6rem;
  height: 100%;
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 2rem;
  }
`

const LeftColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const IntroLeftColumn = styled(LeftColumn)`
  padding: 6rem;
  height: 100%;
  width: 100%;
  margin: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 2rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    padding: 0rem;
  }
`

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
  }
  &:hover {
    fill: ${(props) => props.theme.colors.primary};
  }
  &:active {
    fill: ${(props) => props.theme.colors.primary};
  }
  &:focus {
    fill: ${(props) => props.theme.colors.primary};
  }
`

const H2 = styled.h2`
  margin: 0 0 1.5rem;
`

const StyledH2 = styled.h2`
  margin-bottom: 0.5rem;
  font-family: sans-serif;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    font-size: 1.5rem;
  }
`

const StyledCardList = styled(TitleCardList)`
  margin-left: 4rem;
  max-width: 624px;
  border: 1px solid ${(props) => props.theme.colors.text};
  box-shadow: ${(props) => props.theme.colors.cardBoxShadow};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-left: 0rem;
    max-width: 100%;
  }
`

const StyledCalloutBanner = styled(CalloutBanner)`
  margin: 8rem 0 4rem;
  padding: 2rem 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-bottom: 4rem;
    padding: 2rem;
  }
`

const HomePage = ({
  data,
  pageContext: { language = "en" },
}: PageProps<Queries.IndexPageQuery, Context>) => {
  const intl = useIntl()
  const [isModalOpen, setModalOpen] = useState(false)
  const [activeCode, setActiveCode] = useState(0)
  const dir = isLangRightToLeft(language) ? "rtl" : "ltr"

  const toggleCodeExample = (id: number): void => {
    setActiveCode(id)
    setModalOpen(true)
  }
  const cards = [
    {
      image: getImage(data.robotfixed),
      title: translateMessageId("page-index-get-started-wallet-title", intl),
      description: translateMessageId(
        "page-index-get-started-wallet-description",
        intl
      ),
      alt: translateMessageId("page-index-get-started-wallet-image-alt", intl),
      to: "/wallets/find-wallet/",
    },
    {
      image: getImage(data.ethfixed),
      title: translateMessageId("page-index-get-started-eth-title", intl),
      description: translateMessageId(
        "page-index-get-started-eth-description",
        intl
      ),
      alt: translateMessageId("page-index-get-started-eth-image-alt", intl),
      to: "/get-eth/",
    },
    {
      image: getImage(data.dogefixed),
      title: translateMessageId("page-index-get-started-dapps-title", intl),
      description: translateMessageId(
        "page-index-get-started-dapps-description",
        intl
      ),
      alt: translateMessageId("page-index-get-started-dapps-image-alt", intl),
      to: "/dapps/",
    },
    {
      image: getImage(data.devfixed),
      title: translateMessageId("page-index-get-started-devs-title", intl),
      description: translateMessageId(
        "page-index-get-started-devs-description",
        intl
      ),
      alt: translateMessageId("page-index-get-started-devs-image-alt", intl),
      to: "/developers/",
    },
  ]

  const touts = [
    {
      image: getImage(data.merge),
      alt: translateMessageId("page-index-tout-upgrades-image-alt", intl),
      title: translateMessageId("page-index-tout-upgrades-title", intl),
      description: translateMessageId(
        "page-index-tout-upgrades-description",
        intl
      ),
      to: "/upgrades/",
    },
    {
      image: getImage(data.infrastructurefixed),
      alt: translateMessageId("page-index-tout-enterprise-image-alt", intl),
      title: translateMessageId("page-index-tout-enterprise-title", intl),
      description: translateMessageId(
        "page-index-tout-enterprise-description",
        intl
      ),
      to: "/enterprise/",
    },
    {
      image: getImage(data.enterprise),
      alt: translateMessageId("page-index-tout-community-image-alt", intl),
      title: translateMessageId("page-index-tout-community-title", intl),
      description: translateMessageId(
        "page-index-tout-community-description",
        intl
      ),
      to: "/community/",
    },
  ]

  interface CodeExample extends ITitleCardItem {
    codeLanguage: string
    code: string
  }

  const codeExamples: Array<CodeExample> = [
    {
      title: translateMessageId(
        "page-index-developers-code-example-title-0",
        intl
      ),
      description: translateMessageId(
        "page-index-developers-code-example-description-0",
        intl
      ),
      codeLanguage: "language-solidity",
      code: SimpleWalletContent,
    },
    {
      title: translateMessageId(
        "page-index-developers-code-example-title-1",
        intl
      ),
      description: translateMessageId(
        "page-index-developers-code-example-description-1",
        intl
      ),
      codeLanguage: "language-solidity",
      code: SimpleTokenContent,
    },
    {
      title: translateMessageId(
        "page-index-developers-code-example-title-2",
        intl
      ),
      description: translateMessageId(
        "page-index-developers-code-example-description-2",
        intl
      ),
      codeLanguage: "language-javascript",
      code: CreateWalletContent,
    },
    {
      title: translateMessageId(
        "page-index-developers-code-example-title-3",
        intl
      ),
      description: translateMessageId(
        "page-index-developers-code-example-description-3",
        intl
      ),
      codeLanguage: "language-solidity",
      code: SimpleDomainRegistryContent,
    },
  ]

  return (
    <Page dir={dir}>
      <PageMetadata
        title={translateMessageId("page-index-meta-title", intl)}
        description={translateMessageId("page-index-meta-description", intl)}
      />
      <PreMergeBanner announcementOnly />
      <Hero
        image={getImage(data.hero)!}
        alt={translateMessageId("page-index-hero-image-alt", intl)}
        loading="eager"
      />
      <Morpher />
      <Header>
        <H1>
          <Translation id="page-index-title" />
        </H1>
        <Description>
          <Translation id="page-index-description" />
        </Description>
        <ButtonLink isSecondary to="/learn/">
          <Translation id="page-index-title-button" />
        </ButtonLink>
      </Header>
      <StyledGrayContainer>
        <StyledContent>
          <IntroRow>
            <IntroLeftColumn>
              <H2>
                <Translation id="page-index-get-started" />
              </H2>
              <Subtitle>
                <Translation id="page-index-get-started-description" />
              </Subtitle>
            </IntroLeftColumn>
            <ImageContainer>
              <IntroImage
                image={getImage(data.hackathon)!}
                alt={translateMessageId(
                  "page-index-get-started-image-alt",
                  intl
                )}
              />
            </ImageContainer>
          </IntroRow>
          <StyledCardContainer>
            {cards.map((card, idx) => (
              <StyledCard
                key={idx}
                title={card.title}
                description={card.description}
                to={card.to}
                image={card.image}
                alt={card.alt}
              />
            ))}
          </StyledCardContainer>
        </StyledContent>
      </StyledGrayContainer>
      <EthereumIntroContainer>
        <RowReverse>
          <FeatureContent>
            <StyledH2>
              <Translation id="page-index-what-is-ethereum" />
            </StyledH2>
            <Subtitle>
              <Translation id="page-index-what-is-ethereum-description" />
            </Subtitle>
            <ButtonRow>
              <ButtonLink to="/what-is-ethereum/">
                <Translation id="page-index-what-is-ethereum-button" />
              </ButtonLink>
              <StyledButtonLink isSecondary to="/eth/">
                <Translation id="page-index-what-is-ethereum-secondary-button" />
              </StyledButtonLink>
            </ButtonRow>
          </FeatureContent>
          <ImageContainer>
            <FeatureImage
              image={getImage(data.ethereum)!}
              alt={translateMessageId(
                "page-index-what-is-ethereum-image-alt",
                intl
              )}
            />
          </ImageContainer>
        </RowReverse>
      </EthereumIntroContainer>
      <FinanceContainer>
        <Row>
          <FeatureContent>
            <LeftColumnContent>
              <StyledH2>
                <Translation id="page-index-defi" />
              </StyledH2>
              <Subtitle>
                <Translation id="page-index-defi-description" />
              </Subtitle>
              <div>
                <ButtonLink to="/defi/">
                  <Translation id="page-index-defi-button" />
                </ButtonLink>
              </div>
            </LeftColumnContent>
          </FeatureContent>
          <ImageContainer>
            <FeatureImage
              image={getImage(data.impact)!}
              alt={translateMessageId("page-index-defi-image-alt", intl)}
            />
          </ImageContainer>
        </Row>
      </FinanceContainer>
      <NftContainer>
        <Row>
          <ImageContainer>
            <FeatureImage
              image={getImage(data.infrastructure)!}
              alt={translateMessageId("page-index-nft-alt", intl)}
            />
          </ImageContainer>
          <FeatureContent>
            <LeftColumnContent>
              <StyledH2>
                <Translation id="page-index-nft" />
              </StyledH2>
              <Subtitle>
                <Translation id="page-index-nft-description" />
              </Subtitle>
              <div>
                <ButtonLink to="/nft/">
                  <Translation id="page-index-nft-button" />
                </ButtonLink>
              </div>
            </LeftColumnContent>
          </FeatureContent>
        </Row>
      </NftContainer>
      <InternetContainer>
        <Row>
          <FeatureContent>
            <LeftColumnContent>
              <StyledH2>
                <Translation id="page-index-internet" />
              </StyledH2>
              <Subtitle>
                <Translation id="page-index-internet-description" />
              </Subtitle>
              <ButtonRow>
                <ButtonLink to="/dapps/?category=technology">
                  <Translation id="page-index-internet-button" />
                </ButtonLink>
                <StyledButtonLink isSecondary to="/wallets/">
                  <Translation id="page-index-internet-secondary-button" />
                </StyledButtonLink>
              </ButtonRow>
            </LeftColumnContent>
          </FeatureContent>
          <ImageContainer>
            <FeatureImage
              image={getImage(data.future)!}
              alt={translateMessageId("page-index-internet-image-alt", intl)}
            />
          </ImageContainer>
        </Row>
      </InternetContainer>
      <DeveloperContainer>
        <CodeExampleContent>
          <StyledCardList
            content={codeExamples}
            clickHandler={toggleCodeExample}
            headerKey="page-index-developers-code-examples"
            icon="code"
            isCode
          />
        </CodeExampleContent>
        <FeatureContent>
          <LeftColumnContent>
            <StyledH2>
              <Translation id="page-index-developers" />
            </StyledH2>
            <Subtitle>
              <Translation id="page-index-developers-description" />
            </Subtitle>
            <ButtonRow>
              <ButtonLink to="/developers/">
                <Translation id="page-index-developers-button" />
              </ButtonLink>
            </ButtonRow>
          </LeftColumnContent>
        </FeatureContent>
        <CodeboxModal
          isOpen={isModalOpen}
          setIsOpen={setModalOpen}
          title={codeExamples[activeCode].title}
        >
          <Codeblock
            codeLanguage={codeExamples[activeCode].codeLanguage}
            allowCollapse={false}
            fromHomepage
          >
            {codeExamples[activeCode].code}
          </Codeblock>
        </CodeboxModal>
      </DeveloperContainer>
      <StyledGrayContainer>
        <StyledContent>
          <h2>
            <Translation id="page-index-network-stats-title" />
          </h2>
          <Subtitle>
            <Translation id="page-index-network-stats-subtitle" />
          </Subtitle>
        </StyledContent>
        <StatsBoxGrid />
      </StyledGrayContainer>
      <StyledContent>
        <h2>
          <Translation id="page-index-touts-header" />
        </h2>
      </StyledContent>
      <StyledContent>
        <StyledCardContainer>
          {touts.map((tout, idx) => {
            return (
              <Tout
                key={idx}
                title={tout.title}
                description={tout.description}
                alt={tout.alt}
                to={tout.to}
                image={tout.image}
              />
            )
          })}
        </StyledCardContainer>
        <StyledCalloutBanner
          titleKey={"page-index-contribution-banner-title"}
          descriptionKey={"page-index-contribution-banner-description"}
          image={getImage(data.finance)}
          maxImageWidth={600}
          alt={translateMessageId(
            "page-index-contribution-banner-image-alt",
            intl
          )}
        >
          <ButtonRow>
            <ButtonLink to="/contributing/">
              <Translation id="page-index-contribution-banner-button" />
            </ButtonLink>
            <StyledButtonLink
              isSecondary
              to="https://github.com/ethereum/ethereum-org-website"
            >
              <StyledIcon name="github" /> GitHub
            </StyledButtonLink>
          </ButtonRow>
        </StyledCalloutBanner>
      </StyledContent>
    </Page>
  )
}

export default HomePage

export const query = graphql`
  query IndexPage {
    hero: file(relativePath: { eq: "home/hero.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    ethereum: file(relativePath: { eq: "what-is-ethereum.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    enterprise: file(relativePath: { eq: "enterprise-eth.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 320
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    dogefixed: file(relativePath: { eq: "doge-computer.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 320
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    robotfixed: file(relativePath: { eq: "wallet-cropped.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 320
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    ethfixed: file(relativePath: { eq: "eth.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 320
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    devfixed: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 320
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    future: file(relativePath: { eq: "future_transparent.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    impact: file(relativePath: { eq: "impact_transparent.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    finance: file(relativePath: { eq: "finance_transparent.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 600
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    hackathon: file(relativePath: { eq: "hackathon_transparent.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    infrastructure: file(
      relativePath: { eq: "infrastructure_transparent.png" }
    ) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    infrastructurefixed: file(
      relativePath: { eq: "infrastructure_transparent.png" }
    ) {
      childImageSharp {
        gatsbyImageData(
          width: 320
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    merge: file(relativePath: { eq: "upgrades/merge.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 320
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
  }
`
