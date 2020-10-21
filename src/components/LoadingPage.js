import React from "react"
import { motion } from "framer-motion"
import styled from "styled-components"

import { Page } from "./SharedStyledComponents"

const StyledPage = styled(Page)`
  min-height: 60vh;
  justify-content: center;
`

const CircleContainer = styled(motion.div)`
  width: 10rem;
  height: 7rem;
  display: flex;
  justify-content: space-around;
`

const Circle = styled(motion.div)`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary};
`

const containerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const circleVariants = {
  start: {
    y: "0%",
  },
  end: {
    y: "100%",
  },
}

const circleTransition = {
  duration: 0.5,
  yoyo: Infinity,
  ease: "easeInOut",
}

const LoadingPage = ({ text }) => {
  return (
    <StyledPage>
      <CircleContainer
        variants={containerVariants}
        initial="start"
        animate="end"
      >
        <Circle variants={circleVariants} transition={circleTransition} />
        <Circle variants={circleVariants} transition={circleTransition} />
        <Circle variants={circleVariants} transition={circleTransition} />
      </CircleContainer>
      <h1>{text}</h1>
    </StyledPage>
  )
}

export default LoadingPage
