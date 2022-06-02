// temporary override until we figure out how to solve the `getImage` type
// errors.
// TODO: create issue in Gatsby repo
declare module "gatsby-plugin-image"

declare module "*.yaml" {
  const content: { [key: string]: any }
  export default content
}
