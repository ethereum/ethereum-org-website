import { GetStaticProps } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import type { ComponentProps } from "react"
import {
  Box,
  Flex,
  type FlexProps,
  Heading,
  type HeadingProps,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react"

import type { BasePageProps, ChildOnlyProp } from "@/lib/types"

import ActionCard from "@/components/ActionCard"
import ButtonLink from "@/components/Buttons/ButtonLink"
import CalloutBanner from "@/components/CalloutBanner"
import Card from "@/components/Card"
import CardList from "@/components/CardList"
import EthPriceCard from "@/components/EthPriceCard"
import EthVideo from "@/components/EthVideo"
import FeedbackCard from "@/components/FeedbackCard"
import HorizontalCard from "@/components/HorizontalCard"
import { Image } from "@/components/Image"
import InfoBanner from "@/components/InfoBanner"
import InlineLink from "@/components/Link"
import MainArticle from "@/components/MainArticle"
import OldHeading from "@/components/OldHeading"
import Text from "@/components/OldText"
import PageMetadata from "@/components/PageMetadata"
import { StandaloneQuizWidget } from "@/components/Quiz/QuizWidget"
import Translation from "@/components/Translation"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import eth from "@/public/eth.png"
import ethCat from "@/public/eth-gif-cat.png"
import defi from "@/public/finance_transparent.png"
import ethereum from "@/public/what-is-ethereum.png"

const Page = (props: ChildOnlyProp) => (
  <Flex
    as={MainArticle}
    direction="column"
    align="center"
    w="full"
    my={0}
    mx="auto"
    {...props}
  />
)

const Content = (props: ChildOnlyProp) => (
  <Box w="full" px={8} py={4} {...props} />
)

const Divider = () => (
  <Box my={16} mx={0} w="10%" h={1} backgroundColor="homeDivider" />
)

const GrayContainer = (props: ChildOnlyProp) => (
  <Box
    width="full"
    py={16}
    mt={8}
    background="grayBackground"
    boxShadow="inset 0px 1px 0px var(--eth-colors-tableItemBoxShadow)"
    {...props}
  />
)

const Intro = (props: ChildOnlyProp) => (
  <Box maxW="608px" mb={{ base: 12, sm: 16 }} {...props} />
)

const StyledCard = (props: ComponentProps<typeof Card>) => (
  <Card
    m={4}
    p={6}
    flex="1 0 30%"
    minW="280px"
    maxW={{ base: "full", md: "46%", lg: "31%" }}
    {...props}
  />
)

const Slogan = (props: ChildOnlyProp) => (
  <Text
    textStyle="normal"
    fontWeight="normal"
    fontSize="2rem"
    lineHeight={1.4}
    {...props}
  />
)

const Title = (props: ChildOnlyProp) => (
  <Heading
    as="h1"
    fontSize="sm"
    lineHeight={1.4}
    letterSpacing="0.04em"
    fontWeight="500"
    mb={4}
    textTransform="uppercase"
    color="textTableOfContents"
    {...props}
  />
)

const Subtitle = (props: ChildOnlyProp) => (
  <Text fontSize="xl" lineHeight={1.4} color="text200" {...props} />
)

export const TwoColumnContent = (props: FlexProps) => (
  <Flex
    w="full"
    direction={{ base: "column", lg: "row" }}
    justify="space-between"
    p={8}
    mb={12}
    {...props}
  />
)

export const LeftColumn = (props: ChildOnlyProp) => (
  <Box
    flex="0 0 50%"
    maxW={{ base: "full", lg: "75%" }}
    me={{ lg: 16 }}
    {...props}
  />
)

export const RightColumn = (props: ChildOnlyProp) => (
  <Flex
    flex="0 1 50%"
    direction="column"
    justify="center"
    maxW={{ base: "full", lg: "75%" }}
    mt={{ base: 12, lg: 0 }}
    {...props}
  />
)

const SubtitleTwo = (props: ChildOnlyProp) => (
  <Text fontSize="xl" lineHeight={1.4} color="text300" mb={8} {...props} />
)

const HeroContainer = (props: ChildOnlyProp) => (
  <Flex
    align="center"
    justify="space-between"
    direction={{ base: "column-reverse", md: "row" }}
    {...props}
  />
)

const Hero = (props: ChildOnlyProp) => (
  <Box
    flex="1 1 100%"
    maxW="800px"
    bgSize="cover"
    bgRepeat="no-repeat"
    ms={{ base: 0, md: 8 }}
    {...props}
  />
)

const Header = (props: ChildOnlyProp) => (
  <Box
    as="header"
    flex="1 1 50%"
    minW="300px"
    mt={{ base: 6, md: 32 }}
    {...props}
  />
)

const H2 = (prop: HeadingProps) => (
  <OldHeading
    fontSize={{ base: "2xl", md: "2rem" }}
    lineHeight={1.4}
    mt={0}
    {...prop}
  />
)

const H3 = (props: HeadingProps) => (
  <OldHeading
    as="h3"
    fontSize={{ base: "xl", md: "2xl" }}
    lineHeight={1.4}
    {...props}
  />
)

const H4 = (props: HeadingProps) => (
  <OldHeading
    as="h4"
    fontSize={{ base: "md", md: "xl" }}
    fontWeight={600}
    lineHeight={1.4}
    {...props}
  />
)

const CardContainer = (props: FlexProps) => (
  <Flex wrap="wrap" mx={-4} {...props} />
)

const TokenCard = (props: ComponentProps<typeof HorizontalCard>) => (
  <HorizontalCard minW="full" my={2} mx={0} borderRadius={0} {...props} />
)

const TextDivider = () => (
  <Box
    w="10%"
    h="1px"
    bg="searchResultBackground"
    my={8}
    alignSelf={{ lg: "flex-start" }}
  />
)

const CentralColumn = (props: ChildOnlyProp) => (
  <Flex
    direction="column"
    align="center"
    maxW="960px"
    my={16}
    mx="auto"
    {...props}
  />
)

const CentralActionCard = (props: ComponentProps<typeof ActionCard>) => (
  <ActionCard
    display={{ base: "block", sm: "flex" }}
    flex="none"
    my={8}
    mx={0}
    sx={{
      ".action-card-image-wrapper": {
        p: 4,
        minW: { sm: "260px" },
      },
      ".action-card-content": {
        display: { sm: "flex" },
        justifyContent: { sm: "center" },
        flexDirection: { sm: "column" },
        ms: { sm: 4 },
      },
      p: {
        mb: { sm: 0 },
      },
    }}
    {...props}
  />
)

export const getStaticProps = (async ({ locale }) => {
  const requiredNamespaces = getRequiredNamespacesForPage("/eth")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  const lastDeployDate = getLastDeployDate()

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployDate,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

const EthPage = () => {
  const { t } = useTranslation("page-eth")

  const tokens = [
    {
      emoji: ":scales:",
      title: t("page-eth-stablecoins"),
      description: t("page-eth-stablecoins-desc"),
    },
    {
      emoji: ":ballot_box_with_ballot:",
      title: t("page-eth-gov-tokens"),
      description: t("page-eth-gov-tokens-desc"),
    },
    {
      emoji: ":pile_of_poo:",
      title: t("page-eth-shit-coins"),
      description: t("page-eth-shit-coins-desc"),
    },
    {
      emoji: ":frame_with_picture:",
      title: t("page-eth-collectible-tokens"),
      description: t("page-eth-collectible-tokens-desc"),
    },
  ]

  const benefits = [
    {
      emoji: ":woman_technologist:",
      title: t("page-eth-yours"),
      description: <Translation id="page-eth:page-eth-yours-desc" />,
    },
    {
      emoji: ":shield:",
      title: t("page-eth-cryptography"),
      description: <Translation id="page-eth:page-eth-cryptography-desc" />,
    },
    {
      emoji: ":handshake:",
      title: t("page-eth-p2p-payments"),
      description: t("page-eth-p2p-payments-desc"),
    },
    {
      emoji: ":money_with_wings:",
      title: t("page-eth-no-centralized"),
      description: t("page-eth-no-centralized-desc"),
    },
    {
      emoji: ":signal_strength:",
      title: t("page-eth-open"),
      description: t("page-eth-open-desc"),
    },
    {
      emoji: ":shortcake:",
      title: t("page-eth-flexible-amounts"),
      description: t("page-eth-flexible-amounts-desc"),
    },
  ]

  const tokenLinks = [
    {
      link: "/stablecoins/",
      caption: "",
      title: t("page-eth-tokens-stablecoins"),
      description: t("page-eth-tokens-stablecoins-description"),
    },
    {
      link: "/defi/",
      caption: "",
      title: t("page-eth-tokens-defi"),
      description: t("page-eth-tokens-defi-description"),
    },
    {
      link: "/nft/",
      caption: "",
      title: t("page-eth-tokens-nft"),
      description: t("page-eth-tokens-nft-description"),
    },
    {
      link: "/dao/",
      caption: "",
      title: t("page-eth-tokens-dao"),
      description: t("page-eth-tokens-dao-description"),
    },
  ]

  const cardListContent = [
    {
      link: "https://medium.com/ethhub/why-ether-is-valuable-2b4e39e01eb3",
      title: t("page-eth-value"),
      description: "Anthony Sassano",
      caption: t("page-eth-last-updated"),
    },
  ]

  return (
    <Page>
      <PageMetadata
        title={t("page-eth-whats-eth-meta-title")}
        description={t("page-eth-whats-eth-meta-desc")}
        image="/eth.png"
      />
      <Content>
        <HeroContainer>
          <Header>
            <Title>{t("page-eth-whats-eth")}</Title>
            <Slogan>{t("page-eth-currency-for-future")}</Slogan>
            <Subtitle>{t("page-eth-is-money")}</Subtitle>
            <SubtitleTwo>{t("page-eth-currency-for-apps")}</SubtitleTwo>
            <EthPriceCard isLeftAlign={false} mb={8} />
            <ButtonLink to="/get-eth/">
              {t("page-eth-button-buy-eth")}
            </ButtonLink>
          </Header>
          <Hero>
            <Image
              src={eth}
              width={800}
              alt={t("page-eth-whats-eth-hero-alt")}
              priority
            />
          </Hero>
        </HeroContainer>
      </Content>
      <GrayContainer>
        <Content>
          <Intro>
            <Text>{t("page-eth-description")} </Text>
          </Intro>
          <CardContainer mb={8}>
            {benefits.map((benefits, idx) => (
              <StyledCard
                key={idx}
                emoji={benefits.emoji}
                title={benefits.title}
                description={benefits.description}
              />
            ))}
          </CardContainer>
          <InfoBanner emoji=":wave:" shouldCenter>
            <Text as="b">{t("page-eth-buy-some")}</Text>{" "}
            <Translation id="page-eth:page-eth-buy-some-desc" />{" "}
            <InlineLink href="/what-is-ethereum/">
              {t("page-eth-more-on-ethereum-link")}
            </InlineLink>
            {t("page-eth-period")}
          </InfoBanner>
        </Content>
      </GrayContainer>
      <Content>
        <CentralColumn>
          <H2>{t("page-eth-whats-unique")}</H2>
          <Text>{t("page-eth-whats-unique-desc")}</Text>
          <EthVideo />
          <Box>
            <H4>{t("page-eth-fuels")}</H4>
            <Text>{t("page-eth-fuels-desc")}</Text>
            <Text>{t("page-eth-fuels-desc-2")}</Text>
            <Text>
              <Translation id="page-eth:page-eth-fuels-desc-3" />{" "}
              <Text as="strong">{t("page-eth-powers-ethereum")}</Text>
              {t("page-eth-period")}
            </Text>
            <Text>
              {t("page-eth-fuels-staking")}{" "}
              <InlineLink href="/staking/">
                {t("page-eth-fuels-more-staking")}
              </InlineLink>
            </Text>
          </Box>
          <CentralActionCard
            to="/what-is-ethereum/"
            title={t("page-eth-whats-ethereum")}
            description={t("page-eth-whats-ethereum-desc")}
            image={ethereum}
          />
          <TextDivider />
          <Box>
            <H4>{t("page-eth-underpins")}</H4>
            <Text>
              <Translation id="page-eth:page-eth-underpins-desc" />
            </Text>
            <Text>{t("page-eth-underpins-desc-2")}</Text>
            <CentralActionCard
              to="/defi/"
              title={t("page-eth-whats-defi")}
              description={t("page-eth-whats-defi-description")}
              image={defi}
            />
            <InfoBanner isWarning>
              <Translation id="page-eth:page-eth-weth" />
            </InfoBanner>
          </Box>
          <TextDivider />
          <Box>
            <H4>{t("page-eth-uses")}</H4>
            <Text>{t("page-eth-uses-desc")}</Text>
            <Text>{t("page-eth-uses-desc-2")} </Text>
            <UnorderedList>
              <ListItem>
                <InlineLink href="https://sablier.com">
                  {t("page-eth-stream-link")}
                </InlineLink>{" "}
                – {t("page-eth-uses-desc-3")}
              </ListItem>
              <ListItem>
                <InlineLink href="/get-eth/#dex">
                  {t("page-eth-trade-link-2")}
                </InlineLink>{" "}
                – {t("page-eth-uses-desc-4")}
              </ListItem>
              <ListItem>
                <InlineLink href="https://app.compound.finance/">
                  {t("page-eth-earn-interest-link")}
                </InlineLink>{" "}
                – {t("page-eth-uses-desc-5")}
              </ListItem>
              <ListItem>
                <InlineLink href="/stablecoins/">
                  {t("page-eth-stablecoins-link")}
                </InlineLink>{" "}
                – {t("page-eth-uses-desc-6")}
              </ListItem>
            </UnorderedList>
          </Box>
          <Divider />
        </CentralColumn>
        <CalloutBanner
          my={20}
          mx={0}
          titleKey={"page-eth:page-eth-where-to-buy"}
          descriptionKey={"page-eth:page-eth-where-to-buy-desc"}
          image={ethCat}
          alt={t("page-eth-cat-img-alt")}
          imageWidth={300}
        >
          <Box>
            <ButtonLink to="/get-eth/">{t("page-eth-get-eth-btn")}</ButtonLink>
          </Box>
        </CalloutBanner>
      </Content>

      <TwoColumnContent>
        <LeftColumn>
          <H3>{t("page-eth-has-value")}</H3>
          <Text>{t("page-eth-has-value-desc")}</Text>
          <Text>{t("page-eth-has-value-desc-2")}</Text>
          <Text>{t("page-eth-has-value-desc-3")}</Text>
          <Text>{t("page-eth-has-value-desc-4")}</Text>
          <Text>{t("page-eth-has-value-desc-5")}</Text>
        </LeftColumn>
        <RightColumn>
          <CardList items={cardListContent} />
        </RightColumn>
      </TwoColumnContent>
      <TwoColumnContent id="tokens" align="flex-start">
        <LeftColumn>
          <H3>{t("page-eth-not-only-crypto")}</H3>
          <Text>{t("page-eth-not-only-crypto-desc")} </Text>
          <Text>{t("page-eth-not-only-crypto-desc-2")}</Text>
          <H4 fontWeight="normal">{t("page-eth-more-on-tokens")}</H4>
          <CardList items={tokenLinks} />
        </LeftColumn>
        <RightColumn>
          <H3>{t("page-eth-popular-tokens")}</H3>
          {tokens.map((token, idx) => (
            <TokenCard
              key={idx}
              emoji={token.emoji}
              title={token.title}
              description={token.description}
              emojiSize={5}
            />
          ))}
        </RightColumn>
      </TwoColumnContent>
      <Content>
        <StandaloneQuizWidget quizKey="what-is-ether" />
      </Content>
      <Content>
        <FeedbackCard />
      </Content>
    </Page>
  )
}

export default EthPage
