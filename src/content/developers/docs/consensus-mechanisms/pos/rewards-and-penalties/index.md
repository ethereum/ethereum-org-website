---
title: Proof-of-stake rewards and penalties
description: Learn about the in-protocol incentives in proof-of-stake Ethereum.
lang: en
sidebar: true
---

Ethereum is secured using its native cryptocurrency, ether (ETH). Node operators that wish to participate in validating blocks and identifying the head of the chain deposit ether into a smart contract on Ethereum. They are then paid in ether to run validator software that checks the validity of new blocks received over the peer-to-peer network and apply the fork-choice algorithm to identify the head of the chain.

There are two primary roles for a validator: 1) checking new blocks and “attesting” to them if they are valid, 2) proposing new blocks when selected at random from the total validator pool. If the validator fails to do either of these tasks when asked they miss out on an ether payout. Validators are also sometimes tasked with signature aggregation and participating in sync committees.

There are also some actions that are very difficult to do accidentally and signify some malicious intent, such as proposing multiple blocks for the same slot or attesting to multiple blocks for the same slot. These are “slashable” behaviors that result in the validator having some amount of ether (up to 1 ETH) burned before the validator is removed from the network, which takes 36 days. The slashed validator’s ether slowly drains away across the exit period, but on Day 18 they receive a “correlation penalty” which is larger when more validators are slashed around the same time. The Beacon Chain’s incentive structure therefore pays for honesty and punishes bad actors.

All rewards and penalties are applied once per epoch.

Read on for more details...

## Rewards and penalties {#rewards}

### Attestation rewards {#attestation-rewards}

Validators receive attestation rewards when they make votes that are consistent with the majority of other validators. The value of the attestation rewards in each epoch are calculated from a `base_reward`. This is the base unit that other rewards are calculated from. The `base_reward` represents the average reward received by a validator under optimal conditions per epoch. This is calculated from the validator's effective balance and the total number of active validators as follows:

```
base_reward = effective_balance * (base_reward_factor / (base_rewards_per_epoch * sqrt(sum(active_balance))))
```

where `base_reward_factor` is 64, `base_rewards_per_epoch` is 4 and `sum(active balance)` is the total staked ether across all active validators.

