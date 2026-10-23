import { expect, test } from "@playwright/test"

import {
  type DeveloperTool,
  isToolArchived,
} from "@/lib/utils/developerToolsData"

const tool = (repos: DeveloperTool["repos"]) => ({ repos }) as DeveloperTool

test("a tool is archived only when every repo is", () => {
  expect(
    isToolArchived(
      tool([
        { href: "https://github.com/a/old", stargazers: 900, isArchived: true },
        { href: "https://github.com/a/live", stargazers: 10 },
      ])
    )
  ).toBe(false)
  expect(
    isToolArchived(
      tool([
        { href: "https://github.com/a/one", isArchived: true },
        { href: "https://github.com/a/two", isArchived: true },
      ])
    )
  ).toBe(true)
  expect(isToolArchived(tool([]))).toBe(false)
})
