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
