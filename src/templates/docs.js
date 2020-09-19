import React from "react"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"
import { Twemoji } from "react-emoji-render"

import BannerNotification from "../components/BannerNotification"
import Button from "../components/Button"
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
import { Mixins } from "../components/Theme"
import { Divider } from "../components/SharedStyledComponents"
import { isLangRightToLeft } from "../utils/translations"

const Page = styled.div`
  position: relative; /* for <BannerNotification /> */
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  margin: 134px auto 0; /* adjust for top nav */
  padding: 0 2rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 0;
    margin-top: 8.5rem; /* adjust for top navs */
  }
  background-color: ${(props) => props.theme.colors.ednBackground};
`

const DesktopTableOfContents = styled(TableOfContents)`
  padding-top: ${(props) => (props.isPageIncomplete ? `5rem` : `4rem`)};
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

// TODO move shared styles into SharedStyledComponents.js
const P = styled.p`
  font-size: 1rem;
  margin: 2rem 0 1rem;
  color: ${(props) => props.theme.colors.text300};
`

const H1 = styled.h1`
  ${Mixins.textLevel1};
  font-family: "SFMono-Regular", monospace;
  text-transform: uppercase;
  font-size: 2.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: 2rem;
    line-height: 1.2;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  /* Prevent nav overlap */
  &:before {
    content: "";
    display: block;
    height: 140px;
    margin-top: -160px;
    visibility: hidden;
    @media (max-width: ${(props) => props.theme.breakpoints.m}) {
      margin-top: -240px;
    }
  }

  /* Hide anchor link */
  a {
    display: none;
  }
`

const H2 = styled.h2`
  ${Mixins.textLevel2};
  font-family: "SFMono-Regular", monospace;
  text-transform: uppercase;
  font-size: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: 1.25rem;
  }

  /* Needed to fix issues of header padding overlapping links */
  /* https://github.com/confluenza/confluenza/pull/17 */
  position: inherit !important;

  /* Prevent nav overlap */
  &:before {
    content: "";
    display: block;
    height: 120px;
    margin-top: -120px;
    visibility: hidden;
  }

  /* Anchor tag styles */
  a {
    position: relative;
    display: none;
    margin-left: -1.5em;
    padding-right: 0.5rem;
    font-size: 1rem;
    vertical-align: middle;
    &:hover {
      display: initial;
      fill: ${(props) => props.theme.colors.primary};
    }
  }

  &:hover {
    a {
      display: initial;
      fill: ${(props) => props.theme.colors.primary};
    }
  }
`

const H3 = styled.h3`
  ${Mixins.textLevel3};
  margin-top: 3rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: 1rem;
    font-weight: 600;
  }

  /* Needed to fix issues of header padding overlapping links */
  /* https://github.com/confluenza/confluenza/pull/17 */
  position: inherit !important;

  /* Prevent nav overlap */
  &:before {
    content: "";
    display: block;
    height: 120px;
    margin-top: -120px;
    visibility: hidden;
  }

  /* Anchor tag styles */
  a {
    position: relative;
    display: none;
    margin-left: -1.5em;
    padding-right: 0.5rem;
    font-size: 1rem;
    vertical-align: middle;
    &:hover {
      display: initial;
      fill: ${(props) => props.theme.colors.primary};
    }
  }

  &:hover {
    a {
      display: initial;
      fill: ${(props) => props.theme.colors.primary};
    }
  }
`

const H4 = styled.h4`
  ${Mixins.textLevel4}
`

const H5 = styled.h5`
  ${Mixins.textLevel5}
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

// Passing components to MDXProvider allows
// component use across all .md/.mdx files
const components = {
  p: P,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  pre: Codeblock,
  a: Link,
  table: MarkdownTable,
  Button,
  InfoBanner,
  Warning,
  Card,
  Divider,
  SectionNav,
  Pill,
  Twemoji,
  CallToContribute,
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
    <Page id="top" dir={isRightToLeft ? "rtl" : "ltr"}>
      <PageMetadata
        title={mdx.frontmatter.title}
        description={mdx.frontmatter.description}
      />
      {isPageIncomplete && (
        <BannerNotification>
          This page needs help! If you’re an expert on the topic and want to
          contribute, edit this page and sprinkle it with your wisdom.
        </BannerNotification>
      )}
      <ContentContainer isPageIncomplete={isPageIncomplete}>
        <H1>{mdx.frontmatter.title}</H1>
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

// TODO update to query "master" branch (not "edn-mvp")
// TODO move Github query to inside FileContributor component
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
        ref(qualifiedName: "edn-mvp") {
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
