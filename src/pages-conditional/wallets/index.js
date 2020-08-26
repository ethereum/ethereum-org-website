import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import Callout from "../../components/Callout"
import Card from "../../components/Card"
import Link from "../../components/Link"
import Button from "../../components/Button"
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
  color: ${(props) => props.theme.colors.textSidebar};
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

const WalletTypes = styled(HorizontalCard)`
  border: 0px;
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;

  .horizontal-card-emoji {
    & > img {
      width: 2em !important;
      height: 2em !important;
    }
  }
`

const WalletType = styled(HorizontalCard)`
  min-width: 100%;
  margin: 0.5rem 0rem;
  border-radius: 0px;
  align-items: center;

  .horizontal-card-emoji {
    & > img {
      width: 2.5em !important;
      height: 2.5em !important;
    }
  }
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
    title: "An app for managing your funds",
    description:
      "Your wallet shows your balances, transaction history and gives you a way to send/receive funds. Some wallets may offer more.",
  },
  {
    emoji: ":frame_with_picture:",
    title: "Your Ethereum account",
    description:
      "Your wallet is your window into your Ethereum account – your balance, transaction history and more. But you can swap wallet providers at any time. ",
  },
  {
    emoji: ":bust_in_silhouette:",
    title: "Your login for Ethereum applications",
    description:
      "Your wallet lets you connect to any decentralized application using your Ethereum account. It's like a login you can use across many dapps.",
  },
]

const types = [
  {
    emoji: ":cd:",
    description:
      "Physical hardware wallets that let you keep your crypto offline – very secure",
  },
  {
    emoji: ":mobile_phone:",
    description:
      "Mobile applications that make your funds accessible from anywhere",
  },
  {
    emoji: ":globe_with_meridians:",
    description:
      "Web wallets that let you interact with your account via a web browser",
  },
  {
    emoji: ":desktop_computer:",
    description:
      "Desktop applications if you prefer to manage your funds via MacOS, windows or linux",
  },
]

const articles = [
  {
    title: "Protecting yourself and your funds",
    description: "MyCrypto",
    link:
      "https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds",
  },
  {
    title: "The keys to keeping your crypto safe",
    description: "Coinbase blog",
    link:
      "https://blog.coinbase.com/the-keys-to-keeping-your-crypto-safe-96d497cce6cf",
  },
  {
    title: "How to store digital assets on Ethereum",
    description: "ConsenSys",
    link:
      "https://media.consensys.net/how-to-store-digital-assets-on-ethereum-a2bfdcf66bd0",
  },
]

const WalletsPage = ({ data }) => {
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
        title="Ethereum wallets"
        description="What you need to know to use Ethereum wallets."
        image={data.ogImage.childImageSharp.fixed.src}
      />
      <HeroContent>
        <HeroCopy>
          <Title>Ethereum wallets</Title>
          <Slogan>The key to your digital future</Slogan>
          <Subtitle>
            Wallets give access to your funds and Ethereum applications.
          </Subtitle>
          <SubtitleTwo>Only you should have access to your wallet.</SubtitleTwo>

          <Button to="/wallets/find-wallet/">Find a wallet</Button>

          <StyledDivider />
          <p>
            Ethereum wallets are applications that let you interact with your
            Ethereum account. Think of it like an internet banking app – without
            the bank. Your wallet lets you read your balance, send transactions
            and connect to applications.
          </p>
          <p>
            You need a wallet to send funds and manage your{" "}
            <Link to="/eth/">ETH</Link>.
          </p>
          <p>
            Your wallet is only a tool for managing your Ethereum account. That
            means you can swap wallet providers at any time. Many wallets also
            let you manage several Ethereum accounts from one application.
          </p>
          <p>
            That's because wallets don't have custody of your funds, you do.
            They're just a tool for managing what's really yours.
          </p>
        </HeroCopy>
        <HeroImage
          fluid={data.hero.childImageSharp.fluid}
          alt="Illustration of a robot with a vault for a body, representing an ethereum wallet"
          loading="eager"
        />
      </HeroContent>
      <StyledGrayContainer>
        <Content>
          <Intro>
            <h2>What's an Ethereum wallet?</h2>
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
          <h2>Wallets, accounts, and addresses</h2>
          <p>
            It's worth understanding the differences between some key terms.
          </p>
          <ul>
            <li>
              <p>
                An <b>Ethereum account</b> is an entity that can send
                transactions and has a balance.
              </p>
            </li>
            <li>
              <p>
                An Ethereum account has an <b>Ethereum address</b>, like an
                inbox has an email address. You can use this to send funds to an
                account.
              </p>
            </li>
            <li>
              <p>
                <b>A wallet</b> is a product that allows you to manage your
                Ethereum account, like view your account balance, send
                transactions and more.
              </p>
            </li>
          </ul>
          <p>
            Most wallet products will let you generate an Ethereum account. So
            you don't need one before you download a wallet.
          </p>
        </LeftColumn>
        <RightColumn>
          <h2>Types of wallet</h2>
          <div>
            {types.map((type, idx) => {
              return (
                <WalletType
                  key={idx}
                  emoji={type.emoji}
                  title={type.title}
                  description={type.description}
                />
              )
            })}
          </div>
        </RightColumn>
      </StyledTwoColumnContent>
      <GradientContainer>
        <Content>
          <h2>Get a wallet</h2>
          <p>
            There are lots of different wallets to choose from. We want to help
            you choose the best one for you.
          </p>
          <p>
            <em>
              Remember: this decision isn’t forever – your Ethereum account is
              not tied to your wallet provider.
            </em>
          </p>
        </Content>
        <TwoColumnContent>
          <LeftColumn>
            <ContainerCard
              emoji=":thinking_face:"
              title="Crypto curious?"
              description="If you’re new to crypto and just want to get a feel for it, we recommend something that will give you the opportunity to explore Ethereum applications or buy your first ETH directly from the wallet."
            >
              <CardList content={cryptoCurious} />
            </ContainerCard>
          </LeftColumn>
          <RightColumn>
            {/* TODO tooltip */}
            <ContainerCard
              emoji=":whale:"
              title="Crypto converted?"
              description="If you’re looking to hold some serious value, we recommend a hardware wallet as these are the most secure. Or a wallet with fraud alerts and withdrawal limits."
            >
              <CardList content={cryptoConverted} />
            </ContainerCard>
          </RightColumn>
        </TwoColumnContent>
        <Content>
          <CentralColumn>
            <Divider />
            <h2>Prefer to choose based on features?</h2>
            <SubtitleThree>
              We can help you choose your wallet based on the features you care
              about.
            </SubtitleThree>
            <Button to="/wallets/find-wallet/">Find a wallet</Button>
            <FindWallet fluid={data.findWallet.childImageSharp.fluid} alt="" />
          </CentralColumn>
        </Content>
      </GradientContainer>
      <TwoColumnContent>
        <LeftColumn>
          <h2>How to stay safe</h2>
          <SubtitleTwo>
            Wallets are a bit of a shift in thinking. Financial freedom and the
            ability to access and use funds anywhere comes with a bit of
            responsibility – there’s no customer support in crypto.
          </SubtitleTwo>
          <div>
            <WalletTypes
              key="0"
              emoji=":white_check_mark:"
              title="Take responsibility for your own funds"
              description="Centralized exchanges will link your wallet to a username and password that you can recover in a traditional way. Just remember you’re trusting that exchange with custody over your funds. If that company is attacked or folds, your funds are at risk."
            />
            <WalletTypes
              key="1"
              emoji=":white_check_mark:"
              title="Write down your seed phrase"
              description="Wallets will often give you a seed phrase that you must write down somewhere safe. This is the only way you’ll be able to recover your wallet."
            >
              <p>Here's an example:</p>
              <CodeBox>
                <Code>
                  there aeroplane curve vent formation doge possible product
                  distinct under spirit lamp
                </Code>
              </CodeBox>
              <p>
                Don’t store it on a computer. Write it down and keep it safe.
              </p>
            </WalletTypes>
            <WalletTypes
              key="2"
              emoji=":white_check_mark:"
              title="Bookmark your wallet"
              description="If you use a web wallet, bookmark the site to protect yourself against phishing scams."
            />
            <WalletTypes
              key="3"
              emoji=":white_check_mark:"
              title="Triple check everything"
              description="Remember transactions can’t be reversed and wallets can’t be easily recovered so take care."
            />
          </div>
        </LeftColumn>
        <RightColumn>
          <h2>More tips on staying safe</h2>
          <SubtitleTwo>From the community</SubtitleTwo>
          <CardList content={articles} />
        </RightColumn>
      </TwoColumnContent>
      <Content>
        <Divider />
        <h2>Explore Ethereum</h2>
        <CalloutCardContainer>
          {/* TODO update ETH image */}
          <StyledCallout
            image={data.eth.childImageSharp.fixed}
            title="Get some ETH"
            alt="An illustration of a hand creating an ETH logo made of lego bricks"
            description="ETH is the native crypto of Ethereum. You’ll need some ETH in your wallet to use Ethereum applications. "
          >
            <div>
              <Button to="/get-eth/">Get some ETH</Button>
            </div>
          </StyledCallout>
          <StyledCallout
            image={data.dapps.childImageSharp.fixed}
            title="Try some dapps"
            alt="An illustration of Ethereum community members working together"
            description="Dapps are applications built on Ethereum. They’re cheaper, fairer and kinder on your data than most traditional applications."
          >
            <div>
              <Button to="/dapps/">More on Dapps</Button>
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
        has_no_tx_fees
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
  }
`
