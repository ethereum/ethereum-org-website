---
title: Optimistic Rollups
description: An introduction to optimistic rollups, a scaling solution used by the Ethereum community. 
lang: en
sidebar: true
---

Optimistic rollups are off-chain protocols designed to extend throughput of Ethereum's base layer. They reduce computation on the main Ethereum chain by processing transactions off-chain, offering significant improvements in processing speeds. Unlike other scaling solutions, such as [sidechains](/developers/docs/scaling/sidechains/), optimistic rollups derive security from Mainnet by publishing transaction results on-chain. 

As computation is the slow, expensive part of using Ethereum, optimistic rollups can offer up to 10-100x improvements in scalability. Optimistic rollups also write transactions to Ethereum as `calldata`, reducing gas costs for users. 

## Prerequisites {#prerequisites}

You should have a good understanding of all the foundational topics and a high-level understanding of [Ethereum scaling](/developers/docs/scaling/). Implementing scaling solutions such as rollups is an advanced topic as the technology is less battle-tested and continues to be researched and developed.

Looking for a more beginner-friendly resource? See our [introduction to layer 2](/layer-2/).

## What is an optimistic rollup? {#what-is-an-optimistic-rollup} 

An optimistic rollup is an approach to scaling Ethereum that involves moving computation and state storage off-chain. Optimistic rollups execute transactions outside of Ethereum, but post transaction data to Mainnet as `calldata`

Optimistic rollup operators bundle multiple off-chain transactions together in large batches before submitting to Ethereum. This approach enables spreading fixed costs across multiple transactions in each batch, reducing fees for end-users. Optimistic rollups also use compression techniques to reduce the amount of data posted on Ethereum. 

Optimistic rollups are considered “optimistic” because they assume off-chain transactions are valid and don't publish proofs of validity for transaction batches posted on-chain. This separates optimistic rollups from [zero-knowledge rollups](/developers/docs/scaling/zk-rollups) that publish cryptographic [proofs of validity](/glossary/#validity-proof) for off-chain transactions. 

Optimistic rollups instead rely on a fraud-proving scheme to detect malicious transactions. After a rollup batch is submitted on Ethereum, there's a time window (called a challenge period) during which anyone can challenge the validity of a rollup transaction by computing a [fraud proof](/glossary/#fraud-proof). 

If the fraud proof succeeds, the rollup protocol reverses the invalid block and punishes the malicious operator. If the rollup batch remains unchallenged after the challenge period elapses, it is deemed valid and accepted on Ethereum. The rollup will advance to a new state and the operator can start adding new blocks. 

## How do optimistic rollups interact with Ethereum? {#optimistic-rollups-and-Ethereum} 

An optimistic rollup is an off-chain protocol managed by a set of smart contracts deployed on the Ethereum network. Transactions executed off-chain are added to a record stored in the main rollup contract. Like the Ethereum blockchain, this transaction record is immutable and forms the "optimistic rollup chain."

Although optimistic rollups exist as separate protocols, they are secured by the Ethereum network. Among other things, Ethereum guarantees the correctness of a rollup’s off-chain computation and the availability of data behind the computation. 

### Data availability {data-availability}

As mentioned, optimistic rollups post transaction data to Ethereum as `calldata`. Since the rollup chain's execution is based on submitted transactions, anyone can use this information—anchored on Ethereum’s base layer—to execute the rollup’s state and verify the correctness of state transitions. . 

Data availability is critical because without access to state data, challengers cannot construct fraud proofs to dispute invalid rollup operations. With Ethereum providing data availability, the risk of rollup operators getting away with malicious acts (e.g., submitting invalid blocks) reduces. 

Ethereum’s role as a data availability layer for optimistic rollups is expected to improve with the introduction of [shard chains](/upgrades/shard-chains/). This is important because the processing capacity of rollups is limited by the data throughput of the L1 chain. By splitting data storage across multiple shards, Ethereum can increase the space available for optimistic rollups to dump data. 

### Censorship resistance {#censorship-resistance}

Optimistic rollups also rely on Ethereum for censorship resistance. In an optimistic rollup a centralized entity (the operator) is responsible for processing transactions and submitting rollup blocks to Ethereum. This has some implications: 

- Rollup operators can censor users by going offline, refusing to produce blocks, or submit user transactions to L1. 

- Rollup operators can prevent users from withdrawing funds deposited in the rollup contract by withholding state data necessary to Merkle proofs of ownership. Withholding state data can also conceal the rollup’s state from users and prevent them from interacting with the rollup.  

