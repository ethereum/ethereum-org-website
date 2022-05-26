---
title: Active areas of Ethereum research
description: Explore different areas of open research and learn how to get involved.
sidebar: true
lang: en
---

# Open areas of Ethereum research

One of the primary strengths of Ethereum is that it is constantly being improved by an active research and engineering community. There are many enthusiastic, skilled people worldwide that would like to apply themselves to outstanding issues in Ethereum, but it is not always easy to find out what those issues are. This page aims to outline some of the key areas of active research as a rough guide to Ethereum's cutting edge.

## General research resources

Regardless of the specific topic, there is a wealth of information on Ethereum research to be found at [ethresear.ch](https://ethresear.ch) and the [Eth R&D Discord channel](https://discord.gg/n7JxAeRu). These are the primary places where Ethereum researchers discuss the latest ideas and development opportunities.

## Scaling and performance

There are ongoing efforts to scale Ethereum using a variety of techniques including sharding the blockchain, danksharding and using rollups. Introductory information on scaling Ethereum is available on our [scaling page](/developers/docs/scaling).

### Layer 2

There are now several Layer 2 protocols that scale Ethereum using different techniques for batching transactions and securing them on Ethereum layer 1. This is a very rapidly growing topic with a lot of research and development potential.

#### Background reading

[Introduction to layer 2](/layer-2/)

[EthHub Layer-2](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/zk-rollups/)

#### Recent research

[ethresear.ch Layer 2](https://ethresear.ch/c/layer-2/32)


### Bridges

One particular area of layer 2 that requires more research and development is safe and performant bridges. This includes bridges between various Layer-2s and bridges between Layer 1 and Layer 2. This is a particularly important area of researchg because bridges are commonly targeted by hackers.

#### Background reading

[Introduction to blockchain bridges](/bridges/)

[Vitalik on bridges](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)

[Blockchain Bridges article](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)

#### Recent research

[Validating bridges](https://stonecoldpat.github.io/images/validatingbridges.pdf)


### Sharding

Sharding Ethereum's blockchain has long been part of the development roadmap. However, new scaling solutions such as "Danksharding" are currently taking center stage. 

#### Background reading

[Introduction to Ethereum sharding](/upgrades/shard-chains/)

[Proto-Danksharding notes](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)

[Bankless Danksharding video](https://www.youtube.com/watch?v=N5p0TB77flM)

[Ethereum Sharding Research Compendium](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)

[Danksharding (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### Recent research


### Hardware

[Running nodes](/developers/docs/nodes-and-clients/run-a-node/) on modest hardware is fundamental to keeping Ethereum decentralized. Therefore, active research into minimizing the hardware requirements to run nodes is an important area of research.

#### Background reading

[Ethereum on ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)


#### Recent research


## Security

Security is a broad topic that might include spam/scam prevention, wallet security, hardware security, crypto-economic security, bug hunting and testing of applications and client software and key-management. Contributing to knowledge in these areas will help stimulate mainstream adoption.

### Cryptography & ZKP

Zero-knowledge proofs (ZKP) and cryptography are critical for building privacy and security into Ethereum and its applications. Zero-knowledge is a relatively young but fast-moving space with many open research and development opportunities. Some possibilities include developing more efficient implementations of the [Keccak hashing algorithm](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview), finding better polynomial commitments than currently exist or reducing the cost of ecdsa public key generation and signature verification circuits.

#### Background reading

[0xparc blog](https://0xparc.org/blog)

[zkp.science](https://zkp.science/)

[Zero Knowledge podcast](https://zeroknowledge.fm/)


#### Recent research

[Recent advance in elliptic curve cryptography](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)

[Ethresear.ch ZK](https://ethresear.ch/c/zk-s-nt-arks/13)


### Wallets

User-wallets can be browser extensions, desktop and mobile apps or smart contracts on Ethereum. There is active research into social recovery wallets that reduce some of the risk associated with individual-user key management. Associated with dveelopment of wallets is research into alternative forms of account abstraction, which is an important area of nascent research.

#### Background reading

[Our Security page](https://ethereum.org/en/security/)

[ethresear.ch Security](https://ethresear.ch/tag/security)

[EIP-2938 Account Abstraction](https://eips.ethereum.org/EIPS/eip-2938)

[EIP-4337 Account Abstraction](https://eips.ethereum.org/EIPS/eip-4337)


#### Recent research

[Validation focussed smart contract wallets](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)

[The future of accounts](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)

[EIP-3074](https://eips.ethereum.org/EIPS/eip-3074)

[Publishing code code at EOA addresses](https://github.com/ethereum/EIPs/pull/5003)


## Community, education and outreach

Onboarding new users onto Ethereum requires new educational resources and approaches to outreach. This might include blog posts and articles, books, podcasts, memes, teaching resources events and anything else that builds communities, welcomes new starters and educates people about Ethereum.

### UX/UI

For Ethereum to onboard more people the UX/UI must be improved. This requires designers and UI and product experts to re-examine the design of wallets and apps.

#### Background reading

[Ethresear.ch UX/UI](https://ethresear.ch/c/ui-ux/24)

[Ethereum.org community page](https://ethereum.org/en/learn/)

#### Recent research


## Economics

There are complex crypto-economic factors relating to Ethereum's native asset (ether) and the tokens built on top of it (for example NFTs and ERC20 tokens).

#### Background reading

[Rollup economics from first principles](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)

[Robust Incentives Group](https://ethereum.github.io/rig/)


#### Recent research

[Empirical analysis of EIP1559]([https://arxiv.org/abs/2110.04753)

[MEV auctions](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

[Circulating supply equilibrium](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954#6-enforcing-minimum-viable-issuance-with-a-variable-base-reward-factor-19)

[Quantifying MEV: How dark is the forest?](https://arxiv.org/abs/2101.05511)

[EIP 1559: One month later](https://arxiv.org/abs/2110.04753)

### PoS incentives

When Ethereum transitions to proof of stake, its native asset (ether) will be used as collateral by validators. The cryptoeconomics of this

#### Background reading

[Robist Incentives Group: PoS incentives](https://ethereum.github.io/beaconrunner/)

#### Recent research


### Liquid staking and derivatives

Liquid staking allows users with less than 32 ETH to receive staking yields by swapping ether for a token representing staked ether that can be used in DeFi. However, the incentives and market dynamics associated with liquid staking as well as its effect on Ethereum's security (e.g. centralization risks, )

#### Background reading

[Ethresear.ch liquid staking](https://ethresear.ch/search?q=liquid%20staking)


#### Recent research


### DeFi

Decentralized finance (DeFi) is one of the primary classes of application built on top of Ethereum. DeFi aims to create composable "money legos" that allow users to store, transfer, lend, borrow and and invest crypto-assets using smart contracts. This is a fast-moving space that is constantly updating. Research into secure, efficient and accessible protocols is constantly needed.

#### Background reading

[DeFi](https://ethereum.org/en/defi/)

[Coinbase: What is DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)


#### Recent research

### Fee markets

Ethereum transaction fees protect the network from spam, denial-of-service attacks and bad smart-contract code. However, it also affects the end-user by influencing the cost of interacting with Ethereum. Balancing network security with end-user user-experience is an ongoing challenge that requires further research and development. 

#### Background reading

[EIP-1559 (Robust Incentives Group)](https://ethereum.github.io/abm1559/notebooks/eip1559.html)

#### Recent research


### Taxation and accounting

Crypto taxation is a complicated issue that likely requires a software solution. There are some nascent crypto accounting project but this area requires much more attention.

#### Background reading

#### Recent research

[Example of taxation and accounting research: Cumming et al. 2019](https://www.mdpi.com/1911-8074/12/3/126)



## Clients and protocol research

### Consensus clients

The consensus layer is concerned with the proof-of-stake mechanism securing Ethereum from the merge onwards. There is abundant ongoing research and development relating to PoS concepts and implementation, for example identifying and patching vulnerabilities, quantifying cryptoeconomic security, increasing the security or performance of client implementations, building light clients and developing staking apps. Some fundamental redesigns of the protocol to confer large improvements to Ethereum are also being researched, for example single slot finality.

#### Background reading

[Casper-FFG paper](https://arxiv.org/abs/1710.09437)

[Casper-FFG Explainer](https://arxiv.org/abs/1710.09437)

[Gasper paper](https://arxiv.org/abs/2003.03052)


##### Client implementations

[Prysm client](https://docs.prylabs.network/docs/how-prysm-works/beacon-node/)

[Lighthouse client](https://lighthouse-book.sigmaprime.io/)

[Lodestar client](https://lodestar.chainsafe.io/)

[Teku client](https://consensys.net/knowledge-base/ethereum-2/teku/)

[Nimbus client](https://nimbus.team/)


#### Recent research

[Ethresear.ch Consensus](https://ethresear.ch/c/consensus/29)

[Three Attacks on PoS Ethereum](https://arxiv.org/abs/2110.10086)

[Low-cost attacks on Ethereum 2.0 by sub 1/3 stakeholders](https://arxiv.org/abs/2102.02247)

[Availability/Finality dilemma](https://arxiv.org/abs/2009.04987)

[Single slot finality](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)


### Execution clients

The execution layer is concerned with executing transactions, running the EVM and generating execution payloads to pass to the consensus layer. There are many active areas of research, especially as execution clients are updated ready for the merge. This includes building out light client support, research into gas limits and incorporating new data structures (e.g. Verkle Tries).

#### Background reading

#### Client implementations

[Geth client](geth.ethereum.org)

[Nethermind client](nethermind.io)

[Besu client](https://consensys.net/quorum/developers/)

[Erigon client](https://github.com/ledgerwatch/erigon)

#### Recent research

[Database optimizations](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)

[State expiry](https://notes.ethereum.org/@vbuterin/state_expiry_eip)

[History management](https://eips.ethereum.org/EIPS/eip-4444)


### Formal verification

Formal verification is writing code to verify that Ethereum's consensus specifications are correct and bug-free. There is an executable version of the specification written in Python that requires maintenance and development. Further research can help to improve the Python implementation of the specification and add tools that can more robustly verify correctness and identify issues.

#### Background reading

#### Recent research

[Formal verification of the deposit contract](https://github.com/runtimeverification/deposit-contract-verification)

[Formal verification of the Beacon Chain specification](https://github.com/runtimeverification/deposit-contract-verification)



### Data science and analytics

There is a need for more data analysis tools and dashboards that give detailed information about activity on Ethereum and the health of the network.

### Background reading

[Dune Analytics](https://dune.com/browse/dashboards)

[Client diversity dashboard](https://clientdiversity.org/)

#### Recent research

## Apps and tooling

### DAOs

DAOs are one of the key classes of application being built on top of Ethereum. There is a lot of very active research into how they may develop to replace corporations and other traditional organizations.

#### Background reading

[Dao Collective](https://daocollective.xyz/)


#### Recent research

[Mapping the DAO ecosystem](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Developer tools

Tools for Ethereum developers are rapidly improving. There is lots of active research and development to do in this general area.

#### Background reading

[Developer Frameworks](https://ethereum.org/en/developers/docs/frameworks/)

[Consensus developer tools list](https://github.com/ConsenSys/ethereum-developer-tools-list)

#### Recent research


### App security

Hacks on Ethereum nearly always exploit vulnerabilities in individual applications rather than the base protocol. Hackers and app developers are locked in an arms race to develop new attacks and defenses. This means there is always important research and development required to keep apps safe from hacks.

#### Background reading

#### Recent research

[ethresear.ch Applications](https://ethresear.ch/c/applications/18)


### Technology stack

Apps on Ethereum are rarely fully decentralized because they rely on some centralized tooling or infrastructure. Decentralizing the full tech stack is an important research area.

#### Background reading

[Coinbase: Intro to Web3 Stack](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)

#### Recent research


### Composability

Composability is the ability for different apps to work in parallel or on top of one another so that users are not locked-in to specific protocols. This is something that requires best-practices in interoperability and data standards. This is an area that would benefit from more ongoing research and development.

#### Background reading

[Smart contract composability](https://ethereum.org/en/developers/docs/smart-contracts/composability/)

#### Recent research
