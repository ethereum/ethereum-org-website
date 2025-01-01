---
title: 區塊鏈資料儲存策略
description: 有幾種方法透過區塊鏈儲存資料 此文章將會比較幾種儲存策略，成本、權衡以及安全適用的條件。
lang: zh-tw
---

儲存資料的方法有幾種，直接上鏈儲存或是以某種被鏈保護的方式儲存：

- EIP-4844 blobs
- Calldata
- 鏈下與L1的機制
- 合約“程式碼”
- 事件
- EVM 儲存

依據幾項指標來選擇使用什麼方法

- 資訊的來源 Calldata裡的資訊是無法直接從區塊鏈上傳來
- 資訊的目的地 Calldata 只存在交易初建立之始 Events 在鏈上無法取得
- 大家願意忍受多少麻煩呢？ 全方位的節點可以比網頁程式跑的light client做更多的處理。
- 讓所有的節點可以很簡單的獲得資訊是必要的嗎？
- 安全必要條件

## 安全必要條件{#security-requirements}

總的來說，資訊安全由三個屬性構成：

- _保密性_，沒有被授權的單位是無法讀取資訊的。 這在很多案例中是很重要的，但不是在這。 _在區塊鏈上沒有秘密_。 區塊鏈行得通是因為任何人都可以驗證交易狀態，所以無法直接用來儲存秘密， 有幾個方法可以在鏈上儲存機敏資料，但是都必須依賴一些鏈下的元件，例如：至少一把密鑰，

