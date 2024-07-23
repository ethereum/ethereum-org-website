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
  HStack,
} from "@chakra-ui/react"

import FixedDot from "./FixedDot"
import { useFeedbackWidget } from "./useFeedbackWidget"

const FeedbackWidget = () => {
  const { t } = useTranslation("common")
  const {
    bottomOffset,
    cancelRef,
    feedbackSubmitted,
    handleClose,
    handleOpen,
    handleSubmit,
    handleSurveyOpen,
    isExpanded,
    isOpen,
  } = useFeedbackWidget()
  return (
    <>
      <FixedDot
        onClick={handleOpen}
        bottomOffset={bottomOffset}
        isExpanded={isExpanded}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent
            position="fixed"
            maxW={1504}
            m="auto"
            alignItems="flex-end"
            backgroundColor="transparent"
            me={24}
            bottom={{ base: `${bottomOffset + 5}rem`, lg: 20 }}
            data-testid="feedback-widget-modal"
            padding={0}
          >
            <Box
              w="min(320px, calc(100% - 1rem))"
              mx="2"
              bg="background.base"
              borderRadius="base"
              padding={{ base: "4", sm: "8" }}
            >
              <HStack>
                <AlertDialogHeader fontSize="xl" fontWeight="bold" me="0">
                  {feedbackSubmitted
                    ? t("feedback-widget-thank-you-title")
                    : t("feedback-widget-prompt")}
                </AlertDialogHeader>
                <AlertDialogCloseButton alignSelf="start" />
              </HStack>

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
