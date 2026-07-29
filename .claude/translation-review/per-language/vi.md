# Vietnamese (vi) Translation Review Findings

## PR #18935 (intl/pending-content-translation-program-winddown-ctas) -- 2026-07-28 -- Score 8.4/10

First recorded review for this locale.

- **Tense (hand-fixed):** program page intro and "About" came back unmarked after the English present->past reframing. Fixed with `từng là` (line 7) and `đã` (line 25). Vietnamese marks past with optional particles, so tense-only English edits no-op unless `đã`/`từng` is added -- known-patterns #33. Note `đã nhằm mục đích` is correct but slightly stiff; a native editor would more likely recast as `hướng tới việc...` and let context carry the tense.
- **Meaning drift (left unfixed):** `contributing/index.md:15` reads `không còn tiếp nhận người dùng mới làm dịch giả` = "no longer accepting new *users* as translators"; English is "no longer onboarding new translators". Should be `dịch giả mới`.
- **Register:** `các tác phẩm của họ` for "their work" in the gratitude paragraph -- `tác phẩm` means artistic/literary works. `công sức` or `các bản dịch của họ` fits better.
- **Four renderings of "translator" across six files:** `dịch giả` (program page, page-collectibles), `người dịch` (get-involved), `người dùng mới làm dịch giả` (contributing), `biên dịch viên` (common.json). Worth settling on `dịch giả`.
