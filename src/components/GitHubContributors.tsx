import type { FlexProps } from "@chakra-ui/react"

import FileContributors from "@/components/FileContributors"

import { useClientSideGitHubContributors } from "@/hooks/useClientSideGitHubContributors"

export interface IProps extends FlexProps {
  relativePath: string
  editPath?: string
  lastUpdatedDate: string
}

const GitHubContributors: React.FC<IProps> = ({
  relativePath,
  lastUpdatedDate,
}) => {
  const gitHubContributors = useClientSideGitHubContributors(relativePath)
  const contributors =
    "authors" in gitHubContributors ? gitHubContributors.authors! : []
  return (
    <FileContributors
      error={"error" in gitHubContributors}
      loading={gitHubContributors.loading}
      contributors={contributors}
      lastEdit={lastUpdatedDate}
    />
  )
}

export default GitHubContributors
