---
title: "如何将代币跨链至二层网络 (l2)"
description: "本指南解释了如何使用跨链桥将代币从以太坊转移到二层网络 (l2)。"
lang: zh
---

如果以太坊上的流量很大，交易费用可能会变得很高。解决这个问题的一种方法是创建新的“层”：即以与以太坊本身类似的方式运行的不同网络。这些所谓的二层网络 (l2) 通过以更低的费用处理更多的交易，并且只是每隔一段时间将这些交易的结果存储在以太坊上，从而帮助减少以太坊上的拥堵和成本。因此，这些二层网络使我们能够以更快的速度和更低的成本进行交易。由于这些优势，许多受欢迎的加密货币项目正在向二层网络迁移。将代币从以太坊转移到二层网络的最简单方法是使用跨链桥。

**先决条件：** 

- 拥有一个加密货币钱包——如果没有，请按照本指南[创建一个以太坊账户](/guides/how-to-create-an-ethereum-account/)
- 向你的钱包充值资金

## 1. 确定你要使用的二层网络 {#1-determine-which-layer-2-network-you-want-to-use}

你可以在我们的[二层网络页面](/layer-2/)上了解有关不同项目和重要链接的更多信息。

## 2. 前往选定的跨链桥 {#2-go-to-the-selected-bridge}

一些受欢迎的二层网络包括：

- [Arbitrum 跨链桥](https://portal.arbitrum.io/bridge?l2ChainId=42161)
- [Optimism 跨链桥](https://app.optimism.io/bridge/deposit)
- [Boba 网络跨链桥](https://hub.boba.network/)

## 3. 使用你的钱包连接到跨链桥 {#3-connect-to-the-bridge-with-your-wallet}

确保你的钱包已连接到以太坊主网。如果没有，网站将自动提示你切换网络。

![Common interface for bridging tokens](./bridge1.png)

## 4. 指定金额并转移资金 {#4-specify-the-amount-and-move-the-funds}

仔细检查你将在二层网络上获得的金额以及相关费用，以避免出现意外情况。

![Common interface for bridging tokens](./bridge2.png)

## 5. 在你的钱包中确认交易 {#5-confirm-the-transaction-in-your-wallet}

你将需要以 ETH 的形式支付一笔费用（称为 [Gas](/glossary/#gas)）来处理该交易。

![Common interface for bridging tokens](./bridge3.png)

## 6. 等待资金转移 {#6-wait-for-your-funds-to-be-moved}

这个过程通常不会超过 10 分钟。

## 7. 将选定的二层网络添加到你的钱包（可选） {#7-add-the-selected-layer-2-network-to-your-wallet-optional}

你可以使用 [chainlist.org](https://chainlist.org) 查找该网络的 RPC 详细信息。添加网络并完成交易后，你应该能在钱包中看到这些代币。
<br />

<Alert variant="update">
<AlertEmoji text=":eyes:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>想了解更多吗？</div>
  <ButtonLink href="/guides/">
    查看我们的其他指南
  </ButtonLink>
</AlertContent>
</Alert>

## 常见问题 {#frequently-asked-questions}

### 如果我的资金在交易所怎么办？ {#what-if-i-have-funds-on-an-exchange}

你也许可以直接从交易所提现到某些二层网络。请查看我们[二层网络页面](/layer-2/)的“迁移至二层网络”部分以获取更多信息。

### 将代币跨链到 l2 后，我还能回到以太坊主网吗？ {#can-i-go-back-to-ethereum-mainnet-after-i-bridge-my-tokens-to-l2}

可以，你随时可以使用同一个跨链桥将资金转回主网。
