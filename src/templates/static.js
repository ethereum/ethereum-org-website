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
  display: flex;
  justify-content: space-between;
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

// TODO add SEO tags
const StaticPage = ({ data: { mdx } }) => {
  const intl = useIntl()
  const tocItems = mdx.tableOfContents.items

  // TODO not sure why but some `gitLogLatestDate` are `null`
  const lastUpdatedDate = mdx.parent.fields
    ? mdx.parent.fields.gitLogLatestDate
    : mdx.parent.mtime

  return (
    <Container>
      <ContentContainer>
        <LastUpdated>
          <Translation id="page-last-updated" />:{" "}
          {getLocaleTimestamp(intl.locale, lastUpdatedDate)}
        </LastUpdated>
        <MDXProvider components={shortcodes}>
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
