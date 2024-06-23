import { addons } from "@storybook/manager-api"

import favicon from "../public/images/favicon.png"

import theme from "./theme"

addons.setConfig({
  theme,
})

// In order to override the default favicon, and inject a data hash link to the png
const link = document.createElement("link")
link.setAttribute("rel", "shortcut icon")
link.setAttribute("href", favicon.src)
document.head.appendChild(link)
