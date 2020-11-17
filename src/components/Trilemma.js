import React, { useEffect, useState } from "react"
import styled from "styled-components"

import Card from "./Card"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const H2 = styled.h2`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0px;
`

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem;
  padding: 2rem 0rem;
  flex: 1 1 100%;
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 0 1 500px;
  }
`

const Triangle = styled.svg`
  margin-right: 8rem;
  margin-top: 8rem;
  fill: ${(props) => props.theme.colors.background};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    align-self: center;
    margin-top: 0rem;
    margin-right: 2rem;
  }
`

const Path = styled.path`
  stroke: ${(props) => props.theme.colors.border};
  stroke-width: 2px;
`

const Text = styled.text`
  fill: ${(props) =>
    props.isActive
      ? props.theme.colors.primary400
      : props.theme.colors.text200};
  font-weight: ${(props) => (props.isActive ? 700 : 500)};
  opacity: ${(props) => (props.isActive ? 1.0 : 0.6)};
  font-size: 1.4rem;
  text-transform: uppercase;
`

const CircleSelect = styled.g`
  cursor: pointer;
`

const FillCircle = styled.circle`
  fill: ${(props) =>
    props.isActive
      ? props.isEth2
        ? props.theme.colors.primary300
        : props.theme.colors.primary
      : props.theme.colors.background};
  &:hover {
    fill: ${(props) =>
      props.isActive
        ? props.theme.colors.primary
        : props.theme.colors.primary100};
  }
`

// Set min-height to prevent "jump" when copy changes
const ExplanationCard = styled(Card)`
  h3 {
    margin-top: 0;
  }
  p {
    margin-bottom: 0;
  }
  min-height: 300px;
  margin-top: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    min-height: 248px;
  }
`

const Trilemma = () => {
  const [state, setState] = useState({
    isDecentralizedAndSecure: false,
    isDecentralizedAndScalable: false,
    isScalableAndSecure: false,
    isMobile: false,
  })

  useEffect(() => {
    const clientWidth = document.documentElement.clientWidth
    setState({ ...state, isMobile: clientWidth < 400 })
  }, [])

  const handleClick = (selection) => {
    if (selection === "isEth2") {
      setState({
        isDecentralizedAndSecure: true,
        isDecentralizedAndScalable: true,
        isScalableAndSecure: true,
        isMobile: state.isMobile,
      })
    } else if (selection === "isDecentralizedAndSecure") {
      setState({
        isDecentralizedAndSecure: true,
        isDecentralizedAndScalable: false,
        isScalableAndSecure: false,
        isMobile: state.isMobile,
      })
    } else if (selection === "isDecentralizedAndScalable") {
      setState({
        isDecentralizedAndSecure: false,
        isDecentralizedAndScalable: true,
        isScalableAndSecure: false,
        isMobile: state.isMobile,
      })
    } else if (selection === "isScalableAndSecure") {
      setState({
        isDecentralizedAndSecure: false,
        isDecentralizedAndScalable: false,
        isScalableAndSecure: true,
        isMobile: state.isMobile,
      })
    }
  }

  const isDecentralized =
    state.isDecentralizedAndScalable || state.isDecentralizedAndSecure
  const isScalable =
    state.isDecentralizedAndScalable || state.isScalableAndSecure
  const isSecure = state.isScalableAndSecure || state.isDecentralizedAndSecure
  const isEth2 = isDecentralized && isScalable && isSecure

  let cardTitle = "Explore the scalability trilemma"
  let cardText =
    "Press the buttons on the triangle to better understand the problems of decentralized scaling."
  if (isEth2) {
    cardTitle = "Eth2 upgrades and decentralized scaling"
    cardText =
      "The Eth2 upgrades will make Ethereum scalable, secure, and decentralized. Sharding will make Ethereum more scalable by increasing transactions per second while decreasing the power needed to run a node and validate the chain. The beacon chain will make Ethereum secure by co-ordinating validators across shards. And staking will lower the barrier to participation, creating a larger – more decentralized – network."
  } else if (state.isDecentralizedAndSecure) {
    cardTitle = "Secure and decentralized"
    cardText =
      "Secure and decentralized blockchain networks require every node to verify every transaction processed by the chain. This amount of work limits the number of transactions that can happen at any one given time. Decentralized and secure reflects the Ethereum chain today."
  } else if (state.isDecentralizedAndScalable) {
    cardTitle = "Decentralized and scalable"
    cardText =
      "Dececentralized networks work by sending information about transactions across nodes – the whole network needs to know about any state change. Scaling transactions per second across a decentralized network poses security risks because the more transactions, the longer the delay, the higher the probability of attack while information is in flight."
  } else if (state.isScalableAndSecure) {
    cardTitle = "Scalable and secure"
    cardText =
      "Increasing the size and power of Ethereum’s nodes could increase transactions per second in a secure way, but the hardware requirement would restrict who could do it – this threatens decentralization. It's hoped that sharding and proof-of-stake will allow Ethereum to scale by increasing the amount of nodes, not node size."
  }
  return (
    <Container>
      <CardContainer>
        <H2>The challenge of decentralized scaling</H2>
        <p>
          A naive way to solve Ethereum's problems would be to make it more
          centralized. But decentralization is too important. It’s
          decentralization that gives Ethereum censorship resistance, openness,
          data privacy and near-unbreakable security.
        </p>
        <p>
          Ethereum’s vision is to be more scalable and secure, but also to
          remain decentralized. Achieving these 3 qualities is a problem known
          as the scalability trilemma.
        </p>
        <p>
          The Eth2 upgrades aim to solve the trilemma but there are significant
          challenges.
        </p>
        <ExplanationCard title={cardTitle} description={cardText} />
      </CardContainer>
      <Triangle
        width="540"
        height="620"
        viewBox={state.isMobile ? "-340 100 1280 1240" : "-100 100 810 915"}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Text x="460" y="150" isActive={isDecentralized}>
          Decentralization
        </Text>
        <Text x="-24" y="486" isActive={isSecure}>
          Security
        </Text>
        <Text x="540" y="835" isActive={isScalable}>
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
            isEth2={isEth2}
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
            isActive={isEth2}
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
            isEth2={isEth2}
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
            isEth2={isEth2}
            isActive={state.isDecentralizedAndScalable}
            stroke="black"
            strokeOpacity="0.12"
          />
        </CircleSelect>
        <Text x="400" y="540" isActive={isEth2}>
          Eth2
        </Text>
      </Triangle>
    </Container>
  )
}

export default Trilemma
