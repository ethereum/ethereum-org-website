import { useMemo, useState } from "react"
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { FaGithub } from "react-icons/fa"
import { Box, Flex, Icon, Stack, Text, useDisclosure } from "@chakra-ui/react"

import { BasePageProps, QuizKey, QuizStatus } from "@/lib/types"

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
import Translation from "@/components/Translation"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { trackCustomEvent } from "@/lib/utils/matomo"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { ethereumBasicsQuizzes, usingEthereumQuizzes } from "@/data/quizzes"

import { INITIAL_QUIZ } from "@/lib/constants"

import HeroImage from "@/public/heroes/quizzes-hub-hero.png"

const handleGHAdd = () =>
  trackCustomEvent({
    eventCategory: "quiz_hub_events",
    eventAction: "Secondary button clicks",
    eventName: "GH_add",
  })

export const getStaticProps = (async ({ locale }) => {
  const requiredNamespaces = getRequiredNamespacesForPage("/quizzes")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[1])

  const lastDeployDate = getLastDeployDate()

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployDate,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

const QuizzesHubPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const { t } = useTranslation()

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
    <Box as={MainArticle}>
      <PageMetadata
        title={t("quizzes-title")}
        description={t("quizzes-subtitle")}
      />
      <HubHero
        title={t("quizzes-title")}
        description={t("learn-quizzes:quizzes-subtitle")}
        header={t("learn-quizzes:test-your-knowledge")}
        heroImg={HeroImage}
      />
      <QuizzesModal isOpen={isOpen} onClose={onClose} quizStatus={quizStatus}>
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
                headingId={t("learn-quizzes:basics")}
                descriptionId={t("learn-quizzes:basics-description")}
                {...commonQuizListProps}
              />
              <QuizzesList
                content={usingEthereumQuizzes}
                headingId={t("learn-quizzes:using-ethereum")}
                descriptionId={t("learn-quizzes:using-ethereum-description")}
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
                  <Translation id="learn-quizzes:want-more-quizzes" />
                </Text>

                <Text align={{ base: "center", xl: "left" }}>
                  <Translation id="learn-quizzes:contribute" />
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
                  <Translation id="learn-quizzes:add-quiz" />
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
