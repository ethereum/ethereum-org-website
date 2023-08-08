import React from "react"
import { createIcon } from "@chakra-ui/react"

const [w, h] = [40, 40]
export const ConnectWeb3Icon = createIcon({
  displayName: "EthWalletIcon",
  viewBox: `0 0 ${w} ${h}`,
  defaultProps: {
    width: `${w}px`,
    height: `${h}px`,
  },
  path: [
    <rect
      x="5"
      y="1"
      width="30"
      height="38"
      stroke="currentColor"
      strokeWidth="2"
      fill="transparent"
    />,
    <rect x="15" y="30" width="11" height="2" fill="currentColor" />,
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M36 0.25H27V7.25H36V0.25ZM32.5276 1.9873L31.2287 3.28641L29.8441 2.08031L29.1873 2.83436L30.52 3.99526L29.2704 5.24511L29.9775 5.95216L31.2759 4.65362L32.6611 5.8602L33.3179 5.10614L31.9846 3.94478L33.2348 2.69435L32.5276 1.9873Z"
      fill="currentColor"
    />,
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M33.2045 1.25L34.649 2.69422L33.4491 3.89431L34.7287 5.0089L33.6477 6.25H35V1.25H33.2045ZM31.8507 1.25H30.4133L31.1816 1.9192L31.8507 1.25ZM29.2411 1.25H28V2.67489L29.2411 1.25ZM28 3.12638V5.10137L29.0555 4.04573L28 3.12638ZM30.52 3.99526L29.2704 5.24511L29.9775 5.95216L31.2759 4.65362L32.6611 5.8602L33.3179 5.10614L31.9846 3.94478L33.2348 2.69435L32.5276 1.9873L31.2287 3.28641L29.8441 2.08031L29.1873 2.83436L30.52 3.99526ZM31.323 6.02083L31.0938 6.25H31.5861L31.323 6.02083ZM27 7.25V0.25H36V7.25H27ZM28 6.25H28.8611L28 5.38905V6.25Z"
      fill="currentColor"
    />,
    <line x1="34" y1="7" x2="4" y2="7" stroke="currentColor" strokeWidth="2" />,
    <g clipPath="url(#clip0_6087_6769)">
      <path
        d="M23.9583 19.3672L20.25 13L16.5391 19.3672L20.25 21.6328L23.9583 19.3672Z"
        fill="currentColor"
      />
      <path
        d="M20.25 25.5001L23.9609 20.0948L20.25 22.3605L16.5391 20.0948L20.25 25.5001Z"
        fill="currentColor"
      />
    </g>,
    <defs>
      <clipPath id="clip0_6087_6769">
        <rect
          width="12.5"
          height="12.5"
          fill="white"
          transform="translate(14 13)"
        />
      </clipPath>
    </defs>,
  ],
})
