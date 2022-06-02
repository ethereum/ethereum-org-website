---
title: Active areas of Ethereum research
description: Explore different areas of open research and learn how to get involved.
sidebar: true
lang: en
---

# Active areas of Ethereum research

One of the primary strengths of Ethereum is that an active research and engineering community are constantly improving it. Many enthusiastic, skilled people worldwide would like to apply themselves to outstanding issues in Ethereum, but it is not always easy to find out what those issues are. This page outlines key active research areas as a rough guide to Ethereum's cutting edge.

## How Ethereum research works

Ethereum research is open and transparent. The culture is to make research tools and outputs as open and interactive as possible, for example, through executable notebooks. Ethereum research moves quickly, with new findings posted and discussed in the open on forums such as [ethresear.ch](https://ethresear.ch/) rather than reaching the community through traditional publications after rounds of peer review.

## General research resources

Regardless of the specific topic, there is a wealth of information on Ethereum research to be found at [ethresear.ch](https://ethresear.ch) and the [Eth R&D Discord channel](https://discord.gg/n7JxAeRu). These are the primary places where Ethereum researchers discuss the latest ideas and development opportunities.

This report published in May 2022 by [DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum) provides a good overview of the Ethereum roadmap.

## Protocol research

Protocol research is concerned with Ethereum's base layer - the set of rules defining how nodes connect, communicate, exchange and store Ethereum data and come to consensus about the state of the blockchain. Protocol research gets divided into two top-level categories: consensus and execution.

### Consensus

Consensus research is concerned with [Ethereum's proof-of-stake mechanism](/developers/docs/consensus-mechanisms/pos/). Some example consensus research topics are:

- identifying and patching vulnerabilities;
- quantifying cryptoeconomic security;
- increasing the security or performance of client implementations;
- and developing light clients.

As well as forward-looking research, some fundamental redesigns of the protocol, such as single slot finality, are being researched to allow for significant improvements to Ethereum. Furthermore, the efficiency, safety, and monitoring of peer-to-peer networking between consensus clients are also important research topics.

#### Background reading

- [Introduction to proof-of-stake](/developers/docs/consensus-mechanisms/pos/)
- [Casper-FFG paper](https://arxiv.org/abs/1710.09437)
- [Casper-FFG explainer](https://arxiv.org/abs/1710.09437)
- [Gasper paper](https://arxiv.org/abs/2003.03052)

#### Recent research

- [Ethresear.ch Consensus](https://ethresear.ch/c/consensus/29)
- [Availability/Finality dilemma](https://arxiv.org/abs/2009.04987)
- [Single slot finality](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [Proposer-builder separation](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Execution

The execution layer is concerned with executing transactions, running the [Ethereum virtual machine (EVM)](/developers/docs/evm/) and generating execution payloads to pass to the consensus layer. There are many active areas of research, especially as execution clients are getting updated in anticipation of [The Merge](/upgrades/merge/). Active areas of research include:

- building out light client support;
- researching gas limits;
- and incorporating new data structures (e.g. Verkle Tries).

#### Background reading

- [Introduction to the EVM](/developers/docs/evm)
- [Ethresear.ch execution layer](https://ethresear.ch/c/execution-layer-research/37)

#### Recent research

- [Database optimizations](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [State expiry](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [History management](https://eips.ethereum.org/EIPS/eip-4444)
- [Verkle Trees](https://vitalik.ca/general/2021/06/18/verkle.html)
- [Data availability sampling](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## Client Development

Ethereum clients are implementations of the Ethereum protocol. Client development makes the outcomes from protocol research into reality by building them into these clients. Client development includes updating the client specifications as well as building specific implementations.

An Ethereum node is required to run two pieces of software:

1. a consensus client to keep track of the head of the blockchain, gossip blocks and handle consensus logic
2. an execution client to support the Ethereum Virtual Machine and execute transactions.

See the [nodes and clients page](/developers/docs/nodes-and-clients/) for more detail on nodes and clients and for a list of all current client implementations. You can also find a history of all Ethereum upgrades on the [history page](/history/).

### Execution Clients

- [Execution client specification](https://github.com/ethereum/execution-specs)
- [Execution API spec](https://github.com/ethereum/execution-apis)

### Consensus Clients

- [Consensus client specification](https://github.com/ethereum/consensus-specs)
- [Beacon API specification](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## Scaling and performance

Scaling Ethereum is a large area of focus for Ethereum researchers. Current approaches include sharding the blockchain, danksharding, and using rollups. Introductory information on scaling Ethereum is available on our [scaling page](/developers/docs/scaling).

### Layer 2

There are now several Layer 2 protocols that scale Ethereum using different techniques for batching transactions and securing them on Ethereum layer 1. This is a very rapidly growing topic with a lot of research and development potential.

#### Background reading

- [Introduction to layer 2](/layer-2/)
- [EthHub Layer 2](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/zk-rollups/)
- [Polynya: Rollups, DA and modular chains](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### Recent research

- [Arbitrum's fair-ordering for sequencers](https://eprint.iacr.org/2020/269.pdf)
- [ethresear.ch Layer 2](https://ethresear.ch/c/layer-2/32)
- [Rollup-centric roadmap](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2Beat](https://l2beat.com/)

### Bridges

One particular area of layer 2 that requires more research and development is safe and performant bridges. This includes bridges between various Layer 2s and bridges between Layer 1 and Layer 2. This is a particularly important area of research because bridges are commonly targeted by hackers.

#### Background reading

- [Introduction to blockchain bridges](/bridges/)
- [Vitalik on bridges](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [Blockchain bridges article](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [Value locked in bridges](<https://dune.com/eliasimos/Bridge-Away-(from-Ethereum)>)

#### Recent research

- [Validating bridges](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### Sharding

Sharding Ethereum's blockchain has long been part of the development roadmap. However, new scaling solutions such as "Danksharding" are currently taking center stage.

#### Background reading

- [Introduction to Ethereum sharding](/upgrades/shard-chains/)
- [Proto-Danksharding notes](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Bankless Danksharding video](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Ethereum Sharding Research Compendium](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [Danksharding (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### Recent research

- [EIP-4844: Proto-Danksharding](https://github.com/ethereum/EIPs/pull/5088)
- [Vitalik on sharding and data availability sampling](https://hackmd.io/@vbuterin/sharding_proposal)

### Hardware

[Running nodes](/developers/docs/nodes-and-clients/run-a-node/) on modest hardware is fundamental to keeping Ethereum decentralized. Therefore, active research into minimizing the hardware requirements to run nodes is an important area of research.

#### Background reading

- [Ethereum on ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Recent research

- [ecdsa on FGPAs](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## Security

Security is a broad topic that might include spam/scam prevention, wallet security, hardware security, crypto-economic security, bug hunting and testing of applications and client software and key-management. Contributing to knowledge in these areas will help stimulate mainstream adoption.

### Cryptography & ZKP

Zero-knowledge proofs (ZKP) and cryptography are critical for building privacy and security into Ethereum and its applications. Zero-knowledge is a relatively young but fast-moving space with many open research and development opportunities. Some possibilities include developing more efficient implementations of the [Keccak hashing algorithm](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview), finding better polynomial commitments than currently exist or reducing the cost of ecdsa public key generation and signature verification circuits.

#### Background reading

- [0xparc blog](https://0xparc.org/blog)

- [zkp.science](https://zkp.science/)

- [Zero Knowledge podcast](https://zeroknowledge.fm/)

#### Recent research

- [Recent advance in elliptic curve cryptography](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)

- [Ethresear.ch ZK](https://ethresear.ch/c/zk-s-nt-arks/13)

### Wallets

Ethereum wallets can be browser extensions, desktop and mobile apps or smart contracts on Ethereum. There is active research into social recovery wallets that reduce some of the risk associated with individual-user key management. Associated with development of wallets is research into alternative forms of account abstraction, which is an important area of nascent research.

#### Background reading

- [Introduction to wallets](/wallets/)
- [Introduction to wallet security](/security/)
- [ethresear.ch Security](https://ethresear.ch/tag/security)
- [EIP-2938 Account Abstraction](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337 Account Abstraction](https://eips.ethereum.org/EIPS/eip-4337)

#### Recent research

- [Validation focused smart contract wallets](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [The future of accounts](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [EIP-3074 AUTH and AUTHCALL Opcodes](https://eips.ethereum.org/EIPS/eip-3074)
- [Publishing code at an EOA address](https://github.com/ethereum/EIPs/pull/5003)

## Community, education and outreach

Onboarding new users onto Ethereum requires new educational resources and approaches to outreach. This might include blog posts and articles, books, podcasts, memes, teaching resources events and anything else that builds communities, welcomes new starters and educates people about Ethereum.

### UX/UI

To onboard more people onto Ethereum, the ecosystem must improve the UX/UI. This will require designers and product experts to re-examine the design of wallets and apps.

#### Background reading

- [Ethresear.ch UX/UI](https://ethresear.ch/c/ui-ux/24)

#### Recent research

- [Web3 Design Discord](https://discord.gg/FsCFPMTSm9)
- [Web3 Design Principles](https://www.web3designprinciples.com/)
- [Ethereum Magicians UX discussion](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

## Economics

There are complex crypto-economic factors relating to Ethereum's native asset (ether) and the tokens built on top of it (for example NFTs and ERC20 tokens).

#### Background reading

- [Rollup economics from first principles](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Robust Incentives Group](https://ethereum.github.io/rig/)

#### Recent research

- [Empirical analysis of EIP1559]([https://arxiv.org/abs/2110.04753)
- [MEV auctions](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)
- [Circulating supply equilibrium](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954#6-enforcing-minimum-viable-issuance-with-a-variable-base-reward-factor-19)
- [Quantifying MEV: How dark is the forest?](https://arxiv.org/abs/2101.05511)
- [EIP 1559: One month later](https://arxiv.org/abs/2110.04753)

### Proof-of-stake incentives

When Ethereum transitions to proof-of-stake, validators will use its native asset (ether) as collateral. The cryptoeconomics of this determines the security of the network. Sophisticated validators may be able to exploit the nuances of the incentive layer to their own advantage by extracting MEV or launching explicit attacks.

#### Background reading

- [Robist Incentives Group: PoS incentives](https://ethereum.github.io/beaconrunner/)

#### Recent research

- [Vitalik on PBS](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ#Hybrid-PBS-can-we-use-proposers-only-for-inclusion-of-last-resort)
- [Three Attacks on PoS Ethereum](https://arxiv.org/abs/2110.10086)
- [Low-cost attacks on Ethereum 2.0 by sub 1/3 stakeholders](https://arxiv.org/abs/2102.02247)

### Liquid staking and derivatives

Liquid staking allows users with less than 32 ETH to receive staking yields by swapping ether for a token representing staked ether that can be used in DeFi. However, the incentives and market dynamics associated with liquid staking as well as its effect on Ethereum's security (e.g. centralization risks).

#### Background reading

[Ethresear.ch liquid staking](https://ethresear.ch/search?q=liquid%20staking)

#### Recent research

[Handling withdrawals from Lido](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)

[Withdrawal credentials](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)

### Fee markets

Ethereum transaction fees protect the network from spam, denial-of-service attacks and bad smart-contract code. However, it also affects the end-user by influencing the cost of interacting with Ethereum. Balancing network security with end-user user-experience is an ongoing challenge that requires further research and development.

#### Background reading

[EIP-1559 (Robust Incentives Group)](https://ethereum.github.io/abm1559/notebooks/eip1559.html)

#### Recent research

[EIP-4396](https://eips.ethereum.org/EIPS/eip-4396)

[Multidimensional EIP-1559](https://ethresear.ch/t/multidimensional-eip-1559/11651)

[Making EIP-1559 more like an AMM curve](https://ethresear.ch/t/make-eip-1559-more-like-an-amm-curve/9082)

[Cross domain MEV](http://arxiv.org/abs/2112.01472)

## Testing

### Formal verification

Formal verification is writing code to verify that Ethereum's consensus specifications are correct and bug-free. There is an executable version of the specification written in Python that requires maintenance and development. Further research can help to improve the Python implementation of the specification and add tools that can more robustly verify correctness and identify issues.

#### Background reading

[Introduction to formal verification](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)

[Formal Verification (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Recent research

[Formal verification of the deposit contract](https://github.com/runtimeverification/deposit-contract-verification)

[Formal verification of the Beacon Chain specification](https://github.com/runtimeverification/deposit-contract-verification)

## Data science and analytics

There is a need for more data analysis tools and dashboards that give detailed information about activity on Ethereum and the health of the network.

### Background reading

[Dune Analytics](https://dune.com/browse/dashboards)

[Client diversity dashboard](https://clientdiversity.org/)

#### Recent research

[Robust Incentives Group Data Analysis](https://ethereum.github.io/rig/)

## Apps and tooling

The application layer supports a very diverse ecosystem of programs that settle transactions on Ethereum's base layer. App teams are constantly finding new ways to leverage Ethereum to create lower-friction, composable, permissionless and censorship resistant versions of important Web2 apps or creating completely new web3-native concepts. At the same time, new tooling is being developed that makes building increasingly complex Ethereum apps easier.

### DeFi

Decentralized finance (DeFi) is one of the primary classes of application built on top of Ethereum. DeFi aims to create composable "money legos" that allow users to store, transfer, lend, borrow and and invest crypto-assets using smart contracts. This is a fast-moving space that is constantly updating. Research into secure, efficient and accessible protocols is constantly needed.

#### Background reading

[DeFi](/defi/)

[Coinbase: What is DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Recent research

[Decentralized finance, centralized ownership?](https://arxiv.org/pdf/2012.09306.pdf)

[Optimism: The road to sub-dollar transactions](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### DAOs

DAOs are one of the key classes of application being built on top of Ethereum. There is a lot of very active research into how they may develop to replace corporations and other traditional organizations.

#### Background reading

[Dao Collective](https://daocollective.xyz/)

#### Recent research

[Mapping the DAO ecosystem](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Developer tools

Tools for Ethereum developers are rapidly improving. There is lots of active research and development to do in this general area.

#### Background reading

[Tooling by programming language](/developers/docs/programming-languages/)

[Developer Frameworks](/developers/docs/frameworks/)

[Consensus developer tools list](https://github.com/ConsenSys/ethereum-developer-tools-list)

[Token standards](/developers/docs/standards/tokens/)

[Biastek: Ethereum tools](https://biastek.com/ethereum-tools/)

[CryptoDevHub: EVM Tools](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### Recent research

[Eth R&D Discord Consensus Tooling channel](https://discordapp.com/channels/595666850260713488/746343380900118528)

### Oracles

Oracles are used to import off-chain data on-chain in a permissionless and decentralized way. This enables dapps to be reactive to real world phenomena such as price fluctuations in real-world assets, events in off-chain apps or even changes in the weather.

#### Background reading

[Introduction to Oracles](/developers/docs/oracles/)

#### Recent Research

[Survey of blockchain oracles](https://arxiv.org/pdf/2004.07140.pdf)

[Chainlink white paper](https://chain.link/whitepaper)

### App security

Hacks on Ethereum nearly always exploit vulnerabilities in individual applications rather than the base protocol. Hackers and app developers are locked in an arms race to develop new attacks and defenses. This means there is always important research and development required to keep apps safe from hacks.

#### Background reading

[Wormhole exploit report](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)

[List of Ethereum contract hack post-mortems](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)

[Rekt News](https://twitter.com/RektHQ?s=20&t=3otjYQdM9Bqk8k3n1a1Adg)

#### Recent research

[ethresear.ch Applications](https://ethresear.ch/c/applications/18)

### Technology stack

Apps on Ethereum are rarely fully decentralized because they rely on some centralized tooling or infrastructure. Decentralizing the full tech stack is an important research area.

#### Background reading

[Coinbase: Intro to Web3 Stack](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)

[Ethereum stack](/developers/docs/ethereum-stack/)

[Introduction to smart contracts](/developers/docs/smart-contracts/)

[Introduction to decentralized storage](/developers/docs/storage/)

#### Recent research

[Smart contract composability](/developers/docs/smart-contracts/composability/)

## Sources of Funding

You can get involved with Ethereum research and get paid for it! For example, the [Ethereum Foundation](/foundation/) recently ran an [Academic Grants](/community/grants/academic-grants-round/) funding round. Information on active and upcoming funding opportunities can be found on the [Ethereum grants page](/community/grants/).
