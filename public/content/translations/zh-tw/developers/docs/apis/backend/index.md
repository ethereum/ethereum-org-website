---
title: 後端 API 函式庫
description: 介紹以太坊客戶端 API，讓你能從應用程式與區塊鏈互動。
lang: zh-tw
---

為了讓軟體應用程式能與 [以太坊](/) 區塊鏈互動（即讀取區塊鏈資料和/或發送交易到網路），它必須連接到以太坊節點。

為此，每個以太坊客戶端都實作了 [JSON-RPC](/developers/docs/apis/json-rpc/) 規範，因此有一套統一的 [方法](/developers/docs/apis/json-rpc/#json-rpc-methods) 可供應用程式依賴。

如果你想使用特定的程式語言連接以太坊節點，生態系統中有許多便利的函式庫能讓這件事變得簡單許多。透過這些函式庫，開發人員可以編寫直觀的單行方法來初始化 JSON-RPC 請求（在底層運作），從而與以太坊互動。

## 先決條件 {#prerequisites}

了解 [以太坊堆疊](/developers/docs/ethereum-stack/) 和 [以太坊客戶端](/developers/docs/nodes-and-clients/) 可能會有所幫助。

## 為什麼要使用函式庫？ {#why-use-a-library}

這些函式庫抽象化了直接與以太坊節點互動的許多複雜性。它們還提供了實用函式（例如將 ETH 轉換為 Gwei），因此身為開發人員，你可以花更少的時間處理以太坊客戶端的複雜細節，將更多時間專注於應用程式的獨特功能上。

## 可用的函式庫 {#available-libraries}

### 基礎設施與節點服務 {#infrastructure-and-node-services}

**Alchemy -** **_以太坊開發平台。_**

- [alchemy.com](https://www.alchemy.com/)
- [文件](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)
  
**All That Node -** **_節點即服務 (Node-as-a-Service)。_**

- [All That Node.com](https://www.allthatnode.com/)
- [文件](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Bware Labs 的 Blast -** **_適用於以太坊主網與測試網的去中心化 API。_**

- [blastapi.io](https://blastapi.io/)
- [文件](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_提供更高效、快速的 RPC 服務_**

- [blockpi.io](https://blockpi.io/)
- [文件](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare 以太坊閘道器。**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - 區塊鏈瀏覽器與交易 API**
- [文件](https://docs.etherscan.io/)

**Blockscout - 開源區塊鏈瀏覽器**
- [文件](https://docs.blockscout.com/)

**GetBlock -** **_用於 Web3 開發的區塊鏈即服務 (Blockchain-as-a-service)_**

- [GetBlock.io](https://getblock.io/)
- [文件](https://docs.getblock.io/)

**Infura -** **_以太坊 API 即服務。_**

- [infura.io](https://infura.io)
- [文件](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _具成本效益的 EVM JSON-RPC 供應商_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [文件](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _全節點與區塊鏈瀏覽器。_**

- [NOWNodes.io](https://nownodes.io/)
- [文件](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_區塊鏈基礎設施即服務。_**

- [quicknode.com](https://quicknode.com)
- [文件](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_由開源軟體驅動的以太坊與以太坊經典 API 即服務。_**

- [rivet.cloud](https://rivet.cloud)
- [文件](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_以速度為導向的以太坊節點，提供 JSON-RPC/WebSockets API。_**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [文件](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### 開發工具 {#development-tools}

**ethers-kt -** **_適用於基於 EVM 區塊鏈的非同步、高效能 Kotlin/Java/Android 函式庫。_**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [範例](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_開源的區塊鏈 .NET 整合函式庫。_**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [文件](https://docs.nethereum.com/docs/getting-started/welcome/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Python 工具 -** **_透過 Python 與以太坊互動的各種函式庫。_**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [Web3.py GitHub](https://github.com/ethereum/web3.py)
- [Web3.py 聊天室](https://gitter.im/ethereum/web3.py)

**Tatum -** **_終極的區塊鏈開發平台。_**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [文件](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**Web3j -** **_適用於以太坊的 Java/Android/Kotlin/Scala 整合函式庫。_**

- [GitHub](https://github.com/web3j/web3j)
- [文件](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### 區塊鏈服務 {#blockchain-services}

**BlockCypher -** **_以太坊 Web API。_**

- [blockcypher.com](https://www.blockcypher.com/)
- [文件](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_適用於以太坊的一站式 Web3 資料基礎設施。_**

- [chainbase.com](https://chainbase.com/)
- [文件](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_彈性且專用的以太坊節點即服務。_**

- [chainstack.com](https://chainstack.com)
- [文件](https://docs.chainstack.com/)
- [以太坊 API 參考資料](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node -** **_區塊鏈基礎設施 API。_**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [文件](https://docs.cdp.coinbase.com/)

**Figment 的 DataHub -** **_支援以太坊主網與測試網的 Web3 API 服務。_**

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

**Tokenview -** **_通用的多重加密貨幣區塊鏈 API 平台。_**

- [services.tokenview.io](https://services.tokenview.io/)
- [文件](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_提供簡單可靠的 API 來存取以太坊區塊鏈。_**

- [Watchdata](https://watchdata.io/)
- [文件](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Codex -** **_跨數十條鏈的即時、豐富區塊鏈資料 API。_**

- [codex.io](https://www.codex.io/)
- [文件](https://docs.codex.io)
- [瀏覽器](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [Discord](https://discord.com/invite/mFpUhT3vAq)

**Covalent -** **_支援 200 多條鏈的豐富區塊鏈 API。_**

- [covalenthq.com](https://www.covalenthq.com/)
- [文件](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)


## 延伸閱讀 {#further-reading}

_知道有哪個社群資源對你有所幫助嗎？編輯此頁面並加入它！_

## 相關主題 {#related-topics}

- [節點與客戶端](/developers/docs/nodes-and-clients/)
- [開發框架](/developers/docs/frameworks/)

## 相關教學 {#related-tutorials}

- [設定 Web3.js 以在 JavaScript 中使用以太坊區塊鏈](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– 在專案中設定 Web3.js 的說明。_
- [從 JavaScript 呼叫智能合約](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– 使用 DAI 代幣，了解如何使用 JavaScript 呼叫合約函式。_