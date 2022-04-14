// Libraries
import React from "react"
import styled from "styled-components"
import { useIntl } from "gatsby-plugin-intl"

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

// Data
import allTimeData from "../../../data/translation-reports/alltime-data.json"

// Utils
import { translateMessageId } from "../../../utils/translations"

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

const Contributors = ({ location }) => {
  const intl = useIntl()
  // TODO: Remove specific user checks once Acolad has updated their usernames
  const translatorData = allTimeData.data.filter(
    (item) =>
      item.user.username !== "ethdotorg" &&
      !item.user.username.includes("LQS_") &&
      !item.user.username.includes("REMOVED_USER") &&
      !item.user.username.includes("Aco_") &&
      !item.user.fullName.includes("Aco_") &&
      !item.user.username.includes("Acc_") &&
      !item.user.fullName.includes("Acc_") &&
      item.user.username !== "Finnish_Sandberg" &&
      item.user.username !== "Norwegian_Sandberg" &&
      item.user.username !== "Swedish_Sandberg"
  )

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
    </Page>
  )
}
export default Contributors
