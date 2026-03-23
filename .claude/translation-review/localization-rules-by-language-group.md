# Web3 Localization Rules by Language Group

> **Source:** Gemini (2026-03-18), confirmed by project maintainer
> **Applies to:** All 13 non-Latin-script locales in the transliteration pipeline
> **Used by:** sanitizer (post_import_sanitize.ts), transliteration script (transliterate.ts), review agents

## Quick Reference Table

| Language Group | Codes | Prose | UI Tags/Brands | Code/Standards | URLs | Numerals |
|:---|:---|:---|:---|:---|:---|:---|
| **Indic** | `hi`, `mr`, `bn`, `ta`, `te` | Transliterate to native script | Keep Latin for brands/acronyms; transliterate general tech | Keep Latin | Keep Latin | Western Arabic (1, 2, 3) |
| **Cyrillic** | `ru`, `uk` | Transliterate to Cyrillic or keep Latin (both acceptable) | Keep Latin for brands, acronyms, dev tools | Keep Latin | Keep Latin | Western Arabic (1, 2, 3) |
| **RTL** | `ar`, `ur` | Transliterate/translate to native script | Keep Latin for brands/code, but ensure BiDi UI support | Keep Latin | Keep Latin | `ar`: Western (1,2,3). `ur`: Native (۱,۲,۳) for prose, Western for tech |
| **CJK Phonetic** | `ja`, `ko` | Transliterate (Katakana/Hangul) | **Transliterate to native** (e.g., Solidity -> ja: sorideithi, ko: solliditi). Exception: global acronyms (DeFi, NFT) may stay Latin | Keep Latin | Keep Latin | Western Arabic (1, 2, 3) |
| **CJK Semantic** | `zh`, `zh-tw` | Translate by **meaning** (calque), not sound | Use official Chinese translation if it exists; otherwise keep Latin | Keep Latin | Keep Latin | Western Arabic (1, 2, 3) |

## Detailed Rules

### 1. Indic Languages (hi, mr, bn, ta, te)

**Prose:** Transliterate into native script (Devanagari for hi/mr, Bengali for bn, Tamil for ta, Telugu for te). Use English in parentheses on first mention of complex terms.

**Tags:** Keep Latin for developer tools/brands (Solidity, MetaMask) and global acronyms (DeFi, NFT, ERC-20). Transliterate general tech terms (Wallet, Node, Token).

**Numerals:** Use Western Arabic (1, 2, 3). Do NOT use native numeral scripts (e.g., Tamil numerals look archaic on a Web3 site).

### 2. Cyrillic Languages (ru, uk)

**Prose:** Transliterate to Cyrillic (e.g., blokchejn for blockchain, smart-kontrakt for smart contract) or keep in Latin. Both are highly acceptable -- Russian and Ukrainian developers frequently read English terms in Latin script within Cyrillic text.

**Tags:** Keep Latin for brands, acronyms, and developer tools.

### 3. RTL Languages (ar, ur)

**Prose:** Transliterate or translate to native script (e.g., blwktshyn for blockchain in Arabic).

**Tags:** Keep Latin for specific brands/code. **WARNING:** Mixing LTR Latin tags into RTL UI elements can cause BiDi rendering bugs where punctuation or text order flips. The UI must have robust BiDi support.

**Numerals:**
- Arabic (`ar`): Default to Western Arabic (1, 2, 3)
- Urdu (`ur`): Strongly prefers native numerals (extended Arabic-Indic) for prose, Western for technical identifiers

### 4. CJK Phonetic (ja, ko)

**IMPORTANT:** Unlike other language groups, Japanese and Korean DO NOT need Latin script for UI scannability. They have dedicated, highly scannable scripts for foreign words (Katakana for ja, Hangul for ko).

**Prose AND Tags:** Transliterate into native script. "Solidity" becomes sorideithi (ja) or solliditi (ko). These work perfectly even in UI tags as visual anchors.

**Exception:** Global acronyms (DeFi, NFT, API) are often kept in Latin, though Japanese sometimes uses defai (DeFi).

### 5. CJK Semantic (zh, zh-tw)

**COMPLETELY DIFFERENT from other groups.** Chinese translates by MEANING (calque), not by sound. Sounding out English words with Chinese characters looks like gibberish.

**Prose AND Tags:** Use direct translations. "Smart Contract" = zhineng heyue (intelligent contract). "Blockchain" = qukuailian (block-area-chain). "Ethereum" = yitaifang (established official name).

**Brands:** Use officially established Chinese translation if one exists (Ethereum = yitaifang). If none exists, keep Latin (e.g., "Solidity" stays as-is).

## RTL Numerals and Mathematics (ar, ur)

### Prose vs Technical Numeral Rule

**Native numerals ONLY for prose** (when applicable -- primarily Urdu):
- "Ethereum has 2 main types" -> use native numeral for "2" in Urdu
- "In the year 2013" -> use native numeral in Urdu

**Western numerals ALWAYS for technical identifiers:**
- `ERC-20` -- NEVER `ERC-٢٠` or `ERC-۲۰`
- `EIP-1559` -- NEVER translate the numbers
- `Web3` -- NEVER `Web٣`
- `Layer 2` / `L2` -- NEVER `Layer ٢`

