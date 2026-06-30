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

import {
  CHECKPOINT_EVERY,
  SharedCommitter,
} from "@/scripts/intl-pipeline/lib/github/commits"

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
function installFakeGitHub(opts: { failPatchNumbers?: number[] } = {}) {
  const calls: Recorded[] = []
  const treePayloads: { tree: { path: string }[] }[] = []
  const commitPayloads: { message: string; parents: string[] }[] = []
  const refUpdates: { sha: string; force?: boolean }[] = []
  const failPatch = new Set(opts.failPatchNumbers ?? [])
  let blobN = 0
  let commitN = 0
  let patchN = 0
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
    if (u.endsWith("/git/commits")) {
      commitPayloads.push(JSON.parse(String(init?.body)))
      return jsonRes(201, { sha: `COMMIT${++commitN}` })
    }
    if (u.includes("/git/refs/heads/")) {
      patchN++
      if (failPatch.has(patchN))
        return jsonRes(422, { message: "Update is not a fast forward" })
      refUpdates.push(JSON.parse(String(init?.body)))
      return jsonRes(200, {})
    }
    throw new Error(`unexpected request: ${method} ${u}`)
  }) as typeof fetch

  return {
    calls,
    treePayloads,
    commitPayloads,
    refUpdates,
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

  test("checkpoint() flushes recorded work mid-run via a single serialized force-update", async () => {
    const { treePayloads, refUpdates, restore } = installFakeGitHub()
    try {
      const committer = new SharedCommitter("intl/pending-dev")
      await committer.init()

      await committer.commitFile(
        "public/content/translations/ko/x/index.md",
        "c",
        "ko"
      )
      await committer.commitFile(
        ".manifests/public/content/translations/ko/x/index.md/source.json",
        "{}",
        "ko"
      )
      await committer.commitFile(
        "public/content/translations/es/x/index.md",
        "c",
        "es"
      )

      // Two checkpoints fired "concurrently" must serialize through refLock and
      // never issue overlapping ref updates.
      await Promise.all([committer.checkpoint(), committer.checkpoint()])

      // Each checkpoint is a full squash -> a force-update of the ref.
      expect(refUpdates.length).toBeGreaterThanOrEqual(1)
      expect(refUpdates.every((r) => r.force === true)).toBe(true)

      // The checkpoint trees carry every recorded blob (content + manifest).
      const allPaths = treePayloads.flatMap((p) => p.tree.map((t) => t.path))
      expect(allPaths).toContain("public/content/translations/ko/x/index.md")
      expect(allPaths).toContain(
        ".manifests/public/content/translations/ko/x/index.md/source.json"
      )
      expect(allPaths).toContain("public/content/translations/es/x/index.md")
    } finally {
      restore()
    }
  })

  test("commitFile auto-checkpoints every CHECKPOINT_EVERY files", async () => {
    const { refUpdates, restore } = installFakeGitHub()
    try {
      const committer = new SharedCommitter("intl/pending-dev")
      await committer.init()

      // Exactly CHECKPOINT_EVERY files must trigger exactly one auto-flush.
      for (let i = 0; i < CHECKPOINT_EVERY; i++) {
        await committer.commitFile(
          `public/content/translations/fr/p${i}/index.md`,
          "c",
          "fr"
        )
      }
      await committer.flushCheckpoints()

      expect(refUpdates).toHaveLength(1)
      expect(refUpdates[0].force).toBe(true)
    } finally {
      restore()
    }
  })

  test("a failed checkpoint is non-fatal: run continues and the final squash still ships everything", async () => {
    // First ref PATCH (the checkpoint's force-update) returns 422.
    const { treePayloads, refUpdates, restore } = installFakeGitHub({
      failPatchNumbers: [1],
    })
    try {
      const committer = new SharedCommitter("intl/pending-dev")
      await committer.init()

      const koContent = "public/content/translations/ko/x/index.md"
      await committer.commitFile(koContent, "c", "ko")
      await committer.commitFile(
        "public/content/translations/es/x/index.md",
        "c",
        "es"
      )

      // Checkpoint's PATCH fails; must NOT throw and must NOT poison refLock.
      await committer.checkpoint() // 422 -> caught, non-fatal
      expect(refUpdates).toHaveLength(0) // failed PATCH not recorded

      // The backstop: the final squash still ships everything from base.
      await committer.squashByLanguage()
      expect(refUpdates).toHaveLength(1) // squash's force-update landed
      const allPaths = treePayloads.flatMap((p) => p.tree.map((t) => t.path))
      expect(allPaths).toContain(koContent)
      expect(allPaths).toContain("public/content/translations/es/x/index.md")
    } finally {
      restore()
    }
  })
})
