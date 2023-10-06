import {
  Badge,
  Box,
  chakra,
  Flex,
  Show,
  Text,
  type BoxProps,
  UnorderedList,
  useToken,
  Grid,
  SimpleGrid,
} from "@chakra-ui/react"


import {
  List as ButtonDropdownList
} from "@/components/ButtonDropdown"
import { Image } from "@/components/Image"
import { mdxTableComponents } from "@/components/Table"
import { ButtonLink } from "@/components/Buttons"
import Breadcrumbs from "@/components/Breadcrumbs"
import Card from "@/components/Card"
import DocLink from "@/components/DocLink"
import Emoji from "@/components/Emoji"
import ExpandableCard from "@/components/ExpandableCard"
import FeedbackCard from "@/components/FeedbackCard"
import GlossaryTooltip from "@/components/Glossary/GlossaryTooltip"
import InfoBanner from "@/components/InfoBanner"
import MdLink from "@/components/MdLink"
import OldHeading from "@/components/OldHeading"
import QuizWidget from "@/components/Quiz/QuizWidget"
import RandomAppList from "@/components/RandomAppList"
import SectionNav from "@/components/SectionNav"
import TableOfContents from "@/components/TableOfContents"
import UpgradeStatus from "@/components/UpgradeStatus"
import UpgradeTableOfContents from "@/components/UpgradeTableOfContents"
import YouTube from "@/components/YouTube"
// TODO: Import once intl implemented
// import PageMetadata from "@/components/PageMetadata"

import {
  Page,
  InfoColumn,
  ContentContainer,
  InfoTitle,
  MobileButton,
  StyledButtonDropdown,
  MobileButtonDropdown,
} from "@/layouts/UseCases"

import { isLangRightToLeft } from "@/lib/utils/translations"
import type { ChildOnlyProp, Lang, TranslationKey } from "@/lib/types"
import type { MdPageContent, StakingFrontmatter } from "@/lib/interfaces"
import Callout from "@/components/Callout"
import ProductDisclaimer from "@/components/ProductDisclaimer"
import StakingComparison from "@/components/Staking/StakingComparison"
import StakingConsiderations from "@/components/Staking/StakingConsiderations"
import StakingGuides from "@/components/Staking/StakingGuides"
import StakingHowSoloWorks from "@/components/Staking/StakingHowSoloWorks"
import StakingLaunchpadWidget from "@/components/Staking/StakingLaunchpadWidget"
import StakingProductsCardGrid from "@/components/Staking/StakingProductsCardGrid"
import WithdrawalCredentials from "@/components/Staking/WithdrawalCredentials"
import WithdrawalsTabComparison from "@/components/Staking/WithdrawalsTabComparison"
import StakingCommunityCallout from "@/components/Staking/StakingCommunityCallout"



const Header1 = (props: ChildOnlyProp) => (
  <OldHeading
    as="h1"
    fontSize={{ base: "2.5rem", md: "5xl" }}
    lineHeight={1.4}
    fontWeight="bold"
    _before={{
      content: `""`,
      display: "block",
      h: "140px",
      mt: "-140px",
      visibility: "hidden",
    }}
    sx={{
      a: {
        display: "none",
      },
    }}
    {...props}
  />
)

const Heading2 = (props: ChildOnlyProp) => (
  <OldHeading
    fontSize="2rem"
    lineHeight={1.4}
    fontWeight="bold"
    mt={16}
    sx={{
      a: {
        position: "relative",
        display: "initial",
        opacity: 0,
        ml: "-1.5em",
        pr: 2,
        fontSize: "md",
        verticalAlign: "middle",

        "&:hover": {
          fill: "primary.base",
          opacity: 1,
        },
      },
    }}
    _hover={{
      a: {
        fill: "primary.base",
        opacity: 1,
      },
    }}
    {...props}
  />
)

