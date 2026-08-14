# Russian (ru) Translation Review Findings

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 8.4/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values` + full `scaling/plasma/index.md` retranslation.

**Fixed in this branch:**

- #43 blank line before `{#validators-keys}` restored
- `Таручи` -> `Taruchi` (23 of 24 locales keep the game-creature name Latin)

**Open (native call needed):**

- **plasma:** `collation headers` -> `заголовки сопоставления` (comparison/matching); should be `заголовки коллаций`. Mitigated by the retained English gloss.
- **plasma:** Mainnet split inside one file — 22 `основн* сет*` vs 6 `Мейннет`, the latter clustered in the sharding sections (L150/156/158). Both glossary-sanctioned; declension-sensitive, so left for a native call.
- **plasma:** spurious `(DA)` inserted twice where English has no abbreviation; `смарт-контракт Плазмы` vs `контракт Плазмы`; `его создатель` vs `производителей блоков`; 2 stray `ё` in an otherwise ё-less corpus (205 `ее` vs 1 `её` across `translations/ru/developers`); source-term glosses applied to 4 of ~12 quoted terms.
- #46 `шифроузлов`. `page-apps-gallery-screenshot-alt` needs the genitive: `Скриншот {index} приложения {appName}`, not `для {appName}`.
- #47 gatekeeper -> `посредник`; "shut down" and "freeze" both collapse to `заблокировать`.

**Notes:**

- **`чеканите` for mint is glossary-MANDATED** — the entry note says slang `минтить` is common but `чеканить` is preferred for official docs. Do not "fix" it.
- `виртуальной машиной Ethereum` is the glossary head form (`Виртуальная машина Ethereum (EVM)`), not a deviation; `Виртуальная машина Эфириума` is only an alias.
- The plasma retranslation is a genuine upgrade: the old version used non-glossary forms throughout (`офф-чейн`, `ролл-апы`, `обязательства по состоянию`, `вайтпейпер`) and was missing three heading anchors and one link.

## PR #19015 (intl/pending-dev) -- 2026-08-10 -- Score 9.6/10 (pre-fix)

- Scope: 11-12 files (8-9 markdown + common / learn-quizzes / page-what-is-ethereum JSON). Fleet avg 8.4.
- Highest score of the fleet. Only fix: restored the dropped `[Ethereum](/)` root link in `bridges/index.md`. Its agent correctly cleared several apparent defects as glossary-compliant (Мейннет vs основная сеть; создающего vs сборщик; Юнисвоп; Фейсбук) -- see #30/#20.
- Fleet-wide items fixed in this branch for every locale: the `<p></p>` MDX build-breaker (8 locales), the `.pdf` autolink corruption (#50), the deleted `{#will-my-smart-contracts-change}` FAQ section (#32), the missing `<QuizWidget>` component (#49), and the two stale glamsterdam prose clauses (#51 -- `Q4 2026` and the stakers/liquidity sentence).

## PR #19076 (intl/find-wallet-translations) -- 2026-08-14 -- Score 9.7/10

Scope: `page-wallets-find-wallet.json` only -- 47 added keys (persona hero copy + a new `page-find-wallet-fee-*` disclosure cluster), 1 changed (`persona-legend` filter -> browse), 5 removed. Fleet avg 9.35.

**Fixed in this branch:** none -- no critical issues.

**Open (native call needed):**

- `hardware-hero-description` -> two issues: the `while you hold` clause is dropped entirely, and `Инвестируете на долгий срок?` reframes holding as investing (#58).

**Notes:**

- Cleanest fee-value fragments in the fleet -- `варьируется`/`не разглашается`/`устанавливается провайдером` compose as VERBS and sidestep the gender-agreement problem every other inflected locale has (#54). Recommend this as the pattern.
- Plural branches verified correct: `Поддерживает` + one `1 сеть` (acc) / few `2 сети` (gen sg) / many `5 сетей` (gen pl).
- `уровень 2 (l2)` matches the pre-existing key in the same file; the lowercase is the #53 glossary artifact.
