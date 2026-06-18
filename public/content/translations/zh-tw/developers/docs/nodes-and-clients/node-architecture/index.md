---
title: 節點架構
description: 介紹以太坊節點的組織方式。
lang: zh-tw
---

一個以太坊節點由兩個客戶端組成：一個[執行客戶端](/developers/docs/nodes-and-clients/#execution-clients)和一個[共識客戶端](/developers/docs/nodes-and-clients/#consensus-clients)。為了讓節點能夠提案新區塊，它還必須執行一個[驗證者客戶端](#validators)。

當以太坊使用[工作量證明 (PoW)](/developers/docs/consensus-mechanisms/pow/)時，一個執行客戶端就足以執行一個完整的以太坊節點。然而，自從實施[權益證明 (PoS)](/developers/docs/consensus-mechanisms/pos/)以來，執行客戶端必須與另一個稱為[共識客戶端](/developers/docs/nodes-and-clients/#consensus-clients)的軟體一起使用。

下圖顯示了兩個以太坊客戶端之間的關係。這兩個客戶端連接到各自的點對點 (P2P) 網路。需要獨立的 P2P 網路，因為執行客戶端透過其 P2P 網路廣播交易，使它們能夠管理本地的交易池，而共識客戶端則透過其 P2P 網路廣播區塊，從而實現共識和鏈的增長。

![Diagram of Ethereum node architecture showing execution and consensus layers](node-architecture-text-background.png)

_執行客戶端有多種選擇，包括 Erigon、Nethermind 和 Besu_。

為了讓這種雙客戶端架構運作，共識客戶端必須將打包的交易傳遞給執行客戶端。執行客戶端在本地執行這些交易，以驗證交易沒有違反任何以太坊規則，並且提議的以太坊狀態更新是正確的。當一個節點被選為區塊生產者時，其共識客戶端實例會向執行客戶端請求打包的交易，以將其包含在新區塊中並執行它們來更新全域狀態。共識客戶端透過使用 [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) 的本地 RPC 連線來驅動執行客戶端。

## 執行客戶端的作用是什麼？ {#execution-client}

執行客戶端負責交易驗證、處理和廣播，以及狀態管理和支援以太坊虛擬機 ([EVM](/developers/docs/evm/))。它**不**負責區塊建構、區塊廣播或處理共識邏輯。這些屬於共識客戶端的職責範圍。

執行客戶端建立執行負載——交易列表、更新的狀態樹以及其他與執行相關的資料。共識客戶端將執行負載包含在每個區塊中。執行客戶端還負責重新執行新區塊中的交易，以確保它們是有效的。執行交易是在執行客戶端的嵌入式電腦上完成的，該電腦被稱為[以太坊虛擬機 (EVM)](/developers/docs/evm)。

執行客戶端還透過 [RPC 方法](/developers/docs/apis/json-rpc)提供以太坊的使用者介面，讓使用者能夠查詢以太坊區塊鏈、提交交易和部署智慧合約。RPC 呼叫通常由 [Web3js](https://docs.web3js.org/)、[Web3py](https://web3py.readthedocs.io/en/v5/) 等函式庫或瀏覽器錢包等使用者介面來處理。

總結來說，執行客戶端是：

- 使用者通往以太坊的閘道
- 以太坊虛擬機、以太坊狀態和交易池的所在之處。

## 共識客戶端的作用是什麼？ {#consensus-client}

共識客戶端處理所有使節點能夠與以太坊網路保持同步的邏輯。這包括從對等節點接收區塊並執行分叉選擇演算法，以確保節點始終跟隨累積最多證明（由驗證者有效餘額加權）的鏈。與執行客戶端類似，共識客戶端擁有自己的 P2P 網路，透過該網路分享區塊和證明。

共識客戶端不參與證明或提案區塊——這是由驗證者完成的，驗證者是共識客戶端的可選附加元件。沒有驗證者的共識客戶端只會跟上鏈的頂端，讓節點保持同步。這使得使用者能夠使用他們的執行客戶端與以太坊進行交易，並確信他們處於正確的鏈上。

## 驗證者 {#validators}

質押並執行驗證者軟體使節點有資格被選中提案新區塊。節點營運者可以透過在存款合約中存入 32 ETH，將驗證者新增到他們的共識客戶端中。驗證者客戶端與共識客戶端捆綁在一起，可以隨時新增到節點中。驗證者處理證明和區塊提案。它還使節點能夠累積獎勵，或透過懲罰或罰沒損失 ETH。

[更多關於質押的資訊](/staking/)。

## 節點元件比較 {#node-comparison}

| 執行客戶端                                         | 共識客戶端                                                                                                                | 驗證者                       |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| 透過其 P2P 網路廣播交易                            | 透過其 P2P 網路廣播區塊和證明                                                                                             | 提案區塊                     |
| 執行/重新執行交易                                  | 執行分叉選擇演算法                                                                                                        | 累積獎勵/懲罰                |
| 驗證傳入的狀態變更                                 | 追蹤鏈的頂端                                                                                                              | 進行證明                     |
| 管理狀態和收據樹                                   | 管理信標狀態（包含共識和執行資訊）                                                                                        | 需要質押 32 ETH              |
| 建立執行負載                                       | 追蹤 RANDAO 中累積的隨機性（一種為驗證者選擇和其他共識操作提供可驗證隨機性的演算法）                                      | 可能被罰沒                   |
| 暴露 JSON-RPC API 以與以太坊互動                   | 追蹤合理化與最終確定性                                                                                                    |                              |

## 延伸閱讀 {#further-reading}

- [權益證明 (PoS)](/developers/docs/consensus-mechanisms/pos)
- [區塊提案](/developers/docs/consensus-mechanisms/pos/block-proposal)
- [驗證者獎勵與懲罰](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)