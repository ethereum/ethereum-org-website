import { useMemo, useState } from "react"
import * as RadioGroup from "@radix-ui/react-radio-group"

import type {
  AnswerChoice,
  AnswerKey,
  Question,
  TranslationKey,
} from "@/lib/types"

import { Center, HStack, Stack } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"

import type { AnswerStatus } from "./useQuizWidget"

import useTranslation from "@/hooks/useTranslation"

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

  const [selectedAnswer, setSelectedAnswer] =
    useState<RadioGroup.RadioGroupProps["value"]>("")

  const handleSelection = (answerId: AnswerKey) => {
    setSelectedAnswer(answerId)
    const isCorrect =
      answerId === questions[currentQuestionIndex].correctAnswerId
    setCurrentQuestionAnswerChoice({ answerId, isCorrect })
  }

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
    <fieldset className="w-full">
      <legend className="mb-6 w-full text-center text-2xl font-bold">
        <span className="sr-only">
          {t("question-number", { number: currentQuestionIndex + 1 })}
        </span>
        {t(prompt)}
      </legend>
      <RadioGroup.Root
        className="md:px-12 lg:px-16"
        data-testid="question-group"
        id={questionId}
        value={selectedAnswer}
        onValueChange={handleSelection}
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
                  value={id}
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
      </RadioGroup.Root>
    </fieldset>
  )
}

type CustomRadioProps = RadioGroup.RadioGroupItemProps & {
  index: number
  isAnswerVisible: boolean
  isSelectedCorrect: boolean
  label: string
}

const CustomRadio = ({
  index,
  isAnswerVisible,
  isSelectedCorrect,
  label,
  ...itemProps
}: CustomRadioProps) => {
  return (
    <HStack
      id={itemProps.value}
      data-testid="quiz-question-answer"
      data-group
      data-answer-visible={isAnswerVisible || undefined}
      data-selected-correct={isSelectedCorrect || undefined}
      className={cn(
        "w-full cursor-pointer gap-2 rounded bg-background-highlight p-2 text-start text-body data-[answer-visible]:cursor-default",
        "hover:outline hover:outline-1 hover:outline-primary hover:data-[answer-visible]:outline-none",
        "data-[state='checked']:data-[answer-visible]:bg-error",
        "data-[state='checked']:data-[answer-visible]:data-[selected-correct]:bg-success",
        "data-[state='checked']:text-white",
        "data-[state='checked']:not-[data-answer-visible]:bg-primary"
      )}
      asChild
    >
      <RadioGroup.Item {...itemProps}>
        <Center
          className={cn(
            "size-6 flex-shrink-0 flex-grow-0 rounded-full bg-disabled text-white",
            "[:is([data-state='checked'],:hover)_>_&]:text-white",
            "[:is([data-state='checked'],:hover)_>_&]:bg-primary-action",
            "[:is([data-state='checked'],:hover)[data-answer-visible]_>_&]:bg-white",
            "[:is([data-state='checked'],:hover)[data-answer-visible]_>_&]:text-error",
            "[:is([data-state='checked'],:hover)[data-answer-visible][data-selected-correct]_>_&]:text-success"
          )}
        >
          <p className="text-lg font-bold leading-none">
            {String.fromCharCode(97 + index).toUpperCase()}
          </p>
        </Center>
        <span className="w-full">{label}</span>
      </RadioGroup.Item>
    </HStack>
  )
}
