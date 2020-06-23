import React, { useState, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"
import Link from "./Link"

const Section = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;
  margin-bottom: 2rem;
`

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 1rem 1rem 1rem 0;
  padding: 0.8rem;
  flex: 0 1 240px;
  list-style: none;
  border-radius: 0.5rem;
  width: 100%;
  border: 1px dotted ${(props) => props.theme.colors.lightBorder};
  box-shadow: 0 1px 4px ${(props) => props.theme.colors.boxShadow};
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  color: ${(props) => props.theme.colors.text};

  &:hover {
    box-shadow: 0 4px 8px ${(props) => props.theme.colors.boxShadowHover};
    border: 1px dotted ${(props) => props.theme.colors.primary};
  }
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
      {issues.map((issue) => {
        return (
          <Item>
            <div>{issue.title}</div>
            {issue.errorMsg && <ErrorMsg>{issue.errorMsg}</ErrorMsg>}
            <div>
              {issue.html_url && <Link to={issue.html_url}>Discuss</Link>}
            </div>
          </Item>
        )
      })}
    </Section>
  )
}

const Roadmap = () => {
  const issue = {
    title: "Loading...",
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
                  return true
                }
              }
            })
            .slice(0, 6)

          const inProgress = issues
            .filter((issue) => {
              // if is an open PR
              if (!!issue.pull_request && issue.state === "open") {
                return true
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
          title: "Loading error.",
          errorMsg: "Please refresh the page.",
        }
        const errorIssues = Array(3).fill(errorIssue)
        setIssues({
          planned: errorIssues,
          inProgress: errorIssues,
          implemented: errorIssues,
        })
      })
  }, [])

  return (
    <div>
      <h2 class="l2">Request a feature</h2>
      Do you have an idea for how to improve ethereum.org? We'd love to
      collaborate with you!
      <ul>
        <li>
          <Link to="https://discord.gg/bTCfS8C">Join our Discord server</Link>
        </li>
        <li>
          <Link to="https://github.com/ethereum/ethereum-org-website/issues/new/choose">
            Create an issue on Github
          </Link>
        </li>
        <li>
          <Link to="https://twitter.com/ethdotorg">
            Reach out to us on Twitter
          </Link>
        </li>
      </ul>
      <h2 class="l2">Ethereum.org Roadmap</h2>
      <p>
        Ever since the launch of ethereum.org, we strive to be transparent about
        how we operate. This is one of our core values because we believe
        transparency is crucial to Ethereum's success.
      </p>
      <p>
        The
        <Link to="https://github.com/ethereum/ethereum-org-website/blob/master/LICENSE">
          source code of this repository is licensed under the MIT License
        </Link>
        . We use
        <Link to="https://github.com/ethereum/ethereum-org-website">
          GitHub
        </Link>
        as our primary project management tool. We organize our tasks in 3
        categories: in progress, planned and implemented. We do our best to keep
        the community informed what the status is of a specific task.
      </p>
      <h3 class="l3">Work in progress</h3>
      <p>
        Tasks that we're implementing.{" "}
        <Link to="https://github.com/ethereum/ethereum-org-website/labels/Status%3A%20In%20Progress">
          View the full list of tasks in progress on Github{" "}
        </Link>
        .
      </p>
      <IssueSection issues={issues.inProgress} />
      <h3 class="l3">Planned features</h3>
      <p>
        Tasks we've queued up to implement next.{" "}
        <Link to="https://github.com/ethereum/ethereum-org-website/issues?q=is%3Aissue+is%3Aopen+label%3A%22Status%3A+Up+Next%22">
          View the full list of tasks in progress on Github{" "}
        </Link>
        .
      </p>
      <IssueSection issues={issues.planned} />
      <h3 class="l3">Implemented features</h3>
      <p>
        Recently completed tasks.{" "}
        <Link to="https://github.com/ethereum/ethereum-org-website/issues?q=is%3Aissue+is%3Aclosed">
          View the full list of implemented tasks on Github{" "}
        </Link>
        .
      </p>
      <IssueSection issues={issues.implemented} />
    </div>
  )
}

export default Roadmap
