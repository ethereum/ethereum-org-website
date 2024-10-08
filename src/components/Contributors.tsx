import { useEffect, useState } from "react"
import shuffle from "lodash/shuffle"

import { Flex } from "@/components/ui/flex"
import InlineLink from "@/components/ui/Link"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"

import data from "!!raw-loader!@/../.all-contributorsrc"

export interface Contributor {
  login: string
  name: string
  avatar_url: string
  profile: string
  contributions: Array<string>
}

const allContributors = JSON.parse(data)

const Contributors = () => {
  const [contributorsList, setContributorsList] = useState<Contributor[]>([])

  useEffect(() => {
    setContributorsList(shuffle(allContributors.contributors))
  }, [])

  return (
    <>
      <p>
        Thanks to our {contributorsList.length} Ethereum community members who
        have contributed so far!
      </p>

      <Flex className="flex-wrap">
        {contributorsList.map((contributor) => (
          <LinkBox
            as="div"
            className="m-2 max-w-[132px] transform shadow transition-transform duration-100 hover:scale-[1.02] hover:rounded hover:bg-background-highlight focus:scale-[1.02] focus:rounded"
            key={contributor.login}
          >
            <img
              className="h-[132px] w-[132px]"
              src={contributor.avatar_url}
              alt={contributor.name}
            />
            <div className="p-4">
              <h3 className="mb-4 mt-2 text-md">
                <LinkOverlay asChild>
                  <InlineLink
                    className="text-body no-underline hover:no-underline"
                    href={contributor.profile}
                    hideArrow
                  >
                    {contributor.name}
                  </InlineLink>
                </LinkOverlay>
              </h3>
            </div>
          </LinkBox>
        ))}
      </Flex>
    </>
  )
}

export default Contributors
