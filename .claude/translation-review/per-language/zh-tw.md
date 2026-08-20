# Traditional Chinese (zh-tw) Translation Review Findings

> **PR:** #18344 (latest/ builder blog, 3 posts)
> **Date:** 2026-06-03
> **Quality Score:** 9.5/10

## Issues Fixed

| Fix | Count | File | Details |
|-----|-------|------|---------|
| 智慧合約 -> 智能合約 | 1 | why-build-on-ethereum (L82) | "smart contract" rendered with 智慧 (smartphone sense). ETHGlossary mandates 智能合約 for crypto context; note explicitly rejects 智慧. The zh-tw privacy file (L49) already used the correct 智能合約. |

## Glossary Anchors (zh-tw)

- smart contract = 智能合約 (NOT 智慧合約 -- 智慧 is the consumer-electronics "smart")
- builder = 建構者 (privacy file used 開發者/developer in places -- warning, blurs builder/developer)
- bundler = 捆綁器 (building file used 打包者 doublet -- warning)

## Notes

- No Simplified-character leakage. All anchors/hrefs/tickers/domains preserved. No semantic inversions.
- Brand transliterations (佩克特拉/Pectra, 富薩卡/Fusaka, 格蘭斯特丹/Glamsterdam) correct.
- Remaining items are minor terminology-consistency warnings (builder, bundler), not blocking.

## PR #18772 (community-stories.json, 2026-07-10) -- 8.3/10
- CRIT fixed: 智慧合約 -> 智能合約, 4 occurrences in 3 keys (story-charles x2, story-rodrigo-nunez, story-mesoreefdao). FULL REGRESSION of the PR #18344 finding -- the pipeline re-emits this error on fresh translations; verify on every zh-tw import.
- Otherwise clean: no simplified-character leakage (even in story-shangzi whose source author wrote Simplified), no inversions.

## PR #18925 (privacy roadmap + 2 video transcripts) -- 2026-07-27 -- 9.4/10

**Fixed (critical):** `區塊提議者` -> `區塊提案者` (`roadmap/privacy` L58). The sibling `eip-7805-focil-explained` uses 提案者/區塊提案者 correctly 6+ times.

**Not fixed (warning):** `credible neutrality` rendered 可靠中立性 vs 可信中立性 in one file; 區塊構建 (23x) vs 區塊建構 (7x).

