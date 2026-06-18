---
title: 區塊提案
description: 解釋在以太坊權益證明中如何提案區塊。
lang: zh-tw
---

區塊是區塊鏈的基本單位。區塊是離散的資訊單位，在節點之間傳遞、達成共識並新增至每個節點的資料庫中。本頁面將解釋區塊是如何產生的。

## 先決條件 {#prerequisites}

區塊提案是權益證明 (PoS) 協定的一部分。為了幫助理解本頁面，我們建議您閱讀有關[權益證明](/developers/docs/consensus-mechanisms/pos/)和[區塊架構](/developers/docs/blocks/)的內容。

## 誰產生區塊？ {#who-produces-blocks}

驗證者帳戶負責提案區塊。驗證者帳戶由節點營運者管理，他們執行驗證者軟體作為其執行客戶端與共識客戶端的一部分，並且已在存款合約中存入至少 32 個 ETH。然而，每個驗證者只是偶爾負責提案區塊。[以太坊](/)以時槽和紀元來衡量時間。每個時槽為 12 秒，32 個時槽（6.4 分鐘）組成一個紀元。每個時槽都是在以太坊上新增一個新區塊的機會。

### 隨機選擇 {#random-selection}

在每個時槽中，會偽隨機選擇單一驗證者來提案區塊。區塊鏈中沒有真正的隨機性，因為如果每個節點都產生真正的隨機數，它們就無法達成共識。相反地，目標是讓驗證者選擇過程變得不可預測。以太坊上的隨機性是透過稱為 RANDAO 的演算法實現的，該演算法將區塊提案者的雜湊與每個區塊更新的種子混合。此數值用於從總驗證者集合中選擇特定的驗證者。驗證者的選擇會提前兩個紀元固定下來，作為防止某些種子操縱的一種方式。

儘管驗證者在每個時槽都會加入 RANDAO，但全域 RANDAO 值每個紀元只更新一次。為了計算下一個區塊提案者的索引，RANDAO 值會與時槽編號混合，以在每個時槽給出一個唯一值。單一驗證者被選中的機率並非簡單的 `1/N`（其中 `N` = 活躍驗證者總數）。相反地，它是根據每個驗證者的有效 ETH 餘額進行加權。最大有效餘額為 32 個 ETH（這意味著 `balance < 32 ETH` 的權重低於 `balance == 32 ETH`，但 `balance > 32 ETH` 的權重不會高於 `balance == 32 ETH`）。

每個時槽只會選擇一名區塊提案者。在正常情況下，單一區塊生產者會在他們專屬的時槽中建立並發布單一區塊。為同一個時槽建立兩個區塊是會被罰沒的違規行為，通常被稱為「模稜兩可」。

## 區塊是如何建立的？ {#how-is-a-block-created}

區塊提案者預期會廣播一個已簽署的信標區塊，該區塊是根據其本地執行的分叉選擇演算法的視角，建立在鏈的最新頂端之上。分叉選擇演算法會套用前一個時槽留下的任何排隊證明，然後在其歷史記錄中找到累積證明權重最大的區塊。該區塊即為提案者所建立之新區塊的父區塊。

區塊提案者透過從其本地資料庫和對鏈的視角收集資料來建立區塊。區塊的內容如下方程式碼片段所示：

```rust
class BeaconBlockBody(Container):
    randao_reveal: BLSSignature
    eth1_data: Eth1Data
    graffiti: Bytes32
    proposer_slashings: List[ProposerSlashing, MAX_PROPOSER_SLASHINGS]
    attester_slashings: List[AttesterSlashing, MAX_ATTESTER_SLASHINGS]
    attestations: List[Attestation, MAX_ATTESTATIONS]
    deposits: List[Deposit, MAX_DEPOSITS]
    voluntary_exits: List[SignedVoluntaryExit, MAX_VOLUNTARY_EXITS]
    sync_aggregate: SyncAggregate
    execution_payload: ExecutionPayload
```

`randao_reveal` 欄位採用一個可驗證的隨機值，由區塊提案者透過簽署當前紀元編號來建立。`eth1_data` 是對區塊提案者對存款合約視角的投票，包含存款默克爾樹的根節點以及使新存款得以被驗證的存款總數。`graffiti` 是一個可選欄位，可用於在區塊中新增訊息。`proposer_slashings` 和 `attester_slashings` 欄位包含根據提案者對鏈的視角，某些驗證者犯下可罰沒違規行為的證明。`deposits` 是區塊提案者已知的新驗證者存款清單，而 `voluntary_exits` 是區塊提案者在共識層八卦網路上聽說希望退出的驗證者清單。`sync_aggregate` 是一個向量，顯示哪些驗證者先前被分配到同步委員會（提供輕客戶端資料的驗證者子集）並參與了資料簽署。

`execution_payload` 允許在執行客戶端和共識客戶端之間傳遞有關交易的資訊。`execution_payload` 是一個嵌套在信標區塊內的執行資料區塊。`execution_payload` 內的欄位反映了以太坊黃皮書中概述的區塊結構，除了沒有叔塊 (ommers) 且以 `prev_randao` 取代了 `difficulty`。執行客戶端可以存取其在自己的八卦網路上聽說的本地交易池。這些交易會在本地執行，以產生一個稱為後狀態 (post-state) 的更新狀態樹。這些交易作為名為 `transactions` 的清單包含在 `execution_payload` 中，而後狀態則提供在 `state-root` 欄位中。

所有這些資料都會被收集到一個信標區塊中，進行簽署，並廣播給區塊提案者的對等節點，對等節點再將其傳播給他們的對等節點，依此類推。

閱讀更多關於[區塊剖析](/developers/docs/blocks)的資訊。

## 區塊會發生什麼事？ {#what-happens-to-blocks}

區塊會被新增至區塊提案者的本地資料庫，並透過共識層八卦網路廣播給對等節點。當驗證者收到區塊時，它會驗證其中的資料，包括檢查區塊是否具有正確的父區塊、對應正確的時槽、提案者索引是否符合預期、RANDAO 揭露是否有效，以及提案者是否未被罰沒。`execution_payload` 會被解開，驗證者的執行客戶端會重新執行清單中的交易，以檢查提案的狀態變更。假設區塊通過了所有這些檢查，每個驗證者都會將該區塊新增至自己的規範鏈中。然後，該過程會在下一個時槽重新開始。

## 區塊獎勵 {#block-rewards}

區塊提案者會因其工作獲得報酬。有一個 `base_reward` 是根據活躍驗證者數量及其有效餘額的函數計算得出的。然後，區塊提案者會為區塊中包含的每個有效證明獲得一小部分的 `base_reward`；越多驗證者對該區塊進行證明，區塊提案者的獎勵就越大。舉報應被罰沒的驗證者也會有獎勵，每罰沒一個驗證者可獲得等於 `1/512 * effective balance` 的獎勵。

[更多關於獎勵與懲罰的資訊](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)

## 延伸閱讀 {#further-reading}

- [區塊簡介](/developers/docs/blocks/)
- [權益證明 (PoS) 簡介](/developers/docs/consensus-mechanisms/pos/)
- [以太坊共識規範](https://github.com/ethereum/consensus-specs)
- [Gasper 簡介](/developers/docs/consensus-mechanisms/pos/gasper/)
- [升級以太坊](https://eth2book.info/)