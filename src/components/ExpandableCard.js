import styled from "styled-components"
import { motion } from "framer-motion"
import Button from "./Button"
import { FakeLink } from "./SharedStyledComponents"

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
/*     box-shadow: ${(props) => props.theme.colors.tableBoxShadow}; */
  }
`

const ExpandedCard = styled.div`
  padding: 1rem;
  display: flex;
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
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
`

const Container = styled.div``

const ExpandableCard = ({ children, contentPreview, title }) => {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <Card>
      <Content>
        <div>
          <Title>{title}</Title>
          <TextPreview>{contentPreview}</TextPreview>
        </div>
        <div onClick={() => setIsVisible(!isVisible)}>
          {!isVisible && <FakeLink>More</FakeLink>}
          {isVisible && <FakeLink>Less</FakeLink>}
        </div>
      </Content>
      {isVisible && <Text>{children}</Text>}
    </Card>
  )
}

export default ExpandableCard
