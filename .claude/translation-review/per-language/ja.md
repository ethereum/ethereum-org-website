# Japanese (ja) Translation Review Findings

## PR #19979 (intl/pending-dev) -- 2026-11-27 -- Score 8.9/10
Scope: 70 md pages + 20 JSON namespaces (incremental updates), changed lines only; sampled 7 md diffs and ~45 JSON keys, plus scripted sweeps (acronym parentheticals, brand names, tags, placeholders, Latin leftovers).

Fixed (critical): `glossary.json:p2p-trading-definition` carried an extra `<a href="/glossary/#smart-contract">` not in English (removed); transliterated tool/brand names on changed md lines restored to Latin (Lodestar, Nethermind, Erigon, Reth, Geth, Besu, Slither, Echidna, Chainlink, Uniswap, MetaMask, Coinbase; 15 lines); `page-developers-tools-descriptions.json` アーベ/コインベース/メタマスク to Aave/Coinbase/MetaMask (4 values); `分散型金融 (DeFi)` over bare English `DeFi` (1 value); `Lighthouse (ライトハウス)` hybrid collapsed in rust.
Open: roadmap/security list items switched from full-width `：` to `: `; `ベス`/`ゲス` etc. still katakana in 100+ untouched lines (tree convention conflicts with #113); `ERC-4626 vs ERC-7540` heading left English; mixed `<strong>`/`**` in dencun.

## PR #19962 (intl/pending-dev) -- 2026-11-26 -- Score 9.2/10
Scope: `component-diagrams.json`, 257 changed keys (Merkle proof, optimistic rollup, base fee, Gasper finality, ZK-rollup diagrams), changed lines only.

Fixed: none needed. Open: `ギリ` (colloquial) for 'Just enough'; caption `...をファイナライズ済みになります` is ungrammatical (should end `にします`); `bond` rendered as `ステーク`.

## PR #19902 (intl/pending-dev) -- 2026-11-25 -- Score 8.4/10
Scope: 7-8 re-translated pages (pos, portal-network, optimistic-rollups, zk-rollups, verifying, erc-721-vyper, SQL tutorial, glamsterdam), full PR review, sonnet agents.

Fixed: Blob to ブロブ x3 (regression of PR 19357 fix), Starknet to スタークネット. Open: transfer トランスファー vs 送金 split in erc-721, claim as 請求, at stake as ステーク, ファイナライズ済み used as verb, devnet.

## PR #19815 (intl/pending-dev) -- 2026-11-24 -- Score 8.0/10
Scope: 12 re-translated dev-docs/roadmap pages with interactive diagrams + new `component-diagrams.json` namespace (933 keys), reviewed against English at PR head 86deeb25cd.

Fixed: placeholder rebinding in 5 JSON keys (validator-keys, peer-das caption/subnets, verkle), consensus client, fork choice, equivocation. Open: BLS key pair wording, colon style, head vs sentou.

> **PR:** #18418 (intl/pending-dev)
> **Date:** 2026-06-16
> **Quality Score:** 9.6/10
> **Files reviewed:** 21 UI-string JSONs

## Issues Found

| Severity | File | Key | Issue | Fix |
|----------|------|-----|-------|-----|
| Critical (fixed) | glossary-tooltip.json | ommer-definition | Leaked sanitizer placeholder `<HTML-PLACEHOLDER-HTMLTAG-7ff424>` (pattern 22) | Restored to `<a href="/glossary/#pow">` |

## Notes

- CJK-phonetic (Katakana transliteration of brands is correct).
- No semantic inversions, no translated hrefs, no cross-script contamination, no transliterated domains. ICU placeholders and rich-text tags intact.
- The placeholder leak was a pipeline artifact (count mismatch in HTML restore), fixed in `json-batcher.ts`/`gemini.ts`; see `docs/solutions/logic-errors/intl-pipeline-html-placeholder-leak.md`.

## PR #18925 (privacy roadmap + 2 video transcripts) -- 2026-07-27 -- 9.4/10

**Fixed (critical):** `ブロック提案者` -> `ブロック・プロポーザー` (`roadmap/privacy` L58, compound glossary entry). The sibling `eip-7805-focil-explained` L120 already used the correct form.

**Not fixed (warning):** same L58 sentence renders `fork-choice` as フォーク選択 while both videos use フォークチョイス, and `attesting nodes` as 証明ノード vs アテスター elsewhere. Neither is an ETHGlossary term.

## PR #18935 (intl/pending-content-translation-program-winddown-ctas) -- 2026-07-28 -- Score 9.2/10
- **Message softened (left unfixed, needs native call):** "winding down" rendered `縮小` ("scaling down", implies continued operation at reduced size) on the program page and `contributing/index.md`, while the same PR correctly uses `段階的に終了` in `get-involved` and `終了に向かっており` in `page-collectibles`. Not an inversion -- the next clause says the Crowdin project is closing -- but it understates the announcement on the two most-read pages.
- Aspect handling was the best of the CJK group: `でした`, `目指していました`, `貢献してきました` all correctly past without intervention.
- `〜向けに` + `利用できます` on the guides lead leaves the subject dangling; `ご利用いただけます` is correct.

## PR #18937 -- 2026-07-29 -- translators-guide, 7.5/10 pre-fix
- The `mode=full` regeneration replaced the standard `完全形` with the non-standard katakana calque `フルフォーム` in three places including the `{#short-vs-full-forms}` heading. Reverted to `完全形`.
- Not patched: half-width parens around Japanese text in two spots (the file otherwise uses full-width), and `これの重要な側面は` (unnatural; dev had `この重要な側面の1つは`).
- Win from the same run: restored `訪問者がどのように自認しているかに関係なく` ("regardless of how they identify"), a source clause dev's ja had dropped entirely.

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 9.3/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values`.

**Fixed in this branch:**

- #43 blank line before `{#validators-keys}` restored
- #44 `Arbitrum One` de-hybridised in `app-session-description`

**Open (native call needed):**

- #45 "free-est" -> `最も自由` (liberty sense) rather than free-of-charge.
- "sealed auctions" -> `シールドオークション`, which Japanese readers parse as "**shield** auction"; use `封印`/`密封入札`.

**Notes:**

- `ciphernodes` -> `サイファーノード` is permitted by the CJK-phonetic group rule.
- Minor interpunct variance in non-glossary compounds (`ステルス・アドレス` vs `メッセージングアプリ`) is normal Japanese, not an error.

## PR #19015 (intl/pending-dev) -- 2026-08-10 -- Score 8.4/10 (pre-fix)

- Scope: 11-12 files (8-9 markdown + common / learn-quizzes / page-what-is-ethereum JSON). Fleet avg 8.4.
- No fixes applied. Open and well-evidenced: ETHGlossary-covered brands left in Latin in `learn-quizzes.json`/`page-what-is-ethereum.json` (Optimism, Arbitrum, Facebook, Twitter, Aave, MakerDAO, Geth) while the SAME files transliterate フェイスブック/ツイッター/ユニスワップ correctly elsewhere -- mechanical, but wants a native pass.
- Fleet-wide items fixed in this branch for every locale: the `<p></p>` MDX build-breaker (8 locales), the `.pdf` autolink corruption (#50), the deleted `{#will-my-smart-contracts-change}` FAQ section (#32), the missing `<QuizWidget>` component (#49), and the two stale glamsterdam prose clauses (#51 -- `Q4 2026` and the stakers/liquidity sentence).

## PR #19076 (intl/find-wallet-translations) -- 2026-08-14 -- Score 9.4/10

Scope: `page-wallets-find-wallet.json` only -- 47 added keys (persona hero copy + a new `page-find-wallet-fee-*` disclosure cluster), 1 changed (`persona-legend` filter -> browse), 5 removed. Fleet avg 9.35.

**Fixed in this branch:** none -- no critical issues.

**Open (native call needed):**

- `see-all-wallets` is byte-identical to the pre-existing `-table-title` (EN distinguishes "See all wallets" from "Browse all wallets"); ko/zh/zh-tw all distinguish them.
- `nfts-hero-description` -> `NFTの表示、収集、管理を行います。` is an impersonal declarative; the sibling `finance-hero-description` correctly uses `活用しましょう`.
- `persona-legend` -> `探す` is "search for", not browse, and blurs against `search-wallets` (`検索`). The *filter* sense is correctly gone.

**Notes:**

- All 13 matched glossary terms exact. `シールド/アンシールド` is the katakana term of art -- correct, not the 保護 trap.

## PR #19115 -- staking redesign (6 MD + 1 JSON), 2026-08-19

**Score: 7.7/10** (fleet avg 7.8 -- lowest recorded in this series; the gap is structural, not linguistic)

ALL 14 section headings left in English in staking/pools AND staking/saas -- saas was a regression (dev had them in Japanese), pools was already broken on dev. Only locale with this defect. Interpunct drops on glossary compounds (スマートコントラクト, シードフレーズ, ステーキングプール). Polite register uniform across all 6 files.

Fleet-wide defects also present in this locale (see known-patterns #60-64): heading-anchor rotation in `run-a-node`, untranslated image alt text, and the `</ExpandableCard>` -> `</ButtonLink>` MDX breaker. All repaired in this PR.

## PR #19034 (intl/pending-dev) -- 2026-08-20 -- Score 9.0/10
Scope: new `page-open-source.json` (228 keys) + retranslated `community/research/index.md`, plus 3 single-key JSON changes. Fleet avg 8.67, median 8.80.
**Fixed in this branch:**

- AI prompt-card fill-in blanks (`[app]`, `[my device]`, `[my system]`, `[this]`, `[this error]`, `[App]`) translated -- they were shipped as verbatim English.


**Open (native call needed):**

- `Electronic Frontier Foundation` left Latin against 5 prior `電子フロンティア財団` uses in the ja tree.
- `学習` for "study" reads as "train" in an AI-model context.
- `ケースバイケース、ツールバイツールで` -- `ツールバイツール` is not Japanese.

## PR #19326 (intl/pending-dev) -- 2026-09-28 -- Score 8.2/10

Scope: `developers/docs/accounts/index.md`, `smart-contracts/languages/index.md`, `smart-contracts/testing/index.md`, `src/intl/ja/page-apps.json`, `roadmap/pectra/index.md`. 2 critical, 13 warnings. Brand 8/10 | Technical 9/10 | Semantic 9/10 | Consistency 7/10 | Tone 8/10. Fleet average 8.1 across 24 locales.

**Fleet-wide patterns (see known-patterns #79/#80):**

- Translated Geth/`clef` console output: ja not affected, the clef transcript was already English. 17 of 24 locales hit.
- Whitehat parenthetical at `testing/index.md:245`: already repaired by this PR.
- Bare-acronym over-expansion in `page-apps.json`: not affected, zero keys expanded; de and ja were the only two clean locales.
- Trailing newline stripped at EOF by this run's writer; restored. Cosmetic only, no gate was checking it.

**Fixed in this branch (ja-specific):**

- `キーペア` -> glossary `鍵ペア`, 3 sites; the same file already used `鍵ペア` at 3 others and so does the page quiz string
- `Remix統合開発環境 (IDE)` -> `Remix IDE`; the same sentence already said "Remix IDE"
- testing:245 mismatched paren widths: the outer full-width open was closed by an ASCII `)`

**Notes:**

- Anchor sets, heading counts, code fences, link targets, JSX tags and JSON keys/ICU placeholders all byte-identical to English across 5 files; the Vyper 0.4 `@deploy`, Moccasin and Pectra content updates propagated correctly.


## PR #19351 (intl/pending-dev) -- 2026-09-29 -- Score 8.4/10 (pre-fix)

Scope: `developers/docs/accounts/index.md`, `consensus-mechanisms/pos/rewards-and-penalties/index.md`, `tutorials/send-token-ethersjs/index.md`. 1 regression fix, 2 warnings. Brand 9/10 | Technical 9/10 | Semantic 9/10 | Consistency 7/10 | Tone 8/10.

**Fixed in this branch:**

- `キーペア` -> `鍵ペア`, 4 sites (description, heading, clef sentence, Austin video line). Regression: #19326 fixed this one day earlier and the full retranslation reintroduced it. `key pair` is not an ETHGlossary entry (only `key` -> `鍵`), so the pipeline has no signal to hold it; worth adding upstream.
- Trailing newline stripped at EOF on `accounts` and `send-token-ethersjs`; restored.

**Open (native call needed):**

- `accounts:79` `[Geth]` -> `[ゴー・イーサリアム（ゲス）]` is ETHGlossary-compliant (`Go Ethereum (Geth)`), but line 94 of the same file keeps `Gethのドキュメント`.
- `accounts` bullet lists switched from です/ます to plain/noun-ending forms while prose stays polite; acceptable list style, but a register shift from the pre-PR text.


## PR #19357 (intl/pending-dev, full sweep) -- 2026-09-30 -- Score 8.2/10

Scope: full sweep, ~191-198 files. Sampled for idiom: largest prose diffs; glossary triage over scripted candidates restricted to changed lines.

**Fixed in this branch:**

- `page-find-wallet-private-transactions-desc` restored from the pre-rename `page-find-wallet-privacy-desc` value (shipped in English fleet-wide, known-patterns #81).
- `roadmap/glamsterdam:20` `Blob` -> `ブロブ`; `:31` `devnet` -> `デブネット`.

**Open (warnings):**

- open-access bank `アカウント` -> `口座`; hybrid `ユニスワップLabs`; `ノーログの証明` overstates claim.
- `鍵ペア` held -- no `キーペア` regression.

## PR #19474 (intl/pending-dev, /organizations namespaces) -- 2026-10-14 -- Score 9.2/10

Scope: full PR diff, ~27 files (8 new page-organizations*.json, common.json, small MD href/EIP updates). Label/meta acronym trim applied fleet-wide (known-patterns #86).

**Fixed in this branch:**

- `スマートコントラクト` -> `スマート・コントラクト` x3 (glossary middle dot; tree 1741 vs 149).

**Open (warnings):**

- onchain finance rendered 3 ways; 機関/機関投資家; `アービトラム One` hybrid; glamsterdam `devnets` -> `開発ネット` regressed from #19357's `デブネット`.

## PR #19486 (intl/pending-dev, networks quarantine release) -- 2026-10-15 -- Score 9.0/10

- Fixed: `[EVM-based Chains]` -> `[EVMベースのチェーン]`; `Optimistic Sepolia` heading -> `オプティミスティック Sepolia` (dev form).
- Open: L124 `Arbitrum Sepolia` heading Latin while body uses `アービトラム` (Latin is a glossary alias, not a deviation).

## PR #19556 (intl/pending-dev, run 39679413921) -- 2026-10-21 -- Score 8.6/10

Scope: 26 files (smart-contracts/security + app-plasma retranslations, prediction-markets, scam-token-tricks, new `page-wallet-descriptions` / `component-catalog-item`, founders/stories JSON).

**Fixed in this branch:**

- `page-founders-tag-{accelerator,events,mentorship}` restored from dev (#81)
- security:19 heading reverted to English (`## Guidelines for building secure Ethereum smart c` -> `## 安全なイーサリアムのスマート・コントラクトを構築するためのガイドライン`)

**Open (native call needed):**

- developers/tutorials/app-plasma/index.md:1190: ETHGlossary `revert` (scriptRule `translate`) is リバート. Dev had リバート. Flag for human. (`このステップはトランザクションを元に戻します` -> `このステップはトランザクションをリバートします`)
- 9 warnings in the PR review (see the PR #19556 review body).

**Summary:** The ja translation is fluent and faithful, and the new prediction-markets, founders and wallet-description content reads well. The main defect is that the security-page retranslation reverted all 24 guideline headings to English (the same failure as #19115). That fix and the three founders tag labels are deterministic.

## PR #19568 (intl/pending-dev) -- 2026-10-22 -- Score 9.6/10
Scope: 6 repaired developer tutorials (hello-world, mint/view/write NFT series, sending-transactions, using-websockets), changed lines only. Scores are for the PR's initial state.

**Fixed in this branch:**

- Duplicated `json` response block in how-to-write-and-deploy-an-nft removed (known-patterns #93)
- Code-fence drift restored from English: `sh` tags, `npm install dotenv` (known-patterns #92)
- `_x_` italics next to CJK characters converted to `<em>` (3 sites; known-patterns #89)

**Notes:**

- Warnings: double を at write-deploy:12; ナンス/ノンス and ガス・リミット/ガスリミット differ between prose and code comments.

## PR #19803 (intl/pending-dev) -- 2026-11-16 -- Score 9.6/10
Scope: 2 repaired developer tutorials (develop-and-test-dapps-with-a-multi-client-local-eth-testnet, how-to-use-echidna-to-test-smart-contracts), changed lines only. creating-a-wagmi-ui-for-your-contract was quarantined at the gate in all 24 locales (known-patterns #97). Scores are for the PR's initial state.

**Fixed in this branch:**

- None needed

**Open / notes:**

- `ディスカバリー` for discovery is glossary-literal but stiff; `ローカル・テストネット` vs `ローカルのテストネット` -- informational

## PR #19901 (intl/pending-dev) -- 2026-11-25 -- Score 8.6/10
Scope: gas page, translation-program page, page-developers-index.json (3 files), changed lines only. Scores are for the PR's initial state.

**Fixed in this branch:**

- Gas page inline code spans restored to English (known-patterns #101 recurrence)

**Open / notes:**

- "remain high indefinitely" rendered as "infinitely high" (gas:32); API over-expanded (#80).
- `page-developers-index.json` lost its final newline vs dev (matches en; cosmetic)
