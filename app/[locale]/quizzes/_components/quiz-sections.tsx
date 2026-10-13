"use client"
import { useMemo, useState } from "react"
import { useTranslations } from "next-intl"

import { QuizKey, QuizStatus } from "@/lib/types"

import QuizWidget from "@/components/Quiz/QuizWidget/QuizWidgetClient"
import QuizzesList from "@/components/Quiz/QuizzesList"
import QuizzesModal from "@/components/Quiz/QuizzesModal"
import { useLocalQuizData } from "@/components/Quiz/useLocalQuizData"

import { quizzesSections } from "@/data/quizzes"

import { INITIAL_QUIZ } from "@/lib/constants"

import { useDisclosure } from "@/hooks/useDisclosure"

/** The quiz lists and the modal they open; both need the same widget state. */
const QuizSections = () => {
  const t = useTranslations("learn-quizzes")

  const [userStats, updateUserStats] = useLocalQuizData()
  const [quizStatus, setQuizStatus] = useState<QuizStatus>("neutral")
  const [currentQuiz, setCurrentQuiz] = useState<QuizKey>(INITIAL_QUIZ)
  const { onOpen, isOpen, setValue } = useDisclosure()

  const commonQuizListProps = useMemo(
    () => ({
      userStats,
      quizHandler: setCurrentQuiz,
      modalHandler: onOpen,
    }),
    [onOpen, userStats]
  )

  return (
    <>
      <QuizzesModal
        isQuizModalOpen={isOpen}
        onQuizModalOpenChange={setValue}
        quizStatus={quizStatus}
      >
        <QuizWidget
          quizKey={currentQuiz}
          currentHandler={setCurrentQuiz}
          statusHandler={setQuizStatus}
          updateUserStats={updateUserStats}
        />
      </QuizzesModal>

      {quizzesSections.map((section) => (
        <QuizzesList
          key={section.id}
          sectionId={section.id}
          content={section.quizzes}
          headingId={t(section.titleKey)}
          descriptionId={t(section.descriptionKey)}
          {...commonQuizListProps}
        />
      ))}
    </>
  )
}

export default QuizSections
