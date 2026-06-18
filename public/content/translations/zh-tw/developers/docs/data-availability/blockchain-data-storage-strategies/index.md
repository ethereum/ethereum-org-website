---
title: 區塊鏈資料儲存策略
description: 有幾種使用區塊鏈儲存資料的方法。本文將比較不同的策略、其成本與權衡，以及安全使用這些策略的要求。
lang: zh-tw
---

有多種方法可以直接將資訊儲存在區塊鏈上，或以受區塊鏈保護的方式儲存：

- EIP-4844 blob
- 呼叫資料 (calldata)
- 具有第一層 (L1) 機制的鏈下儲存
- 合約「程式碼」
- 事件
- EVM 儲存

選擇使用哪種方法取決於幾個標準：

- 資訊來源。呼叫資料中的資訊不能直接來自區塊鏈本身。
- 資訊目的地。呼叫資料僅在包含它的交易中可用。事件完全無法在鏈上存取。
- 可以接受多少麻煩？執行全節點的電腦可以比在瀏覽器中執行的應用程式中的輕客戶端執行更多處理。
- 是否有必要讓每個節點都能輕鬆存取該資訊？
- 安全性要求。

## 安全性要求 {#security-requirements}

一般來說，資訊安全包含三個屬性：

- _機密性_，未經授權的實體不允許讀取資訊。這在許多情況下很重要，但在這裡不然。_區塊鏈上沒有秘密_。區塊鏈之所以有效，是因為任何人都可以驗證狀態轉換，因此不可能使用它們直接儲存秘密。有一些方法可以將機密資訊儲存在區塊鏈上，但它們都依賴某些鏈下元件來儲存至少一把金鑰。

