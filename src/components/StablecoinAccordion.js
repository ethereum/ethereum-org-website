import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
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
  font-size: 24px;
  font-weight: 600;
  margin-top: 0rem;
  margin-bottom: 0rem;
`

const TextPreview = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.text200};
  margin-bottom: 0rem;
`

const StyledTextPreview = styled.p`
  font-size: 16px;
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
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
  margin-top: 0rem;
`
const StepboxTitle = styled.span`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  text-align: left;
`

const P = styled.p`
  font-size: 16px;
  margin-bottom: 0rem;
`

const InfoTitle = styled(StepboxTitle)`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  text-align: left;
  margin-top: 0rem;
  margin-bottom: 1 rem;
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
    query {
      uniswap: file(relativePath: { eq: "dapps/uni.png" }) {
        childImageSharp {
          fixed(width: 24) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      compound: file(relativePath: { eq: "dapps/compound.png" }) {
        childImageSharp {
          fixed(width: 24) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      aave: file(relativePath: { eq: "dapps/aave.png" }) {
        childImageSharp {
          fixed(width: 24) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      oasis: file(relativePath: { eq: "dapps/stabledai.png" }) {
        childImageSharp {
          fixed(width: 24) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      dydx: file(relativePath: { eq: "exchanges/dydx.png" }) {
        childImageSharp {
          fixed(width: 24) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      gitcoin: file(relativePath: { eq: "dapps/gitcoin.png" }) {
        childImageSharp {
          fixed(width: 24) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      maker: file(relativePath: { eq: "stablecoins/maker.png" }) {
        childImageSharp {
          fixed(width: 24) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      eth: file(relativePath: { eq: "favicon.png" }) {
        childImageSharp {
          fixed(width: 24) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      oneinch: file(relativePath: { eq: "exchanges/1inch.png" }) {
        childImageSharp {
          fixed(width: 24) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      loopring: file(relativePath: { eq: "dapps/loopring.png" }) {
        childImageSharp {
          fixed(width: 24) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      matcha: file(relativePath: { eq: "dapps/matcha.png" }) {
        childImageSharp {
          fixed(width: 24) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      coinbase: file(relativePath: { eq: "exchanges/coinbase.png" }) {
        childImageSharp {
          fixed(width: 24) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      kraken: file(relativePath: { eq: "exchanges/kraken.png" }) {
        childImageSharp {
          fixed(width: 24) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      coinmama: file(relativePath: { eq: "exchanges/coinmama.png" }) {
        childImageSharp {
          fixed(width: 24) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      gemini: file(relativePath: { eq: "exchanges/gemini.png" }) {
        childImageSharp {
          fixed(width: 24) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      binance: file(relativePath: { eq: "exchanges/binance.png" }) {
        childImageSharp {
          fixed(width: 24) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      bittrex: file(relativePath: { eq: "exchanges/bittrex.png" }) {
        childImageSharp {
          fixed(width: 24) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  const dapps = [
    {
      title: "Uniswap",
      image: data.uniswap.childImageSharp.fixed,
      link: "https://uniswap.org",
      alt: translateMessageId("uniswap-logo", intl),
    },
    {
      title: "DyDx",
      image: data.dydx.childImageSharp.fixed,
      link: "https://beaconcha.in",
      alt: translateMessageId("dydx-logo", intl),
    },
    {
      title: "Loopring",
      image: data.loopring.childImageSharp.fixed,
      link: "https://beaconcha.in",
      alt: translateMessageId("loopring-logo", intl),
    },
    {
      title: "1inch",
      image: data.oneinch.childImageSharp.fixed,
      link: "https://beaconcha.in",
      alt: translateMessageId("1inch-logo", intl),
    },
    {
      title: "Matcha",
      image: data.matcha.childImageSharp.fixed,
      link: "https://beaconcha.in",
      alt: translateMessageId("matcha-logo", intl),
    },
  ]

  const borrow = [
    {
      title: "Compound",
      image: data.compound.childImageSharp.fixed,
      link: "https://compound.finance",
      alt: translateMessageId("compound-logo", intl),
    },
    {
      title: "DyDx",
      image: data.dydx.childImageSharp.fixed,
      link: "https://beaconcha.in",
      alt: translateMessageId("dydx-logo", intl),
    },
    {
      title: "Aave",
      image: data.aave.childImageSharp.fixed,
      link: "https://aave.com",
      alt: translateMessageId("aave-logo", intl),
    },
    {
      title: "Oasis",
      image: data.oasis.childImageSharp.fixed,
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
      image: data.gitcoin.childImageSharp.fixed,
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
      image: data.maker.childImageSharp.fixed,
      link: "https://community-development.makerdao.com/en/contribute/",
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
      image: data.eth.childImageSharp.fixed,
      link: "/eth2/get-involved/bug-bounty/",
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
      image: data.coinbase.childImageSharp.fixed,
      link: "https://coinbase.com",
      alt: translateMessageId("coinbase-logo", intl),
    },
    {
      title: "Gemini",
      image: data.gemini.childImageSharp.fixed,
      link: "https://gemini.com",
      alt: translateMessageId("gemini-logo", intl),
    },
    {
      title: "Kraken",
      image: data.kraken.childImageSharp.fixed,
      link: "https://kraken.com",
      alt: translateMessageId("kraken-logo", intl),
    },
    {
      title: "Coinmama",
      image: data.coinmama.childImageSharp.fixed,
      link: "https://coinmama.com",
      alt: translateMessageId("coinmama-logo", intl),
    },
    {
      title: "Bittrex",
      image: data.bittrex.childImageSharp.fixed,
      link: "https://global.bittrex.com",
      alt: translateMessageId("bittrex-logo", intl),
    },
    {
      title: "Binance",
      image: data.binance.childImageSharp.fixed,
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
    const isMobile = document && document.documentElement.clientWidth < 1024
    if (isMobile) {
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
                <InfoTitle>
                  <Translation id="page-stablecoins-accordion-swap-editors-tip" />
                </InfoTitle>
                <p>
                  <Translation id="page-stablecoins-accordion-swap-editors-tip-copy" />
                </p>
                <ButtonLink to="/wallets/find-wallet/">
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
