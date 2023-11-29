import { Box, type BoxProps, Flex, type FlexProps } from "@chakra-ui/react"
import { useTranslation } from "next-i18next"
import type { GetStaticProps } from "next/types"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import type { ComponentPropsWithRef } from "react"

import { Divider } from "@/components/MdComponents"
import { Image } from "@/components/Image"
import ButtonLink from "@/components/Buttons/ButtonLink"
import CalloutBanner from "@/components/CalloutBanner"
import Card from "@/components/Card"
import CardList from "@/components/CardList"
import CentralizedExchanges from "@/components/CentralizedExchanges"
import EthPriceCard from "@/components/EthPriceCard"
import FeedbackCard from "@/components/FeedbackCard"
import InfoBanner from "@/components/InfoBanner"
import InlineLink from "@/components/Link"
import OldHeading from "@/components/OldHeading"
import PageMetadata from "@/components/PageMetadata"
import Text from "@/components/OldText"
import type { CardProps } from "@/components/CardList"

import bancor from "@/public/exchanges/bancor.png"
import dapps from "@/public/doge-computer.png"
import hero from "@/public/get-eth.png"
import kyber from "@/public/exchanges/kyber.png"
import loopring from "@/public/exchanges/loopring.png"
import oneinch from "@/public/exchanges/1inch.png"
import uniswap from "@/public/dapps/uni.png"
import wallet from "@/public/wallet.png"
// TODO: Remove unused?
// import matcha from "@/public/exchanges/matcha.png" // width=20px

import { trackCustomEvent } from "@/lib/utils/matomo"
import { getRequiredNamespacesForPath } from "@/lib/utils/translations"
import { resizeImage } from "@/lib/utils/resizeImage"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"

import type { ChildOnlyProp } from "@/lib/types"

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

export const Content = (props: BoxProps) => (
  <Box w="full" py={4} px={8} {...props} />
)

const StyledCard = (props: ComponentPropsWithRef<typeof Card>) => (
  <Card
    flex="1 1 30%"
    minW="280px"
    maxW={{ base: "full", md: "46%", lg: "31%" }}
    m={4}
    p={6}
    {...props}
  />
)

const TwoColumnContent = (props: FlexProps) => (
  <Flex
    w="full"
    direction={{ base: "column", lg: "row" }}
    justify="space-between"
    p={8}
    mb={12}
    {...props}
  />
)

const LeftColumn = (props: ChildOnlyProp) => (
  <Box
    flex="0 0 50%"
    maxW={{ base: "full", lg: "75%" }}
    me={{ lg: 16 }}
    {...props}
  />
)

const RightColumn = (props: ChildOnlyProp) => (
  <Flex
    flex="0 1 50%"
    direction="column"
    justify="center"
    maxW={{ base: "full", lg: "75%" }}
    mt={{ base: 12, lg: 0 }}
    {...props}
  />
)

export const getStaticProps = (async (context) => {
  const { locale } = context
  // load i18n required namespaces for the given page
  const requiredNamespaces = getRequiredNamespacesForPath("get-eth")
  const lastDeployDate = getLastDeployDate()

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      lastDeployDate,
    },
  }
}) satisfies GetStaticProps<{}, {}>

