---
title: ETHGlossary Translation Policy
status: locked (v1)
last_updated: 2026-05-10
applies_to: All 13 non-Latin-script target languages
---

# ETHGlossary Translation Policy

This document is the canonical translation and transliteration policy for ETHGlossary. It defines how Ethereum-ecosystem terms are rendered across the 24 languages ETHGlossary covers, with particular focus on the 13 non-Latin-script languages where transliteration decisions are non-trivial.

The policy was synthesized from prior linguistic guidance used by the ethereum.org translation pipeline, validated and corrected by two parallel Gemini 3.1 Pro analyses, and resolved on disagreements with explicit audience context.

## 1. Background

ETHGlossary is the source of truth for Ethereum-ecosystem term translations. Downstream consumers -- the ethereum.org translation pipeline, other Ethereum educational projects, community translators -- query ETHGlossary instead of maintaining duplicate term banks.

Before this policy, downstream consumers maintained their own transliteration data, which led to drift, redundancy, and disagreement between sources on how brand names should render in non-Latin scripts. This document captures the locked policy that downstream consumers can rely on.

## 2. Audience context

Most ETHGlossary consumers serve mixed audiences. The reference audience for transliteration decisions is the **ethereum.org reader profile**, which spans:

- Newcomers learning what Ethereum is for the first time
- Developers building dapps, running nodes, or studying smart-contract patterns
- Validators and stakers setting up infrastructure
- Community members reading upgrade announcements
- Translators and contributors evaluating localized content

Most content is **conceptual and tutorial** -- explaining concepts, walking through how things work, motivating use cases. Reference-grade developer docs (deep API specs) are typically linked out to project-specific sites rather than hosted on educational sites. The reader is more often a curious learner or early-stage developer than a deep-domain expert.

For non-Latin-script languages: the audience skews toward general technical readers, not exclusively professional developers. Developer ratios may be higher in ja, ko, zh, zh-tw due to active local Ethereum dev communities, but the audience is mixed even there.

Translation goal: a reader of a non-English page reaches the **same conceptual understanding** as a reader of the English source. Accuracy and clarity matter more than literal phrasing; consistency matters because automated pipelines depend on determinism.

## 3. Languages in scope

### Non-Latin-script (transliteration policy applies)

`ar, bn, hi, ja, ko, mr, ru, ta, te, uk, ur, zh, zh-tw`

### Latin-script (out of scope for transliteration; brand names stay Latin)

`cs, de, es, fr, id, it, pl, pt-br, sw, tr, vi`

## 4. Term-role taxonomy

Each ETHGlossary entry carries a `category` reflecting its term role. The role informs the default `script_rule`. Eleven roles cover the term space:

| Role | Default `script_rule` | Examples |
|------|----------------------|----------|
| `concept` | `translate` | validator, gas, mainnet, smart contract, fork, slot |
| `brand-or-project` | `transliterate` (per group rules); `keep_latin` for dev tools | MetaMask, Aave, OpenSea, Uniswap |
| `person-name` | `transliterate` | Vitalik Buterin, Wei Dai, Gavin Wood |
| `programming-language` | `always_latin` | Python, JavaScript, Solidity, Vyper, Rust, Go |
| `os-platform` | `always_latin` | Linux, macOS, iOS, Windows, Android |
| `cryptographic-primitive` | `always_latin` | Keccak256, secp256k1, SHA-3, BLS |
| `network-name` | `transliterate` (per group rules) | Sepolia, Holesky, Goerli |
| `file-extension` | `always_latin` | `.sol`, `.json`, `.vy`, `.py` |
| `cli-command` | `always_latin` | `npm install`, `git clone`, `cargo build` |
| `ticker-or-standard` | `always_latin` | ETH, BTC, ERC-20, EIP-1559, ENS |
| `identifier` | `always_latin` | URLs, domain names, code identifiers, addresses |

The default `script_rule` is the starting point for an entry. Specific entries may override the default with explicit reasoning captured in the entry's `note` field.

## 5. `script_rule` enum

