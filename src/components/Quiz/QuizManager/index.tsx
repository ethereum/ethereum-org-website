import { useMemo, useState } from "react"
import { FaGithub } from "react-icons/fa"
import { Box, Flex, Icon, Stack, Text, useDisclosure } from "@chakra-ui/react"

import { QuizStatus, QuizzesSection } from "@/lib/types"
import { RawQuizzes } from "@/lib/interfaces"

import { ButtonLink } from "@/components/Buttons"
import Translation from "@/components/Translation"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { INITIAL_QUIZ } from "@/lib/constants"

import QuizWidget from "../QuizWidget"
import QuizzesList from "../QuizzesList"
import QuizzesModal from "../QuizzesModal"
import QuizzesStats from "../QuizzesStats"
import { useLocalQuizData } from "../useLocalQuizData"

const handleGHAdd = () =>
  trackCustomEvent({
    eventCategory: "quiz_hub_events",
    eventAction: "Secondary button clicks",
    eventName: "GH_add",
  })

type QuizPageKeys = "quizzes-stats"

type QuizListSection = {
  headingId: string
  descriptionId: string
  QuizMeta: QuizzesSection[]
}

type QuizManagerProps = {
  /**
   * This is the key for the local storage data.
   */
  userStatsKey: QuizPageKeys
  /**
   * The entire data set to be used in the manager instance
   */
  allQuizData: RawQuizzes
  /**
   * One or more sets of quiz section meta for this manager instance.
   * Needs to match the complete data set from `allQuizData`
   */
  quizListSections: [QuizListSection, ...QuizListSection[]]
}

const QuizManager = ({
  allQuizData,
  quizListSections,
  userStatsKey,
}: QuizManagerProps) => {
  const [userStats, updateUserStats] = useLocalQuizData({
    userStatsKey,
    allQuizData,
  })
  const [quizStatus, setQuizStatus] = useState<QuizStatus>("neutral")
  const [currentQuiz, setCurrentQuiz] = useState(INITIAL_QUIZ)
  const { onOpen, isOpen, onClose } = useDisclosure()

  const commonQuizListProps = useMemo(
    () => ({
      userStats,
      quizHandler: setCurrentQuiz,
      modalHandler: onOpen,
    }),
    [onOpen, userStats]
  )
  return (
    <>
      <QuizzesModal isOpen={isOpen} onClose={onClose} quizStatus={quizStatus}>
        <QuizWidget
          quizKey={currentQuiz}
          currentHandler={setCurrentQuiz}
          statusHandler={setQuizStatus}
          updateUserStats={updateUserStats}
        />
      </QuizzesModal>
      <Box px={{ base: 0, lg: "8" }} py={{ base: 0, lg: "4" }} mb="12">
        <Flex direction={{ base: "column-reverse", lg: "row" }} columnGap="20">
          <Stack spacing="10" flex="1">
            <Box>
              {quizListSections.map(
                ({ QuizMeta, descriptionId, headingId }) => (
                  <QuizzesList
                    key={headingId}
                    headingId={headingId}
                    descriptionId={descriptionId}
                    content={QuizMeta}
                    {...commonQuizListProps}
                  />
                )
              )}
            </Box>
            <Flex
              direction={{ base: "column", xl: "row" }}
              justify="space-between"
              align="center"
              bg="background.highlight"
              borderRadius={{ lg: "lg" }}
              p="8"
              gap={{ base: "4", xl: 0 }}
            >
              <Box>
                <Text align={{ base: "center", xl: "left" }} fontWeight="bold">
                  <Translation id="learn-quizzes:want-more-quizzes" />
                </Text>

                <Text align={{ base: "center", xl: "left" }}>
                  <Translation id="learn-quizzes:contribute" />
                </Text>
              </Box>
              <ButtonLink
                href="/contributing/quizzes/"
                variant="outline"
                hideArrow
                onClick={handleGHAdd}
              >
                <Flex alignItems="center">
                  <Icon as={FaGithub} color="text" boxSize={6} me={2} />
                  <Translation id="learn-quizzes:add-quiz" />
                </Flex>
              </ButtonLink>
            </Flex>
          </Stack>
          <Box flex="1">
            <QuizzesStats
              averageScoresArray={userStats.average}
              completedQuizzes={userStats.completed}
              totalCorrectAnswers={userStats.score}
            />
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default QuizManager
