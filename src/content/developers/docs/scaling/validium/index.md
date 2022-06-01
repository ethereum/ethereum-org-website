---
title: Validium
description: An introduction to Validium as a scaling solution currently utilized by the Ethereum community.
lang: en
sidebar: true
incomplete: true
sidebarDepth: 3
---

Validium is a [scaling solution](/developers/docs/scaling/) that enforces integrity of transactions using validity proofs like [ZK-rollups](/developers/docs/scaling/zk-rollups/), but doesn’t store transaction data on the Ethereum Mainnet. While off-chain data availability introduces trade-offs, it can lead to massive improvements in scalability (validiums can process ~ 9,000 transactions, or more, per second). 

## Prerequisites {#prerequisites}

You should have a good understanding of all the foundational topics and a high-level understanding of [Ethereum scaling](/developers/docs/scaling/). Implementing scaling solutions such as Validium is an advanced topic as the technology is less battle-tested, and continues to be researched and developed.

## How does validium work? {#how-does-validium-work}

Validiums are a zero-knowledge proof scaling solution that uses off-chain data availability and computation designed to improve throughput by processing transactions off the Ethereum Mainnet. Off-chain transactions executed on the validium chain are verified via a smart contract on the base Ethereum layer using zero-knowledge proofs, which can be SNARKs (Succinct Non-Interactive Argument of Knowledge) or STARKs (Scalable Transparent ARgument of Knowledge). 

More on [zero-knowledge proofs](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/).

As with ZK-rollups, validity proofs prevent invalid state transitions on validium chains and enhance security guarantees available to users. For instance, a malicious operator cannot steal funds since users can always withdraw funds directly from the on-chain contract [using Merkle proofs](/developers/tutorials/merkle-proofs-for-offline-data-integrity/). 

However, user funds can be frozen, particualarly if the data availability managers on the validium chain withold off-chain data from users. This is the major difference between validiums and ZK-rollups—their positions on the data availability spectrum. Both solutions approach data storage differently, which has implications for security and trustlessness. 

### On-chain vs off-chain data availability {#on-chain-vs-off-chain-data-availability}

**ZK-rollups** bundle (or "roll-up") off-chain transaction data to Ethereum Mainnet as `calldata`. This information can be used to recreate the state of the rollup, if necessary, to prove the validity (or lack thereof) of a specific state transition. As the data is anchored on Ethereum (**on-chain data availability**), ZK-rollups directly benefit from Ethereum’s security and data availability guarantees—funds are always secure if Mainnet is operational.

**Validiums** store all transaction data off Ethereum Mainnet (**off-chain data availability**). This improves throughput and reduces the costs on validium chains since calldata is not posted to Ethereum Mainnet. 

Off-chain data availability does present a problem: data necessary for creating or verifying Merkle proofs may be unavailable. This means users may be unable to withdraw funds from the rollup contract if operators should act maliciously. Various validium solutions attempt to solve this problem by holding off-chain data with trusted parties or randomly assigned validators, who are expected to provide proofs of data availability. 

#### Data availability committee (DAC)

To guarantee the availability of off-chain data, some validium solutions appoint a group of  trusted entities, collectively known as a data availability committee (DAC), to store copies of the state and provide proof of data availability. Users must trust these entities to make the data available when needed. There's the possibility of members of data availability committees [getting compromised by a malicious actor](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view) who can then withhold off-chain data. 

[More on data availability committees in validiums](https://medium.com/starkware/data-availability-e5564c416424). 

#### Bonded data availability

Other validiums require participants charged with storing offline data to stake (i.e., lock up) tokens in a smart contract before assuming their roles. This stake serves as a “bond” to guarantee honest behavior among data availability managers, and reduces trust assumptions. If these participants fail to prove data availability, the bond is slashed. 

In a bonded data availability scheme, anyone can be assigned to hold off-chain data once they provide the required stake. This expands the pool of eligible data availability managers, reducing the centralization that affects data availability committees (DACs). More importantly, this approach relies on cryptoeconomic incentives to prevent malicious activity, which is considerably more secure than appointing trusted parties to secure offline data in the validium. 

[More on bonded data availability in validiums](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf). 

## Volitions and validium

Validiums offer many benefits, but come with trade-offs (most notably, data availability). But, as with many scaling solutions, validiums are suited to specific use-cases—which is why volitions were created. 

Volitions combine a ZK-rollup and validium chain and allow users to switch between the two scaling solutions. With volitions, users can take advantage of validium's off-chain data availability for certain transactions, while retaining the freedom to switch to an on-chain data availability solution (ZK-rollup) if needed. This essentially gives users freedom to choose trade-offs as dictated by their unique circumstances. 

A decentralized exchange (DEX) may prefer using a validium’s scalable and private infrastructure for high-value trades. It can also use a ZK-rollup for users who want a ZK-rollup's higher security guarantees and trustlessness. 

## Pros and cons of validium {#pros-and-cons-of-validium}
| Pros                                                                                                      | Cons                                                                                                                                     |
| --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| No withdrawal delay (no latency to on-chain/cross-chain tx); consequent greater capital efficiency.       | Limited support for general computation/smart contracts; specialized languages required.                                                 |
| Not vulnerable to certain economic attacks faced by fraud-proof based systems in high-value applications. | High computational power required to generate ZK proofs; not cost effective for low throughput applications.                             |
| Reduces gas fees for users by not posting calldata to Ethereum Mainnet.                          | Slower subjective finality time (10-30 min to generate a ZK proof) but faster to full finality because there is no dispute time delay. |
| Suitable for specific use-cases, like trading or blockchain gaming that prioritize transaction privacy and scalability. | Generating a proof requires off-chain data to be available at all times.                                                   |
|                                                                               |                           Security relies on trust assumptions and cryptoeconomic incentives, unlike ZK-rollups, which rely on cryptographic security mechanisms. 

### Use Validium/Volitions {#use-validium-and-volitions}

Multiple projects provide implementations of Validium and volitions that you can integrate into your dapps:

**StarkWare StarkEx** - _StarkEx is an Ethereum Layer 2 (L2) scalability solution that is based on validity proofs. It can operate in either ZK-Rollup or Validium data-availability modes._
- [Documentation](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [Website](https://starkware.co/starkex/)

**Matter Labs zkPorter**-  _zkPorter is a Layer 2 scaling protocol tackling data availability with a hybrid approach that combines the ideas of zkRollup and sharding. It can support arbitrarily many shards, each with its own data availability policy._
- [Documentation](https://docs.zksync.io/zkevm/#what-is-zkporter)
- [Website](https://zksync.io/)

## Further reading {#further-reading}

- [Validium And The Layer 2 Two-By-Two — Issue No. 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [ZK-rollups vs Validium](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [Volition and the Emerging Data Availability spectrum](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [Rollups, Validiums and Volitions: Learn About the Hottest Ethereum Scaling Solutions](https://www.defipulse.com/blog/rollups-validiums-and-volitions-learn-about-the-hottest-ethereum-scaling-solutions)
