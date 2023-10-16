import {
  Badge,
  Box,
  calc,
  chakra,
  Divider as ChakraDivider,
  Flex,
  Icon,
  List,
  ListItem,
  Show,
  Text,
  type BoxProps,
  type FlexProps,
  type HeadingProps,
  type TextProps,
  useToken,
} from "@chakra-ui/react"
import { MdExpandMore } from "react-icons/md"

import { BaseLink } from "@/components/Link"
import { ButtonLink } from "@/components/Buttons"
import { Image } from "@/components/Image"
import { mdxTableComponents } from "@/components/Table"
import BeaconChainActions from "@/components/BeaconChainActions"
import Breadcrumbs from "@/components/Breadcrumbs"
import Card from "@/components/Card"
import Emoji from "@/components/Emoji"
import ExpandableCard from "@/components/ExpandableCard"
import FeedbackCard from "@/components/FeedbackCard"
import GlossaryTooltip from "@/components/Glossary/GlossaryTooltip"
import InfoBanner from "@/components/InfoBanner"
import MdLink from "@/components/MdLink"
import MergeArticleList from "@/components/MergeArticleList"
import MergeInfographic from "@/components/MergeInfographic"
import OldHeading from "@/components/OldHeading"
import QuizWidget from "@/components/Quiz/QuizWidget"
import RandomAppList from "@/components/RandomAppList"
import ShardChainsList from "@/components/ShardChainsList"
import UpgradeStatus from "@/components/UpgradeStatus"
import UpgradeTableOfContents from "@/components/UpgradeTableOfContents"
import YouTube from "@/components/YouTube"
// import Contributors from "@/components/Contributors"
// import Logo from "@/components/Logo"
// import MeetupList from "@/components/MeetupList"
// import Translation from "@/components/Translation"
// TODO: Re-enable PageMetadata after i18n is implemented:
// import PageMetadata from "@/components/PageMetadata"
import {
  MobileButton,
  MobileButtonDropdown,
  StyledButtonDropdown,
} from "@/layouts/UseCases"

import { getLocaleTimestamp } from "@/lib/utils/time"
import { isLangRightToLeft } from "@/lib/utils/translations"
import { getSummaryPoints } from "@/lib/utils/getSummaryPoints"
import type { ChildOnlyProp, Lang /* Context */ } from "@/lib/types"
import type { MdPageContent, UpgradeFrontmatter } from "@/lib/interfaces"
import type { List as ButtonDropdownList } from "@/components/ButtonDropdown"

const Page = (props: ChildOnlyProp & Pick<FlexProps, "dir">) => (
  <Flex
    direction={{ base: "column", lg: "row" }}
    justify="space-between"
    mx="auto"
    mb={16}
    pt={{ lg: 16 }}
    w="full"
    {...props}
  />
)

const Divider = () => (
  <ChakraDivider
    my={16}
    w="10%"
    borderBottomWidth="0.25rem"
    borderColor="homeDivider"
  />
)

const InfoColumn = (props: ChildOnlyProp) => (
  <Flex
    direction="column"
    flex="0 1 400px"
    ml={8}
    mr={16}
    position="sticky"
    top="6.25rem"
    h={calc("100vh").subtract("80px").toString()}
    {...props}
  />
)

// Apply styles for classes within markdown here
const ContentContainer = (props: BoxProps) => (
  <Box
    as="article"
    flex="1 1 1024px"
    position="relative"
    p={8}
    pt={0}
    {...props}
    sx={{
      ".featured": {
        pl: 4,
        ml: -4,
        borderLeft: "1px dotted",
        borderColor: "primary.base",
      },
      ".citation p": {
        color: "text200",
      },
    }}
  />
)

const LastUpdated = (props: ChildOnlyProp) => (
  <Text
    color="text200"
    fontStyle="italic"
    pt={4}
    mb={0}
    borderTop="1px"
    borderColor="border"
    {...props}
  />
)

const Pre = chakra("pre", {
  baseStyle: {
    maxW: "full",
    overflowX: "scroll",
    backgroundColor: "preBackground",
    borderRadius: 1,
    p: 4,
    border: "1px",
    borderColor: "preBorder",
    whiteSpace: "pre-wrap",
  },
})

const Heading1 = (props: HeadingProps) => (
  <OldHeading
    as="h1"
    fontWeight="bold"
    lineHeight={1.4}
    fontSize="2.5rem"
    {...props}
  />
)

const Heading2 = (props: HeadingProps) => (
  <OldHeading
    fontSize="2rem"
    fontWeight="bold"
    lineHeight={1.4}
    mt={16}
    {...props}
  />
)

const Heading3 = (props: HeadingProps) => (
  <OldHeading
    as="h3"
    fontWeight="bold"
    lineHeight={1.4}
    fontSize="2xl"
    {...props}
  />
)

const Heading4 = (props: HeadingProps) => (
  <OldHeading
    as="h4"
    fontSize="xl"
    lineHeight={1.4}
    fontWeight="semibold"
    {...props}
  />
)

const Paragraph = (props: TextProps) => (
  <Text mt={8} mb={4} color="text300" {...props} />
)

const Title = (props: ChildOnlyProp) => (
  <OldHeading
    as="h1"
    fontSize="2.5rem"
    fontWeight="bold"
    lineHeight={1.4}
    mt={0}
    {...props}
  />
)

const InfoTitle = (props: HeadingProps) => (
  <Title
    fontSize={{ base: "2.5rem", lg: "5xl" }}
    textAlign={{ base: "left", lg: "right" }}
    {...props}
  />
)

const SummaryPoint = (props: ChildOnlyProp) => (
  <ListItem color="text300" mb={0} {...props} />
)

