---
title: "部署智能合約"
description: "了解如何將智能合約部署到以太坊網路，包含先決條件、工具和部署步驟。"
lang: zh-tw
---

你需要部署你的智能合約，才能讓以太坊網路的使用者使用它。

要部署智能合約，你只需要發送一筆包含智能合約編譯後程式碼的以太坊交易，且不指定任何接收者。

## 先決條件 {#prerequisites}

在部署智能合約之前，你應該先了解[以太坊網路](/developers/docs/networks/)、[交易](/developers/docs/transactions/)以及[智能合約剖析](/developers/docs/smart-contracts/anatomy/)。

部署合約也需要花費以太幣 (ETH)，因為它們儲存在區塊鏈上，所以你應該熟悉以太坊上的[燃料與手續費](/developers/docs/gas/)。

最後，在部署之前你需要編譯你的合約，因此請確保你已經閱讀過關於[編譯智能合約](/developers/docs/smart-contracts/compiling/)的內容。

## 如何部署智能合約 {#how-to-deploy-a-smart-contract}

### 你需要的東西 {#what-youll-need}

- 你合約的位元組碼 – 這是透過[編譯](/developers/docs/smart-contracts/compiling/)產生的
- 用作燃料的 ETH – 你會像其他交易一樣設定你的 Gas 限制，因此請注意，合約部署需要的燃料比單純的 ETH 轉帳多得多
- 部署指令碼或外掛程式
- 存取[以太坊節點](/developers/docs/nodes-and-clients/)的權限，可以透過執行你自己的節點、連接到公開節點，或是使用[節點服務](/developers/docs/nodes-and-clients/nodes-as-a-service/)的 API 金鑰來達成

### 部署智能合約的步驟 {#steps-to-deploy}

具體步驟將取決於所使用的開發框架。例如，你可以查看 [Hardhat 關於部署合約的文件](https://hardhat.org/docs/tutorial/deploying)或 [Foundry 關於部署與驗證智能合約的文件](https://book.getfoundry.sh/forge/deploying)。一旦部署完成，你的合約將會像其他[帳戶](/developers/docs/accounts/)一樣擁有一個以太坊地址，並且可以使用[原始碼驗證工具](/developers/docs/smart-contracts/verifying/#source-code-verification-tools)進行驗證。

## 相關工具 {#related-tools}

**Remix - _Remix IDE 允許為類似以太坊的區塊鏈開發、部署與管理智能合約_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Web3 開發平台，為開發、測試、監控與營運智能合約提供除錯、可觀測性與基礎設施建構模塊_**

- [tenderly.co](https://tenderly.co/)
- [文件](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _用於編譯、部署、測試與除錯以太坊軟體的開發環境_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [關於部署合約的文件](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _使用單一指令，輕鬆將任何合約部署到任何 EVM 相容鏈_**

- [文件](https://portal.thirdweb.com/deploy/)

**Crossmint - _企業級 Web3 開發平台，用於部署智能合約、啟用信用卡與跨鏈支付，並使用 API 建立、發行、銷售、儲存與編輯 NFT。_**

- [crossmint.com](https://www.crossmint.com)
- [文件](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [部落格](https://blog.crossmint.com)

## 相關教學 {#related-tutorials}

- [部署你的第一個智能合約](/developers/tutorials/deploying-your-first-smart-contract/) _– 介紹如何在以太坊測試網路上部署你的第一個智能合約。_
- [Hello World | 智能合約教學](/developers/tutorials/hello-world-smart-contract/) _– 簡單易懂的教學，教你如何在以太坊上建立與部署基本的智能合約。_
- [從 Solidity 與其他合約互動](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– 如何從現有合約部署智能合約並與之互動。_
- [如何縮小你的合約大小](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- 如何縮減合約大小以保持在限制範圍內並節省燃料_

## 延伸閱讀 {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _歐本齊柏林_
- [使用 Hardhat 部署你的合約](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_知道有哪個社群資源對你有幫助嗎？編輯此頁面並加入它！_

## 相關主題 {#related-topics}

- [開發框架](/developers/docs/frameworks/)
- [執行以太坊節點](/developers/docs/nodes-and-clients/run-a-node/)
- [節點即服務 (Nodes-as-a-service)](/developers/docs/nodes-and-clients/nodes-as-a-service)