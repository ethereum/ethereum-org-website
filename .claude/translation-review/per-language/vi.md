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
