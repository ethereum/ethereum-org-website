"use client"
import { useMemo, useState } from "react"
import { useTranslations } from "next-intl"

import { QuizKey, QuizStatus } from "@/lib/types"

import ContentFeedback from "@/components/ContentFeedback"
import Github from "@/components/icons/github.svg"
import MainArticle from "@/components/MainArticle"
import QuizWidget from "@/components/Quiz/QuizWidget/QuizWidgetClient"
import QuizzesList from "@/components/Quiz/QuizzesList"
import QuizzesModal from "@/components/Quiz/QuizzesModal"
import QuizzesStats from "@/components/Quiz/QuizzesStats"
import { useLocalQuizData } from "@/components/Quiz/useLocalQuizData"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Flex } from "@/components/ui/flex"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { quizzesSections } from "@/data/quizzes"
import type { QuizStatsData } from "@/data-layer/fetchers/fetchQuizStats"

import { INITIAL_QUIZ } from "@/lib/constants"

import { useDisclosure } from "@/hooks/useDisclosure"

const handleGHAdd = () =>
  trackCustomEvent({
    eventCategory: "quiz_hub_events",
    eventAction: "Secondary button clicks",
    eventName: "GH_add",
  })

const QuizzesPage = ({
  communityStats,
}: {
  communityStats: QuizStatsData | null
}) => {
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

      <main className="px-page pt-space-3x pb-page">
        <MainArticle className="flow space-y-space-3x">
          <QuizzesStats
            communityStats={communityStats}
            averageScoresArray={userStats.average}
            completedQuizzes={userStats.completed}
            totalCorrectAnswers={userStats.score}
          />

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

          <Flex
            data-flow="cta"
            className="max-w-3xl items-center justify-between gap-4 rounded-base bg-background-highlight p-page max-md:flex-col max-md:text-center"
          >
            <div>
              <p className="font-bold">{t("want-more-quizzes")}</p>
              <p>{t("contribute")}</p>
            </div>
            <ButtonLink
              href="/contributing/quizzes/"
              variant="outline"
              hideArrow
              onClick={handleGHAdd}
            >
              <Github className="me-2 text-2xl" />
              {t("add-quiz")}
            </ButtonLink>
          </Flex>
        </MainArticle>
        <ContentFeedback />
      </main>
    </>
  )
}

export default QuizzesPage
