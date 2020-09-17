/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from "react"
import Layout from "./src/components/Layout"

import Prism from "prism-react-renderer/prism"
;(typeof global !== "undefined" ? global : window).Prism = Prism

require("prismjs/components/prism-solidity")

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
