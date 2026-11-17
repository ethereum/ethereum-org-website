---
title: "證明"
description: "關於權益證明以太坊上證明的描述。"
lang: zh-tw
---

驗證者需要在每個紀元期間建立、簽署並廣播證明。本頁面概述了這些證明的結構，以及它們如何在共識客戶端之間進行處理和通訊。

## 什麼是證明？ {#what-is-an-attestation}

每個[紀元](/glossary/#epoch)（6.4 分鐘），驗證者會向網路廣播一個證明。該證明針對紀元中的特定時槽。證明的目的是投票支持驗證者對鏈的視角，特別是鏈的頂端、最近的已證明檢查點，以及當前紀元開始時的檢查點（稱為 `source` 和 `target` 檢查點）。這些資訊結合了所有參與的驗證者，使網路能夠對區塊鏈的狀態達成共識。

自從[佩克特拉升級](/roadmap/pectra/)（[EIP-7549](https://eips.ethereum.org/EIPS/eip-7549)）以來，單一驗證者的證明與聚合證明的格式有所不同。單一驗證者的證明包含：

- `committee_index`：驗證者在給定時槽所屬的委員會
- `attester_index`：驗證者的索引
- `data`：與證明相關的詳細資訊，定義如下
- `signature`：驗證者對 `data` 的 BLS 簽章

進行證明的驗證者的首要任務是建立 `data`。`data` 包含以下資訊：

- `slot`：證明所指的時槽編號
- `index`：自佩克特拉以來設為 `0`。委員會在 `data` 之外進行識別（透過 `committee_index`，或在聚合證明中透過 `committee_bits`），以便來自不同委員會的投票具有相同的 `data` 並能聚合在一起。在佩克特拉之前，此欄位用於識別委員會
- `beacon_block_root`：驗證者在鏈的頂端看到的區塊根雜湊（應用分叉選擇演算法的結果）
- `source`：最終性投票的一部分，指示驗證者所看到的最近已證明檢查點
- `target`：最終性投票的一部分，指示驗證者所看到的當前紀元開始時的檢查點（其第一個時槽的區塊，如果該時槽為空，則為其之前的最新區塊）

一旦建立 `data`，驗證者就會對其進行簽署，並將證明廣播到其委員會的[子網路](#aggregated-attestation)。

### 聚合證明 {#aggregated-attestation}

在網路中為每個驗證者傳遞這些資料會產生大量的額外負擔。因此，個別驗證者的證明在被更廣泛地廣播之前，會先在子網路內進行聚合。這包括將簽章聚合在一起，使得廣播的證明包含共識 `data` 以及由所有同意該 `data` 的驗證者簽章組合而成的單一簽章。聚合證明包含：

- `aggregation_bits`：一個位元列表，每個包含的委員會成員佔一個位元，其位置對應於驗證者在其委員會中的位置；值 (0/1) 指示是否包含了該驗證者的簽章
- `data`：每個包含的驗證者所簽署的證明資料
- `signature`：聚合了包含的驗證者簽章的 BLS 簽章
- `committee_bits`：`aggregation_bits` 涵蓋了哪些委員會的成員

任何人都可以根據位元被設定的驗證者的組合公鑰來檢查聚合簽章。

在每個時槽中，每個委員會大約有 16 名成員被選為其 `aggregators`（`TARGET_AGGREGATORS_PER_COMMITTEE`）。驗證者透過自己對時槽編號的簽章來得知自己是否被選中。聚合者收集他們在委員會子網路上聽到的所有與自己具有相同 `data` 的證明，並將它們組合起來，在 `aggregation_bits` 中記錄每個證明的發送者。然後，聚合者將聚合證明廣播到更廣泛的網路。

當驗證者被選為區塊提案者時，他們會將最近時槽的聚合證明包含在新區塊中。自佩克特拉以來，提案者可以將來自不同委員會且共享相同 `data` 的聚合證明合併為一個證明，一個區塊最多可以容納 8 個這樣的證明。

### 證明包含生命週期 {#attestation-inclusion-lifecycle}

1. 產生
2. 傳播
3. 聚合
4. 傳播
5. 包含

證明生命週期如下圖所示：

<AttestationsDiagram />

## 獎勵 {#rewards}

驗證者提交證明會獲得獎勵。證明獎勵取決於參與標記（來源、目標和頂端）、基礎獎勵以及參與率。

每個參與標記可以是 true 或 false，取決於提交的證明及其包含延遲。

最好的情況是所有三個標記都為 true，在這種情況下，驗證者將獲得（每個正確標記）：

`reward += base reward * flag weight * flag attesting rate / 64`

標記證明率的測量方式是，將給定標記的所有進行證明的驗證者的有效餘額總和，與總活躍有效餘額進行比較。

### 基礎獎勵 {#base-reward}

基礎獎勵是根據進行證明的驗證者數量及其質押以太幣的有效餘額來計算的：

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### 包含延遲 {#inclusion-delay}

當驗證者對鏈的頂端（`block n`）進行投票時，`block n+1` 尚未被提案。因此，證明自然會被包含在**下一個區塊**中，所以所有投票支持 `block n` 為鏈頂端的證明都會被包含在 `block n+1` 中，且**包含延遲**為 1。包含延遲決定了證明能獲得哪些參與標記：

- `head`：僅當包含延遲剛好為 1 個時槽時
- `source`：如果包含延遲最多為 5 個時槽（一個紀元中 32 個時槽的整數平方根）
- `target`：無論證明何時被包含（自 Deneb 升級以來，[EIP-7045](https://eips.ethereum.org/EIPS/eip-7045)）

因此，延遲兩個時槽包含的證明會失去其頂端獎勵，但仍能獲得來源和目標獎勵。

### 證明情境 {#attestation-scenarios}

#### 遺失投票驗證者 {#missing-voting-validator}

證明可以包含在從其產生後的時槽到下一個紀元結束之間的任何區塊中。如果來自紀元 0 的證明未包含在紀元 0 期間的區塊中，它仍然可以包含在紀元 1 中，只是包含延遲會更長。

#### 遺失聚合者 {#missing-aggregator}

每個委員會的目標是在每個時槽中大約有 16 個聚合者，因此遺失一個聚合者很少會阻止委員會的證明被聚合。另外，每個信標節點每次都會根據其節點 ID 選擇並持續訂閱**兩個子網路達 256 個紀元**，這使得每個子網路都能保持良好的連線。

#### 遺失區塊提案者 {#missing-block-proposer}

請注意，在某些情況下，幸運的聚合者也可能成為區塊提案者。如果因為區塊提案者遺失而未包含證明，下一個區塊提案者將會接收該聚合證明並將其包含在下一個區塊中。然而，**包含延遲**將會增加 1。

## 延伸閱讀 {#further-reading}

- [Vitalik 註解的共識規範中的證明](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [eth2book.info 中的證明](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)
- [Electra 共識規範中的證明](https://github.com/ethereum/consensus-specs/blob/master/specs/electra/beacon-chain.md#attestation)

_知道有什麼社群資源對您有幫助嗎？編輯此頁面並加入它！_
