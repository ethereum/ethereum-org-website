import React, { useState } from "react"
import styled from "styled-components"

import Card from "./Card"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
  flex: 1 1 100%;
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 0 1 500px;
  }
`

const Triangle = styled.svg`
  margin-left: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    align-self: center;
    margin-top: 4rem;
  }
`

const Trilemma = () => {
  const [state, setState] = useState({
    isDecentralizedAndSecure: true,
    isDecentralizedAndScalable: false,
    isScalableAndSecure: false,
  })

  const handleClick = (selection) => {
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

  const cardText = state.isDecentralizedAndSecure
    ? "If you want decentralization and security, it’s hard to get scalability. That’s basically where we’re at with Ethereum today."
    : state.isDecentralizedAndScalable
    ? "It’s difficult to scale in a decentralized way while maintaing security because..."
    : "Increasing the size of Ethereum’s nodes could help Ethereum scale and be secure, but the hardware requirement would restrict  who could do it – this threatens decentralization."
  return (
    <Container>
      <CardContainer>
        <Card title={cardText} />
      </CardContainer>
      <Triangle
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
            strokeWidth="2"
          />
        </g>
        <path
          d="M111.183 479.532L566.904 181.217L598.824 787.211L111.183 479.532Z"
          fill="white"
        />
        <path
          d="M111.183 479.532L566.904 181.217L598.824 787.211L111.183 479.532Z"
          stroke="white"
          strokeWidth="2"
        />
        <path
          d="M111.183 479.532L566.904 181.217L598.824 787.211L111.183 479.532Z"
          stroke="black"
          strokeOpacity="0.12"
          strokeWidth="2"
        />
        <g onClick={() => handleClick("isDecentralizedAndSecure")}>
          <circle
            cx="337.5"
            cy="326.5"
            r="27"
            fill="white"
            stroke="black"
            strokeOpacity="0.12"
          />
          <circle
            cx="337.5"
            cy="326.5"
            r="21"
            fill={state.isDecentralizedAndSecure ? "green" : "white"}
            stroke="black"
            strokeOpacity="0.12"
          />
        </g>
        <g onClick={() => handleClick("isDecentralizedAndScalable")}>
          <circle
            cx="321.5"
            cy="611.501"
            r="27"
            fill="white"
            stroke="black"
            strokeOpacity="0.12"
          />
          <circle
            cx="321.5"
            cy="611.501"
            r="21"
            fill={state.isDecentralizedAndScalable ? "green" : "white"}
            stroke="black"
            strokeOpacity="0.12"
          />
        </g>
        <g onClick={() => handleClick("isScalableAndSecure")}>
          <circle
            cx="582.5"
            cy="460.5"
            r="27"
            fill="white"
            stroke="black"
            strokeOpacity="0.12"
          />
          <circle
            cx="582.5"
            cy="460.5"
            r="21"
            fill={state.isScalableAndSecure ? "green" : "white"}
            stroke="black"
            strokeOpacity="0.12"
          />
        </g>
      </Triangle>
    </Container>
  )
}

export default Trilemma
