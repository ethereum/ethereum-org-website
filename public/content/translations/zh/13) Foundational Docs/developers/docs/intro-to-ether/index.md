---
title: 以太币简介
description: 开发者讲解以太币加密货币
lang: zh
---

## 前提条件 {#prerequisites}

为了更好地理解此页面，推荐先阅读：[以太坊简介](/developers/docs/intro-to-ethereum/)。

## 什么是加密货币？ {#what-is-a-cryptocurrency}

加密货币是一种基于分布式账本（区块链）的交换媒介。

交换媒介是指被广泛接受、可支付任何商品和服务的物品，而分类账是记录交易的数据存储系统。 区块链技术允许用户在分类账上进行交易，而不必依赖受信赖的第三方来维护分类账。

第一个加密货币是由 Satoshi Nakamoto 创建的比特币。 自 2009 年比特币发行以来，人们已经在许多不同的区块链上制作了数以千计的加密货币。

## 什么是以太币 (ETH)？ {#what-is-ether}

**以太币 (ETH)** 是用于以太坊网络上许多事物的加密货币。 从根本上讲，以太币是唯一可接受的交易费支付方式，并且在[合并](/roadmap/merge)之后，在主网上验证和提出区块需要以太币。 以太币还被用作 [去中心化金融](/defi) 借贷市场的主要抵押形式，非同质化代币市场的主要记账单位以及提供服务、销售实体商品赚取的付款等。

以太坊允许开发者创建 [**去中心化应用程序 (dapp)**](/developers/docs/dapps)，它们共享算力池。 这个共享池是有限的，因此以太坊需要一种机制来确定谁可以使用它。 否则，某个 dapp 可能会意外或恶意地消耗所有网络资源，从而导致其他应用程序无法访问算力池。

ETH 加密货币支持以太坊算力的定价机制。 当用户想要完成一笔交易时，他们必须支付以太币，使他们的交易被区块链识别。 这些使用成本被称为 [gas 费用](/developers/docs/gas/)，gas 费用的多少取决于执行交易所需的算力和全网当时的算力需求。

因此，即使某恶意 dapp 无限循环提交，交易最终也会耗尽 ETH 并终止，从而使网络恢复正常。

人们[经常](https://www.reuters.com/article/us-crypto-currencies-lending-insight-idUSKBN25M0GP#:~:text=price%20of%20ethereum) [会](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845#:~:text=cryptocurrencies%20including%20ethereum) [混淆](https://www.cnn.com/2021/03/14/tech/nft-art-buying/index.html#:~:text=price%20of%20ethereum)以太坊和以太币 - 当他们谈及“以太坊价格”时，其实是指以太币价格。

## 铸造 ETH {#minting-ether}

铸造是指在以太坊分类账上创造新以太币的过程。 底层以太坊协议创造出新以太币，单一用户不可能创造。

以太币铸造出来，用来奖励提议的每个区块，以及在每个时段的检查点奖励验证者执行的和达成共识有关的其他活动。 总发行量取决于验证者的数量和它们质押的以太币数量。 在所有验证者都诚实且在线的理想情况下，以太币总发行量会在所有验证者中等分，但现实中分配情况会因验证者的表现而异。 总发行量的大约 1/8 会奖励给区块提议者，剩余部分在其它验证者中分配。 区块提议者还会获得交易费小费和矿工可提取价值，但这些都来自流通中的以太币，而非新发行的以太币。

## 燃烧 ETH {#burning-ether}

除了通过区块奖励创建以太币，以太币也能通过“燃烧”过程销毁。 当 ETH 被燃烧掉，它也就永久退出流通。

以太坊上的每一笔交易都会发生以太币销毁。 当用户为他们的交易支付费用时，网络根据交易需求设置的基础燃料费会被销毁。 以太币销毁再加上可变区块大小和最高燃料费，简化了以太坊上的交易费估算。 网络需求量高时，[区块](https://etherscan.io/block/12965263)燃烧的以太币数量可以多于铸造的以太币数量，有效地抵消了以太币的发行。

销毁基础费抑制区块生产者操纵交易的能力。 例如，如果区块生产者获得了基础费，他们可以免费添加自己的交易，并提高其他所有人的基础费。 或者，矿工可以将基础费退还给一些链下用户，造成交易费市场更加不透明和复杂。

## ETH 面额 {#denominations}

由于以太坊上很多交易数额都比较小，因此以太币有几种面额，可以作为较小的记账单位。 在这些面额中，Wei 与 Gwei 特别重要。

Wei 是最小的以太币面额，因此在[以太坊黄皮书](https://ethereum.github.io/yellowpaper/paper.pdf)等众多技术实现中，都以 Wei 为单位进行计算。

Gwei（giga-wei 的缩写），常用于描述以太坊上的燃料费用。

| 面额   | ETH 值            | 常见用法   |
| ---- | ---------------- | ------ |
| Wei  | 10<sup>-18</sup> | 技术实施   |
| Gwei | 10<sup>-9</sup>  | 可读燃料费用 |

## 传输 ETH {#transferring-ether}

以太坊上的每笔交易都包含一个 `value` 字段，指定从发送者地址发送到接收者地址的以太币转账金额（以 Wei 为单位）。

当接收者地址是[智能合约](/developers/docs/smart-contracts/)时，在智能合约执行其代码后，这些转账的以太币可用于支付燃料费用。

[有关交易的更多信息](/developers/docs/transactions/)

## 查询 ETH {#querying-ether}

用户可以通过检查帐户的 `balance` 字段来查询任何[帐户](/developers/docs/accounts/)的以太币余额，该字段显示以太币持有数量（以 Wei 为单位）。

[Etherscan](https://etherscan.io) 是一种常用工具，用于通过基于 Web 的应用程序检查地址余额。 例如，[此 Etherscan 页面](https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae)显示以太坊基金会的余额。 也可以通过使用钱包或直接向节点提出请求来查询帐户余额。

## 延伸阅读 {#further-reading}

- [定义 ETH 和以太坊](https://www.cmegroup.com/education/courses/introduction-to-ether/defining-ether-and-ethereum.html) – _CME Group_
- [以太坊白皮书](/whitepaper/)：以太坊原始提案 这份资料包括了对 ETH 及其创建动机的整体描述。
- [Gwei 计算器](https://www.alchemy.com/gwei-calculator)：使用这个 Gwei 计算器可以轻松地换算 wei、Gwei 和 ETH。 只需输入任何数量的 wei、Gwei 或 ETH，就能够自动换算。

_还有哪些社区资源对你有所帮助？ 请编辑本页面并添加！_
