---
title: "Rollups: the ultimate Ethereum scaling strategy?"
description: "A deep dive into rollups as Ethereum's primary scaling strategy. This video explains how optimistic rollups (Arbitrum, Optimism) and zero-knowledge rollups work."
lang: en
youtubeId: "7pWxCklcNsU"
uploadDate: 2021-04-14
duration: "0:16:37"
educationLevel: intermediate
topic:
  - "scaling"
  - "rollups"
  - "optimistic-rollups"
  - "zk-rollups"
format: explainer
author: Finematics
breadcrumb: "Rollups"
---

An explainer by **Finematics** covering rollups as Ethereum's primary scaling strategy. The video compares optimistic rollups (Arbitrum, Optimism) with ZK rollups, and examines why rollups have become the dominant method for scaling Ethereum.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=7pWxCklcNsU) published by Finematics. It has been lightly edited for readability.*

#### Layer 2 (1:17) {#layer-2-117}

Ethereum scaling has been one of the most discussed topics in crypto. The scaling debate usually heats up during periods of high network activity such as the CryptoKitties craze in 2017, DeFi Summer of 2020, or the crypto bull market at the beginning of 2021. During these periods, the unparalleled demand for the Ethereum network resulted in extremely high gas fees, making it expensive for everyday users to pay for their transactions.

To tackle this problem, the search for the ultimate scaling solution has been one of the top priorities for multiple teams and the Ethereum community as a whole.

In general, there are three main ways to scale Ethereum — or in fact, most other blockchains: scaling the blockchain itself (layer 1 scaling), building on top of layer 1 (layer 2 scaling), and building on the side of layer 1 (sidechains).

#### Outside of layer 1 (1:58) {#outside-of-layer-1-158}

When it comes to layer 1, Eth2 is the chosen solution for scaling the Ethereum blockchain. Eth2 refers to a set of interconnected changes such as the migration to proof of stake, merging the state of the proof-of-work blockchain into the new proof-of-stake chain, and sharding. Sharding, in particular, can dramatically increase the throughput of the Ethereum network, especially when combined with rollups.

When it comes to scaling outside of layer 1, multiple different scaling solutions have been tried with some mixed results. On the one hand, we have layer 2 solutions such as channels that are fully secured by Ethereum but work well only for a specific set of applications. Sidechains, on the other hand, are usually EVM-compatible and can scale general-purpose applications. The main drawback is that they are less secure than layer 2 solutions by not relying on the security of Ethereum and instead having their own consensus models.

Most rollups aim at achieving the best of these two worlds by creating a general-purpose scaling solution while still fully relying on the security of Ethereum. This is the holy grail of scaling, as it allows for deploying all of the existing smart contracts present on Ethereum to a rollup with little or no changes while not sacrificing security. No wonder rollups are probably the most anticipated scaling solution of them all.

A rollup is a type of scaling solution that works by executing transactions outside of layer 1 but posting transaction data on layer 1. This allows the rollup to scale the network and still derive its security from the Ethereum consensus. Moving computation off-chain allows for essentially processing more transactions in total, as only some of the data of the rollup transactions has to fit into the Ethereum blocks.

To achieve this, rollup transactions are executed on a separate chain that can even run a rollup-specific version of the EVM. The next step after executing transactions on a rollup is to batch them together and post them to the main Ethereum chain. The whole process essentially executes transactions, takes the data, compresses it, and rolls it up to the main chain in a single batch — hence the name "rollup."

Each rollup deploys a set of smart contracts on layer 1 that are responsible for processing deposits and withdrawals and verifying proofs. Proofs are also where the main distinction between different types of rollups comes into play. Optimistic rollups use fraud proofs, while ZK rollups use validity proofs.

#### Optimistic rollups (4:26) {#optimistic-rollups-426}

Optimistic rollups post data to layer 1 and assume it's correct — hence the name "optimistic." If the posted data is valid, we are on the happy path and nothing else has to be done. The optimistic rollup benefits from not having to do any additional work in the optimistic scenario.

