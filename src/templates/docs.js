import React from "react"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"

import BannerNotification from "../components/BannerNotification"
import ButtonLink from "../components/ButtonLink"
import CallToContribute from "../components/CallToContribute"
import Card from "../components/Card"
import Codeblock from "../components/Codeblock"
import FileContributors from "../components/FileContributors"
import InfoBanner from "../components/InfoBanner"
import Link from "../components/Link"
import MarkdownTable from "../components/MarkdownTable"
import PageMetadata from "../components/PageMetadata"
import Pill from "../components/Pill"
import TableOfContents from "../components/TableOfContents"
import Warning from "../components/Warning"
import SectionNav from "../components/SectionNav"
import { isLangRightToLeft } from "../utils/translations"
import {
  Divider,
  Paragraph,
  H4,
  H5,
  Header1,
  Header2,
  Header3,
  ListItem,
} from "../components/SharedStyledComponents"
import Emoji from "../components/Emoji"
import DocsNav from "../components/DocsNav"

const Page = styled.div`
  position: relative; /* for <BannerNotification /> */
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding: 0 2rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 0;
  }
  background-color: ${(props) => props.theme.colors.ednBackground};
`

const DesktopTableOfContents = styled(TableOfContents)`
  padding-top: ${(props) => (props.isPageIncomplete ? `5rem` : `3rem`)};
`

// Apply styles for classes within markdown here
const ContentContainer = styled.article`
  flex: 1 1 ${(props) => props.theme.breakpoints.m};
  max-width: ${(props) => props.theme.breakpoints.m};
  padding: ${(props) =>
    props.isPageIncomplete ? `6rem 4rem 4rem` : `3rem 4rem 4rem`};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    max-width: 100%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    padding: ${(props) =>
      props.isPageIncomplete ? `15rem 2rem 2rem` : `8rem 2rem 2rem`};
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
  font-family: "SFMono-Regular", monospace;
  text-transform: uppercase;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: 2rem;
    line-height: 1.2;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  &:before {
    height: 180px;
    margin-top: -180px;
    @media (max-width: ${(props) => props.theme.breakpoints.m}) {
      margin-top: -240px;
    }
  }
`

const H2 = styled(Header2)`
  font-family: "SFMono-Regular", monospace;
  text-transform: uppercase;

  font-size: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};

  &:before {
    height: 160px;
    margin-top: -160px;
  }
`

const H3 = styled(Header3)`
  margin-top: 3rem;

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: 1rem;
    font-weight: 600;
  }
  &:before {
    height: 160px;
    margin-top: -160px;
  }
`

const StyledH4 = styled(H4)`
  /* Anchor tag styles */
  a {
    position: relative;
    display: none;
    margin-left: 0rem;
    padding-right: 0.5rem;
    font-size: 1rem;
    vertical-align: middle;
    &:hover {
      display: initial;
      fill: ${(props) => props.theme.colors.primary};
    }
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

// Passing components to MDXProvider allows use across all .md/.mdx files
// https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/#mdxprovider
const components = {
  a: Link,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: StyledH4,
  h5: H5,
  p: Paragraph,
  li: ListItem,
  pre: Codeblock,
  table: MarkdownTable,
  ButtonLink,
  InfoBanner,
  Warning,
  Card,
  Divider,
  SectionNav,
  Pill,
  CallToContribute,
  Emoji,
}

const Contributors = styled(FileContributors)`
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding-bottom: 2rem;
  }
`

const DocsPage = ({ data, pageContext }) => {
  const intl = useIntl()
  const isRightToLeft = isLangRightToLeft(intl.locale)

  const mdx = data.pageData
  const tocItems = mdx.tableOfContents.items
  const isPageIncomplete = mdx.frontmatter.incomplete

  const gitCommits = data.gitData.repository.ref.target.history.edges
  const { editContentUrl } = data.siteData.siteMetadata
  const { relativePath } = pageContext
  const absoluteEditPath = `${editContentUrl}${relativePath}`

  return (
    <Page dir={isRightToLeft ? "rtl" : "ltr"}>
      <PageMetadata
        title={mdx.frontmatter.title}
        description={mdx.frontmatter.description}
      />
      {isPageIncomplete && (
        <BannerNotification>
          This page is incomplete. If you’re an expert on the topic, please edit
          this page and sprinkle it with your wisdom.
        </BannerNotification>
      )}
      <ContentContainer isPageIncomplete={isPageIncomplete}>
        <H1 id="top">{mdx.frontmatter.title}</H1>
        <Contributors gitCommits={gitCommits} editPath={absoluteEditPath} />
        <TableOfContents
          items={tocItems}
          maxDepth={mdx.frontmatter.sidebarDepth}
          editPath={absoluteEditPath}
          isMobile={true}
        />
        <MDXProvider components={components}>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </MDXProvider>
        {isPageIncomplete && <CallToContribute editPath={absoluteEditPath} />}
        <BackToTop>
          <a href="#top">Back to top ↑</a>
        </BackToTop>
        <DocsNav relativePath={relativePath}></DocsNav>
      </ContentContainer>
      {mdx.frontmatter.sidebar && tocItems && (
        <DesktopTableOfContents
          items={tocItems}
          maxDepth={mdx.frontmatter.sidebarDepth}
          editPath={absoluteEditPath}
          isPageIncomplete={isPageIncomplete}
        />
      )}
    </Page>
  )
}

export const query = graphql`
  query DocsPageQuery($slug: String, $relativePath: String) {
    siteData: site {
      siteMetadata {
        editContentUrl
      }
    }
    pageData: mdx(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
        description
        incomplete
        sidebar
        sidebarDepth
      }
      body
      tableOfContents
    }
    gitData: github {
      repository(name: "ethereum-org-website", owner: "ethereum") {
        ref(qualifiedName: "master") {
          target {
            ... on GitHub_Commit {
              history(path: $relativePath) {
                edges {
                  node {
                    message
                    commitUrl
                    author {
                      name
                      email
                      avatarUrl(size: 100)
                      user {
                        url
                        login
                      }
                    }
                    committedDate
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export default DocsPage
