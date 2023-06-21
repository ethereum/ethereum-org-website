import React, { ComponentPropsWithoutRef, useContext } from "react"
import { graphql, PageProps } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import {
  Badge,
  Divider as ChakraDivider,
  Flex,
  FlexProps,
  Heading,
  ListItem as ChakraListItem,
  ListItemProps,
  Text,
  TextProps,
  Box,
  useToken,
  HeadingProps,
  UnorderedList as ChakraUnorderedList,
  OrderedList as ChakraOrderedList,
  ListProps,
} from "@chakra-ui/react"

import BannerNotification from "../components/BannerNotification"
import ButtonLink from "../components/ButtonLink"
import CallToContribute from "../components/CallToContribute"
import Card from "../components/Card"
import Codeblock from "../components/Codeblock"
import FeedbackCard from "../components/FeedbackCard"
import FileContributors from "../components/FileContributors"
import InfoBanner from "../components/InfoBanner"
import Link from "../components/Link"
import MarkdownTable from "../components/MarkdownTable"
import PageMetadata from "../components/PageMetadata"
import TableOfContents, {
  Item as ItemTableOfContents,
} from "../components/TableOfContents"
import SectionNav from "../components/SectionNav"
import Translation from "../components/Translation"
import Emoji from "../components/Emoji"
import DocsNav from "../components/DocsNav"
import DeveloperDocsLinks from "../components/DeveloperDocsLinks"
import RollupProductDevDoc from "../components/RollupProductDevDoc"
import YouTube from "../components/YouTube"

import PostMergeBanner from "../components/Banners/PostMergeBanner"

import { ZenModeContext } from "../contexts/ZenModeContext"
import { isLangRightToLeft } from "../utils/translations"
import { Lang } from "../utils/languages"
import { ChildOnlyProp, Context } from "../types"

const Page = (props: ChildOnlyProp & Pick<FlexProps, "dir">) => (
  <Flex
    direction="column"
    w="full"
    borderBottom="1px"
    borderColor="border"
    {...props}
  />
)

const Divider = () => (
  <ChakraDivider
    my={16}
    w="10%"
    borderBottomWidth={1}
    borderColor="homeDivider"
  />
)
const baseHeadingStyle: HeadingProps = {
  fontFamily: "mono",
  textTransform: "uppercase",
  fontWeight: "bold",
}

const H1 = (props: HeadingProps) => (
  <Heading
    {...baseHeadingStyle}
    as="h1"
    fontSize={{ base: "2rem", md: "2.5rem" }}
    lineHeight={{ md: 1.4 }}
    mt={{ base: 0, md: 8 }}
    mb={{ base: 4, md: 8 }}
    {...props}
  />
)

const H2 = (props: HeadingProps) => (
  <Heading
    {...baseHeadingStyle}
    fontSize="2xl"
    lineHeight={{ base: 1.2, md: 1.4 }}
    pb={2}
    borderBottom="1px"
    borderColor="border"
    {...props}
  />
)

const baseSubHeadingStyles: HeadingProps = {
  lineHeight: 1.4,
  fontWeight: "semibold",
  fontSize: "md",
}

const H3 = (props: HeadingProps) => (
  <Heading
    {...baseSubHeadingStyles}
    as="h3"
    fontSize={{ md: "2xl" }}
    mt={12}
    {...props}
  />
)

const H4 = (props: HeadingProps) => (
  <Heading
    {...baseSubHeadingStyles}
    as="h4"
    fontSize={{ md: "xl" }}
    {...props}
  />
)

const Paragraph = (props: TextProps) => (
  <Text fontSize="md" color="text300" mt={8} mb={4} {...props} />
)

const UnorderedList = (props: ListProps) => (
  <ChakraUnorderedList ms="1.45rem" {...props} />
)
const OrderedList = (props: ListProps) => (
  <ChakraOrderedList ms="1.45rem" {...props} />
)

const ListItem = (props: ListItemProps) => (
  <ChakraListItem color="text300" {...props} />
)

const ContentContainer = (props: ChildOnlyProp & { isZenMode: boolean }) => (
  <Flex
    justify={props.isZenMode ? "center" : "space-between"}
    w="full"
    py={0}
    pl={0}
    pr={{ base: 0, lg: 8 }}
    backgroundColor="ednBackground"
    {...props}
  />
)

