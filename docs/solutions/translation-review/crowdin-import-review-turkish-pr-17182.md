---
title: "Crowdin Import Review: Turkish (tr) - PR #17182"
category: translation-review
language: tr
pr: 17182
severity: critical
date: 2026-02-17
tags: [crowdin, i18n, turkish, mdx, translation-quality]
quality_score: 7.7
files_reviewed: 301
files_fixed: 49
---

# Crowdin Import Translation Review: Turkish (tr) - PR #17182

## Problem Summary

Automated Crowdin translation import for Turkish introduced 34 critical translation errors and 56 warnings across 301 files. Issues ranged from brand name mistranslation ("Solidity" rendered as "katillik"), semantic inversions (proof-of-work/proof-of-stake confusion), wrong-script contamination (Devanagari in Turkish text), and MDX syntax breakage causing 4 Netlify build failures.

## Import Metadata

| Field               | Value                                                                 |
| ------------------- | --------------------------------------------------------------------- |
| **PR**              | [#17182](https://github.com/ethereum/ethereum-org-website/pull/17182) |
| **Branch**          | `i18n/import/2026-01-27T21-23-47-tr`                                  |
| **Language**        | Turkish (tr)                                                          |
| **Import Date**     | 2026-01-27                                                            |
| **Review Date**     | 2026-02-17                                                            |
| **Total Files**     | 301 (255 markdown + 46 JSON)                                          |
| **Quality Score**   | 7.7/10                                                                |
| **Critical Issues** | 34                                                                    |
| **Warnings**        | 56                                                                    |

## Quality Scores

| Category                | Score      |
| ----------------------- | ---------- |
| Brand Name Preservation | 7.9/10     |
| Technical Accuracy      | 8.1/10     |
| Semantic Fidelity       | 8.2/10     |
| Terminology Consistency | 7.3/10     |
| Tone/Register           | 8.8/10     |
| **Overall**             | **7.7/10** |

### Scores by Review Group

| Agent Group           | Files | Critical | Warnings | Score  |
| --------------------- | ----- | -------- | -------- | ------ |
| Core Pages            | 39    | 6        | 9        | 8.1/10 |
| Dev Docs              | 106   | 7        | 15       | 8.6/10 |
| Tutorials + Remaining | 114   | 11       | 19       | 6.4/10 |
| JSON Batch A          | 23    | 7        | 11       | 8.2/10 |
| JSON Batch B          | 19    | 3        | 2        | 8.5/10 |

## Review Architecture

Five parallel review agents deployed with Opus model (JSON Batch B fell back to Sonnet after context overflow).

**Pitfall**: JSON Batch B agent (19 files) hit "Prompt is too long" error with Opus. Relaunched with Sonnet model and explicit instructions to use Grep instead of reading entire files, which resolved the issue.

## Critical Issues Found (34 Total)

### 1. "Solidity" Mistranslated as "katillik" (26 tutorial files)

**The Issue**: The programming language name "Solidity" was translated as "katillik" (Turkish for "rigidity/firmness" — a literal translation of the English word). This appeared in the `tags` frontmatter array of 26 tutorial files.

**Impact**: Tags are used for filtering and categorization. Translated tags break lookup functionality and misrepresent the content.

**Fix**: `replace_all` across all 26 tutorial files:

```yaml
# Before
tags: [ "katillik", "akilli kontratlar", "guvenlik" ]
# After
tags: [ "solidity", "akilli kontratlar", "guvenlik" ]
```

**Files affected**: All tutorials in `developers/tutorials/*/index.md` that reference Solidity.

### 2. PoW/PoS Semantic Inversion (`roadmap/merge/index.md`)

**The Issue**: Two critical instances where "proof-of-work" and "proof-of-stake" were swapped:

1. **summaryPoint3**: "...merging with a separate **proof-of-work** blockchain called the Beacon Chain" — The Beacon Chain is proof-of-**stake**, not proof-of-work.
2. **UpgradeStatus**: "...completed Ethereum's transition to **proof-of-work** consensus" — The Merge transitioned Ethereum **to** proof-of-stake, **from** proof-of-work.

**Fix**: Both instances corrected using glossary term "hisse ispati" (proof-of-stake):

- `is ispati blok zinciri` -> `hisse ispati blok zinciri`
- `is ispati mutabakatina` -> `hisse ispati mutabakatina`

### 3. "Mainnet" Translated as "Markette" (Market) (`roadmap/beacon-chain/index.md`)

**The Issue**: "Mainnet" was rendered as "Markette" (meaning "in the market" in Turkish). The community glossary specifies "Ana Ag" as the approved translation.

**Fix**: `Ethereum Markette` -> `Ethereum Ana Ag'da`

### 4. "Clients" Translated as "Musterileri" (Customers) (`roadmap/beacon-chain/index.md`)

**The Issue**: "Ethereum Clients" became "Ethereum Musterileri" (Ethereum Customers). The glossary specifies "istemci" (client in computing sense).

**Fix**: `Ethereum Musterileri` -> `Ethereum Istemcileri`

### 5. "DeFi" Rendered as "MeFi" (`page-apps.json`)

**The Issue**: The "D" in "DeFi" was dropped, creating a nonsense term. Brand names must never be translated.

**Fix**: `"MeFi"` -> `"DeFi"`

### 6. Vitalik Buterin in Devanagari Script (2 JSON files)

**The Issue**: "Vitalik Buterin" appeared as "वितालिक बुटेरिन" (Hindi/Devanagari script) in Turkish translation files. This is wrong-script contamination from Crowdin's translation memory — likely copied from Hindi translations.

**Files**: `learn-quizzes.json`, `page-upgrades-index.json`

**Fix**: Replaced Devanagari text with Latin script "Vitalik Buterin".

### 7. "underlying blockchain" -> "yatak blockchain" (bed blockchain) (`bridges/index.md`)

**The Issue**: "underlying" was translated as "yatak" (bed/mattress) instead of "altta yatan" (underlying). The glossary also specifies "blokzincir" for blockchain.

**Fix**: `altinda yatak blockchain` -> `altta yatan blokzincir`

### 8. BLS -> "BSL" Transposition + Typo (`staking/dvt/index.md`)

**The Issue**: "BLS" (Boneh-Lynn-Shacham) cryptographic signatures were transposed to "BSL" in 2 occurrences. Additionally, "dogrulayici" (validator) had a typo: "odogrulayici".

**Fix**: `BSL` -> `BLS`, `odogrulayici` -> `dogrulayici`

### 9. "ethererum.org" Typo (3 files)

**The Issue**: "ethereum" misspelled as "ethererum" in 3 files:

- `about/index.md`
- `contributing/adding-wallets/index.md`
- `contributing/translation-program/resources/index.md`

**Fix**: `ethererum.org` -> `ethereum.org`

### 10. "World Wibe Web" (`web3/index.md`)

**The Issue**: "Wide" misspelled as "Wibe".

**Fix**: `World Wibe Web` -> `World Wide Web`

### 11. "Sabir para" -> "Sabit para" (Stablecoin) (2 JSON files)

**The Issue**: Stablecoin definition used "Sabir" (patient) instead of "Sabit" (stable). The glossary specifies "sabit para".

**Files**: `glossary.json`, `glossary-tooltip.json`

**Fix**: `Sabir para` -> `Sabit para`

### 12. "EHT" -> "ETH" (3 occurrences)

**The Issue**: ETH ticker symbol had letters transposed.

**Files**: `page-run-a-node.json`, `page-upgrades-get-involved.json` (2 occurrences)

**Fix**: `EHT` -> `ETH`

### 13. Broken Markdown Links (3 in `community/research/index.md`)

**The Issue**: Markdown links broken by space between text and URL:

- `[Merkeziyetsiz Bilimin (DeSci)] (https://...)` instead of `[text](url)`

**Fix**: Removed space to restore valid markdown link syntax for all 3 instances.

### 14. Broken Anchor Links (6 in `standards/tokens/erc-1155/index.md`)

**The Issue**: Table of contents used underscores (`#batch_transfers`) while heading IDs used hyphens (`#batch-transfers`).

**Fix**: All 6 anchor links updated from underscores to hyphens.

### 15. Untranslated English String (`page-staking.json`)

**The Issue**: `"Software has been available and used by the public for the indicated period of time"` left in English.

**Fix**: Translated to Turkish: `"Yazilim, belirtilen sure boyunca halka acik olarak kullanilabilir durumda olmustur"`

## MDX Syntax Errors (4 build failures)

After committing translation fixes, the Netlify build failed on 4 pages.

### Error 1: `/tr/developers/docs/networks`

- **Symptom**: "Unexpected character `5` (U+0035) before name"
- **Cause**: Raw `<5GB` parsed as JSX tag opening
- **English source**: Uses `&lt;5GB`
- **Fix**: `<5GB` -> `&lt;5GB`

### Error 2: `/tr/developers/tutorials/all-you-can-cache`

- **Symptom**: "Expected a closing tag for `<sozlesme>`"
- **Cause**: Missing closing backtick after `` `<sozlesme>.<fonksiyon adi>() ``
- **English source**: `` `<contract>.<function name>()` `` (properly closed)
- **Fix**: Added closing backtick: `` `<sozlesme>.<fonksiyon adi>()` ``

### Error 3: `/tr/developers/tutorials/creating-a-wagmi-ui-for-your-contract`

- **Symptom**: "Unexpected closing slash `/` in tag"
- **Cause**: Misplaced backtick left `</>` exposed as JSX
- **Broken**: ``(`<> ...` </>`)``
- **Fixed**: ``(`<> ... </>`)``

