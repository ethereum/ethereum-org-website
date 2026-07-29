# Czech (cs) Translation Review Findings

> **PR:** #18344 (latest/ builder blog, 3 posts)
> **Date:** 2026-06-03
> **Quality Score:** 8.8/10

## Issues Fixed

| Fix | Count | File | Details |
|-----|-------|------|---------|
| `gas` -> `gasu` | 4 | building-on-ethereum-in-2026 | Rendered literal Czech "plynu" at L34/44/66/70; ETHGlossary note: Czech community uses loanword "gas", not "plyn". Same file already used "gasu" 14x. |
| smart-contract term | 1 | (zh-tw, see zh-tw.md) | n/a |

## False Positives (NOT fixed -- verified correct)

- **zero-knowledge**: agent flagged "s nulovou znalostí" as deviating from bare `zero-knowledge => s nulovým vědomím`. But ETHGlossary has a separate `zero-knowledge proof => důkaz s nulovou znalostí` entry. Translator correctly used the bare form for "zero-knowledge tooling/language" (L3, L65) and the proof form for "zero-knowledge proof" (title, L17, L41, L77, L89). Correct throughout. See known-patterns.md #20.

## Glossary Anchors (cs)

- gas = gas (NOT plyn) -- loanword, community standard
- zero-knowledge = s nulovým vědomím; zero-knowledge proof = důkaz s nulovou znalostí
- mainnet = Mainnet; Ethereum Mainnet = often abbreviated Mainnet
- layer 1 = vrstva 1 (l1) -- lowercase l1 per glossary

## Notes

- Tone/register consistent, natural professional Czech. No MDX/href/inversion/contamination issues.
- One cosmetic consensus-term variation (konsensuální klient vs vrstva konsensu) -- warning only.

---

## PR #18418 (intl/pending-dev) -- 2026-06-16 -- Score 9.5/10

- 21 UI-string JSONs reviewed. 1 critical fixed: `glossary-tooltip.json` `ommer-definition` leaked `<HTML-PLACEHOLDER-HTMLTAG-7ff424>` -> restored to `<a href="/glossary/#pow">` (pattern 22).
- gas=gas loanword honored (not "plyn"); zero-knowledge compound-form correct. No semantic inversions, hrefs/tickers intact.

## PR #18925 (privacy roadmap + 2 video transcripts) -- 2026-07-27 -- 9.2/10

**Fixed (critical):** the inverse of this file's #18344 false positive. Here the noun phrase genuinely used the bare entry: `důkazů s nulovým vědomím` at lines 16/82/94/106/120/132 -> `s nulovou znalostí` (compound entry). The link text on 132 pointed at `/zero-knowledge-proofs/` whose own cs title uses the compound form, so the visible text disagreed with its target.

Adjectival uses correctly left on the bare entry: L88 `důkaz skutečně s nulovým vědomím`, L90 `spíše stručná než s nulovým vědomím` + `na skutečné nulové vědomí`, L104 `ověřování pasů`, L122 `hlasování`. The #18344 note stands — check which sense before touching either form.
