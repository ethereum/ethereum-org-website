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
 * Cached per compiled-body string so the same page rendered multiple times
 * (e.g. in dev) skips the Function compilation.
 */
const componentCache = new Map<string, CompiledModule["default"]>()

const useMDXComponent = (body: string): CompiledModule["default"] => {
  const cached = componentCache.get(body)
  if (cached) return cached
  const fn = new Function(body) as (
    runtime: typeof jsxRuntime
  ) => CompiledModule
  const { default: Component } = fn(jsxRuntime)
  componentCache.set(body, Component)
  return Component
}

type Props = {
  body: string
  components?: Record<string, unknown>
}

const MdxContent = ({ body, components }: Props) => {
  const Component = useMDXComponent(body)
  return <Component components={components} />
}

export default MdxContent
