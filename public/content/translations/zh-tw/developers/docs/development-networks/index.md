---
title: "開發網路"
description: "開發網路以及可用於協助建立以太坊應用程式的工具概覽。"
lang: zh-tw
---

在建立包含智能合約的[以太坊](/)應用程式時，您會希望在部署之前先在本地網路上執行，以查看其運作情況。

就像您在進行網頁開發時可能會在電腦上執行本地伺服器一樣，您可以使用開發網路建立本地區塊鏈實例來測試您的去中心化應用程式 (dapp)。這些以太坊開發網路提供的功能可讓迭代速度比公共測試網快得多（例如，您不需要處理從測試網水龍頭獲取 ETH 的問題）。

## 先決條件 {#prerequisites}

在深入了解開發網路之前，您應該先了解[以太坊堆疊的基礎知識](/developers/docs/ethereum-stack/)和[以太坊網路](/developers/docs/networks/)。

## 什麼是開發網路？ {#what-is-a-development-network}

開發網路本質上是專為本地開發而設計的以太坊客戶端（以太坊的實作）。

**為什麼不直接在本地執行標準的以太坊節點？**

您_可以_[執行節點](/developers/docs/nodes-and-clients/#running-your-own-node)，但由於開發網路是專為開發而建置的，它們通常包含許多便利的功能，例如：

- 確定性地將資料植入您的本地區塊鏈（例如，具有 ETH 餘額的帳戶）
- 接收到每筆交易時立即產生區塊，按順序且無延遲
- 增強的除錯和日誌記錄功能

## 可用工具 {#available-projects}

**注意**：大多數[開發框架](/developers/docs/frameworks/)都包含內建的開發網路。我們建議從框架開始，以[設定您的本地開發環境](/developers/local-environment/)。

### Hardhat 網路 {#hardhat-network}

專為開發設計的本地以太坊網路。它允許您部署合約、執行測試並為程式碼除錯。

Hardhat 網路內建於 Hardhat 中，這是一個專為專業人士打造的以太坊開發環境。

- [網站](https://hardhat.org/)
- [GitHub](https://github.com/NomicFoundation/hardhat)

### 本地信標鏈 {#local-beacon-chains}

某些共識客戶端具有內建工具，可用於啟動本地信標鏈以進行測試。以下提供萊特豪斯、寧布斯和洛德斯塔的說明：

- [使用洛德斯塔的本地測試網](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [使用萊特豪斯的本地測試網](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)

### 公共以太坊測試鏈 {#public-beacon-testchains}

還有兩個維護中的公共以太坊測試實作：Sepolia 和 Hoodi。建議使用具有長期支援的測試網 Hoodi，任何人都可以自由地在上面進行驗證。Sepolia 使用許可制驗證者集，這意味著此測試網不開放一般存取權限給新的驗證者。

- [Hoodi 質押啟動平台](https://hoodi.launchpad.ethereum.org/)

### Kurtosis 以太坊套件 {#kurtosis}

Kurtosis 是一個用於多容器測試環境的建置系統，使開發人員能夠在本地啟動可重現的區塊鏈網路實例。

以太坊 Kurtosis 套件可用於透過 Docker 或 Kubernetes 快速實例化一個可參數化、高度可擴展且私有的以太坊測試網。該套件支援所有主要的執行層 (EL) 和共識層 (CL) 客戶端。Kurtosis 能妥善處理代表性網路的所有本地連接埠對應和服務連線，以便用於與以太坊核心基礎設施相關的驗證和測試工作流程。

- [以太坊網路套件](https://github.com/kurtosis-tech/ethereum-package)
- [網站](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [文件](https://docs.kurtosis.com/)

## 延伸閱讀 {#further-reading}

_知道有什麼社群資源對您有幫助嗎？編輯此頁面並加入它！_

## 相關主題 {#related-topics}

- [開發框架](/developers/docs/frameworks/)
- [設定本地開發環境](/developers/local-environment/)

## 教學：以太坊上的開發網路與測試環境 {#tutorials}

- [使用多客戶端本地以太坊測試網開發和測試去中心化應用程式 (dapp)](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/) _– 如何使用 Kurtosis 啟動本地多客戶端以太坊測試網，以進行去中心化應用程式 (dapp) 的開發與測試。_