const Heading3 = (props: ChildOnlyProp) => (
  <OldHeading
    as="h3"
    fontSize="2xl"
    lineHeight={1.4}
    fontWeight="bold"
    sx={{
      a: {
        position: "relative",
        display: "initial",
        opacity: 0,
        ml: "-1.5em",
        pr: 2,
        fontSize: "md",
        verticalAlign: "middle",

        "&:hover": {
          fill: "primary.base",
          opacity: 1,
        },
      },
    }}
    _hover={{
      a: {
        fill: "primary.base",
        opacity: 1,
      },
    }}
    {...props}
  />
)

const Header4 = (props: ChildOnlyProp) => (
  <OldHeading
    as="h4"
    fontSize={{ base: "md", md: "xl" }}
    lineHeight={1.4}
    fontWeight="semibold"
    sx={{ position: "unset !important" }}
    _before={{
      content: `""`,
      display: "block",
      h: "120px",
      mt: "-120px",
      visibility: "hidden",
    }}
    {...props}
  />
)

const Paragraph = (props: ChildOnlyProp) => (
  <Text fontSize="md" mt={8} mb={4} color="text300" {...props} />
)

const Pre = (props: ChildOnlyProp) => (
  <Text
    as="pre"
    maxW="full"
    overflowX="scroll"
    bgColor="preBackground"
    borderRadius="base"
    p={4}
    border="1px solid"
    borderColor="preBorder"
    whiteSpace="pre-wrap"
    {...props}
  />
)

const Divider = (props: ChildOnlyProp) => (
  <Box my={16} w="10%" h={1} bgColor="homeDivider" {...props} />
)

export const InfoGrid = (props: ChildOnlyProp) => (
  <Grid
    templateColumns="repeat(auto-fill, minmax(min(100%, 340px), 1fr))"
    gap={8}
    sx={{
      "& > div": {
        h: "fit-content",
        m: 0,
        "&:hover": {
          transition: "0.1s",
          transform: "scale(1.01)",
          svg: {
            transition: "0.1s",
            transform: "scale(1.1)",
          },
        },
      },
    }}
    {...props}
  />
)

const CardGrid = (props: ChildOnlyProp) => (
  <SimpleGrid
    columns={{ base: 1, md: 3 }}
    spacing={8}
    m={{ base: "auto", md: 0 }}
    sx={{
      h3: {
        mt: 0,
      },
    }}
    {...props}
  />
)

const Title = (props: ChildOnlyProp) => (
  <OldHeading
    as="h1"
    fontSize="2.5rem"
    lineHeight={1.4}
    fontWeight="bold"
    mt={4}
    {...props}
  />
)

const SummaryPoint = (props: ChildOnlyProp) => (
  <chakra.li color="text300" {...props} />
)

const HeroContainer = (props: ChildOnlyProp) => {
  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      align="center"
      py={8}
      px={{ base: 0, lg: 8 }}
      maxH={{ base: "full", lg: "500px" }}
      minH="500px"
      bg="layer2Gradient"
      {...props}
    />
  )
}

const TableContainer = (props: BoxProps) => (
  <Box
    w="fit-content"
    mx={["auto", null, null, 0]}
    sx={{
      table: {
        borderCollapse: "separate",
        borderSpacing: "1rem 0",
      },
      th: {
        whiteSpace: "break-spaces !important",
        textAlign: "center",
      },
    }}
    {...props}
  />
)

// Note: you must pass components to MDXProvider in order to render them in markdown files
// https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/#mdxprovider
export const stakingComponents = {
  a: MdLink,
  div: Box,
  h1: Header1,
  h2: Heading2,
  h3: Heading3,
  h4: Header4,
  p: Paragraph,
  pre: Pre,
  Badge,
  ButtonLink,
  Callout,
  Card,
  CardGrid,
  Divider,
  DocLink,
  Emoji,
  ExpandableCard,
  GlossaryTooltip,
  InfoBanner,
  InfoGrid,
  ProductDisclaimer,
  QuizWidget,
  RandomAppList,
  SectionNav,
  StakingComparison,
  StakingConsiderations,
  StakingGuides,
  StakingHowSoloWorks,
  StakingLaunchpadWidget,
  StakingProductsCardGrid,
  TableContainer,
  UpgradeStatus,
  WithdrawalCredentials,
  WithdrawalsTabComparison,
  YouTube,
  ...mdxTableComponents,
  // Contributors,
  // Logo,
  // MeetupList,
}