In case of an invalid transaction, the system has to be able to identify it, recover the correct state, and penalize the party that submits such a transaction. To achieve this, optimistic rollups implement a dispute resolution system that is able to verify fraud proofs, detect fraudulent transactions, and disincentivize bad actors from submitting other invalid transactions or incorrect fraud proofs.

In most optimistic rollup implementations, the party that is able to submit batches of transactions to layer 1 has to provide a bond, usually in the form of ETH. Any other network participant can submit a fraud proof if they spot an incorrect transaction. After a fraud proof is submitted, the system enters the dispute resolution mode. In this mode, the suspicious transaction is executed again — this time on the main Ethereum chain. If the execution proves that the transaction was indeed fraudulent, the party that submitted this transaction is punished, usually by having their bonded ETH slashed.

To prevent bad actors from spamming the network with incorrect fraud proofs, parties wishing to submit fraud proofs usually also have to provide a bond that can be subject to slashing.

In order to be able to execute a rollup transaction on layer 1, optimistic rollups have to implement a system that is able to replay a transaction with the exact state that was present when the transaction was originally executed on the rollup. This is one of the complicated parts of optimistic rollups and is usually achieved by creating a separate manager contract that replaces certain function calls with a state from the rollup.

The system can work as expected and detect fraud even if there is only one honest party that monitors the state of the rollup and submits fraud proofs if needed. Due to the correct incentives within the rollup system, entering the dispute resolution process should be an exceptional situation and not something that happens all the time.

When it comes to ZK rollups, there is no dispute resolution at all. This is possible by leveraging a clever piece of cryptography called zero-knowledge proofs — hence the name ZK rollups. In this model, every batch posted to layer 1 includes a cryptographic proof called a ZK-SNARK. The proof can be quickly verified by the layer 1 contract when the transaction batch is submitted, and invalid batches can be rejected straight away.

#### Other differences (7:28) {#other-differences-728}

Due to the nature of the dispute resolution process, optimistic rollups have to give enough time to all network participants to submit fraud proofs before finalizing a transaction on layer 1. This period is usually quite long — to make sure that even in the worst-case scenario, fraudulent transactions can still be disputed. This causes withdrawals from optimistic rollups to be quite long, as users have to wait as much as a week or two to be able to withdraw their funds back to layer 1.

Fortunately, there are a few projects working to improve this situation by providing fast "liquidity exits." These projects offer almost instant withdrawals back to layer 1, another layer 2, or even a sidechain and charge a small fee for the convenience. The Hop Protocol and Connext are the projects to look at.

ZK rollups don't have the problem of long withdrawals, as the funds are available for withdrawals as soon as the rollup batch, together with a validity proof, is submitted to layer 1.

However, ZK rollups come with their own drawbacks. Due to the complexity of the technology, it's much harder to create an EVM-compatible ZK rollup, which makes it more difficult to scale general-purpose applications without having to rewrite the application logic. That said, zkSync is making significant progress in this area and they might be able to launch an EVM-compatible ZK rollup quite soon.

Optimistic rollups have a somewhat easier time with EVM compatibility. They still have to run their own version of the EVM with a few modifications, but 99% of contracts can be ported without making any changes. ZK rollups are also much more computation-heavy than optimistic rollups, meaning that nodes that compute ZK proofs have to be high-spec machines, making it hard for other users to run them.

#### Scaling improvements (9:32) {#scaling-improvements-932}

When it comes to scaling improvements, both types of rollups should be able to scale Ethereum from around 15–45 transactions per second (depending on the transaction type) up to as many as 1,000–4,000 transactions per second. It's worth noting that it is possible to process even more transactions per second by offering more space for rollup batches on layer 1.

This is also why Eth2 can create a massive synergy with rollups, as it increases the possible data availability space by creating multiple shards — each one of them able to store a significant amount of data. The combination of Eth2 and rollups could bring Ethereum's transaction speed up to as many as 100,000 transactions per second.

