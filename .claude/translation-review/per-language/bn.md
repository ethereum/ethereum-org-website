# Bengali (bn) -- Translation Review Findings

## PR #18772 (community-stories.json, 2026-07-10) -- 9.4/10
- CRIT fixed: "Web2" left Latin in story-sebastian -> ওয়েব২ per ETHGlossary (web2 => ওয়েব২). Watch web2/web3 script split: glossary transliterates web2 but keeps Web3 Latin.
- WARN: "transfer" rendered both ট্রান্সফার and হস্তান্তর within story-nico-bolivia (glossary: হস্তান্তর; ট্রান্সফার common in speech).

## PR #18925 (privacy roadmap + 2 video transcripts) -- 2026-07-27 -- 9.2/10

**Fixed (critical):** `zero-knowledge proof` used the bare entry + transliterated head noun (`জিরো-নলেজ প্রুফ`) at 6 sites in `roadmap/privacy`; corrected to the compound entry `শূন্য-জ্ঞান প্রমাণ`. Adjectival/zkVM uses (`জিরো-নলেজ ভার্চুয়াল`, `জিরো-নলেজ হয়`, passport, voting) correctly left on the bare entry. `anonymity set` -> `বেনামী সেট`.

**Not fixed (warning):** 11 of 85 speaker labels in `eip-7805-focil-explained` left in Latin, and "Thomas Thiery" transliterated two ways. See known-patterns #31 — convention question, fix upstream.

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 9.4/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values`.

**Fixed in this branch:**

- #43 blank line before `{#validators-keys}` restored
- #44 `Arbitrum One` de-hybridised in `app-session-description`

**Open (native call needed):**

- #48 "exposure" -> `উন্মুক্ততা` (openness) makes the transparency/exposure warning tautological; suggest `প্রকাশ্যতা`.
- `page-values-internet-list-privacy` uses `সুযোগ দেয়` ("grants the opportunity") for "lets you be shut down" — favourable connotation on a risk statement.

**Notes:**

- **Protect from naive auto-fix:** `app-zkpdf-description` renders "legal contracts" as `আইনি চুক্তি`, not the glossary's `কন্ট্রাক্ট`. That is correct — the glossary note reserves `চুক্তি` for traditional legal documents.
- The `page-values` reword is a net fidelity gain: moving `গোপনীয়তা ছাড়া` ahead of the bolded head noun fixes an English-word-order calque.
- **Sweep gotcha:** a `[ऀ-ॿ]` Devanagari-leak check fires on every bn string, because Bengali shares the danda `।` U+0964 with the Devanagari block.

## PR #19015 (intl/pending-dev) -- 2026-08-10 -- Score 9.1/10 (pre-fix)

- Scope: 11-12 files (8-9 markdown + common / learn-quizzes / page-what-is-ethereum JSON). Fleet avg 8.4.
- Two corrupted words that destroyed a negation, both fixed: `প্রয়োজন হবে ঘন` -> `হবে না` (transactions -- view/pure calls need NO gas) and `থাকেবিধা নেই` -> `থাকে না` (payments). `actor` -> `পক্ষ` (was অভিনেতা, film performer). Dropped `<strong>` around DeFi restored.
- Fleet-wide items fixed in this branch for every locale: the `<p></p>` MDX build-breaker (8 locales), the `.pdf` autolink corruption (#50), the deleted `{#will-my-smart-contracts-change}` FAQ section (#32), the missing `<QuizWidget>` component (#49), and the two stale glamsterdam prose clauses (#51 -- `Q4 2026` and the stakers/liquidity sentence).

## PR #19076 (intl/find-wallet-translations) -- 2026-08-14 -- Score 9.2/10

Scope: `page-wallets-find-wallet.json` only -- 47 added keys (persona hero copy + a new `page-find-wallet-fee-*` disclosure cluster), 1 changed (`persona-legend` filter -> browse), 5 removed. Fleet avg 9.35.

**Fixed in this branch:** none -- no critical issues.

**Open (native call needed):**

- `fee-row-label` uses bare English `পে` in a table header; prefer `আপনি কিসের জন্য অর্থ প্রদান করছেন`.
- `hardware-hero-description` drops the "while you hold" clause.
- `fee-value-set-by-provider` uses `প্রোভাইডার` where pre-existing `methodology-verification` says `প্রদানকারী`.
- `fee-qualifier-of-rewards` -> `রিওয়ার্ড` vs the tree-dominant `পুরস্কার` (see #56).

**Notes:**

- `fee-qualifier-stablecoins-lower-l2` uses Western `লেয়ার 2` -- follows house numeral policy and CONTRADICTS ETHGlossary's `লেয়ার ২`. mr resolved the same conflict the opposite way. See #53; do not hand-fix either side until the glossary is normalized.
- Devanagari-range hits in this file are the shared danda U+0964 -- the known false positive.

## PR #19115 -- staking redesign (6 MD + 1 JSON), 2026-08-19

**Score: 7.8/10** (fleet avg 7.8 -- lowest recorded in this series; the gap is structural, not linguistic)

Meaning inversion at withdrawals:209 (`যতক্ষণ না` = until, English says as-long-as); `অভিনেতা` (film actor) for "actors" -- recurrence of #19015; `রিওয়ার্ড`->`পুরস্কার` in pools only; `লেনদেন`->`ট্রানজ্যাকশন` regression in run-a-node; `চুক্তি` (legal doc) for contract in 2 JSON keys. No untranslated prose, no cross-script contamination.

Fleet-wide defects also present in this locale (see known-patterns #60-64): heading-anchor rotation in `run-a-node`, reverted `<Card title>` attributes, untranslated image alt text, and the `</ExpandableCard>` -> `</ButtonLink>` MDX breaker. All repaired in this PR.

## PR #19034 (intl/pending-dev) -- 2026-08-20 -- Score 8.6/10
Scope: new `page-open-source.json` (228 keys) + retranslated `community/research/index.md`, plus 3 single-key JSON changes. Fleet avg 8.67, median 8.80.
**Fixed in this branch:**
- AI prompt-card fill-in blanks (`[app]`, `[my device]`, `[my system]`, `[this]`, `[this error]`, `[App]`) translated -- they were shipped as verbatim English.

- `হয়বিধা নেই` junk-syllable corruption destroying the negation in `page-open-source-local-ai-description-2` (3rd recurrence of this bn artifact family).
- `চুক্তি` -> `কন্ট্রাক্ট` for smart contracts, against the glossary note that reserves `চুক্তি` for legal documents.

**Open (native call needed):**

- `কমিউনিটি` -> `সম্প্রদায়` regression at 4 sites (tree is 208:14 for `কমিউনিটি`).
- bn files use precomposed U+09DF (NFC-excluded) -- pre-existing tree-wide, not a PR defect.
