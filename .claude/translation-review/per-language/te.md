# Telugu (te) Translation Review Findings

> **PR:** #18739 (intl/pending-privacy-page)
> **Date:** 2026-07-09
> **Quality Score:** 8.3/10 (pre-fix) -> ~9.5 (post-fix, semantic fidelity restored)
> **Files reviewed:** 1 (page-privacy.json, 71 keys)

## Critical (fixed)

- **Reported-speech negation inversion (known-patterns #26):** `page-privacy-targeting-example-1` -- "Uber says it does not use this to set fares" was rendered `...దీనిని ఉపయోగించమని Uber చెబుతోంది`, whose default parse via the `-మని` reported-directive suffix is "Uber says TO use this to set fares" (the opposite of the source). Fixed to `...దీనిని ఉపయోగించడం లేదని Uber చెబుతోంది` ("is not using"). In future te reviews, scrutinize any negated reported-speech / denial for this suffix collision.

## Clean / verified

- Ethereum correctly transliterated `ఎథీరియం` throughout (incl. locative `ఎథీరియంలో`). Glossary terms compliant: గోప్యత (privacy), మెటాడేటా (metadata), అనుమతి రహిత (permissionless), శూన్య-జ్ఞాన (zero-knowledge), గూఢలిపి శాస్త్రం (cryptography), నెట్‌వర్క్ (network).
- All named entities preserved/localized (FTC + US Federal Trade Commission gloss, Clearview AI, Uber, Orbitz, Mac, Google, WhoTracks.me, ICCL, ICE + full gloss, Norwegian Consumer Council, US Supreme Court). Statistics, rich-text tags, and `{value}` placeholder intact.
- Consistent formal మీరు register; no untranslated English, no cross-script contamination.
- Apart from the Uber sentence, semantics were faithful: nothing-to-hide framing, dynamic/surge pricing, medical-diagnosis aggregation, Orbitz/Mac, warrant vs open-market location data, and the crowd/anonymity-set argument all intact.

## PR #18937 -- 2026-07-29 -- Score 6.8/10 pre-fix (weakest of the 24)
- **Program renamed unilaterally on one page of four.** The regeneration switched `అనువాద ప్రోగ్రామ్` -> `అనువాద కార్యక్రమం` across the program page (16 occurrences) while resources, translators-guide and playbook all kept `ప్రోగ్రామ్`, and the translators-guide cross-ref label `[అనువాద ప్రోగ్రామ్ స్థితి]` stopped matching the heading it points at. Reverted to `ప్రోగ్రామ్` (15 lines, 6 of them inflected). Note `ప్రోగ్రామ్` is an unassimilated loanword that never takes the Telugu neuter `-ం` nominative, so it needs no stem reduction before a following noun -- `ప్రోగ్రామ్ స్థితి` is correct as-is, and the `కార్యక్రమ` compounding problem dissolves with the revert.
- **Garbled sentence, fixed:** `మొదలైన` ("such as") had reattached to an inserted `పేజీలో`, so the metadata examples modified "pages" instead of "metadata". Fixed with the adjectival locative `పేజీలోని`, which also restores the English "metadata on the page" nuance that dev's line had dropped.
- **Instruction-level semantic error, fixed:** grammatical "imperative" rendered as `అత్యవసరంగా` ("urgent"), i.e. "button translations should be urgent". Now `ఆజ్ఞార్థకంగా`.
- Left for follow-up: `నవీకరణలు`/`అప్‌డేట్‌లు`/`అప్‌డేట్` three-way split for "updates" on the resources page, and `Proz term search` left in English where id/vi/sw all localize it.
- Watch item for future te patches: inflected forms carry ZWNJ (U+200C) invisibly -- `ప్రోగ్రామ్‌లో`, `‌కు`, `‌ను`, `‌లను`. Copy lines verbatim, never retype. See known-patterns #36.

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 9.6/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values`.

**Fixed in this branch:**

- #43 blank line before `{#validators-keys}` restored

**Open (native call needed):**

- `app-the-interfold-description` "independent parties" -> `స్వతంత్ర పార్టీలను`; `పార్టీ` defaults to the political sense and the same sentence already contains voting/governance. te's own third-party precedent is `పక్షం` (11 uses), and hi/mr both use `पक्ष`.

**Notes:**

- `లేయర్ 2 (l2)` with lowercase l2 is a pre-existing locale-wide pattern (94 occurrences), also in bn/ta/mr — not a new defect.
- Every flagged polysemy trap ("mint", "mixing", "state", "key", "compliance", "governance") resolved to the rendering te already uses elsewhere in the locale.

## PR #19015 (intl/pending-dev) -- 2026-08-10 -- Score 8.4/10 (pre-fix)

- Scope: 11-12 files (8-9 markdown + common / learn-quizzes / page-what-is-ethereum JSON). Fleet avg 8.4.
- `Geth` -> `గెత్` in `transactions` (the only Latin instance in the whole te tree). `common.json` zero-knowledge-proofs `రుజువులు` -> `నిరూపణలు`, matching the glossary, the page title and the zkp quiz keys. **Its worst historical failure mode -- reported-speech negation flipping via `-మని` -- did NOT recur** despite targeted stress-testing.
- Fleet-wide items fixed in this branch for every locale: the `<p></p>` MDX build-breaker (8 locales), the `.pdf` autolink corruption (#50), the deleted `{#will-my-smart-contracts-change}` FAQ section (#32), the missing `<QuizWidget>` component (#49), and the two stale glamsterdam prose clauses (#51 -- `Q4 2026` and the stakers/liquidity sentence).

## PR #19076 (intl/find-wallet-translations) -- 2026-08-14 -- Score 9.4/10

Scope: `page-wallets-find-wallet.json` only -- 47 added keys (persona hero copy + a new `page-find-wallet-fee-*` disclosure cluster), 1 changed (`persona-legend` filter -> browse), 5 removed. Fleet avg 9.35.

**Fixed in this branch:** none -- no critical issues.

**Open (native call needed):**

- `new-to-crypto-hero-description` -> `ఎథీరియంకు కొత్తా?` is a bare colloquial predicate with no honorific while the rest of the string continues in formal మీరు/-ండి.
- `meta-description-fallback` places the dative suffix OUTSIDE the plural block, so the singular branch composes to `నెట్‌వర్క్కు`, missing the ZWNJ the locale uses everywhere else (`నెట్‌వర్క్‌కు`). Plural branch is correct.
- `crops-secure` -> `సురక్షితమైనది` (sg `-ది`) beside `crops-private` = `ప్రైవేట్` (bare) and `advanced` = `అధునాతనమైనవి` (pl `-వి`): three shapes for one label class.
- `fee-qualifier-of-rewards` -> `రివార్డ్` vs the tree-dominant `ప్రతిఫలాలు` (#56).

**Notes:**

- te's documented `-మని` reported-speech negation flip does not appear anywhere in this file.
- The `ఫీజు`/`రుసుము` fee-word split predates this PR.

## PR #19115 -- staking redesign (6 MD + 1 JSON), 2026-08-19

**Score: 8.1/10** (fleet avg 7.8 -- lowest recorded in this series; the gap is structural, not linguistic)

Signature `-మని` reported-directive inversion did NOT recur across ~25 negation-bearing sentences -- a real improvement. But saas propagated a `స్టాకింగ్` ("stacking") misspelling out of a faulty ETHGlossary row into its page title AND the site nav label; solo used `వ్యాలిడేటర్` 63x where 5 sibling pages use glossary `ధృవీకర్త`; and the glossary's verbal-noun `signing` form was pasted into 14 attributive slots needing a relative participle.

Fleet-wide defects also present in this locale (see known-patterns #60-64): heading-anchor rotation in `run-a-node`, reverted `<Card title>` attributes, untranslated image alt text, and the `</ExpandableCard>` -> `</ButtonLink>` MDX breaker. All repaired in this PR.
