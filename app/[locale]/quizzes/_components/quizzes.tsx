"use client"

import { useMemo, useState } from "react"

import { QuizKey, QuizStatus } from "@/lib/types"

import FeedbackCard from "@/components/FeedbackCard"
import { HubHero } from "@/components/Hero"
import Github from "@/components/icons/github.svg"
import MainArticle from "@/components/MainArticle"
import QuizWidget from "@/components/Quiz/QuizWidget"
import QuizzesList from "@/components/Quiz/QuizzesList"
import QuizzesModal from "@/components/Quiz/QuizzesModal"
import QuizzesStats from "@/components/Quiz/QuizzesStats"
import { useLocalQuizData } from "@/components/Quiz/useLocalQuizData"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Flex, HStack, Stack } from "@/components/ui/flex"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { ethereumBasicsQuizzes, usingEthereumQuizzes } from "@/data/quizzes"

import { INITIAL_QUIZ } from "@/lib/constants"

import { useDisclosure } from "@/hooks/useDisclosure"
import { useTranslation } from "@/hooks/useTranslation"
import HeroImage from "@/public/images/heroes/quizzes-hub-hero.png"

const handleGHAdd = () =>
  trackCustomEvent({
    eventCategory: "quiz_hub_events",
    eventAction: "Secondary button clicks",
    eventName: "GH_add",
  })

const QuizzesPage = ({ locale }) => {
  const { t } = useTranslation("learn-quizzes")

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

  // JSON-LD structured data for the Quizzes page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://ethereum.org/${locale}/quizzes/`,
    name: t("common:quizzes-title"),
    description: t("quizzes-subtitle"),
    url: `https://ethereum.org/${locale}/quizzes/`,
    inLanguage: locale,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `https://ethereum.org/${locale}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: t("common:quizzes-title"),
          item: `https://ethereum.org/${locale}/quizzes/`,
        },
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
    },
  }

  return (
    <>
      <script
        id="jsonld-webpage-quizzes"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd),
        }}
      />

      <MainArticle>
        <HubHero
          title={t("common:quizzes-title")}
          description={t("quizzes-subtitle")}
          header={t("test-your-knowledge")}
          heroImg={HeroImage}
        />
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
        <div className="mb-12 lg:px-8 lg:py-4">
          <Flex className="gap-x-20 max-lg:flex-col-reverse">
            <Stack className="flex-1 gap-10">
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
              <Flex className="items-center justify-between bg-background-highlight p-8 max-xl:flex-col max-xl:gap-4 lg:rounded-lg">
                <div className="max-xl:text-center">
                  <p className="font-bold">{t("want-more-quizzes")}</p>
                  <p>{t("contribute")}</p>
                </div>
                <ButtonLink
                  href="/contributing/quizzes/"
                  variant="outline"
                  hideArrow
                  onClick={handleGHAdd}
                >
                  <HStack className="gap-0">
                    <Github className="me-2 text-2xl text-body" />
                    {t("add-quiz")}
                  </HStack>
                </ButtonLink>
              </Flex>
            </Stack>
            <div className="flex-1">
              <QuizzesStats
                averageScoresArray={userStats.average}
                completedQuizzes={userStats.completed}
                totalCorrectAnswers={userStats.score}
              />
            </div>
          </Flex>
        </div>
        <div className="w-full px-8 py-4">
          <FeedbackCard />
        </div>
      </MainArticle>
    </>
  )
}

export default QuizzesPage
