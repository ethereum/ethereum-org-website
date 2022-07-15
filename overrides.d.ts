// temporary override until we figure out how to solve the `getImage` type
// error. https://github.com/gatsbyjs/gatsby/issues/35748
declare module "gatsby-plugin-image"

declare module "*developer-docs-links.yaml" {
  import { DeveloperDocsLink } from "./src/types"
  const content: Array<DeveloperDocsLink>
  export default content
}

declare module "*.mp4" {
  const src: string
  export default src
}
