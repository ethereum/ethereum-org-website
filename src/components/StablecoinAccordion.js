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
import CardList from "./CardList"
import React, { useState } from "react"
import Link from "./Link"
import Icon from "./Icon"
import Emoji from "./Emoji"
import Pill from "./Pill"
import InfoBanner from "./InfoBanner"
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

const StyledIcon = styled(Icon)`
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

  const borrow = [
    {
      title: "Compound",
      image: data.compound.childImageSharp.fixed,
      link: "https://compound.finance",
    },
    {
      title: "DyDx",
      image: data.dydx.childImageSharp.fixed,
      link: "https://beaconcha.in",
    },
    {
      title: "Aave",
      image: data.aave.childImageSharp.fixed,
      link: "https://aave.com",
    },
    {
      title: "Oasis",
      image: data.oasis.childImageSharp.fixed,
      link: "https://oasis.app",
    },
  ]

  const earn = [
    {
      title: "Gitcoin bounties",
      image: data.gitcoin.childImageSharp.fixed,
      link: "https://gitcoin.co/explorer",
      description:
        "Mostly technical work for the open-source software movement.",
    },
    {
      title: "MakerDao community",
      image: data.maker.childImageSharp.fixed,
      link: "https://community-development.makerdao.com/en/contribute/",
      description:
        "Technology, content, and other work for the MakerDao community (the team that brought you Dai).",
    },
    {
      title: "Eth2 bug bounties",
      image: data.eth.childImageSharp.fixed,
      link: "/eth2/get-involved/bug-bounty/",
      description: "When you really know your stuff, find bugs to earn Dai.",
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
      <Content
        onClick={() => [
          setIsSwapVisible(!isSwapVisible),
          setIsGenerateVisible(false),
          setIsBuyVisible(false),
          setIsEarnVisible(false),
        ]}
      >
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
        <ButtonContainer>
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
                    <StyledIcon name="arrowRight" />
                  </StepBoxRow>
                </StepBox>
                <StepBox to="/get-eth/">
                  <StepBoxRow>
                    <div>
                      <H5>Ether (ETH)</H5>
                      <P>To pay for the swap.</P>
                    </div>
                    <StyledIcon name="arrowRight" />
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
            <StyledRightColumn>
              <H4>Dapps for swapping tokens</H4>
              <p>
                If you’ve already got ETH and a wallet, you can use these dapps
                to swap for stablecoins. More on{" "}
                <Link to="/get-eth/#dex">decentralized exchanges.</Link>
              </p>
              <CardList content={dapps} />
            </StyledRightColumn>
          </StyledTwoColumnContent>
        )}
      </ChildrenContent>
      <Content
        onClick={() => [
          setIsBuyVisible(!isBuyVisible),
          setIsGenerateVisible(false),
          setIsSwapVisible(false),
          setIsEarnVisible(false),
        ]}
      >
        <TitleContainer>
          <StyledEmoji svg text=":shopping_bags:" size={4} />
          <Question>
            <Title>Buy</Title>
            <StyledTextPreview>
              A lot of centralized exchanges offer fiat-backed stablecoins like
              USDc. You may be able to buy them in the same way that you buy
              ETH.
            </StyledTextPreview>
          </Question>
        </TitleContainer>
        <ButtonContainer>
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
                An account with an exchange or a wallet you can buy crypto from
                directly. You may have already used one to get some ETH.
                Geographical restrictions will apply. Check to see which
                services you can use.
              </p>
              <StepBoxContainer>
                <StepBox to="/eth/get-eth/">
                  <StepBoxRow>
                    <div>
                      <H5>Crypto exchanges and wallets</H5>
                      <P>Check which services you can use where you live.</P>
                    </div>
                    <StyledIcon name="arrowRight" />
                  </StepBoxRow>
                </StepBox>
              </StepBoxContainer>
              <InfoBanner isWarning={true}>
                Centralized exchanges may only list fiat-backed stablecoins like
                USDc, Tether and others. You may not be able to buy them
                directly, but you should be able to exchange them from ETH or
                other cryptocurrencies that you can buy on the platform.
              </InfoBanner>
            </LeftColumn>
            <StyledRightColumn>
              <H4>Popular exchanges</H4>
              <CardList content={exchanges} />
            </StyledRightColumn>
          </StyledTwoColumnContent>
        )}
      </ChildrenContent>
      <Content
        onClick={() => [
          setIsEarnVisible(!isEarnVisible),
          setIsGenerateVisible(false),
          setIsSwapVisible(false),
          setIsBuyVisible(false),
        ]}
      >
        <TitleContainer>
          <StyledEmoji svg text=":money_bag:" size={4} />
          <Question>
            <Row>
              <Title>Earn</Title>
            </Row>
            <TextPreview>
              You can earn stablecoins by working on projects within the
              Ethereum ecosystem.{" "}
            </TextPreview>
          </Question>
        </TitleContainer>
        <ButtonContainer>
          {!isEarnVisible && <FakeLink>More</FakeLink>}
          {isEarnVisible && <FakeLink>Less</FakeLink>}
        </ButtonContainer>
      </Content>
      <ChildrenContent>
        {isEarnVisible && (
          <StyledTwoColumnContent>
            <LeftColumn>
              <H4>What you'll need</H4>
              <p>
                Stablecoins are a great method of payment for work and services
                because the value is more stable. But you'll need a wallet to be
                paid.
              </p>
              <StepBoxContainer>
                <StepBox to="/wallet/">
                  <StepBoxRow>
                    <div>
                      <H5>An Ethereum wallet</H5>
                      <P>
                        You’ll need a wallet to receive your earned stablecoins.
                      </P>
                    </div>
                    <StyledIcon name="arrowRight" />
                  </StepBoxRow>
                </StepBox>
              </StepBoxContainer>
            </LeftColumn>
            <StyledRightColumn>
              <H4>Where to earn stablecoins</H4>
              <p>
                These are platforms that will pay you in stablecoins for your
                work.
              </p>
              <CardList content={earn} />
            </StyledRightColumn>
          </StyledTwoColumnContent>
        )}
      </ChildrenContent>
      <Content
        onClick={() => [
          setIsGenerateVisible(!isGenerateVisible),
          setIsSwapVisible(false),
          setIsBuyVisible(false),
          setIsEarnVisible(false),
        ]}
      >
        <TitleContainer>
          <StyledEmoji svg text=":handshake:" size={4} />
          <Question>
            <Row>
              <Title>Borrow</Title>
              <StyledPill color="warning">Advanced</StyledPill>
            </Row>
            <TextPreview>
              You can borrow some stablecoins by using your ETH as collateral,
              which you have to pay back.
            </TextPreview>
          </Question>
        </TitleContainer>
        <ButtonContainer>
          {!isGenerateVisible && <FakeLink>More</FakeLink>}
          {isGenerateVisible && <FakeLink>Less</FakeLink>}
        </ButtonContainer>
      </Content>
      <ChildrenContent>
        {isGenerateVisible && (
          <StyledTwoColumnContent>
            <LeftColumn>
              <H4>What you'll need</H4>
              <p>
                To borrow stablecoins you'll need to use the right dapp. You'll
                also need a wallet and some ETH.
              </p>
              <StepBoxContainer>
                <StepBox to="/wallet/">
                  <StepBoxRow>
                    <div>
                      <H5>An Ethereum wallet</H5>
                      <P>You’ll need a wallet to use dapps.</P>
                    </div>
                    <StyledIcon name="arrowRight" />
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
                    <StyledIcon name="arrowRight" />
                  </StepBoxRow>
                </StepBox>
              </StepBoxContainer>
              <H4>Crypto collateral</H4>
              <p>
                With Ethereum you can borrow directly from other users without
                trading away your ETH. This can give you leverage – some do this
                to try to accumulate more ETH.
              </p>
              <p>
                But because ETH’s price is volatile, you’ll need to
                overcollateralise. That means if you want to borrow 100
                stablecoins you’ll probably need at least $150 worth of ETH.
                This protects the system and the lenders.
              </p>
            </LeftColumn>
            <StyledRightColumn>
              <H4>Places to borrow stablecoins</H4>
              <p>
                These dapps let you borrow stablecoins using crypto as
                collateral. Some accept other tokens as well as ETH.
              </p>
              <CardList content={borrow} />
              <H4>Risks</H4>
              <p>
                If ETH’s value drops, your collateral won’t cover the
                stablecoins you generated. This will cause your ETH to liquidate
                and you may face a penalty. So if you borrow stablecoins you’ll
                need to <Link to="/eth/">keep an eye on the price</Link>.
              </p>
            </StyledRightColumn>
          </StyledTwoColumnContent>
        )}
      </ChildrenContent>
    </Card>
  )
}

export default StablecoinAccordion
