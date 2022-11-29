import React, { useContext } from "react"
import { graphql, PageProps } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "@emotion/styled"

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
import Pill from "../components/Pill"
import TableOfContents, {
  Item as ItemTableOfContents,
} from "../components/TableOfContents"
import SectionNav from "../components/SectionNav"
import Translation from "../components/Translation"
import Emoji from "../components/OldEmoji"
import DocsNav from "../components/DocsNav"
import DeveloperDocsLinks from "../components/DeveloperDocsLinks"
import RollupProductDevDoc from "../components/RollupProductDevDoc"
import YouTube from "../components/YouTube"
import {
  Divider,
  Paragraph,
  Header1,
  Header2,
  Header3,
  Header4,
  ListItem,
} from "../components/SharedStyledComponents"
import PostMergeBanner from "../components/Banners/PostMergeBanner"

import { ZenModeContext } from "../contexts/ZenModeContext"
import { isLangRightToLeft } from "../utils/translations"
import { Lang } from "../utils/languages"
import { Context } from "../types"

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`

const ContentContainer = styled.div<{ isZenMode: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.isZenMode ? "center" : "space-between")};
  width: 100%;
  padding: 0 2rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 0;
  }
  background-color: ${(props) => props.theme.colors.ednBackground};
`

const DesktopTableOfContents = styled(TableOfContents)<{
  isPageIncomplete: boolean
}>`
  padding-top: ${(props) => (props.isPageIncomplete ? `5rem` : `3rem`)};
`

// Apply styles for classes within markdown here
const Content = styled.article`
  flex: 1 1 ${(props) => props.theme.breakpoints.m};
  max-width: ${(props) => props.theme.breakpoints.m};
  padding: 3rem 4rem 4rem;
  margin: 0px auto;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    max-width: 100%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    padding: 8rem 2rem 2rem;
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
    font-size: 2rem;
    line-height: 1.2;
    margin-top: 0;
    margin-bottom: 1rem;
  }
`

const H2 = styled(Header2)`
  font-family: ${(props) => props.theme.fonts.monospace};
  text-transform: uppercase;

  font-size: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`

const H3 = styled(Header3)`
  margin-top: 3rem;

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

const BackToTop = styled.div`
  margin-top: 3rem;
  display: flex;
  padding-top: 2rem;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
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
  DeveloperDocsLinks,
  YouTube,
  RollupProductDevDoc,
}

const Contributors = styled(FileContributors)`
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding-bottom: 2rem;
  }
`

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
            isMobile={true}
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
          <DesktopTableOfContents
            slug={slug}
            editPath={absoluteEditPath}
            items={tocItems}
            isPageIncomplete={isPageIncomplete}
            maxDepth={mdx.frontmatter.sidebarDepth!}
            hideEditButton={!!mdx.frontmatter.hideEditButton}
          />
        )}
      </ContentContainer>
    </Page>
  )
}

export const query = graphql`
  query DocsPage($relativePath: String) {
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
