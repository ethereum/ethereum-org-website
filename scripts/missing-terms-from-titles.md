# Missing Glossary Terms Found in Content Titles and Body

Generated: 2026-03-26
Method: Scanned 264 markdown files in `public/content/` (excluding translations),
extracting frontmatter titles, H2/H3 headings, and body text occurrences.
Cross-referenced against 455 confirmed terms in `glossary-terms-enhanced.json`.

---

## 1. Named Protocol Upgrades (NOT in glossary)

These are Ethereum hard fork / upgrade names that have dedicated content pages
but no glossary entry. Translators will encounter these frequently and need guidance
on whether to transliterate or keep Latin.

| Term | Occurrences | Files | Source |
|------|------------|-------|--------|
| **Pectra** | 76 | 9 | `public/content/roadmap/pectra/index.md` |
| **Prague-Electra** | (alias of Pectra) | -- | `public/content/roadmap/pectra/index.md` |
| **Fusaka** | 68 | 4 | `public/content/roadmap/fusaka/index.md` |
| **Fulu-Osaka** | (alias of Fusaka) | -- | `public/content/roadmap/fusaka/index.md` |
| **Glamsterdam** | 46 | 3 | `public/content/roadmap/glamsterdam/index.md` |
| **Dencun** | 39 | 11 | `public/content/roadmap/dencun/index.md` |
| **Shapella** | 12 | 4 | `public/content/ethereum-forks/index.md` |

Note: The glossary has `dencun upgrade` and individual names like `shanghai`,
`berlin`, `byzantium`, `constantinople`, `istanbul`, `cancun`, but NOT the
combined portmanteau names Pectra/Fusaka/Glamsterdam/Shapella nor their
full dual-city names.

---

## 2. Protocol and Algorithm Names

Core protocol components with dedicated pages or significant content presence.

| Term | Occurrences | Files | Source |
|------|------------|-------|--------|
| **Gasper** | 27 | 7 | `public/content/developers/docs/consensus-mechanisms/pos/gasper/index.md` |
| **PeerDAS** | 31 | 3 | `public/content/roadmap/fusaka/peerdas/index.md` |
| **zkEVM** | 66 | 6 | `public/content/roadmap/zkevm/index.md` |
| **Dagger-Hashimoto** | 24 | 4 | `public/content/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/index.md` |
| **devp2p** | 29 | 5 | `public/content/developers/docs/networking-layer/index.md` |
| **libp2p** | 17 | 3 | `public/content/developers/docs/networking-layer/index.md` |
| **discv5** | 10 | 1 | `public/content/developers/docs/networking-layer/index.md` |
| **MEV-boost** | 16 | 2 | `public/content/developers/docs/mev/index.md` |

---

## 3. Technical Concepts (page-title level)

Terms that serve as the primary title of a content page, indicating they are
significant concepts that translators must handle.