### Error 4: `/tr/restaking`

- **Symptom**: "Unexpected closing tag `</a>`"
- **Cause**: Orphaned `</a>` from sentence restructuring during translation
- **Fix**: Removed trailing ` </a>`

## Community Glossary Reference

The `tr-glossary-terms.json` file in the main repo root was used as the authoritative reference for all terminology decisions. Key terms applied:

| English        | Turkish (Glossary) | Issue Found                                  |
| -------------- | ------------------ | -------------------------------------------- |
| proof-of-stake | hisse ispati       | PoW/PoS inversion                            |
| proof-of-work  | is ispati          | PoW/PoS inversion                            |
| mainnet        | ana ag             | "Markette" used instead                      |
| client         | istemci            | "Musteri" (customer) used                    |
| stablecoin     | sabit para         | "Sabir para" typo                            |
| blockchain     | blokzincir         | "blockchain" left untranslated in some cases |
| validator      | dogrulayici        | Typo "odogrulayici"                          |
| node           | dugum              | Consistent                                   |
| rollup         | toplama            | Consistent                                   |
| beacon chain   | isaret zinciri     | Consistent                                   |
| staking        | hisseleme          | Consistent                                   |

## Fix Progression Timeline

1. **2026-01-27**: Crowdin automated import creates PR with 301 files
2. **2026-02-17**: Review agents deployed (5 parallel agents)
3. **2026-02-17**: Quality scores posted to PR as comment
4. **2026-02-17**: Translation fixes applied (45 files, 54 insertions/54 deletions)
5. **2026-02-17**: Netlify build fails with 4 MDX errors
6. **2026-02-17**: MDX syntax fixes applied (4 files)
7. **2026-02-17**: Build verification passed

