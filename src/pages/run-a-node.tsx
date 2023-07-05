// Libraries
import React, { ComponentProps, ReactNode } from "react"
import { graphql, PageProps } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { useTranslation } from "gatsby-plugin-react-i18next"
import {
  Box,
  BoxProps,
  Center,
  CenterProps,
  Flex,
  FlexProps,
  Heading,
  HeadingProps,
  Img,
  Text,
  type Icon as ChakraIcon,
} from "@chakra-ui/react"
import { FaDiscord } from "react-icons/fa"

// Assets
import Dappnode from "../assets/run-a-node/dappnode.svg"
import Dapptap from "../assets/run-a-node/dapptap.svg"
import Terminal from "../assets/run-a-node/terminal.svg"
import {
  DecentralizationGlyphIcon,
  DownloadGlyphIcon,
  EarthGlyphIcon,
  HardwareGlyphIcon,
  MegaphoneGlyphIcon,
  PrivacyGlyphIcon,
  SovereigntyGlyphIcon,
  VoteGlyphIcon,
} from "../components/icons/run-a-node"

// Components
import PageHero from "../components/PageHero"
import PageMetadata from "../components/PageMetadata"
import Translation from "../components/Translation"
import ExpandableCard from "../components/ExpandableCard"
import ExpandableInfo from "../components/ExpandableInfo"
import Emoji from "../components/Emoji"
import Link from "../components/Link"
import ButtonLink from "../components/ButtonLink"
import FeedbackCard from "../components/FeedbackCard"
import Icon from "../components/Icon"
import QuizWidget from "../components/Quiz/QuizWidget"

// Utils
import { scrollIntoView } from "../utils/scrollIntoView"
import Button from "../components/Button"
import { InfoGrid } from "../templates/staking"
import { Width40, Width60 } from "../pages-conditional/what-is-ethereum"

// Utils
import { getImage } from "../utils/image"

import type { ChildOnlyProp } from "../types"

const Divider = () => <Box my={16} w="10%" h={1} bg="homeDivider" />

const GappedPage = (props: ChildOnlyProp) => (
  <Flex
    direction="column"
    align="center"
    w="full"
    my={0}
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
    py={4}
    {...props}
  />
)

const HeroContainer = (props: ChildOnlyProp) => (
  <Box w="full" bg="runNodeGradient" {...props} />
)

const Content = (props: BoxProps) => <Box w="full" py={4} px={8} {...props} />

const TwoColumnContent = (props: ChildOnlyProp) => (
  <Flex
    direction={{ base: "column", lg: "row" }}
    justify="space-between"
    align={{ base: "flex-start", lg: "center" }}
    gap={8}
    mb={8}
    {...props}
  />
)

const SplitContent = (props: FlexProps) => (
  <Flex
    direction={{ base: "column", md: "row" }}
    align="center"
    w="full"
    gap={8}
    {...props}
  />
)

const Column = (props: ChildOnlyProp) => <Box flex="1" {...props} />

const SoftwareHighlight = (props: CenterProps) => (
  <Center
    w="100%"
    gap={8}
    py={8}
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
  <Box flex="1" lineHeight={2} sx={{ ul: { listStyle: "none" } }} {...props} />
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
  <Flex direction="column" py={4} px={8} w="full" {...props} />
)

const FlexContainer = (props: FlexProps) => (
  <Flex direction={{ base: "column", lg: "row" }} gap={8} {...props} />
)

const MarginFlex = (props: ChildOnlyProp) => (
  <FlexContainer my={12} {...props} />
)

const Container = (props: FlexProps) => (
  <Flex
    bg="grayBackground"
    border="1px solid"
    borderColor="#d1d1d1"
    borderRadius="5px"
    color="text"
    py={0}
    px={8}
    {...props}
  />
)

const BuildBox = (props: ComponentProps<typeof Container>) => (
  <Container
    direction="column"
    bg="preBackground"
    flex="1"
    p={8}
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
    flex="1"
    px={8}
    py={8}
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
  <Flex gap={4} align="center" {...props} />
)

const ButtonContainer = (props: ChildOnlyProp) => (
  <Flex
    gap={4}
    mt="auto"
    direction={{ base: "column", lg: "row" }}
    {...props}
  />
)

const BuildContainer = (props: ChildOnlyProp) => (
  <Container
    direction="column"
    py={8}
    px={{ base: 0, md: 8 }}
    borderRadius={0}
    border={0}
    bg="none"
    {...props}
  />
)

