---
title: 常见问题
description: Common Ethereum questions about wallets, transactions, staking, and more.
lang: zh
---

# 常见问题{#faq}

## I sent crypto to the wrong address {#wrong-wallet}

以太坊上发送的交易是不可逆的。 Unfortunately, if you sent ETH or tokens to the wrong wallet, there is no way to reverse the transaction.

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
- [如何取消待处理的以太坊交易](https://info.etherscan.com/how-to-cancel-ethereum-pending-transactions/)

## 如何领取以太坊的赠品？ {#giveaway-scam}

以太坊赠品是用来窃取你以太币的骗局。 Do not be tempted by offers that seem too good to be true. If you send ETH to a giveaway address, you will not receive a giveaway, and you will not be able to recover your funds.

[更多关于预防诈骗的内容](/security/#common-scams)

## How do I stake ETH? {#how-to-stake}

要成为验证者，你必须在以太坊存款合约中质押 32 个以太币并搭建一个验证节点。 You can also participate with less ETH through staking pools.

More information is available on our [staking pages](/staking/) and at [the staking launchpad](https://launchpad.ethereum.org/).

## 我如何在以太坊挖矿？ {#mining-ethereum}

以太坊不再支持挖矿。 Mining was switched off when Ethereum moved from [proof-of-work](/glossary/#pow) to [proof-of-stake](/glossary/#pos) during [The Merge](/roadmap/merge/) in September 2022. 现在，以太坊使用验证者而不是矿工。 任何人都可以[质押](/glossary/#staking) ETH，并通过运行验证者软件来保障网络安全，从而获得质押奖励。