Per-term policy is encoded as a `script_rule` value:

| Value | Meaning | When to use |
|-------|---------|-------------|
| `translate` | Render in target-language semantics | Concept terms with established target-language equivalents |
| `calque` | Semantic translation for CJK semantic group; meaning rather than sound | "smart contract" -> 智能合约 (zh) |
| `transliterate` | Phonetic rendering in target script | "Ethereum" -> イーサリアム (ja) |
| `keep_latin` | Editorial choice to keep Latin for branding or clarity | Most developer-tool brand names |
| `always_latin` | Translating would break code, specification, or unambiguous identification | Solidity, ETH, ERC-20, file extensions |
| `transliterate_with_translation` | Latin form plus a native-script gloss | "MetaMask 钱包" (zh) |

`context_dependent` and `hybrid` are not valid values. Terms whose handling genuinely varies by context should be split into multiple glossary entries with distinct IDs (e.g., `gas_concept` vs `gas_limit_variable`).

## 6. Per-language-group rules

### 6.1 Indic group: hi, mr, bn, ta, te

| Surface | Rule |
|---------|------|
| Prose | Transliterate proper nouns into native script (Devanagari for hi/mr, Bengali for bn, Tamil for ta, Telugu for te) |
| UI tags | Keep Latin for major developer-tool brands and global acronyms; transliterate general tech terms |
| Code identifiers / URLs | Always Latin |
| Numerals (default) | Western Arabic (1, 2, 3) -- explicitly NOT native numeral systems |
| People's names | Transliterate phonetically |

**Per-language deviations within the group:**

- **bn (Bengali):** Numerals diverge from the group default. Use **native Bengali numerals (১, ২, ৩) in prose**, Western only in code blocks, inline code, UI elements, math, and technical identifiers. The pipeline uses markdown structure (code fences, inline backticks, JSX attributes) for boundary detection, identical to the established Urdu pattern.
- **ta (Tamil):** Calque is preferred over transliteration **for concept terms** (smart contract, blockchain, validator). For brands and proper nouns (Ethereum, Vitalik Buterin, Solidity), transliterate phonetically. The Tamil purist movement strongly prefers pure-Tamil neologisms over English loanwords for general concepts; transliteration is the fallback when no widely-recognized Tamil calque exists.

**Technical nuances per language:**

- **hi, mr (Devanagari):** Enforce the halant (्) for English loanwords ending in consonants. Hardhat -> हार्डहैट (with halant), not हार्डहैटा. Omitting the halant adds a trailing "a" sound that reads unprofessionally.
- **mr (Marathi):** Marathi shares Devanagari with Hindi but has unique letters (e.g., ळ). Do not default to Hindi phonetic approximations; Marathi-specific transliteration where the script differs.
- **bn (Bengali):** Map English "a" sounds correctly to Bengali vowel modifiers (Hash -> হ্যাশ), avoiding default a-to-o calques.
- **ta (Tamil):** Tamil lacks distinct characters for voiced consonants (b, d, g, j, z). Use Grantha consonants (ஜ, ஷ, ஸ, ஹ) where phonetically required, or rely on accepted IT-industry transliterations.
- **te (Telugu):** Telugu words usually end in vowel sounds. For English consonant-final loanwords, follow standard written transliteration (typically appending a halant equivalent), not colloquial vowel-appended forms.

### 6.2 Cyrillic group: ru, uk

| Surface | Rule |
|---------|------|
| Prose | Default `always_latin` for brand names; specific consumer-tier brands with established Cyrillic forms get explicit per-term `transliterate` overrides via the glossary |
| UI tags | Keep Latin for major brands, acronyms, dev tools |
| Code identifiers / URLs | Always Latin |
| Numerals | Western Arabic |
| People's names | Transliterate phonetically |

**Brand-handling policy:**

The pipeline default for any unrecognized brand is `always_latin`, which guarantees deterministic behavior. Specific consumer-tier brands with universally established Cyrillic forms -- e.g., Ethereum -> Эфириум -- are flagged as `transliterate` per their explicit ETHGlossary entry. This list requires native-speaker curation and is intentionally narrow.

