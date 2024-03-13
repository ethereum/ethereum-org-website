---
title: Cancun-Deneb (Dencun) FAQ
description: Frequently asked questions regarding the Cancun-Deneb (Dencun) network upgrade
lang: en
---

# Cancun-Deneb (Dencun) {#dencun}

Cancun-Deneb (Dencun) is an upgrade to the Ethereum network which activates **Proto-Danksharding (EIP-4844)**, introducing temporary data **blobs** for cheaper layer 2 (L2) rollup storage.

A new transaction type enables rollup providers to store data in a more cost-effective manner, in what are known as "blobs". These are guaranteed to be made available to the network for a few weeks, or more precisely, 4096 [epochs](/glossary/#epoch). After this period, blobs are pruned from the network but applications can still verify the validity of their data using proofs. 

This significantly reduces the cost of using rollups, limits chain growth, and helps to support more users while maintaining security and a decentralized set of node operators.

## When do we expect that rollups will reflect lower fees as a result of Proto-Danksharding? {#when}

- This upgrade actives at epoch 269568, on **13-Mar-2024 (UTC)**
- All major rollup providers, such as Arbitrum or Optimism, have signaled that blobs will be supported immediately following the upgrade
- Individual rollup support may vary as each rollup must upgrade to take advantage of the new blob space

## How can ETH be converted after the hard fork? {#scam-alert}

- **There is NO need to convert your ETH** after Ethereum's Dencun upgrade. Your account balances will not change, and the ETH you hold will continue to be available in the same form after the upgrade (hard fork).
- <Emoji text="⚠️" /> <strong>Anyone telling you to upgrade your ETH is attempting to scam you!</strong> Users do not need to do anything for this upgrade, and your assets will remain unaffected.

[More on recognizing and avoiding scams](/security/)

## What problem is the Dencun network upgrade solving? {#network-impact}

Dencun primarily addresses **scalability** (handling more users and more transactions) with **affordable fees**, while **maintaining decentralization** of the network.

The Ethereum community has been taking a "rollup-centric" approach to its growth, which places layer 2 rollups as the primary means to safely support more users.

Rollup networks handle the _processing_ (or "execution") of transactions separate from Mainnet, and then publish a cryptographic proof and/or compressed transaction data of the results back to Mainnet for record keeping. Storing these proofs carries an expense (in the form of [gas](/glossary/#gas)), which prior to Proto-Danksharding had to be stored permanently by all network node operators, making it an expensive task.

The introduction of Proto-Danksharding in the Dencun upgrade adds cheaper data storage for these proofs by only requiring node operators to store this data for about 18 days, after which data can be safely removed to prevent expansion of hardware requirements.  Because rollups typically have a withdrawal period of 7 days, their security model is unchanged as long as blobs are available on L1 for this duration. The 18 day pruning window provides a significant buffer to this period.

[More on scaling Ethereum](/roadmap/scaling/)

## How is old blob data accessed? {#historical-access}

While regular Ethereum nodes will always hold the _current state_ of the network, historical blob data can be discarded after ~18 days. Before it can be discarded, Ethereum guarantees that this data has been made available to all network participants, to allow time for:

- interested parties to download and store the data.
- all rollup challenge periods to be completed.
- and the rollup transactions to be considered finalized.

_Historical_ blob data may be desired for a variety of reasons, and can be stored and accessed using several decentralized protocols:

- **Third-party indexing protocols**, such as The Graph, can store this data using a decentralized set of node operators using crypto-economic incentives
- **Bittorrent** is a decentralized protocol consisting of volunteers who can hold and serve this data for others
- **[Ethereum portal network](/developers/docs/networking-layer/portal-network/)** aims to provide access to all Ethereum data through a decentralized network of node operators, by means of splitting up data amongst participants, similar to Bittorrent
- **Individual users** are always free to store their own copy of any data they would like for historical reference
- **Rollup providers** are incentivized to store this data to improve the user experience of their rollup
- **Block explorers** typically run archival nodes that will index and store all of this information for easy historical reference, made available to users through a web interface

It is important to note, that recovering historical state is a **1-of-N trust modal**, meaning that you only need _a single honest actor_ to provide the data, and then _anyone can verify it_ to be correct using the current state of the network.

## How does this upgrade contribute to the broader Ethereum roadmap? {#roadmap-impact}

Proto-Danksharding sets the stage for the full implementation of [Danksharding](/roadmap/danksharding/), which splits up the burden of storing rollup data amongst node operators, so each only has to handle a small portion of the total. This will <!-- TIME-SENSITIVE --> enable significantly more data blobs per block, and help Ethereum grow by another order of magnitude.

This is critical to [scale Ethereum to support billions of users](/roadmap/scaling/) with affordable fees and more advanced applications, while maintaining a decentralized network of participants. Without this, hardware requirements for node operators would continue to climb over time, requiring more-and-more expensive machinery to operate, pricing out users who would [otherwise participate](/run-a-node/). This would consolidate node operators to a select few who could afford the hardware, hindering decentralization.

## Does this upgrade affect all Ethereum consensus and validator clients? {#client-impact}

Yes. Proto-Danksharding (EIP-4844) involves changes to both the execution clients and consensus clients. All production Ethereum clients have released updates to support the upgrade. Node operators must upgrade to a supported version to stay in sync with the chain after the upgrade. <!-- TIME-SENSITIVE --> [See details on supported client releases](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement#client-releases)

_Validator_ software is handled by the consensus clients, which have all been updated to accommodate the upgrade.

## How does Cancun-Deneb (Dencun) affect Goerli or other Ethereum testnets? {#testnet-impact}

- Devnets, Goerli, Sepolia and Holesky have all undergone the Dencun upgrade and have Proto-Danksharding fully functioning
- Rollup developers can use these networks for EIP-4844 testing
- Most users will be completely unaffected by this change to each testnet

## Will all transactions on L2s now use temporary blob space, or will you be able to choose? {#calldata-vs-blobs}

Rollup transactions are not required to use blob space for their data (though they are economically incentivized to do so). Each can optionally write their data to blobs (guaranteed available for all challenge periods, very cheap) or to smart contract "calldata" (permanent storage, more expensive). Rollup providers will decide which to use based on the current demand for blob space. If blobs are in high demand, the rollup may decide to use calldata to ensure the data is posted in a timely manner.

Although this decision is likely to be performed behind-the-scenes by rollup providers, it is theoretically possible for a user to choose which storage type to use. This would require the rollup provider to expose this option to the user, which introduces additional complexities when bundling transactions in a cost-effective manner. See individual rollup provider documentation for more details.

## Will 4844 reduce L1 gas? {#l1-fee-impact}

Yes, but significantly less than on layer 2 rollups. A new gas market is introduced exclusively for blob space, for use by rollup providers. This reduces the demand from these rollups for L1 block space, pushing gas prices downward.

_Although fees on L1 may be reduced by off-loading rollup data to blobs, this upgrade primarily focuses on the reduction of L2 fees. Reduction of fees on L1 (Mainnet) may occur as a second-order effect to a lesser extent._

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
