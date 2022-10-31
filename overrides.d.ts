declare module "*developer-docs-links.yaml" {
  import { DeveloperDocsLink } from "./src/types"
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
