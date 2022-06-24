// Library imports
import React, { ReactNode, useState } from "react"
import styled from "styled-components"
// Component imports
import { ButtonPrimary, ButtonSecondary } from "./SharedStyledComponents"
import Translation from "./Translation"
// SVG imports
import ThumbsUp from "../assets/feedback-thumbs-up.svg"
// Utility imports
import { trackCustomEvent } from "../utils/matomo"
// import { getFeedbackSurveyUrl } from "../utils/getFeedbackSurveyUrl"
import { useSurvey } from "../hooks/useSurvey"

const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.feedbackGradient};
  border-radius: 4px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  margin-top: 2rem;
  width: 100%;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Title = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.375rem;
  font-weight: 700;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`

const StyledButtonSecondary = styled(ButtonSecondary)`
  display: flex;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
  border-color: ${({ theme }) => theme.colors.primary};
  line-height: 140%;
  vertical-align: middle;
  svg {
    height: 1.5rem;
    &.flip {
      transform: scaleY(-1);
    }
  }
`

const StyledButtonPrimary = styled(ButtonPrimary)`
  color: white;
  font-weight: 700;
`

export interface IProps {
  prompt?: string
  isArticle?: boolean
  className?: string
}

const FeedbackCard: React.FC<IProps> = ({
  prompt,
  isArticle = false,
  className,
}) => {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [isHelpful, setIsHelpful] = useState(false)
  const surveyUrl = useSurvey(feedbackSubmitted, isHelpful)

  const location = typeof window !== "undefined" ? window.location.href : ""
  const isTutorial = location.includes("tutorials")

  const getTitle = (feedbackSubmitted: boolean): ReactNode => {
    if (!feedbackSubmitted) {
      if (prompt) return prompt
      if (isTutorial) return <Translation id="feedback-card-prompt-tutorial" />
      if (isArticle) return <Translation id="feedback-card-prompt-article" />
      return <Translation id="feedback-card-prompt-page" />
    }
    return <Translation id="feedback-widget-thank-you-title" />
  }

  const handleSubmit = (choice: boolean): void => {
    trackCustomEvent({
      eventCategory: `Page is helpful feedback`,
      eventAction: `Clicked`,
      eventName: String(choice),
    })
    setIsHelpful(choice)
    setFeedbackSubmitted(true)
  }
  const handleSurveyOpen = (): void => {
    trackCustomEvent({
      eventCategory: `Feedback survey opened`,
      eventAction: `Clicked`,
      eventName: "Feedback survey opened",
    })
    window && surveyUrl && window.open(surveyUrl, "_blank")
  }
  return (
    <Card className={className}>
      <Content>
        <Title>{getTitle(feedbackSubmitted)}</Title>
        {feedbackSubmitted && (
          <p>
            <Translation id="feedback-widget-thank-you-subtitle" />{" "}
            <Translation id="feedback-widget-thank-you-subtitle-ext" />
          </p>
        )}
        <ButtonContainer>
          {!feedbackSubmitted ? (
            <>
              <StyledButtonSecondary onClick={() => handleSubmit(true)}>
                <ThumbsUp />
                <Translation id="yes" />
              </StyledButtonSecondary>
              <StyledButtonSecondary onClick={() => handleSubmit(false)}>
                <ThumbsUp className="flip" />
                <Translation id="no" />
              </StyledButtonSecondary>
            </>
          ) : (
            <StyledButtonPrimary onClick={handleSurveyOpen}>
              <Translation id="feedback-widget-thank-you-cta" />
            </StyledButtonPrimary>
          )}
        </ButtonContainer>
      </Content>
    </Card>
  )
}

export default FeedbackCard
