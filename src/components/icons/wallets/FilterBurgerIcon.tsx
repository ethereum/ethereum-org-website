/* eslint-disable react/jsx-key */
import * as React from "react"
import { createIcon } from "@chakra-ui/react"

export const FilterBurgerIcon = createIcon({
  displayName: "FilterBurgerIcon",
  viewBox: "0 0 24 24",
  defaultProps: {
    width: "24px",
    height: "24px",
    stroke: "#FF8D22",
    fill: "none",
  },
  path: [
    <line
      x1="5.96425"
      y1="8.60716"
      x2="18.0357"
      y2="8.60716"
      strokeWidth="1.64286"
      strokeLinecap="round"
    />,
    <line
      x1="10.2499"
      y1="17.1786"
      x2="13.7499"
      y2="17.1786"
      strokeWidth="1.64286"
      strokeLinecap="round"
    />,
    <line
      x1="7.67861"
      y1="12.8929"
      x2="16.3215"
      y2="12.8929"
      strokeWidth="1.64286"
      strokeLinecap="round"
    />,
    <circle cx="12" cy="12" r="11.5893" strokeWidth="0.821429" />,
  ],
})
