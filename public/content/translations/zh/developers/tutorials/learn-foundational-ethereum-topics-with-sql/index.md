---
title: 通过 SQL 学习以太坊基础主题
description: 本教程帮助读者通过使用结构化查询语言 (SQL) 查询链上数据，了解以太坊的基本概念，包括交易、区块和燃料。
author: "Paul Apivat"
tags: [ "SQL", "查询", "交易" ]
skill: beginner
lang: zh
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

面向开发者的以太坊教程很多，但缺少面向数据分析师或希望在不运行客户端或节点的情况下查看链上数据的人员的教育资源。

本教程通过 [Dune Analytics](https://dune.com/) 提供的界面，帮助读者使用结构化查询语言 (SQL) 查询链上数据，从而了解以太坊的基本概念，包括交易、区块和燃料。

链上数据可以帮助我们了解以太坊（它是一个网络，也是一个算力经济体），并且应该作为理解以太坊当今所面临挑战（即不断上涨的燃料价格）以及更重要的扩容解决方案相关讨论的基础。

### 交易 {#transactions}

用户的以太坊之旅，始于初始化一个拥有 ETH 余额的用户控制帐户或实体。 帐户类型分为两种——用户控制帐户或智能合约（请参阅 [ethereum.org](/developers/docs/accounts/)）。

任何帐户都可以在 [Etherscan](https://etherscan.io/) 或 [Blockscout](https://eth.blockscout.com/) 等区块浏览器上查看。 区块浏览器是访问以太坊数据的门户。 它们实时显示区块、交易、矿工、帐户及其他链上活动的数据（请参阅[此处](/developers/docs/data-and-analytics/block-explorers/)）。

然而，用户可能希望直接查询数据，以核对外部区块浏览器提供的信息。 [Dune Analytics](https://dune.com/) 为任何对 SQL 有一定了解的人提供了这种功能。

作为参考，以太坊基金会 (EF) 的智能合约帐户可以在 [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) 上查看。

值得注意的是，包括以太坊基金会的帐户在内的所有帐户都有一个公共地址，可用来发送和接收交易。

Etherscan 上的帐户余额由常规交易和内部交易构成。 尽管名为内部交易，但它们并不是改变链上状态的_真正_交易。 它们是通过执行合约发起的价值转移（[来源](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)）。 由于内部交易没有签名，它们**并未**包含在区块链上，因此无法用 Dune Analytics 查询。

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

这将产生与 Etherscan 交易页面上提供的信息相同的信息。 为便于比较，以下是这两个来源：

#### Etherscan {#etherscan}

![](./etherscan_view.png)

[Blockscout 上的 EF 合约页面。](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![](./dune_view.png)

你可以在[此处](https://dune.com/paulapivat/Learn-Ethereum)找到看板。 点击表格查看查询（另请参阅上文）。

### 交易详解 {#breaking_down_transactions}

一笔已提交的交易包含以下几项信息（[来源](/developers/docs/transactions/)）：

- **接收方**：接收地址（查询时用 "to"）
- **签名**：虽然由发送者的私钥签署交易，但我们可以用 SQL 查询的是发送者的公共地址（"from"）。
- **价值**：这是转移的 ETH 数量（请参阅 `ether` 列）。
- **数据**：这是经过哈希运算的任意数据（请参阅 `data` 列）
- **gasLimit** – 交易可消耗的最大燃料单位数量。 燃料单位代表计算步骤
- **maxPriorityFeePerGas** - 作为给矿工的小费所包含的最大燃料数量
- **maxFeePerGas** - 愿意为交易支付的最大燃料数量（包括 baseFeePerGas 和 maxPriorityFeePerGas）

我们可以查询发送至以太坊基金会公共地址的交易中的这些具体信息：

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

每笔交易都会改变以太坊虚拟机 ([EVM](/developers/docs/evm/)) 的状态（[来源](/developers/docs/transactions/)）。 交易会广播到网络进行验证，并被包含在一个区块中。 每笔交易都与一个区块编号相关联。 要查看数据，我们可以查询一个具体的区块编号：12396854（在撰写本文时 [2021 年 5 月 11 日]，这是以太坊基金会交易中最新的区块）。

此外，当我们查询下两个区块时，可以看到每个区块都包含上一个区块的哈希值（即父哈希），这说明了区块链是如何形成的。

每个区块都包含对其父区块的引用。 这在下面的 `hash` 和 `parent_hash` 列之间有所显示（[来源](/developers/docs/blocks/)）：

![parent_hash](./parent_hash.png)

以下是 Dune Analytics 上的[查询](https://dune.com/queries/44856/88292)：

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

此查询唯一未涵盖的是_交易列表_（这需要下文的单独查询）和_状态根_。 完整节点或归档节点将存储所有交易和状态转换，允许客户端随时查询链的状态。 因为这需要非常大的存储空间，我们可以将链数据与状态数据分开：

- 链数据（区块列表、交易）
- 状态数据（每次交易状态转换的结果）

状态根属于后者，是_隐式_数据（不存储在链上），而链数据是显式数据，存储在链本身上（[来源](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)）。

在本教程中，我们将重点关注那些_可以_通过 Dune Analytics 用 SQL 查询的链上数据。

如上所述，每个区块都包含一个交易列表，我们可以通过筛选一个特定区块来查询它。 我们将尝试最新的区块 12396854：

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

下面是 Dune 上的 SQL 输出：

![](./list_of_txn.png)

这个被添加到链上的区块，改变了以太坊虚拟机 ([EVM](/developers/docs/evm/)) 的状态。 有时几十笔、甚至几百笔交易会同时得到验证。 在这个特定的案例中，包含了 222 笔交易。

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

对于区块 12396854，在 222 笔总交易中，有 204 笔成功验证：

![](./successful_txn.png)

交易请求每秒发生数十次，但区块大约每 15 秒提交一次（[来源](/developers/docs/blocks/)）。

要了解大约每 15 秒产生一个区块，我们可以用一天的总秒数 (86400) 除以 15，得到估算的每日平均区块数量（约 5760 个）。

每天产生的以太坊区块数量图表（2016 年至今）如下所示：

![](./daily_blocks.png)

这段时间内每天生产的平均区块数量大约 5,874 个：

![](./avg_daily_blocks.png)

查询如下：

```sql
# 用于可视化自 2016 年以来每日产出区块数量的查询

SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1

# 每日产出区块的平均数量

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

自 2016 年以来，每日产出的平均区块数量为 5,874，略高于该估算值。 另外，将 86400 秒除以 5874 个平均区块数，得出 14.7 秒，即大约每 15 秒一个区块。

### 燃料 {#gas}

区块的大小是有限的。 最大区块大小是动态的，根据网络需求在 12,500,000 到 25,000,000 个单位之间变化。 需要设置限制，以防止任意大的区块给完整节点在磁盘空间和速度方面带来压力（[来源](/developers/docs/blocks/)）。

理解区块燃料限制的一种方法是，将其看作是可用于批量处理交易的区块空间的**供应**。 可以查询并可视化从 2016 年至今的区块燃料限制：

![](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

然后是每日实际使用的燃料，用于支付在以太坊链上完成的计算（即发送交易、调用智能合约、铸造 NFT）。 这是对以太坊可用区块空间的**需求**：

![](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

我们还可以将这两个图表并列，看看**需求和供应**如何匹配：

![gas_demand_supply](./gas_demand_supply.png)

因此，在给定可用供应的情况下，我们可以将燃料价格理解为以太坊区块空间需求的函数。

最后，我们可能想查询以太坊链的日均燃料价格，但这样做会导致查询时间特别长，所以我们将筛选查询，只查询以太坊基金会为每笔交易支付的平均燃料量。

![](./ef_daily_gas.png)

我们可以看到多年来，向以太坊基金会地址发起的交易所支付的燃料价格。 查询如下：

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

通过本教程，我们查询并感受了链上数据，从而了解了以太坊的基本概念以及以太坊区块链的工作原理。

包含本教程中所有代码的看板可以在[此处](https://dune.com/paulapivat/Learn-Ethereum)找到。

若要更多地使用数据来探索 Web3，请在 [Twitter](https://twitter.com/paulapivat) 上找到我。
