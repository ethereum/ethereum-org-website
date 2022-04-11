import React, { useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { GatsbyImage } from "gatsby-plugin-image"

import Icon from "./Icon"

const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  background: ${({ background, theme }) =>
    background ? theme.colors[background] : theme.colors.background};
  &:hover {
    img {
      transform: scale(1.08);
      transition: transform 0.1s;
    }
  }
`

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    gap: 2rem;
    flex-direction: column;
  }
`

const TitleContent = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  width: 100%;
`

const Title = styled.h2`
  margin-top: 0rem;
  margin-bottom: 0.5rem;
`

const TextPreview = styled.p`
  font-weight: 400;
  color: ${(props) => props.theme.colors.text200};
  margin-bottom: 0rem;
`

const Text = styled(motion.div)`
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.text};
  margin-top: 2rem;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  padding-top: 1.5rem;
`

const Question = styled.div`
  margin-right: 1rem;
`

const Header = styled.div`
  display: flex;
  width: 100%;
  margin: 1rem 0;
  align-items: center;
  img {
    margin-right: 1.5rem;
  }
`

const ButtonContainer = styled(motion.div)`
  display: flex;
  width: 5rem;
  justify-content: center;
  align-items: center;
  min-height: 10rem;
  cursor: pointer;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    min-height: 100%;
    height: 100%;
    width: 100%;
    margin: 0;
  }
  &:hover {
    svg {
      transform: scale(1.25);
      transition: transform 0.1s;
    }
  }
`

const ExpandableInfo = ({
  image,
  title,
  contentPreview,
  children,
  background,
  forceOpen,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(forceOpen)
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
  const chevronFlip = {
    collapsed: {
      rotate: 0,
      transition: {
        duration: 0.1,
      },
    },
    expanded: {
      rotate: 180,
      transition: {
        duration: 0.4,
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
    <Card background={background} className={className}>
      <Content>
        {image && <GatsbyImage image={image} />}
        <TitleContent>
          <Question>
            <Header>
              <Title>{title}</Title>
            </Header>
            <TextPreview>{contentPreview}</TextPreview>
          </Question>
        </TitleContent>
        {!forceOpen && (
          <ButtonContainer
            variants={chevronFlip}
            animate={isVisible ? "expanded" : "collapsed"}
            initial={false}
            onClick={() => setIsVisible(!isVisible)}
          >
            <Icon name="chevronDown" size="36" />
          </ButtonContainer>
        )}
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

export default ExpandableInfo
