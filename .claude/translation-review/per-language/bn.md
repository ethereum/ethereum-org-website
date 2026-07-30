# Bengali (bn) -- Translation Review Findings

## PR #18772 (community-stories.json, 2026-07-10) -- 9.4/10
- CRIT fixed: "Web2" left Latin in story-sebastian -> ওয়েব২ per ETHGlossary (web2 => ওয়েব২). Watch web2/web3 script split: glossary transliterates web2 but keeps Web3 Latin.
- WARN: "transfer" rendered both ট্রান্সফার and হস্তান্তর within story-nico-bolivia (glossary: হস্তান্তর; ট্রান্সফার common in speech).

## PR #18925 (privacy roadmap + 2 video transcripts) -- 2026-07-27 -- 9.2/10

**Fixed (critical):** `zero-knowledge proof` used the bare entry + transliterated head noun (`জিরো-নলেজ প্রুফ`) at 6 sites in `roadmap/privacy`; corrected to the compound entry `শূন্য-জ্ঞান প্রমাণ`. Adjectival/zkVM uses (`জিরো-নলেজ ভার্চুয়াল`, `জিরো-নলেজ হয়`, passport, voting) correctly left on the bare entry. `anonymity set` -> `বেনামী সেট`.

**Not fixed (warning):** 11 of 85 speaker labels in `eip-7805-focil-explained` left in Latin, and "Thomas Thiery" transliterated two ways. See known-patterns #31 — convention question, fix upstream.
