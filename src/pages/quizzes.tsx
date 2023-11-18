import { GetStaticProps, InferGetStaticPropsType } from "next"
import { SSRConfig, useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { FaGithub } from "react-icons/fa"
import { Box, Flex, Heading, Icon, Stack, Text } from "@chakra-ui/react"

import { NextPageWithLayout } from "@/lib/types"

import { ButtonLink } from "@/components/Buttons"
import FeedbackCard from "@/components/FeedbackCard"
import PageMetadata from "@/components/PageMetadata"
import Translation from "@/components/Translation"

import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { trackCustomEvent } from "@/lib/utils/matomo"
import { getRequiredNamespacesForPath } from "@/lib/utils/translations"

import { RootLayout } from "@/layouts"

const handleGHAdd = () =>
  trackCustomEvent({
    eventCategory: "quiz_hub_events",
    eventAction: "Secondary button clicks",
    eventName: "GH_add",
  })

const QuizListWrapper = (props: {
  headingId: string
  descriptionId: string
}) => (
  <Stack spacing="8" px={{ base: "8", lg: 0 }} pt="12">
    <Stack spacing="8">
      <Heading size="xl">
        <Translation id={props.headingId} />
      </Heading>
      <Text>
        <Translation id={props.descriptionId} />
      </Text>
    </Stack>
    <div>Quiz List</div>
  </Stack>
)

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
      {/* TODO: Add HubHero */}
      <Box px={{ base: 0, lg: "8" }} py={{ base: 0, lg: "4" }} mb="12">
        <Flex direction={{ base: "column-reverse", lg: "row" }} columnGap="20">
          <Stack spacing="10" flex="1">
            <Box>
              <QuizListWrapper
                headingId="learn-quizzes:basics"
                descriptionId="learn-quizzes:basics-description"
              />
              <QuizListWrapper
                headingId="learn-quizzes:using-ethereum"
                descriptionId="learn-quizzes:using-ethereum-description"
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
          <Box flex="1">QuizzesStats</Box>
        </Flex>
      </Box>
      <Box w="full" py="4" px="8">
        <FeedbackCard />
      </Box>
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
