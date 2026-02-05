---
title: 網路層
description: 以太坊網路層簡介
lang: zh-tw
sidebarDepth: 2
---

以太坊是擁有數千節點的點對點網路，必須仰賴標準化協定與彼此通訊。 「網路層」則是一系列讓節點尋找彼此並交換資訊的協定， 包含全網路「八卦（gossiping）」資訊（一對多通訊）以及特定節點間交換請求與回應（一對一通訊）。 每個節點都必須遵守特定網路規則，確保發送與接收正確資訊。

用戶端軟體有兩個部分（執行用戶端和共識用戶端），每個都有自己獨特的網路堆疊。 除了與其他以太坊節點通訊之外，執行用戶端和共識用戶端還必須相互通訊。 本頁介紹對支援此通訊的協定。

執行用戶端透過執行層的點對點網路廣播交易。 這需要經過驗證的對等點之間進行加密通訊。 當一名驗證者被選擇來提議區塊，來自區域交易池的交易將會透過區域遠端程序呼叫連線傳遞到共識用戶端，然後被打包進信標區塊中。 之後，共識用戶端將在其點對點網路中廣播信標區塊。 這需要兩個獨立的點對點網路：一個連線執行用戶端來廣播交易，另一個連線共識用戶端來廣播區塊。

## 先決條件 {#prerequisites}

對以太坊[節點和用戶端](/developers/docs/nodes-and-clients/)有一定了解，將有助於您理解本頁內容。

## 執行層 {#execution-layer}

執行層的網路協定被分爲兩個堆疊：

- 發現堆疊：建立於使用者資料包通訊協定之上，使新節點能夠找到對等點進行連線

- DevP2P 堆疊：建立於傳輸控制通訊協定之上，使節點能夠交換資訊

這兩個堆疊平行運作。 發現堆疊將新的網路參與者傳送到網路中，而 DevP2P 堆疊則使它們能夠進行互動。

### 探索 {#discovery}

發現是在網路中尋找其他節點的過程。 這是透過一小組啟動節點來引導的（節點位址被[硬編碼](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go)到用戶端中，因此可以立即找到它們並將用戶端連接到對等點）。 這些引導節點只用於將新節點引入到一組對等點 - 這是它們唯一的目的，它們不參與正常的用戶端任務，如同步鏈，並且它們只在用戶端第一次啓動時使用。

