import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useIntl } from "gatsby-plugin-intl"

import { getDefaultMessage } from "../utils/translations"
import Translation from "../components/Translation"
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
  const intl = useIntl()
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

  let cardTitle = <Translation id="page-eth2-trilemma-title-1" />
  let cardText = <Translation id="page-eth2-trilemma-press-button" />
  if (isEth2) {
    cardTitle = <Translation id="page-eth2-trilemma-title-2" />
    cardText = <Translation id="page-eth2-trilemma-cardtext-1" />
  } else if (state.isDecentralizedAndSecure) {
    cardTitle = <Translation id="page-eth2-trilemma-title-3" />
    cardText = <Translation id="page-eth2-trilemma-cardtext-2" />
  } else if (state.isDecentralizedAndScalable) {
    cardTitle = <Translation id="page-eth2-trilemma-title-4" />
    cardText = <Translation id="page-eth2-trilemma-cardtext-3" />
  } else if (state.isScalableAndSecure) {
    cardTitle = <Translation id="page-eth2-trilemma-title-5" />
    cardText = <Translation id="page-eth2-trilemma-cardtext-4" />
  }
  return (
    <Container>
      <CardContainer>
        <H2>
          <Translation id="page-eth2-trilemma-h2" />
        </H2>
        <p>
          <Translation id="page-eth2-trilemma-p" />
        </p>
        <p>
          <Translation id="page-eth2-trilemma-p-1" />
        </p>
        <p>
          <Translation id="page-eth2-trilemma-p-2" />
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
          <Translation id="page-eth2-trilemma-text-1" />
        </Text>
        <Text x="-24" y="486" isActive={isSecure}>
          <Translation id="page-eth2-trilemma-text-2" />
        </Text>
        <Text x="540" y="835" isActive={isScalable}>
          <Translation id="page-eth2-trilemma-text-3" />
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
