import { ReactNode } from "react"
import { GetStaticProps } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import {
  Box,
  chakra,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  TextProps,
  useColorModeValue,
} from "@chakra-ui/react"

import { BasePageProps, ChildOnlyProp, Lang } from "@/lib/types"

import ButtonLink from "@/components/Buttons/ButtonLink"
import Callout from "@/components/Callout"
import Card, { CardProps } from "@/components/Card"
import FeedbackCard from "@/components/FeedbackCard"
import HubHero from "@/components/Hero/HubHero"
import { Image } from "@/components/Image"
import InlineLink from "@/components/Link"
import MainArticle from "@/components/MainArticle"
import OldHeading from "@/components/OldHeading"
import Text from "@/components/OldText"
import PageMetadata from "@/components/PageMetadata"
import Translation from "@/components/Translation"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import SpeedRunEthereumImage from "@/public/images/dev-tools/speed-run-ethereum-banner.png"
import DevelopersImage from "@/public/images/developers-eth-blocks.png"
import DogeImage from "@/public/images/doge-computer.png"
import HeroImage from "@/public/images/heroes/developers-hub-hero.jpg"

const Page = (props: ChildOnlyProp) => (
  <Flex
    flexDirection="column"
    alignItems="center"
    w="full"
    my={0}
    mx="auto"
    {...props}
  />
)

const GrayContainer = (props: ChildOnlyProp) => (
  <Box
    w="full"
    py={16}
    px={0}
    mt={8}
    bg="grayBackground"
    boxShadow="inset 0px 1px 0px var(--eth-colors-tableItemBoxShadow)"
    {...props}
  />
)

const Content = (props: ChildOnlyProp) => (
  <Box as={MainArticle} py={4} px={8} w="full" {...props} />
)

const Subtitle = (props: TextProps) => (
  <Text fontSize="xl" lineHeight="140%" color="text200" {...props} />
)

const MonoSubtitle = (props: ChildOnlyProp) => <OldHeading mb={0} {...props} />

const StyledCardContainer = (props: ChildOnlyProp) => (
  <SimpleGrid columns={[1, 1, 2, 4]} mx={-4} mt={8} mb={12} {...props} />
)

const TwoColumnContent = (props: ChildOnlyProp) => (
  <Flex
    justifyContent="space-between"
    alignItems={{ base: "flex-start", lg: "center" }}
    flexDirection={{ base: "column", lg: "row" }}
    w="100%"
    {...props}
  />
)

const ThreeColumnContent = (props: ChildOnlyProp) => (
  <Flex
    py={0}
    px={8}
    w="full"
    justifyContent="space-between"
    alignItems={{ base: "flex-start", lg: "flex-start" }}
    flexDirection={{ base: "column", lg: "row" }}
    {...props}
  />
)

const Column = (props: ChildOnlyProp) => (
  <Box flex="1 1 33%" mb={6} me={8} w="full" {...props} />
)
const RightColumn = (props: ChildOnlyProp) => (
  <Box flex="1 1 33%" mb={6} me={0} w="full" {...props} />
)
const IntroColumn = (props: ChildOnlyProp) => (
  <Box
    flex="1 1 33%"
    mb={6}
    mt={{ base: 0, lg: 32 }}
    me={{ base: 0, sm: 8 }}
    w="full"
    {...props}
  />
)

const StyledCard = (props: CardProps) => {
  const tableBoxShadow = useColorModeValue("tableBox.light", "tableBox.dark")

  return (
    <Card
      boxShadow={tableBoxShadow}
      m={4}
      p={6}
      {...props}
      _hover={{
        borderRadius: "4px",
        boxShadow: "0px 8px 17px rgba(0, 0, 0, 0.15)",
        background: "tableBackgroundHover",
        transition: "transform 0.1s",
        transform: "scale(1.02)",
      }}
    />
  )
}

const StyledCallout = chakra(Callout, {
  baseStyle: {
    flex: { base: "auto", md: "1 1 416px" },
  },
})

const SpeedRunEthereumBanner = ({
  title,
  linkLabel,
}: {
  title: string
  linkLabel: string
}) => (
  <Box position="relative" mb={{ xl: 12 }}>
    <Image
      src={SpeedRunEthereumImage}
      alt="SpeedRunEthereum banner"
      sizes="100vw"
      style={{ width: "100vw", objectFit: "cover", objectPosition: "20%" }}
      h={{
        base: "450px",
        xl: "auto",
      }}
    />
    <Stack
      spacing={{ base: "3", md: "4" }}
      p={{ base: "6", lg: "8" }}
      position="absolute"
      insetInlineStart={{ md: "8" }}
      maxW={{ base: "lg", xl: "xl" }}
      top={{ base: "0", md: "50" }}
      wordBreak="break-word"
      alignItems="flex-start"
    >
      <Heading>{title}</Heading>
      <ButtonLink href="https://speedrunethereum.com/">{linkLabel}</ButtonLink>
    </Stack>
  </Box>
)

