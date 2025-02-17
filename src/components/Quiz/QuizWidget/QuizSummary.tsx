import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import { HStack, VStack } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"
import { numberToPercent } from "@/lib/utils/numberToPercent"
import { screens } from "@/lib/utils/screen"

import { useMediaQuery } from "@/hooks/useMediaQuery"

type QuizSummaryProps = {
  numberOfCorrectAnswers: number
  questionsLength: number
  ratioCorrect: number
  isPassingScore: boolean
}

export const QuizSummary = ({
  numberOfCorrectAnswers,
  questionsLength,
  ratioCorrect,
  isPassingScore,
}: QuizSummaryProps) => {
  const { locale } = useRouter()
  const { t } = useTranslation("learn-quizzes")

  const [largerThanMobile] = useMediaQuery([`(min-width: ${screens.sm})`])

  const commonTextSize = "text-xl sm:text-2xl"
  const valueStyles = "font-bold leading-none"
  const labelStyles = "text-sm m-0 text-disabled"

  return (
    <VStack className="w-full gap-3">
      <h3
        className={cn(
          "text-center text-3xl",
          isPassingScore ? "text-success" : "text-body"
        )}
      >
        {isPassingScore ? t("passed") : t("your-results")}
      </h3>
      <HStack
        className="mx-auto justify-center gap-4 overflow-x-hidden bg-background px-8 py-4 shadow-drop [&_>_div]:py-4"
        separator={<div className="border-disabled" />}
      >
        <VStack>
          <span className={cn(commonTextSize, valueStyles)}>
            {numberToPercent(ratioCorrect, locale)}
          </span>
          <span className={cn(commonTextSize, labelStyles)}>{t("score")}</span>
        </VStack>

        <VStack>
          <span className={cn(commonTextSize, valueStyles)}>
            +{numberOfCorrectAnswers}
          </span>
          <span className={cn(commonTextSize, labelStyles)}>
            {t("correct")}
          </span>
        </VStack>

        {largerThanMobile && (
          <>
            <VStack>
              <span className={cn(commonTextSize, valueStyles)}>
                {questionsLength}
              </span>
              <span className={cn(commonTextSize, labelStyles)}>
                {t("questions")}
              </span>
            </VStack>
          </>
        )}
      </HStack>
    </VStack>
  )
}
