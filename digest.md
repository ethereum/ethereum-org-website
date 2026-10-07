**Intake decisions — 2026-10-07**
4 decisions · 1 batch · 83 open PRs / 115 open issues

**🧭 Decide today**
**1. [#19408](https://github.com/ethereum/ethereum-org-website/issues/19408) — security.txt signature broken, key expired** · tooling · med / small
A Sept-2025 link rewrite changed the signed `Hiring:` URL so the clearsign no longer verifies, and the named PGP key expired 2026-02-22 though the file claims `Expires 2026-12-31`. SECURITY.md sends reporters here.
→ **Decide key ownership: re-sign with a renewed key + fix Expires, or drop the clearsign/key reference** (0.7)

**2. [#19401](https://github.com/ethereum/ethereum-org-website/pull/19401) — defer Sentry SDK until page idle** · code · med / small
Green, 8 files; buffers early errors and drains on load, first-pass note addressed. Flagged "for discussion" — it changes when monitoring starts on every page.
→ **@pettinarip: accept the deferred-init trade-off or keep eager init** (0.6)

**✅ Verify, then merge**
**3. [#19409](https://github.com/ethereum/ethereum-org-website/pull/19409) — preserve apps cache on fetch failure** · code
A failed Sheets category writes an empty category and wipes the cache feeding /dapps images. Green, +60/-4 with a new test.
→ **Confirm the failed path preserves prior cache, then merge** (0.75)

**4. [#19411](https://github.com/ethereum/ethereum-org-website/pull/19411) — strip invisible chars from tutorial code** · content
Green, whitespace-only; fixes copy-paste-broken snippets in two developer tutorials.
→ **Spot-check no code changed, then merge (low-hanging)** (0.8)

**🧩 Review batches**
- **Listing / product-review backlog** — ~12 one-file "add a node/tool/exchange" PRs, all green and BLOCKED on product review. Triage in one pass, or merge the [#18696](https://github.com/ethereum/ethereum-org-website/pull/18696) valve to auto-expire them.

**⏳ Waiting on others**
- [#19184](https://github.com/ethereum/ethereum-org-website/pull/19184) — nloureiro: rebase + address CHANGES_REQUESTED + fix 1 failing check, 22d
- [#19234](https://github.com/ethereum/ethereum-org-website/pull/19234) — aljobson: file the wallet issue form and link it, 12d

**🔁 Carried over**
- [#19017](https://github.com/ethereum/ethereum-org-website/pull/19017)/#19261/#19043 — **day 18, still nothing**: team merged its own gated PRs (#19371/#19372/#19404) but left these externals. The gate, not reviewers, is the blocker — appoint merge-duty or relax the 1-review rule for <5-file green diffs.
- [#18696](https://github.com/ethereum/ethereum-org-website/pull/18696) — **day 13, still nothing**: keystone draining the listing backlog + 106 stale items; settle the 30-day-window thread and merge.
- [#19340](https://github.com/ethereum/ethereum-org-website/issues/19340) + #19311/#19306 — day 2: live, unassigned — homepage search 403 + shared RangeError stack-overflow. Needs one owner.

**🗑️ Suggested closures**
- [#18896](https://github.com/ethereum/ethereum-org-website/pull/18896) + #18891/#19031 — obsolete: team fix #19295 shipped the frontmatter fix (0.6)
- [#18918](https://github.com/ethereum/ethereum-org-website/pull/18918) — stale: 4 failing checks, CHANGES_REQUESTED, idle 12 (0.7)

**📊 Queue** — 83 open PRs (18 conflicting, 7 failing) · 115 open issues (82 external, no team reply) · [full queue](https://github.com/ethereum/ethereum-org-website/pulls)
