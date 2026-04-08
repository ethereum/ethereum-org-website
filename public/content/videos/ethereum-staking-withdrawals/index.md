---
title: "How do Ethereum withdrawals work?"
description: "How staking withdrawals work on Ethereum after the Shanghai/Capella upgrade, covering the technical process, withdrawal queue, and what stakers need to know about accessing their staked ETH."
lang: en
youtubeId: "RwwU3P9n3uo"
uploadDate: 2023-03-30
duration: "0:11:39"
educationLevel: intermediate
topic:
  - "how-ethereum-works"
  - "staking"
  - "withdrawals"
format: explainer
author: Finematics
breadcrumb: "Staking Withdrawals"
---

An explainer by **Finematics** covering how staking withdrawals work on Ethereum after the Shanghai/Capella upgrade, including the mechanics of partial and full withdrawals, common misconceptions, and the implications for the staking ecosystem.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=RwwU3P9n3uo) published by Finematics. It has been lightly edited for readability.*

#### The Beacon Chain (0:31) {#the-beacon-chain-031}

With the Shanghai/Capella upgrade rapidly approaching, there is a lot of discussion about Ethereum staking withdrawals and what this means for the Ethereum ecosystem as a whole.

Let's start with understanding how we got here and why staking withdrawals weren't enabled when Ethereum moved from proof of work to proof of stake.

The transition to proof of stake happened over multiple steps to minimize the number of big changes happening at the same time. This approach was essential, especially for an established network settling trillions of dollars of value per year. The most significant steps were: the launch of the Beacon Chain, and the Merge.

The launch of the Beacon Chain in 2020 created the foundation for the transition by creating a separate proof-of-stake consensus layer, running alongside the Ethereum proof-of-work chain. Launching the Beacon Chain earlier allowed for the accumulation of enough ETH to secure the network before settling real-value transactions. It also allowed the testing of the new proof-of-stake consensus model for an extended period with real funds at stake.

The early network participants committed millions of ETH to secure the Ethereum proof-of-stake network despite knowing they wouldn't be able to withdraw their ETH until much later.

The next big step, the Merge, united the proof-of-stake consensus layer with the execution layer. This allowed for finally moving off proof of work and maintaining only one canonical chain — Ethereum — now secured by millions of staked ETH. The Merge was by far the largest change ever to Ethereum. Due to the nature of the upgrade, it had to happen without any downtime.

To minimize risk, the scope of the Merge was reduced, and no other features — outside of the proof-of-work to proof-of-stake switch — were included as part of the upgrade. The biggest "cut" that had to be done impacted withdrawals, which became the focus of the upcoming Shanghai/Capella upgrade.

#### Withdrawals (2:09) {#withdrawals-209}

Staking withdrawals, as the name suggests, will allow stakers to withdraw their locked-up ETH. There are two types of withdrawals: "partial" and "full."

A **partial withdrawal** happens when the validator withdraws their accumulated rewards — the extra balance on top of the maximum effective balance of 32 ETH. A partial withdrawal can also be referred to as a "reward payment" or "excess balance payment."

A **full withdrawal** happens when the validator has completed the process of exiting and the entire balance is withdrawn. This occurs only when the validator exits the system either voluntarily or by being forcibly removed in a process called "slashing."

Once enabled, staking withdrawals will be automatically distributed every few days. Additionally, the withdrawal process initiates on the consensus layer, so no transaction fee is required at any of the steps.

In order to start withdrawing their staking rewards, a validator will have to provide their withdrawal address only once. Given withdrawals affect both the consensus and execution layers of Ethereum, both parts of the network must be updated. "Shanghai" is the name of the execution layer upgrade containing withdrawals, which are specified in EIP-4895. "Capella" is the name of the counterpart consensus layer upgrade, activated at the same time. These two upgrades are sometimes also referred to as "Shapella."

#### Mechanics (3:40) {#mechanics-340}

In the Ethereum ecosystem, each validator has a corresponding index number. In addition, they also have two types of withdrawal credentials, defined as either `0x00` or `0x01`.

`0x00` indicates that a particular validator doesn't have an associated withdrawal address. These credentials are derived as the hash of the BLS public key with its first byte swapped out with a zero byte — hence the name.

`0x01` means that a validator provided their withdrawal address. These withdrawal credentials are represented as `0x01` followed by 11 bytes of zeros, then a chosen Ethereum address.

In order to enable withdrawals, validators with `0x00` credentials will need to sign a "BLSToExecutionChange" message. This will be possible after the Capella upgrade.

Once withdrawals are enabled, a validator proposing a block will scan linearly through validator indices to find the first 16 validators with `0x01` credentials who either:

- Have a balance that exceeds 32 ETH (accrued validator rewards)
- Are "withdrawable" (have fully exited the validator set)

