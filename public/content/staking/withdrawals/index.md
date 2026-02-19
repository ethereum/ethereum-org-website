---
title: Staking withdrawals
description: Page summarizing what staking push withdrawals are, how they work, and what stakers need to do to get their rewards
lang: en
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Leslie the rhino with her staking rewards
sidebarDepth: 2
summaryPoints:
  - Validator operators must provide a withdrawal address to enable withdrawals
  - Legacy validators have excess balance over 32 ETH automatically withdrawn every few days
  - Compounding validators earn rewards on their full balance up to 2048 ETH
  - Validators who fully exit staking will receive their remaining balance
---

**Staking withdrawals** refer to transfers of ETH from a validator account on Ethereum's consensus layer (the Beacon Chain), to the execution layer where it can be transacted with.

How withdrawals work depends on your validator's withdrawal credential type:

- **Legacy validators (Type 1)**: Excess balance over 32 ETH is automatically and regularly sent to the withdrawal address linked to the validator. Rewards above 32 ETH do not contribute to the validator's weight on the network.
- **Compounding validators (Type 2)**: Rewards compound into the validator's effective balance up to 2048 ETH, increasing the validator's weight and earning more rewards. Only balance exceeding 2048 ETH is automatically swept.

Users can also **exit staking entirely**, unlocking their full validator balance.

## Staking rewards {#staking-rewards}

How rewards are handled depends on the validator's credential type:

**Legacy validators (Type 1)** have an effective balance capped at 32 ETH. Any balance above 32 ETH earned through rewards does not contribute to principal or increase the weight of this validator on the network, and is automatically withdrawn as a reward payment every few days. Aside from providing a withdrawal address one time, these rewards do not require any action from the validator operator. This is all initiated on the consensus layer, thus no gas (transaction fee) is required at any step.

**Compounding validators (Type 2)** can have an effective balance anywhere between 32 and 2048 ETH. Rewards earned by these validators compound into their effective balance, increasing the validator's weight and future rewards. Automatic sweeps only occur for balance exceeding 2048 ETH. To withdraw rewards below the 2048 ETH threshold, compounding validators must trigger a partial withdrawal manually from the execution layer, which does require gas.

### How did we get here? {#how-did-we-get-here}

Over the past few years Ethereum has undergone several network upgrades transitioning to a network secured by ETH itself, instead of energy-intensive mining as it once was. Participating in consensus on Ethereum is now known as "staking", as participants have voluntarily locked up ETH, placing it "at stake" for the ability to participate in the network. Users who follow the rules will be rewarded, while attempts to cheat can be penalized.

Since the launch of the staking deposit contract in November 2020, some brave Ethereum pioneers have voluntarily locked funds up to activate "validators", special accounts that have the right to formally attest to and propose blocks, following network rules.

Before the Shanghai/Capella upgrade, you couldn't use or access your staked ETH. But now, you can opt-in to automatically receive your rewards into a chosen account, and you can also withdraw your staked ETH whenever you want.

### How do I prepare? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Important notices {#important-notices}

Providing a withdrawal address is a required step for any validator account before it will be eligible to have ETH withdrawn from its balance.

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
  <strong>Each validator account can only be assigned a single withdrawal address, one time.</strong> Once an address is chosen and submitted to the consensus layer, this cannot be undone or changed again. Double-check ownership and accuracy of the address provided before submitting.
</AlertDescription>
</AlertContent>
</Alert>

There is <strong>no threat to your funds in the meantime</strong> for not providing this, assuming your mnemonic/seed phrase has remained safe offline, and has not been compromised in any way. Failure to add withdrawal credentials will simply leave the ETH locked in the validator account as it has been until a withdrawal address is provided.

## Compounding validators {#compounding-validators}

Validators can opt into **compounding** by converting their withdrawal credentials from Type 1 to Type 2. This raises the maximum effective balance from 32 ETH to **2048 ETH**, allowing rewards to compound into the validator's effective balance instead of being automatically swept.

With compounding enabled:

