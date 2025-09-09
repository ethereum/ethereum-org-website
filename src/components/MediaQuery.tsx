"use client"

import { type ReactNode } from "react"

import { useMediaQuery } from "@/hooks/useMediaQuery"

type MediaQueryChildren =
  | ((args: { matches: boolean[]; any: boolean }) => ReactNode)
  | ReactNode

type MediaQueryProps = {
  /**
   * Array of CSS media query strings, e.g. ["(min-width: 768px)"]
   */
  queries: string[]
  /**
   * Optional SSR fallbacks for each query. If omitted, defaults to false.
   */
  fallbackMatches?: boolean[]
  /**
   * Either render props or slot children
   */
  children: MediaQueryChildren
}

const MediaQuery = ({
  queries,
  fallbackMatches,
  children,
}: MediaQueryProps) => {
  const matches = useMediaQuery(queries, fallbackMatches)
  const any = matches.some(Boolean)

  if (typeof children === "function") {
    return <>{children({ matches, any })}</>
  }

  return <>{any ? children : null}</>
}

export default MediaQuery
