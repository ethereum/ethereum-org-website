/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from "react"
import browserLang from "browser-lang"
import { withPrefix, GatsbyBrowser } from "gatsby"

import Prism from "prism-react-renderer/prism"
;(typeof global !== "undefined" ? global : window).Prism = Prism

// FormatJS Polyfill imports - Used for intl number formatting
import "@formatjs/intl-locale/polyfill"
import "@formatjs/intl-numberformat/polyfill"
import "@formatjs/intl-numberformat/locale-data/en"

import Layout from "./src/components/Layout"
import {
  supportedLanguages,
  defaultLanguage,
  isLang,
} from "./src/utils/languages"
import { Context } from "./src/types"

// Default languages included:
// https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js
require("prismjs/components/prism-solidity")

// Prevents <Layout/> from unmounting on page transitions
// https://www.gatsbyjs.com/docs/layout-components/#how-to-prevent-layout-components-from-unmounting
export const wrapPageElement: GatsbyBrowser<
  any,
  Context
>["wrapPageElement"] = ({ element, props }) => {
  const { location, pageContext } = props
  const { pathname, search } = location
  const { originalPath } = pageContext

  const [, pathLocale] = pathname.split("/")

  // client side redirect on paths that don't have a locale in them. Most useful
  // on dev env where we don't have server redirects
  if (!isLang(pathLocale)) {
    let detected =
      window.localStorage.getItem("eth-org-language") ||
      browserLang({
        languages: supportedLanguages,
        fallback: defaultLanguage,
      })

    if (!isLang(detected)) {
      detected = defaultLanguage
    }

    const queryParams = search || ""
    const newUrl = withPrefix(`/${detected}${originalPath}${queryParams}`)
    window.localStorage.setItem("eth-org-language", detected)
    window.location.replace(newUrl)

    // can't return null here, must return an element
    return <div />
  }

  return <Layout {...props}>{element}</Layout>
}
