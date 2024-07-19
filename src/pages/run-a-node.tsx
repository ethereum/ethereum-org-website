import type { GetStaticProps } from "next/types"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import type { ComponentProps, ReactNode } from "react"
import { FaDiscord } from "react-icons/fa"
import {
  Box,
  type BoxProps,
  Center,
  type CenterProps,
  Flex,
  type FlexProps,
  type HeadingProps,
  type Icon as ChakraIcon,
} from "@chakra-ui/react"

import type { BasePageProps, ChildOnlyProp, Lang } from "@/lib/types"

import { Button, ButtonLink } from "@/components/Buttons"
import Emoji from "@/components/Emoji"
import ExpandableCard from "@/components/ExpandableCard"
import ExpandableInfo from "@/components/ExpandableInfo"
import FeedbackCard from "@/components/FeedbackCard"
import {
  DecentralizationGlyphIcon,
  DownloadGlyphIcon,
  EarthGlyphIcon,
  HardwareGlyphIcon,
  MegaphoneGlyphIcon,
  PrivacyGlyphIcon,
  SovereigntyGlyphIcon,
  VoteGlyphIcon,
} from "@/components/icons/run-a-node"
import { Image } from "@/components/Image"
import InlineLink from "@/components/Link"
import MainArticle from "@/components/MainArticle"
import OldHeading from "@/components/OldHeading"
import Text from "@/components/OldText"
import PageHero from "@/components/PageHero"
import PageMetadata from "@/components/PageMetadata"
import { StandaloneQuizWidget as QuizWidget } from "@/components/Quiz/QuizWidget"
import Translation from "@/components/Translation"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { InfoGrid } from "@/layouts/Staking"
import community from "@/public/images/enterprise-eth.png"
import hackathon from "@/public/images/hackathon_transparent.png"
import impact from "@/public/images/impact_transparent.png"
import Dappnode from "@/public/images/run-a-node/dappnode.svg"
import Dapptap from "@/public/images/run-a-node/dapptap.svg"
import ethereumInside from "@/public/images/run-a-node/ethereum-inside.png"
import Terminal from "@/public/images/run-a-node/terminal.svg"
import leslie from "@/public/images/upgrades/upgrade_rhino.png"

const Divider = () => <Box my="16" w="10%" h="1" bg="homeDivider" />

const GappedPage = (props: ChildOnlyProp) => (
  <Flex
    as={MainArticle}
    direction="column"
    align="center"
    w="full"
    my="0"
    mx="auto"
    gap={{ base: 12, lg: 16 }}
    sx={{
      "*": {
        scrollMarginTop: "5.5rem",
      },
    }}
    {...props}
  />
)

const GappedContent = (props: ChildOnlyProp) => (
  <Flex
    direction="column"
    w="full"
    gap={{ base: 8, lg: 12 }}
    px={{ base: 0, md: 8, lg: 16 }}
    py="4"
    {...props}
  />
)

const HeroContainer = (props: ChildOnlyProp) => (
  <Box w="full" bg="runNodeGradient" {...props} />
)

const Content = (props: BoxProps) => <Box w="full" py="4" px="8" {...props} />

const TwoColumnContent = (props: ChildOnlyProp) => (
  <Flex
    direction={{ base: "column", lg: "row" }}
    justify="space-between"
    align={{ base: "flex-start", lg: "center" }}
    gap="8"
    mb="8"
    {...props}
  />
)

const SplitContent = (props: FlexProps) => (
  <Flex
    direction={{ base: "column", md: "row" }}
    align="center"
    w="full"
    gap="8"
    {...props}
  />
)

const Column = (props: ChildOnlyProp) => <Box flex={1} {...props} />

