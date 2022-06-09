---
title: How The Merge impacts ether supply
description: Breakdown on how The Merge will impact ether supply
lang: en
sidebar: true
---

# How The Merge impacts ether supply {#how-the-merge-impacts-ether-supply}

<Card
emoji=":chart_decreasing:">

- Mining rewards ~13,000 ETH/day pre-merge
- Staking rewards ~1,600 ETH/day pre-merge
- **After The Merge, only the ~1,600 ETH per day will remain, dropping total new ETH issuance by ~90%**
- <Emoji text=":fire:" size="1" /> The burn: At an average gas price of at least 16 gwei, at least 1,600 ETH is burned every day, which effectively brings net ETH inflation to zero or less post-merge.

</Card>

We can break the supply of ETH into two primary forces: issuance, and burn.

The **issuance** of ETH is the process of creating ETH that did not previously exist on the balance sheet, while the **burning** of ETH refers to when existing ETH is permanently removed from circulation. The rate of each of these fluctuates based on a number of parameters, and the balance between them determines the resulting inflation/deflation rate of ether.

The way ETH is issued will undergo some changes at time of The Merge. Currently, new ETH is issued from two main sources: the execution layer (EL, i.e. Mainnet) and the consensus layer (CL, i.e. Beacon Chain). After The Merge, issuance from the execution layer will go to zero. Let's break this down.

## Pre-merge {#pre-merge}

### EL Issuance {#el-issuance-pre-merge}

Under proof-of-work, miners only interact with the EL, and are rewarded in the form of block rewards being the first to solve blocks. Since the [Constantinople upgrade](/history/#constantinople) on Feb-28-2019 this reward has been 2 ETH per block. Miners are also rewarded for publishing [ommer](/glossary/#ommer) blocks, which are valid blocks that don't end up in the longest/canonical chain. These rewards max out at 1.75 ETH per ommer, and are _in addition to_ the reward issued from the canonical block. Mining is an economically intensive activity, which requires high levels of ETH issuance to sustain.

### CL Issuance {#cl-issuance-pre-merge}

The [Beacon Chain](/history/#beacon-chain-genesis) has been live since Dec-01-2020, which is secured by proof-of-stake validators, not miners. This chain was bootstrapped by Ethereum users depositing ETH one-way into a smart contract on Mainnet, which the Beacon Chain listens to, crediting the user with an equal amount on the new chain. Right now these validators are not processing transactions, and are essentially coming to consensus on the state of the validator pool itself.

Issuance of new ETH on this chain is rewarded to validators for properly attesting to the state of the chain, and is also rewarded when a validator proposes a block. Rewards (or penalties) are calculated and distributed every epoch (6.4 minutes) based on validator performance for that time period. These rewards are _significantly_ lower than the 2 ETH being issued under proof-of-work today every ~13.5 seconds, as operating a validating node is not an economically intense activity, thus does not require or warrant as high a reward.

### Pre-merge issuance breakdown {#pre-merge-issuance-breakdown}

Total ETH supply: **~119,300,000 ETH** (as of Q2 2022)

**EL issuance:** <br/>

- Estimating at 2.08 ETH per 13.3 seconds\*: **~4,930,000** ETH issued in a year
- Currently inflating at **~4.13%** (4.93M per year / 119.3M total)
- \*This includes the 2 ETH per canonical block, plus an average of 0.08 ETH over time from ommer blocks. Also uses 13.3 second, the baseline block time target without any influence from a [difficulty bomb](/glossary/#difficulty-bomb). ([See source](https://bitinfocharts.com/ethereum/))

**CL issuance:**

- Using 13,000,000 total ETH staked, the rate of ETH issuance is ~1600 ETH/day ([SeeSource](https://ultrasound.money/))
- Results in **~584,000** ETH issued in a year
- Currently inflating at **~0.49%** (584K per year / 119.3M total)

<InfoBanner>
<strong>Total annual issuance rate: ~4.62%</strong> (4.13% + 0.49%)

**~89.4%** of the issuance is going to miners on the EL (4.13 / 4.62 \* 100)

**~10.6%** is being issued to stakers on the CL (0.49 / 4.62 \* 100)
</InfoBanner>

## Post-merge {#post-merge}

### EL Issuance {#el-issuance-post-merge}

Will be zero. Proof-of-work will no longer be valid under the rules of consensus, and all EL activity will be included in "beacon blocks" which are published and attested to by proof-of-stake validators.

### CL Issuance {#cl-issuance-post-merge}

Will continue as it was, with small rewards for attesting-to and proposing blocks. These rewards will continue to accrue to _validator balances_ that are managed within the consensus layer. These are separate Ethereum accounts to the accounts we're used to on Mainnet, and until the Shanghai upgrade funds from validator accounts will not be withdrawable/transferrable. This means that although new ETH is still being issued, 100% of it will be locked from the market until this upgrade occurs. When the Shanghai upgrade is rolled out, this ETH will become available.

When validator withdrawals are enabled, stakers will be incentivized to remove their _earnings/rewards (balance over 32)_ as these funds are otherwise not contributing to their stake weight (which maxes as 32).

Stakers may also choose to exit and withdrawal their entire validator balance, but it is important to remember that full validator exits are rate limited. Depending on the total ETH staked at the time, only 6 validators may exit in a given epoch (6.4 minute period). This decreases to as low as 4 as more validators leave, to intentionally prevent the ability for large amounts of staked ETH to leave at once.

### Post-merge inflation breakdown {#post-merge-inflation-breakdown}

- Total ETH supply: **~119,300,000 ETH** (as of Q2 2022)
- EL issuance: **0**
- CL issuance: Same as above, **~0.49%** annual issuance rate (with 13 million ETH staked)
- Total annual issuance rate: **~0.49%**

<InfoBanner>
Total annual issuance rate: <strong>~0.49%</strong>
Net reduction in annual ETH issuance: <strong>~89.4%</strong> (0.49% / 4.62% * 100)
</InfoBanner>

## <Emoji text=":fire:" size="1" /> The burn {#the-burn}

This flip side of ETH issuance is the rate at which ETH is burned. To execute a transaction on Ethereum, a minimum fee (known as a `base fee`) must be paid, which fluctuates depending on network activity in the moment. This fee is paid in ETH, is _required_ for the transaction to be considered valid, and is _burned_ in the process, removing it from circulation.

<InfoBanner>
This went live with the <a href="/history/#london">London upgrade</a> Aug-4-2021, and will not change after the Merge.
</InfoBanner>

On top of the fee burn implemented by the London upgrade, validators can also incur penalties for being offline, or worse they can be slashed for breaking specific rules that threaten network security. These penalties result in a reduction of ETH from that validators balance, which is not directly rewarded to any other account, effectively burning it from circulation.

## Further reading {#further-reading}

- [Ultrasound.money](https://ultrasound.money/) - Dashboards available to visualize ETH issuance and burn in real time
