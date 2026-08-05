# Tamil (ta) Translation Review Findings

> **PR:** #18353 (stablecoins-2026-redesign, page-stablecoins.json)
> **Date:** 2026-06-05
> **Quality Score:** 9.4/10

## Issues Found (not auto-fixed -- needs native judgment)

| Severity | Key | Issue | Current | Suggested |
|----------|-----|-------|---------|-----------|
| Warning | page-stablecoins-types-intro | "trade-offs" mistranslated as "exchanges/transfers" | பரிமாற்றங்கள் | சமரசங்கள் / சாதக-பாதகங்கள் (pros-and-cons sense) |

Left unfixed: choosing the right Tamil term for "trade-offs" (compromises/downsides) is a native-speaker judgment; பரிமாற்றங்கள் also collides with swap=பரிமாற்றம் used elsewhere on the page.

## Glossary Anchors (ta)

- stablecoin = ஸ்டேபிள்காயின்
- collateral = பிணையம் (NOTE: homograph with network = பிணையம்; context disambiguates)
- crypto = கிரிப்டோ
- swap = பரிமாற்றம்
- lending = கடனளிப்பு
- wallet = பணப்பை
- decentralized = பரவலாக்கப்பட்ட
- smart contract = திறன் ஒப்பந்தம்
- token = வில்லை (glossary notes டோக்கன் common in casual; வில்லை used consistently here)

## Notes

- collateral/network homograph (both பிணையம்) is glossary-endorsed; not an error.
- All hrefs/tickers/markup byte-identical; brands transliterated (ஆவே/Aave) or kept Latin per policy. No critical issues.

---

## PR #18418 (intl/pending-dev) -- 2026-06-16 -- Score 9.6/10

- 21 UI-string JSONs reviewed. 0 critical. No placeholder leak in glossary-tooltip (clean). The prior "trade-offs" polysemy issue does NOT apply here -- page-stablecoins.json is not in this PR; no "trade-offs" strings present.
- Minor warnings only: two valid Ethereum transliterations coexist (எத்திரியம்/எத்தீரியம்). ICU/tags/hrefs/domains all intact.

## PR #18772 (community-stories.json, 2026-07-10) -- 9.5/10
- WARN (unresolved term question): "smart contract" rendered ஸ்மார்ட் ஒப்பந்தங்கள் (3 keys, internally consistent) vs this file's prior documented anchor திறன் ஒப்பந்தம் (PR #18353). ETHGlossary carries NO ta entry for smart contract -- needs an ETHGlossary decision before either form is enforced.
- transfer/exchange/transaction (பரிமாற்றம்/பரிவர்த்தனை) disambiguation held up across all remittance stories -- the PR #18353 trade-offs polysemy risk did not recur.

## PR #18935 (intl/pending-content-translation-program-winddown-ctas) -- 2026-07-28 -- Score 8.1/10
- **2 criticals, hand-fixed:** `contributing/translation-program/index.md` lines 7 and 25 kept present tense (`முயற்சியாகும்`/`மாற்றுகிறது`, `கொண்டுள்ளது`) after English moved to past, so the page opened describing the Translation Program as ongoing two paragraphs above the notice it is closing. Fixed to `முயற்சியாக இருந்தது`/`மாற்றியது` and `கொண்டிருந்தது`. See known-patterns #33 -- Tamil needs explicit past marking; it will not fall out of a tense-only English edit.
- **Collateral regressions from the full-file retranslation** (left unfixed, need native judgment): `முக்கிய பகுதியாக` -> `திறவுகோல் பகுதியாக` ("keyhole part") at line 39; idiomatic `ஆங்கிலம் பேசாதவர்கள்` -> calque `ஆங்கிலம் அல்லாத பேச்சாளர்கள்`; sentence-final periods dropped at lines 69 and 71. All three were *correct* on dev before this run.
- **Terminology:** "onboarding" rendered as the stilted calque `பயனர் இணைவு` on the program page, contributing page and page-collectibles, while `get-involved` uses the cleaner `இணைத்துக்கொள்வதில்லை` in the same PR. Prefer the latter.
