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

## Scaling and Performance

There are ongoing efforts to scale Ethereum using a variety of techniques including sharding the blockchain, danksharding and using rollups. Introductory information on scaling Ethereum is available on our [scaling page](/developers/docs/scaling).

### Layer 2

There are now several Layer 2 protocols that scale Ethereum using different techniques for batching transactions and securing them on Ethereum layer 1. This is a very rapidly growing topic with a lot of research and development potential.

#### Links

[Introduction to layer 2](/layer-2/)

[EthHub Layer-2](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/zk-rollups/)

[ethresear.ch Layer 2](https://ethresear.ch/c/layer-2/32)


### Bridges

One particular area of layer 2 that requires more research and development is safe and performant bridges. This includes bridges between various Layer-2s and bridges between Layer 1 and Layer 2. This is a particularly important area of researchg because bridges are commonly targeted by hackers.

#### Links

[Introduction to blockchain bridges](/bridges/)

[Vitalik on bridges](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)


### Sharding

Sharding Ethereum's blockchain has long been part of the development roadmap. However, new scaling solutions such as "Danksharding" are currently taking center stage. 

#### Links

[Introduction to Ethereum sharding](/upgrades/shard-chains/)

[Proto-Danksharding notes](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)

[Bankless Danksharding video](https://www.youtube.com/watch?v=N5p0TB77flM)

[Ethereum Sharding Research Compendium](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)

[Danksharding (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

### Hardware

[Running nodes](/developers/docs/nodes-and-clients/run-a-node/) on modest hardware is fundamental to keeping Ethereum decentralized. Therefore, active research into minimizing the hardware requirements to run nodes is an important area of research.

#### Links

[Ethereum on ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)


## Security

Security is a broad topic that might include spam/scam prevention, wallet security, hardware security, crypto-economic security, bug hunting and testing of applications and client software and key-management. Contributing to knowledge in these areas will help stimulate mainstream adoption.

### Cryptography & ZKP

Zero-knowledge proofs (ZKP) and cryptography are critical for building privacy and security into Ethereum and its applications. Zero-knowledge is a relatively young but fast-moving space with many open research and development opportunities.

#### Links

[0xparc blog](https://0xparc.org/blog)

[Ethresear.ch ZK](https://ethresear.ch/c/zk-s-nt-arks/13)

[zkp.science](https://zkp.science/)

[Zero Knowledge podcast](https://zeroknowledge.fm/)


### Wallets

User-wallets can be browser extensions, desktop and mobile apps or smart contracts on Ethereum. There is active research into social recovery wallets that reduce some of the risk associated with individual-user key management. Associated with dveelopment of wallets is research into alternative forms of account abstraction, which is an important area of nascent research.

#### Links

[Our Security page](https://ethereum.org/en/security/)

[ethresear.ch Security](https://ethresear.ch/tag/security)

[EIP 2938 Account Abstraction](https://eips.ethereum.org/EIPS/eip-2938)

[EIP 4337 Account Abstraction](https://eips.ethereum.org/EIPS/eip-4337)



## Community, Education and Outreach

Onboarding new users onto Ethereum requires new educational resources and approaches to outreach. This might include blog posts and articles, books, podcasts, memes, teaching resources events and anything else that builds communities, welcomes new starters and educates people about Ethereum.

### UX/UI

For Ethereum to onboard more people the UX/UI must be improved. This requires designers and UI and product experts to re-examine the design of wallets and apps.

#### Links

[Ethresear.ch UX/UI](https://ethresear.ch/c/ui-ux/24)

[Ethereum.org community page](https://ethereum.org/en/learn/)

## Economics

There are complex crypto-economic factors relating to Ethereum's native asset (ether) and the tokens built on top of it (for example NFTs and ERC20 tokens).

#### Links

[Robust Incentives Group](https://ethereum.github.io/rig/)

### PoS incentives

When Ethereum transitions to proof of stake, its native asset (ether) will be used as collateral by validators. The cryptoeconomics of this

#### Links

[Robist Incentives Group: PoS incentives](https://ethereum.github.io/beaconrunner/)

### Liquid staking and derivatives

Liquid staking allows users with less than 32 ETH to receive staking yields by swapping ether for a token representing staked ether that can be used in DeFi. However, the incentives and market dynamics associated with liquid staking as well as its effect on Ethereum's security (e.g. centralization risks, )

#### Links

[Ethresear.ch liquid staking](https://ethresear.ch/search?q=liquid%20staking)

### DeFi

Decentralized finance (DeFi) is one of the primary classes of application built on top of Ethereum. DeFi aims to create composable "money legos" that allow users to store, transfer, lend, borrow and and invest crypto-assets using smart contracts. This is a fast-moving space that is constantly updating. Research into secure, efficient and accessible protocols is constantly needed.

#### Links

[DeFi](https://ethereum.org/en/defi/)

[Coinbase: What is DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

### Fee markets

Ethereum transaction fees protect the network from spam, denial-of-service attacks and bad smart-contract code. However, it also affects the end-user by influencing the cost of interacting with Ethereum. Balancing network security with end-user user-experience is an ongoing challenge that requires further research and development. 

#### Links

[EIP 1559 (Robust Incentives Group)](https://ethereum.github.io/abm1559/notebooks/eip1559.html)


### Taxation and accounting

Crypto taxation is a complicated issue that likely requires a software solution. There are some nascent crypto accounting project but this area requires much more attention.


#### Links

[Example of taxation and accounting research: Cumming et al. 2019](https://www.mdpi.com/1911-8074/12/3/126)



## Clients and Protocol Development

### Consensus Clients

The consensus layer is concerned with the proof-of-stake mechanism securing Ethereum from the merge onwards. There is abundant ongoing research and development relating to PoS concepts and implementation, for example identifying and patching vulnerabilities, quantifying cryptoeconomic security, increasing the security or performance of client implementations, building light clients and developing staking apps.

#### Links

[Prysm client](https://docs.prylabs.network/docs/how-prysm-works/beacon-node/)

[Lighthouse client](https://lighthouse-book.sigmaprime.io/)

[Lodestar client](https://lodestar.chainsafe.io/)

[Teku client](https://consensys.net/knowledge-base/ethereum-2/teku/)

[Nimbus client](https://nimbus.team/)

[Ethresear.ch Consensus](https://ethresear.ch/c/consensus/29)


### Execution Clients

The execution layer is concerned with executing transactions, running the EVM and generating execution payloads to pass to the consensus layer. There are many active areas of research, especially as execution clients are updated ready for the merge. This includes building out light client support, research into gas limits and incorporating new data structures (e.g. Verkle Tries).

[Geth client](geth.ethereum.org)

[Nethermind client](nethermind.io)

[Besu client](https://consensys.net/quorum/developers/)

[Erigon client](https://github.com/ledgerwatch/erigon)


### Data Science and Analytics

There is a need for more data analysis tools and dashboards that give detailed information about activity on Ethereum and the health of the network.

### Links

[Dune Analytics](https://dune.com/browse/dashboards)

[Client diversity dashboard](https://clientdiversity.org/)

## Apps and Tooling

### DAOs

DAOs are one of the key classes of application being built on top of Ethereum. There is a lot of very active research into how they may develop to replace corporations and other traditional organizations.

#### Links

[Dao Collective](https://daocollective.xyz/)


### Developer tools

Tools for Ethereum developers are rapidly improving. There is lots of active research and development to do in this general area.

#### Links

[Developer Frameworks](https://ethereum.org/en/developers/docs/frameworks/)

[Consensus developer tools list](https://github.com/ConsenSys/ethereum-developer-tools-list)


### App security

Hacks on Ethereum nearly always exploit vulnerabilities in individual applications rather than the base protocol. Hackers and app developers are locked in an arms race to develop new attacks and defenses. This means there is always important research and development required to keep apps safe from hacks.

#### Links

[ethresear.ch Applications](https://ethresear.ch/c/applications/18)


### Technology stack

Apps on Ethereum are rarely fully decentralized because they rely on some centralized tooling or infrastructure. Decentralizing the full tech stack is an important research area.

#### Links

[Coinbase: Intro to Web3 Stack](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)

### Composability

Composability is the ability for different apps to work in parallel or on top of one another so that users are not locked-in to specific protocols. This is something that requires best-practices in interoperability and data standards. This is an area that would benefit from more ongoing research and development.

#### Links

[Smart contract composability](https://ethereum.org/en/developers/docs/smart-contracts/composability/)
