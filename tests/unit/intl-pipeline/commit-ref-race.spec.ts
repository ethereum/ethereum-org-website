/**
 * SharedCommitter ref-race regression -- guards the manifest-loss bug.
 *
 * Background: an earlier design advanced the branch ref on every per-file
 * commit. Under the translation pool's concurrency those ref updates raced and
 * returned 422 "not a fast forward". A task that threw on that 422 had already
 * recorded its content blob but aborted before recording its manifest blob(s),
 * so the end-of-run squash shipped content WITHOUT its manifest and silently
 * desynced manifest tracking (see run 27984239227: ~733 files translated, ~0
 * markdown manifests committed).
 *
 * Contract now: commitFile() only creates+records a blob and NEVER touches the
 * branch ref. The single ref update happens once, in squashByLanguage().
 */

import { expect, test } from "@playwright/test"

// Side-effect import: sets placeholder tokens before the @/scripts import below,
// because config.ts throws on a missing GITHUB_API_TOKEN at import time.
import "./env-shim"

import { SharedCommitter } from "@/scripts/intl-pipeline/lib/github/commits"

type Recorded = { method: string; path: string }

function jsonRes(status: number, body: unknown) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
    text: async () => JSON.stringify(body),
    clone() {
      return this
    },
  } as unknown as Response
}

/**
 * Install a fake GitHub git-data API on globalThis.fetch. Records every call
 * and the body of every POST /git/trees. Returns a restore() to put the real
 * fetch back.
 */
function installFakeGitHub() {
  const calls: Recorded[] = []
  const treePayloads: { tree: { path: string }[] }[] = []
  let blobN = 0
  const originalFetch = globalThis.fetch

  globalThis.fetch = (async (url: string | URL, init?: RequestInit) => {
    const u = String(url)
    const method = init?.method ?? "GET"
    calls.push({ method, path: u.replace(/.*\/git\//, "git/") })

    if (u.includes("/git/ref/heads/"))
      return jsonRes(200, { object: { sha: "BASESHA" } })
    if (u.includes("/git/commits/") && method === "GET")
      return jsonRes(200, { tree: { sha: "BASETREE" } })
    if (u.endsWith("/git/blobs")) return jsonRes(201, { sha: `BLOB${++blobN}` })
    if (u.endsWith("/git/trees")) {
      treePayloads.push(JSON.parse(String(init?.body)))
      return jsonRes(201, { sha: `TREE${treePayloads.length}` })
    }
    if (u.endsWith("/git/commits")) return jsonRes(201, { sha: "NEWCOMMIT" })
    if (u.includes("/git/refs/heads/")) return jsonRes(200, {})
    throw new Error(`unexpected request: ${method} ${u}`)
  }) as typeof fetch

  return {
    calls,
    treePayloads,
    restore: () => {
      globalThis.fetch = originalFetch
    },
  }
}

test.describe("SharedCommitter ref-race safety", () => {
  test("commitFile records blobs without touching the ref; squash lands content+manifest together", async () => {
    const { calls, treePayloads, restore } = installFakeGitHub()
    try {
      const committer = new SharedCommitter("intl/pending-dev")
      await committer.init()

      // The exact sequence that used to break: content commit, then its
      // manifest commit, for the same task.
      const content = "public/content/translations/ko/x/index.md"
      const manifest =
        ".manifests/public/content/translations/ko/x/index.md/source.json"
      await committer.commitFile(content, "translated", "ko")
      await committer.commitFile(manifest, "{}", "ko")

      // No branch ref update during the run -- the race surface is gone.
      expect(calls.filter((c) => c.method === "PATCH")).toHaveLength(0)

      await committer.squashByLanguage()

      // Exactly one ref update, performed once at squash time.
      expect(calls.filter((c) => c.method === "PATCH")).toHaveLength(1)

      // The squashed tree for ko carries BOTH content and its manifest.
      const koTree = treePayloads[treePayloads.length - 1].tree.map(
        (t) => t.path
      )
      expect(koTree).toContain(content)
      expect(koTree).toContain(manifest)
    } finally {
      restore()
    }
  })

  test("interleaved commitFile across languages records every content+manifest blob", async () => {
    const { calls, treePayloads, restore } = installFakeGitHub()
    try {
      const committer = new SharedCommitter("intl/pending-dev")
      await committer.init()

      const langs = ["es", "ko", "ar"]
      const files = ["guides/a/index.md", "guides/b/index.md"]
      const expected = new Set<string>()

      // Fire every content+manifest commit concurrently, mimicking the task
      // pool's interleaving across languages. The old serialized/ref-advancing
      // design would race here; the new one only creates+records blobs.
      const work: Promise<void>[] = []
      for (const lang of langs) {
        for (const f of files) {
          const content = `public/content/translations/${lang}/${f}`
          const manifest = `.manifests/${content}/source.json`
          expected.add(content)
          expected.add(manifest)
          // Per task, content is recorded before its manifest.
          work.push(
            committer
              .commitFile(content, "c", lang)
              .then(() => committer.commitFile(manifest, "{}", lang))
          )
        }
      }
      await Promise.all(work)

      // Still no ref update until squash.
      expect(calls.filter((c) => c.method === "PATCH")).toHaveLength(0)

      await committer.squashByLanguage()

      // One squash commit (one tree) per language, and the union of all
      // squashed trees contains every blob recorded -- nothing dropped.
      expect(treePayloads).toHaveLength(langs.length)
      const allPaths = treePayloads.flatMap((p) => p.tree.map((t) => t.path))
      expect(allPaths).toHaveLength(expected.size)
      for (const p of expected) expect(allPaths).toContain(p)
    } finally {
      restore()
    }
  })
})
