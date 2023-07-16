import React, { useEffect, useState } from "react"

import { useI18next } from "gatsby-plugin-react-i18next"
import { useStaticQuery, graphql } from "gatsby"
import { FlexProps } from "@chakra-ui/react"
import FileContributors, { Author, Commit } from "./FileContributors"
import { useQuery, gql } from "@apollo/client"

interface Contributor {
  id: string
  username: string
  avatarUrl: string
  totalCosts: number
}

interface Data {
  fileId: string
  contributors: Contributor[]
}

interface LangContributor {
  lang: string
  data: Data[]
}

export interface IProps extends FlexProps {
  relativePath: string
  editPath?: string
  langContributors: LangContributor[]
}

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

const FILE_IDS_QUERY = graphql`
  {
    allFileIdsJson {
      nodes {
        jsonId
        path
      }
    }
  }
`

export async function getFileIdByPath(fileIdsData, path, language) {
  const normalizedPath = path.replace(
    new RegExp(`^src/content/translations/${language}/`),
    ""
  )

  for (const item of fileIdsData) {
    const normalizedItemPath = item.path.replace(/^\/+|\/+$/g, "")
    if (normalizedItemPath === normalizedPath) {
      return item.jsonId
    }
  }

  return null
}

const CrowdinContributors: React.FC<IProps> = ({
  relativePath,
  editPath,
  langContributors,
  ...props
}) => {
  const [mappedContributors, setMappedContributors] = useState<Author[]>([])
  const [error, setError] = useState(false)
  const { language } = useI18next()
  const { allFileIdsJson } = useStaticQuery(FILE_IDS_QUERY)

  const { data, loading } = useQuery(COMMIT_HISTORY, {
    variables: { relativePath },
  })

  const commits: Array<Commit> =
    data?.repository?.ref?.target?.history?.edges?.map((commit) => commit.node)
  const lastCommit = commits?.[0] || {}
  const lastEdit = lastCommit.committedDate

  const fileIdsData = allFileIdsJson.nodes

  useEffect(() => {
    const fetchContributors = async () => {
      const id = await getFileIdByPath(fileIdsData, relativePath, language)
      const crowdinContributorsForLang = langContributors[0].data
      const crowdinContributorsForFile = crowdinContributorsForLang.find(
        (file) => file.fileId === id.toString()
      )

      if (
        !crowdinContributorsForFile ||
        !crowdinContributorsForFile.contributors ||
        !crowdinContributorsForFile.contributors.length
      ) {
        setError(true)
        return
      }

      const mapped: Author[] =
        crowdinContributorsForFile.contributors.map((contributor) => {
          return {
            name: contributor.username,
            email: contributor.id,
            avatarUrl: contributor.avatarUrl,
            user: {
              login: contributor.username,
              url: `https://crowdin.com/profile/${contributor.username}`,
            },
          }
        }) || []

      setMappedContributors(mapped)
    }

    fetchContributors()
  }, [fileIdsData, relativePath, language, langContributors])

  const lastContributor = mappedContributors.length ? mappedContributors[0] : {}

  return (
    <FileContributors
      error={error}
      loading={!mappedContributors.length && loading}
      relativePath={relativePath}
      contributors={mappedContributors}
      lastContributor={lastContributor}
      lastEdit={lastEdit}
    />
  )
}

export default CrowdinContributors
