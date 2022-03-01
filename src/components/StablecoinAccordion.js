import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { useIntl, navigate } from "gatsby-plugin-intl"
import styled from "styled-components"
// TODO add motion animation
// import { motion } from "framer-motion"
import ButtonLink from "./ButtonLink"
import CardList from "./CardList"
import Emoji from "./Emoji"
import Link from "./Link"
import Icon from "./Icon"
import InfoBanner from "./InfoBanner"
import Pill from "./Pill"
import Translation from "./Translation"
import {
  FakeLink,
  TwoColumnContent,
  LeftColumn,
  RightColumn,
} from "./SharedStyledComponents"

import { translateMessageId } from "../utils/translations"
import { isMobile } from "../utils/isMobile"

const Card = styled.div`
  border-radius: 2px;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Content = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme.colors.border};
  &:hover {
    background-color: ${(props) => props.theme.colors.ednBackground};
  }
`

const ChildrenContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.ednBackground};
  border: 1px solid ${(props) => props.theme.colors.border};
  margin-top: -1px;
  margin-bottom: -1px;
`

const StyledTwoColumnContent = styled(TwoColumnContent)`
  padding: 2rem;
  align-items: flex-start;
  margin-bottom: 0rem;
`

const Title = styled.h3`
  margin-top: 0rem;
  margin-bottom: 0rem;
`

const TextPreview = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.text200};
  margin-bottom: 0rem;
`

const StyledTextPreview = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.text200};
  margin-bottom: 0rem;
  margin-top: 0.75rem;
`

const Question = styled.div``

const ButtonContainer = styled.div`
  margin-right: 1.5rem;
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem;
  margin-right: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    align-items: flex-start;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const StyledEmoji = styled(Emoji)`
  margin-right: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-bottom: 0.5rem;
    width: 3rem;
  }
`

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`

const StyledPill = styled(Pill)`
  margin-left: 1rem;
`

const StyledIcon = styled(Icon)`
  margin-left: 1rem;
  min-width: 24px;
`

const SectionTitle = styled.h4`
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
  margin-top: 0rem;
`
const StepboxTitle = styled.span`
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  text-align: left;
`

const P = styled.p`
  font-size: 1rem;
  margin-bottom: 0rem;
`

// Todo create component
const StepBoxContainer = styled.div`
  width: 100%;
  margin: 1rem 0rem;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-wrap: wrap;
  }