const Container = (props: ChildOnlyProp) => (
  <Box position="relative" {...props} />
)

const HeroContainer = (props: ChildOnlyProp) => (
  <Flex
    justify="flex-end"
    direction={{ base: "column-reverse", lg: "row" }}
    bg="cardGradient"
    boxShadow="inset 0px -1px 0px rgba(0, 0, 0, 0.1)"
    minH="608px"
    maxH={{ base: "full", lg: "608px" }}
    w="full"
    {...props}
  />
)

const MoreContent = (props: ChildOnlyProp & { to: string }) => (
  <Flex
    as={BaseLink}
    bg="ednBackground"
    justify="center"
    p={4}
    w="full"
    _hover={{
      bg: "background.base",
    }}
    {...props}
  />
)

const TitleCard = (props: ChildOnlyProp) => {
  const cardBoxShadow = useToken("colors", "cardBoxShadow")

  return (
    <Flex
      direction="column"
      justify="flex-start"
      position={{ base: "relative", lg: "absolute" }}
      bg={{ base: "ednBackground", lg: "background.base" }}
      border="1px"
      borderColor="border"
      borderRadius="sm"
      boxShadow={{ lg: cardBoxShadow }}
      maxW={{ base: "full", lg: "640px" }}
      p={8}
      top={{ lg: 24 }}
      left={{ lg: 24 }}
      zIndex={10}
      {...props}
    />
  )
}

// Note: you must pass components to MDXProvider in order to render them in markdown files
// https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/#mdxprovider
export const upgradeComponents = {
  a: MdLink,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  p: Paragraph,
  pre: Pre,
  Badge,
  BeaconChainActions,
  ButtonLink,
  Card,
  Divider,
  Emoji,
  ExpandableCard,
  GlossaryTooltip,
  InfoBanner,
  MergeArticleList,
  MergeInfographic,
  QuizWidget,
  RandomAppList,
  ShardChainsList,
  UpgradeStatus,
  YouTube,
  ...mdxTableComponents,
  // Contributors,
  // Logo,
  // MeetupList,
}

interface IProps extends ChildOnlyProp, MdPageContent {
  frontmatter: UpgradeFrontmatter
}
export const UpgradeLayout: React.FC<IProps> = ({
  children,
  frontmatter,
  slug,
  tocItems,
  lastUpdatedDate
}) => {
  // TODO: Re-enabled after i18n is implemented
  // const { t } = useTranslation()
  // const { language } = useI18next()
  const language = "en"

  const isRightToLeft = isLangRightToLeft(frontmatter.lang as Lang)

  const summaryPoints = getSummaryPoints(frontmatter)

  const dropdownLinks: ButtonDropdownList = {
    text: "Guide to Ethereum upgrades", // t("page-upgrades-upgrades-guide"),
    ariaLabel: "Ethereum upgrades menu", // t("page-upgrades-upgrades-aria-label"),
    items: [
      {
        text: "The Beacon Chain", // t("page-upgrades-upgrades-beacon-chain"),
        to: "/roadmap/beacon-chain/",
        matomo: {
          eventCategory: "upgrade menu",
          eventAction: "click",
          eventName: "/roadmap/beacon-chain/",
        },
      },
      {
        text: "The Merge", // t("page-upgrades-upgrades-docking"),
        to: "/roadmap/merge/",
        matomo: {
          eventCategory: "upgrade menu",
          eventAction: "click",
          eventName: "/roadmap/merge/",
        },
      },
    ],
  }

  const lgBreakpoint = useToken("breakpoints", "lg")

  return (
    <Container>
      <HeroContainer>
        <TitleCard>
          <Breadcrumbs slug={slug} startDepth={1} mt={2} mb="8" />
          <Title>{frontmatter.title}</Title>
          <Box>
            <List listStyleType="disc">
              {summaryPoints.map((point, idx) => (
                <SummaryPoint key={idx}>{point}</SummaryPoint>
              ))}
            </List>
          </Box>
          <LastUpdated>
            {/* TODO: Re-enable after i18n implemented */}
            {/* <Translation id="page-last-updated" />:{" "} */}
            Page last updated:{" "}
            {getLocaleTimestamp(language as Lang, lastUpdatedDate!)}
          </LastUpdated>
        </TitleCard>
        {frontmatter.image && (
          <Image
            flex="1 1 100%"
            maxW="min(100%, 816px)"
            style={{ objectFit: "cover" }}
            alignSelf="center"
            right={0}
            bottom={0}
            width={600}
            height={600}
            overflow="initial"
            src={frontmatter.image}
            alt=""
          />
        )}
      </HeroContainer>
      <Show above={lgBreakpoint}>
        <MoreContent to="#content">
          <Icon as={MdExpandMore} fontSize="2xl" color="secondary" />
        </MoreContent>
      </Show>
      <Page dir={isRightToLeft ? "rtl" : "ltr"}>
        {/* <PageMetadata
          title={frontmatter.title}
          description={frontmatter.description}
        /> */}
        <Show above={lgBreakpoint}>
          <InfoColumn>
            <StyledButtonDropdown list={dropdownLinks} />
            <Show above={lgBreakpoint}>
              <InfoTitle>{frontmatter.title}</InfoTitle>
            </Show>

            {tocItems && (
              <UpgradeTableOfContents
                items={tocItems}
                maxDepth={frontmatter.sidebarDepth || 2}
              />
            )}
          </InfoColumn>
        </Show>
        <ContentContainer id="content">
          {children}
          <FeedbackCard />
        </ContentContainer>
        <Show below={lgBreakpoint}>
          <MobileButton>
            <MobileButtonDropdown list={dropdownLinks} />
          </MobileButton>
        </Show>
      </Page>
    </Container>
  )
}
