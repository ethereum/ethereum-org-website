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
  editPath,
}) => {
  const { loading, authors, error } = useClientSideGitHubContributors(relativePath)
  return (
    <FileContributors
      error={!!error}
      loading={loading}
      contributors={authors || []}
      lastEdit={lastUpdatedDate}
      editPath={editPath}
    />
  )
}

export default GitHubContributors
