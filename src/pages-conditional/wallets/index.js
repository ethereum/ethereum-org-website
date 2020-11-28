import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { useIntl } from "gatsby-plugin-intl"
import { graphql } from "gatsby"

import Translation from "../../components/Translation"
import { getDefaultMessage } from "../../utils/translations"
import Callout from "../../components/Callout"
import Card from "../../components/Card"
import Link from "../../components/Link"
import ButtonLink from "../../components/ButtonLink"
import PageMetadata from "../../components/PageMetadata"
import HorizontalCard from "../../components/HorizontalCard"
import CardList from "../../components/CardList"
import {
  CardContainer,
  Content,
  Divider,
  GrayContainer,
  Page,
  StyledCard,
  TwoColumnContent,
} from "../../components/SharedStyledComponents"

const StyledTwoColumnContent = styled(TwoColumnContent)`
  margin-bottom: -2rem;
  margin-top: 2rem;
`

const LeftColumn = styled.div`
  flex: 0 1 50%;
  margin-right: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    max-width: 100%;
    margin-right: 0;
    margin-top: 0;
  }
`

const RightColumn = styled.div`
  flex: 0 1 50%;
  margin-left: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 3rem;
    max-width: 100%;
    margin-left: 0;
  }
`

const HeroContent = styled(Content)`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0;

  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    padding: 1rem 2rem 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const HeroCopy = styled.div`
  flex: 1 1 50%;
  min-width: 300px;
  margin-top: 8rem;
  @media (max-width: 1280px) {
    margin-top: 6rem;
  }
  @media (max-width: 1200px) {
    margin-top: 4rem;
  }
  @media (max-width: 1150px) {
    margin-top: 3rem;
  }
  @media (max-width: 1120px) {
    margin-top: 1.5rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    height: 100%;
  }
`

const HeroImage = styled(Img)`
  flex: 0 1 50%;
  max-width: 624px;
  background-size: cover;
  background-repeat: no-repeat;

  margin-top: 4rem;
  @media (max-width: 1200px) {
    margin-top: 5rem;
  }
  @media (max-width: 1150px) {
    margin-top: 6rem;
  }
  @media (max-width: 1120px) {
    margin-top: 7rem;
  }
  @media (max-width: 1080px) {
    margin-top: 9rem;
  }
  @media (max-width: 1045px) {
    margin-top: 11rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    align-self: center;
    height: 100%;
    width: 100%;
    max-width: 400px;
    margin-top: 0;
    order: -1;
  }
`

const StyledGrayContainer = styled(GrayContainer)`
  margin-top: -4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 1rem;
  }
`

const Slogan = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 140%;
`

const Title = styled.h1`
  font-size: 14px;
  line-height: 140%;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.textTableOfContents};
`

const Subtitle = styled.div`
  font-size: 20px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
`

const SubtitleTwo = styled.div`
  font-size: 20px;
  line-height: 140%;
  margin-bottom: 1.5rem;
  color: ${(props) => props.theme.colors.text300};
`

const SubtitleThree = styled.div`
  font-size: 20px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 1.5rem;
  text-align: center;
`

const StyledDivider = styled(Divider)`
  margin-top: 3rem;
  margin-bottom: 3rem;
`

const FindWallet = styled(Img)`
  margin-top: 2rem;
  max-width: 800px;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
`

const Intro = styled.div`
  max-width: 608px;
  margin-bottom: 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-bottom: 3rem;
    margin-top: -2rem;
  }
`

const GradientContainer = styled(GrayContainer)`
  background: linear-gradient(
    49.21deg,
    rgba(127, 127, 213, 0.2) 19.87%,
    rgba(134, 168, 231, 0.2) 58.46%,
    rgba(145, 234, 228, 0.2) 97.05%
  );
  margin: 3rem 0rem;
  width: 100%;
`

const ContainerCard = styled(Card)`
  height: 100%;
  justify-content: flex-start;
`

const CodeBox = styled.div`
  background: #000000;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 4px;
`

const Code = styled.p`
  font-family: monospace;
  color: #ffffff;
  margin-bottom: 0rem;
`

const ChecklistItem = styled(HorizontalCard)`
  border: 0px;
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
`

const WalletType = styled(HorizontalCard)`
  min-width: 100%;
  margin: 0.5rem 0rem;
  border-radius: 0px;
  align-items: center;
`

const StyledCallout = styled(Callout)`
  flex: 1 1 424px;
  min-height: 100%;
`

const CentralColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`

const CalloutCardContainer = styled(CardContainer)`
  margin-top: 4rem;
`

const cards = [
  {
    emoji: ":dollar:",
    title: <Translation id="page-wallet-manage-funds" />,
    description: <Translation id="page-wallet-manage-funds-desc" />,
  },
  {
    emoji: ":frame_with_picture:",
    title: <Translation id="page-wallet-your-ethereum-account" />,
    description: <Translation id="page-wallet-your-ethereum-account-desc" />,
  },
  {
    emoji: ":bust_in_silhouette:",
    title: <Translation id="page-wallet-your-login" />,
    description: <Translation id="page-wallet-your-login-desc" />,
  },
]

const types = [
  {
    emoji: ":cd:",
    description: <Translation id="page-wallet-cd" />,
  },
  {
    emoji: ":mobile_phone:",
    description: <Translation id="page-wallet-mobile" />,
  },
  {
    emoji: ":globe_with_meridians:",
    description: <Translation id="page-wallet-web-browser" />,
  },
  {
    emoji: ":desktop_computer:",
    description: <Translation id="page-wallet-desktop" />,
  },
]

const articles = [
  {
    title: <Translation id="page-wallet-protecting-yourself" />,
    description: "MyCrypto",
    link:
      "https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds",
  },
  {
    title: <Translation id="page-wallet-keys-to-safety" />,
    description: <Translation id="page-wallet-blog" />,
    link:
      "https://blog.coinbase.com/the-keys-to-keeping-your-crypto-safe-96d497cce6cf",
  },
  {
    title: <Translation id="page-wallet-how-to-store" />,
    description: "ConsenSys",
    link:
      "https://media.consensys.net/how-to-store-digital-assets-on-ethereum-a2bfdcf66bd0",
  },
]

const WalletsPage = ({ data }) => {
  const intl = useIntl()
  const [wallets, setWallets] = useState([])

  useEffect(() => {
    const nodes = data.allWallets.nodes
    // Add fields for CardList
    const randomWallets = nodes
      .map((node) => {
        node.image = data[node.id].childImageSharp.fixed
        node.title = node.name
        node.link = node.url
        node.randomNumber = Math.floor(Math.random() * nodes.length)
        return node
      })
      .sort((a, b) => a.randomNumber - b.randomNumber)

    setWallets(randomWallets)
  }, [data])

  const cryptoCurious = wallets
    .filter((wallet) => {
      return (
        (wallet.has_card_deposits === "TRUE" ||
          wallet.has_explore_dapps === "TRUE") &&
        wallet.has_hardware !== "TRUE"
      )
    })
    .slice(0, 4)

  const hardwareWallets = wallets.filter(
    (wallet) => wallet.has_hardware === "TRUE"
  )
  const whaleWallets = wallets
    .filter((wallet) => {
      return (
        wallet.has_high_volume_purchases === "TRUE" ||
        wallet.has_limits_protection === "TRUE" ||
        wallet.has_multisig === "TRUE"
      )
    })
    .slice(0, 4 - hardwareWallets.length)
  const cryptoConverted = Array.prototype.concat(hardwareWallets, whaleWallets)

  return (
    <Page>
      <PageMetadata
        title={intl.formatMessage({
          id: "page-wallets-meta-title",
          defaultMessage: getDefaultMessage("page-wallets-meta-title"),
        })}
        description={intl.formatMessage({
          id: "page-wallets-meta-description",
          defaultMessage: getDefaultMessage("page-wallets-meta-description"),
        })}
        image={data.ogImage.childImageSharp.fixed.src}
      />
      <HeroContent>
        <HeroCopy>
          <Title>
            <Translation id="page-wallets-title" />
          </Title>
          <Slogan>
            <Translation id="page-wallets-slogan" />
          </Slogan>
          <Subtitle>
            <Translation id="page-wallets-subtitle" />
          </Subtitle>
          <SubtitleTwo>
            <Translation id="page-wallets-subtitle-2" />
          </SubtitleTwo>

          <ButtonLink to="/wallets/find-wallet/">
            <Translation id="page-wallets-find-wallet-link" />
          </ButtonLink>

          <StyledDivider />
          <p>
            <Translation id="page-wallets-description" />
          </p>
          <p>
            <Translation id="page-wallets-desc-2" /> <Link to="/eth/">ETH</Link>
            .
          </p>
          <p>
            <Translation id="page-wallets-desc-3" />
          </p>
          <p>
            <Translation id="page-wallets-desc-4" />
          </p>
        </HeroCopy>
        <HeroImage
          fluid={data.hero.childImageSharp.fluid}
          alt={intl.formatMessage({
            id: "page-wallets-alt",
            defaultMessage: getDefaultMessage("page-wallets-alt"),
          })}
          loading="eager"
        />
      </HeroContent>
      <StyledGrayContainer>
        <Content>
          <Intro>
            <h2>
              <Translation id="page-wallet-whats-a-wallet" />
            </h2>
          </Intro>
          <CardContainer>
            {cards.map((card, idx) => {
              return (
                <StyledCard
                  key={idx}
                  emoji={card.emoji}
                  title={card.title}
                  description={card.description}
                />
              )
            })}
          </CardContainer>
        </Content>
      </StyledGrayContainer>
      <StyledTwoColumnContent>
        <LeftColumn>
          <h2>
            <Translation id="page-wallet-accounts-addresses" />
          </h2>
          <p>
            <Translation id="page-wallet-accounts-addresses-desc" />
          </p>
          <ul>
            <li>
              <p>
                <Translation id="page-wallet-an" />{" "}
                <b>
                  <Translation id="page-wallet-ethereum-account" />
                </b>{" "}
                <Translation id="page-wallet-accounts-addresses-desc-2" />
              </p>
            </li>
            <li>
              <p>
                <Translation id="page-wallet-accounts-has" />{" "}
                <b>
                  <Translation id="page-wallet-ethereum-addresses" />
                </b>
                <Translation id="page-wallet-ethereum-addresses-2" />
              </p>
            </li>
            <li>
              <p>
                <b>
                  <Translation id="page-wallet-ethereum-wallet" />
                </b>{" "}
                <Translation id="page-wallet-ethereum-wallet-2" />
              </p>
            </li>
          </ul>
          <p>
            <Translation id="page-wallet-most-wallets" />
          </p>
        </LeftColumn>
        <RightColumn>
          <h2>
            <Translation id="page-wallet-types" />
          </h2>
          <div>
            {types.map((type, idx) => {
              return (
                <WalletType
                  key={idx}
                  emoji={type.emoji}
                  title={type.title}
                  description={type.description}
                  size={2.5}
                />
              )
            })}
          </div>
        </RightColumn>
      </StyledTwoColumnContent>
      <GradientContainer>
        <Content>
          <h2>
            <Translation id="page-wallet-get-wallet" />
          </h2>
          <p>
            <Translation id="page-wallet-get-wallet-desc" />
          </p>
          <p>
            <em>
              <Translation id="page-wallet-get-wallet-desc-2" />
            </em>
          </p>
        </Content>
        <TwoColumnContent>
          <LeftColumn>
            <ContainerCard
              emoji=":thinking_face:"
              title={intl.formatMessage({
                id: "page-wallet-curious",
                defaultMessage: getDefaultMessage("page-wallet-curious"),
              })}
              description={intl.formatMessage({
                id: "page-wallet-curious-desc",
                defaultMessage: getDefaultMessage("page-wallet-curious-desc"),
              })}
            >
              <CardList content={cryptoCurious} />
            </ContainerCard>
          </LeftColumn>
          <RightColumn>
            {/* TODO tooltip */}
            <ContainerCard
              emoji=":whale:"
              title={intl.formatMessage({
                id: "page-wallet-converted",
                defaultMessage: getDefaultMessage("page-wallet-converted"),
              })}
              description={intl.formatMessage({
                id: "page-wallet-converted-desc",
                defaultMessage: getDefaultMessage("page-wallet-converted-desc"),
              })}
            >
              <CardList content={cryptoConverted} />
            </ContainerCard>
          </RightColumn>
        </TwoColumnContent>
        <Content>
          <CentralColumn>
            <Divider />
            <h2>
              <Translation id="page-wallet-features-title" />
            </h2>
            <SubtitleThree>
              <Translation id="page-wallet-features-desc" />
            </SubtitleThree>
            <ButtonLink to="/wallets/find-wallet/">
              <Translation id="page-wallet-find-wallet-btn" />
            </ButtonLink>
            <FindWallet fluid={data.findWallet.childImageSharp.fluid} alt="" />
          </CentralColumn>
        </Content>
      </GradientContainer>
      <TwoColumnContent>
        <LeftColumn>
          <h2>
            <Translation id="page-wallet-stay-safe" />
          </h2>
          <SubtitleTwo>
            <Translation id="page-wallet-stay-safe-desc" />
          </SubtitleTwo>
          <div>
            <ChecklistItem
              key="0"
              emoji=":white_check_mark:"
              title={intl.formatMessage({
                id: "page-wallet-take-responsibility",
                defaultMessage: getDefaultMessage(
                  "page-wallet-take-responsibility"
                ),
              })}
              description={intl.formatMessage({
                id: "page-wallet-take-responsibility-desc",
                defaultMessage: getDefaultMessage(
                  "page-wallet-take-responsibility-desc"
                ),
              })}
            />
            <ChecklistItem
              key="1"
              emoji=":white_check_mark:"
              title={intl.formatMessage({
                id: "page-wallet-seed-phrase",
                defaultMessage: getDefaultMessage("page-wallet-seed-phrase"),
              })}
              description={intl.formatMessage({
                id: "page-wallet-seed-phrase-desc",
                defaultMessage: getDefaultMessage(
                  "page-wallet-seed-phrase-desc"
                ),
              })}
            >
              <p>
                <Translation id="page-wallet-seed-phrase-example" />
              </p>
              <CodeBox>
                <Code>
                  <Translation id="page-walet-seed-phrase-snippet" />
                </Code>
              </CodeBox>
              <p>
                <Translation id="page-wallet-seed-phrase-write-down" />
              </p>
            </ChecklistItem>
            <ChecklistItem
              key="2"
              emoji=":white_check_mark:"
              title={intl.formatMessage({
                id: "page-wallet-bookmarking",
                defaultMessage: getDefaultMessage("page-wallet-bookmarking"),
              })}
              description={intl.formatMessage({
                id: "page-wallet-bookmarking-desc",
                defaultMessage: getDefaultMessage(
                  "page-wallet-bookmarking-desc"
                ),
              })}
            />
            <ChecklistItem
              key="3"
              emoji=":white_check_mark:"
              title={intl.formatMessage({
                id: "page-wallet-triple-check",
                defaultMessage: getDefaultMessage("page-wallet-triple-check"),
              })}
              description={intl.formatMessage({
                id: "page-wallet-triple-check-desc",
                defaultMessage: getDefaultMessage(
                  "page-wallet-triple-check-desc"
                ),
              })}
            />
          </div>
        </LeftColumn>
        <RightColumn>
          <h2>
            <Translation id="page-wallet-tips" />
          </h2>
          <SubtitleTwo>
            <Translation id="page-wallet-tips-community" />
          </SubtitleTwo>
          <CardList content={articles} />
        </RightColumn>
      </TwoColumnContent>
      <Content>
        <Divider />
        <h2>
          <Translation id="page-wallet-explore" />
        </h2>
        <CalloutCardContainer>
          <StyledCallout
            image={data.eth.childImageSharp.fixed}
            title={intl.formatMessage({
              id: "page-wallet-get-some",
              defaultMessage: getDefaultMessage("page-wallet-get-some"),
            })}
            alt={intl.formatMessage({
              id: "page-wallet-get-some-alt",
              defaultMessage: getDefaultMessage("page-wallet-get-some-alt"),
            })}
            description={intl.formatMessage({
              id: "page-wallet-get-some-desc",
              defaultMessage: getDefaultMessage("page-wallet-get-some-desc"),
            })}
          >
            <div>
              <ButtonLink to="/get-eth/">
                <Translation id="page-wallet-get-some-btn" />
              </ButtonLink>
            </div>
          </StyledCallout>
          <StyledCallout
            image={data.dapps.childImageSharp.fixed}
            title={intl.formatMessage({
              id: "page-wallet-try-dapps",
              defaultMessage: getDefaultMessage("page-wallet-try-dapps"),
            })}
            alt={intl.formatMessage({
              id: "page-wallet-try-dapps-alt",
              defaultMessage: getDefaultMessage("page-wallet-try-dapps-alt"),
            })}
            description={intl.formatMessage({
              id: "page-wallet-try-dapps-desc",
              defaultMessage: getDefaultMessage("page-wallet-try-dapps-desc"),
            })}
          >
            <div>
              <ButtonLink to="/dapps/">
                <Translation id="page-wallet-more-on-dapps-btn" />
              </ButtonLink>
            </div>
          </StyledCallout>
        </CalloutCardContainer>
      </Content>
    </Page>
  )
}

export default WalletsPage

export const calloutImage = graphql`
  fragment calloutImage on File {
    childImageSharp {
      fixed(height: 200) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const listImage = graphql`
  fragment listImage on File {
    childImageSharp {
      fixed(height: 20) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const query = graphql`
  query {
    hero: file(relativePath: { eq: "wallet.png" }) {
      childImageSharp {
        fluid(maxHeight: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    findWallet: file(relativePath: { eq: "wallets/find-wallet.png" }) {
      childImageSharp {
        fluid(maxWidth: 800, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    ogImage: file(relativePath: { eq: "wallet-cropped.png" }) {
      childImageSharp {
        fixed(width: 738) {
          src
        }
      }
    }
    eth: file(relativePath: { eq: "eth-logo.png" }) {
      ...calloutImage
    }
    dapps: file(relativePath: { eq: "doge-computer.png" }) {
      ...calloutImage
    }
    allWallets: allWalletsCsv {
      nodes {
        id
        name
        url
        description
        brand_color
        has_mobile
        has_desktop
        has_web
        has_hardware
        has_card_deposits
        has_explore_dapps
        has_defi_integrations
        has_bank_withdrawals
        has_limits_protection
        has_high_volume_purchases
        has_dex_integrations
        has_multisig
      }
    }
    timestamp: walletsCsv {
      parent {
        ... on File {
          id
          name
          fields {
            gitLogLatestDate
          }
        }
      }
    }
    alpha: file(relativePath: { eq: "wallets/alpha.png" }) {
      ...listImage
    }
    ambo: file(relativePath: { eq: "wallets/ambo.png" }) {
      ...listImage
    }
    argent: file(relativePath: { eq: "wallets/argent.png" }) {
      ...listImage
    }
    atomic: file(relativePath: { eq: "wallets/atomic.png" }) {
      ...listImage
    }
    authereum: file(relativePath: { eq: "wallets/authereum.png" }) {
      ...listImage
    }
    bitski: file(relativePath: { eq: "wallets/bitski.png" }) {
      ...listImage
    }
    blockchain: file(relativePath: { eq: "wallets/blockchain.png" }) {
      ...listImage
    }
    coinbase: file(relativePath: { eq: "wallets/coinbase.png" }) {
      ...listImage
    }
    dharma: file(relativePath: { eq: "wallets/dharma.png" }) {
      ...listImage
    }
    eidoo: file(relativePath: { eq: "wallets/eidoo.png" }) {
      ...listImage
    }
    enjin: file(relativePath: { eq: "wallets/enjin.png" }) {
      ...listImage
    }
    eql: file(relativePath: { eq: "wallets/eql.png" }) {
      ...listImage
    }
    gnosis: file(relativePath: { eq: "wallets/gnosis.png" }) {
      ...listImage
    }
    imtoken: file(relativePath: { eq: "wallets/imtoken.png" }) {
      ...listImage
    }
    ledger: file(relativePath: { eq: "wallets/ledger.png" }) {
      ...listImage
    }
    lumi: file(relativePath: { eq: "wallets/lumi.png" }) {
      ...listImage
    }
    metamask: file(relativePath: { eq: "wallets/metamask.png" }) {
      ...listImage
    }
    monolith: file(relativePath: { eq: "wallets/monolith.png" }) {
      ...listImage
    }
    mycrypto: file(relativePath: { eq: "wallets/mycrypto.png" }) {
      ...listImage
    }
    myetherwallet: file(relativePath: { eq: "wallets/myetherwallet.png" }) {
      ...listImage
    }
    pillar: file(relativePath: { eq: "wallets/pillar.png" }) {
      ...listImage
    }
    portis: file(relativePath: { eq: "wallets/portis.png" }) {
      ...listImage
    }
    rainbow: file(relativePath: { eq: "wallets/rainbow.png" }) {
      ...listImage
    }
    squarelink: file(relativePath: { eq: "wallets/squarelink.png" }) {
      ...listImage
    }
    status: file(relativePath: { eq: "wallets/status.png" }) {
      ...listImage
    }
    torus: file(relativePath: { eq: "wallets/torus.png" }) {
      ...listImage
    }
    trezor: file(relativePath: { eq: "wallets/trezor.png" }) {
      ...listImage
    }
    trust: file(relativePath: { eq: "wallets/trust.png" }) {
      ...listImage
    }
    zengo: file(relativePath: { eq: "wallets/zengo.png" }) {
      ...listImage
    }
    tokenpocket: file(relativePath: { eq: "wallets/tokenpocket.png" }) {
      ...listImage
    }
    multis: file(relativePath: { eq: "wallets/multis.png" }) {
      ...listImage
    }
  }
`
