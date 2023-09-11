// Libraries
import React from "react"
import {
  Box,
  BoxProps,
  Flex,
  HeadingProps,
  ListItem,
  SimpleGrid,
  UnorderedList,
} from "@chakra-ui/react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { graphql, PageProps } from "gatsby"
import type { Context } from "../../../types"

// Components
import Breadcrumbs from "../../../components/Breadcrumbs"
import InlineLink from "../../../components/Link"
import Translation from "../../../components/Translation"
import PageMetadata from "../../../components/PageMetadata"
import Text from "../../../components/OldText"
import OldHeading from "../../../components/OldHeading"

// Utils
import FeedbackCard from "../../../components/FeedbackCard"

const Content = (props: BoxProps) => <Box py={4} px={8} w="full" {...props} />
const ContentHeading = (props: HeadingProps) => (
  <OldHeading lineHeight={1.4} {...props} />
)

const Contributors = ({
  data,
  location,
}: PageProps<Queries.ContributorsPageQuery, Context>) => {
  const { t } = useTranslation()
  // TODO: Remove specific user checks once Acolad has updated their usernames
  const translatorData =
    data.allTimeData?.data?.flatMap(
      // use flatMap to get cleaner object types withouts nulls
      (item) => {
        const user = item?.user
        if (!user) return []

        const userName = user.username
        if (!userName) return []

        const fullName = user.fullName ?? ""

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
    ) ?? []

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
        <Breadcrumbs slug={location.pathname} />
        <ContentHeading
          as="h1"
          fontSize={{ base: "2.5rem", md: "5xl" }}
          fontWeight={700}
        >
          <Translation id="page-contributing-translation-program-contributors-title" />
        </ContentHeading>
        <ContentHeading
          as="h4"
          fontSize={{ base: "md", md: "xl" }}
          fontWeight={500}
        >
          <Text as="strong">
            <Translation id="page-contributing-translation-program-contributors-number-of-contributors" />{" "}
            {translatorData.length}
          </Text>
        </ContentHeading>
        <Text>
          <Translation id="page-contributing-translation-program-contributors-our-translators-1" />
        </Text>
        <Text>
          <Translation id="page-contributing-translation-program-contributors-our-translators-2" />
        </Text>
        <Text>
          <Translation id="page-contributing-translation-program-contributors-our-translators-3" />
        </Text>
        <Text>
          <Translation id="page-languages-interested" />{" "}
          <InlineLink to="/contributing/translation-program/">
            <Translation id="page-languages-learn-more" />
          </InlineLink>
          .
        </Text>
        <ContentHeading
          as="h2"
          fontSize={{ base: "2xl", md: "2rem" }}
          fontWeight={600}
        >
          <Translation id="page-contributing-translation-program-contributors-thank-you" />
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
          <Translation id="page-languages-interested" />{" "}
          <InlineLink to="/contributing/translation-program/">
            <Translation id="page-languages-learn-more" />
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

export const query = graphql`
  query ContributorsPage($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: {
          in: [
            "page-contributing-translation-program-contributors"
            "page-languages"
            "common"
          ]
        }
      }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    allTimeData: alltimeJson {
      data {
        user {
          username
          fullName
        }
      }
    }
  }
`
