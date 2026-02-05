---
title: 部署智慧型合約
description: 了解如何將智能合約部署至以太坊網路，包括先決條件、工具和部署步驟。
lang: zh-tw
---

你需要部署智慧型合約，以供以太坊網路使用者使用。

要部署智慧型合約，只需要傳送一個包含編譯後智慧型合約程式碼的以太坊交易，而無須指定任何接收者。

## 先決條件 {#prerequisites}

在部署智能合約之前，您應先了解 [以太坊網路](/developers/docs/networks/)、[交易](/developers/docs/transactions/) 和 [智能合約的結構](/developers/docs/smart-contracts/anatomy/)。

部署合約也需要花費以太幣 (ETH)，因為它們會儲存在區塊鏈上，所以您應該熟悉以太坊上的 [gas 和費用](/developers/docs/gas/)。

最後，在部署合約之前，您需要先編譯合約，所以請確定您已閱讀有關 [編譯智能合約](/developers/docs/smart-contracts/compiling/) 的內容。

## 如何部署智能合約 {#how-to-deploy-a-smart-contract}

### 您需要準備什麼 {#what-youll-need}

- 您的合約位元組碼 – 這是透過 [編譯](/developers/docs/smart-contracts/compiling/) 產生的
- 可作為燃料的以太幣 – 像其他交易一樣，你需要設定燃料限制，所以請注意合約部署需要比簡單的以太幣傳送花費更多燃料
- 一個部署腳本或外掛程式
- 存取 [以太坊節點](/developers/docs/nodes-and-clients/) 的權限，可以透過執行自己的節點、連線到公用節點，或透過使用 [節點服務](/developers/docs/nodes-and-clients/nodes-as-a-service/) 的 API 金鑰來達成

### 部署智能合約的步驟 {#steps-to-deploy}

所涉具體步驟仰賴所用的開發框架。 例如，您可以查看 [Hardhat 有關部署您的合約的文件](https://hardhat.org/docs/tutorial/deploying) 或 [Foundry 有關部署和驗證智能合約的文件](https://book.getfoundry.sh/forge/deploying)。 部署之後，您的合約將會有一個像其他 [帳戶](/developers/docs/accounts/) 一樣的以太坊地址，並可使用 [原始碼驗證工具](/developers/docs/smart-contracts/verifying/#source-code-verification-tools) 進行驗證。

## 相關工具 {#related-tools}

**Remix - _Remix IDE 允許為以太坊之類的區塊鏈開發、部署和管理智能合約_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Web3 開發平台，提供了開發、測試、監控和營運智能合約所需的偵錯、可觀察性和基礎架構組件_**

- [tenderly.co](https://tenderly.co/)
- [文件](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _一個用於編譯、部署、測試和偵錯您的以太坊軟體的開發環境_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [有關部署您的合約的文件](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _使用單一指令，輕鬆將任何合約部署至任何 EVM 相容鏈_**

- [文件](https://portal.thirdweb.com/deploy/)

**Crossmint - _企業級 Web3 開發平台，可用於部署智能合約、啟用信用卡和跨鏈支付，並使用 API 建立、分發、銷售、儲存和編輯 NFT。_**

- [crossmint.com](https://www.crossmint.com)
- [文件](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [部落格](https://blog.crossmint.com)

## 相關教學 {#related-tutorials}

- [部署您的第一個智能合約](/developers/tutorials/deploying-your-first-smart-contract/) _– 在以太坊測試網路上部署您的第一個智能合約的簡介。_
- [Hello World | 智能合約教學](/developers/tutorials/hello-world-smart-contract/) _– 一個在以太坊上建立和部署基本智能合約的簡易教學。_
- [從 Solidity 與其他合約互動](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– 如何從現有合約部署智能合約並與其互動。_
- [如何縮減您的合約大小](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- 如何縮減您的合約大小，以使其保持在限制之下並節省 gas_

## 延伸閱讀 {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [使用 Hardhat 部署您的合約](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_知道一個曾經幫助你學習更多社區或社團資源? 歡迎在本頁自由編輯或添加內容！_

## 相關主題 {#related-topics}

- [開發框架](/developers/docs/frameworks/)
- [執行以太坊節點](/developers/docs/nodes-and-clients/run-a-node/)
- [節點即服務](/developers/docs/nodes-and-clients/nodes-as-a-service)
