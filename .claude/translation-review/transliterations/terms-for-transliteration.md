# Terms Requiring Transliteration for Non-Latin Scripts

> Generated from Hindi PR #17101 review (2026-03-16).
> Pass this to Gemini to generate transliteration tables for each non-Latin language.
>
> Target languages: hi, mr, bn, ta, te, ar, ur, ru, uk, ja, ko, zh, zh-tw

## Instructions for Gemini

For each term below, provide the standard phonetic transliteration in ALL of
the target non-Latin-script languages listed above. Return as a CSV or
markdown table with columns: English | hi | mr | bn | ta | te | ar | ur | ru | uk | ja | ko | zh | zh-tw

Rules:
- Use the locally accepted/established spelling where one exists
- For person names, prioritize phonetic accuracy
- For brand names, use the transliteration most commonly seen in tech media
- Pseudonyms (GitHub handles) should NOT be transliterated -- mark as "N/A"
- Ticker symbols (ETH, BTC, ERC, EIP) should NOT be transliterated -- mark as "N/A"

---

## 1. Person Names -- Authors

| English | Notes |
|---------|-------|
| Ori Pomerantz | Tutorial author (~18 files) |
| Elan Halpern | Tutorial author |
| Marc Garreau | Tutorial author |
| Nathan H. Leung | Tutorial author |
| Paul Apivat | Tutorial author |
| Alberto Cuesta Canada | Tutorial author |
| Sumi Mudgil | Tutorial author |
| Mario Havel | Tutorial author |
| Markus Waas | Tutorial author |
| Ewa Kowalska | Tutorial author |
| Kim YongJun | Tutorial author |
| Daniel Izdebski | Tutorial author |
| Tedi Mitiku | Tutorial author |

Pseudonyms (do NOT transliterate): jdourlens, nstrike2, elanh, MiZiet,
qbzzt, smudgil, EthereumOnArm

## 2. Person Names -- Referenced in Content

| English | Notes |
|---------|-------|
| Vitalik Buterin | Ethereum co-founder (very high frequency) |
| Gavin Wood | Ethereum co-founder |
| Joseph Lubin | Ethereum co-founder |
| Tim Beiko | Ethereum core dev |
| Peter Szilagyi | Geth developer |
| Jeffrey Wilcke | Ethereum co-founder |
| Mihai Alisie | Ethereum co-founder |
| Anthony Di Iorio | Ethereum co-founder |
| Amir Chetrit | Ethereum co-founder |
| Charles Hoskinson | Ethereum co-founder |
| Albert Einstein | Referenced in educational content |

## 3. Programming Languages

| English | Notes |
|---------|-------|
| Solidity | Smart contract language (~60+ files) |
| Vyper | Smart contract language (~15 files) |
| Rust | Systems language (~12 files) -- NOTE: "Rust" must NOT be translated as "corrosion" |
| JavaScript | (~20 files) |
| TypeScript | (~10 files) |
| Python | (~20 files) |
| Go / Golang | (~15 files) |
| Java | (~5 files) |
| Ruby | (~5 files) |
| Elixir | (~5 files) |
| Dart | (~4 files) |
| Delphi | (~2 files) |
| C++ | (~3 files) |
| .NET | (~5 files) |

## 4. Developer Tools and Frameworks

| English | Notes |
|---------|-------|
| Hardhat | Development framework (~20 files) |
| Foundry | Development framework (~15 files) |
| Remix | IDE (~10 files) -- NOTE: not the music term |
| Truffle | Development framework (~8 files) |
| Waffle | Testing framework (~5 files) -- NOTE: not the food |
| Brownie | Python framework (~3 files) -- NOTE: not the food |
| Scaffold-ETH | Starter kit (~5 files) |
| Wagmi | React hooks library (~20 files) |
| Ethers.js | JS library (~30 files) |
| Web3.js | JS library (~20 files) |
| Web3.py | Python library (~10 files) |
| Viem | TS library (~5 files) |
| React | UI framework (~15 files) |
| Next.js | React framework (~5 files) |
| Node.js | Runtime (~8 files) |
| RainbowKit | Wallet UI (~5 files) |
| WalletConnect | Wallet protocol (~5 files) |

## 5. Node / Infrastructure Software

