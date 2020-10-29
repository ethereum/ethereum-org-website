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
        <g>
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
        <g>
          <circle
            cx="337.5"
            cy="326.5"
            r="27"
            fill="white"
            stroke="black"
            stroke-opacity="0.12"
          />
          <circle
            cx="337.5"
            cy="326.5"
            r="21"
            stroke="black"
            stroke-opacity="0.12"
          />
        </g>
        <g>
          <circle
            cx="321.5"
            cy="611.501"
            r="27"
            fill="white"
            stroke="black"
            stroke-opacity="0.12"
          />
          <circle
            cx="321.5"
            cy="611.501"
            r="21"
            fill="white"
            stroke="black"
            stroke-opacity="0.12"
          />
        </g>
        <g>
          <circle
            cx="582.5"
            cy="460.5"
            r="27"
            fill="white"
            stroke="black"
            stroke-opacity="0.12"
          />
          <circle
            cx="582.5"
            cy="460.5"
            r="21"
            fill="white"
            stroke="black"
            stroke-opacity="0.12"
          />
        </g>
      </svg>
    </Container>
  )
}

export default Triangle
