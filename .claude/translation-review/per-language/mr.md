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
