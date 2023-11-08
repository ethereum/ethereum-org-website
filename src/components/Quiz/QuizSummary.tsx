import React, { useEffect } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { Box, Flex, useMediaQuery } from "@chakra-ui/react"

import { UserStats } from "@/lib/types"

import { numberToPercent } from "@/lib/utils/numberToPercent"

import Text from "../OldText"

import { updateUserStats } from "./utils"

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
  const { locale } = useRouter()
  const { t } = useTranslation("learn-quizzes")

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
  }, [numberOfCorrectAnswers, quizKey, quizScore, setUserStats])

  return (
    <Box w="full" fontSize={["xl", "2xl"]}>
      <Text
        fontWeight="700"
        textAlign="center"
        color={isPassingScore ? "success.base" : "body.base"}
        fontSize="3xl"
      >
        {isPassingScore ? t("passed") : t("your-results")}
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
          <Text {...valueStyles}>{numberToPercent(ratioCorrect, locale)}</Text>
          <Text {...labelStyles}>{t("score")}</Text>
        </Flex>

        <Flex>
          <Text {...valueStyles}>+{numberOfCorrectAnswers}</Text>
          <Text {...labelStyles}>{t("correct")}</Text>
        </Flex>

        {largerThanMobile && (
          <Flex>
            <Text {...valueStyles}>{questionCount}</Text>
            <Text {...labelStyles}>{t("questions")}</Text>
          </Flex>
        )}
      </Flex>
    </Box>
  )
}

export default QuizSummary