- _完整性_，資訊是正確的，不能被未經授權的實體或以未經授權的方式更改（例如，在沒有 `Transfer` 事件的情況下轉移 [ERC-20 代幣](https://eips.ethereum.org/EIPS/eip-20#events)）。在區塊鏈上，每個節點都會驗證每個狀態變更，從而確保完整性。

- _可用性_，任何授權實體都可以取得該資訊。在區塊鏈上，這通常是透過讓每個[全節點](https://ethereum.org/developers/docs/nodes-and-clients/#full-node)都能取得該資訊來實現的。

這裡的不同解決方案都具有極佳的完整性，因為雜湊被發佈在第一層 (L1) 上。然而，它們確實具有不同的可用性保證。

## 先決條件 {#prerequisites}

您應該對[區塊鏈基礎知識](/developers/docs/intro-to-ethereum/)有充分的了解。本頁面也假設讀者熟悉[區塊](/developers/docs/blocks/)、[交易](/developers/docs/transactions/)以及其他相關主題。

## EIP-4844 blob {#eip-4844-blobs}

從 [Dencun 硬分叉](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/beacon-chain.md)開始，以太坊區塊鏈包含了 [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844)，它為以太坊增加了具有有限生命週期（最初約為 [18 天](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/p2p-interface.md#configuration)）的資料 blob。這些 blob 的定價與[執行燃料](/developers/docs/gas)分開，儘管使用了類似的機制。它們是發佈暫時性資料的一種廉價方式。

EIP-4844 blob 的主要使用案例是供匯總發佈其交易。[樂觀 Rollup](/developers/docs/scaling/optimistic-rollups) 需要在其區塊鏈上發佈交易。這些交易必須在[挑戰期](https://docs.optimism.io/connect/resources/glossary#challenge-period)間對任何人可用，以便在匯總的[定序器](https://docs.optimism.io/connect/resources/glossary#sequencer)發佈錯誤的狀態根時，讓[驗證者](https://docs.optimism.io/connect/resources/glossary#validator)能夠修正錯誤。

然而，一旦挑戰期過去且狀態根已定案，了解這些交易的剩餘目的就是複製鏈的當前狀態。這個狀態也可以從鏈節點取得，且所需的處理要少得多。因此，交易資訊仍應保存在少數幾個地方，例如[區塊瀏覽器](/developers/docs/data-and-analytics/block-explorers)，但沒有必要為以太坊提供的抗審查級別付費。

[零知識匯總 (Zero-knowledge rollup)](/developers/docs/scaling/zk-rollups/#data-availability) 也會發佈其交易資料，以使其他節點能夠複製現有狀態並驗證有效性證明，但這同樣是一個短期需求。

在撰寫本文時，在 EIP-4844 上發佈的成本為每位元組 1 Wei (10<sup>-18</sup> ETH)，與[任何交易（包括發佈 blob 的交易）花費的 21,000 執行燃料](https://eth.blockscout.com/tx/0xf6cfaf0431c73dd1d96369a5e6707d64f463ccf477a4131265397f1d81466929?tab=index)相比，這微不足道。您可以在 [blobscan.com](https://blobscan.com/blocks) 上查看目前的 EIP-4844 價格。

以下是查看一些著名匯總發佈的 blob 的地址。

| 匯總                               | 信箱地址                                                                                                         |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://blobscan.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://blobscan.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://blobscan.com/address/0xFF00000000000000000000000000000000008453) |

## 呼叫資料 {#calldata}

呼叫資料是指作為交易一部分發送的位元組。它作為區塊鏈永久記錄的一部分，儲存在包含該交易的區塊中。

這是將資料永久放入區塊鏈中最便宜的方法。每位元組的成本為 4 執行燃料（如果位元組為零）或 16 燃料（任何其他值）。如果資料被壓縮（這是標準做法），那麼每個位元組值出現的可能性相等，因此平均成本約為每位元組 15.95 燃料。

在撰寫本文時，價格為 12 Gwei/燃料和 2300 美元/ETH，這意味著成本約為每千位元組 45 美分。因為這是在 EIP-4844 之前最便宜的方法，所以這是匯總用來儲存交易資訊的方法，這些資訊需要可用於[錯誤挑戰](https://docs.optimism.io/stack/protocol/overview#fault-proofs)，但不需要直接在鏈上存取。

以下是查看一些著名匯總發佈的交易的地址。

| 匯總                               | 信箱地址                                                                                                               |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://eth.blockscout.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000008453) |

## 具有第一層 (L1) 機制的鏈下儲存 {#offchain-with-l1-mechs}

根據您的安全性權衡，將資訊放在其他地方並使用確保資料在需要時可用的機制可能是可以接受的。要使其發揮作用，有兩個要求：

1. 在區塊鏈上發佈資料的[雜湊](https://en.wikipedia.org/wiki/Cryptographic_hash_function)，稱為_輸入承諾_。這可以是一個 32 位元組的字組，因此並不昂貴。只要輸入承諾可用，就能確保完整性，因為要找到任何其他會雜湊成相同值的資料是不可行的。因此，如果提供了不正確的資料，就可以被偵測出來。

2. 擁有確保可用性的機制。例如，在 [Redstone](https://redstone.xyz/docs/what-is-redstone) 中，任何節點都可以提交可用性挑戰。如果定序器未能在截止日期前在鏈上回應，則輸入承諾將被丟棄，因此該資訊被視為從未發佈過。

這對於樂觀 Rollup 來說是可以接受的，因為我們已經依賴至少有一個誠實的驗證者來驗證狀態根。這樣一個誠實的驗證者也會確保它擁有處理區塊的資料，並在鏈下無法取得資訊時發出可用性挑戰。這種類型的樂觀 Rollup 稱為[電漿 (plasma)](/developers/docs/scaling/plasma/)。

## 合約程式碼 {#contract-code}

只需要寫入一次、永遠不會被覆寫且需要在鏈上可用的資訊，可以儲存為合約程式碼。這意味著我們使用該資料建立一個「智能合約」，然後使用 [`EXTCODECOPY`](https://www.evm.codes/#3c?fork=shanghai) 來讀取資訊。優點是複製程式碼相對便宜。

除了記憶體擴充的成本外，`EXTCODECOPY` 在首次存取合約（當它是「冷」存取時）花費 2600 燃料，後續從同一合約複製則花費 100 燃料，外加每 32 位元組字組 3 燃料。與每位元組花費 15.95 燃料的呼叫資料相比，從大約 200 位元組開始，這會更便宜。根據[記憶體擴充成本公式](https://www.evm.codes/about#memoryexpansion)，只要您不需要超過 4MB 的記憶體，記憶體擴充成本就小於新增呼叫資料的成本。

當然，這只是_讀取_資料的成本。建立合約大約花費 32,000 燃料 + 200 燃料/位元組。只有當相同的資訊需要在不同的交易中被讀取多次時，這種方法才符合經濟效益。

合約程式碼可以是無意義的，只要它不以 `0xEF` 開頭即可。以 `0xEF` 開頭的合約會被解釋為[以太坊物件格式 (Ethereum Object Format)](https://notes.ethereum.org/@ipsilon/evm-object-format-overview)，其要求要嚴格得多。

## 事件 {#events}

[事件](https://docs.alchemy.com/docs/solidity-events)由智能合約發出，並由鏈下軟體讀取。
它們的優點是鏈下程式碼可以監聽事件。成本是[燃料](https://www.evm.codes/#a0?fork=cancun)，375 加上每位元組資料 8 燃料。在 12 Gwei/燃料和 2300 美元/ETH 的情況下，這相當於 1 美分加上每千位元組 22 美分。

## 儲存 {#storage}

智能合約可以存取[持久性儲存](https://docs.alchemy.com/docs/smart-contract-storage-layout#what-is-storage-memory)。然而，它非常昂貴。將一個 32 位元組的字組寫入先前為空的儲存時槽可能[花費 22,100 燃料](https://www.evm.codes/#55?fork=cancun)。在 12 Gwei/燃料和 2300 美元/ETH 的情況下，每次寫入操作大約是 61 美分，或每千位元組 19.5 美元。

這是以太坊中最昂貴的儲存形式。

## 總結 {#summary}

下表總結了不同的選項及其優缺點。

| 儲存類型                | 資料來源      | 可用性保證                                                                                                             | 鏈上可用性                                             | 額外限制                                                  |
| --------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------- |
| EIP-4844 blob              | 鏈下            | 以太坊保證約 [18 天](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/p2p-interface.md#configuration) | 僅雜湊可用                                           |                                                                         |
| 呼叫資料                    | 鏈下            | 以太坊永久保證（區塊鏈的一部分）                                                                                | 僅在寫入合約時可用，且僅在該交易中可用 |
| 具有第一層 (L1) 機制的鏈下儲存 | 鏈下            | 挑戰期間的「一個誠實驗證者」保證                                                                        | 僅雜湊                                                        | 由挑戰機制保證，僅在挑戰期間 |
| 合約程式碼               | 鏈上或鏈下 | 以太坊永久保證（區塊鏈的一部分）                                                                                | 是                                                              | 寫入「隨機」地址，不能以 `0xEF` 開頭                 |
| 事件                      | 鏈上             | 以太坊永久保證（區塊鏈的一部分）                                                                                | 否                                                               |
| 儲存                     | 鏈上             | 以太坊永久保證（區塊鏈和當前狀態的一部分，直到被覆寫）                                        | 是                                                              |