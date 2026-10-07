# Hindi (hi) -- Translation Review Findings

(Earlier findings from PR #17101 live in known-patterns.md.)

## PR #18772 (community-stories.json, 2026-07-10) -- 8.2/10
- CRIT fixed: double-negation inversion in story-0x3liza-eth: "a lack of trust" -> "अविश्वास की कमी" (lack of DIStrust = trust exists) -> corrected to "विश्वास की कमी". New pattern-4 variant: negating an already-negative noun.
- WARN (unfixed, fleet-consistency): smart contract as स्मार्ट कॉन्ट्रैक्ट here vs site convention स्मार्ट अनुबंध (common.json); Web2 transliterated वेब2 but Web3 kept Latin (asymmetric); "ship" rendered 2 ways in story-jatin-pandya.
- "client" correctly क्लाइंट -- PR #17101 fix held.

## PR #18925 (privacy roadmap + 2 video transcripts) -- 2026-07-27 -- 9.1/10

**Fixed (critical):** `शून्य-ज्ञान प्रूफ़` -> `शून्य-ज्ञान प्रमाण` (6 sites in `roadmap/privacy`) — the head noun was transliterated rather than taken from the compound glossary entry. Bare/adjectival uses at L88/L90 (`शून्य-ज्ञान वर्चुअल`, `शून्य-ज्ञान होता`, `शून्य-ज्ञान के`), L104 passport, L122 voting left unchanged. `गुमनामी सेट` -> `अनामिकता समूह`.

**Not fixed (warning):** 3 Latin speaker labels; `attester` rendered three ways across the PR (प्रमाणकर्ता / अनुप्रमाणक / अटेस्टिंग नोड).

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 9.2/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values`.

**Fixed in this branch:**

- #43 blank line before `{#validators-keys}` restored
- #44 `Arbitrum One` de-hybridised in `app-session-description`

**Open (native call needed):**

- #48 "exposure" -> `जोखिम` (risk) loses the transparency/exposed-ness antithesis.
- "onion" handled two ways in one file: `onion (Tor)` Latin in `app-3xpl-description` vs `अनियन रूटिंग` in `app-session-description`, and `अनियन` is an off transliteration (standard is `ऑनियन`).
- `app-semaphore-description` "provable" -> `प्रमाणित` (certified, implies external certification) rather than `प्रमाणनीय`.

**Notes:**

- Both headline polysemy traps resolved correctly: "salt" -> `सॉल्ट` (not `नमक`), "mint" -> `मिंट करना` in the creature sense (not coinage, not the herb). Zero glossary deviations.
- `ciphernodes` -> `साइफरनोड्स` was judged acceptable: English lowercases it and it matches hi's existing `साइफरपंक`.

## PR #19015 (intl/pending-dev) -- 2026-08-10 -- Score 8.9/10 (pre-fix)

- Scope: 11-12 files (8-9 markdown + common / learn-quizzes / page-what-is-ethereum JSON). Fleet avg 8.4.
- `actor` -> `पक्ष` (was अभिनेता, film performer) -- hi `learn-quizzes.json` already rendered the same English phrase correctly, which is what confirmed it. Open: `non-trusted setup` twice rendered with the *untrustworthy* reading, which ETHGlossary's `trustless` note explicitly warns against -- native call.
- Fleet-wide items fixed in this branch for every locale: the `<p></p>` MDX build-breaker (8 locales), the `.pdf` autolink corruption (#50), the deleted `{#will-my-smart-contracts-change}` FAQ section (#32), the missing `<QuizWidget>` component (#49), and the two stale glamsterdam prose clauses (#51 -- `Q4 2026` and the stakers/liquidity sentence).

## PR #19076 (intl/find-wallet-translations) -- 2026-08-14 -- Score 9.5/10

Scope: `page-wallets-find-wallet.json` only -- 47 added keys (persona hero copy + a new `page-find-wallet-fee-*` disclosure cluster), 1 changed (`persona-legend` filter -> browse), 5 removed. Fleet avg 9.35.

**Fixed in this branch:** none -- no critical issues.

**Open (native call needed):**

- `fee-qualifier-free-under-fox-discounts` -> `के तहत` is the abstract "under/pursuant to" sense, not a numeric threshold; prefer `{usd} से कम पर मुफ़्त`. All four sibling Indic locales used a spatial word.
- `fee-qualifier-of-rewards` -> `इनाम` (prize) vs the tree-dominant `पुरस्कार` for staking rewards (#56).
- `nfts-hero-description` -> `आपके ... वस्तुओं` needs feminine `आपकी`; `पता लगाना` is weak for "explore".

**Notes:**

- All 12 matched glossary terms exact; fee cluster composes correctly under SOV with formal आप throughout.

## PR #19115 -- staking redesign (6 MD + 1 JSON), 2026-08-19

**Score: 7.0/10** (fleet avg 7.8 -- lowest recorded in this series; the gap is structural, not linguistic)

Worst structural damage in the fleet and hi-only: 18 markdown links and JSX spans wrapped in backticks in staking/saas, killing every link on the page (0 on dev). Also a run-a-node table header reverted to English (only locale affected). Negation inversion at solo:220; must->should modal in a JSON risk disclosure; saas swung wholesale from glossary `पुरस्कार` to `इनाम` and from `कंपाउंडिंग` to the semantically wrong `संयोजित`. `अभिनेता` recurrence.

Fleet-wide defects also present in this locale (see known-patterns #60-64): heading-anchor rotation in `run-a-node`, reverted `<Card title>` attributes, untranslated image alt text, and the `</ExpandableCard>` -> `</ButtonLink>` MDX breaker. All repaired in this PR.

## PR #19034 (intl/pending-dev) -- 2026-08-20 -- Score 8.4/10
Scope: new `page-open-source.json` (228 keys) + retranslated `community/research/index.md`, plus 3 single-key JSON changes. Fleet avg 8.67, median 8.80.
**Fixed in this branch:**
- AI prompt-card fill-in blanks (`[app]`, `[my device]`, `[my system]`, `[this]`, `[this error]`, `[App]`) translated -- they were shipped as verbatim English.
- `Robust Incentives Group` restored to English at 5 sites -- the name had been semantically translated with no English retained, making the EF team unsearchable.

- `auditable` -> `श्रव्य` (**audible**). Exactly 1 occurrence tree-wide (this one) vs 6 for the correct `ऑडिट करने योग्य`.
- Two inversions of relational "against": `के खिलाफ` (opposing) for "designing against standards" and "report progress against it".
- `accounting rigorously for` -> `लेखांकन` (financial bookkeeping).
- `priced` -> `मूल्यवान बनाया` ("made valuable") -- flipped a listed harm into a benefit.

**Open (native call needed):**

- `attestations` -> `सत्यापन`, colliding with `सत्यापक` (validator) in the same sentence; tree form is `अनुप्रमाणन` (279).
- `peer review` rendered two ways within one PR.

## PR #19142 (intl/pending-devcon-banner) -- 2026-08-21 -- Score 9.8/10
Scope: new `component-devcon-banner.json` (6 keys). Fleet avg 9.9.

**Fixed in this branch:**

- `Devcon` -> `डेवकॉन` in `title` and `subtitle`, matching devcon.org's own Hindi site. `logo-alt` stays Latin (title lockup / alt text).

**Note:** devcon.org ships `डेवकॉन` (retroflex ड, the standard IT-loanword form -- cf. `डेवलपर`) while `blog.ethereum.org/hi` ships `देवकॉन` (dental द). devcon.org wins: it is the event's own India-facing site and more recent, and the blog is pipeline output rather than independent authority. Record `डेवकॉन` in the glossary entry so the two stop disagreeing.


## PR #19326 (intl/pending-dev) -- 2026-09-28 -- Score 7.8/10

Scope: `developers/docs/accounts/index.md`, `smart-contracts/languages/index.md`, `smart-contracts/testing/index.md`, `src/intl/hi/page-apps.json`. 7 critical, 8 warnings. Brand 8/10 | Technical 9/10 | Semantic 7/10 | Consistency 5/10 | Tone 10/10. Fleet average 8.1 across 24 locales.

**Fleet-wide patterns (see known-patterns #79/#80):**

- Translated Geth/`clef` console output: hi not affected, the clef transcript was already English. 17 of 24 locales hit.
- Whitehat parenthetical at `testing/index.md:245`: not affected.
- Bare-acronym over-expansion in `page-apps.json`: collapsed to the ETHGlossary short form; **DAO, DEX** left expanded, hi has no bare short form in the `ui`/`tag` context.
- Trailing newline stripped at EOF by this run's writer; restored. Cosmetic only, no gate was checking it.

**Fixed in this branch (hi-specific):**

- `कॉन्ट्रैक्ट` -> glossary `अनुबंध` across `languages/index.md`, 25 sites: the PR flipped this file wholesale while its sibling `testing/index.md` kept the entry form. Plural-oblique phrases were restored first so the blanket pass did not bake in singulars
- "unsound" `अस्वस्थ` (= *unwell*) -> `अविश्वसनीय`
- "property" `संपत्ति` (= *wealth/asset*) -> `गुण`, 33 of 34 sites, with gender agreement corrected (`गुण` masc. vs `संपत्ति` fem.); `वित्तीय संपत्तियों` left alone, English there is "financial assets"
- `page-apps-ready-button` shipped untranslated English `"Go"` -> `जाएं`; hi was the only locale of 25 doing so
- `लेनदेन` -> `लेन-देन`; `इनाम` -> `पुरस्कार`

**Notes:**

- Acronym expansion hit 18 `page-apps` keys including short category-chip `-name` labels, where the Indic UI-tag rule mandates Latin. `DAO` and `DEX` have no hi short form so 6 keys stay expanded.



## PR #19357 (intl/pending-dev, full sweep) -- 2026-09-30 -- Score 8.0/10

Scope: full sweep, ~191-198 files. Sampled for idiom: largest prose diffs; glossary triage over scripted candidates restricted to changed lines.

**Fixed in this branch:**

- `page-find-wallet-private-transactions-desc` restored from the pre-rename `page-find-wallet-privacy-desc` value (shipped in English fleet-wide, known-patterns #81).
- privacy-online `vpn-criteria-lead` `बहुत कम लोग` -> `बहुत कम VPN`.
- privacy-online `vpn-table-2-does` -> `साइटें आपका स्थान पता न लगा सकें`.
- `social-networks:72` `लेनदेन` -> `लेन-देन`; page-learn `रिवॉर्ड कमाएं` -> `पुरस्कार कमाएं`.

**Open (warnings):**

- EIP/API/DeFi/NFT over-expansion (#80), incl. duplicated `(EIP) (EIP-8081)` in hegota:42.
- `खाता` oblique-case errors in open-access (4 keys); Geth back to Latin in bug-bounty.
