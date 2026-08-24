# Urdu (ur) -- Translation Review Findings

## PR #18868 (full pipeline import, 2026-07-22) -- 8.4/10 (lowest in fleet)
- CRIT (NOT hand-fixed, needs pipeline re-pass): `gaming/index.md` -- two whole sections (`## Gaming on Ethereum`, `## Ethereum's gaming ecosystem overview`) verbatim English between translated sections. `developers/tutorials/yellow-paper-evm/index.md` -- ~half the explanatory prose (sec 9, 9.3, 9.4, 9.4.2, 9.4.3, Opcode cost, Expanding memory cost) left English. Block-matching coverage gap, not laziness.
- WARN: "trade-off" -> تبادلہ (glossary's *swap* term) on single-slot-finality; zkEVM correctly used سمجھوتہ. Prefer سمجھوتہ / loanword ٹریڈ آف.
- WARN: pattern 29 ExpandableCard `title="Why can't we have SSF today?"` untranslated (fleet-wide, English-source `title= "` extraction gap -- not ur-specific).
- WARN: secret-leader-election title uses لیڈر (loanword) vs glossary خفیہ انتخابِ قائد (قائد). Low severity.
- WARN (recurring, fleet-decision): written-out English dates (`1st March 2023`, `May 7, 2025`) and Western digits in prose vs the ur native-numeral convention. Consistent across the roadmap set; same note as PR #18772.
- Clean: no semantic inversions, near-perfect glossary compliance (MEV expanded correctly), names transliterated to Nastaliq, domains Latin, register consistent.

## PR #18772 (community-stories.json, 2026-07-10) -- 9.1/10
- CRIT fixed: bidi-isolated untranslated "March 2020" in story-dorgo-eth -> مارچ 2020 (Western digits kept, matching the file's other years). Same artifact as ar -- grep English month names on every RTL import.
- WARN (unfixed): numeral-style inconsistency -- Western 2021/400 vs native ۵/۸ in prose; ur convention doc prefers native numerals for prose but the file is mixed; left as-is pending a fleet decision.
- LRI/PDI bidi isolation marks all correctly paired across 26 keys.

## PR #18925 (privacy roadmap + 2 video transcripts) -- 2026-07-27 -- 9.8/10 (after repair)

**Repaired via scoped pipeline re-run, not by hand:** `roadmap/privacy/index.md` arrived truncated at 41% (57 of 136 lines, 2 of 6 sections), ending mid-sentence on a leaked `<HTML-PLACEHOLDER-LINK-d08112` — an MDX build-breaker — and carried `EIP-۸۱۴۱` (Eastern-Arabic numerals) in an identifier at L52. Re-dispatched `intl-pipeline.yml` with `target_path=public/content/roadmap/privacy/index.md`, `target_languages=ur`, `mode=full`; result is 135 lines, all 6 headings, no placeholder, no numeral corruption. Truncation is missing *content* — regenerate it, never hand-translate.

**Clean on re-review:** no glossary deviations, no negation flips across a very negation-dense FOCIL Q&A, formal آپ register consistent. The historical `trade-off` polysemy trap (تبادلہ/swap) is correctly rendered سمجھوتہ here — an improvement over prior reviews.

**Note:** Eastern-Arabic numerals in ordinary prose (`لیئر ۲`, `۱۰، ۱۲`) are correct Urdu convention. Only ASCII-digit corruption *inside* EIP-/ERC- identifiers is a defect.

## PR #18937 (intl/pending-content-translation-program-remove-recruitment-pages) -- 2026-07-29 -- Score 6/10 pre-fix
- The `mode=full` regeneration of `translators-guide/index.md` introduced **five oblique-case errors** that dev did not have (ترجمہ/صفحہ where ترجمے/صفحے is required before a postposition), including the frontmatter title and the `{#translating-metadata}` heading. All hand-fixed in this branch.
- **Quotation-mark demonstration broken**: the run translated the Latin sample text inside the directional quote glyphs (`„example text“` -> `„مثالی متن“`), which bidi-reverses the glyphs and destroys the thing being demonstrated. Restored to Latin, matching zh/ja and dev. Any locale reviewing this section should check the sample stays Latin.
- `<span dir="ltr">` was wrongly wrapped around the Arabic word إيثيريوم (RTL text in an LTR isolate). Removed.
- Heading/body split on وین vs واوین resolved toward واوین (the standard plural).
- Not patched, logged as judgment calls: the Capitalization sub-heading coinage (dev's term was better but broke the section's Urdu-term-first pattern), and `dir="ltr"` spans dropped from `(dd/mm/yyyy)` / `(dapps)` / `(PoW)` / `(PoS)` -- strong-LTR tokens that render fine unisolated, and the file's net span coverage rose 63->67.
- Genuine wins from the same run: 7 legacy U+2066/U+2069 isolate characters replaced with proper `<span dir="ltr">` markup, and a dropped "of Ethereum" restored to match the source.

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 8.8/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values`.

**Fixed in this branch:**

- #43 blank line before `{#validators-keys}` restored
- #44 `Arbitrum One` de-hybridised in `app-session-description`
- `app-tornado-cash-description` `لین دین` -> `ٹرانزیکشنز` (ETHGlossary reserves the transliteration for signed transactions and names `لین دین` as the form to avoid)
- Arabic kaf U+0643 -> Urdu keheh U+06A9 in the 4 PR-introduced strings that inherited the file's misspelling of `لامرکزی`

**Open (native call needed):**

- `تخلیقی کوڈ` for "creation code" reads as *creative* code — the same phrase this locale uses in `app-art-blocks-description`. The sense is initcode/constructor bytecode; prefer `کریئیشن کوڈ`.
- 36 pre-existing Arabic-kaf `لامركزی` instances remain in out-of-scope strings; only the 4 PR-introduced ones were corrected. Needs a locale-wide character sweep.
- `سکرین شاٹ`/`سکرین شاٹس` in `page-apps.json` vs this locale's `اسکرین` elsewhere.

**Notes:**

- The accounts markdown follows the file's existing convention of leaving backticked identifiers unwrapped while `<span dir="ltr">` handles bare Latin runs — RTL handling is internally consistent.
- The `page-values` reword improved intra-file consistency (`بھروسہ`/`ٹول` now align with the FAQ strings).

## PR #19015 (intl/pending-dev) -- 2026-08-10 -- Score 7.5/10 (pre-fix)

- Scope: 11-12 files (8-9 markdown + common / learn-quizzes / page-what-is-ethereum JSON). Fleet avg 8.4.
- `actor` -> `فریق` (was اداکار, film performer). Open: the glossary-AVOID form `لین دین` for "transaction fee" in 4 sites across 2 files (`ٹرانزیکشن فیس` is correct and used elsewhere in the same doc); `وٹالک بوٹیرن` vs the corpus-standard `وٹالک بوٹرین` in 4 sites; brand transliterations (Optimism/Arbitrum/ZKsync/Coinbase/PayPal) left Latin in the two JSON files. **No truncation, untranslated chunks or Eastern-Arabic numerals this run** -- ur's historical failure modes were all absent.
- Fleet-wide items fixed in this branch for every locale: the `<p></p>` MDX build-breaker (8 locales), the `.pdf` autolink corruption (#50), the deleted `{#will-my-smart-contracts-change}` FAQ section (#32), the missing `<QuizWidget>` component (#49), and the two stale glamsterdam prose clauses (#51 -- `Q4 2026` and the stakers/liquidity sentence).

## PR #19076 (intl/find-wallet-translations) -- 2026-08-14 -- Score 9.5/10

Scope: `page-wallets-find-wallet.json` only -- 47 added keys (persona hero copy + a new `page-find-wallet-fee-*` disclosure cluster), 1 changed (`persona-legend` filter -> browse), 5 removed. Fleet avg 9.35.

**Fixed in this branch:** none -- no critical issues.

**Open (native call needed):**

- `fee-qualifier-free-under-fox-discounts` -> `کے تحت` is the abstract "pursuant to" sense (`قانون کے تحت`), not a numeric threshold; prefer `{usd} سے کم پر مفت`. Warning not critical because `مفت` + an amount still steers the reader correctly.
- `results-label` -> `دریافت شدہ والیٹس` reads as "discovered wallets"; for a results counter, `ملنے والے والیٹس`.
- `fee-free-tier-plans` -> `ادا شدہ پلانز` reads as "plans that have been paid" rather than paid tiers.

**Notes:**

- Isolates verified: 47 U+2066 / 47 U+2069, zero unbalanced. Applied inconsistently WITHIN single strings -- `{usd}`/`{percent}` isolated while the adjacent `{value}` is bare. No rendering break; pick one convention.
- `L2s` correctly Latin here while the file elsewhere says `لیئر ۲` -- the Latin form is right per the always-Latin rule, so the PRE-EXISTING keys are the outlier.
- All 14 glossary terms exact including the hard ones (`ٹرانزیکشن` not `لین دین`, `پل` for bridge, `تبادلہ` for swap).

## PR #19115 -- staking redesign (6 MD + 1 JSON), 2026-08-19

**Score: 7.6/10** (fleet avg 7.8 -- lowest recorded in this series; the gap is structural, not linguistic)

Ungrammatical `نہیں گی۔` opening 4 of 5 dvt FAQ answers. `سمجھوتہ` doing double duty for trade-off (correct) and security compromise (wrong) across 4 sentences, one inverting agency. Eastern-Arabic digits inside 2 JSX title attributes. English dates bidi-isolated (#18772 recurrence) and `اداکار` (#19015 recurrence). U+2066 LRI wrapping pure-Urdu frontmatter. `پتہ`+postposition oblique-case error at ~50 sites.

Fleet-wide defects also present in this locale (see known-patterns #60-64): heading-anchor rotation in `run-a-node`, reverted `<Card title>` attributes, untranslated image alt text, and the `</ExpandableCard>` -> `</ButtonLink>` MDX breaker. All repaired in this PR.

## PR #19034 (intl/pending-dev) -- 2026-08-20 -- Score 7.8/10
Scope: new `page-open-source.json` (228 keys) + retranslated `community/research/index.md`, plus 3 single-key JSON changes. Fleet avg 8.67, median 8.80.
**Fixed in this branch:**

- Untranslated English month: `⁦August 2023⁩` -> `اگست ⁦2023⁩`. Recurrence of the class fixed in #18772 and #19115.

**Open (native call needed):**

- **Arabic kaf U+0643 in `لامركزی`, 7 PR-added sites + 1 in `common.json`: verified but deliberately NOT fixed here.** Orthographically Urdu wants keheh U+06A9, but tree-wide counts are 646 kaf vs 186 keheh -- the defective form is dominant 3.5:1. Patching 8 sites moves 646->638 and increases intra-tree inconsistency. Correct action is upstream: normalize the ETHGlossary `decentralized` ur entry, then one tree-wide codepoint sweep.
- MEV expansion regression: `میکسیمل ایکسٹریکٹ ایبل ویلیو` (1 site) replaced `زیادہ سے زیادہ قابلِ اخراج قدر` (11 sites).
- `روبسٹ انسیٹوز گروپ` -- garbled transliteration dropping the ن of *-cen-*.
- U+2066 LRI wrapping pure-Urdu frontmatter title/description (KB #64).
- Numeral system split within one new file: `۲۰۰۹` vs `1990`.
