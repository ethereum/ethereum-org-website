import React, { useState } from "react"
import { useIntl } from "gatsby-plugin-intl"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Icon from "../components/Icon"
import styled from "styled-components"
import Emoji from "../components/Emoji"
import Tooltip from "../components/Tooltip"
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
  border-top: 1px solid "#ffffff";
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
const Image = styled(Img)`
  height: 480px;
  background-size: cover;
  background: no-repeat 50px;
`

const ContainerContent = styled.div`
  padding: 2rem 12rem;
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
  fill: ${(props) => props.theme.colors.primary};
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
  margin-bottom: 1rem;
`

const TextUpper = styled.div`
  font-size: 16px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 1rem;
  text-transform: uppercase;
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

// TODO refactor so all content versions display the same info
const NewHomePage = ({ data }) => {
  const intl = useIntl()
  const contentVersion = getLangContentVersion(intl.locale)
  const [isFinanceCodeVisible, setIsFinanceCodeVisible] = useState(
    isFinanceCodeVisible
  )
  const [isInternetCodeVisible, setIsInternetCodeVisible] = useState(
    isInternetCodeVisible
  )
  const [isFutureCodeVisible, setIsFutureCodeVisible] = useState(
    isFutureCodeVisible
  )

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
      <FinanceContainer>
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
              <LeftColumn>
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
              </LeftColumn>
              <RightColumn>
                <Image fluid={data.eth.childImageSharp.fluid} />
              </RightColumn>
            </Row>
          )}
          {!isFinanceCodeVisible && (
            <Row>
              <LeftColumn>
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
              </LeftColumn>
              <RightColumn>
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
              <LeftColumn>
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
              </LeftColumn>
              <RightColumn>
                <Image fluid={data.infrastructure.childImageSharp.fluid} />
              </RightColumn>
            </Row>
          )}
          {!isInternetCodeVisible && (
            <Row>
              <LeftColumn>
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
              </LeftColumn>
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
              <LeftColumn>
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
              </LeftColumn>
              <RightColumn>
                <Image fluid={data.robot.childImageSharp.fluid} />
              </RightColumn>
            </Row>
          )}
          {!isFutureCodeVisible && (
            <Row>
              <LeftColumn>
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
              </LeftColumn>
              <RightColumn>
                <Image fluid={data.impact.childImageSharp.fluid} />
              </RightColumn>
            </Row>
          )}
        </ContainerContent>
      </FutureContainer>

      <H2>Ethereum today</H2>
      <Row>
        <StatContainer>
          <Emoji mb={"1rem"} size={2} text=":money_with_wings:" />
          <Stat>$512</Stat>
          <StatCaption>
            <span>
              ETH price (USD){" "}
              <Tooltip content={tooltipContent}>
                <InfoIcon name="info" size="14" />
              </Tooltip>
            </span>
          </StatCaption>
        </StatContainer>
        <StatContainer>
          <Emoji mb={"1rem"} size={2} text=":handshake:" />
          <Stat>10,000,000,000</Stat>
          <StatCaption>Transactions today</StatCaption>
        </StatContainer>
        <StatContainer>
          <Emoji mb={"1rem"} size={2} text=":chart_with_upwards_trend:" />
          <Stat>$21,000,000</Stat>
          <StatCaption>Daily transaction value (USD)</StatCaption>
        </StatContainer>
        <StatContainer>
          <Emoji mb={"1rem"} size={2} text=":computer:" />
          <Stat>12,000</Stat>
          <StatCaption>Nodes</StatCaption>
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
