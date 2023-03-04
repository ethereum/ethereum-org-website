import React from "react"
import {
  Badge,
  Box,
  Flex,
  Text,
  useTheme,
  Divider as ChakraDivider,
  Heading,
  ListItem as ChakraListItem,
  Icon,
} from "@chakra-ui/react"
import { graphql, PageProps } from "gatsby"
import { useIntl } from "react-intl"
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
import TranslationChartImage from "../components/TranslationChartImage"
import PostMergeBanner from "../components/Banners/PostMergeBanner"
import EnergyConsumptionChart from "../components/EnergyConsumptionChart"
import QuizWidget from "../components/Quiz/QuizWidget"

import { getLocaleTimestamp } from "../utils/time"
import { isLangRightToLeft, TranslationKey } from "../utils/translations"
import { Lang } from "../utils/languages"
import { Item as ItemTableOfContents } from "../components/TableOfContents/utils"
import { ChildOnlyProp, Context } from "../types"

// Apply styles for classes within markdown here

const Pre = ({ children }: ChildOnlyProp) => {
  return (
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
    >
      {children}
    </Text>
  )
}

const HR = () => {
  return (
    <ChakraDivider
      mt={8}
      mb={4}
      display="inline-block"
      position="inherit"
      bg="border"
    />
  )
}

const Divider = () => {
  return <Box my={16} w="10%" h={1} bgColor="homeDivider" />
}

const Header1 = ({ children }: ChildOnlyProp) => {
  return (
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
    >
      {children}
    </Heading>
  )
}

const Header2 = ({ children }: ChildOnlyProp) => {
  return (
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
    >
      {children}
    </Heading>
  )
}

const Header3 = ({ children }: ChildOnlyProp) => {
  return (
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
    >
      {children}
    </Heading>
  )
}

const Header4 = ({ children }: ChildOnlyProp) => {
  return (
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
    >
      {children}
    </Heading>
  )
}

const Paragraph = ({ children }: ChildOnlyProp) => {
  return (
    <Text fontSize="md" mt={8} mb={4} color="text300">
      {children}
    </Text>
  )
}

const ListItem = ({ children }: ChildOnlyProp) => {
  return <ChakraListItem color="text300">{children}</ChakraListItem>
}

const CardContainer = ({ children }: ChildOnlyProp) => {
  return (
    <Flex wrap="wrap" mx={-4}>
      {children}
    </Flex>
  )
}

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
  TranslationChartImage,
  EnergyConsumptionChart,
  QuizWidget,
  UpgradeStatus,
}

const StaticPage = ({
  data: { siteData, pageData: mdx },
  pageContext: { relativePath },
}: PageProps<Queries.StaticPageQuery, Context>) => {
  const theme = useTheme()
  const intl = useIntl()

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

  const slug = mdx.fields?.slug || ""

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
        pt={{ lg: 16 }}
        dir={isRightToLeft ? "rtl" : "ltr"}
      >
        <PageMetadata
          title={mdx.frontmatter.title}
          description={mdx.frontmatter.description}
        />
        <Box
          as="article"
          maxW={theme.breakpoints.md}
          w="full"
          sx={{
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
        >
          <Breadcrumbs slug={slug} />
          <Text
            color="text200"
            dir={isLangRightToLeft(intl.locale as Lang) ? "rtl" : "ltr"}
          >
            <Translation id="page-last-updated" />:{" "}
            {getLocaleTimestamp(intl.locale as Lang, lastUpdatedDate)}
          </Text>
          <TableOfContents
            position="relative"
            zIndex={2}
            editPath={absoluteEditPath}
            items={tocItems}
            isMobile={true}
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
  query StaticPage($relativePath: String) {
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
