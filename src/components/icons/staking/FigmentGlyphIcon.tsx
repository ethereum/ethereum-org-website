/* eslint-disable react/jsx-key */
import { createIcon } from "@chakra-ui/react"

export const FigmentGlyphIcon = createIcon({
  displayName: "FigmentGlyphIcon",
  viewBox: "0 0 32 32",
  defaultProps: {
    width: "32px",
    height: "32px",
    fill: "none",
  },
  path: [
    <rect width="32" height="32" fill="white" fillOpacity="0.2" />,
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.6731 9H11V24H13.7045V17.6537H21.2765V15.2381H13.7046V11.452H21.6731V9Z"
      fill="white"
    />,
  ],
})
