import { useMemo, useState } from "react"
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import { FaGithub } from "react-icons/fa"
import { Box, Flex, Icon, Stack, Text } from "@chakra-ui/react"

import { BasePageProps, Lang, Params, QuizKey, QuizStatus } from "@/lib/types"

import { ButtonLink } from "@/components/Buttons"
import FeedbackCard from "@/components/FeedbackCard"
import { HubHero } from "@/components/Hero"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"
import QuizWidget from "@/components/Quiz/QuizWidget"
import QuizzesList from "@/components/Quiz/QuizzesList"
import QuizzesModal from "@/components/Quiz/QuizzesModal"
import QuizzesStats from "@/components/Quiz/QuizzesStats"
import { useLocalQuizData } from "@/components/Quiz/useLocalQuizData"

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
    <Box as={MainArticle}>
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
      <Box px={{ base: 0, lg: "8" }} py={{ base: 0, lg: "4" }} mb="12">
        <Flex direction={{ base: "column-reverse", lg: "row" }} columnGap="20">
          <Stack spacing="10" flex="1">
            <Box>
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
            </Box>
            <Flex
              direction={{ base: "column", xl: "row" }}
              justify="space-between"
              align="center"
              bg="background.highlight"
              borderRadius={{ lg: "lg" }}
              p="8"
              gap={{ base: "4", xl: 0 }}
            >
              <Box>
                <Text align={{ base: "center", xl: "left" }} fontWeight="bold">
                  {t("want-more-quizzes")}
                </Text>

                <Text align={{ base: "center", xl: "left" }}>
                  {t("contribute")}
                </Text>
              </Box>
              <ButtonLink
                href="/contributing/quizzes/"
                variant="outline"
                hideArrow
                onClick={handleGHAdd}
              >
                <Flex alignItems="center">
                  <Icon as={FaGithub} color="text" boxSize={6} me={2} />
                  {t("add-quiz")}
                </Flex>
              </ButtonLink>
            </Flex>
          </Stack>
          <Box flex="1">
            <QuizzesStats
              averageScoresArray={userStats.average}
              completedQuizzes={userStats.completed}
              totalCorrectAnswers={userStats.score}
            />
          </Box>
        </Flex>
      </Box>
      <Box w="full" py="4" px="8">
        <FeedbackCard />
      </Box>
    </Box>
  )
}

export default QuizzesHubPage
