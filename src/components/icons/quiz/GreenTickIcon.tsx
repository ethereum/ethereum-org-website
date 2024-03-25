import * as React from "react"
import { createIcon } from "@chakra-ui/react"

export const GreenTickIcon = createIcon({
  displayName: "GreenTickIcon",
  viewBox: "0 0 16 16",
  path: (
    <g>
      <rect width={16} height={16} fill="#c8f7d8" rx={8} />
      <path
        fill="#0a7146"
        d="M7.446 11.641 4 8.567l1.214-1.539 2.232 1.539 3.408-3.848 1.646.989-5.054 5.933Z"
      />
    </g>
  ),
})
