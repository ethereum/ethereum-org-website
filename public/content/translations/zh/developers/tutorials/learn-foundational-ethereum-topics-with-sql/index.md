---
title: 通过 SQL 学习以太坊基础主题
description: 本教程帮助读者通过使用结构化查询语言 (SQL) 查询链上数据，了解以太坊的基本概念，包括交易、区块和燃料。
author: "Paul Apivat"
tags:
  - "SQL"
  - "查询"
  - "交易"
skill: beginner
lang: zh
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

针对开发者的以太坊教程很多，但对于数据分析师或希望不运行客户端或节点就能查看链上数据的人员，教育资源却稀缺。

本教程帮助读者通过 [Dune Analytics](https://dune.xyz/home) 提供的接口，使用结构化查询语言 (SQL) 查询链上数据，从而了解以太坊的基本概念，包括交易、区块和燃料。

链上数据可以帮助我们理解网络和算力经济 — 以太坊，并且帮助我们理解以太坊当前所面临的挑战（例如不断上涨的燃料），更重要的是，了解一些围绕扩容解决方案的讨论。

### 交易 {#transactions}

用户以太坊之旅的第一步是初始化具有以太币余额的用户控制帐户或实体。 账户类型分为两种 — 用户控制账户或智能合约（参阅 [ethereum.org](/developers/docs/accounts/)）。

可以在诸如 [Etherscan](https://etherscan.io/) 等区块浏览器上查看任何账户。 区块浏览器是您访问以太坊数据的门户。 它们实时显示区块上的数据、交易、矿工、帐户和其他链上活动（参阅[此处](/developers/docs/data-and-analytics/block-explorers/)）。

然而，用户可能希望直接查询数据，以核对外部区块浏览器提供的信息。 [Dune Analytics](https://duneanalytics.com/) 为任何对 SQL 有一定了解的人提供了这种功能。

作为参考，以太坊基金会 (EF) 的智能合约账户可以在 [Etherscan](https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae) 上查看。

值得注意的是，包括以太坊基金会账户在内的所有账户都有一个公共地址，可用来发送和接收交易。

Etherscan 上的账户余额由常规交易和内部交易构成。 尽管使用了这一名称，但内部交易并不是改变链状态的*真正*交易。 它们是通过执行合约发起的价值转移（[原文](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)）。 因为内部交易没有签名，它们**没有**包含在区块上，并且不能通过 Dune Analytics 查询。

因此，本教程将侧重于常规交易。 可以这样查询：

```sql
WITH temp_table AS (
SELECT
    hash,
    block_number,
    block_time,
    "from",
    "to",
    value / 1e18 AS ether,
    gas_used,
    gas_price / 1e9 AS gas_price_gwei
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
)
SELECT
    hash,
    block_number,
    block_time,
    "from",
    "to",
    ether,
    (gas_used * gas_price_gwei) / 1e9 AS txn_fee
FROM temp_table
```

产生的信息与 Etherscan 交易页面提供的信息相同。 为了比较起见，下面是两种来源的信息：

#### Etherscan {#etherscan}

![](./etherscan_view.png)

[Etherscan 上以太坊基金会的合约页面。](https://etherscan.io/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![](./dune_view.png)

可以在[此处](https://duneanalytics.com/paulapivat/Learn-Ethereum)找到仪表板。 点击表格查看查询（另请参阅上文）。

### 交易明细 {#breaking_down_transactions}

提交的交易包含几条信息，包括[（原文）](/developers/docs/transactions/)：

- **接收者**：接收地址（通过“to”查询）
- **签名**：虽然由发送者的私钥签署交易，但我们可以通过 SQL 查询的是发送者的公共地址（“from”）。
- **价值**：指的是转移的以太币数量（参阅 `ether` 列）。
- **数据**：指的是经过哈希运算的任意数据（参阅 `data` 列）
- **gasLimit** – 交易可以消耗的最大数量的燃料单位。 燃料单位代表计算步骤
- **maxPriorityFeePerGas** - 作为矿工小费包含的最大燃料数量
- **maxFeePerGas** - 愿意为交易支付的最大燃料数量（包括 baseFeePerGas 和 maxPriorityFeePerGas）

我们可以向以太坊基金会公共地址查询这些具体的交易信息：

```sql
SELECT
    "to",
    "from",
    value / 1e18 AS ether,
    data,
    gas_limit,
    gas_price / 1e9 AS gas_price_gwei,
    gas_used,
    ROUND(((gas_used / gas_limit) * 100),2) AS gas_used_pct
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### 区块 {#blocks}

每笔交易都会改变以太坊虚拟机 ([EVM](/developers/docs/evm/)) 的状态（[原文](/developers/docs/transactions/)）。 交易广播到网络上进行验证并被记录在一个区块中。 每笔交易都与一个区块编号相关联。 要查看数据，我们可以查询一个具体的区块编码：12396854（截至本文撰写日期 2021 年 11 月 5 日，以太坊基金会交易中最新的区块）。

此外，当我们查询下两个区块时，我们可以看到每个区块包含上一个区块的哈希值（即父哈希值），以此来说明区块链是如何形成的。

每个区块都包含对其父块的引用。 如下面的 `hash` 和 `parent_hash` 列所示（[原文](/developers/docs/blocks/)）：

![父_哈希值](./parent_hash.png)

下面是 Dune Analytics 上的[查询](https://duneanalytics.com/queries/44856/88292)：

```sql
SELECT
   time,
   number,
   hash,
   parent_hash,
   nonce
FROM ethereum."blocks"
WHERE "number" = 12396854 OR "number" = 12396855 OR "number" = 12396856
LIMIT 10
```

我们可以通过查询时间、区块编号、难度、哈希值、父哈希值及随机数来检查一个区块。

此查询唯一不包含的内容是*交易列表*，需要通过下面的单独查询和*状态根*来查看它。 完整或归档节点将存储所有交易和状态转换，允许客户端随时查询链的状态。 因为这需要非常大的存储空间，我们可以将链数据与状态数据分开：

- 链数据（区块列表、交易）
- 状态数据（每次交易状态转换的结果）

状态根属于状态数据，是*隐式*数据（未存储在链上），而链数据是显式数据并存储在链上（[原文](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)）。

在本教程中，我们将侧重于*可以*在 Dune Analytics 上使用 SQL 查询的链上数据。

如上所述，每个区块都包含一个交易列表，我们可以通过筛选一个特定区块来查询它。 我们将尝试最新的区块 12396854：

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

下面是 Dune 上的 SQL 输出：

![](./list_of_txn.png)

添加到链中的这个单独区块改变了以太坊虚拟机 ([EVM](/developers/docs/evm/)) 的状态。 几十笔，有时数百笔交易会同时进行验证。 在本例中，记录了 222 笔交易。

要查看实际有多少笔成功交易，我们将添加另一个筛选器来计算成功的交易：

```sql
WITH temp_table AS (
    SELECT * FROM ethereum."transactions"
    WHERE block_number = 12396854 AND success = true
    ORDER BY block_time DESC
)
SELECT
    COUNT(success) AS num_successful_txn
FROM temp_table
```

对于区块 12396854，在 222 笔交易中，有 204 笔成功验证：

![](./successful_txn.png)

交易请求每秒发生数十次，但区块大约每 15 秒提交一次（[原文](/developers/docs/blocks/)）。

要了解大约每 15 秒产生一个区块，我们可以用一天的总秒数 (86400) 除以 15，得到估算的每日平均区块数量（大约 5760 个）。

每天产生的以太坊区块数量图表（2016 年至今）如下所示：

![](./daily_blocks.png)

这段时间内每天生产的平均区块数量大约 5,874 个：

![](./avg_daily_blocks.png)

查询如下所示：

```sql
# query to visualize number of blocks produced daily since 2016

SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1

# average number of blocks produced per day

WITH temp_table AS (
SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
)
SELECT
    AVG(block_count) AS avg_block_count
FROM temp_table
```

2016 年以来每天产生的平均区块数量略高于 5,874 个。 或者，将 86400 秒除以平均区块数量 5874 应得到 14.7 秒，或大约每 15 秒一个区块。

### 燃料 {#gas}

区块的大小是有限的。 最大区块大小是动态的，根据网络需求在 12,500,000 到 25,000,000 个单位之间变化。 需要设置大小限制，防止任意大的区块大小给全节点造成磁盘空间和速度要求方面的压力（[出处](/developers/docs/blocks/)）。

了解区块燃料限额的一种方法是将其视为区块空间（可在其中批量处理交易）的**供应**。 可以查询并显示从 2016 年至今的区块燃料限额：

![](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

每天都有实际的燃料使用量，用于支付在以太坊链上完成的计算（例如，发送交易、调用智能合同、铸造非同质化代币）。 这是对以太坊可用区块空间的**需求**：

![](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

我们还可以将这两个图表合并在一起，看看**需求和供应**如何契合：

![燃料_需求_供应](./gas_demand_supply.png)

因此，考虑到现有的供应情况，我们可以理解燃料价格是以太坊区块空间需求量的函数。

最后，我们可能想查询以太坊链的日均燃料价格，但种查询会造成特别长的查询时间，所以我们将进行筛选，查询以太坊基金会对每笔交易支付的平均燃料数额。

![](./ef_daily_gas.png)

我们可以看到多年来为以太坊基金会地址上进行的全部交易而支付的燃料价格。 查询如下：

```sql
SELECT
    block_time,
    gas_price / 1e9 AS gas_price_gwei,
    value / 1e18 AS eth_sent
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### 总结 {#summary}

在本教程中，我们经过查询和感受链上数据，了解了以太坊基础概念以及以太坊区块链工作原理。

包含本教程中所用全部代码的仪表板可以在[此处](https://duneanalytics.com/paulapivat/Learn-Ethereum)找到。

若要更多地使用数据来探索 Web3，[请在推特上找到我](https://twitter.com/paulapivat)。