const GetEthPage = () => {
  const { t } = useTranslation("page-get-eth")

  const tokenSwaps: CardProps[] = [
    {
      title: "1inch",
      link: "https://1inch.exchange/#/",
      image: resizeImage(oneinch, 20),
      alt: "",
    },
    {
      title: "Bancor",
      link: "https://www.bancor.network/",
      image: resizeImage(bancor, 20),
      alt: "",
    },
    {
      title: "Kyber",
      link: "https://kyberswap.com/#/swap/",
      image: resizeImage(kyber, 20),
      alt: "",
    },
    {
      title: "Loopring",
      link: "https://loopring.io/",
      image: resizeImage(loopring, 20),
      alt: "",
    },
    {
      title: "Uniswap",
      link: "https://app.uniswap.org/#/swap",
      image: resizeImage(uniswap, 20),
      alt: "",
    },
  ].sort((a, b) => a.title.localeCompare(b.title))

  const safetyArticles: CardProps[] = [
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
        <Image
          src={hero}
          position="absolute"
          zIndex={-1}
          w="full"
          maxW={{ base: "100vh", xl: "8xl" }}
          minH="300px"
          maxH="400px"
          backgroundSize="cover"
          alt={t("page-get-eth-hero-image-alt")}
          priority
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
            {t("page-get-eth-where-to-buy-title")}
          </OldHeading>
          <Text
            fontSize="xl"
            lineHeight="140%"
            maxWidth="45ch"
            color="text200"
            textAlign="center"
            mb={0}
          >
            {t("page-get-eth-where-to-buy-desc")}
          </Text>
          <br />
          <Box as={EthPriceCard} mb={8} />
          <ButtonLink
            href="#country-picker"
            onClick={() =>
              trackCustomEvent({
                eventCategory: "Search by country button",
                eventAction: "click",
                eventName: "search_by_country",
              })
            }
          >
            {t("page-get-eth-search-by-country")}
          </ButtonLink>
        </Flex>
      </Flex>
      <Flex flexWrap="wrap" mx={{ base: 4, lg: 8 }} my={{ base: 4, lg: 0 }}>
        <StyledCard
          emoji=":office_building:"
          title={t("page-get-eth-cex")}
          description={t("page-get-eth-cex-desc")}
        >
          <InlineLink href="#country-picker">
            {t("page-get-eth-cex-link-desc")}
          </InlineLink>
        </StyledCard>
        <StyledCard
          emoji=":building_construction:"
          title={t("page-get-eth-earn")}
          description={t("page-get-eth-earn-desc")}
        >
          <InlineLink href="/dao/">
            {t("page-get-eth-daos-link-desc")}
          </InlineLink>
        </StyledCard>
        <StyledCard
          emoji=":busts_in_silhouette:"
          title={t("page-get-eth-peers")}
          description={t("page-get-eth-peers-desc")}
        >
          <InlineLink href="/wallets/">
            {t("page-get-eth-wallets-link")}
          </InlineLink>
        </StyledCard>
        <StyledCard
          emoji=":robot:"
          title={t("page-get-eth-dex")}
          description={t("page-get-eth-dex-desc")}
        >
          <InlineLink href="#dex">{t("page-get-eth-try-dex")}</InlineLink>
        </StyledCard>
        <StyledCard
          emoji=":key:"
          title={t("page-get-eth-wallets")}
          description={t("page-get-eth-wallets-purchasing")}
        >
          <InlineLink href="/wallets/">
            {t("page-get-eth-wallets-link")}
          </InlineLink>
        </StyledCard>
        <StyledCard
          emoji=":shield:"
          title={t("page-get-eth-staking")}
          description={t("page-get-eth-staking-desc")}
        >
          <InlineLink href="/staking">
            {t("page-get-eth-staking-link-desc")}
          </InlineLink>
        </StyledCard>
        <Content>
          <Text>
            <Text as="em">
              {t("common:listing-policy-disclaimer")}{" "}
              <InlineLink href="https://github.com/ethereum/ethereum-org-website/issues/new/choose">
                {t("listing-policy-raise-issue-link")}
              </InlineLink>
            </Text>
          </Text>
          <InfoBanner emoji=":wave:" shouldCenter mt={8}>
            {t("page-get-eth-new-to-eth")}{" "}
            <InlineLink href="/eth/">
              {t("page-get-eth-whats-eth-link")}
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
        <CentralizedExchanges />
      </Flex>
      <Content id="dex">
        <OldHeading fontSize={{ base: "2xl", md: "2rem" }} lineHeight={1.4}>
          {t("page-get-eth-dexs")}
        </OldHeading>
      </Content>
      <TwoColumnContent>
        <LeftColumn>
          <OldHeading
            as="h3"
            fontSize={{ base: "xl", md: "2xl" }}
            lineHeight={1.4}
          >
            {t("page-get-eth-what-are-DEX's")}
          </OldHeading>
          <Text>{t("page-get-eth-dexs-desc")}</Text>
          <Text>
            {t("page-get-eth-dexs-desc-2")}{" "}
            <InlineLink href="/smart-contracts">
              {t("page-get-eth-smart-contract-link")}
            </InlineLink>
          </Text>
          <Text>{t("page-get-eth-dexs-desc-3")}</Text>
          <Text>{t("page-get-eth-need-wallet")}</Text>
          <ButtonLink href="/wallets/">
            {t("page-get-eth-get-wallet-btn")}
          </ButtonLink>
        </LeftColumn>
        <RightColumn>
          <OldHeading
            as="h3"
            fontSize={{ base: "xl", md: "2xl" }}
            lineHeight={1.4}
          >
            {t("page-get-eth-other-cryptos")}
          </OldHeading>
          <Text>{t("page-get-eth-swapping")}</Text>
          <CardList items={tokenSwaps} />
          <InfoBanner isWarning>{t("page-get-eth-warning")}</InfoBanner>
        </RightColumn>
      </TwoColumnContent>
      <Divider />
      <Content>
        <OldHeading fontSize={{ base: "2xl", md: "2rem" }} lineHeight={1.4}>
          {t("page-get-eth-keep-it-safe")}
        </OldHeading>
      </Content>
      <TwoColumnContent>
        <Flex as={LeftColumn} flexDir="column">
          <Image
            src={resizeImage(wallet, 600)}
            alignSelf="center"
            w={{ base: "full", sm: "60%", md: "50%" }}
            maxW="600px"
            mb={8}
            alt=""
          />
          <OldHeading
            as="h3"
            fontSize={{ base: "xl", md: "2xl" }}
            lineHeight={1.4}
          >
            {t("page-get-eth-community-safety")}
          </OldHeading>
          <CardList items={safetyArticles} />
        </Flex>
        <RightColumn>
          <Text>{t("page-get-eth-description")}</Text>
          <Text>{t("page-get-eth-security")}</Text>
          <OldHeading
            as="h3"
            fontSize={{ base: "xl", md: "2xl" }}
            lineHeight={1.4}
          >
            {t("page-get-eth-protect-eth-in-wallet")}
          </OldHeading>
          <Text>{t("page-get-eth-protect-eth-desc")}</Text>
          <InlineLink href="/wallets/">
            {t("page-get-eth-your-address-wallet-link")}
          </InlineLink>
          <OldHeading
            as="h3"
            fontSize={{ base: "xl", md: "2xl" }}
            lineHeight={1.4}
          >
            {t("page-get-eth-your-address")}
          </OldHeading>
          <Text>{t("page-get-eth-your-address-desc")}</Text>
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
              {t("page-get-eth-do-not-copy")}
            </Text>
          </Flex>
          <Text>{t("page-get-eth-your-address-desc-3")}</Text>
          <OldHeading
            as="h3"
            fontSize={{ base: "xl", md: "2xl" }}
            lineHeight={1.4}
          >
            {t("page-get-eth-wallet-instructions")}
          </OldHeading>
          <Text>{t("page-get-eth-wallet-instructions-lost")}</Text>
        </RightColumn>
      </TwoColumnContent>
      <Divider />
      <CalloutBanner
        mx={4}
        mt={24}
        mb={40}
        titleKey="page-get-eth:page-get-eth-use-your-eth"
        descriptionKey="page-get-eth:page-get-eth-use-your-eth-dapps"
        image={resizeImage(dapps, 600)}
        alt={t("page-index:page-index-sections-individuals-image-alt")}
        maxImageWidth={600}
      >
        <Box>
          <ButtonLink href="/dapps/">
            {t("page-get-eth-checkout-dapps-btn")}
          </ButtonLink>
        </Box>
      </CalloutBanner>
      <FeedbackCard />
    </Page>
  )
}

export default GetEthPage
