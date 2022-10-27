// Import libraries
import React, { useMemo } from "react"
import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react"
import { useIntl } from "react-intl"

// Import utilities
import { numberToPercent } from "../../utils/numberToPercent"

// Interfaces
export interface IProps {
  correctCount: number
  isPassingScore: boolean
  questionCount: number
  ratioCorrect: number
}

// Component
const QuizSummary: React.FC<IProps> = ({
  correctCount,
  isPassingScore,
  questionCount,
  ratioCorrect,
}) => {
  const { locale } = useIntl()
  const [largerThanMobile] = useMediaQuery("(min-width: 30em)")

  const valueStyles = { fontWeight: "700", mb: 2 }
  const labelStyles = { fontSize: "sm", m: 0, color: "disabled" }

  // Render QuizSummary component
  return (
    <Box w="full" fontSize={["xl", "2xl"]}>
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
          <Text {...valueStyles}>{numberToPercent(ratioCorrect, locale)}</Text>
          <Text {...labelStyles}>Score</Text>
        </Flex>
        <Flex>
          <Text {...valueStyles}>+{correctCount}</Text>
          <Text {...labelStyles}>Correct</Text>
        </Flex>
        {largerThanMobile && (
          <Flex>
            <Text {...valueStyles}>{questionCount}</Text>
            <Text {...labelStyles}>Total</Text>
          </Flex>
        )}
      </Flex>
    </Box>
  )
}

export default QuizSummary
