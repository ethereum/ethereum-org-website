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