Concept terms (smart contract, blockchain) follow standard `translate` or `transliterate` rules; only brands are subject to the default-Latin override.

**Technical nuances per language:**

- **ru, uk (general):** Russian and Ukrainian readers naturally decline Latin nouns (Ethereum'ом, MetaMask'ом). To avoid messy hyphen-suffixed Latin, prefer **appositional structure** ("в сети Ethereum" / "у мережі Ethereum") over inflected Latin where possible. The pipeline should not generate Cyrillic suffixes attached to Latin roots via apostrophe.
- **uk (Ukrainian):** Ukrainian phonetics differ from Russian; do not derive Ukrainian transliterations from Russian. Vitalik is Віталік (with і), not Виталик. Pick one Ukrainian transliteration standard and enforce it consistently.

### 6.3 RTL group: ar, ur

| Surface | Rule |
|---------|------|
| Prose | Transliterate or translate to native script |
| UI tags | Keep Latin for specific brands and code identifiers; ensure BiDi support |
| Code identifiers / URLs | Always Latin |
| Numerals | `ar`: Western (1, 2, 3) by default. `ur`: Native (Eastern Arabic-Indic ۱, ۲, ۳) for prose, Western for technical identifiers |
| People's names | Transliterate phonetically |

**Mathematical equations:** Always LTR with Western numerals. Wrap in backticks (triggers code styling) or `<span dir="ltr">` to prevent BiDi flip on neutral operators (=, -, *, /).

**BiDi handling:** Aggressively wrap mixed-direction phrases in `<span dir="ltr">` to prevent the renderer from flipping Latin brand names + adjacent punctuation. Particularly important after Latin brands followed by Western numerals or punctuation: "Ethereum 2.0!".

**Technical nuances per language:**

- **ar (Arabic):** Map English consonants missing in Arabic to standard substitutes: V -> ف or ڤ, P -> ب or پ. Be consistent across the glossary.
- **ar:** Arabic prepositions attach directly (بـ MetaMask). The renderer must handle this without flipping layout.
- **ur (Urdu):** Urdu uses Nastaliq script style (cursive, vertical) which renders Latin tech terms more disruptively than Arabic Naskh does. Minimize Latin in prose; transliterate aggressively. Watch for zero-width-non-joiner artifacts in mixed-script segments.

### 6.4 CJK phonetic: ja, ko

| Surface | Rule |
|---------|------|
| Prose | Transliterate into native script (Katakana for ja, Hangul for ko) |
| UI tags | **Latin allowed for technical brands** (MetaMask, GitHub, Hardhat, Linux). Native script for non-technical/concept terms |
| Code identifiers / URLs | Always Latin |
| Numerals | Western Arabic |
| People's names | Transliterate phonetically |

**UI tag policy:** Forcing Katakana/Hangul on every brand in UI elements reads as cluttered or juvenile to professional dev audiences and creates a disconnect when the actual software interface is English-only. Latin in UI tags for technical brands prevents that confusion. The exception list of "technical brands that stay Latin in UIs" is explicit per-term in the glossary.

**Technical nuances per language:**

- **ja (Japanese):** Use the chōonpu (ー) for English long vowels. "Ether" must be イーサ, not イサ. "Server" is サーバー.
- **ja:** Standardize compound transliteration: middle dot (・) between space-separated English compounds (スマート・コントラクト) or concatenated form (スマートコントラクト). Pick one; record the choice in the glossary.
- **ja:** Conceptual acronym handling: NFT often stays Latin; DeFi appears as both ディーファイ and Latin. Use per-term policy, not a blanket rule.
- **ko (Korean):** Spacing on transliterated compounds (스마트 컨트랙트 vs 스마트컨트랙트) requires a single project-wide convention. Document and enforce.
- **ko:** Acronym pronunciation varies. Some are read as words and transliterated (DeFi -> 디파이); others are read as letters and may stay Latin (NFT -> NFT or 엔에프티). Per-term policy required.

### 6.5 CJK semantic: zh, zh-tw

