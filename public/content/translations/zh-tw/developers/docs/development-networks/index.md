---
title: 開發網路
description: 可用於協助構建以太坊應用程式的開發網路和工具的概觀。
lang: zh-tw
---

當使用智慧型合約建立以太坊應用程式時，你需要在本地網路上運行該應用程式，以在部署之前瞭解其的工作原理。

與在電腦上執行本地伺服器進行 Web 開發的方式類似，你可以使用開發網路建立本機區塊鏈執行個體來測試你的去中心化應用程式。 這些以太坊開發網路提供的功能比公共測試網的迭代速度快得多（例如，你不需要從測試網水龍頭取得以太幣）。

## 基本資訊 {#prerequisites}

在深入瞭解開發網路之前，應該先瞭解[以太坊堆疊的基礎知識](/developers/docs/ethereum-stack/)和[以太坊網路](/developers/docs/networks/)。

## 什麼是開發網路？ {#what-is-a-development-network}

開發網路本質上是專為本地開發而設計的以太坊用戶端（以太坊的實作）。

**為什麼不在本地運行一個標準的以太坊節點呢？**

你_可以_[運行節點](/developers/docs/nodes-and-clients/#running-your-own-node)，但由於開發網路是專門為開發而建立，它們往往會具有一些快速方便的功能，例如：

- 確定性地用資料植入你的本地區塊鏈（例如具有以太幣餘額的帳戶）
- 用接收的每筆交易，依照順序及零延遲即時產生區塊
- 增強的偵錯和日誌記錄功能

## 可用工具 {#available-projects}

**注意**：大多數[開發架構](/developers/docs/frameworks/)包含一個內建開發網路。 推薦你從一個架構開始[設定你的本地開發環境](/developers/local-environment/)。

### Hardhat 網路 {#hardhat-network}

專為開發而設計的本地以太坊網路。 它讓你能夠部署合約、運行測試和偵錯程式碼。

Hardhat 網路內建了 Hardhat，這是一個專業以太坊開發環境。

- [官網](https://hardhat.org/)
- [GitHub](https://github.com/nomiclabs/hardhat)

### 本地信標鏈 {#local-beacon-chains}

一些共識用戶端具有內建工具，用於啟動本地信標鏈以進行測試。 Lighthouse、Nimbus 和 Lodestar 的說明如下：

- [使用 Lodestar 的本地測試網](https://chainsafe.github.io/lodestar/usage/local/)
- [使用 Lighthouse 的本地測試網](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)
- [使用 Nimbus 的本地測試網](https://github.com/status-im/nimbus-eth1/blob/master/fluffy/docs/local_testnet.md)

### 公共以太坊測試鏈 {#public-beacon-testchains}

以太坊還有兩個維護中的公共測試實作​​：Goerli 和 Sepolia。 推薦使用受長期受支援的測試網 Goerli，任何人都可以自由在其上驗證。 Sepolia 是一個較新、規模較小的測試鏈，預計在可見未來也會得到維護。Sepolia 上有獲得許可的驗證者集，這意味著不可以對此測試網上的新驗證者進行常規存取。 Ropsten 鏈預計將於 2022 年第四季棄用，Rinkeby 鏈預計將於 2023 年第二/第三季棄用。

- [Goerli 質押啟動面板](https://goerli.launchpad.ethereum.org/)
- [Ropsten、Rinkeby 和 Kiln 棄用公告](https://blog.ethereum.org/2022/06/21/testnet-deprecation)

### Kurtosis 以太坊套件 {#kurtosis}

Kurtosis 是一個用於多容器測試環境的構建系統，讓開發者能夠在本地建立區塊鏈網路的可複現執行個體。

以太坊 Kurtosis 套件可用於透過 Docker 或 Kubernetes 快速具現化一個可參數化、高擴展性的私人以太坊測試網。 此套件支援所有主要的執行層 (EL) 和共識層 (CL) 用戶端。 Kurtosis 從容處理代表網路的所有本地端口映射和服務連線，以用於與以太坊核心基礎設施相關的驗證和測試工作流程。

- [以太坊網路套件](https://github.com/kurtosis-tech/ethereum-package)
- [網站](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [文件](https://docs.kurtosis.com/)

## 衍生閱讀 {#further-reading}

_知道對你有幫助的社群資源嗎？ 請編輯此頁面並新增資源！_

## 相關主題 {#related-topics}

- [開發架構](/developers/docs/frameworks/)
- [設定本地開發環境](/developers/local-environment/)
