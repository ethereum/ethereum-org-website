import type { ReactElement } from "react"
import * as jsxRuntime from "react/jsx-runtime"

type MDXProps = {
  components?: Record<string, unknown>
}

type CompiledModule = {
  default: (props: MDXProps) => ReactElement
}

/**
 * Evaluate a Velite-compiled MDX function body and return the React component.
 *
 * Velite emits MDX in `function-body` format: the compiled body destructures
 * the JSX runtime out of `arguments[0]`, defines an `_createMdxContent`, and
 * returns `{ default: MDXContent }`. We wrap it with `new Function(body)` and
 * invoke it with the JSX runtime.
 *
 * Intentionally NOT cached: in static generation each page renders once, so a
 * cache holds compiled Function objects + their captured V8 native code alive
 * for the duration of the build with no hit rate. That memory pressure across
 * thousands of pages was OOM-ing `next build`.
 */
type Props = {
  body: string
  components?: Record<string, unknown>
}

const MdxContent = ({ body, components }: Props) => {
  const fn = new Function(body) as (
    runtime: typeof jsxRuntime
  ) => CompiledModule
  const Component = fn(jsxRuntime).default
  return <Component components={components} />
}

export default MdxContent
