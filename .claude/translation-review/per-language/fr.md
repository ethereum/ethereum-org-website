# French (fr) Translation Review Findings

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 9.0/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values`.

**Fixed in this branch:**

- #42 `{#contract-accounts}` heading restored from the pre-PR blob
- #43 blank line before `{#validators-keys}` restored
- `frappez Taruchi` -> `frappez le NFT Taruchi` (critical: `frapper` + a bare proper noun parses as "you **hit** Taruchi"; every other `frapper` in that file has an explicit NFT/token object)

**Open (native call needed):**

- #46 `ciphernodes` -> `nœuds de chiffrement`.
- #47 gatekeeper -> `intermédiaire` vs `gardien` in `page-values-faq-3-p1`.
- "human verification" -> `vérification humaine` reads as verification *performed by* a human.

**Notes:**

- **Do not "fix" « sel » for salt.** It is the established French cryptography term (fr.wikipedia *Sel (cryptographie)*, "salage"), and the scare quotes mirror English, marking it as a term of art.
