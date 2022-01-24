import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"

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
import TableOfContents from "../components/TableOfContents"
import SectionNav from "../components/SectionNav"
import { isLangRightToLeft } from "../utils/translations"
import CallToContribute from "../components/CallToContribute"
import {
  Divider,
  Paragraph,
  Header1,
  Header2,
  Header3,
  Header4,
  ListItem,
} from "../components/SharedStyledComponents"
import Emoji from "../components/Emoji"
import YouTube from "../components/YouTube"

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

const TutorialPage = ({ data, pageContext }) => {
  const pageData = data.pageData
  const isRightToLeft = isLangRightToLeft(pageData.frontmatter.lang)

  const tocItems = pageData.tableOfContents.items

  const { editContentUrl } = data.siteData.siteMetadata
  const { relativePath } = pageContext
  const absoluteEditPath = `${editContentUrl}${relativePath}`

  return (
    <Page dir={isRightToLeft ? "rtl" : "ltr"}>
      <PageMetadata
        title={pageData.frontmatter.title}
        description={pageData.frontmatter.description}
        canonicalUrl={pageData.frontmatter.sourceUrl}
      />
      <ContentContainer>
        <H1>{pageData.frontmatter.title}</H1>
        <TutorialMetadata tutorial={pageData} />
        <MobileTableOfContents
          items={tocItems}
          maxDepth={pageData.frontmatter.sidebarDepth}
          editPath={absoluteEditPath}
          isMobile={true}
        />
        <MDXProvider components={components}>
          <MDXRenderer>{pageData.body}</MDXRenderer>
        </MDXProvider>
        <Contributors relativePath={relativePath} editPath={absoluteEditPath} />
      </ContentContainer>
      {pageData.frontmatter.sidebar && tocItems && (
        <DesktopTableOfContents
          items={tocItems}
          maxDepth={pageData.frontmatter.sidebarDepth}
          editPath={absoluteEditPath}
        />
      )}
    </Page>
  )
}

export default TutorialPage

export const query = graphql`
  query TutorialPageQuery($relativePath: String) {
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
        sidebar
        sidebarDepth
        address
        isOutdated
      }
      body
      tableOfContents
    }
  }
`
