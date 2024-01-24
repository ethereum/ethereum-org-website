import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { Box } from "@chakra-ui/react"

import { BasePageProps } from "@/lib/types"

import FeedbackCard from "@/components/FeedbackCard"
import { HubHero } from "@/components/Hero"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"
import QuizManager from "@/components/Quiz/QuizManager"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import allQuizzesData, {
  ethereumBasicsQuizzes,
  usingEthereumQuizzes,
} from "@/data/quizzes"

import HeroImage from "@/public/heroes/quizzes-hub-hero.png"

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
      <QuizManager
        userStatsKey="quizzes-stats"
        allQuizData={allQuizzesData}
        quizListSections={[
          {
            descriptionId: t("learn-quizzes:basics-description"),
            headingId: t("learn-quizzes:basics"),
            QuizMeta: ethereumBasicsQuizzes,
          },
          {
            descriptionId: t("learn-quizzes:using-ethereum-description"),
            headingId: t("learn-quizzes:using-ethereum"),
            QuizMeta: usingEthereumQuizzes,
          },
        ]}
      />
      <Box w="full" py="4" px="8">
        <FeedbackCard />
      </Box>
    </Box>
  )
}

export default QuizzesHubPage