| Surface | Rule |
|---------|------|
| Prose | Translate by **meaning** (calque), not sound -- "smart contract" = 智能合约 (zh), 智慧合約 (zh-tw); "blockchain" = 区块链 (zh), 區塊鏈 (zh-tw) |
| UI tags | Same as prose |
| Code identifiers / URLs | Always Latin |
| Numerals | Western Arabic |
| People's names | Translate phonetically using Hanzi where established, otherwise transliterate |

**Default policy:** Strict semantic translation (`calque` or `translate`). For zh-tw specifically, this is the *default*; permissive embedded-Latin behavior is opted into per-term via `keep_latin` overrides in the glossary.

**Brand handling -- fallback:** When no established Chinese translation exists for a brand, **`keep_latin` is the default**. Do not auto-generate phonetic Hanzi transliterations (e.g., "Solidity" -> 索利迪蒂). Hanzi carry semantic weight, and bad phonetic mappings produce gibberish or accidental insulting meanings. Keep Latin until the local community officially dubs the term.

**Per-language deviations within the group:**

- **zh-tw (Traditional Chinese):** Maintain a separate vocabulary from zh-cn. The established tech lexicon often differs entirely (network: 网络 [zh] vs 網路 [zh-tw]; smart contract: 智能合约 [zh] vs 智慧合約 [zh-tw]). Do not derive zh-tw entries by Simplified-to-Traditional script conversion.
- **zh-tw:** Taiwanese tech writing tolerates more embedded Latin English than Mainland writing ("Smart Contract", "App", "API" remain in Latin in many Taiwanese tech blogs). To handle this idiomatically without compromising determinism, the pipeline default stays `calque`/`translate`, and the glossary exposes per-term `keep_latin` overrides for terms the local team has reviewed.
- **zh:** Pluralization. Chinese nouns don't pluralize. The pipeline must not append a Latin "s" to Chinese characters or leave "智能合约s" in output.
- **zh:** Acronyms used grammatically (e.g., "to mint an NFT" -> "mint一个NFT") -- the sanitizer should not strip Latin used as embedded grammatical units.

## 7. Cross-cutting policies

### 7.1 Standards and tickers -- `always_latin` globally

Across all 13 non-Latin-script languages, the following must remain Latin/numeric without exception:

- Ticker symbols: ETH, BTC, BLS
- Token standards: ERC-20, ERC-721, ERC-1155
- Improvement proposals: EIP-1559, EIP-4844
- RPC and protocol identifiers: JSON-RPC, devp2p
- Crypto primitives: Keccak256, SHA-256, secp256k1
- Network parameters: 32 ETH, 1 Gwei

Translating any of these breaks searchability, code fidelity, and developer UX.

### 7.2 Conceptual acronyms -- per-language, not global

`DAO`, `NFT`, `DeFi`, `API` are *conceptual* acronyms with localization patterns that vary:

- **ja:** NFT often Latin; DeFi as Latin or ディーファイ; DAO as DAO. Per-term entries.
- **ko:** DeFi -> 디파이 (transliterate); NFT often Latin or 엔에프티. Per-term.
- **zh:** DAO -> 去中心化自治组织 (calque) is common. Per-term entries.
- **ru, uk:** Plurals require native morphology (NFT-токены, DAO-организации). Per-term policy on suffixing.
- **Indic, RTL:** Default to Latin for conceptual acronyms; specific entries may transliterate.

There is no global rule for these -- each is encoded per-term in the glossary.

### 7.3 Inflection of Latin words

For languages that inflect nouns (Slavic, Indic), prefer **appositional structure** to avoid declining Latin brand names:

- Russian: "функции кошелька MetaMask" rather than "функции MetaMask'а"
- Ukrainian: "у мережі Ethereum" rather than "в Ethereum'і"
- Marathi: "Vitalik चा प्रस्ताव" is acceptable for established transliterated names; for Latin-kept terms, prefer apposition ("Vitalik यांचा प्रस्ताव")

### 7.4 Spacing in CJK

