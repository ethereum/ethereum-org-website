/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from "react"

import type { RenderBodyArgs } from "gatsby"

export const onRenderBody = ({ setHeadComponents }: RenderBodyArgs) => {
  setHeadComponents([
    <link
      rel="preload"
      href="/fonts/Inter-Regular.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="interFont"
    />,
    <link
      rel="preload"
      href="/fonts/Inter-Regular.woff"
      as="font"
      type="font/woff"
      crossOrigin="anonymous"
      key="interFont"
    />,
    <link
      rel="preload"
      href="/fonts/IBMPlexMono-Regular.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="interFont"
    />,
  ])
}
