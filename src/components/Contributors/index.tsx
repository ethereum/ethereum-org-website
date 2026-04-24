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

const Contributors = ({ contributors }: ContributorsProps = {}) => (
  <ContributorsView contributors={contributors ?? shuffledContributors} />
)

export default Contributors
