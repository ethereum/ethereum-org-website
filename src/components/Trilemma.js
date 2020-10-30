import React, { useState } from "react"
import styled from "styled-components"

import Card from "./Card"

const Container = styled.div`
  display: flex;
  margin: 2rem -4rem;
  justify-content: space-between;
  align-items: flex-start;
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
  margin-right: 12rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    align-self: center;
    margin-top: 4rem;
  }
`

const Path = styled.path`
  fill: ${(props) => props.theme.colors.background};
  stroke: ${(props) => props.theme.colors.border};
  stroke-width: 2px;
`

const Text = styled.text`
  fill: ${(props) =>
    props.isActive ? props.theme.colors.primary : props.theme.colors.text300};
  opacity: ${(props) => (props.isActive ? 1.0 : 0.4)};
  font-size: 1.4rem;
  text-transform: uppercase;
`

const CircleSelect = styled.g`
  cursor: pointer;
`

const Label = styled.div`
  display: flex;
`

const FillCircle = styled.circle`
  fill: ${(props) =>
    props.isActive
      ? props.theme.colors.primary
      : props.theme.colors.background};
  &:hover {
    fill: ${(props) =>
      props.isActive
        ? props.theme.colors.primary
        : props.theme.colors.primary100};
  }
`

// Set min width to prevent "jump" when copy changes
const ExplanationCard = styled(Card)`
  min-height: 202px;;
  margin: 6rem 6rem;
  margin-right: -2rem;
/*   box-shadow: ${(props) => props.theme.colors.tableBoxShadow}; */
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    min-height: 226px;
  }
`

const Trilemma = () => {
  const [state, setState] = useState({
    isDecentralizedAndSecure: false,
    isDecentralizedAndScalable: false,
    isScalableAndSecure: false,
    isEth2: true,
  })

  const handleClick = (selection) => {
    if (selection === "isDecentralizedAndSecure") {
      setState({
        isDecentralizedAndSecure: true,
        isDecentralizedAndScalable: false,
        isScalableAndSecure: false,
        isEth2: false,
      })
    }
    if (selection === "isEth2") {
      setState({
        isDecentralizedAndSecure: false,
        isDecentralizedAndScalable: false,
        isScalableAndSecure: false,
        isEth2: true,
      })
    }
    if (selection === "isDecentralizedAndScalable") {
      setState({
        isDecentralizedAndSecure: false,
        isDecentralizedAndScalable: true,
        isScalableAndSecure: false,
        isEth2: false,
      })
    }
    if (selection === "isScalableAndSecure") {
      setState({
        isDecentralizedAndSecure: false,
        isDecentralizedAndScalable: false,
        isScalableAndSecure: true,
        isEth2: false,
      })
    }
  }

  const cardText = state.isDecentralizedAndSecure
    ? "Secure and decentralized blockchain networks require every node to verify every transaction processed by the chain. This amount of work limits the number of transactions that can happen at any one given time. Decentralized and secure reflects the Ethereum chain today."
    : state.isDecentralizedAndScalable
    ? "Dececentralized networks work by sending information about transactions across nodes – the whole network needs to know about any state change. Scaling transactions per second across a decentralized network poses security risks because the more transactions, the longer the delay, the higher the probability of attack while information is in flight."
    : state.isScalableAndSecure
    ? "Increasing the size and power of Ethereum’s nodes could increase transactions per second in a secure way, but the hardware requirement would restrict who could do it – this threatens decentralization. It's hoped that sharding and proof-of-stake will allow Ethereum to scale by increasing the amount of nodes, not node size."
    : state.isEth2
    ? "The Eth2 upgrades will make Ethereum scalable, secure, and decentralized. Sharding will make Ethereum more scalable by increasing transactions per second while decreasing the power needed to run a node and validate the chain. The beacon chain will make Ethereum secure by cleverly co-ordinating validators across shards. And staking will lower the barrier to participation, creating a larger – more decentralized – network."
    : "Press the buttons on the triangle"

  const isDecentralized =
    state.isDecentralizedAndScalable || state.isDecentralizedAndSecure
  const isScalable =
    state.isDecentralizedAndScalable || state.isScalableAndSecure
  const isSecure = state.isScalableAndSecure || state.isDecentralizedAndSecure
  const isEth2 =
    state.isDecentralizedAndScalable ||
    state.isDecentralizedAndSecure ||
    state.isScalableAndSecure
  return (
    <div>
      <Container>
        <CardContainer>
          <ExplanationCard emoji=":thinking_face:" description={cardText} />
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
          <Text x="400" y="540" isActive={isEth2}>
            Eth2
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
          <CircleSelect onClick={() => handleClick("isEth2")}>
            <circle
              cx="400"
              cy="480"
              r="27"
              fill="white"
              stroke="black"
              strokeOpacity="0.12"
            />
            <FillCircle
              cx="400"
              cy="480"
              r="21"
              isActive={state.isEth2}
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
          <CircleSelect
            onClick={() => handleClick("isDecentralizedAndScalable")}
          >
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
    </div>
  )
}

export default Trilemma
