// temporary deactivate this lib since they didn't release the correct types to
// support react 18
declare module "react-helmet"

// temporary deactivate this lib. Bump its version to v5 which is built in TS
// and supports react 18 types
declare module "react-select"

// temporary deactivate this lib since they didn't release the correct types to
// support react 18
declare module "react-instantsearch-dom"

declare module "*developer-docs-links.yaml" {
  type DeveloperDocsLink = import("./src/types").DeveloperDocsLink
  const content: Array<DeveloperDocsLink>
  export default content
}

declare module "*.mp4" {
  const src: string
  export default src
}

declare module "!!raw-loader!*" {
  const content: string
  export default content
}
