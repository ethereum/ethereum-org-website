# Hindi (hi) -- Translation Review Findings

(Earlier findings from PR #17101 live in known-patterns.md.)

## PR #18772 (community-stories.json, 2026-07-10) -- 8.2/10
- CRIT fixed: double-negation inversion in story-0x3liza-eth: "a lack of trust" -> "अविश्वास की कमी" (lack of DIStrust = trust exists) -> corrected to "विश्वास की कमी". New pattern-4 variant: negating an already-negative noun.
- WARN (unfixed, fleet-consistency): smart contract as स्मार्ट कॉन्ट्रैक्ट here vs site convention स्मार्ट अनुबंध (common.json); Web2 transliterated वेब2 but Web3 kept Latin (asymmetric); "ship" rendered 2 ways in story-jatin-pandya.
- "client" correctly क्लाइंट -- PR #17101 fix held.
