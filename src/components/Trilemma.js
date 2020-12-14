import React, { useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import Icon from "./Icon"
import { useIntl } from "gatsby-plugin-intl"

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
  margin: 2rem 0;
  padding: 2rem 0rem;
  flex: 1 1 100%;
  @media (min-width: ${(props) => props.theme.breakpoints.m}) {
    margin: 3rem;
  }
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 0 1 500px;
  }
`

const Triangle = styled.svg`
  margin-right: 8rem;
  margin-top: 8rem;
  fill: ${(props) => props.theme.colors.background};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
    margin: -4rem 0;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    width: 100%;
    margin: -7rem 0;
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
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    transform: translate(-80px, 0px);
    font-size: 2rem;
  }
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
    display: none;
  }
`

const MobileTip = styled.p`
  font-weight: 600;
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
`

const Mobile = styled.div`
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
`

const MobileModal = styled(motion.div)`
  position: fixed;
  background: #0005;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
`

const mobileModalVariants = {
  open: { display: "block" },
  closed: { display: "none" },
}

const SlidingContainer = styled(motion.div)`
  background: ${(props) => props.theme.colors.background};
  z-index: 101;
  position: fixed;
  left: 0;
  top: 100vh;
  margin: 0 auto;
  overflow: hidden;
  width: 100vw;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
`

const slidingContainerVariants = {
  closed: { y: 0, transition: { duration: 0.2 } },
  open: { y: `-100%`, transition: { duration: 0.3 } },
}

const MobileExplanationCard = styled(Card)`
  background: none;
  border: none;
  justify-content: flex-start;
  h3 {
    margin-top: 0;
  }
  p {
    margin-bottom: 0;
  }
  margin: 2rem 0;
`

const CloseIconContainer = styled.span`
  z-index: 102;
  position: absolute;
  cursor: pointer;
  top: 1.5rem;
  right: 1.5rem;

  & > svg {
    fill: ${(props) => props.theme.colors.text};
  }
`

const Trilemma = () => {
  const intl = useIntl()
  const [state, setState] = useState({
    isDecentralizedAndSecure: false,
    isDecentralizedAndScalable: false,
    isScalableAndSecure: false,
    mobileModalOpen: false,
  })

  const handleClick = (selection) => {
    if (selection === "isEth2") {
      setState({
        isDecentralizedAndSecure: true,
        isDecentralizedAndScalable: true,
        isScalableAndSecure: true,
        mobileModalOpen: true,
      })
    } else if (selection === "isDecentralizedAndSecure") {
      setState({
        isDecentralizedAndSecure: true,
        isDecentralizedAndScalable: false,
        isScalableAndSecure: false,
        mobileModalOpen: true,
      })
    } else if (selection === "isDecentralizedAndScalable") {
      setState({
        isDecentralizedAndSecure: false,
        isDecentralizedAndScalable: true,
        isScalableAndSecure: false,
        mobileModalOpen: true,
      })
    } else if (selection === "isScalableAndSecure") {
      setState({
        isDecentralizedAndSecure: false,
        isDecentralizedAndScalable: false,
        isScalableAndSecure: true,
        mobileModalOpen: true,
      })
    }
  }

  const handleModalClose = () => {
    setState({
      ...state,
      mobileModalOpen: false,
    })
  }

  const isDecentralized =
    state.isDecentralizedAndScalable || state.isDecentralizedAndSecure
  const isScalable =
    state.isDecentralizedAndScalable || state.isScalableAndSecure
  const isSecure = state.isScalableAndSecure || state.isDecentralizedAndSecure
  const isEth2 = isDecentralized && isScalable && isSecure

  let cardTitle = <Translation id="page-eth2-vision-trilemma-title-1" />
  let cardText = <Translation id="page-eth2-vision-trilemma-press-button" />
  if (isEth2) {
    cardTitle = <Translation id="page-eth2-vision-trilemma-title-2" />
    cardText = <Translation id="page-eth2-vision-trilemma-cardtext-1" />
  } else if (state.isDecentralizedAndSecure) {
    cardTitle = <Translation id="page-eth2-vision-trilemma-title-3" />
    cardText = <Translation id="page-eth2-vision-trilemma-cardtext-2" />
  } else if (state.isDecentralizedAndScalable) {
    cardTitle = <Translation id="page-eth2-vision-trilemma-title-4" />
    cardText = <Translation id="page-eth2-vision-trilemma-cardtext-3" />
  } else if (state.isScalableAndSecure) {
    cardTitle = <Translation id="page-eth2-vision-trilemma-title-5" />
    cardText = <Translation id="page-eth2-vision-trilemma-cardtext-4" />
  }
  return (
    <Container>
      <CardContainer>
        <H2>
          <Translation id="page-eth2-vision-trilemma-h2" />
        </H2>
        <p>
          <Translation id="page-eth2-vision-trilemma-p" />
        </p>
        <p>
          <Translation id="page-eth2-vision-trilemma-p-1" />
        </p>
        <p>
          <Translation id="page-eth2-vision-trilemma-p-2" />
        </p>
        <MobileTip>
          <Translation id="page-eth2-vision-trilemma-modal-tip" />:
        </MobileTip>
        <ExplanationCard title={cardTitle} description={cardText} />
      </CardContainer>
      <Mobile>
        <MobileModal
          animate={state.mobileModalOpen ? "open" : "closed"}
          variants={mobileModalVariants}
          initial="closed"
          onClick={handleModalClose}
        ></MobileModal>
        <SlidingContainer
          animate={state.mobileModalOpen ? "open" : "closed"}
          variants={slidingContainerVariants}
          initial="closed"
        >
          <MobileExplanationCard title={cardTitle} description={cardText} />
          <CloseIconContainer onClick={handleModalClose}>
            <Icon name="close" />
          </CloseIconContainer>
        </SlidingContainer>
      </Mobile>
      <Triangle
        width="540"
        height="620"
        viewBox="-100 100 810 915"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
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
        <Text x="460" y="150" isActive={isDecentralized}>
          <Translation id="page-eth2-vision-trilemma-text-1" />
        </Text>
        <Text x="-24" y="486" isActive={isSecure}>
          <Translation id="page-eth2-vision-trilemma-text-2" />
        </Text>
        <Text x="540" y="835" isActive={isScalable}>
          <Translation id="page-eth2-vision-trilemma-text-3" />
        </Text>
      </Triangle>
    </Container>
  )
}

export default Trilemma
