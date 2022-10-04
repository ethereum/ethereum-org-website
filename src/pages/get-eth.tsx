import React from "react"
import styled from "@emotion/styled"
import { useIntl } from "react-intl"
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql, PageProps } from "gatsby"

import { translateMessageId, TranslationKey } from "../utils/translations"
import Translation from "../components/Translation"
import CardList from "../components/CardList"
import EthExchanges from "../components/EthExchanges"
import EthPriceCard from "../components/EthPriceCard"
import InfoBanner from "../components/InfoBanner"
import Link from "../components/Link"
import ButtonLink from "../components/ButtonLink"
import PageMetadata from "../components/PageMetadata"
import CalloutBanner from "../components/CalloutBanner"
import {
  Content,
  Divider,
  LeftColumn,
  Page,
  RightColumn,
  StyledCard,
  TwoColumnContent,
} from "../components/SharedStyledComponents"
import FeedbackCard from "../components/FeedbackCard"
import { CardListItem } from "../components/CardList"
import { getImage } from "../utils/image"

const Subtitle = styled.div<{
  mb?: string
}>`
  font-size: 1.25rem;
  line-height: 140%;
  max-width: 45ch;
  text-align: center;
  color: ${(props) => props.theme.colors.text200};
  margin-bottom: ${(props) => props.mb || ""};
`

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    max-width: 100vw;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column-reverse;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column-reverse;
    margin-bottom: 0rem;
  }
`

const Hero = styled(GatsbyImage)`
  position: absolute !important;
  z-index: -1;
  width: 100%;
  max-width: 1440px;
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    max-width: 100vw;
  }
  min-height: 300px;
  max-height: 400px;
  background-size: cover;
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6rem;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 2rem;
  }
`

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0rem 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 1rem;
  }
`

const WalletImage = styled(GatsbyImage)`
  align-self: center;
  width: 50%;
  max-width: 600px;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 60%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    width: 100%;
  }
`

const WalletLeftColumn = styled(LeftColumn)`
  display: flex;
  flex-direction: column;
`

const GradientContainer = styled.div`
  background: radial-gradient(
    46.28% 66.31% at 66.95% 58.35%,
    rgba(127, 127, 213, 0.2) 0%,
    rgba(134, 168, 231, 0.2) 50%,
    rgba(145, 234, 228, 0.2) 100%
  );
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4rem 4rem;
  padding: 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    padding: 4rem 2rem;
  }
`

const CodeBox = styled.div`
  display: flex;
  justify-content: space-between;
  background: #191919;
  border-radius: 4px;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
  }
`

const StyledEthPriceCard = styled(EthPriceCard)`
  margin-bottom: 2rem;
`

const Code = styled.p`
  font-family: monospace;
  color: #ffffff;
  margin-bottom: 0rem;
`

const CodeLabel = styled.p`
  text-transform: uppercase;
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.fail300};
  margin-bottom: 0rem;
  margin-right: 1rem;
  margin-left: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 0rem;
  }
`

const AllCapsTranslation = styled(Translation)`
  text-transform: uppercase;
`

const StyledInfoBanner = styled(InfoBanner)<{
  mt: string
}>`
  margin-top: ${(props) => props.mt};
`

