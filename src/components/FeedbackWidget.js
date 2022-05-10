// Library imports
import React, { useState, useRef } from "react"
import styled from "styled-components"
// Component imports
import ButtonLink from "./ButtonLink"
import { ButtonPrimary } from "./SharedStyledComponents"
import Translation from "./Translation"
import Icon from "./Icon"
// SVG imports
import FeedbackGlyph from "../assets/feedback-glyph.svg"
// Utility imports
import { trackCustomEvent } from "../utils/matomo"
// Hook imports
import { useOnClickOutside } from "../hooks/useOnClickOutside"

const FixedDot = styled.div`
  width: 3rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 1000;
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
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1001;
`

const Container = styled.div`
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
  z-index: 1003;

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
    color: ${({ theme }) => theme.colors.ghostCardGhost};
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
    color: ${({ theme }) => theme.colors.text};
    font-weight: 700;
  }
`

const StyledFeedbackGlyph = styled(FeedbackGlyph)`
  path {
    fill: ${({ theme, isOpen }) =>
      isOpen ? theme.colors.text : theme.colors.background};
  }
`

const IconContainer = styled.div`
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

const FeedbackWidget = ({ prompt, className }) => {
  const containerRef = useRef()
  useOnClickOutside(containerRef, () => handleClose())
  const [isOpen, setIsOpen] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [isHelpful, setIsHelpful] = useState(null)

  const handleClose = () => {
    setIsOpen(false)
    trackCustomEvent({
      eventCategory: `FeedbackWidget toggled`,
      eventAction: `Clicked`,
      label: `Closed feedback widget`,
    })
  }
  const handleOpen = () => {
    setIsOpen(true)
    trackCustomEvent({
      eventCategory: `FeedbackWidget toggled`,
      eventAction: `Clicked`,
      label: `Opened feedback widget`,
    })
  }
  const handleSubmit = (choice) => {
    trackCustomEvent({
      eventCategory: `Page is helpful feedback`,
      eventAction: `Clicked`,
      label: choice,
    })
    setIsHelpful(choice)
    setFeedbackSubmitted(true)
  }

  const location = typeof window !== "undefined" ? window.location.href : ""
  const isStaking = location.includes("staking")

  const surveyUrls = {
    default: {
      yes: `https://czvgzauj.paperform.co/?url=${location}`,
      no: `https://xlljh5l3.paperform.co/?url=${location}`,
    },
    staking: {
      yes: `https://gzmn3wgk.paperform.co/?url=${location}`,
      no: `https://zlj83p6l.paperform.co/?url=${location}`,
    },
  }

  const getSurveyUrl = () => {
    if (!feedbackSubmitted) return null
    if (isStaking) return surveyUrls.staking[isHelpful ? "yes" : "no"]
    return surveyUrls.default[isHelpful ? "yes" : "no"]
  }

  return (
    <>
      <FixedDot onClick={handleOpen}>
        <StyledFeedbackGlyph isOpen={isOpen} />
      </FixedDot>
      <ModalBackground isOpen={isOpen}>
        <Container isOpen={isOpen} ref={containerRef} className={className}>
          <IconContainer onClick={handleClose}>
            <Icon name="close" />
          </IconContainer>
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
              <ButtonLink to={getSurveyUrl()}>
                <Translation id="feedback-widget-thank-you-cta" />
              </ButtonLink>
            ) : (
              <>
                <ButtonPrimary onClick={() => handleSubmit(true)}>
                  <Translation id="yes" />
                </ButtonPrimary>
                <ButtonPrimary onClick={() => handleSubmit(false)}>
                  <Translation id="no" />
                </ButtonPrimary>
              </>
            )}
          </ButtonContainer>
        </Container>
      </ModalBackground>
    </>
  )
}

export default FeedbackWidget
