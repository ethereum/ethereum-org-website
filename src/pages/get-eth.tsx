import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql, PageProps } from "gatsby"
import { Box, Flex, Heading, Img, Text } from "@chakra-ui/react"

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
import { trackCustomEvent } from "../utils/matomo"

const GetETHPage = ({ data }: PageProps<Queries.GetEthPageQuery>) => {
  const { t } = useTranslation()

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
          <Heading
            as="h1"
            fontSize={{ base: "2.5rem", md: "5xl" }}
            lineHeight={1.4}
          >
            <Translation id="page-get-eth-where-to-buy-title" />
          </Heading>
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
          <ButtonLink
            to="#country-picker"
            onClick={() =>
              trackCustomEvent({
                eventCategory: "Search by country button",
                eventAction: "click",
                eventName: "search_by_country",
              })
            }
          >
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
          <Text>
            <Text as="em">
              <Translation id="listing-policy-disclaimer" />{" "}
              <Link to="https://github.com/ethereum/ethereum-org-website/issues/new/choose">
                <Translation id="listing-policy-raise-issue-link" />
              </Link>
            </Text>
          </Text>
          <InfoBanner emoji=":wave:" shouldCenter mt={8}>
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
        <Heading fontSize={{ base: "2xl", md: "2rem" }} lineHeight={1.4}>
          <Translation id="page-get-eth-dexs" />
        </Heading>
      </Content>
      <TwoColumnContent>
        <LeftColumn>
          <Heading
            as="h3"
            fontSize={{ base: "xl", md: "2xl" }}
            lineHeight={1.4}
          >
            <Translation id="page-get-eth-what-are-DEX's" />
          </Heading>
          <Text>
            <Translation id="page-get-eth-dexs-desc" />
          </Text>
          <Text>
            <Translation id="page-get-eth-dexs-desc-2" />{" "}
            <Link to="/smart-contracts">
              <Translation id="page-get-eth-smart-contract-link" />
            </Link>
          </Text>
          <Text>
            <Translation id="page-get-eth-dexs-desc-3" />
          </Text>
          <Text>
            <Translation id="page-get-eth-need-wallet" />
          </Text>
          <ButtonLink to="/wallets/">
            <Translation id="page-get-eth-get-wallet-btn" />
          </ButtonLink>
        </LeftColumn>
        <RightColumn>
          <Heading
            as="h3"
            fontSize={{ base: "xl", md: "2xl" }}
            lineHeight={1.4}
          >
            <Translation id="page-get-eth-other-cryptos" />
          </Heading>
          <Text>
            <Translation id="page-get-eth-swapping" />
          </Text>
          <CardList content={tokenSwaps} />
          <InfoBanner isWarning>
            <Translation id="page-get-eth-warning" />
          </InfoBanner>
        </RightColumn>
      </TwoColumnContent>
      <Divider />
      <Content>
        <Heading fontSize={{ base: "2xl", md: "2rem" }} lineHeight={1.4}>
          <Translation id="page-get-eth-keep-it-safe" />
        </Heading>
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
          <Heading
            as="h3"
            fontSize={{ base: "xl", md: "2xl" }}
            lineHeight={1.4}
          >
            <Translation id="page-get-eth-community-safety" />
          </Heading>
          <CardList content={safetyArticles} />
        </Flex>
        <RightColumn>
          <Text>
            <Translation id="page-get-eth-description" />
          </Text>
          <Text>
            <Translation id="page-get-eth-security" />
          </Text>
          <Heading
            as="h3"
            fontSize={{ base: "xl", md: "2xl" }}
            lineHeight={1.4}
          >
            <Translation id="page-get-eth-protect-eth-in-wallet" />
          </Heading>
          <Text>
            <Translation id="page-get-eth-protect-eth-desc" />
          </Text>
          <Link to="/wallets/">
            <Translation id="page-get-eth-your-address-wallet-link" />
          </Link>
          <Heading
            as="h3"
            fontSize={{ base: "xl", md: "2xl" }}
            lineHeight={1.4}
          >
            <Translation id="page-get-eth-your-address" />
          </Heading>
          <Text>
            <Translation id="page-get-eth-your-address-desc" />
          </Text>
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
          <Text>
            <Translation id="page-get-eth-your-address-desc-3" />
          </Text>
          <Heading
            as="h3"
            fontSize={{ base: "xl", md: "2xl" }}
            lineHeight={1.4}
          >
            <Translation id="page-get-eth-wallet-instructions" />
          </Heading>
          <Text>
            <Translation id="page-get-eth-wallet-instructions-lost" />
          </Text>
        </RightColumn>
      </TwoColumnContent>
      <Divider />
      <CalloutBanner
        mx={4}
        mt={24}
        mb={40}
        titleKey="page-get-eth-use-your-eth"
        descriptionKey="page-get-eth-use-your-eth-dapps"
        image={getImage(data.dapps)!}
        alt={t("page-index-sections-individuals-image-alt")}
        maxImageWidth={600}
      >
        <Box>
          <ButtonLink to="/dapps/">
            <Translation id="page-get-eth-checkout-dapps-btn" />
          </ButtonLink>
        </Box>
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
