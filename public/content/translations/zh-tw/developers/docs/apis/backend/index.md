---
title: 後端應用程式介面程式庫
description: 讓你能夠從應用程式與區塊鏈互動的以太坊用戶端應用程式介面簡介。
lang: zh-tw
---

為了讓軟體應用程式能與以太坊區塊鏈互動（即讀取區塊鏈資料和/或向網路傳送交易），它必須連接到以太坊節點。

為此目的，每個以太坊用戶端都實作了 [JSON-RPC](/developers/docs/apis/json-rpc/) 規範，所以有一組統一的[方法](/developers/docs/apis/json-rpc/#json-rpc-methods)可供應用程式依賴。

如果你想用特定程式設計語言連結以太坊節點，生態系統中有很多便利的程式庫幫助你更輕易完成。 借助這些程式庫，開發者可以編寫直覺的單行方法來初始化與以太坊互動的 JSON-RPC 請求（在後台）。

## 先決條件 {#prerequisites}

了解[以太坊技術堆疊](/developers/docs/ethereum-stack/)和[以太坊用戶端](/developers/docs/nodes-and-clients/)可能會有所幫助。

## 為何使用程式庫？ {#why-use-a-library}

這些程式庫顯著降低了直接和以太坊節點互動的複雜度。 它們也提供公用程式函式（例如將 ETH 轉換為 Gwei），因此作為開發者，您可以花費較少時間處理以太坊用戶端的複雜細節，並將更多時間專注於應用程式的獨特功能。

## 可用函式庫 {#available-libraries}

### 基礎設施和節點服務 {#infrastructure-and-node-services}

**Alchemy -** **_以太坊開發平台。_**

- [alchemy.com](https://www.alchemy.com/)
- [文件](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**All That Node -** **_節點即服務。_**

- [All That Node.com](https://www.allthatnode.com/)
- [文件](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast by Bware Labs -** **_以太坊主網和測試網的去中心化應用程式介面。_**

- [blastapi.io](https://blastapi.io/)
- [文件](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_提供更有效率、更快速的 RPC 服務_**

- [blockpi.io](https://blockpi.io/)
- [文件](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare 以太坊網關.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - 區塊瀏覽器和交易應用程式介面**

- [文件](https://docs.etherscan.io/)

**Blockscout - 開源區塊鏈瀏覽器**

- [文件](https://docs.blockscout.com/)

**GetBlock -** **_用於 Web3 開發的區塊鏈即服務_**

- [GetBlock.io](https://getblock.io/)
- [文件](https://docs.getblock.io/)

**Infura -** **_以太坊應用程式介面即服務。_**

- [infura.io](https://infura.io)
- [文件](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _高性價比的 EVM JSON-RPC 供應商_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [文件](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _全節點與區塊鏈瀏覽器。_**

- [NOWNodes.io](https://nownodes.io/)
- [文件](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_區塊鏈基礎設施即服務。_**

- [quicknode.com](https://quicknode.com)
- [文件](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_由開源軟體支援的以太坊和以太坊經典應用程式介面即服務。_**

- [rivet.cloud](https://rivet.cloud)
- [文件](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_速度導向的以太坊節點，提供 JSON-RPC/WebSockets API。_**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [文件](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### 開發工具 {#development-tools}

**ethers-kt -** **_適用於 EVM 區塊鏈的非同步、高效能 Kotlin/Java/Android 程式庫。_**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [範例](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_適用於區塊鏈的開源 .NET 整合函式庫。_**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [文件](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Python 工具 -** **_透過 Python 與以太坊互動的各種函式庫。_**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py 聊天室](https://gitter.im/ethereum/web3.py)

**Tatum -** **_終極的區塊鏈開發平台。_**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [文件](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**web3j -** **_適用於以太坊的 Java/Android/Kotlin/Scala 整合函式庫。_**

- [GitHub](https://github.com/web3j/web3j)
- [文件](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### 區塊鏈服務 {#blockchain-services}

**BlockCypher -** **_以太坊網站應用程式介面。_**

- [blockcypher.com](https://www.blockcypher.com/)
- [文件](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_適用於以太坊的全方位 Web3 資料基礎設施。_**

- [chainbase.com](https://chainbase.com/)
- [文件](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_彈性且專用的以太坊節點即服務。_**

- [chainstack.com](https://chainstack.com)
- [文件](https://docs.chainstack.com/)
- [以太坊 API 參考](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node -** **_區塊鏈基礎設施 API。_**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [文件](https://docs.cdp.coinbase.com/)

**DataHub by Figment -** **_提供以太坊主網與測試網的 Web3 API 服務。_**

- [DataHub](https://www.figment.io/)
- [文件](https://docs.figment.io/)

**Moralis -** **_企業級 EVM API 供應商。_**

- [moralis.io](https://moralis.io)
- [文件](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [論壇](https://forum.moralis.io/)

**NFTPort -** **_以太坊資料與鑄造 API。_**

- [nftport.xyz](https://www.nftport.xyz/)
- [文件](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_通用多重加密貨幣區塊鏈 API 平台。_**

- [services.tokenview.io](https://services.tokenview.io/)
- [文件](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_提供存取以太坊區塊鏈的簡易可靠 API。_**

- [Watchdata](https://watchdata.io/)
- [文件](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Covalent -** **_為 200 多條鏈提供的強化版區塊鏈 API。_**

- [covalenthq.com](https://www.covalenthq.com/)
- [文件](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

## 延伸閱讀 {#further-reading}

_知道一個曾經幫助你學習更多社區或社團資源? 歡迎在本頁自由編輯或添加內容！_

## 相關主題 {#related-topics}

- [節點和用戶端](/developers/docs/nodes-and-clients/)
- [開發框架](/developers/docs/frameworks/)

## 相關教學 {#related-tutorials}

- [設定 Web3js 以在 JavaScript 中使用以太坊區塊鏈](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– 在專案中設定 web3.js 的說明。_
- [從 JavaScript 呼叫智慧型合約](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– 使用 DAI 代幣，了解如何透過 JavaScript 呼叫合約函式。_
