# Bengali (bn) -- Translation Review Findings

## PR #19979 (intl/pending-dev) -- 2026-11-27 -- Score 8.3/10
Scope: 72 markdown pages + 20 JSON namespaces (incremental updates, dev-tools descriptions), changed lines only; read 10 md diffs (contributing, erc-7540, anatomy, bridges, data/oracles/nodes docs, tutorials, roadmap, security, videos) and ~120 JSON keys (glossary, glossary-tooltip, learn-quizzes, page-learn, page-get-eth, page-community, page-roadmap, page-developers-tools-descriptions).

Fixed (critical): contributing/index.md six bold section headings left in English (Translations, Development, Design, Content, Feature ideas, Product listings) restored to dev forms; roadmap/fusaka junk token `যায়্বা যায় না` -> `যায় না`; security/index.md stray `>)` left after the social-engineering link; SPDX-License-Identifier comment translated in interact-with-other-contracts (2 code blocks) restored; Latin tool names transliterated in changed lines (Slither/Echidna/Medusa in secure-development-workflow and smart-contract-security-guidelines, Lodestar in programming-languages/javascript, Erigon/Reth/Besu/Nethermind in archive-nodes and node-architecture, Graph Explorer, Solium comment, YouTube); 5 added `অ্যাপ্লিকেশন বাইনারি ইন্টারফেস (এবিআই)` expansions in tools-descriptions -> bare `ABI`; page-learn `জিরো-নলেজ প্রুফ` hybrid (2 keys) -> `শূন্য-জ্ঞান প্রমাণ`; page-layer-2-learn `লেয়ার 2` digit mixed with `লেয়ার ২`.

Open: tools-descriptions mixes `API`/`RPC` Latin with `এপিআই`/`জেসন-আরপিসি` (glossary-sanctioned but inconsistent); `ইথেরিয়াম উন্নয়ন প্রস্তাবনা` (eips description) vs `ইমপ্রুভমেন্ট প্রপোজাল` (title); Devcon rendered `ডেভকন` and `Devcon 8` in the same video page; other pre-existing transliterated tool names (স্লিদার/ম্যান্টিকোর/একিডনা across other tutorials, ইউনিসোয়াপ, টেলর) remain outside this PR's lines; `শব্দকোষ` (page-learn) vs `গ্লোসারি` (contributing) for glossary.

## PR #19962 (intl/pending-dev) -- 2026-11-26 -- Score 9.0/10
Scope: `component-diagrams.json`, 257 changed keys (Merkle proof, optimistic rollup, base fee, Gasper finality, ZK-rollup diagrams), changed lines only.

