import React from "react"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"

import SEO from "../components/SEO"
import Sidebar from "../components/Sidebar"
import MeetupList from "../components/MeetupList"
import RandomAppList from "../components/RandomAppList"
import Roadmap from "../components/Roadmap"
import Logo from "../components/Logo"
import Translation from "../components/Translation"
import { getLocaleTimestamp } from "../utils/moment"
import { isLangRightToLeft } from "../utils/translations"
import { Mixins } from "../components/Theme"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 85vw;
  max-width: ${(props) => props.theme.breakpoints.xl};
  margin: 4rem auto 0;
  padding-top: 2rem;

  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    padding-top: 6rem;
  }
`

const ContentContainer = styled.article`
  max-width: ${(props) => props.theme.breakpoints.m};

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
`

// TODO no top margin within lists
// TODO paragraph text on dark is duller
const P = styled.p`
  font-size: 1rem;
  margin: 2rem 0 1rem;
  color: ${(props) => props.theme.colors.text};
`

const H1 = styled.h1`
  ${Mixins.textLevel1}

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: 2.5rem;
  }

  /* Hide anchor link */
  .anchor.before {
    display: none;
  }
`

const H2 = styled.h2`
  ${Mixins.textLevel2}

  /* Needed to fix issues of header padding overlapping links */
  /* https://github.com/confluenza/confluenza/pull/17 */
  position: inherit !important;

  font-size: 2rem;
  margin: 4.5rem 0 1.5rem;

  &:before {
    content: "";
    display: block;
    height: 120px;
    margin-top: -120px;
    visibility: hidden;
  }

  .anchor.before {
    position: relative;
    display: initial;
    margin-left: -1.33em;
    font-size: 1rem;
    vertical-align: middle;
  }
`

const H3 = styled.h3`
  ${Mixins.textLevel3}

  /* Needed to fix issues of header padding overlapping links */
  /* https://github.com/confluenza/confluenza/pull/17 */
  position: inherit !important;

  font-size: 1.5rem;
  margin: 1.5rem 0;

  &:before {
    content: "";
    display: block;
    height: 120px;
    margin-top: -120px;
    visibility: hidden;
  }

  .anchor.before {
    position: relative;
    display: initial;
    margin-left: -1.33em;
    font-size: 1rem;
    vertical-align: middle;
  }
`

const Link = styled.a`
  &:not([href^="https://ethereum.org"]):not([href^="http://ethereum.org"]):not([href^="/"]):not([href^="#"]):not([href^="."]):not([href^="https://deploy-preview-"]):not([href^="deploy-preview-"]):not(.hide-icon)
  {
    &:after {
      margin-left: 0.125em;
      margin-right: 0.3em;
      display: inline-block;
      content: "↗";
      transition: all 0.1s ease-in-out;
      font-style: normal;
    }
    &:hover {
      &:after {
        transform: translate(0.15em, -0.2em);
      }
    }
  }

  & + em {
    opacity: 0.5;
    font-style: normal;
  }
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

// TODO why doesn't this work?
// const Li = styled.li`
//   padding-left: 0.5em;
//   margin-bottom: 0.5em;
//   &:before {
//     content: "\2022";
//     color: ${(props) => props.theme.colors.primary};
//     display: inline-block;
//     width: 1em;
//     margin-left: -1em;
//     position: absolute;
//   }
// `

// TODO figure out markdown Component imports
// Importing globally here was the only way I could get it working
const components = {
  p: P,
  h1: H1,
  h2: H2,
  h3: H3,
  a: Link,
  pre: Pre,
  MeetupList,
  RandomAppList,
  Roadmap,
  Logo,
}

const StaticPage = ({ data: { mdx } }) => {
  const intl = useIntl()
  const isRightToLeft = isLangRightToLeft(intl.locale)
  const tocItems = mdx.tableOfContents.items

  // TODO some `gitLogLatestDate` are `null` - why?
  const lastUpdatedDate = mdx.parent.fields
    ? mdx.parent.fields.gitLogLatestDate
    : mdx.parent.mtime

  return (
    <Container dir={isRightToLeft ? "rtl" : "ltr"}>
      <SEO
        title={mdx.frontmatter.title}
        description={mdx.frontmatter.description}
      />
      <ContentContainer>
        <LastUpdated>
          <Translation id="page-last-updated" />:{" "}
          {getLocaleTimestamp(intl.locale, lastUpdatedDate)}
        </LastUpdated>
        <MDXProvider components={components}>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </MDXProvider>
      </ContentContainer>
      {mdx.frontmatter.sidebar && tocItems && (
        <Sidebar items={tocItems} maxDepth={mdx.frontmatter.sidebarDepth} />
      )}
    </Container>
  )
}

export const pageQuery = graphql`
  query StaticPageQuery($slug: String) {
    mdx(fields: { slug: { eq: $slug } }) {
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
          fields {
            gitLogLatestDate
          }
        }
      }
    }
  }
`

export default StaticPage
