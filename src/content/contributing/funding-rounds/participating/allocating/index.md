---
title: Allocating funds during a funding round
description: Instructions on how to participate as an allocator during a funding round
lang: en
---

# Allocating funds during a funding round {#allocating}

The ethereum.org contributor funding rounds are being held using the Gitcoin **Grants Stack**, which allows **anyone to help allocate funds** from a matching pool to the ethereum.org contributors listed. Once a funding round begins, you may make smalls donations of ETH or DAI (minimum of $1 USD worth) to any contributor you'd like to support.

## Step 1: Gitcoin Passport (can be done ahead of time) {#step-1}

To enhance the matching power of your contribution, you’ll need to provide some evidence that you’re only donating with one wallet.

1. Go to [Gitcoin Passport](https://passport.gitcoin.co/#/)
2. Sign-in with Ethereum
3. Follow the setup process to add "stamps" to your passport. Each stamp will help increase your Unique Humanity Score, which is used to determine your matching power.
4. Check the indicator next to your score to ensure you have a "passing" score

_Note that you’ll be required to sign multiple message with your wallet during setup, but **no gas (transaction fee) is required** for anything related to Gitcoin Passport setup._

<InfoBanner emoji="🥸" mt={8}>
<strong>Why is this necessary?</strong> Remember, the number of people donating to a project is weighted stronger than the value of donations received, so limiting each person to one wallet is important. If one person could easily pretend to be many (what’s known as a <a href="#sybil-resistance">Sybil attack</a>), it would greatly limit the effectiveness.
</InfoBanner>

[Learn more about Gitcoin Passport](https://support.gitcoin.co/gitcoin-knowledge-base/gitcoin-passport/what-is-gitcoin-passport)

## Step 2: Make allocations (once round has started) {#step-2}

<!-- TODO: Replace with a canonical list of ethereum.org grant rounds -->

1. **Get connected** to current funding round:

   - Go to <CurrentFundingRound roundInterface="explorer">Ethereum.org Contributor Round</CurrentFundingRound>
   - Connect Wallet
   - Switch network to Optimism

2. **Browse** contributors

   - Here is where you’ll be able to view all the submitted contributors to ethereum.org that are seeking funding. Clicking into each will provide a description of their contribution with supporting links and screenshots for you to understand their work.
   - If you see a contribution that you believe is valuable, would like to support, or that you’ve already enjoyed the benefits of, you can add them to your shopping cart.

3. **Finalize** amounts

   - When you’re satisfied with your selection, go to the shopping cart to finish your donations. Here you can adjust the final amounts you would like to donate for each project. You may choose to donate either ETH or DAI (on Optimism in either case).

4. **Submit** on chain

   - When you’re ready, you can submit your final donations via a transaction on Optimism (requires ETH on Optimism for transaction fee, plus additional ETH or DAI to cover your donations).

## How much should I donate? {#how-much-should-i-donate}

Donating the minimum of $1 is enough to signal your support for a contributor. You’re free to donate more to increase your signal, though the amount that will be matched per dollar drops as your donation increases.

<InfoBanner>
Note that <strong>100%</strong> of all donations go directly to the recipient Ethereum address.
</InfoBanner>

## How do we know someone is "unique"? {#sybil-resistance}

When one person pretends to be many, this is known as a "Sybil attack". Allo Protocol functions by placing higher importance on the _number of supporters_ of a project, over the _total donation amount_. For this to work, "Sybil resistance" mechanisms must be used to make it difficult for one person from appearing like a community of supporters.

### Gitcoin Passport {#gitcoin-passport}

Funding rounds will use the decentralized identifier system **Gitcoin Passport** to resist Sybil attacks. Gitcoin Passport gives you the ability to provide evidence that you are unique, based on other provable identifiers and attributions, providing a score for the quality and quantity of evidence provided. This score is used in conjunction with your donation to determine the matching weight of your vote.

<InfoBanner emoji="🚨" isWarning>
To protect again Sybil attacks, connecting your Gitcoin Passport score <strong>is required</strong> to participate as an allocator for the ethereum.org funding rounds. 
</InfoBanner>

**Passport tips:**

- Connecting web3 identifiers, such as an ENS, POAP history, token holdings, Proof of Humanity or DAO involvement, will provide your account with higher levels of matching, increasing with evidence from multiple categories
- By connecting only web2 identifiers, such as Twitter, Discord, Facebook or Google, you will receive only a small increase to your Gitcoin Passport score, as these accounts are easier to spin up in large numbers
