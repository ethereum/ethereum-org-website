import { useEffect, useState } from "react"
import type { FlexProps } from "@chakra-ui/react"
import FileContributors from "@/components/FileContributors"
import { fetchGitHubContributors } from "@/lib/utils/fetchGitHubContributors"
import { FileContributorsState } from "@/lib/types"

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
  const [{ loading, authors, error }, setState] = useState<FileContributorsState>({ loading: true })
  useEffect(() => {
    ;(async () => {
      setState(await fetchGitHubContributors(relativePath))
    })()
  }, [])

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
