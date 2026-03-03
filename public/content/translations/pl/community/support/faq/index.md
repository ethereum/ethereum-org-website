---
title: Często zadawane pytania
description: Common Ethereum questions about wallets, transactions, staking, and more.
lang: pl
---

# Często zadawane pytania {#faq}

## I sent crypto to the wrong address {#wrong-wallet}

Transakcja wysłana na Ethereum jest nieodwracalna. Unfortunately, if you sent ETH or tokens to the wrong wallet, there is no way to reverse the transaction.

**What you can do:**

- **If you know the owner of the address**, contact them directly and ask them to return the funds
- **If the address belongs to an exchange or known service**, contact their support team, as they may be able to help
- **If you sent tokens to a contract address**, check whether the contract has a withdrawal or recovery function (this is rare)

In most cases, there is no way to recover the funds. No central organization, entity, or person owns Ethereum, which means no one can reverse transactions. Always double-check the recipient address before confirming.

## I lost access to my wallet {#lost-wallet-access}

Your recovery options depend on the type of wallet you use.

### If you have your seed phrase (recovery phrase)

You can restore your wallet in any compatible wallet app using your seed phrase. This is why it is critical to keep your seed phrase stored safely offline. Check your wallet provider's documentation for restore instructions.

### If you have lost your seed phrase

Without your seed phrase or private keys, your funds cannot be recovered. No one, including ethereum.org, can reset your password or restore access to a self-custody wallet.

### If your account is on an exchange

If your account is on a centralized exchange like Coinbase, Binance, or Kraken, contact the exchange's support team directly. They control accounts on their platform and may be able to help with password resets or account recovery.

<Alert variant="warning">
<AlertEmoji text=":shield:"/>
<AlertContent>
<AlertDescription>

**Never share your seed phrase with anyone** claiming to help you recover your wallet. This is one of the most common scam tactics. No legitimate service will ever ask for your seed phrase.

</AlertDescription>
</AlertContent>
</Alert>

<DocLink href="/guides/how-to-use-a-wallet/">
  How to use a wallet
</DocLink>

## My transaction is stuck or pending {#stuck-transaction}

Transactions on Ethereum can get stuck when the gas fee you set was lower than what the network currently requires. Most wallets let you fix this:

- **Speed up:** Resubmit the same transaction with a higher gas fee
- **Cancel:** Send a 0 ETH transaction to your own address using the same nonce as the pending transaction

### Helpful guides

- [How to speed up or cancel a pending transaction on MetaMask](https://support.metamask.io/transactions-and-gas/transactions/how-to-speed-up-or-cancel-a-pending-transaction/)
- [Jak anulować oczekujące transakcje Ethereum](https://info.etherscan.com/how-to-cancel-ethereum-pending-transactions/)

## Jak mogę odebrać wygraną w konkursie Ethereum? {#giveaway-scam}

Konkursy z nagrodami Ethereum to oszustwa mające na celu kradzież twojego ETH. Do not be tempted by offers that seem too good to be true. If you send ETH to a giveaway address, you will not receive a giveaway, and you will not be able to recover your funds.

[Więcej o zapobieganiu oszustwom](/security/#common-scams)

## How do I stake ETH? {#how-to-stake}

Aby zostać walidatorem, musisz zestakować 32 ETH w kontrakcie depozytowym Ethereum i skonfigurować węzeł walidatora. You can also participate with less ETH through staking pools.

More information is available on our [staking pages](/staking/) and at [the staking launchpad](https://launchpad.ethereum.org/).

## Jak wydobywać Ethereum? Wydobycie Ethereum {#mining-ethereum}

Kopanie Ethereum nie jest już dłużej możliwe. Mining was switched off when Ethereum moved from [proof-of-work](/glossary/#pow) to [proof-of-stake](/glossary/#pos) during [The Merge](/roadmap/merge/) in September 2022. Teraz, zamiast górników, Ethereum ma walidatory. Każdy może [stakować](/glossary/#staking) ETH i otrzymywać nagrody ze stakowania za uruchamianie oprogramowania walidatora w celu zabezpieczenia sieci.