const SoftwareHighlight = (props: CenterProps) => (
  <Center
    w="100%"
    gap="8"
    py="8"
    px={{ base: 8, md: 24 }}
    border="1px"
    borderColor="#dadada"
    borderRadius="base"
    color="text"
    flexDirection={{ base: "column", md: "row" }}
    position="relative"
    isolation="isolate"
    sx={{
      "&::after": {
        content: '""',
        position: "absolute",
        inset: 0,
        zIndex: -1,
        bg: "inherit",
        filter: "blur(1rem)",
      },
    }}
    {...props}
  />
)

const ColumnFill = (props: ChildOnlyProp) => (
  <Box
    flex={1}
    lineHeight="taller"
    sx={{ ul: { listStyle: "none" } }}
    {...props}
  />
)

const ColumnNarrow = (props: ChildOnlyProp) => (
  <Flex
    boxSizing="border-box"
    inset="auto"
    justify="center"
    align="center"
    {...props}
  />
)

const FlexContent = (props: ChildOnlyProp) => (
  <Flex direction="column" py="4" px="8" w="full" {...props} />
)

const FlexContainer = (props: FlexProps) => (
  <Flex direction={{ base: "column", lg: "row" }} gap="8" {...props} />
)

const MarginFlex = (props: ChildOnlyProp) => (
  <FlexContainer my="12" {...props} />
)

const Container = (props: FlexProps) => (
  <Flex
    bg="grayBackground"
    border="1px"
    borderColor="#d1d1d1"
    borderRadius="5px"
    color="text"
    py="0"
    px="8"
    {...props}
  />
)

const BuildBox = (props: ComponentProps<typeof Container>) => (
  <Container
    direction="column"
    bg="preBackground"
    flex={1}
    p="8"
    sx={{
      "& > p:last-of-type": {
        mb: 8,
      },
      "li:last-child": {
        mb: 0,
      },
    }}
    {...props}
  />
)

const BuildBoxSpace = (props: ChildOnlyProp) => (
  <BuildBox
    direction="column"
    justify="space-between"
    _hover={{
      transform: "scale(1.02)",
      transition: "transform 0.1s",
    }}
    {...props}
  />
)

const FullyLoaded = (props: ChildOnlyProp) => (
  <Container
    direction="column"
    justify="space-between"
    lineHeight="200%"
    flex={1}
    px="8"
    py="8"
    _hover={{
      transform: "scale(1.02)",
      transition: "transform 0.1s",
    }}
    sx={{
      p: {
        fontSize: "110%",
      },
      code: {
        fontWeight: 600,
        lineHeight: "125%",
      },
      "li:last-child": {
        mb: 0,
      },
    }}
    {...props}
  />
)

const SvgTitle = (props: ChildOnlyProp) => (
  <Flex gap="4" align="center" {...props} />
)

const ButtonContainer = (props: ChildOnlyProp) => (
  <Flex
    gap="4"
    mt="auto"
    direction={{ base: "column", lg: "row" }}
    {...props}
  />
)

const BuildContainer = (props: ChildOnlyProp) => (
  <Container
    direction="column"
    py="8"
    px={{ base: 0, md: 8 }}
    borderRadius="none"
    border="none"
    bg="none"
    {...props}
  />
)

const StakingCalloutContainer = (props: ChildOnlyProp) => (
  <SplitContent
    w="full"
    p="8"
    bg="linear-gradient(
      262.78deg,
      rgba(152, 186, 249, 0.25) 0%,
      rgba(207, 177, 251, 0.25) 53.12%,
      rgba(151, 252, 246, 0.25) 100%
    )"
    {...props}
  />
)

const StrongParagraph = (props: BoxProps) => (
  <Text fontSize="150%" fontWeight="semibold" {...props} />
)

