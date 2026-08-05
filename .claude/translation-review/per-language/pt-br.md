# Brazilian Portuguese (pt-br) Translation Review Findings

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 9.4/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values`.

**Fixed in this branch:**

- #42 `{#contract-accounts}` heading restored from the pre-PR blob
- #43 blank line before `{#validators-keys}` restored

**Open (native call needed):**

- #47 gatekeeper -> `intermediário` vs `guardião` in `page-values-faq-3-p1`. The `bloquear` -> `congelar` change in that same string is a **correct** fix for "freeze" and should be kept.
- "sealed auctions" -> `leilões selados` is a calque; pt-br convention is `leilões de lance fechado`.

**Notes:**

- The curly quotes on the new lines correctly mirror the English source; the file's straight-quote line 59 is the pre-existing outlier, so the new text needs no change.
- `cunha Taruchi` matches the site-wide `cunhar`/`cunhagem` rendering of NFT minting (7 other keys).
