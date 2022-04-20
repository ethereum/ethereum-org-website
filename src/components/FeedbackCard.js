import React, { useState } from "react"
import styled from "styled-components"
import { ButtonSecondary } from "./SharedStyledComponents"
import { trackCustomEvent } from "../utils/matomo"
import Translation from "./Translation"
import Link from "./Link"

const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 4px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  margin-top: 2rem;
`

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const Title = styled.h3`
  margin-top: 0rem;
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
`

const ButtonContainer = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 1rem;
  }
`

const FeedbackCard = ({ prompt, className }) => {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [isHelpful, setIsHelpful] = useState(false)
  const location = typeof window !== "undefined" ? window.location.href : ""
  const isStaking = location.includes("staking")

  const getTitle = (feedbackSubmitted, isStaking, isHelpful) => {
    if (!feedbackSubmitted)
      return prompt || <Translation id="feedback-prompt" />
    if (isStaking)
      return isHelpful ? (
        <>
          <p>Thanks for the feedback! Want to add more input?</p>
          <Link to={`https://gzmn3wgk.paperform.co/?url=${location}`}>
            Check out our current staking survey!
          </Link>
        </>
      ) : (
        <>
          <p>How can we do better?</p>
          <Link to={`https://zlj83p6l.paperform.co/?url=${location}`}>
            Check out our current staking survey!
          </Link>
        </>
      )

    return isHelpful ? (
      <Translation id="feedback-title-helpful" />
    ) : (
      <Translation id="feedback-title-not-helpful" />
    )
  }

  const handleClick = (isHelpful) => {
    trackCustomEvent({
      eventCategory: `Page is helpful feedback`,
      eventAction: `Clicked`,
      eventName: isHelpful,
    })
    setIsHelpful(isHelpful)
    setFeedbackSubmitted(true)
  }
  return (
    <Card className={className}>
      <Content>
        <Title>{getTitle(feedbackSubmitted, isStaking, isHelpful)}</Title>
        {!feedbackSubmitted && (
          <ButtonContainer>
            <ButtonSecondary onClick={() => handleClick(true)}>
              <Translation id="yes" />
            </ButtonSecondary>
            <ButtonSecondary onClick={() => handleClick(false)} ml={`0.5rem`}>
              <Translation id="no" />
            </ButtonSecondary>
          </ButtonContainer>
        )}
      </Content>
    </Card>
  )
}

export default FeedbackCard
