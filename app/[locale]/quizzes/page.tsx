import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import ContentFeedback from "@/components/ContentFeedback"
import HubHero from "@/components/Hero/HubHero"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import { getCommunityStatRows } from "@/components/Quiz/utils"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Flex, Stack } from "@/components/ui/flex"
import { Grid } from "@/components/ui/grid"
import { ListItem, UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { formatDate } from "@/lib/utils/date"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { getQuizStats } from "@/data-layer"

import QuizSections from "./_components/quiz-sections"
import QuizzesUserStats from "./_components/user-stats"
import PageJsonLD from "./page-jsonld"

import heroImg from "@/public/images/heroes/quizzes-hub-hero.png"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  // Must precede any next-intl call, or the locale is read from headers and the
  // page silently drops from static to dynamic rendering.
  setRequestLocale(locale)

  const t = await getTranslations("learn-quizzes")
  const tCommon = await getTranslations("common")

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/quizzes")
  const messages = pick(allMessages, requiredNamespaces)

  const { contributors } = await getAppPageContributorInfo(
    "quizzes",
    locale as Lang
  )

  // Null until the daily Matomo fetch lands; the community panel hides in that case
  const communityStats = await getQuizStats()

  // Pinned to UTC: there is no viewer timezone to honour at render time, and the
  // page is statically rendered, so the stamp must be timezone-independent.
  const lastUpdated =
    communityStats &&
    formatDate(new Date(communityStats.timestamp).toISOString(), locale, {
      month: "short",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "UTC",
      timeZoneName: "short",
    })

  return (
    <>
      <PageJsonLD locale={locale} contributors={contributors} />

      <HubHero
        heroImg={heroImg}
        title={tCommon("quizzes-title")}
        header={t("test-your-knowledge")}
        description={t("quizzes-subtitle")}
      />

      {/* Wraps the whole body: the stats panel and the quiz lists are client
          components and need the messages. */}
      <I18nProvider locale={locale} messages={messages}>
        <main className="px-page pt-space-3x pb-page">
          <MainArticle className="flow space-y-space-3x">
            <Grid columns={2} size="wider">
              <QuizzesUserStats
                className={!communityStats ? "md:col-span-2" : undefined}
              />

              {/* Omitted entirely when Matomo data is unavailable */}
              {communityStats && (
                <Stack className="gap-space rounded-base bg-background-highlight p-page">
                  <h2>{t("community-stats")}</h2>

                  <Flex
                    className="m-0 gap-x-20 gap-y-6 max-md:flex-col"
                    asChild
                  >
                    <UnorderedList>
                      {getCommunityStatRows(locale, communityStats).map(
                        ({ labelId, value }) => (
                          <Stack key={labelId} className="m-0 gap-0" asChild>
                            <ListItem>
                              <span className="text-body">{t(labelId)}</span>
                              <span>{value}</span>
                            </ListItem>
                          </Stack>
                        )
                      )}
                    </UnorderedList>
                  </Flex>

                  {lastUpdated && (
                    <span className="text-sm text-body-medium">
                      {tCommon("last-updated")}: {lastUpdated}
                    </span>
                  )}
                </Stack>
              )}
            </Grid>

            <QuizSections />

            {/* Same grid as the sections above, so the callout lines up with the
                quiz lists: it starts in track 2, leaving the header track empty. */}
            <Section
              className="grid gap-space-2x md:grid-cols-3"
              data-flow="skip"
            >
              <Flex className="items-center justify-between gap-4 rounded-base bg-background-highlight p-page max-md:flex-col max-md:text-center md:col-start-2 md:col-end-4">
                <div>
                  <p className="font-bold">{t("want-more-quizzes")}</p>
                  <p>{t("contribute")}</p>
                </div>
                <ButtonLink
                  href="/contributing/quizzes/"
                  variant="outline"
                  customEventOptions={{
                    eventCategory: "quiz_hub_events",
                    eventAction: "Secondary button clicks",
                    eventName: "GH_add",
                  }}
                >
                  {t("add-quiz")}
                </ButtonLink>
              </Flex>
            </Section>
          </MainArticle>

          <ContentFeedback />
        </main>
      </I18nProvider>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations()

  return await getMetadata({
    locale,
    slug: ["quizzes"],
    title: `${t("common.quizzes-title")} | ethereum.org`,
    description: t("learn-quizzes.quizzes-subtitle"),
    image: "/images/heroes/quizzes-hub-hero.png",
  })
}

export default Page
