import React from "react"
import { graphql, PageProps } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import {
  Badge,
  chakra,
  Divider,
  Flex,
  Heading,
  HeadingProps,
  Text,
  TextProps,
  useToken,
  Kbd,
  Box,
} from "@chakra-ui/react"

import ButtonLink from "../components/ButtonLink"
import Card from "../components/Card"
import Codeblock from "../components/Codeblock"
import TutorialMetadata from "../components/TutorialMetadata"
import FileContributors from "../components/FileContributors"
import InfoBanner from "../components/InfoBanner"
import EnvWarningBanner from "../components/EnvWarningBanner"
import Link from "../components/Link"
import MarkdownTable from "../components/MarkdownTable"
import PageMetadata from "../components/PageMetadata"
import TableOfContents, {
  Item as ItemTableOfContents,
} from "../components/TableOfContents"
import SectionNav from "../components/SectionNav"
import CallToContribute from "../components/CallToContribute"
import Emoji from "../components/Emoji"
import YouTube from "../components/YouTube"
import PostMergeBanner from "../components/Banners/PostMergeBanner"
import FeedbackCard from "../components/FeedbackCard"

import { isLangRightToLeft, TranslationKey } from "../utils/translations"
import { Lang } from "../utils/languages"
import { Context } from "../types"

// Apply styles for classes within markdown here
const ContentContainer = (props) => {
  const boxShadow = useToken("colors", "tableBoxShadow")
  const borderColor = useToken("colors", "primary.base")

  return (
    <Box
      as="article"
      maxW="1000px"
      minW={0}
      background="background.base"
      boxShadow={{ base: "none", lg: boxShadow }}
      m={{ base: "2.5rem 0rem", lg: "2rem 2rem 6rem" }}
      p={{ base: "3rem 2rem", lg: 16 }}
      borderRadius="4px"
      {...props}
      sx={{
        ".featured": {
          pl: "1rem",
          ml: "-1rem",
          borderLeft: `1px dotted ${borderColor}`,
        },
        ".citation": {
          p: { color: "text200" },
        },
      }}
    />
  )
}

const H1 = (props: HeadingProps) => {
  const monospaceFont = useToken("fonts", "monospace")
  return (
    <Heading
      as="h1"
      fontWeight="bold"
      fontFamily={monospaceFont}
      textTransform="uppercase"
      fontSize={{ base: "1.75rem", lg: "2.5rem" }}
      lineHeight="1.4"
      _before={{
        content: '""',
        display: "block",
        h: "140px",
        mt: "-140px",
        visibility: "hidden",
      }}
      sx={{
        a: { display: "none" },
      }}
      {...props}
    />
  )
}

const H2 = (props: HeadingProps) => {
  const monospaceFont = useToken("fonts", "monospace")

  return (
    <Heading
      as="h2"
      fontFamily={monospaceFont}
      textTransform="uppercase"
      fontWeight="bold"
      fontSize={{ base: "2xl", md: "2rem" }}
      sx={{ position: "inherit !important" }}
      lineHeight="1.4"
      _before={{
        content: '""',
        display: "block",
        h: "120px",
        mt: "-120px",
        visibility: "hidden",
      }}
      {...props}
    />
  )
}

const H3 = (props: HeadingProps) => {
  return (
    <Heading
      as="h3"
      fontWeight={{ base: "semibold" }}
      fontSize={{ base: "1rem", md: "1.5rem" }}
      lineHeight="1.4"
      sx={{ position: "inherit !important" }}
      _before={{
        content: '""',
        display: "block",
        h: "120px",
        mt: "-120px",
        visibility: "hidden",
      }}
      {...props}
    />
  )
}

const H4 = (props: HeadingProps) => {
  return (
    <Heading
      as="h4"
      fontWeight={{ base: "semibold" }}
      fontSize={{ base: "1rem", md: "1.25rem" }}
      lineHeight="1.4"
      sx={{ position: "unset !important" }}
      _before={{
        content: '""',
        display: "block",
        h: "120px",
        mt: "-120px",
        visibility: "hidden",
      }}
      {...props}
    />
  )
}

const StyledDivider = (props) => (
  <Divider
    my={16}
    w="10%"
    h="1"
    opacity="1"
    backgroundColor="homeDivider"
    {...props}
  />
)

