import React, { useState, useEffect } from "react"
import { useIntl } from "gatsby-plugin-intl"
import styled from "styled-components"
import axios from "axios"

import Translation from "../components/Translation"
import Link from "./Link"
import { FakeLinkExternal } from "./SharedStyledComponents"

import { translateMessageId } from "../utils/translations"

import { CardItem as Item } from "./SharedStyledComponents"

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

const IssueSection = ({ issues }) => {
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

const Roadmap = () => {
  const intl = useIntl()
  const issue = {
    title: translateMessageId("loading", intl),
  }
  const blankIssues = Array(6).fill(issue)
  const [issues, setIssues] = useState({
    inProgress: blankIssues,
    planned: blankIssues,
    implemented: blankIssues,
  })

  // TODO update to pull PRs & issues separately
  useEffect(() => {
    axios
      .get("/.netlify/functions/roadmap")
      .then((response) => {
        let issues = []
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
            .filter((issue) => {
              return (
                issue.state === "closed" &&
                "allcontributors[bot]" !== issue.user.login
              )
            })
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
        const errorIssue = {
          title: translateMessageId("loading-error", intl),
          errorMsg: translateMessageId("refresh", intl),
        }
        const errorIssues = Array(3).fill(errorIssue)
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