const StakingCalloutContainer = (props: ChildOnlyProp) => (
  <SplitContent
    w="full"
    p={8}
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
  <Text fontSize="150%" fontWeight={600} {...props} />
)

const H2 = (props: HeadingProps) => (
  <Heading fontSize={{ base: "2xl", md: "2rem" }} lineHeight={1.4} {...props} />
)

const H3 = (props: HeadingProps) => (
  <Heading
    as="h3"
    fontSize={{ base: "xl", md: "2xl" }}
    lineHeight={1.4}
    {...props}
  />
)

const H4 = (props: ChildOnlyProp) => (
  <Heading
    as="h4"
    fontSize={{ base: "md", md: "xl" }}
    lineHeight={1.4}
    fontWeight="medium"
    {...props}
  />
)

interface RunANodeCard {
  image: typeof ChakraIcon
  title: string
  preview: ReactNode
  body: Array<string>
  alt: string
}

const RunANodePage = ({ data }: PageProps<Queries.RunANodePageQuery>) => {
  const { t } = useTranslation()
  const heroContent = {
    title: <Translation id="page-run-a-node-title" />,
    header: <Translation id="page-run-a-node-hero-header" />,
    subtitle: <Translation id="page-run-a-node-hero-subtitle" />,
    image: getImage(data.ethereumInside)!,
    alt: t("page-run-a-node-hero-alt"),
    buttons: [
      {
        content: <Translation id="page-run-a-node-hero-cta-1" />,
        toId: "what-is-a-node",
        matomo: {
          eventCategory: "run a node hero buttons",
          eventAction: "click",
          eventName: "learn more",
        },
      },
      {
        content: <Translation id="page-run-a-node-hero-cta-2" />,
        toId: "getting-started",
        variant: "outline",
        matomo: {
          eventCategory: "run a node hero buttons",
          eventAction: "click",
          eventName: "lets dive in",
        },
      },
    ],
  }

  const whyRunANodeCards: Array<RunANodeCard> = [
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
      preview: <Translation id="page-run-a-node-participate-preview" />,
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
      />
      <HeroContainer>
        <Box pb={8}>
          <PageHero content={heroContent} isReverse />
        </Box>
      </HeroContainer>

      <Content id="what-is-a-node">
        <TwoColumnContent>
          <Width60>
            <H2>
              <Translation id="page-run-a-node-what-title" />
            </H2>
            <H3>
              <Translation id="page-run-a-node-what-1-subtitle" />
            </H3>
            <Text>
              <Translation id="page-run-a-node-what-1-text" />
            </Text>
            <H3>
              <Translation id="page-run-a-node-what-2-subtitle" />
            </H3>
            <Text>
              <Translation id="page-run-a-node-what-2-text" />
            </Text>
            <H3>
              <Translation id="page-run-a-node-what-3-subtitle" />
            </H3>
            <Text>
              <Translation id="page-run-a-node-what-3-text" />
            </Text>
          </Width60>
          <Width40>
            <GatsbyImage image={getImage(data.hackathon)!} alt="" />
          </Width40>
        </TwoColumnContent>
      </Content>

      <FlexContent>
        <ExpandableInfo
          alignSelf="center"
          width={{ base: "full", md: "90%" }}
          mb={{ base: 0, md: 4 }}
          image={getImage(data.impact)!}
          title={<Translation id="page-run-a-node-who-title" />}
          contentPreview={<Translation id="page-run-a-node-who-preview" />}
          background="runNodeGradient2"
          forceOpen
        >
          <Text>
            <Translation id="page-run-a-node-who-copy-1" />
          </Text>
          <Text>
            <Translation id="page-run-a-node-who-copy-2" />
          </Text>
          <Text>
            <Translation id="page-run-a-node-who-copy-3" />
          </Text>
          <StrongParagraph>
            <Translation id="page-run-a-node-who-copy-bold" />
          </StrongParagraph>
        </ExpandableInfo>
      </FlexContent>

      <Content>
        <H2>
          <Translation id="page-run-a-node-why-title" />
        </H2>
        <InfoGrid>
          {whyRunANodeCards.map(({ image, title, preview, body, alt }, idx) => {
            return (
              <ExpandableCard
                contentPreview={preview}
                title={title}
                // TODO: make a11y svgs (using <title>)
                // @ts-ignore
                alt={alt}
                svg={image}
                key={idx}
              >
                {body.map((item, idx) => (
                  <p key={idx}>{item}</p>
                ))}
              </ExpandableCard>
            )
          })}
        </InfoGrid>
      </Content>

      <Divider />

      <Content id="getting-started">
        <H2>
          <Translation id="page-run-a-node-getting-started-title" />
        </H2>
        <GappedContent>
          <SoftwareHighlight
            bg="homeBoxTurquoise"
            flexDirection={{ base: "column-reverse", md: "row" }}
          >
            <ColumnFill>
              <Text>
                <Translation id="page-run-a-node-getting-started-software-section-1" />
              </Text>
              <Text>
                <Text as="code">
                  <Emoji text=":warning:" fontSize="md" mr={4} />
                  <Translation id="page-run-a-node-getting-started-software-section-1-alert" />
                </Text>
              </Text>
              <Link to="/developers/docs/nodes-and-clients/run-a-node/">
                <Translation id="page-run-a-node-getting-started-software-section-1-link" />
              </Link>
            </ColumnFill>
            <ColumnNarrow>
              <Terminal
                // TODO: make a11y svgs (using <title>)
                // @ts-ignore
                alt={t("page-run-a-node-glyph-alt-terminal")}
              />
            </ColumnNarrow>
          </SoftwareHighlight>

          <SoftwareHighlight bg="homeBoxOrange">
            <ColumnNarrow>
              <Dappnode
                // TODO: make a11y svgs (using <title>)
                // @ts-ignore
                alt={t("page-run-a-node-glyph-alt-dappnode")}
              />
            </ColumnNarrow>
            <ColumnFill>
              <Text>
                <Translation id="page-run-a-node-getting-started-software-section-2" />
              </Text>
            </ColumnFill>
          </SoftwareHighlight>

          <SoftwareHighlight
            bg="homeBoxPurple"
            flexDirection={{ base: "column-reverse", md: "row" }}
          >
            <ColumnFill>
              <Text>
                <Translation id="page-run-a-node-getting-started-software-section-3a" />
              </Text>
              <Text>
                <Translation id="page-run-a-node-getting-started-software-section-3b" />
              </Text>
            </ColumnFill>
            <ColumnNarrow>
              <Dapptap
                // TODO: make a11y svgs (using <title>)
                // @ts-ignore
                alt={t("page-run-a-node-glyph-alt-phone")}
              />
            </ColumnNarrow>
          </SoftwareHighlight>
        </GappedContent>
      </Content>

      <Content>
        <H2>
          <Translation id="page-run-a-node-choose-your-adventure-title" />
        </H2>
        <Text>
          <Translation id="page-run-a-node-choose-your-adventure-1" />
        </Text>
        <Text>
          <Translation id="page-run-a-node-choose-your-adventure-2" />
        </Text>
        <MarginFlex>
          <FullyLoaded>
            <Box>
              <H3>
                <Emoji text=":shopping_cart:" fontSize="2em" mr={4} />
                <Translation id="page-run-a-node-buy-fully-loaded-title" />
              </H3>
              <Text>
                <Translation id="page-run-a-node-buy-fully-loaded-description" />
              </Text>
              <ul>
                <li>
                  <Translation id="page-run-a-node-buy-fully-loaded-note-1" />
                </li>
                <li>
                  <Translation id="page-run-a-node-buy-fully-loaded-note-2" />
                </li>
                <li>
                  <Text as="code">
                    <Translation id="page-run-a-node-buy-fully-loaded-note-3" />
                  </Text>
                </li>
              </ul>
            </Box>
            <ButtonContainer>
              <ButtonLink to="https://shop.dappnode.io/">
                <Translation id="page-run-a-node-shop-dappnode" />
              </ButtonLink>
              <ButtonLink to="https://ava.do/">
                <Translation id="page-run-a-node-shop-avado" />
              </ButtonLink>
            </ButtonContainer>
          </FullyLoaded>

          <FullyLoaded>
            <Box>
              <H3>
                <Emoji text=":building_construction:" fontSize="2em" mr={4} />
                <Translation id="page-run-a-node-build-your-own-title" />
              </H3>
              <Text>
                <Translation id="page-run-a-node-choose-your-adventure-build-1" />
              </Text>
              <ul>
                <li>
                  <Translation id="page-run-a-node-choose-your-adventure-build-bullet-1" />
                </li>
                <li>
                  <Translation id="page-run-a-node-choose-your-adventure-build-bullet-2" />
                </li>
                <li>
                  <Translation id="page-run-a-node-choose-your-adventure-build-bullet-3" />
                </li>
              </ul>
            </Box>
            <Button variant="outline" toId="build-your-own">
              <Translation id="page-run-a-node-choose-your-adventure-build-start" />
            </Button>
          </FullyLoaded>
        </MarginFlex>
      </Content>

      <Content id="build-your-own">
        <H2>
          <Translation id="page-run-a-node-build-your-own-title" />
        </H2>

        <BuildContainer>
          <SvgTitle>
            <HardwareGlyphIcon
              // TODO: make a11y svgs (using <title>)
              // @ts-ignore
              alt={t("page-run-a-node-glyph-alt-hardware")}
            />
            <H3>
              <Translation id="page-run-a-node-build-your-own-hardware-title" />
            </H3>
          </SvgTitle>

          <FlexContainer>
            <BuildBox>
              <H4>
                <Translation id="page-run-a-node-build-your-own-minimum-specs" />
              </H4>
              <ul>
                <li>
                  <Text>
                    <Translation id="page-run-a-node-build-your-own-min-ram" />
                  </Text>
                  <Text>
                    <Link href="#plan-on-staking">
                      <Translation id="page-run-a-node-build-your-own-ram-note-1" />
                    </Link>
                  </Text>
                  <Text>
                    <Link href="#rasp-pi">
                      <Translation id="page-run-a-node-build-your-own-ram-note-2" />
                    </Link>
                  </Text>
                </li>
                <li>
                  <Text>
                    <Translation id="page-run-a-node-build-your-own-min-ssd" />
                  </Text>
                  <Text>
                    <Text as="small">
                      <Text as="em">
                        <Translation id="page-run-a-node-build-your-own-ssd-note" />
                      </Text>
                    </Text>
                  </Text>
                </li>
              </ul>
            </BuildBox>

            <BuildBox>
              <H4>
                <Translation id="page-run-a-node-build-your-own-recommended" />
              </H4>
              <ul>
                <li>
                  <Translation id="page-run-a-node-build-your-own-nuc" />
                  <Text>
                    <Text as="small">
                      <Translation id="page-run-a-node-build-your-own-nuc-small" />
                    </Text>
                  </Text>
                </li>
                <li>
                  <Translation id="page-run-a-node-build-your-own-connection" />
                  <Text>
                    <Text as="small">
                      <Translation id="page-run-a-node-build-your-own-connection-small" />
                    </Text>
                  </Text>
                </li>
                <li>
                  <Translation id="page-run-a-node-build-your-own-peripherals" />
                  <Text>
                    <Text as="small">
                      <Translation id="page-run-a-node-build-your-own-peripherals-small" />
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
              // @ts-ignore
              alt={t("page-run-a-node-glyph-alt-software")}
            />
            <H3>
              <Translation id="page-run-a-node-build-your-own-software" />
            </H3>
          </SvgTitle>

          <FlexContainer>
            <BuildBoxSpace>
              <Box>
                <H4>
                  <Translation id="page-run-a-node-build-your-own-software-option-1-title" />
                </H4>
                <Text>
                  <Translation id="page-run-a-node-build-your-own-software-option-1-description" />
                </Text>
              </Box>
              <ButtonContainer>
                <ButtonLink to="https://docs.dappnode.io">
                  <Translation id="page-run-a-node-build-your-own-software-option-1-button" />
                </ButtonLink>
              </ButtonContainer>
            </BuildBoxSpace>

            <BuildBoxSpace>
              <Box>
                <H4>
                  <Translation id="page-run-a-node-build-your-own-software-option-2-title" />
                </H4>
                <Text>
                  <Translation id="page-run-a-node-build-your-own-software-option-2-description-1" />
                </Text>
                <Text>
                  <Translation id="page-run-a-node-build-your-own-software-option-2-description-2" />
                </Text>
              </Box>
              <ButtonContainer>
                <ButtonLink
                  to="/developers/docs/nodes-and-clients/run-a-node/#spinning-up-node"
                  variant="outline"
                >
                  <Text as="code">
                    <Translation id="page-run-a-node-build-your-own-software-option-2-button" />
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
            <H2>
              <Translation id="page-run-a-node-community-title" />
            </H2>
            <Text>
              <Translation id="page-run-a-node-community-description-1" />
            </Text>
            <Text>
              <Translation id="page-run-a-node-community-description-2" />
            </Text>
            <ButtonContainer>
              <ButtonLink
                leftIcon={<FaDiscord />}
                to="https://discord.gg/c28an8dA5k"
              >
                <Translation id="page-run-a-node-community-link-1" />
              </ButtonLink>
              <ButtonLink to="/community/online/" variant="outline">
                <Translation id="page-run-a-node-community-link-2" />
              </ButtonLink>
            </ButtonContainer>
          </Column>
          <Column>
            <GatsbyImage image={getImage(data.community)!} alt="" />
          </Column>
        </SplitContent>
      </Content>

      <Content>
        <H2>
          <Translation id="page-run-a-node-further-reading-title" />
        </H2>
        <ul>
          <li>
            <Link to="https://github.com/ethereumbook/ethereumbook/blob/develop/03clients.asciidoc#should-i-run-a-full-node">
              <Translation id="page-run-a-node-further-reading-1-link" />
            </Link>{" "}
            -{" "}
            <Text as="i">
              <Translation id="page-run-a-node-further-reading-1-author" />
            </Text>
          </li>
          <li>
            <Link to="https://ethereum-on-arm-documentation.readthedocs.io/en/latest/">
              <Translation id="page-run-a-node-further-reading-2-link" />
            </Link>
          </li>
          <li>
            <Link to="https://vitalik.ca/general/2021/05/23/scaling.html">
              <Translation id="page-run-a-node-further-reading-3-link" />
            </Link>{" "}
            -{" "}
            <Text as="i">
              <Translation id="page-run-a-node-further-reading-3-author" />
            </Text>
          </li>
        </ul>
      </Content>

      <Divider />

      <StakingCalloutContainer>
        <Column>
          <Img
            as={GatsbyImage}
            image={getImage(data.leslie)!}
            alt=""
            transform={{
              base: "scaleX(-1) translateY(-3rem)",
              lg: "scaleX(-1) scale(1.15) translateX(2rem)",
            }}
          />
        </Column>
        <Column>
          <H2>
            <Translation id="page-run-a-node-staking-title" />
          </H2>
          <Text>
            <Translation id="page-run-a-node-staking-description" />
          </Text>
          <ButtonContainer>
            <ButtonLink to="/staking/">
              <Translation id="page-run-a-node-staking-link" />
            </ButtonLink>
          </ButtonContainer>
        </Column>
      </StakingCalloutContainer>
      <Content>
        <H3 id="plan-on-staking">
          <Emoji text=":cut_of_meat:" fontSize="2em" mr={4} />
          <Translation id="page-run-a-node-staking-plans-title" />
        </H3>
        <Text>
          <Translation id="page-run-a-node-staking-plans-description" />
        </Text>
        <Text>
          <Translation id="page-run-a-node-staking-plans-ethstaker-link-description" />{" "}
          -{" "}
          <Link to="https://youtu.be/C2wwu1IlhDc">
            <Translation id="page-run-a-node-staking-plans-ethstaker-link-label" />
          </Link>
        </Text>
        <H3 id="rasp-pi">
          <Emoji text=":pie:" fontSize="2em" mr={4} />
          <Translation id="page-run-a-node-rasp-pi-title" />
        </H3>
        <Text>
          <Translation id="page-run-a-node-rasp-pi-description" />
        </Text>
        <ul>
          <li>
            <Link to="https://docs.dappnode.io/user/quick-start/Core/installation#arm">
              <Translation id="page-run-a-node-rasp-pi-note-1-link" />
            </Link>{" "}
            -{" "}
            <Text as="i">
              <Translation id="page-run-a-node-rasp-pi-note-1-description" />
            </Text>
          </li>
          <li>
            <Link to="https://ethereum-on-arm-documentation.readthedocs.io/en/latest">
              <Translation id="page-run-a-node-rasp-pi-note-2-link" />
            </Link>{" "}
            -{" "}
            <Text as="i">
              <Translation id="page-run-a-node-rasp-pi-note-2-description" />
            </Text>
          </li>
          <li>
            <Link to="/developers/tutorials/run-node-raspberry-pi">
              <Translation id="page-run-a-node-rasp-pi-note-3-link" />
            </Link>{" "}
            -{" "}
            <Text as="i">
              <Translation id="page-run-a-node-rasp-pi-note-3-description" />
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

export const query = graphql`
  query RunANodePage($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["page-run-a-node", "learn-quizzes", "common"] }
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
    ethereumInside: file(
      relativePath: { eq: "run-a-node/ethereum-inside.png" }
    ) {
      childImageSharp {
        gatsbyImageData(
          width: 624
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    hackathon: file(relativePath: { eq: "hackathon_transparent.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 624
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    impact: file(relativePath: { eq: "impact_transparent.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 300
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    community: file(relativePath: { eq: "enterprise-eth.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 624
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    leslie: file(relativePath: { eq: "upgrades/upgrade_rhino.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 624
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
  }
`
