import { addons } from "@storybook/addons"
import theme from "./theme"
import favicon from "../src/assets/favicon.png"

addons.setConfig({
  theme,
})

const link = document.createElement("link")
link.setAttribute("rel", "shortcut icon")
link.setAttribute("href", favicon)
document.head.appendChild(link)
