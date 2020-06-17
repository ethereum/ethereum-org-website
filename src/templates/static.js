import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"
import styled from "styled-components"

import Sidebar from "../components/Sidebar"

const shortcodes = { Link } // Provide common components here

const Container = styled.div`
  margin: 3rem auto;
  max-width: 900px; /* TODO set */
  display: flex;
`

const ContentContainer = styled.article`
  max-width: 600px;
`

const StaticPage = ({ data: { mdx } }) => {
  const tocItems = mdx.tableOfContents.items

  return (
    <Container>
      <ContentContainer>
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
    }
  }
`

export default StaticPage
