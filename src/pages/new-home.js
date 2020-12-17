import React, { useState } from "react"
import { useIntl } from "gatsby-plugin-intl"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Icon from "../components/Icon"
import styled from "styled-components"
import Emoji from "../components/Emoji"
import Tooltip from "../components/Tooltip"
import NFTBoxGrid from "../components/NFTBoxGrid"
import {
  getLangContentVersion,
  translateMessageId,
} from "../utils/translations"
import Morpher from "../components/Morpher"
import PageMetadata from "../components/PageMetadata"
import Translation from "../components/Translation"
import Link from "../components/Link"
import ButtonLink from "../components/ButtonLink"
import Card from "../components/Card"
import {
  Divider,
  GrayContainer,
  CardContainer,
  H2,
  LeftColumn,
  RightColumn,
  FakeLink,
} from "../components/SharedStyledComponents"

const Hero = styled(Img)`
  width: 100%;
  min-height: 380px;
  max-height: 500px;
  background-size: cover;
  background: no-repeat 50px;
  border: 2px solid ${(props) => props.theme.colors.text};
  border-radius: 2px;
  margin-top: 1rem;
`

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  margin: 0 auto;
`

const Content = styled.div`
  width: 100%;
  padding: 1rem 2rem;
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
`

const OldHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 896px;
  margin: 0 auto;
`

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 100%;
`

const H1 = styled.h1`
  line-height: 1.4;
  font-weight: 400;
  font-size: 1.5rem;
  margin: 1.5rem 0;

  max-width: 80%;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    max-width: 100%;
  }
`

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const ToutRow = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 2rem;
`

const ImageContainer = styled.div`
  background: "#F1FFFD";
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
`

const Description = styled.p`
  color: ${(props) => props.theme.colors.text200};
  max-width: 55ch;
  text-align: center;
  font-size: 20px;
  margin-top: 1rem;
`

const Caption = styled.p`
  color: ${(props) => props.theme.colors.text200};
  text-align: center;
  margin-top: 1rem;
  text-transform: uppercase;
  font-size: 14px;
`

const H3 = styled.h3`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    display: none;
  }
`

const StyledGrayContainer = styled(GrayContainer)`
  box-shadow: inset 0px 0px 0px
    ${(props) => props.theme.colors.tableItemBoxShadow};
  padding: 1rem;
  margin-bottom: 3rem;
`

const OldH3 = styled.h3`
  margin-top: 2.5rem;
`

const StyledCard = styled(Card)`
  flex: 1 1 30%;
  min-width: 240px;
  margin: 1rem;
  padding: 1.5rem;
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.text};
  background: ${(props) => props.theme.colors.background};
  box-shadow: ${(props) => props.theme.colors.cardBoxShadow};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 1 1 30%;
  }
`

const ImageCard = styled(Card)`
  width: 100%;
  border: 2px solid ${(props) => props.theme.colors.text};
`

const Banner = styled(Img)`
  width: 100%;
  background-color: "#F1FFFD";
  border: 2px solid ${(props) => props.theme.colors.text};
  margin-top: 1rem;
`

const BannerContainer = styled.div`
  display: flex;
  height: 400px;
  margin-bottom: 2rem;
`

const StyledLeftColumn = styled(LeftColumn)`
  padding-left: 4rem;
  padding-right: 4rem;
`

const Image = styled(Img)`
  height: 480px;
  background-size: cover;
  background: no-repeat 50px;
`

const ContainerContent = styled.div`
  padding: 2rem 4rem;
  padding-bottom: 8rem;
`

const FinanceContainer = styled.div`
  background: ${(props) => props.theme.colors.gridOrange};
`

const InternetContainer = styled.div`
  background: ${(props) => props.theme.colors.gridGreen};
  padding: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    padding: 1rem;
  }
`

const FutureContainer = styled.div`
  background: ${(props) => props.theme.colors.gridPurple};
  padding: 2rem;
  margin-bottom: 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    padding: 1rem;
  }
`

const ContainerHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
  }
`

const OptionContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-right: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    width: 100%;
  }
`

const MobileOptionContainer = styled(OptionContainer)`
  text-align: center;
  @media (min-width: ${(props) => props.theme.breakpoints.m}) {
    display: none;
  }
`

const Option = styled.div`
  border-radius: 2rem;
  border: 2px solid ${(props) => props.theme.colors.text};
  box-shadow: ${(props) =>
    props.isActive ? props.theme.colors.cardBoxShadow : `none`};
  display: flex;
  color: ${(props) => props.theme.colors.text};
  align-items: center;
  padding: 1rem 1.5rem;
  margin: 0.5rem;
  cursor: pointer;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
    justify-content: center;
    margin-left: 0;
    margin-right: 0;
  }
`

const OptionText = styled.div`
  font-size: 24px;
  line-height: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: 16px;
    font-weight: 600;
  }
`

const Stat = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 1rem;
  margin-top: 1rem;
`

const StatCaption = styled.div`
  font-size: 14px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  line-height: 100%;
`

const StatContainer = styled.div`
  margin: 4rem;
`

const InfoIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.text};
  margin-left: 0.5rem;
`

const Tout = styled.div`
  margin: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

const Subtitle = styled.div`
  font-size: 24px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 1rem;
`

const Text = styled.div`
  font-size: 16px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 2rem;
`

const TextUpper = styled.div`
  font-size: 16px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: -1rem;
  text-transform: uppercase;
`

const CodeBox = styled.div`
  background: #2a2733;
  color: #9488f3;
  max-height: 320px;
  overflow: scroll;
  font-family: "SFMono-Regular", monospace;
  border-radius: 2px;
`

const CodeBoxHeader = styled.div`
  background: ${(props) => props.theme.colors.ednBackground};
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  padding: 1rem;
  position: sticky;
  top: 0;
  display: flex;
`

const CodeBoxContent = styled.div`
  padding: 1rem;
`

const Red = styled.div`
  border-radius: 64px;
  background: ${(props) => props.theme.colors.fail300};
  margin-right: 0.5rem;
  width: 12px;
  height: 12px;
`

const Yellow = styled.div`
  border-radius: 64px;
  background: ${(props) => props.theme.colors.gridYellow};
  margin-right: 0.5rem;
  width: 12px;
  height: 12px;
`

const Green = styled.div`
  border-radius: 64px;
  background: ${(props) => props.theme.colors.success300};
  margin-right: 0.5rem;
  width: 12px;
  height: 12px;
`

const TestContainer = styled.div`
  background: ${(props) => props.theme.colors.tagOrange};
  display: flex;
  flex-direction: row;
  margin-top: -1px;
  border: 1px solid ${(props) => props.theme.colors.text};
`

const TestContainer3 = styled.div`
  background: ${(props) => props.theme.colors.infoBanner};
  display: flex;
  flex-direction: row;
  margin-top: -1px;
  border: 1px solid ${(props) => props.theme.colors.text};
  margin-bottom: 4rem;
`

const TestContainerReverse = styled.div`
  background: ${(props) => props.theme.colors.tagMint};
  display: flex;
  flex-direction: row-reverse;
  margin-top: -1px;
  border: 1px solid ${(props) => props.theme.colors.text};
`

const TestCodeBox = styled.div`
  background: ${(props) => props.theme.colors.background};
  color: #9488f3;
  height: 100%;
  border: 1px solid ${(props) => props.theme.colors.text};
  font-family: "SFMono-Regular", monospace;
  overflow: scroll;
  width: 100%;
