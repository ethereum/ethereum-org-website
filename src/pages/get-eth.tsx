import React, { ComponentPropsWithRef } from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { graphql, PageProps } from "gatsby"
import { Box, BoxProps, Flex, Img } from "@chakra-ui/react"

import Translation from "../components/Translation"
import CardList from "../components/CardList"
import EthExchanges from "../components/EthExchanges"
import EthPriceCard from "../components/EthPriceCard"
import InfoBanner from "../components/InfoBanner"
import InlineLink from "../components/Link"
import ButtonLink from "../components/Buttons/ButtonLink"
import PageMetadata from "../components/PageMetadata"
import CalloutBanner from "../components/CalloutBanner"
import FeedbackCard from "../components/FeedbackCard"
import { CardListItem } from "../components/CardList"
import Card from "../components/Card"
import Text from "../components/OldText"
import OldHeading from "../components/OldHeading"
import GatsbyImage from "../components/GatsbyImage"

import {
  LeftColumn,
  RightColumn,
  TwoColumnContent,
} from "../pages-conditional/eth"

import { getImage } from "../utils/image"
import { trackCustomEvent } from "../utils/matomo"

import type { ChildOnlyProp } from "../types"

const Page = (props: ChildOnlyProp) => (
  <Flex
    direction="column"
    align="center"
    width="full"
    mx="auto"
    my={0}
    {...props}
  />
)

export const Divider = () => <Box my={16} w="10%" h={1} bgColor="homeDivider" />

export const Content = (props: BoxProps) => (
  <Box w="full" py={4} px={8} {...props} />
)

