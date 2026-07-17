---
title: "去中心化儲存"
description: "概述什麼是去中心化儲存，以及將其整合到去中心化應用程式 (dapp) 中的可用工具。"
lang: zh-tw
authors: ["派翠克·柯林斯"]
---

與由單一公司或組織營運的中心化伺服器不同，去中心化儲存系統由使用者營運者組成的點對點網路構成，他們各自持有整體資料的一部分，從而建立一個具備彈性的檔案儲存共享系統。這些系統可以存在於基於區塊鏈的應用程式或任何基於點對點的網路中。

以太坊本身就可以作為一個去中心化儲存系統，在所有智能合約的程式碼儲存方面確實如此。然而，當涉及大量資料時，這並非以太坊的設計初衷。該鏈正在穩定增長，但在撰寫本文時，以太坊鏈的大小約為 500GB - 1TB（[取決於用戶端](https://etherscan.io/chartsync/chaindefault)），且網路上的每個節點都需要能夠儲存所有資料。如果該鏈擴展到包含大量資料（例如 5TB），所有節點繼續運行將變得不可行。此外，由於[燃料](/developers/docs/gas)費用，將如此大量的資料部署到主網的成本將會高得令人望而卻步。

由於這些限制，我們需要不同的鏈或方法來以去中心化的方式儲存大量資料。

在考慮去中心化儲存 (dStorage) 選項時，使用者必須牢記幾件事。

- 持久化機制 / 獎勵結構
- 資料保留強制執行
- 去中心化程度
- 共識

## 持久化機制 / 獎勵結構 {#persistence-mechanism}

### 基於區塊鏈 {#blockchain-based}

為了讓一筆資料永久保留，我們需要使用持久化機制。例如，在以太坊上，持久化機制是運行節點時需要考量整條鏈。新的資料片段會附加到鏈的末端，並且鏈會持續增長——這要求每個節點複製所有嵌入的資料。

這被稱為**基於區塊鏈**的持久化。

基於區塊鏈的持久化的問題在於，鏈可能會變得過於龐大，以至於無法切實可行地維護和儲存所有資料（例如，[許多來源](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/)估計網際網路需要超過 40 皆位元組 (Zettabytes) 的儲存容量）。

區塊鏈還必須具有某種獎勵結構。對於基於區塊鏈的持久化，會向驗證者支付費用。當資料被新增到鏈上時，驗證者會因為新增資料而獲得報酬。

具備基於區塊鏈持久化的平台：

- 以太坊
- [Arweave](https://www.arweave.org/)

### 基於合約 {#contract-based}

<strong>基於合約</strong>的持久化的直觀概念是，資料不能由每個節點複製並永久儲存，而是必須透過合約協議來維護。這些是與多個承諾在一段時間內保存某筆資料的節點達成的協議。每當協議到期時，必須為其重新注資或續約，以保持資料的持久化。

在大多數情況下，並非將所有資料儲存在鏈上，而是儲存資料在鏈上位置的雜湊。這樣一來，整條鏈就不需要為了保存所有資料而進行擴展。

具備基於合約持久化的平台：

- [Filecoin](https://docs.filecoin.io/basics/what-is-filecoin)
- [Skynet](https://sia.tech/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust Network](https://crust.network)
- [蜂群](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### 其他考量事項 {#additional-consideration}

IPFS 是一個用於儲存和存取檔案、網站、應用程式及資料的分散式系統。它沒有內建的獎勵機制，但可以與上述任何基於合約的獎勵解決方案結合使用，以實現更長期的持久化。在 IPFS 上持久化資料的另一種方法是使用固定 (pinning) 服務，該服務會為您「固定」您的資料。您甚至可以運行自己的 IPFS 節點並為網路做出貢獻，免費持久化您和/或他人的資料！

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(IPFS 固定服務)_
- [web3.storage](https://web3.storage/) _(IPFS/Filecoin 固定服務)_
- [Infura](https://infura.io/product/ipfs) _(IPFS 固定服務)_
- [IPFS Scan](https://ipfs-scan.io) _(IPFS 固定瀏覽器)_
- [4EVERLAND](https://www.4everland.org/)_（IPFS 固定服務）_
- [Filebase](https://filebase.com) _(IPFS 固定服務)_
- [Spheron Network](https://spheron.network/) _(IPFS/Filecoin 固定服務)_

蜂群 (Swarm) 是一種去中心化資料儲存與分發技術，具備儲存獎勵系統和儲存租金價格預言機。

## 資料保留 {#data-retention}

為了保留資料，系統必須具備某種機制來確保資料被保留。

### 挑戰機制 {#challenge-mechanism}

確保資料被保留的最常見方法之一，是使用某種發布給節點的密碼學挑戰，以確保它們仍然擁有該資料。一個簡單的例子是 Arweave 的存取證明 (proof-of-access)。他們向節點發出挑戰，查看它們是否在最新區塊和過去的隨機區塊中都擁有該資料。如果節點無法給出答案，就會受到懲罰。

具備挑戰機制的去中心化儲存 (dStorage) 類型：

- Züs
- Skynet
- Arweave
- Filecoin
- Crust Network
- 4EVERLAND

### 去中心化程度 {#decentrality}

目前沒有很好的工具來衡量平台的去中心化程度，但一般來說，您會希望使用沒有某種形式的 KYC 的工具，以提供它們並非中心化的證據。

沒有 KYC 的去中心化工具：

- Skynet
- Arweave
- Filecoin
- IPFS
- 以太坊
- Crust Network
- 4EVERLAND

### 共識 {#consensus}

這些工具大多有自己版本的[共識機制](/developers/docs/consensus-mechanisms/)，但通常它們是基於[**工作量證明 (PoW)**](/developers/docs/consensus-mechanisms/pow/)或[**權益證明 (PoS)**](/developers/docs/consensus-mechanisms/pos/)。

基於工作量證明：

- Skynet
- Arweave

基於權益證明：

- 以太坊
- Filecoin
- Züs
- Crust Network

## 相關工具 {#related-tools}

**IPFS - _星際檔案系統 (InterPlanetary File System) 是以太坊的去中心化儲存與檔案參照系統。_**

- [Ipfs.io](https://ipfs.io/)
- [文件](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS - _為開發人員提供安全、私密且相容於 S3 的去中心化雲端物件儲存。_**

- [Storj.io](https://storj.io/)
- [文件](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Sia - _利用密碼學建立一個無須信任的雲端儲存市場，允許買賣雙方直接交易。_**

- [Skynet.net](https://sia.tech/)
- [文件](https://docs.sia.tech/)
- [GitHub](https://github.com/SiaFoundation/)

**Filecoin - _Filecoin 由 IPFS 背後的同一個團隊創建。它是建立在 IPFS 理念之上的獎勵層。_**

- [Filecoin.io](https://filecoin.io/)
- [文件](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave - _Arweave 是一個用於儲存資料的去中心化儲存 (dStorage) 平台。_**

- [Arweave.org](https://www.arweave.org/)
- [文件](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs - _Züs 是一個具備分片和 blobber 的權益證明去中心化儲存 (dStorage) 平台。_**

- [zus.network](https://zus.network/)
- [文件](https://docs.zus.network/zus-docs/)
- [GitHub](https://github.com/0chain/)

**Crust Network - _Crust 是一個建立在 IPFS 之上的去中心化儲存 (dStorage) 平台。_**

- [Crust.network](https://crust.network)
- [文件](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**蜂群 (Swarm) - _為以太坊 Web3 堆疊提供的分散式儲存平台與內容分發服務。_**

- [EthSwarm.org](https://www.ethswarm.org/)
- [文件](https://docs.ethswarm.org/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB - _建立在 IPFS 之上的去中心化點對點資料庫。_**

- [OrbitDB.org](https://orbitdb.org/)
- [文件](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _去中心化雲端專案（資料庫、檔案儲存、運算和去中心化身分 (DID)）。獨特地融合了鏈下與鏈上點對點技術。具備 IPFS 和多鏈相容性。_**

- [Aleph.im](https://aleph.cloud/)
- [文件](https://docs.aleph.cloud/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic - _由使用者控制的 IPFS 資料庫儲存，適用於資料豐富且具吸引力的應用程式。_**

- [Ceramic.network](https://ceramic.network/)
- [文件](https://developers.ceramic.network/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase - _相容於 S3 的去中心化儲存與地理備援 IPFS 固定服務。所有透過 Filebase 上傳至 IPFS 的檔案，都會自動固定到 Filebase 基礎設施，並在全球進行 3 倍複製。_**

- [Filebase.com](https://filebase.com/)
- [文件](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND - _一個整合了儲存、運算和網路核心功能的 Web 3.0 雲端運算平台，相容於 S3，並在 IPFS 和 Arweave 等去中心化儲存網路上提供同步資料儲存。_**

- [4everland.org](https://www.4everland.org/)
- [文件](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido - _一個具備一鍵式 IPFS 節點的區塊鏈即服務 (BaaS) 平台_**

- [Kaleido](https://kaleido.io/)
- [文件](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network - _Spheron 是一個平台即服務 (PaaS)，專為希望在去中心化基礎設施上以最佳效能啟動其應用程式的去中心化應用程式 (dapp) 而設計。它預設提供運算、去中心化儲存、CDN 和網頁代管服務。_**

- [spheron.network](https://spheron.network/)
- [文件](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

**dweb3 - _去中心化網頁的解析器，類似於 eth.limo，支援所有類型且不限於 ENS 和 IPFS。_**

- [dweb3.wtf](https://dweb3.wtf)

**web3compass - _針對由 IPFS + ENS 支援的去中心化網站的搜尋引擎。_**

- [web3compass.net](https://www.web3compass.net/)
- [文件](https://www.web3compass.net/statistics)

## 延伸閱讀 {#further-reading}

- [什麼是去中心化儲存？](https://coinmarketcap.com/academy/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [打破關於去中心化儲存的五個常見迷思](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_知道有哪個社群資源對您有幫助嗎？編輯此頁面並加入它！_

## 相關主題 {#related-topics}

- [開發框架](/developers/docs/frameworks/)