用於節點與啟動節點之間互動的協議是 [Kademlia](https://medium.com/coinmonks/a-brief-overview-of-kademlia-and-its-use-in-various-decentralized-platforms-da08a7f72b8f) 的修改形式，它使用[分散式哈希表](https://en.wikipedia.org/wiki/Distributed_hash_table)來共享節點列表。 每個節點都有一個該資料表的版本，其中包含連線到其最近對等點所需的資訊。 這裏的「近」不是地理上的 - 距離是由節點 ID 的相似性來定義的。 每個節點的資料表都會定期刷新，作爲一種安全功能。 例如，在 [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5) 探索協議中，節點也能夠發送「廣告」，顯示用戶端支援的子協議，讓對等點能夠協商雙方都可以使用的通訊協議。

發現從 PING-PONG 游戲開始。 一個成功的 PING-PONG 將新節點「連結綁定」到一個引導節點。 提醒啟動節點有新節點進入網路的初始訊息是 `PING`。 這個 `PING` 包含關於新節點、啟動節點和到期時間戳的哈希資訊。 啟動節點收到 `PING` 後，會回傳一個包含 `PING` 哈希的 `PONG`。 如果 `PING` 和 `PONG` 的哈希相符，新節點和啟動節點之間的連線就會被驗證，即為「已綁定」。

一旦綁定，新節點就可以向啟動節點發送 `FIND-NEIGHBOURS` 請求。 引導節點返回的資料包含一個新節點可以連線的對等點清單。 如果節點沒有綁定，`FIND-NEIGHBOURS` 請求將會失敗，因此新節點將無法進入網路。

一旦新節點從引導節點收到鄰居清單，就會開始與每個鄰居節點進行 PING-PONG 交換。 成功的 PING-PONG 會將新節點與鄰居節點連結綁定，以實現訊息交換。

```
啟動用戶端 --> 連接到啟動節點 --> 綁定到啟動節點 --> 尋找鄰居節點 --> 綁定到鄰居節點
```

執行用戶端目前使用 [Discv4](https://github.com/ethereum/devp2p/blob/master/discv4.md) 探索協議，並正積極遷移到 [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5) 協議。

#### ENR：以太坊節點記錄 {#enr}

[以太坊節點記錄 (ENR)](/developers/docs/networking-layer/network-addresses/) 是一個物件，包含三個基本元素：一個簽章 (根據商定的身分方案對記錄內容進行哈希運算後的結果)、一個追蹤記錄變更的序號，以及一個任意的鍵值對列表。 這是一種能適應未來需求的格式，可讓新的對等點之間更容易交換識別資訊，也是以太坊節點偏好的[網路位址](/developers/docs/networking-layer/network-addresses)格式。

#### 爲什麽在使用者資料包通訊協定之上建置發現？ {#why-udp}

使用者資料包通訊協定不支持任何錯誤檢查、失敗資料包的重新發送，或者動態開啓和關閉連線 - 相反，它只是向目標發送連續的訊息流，無論是否被成功接收。 這種最少的功能產生的開銷也最少，使得這種連線非常快速。 對於發現來講，如果某個節點只希望使其他節點知道其存在，以便與某個對等點建立正式的連線，使用使用者資料包通訊協定就足夠了。 然而，對於網路堆疊的其餘部分，使用者資料包通訊協定並不適合。 節點之間的資訊交換是相當複雜的，並因此需要更多功能齊全的協定來支持重新發送、錯誤檢查等等。 與傳輸控制通訊協定相關的額外開銷相對其額外功能而言是值得的。 因此，大多數點對點堆疊在傳輸控制通訊協定上運作。

### DevP2P {#devp2p}

DevP2P 本身是以太坊爲了建立和維護點對點網路而實作的一整套協定。 新節點進入網路後，它們的互動由 [DevP2P](https://github.com/ethereum/devp2p) 堆疊中的協議所管理。 這些都建立於傳輸控制通訊協定之上，包括 RLPx 傳輸協定、綫路協定和一些子協定。 [RLPx](https://github.com/ethereum/devp2p/blob/master/rlpx.md) 是管理節點之間啟動、驗證和維護會話的協議。 RLPx 使用 RLP（遞迴長度前綴）編碼訊息，這是一種將資料編碼為最小結構來在節點之間發送的方法，這種方法非常節省空間。

兩個節點之間的 RLPx 工作階段從初始加密握手開始。 這需要節點發送身份驗證訊息，然後對等點會進行驗證。 成功驗證後，對等點會生成驗證確認訊息，並將其返回初始節點。 這是一個密鈅交換程序，使節點能夠私密且安全地進行通訊。 成功的加密握手會觸發兩個節點「在綫上」互相發送「hello」訊息。 綫路協定透過成功交換 hello 訊息來發起。

hello 訊息包含：

- 協定版本
- 用戶端 ID
- 連接埠
- 節點 ID
- 支援的子協定清單

這是成功互動所需的訊息，因爲它定義了在兩個節點之間共用的功能並配置了通訊。 有一個子協定協調的程序，其中會將每個節點支援的子協定清單進行比較，並能將兩個節點共用的子協定用於工作階段中。

除了「hello」訊息以外，綫路協定還可以發送「disconnect」訊息，該訊息警告對等點連線將會被關閉。 綫路協定還包含定期發送的 PING 和 PONG 訊息，以保持工作階段開放。 因此，RLPx 和綫路協定的交換為節點之間的通訊奠定了基礎，並為根據特定子協定交換的有用資訊提供了平台。

### 子協議 {#sub-protocols}

#### 有線協議 {#wire-protocol}

一旦對等點連線並且 RLPx 工作階段啓動，綫路協定就會定義對等點的通訊方式。 一開始，綫路協定會定義三個主要任務：鏈同步、區塊傳播和交易交換。 然而，以太坊切換到權益證明後，區塊傳播和鏈同步變成了共識層的一部分。 但交易交換仍然由執行用戶端負責。 交易交換指的是節點之間交換等待處理的交易，以便區塊建置者能夠選擇其中一些放到下一個區塊中。 關於這些任務的詳細資訊，請參閱[此處](https://github.com/ethereum/devp2p/blob/master/caps/eth.md)。 支援這些子協議的用戶端會透過 [JSON-RPC](/developers/docs/apis/json-rpc/) 將它們公開。

#### les (輕量以太坊子協議) {#les}

這是用於同步輕量級用戶端的最小協定。 傳統上，該協定很少被使用，因爲全節點需要在沒有激勵的情況下向輕用戶端提供資料。 執行用戶端的預設行爲不是透過 les 為輕量級用戶端提供服務。 更多資訊請參閱 les [規格](https://github.com/ethereum/devp2p/blob/master/caps/les.md)。

#### Snap {#snap}

[快照協議 (snap protocol)](https://github.com/ethereum/devp2p/blob/master/caps/snap.md#ethereum-snapshot-protocol-snap) 是一種可選的擴充功能，讓對等點能交換最近狀態的快照，從而無需下載中介的默克爾樹節點即可驗證帳戶和儲存資料。

#### Wit (見證協議) {#wit}

[見證協議 (witness protocol)](https://github.com/ethereum/devp2p/blob/master/caps/wit.md#ethereum-witness-protocol-wit) 是一種可選的擴充功能，能在對等點之間交換狀態見證，有助於將用戶端同步到鏈的頂端。

#### Whisper {#whisper}

Whisper 是一個旨在實現安全的點對點資訊傳輸，而不需要向區塊鏈寫入任何資訊的協定。 它曾是 DevP2P 綫路協定的一部分，但現在已經棄用。 也有其他目標類似的[相關專案](https://wakunetwork.com/)。

## 共識層 {#consensus-layer}

共識用戶端參與具有不同規範的單獨點對點網路。 共識用戶端需要參與區塊廣播，以便其能夠從對等點接受新區塊，並在輪到其成爲區塊提議者時廣播它們。 與執行層類似，這首先需要一個發現協定，一邊節點可以找到對等點並建立安全的工作階段來交換區塊、證明等。

### 探索 {#consensus-discovery}

與執行用戶端類似，共識用戶端也透過 UDP 使用 [discv5](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#the-discovery-domain-discv5) 來尋找對等點。 discv5 的共識層實作與執行用戶端的實作不同之處僅在於：它包含一個將 discv5 連接到 [libP2P](https://libp2p.io/) 堆疊的適配器，並棄用了 DevP2P。 執行層的 RLPx 工作階段被棄用，代之以 libP2P 的噪音安全通道握手。

### ENR {#consensus-enr}

共識節點的 ENR 包括節點的公鑰、IP 位址、UDP 和 TCP 連接埠，以及兩個共識專屬的欄位：證明子網路位元欄位和 `eth2` 金鑰。 前者使節點更容易找到參與特定證明廣播子網路的對等點。 `eth2` 金鑰包含節點正在使用的以太坊分叉版本資訊，確保對等點連接到正確的以太坊。

### libP2P {#libp2p}

libP2P 堆疊支持發現之後的所有通訊。 用戶端可以根據其以太坊節點記錄的定義在 IPv4 和/或 IPv6 上撥號和接聽。 libP2P 層上的協定可以細分爲廣播和請求/響應域。

### 傳播 {#gossip}

廣播域包括必須在整個網路中快速傳播的所有資訊。 這包括信標區區塊、證據、證明、退出和罰沒。 這是使用 libP2P gossipsub v1 傳輸的，並且依賴於在每個節點本機儲存的各種中繼資料，包括接收和傳輸的廣播承載的上限。 關於傳播網域的詳細資訊，請參閱[此處](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#the-gossip-domain-gossipsub)。

### 請求-回應 {#request-response}

請求-回應域包含用戶端從其對等點請求特定資訊的協定。 範例包括請求匹配某些根雜湊或在一定時隙範圍内的特定信標區塊。 回應始終以快速壓縮的簡單序列化編碼位元組形式傳回。

## 為什麼共識用戶端喜歡簡單序列化而非遞迴長度前置詞？ {#ssz-vs-rlp}

SSZ 代表簡單序列化。 它使用固定位移，能夠簡單地解碼編碼訊息的單獨部分，而無需解碼整個結構，這對於共識用戶端非常有用，因爲它可以高效地從編碼訊息中獲取特定資訊片段。 它還專門設計於與默克爾協定整合，並提升與默克爾化相關的效率。 由於共識層中的所有雜湊都是默克爾根，這會帶來顯著的改進。 簡單序列化也保證值的唯一表示。

## 連接執行用戶端與共識用戶端 {#connecting-clients}

共識用戶端和執行用戶端平行運作。 它們需要彼此連線，以便共識用戶端向執行用戶端提供指示，並使執行用戶端能夠向執行用戶端傳送需要納入信標區塊的交易捆綁。 兩個用戶端之間的通訊可以透過本機遠端程序呼叫連線來實現。 一個稱為「Engine-API」的 [API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) 定義了在這兩個用戶端之間傳送的指令。 由於兩個用戶端共用一個網路身分，它們也共用一個 ENR（以太坊節點記錄），其中包含每個用戶端的單獨金鑰（eth1 金鑰和 eth2 金鑰）。

如下展示了控制流摘要，括號中是相關的網路堆疊。

### 當共識用戶端不是區塊生產者時： {#when-consensus-client-is-not-block-producer}

- 共識用戶端透過區塊廣播協定（共識點對點）接收區塊
- 共識用戶端預先驗證區塊，即確保區塊來自有效的發送者且帶有正確的中繼資料
- 區塊中的交易作爲執行承載發送到執行層（本機遠端程序呼叫連線）
- 執行層執行交易並驗證區塊頭中的狀態 (即檢查哈希是否相符)
- 執行層將驗證資料傳送回共識層，區塊現在被認爲已驗證（本機遠端程序呼叫連線）
- 共識層將區塊添加到其區塊鏈頭並證明該區塊，透過網路廣播證明（共識點對點）

### 當共識用戶端是區塊生產者時： {#when-consensus-client-is-block-producer}

- 共識用戶端收到其將成爲下一個區塊生產者的通知（共識點對點）
- 共識層在執行用戶端中呼叫 `create block` 方法 (本機 RPC)
- 執行層訪問已由交易廣播協定填充的交易内存池（執行點對點）
- 執行用戶端將交易捆綁進一個區塊，執行交易並產生一個區塊雜湊
- 共識用戶端從執行用戶端獲取交易和區塊雜湊，並將其新增至信標區塊（本機遠端程序呼叫）
- 共識用戶端透過區塊廣播協定廣播區塊（共識點對點）
- 其他用戶端透過區塊廣播協定接收提議的區塊，並如上述進行驗證（共識點對點）

一旦區塊被足夠多的驗證者證明后，就會被新增到鏈頭，經過合理化並最終確定。

![](cons_client_net_layer.png)
![](exe_client_net_layer.png)

共識和執行用戶端的網路層示意圖，來源：[ethresear.ch](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)

## 延伸閱讀 {#further-reading}

[DevP2P](https://github.com/ethereum/devp2p)
[LibP2p](https://github.com/libp2p/specs)
[共識層網路規格](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#enr-structure)
[kademlia 到 discv5](https://vac.dev/kademlia-to-discv5)
[kademlia 論文](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf)
[以太坊點對點網路介紹](https://p2p.paris/en/talks/intro-ethereum-networking/)
[eth1/eth2 關係](http://ethresear.ch/t/eth1-eth2-client-relationship/7248)
[合併與 eth2 用戶端詳細資訊影片](https://www.youtube.com/watch?v=zNIrIninMgg)
