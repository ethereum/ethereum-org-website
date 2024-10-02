import { useMemo, useState } from "react"
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { FaGithub } from "react-icons/fa"

import type { BasePageProps, Lang, QuizKey, QuizStatus } from "@/lib/types"

import FeedbackCard from "@/components/FeedbackCard"
import { HubHero } from "@/components/Hero"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"
import QuizWidget from "@/components/Quiz/QuizWidget"
import QuizzesList from "@/components/Quiz/QuizzesList"
import QuizzesModal from "@/components/Quiz/QuizzesModal"
import QuizzesStats from "@/components/Quiz/QuizzesStats"
import { useLocalQuizData } from "@/components/Quiz/useLocalQuizData"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Stack } from "@/components/ui/flex"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { trackCustomEvent } from "@/lib/utils/matomo"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { ethereumBasicsQuizzes, usingEthereumQuizzes } from "@/data/quizzes"

import { INITIAL_QUIZ } from "@/lib/constants"

import { useDisclosure } from "@/hooks/useDisclosure"
import HeroImage from "@/public/images/heroes/quizzes-hub-hero.png"

const handleGHAdd = () =>
  trackCustomEvent({
    eventCategory: "quiz_hub_events",
    eventAction: "Secondary button clicks",
    eventName: "GH_add",
  })

export const getStaticProps = (async ({ locale }) => {
  const requiredNamespaces = getRequiredNamespacesForPage("/quizzes")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

const QuizzesHubPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const { t } = useTranslation("learn-quizzes")

  const [userStats, updateUserStats] = useLocalQuizData()
  const [quizStatus, setQuizStatus] = useState<QuizStatus>("neutral")
  const [currentQuiz, setCurrentQuiz] = useState<QuizKey>(INITIAL_QUIZ)
  const { onOpen, isOpen, onClose } = useDisclosure()

  const commonQuizListProps = useMemo(
    () => ({
      userStats,
      quizHandler: setCurrentQuiz,
      modalHandler: onOpen,
    }),
    [onOpen, userStats]
  )

  return (
    <MainArticle>
      <PageMetadata
        title={t("common:quizzes-title")}
        description={t("quizzes-subtitle")}
        image="/images/heroes/quizzes-hub-hero.png"
      />
      <HubHero
        title={t("common:quizzes-title")}
        description={t("quizzes-subtitle")}
        header={t("test-your-knowledge")}
        heroImg={HeroImage}
      />
      <QuizzesModal
        isQuizModalOpen={isOpen}
        onQuizModalClose={onClose}
        quizStatus={quizStatus}
      >
        <QuizWidget
          quizKey={currentQuiz}
          currentHandler={setCurrentQuiz}
          statusHandler={setQuizStatus}
          updateUserStats={updateUserStats}
        />
      </QuizzesModal>
      <div className="mb-12 lg:px-8 lg:py-4">
        <div className="flex flex-col-reverse gap-x-20 lg:flex-row">
          <Stack className="flex-1 space-y-10">
            <div>
              <QuizzesList
                content={ethereumBasicsQuizzes}
                headingId={t("basics")}
                descriptionId={t("basics-description")}
                {...commonQuizListProps}
              />
              <QuizzesList
                content={usingEthereumQuizzes}
                headingId={t("using-ethereum")}
                descriptionId={t("using-ethereum-description")}
                {...commonQuizListProps}
              />
            </div>
            <div className="flex flex-col items-center justify-between bg-background-highlight p-8 max-xl:gap-4 lg:rounded-lg xl:flex-row">
              <div>
                <p className="font-bold max-xl:text-center">
                  {t("want-more-quizzes")}
                </p>

                <p className="max-xl:text-center">{t("contribute")}</p>
              </div>
              <ButtonLink
                href="/contributing/quizzes/"
                variant="outline"
                hideArrow
                onClick={handleGHAdd}
              >
                <div className="items-cernter flex">
                  <FaGithub className="me-2 text-body" />
                  {t("add-quiz")}
                </div>
              </ButtonLink>
            </div>
          </Stack>
          <div className="flex-1">
            <QuizzesStats
              averageScoresArray={userStats.average}
              completedQuizzes={userStats.completed}
              totalCorrectAnswers={userStats.score}
            />
          </div>
        </div>
      </div>
      <div className="w-full px-8 py-4">
        <FeedbackCard />
      </div>
    </MainArticle>
  )
}

export default QuizzesHubPage
