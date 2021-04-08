import styled from "styled-components"
// TODO add motion animation
// import { motion } from "framer-motion"
import { FakeLink } from "./SharedStyledComponents"

import React, { useState } from "react"
import Emoji from "./Emoji"

const Card = styled.div`
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 2px;
  margin-top: -1px;
  display: flex;
  flex-direction: column;
  &:hover {
    background-color: ${(props) => props.theme.colors.ednBackground};
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

const ChildrenContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.ednBackground};
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

const Question = styled.div``

const ButtonContainer = styled.div`
  margin-right: 1.5rem;
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem;
  margin-right: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    align-items: flex-start;
  }
`

const StyledEmoji = styled(Emoji)`
  margin-right: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    min-width: 40px;
  }
`

const StablecoinAccordion = ({ children, contentPreview, title, emoji }) => {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <Card>
      <Content>
        <TitleContainer>
          <StyledEmoji svg text={emoji} size={4} />
          <Question>
            <Title>{title}</Title>
            <TextPreview>{contentPreview}</TextPreview>
          </Question>
        </TitleContainer>
        <ButtonContainer onClick={() => setIsVisible(!isVisible)}>
          {!isVisible && <FakeLink>More</FakeLink>}
          {isVisible && <FakeLink>Less</FakeLink>}
        </ButtonContainer>
      </Content>
      <ChildrenContent>{isVisible && <Text>{children}</Text>}</ChildrenContent>
    </Card>
  )
}

export default StablecoinAccordion
