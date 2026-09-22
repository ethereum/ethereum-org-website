**Intake decisions — 2026-09-22**
3 decisions · 1 batch · 83 open PRs / 110 open issues

**🧭 Decide today**
**1. Homepage/get-eth crash cluster — [#19311](https://github.com/ethereum/ethereum-org-website/issues/19311), [#19306](https://github.com/ethereum/ethereum-org-website/issues/19306)** · code · impact high, effort med
Two fresh RangeError stack-overflow crashes on `/` and `/get-eth` (ETHORG-1EE: 11 hits yesterday), atop unactioned #19238/#19263/#19233/#19221. Day 4 of "name an owner"; treat as one homepage recursion regression, not a triage backlog.
→ **Assign one owner to the cluster as a regression; land or close guards #19198/#19208 (0.75)**

**✅ Verify, then merge**
**2. [#19292](https://github.com/ethereum/ethereum-org-website/pull/19292) — restore 141 missing developer tools** · data-layer · impact high, effort small
Dev-tools page has served 299 of 440 tools since 13 Sep (fetch task times out on the grown catalog). Team fix, green, wackerow self-reviewed at head. Blocked only on the required approval.
→ **pettinarip: review and merge to restore the catalog (0.8)**

**3. [#19294](https://github.com/ethereum/ethereum-org-website/pull/19294) — pin Trigger.dev off Node 21** · tooling · impact high, effort small
One line, green, no reviewer. Trigger.dev stops deploying the Node 21 default on **5 Oct**; after that the data-layer tasks are undeployable. Pins to node-22.
→ **Any team reviewer: approve and merge before 5 Oct (0.85)**

**🧩 Review batches**
- **Node-provider listings** — [#19132](https://github.com/ethereum/ethereum-org-website/pull/19132), #19157, #19035, #18872: one-file adds, product review, **day 8** — apply the bar once across all four (#19132 needs a rebase).

**⏳ Waiting on others**
- [#19097](https://github.com/ethereum/ethereum-org-website/pull/19097) — pettinarip: contributor addressed changes today, re-review the ether.fi listing
- [#19234](https://github.com/ethereum/ethereum-org-website/pull/19234) — aljobson: file the wallet issue form, then link the PR, 11d

**🔁 Carried over**
- Green standalones [#19017](https://github.com/ethereum/ethereum-org-website/pull/19017), #19259, #19261 — **day 13, still nothing**: 3 green prod/SEO fixes stuck on the review gate. The per-PR ask has failed 13 mornings — this is a policy gap: name a standing merger for small green PRs, or declare the SEO work parked.
- [#18891](https://github.com/ethereum/ethereum-org-website/issues/18891) — **day 16, still nothing**: team intl-pipeline trio (+#18896/#19031) unowned 29d. Only wackerow can act; if it isn't on their plate, close the trio.

**🗑️ Suggested closures**
- [#19271](https://github.com/ethereum/ethereum-org-website/issues/19271) spam, #19247 emoji-only, #19019 placeholder, #19014 vague — invalid/empty, 6–8 mornings (0.9)
- [#18918](https://github.com/ethereum/ethereum-org-website/pull/18918) — day 17: 4 red checks, changes requested, 0 replies; close, keep #18052 open (0.8). #17263 — 176d-idle draft.

**🔄 Since the last digest**
- Landed/cleared: find-wallet persona work #19252 + #19266 (yesterday's #1); bounty-hunter batch gone; #19276 folded into new #19308.
- New: #19292, #19294, intl manifests v2 #19295 (13k files, wackerow-only). #19272 EIP sync still green/unreviewed, day 2.

**📊 Queue** — 83 open PRs (18 conflicting, 10 failing) · 110 open issues (78 external, no team reply) · [full queue](https://github.com/ethereum/ethereum-org-website/pulls)
