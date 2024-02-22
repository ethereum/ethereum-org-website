/* eslint-disable react/jsx-key */
import React from "react"
import { createIcon } from "@chakra-ui/react"

export const EthTokenIcon = createIcon({
  displayName: "ETH Token Icon",
  viewBox: "0 0 30 30",
  defaultProps: {
    width: 30,
    height: 30,
    fill: "none",
  },
  path: [
    <circle cx="15" cy="15" r="15" fill="var(--eth-colors-primary-hover)" />,
    <path
      d="M20.87 15.1868L14.9371 5L9 15.1868L14.9371 18.8115L20.87 15.1868Z"
      fill="var(--eth-colors-background-base)"
    />,
    <path
      d="M14.9996 25L20.9366 16.3523L14.9996 19.977L9.0625 16.3523L14.9996 25Z"
      fill="var(--eth-colors-background-base)"
    />,
  ],
})

export const EthTokenIconGrayscale = createIcon({
  displayName: "ETH Token Icon Grayscale",
  viewBox: "0 0 30 30",
  defaultProps: {
    width: 30,
    height: 30,
    fill: "none",
  },
  path: [
    <circle cx="15" cy="15" r="15" fill="var(--eth-colors-body-light)" />,
    <path
      d="M20.87 15.1868L14.9371 5L9 15.1868L14.9371 18.8115L20.87 15.1868Z"
      fill="var(--eth-colors-body-medium)"
    />,
    <path
      d="M14.9996 25L20.9366 16.3523L14.9996 19.977L9.0625 16.3523L14.9996 25Z"
      fill="var(--eth-colors-body-medium)"
    />,
  ],
})
