import { BaseHTMLAttributes } from "react"
import { GetStaticProps } from "next/types"

import { BasePageProps, CostLeaderboardData, Lang, Params } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import FeedbackCard from "@/components/FeedbackCard"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"
import { Flex } from "@/components/ui/flex"
import InlineLink from "@/components/ui/Link"
import { List, ListItem } from "@/components/ui/list"

import { cn } from "@/lib/utils/cn"
import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import allTimeData from "@/data/translation-reports/alltime/alltime-data.json"

import { DEFAULT_LOCALE, LOCALES_CODES } from "@/lib/constants"

import { useTranslation } from "@/hooks/useTranslation"
import loadNamespaces from "@/i18n/loadNamespaces"
import { usePathname } from "@/i18n/routing"

export async function getStaticPaths() {
  return {
    paths: LOCALES_CODES.map((locale) => ({ params: { locale } })),
    fallback: false,
  }
}

export const getStaticProps = (async ({ params }) => {
  const { locale = DEFAULT_LOCALE } = params || {}

  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  const requiredNamespaces = getRequiredNamespacesForPage(
    "/contributing/translation-program/contributors"
  )

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  const messages = await loadNamespaces(locale, requiredNamespaces)

  return {
    props: {
      messages,
      contentNotTranslated,
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<BasePageProps, Params>

const Content = ({ ...props }: BaseHTMLAttributes<HTMLHeadingElement>) => (
  <MainArticle className="w-full px-10 py-4" {...props} />
)

const Text = ({
  className,
  ...props
}: BaseHTMLAttributes<HTMLHeadingElement>) => (
  <p className={cn("mb-6", className)} {...props} />
)

const Contributors = () => {
  const { t } = useTranslation(
    "page-contributing-translation-program-contributors"
  )
  const pathname = usePathname()

  const translators = (allTimeData as CostLeaderboardData[])
    .map((item: CostLeaderboardData) => item.username)
    .filter((item) => item.length > 0)

  return (
    <Flex className="w-full flex-col items-center">
      <PageMetadata
        title={t(
          "page-contributing-translation-program-contributors-meta-title"
        )}
        description={t(
          "page-contributing-translation-program-contributors-meta-description"
        )}
      />

      <Content>
        <Breadcrumbs slug={pathname} className="mt-12" />
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
          {t("common:page-languages-interested")}{" "}
          <InlineLink href="/contributing/translation-program/">
            {t("common:page-languages-learn-more")}
          </InlineLink>
          .
        </Text>
        <h2 className="mb-8 mt-12 leading-xs">
          {t("page-contributing-translation-program-contributors-thank-you")}
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
          {t("common:page-languages-interested")}{" "}
          <InlineLink href="/contributing/translation-program/">
            {t("common:page-languages-learn-more")}
          </InlineLink>
          .
        </Text>
      </Content>
      <Content>
        <FeedbackCard />
      </Content>
    </Flex>
  )
}

export default Contributors
