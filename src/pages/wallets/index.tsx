import { ComponentPropsWithRef } from "react"
import { GetStaticProps } from "next"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import {
  Box,
  type BoxProps,
  Flex,
  Heading,
  Text as ChakraText,
} from "@chakra-ui/react"

import { BasePageProps, ChildOnlyProp, Lang } from "@/lib/types"

import ButtonLink from "@/components/Buttons/ButtonLink"
import Callout from "@/components/Callout"
import Card from "@/components/Card"
import CardList from "@/components/CardList"
import FeedbackCard from "@/components/FeedbackCard"
import HorizontalCard, {
  HorizontalCardProps,
} from "@/components/HorizontalCard"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import OldHeading from "@/components/OldHeading"
import Text from "@/components/OldText"
import PageHero from "@/components/PageHero"
import PageMetadata from "@/components/PageMetadata"
import { StandaloneQuizWidget } from "@/components/Quiz/QuizWidget"
import { Simulator } from "@/components/Simulator"
import { SIMULATOR_ID } from "@/components/Simulator/constants"
import Translation from "@/components/Translation"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { walletOnboardingSimData } from "@/data/WalletSimulatorData"

import DappsImage from "@/public/images/doge-computer.png"
import ETHImage from "@/public/images/eth-logo.png"
import FindWalletImage from "@/public/images/wallets/find-wallet.png"
import HeroImage from "@/public/images/wallets/wallet-hero.png"

const Page = (props: BoxProps) => (
  <Flex
    as={MainArticle}
    direction="column"
    align="center"
    width="full"
    m="0 auto"
    {...props}
  />
)

const GrayContainer = (props: BoxProps) => (
  <Box
    width="full"
    py={16}
    px={0}
    mt={{ base: 4, lg: 8 }}
    background="grayBackground"
    boxShadow="inset 0px 1px 0px var(--eth-colors-tableItemBoxShadow)"
    {...props}
  />
)

const Content = (props: BoxProps) => <Box py={4} px={8} w="full" {...props} />

const Intro = (props: ChildOnlyProp) => (
  <Content pb={0} sx={{ h2: { mb: 0 } }} {...props} />
)

const TwoColumnContent = (props: BoxProps) => (
  <Content
    display="flex"
    justifyContent="space-between"
    p={8}
    mb={12}
    flexDirection={{ base: "column", lg: "row" }}
    {...props}
  />
)

const LeftColumn = (props: BoxProps) => (
  <Box flex="0 1 50%" me={{ base: 0, lg: 8 }} maxW="full" {...props} />
)

const RightColumn = (props: BoxProps) => (
  <Box flex="0 1 50%" ms={{ lg: 8 }} maxW="full" {...props} />
)

const H2 = (props: ChildOnlyProp) => (
  <OldHeading
    fontSize={{ base: "2xl", md: "2rem" }}
    lineHeight={1.4}
    {...props}
  />
)

