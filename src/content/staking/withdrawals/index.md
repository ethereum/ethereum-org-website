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

## Introduction {#introduction}

The Shanghai upgrade enables **staking withdrawals** on Ethereum, allowing people to unlock rewards and optionally fully withdrawal funds from staking. Rewards payments will automatically and regularly be sent to a provided withdrawal address linked to each validator. Users can also exit staking entirely, unlocking and their full validator balance.

<UpgradeStatus dateKey="page-upgrades-withdrawals">
  Staking withdrawals will be enabled through two network upgrades: Capella followed by Shanghai. These are expected to take place in the first half of 2023. <a href="#when">More below</a>
</UpgradeStatus>

## Withdrawal types {#withdrawal-types}

There are two types of staking withdrawals: reward payments and full staking exits. Both types of transfers are processed automatically once a withdrawal address is provided, and depend on the state of the validator account.

### Rewards payments {#rewards-payments}

A **rewards payment** is for active validator accounts with a maxed out effective balance of 32 ETH, who are accumulating rewards. Any balance above 32 ETH earned through rewards does not actually contribute to principle, or increase the sway of this validator on the network, and is thus automatically withdrawn as a rewards payment.

### Full withdrawal (staking exit) {#full-staking-exit}

A **full withdrawal** is enabled once a validator has fully **exited** as a validator, and is no longer active.
Validator operators wishing to stop staking entirely must broadcast their request to exit from staking. Once processed, their entire staking balance will be unlocked.

Once unlocked, _any non-zero balance_ of ETH at these addresses will be transferred to the withdrawal address provided.

### Looking to withdrawal custom amounts? {#custom-amounts}

Withdrawals are designed to be pushed automatically, transferring any ETH that is not actively contributing to stake.

<p style="margin-top: 0;"><Emoji text="📝" mr={2} />It is not possible to manually request specific amounts of ETH to be withdrawn</p>

## How do withdrawal payments work? {#how-do-withdrawals-work}