| Term | Source Page | Translation Concern |
|------|-----------|-------------------|
| **single slot finality** | `public/content/roadmap/single-slot-finality/index.md` | "Slot" is protocol jargon; "finality" already in glossary but compound isn't |
| **secret leader election** | `public/content/roadmap/secret-leader-election/index.md` | Three common words with specific protocol meaning together |
| **state expiry** | `public/content/roadmap/statelessness/index.md` | Referenced in title alongside "statelessness" and "history expiry" |
| **history expiry** | `public/content/roadmap/statelessness/index.md` | Same page; distinct concept from state expiry |
| **weak subjectivity** | `public/content/developers/docs/consensus-mechanisms/pos/weak-subjectivity/index.md` | Abstract concept; hard to translate accurately |
| **formal verification** | `public/content/developers/docs/smart-contracts/formal-verification/index.md` | Mathematical concept applied to smart contracts |
| **client diversity** | `public/content/developers/docs/nodes-and-clients/client-diversity/index.md` | Important principle; "diversity" has many translations |
| **proof-of-authority (PoA)** | `public/content/developers/docs/consensus-mechanisms/poa/index.md` | Consensus mechanism not in glossary |
| **Portal Network** | `public/content/developers/docs/networking-layer/portal-network/index.md` | Proper noun protocol name |
| **MaxEB** | `public/content/roadmap/pectra/maxeb/index.md` | Max Effective Balance - Pectra feature |
| **stealth address** | `public/content/developers/tutorials/stealth-addr/index.md` | Privacy concept; 11 occurrences across 2 files |
| **withdrawal credentials** | `public/content/developers/docs/consensus-mechanisms/pos/withdrawal-credentials/index.md` | Staking term; 8 occurrences in 2 files |
| **data availability sampling** | Body text, not a title | 18 occurrences in 6 files; the glossary has "das" and "data availability" but not the full phrase |
| **erasure coding** | Body text | 6 occurrences in 2 files; key DAS/PeerDAS concept |
| **execution payload** | Body text | 15 occurrences in 8 files; block component term |
| **beacon block** | Body text | 12 occurrences in 7 files; distinct from "beacon chain" |

---

## 4. EIPs Referenced as Page Topics

Specific EIPs that are page titles or have significant content presence.

| Term | Occurrences | Files | Source |
|------|------------|-------|--------|
| **EIP-7702** | 33 | 5 | `public/content/roadmap/pectra/7702/index.md` |
| **EIP-1271** | 31 | 2 | `public/content/developers/tutorials/eip-1271-smart-contract-signatures/index.md` |
| **EIP-7251** | 7 | 3 | `public/content/roadmap/pectra/index.md` (MaxEB EIP) |
| **EIP-7594** | 5 | 3 | `public/content/roadmap/fusaka/peerdas/index.md` (PeerDAS EIP) |
| **EIP-7691** | 4 | 2 | `public/content/roadmap/pectra/index.md` (blob count increase) |
| **ERC-6900** | 4 | 1 | `public/content/roadmap/pectra/7702/index.md` (modular smart accounts) |

---

## 5. Token Standards Missing from Glossary

The glossary has ERC-20, ERC-721, ERC-1155, ERC-4337, and ERC-4626.
These standards have dedicated pages but no glossary entry:

| Term | Source |
|------|--------|
| **ERC-777** | `public/content/developers/docs/standards/tokens/erc-777/index.md` |
| **ERC-223** | `public/content/developers/docs/standards/tokens/erc-223/index.md` |
| **ERC-1363** | `public/content/developers/docs/standards/tokens/erc-1363/index.md` |

---

## 6. Execution Client Names

These are proper nouns for Ethereum execution layer client implementations.
Each appears extensively throughout the docs and would confuse translators
without guidance. The glossary has `go ethereum (geth)` but none of the others.

| Term | Occurrences | Files | Notes |
|------|------------|-------|-------|
| **Geth** | 148 | 23 | Already in glossary as "go ethereum (geth)" -- but "Geth" alone may deserve its own entry for lookup |
| **Nethermind** | 45 | 10 | .NET-based execution client |
| **Erigon** | 40 | 10 | Go-based execution client |
| **Besu** | 37 | 10 | Java-based execution client (Hyperledger) |
| **Reth** | 34 | 7 | Rust-based execution client |

---

## 7. Consensus Client Names

Same issue as execution clients -- proper noun software names.

| Term | Occurrences | Files |
|------|------------|-------|
| **Lighthouse** | 48 | 11 |
| **Prysm** | 31 | 9 |
| **Teku** | 31 | 8 |
| **Lodestar** | 30 | 7 |
| **Nimbus** | 26 | 8 |

---

## 8. Developer Tooling and External Projects

Proper names for tools/protocols that appear frequently in content.
The glossary has Hardhat, Foundry, Remix, Vyper, Solidity. These are missing:

