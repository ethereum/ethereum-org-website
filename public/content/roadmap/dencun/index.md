---
title: Cancun-Deneb (Dencun) FAQ
description: Frequently asked questions regarding the Cancun-Deneb (Dencun) network upgrade
lang: en
---

# Cancun-Deneb (Dencun) {#dencun}

Cancun-Deneb (Dencun) is an upgrade to the Ethereum network, which activates **Proto-Danksharding (EIP-4844)**, introducing temporary data **blobs** for cheaper [layer 2 (L2)](/glossary/#layer-2) rollup storage.

A new transaction type enables rollup providers to store data more cost-effectively in what are known as "blobs." Blobs are guaranteed to be available to the network for around 18 days (more precisely, 4096 [epochs](/glossary/#epoch)). After this period, blobs are pruned from the network, but applications can still verify the validity of their data using proofs. 

This significantly reduces the cost of rollups, limits chain growth, and helps to support more users while maintaining security and a decentralized set of node operators.

## When do we expect rollups to reflect lower fees due to Proto-Danksharding? {#when}

- This upgrade activated at epoch 269568, on **13-Mar-2024 at 13:55PM (UTC)**
- All major rollup providers, such as Arbitrum or Optimism, have signalled that blobs will be supported immediately following the upgrade
- The timeline for individual rollup support may vary, as each provider must update their systems to take advantage of the new blob space

## How can ETH be converted after the hard fork? {#scam-alert}

- **No Action Required for Your ETH**: Following the Ethereum Dencun upgrade, there is no need to convert or upgrade your ETH. Your account balances will remain the same, and the ETH you currently hold will remain accessible in its existing form after the hard fork.
- **Beware of Scams!** <Emoji text="⚠️" /> **anyone instructing you to "upgrade" your ETH is trying to scam you.** There is nothing you need to do in relation to this upgrade. Your assets will stay completely unaffected. Remember, staying informed is the best defense against scams.

[More on recognizing and avoiding scams](/security/)

## What problem is the Dencun network upgrade solving? {#network-impact}

Dencun primarily addresses **scalability** (handling more users and more transactions) with **affordable fees**, while **maintaining decentralization** of the network.

The Ethereum community has been taking a "rollup-centric" approach to its growth, which places layer 2 rollups as the primary means to safely support more users.

Rollup networks handle the _processing_ (or "execution") of transactions separate from Mainnet and then publish a cryptographic proof and/or compressed transaction data of the results back to Mainnet for record keeping. Storing these proofs carries an expense (in the form of [gas](/glossary/#gas)), which, before Proto-Danksharding, had to be stored permanently by all network node operators, making it an expensive task.

The introduction of Proto-Danksharding in the Dencun upgrade adds cheaper data storage for these proofs by only requiring node operators to store this data for about 18 days, after which data can be safely removed to prevent expansion of hardware requirements.  Because rollups typically have a withdrawal period of 7 days, their security model is unchanged as long as blobs are available on L1 for this duration. The 18-day pruning window provides a significant buffer for this period.

[More on scaling Ethereum](/roadmap/scaling/)

## How is old blob data accessed? {#historical-access}

While regular Ethereum nodes will always hold the _current state_ of the network, historical blob data can be discarded approximately 18 days after its introduction. Before discarding this data, Ethereum ensures that it has been made available to all network participants, allowing time for:

- Interested parties to download and store the data.
- Completion of all rollup challenge periods.
- Finalization of the rollup transactions.

_Historical_ blob data may be desired for a variety of reasons and can be stored and accessed using several decentralized protocols:

- **Third-party indexing protocols**, such as The Graph, store this data through a decentralized network of node operators incentivized by crypto-economic mechanisms.
- **BitTorrent** is a decentralized protocol where volunteers can hold and distribute this data to others.
- **[Ethereum portal network](/developers/docs/networking-layer/portal-network/)** aims to provide access to all Ethereum data through a decentralized network of node operators by distributing data among participants akin to BitTorrent.
- **Individual users** are always free to store their own copies of any data they wish for historical reference.
- **Rollup providers** are incentivized to store this data to enhance the user experience of their rollup.
- **Block explorers** typically run archival nodes that index and store all this information for easy historical reference, accessible to users via a web interface.

It is important to note that recovering historical state operates on a **1-of-N trust model**. This means that you only need data from _a single trustworthy source_ to verify its correctness using the current state of the network.

## How does this upgrade contribute to the broader Ethereum roadmap? {#roadmap-impact}

Proto-Danksharding sets the stage for the full implementation of [Danksharding](/roadmap/danksharding/). Danksharding is designed to distribute the storage of rollup data across node operators, so each operator only needs to handle a small part of the total data. This distribution will increase the number of data blobs per block, which is essential for scaling Ethereum to handle more users and transactions.

This scalability is crucial to [supporting billions of users on Ethereum](/roadmap/scaling/) with affordable fees and more advanced applications, while maintaining a decentralized network. Without these changes, the hardware demands for node operators would escalate, leading to the need for increasingly expensive equipment. This could price out smaller operators, resulting in a concentration of network control among a few large operators, which would go against the principle of decentralization.

## Does this upgrade affect all Ethereum consensus and validator clients? {#client-impact}

Yes, Proto-Danksharding (EIP-4844) requires updates to both execution clients and consensus clients. All main Ethereum clients have released versions supporting the upgrade. To maintain synchronization with the Ethereum network post-upgrade, node operators must ensure they are running a supported client version. Note that the information about client releases is time-sensitive, and users should refer to the latest updates for the most current details. [See details on supported client releases](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement#client-releases).

The consensus clients handle the _Validator_ software, which has all been updated to accommodate the upgrade.

## How does Cancun-Deneb (Dencun) affect Goerli or other Ethereum testnets? {#testnet-impact}

- Devnets, Goerli, Sepolia and Holesky have all undergone the Dencun upgrade and have Proto-Danksharding fully functioning
- Rollup developers can use these networks for EIP-4844 testing
- Most users will be completely unaffected by this change to each testnet

## Will all transactions on L2s now use temporary blob space, or will you be able to choose? {#calldata-vs-blobs}

Rollup transactions on Layer 2 (L2) of Ethereum have the option of using two types of data storage: temporary blob space or permanent smart contract calldata. Blob space is an economical choice, providing temporary storage at a lower cost. It guarantees data availability for all necessary challenge periods. On the other hand, smart contract calldata offers permanent storage but is more expensive.

The decision between using blob space or calldata is primarily made by rollup providers. They base this decision on the current demand for blob space. If blob space is in high demand, rollups may opt for calldata to ensure the data is posted in a timely manner.

While it's theoretically possible for users to choose their preferred storage type, rollup providers typically manage this choice. Offering this option to users would add complexity, particularly in cost-effective bundling transactions. For specific details on this choice, users should refer to the documentation provided by individual rollup providers.

## Will 4844 reduce L1 gas? {#l1-fee-impact}

Not significantly. A new gas market is introduced exclusively for blob space, for use by rollup providers. _Although fees on L1 may be reduced by off-loading rollup data to blobs, this upgrade primarily focuses on the reduction of L2 fees. Reduction of fees on L1 (Mainnet) may occur as a second-order effect to a lesser extent._

- L1 gas reduction will be proportional to adoption/usage of blob data by rollup providers
- L1 gas is likely to remain competitive from non-rollup related activity
- Rollups that adopt the use of blob space will demand less L1 gas, helping push L1 gas fees downward in the near-term
- Blob space is still limited, so if blobs within a block are saturated/full, then rollups may be required to post their data as permanent data in the meantime, which would drive L1 and L2 gas prices up

## Will this reduce fees on other EVM layer 1 blockchains? {#alt-l1-fee-impact}

No. The benefits of Proto-Danksharding are specific to Ethereum layer 2 rollups that store their proofs on layer 1 (Mainnet).

Simply being compatible with the Ethereum Virtual Machine (EVM) does not mean that a network will see any benefit from this upgrade. Networks that operate independently of Ethereum (whether EVM compatible or not) do not store their data on Ethereum and will not see any benefit from this upgrade.

[More about layer 2 rollups](/layer-2/)

## More of a visual learner? {#visual-learner}

<YouTube id="HT9PHWloIiU" />

_Unlocking Ethereum's Scaling, EIP-4844 — Finematics _

<YouTube id="dFjyUY3e53Q" />

_Blobspace 101 with Domothy — Bankless_

## Further reading {#further-reading}

- [EIP4844.com](https://www.eip4844.com/)
- [EIP-4844: Shard blob transactions (Proto-Danksharding)](https://eips.ethereum.org/EIPS/eip-4844)
- [Dencun Mainnet Announcement](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement) - _Ethereum Foundation blog_
- [The Hitchhiker's Guide to Ethereum: Proto-Danksharding](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum/#proto-danksharding-eip-4844) - _Jon Charbonneau_
- [Proto-Danksharding FAQ](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [An In-depth Explanation of EIP-4844: The Core of the Cancun Upgrade](https://medium.com/@ebunker.io/an-in-depth-explanation-of-eip-4844-the-core-of-the-cancun-upgrade-de7b13761d2c) - _Ebunker_
- [AllCoreDevs Update 016](https://tim.mirror.xyz/HzH5MpK1dnw7qhBSmzCfdCIxpwpD6DpwlfxtaAwEFro) - _Tim Beiko_
