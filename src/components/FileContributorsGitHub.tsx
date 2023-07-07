import React from "react"

import { useQuery, gql } from "@apollo/client"
import FileContributors, { Author, Commit } from "./FileContributors"

import { FlexProps } from "@chakra-ui/react"

const COMMIT_HISTORY = gql`
  query CommitHistory($relativePath: String) {
    repository(name: "ethereum-org-website", owner: "ethereum") {
      ref(qualifiedName: "master") {
        target {
          ... on Commit {
            id
            history(path: $relativePath) {
              edges {
                node {
                  author {
                    name
                    email
                    avatarUrl(size: 100)
                    user {
                      login
                      url
                    }
                  }
                  committedDate
                }
              }
            }
          }
        }
      }
    }
  }
`

export interface IProps extends FlexProps {
  relativePath: string
  editPath?: string
}

const GitHubContributors: React.FC<IProps> = ({
  relativePath,
  editPath,
  ...props
}) => {
  const { loading, error, data } = useQuery(COMMIT_HISTORY, {
    variables: { relativePath },
  })

  const commits: Array<Commit> =
    data?.repository?.ref?.target?.history?.edges?.map((commit) => commit.node)

  const lastCommit = commits?.[0] || {}
  const lastContributor = lastCommit?.author || {}
  const uniqueContributors =
    commits?.reduce(
      (res: Array<Author>, cur: Commit) => {
        if (cur.author.user === null) {
          return res
        }
        for (const contributor of res) {
          const hasAuthorInfo = !!contributor.user && !!cur.author.user
          if (
            hasAuthorInfo &&
            contributor.user.login === cur.author.user.login
          ) {
            return res
          }
        }
        res.push(cur.author)
        return res
      },
      [lastContributor]
    ) || []

  return (
    <FileContributors
      error={error}
      loading={loading}
      relativePath={relativePath}
      contributors={uniqueContributors}
      lastContributor={lastContributor}
      lastEdit={lastCommit.committedDate}
    />
  )
}

export default GitHubContributors
