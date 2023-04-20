import React from "react"
import { graphql, PageProps } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { GatsbyImage } from "gatsby-plugin-image"
import { MDXProvider } from "@mdx-js/react"
import {
  Badge,
  Box,
  BoxProps,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  useTheme,
  chakra,
  calc,
  Grid,
  Image,
  UnorderedList,
} from "@chakra-ui/react"

import ButtonLink from "../components/ButtonLink"
import ButtonDropdown, {
  List as ButtonDropdownList,
} from "../components/ButtonDropdown"
import Card from "../components/Card"
import ExpandableCard from "../components/ExpandableCard"
import DocLink from "../components/DocLink"
import Contributors from "../components/Contributors"
import SharedInfoBanner, {
  IProps as ISharedInfoBannerProps,
} from "../components/InfoBanner"
import UpgradeStatus from "../components/UpgradeStatus"
import Link from "../components/Link"
import MarkdownTable from "../components/MarkdownTable"
import Logo from "../components/Logo"
import MeetupList from "../components/MeetupList"
import PageMetadata from "../components/PageMetadata"
import RandomAppList from "../components/RandomAppList"
import UpgradeTableOfContents from "../components/UpgradeTableOfContents"
import TableOfContents, {
  type Item as ItemTableOfContents,
} from "../components/TableOfContents"
import FeedbackCard from "../components/FeedbackCard"
import SectionNav from "../components/SectionNav"
import Emoji from "../components/Emoji"
import YouTube from "../components/YouTube"
import Breadcrumbs from "../components/Breadcrumbs"
import StakingLaunchpadWidget from "../components/Staking/StakingLaunchpadWidget"
import StakingProductsCardGrid from "../components/Staking/StakingProductsCardGrid"
import StakingComparison from "../components/Staking/StakingComparison"
import StakingHowSoloWorks from "../components/Staking/StakingHowSoloWorks"
import StakingConsiderations from "../components/Staking/StakingConsiderations"
import StakingCommunityCallout from "../components/Staking/StakingCommunityCallout"
import StakingGuides from "../components/Staking/StakingGuides"
import WithdrawalCredentials from "../components/Staking/WithdrawalCredentials"
import WithdrawalsTabComparison from "../components/Staking/WithdrawalsTabComparison"
import Callout from "../components/Callout"

import { isLangRightToLeft, TranslationKey } from "../utils/translations"
import { Lang } from "../utils/languages"
import { getImage } from "../utils/image"

import { ChildOnlyProp, Context } from "../types"

// Apply styles for classes within markdown here
const Divider = (props: ChildOnlyProp) => (
  <Box my={16} w="10%" h={1} bgColor="homeDivider" {...props} />
)

const Paragraph = (props: ChildOnlyProp) => (
  <Text fontSize="md" mt={8} mb={4} color="text300" {...props} />
)

const Header1 = (props: ChildOnlyProp) => (
  <Heading
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

const Header4 = (props: ChildOnlyProp) => (
  <Heading
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

const InfoGrid = (props: ChildOnlyProp) => (
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

const InfoTitle = (props: ChildOnlyProp) => (
  <Heading
    fontSize="5xl"
    lineHeight={1.4}
    fontWeight="bold"
    textAlign="right"
    mt={0}
    hideBelow="lg"
    {...props}
  />
)

const H2 = (props: ChildOnlyProp) => (
  <Heading
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
          fill: "primary",
          opacity: 1,
        },
      },
    }}
    _hover={{
      a: {
        fill: "primary",
        opacity: 1,
      },
    }}
    {...props}
  />
)

