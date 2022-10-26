// Import libraries
import React, { useMemo } from "react"
import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react"
import { useIntl } from "react-intl"

// Import utilities
import { numberToPercent } from "../../utils/numberToPercent"

// Import constants
import { PASSING_QUIZ_SCORE } from "../../constants"

// Interfaces
export interface IProps {
  correctCount: number
  questionCount: number
}

// Component
const QuizSummary: React.FC<IProps> = ({ correctCount, questionCount }) => {
  const { locale } = useIntl()
  const [largerThanMobile] = useMediaQuery("(min-width: 30em)")

  // Memoized values
  const ratioCorrect = useMemo<number>(
    () => correctCount / questionCount,
    [correctCount, questionCount]
  )

  const score = useMemo<number>(
    () => Math.floor(ratioCorrect * 100),
    [ratioCorrect]
  )

  const isPassingScore = useMemo<boolean>(
    () => score > PASSING_QUIZ_SCORE,
    [score]
  )

  // Render QuizSummary component
  return (
    <Box w="full" mb={10} fontSize={["xl", "2xl"]}>
      <Text fontWeight="700" textAlign="center">
        {isPassingScore ? "You passed the quiz!" : "Your results"}
      </Text>
      <Flex
        p={4}
        justify="center"
        boxShadow="drop"
        bg="background"
        mx="auto"
        w="fit-content"
        sx={{
          "div:not(:last-of-type)": {
            borderEnd: "1px",
            borderColor: "disabled",
          },
          div: {
            p: 4,
            flexDirection: "column",
            alignItems: "center",
          },
        }}
        overflowX="hidden"
      >
        <Flex>
          <Text fontWeight="700" mb={2}>
            {numberToPercent(ratioCorrect, locale)}
          </Text>
          <Text fontSize="sm" m={0} color="disabled">
            Score
          </Text>
        </Flex>
        <Flex>
          <Text fontWeight="700" mb={2}>
            +{correctCount}
          </Text>
          <Text fontSize="sm" m={0} color="disabled">
            Correct
          </Text>
        </Flex>
        {largerThanMobile && (
          <Flex>
            <Text fontWeight="700" mb={2}>
              {questionCount}
            </Text>
            <Text fontSize="sm" m={0} color="disabled">
              Total
            </Text>
          </Flex>
        )}
      </Flex>
    </Box>
  )
}

export default QuizSummary
