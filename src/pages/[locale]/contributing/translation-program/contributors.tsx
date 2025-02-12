import { BaseHTMLAttributes } from "react"
import { useRouter } from "next/router"
import { GetStaticProps } from "next/types"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { BasePageProps, CostLeaderboardData, Lang } from "@/lib/types"

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

import allTimeData from "../../../data/translation-reports/alltime/alltime-data.json"

export const getStaticProps = (async ({ locale }) => {
  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  const requiredNamespaces = getRequiredNamespacesForPage(
    "/contributing/translation-program/contributors"
  )

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

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
  const router = useRouter()

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
        <Breadcrumbs slug={router.asPath} className="mt-12" />
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