// Apply styles for classes within markdown here
const Content = (props: ChildOnlyProp) => {
  const mdBreakpoint = useToken("breakpoints", "md")

  return (
    <Box
      as="article"
      flex={`1 1 ${mdBreakpoint}`}
      maxW={{ base: "full", lg: mdBreakpoint }}
      pt={{ base: 32, md: 12 }}
      pb={{ base: 8, md: 16 }}
      px={{ base: 8, md: 16 }}
      m="0 auto"
      sx={{
        ".featured": {
          paddingLeft: 4,
          marginLeft: -4,
          borderLeft: "1px dotted",
          borderColor: "primary",
        },
        ".citation": {
          p: {
            color: "text200",
          },
        },
      }}
      {...props}
    />
  )
}

const BackToTop = (props: ChildOnlyProp) => (
  <Flex
    display={{ lg: "none" }}
    mt={12}
    pt={8}
    borderTop="1px"
    borderColor="border"
    {...props}
  />
)

// Note: you must pass components to MDXProvider in order to render them in markdown files
// https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/#mdxprovider
const components = {
  a: Link,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: Paragraph,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  pre: Codeblock,
  table: MarkdownTable,
  ButtonLink,
  InfoBanner,
  Card,
  Divider,
  SectionNav,
  Badge,
  CallToContribute,
  Emoji,
  DeveloperDocsLinks,
  YouTube,
  RollupProductDevDoc,
}

const Contributors = (
  props: ComponentPropsWithoutRef<typeof FileContributors>
) => <FileContributors p={{ base: 0, lg: 2 }} pb={{ base: 8, lg: 2 }} {...props} />

const DocsPage = ({
  data: { siteData, pageData: mdx },
  pageContext: { relativePath, slug },
}: PageProps<Queries.DocsPageQuery, Context>) => {
  const { isZenMode } = useContext(ZenModeContext)

  if (!siteData || !mdx?.frontmatter)
    throw new Error("Docs page template query does not return expected values")
  if (!mdx?.frontmatter?.title)
    throw new Error("Required `title` property missing for docs template")
  if (!relativePath)
    throw new Error("Required `relativePath` is missing on pageContext")

  const isRightToLeft = isLangRightToLeft(mdx.frontmatter.lang as Lang)

  const tocItems = mdx.tableOfContents?.items as Array<ItemTableOfContents>
  const isPageIncomplete = !!mdx.frontmatter.incomplete

  const { editContentUrl } = siteData.siteMetadata || {}
  const absoluteEditPath = `${editContentUrl}${relativePath}`

  return (
    <Page dir={isRightToLeft ? "rtl" : "ltr"}>
      <PageMetadata
        title={mdx.frontmatter.title}
        description={mdx.frontmatter.description}
      />
      {isPageIncomplete && (
        <BannerNotification shouldShow={isPageIncomplete}>
          <Translation id="banner-page-incomplete" />
        </BannerNotification>
      )}
      <ContentContainer isZenMode={isZenMode}>
        <Content>
          <H1 id="top">{mdx.frontmatter.title}</H1>
          <Contributors
            relativePath={relativePath}
            editPath={absoluteEditPath}
          />
          <TableOfContents
            slug={slug}
            editPath={absoluteEditPath}
            items={tocItems}
            isMobile
            maxDepth={mdx.frontmatter.sidebarDepth!}
            hideEditButton={!!mdx.frontmatter.hideEditButton}
          />
          <MDXProvider components={components}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
          {isPageIncomplete && <CallToContribute editPath={absoluteEditPath} />}
          <BackToTop>
            <a href="#top">
              <Translation id="back-to-top" /> ↑
            </a>
          </BackToTop>
          <FeedbackCard isArticle />
          <DocsNav relativePath={relativePath}></DocsNav>
        </Content>
        {tocItems && (
          <TableOfContents
            slug={slug}
            editPath={absoluteEditPath}
            items={tocItems}
            maxDepth={mdx.frontmatter.sidebarDepth!}
            hideEditButton={!!mdx.frontmatter.hideEditButton}
            pt={isPageIncomplete ? "5rem" : "3rem"}
          />
        )}
      </ContentContainer>
    </Page>
  )
}

export const query = graphql`
  query DocsPage($languagesToFetch: [String!]!, $relativePath: String) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["page-developers-docs", "common"] }
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
        incomplete
        sidebarDepth
        isOutdated
        hideEditButton
      }
      body
      tableOfContents
    }
  }
`

export default DocsPage
