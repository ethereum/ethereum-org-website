# it Translation Review Findings

## PR #18925 (privacy roadmap + 2 video transcripts) -- 2026-07-27 -- 9.7/10

**Fixed (critical):** `Cifratura Completamente Omoforma` -> `Omomorfa` (`roadmap/privacy` L96). "Omoforma" is not an Italian word; the term derives from *omomorfismo*. Not a glossary entry (FHE is absent from ETHGlossary), so this is an accuracy defect the glossary layer cannot catch — it appeared on a boldfaced defined term.

**Not fixed (warning):** L78 of the FOCIL transcript mirrors an English double negative through Italian's mandatory expletive-`non` after `a meno che`; literally correct but ambiguous to a native reader. Needs a native call, not a mechanical fix.

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 9.4/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values`.

**Fixed in this branch:**

- #43 blank line before `{#validators-keys}` restored

**Open (native call needed):**

- #47 gatekeeper -> `intermediario`, which this file already uses for "middleman"; `page-values-faq-3-p1` keeps `guardiano`.
- `page-values-internet-list-privacy` breaks person/number: impersonal plural `essere esclusi ... visti` then singular `tua`/`bloccarti` in the same sentence.
- Stacked `per … per` in `app-fileverse-description` and `app-kohaku-description` reads as a parse error.

**Notes:**

- `coni Taruchi` for "mint" reads as coin-minting in isolation but matches all seven existing `coniare`-for-mint renderings in this file, so it was not flagged.
