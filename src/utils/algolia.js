// TODO update queries to include all pages
// separate queries for MDX vs. other pages?
const markdownQuery = `{
  allMdx {
    edges {
      node {
        id
        fields {
          slug
        }
        frontmatter {
          title
          lang
        }
        tableOfContents(maxDepth: 2)
        excerpt(pruneLength: 2000)
      }
    }
  }
}`

// TODO files are too big with TOC??
// const markdownQuery = `{
//   allMdx {
//     edges {
//       node {
//         id
//         fields {
//           slug
//         }
//         frontmatter {
//           title
//         }
//         tableOfContents(maxDepth: 10)
//         excerpt(pruneLength: 2000)
//       }
//     }
//   }
// }`

// const pageQuery = `{
//   allSitePage {
//     edges {
//       node {
//         path
//       }
//     }
//   }
// }`

const flatten = (arr) =>
  arr.map(({ node: { fields, frontmatter, ...rest } }) => ({
    ...fields,
    ...frontmatter,
    ...rest,
  }))

const settings = {
  attributesToSnippet: [`excerpt:20`],
  attributesForFaceting: [`lang`],
}

const queries = [
  {
    query: markdownQuery,
    transformer: ({ data }) => flatten(data.allMdx.edges),
    indexName: `dev-ethereum-org`,
    settings,
  },
]

module.exports = queries