Fixed: 37 values with glossary-lowercased `(l1)`/`(l2)` uppercased (glossary data, #53/#111). Open: expansion of bare L1/L2 to `লেয়ার ১ (L1)` is heavy.

## PR #19902 (intl/pending-dev) -- 2026-11-25 -- Score 8.6/10
Scope: 7-8 re-translated pages (pos, portal-network, optimistic-rollups, zk-rollups, verifying, erc-721-vyper, SQL tutorial, glamsterdam), full PR review, sonnet agents.

Fixed: junk-syllable negation corruption (pos L46), bad actors as film actors, যতক্ষণ না inversion (verifying), zero-knowledge proof hybrid regressed (6 sites zk-rollups), U+3002 x6 and U+2060 x6 in erc-721. Open: equivocation ইক্যুইভোকেশন vs দ্ব্যর্থবোধক, ZK-rollup Latin, taka for currency, API over-expansion.

## PR #19815 (intl/pending-dev) -- 2026-11-24 -- Score 8.2/10
Scope: 12 re-translated dev-docs/roadmap pages with interactive diagrams + new `component-diagrams.json` namespace (933 keys), reviewed against English at PR head 86deeb25cd.

Fixed: peer-das caption placeholder swap, gas inline code, attestation/equivocation/fork-choice/consensus-client forms, withdrawal/signing/builder across the diagram JSON. Open: stray BiDi isolates in networking-layer and peerdas frontmatter, detached postpositions.

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

## PR #19015 (intl/pending-dev) -- 2026-08-10 -- Score 9.1/10 (pre-fix)

- Scope: 11-12 files (8-9 markdown + common / learn-quizzes / page-what-is-ethereum JSON). Fleet avg 8.4.
- Two corrupted words that destroyed a negation, both fixed: `প্রয়োজন হবে ঘন` -> `হবে না` (transactions -- view/pure calls need NO gas) and `থাকেবিধা নেই` -> `থাকে না` (payments). `actor` -> `পক্ষ` (was অভিনেতা, film performer). Dropped `<strong>` around DeFi restored.
- Fleet-wide items fixed in this branch for every locale: the `<p></p>` MDX build-breaker (8 locales), the `.pdf` autolink corruption (#50), the deleted `{#will-my-smart-contracts-change}` FAQ section (#32), the missing `<QuizWidget>` component (#49), and the two stale glamsterdam prose clauses (#51 -- `Q4 2026` and the stakers/liquidity sentence).

## PR #19076 (intl/find-wallet-translations) -- 2026-08-14 -- Score 9.2/10

Scope: `page-wallets-find-wallet.json` only -- 47 added keys (persona hero copy + a new `page-find-wallet-fee-*` disclosure cluster), 1 changed (`persona-legend` filter -> browse), 5 removed. Fleet avg 9.35.

**Fixed in this branch:** none -- no critical issues.

**Open (native call needed):**

- `fee-row-label` uses bare English `পে` in a table header; prefer `আপনি কিসের জন্য অর্থ প্রদান করছেন`.
- `hardware-hero-description` drops the "while you hold" clause.
- `fee-value-set-by-provider` uses `প্রোভাইডার` where pre-existing `methodology-verification` says `প্রদানকারী`.
- `fee-qualifier-of-rewards` -> `রিওয়ার্ড` vs the tree-dominant `পুরস্কার` (see #56).

**Notes:**

- `fee-qualifier-stablecoins-lower-l2` uses Western `লেয়ার 2` -- follows house numeral policy and CONTRADICTS ETHGlossary's `লেয়ার ২`. mr resolved the same conflict the opposite way. See #53; do not hand-fix either side until the glossary is normalized.
- Devanagari-range hits in this file are the shared danda U+0964 -- the known false positive.

## PR #19115 -- staking redesign (6 MD + 1 JSON), 2026-08-19

**Score: 7.8/10** (fleet avg 7.8 -- lowest recorded in this series; the gap is structural, not linguistic)

Meaning inversion at withdrawals:209 (`যতক্ষণ না` = until, English says as-long-as); `অভিনেতা` (film actor) for "actors" -- recurrence of #19015; `রিওয়ার্ড`->`পুরস্কার` in pools only; `লেনদেন`->`ট্রানজ্যাকশন` regression in run-a-node; `চুক্তি` (legal doc) for contract in 2 JSON keys. No untranslated prose, no cross-script contamination.

Fleet-wide defects also present in this locale (see known-patterns #60-64): heading-anchor rotation in `run-a-node`, reverted `<Card title>` attributes, untranslated image alt text, and the `</ExpandableCard>` -> `</ButtonLink>` MDX breaker. All repaired in this PR.

## PR #19034 (intl/pending-dev) -- 2026-08-20 -- Score 8.6/10
Scope: new `page-open-source.json` (228 keys) + retranslated `community/research/index.md`, plus 3 single-key JSON changes. Fleet avg 8.67, median 8.80.
**Fixed in this branch:**
- AI prompt-card fill-in blanks (`[app]`, `[my device]`, `[my system]`, `[this]`, `[this error]`, `[App]`) translated -- they were shipped as verbatim English.

- `হয়বিধা নেই` junk-syllable corruption destroying the negation in `page-open-source-local-ai-description-2` (3rd recurrence of this bn artifact family).
- `চুক্তি` -> `কন্ট্রাক্ট` for smart contracts, against the glossary note that reserves `চুক্তি` for legal documents.

**Open (native call needed):**

- `কমিউনিটি` -> `সম্প্রদায়` regression at 4 sites (tree is 208:14 for `কমিউনিটি`).
- bn files use precomposed U+09DF (NFC-excluded) -- pre-existing tree-wide, not a PR defect.

## PR #19142 (intl/pending-devcon-banner) -- 2026-08-21 -- Score 9.9/10
Scope: new `component-devcon-banner.json` (6 keys). Fleet avg 9.9.

**Fixed in this branch:**

- `Devcon` -> `ডেভকন` in `title` and `subtitle`. `logo-alt` stays Latin.

Form is **derived, not established**: Gemini 3.1 Pro asserted "Established. Tech media uses ডেভকন" at confidence High, and a search turned up no Bengali crypto-press usage to support that. The form itself is sound against the 6.1 bn rule (correct vowel modifier for the English "a", no a-to-o calque), so it shipped -- but log it as derived, pending native review.

**Notes:**

- Western numerals are correct here: 6.1 explicitly carves out UI elements from the native-Bengali-numerals-in-prose rule, and 7.5 says default conservative when the surface is ambiguous. The tree agrees (`src/intl/bn` is 4654 Western vs 225 native).

## PR #19326 (intl/pending-dev) -- 2026-09-28 -- Score 8.2/10

Scope: `developers/docs/accounts/index.md`, `smart-contracts/languages/index.md`, `smart-contracts/testing/index.md`, `src/intl/bn/page-apps.json`. 8 critical, 15 warnings. Brand 9/10 | Technical 8/10 | Semantic 9/10 | Consistency 7/10 | Tone 8/10. Fleet average 8.1 across 24 locales.

**Fleet-wide patterns (see known-patterns #79/#80):**

- Translated Geth/`clef` console output: bn affected on the full block; restored byte-exact from the English source. 17 of 24 locales hit.
- Whitehat parenthetical at `testing/index.md:245`: not affected.
- Bare-acronym over-expansion in `page-apps.json`: collapsed to the ETHGlossary short form.
- Trailing newline stripped at EOF by this run's writer; restored. Cosmetic only, no gate was checking it.

**Fixed in this branch (bn-specific):**

- `dapp` / `dApp` -> Latin per ETHGlossary, 3 sites including one link text

**Deliberately not fixed:**

- `কেক্যাক-২৫৬` / `লেয়ার ২` numeral conflict (issue #53), unresolved between the bn entry and the cross-cutting rule

**Notes:**

- A single-file `গুলো` -> `গুলি` dialect flip and an English `-s` plural on `অ্যাপ` in `page-apps.json` point the same direction as the acronym expansion; worth watching next run.



## PR #19357 (intl/pending-dev, full sweep) -- 2026-09-30 -- Score 8.4/10

Scope: full sweep, ~191-198 files. Sampled for idiom: largest prose diffs; glossary triage over scripted candidates restricted to changed lines.

**Fixed in this branch:**

- `page-find-wallet-private-transactions-desc` restored from the pre-rename `page-find-wallet-privacy-desc` value (shipped in English fleet-wide, known-patterns #81).
- privacy-online `vpn-relay-description` "hundreds of millions" -> `কয়েকশো মিলিয়ন` (was `কয়েক মিলিয়ন`).
- learn-quizzes `proof-of-stake-3-d-explanation` broken negation `পারে কক্ষনো না` -> `পারে না` (same family as `থাকেবিধা নেই`).

**Open (warnings):**

- `roadmap/privacy:120` `জিরো-নলেজ প্রুফগুলো` (alias) replaced compound `শূন্য-জ্ঞান প্রমাণ`.
- "both" dropped in Tor/Relay keys (#82); "time served" `পরিবেশন করা সময়`.

## PR #19474 (intl/pending-dev, /organizations namespaces) -- 2026-10-14 -- Score 8.2/10

Scope: full PR diff, ~27 files (8 new page-organizations*.json, common.json, small MD href/EIP updates). Label/meta acronym trim applied fleet-wide (known-patterns #86).

**Fixed in this branch:**

- `enterprise-privacy` `problems-fragility-description` database corruption rendered as bribery `দুর্নীতি` -> `নষ্ট হয়ে যাওয়া`.

**Open (warnings):**

- Visa/J.P. Morgan script switches between files; `আরবিট্রাম One` hybrid; `অনুমান` for speculation; `-গুলি`/`-গুলো` split across files.

## PR #19486 (intl/pending-dev, networks quarantine release) -- 2026-10-15 -- Score 9.4/10

- Fixed: stray U+2066/U+2069 isolates around `ETH` in description (LTR page).
- Open: `deprecated` -> `অবচয়িত` (depreciation sense) vs dev `বাতিলকৃত`, needs native check; bare "EVM networks" expanded (#80).

## PR #19556 (intl/pending-dev, run 39679413921) -- 2026-10-21 -- Score 8.1/10

Scope: 25 files (smart-contracts/security + app-plasma retranslations, prediction-markets, scam-token-tricks, new `page-wallet-descriptions` / `component-catalog-item`, founders/stories JSON).

**Fixed in this branch:**

- `page-founders-tag-{accelerator,events,mentorship}` restored from dev (#81)
- app-plasma:1216 dropped link (`ডেটার জন্য অনুরোধ করা হলে ভুল তথ্য` -> `ডেটার জন্য [অনুরোধ করা হলে](https://github.com/qbz`)
- app-plasma:966 Solidity always_latin (`সলিডিটি যাচাইকারী (solidity verifier)` -> `Solidity যাচাইকারী`)
- app-plasma:200 ETH always_latin (`মিলি-ইটিএইচ` -> `milliETH`)
- app-plasma:558 ETH always_latin (`ইটিএইচ এর` -> `ETH-এর`)

**Open (native call needed):**

- developers/tutorials/app-plasma/index.md:294: The text uses a hybrid of the bare "zero-knowledge" entry and a translated head noun. The glossary has a compound entry: `zk-proof` is `শূন্য-জ্ঞান প্রমাণ` (translate, confidence high). The rest of th (`জিরো-নলেজ প্রমাণের অংশ` -> `শূন্য-জ্ঞান প্রমাণের অংশ`)
- developers/tutorials/app-plasma/index.md:296: Same zk-proof hybrid, 3 occurrences on this line. Replace all of them. Flag for a human. (`জিরো-নলেজ প্রমাণের` -> `শূন্য-জ্ঞান প্রমাণের`)
- developers/tutorials/app-plasma/index.md:738: Same zk-proof hybrid. Flag for a human. (`জিরো-নলেজ প্রমাণের ভেতরে` -> `শূন্য-জ্ঞান প্রমাণের ভেতরে`)
- developers/tutorials/scam-token-tricks/index.md:462: DeFi is transliterated as a hybrid that is not in the glossary. The `decentralized-finance-defi` entry is "translate", and its ui/tag form is `DeFi` with note "Acronym preferred in all contexts". dev  (`ডিফাই (DeFi)` -> `DeFi`)
- 13 warnings in the PR review (see the PR #19556 review body).

**Summary:** Good fluency overall, with the prediction-markets rewrite reading well. The defects are concentrated in the full app-plasma retranslation, which regressed wording that was correct on dev, and in three founders tags that shipped in English after the key rename.

## PR #19568 (intl/pending-dev) -- 2026-10-22 -- Score 9.2/10
Scope: 6 repaired developer tutorials (hello-world, mint/view/write NFT series, sending-transactions, using-websockets), changed lines only. Scores are for the PR's initial state.

**Fixed in this branch:**

- Duplicated `json` response block in how-to-write-and-deploy-an-nft removed (known-patterns #93)
- Code-fence drift restored from English: `sh` tags, `npm install dotenv` (known-patterns #92)
- `transactions` concept tag restored to `ট্রানজ্যাকশন`; literal `\n` at the end of the description removed (sending)

**Notes:**

- Warnings: doubled ABI expansion (mint:38); `[Ethers plugin]` left untranslated; native and Western numerals mixed in part references. Glossary returns `(weth)` lowercase (#95).

## PR #19803 (intl/pending-dev) -- 2026-11-16 -- Score 9.6/10
Scope: 2 repaired developer tutorials (develop-and-test-dapps-with-a-multi-client-local-eth-testnet, how-to-use-echidna-to-test-smart-contracts), changed lines only. creating-a-wagmi-ui-for-your-contract was quarantined at the gate in all 24 locales (known-patterns #97). Scores are for the PR's initial state.

**Fixed in this branch:**

- None needed

**Open / notes:**

- echidna:682 dropped the two-space hard line break -- cosmetic
- Kurtosis labels (files artifacts, user services) mix Latin and transliteration -- defensible, informational

## PR #19901 (intl/pending-dev) -- 2026-11-25 -- Score 8.8/10
Scope: gas page, translation-program page, page-developers-index.json (3 files), changed lines only. Scores are for the PR's initial state.

**Fixed in this branch:**

- Gas page inline code spans restored to English (known-patterns #101 recurrence)

**Open / notes:**

- Glossary `transaction fee` = `লেনদেন ফি` conflicts with `transaction` = `ট্রানজ্যাকশন` in the glossary itself (gas:54); anglicism drift `ইনসেনটিভ`/`সার্কুলেশন`; `কমিটমেন্ট` used for non-cryptographic commitment.
- `page-developers-index.json` lost its final newline vs dev (matches en; cosmetic)
