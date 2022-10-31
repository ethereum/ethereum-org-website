/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from "react"

import type { GatsbySSR } from "gatsby"

import Layout from "./src/components/Layout"

import { Context } from "./src/types"
import { IS_DEV } from "./src/utils/env"
import { isLang } from "./src/utils/languages"

// Prevents <Layout/> from unmounting on page transitions
// https://www.gatsbyjs.com/docs/layout-components/#how-to-prevent-layout-components-from-unmounting
// @ts-ignore: returning `null` is not accepted by the `GatsbySSR` type def.
export const wrapPageElement: GatsbySSR<any, Context>["wrapPageElement"] = ({
  element,
  props,
}) => {
  const { location } = props
  const { pathname } = location

  const [, pathLocale] = pathname.split("/")

  // this is to avoid having hydration issues on dev mode. Check the logic
  // inside gatsby-browser.tsx
  if (IS_DEV && !isLang(pathLocale)) {
    return null
  }

  return <Layout {...props}>{element}</Layout>
}