- _完整性_，資訊正確，無法被未授權的單位或未授權的方法改變，例如，轉帳 [ERC-20 tokens](https://eips.ethereum.org/EIPS/eip-20#events) 不發`Transfer` event。 在區塊鏈上，為了確保完整性，每個節點都會驗證每個狀態的改變。

- _可用性_，任何被授權的單位皆可取得資訊， 在鏈上，通常為了達到在所有 [full node](https://ethereum.org/developers/docs/nodes-and-clients#full-node)上可以獲得資訊可以獲得資訊，

不同的解決方案都有優秀的完整性，因為hashes 都會上到L1上。 而且，他們有各自的可用性保證。

## 先決條件 {#prerequisites}

你應該對 [區塊鏈基礎](/developers/docs/intro-to-ethereum/) 有良好的理解， 同時也建議讀者熟悉[blocks](/developers/docs/blocks/), [transactions](/developers/docs/transactions/) ，和相關的主題。

## EIP-4844 blobs {#eip-4844-blobs}

從 [坎昆升級](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/beacon-chain.md) 開始，以太坊納入了 [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844)，讓以太坊上的資料 blobs可以存在一小段時間(大約 [18 天](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration))。 儘管是相同的機制，Blobs根據[execution gas](/developers/docs/gas) 有不同的計價， 這是一個發布暫時性資料的便宜方法。

主要的EIP-4844 blobs應用場景是 rollups 發布發交易。 [Optimistic rollups](/developers/docs/scaling/optimistic-rollups) 需要發布交易到鏈上， 這些交易在[挑戰期間](https://docs.optimism.io/connect/resources/glossary#challenge-period) 都必須是讓所有人可得，讓[validators](https://docs.optimism.io/connect/resources/glossary#validator) 把 [sequencer](https://docs.optimism.io/connect/resources/glossary#sequencer) 在rollup時發布的state root錯誤有機會做修正。

一旦挑戰期過了而且state root 也已經進入最終狀態，最後獲得這些交易的方法是複製鏈的現有狀態。 只需要少數的處理，從鏈的節點上也可以取得這個狀態， 交易資訊仍應該存在其他地方，像是 [區塊瀏覽器](/developers/docs/data-and-analytics/block-explorers)，但不需要對以太坊的抗審查付費。

[Zero-knowledge rollups](/developers/docs/scaling/zk-rollups/#data-availability) 也會發布交易資訊讓其他的節點去複製現有的狀態以及有效性證明，但這也只是在短時間內可以取得。

EIP-4844 寫入的費用大約每byte 1wei (10<sup>-18</sup> ETH)，相較於 [每筆交易21000 execution gas基本交易費用，包含blobs 資料寫入、花費](https://eth.blockscout.com/tx/0xf6cfaf0431c73dd1d96369a5e6707d64f463ccf477a4131265397f1d81466929?tab=index) 微乎其微可忽略不計。 可以從此查看目前EIP-4844 的價格[blobscan.com](https://blobscan.com/blocks)。

Rollups常見的blobs 發布地址

| Rollup                               | Mailbox address                                                                                                         |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://blobscan.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://blobscan.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://blobscan.com/address/0xFF00000000000000000000000000000000008453) |

## Calldata {#calldata}

Calldata 是交易中一起發送的bytes中的一部分， 將區塊鏈上的永久紀錄儲存於包含這筆交易的區塊之中。

這是在區塊鏈上儲存永久資料最經濟的方法， 每byte的不是4 execution gas(假設是0 byte) 就是 16 gas(其他數字). 一般來說資料是被壓縮過的，每個byte的價格會差不多，每byte平均花費15.95gas。

當寫入價格在12 gwei/gas與2300 $/ETH時，每kilobyte 約45美分， 因為這是在EIP-4844出現前最便宜的rollups 儲存交易資訊的方式，這些資訊用來提供[錯誤挑戰](https://docs.optimism.io/stack/protocol/overview#fault-proofs)，但是不能直接從鏈上取得。

以下是常見的rollups 發布交易時使用的地址：

| Rollup                               | Mailbox address                                                                                                               |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://eth.blockscout.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000008453) |

## 鏈下與L1 的機制 {#offchain-with-l1-mechs}

根據你對安全的取捨，可以將資料放在別處並運用機制確保資料可取得， 需要具備以下兩個條件才可以達成：

1. 發布[hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function) 到鏈上，叫做_input commitment_， 這是單個 32-byte 的字，不是很貴， 只要輸入的承諾是確實存在的，完整性就會被確保，因為不可能找到其他資料會有相同的hash， 因此，若提供錯誤的資料，會馬上被發現。

2. 有個確保資料可取得性的機制， 舉例來說，在 [Redstone](https://redstone.xyz/docs/what-is-redstone)任何節點都可以提交資料可取得的挑戰， 若sequencer沒有在鏈上即時回應，輸入的commitment就會被丟棄，因此會認爲這些資訊是從來沒有發布過的。

在Optimistic rollup上這樣的機制是可以被接受的，因為我們已經仰賴最少有一個對state root誠實的驗證者， 這個誠實的驗證者必須確認有資料去處理區塊，並且當在鏈下無法得資料時發起資料可取得的挑戰， 這種Optimistic rollup稱為[plasma](/developers/docs/scaling/plasma/)。

## 合約程式碼 {#contract-code}

資訊只需要寫入一次，不會被覆寫，並可從鏈上取得且要作為合約程式碼儲存， 意味著我們用資料創造了“智慧合約”，並用 [`EXTCODECOPY`](https://www.evm.codes/#3c?fork=shanghai) 讀取資訊， 優點是複製程式碼相對便宜。

除了memory擴展的花費， `EXTCODECOPY`第一次讀取合約需要花2600 gas（當他還是”cold"的狀態），之後複製相同的合約需要100gas再加上每32 byte 3 gas， 相較於calldata，每byte花費 15.95，從一開始就節省了約200 bytes。 基於[擴展記憶體花費的公式](https://www.evm.codes/about#memoryexpansion)，如果你不需要超過4MB 的記憶體，記憶體擴展的花費會少於用增加calldata的方式。

當然，這只是 _read_資料的花費， 建立合約需花費約32,000 gas + 200 gas/byte， 這是當不同的交易要多次讀取相同資料唯一經濟的方法。

合約程式碼可以是無意義的，只要不是`0xEF`開頭， 嚴格限制 `0xEF`開頭的合約代表 [ethereum object format](https://notes.ethereum.org/@ipsilon/evm-object-format-overview)。

## Events {#events}

[Events](https://docs.alchemy.com/docs/solidity-events)是被合約觸發的，可以被鏈下軟體讀取，
好處是鏈下的程式碼可以監聽事件， 花費是用 [gas](https://www.evm.codes/#a0?fork=cancun) 計，375 加上每byte 8 gas。 當 12 gwei/gas、 ETH價格為2300美元時，每kilobyte 約1美分＋22美分

## Storage {#storage}

智慧合約有進入 [persistent storage](https://docs.alchemy.com/docs/smart-contract-storage-layout#what-is-storage-memory)的權利， 但是很貴， 寫入一個32byte原本空著的storage slot 會 [花費 22,100 gas](https://www.evm.codes/#55?fork=cancun)， 當 12 gwei/gas、 ETH價格為2300美金時，每個操作大約是61美分或每kilobyte$19.5美元。

這是以太坊最貴的儲存方式。

## 總結 {#summary}

下表列出了各種方式的優點和缺點：

| 儲存方式           | 資料來源  | 可取得性保證                                                                                                                         | 鏈上可取得性            | 其他限制                   |
| -------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ---------------------- |
| EIP-4844 blobs | 鏈下    | 以太坊保證[~約18 天](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration) | 只可取得Hash          |                        |
| Calldata       | 鏈下    | 以太坊永久保證（部分區塊鏈）                                                                                                                 | 只有在當寫入合約當下的交易中可取得 |                        |
| 鏈下與L1的機制       | 鏈下    | 在挑戰期內"One honest verifier" 保證                                                                                                  | 只有Hash            | 只有在挑戰期間，由挑戰機制保護        |
| 合約程式碼          | 鏈上或鏈下 | 以太坊永久保證（部分區塊鏈）                                                                                                                 | 是                 | 寫入“隨機”的地址，但不能是`0xEF`開頭 |
| 事件             | 鏈上    | 以太坊永久保證（部分區塊鏈）                                                                                                                 | 否                 |                        |
| 儲存             | 鏈上    | 以太坊永久保證 (部分區塊鏈和目前的狀態直到被覆寫)                                                                                  | 是                 |                        |