When Latin terms appear adjacent to native script in CJK languages, pad with a single ASCII space rather than concatenating directly or using zero-width spaces. This standardizes line-wrapping behavior across renderers.

- "使用 MetaMask" (zh) -- single ASCII space between Hanzi and Latin
- "使用MetaMask" -- avoid

### 7.5 Pipeline boundary detection

Several rules in this policy depend on the consuming pipeline distinguishing prose from code/UI/identifiers (notably Bengali numerals and Urdu numerals). The standard signals:

- Markdown code blocks (fenced or indented) -> code context
- Inline code (backtick-wrapped) -> code context
- JSX/HTML component attributes -> identifier context
- Frontmatter (YAML) values typed as identifiers (`image`, `lang`, `template`) -> identifier context
- Plain markdown paragraphs -> prose context
- URL paths (`href`, `src` values) -> identifier context

Consumers must implement this boundary detection deterministically. A consumer that cannot distinguish prose from code may safely default to the more conservative interpretation per surface (e.g., for Bengali, default to Western numerals if the boundary is unclear; tighter natural prose can be opted into when detection is confident).

## 8. Resolution log

The policy was developed in two rounds of LLM-assisted analysis with disagreement resolution.

### Round 1: ruleset validation

Two parallel Gemini 3.1 Pro instances reviewed the per-language ruleset (Sections 6.1-6.5 in their pre-resolution form) and the term-role taxonomy. Strong agreement on most points; five disagreements surfaced. Round-1 agreements added the following to the ruleset (locked):

- Programming languages and OS/platform names get their own term roles (`programming-language`, `os-platform`); both are `always_latin`
- Cryptographic primitives, file extensions, and CLI commands get their own term roles, all `always_latin`
- Network names (Sepolia, Holesky, Goerli) are distinct from brands and follow group transliteration rules
- `script_rule` enum revised: added `calque` and `transliterate_with_translation`; removed `context_dependent` and `hybrid`
- Conceptual acronyms (DAO, NFT, DeFi) handled per-language, not globally

### Round 2: disagreement resolution

The five disagreements were re-presented to both Gemini instances with explicit ethereum.org audience context. Final resolutions:

| # | Disagreement | Resolution | Reasoning |
|---|--------------|------------|-----------|
| 1 | Bengali numerals: Western everywhere vs native in prose | **Native (১, ২, ৩) in prose; Western in code/UI/math/identifiers.** | Mirrors the established Urdu pattern. Pipeline boundary detection (Section 7.5) is reliable enough to support this. Serves the natural-reading goal for educational content. |
| 2 | ja/ko UI tags: transliterate everything vs Latin for technical brands | **Latin for technical brands in UI tags; native script for prose.** | Forcing Katakana/Hangul in UIs reads as juvenile to dev audiences and creates a disconnect from English-only software interfaces. |
| 3 | ru/uk brands: all-Latin vs split consumer/dev | **Default `always_latin`; specific consumer-tier brands transliterate per glossary override.** | Default Latin guarantees pipeline determinism; explicit per-term overrides honor established local usage (Ethereum -> Эфириум) without inviting LLM drift on new brands. |
| 4 | Tamil prose: transliterate vs calque-preferred | **Hybrid by content axis: calque for concepts, transliterate for brands/proper nouns.** | Calque for general concepts respects Tamil purist tradition and aids newcomer comprehension; transliteration for brands prevents LLM-invented semantic interpretations of proper nouns. |
| 5 | zh-tw style: looser embedded-Latin vs strict semantic | **Strict semantic default; per-term `keep_latin` overrides for established Latin idioms.** | Strict default guarantees consistency across thousands of pages; explicit overrides via the glossary honor Taiwanese permissiveness without compromising determinism. Asymmetric reversibility favors strict default (loosening later is mechanical; tightening accreted Latin is painful). |

## 9. Open questions and follow-ups

Issues identified during the policy synthesis that are out of scope for this v1 lock but should be tracked:

### 9.1 UI text expansion

