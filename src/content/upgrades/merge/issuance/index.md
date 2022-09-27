---
title: How The Merge impacts ETH supply
description: Breakdown on how The Merge will impact ETH supply
lang: en
---

# How The Merge impacts ETH supply {#how-the-merge-impacts-ETH-supply}

We can break the supply of ETH into two primary forces: issuance, and burn.

The **issuance** of ETH is the process of creating ETH that did not previously exist. The **burning** of ETH is when existing ETH gets destroyed, removing it from circulation. The rate of issuance and burning gets calculated on several parameters, and the balance between them determines the resulting inflation/deflation rate of ether.

<Card
emoji=":chart_decreasing:"
title="ETH issuance tldr">

- Mining rewards ~13,000 ETH/day pre-merge
- Staking rewards ~1,600 ETH/day pre-merge
- **After The Merge, only the ~1,600 ETH per day will remain, dropping total new ETH issuance by ~90%**
- The burn: At an average gas price of at least 16 gwei, at least 1,600 ETH is burned every day, which effectively brings net ETH inflation to zero or less post-merge.

</Card>

How ETH gets issued will change at the time of The Merge. Currently, new ETH is issued from two sources: the execution layer (i.e. Mainnet) and the consensus layer (i.e. Beacon Chain). After The Merge, issuance from the execution layer will go to zero. Let's break this down.

[More on The Merge](/upgrades/merge/)

## Pre-merge {#pre-merge}

### Execution layer issuance {#el-issuance-pre-merge}

Under proof-of-work, miners only interact with the execution layer and are rewarded with block rewards if they are the first miner to solve the next block. Since the [Constantinople upgrade](/history/#constantinople) in 2019 this reward has been 2 ETH per block. Miners are also rewarded for publishing [ommer](/glossary/#ommer) blocks, which are valid blocks that don't end up in the longest/canonical chain. These rewards max out at 1.75 ETH per ommer, and are _in addition to_ the reward issued from the canonical block. Mining is an economically intensive activity, requiring high levels of ETH issuance to sustain.

### Consensus layer issuance {#cl-issuance-pre-merge}

The [Beacon Chain](/history/#beacon-chain-genesis) went live in 2020. Instead of miners, it is secured by validators using proof-of-stake. This chain was bootstrapped by Ethereum users depositing ETH one-way into a smart contract on Mainnet, which the Beacon Chain listens to, crediting the user with an equal amount on the new chain. Until The Merge happens, the Beacon Chain's validators are not processing transactions and are essentially coming to consensus on the state of the validator pool itself.

Validators on the Beacon Chain are rewarded with ETH for attesting to the state of the chain and proposing blocks. Rewards (or penalties) are calculated and distributed at each epoch (every 6.4 minutes) based on validator performance. The validator rewards are **significantly** less than the miner rewards issued on proof-of-work (2 ETH every ~13.5 seconds), as operating a validating node is not an economically intense activity and thus does not require or warrant as high a reward.

### Pre-merge issuance breakdown {#pre-merge-issuance-breakdown}

Total ETH supply: **~119,300,000 ETH** (as of Q2 2022)

**Execution layer issuance:**

- Estimating at 2.08 ETH per 13.3 seconds\*: **~4,930,000** ETH issued in a year
- Currently inflating at **~4.13%** (4.93M per year / 119.3M total)
- \*This includes the 2 ETH per canonical block, plus an average of 0.08 ETH over time from ommer blocks. Also uses 13.3 seconds, the baseline block time target without any influence from a [difficulty bomb](/glossary/#difficulty-bomb). ([See source](https://bitinfocharts.com/ethereum/))

**Consensus layer issuance:**

- Using 13,000,000 total ETH staked, the rate of ETH issuance is ~1600 ETH/day ([See source](https://ultrasound.money/))
- Results in **~584,000** ETH issued in a year
- Currently inflating at **~0.49%** (584K per year / 119.3M total)

<InfoBanner>
<strong>Total annual issuance rate: ~4.62%</strong> (4.13% + 0.49%)<br/><br/>
<strong>~89.4%</strong> of the issuance is going to miners on the execution layer (4.13 / 4.62 * 100)<br/><br/>
<strong>~10.6%</strong> is being issued to stakers on the consensus layer (0.49 / 4.62 * 100)
</InfoBanner>

## Post-merge {#post-merge}

### Execution layer issuance {#el-issuance-post-merge}

Execution layer issuance after The Merge will be zero. Proof-of-work will no longer be valid under the rules of consensus. All execution layer activity will be included in "beacon blocks", which are published and attested to by proof-of-stake validators.

### Consensus layer issuance {#cl-issuance-post-merge}

Consensus layer issuance will continue as before The Merge, with small rewards for validators who attest to and propose blocks. Validator rewards will continue to accrue to _validator balances_ that are managed within the consensus layer. These are separate Ethereum accounts to the accounts we're used to on Mainnet, and until the Shanghai upgrade funds from validator accounts will not be withdrawable/transferrable. This means that although new ETH is still being issued, 100% of it will be locked from the market until this upgrade occurs. When the Shanghai upgrade is rolled out, this ETH will become available.

When validator withdrawals are enabled, stakers will be incentivized to remove their _earnings/rewards (balance over 32 ETH)_ as these funds are otherwise not contributing to their stake weight (which maxes as 32).

Stakers may also choose to exit and withdraw their entire validator balance. To ensure Ethereum is stable, the number of validators leaving simultaneously is capped. Only six validators may exit in a given epoch (6.4 minute period) depending on the total ETH staked at the time. This decreases to as low as four as more validators withdraw to intentionally prevent large destabilizing amounts of staked ETH from leaving at once.

### Post-merge inflation breakdown {#post-merge-inflation-breakdown}

- Total ETH supply: **~119,300,000 ETH** (as of Q2 2022)
- Execution layer issuance: **0**
- Consensus layer issuance: Same as above, **~0.49%** annual issuance rate (with 13 million ETH staked)
- Total annual issuance rate: **~0.49%**

<InfoBanner>
Total annual issuance rate: <strong>~0.49%</strong><br/><br/>
Net reduction in annual ETH issuance: <strong>~89.4%</strong> (0.49% / 4.62% * 100)
</InfoBanner>

## <Emoji text=":fire:" size="1" /> The burn {#the-burn}

The opposite force to ETH issuance is the rate at which ETH is burned. For a transaction to execute on Ethereum, a minimum fee (known as a `base fee`) must be paid, which fluctuates continuously depending on network activity. The fee is paid in ETH and is _required_ for the transaction to be considered valid. This fee gets _burned_ during the transaction process, removing it from circulation.

<InfoBanner>
Fee burning went live with <a href="/history/#london">the London upgrade</a> in August 2021, and will continue after the Merge.
</InfoBanner>

On top of the fee burn implemented by the London upgrade, validators can also incur penalties for being offline, or worse, they can be slashed for breaking specific rules that threaten network security. These penalties result in a reduction of ETH from that validator's balance, which is not directly rewarded to any other account, effectively burning it from circulation.

## Further reading {#further-reading}

- [Ultrasound.money](https://ultrasound.money/) - _Dashboards available to visualize ETH issuance and burn in real-time_
- [Charting Ethereum Issuance](https://www.attestant.io/posts/charting-ethereum-issuance/) - _Jim McDonald 2020_
