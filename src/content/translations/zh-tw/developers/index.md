---
title: 面向開發者的以太坊資源
description: Ethereum 開發人員指南、資源和工具。
lang: zh-tw
sidebar: true
sidebarDepth: 2
---

# 開發者工具 {#developer-resources}

<div class="featured">Ethereum 開發人員指南、資源和工具。</div>

## 開始使用 {#getting-started}

**正在開發 Ethereum 嗎？你真是來對了！**

想要立即開始編寫程式嗎？ [從這裡開始吧](/zh-tw/build/)。

需要基礎的入門指南嗎？ 查閱我們的[學習資源](/zh-tw/learn/)。

**參考資源**

- [Getting up to speed on Ethereum](https://medium.com/@mattcondon/getting-up-to-speed-on-ethereum-63ed28821bbe) _Aug 7, 2017 - Matt Condon_
- [Ethereum In Depth, Part 1](https://blog.zeppelin.solutions/ethereum-in-depth-part-1-968981e6f833) _May 11, 2018 - Facu Spagnuolo_
- [Ethereum In Depth, Part 2 ](https://blog.zeppelin.solutions/ethereum-in-depth-part-2-6339cf6bddb9) _July 24, 2018 - Facu Spagnuolo_
- [Ethereum Development Walkthrough, Parts 1-5](https://hackernoon.com/ethereum-development-walkthrough-part-1-smart-contracts-b3979e6e573e) _Jan 14, 2018 - dev_zl_
- [Ethereum 101, Parts 1-7](https://kauri.io/collection/5bb65f0f4f34080001731dc2/ethereum-101) _Feb 13, 2019 - Wil Barnes_
- [Full Stack Hello World Voting Ethereum Dapp Tutorial ](https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2) _Jan 18, 2017 - Mahesh Murthy_
- [Mastering Ethereum - A comprehensive textbook available for free online](https://github.com/ethereumbook/ethereumbook) _Dec 1, 2018 - Andreas Antonopoulos & Gavin Wood_
- [Ethereum Developer Portal - Everything you need to get started building on Ethereum](https://ethereum.consensys.net/ethereum-dev-portal) _Updated often - ConsenSys_
- [Deconstructing a Solidity Contract](https://blog.zeppelin.solutions/deconstructing-a-solidity-contract-part-i-introduction-832efd2d7737) _Aug 13, 2018 - Alejandro Santander & Leo Arias_
- [Full Stack Dapp Tutorial Series ](https://kauri.io/collection/5b8e401ee727370001c942e3) _Updated Often - Joshua Cassidy_

## 智慧合約語言 {#smart-contract-languages}

任何在以太坊虛擬機 (EVM) 上運行的程式通常被稱作「智慧合約」。 在 Ethereum 上最常用來編寫智慧合約的語言有 **Solidity** 和 **Vyper**，[另外也有其他正在開發中的語言](https://github.com/ConsenSys/ethereum-developer-tools-list#smart-contract-languages)。

Solidity ** 以太坊上最受歡迎的智慧合約語言，靈感來自 C++、Python 和 Javascript**。

- [文件](https://solidity.readthedocs.io)
- [Github](https://github.com/ethereum/solidity/)
- [Solidity Gitter Chatroom](https://gitter.im/ethereum/solidity/)

**Vyper -** **_基於 Python 的以太坊程式語言，致力於提升安全性_**

- [文件](https://vyper.readthedocs.io)
- [Github](https://github.com/ethereum/vyper)
- [Vyper Gitter 聊天室](https://gitter.im/ethereum/vyper)

**尋找其他語言？**

- [Ethereum 開發人員工具清單 #SmartContractLanguages](https://github.com/ConsenSys/ethereum-developer-tools-list#smart-contract-languages)

## 特定開發語言資源 {#language-specific-resources}

我們正在構建一套特定語言的首頁，以供開發人員用其喜歡的程式語言來了解以太坊。

- [面向 Java 開發者的以太坊資源](/zh-tw/java/)
- [面向 Python 開發者的以太坊資源](/zh-tw/python/)
- [面向 JavaScript 開發者的以太坊資源](/zh-tw/javascript/)
- [面向 Go 開發者的以太坊資源](/zh-tw/golang/)
- [面向 Rust 開發者的以太坊資源](/zh-tw/rust/)
- [面向 .NET 開發者的以太坊資源](/zh-tw/dot-net/)
- 敬請期待更多更新！ 沒看到你使用的語言資源？ [點擊這裡提交問題](https://github.com/ethereum/ethereum-org-website/issues/new/choose)!

## 開發者工具 {#developer-tools}

以太坊社群提供了數量眾多且持續增長的開發工具，幫助開發者搭建、測試和部署應用程式。 以下是最受以太坊開發者歡迎的工具，可以從這裡開始。 如果想要進一步探索，請查詢[開發工具列表](https://github.com/ConsenSys/ethereum-developer-tools-list)。

### 工具框架 {#frameworks}

**Truffle -** **_開發環境、測試框架、部署通道及其他工具。 _**

- [trufflesuite.com](https://www.trufflesuite.com/)
- [GitHub](https://github.com/trufflesuite/truffle)

**Embark -** **_開發環境、測試框架，以及整合了以太坊、IPFS 和 Whisper 的其他工具。 _**

- [文件](https://embark.status.im/docs/)
- [GitHub](https://github.com/embark-framework/embark)

**Waffle -** **_高階智慧合約開發和測試的框架 (基於 ethers.js)。 _**

- [getwaffle.io](https://getwaffle.io/)
- [GitHub](https://github.com/EthWorks/Waffle)

**Etherlime -** **_基於 Ethers.js 的框架，用於去中心化應用程式開發（Solidity 和 Vyper）、部署、調試、測試等。 _**

- [文件](https://etherlime.readthedocs.io/en/latest/)
- [GitHub](https://github.com/LimeChain/etherlime)

### 其他工具 {#other-tools}

**Hardhat -** **_以太坊智慧合約開發者的任務運行工具。 _**

- [hardhat.org](https://hardhat.org)
- [GitHub](https://github.com/nomiclabs/hardhat)

**OpenZeppelin SDK -** **_終極智慧合約工具包：一套幫助您開發、編譯、升級、部署智慧合約並與之互動的工具。 _**

- [OpenZeppelin SDK](https://openzeppelin.com/sdk/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-sdk)
- [社區論壇](https://forum.openzeppelin.com/c/sdk)

**The Graph -** **_用於為以太坊和 IPFS 數據建立索引並使用 GraphQL 對其進行查詢的協議。 _**

- [The Graph](https://thegraph.com/)
- [Graph Explorer](https://thegraph.com/explorer/)
- [文件](https://thegraph.com/docs/)
- [GitHub](https://github.com/graphprotocol/)
- [Discord](https://thegraph.com/discord)

**Tenderly -** **_用錯誤追蹤、警報、性能指標和詳細的合約分析來輕鬆監測您的智慧合約的平台。 _**

- [tenderly.dev](https://tenderly.dev/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Python Tooling -** **_通過 Python 進行以太坊互動的各種工具。 _**

- [py.ethereum.org](http://python.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py 聊天室](https://gitter.im/ethereum/web3.py)

**Brownie -** **_基於 Python 的開發環境與測試框架_**

- [文件](https://eth-brownie.readthedocs.io/en/latest/)
- [GitHub](https://github.com/eth-brownie/brownie)

**web3j -** **_以太坊的 Java/Android/Kotlin/Scala 函式庫。 _**

- [web3j.io](https://web3j.io)
- [GitHub](https://github.com/web3j/web3j)
- [文件](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

**One Click Dapp -** **_直接從 ABI 生成一個前端介面進行快速開發和測試。 _**

- [OneClickDapp.com](https://oneclickdapp.com)
- [Truffle 插件](https://npmjs.org/package/oneclick)
- [Remix 插件](https://github.com/pi0neerpat/remix-plugin-one-click-dapp)
- [GitHub](https://github.com/pi0neerpat/one-click-dapp)

**尋找其他語言？**

- [以太坊開發者工具詳表 #框架](https://github.com/ConsenSys/ethereum-developer-tools-list#frameworks)

## 整合開發環境 (IDE) {#integrated-development-environments-ides}

**Ethereum Studio -** **_基於網頁的 IDE，是希望嘗試智慧合約的新開發者的理想選擇。 Ethereum Studio 有多個模板,MetaMask 集 成,交易日誌記錄器,和一個內置 的瀏覽器以太坊虛擬機 (EVM),幫助您盡快開始在以太坊上搭建。_**

- [studio.ethereum.org](/en/studio/)
- [superblocks.com/ethereum-studio](https://superblocks.com/ethereum-studio)
- [GitHub](https://github.com/SuperblocksHQ/ethereum-studio)

**Visual Studio Code -** **_以太坊官方支持的專業跨平台 IDE。_**

- [Visual Studio Code](https://code.visualstudio.com/)
- [Azure Blockchain 以太坊開發工具包](https://marketplace.visualstudio.com/items?itemName=AzBlockchain.azure-blockchain)
- [Azure Blockchain Workbench 插件](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/microsoft-azure-blockchain.azure-blockchain-workbench?tab=Overview)
- [代碼示例](https://github.com/Azure-Samples/blockchain/blob/master/blockchain-workbench/application-and-smart-contract-samples/readme.md)
- [GitHub](https://github.com/microsoft/vscode)

**Remix -** **_基於網頁的 IDE，內置靜態分析和區塊鏈測試虛擬機。_**

- [remix.ethereum.org](https://remix.ethereum.org/)

**EthFiddle -** **_基於網頁的 IDE，使您能編寫、編譯和調試智慧合約。_**

- [ethfiddle.com](https://ethfiddle.com/)
- [Gitter](https://gitter.im/loomnetwork/ethfiddle)

**尋找其他語言？**

- [以太坊開發者工具詳表 #IDE](https://github.com/ConsenSys/ethereum-developer-tools-list#ides)

## 前端 JavaScript API {#frontend-javascript-apis}

**Web3.js -** **_以太坊 JavaScript API_**

- [文件](https://web3js.readthedocs.io/en/1.0/)
- [GitHub](https://github.com/ethereum/web3.js/)

**Ethers.js -** **_JavaScript 和 TypeScript 中完整的以太坊錢包實現和實用工具。_**

- [文件](https://docs.ethers.io/ethers.js/html/)
- [GitHub](https://github.com/ethers-io/ethers.js/)

**Web3.js -** **_針對輕客戶端優化的高級響應式 JS 庫。_**

- [文件](https://paritytech.github.io/js-libs/light.js/)
- [GitHub](https://github.com/paritytech/js-libs/tree/master/packages/light.js)

**Web3-wrapper -** **_ 可替代 Web3.js 的 Typescript。_**

- [文件](https://0x.org/docs/web3-wrapper#introduction)
- [GitHub](https://github.com/0xProject/0x-monorepo/tree/development/packages/web3-wrapper)

**尋找其他語言?**

- [以太坊開發者工具詳表 #前端以太坊 API](https://github.com/ConsenSys/ethereum-developer-tools-list#frontend-ethereum-apis)

## 後端 API {#backend-apis}

**Infura -** **_以太坊 API 即服务。_**

- [infura.io](https://infura.io)
- [文件](https://infura.io/docs)
- [GitHub](https://github.com/INFURA)

**Cloudflare 以太坊網關**

- [cloudflare-eth.com](https://cloudflare-eth.com)

**Nodesmith -** **_JSON-RPC API 造訪以太坊主網和測試網。_**

- [nodesmith.io](https://nodesmith.io/network/ethereum/)
- [文件](https://nodesmith.io/docs/#/ethereum/apiRef)

**Chainstack -** **_共享及專用的以太坊節點即服務。_**

- [chainstack.com](https://chainstack.com)
- [文件](https://docs.chainstack.com)

## 存儲 {#storage}

**IPFS -** **_星際文件系統（InterPlanetary File System）是以太坊的去中心化存儲和文件引用系統。_**

- [ipfs.io](https://ipfs.io/)
- [文件](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Swarm -** **_以太坊 web3 堆棧的分佈式存儲平台和內容分發服務。_**

- [Swarm](https://ethersphere.github.io/swarm-home/)
- [GitHub](https://github.com/ethersphere/swarm)

**OrbitDB -** **_基於 IPFS 的去中心化點對點數據庫。_**

- [文件](https://github.com/orbitdb/field-manual)
- [GitHub](https://github.com/orbitdb/orbit-db)

## 安全工具 {#security-tools}

### 智能合約安全 {#smart-contract-security}

**Slither -** **_用 Python 3 編寫的 Solidity 靜態分析框架。_**

- [GitHub](https://github.com/crytic/slither)

**MythX -** **_以太坊智能合約的安全分析 API。_**

- [mythx.io](https://mythx.io/)
- [文件](https://docs.mythx.io/en/latest/)

**Mythril -** **_EVM 字節碼安全分析工具。_**

- [mythril](https://github.com/ConsenSys/mythril)
- [文件](https://smartcontract.codes/) _用於搜索經過驗證的 Solidity 源代碼的搜索引擎。_

**SmartContract.codes -** **_用於搜索經過驗證的 Solidity 源代碼的搜索引擎。_**

- [smartcontract.codes (alpha)](https://smartcontract.codes/)
- [文件](https://github.com/ethereum-play/smartcontract.codes/blob/master/README.md)

**Manticore -** **_在智能合約和二進製文件上使用符號執行工具的命令行界面。_**

- [GitHub](https://github.com/trailofbits/manticore)
- [文件](https://github.com/trailofbits/manticore/wiki)

**Securify -** **_以太坊智能合約安全分析工具。_**

- [securify.chainsecurity.com](https://securify.chainsecurity.com/)
- [Discord](https://discordapp.com/invite/nN77ckb)

**ERC20 Verifier -** **_用於檢查合約是否符合 ERC20 標準的驗證工具。_**

- [erc20-verifier.openzeppelin.com](https://erc20-verifier.openzeppelin.com)
- [論壇](https://forum.openzeppelin.com/t/online-erc20-contract-verifier/1575)

### 形式化驗證 {#formal-verification}

**有關形式化驗證的信息**

- [How formal verification of smart-contacts works](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/) _July 20, 2018 - Brian Marick_
- [How Formal Verification Can Ensure Flawless Smart Contracts](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1) _Jan 29, 2018 - Bernard Mueller_

**尋找其他語言？**

- [以太坊開發者工具詳表 #安全工具](https://github.com/ConsenSys/ethereum-developer-tools-list#security-tools)

## 測試工具 {#testing-tools}

**Solidity-Coverage -** **_替代性 Solidity 代碼覆蓋工具。_**

- [GitHub](https://github.com/sc-forks/solidity-coverage)

**hevm -** **_以太坊虛擬機實現，專門用於單元測試以及調試智能合約。_**

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)
- [DappHub 聊天室](https://dapphub.chat/)

**Whiteblock Genesis -** **_端到端開髮沙盒和區塊鏈測試平台。_**

- [Whiteblock.io](https://whiteblock.io)
- [文件](https://docs.whiteblock.io)
- [GitHub](https://github.com/whiteblock/genesis)

**尋找其他語言？**

- [以太坊開發者工具詳表 #測試工具](https://github.com/ConsenSys/ethereum-developer-tools-list#testing-tools)

## 區塊鏈瀏覽器 {#block-explorers}

區塊瀏覽器為以太坊用戶提供瀏覽以太坊區塊鏈（及其測試網）的服務，可以查詢特定交易、區塊、合約以及其他鏈上活動的信息。

- [Etherscan](https://etherscan.io/)
- [Blockscout](https://blockscout.com/)
- [Etherchain](https://www.etherchain.org/)

## 測試網和水龍頭 {#testnets-and-faucets}

以太坊社區維護了多個測試網。 這些工具使得開發者能夠在應用程序部署到以太坊主網之前對其進行不同條件下的測試。

**Ropsten -** **_工作量證明（PoW）區塊鏈，可以挖掘測試以太幣。_**

- [測試以太幣水龍頭](https://faucet.ropsten.be/)

**Rinkeby -** **_權威證明 (PoA) 區塊鏈，由 Geth 開發團隊維護。_**

- [測試以太幣水龍頭](https://faucet.rinkeby.io/)
- [通用水龍頭](https://faucets.blockxlabs.com)

**Goerli -** **_跨客戶端權威證明區塊鏈，由 Goerli 社區構建和維護。_**

- [測試以太幣水龍頭](https://faucet.goerli.mudit.blog/)
- [goerli.net](https://goerli.net/)
- [通用水龍頭](https://faucets.blockxlabs.com)

## 客戶端以及運行您自己的節點 {#clients--running-your-own-node}

以太坊網絡由許多節點組成，它們各自運行兼容的客戶端。 它們中的大部分都運行[Geth](https://geth.ethereum.org/) 或[Parity ](https://www.parity.io/ethereum/)，每個節點都可以根據自己的實際需求調整不同的配置。

### 客戶端 {#clients}

**Geth -** **_用 Go 語言編寫的以太坊客戶端。_**

- [GitHub](https://github.com/ethereum/go-ethereum)
- [Discord 聊天室](https://discordapp.com/invite/nthXNEv)

**Geth -** **_用 Rust 語言編寫的以太坊客戶端。_**

- [parity.io](https://www.parity.io/)
- [GitHub](https://github.com/paritytech/parity-ethereum)

**Geth -** **_用 Java 語言編寫的以太坊客戶端。_**

- [pegasys.tech](http://pegasys.tech)
- [GitHub](https://github.com/PegaSysEng/pantheon/)

**Nethermind -** **_用 C# .NET 核心編寫的以太坊客戶端。_**

- [Nethermind.io](http://nethermind.io/)
- [GitHub](https://github.com/NethermindEth/nethermind)
- [Gitter](https://gitter.im/nethermindeth/nethermind)

### 運行您自己的節點 {#running-your-own-node}

**Ethnode -** **_運行一個以太坊節點（Geth 或 Parity）用於本地開發。_**

- [GitHub](https://github.com/vrde/ethnode)

**以太坊節點資源**

- [節點配置速查表](https://dev.to/5chdn/ethereum-node-configuration-modes-cheat-sheet-25l8) _2019 年 1 月 5 日-Afri Schoeden_
  **尋找其他語言？**
  - [以太坊開發者工具詳表 #以太坊客戶端](https://github.com/ConsenSys/ethereum-developer-tools-list#ethereum-clients)

## 最佳實踐、模式和反模式 {#best-practices-patterns-and-anti-patterns}

### 智慧型合約 {#smart-contracts}

**DappSys -** **_安全、簡單、靈活的智能合約構建區塊。_**

- [dapp.tools/dappsys](https://dapp.tools/dappsys/)
- [GitHub](https://github.com/dapphub/dappsys)
  **OpenZeppelin Contracts -** **_安全的智能合約開發庫。_**
- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [社區論壇](https://forum.openzeppelin.com/c/contracts)
  **aragonOS -** **_可升級性模式與權限控制。_**
- [hack.aragon.org](https://hack.aragon.org/docs/aragonos-intro.html#aragonos-provides-the-following-functionality)
- [文件](https://wiki.aragon.org/)
  **智能合約漏洞登記**
- [SWC 登記](https://smartcontractsecurity.github.io/SWC-registry/)
- [GitHub](https://github.com/SmartContractSecurity/SWC-registry)

### 安全性 {#security}

**智能合約安全最佳實踐指南**

- [consensys.github.io/smart-contract-best-practices/](https://consensys.github.io/smart-contract-best-practices/)
- [GitHub](https://github.com/ConsenSys/smart-contract-best-practices/)
- [安全性建議和最佳實踐合集](https://github.com/guylando/KnowledgeLists/blob/master/EthereumSmartContracts.md)
  **智能合約安全驗證標準 (SCSVS)**
- [securing.github.io/SCSVS/](https://securing.github.io/SCSVS/)
  **尋找其他語言？**
- [以太坊開發者工具詳表 #模式—最佳實踐](https://github.com/ConsenSys/ethereum-developer-tools-list#patterns--best-practices)

## 開發者支持與培訓 {#developer-support--training}

### 一般學習 {#general-learning}

**以太坊 Stack Exchange**

- [ethereum.stackexchange.com](https://ethereum.stackexchange.com/)
  **ConsenSys Academy -** **_可自定義進度並且全年開放的以太坊端到端開發者課程。_**
- [consensys.academy](https://consensys.net/academy/ondemand/)
  **Solidity Gitter Chatroom**
- [gitter.im/ethereum/solidity](https://gitter.im/ethereum/solidity/)
  **以太坊 Gitter 聊天室大廳**
- [gitter.im/ethereum/home](https://gitter.im/ethereum/home)
  **Chainshot -** **_基於網頁的去中心化應用程序編碼教程。_**
- [chainshot.com](https://www.chainshot.com/)
  **Blockgeeks -** **_區塊鏈技術在線課程。_**
- [courses.blockgeeks.com](https://courses.blockgeeks.com/)
  **DappUniversity -** **_學習如何在以太坊區塊鏈上搭建去中心化應用程序。_**
- [DappUniversity.com](http://www.dappuniversity.com/)
  **B9lab Academy -** **_最早的專業以太坊去中心化應用程序開發者課程與審計和質保進修課程主頁。 包含 指導及代碼審查。_**
- [academy.b9lab.com](https://academy.b9lab.com)

### 基於遊戲的學習 {#game-based-learning}

**Cryptozombies -** **_學習如何在以太坊上開發遊戲。_**

- [Cryptozombies.io](https://cryptozombies.io/zh/solidity)
  **Ethernaut -** **_基於 Solidity 的野戰遊戲，破解合約即可升級。_**
- [ethernaut.openzeppelin.com](https://ethernaut.openzeppelin.com/)
  **Capture the Ether -** **_以太坊智能合約安全遊戲。_**
- [capturetheether.com](https://capturetheether.com/)

## UI / UX 設計 {#uiux-design}

- [Challenge of UX in Ethereum](https://medium.com/ecf-review/challenge-of-ux-in-ethereum-122e1a33688d) _June 25, 2018 - Anna Rose_
- [Designing for blockchain: what’s different and what’s at stake](https://media.consensys.net/designing-for-blockchain-whats-different-and-what-s-at-stake-b867eeade1c9) _March 22, 2018 - Sarah Baker Mills_
  **Rimble UI** **_- 去中心化應用程序的自適應組件和設計標準。_**
- [rimble.consensys.design](https://rimble.consensys.design)
- [GitHub](https://github.com/ConsenSys/rimble-ui)

## 標準 {#standards}

以太坊社區採納了許多對開發者有幫助的標準。 通常，這些標準稱為[以太坊改進提案](http://eips.ethereum.org/) (EIP)，由社區成員通過[標準的討論過程](http://eips. ethereum.org/EIPS/eip-1)確定。

- [EIP 列表](http://eips.ethereum.org/)
- [EIP github 代碼庫](https://github.com/ethereum/EIPs)
- [EIP 討論板](https://ethereum-magicians.org/c/eips)
- [Ethereum Governance Overview](https://blog.bmannconsulting.com/ethereum-governance/) _March 31, 2019 - Boris Mann_
- [Playlist of all Ethereum Core Dev Meetings](https://www.youtube.com/playlist?list=PLaM7G4Llrb7zfMXCZVEXEABT8OSnd4-7w) _(YouTube Playlist)_
  某些 EIP 與應用層規範相關（例如智能合約標準格式），這類規範被稱為[以太坊意見徵求(ERC)](https://eips.ethereum.org/erc)。 許多 ERC 是以太坊生態系統中被廣泛使用的關鍵標準。
- [ERC 列表](http://eips.ethereum.org/erc)
- [ERC20 - 標准通證接口](https://eips.ethereum.org/EIPS/eip-20)
- [ERC721 - 非同質化通證 (NFT) 標準接口](https://eips.ethereum.org/EIPS/eip-721)
