import React from "react"
import {
  Badge,
  Box,
  Flex,
  Text,
  Divider as ChakraDivider,
  Heading,
  Icon,
  chakra,
} from "@chakra-ui/react"
import { graphql, PageProps } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import ButtonLink from "../components/ButtonLink"
import Breadcrumbs from "../components/Breadcrumbs"
import Card from "../components/Card"
import Callout from "../components/Callout"
import Contributors from "../components/Contributors"
import FeedbackCard from "../components/FeedbackCard"
import InfoBanner from "../components/InfoBanner"
import Link from "../components/Link"
import MarkdownTable from "../components/MarkdownTable"
import Logo from "../components/Logo"
import MeetupList from "../components/MeetupList"
import PageMetadata from "../components/PageMetadata"
import RandomAppList from "../components/RandomAppList"
import ExpandableCard from "../components/ExpandableCard"
import TableOfContents from "../components/TableOfContents"
import Translation from "../components/Translation"
import SectionNav from "../components/SectionNav"
import DocLink from "../components/DocLink"
import GhostCard from "../components/GhostCard"
import MatomoOptOut from "../components/MatomoOptOut"
import UpgradeStatus from "../components/UpgradeStatus"
import Emoji from "../components/Emoji"
import UpcomingEventsList from "../components/UpcomingEventsList"
import SocialListItem from "../components/SocialListItem"
import YouTube from "../components/YouTube"
import NetworkUpgradeSummary from "../components/History/NetworkUpgradeSummary"
import TranslationChartImage from "../components/TranslationChartImage"
import PostMergeBanner from "../components/Banners/PostMergeBanner"
import EnergyConsumptionChart from "../components/EnergyConsumptionChart"
import QuizWidget from "../components/Quiz/QuizWidget"
import { Item as ItemTableOfContents } from "../components/TableOfContents/utils"

import { getLocaleTimestamp } from "../utils/time"
import { isLangRightToLeft, TranslationKey } from "../utils/translations"
import { Lang } from "../utils/languages"

import { ChildOnlyProp, Context } from "../types"

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

const HR = () => (
  <ChakraDivider
    mt={8}
    mb={4}
    display="inline-block"
    position="inherit"
    bg="border"
  />
)

const Divider = () => <Box my={16} w="10%" h={1} bgColor="homeDivider" />

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

const Header2 = (props: ChildOnlyProp) => (
  <Heading
    fontSize={{ base: "2xl", md: "2rem" }}
    lineHeight={1.4}
    fontWeight="bold"
    sx={{ position: "inherit !important" }}
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

const Header3 = (props: ChildOnlyProp) => (
  <Heading
    as="h3"
    fontSize={{ base: "xl", md: "2xl" }}
    lineHeight={1.4}
    sx={{ position: "inherit !important" }}
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

const Paragraph = (props: ChildOnlyProp) => (
  <Text fontSize="md" mt={8} mb={4} color="text300" {...props} />
)

const ListItem = (props: ChildOnlyProp) => (
  <chakra.li color="text300" {...props} />
)

const CardContainer = (props: ChildOnlyProp) => (
  <Flex wrap="wrap" mx={-4} {...props} />
)

// Note: you must pass components to MDXProvider in order to render them in markdown files
// https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/#mdxprovider
const components = {
  a: Link,
  h1: Header1,
  h2: Header2,
  h3: Header3,
  h4: Header4,
  p: Paragraph,
  li: ListItem,
  pre: Pre,
  hr: HR,
  table: MarkdownTable,
  MeetupList,
  RandomAppList,
  Link,
  Logo,
  ButtonLink,
  Contributors,
  InfoBanner,
  FeedbackCard,
  Card,
  Divider,
  SectionNav,
  Badge,
  Emoji,
  DocLink,
  ExpandableCard,
  CardContainer,
  GhostCard,
  UpcomingEventsList,
  Icon,
  SocialListItem,
  MatomoOptOut,
  Callout,
  YouTube,
  NetworkUpgradeSummary,
  TranslationChartImage,
  EnergyConsumptionChart,
  QuizWidget,
  UpgradeStatus,
}

const StaticPage = ({
  data: { siteData, pageData: mdx },
  pageContext: { relativePath, slug },
  location,
}: PageProps<Queries.StaticPageQuery, Context>) => {
  const { language } = useI18next()

  if (!siteData || !mdx?.frontmatter || !mdx.parent)
    throw new Error(
      "Static page template query does not return expected values"
    )
  if (!mdx?.frontmatter?.title)
    throw new Error("Required `title` property missing for static template")
  if (!relativePath)
    throw new Error("Required `relativePath` is missing on pageContext")

  const isRightToLeft = isLangRightToLeft(mdx.frontmatter.lang as Lang)

  const showPostMergeBanner = !!mdx.frontmatter.postMergeBannerTranslation
  const postMergeBannerTranslationString = mdx.frontmatter
    .postMergeBannerTranslation as TranslationKey | null

  // FIXME: remove this any, currently not sure how to fix the ts error
  const parent: any = mdx.parent
  const lastUpdatedDate = parent.fields
    ? parent.fields.gitLogLatestDate
    : parent.mtime

  const tocItems = mdx.tableOfContents?.items as Array<ItemTableOfContents>
  const { editContentUrl } = siteData.siteMetadata || {}
  const absoluteEditPath = `${editContentUrl}${relativePath}`

  return (
    <Box w="full">
      {showPostMergeBanner && (
        <PostMergeBanner
          translationString={postMergeBannerTranslationString!}
        />
      )}
      <Flex
        justifyContent="space-between"
        w="full"
        mx="auto"
        mb={16}
        p={8}
        pt={{ base: 8, lg: 16 }}
        dir={isRightToLeft ? "rtl" : "ltr"}
      >
        <PageMetadata
          title={mdx.frontmatter.title}
          description={mdx.frontmatter.description}
        />
        <Box
          as="article"
          maxW="container.md"
          w="full"
          sx={{
            ".featured": {
              pl: 4,
              ml: -4,
              borderLeft: "1px dotted",
              borderLeftColor: "primary.base",
            },

            ".citation": {
              p: {
                color: "text200",
              },
            },
          }}
        >
          <Breadcrumbs slug={slug} />
          <Text
            color="text200"
            dir={isLangRightToLeft(language as Lang) ? "rtl" : "ltr"}
          >
            <Translation id="page-last-updated" />:{" "}
            {getLocaleTimestamp(language as Lang, lastUpdatedDate)}
          </Text>
          <TableOfContents
            position="relative"
            zIndex={2}
            editPath={absoluteEditPath}
            items={tocItems}
            isMobile
            maxDepth={mdx.frontmatter.sidebarDepth!}
            hideEditButton={!!mdx.frontmatter.hideEditButton}
          />
          <MDXProvider components={components}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
          <FeedbackCard isArticle />
        </Box>
        {tocItems && (
          <TableOfContents
            editPath={absoluteEditPath}
            items={tocItems}
            maxDepth={mdx.frontmatter.sidebarDepth!}
            hideEditButton={!!mdx.frontmatter.hideEditButton}
          />
        )}
      </Flex>
    </Box>
  )
}

export const staticPageQuery = graphql`
  query StaticPage($languagesToFetch: [String!]!, $relativePath: String) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: {
          in: [
            "page-about"
            "page-community"
            "learn-quizzes"
            "page-history"
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
    siteData: site {
      siteMetadata {
        editContentUrl
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
        sidebarDepth
        isOutdated
        postMergeBannerTranslation
        hideEditButton
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

export default StaticPage
