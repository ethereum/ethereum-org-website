import { addons } from "@storybook/manager-api"

import theme from "./theme"

addons.setConfig({
  theme,
})

// In order to override the default favicon, and inject a data hash link to the png
const link = document.createElement("link")
link.setAttribute("rel", "shortcut icon")
document.head.appendChild(link)
