---
title: "去中心化存儲"
description: "去中心化存儲及可以將該存儲整合到去中心化應用程式的可用工具概觀"
lang: zh-tw
---

與單一公司或組織運作的中心化伺服器不同，去中心化存儲系統由持有全部資料中部分資料的使用者和營運者的點對點網路組成，建立了一個彈性文件存儲共用系統。 這些存儲系統可以位於基於區塊鏈的應用程式或任何點對點網路中。

以太坊本身可以用作去中心化存儲系統，所有智慧型合約中的程式碼存儲都是如此。 然而，當涉及大量資料時，就不符合以太坊的設計目的。 該鏈正在穩步增長，但在撰寫本文時，以太坊鏈的大小約為 500GB 至 1TB（[取決于用戶端](https://etherscan.io/chartsync/chaindefault)），網路上的每個節點都需要能夠存儲所有資料。 如果鏈上資料量擴大（例如 5TB），所有節點都無法繼續運作。 此外，由於 [gas](/developers/docs/gas) 費用，將這麼多資料部署到主網的成本將會高得嚇人。

由於這些限制，我們需要不同的鏈或方法來以去中心化方式存儲大量資料。

在考慮去中心化儲存 (dStorage) 選項時，使用者必須牢記一些事項。

- 持久性機制 / 激勵結構
- 資料保留強制
- 去中心化
- 共識

## 持久性機制 / 激勵結構 {#persistence-mechanism}

### 基於區塊鏈 {#blockchain-based}

為了讓一段資料永久保存，我們需要使用持久性機制。 例如，在以太坊上，持久性機制意味著運行一個節點時需要考慮整條鏈。 新的資料被新增至鏈的末端，並且鏈會繼續增長，並要求每個節點複製所有內嵌的資料。

這就是所謂的 **基於區塊鏈** 的持久性。

基於區塊鏈的持久性的問題在於，鏈可能會變得過於龐大，以至於無法實際地維護和存儲所有資料（例如，[許多來源](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/)估計網際網路需要超過 40 ZB 的存儲容量）。

區塊鏈也必須具有某種類型的激勵結構。 為實現基於區塊鏈的持久性，需要向驗證者支付費用。 資料被新增到鏈上後，向驗證者支付以讓其繼續添加資料。

具有基於區塊鏈的持久性的平台：

- Ethereum
- [Arweave](https://www.arweave.org/)

### 基於合約 {#contract-based}

**基於合約**的持久性認為，資料無法由每個節點複製並永久存儲，而必須透過合約協議來維護。 這些是與多個節點簽訂的協定，承諾在一段時間內保存一段資料。 一旦時間結束，就必須向節點續費，以保持資料的持久性。

在大多數情況下，不會將所有資料存儲在鏈上，而是存儲資料在鏈上位置的哈希。 這樣，就不需要擴充整個鏈來保留所有資料。

具有基於合約的持久性的平台：

- [Filecoin](https://docs.filecoin.io/basics/what-is-filecoin)
- [Skynet](https://sia.tech/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust Network](https://crust.network)
- [Swarm](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### 其他考量 {#additional-consideration}

星際檔案系統是一個儲存和存取檔案、網站、應用程式和資料的分散式系統。 雖然它沒有內建激勵計劃，但可以與上述任何基於合約的激勵解決方案一起使用，以獲得更長期的持久性。 另一個將資料持久儲存在星際檔案系統上的方法是與某項固定服務（表示將你的資料固定在某處）一起使用。 你甚至可以運行自己的星際檔案系統節點來為該網路做出貢獻，從而將你和/或他人的資料免費且持久地儲存在星際檔案系統上。

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(IPFS 釘選服務)_
- [web3.storage](https://web3.storage/) _(IPFS/Filecoin 釘選服務)_
- [Infura](https://infura.io/product/ipfs) _(IPFS 釘選服務)_
- [IPFS Scan](https://ipfs-scan.io) _(IPFS 釘選瀏覽器)_
- [4EVERLAND](https://www.4everland.org/)_（IPFS 釘選服務）_
- [Filebase](https://filebase.com) _(IPFS 釘選服務)_
- [Spheron Network](https://spheron.network/) _(IPFS/Filecoin 釘選服務)_

SWARM 是一種去中心化的資料儲存和分發技術，具有儲存激勵系統和儲存空間租金價格預測機。

## 資料保留 {#data-retention}

為了保留資料，系統必須有某種機制來確保已保留資料。

### 挑戰機制 {#challenge-mechanism}

確保已保留資料的最常用方法之一是使用向節點發出的某種類型的加密質詢以確保節點仍然擁有資料。 一個簡單的例子就是查看Arweave的存取證明。 它們向節點發出質詢，看看節點是否擁有最新區塊和過去隨機區塊的資料。 如果節點無法給出答案，就會受到處罰。

具有查問機制的去中心化存儲類型：

- Züs
- Skynet
- Arweave
- Filecoin
- Crust Network
- 4EVERLAND

### 去中心化 {#decentrality}

沒有很好的工具來衡量平台的去中心化程度，但一般來說，你會希望使用不具有某種形式的「認識客戶」的工具來提供平台並非中心化的證據。

無「認識客戶」之去中心化工具：

- Skynet
- Arweave
- Filecoin
- 星際檔案系統
- 以太坊
- Crust Network
- 4EVERLAND

### 共識 {#consensus}

這些工具大多有自己的[共識機制](/developers/docs/consensus-mechanisms/)版本，但通常是基於 [**工作量證明 (PoW)**](/developers/docs/consensus-mechanisms/pow/) 或 [**權益證明 (PoS)**](/developers/docs/consensus-mechanisms/pos/)。

基於工作量證明：

- Skynet
- Arweave

基於權益證明：

- 以太坊
- Filecoin
- Züs
- Crust Network

## 相關工具 {#related-tools}

**IPFS - _星際檔案系統 (InterPlanetary File System) 是一種給以太坊使用的去中心化存儲與檔案參考系統。_**

- [Ipfs.io](https://ipfs.io/)
- [文件](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS - _為開發者設計的安全、私有且與 S3 相容的去中心化雲端物件存儲。_**

- [Storj.io](https://storj.io/)
- [文件](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Sia - _利用密碼學建立無需信任的雲端存儲市集，讓買賣雙方可以直接交易。_**

- [Skynet.net](https://sia.tech/)
- [文件](https://docs.sia.tech/)
- [GitHub](https://github.com/SiaFoundation/)

**Filecoin - _Filecoin 由 IPFS 背後的同一個團隊所創建。 此添增一誘因層面於IPFS想法之上._**

- [Filecoin.io](https://filecoin.io/)
- [文件](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave - _Arweave 是一個用來存儲資料的去中心化存儲平台。_**

- [Arweave.org](https://www.arweave.org/)
- [文件](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs - _Züs 是一個具有分片和 blobber 的權益證明去中心化存儲平台。_**

- [zus.network](https://zus.network/)
- [文件](https://docs.zus.network/zus-docs/)
- [GitHub](https://github.com/0chain/)

**Crust Network - _Crust 是建構於 IPFS 之上的去中心化存儲平台。_**

- [Crust.network](https://crust.network)
- [文件](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**Swarm - _為以太坊 web3 堆疊設計的分散式存儲平台與內容分發服務。_**

- [EthSwarm.org](https://www.ethswarm.org/)
- [文件](https://docs.ethswarm.org/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB - _建構於 IPFS 之上的去中心化點對點資料庫。_**

- [OrbitDB.org](https://orbitdb.org/)
- [文件](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _去中心化雲端專案（資料庫、檔案存儲、運算與 DID）。 鏈下和鏈上點對點技術的獨特融合。 IPFS及跨鏈組合性._**

- [Aleph.im](https://aleph.cloud/)
- [文件](https://docs.aleph.cloud/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic - _為資料豐富且具吸引力的應用程式設計，由使用者控制的 IPFS 資料庫存儲。_**

- [Ceramic.network](https://ceramic.network/)
- [文件](https://developers.ceramic.network/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase - _與 S3 相容的去中心化存儲和異地備援 IPFS 釘選服務。 所有透過 Filebase 上傳到 IPFS 的檔案都會自動釘選到 Filebase 基礎設施，並在全球複製 3 份。_**

- [Filebase.com](https://filebase.com/)
- [文件](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND - _一個 Web 3.0 雲端運算平台，整合了存儲、運算和網路核心能力，與 S3 相容，並在 IPFS 和 Arweave 等去中心化存儲網路上提供同步資料存儲。_**

- [4everland.org](https://www.4everland.org/)
- [文件](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido - _一個提供可一鍵部署 IPFS 節點的區塊鏈即服務平台_**

- [Kaleido](https://kaleido.io/)
- [文件](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network - _Spheron 是一個平台即服務 (PaaS)，專為希望在去中心化基礎設施上以最佳效能啟動其應用程式的去中心化應用程式而設計。 它提供開箱即用的運算、去中心化存儲、CDN 與網頁代管服務。_**

- [spheron.network](https://spheron.network/)
- [文件](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

## 延伸閱讀 {#further-reading}

- [什麼是去中心化存儲？](https://coinmarketcap.com/academy/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [破解關於去中心化存儲的五個常見迷思](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_知道一個曾經幫助你學習更多社區或社團資源? 歡迎在本頁自由編輯或添加內容！_

## 相關主題 {#related-topics}

- [開發框架](/developers/docs/frameworks/)
