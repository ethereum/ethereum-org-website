---
title: 使用 SQL 学习以太坊基础主题
description: 本教程通过使用结构化查询语言 (SQL) 查询链上数据，帮助读者理解包括交易、区块和 Gas 在内的以太坊基础概念。
author: "保罗·阿皮瓦特"
tags: ["SQL", "查询", "交易", "数据与分析"]
skill: beginner
breadcrumb: 使用 SQL 学习以太坊
lang: zh
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

许多以太坊教程都是针对开发者的，但对于数据分析师或希望在不运行客户端或节点的情况下查看链上数据的人来说，缺乏教育资源。

本教程通过 [Dune Analytics](https://dune.com/) 提供的界面，使用结构化查询语言 (SQL) 查询链上数据，帮助读者理解包括交易、区块和 Gas 在内的以太坊基础概念。

链上数据可以帮助我们理解以太坊、网络以及作为计算能力经济体的运作方式，并且应该作为理解以太坊当今面临的挑战（即不断上涨的 Gas 价格）的基础，更重要的是，作为围绕扩容解决方案进行讨论的基础。

### 交易 {#transactions}

用户在以太坊上的旅程始于初始化一个由用户控制的账户或具有 ETH 余额的实体。有两种账户类型——由用户控制的账户或智能合约（参见 [ethereum.org](/developers/docs/accounts/)）。

任何账户都可以在 [Etherscan](https://etherscan.io/) 或 [Blockscout](https://eth.blockscout.com/) 等区块浏览器上查看。区块浏览器是以太坊数据的门户。它们实时显示有关区块、交易、矿工、账户和其他链上活动的数据（参见[此处](/developers/docs/data-and-analytics/block-explorers/)）。

然而，用户可能希望直接查询数据，以核对外部区块浏览器提供的信息。[Dune Analytics](https://dune.com/) 为任何具备一定 SQL 知识的人提供了这种能力。

作为参考，可以在 [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) 上查看以太坊基金会 (EF) 的智能合约账户。

需要注意的一点是，所有账户（包括以太坊基金会的账户）都有一个可用于发送和接收交易的公共地址。

Etherscan 上的账户余额包含常规交易和内部交易。内部交易尽管名字如此，但并不是改变链状态的*实际*交易。它们是通过执行合约发起的价值转移（[来源](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)）。由于内部交易没有签名，因此它们**不**包含在区块链上，也无法使用 Dune Analytics 进行查询。

因此，本教程将重点关注常规交易。可以这样查询：

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

这将产生与 Etherscan 交易页面上提供的相同信息。为了进行比较，这里有两个来源：

#### Etherscan {#etherscan}

![Screenshot of Etherscan transaction explorer view](./etherscan_view.png)

[Blockscout 上的以太坊基金会合约页面。](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![Screenshot of a Dune Analytics query dashboard](./dune_view.png)

你可以在[此处](https://dune.com/paulapivat/Learn-Ethereum)找到仪表板。点击表格查看查询（另请参见上文）。

### 剖析交易 {#breaking-down-transactions}

提交的交易包含几项信息，包括（[来源](/developers/docs/transactions/)）：

- **接收方 (Recipient)**：接收地址（查询为 "to"）
- **签名 (Signature)**：虽然发送方的私钥对交易进行签名，但我们可以使用 SQL 查询的是发送方的公共地址（"from"）。
- **价值 (Value)**：这是转移的 ETH 数量（参见 `ether` 列）。
- **数据 (Data)**：这是经过哈希处理的任意数据（参见 `data` 列）
- **gas 上限 (gasLimit)**：交易可以消耗的最大 Gas 单位数量。Gas 单位代表计算步骤
- **maxPriorityFeePerGas**：作为给矿工的优先费包含的最大 Gas 量
- **maxFeePerGas**：愿意为交易支付的最大 Gas 量（包括 baseFeePerGas 和 maxPriorityFeePerGas）

我们可以查询发送到以太坊基金会公共地址的交易的这些特定信息：

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

每笔交易都会改变以太坊虚拟机 ([EVM](/developers/docs/evm/)) 的状态（[来源](/developers/docs/transactions/)）。交易被广播到网络以进行验证并包含在区块中。每笔交易都与一个区块号相关联。要查看数据，我们可以查询特定的区块号：12396854（截至撰写本文时，即 2021 年 5 月 11 日，以太坊基金会交易中最新的区块）。

此外，当我们查询接下来的两个区块时，我们可以看到每个区块都包含前一个区块的哈希（即父哈希），这说明了区块链是如何形成的。

每个区块都包含对其父区块的引用。这显示在下面的 `hash` 和 `parent_hash` 列之间（[来源](/developers/docs/blocks/)）：

![parent_hash](./parent_hash.png)

这是 Dune Analytics 上的[查询](https://dune.com/queries/44856/88292)：

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

我们可以通过查询时间、区块号、难度、哈希、父哈希和随机数来检查区块。

此查询唯一没有涵盖的是需要下面单独查询的*交易列表*和*状态根*。全节点或归档节点将存储所有交易和状态转换，允许客户端随时查询链的状态。因为这需要很大的存储空间，我们可以将链数据与状态数据分开：

- 链数据（区块列表、交易）
- 状态数据（每笔交易状态转换的结果）

状态根属于后者，是*隐式*数据（不存储在链上），而链数据是显式的，存储在链本身上（[来源](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)）。

在本教程中，我们将重点关注*可以*通过 Dune Analytics 使用 SQL 查询的链上数据。

如上所述，每个区块都包含一个交易列表，我们可以通过过滤特定区块来查询它。我们将尝试最新的区块 12396854：

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

这是 Dune 上的 SQL 输出：

![Screenshot of a list of Ethereum transactions](./list_of_txn.png)

这个被添加到链上的单个区块改变了以太坊虚拟机 ([EVM](/developers/docs/evm/)) 的状态。有时几十笔，有时几百笔交易会同时被验证。在这个特定案例中，包含了 222 笔交易。

要查看实际成功了多少笔，我们将添加另一个过滤器来计算成功的交易：

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

对于区块 12396854，在总共 222 笔交易中，有 204 笔被成功验证：

![Screenshot of a successful Ethereum transaction](./successful_txn.png)

交易请求每秒发生几十次，但区块大约每 15 秒提交一次（[来源](/developers/docs/blocks/)）。

要了解大约每 15 秒产生一个区块，我们可以用一天中的秒数 (86400) 除以 15，得到每天估计的平均区块数（约 5760 个）。

每天产生的以太坊区块图表（2016 年至今）如下：

![Chart showing daily Ethereum block production](./daily_blocks.png)

在此期间，每天产生的平均区块数约为 5,874 个：

![Chart showing daily Ethereum block production](./avg_daily_blocks.png)

查询如下：

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

自 2016 年以来，每天产生的平均区块数略高于该数字，为 5,874 个。或者，用 86400 秒除以 5874 个平均区块，得出 14.7 秒，即大约每 15 秒一个区块。

### Gas {#gas}

区块的大小是有界限的。最大区块大小是动态的，并根据网络需求在 12,500,000 到 25,000,000 个单位之间变化。需要设置限制以防止任意大的区块大小在磁盘空间和速度要求方面给全节点带来压力（[来源](/developers/docs/blocks/)）。

概念化区块 gas 上限的一种方法是将其视为用于批量处理交易的可用区块空间的**供应**。可以查询并可视化从 2016 年至今的区块 gas 上限：

![Chart showing average Ethereum gas limit over time](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

然后是每天用于支付在以太坊链上完成的计算（即发送交易、调用智能合约、铸造 NFT）的实际 Gas 消耗量。这是对可用以太坊区块空间的**需求**：

![Chart showing daily Ethereum gas used](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

我们还可以将这两个图表并列放在一起，看看**需求和供应**是如何对应的：

![gas_demand_supply](./gas_demand_supply.png)

因此，在给定可用供应的情况下，我们可以将 Gas 价格理解为对以太坊区块空间需求的函数。

最后，我们可能想要查询以太坊链的每日平均 Gas 价格，然而，这样做会导致查询时间特别长，因此我们将查询过滤为以太坊基金会每笔交易支付的平均 Gas 量。

![Chart showing Ethereum Foundation daily gas usage](./ef_daily_gas.png)

我们可以看到多年来向以太坊基金会地址进行的所有交易所支付的 Gas 价格。这是查询：

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

通过本教程，我们通过查询和感受链上数据，了解了以太坊的基础概念以及以太坊区块链的工作原理。

包含本教程中使用的所有代码的仪表板可以在[此处](https://dune.com/paulapivat/Learn-Ethereum)找到。

要了解更多使用数据探索 Web3 的信息，请[在推特上找到我](https://twitter.com/paulapivat)。