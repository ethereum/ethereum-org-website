/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import Prism from "prism-react-renderer/prism"
;(typeof global !== "undefined" ? global : window).Prism = Prism

// FormatJS Polyfill imports - Used for intl number formatting
import "@formatjs/intl-locale/polyfill"
import "@formatjs/intl-numberformat/polyfill"
import "@formatjs/intl-numberformat/locale-data/en"

// Default languages included:
// https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js
require("prismjs/components/prism-solidity")
