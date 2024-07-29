import merge from "lodash/merge"
import { GetStaticProps } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import {
  Badge,
  Box,
  BoxProps,
  Center,
  Flex,
  GridItem,
  HeadingProps,
  ListItem,
  SimpleGrid,
  UnorderedList,
} from "@chakra-ui/react"

import type { BasePageProps, Lang, TranslationKey } from "@/lib/types"

import { ButtonLink } from "@/components/Buttons"
import Card from "@/components/Card"
import ExpandableCard from "@/components/ExpandableCard"
import FeedbackCard from "@/components/FeedbackCard"
import { HubHero } from "@/components/Hero"
import type { HubHeroProps } from "@/components/Hero/HubHero"
import { Image } from "@/components/Image"
import InfoBanner from "@/components/InfoBanner"
import Layer2ProductCard from "@/components/Layer2ProductCard"
import InlineLink from "@/components/Link"
import MainArticle from "@/components/MainArticle"
import OldHeading from "@/components/OldHeading"
import Text from "@/components/OldText"
import OrderedList from "@/components/OrderedList"
import PageMetadata from "@/components/PageMetadata"
import { StandaloneQuizWidget } from "@/components/Quiz/QuizWidget"
import Translation from "@/components/Translation"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { layer2Data } from "@/data/layer-2/layer-2"

import Layer2Onboard from "../components/Layer2/Layer2Onboard"
import ProductList from "../components/ProductList"

import DogeImage from "@/public/images/doge-computer.png"
import EthHomeImage from "@/public/images/eth-home-icon.png"
import HeroImage from "@/public/images/heroes/layer-2-hub-hero.jpg"
import DebankImage from "@/public/images/layer-2/debank.png"
import ethereumecosystemImage from "@/public/images/layer-2/ethereumecosystem.png"
import growthepieImage from "@/public/images/layer-2/growthepie.png"
import L2BEATImage from "@/public/images/layer-2/l2beat.jpg"
import OptimisticRollupImage from "@/public/images/layer-2/optimistic_rollup.png"
import RollupImage from "@/public/images/layer-2/rollup-2.png"
import ZapperImage from "@/public/images/layer-2/zapper.png"
import ZerionImage from "@/public/images/layer-2/zerion.png"
import ZKRollupImage from "@/public/images/layer-2/zk_rollup.png"
import DAOImage from "@/public/images/use-cases/dao-2.png"
import WhatIsEthereumImage from "@/public/images/what-is-ethereum.png"

type ContentBoxProps = BoxProps & {
  isLightGrayBg?: boolean
}
const ContentBox = ({ isLightGrayBg, ...rest }: ContentBoxProps) => (
  <Box
    px={8}
    py={12}
    width="full"
    {...(isLightGrayBg && { background: "layer2ContentSecondary" })}
    {...rest}
  />
)

const TwoColumnContent = (props) => (
  <Flex
    justifyContent="space-between"
    gap={16}
    flexDirection={{ base: "column", lg: "row" }}
    alignItems={{ base: "flex-start", lg: "normal" }}
    {...props}
  />
)

const SectionHeading = (props: HeadingProps) => {
  const headingSpecificProps = {
    fontSize: { base: "2xl", md: "2rem" },
    fontWeight: 600,
    lineHeight: 1.4,
  }

  if (props.as === "h3") {
    headingSpecificProps.fontSize = { base: "xl", md: "2xl" }
  }

  const mergeProps = merge(headingSpecificProps, props)

  return <OldHeading {...mergeProps} />
}

const Layer2CardGrid = (props) => (
  <SimpleGrid
    templateColumns="repeat(auto-fill, minmax(min(100%, 280px), 1fr))"
    gap={8}
    {...props}
  />
)

