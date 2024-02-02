import type { Author, CrowdinContributor } from "@/lib/types"

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
  const mappedContributors: Author[] = contributors.map(
    ({ id, username, avatarUrl }) => ({
      name: username,
      email: id.toString(),
      avatarUrl: avatarUrl,
      user: {
        login: username,
        url: `https://crowdin.com/profile/${username}`,
      },
    })
  )

  return (
    <FileContributors
      error={mappedContributors.length === 0} // TODO: Confirm GH error handling
      loading={!mappedContributors.length}
      contributors={mappedContributors}
      lastEdit={lastUpdatedDate}
    />
  )
}

export default CrowdinContributors
