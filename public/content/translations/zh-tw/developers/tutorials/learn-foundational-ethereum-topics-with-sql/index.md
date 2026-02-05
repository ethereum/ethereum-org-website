---
title: 使用 SQL 學習基礎以太坊主題
description: 本教學課程將透過結構化查詢語言 (SQL) 查詢鏈上資料，協助讀者了解基本的以太坊概念，包括交易、區塊和 Gas。
author: "Paul Apivat"
tags: [ "SQL", "查詢", "交易" ]
skill: beginner
lang: zh-tw
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

許多以太坊教學課程都以開發人員為對象，但卻缺乏為資料分析師，或是想在不執行用戶端或節點的情況下查看鏈上資料的人們所準備的教育資源。

本教學課程透過 [Dune Analytics](https://dune.com/) 提供的介面，以結構化查詢語言 (SQL) 查詢鏈上資料，協助讀者了解基本的以太坊概念，包括交易、區塊和 Gas。

鏈上資料可以幫助我們了解以太坊、網路以及作為運算能力的經濟體，並且應該作為基礎，以了解以太坊現今面臨的挑戰 (例如 Gas 費用上漲)，更重要的是，可以圍繞擴展解決方案進行討論。

### 交易 {#transactions}

使用者在以太坊的旅程，始於初始化一個由使用者控制的帳戶，或一個具有 ETH 餘額的實體。 帳戶有兩種類型：由使用者控制的帳戶，或智能合約帳戶 (請參閱 [ethereum.org](/developers/docs/accounts/))。

任何帳戶都可以在 [Etherscan](https://etherscan.io/) 或 [Blockscout](https://eth.blockscout.com/) 等區塊瀏覽器上查看。 區塊瀏覽器是以太坊資料的入口網站。 它們會即時顯示區塊、交易、礦工、帳戶和其他鏈上活動的資料 (請參閱[此處](/developers/docs/data-and-analytics/block-explorers/))。

然而，使用者可能希望直接查詢資料，以核對外部區塊瀏覽器提供的資訊。 [Dune Analytics](https://dune.com/) 為任何具備 SQL 知識的人提供此功能。

以供參考，以太坊基金會 (EF) 的智能合約帳戶可以在 [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) 上查看。

需要注意的是，所有帳戶，包括以太坊基金會的帳戶，都有一個可用於傳送和接收交易的公開地址。

Etherscan 上的帳戶餘額包含一般交易和內部交易。 內部交易，雖然名為內部交易，但並非會改變鏈狀態的「實際」交易。 它們是透過執行合約來啟動的價值轉移 ([來源](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions))。 由於內部交易沒有簽名，所以「不會」被包含在區塊鏈上，也無法使用 Dune Analytics 查詢。

因此，本教學課程將著重於一般交易。 查詢方式如下：

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

這將會產生與 Etherscan 交易頁面上所提供的相同資訊。 為了比較，以下是兩個來源：

#### Etherscan {#etherscan}

![](./etherscan_view.png)

[Blockscout 上的以太坊基金會合約頁面。](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![](./dune_view.png)

你可以在[此處](https://dune.com/paulapivat/Learn-Ethereum)找到儀表板。 按一下表格以查看查詢 (也請參閱上方)。

### 交易詳解 {#breaking_down_transactions}

已提交的交易包含幾項資訊，其中包括 ([來源](/developers/docs/transactions/))：

- **收款人**：接收地址 (查詢為 "to")
- **簽名**：雖然寄件人的私鑰會簽署交易，但我們可以使用 SQL 查詢的是寄件人的公開地址 ("from")。
- **價值**：這是轉移的 ETH 金額 (請參閱 `ether` 欄位)。
- **資料**：這是經過哈希運算的任意資料 (請參閱 `data` 欄位)
- **gasLimit** – 交易可耗用的 gas 單位上限。 gas 單位代表運算步驟
- **maxPriorityFeePerGas** - 作為給礦工的小費，每單位 gas 的優先費用上限
- **maxFeePerGas** - 願意為交易支付的每單位 gas 費用上限 (包含 baseFeePerGas 和 maxPriorityFeePerGas)

我們可以查詢傳送至以太坊基金會公開地址的交易的特定資訊：

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

每筆交易都會改變以太坊虛擬機 ([EVM](/developers/docs/evm/)) 的狀態 ([來源](/developers/docs/transactions/))。 交易會廣播至網路進行驗證，並包含在區塊中。 每筆交易都與一個區塊編號相關聯。 若要查看資料，我們可以查詢特定的區塊編號：12396854 (截至本文撰寫時 [2021/5/11]，此為以太坊基金會交易中最新的區塊)。

此外，當我們查詢接下來的兩個區塊時，我們可以看到每個區塊都包含前一個區塊的哈希 (即父哈希)，這說明了區塊鏈是如何形成的。

每個區塊都包含對其父區塊的引用。 如下方 `hash` 和 `parent_hash` 欄位之間所示 ([來源](/developers/docs/blocks/))：

![parent_hash](./parent_hash.png)

這是 Dune Analytics 上的[查詢](https://dune.com/queries/44856/88292)：

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

我們可以透過查詢時間、區塊編號、難度、哈希、父哈希和 nonce 來檢視一個區塊。

此查詢唯一未涵蓋的是_交易列表_和_狀態根_，這需要下方另一個獨立的查詢。 完整或封存節點將儲存所有交易和狀態轉換，讓用戶端隨時可以查詢鏈的狀態。 因為這需要大量的儲存空間，我們可以將鏈資料與狀態資料分開：

- 鏈資料 (區塊、交易列表)
- 狀態資料 (每筆交易狀態轉換的結果)

狀態根屬於後者，是_隱含_資料 (不儲存在鏈上)，而鏈資料是明確的，儲存在鏈本身上 ([來源](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored))。

在本教學課程中，我們將著重於可以透過 Dune Analytics 以 SQL 查詢的鏈上資料。

如上所述，每個區塊都包含一個交易列表，我們可以透過篩選特定區塊來查詢。 我們來試試最新的區塊，12396854：

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

以下是 Dune 上的 SQL 輸出：

![](./list_of_txn.png)

這個被新增到鏈上的單一區塊會改變以太坊虛擬機 ([EVM](/developers/docs/evm/)) 的狀態。 有時一次會驗證數十筆，甚至數百筆交易。 在這個特定案例中，共包含了 222 筆交易。

若要查看實際上有多少筆交易成功，我們可以新增另一個篩選器來計算成功的交易數量：

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

在區塊 12396854 中，總共 222 筆交易裡，有 204 筆成功驗證：

![](./successful_txn.png)

交易請求每秒發生數十次，但區塊大約每 15 秒才提交一次 ([來源](/developers/docs/blocks/))。

若要查看大約每 15 秒產生一個區塊，我們可以將一天的秒數 (86400) 除以 15，得到每日平均區塊數的估計值 (約 5760)。

以太坊每日產生的區塊圖表 (2016 年至今) 如下：

![](./daily_blocks.png)

在此期間，每日產生的區塊平均數約為 5,874：

![](./avg_daily_blocks.png)

查詢如下：

```sql
# 查詢以視覺化呈現 2016 年以來每日產生的區塊數量

SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1

# 每日產生的平均區塊數量

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

自 2016 年以來，每日產生的平均區塊數為 5,874，略高於該數字。 或者，將 86400 秒除以 5874 個平均區塊，得出 14.7 秒，即大約每 15 秒一個區塊。

### Gas {#gas}

區塊的大小是有限制的。 區塊大小上限是動態的，會根據網路需求在 12,500,000 到 25,000,000 單位之間變化。 需要限制，以防止任意大的區塊對完整節點在磁碟空間和速度要求方面造成壓力 ([來源](/developers/docs/blocks/))。

要將區塊 gas 上限概念化，其中一種方式是將其視為可用於批次處理交易的區塊空間的**供給**。 從 2016 年至今的區塊 gas 上限可以查詢並視覺化呈現：

![](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

然後是每日實際用於支付以太坊鏈上運算費用的 gas (例如傳送交易、呼叫智能合約、鑄造 NFT)。 這是對可用以太坊區塊空間的**需求**：

![](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

我們也可以將這兩個圖表並列，看看**需求與供給**如何對應：

![gas_demand_supply](./gas_demand_supply.png)

因此，在供給固定的情況下，我們可以將 gas 價格理解為以太坊區塊空間需求的函數。

最後，我們可能想查詢以太坊鏈的每日平均 gas 價格，然而，這樣做會導致查詢時間特別長，所以我們將篩選查詢，只看以太坊基金會每筆交易所支付的平均 gas 金額。

![](./ef_daily_gas.png)

我們可以看見多年來，所有傳送至以太坊基金會地址的交易所支付的 gas 價格。 查詢如下：

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

透過本教學課程，我們透過查詢和體驗鏈上資料，了解了基礎的以太坊概念，以及以太坊區塊鏈的運作方式。

包含本教學課程中所有程式碼的儀表板可以在[此處](https://dune.com/paulapivat/Learn-Ethereum)找到。

若要利用資料進一步探索 Web3，歡迎[在 Twitter 上找到我](https://twitter.com/paulapivat)。
