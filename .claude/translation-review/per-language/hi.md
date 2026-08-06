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
