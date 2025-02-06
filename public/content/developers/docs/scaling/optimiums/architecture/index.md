---
title: Optimium chain architecture deep dive
description: Deep dive into the architecture of optimium chains and how they work
lang: en
---

The architecture of optimium chains can be divided into two broad categories: the off-chain layer and on-chain layer.

## Prerequisites {#prerequisites}

Understanding of how blockchains like Ethereum work and familiarity with [Ethereum scaling](/developers/docs/scaling/) will make it easier to grasp the various concepts discussed in this page. Implementing and integrating with scaling solutions, like optimiums, is an advanced topic as the technology is still under active research and development.

## Off-chain layer in optimium chains {#off-chain-layer-in-optimiums}

### Off-chain virtual machine (VM) {#off-chain-vm}

Like other [off-chain scaling solutions](/developers/docs/scaling/#off-chain-scaling), optimiums execute transactions in a custom virtual machine separate from the [Ethereum Virtual Machine](/developers/docs/evm/) and store a separate state (contract code and accounts). The off-chain VM is where computation happens and may be described as the secondary/upper layer for an optimium protocol.

### Sequencers {#sequencers}

A sequencer is an optional component that optimium chains use to order transactions and provide fast-path confirmations to users. The sequencer is a full node and maintains a copy of the optimium’s state; transactions are applied to the pending state to provide users with confirmation of the result. A transaction has soft finality if the user trusts the sequencer to include the transaction in a new batch.

![Sequencer-user interaction in optimium chains](sequencer-user-interaction-and-batch-submission.png)

At intervals, the sequencer aggregates transactions into a batch and submits the batch to the optimium’s off-chain data availability layer. Transactions have hard finality once the sequencer receives a certificate from the data availability layer attesting to the availability of the batch’s transaction data and inclusion of the batch in the optimium’s canonical chain.

### Validators {#validators}

The sequencer is trusted to propose ordered transactions for execution, but is not responsible for executing transactions. The task of executing transactions and settling transaction results is handled by validators. Validators derive blocks by downloading batches submitted by the sequencer to the optimium’s data availability layer and applying batched transactions to the optimium’s state to compute a new root of the Merkle tree representing the state of accounts and balances in the optimium.

The state root functions as a commitment to the optimium’s (claimed) state and is submitted by the validator to the light client contract on Ethereum. The light client contract cannot directly verify a newly submitted state root asserts a valid state. However, validators are required to bond collateral before asserting a new state—which can be slashed if the proposed state is proven incorrect by another validator during a dispute game.

![Validators deriving optimium blocks by downloading transaction data from DA layer](validator-download-transaction-batch-optimiums.png)

### Challengers {#challengers}

A challenger or watcher node monitors the optimium chain and tracks submission of state commitments asserting new states to the light client bridge on Ethereum. The challenger’s job is to ensure that invalid state transitions are never finalized by the light client bridge. It does this by re-executing transactions and computing the post-state with the asserted by the block proposer. If the validator’s proposed output conflicts with the challenger’s output, it can publish a fraud proof on-chain and initiate a dispute.

![Challenging submitted block headers on Ethereum](challenging-transaction-batches-on-ethereum.png)

## On-chain layer in optimium chains {#on-chain-layer-in-optimiums}

While an optimium handles execution of transactions off-chain, other aspects of the network’s operation are outsourced to the Ethereum network. These functions are managed by special-purpose smart contracts deployed on Ethereum and may collectively be described as the primary/base layer.

### Canonical bridging {#canonical-bridging-in-optimiums}

Optimiums will typically have an enshrined or canonical bridge on Ethereum for transferring assets to and from Ethereum—this is a validating bridge that reads Ethereum’s state and validates the integrity of the optimium chain before processing withdrawals. Applications can integrate with the canonical bridge to implement basic functionality like cross-chain asset transfers (locking and withdrawing tokens), or more advanced features like cross-chain messaging.

Deposits and withdrawals between an optimium and other blockchains apart from Ethereum also pass through the canonical bridge. For example, a user bridging from optimium #1 to optimium #2 needs to withdraw from optimium #1’s canonical bridge on Ethereum and deposit into optimium #2’s bridge to complete the cross-chain bridging operation. Bridging through the optimium’s canonical bridge is usually more secure than third-party bridge solutions as the bridge can reject withdrawals proven invalid by a fraud proof.

![Bridging in optimium chains](optimium-bridging-workflow.png)

### Dispute resolution {#dispute-resolution-in-optimiums}

Optimiums permit validators to publish claims about off-chains state to Ethereum without providing proofs of validity, with a caveat: anyone can challenge the validity of these claims by publishing a fraud proof on-chain. A fraud proof is a mechanism for proving that the claimed result of a computation is incorrect; fraud proofs can be interactive or non-interactive, depending how many rounds of communication it takes to settle a dispute between the parties involved.

This usually takes the form of a dispute played out on-chain, with the dispute protocol as the arbiter. Fraud proofs guarantee the following properties:

- **Safety with an honest minority of validators**: Invalid transactions are never finalized by the canonical optimium chain, provided an honest full node—with access to data for validating state updates—is monitoring the chain and incentivized to dispute invalid state updates. An honest validator is guaranteed to win against an arbitrary number of dishonest validators publishing false claims about the optimium’s state, if the dispute protocol is sound.

- **Liveness (trust-minimized finality) with an honest minority of validators**: Validly executed transactions are always added to the canonical chain contingent on the soundness of the optimium’s dispute game protocol. Dishonest validators may delay transactions by falsely disputing a block’s validity, but the dispute protocol will reliably identify the dishonest party and ensure the optimium’s light client bridge confirms blocks containing valid transactions eventually.

![Dispute invalid state transitions in optimium chains](../challenge-games.png)

Non-interactive (single-round) fraud proving requires replaying the disputed state transition, by which the dispute protocol can check whether the result claimed by the challenger, or the proposer, is correct. A validator is liable to be slashed (with some portion of the bonded collateral going to the honest validator) if it incorrectly asserts the wrong result; a challenger can also be slashed if it provides an invalid fraud proof. This design has two benefits:

- Forcing disputers to bond collateral before initiating a dispute prevents _griefing_ and _discouragement attacks_, where a dishonest challenger initiates false challenges and forces honest validators to waste gas fees on sending on-chain transactions or delays confirmation of transaction results (e.g., which can prevent honest users from exiting funds from the optimium’s bridge).

- Sending a portion of the slashed collateral, as opposed to rewarding the winning party with the entire stake, prevents validators from gaming the dispute arbitration protocol. If two validators collude to initiate bogus challenges, both parties still forfeit a considerable chunk of the combined stake.

Single-round fraud proving is easier to implement, but most optimiums use multi-round (interactive) fraud proving for some reasons: (1) Re-executing transactions on-chain increases on-chain footprint as it requires publishing commitments to post-states for a block’s individual transactions (i.e., intermediate state roots). (2) Replaying transactions on-chain also incurs significant gas costs, and may be infeasible if the gas limit for off-chain transactions exceeds the gas limit on the settlement layer (Ethereum).

Multi-round (interactive) fraud proving requires two validators disputing a state transition to participate in an [interactive verification game](https://dl.acm.org/doi/pdf/10.1145/258533.258644) (a.k.a., a _bisection protocol_) mediated on-chain by the optimium’s dispute manager contract. The bisection protocol requires the challenger and asserter to narrow down the disputed state transition to the smallest instruction (opcode) whose result is disputed by the two parties.

After both parties have narrowed down the disputed state transition to a claim about a single step of execution, the challenger is required to provide a one-step proof—the result of executing the disputed instruction—for verification. The dispute manager contract must re-execute the disputed instruction and evaluate the output to determine which validator is making the right claim about the instruction's execution.

The dispute manager contract only executes a single step of execution to resolve a disputed state transition, which reduces the amount of on-chain computation required to adjudicate a dispute—making multi-round fraud proofs more efficient. The requirement to publish intermediate state tree roots for transactions is also no longer required as the dispute protocol only checks the output of one instruction, not the output of a disputed transaction, to verify a fraud proof.

### Settlement of transactions {#settlement-of-transactions}

Transactions executed off-chain by block producers in an optimium chain are settled after a commitment to the corresponding block is accepted by an Ethereum contract that stores state commitments (state roots) to the outputs of transactions. The chain of commitments stored in the light client bridge provides a view of the optimium’s finalized states for everyone observing the chain.

## Data availability providers {#data-availability-providers}

Forcing sequencers/validators to submit transaction data to an independent data availability provider is the default approach to mitigating the data availability problem in optimiums. An optimium chain can integrate with different types of data availability providers according to different factors, such as cost, security, and efficiency.

### Decentralized storage networks {#decentralized-storage-networks}

Optimiums may store transaction data on [decentralized storage systems](/developers/docs/storage/) like IPFS (InterPlanetary File System). The assumption is that at least one peer in the network will be available to serve up data requests. However, IPFS—similar to traditional peer-to-peer file storage services, like BitTorrent—are opt-in protocols and do not incentivize participants to persist data for any duration.

Decentralized storage networks may be combined with data availability solutions with stronger guarantees that transaction data will be available during the challenge window for verifiers to validate state transitions. Data availability providers typically discard data after a short period, whereas decentralized storage networks can be used to store transaction data indefinitely. This can help with providing access to historical data (e.g., for syncing the chain or analyzing transaction histories).

### Data availability committees {#data-availability-committees}

A data availability committee (DAC) is a group of trusted entities that accept transaction batches from an optimium’s sequencer and promise to keep the data available for a defined period (a _data availability window_). DAC nodes store state data in servers and expose public API methods that interested parties can use to retrieve transaction data for one or more blocks during the availability window.

Members of the DAC attest to the availability of a block’s transaction data by signing a hash of the block with a public-private keypair. The set of signatures from a quorum (e.g., ⅔) of DAC nodes is aggregated to create a data availability certificate and submitted to the optimium’s light client contract as proof that the underlying data behind a new state commitment is available. The contract verifies the data availability certificate by confirming that the number of signatures from the DAC meets the required threshold and those signatures derived from signing keys of nodes approved to participate in the DAC.

The credible threat of a loss of economic capital and loss of reputational capital provides incentives for data availability committees to make data available during the availability window.

- **Loss of economic capital**: As economically rational actors, DAC nodes may favor the future fee opportunity (payments for storing transaction data) over the short-term gain from performing a data withholding attack. This assumes members of a DAC are compensated for providing data availability and the DAC has a protocol for rotating membership of the data availability committee.

- **Loss of reputational capital**: If members of a DAC are publicly identifiable, the cost of losing reputational capital associated with acting maliciously (e.g., censoring withdrawals by withholding Merkle tree data) provides incentive to make data available. This assumes DAC nodes have proper key management procedures in place and cannot be hijacked by an adversary.

DACs are typically more cost-effective and efficient for optimium chains due to being tailored for specific applications and having lower implementation complexity. However, the aforementioned assumptions underlying the security model of a DAC may be insufficient to guarantee security in edge-case scenarios. Some examples:

- If a particular optimium becomes popular enough, the one-time profit of withholding data and bricking fraud proofs may be high enough to reduce the tradeoff from losing out on future income from fees paid by an optimium’s sequencer to temporarily store data blobs. The lack of a requirement for DAC nodes to bond slashable collateral before attesting to data availability also reduces the economic cost of participating in a data withholding attack.

- An adversary can hijack a DAC and perform a data withholding attack by bribing a set of committee members, or compromising private keys of a quorum of DAC nodes. Both attacks are feasible, especially as DACs typically have a small set of participants to reduce the cost of coordination and reduce complexity of bootstrapping the data availability service.

![Sequencer-DAC interaction in optimium chains](data-availability-committee-sequencer-interaction-optimiums.png)

### Data availability networks {#data-availability-networks}

A data availability network has the same task as a data availability committee (DAC): store transaction batches received from an optimium’s sequencer and provide transaction data to anyone that requests it during the availability window. Notwithstanding this similarity, data availability networks and DACs have significant differences:

- A data availability network is a dedicated blockchain specialized in guaranteeing data availability for execution layers that outsource data availability (e.g., optimiums)—whereas a DAC is a small set of entities running servers. Data availability networks may have a consensus mechanism for nodes to agree on ordering of transaction batches and a token that nodes must stake before joining the network.

- A data availability network is usually larger compared to a data availability committee as entry into the validator set is permissionless (the only requirement to join is provision of bonded collateral); DACs restrict participation to appointed members and are smaller in size.

- Data availability networks have economic incentives for full nodes tasked with keeping data available to act honestly. For example, validators can be slashed for failing to prove possession of transaction data during the availability window, or withholding data from users.

Data availability networks can scale horizontally with data availability sampling. Data availability sampling allows resource-constrained light nodes, which do not download block bodies, to verify availability of block data by randomly sampling a published block—with the probability of a successful data withholding attack reducing as more nodes randomly sample chunks. Allowing light nodes to contribute to the security of the network makes it possible to increase the network’s data bandwidth and storage capacity without centralizing verification of data availability. This contributes to more decentralization in data availability networks and increases security against data withholding attacks for optimiums integrated with a data availability network.

However, using a data availability network has some tradeoffs:

- A data availability network often services multiple blockchains, while DACs are traditionally specific to a particular chain (e.g., members of a DAC may be elected by a DAO with holders of the optimium’s governance token). This may result in higher latency and lower efficiency when trying to retrieve transaction data specific to an optimium chain.

- A data availability network requires higher fees from client applications and is harder to design and implement. For instance, proving data withholding attacks is difficult as a refusal to respond to requests for data is indistinguishable from syncing issues from a third-party observer’s perspective. This problem is described in academic literature as the fisherman’s dilemma

Regardless of the data availability provider adopted by an optimium, it is important to reiterate that storing transaction data outside Ethereum means Ethereum _cannot_ completely guarantee the safety and liveness of an optimium chain. This applies to all off-chain constructions that use fraud proofs to enforce validity of state transitions on-chain, but stores transaction data elsewhere, and does not account for individual security models (or trust assumptions) underlying the external data availability layer.

We will use different implementations of a hypothetical blockchain called AliceChain to illustrate:

#### Scenario #1 {#scenario-1}

1. AliceChain uses a sequencer (or sequencer set) to provide fast-path confirmations to users and propose ordered transaction batches for execution and a set of validators to process transactions. AliceChain validators are not required to come to consensus on validity of blocks and only submit state commitments (block headers) to a light client contract on Ethereum to assert new states for AliceChain.

2. AliceChain implements an on-chain dispute protocol capable of replaying disputed state transitions and verifying fraud proofs from challengers. Withdrawals from the Ethereum side of the AliceChain-Ethereum bridge are delayed for a seven-day period. During this period, a challenger can create a fraud proof to roll back an invalid state asserted by an AliceChain validator.

3. AliceChain uses DataChain (a data availability network) for data availability: the sequencer for AliceChain submits transaction batches to DataChain and collects attestations from DataChain validators to create a data availability proof. A threshold of DataChain validators (staking DATA tokens) must attest to the availability of a block’s transaction data before a new block header is accepted by the light client contract.

4. AliceChain is run by a decentralized autonomous organization (DAO) composed of holders of the governance token $ALICE. AliceDAO members can elect to replace DataChain with another data availability network if DataChain validators withhold data or revert blocks to cause a safety/liveness failure.

#### Scenario #2 {#scenario-2}

1. AliceChain uses a sequencer (or sequencer set) to provide fast-path confirmations to users and propose ordered transaction batches for execution and a set of validators to process transactions. AliceChain validators submit block headers to the on-chain light client contract on Ethereum to settle transactions.

2. AliceChain implements an on-chain dispute protocol capable of replaying disputed state transitions and verifying fraud proofs from challengers. Withdrawals from the Ethereum side of the AliceChain-Ethereum bridge are delayed for a seven-day period. During this period, a challenger can create a fraud proof to roll back an invalid state asserted by an AliceChain validator.

3. AliceChain uses a data availability committee (DAC) for data availability. The sequencer for AliceChain submits transaction batches to the DAC and collects attestations to availability of transaction data from a quorum of DAC nodes to create a proof of data availability. The on-chain light client contract verifies DAC signatures before accepting a new block header.

4. Members of the DAC for AliceChain are elected by AliceDAO. AliceDAO can replace committee members via governance—for example, if DAC nodes refuse to provide data availability attestations (stalling the system as state roots cannot be finalized) or withhold transaction data.

#### Scenario #3 {#scenario-3}

1. AliceChain uses a set of validators to process transactions and implements a Proof of Stake protocol for validators (staking $ALICE tokens) to reach consensus on state transitions. AliceChain does not use an external data availability layer and requires a threshold of validators to attest to the validity of a proposed block and availability of the block’s transaction data.

2. AliceChain implements a light client contract that receives commitments (block headers) to changes in the state of AliceChain. The light client contract verifies that signatures on a block header meet the required threshold for validity conditions specified by AliceChain’s fork-choice rule.

3. AliceChain implements an on-chain dispute protocol (capable of replaying disputed state transitions to verify fraud proofs) and imposes a seven-day delay on withdrawals from the Ethereum side of the bridge. During this period, a challenger can create a fraud proof to roll back an invalid state asserted by a majority of validators on AliceChain.

4. A challenger can also prove unavailability of a block to the on-chain dispute protocol by either forcing the block proposer to publish transaction data on-chain, or creating a fraud proof showing that one or more chunks of a block’s data is unavailable. The dispute protocol slashes the block proposer if it fails to provide transaction data, or the fraud proof passes verification.

#### Scenario #4 {#scenario-4}

1. AliceChain implements one of the previous approaches (storing transaction data with a DAC, data availability network, or a majority of AliceChain validators) with the ability to fall back to posting transaction data if the off-chain data availability provider is malfunctioning. For example, a sequencer can post transaction batches on Ethereum if the DAC or a majority of DataChain validators refuses to provide attestations required for a data availability proof.

2. The light client contract can accept a hash of the transaction batch submitted on-chain by a sequencer/validator as a substitute for data availability attestations from the external data layer. Validators can progress the chain, even with an offline or unresponsive data availability provider, by posting assertions along with a hash of transaction data on Ethereum.

In all four scenarios,AliceChain is an optimium or optimistic sidechain from the perspective of an Ethereum user: Ethereum can indeed enforce validity of state transitions if challengers publish fraud proofs on-chain, but the chain cannot guarantee liveness and safety properties for AliceChain (and the security of funds deposited in the bridge) in all cases. We share some examples for context:

### Scenario #1: data availability committee (DAC) {#scenario-1-dac}

AliceChain uses a data availability committee (DAC) to guarantee data availability.

1. **A sequencer can collude with the DAC to stall the system.** The DAC refuses to provide transaction data to create Merkle proofs of state (account balances) or inclusion of exit transactions, and the sequencer refuses to include exit transactions from honest users in transaction batches. The sequencer can stall the system by itself by refusing to create transaction batches for the DAC to approve.

2. **A validator can collude with the DAC to stall the system.** The validator refuses to publish a new state commitment that asserts execution of transactions, and the DAC refuses to release transaction data for honest validators to produce a valid block. The DAC can stall the system by itself by withholding signatures and refusing to attest to availability of a new block.

3. **A validator can collude with the DAC/sequencer to steal funds from the system.** The validator publishes a block header that asserts an invalid state and the DAC/sequencer refuses to release transaction data for challengers to create fraud proofs. The trio of a malicious DAC, validator, and a threshold of AliceDAO members can collude to steal funds—governance cannot kick out the DAC for withholding data required to create fraud proofs.

4. **The duo of a malicious majority of DAC nodes and DAO members can collude to hold users’ funds hostage.** Governance cannot remove members of the DAC for withholding signatures (stalling finalization of blocks that may contain exit transactions), or refusing to provide state data for users to create Merkle proofs of account balances or inclusion of exit transactions in blocks.

### Scenario #2: data availability network {#scenario-2-dan}

AliceChain uses a data availability network to guarantee availability of transaction data.

1. **A sequencer can collude with the data availability network to stall the system.** The sequencer and data availability network both withhold transaction data required to create Merkle proofs (of balances and exit transactions) and process bridge withdrawals. The sequencer refuses to create transaction batches, or excludes valid exit transactions from transaction batches. A threshold of malicious validators on the data availability network censor withdrawals by withholding signatures from blocks containing exit transactions and preventing honest validators from creating a data availability certificate.

2. **A validator can collude with the data availability network to stall the system.** The validator refuses to publish a new state commitment that asserts execution of transactions, and the data availability network refuses to release transaction data for honest validators to produce a valid block or attests to unavailable blocks. The data availability network can stall the system by itself by withholding signatures and refusing to attest to availability of a new block.

3. **A validator can collude with the data availability network and sequencer to steal funds from the system.** The validator publishes a block header that asserts an invalid state and the data availability network + sequencer withhold transaction data from challengers to brick fraud proofs. The trio of a malicious optimium validator, a malicious majority of the data availability network’s validators, a malicious threshold of AliceDAO members can collude to steal funds—governance cannot kick out the data availability network for withholding data required to create fraud proofs.

4. **The duo of a malicious majority of validators in a data availability network nodes and DAO members can collude to hold users’ funds hostage.** overnance cannot remove the data availability network for withholding signatures and stalling finalization of blocks (e.g., blocks containing exit transactions), or withholding state data and preventing users from creating Merkle proofs of account balances and exit transactions in blocks required to withdraw deposits from the bridge.

5. **An adversary can create a safety or liveness failure even with light nodes participating in data availability sampling (DAS) on the data availability network.** A collusion among a majority of validators or an economic attack on the staking layer in a data availability network can result in successful data withholding attacks that undermine the security of an optimium that relies on a data availability network.

- The detection of a data withholding attack requires 1/N honesty assumption: provided enough nodes randomly sample a block, an honest full node can reconstruct the original block from sampled chunks and create a fraud proof showing that parts of the block are missing. However, the punishment of data withholding requires a 2⁄3-honesty assumption: a majority of validators staked on the data availability network must sign a block that includes a (valid) fraud proof for an unavailable block.

- If the majority of validators are malicious, the protocol cannot slash validators for publishing and attesting to unavailable blocks. Without the possibility of forcing a slashing of dishonest validators for withholding data, honest nodes have little incentive to create fraud proofs to prove unavailability of transaction data.

5. Fraud proofs of data unavailability can protect light nodes observing the optimium chain. For example, an application running on an optimium chain may stop processing transactions if the application developer runs a light node for the optimium’s data availability network and detects validators are asserting new states on Ethereum without releasing transaction data. However, this can also be a form of griefing or a subtle liveness failure (e.g., preventing operation of applications) and may also lead to more complex attacks on applications with time-sensitive logic (e.g., oracles).

### Scenario #3: native PoS staking {#scenario-3-native-pos}

AliceChain uses native PoS staking to guarantee availability of transaction data.

1. **An attacker controlling a significant portion of validators can execute a safety failure.** The attacker first creates multiple unavailable blocks, until no one is willing to raise data availability challenges due to the costs of sending on-chain transactions to initiate disputes. The attacker then creates an unavailable block that asserts an invalid state (e.g., minting tokens without collateral deposited in the bridge) and submits the block header on-chain.

- Challengers cannot create a fraud proof to dispute the state transition due to unavailability of transaction data to reproduce the state transition. The light client contract accepts the attacker’s proposed state. The bridge becomes insolvent after running out of funds to pay back deposits from honest users.

2. **A threshold of malicious validators can stall the system by withholding signatures from blocks (which may contain bridge exit transactions).** An honest block proposer cannot progress the chain without the required threshold for attestations on a block header.

- The blockchain’s fork-choice rule will need to either be updated to make attestations unnecessary (fraud proofs guarantee an invalid block can be rejected by the light client contract on Ethereum during the challenge window), or a on-chain governance system implemented to remove unresponsive validators from the consensus protocol. Both solutions require trusting the honesty of the chain’s governance—that is, the holders of $ALICE (if on-chain governance is used) or the majority of validators (if off-chain governance is used, a majority of validators will agree to follow a fork that excludes unresponsive validators).

3. Depending on the optimium’s scaling factor (ratio of block data to block headers), forcing block-producing validators to post data on-chain in response to data availability challenges can reduce the usefulness of optimiums as a scaling solution for Ethereum. As off-chain scaling solutions, the idea is to minimize the amount of state Ethereum must process to guarantee security of bridged funds.

- In a worst-case scenario, such as a malicious validator set producing thousands of unavailable blocks, a massive wave of data availability challenges (triggered by users who want access to transaction data required to create Merkle proofs and exit funds) may cripple Ethereum itself due to the amount of data being posted on-chain. This is reminiscent of the mass exit problem in Plasma.

4. **An adversary can still create a safety or liveness failure even with light nodes participating in data availability sampling (DAS) on the sidechain.** A collusion among a majority of validators or an economic attack on the optimium’s staking layer can result in successful data withholding attacks that undermine the optimium chain’s security.

- The detection of a data withholding attack requires 1/N honesty assumption: provided enough nodes randomly sample a block, an honest full node can reconstruct the original block from sampled chunks and create a fraud proof showing that parts of the block are missing. However, the punishment of data withholding requires a 2⁄3-honesty assumption: a majority of validators staked on the data availability network must sign a block that includes a (valid) fraud proof for an unavailable block.

- If the stakes of an optimium’s validators are managed by a contract on Ethereum, an honest validator can trigger slashing by submitting a fraud proof (of data unavailability) along with a block header with the required threshold of signatures. However, if the majority is malicious and refuses to sign the block containing evidence of data withholding, the protocol cannot slash validators for publishing and attesting to unavailable blocks.

- Without the possibility of forcing a slashing of dishonest validators for withholding data, honest nodes have little incentive to create fraud proofs to prove unavailability of transaction data. This means the light client contract on Ethereum cannot detect unavailability of transaction data for new states asserted by a new block header. Nor can challengers cannot create a fraud proof to prove invalidity of transactions if the block header attests to an incorrect state transition.

- Governance can update the optimium’s fork-choice rule to reduce the threshold of validators required to attest to blocks, make attestations unnecessary (fraud proofs guarantee an invalid block can be rejected by the light client contract on Ethereum during the challenge window), or remove unresponsive validators from the consensus protocol. Each solution requires trusting the optimium chain’s governance—that is, the holders of $ALICE (if on-chain governance is used) or the majority of validators (if off-chain governance is used, a majority of validators will agree to restart the chain without unresponsive validators).

5. Fraud proofs of data unavailability can protect light nodes observing the optimium chain. For example, an application running on an optimium chain may stop processing transactions if the application developer runs a light node for the optimium’s data availability network and detects validators are asserting new states on Ethereum without releasing transaction data. However, this can also be a form of griefing or a subtle liveness failure (e.g., preventing operation of applications) and may also lead to more complex attacks on applications with time-sensitive logic (e.g., oracles).

### Scenario #4: external data availability layer {#scenario-4-external-da}

AliceChain uses a external data availability layer with the ability to fall back to on-chain data availability if data availability provider is malfunctioning.

Forcing a sequencer or validator to fall back to posting transaction data on-chain may result in an extremely high increase in operating costs depending on the optimium’s scaling factor (ratio of block bodies to block headers) due to the higher costs of on-chain data availability. Increased operating costs will (inevitably) lead to increased transaction fees. This can make data withholding a form of griefing, especially if ultra-low transaction fees is the dominant motivation for the majority of the optimium’s users.

If optimium users are unable to pay the higher costs of executing transactions, they are effectively stuck in the system without a way to withdraw funds back to Ethereum. These costs include the cost of submitting a batch of exit transactions (borne by the sequencer/validator) and the cost of submitting a state commitment (block header) that attests to the execution of exit transactions (borne by the validator).

This edge case is also why “an optimium with a mechanism for switching to optimistic rollup mode” ≠ “a chain with security guarantees equivalent to a Layer 2 (L2) rollup”. The value of an escape hatch that allows an optimium to switch to optimistic rollup mode (posting transaction data + verifying fraud proofs on-chain) is contingent on the ability of users to cover the costs of publishing exit transactions on-chain and asserting validity of bridge exits.

Moreover, an optimium’s users may be incentivized to pay the escape hatch _once_, but an adversary can continue to create unavailable blocks and withhold data—in collusion with the data availability provider—and force users to continually pay the cost of using the escape hatch to exit funds. This represents an ongoing tax on users and a penalty for using the optimium chain with security guarantees and may contribute to the optimium chain becoming unusable for average users.

## Further reading on optimiums {#further-reading}

- [A framework for understanding security properties of sidechains](https://ethresear.ch/t/understanding-sidechains/8045)
- [The Ethereum Off-Chain Data Availability Landscape](https://blog.celestia.org/ethereum-off-chain-data-availability-landscape/)
