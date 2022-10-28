/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from "react"
import { GatsbyBrowser } from "gatsby"

import Prism from "prism-react-renderer/prism"
;(typeof global !== "undefined" ? global : window).Prism = Prism

// FormatJS Polyfill imports - Used for intl number formatting
import "@formatjs/intl-locale/polyfill"
import "@formatjs/intl-numberformat/polyfill"
import "@formatjs/intl-numberformat/locale-data/en"

import Layout from "./src/components/Layout"
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
  const newElement = React.cloneElement(
    element, // I18nextProvider
    element.props,
    React.cloneElement(
      element.props.children, // I18nextContext.Provider
      element.props.children.props,
      React.createElement(Layout, props, element.props.children.props.children)
    )
  )

  return newElement
}
