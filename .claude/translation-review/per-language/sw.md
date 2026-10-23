# Swahili (sw) -- Translation Review Findings

## PR #18772 (community-stories.json, 2026-07-10) -- 9.1/10
- CRIT fixed: passive-voice agency reversal in story-casio: "benki zote zilikataliwa maombi yangu" (banks WERE denied) -> "benki zote zilikataa maombi yangu" (banks denied my applications). Passive constructions are an inversion vector -- check polarity of passive renderings on every sw import.
- WARN: "took for granted" -> "tulivichukulia poa" (considered them cool) weakens the idiom (story-yamille).

## PR #18937 -- 2026-07-29 -- Score 7.8/10 pre-fix
- **The regeneration fixed a translated code identifier that was live on dev:** `nonsi` -> `nonce` inside the code example whose own caption reads "Non-translatable text". Note the tension -- ETHGlossary sw maps `nonce -> nonsi`, but that entry governs prose; a verbatim code span must stay English. Do not "correct" it back.
- It also retired the two-names-for-the-Program problem logged previously, consolidating `Mpango wa Utafsiri` -> `Programu ya Kutafsiri` on the resources page. One split survives: translators-guide still says `Programu ya Utafsiri` twice, including in a cross-ref label pointing at the page that now uses the other name.
- **Word-sense errors fixed:** `kambi ya maarifa` ("knowledge camp") for "knowledge base" -> dev's `kumbukumbu ya maarifa`; `Mada` ("topics") where English means article *titles* -> `Vichwa` (heading + body + the capitalization bullet); and `wazungumzaji bilioni 6 wasiozungumza Kiingereza` ("6 billion speakers who do not speak English", self-contradictory) -> `watu bilioni 6`. The correct `bilioni 6` numeral fix that landed alongside it was preserved.
- **Concord error fixed:** `inafanya` -> `hufanya`; the subject is the KU-infinitive `Kutumia namna rasmi...`, and habitual `hu-` takes no subject concord.
- **UNRESOLVED, needs a native speaker:** the semicolon term at translators-guide L237. dev had `nuktapeta`, this run produced `nuktapindu`, and the reviewer's recollection was `nuktamkato` -- none verifiable against an authoritative source. Left as-is deliberately rather than guessed at on a punctuation-terminology page.

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 9.0/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values`.

**Fixed in this branch:**

- #42 `{#contract-accounts}` heading restored from the pre-PR blob
- #43 blank line before `{#validators-keys}` restored

**Open (native call needed):**

- The PR's own three new zero-knowledge strings disagree: `maarifa-sifuri` (freedom-tool) vs `sifuri-maarifa` (semaphore, zkpdf). Site-wide canonical is `maarifa-sifuri` (28 hits incl. `glossary.json`); this file has settled on `sifuri-maarifa` (4 pre-existing).
- `mathibitisho ya maarifa-sifuri` where the site standard is `uthibitisho wa` (14 occurrences).
- #46 `nodi za usimbaji`. "freeze you" softened `kukufungia` -> `kukuzuia`, breaking the echo with `kukufungia nje` in the sibling censorship card. "in the meantime" -> `kwa wakati huo` ("at that time").

**Notes:**

- `"salt"` staying English beside `nonsi` is justified — ETHGlossary has `nonce -> nonsi` and no salt entry, and English scare-quotes both as coinages. No Swahilised-vs-untranslated collision found.
- The collateral reword of the 42-character sentence and the `page-values` rewrites are neutral-to-better, not regressions.

## PR #19015 (intl/pending-dev) -- 2026-08-10 -- Score 6.2/10 (pre-fix)

- Scope: 11-12 files (8-9 markdown + common / learn-quizzes / page-what-is-ethereum JSON). Fleet avg 8.4.
- Lowest score of the fleet. **`client` (software) rendered `mteja` (customer) in 31 sites across 8 files**, where ETHGlossary mandates `kiteja`/`viteja`; two files got it right in one line and wrong in the next. All fixed with noun-class concord. Four dropped fork links (Berlin/London/Dencun/Pectra) restored. Open: `trade-off` conflated with `swap` (`mabadilishano`) in 3 sites -- native call.
- Fleet-wide items fixed in this branch for every locale: the `<p></p>` MDX build-breaker (8 locales), the `.pdf` autolink corruption (#50), the deleted `{#will-my-smart-contracts-change}` FAQ section (#32), the missing `<QuizWidget>` component (#49), and the two stale glamsterdam prose clauses (#51 -- `Q4 2026` and the stakers/liquidity sentence).

## PR #19076 (intl/find-wallet-translations) -- 2026-08-14 -- Score 9.4/10

Scope: `page-wallets-find-wallet.json` only -- 47 added keys (persona hero copy + a new `page-find-wallet-fee-*` disclosure cluster), 1 changed (`persona-legend` filter -> browse), 5 removed. Fleet avg 9.35.

**Fixed in this branch:** none -- no critical issues.

**Open (native call needed):**

- `meta-description-fallback` -> `Mkoba wa Ethereum ... **Inasaidia**`; `mkoba` is class 3 and takes `u-`, so `Unasaidia`. Same slip exists in pre-existing `methodology-criterion-*` strings, so it is a locale habit -- but this key is new. Meta-description only, no on-page impact.
- `fee-label-shield-unshield` -> `kukinga` is to ward off physically; this is the terminology-invention risk the KB predicts for sw. Recommend keeping `shield/unshield` as id did (#57).
- `fee-free-tier-plans` -> `{value}/kwa mwezi` renders "$399.99/per month"; should be `{value}/mwezi` (the sibling `-per-card` already uses bare `{value}/kadi`).
- `crops-private` -> `Ya faragha` is a headless genitive used as a row label; prefer the file's own noun `Faragha`. `Inayostahimili udhibiti` has the same shape but is the exact glossary form -- leave it.

**Notes:**

- Zero glossary deviations across all 14 terms, notable given sw's thin precedent. None of the `mteja`/`kiteja` errors from PR #19015 recur. The ICU plural class change (`mtandao`/`mitandao`) is handled correctly.
- Latent #54 risk: `imewekwa`/`haijawekwa wazi`/`inabadilika` carry class-9 concord for `Ada`; a future `device` (class 7 `Kifaa`) + text value would need `hakijawekwa wazi`.

## PR #19115 -- staking redesign (6 MD + 1 JSON), 2026-08-19

**Score: 5.6/10** (fleet avg 7.8 -- lowest recorded in this series; the gap is structural, not linguistic)

Lowest in the fleet. Software `client` rendered `mteja` (animate = customer) at ~85 sites across 5 files -- 2.7x the 31 sites fixed in #19015. CRITICAL NUANCE: ETHGlossary itself mandates `mteja wa mwafaka` for consensus client and `anuwai ya wateja` for client diversity, so 27 hits were correct and a blind sweep would corrupt them. Also `zawadi` (free gift) for reward, `Inayoaminika` inverting a Trustless warning, `Badilishano` (the swap) as subject of custody sentences, a self-sovereign/solo tautology, and a malformed `Pedi ya Kuzindulia Uwekezaji Dhamana` for Staking Launchpad.

Fleet-wide defects also present in this locale (see known-patterns #60-64): heading-anchor rotation in `run-a-node`, reverted `<Card title>` attributes, untranslated image alt text, and the `</ExpandableCard>` -> `</ButtonLink>` MDX breaker. All repaired in this PR.

## PR #19034 (intl/pending-dev) -- 2026-08-20 -- Score 7.8/10
Scope: new `page-open-source.json` (228 keys) + retranslated `community/research/index.md`, plus 3 single-key JSON changes. Fleet avg 8.67, median 8.80.
**Fixed in this branch:**
- AI prompt-card fill-in blanks (`[app]`, `[my device]`, `[my system]`, `[this]`, `[this error]`, `[App]`) translated -- they were shipped as verbatim English.
- `Robust Incentives Group` restored to English at 5 sites -- the name had been semantically translated with no English retained, making the EF team unsearchable.

- `ilishindwa mahakamani` ("was defeated in court") -> `ilipatikana`. Swept all 24 -- sw was the ONLY locale to invert "the right to publish encryption software was won in court".
- `kudharau` (despise) for "deprecate" -> `kuuondoa katika matumizi`.
- `kuuza nje` (sell abroad) for data "export" -> `kuhamisha data nje`.
- `### Wateja wa Utekelezaji` -> `Viteja vya Utekelezaji`: the animate/customer form for software clients, against the glossary note. Recurrence of sw's #1 defect class (PRs #19015, #19115).

**Open (native call needed):**

- `kifaa cha majaribio` for "test harness" (device/apparatus).
- `madaraja` for "classes" collides with `madaraja` = bridges in the same file.
- `au kuendelea` ("or continues") for "or moves on" -- near-opposite.
- Glossary entries wanted for `custodial`/`locally`/`derivatives` (`viingilio` = "entrance fees" is tree-established but semantically wrong).

## PR #19326 (intl/pending-dev) -- 2026-09-28 -- Score 7.0/10

Scope: `developers/docs/accounts/index.md`, `smart-contracts/languages/index.md`, `smart-contracts/testing/index.md`, `src/intl/sw/page-apps.json`. 3 critical, 20 warnings. Brand 8/10 | Technical 6/10 | Semantic 6/10 | Consistency 7/10 | Tone 8/10. Fleet average 8.1 across 24 locales.

**Fleet-wide patterns (see known-patterns #79/#80):**

- Translated Geth/`clef` console output: sw affected on the full block; restored byte-exact from the English source. 17 of 24 locales hit.
- Whitehat parenthetical at `testing/index.md:245`: not affected.
- Bare-acronym over-expansion in `page-apps.json`: collapsed to the ETHGlossary short form.
- Trailing newline stripped at EOF by this run's writer; restored. Cosmetic only, no gate was checking it.

**Fixed in this branch (sw-specific):**

- cryptographic `"salt"` rendered `chumvi`, the edible kind -> restored to English `"salt"` per PR #18942's decision; no glossary entry exists and English scare-quotes it as a coinage
- "manual" rendered `mwongozo` (= *a guide*) at 16 sites, worst at "difficult to carry out **by guide**" -> `mikono`. The 5 plural `miongozo` ("guidelines") and 3 capitalized `Mwongozo` link labels were deliberately left; the strings share no substring so no match was possible

**Notes:**

- The report claimed the missing trailing newline would fail Prettier. It would not: `format` covers only `js/jsx/ts/tsx`, lint-staged runs prettier on the same set, `lint:md` excludes translations, and ci.yml has no prettier job.
- `mteja wa Ethereum` at `accounts/index.md:79` is glossary-sanctioned per PR #19115. Do not sweep it to `kiteja`.



## PR #19357 (intl/pending-dev, full sweep) -- 2026-09-30 -- Score 7.8/10

Scope: full sweep, ~191-198 files. Sampled for idiom: largest prose diffs; glossary triage over scripted candidates restricted to changed lines.

**Fixed in this branch:**

- `page-find-wallet-private-transactions-desc` restored from the pre-rename `page-find-wallet-privacy-desc` value (shipped in English fleet-wide, known-patterns #81).
- open-access `wakala wa kifedha` (agent/broker, inverts "financial agency") -> `uhuru wa kujiamulia kifedha` (native check welcome).
- learn-quizzes staking pool `makusanyiko` -> `mabwawa`; page-resources `shughuli za mtumiaji` -> `operesheni za mtumiaji`; fusaka:256 `Waundaji` -> `Wajenzi` (regression).

**Open (warnings):**

- stealth-addr swapped all 21 `kitendaji` for `fomula` -- revert recommended (tree 164:47).
- Bare `mteja` for software client recurs in new sentences; glamsterdam:20 `Blobs` kept Latin in quoted track name.

## PR #19474 (intl/pending-dev, /organizations namespaces) -- 2026-10-14 -- Score 8.6/10

Scope: full PR diff, ~27 files (8 new page-organizations*.json, common.json, small MD href/EIP updates). Label/meta acronym trim applied fleet-wide (known-patterns #86).

**Fixed in this branch:**

- `small-business` stealth address `Anwani za siri` -> `Anwani fiche`; smart account `Akaunti mahiri` -> `Akaunti janja`; `enterprise-l2s` `kificho` -> `kriptografia`.

**Open (warnings):**

- client rendered as customer (`Wateja`, `Mteja`) recurs; needs glossary ruling (execution client = kiteja, consensus client = mteja conflict).
- enterprise and business pathway titles collide (`Ethereum kwa biashara`).

## PR #19486 (intl/pending-dev, networks quarantine release) -- 2026-10-15 -- Score 9.0/10

- Fixed: brand `Chain Platform` translated as `Jukwaa la Chain` (L54, L83).
- Open: "development" `maendeleo` -> `usanidi` (reads as configure/setup), needs native check; "scaling" `kuongeza ukubwa` weaker than dev `kuongeza uwezo`.

## PR #19556 (intl/pending-dev, run 39679413921) -- 2026-10-21 -- Score 8.4/10

Scope: 25 files (smart-contracts/security + app-plasma retranslations, prediction-markets, scam-token-tricks, new `page-wallet-descriptions` / `component-catalog-item`, founders/stories JSON).

**Fixed in this branch:**

- `page-founders-tag-{accelerator,events,mentorship}` restored from dev (#81)
- app-plasma:828 at most -> at least inversion (`ni angalau dakika moja` -> `si zaidi ya dakika moja`)
- app-plasma:1186 call = phone call (`Piga simu kwa mkataba wa mhakiki` -> `Ita mkataba wa mhakiki`)
- page-wallet-descriptions.json:39 multicall = many phones (`simu nyingi (multicall)` -> `miito mingi (multicall)`)
- app-plasma:115 glossary hyphen (`Sifuri maarifa ya mikono` -> `Sifuri-maarifa ya mikono`)

**Open (native call needed):**

- page-wallet-descriptions.json:33: ETHGlossary `blockchain` = `mnyororo wa vitalu`. `minyororo ya kuzuia` means "chains of blocking/preventing" (trust-wallet) (`minyororo mingi ya kuzuia` -> `minyororo mingi ya vitalu`)
- page-wallet-descriptions.json:35: Same `blockchain` deviation (gem-wallet) (`minyororo mingi ya kuzuia` -> `minyororo mingi ya vitalu`)
- page-wallet-descriptions.json:42: Same `blockchain` deviation (edge-wallet) (`minyororo ya kuzuia` -> `minyororo ya vitalu`)
- page-wallet-descriptions.json:23: ETHGlossary `private key` = `ufunguo wa siri` (ledger) (`funguo zako za faragha` -> `funguo zako za siri`)
- developers/tutorials/app-plasma/index.md:1186: ETHGlossary `revert` = `tengua`. `hurejesha` reads as "returns" (`hurejesha muamala` -> `hutengua muamala`)
- developers/tutorials/app-plasma/index.md:22: ETHGlossary `Merkle proof` = `ushahidi wa Merkle` (37 site uses vs 3 of this form) (`kutoa uthibitisho wa Merkle` -> `kutoa ushahidi wa Merkle`)
- 19 warnings in the PR review (see the PR #19556 review body).

**Summary:** The new prediction-markets, founders and wallet-description content reads fluently and follows the glossary for brands. The app-plasma retranslation made one meaning reversal and a "phone call" regression, and the wallet descriptions brought in a wrong blockchain term; these need fixing before merge.
