---
title: Block proposal
description: Explanation of how blocks are proposed in proof-of-stake Ethereum.
lang: en
---

Blocks are the fundamental building units of the Ethereum blockchain. Each block contains a snapshot of consensus-layer activity and execution-layer transactions. They are propagated across the network, validated by nodes, and appended to local databases to extend the canonical chain. This page provides a more detailed overview of how blocks are proposed in proof-of-stake (PoS) Ethereum.

## Prerequisites {#prerequisites}

Block proposal is a core component of the PoS consensus mechanism. For best understanding, you should be familiar with:
- [Proof-of-stake](/developers/docs/consensus-mechanisms/pos/)
- [Block architecture](/developers/docs/blocks/)
- [Fork choice and attestations](/developers/docs/consensus-mechanisms/pos/gasper/)

## Who produces blocks? {#who-produces-blocks}

Blocks are produced by **validator accounts**. Each validator is a participant who:
- Runs consensus and execution clients,
- Has deposited **32 ETH** into the deposit contract,
- And is responsible for attesting and occasionally proposing blocks.

Time in Ethereum is divided into **slots** (12 seconds each) and **epochs** (32 slots = 6.4 minutes).  
Every slot is an opportunity to propose a new block, but **only one validator** is responsible for proposing in each slot.

### Random selection {#random-selection}

Validator selection is **pseudo-random**. True randomness is impossible in a deterministic distributed system, so Ethereum uses an unpredictable yet verifiable scheme based on **RANDAO**.

Key properties:

- Each validator contributes randomness by revealing a signature-based value each epoch.
- The global RANDAO value updates once per epoch and becomes the randomness seed.
- This seed is mixed with the slot number to derive a unique proposer index for every slot.
- Validator selection is determined **two epochs in advance** to prevent last-minute biasing attempts.

The probability of being selected depends on a validator's **effective balance**, capped at 32 ETH.  
Validators with balances below 32 ETH have proportionally lower chances of being selected.

Producing more than one block in the same slot (“equivocating”) is a **slashable offense**.

## How is the block created? {#how-is-a-block-created}

Once chosen, the block proposer must construct and broadcast a **signed beacon block** that builds on the current head of the chain according to their **fork choice rule** (LMD-GHOST).

The proposer:
1. Applies queued attestations from the previous slot.
2. Determines the head block with the highest accumulated attestation weight.
3. Builds a new block on top of that parent.

A beacon block contains the following fields:

```rust
class BeaconBlockBody(Container):
    randao_reveal: BLSSignature
    eth1_data: Eth1Data
    graffiti: Bytes32
    proposer_slashings: List[ProposerSlashing, MAX_PROPOSER_SLASHINGS]
    attester_slashings: List[AttesterSlashing, MAX_ATTESTER_SLASHINGS]
    attestations: List[Attestation, MAX_ATTESTATIONS]
    deposits: List[Deposit, MAX_DEPOSITS]
    voluntary_exits: List[SignedVoluntaryExit, MAX_VOLUNTARY_EXITS]
    sync_aggregate: SyncAggregate
    execution_payload: ExecutionPayload
```

Explanation of major fields:

- **randao_reveal** – The proposer signs the current epoch number to reveal their part of the RANDAO randomness.
- **eth1_data** – Information about the deposit contract and deposit tree, used to verify new validator deposits.
- **graffiti** – A 32-byte custom field for messages, metadata, or node identification.
- **proposer_slashings / attester_slashings** – Evidence of slashable behavior detected by the proposer.
- **attestations** – Attestations collected from the network during or before the slot.
- **deposits** – Newly processed deposits enabling new validators to join.
- **voluntary_exits** – Validators requesting to exit.
- **sync_aggregate** – Signatures from sync committee participants supporting light clients.

### Execution payload

The `execution_payload` embeds a full execution-layer block (the “transaction block”) inside the beacon block.  
Its structure follows the Ethereum Yellow Paper with notable differences:
- No ommers,
- `prev_randao` replaces the former `difficulty` value.

The execution client locally selects transactions from its mempool, executes them, updates the state trie, and outputs:
- A transaction list,
- A new state root (post-state root),
- Receipts and gas-related fields.

This payload is then included in the beacon block.

After assembling the block, the proposer **signs and broadcasts** it over the consensus-layer gossip network.

## What happens to the block? {#what-happens-to-blocks}

Once broadcast, the block spreads rapidly across the validator network.

Each receiving validator:
1. Verifies the block signature.
2. Checks proposer index correctness.
3. Confirms the block belongs to the correct slot.
4. Validates the beacon block fields (attestations, slashings, deposits, exits, etc.).
5. Passes the `execution_payload` to the execution client.
6. Re-executes transactions to confirm the claimed state changes.
7. Ensures the block extends a valid parent chain.
8. Adds the block to the local canonical chain.

If the block is valid, it becomes the head (unless fork choice rules select a different branch).  
This process repeats at every new slot.

## Block rewards {#block-rewards}

Proposers receive rewards for producing valid blocks. Rewards come from:

- A share of the **base reward**, derived from the total number of active validators.
- Additional rewards for including attestations:
  - More included attestations = higher proposer reward.
- A reward for reporting slashable behavior:
  - `1/512 * effective_balance` for each slashed validator.

Rewards incentivize timely proposals and inclusion of as much consensus data as possible.

## Further reading {#further-reading}

- [Introduction to blocks](/developers/docs/blocks/)
- [Introduction to proof-of-stake](/developers/docs/consensus-mechanisms/pos/)
- [Ethereum consensus specifications](https://github.com/ethereum/consensus-specs)
- [Introduction to Gasper](/developers/docs/consensus-mechanisms/pos/)
- [Upgrading Ethereum](https://eth2book.info/)