`

const TestStyledLeftColumn = styled(LeftColumn)`
  padding: 6rem;
  height: 100%;
  width: 100%;
  margin: 0;
`

const TestCodeBoxContent = styled.div`
  padding: 2rem;
  height: 720px;
  overflow: scroll;
`

const StyledH2 = styled(H2)`
  margin-bottom: 0.5rem;
  font-family: serif;
`

const TestOptionContainer = styled.div`
  display: flex;
  margin-bottom: 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    width: 100%;
  }
`

const TestOption = styled.div`
  border-radius: 2rem;
  border: 1px solid ${(props) => props.theme.colors.text};
  box-shadow: ${(props) =>
    props.isActive ? props.theme.colors.cardBoxShadow : `none`};
  display: flex;
  color: ${(props) => props.theme.colors.text};
  align-items: center;
  padding: 0.5rem 1rem;
  cursor: pointer;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
    justify-content: center;
    margin-left: 0;
    margin-right: 0;
  }
`

const TestOptionRight = styled.div`
  border-radius: 2rem;
  border: 1px solid ${(props) => props.theme.colors.text};
  box-shadow: ${(props) =>
    props.isActive ? props.theme.colors.cardBoxShadow : `none`};
  display: flex;
  color: ${(props) => props.theme.colors.text};
  align-items: center;
  margin-left: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
    justify-content: center;
    margin-left: 0;
    margin-right: 0;
  }
`

const TestOptionText = styled.div`
  font-size: 16px;
  line-height: 100%;
`

const TestSubtitle = styled(Subtitle)`
  margin-bottom: 2rem;
  font-size: 20px;
`

const DefiBox = styled.div`
  background: ${(props) => props.theme.colors.background};
  width: 100%;
  height: 100%;
  border: 1px solid ${(props) => props.theme.colors.text};
`

const DefiLabel = styled.p`
  font-size: 16px;
  padding-top: 3rem;
  padding-left: 3rem;
  color: ${(props) => props.theme.colors.text};
  text-transform: uppercase;
  margin-bottom: 2rem;
`

const DefiStat = styled.p`
  font-size: 64px;
  font-weight: 700;
  padding-left: 3rem;
  margin-bottom: 4rem;
  font-family: "SFMono-Regular", monospace;
  color: ${(props) => props.theme.colors.text};
  text-transform: uppercase;
`

const StyledLink = styled.div`
  color: ${(props) => props.theme.colors.text};
  font-size: 16px;
  text-transform: uppercase;
  text-decoration: underline;
  margin-right: 1rem;
  cursor: pointer;
`

const LinkRow = styled.div`
  padding-left: 3rem;
  display: flex;
  margin-bottom: 0rem;