| English | Notes |
|---------|-------|
| Geth | Go-Ethereum client (~20 files) |
| Prysm | Consensus client (~10 files) |
| Lighthouse | Consensus client (~10 files) -- NOTE: not the building |
| Teku | Consensus client (~8 files) |
| Nimbus | Consensus client (~8 files) -- NOTE: not the cloud |
| Lodestar | Consensus client (~8 files) -- NOTE: not the star |
| Besu | Execution client (~8 files) |
| Nethermind | Execution client (~8 files) |
| Erigon | Execution client (~8 files) |
| Reth | Execution client (~3 files) |
| IPFS | Decentralized storage (~15 files) |
| Filecoin | Storage network (~5 files) |
| Arweave | Storage network (~3 files) |

## 6. Companies / Organizations

| English | Notes |
|---------|-------|
| Ethereum Foundation | (~30 files) |
| ConsenSys | (~10 files) |
| Alchemy | (~15 files) -- NOTE: not the medieval science |
| Infura | (~12 files) |
| Chainlink | (~15 files) |
| OpenZeppelin | (~15 files) |
| Gnosis | (~8 files) -- NOTE: not the philosophical term |
| Flashbots | (~8 files) |
| Trail of Bits | Security firm (~8 files) |
| Tellor | Oracle provider (~12 files) |
| EigenLayer | Restaking protocol (~5 files) |
| Moralis | (~5 files) |
| Gitcoin | (~2 files) |
| Dune Analytics | (~5 files) |
| CoinGecko | (~3 files) |

## 7. Protocols / DeFi / dApps

| English | Notes |
|---------|-------|
| Uniswap | DEX (~20 files) |
| Aave | Lending protocol (~5 files) |
| MakerDAO | Stablecoin protocol (~5 files) |
| Compound | Lending protocol (~5 files) |
| Lido | Liquid staking (~8 files) |
| Rocket Pool | Decentralized staking (~8 files) |
| ENS | Ethereum Name Service (~8 files) |
| The Graph | Indexing protocol (~8 files) |
| Curve | DEX (~3 files) |
| Balancer | DEX (~3 files) |
| Farcaster | Social protocol (~5 files) |
| Lens Protocol | Social protocol (~3 files) |
| Snapshot | Governance tool (~2 files) |
| Aragon | DAO framework (~2 files) |

## 8. Layer 2 Networks

| English | Notes |
|---------|-------|
| Optimism | L2 network (~15 files) |
| Arbitrum | L2 network (~10 files) |
| Polygon | L2 network (~10 files) |
| zkSync | L2 network (~8 files) |
| Starknet | L2 network (~5 files) |
| Base | L2 network (~5 files) -- NOTE: not the common English word |
| Scroll | L2 network (~3 files) -- NOTE: not the paper scroll |
| Linea | L2 network (~3 files) |
| Taiko | L2 network (~3 files) |

## 9. Security / Audit Tools

| English | Notes |
|---------|-------|
| Slither | Static analyzer (~10 files) -- NOTE: not the verb |
| Manticore | Symbolic executor (~15 files) -- NOTE: not the mythical creature |
| Echidna | Fuzzer (~10 files) -- NOTE: not the animal |
| MythX | Security service (~5 files) |
| Mythril | Security tool (~3 files) |
| Certora | Formal verification (~5 files) |

## 10. Other Platforms / Services

| English | Notes |
|---------|-------|
| MetaMask | Wallet (~30+ files) |
| Etherscan | Block explorer (~15 files) |
| GitHub | (~30 files) |
| Discord | (~25 files) |
| Reddit | (~10 files) |
| Telegram | (~8 files) |
| YouTube | (~5 files) |
| Crowdin | Translation platform (~10 files) |
| Docker | Container platform (~3 files) |
| Linux | Operating system (~5 files) |
| Raspberry Pi | Single-board computer (~5 files) |
| InfluxDB | Time-series database (~5 files) |
| Grafana | Monitoring dashboard (~5 files) |
| Tenderly | Debugging platform (~5 files) |

## 11. Core Ethereum Terms (transliterate, do not semantically translate)

| English | Notes |
|---------|-------|
| Ethereum | The network itself |
| Bitcoin | |
| Beacon Chain | PoS chain |
| The Merge | Ethereum upgrade event |
| Web3 | |
| DeFi | Decentralized Finance |
| NFT | Non-Fungible Token |
| DApp | Decentralized Application |
| DAO | Decentralized Autonomous Organization |
