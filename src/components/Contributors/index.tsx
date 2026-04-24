import { readFileSync } from "fs"
import { join } from "path"

import { shuffle } from "lodash"

import { Flex } from "@/components/ui/flex"

import "server-only"

export interface Contributor {
  login: string
  name: string
  avatar_url: string
  profile?: string
}

interface ContributorsProps {
  contributors?: Contributor[]
}

type AllContributorsRc = {
  contributors: (Contributor & { contributions?: string[] })[]
}

// Read `.all-contributorsrc` (bot-maintained) once at module load.
// `server-only` ensures this module never ends up in a client bundle.
const raw = readFileSync(join(process.cwd(), ".all-contributorsrc"), "utf-8")
const { contributors: rawContributors } = JSON.parse(raw) as AllContributorsRc

// Trim to the fields the card actually renders and shuffle once per SSG worker.
const shuffledContributors: Contributor[] = shuffle(
  rawContributors.map(({ login, name, avatar_url, profile }) => ({
    login,
    name,
    avatar_url,
    profile,
  }))
)

const cardClassName =
  "hover:bg-background-highlight m-2 block max-w-[132px] shadow transition-transform duration-100 hover:scale-[1.02] hover:rounded focus:scale-[1.02] focus:rounded"

const ContributorCard = ({ contributor }: { contributor: Contributor }) => {
  const body = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="h-[132px] w-[132px]"
        src={contributor.avatar_url}
        alt=""
        width={132}
        height={132}
        loading="lazy"
        decoding="async"
      />
      <div className="p-4">
        <h3 className="text-md text-body mt-2 mb-4">{contributor.name}</h3>
      </div>
    </>
  )

  if (contributor.profile) {
    return (
      <a
        href={contributor.profile}
        target="_blank"
        rel="noopener noreferrer"
        className={`${cardClassName} text-body no-underline hover:no-underline`}
      >
        {body}
      </a>
    )
  }

  return <div className={cardClassName}>{body}</div>
}

const Contributors = ({ contributors }: ContributorsProps = {}) => {
  const contributorsList = contributors ?? shuffledContributors

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