- Rewards increase the validator's effective balance in 1 ETH increments (subject to a small [hysteresis buffer](https://www.attestant.io/posts/understanding-validator-effective-balance/)), earning more rewards over time
- Automatic sweeps only occur for balance exceeding 2048 ETH
- Partial withdrawals below the 2048 ETH threshold must be triggered manually from the execution layer (this costs gas)
- Multiple validators can be **consolidated** into a single compounding validator, reducing operational overhead

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
  <strong>Converting from Type 1 to Type 2 withdrawal credentials is irreversible.</strong> Use the <a href="https://launchpad.ethereum.org/validator-actions">Staking Launchpad</a> as the official tool for this conversion. For more details on the conversion process, risks, and consolidation, see the <a href="/roadmap/pectra/maxeb/">MaxEB deep-dive</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Exiting staking entirely {#exiting-staking-entirely}

Providing a withdrawal address is required before _any_ funds can be transferred out of a validator account balance.

Users looking to exit staking entirely and withdraw their full balance back must initiate a "voluntary exit". This can be done in two ways:

- **Using validator keys**: Sign and broadcast a voluntary exit message with your validator client, submitted to your consensus node. This does not require gas.
- **Using withdrawal credentials**: Trigger an exit from the execution layer using your withdrawal address, without needing access to the validator signing key. This requires a transaction and costs gas.

The process of a validator exiting from staking takes variable amounts of time, depending on how many others are exiting at the same time. Once complete, this account will no longer be responsible for performing validator network duties, is no longer eligible for rewards, and no longer has their ETH "at stake". At this time the account will be marked as fully “withdrawable”.

Once an account is flagged as "withdrawable", and withdrawal credentials have been provided, there is nothing more a user needs to do aside from wait. Accounts are automatically and continuously swept by block proposers for eligible exited funds, and your account balance will be transferred in full (also known as a "full withdrawal") during the next <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>sweep</a>.

## When were staking withdrawals enabled? {#when}

Withdrawal functionality was originally enabled as part of the Shanghai/Capella upgrade on **April 12, 2023**. The [Pectra upgrade](/roadmap/pectra/) (May 2025) later introduced compounding validators with a higher maximum effective balance of 2048 ETH, as well as execution layer triggered exits and partial withdrawals.

The Shanghai/Capella upgrade enabled previously staked ETH to be reclaimed into regular Ethereum accounts. This closed the loop on staking liquidity, and brought Ethereum one step closer on its journey towards building a sustainable, scalable, secure decentralized ecosystem.

- [More on Ethereum history](/ethereum-forks/)
- [More on the Ethereum roadmap](/roadmap/)

## How do withdrawal payments work? {#how-do-withdrawals-work}

Whether a given validator is eligible for a withdrawal or not is determined by the state of the validator account itself. No user input is needed at any given time to determine whether an account should have a withdrawal initiated or not—the entire process is done automatically by the consensus layer on a continuous loop.

### More of a visual learner? {#visual-learner}

Check out this explanation of Ethereum staking withdrawals by Finematics:

<YouTube id="RwwU3P9n3uo" />

### Validator "sweeping" {#validator-sweeping}

When a validator is scheduled to propose the next block, it is required to build a withdrawal queue, of up to 16 eligible withdrawals. This is done by originally starting with validator index 0, determining if there is an eligible withdrawal for this account per the rules of the protocol, and adding it to the queue if there is. The validator set to propose the following block will pick up where the last one left off, progressing in order indefinitely.

<Alert variant="update">
<AlertEmoji text="🕛"/>
<AlertContent>
<AlertDescription>
Think about an analogue clock. The hand on the clock points to the hour, progresses in one direction, doesn’t skip any hours, and eventually wraps around to the beginning again after the last number is reached.<br/><br/>
Now instead of 1 through 12, imagine the clock has 0 through N <em>(the total number of validator accounts that have ever been registered on the consensus layer, over 500,000 as of Jan 2023).</em><br/><br/>
The hand on the clock points to the next validator that needs to be checked for eligible withdrawals. It starts at 0, and progresses all the way around without skipping any accounts. When the last validator is reached, the cycle continues back at the beginning.
</AlertDescription>
</AlertContent>
</Alert>

#### Checking an account for withdrawals {#checking-an-account-for-withdrawals}

While a proposer is sweeping through validators for possible withdrawals, each validator being checked is evaluated against a short series of questions to determine if a withdrawal should be triggered, and if so, how much ETH should be withdrawn.

1. **Has a withdrawal address been provided?** If no withdrawal address has been provided, the account is skipped and no withdrawal initiated.
2. **Is the validator exited and withdrawable?** If the validator has fully exited, and we have reached the epoch where their account is considered to be "withdrawable", then a full withdrawal will be processed. This will transfer the entire remaining balance to the withdrawal address.
3. **Does the balance exceed the maximum effective balance?** For legacy (Type 1) validators, this threshold is 32 ETH. For compounding (Type 2) validators, this threshold is 2048 ETH. If the account has withdrawal credentials, is not fully exited, and has balance above its threshold, a partial withdrawal will be processed which transfers only the excess to the user's withdrawal address.

There are only two actions that are taken by validator operators during the course of a validator's life cycle that influence this flow directly:

- Provide withdrawal credentials to enable any form of withdrawal
- Exit from the network, which will trigger a full withdrawal

### Gas free {#gas-free}

Automatic withdrawal sweeps do not require stakers to manually submit a transaction. This means there is **no gas (transaction fee) required** for automatic sweeps, and they do not compete for existing execution layer block space.

Note that [compounding validators](#compounding-validators) who wish to trigger a partial withdrawal below the 2048 ETH threshold must do so manually from the execution layer, which does require gas.

### How frequently will I get my staking rewards? {#how-soon}

A maximum of 16 withdrawals can be processed in a single block. At that rate, 115,200 validator withdrawals can be processed per day (assuming no missed slots). As noted above, validators without eligible withdrawals will be skipped, decreasing the time to finish the sweep.

Expanding this calculation, we can estimate the time it will take to process a given number of withdrawals:

<TableContainer>

| Number of withdrawals | Time to complete |
| :-------------------: | :--------------: |
|        400,000        |     3.5 days     |
|        500,000        |     4.3 days     |
|        600,000        |     5.2 days     |
|        700,000        |     6.1 days     |
|        800,000        |     7.0 days     |

</TableContainer>

As you see this slows down as more validators are on the network. An increase in missed slots could slow this down proportionally, but this will generally represent the slower side of possible outcomes.

## Frequently asked questions {#faq}

<ExpandableCard
title="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
No, the process to provide withdrawal credentials is a one-time process, and cannot be changed once submitted.
</ExpandableCard>

<ExpandableCard
title="Why can a withdrawal address only be set once?"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
By setting an execution layer withdrawal address the withdrawal credentials for that validator have permanently been changed. This means the old credentials will no longer work, and the new credentials direct to an execution layer account.

Withdrawal addresses can be either a smart contract (controlled by its code), or an externally owned account (EOA, controlled by its private key). Currently these accounts have no way to communicate a message back to the consensus layer that would signal a change of validator credentials, and adding this functionality would add unnecessary complexity to the protocol.

As an alternative to changing the withdrawal address for a particular validator, users may choose to set a smart contract as their withdrawal address which could handle key rotating, such as a Safe. Users who set their funds to their own EOA can perform a full exit to withdraw all of their staked funds, and then re-stake using new credentials.
</ExpandableCard>

<ExpandableCard
title="What if I participate in staking tokens or pooled staking"
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

If you are part of a [staking pool](/staking/pools/) or hold staking tokens, you should check with your provider for more details about how staking withdrawals are handled, as each service operates differently.

In general, users should be free to reclaim their underlying staked ETH, or change which staking provider they utilize. If a particular pool is getting too large, funds can be exited, redeemed, and re-staked with a <a href="https://rated.network/">smaller provider</a>. Or, if you've accumulated enough ETH you could [stake from home](/staking/solo/).

</ExpandableCard>

<ExpandableCard
title="Do reward payments (partial withdrawals) happen automatically?"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
For **legacy (Type 1) validators**, yes — as long as your validator has provided a withdrawal address. This must be provided once to initially enable any withdrawals, then reward payments will be automatically triggered every few days with each validator sweep.

For **compounding (Type 2) validators**, rewards compound into the effective balance rather than being swept. Automatic sweeps only occur for balance exceeding 2048 ETH. To withdraw rewards below this threshold, you must manually trigger a partial withdrawal from the execution layer.
</ExpandableCard>

<ExpandableCard
title="Do full withdrawals happen automatically?"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

No, if your validator is still active on the network, a full withdrawal will not happen automatically. This requires manually initiating a voluntary exit.

Once a validator has completed the exiting process, and assuming the account has withdrawal credentials, the remaining balance will <em>then</em> be withdrawn during the next <a href="#validator-sweeping">validator sweep</a>.

</ExpandableCard>

<ExpandableCard title="Can I withdraw a custom amount?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
For **legacy (Type 1) validators**, withdrawals are pushed automatically, transferring any ETH that is not actively contributing to stake. This includes full balances for accounts that have completed the exiting process. It is not possible to manually request specific amounts of ETH to be withdrawn for Type 1 validators.

**Compounding (Type 2) validators** can trigger partial withdrawals of a specific amount from the execution layer, as long as the remaining balance stays at or above 32 ETH. This requires a transaction and costs gas.
</ExpandableCard>

<ExpandableCard
title="I operate a validator. Where can I find more information on enabling withdrawals?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information on enabling withdrawals?"
eventName="read more">

Validator operators are recommended to visit the <a href="https://launchpad.ethereum.org/withdrawals/">Staking Launchpad Withdrawals</a> page where you'll find more details about how to prepare your validator for withdrawals, timing of events, and more details about how withdrawals function.

To try out your setup on a testnet first, visit the <a href="https://hoodi.launchpad.ethereum.org">Hoodi Testnet Staking Launchpad</a> to get started.

</ExpandableCard>

<ExpandableCard
title="Can I re-activate my validator after exiting by depositing more ETH?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
No. Once a validator has exited and its full balance has been withdrawn, any additional funds deposited to that validator will automatically be transferred to the withdrawal address during the next validator sweep. To re-stake ETH, a new validator must be activated.
</ExpandableCard>

<ExpandableCard
title="What is the difference between legacy and compounding validators?"
eventCategory="FAQ"
eventAction="What is the difference between legacy and compounding validators?"
eventName="read more">
Legacy validators use **Type 1** withdrawal credentials and have an effective balance capped at 32 ETH. Any excess is automatically swept to the withdrawal address every few days.

Compounding validators use **Type 2** withdrawal credentials and can have an effective balance up to 2048 ETH. Rewards compound into their effective balance, increasing the validator's weight on the network and future rewards. Automatic sweeps only occur for balance exceeding 2048 ETH. To withdraw below this threshold, a manual partial withdrawal must be triggered from the execution layer.

For more details, see the [MaxEB deep-dive](/roadmap/pectra/maxeb/).
</ExpandableCard>

<ExpandableCard
title="How do I convert to a compounding validator?"
eventCategory="FAQ"
eventAction="How do I convert to a compounding validator?"
eventName="read more">
You can convert from Type 1 to Type 2 withdrawal credentials using the <a href="https://launchpad.ethereum.org/validator-actions">Staking Launchpad</a>. This operation is **irreversible** — once you convert, you cannot go back to Type 1 credentials.

After converting, you can also **consolidate** multiple validators into one, combining their balances into a single compounding validator. For a full walkthrough of the conversion process, risks, and consolidation tooling, see the [MaxEB deep-dive](/roadmap/pectra/maxeb/).
</ExpandableCard>

## Further reading {#further-reading}

- [Staking Launchpad Withdrawals](https://launchpad.ethereum.org/withdrawals)
- [Staking Launchpad Validator Actions](https://launchpad.ethereum.org/validator-actions)
- [MaxEB deep-dive: compounding and consolidation](/roadmap/pectra/maxeb/)
- [EIP-4895: Beacon chain push withdrawals as operations](https://eips.ethereum.org/EIPS/eip-4895)
- [PEEPanEIP #94: Staked ETH Withdrawal (Testing) with Potuz & Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Beacon chain push withdrawals as operations with Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Understanding Validator Effective Balance](https://www.attestant.io/posts/understanding-validator-effective-balance/)
