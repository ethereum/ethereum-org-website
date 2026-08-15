# Vietnamese (vi) Translation Review Findings

## PR #18935 (intl/pending-content-translation-program-winddown-ctas) -- 2026-07-28 -- Score 8.4/10

First recorded review for this locale.

- **Tense (hand-fixed):** program page intro and "About" came back unmarked after the English present->past reframing. Fixed with `từng là` (line 7) and `đã` (line 25). Vietnamese marks past with optional particles, so tense-only English edits no-op unless `đã`/`từng` is added -- known-patterns #33. Note `đã nhằm mục đích` is correct but slightly stiff; a native editor would more likely recast as `hướng tới việc...` and let context carry the tense.
- **Meaning drift (left unfixed):** `contributing/index.md:15` reads `không còn tiếp nhận người dùng mới làm dịch giả` = "no longer accepting new *users* as translators"; English is "no longer onboarding new translators". Should be `dịch giả mới`.
- **Register:** `các tác phẩm của họ` for "their work" in the gratitude paragraph -- `tác phẩm` means artistic/literary works. `công sức` or `các bản dịch của họ` fits better.
- **Four renderings of "translator" across six files:** `dịch giả` (program page, page-collectibles), `người dịch` (get-involved), `người dùng mới làm dịch giả` (contributing), `biên dịch viên` (common.json). Worth settling on `dịch giả`.

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 8.4/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values` + full `scaling/plasma/index.md` retranslation.

**Fixed in this branch:**

- #42 `{#contract-accounts}` heading restored from the pre-PR blob
- #43 blank line before `{#validators-keys}` restored

**Open (native call needed):**

- **plasma:** `claim` flattened into the glossary form `yêu cầu nhận` where the sense is *assertion*, producing `một yêu cầu nhận định rằng` ("a request for assessment that"); should be `một khẳng định rằng`. The other use at L63 (claims to funds) is correct.
- **plasma:** `commitment scheme` -> `kế hoạch cam kết` ("commitment plan"); cryptographic `scheme` is `lược đồ`. `collation headers` -> `tiêu đề đối chiếu` ("comparison headers"); keep `collation`.
- **plasma:** load-bearing vocabulary split inside one fresh file — funds (`quỹ tiền` vs `tiền`/`số tiền`, 3 forms), malicious (`độc hại` vs `ác ý`), data unavailability (2), cryptographic proof (`chứng minh` vs `bằng chứng`), rollup (3 forms). `arbitrary users` -> `người dùng ngẫu nhiên` ("random users").
- **accounts:** `` Đây là cách hoạt động `CREATE` suy ra `` garden-paths, because `cách hoạt động` is the fixed idiom "how it works"; use `lệnh`/`toán tử`.
- #46 `các nút mật mã`; "shape its build" -> `định hình lối chơi` ("shape gameplay") loses the character-build sense.
- **Systemic, locale-wide:** ETHGlossary casing leaks mid-sentence capitals into Vietnamese prose (`Ví`, `Địa chỉ`, `Tài khoản`, `Bản cuộn`, `Chuỗi khối`, `Giao thức`). Fix at the glossary/prompt level, not per file.

**Notes:**

- `đúc Taruchi` for "mint" is glossary-correct (`mint => đúc`); brands intact.
- Zero ETHGlossary deviations across both files, verified against 60 plasma terms + 43 accounts terms, including the `zero-knowledge => không tri thức` vs `zero-knowledge proof => Bằng chứng không kiến thức` split and lowercase `l2`/`danksharding`.
- Tense-neutrality (#33) handled: `chưa được triển khai` carries "not yet".

## PR #19015 (intl/pending-dev) -- 2026-08-10 -- Score 8.4/10 (pre-fix)

- Scope: 11-12 files (8-9 markdown + common / learn-quizzes / page-what-is-ethereum JSON). Fleet avg 8.4.
- Dropped `[bản nâng cấp London]` and `[bản nâng cấp Pectra]` links restored. **Its historical untranslated-chunk failure mode was absent** (zero English prose found). Open: `exposure` -> `tiếp xúc` (physical contact) in 2 quiz keys where the article itself correctly uses `tiếp cận`; `client` rendered 3 ways across files.
- Fleet-wide items fixed in this branch for every locale: the `<p></p>` MDX build-breaker (8 locales), the `.pdf` autolink corruption (#50), the deleted `{#will-my-smart-contracts-change}` FAQ section (#32), the missing `<QuizWidget>` component (#49), and the two stale glamsterdam prose clauses (#51 -- `Q4 2026` and the stakers/liquidity sentence).

## PR #19076 (intl/find-wallet-translations) -- 2026-08-14 -- Score 9.2/10

Scope: `page-wallets-find-wallet.json` only -- 47 added keys (persona hero copy + a new `page-find-wallet-fee-*` disclosure cluster), 1 changed (`persona-legend` filter -> browse), 5 removed. Fleet avg 9.35.

**Fixed in this branch:**

- `get-wallet` `Tải {wallet}` -> `Nhận {wallet}` (critical: `Tải` = *download*. The CTA is unconditional in the wallet modal and links to `wallet.url`, and the page lists 7 hardware wallets carrying `device` fees -- Ledger, Trezor, Keystone, GridPlus Lattice1, Cypherock X1, Burner, imKey Pro -- so it read "Download Ledger Nano X" for a physical device you buy. vi's own corpus already had the right verb: `page-start.json` renders "Get wallet" as `Nhận ví`).

**Open (native call needed):**

- `fee-row-label` -> `Những gì bạn phải trả` = "what you must pay" (the amount); prefer `Bạn trả cho những gì`.
- `fee-label-shield-unshield` -> `che giấu` is *conceal/cover up*, used for concealing wrongdoing. The privacy sense survives but the valence is wrong (#57).
- `fee-qualifier-stablecoins-lower-l2` -> bare lowercase `các l2` vs the file's `Lớp 2` (#53).

**Notes:**

- Diacritics complete and correct throughout; vi's historical untranslated-chunk failure mode is absent.
