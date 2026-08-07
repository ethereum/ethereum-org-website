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
