import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import {
  Heading,
  HStack,
  StackDivider,
  Text,
  TextProps,
  ThemingProps,
  useMediaQuery,
  useToken,
  VStack,
} from "@chakra-ui/react"

import { numberToPercent } from "@/lib/utils/numberToPercent"

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

  const smBp = useToken("breakpoints", "sm")

  const [largerThanMobile] = useMediaQuery(`(min-width: ${smBp})`)

  const commonTextSize: ThemingProps<"Text">["size"] = ["xl", "2xl"]
  const valueStyles: TextProps = { fontWeight: "700", lineHeight: 1 }
  const labelStyles: TextProps = { fontSize: "sm", m: 0, color: "disabled" }

  return (
    <VStack spacing="3" w="full">
      <Heading
        as="h3"
        textAlign="center"
        size="lg"
        color={isPassingScore ? "success.base" : "body.base"}
      >
        {isPassingScore ? t("passed") : t("your-results")}
      </Heading>
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
          <Text size={commonTextSize} {...valueStyles}>
            {numberToPercent(ratioCorrect, locale)}
          </Text>
          <Text size={commonTextSize} {...labelStyles}>
            {t("score")}
          </Text>
        </VStack>

        <VStack>
          <Text size={commonTextSize} {...valueStyles}>
            +{numberOfCorrectAnswers}
          </Text>
          <Text size={commonTextSize} {...labelStyles}>
            {t("correct")}
          </Text>
        </VStack>

        {largerThanMobile && (
          <VStack>
            <Text size={commonTextSize} {...valueStyles}>
              {questionsLength}
            </Text>
            <Text size={commonTextSize} {...labelStyles}>
              {t("questions")}
            </Text>
          </VStack>
        )}
      </HStack>
    </VStack>
  )
}
