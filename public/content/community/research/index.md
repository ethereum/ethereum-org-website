---
title: Active areas of Ethereum research
description: Explore different areas of open research and learn how to get involved.
lang: en
---

One of the primary strengths of Ethereum is that an active research and engineering community is constantly improving it. Many enthusiastic, skilled people worldwide would like to apply themselves to outstanding issues in Ethereum, but it is not always easy to find out what those issues are. This page outlines key active research areas as a rough guide to Ethereum's cutting edge.

## How Ethereum research works {#how-ethereum-research-works}

Ethereum research is open and transparent. The culture is to make research tools and outputs as open and interactive as possible, for example through executable notebooks. Ethereum research moves quickly, with new findings posted and discussed in the open on forums such as [ethresear.ch](https://ethresear.ch/) rather than reaching the community through traditional publications after rounds of peer review. The Ethereum Foundation also publishes what it is prioritising and why, so anyone can see which problems are currently considered urgent.

## General research resources {#general-research-resources}

Regardless of the specific topic, there is a wealth of information on Ethereum research to be found at [ethresear.ch](https://ethresear.ch) and the [Eth R&D Discord channel](https://discord.gg/qGpsxSA). These are the primary places where Ethereum researchers discuss the latest ideas and development opportunities.

For an overview of where the protocol is heading, start with the [Ethereum roadmap](/roadmap/), then read the Ethereum Foundation's [Protocol Priorities Update for 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026) and the [protocol cluster updates](https://blog.ethereum.org/2026/05/11/protocol-update-may-26) that report progress against it. [Ethereum Protocol Studies](https://blog.ethereum.org/2026/02/17/ethereum-protocol-studies-26) is a structured entry point for people who want to work on the protocol itself.

## Sources of Funding {#sources-of-funding}

You can get involved with Ethereum research and get paid for it. [The Ethereum Foundation](/foundation/) funds research and public goods through its [Ecosystem Support Program](https://esp.ethereum.foundation/applicants), which posts wishlist items and requests for proposals describing problems it would like to see solved. You can find information on active and upcoming funding opportunities on [the Ethereum grants page](/community/grants/).

## Protocol research {#protocol-research}

Protocol research is concerned with Ethereum's base layer: the set of rules defining how nodes connect, communicate, exchange and store Ethereum data and come to consensus about the state of the blockchain. Its two long-standing categories are consensus and execution, and several research topics now cut across both.

### Consensus {#consensus}

Consensus research is concerned with [Ethereum's proof-of-stake mechanism](/developers/docs/consensus-mechanisms/pos/): the security of the fork choice rule and the finality gadget, the cryptoeconomics of staking, the peer-to-peer network that carries blocks, attestations and blob data, and the cryptography that validators sign with. Some example consensus research topics are:

- identifying and patching vulnerabilities;
- quantifying cryptoeconomic security;
- reducing the time it takes for a block to become final;
- and improving the efficiency, safety and monitoring of peer-to-peer networking between consensus clients.

Much of this work has moved from paper to specification. Data availability sampling shipped in the [Fusaka](/roadmap/fusaka/) upgrade, changes to how blocks are built and how transactions are guaranteed inclusion are specified for upcoming upgrades, and a longer-horizon redesign known as lean consensus is exploring faster finality together with post-quantum signatures.

#### Background reading {#background-reading}

- [Introduction to proof-of-stake](/developers/docs/consensus-mechanisms/pos/)
- [Single slot finality](/roadmap/single-slot-finality/)
- [Casper-FFG paper](https://arxiv.org/abs/1710.09437)
- [Gasper paper](https://arxiv.org/abs/2003.03052)
- [lean Ethereum](https://blog.ethereum.org/2025/07/31/lean-ethereum)

#### Recent research {#recent-research}

- [Ethresear.ch Consensus](https://ethresear.ch/c/consensus/29)
- [Availability/Finality dilemma](https://arxiv.org/abs/2009.04987)
- [3-slot finality: SSF is not about "single" slot](https://ethresear.ch/t/3-slot-finality-ssf-is-not-about-single-slot/20927)

### Execution {#execution}

The execution layer is concerned with executing transactions, running the [Ethereum virtual machine (EVM)](/developers/docs/evm/) and generating execution payloads to pass to the consensus layer. Research here divides into two strands: making state cheap to hold and prove, and raising throughput without pushing more cost onto the people running nodes. There are many active areas of research, including:

- repricing the gas cost of operations that create state;
- expiring history that nodes no longer need to serve;
- block-level access lists that allow transactions to be validated in parallel;
- multidimensional fee markets that price state, data and computation separately;
- and proving the execution of L1 blocks with a zkEVM.

#### Background reading {#background-reading-1}

- [Introduction to the EVM](/developers/docs/evm/)
- [Ethresear.ch execution layer](https://ethresear.ch/c/execution-layer-research/37)
- [Ethereum execution layer specifications](https://github.com/ethereum/execution-specs)
- [Database optimizations](https://github.com/erigontech/erigon/blob/main/docs/programmers_guide/db_faq.md)

#### Recent research {#recent-research-1}

- [EIP-7928: Block-level access lists](https://eips.ethereum.org/EIPS/eip-7928)
- [EIP-8037: State creation gas cost increase](https://eips.ethereum.org/EIPS/eip-8037)
- [EIP-7999: Unified multidimensional fee market](https://eips.ethereum.org/EIPS/eip-7999)
- [EIP-7642: eth/69, history expiry and simpler receipts](https://eips.ethereum.org/EIPS/eip-7642)
- [Shipping an L1 zkEVM: realtime proving](https://blog.ethereum.org/2025/07/10/realtime-proving)

### Censorship resistance and block building {#censorship-resistance-and-block-building}

Most Ethereum blocks are currently assembled by a small number of specialised builders, which concentrates the power to decide which transactions are included. Research in this area covers bringing the builder market into the protocol itself, so that the roles of proposing and building a block are separated by consensus rules rather than by out-of-protocol software, and giving validators a way to force the inclusion of transactions that builders leave out.

#### Background reading {#background-reading-21}

- [Proposer-builder separation](/roadmap/pbs/)
- [Single secret leader election](/roadmap/secret-leader-election/)

#### Recent research {#recent-research-21}

- [EIP-7732: Enshrined proposer-builder separation](https://eips.ethereum.org/EIPS/eip-7732)
- [EIP-7805: Fork-choice enforced inclusion lists](https://eips.ethereum.org/EIPS/eip-7805)
- [Increasing censorship resistance of transactions under proposer/builder separation](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### State growth and statelessness {#state-growth-and-statelessness}

Every full node stores Ethereum's state, so the rate at which that state grows sets a floor on the cost of running one. In the short term, research focuses on repricing the operations that create state and on expiring history that nodes no longer need to keep. In the longer term, the plan is to replace Ethereum's hexary Merkle-Patricia trie with a binary tree that produces much smaller proofs, and to move towards statelessness, so that a node can verify blocks without holding the entire state. Earlier work in this area assumed Verkle trees; the current proposal is a unified binary tree, which carries over the witness gas schedule specified for that earlier line of work.

#### Background reading {#background-reading-22}

- [Statelessness and state expiry](/roadmap/statelessness/)
- [Ethereum stateless book](https://stateless.fyi/)

#### Recent research {#recent-research-22}

- [EIP-7864: Ethereum state using a unified binary tree](https://eips.ethereum.org/EIPS/eip-7864)
- [EIP-4762: Statelessness gas cost changes](https://eips.ethereum.org/EIPS/eip-4762)
- [Why decentralized state is important for Ethereum](https://ethresear.ch/t/why-decentralized-state-is-important-for-ethereum/25622)

### Post-quantum cryptography {#post-quantum-cryptography}

Ethereum's validator signatures and much of its application layer rely on elliptic curve cryptography, which a sufficiently capable quantum computer would break. Making Ethereum quantum resistant means replacing those signatures with hash-based or lattice-based alternatives, keeping signature aggregation efficient enough for a large validator set, and giving existing accounts a migration path. The Ethereum Foundation runs a dedicated post-quantum team, and this is one of the longest-horizon programmes on the roadmap.

#### Background reading {#background-reading-23}

- [Quantum resistance](/roadmap/security/quantum-resistance/)
- [Post-quantum Ethereum](https://pq.ethereum.org/)

#### Recent research {#recent-research-23}

- [lean Ethereum](https://blog.ethereum.org/2025/07/31/lean-ethereum)
- [Ethresear.ch cryptography](https://ethresear.ch/c/cryptography/28)
- [lean Ethereum implementations](https://github.com/leanEthereum)

## Client Development {#client-development}

Ethereum clients are implementations of the Ethereum protocol. Client development makes the outcomes from protocol research into reality by building them into these clients. Client development includes updating the client specifications as well as building specific implementations.

An Ethereum node is required to run two pieces of software:

1. a consensus client to keep track of the head of the blockchain, gossip blocks and handle consensus logic
2. an execution client to support the Ethereum Virtual Machine and execute transactions and smart contracts

New classes of client are being prototyped alongside those two, including clients that prove the execution of L1 blocks and lean consensus clients built around post-quantum signatures.

See the [nodes and clients page](/developers/docs/nodes-and-clients/) for more details on nodes and clients and for a list of all current client implementations. You can also find a history of all Ethereum upgrades on the [history page](/ethereum-forks/).

### Execution Clients {#execution-clients}

- [Execution client specification](https://github.com/ethereum/execution-specs)
- [Execution API spec](https://github.com/ethereum/execution-apis)

### Consensus Clients {#consensus-clients}

- [Consensus client specification](https://github.com/ethereum/consensus-specs)
- [Beacon API specification](https://ethereum.github.io/beacon-APIs/)

### zkEVM clients {#zkevm-clients}

- [zkEVM](/roadmap/zkevm/)
- [Ethproofs](https://ethproofs.org/)
- [Shipping an L1 zkEVM: the security foundations](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations)

## Scaling and performance {#scaling-and-performance}

Scaling Ethereum is a large area of focus for Ethereum researchers, and it runs on two tracks at the same time: raising the throughput of layer 1 itself, and moving execution onto rollups that post their data to Ethereum. Current work includes increasing the block gas limit, repricing state growth, expanding blob capacity for rollup data, and reducing what a node has to store and verify. Introductory information on scaling Ethereum is available on our [scaling page](/developers/docs/scaling/) and the [scaling roadmap](/roadmap/scaling/).

### Layer 2 {#layer-2}

There are now several Layer 2 protocols that scale Ethereum using different techniques for batching transactions and securing them on Ethereum layer 1. Open research includes reducing the latency and cost of proving, shortening the time it takes for a transaction to reach trustless finality, and giving users a single coherent experience across many rollups.

#### Background reading {#background-reading-2}

- [Introduction to layer 2](/layer-2/)
- [L2BEAT: scaling summary](https://l2beat.com/scaling/summary)
- [A rollup-centric ethereum roadmap](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)

#### Recent research {#recent-research-2}

- [Ethresear.ch Layer 2](https://ethresear.ch/c/layer-2/32)
- [L2BEAT: onchain costs](https://l2beat.com/scaling/costs)
- [Building on Ethereum in 2026: what has changed](/latest/building-on-ethereum-in-2026/)

### Interoperability {#interoperability}

Users and assets are spread across Ethereum layer 1 and many layer 2s, and the research problem is letting them move and act across those chains without trusting an intermediary. Work here covers intent-based transfers, standardised cross-chain addressing and naming, general message passing, and chain abstraction at the wallet level. This replaces a model in which custodial bridges held the assets, and bridges have historically been one of the largest sources of losses in the ecosystem, so the security of any cross-chain mechanism remains a central concern.

#### Background reading {#background-reading-3}

- [Introduction to blockchain bridges](/bridges/)
- [Making Ethereum feel like one chain again](https://blog.ethereum.org/2025/11/18/eil)
- [Open Intents Framework](https://openintents.xyz/)
- [Validating bridges](https://stonecoldpat.github.io/images/validatingbridges.pdf)

#### Recent research {#recent-research-3}

- [ERC-7683: Cross chain intents](https://eips.ethereum.org/EIPS/eip-7683)
- [ERC-7930: Interoperable addresses](https://eips.ethereum.org/EIPS/eip-7930)
- [ERC-7828: Interoperable names](https://eips.ethereum.org/EIPS/eip-7828)

### Data availability and blob scaling {#data-availability-and-blob-scaling}

Rollups post their data to Ethereum in blobs, and scaling that data layer is a research problem in its own right, separate from scaling execution. Ethereum now uses data availability sampling, so validators can verify that blob data was published by sampling parts of it instead of downloading all of it, and blob capacity is raised incrementally through dedicated blob-parameter-only forks. Open questions include how far sampling can be pushed, how to keep bandwidth requirements manageable for people staking at home, and how blob pricing should respond to demand.

#### Background reading {#background-reading-4}

- [PeerDAS](/roadmap/fusaka/peerdas/)
- [Fusaka upgrade](/roadmap/fusaka/)
- [Danksharding](/roadmap/danksharding/)
- [Data availability](/developers/docs/data-availability/)
- [EIP-4844: Shard blob transactions](https://eips.ethereum.org/EIPS/eip-4844)
- [Proto-Danksharding notes](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)

#### Recent research {#recent-research-4}

- [EIP-7594: PeerDAS](https://eips.ethereum.org/EIPS/eip-7594)
- [EIP-7892: Blob parameter only hardforks](https://eips.ethereum.org/EIPS/eip-7892)
- [Ethresear.ch Sharding](https://ethresear.ch/c/sharding/6)

### Hardware {#hardware}

[Running nodes](/developers/docs/nodes-and-clients/run-a-node/) on modest hardware is fundamental to keeping Ethereum decentralized, so every increase in throughput has to be weighed against what it costs a node operator. With the block gas limit rising and further increases planned, active research covers state growth and how to price it, sync and database performance on larger state, the disk savings available from history expiry, and eventually statelessness.

#### Background reading {#background-reading-5}

- [Spin up your own Ethereum node](/developers/docs/nodes-and-clients/run-a-node/)
- [Statelessness and state expiry](/roadmap/statelessness/)
- [Ethereum on ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Recent research {#recent-research-5}

- [Scaling Ethereum: the path to a higher gas limit and beyond](https://ethpandaops.io/posts/gaslimit-scaling/)
- [EIP-8261: Gas limit schedule](https://eips.ethereum.org/EIPS/eip-8261)
- [EIP-8037: State creation gas cost increase](https://eips.ethereum.org/EIPS/eip-8037)

## Security {#security}

Security is a broad topic that might include spam and scam prevention, wallet security, hardware security, crypto-economic security, censorship resistance, post-quantum readiness, bug hunting, and the testing and verification of applications and client software. Ethereum's [security roadmap](/roadmap/security/) covers the protocol-level work.

### Cryptography & ZKP {#cryptography--zkp}

Zero-knowledge proofs (ZKP) and cryptography are critical for building privacy and security into Ethereum and its applications. Zero-knowledge proving has moved from research into production infrastructure: provers that prove real Ethereum blocks are now benchmarked publicly on latency, cost and soundness. The open problems have shifted accordingly, towards proving L1 blocks fast enough to do it in real time, accounting rigorously for the security of the proof systems in use, and preparing for post-quantum cryptography.

#### Background reading {#background-reading-6}

- [zkEVM](/roadmap/zkevm/)
- [Privacy](/roadmap/privacy/)
- [Zero Knowledge podcast](https://zeroknowledge.fm/)

#### Recent research {#recent-research-6}

- [Ethresear.ch ZK](https://ethresear.ch/c/zk-s-nt-arks/13)
- [Ethresear.ch cryptography](https://ethresear.ch/c/cryptography/28)
- [Soundness calculator for hash-based zkEVM proof systems](https://github.com/ethereum/soundcalc)
- [Shipping an L1 zkEVM: the security foundations](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations)

### Wallets {#wallets}

Ethereum wallets can be browser extensions, desktop and mobile apps or smart contracts on Ethereum. Account abstraction is no longer experimental: ERC-4337 provides smart accounts without protocol changes, and EIP-7702 lets an ordinary account set code so that transaction batching, gas sponsorship and social recovery work with the address a user already has. Open research now centres on native account abstraction in the protocol itself, on modular and auditable account architectures, and on key management and recovery that ordinary people can operate safely.

#### Background reading {#background-reading-7}

- [Introduction to wallets](/wallets/)
- [Introduction to wallet security](/security/)
- [Account abstraction](/roadmap/account-abstraction/)
- [EIP-7702](/roadmap/pectra/7702/)
- [Ethresear.ch Security](https://ethresear.ch/c/security/25)

#### Recent research {#recent-research-7}

- [EIP-8141: Frame transaction](https://eips.ethereum.org/EIPS/eip-8141)
- [ERC-5792: Wallet call API](https://eips.ethereum.org/EIPS/eip-5792)
- [ERC-6963: Multi injected provider discovery](https://eips.ethereum.org/EIPS/eip-6963)
- [Validation focused smart contract wallets](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)

## Community, education and outreach {#community-education-and-outreach}

Onboarding new users onto Ethereum requires new educational resources and approaches to outreach. This might include blog posts and articles, books, podcasts, memes, teaching resources, events and anything else that builds communities, welcomes new starters and educates people about Ethereum.

### Design and UX {#design-and-ux}

To onboard more people onto Ethereum, the ecosystem must improve its design and user experience. This requires designers and product experts to re-examine how wallets and apps work, and it increasingly means designing against standards that already exist: batched wallet calls, gas sponsorship, accounts that can be recovered, and human-readable addresses that carry the chain they belong to. There are comparatively few canonical venues for web3 UX research, so published studies and design guidance tend to be scattered.

#### Background reading {#background-reading-8}

- [Design and UX in web3](/developers/docs/design-and-ux/)
- [Ethereum user experience roadmap](/roadmap/user-experience/)
- [Web3 Design Playbook](https://learnweb3.design/)
- [Web3 UX Design Handbook](https://web3ux.design/)

#### Recent research {#recent-research-8}

- [Ethresear.ch UX/UI](https://ethresear.ch/c/ui-ux/24)
- [ERC-5792: Wallet call API](https://eips.ethereum.org/EIPS/eip-5792)
- [ERC-7828: Interoperable names](https://eips.ethereum.org/EIPS/eip-7828)

### Economics {#economics}

Economics research in Ethereum broadly follows two approaches: validate the security of mechanisms relying on economic incentives ("microeconomics") and analyze the flows of value between protocols, applications and users ("macroeconomics"). There are complex crypto-economic factors relating to Ethereum's native asset (ether) and the tokens built on top of it (for example NFTs and ERC20 tokens).

#### Background reading {#background-reading-9}

- [Robust Incentives Group](https://rig.ethereum.org/)
- [Ethereum economics masterclass and economic model](https://github.com/CADLabs/ethereum-economic-model)

#### Recent research {#recent-research-9}

- [Ethresear.ch Economics](https://ethresear.ch/c/economics/16)
- [Circulating supply equilibrium](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [Quantifying MEV: How dark is the forest?](https://arxiv.org/abs/2101.05511)

### Blockspace and fee markets {#blockspace-fee-markets}

Blockspace markets govern the inclusion of end-user transactions, either directly on Ethereum (Layer 1) or on bridged networks, e.g., rollups (Layer 2). On Ethereum, transactions are submitted to the fee market deployed in-protocol as EIP-1559, protecting the chain from spam and pricing congestion. On both layers, transactions may produce externalities, known as Maximal Extractable Value (MEV), which induce new market structures to capture or manage these externalities. Current work extends this to pricing several resources at once, since state, data and computation congest independently, and to changing who assembles blocks and on what terms.

#### Background reading {#background-reading-10}

- [Transaction Fee Mechanism Design for the Ethereum Blockchain: An Economic Analysis of EIP-1559 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [Simulations of EIP-1559 (Robust Incentives Group)](https://ethereum.github.io/abm1559)
- [Rollup economics from first principles](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: Frontrunning, Transaction Reordering, and Consensus Instability in Decentralized Exchanges](https://arxiv.org/abs/1904.05234)

#### Recent research {#recent-research-10}

- [EIP-7999: Unified multidimensional fee market](https://eips.ethereum.org/EIPS/eip-7999)
- [EIP-7928: Block-level access lists](https://eips.ethereum.org/EIPS/eip-7928)
- [Cross domain MEV](https://arxiv.org/abs/2112.01472)

### Proof-of-stake incentives {#proof-of-stake-incentives}

Validators use Ethereum's native asset (ether) as collateral against dishonest behavior. The cryptoeconomics of this determines the security of the network. Sophisticated validators may be able to exploit the nuances of the incentive layer to launch explicit attacks. Since the Pectra upgrade, validators can also hold and earn on a much larger effective balance and consolidate several validators into one, which changes the economics of running them.

#### Background reading {#background-reading-11}

- [Maximum effective balance](/roadmap/pectra/maxeb/)
- [Ethereum economics masterclass and economic model](https://github.com/CADLabs/ethereum-economic-model)
- [Simulations of PoS incentives (Robust Incentives Group)](https://ethereum.github.io/beaconrunner/)

#### Recent research {#recent-research-11}

- [Robust Incentives Group](https://rig.ethereum.org/)
- [Three Attacks on PoS Ethereum](https://arxiv.org/abs/2110.10086)

### Liquid staking and derivatives {#liquid-staking-and-derivatives}

Liquid staking allows users with less than 32 ETH to receive staking yields by swapping ether for a token representing staked ether that can be used in DeFi. However, the incentives and market dynamics associated with liquid staking are still being discovered, as well as its effect on Ethereum's security (e.g., centralization risks).

#### Background reading {#background-reading-12}

- [Ethresear.ch liquid staking](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: The road to trustless Ethereum staking](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)

#### Recent research {#recent-research-12}

- [The risks of Liquid Staking Derivatives](https://notes.ethereum.org/@djrtwo/risks-of-lsd)
- [Handling withdrawals from Lido](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)

## Testing {#testing}

### Client and network testing {#client-and-network-testing}

Ethereum's specifications are executable, and the test fixtures generated from them are what client teams check their implementations against. Alongside those, shared test harnesses run clients against each other and against deliberately hostile network conditions, and public testnets exercise upgrades before they reach mainnet. Improving this infrastructure is some of the highest-leverage work available, because it is how bugs are caught before they reach users.

#### Background reading {#background-reading-24}

- [Ethereum execution layer specifications](https://github.com/ethereum/execution-specs)
- [Consensus client specification](https://github.com/ethereum/consensus-specs)

#### Recent research {#recent-research-24}

- [hive, an end-to-end client test harness](https://github.com/ethereum/hive)
- [Assertoor, a testnet testing tool](https://github.com/ethpandaops/assertoor)

### Formal verification {#formal-verification}

Formal verification uses machine-checked mathematical proof to establish that a specification or an implementation behaves as intended. In Ethereum this covers proving that EVM implementations match a formal semantics, proving the soundness of the circuits and proof systems that zero-knowledge provers rely on, and verifying the cryptographic primitives underneath them. Further research can strengthen these proofs and extend them to more of the stack.

#### Background reading {#background-reading-13}

- [Verified zkEVMs](https://verified-zkevm.org/)
- [Formal Verification (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Recent research {#recent-research-13}

- [Verified zkEVM project overview](https://github.com/Verified-zkEVM/Overview)
- [KEVM: semantics of the EVM in K](https://github.com/runtimeverification/evm-semantics)
- [Formal verification of the deposit contract](https://github.com/runtimeverification/deposit-contract-verification)

## Data science and analytics {#data-science-and-analytics}

There is a need for more data analysis tools and dashboards that give detailed information about activity on Ethereum and the health of the network. Much of the underlying data is public and queryable, so the gap is usually in analysis and presentation rather than in access.

### Background reading {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [Client diversity dashboard](https://clientdiversity.org/)
- [Ethereum JSON-RPC execution API specification](https://ethereum.github.io/execution-apis/)

#### Recent research {#recent-research-14}

- [Robust Incentives Group Data Analysis](https://rig.ethereum.org/)
- [ethPandaOps open data](https://ethpandaops.io/data/)
- [L2BEAT: scaling summary](https://l2beat.com/scaling/summary)

## Apps and tooling {#apps-and-tooling}

The application layer supports a diverse ecosystem of programs that settle transactions on Ethereum's base layer. Development teams are constantly finding new ways to leverage Ethereum to create composable, permissionless and censorship-resistant versions of important Web2 apps or create completely new Web3-native concepts. At the same time, new tooling is being developed that makes building dapps on Ethereum less complex.

### DeFi {#defi}

Decentralized finance (DeFi) is one of the primary classes of application built on top of Ethereum. DeFi aims to create composable "money legos" that allow users to store, transfer, lend, borrow and invest crypto-assets using smart contracts. DeFi is a fast-moving space that is constantly updating. Research into secure, efficient and accessible protocols is continuously needed.

#### Background reading {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: What is DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Recent research {#recent-research-15}

- [Decentralized finance, centralized ownership?](https://arxiv.org/pdf/2012.09306.pdf)
- [Ethresear.ch Applications](https://ethresear.ch/c/applications/18)

### DAOs {#daos}

An impactful use case for Ethereum is the ability to organize in a decentralized manner through the use of DAOs. There is a lot of active research into how DAOs on Ethereum can be developed and utilized to execute improved forms of governance, as a trust-minimized coordination tool, greatly expanding peoples options beyond traditional corporations and organizations.

#### Background reading {#background-reading-16}

- [Introduction to DAOs](/dao/)

#### Recent research {#recent-research-16}

- [Mapping the DAO ecosystem](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Developer tools {#developer-tools}

Tools for Ethereum developers are rapidly improving. There is lots of active research and development to do in this general area.

#### Background reading {#background-reading-17}

- [Tooling by programming language](/developers/docs/programming-languages/)
- [Developer Frameworks](/developers/docs/frameworks/)
- [Introduction to dapps](/developers/docs/dapps/)
- [Token standards](/developers/docs/standards/tokens/)

#### Recent research {#recent-research-17}

- [Eth R&D Discord](https://discord.gg/qGpsxSA)
- [Ethereum execution API specifications](https://github.com/ethereum/execution-apis)

### Oracles {#oracles}

Oracles import offchain data onto the blockchain in a permissionless and decentralized way. Getting this data onchain enables dapps to be reactive to real-world phenomena such as price fluctuations in real-world assets, events in offchain apps, or even changes in the weather.

#### Background reading {#background-reading-18}

- [Introduction to Oracles](/developers/docs/oracles/)

#### Recent research {#recent-research-18}

- [Survey of blockchain oracles](https://arxiv.org/pdf/2004.07140.pdf)

### App security {#app-security}

Hacks on Ethereum generally exploit vulnerabilities in individual applications rather than in the protocol itself. Hackers and app developers are locked in an arms race to develop new attacks and defenses. This means there is always important research and development required to keep apps safe from hacks.

#### Background reading {#background-reading-19}

- [Smart contract security](/developers/docs/smart-contracts/security/)
- [Wormhole exploit report](https://www.chainalysis.com/blog/wormhole-hack-february-2022/)
- [List of Ethereum contract hack post-mortems](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://rekt.news/)

#### Recent research {#recent-research-19}

- [Ethresear.ch Applications](https://ethresear.ch/c/applications/18)

### Technology stack {#technology-stack}

Decentralizing the entire Ethereum tech stack is an important research area. Currently, dapps on Ethereum commonly have some points of centralization because they rely on centralized tooling or infrastructure. Reducing that reliance means making it practical for applications to read Ethereum without trusting a single provider, which is where light clients and trustless access to node data come in.

#### Background reading {#background-reading-20}

- [Ethereum stack](/developers/docs/ethereum-stack/)
- [Light clients](/developers/docs/nodes-and-clients/light-clients/)
- [Introduction to smart contracts](/developers/docs/smart-contracts/)
- [Introduction to decentralized storage](/developers/docs/storage/)

#### Recent research {#recent-research-20}

- [Smart contract composability](/developers/docs/smart-contracts/composability/)
- [Coinbase: Intro to Web3 Stack](https://www.coinbase.com/blog/a-simple-guide-to-the-web3-stack)
