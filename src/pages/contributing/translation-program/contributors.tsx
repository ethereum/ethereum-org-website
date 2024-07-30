import { useRouter } from "next/router"
import { GetStaticProps } from "next/types"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import {
  Box,
  BoxProps,
  Flex,
  HeadingProps,
  ListItem,
  SimpleGrid,
  UnorderedList,
} from "@chakra-ui/react"

import { BasePageProps, CostLeaderboardData, Lang } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import FeedbackCard from "@/components/FeedbackCard"
import InlineLink from "@/components/Link"
import MainArticle from "@/components/MainArticle"
import OldHeading from "@/components/OldHeading"
import Text from "@/components/OldText"
import PageMetadata from "@/components/PageMetadata"

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

const Content = (props: BoxProps) => (
  <Box as={MainArticle} py={4} px={10} w="full" {...props} />
)
const ContentHeading = (props: HeadingProps) => (
  <OldHeading lineHeight={1.4} {...props} />
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
    <Flex direction="column" align="center" w="full">
      <PageMetadata
        title={t(
          "page-contributing-translation-program-contributors-meta-title"
        )}
        description={t(
          "page-contributing-translation-program-contributors-meta-description"
        )}
      />

      <Content>
        <Breadcrumbs slug={router.asPath} mt={12} />
        <ContentHeading
          as="h1"
          fontSize={{ base: "2.5rem", md: "5xl" }}
          fontWeight={700}
        >
          {t("page-contributing-translation-program-contributors-title")}
        </ContentHeading>
        <ContentHeading
          as="h4"
          fontSize={{ base: "md", md: "xl" }}
          fontWeight={500}
        >
          <Text as="strong">
            {t(
              "page-contributing-translation-program-contributors-number-of-contributors"
            )}{" "}
            {translators.length}
          </Text>
        </ContentHeading>
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
        <ContentHeading
          as="h2"
          fontSize={{ base: "2xl", md: "2rem" }}
          fontWeight={600}
        >
          {t("page-contributing-translation-program-contributors-thank-you")}
        </ContentHeading>
        <SimpleGrid as={UnorderedList} columns={[1, 2, 3, 4, 6]} ms="1.45rem">
          {translators
            .sort((user1, user2) =>
              user1.toLowerCase().localeCompare(user2.toLowerCase())
            )
            .map((user) => (
              <ListItem key={user} color="text300">
                {user}
              </ListItem>
            ))}
        </SimpleGrid>
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
