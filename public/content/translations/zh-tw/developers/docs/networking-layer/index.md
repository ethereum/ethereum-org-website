---
title: 網路層
description: 以太坊網路層簡介。
lang: zh-tw
sidebarDepth: 2
---

[以太坊](/)是一個擁有數千個節點的點對點網路，這些節點必須能夠使用標準化協定相互通訊。「網路層」是允許這些節點互相尋找並交換資訊的協定堆疊。這包括在網路上「流言傳播 (gossiping)」資訊（一對多通訊），以及在特定節點之間交換請求與回應（一對一通訊）。每個節點都必須遵守特定的網路規則，以確保它們發送和接收正確的資訊。

客戶端軟體分為兩個部分（執行客戶端與共識客戶端），每個部分都有其獨特的網路堆疊。除了與其他以太坊節點通訊外，執行客戶端與共識客戶端也必須相互通訊。本頁面將對實現此通訊的協定進行入門介紹。

執行客戶端透過執行層點對點網路流言傳播交易。這需要經過身分驗證的對等節點之間進行加密通訊。當驗證者被選中作為區塊提案者時，來自節點本地交易池的交易將透過本地 RPC 連線傳遞給共識客戶端，並被打包進信標區塊中。接著，共識客戶端將在其點對點網路中流言傳播信標區塊。這需要兩個獨立的點對點網路：一個連接執行客戶端以進行交易流言傳播，另一個連接共識客戶端以進行區塊流言傳播。

## 先決條件 {#prerequisites}

具備一些關於以太坊[節點與客戶端](/developers/docs/nodes-and-clients/)的知識將有助於理解本頁面。

## 執行層 {#execution-layer}

執行層的網路協定分為兩個堆疊：

- 節點發現堆疊：建立在 UDP 之上，允許新節點尋找要連線的對等節點

- devp2p 堆疊：位於 TCP 之上，使節點能夠交換資訊

這兩個堆疊平行運作。節點發現堆疊將新的網路參與者引入網路，而 devp2p 堆疊則實現它們之間的互動。

### 節點發現 {#discovery}

節點發現是在網路中尋找其他節點的過程。這是使用一小組引導節點（其地址被[硬編碼](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go)到客戶端中的節點，因此可以立即找到它們並將客戶端連接到對等節點）來引導的。這些引導節點的存在只是為了將新節點介紹給一組對等節點——這是它們的唯一目的，它們不參與同步鏈等正常的客戶端任務，並且僅在客戶端首次啟動時使用。