Translated UI strings can run 30-40% longer than English (notably ru, de). This is a layout/QA concern, not a policy concern, but consumers integrating ETHGlossary translations need a validation step to catch overflow. Out of ETHGlossary's scope; a downstream concern.

### 9.2 Native-speaker review queue

Several policy decisions in this v1 are confidence-medium pending native-speaker confirmation:

- **ru, uk:** Populating the consumer-tier whitelist (which specific brands transliterate vs. stay Latin)
- **ta:** Validating that the calques chosen for concept terms are in widespread use rather than purist neologisms
- **zh-tw:** Identifying which terms warrant `keep_latin` overrides

When native speakers become available, these are the first review tasks.

### 9.3 Conflict reconciliation on existing entries

ETHGlossary has 47 existing entries (the overlap between concept terms ETHGlossary already covers and proper nouns the broader policy now spans). Several of these have `script_rule` values that conflict with the per-group rules in Section 6 -- most notably brand names currently flagged `keep_latin` or `always_latin` that should transliterate in non-Latin scripts per the group rules.

These need a per-term audit and update. Specifically:
- Entries marked `keep_latin` or `always_latin` in the master glossary need their per-language entries added with the correct transliterated form, where the term role is `brand-or-project` or `person-name`.
- Conflicting entries should be updated to align with the policy in this document.

### 9.4 ETHGlossary scope clarification

This policy commits ETHGlossary to handling a wider scope than the original "concepts only" framing -- including brands, projects, people, OS/platform names, and dev tools. The scope expansion is justified by the principle "include any terms that could cause LLM translation inconsistencies" but should be documented in ETHGlossary's README so new contributors understand what belongs.

## 10. Implementation notes

Consumers integrating this policy should:

1. **Trust the glossary as the source of truth.** Do not maintain parallel transliteration data. If a term is missing or wrong, file an issue or PR against ETHGlossary rather than working around it locally.
2. **Use `script_rule` as the primary policy signal.** The default per term role is documented in Section 4, but the entry's `script_rule` is authoritative for that term.
3. **Implement boundary detection per Section 7.5.** Several rules depend on prose-vs-code distinction; consumers without reliable detection should default to the more conservative interpretation.
4. **Respect per-language overrides.** A term with `script_rule: keep_latin` in one language may have `transliterate` in another. Always query per-language.
5. **Cache responsibly.** Glossary contents change as new terms are added; a session-level cache is safe, but persistent caches should have a TTL or invalidation hook.

---

## Appendix A: Source and methodology

This policy was derived from:

- The pre-existing ethereum.org translation pipeline ruleset (`localization-rules-by-language-group.md`, `known-patterns.md` as of 2026-04)
- Two parallel Gemini 3.1 Pro analyses validating and correcting the ruleset
- Round-2 resolution prompts presenting five disagreements with explicit audience context
- Final policy synthesis reconciling round-2 outputs

The verbatim Gemini prompts and responses are preserved in the project history that produced this document and can be re-examined if any policy decision is challenged.

## Appendix B: Glossary of terms used in this document

- **Calque:** Translation by meaning rather than sound. "Smart contract" -> 智能合约 (literally "intelligent contract") is a calque.
- **Transliteration:** Phonetic rendering in a target script. "Ethereum" -> イーサリアム is transliteration.
- **Halant:** A diacritic in Indic scripts (्) that suppresses an inherent vowel. Critical for representing English consonant-final loanwords.
- **Chōonpu:** A Japanese character (ー) marking long vowels in Katakana.
- **Grantha:** A historical Indic script whose consonants (ஜ, ஷ, ஸ, ஹ) are sometimes used in Tamil to represent Sanskrit/foreign sounds Tamil's native consonants don't cover.
- **Nastaliq:** The cursive, vertical script style used for Urdu (distinct from the Naskh style used for Arabic).
- **BiDi:** Bidirectional text rendering -- the algorithm that interleaves LTR and RTL runs in the same line.
- **Apposition:** Grammatical construction placing a noun beside another to qualify it ("the city of Paris"). Useful in Slavic languages to avoid declining loanwords.