interface IProps extends MdPageContent, ChildOnlyProp {
  frontmatter: StakingFrontmatter
}
export const StakingLayout: React.FC<IProps> = ({
  children,
  frontmatter,
  slug,
  tocItems,
}) => {
  // TODO: Replace with direct token implementation after UI migration is completed
  const lgBp = useToken("breakpoints", "lg")

  const isRightToLeft = isLangRightToLeft(frontmatter.lang as Lang)
  const { summaryPoints } = frontmatter

  const dropdownLinks: ButtonDropdownList = {
    text: "Staking Options",
    ariaLabel: "Staking options dropdown menu",
    items: [
      {
        text: "Staking home" as TranslationKey,
        to: "/staking/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked staking home",
        },
      },
      {
        text: "Solo staking" as TranslationKey,
        to: "/staking/solo/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked solo staking",
        },
      },
      {
        text: "Staking as a service" as TranslationKey,
        to: "/staking/saas/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked staking as a service",
        },
      },
      {
        text: "Pooled staking" as TranslationKey,
        to: "/staking/pools/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked pooled staking",
        },
      },
      {
        text: "About withdrawals" as TranslationKey,
        to: "/staking/withdrawals/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked about withdrawals",
        },
      },
    ],
  }

  return (
    <Box position="relative" width="full">
      <HeroContainer>
        <Flex direction="column" justify="flex-start" w="full" p={8}>
          <Breadcrumbs slug={slug} mb="8" />
          <Title>{frontmatter.title}</Title>
          <UnorderedList>
            {(summaryPoints || []).map((point, idx) => (
              <SummaryPoint key={idx}>{point}</SummaryPoint>
            ))}
          </UnorderedList>
          <TableOfContents
            position="relative"
            zIndex={2}
            items={tocItems}
            maxDepth={frontmatter.sidebarDepth!}
            isMobile
          />
        </Flex>
        <Image
          flex="1 1 100%"
          bgRepeat="no-repeat"
          right={0}
          bottom={0}
          maxW={{ base: "min(400px, 98%)", lg: "400px" }}
          width={400}
          height={340}
          maxH={{ base: "340px", lg: "none" }}
          boxSize={{ base: "full", lg: "auto" }}
          overflow={{ base: "initial", lg: "visible" }}
          alignSelf={{ base: "center", lg: "auto" }}
          src={frontmatter.image}
          alt={frontmatter.alt || ""}
          objectFit="contain"
        />
      </HeroContainer>
      <Page dir={isRightToLeft ? "rtl" : "ltr"}>
        {/* <PageMetadata
          title={frontmatter.title}
          description={frontmatter.description}
        /> */}
        {/* // TODO: Switch to `above="lg"` after completion of Chakra Migration */}
        <Show above={lgBp}>
          <InfoColumn>
            <StyledButtonDropdown list={dropdownLinks} />
            <InfoTitle>{frontmatter.title}</InfoTitle>

            {tocItems && (
              <UpgradeTableOfContents
                items={tocItems}
                maxDepth={frontmatter.sidebarDepth!}
              />
            )}
          </InfoColumn>
        </Show>
        <ContentContainer id="content">
          {children}
          <StakingCommunityCallout my={16} />
          <FeedbackCard />
        </ContentContainer>
        {/* // TODO: Switch to `above="lg"` after completion of Chakra Migration */}
        <Show below={lgBp}>
          <MobileButton>
            <MobileButtonDropdown list={dropdownLinks} />
          </MobileButton>
        </Show>
      </Page>
    </Box>
  )
}
