---
title: 去中心化應用程式 (dapp) 開發框架
description: 探索框架的優勢並比較可用的選項。
lang: zh-tw
---

## 框架簡介 {#introduction-to-frameworks}

建置一個完整的去中心化應用程式 (dapp) 需要不同的技術。軟體框架包含了許多所需的功能，或提供簡單的外掛程式系統，讓您挑選想要的工具。

框架提供了許多開箱即用的功能，例如：

- 啟動本地區塊鏈執行個體的功能。
- 編譯和測試智能合約的公用程式。
- 用戶端開發附加元件，可在同一個專案/儲存庫中建置面向使用者的應用程式。
- 連線至以太坊網路並部署合約的設定，無論是部署到本地執行的執行個體，還是以太坊的公共網路之一。
- 去中心化應用程式發佈 - 與 IPFS 等儲存選項整合。

## 先決條件 {#prerequisites}

在深入了解框架之前，我們建議您先閱讀我們對[去中心化應用程式 (dapp)](/developers/docs/dapps/)和[以太坊堆疊](/developers/docs/ethereum-stack/)的簡介。

## 可用的框架 {#available-frameworks}

**Foundry** - **_Foundry 是一個極快、可攜且模組化的以太坊應用程式開發工具包_**

- [安裝 Foundry](https://book.getfoundry.sh/)
- [Foundry 手冊](https://book.getfoundry.sh/)
- [Telegram 上的 Foundry 社群聊天室](https://t.me/foundry_support)
- [Awesome Foundry](https://github.com/crisgarner/awesome-foundry)

**Hardhat -** **_專為專業人士打造的以太坊開發環境。_**

- [hardhat.org](https://hardhat.org)
- [GitHub](https://github.com/nomiclabs/hardhat)

**Ape -** **_專為 Python 開發者、資料科學家和安全專業人員打造的智能合約開發工具。_**

- [文件](https://docs.apeworx.io/ape/stable/)
- [GitHub](https://github.com/ApeWorX/ape)

**Web3j -** **_在 JVM 上開發區塊鏈應用程式的平台。_**

- [首頁](https://www.web3labs.com/web3j-sdk)
- [文件](https://docs.web3j.io)
- [GitHub](https://github.com/web3j/web3j)

**ethers-kt -** **_適用於基於 EVM 區塊鏈的非同步、高效能 Kotlin/Java/Android 函式庫。_**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [範例](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Create Eth App -** **_使用一個指令建立由以太坊驅動的應用程式。提供多種使用者介面 (UI) 框架和去中心化金融 (DeFi) 範本可供選擇。_**

- [GitHub](https://github.com/paulrberg/create-eth-app)
- [範本](https://github.com/PaulRBerg/create-eth-app/tree/develop/templates)

**Scaffold-Eth -** **_適用於 Web3 的 Ethers.js + Hardhat + React 元件和掛鉤 (hooks)：開始建置由智能合約驅動的去中心化應用程式所需的一切。_**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)

**Tenderly -** **_Web3 開發平台，讓區塊鏈開發人員能夠建置、測試、除錯、監控和操作智能合約，並改善 dapp 的使用者體驗 (UX)。_**

- [網站](https://tenderly.co/)
- [文件](https://docs.tenderly.co/)

**The Graph -** **_用於高效查詢區塊鏈資料的 The Graph。_**

- [網站](https://thegraph.com/)
- [教學](/developers/tutorials/the-graph-fixing-web3-data-querying/)

**Alchemy -** **_以太坊開發平台。_**

- [alchemy.com](https://www.alchemy.com/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**NodeReal -** **_以太坊開發平台。_**

- [Nodereal.io](https://nodereal.io/)
- [GitHub](https://github.com/node-real)
- [Discord](https://discord.gg/V5k5gsuE)

**thirdweb SDK -** **_使用我們強大的 SDK 和 CLI 建置可與您的智能合約互動的 Web3 應用程式。_**

- [文件](https://portal.thirdweb.com/sdk/)
- [GitHub](https://github.com/thirdweb-dev/)

**Chainstack -** **_Web3（以太坊及其他）開發平台。_**

- [chainstack.com](https://www.chainstack.com/)
- [GitHub](https://github.com/chainstack)
- [Discord](https://discord.gg/BSb5zfp9AT)

**Crossmint -** **_企業級 Web3 開發平台，讓您能在所有主要鏈、EVM 鏈（及其他鏈）上建置 NFT 應用程式。_**

- [網站](https://www.crossmint.com)
- [文件](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

**Brownie -** **_基於 Python 的開發環境與測試框架。_**

- [文件](https://eth-brownie.readthedocs.io/en/latest/)
- [GitHub](https://github.com/eth-brownie/brownie)
- **Brownie 目前已停止維護**

**歐本齊柏林 SDK -** **_終極智能合約工具包：一套協助您開發、編譯、升級、部署及與智能合約互動的工具。_**

- [歐本齊柏林 Defender SDK](https://docs.openzeppelin.com/defender/sdk)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-sdk)
- [社群論壇](https://forum.openzeppelin.com/c/support/17)
- **歐本齊柏林 SDK 開發已結束**

**Catapulta -** **_多鏈智能合約部署工具，可自動在區塊瀏覽器中進行驗證、追蹤已部署的智能合約並分享部署報告，為 Foundry 和 Hardhat 專案提供隨插即用的支援。_**

- [GitHub](https://github.com/catapulta-sh)

**GoldRush（由 Covalent 提供技術支援）-** **_GoldRush 為開發人員、分析師和企業提供最全面的區塊鏈資料 API 套件。無論您是要建置去中心化金融 (DeFi) 儀表板、錢包、交易機器人、AI 代理還是合規平台，這些資料 API 都能提供快速、準確且對開發人員友善的存取方式，讓您取得所需的重要鏈上資料_**

- [網站](https://goldrush.dev/)
- [文件](https://goldrush.dev/docs/chains/ethereum)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

**Wake -** **_用於合約測試、模糊測試、部署、漏洞掃描和程式碼導覽的多合一 Python 框架。_**

- [首頁](https://getwake.io/)
- [文件](https://ackeeblockchain.com/wake/docs/latest/)
- [GitHub](https://github.com/Ackee-Blockchain/wake)
- [VS Code 擴充功能](https://marketplace.visualstudio.com/items?itemName=AckeeBlockchain.tools-for-solidity)

**Veramo -** **_開源、模組化且與平台無關的框架，讓去中心化應用程式開發人員能輕鬆地將去中心化身分和可驗證憑證建置到他們的應用程式中。_**

- [首頁](https://veramo.io/)
- [文件](https://veramo.io/docs/basics/introduction)
- [GitHub](https://github.com/uport-project/veramo)
- [Discord](https://discord.com/invite/FRRBdjemHV)
- [NPM 套件](https://www.npmjs.com/package/@veramo/core)

## 延伸閱讀 {#further-reading}

_知道有什麼社群資源對您有幫助嗎？編輯此頁面並加入它！_

## 相關主題 {#related-topics}

- [設定本地開發環境](/developers/local-environment/)

## 教學：以太坊上的開發框架 {#tutorials}

- [適合初學者的 Hello World 智能合約 – 全端](/developers/tutorials/hello-world-smart-contract-fullstack/) _– 使用 Hardhat 建置並部署一個 hello world 智能合約，然後將其連接到前端。_