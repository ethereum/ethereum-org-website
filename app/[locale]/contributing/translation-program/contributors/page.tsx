import { type BaseHTMLAttributes } from "react"
import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { CostLeaderboardData, Lang, PageParams } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import FeedbackCard from "@/components/FeedbackCard"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import { Flex } from "@/components/ui/flex"
import InlineLink from "@/components/ui/Link"
import { List, ListItem } from "@/components/ui/list"

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import allTimeData from "@/data/translation-reports/alltime/alltime-data.json"

import ContributorsJsonLD from "./page-jsonld"

const SLUG = "/contributing/translation-program/contributors"
const NAMESPACE = "page-contributing-translation-program-contributors"

const Content = ({ ...props }: BaseHTMLAttributes<HTMLHeadingElement>) => (
  <MainArticle className="w-full px-10 py-4" {...props} />
)

const Text = ({
  className,
  ...props
}: BaseHTMLAttributes<HTMLHeadingElement>) => (
  <p className={cn("mb-6", className)} {...props} />
)

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const { contributors } = await getAppPageContributorInfo(
    "contributing/translation-program/contributors",
    locale as Lang
  )

  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage(SLUG)
  const messages = pick(allMessages, requiredNamespaces)

  const t = await getTranslations(NAMESPACE)
  const tCommon = await getTranslations("common")

  const translators = (allTimeData as CostLeaderboardData[])
    .map((item) => item.username)
    .filter((item) => item.length > 0)

  return (
    <>
      <ContributorsJsonLD locale={locale} contributors={contributors} />
      <I18nProvider locale={locale} messages={messages}>
        <Flex className="w-full flex-col items-center">
          <Content>
            <Breadcrumbs slug={SLUG} className="mt-12" />
            <h1 className="my-8 leading-xs">
              {t("page-contributing-translation-program-contributors-title")}
            </h1>
            <h4 className="my-8 leading-xs">
              {t(
                "page-contributing-translation-program-contributors-number-of-contributors"
              )}{" "}
              {translators.length}
            </h4>
            <Text>
              {t(
                "page-contributing-translation-program-contributors-our-translators-1"
              )}
            </Text>
            <Text>
              {t(
                "page-contributing-translation-program-contributors-our-translators-2"
              )}
            </Text>
            <Text>
              {t(
                "page-contributing-translation-program-contributors-our-translators-3"
              )}
            </Text>
            <Text>
              {tCommon("page-languages-interested")}{" "}
              <InlineLink href="/contributing/translation-program/">
                {tCommon("page-languages-learn-more")}
              </InlineLink>
              .
            </Text>
            <h2 className="mt-12 mb-8 leading-xs">
              {t(
                "page-contributing-translation-program-contributors-thank-you"
              )}
            </h2>
            <List className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {translators
                .sort((user1, user2) =>
                  user1.toLowerCase().localeCompare(user2.toLowerCase())
                )
                .map((user) => (
                  <ListItem key={user} className="text-body-medium">
                    {user}
                  </ListItem>
                ))}
            </List>
            <Text>
              {tCommon("page-languages-interested")}{" "}
              <InlineLink href="/contributing/translation-program/">
                {tCommon("page-languages-learn-more")}
              </InlineLink>
              .
            </Text>
          </Content>
          <Content>
            <FeedbackCard />
          </Content>
        </Flex>
      </I18nProvider>
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
