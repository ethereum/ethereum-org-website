---
title: 常见问题解答
description: 关于钱包、交易、质押等常见的以太坊问题。
lang: zh
---

## 我把加密货币发送到了错误的地址 {#wrong-wallet}

在以太坊上发送的交易是不可逆的。不幸的是，如果你将 ETH 或代币发送到了错误的钱包，则无法撤销该交易。

**你可以采取的措施：**

- **如果你认识该地址的所有者**，请直接联系他们并要求退还资金
- **如果该地址属于交易所或已知服务**，请联系他们的支持团队，因为他们也许能提供帮助
- **如果你将代币发送到了合约地址**，请检查该合约是否具有提款或恢复功能（这种情况很少见）

在大多数情况下，无法找回资金。没有任何中心化组织、实体或个人拥有以太坊，这意味着没有人可以撤销交易。在确认之前，请务必仔细检查收款人地址。

## 我失去了对钱包的访问权限 {#lost-wallet-access}

你的恢复选项取决于你使用的钱包类型。

### 如果你有助记词（恢复短语） {#if-you-have-your-seed-phrase-recovery-phrase}

你可以使用助记词在任何兼容的钱包应用中恢复你的钱包。这就是为什么将助记词安全地离线存储至关重要。请查看你的钱包提供商的文档以获取恢复说明。

### 如果你丢失了助记词 {#if-you-have-lost-your-seed-phrase}

如果没有助记词或私钥，你的资金将无法恢复。任何人（包括 ethereum.org）都无法重置你的密码或恢复对自托管钱包的访问权限。

### 如果你的账户在交易所 {#if-your-account-is-on-an-exchange}

如果你的账户在 Coinbase、币安或 Kraken 等中心化交易所，请直接联系交易所的支持团队。他们控制着其平台上的账户，也许能帮助重置密码或恢复账户。

<Alert variant="warning">
<AlertEmoji text=":shield:"/>
<AlertContent>
<AlertDescription>

**切勿与任何**声称能帮你恢复钱包的人**分享你的助记词**。这是最常见的诈骗手段之一。任何合法的服务都不会要求你提供助记词。

</AlertDescription>
</AlertContent>
</Alert>

<DocLink href="/guides/how-to-use-a-wallet/">
  如何使用钱包
</DocLink>

## 我的交易卡住或处于待处理状态 {#stuck-transaction}

当你设置的 gas 费低于网络当前的要求时，以太坊上的交易可能会卡住。大多数钱包都允许你解决这个问题：

- **加速：**使用更高的 gas 费重新提交同一笔交易
- **取消：**使用与待处理交易相同的随机数，向你自己的地址发送一笔 0 ETH 的交易

### 实用指南 {#helpful-guides}

- [如何在梅塔马斯克上加速或取消待处理交易](https://support.metamask.io/transactions-and-gas/transactions/how-to-speed-up-or-cancel-a-pending-transaction/)
- [如何取消待处理的以太坊交易](https://info.etherscan.com/how-to-cancel-ethereum-pending-transactions/)

## 我该如何申领以太坊赠品？ {#giveaway-scam}

以太坊赠品是旨在窃取你 ETH 的骗局。不要被那些好得令人难以置信的提议所诱惑。如果你将 ETH 发送到赠品地址，你将不会收到任何赠品，也无法找回你的资金。

[了解更多关于防范诈骗的信息](/security/#common-scams)

## 我该如何质押 ETH？ {#how-to-stake}

要成为验证者，你必须在以太坊存款合约中质押 32 ETH，并设置一个验证者节点。你也可以通过质押池使用较少的 ETH 参与。

更多信息请见我们的[质押页面](/staking/)和[质押启动板](https://launchpad.ethereum.org/)。

## 我该如何进行以太坊挖矿？ {#mining-ethereum}

以太坊挖矿已不再可能。在 2022 年 9 月的[合并](/roadmap/merge/)期间，当以太坊从[工作量证明 (PoW)](/glossary/#pow)过渡到[权益证明 (PoS)](/glossary/#pos)时，挖矿就被关闭了。现在，以太坊由验证者取代了矿工。任何人都可以[质押](/glossary/#staking) ETH，并通过运行验证者软件来保护网络安全，从而获得质押奖励。