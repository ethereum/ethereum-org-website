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

declare module "i18next-scanner" {
  import type File from "vinyl"

  export interface Scanner {
    parser: any
  }

  export type CustomTransformFn = (
    file: File,
    enc: BufferEncoding,
    done: () => void
  ) => void

  export type CustomFlushFn = (done: () => void) => void

  const scanner: (
    options: any,
    transform: CustomTransformFn,
    flush: CustomFlushFn
  ) => Stream
  export default scanner
}
