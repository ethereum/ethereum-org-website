import { lazy, ReactNode, Suspense, useState } from "react"
import type { GetStaticProps, InferGetStaticPropsType } from "next"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { FaGithub } from "react-icons/fa"
import {
  Box,
  chakra,
  Divider,
  Flex,
  FlexProps,
  Heading,
  HeadingProps,
  Icon,
  SimpleGridProps,
  SkeletonText,
  Stack,
  useToken,
} from "@chakra-ui/react"

import { AllMetricData, BasePageProps, ChildOnlyProp, Lang } from "@/lib/types"
import type { CodeExample, CommunityEventsReturnType } from "@/lib/interfaces"

import ActionCard from "@/components/ActionCard"
import ButtonLink from "@/components/Buttons/ButtonLink"
import CalloutBanner from "@/components/CalloutBanner"
import CodeModal from "@/components/CodeModal"
import CommunityEvents from "@/components/CommunityEvents"
import HomeHero from "@/components/Hero/HomeHero"
import { Image } from "@/components/Image"
import LazyLoadComponent from "@/components/LazyLoadComponent"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"
import TitleCardList from "@/components/TitleCardList"
import { TranslatathonBanner } from "@/components/Translatathon/TranslatathonBanner"
import Translation from "@/components/Translation"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { runOnlyOnce } from "@/lib/utils/runOnlyOnce"
import { getLocaleTimestamp } from "@/lib/utils/time"
import {
  getRequiredNamespacesForPage,
  isLangRightToLeft,
} from "@/lib/utils/translations"

import { BASE_TIME_UNIT } from "@/lib/constants"

import CreateWalletContent from "!!raw-loader!@/data/CreateWallet.js"
import SimpleDomainRegistryContent from "!!raw-loader!@/data/SimpleDomainRegistry.sol"
import SimpleTokenContent from "!!raw-loader!@/data/SimpleToken.sol"
import SimpleWalletContent from "!!raw-loader!@/data/SimpleWallet.sol"
import { fetchCommunityEvents } from "@/lib/api/calendarEvents"
import { fetchNodes } from "@/lib/api/fetchNodes"
import { fetchTotalEthStaked } from "@/lib/api/fetchTotalEthStaked"
import { fetchTotalValueLocked } from "@/lib/api/fetchTotalValueLocked"
import { fetchTxCount } from "@/lib/api/fetchTxCount"
import devfixed from "@/public/images/developers-eth-blocks.png"
import dogefixed from "@/public/images/doge-computer.png"
import enterprise from "@/public/images/enterprise-eth.png"
import ethfixed from "@/public/images/eth.png"
import finance from "@/public/images/finance_transparent.png"
import future from "@/public/images/future_transparent.png"
import hackathon from "@/public/images/hackathon_transparent.png"
import hero from "@/public/images/home/hero.png"
import impact from "@/public/images/impact_transparent.png"
import infrastructure from "@/public/images/infrastructure_transparent.png"
import infrastructurefixed from "@/public/images/infrastructure_transparent.png"
import merge from "@/public/images/upgrades/merge.png"
import robotfixed from "@/public/images/wallet-cropped.png"
import ethereum from "@/public/images/what-is-ethereum.png"

// lazy loaded components
const Codeblock = lazy(() =>
  Promise.all([
    import("@/components/Codeblock"),
    // Add a delay to prevent the skeleton from flashing
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ]).then(([module]) => module)
)
const StatsBoxGrid = lazy(() => import("@/components/StatsBoxGrid"))

const Skeleton = () => (
  <Stack px={6} pt="2.75rem" h="50vh">
    <SkeletonText
      mt="4"
      noOfLines={6}
      spacing={4}
      skeletonHeight="1.4rem"
      startColor="body.medium"
      opacity={0.2}
    />
  </Stack>
)

const SectionHeading = (props: HeadingProps) => (
  <Heading
    lineHeight={1.4}
    fontFamily="sans-serif"
    fontSize={{ base: "2xl", sm: "2rem" }}
    fontWeight={600}
    mb={2}
    {...props}
  />
)

