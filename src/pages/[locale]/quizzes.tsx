import { useMemo, useState } from "react"
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import { FaGithub } from "react-icons/fa"

import { BasePageProps, Lang, Params, QuizKey, QuizStatus } from "@/lib/types"

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
import { Flex, HStack, Stack } from "@/components/ui/flex"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { trackCustomEvent } from "@/lib/utils/matomo"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { ethereumBasicsQuizzes, usingEthereumQuizzes } from "@/data/quizzes"

import { DEFAULT_LOCALE, INITIAL_QUIZ, LOCALES_CODES } from "@/lib/constants"

import { useDisclosure } from "@/hooks/useDisclosure"
import { useTranslation } from "@/hooks/useTranslation"
import loadNamespaces from "@/i18n/loadNamespaces"
import HeroImage from "@/public/images/heroes/quizzes-hub-hero.png"

const handleGHAdd = () =>
  trackCustomEvent({
    eventCategory: "quiz_hub_events",
    eventAction: "Secondary button clicks",
    eventName: "GH_add",
  })

export async function getStaticPaths() {
  return {
    paths: LOCALES_CODES.map((locale) => ({ params: { locale } })),
    fallback: false,
  }
}

export const getStaticProps = (async ({ params }) => {
  const { locale = DEFAULT_LOCALE } = params || {}

  const requiredNamespaces = getRequiredNamespacesForPage("/quizzes")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  const messages = await loadNamespaces(locale, requiredNamespaces)

  return {
    props: {
      messages,
      contentNotTranslated,
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<BasePageProps, Params>

const QuizzesHubPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
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
                  <FaGithub className="me-2 size-6 text-body" />
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
  )
}

export default QuizzesHubPage