`

const StepBox = styled(Link)`
  border: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.background};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.text};
  text-decoration: none;
  width: 100%;
  margin-top: -1px;
  &:hover {
    background: ${(props) => props.theme.colors.ednBackground};
    transition: transform 0.2s;
    transform: scale(1.05);
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const StepBoxRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const StyledRightColumn = styled(RightColumn)`
  width: 100%;
`

const H4 = styled.h4`
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  text-align: left;
  margin-top: 0;
  margin-bottom: 1rem;
`

const SWAP = "swap"
const BUY = "buy"
const GENERATE = "generate"
const EARN = "earn"

const MoreOrLessLink = ({ isOpen }) => {
  const text = isOpen ? (
    <Translation id="page-stablecoins-accordion-less" />
  ) : (
    <Translation id="page-stablecoins-accordion-more" />
  )
  return (
    <ButtonContainer>
      <FakeLink>{text}</FakeLink>
    </ButtonContainer>
  )
}

const StablecoinAccordion = () => {
  const [openSection, setOpenSection] = useState("") // default to all closed
  const intl = useIntl()
  const data = useStaticQuery(graphql`
    {
      uniswap: file(relativePath: { eq: "dapps/uni.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      compound: file(relativePath: { eq: "dapps/compound.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      aave: file(relativePath: { eq: "dapps/aave.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      oasis: file(relativePath: { eq: "dapps/stabledai.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      dydx: file(relativePath: { eq: "exchanges/dydx.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      gitcoin: file(relativePath: { eq: "dapps/gitcoin.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      maker: file(relativePath: { eq: "stablecoins/maker.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      eth: file(relativePath: { eq: "favicon.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      oneinch: file(relativePath: { eq: "exchanges/1inch.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      loopring: file(relativePath: { eq: "dapps/loopring.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      matcha: file(relativePath: { eq: "dapps/matcha.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      coinbase: file(relativePath: { eq: "exchanges/coinbase.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      kraken: file(relativePath: { eq: "exchanges/kraken.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      coinmama: file(relativePath: { eq: "exchanges/coinmama.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      gemini: file(relativePath: { eq: "exchanges/gemini.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      binance: file(relativePath: { eq: "exchanges/binance.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      bittrex: file(relativePath: { eq: "exchanges/bittrex.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
    }
  `)

  const dapps = [
    {
      title: "Uniswap",
      image: getImage(data.uniswap),
      link: "https://uniswap.org",
      alt: translateMessageId("uniswap-logo", intl),
    },
    {
      title: "DyDx",
      image: getImage(data.dydx),
      link: "https://dydx.exchange",
      alt: translateMessageId("dydx-logo", intl),
    },
    {
      title: "Loopring",
      image: getImage(data.loopring),
      link: "https://loopring.org",
      alt: translateMessageId("loopring-logo", intl),
    },
    {
      title: "1inch",
      image: getImage(data.oneinch),
      link: "https://app.1inch.io",
      alt: translateMessageId("1inch-logo", intl),
    },
    {
      title: "Matcha",
      image: getImage(data.matcha),
      link: "https://matcha.xyz",
      alt: translateMessageId("matcha-logo", intl),
    },
  ]

  const borrow = [
    {
      title: "Compound",
      image: getImage(data.compound),
      link: "https://compound.finance",
      alt: translateMessageId("compound-logo", intl),
    },
    {
      title: "DyDx",
      image: getImage(data.dydx),
      link: "https://dydx.exchange",
      alt: translateMessageId("dydx-logo", intl),
    },
    {
      title: "Aave",
      image: getImage(data.aave),
      link: "https://aave.com",
      alt: translateMessageId("aave-logo", intl),
    },
    {
      title: "Oasis",
      image: getImage(data.oasis),
      link: "https://oasis.app",
      alt: translateMessageId("oasis-logo", intl),
    },
  ]

  const earn = [
    {
      title: translateMessageId(
        "page-stablecoins-accordion-earn-project-bounties",
        intl
      ),
      image: getImage(data.gitcoin),
      link: "https://gitcoin.co/explorer",
      description: translateMessageId(
        "page-stablecoins-accordion-earn-project-1-description",
        intl
      ),
      alt: translateMessageId("gitcoin-logo", intl),
    },
    {
      title: translateMessageId(
        "page-stablecoins-accordion-earn-project-community",
        intl
      ),
      image: getImage(data.maker),
      link: "https://makerdao.world/en/resources/",
      description: translateMessageId(
        "page-stablecoins-accordion-earn-project-2-description",
        intl
      ),
      alt: translateMessageId("makerdao-logo", intl),
    },
    {
      title: translateMessageId(
        "page-stablecoins-accordion-earn-project-bug-bounties",
        intl
      ),
      image: getImage(data.eth),
      link: "/upgrades/get-involved/bug-bounty/",
      description: translateMessageId(
        "page-stablecoins-accordion-earn-project-3-description",
        intl
      ),
      alt: translateMessageId("ethereum-logo", intl),
    },
  ]

  const exchanges = [
    {
      title: "Coinbase",
      image: getImage(data.coinbase),
      link: "https://coinbase.com",
      alt: translateMessageId("coinbase-logo", intl),
    },
    {
      title: "Gemini",
      image: getImage(data.gemini),
      link: "https://gemini.com",
      alt: translateMessageId("gemini-logo", intl),
    },
    {
      title: "Kraken",
      image: getImage(data.kraken),
      link: "https://kraken.com",
      alt: translateMessageId("kraken-logo", intl),
    },
    {
      title: "Coinmama",
      image: getImage(data.coinmama),
      link: "https://coinmama.com",
      alt: translateMessageId("coinmama-logo", intl),
    },
    {
      title: "Bittrex",
      image: getImage(data.bittrex),
      link: "https://global.bittrex.com",
      alt: translateMessageId("bittrex-logo", intl),
    },
    {
      title: "Binance",
      image: getImage(data.binance),
      link: "https://binance.com",
      alt: translateMessageId("binance-logo", intl),
    },
  ]

  // TODO generalize
  const handleSelect = (selectedSection) => {
    // If section is already open, close it.
    if (openSection === selectedSection) {
      setOpenSection("")
    } else {
      setOpenSection(selectedSection)
    }
    if (isMobile()) {
      navigate(`/stablecoins/#${selectedSection}`)
    }
  }

  return (
    <Card>
      <Content id={SWAP} onClick={() => handleSelect(SWAP)}>
        <TitleContainer>
          <StyledEmoji svg text=":twisted_rightwards_arrows:" size={4} />
          <Question>
            <Row>
              <Title>
                <Translation id="page-stablecoins-accordion-swap-title" />
              </Title>
              <StyledPill color="success100">
                <Translation id="page-stablecoins-accordion-swap-pill" />
              </StyledPill>
            </Row>
            <TextPreview>
              <Translation id="page-stablecoins-accordion-swap-text-preview" />
            </TextPreview>
          </Question>
        </TitleContainer>
        <MoreOrLessLink isOpen={openSection === SWAP} />
      </Content>
      <ChildrenContent>
        {openSection === SWAP && (
          <StyledTwoColumnContent>
            <LeftColumn>
              <SectionTitle>
                <Translation id="page-stablecoins-accordion-requirements" />
              </SectionTitle>
              <StepBoxContainer>
                <StepBox to="/wallets/">
                  <StepBoxRow>
                    <div>
                      <StepboxTitle>
                        <Translation id="page-stablecoins-accordion-swap-requirement-1" />
                      </StepboxTitle>
                      <P>
                        <Translation id="page-stablecoins-accordion-swap-requirement-1-description" />
                      </P>
                    </div>
                    <StyledIcon name="arrowRight" />
                  </StepBoxRow>
                </StepBox>
                <StepBox to="/get-eth/">
                  <StepBoxRow>
                    <div>
                      <StepboxTitle>
                        <Translation id="page-stablecoins-accordion-swap-requirement-2" />
                      </StepboxTitle>
                      <P>
                        <Translation id="page-stablecoins-accordion-swap-requirement-2-description" />
                      </P>
                    </div>
                    <StyledIcon name="arrowRight" />
                  </StepBoxRow>
                </StepBox>
              </StepBoxContainer>
              <InfoBanner emoji=":light_bulb:">
                <H4>
                  <Translation id="page-stablecoins-accordion-swap-editors-tip" />
                </H4>
                <p>
                  <Translation id="page-stablecoins-accordion-swap-editors-tip-copy" />
                </p>
                <ButtonLink to="/wallets/find-wallet/?filters=has_card_deposits,has_dex_integrations">
                  <Translation id="page-stablecoins-accordion-swap-editors-tip-button" />
                </ButtonLink>
              </InfoBanner>
            </LeftColumn>
            <StyledRightColumn>
              <SectionTitle>
                <Translation id="page-stablecoins-accordion-swap-dapp-title" />
              </SectionTitle>
              <p>
                <Translation id="page-stablecoins-accordion-swap-dapp-intro" />{" "}
                <Link to="/get-eth/#dex">
                  <Translation id="page-stablecoins-accordion-swap-dapp-link" />
                </Link>
              </p>
              <CardList content={dapps} />
            </StyledRightColumn>
          </StyledTwoColumnContent>
        )}
      </ChildrenContent>
      <Content id={BUY} onClick={() => handleSelect(BUY)}>
        <TitleContainer>
          <StyledEmoji svg text=":shopping_bags:" size={4} />
          <Question>
            <Title>
              <Translation id="page-stablecoins-accordion-buy-title" />
            </Title>
            <StyledTextPreview>
              <Translation id="page-stablecoins-accordion-buy-text-preview" />
            </StyledTextPreview>
          </Question>
        </TitleContainer>
        <MoreOrLessLink isOpen={openSection === BUY} />
      </Content>
      <ChildrenContent>
        {openSection === BUY && (
          <StyledTwoColumnContent>
            <LeftColumn>
              <SectionTitle>
                <Translation id="page-stablecoins-accordion-requirements" />
              </SectionTitle>
              <p>
                <Translation id="page-stablecoins-accordion-buy-requirements-description" />
              </p>
              <StepBoxContainer>
                <StepBox to="/get-eth/">
                  <StepBoxRow>
                    <div>
                      <StepboxTitle>
                        <Translation id="page-stablecoins-accordion-buy-requirement-1" />
                      </StepboxTitle>
                      <P>
                        <Translation id="page-stablecoins-accordion-buy-requirement-1-description" />
                      </P>
                    </div>
                    <StyledIcon name="arrowRight" />
                  </StepBoxRow>
                </StepBox>
              </StepBoxContainer>
              <InfoBanner isWarning={true}>
                <Translation id="page-stablecoins-accordion-buy-warning" />
              </InfoBanner>
            </LeftColumn>
            <StyledRightColumn>
              <SectionTitle>
                <Translation id="page-stablecoins-accordion-buy-exchanges-title" />
              </SectionTitle>
              <CardList content={exchanges} />
            </StyledRightColumn>
          </StyledTwoColumnContent>
        )}
      </ChildrenContent>
      <Content id={EARN} onClick={() => handleSelect(EARN)}>
        <TitleContainer>
          <StyledEmoji svg text=":money_bag:" size={4} />
          <Question>
            <Row>
              <Title>
                <Translation id="page-stablecoins-accordion-earn-title" />
              </Title>
            </Row>
            <TextPreview>
              <Translation id="page-stablecoins-accordion-earn-text-preview" />
            </TextPreview>
          </Question>
        </TitleContainer>
        <MoreOrLessLink isOpen={openSection === EARN} />
      </Content>
      <ChildrenContent>
        {openSection === EARN && (
          <StyledTwoColumnContent>
            <LeftColumn>
              <SectionTitle>
                <Translation id="page-stablecoins-accordion-requirements" />
              </SectionTitle>
              <p>
                <Translation id="page-stablecoins-accordion-earn-requirements-description" />
              </p>
              <StepBoxContainer>
                <StepBox to="/wallets/">
                  <StepBoxRow>
                    <div>
                      <StepboxTitle>
                        <Translation id="page-stablecoins-accordion-earn-requirement-1" />
                      </StepboxTitle>
                      <P>
                        <Translation id="page-stablecoins-accordion-earn-requirement-1-description" />
                      </P>
                    </div>
                    <StyledIcon name="arrowRight" />
                  </StepBoxRow>
                </StepBox>
              </StepBoxContainer>
            </LeftColumn>
            <StyledRightColumn>
              <SectionTitle>
                <Translation id="page-stablecoins-accordion-earn-projects-title" />
              </SectionTitle>
              <p>
                <Translation id="page-stablecoins-accordion-earn-projects-copy" />
              </p>
              <CardList content={earn} />
            </StyledRightColumn>
          </StyledTwoColumnContent>
        )}
      </ChildrenContent>
      <Content id={GENERATE} onClick={() => handleSelect(GENERATE)}>
        <TitleContainer>
          <StyledEmoji svg text=":handshake:" size={4} />
          <Question>
            <Row>
              <Title>
                <Translation id="page-stablecoins-accordion-borrow-title" />
              </Title>
              <StyledPill color="warning">
                <Translation id="page-stablecoins-accordion-borrow-pill" />
              </StyledPill>
            </Row>
            <TextPreview>
              <Translation id="page-stablecoins-accordion-borrow-text-preview" />
            </TextPreview>
          </Question>
        </TitleContainer>
        <MoreOrLessLink isOpen={openSection === GENERATE} />
      </Content>
      <ChildrenContent>
        {openSection === GENERATE && (
          <StyledTwoColumnContent>
            <LeftColumn>
              <SectionTitle>
                <Translation id="page-stablecoins-accordion-requirements" />
              </SectionTitle>
              <p>
                <Translation id="page-stablecoins-accordion-borrow-requirements-description" />
              </p>
              <StepBoxContainer>
                <StepBox to="/wallets/">
                  <StepBoxRow>
                    <div>
                      <StepboxTitle>
                        <Translation id="page-stablecoins-accordion-borrow-requirement-1" />
                      </StepboxTitle>
                      <P>
                        <Translation id="page-stablecoins-accordion-borrow-requirement-1-description" />
                      </P>
                    </div>
                    <StyledIcon name="arrowRight" />
                  </StepBoxRow>
                </StepBox>
                <StepBox to="/get-eth/">
                  <StepBoxRow>
                    <div>
                      <StepboxTitle>
                        <Translation id="page-stablecoins-accordion-borrow-requirement-2" />
                      </StepboxTitle>
                      <P>
                        <Translation id="page-stablecoins-accordion-borrow-requirement-2-description" />
                      </P>
                    </div>
                    <StyledIcon name="arrowRight" />
                  </StepBoxRow>
                </StepBox>
              </StepBoxContainer>
              <SectionTitle>
                <Translation id="page-stablecoins-accordion-borrow-crypto-collateral" />
              </SectionTitle>
              <p>
                <Translation id="page-stablecoins-accordion-borrow-crypto-collateral-copy" />{" "}
                <Link to="#how">
                  <Translation id="page-stablecoins-accordion-borrow-crypto-collateral-link" />
                </Link>
              </p>
              <p>
                <Translation id="page-stablecoins-accordion-borrow-crypto-collateral-copy-p2" />
              </p>
            </LeftColumn>
            <StyledRightColumn>
              <SectionTitle>
                <Translation id="page-stablecoins-accordion-borrow-places-title" />
              </SectionTitle>
              <p>
                <Translation id="page-stablecoins-accordion-borrow-places-intro" />
              </p>
              <CardList content={borrow} />
              <SectionTitle>
                <Translation id="page-stablecoins-accordion-borrow-risks-title" />
              </SectionTitle>
              <p>
                <Translation id="page-stablecoins-accordion-borrow-risks-copy" />{" "}
                <Link to="/eth/">
                  <Translation id="page-stablecoins-accordion-borrow-risks-link" />
                </Link>
              </p>
            </StyledRightColumn>
          </StyledTwoColumnContent>
        )}
      </ChildrenContent>
    </Card>
  )
}

export default StablecoinAccordion
