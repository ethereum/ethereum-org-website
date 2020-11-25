import styled from "styled-components"
// TODO add motion animation
// import { motion } from "framer-motion"
import {
  FakeLink,
  TwoColumnContent,
  LeftColumn,
  RightColumn,
} from "./SharedStyledComponents"
import { useStaticQuery, graphql } from "gatsby"
import InfoBanner from "./InfoBanner"
import CardList from "./CardList"
import React, { useState } from "react"
import Link from "./Link"
import Icon from "./Icon"
import Emoji from "./Emoji"
import Pill from "./Pill"
import Warning from "./Warning"
import ButtonLink from "./ButtonLink"

const Card = styled.div`
  border-radius: 2px;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  width: 100%;
`

const ExpandedCard = styled.div`
  padding: 1rem;
  display: flex;
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
`

const Content = styled.div`
  display: flex;
  align-items: center;
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

const Text = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.text};
  margin-top: 2rem;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  padding-top: 1.5rem;
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

const H4 = styled.h4`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
  margin-top: 0rem;
`
const H5 = styled.span`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  text-align: left;
`

const P = styled.p`
  font-size: 16px;
  margin-bottom: 0rem;
`

const InfoTitle = styled.h5`
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
`

const StablecoinAccordion = () => {
  const [isSwapVisible, setIsSwapVisible] = useState(false)
  const [isBuyVisible, setIsBuyVisible] = useState(false)
  const [isGenerateVisible, setIsGenerateVisible] = useState(false)
  const [isEarnVisible, setIsEarnVisible] = useState(false)

  const data = useStaticQuery(graphql`
    query {
      uniswap: file(relativePath: { eq: "dapps/uni.png" }) {
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
    },
    {
      title: "DyDx",
      image: data.dydx.childImageSharp.fixed,
      link: "https://beaconcha.in",
    },
    {
      title: "Loopring",
      image: data.loopring.childImageSharp.fixed,
      link: "https://beaconcha.in",
    },
    {
      title: "1inch",
      image: data.oneinch.childImageSharp.fixed,
      link: "https://beaconcha.in",
    },
    {
      title: "Matcha",
      image: data.matcha.childImageSharp.fixed,
      link: "https://beaconcha.in",
    },
  ]

  const exchanges = [
    {
      title: "Coinbase",
      image: data.coinbase.childImageSharp.fixed,
      link: "https://coinbase.com",
    },
    {
      title: "Gemini",
      image: data.gemini.childImageSharp.fixed,
      link: "https://gemini.com",
    },
    {
      title: "Kraken",
      image: data.kraken.childImageSharp.fixed,
      link: "https://kraken.com",
    },
    {
      title: "Coinmama",
      image: data.coinmama.childImageSharp.fixed,
      link: "https://coinmama.com",
    },
    {
      title: "Bittrex",
      image: data.bittrex.childImageSharp.fixed,
      link: "https://global.bittrex.com",
    },
    {
      title: "Binance",
      image: data.binance.childImageSharp.fixed,
      link: "https://binance.com",
    },
  ]

  return (
    <Card>
      <Content>
        <TitleContainer>
          <StyledEmoji svg text=":twisted_rightwards_arrows:" size={4} />
          <Question>
            <Row>
              <Title>Swap</Title>
              <StyledPill color="success100">Recommended</StyledPill>
            </Row>
            <TextPreview>
              You can pick up most stablecoins on decentralized exchanges. So
              you can swap any tokens you might have for a stablecoin you want.
            </TextPreview>
          </Question>
        </TitleContainer>
        <ButtonContainer
          onClick={() => [
            setIsSwapVisible(!isSwapVisible),
            setIsGenerateVisible(false),
            setIsBuyVisible(false),
            setIsEarnVisible(false),
          ]}
        >
          {!isSwapVisible && <FakeLink>More</FakeLink>}
          {isSwapVisible && <FakeLink>Less</FakeLink>}
        </ButtonContainer>
      </Content>
      <ChildrenContent>
        {isSwapVisible && (
          <StyledTwoColumnContent>
            <LeftColumn>
              <H4>What you'll need</H4>
              <StepBoxContainer>
                <StepBox to="/wallet/">
                  <StepBoxRow>
                    <div>
                      <H5>An Ethereum wallet</H5>
                      <P>
                        You’ll need a wallet to authorise the swap and store
                        your coins.
                      </P>
                    </div>
                    <Icon name="arrowRight" />
                  </StepBoxRow>
                </StepBox>
                <StepBox to="/get-eth/">
                  <StepBoxRow>
                    <div>
                      <H5>Ether (ETH)</H5>
                      <P>To pay for the swap.</P>
                    </div>
                    <Icon name="arrowRight" />
                  </StepBoxRow>
                </StepBox>
              </StepBoxContainer>
              <InfoBanner emoji=":light_bulb:">
                <InfoTitle>Editors' tip</InfoTitle>
                <p>
                  Get yourself a wallet that will let you buy ETH and swap it
                  for tokens, including stablecoins, directly.
                </p>
                <ButtonLink to="#">Show these wallets</ButtonLink>
              </InfoBanner>
            </LeftColumn>
            <RightColumn>
              <H4>Dapps for swapping tokens</H4>
              <p>
                If you’ve already got ETH and a wallet, you can use these dapps
                to swap for stablecoins.
              </p>
              <CardList content={dapps} />
            </RightColumn>
          </StyledTwoColumnContent>
        )}
      </ChildrenContent>
      <Content>
        <TitleContainer>
          <StyledEmoji svg text=":shopping_bags:" size={4} />
          <Question>
            <Title>Buy</Title>
            <StyledTextPreview>
              A lot of centralized exchanges will offer fiat-backed stablecoins
              too. So you should be able to buy them in the same way that you
              buy ETH.
            </StyledTextPreview>
          </Question>
        </TitleContainer>
        <ButtonContainer
          onClick={() => [
            setIsBuyVisible(!isBuyVisible),
            setIsGenerateVisible(false),
            setIsSwapVisible(false),
            setIsEarnVisible(false),
          ]}
        >
          {!isBuyVisible && <FakeLink>More</FakeLink>}
          {isBuyVisible && <FakeLink>Less</FakeLink>}
        </ButtonContainer>
      </Content>
      <ChildrenContent>
        {isBuyVisible && (
          <StyledTwoColumnContent>
            <LeftColumn>
              <H4>What you'll need</H4>
              <p>
                An account with an exchange. You may have already used one to
                get some ETH. Geographical restrictions will apply. Check to see
                what exchanges you can use
              </p>
              <StepBoxContainer>
                <StepBox to="/eth/get-eth/">
                  <StepBoxRow>
                    <div>
                      <H5>Crypto exchanges</H5>
                      <P>Check which exchanges you can use where you live.</P>
                    </div>
                    <Icon name="arrowRight" />
                  </StepBoxRow>
                </StepBox>
              </StepBoxContainer>
              <Warning>
                Centralized exchanges may only list fiat-backed stablecoins like
                USDc, Tether and others. You may not be able to buy them
                directly, but you should be able to exchange them from ETH or
                other cryptocurrencies that you can buy on the platform.
              </Warning>
            </LeftColumn>
            <RightColumn>
              <H4>Popular exchanges</H4>
              <CardList content={exchanges} />
            </RightColumn>
          </StyledTwoColumnContent>
        )}
      </ChildrenContent>
      <Content>
        <TitleContainer>
          <StyledEmoji svg text=":high_voltage:" size={4} />
          <Question>
            <Row>
              <Title>Generate/borrow</Title>
              <StyledPill color="warning">Advanced</StyledPill>
            </Row>
            <TextPreview>
              You can generate some stablecoins by using your ETH as collateral,
              which you have to pay back. Dai is perhaps the most famous
              example.
            </TextPreview>
          </Question>
        </TitleContainer>
        <ButtonContainer
          onClick={() => [
            setIsGenerateVisible(!isGenerateVisible),
            setIsSwapVisible(false),
            setIsBuyVisible(false),
            setIsEarnVisible(false),
          ]}
        >
          {!isGenerateVisible && <FakeLink>More</FakeLink>}
          {isGenerateVisible && <FakeLink>Less</FakeLink>}
        </ButtonContainer>
      </Content>
      <ChildrenContent>
        {isGenerateVisible && (
          <StyledTwoColumnContent>
            <LeftColumn>
              <H4>What you'll need</H4>
              <StepBoxContainer>
                <StepBox to="/wallet/">
                  <StepBoxRow>
                    <div>
                      <H5>An Ethereum wallet</H5>
                      <P>You’ll need a wallet to use the Oasis dapp.</P>
                    </div>
                    <Icon name="arrowRight" />
                  </StepBoxRow>
                </StepBox>
                <StepBox to="/get-eth/">
                  <StepBoxRow>
                    <div>
                      <H5>Ether (ETH)</H5>
                      <P>
                        To act as collateral when you generate your stablecoins.
                      </P>
                    </div>
                    <Icon name="arrowRight" />
                  </StepBoxRow>
                </StepBox>
              </StepBoxContainer>
              <p>
                The Maker system allows you to generate Dai by offering up your
                ETH as collateral. Because ETH’s price is volatile, you’ll need
                to overcollateralise. That means if you want to generate 100 Dai
                you’ll need at least $150 worth of ETH.
              </p>
            </LeftColumn>
            <RightColumn>
              <H4>Why do this?</H4>
              <p>
                Getting Dai in this way lets you get leverage. You get exposure
                to Dai without spending your ETH.{" "}
              </p>
              <H4>Risks</H4>
              <p>
                If ETH’s value drops, your collateral won’t cover the Dai you
                generated. This will cause your ETH to liquidate and you may
                face a penalty. So if you generate Dai in this way you’ll need
                to <Link to="/eth/">keep an eye on the price</Link>.
              </p>
              <div>
                <ButtonLink to="https://oasis.app">
                  Generate Dai with Oasis
                </ButtonLink>
              </div>
            </RightColumn>
          </StyledTwoColumnContent>
        )}
      </ChildrenContent>
      <Content>
        <TitleContainer>
          <StyledEmoji svg text=":high_voltage:" size={4} />
          <Question>
            <Row>
              <Title>Earn</Title>
              <StyledPill color="success200">Recommended</StyledPill>
            </Row>
            <TextPreview>Placehoder</TextPreview>
          </Question>
        </TitleContainer>
        <ButtonContainer
          onClick={() => [
            setIsEarnVisible(!isEarnVisible),
            setIsGenerateVisible(false),
            setIsSwapVisible(false),
            setIsBuyVisible(false),
          ]}
        >
          {!isEarnVisible && <FakeLink>More</FakeLink>}
          {isEarnVisible && <FakeLink>Less</FakeLink>}
        </ButtonContainer>
      </Content>
      <ChildrenContent>
        {isEarnVisible && (
          <StyledTwoColumnContent>
            <LeftColumn>
              <H4>What you'll need</H4>
              <StepBoxContainer>
                <StepBox to="/wallet/">
                  <StepBoxRow>
                    <div>
                      <H5>An Ethereum wallet</H5>
                      <P>You’ll need a wallet to use the Oasis dapp.</P>
                    </div>
                    <Icon name="arrowRight" />
                  </StepBoxRow>
                </StepBox>
                <StepBox to="/get-eth/">
                  <StepBoxRow>
                    <div>
                      <H5>Ether (ETH)</H5>
                      <P>
                        To act as collateral when you generate your stablecoins.
                      </P>
                    </div>
                    <Icon name="arrowRight" />
                  </StepBoxRow>
                </StepBox>
              </StepBoxContainer>
              <p>
                The Maker system allows you to generate Dai by offering up your
                ETH as collateral. Because ETH’s price is volatile, you’ll need
                to overcollateralise. That means if you want to generate 100 Dai
                you’ll need at least $150 worth of ETH.
              </p>
            </LeftColumn>
            <RightColumn>
              <H4>Why do this?</H4>
              <p>
                Getting Dai in this way lets you get leverage. You get exposure
                to Dai without spending your ETH.{" "}
              </p>
              <H4>Risks</H4>
              <p>
                If ETH’s value drops, your collateral won’t cover the Dai you
                generated. This will cause your ETH to liquidate and you may
                face a penalty. So if you generate Dai in this way you’ll need
                to <Link to="/eth/">keep an eye on the price</Link>.
              </p>
              <div>
                <ButtonLink to="https://oasis.app">
                  Generate Dai with Oasis
                </ButtonLink>
              </div>
            </RightColumn>
          </StyledTwoColumnContent>
        )}
      </ChildrenContent>
    </Card>
  )
}

export default StablecoinAccordion
