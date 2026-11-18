---
title: How to sell ETH and cash out to your bank
description: A step-by-step guide to selling ETH, or tokens like USDC, for cash and withdrawing the money to your bank account.
lang: en
---

"How do I withdraw?" is one of the most common questions new Ethereum users ask. Usually it means: _I have crypto, and I want it as money in my bank account._ This guide shows you how to sell ETH, or tokens like USDC, and cash out.

Ethereum itself has no "withdraw to bank" button. Your [wallet](/glossary/#wallet) holds crypto, and turning that into money in your currency always goes through a service that exchanges one for the other. Usually that is an exchange, a selling feature built into your wallet, or another person who buys it from you.

## What do you mean by withdraw? {#what-do-you-mean-by-withdraw}

"Withdraw" can mean several different things. Find the one that matches what you want to do:

| I want to…                                                       | Where to go                                                                                                                                                                                       |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Turn my crypto into money in my bank account                     | Keep reading this guide                                                                                                                                                                           |
| Send crypto to another wallet or person                          | [How to use a wallet](/guides/how-to-use-a-wallet/#send-cryptocurrency)                                                                                                                           |
| Move my funds from a layer 2 network back to Ethereum            | [How to use a bridge](/guides/how-to-use-a-bridge/#can-i-go-back-to-ethereum-mainnet-after-i-bridge-my-tokens-to-l2)                                                                              |
| Take my money out of an app, such as a lending or liquidity pool | Open the app, connect your wallet and use its own "Withdraw" button. The funds return to your wallet.                                                                                            |
| Unstake my ETH                                                   | If you run a validator, see [staking withdrawals](/staking/withdrawals/). If you staked through a pool or an exchange, check your provider's instructions, as each service handles this differently. |
| Move crypto off an exchange into my own wallet                   | Copy your wallet's receiving address ([how to receive crypto](/guides/how-to-use-a-wallet/#receive-cryptocurrency)), then use the exchange's own withdrawal screen                                |

## Before you start: four quick checks {#before-you-start}

Most money lost while cashing out is lost through one of the first three mistakes below. The fourth won't lose you money, but it can stop you from sending anything. Check them first.

1. **Which token do you hold?**

   ETH, WETH, USDC and other [tokens](/glossary/#token) are different assets. An exchange may accept one and not another. Your wallet lists each token separately.

2. **Which network is it on?**

   The same token can exist on Ethereum and on many [layer 2](/glossary/#layer-2) networks, such as Arbitrum, Base or Optimism. Your wallet shows which network you are using.

3. **Does the place you are sending to support that token _on that network_?**

   If you send tokens on a network the receiver does not support, they may be lost for good. Exchanges list the networks they accept on their deposit screen.

4. **Do you have a little ETH for fees?**

   Every transfer costs a small [gas fee](/glossary/#gas), usually paid in ETH on Ethereum and on most layer 2s. Even sending USDC usually needs some ETH on the same network. Some wallets cover the fee for you on certain transfers, but most don't.

## Option 1: Sell directly in your wallet {#sell-in-your-wallet}

Some wallets let you sell crypto for cash without leaving the app. This is usually the option with the fewest steps.

1. Open your wallet and look for a "Sell" or "Cash out" button.
2. Choose the token and the amount you want to sell.
3. Choose how you want to be paid, such as by bank transfer or to a card.
4. Follow the steps from the payment provider. Most will ask you to verify your identity the first time.
5. Confirm the transaction in your wallet. The money arrives in your bank account once the provider processes it.

Selling inside a wallet is usually handled by a third-party payment provider, and it is not available in every country. Fees can be higher than on an exchange, so compare before you sell larger amounts.

<ButtonLink href="/wallets/find-wallet/?purchases=withdraw_crypto">
  See wallets that sell for cash
</ButtonLink>

## Option 2: Sell on an exchange and withdraw to your bank {#sell-on-an-exchange}

This is the most common way to cash out, and it works with almost any wallet.

1. **Open an account at an exchange that operates in your country.** You will need to verify your identity, which can take a few days. [Find exchanges available where you live](/get-eth/#country-picker), then check that the one you choose lets you withdraw to a bank in your country.
2. **Find your deposit address.** In the exchange, go to "Deposit" and pick the option for depositing **crypto**, not the one for depositing money from a bank. Choose the token, and choose the **same network** your tokens are on. Copy the address it shows you.
3. **Send a small test amount first.** From your wallet, send a small amount to that address. Wait until it shows up in your exchange balance. This usually takes a few minutes, but some exchanges wait for extra network confirmations before crediting a deposit. ([How to send crypto](/guides/how-to-use-a-wallet/#send-cryptocurrency), [what to do if it doesn't arrive](#frequently-asked-questions))
4. **Send the rest.** Once the test arrives, send the remaining amount the same way.
5. **Sell for your currency.** In the exchange, sell the token for your local currency, such as USD or EUR. A simple "Sell" or "Convert" button is the easiest way, but it often costs more than selling on the exchange's trading screen.
6. **Withdraw to your bank.** Use the exchange's "Withdraw" option and choose your bank account. Bank transfers usually take from a few minutes to a few business days.

<Alert variant="warning">
<AlertIcon size="lg"><ShieldCheck /></AlertIcon>
<AlertContent>
<AlertDescription>
Always copy and paste addresses, never type them by hand, and check the first and last few characters before you confirm. Transactions on Ethereum cannot be reversed.
</AlertDescription>
</AlertContent>
</Alert>

## Option 3: Sell to another person (P2P) {#sell-peer-to-peer}

You can also sell ETH directly to another person and have them pay you by bank transfer, a payment app or cash. This is called peer-to-peer (P2P) trading. P2P apps match you with buyers, and many of them use a [smart contract](/glossary/#smart-contract) as escrow and don't ask you to verify your identity.

1. **Choose a P2P app that works in your country**, or sell to someone you know and trust. [Find P2P apps available where you live](/get-eth/#country-picker).
2. **Set your price and the payment methods you accept.** Only accept payment methods you already use and can check yourself.
3. **Lock your ETH in the app's escrow.** The app holds it in a smart contract, not in a company's account.
4. **Wait until the money is in your account.** Check your bank or payment app yourself. Don't trust a screenshot or a message saying the buyer has paid.
5. **Release the ETH.** Once you have confirmed the payment, release the ETH to the buyer.

<Alert variant="warning">
<AlertIcon size="lg"><ShieldCheck /></AlertIcon>
<AlertContent>
<AlertDescription>
Some payment methods can be reversed after you release your ETH, for example card payments and some payment apps. Prefer methods that can't be reversed, start with small amounts, and keep the whole trade inside the app.
</AlertDescription>
</AlertContent>
</Alert>

## Option 4: Spend crypto with a card {#spend-with-a-card}

If you want to spend your crypto rather than move it to a bank, some crypto debit cards convert it to your currency when you pay.

<ButtonLink href="/payments/#pay-with-self-custodial-crypto-cards">
  Explore crypto cards
</ButtonLink>

## Frequently asked questions {#frequently-asked-questions}

<ExpandableCard title="How do I withdraw money from my Ethereum wallet to my bank account?" visible>

Most banks don't accept crypto directly, and a wallet only holds crypto, so you first need to sell it: in your wallet ([option 1](#sell-in-your-wallet)), on an exchange ([option 2](#sell-on-an-exchange)) or to another person ([option 3](#sell-peer-to-peer)). The service or person you sell to then pays you into your bank account.

</ExpandableCard>

<ExpandableCard title="How do I cash out USDC or other tokens?" visible>

The steps are the same as for ETH. Check that the exchange accepts your token on the network it is on. You will usually also need a little ETH on that network to pay the fee for sending it, unless your wallet covers the fee for you. [USDC](/stablecoins/) is a stablecoin, so its value should stay close to one US dollar.

</ExpandableCard>

<ExpandableCard title="I have WETH. Can I sell it?" visible>

WETH is wrapped ether: a token version of ETH, worth the same amount. Some exchanges accept WETH deposits and some do not. If yours does not, unwrap your WETH back to ETH in your wallet first. [Learn about wrapped ether and how to unwrap it](/wrapped-eth/)

</ExpandableCard>

<ExpandableCard title="My exchange doesn't support the network my tokens are on" visible>

You have two choices. Move your tokens to a network the exchange does support using a [bridge](/bridges/), or find an exchange that supports your current network. Do not send tokens on a network the exchange does not list.

</ExpandableCard>

<ExpandableCard title="My deposit hasn't shown up at the exchange" visible>

Deposits usually arrive within minutes, but some exchanges wait for extra network confirmations first. If yours is taking much longer:

- Find the transaction in your wallet's activity list and check that it went through.
- Check that the "to" address in the transaction matches the deposit address the exchange gave you.
- Check that the exchange supports that token on the network you sent it on.
- Contact the exchange's support before you send any more funds.

</ExpandableCard>

<ExpandableCard title="How long does it take?" visible>

Sending crypto to an exchange usually takes seconds to minutes. Selling at the current market price is almost instant. Bank withdrawals usually take from a few minutes to a few business days, depending on the exchange and your bank. Setting up a new exchange account can take longer, because of identity checks.

</ExpandableCard>

<ExpandableCard title="Do I have to pay tax when I sell crypto?" visible>

In many countries, selling crypto can count as a taxable event. Rules differ from country to country, so check the rules where you live.

</ExpandableCard>

<ExpandableCard title="Someone offered to help me withdraw my funds" visible>

This is very likely a scam. Real support staff will never message you first, and will never ask for your recovery phrase or ask you to send them crypto. [Learn how to spot scams](/community/support/scams/)

</ExpandableCard>

<Alert variant="update">
<AlertIcon size="lg"><BookOpenText /></AlertIcon>
<AlertContent className="justify-between flex-row items-center">
  <div>Want to learn more?</div>
  <ButtonLink href="/guides/">
    See our other guides
  </ButtonLink>
</AlertContent>
</Alert>
