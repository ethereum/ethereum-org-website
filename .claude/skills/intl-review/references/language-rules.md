# Language-Group Rules

Per-language transliteration and translation rules for the 13 non-Latin-script target languages. Condensed from the canonical version at **ETHGlossary's `docs/translation-policy.md`** (https://github.com/wackerow/ethglossary/blob/main/docs/translation-policy.md). This reference is the agent-facing digest for review work.

## Quick reference table

| Group | Languages | Prose | UI tags | Code/URLs | Numerals |
|---|---|---|---|---|---|
| **Indic** | hi, mr, bn, ta, te | Transliterate proper nouns; calque concepts for ta | Keep Latin for brands/acronyms; transliterate general tech | Latin | Western (1, 2, 3) except bn (native in prose only) |
| **Cyrillic** | ru, uk | Default Latin for brands; glossary overrides for consumer-tier (Ethereum → Эфириум); concepts translate/transliterate | Latin for brands/dev tools | Latin | Western |
| **RTL** | ar, ur | Transliterate or translate | Latin for code/brands; BiDi support needed | Latin | ar: Western. ur: native in prose, Western for tech |
| **CJK phonetic** | ja, ko | Transliterate (Katakana / Hangul) | **Latin allowed for technical brands** | Latin | Western |
| **CJK semantic** | zh, zh-tw | Translate by meaning (calque); zh-tw glossary may override with `keep_latin` | Same as prose | Latin | Western |

## Indic group (hi, mr, bn, ta, te)

- **Prose**: transliterate proper nouns into native script (Devanagari for hi/mr, Bengali for bn, Tamil for ta, Telugu for te).
- **UI tags**: keep Latin for major developer-tool brands and global acronyms (DeFi, NFT, ERC-20); transliterate general tech terms.
- **Code identifiers / URLs**: always Latin.
- **Numerals (default)**: Western Arabic (1, 2, 3). Native numeral systems (Devanagari ०१२, Tamil ௧௨௩, Telugu ౧౨౩) make tech docs feel archaic; avoid.
- **People's names**: transliterate phonetically.

**Per-language deviations**:

- **bn (Bengali)**: numerals diverge — native Bengali numerals (১, ২, ৩) in **prose**, Western only in code/UI/math/identifiers. Pipeline uses markdown structure to detect boundary (same mechanism as Urdu).
- **ta (Tamil)**: calque preferred over transliteration **for concept terms** (blockchain, smart contract, validator). Transliterate brands and proper nouns (Ethereum, Vitalik Buterin, Solidity). Tamil digital culture has a strong purist movement (Tanit Tamil Iyakkam).

**Technical nuances**:

- **hi, mr (Devanagari)**: enforce halant (्) for English consonant endings. Hardhat → हार्डहैट (with halant).
- **mr (Marathi)**: shares Devanagari with Hindi but has unique letters (e.g., ळ). Don't default to Hindi phonetic.
- **bn**: map English "a" sounds correctly to Bengali vowel modifiers (Hash → হ্যাশ).
- **ta**: Tamil lacks distinct characters for voiced consonants (b/p, d/t, g/k same letter). Use Grantha consonants (ஜ ஷ ஸ ஹ) where phonetically required.
- **te**: Telugu words usually end in vowels. Follow standard written transliteration, not colloquial vowel-appended forms.

## Cyrillic group (ru, uk)

- **Prose**: default `always_latin` for brand names; specific consumer-tier brands get explicit `transliterate` overrides via the glossary. Concepts translate or transliterate per `script_rule`.
- **UI tags**: keep Latin for major brands, acronyms, dev tools.
- **Code identifiers / URLs**: always Latin.
- **Numerals**: Western Arabic.
- **People's names**: transliterate phonetically.

**Brand handling policy**:

The pipeline default for any unrecognized brand is `always_latin` (deterministic). Specific consumer-tier brands with universally established Cyrillic forms — e.g., Ethereum → Эфириум — are flagged as `transliterate` per their explicit ETHGlossary entry. List requires native-speaker curation; intentionally narrow.

**Technical nuances**:

- Russian/Ukrainian readers naturally decline Latin nouns (Ethereum'ом, MetaMask'ом). Pipeline prefers **appositional structure** ("в сети Ethereum" / "у мережі Ethereum") over hyphen-suffixed Latin. Don't generate Cyrillic suffixes attached to Latin roots via apostrophe.
- **uk (Ukrainian)**: Ukrainian phonetics differ from Russian; don't derive Ukrainian transliterations from Russian. Vitalik is Віталік (with і), not Виталик. Pick one Ukrainian transliteration standard and enforce.

## RTL group (ar, ur)

- **Prose**: transliterate or translate to native script.
- **UI tags**: keep Latin for specific brands and code identifiers; ensure BiDi support.
- **Code identifiers / URLs**: always Latin.
- **Numerals**:
  - **ar**: Western Arabic (1, 2, 3) by default. Mashriq vs Maghreb regional variation exists; Western is the pipeline default for global tech UIs.
  - **ur**: native Eastern Arabic-Indic (۱, ۲, ۳) for prose, Western for technical identifiers.
- **People's names**: transliterate phonetically.