const CardContainer = (props: BoxProps) => (
  <Box display={"flex"} flexWrap={"wrap"} ms={-4} me={-4} {...props} />
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
const ChecklistItem = (props: HorizontalCardProps) => (
  <HorizontalCard
    border={0}
    display="flex"
    emojiSize={1.5}
    alignItems="flex-start"
    mb={4}
    {...props}
  />
)
const Divider = (props: BoxProps) => (
  <Box my={16} w="10%" h="0.25rem" bgColor="homeDivider" {...props} />
)

const CalloutCardContainer = (props: ChildOnlyProp) => (
  <CardContainer mt={16} {...props} />
)

export const getStaticProps = (async ({ locale }) => {
  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  const requiredNamespaces = getRequiredNamespacesForPage("/wallets")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

const WalletsPage = () => {
  const { locale } = useRouter()
  const { t } = useTranslation("page-wallets")

  const heroContent = {
    title: t("page-wallets-title"),
    header: t("page-wallets-slogan"),
    subtitle: t("page-wallets-subtitle"),
    image: HeroImage,
    alt: t("page-wallets-alt"),
    // TODO: remove conditional after soft launch
    buttons:
      locale === "en"
        ? [
            {
              href: "/wallets/find-wallet/",
              content: t("page-wallets-find-wallet-link"),
              matomo: {
                eventCategory: "wallet hero buttons",
                eventAction: "click",
                eventName: "find wallet",
              },
            },
            {
              href: `#${SIMULATOR_ID}`,
              content: "How to use a wallet",
              matomo: {
                eventCategory: "wallet hero buttons",
                eventAction: "click",
                eventName: "interactive tutorial",
              },
              variant: "outline",
            },
          ]
        : [
            {
              href: "/wallets/find-wallet/",
              content: t("page-wallets-find-wallet-link"),
              matomo: {
                eventCategory: "wallet hero buttons",
                eventAction: "click",
                eventName: "find wallet",
              },
            },
          ],
  }

  const cards = [
    {
      emoji: ":dollar:",
      title: t("page-wallets-manage-funds"),
      description: (
        <Translation id="page-wallets:page-wallets-manage-funds-desc" />
      ),
    },
    {
      emoji: ":frame_with_picture:",
      title: t("page-wallets-your-ethereum-account"),
      description: (
        <Translation id="page-wallets:page-wallets-your-ethereum-account-desc" />
      ),
    },
    {
      emoji: ":bust_in_silhouette:",
      title: t("page-wallets-your-login"),
      description: (
        <Translation id="page-wallets:page-wallets-your-login-desc" />
      ),
    },
  ]

  const types = [
    {
      emoji: ":cd:",
      description: <Translation id="page-wallets:page-wallets-cd" />,
    },
    {
      emoji: ":mobile_phone:",
      description: <Translation id="page-wallets:page-wallets-mobile" />,
    },
    {
      emoji: ":globe_with_meridians:",
      description: <Translation id="page-wallets:page-wallets-web-browser" />,
    },
    {
      emoji: ":globe_with_meridians:",
      description: (
        <Translation id="page-wallets:page-wallets-web-browser-extension" />
      ),
    },
    {
      emoji: ":desktop_computer:",
      description: <Translation id="page-wallets:page-wallets-desktop" />,
    },
  ]

  const articles = [
    {
      title: t("page-wallets-protecting-yourself"),
      description: "MyCrypto",
      link: "https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds",
    },
    {
      title: t("page-wallets-keys-to-safety"),
      description: t("page-wallets-blog"),
      link: "https://www.coinbase.com/learn/crypto-basics/how-to-secure-crypto",
    },
  ]

  const guides = [
    {
      title: t("additional-reading-how-to-create-an-ethereum-account"),
      link: "/guides/how-to-create-an-ethereum-account/",
    },
    {
      title: t("additional-reading-how-to-use-a-wallet"),
      link: "/guides/how-to-use-a-wallet/",
    },
  ]

  return (
    <Page>
      <PageMetadata
        title={t("page-wallets-meta-title")}
        description={t("page-wallets-meta-description")}
        image="/images/wallets/wallet-hero.png"
      />
      <PageHero content={heroContent} isReverse />
      <GrayContainer>
        <Intro>
          <H2>{t("page-wallets-whats-a-wallet")}</H2>
        </Intro>
        <TwoColumnContent mb={0}>
          <Box
            flexGrow="0"
            flexShrink="1"
            flexBasis="50%"
            me={{ base: 0, lg: 8 }}
            mt={{ lg: 0 }}
            maxWidth={{ lg: "100%" }}
          >
            <Text>{t("page-wallets-description")}</Text>
            <Text>{t("page-wallets-desc-2")}</Text>
            <CardList items={guides} mb={{ base: 6, lg: 0 }} />
          </Box>
          <RightColumn>
            <Text>{t("page-wallets-desc-3")}</Text>
            <Text>{t("page-wallets-desc-4")}</Text>
          </RightColumn>
        </TwoColumnContent>
        <Content>
          <CardContainer>
            {cards.map((card, idx) => (
              <StyledCard
                key={idx}
                emoji={card.emoji}
                title={card.title}
                description={card.description}
              />
            ))}
          </CardContainer>
        </Content>
      </GrayContainer>
      <TwoColumnContent marginBottom={-8} marginTop={8}>
        <LeftColumn>
          <H2>{t("page-wallets-accounts-addresses")}</H2>
          <Text>{t("page-wallets-accounts-addresses-desc")}</Text>
          <ul>
            <li>
              <Text>
                <Translation id="page-wallets:page-wallets-ethereum-account" />
              </Text>
            </li>
            <li>
              <Text>
                <Translation id="page-wallets:page-wallets-accounts-ethereum-addresses" />
              </Text>
            </li>
            <li>
              <Text>
                <Translation id="page-wallets:page-wallets-ethereum-wallet" />
              </Text>
            </li>
          </ul>
          <Text>{t("page-wallets-most-wallets")}</Text>
        </LeftColumn>
        <RightColumn mt={{ base: 12, lg: 0 }}>
          <H2>{t("page-wallets-types")}</H2>
          <Text>{t("page-wallets-types-desc")}</Text>
          <Box>
            {types.map((type, idx) => (
              <HorizontalCard
                minWidth="100%"
                marginTop={2}
                marginBottom={2}
                ms={0}
                me={0}
                key={idx}
                emoji={type.emoji}
                description={type.description}
                emojiSize={2.5}
                alignItems="center"
              />
            ))}
          </Box>
        </RightColumn>
      </TwoColumnContent>
      {locale === "en" ? (
        <Content my={20} px={0}>
          <Simulator data={walletOnboardingSimData}>
            <ChakraText
              fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
              fontStyle="italic"
              color="body.medium"
              mb={2}
            >
              Interactive tutorial
            </ChakraText>
            <Heading
              as="h2"
              size={{ base: "xl", lg: "2xl" }}
              lineHeight="115%"
              fontWeight="bold"
              m={0}
            >
              How to use a wallet
            </Heading>
          </Simulator>
        </Content>
      ) : (
        <GrayContainer
          my={12}
          bgGradient="linear-gradient(49.21deg, rgba(127, 127, 213, 0.2) 19.87%,
    rgba(134, 168, 231, 0.2) 58.46%,
    rgba(145, 234, 228, 0.2) 97.05%)"
        >
          <Content>
            <Flex flexDirection="column" alignItems="center" mb="8">
              <H2>{t("page-wallets-features-title")}</H2>
              <Box
                fontSize="xl"
                lineHeight={1.4}
                color="text"
                textAlign="center"
                mb={6}
              >
                {t("page-wallets-features-desc")}
              </Box>
              <ButtonLink href="/wallets/find-wallet/">
                {t("page-wallets-find-wallet-btn")}
              </ButtonLink>
              <Image
                src={FindWalletImage}
                alt=""
                mt={8}
                maxW="800px"
                backgroundSize="cover"
                backgroundRepeat="no-repeat"
                w="full"
              />
            </Flex>
          </Content>
        </GrayContainer>
      )}
      <TwoColumnContent>
        <LeftColumn>
          <H2>{t("page-wallets-stay-safe")}</H2>
          <Box lineHeight={1.4} mb={6} color="text300">
            <Translation id="page-wallets:page-wallets-stay-safe-desc" />
          </Box>
          <Box>
            <ChecklistItem
              key="0"
              emoji=":white_check_mark:"
              title={t("page-wallets-take-responsibility")}
              description={t("page-wallets-take-responsibility-desc")}
            />
            <ChecklistItem
              key="1"
              emoji=":white_check_mark:"
              title={<Translation id="page-wallets:page-wallets-seed-phrase" />}
              description={t("page-wallets-seed-phrase-desc")}
            >
              <Text>{t("page-wallets-seed-phrase-example")}</Text>
              <Box bg="black" p={2} mb={4} borderRadius="base">
                <Text fontFamily="monospace" fontSize="sm" color="white" mb={0}>
                  {t("page-wallets-seed-phrase-snippet")}
                </Text>
              </Box>
              <Text>{t("page-wallets-seed-phrase-write-down")}</Text>
            </ChecklistItem>
            <ChecklistItem
              key="2"
              emoji=":white_check_mark:"
              title={t("page-wallets-bookmarking")}
              description={t("page-wallets-bookmarking-desc")}
            />
            <ChecklistItem
              key="3"
              emoji=":white_check_mark:"
              title={t("page-wallets-triple-check")}
              description={t("page-wallets-triple-check-desc")}
            />
          </Box>
        </LeftColumn>
        <RightColumn mt={{ base: 12, lg: 0 }}>
          <H2>{t("page-wallets-tips")}</H2>
          <Box lineHeight={1.4} color="text300" mb={6}>
            {t("page-wallets-tips-community")}
          </Box>
          <CardList items={articles} />
        </RightColumn>
      </TwoColumnContent>
      <Content>
        <Divider />
        <H2>{t("page-wallets-explore")}</H2>
        <CalloutCardContainer>
          <Callout
            flex="1 1 424px"
            minH="full"
            image={ETHImage}
            titleKey="page-wallets:page-wallets-get-some"
            alt={t("page-wallets-get-some-alt")}
            descriptionKey="page-wallets:page-wallets-get-some-desc"
          >
            <Box>
              <ButtonLink href="/get-eth/">
                {t("page-wallets-get-some-btn")}
              </ButtonLink>
            </Box>
          </Callout>
          <Callout
            flex="1 1 424px"
            minH="full"
            image={DappsImage}
            titleKey="page-wallets:page-wallets-try-dapps"
            alt={t("page-wallets-try-dapps-alt")}
            descriptionKey="page-wallets:page-wallets-try-dapps-desc"
          >
            <Box>
              <ButtonLink href="/dapps/">
                {t("page-wallets-more-on-dapps-btn")}
              </ButtonLink>
            </Box>
          </Callout>
        </CalloutCardContainer>
      </Content>
      <Content>
        <StandaloneQuizWidget quizKey="wallets" />
      </Content>
      <Content>
        <FeedbackCard />
      </Content>
    </Page>
  )
}

export default WalletsPage
