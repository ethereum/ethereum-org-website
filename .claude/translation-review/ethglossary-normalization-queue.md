# ETHGlossary normalization queue

Defects in ETHGlossary's own term data, found while reviewing translation imports.

These matter more than per-file fixes: the pipeline treats ETHGlossary as authoritative, so a
defective entry is **re-injected on every future run**. Fixing the file is whack-a-mole; fixing the
entry stops it. Per the authority policy, translators and reviewers must follow the glossary even
when an entry looks wrong — so the only place these can be corrected is upstream.

Source: PR #19115 review + fix pass (24 locales, staking redesign). Earlier instances of the
casing/acronym class were logged as known-pattern #53 in PR #19076 and remain open.

## 1. Lowercased Latin acronyms inside translated compounds

The entry ships the acronym in lowercase, so it renders lowercase mid-sentence in shipped content.

| Locale | Entry | Ships | Should be |
| --- | --- | --- | --- |
| hi | `distributed validator technology (DVT)` | `वितरित सत्यापनकर्ता तकनीक (dvt)` | `(DVT)` |
| hi | `Go Ethereum (Geth)` | `गो इथेरियम (geth)` | `(Geth)` |
| hi, id, tr, ur, mr, bn, vi, ko, pt-br | `layer 2 (L2)` | `... (l2)` | `(L2)` |
| id, ur | `liquid staking token (LST)` | `token staking likuid (lst)` | `(LST)` |
| bn | `distributed validator technology (DVT)` | `... (dvt)` | `(DVT)` |
| ur | `Go Ethereum (Geth)` | `... (geth)` | `(Geth)` |

`layer 2 (L2)` alone accounts for thousands of shipped occurrences across the tree (see #53) —
worth fixing once rather than sweeping repeatedly.

## 2. Capitalized common nouns leaking mid-sentence

The entry is capitalized, so every MT pass inserts a capital in the middle of a sentence. Neither
language capitalizes common nouns.

| Locale | Entries shipping capitalized |
| --- | --- |
| vi | `address` -> `Địa chỉ`, `protocol` -> `Giao thức`, `account` -> `Tài khoản`, `chain` -> `Chuỗi`, `wallet` -> `Ví`, `liquidity` -> `Thanh khoản`, `governance` -> `Quản trị`, `epoch` -> `Kỷ nguyên`, `fork` -> `Phân nhánh`, `hash` -> `Mã băm`, `hash function` -> `Hàm băm` |
| id | `liquidity` -> `Likuiditas`, `epoch` -> `Epok` |
| ru | `address` -> `Адрес` |

This single vi cluster produced 15 mid-sentence capitals in one file in PR #19115.

## 3. Wrong script or spelling in the entry itself

| Locale | Entry | Problem |
| --- | --- | --- |
| te | `staking as a service` -> `ఒక సేవగా స్టాకింగ్` | `స్టాకింగ్` means *stacking*. Contradicts the locale's own `staking` -> `స్టేకింగ్` entry. Propagated into a page title and a nav label. |
| ur | `decentralized` -> `لامركزی` | Uses Arabic kaf U+0643 instead of Urdu keheh U+06A9 (`لامرکزی`). The adjacent `لامرکزیت` entry uses the correct character. |
| ur | `layer 2 (L2)`, `eth2` | Mandate Eastern-Arabic numerals (`۲`), which conflicts with the Western-numeral policy applied everywhere else and produces mixed digits in one phrase. |
| mr | `distributed validator technology (DVT)` | Uses `सत्यापनकर्ता` where the locale's `validator` entry is `सत्यापक`. |
| hi | `delegate` -> `प्रतिनिधि` | Noun ("representative"); the verb sense these pages need is `प्रत्यायोजित करना`. Sits inconsistently beside `delegation` -> `प्रत्यायोजन`. |
| hi | `eth2` -> `ईटीएच2` | Ticker-derived identifier; should stay Latin per the script rule. |

## 4. Missing entries that caused real translation errors

No entry means the model invents one, and it invented badly in these cases.

| Term | What happened |
| --- | --- |
| `cold storage` | it produced `celle frigorifere` — refrigerated cold rooms — in a key-custody sentence. |
| `externally owned account (EOA)` | fr produced `compte détenu par un tiers` ("held by a third party"), inverting the custody model. Also already live on `dev` in `developers/docs/accounts/index.md`. |
| `auth token` / JWT token | ta, zh, zh-tw all applied the crypto-`token` entry to the `jwtsecret` auth token (`வில்லை` / `代币` / `代幣`). Needs a distinct sense. |
| `slot` | zh has no entry, so `epoch` -> `时段` absorbed it and both units appear identically in one sentence. |
| `delegated staking` | The redesign makes this a primary nav label; no entry, so locales split (hi `डेलिगेटेड`/`प्रत्यायोजित`, ja `委任型`/`デリゲート`, uk, ta, bn, id all two-way). |
| `stablecoin` (tr) | Open since #18772; the `sabit coin` regression has now recurred three times because nothing upstream pins it. |
| `production` (deployment sense) | ru, uk, dvt pages rendered it as manufacturing (`производство`, `виробництво`). |
| `compromise` (security sense) | tr, zh, zh-tw, ur, mr, ta all reached for the negotiation sense (`uzlaşma`, `妥协`, `سمجھوتہ`, `तडजोड`, `சமரசம்`). A distinct entry would fix six locales at once. |

## 5. Internally inconsistent pairs

| Locale | Conflict |
| --- | --- |
| ar | `staking` -> `التخزين` vs `staking as a service` -> `التحصيص كخدمة`. Both surface on the same page. |
| mr | `mainnet` -> `मुख्यनेट` vs `Ethereum Mainnet` -> `इथरियम मेननेट`. |
| ta | `Ethereum` -> `எத்திரியம்` vs the `Ethereum Mainnet` compound -> `எத்தேரியம்`. |
| tr | `consensus client` -> `fikir birliği istemcisi` vs `consensus layer` -> `mutabakat katmanı`; the entry's own note concedes `mutabakat` is more common in technical docs. |
| sw | `client` -> `kiteja` (ki-/vi- class) but `consensus client` -> `mteja wa mwafaka` and `client diversity` -> `anuwai ya wateja` (m-/wa- animate class) | **The single worst entry conflict found.** Swahili noun class governs agreement on verbs, relatives, demonstratives and possessives, so these entries make the locale *impossible* to render consistently: any sentence naming both an execution and a consensus client must use mixed concord. The `consensus client` entry's own note concedes `mteja` means a human. Recommend `kiteja cha mwafaka` and `anuwai ya viteja`. Until then this defect will recur on every run -- it was already fixed once at 31 sites in #19015 and came back at ~85. |
| sw | `liquid staking token (LST)` -> `tokani ya uwekaji amana wenye ukwasi (lst)` | `tokani` conflicts with `token` -> `tokeni`; `amana` conflicts with `stake` -> `dhamana`; acronym lowercased. |
| sw | `staking as a service` -> `kuweka hisa kama huduma` | `hisa` (shares) conflicts with `stake` -> `dhamana` used everywhere else. |

## Priority

Sections 1 and 2 are mechanical and affect the most shipped text. Section 4's `compromise` and
`auth token` entries would each prevent errors in five or more locales. Section 3's te `స్టాకింగ్`
typo is the most visible single defect — it reached a page title.