**Convention confirmed:** zh-tw keeps all 44/44 video speaker labels in Latin. That is deliberate — do not "fix" it (known-patterns #31).

## PR #18935 (intl/pending-content-translation-program-winddown-ctas) -- 2026-07-28 -- Score 9.2/10
- **Aspect (hand-fixed):** same as zh -- `是`->`曾是`, `旨在`->`曾旨在` on the program page intro and "About". zh-tw's intro was the only line in the whole 24-locale fleet left byte-identical to dev, i.e. the pipeline did not retranslate it at all.
- Traditional characters clean throughout, zero Simplified leakage; terminology internally consistent (`翻譯計畫`/`譯者`) including `get-involved`, where zh drifted.
- This run also cleaned up a stale 您/你 register inconsistency on the program page.
- `remains a priority` overstated as `首要任務`.

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 9.0/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values`.

**Fixed in this branch:**

- #42 `{#contract-accounts}` heading restored from the pre-PR blob
- #43 blank line before `{#validators-keys}` restored

**Open (native call needed):**

- #46 `密碼節點`, which in Taiwan usage parses as "password node".
- `讓你被關閉` for a person is a regression from the pre-PR `被封殺`; `關閉` takes accounts/services, not people.
- `預設` ("by default") for "by-design"; #45 `最自由` for "free-est".
- `您` in `app-asphodel-prologue-description` while every other player-addressing game entry in the file uses `你`.
- All four `page-values-internet-list-*` items were restructured so the bolded value name no longer leads the item, unlike English. Fidelity improved, list scannability worse.

**Notes:**

- The collateral `同樣具有` -> `也有一個` reword is meaning-neutral and safe to leave, though `一個 42 個字元` stacks 個 twice.
- Taiwan-vs-mainland choices are correct throughout (程式碼/實作/最佳化/生物辨識/螢幕截圖/網路, 雜湊 not 哈希); no Simplified leakage and no recurrence of the `智慧合約` regression logged for this locale.
- `處理常式` for "handler" is the correct MS zh-tw term.

## PR #19015 (intl/pending-dev) -- 2026-08-10 -- Score 9.0/10 (pre-fix)

- Scope: 11-12 files (8-9 markdown + common / learn-quizzes / page-what-is-ethereum JSON). Fleet avg 8.4.
- **Zero `智慧合約` regressions** -- the error that recurred in PRs #18344 and #18772 did not recur; keep checking it every import regardless. Fixed: `fee_recipient` described as the payer instead of the recipient in 2 table rows (`支付` -> `接收`), contradicted by its own `learn-quizzes.json`. Open: `free` rendered as 免費 (zero-cost) in `what-are-apps` frontmatter where the page itself later says ETH is required -- the liberty sense was meant.
- Fleet-wide items fixed in this branch for every locale: the `<p></p>` MDX build-breaker (8 locales), the `.pdf` autolink corruption (#50), the deleted `{#will-my-smart-contracts-change}` FAQ section (#32), the missing `<QuizWidget>` component (#49), and the two stale glamsterdam prose clauses (#51 -- `Q4 2026` and the stakers/liquidity sentence).

## PR #19076 (intl/find-wallet-translations) -- 2026-08-14 -- Score 9.6/10

Scope: `page-wallets-find-wallet.json` only -- 47 added keys (persona hero copy + a new `page-find-wallet-fee-*` disclosure cluster), 1 changed (`persona-legend` filter -> browse), 5 removed. Fleet avg 9.35.

**Fixed in this branch:** none -- no critical issues.

**Open (native call needed):**

- `fee-label-shield-unshield` -> `屏蔽` reads as physical/EM shielding in Taiwan (`屏蔽線`); Taiwan uses `封鎖` for content-blocking, as this very file does in `crops-censorship-resistant-desc`. The privacy-pool sense does not come through (#57).
- `fee-qualifier-per-card` -> `{value}/張卡`; `{value}/張` or `每張卡 {value}` reads better.

**Notes:**

- Best of its bloc. Glossary-exact including `網路` (zero `網絡`), `去中心化應用程式 (dapp)` per the Taiwan note, `橋接` for the verb, and uppercase `(L2)`.
- The recurring `智慧合約` regression (PRs #18344, #18772) did NOT recur -- zero occurrences.
- Only locale in the fleet that preserves the EN Security/Secure split (`安全性` / `安全`).
- Taiwan vocabulary correct throughout: 取得/匯入/自訂/裝置/金鑰/儲存/介面/檢視/存取/浮動/方案/新增, zero `添加`, zero `您`.

## PR #19115 -- staking redesign (6 MD + 1 JSON), 2026-08-19

**Score: 8.0/10** (fleet avg 7.8 -- lowest recorded in this series; the gap is structural, not linguistic)

`智慧合約` DID recur -- one site, run-a-node:406, now the third recurrence after #18344 and #18772. More serious: `去中心化礦池` described Rocket Pool as a MINING pool, a PoW/PoS inversion. `掃描` (scan) for the withdrawal sweep, contradicting withdrawals' own `清掃`. Zero Simplified-character leakage (verified against the repo's own zh/zh-tw corpora).

Fleet-wide defects also present in this locale (see known-patterns #60-64): heading-anchor rotation in `run-a-node`, reverted `<Card title>` attributes, untranslated image alt text, and the `</ExpandableCard>` -> `</ButtonLink>` MDX breaker. All repaired in this PR.