export const StyledCard = (props: ComponentPropsWithRef<typeof Card>) => (
  <Card
    flex="1 1 30%"
    minW="280px"
    maxW={{ base: "full", md: "46%", lg: "31%" }}
    m={4}
    p={6}
    {...props}
  />
)

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
      description: t("page-get-eth-article-protecting-yourself-desc"),
    },
    {
      title: t("page-get-eth-article-keeping-crypto-safe"),
      link: "https://blog.coinbase.com/the-keys-to-keeping-your-crypto-safe-96d497cce6cf",
      description: t("page-get-eth-article-keeping-crypto-safe-desc"),
    },
    {
      title: t("page-get-eth-article-store-digital-assets"),
      link: "https://media.consensys.net/how-to-store-digital-assets-on-ethereum-a2bfdcf66bd0",
      description: t("page-get-eth-article-store-digital-assets-desc"),
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
        direction={{
          base: "column-reverse",
          md: "column",
        }}
        mt={8}
        mx={0}
        mb={{ base: 0, sm: 8 }}
        justifyContent="center"
      >
        <GatsbyImage
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
          <OldHeading
            as="h1"
            fontSize={{ base: "2.5rem", md: "5xl" }}
            lineHeight={1.4}
          >
            <Translation id="page-get-eth-where-to-buy-title" />
          </OldHeading>
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
          <br />
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
        >
          <InlineLink to="#country-picker">
            <Translation id="page-get-eth-cex-link-desc" />
          </InlineLink>
        </StyledCard>
        <StyledCard
          emoji=":building_construction:"
          title={t("page-get-eth-earn")}
          description={t("page-get-eth-earn-desc")}
        >
          <InlineLink to="/dao/">
            <Translation id="page-get-eth-daos-link-desc" />
          </InlineLink>
        </StyledCard>
        <StyledCard
          emoji=":busts_in_silhouette:"
          title={t("page-get-eth-peers")}
          description={t("page-get-eth-peers-desc")}
        >
          <InlineLink to="/wallets/">
            <Translation id="page-get-eth-wallets-link" />
          </InlineLink>
        </StyledCard>
        <StyledCard
          emoji=":robot:"
          title={t("page-get-eth-dex")}
          description={t("page-get-eth-dex-desc")}
        >
          <InlineLink to="#dex">
            <Translation id="page-get-eth-try-dex" />
          </InlineLink>
        </StyledCard>
        <StyledCard
          emoji=":key:"
          title={t("page-get-eth-wallets")}
          description={t("page-get-eth-wallets-purchasing")}
        >
          <InlineLink to="/wallets/">
            <Translation id="page-get-eth-wallets-link" />
          </InlineLink>
        </StyledCard>
        <StyledCard
          emoji=":shield:"
          title={t("page-get-eth-staking")}
          description={t("page-get-eth-staking-desc")}
        >
          <InlineLink to="/staking">
            <Translation id="page-get-eth-staking-link-desc" />
          </InlineLink>
        </StyledCard>
        <Content>
          <Text>
            <Text as="em">
              <Translation id="listing-policy-disclaimer" />{" "}
              <InlineLink to="https://github.com/ethereum/ethereum-org-website/issues/new/choose">
                <Translation id="listing-policy-raise-issue-link" />
              </InlineLink>
            </Text>
          </Text>
          <InfoBanner emoji=":wave:" shouldCenter mt={8}>
            <Translation id="page-get-eth-new-to-eth" />{" "}
            <InlineLink to="/eth/">
              <Translation id="page-get-eth-whats-eth-link" />
            </InlineLink>
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
        <OldHeading fontSize={{ base: "2xl", md: "2rem" }} lineHeight={1.4}>
          <Translation id="page-get-eth-dexs" />
        </OldHeading>
      </Content>
      <TwoColumnContent>
        <LeftColumn>
          <OldHeading
            as="h3"
            fontSize={{ base: "xl", md: "2xl" }}
            lineHeight={1.4}
          >
            <Translation id="page-get-eth-what-are-DEX's" />
          </OldHeading>
          <Text>
            <Translation id="page-get-eth-dexs-desc" />
          </Text>
          <Text>
            <Translation id="page-get-eth-dexs-desc-2" />{" "}
            <InlineLink to="/smart-contracts">
              <Translation id="page-get-eth-smart-contract-link" />
            </InlineLink>
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
          <OldHeading
            as="h3"
            fontSize={{ base: "xl", md: "2xl" }}
            lineHeight={1.4}
          >
            <Translation id="page-get-eth-other-cryptos" />
          </OldHeading>
          <Text>
            <Translation id="page-get-eth-swapping" />
          </Text>
          <CardList items={tokenSwaps} />
          <InfoBanner isWarning>
            <Translation id="page-get-eth-warning" />
          </InfoBanner>
        </RightColumn>
      </TwoColumnContent>
      <Divider />
      <Content>
        <OldHeading fontSize={{ base: "2xl", md: "2rem" }} lineHeight={1.4}>
          <Translation id="page-get-eth-keep-it-safe" />
        </OldHeading>
      </Content>
      <TwoColumnContent>
        <Flex as={LeftColumn} flexDir="column">
          <GatsbyImage
            alignSelf="center"
            w={{ base: "full", sm: "60%", md: "50%" }}
            maxW="600px"
            mb={8}
            image={getImage(data.wallet)!}
            alt=""
          />
          <OldHeading
            as="h3"
            fontSize={{ base: "xl", md: "2xl" }}
            lineHeight={1.4}
          >
            <Translation id="page-get-eth-community-safety" />
          </OldHeading>
          <CardList items={safetyArticles} />
        </Flex>
        <RightColumn>
          <Text>
            <Translation id="page-get-eth-description" />
          </Text>
          <Text>
            <Translation id="page-get-eth-security" />
          </Text>
          <OldHeading
            as="h3"
            fontSize={{ base: "xl", md: "2xl" }}
            lineHeight={1.4}
          >
            <Translation id="page-get-eth-protect-eth-in-wallet" />
          </OldHeading>
          <Text>
            <Translation id="page-get-eth-protect-eth-desc" />
          </Text>
          <InlineLink to="/wallets/">
            <Translation id="page-get-eth-your-address-wallet-link" />
          </InlineLink>
          <OldHeading
            as="h3"
            fontSize={{ base: "xl", md: "2xl" }}
            lineHeight={1.4}
          >
            <Translation id="page-get-eth-your-address" />
          </OldHeading>
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
          <OldHeading
            as="h3"
            fontSize={{ base: "xl", md: "2xl" }}
            lineHeight={1.4}
          >
            <Translation id="page-get-eth-wallet-instructions" />
          </OldHeading>
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
