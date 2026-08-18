# Turkish (tr) Translation Review Findings

> **PR:** #18353 (stablecoins-2026-redesign, page-stablecoins.json)
> **Date:** 2026-06-05
> **Quality Score:** 9.2/10

## Issues Fixed

| Fix | Count | Key | Details |
|-----|-------|-----|---------|
| `Algormitik` -> `Algoritmik` | 1 | page-stablecoins-algorithmic | Spelling typo (letter transposition) in the section heading. Body string already used `algoritma` correctly. Hand-fixed (English side unchanged, manifest mapping valid). Committed in `dc5e60d71c`. |

## Glossary Anchors (tr)

- stablecoin = sabitcoin (page used "sabitcoin"/"Sabitcoinler" consistently)
- collateral = teminat
- lending = borc verme
- swap = takas
- decentralized = merkeziyetsiz
- smart contract = Akilli sozlesme
- mainnet = ana ag (not present in this file)
- client = istemci (not "musteri") -- carryover from PR #17182

## Notes

- None of the historical tr failure modes recurred: no brand translation (DeFi->MeFi, katillik), no ticker transposition (ETH->EHT, BLS->BSL), no Mainnet->Markette. All brands/tickers preserved in Latin.
- Glossary-driven mid-sentence capitalization of common nouns (Token, Cuzdan, Hesap) follows ETHGlossary `translation` casing -- consistent, non-idiomatic but not flagged as error.
- Big improvement over the PR #17182 baseline (7.7/10): this single new page is clean apart from the one heading typo.

---

## PR #18418 (intl/pending-dev) -- 2026-06-16 -- Score 9.7/10

- 21 UI-string JSONs reviewed. 0 critical. None of the historical tr failure modes recurred: client=istemci (not musteri), mainnet=Ana Ag (not market), no ETH/BLS ticker typos, no brand mistranslation, no Devanagari cross-script contamination.
- Comma decimals (%99,99) and Western numerals correct. ICU/tags/hrefs intact.

## PR #18772 (community-stories.json, 2026-07-10) -- 9.2/10
- CRIT fixed: spaced hybrid "sabit coin('ler/lerde/lerle/lere)" -> fused "sabitcoin" (5 occurrences). ETHGlossary has NO tr stablecoin entry; the old "sabit para" KB note is stale. Locale convention is "sabitcoin" (~130 occurrences across tr/*.json); common.json's "Stablecoin'ler" (3x) and "Sabit paralar" (1x) are the outliers, not the rule.
- No EHT/BSL transpositions, no DeFi letter drops, no Musteri/Markette recurrences.

## PR #18925 (privacy roadmap + 2 video transcripts) -- 2026-07-27 -- 9.3/10

**Fixed (critical):** `Blok önericilerinin` -> `Blok teklifçilerinin` (`roadmap/privacy` L58, compound entry `block proposer = blok teklifçisi`). The embedded video transcript uses `teklif edici`/`teklifçi` throughout, making `önerici` the outlier.

**Not fixed (warning):** `private` rendered `gizli` in the roadmap page but `özel` in the video embedded on that same page; PIR expanded two different ways. Visible side by side, worth a follow-up decision.

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 9.0/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values`.

**Fixed in this branch:**

- #42 `{#contract-accounts}` heading restored from the pre-PR blob
- #43 blank line before `{#validators-keys}` restored

**Open (native call needed):**

- `private` -> `özel` in the two new messaging strings vs `gizli` in 9 sibling `private*` strings in the same file — recurrence of the split logged for tr in PR #18925. `özel` also collides with `özel anahtar` (private key).
- #46 `şifreleme düğümleri`.
- `` `CREATE` işlemi `` collides with `işlem` = transaction 20 words earlier in the same sentence; the tr docs corpus uses `işlem kodu` for opcode (6x).
- `autobattler` half-translated as `otomatik savaşçı` (the unit, not the genre) while `roguelike` stays English; the tr corpus keeps genre names English.

**Notes:**

- **The `kontrat` vs `sözleşme` mix is glossary-prescribed, not a defect.** ETHGlossary has both `contract account => kontrat hesabı` (compound) and `contract => Sözleşme` (bare), so the restored heading `Kontrat hesapları` alongside body `Sözleşme adresi` is correct. Do not auto-normalize — see #30 for the inverse failure.
- `hash'inden` matches the corpus apostrophe convention (80x `hash'i`). The `page-values` rewrites are genuine improvements, including separating inspect=`incelemek` from audit=`denetlemek`.

## PR #19015 (intl/pending-dev) -- 2026-08-10 -- Score 8.6/10 (pre-fix)

- Scope: 11-12 files (8-9 markdown + common / learn-quizzes / page-what-is-ethereum JSON). Fleet avg 8.4.
- `stablecoin` had three competing forms in one PR; `common.json`'s spaced `Sabit coin'ler` -> fused `Sabitcoin'ler` (locale convention, ~130 occurrences elsewhere). Open: the stale form `sabit para` still in 6 sites of `payments/index.md`. **None of the historical tr failure modes recurred** -- no katillik, MeFi, Markette, Müşteriler, no PoS/PoW inversion.
- Fleet-wide items fixed in this branch for every locale: the `<p></p>` MDX build-breaker (8 locales), the `.pdf` autolink corruption (#50), the deleted `{#will-my-smart-contracts-change}` FAQ section (#32), the missing `<QuizWidget>` component (#49), and the two stale glamsterdam prose clauses (#51 -- `Q4 2026` and the stakers/liquidity sentence).

## PR #19076 (intl/find-wallet-translations) -- 2026-08-14 -- Score 9.3/10

Scope: `page-wallets-find-wallet.json` only -- 47 added keys (persona hero copy + a new `page-find-wallet-fee-*` disclosure cluster), 1 changed (`persona-legend` filter -> browse), 5 removed. Fleet avg 9.35.

**Fixed in this branch:**

- `fee-qualifier-stablecoins` and `-stablecoins-lower-l2`: spaced `sabit coin'ler` -> `sabitcoin'ler` (critical: **third recurrence** of this exact form after PR #18772 and PR #19015. Corpus 162 fused vs 9 spaced; `page-stablecoins.json` uses `Sabitcoinler` throughout; `sabitcoin'ler` is attested 12x. ETHGlossary has no tr stablecoin entry, so locale convention governs).

**Open (native call needed):**

- `fee-value-from` -> `{value}'den başlayan` glues a FIXED vowel-harmony suffix to a runtime placeholder. Newly introduced -- the only `{placeholder}'suffix` in all of `src/intl/tr`. The one live value (%0,5) actually needs `-ten`; other values would need `-dan`. Suffix-free fix: `{value} ve üzeri`. See #54.
- `fee-free-tier-plans` -> `{value}/ay'dan` puts a TDK-reserved apostrophe on a native common noun; `aydan` is correct.
- `crops-censorship-resistant-desc` -> `tekil` is the grammatical "singular"; should be `tek bir sağlayıcı`.
- `nfts-hero-description` -> `koleksiyonlarınızı` ("collections") narrows "collectibles".
- `fee-label-buy` (`Satın alma ücreti`) vs `-buy-sell` (`Alım/satım ücreti`) use two words for "buy" in adjacent labels in the same row.

**Notes:**

- None of the historical tr failure modes recurred: no `katılık`/`MeFi` brand mistranslation, no ETH/BLS transposition, no `Müşteri`/`Markette`, no cross-script contamination.
- `katman 2'lerde` spells L2 out rather than using the acronym -- legitimate, and the only locale to sidestep the #53 casing artifact entirely.
- Collapsing the ICU plural to one/other with identical text is correct for Turkish.