Optimism and Arbitrum are currently the most popular options when it comes to optimistic rollups. Optimism has been partially rolled out to the Ethereum mainnet with a limited set of partners such as Synthetix and Uniswap to ensure that the technology works as expected before the full launch. Arbitrum already deployed its version to the mainnet and started onboarding different projects into its ecosystem.

Some of the most notable projects launching on Arbitrum include Uniswap, Sushi, Bancor, Augur, Chainlink, Aave, and many more. Arbitrum has also announced its partnership with Reddit, focusing on launching a separate rollup chain to scale their reward system. Optimism is partnering with MakerDAO to create the Optimism Dai Bridge and enable fast withdrawals of DAI and other tokens back to layer 1.

Although both Arbitrum and Optimism try to achieve the same goal — building EVM-compatible optimistic rollup solutions — there are a few differences in their design. Arbitrum has a different dispute resolution model. Instead of rerunning a whole transaction on layer 1 to verify if the fraud proof is valid, they have come up with an interactive multi-round model which allows narrowing down the scope of the dispute and potentially executing only a few instructions on layer 1 to check if a suspicious transaction is valid.

Another major difference is the approach to handling transaction ordering and MEV. Arbitrum will initially run a sequencer responsible for ordering transactions, but they want to decentralize it in the long run. Optimism prefers another approach where the ordering of transactions — and hence the MEV — can be auctioned off to other parties for a certain period of time.

#### ZK rollups (13:10) {#zk-rollups-1310}

Although it looks like the Ethereum community is mostly focusing on optimistic rollups — at least in the short run — the projects working on ZK rollups are also progressing extremely quickly.

Loopring uses ZK rollup technology to scale its exchange and payment protocol. Hermez and ZKTube are working on scaling payments using ZK rollups, with Hermez also building an EVM-compatible ZK rollup. Aztec is focusing on bringing privacy features to their ZK rollup technology.

StarkWare-based rollups are already extensively used by projects such as DeversiFi, Immutable X, and dYdX. As mentioned earlier, zkSync is working on an EVM-compatible virtual machine that will be able to fully support any arbitrary smart contracts written in Solidity.

#### DeFi (14:02) {#defi-1402}

Rollups should also have a big impact on DeFi. Users who were previously not able to transact on Ethereum due to high transaction fees will be able to stay in the ecosystem the next time network activity is high. Rollups will also enable a new breed of applications that require cheaper transactions and faster confirmation time — all while being fully secured by the Ethereum consensus. It looks like rollups may trigger another high-growth period for DeFi.

#### Challenges (14:29) {#challenges-1429}

There are, however, a few challenges when it comes to rollups. Composability is one of them — in order to compose a transaction that uses multiple protocols, all of them would have to be deployed on the same rollup.

Another challenge is fractured liquidity. Without new money coming into the Ethereum ecosystem as a whole, the existing liquidity present on layer 1 in protocols such as Uniswap or Aave will be shared between layer 1 and multiple rollup implementations. Lower liquidity usually means higher slippage and worse trade execution.

This also means that naturally there will be winners and losers. At the moment, the existing Ethereum ecosystem is not big enough to make use of all scaling solutions. This may — and probably will — change in the long run, but in the short run, we may see some rollups and other scaling solutions becoming ghost towns. In the future, we may also see users living entirely within one rollup ecosystem and not interacting with the main Ethereum chain and other scaling solutions for long periods of time.

#### Threat to sidechains (15:44) {#threat-to-sidechains-1544}

One question that comes up very often when discussing rollups is whether they are a threat to sidechains. Sidechains will still have their place in the Ethereum ecosystem. Although the cost of transactions on layer 2 will be much lower than on layer 1, it will most likely still be high enough to price out certain types of applications such as games and other high-volume apps. This may change when Ethereum introduces sharding, but by then sidechains may create enough network effect to survive long term.

Also, the fees on rollups are higher than on sidechains because each rollup batch still has to pay for Ethereum block space. The Ethereum community puts a huge focus on rollups in the Ethereum scaling strategy — at least in the short to mid-term and potentially even longer.
