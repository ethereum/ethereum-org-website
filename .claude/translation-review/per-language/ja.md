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
