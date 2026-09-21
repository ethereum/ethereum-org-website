/**
 * Playwright Test suite for the developer-tools GitHub enrichment.
 *
 * GraphQL aliases are positional, so the query and the loop that reads the
 * response have to walk the same array. When the query builder filtered
 * unqueryable owner/name pairs on its own, every alias after a rejected entry
 * landed on the wrong repo -- and because the result map still came back full,
 * neither the coverage gate nor the logs could see it.
 */

import { expect, test } from "@playwright/test"

import { fetchGitHub } from "@/data-layer/fetchers/developer-tools/fetchGitHub"

type Tool = { name: string; repos: string[] }

const VALID_A = "https://github.com/alpha/one"
// `~` is legal in a url path but not in a GitHub owner, so this is filtered out
const UNQUERYABLE = "https://github.com/bad~org/two"
const VALID_B = "https://github.com/beta/three"
const VALID_C = "https://github.com/gamma/four"

function repoPayload(stargazerCount: number) {
  return {
    stargazerCount,
    forkCount: 0,
    watchers: { totalCount: 0 },
    mentionableUsers: { totalCount: 0 },
    issues: { totalCount: 0 },
    isArchived: false,
    isFork: false,
    pushedAt: null,
    defaultBranchRef: null,
  }
}

test.describe("fetchGitHub alias alignment", () => {
  const originalFetch = globalThis.fetch
  const originalToken = process.env.GITHUB_TOKEN_READ_ONLY
  let sentQuery = ""

  test.beforeAll(() => {
    process.env.GITHUB_TOKEN_READ_ONLY = "test-token"
    globalThis.fetch = (async (_: unknown, init?: RequestInit) => {
      sentQuery = JSON.parse(String(init?.body)).query
      // The server answers by alias, in the order the query asked
      return new Response(
        JSON.stringify({
          data: {
            repo0: repoPayload(111),
            repo1: repoPayload(222),
            repo2: repoPayload(333),
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      )
    }) as typeof fetch
  })

  test.afterAll(() => {
    globalThis.fetch = originalFetch
    if (originalToken === undefined) delete process.env.GITHUB_TOKEN_READ_ONLY
    else process.env.GITHUB_TOKEN_READ_ONLY = originalToken
  })

  test("an unqueryable repo does not shift stats onto its neighbours", async () => {
    const tools: Tool[] = [
      { name: "a", repos: [VALID_A] },
      { name: "bad", repos: [UNQUERYABLE] },
      { name: "b", repos: [VALID_B] },
      { name: "c", repos: [VALID_C] },
    ]

    const result = await fetchGitHub(tools)
    const starsFor = (name: string) =>
      result.find((t) => t.name === name)?.repos[0]?.stargazers

    // The rejected repo is absent from the query entirely
    expect(sentQuery).not.toContain("bad~org")
    expect(sentQuery).toContain('owner: "alpha"')
    expect(sentQuery).toContain('owner: "beta"')
    expect(sentQuery).toContain('owner: "gamma"')

    // Each alias lands on the repo the query actually asked for
    expect(starsFor("a")).toBe(111)
    expect(starsFor("b")).toBe(222)
    expect(starsFor("c")).toBe(333)

    // The filtered-out repo stays unresolved rather than borrowing a neighbour
    expect(starsFor("bad")).toBeUndefined()
  })
})
