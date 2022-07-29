// Libraries
import React from "react"
import styled from "styled-components"
import { useIntl } from "react-intl"
import { graphql, PageProps } from "gatsby"
import type { Context } from "../../../types"

// Components
import Breadcrumbs from "../../../components/Breadcrumbs"
import Link from "../../../components/Link"
import Translation from "../../../components/Translation"
import PageMetadata from "../../../components/PageMetadata"
import {
  Content,
  ListItem,
  Page,
} from "../../../components/SharedStyledComponents"

// Utils
import { translateMessageId } from "../../../utils/translations"
import FeedbackCard from "../../../components/FeedbackCard"

// Styles
const HorizontalUl = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;

  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    grid-template-columns: 1fr;
  }
`

const Contributors = ({
  data,
  location,
}: PageProps<Queries.ContributorsPageQuery, Context>) => {
  const intl = useIntl()
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
    <Page>
      <PageMetadata
        title={translateMessageId(
          "page-contributing-translation-program-contributors-meta-title",
          intl
        )}
        description={translateMessageId(
          "page-contributing-translation-program-contributors-meta-description",
          intl
        )}
      />

      <Content>
        <Breadcrumbs slug={location.pathname} />
        <h1>
          <Translation id="page-contributing-translation-program-contributors-title" />
        </h1>
        <h4>
          <strong>
            <Translation id="page-contributing-translation-program-contributors-number-of-contributors" />{" "}
            {translatorData.length}
          </strong>
        </h4>
        <p>
          <Translation id="page-contributing-translation-program-contributors-our-translators-1" />
        </p>
        <p>
          <Translation id="page-contributing-translation-program-contributors-our-translators-2" />
        </p>
        <p>
          <Translation id="page-contributing-translation-program-contributors-our-translators-3" />
        </p>
        <p>
          <Translation id="page-languages-interested" />{" "}
          <Link to="/contributing/translation-program/">
            <Translation id="page-languages-learn-more" />
          </Link>
          .
        </p>
        <h2>
          <Translation id="page-contributing-translation-program-contributors-thank-you" />
        </h2>
        <HorizontalUl>
          {translatorData
            .map(({ user }) => user.username)
            .sort((user1, user2) =>
              user1.toLowerCase().localeCompare(user2.toLowerCase())
            )
            .map((user) => {
              return <ListItem key={user}>{user}</ListItem>
            })}
        </HorizontalUl>
        <p>
          <Translation id="page-languages-interested" />{" "}
          <Link to="/contributing/translation-program/">
            <Translation id="page-languages-learn-more" />
          </Link>
          .
        </p>
      </Content>
      <Content>
        <FeedbackCard />
      </Content>
    </Page>
  )
}

export default Contributors

export const query = graphql`
  query ContributorsPage {
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
