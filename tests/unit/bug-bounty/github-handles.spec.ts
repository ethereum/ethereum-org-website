/**
 * Every `username` in the bounty-hunter data must either be empty or be a
 * usable GitHub handle.
 *
 * The failure this catches is silent: `bug-bounty-leaderboard.tsx`
 * interpolates `username` straight into both the avatar URL and the profile
 * link, so a display name in that field ships a 404 avatar and two dead links
 * to `https://github.com/First Last` in the same row. Nothing throws, the row
 * still renders, and the only visible symptom is a missing image -- which the
 * `Avatar` fallback then hides behind initials.
 *
 * The regex mirrors the component's guard. It is deliberately looser than
 * GitHub's current signup rule (which also forbids trailing and consecutive
 * hyphens) because legacy accounts predate that rule: `p-` is a live account
 * in the execution list. Failing it here would push someone to "fix" a working
 * handle.
 *
 * An empty string is allowed and meaningful: it is how a hunter with no known
 * handle is recorded, and the component renders those as plain unlinked rows.
 */

import fs from "fs"
import path from "path"

import { expect, test } from "@playwright/test"

const GITHUB_USERNAME_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,38}$/

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
        `render them as an unlinked row with initials.`
    ).toEqual([])
  })
}
