# Japanese (ja) Translation Review Findings

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
