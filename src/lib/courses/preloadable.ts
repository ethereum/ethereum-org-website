import dynamic from "next/dynamic"
import type { ComponentType, ReactNode } from "react"

type Loaded<P> = ComponentType<P> | { default: ComponentType<P> }

/** Settles in the same tick, so React.lazy resolves without suspending */
const settled = <T>(value: T): PromiseLike<T> => ({
  then: <R1 = T, R2 = never>(
    onFulfilled?: ((value: T) => R1 | PromiseLike<R1>) | null
  ): PromiseLike<R1 | R2> =>
    settled((onFulfilled ? onFulfilled(value) : value) as R1),
})

/**
 * `next/dynamic` plus a `preload()`. Once preloaded, the component renders
 * without suspending: React keeps a fallback it has shown up for at least
 * 300 ms, so even a cached chunk would flash the placeholder.
 */
export const preloadable = <P extends object>(
  load: () => Promise<Loaded<P>>,
  loading: () => ReactNode
) => {
  let loaded: Loaded<P> | undefined
  let request: Promise<Loaded<P>> | undefined
  const preload = () =>
    (request ??= load().then(
      (mod) => (loaded = mod),
      (error) => {
        // Let the next render or preload fetch the chunk again
        request = undefined
        throw error
      }
    ))
  const Component = dynamic<P>(
    () => (loaded ? (settled(loaded) as Promise<Loaded<P>>) : preload()),
    { loading }
  )
  return { Component, preload }
}