const SectionDecription = (props: ChildOnlyProp) => (
  <Box mb={8} fontSize={{ base: "md", sm: "xl" }} lineHeight={1.4} {...props} />
)

const ImageContainer = (props: FlexProps & { children: ReactNode }) => (
  <Flex width={{ base: "75%", lg: "full" }} height="full" {...props} />
)

const CardContainer = (props: {
  children: ReactNode
  minChildWidth: SimpleGridProps["minChildWidth"]
}) => (
  <Flex
    flexWrap="wrap"
    gap={8}
    p={{ lg: 4 }}
    width="full"
    sx={{
      "& > *": {
        minW: props.minChildWidth,
      },
    }}
  >
    {props.children}
  </Flex>
)

const ContentBox = (props: ChildOnlyProp) => (
  <Box py={4} px={{ base: 4, lg: 8 }} {...props} />
)

const StyledActionCard = chakra(ActionCard, {
  baseStyle: {
    background: "background.base",
    borderRadius: "sm",
    border: "1px",
    borderColor: "text",
    margin: 0,
  },
})

const StyledTitleCardList = chakra(TitleCardList)

const GrayContainer = (props: ChildOnlyProp) => (
  <Box width="full" pb={16} background="grayBackground" {...props} />
)

const MainSectionContainer = (props: {
  children: ReactNode
  containerBg: FlexProps["bg"]
}) => (
  <Flex
    alignItems="center"
    background={props.containerBg}
    borderBlock="1px"
    borderColor="text"
    height={{ base: "100%", lg: "720px" }}
    mt="-1px"
    py={{ base: 8, lg: 0 }}
    width="full"
  >
    {props.children}
  </Flex>
)

const FeatureContent = (props: ChildOnlyProp) => (
  <Flex
    flex="0 0 50%"
    flexDirection="column"
    justifyContent="center"
    boxSize="full"
    maxWidth={{ lg: "75%" }}
    p={{ base: 8, lg: 24 }}
    {...props}
  />
)

const Row = (props: { children: ReactNode; isReversed?: boolean }) => (
  <Flex
    alignItems="center"
    flexDirection={{
      base: "column-reverse",
      lg: props.isReversed ? "row-reverse" : "row",
    }}
  >
    {props.children}
  </Flex>
)

const ButtonLinkRow = (props: ChildOnlyProp) => (
  <Stack
    alignItems="flex-start"
    direction={{ base: "column", md: "row" }}
    spacing={{ base: 6, md: 2 }}
    {...props}
  />
)

const cachedFetchCommunityEvents = runOnlyOnce(fetchCommunityEvents)
const cachedFetchTotalEthStaked = runOnlyOnce(fetchTotalEthStaked)
const cachedFetchNodes = runOnlyOnce(fetchNodes)
const cachedFetchTotalValueLocked = runOnlyOnce(fetchTotalValueLocked)
const cachedFetchTxCount = runOnlyOnce(fetchTxCount)

type Props = BasePageProps & {
  communityEvents: CommunityEventsReturnType
  metricResults: AllMetricData
}

export const getStaticProps = (async ({ locale }) => {
  const metricResults: AllMetricData = {
    totalEthStaked: await cachedFetchTotalEthStaked(),
    nodeCount: await cachedFetchNodes(),
    totalValueLocked: await cachedFetchTotalValueLocked(),
    txCount: await cachedFetchTxCount(),
  }

  const communityEvents = await cachedFetchCommunityEvents()

  // load i18n required namespaces for the given page
  const requiredNamespaces = getRequiredNamespacesForPage("/")

  // check if the translated page content file exists for locale
  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[0])

  // load last deploy date to pass to Footer in RootLayout
  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      communityEvents,
      contentNotTranslated,
      lastDeployLocaleTimestamp,
      metricResults,
    },
    revalidate: BASE_TIME_UNIT * 24,
  }
}) satisfies GetStaticProps<Props>

