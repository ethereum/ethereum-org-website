---
title: Java 開發者適用的以太坊資源
description: 學習如何使用 Java 型專案和工具進行以太坊開發
lang: zh-tw
incomplete: true
---

<FeaturedText>學習如何使用 Java 型專案和工具進行以太坊開發</FeaturedText>

使用以太坊建立去中心化應用程式（或稱「dapp」)，發揮加密貨幣和區塊鏈技術的優勢。 這些去中心化應用程式是可信的，這意味著一旦部署到以太坊後，它們就會始終按照設定執行。 這些應用程式可以控制數位資產，以便建立新型金融應用程式。 這些應用程式是去中心化的，這意味著任何單一實體或個人都無法控制它們，並且應用程式幾乎不可能被審查。

## 來開始學習智慧型合約及Solidity語言 {#getting-started-with-smart-contracts-and-solidity}

**邁出第一步，整合 Java 與以太坊**

需要先看看更基礎的入門指南？ 請查看 [ethereum.org/learn](/learn/) 或 [ethereum.org/developers](/developers/)。

- [區塊鏈詳解](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [瞭解智慧型合約](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [編寫你的第一個智慧型合約](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [學習如何編譯和部署 Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## 使用以太坊用戶端 {#working-with-ethereum-clients}

學習如何使用兩種先進的 Java 以太坊用戶端 [Web3J](https://github.com/web3j/web3j) 和 Hyperledger Besu

- [使用 Java 、Eclipse 和 Web3J 連線以太坊用戶端](https://kauri.io/article/b9eb647c47a546bc95693acc0be72546/connecting-to-an-ethereum-client-with-java-eclipse-and-web3j)
- [使用 Java 和 Web3j 管理以太坊帳戶](https://kauri.io/article/925d923e12c543da9a0a3e617be963b4/manage-an-ethereum-account-with-java-and-web3j)
- [從智慧型合約產生 Java 包裝函式](https://kauri.io/article/84475132317d4d6a84a2c42eb9348e4b/generate-a-java-wrapper-from-your-smart-contract)
- [與以太坊智慧型合約互動](https://kauri.io/article/14dc434d11ef4ee18bf7d57f079e246e/interacting-with-an-ethereum-smart-contract-in-java)
- [偵聽以太坊智慧型合約事件](https://kauri.io/article/760f495423db42f988d17b8c145b0874/listening-for-ethereum-smart-contract-events-in-java)
- [使用 Linux 下的 Java 以太坊用戶端 Besu (Pantheon)](https://kauri.io/article/276dd27f1458443295eea58403fd6965/using-pantheon-the-java-ethereum-client-with-linux)
- [在 Java 整合測試中執行 Hyperledger Besu (Pantheon) 節點](https://kauri.io/article/7dc3ecc391e54f7b8cbf4e5fa0caf780/running-a-pantheon-node-in-java-integration-tests)
- [Web3j 速查表](https://kauri.io/web3j-cheat-sheet-(java-ethereum)/5dfa1ea941ac3d0001ce1d90/c)

學習如何使用非同步高效能 Kotlin 程式庫 [ethers-kt](https://github.com/Kr1ptal/ethers-kt)，用來與基於以太坊虛擬機的區塊鏈互動。 針對 JVM 和 Android 平台。
- [傳送 ERC20 代幣](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/abi/TransferERC20.kt)
- [通過偵聽事件實現 UniswapV2 兌換](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/tokenswapwitheventlistening/TokenSwapWithEventListening.kt)
- [以太幣 / ERC20 餘額追蹤器](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/balancetracker/BalanceTracker.kt)

## 中階文章 {#intermediate-articles}

- [使用星際檔案系統在 Java 應用程式中管理存儲](https://kauri.io/article/3e8494f4f56f48c4bb77f1f925c6d926/managing-storage-in-a-java-application-with-ipfs)
- [使用 Web3j 在 Java 中管理 ERC20 代幣](https://kauri.io/article/d13e911bbf624108b1d5718175a5e0a0/manage-erc20-tokens-in-java-with-web3j)
- [Web3j 交易管理程式](https://kauri.io/article/4cb780bb4d0846438d11885a25b6d7e7/web3j-transaction-managers)

## 進階使用模式 {#advanced-use-patterns}

- [使用 Eventeum 建置 Java 智慧型合約資料快取](https://kauri.io/article/fe81ee9612eb4e5a9ab72790ef24283d/using-eventeum-to-build-a-java-smart-contract-data-cache)

## Java 專案和工具 {#java-projects-and-tools}

- [Hyperledger Besu (Pantheon)（以太坊用戶端）](https://docs.pantheon.pegasys.tech/en/stable/)
- [Web3J（用來與以太坊用戶端互動的程式庫）](https://github.com/web3j/web3j)
- [ethers-kt（適用於基於以太坊虛擬機的區塊鏈的非同步、高效能 Kotlin/Java/Android 程式庫。）](https://github.com/Kr1ptal/ethers-kt)
- [Eventeum（事件偵聽程式）](https://github.com/ConsenSys/eventeum)
- [Mahuta（星際檔案系統開發者工具）](https://github.com/ConsenSys/mahuta)

想取得更多資源？ 請參考 [ethereum.org/developers。](/developers/)

## Java 社群貢獻者 {#java-community-contributors}

- [IO Builders](https://io.builders)
- [Kauri](https://kauri.io)
- [Besu HL 聊天室](https://chat.hyperledger.org/channel/besu)
