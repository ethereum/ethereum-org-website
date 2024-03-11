---
title: Cancun-Deneb (Dencun) FAQ
description: Frequently asked questions regarding the Cancun-Deneb (Dencun) network upgrade
lang: en
---

# Cancun-Deneb (Dencun) {#dencun}

Cancun-Deneb (Dencun) is an upgrade to the Ethereum network which activates **Proto-Danksharding (EIP-4844)**, introducing data **blobs** for cheaper layer 2 (L2) rollup storage.

A new transaction type enables rollup providers to store data in a more cost-effective manner, in what are known as "blobs", which are guaranteed to be made available to the network, but can be discarded after a couple weeks.

This significantly reduces the cost of using rollups, limits chain growth, and helps to support more users while maintaining security and a decentralized set of node operators.

## When do we expect that rollups will reflect lower fees as a result of Proto-Danksharding? {#when}

- This upgrade is set for activation at start of [epoch](/glossary/#epoch) 269568, occurring on **13-Mar-2024 (UTC)**
- All major rollup providers, such as Arbitrum or Optimism, have signaled that blobs will be supported immediately following the upgrade
- Individual rollup support may vary as each rollup must upgrade to take advantage of the new blob space

## How can ETH be converted after the hard fork? {#scam-alert}

- **There is NO need to convert your ETH**. Your account balances will not change, and the ETH you hold will continue to be available in the same form after the upgrade (hard fork).
- <Emoji text="⚠️" /> <strong>Anyone telling you to upgrade your ETH is attempting to scam you!</strong> Users do not need to do anything for this upgrade, and your assets will remain unaffected.

[More on recognizing and avoiding scams](/security/)

## What problem is the Dencun network upgrade solving? {#network-impact}

Dencun primarily addresses **scalability** (handling more users and more transactions) with **affordable fees**, while **maintaining decentralization** of the network.

The Ethereum community has been taking a "rollup-centric" approach to its growth, which places layer 2 rollups as the primary means to safely support more users.

Rollup networks handle the _processing_ (or "execution") of transactions separate from Mainnet, and then publish a cryptographic proof of the results back to Mainnet for record keeping. Storing these proofs carries an expense (in the form of [gas](/glossary/#gas)), which prior to Proto-Danksharding had to be stored permanently by all network node operators, making it an expensive task.

The introduction of Proto-Danksharding in the Dencun upgrade adds cheaper data storage for these proofs by only requiring node operators to store this data for about 18 days, after which is can safely be removed to prevent expansion of hardware requirements.

[More on scaling Ethereum](/roadmap/scaling/)

## How does this upgrade contribute to the broader Ethereum roadmap? {#roadmap-impact}

Proto-Danksharding sets the stage for the full implementation of [Danksharding](/roadmap/danksharding/), which splits up the burden of storing rollup data amongst node operators, so each only has to handle a small portion of the total. This will <!-- TIME-SENSITIVE --> enable significantly more data blobs per block, and help Ethereum grow by another order of magnitude.

This is critical to [scale Ethereum to support billions of users](/roadmap/scaling/) with affordable fees and more advanced applications, while maintaining a decentralized network of participants. Without this, hardware requirements for node operators would continue to climb over time, requiring more-and-more expensive machinery to operate, pricing out users who would [otherwise participate](/run-a-node/). This would consolidate node operators to a select few who could afford the hardware, hindering decentralization.

## Does this upgrade affect all Ethereum consensus and validator clients? {#client-impact}

Yes. Proto-Danksharding (EIP-4844) involves changes to both the execution clients _and_ consensus clients. All production Ethereum clients have released updates to support the upgrade. Node operators must upgrade to a supported version to stay in sync with the chain after the upgrade. <!-- TIME-SENSITIVE --> [See details on supported client releases](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement#client-releases)

_Validator_ software is handled by the consensus clients, which have all been updated to accommodate the upgrade.

## How does Cancun-Deneb (Dencun) affect Goerli or other Ethereum testnets? {#testnet-impact}

- Devnets, Goerli, Sepolia and Holesky have all undergone the Dencun upgrade and have Proto-Danksharding fully functioning
- Rollup developers can use these networks for EIP-4844 testing
- Most users will be completely unaffected by this change to each testnet

## What is the economic impact for the included Ethereum Improvement Proposals (EIPs)? {#economic-impact}

### Cancun (Execution) {#economic-impact-cancun}

[EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) - *Shard blob transactions (Proto-Danksharding)*

- Introduction and utilization of blob-space reduces L1 gas demand in the near-term, making all transactions less expensive on average <!-- See below -->
- Lower L1 gas costs means the amount of ETH burned from transaction fees is also reduced, making ETH less deflationary
- Lower gas costs make the network more accessible to new users and new use cases, reflexively increasing demand for block space over time

[EIP-7516](https://eips.ethereum.org/EIPS/eip-7516) - *Blob base fee opcode*

- Introduces a new fee market, similar to the EIP-1559 mechanism, dedicated to pricing blob space
- This offloads demand for traditional L1 block space, reducing fees and reducing the amount of ETH burned on average

### Deneb (Consensus) {#economic-impact-deneb}

[EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) - [See above](#economic-impact-cancun)

[EIP-7044](https://eips.ethereum.org/EIPS/eip-7044) - *Perpetually valid signed voluntary exits*

- This reduces the trust assumptions for users of pooled staking or staking-as-a-service platforms by providing a self-sovereign means of exiting validator funds without any permission from a third-party node operator
- In the event this encourages more users to stake, the increase in total ETH staked will increase the issuance of new ETH
- In the event users are more likely to exit staking, this will decrease the total ETH staked, reducing the issuance of new ETH

[EIP-7514](https://eips.ethereum.org/EIPS/eip-7514) - *Add max epoch churn limit*

- This caps the rate at which new ETH can be staked
- ETH issuance is proportional to the total amount of ETH staked, thus this limitation will slow the potential issuance of new ETH
- This does NOT mean that new validators cannot join, but removes the exponential climb in how many are allowed to join at a time

## Would this reduce layer 1 (L1) gas fees in any way? {#l1-fee-impact}

Yes, but significantly less than on layer 2 rollups. A new gas market is introduced exclusively for blob space, for use by rollup providers. This reduces the demand from these rollups for L1 block space, pushing gas prices downward.

_Although fees on L1 may be reduced by off-loading rollup data to blobs, this upgrade primarily focuses on the reduction of L2 fees. Reduction of fees on L1 (Mainnet) may occur as a second-order effect._

- L1 gas reduction will be proportional to adoption/usage of blob data by rollup providers
- L1 gas is likely to remain competitive from non-rollup related activity
- Rollups that adopt the use of blob space will demand less L1 gas, helping push L1 gas fees downward in the near-term
- Blob space is still limited, so if blobs in a block are saturated/full, then rollups may be required to post their data as permanent data again, which will drive L1 and L2 gas prices up

## Will this reduce fees on other EVM layer 1 blockchains? {#alt-l1-fee-impact}

No. The benefits of Proto-Danksharding are specific to Ethereum layer 2 rollups that store their proofs on layer 1 (Mainnet).

Simply being compatible with the Ethereum Virtual Machine (EVM) does not mean that a network will see any benefit from this upgrade. Networks that operate independently of Ethereum (whether EVM compatible or not), such as Polygon PoS, Binance Smart Chain, Solana, Avalanche, or Gnosis Chain, do not store their data on Ethereum and will not see any benefit from this upgrade.

[More about layer 2 rollups](/layer-2/)

## More of a visual learner? {#visual-learner}

<YouTube id="HT9PHWloIiU" />

_Finematics: Unlocking Ethereum's Scaling, EIP-4844_

<YouTube id="dFjyUY3e53Q" />

_Bankless: Blobspace 101 with Domothy_

## Further reading {#further-reading}

- [EIP4844.com](https://www.eip4844.com/)
- [EIP-4844: Shard blob transactions (Proto-Danksharding)](https://eips.ethereum.org/EIPS/eip-4844)
- [Dencun Mainnet Announcement](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement) - _Ethereum Foundation blog_
- [The Hitchhiker's Guide to Ethereum: Proto-Danksharding](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum/#proto-danksharding-eip-4844) - _Jon Charbonneau_
- [Proto-Danksharding FAQ](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [An In-depth Explanation of EIP-4844: The Core of the Cancun Upgrade](https://medium.com/@ebunker.io/an-in-depth-explanation-of-eip-4844-the-core-of-the-cancun-upgrade-de7b13761d2c) - _Ebunker_