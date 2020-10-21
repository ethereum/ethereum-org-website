import React from "react"
import Layout from "./src/components/Layout"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"

import Prism from "prism-react-renderer/prism"
;(typeof global !== "undefined" ? global : window).Prism = Prism

require("prismjs/components/prism-solidity")

// TODO move captcha? Appears on every page...
export const wrapPageElement = ({ element, props }) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LecpNkZAAAAAMhLfdITKvtW-RaSM8H5uTJ29rj7">
      <Layout {...props}>{element}</Layout>
    </GoogleReCaptchaProvider>
  )
}