`

const cards = [
  {
    emoji: ":money_bag:",
    title: "Download a wallet",
    description: "A wallet lets you connect to Ethereum and manage your funds.",
    url: "/wallets/find-wallet/",
    button: "Find wallet",
  },

  {
    emoji: ":money_with_wings:",
    title: "Get ETH",
    description:
      "ETH is the currency of Ethereum – you can use it in applications.",
    url: "/get-eth/",
    button: "Get ETH",
  },
  {
    emoji: ":video_game:",
    title: "Use a dapp",
    description:
      "Dapps are applications powered by Ethereum. See what you can do.",
    url: "/dapps/",
    button: "Explore dapps",
  },
]

// TODO: defi page, smart contracts (non dev) page, DAOs page

const tooltipContent = (
  <div>
    <Translation id="common-data-provided-by" />{" "}
    <Link to="https://www.coingecko.com/en/api">coingecko.com</Link>
  </div>
)

const defiTooltipContent = (
  <div>
    <Translation id="common-data-provided-by" />{" "}
    <Link to="https://www.coingecko.com/en/api">defipulse.com</Link>
  </div>
)

const nodeTooltipContent = (
  <div>
    Ethereum is run by thousands of volunteers around the globe, known as nodes.
    The more nodes, the healthier the network. Data provided by{" "}
    <Link to="https://www.coingecko.com/en/api">etherscan.io</Link>
  </div>
)

// TODO refactor so all content versions display the same info
const NewHomePage = ({ data, MONTH, YEAR, QUARTER }) => {
  const intl = useIntl()
  const contentVersion = getLangContentVersion(intl.locale)
  const [isFinanceCodeVisible, setIsFinanceCodeVisible] = useState(false)
  const [isInternetCodeVisible, setIsInternetCodeVisible] = useState(false)
  const [isFutureCodeVisible, setIsFutureCodeVisible] = useState(false)
  const [is30Visible, setIs30Visible] = useState(false)

  // lastest contentVersion

  const newSections = [
    {
      img: {
        src: data.individuals,
        alt: "page-index-sections-individuals-image-alt",
      },
      title: "page-index-sections-individuals-title",
      desc: "page-index-sections-individuals-desc",
      link: {
        text: "page-index-sections-individuals-link-text",
        to: "/what-is-ethereum/",
      },
    },
    {
      img: {
        src: data.developers,
        alt: "page-index-sections-developers-image-alt",
      },
      title: "page-index-sections-developers-title",
      desc: "page-index-sections-developers-desc",
      link: {
        text: "page-index-sections-developers-link-text",
        to: "/en/developers/",
      },
    },
    {
      img: {
        src: data.enterprise,
        alt: "page-index-sections-enterprise-image-alt",
      },
      title: "page-index-sections-enterprise-title",
      desc: "page-index-sections-enterprise-desc",
      link: {
        text: "page-index-sections-enterprise-link-text",
        to: "/enterprise/",
      },
    },
  ]

  const features = [
    {
      title: "NFT #1",
      description:
        "This art is owned by our team. The creator was paid peer-to-peer via an Ethereum auction site. If we sell it, the creator automatically gets a 10% royalty – all guaranteed by Ethereum.",
      image: data.infrastructurefixed.childImageSharp.fixed,
      url: "https://google.com",
      link: "0x12341234141414124214214124124124124124",
    },
    {
      title: "NFT #2",
      description: "Digital art with verifiable ownership",
      image: data.impactfixed.childImageSharp.fixed,
      url: "https://google.com",
      link: "0x12341234141414124214214124124124124124",
    },
    {
      title: "NFT #3",
      description: "Digital art with verifiable ownership",
      image: data.hackathonfixed.childImageSharp.fixed,
      url: "https://google.com",
      link: "0x12341234141414124214214124124124124124",
    },
  ]

  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-index-meta-title", intl)}
        description={translateMessageId("page-index-meta-description", intl)}
      />
      <Content>
        <Hero
          fluid={data.hero.childImageSharp.fluid}
          alt={translateMessageId("page-index-hero-image-alt", intl)}
          loading="eager"
        />
      </Content>
      <Morpher />
      <Header>
        <Description>
          ethereum.org is your sherpa for Ethereum, the technology behind the
          cryptocurrency Ether (ETH) and 1000s of applications.
        </Description>
        <Caption>Welcome to Ethereum, we hope you stick around</Caption>
      </Header>
      <StyledGrayContainer>
        <Content>
          <H2>Get started</H2>
          <CardContainer>
            {cards.map((card, idx) => {
              return (
                <StyledCard
                  key={idx}
                  emoji={card.emoji}
                  title={card.title}
                  description={card.description}
                >
                  <ButtonLink isSecondary to={card.url}>
                    {card.button}
                  </ButtonLink>
                </StyledCard>
              )
            })}
          </CardContainer>
        </Content>
      </StyledGrayContainer>
      <Content>
        <BannerContainer>
          <Banner
            fluid={data.ethereum.childImageSharp.fluid}
            alt={translateMessageId(
              "page-what-is-ethereum-alt-img-social",
              intl
            )}
          />
          <ImageCard
            title="Welcome to Ethereum"
            description="Ethereum is a work-in-progress digital future. It’s a blockchain but it’s also a lot bigger than that. We believe it has the power to create a fairer internet and world around it. A vibrant community is working on making this future a reality, but there’s plenty to explore already."
          >
            <ButtonLink isSecondary to="/what-is-ethereum/">
              What is Ethereum?
            </ButtonLink>
          </ImageCard>
        </BannerContainer>
      </Content>
      {/* <FinanceContainer>
        <ContainerHeader>
          <OptionContainer>
            <Option
              isActive={isFinanceCodeVisible}
              onClick={() => setIsFinanceCodeVisible(true)}
            >
              <Emoji mr={`1rem`} text=":keyboard:" />
              <OptionText>Code</OptionText>
            </Option>
            <Option
              isActive={!isFinanceCodeVisible}
              onClick={() => setIsFinanceCodeVisible(false)}
            >
              <Emoji mr={`1rem`} text=":money_with_wings:" />
              <OptionText>No code</OptionText>
            </Option>
          </OptionContainer>
        </ContainerHeader>
        <ContainerContent>
          {isFinanceCodeVisible && (
            <Row>
              <StyledLeftColumn>
                <TextUpper>ETH, tokens, stablecoins, and defi</TextUpper>
                <H2>A new financial system</H2>
                <Subtitle>
                  With Ethereum you can program money, ownership of assets, and
                  financial services.
                </Subtitle>
                <Text>
                  Code that lives on the Ethereum blockchain can store value and
                  move it based on your app’s logic. And your app will be
                  compatible with wallets, Ethereum apps, and tokens by default.
                  Don’t just build a banking app, build a bank. Don’t just
                  disrupt the market, build a new market. Build the future of
                  finance.
                </Text>
              </StyledLeftColumn>
              <RightColumn>
                <Image fluid={data.eth.childImageSharp.fluid} />
              </RightColumn>
            </Row>
          )}
          {!isFinanceCodeVisible && (
            <Row>
              <StyledLeftColumn>
                <TextUpper>ETH, tokens, stablecoins, and defi</TextUpper>
                <H2>A new financial system</H2>
                <Subtitle>
                  Legacy financial systems are not fair. Some folks can’t open
                  bank accounts or take out a loan. The opportunities to build
                  wealth are not equal.
                </Subtitle>
                <Text>
                  Ethereum is a platform for a new financial system that never
                  sleeps or discriminates. It’s a whole digital economy that
                  lets you Send, receive, borrow, exchange, lend, earn interest,
                  and even stream digital funds anywhere in the world – and you
                  only need the internet to join in.
                </Text>
                <ButtonLink isSecondary to="#">
                  Defi
                </ButtonLink>
              </StyledLeftColumn>
              <RightColumn>
                <H3>This code is a bank</H3>
                <Image fluid={data.robot.childImageSharp.fluid} /> 
                <CodeBox>
                  <CodeBoxHeader>
                    <Red />
                    <Yellow />
                    <Green />
                  </CodeBoxHeader>
                  <CodeBoxContent>
                    pragma solidity 0.6.11; contract VendingMachine // Declare
                    state variables of the contract address public owner;
                    mapping (address = uint) public cupcakeBalances; // When
                    'VendingMachine' contract is deployed: // 1. set the
                    deploying address as the owner of the contract // 2. set the
                    deployed smart contract's cupcake balance to 100
                    constructor() public owner = msg.sender;
                    cupcakeBalances[address(this)] = 100; // Allow the owner to
                    increase the smart contract's cupcake balance function
                    refill(uint amount) public require(msg.sender == owner,
                    "Only the owner can refill.") cupcakeBalances[address(this)]
                    += amount; // Allow anyone to purchase cupcakes function
                    purchase(uint amount) public payable require(msg.value =
                    amount * 1 ether, "You must pay at least 1 ETH per
                    cupcake"); require(cupcakeBalances[address(this)] = amount,
                    "Not enough cupcakes in stock to complete this purchase");
                    cupcakeBalances[address(this)] -= amount;
                    cupcakeBalances[msg.sender] += amount;
                  </CodeBoxContent>
                </CodeBox>
                <Image fluid={data.future.childImageSharp.fluid} /> 
              </RightColumn>
            </Row>
          )}
        </ContainerContent>
      </FinanceContainer>
      <InternetContainer>
        <ContainerHeader>
          <OptionContainer>
            <Option
              isActive={isInternetCodeVisible}
              onClick={() => setIsInternetCodeVisible(true)}
            >
              <Emoji mr={`1rem`} text=":keyboard:" />
              <OptionText>Code</OptionText>
            </Option>
            <Option
              isActive={!isInternetCodeVisible}
              onClick={() => setIsInternetCodeVisible(false)}
            >
              <Emoji mr={`1rem`} text=":money_with_wings:" />
              <OptionText>No code</OptionText>
            </Option>
          </OptionContainer>
        </ContainerHeader>
        <ContainerContent>
          {isInternetCodeVisible && (
            <Row>
              <StyledLeftColumn>
                <TextUpper>
                  Smart contracts, p2p networks, and digital ownership
                </TextUpper>
                <H2>A new internet</H2>
                <Subtitle>
                  The internet today is a black box, reliant on centralized
                  servers and intermediaries acting as trusted parties in
                  transactions.
                </Subtitle>
                <Text>
                  Ethereum is a peer-to-peer network that uses code to provide
                  the same guarantees as costly intermediaries, like banks or
                  legal teams. This code, or smart contracts, are open source,
                  providing you a growing catalogue of features you can drop in
                  to your own projects.
                </Text>
                <ButtonLink isSecondary to="/developers/docs/smart-contracts/">
                  Smart contracts
                </ButtonLink>
              </StyledLeftColumn>
              <RightColumn>
                <Image fluid={data.infrastructure.childImageSharp.fluid} />
              </RightColumn>
            </Row>
          )}
          {!isInternetCodeVisible && (
            <Row>
              <StyledLeftColumn>
                <TextUpper>
                  Smart contracts, p2p networks, and digital ownership
                </TextUpper>
                <H2>A new internet</H2>
                <Subtitle>
                  Today, the internet runs on advertising and harvesting your
                  data. It favours big businesses rather than people. It’s a
                  place of immense creativity but creators lose out to the huge
                  intermediaries they have to rely on.{" "}
                </Subtitle>
                <Text>
                  Ethereum is an internet run by people, not companies. An
                  internet where you don’t pay with your personal data, you can
                  earn form it. And it removes a reliance on intermediary
                  services to give creators and independent service providers a
                  more level playing field.{" "}
                </Text>
              </StyledLeftColumn>
              <RightColumn>
                <Image fluid={data.hackathon.childImageSharp.fluid} />
              </RightColumn>
            </Row>
          )}
        </ContainerContent>
      </InternetContainer>
      <FutureContainer>
        <ContainerHeader>
          <OptionContainer>
            <Option
              isActive={isFutureCodeVisible}
              onClick={() => setIsFutureCodeVisible(true)}
            >
              <Emoji mr={`1rem`} text=":keyboard:" />
              <OptionText>Code</OptionText>
            </Option>
            <Option
              isActive={!isFutureCodeVisible}
              onClick={() => setIsFutureCodeVisible(false)}
            >
              <Emoji mr={`1rem`} text=":money_with_wings:" />
              <OptionText>No code</OptionText>
            </Option>
          </OptionContainer>
        </ContainerHeader>
        <ContainerContent>
          {isFutureCodeVisible && (
            <Row>
              <StyledLeftColumn>
                <TextUpper>Decentralized autonomous organisations</TextUpper>
                <H2>A new way to cooperate</H2>
                <Subtitle>
                  Today, most organisations are siloed, bureaucratic and all the
                  power is concentrated at the top. Communities built around
                  common goals rely on trust to function.
                </Subtitle>
                <Text>
                  With Ethereum, you can form decentralized communities around
                  causes you care about with shared rules and no centralized
                  management. This new way to cooperate can change how we
                  organise, how we collaborate and gives everyone a voice.
                </Text>
              </StyledLeftColumn>
              <RightColumn>
                <Image fluid={data.robot.childImageSharp.fluid} />
              </RightColumn>
            </Row>
          )}
          {!isFutureCodeVisible && (
            <Row>
              <StyledLeftColumn>
                <TextUpper>Decentralized autonomous organisations</TextUpper>
                <H2>A new way to cooperate</H2>
                <Subtitle>
                  Today, most organisations are siloed, bureaucratic and all the
                  power is concentrated at the top. Communities built around
                  common goals rely on trust to function.
                </Subtitle>
                <Text>
                  With Ethereum, you can form decentralized communities around
                  causes you care about with shared rules and shared management.
                  This new way to cooperate can change how we organise, how we
                  collaborate and gives everyone a voice.
                </Text>
                <ButtonLink isSecondary to="#">
                  DAOs
                </ButtonLink>
              </StyledLeftColumn>
              <RightColumn>
                <Image fluid={data.impact.childImageSharp.fluid} />
              </RightColumn>
            </Row>
          )}
        </ContainerContent>
      </FutureContainer> 
    */}
      <TestContainer>
        {isFinanceCodeVisible && (
          <Row>
            <TestStyledLeftColumn>
              <TestOptionContainer>
                <TestOption
                  isActive={isFinanceCodeVisible}
                  onClick={() => setIsFinanceCodeVisible(true)}
                >
                  <Emoji mr={`1rem`} text=":keyboard:" />
                  <TestOptionText>Code</TestOptionText>
                </TestOption>
                <TestOptionRight
                  isActive={!isFinanceCodeVisible}
                  onClick={() => setIsFinanceCodeVisible(false)}
                >
                  <Emoji mr={`1rem`} text=":money_with_wings:" />
                  <TestOptionText>No code</TestOptionText>
                </TestOptionRight>
              </TestOptionContainer>
              <TextUpper>ETH, TOKENS, STABLECOINS, AND DEFI</TextUpper>
              <StyledH2>A new financial system</StyledH2>
              <TestSubtitle>
                With Ethereum you can program money, ownership of assets, and
                financial services.
              </TestSubtitle>
              <Text>
                Code that lives on the Ethereum blockchain can store value and
                move it based on your app’s logic. And your app will be
                compatible with wallets, Ethereum apps, and tokens by default.
                Don’t just build a banking app, build a bank. Don’t just disrupt
                the market, build a new market. Build the future of finance.
              </Text>
            </TestStyledLeftColumn>
            <TestCodeBox>
              <CodeBoxHeader>
                <Red />
                <Yellow />
                <Green />
              </CodeBoxHeader>
              <TestCodeBoxContent>
                // This contract is a bank pragma solidity 0.6.11; contract
                VendingMachine // Declare state variables of the contract
                address public owner; mapping (address = uint) public
                cupcakeBalances; // When 'VendingMachine' contract is deployed:
                // 1. set the deploying address as the owner of the contract //
                2. set the deployed smart contract's cupcake balance to 100
                constructor() public owner = msg.sender;
                cupcakeBalances[address(this)] = 100; // Allow the owner to
                increase the smart contract's cupcake balance function
                refill(uint amount) public require(msg.sender == owner, "Only
                the owner can refill.") cupcakeBalances[address(this)] +=
                amount; // Allow anyone to purchase cupcakes function
                purchase(uint amount) public payable require(msg.value = amount
                * 1 ether, "You must pay at least 1 ETH per cupcake");
                require(cupcakeBalances[address(this)] = amount, "Not enough
                cupcakes in stock to complete this purchase");
                cupcakeBalances[address(this)] -= amount;
                cupcakeBalances[msg.sender] += amount; pragma solidity 0.6.11;
                contract VendingMachine // Declare state variables of the
                contract address public owner; mapping (address = uint) public
                cupcakeBalances; // When 'VendingMachine' contract is deployed:
                // 1. set the deploying address as the owner of the contract //
                2. set the deployed smart contract's cupcake balance to 100
                constructor() public owner = msg.sender;
                cupcakeBalances[address(this)] = 100; // Allow the owner to
                increase the smart contract's cupcake balance function
                refill(uint amount) public require(msg.sender == owner, "Only
                the owner can refill.") cupcakeBalances[address(this)] +=
                amount; // Allow anyone to purchase cupcakes function
                purchase(uint amount) public payable require(msg.value = amount
                * 1 ether, "You must pay at least 1 ETH per cupcake");
                require(cupcakeBalances[address(this)] = amount, "Not enough
                cupcakes in stock to complete this purchase");
                cupcakeBalances[address(this)] -= amount;
                cupcakeBalances[msg.sender] += amount; pragma solidity 0.6.11;
                contract VendingMachine // Declare state variables of the
                contract address public owner; mapping (address = uint) public
                cupcakeBalances; // When 'VendingMachine' contract is deployed:
                // 1. set the deploying address as the owner of the contract //
                2. set the deployed smart contract's cupcake balance to 100
                constructor() public owner = msg.sender;
                cupcakeBalances[address(this)] = 100; // Allow the owner to
                increase the smart contract's cupcake balance function
                refill(uint amount) public require(msg.sender == owner, "Only
                the owner can refill.") cupcakeBalances[address(this)] +=
                amount; // Allow anyone to purchase cupcakes function
                purchase(uint amount) public payable require(msg.value = amount
                * 1 ether, "You must pay at least 1 ETH per cupcake");
                require(cupcakeBalances[address(this)] = amount, "Not enough
                cupcakes in stock to complete this purchase");
                cupcakeBalances[address(this)] -= amount;
                cupcakeBalances[msg.sender] += amount;pragma solidity 0.6.11;
                contract VendingMachine // Declare state variables of the
                contract address public owner; mapping (address = uint) public
                cupcakeBalances; // When 'VendingMachine' contract is deployed:
                // 1. set the deploying address as the owner of the contract //
                2. set the deployed smart contract's cupcake balance to 100
                constructor() public owner = msg.sender;
                cupcakeBalances[address(this)] = 100; // Allow the owner to
                increase the smart contract's cupcake balance function
                refill(uint amount) public require(msg.sender == owner, "Only
                the owner can refill.") cupcakeBalances[address(this)] +=
                amount; // Allow anyone to purchase cupcakes function
                purchase(uint amount) public payable require(msg.value = amount
                * 1 ether, "You must pay at least 1 ETH per cupcake");
                require(cupcakeBalances[address(this)] = amount, "Not enough
                cupcakes in stock to complete this purchase");
                cupcakeBalances[address(this)] -= amount;
                cupcakeBalances[msg.sender] += amount;
              </TestCodeBoxContent>
            </TestCodeBox>
          </Row>
        )}
        {!isFinanceCodeVisible && (
          <Row>
            <TestStyledLeftColumn>
              <TestOptionContainer>
                <TestOption
                  isActive={isFinanceCodeVisible}
                  onClick={() => setIsFinanceCodeVisible(true)}
                >
                  <Emoji mr={`1rem`} text=":keyboard:" />
                  <TestOptionText>Code</TestOptionText>
                </TestOption>
                <TestOptionRight
                  isActive={!isFinanceCodeVisible}
                  onClick={() => setIsFinanceCodeVisible(false)}
                >
                  <Emoji mr={`1rem`} text=":money_with_wings:" />
                  <TestOptionText>No code</TestOptionText>
                </TestOptionRight>
              </TestOptionContainer>
              <TextUpper>ETH, TOKENS, STABLECOINS, AND DEFI</TextUpper>
              <StyledH2>A new financial system</StyledH2>
              <TestSubtitle>
                Legacy financial systems are not fair. Some folks can’t open
                bank accounts or take out a loan. The opportunities to build
                wealth are not equal.
              </TestSubtitle>
              <Text>
                Ethereum is a platform for a new financial system that never
                sleeps or discriminates. It’s a whole digital economy that lets
                you Send, receive, borrow, exchange, lend, earn interest, and
                even stream digital funds anywhere in the world – and you only
                need the internet to join in.
              </Text>
              <ButtonLink isSecondary to="#">
                Explore finance products
              </ButtonLink>
            </TestStyledLeftColumn>
            <DefiBox>
              <DefiLabel>
                TOTAL VALUE IN THE ETHEREUM DIGITAL ECONOMY ($USD)
                <Tooltip content={defiTooltipContent}>
                  <InfoIcon name="info" size="14" />
                </Tooltip>
              </DefiLabel>
              <DefiStat>152,000,000,000</DefiStat>
              <LinkRow>
                <StyledLink
                  isActive={is30Visible}
                  onClick={() => setIs30Visible(true)}
                >
                  30 days
                </StyledLink>
                <StyledLink
                  isActive={!is30Visible}
                  onClick={() => setIs30Visible(false)}
                >
                  1 year
                </StyledLink>
              </LinkRow>
              {is30Visible && (
                <svg
                  width="720"
                  height="546"
                  viewBox="0 0 722 546"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 524L6.5 523.371L12.5 524L18 522.114L22.5 523.371L35 524L39.5 520.857L46.5 518.343L56 516.457L58 517.085L66.5 516.457L74 515.2L108 506.399H117.5H125L133 510.171L140.5 506.399L145.5 505.77H149.5L152.5 503.885H161.5L166 501.37H174.5L178 503.256L181.5 498.227H191L194.5 496.97L199.5 493.198H202.5L209 476.226L213.5 481.883L227 476.226H233.5L239 471.826H244.5L254 455.482L262.5 459.254L266.5 455.482H270L274 451.082L284.5 425.938L286 429.081L292.5 417.137L294 419.023L296.5 416.508L299 417.137L300 415.88H303L305.5 414.623L306.5 413.365L313.5 402.679L315 405.822L319 402.679L324.5 393.879L326 396.393L336.5 378.163L338 383.821L341 381.306V378.163L344 374.392L345 378.163L348 374.392L350 373.763L353 371.249L354.5 373.135L378 303.988L380.5 317.189L384 308.388H386.5L389.5 303.988L394.5 297.073L400 285.758L403.5 287.644L413.5 273.815L417 277.587L422.5 271.929L434 259.357L438 248.042L441 250.557L459 225.412L461.5 230.441L466 225.412L474 207.183L478.5 211.583L491.5 182.038L494 184.553L508 168.209L510.5 170.095L519 200.268L533 148.722L535.5 157.523L542.5 148.722L548 130.493L551.5 136.15L569.5 102.834L589.5 112.263L626.5 44.3738L634 53.1743L659 21.744L663 29.2873L667 24.887L668 28.03L671 24.887H672.5L675 23.6298L677 21.1154L683 29.9159L686.5 15.4579L689 17.9724L691.5 16.7151L695 14.2007H698L709 9.17188L711 4.14303L714 1.62861L717.5 4.77163L721 1"
                    stroke="#FF7324"
                    stroke-width="2"
                  />
                  <path
                    d="M1 524L6.5 523.371L12.5 524L18 522.114L22.5 523.371L35 524L39.5 520.857L46.5 518.343L56 516.457L58 517.085L66.5 516.457L74 515.2L108 506.399H117.5H125L133 510.171L140.5 506.399L145.5 505.77H149.5L152.5 503.885H161.5L166 501.37H174.5L178 503.256L181.5 498.227H191L194.5 496.97L199.5 493.198H202.5L209 476.226L213.5 481.883L227 476.226H233.5L239 471.826H244.5L254 455.482L262.5 459.254L266.5 455.482H270L274 451.082L284.5 425.938L286 429.081L292.5 417.137L294 419.023L296.5 416.508L299 417.137L300 415.88H303L305.5 414.623L306.5 413.365L313.5 402.679L315 405.822L319 402.679L324.5 393.879L326 396.393L336.5 378.163L338 383.821L341 381.306V378.163L344 374.392L345 378.163L348 374.392L350 373.763L353 371.249L354.5 373.135L378 303.988L380.5 317.189L384 308.388H386.5L389.5 303.988L394.5 297.073L400 285.758L403.5 287.644L413.5 273.815L417 277.587L422.5 271.929L434 259.357L438 248.042L441 250.557L459 225.412L461.5 230.441L466 225.412L474 207.183L478.5 211.583L491.5 182.038L494 184.553L508 168.209L510.5 170.095L519 200.268L533 148.722L535.5 157.523L542.5 148.722L548 130.493L551.5 136.15L569.5 102.834L589.5 112.263L626.5 44.3738L634 53.1743L659 21.744L663 29.2873L667 24.887L668 28.03L671 24.887H672.5L675 23.6298L677 21.1154L683 29.9159L686.5 15.4579L689 17.9724L691.5 16.7151L695 14.2007H698L709 9.17188L711 4.14303L714 1.62861L717.5 4.77163L721 1"
                    stroke="white"
                    stroke-opacity="0.2"
                    stroke-width="2"
                  />
                  <path
                    d="M6.5 523.371L1 524V545.5H721V1L717.5 4.77163L714 1.62861L711 4.14303L709 9.17188L698 14.2007H695L691.5 16.7151L689 17.9724L686.5 15.4579L683 29.9159L677 21.1154L675 23.6298L672.5 24.887H671L668 28.03L667 24.887L663 29.2873L659 21.744L634 53.1743L626.5 44.3738L589.5 112.263L569.5 102.834L551.5 136.15L548 130.493L542.5 148.722L535.5 157.523L533 148.722L519 200.268L510.5 170.095L508 168.209L494 184.553L491.5 182.038L478.5 211.583L474 207.183L466 225.412L461.5 230.441L459 225.412L441 250.557L438 248.042L434 259.357L422.5 271.929L417 277.587L413.5 273.815L403.5 287.644L400 285.758L394.5 297.073L389.5 303.988L386.5 308.388H384L380.5 317.189L378 303.988L354.5 373.135L353 371.249L350 373.763L348 374.392L345 378.163L344 374.392L341 378.163V381.306L338 383.821L336.5 378.163L326 396.393L324.5 393.879L319 402.679L315 405.822L313.5 402.679L306.5 413.365L305.5 414.623L303 415.88H300L299 417.137L296.5 416.508L294 419.023L292.5 417.137L286 429.081L284.5 425.938L274 451.082L270 455.482H266.5L262.5 459.254L254 455.482L244.5 471.826H239L233.5 476.226H227L213.5 481.883L209 476.226L202.5 493.198H199.5L194.5 496.97L191 498.227H181.5L178 503.256L174.5 501.37H166L161.5 503.885H152.5L149.5 505.77H145.5L140.5 506.399L133 510.171L125 506.399H117.5H108L74 515.2L66.5 516.457L58 517.085L56 516.457L46.5 518.343L39.5 520.857L35 524L22.5 523.371L18 522.114L12.5 524L6.5 523.371Z"
                    fill="url(#paint0_linear)"
                    fill-opacity="0.2"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear"
                      x1="721"
                      y1="85"
                      x2="12.5"
                      y2="553.5"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#FF7425" />
                      <stop offset="0.546875" stop-color="white" />
                    </linearGradient>
                  </defs>
                </svg>
              )}
              {!is30Visible && (
                <div>
                  <svg
                    width="722"
                    height="554"
                    viewBox="0 0 722 554"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30.5 293L1 328.5V553.5H721.5V26.9971L702.5 17.5L683 20.4971L660 48.4971L633 11.4971L578 2L547.5 17.5L525 66.5L483.5 28.4998L476 37.9998L466 39.4998L456.5 55.4998L438 93.4998L413.5 78.3147L400 90.2583L384 112.888L378 108.488L354.5 177.634L336.5 182.663L318.5 214L274 230.437L266.5 252L257 245.5L243 261L224.5 234.5L199.5 261L183 245.5L120 277L98.5 266L71 274.5L56 279.5L50.5 286.5L30.5 293Z"
                      fill="url(#paint0_linear)"
                    />
                    <path
                      d="M1 328.5L30.5 293L50.5 286.5L56 279.5L71 274.5L98.5 266L120 277L183 245.5L199.5 261L224.5 234.5L243 261L257 245.5L266.5 252L274 230.437L318.5 214L336.5 182.663L354.5 177.634L378 108.488L384 112.888L400 90.2583L413.5 78.3147L438 93.4998L456.5 55.4998L466 39.4998L476 37.9998L483.5 28.4998L525 66.5L547.5 17.5L578 2L633 11.4971L660 48.4971L683 20.4971L702.5 17.5L721.5 26.9971"
                      stroke="#FF7324"
                      stroke-width="2"
                    />
                    <path
                      d="M1 328.5L30.5 293L50.5 286.5L56 279.5L71 274.5L98.5 266L120 277L183 245.5L199.5 261L224.5 234.5L243 261L257 245.5L266.5 252L274 230.437L318.5 214L336.5 182.663L354.5 177.634L378 108.488L384 112.888L400 90.2583L413.5 78.3147L438 93.4998L456.5 55.4998L466 39.4998L476 37.9998L483.5 28.4998L525 66.5L547.5 17.5L578 2L633 11.4971L660 48.4971L683 20.4971L702.5 17.5L721.5 26.9971"
                      stroke="white"
                      stroke-opacity="0.2"
                      stroke-width="2"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="-380.5"
                        y1="-348"
                        x2="256"
                        y2="547.5"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FF7324" />
                        <stop offset="1" stop-color="white" />
                        <stop
                          offset="1"
                          stop-color="#C4C4C4"
                          stop-opacity="0"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              )}
            </DefiBox>
          </Row>
        )}
      </TestContainer>

      <TestContainerReverse>
        {isInternetCodeVisible && (
          <Row>
            <TestCodeBox>
              <CodeBoxHeader>
                <Red />
                <Yellow />
                <Green />
              </CodeBoxHeader>
              <TestCodeBoxContent>
                // ENS contract pragma solidity 0.6.11; contract VendingMachine
                // Declare state variables of the contract address public owner;
                mapping (address = uint) public cupcakeBalances; // When
                'VendingMachine' contract is deployed: // 1. set the deploying
                address as the owner of the contract // 2. set the deployed
                smart contract's cupcake balance to 100 constructor() public
                owner = msg.sender; cupcakeBalances[address(this)] = 100; //
                Allow the owner to increase the smart contract's cupcake balance
                function refill(uint amount) public require(msg.sender == owner,
                "Only the owner can refill.") cupcakeBalances[address(this)] +=
                amount; // Allow anyone to purchase cupcakes function
                purchase(uint amount) public payable require(msg.value = amount
                * 1 ether, "You must pay at least 1 ETH per cupcake");
                require(cupcakeBalances[address(this)] = amount, "Not enough
                cupcakes in stock to complete this purchase");
                cupcakeBalances[address(this)] -= amount;
                cupcakeBalances[msg.sender] += amount; pragma solidity 0.6.11;
                contract VendingMachine // Declare state variables of the
                contract address public owner; mapping (address = uint) public
                cupcakeBalances; // When 'VendingMachine' contract is deployed:
                // 1. set the deploying address as the owner of the contract //
                2. set the deployed smart contract's cupcake balance to 100
                constructor() public owner = msg.sender;
                cupcakeBalances[address(this)] = 100; // Allow the owner to
                increase the smart contract's cupcake balance function
                refill(uint amount) public require(msg.sender == owner, "Only
                the owner can refill.") cupcakeBalances[address(this)] +=
                amount; // Allow anyone to purchase cupcakes function
                purchase(uint amount) public payable require(msg.value = amount
                * 1 ether, "You must pay at least 1 ETH per cupcake");
                require(cupcakeBalances[address(this)] = amount, "Not enough
                cupcakes in stock to complete this purchase");
                cupcakeBalances[address(this)] -= amount;
                cupcakeBalances[msg.sender] += amount; pragma solidity 0.6.11;
                contract VendingMachine // Declare state variables of the
                contract address public owner; mapping (address = uint) public
                cupcakeBalances; // When 'VendingMachine' contract is deployed:
                // 1. set the deploying address as the owner of the contract //
                2. set the deployed smart contract's cupcake balance to 100
                constructor() public owner = msg.sender;
                cupcakeBalances[address(this)] = 100; // Allow the owner to
                increase the smart contract's cupcake balance function
                refill(uint amount) public require(msg.sender == owner, "Only
                the owner can refill.") cupcakeBalances[address(this)] +=
                amount; // Allow anyone to purchase cupcakes function
                purchase(uint amount) public payable require(msg.value = amount
                * 1 ether, "You must pay at least 1 ETH per cupcake");
                require(cupcakeBalances[address(this)] = amount, "Not enough
                cupcakes in stock to complete this purchase");
                cupcakeBalances[address(this)] -= amount;
                cupcakeBalances[msg.sender] += amount;pragma solidity 0.6.11;
                contract VendingMachine // Declare state variables of the
                contract address public owner; mapping (address = uint) public
                cupcakeBalances; // When 'VendingMachine' contract is deployed:
                // 1. set the deploying address as the owner of the contract //
                2. set the deployed smart contract's cupcake balance to 100
                constructor() public owner = msg.sender;
                cupcakeBalances[address(this)] = 100; // Allow the owner to
                increase the smart contract's cupcake balance function
                refill(uint amount) public require(msg.sender == owner, "Only
                the owner can refill.") cupcakeBalances[address(this)] +=
                amount; // Allow anyone to purchase cupcakes function
                purchase(uint amount) public payable require(msg.value = amount
                * 1 ether, "You must pay at least 1 ETH per cupcake");
                require(cupcakeBalances[address(this)] = amount, "Not enough
                cupcakes in stock to complete this purchase");
                cupcakeBalances[address(this)] -= amount;
                cupcakeBalances[msg.sender] += amount;
              </TestCodeBoxContent>
            </TestCodeBox>
            <TestStyledLeftColumn>
              <TestOptionContainer>
                <TestOption
                  isActive={isInternetCodeVisible}
                  onClick={() => setIsInternetCodeVisible(true)}
                >
                  <Emoji mr={`1rem`} text=":keyboard:" />
                  <TestOptionText>Code</TestOptionText>
                </TestOption>
                <TestOptionRight
                  isActive={!isInternetCodeVisible}
                  onClick={() => setIsInternetCodeVisible(false)}
                >
                  <Emoji mr={`1rem`} text=":money_with_wings:" />
                  <TestOptionText>No code</TestOptionText>
                </TestOptionRight>
              </TestOptionContainer>
              <TextUpper>
                SMART CONTRACTS, P2P NETWORKS, AND DIGITAL OWNERSHIP
              </TextUpper>
              <StyledH2>A new internet</StyledH2>
              <TestSubtitle>
                The internet today is a black box, reliant on centralized
                servers and intermediaries acting as trusted parties in
                transactions.
              </TestSubtitle>
              <Text>
                Ethereum is a peer-to-peer network that uses smart contracts to
                provide the same guarantees as costly intermediaries, like banks
                or legal teams. With Ethereum as their backend, they can hold
                value and release funds when certain verifiable conditions are
                met. Most are open source too, providing you a growing catalogue
                of features you can drop in to your own projects.
              </Text>
            </TestStyledLeftColumn>
          </Row>
        )}
        {!isInternetCodeVisible && (
          <Row>
            <NFTBoxGrid items={features} />
            <TestStyledLeftColumn>
              <TestOptionContainer>
                <TestOption
                  isActive={isInternetCodeVisible}
                  onClick={() => setIsInternetCodeVisible(true)}
                >
                  <Emoji mr={`1rem`} text=":keyboard:" />
                  <TestOptionText>Code</TestOptionText>
                </TestOption>
                <TestOptionRight
                  isActive={!isInternetCodeVisible}
                  onClick={() => setIsInternetCodeVisible(false)}
                >
                  <Emoji mr={`1rem`} text=":money_with_wings:" />
                  <TestOptionText>No code</TestOptionText>
                </TestOptionRight>
              </TestOptionContainer>
              <TextUpper>
                SMART CONTRACTS, P2P NETWORKS, AND DIGITAL OWNERSHIP
              </TextUpper>
              <StyledH2>A new internet</StyledH2>
              <TestSubtitle>
                Today, the internet relies on centralized service providers.
                It’s a place of immense creativity but creators lose out to the
                huge intermediaries they have to rely on.
              </TestSubtitle>
              <Text>
                Ethereum is an internet that give creators and service providers
                more earning potential. It brings assets like art, music, or
                even real estate into the digital realm by creating provable
                certificates of ownership. The ownership history lives on
                Ethereum for all to see so assets can be traded securely
                anywhere in the world peer to peer – without the need for a
                company to facilitate at a cost.
              </Text>
              <ButtonLink isSecondary to="#">
                Smart contracts
              </ButtonLink>
            </TestStyledLeftColumn>
          </Row>
        )}
      </TestContainerReverse>

      <TestContainer3>
        {isFutureCodeVisible && (
          <Row>
            <TestStyledLeftColumn>
              <TestOptionContainer>
                <TestOption
                  isActive={isFutureCodeVisible}
                  onClick={() => setIsFutureCodeVisible(true)}
                >
                  <Emoji mr={`1rem`} text=":keyboard:" />
                  <TestOptionText>Code</TestOptionText>
                </TestOption>
                <TestOptionRight
                  isActive={!isFutureCodeVisible}
                  onClick={() => setIsFutureCodeVisible(false)}
                >
                  <Emoji mr={`1rem`} text=":money_with_wings:" />
                  <TestOptionText>No code</TestOptionText>
                </TestOptionRight>
              </TestOptionContainer>
              <TextUpper>Decentralized autonomous organisations</TextUpper>
              <StyledH2>A new way to cooperate</StyledH2>
              <TestSubtitle>
                Today, most organisations are siloed, bureaucratic and all the
                power is concentrated at the top. Communities built around
                common goals rely on trust to function.
              </TestSubtitle>
              <Text>
                With Ethereum, you can form decentralized communities around
                causes you care about with shared rules and no centralized
                management. This new way to cooperate can change how we
                organise, how we collaborate and gives everyone a voice.
              </Text>
            </TestStyledLeftColumn>
            <TestCodeBox>
              <CodeBoxHeader>
                <Red />
                <Yellow />
                <Green />
              </CodeBoxHeader>
              <TestCodeBoxContent>
                // DAO contract pragma solidity 0.6.11; contract VendingMachine
                // Declare state variables of the contract address public owner;
                mapping (address = uint) public cupcakeBalances; // When
                'VendingMachine' contract is deployed: // 1. set the deploying
                address as the owner of the contract // 2. set the deployed
                smart contract's cupcake balance to 100 constructor() public
                owner = msg.sender; cupcakeBalances[address(this)] = 100; //
                Allow the owner to increase the smart contract's cupcake balance
                function refill(uint amount) public require(msg.sender == owner,
                "Only the owner can refill.") cupcakeBalances[address(this)] +=
                amount; // Allow anyone to purchase cupcakes function
                purchase(uint amount) public payable require(msg.value = amount
                * 1 ether, "You must pay at least 1 ETH per cupcake");
                require(cupcakeBalances[address(this)] = amount, "Not enough
                cupcakes in stock to complete this purchase");
                cupcakeBalances[address(this)] -= amount;
                cupcakeBalances[msg.sender] += amount; pragma solidity 0.6.11;
                contract VendingMachine // Declare state variables of the
                contract address public owner; mapping (address = uint) public
                cupcakeBalances; // When 'VendingMachine' contract is deployed:
                // 1. set the deploying address as the owner of the contract //
                2. set the deployed smart contract's cupcake balance to 100
                constructor() public owner = msg.sender;
                cupcakeBalances[address(this)] = 100; // Allow the owner to
                increase the smart contract's cupcake balance function
                refill(uint amount) public require(msg.sender == owner, "Only
                the owner can refill.") cupcakeBalances[address(this)] +=
                amount; // Allow anyone to purchase cupcakes function
                purchase(uint amount) public payable require(msg.value = amount
                * 1 ether, "You must pay at least 1 ETH per cupcake");
                require(cupcakeBalances[address(this)] = amount, "Not enough
                cupcakes in stock to complete this purchase");
                cupcakeBalances[address(this)] -= amount;
                cupcakeBalances[msg.sender] += amount; pragma solidity 0.6.11;
                contract VendingMachine // Declare state variables of the
                contract address public owner; mapping (address = uint) public
                cupcakeBalances; // When 'VendingMachine' contract is deployed:
                // 1. set the deploying address as the owner of the contract //
                2. set the deployed smart contract's cupcake balance to 100
                constructor() public owner = msg.sender;
                cupcakeBalances[address(this)] = 100; // Allow the owner to
                increase the smart contract's cupcake balance function
                refill(uint amount) public require(msg.sender == owner, "Only
                the owner can refill.") cupcakeBalances[address(this)] +=
                amount; // Allow anyone to purchase cupcakes function
                purchase(uint amount) public payable require(msg.value = amount
                * 1 ether, "You must pay at least 1 ETH per cupcake");
                require(cupcakeBalances[address(this)] = amount, "Not enough
                cupcakes in stock to complete this purchase");
                cupcakeBalances[address(this)] -= amount;
                cupcakeBalances[msg.sender] += amount;pragma solidity 0.6.11;
                contract VendingMachine // Declare state variables of the
                contract address public owner; mapping (address = uint) public
                cupcakeBalances; // When 'VendingMachine' contract is deployed:
                // 1. set the deploying address as the owner of the contract //
                2. set the deployed smart contract's cupcake balance to 100
                constructor() public owner = msg.sender;
                cupcakeBalances[address(this)] = 100; // Allow the owner to
                increase the smart contract's cupcake balance function
                refill(uint amount) public require(msg.sender == owner, "Only
                the owner can refill.") cupcakeBalances[address(this)] +=
                amount; // Allow anyone to purchase cupcakes function
                purchase(uint amount) public payable require(msg.value = amount
                * 1 ether, "You must pay at least 1 ETH per cupcake");
                require(cupcakeBalances[address(this)] = amount, "Not enough
                cupcakes in stock to complete this purchase");
                cupcakeBalances[address(this)] -= amount;
                cupcakeBalances[msg.sender] += amount;
              </TestCodeBoxContent>
            </TestCodeBox>
          </Row>
        )}
        {!isFutureCodeVisible && (
          <Row>
            <TestStyledLeftColumn>
              <TestOptionContainer>
                <TestOption
                  isActive={isFutureCodeVisible}
                  onClick={() => setIsFutureCodeVisible(true)}
                >
                  <Emoji mr={`1rem`} text=":keyboard:" />
                  <TestOptionText>Code</TestOptionText>
                </TestOption>
                <TestOptionRight
                  isActive={!isFutureCodeVisible}
                  onClick={() => setIsFutureCodeVisible(false)}
                >
                  <Emoji mr={`1rem`} text=":money_with_wings:" />
                  <TestOptionText>No code</TestOptionText>
                </TestOptionRight>
              </TestOptionContainer>
              <TextUpper>Quadratic funding</TextUpper>
              <StyledH2>A new way to cooperate</StyledH2>
              <TestSubtitle>
                Today, most organisations are siloed, bureaucratic and all the
                power is concentrated at the top. Communities built around
                common goals rely on trust to function.
              </TestSubtitle>
              <Text>
                Ethereum quadratic funding rewards causes that have the most
                demand, not just the wealthiest backers. Any funds added to a
                matching pool will be distributed amongst the causes based on
                value and quantity of contributions.
              </Text>
              {/* 
                  <ButtonLink isSecondary to="#">
                    DAOs
                  </ButtonLink> 
              */}
            </TestStyledLeftColumn>
            test
          </Row>
        )}
      </TestContainer3>
      <H2>Ethereum today</H2>
      <Row>
        <StatContainer>
          <Emoji mb={"1rem"} size={2} text=":money_with_wings:" />
          <StatCaption>
            ETH price (USD)
            <Tooltip content={tooltipContent}>
              <InfoIcon name="info" size="14" />
            </Tooltip>
          </StatCaption>
          <Stat>$512</Stat>
        </StatContainer>
        <StatContainer>
          <Emoji mb={"1rem"} size={2} text=":handshake:" />
          <StatCaption>Transactions today</StatCaption>
          <Stat>10,000,000,000</Stat>
        </StatContainer>
        <StatContainer>
          <Emoji mb={"1rem"} size={2} text=":chart_with_upwards_trend:" />
          <StatCaption>Daily transaction value (USD)</StatCaption>
          <Stat>$21,000,000</Stat>
        </StatContainer>
        <StatContainer>
          <Emoji mb={"1rem"} size={2} text=":computer:" />
          <StatCaption>
            Nodes
            <Tooltip content={nodeTooltipContent}>
              <InfoIcon name="info" size="14" />
            </Tooltip>
          </StatCaption>
          <Stat>12,000</Stat>
        </StatContainer>
      </Row>
      <Content>
        <ToutRow>
          <Tout>
            <ImageContainer>
              <Image
                fixed={data.developers.childImageSharp.fixed}
                alt={translateMessageId(
                  "page-what-is-ethereum-alt-img-social",
                  intl
                )}
              />
            </ImageContainer>
            <H3>Build with Ethereum</H3>
            <Text>
              See how Ethereum can open up new business models, reduce your
              costs and future-proof your business.
            </Text>
            <div>
              <ButtonLink to="/developers/">Developer portal</ButtonLink>
            </div>
          </Tout>
          <Tout>
            <ImageContainer>
              <Image
                fixed={data.enterprise.childImageSharp.fixed}
                alt={translateMessageId(
                  "page-what-is-ethereum-alt-img-social",
                  intl
                )}
              />
            </ImageContainer>
            <H3>Add Ethereum to your business</H3>
            <Text>
              See how Ethereum can open up new business models, reduce your
              costs and future-proof your business.
            </Text>
            <div>
              <ButtonLink to="/enterprise/">Mainnet for enterprise</ButtonLink>
            </div>
          </Tout>
        </ToutRow>
      </Content>
    </Page>
  )
}

export default NewHomePage

export const query = graphql`
  query {
    hero: file(relativePath: { eq: "home/hero.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    ethereum: file(relativePath: { eq: "what-is-ethereum.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    developers: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    enterprise: file(relativePath: { eq: "enterprise-eth.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    future: file(relativePath: { eq: "future_transparent.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    impact: file(relativePath: { eq: "impact_transparent.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    infrastructure: file(
      relativePath: { eq: "infrastructure_transparent.png" }
    ) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    hackathon: file(relativePath: { eq: "hackathon_transparent.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    impactfixed: file(relativePath: { eq: "impact_transparent.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    infrastructurefixed: file(
      relativePath: { eq: "infrastructure_transparent.png" }
    ) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    hackathonfixed: file(relativePath: { eq: "hackathon_transparent.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    robot: file(relativePath: { eq: "wallet.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    eth: file(relativePath: { eq: "eth.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
