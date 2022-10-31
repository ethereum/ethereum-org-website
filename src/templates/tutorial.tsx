import React from "react"
import { graphql, PageProps } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "@emotion/styled"

import ButtonLink from "../components/ButtonLink"
import Card from "../components/Card"
import Codeblock from "../components/Codeblock"
import TutorialMetadata from "../components/TutorialMetadata"
import FileContributors from "../components/FileContributors"
import InfoBanner from "../components/InfoBanner"
import Link from "../components/Link"
import MarkdownTable from "../components/MarkdownTable"
import PageMetadata from "../components/PageMetadata"
import Pill from "../components/Pill"
import TableOfContents, {
  Item as ItemTableOfContents,
} from "../components/TableOfContents"
import SectionNav from "../components/SectionNav"
import CallToContribute from "../components/CallToContribute"
import {
  Divider,
  Paragraph,
  Header1,
  Header2,
  Header3,
  Header4,
  ListItem,
  KBD,
} from "../components/SharedStyledComponents"
import Emoji from "../components/OldEmoji"
import YouTube from "../components/YouTube"
import PostMergeBanner from "../components/Banners/PostMergeBanner"
import FeedbackCard from "../components/FeedbackCard"

import { isLangRightToLeft, TranslationKey } from "../utils/translations"
import { Lang } from "../utils/languages"
import { Context } from "../types"

const Page = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem 0 0;
  background: ${(props) => props.theme.colors.ednBackground};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.ednBackground};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 2rem 0rem;
    padding: 0;
    background: ${(props) => props.theme.colors.background};
  }
`

const DesktopTableOfContents = styled(TableOfContents)`
  padding-top: 4rem;
`
const MobileTableOfContents = styled(TableOfContents)`
  margin-bottom: 2rem;
`

// Apply styles for classes within markdown here
const ContentContainer = styled.article`
  flex: 1 1 ${(props) => props.theme.breakpoints.m};
  max-width: 1000px;
  background: ${(props) => props.theme.colors.background};
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  margin: 2rem 2rem;
  padding: 4rem 4rem;
  margin-bottom: 6rem;
  border-radius: 4px;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 2.5rem 0rem;
    padding: 3rem 2rem;
    box-shadow: none;
    width: 100%;
  }

  .featured {
    padding-left: 1rem;
    margin-left: -1rem;
    border-left: 1px dotted ${(props) => props.theme.colors.primary};
  }

  .citation {
    p {
      color: ${(props) => props.theme.colors.text200};
    }
  }
`

const H1 = styled(Header1)`
  font-size: 2.5rem;
  font-family: ${(props) => props.theme.fonts.monospace};
  text-transform: uppercase;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: 1.75rem;
  }
`

const H2 = styled(Header2)`
  font-family: ${(props) => props.theme.fonts.monospace};
  text-transform: uppercase;
`

const H3 = styled(Header3)`
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: 1rem;
    font-weight: 600;
  }
`
const H4 = styled(Header4)`
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: 1rem;
    font-weight: 600;
  }
`

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
  Card,
  Divider,
  SectionNav,
  Pill,
  CallToContribute,
  Emoji,
  YouTube,
}

const Contributors = styled(FileContributors)`
  margin-top: 3rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.ednBackground};
  padding: 1rem;
  border-radius: 4px;
`

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
  return (
    <div>
      {showPostMergeBanner && (
        <PostMergeBanner
          translationString={postMergeBannerTranslationString!}
        />
      )}
      <Page dir={isRightToLeft ? "rtl" : "ltr"}>
        <PageMetadata
          title={mdx.frontmatter.title}
          description={mdx.frontmatter.description}
          canonicalUrl={mdx.frontmatter.sourceUrl}
        />
        <ContentContainer>
          <H1>{mdx.frontmatter.title}</H1>
          <TutorialMetadata tutorial={mdx} />
          <MobileTableOfContents
            items={tocItems}
            maxDepth={mdx.frontmatter.sidebarDepth!}
            editPath={absoluteEditPath}
            isMobile={true}
          />
          <MDXProvider components={components}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
          <Contributors
            relativePath={relativePath}
            editPath={absoluteEditPath}
          />
          <FeedbackCard />
        </ContentContainer>
        {tocItems && (
          <DesktopTableOfContents
            items={tocItems}
            maxDepth={mdx.frontmatter.sidebarDepth!}
            editPath={absoluteEditPath}
            hideEditButton={hideEditButton}
          />
        )}
      </Page>
    </div>
  )
}

export default TutorialPage

export const query = graphql`
  query TutorialPage($relativePath: String) {
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
