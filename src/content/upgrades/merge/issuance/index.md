---
title: How The Merge impacts ETH supply
description: Breakdown on how The Merge will impact ETH supply
lang: en
sidebar: true
---

# How The Merge impacts ETH supply {#how-the-merge-impacts-ETH-supply}

We can break the supply of ETH into two primary forces: issuance, and burn.

The **issuance** of ETH is the process of creating ETH that did not previously exist. The **burning** of ETH is when existing ETH gets destroyed, removing it from circulation. The rate of issuance and burning gets calculated on several parameters, and the balance between them determines the resulting inflation/deflation rate of ether.

<Card
emoji=":chart_decreasing:"
title="ETH issuance tldr">

- Before The Merge ~13,000 ETH/day was issued to pay miners
- After The Merge, issuance depends upon the number of active validators on the network, so varies slot to slot.
- The total issuance is approximately 90% smaller now than it was pre-merge.
- Ether is also burned in every slot, with a greater amount burned when gas is higher. This means ether can be inflationary or deflationary depending on network demand.

</Card>

## Issuance {#issuance}

Ethereum validators are rewarded with ETH for attesting to the state of the chain and proposing blocks. Rewards (or penalties) are calculated and distributed at each epoch (every 6.4 minutes) based on validator performance. The validator rewards are **significantly** less than the miner rewards that used to be issued on proof-of-work (2 ETH every ~13.5 seconds), as operating a validating node is not an economically intense activity and thus does not require or warrant as high a reward.

**Consensus layer issuance:**

Small rewards are paid to validators who attest to and propose blocks. Validator rewards accrue to _validator balances_ that are managed within the consensus layer. These are separate Ethereum accounts to the accounts we're used to on Mainnet, and until the Shanghai upgrade funds from validator accounts will not be withdrawable/transferrable. This means that although new ETH is still being issued, 100% of it will be locked from the market until this upgrade occurs. When withdrawals are enabled, this ETH will become available.

When validator withdrawals are enabled, stakers will be incentivized to remove their _earnings/rewards (balance over 32 ETH)_ as these funds are otherwise not contributing to their stake weight (which maxes out at 32).

Stakers may also choose to exit and withdraw their entire validator balance. To ensure Ethereum is stable, the number of validators leaving simultaneously is capped. Only six validators may exit in a given epoch (6.4 minute period) depending on the total ETH staked at the time. This decreases to as low as four as more validators withdraw to intentionally prevent large destabilizing amounts of staked ETH from leaving at once.

The opposite force to ETH issuance is the rate at which ETH is burned. For a transaction to execute on Ethereum, a minimum fee (known as a `base fee`) must be paid, which fluctuates continuously depending on network activity. The fee is paid in ETH and is _required_ for the transaction to be considered valid. This fee gets _burned_ during the transaction process, removing it from circulation.

<InfoBanner>
Fee burning went live with <a href="/history/#london">the London upgrade</a> in August 2021, and will continue after the Merge.
</InfoBanner>

On top of the fee burn implemented by the London upgrade, validators can also incur penalties for being offline, or worse, they can be slashed for breaking specific rules that threaten network security. These penalties result in a reduction of ETH from that validator's balance, which is not directly rewarded to any other account, effectively burning it from circulation.

## Issuance estimates {#issuance-estimates}

So, how much ether is actually issued? The precise amount changes in each slot because it depends upon the amount of ether staked by validators and their performance. At the time of writing (September 2022), net issuance (`issuance-burn`) since The Merge has been ~3100 ETH (if we were still using proof-of-work, 54,000 ETH would have been issued). Extrapolating the current network usage into the future gives an estimated 0.22%/yr net issuance. However, current network usage is very low, and more transactions lead to more ETH being burned. The website [ultrasound.money](https://ultrasound.money/) allows you to make predictions for the future net issuance under a range of market conditions.

## Further reading {#further-reading}

- [Ultrasound.money](https://ultrasound.money/) - _Dashboards available to visualize ETH issuance and burn in real-time_
- [Charting Ethereum Issuance](https://www.attestant.io/posts/charting-ethereum-issuance/) - _Jim McDonald 2020_
