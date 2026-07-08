import { getTranslations, setRequestLocale } from "next-intl/server"

import type { CostLeaderboardData, Lang, PageParams } from "@/lib/types"

import ContentFeedback from "@/components/ContentFeedback"
import PageHero from "@/components/Hero/PageHero"
import MainArticle from "@/components/MainArticle"
import InlineLink from "@/components/ui/Link"
import { List, ListItem } from "@/components/ui/list"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import allTimeData from "@/data/translation-reports/alltime/alltime-data.json"

import ContributorsJsonLD from "./page-jsonld"

const NAMESPACE = "page-contributing-translation-program-contributors"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations(NAMESPACE)
  const tCommon = await getTranslations("common")

  const { contributors } = await getAppPageContributorInfo(
    "contributing/translation-program/contributors",
    locale as Lang
  )

  const translators = (allTimeData as CostLeaderboardData[])
    .map((item) => item.username)
    .filter((item) => item.length > 0)

  return (
    <>
      <ContributorsJsonLD locale={locale} contributors={contributors} />

      <PageHero
        breadcrumbs={{
          slug: "/contributing/translation-program/contributors",
        }}
        title={t("page-contributing-translation-program-contributors-title")}
        description={
          <>
            <p>
              <strong className="text-xl lg:text-2xl">
                {t(
                  "page-contributing-translation-program-contributors-number-of-contributors"
                )}{" "}
                {translators.length}
              </strong>
            </p>
            <p>
              {t(
                "page-contributing-translation-program-contributors-our-translators-1"
              )}
            </p>
            <p>
              {t(
                "page-contributing-translation-program-contributors-our-translators-2"
              )}
            </p>
            <p>
              {t(
                "page-contributing-translation-program-contributors-our-translators-3"
              )}
            </p>
            <p>
              {tCommon("page-languages-interested")}{" "}
              <InlineLink href="/contributing/translation-program/">
                {tCommon("page-languages-learn-more")}
              </InlineLink>
              .
            </p>
          </>
        }
      />

      <MainArticle className="w-full flex-col items-center px-4 lg:px-8">
        <h2 className="mt-12 mb-8 leading-xs">
          {t("page-contributing-translation-program-contributors-thank-you")}
        </h2>

        <List className="grid grid-cols-1 gap-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {translators
            .sort((user1, user2) =>
              user1.toLowerCase().localeCompare(user2.toLowerCase())
            )
            .map((user) => (
              <ListItem key={user} className="truncate text-body-medium">
                {user}
              </ListItem>
            ))}
        </List>

        <p>
          {tCommon("page-languages-interested")}{" "}
          <InlineLink href="/contributing/translation-program/">
            {tCommon("page-languages-learn-more")}
          </InlineLink>
          .
        </p>

        <ContentFeedback />
      </MainArticle>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  const t = await getTranslations(NAMESPACE)

  return await getMetadata({
    locale,
    slug: ["contributing", "translation-program", "contributors"],
    title: t("page-contributing-translation-program-contributors-meta-title"),
    description: t(
      "page-contributing-translation-program-contributors-meta-description"
    ),
  })
}

export default Page
