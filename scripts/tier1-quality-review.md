# Tier 1 Glossary Translation Quality Review

**Date:** 2026-03-26
**Reviewed by:** Shortcut Shorty (Claude Opus 4.6), with Gemini cross-validation
**Scope:** 24 language files, 93 terms each (2,232 total entries)

---

## 1. Translation Accuracy Spot-Check (5 terms x 4 languages)

Terms checked: **stake, gas, bridge, non-fungible token (NFT), zero-knowledge proof**
Languages checked: **Japanese (ja), Arabic (ar), French (fr), Polish (pl)**

### Japanese (ja) -- PASS

| Term | Translation | Verdict |
|------|------------|---------|
| stake | ステーク (suteku) | Correct. Standard transliteration in JP crypto community |
| gas | ガス (gasu) | Correct |
| bridge | ブリッジ (burijji) | Correct |
| NFT | 非代替性トークン | Correct. Proper kanji translation with NFT/エヌ・エフ・ティー aliases |
| zero-knowledge proof | ゼロ知識証明 | Correct. Standard academic term |

**Assessment:** All translations accurate and natural. Transliterations preferred over literal translations, which is standard for Japanese crypto terminology.

### Arabic (ar) -- PASS with notes

| Term | Translation | Verdict |
|------|------------|---------|
| stake | حصة (Hissa) | Acceptable. "Share/portion" is reasonable |
| gas | غاز (Ghaz) | Correct |
| bridge | جسر (Jisr) | Correct |
| NFT | رمز غير قابل للاستبدال | Correct. Full descriptive Arabic |
| zero-knowledge proof | إثبات المعرفة الصفرية | Correct. Standard academic translation |

**Note:** Gemini flagged that the alias رهان (rihan/betting) for "stake" could carry negative gambling connotations in some Arabic-speaking regions. The primary term حصة (share) avoids this.

### French (fr) -- PASS

| Term | Translation | Verdict |
|------|------------|---------|
| stake | mise en jeu | Correct. Standard French Ethereum term |
| gas | gas | Correct. English term is standard in French crypto |
| bridge | pont | Correct |
| NFT | jeton non fongible | Correct |
| zero-knowledge proof | preuve a connaissance nulle | Correct. Standard academic French |

**Assessment:** Excellent. English aliases included where the community uses them (gas, bridge, stake).

### Polish (pl) -- PASS with notes

| Term | Translation | Verdict |
|------|------------|---------|
| stake | stawka | Acceptable but debatable. Can imply "bet/rate" |
| gas | gaz | Correct |
| bridge | most | Correct. Alias "mostek" (diminutive) is slightly odd for technical context |
| NFT | niewymienny token | Correct |
| zero-knowledge proof | dowod z wiedza zerowa | Correct |

**Note:** Gemini flagged that "stawka" can imply a bet, and suggested "depozyt" (already listed as alias) might be more precise for the PoS mechanism. The alias "mostek" for bridge is a diminutive form that sounds unnatural in technical contexts.

---

## 2. Consistency Check: Arabic Stake-Family