const H3 = (props: ChildOnlyProp) => (
  <Heading
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
          fill: "primary",
          opacity: 1,
        },
      },
    }}
    _hover={{
      a: {
        fill: "primary",
        opacity: 1,
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
  <Heading
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

const Container = (props: ChildOnlyProp) => (
  <Box
    position="relative"
    sx={{
      "*": {
        scrollMarginTop: 1,
      },
    }}
    {...props}
  />
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

const InfoBanner = (props: ISharedInfoBannerProps) => (
  <SharedInfoBanner my={8} {...props} />
)

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
const components = {
  a: Link,
  h1: Header1,
  h2: H2,
  h3: H3,
  h4: Header4,
  p: Paragraph,
  pre: Pre,
  table: MarkdownTable,
  div: Box,
  Badge,
  ButtonLink,
  Callout,
  Card,
  CardGrid,
  Contributors,
  Divider,
  DocLink,
  Emoji,
  ExpandableCard,
  InfoBanner,
  InfoGrid,
  Logo,
  MeetupList,
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
}

const StakingPage = ({
  data: { pageData: mdx },
  location,
}: PageProps<Queries.StakingPageQuery, Context>) => {
  if (!mdx?.frontmatter)
    throw new Error(
      "Staking page template query does not return expected values"
    )
  if (!mdx?.frontmatter?.title)
    throw new Error("Required `title` property missing for staking template")

  const isRightToLeft = isLangRightToLeft(mdx.frontmatter.lang as Lang)
  const tocItems = mdx.tableOfContents?.items as ItemTableOfContents[]
  const { summaryPoints } = mdx.frontmatter
  const theme = useTheme()

  const dropdownLinks: ButtonDropdownList = {
    text: "Staking Options",
    ariaLabel: "Staking options dropdown menu",
    items: [
      {
        text: "Staking home",
        to: "/staking/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked staking home",
        },
      },
      {
        text: "Solo staking",
        to: "/staking/solo/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked solo staking",
        },
      },
      {
        text: "Staking as a service",
        to: "/staking/saas/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked staking as a service",
        },
      },
      {
        text: "Pooled staking",
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
    <Container>
      <HeroContainer>
        <Flex direction="column" justify="flex-start" w="full" p={8}>
          <Breadcrumbs slug={location.pathname} />
          <Title>{mdx.frontmatter.title}</Title>
          <UnorderedList>
            {(summaryPoints || []).map((point, idx) => (
              <SummaryPoint key={idx}>{point}</SummaryPoint>
            ))}
          </UnorderedList>
          <TableOfContents
            position="relative"
            zIndex={2}
            items={tocItems}
            maxDepth={mdx.frontmatter.sidebarDepth!}
            isMobile
          />
        </Flex>
        <Image
          as={GatsbyImage}
          flex="1 1 100%"
          bgRepeat="no-repeat"
          right={0}
          bottom={0}
          maxW={{ base: "min(400px, 98%)", lg: "400px" }}
          maxH={{ base: "340px", lg: "none" }}
          boxSize={{ base: "full", lg: "auto" }}
          overflow={{ base: "initial", lg: "visible" }}
          alignSelf={{ base: "center", lg: "auto" }}
          image={getImage(mdx.frontmatter.image)!}
          alt={mdx.frontmatter.alt || ""}
          objectFit="contain"
        />
      </HeroContainer>
      <Flex
        direction={{ base: "column", lg: "row" }}
        justify="space-between"
        w="full"
        mx="auto"
        mb={16}
        pt={{ lg: 16 }}
        dir={isRightToLeft ? "rtl" : "ltr"}
      >
        <PageMetadata
          title={mdx.frontmatter.title}
          description={mdx.frontmatter.description}
        />
        <Flex
          as="aside"
          direction="column"
          position="sticky"
          top="6.25rem" // account for navbar
          h={calc.subtract("100vh", "80px")}
          flex="0 1 330px"
          mx={8}
          hideBelow="lg"
        >
          <Flex
            as={ButtonDropdown}
            mb={8}
            justify="flex-end"
            alignSelf={{ sm: "flex-end" }}
            textAlign="center"
            list={dropdownLinks}
          />
          <InfoTitle>{mdx.frontmatter.title}</InfoTitle>

          {tocItems && (
            <UpgradeTableOfContents
              items={tocItems}
              maxDepth={mdx.frontmatter.sidebarDepth!}
            />
          )}
        </Flex>
        <Box
          as="article"
          flex={`1 1 ${theme.breakpoints.lg}`}
          position="relative"
          px={8}
          pb={8}
          sx={{
            "h2:first-of-type": {
              mt: { lg: 0 },
            },
            ".featured": {
              pl: 4,
              ml: -4,
              borderLeft: "1px dotted",
              borderLeftColor: "primary",
            },
            ".citation": {
              p: {
                color: "text200",
              },
            },
          }}
          id="content"
        >
          <MDXProvider components={components}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
          <StakingCommunityCallout />
          <FeedbackCard />
        </Box>
        <Box
          bg="background"
          boxShadow={`0 -1px 0px ${theme.colors.border}`}
          w="full"
          bottom={0}
          position="sticky"
          p={8}
          zIndex={99}
          hideFrom="lg"
        >
          <Flex
            as={ButtonDropdown}
            justify="flex-end"
            alignSelf={{ sm: "flex-end" }}
            textAlign="center"
            hideFrom="lg"
            list={dropdownLinks}
          />
        </Box>
      </Flex>
    </Container>
  )
}

export const stakingPageQuery = graphql`
  query StakingPage($languagesToFetch: [String!]!, $relativePath: String) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["page-staking", "common"] }
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
    pageData: mdx(fields: { relativePath: { eq: $relativePath } }) {
      fields {
        slug
      }
      frontmatter {
        title
        description
        lang
        emoji
        sidebarDepth
        summaryPoints
        alt
        image {
          childImageSharp {
            gatsbyImageData(
              width: 500
              layout: CONSTRAINED
              placeholder: BLURRED
              quality: 100
            )
          }
        }
      }
      body
      tableOfContents
    }
  }
`

export default StakingPage
