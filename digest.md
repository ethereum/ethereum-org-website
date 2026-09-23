**Intake decisions — 2026-09-23**
2 decisions · 1 batch · 82 open PRs / 111 open issues

**🧭 Decide today**
**1. Product-review is the queue's real bottleneck** · product · impact high, effort medium
~13 green one-file listing PRs (e.g. [#19313](https://github.com/ethereum/ethereum-org-website/pull/19313), [#19281](https://github.com/ethereum/ethereum-org-website/pull/19281), [#19035](https://github.com/ethereum/ethereum-org-website/pull/19035)) plus ~15 "suggest a tool/exchange/wallet" issues sit unowned; 78 external contributors have no team reply. Day 9, per-item review has cleared none.
→ **Name a product-review owner, run one batched triage, or merge stale-bot [#18696](https://github.com/ethereum/ethereum-org-website/pull/18696) as the auto-close valve** (0.75)

**✅ Verify, then merge**
**2. [#19318](https://github.com/ethereum/ethereum-org-website/pull/19318) — guard null `src` in Image wrapper** · code
Team fix, green, blocked only on required review. One null `logoImage` aborted the whole v11.25.0 static export ([#19315](https://github.com/ethereum/ethereum-org-website/issues/19315)); closes [#19317](https://github.com/ethereum/ethereum-org-website/issues/19317).
→ **Verify the guard, then merge to unblock the release build** (0.85)

**🧩 Review batches**
- **Green team PRs blocked only on a review** — [#19294](https://github.com/ethereum/ethereum-org-website/pull/19294) (Trigger.dev off Node 21, **undeployable after 5 Oct**), [#19292](https://github.com/ethereum/ethereum-org-website/pull/19292) (restores 141 missing dev tools), [#19319](https://github.com/ethereum/ethereum-org-website/pull/19319) (already CLEAN). All green; one approving-review pass each, in a single sitting.

**⏳ Waiting on others**
- [#19234](https://github.com/ethereum/ethereum-org-website/pull/19234) — aljobson: file the wallet issue form and link it, 12d

**🔁 Carried over**
- Recovery crashes ([#19311](https://github.com/ethereum/ethereum-org-website/issues/19311), [#19306](https://github.com/ethereum/ethereum-org-website/issues/19306) + 4) — day 2: homepage/get-eth RangeErrors, still no owner; assign one person and treat as one regression.
- intl trio [#18891](https://github.com/ethereum/ethereum-org-website/issues/18891) — **day 17, still nothing**: stop re-triaging the issue — PR [#19295](https://github.com/ethereum/ethereum-org-website/pull/19295) is the team fix that obsoletes it; review that instead.
- SEO PRs [#19017](https://github.com/ethereum/ethereum-org-website/pull/19017)/[#19259](https://github.com/ethereum/ethereum-org-website/pull/19259)/[#19261](https://github.com/ethereum/ethereum-org-website/pull/19261) — **day 14, still nothing**: green with no assigned reviewer; the fix is a standing merger, not another nudge.
- [#19097](https://github.com/ethereum/ethereum-org-website/pull/19097) — day 2: ether.fi contributor addressed changes, now awaiting pettinarip re-review.

**🗑️ Suggested closures**
- [#19271](https://github.com/ethereum/ethereum-org-website/issues/19271) — spam ("Vou fazer pix", failed PDF upload), day 4 (0.9)
- [#19014](https://github.com/ethereum/ethereum-org-website/issues/19014) / [#19019](https://github.com/ethereum/ethereum-org-website/issues/19019) — invalid/placeholder, days 9/8, repeatedly recommended and ignored; [#18696](https://github.com/ethereum/ethereum-org-website/pull/18696) would auto-handle these (0.85)
- [#18918](https://github.com/ethereum/ethereum-org-website/pull/18918) — walletless tutorial, failing checks + changes-requested, idle 29d: close or adopt (0.8)

**📊 Queue** — 82 open PRs (6 conflicting, 9 failing checks) · 111 open issues (78 external, no team reply) · [full queue](https://github.com/ethereum/ethereum-org-website/pulls)
