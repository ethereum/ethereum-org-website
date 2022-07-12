import React, { useState, useEffect } from "react"
import { useIntl } from "react-intl"
import styled from "styled-components"
import axios from "axios"

import Translation from "./Translation"
import Link from "./Link"
import { FakeLinkExternal, CardItem as Item } from "./SharedStyledComponents"

import { translateMessageId } from "../utils/translations"

import { GATSBY_FUNCTIONS_PATH } from "../constants"

const Section = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 100%;
`

const ErrorMsg = styled.div`
  color: ${(props) => props.theme.colors.fail};
`

export interface Label {
  name: string
}

export interface Issue {
  html_url?: string
  title: string
  errorMsg?: string
  labels: Array<Label>
  state?: string
  user?: {
    login: string
  }
  pull_request?: string
}

export interface IPropsIssueSection {
  issues: Array<Issue>
}

const IssueSection: React.FC<IPropsIssueSection> = ({ issues }) => {
  if (!issues) {
    return null
  }
  return (
    <Section>
      {issues.map((issue, idx) => {
        const url = issue.html_url ? issue.html_url : "#"
        return (
          <Item to={url} key={idx} hideArrow={true}>
            <div>{issue.title}</div>
            {issue.errorMsg && <ErrorMsg>{issue.errorMsg}</ErrorMsg>}
            <div>
              {issue.html_url && <FakeLinkExternal>Discuss</FakeLinkExternal>}
            </div>
          </Item>
        )
      })}
    </Section>
  )
}

export interface IProps {}

const Roadmap: React.FC<IProps> = () => {
  const intl = useIntl()
  const issue: Issue = {
    title: translateMessageId("loading", intl),
    labels: [],
  }
  const blankIssues: Array<Issue> = Array(6).fill(issue)
  const [issues, setIssues] = useState<{ [status: string]: Array<Issue> }>({
    inProgress: blankIssues,
    planned: blankIssues,
    implemented: blankIssues,
  })

  // Checks if any of the label objects in the array of labels associated with an issue have the spam label
  const issueIsSpam = (issue: Issue) =>
    issue.labels.some((label) => label.name === "Type: Spam")

  const issueIsAbandoned = (issue: Issue) =>
    issue.labels.some((label) => label.name === "Status: Abandoned")

  // TODO update to pull PRs & issues separately
  useEffect(() => {
    axios
      .get(`${GATSBY_FUNCTIONS_PATH}/roadmap`)
      .then((response) => {
        let issues: Array<Issue> = []
        if (response.data && response.data.data) {
          issues = response.data.data
          const planned = issues
            .filter((issue) => {
              for (const label of issue.labels) {
                if (label.name === "Status: Up Next") {
                  return issue.state === "open"
                }
              }
              return false
            })
            .slice(0, 6)

          const inProgress = issues
            .filter((issue) => {
              // if is an open PR
              if (!!issue.pull_request) {
                return issue.state === "open"
              }

              // if issue is in progress
              for (const label of issue.labels) {
                if (label.name === "Status: In Progress") {
                  return issue.state === "open"
                }
              }
              return false
            })
            .slice(0, 6)

          const implemented = issues
            .filter(
              (issue) =>
                issue.state === "closed" &&
                !!issue.user &&
                "allcontributors[bot]" !== issue.user.login &&
                !!issue.pull_request &&
                !issueIsSpam(issue) &&
                !issueIsAbandoned(issue)
            )
            .slice(0, 6)
          setIssues({
            planned,
            inProgress,
            implemented,
          })
        }
      })
      .catch((error) => {
        console.error(error)
        const errorIssue: Issue = {
          title: translateMessageId("loading-error", intl),
          errorMsg: translateMessageId("refresh", intl),
          labels: [],
        }
        const errorIssues: Array<Issue> = Array(3).fill(errorIssue)
        setIssues({
          planned: errorIssues,
          inProgress: errorIssues,
          implemented: errorIssues,
        })
      })
  }, [intl])

  return (
    <div>
      <p>
        <Translation id="page-about-p-1" />
      </p>
      <p>
        <Link to="https://github.com/ethereum/ethereum-org-website/blob/master/LICENSE">
          <Translation id="page-about-link-1" />
        </Link>
        .
      </p>
      <p>
        <Translation id="page-about-p-2" />{" "}
        <Link to="https://github.com/ethereum/ethereum-org-website">
          <Translation id="page-about-link-2" />
        </Link>
        <Translation id="page-about-p-3" />
      </p>
      <ul>
        <li>
          <Translation id="page-about-li-1" />
        </li>
        <li>
          <Translation id="page-about-li-2" />
        </li>
        <li>
          <Translation id="page-about-li-3" />
        </li>
      </ul>
      <p>
        <Translation id="page-about-p-4" />
      </p>
      <h3>
        <Translation id="page-about-h3" />
      </h3>
      <p>
        <Translation id="page-about-p-5" />{" "}
        <Link to="https://github.com/ethereum/ethereum-org-website/labels/Status%3A%20In%20Progress">
          <Translation id="page-about-link-3" />{" "}
        </Link>
        .
      </p>
      <IssueSection issues={issues.inProgress} />
      <h3>
        <Translation id="page-about-h3-2" />
      </h3>
      <p>
        <Translation id="page-about-p-6" />{" "}
        <Link to="https://github.com/ethereum/ethereum-org-website/issues?q=is%3Aissue+is%3Aopen+label%3A%22Status%3A+Up+Next%22">
          <Translation id="page-about-link-3" />
        </Link>
        .
      </p>
      <IssueSection issues={issues.planned} />
      <h3>
        <Translation id="page-about-h3-1" />
      </h3>
      <p>
        <Translation id="page-about-p-7" />{" "}
        <Link to="https://github.com/ethereum/ethereum-org-website/issues?q=is%3Aissue+is%3Aclosed">
          <Translation id="page-about-link-6" />{" "}
        </Link>
        .
      </p>
      <IssueSection issues={issues.implemented} />
      <h2>
        <Translation id="page-about-h2" />
      </h2>
      <p>
        <Translation id="page-about-p-8" />
      </p>
      <ul>
        <li>
          <Link to="https://discord.gg/bTCfS8C">
            <Translation id="page-about-link-4" />
          </Link>
        </li>
        <li>
          <Link to="https://github.com/ethereum/ethereum-org-website/issues/new/choose">
            <Translation id="page-about-link-7" />
          </Link>
        </li>
        <li>
          <Link to="https://twitter.com/ethdotorg">
            <Translation id="page-about-link-5" />
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Roadmap
