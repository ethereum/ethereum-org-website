# Marathi (mr) Translation Review Findings

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 8.4/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values`.

**Fixed in this branch:**

- #43 blank line before `{#validators-keys}` restored
- #44 `Arbitrum One` de-hybridised in `app-session-description`

**Open (native call needed):**

- #48 "exposure" -> `उघडपणा` (frankness/openness) — a positive, and it collides with the page's own "open code" value.
- `शिल्लक` -> `बॅलन्स` drift away from the dominant locale form, which `glossary-tooltip.json` `state-definition` also uses.
- "calculated" -> `मोजला` (count/measure); technical register is `काढला`/`गणना केली`.
- Noun-stacked English-style compounds with gender disagreement in `app-nachtara-description` and `app-umbra-description`.

**Notes:**

- `स्तर २` (Devanagari numeral) conflicts with the Indic Western-Arabic-numerals rule but is locale-wide — 89 `स्तर २` vs 71 `स्तर 2` across `src/intl/mr`, 7 already in this file. Needs a separate sweep; **do not fix on one string**.
- `शून्य-ज्ञान पुरावा` in `app-freedom-tool-description` differs from the 6 in-file `झिरो-नॉलेज` but matches `glossary-tooltip.json`'s canonical term — not a defect.

## PR #19015 (intl/pending-dev) -- 2026-08-10 -- Score 8.5/10 (pre-fix)

- Scope: 11-12 files (8-9 markdown + common / learn-quizzes / page-what-is-ethereum JSON). Fleet avg 8.4.
- `actor` -> `घटक` (was अभिनेते). **`miners` -> `खनिक`** (was `खनिज` = mineral, producing "minerals must use computing hardware"). `common.json`: zero-knowledge-proofs -> `शून्य-ज्ञान पुरावे` (matches the page title) and `enterprise-mainnet` -> `मेननेट`.
- Fleet-wide items fixed in this branch for every locale: the `<p></p>` MDX build-breaker (8 locales), the `.pdf` autolink corruption (#50), the deleted `{#will-my-smart-contracts-change}` FAQ section (#32), the missing `<QuizWidget>` component (#49), and the two stale glamsterdam prose clauses (#51 -- `Q4 2026` and the stakers/liquidity sentence).

## PR #19076 (intl/find-wallet-translations) -- 2026-08-14 -- Score 9.4/10

Scope: `page-wallets-find-wallet.json` only -- 47 added keys (persona hero copy + a new `page-find-wallet-fee-*` disclosure cluster), 1 changed (`persona-legend` filter -> browse), 5 removed. Fleet avg 9.35.

**Fixed in this branch:** none -- no critical issues.

**Open (native call needed):**

- `developer-hero-description` -> `बिल्डिंग` reads as a physical edifice; prefer `निर्मितीसाठी`. Moderate confidence -- the file code-mixes heavily.
- `fee-free-tier-plans` -> `{value}/महिना पासून` is a clumsy postposition after a slash-compound.

**Notes:**

- `fee-qualifier-stablecoins-lower-l2` carries Devanagari `स्तर २` while the SAME file's `page-find-wallet-layer-2` reads `स्तर 2`. ETHGlossary's mr entry is `स्तर २ (l2)`; locale is split 96/67. Follows the glossary, CONTRADICTS the house Western-numeral rule -- bn resolved the identical conflict the opposite way. See #53; needs a locale-wide sweep plus glossary normalization, NOT a one-string fix.
- Glossary compliance exact including the two native-word mandates (swap = अदलाबदल, bridge = सेतू).

## PR #19115 -- staking redesign (6 MD + 1 JSON), 2026-08-19

**Score: 7.6/10** (fleet avg 7.8 -- lowest recorded in this series; the gap is structural, not linguistic)

Indic loaded-polyseme bloc failure recurs at 4 sites: `कलाकार`/`अभिनेते` (performers) for actors (#19015 recurrence), `युक्तिवाद` (debating argument) for a CLI argument, `तडजोड` (concession) for security compromise, `प्रमुख` (chief) for chain head. `रिवॉर्ड्स`->`बक्षिसे`. JSON `विश्वसनीय` read as praise in a warning slot.

Fleet-wide defects also present in this locale (see known-patterns #60-64): heading-anchor rotation in `run-a-node`, reverted `<Card title>` attributes, untranslated image alt text, and the `</ExpandableCard>` -> `</ButtonLink>` MDX breaker. All repaired in this PR.

## PR #19034 (intl/pending-dev) -- 2026-08-20 -- Score 8.7/10
Scope: new `page-open-source.json` (228 keys) + retranslated `community/research/index.md`, plus 3 single-key JSON changes. Fleet avg 8.67, median 8.80.
**Fixed in this branch:**

- AI prompt-card fill-in blanks (`[app]`, `[my device]`, `[my system]`, `[this]`, `[this error]`, `[App]`) translated -- they were shipped as verbatim English.


**Open (native call needed):**

- Five mild Indic polyseme misses: `जागा` (space->place, a regression), `कुटुंबे` (families->households), `नाकारू` (deprecate->refuse), `नियंत्रण` (capture->control), `मर्यादा` (floor->cap).
- `Amazon`/`ॲमेझॉन` split within one file.

## PR #19142 (intl/pending-devcon-banner) -- 2026-08-21 -- Score 9.8/10
Scope: new `component-devcon-banner.json` (6 keys). Fleet avg 9.9.

**Fixed in this branch:**

- `Devcon` -> `डेवकॉन` in `title` and `subtitle`, matching devcon.org's own Marathi site. `logo-alt` stays Latin.

**Open (native call needed):**

- `title` renders "the curious" as `उत्सुक` (eager, keen) where `जिज्ञासू` (inquisitive) is the precise match; hi used `जिज्ञासु` correctly on the same string.


## PR #19326 (intl/pending-dev) -- 2026-09-28 -- Score 7.4/10

Scope: `developers/docs/accounts/index.md`, `smart-contracts/languages/index.md`, `smart-contracts/testing/index.md`, `src/intl/mr/page-apps.json`. 9 critical, 14 warnings. Brand 7/10 | Technical 7/10 | Semantic 8/10 | Consistency 6/10 | Tone 9/10. Fleet average 8.1 across 24 locales.

**Fleet-wide patterns (see known-patterns #79/#80):**

- Translated Geth/`clef` console output: mr affected on the full block; restored byte-exact from the English source. 17 of 24 locales hit.
- Whitehat parenthetical at `testing/index.md:245`: **regression introduced by this PR**; fixed.
- Bare-acronym over-expansion in `page-apps.json`: collapsed to the ETHGlossary short form; **DAO, DEX** left expanded, mr has no bare short form in the `ui`/`tag` context.
- Trailing newline stripped at EOF by this run's writer; restored. Cosmetic only, no gate was checking it.

**Fixed in this branch (mr-specific):**

- `पायथन-आधारित` -> `Python-आधारित` (4 sites) and `रस्ट-आधारित` -> `Rust-आधारित`; the same file already kept both Latin at line 139
- `असर्शन लायब्ररी` -> `दृढकथन लायब्ररी`; the file uses `दृढकथन` 7x
- whitehat parenthetical: the dropped appositive `म्हणून वर्णन केले जाते)` was restored rather than just appending a bare `)`

**Deliberately not fixed:**

- `Keccak-256` de-transliteration: the mr entry says `केकाक-256` while the cross-cutting rule lists Keccak as always-Latin. Upstream conflict, not a one-string revert

**Notes:**

- "Prerequisites" rotated into three different renderings across the three files this PR touched (31/21/14 locale-wide): needs a sweep, not a point edit.



## PR #19357 (intl/pending-dev, full sweep) -- 2026-09-30 -- Score 8.0/10

Scope: full sweep, ~191-198 files. Sampled for idiom: largest prose diffs; glossary triage over scripted candidates restricted to changed lines.

**Fixed in this branch:**

- `page-find-wallet-private-transactions-desc` restored from the pre-rename `page-find-wallet-privacy-desc` value (shipped in English fleet-wide, known-patterns #81).
- `zk-rollups:183,189`, `roadmap/privacy:116` `इथरियम` -> `इथेरियम`.
- privacy-online: at-rest `विश्रांतीच्या वेळी` -> `संग्रहित स्थितीत`; `फार कमी जण` -> `फार कमी VPN`; `स्थानानुसार ठेवू` -> `स्थान ओळखू`.

**Open (warnings):**

- Not fixed (unchanged lines): `server-components` `वेब3` (always_latin Web3), `डेंकुन` x10 vs `डेन्कन्`.
- useroperation `वापरकर्ता ऑपरेशन्स` vs `वापरकर्ता कार्य`; DAS half-translated; mainnet `मुख्यनेट`/`मेननेट` split.

## PR #19474 (intl/pending-dev, /organizations namespaces) -- 2026-10-14 -- Score 8.0/10

Scope: full PR diff, ~27 files (8 new page-organizations*.json, common.json, small MD href/EIP updates). Label/meta acronym trim applied fleet-wide (known-patterns #86).

**Fixed in this branch:**

- `चार्जॅक` -> `चार्जबॅक` x4; scalable rendered measurable `मोजण्यायोग्य` x3 -> `स्केलेबल`/`स्केल`; high-volume rendered high-noise `उच्च-आवाजाचे` -> `उच्च-प्रमाणातील`; deployment `उपयोजन` -> glossary `प्रस्थापना` x3.

**Open (warnings):**

- Three L2 forms; `उद्योग` (industry) for enterprise; परिसंस्था/इकोसिस्टम split.

## PR #19480 (intl/pending-dev, wagmi backtick retranslation) -- 2026-10-14 -- Score 8.6/10

- Warning: retranslation regressed neighbors -- `संकेतांनुसार` for "by convention" (L171), हूक/हुक split, L303 evaluate-to drift.

## PR #19486 (intl/pending-dev, networks quarantine release) -- 2026-10-15 -- Score 8.6/10

- Fixed: glossary `staker` -> `स्टेकर्स` (3x), `peer` -> `पीअर्स` (`सहकाऱ्यांमधील` = among coworkers); "deprecated" `नाकारलेले` (rejected) -> dev `कालबाह्य` (10 sites).
- Open: glossary `Ethereum Mainnet` uses `इथरियम` vs `Ethereum` entry `इथेरियम` (upstream).

## PR #19556 (intl/pending-dev, run 39679413921) -- 2026-10-21 -- Score 8.8/10

Scope: 25 files (smart-contracts/security + app-plasma retranslations, prediction-markets, scam-token-tricks, new `page-wallet-descriptions` / `component-catalog-item`, founders/stories JSON).

**Fixed in this branch:**

- `page-founders-tag-{accelerator,events,mentorship}` restored from dev (#81)

**Open (native call needed):**

- developers/docs/apis/backend/index.md:38: The glossary term "decentralized" (scriptRule: translate) was changed from the glossary form to a transliteration. This is a regression: dev had विकेंद्रित. (`डिसेंट्रलाइज्ड APIs` -> `विकेंद्रित APIs`)
- wrapped-eth/index.md:34: The glossary term "validator" (scriptRule: translate, confidence high) is `प्रमाणक`. The locale uses that form 1774 times and `व्हॅलिडेटर` 79 times. This wording was already there before the PR, which (`इथेरियम व्हॅलिडेटर्सद्वारे` -> `इथेरियम प्रमाणकांद्वारे`)
- 13 warnings in the PR review (see the PR #19556 review body).

**Summary:** The Marathi is fluent and closely follows the glossary, including the large new JSON sets (founders, wallet descriptions, stories map). There are no build- or navigation-breaking defects. The two criticals are glossary "translate" deviations that need a person to fix. The rest are small regressions from the retranslation and inconsistencies between files.

## PR #19568 (intl/pending-dev) -- 2026-10-22 -- Score 9.0/10
Scope: 6 repaired developer tutorials (hello-world, mint/view/write NFT series, sending-transactions, using-websockets), changed lines only. Scores are for the PR's initial state.

**Fixed in this branch:**

- Duplicated `json` response block in how-to-write-and-deploy-an-nft removed (known-patterns #93)
- `(weth)` changed to `(WETH)` (websockets:175; #95)

**Notes:**

- hello-world quarantined (JSON parse error). Warnings: Latin `MetaMask` link label, English alt text, `तोच खाते` should be `तेच खाते`.

## PR #19608 (intl/pending-dev, run 1023-1817) -- 2026-10-23 -- Score 9.2/10
Scope: hello-world-smart-contract (released from quarantine and fully reworked for Hardhat 3) and how-to-write-and-deploy-an-nft (small edit). Changed lines only.

**Fixed in this branch:**

- None (0 critical)

**Notes:**

- Glossary is followed in full. Code, fence tags, hrefs and IDs match English exactly.

**Open (warnings):**

- hello-world:219 "compromising your secrets" is rendered as `तडजोड` (compromise in the sense of a concession; same polyseme as #19115). Prefer `सिक्रेट्स धोक्यात आणत आहात`
- hello-world:344 "under the hood" is `तांत्रिकदृष्ट्या` here but `अंतर्गतपणे` at L346
- nft:66-75 the PR's `इनिशियलाईज`/`टाईप` disagrees with `टाइप` elsewhere in the file and with the hello-world spelling
