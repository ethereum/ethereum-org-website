import React, { useState, useEffect } from "react"
import { useIntl } from "react-intl"
import axios from "axios"

import Translation from "./Translation"
import Link from "./Link"

import { translateMessageId } from "../utils/translations"

import { GATSBY_FUNCTIONS_PATH } from "../constants"
import {
  Box,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  ListItem,
  Text,
  UnorderedList,
  useToken,
} from "@chakra-ui/react"

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
  const [cardBoxShadow] = useToken("colors", ["cardBoxShadow"])

  if (!issues) {
    return null
  }
  return (
    <Flex flexWrap="wrap" my={8} width="full" gap={4}>
      {issues.map((issue, idx) => {
        const url = issue.html_url ? issue.html_url : "#"
        return (
          <LinkBox
            key={idx}
            flex={{ base: "1 1 240px", sm: "0 1 240px" }}
            w="100%"
            p={4}
            color="text"
            borderRadius="2px"
            border="1px solid"
            borderColor="lightBorder"
            transition="all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)"
            cursor="pointer"
            _hover={{
              boxShadow: cardBoxShadow,
              border: "1px solid",
              borderColor: "black300",
            }}
          >
            <Box>{issue.title}</Box>
            {issue.errorMsg && (
              <Text color="fail" mb={0}>
                {issue.errorMsg}
              </Text>
            )}
            <Box>
              {issue.html_url && (
                <LinkOverlay as={Link} href={url}>
                  Discuss
                </LinkOverlay>
              )}
            </Box>
          </LinkBox>
        )
      })}
    </Flex>
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
    <Box>
      <Text>
        <Translation id="page-about-p-1" />
      </Text>
      <Text>
        <Link to="https://github.com/ethereum/ethereum-org-website/blob/master/LICENSE">
          <Translation id="page-about-link-1" />
        </Link>
        .
      </Text>
      <Text>
        <Translation id="page-about-p-2" />{" "}
        <Link to="https://github.com/ethereum/ethereum-org-website">
          <Translation id="page-about-link-2" />
        </Link>
        <Translation id="page-about-p-3" />
      </Text>
      <UnorderedList>
        <ListItem>
          <Translation id="page-about-li-1" />
        </ListItem>
        <ListItem>
          <Translation id="page-about-li-2" />
        </ListItem>
        <ListItem>
          <Translation id="page-about-li-3" />
        </ListItem>
      </UnorderedList>
      <Text>
        <Translation id="page-about-p-4" />
      </Text>
      <Heading as="h3">
        <Translation id="page-about-h3" />
      </Heading>
      <Text>
        <Translation id="page-about-p-5" />{" "}
        <Link to="https://github.com/ethereum/ethereum-org-website/labels/Status%3A%20In%20Progress">
          <Translation id="page-about-link-3" />{" "}
        </Link>
        .
      </Text>
      <IssueSection issues={issues.inProgress} />
      <Heading as="h3">
        <Translation id="page-about-h3-2" />
      </Heading>
      <Text>
        <Translation id="page-about-p-6" />{" "}
        <Link to="https://github.com/ethereum/ethereum-org-website/issues?q=is%3Aissue+is%3Aopen+label%3A%22Status%3A+Up+Next%22">
          <Translation id="page-about-link-3" />
        </Link>
        .
      </Text>
      <IssueSection issues={issues.planned} />
      <Heading as="h3">
        <Translation id="page-about-h3-1" />
      </Heading>
      <Text>
        <Translation id="page-about-p-7" />{" "}
        <Link to="https://github.com/ethereum/ethereum-org-website/issues?q=is%3Aissue+is%3Aclosed">
          <Translation id="page-about-link-6" />{" "}
        </Link>
        .
      </Text>
      <IssueSection issues={issues.implemented} />
      <Heading as="h2">
        <Translation id="page-about-h2" />
      </Heading>
      <Text>
        <Translation id="page-about-p-8" />
      </Text>
      <UnorderedList>
        <ListItem>
          <Link to="https://discord.gg/bTCfS8C">
            <Translation id="page-about-link-4" />
          </Link>
        </ListItem>
        <ListItem>
          <Link to="https://github.com/ethereum/ethereum-org-website/issues/new/choose">
            <Translation id="page-about-link-7" />
          </Link>
        </ListItem>
        <ListItem>
          <Link to="https://twitter.com/ethdotorg">
            <Translation id="page-about-link-5" />
          </Link>
        </ListItem>
      </UnorderedList>
    </Box>
  )
}

export default Roadmap