const H2 = (props: HeadingProps) => (
  <OldHeading
    fontSize={{ base: "2xl", md: "2rem" }}
    lineHeight={1.4}
    {...props}
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

const H4 = (props: ChildOnlyProp) => (
  <OldHeading
    as="h4"
    fontSize={{ base: "md", md: "xl" }}
    lineHeight={1.4}
    fontWeight="medium"
    {...props}
  />
)

const Width60 = (props: ChildOnlyProp) => <Box w="full" flex={3} {...props} />

const Width40 = (props: ChildOnlyProp) => (
  <Center w="full" flex={2} {...props} />
)

type RunANodeCard = {
  image: typeof ChakraIcon
  title: string
  preview: ReactNode
  body: string[]
  alt: string
}

export const getStaticProps = (async ({ locale }) => {
  const requiredNamespaces = getRequiredNamespacesForPage("/run-a-node")

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

const RunANodePage = () => {
  const { t } = useTranslation("page-run-a-node")
  const heroContent = {
    title: t("page-run-a-node-title"),
    header: <Translation id="page-run-a-node:page-run-a-node-hero-header" />,
    subtitle: t("page-run-a-node-hero-subtitle"),
    image: ethereumInside,
    alt: t("page-run-a-node-hero-alt"),
    buttons: [
      {
        content: t("page-run-a-node-hero-cta-1"),
        toId: "what-is-a-node",
        matomo: {
          eventCategory: "run a node hero buttons",
          eventAction: "click",
          eventName: "learn more",
        },
      },
    ],
  }

  const whyRunANodeCards: RunANodeCard[] = [
    {
      image: PrivacyGlyphIcon,
      title: t("page-run-a-node-privacy-title"),
      preview: t("page-run-a-node-privacy-preview"),
      body: [
        t("page-run-a-node-privacy-1"),
        t("page-run-a-node-privacy-2"),
        t("page-run-a-node-privacy-3"),
      ],
      alt: t("page-run-a-node-glyph-alt-privacy"),
    },
    {
      image: MegaphoneGlyphIcon,
      title: t("page-run-a-node-censorship-resistance-title"),
      preview: t("page-run-a-node-censorship-resistance-preview"),
      body: [
        t("page-run-a-node-censorship-resistance-1"),
        t("page-run-a-node-censorship-resistance-2"),
      ],
      alt: t("page-run-a-node-glyph-alt-censorship-resistance"),
    },
    {
      image: EarthGlyphIcon,
      title: t("page-run-a-node-participate-title"),
      preview: (
        <Translation id="page-run-a-node:page-run-a-node-participate-preview" />
      ),
      body: [
        t("page-run-a-node-participate-1"),
        t("page-run-a-node-participate-2"),
      ],
      alt: t("page-run-a-node-glyph-alt-earth"),
    },
    {
      image: DecentralizationGlyphIcon,
      title: t("page-run-a-node-decentralized-title"),
      preview: t("page-run-a-node-decentralized-preview"),
      body: [
        t("page-run-a-node-decentralized-1"),
        t("page-run-a-node-decentralized-2"),
      ],
      alt: t("page-run-a-node-glyph-alt-decentralization"),
    },
    {
      image: VoteGlyphIcon,
      title: t("page-run-a-node-voice-your-choice-title"),
      preview: t("page-run-a-node-voice-your-choice-preview"),
      body: [
        t("page-run-a-node-voice-your-choice-1"),
        t("page-run-a-node-voice-your-choice-2"),
      ],
      alt: t("page-run-a-node-glyph-alt-vote"),
    },
    {
      image: SovereigntyGlyphIcon,
      title: t("page-run-a-node-sovereignty-title"),
      preview: t("page-run-a-node-sovereignty-preview"),
      body: [
        t("page-run-a-node-sovereignty-1"),
        t("page-run-a-node-sovereignty-2"),
      ],
      alt: t("page-run-a-node-glyph-alt-sovereignty"),
    },
  ]

  return (
    <GappedPage>
      <PageMetadata
        title={t("page-run-a-node-title")}
        description={t("page-run-a-node-meta-description")}
        image="/images/run-a-node/ethereum-inside.png"
      />
      <HeroContainer>
        <Box pb="8">
          <PageHero content={heroContent} isReverse />
        </Box>
      </HeroContainer>

      <Content id="what-is-a-node">
        <TwoColumnContent>
          <Width60>
            <H2>
              <Translation id="page-run-a-node:page-run-a-node-what-title" />
            </H2>
            <H3>{t("page-run-a-node-what-1-subtitle")}</H3>
            <Text>{t("page-run-a-node-what-1-text")}</Text>
            <H3>{t("page-run-a-node-what-2-subtitle")}</H3>
            <Text>{t("page-run-a-node-what-2-text")}</Text>
            <H3>{t("page-run-a-node-what-3-subtitle")}</H3>
            <Text>{t("page-run-a-node-what-3-text")}</Text>
          </Width60>
          <Width40>
            <Image
              src={hackathon}
              alt=""
              sizes="624px"
              style={{ width: "624px", height: "auto" }}
            />
          </Width40>
        </TwoColumnContent>
      </Content>

      <FlexContent>
        <ExpandableInfo
          alignSelf="center"
          width={{ base: "full", md: "90%" }}
          mb={{ base: 0, md: 4 }}
          image={impact}
          title={<Translation id="page-run-a-node:page-run-a-node-who-title" />}
          contentPreview={
            <Translation id="page-run-a-node:page-run-a-node-who-preview" />
          }
          background="runNodeGradient2"
          forceOpen
        >
          <Text>
            <Translation id="page-run-a-node:page-run-a-node-who-copy-1" />
          </Text>
          <Text>{t("page-run-a-node-who-copy-2")}</Text>
          <Text>{t("page-run-a-node-who-copy-3")}</Text>
          <StrongParagraph>
            {t("page-run-a-node-who-copy-bold")}
          </StrongParagraph>
        </ExpandableInfo>
      </FlexContent>

      <Content>
        <H2>
          <Translation id="page-run-a-node:page-run-a-node-why-title" />
        </H2>
        <InfoGrid>
          {whyRunANodeCards.map(({ image, title, preview, body, alt }) => (
            <ExpandableCard
              contentPreview={preview}
              title={title}
              // TODO: make a11y svgs (using <title>)
              // @ts-expect-error alt does not exist as a valid prop
              alt={alt}
              svg={image}
              key={title}
            >
              {body.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </ExpandableCard>
          ))}
        </InfoGrid>
      </Content>

      <Divider />

      <Content id="getting-started">
        <H2>{t("page-run-a-node-getting-started-title")}</H2>
        <GappedContent>
          <SoftwareHighlight
            bg="homeBoxTurquoise"
            flexDirection={{ base: "column-reverse", md: "row" }}
          >
            <ColumnFill>
              <Text>
                {t("page-run-a-node-getting-started-software-section-1")}
              </Text>
              <Text>
                <Text as="code">
                  <Emoji text=":warning:" fontSize="md" me="4" />
                  {t(
                    "page-run-a-node-getting-started-software-section-1-alert"
                  )}
                </Text>
              </Text>
              <InlineLink href="/developers/docs/nodes-and-clients/run-a-node/">
                {t("page-run-a-node-getting-started-software-section-1-link")}
              </InlineLink>
            </ColumnFill>
            <ColumnNarrow>
              <Terminal
                // TODO: make a11y svgs (using <title>)
                // @ts-expect-error alt does not exist as a valid prop
                alt={t("page-run-a-node-glyph-alt-terminal")}
              />
            </ColumnNarrow>
          </SoftwareHighlight>

          <SoftwareHighlight bg="homeBoxOrange">
            <ColumnNarrow>
              <Dappnode
                // TODO: make a11y svgs (using <title>)
                // @ts-expect-error alt does not exist as a valid prop
                alt={t("page-run-a-node-glyph-alt-dappnode")}
              />
            </ColumnNarrow>
            <ColumnFill>
              <Text>
                <Translation id="page-run-a-node:page-run-a-node-getting-started-software-section-2" />
              </Text>
            </ColumnFill>
          </SoftwareHighlight>

          <SoftwareHighlight
            bg="homeBoxPurple"
            flexDirection={{ base: "column-reverse", md: "row" }}
          >
            <ColumnFill>
              <Text>
                {t("page-run-a-node-getting-started-software-section-3a")}
              </Text>
              <Text>
                <Translation id="page-run-a-node:page-run-a-node-getting-started-software-section-3b" />
              </Text>
            </ColumnFill>
            <ColumnNarrow>
              <Dapptap
                // TODO: make a11y svgs (using <title>)
                // @ts-expect-error alt does not exist as a valid prop
                alt={t("page-run-a-node-glyph-alt-phone")}
              />
            </ColumnNarrow>
          </SoftwareHighlight>
        </GappedContent>
      </Content>

      <Content>
        <H2>{t("page-run-a-node-choose-your-adventure-title")}</H2>
        <Text>{t("page-run-a-node-choose-your-adventure-1")}</Text>
        <Text>{t("page-run-a-node-choose-your-adventure-2")}</Text>
        <MarginFlex>
          <FullyLoaded>
            <Box>
              <H3>
                <Emoji text=":shopping_cart:" fontSize="2em" me="4" />
                {t("page-run-a-node-buy-fully-loaded-title")}
              </H3>
              <Text>{t("page-run-a-node-buy-fully-loaded-description")}</Text>
              <ul>
                <li>{t("page-run-a-node-buy-fully-loaded-note-1")}</li>
                <li>{t("page-run-a-node-buy-fully-loaded-note-2")}</li>
                <li>
                  <Text as="code">
                    {t("page-run-a-node-buy-fully-loaded-note-3")}
                  </Text>
                </li>
              </ul>
            </Box>
            <ButtonContainer>
              <ButtonLink href="https://shop.dappnode.io/">
                {t("page-run-a-node-shop-dappnode")}
              </ButtonLink>
              <ButtonLink href="https://ava.do/">
                {t("page-run-a-node-shop-avado")}
              </ButtonLink>
            </ButtonContainer>
          </FullyLoaded>

          <FullyLoaded>
            <Box>
              <H3>
                <Emoji text=":building_construction:" fontSize="2em" me="4" />
                {t("page-run-a-node-build-your-own-title")}
              </H3>
              <Text>{t("page-run-a-node-choose-your-adventure-build-1")}</Text>
              <ul>
                <li>
                  {t("page-run-a-node-choose-your-adventure-build-bullet-1")}
                </li>
                <li>
                  {t("page-run-a-node-choose-your-adventure-build-bullet-2")}
                </li>
                <li>
                  {t("page-run-a-node-choose-your-adventure-build-bullet-3")}
                </li>
              </ul>
            </Box>
            <Button variant="outline" toId="build-your-own">
              {t("page-run-a-node-choose-your-adventure-build-start")}
            </Button>
          </FullyLoaded>
        </MarginFlex>
      </Content>

      <Content id="build-your-own">
        <H2>{t("page-run-a-node-build-your-own-title")}</H2>

        <BuildContainer>
          <SvgTitle>
            <HardwareGlyphIcon
              // TODO: make a11y svgs (using <title>)
              // @ts-expect-error alt does not exist as a valid prop
              alt={t("page-run-a-node-glyph-alt-hardware")}
            />
            <H3>{t("page-run-a-node-build-your-own-hardware-title")}</H3>
          </SvgTitle>

          <FlexContainer>
            <BuildBox>
              <H4>{t("page-run-a-node-build-your-own-minimum-specs")}</H4>
              <ul>
                <li>
                  <Text>{t("page-run-a-node-build-your-own-min-ram")}</Text>
                  <Text>
                    <InlineLink href="#plan-on-staking">
                      {t("page-run-a-node-build-your-own-ram-note-1")}
                    </InlineLink>
                  </Text>
                  <Text>
                    <InlineLink href="#rasp-pi">
                      {t("page-run-a-node-build-your-own-ram-note-2")}
                    </InlineLink>
                  </Text>
                </li>
                <li>
                  <Text>{t("page-run-a-node-build-your-own-min-ssd")}</Text>
                  <Text>
                    <Text as="small">
                      <Text as="em">
                        {t("page-run-a-node-build-your-own-ssd-note")}
                      </Text>
                    </Text>
                  </Text>
                </li>
              </ul>
            </BuildBox>

            <BuildBox>
              <H4>{t("page-run-a-node-build-your-own-recommended")}</H4>
              <ul>
                <li>
                  {t("page-run-a-node-build-your-own-nuc")}
                  <Text>
                    <Text as="small">
                      {t("page-run-a-node-build-your-own-nuc-small")}
                    </Text>
                  </Text>
                </li>
                <li>
                  {t("page-run-a-node-build-your-own-connection")}
                  <Text>
                    <Text as="small">
                      {t("page-run-a-node-build-your-own-connection-small")}
                    </Text>
                  </Text>
                </li>
                <li>
                  {t("page-run-a-node-build-your-own-peripherals")}
                  <Text>
                    <Text as="small">
                      {t("page-run-a-node-build-your-own-peripherals-small")}
                    </Text>
                  </Text>
                </li>
              </ul>
            </BuildBox>
          </FlexContainer>
        </BuildContainer>

        <BuildContainer>
          <SvgTitle>
            <DownloadGlyphIcon
              // TODO: make a11y svgs (using <title>)
              // @ts-expect-error alt does not exist as a valid prop
              alt={t("page-run-a-node-glyph-alt-software")}
            />
            <H3>{t("page-run-a-node-build-your-own-software")}</H3>
          </SvgTitle>

          <FlexContainer>
            <BuildBoxSpace>
              <Box>
                <H4>
                  {t("page-run-a-node-build-your-own-software-option-1-title")}
                </H4>
                <Text>
                  {t(
                    "page-run-a-node-build-your-own-software-option-1-description"
                  )}
                </Text>
              </Box>
              <ButtonContainer>
                <ButtonLink href="https://docs.dappnode.io">
                  {t("page-run-a-node-build-your-own-software-option-1-button")}
                </ButtonLink>
              </ButtonContainer>
            </BuildBoxSpace>

            <BuildBoxSpace>
              <Box>
                <H4>
                  {t("page-run-a-node-build-your-own-software-option-2-title")}
                </H4>
                <Text>
                  {t(
                    "page-run-a-node-build-your-own-software-option-2-description-1"
                  )}
                </Text>
                <Text>
                  {t(
                    "page-run-a-node-build-your-own-software-option-2-description-2"
                  )}
                </Text>
              </Box>
              <ButtonContainer>
                <ButtonLink
                  href="/developers/docs/nodes-and-clients/run-a-node/#spinning-up-node"
                  variant="outline"
                >
                  <Text as="code">
                    {t(
                      "page-run-a-node-build-your-own-software-option-2-button"
                    )}
                  </Text>
                </ButtonLink>
              </ButtonContainer>
            </BuildBoxSpace>
          </FlexContainer>
        </BuildContainer>
      </Content>

      <Content>
        <SplitContent direction={{ base: "column-reverse", md: "row" }}>
          <Column>
            <H2>{t("page-run-a-node-community-title")}</H2>
            <Text>{t("page-run-a-node-community-description-1")}</Text>
            <Text>{t("page-run-a-node-community-description-2")}</Text>
            <ButtonContainer>
              <ButtonLink
                leftIcon={<FaDiscord />}
                href="https://discord.com/invite/dappnode"
              >
                {t("page-run-a-node-community-link-1")}
              </ButtonLink>
              <ButtonLink
                href="/community/online/"
                variant="outline"
                isSecondary
              >
                {t("page-run-a-node-community-link-2")}
              </ButtonLink>
            </ButtonContainer>
          </Column>
          <Column>
            <Image
              src={community}
              alt=""
              sizes="624px"
              style={{ width: "624px", height: "auto" }}
            />
          </Column>
        </SplitContent>
      </Content>

      <Content>
        <H2>{t("page-run-a-node-further-reading-title")}</H2>
        <ul>
          <li>
            <InlineLink href="https://github.com/ethereumbook/ethereumbook/blob/develop/03clients.asciidoc#should-i-run-a-full-node">
              {t("page-run-a-node-further-reading-1-link")}
            </InlineLink>{" "}
            -{" "}
            <Text as="i">{t("page-run-a-node-further-reading-1-author")}</Text>
          </li>
          <li>
            <InlineLink href="https://ethereum-on-arm-documentation.readthedocs.io/en/latest/">
              {t("page-run-a-node-further-reading-2-link")}
            </InlineLink>
          </li>
          <li>
            <InlineLink href="https://vitalik.eth.limo/general/2021/05/23/scaling.html">
              {t("page-run-a-node-further-reading-3-link")}
            </InlineLink>{" "}
            -{" "}
            <Text as="i">{t("page-run-a-node-further-reading-3-author")}</Text>
          </li>
        </ul>
      </Content>

      <Divider />

      <StakingCalloutContainer>
        <Column>
          <Image
            src={leslie}
            alt=""
            sizes="624px"
            style={{ width: "624px", height: "auto" }}
            transform={{
              base: "scaleX(-1) translateY(-3rem)",
              lg: "scaleX(-1) scale(1.15) translateX(2rem)",
            }}
          />
        </Column>
        <Column>
          <H2>{t("page-run-a-node-staking-title")}</H2>
          <Text>{t("page-run-a-node-staking-description")}</Text>
          <ButtonContainer>
            <ButtonLink href="/staking/">
              {t("page-run-a-node-staking-link")}
            </ButtonLink>
          </ButtonContainer>
        </Column>
      </StakingCalloutContainer>
      <Content>
        <H3 id="plan-on-staking" display="flex" alignItems="center">
          <Emoji text=":cut_of_meat:" fontSize="2em" me="4" />
          {t("page-run-a-node-staking-plans-title")}
        </H3>
        <Text>
          <Translation id="page-run-a-node:page-run-a-node-staking-plans-description" />
        </Text>
        <Text>
          {t("page-run-a-node-staking-plans-ethstaker-link-description")} -{" "}
          <InlineLink href="https://youtu.be/C2wwu1IlhDc">
            {t("page-run-a-node-staking-plans-ethstaker-link-label")}
          </InlineLink>
        </Text>
        <H3 id="rasp-pi" display="flex" alignItems="center">
          <Emoji text=":pie:" fontSize="2em" me="4" />
          {t("page-run-a-node-rasp-pi-title")}
        </H3>
        <Text>{t("page-run-a-node-rasp-pi-description")}</Text>
        <ul>
          <li>
            <InlineLink href="https://ethereum-on-arm-documentation.readthedocs.io/en/latest">
              {t("page-run-a-node-rasp-pi-note-2-link")}
            </InlineLink>{" "}
            -{" "}
            <Text as="i">
              {t("page-run-a-node-rasp-pi-note-2-description")}
            </Text>
          </li>
          <li>
            <InlineLink href="/developers/tutorials/run-node-raspberry-pi">
              {t("page-run-a-node-rasp-pi-note-3-link")}
            </InlineLink>{" "}
            -{" "}
            <Text as="i">
              {t("page-run-a-node-rasp-pi-note-3-description")}
            </Text>
          </li>
        </ul>
      </Content>
      <Content>
        <QuizWidget quizKey="run-a-node" />
        <FeedbackCard />
      </Content>
    </GappedPage>
  )
}

export default RunANodePage
