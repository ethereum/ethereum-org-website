import type { FlexProps } from "@chakra-ui/react"

import type { FileContributor } from "@/lib/types"

import FileContributors from "@/components/FileContributors"

export type GitHubContributors = FlexProps & {
  lastUpdatedDate: string
  contributors: FileContributor[]
}

const GitHubContributors = ({
  lastUpdatedDate,
  contributors,
}: GitHubContributors) => (
  <FileContributors contributors={contributors} lastEdit={lastUpdatedDate} />
)

export default GitHubContributors
