---
title: 區塊提出
description: 解釋在權益證明以太坊中如何提議區塊。
lang: zh-tw
---

區塊是區塊鏈中的基本單位。 區塊是節點之間傳送，達成共識並新增到每個節點資料庫的獨立資訊單元。 本頁會解釋它們是如何產生的。

## 先決條件 {#prerequisites}

區塊提議是權益證明協定的一部分。 為了幫助瞭解本頁的資訊，我們推薦你閱讀關於[權益證明](/developers/docs/consensus-mechanisms/pos/)與[區塊架構](/developers/docs/blocks/)的相關內容。

## 區塊由誰生產？ {#who-produces-blocks}

驗證者帳戶負責提議區塊。 驗證者帳戶由節點營運商負責管理，節點營運商執行驗證者軟體（當作執行的一部分）和共識用戶端，並且已經向存款合約中存入至少 32 個以太幣。 然而，每個驗證者只會偶爾負責提議一個區塊。 以太坊以時隙與時期來衡量時間。 每個時隙為十二秒，而 32 個時隙（6.4分鐘）為一個時期。 每個時隙都是在以太坊上新增區塊的機會。

### 隨機選擇 {#random-selection}

每個時隙會有一個以偽隨機方式選擇的驗證者來提議區塊。 在區塊鏈中沒有實質的隨機性，因為如果每個節點都產生真實的隨機數，那麼它們是無法達成共識的。 相反的，目的是讓驗證者的選擇過程無法預測。 以太坊使用一種名為 RanDAO 的演算法來達到隨機性，這種演算法會將區塊提議者的雜湊值與一個隨著每個區塊而更新的種子混在一起。 這個值會被用來從整個驗證者集合中選出一個特定的驗證者。 驗證者的選擇會提前兩個時期鎖定，這種方式可以防範特定類型的種子操控。

儘管驗證者會在每個時隙添增 RANDAO，全域 RANDAO 值每個時期僅更新一次。 為了計算下一個區塊提議者的索引，RANDAO 值會跟時隙號碼混合，為每個時隙提供一個獨特數值。 一個驗證者被選中的機率並不是簡單的 `1/N`（其中 `N`= 活躍驗證者總數）。 相反的，它會依照每個驗證者的有效以太幣餘額進行加權。 最大有效餘額為 32 個以太幣（這代表著 `balance < 32 ETH` 會產生低於 `balance == 32 ETH` 的加權，但是 `balance > 32 ETH` 並不會產生高於 `balance == 32 ETH` 的加權）。

每個時隙只有一個區塊提議者會被選中。 在正常的情況下，一個區塊生產者會在其專門的時隙中建立並且釋出一個區塊。 在一個時隙中建立兩個區塊是一種很嚴重的罪行，通常被稱為「模棱兩可」。

## 區塊如何建立？ {#how-is-a-block-created}

區塊提議者預計會廣播一個已簽署的信標區塊，該區塊建置在根據他們自己在本地運行的分叉選擇演算法所看到的最近鏈頭之上。 分叉選擇演算法會套用上一個時隙留下的任何排隊證明，然後在其歷史記錄中尋找具有最大累積證明權重的區塊。 該區塊便是由提議者建立的新區塊的父塊。

區塊提議者透過從自己的本機資料庫和鏈檢視中收集資料來建立區塊。 區塊的內容如以下程式碼片段所示：

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

`randao_reveal` 欄位取一個可驗證的隨機值，該值是區塊提議者透過簽署當前的時期編號建立的。 `eth1_data` 是就區塊提議者對存款合約的看法進行的投票，包括存款默克爾樹的根和使新存款能夠被驗證的總存款數。 `graffiti` 是一個可選欄位，可用來在區塊中新增一條訊息。 `proposer_slashings` 和 `attester_slashings` 欄位包含了某些驗證者根據區塊提議者對鏈的看法已經犯下可罰沒行為的證據。 `deposits` 是區塊提議者所知道的新驗證者存款的清單，`voluntary_exits` 是區塊提議者從共識層廣播網路上監聽到的希望退出的驗證者的清單。 `sync_aggregate` 是一個向量，顯示哪些驗證者之前被分配到一個同步委員會（服務於輕量用戶端資料的驗證者子集）並參與了資料簽章。

`execution_payload` 使得關於交易的資訊可以在執行用戶端和共識用戶端之間傳遞。 `execution_payload` 是一個被嵌套在信標鏈區塊內部的執行資料區塊。 `execution_payload` 中的欄位反映了以太坊黃皮書中概述的區塊結構，只不過其中沒有親戚區塊，並且 `prev_randao` 取代了 `difficulty`。 執行用戶端可以存取它在自己的 Gossip 網路上監聽到的本機交易池。 這些交易在本機執行，以產生一個被稱為「後狀態」的更新狀態樹。 這些交易被包含在 `execution_payload` 中名為 `transactions` 的清單中，後狀態則在 `state-root` 欄位中提供。

所有這些資料都被收集在一個信標區塊中，經過簽署並廣播給區塊提議者的對等節點，再由他們傳播給他們的對等節點，以此類推。

閱讀更多關於[區塊剖析](/developers/docs/blocks)的內容。

## 區塊會發生什麼？ {#what-happens-to-blocks}

區塊被新增至區塊提議者的本機資料庫，並透過共識層廣播網路廣播給對等節點。 當驗證者接收到區塊時，它會驗證其中的資料，包括檢查區塊是否有正確的父塊、是否對應正確的時隙、提議者索引是否符合預期、RANDAO 揭示是否有效，以及提議者是否被罰沒。 `execution_payload` 被解綁，驗證者的執行用戶端重新執行清單中的交易，以檢查所提議的狀態變化。 假設區塊通過了所有這些檢查，每個驗證者將區塊新增到自己的規範鏈中。 然後，在下一個時隙中重新開始這個過程。

## 區塊獎勵 {#block-rewards}

區塊提議者會收到他們工作的報酬。 有一個 `base_reward`，是根據活躍驗證者的數量和他們的有效餘額來計算的。 然後，區塊提議者會因為區塊中包含的每個有效證明而收到 `base_reward` 的一部分；證明區塊的驗證者越多，區塊提議者獲得的獎勵就越高。 還有一個獎勵是報告應該被罰沒的驗證者，數額等於每個被罰沒的驗證者的 `1/512 * effective balance`。

[更多關於獎勵和懲罰的資訊](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)

## 了解更多 {#further-reading}

- [區塊簡介](/developers/docs/blocks/)
- [權益證明簡介](/developers/docs/consensus-mechanisms/pos/)
- [以太坊共識規範](https://github.com/ethereum/consensus-specs)
- [Gasper 簡介](/developers/docs/consensus-mechanisms/pos/)
- [升級以太坊](https://eth2book.info/)
