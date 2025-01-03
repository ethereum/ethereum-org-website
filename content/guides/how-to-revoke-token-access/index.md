---
title: How to revoke smart contract access to your crypto funds
description: A how to guide on revoking exploitative smart contract token access
lang: en
---

# How to revoke smart contract access to your crypto funds

This guide will teach you how to view a list of all [smart contracts](/glossary/#smart-contract) you have allowed access to your funds and how to cancel them.

Sometimes malicious developers build backdoors into smart contracts that allow access to the funds of unaware users who interact with the smart contract. What often happens is that such platforms ask the user for permission to spend an **unlimited number of tokens** in an attempt to save small amounts of [gas](/glossary/#gas) in the future, but this comes with increased risk.

Once a platform has unlimited access rights to a token on your [wallet](/glossary/#wallet), they can spend all those tokens even if you have withdrawn your funds from their platform into your wallet. Malicious actors can still access your funds and withdraw them into their wallets with no recovery option left for you.

The only protections are to refrain from using untested new projects, only approve what you need, or regularly revoke access. So, how do you do that?

## Step 1: Use revoke access tools

Several websites let you view and revoke smart contracts connected to your address. Visit the website and connect your wallet:

- [Ethallowance](https://ethallowance.com/) (Ethereum)
- [Etherscan](https://etherscan.io/tokenapprovalchecker) (Ethereum)
- [Cointool](https://cointool.app/approve/eth) (multiple networks)
- [Revoke](https://revoke.cash/) (multiple networks)
- [Unrekt](https://app.unrekt.net/) (multiple networks)
- [EverRevoke](https://everrise.com/everrevoke/) (multiple networks)

## Step 2: Connect your wallet

Once you are on the website, click on “Connect wallet”. The website should prompt you to connect your wallet.

Make sure you use the same network in your wallet and website. You will only see smart contracts related to the network selected. For example, if you connect to Ethereum Mainnet, you will only see Ethereum contracts, not contracts from other chains such as Polygon.

## Step 3: Select a smart contract you wish to revoke

You should see all the contracts that are allowed access to your tokens and their spending limit. Find the one you wish to terminate.

If you do not know which contract to choose, you can revoke all of them. It won't create any problems for you, but you will have to grant a new set of permissions the next time you interact with any of these contracts.

## Step 4: Revoke access to your funds

Once you click on revoke, you should see a new transaction suggestion in your wallet. This is to be expected. You will have to pay the fee for the cancellation to be successful. Depending on the network this can take from a minute to several to be processed.

We advise you to refresh the revoking tool after a few minutes and connect your wallet again to double check if the revoked contract has disappeared from the list.

<mark>We recommend you never allow projects unlimited access to your tokens and revoke all token allowance access regularly. Revoking token access should never result in a loss of funds, especially if you use the tools listed above.</mark>

 <br />

<InfoBanner shouldSpaceBetween emoji=":eyes:">
  <div>Want to learn more?</div>
  <ButtonLink href="/guides/">
    See our other guides
  </ButtonLink>
</InfoBanner>

## Frequently asked questions

### Does revoking token access also terminate staking, pooling, lending etc?

No, it will not affect any of your [DeFi](/glossary/#defi) strategies. You will remain in your positions and keep getting rewards etc.

### Is disconnecting a wallet from a project the same as removing permission to use my funds?

No, if you disconnect your wallet from the project, but you've granted token allowance permissions, they can still use those tokens. You need to revoke that access.

### When will the contract permission expire?

There are no expiration dates on contract permissions. If you grant contract permissions, they can be used, even years after they're granted.

### Why do projects set unlimited token allowance?

Projects often do this to minimize the number of requests required, meaning the user only has to approve once and pay the transaction fee only once. While convenient, this can be dangerous for users to approve carelessly, on sites that are not proven with time or audited. Some wallets allow you to manually restrict the amount of tokens being approved to limit your risk. Check with your wallet provider for more information.
