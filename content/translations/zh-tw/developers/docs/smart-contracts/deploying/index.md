---
title: 部署智慧型合約
description:
lang: zh-tw
---

你需要部署智慧型合約，以供以太坊網路使用者使用。

要部署智慧型合約，只需要傳送一個包含編譯後智慧型合約程式碼的以太坊交易，而無須指定任何接收者。

## 基本資訊 {#prerequisites}

在部署智慧型合約前，你需要理解[以太坊網路](/developers/docs/networks/)、[交易](/developers/docs/transactions/)與[智慧型合約結構](/developers/docs/smart-contracts/anatomy/)。

部署合約同樣需要花費以太幣 (ETH)，因為合約會儲存在區塊鏈上，所以你應該熟悉以太坊的[燃料與手續費](/developers/docs/gas/)。

最後，你需要在部署前編譯合約，所以請確保你已閱讀[編譯智慧型合約](/developers/docs/smart-contracts/compiling/)。

## 如何部署智慧型合約 {#how-to-deploy-a-smart-contract}

### 需要準備: {#what-youll-need}

- 合約的位元組碼是透過[編譯](/developers/docs/smart-contracts/compiling/)產生的
- 可作為燃料的以太幣 – 像其他交易一樣，你需要設定燃料限制，所以請注意合約部署需要比簡單的以太幣傳送花費更多燃料
- 一個部署腳本或外掛程式
- 存取[以太坊節點](/developers/docs/nodes-and-clients/)，你可以透過執行自己的節點、連結公共節點，或透過應用程式介面金鑰使用[節點服務](/developers/docs/nodes-and-clients/nodes-as-a-service/)來存取。

### 部署智慧型合約的步驟 {#steps-to-deploy}

The specific steps involved will depend on the development framework in question. For example, you can check out [Hardhat's documentation on deploying your contracts](https://hardhat.org/guides/deploying.html) or [Foundry's documentation on deploying and verifying a smart contract](https://book.getfoundry.sh/forge/deploying). Once deployed, your contract will have an Ethereum address like other [accounts](/developers/docs/accounts/) and can be verified using [source code verification tools](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## 相關工具 {#related-tools}

**Remix - _Remix 整合開發環境允許開發、部署和管理類似區塊鏈的以太坊智慧型合約_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Web3 開發平台，提供了開發、測試、監控和營運智慧型合約所需的偵錯、可觀察性和基礎架構組件_**

- [tenderly.co](https://tenderly.co/)
- [文件](https://docs.tenderly.co/)
- [Github](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _用於編譯、部署、測試和偵錯以太坊軟體的開發環境_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [合約部署文件](https://hardhat.org/guides/deploying.html)
- [Github](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**Web3 - _使用一條指令輕鬆部署任何合約至任何與以太坊虛擬機相容的區塊鏈_**

- [文件](https://portal.thirdweb.com/deploy/)

## 相關教程 {#related-tutorials}

- [部署你的第一個智慧型合約](/developers/tutorials/deploying-your-first-smart-contract/)_ – 如何在以太坊測試網部署你的第一個智慧型合約。_
- [Hello World | 智慧型合約使用教學](/developers/tutorials/hello-world-smart-contract/) _ – 在以太坊建立與部署基本智慧型合約的簡單使用教學。_
- [與其他 Solidity 合約互動](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– 如何從現有合約部署智慧型合約並與之互動。_
- [如何壓縮智慧型合約大小](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/)_ - 如何壓縮智慧型合約大小至限制以下來降低燃料費_

## 衍生閱讀 {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [利用 Hardhat 來部署合約](https://hardhat.org/guides/deploying.html) - _Nomic Labs_

_認識社區或社團資源能幫助大家學習更多? 歡迎自由編輯或添加於本頁!!_

## 相關主題 {#related-topics}

- [開發架構](/developers/docs/frameworks/)
- [運行一Ethereum節點](/developers/docs/nodes-and-clients/run-a-node/)
- [節點即服務](/developers/docs/nodes-and-clients/nodes-as-a-service)
