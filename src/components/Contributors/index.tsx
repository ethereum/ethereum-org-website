import { readFileSync } from "fs"
import { join } from "path"

import { shuffle } from "lodash"

import ContributorsView, { type Contributor } from "./ContributorsView"

import "server-only"

export type { Contributor }

interface ContributorsProps {
  contributors?: Contributor[]
}

type AllContributorsRc = {
  contributors: (Contributor & { contributions?: string[] })[]
}

let shuffledContributors: Contributor[] | undefined

// Read `.all-contributorsrc` (bot-maintained) on first render and cache.
// Deferred (not module-load) so non-Next bundlers like Storybook can import
// this module without evaluating Node's `fs`.
const getShuffledContributors = (): Contributor[] => {
  if (!shuffledContributors) {
    const raw = readFileSync(
      join(process.cwd(), ".all-contributorsrc"),
      "utf-8"
    )
    const { contributors: rawContributors } = JSON.parse(
      raw
    ) as AllContributorsRc

    shuffledContributors = shuffle(
      rawContributors.map(({ login, name, avatar_url, profile }) => ({
        login,
        name,
        avatar_url,
        profile,
      }))
    )
  }
  return shuffledContributors
}

const Contributors = ({ contributors }: ContributorsProps = {}) => (
  <ContributorsView contributors={contributors ?? getShuffledContributors()} />
)

export default Contributors
