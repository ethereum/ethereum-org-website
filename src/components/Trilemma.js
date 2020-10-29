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

const Path = styled.path`
  fill: ${(props) => props.theme.colors.background};
  stroke: ${(props) => props.theme.colors.border};
`

const Text = styled.text`
  fill: ${(props) =>
    props.isActive ? props.theme.colors.success : props.theme.colors.fail};
  font-size: 1.4rem;
`

const CircleSelect = styled.g`
  cursor: pointer;
`

const FillCircle = styled.circle`
  fill: ${(props) =>
    props.isActive
      ? props.theme.colors.success
      : props.theme.colors.background};
  &:hover {
    fill: ${(props) =>
      props.isActive
        ? props.theme.colors.success
        : props.theme.colors.success100};
  }
`

// Set min width to prevent "jump" when copy changes
const ExplanationCard = styled(Card)`
  min-height: 202px;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    min-height: 226px;
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
  const isDecentralized =
    state.isDecentralizedAndScalable || state.isDecentralizedAndSecure
  const isScalable =
    state.isDecentralizedAndScalable || state.isScalableAndSecure
  const isSecure = state.isScalableAndSecure || state.isDecentralizedAndSecure
  return (
    <Container>
      <CardContainer>
        <ExplanationCard title={cardText} />
      </CardContainer>
      <Triangle
        width="540"
        height="620"
        viewBox="-100 100 810 915"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Text x="500" y="150" isActive={isDecentralized}>
          Decentralization
        </Text>
        <Text x="0" y="480" isActive={isSecure}>
          Security
        </Text>
        <Text x="570" y="830" isActive={isScalable}>
          Scalability
        </Text>
        <Path
          d="M111.183 479.532L566.904 181.217L598.824 787.211L111.183 479.532Z"
          strokeWidth="2"
        />
        <Path
          d="M111.183 479.532L566.904 181.217L598.824 787.211L111.183 479.532Z"
          strokeWidth="2"
        />
        <Path
          d="M111.183 479.532L566.904 181.217L598.824 787.211L111.183 479.532Z"
          strokeWidth="2"
        />
        <CircleSelect onClick={() => handleClick("isDecentralizedAndSecure")}>
          <circle
            cx="337.5"
            cy="326.5"
            r="27"
            fill="white"
            stroke="black"
            strokeOpacity="0.12"
          />
          <FillCircle
            cx="337.5"
            cy="326.5"
            r="21"
            isActive={state.isDecentralizedAndSecure}
            stroke="black"
            strokeOpacity="0.12"
          />
        </CircleSelect>
        <CircleSelect onClick={() => handleClick("isScalableAndSecure")}>
          <circle
            cx="321.5"
            cy="611.501"
            r="27"
            fill="white"
            stroke="black"
            strokeOpacity="0.12"
          />
          <FillCircle
            cx="321.5"
            cy="611.501"
            r="21"
            isActive={state.isScalableAndSecure}
            stroke="black"
            strokeOpacity="0.12"
          />
        </CircleSelect>
        <CircleSelect onClick={() => handleClick("isDecentralizedAndScalable")}>
          <circle
            cx="582.5"
            cy="460.5"
            r="27"
            fill="white"
            stroke="black"
            strokeOpacity="0.12"
          />
          <FillCircle
            cx="582.5"
            cy="460.5"
            r="21"
            isActive={state.isDecentralizedAndScalable}
            stroke="black"
            strokeOpacity="0.12"
          />
        </CircleSelect>
      </Triangle>
    </Container>
  )
}

export default Trilemma
