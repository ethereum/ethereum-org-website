# Telugu (te) Translation Review Findings

## PR #19979 (intl/pending-dev, run 45975411591) -- 2026-11-27 -- Score 8.4/10
Scope: 19 JSON namespaces + 76 incremental markdown pages; changed lines only, ~110 JSON keys and ~30 md files read against English. Reported-speech `-మని` negation flip did not recur.

**Fixed in this branch (9 criticals):**

- `interact-with-other-contracts-from-solidity` lines 23, 113: `// SPDX-లైసెన్స్-ఐడెంటిఫైయర్: MIT` -> `// SPDX-License-Identifier: MIT` (machine-parsed code comment translated).
- `glossary.json` `liquid-staking-tokens-definition`: added `వికేంద్రీకృత ఫైనాన్స్ (DeFi)` where English has bare DeFi -> `DeFi` (#112).
- `verifying`: `అప్లికేషన్ బైనరీ ఇంటర్‌ఫేస్ (ABI)` and 2x `అప్లికేషన్ ప్రోగ్రామింగ్ ఇంటర్‌ఫేస్ (API)` -> bare `ABI` / `API` (#112); "Verifiers can also compare" rendered `ధృవీకర్తలు` (validators, glossary polyseme) -> `ధృవీకరించేవారు`.
- `staking/saas` description: `స్టాకింగ్` ("stacking", recurrence of the #19115 glossary misspelling) -> `స్టేకింగ్`.
- `videos/devcon-mumbai-coming-2026` title, description, body: `దేవ్‌కాన్` -> `డెవ్‌కాన్` (PR #19142 form, matches the breadcrumb).
- `programming-languages/rust`: `ఈథీరియం వర్చువల్ మెషీన్` -> locale spelling `ఎథీరియం వర్చువల్ మెషిన్` (dev form); `Awesome ఎథీరియం Rust` -> repo name `Awesome Ethereum Rust`.
- `data-and-analytics`: reference links `గ్రాఫ్ నెట్‌వర్క్ అవలోకనం` / `గ్రాఫ్ ఎక్స్‌ప్లోరర్` -> `Graph ...` (body and dev use Latin `The Graph`).

**Open (warnings):**

- Ethereum client names (`ఎరిగోన్`, `రెత్`, `గెత్`, `బేసు`, `నెథర్‌మైండ్`, `లోడ్‌స్టార్`) transliterated in archive-nodes/light-clients/rust per ETHGlossary rows, against the "clients stay Latin" policy; glossary decision needed, not fixed.
- event rendered `ఘటన` (ETHGlossary) mixed with `ఈవెంట్` inside one page (logging-events-smart-contracts, oracles, erc-7540); `ఘటనను విడుదల చేస్తుంది` for emit in anatomy comments.
- verifying: `contract instance` -> `కాంట్రాక్ట్ ఉదాహరణ` (example) and `deterministic` -> `నిర్ణయాత్మకమైనది` (decisive); `ఇన్‌స్టాన్స్` was correct on dev.
- contributing/index: `విజ్ఞానశాస్త్రంకి` missing sandhi; research: `లేయర్ 1 (L1)` expansion pattern is the locale standard (kept).
- defi description: `వికేంద్రీకృత ఫైనాన్స్ (DeFi)` expansion where English says "decentralized finance on Ethereum" (new parenthetical, left).
- Pre-existing, not touched: U+2066/U+2069 isolates remain in frontmatter titles (erc-7540, pectra, dao metaTitle); `ఈథీరియం` vs `ఎథీరియం` in the glossary EVM row.

## PR #19973 (intl/pending-dev) -- 2026-11-26 -- Score 8.8/10
Scope: component-diagrams (5 new diagrams) and dev-tools descriptions (277 keys). 0 critical. Open: `అప్లికేషన్ ప్రోగ్రామింగ్ ఇంటర్‌ఫేస్ (API)` expanded x10 where English has bare `API` (#112); `ZK-rollup` spelled out as `జీకే-రోలప్`; product names in dev-tools mixed (transliterated for Coinbase/MetaMask per glossary, Latin for Arbitrum/Optimism/Lido per glossary).

## PR #19902 (intl/pending-dev) -- 2026-11-25 -- Score 8.6/10
Scope: 7-8 re-translated pages (pos, portal-network, optimistic-rollups, zk-rollups, verifying, erc-721-vyper, SQL tutorial, glamsterdam), full PR review, sonnet agents.

Fixed: block builder, peer, reorg, execution client x4, deleted paragraph restored (optimistic-rollups), epoch, optimistic rollup x5, actors as performers, dapp. Open: equivocation phrase, event vs ghatana, validated/attested collapsed.

## PR #19815 (intl/pending-dev) -- 2026-11-24 -- Score 8.0/10
Scope: 12 re-translated dev-docs/roadmap pages with interactive diagrams + new `component-diagrams.json` namespace (933 keys), reviewed against English at PR head 86deeb25cd.

Fixed: placeholder swaps (peer-das caption, verkle), builder, execution client, fork choice, Ethereum spelling, gas inline code. Open: `saganiki paiga` for each-over-half, compounding sammelanam.

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

## PR #19034 (intl/pending-dev) -- 2026-08-20 -- Score 8.2/10
Scope: new `page-open-source.json` (228 keys) + retranslated `community/research/index.md`, plus 3 single-key JSON changes. Fleet avg 8.67, median 8.80.
**Fixed in this branch:**
- AI prompt-card fill-in blanks (`[app]`, `[my device]`, `[my system]`, `[this]`, `[this error]`, `[App]`) translated -- they were shipped as verbatim English.

- `వ్యతిరేకంగా` (opposing) for "designing against standards" -- inverted the Design/UX guidance -> `ఆధారంగా`.
- Agency inversion in `movement-description`: the organizations became the protected object instead of the defenders.
- Dropped counterfactual "would otherwise" in `movement-wider-description`, listing paywalled research as free knowledge.

**Open (native call needed):**

- Three more non-inverting `against` sites from the same root cause.
- `పంపిణీ`/`రవాణా` (freight) for "ship/ships".
- `ఉత్పత్తి` (manufacturing) for "production infrastructure".
- `ఆదిమాలు` for "primitives" against 6 prior `ప్రిమిటివ్‌ల*` uses.
- `చెల్లించని వ్యక్తులచే` flips agency: "people who do not pay" for "unpaid people".
- No ETHGlossary deviations at all, and the `స్టాకింగ్` glossary-data defect from #19115 did not recur.

## PR #19142 (intl/pending-devcon-banner) -- 2026-08-21 -- Score 9.9/10
Scope: new `component-devcon-banner.json` (6 keys). Fleet avg 9.9.

**Fixed in this branch:**

- `Devcon` -> `డెవ్కాన్` in `title` and `subtitle`. Derived form (Gemini 3.1 Pro), applying 6.1's te rule for consonant-final loanwords: standard written transliteration with the halant, not a colloquial vowel-appended form. `logo-alt` stays Latin.

## PR #19326 (intl/pending-dev) -- 2026-09-28 -- Score 8.8/10

Scope: `developers/docs/accounts/index.md`, `smart-contracts/languages/index.md`, `smart-contracts/testing/index.md`, `src/intl/te/page-apps.json`. 7 critical, 6 warnings. Brand 10/10 | Technical 7/10 | Semantic 9/10 | Consistency 8/10 | Tone 10/10. Fleet average 8.1 across 24 locales.

**Fleet-wide patterns (see known-patterns #79/#80):**

- Translated Geth/`clef` console output: te affected on the full block; restored byte-exact from the English source. 17 of 24 locales hit.
- Whitehat parenthetical at `testing/index.md:245`: not affected.
- Bare-acronym over-expansion in `page-apps.json`: collapsed to the ETHGlossary short form.
- Trailing newline stripped at EOF by this run's writer; restored. Cosmetic only, no gate was checking it.

**Fixed in this branch (te-specific):**

- `యానిట్` -> `యూనిట్`; the only occurrence in the te tree against 35 correct ones in the same file
- `డాప్‌లను` -> `dappలను` per the glossary Latin form; the same file already used `dapp` four lines earlier. ZWNJ dropped to match the tree-dominant form

**Notes:**

- The `testing` page title now correctly matches its site-nav label, fixing the PR #19115 nav/title mismatch class here rather than repeating it.



## PR #19357 (intl/pending-dev, full sweep) -- 2026-09-30 -- Score 8.6/10

Scope: full sweep, ~191-198 files. Sampled for idiom: largest prose diffs; glossary triage over scripted candidates restricted to changed lines.

**Fixed in this branch:**

- `page-find-wallet-private-transactions-desc` restored from the pre-rename `page-find-wallet-privacy-desc` value (shipped in English fleet-wide, known-patterns #81).
- privacy-online `policies-services` Consumer Reports stat: `సున్నా మరియు 59 శాతం మధ్య నిర్వహించబడ్డాయి` -> `సున్నా నుండి 59 శాతం మాత్రమే తొలగించగలిగాయి`; `70 శాతాన్ని కోల్పోయారు` -> `70 శాతం తొలగించబడ్డాయి` (native check welcome).

**Open (warnings):**

- Not fixed (unchanged lines): `లిడో` (glossary Lido), `డెన్‌కున్` (glossary Dencun).
- "both" dropped (#82); `ఒక పార్టీ` political sense again (hegota:21).

## PR #19474 (intl/pending-dev, /organizations namespaces) -- 2026-10-14 -- Score 8.0/10

Scope: full PR diff, ~27 files (8 new page-organizations*.json, common.json, small MD href/EIP updates). Label/meta acronym trim applied fleet-wide (known-patterns #86).

**Fixed in this branch:**

- `enterprise-privacy` database corruption `అవినీతి` -> `పాడైపోవడం`; relational against `వ్యతిరేకంగా` -> `ఉపయోగించి`.
- `small-business` `compare-privacy` reused address inverted to used-once -> `పదే పదే ఉపయోగించే`.

**Open (warnings):**

- `ఉత్పత్తి` for production recurs; rollup `రోలప్`/`రోల్అప్` mirrors glossary inconsistency; treasuries `ఖజానాలు`.

## PR #19486 (intl/pending-dev, networks quarantine release) -- 2026-10-15 -- Score 8.8/10

- Fixed: `Chain Platform` transliterated -> Latin (L54, L83); stray U+2068/U+2069 around `ETH`.
- Open: bare dApp/EVM expanded (#80); glossary EVM entry spells `ఈథీరియం` vs file `ఎథీరియం`.

## PR #19556 (intl/pending-dev, run 39679413921) -- 2026-10-21 -- Score 8.2/10

Scope: 27 files (smart-contracts/security + app-plasma retranslations, prediction-markets, scam-token-tricks, new `page-wallet-descriptions` / `component-catalog-item`, founders/stories JSON).

**Fixed in this branch:**

- `page-founders-tag-{accelerator,events,mentorship}` restored from dev (#81)
- app-plasma:966 Solidity always_latin (`సోలిడిటీ ధృవీకర్తను` -> `Solidity ధృవీకర్తను`)
- security/index.md:18-27 fabricated second frontmatter block deleted

**Open (native call needed):**

- None at critical level.
- 17 warnings in the PR review (see the PR #19556 review body).

**Summary:** The translation is fluent and mostly faithful. te's known reported-speech negation error (the `-మని` suffix flipping meaning) did not recur. The two te-specific must-fixes are the made-up frontmatter block in the security page and the transliterated Solidity; the founders tag regression affects other locales too.

## PR #19568 (intl/pending-dev) -- 2026-10-22 -- Score 9.4/10
Scope: 6 repaired developer tutorials (hello-world, mint/view/write NFT series, sending-transactions, using-websockets), changed lines only. Scores are for the PR's initial state.

**Fixed in this branch:**

- Code-fence drift restored from English: `sh` tags, `npm install dotenv` (known-patterns #92)

**Notes:**

- Retranslated in full (write-deploy correct). Warnings: English alt text; NFT spelled out too often.

## PR #19803 (intl/pending-dev) -- 2026-11-16 -- Score 9.6/10
Scope: 2 repaired developer tutorials (develop-and-test-dapps-with-a-multi-client-local-eth-testnet, how-to-use-echidna-to-test-smart-contracts), changed lines only. creating-a-wagmi-ui-for-your-contract was quarantined at the gate in all 24 locales (known-patterns #97). Scores are for the PR's initial state.

**Fixed in this branch:**

- multi-client:136 personal pronoun for accounts `ప్రతి ఒక్కరి` -> `ప్రతి ఒక్కదాని`

**Open / notes:**

- ABI/EVM spelled out (#80); `ఈథీరియం` vs locale `ఎథీరియం` in the EVM expansion (known glossary inconsistency)
- Unchanged echidna:317 glossary verb pasted into heading; echidna:507 we/our mix -- out of scope

## PR #19901 (intl/pending-dev) -- 2026-11-25 -- Score 9.0/10
Scope: gas page, translation-program page, page-developers-index.json (3 files), changed lines only. Scores are for the PR's initial state.

**Fixed in this branch:**

- Gas page inline code spans restored to English (known-patterns #101 recurrence)

**Open / notes:**

- API over-expanded after a brand name (translation-program:21).
- `page-developers-index.json` lost its final newline vs dev (matches en; cosmetic)
