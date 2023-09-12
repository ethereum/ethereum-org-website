// Library imports
import React, { useState, useEffect, useRef, useMemo } from "react"
import {
  Box,
  Button,
  ButtonProps,
  Flex,
  Icon,
  ScaleFade,
} from "@chakra-ui/react"
import { useTranslation, useI18next } from "gatsby-plugin-react-i18next"
import { MdClose } from "react-icons/md"
import FocusTrap from "focus-trap-react"
// Component imports
import Translation from "./Translation"
import Text from "./OldText"
// SVG imports
import { FeedbackGlyphIcon } from "./icons"
// Utility imports
import { trackCustomEvent } from "../utils/matomo"
// Hook imports
import { useOnClickOutside } from "../hooks/useOnClickOutside"
import { useKeyPress } from "../hooks/useKeyPress"
import { useSurvey } from "../hooks/useSurvey"

interface FixedDotProps extends ButtonProps {
  bottomOffset: number
  isExpanded: boolean
}
const FixedDot: React.FC<FixedDotProps> = ({
  children,
  bottomOffset,
  isExpanded,
  ...props
}) => {
  const size = "3rem"
  return (
    <Button
      w={{ base: size, lg: isExpanded ? "15rem" : size }}
      h={size}
      borderRadius="full"
      variant="solid"
      boxShadow="tableItemBox"
      position="sticky"
      bottom={{ base: `${bottomOffset + 1}rem`, lg: 4 }}
      ms="auto"
      mt={{ lg: "inherit" }}
      insetEnd={4}
      zIndex={98} /* Below the mobile menu */
      display="flex"
      justifyContent="center"
      alignItems="center"
      whiteSpace="normal"
      _hover={{
        cursor: "pointer",
        transform: "scale(1.1)",
        transition: "transform 0.2s ease-in-out",
      }}
      transition="transform 0.2s ease-in-out, width 0.25s linear,
      border-radius 0.25s linear"
      {...props}
    >
      {children}
    </Button>
  )
}

interface FeedbackWidgetProps {
  location: string
}
const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({ location = "" }) => {
  const { t } = useTranslation()
  const { language } = useI18next()

  const containerRef = useRef<HTMLInputElement>(null)
  useOnClickOutside(containerRef, () => handleClose(), [`mousedown`])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false)

  useEffect(() => {
    // Reset component state when path (location) changes
    setIsOpen(false)
    setFeedbackSubmitted(false)
    setIsExpanded(false)

    let expandTimeout = setTimeout(() => setIsExpanded(true), 30000)

    return () => clearTimeout(expandTimeout)
  }, [location])

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
    setIsExpanded(false)
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
    setIsExpanded(false)
  }

  useKeyPress(`Escape`, handleClose)

  if (language !== "en") return null
  const closeButtonSize = "24px"
  return (
    <>
      <FixedDot
        onClick={handleOpen}
        bottomOffset={bottomOffset}
        isExpanded={isExpanded}
        id="dot"
      >
        <Box
          display="flex"
          justifyContent="space-evenly"
          width={{ base: "3rem", lg: isExpanded ? "13.5rem" : "3rem" }}
          position={{
            base: "inherit",
            lg: isExpanded ? "absolute" : "inherit",
          }}
        >
          <FeedbackGlyphIcon color="white" my="11px" />
          {isExpanded && (
            <ScaleFade in={isExpanded} delay={0.25}>
              <Text
                as="div"
                color="white"
                fontWeight="bold"
                noOfLines={2}
                height="100%"
                alignItems="center"
                display={{ base: "none", lg: isExpanded ? "flex" : "none" }}
              >
                <Translation id="feedback-widget-prompt" />
              </Text>
            </ScaleFade>
          )}
        </Box>
      </FixedDot>
      {isOpen && (
        <Box
          display="block"
          position="fixed"
          inset={0}
          bgColor="blackAlpha.400"
          zIndex={1001} /* Above the nav bar */
        >
          <FocusTrap
            focusTrapOptions={{
              fallbackFocus: `#dot`,
            }}
          >
            <Flex
              id="modal"
              ref={containerRef}
              boxSizing="border-box"
              w={{ base: "auto", sm: "300px" }}
              bgColor="ednBackground"
              border="1px"
              borderColor="buttonColor"
              boxShadow="tableItemBox"
              borderRadius="base" /* 0.25rem */
              position="fixed"
              insetEnd={{ base: 4, sm: 8 }}
              insetStart={{ base: 4, sm: "auto" }}
              bottom={{ base: `${bottomOffset + 5}rem`, lg: 20 }}
              zIndex={1002} /* Above the modal background */
              _hover={{
                transform: "scale(1.02)",
                transition: "transform 0.2s ease-in-out",
              }}
              transition="transform 0.2s ease-in-out"
              direction="column"
              alignItems="center"
              textAlign="center"
              p={8}
            >
              <Button
                variant="ghost"
                onClick={handleClose}
                aria-label={t("close")}
                position="absolute"
                insetEnd={2}
                top={2}
                cursor="pointer"
                h={closeButtonSize}
                w={closeButtonSize}
                minW={closeButtonSize}
                minH={closeButtonSize}
                _hover={{
                  transform: "scale(1.1)",
                  transition: "transform 0.2s ease-in-out",
                }}
                transition="transform 0.2s ease-in-out"
              >
                <Icon as={MdClose} h={closeButtonSize} w={closeButtonSize} />
              </Button>

              <Text fontWeight="bold" fontSize="xl" lineHeight={6}>
                {feedbackSubmitted ? (
                  <Translation id="feedback-widget-thank-you-title" />
                ) : (
                  <Translation id="feedback-widget-prompt" />
                )}
              </Text>
              {feedbackSubmitted && (
                <Text fontWeight="normal" fontSize="md" lineHeight={5}>
                  <Translation id="feedback-widget-thank-you-subtitle" />
                </Text>
              )}
              {feedbackSubmitted && (
                <Text
                  fontWeight="bold"
                  fontSize="xs"
                  lineHeight={4}
                  letterSpacing="wide"
                  color="searchBorder"
                >
                  <Translation id="feedback-widget-thank-you-timing" />
                </Text>
              )}
              <Flex flexWrap="nowrap" gap={6} width="full">
                {feedbackSubmitted ? (
                  <Button
                    onClick={handleSurveyOpen}
                    aria-label={t("feedback-widget-thank-you-cta")}
                    flex={1}
                  >
                    <Translation id="feedback-widget-thank-you-cta" />
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="solid"
                      onClick={() => handleSubmit(true)}
                      aria-label={t("yes")}
                      flex={1}
                    >
                      <Translation id="yes" />
                    </Button>
                    <Button
                      variant="solid"
                      onClick={() => handleSubmit(false)}
                      aria-label={t("no")}
                      flex={1}
                    >
                      <Translation id="no" />
                    </Button>
                  </>
                )}
              </Flex>
            </Flex>
          </FocusTrap>
        </Box>
      )}
    </>
  )
}

export default FeedbackWidget
