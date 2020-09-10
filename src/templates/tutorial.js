import React from "react"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"
import { Twemoji } from "react-emoji-render"

import Breadcrumbs from "../components/Breadcrumbs"
import Button from "../components/Button"
import Card from "../components/Card"
import Icon from "../components/Icon"
import InfoBanner from "../components/InfoBanner"
import Link from "../components/Link"
import PageMetadata from "../components/PageMetadata"
import Pill from "../components/Pill"
import TableOfContents from "../components/TableOfContents"
import Translation from "../components/Translation"
import Warning from "../components/Warning"
import SectionNav from "../components/SectionNav"
import { Mixins } from "../components/Theme"
import { Divider } from "../components/SharedStyledComponents"
import { getLocaleTimestamp } from "../utils/time"
import { isLangRightToLeft } from "../utils/translations"
import CallToContribute from "../components/CallToContribute"
import Tutorials from "../components/Tutorials"

// TODO move styled components into SharedStyles

const Page = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.ednBackground};
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  margin: 134px auto 0; /* TODO better way to adjust for nav? */
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 4rem auto 0;
  }

  /* Unique to EDN */
  padding: 0 2rem 0 0;
  background-color: ${(props) => props.theme.colors.ednBackground};
`

const StyledTableOfContents = styled(TableOfContents)`
  padding-top: 4rem;
`

// Apply styles for classes within markdown here
const ContentContainer = styled.article`
  flex: 1 1 ${(props) => props.theme.breakpoints.m};
  max-width: ${(props) => props.theme.breakpoints.l};
  background: ${(props) => props.theme.colors.background};
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  margin: 2rem 2rem;
  padding: 4rem 4rem;
  margin-bottom: 6rem;
  border-radius: 4px;

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

const LastUpdated = styled.p`
  color: ${(props) => props.theme.colors.text200};
  margin-bottom: 1.5rem;
`

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
    font-size: 2.5rem;
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

const Pre = styled.pre`
  max-width: 100%;
  overflow-x: scroll;
  background-color: ${(props) => props.theme.colors.preBackground};
  border-radius: 0.25rem;
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.colors.preBorder};
  white-space: pre-wrap;
`

const ContributorContainer = styled.div`
  display: flex;
  margin-top: -1rem;
  margin-bottom: 2rem;
  justify-content: space-between;
  align-items: baseline;
  max-width: 100%;
  /* Avoid overlap of h1 */
  position: relative;
  z-index: 2;
`

// TODO should we have edit buttons on tutorials?
const GithubButton = styled(Button)`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.secondaryButtonColor};
  background-color: ${(props) => props.theme.colors.secondaryButtonBackground};
  border: 1px solid ${(props) => props.theme.colors.secondaryButtonBorder};
  &:hover {
    background-color: ${(props) =>
      props.theme.colors.secondaryButtonBackgroundHover};
    color: ${(props) => props.theme.colors.secondaryButtonHoverColor};
  }
  &:active {
    background-color: ${(props) =>
      props.theme.colors.secondaryButtonBackgroundActive};
    color: ${(props) => props.theme.colors.secondaryButtonHoverColor};
  }
`

const GithubIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.text};
  margin-right: 0.5rem;
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
  pre: Pre,
  a: Link,
  Button,
  InfoBanner,
  Warning,
  Card,
  Divider,
  SectionNav,
  Pill,
  Twemoji,
  CallToContribute,
  Tutorials,
}

const TutorialPage = ({ data, path }) => {
  const intl = useIntl()
  const isRightToLeft = isLangRightToLeft(intl.locale)

  const mdx = data.pageData
  const tocItems = mdx.tableOfContents.items

  // TODO some `gitLogLatestDate` are `null` - why?
  const lastUpdatedDate = mdx.parent.fields
    ? mdx.parent.fields.gitLogLatestDate
    : mdx.parent.mtime

  const { editContentUrl } = data.siteData.siteMetadata
  const { relativePath } = mdx.parent
  const absoluteEditPath = `${editContentUrl}${relativePath}`

  return (
    <Page dir={isRightToLeft ? "rtl" : "ltr"}>
      <PageMetadata
        title={mdx.frontmatter.title}
        description={mdx.frontmatter.description}
      />
      <ContentContainer>
        <Breadcrumbs slug={mdx.fields.slug} startDepth={2} />
        <H1>{mdx.frontmatter.title}</H1>
        <ContributorContainer>
          <LastUpdated>
            <Translation id="page-last-updated" />:{" "}
            {getLocaleTimestamp(intl.locale, lastUpdatedDate)}
          </LastUpdated>
          <GithubButton to={absoluteEditPath}>
            <GithubIcon name="github" /> <span>Edit content</span>
          </GithubButton>
        </ContributorContainer>
        <MDXProvider components={components}>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </MDXProvider>
      </ContentContainer>
      {mdx.frontmatter.sidebar && tocItems && (
        <StyledTableOfContents
          items={tocItems}
          maxDepth={mdx.frontmatter.sidebarDepth}
        />
      )}
    </Page>
  )
}

export default TutorialPage

export const TutorialPageQuery = graphql`
  query TutorialPageQuery($slug: String) {
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
        sidebar
        sidebarDepth
      }
      body
      tableOfContents
      parent {
        ... on File {
          mtime
          relativePath
          fields {
            gitLogLatestDate
          }
        }
      }
    }
  }
`
