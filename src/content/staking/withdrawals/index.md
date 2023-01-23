---
title: Staking withdrawals
description: Page summarizing what staking push withdrawals are, how they work, and what stakers need to do to get their rewards
lang: en
template: staking
image: ../../../assets/staking/leslie-withdrawal.png
alt: Leslie the rhino with her staking rewards
sidebarDepth: 2
summaryPoints:
  - The Shanghai upgrade brings staking withdrawals to Ethereum
  - Validator operators must provide a withdrawal address to enable
  - Rewards payments are automatically sent to the address provided every few days
  - Fully exited validators will automatically receive their remaining balance
---

<UpgradeStatus dateKey="page-upgrades-withdrawals">
  Staking withdrawals will be enabled through the Shanghai/Capella upgrade. This upgrade is expected to take place in the first half of 2023. <a href="#when">More below</a>
</UpgradeStatus>

The Shanghai/Capella upgrade enables **staking withdrawals** on Ethereum, allowing people to unlock rewards and optionally fully withdrawal funds from staking. Rewards payments will automatically and regularly be sent to a provided withdrawal address linked to each validator. Users can also exit staking entirely, unlocking their full validator balance.

Validator operators who did not provide a withdrawal address on initial deposit will need to upgrade withdrawal credentials before any withdrawals will be enabled for their account. The [Staking Launchpad](https://launchpad.ethereum.org/withdrawals) has instructions on when and how to do this.

## Staking rewards {#staking-rewards}

**Rewards payments** are automatically processed for active validator accounts with a maxed out effective balance of 32 ETH, who are accumulating rewards.

Any balance above 32 ETH earned through rewards does not actually contribute to principle, or increase the sway of this validator on the network, and is thus automatically withdrawn as a rewards payment every few days. Aside from providing a withdrawal address one time, these rewards do not require any action from the validator operator, nor do they consume gas (no associated transaction fee) or take up existing block space.

### How did we get here? {#how-did-we-get-here}

Over the past few years Ethereum has undergone several network upgrades transitioning to a network secured by ETH itself, instead of energy-intensive mining as it once was. Participating in consensus on Ethereum is now known as "staking", as participants have voluntarily locked up ETH, placing it "at stake" for the ability to participate in the network. Following the rules rewards users, while attempts to cheat can be penalized.

Since the launch of the staking deposit contract in November 2020, some brave Ethereum pioneers have voluntarily locked funds up to enable "validators", or accounts that have the right to formally attest to and propose blocks, following network rules.

Before the enabling of staking withdrawals, none of the funds staked had any ability to be unlocked and used elsewhere. With the addition of staking withdrawals, staked ETH no longer requires an unknown lock-up period. Liquid rewards will automatically be deposited into the provided account, and stakers can unlock and withdrawn their entire balance at any time.

### How do I prepare? {#how-do-i-prepare}

<!-- TODO: User "tab" component to show these two as individual tabs, only one shown at a time -->

**Existing stakers**

- Some users may have provided a withdrawal address when initially setting up their staking deposit—these users have nothing more they need to do (you can [double-check your validator](#check-your-validator-index) below)
- The majority of stakers did not provide a withdrawal address on initial deposit, and these users need to update their withdrawal credentials—the [Staking Launchpad](https://launchpad.ethereum.org/withdrawals) has instructions on when and how to do this

You can enter your validator index number here to see if you still need to update your credentials (this can be found in your client logs):

<WithdrawalCredentials />

---

**New stakers (not yet deposited)**

- By default, new stakers should now be providing a withdrawal address to an Ethereum address they control when generating their validator keys using the Staking Deposit CLI tool
- This will enable withdrawals by default for any new stakers joining the network
- The [Staking Launchpad](https://launchpad.ethereum.org/) will guide you through staking onboarding

### Important notices {#important-notices}

Providing a withdrawal address is a required step for any validator account before it will be eligible to have ETH withdrawn from its balance.

<InfoBanner emoji="⚠️" isWarning>
  <strong>Each validator account can only be assigned a single withdrawal address, one time.</strong> Once an address is chosen and submitted to the Beacon Chain, this cannot be undone or changed again. Double-check ownership and accuracy of the address provided before submitting.
</InfoBanner>

Failure to update withdrawal credentials will simply leave the ETH locked in the validator account as it has been until a withdrawal address is provided. There is <strong>no threat to your funds in the meantime</strong> for not providing this—only the loss of opportunity.

## Exiting staking entirely {#exiting-staking-entirely}

Providing a withdrawal address is required before _any_ funds can be transferred out of a validator account balance.

Users looking to exit staking entirely and withdrawal their full balance back must also sign and broadcast a "voluntary exit" message with validator keys which will start the process of exiting from staking.

The process of a validator exiting from staking takes variable amounts of time, depending how many others are exiting at the same time. Once complete, this account will no longer be responsible for performing validator network duties, is no longer eligible for rewards, and no longer has their ETH "at stake". At this time the account with be marked as fully “withdrawable”.

Once an account is flagged as "withdrawable", and withdrawal credentials have been provided, there is nothing more a user needs to do aside from wait. Accounts are automatically and continuously swept for eligible exits, and your account balance will be transferred in full during the next sweep (also known as a "full withdrawal").

## When are staking withdrawals enabled? {#when}

Withdrawals will be enabled through a two-part network upgrade: Shanghai + Capella (occurring simultaneously)

<div style='display: flex; gap: 1rem; @media(max-width: 1000px){flex-direction: column;}'>
<Callout emoji="📘" titleKey="Capella" descriptionKey="Consensus layer upgrade" flex={1}>
<p>Before the Shanghai upgrade can take effect, an upgrade to the Beacon Chain will take place named Capella. Node operating stakers should stay tuned to client communication channels to be alerted of upcoming client updates.</p>
<p>Stakers who need to update their validator withdrawal keys can broadcast this message once the Capella upgrade has taken place.</p>
</Callout>

<Callout emoji="📙" titleKey="Shanghai" descriptionKey="Execution layer upgrade" flex={1}>
<p>Push withdrawals will be enabled in the upcoming Shanghai upgrade planned for Q1/Q2 2023 (as with any upgrade, timing subject to change). This closes the loop on staking liquidity, and takes one more step on Ethereum’s journey towards building a sustainable, scalable, secure decentralized ecosystem.</p>
<p>Users will be free to:</p>
<ul>
  <li>stakes their ETH</li>
  <li>earn ETH rewards that will be distributed automatically</li>
  <li>un-stake their ETH to regain full access to their entire balance</li>
  <li>and of course, re-stake to sign back up and start earning more rewards</li>
</ul>
</Callout>
</div>

## How do withdrawal payments work? {#how-do-withdrawals-work}

Once a validator account has a withdrawal address registered, rewards payments for eligible ETH will happen automatically.

Instead of requiring stakers to manually submit a transaction requesting a particular amount of ETH to be withdrawn, withdraws are designed to automatically transfer out any amount of ETH that is not actively at stake—**no gas required**.

### Validator "sweeping"

With each block, the proposing validator must include a list of withdrawals to process. Each validator is evaluated for possible withdrawals in order, evaluated as follows:

| Decision                                     | Yes                                   | No                                                     |
| -------------------------------------------- | ------------------------------------- | ------------------------------------------------------ |
| 1. Has a withdrawal address been provided?   | Proceed to #2                         | **No** withdrawal will be processed, validator skipped |
| 2. Is the validator still active?            | Proceed to #3                         | **Full** withdrawal will be processed                  |
| 3. Is the effective balance maxed out at 32? | **Rewards payment** will be processed | **No** withdrawal will be processed, validator skipped |

A maximum of 16 withdrawals can be processed in a single block. At that rate, 115,200 validator withdrawals can be processed per day (assumig no missed blocks).

## Frequently asked questions {#faq}

<ExpandableCard title="How can I withdrawal a custom amount?">
Withdrawals are designed to be pushed automatically, transferring any ETH that is not actively contributing to stake.
<p>It is not possible to manually request specific amounts of ETH to be withdrawn.</p>
</ExpandableCard>

<ExpandableCard title="Liquid staking derivatives / pooled staking">
<p>If you are part of a staking pool or hold liquid staking derivatives, you should check with your provider for more details about how staking withdrawals will affect your arrangement, as each service operates differently.</p>
<p>In general, users will likely have nothing they need to do, and these services will no longer be limited by the inability to withdrawal rewards or exit validator funds after this upgrade.</p>
<p>This means that users can now decide to redeem their underlying staked ETH, or change which staking provider they utilize. If a particular pool is getting too large, funds can be exited and redeemed, and re-staked with a <a href="https://pools.invis.cloud">smaller provider</a>. Or, if you’ve accumulated enough ETH you could <a href="/staking/solo/">stake from home</a>.</p>
</ExpandableCard>

## Further reading {#further-reading}

- [Staking Launchpad Withdrawals](https://launchpad.ethereum.org/withdrawals)
- [EIP-4895: Beacon chain push withdrawals as operations](https://eips.ethereum.org/EIPS/eip-4895)
- [Ethereum Cat Herders - Shanghai](https://www.ethereumcatherders.com/shanghai_upgrade/index.html)
- [PEEPanEIP #94: Staked ETH Withdrawal (Testing) with Potuz & Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Beacon chain push withdrawals as operations with Alex stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)

<!-- ## To prepare {#to-prepare}

**Validator operators**
- All validators **must** have valid withdrawal credentials to enable withdrawals of any kind—use the [widget above](#check-your-validator-index) to make sure you have valid withdrawal credentials
- Those looking to withdrawal entirely from staking will need to sign a voluntary exit message with your validator keys.
- The [Staking Launchpad Withdrawals](https://launchpad.ethereum.org) page will guide you through how to exit

**New stakers (not yet deposited)**
- New stakers activating a validator account (not yet deposited) should set a withdrawal address when generating their keys and deposit data
- The [Staking Launchpad Withdrawals](https://launchpad.ethereum.org) page will guide you through how to join
 -->

<!-- any funds that are not actively being staked, including rewards over 32 ETH and exited funds, will be automatically transferred into a withdrawal address.

No longer is there an ill-defined lock-up period for staked ETH. Users will be free to:

- stake their ETH
- earn ETH rewards that will be distributed automatically
- un-stake their ETH to regain full access to their entire balance
- and of course, re-stake to sign back up and start earning more rewards -->

<!-- ### Full withdrawal (staking exit) {#full-staking-exit}

A **full withdrawal** is enabled once a validator has fully **exited** as a validator, and is no longer active.
Validator operators wishing to stop staking entirely must broadcast their request to exit from staking. Once processed, their entire staking balance will be unlocked.

Once unlocked, _any non-zero balance_ of ETH at these addresses will be transferred to the withdrawal address provided. -->

<!-- ### Rewards payments {#rewards-payments}

A **rewards payment** is for active validator accounts with a maxed out effective balance of 32 ETH, who are accumulating rewards. Any balance above 32 ETH earned through rewards does not actually contribute to principle, or increase the sway of this validator on the network, and is thus automatically withdrawn as a rewards payment.

Rewards payments may also be referred to as "partial withdrawals", as they leave your 32 ETH principle untouched. -->

<!-- ## Withdrawal types {#withdrawal-types} -->
<!-- There are two types of staking withdrawals: reward payments and full staking exits. Both types of transfers are processed automatically once a withdrawal address is provided, and depend on the state of the validator account. -->

<!-- ## Enabling withdrawals {#enabling-withdrawals}

Withdrawals can be enabled by assigning a withdrawal address to your validator account. Once assigned, withdrawals will be enabled, and this address cannot be changed. -->

<!-- The following decision tree is used within the software to determine if a rewards payment or full withdrawal should be processed for any given validator: -->

<!-- A maximum of 16 withdrawals can be processed per block -->
<!-- For any active validator account, this means any rewards over 32 ETH. If the validator account has exited from staking entirely, then _any_ remaining balance will be swept into the address provided. -->

<!-- Each validator is evaluated for possible withdrawals in order, evaluated as follows: -->
