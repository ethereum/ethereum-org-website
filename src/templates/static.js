import React from "react"
import { graphql } from "gatsby"

// import SEO from "../components/seo"
// import { PageBody } from "../components/SharedStyledComponents"

const StaticPage = ({ data }) => {
  const content = data.markdownRemark
  // const { frontmatter } = content

  return (
    <>
      {/* <SEO title={frontmatter.title} /> */}
      {/* <PageBody> */}
      <div dangerouslySetInnerHTML={{ __html: content.html }} />
      {/* </PageBody> */}
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      frontmatter {
        title
      }
      fields {
        slug
      }
      html
    }
  }
`
export default StaticPage
