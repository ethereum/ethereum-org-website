import { useMemo } from "react"
import { useTranslation } from "next-i18next"
import {
  Box,
  chakra,
  ChakraProps,
  Circle,
  HStack,
  Stack,
  Text,
  useRadio,
  useRadioGroup,
  UseRadioProps,
  useToken,
  VisuallyHidden,
} from "@chakra-ui/react"

import type { AnswerKey, TranslationKey } from "@/lib/types"

import { useQuizWidgetContext } from "./context"

export const QuizRadioGroup = () => {
  const {
    questions,
    currentQuestionIndex,
    answerStatus,
    setCurrentQuestionAnswerChoice,
  } = useQuizWidgetContext()
  const { t } = useTranslation("learn-quizzes")

  const handleSelection = (answerId: AnswerKey) => {
    const isCorrect =
      answerId === questions[currentQuestionIndex].correctAnswerId
    setCurrentQuestionAnswerChoice({ answerId, isCorrect })
  }

  const {
    getRadioProps,
    getRootProps,
    value: selectedAnswer,
  } = useRadioGroup({
    name: `quiz-question-${currentQuestionIndex}`,
    onChange: handleSelection,
  })

  const { answers, correctAnswerId, prompt } = questions[currentQuestionIndex]

  // Memoized values
  const explanation = useMemo<TranslationKey>(() => {
    if (selectedAnswer === "") return ""
    return answers.filter(({ id }) => id === selectedAnswer)[0].explanation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAnswer])

  const isSelectedCorrect = useMemo<boolean>(
    () => correctAnswerId === selectedAnswer,
    [correctAnswerId, selectedAnswer]
  )

  return (
    <Box as="fieldset" w="full" {...getRootProps()}>
      <Text
        as="legend"
        textAlign={{ base: "center", md: "start" }}
        fontWeight="700"
        size="2xl"
        w="full"
        mb="6"
      >
        <VisuallyHidden>
          {t("question-number", { number: currentQuestionIndex + 1 })}
        </VisuallyHidden>
        {t(prompt)}
      </Text>

      <Stack spacing="4">
        {answers.map(({ id, label }, idx) => {
          const display =
            !answerStatus || id === selectedAnswer ? "inline-flex" : "none"

          return (
            <Box key={id} display={display}>
              <CustomRadio
                label={t(label)}
                isAnswerVisible={!!answerStatus}
                isSelectedCorrect={isSelectedCorrect}
                index={idx}
                {...getRadioProps({ value: id })}
              />
            </Box>
          )
        })}
      </Stack>

      {!!answerStatus && (
        <Stack spacing="2" mt="6">
          <Text fontWeight="bold">{t("explanation")}</Text>

          <Text m={0}>{t(explanation)}</Text>
        </Stack>
      )}
    </Box>
  )
}

type CustomRadioProps = UseRadioProps & {
  index: number
  isAnswerVisible: boolean
  isSelectedCorrect: boolean
  label: string
}

const CustomRadio = ({
  isAnswerVisible,
  index,
  isSelectedCorrect,
  label,
  ...radioProps
}: CustomRadioProps) => {
  const INPUT_ID = `quiz-question-answer-${index}`
  const { state, getInputProps, getRadioProps, getLabelProps } = useRadio({
    ...radioProps,
    id: INPUT_ID,
  })

  const buttonBg = useMemo<string>(() => {
    if (!state.isChecked) return "body.inverted"
    if (!isAnswerVisible) return "primary.base"
    if (!isSelectedCorrect) return "error.base"
    return "success.base"
  }, [state.isChecked, isAnswerVisible, isSelectedCorrect])

  const primaryBaseColor = useToken("colors", "primary.base")

  const getAnswerColor = (): ChakraProps["bg"] =>
    isSelectedCorrect ? "success.base" : "error.base"

  const controlFocusProps: ChakraProps = {
    bg: isAnswerVisible ? "white" : "primary.pressed",
    color: isAnswerVisible ? getAnswerColor() : undefined,
  }

  return (
    <>
      <chakra.label
        // `htmlFor` for proper accessibility with label and input
        {...getLabelProps({ htmlFor: INPUT_ID })}
        cursor="pointer"
        w="full"
      >
        <HStack
          {...getRadioProps()}
          // Override: `aria-hidden` is marked true in `getRadioProps`
          aria-hidden="false"
          spacing="2"
          w="full"
          p="2"
          color="text"
          bg={buttonBg}
          borderRadius="base"
          _hover={{
            outline: isAnswerVisible ? "none" : `1px solid ${primaryBaseColor}`,
          }}
          _checked={{
            bg: !isAnswerVisible ? "primary.base" : getAnswerColor(),
            color: "white",
          }}
          data-group
        >
          <Circle
            size="6"
            bg="disabled"
            color="white"
            _groupHover={controlFocusProps}
            _groupChecked={controlFocusProps}
          >
            <Text fontWeight="700" fontSize="lg" lineHeight="none">
              {String.fromCharCode(97 + index).toUpperCase()}
            </Text>
          </Circle>
          <span>{label}</span>
        </HStack>
      </chakra.label>
      <input {...getInputProps({ id: INPUT_ID })} />
    </>
  )
}