const GetETHPage = ({ data }: PageProps<Queries.GetEthPageQuery>) => {
  const intl = useIntl()
  const decentralizedExchanges: Array<CardListItem> = [
    {
      title: "Localcryptos.com",
      link: "https://localcryptos.com/",
      image: getImage(data.localcryptos)!,
      alt: "",
    },
  ].sort((a, b) => a.title.localeCompare(b.title))

  const tokenSwaps: Array<CardListItem> = [
    {
      title: "1inch",
      link: "https://1inch.exchange/#/",
      image: getImage(data.oneinch)!,
      alt: "",
    },
    {
      title: "Bancor",
      link: "https://www.bancor.network/",
      image: getImage(data.bancor)!,
      alt: "",
    },
    {
      title: "Kyber",
      link: "https://kyberswap.com/#/swap/",
      image: getImage(data.kyber)!,
      alt: "",
    },
    {
      title: "Loopring",
      link: "https://loopring.io/",
      image: getImage(data.loopring)!,
      alt: "",
    },
    {
      title: "Uniswap",
      link: "https://app.uniswap.org/#/swap",
      image: getImage(data.uniswap)!,
      alt: "",
    },
  ].sort((a, b) => a.title.localeCompare(b.title))

  const safetyArticles: Array<CardListItem> = [
    {
      title: translateMessageId(
        "page-get-eth-article-protecting-yourself",
        intl
      ),
      link: "https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds",
      description: "MyCrypto",
    },
    {
      title: translateMessageId(
        "page-get-eth-article-keeping-crypto-safe",
        intl
      ),
      link: "https://web.archive.org/web/20190716160333/https://blog.coinbase.com/the-keys-to-keeping-your-crypto-safe-96d497cce6cf?gi=548619266f28",
      description: "Coinbase",
    },
    {
      title: translateMessageId(
        "page-get-eth-article-store-digital-assets",
        intl
      ),
      link: "https://media.consensys.net/how-to-store-digital-assets-on-ethereum-a2bfdcf66bd0",
      description: "ConsenSys",
    },
  ]

  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-get-eth-meta-title", intl)}
        description={translateMessageId("page-get-eth-meta-description", intl)}
      />

      <HeroContainer>
        <Hero
          image={getImage(data.hero)!}
          alt={translateMessageId("page-get-eth-hero-image-alt", intl)}
          loading="eager"
        />
        <Header>
          <h1>
            <Translation id="page-get-eth-where-to-buy-title" />
          </h1>
          <Subtitle>
            <Translation id="page-get-eth-where-to-buy-desc" />
          </Subtitle>
          <Subtitle mb="2rem">
            <Translation id="page-get-eth-where-to-buy-desc-2" />
          </Subtitle>
          <StyledEthPriceCard />
          <ButtonLink to="#country-picker">
            <Translation id="page-get-eth-search-by-country" />
          </ButtonLink>
        </Header>
      </HeroContainer>
      <CardContainer>
        <StyledCard
          emoji=":office_building:"
          title={translateMessageId("page-get-eth-cex", intl)}
          description={translateMessageId("page-get-eth-cex-desc", intl)}
        />
        <StyledCard
          emoji=":busts_in_silhouette:"
          title={translateMessageId("page-get-eth-dex", intl)}
          description={translateMessageId("page-get-eth-dex-desc", intl)}
        >
          <Link to="#dex">
            <Translation id="page-get-eth-try-dex" />
          </Link>
        </StyledCard>
        <StyledCard
          emoji=":robot:"
          title={translateMessageId("page-get-eth-wallets", intl)}
          description={translateMessageId(
            "page-get-eth-wallets-purchasing",
            intl
          )}
        >
          <Link to="/wallets/">
            <Translation id="page-get-eth-wallets-link" />
          </Link>
        </StyledCard>
        <Content>
          <p>
            <em>
              <Translation id="listing-policy-disclaimer" />{" "}
              <Link to="https://github.com/ethereum/ethereum-org-website/issues/new/choose">
                <Translation id="listing-policy-raise-issue-link" />
              </Link>
            </em>
          </p>
          <StyledInfoBanner emoji=":wave:" shouldCenter={true} mt={`2rem`}>
            <Translation id="page-get-eth-new-to-eth" />{" "}
            <Link to="/eth/">
              <Translation id="page-get-eth-whats-eth-link" />
            </Link>
          </StyledInfoBanner>
        </Content>
      </CardContainer>
      <GradientContainer id="country-picker">
        <EthExchanges />
      </GradientContainer>
      <Content id="dex">
        <h2>
          <Translation id="page-get-eth-dexs" />
        </h2>
      </Content>
      <TwoColumnContent>
        <LeftColumn>
          <h3>
            <Translation id="page-get-eth-what-are-DEX's" />
          </h3>
          <p>
            <Translation id="page-get-eth-dexs-desc" />
          </p>
          <p>
            <Translation id="page-get-eth-dexs-desc-2" />{" "}
            <Link to="/smart-contracts">
              <Translation id="page-get-eth-smart-contract-link" />
            </Link>
          </p>
          <p>
            <Translation id="page-get-eth-dexs-desc-3" />
          </p>
          <p>
            <Translation id="page-get-eth-need-wallet" />
          </p>
          <ButtonLink to="/wallets/">
            <Translation id="page-get-eth-get-wallet-btn" />
          </ButtonLink>
        </LeftColumn>
        <RightColumn>
          <h3>
            <Translation id="page-get-eth-traditional-currencies" />
          </h3>
          <p>
            <Translation id="page-get-eth-traditional-payments" />
          </p>
          <CardList content={decentralizedExchanges} />
          <h3>
            <Translation id="page-get-eth-other-cryptos" />
          </h3>
          <p>
            <Translation id="page-get-eth-swapping" />
          </p>
          <CardList content={tokenSwaps} />
          <InfoBanner isWarning={true}>
            <Translation id="page-get-eth-warning" />
          </InfoBanner>
        </RightColumn>
      </TwoColumnContent>
      <Divider />
      <Content>
        <h2>
          <Translation id="page-get-eth-keep-it-safe" />
        </h2>
      </Content>
      <TwoColumnContent>
        <WalletLeftColumn>
          <WalletImage image={getImage(data.wallet)!} alt="" />
          <h3>
            <Translation id="page-get-eth-community-safety" />
          </h3>
          <CardList content={safetyArticles} />
        </WalletLeftColumn>
        <RightColumn>
          <p>
            <Translation id="page-get-eth-description" />
          </p>
          <p>
            <Translation id="page-get-eth-security" />
          </p>
          <h3>
            <Translation id="page-get-eth-protect-eth-in-wallet" />
          </h3>
          <p>
            <Translation id="page-get-eth-protect-eth-desc" />
          </p>
          <Link to="/wallets/">
            <Translation id="page-get-eth-your-address-wallet-link" />
          </Link>
          <h3>
            <Translation id="page-get-eth-your-address" />
          </h3>
          <p>
            <Translation id="page-get-eth-your-address-desc" />
          </p>
          <CodeBox>
            <Code>0x0125e2478d69eXaMpLe81766fef5c120d30fb53f</Code>
            <CodeLabel>
              <AllCapsTranslation id="page-get-eth-do-not-copy" />
            </CodeLabel>
          </CodeBox>
          <p>
            <Translation id="page-get-eth-your-address-desc-3" />
          </p>
          <h3>
            <Translation id="page-get-eth-wallet-instructions" />
          </h3>
          <p>
            <Translation id="page-get-eth-wallet-instructions-lost" />
          </p>
        </RightColumn>
      </TwoColumnContent>
      <Divider />
      <CalloutBanner
        titleKey="page-get-eth-use-your-eth"
        descriptionKey="page-get-eth-use-your-eth-dapps"
        image={getImage(data.dapps)!}
        alt={translateMessageId(
          "page-index-sections-individuals-image-alt" as TranslationKey,
          intl
        )}
        maxImageWidth={600}
      >
        <div>
          <ButtonLink to="/dapps/">
            <Translation id="page-get-eth-checkout-dapps-btn" />
          </ButtonLink>
        </div>
      </CalloutBanner>
      <FeedbackCard />
    </Page>
  )
}

