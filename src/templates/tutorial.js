import React from "react"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"
import { Twemoji } from "react-emoji-render"

import Button from "../components/Button"
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
import Warning from "../components/Warning"
import SectionNav from "../components/SectionNav"
import { Mixins } from "../components/Theme"
import { Divider } from "../components/SharedStyledComponents"
import { isLangRightToLeft } from "../utils/translations"
import CallToContribute from "../components/CallToContribute"

const Page = styled.div`
  display: flex;
  background: ${(props) => props.theme.colors.ednBackground};
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  margin: 134px auto 0; /* TODO better way to adjust for nav? */
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 2rem 0rem;
    background: ${(props) => props.theme.colors.background};
    width: 100%;
    padding: 0 0 0 0;
  }

  /* Unique to EDN */
  padding: 0 2rem 0 0;
  background-color: ${(props) => props.theme.colors.ednBackground};
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
    font-size: 1.75rem;
  }

  /* Prevent nav overlap */
  &:before {
    content: "";
    display: block;
    height: 140px;
    margin-top: -160px;
    visibility: hidden;
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

  /* Needed to fix issues of header padding overlapping links */
  /* https://github.com/confluenza/confluenza/pull/17 */
  position: inherit !important;

  /* Prevent nav overlap */
  &:before {
    content: "";
    display: block;
    height: 160px;
    margin-top: -160px;
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
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: 1.25rem;
  }
`

const H3 = styled.h3`
  ${Mixins.textLevel3};
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
    height: 160px;
    margin-top: -160px;
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
  margin-top: 3rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.ednBackground};
  padding: 1rem;
  border-radius: 4px;
`

const TutorialPage = ({ data, pageContext }) => {
  const intl = useIntl()
  const isRightToLeft = isLangRightToLeft(intl.locale)

  const pageData = data.pageData
  const tocItems = pageData.tableOfContents.items

  const gitCommits = data.gitData.repository.ref.target.history.edges
  const { editContentUrl } = data.siteData.siteMetadata
  const { relativePath } = pageContext
  const absoluteEditPath = `${editContentUrl}${relativePath}`

  return (
    <Page dir={isRightToLeft ? "rtl" : "ltr"}>
      <PageMetadata
        title={pageData.frontmatter.title}
        description={pageData.frontmatter.description}
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
        <Contributors gitCommits={gitCommits} editPath={absoluteEditPath} />
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
  query TutorialPageQuery($slug: String, $relativePath: String) {
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
        tags
        author
        source
        sourceUrl
        skill
        published
        sidebar
        sidebarDepth
        address
      }
      body
      tableOfContents
      timeToRead
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