Once a validator account has a withdrawal address registered ([more below](#providing-a-withdrawal-address)), rewards payments for eligible ETH will happen automatically.

Instead of requiring stakers to manually submit a transaction requesting a particular amount of ETH to be withdrawn, withdraws are designed to automatically transfer out any amount of ETH that is not actively at stake—**no gas required**.

For any active validator account, this means any rewards over 32 ETH. If the validator account has exited from staking entirely, then _any_ remaining balance will be swept into the address provided.

Each validator is evaluated for possible withdrawals in order, evaluated as follows:

| Decision                                     | Yes                                   | No                                    |
| -------------------------------------------- | ------------------------------------- | ------------------------------------- |
| 1. Has a withdrawal address been provided?   | Move to #2                            | **No** withdrawal will be processed   |
| 2. Is the validator still active?            | Move to #3                            | **Full** withdrawal will be processed |
| 3. Is the effective balance maxed out at 32? | **Rewards payment** will be processed | **No** withdrawal will be processed   |

## Enabling withdrawals {#enabling-withdrawals}

Withdrawals can be enabled by assigning a withdrawal address to your validator account. Once assigned, withdrawals will be enabled, and this address cannot be changed.

### Existing stakers {#existing-stakers}

- Some users may have provided a withdrawal address when initially setting up their staking deposit—these users have nothing more they need to do (you can [double-check your validator](#check-your-validator-index) below)
- The majority of stakers did not provide a withdrawal address on initial deposit, and these users need to update their withdrawal credentials—the [Staking Launchpad](https://launchpad.ethereum.org/withdrawals) has instructions on when and how to do this

### New stakers (not yet deposited) {#new-stakers}

- By default, new stakers should now be providing a withdrawal address to an Ethereum address they control when generating their validator keys using the Staking Deposit CLI tool
- This will enable withdrawals by default for any new stakers joining the network
- The [Staking Launchpad](https://launchpad.ethereum.org/) will guide you through staking onboarding

<Callout emoji="🚨" titleKey="Important notices" descriptionKey="Providing a withdrawal address is a required step for any validator account before it will be eligible to have ETH withdrawn from its balance.">
  <div>
    <p>
      <Emoji text="⚠️" mr={2} /> <strong>Caution</strong>: Once set, the withdrawal address cannot be undone or changed. Double-check ownership and accuracy of the address provided before submitting.
    </p>
    <p>
      <Emoji text="🧘‍♀️" mr={2} /> <strong>Keep calm</strong>: Failure to update withdrawal credentials will simply leave the ETH locked in the validator account as it has been until a withdrawal address is provided. There is no threat to your funds in the meantime for not providing this—only the loss of opportunity.
    </p>
  </div>
</Callout>

### Check your validator index {#check-your-validator-index}

You can enter your validator index number here to see if you still need to update your credentials (this can be found in your client logs):

<WithdrawalCredentials />

## Exiting staking entirely {#exiting-staking-entirely}

Providing a withdrawal address is required before _any_ funds can be transferred out of a validator account balance.

Users looking to exit staking entirely and withdrawal their full balance back must also sign and broadcast a "voluntary exit" message with validator keys which will start the process of exiting from staking.

The process of a validator exiting from staking takes variable amounts of time, depending how many others are exiting at the same time. Once complete, this account will no longer be responsible for performing validator network duties, is no longer eligible for rewards, and no longer has their ETH "at stake". At this time the account with be marked as fully “withdrawable”.

## Liquid staking derivatives / pooled staking {#pooled-staking}

If you are part of a staking pool or hold liquid staking derivatives, you should check with your provider for more details about how staking withdrawals will affect your arrangement, as each service operates differently.

In general, users will likely have nothing they need to do, and these services will no longer be limited by the inability to withdrawal rewards or exit validator funds after this upgrade.

This means that users can now decide to redeem their underlying staked ETH, or change which staking provider they utilize. If a particular pool is getting too large, funds can be exited and redeemed, and re-staked with a [smaller provider](https://pools.invis.cloud). Or, if you’ve accumulated enough ETH you could [stake from home](/staking/solo).

## When are staking withdrawals enabled? {#when}

Withdrawals will be enabled through two network upgrades: Capella followed by Shanghai.

### Capella {#capella}

Before the Shanghai upgrade can take effect, an upgrade to the Beacon Chain will take place named Capella. Node operating stakers should stay tuned to client communication channels to be alerted of upcoming client updates.

Stakers who need to update their validator withdrawal keys can broadcast this message once the Capella upgrade has taken place.

### Shanghai {#shanghai}

Push withdrawals will be enabled in the upcoming Shanghai upgrade planned for Q1/Q2 2023 (as always, subject to change). This closes the loop on staking liquidity, and takes one more step on Ethereum’s journey towards building a sustainable, scalable, secure decentralized ecosystem.

## How did we get here? {#how-did-we-get-here}

Over the past few years Ethereum has undergone several network upgrades transitioning to a network secured by ETH itself, instead of energy-intensive mining as it once was. Participating in consensus on Ethereum is now known as "staking", as participants have voluntarily locked up ETH, placing it "at stake" for the ability to participate in the network. Following the rules rewards users, while attempts to cheat can be penalized.

Since the launch of the staking deposit contract in November 2020, some brave Ethereum pioneers have voluntarily locked funds up to enable "validators", or accounts that have the right to formally attest to and propose blocks, following network rules.

Before the enabling of staking withdrawals, none of the funds staked had any ability to be unlocked and used elsewhere. With the addition of staking withdrawals, any funds that are not actively being staked, including rewards over 32 ETH and exited funds, will be automatically transferred into a withdrawal address.

No longer is there an indeterminant lock-up period on staked ETH. Users will be free to:

- stake their ETH
- earn ETH rewards that will be distributed automatically
- un-stake their ETH to re-gain full access to their entire balance
- and of course, re-stake to sign back up and start earning more rewards

<!-- ## To prepare {#to-prepare}

**Validator operators**
- All validators **must** have valid withdrawal credentials to enable withdrawals of any kind—use the [widget above](#check-your-validator-index) to make sure you have valid withdrawal credentials
- Those looking to withdrawal entirely from staking will need to sign a voluntary exit message with your validator keys.
- The [Staking Launchpad Withdrawals](https://launchpad.ethereum.org) page will guide you through how to exit

**New stakers (not yet deposited)**
- New stakers activating a validator account (not yet deposited) should set a withdrawal address when generating their keys and deposit data
- The [Staking Launchpad Withdrawals](https://launchpad.ethereum.org) page will guide you through how to join
 -->

## Frequently asked questions {#faq}

- TODO

## Further reading {#further-reading}

- [Staking Launchpad Withdrawals](https://launchpad.ethereum.org/withdrawals)
- [EIP-4895: Beacon chain push withdrawals as operations](https://eips.ethereum.org/EIPS/eip-4895)
- [Ethereum Cat Herders - Shanghai](https://www.ethereumcatherders.com/shanghai_upgrade/index.html)
- [PEEPanEIP #94: Staked ETH Withdrawal (Testing) with Potuz & Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Beacon chain push withdrawals as operations with Alex stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
