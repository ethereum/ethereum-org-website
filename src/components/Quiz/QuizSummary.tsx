import React, { useEffect } from "react"
import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react"
import { useI18next } from "gatsby-plugin-react-i18next"

import Translation from "../Translation"

import { numberToPercent } from "../../utils/numberToPercent"
import { updateUserStats } from "./utils"
import { UserStats } from "../../types"

interface IProps {
  quizKey: string
  numberOfCorrectAnswers: number
  isPassingScore: boolean
  questionCount: number
  ratioCorrect: number
  quizScore: number
  setUserStats: (stats: UserStats) => void
}

const QuizSummary: React.FC<IProps> = ({
  quizKey,
  numberOfCorrectAnswers,
  isPassingScore,
  questionCount,
  ratioCorrect,
  quizScore,
  setUserStats,
}) => {
  const { language } = useI18next()
  const [largerThanMobile] = useMediaQuery("(min-width: 30em)")

  const valueStyles = { fontWeight: "700", mb: 2 }
  const labelStyles = { fontSize: "sm", m: 0, color: "disabled" }

  // QuizSummary is rendered when user has finished the quiz, proper time to update the stats
  useEffect(() => {
    updateUserStats({
      quizKey,
      quizScore,
      numberOfCorrectAnswers,
      setUserStats,
    })
  }, [])

  return (
    <Box w="full" fontSize={["xl", "2xl"]}>
      <Text
        fontWeight="700"
        textAlign="center"
        color={isPassingScore ? "success.base" : "body.base"}
        fontSize="3xl"
      >
        {isPassingScore ? (
          <Translation id="passed" />
        ) : (
          <Translation id="your-results" />
        )}
      </Text>

      <Flex
        p={4}
        justify="center"
        boxShadow="drop"
        bg="background.base"
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
          <Text {...valueStyles}>
            {numberToPercent(ratioCorrect, language)}
          </Text>
          <Text {...labelStyles}>
            <Translation id="score" />
          </Text>
        </Flex>

        <Flex>
          <Text {...valueStyles}>+{numberOfCorrectAnswers}</Text>
          <Text {...labelStyles}>
            <Translation id="correct" />
          </Text>
        </Flex>

        {largerThanMobile && (
          <Flex>
            <Text {...valueStyles}>{questionCount}</Text>
            <Text {...labelStyles}>
              <Translation id="questions" />
            </Text>
          </Flex>
        )}
      </Flex>
    </Box>
  )
}

export default QuizSummary
