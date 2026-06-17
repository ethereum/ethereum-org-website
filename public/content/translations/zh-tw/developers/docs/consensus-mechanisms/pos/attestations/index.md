---
title: "證明"
description: "以太坊權益證明中的證明說明。"
lang: zh-tw
---

驗證者需要在每個紀元建立、簽署並廣播證明。本頁面概述了這些證明的結構，以及它們在共識客戶端之間如何被處理和傳遞。

## 什麼是證明？ {#what-is-an-attestation}

驗證者每[紀元](/glossary/#epoch)（6.4 分鐘）會向網路提出一個證明。該證明針對紀元中的特定時槽。證明的目的是投票支持驗證者對鏈的觀點，特別是最近的已證明區塊和當前紀元的第一個區塊（稱為 `source` 和 `target` 檢查點）。這些資訊結合了所有參與驗證者的觀點，使網路能夠對區塊鏈的狀態達成共識。

證明包含以下元件：

- `aggregation_bits`：驗證者的位元列表，其位置對應於他們在委員會中的驗證者索引；該值 (0/1) 表示驗證者是否簽署了 `data`（即他們是否活躍並同意區塊提案者）
- `data`：與證明相關的詳細資訊，定義如下
- `signature`：聚合個別驗證者簽章的 BLS 簽章

進行證明的驗證者的首要任務是建立 `data`。`data` 包含以下資訊：

- `slot`：證明所指的時槽編號
- `index`：識別驗證者在給定時槽中屬於哪個委員會的編號
- `beacon_block_root`：驗證者在鏈頭看到的區塊根雜湊（套用分叉選擇演算法的結果）
- `source`：最終性投票的一部分，表示驗證者所見的最近已證明區塊
- `target`：最終性投票的一部分，表示驗證者所見的當前紀元的第一個區塊

建立 `data` 後，驗證者可以將 `aggregation_bits` 中對應於其自身驗證者索引的位元從 0 翻轉為 1，以顯示他們已參與。

最後，驗證者簽署證明並將其廣播到網路。

### 聚合證明 {#aggregated-attestation}

為每個驗證者在網路中傳遞這些資料會產生大量的額外負擔。因此，個別驗證者的證明在更廣泛地廣播之前，會先在子網路內進行聚合。這包括將簽章聚合在一起，以便廣播的證明包含共識 `data` 以及由所有同意該 `data` 的驗證者簽章組合而成的單一簽章。這可以使用 `aggregation_bits` 來檢查，因為它提供了每個驗證者在其委員會中的索引（其 ID 提供在 `data` 中），可用於查詢個別簽章。

在每個紀元中，每個子網路會選出 16 名驗證者作為 `aggregators`。聚合者會收集他們在八卦網路 (gossip network) 上聽到的所有與自己具有相同 `data` 的證明。每個相符證明的發送者都會記錄在 `aggregation_bits` 中。然後，聚合者將聚合證明廣播到更廣泛的網路。

當驗證者被選為區塊提案者時，他們會將來自子網路的聚合證明打包到新區塊的最新時槽中。

### 證明包含生命週期 {#attestation-inclusion-lifecycle}

1. 產生
2. 傳播
3. 聚合
4. 傳播
5. 包含

證明生命週期概述於下圖：

![attestation lifecycle](./attestation_schematic.png)

## 獎勵 {#rewards}

驗證者提交證明會獲得獎勵。證明獎勵取決於參與標記（來源、目標和頭部）、基本獎勵和參與率。

每個參與標記可以是 true 或 false，取決於提交的證明及其包含延遲。

最好的情況是三個標記都為 true，在這種情況下，驗證者將獲得（每個正確標記）：

`reward += base reward * flag weight * flag attesting rate / 64`

標記證明率的測量方式是，將給定標記的所有進行證明的驗證者的有效餘額總和，與總活躍有效餘額進行比較。

### 基本獎勵 {#base-reward}

基本獎勵是根據進行證明的驗證者數量及其質押以太幣的有效餘額來計算：

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### 包含延遲 {#inclusion-delay}

當驗證者對鏈頭 (`block n`) 進行投票時，`block n+1` 尚未被提出。因此，證明自然會被包含在**下一個區塊**中，所以所有投票支持 `block n` 為鏈頭的證明都被包含在 `block n+1` 中，且**包含延遲**為 1。如果包含延遲加倍到兩個時槽，證明獎勵就會減半，因為在計算證明獎勵時，基本獎勵會乘以包含延遲的倒數。

### 證明情境 {#attestation-scenarios}

#### 遺失投票驗證者 {#missing-voting-validator}

驗證者最多有 1 個紀元的時間來提交他們的證明。如果在紀元 0 中遺失了證明，他們可以在紀元 1 中提交，並帶有包含延遲。

#### 遺失聚合者 {#missing-aggregator}

每個紀元總共有 16 個聚合者。此外，隨機驗證者會訂閱**兩個子網路達 256 個紀元**，並作為聚合者遺失時的備援。

#### 遺失區塊提案者 {#missing-block-proposer}

請注意，在某些情況下，幸運的聚合者也可能成為區塊提案者。如果因為區塊提案者遺失而未包含證明，下一個區塊提案者將會接收該聚合證明並將其包含在下一個區塊中。然而，**包含延遲**將會增加一。

## 進一步閱讀 {#further-reading}

- [Vitalik 註解的共識規範中的證明](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [eth2book.info 中的證明](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)

_知道有什麼社群資源對您有幫助嗎？編輯此頁面並加入它！_