---
title: "使用 SQL 學習以太坊基礎主題"
description: "本教學透過使用結構化查詢語言 (SQL) 查詢鏈上資料，幫助讀者了解以太坊的基本概念，包含交易、區塊和燃料。"
author: "保羅·阿皮瓦"
tags:
  - SQL
  - 查詢
  - 交易
  - 資料與分析
skill: beginner
breadcrumb: "使用 SQL 學習以太坊"
lang: zh-tw
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

許多以太坊教學都是針對開發人員，但對於資料分析師或希望在不執行用戶端或節點的情況下查看鏈上資料的人來說，卻缺乏教育資源。

本教學透過 [Dune Analytics](https://dune.com/) 提供的介面，使用結構化查詢語言 (SQL) 查詢鏈上資料，幫助讀者了解以太坊的基本概念，包含交易、區塊和燃料。

鏈上資料可以幫助我們了解以太坊、網路以及作為運算能力的經濟體，並應作為了解以太坊當前面臨的挑戰（例如燃料價格上漲）的基礎，更重要的是，作為圍繞擴容解決方案討論的基礎。

### 交易 {#transactions}

使用者在以太坊上的旅程始於初始化一個由使用者控制的帳戶或具有 ETH 餘額的實體。有兩種帳戶類型：由使用者控制的帳戶或智能合約（請參閱 [ethereum.org](/developers/docs/accounts/)）。

任何帳戶都可以在區塊鏈瀏覽器（如 [Etherscan](https://etherscan.io/) 或 [Blockscout](https://eth.blockscout.com/)）上查看。區塊鏈瀏覽器是以太坊資料的入口網站。它們會即時顯示有關區塊、交易、礦工、帳戶和其他鏈上活動的資料（請參閱[此處](/developers/docs/data-and-analytics/block-explorers/)）。

然而，使用者可能希望直接查詢資料，以核對外部區塊鏈瀏覽器提供的資訊。[Dune Analytics](https://dune.com/) 為任何具備 SQL 基礎知識的人提供了這項功能。

作為參考，以太坊基金會 (EF) 的智能合約帳戶可以在 [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) 上查看。

需要注意的一點是，所有帳戶（包含以太坊基金會的帳戶）都有一個可用於發送和接收交易的公開地址。

Etherscan 上的帳戶餘額包含一般交易和內部交易。內部交易儘管名稱如此，但並非改變鏈狀態的「實際」交易。它們是透過執行合約所發起的價值轉移（[來源](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)）。由於內部交易沒有簽章，因此它們**不**包含在區塊鏈中，也無法使用 Dune Analytics 進行查詢。

因此，本教學將重點放在一般交易。可以這樣查詢：

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

這將產生與 Etherscan 交易頁面上提供的相同資訊。為了進行比較，以下是兩個來源：

#### Etherscan {#etherscan}

![Screenshot of Etherscan transaction explorer view](./etherscan_view.png)

[Blockscout 上的以太坊基金會合約頁面。](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![Screenshot of a Dune Analytics query dashboard](./dune_view.png)

您可以在[此處](https://dune.com/paulapivat/Learn-Ethereum)找到儀表板。點擊表格以查看查詢（另請參見上文）。

### 拆解交易 {#breaking-down-transactions}

提交的交易包含幾項資訊，包含（[來源](/developers/docs/transactions/)）：

- **接收者 (Recipient)**：接收地址（查詢為「to」）
- **簽章 (Signature)**：雖然發送者的私鑰會對交易進行簽章，但我們可以使用 SQL 查詢的是發送者的公開地址（「from」）。
- **值 (Value)**：這是轉移的 ETH 數量（請參閱 `ether` 欄位）。
- **資料 (Data)**：這是經過雜湊處理的任意資料（請參閱 `data` 欄位）
- **gasLimit** – 交易可消耗的最大燃料單位數量。燃料單位代表運算步驟
- **maxPriorityFeePerGas** - 作為給礦工的小費而包含的最大燃料量
- **maxFeePerGas** - 願意為交易支付的最大燃料量（包含 baseFeePerGas 和 maxPriorityFeePerGas）

我們可以查詢發送至以太坊基金會公開地址之交易的這些特定資訊：

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

### 區塊 {#blocks}

每筆交易都會改變以太坊虛擬機 ([EVM](/developers/docs/evm/)) 的狀態（[來源](/developers/docs/transactions/)）。交易會被廣播到網路以進行驗證並包含在區塊中。每筆交易都與一個區塊號碼相關聯。要查看資料，我們可以查詢特定的區塊號碼：12396854（截至撰寫本文時，即 2021 年 5 月 11 日，以太坊基金會交易中最新的區塊）。

此外，當我們查詢接下來的兩個區塊時，我們可以看到每個區塊都包含前一個區塊的雜湊（即父雜湊），這說明了區塊鏈是如何形成的。

每個區塊都包含對其父區塊的參考。這顯示在下方的 `hash` 和 `parent_hash` 欄位之間（[來源](/developers/docs/blocks/)）：

![parent_hash](./parent_hash.png)

以下是 Dune Analytics 上的[查詢](https://dune.com/queries/44856/88292)：

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

我們可以透過查詢時間、區塊號碼、難度、雜湊、父雜湊和隨機數來檢查區塊。

此查詢唯一沒有涵蓋的是「交易列表」（需要下方獨立的查詢）和「狀態根」。全節點或歸檔節點將儲存所有交易和狀態轉換，允許用戶端隨時查詢鏈的狀態。因為這需要龐大的儲存空間，我們可以將鏈資料與狀態資料分開：

- 鏈資料（區塊列表、交易）
- 狀態資料（每筆交易狀態轉換的結果）

狀態根屬於後者，是「隱含」資料（未儲存在鏈上），而鏈資料是明確的，並儲存在鏈本身（[來源](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)）。

在本教學中，我們將重點放在「可以」透過 Dune Analytics 使用 SQL 查詢的鏈上資料。

如上所述，每個區塊都包含一個交易列表，我們可以透過篩選特定區塊來查詢。我們將嘗試最新的區塊 12396854：

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

以下是 Dune 上的 SQL 輸出：

![Screenshot of a list of Ethereum transactions](./list_of_txn.png)

這個被加入到鏈中的單一區塊改變了以太坊虛擬機 ([EVM](/developers/docs/evm/)) 的狀態。有時幾十筆，有時數百筆交易會同時被驗證。在這個特定案例中，包含了 222 筆交易。

要查看實際上有多少筆交易成功，我們將加入另一個篩選條件來計算成功的交易：

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

對於區塊 12396854，在總共 222 筆交易中，有 204 筆成功通過驗證：

![Screenshot of a successful Ethereum transaction](./successful_txn.png)

交易請求每秒發生數十次，但區塊大約每 15 秒提交一次（[來源](/developers/docs/blocks/)）。

為了驗證大約每 15 秒產生一個區塊，我們可以將一天中的秒數 (86400) 除以 15，得出每天估計的平均區塊數（約 5760 個）。

以太坊每天產生的區塊圖表（2016 年至今）如下：

![Chart showing daily Ethereum block production](./daily_blocks.png)

這段期間每天產生的平均區塊數約為 5,874 個：

![Chart showing daily Ethereum block production](./avg_daily_blocks.png)

查詢如下：

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

自 2016 年以來，每天產生的平均區塊數略高於該數字，為 5,874 個。或者，將 86400 秒除以平均 5874 個區塊，得出 14.7 秒，即大約每 15 秒產生一個區塊。

### 燃料 {#gas}

區塊的大小是有限制的。最大區塊大小是動態的，並根據網路需求在 12,500,000 到 25,000,000 個單位之間變化。必須設定限制，以防止任意過大的區塊大小在磁碟空間和速度需求方面對全節點造成壓力（[來源](/developers/docs/blocks/)）。

概念化區塊 Gas 限制的一種方法是將其視為可用於批次處理交易之區塊空間的**供給**。可以查詢並視覺化從 2016 年至今的區塊 Gas 限制：

![Chart showing average Ethereum gas limit over time](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

然後是每天實際用於支付以太坊鏈上運算（例如發送交易、呼叫智能合約、鑄造 NFT）的燃料。這是對可用以太坊區塊空間的**需求**：

![Chart showing daily Ethereum gas used](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

我們也可以將這兩個圖表並列，看看**供需**如何對應：

![gas_demand_supply](./gas_demand_supply.png)

因此，在給定可用供給的情況下，我們可以將燃料價格理解為對以太坊區塊空間需求的函數。

最後，我們可能想要查詢以太坊鏈的每日平均燃料價格，然而，這樣做會導致查詢時間特別長，因此我們將查詢篩選為以太坊基金會每筆交易支付的平均燃料量。

![Chart showing Ethereum Foundation daily gas usage](./ef_daily_gas.png)

我們可以看到多年來發送至以太坊基金會地址的所有交易所支付的燃料價格。查詢如下：

```sql
SELECT
    block_time,
    gas_price / 1e9 AS gas_price_gwei,
    value / 1e18 AS eth_sent
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### 總結 {#summary}

透過本教學，我們藉由查詢和體驗鏈上資料，了解了以太坊的基礎概念以及以太坊區塊鏈的運作方式。

包含本教學中使用的所有程式碼的儀表板可以在[此處](https://dune.com/paulapivat/Learn-Ethereum)找到。

如需更多使用資料探索 Web3 的資訊，請[在推特上找我](https://twitter.com/paulapivat)。