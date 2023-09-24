import * as React from "react"
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next"
import {
  Button,
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react"
import Text from "../OldText"
import Translation from "../Translation"
import FixedDot from "./FixedDot"
import { useFeedbackWidget } from "./useFeedbackWidget"

interface FeedbackWidgetProps {
  location: string
}

const FeedbackWidget = ({ location }: FeedbackWidgetProps) => {
  const {
    bottomOffset,
    feedbackSubmitted,
    getButtonProps,
    handleClose,
    handleOpen,
    handleSubmit,
    handleSurveyOpen,
    isExpanded,
    isOpen,
  } = useFeedbackWidget({ location })
  const { t } = useTranslation()
  const { language } = useI18next()
  if (language !== "en") return null
  return (
    <>
      <FixedDot
        {...getButtonProps()}
        onClick={handleOpen}
        bottomOffset={bottomOffset}
        isExpanded={isExpanded}
      />
      <Modal isOpen={isOpen} onClose={handleClose} size="xs">
        <ModalOverlay />
        <ModalContent
          textAlign="center"
          p="8"
          position="fixed"
          insetEnd="8"
          bottom="20"
        >
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
          <ModalCloseButton />
          <Flex flexWrap="nowrap" gap="6" w="full">
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
        </ModalContent>
      </Modal>
    </>
  )
}

export default FeedbackWidget