const HomePage = ({
  communityEvents,
  metricResults,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation(["common", "page-index"])
  const { locale, asPath } = useRouter()
  const [isModalOpen, setModalOpen] = useState(false)
  const [activeCode, setActiveCode] = useState(0)
  const dir = isLangRightToLeft(locale as Lang) ? "rtl" : "ltr"

  const toggleCodeExample = (id: number): void => {
    setActiveCode(id)
    setModalOpen(true)
  }

  const cards = [
    {
      image: robotfixed,
      title: t("page-index:page-index-get-started-wallet-title"),
      description: t("page-index:page-index-get-started-wallet-description"),
      alt: t("page-index:page-index-get-started-wallet-image-alt"),
      href: "/wallets/find-wallet/",
    },
    {
      image: ethfixed,
      title: t("page-index:page-index-get-started-eth-title"),
      description: t("page-index:page-index-get-started-eth-description"),
      alt: t("page-index:page-index-get-started-eth-image-alt"),
      href: "/get-eth/",
    },
    {
      image: dogefixed,
      title: t("page-index:page-index-get-started-dapps-title"),
      description: t("page-index:page-index-get-started-dapps-description"),
      alt: t("page-index:page-index-get-started-dapps-image-alt"),
      href: "/dapps/",
    },
    {
      image: devfixed,
      title: t("page-index:page-index-get-started-devs-title"),
      description: t("page-index:page-index-get-started-devs-description"),
      alt: t("page-index:page-index-get-started-devs-image-alt"),
      href: "/developers/",
    },
  ]

  const touts = [
    {
      image: merge,
      alt: t("page-index:page-index-tout-upgrades-image-alt"),
      title: t("page-index:page-index-tout-upgrades-title"),
      description: t("page-index:page-index-tout-upgrades-description"),
      href: "/roadmap/",
    },
    {
      image: infrastructurefixed,
      alt: t("page-index:page-index-tout-enterprise-image-alt"),
      title: t("page-index:page-index-tout-enterprise-title"),
      description: t("page-index:page-index-tout-enterprise-description"),
      href: "/enterprise/",
    },
    {
      image: enterprise,
      alt: t("page-index:page-index-tout-community-image-alt"),
      title: t("page-index:page-index-tout-community-title"),
      description: t("page-index:page-index-tout-community-description"),
      href: "/community/",
    },
  ]

  const codeExamples: Array<CodeExample> = [
    {
      title: t("page-index:page-index-developers-code-example-title-0"),
      description: t(
        "page-index:page-index-developers-code-example-description-0"
      ),
      codeLanguage: "language-solidity",
      code: SimpleWalletContent,
    },
    {
      title: t("page-index:page-index-developers-code-example-title-1"),
      description: t(
        "page-index:page-index-developers-code-example-description-1"
      ),
      codeLanguage: "language-solidity",
      code: SimpleTokenContent,
    },
    {
      title: t("page-index:page-index-developers-code-example-title-2"),
      description: t(
        "page-index:page-index-developers-code-example-description-2"
      ),
      codeLanguage: "language-javascript",
      code: CreateWalletContent,
    },
    {
      title: t("page-index:page-index-developers-code-example-title-3"),
      description: t(
        "page-index:page-index-developers-code-example-description-3"
      ),
      codeLanguage: "language-solidity",
      code: SimpleDomainRegistryContent,
    },
  ]

  const cardBoxShadow = useToken("colors", "cardBoxShadow")

  return (
    <Flex
      as={MainArticle}
      flexDirection="column"
      alignItems="center"
      dir={dir}
      width="full"
    >
      <PageMetadata
        title={t("page-index:page-index-meta-title")}
        description={t("page-index:page-index-meta-description")}
      />
      <TranslatathonBanner pathname={asPath} />
      <Box w="full">
        <HomeHero heroImg={hero} />
      </Box>
      {/* Getting Started Section */}
      <GrayContainer>
        <ContentBox>
          <Flex
            alignItems="center"
            flexDirection={{ base: "column-reverse", md: "row" }}
            mt={{ md: 4 }}
            mb={{ md: 12 }}
          >
            <Box
              flex="0 0 50%"
              maxW={{ lg: "75%" }}
              p={{ sm: 8, lg: 24 }}
              boxSize="full"
            >
              <SectionHeading fontFamily="inherit" mb={6}>
                <Translation id="page-index:page-index-get-started" />
              </SectionHeading>
              <SectionDecription>
                <Translation id="page-index:page-index-get-started-description" />
              </SectionDecription>
            </Box>
            <ImageContainer>
              <Image
                src={hackathon}
                alt={t("page-index:page-index-get-started-image-alt")}
                width={720}
                backgroundSize="cover"
                background="no-repeat 50px"
              />
            </ImageContainer>
          </Flex>
          <CardContainer minChildWidth={{ lg: "480px" }}>
            {cards.map((card, idx) => (
              <StyledActionCard
                key={idx}
                boxShadow={cardBoxShadow}
                m={0}
                title={card.title}
                description={card.description}
                alt={card.alt}
                href={card.href}
                image={card.image}
                imageWidth={320}
              />
            ))}
          </CardContainer>
        </ContentBox>
      </GrayContainer>
      {/* What is Eth Section */}
      <MainSectionContainer containerBg="homeBoxTurquoise">
        <Row isReversed>
          <FeatureContent>
            <SectionHeading>
              <Translation id="page-index:page-index-what-is-ethereum" />
            </SectionHeading>
            <SectionDecription>
              <Translation id="page-index:page-index-what-is-ethereum-description" />
            </SectionDecription>
            <ButtonLinkRow>
              <ButtonLink href="/what-is-ethereum/">
                <Translation id="page-index:page-index-what-is-ethereum-button" />
              </ButtonLink>
              <ButtonLink href="/eth/" variant="outline" isSecondary>
                <Translation id="page-index:page-index-what-is-ethereum-secondary-button" />
              </ButtonLink>
            </ButtonLinkRow>
          </FeatureContent>
          <ImageContainer ps={{ lg: 8 }}>
            <Image
              src={ethereum}
              alt={t("page-index:page-index-what-is-ethereum-image-alt")}
              width={700}
            />
          </ImageContainer>
        </Row>
      </MainSectionContainer>
      {/* Finance Section */}
      <MainSectionContainer containerBg="homeBoxOrange">
        <Row>
          <FeatureContent>
            <SectionHeading>
              <Translation id="page-index:page-index-defi" />
            </SectionHeading>
            <SectionDecription>
              <Translation id="page-index:page-index-defi-description" />
            </SectionDecription>
            <ButtonLinkRow>
              <ButtonLink href="/defi/">
                <Translation id="page-index:page-index-defi-button" />
              </ButtonLink>
            </ButtonLinkRow>
          </FeatureContent>
          <ImageContainer>
            <Image
              src={impact}
              alt={t("page-index:page-index-defi-image-alt")}
              width={700}
            />
          </ImageContainer>
        </Row>
      </MainSectionContainer>
      {/* NFT Section */}
      <MainSectionContainer containerBg="homeBoxMint">
        <Row isReversed>
          <FeatureContent>
            <SectionHeading>
              <Translation id="page-index:page-index-nft" />
            </SectionHeading>
            <SectionDecription>
              <Translation id="page-index:page-index-nft-description" />
            </SectionDecription>
            <ButtonLinkRow>
              <ButtonLink href="/nft/">
                <Translation id="page-index:page-index-nft-button" />
              </ButtonLink>
            </ButtonLinkRow>
          </FeatureContent>
          <ImageContainer>
            <Image
              src={infrastructure}
              alt={t("page-index:page-index-nft-alt")}
              width={700}
            />
          </ImageContainer>
        </Row>
      </MainSectionContainer>
      {/* Internet Section */}
      <MainSectionContainer containerBg="homeBoxPink">
        <Box ps={{ lg: 8 }}>
          <Row>
            <FeatureContent>
              <SectionHeading>
                <Translation id="page-index:page-index-internet" />
              </SectionHeading>
              <SectionDecription>
                <Translation id="page-index:page-index-internet-description" />
              </SectionDecription>
              <ButtonLinkRow>
                <ButtonLink href="/dapps/?category=technology">
                  <Translation id="page-index:page-index-internet-button" />
                </ButtonLink>
                <ButtonLink href="/wallets/" variant="outline" isSecondary>
                  <Translation id="page-index:page-index-internet-secondary-button" />
                </ButtonLink>
              </ButtonLinkRow>
            </FeatureContent>
            <ImageContainer>
              <Image
                src={future}
                alt={t("page-index:page-index-internet-image-alt")}
                width={700}
              />
            </ImageContainer>
          </Row>
        </Box>
      </MainSectionContainer>
      {/* Developer Section */}
      <MainSectionContainer containerBg="homeBoxPurple">
        <Row>
          <Box py={4} px={{ base: 4, sm: 8 }} width="full">
            <StyledTitleCardList
              content={codeExamples}
              clickHandler={toggleCodeExample}
              headerKey="page-index:page-index-developers-code-examples"
              isCode
              border="1px"
              borderColor="text"
              boxShadow={cardBoxShadow}
              maxWidth={{ lg: "624px" }}
              ms={{ lg: 16 }}
            />
          </Box>
          <FeatureContent>
            <SectionHeading>
              <Translation id="page-index:page-index-developers" />
            </SectionHeading>
            <SectionDecription>
              <Translation id="page-index:page-index-developers-description" />
            </SectionDecription>
            <ButtonLinkRow>
              <ButtonLink href="/developers/">
                <Translation id="page-index:page-index-developers-button" />
              </ButtonLink>
            </ButtonLinkRow>
          </FeatureContent>
          {/* Render CodeModal & Codeblock conditionally */}
          {isModalOpen && (
            <CodeModal
              isOpen={isModalOpen}
              setIsOpen={setModalOpen}
              title={codeExamples[activeCode].title}
            >
              <Suspense fallback={<Skeleton />}>
                <Codeblock
                  codeLanguage={codeExamples[activeCode].codeLanguage}
                  allowCollapse={false}
                  fromHomepage
                >
                  {codeExamples[activeCode].code}
                </Codeblock>
              </Suspense>
            </CodeModal>
          )}
        </Row>
      </MainSectionContainer>
      {/* Eth Today Section */}
      <GrayContainer>
        <ContentBox>
          <SectionHeading mt={12} mb={8} fontFamily="heading">
            <Translation id="page-index:page-index-network-stats-title" />
          </SectionHeading>
          <SectionDecription>
            <Translation id="page-index:page-index-network-stats-subtitle" />
          </SectionDecription>
        </ContentBox>

        <LazyLoadComponent
          component={StatsBoxGrid}
          fallback={<Skeleton />}
          componentProps={{ data: metricResults }}
          intersectionOptions={{
            root: null,
            rootMargin: "500px",
            threshold: 0,
          }}
        />
      </GrayContainer>
      <Divider mb={16} mt={16} w="10%" height="0.25rem" bgColor="homeDivider" />
      <CommunityEvents events={communityEvents} />
      {/* Explore Section */}
      <ContentBox>
        <Box pb={4}>
          <SectionHeading mt={12} mb={8} fontFamily="heading">
            <Translation id="page-index:page-index-touts-header" />
          </SectionHeading>
        </Box>
        <CardContainer minChildWidth={{ lg: "400px" }}>
          {touts.map((tout, idx) => {
            return (
              <StyledActionCard
                key={idx}
                title={tout.title}
                description={tout.description}
                alt={tout.alt}
                href={tout.href}
                image={tout.image}
                imageWidth={320}
                boxShadow={cardBoxShadow}
              />
            )
          })}
        </CardContainer>
        <CalloutBanner
          titleKey={"page-index:page-index-contribution-banner-title"}
          descriptionKey={
            "page-index:page-index-contribution-banner-description"
          }
          image={finance}
          imageWidth={600}
          alt={t("page-index:page-index-contribution-banner-image-alt")}
          mt={32}
          mb={16}
          mx={0}
        >
          <ButtonLinkRow>
            <ButtonLink href="/contributing/">
              <Translation id="page-index:page-index-contribution-banner-button" />
            </ButtonLink>
            <ButtonLink
              href="https://github.com/ethereum/ethereum-org-website"
              leftIcon={<Icon as={FaGithub} fontSize="2xl" />}
              variant="outline"
              isSecondary
            >
              GitHub
            </ButtonLink>
          </ButtonLinkRow>
        </CalloutBanner>
      </ContentBox>
    </Flex>
  )
}

export default HomePage