Optimistic rollups solve this problem by forcing operators to publish data associated with state updates on Ethereum. Publishing rollup data on-chain has the following benefits:

- If an optimistic rollup operator goes offline or stops producing transaction batches, another node can use available data to reproduce the rollup’s last state and continue block production. 

- Users can use transaction data to create Merkle proofs proving ownership of funds and withdraw their assets from the rollup. 

### Settlement {#settlement}

Another role Ethereum plays in the context of optimistic rollups is that of a settlement layer. A settlement layer anchors the entire blockchain ecosystem, establishes security, and provides objective finality if a dispute occurs on another chain (optimistic rollups in this case) that requires arbitration. 

Ethereum Mainnet provides a hub for optimistic rollups to verify fraud proofs and resolve disputes. Moreover, transactions conducted on the rollup are only final *after* the rollup block is accepted on Ethereum. Once a rollup transaction is committed to Ethereum’s base layer, it cannot be rolled back (except in the highly unlikely case of a chain reorganization).

## How optimistic rollups work {#how-optimistic-rollups-work} 

### Transaction execution and aggregation {#transaction-execution-and-aggregation}

Users submit transactions to “operators”, nodes responsible for processing transactions on the optimistic rollup. Also known as a “validator” or “aggregator”, the operator aggregates transactions, compresses the underlying data, and publishes the block on Ethereum. 

Although anyone can become a validator, L2 nodes must provide a bond before producing blocks, much like a [proof-of-stake system](/developers/docs/consensus-mechanisms/pos/). This bond can be slashed if the validator posts an invalid block or builds on an old-but-invalid block (even if their block is valid). This way optimistic rollups utilize cryptoeconomic incentives to ensure validators act honestly. 

Other validators on the L2 chain are expected to execute the submitted transactions using their copy of the rollup’s state. If a validator’s final state is different from the operator’s proposed state, they can start a challenge and compute a fraud proof. 

Some optimistic rollups may forgo a permissionless validator system and use a single “sequencer” to execute the chain. Like a validator, the sequencer processes transactions, produces rollup blocks, and submits rollup transactions to the L1 chain (Ethereum). 

The sequencer is different from a regular rollup operator because they have greater control over the ordering of transactions. Also, the sequencer has priority access to the rollup chain and is the only entity authorized to submit transactions to the on-chain contract. Transactions from non-sequencer nodes or regular users are simply queued up in a separate inbox until the sequencer includes them in a new batch. 

#### Submitting rollup blocks to Ethereum {#submitting-blocks-to-ethereum} 

As mentioned, the operator of an optimistic rollup bundles off-chain transactions into a batch and sends it to Ethereum for notarization. This process involves compressing transaction-related data and publishing it on Ethereum as `calldata`. 

