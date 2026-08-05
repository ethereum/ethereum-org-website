# German (de) Translation Review Findings

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 9.2/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values`.

**Fixed in this branch:**

- #43 blank line before `{#validators-keys}` restored

**Open (native call needed):**

- `app-kohaku-description` renders "builders" as `Ersteller`, which collides with this file's own `Entwickler` (2x) and with the site's `Ersteller` = "Creator" (`page-apps-info-creator`).
- `app-zkpassport-description` "human verification" -> `Verifizierung der Menschlichkeit`; `Menschlichkeit` is humaneness. Sibling `app-proof-of-humanity-description` correctly uses `menschliche Identität`.
- #45 `kostenlosesten`; same string has `mit dem Web3` where German convention is `mit Web3`.

**Notes:**

- The two reworded `page-values` strings improve the file's Sie register (`die man nicht überprüfen kann` -> `die Sie nicht überprüfen können`).
- The `du` forms in the new game/consumer blurbs match the file's established split (games/consumer = du, DeFi/enterprise = Sie) — not an intra-file inconsistency.
