---
title: Zero-Knowledge Rollups
description: An introduction to zero-knowledge rollups, a scaling solution used by the Ethereum community. 
lang: en
sidebar: true
--- 

Zero-knowledge rollups (ZK-rollups) are layer 2 [scaling solutions](/developers/docs/scaling/) that improve throughput on Ethereum Mainnet through off-chain execution. ZK-rollups process transactions independently, but post state data to Mainnet as `calldata`. They also produce cryptographic proofs of validity for transaction batches to guarantee the correctness of off-chain computation. 

## Prerequisites {#prerequisites}

You should have a good understanding of all the foundational topics and a high-level understanding of [Ethereum scaling](/developers/docs/scaling/). Implementing scaling solutions such as rollups is an advanced topic as the technology is less battle-tested and continues to be researched and developed.

Looking for a more beginner-friendly resource? See our [introduction to layer 2](/layer-2/).

## What are zero-knowledge rollups? {#what-are-zk-rollups}

**Zero-knowledge rollups (ZK-rollups)** execute transactions on layer 2 (L2), which they bundle (or "roll-up") into batches. ZK-rollup operators produce [validity proofs](/glossary/#validity-proof) to prove the validity of off-chain transactions before submitting batches on-chain. These proofs can come in the form of ZK-SNARKs (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) or ZK-STARKs (Zero-Knowledge Scalable Transparent Argument of Knowledge). 

The ZK-rollup smart contract maintains the state of all transactions on the L2 chain, and this state can only be updated with a validity proof. This means that ZK-rollups only need to provide validity proofs to finalize transactions on the layer 1 (L1) chain instead of posting all the transaction data like [optimistic rollups](/developers/docs/scaling/optimistic-rollups/). 

There are no delays when moving funds from ZK-rollups (L2) to Ethereum (L1) because exit transactions are finalized once the ZK-rollup contract verifies the validity proof. Conversely, withdrawing funds from optimistic rollups is subject to a delay to allow anyone to challenge the exit transaction with a [fraud proof](/glossary/#fraud-proof). 

ZK-rollups write transactions to Ethereum as `calldata`, which allows anyone to reconstruct the rollup’s state independently. They also use compression techniques to reduce transaction data—for example, accounts are represented by an index rather than an address, which saves 28 bytes of data. On-chain data publication is a significant cost for rollups, so data compression can reduce fees for users.  

## How do zk-rollups interact with Ethereum? {#zk-rollups-and-ethereum}

A ZK-rollup is an L2 chain designed to operate on top of Ethereum’s base layer. The ZK-rollup protocol is managed by smart contracts running on L1, including the main contract that stores rollup blocks, tracks deposits, and monitors state updates. Another L1 contract (the verifier contract) verifies zero-knowledge proofs submitted by block producers. 

Although they operate independently, ZK-rollups directly inherit Ethereum's security guarantees. This makes them safer than scaling solutions, such as [sidechains](/developers/docs/scaling/sidechains/), which are responsible for their own consensus and security properties.  

ZK-rollups rely on the main Ethereum protocol for the following:  

### Data availability {data-availability}

ZK-rollups publish state data for every transaction processed off-chain to Ethereum. With this data, it is possible for individuals or businesses to reproduce the rollup’s state and validate the chain themselves. Ethereum makes this data available to all participants of the network as `calldata`. 

ZK-rollups don’t actually need to publish a lot of transaction data on-chain since validity proofs already verify the authenticity of state transitions. Nonetheless, storing data on-chain is still important for many reasons. Putting state data on-chain allows anyone to rebuild the L2 chain's state and produce batches, preventing malicious operators from arbitrarily freezing the chain. 

Besides, users cannot interact with the rollup if operators don't publish data on-chain. An inability to access state data means users cannot know the state of their accounts or initiate transactions (e.g., withdrawals) based on state updates.  

### Transaction finality {#transaction-finality}

Ethereum acts as a settlement layer for ZK-rollups: L2 transactions are finalized only if the L1 contract accepts the validity proof. This eliminates the risk of malicious operators corrupting the chain (e.g., stealing rollup funds) since every transaction must be approved on Mainnet. Also, Ethereum guarantees that user operations cannot be reversed once finalized on L1.  

### Censorship resistance {#censorship-resistance}

Most ZK-rollups use a "supernode" (the operator) to execute transactions, produce batches, and submit blocks to L1. While this ensures efficiency, it increases the risk of censorship: malicious ZK-rollup operators can censor users by refusing to include their transactions in batches. 

As a security measure, ZK-rollups allow users to submit transactions directly to the rollup contract on Mainnet if they think they are being censored by the operator. This allows users to force an exit from the ZK-rollup to Ethereum without having to rely on the operator’s permission.

## How do zk-rollups work? {#how-do-zk-rollups-work}

### Transactions {#transactions}

Users in the ZK-rollup sign transactions and submit to L2 operators for processing and inclusion in the next batch. In some cases, the operator is a centralized entity, called a sequencer, who executes transactions, aggregates them into batches, and submits to L1. The sequencer in this system is the only entity allowed to produce L2 blocks and add rollup transactions to the ZK-rollup contract.  

Other ZK-rollups may rotate the operator role by using a [proof-of-stake](/developers/docs/consensus-mechanisms/pos/) validator set. Prospective operators deposit funds in the rollup contract, with the size of each stake influencing the staker’s chances of getting selected to produce the next rollup batch. The operator’s stake can be slashed if they act maliciously, which incentivizes them to post valid blocks.  

#### How ZK-rollups publish transaction data on Ethereum {#how-zk-rollups-publish-transaction-data-on-ethereum} 

As explained, transaction data is published on Ethereum as `calldata`. Calldata is a data area in a smart contract used to pass arguments to a function. Although `calldata` is similar to [memory](/developers/docs/smart-contracts/anatomy/#memory), it isn’t stored as part of Ethereum’s state; rather, it persists on-chain as part of the Ethereum chain's [history logs](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs). This makes it a cheaper alternative to `memory` or `storage` for storing data on-chain. 

The`calldata` keyword often identifies the smart contract method being called by a transaction and holds inputs to the method in the form of an arbitrary sequence of bytes. ZK-rollups use it to publish compressed transaction data on-chain; the rollup operator simply adds a new batch by calling the required function in the rollup contract and passes the compressed data as function arguments. 

### State commitments {#state-commitments}

The ZK-rollup’s state, which includes L2 accounts and balances, is represented as a [Merkle tree](/whitepaper/#merkle-trees). A cryptographic hash of the Merkle tree’s root (Merkle root) is stored in the on-chain contract, allowing the rollup protocol to track changes in the state of the ZK-rollup. 

The rollup transitions to a new state after the execution of a new set of transactions. The operator who initiated the state transition is required to compute a new state root and submit to the on-chain contract. If the validity proof associated with the batch is authenticated by the verifier contract, the new Merkle root becomes the ZK-rollup’s canonical state root. 

Besides computing state roots, the ZK-rollup operator also creates a batch root—the root of a Merkle tree comprising all transactions in a batch. When a new batch is submitted, the rollup contract stores the batch root, allowing users to prove a transaction (e.g., a withdrawal request) was included in the batch. Users will have to provide transaction details, the batch root, and a [Merkle proof](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) showing the inclusion path. 

### Validity proofs {#validity-proofs}

The new state root that the ZK-rollup operator submits to the L1 contract is the result of updates to the rollup’s state. Say Alice sends 10 tokens to Bob, the operator simply decreases Alice’s balance by 10 and increments Bob’s balance by 10. The operator then hashes the updated account data, rebuilds the rollup's Merkle tree, and submits the new Merkle root to the on-chain contract.  

But the rollup contract won’t automatically accept the proposed state commitment until the operator proves the new Merkle root resulted from correct updates to the rollup’s state. The ZK-rollup operator does this by producing a validity proof, a succinct cryptographic commitment verifying the correctness of batched transactions. 

Validity proofs allow parties to prove the correctness of a statement without revealing the statement—hence, they are also called zero-knowledge proofs. ZK-rollups use validity proofs to confirm the correctness of off-chain state transitions without having to re-execute transactions on Ethereum. 

#### How do validity proofs work in ZK-rollups? {#validity-proofs-in-zk-rollups}

##### Proof generation {#proof-generation}

Before accepting transactions, the operator will perform the usual checks. This includes confirming that:

- The sender and receiver accounts are part of the state tree. 
- The sender has enough funds to process the transaction. 
- The transaction is correct and matches the sender’s public key on the rollup. 
- The sender’s nonce is correct, etc. 

Once the ZK-rollup node has enough transactions, it aggregates them into a batch and compiles inputs for the proving circuit to compile into a succinct zk-proof. This includes:

- A Merkle tree comprising all the transactions in the batch.
- Merkle proofs for transactions to prove inclusion in the batch. 
- Merkle proofs for each sender-receiver pair in transactions to prove those accounts are part of the rollup's state tree.
- A set of intermediate state roots, derived from updating the state root after applying state updates for each transaction (i.e., decreasing sender accounts and increasing receiver accounts).

The proving circuit computes the validity proof by "looping" over each transaction and performing the same checks the operator completed before processing the transaction. First, it verifies the sender's account is part of the  existing state root using the provided Merkle proof. Then it reduces the sender's balance, increases their nonce, hashes the updated account data and combines it with the Merkle proof to generate a new Merkle root. 

This Merkle root reflects the sole change in the ZK-rollup's state: a change in the sender's balance and nonce. This is possible because the Merkle proof used to prove the account's existence is used to derive the new state root. 

The proving circuit performs the same process on the receiver's account. It checks if the receiver's account exists under the intermediate state root (using the Merkle proof), increases their balance, re-hashes the account data and combines it with the Merkle proof to generate a new state root. 

The process repeats for every transaction; each "loop" creates a new state root from updating the sender's account and a subsequent new root from updating the receiver's account. As explained, every update update to the state root represents one part of the rollup's state tree changing. 

The zk-proving circuit iterates over the entire transaction batch, verifying the sequence of updates that result in a final state root after the last transaction is executed. The last Merkle root computed becomes the newest canonical state root of the ZK-rollup. 

##### Proof verification {#proof-verification} 

After the proving circuit verifies the correctness of state updates, the L2 operator submits the computed validity proof to the verifier contract on L1. The contract's verification circuit verifies the proof's validity and also checks public inputs that form part of the proof: 

- **Pre-state root**: The ZK-rollup’s old state root (i.e., before the batched transactions were executed), reflecting the L2 chain's last known valid state. 

- **Post-state root**: The ZK-rollup’s new state root (i.e., after the execution of batched transactions), reflecting the L2 chain's newest state. The post-state root is the final root derived after applying state updates in the proving circuit. 

- **Batch root**: The Merkle root of the batch, derived by *merklizing* transactions in the batch and hashing the tree's root. 

- **Transaction inputs**: Data associated with the transactions executed as part of the submitted batch. 

If the proof satisfies the circuit (i.e., it is valid), it means that there exists a sequence of valid transactions that transition the rollup from the previous state (cryptographically fingerprinted by the pre-state root) to a new state (cryptographically fingerprinted by the post-state root). If the pre-state root matches the root stored in the rollup contract, and the proof is valid, the rollup contract takes the post-state root from the proof and updates its state tree to reflect the rollup's changed state. 

### Entries and exits {#entries-and-exits}

Users enter the ZK-rollup by depositing tokens in the rollup's contract deployed on the L1 chain. This transaction is queued up since only operators can submit transactions to the rollup contract. 

If the pending deposit queue starts filling up, the ZK-rollup operator will take the deposit transactions and submit them to the rollup contract. Once the user's funds are in the rollup, they can start transacting by sending transactions to the operator for processing. Users can verify balances on the rollup by hashing their account data, sending the hash to the rollup contract, and providing a Merkle proof to verify against the current state root. 

Withdrawing from a ZK-rollup to L1 is straightforward. The user initiates the exit transaction by sending their assets on the rollup to a specified account for burning. If the operator includes the transaction in the next batch, the user can submit a withdrawal request to the on-chain contract. This withdrawal request will include the following:

- Merkle proof proving the inclusion of the user's transaction to the burn account in a transaction batch
 
- Transaction data

- Batch root 

- L1 address to receive deposited funds

The rollup contract hashes the transaction data, check if the batch root exists, and uses the Merkle proof to check if the transaction hash is part of the batch root. Afterward, the contract executes the exit transaction and sends funds to the user's chosen address on L1. 

## ZK-rollups and EVM compatibility {#zk-rollups-and-evm-compatibility}

Unlike optimistic rollups, ZK-rollups are not readily compatible with the [Ethereum Virtual Machine (EVM)](/developers/docs/evm/). Proving general-purpose EVM computation in circuits is more difficult and resource-intensive than proving simple computations (like the token transfer described previously). 

However, [advances in zero-knowledge technology](https://hackmd.io/@yezhang/S1_KMMbGt#Why-possible-now) are igniting renewed interest in wrapping EVM computation in zero-knowledge proofs. These efforts are geared towards creating a zero-knowledge EVM (zkEVM) implementation that can efficiently verify the correctness of program execution. A zkEVM recreates existing EVM opcodes for proving/verification in circuits, allowing to execute smart contracts. 

Like the EVM, a zkEVM transitions between states after computation is performed on some inputs. The difference is that the zkEVM also creates zero-knowledge proofs to verify the correctness of every step in the program’s execution. Validity proofs could verify the correctness of operations that touch the VM’s state (memory, stack, storage) and the computation itself (i.e., did the operation call the right opcodes and execute them correctly?).

Projects working on zkEVMs include:

- [ZKSync](https://docs.zksync.io/zkevm/) (first production-ready zkEVM on Mainnet)

- [Applied ZKP](https://github.com/privacy-scaling-explorations/zkevm-specs) 

- [Scroll](https://scroll.io/blog/zkEVM)

- [Polygon Hermez](https://docs.hermez.io/zkEVM/architecture/introduction/) 

The introduction of EVM-compatible ZK-rollups is expected to help developers leverage the scalability and security guarantees of zero-knowledge proofs. More importantly, compatibility with native Ethereum infrastructure means developers can build zk-friendly dApps using familiar (and battle-tested) tooling and langugages. 

## How do ZK-rollup fees work? {#how-do-zk-rollup-fees-work}

How much users pay for transactions on ZK-rollups is dependent on the gas fee, just like on Ethereum Mainnet. However, gas fees work differently on L2 and are influenced by the following costs: 

1. **State write**: There is a fixed cost for writing to Ethereum’s state (i.e., submitting a transaction on the Ethereum blockchain). ZK-rollups reduce this cost by batching transactions and spreading fixed costs across multiple users.  

2. **Data publication**: ZK-rollups publish state data for every transaction to Ethereum as `calldata`. Calldata costs are currently governed by [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), which stipulates a cost of 16 gas for non-zero bytes and 4 gas for zero bytes of calldata, respectively. The cost paid on each transaction is influenced by how much calldata needs to be posted on-chain for it. 

3. **L2 operator fees**: This is the amount paid to the rollup operator as compensation for computational costs incurred in processing transactions, much like miner fees on Ethereum. 

4. **Proof generation and verification**: ZK-rollup operators must produce validity proofs for transaction batches, which is resource-intensive. Verifying zero-knowledge proofs on Mainnet also costs gas (~ 500,000 gas). 

Apart from batching transactions, ZK-rollups reduce fees for users by compressing transaction data. You can see [here](https://l2fees.info/) for a real-time overview of how it costs to use Ethereum ZK-rollups. 

## How do ZK-rollups scale Ethereum? {#scaling-ethereum-with-zk-rollups}

### Transaction data compression {#transaction-data-compression}

ZK-rollups extend the throughput on Ethereum’s base layer by taking computation off-chain, but the real boost for scaling comes from compressing transaction data. Ethereum’s [block size](/developers/docs/blocks/#block-size) limits the data each block can hold and, by extension, the number of transactions processed per block. By compressing transaction-related data, ZK-rollups significantly increase the number of transactions processed per block. 

ZK-rollups can compress transaction data better than optimistic rollups since they don't have to post all the data required to validate each transaction. They only have to post the minimal data required to rebuild the latest state of accounts and balances on the rollup. 

### Recursive proofs {#recursive-proofs}

An advantage of zero-knowledge proofs is that proofs can verify other proofs. For example, a single ZK-SNARK can verify other ZK-SNARKs. Such "proof-of-proofs" are called recursive proofs and dramatically increase throughput on ZK-rollups. 

Currently, validity proofs are generated on a block-by-block basis and submitted to the L1 contract for verification. However, verifying single block proofs limits the throughput that ZK-rollups can achieve since only one block can be finalized when the operator submits a proof. 

Recursive proofs, however, make it possible to finalize several blocks with one validity proof. This is because the proving circuit recursively aggregates multiple block proofs until one final proof is created. The L2 operator submits this recursive proof, and if the contract accepts it, all the relevant blocks will be finalized instantly. With recursive proofs, the number of ZK-rollup transactions that can be finalized on Ethereum at intervals increases. 

### Pros and cons of zk-rollups {#zk-rollups-pros-and-cons}

| Pros                                                                    | Cons                                                                                                  |
| ------------------------------------------------------------------------| ----------------------------------------------------------------------------------------------------- |
| Validity proofs ensure correctness of off-chain transactions and prevent operators from executing invalid state transitions. | The cost associated with computing and verifying validity proofs is substantial and can increase fees for rollup users.             |                     
| Offers faster transaction finality as state updates are approved once validity proofs are verified on L1. | Building EVM-compatible ZK-rollups is difficult due to complexity of zero-knowledge technology.                                                     |                                                                                                         
| Relies on trustless cryptographic mechanisms for security, not the honesty of incentivized actors as with [optimistic rollups](/developers/docs/scaling/optimistic-rollups/#optimistic-pros-and-cons)                                           | Producing validity proofs requires specialized hardware, which may encourage centralized control of the chain by a few parties.                                                            |
| Stores data needed to recover the state on the L1 chain, which guarantees security, censorship-resistance, and decentralization. | Centralized operators (sequencers) can influence transaction ordering.                                                     |         
| Users benefit from greater capital efficiency and can withdraw funds from L2 without delays.              | Hardware requirements may reduce the number of participants that can force the chain to make progress, increasing the risk of malicious operators freezing the rollup's state and censoring users.   | 
| Doesn't depend on liveness assumptions and users don't have to validate the chain to protect their funds. | Some proving systems (e.g., ZK-SNARK) require a trusted setup which, if mishandled, could potentially compromise a ZK-rollup's security model.    | 
| Better data compression can help reduce user fees.                      |                                                                                                      |
 
### A visual explanation of ZK-rollups {#zk-video}

Watch Finematics explain ZK-rollups:

<YouTube id="7pWxCklcNsU" start="406" />

### Use ZK-rollups {#use-zk-rollups}

Multiple implementations of ZK-rollups exist that you can integrate into your dapps:

<RollupProductDevDoc rollupType="zk" />

## Aztec Network 
- [Website](https://aztec.network/)
- [Documentation](https://developers.aztec.network/)
- [Technology and risk summary](https://l2beat.com/projects/aztec/)

## Polygon Hermez
- [Website](https://hermez.io/)
- [Documentation](https://docs.hermez.io/)
- [Technology and risk summary](https://l2beat.com/projects/hermez/) 

**ZK-rollups reading**

- [What Are Zero-Knowledge Rollups?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [EthHub on zk-rollups](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/zk-rollups/)
- [STARKs vs SNARKs](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
- [What is a zkEVM?](https://www.alchemy.com/overviews/zkevm) 
- [More on layer 2](/layer-2/)