The linear search stops after either finding 16 validators matching these criteria or after 16,384 iterations. The algorithm remembers the index at which the search stopped, so the next validator proposing a block can resume from that index. After getting to the last index, the algorithm starts from the beginning — index 0.

A good analogy would be an analog clock where the hand points to the hour, progresses in one direction, doesn't skip any hours, and eventually wraps around to the beginning again after the last number is reached.

After the scan is completed, the validator creates a list of withdrawals to be included in their execution payload. Each item on the list contains:

- **WithdrawalIndex** — a monotonically increasing index, starting from 0, that increments by 1 per withdrawal to uniquely identify each withdrawal
- **ValidatorIndex** — the index of the validator whose balance is being withdrawn
- **ExecutionAddress** — the ETH address on the execution layer where the withdrawal should be sent
- **Amount** — the amount, in gwei, to be sent to the execution address

When building or processing a block, execution layer clients apply these withdrawals at the end of a block. Processing withdrawals does not compete with user transactions for block space. With a maximum of 16 withdrawals processed per block, there should be a maximum of 115,200 withdrawals processed per day, assuming no missed slots.

The design of withdrawals is simple yet extremely robust.

#### Misconceptions (6:30) {#misconceptions-630}

The first misconception states that when processing withdrawals, there is a difference between a "full" and a "partial" withdrawal in terms of priority or ordering. Both full and partial withdrawals happen when the linear scan over the validator set reaches a validator's index. The only difference is that in the case of full withdrawals, a validator must leave the exit queue and reach the "withdrawable epoch" before the linear scan can pick it up.

Another misconception is that users will lose their rewards if they do not provide a withdrawal address. This is not true — in case a validator forgets to provide a withdrawal address, their ETH rewards will not be sent to the void once withdrawals are enabled. Instead, the scan will skip validators who haven't provided their withdrawal addresses.

It's important to remember that the withdrawal address cannot be changed and is set only once. Stakers must be extremely careful when setting up the withdrawal address, ensuring they have full ownership of the address provided.

There is also speculation that stakers will withdraw a lot of ETH from the Ethereum ecosystem once withdrawals are enabled, with the stronger version of this argument assuming it will destabilize the proof-of-stake consensus mechanism. Although we cannot fully predict how much ETH will be withdrawn over time, there are a few important counterarguments:

First, most stakers are early Ethereum adopters who were brave enough to stake when it was still uncertain when withdrawals would be enabled. Many stakers have expressed their desire to continue staking to support the network and to continue earning ETH-denominated rewards.

Second, to ensure that the proof-of-stake consensus mechanism and the active set of validators remain stable, Ethereum implemented a withdrawal queue for all validators wishing to exit. This queue limits the number of validators that can leave the ecosystem simultaneously.

The first withdrawal scan will withdraw a lot of accumulated rewards — basically since the inception of the Beacon Chain. However, the subsequent ones will process a much smaller amount of ETH.

#### Implications (8:39) {#implications-839}

Enabling withdrawals will create an open, two-sided staking flow. Currently, the staking flow is one-sided — ETH can only flow into the network and never exit it. Interestingly, enabling withdrawals may incentivize even more people to stake, as they will know they can always withdraw their ETH if needed for something else.

Stakers who don't run their own validators and stake with a centralized staking provider will be able to change their provider to a different one. They can withdraw funds from a provider that offers a lower staking rate to one that offers a better rate, move from a centralized provider to a decentralized one, or even run their own validator.

Withdrawals will also impact liquid staking derivatives such as Lido, Rocket Pool, and others. Liquid staking tokens like stETH or rETH had a history of temporarily losing their peg to the price of ETH during market turbulence. However, with the two-sided staking flow, any significant discrepancy in their peg would be quickly arbitraged away.

Early adopters in liquid staking and centralized staking captured a vast majority of the market as they didn't have much competition. However, the market share of these incumbent players could see a major change once withdrawals are enabled, especially if they don't offer a competitive rate. The ability to shift freely between staking providers will benefit the ETH staking market.

#### Summary (10:01) {#summary-1001}

Enabling staking withdrawals is one of the most anticipated upgrades to Ethereum. It will be extremely important to make sure this change is executed smoothly. In order to help with testing, validators will have several devnets and testnets available to run through the process and iron out any potential issues before going live on the mainnet.

Withdrawals are yet another improvement bringing Ethereum one step further towards building a sustainable, secure, and decentralized future. The Shapella upgrade is expected to take place in the first half of 2023.

At the time of this video, the Beacon Chain accumulated over 17 million ETH across over 530,000 validators. An average balance for a validator is just above 34 ETH, which means over 1 million ETH in accumulated rewards. It will be interesting to see how withdrawals will affect these numbers.