const Paragraph = (props: TextProps) => (
  <Text as="p" mt={8} mb={4} mx={0} color="text300" fontSize="md" {...props} />
)

const ListItem = (props) => {
  return <chakra.li color="text300" {...props} />
}

const KBD = (props) => {
  const borderColor = useToken("colors", "primary.base")

  return (
    <Kbd
      verticalAlign="middle"
      p="0.15rem 0.45rem"
      borderRadius="2px"
      border={`1px solid ${borderColor}`}
      {...props}
    />
  )
}

// Note: you must pass components to MDXProvider in order to render them in markdown files
// https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/#mdxprovider
const components = {
  a: Link,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: Paragraph,
  kbd: KBD,
  li: ListItem,
  pre: Codeblock,
  table: MarkdownTable,
  ButtonLink,
  InfoBanner,
  EnvWarningBanner,
  Card,
  StyledDivider,
  SectionNav,
  Badge,
  CallToContribute,
  Emoji,
  YouTube,
}

const TutorialPage = ({
  data: { siteData, pageData: mdx },
  pageContext: { relativePath },
}: PageProps<Queries.TutorialPageQuery, Context>) => {
  if (!siteData || !mdx?.frontmatter)
    throw new Error(
      "Tutorial page template query does not return expected values"
    )
  if (!mdx?.frontmatter?.title)
    throw new Error("Required `title` property missing for tutorial template")
  if (!relativePath)
    throw new Error("Required `relativePath` is missing on pageContext")

  const isRightToLeft = isLangRightToLeft(mdx.frontmatter.lang as Lang)

  const showPostMergeBanner = !!mdx.frontmatter.postMergeBannerTranslation
  const postMergeBannerTranslationString = mdx.frontmatter
    .postMergeBannerTranslation as TranslationKey | null

  const tocItems = mdx.tableOfContents?.items as Array<ItemTableOfContents>

  const { editContentUrl } = siteData.siteMetadata || {}
  const hideEditButton = !!mdx.frontmatter.hideEditButton
  const absoluteEditPath = `${editContentUrl}${relativePath}`
  const borderColor = useToken("colors", "border")
  return (
    <>
      {showPostMergeBanner && (
        <PostMergeBanner
          translationString={postMergeBannerTranslationString!}
        />
      )}
      <Flex
        w="100%"
        borderBottom={`1px solid ${borderColor}`}
        dir={isRightToLeft ? "rtl" : "ltr"}
        m={{ base: "2rem 0rem", lg: "0 auto" }}
        p={{ base: "0", lg: "0 2rem 0 0" }}
        background={{ base: "background.base", lg: "ednBackground" }}
      >
        <PageMetadata
          title={mdx.frontmatter.title}
          description={mdx.frontmatter.description}
          canonicalUrl={mdx.frontmatter.sourceUrl}
        />
        <ContentContainer>
          <H1>{mdx.frontmatter.title}</H1>
          <TutorialMetadata tutorial={mdx} />
          <TableOfContents
            items={tocItems}
            maxDepth={mdx.frontmatter.sidebarDepth!}
            editPath={absoluteEditPath}
            isMobile
            pt={8}
          />
          <MDXProvider components={components}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
          <FileContributors
            relativePath={relativePath}
            editPath={absoluteEditPath}
            mt={12}
            p={2}
            borderRadius="4px"
            border={`1px solid ${borderColor}`}
            background="ednBackground"
          />
          <FeedbackCard />
        </ContentContainer>
        {tocItems && (
          <TableOfContents
            items={tocItems}
            maxDepth={mdx.frontmatter.sidebarDepth!}
            editPath={absoluteEditPath}
            hideEditButton={hideEditButton}
            pt={16}
          />
        )}
      </Flex>
    </>
  )
}

export default TutorialPage

export const query = graphql`
  query TutorialPage($languagesToFetch: [String!]!, $relativePath: String) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["page-developers-tutorials", "common"] }
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
        readingTime {
          minutes
        }
      }
      frontmatter {
        title
        description
        lang
        tags
        author
        source
        sourceUrl
        skill
        published
        sidebarDepth
        address
        isOutdated
        postMergeBannerTranslation
        hideEditButton
      }
      body
      tableOfContents
    }
  }
`
