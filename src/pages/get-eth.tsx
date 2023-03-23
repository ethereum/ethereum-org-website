import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql, PageProps } from "gatsby"
import { Box, Flex, Img, Text } from "@chakra-ui/react"

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

const GetETHPage = ({ data }: PageProps<Queries.GetEthPageQuery>) => {
  const { t } = useTranslation()
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
      title: t("page-get-eth-article-protecting-yourself"),
      link: "https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds",
      description: "MyCrypto",
    },
    {
      title: t("page-get-eth-article-keeping-crypto-safe"),
      link: "https://blog.coinbase.com/the-keys-to-keeping-your-crypto-safe-96d497cce6cf",
      description: "Coinbase",
    },
    {
      title: t("page-get-eth-article-store-digital-assets"),
      link: "https://media.consensys.net/how-to-store-digital-assets-on-ethereum-a2bfdcf66bd0",
      description: "ConsenSys",
    },
  ]

  return (
    <Page>
      <PageMetadata
        title={t("page-get-eth-meta-title")}
        description={t("page-get-eth-meta-description")}
      />

      <Flex
        position="relative"
        width="full"
        maxWidth="1440px"
        flexDir={{
          base: "column-reverse",
          sm: "column-reverse",
          md: "column",
          lg: "column",
        }}
        mt={8}
        mx={0}
        mb={{ base: 0, sm: 8 }}
        justifyContent="center"
      >
        <Img
          as={GatsbyImage}
          sx={{
            position: "absolute !important",
          }}
          zIndex={-1}
          w="full"
          maxW={{ base: "100vh", xl: "8xl" }}
          minH="300px"
          maxH="400px"
          backgroundSize="cover"
          image={getImage(data.hero)!}
          alt={t("page-get-eth-hero-image-alt")}
          loading="eager"
        />
        <Flex
          flexDir="column"
          alignItems="center"
          mx={{ base: 8, lg: 0 }}
          mb={{ base: 8, lg: 0 }}
          mt={{ base: 8, lg: 24 }}
          textAlign="center"
        >
          <h1>
            <Translation id="page-get-eth-where-to-buy-title" />
          </h1>
          <Text
            fontSize="xl"
            lineHeight="140%"
            maxWidth="45ch"
            color="text200"
            textAlign="center"
            mb={0}
          >
            <Translation id="page-get-eth-where-to-buy-desc" />
          </Text>
          <Text
            fontSize="xl"
            lineHeight="140%"
            maxWidth="45ch"
            color="text200"
            textAlign="center"
            mb={8}
          >
            <Translation id="page-get-eth-where-to-buy-desc-2" />
          </Text>
          <Box as={EthPriceCard} mb={8} />
          <ButtonLink to="#country-picker">
            <Translation id="page-get-eth-search-by-country" />
          </ButtonLink>
        </Flex>
      </Flex>
      <Flex flexWrap="wrap" mx={{ base: 4, lg: 8 }} my={{ base: 4, lg: 0 }}>
        <StyledCard
          emoji=":office_building:"
          title={t("page-get-eth-cex")}
          description={t("page-get-eth-cex-desc")}
        />
        <StyledCard
          emoji=":busts_in_silhouette:"
          title={t("page-get-eth-dex")}
          description={t("page-get-eth-dex-desc")}
        >
          <Link to="#dex">
            <Translation id="page-get-eth-try-dex" />
          </Link>
        </StyledCard>
        <StyledCard
          emoji=":robot:"
          title={t("page-get-eth-wallets")}
          description={t("page-get-eth-wallets-purchasing")}
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
          <InfoBanner emoji=":wave:" shouldCenter={true} mt={8}>
            <Translation id="page-get-eth-new-to-eth" />{" "}
            <Link to="/eth/">
              <Translation id="page-get-eth-whats-eth-link" />
            </Link>
          </InfoBanner>
        </Content>
      </Flex>
      <Flex
        id="country-picker"
        bgGradient="radial-gradient(
          46.28% 66.31% at 66.95% 58.35%,
          rgba(127, 127, 213, 0.2) 0%,
          rgba(134, 168, 231, 0.2) 50%,
          rgba(145, 234, 228, 0.2) 100%
        )"
        w="full"
        flexDir="column"
        alignItems="center"
        m={16}
        px={{ base: 8, sm: 16 }}
        py={{ base: 16, sm: 16 }}
      >
        <EthExchanges />
      </Flex>
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
        <Flex as={LeftColumn} flexDir="column">
          <Img
            as={GatsbyImage}
            alignSelf="center"
            w={{ base: "full", sm: "60%", md: "50%" }}
            maxW="600px"
            mb={8}
            image={getImage(data.wallet)!}
            alt=""
          />
          <h3>
            <Translation id="page-get-eth-community-safety" />
          </h3>
          <CardList content={safetyArticles} />
        </Flex>
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
          <Flex
            justifyContent="space-between"
            bg="#191919"
            borderRadius="base"
            p={2}
            mb={6}
            userSelect="none"
            flexDir={{ base: "column-reverse", lg: "initial" }}
          >
            <Text fontFamily="monospace" color="white" mb={0} fontSize="xs">
              0x0125e2478d69eXaMpLe81766fef5c120d30fb53f
            </Text>
            <Text
              textTransform="uppercase"
              fontSize="sm"
              color="fail300"
              mb={0}
              mx={4}
            >
              <Text
                as={Translation}
                textTransform="uppercase"
                id="page-get-eth-do-not-copy"
              />
            </Text>
          </Flex>
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
        alt={t("page-index-sections-individuals-image-alt")}
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
  query GetEthPage($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["page-get-eth", "common"] }
      }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
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
