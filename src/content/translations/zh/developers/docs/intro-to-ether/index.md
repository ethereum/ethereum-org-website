---
title: ETH 简介
description: 关于 ETH 加密货币的开发者指南
lang: zh
sidebar: true
---

## 前提条件 {#prerequisites}

为了更好地理解此页面，推荐先阅读：[以太坊简介](/developers/docs/intro-to-ethereum/)。

## 什么是加密货币？ {#what-is-a-cryptocurrency}

加密货币是由以区块链为基础的分类账保护的交换媒介。

交换媒介是指被广泛接受、可支付任何商品和服务的物品，而分类账是记录交易的数据存储系统。 区块链技术允许用户在分类账上进行交易，而不必依赖受信赖的第三方来维护分类账。

第一个加密货币是由 Satoshi Nakamoto 创建的比特币。 自 2009 年比特币发行以来，人们已经在许多不同的区块链上制作了数以千计的加密货币。

## 什么是以太币 (ETH)？ {#what-is-ether}

**以太币 (ETH)** 是用于以太坊网络上许多事物的加密货币。 从根本上讲，它是唯一可接受的交易费用支付方式，需通过[合并](/upgrades/merge) 以便在主网得到验证并提出区块。 以太币还被用作 [DeFi](/defi) 借贷市场的主要抵押形式，NFT 市场的主要记账单位以及提供服务、销售实体商品赚取的付款等。

以太坊允许开发者创建 [**去中心化应用 (dapp)**](/developers/docs/dapps)，它们共享算力池。 这个共享池是有限的，因此以太坊需要一种机制来确定谁可以使用它。 否则，某个 dapp 可能会意外或恶意地消耗所有网络资源，从而导致其他应用程序无法访问算力池。

ETH 加密货币支持以太坊算力的定价机制。 当用户想要完成一笔交易时，他们必须支付以太币，使他们的交易被区块链识别。 这些使用成本被称为 [gas 费用](/developers/docs/gas/)，gas 费用的多少取决于执行交易所需的算力和全网当时的算力需求。

因此，即使某恶意 dapp 无限循环提交，交易最终也会耗尽 ETH 并终止，从而使网络恢复正常。

人们[经常](https://www.reuters.com/article/us-crypto-currencies-lending-insight-idUSKBN25M0GP#:~:text=price%20of%20ethereum) [混](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845#:~:text=cryptocurrencies%20including%20ethereum) [淆](https://www.cnn.com/2021/03/14/tech/nft-art-buying/index.html#:~:text=price%20of%20ethereum)以太坊和以太币 (ETH) - 当他们谈及“以太坊价格”时，其实是指 ETH 价格。

## 铸造 ETH {#minting-ether}

铸造是指在以太坊分类账上创造新以太币的过程。 底层以太坊协议创造出新以太币，单一用户不可能创造。

当矿工在以太坊区块链上创建出一个区块时，就会铸造出新以太币。 作为对矿工的激励，以太坊协议在每个区块中都设置了奖励，增加区块矿工设置的地址余额。 区块奖励随时间而变化，目前奖励为每区块 2 个以太币。

## 燃烧 ETH {#burning-ether}

除了通过区块奖励创造 ETH，也可以通过被称为“燃烧”的过程销毁 ETH。 当 ETH 被燃烧掉，它也就永久退出流通。

以太坊上的每一笔交易都会发生 ETH 燃烧。 当用户支付交易费用时，基本 gas 费将根据协议被销毁。 根据网络需求，[某些区块](https://etherscan.io/block/12965263)燃烧的 ETH 超出铸造的 ETH。

## ETH 面额 {#denominations}

由于以太坊上许多交易规模较小，ETH 有一些面额单位表示较小金额。 在这些单位中，Wei 与 Gwei 特别重要。

Wei 是最小的 ETH 单位，因此在[以太坊黄皮书](https://ethereum.github.io/yellowpaper/paper.pdf)等众多技术实施中，都以 Wei 为基础进行运算。

Gwei（giga-wei 的缩写），常用于描述以太坊的 gas 费用。

| 面额 | ETH 值           | 常见用法      |
| ---- | ---------------- | ------------- |
| Wei  | 10<sup>-18</sup> | 技术实施      |
| Gwei | 10<sup>-9</sup>  | 可读 gas 费用 |

## 传输 ETH {#transferring-ether}

以太坊上的每一笔交易都包含一个 `值`域，指定了要从发送者地址发送到接收者地址的 ETH 转移数量（以 Wei 为单位）。

当接收者地址是[智能合约](/developers/docs/smart-contracts/)时，当智能合约执行其代码时，这些转移的以太币可用于支付 gas 费用。

[关于交易的更多信息](/developers/docs/transactions/)

## 查询 ETH {#querying-ether}

用户可以通过检查帐户`余额`字段来查询任何[帐户](/developers/docs/accounts/)的 ETH 余额，显示以 wei 为单位的 ETH 持有面额。

[Etherscan](https://etherscan.io) 是常用于检查地址余额的基于 web 的应用程序。 例如，[此 Etherscan 页面](https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae)显示以太坊基金会的余额。

## 延伸阅读 {#further-reading}

- [定义 ETH 和以太坊](https://www.cmegroup.com/education/courses/introduction-to-ether/defining-ether-and-ethereum.html) – _CME Group_
- [以太坊白皮书](/whitepaper/)：以太坊原始提案 这份资料包括了对 ETH 及其创建动机的整体描述。

_还有哪些社区资源对您有所帮助？ 请编辑本页面并添加！_
