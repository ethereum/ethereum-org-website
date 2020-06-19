import React from "react"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"
import styled from "styled-components"

import Sidebar from "../components/Sidebar"
import Translation from "../components/Translation"
import { getLocaleTimestamp } from "../utils/moment"

const shortcodes = { Link } // Provide common components here

const Container = styled.div`
  width: 85vw;
  max-width: ${(props) => props.theme.breakpoints.xl};
  margin: 4rem auto 0;
`

const ContentContainer = styled.article`
  max-width: 600px;
`

const LastUpdated = styled.p`
  color: ${(props) => props.theme.colors.text200};
`

// TODO add page last updated
const StaticPage = ({ data: { mdx } }) => {
  const intl = useIntl()
  const tocItems = mdx.tableOfContents.items

  return (
    <Container>
      <ContentContainer>
        <LastUpdated>
          <Translation id="page-last-updated" />:{" "}
          {getLocaleTimestamp(intl.locale, mdx.parent.mtime)}
        </LastUpdated>
        <MDXProvider components={shortcodes}>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </MDXProvider>
      </ContentContainer>
      {tocItems && <Sidebar items={tocItems} />}
    </Container>
  )
}

// TODO query for `frontmatter.sidebar` & conditionally render Sidebar
// Need to add `frontmatter.sidebar` to GraphQL schema:
// https://www.gatsbyjs.org/docs/schema-customization/
export const pageQuery = graphql`
  query StaticPageQuery($slug: String) {
    mdx(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
      body
      tableOfContents
      parent {
        ... on File {
          mtime
        }
      }
    }
  }
`

export default StaticPage