export const getStaticProps = (async ({ locale }) => {
  const requiredNamespaces = getRequiredNamespacesForPage("/developers")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

interface IDevelopersPath {
  emoji: string
  title: ReactNode
  description: ReactNode
  url: string
  button: ReactNode
}

const paths: Array<IDevelopersPath> = [
  {
    emoji: ":woman_student:",
    title: <Translation id="page-developers-index:page-developers-learn" />,
    description: (
      <Translation id="page-developers-index:page-developers-learn-desc" />
    ),
    url: "/developers/docs/",
    button: (
      <Translation id="page-developers-index:page-developers-read-docs" />
    ),
  },
  {
    emoji: ":woman_teacher:",
    title: (
      <Translation id="page-developers-index:page-developers-learn-tutorials" />
    ),
    description: (
      <Translation id="page-developers-index:page-developers-learn-tutorials-desc" />
    ),
    url: "/developers/tutorials/",
    button: (
      <Translation id="page-developers-index:page-developers-learn-tutorials-cta" />
    ),
  },
  {
    emoji: ":woman_scientist:",
    title: <Translation id="page-developers-index:page-developers-start" />,
    description: (
      <Translation id="page-developers-index:page-developers-start-desc" />
    ),
    url: "/developers/learning-tools/",
    button: (
      <Translation id="page-developers-index:page-developers-play-code" />
    ),
  },
  {
    emoji: ":construction_worker:",
    title: <Translation id="page-developers-index:page-developers-set-up" />,
    description: (
      <Translation id="page-developers-index:page-developers-setup-desc" />
    ),
    url: "/developers/local-environment/",
    button: (
      <Translation id="page-developers-index:page-developers-choose-stack" />
    ),
  },
]

const DevelopersPage = () => {
  const { t } = useTranslation("page-developers-index")

  return (
    <Page>
      <PageMetadata
        title={t("page-developers-index:page-developer-meta-title")}
        description={t("page-developers-index:page-developers-meta-desc")}
      />
      <HubHero
        heroImg={HeroImage}
        header={`${t("page-developers-index:page-developers-title-1")} ${t(
          "page-developers-index:page-developers-title-2"
        )} ${t("page-developers-index:page-developers-title-3")}`}
        title={t("common:developers")}
        description={t("page-developers-index:page-developers-subtitle")}
      />
      <Content>
        <MonoSubtitle>
          <Translation id="page-developers-index:page-developers-get-started" />
        </MonoSubtitle>
        <StyledCardContainer>
          {paths.map((path, idx) => (
            <StyledCard
              key={idx}
              emoji={path.emoji}
              title={path.title}
              description={path.description}
            >
              <ButtonLink href={path.url}>{path.button}</ButtonLink>
            </StyledCard>
          ))}
        </StyledCardContainer>
        <SpeedRunEthereumBanner
          title={t(
            "page-developers-index:page-developers-speedrunethereum-title"
          )}
          linkLabel={t(
            "page-developers-index:page-developers-speedrunethereum-link"
          )}
        />
        <TwoColumnContent>
          <IntroColumn>
            <OldHeading>
              <Translation id="page-developers-index:page-developers-about" />
            </OldHeading>
            <Subtitle mb={6}>
              <Translation id="page-developers-index:page-developers-about-desc" />
            </Subtitle>
            <Text>
              <Translation id="page-developers-index:page-developers-about-desc-2" />
            </Text>
            <Text>
              <Translation id="page-developers-index:page-developers-feedback" />{" "}
              <InlineLink href="https://discord.gg/ethereum-org">
                <Translation id="page-developers-index:page-developers-discord" />
              </InlineLink>
            </Text>
          </IntroColumn>
          <StyledCallout
            image={DevelopersImage}
            titleKey="page-developers-index:page-developers-improve-ethereum"
            descriptionKey="page-developers-index:page-developers-improve-ethereum-desc"
            alt={t("page-developers-index:alt-eth-blocks")}
          >
            <div>
              <ButtonLink href="https://github.com/ethereum/ethereum-org-website">
                <Translation id="page-developers-index:page-developers-contribute" />
              </ButtonLink>
            </div>
          </StyledCallout>
        </TwoColumnContent>
      </Content>
      <GrayContainer>
        <Content>
          <OldHeading>
            <Translation id="page-developers-index:page-developers-explore-documentation" />
          </OldHeading>
        </Content>

        <ThreeColumnContent>
          <Column>
            <OldHeading as="h3" fontSize={{ base: "xl", md: "2xl" }}>
              <Translation id="page-developers-index:page-developers-docs-introductions" />
            </OldHeading>
            <InlineLink href="/developers/docs/intro-to-ethereum/">
              <Translation id="page-developers-index:page-developers-intro-eth-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-into-eth-desc" />
            </Text>

            <InlineLink href="/developers/docs/intro-to-ether/">
              <Translation id="page-developers-index:page-developers-intro-ether-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-intro-ether-desc" />
            </Text>

            <InlineLink href="/developers/docs/dapps/">
              <Translation id="page-developers-index:page-developers-intro-dapps-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-intro-dapps-desc" />
            </Text>

            <InlineLink href="/developers/docs/ethereum-stack/">
              <Translation id="page-developers-index:page-developers-intro-stack" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-intro-stack-desc" />
            </Text>

            <InlineLink href="/developers/docs/web2-vs-web3/">
              <Translation id="page-developers-index:page-developers-web3-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-web3-desc" />
            </Text>

            <InlineLink href="/developers/docs/programming-languages/">
              <Translation id="page-developers-index:page-developers-languages" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-language-desc" />
            </Text>
            <Image
              hideBelow="lg"
              src={DogeImage}
              alt={t("page-assets-doge")}
              maxW="400px"
              mt={16}
            />
          </Column>
          <Column>
            <OldHeading as="h3" fontSize={{ base: "xl", md: "2xl" }}>
              <Translation id="page-developers-index:page-developers-fundamentals" />
            </OldHeading>
            <InlineLink href="/developers/docs/accounts/">
              <Translation id="page-developers-index:page-developers-accounts-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-account-desc" />
            </Text>

            <InlineLink href="/developers/docs/transactions/">
              <Translation id="page-developers-index:page-developers-transactions-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-transactions-desc" />
            </Text>

            <InlineLink href="/developers/docs/blocks/">
              <Translation id="page-developers-index:page-developers-blocks-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-block-desc" />
            </Text>

            <InlineLink href="/developers/docs/evm/">
              <Translation id="page-developers-index:page-developers-evm-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-evm-desc" />
            </Text>

            <InlineLink href="/developers/docs/gas/">
              <Translation id="page-developers-index:page-developers-gas-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-gas-desc" />
            </Text>

            <InlineLink href="/developers/docs/nodes-and-clients/">
              <Translation id="page-developers-index:page-developers-node-clients-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-node-clients-desc" />
            </Text>

            <InlineLink href="/developers/docs/networks/">
              <Translation id="page-developers-index:page-developers-networks-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-networks-desc" />
            </Text>

            <InlineLink href="/developers/docs/consensus-mechanisms/pow/mining/">
              <Translation id="page-developers-index:page-developers-mining-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-mining-desc" />
            </Text>

            <InlineLink href="/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/">
              <Translation id="page-developers-index:page-developers-mining-algorithms-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-mining-algorithms-desc" />
            </Text>
          </Column>
          <RightColumn>
            <OldHeading as="h3" fontSize={{ base: "xl", md: "2xl" }}>
              <Translation id="page-developers-index:page-developers-stack" />
            </OldHeading>
            <InlineLink href="/developers/docs/smart-contracts/">
              <Translation id="page-developers-index:page-developers-smart-contracts-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-smart-contracts-desc" />
            </Text>
            <InlineLink href="/developers/docs/frameworks/">
              <Translation id="page-developers-index:page-developers-frameworks-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-frameworks-desc" />
            </Text>
            <InlineLink href="/developers/docs/apis/javascript/">
              <Translation id="page-developers-index:page-developers-js-libraries-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-js-libraries-desc" />
            </Text>
            <InlineLink href="/developers/docs/apis/backend/">
              <Translation id="page-developers-index:page-developers-api-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-api-desc" />
            </Text>
            <InlineLink href="/developers/docs/data-and-analytics/block-explorers/">
              <Translation id="page-developers-index:page-developers-block-explorers-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-block-explorers-desc" />
            </Text>
            <InlineLink href="/developers/docs/smart-contracts/security/">
              <Translation id="page-developers-index:page-developers-smart-contract-security-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-smart-contract-security-desc" />
            </Text>
            <InlineLink href="/developers/docs/storage/">
              <Translation id="page-developers-index:page-developers-storage-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-storage-desc" />
            </Text>
            <InlineLink href="/developers/docs/ides/">
              <Translation id="page-developers-index:page-developers-dev-env-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-dev-env-desc" />
            </Text>
            <OldHeading as="h3" fontSize={{ base: "xl", md: "2xl" }}>
              <Translation id="page-developers-index:page-developers-advanced" />
            </OldHeading>
            <InlineLink href="/developers/docs/standards/tokens/">
              <Translation id="page-developers-index:page-developers-token-standards-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-token-standards-desc" />
            </Text>
            <InlineLink href="/developers/docs/mev/">
              <Translation id="page-developers-index:page-developers-mev-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-mev-desc" />
            </Text>
            <InlineLink href="/developers/docs/oracles/">
              <Translation id="page-developers-index:page-developers-oracles-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-oracle-desc" />
            </Text>
            <InlineLink href="/developers/docs/scaling/">
              <Translation id="page-developers-index:page-developers-scaling-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-scaling-desc" />
            </Text>
            <InlineLink href="/developers/docs/networking-layer/">
              <Translation id="page-developers-index:page-developers-networking-layer-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-networking-layer-desc" />
            </Text>
            <InlineLink href="/developers/docs/data-structures-and-encoding/">
              <Translation id="page-developers-index:page-developers-data-structures-and-encoding-link" />
            </InlineLink>
            <Text>
              <Translation id="page-developers-index:page-developers-data-structures-and-encoding-desc" />
            </Text>
          </RightColumn>
        </ThreeColumnContent>
      </GrayContainer>
      <FeedbackCard />
    </Page>
  )
}

export default DevelopersPage
