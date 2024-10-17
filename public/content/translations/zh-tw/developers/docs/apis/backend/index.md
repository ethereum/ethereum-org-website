---
title: 後端應用程式介面程式庫
description: 讓你能夠從應用程式與區塊鏈互動的以太坊用戶端應用程式介面簡介。
lang: zh-tw
---

為了讓軟體應用程式能夠和以太坊區塊鏈互動（例如：讀取區塊鏈資料及/或傳送交易到網路），必須先連結以太坊節點。

為了這個目的，每個以太坊用戶端需實作 [JSON-RPC](/developers/docs/apis/json-rpc/) 規範，如此一來，應用程式就可以使用這些一組統一的[方法](/developers/docs/apis/json-rpc/#json-rpc-methods)。

如果你想用特定程式設計語言連結以太坊節點，生態系統中有很多便利的程式庫幫助你更輕易完成。 借助這些程式庫，開發者可以編寫直覺的單行方法來初始化與以太坊互動的 JSON-RPC 請求（在後台）。

## 先備知識 {#prerequisites}

瞭解[以太坊堆疊](/developers/docs/ethereum-stack/)和[以太坊用戶端](/developers/docs/nodes-and-clients/)可能會有幫助。

## 為何使用程式庫？ {#why-use-a-library}

這些程式庫顯著降低了直接和以太坊節點互動的複雜度。 這些應用程式介面還提供公用程式功能（例如將 ETH 轉換為 Gwei），使得開發者可以花更少的時間處理複雜的以太坊用戶端，將更多的時間專注於應用程式的特定功能。

## 可用程式庫 {#available-libraries}

### 基礎設施和節點服務 {#infrastructure-and-node-services}

**Alchemy -** **_以太坊開發平台。_**

- [alchemy.com](https://www.alchemy.com/)
- [文件](https://docs.alchemy.com/)
- [Github](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**All That Node -** **_節點即服務。_**

- [All That Node.com](https://www.allthatnode.com/)
- [文件](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Bware Labs 的 Blast -** **_以太坊主網和測試網的去中心化應用程式介面。_**

- [blastapi.io](https://blastapi.io/)
- [文件](https://docs.blastapi.io)
- [Discord](https://discord.gg/bwarelabs)

**BlockPi -** **_提供更高效及快速的遠端程序呼叫服務_**

- [blockpi.io](https://blockpi.io/)
- [文檔](https://docs.blockpi.io/)
- [Github](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare 以太坊閘道。**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - 區塊瀏覽器和交易應用程式介面**
- [文件](https://docs.etherscan.io/)

**GetBlock-** **_用於 Web3 開發的區塊鏈即服務_**

- [GetBlock.io](https://getblock.io/)
- [文檔](https://getblock.io/docs/)

**Infura -** **_以太坊應用程式介面即服務。_**

- [infura.io](https://infura.io)
- [文件](https://docs.infura.io/api)
- [Github](https://github.com/INFURA)

**Node RPC - _有成本效益的以太坊虛擬機 JSON-RPC 提供者_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [文檔](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _全節點和區塊瀏覽器。_**

- [NOWNodes.io](https://nownodes.io/)
- [文件](https://documenter.getpostman.com/view/13630829/TVmFkLwy#intro)

**QuickNode -** **_區塊鏈基礎設施即服務。_**

- [quicknode.com](https://quicknode.com)
- [文檔](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_由開源軟體支援的以太坊和以太坊經典應用程式介面即服務_**

- [rivet.cloud](https://rivet.cloud)
- [文件](https://rivet.cloud/docs/)
- [Github](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_速度導向的以太坊節點即 JSON-RPC/WebSockets 應用程式介面。_**

- [zmok.io](https://zmok.io/)
- [Github](https://github.com/zmok-io)
- [文檔](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### 開發工具 {#development-tools}

**ethers-kt -** **_適用基於以太坊虛擬機區塊鏈的非同步、高效能 Kotlin/Java/Android 程式庫。_**

- [Github](https://github.com/Kr1ptal/ethers-kt)
- [範例](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_區塊鏈的開源 .NET 整合程式庫。_**

- [Github](https://github.com/Nethereum/Nethereum)
- [文檔](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Python Tooling -** **_透過 Python 進行以太坊互動的各種程式庫。_**

- [py.ethereum.org](https://python.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py 聊天室](https://gitter.im/ethereum/web3.py)

**Tatum -** **_最好的區塊鏈開發平台。_**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [文檔](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**web3j -** **_以太坊的 Java/Android/Kotlin/Scala 整合程式庫。 _**

- [Github](https://github.com/web3j/web3j)
- [文件](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### 區塊鏈服務 {#blockchain-services}

**BlockCypher -** **_以太坊 Web 應用程式介面。_**

- [blockcypher.com](https://www.blockcypher.com/)
- [文件](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_以太坊的一體化 web3 資料基礎設施。_**

- [chainbase.com](https://chainbase.com/)
- [文件](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_彈性且專用的以太坊節點即服務。_**

- [chainstack.com](https://chainstack.com)
- [文件](https://docs.chainbase.com/docs)
- [以太坊應用程式介面參考資料](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase 雲端節點 -** **_區塊鏈基礎設施應用程式介面。_**

- [Coinbase 雲端節點](https://www.coinbase.com/cloud)
- [文件](https://docs.cloud.coinbase.com/)

**DataHub by Figment -** **_以太坊主網和測試網的 Web3 應用程式介面服務。_**

- [DataHub](https://www.figment.io/)
- [文件](https://docs.figment.io/)

**Moralis -** **_企業級以太坊虛擬機應用程式介面提供者。_**

- [moralis.io](https://moralis.io)
- [文件](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [論壇](https://forum.moralis.io/)

**NFTPort -** **_以太坊資料及鑄造應用程式介面。_**

- [nftport.xyz](https://www.nftport.xyz/)
- [文件](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_通用多重加密區塊鏈應用程式介面平台。_**

- [services.tokenview.io](https://services.tokenview.io/)
- [文件](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_提供簡單可靠的應用程式介面來存取以太坊區塊鏈。_**

- [Watchdata](https://watchdata.io/)
- [文件](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Covalent -** **_200 多條鏈的已擴充區塊鏈應用程式介面。_**

- [covalenthq.com](https://www.covalenthq.com/)
- [文件](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)


## 了解更多 {#further-reading}

_知道對你有幫助的社群資源嗎？ 請編輯此頁面並新增資源！_

## 相關主題 {#related-topics}

- [節點和用戶端](/developers/docs/nodes-and-clients/)
- [開發架構](/developers/docs/frameworks/)

## 相關教學影片 {#related-tutorials}

- [設定 Web3js 以在 Javascript 中使用以太坊區塊鏈](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– 在專案中設定 web3.js 的說明。_
- [從 JavaScript 呼叫智慧型合約](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– 使用 DAI 代幣，瞭解如何使用 JavaScript 呼叫合約函式。_
