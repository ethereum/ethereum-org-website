// Leaderboard interpolates `username` into avatar and profile URLs, so it must be a handle or ""
import fs from "fs"
import path from "path"

import { expect, test } from "@playwright/test"

import { GITHUB_USERNAME_REGEX } from "@/lib/constants"

type BountyHunter = { username: string; name: string; score: number }

const dataDir = path.resolve(__dirname, "../../../src/data")

const load = (file: string): BountyHunter[] =>
  JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf8"))

for (const file of [
  "consensus-bounty-hunters.json",
  "execution-bounty-hunters.json",
]) {
  test(`${file}: every username is empty or a valid GitHub handle`, () => {
    const invalid = load(file)
      .filter(({ username }) => username !== "")
      .filter(({ username }) => !GITHUB_USERNAME_REGEX.test(username))
      .map(({ username, name }) => `${name}: ${JSON.stringify(username)}`)

    expect(
      invalid,
      `Invalid GitHub handle(s) in ${file}. Use the person's handle, or "" to ` +
        `render initials with no GitHub link.`
    ).toEqual([])
  })
}