## Key Pitfalls & Lessons Learned

### 1. Brand Name Translation is Systematic

"Solidity" -> "katillik" appeared in 26 files. This isn't a one-off error — Crowdin's translation engine systematically translates programming language names when they have common-word meanings. **Expect this for every language import.**

### 2. Wrong-Script Contamination from Translation Memory

Devanagari "Vitalik Buterin" in Turkish files indicates Crowdin's translation memory leaked content from Hindi translations. **Check for cross-script contamination as a standard review step.**

### 3. Glossary Terms Are Not Optional

The community glossary resolved several judgment calls:

- "Markette" vs "Ana Ag" — only the glossary makes it clear "ana ag" is the community standard
- "Musteri" vs "Istemci" — both are valid Turkish, but the glossary defines the accepted technical term
- **Always load and reference the glossary before applying fixes.**

### 4. JSON Review Agent Context Limits

JSON Batch B agent (19 files) exceeded Opus context. For Turkish with 46 JSON files, the split was 23/19. **For languages with 40+ JSON files, plan for Sonnet fallback or 3-way split.**

### 5. MDX Errors Are Predictable

All 4 MDX errors fell into well-known categories:

- Raw `<` before numbers (escape as `&lt;`)
- Missing closing backticks (compare against English source)
- Misplaced backticks (same pattern as Vietnamese PR)
- Orphaned HTML tags (same pattern as Vietnamese PR)

**These same patterns appear in every Crowdin import. Consider adding automated detection to `post_import_sanitize.ts`.**

## Prevention Recommendations

### Immediate (Can implement now)

1. **Brand name protection dictionary** in `post_import_sanitize.ts`

   - Maintain list of protected terms (Solidity, Vyper, MetaMask, etc.)
   - Auto-revert translations of protected terms
   - Estimated effort: 2-3 hours

2. **Cross-script contamination detector**

   - Define expected Unicode ranges per locale
   - Flag non-Latin characters in Turkish/Vietnamese/etc. files
   - Estimated effort: 1-2 hours

3. **MDX pre-validation step**
   - Run MDX compiler on translated files before PR creation
   - Catch `<term>` and backtick issues early
   - Estimated effort: 3-5 hours

### Medium-term (Requires Crowdin configuration)

4. **Crowdin glossary enforcement**

   - Upload community glossaries as "do-not-translate" entries
   - Translators see warnings when deviating from glossary
   - Estimated effort: 2-3 hours

5. **Pre-merge build check GitHub Action**
   - Run `pnpm build` on Crowdin import PRs automatically
   - Block merge until build passes
   - Estimated effort: 1 hour

## Related Files

- **Sanitizer**: `src/scripts/i18n/post_import_sanitize.ts`
- **Review Command**: `.claude/commands/review-translations.md`
- **Community Glossary**: `tr-glossary-terms.json` (repo root)
- **CI Workflow**: `.github/workflows/claude-review-translations.yml`
- **Import Orchestrator**: `src/scripts/i18n/main.ts`
- **Vietnamese Review**: See PR #17176 companion document for cross-reference