用於節點與引導節點互動的協定是 [Kademlia](https://medium.com/coinmonks/a-brief-overview-of-kademlia-and-its-use-in-various-decentralized-platforms-da08a7f72b8f) 的修改版本，它使用[分散式雜湊表](https://en.wikipedia.org/wiki/Distributed_hash_table)來共享節點列表。每個節點都有一個此表的版本，其中包含連接到其最近對等節點所需的資訊。這種「接近度」不是地理上的——距離是由節點 ID 的相似度定義的。作為一項安全功能，每個節點的表都會定期重新整理。例如，在 [discv5](https://github.com/ethereum/devp2p/tree/master/discv5) 中，節點發現協定節點也能夠發送顯示客戶端支援的子協定的「廣告」，允許對等節點協商它們都可以用來通訊的協定。

節點發現從 PING-PONG 遊戲開始。成功的 PING-PONG 會將新節點與引導節點「綁定」。提醒引導節點有新節點進入網路的初始訊息是 `PING`。此 `PING` 包含關於新節點、引導節點的雜湊資訊以及到期時間戳記。引導節點接收 `PING` 並返回包含 `PING` 雜湊的 `PONG`。如果 `PING` 和 `PONG` 雜湊相符，則新節點與引導節點之間的連線即被驗證，它們被稱為已「綁定」。

一旦綁定，新節點就可以向引導節點發送 `FIND-NEIGHBOURS` 請求。引導節點返回的資料包含新節點可以連接的對等節點列表。如果節點未綁定，`FIND-NEIGHBOURS` 請求將會失敗，因此新節點將無法進入網路。

一旦新節點從引導節點收到鄰居列表，它就會開始與它們每一個進行 PING-PONG 交換。成功的 PING-PONG 會將新節點與其鄰居綁定，從而實現訊息交換。

```
啟動客戶端 --> 連接至引導節點 --> 與引導節點綁定 --> 尋找鄰居 --> 與鄰居綁定
```

執行客戶端目前使用 [Discv4](https://github.com/ethereum/devp2p/blob/master/discv4.md) 節點發現協定，並且正在積極努力遷移至 [discv5](https://github.com/ethereum/devp2p/tree/master/discv5) 協定。

#### ENR：以太坊節點記錄 {#enr}

[以太坊節點記錄 (ENR)](/developers/docs/networking-layer/network-addresses/) 是一個包含三個基本元素的物件：簽章（根據某個約定的身分方案製作的記錄內容雜湊）、追蹤記錄變更的序號，以及任意的鍵值對 (key:value) 列表。這是一種具備未來擴充性的格式，允許新對等節點之間更輕鬆地交換識別資訊，並且是以太坊節點首選的[網路地址](/developers/docs/networking-layer/network-addresses)格式。

#### 為什麼節點發現建立在 UDP 之上？ {#why-udp}

UDP 不支援任何錯誤檢查、重新發送失敗的封包，或動態開啟和關閉連線——相反地，它只是向目標發射連續的資訊流，無論是否成功接收。這種最少的功能也轉化為最少的開銷，使得這種連線非常快速。對於節點發現，節點只是想讓別人知道它的存在，以便隨後與對等節點建立正式連線，UDP 就足夠了。然而，對於網路堆疊的其餘部分，UDP 並不適用。節點之間的資訊交換相當複雜，因此需要一個功能更齊全、能夠支援重新發送、錯誤檢查等的協定。與 TCP 相關的額外開銷值得換取這些額外功能。因此，大部分的點對點堆疊都在 TCP 上運作。

### devp2p {#devp2p}

devp2p 本身是以太坊為建立和維護點對點網路而實作的完整協定堆疊。新節點進入網路後，它們的互動由 [devp2p](https://github.com/ethereum/devp2p) 堆疊中的協定管理。這些協定都位於 TCP 之上，包括 RLPx 傳輸協定、線路協定 (wire protocol) 和幾個子協定。[RLPx](https://github.com/ethereum/devp2p/blob/master/rlpx.md) 是管理節點之間啟動、身分驗證和維護工作階段的協定。RLPx 使用 RLP（遞迴長度前綴）對訊息進行編碼，這是一種非常節省空間的方法，可將資料編碼為最小結構，以便在節點之間發送。

兩個節點之間的 RLPx 工作階段從初始的加密握手開始。這涉及節點發送身分驗證訊息，然後由對等節點進行驗證。驗證成功後，對等節點會產生身分驗證確認訊息以返回給發起節點。這是一個金鑰交換過程，使節點能夠私密且安全地通訊。成功的加密握手隨後會觸發兩個節點在「線路上 (on the wire)」互相發送「hello」訊息。線路協定由成功交換 hello 訊息而啟動。

hello 訊息包含：

- 協定版本
- 客戶端 ID
- 通訊埠
- 節點 ID
- 支援的子協定列表

這是成功互動所需的資訊，因為它定義了兩個節點之間共享的功能並設定了通訊。這裡有一個子協定協商過程，會比較每個節點支援的子協定列表，兩個節點共有的子協定可用於該工作階段。

除了 hello 訊息之外，線路協定還可以發送「disconnect」訊息，警告對等節點連線即將關閉。線路協定還包括定期發送的 PING 和 PONG 訊息，以保持工作階段開啟。因此，RLPx 和線路協定交換建立了節點之間通訊的基礎，為根據特定子協定交換有用資訊提供了框架。

### 子協定 {#sub-protocols}

#### 線路協定 {#wire-protocol}

一旦對等節點連接並啟動了 RLPx 工作階段，線路協定就會定義對等節點如何通訊。最初，線路協定定義了三個主要任務：鏈同步、區塊傳播和交易交換。然而，一旦以太坊切換到權益證明 (PoS)，區塊傳播和鏈同步就成為共識層的一部分。交易交換仍然屬於執行客戶端的職責範圍。交易交換是指在節點之間交換待處理的交易，以便區塊建構者可以選擇其中一些包含在下一個區塊中。關於這些任務的詳細資訊可參閱[此處](https://github.com/ethereum/devp2p/blob/master/caps/eth.md)。支援這些子協定的客戶端透過 [JSON-RPC](/developers/docs/apis/json-rpc/) 公開它們。

#### les（輕以太坊子協定） {#les}

這是一個用於同步輕客戶端的最小協定。傳統上，這個協定很少被使用，因為全節點需要在沒有激勵的情況下向輕客戶端提供資料。執行客戶端的預設行為是不透過 les 提供輕客戶端資料。更多資訊可參閱 les [規範](https://github.com/ethereum/devp2p/blob/master/caps/les.md)。

#### Snap {#snap}

[snap 協定](https://github.com/ethereum/devp2p/blob/master/caps/snap.md#ethereum-snapshot-protocol-snap)是一個可選的擴充功能，允許對等節點交換近期狀態的快照，使對等節點能夠驗證帳戶和儲存資料，而無需下載中間的默克爾樹 (Merkle trie) 節點。

#### Wit（見證協定） {#wit}

[見證協定](https://github.com/ethereum/devp2p/blob/master/caps/wit.md#ethereum-witness-protocol-wit)是一個可選的擴充功能，能夠在對等節點之間交換狀態見證，幫助將客戶端同步到鏈的頂端。

#### Whisper {#whisper}

Whisper 是一個旨在於對等節點之間傳遞安全訊息而不將任何資訊寫入區塊鏈的協定。它是 devp2p 線路協定的一部分，但現在已被棄用。還有其他具有類似目標的[相關專案](https://wakunetwork.com/)。

## 共識層 {#consensus-layer}

共識客戶端參與一個具有不同規範的獨立點對點網路。共識客戶端需要參與區塊流言傳播，以便它們可以從對等節點接收新區塊，並在輪到它們成為區塊提案者時廣播這些區塊。與執行層類似，這首先需要一個節點發現協定，以便節點可以尋找對等節點並建立安全的工作階段來交換區塊、證明等。

### 節點發現 {#consensus-discovery}

與執行客戶端類似，共識客戶端透過 UDP 使用 [discv5](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#the-discovery-domain-discv5) 來尋找對等節點。共識層的 discv5 實作與執行客戶端的不同之處僅在於它包含一個將 discv5 連接到 [libp2p](https://libp2p.io/) 堆疊的轉接器，從而棄用了 devp2p。執行層的 RLPx 工作階段被棄用，取而代之的是 libp2p 的 noise 安全通道握手。

### ENR {#consensus-enr}

共識節點的 ENR 包含節點的公鑰、IP 地址、UDP 和 TCP 通訊埠以及兩個共識特定的欄位：證明子網路位元欄位和 `eth2` 金鑰。前者使節點更容易尋找參與特定證明流言子網路的對等節點。`eth2` 金鑰包含有關節點正在使用哪個以太坊分叉版本的資訊，確保對等節點連接到正確的以太坊。

### libp2p {#libp2p}

libp2p 堆疊支援節點發現後的所有通訊。客戶端可以根據其 ENR 中的定義，在 IPv4 和/或 IPv6 上撥號和監聽。libp2p 層上的協定可以細分為流言 (gossip) 和請求/回應 (req/resp) 領域。

### 流言傳播 {#gossip}

流言領域包含必須在整個網路中快速傳播的所有資訊。這包括信標區塊、證明、退出和罰沒。這是使用 libp2p gossipsub v1 傳輸的，並依賴於儲存在每個節點本地的各種中繼資料，包括接收和傳輸的流言負載的最大大小。關於流言領域的詳細資訊可參閱[此處](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#the-gossip-domain-gossipsub)。

### 請求-回應 {#request-response}

請求-回應領域包含客戶端向其對等節點請求特定資訊的協定。範例包括請求符合特定根雜湊或在某個時隙 (slot) 範圍內的特定信標區塊。回應始終以 snappy 壓縮的 SSZ 編碼位元組形式返回。

## 為什麼共識客戶端偏好 SSZ 而非 RLP？ {#ssz-vs-rlp}

SSZ 代表簡單序列化 (simple serialization)。它使用固定的偏移量，使得解碼編碼訊息的各個部分變得容易，而無需解碼整個結構，這對共識客戶端非常有用，因為它可以有效地從編碼訊息中抓取特定的資訊片段。它也是專門為與默克爾協定整合而設計的，並帶來了默克爾化 (Merkleization) 相關的效率提升。由於共識層中的所有雜湊都是默克爾根，這帶來了顯著的改進。SSZ 還保證了值的唯一表示。

## 連接執行客戶端與共識客戶端 {#connecting-clients}

共識客戶端與執行客戶端平行運作。它們需要連接，以便共識客戶端可以向執行客戶端提供指令，而執行客戶端可以將交易包傳遞給共識客戶端以包含在信標區塊中。兩個客戶端之間的通訊可以使用本地 RPC 連線來實現。一個稱為 [「Engine-API」](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) 的 API 定義了在兩個客戶端之間發送的指令。由於兩個客戶端都位於單一網路身分之後，它們共享一個 ENR（以太坊節點記錄），其中包含每個客戶端的獨立金鑰（Eth1 金鑰和 Eth2 金鑰）。

控制流程的摘要如下所示，括號中為相關的網路堆疊。

### 當共識客戶端不是區塊生產者時： {#when-consensus-client-is-not-block-producer}

- 共識客戶端透過區塊流言協定接收區塊（共識點對點）
- 共識客戶端預先驗證區塊，即確保它來自具有正確中繼資料的有效發送者
- 區塊中的交易作為執行負載發送到執行層（本地 RPC 連線）
- 執行層執行交易並驗證區塊頭中的狀態（即檢查雜湊是否相符）
- 執行層將驗證資料傳回共識層，區塊現在被認為已驗證（本地 RPC 連線）
- 共識層將區塊新增至其自身區塊鏈的頂端並對其進行證明，在網路上廣播該證明（共識點對點）

### 當共識客戶端是區塊生產者時： {#when-consensus-client-is-block-producer}

- 共識客戶端收到它是下一個區塊生產者的通知（共識點對點）
- 共識層呼叫執行客戶端中的 `create block` 方法（本地 RPC）
- 執行層存取已由交易流言協定填入的交易記憶體池（執行點對點）
- 執行客戶端將交易打包成一個區塊，執行交易並產生區塊雜湊
- 共識客戶端從執行客戶端抓取交易和區塊雜湊，並將它們新增至信標區塊中（本地 RPC）
- 共識客戶端透過區塊流言協定廣播區塊（共識點對點）
- 其他客戶端透過區塊流言協定接收提議的區塊，並如上所述進行驗證（共識點對點）

一旦區塊被足夠的驗證者證明，它就會被新增至鏈的頂端，成為已證明，並最終成為已定案。

![Diagram of the Ethereum consensus client networking layer](cons_client_net_layer.png)
![Diagram of the Ethereum execution client networking layer](exe_client_net_layer.png)

共識客戶端與執行客戶端的網路層示意圖，來自 [ethresear.ch](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)

## 延伸閱讀 {#further-reading}

[devp2p](https://github.com/ethereum/devp2p)
[libp2p](https://github.com/libp2p/specs)
[共識層網路規範](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#enr-structure)
[從 Kademlia 到 discv5](https://vac.dev/kademlia-to-discv5)
[Kademlia 論文](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf)
[以太坊點對點網路簡介](https://p2p.paris/en/talks/intro-ethereum-networking/)
[Eth1/Eth2 關係](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)
[合併與 Eth2 客戶端詳細資訊影片](https://www.youtube.com/watch?v=zNIrIninMgg)