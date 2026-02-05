---
title: Go 開發者適用的以太坊資源
description: 學習如何使用 Go 型專案和工具進行以太坊開發
lang: zh-tw
incomplete: true
---

<FeaturedText>學習如何使用基於 Go 的專案和工具進行以太坊開發</FeaturedText>

使用以太坊建立去中心化應用程式（或稱「dapp」)。 這些去中心化應用程式是可信的，這意味著一旦部署到以太坊後，它們就會始終按照設定執行。 這些應用程式是去中心化的，意味著它們在點對點網路上運行，並且不存在單點故障。 這些應用程式不會被單一實體或個人控制，並且幾乎不可能對其進行審查。 它們可以控制數位資產以建立新型應用程式。

## 智慧型合約及 Solidity 程式語言入門 {#getting-started-with-smart-contracts-and-solidity}

**邁出第一步，整合 Go 與以太坊**

需要先看看更基礎的入門指南？ 請查看 [ethereum.org/learn](/learn/) 或 [ethereum.org/developers](/developers/)。

- [詳解區塊鏈](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [了解智慧型合約](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [撰寫你的第一個智慧型合約](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [學習如何編譯及部署 Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [合約教學](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## 初學者文章與書籍 {#beginner-articles-and-books}

- [Geth 入門](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [使用 Golang 連接到以太坊](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [使用 Golang 部署以太坊智能合約](https://www.youtube.com/watch?v=pytGqQmDslE)
- [在 Go 中測試和部署以太坊智能合約的逐步指南](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [電子書：用 Go 開發以太坊](https://goethereumbook.org/) - _用 Go 開發以太坊應用程式_

## 中階文章與文件 {#intermediate-articles-and-docs}

- [Go 以太坊文件](https://geth.ethereum.org/docs/) - _官方以太坊 Golang 的文件_
- [Erigon 程式設計師指南](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _包含狀態樹、多重證明和交易處理的圖解指南_
- [Erigon 和無狀態以太坊](https://youtu.be/3-Mn7OckSus?t=394) - _2020 年以太坊社群會議 (EthCC 3)_
- [Erigon：最佳化以太坊用戶端](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _2018 Devcon 4_
- [Go 以太坊 GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [使用 Geth 在 Go 中建立去中心化應用程式](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [使用 Golang 和 Geth 在以太坊私有網路上作業](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [在 Go 中對以太坊上的 Solidity 合約進行單元測試](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [將 Geth 當作函式庫使用的快速參考](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## 進階使用模式 {#advanced-use-patterns}

- [GETH 模擬後端](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [使用以太坊和 Quorum 的區塊鏈即服務應用程式](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [以太坊區塊鏈應用程式中的分散式儲存 IPFS 和 Swarm](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [行動用戶端：函式庫與 Inproc 以太坊節點](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [原生去中心化應用程式：以太坊合約的 Go 繫結](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Go 專案與工具 {#go-projects-and-tools}

- [Geth / Go Ethereum](https://github.com/ethereum/go-ethereum) - _以太坊協議的官方 Go 實作_
- [Go 以太坊程式碼分析](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _Go 以太坊原始碼的審查與分析_
- [Erigon](https://github.com/ledgerwatch/erigon) - _Go 以太坊的更快衍生版本，著重於歸檔節點_
- [Golem](https://github.com/golemfactory/golem) - _Golem 正在建立一個全球算力市場_
- [Quorum](https://github.com/jpmorganchase/quorum) - _支援資料隱私的許可制以太坊實作_
- [Prysm](https://github.com/prysmaticlabs/prysm) - _以太坊「Serenity」2.0 Go 實作_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _去中心化 Twitter：在以太坊區塊鏈上執行的微部落格服務_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _最小可行性 Plasma 規範的 Golang 實作和擴充_
- [開源以太坊礦池](https://github.com/sammy007/open-ethereum-pool) - _一個開源的以太坊礦池_
- [以太坊 HD 錢包](https://github.com/miguelmota/go-ethereum-hdwallet) - _Go 中的以太坊 HD 錢包派生_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _支援多種類型的以太坊網路_
- [Geth 輕用戶端](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _輕量以太坊子協定的 Geth 實作_
- [以太坊 Golang SDK](https://github.com/everFinance/goether) - _使用 Golang 的簡易以太坊錢包實作與公用程式_
- [Covalent Golang SDK](https://github.com/covalenthq/covalent-api-sdk-go) - _透過 Go SDK 高效率地存取 200 多個區塊鏈的資料_

想取得更多資源？ 查看 [ethereum.org/developers](/developers/)

## Go 社群貢獻者 {#go-community-contributors}

- [Geth Discord](https://discordapp.com/invite/nthXNEv)
- [Geth Gitter](https://gitter.im/ethereum/go-ethereum)
- [Gophers Slack](https://invite.slack.golangbridge.org/) - [#ethereum 頻道](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - 以太坊](https://ethereum.stackexchange.com/)
- [Multi Geth Gitter](https://gitter.im/ethoxy/multi-geth)
- [以太坊 Gitter](https://gitter.im/ethereum/home)
- [Geth 輕用戶端 Gitter](https://gitter.im/ethereum/light-client)

## 其他彙總清單 {#other-aggregated-lists}

- [Awesome 以太坊](https://github.com/btomashvili/awesome-ethereum)
- [Consensys：以太坊開發者工具權威清單](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [GitHub 原始碼](https://github.com/ConsenSys/ethereum-developer-tools-list)
