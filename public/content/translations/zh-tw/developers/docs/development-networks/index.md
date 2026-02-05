---
title: 開發網路
description: 可用於協助構建以太坊應用程式的開發網路和工具的概觀。
lang: zh-tw
---

當使用智慧型合約建立以太坊應用程式時，你需要在本地網路上運行該應用程式，以在部署之前瞭解其的工作原理。

與在電腦上執行本地伺服器進行 Web 開發的方式類似，你可以使用開發網路建立本機區塊鏈執行個體來測試你的去中心化應用程式。 這些以太坊開發網路提供的功能比公共測試網的迭代速度快得多（例如，你不需要從測試網水龍頭取得以太幣）。

## 先決條件 {#prerequisites}

在深入研究開發網路前，您應先了解 [以太坊技術堆疊](/developers/docs/ethereum-stack/) 和 [以太坊網路](/developers/docs/networks/) 的基礎知識。

## 什麼是開發網路？ {#what-is-a-development-network}

開發網路本質上是專為本地開發而設計的以太坊用戶端（以太坊的實作）。

**為什麼不直接在本機執行標準的以太坊節點？**

您_可以_ [執行一個節點](/developers/docs/nodes-and-clients/#running-your-own-node)，但因為開發網路是專為開發而打造的，所以通常會內建許多便利功能，例如：

- 以確定性方式將資料 (例如：具有 ETH 餘額的帳戶) 植入您的本機區塊鏈
- 用接收的每筆交易，依照順序及零延遲即時產生區塊
- 增強的偵錯和日誌記錄功能

## 可用工具 {#available-projects}

**注意**：大多數 [開發框架](/developers/docs/frameworks/) 都包含內建的開發網路。 我們建議從一個框架開始 [設定您的本機開發環境](/developers/local-environment/)。

### Hardhat 網路 {#hardhat-network}

專為開發而設計的本地以太坊網路。 它讓你能夠部署合約、運行測試和偵錯程式碼。

Hardhat 網路內建了 Hardhat，這是一個專業以太坊開發環境。

- [網站](https://hardhat.org/)
- [GitHub](https://github.com/NomicFoundation/hardhat)

### 本機信標鏈 {#local-beacon-chains}

一些共識用戶端具有內建工具，用於啟動本地信標鏈以進行測試。 Lighthouse、Nimbus 和 Lodestar 的說明如下：

- [使用 Lodestar 的本機測試網](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [使用 Lighthouse 的本機測試網](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)

### 公開以太坊測試鏈 {#public-beacon-testchains}

以太坊還有兩個維護中的公共測試實作​​：Sepolia 和 Hoodi。 推薦使用受長期受支援的測試網 Hoodi，任何人都可以自由在其上驗證。 Sepolia 使用許可制的驗證者集合，這意味著在該測試網中沒有面向公衆的心驗證者訪問權限。

- [Hoodi 質押啟動面板](https://hoodi.launchpad.ethereum.org/)

### Kurtosis 以太坊套件 {#kurtosis}

Kurtosis 是一個用於多容器測試環境的構建系統，讓開發者能夠在本地建立區塊鏈網路的可複現執行個體。

以太坊 Kurtosis 套件可用於透過 Docker 或 Kubernetes 快速具現化一個可參數化、高擴展性的私人以太坊測試網。 此套件支援所有主要的執行層 (EL) 和共識層 (CL) 用戶端。 Kurtosis 從容處理代表網路的所有本地端口映射和服務連線，以用於與以太坊核心基礎設施相關的驗證和測試工作流程。

- [以太坊網路套件](https://github.com/kurtosis-tech/ethereum-package)
- [網站](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [說明文件](https://docs.kurtosis.com/)

## 延伸閱讀 {#further-reading}

_知道一個曾經幫助你學習更多社區或社團資源? 歡迎在本頁自由編輯或添加內容！_

## 相關主題 {#related-topics}

- [開發框架](/developers/docs/frameworks/)
- [設定本機開發環境](/developers/local-environment/)