This means the base reward is proportional to the validator's effective balance and inversely proportional to the number of validators on the network. The more validators, the greater the overall issuance (as `sqrt(N)` but the smaller the `base_reward` per validator (as `1/sqrt(N)`). These factors influence the APR for a staking node. Read the rationale for this in [Vitalik's notes](https://notes.ethereum.org/@vbuterin/rkhCgQteN?type=view#Base-rewards).

For each slot in an epoch, 1/8 of the `base_reward` goes to the block proposer, and 7/8 is available to be split over the attesting validators assigned to that slot. 

The `base_reward` for each validator is then also multiplied by the `participation_rate` which is the fraction of all active validators that participate consistently with each other. So, if all validators attest identically, `base_reward`==`base_reward`, if 10% of validators fail to participate or do so differently to the majority `base_reward` == `base_reward * 0.9`. This ensures there is no benefit to attacking other validators.

The `base_reward` is also modified by the `inclusion_delay` which rewards prompt attestations, and degrades the reward for delayed attestations as these are less valuable to the network when forming consensus. If the distance between the attestation and block it is included in is only one block, the attester received the full `7/8 * base_reward`. 

This is the maximum possible reward, and will degrade inversely as the number of blocks increases before the attestation is included. If we denote this "inclusion distance" as `k`, the maximum reward (`7/8 * base_reward`) is divided by `k` to determine the reward after inclusion delay: `(7/8 * base_reward) / k`. Since an attestation cannot be included in the same slot, the optimal distance is one. The further allowable distance is 32 before the attestation is forfeited entirely. The inclusion delay factor can be summed up as `inclusion_delay = 7 / (8 * k)`.

Note that empty slots (where a block was not proposed) do not count towards the inclusion distance for attestations from other validators. If a validator is assigned to attest to the 10th slot in an epoch, and there is no block proposed for the 11th slot causing the attestation to be included in a block at slot 12, this would still be considered an inclusion distance of 1. This prevents penalizing active validators for another validator being unavailable.

There are also three additional rewards: `source` (reward for voting for the correct source checkpoint), `target` (reward for voting for the correct target checkpoint), `head` (reward for voting for the correct head block). The value of each of these is equal to `base_reward * inclusion_delay * participation_rate`. The same value can be removed from the validator's balance as a penalty for an incorrect or missing `source`, `target` or `head` vote.

When validators are assigned to sync committees they receive rewards for each slot they sign off. When validators in a sync committee fail to sign blocks they are penalized exactly the value of ether they would have received for signing successfully.

### Attestation scenarios

Assuming attestations are timely (included in the very next block, inclusion distance of 1) the following table describes the attestation rewards for four scenarios:

| `source`          | `target`          | `head`            | `base_reward`                            | penalty            | `inclusion_delay`    | Result                                                            |
| ----------------- | ----------------- | ----------------- | ---------------------------------------- | ------------------ | -------------------- | ----------------------------------------------------------------- |
| incorrect/missing | incorrect/missing | incorrect/missing | 0                                        | 3 \* `base_reward` | 0                    | -3 \* `base_reward`                                               |
| correct           | incorrect/missing | incorrect/missing | `base_reward` \* `participation_rate`    | 2 \* `base_reward` | `base_reward` \* 7/8 | `base_reward` _ `participation_rate` - 9/8 _ `base_reward`        |
| correct           | correct           | incorrect/missing | 2 _ `base_reward` _ `participation_rate` | `base_reward`      | `base_reward` \* 7/8 | (2 _ `base_reward` _ `participation_rate`) - 1/8 \* `base_reward` |
| correct           | correct           | correct           | 3 _ `base_reward` _ `participation_rate` | 0                  | `base_reward` \* 7/8 | (3 _ `base_reward` _ `participation_rate`) + `base_reward` \* 7/8 |

Assuming a 100% `participation_rate`:

- You vote correctly and gets included in the next slot: you get 31/8 \* `base_reward`
- You miss head because you got a late block and it gets included in the next slot: you get 15/8 \* `base_reward`
- You miss head and target cause you got late a block, you get -1/8 \* `base_reward`
- You attest and vote correctly, but the next block is missed, you get 55/16 \* `base_reward`

Overall these penalties are fairly mild and amount to a very slow bleed of staked ether for continued inactivity.

### Block reward {#block-reward}

When validators are selected to be block proposers they get rewarded if their proposed block gets finalized. Block proposers can also increase their reward by including evidence of misbehavior by other validators in their proposed block. These rewards are the "carrots" that encourage validator honesty.

Only **valid** attestations (correct source checkpoint) can be included in a block and the rewards for a block proposal scale with the amount of included attestations because they receive 1/8 of the `base_reward` for every attestation in the block. There is no penalty for failing to propose a block.

A block proposer which includes slashing will be rewarded with the `slashed_validators_effective_balance / 512` where `512` is the `Whistleblower_reward_quotient`

## Slashing {#slashing}

Slashing is a more severe action that results in the forceful removal of a validator from the network and an associated loss of their staked ether. There are three ways a validator can be slashed, all of which amount to the dishonest proposal or attestation of blocks:

- By proposing and signing two different blocks for the same slot
- By attesting to a block that "surrounds" another one (effectively changing history)
- By "double voting" by attesting to two candidates for the same block

If these actions are detected, the validator is slashed. This means that 1/64th of their staked ether (up to a maximum of 0.5 ether) is immediately burned, then a 36 day removal period begins. During this removal period the validators stake gradually bleeds away. At the mid-point (Day 18) an additional penalty is applied whose magnitude scales with the total staked ether of all slashed validators in the 36 days prior to slashing event. This means that when more validators are slashed, the magnitude of the slash increases. The maximum slash is the full effective balance of all slashed validators (i.e. if there are lots of validators being slashed they could lose their entire stake). On the other hand, a single, isolated slashing event only burns a small portion of the validator's stake. This midpoint penalty that scales with the number of slashed validators is called the "correlation penalty".

## Inactivity Leak {#inactivity-leak}

If the Beacon Chain has gone more than four epochs without finalizing, an emergency protocol called the "inactivity leak" is activated. The ultimate aim of the inactivity leak is to create the conditions required for the chain to recover finality. As explained above, finality requires a 2/3 majority of the total staked ether to agree on source and target checkpoints. If validators representing more than 1/3 of the total validators go offline or fail to submit correct attestations then it is not possible for a 2/3 supermajority to finalize checkpoints. The inactivity leak lets the stake belonging to the inactive validators gradually bleed away until they control less than 1/3 of the total stake, allowing the remaining active validators finalize the chain. However large the pool of inactive validators, the remaining active validators will eventually control >2/3 of the stake. The loss of stake is a strong incentive for inactive validators to reactivate as soon as possible!

The reward, penalty and slashing design of the Beacon Chain encourages individual validators to behave correctly. However, from these design choices emerges a system that strongly incentivizes equal distribution of validators across multiple clients, and should strongly disincentivize single-client dominance.

## Further Reading {#further-reading}

[Upgrading Ethereum: The incentive layer](https://eth2book.info/altair/part2/incentives)
[Incentives in Ethereum's hybrid Casper protocol](https://arxiv.org/pdf/1903.04205.pdf)
[Rewards and Penalties on Ethereum 2.0](https://consensys.net/blog/codefi/rewards-and-penalties-on-ethereum-20-phase-0/)
[Vitalik's annotated spec](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#rewards-and-penalties-1)
[Eth2 Slashing Prevention Tips](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50)

_Sources_  
_[https://consensys.net/blog/codefi/rewards-and-penalties-on-ethereum-20-phase-0/](https://consensys.net/blog/codefi/rewards-and-penalties-on-ethereum-20-phase-0/)_
_[https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/](https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/)_
