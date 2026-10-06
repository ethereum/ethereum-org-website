**Intake decisions — 2026-10-06**
4 decisions · 1 batch · 86 open PRs / 115 open issues

**🧭 Decide today**
**1. Production-crash cluster — assign one owner** · code · impact high, effort medium
New [#19340](https://github.com/ethereum/ethereum-org-website/issues/19340): homepage search 403s from Typesense (10d), plus two identical `RangeError: call stack exceeded` ([#19311](https://github.com/ethereum/ethereum-org-website/issues/19311) homepage, [#19306](https://github.com/ethereum/ethereum-org-website/issues/19306) /get-eth). All bot-filed, unassigned, no reply.
→ **One owner; #19311/#19306 are one recursion regression, #19340 a separate search-auth fault** (0.75)

**2. [#18696](https://github.com/ethereum/ethereum-org-website/pull/18696) — merge the stale-bot auto-close valve** · tooling · impact high, effort small
One file, green, 91 days old. The 30-day close window sits in an unresolved 5-comment thread — the keystone that drains 106 stale items + the listing backlog below.
→ **Settle the thread, then merge (not merge-verified: ms=UNKNOWN)** (0.7)

**✅ Verify, then merge**
**3. [#19361](https://github.com/ethereum/ethereum-org-website/pull/19361) — stop copy buttons submitting their form** · code
Fixes bug [#19360](https://github.com/ethereum/ethereum-org-website/issues/19360): CopyToClipboard/CopyButton default to type=submit. 2 files, green, Storybook repro, reviewers requested.
→ **Confirm the type=button default breaks no existing submit usage, then merge** (0.8)

**4. [#19366](https://github.com/ethereum/ethereum-org-website/pull/19366) — sync Hegotá EIP list to upgrade data** · technical-content
Team PR, one file, green, 0 reviews; same pattern as merged #19272, from content-review #19171.
→ **Confirm the 13 EIPs match generated upgrade data, then merge** (0.75)

**🧩 Review batches**
- **Listing / product-review backlog** — [#19382](https://github.com/ethereum/ethereum-org-website/pull/19382), [#19378](https://github.com/ethereum/ethereum-org-website/pull/19378), [#19334](https://github.com/ethereum/ethereum-org-website/pull/19334) + 21 more: 24 green one-file provider/tool adds stuck on product review. One triage pass, or let #18696 auto-close them.

**⏳ Waiting on others**
- [#19097](https://github.com/ethereum/ethereum-org-website/pull/19097) — wackerow: re-review the addressed ether.fi changes, idle 1d
- [#19234](https://github.com/ethereum/ethereum-org-website/pull/19234) — aljobson: file the wallet issue form, 11d

**🔁 Carried over**
- Green review-gate PRs (#19017/#19043/#19261) — **day 17, still nothing**: naming reviewers hasn't worked; appoint weekly merge-duty or drop the 1-review gate for <5-file green PRs
- [#18918](https://github.com/ethereum/ethereum-org-website/pull/18918) — day 21: close the failing walletless tutorial, keep #18052 open
- [#17263](https://github.com/ethereum/ethereum-org-website/pull/17263) — day 18: close the stale draft (idle 190d)
- Frontmatter trio (#18896/#18891/#19031) — day 3: close as obsoleted by merged #19295

**🗑️ Close:** [#18636](https://github.com/ethereum/ethereum-org-website/pull/18636) — recommend-close label + AI likely-close, idle 27d (0.75)

**🔄 Since last digest** — all 4 prior verify-then-merge cards merged (#19292/#19318/#19272/#19332); 4 invalid/spam closed; ~18 new PRs over the 11-day gap

**📊 Queue** — 86 open PRs (1 conflicting, 7 failing checks) · 115 open issues (82 external, no team reply) · [full queue](https://github.com/ethereum/ethereum-org-website/pulls)