export const getStaticProps = (async ({ locale }) => {
  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  const requiredNamespaces = getRequiredNamespacesForPage("/layer-2")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

const Layer2Page = () => {
  const { t } = useTranslation("page-layer-2")
  const layer2DataCombined = [...layer2Data.optimistic, ...layer2Data.zk]

  const heroContent: HubHeroProps = {
    title: t("layer-2-hero-title"),
    header: t("layer-2-hero-header"),
    description: t("layer-2-hero-subtitle"),
    heroImg: HeroImage,
    buttons: [
      {
        content: t("layer-2-hero-button-1"),
        toId: "what-is-layer-2",
        matomo: {
          eventCategory: "layer 2 hero buttons",
          eventAction: "click",
          eventName: "what is layer 2",
        },
      },
      {
        content: t("layer-2-hero-button-2"),
        toId: "use-layer-2",
        matomo: {
          eventCategory: "layer 2 hero buttons",
          eventAction: "click",
          eventName: "use layer 2",
        },
      },
    ],
  }

  const layer2Cards = [
    {
      emoji: ":money_with_wings:",
      title: t("layer-2-lower-fees-title"),
      description: t("layer-2-lower-fees-description"),
    },
    {
      emoji: ":closed_lock_with_key:",
      title: t("layer-2-maintain-security-title"),
      description: t("layer-2-maintain-security-description"),
    },
    {
      emoji: ":hammer_and_wrench:",
      title: t("layer-2-expand-use-cases-title"),
      description: t("layer-2-expand-use-cases-description"),
    },
  ]

  const rollupCards = [
    {
      image: OptimisticRollupImage,
      title: t("layer-2-optimistic-rollups-title"),
      description: t("layer-2-optimistic-rollups-description"),
      childSentence: t("layer-2-optimistic-rollups-childSentance"),
      childLink: "/developers/docs/scaling/optimistic-rollups/",
    },
    {
      image: ZKRollupImage,
      title: t("layer-2-zk-rollups-title"),
      description: t("layer-2-zk-rollups-description"),
      childSentence: t("layer-2-zk-rollups-childSentance"),
      childLink: "/developers/docs/scaling/zk-rollups/",
    },
  ]

  const toolsData = {
    information: [
      {
        title: "L2BEAT",
        description: t("layer-2-tools-l2beat-description"),
        link: "https://l2beat.com",
        image: L2BEATImage,
        alt: "L2BEAT",
      },
      {
        title: "Ethereum Ecosystem",
        description: t("layer-2-tools-ethereumecosystem-description"),
        link: "https://www.ethereum-ecosystem.com/",
        image: ethereumecosystemImage,
        alt: "Ethereum Ecosystem",
      },
      {
        title: "growthepie",
        description: t("layer-2-tools-growthepie-description"),
        link: "https://growthepie.xyz",
        image: growthepieImage,
        alt: "growthepie",
      },
      {
        title: "L2 Fees",
        description: t("layer-2-tools-l2fees-description"),
        link: "https://l2fees.info",
        image: DogeImage,
        alt: "L2 Fees",
      },
      {
        title: "Chainlist",
        description: t("layer-2-tools-chainlist-description"),
        link: "https://chainlist.org",
        image: DogeImage,
        alt: "Chainlist",
      },
    ],
    walletManagers: [
      {
        title: "Zapper",
        description: t("layer-2-tools-zapper-description"),
        link: "https://zapper.fi/",
        image: ZapperImage,
        alt: "Zapper",
      },
      {
        title: "Zerion",
        description: t("layer-2-tools-zerion-description"),
        link: "https://zerion.io",
        image: ZerionImage,
        alt: "Zerion",
      },
      {
        title: "DeBank",
        description: t("layer-2-tools-debank-description"),
        link: "https://debank.com",
        image: DebankImage,
        alt: "DeBank",
      },
    ],
  }

  return (
    <Flex as={MainArticle} flexDirection="column" alignItems="center">
      <PageMetadata
        title={t("layer-2-hero-title")}
        description={t("layer-2-metadata-description")}
        image="/images/heroes/layer-2-hub-hero.jpg"
      />
      {/* Hero Section */}
      <HubHero {...heroContent} />
      {/* What is Layer 2 Section */}
      <ContentBox id="what-is-layer-2">
        <TwoColumnContent>
          <Box flex="50%">
            <SectionHeading>
              {t("layer-2-what-is-layer-2-title")}
            </SectionHeading>
            <Text>
              <Translation id="page-layer-2:layer-2-what-is-layer-2-1" />
            </Text>
            <Text>{t("layer-2-what-is-layer-2-2")}</Text>
          </Box>
          <Center flex="50%" w="full">
            <Image
              src={WhatIsEthereumImage}
              alt=""
              width={624}
              maxH="400px"
              style={{ objectFit: "contain" }}
            />
          </Center>
        </TwoColumnContent>
      </ContentBox>
      {/* What is Layer 1 Section */}
      <ContentBox isLightGrayBg>
        <SectionHeading>{t("layer-2-what-is-layer-1-title")}</SectionHeading>
        <TwoColumnContent>
          <Box flex="50%">
            <Text>
              <Translation id="page-layer-2:layer-2-what-is-layer-1-1" />
            </Text>
            <Text>
              <Translation id="page-layer-2:layer-2-what-is-layer-1-2" />
            </Text>
          </Box>
          <Box flex="50%">
            <Text>
              <Translation id="page-layer-2:layer-2-what-is-layer-1-list-title" />
            </Text>
            <OrderedList
              listData={[
                <>
                  <Text>
                    <Translation id="page-layer-2:layer-2-what-is-layer-1-list-1" />
                  </Text>
                </>,
                <>
                  <Text>
                    <Translation id="page-layer-2:layer-2-what-is-layer-1-list-2" />
                  </Text>
                </>,
                <>
                  <Text>
                    <Translation id="page-layer-2:layer-2-what-is-layer-1-list-3" />
                  </Text>
                </>,
                <>
                  <Text>
                    <Translation id="page-layer-2:layer-2-what-is-layer-1-list-4" />
                  </Text>
                </>,
              ]}
            />
            <Text>
              {t("layer-2-what-is-layer-1-list-link-1")}{" "}
              <InlineLink href="/what-is-ethereum/">
                {t("layer-2-what-is-layer-1-list-link-2")}
              </InlineLink>
            </Text>
          </Box>
        </TwoColumnContent>
      </ContentBox>
      {/* Why Layer 2 Section */}
      <ContentBox>
        <TwoColumnContent>
          <Center flex="50%" w="full">
            <Image
              src={DAOImage}
              alt=""
              width={500}
              style={{ objectFit: "contain" }}
            />
          </Center>
          <Box flex="50%">
            <SectionHeading>
              {t("layer-2-why-do-we-need-layer-2-title")}
            </SectionHeading>
            <Text>
              <Translation id="page-layer-2:layer-2-why-do-we-need-layer-2-1" />
            </Text>
            <Text>
              <Translation id="page-layer-2:layer-2-why-do-we-need-layer-2-2" />
            </Text>

            <SectionHeading as="h3">
              {t("layer-2-why-do-we-need-layer-2-scalability")}
            </SectionHeading>
            <Text>{t("layer-2-why-do-we-need-layer-2-scalability-1")}</Text>
            <Text>
              <Translation id="page-layer-2:layer-2-why-do-we-need-layer-2-scalability-2" />
            </Text>
            <InlineLink href="/roadmap/vision/">
              {t("layer-2-why-do-we-need-layer-2-scalability-3")}
            </InlineLink>
          </Box>
        </TwoColumnContent>
        <SectionHeading as="h3">
          {t("layer-2-benefits-of-layer-2-title")}
        </SectionHeading>
        <SimpleGrid
          columnGap={8}
          rowGap={4}
          templateColumns="repeat(auto-fill, minmax(340px, 1fr))"
        >
          {layer2Cards.map(({ emoji, title, description }, idx) => (
            <GridItem
              as={Card}
              description={description}
              title={title}
              emoji={emoji}
              key={idx}
              _hover={{
                transition: "0.1s",
                transform: "scale(1.01)",
                img: {
                  transition: "0.1s",
                  transform: "scale(1.1)",
                },
              }}
            />
          ))}
        </SimpleGrid>
      </ContentBox>
      {/* How does Layer 2 Work Section */}
      <ContentBox>
        <TwoColumnContent>
          <Box flex="50%">
            <SectionHeading>
              {t("layer-2-how-does-layer-2-work-title")}
            </SectionHeading>
            <Text>
              <Translation id="page-layer-2:layer-2-how-does-layer-2-work-1" />
            </Text>
            <Text>{t("layer-2-how-does-layer-2-work-2")}</Text>
            <SectionHeading as="h3">
              {t("layer-2-rollups-title")}
            </SectionHeading>
            <Text>{t("layer-2-rollups-1")}</Text>
            <Text>{t("layer-2-rollups-2")}</Text>
          </Box>
          <Center flex="50%" w="full">
            <Image
              src={RollupImage}
              alt=""
              width={800}
              style={{ objectFit: "contain" }}
            />
          </Center>
        </TwoColumnContent>
        <TwoColumnContent>
          {rollupCards.map(
            ({ image, title, description, childSentence, childLink }) => (
              <Flex
                key={title}
                background="ednBackground"
                borderRadius="sm"
                border="1px"
                borderColor="lightBorder"
                p={6}
                flex={{ base: "100%", md: "50%" }}
                flexDirection="column"
                justifyContent="space-between"
              >
                <Image
                  src={image!}
                  alt=""
                  objectPosition="0"
                  objectFit="contain"
                />
                <SectionHeading as="h3">{title}</SectionHeading>
                <Text>{description}</Text>
                <Text>
                  <InlineLink href={childLink}>{childSentence}</InlineLink>
                </Text>
              </Flex>
            )
          )}
        </TwoColumnContent>
      </ContentBox>
      {/* DYOR Section */}
      <ContentBox>
        <InfoBanner isWarning>
          <SectionHeading>{t("layer-2-dyor-title")}</SectionHeading>
          <Text>{t("layer-2-dyor-1")}</Text>
          <Text>
            <Translation id="page-layer-2:layer-2-dyor-2" />
          </Text>
          <Text>
            <ButtonLink href="https://l2beat.com/scaling/risk">
              {t("layer-2-dyor-3")}
            </ButtonLink>
          </Text>
        </InfoBanner>
      </ContentBox>
      {/* Use Layer 2 Section */}
      <ContentBox id="use-layer-2">
        <SectionHeading>{t("layer-2-use-layer-2-title")}</SectionHeading>
        <Text>{t("layer-2-use-layer-2-1")}</Text>
        <Text>
          <Translation id="page-layer-2:layer-2-contract-accounts" />
        </Text>
        <SectionHeading as="h3">
          {t("layer-2-use-layer-2-generalized-title")}
        </SectionHeading>
        <Text>
          <Translation id="page-layer-2:layer-2-use-layer-2-generalized-1" />
        </Text>
        <Layer2CardGrid>
          {layer2DataCombined
            .filter((l2) => !l2.purpose.indexOf("universal"))
            .map(
              (
                {
                  background,
                  image,
                  descriptionKey,
                  website,
                  noteKey,
                  name,
                  bridge,
                  ecosystemPortal,
                  tokenLists,
                  purpose,
                },
                idx
              ) => {
                return (
                  <Layer2ProductCard
                    key={idx}
                    background={background}
                    image={image}
                    description={t(descriptionKey as TranslationKey)}
                    url={website}
                    note={t(noteKey as TranslationKey)}
                    name={name}
                    bridge={bridge}
                    ecosystemPortal={ecosystemPortal}
                    tokenLists={tokenLists}
                  >
                    {purpose.map((purpose, index) => (
                      <Badge key={index} me={2}>
                        {purpose}
                      </Badge>
                    ))}
                  </Layer2ProductCard>
                )
              }
            )}
        </Layer2CardGrid>
      </ContentBox>
      {/* Layer 2 App Specific Section */}
      <ContentBox id="use-layer-2">
        <SectionHeading as="h3">
          {t("layer-2-use-layer-2-application-specific-title")}
        </SectionHeading>
        <Text>{t("layer-2-use-layer-2-application-specific-1")}</Text>
        <Layer2CardGrid>
          {layer2DataCombined
            .filter((l2) => l2.purpose.indexOf("universal"))
            .map(
              (
                {
                  background,
                  image,
                  descriptionKey,
                  website,
                  noteKey,
                  name,
                  bridge,
                  ecosystemPortal,
                  tokenLists,
                  purpose,
                },
                idx
              ) => {
                return (
                  <Layer2ProductCard
                    key={idx}
                    background={background}
                    image={image}
                    description={t(descriptionKey as TranslationKey)}
                    url={website}
                    note={t(noteKey as TranslationKey)}
                    name={name}
                    bridge={bridge}
                    ecosystemPortal={ecosystemPortal}
                    tokenLists={tokenLists}
                  >
                    {purpose.map((purpose, index) => (
                      <Badge key={index} me={2}>
                        {purpose}
                      </Badge>
                    ))}
                  </Layer2ProductCard>
                )
              }
            )}
        </Layer2CardGrid>
      </ContentBox>
      {/* Layer 2 Sidechain Section */}
      <ContentBox>
        <SectionHeading>{t("layer-2-sidechains-title")}</SectionHeading>
        <TwoColumnContent>
          <Box flex="50%">
            <Text>
              <Translation id="page-layer-2:layer-2-sidechains-1" />
            </Text>
            <Text>{t("layer-2-sidechains-2")}</Text>
            <UnorderedList>
              <ListItem>
                <InlineLink href="/developers/docs/scaling/sidechains/">
                  {t("layer-2-more-on-sidechains")}
                </InlineLink>
              </ListItem>
              <ListItem>
                <InlineLink href="/developers/docs/scaling/validium/">
                  {t("layer-2-more-on-validiums")}
                </InlineLink>
              </ListItem>
            </UnorderedList>
          </Box>
          <Box flex="50%">
            <Text>{t("layer-2-sidechains-4")}</Text>
          </Box>
        </TwoColumnContent>
      </ContentBox>
      {/* Layer 2 Onboard Section */}
      <ContentBox id="how-to-get-onto-layer-2">
        <Layer2Onboard
          layer2DataCombined={layer2DataCombined}
          ethIcon={EthHomeImage}
          ethIconAlt={t("ethereum-logo")}
        />
      </ContentBox>
      {/* Layer 2 Tools Section */}
      <ContentBox>
        <SectionHeading>{t("layer-2-tools-title")}</SectionHeading>
        <TwoColumnContent>
          <Box flex="50%">
            <ProductList
              category={t("layer-2-information")}
              content={toolsData.information}
              actionLabel={t("page-dapps-ready-button")}
            />
          </Box>
          <Box flex="50%">
            <ProductList
              category={t("layer-2-wallet-managers")}
              content={toolsData.walletManagers}
              actionLabel={t("page-dapps-ready-button")}
            />
          </Box>
        </TwoColumnContent>
      </ContentBox>
      {/* Layer 2 FAQ Section */}
      <ContentBox>
        <SectionHeading>{t("layer-2-faq-title")}</SectionHeading>
        <ExpandableCard title={`${t("layer-2-faq-question-1-title")}`}>
          <Text>{t("layer-2-faq-question-1-description-1")}</Text>
        </ExpandableCard>
        <ExpandableCard title={`${t("layer-2-faq-question-2-title")}`}>
          <Text>{t("layer-2-faq-question-2-description-1")}</Text>
          <Text>{t("layer-2-faq-question-2-description-2")}</Text>
          <Text>{t("layer-2-faq-question-2-description-3")}</Text>
          <Text>
            <InlineLink href="/developers/docs/scaling/optimistic-rollups/">
              {t("layer-2-more-info-on-optimistic-rollups")}
            </InlineLink>
          </Text>
          <Text>
            <InlineLink href="/developers/docs/scaling/zk-rollups/">
              {t("layer-2-more-info-on-zk-rollups")}
            </InlineLink>
          </Text>
        </ExpandableCard>
        <ExpandableCard title={`${t("layer-2-faq-question-4-title")}`}>
          <Text>
            <Translation id="page-layer-2:layer-2-faq-question-4-description-1" />
          </Text>
          <Text>
            <Translation id="page-layer-2:layer-2-faq-question-4-description-2" />
          </Text>
          <Text>
            <Translation id="page-layer-2:layer-2-faq-question-4-description-3" />
          </Text>
          <Text>
            <InlineLink href="/bridges/">
              {t("layer-2-more-on-bridges")}
            </InlineLink>
          </Text>
        </ExpandableCard>
        <ExpandableCard title={`${t("layer-2-faq-question-5-title")}`}>
          <Text>
            {t("layer-2-faq-question-5-description-1")}{" "}
            <InlineLink href="/contributing/adding-layer-2s/">
              {t("layer-2-faq-question-5-view-listing-policy")}
            </InlineLink>
          </Text>
          <Text>
            <Translation id="page-layer-2:layer-2-faq-question-5-description-2" />
          </Text>
        </ExpandableCard>
      </ContentBox>
      {/* Layer 2 Further Reading Section */}
      <ContentBox>
        <SectionHeading>{t("layer-2-further-reading-title")}</SectionHeading>
        <UnorderedList ms="1.45rem" mb="1.45rem">
          <ListItem>
            <InlineLink href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">
              {t("a-rollup-centric-ethereum-roadmap")}
            </InlineLink>{" "}
            <i>- Vitalik Buterin </i>
          </ListItem>
          <ListItem>
            <InlineLink href="https://vitalik.eth.limo/general/2021/01/05/rollup.html">
              {t("an-incomplete-guide-to-rollups")}
            </InlineLink>{" "}
            <i>- Vitalik Buterin</i>
          </ListItem>
          <ListItem>
            <InlineLink href="https://www.youtube.com/watch?v=DyNbmgkyxJI">
              {t("polygon-sidechain-vs-ethereum-rollups")}
            </InlineLink>{" "}
            <i>- Lex Clips</i>
          </ListItem>
          <ListItem>
            <InlineLink href="https://www.youtube.com/watch?v=7pWxCklcNsU">
              {t("rollups-the-ultimate-ethereum-scaling-strategy")}
            </InlineLink>{" "}
            <i>- Finematics</i>
          </ListItem>
          <ListItem>
            <InlineLink href="https://barnabe.substack.com/p/understanding-rollup-economics-from?s=r">
              {t("understanding-rollup-economics-from-first-principals")}
            </InlineLink>{" "}
            <i>- Barnabé Monnot</i>
          </ListItem>
        </UnorderedList>
      </ContentBox>
      {/* Layer 2 Quiz Section */}
      <StandaloneQuizWidget quizKey="layer-2" />
      {/* Layer 2 Feedback Section */}
      <ContentBox>
        <FeedbackCard />
      </ContentBox>
    </Flex>
  )
}

export default Layer2Page
