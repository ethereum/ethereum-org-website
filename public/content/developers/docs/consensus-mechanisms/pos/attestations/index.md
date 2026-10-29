---
title: Attestations
description: A description of attestations on proof-of-stake Ethereum.
lang: en
---

A validator is expected to create, sign and broadcast an attestation during every epoch. This page outlines what these attestations look like and how they are processed and communicated between consensus clients.

## What is an attestation? {#what-is-an-attestation}

Every [epoch](/glossary/#epoch) (6.4 minutes) a validator proposes an attestation to the network. The attestation is for a specific slot in the epoch. The purpose of the attestation is to vote in favor of the validator's view of the chain, in particular the head of the chain, the most recent justified checkpoint and the checkpoint at the start of the current epoch (known as `source` and `target` checkpoints). This information is combined for all participating validators, enabling the network to reach consensus about the state of the blockchain.

Since the [Pectra upgrade](/roadmap/pectra/) ([EIP-7549](https://eips.ethereum.org/EIPS/eip-7549)), an attestation from a single validator and an aggregated attestation have different formats. A single validator's attestation contains:

- `committee_index`: the committee the validator belongs to in the given slot
- `attester_index`: the validator's index
- `data`: details relating to the attestation, as defined below
- `signature`: the validator's BLS signature over the `data`

The first task for an attesting validator is to build the `data`. The `data` contains the following information:

- `slot`: The slot number that the attestation refers to
- `index`: Always `0` since Pectra. The committee is identified outside the `data` (by `committee_index`, or by `committee_bits` in an aggregate) so that votes from different committees have identical `data` and can be aggregated together. Before Pectra, this field identified the committee
- `beacon_block_root`: Root hash of the block the validator sees at the head of the chain (the result of applying the fork-choice algorithm)
- `source`: Part of the finality vote indicating what the validators see as the most recent justified block
- `target`: Part of the finality vote indicating what the validators see as the first block in the current epoch

Once the `data` is built, the validator signs it and broadcasts the attestation to the [subnet](#aggregated-attestation) for its committee.

### Aggregated attestation {#aggregated-attestation}

There is a substantial overhead associated with passing this data around the network for every validator. Therefore, the attestations from individual validators are aggregated within subnets before being broadcast more widely. This includes aggregating signatures together so that an attestation that gets broadcast includes the consensus `data` and a single signature formed by combining the signatures of all the validators that agree with that `data`. An aggregated attestation contains:

- `aggregation_bits`: a bitlist with one bit per member of each included committee, where the position maps to the validator's position in its committee; the value (0/1) indicates whether that validator's signature is included
- `data`: the attestation data every included validator signed
- `signature`: a BLS signature that aggregates the signatures of the included validators
- `committee_bits`: which committees' members are covered by `aggregation_bits`

Anyone can check the aggregated signature against the combined public keys of the validators whose bits are set.

In every slot, about 16 members of each committee are selected to be its `aggregators` (`TARGET_AGGREGATORS_PER_COMMITTEE`). A validator learns whether it was selected from its own signature over the slot number. The aggregators collect all the attestations they hear on their committee's subnet that have the same `data` as their own, and combine them, recording the sender of each in the `aggregation_bits`. The aggregators then broadcast the aggregate to the wider network.

When a validator is selected to be a block proposer, they include aggregate attestations from recent slots in the new block. Since Pectra, the proposer can merge aggregates from different committees that share the same `data` into one attestation, and a block can hold up to 8 of them.

### Attestation inclusion lifecycle {#attestation-inclusion-lifecycle}

1. Generation
2. Propagation
3. Aggregation
4. Propagation
5. Inclusion

The attestation lifecycle is outlined in the schematic below:

<AttestationsDiagram />

## Rewards {#rewards}

Validators are rewarded for submitting attestations. The attestation reward depends on the participation flags (source, target and head), the base reward and the participation rate.

Each of the participation flags can be either true or false, depending on the submitted attestation and its inclusion delay.

The best scenario occurs when all three flags are true, in which case a validator would earn (per correct flag):

`reward += base reward * flag weight * flag attesting rate / 64`

The flag attesting rate is measured using the sum of effective balances of all attesting validators for the given flag compared the total active effective balance.

### Base reward {#base-reward}

The base reward is calculated according to the number of attesting validators and their effective staked ether balances:

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### Inclusion delay {#inclusion-delay}

At the time when the validators voted on the head of the chain (`block n`), `block n+1` was not proposed yet. Therefore attestations naturally get included **one block later** so all attestations who voted on `block n` being the chain head got included in `block n+1` and, the **inclusion delay** is 1. The inclusion delay decides which participation flags an attestation earns:

- `head`: only if the inclusion delay is exactly 1 slot
- `source`: if the inclusion delay is at most 5 slots (the integer square root of the 32 slots in an epoch)
- `target`: whenever the attestation is included (since the Deneb upgrade, [EIP-7045](https://eips.ethereum.org/EIPS/eip-7045))

So an attestation included two slots late loses its head reward but still earns the source and target rewards.

### Attestation scenarios {#attestation-scenarios}

#### Missing Voting Validator {#missing-voting-validator}

An attestation can be included in any block from the slot after it was made until the end of the following epoch. If an attestation from epoch 0 is not included in a block during epoch 0, it can still be included in epoch 1, with a longer inclusion delay.

#### Missing Aggregator {#missing-aggregator}

Each committee aims for about 16 aggregators in every slot, so one missing aggregator rarely stops a committee's attestations from being aggregated. Separately, every beacon node stays subscribed to **two subnets for 256 epochs** at a time, chosen from its node ID, which keeps every subnet well connected.

#### Missing block proposer {#missing-block-proposer}

Note that in some cases a lucky aggregator may also become the block proposer. If the attestation was not included because the block proposer has gone missing, the next block proposer would pick the aggregated attestation up and include it into the next block. However, the **inclusion delay** will increase by one.

## Further reading {#further-reading}

- [Attestations in Vitalik's annotated consensus spec](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Attestations in eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)
- [Attestations in the Electra consensus spec](https://github.com/ethereum/consensus-specs/blob/master/specs/electra/beacon-chain.md#attestation)

_Know of a community resource that helped you? Edit this page and add it!_
