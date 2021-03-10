/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from "react"
import Layout from "./src/components/Layout"

import Prism from "prism-react-renderer/prism"
;(typeof global !== "undefined" ? global : window).Prism = Prism

// FormatJS Polyfill imports - Used for intl number formatting
require("@formatjs/intl-locale/polyfill")
require("@formatjs/intl-numberformat/polyfill")
require("@formatjs/intl-numberformat/locale-data/en")

// Default languages included:
// https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js
require("prismjs/components/prism-solidity")

// Prevents <Layout/> from unmounting on page transitions
// https://www.gatsbyjs.com/docs/layout-components/#how-to-prevent-layout-components-from-unmounting
export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
)
