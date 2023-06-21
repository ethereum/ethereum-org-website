import React, { ComponentPropsWithRef } from "react"
import { graphql, PageProps } from "gatsby"
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { GatsbyImage } from "gatsby-plugin-image"
import {
  Badge,
  Box,
  BoxProps,
  calc,
  chakra,
  Divider as ChakraDivider,
  Flex,
  FlexProps,
  Heading,
  HeadingProps,
  List,
  ListItem,
  Show,
  Text,
  TextProps,
  useToken,
  Icon,
} from "@chakra-ui/react"
import { MdExpandMore } from "react-icons/md"

import ButtonLink from "../components/ButtonLink"
import ButtonDropdown, {
  List as ButtonDropdownList,
} from "../components/ButtonDropdown"
import Breadcrumbs from "../components/Breadcrumbs"
import Card from "../components/Card"
import Contributors from "../components/Contributors"
import InfoBanner from "../components/InfoBanner"
import UpgradeStatus from "../components/UpgradeStatus"
import Link from "../components/Link"
import MarkdownTable from "../components/MarkdownTable"
import BeaconChainActions from "../components/BeaconChainActions"
import ShardChainsList from "../components/ShardChainsList"
import MergeArticleList from "../components/MergeArticleList"
import Logo from "../components/Logo"
import MeetupList from "../components/MeetupList"
import PageMetadata from "../components/PageMetadata"
import RandomAppList from "../components/RandomAppList"
import UpgradeTableOfContents from "../components/UpgradeTableOfContents"
import { type Item as ItemTableOfContents } from "../components/TableOfContents"
import Translation from "../components/Translation"
import SectionNav from "../components/SectionNav"
import ExpandableCard from "../components/ExpandableCard"
import Emoji from "../components/Emoji"
import YouTube from "../components/YouTube"
import MergeInfographic from "../components/MergeInfographic"
import FeedbackCard from "../components/FeedbackCard"
import QuizWidget from "../components/Quiz/QuizWidget"

import { getLocaleTimestamp } from "../utils/time"
import { isLangRightToLeft } from "../utils/translations"
import { getSummaryPoints } from "../utils/getSummaryPoints"
import { Lang } from "../utils/languages"
import { getImage } from "../utils/image"
import type { ChildOnlyProp, Context } from "../types"

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

const MobileButton = (props: ChildOnlyProp) => {
  const borderColor = useToken("colors", "border")

  return (
    <Box
      bg="background.base"
      boxShadow={`0 -1px 0 ${borderColor}`}
      position="sticky"
      bottom={0}
      zIndex={99}
      p={8}
      w="full"
      {...props}
    />
  )
}

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

const H1 = (props: ChildOnlyProp) => (
  <Heading
    as="h1"
    fontSize={{ base: "2.5rem", lg: "5xl" }}
    fontWeight="bold"
    lineHeight={1.4}
    textAlign={{ base: "left", lg: "right" }}
    mt={0}
    {...props}
  />
)

const MDXH1 = (props: HeadingProps) => (
  <Heading
    as="h1"
    fontWeight="bold"
    lineHeight={1.4}
    fontSize="2.5rem"
    {...props}
  />
)

const H2 = (props: HeadingProps) => (
  <Heading
    fontSize="2rem"
    fontWeight="bold"
    lineHeight={1.4}
    mt={16}
    {...props}
  />
)

const H3 = (props: HeadingProps) => (
  <Heading
    as="h3"
    fontWeight="bold"
    lineHeight={1.4}
    fontSize="2xl"
    {...props}
  />
)

const H4 = (props: HeadingProps) => (
  <Heading
    as="h4"
    fontSize="xl"
    lineHeight={1.4}
    fontWeight="semibold"
    {...props}
  />
)

const P = (props: TextProps) => (
  <Text mt={8} mb={4} color="text300" {...props} />
)

// Note: you must pass components to MDXProvider in order to render them in markdown files
// https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/#mdxprovider

const components = {
  a: Link,
  h1: MDXH1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  pre: Pre,
  table: MarkdownTable,
  MeetupList,
  RandomAppList,
  Logo,
  ButtonLink,
  Contributors,
  InfoBanner,
  Card,
  Divider,
  SectionNav,
  Badge,
  Emoji,
  UpgradeStatus,
  BeaconChainActions,
  ShardChainsList,
  MergeArticleList,
  YouTube,
  ExpandableCard,
  MergeInfographic,
  QuizWidget,
}

const Title = (props: ChildOnlyProp) => (
  <Heading
    as="h1"
    fontSize="2.5rem"
    fontWeight="bold"
    lineHeight={1.4}
    mt={0}
    {...props}
  />
)

const SummaryPoint = (props: ChildOnlyProp) => (
  <ListItem color="text300" mb={0} {...props} />
)

