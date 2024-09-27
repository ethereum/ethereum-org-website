import { useEffect, useState } from "react"
import shuffle from "lodash/shuffle"

import { Flex } from "@/components/ui/flex"
import InlineLink from "@/components/ui/Link"

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
          <Flex
            className="m-2 max-w-[132px] transform flex-col shadow-table transition-transform duration-100 hover:scale-[1.02] hover:rounded hover:bg-background-table-hover hover:no-underline hover:shadow-table-box-hover focus:scale-[1.02] focus:rounded focus:no-underline focus:shadow-table-box-hover"
            key={contributor.login}
          >
            <InlineLink
              className="block flex-grow text-body no-underline hover:no-underline"
              href={contributor.profile}
              hideArrow
            >
              <img
                className="h-[132px] w-[132px]"
                src={contributor.avatar_url}
                alt={contributor.name}
              />
              <div className="p-4">
                <h3 className="mb-4 mt-2 text-md">{contributor.name}</h3>
              </div>
            </InlineLink>
          </Flex>
        ))}
      </Flex>
    </>
  )
}

export default Contributors
