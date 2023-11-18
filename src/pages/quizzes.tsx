import { GetStaticProps, InferGetStaticPropsType } from "next"
import { SSRConfig, useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { Box } from "@chakra-ui/react"

import { NextPageWithLayout } from "@/lib/types"

import PageMetadata from "@/components/PageMetadata"

import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getRequiredNamespacesForPath } from "@/lib/utils/translations"

import { RootLayout } from "@/layouts"

const QuizzesHubPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const { t } = useTranslation()

  return (
    <Box>
      <PageMetadata
        title={t("quizzes-title")}
        description={t("quizzes-subtitle")}
      />
      <div>Quiz Page</div>
    </Box>
  )
}

QuizzesHubPage.getLayout = (page) => {
  return (
    <RootLayout
      contentIsOutdated={false}
      contentNotTranslated={false}
      lastDeployDate={page.props.lastDeployDate}
    >
      {page}
    </RootLayout>
  )
}

export default QuizzesHubPage

export const getStaticProps = (async ({ locale }) => {
  const requiredNamespaces = getRequiredNamespacesForPath("/quizzes")
  const lastDeployDate = getLastDeployDate()

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      lastDeployDate,
    },
  }
}) satisfies GetStaticProps<SSRConfig & { lastDeployDate: string }>
