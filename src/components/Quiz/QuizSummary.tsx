import React, { useEffect } from "react"
import { Box, Flex, useMediaQuery } from "@chakra-ui/react"

import Text from "../OldText"
import { numberToPercent } from "@/lib/utils/numberToPercent"
import { updateUserStats } from "./utils"
import { UserStats } from "@/lib/types"

// TODO: Re-enable when i18n is implemented and remove placeholders throughout
// import { useI18next } from "gatsby-plugin-react-i18next"
// import Translation from "../Translation"

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
  // TODO: Re-enable when i18n is implemented; remove placeholder
  // const { language } = useI18next()
  const language = "en"
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
        {/* {isPassingScore ? (
          <Translation id="passed" />
        ) : (
          <Translation id="your-results" />
        )} */}
        {isPassingScore ? "Passed" : "Your results"}
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
            {/* <Translation id="score" /> */}
            Score
          </Text>
        </Flex>

        <Flex>
          <Text {...valueStyles}>+{numberOfCorrectAnswers}</Text>
          <Text {...labelStyles}>
            {/* <Translation id="correct" /> */}
            Correct
          </Text>
        </Flex>

        {largerThanMobile && (
          <Flex>
            <Text {...valueStyles}>{questionCount}</Text>
            <Text {...labelStyles}>
              {/* <Translation id="questions" /> */}
              Questions
            </Text>
          </Flex>
        )}
      </Flex>
    </Box>
  )
}

export default QuizSummary
