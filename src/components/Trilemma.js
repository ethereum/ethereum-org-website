import React, { useState } from "react"
import styled from "styled-components"

import Card from "./Card"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

const SVG = styled.svg`
  width: 100%;
  height: 100%;
`

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
`

const Circle = () => {
  const [isActive, toggleIsActive] = useState(false)
  const handleClick = () => {
    console.log("handleClick")
    toggleIsActive(!isActive)
  }
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleClick}
    >
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="black"
        strokeOpacity="0.12"
        fill={isActive ? "red" : "white"}
      />
    </svg>
  )
}

const Triangle = () => {
  const [state, setState] = useState({
    isDecentralizedAndSecure: true,
    isDecentralizedAndScalable: false,
    isScalableAndSecure: false,
  })

  const handleClick = (selection) => {
    console.log("handleClick")
    if (selection === "isDecentralizedAndSecure") {
      setState({
        isDecentralizedAndSecure: true,
        isDecentralizedAndScalable: false,
        isScalableAndSecure: false,
      })
    } else if (selection === "isDecentralizedAndScalable") {
      setState({
        isDecentralizedAndSecure: false,
        isDecentralizedAndScalable: true,
        isScalableAndSecure: false,
      })
    } else {
      setState({
        isDecentralizedAndSecure: false,
        isDecentralizedAndScalable: false,
        isScalableAndSecure: true,
      })
    }
  }

  // return (
  //   <Container>
  //     <Circle />
  //   </Container>
  // )

  return (
    <Container>
      <CardContainer>
        <Card title="If you want decentralization and security, it’s hard to get scalability. That’s basically where we’re at with Ethereum today." />
      </CardContainer>
      <svg
        width="540"
        height="620"
        viewBox="100 170 702 806"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f)">
          <line
            x1="111.451"
            y1="480.165"
            x2="568.451"
            y2="180.165"
            stroke="url(#paint0_radial)"
            stroke-width="2"
          />
        </g>
        <path
          d="M111.183 479.532L566.904 181.217L598.824 787.211L111.183 479.532Z"
          fill="white"
        />
        <path
          d="M111.183 479.532L566.904 181.217L598.824 787.211L111.183 479.532Z"
          stroke="white"
          stroke-width="2"
        />
        <path
          d="M111.183 479.532L566.904 181.217L598.824 787.211L111.183 479.532Z"
          stroke="black"
          stroke-opacity="0.12"
          stroke-width="2"
        />
        <g filter="url(#filter1_ddd)">
          <circle cx="337.5" cy="326.5" r="27" stroke="white" />
          <circle
            cx="337.5"
            cy="326.5"
            r="27"
            stroke="black"
            stroke-opacity="0.12"
          />
        </g>
        <circle cx="321.5" cy="611.501" r="27" stroke="white" />
        <circle
          cx="321.5"
          cy="611.501"
          r="27"
          stroke="black"
          stroke-opacity="0.12"
        />
        <circle cx="582.5" cy="460.5" r="27" stroke="white" />
        <circle
          cx="582.5"
          cy="460.5"
          r="27"
          stroke="black"
          stroke-opacity="0.12"
        />
        <circle cx="337.5" cy="326.5" r="21" fill="white" />
        <circle cx="337.5" cy="326.5" r="21" stroke="white" />
        <circle
          cx="337.5"
          cy="326.5"
          r="21"
          stroke="black"
          stroke-opacity="0.12"
        />
        <circle cx="321.5" cy="611.501" r="21" fill="white" />
        <circle cx="321.5" cy="611.501" r="21" stroke="white" />
        <circle
          cx="321.5"
          cy="611.501"
          r="21"
          stroke="black"
          stroke-opacity="0.12"
        />
        <circle cx="582.5" cy="460.5" r="21" fill="white" />
        <circle cx="582.5" cy="460.5" r="21" stroke="white" />
        <circle
          cx="582.5"
          cy="460.5"
          r="21"
          stroke="black"
          stroke-opacity="0.12"
        />
        <defs>
          <filter
            id="filter0_f"
            x="102.902"
            y="171.329"
            width="474.098"
            height="317.672"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur stdDeviation="4" result="effect1_foregroundBlur" />
          </filter>
          <filter
            id="filter1_ddd"
            x="244"
            y="247"
            width="187"
            height="187"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy="14" />
            <feGaussianBlur stdDeviation="33" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy="10" />
            <feGaussianBlur stdDeviation="8.5" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"
            />
            <feBlend
              mode="normal"
              in2="effect1_dropShadow"
              result="effect2_dropShadow"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="3.5" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
            />
            <feBlend
              mode="normal"
              in2="effect2_dropShadow"
              result="effect3_dropShadow"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect3_dropShadow"
              result="shape"
            />
          </filter>
          <radialGradient
            id="paint0_radial"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(418.304 280.624) rotate(-33.3361) scale(252.985 0.832522)"
          >
            <stop stop-color="#E6E6F7" />
            <stop offset="0.5" stop-color="#E7EDFA" />
            <stop offset="1" stop-color="#E9FBFA" />
          </radialGradient>
        </defs>
      </svg>
    </Container>
  )
}

export default Triangle
