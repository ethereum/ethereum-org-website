# it Translation Review Findings

## PR #18925 (privacy roadmap + 2 video transcripts) -- 2026-07-27 -- 9.7/10

**Fixed (critical):** `Cifratura Completamente Omoforma` -> `Omomorfa` (`roadmap/privacy` L96). "Omoforma" is not an Italian word; the term derives from *omomorfismo*. Not a glossary entry (FHE is absent from ETHGlossary), so this is an accuracy defect the glossary layer cannot catch — it appeared on a boldfaced defined term.

**Not fixed (warning):** L78 of the FOCIL transcript mirrors an English double negative through Italian's mandatory expletive-`non` after `a meno che`; literally correct but ambiguous to a native reader. Needs a native call, not a mechanical fix.

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 9.4/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values`.

**Fixed in this branch:**

- #43 blank line before `{#validators-keys}` restored

**Open (native call needed):**

- #47 gatekeeper -> `intermediario`, which this file already uses for "middleman"; `page-values-faq-3-p1` keeps `guardiano`.
- `page-values-internet-list-privacy` breaks person/number: impersonal plural `essere esclusi ... visti` then singular `tua`/`bloccarti` in the same sentence.
- Stacked `per … per` in `app-fileverse-description` and `app-kohaku-description` reads as a parse error.

**Notes:**

- `coni Taruchi` for "mint" reads as coin-minting in isolation but matches all seven existing `coniare`-for-mint renderings in this file, so it was not flagged.

## PR #19015 (intl/pending-dev) -- 2026-08-10 -- Score 8.7/10 (pre-fix)

- Scope: 11-12 files (8-9 markdown + common / learn-quizzes / page-what-is-ethereum JSON). Fleet avg 8.4.
- `layer 2 (L2)` -> `(l2)` in 3 `page-what-is-ethereum.json` keys (glossary mandates lowercase). `gatekeeper` -> `controllore`, un-collapsing it from `intermediario` (#47) -- its own sibling label already used `moderatore`.
- Fleet-wide items fixed in this branch for every locale: the `<p></p>` MDX build-breaker (8 locales), the `.pdf` autolink corruption (#50), the deleted `{#will-my-smart-contracts-change}` FAQ section (#32), the missing `<QuizWidget>` component (#49), and the two stale glamsterdam prose clauses (#51 -- `Q4 2026` and the stakers/liquidity sentence).

## PR #19076 (intl/find-wallet-translations) -- 2026-08-14 -- Score 9.8/10

Scope: `page-wallets-find-wallet.json` only -- 47 added keys (persona hero copy + a new `page-find-wallet-fee-*` disclosure cluster), 1 changed (`persona-legend` filter -> browse), 5 removed. Fleet avg 9.35.

**Fixed in this branch:** none -- no critical issues.

**Open (native call needed):**

- `hardware-hero-description` -> `Detieni a lungo termine?` is object-less *detenere*.

**Notes:**

- Highest score in the fleet. Every glossary term matches, `Per cosa paghi` is exact, `shield/unshield` correctly left in English, and the feminine value fragments agree with `Commissione` in every combination `wallet-data.ts` actually produces.
- `Portafoglio di Ethereum` matches the file's pre-existing `portafogli di Ethereum` -- not an inconsistency.

## PR #19115 -- staking redesign (6 MD + 1 JSON), 2026-08-19

**Score: 7.6/10** (fleet avg 7.8 -- lowest recorded in this series; the gap is structural, not linguistic)

Security-critical: `celle frigorifere` (refrigerated cold rooms) for "cold storage" in a key-custody sentence -- same class as #18925's Omoforma, and ETHGlossary has no `cold storage` entry for it. `contratti intelligenti` for smart contract at 3 sites. Historic stacked `per...per` and person/number breaks both recur.

Fleet-wide defects also present in this locale (see known-patterns #60-64): heading-anchor rotation in `run-a-node`, reverted `<Card title>` attributes, untranslated image alt text, and the `</ExpandableCard>` -> `</ButtonLink>` MDX breaker. All repaired in this PR.
