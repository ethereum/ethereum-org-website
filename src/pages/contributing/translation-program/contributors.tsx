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

import { AllTimeData, BasePageProps, Unpacked } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import FeedbackCard from "@/components/FeedbackCard"
import InlineLink from "@/components/Link"
import MainArticle from "@/components/MainArticle"
import OldHeading from "@/components/OldHeading"
import Text from "@/components/OldText"
import PageMetadata from "@/components/PageMetadata"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import allTimeData from "../../../data/translation-reports/alltime/alltime-data.json"

type TranslatorDataType = {
  user: {
    username: Unpacked<AllTimeData["data"]>["user"]["username"]
    fullName: Unpacked<AllTimeData["data"]>["user"]["fullName"]
  }
}

export const getStaticProps = (async ({ locale }) => {
  const lastDeployDate = getLastDeployDate()

  const requiredNamespaces = getRequiredNamespacesForPage(
    "/contributing/translation-program/contributors"
  )

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployDate,
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

  // TODO: Remove specific user checks once Acolad has updated their usernames
  const translatorData = (
    allTimeData as AllTimeData
  ).data.flatMap<TranslatorDataType>(
    // use flatMap to get cleaner object types withouts nulls
    (item) => {
      const user = item.user

      const userName = user.username

      const fullName = user.fullName

      return userName !== "ethdotorg" &&
        !userName.includes("LQS_") &&
        !userName.includes("REMOVED_USER") &&
        !userName.includes("Aco_") &&
        !fullName.includes("Aco_") &&
        !userName.includes("Acc_") &&
        !fullName.includes("Acc_") &&
        userName !== "Finnish_Sandberg" &&
        userName !== "Norwegian_Sandberg" &&
        userName !== "Swedish_Sandberg"
        ? [
            {
              user: {
                username: userName,
                fullName: fullName,
              },
            },
          ]
        : []
    }
  )

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
            {translatorData.length}
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
          {translatorData
            .map(({ user }) => user.username)
            .sort((user1, user2) =>
              user1.toLowerCase().localeCompare(user2.toLowerCase())
            )
            .map((user) => {
              return (
                <ListItem key={user} color="text300">
                  {user}
                </ListItem>
              )
            })}
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