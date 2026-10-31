---
title: How to check and remove an EIP-7702 delegation
description: "A step-by-step guide to EIP-7702 delegations: check whether your Ethereum account runs a smart contract's code, decide if it's safe, and remove it."
lang: en
---

Since the [Pectra upgrade](/roadmap/pectra/) in May 2025, an ordinary Ethereum account can hand its behavior over to a [smart contract](/glossary/#smart-contract). That's called an **EIP-7702 delegation**. Wallets use it for useful features, like batching several actions into one transaction or letting someone else pay your [gas](/glossary/#gas). But one signature can also give a contract control over everything in your account.

This guide shows you how to check whether your account has a delegation, how to decide whether it's one you expect, and how to remove it.

## What a delegation actually is {#what-a-delegation-is}

Think of it like a power of attorney. Your account keeps its address, its balance and its private key, but whenever it's called, or receives ETH, it runs the code of the contract you delegated to.

Three things are worth knowing up front:

- **It stays in place.** A delegation doesn't expire. It remains until you replace it or clear it.
- **It can apply on every chain.** If the authorization you signed used `chain_id = 0`, it's valid on any network that supports EIP-7702, not just the one you were using.
- **Your private key still works.** Delegating doesn't lock you out, so you can always remove a delegation yourself, as long as you still control your key.

## Step 1: Check your account {#step-1-check-your-account}

1. Open [Etherscan](https://etherscan.io/) and search for your address.
2. Near the top of the address page, look for a label that says **Delegated to:**. If it's there, your account is delegated, and the name or address next to it is the contract your account now runs.
3. Under **Other Transactions**, the **Authorizations (EIP-7702)** tab lists the EIP-7702 authorizations recorded for your address, with the delegated address and when each one happened.
4. **Repeat this on every network where you hold funds**, using that network's block explorer. A delegation on one chain won't show on another chain's explorer.

If you'd rather not rely on an explorer's labels: a delegated account's code is the 23 bytes `0xef0100` followed by the 20-byte address of the contract it delegates to. An account with no delegation has no code at all. Developers can read this code directly with the [`eth_getCode`](/developers/docs/apis/json-rpc/#eth-getcode) JSON-RPC method.

## Step 2: Decide whether you expect it {#step-2-decide-whether-you-expect-it}

Ask yourself:

- **Did you knowingly turn on a "smart account" feature in your wallet?** If so, your wallet should recognize the contract it set up.
- **Is the contract a known, audited implementation?** ethereum.org keeps a list of [known implementations](/roadmap/pectra/7702/#known-implementations) that have been audited.
- **Did a website ask you to sign it?** Under the EIP-7702 standard, apps aren't supposed to ask you to sign a delegation, and wallets aren't supposed to let them. A website asking for one is a red flag.

If you don't recognize the contract and you didn't set it up through your wallet, **treat your account as compromised** and go to Step 3.

## Step 3: Remove the delegation {#step-3-remove-the-delegation}

You remove a delegation by signing a new one that points to the **zero address** (`0x0000000000000000000000000000000000000000`). That clears your account's code and makes it a plain account again.

1. **Look for the option in your wallet.** Some wallets call it "remove delegation", "revoke" or "turn off smart account". If yours doesn't offer it, ask your wallet provider.
2. **Don't top up a compromised account to pay the fee.** A malicious delegate contract runs every time your account receives ETH, so it can be written to take that ETH straight away. EIP-7702 lets a different account submit your signed reset and pay its fee, so if your wallet supports that, the compromised account never needs to hold ETH.
3. **Confirm it worked.** Look up your address again. The **Delegated to:** line should be gone.
4. **Repeat on every affected network.**

## Step 4: When removing it isn't enough {#step-4-when-removing-it-isnt-enough}

Removing a delegation only fixes the delegation. Move your funds to a **new wallet with a new recovery phrase** if:

- you typed your recovery phrase or private key into any website or app,
- funds keep leaving your account after the delegation is gone, or
- you can't remove the delegation.

Then check your old account for token approvals too, using our guide on [how to revoke smart contract access](/guides/how-to-revoke-token-access/).

## How to avoid this in the future {#how-to-avoid-this}

- **Never sign a delegation a website asks for.** Use your wallet's own smart account features instead.
- **Read every signature request.** If your wallet shows a contract you don't recognize, or says you're changing your account's code, stop.
- **Use a hardware wallet for anything of size.** ethereum.org's [hardware wallet guidelines](/roadmap/pectra/7702/#hardware-wallet-guidelines) say hardware wallets shouldn't expose arbitrary delegation and should use a list of trusted delegator contracts.

<br />

<Alert variant="update">
<AlertEmoji text=":eyes:"/>
<AlertContent className="justify-between flex-row items-center">
<div>Want to learn more?</div>
<ButtonLink href="/guides/">
See our other guides
</ButtonLink>
</AlertContent>
</Alert>

## Frequently asked questions {#frequently-asked-questions}

### Does removing a delegation cost money? {#does-removing-a-delegation-cost-money}

Yes, a small network fee, like any transaction. Whoever sends the transaction pays it.

### Will removing a delegation affect my tokens or NFTs? {#will-removing-a-delegation-affect-my-assets}

No. Your assets stay in your account. You only lose the features the delegated contract was providing.

### I removed the delegation. Do I still need to revoke token approvals? {#do-i-still-need-to-revoke-approvals}

Possibly. A delegation and a token approval are different things, so check both.

### Can someone delegate my account without my signature? {#can-someone-delegate-without-my-signature}

No. Every delegation must be signed with your account's private key. If you find one you didn't expect, either you signed something without realizing what it was, or your key is exposed.