export default GetETHPage

export const listItemImage = graphql`
  fragment listItemImage on File {
    childImageSharp {
      gatsbyImageData(
        width: 20
        layout: FIXED
        placeholder: BLURRED
        quality: 100
      )
    }
  }
`

export const query = graphql`
  query GetEthPage {
    hero: file(relativePath: { eq: "get-eth.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    wallet: file(relativePath: { eq: "wallet.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 600
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    dapps: file(relativePath: { eq: "doge-computer.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 600
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    localcryptos: file(relativePath: { eq: "exchanges/localcryptos.png" }) {
      ...listItemImage
    }
    uniswap: file(relativePath: { eq: "dapps/uni.png" }) {
      ...listItemImage
    }
    matcha: file(relativePath: { eq: "exchanges/matcha.png" }) {
      ...listItemImage
    }
    kyber: file(relativePath: { eq: "exchanges/kyber.png" }) {
      ...listItemImage
    }
    loopring: file(relativePath: { eq: "exchanges/loopring.png" }) {
      ...listItemImage
    }
    oneinch: file(relativePath: { eq: "exchanges/1inch.png" }) {
      ...listItemImage
    }
    bancor: file(relativePath: { eq: "exchanges/bancor.png" }) {
      ...listItemImage
    }
  }
`