**Mathematical equations**: always LTR with Western numerals. Wrap in backticks (triggers code styling) or `<span dir="ltr">` to prevent BiDi flip on neutral operators (=, -, *, /).

**BiDi handling**: aggressively wrap mixed-direction phrases in `<span dir="ltr">`. Particularly important: Latin brand followed by Western numeral or punctuation ("Ethereum 2.0!").

**Technical nuances**:

- **ar**: map English consonants missing in Arabic to standard substitutes — V → ف or ڤ, P → ب or پ. Consistent across glossary.
- **ar**: Arabic prepositions attach directly (بـ MetaMask). Renderer must handle without flipping layout.
- **ur**: Urdu uses Nastaliq script style (cursive, vertical) — renders Latin tech terms more disruptively than Arabic Naskh. Minimize Latin in prose; transliterate aggressively. Watch for ZWNJ artifacts in mixed-script segments.

## CJK phonetic (ja, ko)

- **Prose**: transliterate into native script (Katakana for ja, Hangul for ko).
- **UI tags**: **Latin allowed for technical brands** (MetaMask, GitHub, Hardhat, Linux). Native script for non-technical/concept terms.
- **Code identifiers / URLs**: always Latin.
- **Numerals**: Western Arabic.
- **People's names**: transliterate phonetically.

**UI tag policy**: forcing Katakana/Hangul on every brand in UI elements reads cluttered or juvenile to dev audiences and disconnects docs from English-only software interfaces. Latin in UI tags for technical brands prevents that confusion. Exception list of "technical brands that stay Latin in UIs" is explicit per-term in the glossary.

**Technical nuances**:

- **ja (Japanese)**: use chōonpu (ー) for English long vowels — "Ether" must be イーサ, not イサ; "Server" is サーバー. Compound transliteration policy: middle dot (・) between space-separated English compounds (スマート・コントラクト) or concatenated form (スマートコントラクト) — pick one per glossary entry.
- **ja**: conceptual acronym handling: NFT often stays Latin; DeFi appears as both ディーファイ and Latin. Per-term policy via glossary.
- **ko (Korean)**: spacing on transliterated compounds (스마트 컨트랙트 vs 스마트컨트랙트) requires a single project-wide convention. Document and enforce.
- **ko**: acronym pronunciation varies. DeFi → 디파이 (transliterate); NFT often Latin or 엔에프티. Per-term.

## CJK semantic (zh, zh-tw)

- **Prose**: translate by **meaning** (calque), not sound. "Smart contract" = 智能合约 (zh) / 智慧合約 (zh-tw); "blockchain" = 区块链 (zh) / 區塊鏈 (zh-tw).
- **UI tags**: same as prose.
- **Code identifiers / URLs**: always Latin.
- **Numerals**: Western Arabic.
- **People's names**: translate phonetically using Hanzi where established, otherwise transliterate.

**Default policy**: strict semantic translation (`calque` or `translate`). For zh-tw specifically, this is the *default*; permissive embedded-Latin behavior opts in per-term via `keep_latin` overrides in the glossary.

**Brand handling — fallback**: when no established Chinese translation exists for a brand, **`keep_latin` is the default**. Do NOT auto-generate phonetic Hanzi (e.g., "Solidity" → 索利迪蒂). Hanzi carry semantic weight; bad phonetic mappings produce gibberish or accidental insulting meanings.

**Per-language deviations**:

- **zh-tw**: maintain separate vocabulary from zh-cn. The established tech lexicon often differs entirely (network: 网络 [zh] vs 網路 [zh-tw]). Don't derive zh-tw entries by Simplified-to-Traditional script conversion.
- **zh-tw**: Taiwanese tech writing tolerates more embedded Latin English than Mainland. Pipeline defaults stay `calque`/`translate`; glossary exposes per-term `keep_latin` overrides for terms the local team reviewed.
- **zh**: pluralization — Chinese nouns don't pluralize. Pipeline must not append Latin "s" to Chinese characters or leave "智能合约s".

## Cross-cutting

### Standards and tickers — `always_latin` globally

Across all 13 non-Latin languages: ETH, BTC, BLS, ERC-20, ERC-721, EIP-1559, EIP-4844, JSON-RPC, devp2p, Keccak256, SHA-256, secp256k1, 32 ETH, 1 Gwei.

### Conceptual acronyms — per-language

DAO, NFT, DeFi, API are conceptual acronyms with varying localization patterns:

- ja: NFT often Latin; DeFi as Latin or ディーファイ; DAO as DAO
- ko: DeFi → 디파이; NFT often Latin or 엔에프티
- zh: DAO → 去中心化自治组织 (calque) common
- ru, uk: plurals require native morphology (NFT-токены, DAO-организации)
- Indic, RTL: default Latin; specific entries may transliterate

No global rule. Per-term in glossary.

### CJK spacing

When Latin terms appear adjacent to native script in CJK, pad with a single ASCII space (not concatenation, not zero-width). "使用 MetaMask" (zh) — single ASCII space.

## See also

- ETHGlossary `docs/translation-policy.md` for the canonical version (this is the source of truth)
- `references/known-patterns.md` for issue patterns specific to review-time
- `references/scoring-rubric.md` for how rule violations map to quality scores
