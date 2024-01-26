/* eslint-disable react/jsx-key */
import { createIcon } from "@chakra-ui/react"

export const CautionProductGlyphIcon = createIcon({
  displayName: "CautionProductGlyphIcon",
  viewBox: "0 0 24 24",
  defaultProps: {
    width: "24px",
    height: "24px",
  },
  path: [
    <circle cx="12" cy="12" r="12" fill="#C19830" />,
    <path d="M12 6L18 17H6L12 6Z" fill="white" />,
    <path d="M12 6L18 17H6L12 6Z" fill="white" />,
  ],
})
