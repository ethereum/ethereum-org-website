import { useMemo } from "react"
import { useTranslation } from "next-i18next"
import { useRadio, useRadioGroup, UseRadioProps } from "@chakra-ui/react"

import type {
  AnswerChoice,
  AnswerKey,
  Question,
  TranslationKey,
} from "@/lib/types"

import { Center, HStack, Stack } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"

import type { AnswerStatus } from "./useQuizWidget"

type QuizRadioGroupProps = {
  questions: Question[]
  currentQuestionIndex: number
  answerStatus: AnswerStatus
  setCurrentQuestionAnswerChoice: (answer: AnswerChoice | null) => void
}

export const QuizRadioGroup = ({
  questions,
  currentQuestionIndex,
  answerStatus,
  setCurrentQuestionAnswerChoice,
}: QuizRadioGroupProps) => {
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

  const {
    answers,
    correctAnswerId,
    prompt,
    id: questionId,
  } = questions[currentQuestionIndex]

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
    <fieldset className="w-full" {...getRootProps()}>
      <legend className="mb-6 w-full text-center text-2xl font-bold">
        <span className="sr-only">
          {t("question-number", { number: currentQuestionIndex + 1 })}
        </span>
        {t(prompt)}
      </legend>

      <div
        className="md:px-12 lg:px-16"
        data-testid="question-group"
        id={questionId}
      >
        <Stack className="gap-4">
          {answers.map(({ id, label }, idx) => {
            const display =
              !answerStatus || id === selectedAnswer ? "inline-flex" : "hidden"

            return (
              <div key={id} className={display}>
                <CustomRadio
                  label={t(label)}
                  isAnswerVisible={!!answerStatus}
                  isSelectedCorrect={isSelectedCorrect}
                  index={idx}
                  {...getRadioProps({ value: id })}
                />
              </div>
            )
          })}
        </Stack>

        {!!answerStatus && (
          <Stack className="mt-6 gap-2">
            <p className="font-bold">{t("explanation")}</p>

            <p className="m-0">{t(explanation)}</p>
          </Stack>
        )}
      </div>
    </fieldset>
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
    if (!state.isChecked) return "bg-background-highlight"
    if (!isAnswerVisible) return "bg-primary"
    if (!isSelectedCorrect) return "bg-error"
    return "bg-success"
  }, [state.isChecked, isAnswerVisible, isSelectedCorrect])

  const radioInputProps = getInputProps({ id: INPUT_ID })

  return (
    <>
      <label
        // `htmlFor` for proper accessibility with label and input
        {...getLabelProps({ htmlFor: INPUT_ID })}
        className="w-full"
      >
        <HStack
          {...getRadioProps()}
          id={radioInputProps.value}
          data-testid="quiz-question-answer"
          data-group
          data-answer-visible={isAnswerVisible || undefined}
          data-selected-correct={isSelectedCorrect || undefined}
          // Override: `aria-hidden` is marked true in `getRadioProps`
          aria-hidden="false"
          className={cn(
            "w-full cursor-pointer gap-2 rounded p-2 text-body data-[answer-visible]:cursor-default",
            buttonBg,
            "hover:outline hover:outline-1 hover:outline-primary hover:data-[answer-visible]:outline-none",
            // TODO: Upon removing custom radio props, flip remove `data` for checked
            "data-[checked]:data-[answer-visible]:bg-error",
            "data-[checked]:data-[answer-visible]:data-[selected-correct]:bg-success",
            "data-[checked]:text-white",
            "data-[checked]:not-[data-answer-visible]:bg-primary"
          )}
        >
          <Center
            className={cn(
              "size-6 flex-shrink-0 flex-grow-0 rounded-full bg-disabled text-white",
              // TODO: Upon removing custom radio props, flip remove `data` for checked
              "[:is([data-checked],:hover)_>_&]:text-white",
              "[:is([data-checked],:hover)_>_&]:bg-primary-action",
              "[:is([data-checked],:hover)[data-answer-visible]_>_&]:bg-white",
              "[:is([data-checked],:hover)[data-answer-visible]_>_&]:text-error",
              "[:is([data-checked],:hover)[data-answer-visible][data-selected-correct]_>_&]:text-success"
            )}
          >
            <p className="text-lg font-bold leading-none">
              {String.fromCharCode(97 + index).toUpperCase()}
            </p>
          </Center>
          <span>{label}</span>
        </HStack>
      </label>
      <input {...radioInputProps} />
    </>
  )
}
