import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  ButtonProps,
  ScaleFade,
  useDisclosure,
} from "@chakra-ui/react"

import { FeedbackGlyphIcon } from "@/components/icons"
import Text from "@/components/OldText"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { DEFAULT_LOCALE } from "@/lib/constants"

import { useSurvey } from "@/hooks/useSurvey"

type FixedDotProps = ButtonProps & {
  bottomOffset: number
  isExpanded: boolean
}
const FixedDot = ({
  children,
  bottomOffset,
  isExpanded,
  ...props
}: FixedDotProps) => {
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
      me="1rem"
      mt={{ lg: "inherit" }}
      insetStart={`calc(100% - ${size})`}
      insetEnd={4}
      zIndex={98} /* Below the mobile menu */
      display="flex"
      justifyContent="center"
      alignItems="center"
      whiteSpace="normal"
      _hover={{
        transform: "scale(1.1)",
        transition: "transform 0.2s ease-in-out",
      }}
      transition="transform 0.2s ease-in-out, width 0.25s ease-in-out,
      border-radius 0.25s linear"
      {...props}
    >
      {children}
    </Button>
  )
}

const FeedbackWidget = () => {
  const { t } = useTranslation("common")
  const { asPath, locale } = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

  useEffect(() => {
    // Reset component state when path (asPath) changes
    onClose()
    setFeedbackSubmitted(false)
    setIsExpanded(false)

    let expandTimeout = setTimeout(() => setIsExpanded(true), 30_000)

    return () => clearTimeout(expandTimeout)
  }, [asPath, onClose])

  const surveyUrl = useSurvey(feedbackSubmitted)

  const bottomOffset = useMemo(() => {
    const pathsWithBottomNav = ["/staking", "/dao", "/defi", "/nft"]
    const CONDITIONAL_OFFSET = 6.75
    let offset = 0
    pathsWithBottomNav.forEach((path) => {
      if (asPath.includes(path)) {
        offset = CONDITIONAL_OFFSET
      }
    })
    return offset
  }, [asPath])

  const handleClose = (): void => {
    onClose()
    trackCustomEvent({
      eventCategory: `FeedbackWidget toggled`,
      eventAction: `Clicked`,
      eventName: `Closed feedback widget`,
    })
  }

  const handleOpen = (): void => {
    onOpen()
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
    onClose() // Close widget without triggering redundant tracker event
    setIsExpanded(false)
  }

  // Display on English pages only
  if (locale !== DEFAULT_LOCALE) return null

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
                {t("feedback-widget-prompt")}
              </Text>
            </ScaleFade>
          )}
        </Box>
      </FixedDot>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent
            position="fixed"
            maxW={1504}
            m="auto"
            alignItems="flex-end"
            backgroundColor="transparent"
            boxShadow="tableItemBox"
            me={24}
            bottom={{ base: `${bottomOffset + 5}rem`, lg: 20 }}
          >
            <Box
              w={{ base: "auto", sm: "300px" }}
              bgColor="ednBackground"
              border="1px"
              borderColor="buttonColor"
              borderRadius="base"
              py="4"
              px="2"
            >
              <AlertDialogCloseButton />

              <AlertDialogHeader
                fontSize="xl"
                fontWeight="bold"
                lineHeight="6"
                textAlign="center"
              >
                {feedbackSubmitted
                  ? t("feedback-widget-thank-you-title")
                  : t("feedback-widget-prompt")}
              </AlertDialogHeader>

              {/* Body: */}
              {feedbackSubmitted && (
                <>
                  <AlertDialogBody
                    fontWeight="normal"
                    fontSize="md"
                    lineHeight="5"
                    textAlign="center"
                  >
                    {t("feedback-widget-thank-you-subtitle")}
                  </AlertDialogBody>
                  <AlertDialogBody
                    fontWeight="bold"
                    fontSize="xs"
                    lineHeight="4"
                    letterSpacing="wide"
                    color="searchBorder"
                    textAlign="center"
                  >
                    {t("feedback-widget-thank-you-timing")}
                  </AlertDialogBody>
                </>
              )}

              <AlertDialogFooter display="flex" gap="6">
                {feedbackSubmitted ? (
                  <Button onClick={handleSurveyOpen} flex={1}>
                    {t("feedback-widget-thank-you-cta")}
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="solid"
                      onClick={() => handleSubmit(true)}
                      flex={1}
                    >
                      {t("yes")}
                    </Button>
                    <Button
                      variant="solid"
                      onClick={() => handleSubmit(false)}
                      flex={1}
                    >
                      {t("no")}
                    </Button>
                  </>
                )}
              </AlertDialogFooter>
            </Box>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default FeedbackWidget