Calldata is a non-modifiable, non-persistent area in a smart contract that behaves like [memory](/developers/docs/smart-contracts/anatomy/#memory). While calldata persists on-chain as part of the blockchain's [history logs](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs), it is not stored as a part of Ethereum's state. Because calldata does not touch any part of Ethereum's state, it is cheaper to use compared to `memory` or `storage`.

The `calldata` keyword is also used in Solidity to pass arguments to a smart contract function at execution time. Calldata identifies the function being called during a transaction and holds inputs to the function in the form of an arbitrary sequence of bytes.

In the context of optimistic rollups, `calldata` is used to send compressed transaction data to the on-chain contract. The rollup operator adds a new batch by calling the required function in the rollup contract and passing the compressed data as function arguments. 

Here is [an example](https://etherscan.io/tx/0x9102bfce17c58b5fc1c974c24b6bb7a924fb5fbd7c4cd2f675911c27422a5591) of a rollup batch submission to show how this concept works. The sequencer invoked the `appendSequencerBatch()` method and passed the compressed transaction data as inputs using `calldata`. 

Using `calldata` reduces user fees since most costs that rollups incur come from storing data on-chain. Optimistic rollups also use several techniques to compress transaction data to reduce the amount of data posted to Ethereum. 

### State commitments {#state-commitments} 

At any point in time, the optimistic rollup’s state—accounts, balances, contract code, etc—is organized as a [Merkle tree](/whitepaper/#merkle-trees) called a “state tree”. The root of this Merkle tree, referencing the rollup’s latest state, is hashed and stored in the rollup contract. Every state transition on the chain produces a new rollup state, which an operator commits to by computing a new state root.

The operator is required to submit both old state roots and new state roots when posting batches. If the old state root matches the existing state root in the on-chain contract, the latter is discarded and replaced with the new state root. 

The rollup operator is also required to commit a Merkle root for the transaction batch itself. This allows anyone to prove the inclusion of a transaction in the batch (on L1) by presenting a [Merkle proof](/developers/tutorials/merkle-proofs-for-offline-data-integrity/). 

State commitments, especially state roots, are neccessary for detecting fraud in optimistic rollups. They also make it easier to reverse an invalid block; the rollup contract only has to revert to the last valid block's state root to declare it the canonical block. 

### Fraud proving {#fraud-proving}

As explained, optimistic rollups allow anyone to publish blocks without providing proofs of validity. However, to ensure the chain remains safe, optimistic rollups specify a time window during which anyone can dispute a state transition. Hence, rollup blocks are called “assertions” since anyone can dispute their validity. 

If someone disputes an assertion, then the rollup protocol will initiate the fraud proof computation. Every type of fraud proof is interactive—someone must post an assertion before another person can challenge it. The difference lies in how many rounds of interaction are required to compute the fraud proof. 

#### Single-round interactive proving {#single-round-interactive-proving}

Single-round interactive proving schemes replay the disputed transaction on Ethereum to detect fraud. The process starts with the challenger posting a bond and initiating the fraud proof computation, after which they provide relevant information, such as the old state root, their version of the new state root, the disputed transaction, and state data.

The rollup protocol emulates the re-execution of the disputed transaction on L1 (Ethereum) using a verifier contract. Because this process occurs in a sandboxed environment, it isn’t affected by activity on the Ethereum network. 

The state root computed while re-executing the transaction on-chain determines who wins the challenge. If the challenger's claim about the rollup’s correct state is correct, the operator is penalized for fraud by having their bond slashed. 

![Diagram showing what happens when a fraudulent transaction occurs in an Optimistic rollup in Ethereum](./optimistic-rollups.png)

Some notes about this type of fraud proof: 

1. Optimistic rollups that re-execute transactions to detect fraud must publish state commitments for individual transactions in a block. This helps verify the validity of transactions, but also increases data rollups must publish on-chain (with implications for overall rollup costs).

2. Part of the malicious asserter's bond is awarded to the challenger, while the other part is burned. The burning prevents collusion among validators; if two validators collude to initiate bogus challenges, they will still forfeit a considerable chunk of the entire stake. 

3. The challenger's gas costs for initiating the fraud proof are reimbursed. Ben Jones from Optimism describes the bonding system in place:

> _"Anyone who might be able to take an action that you would have to prove fraudulent to secure your funds requires that you post a bond. You basically take some ETH and lock it up and you say "Hey, I promise to tell the truth"... If I don't tell the truth and fraud is proven, this money will be slashed. Not only does some of this money get slashed but some of it will pay for the gas that people spent doing the fraud proof._"

So you can see the incentives: participants get penalized for conducting fraud and reimbursed for proving fraud.

#### Multi-round interactive proving {#multi-round-interactive-proving}

Multi-round interactive proving involves a back-and-forth protocol between the asserter and challenger overseen by an L1 verifier contract, which ultimately decides the lying party. After an L2 node challenges an assertion, the asserter is required to divide the disputed assertion into two equal halves. Each individual assertion in this case will contain as many steps of computation as the other. 

The challenger will then choose what assertion it wants to challenge. The dividing process (called a “bisection protocol”) continues until both parties are disputing an assertion about a *single* step of execution. At this point, the L1 contract will resolve the dispute by evaluating the instruction (and its result) to catch the fraudulent party.  

The asserter is required to provide a “one-step proof” verifying the validity of the disputed single-step computation. If the asserter fails to provide the one-step proof, or the L1 verifier deems the proof invalid, they lose the challenge. 

Some notes about this type of fraud proof: 

1. Multi-round interactive fraud proving is considered efficient because it minimizes the work the L1 chain must do in dispute arbitration. Instead of replaying the entire transaction, Ethereum only needs to re-execute one step in the rollup's execution. 

2. Bisection protocols reduce the amount of data posted on-chain (no need to publish state commits for every transaction). Also, optimistic rollup transactions don't have constrained by Ethereum's gas limit. Conversely, optimistic rollups re-executing transactions must make sure an L2 transaction has a lower gas limit to emulate its execution within a single Ethereum transaction.  

##### Why fraud proofs matter for optimistic rollups {#fraud-proof-benefits}

Fraud proofs are important because they facilitate *trustless finality* in optimistic rollups. Trustless finality is a quality of optimistic rollups that guarantees that a transaction—so long as it’s valid—will eventually be confirmed. 

Malicious nodes can try to delay the confirmation of a valid rollup block by starting false challenges. However, fraud proofs will eventually prove the rollup block’s validity and cause it to be confirmed. 

This also relates to another security property of optimistic rollups: the validity of the chain relies on the existence of *one* honest node. The honest node can advance the chain correctly by either posting valid assertions or disputing invalid assertions. Whatever the case, malicious nodes who enter into disputes with the honest node will lose their stakes during the fraud proving process. 

### L1/L2 interoperability {#l1-l2-interoperability} 

Optimistic rollups are designed for interoperability with Ethereum Mainnet and allow users to pass messages and arbitrary data between L1 and L2. They are also compatible with the EVM, so you can port existing [dapps](/developers/docs/dapps/) to rollups or create new dapps using Ethereum development tools. 

#### 1. Asset movement {#asset-movement} 

##### Entering the rollup {#entering-the-rollup} 

To use an optimistic rollup, users deposit ETH, ERC-20 tokens, and other accepted assets in the rollup’s [bridge](/developers/docs/bridges/) contract on L1. The bridge contract will relay the transaction to L2, where an equivalent amount of assets is minted and sendt to the user’s chosen address on the optimistic rollup. 

Typically, user-generated transactions (like an L1 > L2 deposit) are queued until the sequencer re-submits them to the rollup contract. However, to preserve censorship resistance, users are allowed to submit a transaction to the rollup contract if it has been delayed past the maximum time allowed. 

##### Exiting the rollup {#exiting-the-rollup} 

Withdrawing from an optimistic rollup to Ethereum is more difficult owing to the fraud proving scheme. If a user initiates an L2 > L1 transaction to withdraw funds escrowed on L1, they must wait until the challenge period—lasting roughly seven days—elapses. Nevertheless, the withdrawal process itself is fairly straightforward. 

After the withdrawal request is initiated on the L2 rollup, the transaction is included in the next batch, while the user’s assets on the rollup are burned. Once the batch is published on Ethereum, the user can compute a Merkle proof verifying the inclusion of their exit transaction in the block. Then it is a matter of waiting through the delay period to finalize the transaction on L1 and withdraw funds to Mainnet. 

To avoid waiting a week before withdrawing funds to Ethereum, optimistic rollup users can employ a **liquidity provider** (LP). A liquidity provider assumes ownership of a pending L2 withdrawal and pays the user on L1 (in exchange for a fee). 

Liquidity providers can check the validity of the user’s withdrawal request (by executing the chain themselves) before releasing funds. This way they have assurances that the transaction will be confirmed eventually (trustless finality). 

A user can have their exit from the rollup expedited by submitting the withdrawal transaction to an aggregator/sequencer. They can also send it directly to the L1 contract, which will delay the transaction, but protects against censorship. 

#### 2. EVM compatibility {#evm-compatibility} 

For developers, the advantage of optimistic rollups is their compatibility—or, better still, equivalence—with the [Ethereum Virtual Machine (EVM)](/developers/docs/evm/). EVM-compatible rollups rollups comply with specifications outlined in the [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) and support the EVM at the bytecode level. 

EVM-compatibility in optimistic rollups has the following benefits:

i. Developers can migrate existing smart contracts on Ethereum to optimistic rollup chains without having to modify codebases extensively. This can save development teams time when deploying Ethereum smart contracts on L2. 

ii. Developers and project teams using optimistic rollups can take advantage of Ethereum's infrastructure. This includes programming languages, code libraries, testing tools, client software, deployment infrastructure, and so on. 

Using existing tooling is important because these tools have been extensively audited, debugged, and improved over the years. It also removes the need for Ethereum developers to learn how to build with an entirely new development stack. 

#### 3. Cross-chain contract calls {#cross-chain-contract-calls} 

Users (externally owned accounts) interact with L2 contracts by submitting a transaction to the rollup contract or having a sequencer or validator do it for them. Optimistic rollups also allow contract accounts on Ethereum to interact with L2 contracts using bridging contracts to relay messages and pass data between L1 and L2. This means you can program an L1 contract on Ethereum Mainnet can to invoke functions belonging to contracts on an L2 ptimistic rollup. 

Cross-chain contract calls happen asynchronously—meaning the call is initiated first, then executed at a later time. This is different from calls between the two contracts on Ethereum, where the call produces results immediately. 

An example of a cross-chain contract call is the token deposit described earlier. A contract on L1 escrows the user's tokens and sends a message to a paired L2 contract to mint an equal amount of tokens on the rollup. 

As cross-chain message calls result in contract execution, the sender is usually required to cover [gas costs](/developers/docs/gas/) for computation. It is advisable to set a high gas limit to prevent the transaction from failing on the target chain. The token bridging scenario is a good example; if the L1 side of the transaction (depositing the tokens) works, but the L2 side (minting new tokens) fails due to low gas, the deposit becomes irrecoverable. 

Finally, we should note that L2 > L1 message calls between contracts need to account for delays (L1 > L2 calls are typically executed after some minutes). This is because messages sent to Mainnet from the optimistic rollup cannot be executed until the challenge window expires.

## How do optimistic rollup fees work? {#how-do-optimistic-rollup-fees-work}

Many optimistic rollups use a “gas price” scheme, much like Ethereum, to denote how much users pay per transaction. Gas fees are typically cheaper on optimistic rollups since, unlike Mainnet, they primarily optimize for speed and scalability. 

The following make up the cost of using an optimistic rollup:

1. **State write**: There is a fixed cost for writing to Ethereum’s state (i.e., submitting a transaction on the Ethereum blockchain). Optimistic rollups reduce this cost by batching transactions and spreading fixed costs across multiple users.  

2. **Data publication**: As mentioned, `calldata` must be published to Ethereum for every transaction. Calldata costs are currently governed by [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), which stipulates a cost of 16 gas for non-zero bytes and 4 gas for zero bytes of calldata, respectively. Rollup operators reduce calldata cost by compressing transaction-related data. 

3. **L2 gas fees**: This is the amount paid to the rollup operator as compensation for computational resources incurred in processing transactions. Gas fees are cheaper on L2 since optimistic rollups aren’t encumbered by the need to ensure decentralized execution. You can also see [here](https://l2fees.info/) for a real-time overview of how much it costs to use Ethereum-based optimistic rollups.


### Pros and cons {#optimistic-pros-and-cons}

| Pros                                                                                                             | Cons                                                                        |
| ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Compatibility with EVM and Solidity allows developers to port Ethereum-native smart contracts to rollups or use existing tooling to create new dapps.                | Delays in transaction finality due to potential fraud challenges.                                                                                                  |
| Transaction data is stored on the layer 1 chain, improving transparency, security, censorship-resistance, and decentralization. | Centralized rollup operators (sequencers) can influence transaction ordering.                                                                   | 
| Fraud proving guarantees trustless finality and allows honest minorities to secure the chain.                     | A malicious operator can steal funds by posting invalid blocks and state commitments.                                                                              | 
| Computing fraud proofs is open to regular L2 node, unlike validity proofs (used in ZK-rollups) that require special hardware.  | Security model relies on at least one honest node executing rollup transactions and submitting fraud proofs to challenge invalid state transitions.                  | 
| Optimistic rollups have "trustless liveness" (anyone can force the chain to advance by executing transactions and posting assertions)| Users must wait for the one-week challenge period to expire before withdrawing funds back to Ethereum.                                                        |
| Optimistic rollups rely on well-designed cryptoeconomic incentives to increase security on the chain.                            |

### A visual explanation of optimistic rollups {#optimistic-video}

More of a visual learner? Watch Finematics explain optimistic rollups:

<YouTube id="7pWxCklcNsU" start="263" />

### Use Optimistic rollups {#use-optimistic-rollups}

Multiple implementations of Optimistic rollups exist that you can integrate into your dapps:

<RollupProductDevDoc rollupType="optimistic" />

**Optimistic rollups reading**

- [Everything you need to know about Optimistic Rollup](https://research.paradigm.xyz/rollups)
- [EthHub on optimistic rollups](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/optimistic_rollups/)
- [The Essential Guide to Arbitrum](https://newsletter.banklesshq.com/p/the-essential-guide-to-arbitrum)
- [How does Optimism's Rollup really work?](https://research.paradigm.xyz/optimism)
- [OVM Deep Dive](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
- [More on layer 2](/layer-2/)
