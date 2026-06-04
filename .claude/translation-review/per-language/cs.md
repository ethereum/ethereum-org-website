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
