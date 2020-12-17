import styled from "styled-components"
// TODO add motion animation
// import { motion } from "framer-motion"
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
`

const Title = styled.h3`
  margin-top: 0rem;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const TextPreview = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.text200};
  margin-bottom: 0rem;
`

const Text = styled.p`
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

const ButtonContainer = styled.div`
  margin-left: 1rem;
`

const ExpandableCard = ({ children, contentPreview, title }) => {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <Card>
      <Content>
        <Question>
          <Title>{title}</Title>
          <TextPreview>{contentPreview}</TextPreview>
        </Question>
        <ButtonContainer onClick={() => setIsVisible(!isVisible)}>
          {!isVisible && (
            <FakeLink>
              <Translation id="common-more" />
            </FakeLink>
          )}
          {isVisible && (
            <FakeLink>
              <Translation id="common-less" />
            </FakeLink>
          )}
        </ButtonContainer>
      </Content>
      {isVisible && <Text>{children}</Text>}
    </Card>
  )
}

export default ExpandableCard
