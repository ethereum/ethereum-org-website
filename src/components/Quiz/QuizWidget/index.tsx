import { Center, Heading, Spinner, Stack, VStack } from "@chakra-ui/react"

import { QuizStatus } from "@/lib/types"

import Translation from "@/components/Translation"

import { AnswerIcon } from "./AnswerIcon"
import { QuizWidgetProvider } from "./context"
import { QuizContent } from "./QuizContent"
import { useQuizWidget } from "./useQuizWidget"

export type QuizWidgetProps = {
  isStandaloneQuiz?: boolean
  quizKey: string
  currentHandler?: (nextKey: string) => void
  statusHandler?: (status: QuizStatus) => void
}

const QuizWidget = ({ isStandaloneQuiz = false, quizKey }: QuizWidgetProps) => {
  const { quizData, answerStatus } = useQuizWidget({ quizKey })

  return (
    <VStack spacing="12" width="full" maxW="600px">
      <Stack
        w="full"
        gap="8"
        px={{ base: "8", md: "12", lg: "16" }}
        // Reduce padding when showing Spinner
        pt={!!!quizData ? "10" : { base: "5", md: "12" }}
        pb={!!!quizData ? "5" : { base: "4", md: "8" }}
        // bg={getMainContainerBg()}
        borderRadius="base"
        boxShadow={isStandaloneQuiz ? "drop" : "none"}
        position="relative"
      >
        {/* TODO: Add QuizConfetti render (src/components/Quiz/OldQuizWidget/index.tsx line 78) */}
        <Center
          position={{ base: "relative", md: "absolute" }}
          top={{ base: 2, md: 0 }}
          left={{ md: "50%" }}
          transform="auto"
          translateX={{ md: "-50%" }}
          translateY={{ md: "-50%" }}
        >
          <AnswerIcon
            // showAnswer={showAnswer}
            // isCurrentQuestionCorrect={currentQuestionAnswerChoice?.isCorrect}
            showAnswer={false}
            isCurrentQuestionCorrect={false}
          />
        </Center>
        <Stack spacing="8" justifyContent="space-between">
          {!!quizData ? (
            <QuizWidgetProvider value={{quizData, answerStatus}}>

            <QuizContent>QuizContent</QuizContent>
            </QuizWidgetProvider>
          ) : (
            <Center>
              <Spinner />
            </Center>
          )}
        </Stack>
      </Stack>
    </VStack>
  )
}

export default QuizWidget

/**
 * For use of the widget on single pages (not the quizzes page)
 */
export const StandaloneQuizWidget = (
  props: Omit<QuizWidgetProps, "isStandaloneQuiz">
) => (
  <VStack spacing="12" my="16">
    <Heading
      as="h2"
      textAlign="center"
      scrollBehavior="smooth"
      scrollMarginTop={24}
      id="quiz"
    >
      <Translation id="learn-quizzes:test-your-knowledge" />
    </Heading>
    <QuizWidget {...props} isStandaloneQuiz />
  </VStack>
)
