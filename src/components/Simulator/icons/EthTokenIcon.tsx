/* eslint-disable react/jsx-key */
import React from "react"

import { createIconBase } from "@/components/icons/icon-base"

export const EthTokenIcon = createIconBase({
  displayName: "ETHTokenIcon",
  viewBox: "0 0 30 30",
  className: "text-3xl/none fill-none",
  children: (
    <>
      <circle cx="15" cy="15" r="15" fill="var(--eth-colors-primary-hover)" />
      <path
        d="M20.87 15.1868L14.9371 5L9 15.1868L14.9371 18.8115L20.87 15.1868Z"
        fill="var(--eth-colors-background-base)"
      />

      <path
        d="M14.9996 25L20.9366 16.3523L14.9996 19.977L9.0625 16.3523L14.9996 25Z"
        fill="var(--eth-colors-background-base)"
      />
    </>
  ),
})

export const EthTokenIconGrayscale = createIconBase({
  displayName: "ETHTokenIconGrayscale",
  viewBox: "0 0 30 30",
  className: "text-3xl/none fill-none",
  children: (
    <>
      <circle cx="15" cy="15" r="15" fill="#fff" />
      <path
        d="M20.87 15.1868L14.9371 5L9 15.1868L14.9371 18.8115L20.87 15.1868Z"
        fill="var(--eth-colors-primary-action)"
      />
      <path
        d="M14.9996 25L20.9366 16.3523L14.9996 19.977L9.0625 16.3523L14.9996 25Z"
        fill="var(--eth-colors-primary-action)"
      />
    </>
  ),
})
