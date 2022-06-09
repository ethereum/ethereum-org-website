// temporary override until we figure out how to solve the `getImage` type
// errors.
// TODO: create issue in Gatsby repo
declare module "gatsby-plugin-image"

declare module "*developer-docs-links.yaml" {
  export interface DeveloperDocsLink {
    id: string
    to: string
    path: string
    description: string
    items: Array<DeveloperDocsLink>
  }
  const content: Array<DeveloperDocsLink>
  export default content
}