type ButtonDropdownProps = Pick<
  ComponentPropsWithRef<typeof ButtonDropdown>,
  "list"
>

const StyledButtonDropdown = (props: FlexProps & ButtonDropdownProps) => (
  <Flex
    as={ButtonDropdown}
    justify="flex-end"
    align={{ sm: "flex-end" }}
    textAlign="center"
    mb={8}
    {...props}
  />
)

const MobileButtonDropdown = (props: ButtonDropdownProps) => (
  <StyledButtonDropdown mb={0} {...props} />
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

const Image = chakra(GatsbyImage, {
  baseStyle: {
    flex: "1 1 100%",
    maxW: "816px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    alignSelf: "flex-end",
    ml: 8,
    right: 0,
    bottom: 0,
    w: "full",
    h: "full",
    overflow: "initial",
  },
})

const MoreContent = (props: ChildOnlyProp & { to: string }) => (
  <Flex
    as={Link}
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

const UpgradePage = ({
  data: { mdx },
  pageContext: { slug },
}: PageProps<Queries.UpgradePageQuery, Context>) => {
  const { t } = useTranslation()
  const { language } = useI18next()

  if (!mdx?.frontmatter || !mdx.parent)
    throw new Error(
      "Upgrade page template query does not return expected values"
    )
  if (!mdx?.frontmatter?.title)
    throw new Error("Required `title` property missing for upgrade template")

  const isRightToLeft = isLangRightToLeft(mdx.frontmatter.lang as Lang)
  const tocItems = mdx.tableOfContents?.items as ItemTableOfContents[]

  // FIXME: remove this any, currently not sure how to fix the ts error
  const parent: any = mdx.parent
  // TODO some `gitLogLatestDate` are `null` - why?
  const lastUpdatedDate = parent.fields
    ? parent.fields.gitLogLatestDate
    : parent.mtime

  const summaryPoints = getSummaryPoints(mdx.frontmatter)

  const dropdownLinks: ButtonDropdownList = {
    text: t("page-upgrades-upgrades-guide"),
    ariaLabel: t("page-upgrades-upgrades-aria-label"),
    items: [
      {
        text: t("page-upgrades-upgrades-beacon-chain"),
        to: "/roadmap/beacon-chain/",
        matomo: {
          eventCategory: "upgrade menu",
          eventAction: "click",
          eventName: "/roadmap/beacon-chain/",
        },
      },
      {
        text: t("page-upgrades-upgrades-docking"),
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
          <Breadcrumbs slug={slug} startDepth={1} mt={2} />
          <Title>{mdx.frontmatter.title}</Title>
          <Box>
            <List listStyleType="disc">
              {summaryPoints.map((point, idx) => (
                <SummaryPoint key={idx}>{point}</SummaryPoint>
              ))}
            </List>
          </Box>
          <LastUpdated>
            <Translation id="page-last-updated" />:{" "}
            {getLocaleTimestamp(language as Lang, lastUpdatedDate)}
          </LastUpdated>
        </TitleCard>
        <Image image={getImage(mdx.frontmatter.image)!} alt="" />
      </HeroContainer>
      <Show above={lgBreakpoint}>
        <MoreContent to="#content">
          <Icon as={MdExpandMore} fontSize="2xl" color="secondary" />
        </MoreContent>
      </Show>
      <Page dir={isRightToLeft ? "rtl" : "ltr"}>
        <PageMetadata
          title={mdx.frontmatter.title}
          description={mdx.frontmatter.description}
        />
        <Show above={lgBreakpoint}>
          <InfoColumn>
            <StyledButtonDropdown list={dropdownLinks} />
            <Show above={lgBreakpoint}>
              <H1>{mdx.frontmatter.title}</H1>
            </Show>

            {tocItems && (
              <UpgradeTableOfContents
                items={tocItems}
                maxDepth={mdx.frontmatter.sidebarDepth!}
              />
            )}
          </InfoColumn>
        </Show>
        <ContentContainer id="content">
          {/* <DesktopBreadcrumbs slug={mdx.fields.slug} startDepth={1} /> */}
          <MDXProvider components={components}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
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

export const upgradePageQuery = graphql`
  query UpgradePage($languagesToFetch: [String!]!, $relativePath: String) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: {
          in: [
            "page-upgrades"
            "page-upgrades-index"
            "learn-quizzes"
            "common"
          ]
        }
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
    mdx(fields: { relativePath: { eq: $relativePath } }) {
      fields {
        slug
      }
      frontmatter {
        title
        description
        lang
        sidebarDepth
        summaryPoint1
        summaryPoint2
        summaryPoint3
        summaryPoint4
        image {
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: BLURRED
              quality: 100
            )
          }
        }
        isOutdated
      }
      body
      tableOfContents
      parent {
        ... on File {
          mtime
          fields {
            gitLogLatestDate
          }
        }
      }
    }
  }
`

export default UpgradePage
