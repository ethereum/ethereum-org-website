// Optimization. Ref: https://www.gatsbyjs.com/docs/scaling-issues/#switch-off-type-inference-for-sitepagecontext
export const SitePage = `
  type SitePage implements Node @dontInfer {
    path: String!
  }
`
