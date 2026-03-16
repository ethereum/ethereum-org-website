// Patch htmr types for React 19 compatibility
// ReactHTML and ReactSVG were removed in @types/react 19
// TODO: Remove when htmr is replaced (see deferred follow-up PRs)
declare module "htmr" {
  import { ReactNode } from "react"

  type HtmrOptions = {
    transform?: Record<string, unknown>
    preserveAttributes?: string[]
    dangerouslySetChildren?: string[]
  }

  export default function htmr(html: string, options?: HtmrOptions): ReactNode

  export type { HtmrOptions }
}

// Also override htmr's internal types module to prevent build errors
declare module "htmr/src/types" {
  import { ReactNode, ComponentType, JSX } from "react"

  export type HTMLTags = keyof JSX.IntrinsicElements
  export type SVGTags = keyof JSX.IntrinsicElements

  export type AllTags = HTMLTags | SVGTags

  export type HTMLTransform = {
    [tag in AllTags]?: ComponentType<unknown>
  }

  export type DefaultTransform = {
    _?: (
      element: string | AllTags,
      props?: unknown,
      children?: ReactNode
    ) => ReactNode
  }
}
