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
import Translation from "../components/Translation"
import { getLocaleTimestamp } from "../utils/moment"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 85vw;
  max-width: ${(props) => props.theme.breakpoints.xl};
  margin: 4rem auto 0;
`

const ContentContainer = styled.article`
  max-width: ${(props) => props.theme.breakpoints.m};

  .featured {
    padding-left: 1rem;
    margin-left: -1rem;
  }
`

const LastUpdated = styled.p`
  color: ${(props) => props.theme.colors.text200};
`

// TODO no top margin within lists
const P = styled.p`
  font-size: 1rem;
  margin: 2rem 0 1rem;
`

const H1 = styled.h1`
  /* TODO apply to all font? */
  line-height: 1.4;
  font-weight: 400;

  font-size: 3rem;
  margin: 2rem 0;

  /* Hide anchor link */
  .anchor.before {
    display: none;
  }
`

const H2 = styled.h2`
  /* TODO apply to all font? */
  line-height: 1.4;
  font-weight: 400;

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

// TODO figure out Component imports from md files
// ... this is the only way I could get it working
// TODO add custom components to <MDXProvider> for static pages
// https://www.gatsbyjs.org/packages/gatsby-plugin-mdx/#mdxprovider
const components = {
  p: P,
  h1: H1,
  h2: H2,
  a: Link,
  MeetupList,
  RandomAppList,
}

const StaticPage = ({ data: { mdx } }) => {
  const intl = useIntl()
  const tocItems = mdx.tableOfContents.items

  // TODO some `gitLogLatestDate` are `null` - why?
  const lastUpdatedDate = mdx.parent.fields
    ? mdx.parent.fields.gitLogLatestDate
    : mdx.parent.mtime

  return (
    <Container>
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
      {mdx.frontmatter.sidebar && tocItems && <Sidebar items={tocItems} />}
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