| English Term | Arabic Term | Root | Agent Form |
|-------------|-------------|------|------------|
| stake | حصة (Hissa) | ح-ص-ص (share) | مودع (depositor) |
| staking | رهن الحصص (Rahn al-hissas) | ر-ه-ن (pledge) | مودع (depositor) |
| staker | مودع (Mudi') | و-د-ع (deposit) | مودع (depositor) |

### MODERATE ISSUE: Three different Arabic roots used across stake family

- **stake** uses root ح-ص-ص (share/portion)
- **staking** uses root ر-ه-ن (pledge/lock)
- **staker** uses root و-د-ع (deposit)

Gemini confirmed this is problematic: Arabic morphology works best when related terms derive from the same root. A consistent set would use either:
- The ر-ه-ن root throughout: حصة (noun), رهن (action), مراهن (agent)
- Or the ح-ص-ص root throughout: حصة (noun), تحصيص (action), محصص (agent)

The current hybrid is functional but breaks the morphological link that Arabic speakers expect between related terms. The staker's agent form مودع (depositor) especially fails to convey the consensus-participation aspect.

---

## 3. Obvious Errors and Concerns

### 3a. English Retention Rates

Terms still in English (excluding legitimately English terms like API, ETH, IPFS, JSON-RPC, Solidity, Hardhat, web3, ERC-20, ZK, Ethereum):

| Language | English Terms | Pct | Assessment |
|----------|:------------:|:---:|------------|
| de | 44 | 47% | Expected -- German crypto uses English heavily (confirmed by Gemini) |
| it | 35 | 38% | Expected -- 27 of 35 have native aliases; 8 are legitimately English (hash, staking, gas, rollup, slot, plasma, beacon chain, nonce) |
| id | 31 | 33% | Expected -- Indonesian tech discourse uses many English loanwords |
| cs | 24 | 26% | Expected -- Czech crypto community uses English terms extensively |
| fr | 24 | 26% | Expected -- French crypto retains many English terms |
| pl | 23 | 25% | Expected -- Polish crypto community retains English terms |
| pt-br | 23 | 25% | Expected |
| es | 17 | 18% | Expected |
| vi | 17 | 18% | Expected |
| sw | 16 | 17% | Expected for an emerging crypto market |
| tr | 13 | 14% | Expected |
| zh-tw | 7 | 8% | Expected -- CJK languages tend to translate/transliterate more |
| zh | 5 | 5% | Expected |
| ru, ko | 1-2 | 1-2% | Expected |
| ar, bn, hi, ja, mr, ta, te, uk, ur | 0 | 0% | Expected -- these languages tend to transliterate or translate fully |

**Verdict:** The English retention pattern is linguistically appropriate. European and Southeast Asian languages naturally borrow English tech terms more than CJK, Indic, or Arabic-script languages. This is NOT an error.

### 3b. Arabic "slot" Translation

**MODERATE ISSUE:** Arabic translates "slot" as فتحة (fut-hah, "opening/aperture"), which is too physical/literal for the temporal meaning (12-second time period in beacon chain). Gemini confirmed that خانة زمنية (time slot), which is already listed as an alias, should be the primary term instead. Confidence is correctly marked as "medium."

### 3c. No Missing Translations Found

- Zero entries have empty/null `term` fields
- Zero entries have `confidence: "low"`
- 25 entries across 10 languages have `confidence: "medium"` (appropriate self-assessment)

### 3d. Korean "require" Kept in English

Correctly kept in English -- "require" is a Solidity keyword that should remain as-is in code-facing contexts. The entry properly provides Korean aliases (요구, 조건 확인) for non-code contexts.

---

## 4. Schema Conformance

Checked: **Bengali (bn), Turkish (tr), Swahili (sw)**

### Top-Level Fields (all 10 required)

| Field | bn | tr | sw |
|-------|:--:|:--:|:--:|
| term | 93/93 | 93/93 | 93/93 |
| aliases | 93/93 | 93/93 | 93/93 |
| transliteration | 93/93 | 93/93 | 93/93 |
| morphology | 93/93 | 93/93 | 93/93 |
| contexts | 93/93 | 93/93 | 93/93 |
| grammar | 93/93 | 93/93 | 93/93 |
| plurals | 93/93 | 93/93 | 93/93 |
| source | 93/93 | 93/93 | 93/93 |
| confidence | 93/93 | 93/93 | 93/93 |
| notes | 93/93 | 93/93 | 93/93 |

### Nested Subfields

All required subfields present in all 3 languages:
- **morphology:** noun, verb, adjective, agent, negation, compounds
- **contexts:** prose, heading, tag, ui, code
- **grammar:** gender, animacy, part_of_speech, formality

### Cross-File Consistency

All 24 files have exactly 93 entries with identical key sets. No missing or extra terms.

---

## 5. Summary of Findings

### Critical Issues
None found.

### Moderate Issues (3)

1. **Arabic stake-family inconsistency** -- Three different roots used across stake/staking/staker. Should be harmonized to a single root family.
2. **Arabic "slot" primary term** -- فتحة (aperture) should be replaced by خانة زمنية (time slot) as the primary term.
3. **Polish "mostek" alias for bridge** -- Diminutive form is unnatural in technical context. Consider removing.

### Minor Issues (2)

1. **Arabic "stake" alias رهان** -- Gambling connotation risk in some regions. Not wrong, but potentially culturally sensitive.
2. **Polish "stawka" for stake** -- Can imply betting; the alias "depozyt" might be more precise. Not wrong per se, but worth flagging for community review.

### Positive Findings

- Schema conformance is 100% across all checked languages (no missing fields at any level)
- All 24 files have identical key sets with exactly 93 entries each
- Confidence ratings are well-calibrated (no false "high" on questionable entries)
- English retention follows expected linguistic patterns (high for European languages, low for CJK/Indic/Arabic)
- Japanese, French, and core Arabic translations are accurate and natural
- Swahili translations (an under-resourced language for crypto) are surprisingly good
- Context-dependent forms (prose, heading, tag, ui, code) are properly differentiated
- Notes field provides useful guidance for translators

### Overall Assessment

The Tier 1 glossary translations are of good quality for LLM-generated output. The moderate issues are real but not blocking -- they represent the kind of nuanced linguistic decisions that benefit from native speaker review. The Arabic stake-family inconsistency is the most actionable finding and should be addressed before these glossaries are used in production translation workflows.

**Confidence in this review:** Moderate-to-high. I have reasonable confidence in the Japanese, French, and structural findings. The Arabic and Polish assessments are corroborated by Gemini but would benefit from native speaker validation.
