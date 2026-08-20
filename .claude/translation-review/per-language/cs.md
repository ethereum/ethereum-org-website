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

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 9.2/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values`.

**Fixed in this branch:**

- #43 blank line before `{#validators-keys}` restored

**Open (native call needed):**

- #46 `ciphernodes` -> `šifrovacích uzlů`.
- `šifrovaná spouštěcí prostředí` reads "launch environments"; execution = `prostředí pro vykonávání`. Mitigated by the retained English + `E3s`.
- `uzavřené aukce` reads "closed/restricted auctions" rather than sealed-bid (`aukce s uzavřenými nabídkami`).

**Notes:**

- The new `důkazech s nulovou znalostí` is the **glossary-correct** form. Three pre-existing out-of-scope strings in the same file still use `s nulovým vědomím` for the proof sense — the old ones are the drift. Do not "fix" the new string.
- `smlouva` in `app-zkpdf-description` is correct (legal paper document per the glossary note), not a `kontrakt` deviation. `razíte` for game-mint matches 5 existing uses.

## PR #19015 (intl/pending-dev) -- 2026-08-10 -- Score 7.4/10 (pre-fix)

- Scope: 11-12 files (8-9 markdown + common / learn-quizzes / page-what-is-ethereum JSON). Fleet avg 8.4.
- **`gas` rendered as the literal `plyn` in 42 sites across 5 files**, while cs `common.json` had `gas` right -- ETHGlossary's own cs note mandates the loanword. All fixed; unrelated Czech words (`plynulejší`, `plynout`) and the literal natural-gas flaring line in energy-consumption correctly untouched. Dropped `[aktualizace London](/ethereum-forks/#london)` restored; `cílovové` typo fixed.
- Fleet-wide items fixed in this branch for every locale: the `<p></p>` MDX build-breaker (8 locales), the `.pdf` autolink corruption (#50), the deleted `{#will-my-smart-contracts-change}` FAQ section (#32), the missing `<QuizWidget>` component (#49), and the two stale glamsterdam prose clauses (#51 -- `Q4 2026` and the stakers/liquidity sentence).

## PR #19076 (intl/find-wallet-translations) -- 2026-08-14 -- Score 9.7/10

Scope: `page-wallets-find-wallet.json` only -- 47 added keys (persona hero copy + a new `page-find-wallet-fee-*` disclosure cluster), 1 changed (`persona-legend` filter -> browse), 5 removed. Fleet avg 9.35.

**Fixed in this branch:** none -- no critical issues.

**Open (native call needed):**

- `fee-value-variable` -> `proměnlivé` (neuter) composes as `Poplatek za swap: proměnlivé`; `text: "variable"` only ever attaches to masculine `Poplatek` types in `wallet-data.ts`, so `proměnlivý`. Siblings `nezveřejněno`/`stanoveno poskytovatelem` are fine (impersonal neuter participles are idiomatic).
- `crops-*` adjectives are neuter/plural (`Odolné`/`Soukromé`/`Bezpečné`) but render as row labels for feminine `peněženka`; feminine or noun forms would read better.
- `new-to-crypto-hero-description` -> `udržují věci jednoduché` is a word-for-word "keep things simple".

**Notes:**

- Plural branches verified correct in wording and case: `Podporuje` + one `1 síť` / few `2 sítě` / other `5 sítí`, and `1 jazyk` / `2 jazyky` / `5 jazyků`.
- `L2` (vs the file's older `Vrstva 2`) matches the English source's own abbreviation, 31 sites in `src/intl/cs`. Not a defect.

## PR #19115 -- staking redesign (6 MD + 1 JSON), 2026-08-19

**Score: 8.0/10** (fleet avg 7.8 -- lowest recorded in this series; the gap is structural, not linguistic)

`gas`->`plyn` did NOT recur (all 12 sites use the loanword). Main issue: dvt conflated `staking pool` with `pooled staking` as `skupiny pro společný staking` at 10 sites, colliding with `skupina` used for actual groups in the same file. Compounding rendered 4 ways across the set.

Fleet-wide defects also present in this locale (see known-patterns #60-64): heading-anchor rotation in `run-a-node`, reverted `<Card title>` attributes, untranslated image alt text, and the `</ExpandableCard>` -> `</ButtonLink>` MDX breaker. All repaired in this PR.
