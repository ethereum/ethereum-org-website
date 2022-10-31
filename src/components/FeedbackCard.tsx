// Library imports
import React, { ReactNode, useState } from "react"
import { Icon } from "@chakra-ui/react"
import styled from "@emotion/styled"
// Component imports
import Button from "./Button"
import Translation from "./Translation"
// SVG imports
import ThumbsUp from "../assets/feedback-thumbs-up.svg"
// Utility imports
import { trackCustomEvent } from "../utils/matomo"
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
  const surveyUrl = useSurvey(feedbackSubmitted)

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
              <Button
                variant="outline-color"
                leftIcon={<Icon as={ThumbsUp} w={6} h={6} />}
                onClick={() => handleSubmit(true)}
              >
                <Translation id="yes" />
              </Button>
              <Button
                variant="outline-color"
                leftIcon={
                  <Icon as={ThumbsUp} w={6} h={6} transform="scaleY(-1)" />
                }
                onClick={() => handleSubmit(false)}
              >
                <Translation id="no" />
              </Button>
            </>
          ) : (
            <Button variant="outline-color" onClick={handleSurveyOpen}>
              <Translation id="feedback-widget-thank-you-cta" />
            </Button>
          )}
        </ButtonContainer>
      </Content>
    </Card>
  )
}

export default FeedbackCard
