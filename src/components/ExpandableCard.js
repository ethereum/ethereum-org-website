import styled from "styled-components"
import { motion } from "framer-motion"
import { FakeLink } from "./SharedStyledComponents"
import Translation from "../components/Translation"

import React, { useState } from "react"

const Card = styled.div`
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 2px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  &:hover {
    background-color: ${(props) => props.theme.colors.ednBackground};
  }
`

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column;
  }
`

const Title = styled.h3`
  margin-top: 0rem;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const TextPreview = styled.p`
  font-size: 0.875rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.text200};
  margin-bottom: 0rem;
`

const Text = styled(motion.div)`
  font-size: 1rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.text};
  margin-top: 2rem;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  padding-top: 1.5rem;
`

const Question = styled.div`
  margin-right: 1rem;

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
`

const Header = styled.div`
  display: flex;
  width: 100%;
  margin: 1rem 0;
  align-items: center;
  svg {
    margin-right: 1.5rem;
  }
`

const ButtonContainer = styled.div`
  margin-left: 1rem;

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin-left: 0;
  }
`

const ButtonLink = styled.button`
  border: 0;
  cursor: pointer;
  background-color: transparent;
  color: ${(props) => props.theme.colors.primary};
`

const ExpandableCard = ({ children, contentPreview, title, svg, alt }) => {
  const [isVisible, setIsVisible] = useState(false)
  const Svg = svg

  const expandCollapse = {
    collapsed: {
      height: 0,
      transition: {
        when: "afterChildren",
      },
    },
    expanded: {
      height: "100%",
      transition: {
        when: "beforeChildren",
      },
    },
  }

  const showHide = {
    collapsed: {
      display: "none",
    },
    expanded: {
      display: "inline-block",
    },
  }

  const fadeInOut = {
    collapsed: {
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
    expanded: {
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  }

  return (
    <Card>
      <Content>
        <Question>
          <Header>
            {!!Svg && <Svg alt={alt} />}
            <Title>{title}</Title>
          </Header>
          <TextPreview>{contentPreview}</TextPreview>
        </Question>
        <ButtonContainer>
          {!isVisible && (
            <ButtonLink onClick={() => setIsVisible(true)}>
              <Translation id="more" />
            </ButtonLink>
          )}
          {isVisible && (
            <ButtonLink onClick={() => setIsVisible(false)}>
              <Translation id="less" />
            </ButtonLink>
          )}
        </ButtonContainer>
      </Content>
      <motion.div
        variants={expandCollapse}
        animate={isVisible ? "expanded" : "collapsed"}
        initial={false}
      >
        <motion.div
          variants={showHide}
          animate={isVisible ? "expanded" : "collapsed"}
          initial={false}
        >
          <Text
            variants={fadeInOut}
            animate={isVisible ? "expanded" : "collapsed"}
            initial={false}
          >
            {children}
          </Text>
        </motion.div>
      </motion.div>
    </Card>
  )
}

export default ExpandableCard
