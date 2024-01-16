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
  const state = useClientSideGitHubContributors(relativePath)

  return (
    <FileContributors
      error={"error" in state}
      loading={state.loading as boolean}
      contributors={"data" in state ? state.data : []}
      lastEdit={lastUpdatedDate}
    />
  )
}

export default GitHubContributors
