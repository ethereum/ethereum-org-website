import React, { useEffect } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import {
  HStack,
  StackDivider,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react"

import { UserStats } from "@/lib/types"

import { numberToPercent } from "@/lib/utils/numberToPercent"

import { updateUserStats } from "../utils"

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

  const valueStyles = { fontWeight: "700", lineHeight: 1 }
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
    <VStack spacing="3" w="full" fontSize={["xl", "2xl"]}>
      <Text
        fontWeight="700"
        textAlign="center"
        color={isPassingScore ? "success.base" : "body.base"}
        fontSize="3xl"
      >
        {isPassingScore ? t("passed") : t("your-results")}
      </Text>

      <HStack
        py="4"
        px="8"
        justify="center"
        boxShadow="drop"
        bg="background.base"
        mx="auto"
        spacing="4"
        sx={{
          "& > div": {
            py: "4",
          },
        }}
        overflowX="hidden"
        divider={<StackDivider borderColor="disabled" />}
      >
        <VStack>
          <Text {...valueStyles}>{numberToPercent(ratioCorrect, locale)}</Text>
          <Text {...labelStyles}>{t("score")}</Text>
        </VStack>

        <VStack>
          <Text {...valueStyles}>+{numberOfCorrectAnswers}</Text>
          <Text {...labelStyles}>{t("correct")}</Text>
        </VStack>

        {largerThanMobile && (
          <VStack>
            <Text {...valueStyles}>{questionCount}</Text>
            <Text {...labelStyles}>{t("questions")}</Text>
          </VStack>
        )}
      </HStack>
    </VStack>
  )
}

export default QuizSummary
