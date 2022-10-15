// Library imports
import React, { useState, useEffect, useRef, useMemo } from "react"
import { useIntl } from "react-intl"
import styled from "@emotion/styled"
import FocusTrap from "focus-trap-react"
// Component imports
import Translation from "./Translation"
import Button from "./Button"
import Icon from "./Icon"
import NakedButton from "./NakedButton"
// SVG imports
import FeedbackGlyph from "../assets/feedback-glyph.svg"
// Utility imports
import { trackCustomEvent } from "../utils/matomo"
import { translateMessageId } from "../utils/translations"
// Hook imports
import { useOnClickOutside } from "../hooks/useOnClickOutside"
import { useKeyPress } from "../hooks/useKeyPress"
import { useSurvey } from "../hooks/useSurvey"

const FixedDot = styled(NakedButton)<{
  bottomOffset: number
}>`
  width: 3rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: 0px 4px 4px ${({ theme }) => theme.colors.tableItemBoxShadow};
  position: sticky;
  bottom: 1rem;
  margin-left: auto;
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    bottom: ${({ bottomOffset }) => 1 + bottomOffset}rem;
    margin-top: 150vh;
  }
  right: 1rem;
  z-index: 98; /* Below the mobile menu */
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: transform 0.2s ease-in-out;
  }
  transition: transform 0.2s ease-in-out;
`

const ModalBackground = styled.div`
  display: block;
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1001; /* Above the nav bar */
`

const Container = styled.div<{
  bottomOffset: number
}>`
  display: flex;
  box-sizing: border-box;
  width: 300px;
  background-color: ${({ theme }) => theme.colors.ednBackground};
  border: 1px solid ${({ theme }) => theme.colors.buttonColor};
  box-shadow: 0px 4px 4px ${({ theme }) => theme.colors.tableItemBoxShadow};
  border-radius: 0.25rem;
  position: fixed;
  right: 2rem;
  bottom: 5rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    offset-position: bottom -300px;
    bottom: ${({ bottomOffset }) => 5 + bottomOffset}rem;
  }
  z-index: 1002; /* Above the ModalBackground */

  @media (max-width: ${({ theme }) => theme.breakpoints.s}) {
    width: auto;
    left: 1rem;
    right: 1rem;
  }

  &:hover {
    transform: scale(1.02);
    transition: transform 0.2s ease-in-out;
  }
  transition: transform 0.2s ease-in-out;

  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;

  .title {
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 1.5rem;
  }

  .subtitle {
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.25rem;
  }

  .timing {
    font-weight: 700;
    font-size: 0.75rem;
    line-height: 1rem;
    letter-spacing: 0.025em;
    color: ${({ theme }) => theme.colors.searchBorder};
  }

  a {
    width: 100%;
    color: ${({ theme }) => theme.colors.text} !important;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 1.25rem;
  width: 100%;
  * {
    flex: 1;
    font-weight: 700;
  }
`

const StyledFeedbackGlyph = styled(FeedbackGlyph)`
  path {
    fill: ${({ theme }) => theme.colors.white};
  }
`

const IconContainer = styled(NakedButton)`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease-in-out;
  }
  transition: transform 0.2s ease-in-out;
`

export interface IProps {
  className?: string
}

const FeedbackWidget: React.FC<IProps> = ({ className }) => {
  const intl = useIntl()
  const containerRef = useRef<HTMLInputElement>(null)
  useOnClickOutside(containerRef, () => handleClose(), [`mousedown`])
  const [location, setLocation] = useState("")
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLocation(window.location.href)
      // Reset component state when path (location) changes
      setIsOpen(false)
      setFeedbackSubmitted(false)
    }
  }, [])

  const surveyUrl = useSurvey(feedbackSubmitted)

  const bottomOffset = useMemo(() => {
    const pathsWithBottomNav = ["/staking", "/dao", "/defi", "/nft"]
    const CONDITIONAL_OFFSET = 6.75
    let offset = 0
    pathsWithBottomNav.forEach((path) => {
      if (location.includes(path)) {
        offset = CONDITIONAL_OFFSET
      }
    })
    return offset
  }, [location])

  const handleClose = (): void => {
    setIsOpen(false)
    trackCustomEvent({
      eventCategory: `FeedbackWidget toggled`,
      eventAction: `Clicked`,
      eventName: `Closed feedback widget`,
    })
  }
  const handleOpen = (): void => {
    setIsOpen(true)
    trackCustomEvent({
      eventCategory: `FeedbackWidget toggled`,
      eventAction: `Clicked`,
      eventName: `Opened feedback widget`,
    })
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
    setIsOpen(false) // Close widget without triggering redundant tracker event
  }

  useKeyPress(`Escape`, handleClose)

  if (!location.includes("/en/")) return null

  return (
    <>
      <FixedDot onClick={handleOpen} bottomOffset={bottomOffset} id="dot">
        <StyledFeedbackGlyph />
      </FixedDot>
      {isOpen && (
        <ModalBackground>
          <FocusTrap
            focusTrapOptions={{
              fallbackFocus: `#dot`,
            }}
          >
            <Container
              bottomOffset={bottomOffset}
              ref={containerRef}
              className={className}
              id="modal"
            >
              <p className="title">
                {feedbackSubmitted ? (
                  <Translation id="feedback-widget-thank-you-title" />
                ) : (
                  <Translation id="feedback-widget-prompt" />
                )}
              </p>
              {feedbackSubmitted && (
                <p className="subtitle">
                  <Translation id="feedback-widget-thank-you-subtitle" />
                </p>
              )}
              {feedbackSubmitted && (
                <p className="timing">
                  <Translation id="feedback-widget-thank-you-timing" />
                </p>
              )}
              <ButtonContainer>
                {feedbackSubmitted ? (
                  <Button
                    variant="outline-color"
                    onClick={handleSurveyOpen}
                    aria-label={translateMessageId(
                      "feedback-widget-thank-you-cta",
                      intl
                    )}
                  >
                    <Translation id="feedback-widget-thank-you-cta" />
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline-color"
                      onClick={() => handleSubmit(true)}
                      aria-label={translateMessageId("yes", intl)}
                    >
                      <Translation id="yes" />
                    </Button>
                    <Button
                      variant="outline-color"
                      onClick={() => handleSubmit(false)}
                      aria-label={translateMessageId("no", intl)}
                    >
                      <Translation id="no" />
                    </Button>
                  </>
                )}
              </ButtonContainer>
              <IconContainer
                onClick={handleClose}
                aria-label={translateMessageId("close", intl)}
              >
                <Icon name="close" />
              </IconContainer>
            </Container>
          </FocusTrap>
        </ModalBackground>
      )}
    </>
  )
}

export default FeedbackWidget