| Term | Occurrences | Files | Notes |
|------|------------|-------|-------|
| **MetaMask** | 198 | 22 | Most-mentioned missing term; wallet software |
| **OpenZeppelin** | 189 | 30 | Smart contract library/framework |
| **Slither** | 179 | 9 | Static analysis tool |
| **Echidna** | 133 | 6 | Fuzzing tool |
| **Manticore** | 119 | 9 | Symbolic execution tool |
| **Uniswap** | 109 | 16 | DEX protocol |
| **The Graph** | 36 | 9 | Indexing protocol |
| **Chainlink** | 16 | 5 | Oracle network |
| **Tellor** | 27 | 2 | Oracle protocol |

---

## 9. Additional Technical Concepts from "What is X?" Headings

Terms found as subjects of "What is/are X?" headings in the content,
suggesting they are important enough to warrant explanation:

| Term | Source |
|------|--------|
| **nothing-at-stake problem** | `public/content/developers/docs/consensus-mechanisms/pos/faqs/index.md` |
| **oracle problem** | `public/content/developers/docs/oracles/index.md` |
| **social slashing** | `public/content/developers/docs/consensus-mechanisms/pos/faqs/index.md` |
| **stake grinding** | `public/content/developers/docs/consensus-mechanisms/pos/faqs/index.md` |
| **home staking** | `public/content/staking/solo/index.md` |
| **source code verification** | `public/content/developers/docs/smart-contracts/verifying/index.md` |
| **witness** (Verkle context) | `public/content/roadmap/verkle-trees/index.md` |
| **Yul** (and Yul+) | `public/content/developers/docs/smart-contracts/languages/index.md` |
| **Kurtosis** | `public/content/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/index.md` |

---

## 10. Low-frequency but Translation-Critical Terms

These terms appear in few files but are protocol-specific and would be
particularly difficult for translators:

| Term | Occurrences | Files | Notes |
|------|------------|-------|-------|
| **state trie** | 12 | 7 | Core data structure term |
| **storage trie** | 6 | 2 | Core data structure term |
| **blob fee** | 6 | 2 | EIP-4844 concept |
| **BLS signature** | 4 | 4 | Cryptographic signature type used in PoS |
| **avalanche attack** | 4 | 1 | PoS attack vector |
| **bouncing attack** | 1 | 1 | PoS attack vector |
| **reorg** (reorganization) | 26 | 9 | Chain reorganization; very common in PoS discussions |
| **proposer boost** | (in content) | -- | LMD-GHOST mechanism |

---

## Summary Statistics

- **Total unique missing terms identified: ~75**
- **High priority (>30 occurrences, page-level concepts): ~25**
- **Medium priority (10-30 occurrences or dedicated pages): ~25**
- **Lower priority (niche but translation-critical): ~25**

### Recommended Priority for Glossary Addition

**Tier 1 -- Immediately needed** (have dedicated content pages AND high occurrence):
1. Pectra / Prague-Electra
2. Fusaka / Fulu-Osaka
3. Glamsterdam
4. Gasper
5. PeerDAS
6. zkEVM
7. single slot finality
8. proof-of-authority (PoA)
9. formal verification
10. EIP-7702

**Tier 2 -- Important for translator guidance** (proper nouns, tools):
1. MetaMask
2. OpenZeppelin
3. Uniswap
4. The Graph
5. Nethermind, Besu, Erigon, Reth (execution clients)
6. Lighthouse, Prysm, Teku, Lodestar, Nimbus (consensus clients)
7. ERC-777, ERC-223, ERC-1363

**Tier 3 -- Valuable for completeness** (body-text concepts):
1. Dagger-Hashimoto
2. Shapella / Dencun (combined upgrade names)
3. secret leader election
4. weak subjectivity
5. data availability sampling
6. MEV-boost
7. execution payload
8. stealth address
9. devp2p, libp2p
10. MaxEB, withdrawal credentials, state expiry, history expiry
