import type { CrowdinContributor, FileContributor } from "@/lib/types"

import FileContributors from "@/components/FileContributors"

type CrowdinContributorsProps = {
  relativePath: string
  lastUpdatedDate: string
  contributors: CrowdinContributor[]
}
const CrowdinContributors = ({
  lastUpdatedDate,
  contributors,
}: CrowdinContributorsProps) => {
  const mappedContributors: FileContributor[] = contributors.map(
    ({ username, avatarUrl }) => ({
      login: username,
      avatar_url: avatarUrl,
      html_url: `https://crowdin.com/profile/${username}`,
      date: lastUpdatedDate,
    })
  )

  return (
    <FileContributors
      contributors={mappedContributors}
      lastEdit={lastUpdatedDate}
    />
  )
}

export default CrowdinContributors