### Mathematical Equations in RTL

Mathematical equations are universally read Left-to-Right (LTR). In RTL document flow, neutral mathematical operators (`=`, `-`, `*`, `/`) cause the browser to flip the equation backward, rendering it mathematically incorrect.

**Two mandatory rules for equations in RTL:**
1. Keep ALL numbers in Western Arabic script (1, 2, 3) inside equations
2. Isolate the equation's directionality:
   - **Option A:** Wrap in backticks (triggers LTR code styling): `` `1150 - 187 = 963` ``
   - **Option B:** HTML LTR wrapper: `<span dir="ltr">0.963 = 0.001 * 963</span>`

**CRITICAL ERROR:** Bare equations in RTL text WILL visually flip: `963 = 187 - 1150` renders backward.

### Code Blocks, Hashes, Wallet Addresses

Any alphanumeric string a user might copy/paste must remain UNTOUCHED:
- Wallet addresses: `0x1a2b3c...` stays exactly as-is
- Terminal commands: `npm install web3@1.0.0` stays exactly as-is
- Inline code: Never translate variables or numbers inside backticks

## RTL Dates and Calendars (ar, ur)

### Calendar System: Gregorian ONLY (STRICT)

Web3 documentation relies on precise historical timelines (network upgrades, Genesis blocks).
NEVER convert Gregorian dates to Hijri (Islamic) calendar or any other local calendar.

"March 15, 2026" must use the Gregorian month name:
- Arabic: `15 مارس 2026`
- Urdu: `۲۳ مئی ۲۰۱۵`

### Numeral Scripts for Dates

- **Arabic (`ar`):** Western Arabic numerals (1, 2, 3) for all dates
  - Example: `23 مايو 2015`
- **Urdu (`ur`):** Extended Arabic numerals for prose dates
  - Example: `۲۳ مئی ۲۰۱۵`

### Numeric Date BiDi Protection (CRITICAL)

Purely numeric dates with slashes or hyphens (`2026-03-15`, `03/15/2026`) WILL visually
flip in RTL text due to the BiDi algorithm treating separators as neutral characters.

**All numeric dates in RTL text MUST be LTR-isolated:**

**Option A -- Backticks (for programmatic timestamps):**
```
`2026-03-15`
```

**Option B -- HTML LTR wrapper (for prose dates, PREFERRED):**
```
<span dir="ltr">03/15/2026</span>
```
For Urdu with native numerals:
```
<span dir="ltr">۰۳/۱۵/۲۰۲۶</span>
```

**CRITICAL ERROR:** Bare numeric dates with slashes/hyphens in RTL text WILL render
backward. This cannot be fixed by JavaScript at runtime -- it must be correct in the
markdown source.

### Written-Out Dates (Safe)

Dates written with month names do NOT need LTR wrapping because the month name
acts as a strong RTL character that anchors the directionality:
- `15 مارس 2026` -- renders correctly without wrapping
- `۲۳ مئی ۲۰۱۵` -- renders correctly without wrapping

## Impact on Sanitizer and Transliteration Scripts

### Sanitizer (post_import_sanitize.ts)

Current behavior and needed changes:

| Feature | Current | Needed |
|---------|---------|--------|
| `fixBrandTags` (revert brand tags to Latin) | Runs for all locales | **Change for ja/ko:** Should NOT revert -- tags should be transliterated |
| `fixProtectedBrandNames` warnings | Suppressed for TRANSLITERATION_LOCALES | Correct |
| `syncProtectedFrontmatterFields` (author) | Skips author for TRANSLITERATION_LOCALES | Correct |
| RTL equation protection | Not implemented | **NEW:** Detect bare equations in RTL files, warn or wrap |
| Technical numeral protection | Not implemented | **NEW:** Warn if ERC-٢٠ or EIP-۱۵۵۹ patterns found |
| zh/zh-tw brand handling | Treated same as other non-Latin | **Change:** zh/zh-tw should use official translations, not phonetic transliterations |
| RTL bare numeric date detection | Not implemented | **NEW:** Warn on `DD/MM/YYYY` or `YYYY-MM-DD` patterns in RTL files without LTR wrapping |
| Hijri calendar detection | Not implemented | **NEW:** Warn if Hijri month names detected (Muharram, Safar, etc.) |

### Transliteration Script (transliterate.ts)

| Feature | Current | Needed |
|---------|---------|--------|
| Tag handling | Skips ALL tags | **Change for ja/ko:** Should transliterate brand tags too |
| zh/zh-tw support | Uses transliteration bank | **Review:** Bank should contain meaning-based translations, not phonetic |
| Numeral handling | Not implemented | **NEW for ur:** Convert Western prose numerals to native Urdu numerals |
| Equation detection | Not implemented | **NEW:** Skip equations (preserve Western numerals + LTR) |
| Numeric date wrapping | Not implemented | **NEW for ar/ur:** Wrap bare numeric dates in `<span dir="ltr">` |
| Urdu numeral conversion in dates | Not implemented | **NEW for ur:** Convert date numerals to native script |
