"use client"

import { useEffect, useState } from "react"
import { shuffle } from "lodash"

import { Image } from "@/components/Image"
import { Flex } from "@/components/ui/flex"
import InlineLink from "@/components/ui/Link"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"

import allContributors from "../../../all-contributors.json"

export interface Contributor {
  login: string
  name: string
  avatar_url: string
  profile?: string
  contributions: Array<string>
}

interface ContributorsProps {
  contributors?: Contributor[]
}

const ContributorCard = ({ contributor }: { contributor: Contributor }) => {
  const content = (
    <>
      <Image
        className="h-[132px] w-[132px]"
        src={contributor.avatar_url}
        alt=""
        width={132}
        height={132}
        sizes="132px"
      />
      <div className="p-4">
        <h3 className="text-md text-body mt-2 mb-4">
          {contributor.profile ? (
            <LinkOverlay asChild>
              <InlineLink
                className="text-body no-underline hover:no-underline"
                href={contributor.profile}
                hideArrow
              >
                {contributor.name}
              </InlineLink>
            </LinkOverlay>
          ) : (
            contributor.name
          )}
        </h3>
      </div>
    </>
  )

  if (contributor.profile) {
    return (
      <LinkBox className="hover:bg-background-highlight m-2 max-w-[132px] transform shadow transition-transform duration-100 hover:scale-[1.02] hover:rounded focus:scale-[1.02] focus:rounded">
        {content}
      </LinkBox>
    )
  }

  return <div className="m-2 max-w-[132px] shadow">{content}</div>
}

const Contributors = ({ contributors }: ContributorsProps) => {
  const [contributorsList, setContributorsList] = useState<Contributor[]>([])

  useEffect(() => {
    if (contributors) {
      setContributorsList(contributors)
    } else {
      setContributorsList(shuffle(allContributors.contributors))
    }
  }, [contributors])

  return (
    <>
      <p>
        Thanks to our {contributorsList.length} Ethereum community members who
        have contributed so far!
      </p>

      <Flex className="flex-wrap">
        {contributorsList.map((contributor) => (
          <ContributorCard key={contributor.login} contributor={contributor} />
        ))}
      </Flex>
    </>
  )
}

export default Contributors
