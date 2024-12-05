---
title: Active areas of Ethereum research
description: Explore different areas of open research and learn how to get involved.
lang: en
---

# Active areas of Ethereum research {#active-areas-of-ethereum-research}

One of the primary strengths of Ethereum is that an active research and engineering community is constantly improving it. Many enthusiastic, skilled people worldwide would like to apply themselves to outstanding issues in Ethereum, but it is not always easy to find out what those issues are. This page outlines key active research areas as a rough guide to Ethereum's cutting edge.

## How Ethereum research works {#how-ethereum-research-works}

Ethereum research is open and transparent, embodying principles of [Decentralized Science (DeSci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science). The culture is to make research tools and outputs as open and interactive as possible, for example, through executable notebooks. Ethereum research moves quickly, with new findings posted and discussed in the open on forums such as [ethresear.ch](https://ethresear.ch/) rather than reaching the community through traditional publications after rounds of peer review.

## General research resources {#general-research-resources}

Regardless of the specific topic, there is a wealth of information on Ethereum research to be found at [ethresear.ch](https://ethresear.ch) and the [Eth R&D Discord channel](https://discord.gg/qGpsxSA). These are the primary places where Ethereum researchers discuss the latest ideas and development opportunities.

This report published in May 2022 by [DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum) provides a good overview of the Ethereum roadmap.

## Sources of Funding {#sources-of-funding}

You can get involved with Ethereum research and get paid for it! For example, [the Ethereum Foundation](/foundation/) recently ran an [Academic Grants funding round](https://esp.ethereum.foundation/academic-grants). You can find information on active and upcoming funding opportunities on [the Ethereum grants page](/community/grants/).

## Protocol research {#protocol-research}

Protocol research is concerned with Ethereum's base layer - the set of rules defining how nodes connect, communicate, exchange and store Ethereum data and come to consensus about the state of the blockchain. Protocol research gets divided into two top-level categories: consensus and execution.

### Consensus {#consensus}

Consensus research is concerned with [Ethereum's proof-of-stake mechanism](/developers/docs/consensus-mechanisms/pos/). Some example consensus research topics are:

- identifying and patching vulnerabilities;
- quantifying cryptoeconomic security;
- increasing the security or performance of client implementations;
- and developing light clients.

As well as forward-looking research, some fundamental redesigns of the protocol, such as single slot finality, are being researched to allow for significant improvements to Ethereum. Furthermore, the efficiency, safety, and monitoring of peer-to-peer networking between consensus clients are also important research topics.

#### Background reading {#background-reading}

- [Introduction to proof-of-stake](/developers/docs/consensus-mechanisms/pos/)
- [Casper-FFG paper](https://arxiv.org/abs/1710.09437)
- [Casper-FFG explainer](https://arxiv.org/abs/1710.09437)
- [Gasper paper](https://arxiv.org/abs/2003.03052)

#### Recent research {#recent-research}

- [Ethresear.ch Consensus](https://ethresear.ch/c/consensus/29)
- [Availability/Finality dilemma](https://arxiv.org/abs/2009.04987)
- [Single slot finality](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [Proposer-builder separation](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Execution {#execution}

The execution layer is concerned with executing transactions, running the [Ethereum virtual machine (EVM)](/developers/docs/evm/) and generating execution payloads to pass to the consensus layer. There are many active areas of research, including:

- building out light client support;
- researching gas limits;
- and incorporating new data structures (e.g. Verkle Tries).

#### Background reading {#background-reading-1}

- [Introduction to the EVM](/developers/docs/evm)
- [Ethresear.ch execution layer](https://ethresear.ch/c/execution-layer-research/37)

#### Recent research {#recent-research-1}

- [Database optimizations](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [State expiry](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [Paths to state expiry](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Verkle and state expiry proposal](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [History management](https://eips.ethereum.org/EIPS/eip-4444)
- [Verkle Trees](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Data availability sampling](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## Client Development {#client-development}

Ethereum clients are implementations of the Ethereum protocol. Client development makes the outcomes from protocol research into reality by building them into these clients. Client development includes updating the client specifications as well as building specific implementations.

An Ethereum node is required to run two pieces of software:

1. a consensus client to keep track of the head of the blockchain, gossip blocks and handle consensus logic
2. an execution client to support the Ethereum Virtual Machine and execute transactions and smart contracts

See the [nodes and clients page](/developers/docs/nodes-and-clients/) for more detail on nodes and clients and for a list of all current client implementations. You can also find a history of all Ethereum upgrades on the [history page](/history/).

### Execution Clients {#execution-clients}

- [Execution client specification](https://github.com/ethereum/execution-specs)
- [Execution API spec](https://github.com/ethereum/execution-apis)

### Consensus Clients {#consensus-clients}

- [Consensus client specification](https://github.com/ethereum/consensus-specs)
- [Beacon API specification](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## Scaling and performance {#scaling-and-performance}

Scaling Ethereum is a large area of focus for Ethereum researchers. Current approaches include offloading transactions onto rollups and making them as cheap as possible using data blobs. Introductory information on scaling Ethereum is available on our [scaling page](/developers/docs/scaling).

### Layer 2 {#layer-2}

There are now several Layer 2 protocols that scale Ethereum using different techniques for batching transactions and securing them on Ethereum layer 1. This is a very rapidly growing topic with a lot of research and development potential.

#### Background reading {#background-reading-2}

- [Introduction to layer 2](/layer-2/)
- [Polynya: Rollups, DA and modular chains](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### Recent research {#recent-research-2}

- [Arbitrum's fair-ordering for sequencers](https://eprint.iacr.org/2021/1465)
- [Ethresear.ch Layer 2](https://ethresear.ch/c/layer-2/32)
- [Rollup-centric roadmap](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2Beat](https://l2beat.com/)

### Bridges {#bridges}

One particular area of layer 2 that requires more research and development is safe and performant bridges. This includes bridges between various Layer 2s and bridges between Layer 1 and Layer 2. This is a particularly important area of research because bridges are commonly targeted by hackers.

#### Background reading {#background-reading-3}

- [Introduction to blockchain bridges](/bridges/)
- [Vitalik on bridges](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [Blockchain bridges article](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [Value locked in bridges](<https://dune.com/eliasimos/Bridge-Away-(from-Ethereum)>)

#### Recent research {#recent-research-3}

- [Validating bridges](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### Sharding {#sharding}

Sharding Ethereum's blockchain has long been part of the development roadmap. However, new scaling solutions such as "Danksharding" are currently taking center stage.

The precursor to full Danksharding known as Proto-Danksharding went live with the Cancun-Deneb ("Dencun") network upgrade.

[More about the Dencun upgrade](/roadmap/dencun/)

#### Background reading {#background-reading-4}

- [Proto-Danksharding notes](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Bankless Danksharding video](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Ethereum Sharding Research Compendium](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [Danksharding (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### Recent research {#recent-research-4}

- [EIP-4844: Proto-Danksharding](https://eips.ethereum.org/EIPS/eip-4844)
- [Vitalik on sharding and data availability sampling](https://hackmd.io/@vbuterin/sharding_proposal)

### Hardware {#hardware}

[Running nodes](/developers/docs/nodes-and-clients/run-a-node/) on modest hardware is fundamental to keeping Ethereum decentralized. Therefore, active research into minimizing the hardware requirements to run nodes is an important area of research.

#### Background reading {#background-reading-5}

- [Ethereum on ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Recent research {#recent-research-5}

- [ecdsa on FPGAs](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## Security {#security}

Security is a broad topic that might include spam/scam prevention, wallet security, hardware security, crypto-economic security, bug hunting and testing of applications and client software and key-management. Contributing to knowledge in these areas will help stimulate mainstream adoption.

### Cryptography & ZKP {#cryptography--zkp}

Zero-knowledge proofs (ZKP) and cryptography are critical for building privacy and security into Ethereum and its applications. Zero-knowledge is a relatively young but fast-moving space with many open research and development opportunities. Some possibilities include developing more efficient implementations of the [Keccak hashing algorithm](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview), finding better polynomial commitments than currently exist or reducing the cost of ecdsa public key generation and signature verification circuits.

#### Background reading {#background-reading-6}

- [0xparc blog](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [Zero Knowledge podcast](https://zeroknowledge.fm/)

#### Recent research {#recent-research-6}

- [Recent advance in elliptic curve cryptography](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [Ethresear.ch ZK](https://ethresear.ch/c/zk-s-nt-arks/13)

### Wallets {#wallets}

Ethereum wallets can be browser extensions, desktop and mobile apps or smart contracts on Ethereum. There is active research into social recovery wallets that reduce some of the risk associated with individual-user key management. Associated with development of wallets is research into alternative forms of account abstraction, which is an important area of nascent research.

#### Background reading {#background-reading-7}

- [Introduction to wallets](/wallets/)
- [Introduction to wallet security](/security/)
- [Ethresear.ch Security](https://ethresear.ch/tag/security)
- [EIP-2938 Account Abstraction](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337 Account Abstraction](https://eips.ethereum.org/EIPS/eip-4337)

#### Recent research {#recent-research-7}

- [Validation focused smart contract wallets](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [The future of accounts](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [EIP-3074 AUTH and AUTHCALL Opcodes](https://eips.ethereum.org/EIPS/eip-3074)
- [Publishing code at an EOA address](https://eips.ethereum.org/EIPS/eip-5003)

## Community, education and outreach {#community-education-and-outreach}

Onboarding new users onto Ethereum requires new educational resources and approaches to outreach. This might include blog posts and articles, books, podcasts, memes, teaching resources, events and anything else that builds communities, welcomes new starters and educates people about Ethereum.

### UX/UI {#uxui}

To onboard more people onto Ethereum, the ecosystem must improve the UX/UI. This will require designers and product experts to re-examine the design of wallets and apps.

#### Background reading {#background-reading-8}

- [Ethresear.ch UX/UI](https://ethresear.ch/c/ui-ux/24)

#### Recent research {#recent-research-8}

- [Web3 Design Discord](https://discord.gg/FsCFPMTSm9)
- [Web3 Design Principles](https://www.web3designprinciples.com/)
- [Ethereum Magicians UX discussion](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### Economics {#economics}

Economics research in Ethereum broadly follows two approaches: validate the security of mechanisms relying on economic incentives ("microeconomics") and analyze the flows of value between protocols, applications and users ("macroeconomics"). There are complex crypto-economic factors relating to Ethereum's native asset (ether) and the tokens built on top of it (for example NFTs and ERC20 tokens).

#### Background reading {#background-reading-9}

- [Robust Incentives Group](https://ethereum.github.io/rig/)
- [ETHconomics workshop at Devconnect](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### Recent research {#recent-research-9}

- [Empirical analysis of EIP1559](https://arxiv.org/abs/2201.05574)
- [Circulating supply equilibrium](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [Quantifying MEV: How dark is the forest?](https://arxiv.org/abs/2101.05511)

### Blockspace and fee markets {#blockspace-fee-markets}

Blockspace markets govern the inclusion of end-user transactions, either directly on Ethereum (Layer 1) or on bridged networks, e.g., rollups (Layer 2). On Ethereum, transactions are submitted to the fee market deployed in-protocol as EIP-1559, protecting the chain from spam and pricing congestion. On both layers, transactions may produce externalities, known as Maximal Extractable Value (MEV), which induce new market structures to capture or manage these externalities.

#### Background reading {#background-reading-10}

- [Transaction Fee Mechanism Design for the Ethereum Blockchain: An Economic Analysis of EIP-1559 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [Simulations of EIP-1559 (Robust Incentives Group)](https://ethereum.github.io/abm1559)
- [Rollup economics from first principles](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: Frontrunning, Transaction Reordering, and Consensus Instability in Decentralized Exchanges](https://arxiv.org/abs/1904.05234)

#### Recent research {#recent-research-10}

- [Multidimensional EIP-1559 video presentation](https://youtu.be/QbR4MTgnCko)
- [Cross domain MEV](http://arxiv.org/abs/2112.01472)
- [MEV auctions](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### Proof-of-stake incentives {#proof-of-stake-incentives}

Validators use Ethereum's native asset (ether) as collateral against dishonest behavior. The cryptoeconomics of this determines the security of the network. Sophisticated validators may be able to exploit the nuances of the incentive layer to launch explicit attacks.

#### Background reading {#background-reading-11}

- [Ethereum economics masterclass and economic model](https://github.com/CADLabs/ethereum-economic-model)
- [Simulations of PoS incentives (Robust Incentives Group)](https://ethereum.github.io/beaconrunner/)

#### Recent research {#recent-research-11}

- [Increasing censorship resistance of transactions under proposer/builder separation (PBS)](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [Three Attacks on PoS Ethereum](https://arxiv.org/abs/2110.10086)

### Liquid staking and derivatives {#liquid-staking-and-derivatives}

Liquid staking allows users with less than 32 ETH to receive staking yields by swapping ether for a token representing staked ether that can be used in DeFi. However, the incentives and market dynamics associated with liquid staking are still being discovered, as well as its effect on Ethereum's security (e.g. centralization risks).

#### Background reading {#background-reading-12}

- [Ethresear.ch liquid staking](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: The road to trustless Ethereum staking](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Rocket Pool: Staking protocol introduction](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### Recent research {#recent-research-12}

- [Handling withdrawals from Lido](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [Withdrawal credentials](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [The risks of Liquid Staking Derivatives](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Testing {#testing}

### Formal verification {#formal-verification}

Formal verification is writing code to verify that Ethereum's consensus specifications are correct and bug-free. There is an executable version of the specification written in Python that requires maintenance and development. Further research can help to improve the Python implementation of the specification and add tools that can more robustly verify correctness and identify issues.

#### Background reading {#background-reading-13}

- [Introduction to formal verification](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [Formal Verification (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Recent research {#recent-research-13}

- [Formal verification of the deposit contract](https://github.com/runtimeverification/deposit-contract-verification)
- [Formal verification of the Beacon Chain specification](https://github.com/runtimeverification/deposit-contract-verification)

## Data science and analytics {#data-science-and-analytics}

There is a need for more data analysis tools and dashboards that give detailed information about activity on Ethereum and the health of the network.

### Background reading {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [Client diversity dashboard](https://clientdiversity.org/)

#### Recent research {#recent-research-14}

- [Robust Incentives Group Data Analysis](https://ethereum.github.io/rig/)

## Apps and tooling {#apps-and-tooling}

The application layer supports a diverse ecosystem of programs that settle transactions on Ethereum's base layer. Development teams are constantly finding new ways to leverage Ethereum to create composable, permissionless and censorship-resistant versions of important Web2 apps or create completely new Web3-native concepts. At the same time, new tooling is being developed that makes building dapps on Ethereum less complex.

### DeFi {#defi}

Decentralized finance (DeFi) is one of the primary classes of application built on top of Ethereum. DeFi aims to create composable "money legos" that allow users to store, transfer, lend, borrow and invest crypto-assets using smart contracts. DeFi is a fast-moving space that is constantly updating. Research into secure, efficient and accessible protocols is continuously needed.

#### Background reading {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: What is DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Recent research {#recent-research-15}

- [Decentralized finance, centralized ownership?](https://arxiv.org/pdf/2012.09306.pdf)
- [Optimism: The road to sub-dollar transactions](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### DAOs {#daos}

An impactful use case for Ethereum is the ability to organize in a decentralized manner through the use of DAOs. There is a lot of active research into how DAOs on Ethereum can be developed and utilized to execute improved forms of governance, as a trust-minimized coordination tool, greatly expanding peoples options beyond traditional corporations and organizations.

#### Background reading {#background-reading-16}

- [Introduction to DAOs](/dao/)
- [Dao Collective](https://daocollective.xyz/)

#### Recent research {#recent-research-16}

- [Mapping the DAO ecosystem](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Developer tools {#developer-tools}

Tools for Ethereum developers are rapidly improving. There is lots of active research and development to do in this general area.

#### Background reading {#background-reading-17}

- [Tooling by programming language](/developers/docs/programming-languages/)
- [Developer Frameworks](/developers/docs/frameworks/)
- [Consensus developer tools list](https://github.com/ConsenSys/ethereum-developer-tools-list)
- [Token standards](/developers/docs/standards/tokens/)
- [CryptoDevHub: EVM Tools](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### Recent research {#recent-research-17}

- [Eth R&D Discord Consensus Tooling channel](https://discordapp.com/channels/595666850260713488/746343380900118528)

### Oracles {#oracles}

Oracles import off-chain data onto the blockchain in a permissionless and decentralized way. Getting this data on-chain enables dapps to be reactive to real-world phenomena such as price fluctuations in real-world assets, events in off-chain apps, or even changes in the weather.

#### Background reading {#background-reading-18}

- [Introduction to Oracles](/developers/docs/oracles/)

#### Recent research {#recent-research-18}

- [Survey of blockchain oracles](https://arxiv.org/pdf/2004.07140.pdf)
- [Chainlink white paper](https://chain.link/whitepaper)

### App security {#app-security}

Hacks on Ethereum generally exploit vulnerabilities in individual applications rather than in the protocol itself. Hackers and app developers are locked in an arms race to develop new attacks and defenses. This means there is always important research and development required to keep apps safe from hacks.

#### Background reading {#background-reading-19}

- [Wormhole exploit report](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [List of Ethereum contract hack post-mortems](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://twitter.com/RektHQ?s=20&t=3otjYQdM9Bqk8k3n1a1Adg)

#### Recent research {#recent-research-19}

- [Ethresear.ch Applications](https://ethresear.ch/c/applications/18)

### Technology stack {#technology-stack}

Decentralizing the entire Ethereum tech stack is an important research area. Currently, dapps on Ethereum commonly have some points of centralization because they rely on centralized tooling or infrastructure.

#### Background reading {#background-reading-20}

- [Ethereum stack](/developers/docs/ethereum-stack/)
- [Coinbase: Intro to Web3 Stack](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [Introduction to smart contracts](/developers/docs/smart-contracts/)
- [Introduction to decentralized storage](/developers/docs/storage/)

#### Recent research {#recent-research-20}

- [Smart contract composability](/developers/docs/smart-contracts/composability/)
