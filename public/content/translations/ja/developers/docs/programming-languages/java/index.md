---
title: "Javaデベロッパーのためのイーサリアム"
description: "Javaベースのプロジェクトとツールを使ってイーサリアムの開発方法を学ぶ"
lang: ja
incomplete: true
---

<FeaturedText>Javaベースのプロジェクトとツールを使ってイーサリアムを開発する方法を学ぶ</FeaturedText>

イーサリアムを使用して、暗号通貨とブロックチェーン技術の利点を活用した分散型アプリケーション (「dapp」) を作成します。 dappは、信頼性の高いアプリケーションです。つまり、イーサリアムにデプロイした後は、常にプログラムしたとおりに動作します。 デジタル資産を制御して、新たなタイプの金融アプリケーションを作成できます。 また、分散化できるため、単一のエンティティや個人は制御できず、検閲はほぼ不可能であることを意味します。

## スマートコントラクトとSolidity言語入門 {#getting-started-with-smart-contracts-and-solidity}

**Javaをイーサリアムに統合するための最初のステップを踏み出してみましょう**

先に基礎を学習したい場合は、 [ethereum.org/learn](/learn/)または[ethereum.org/developers.](/developers/)をご確認ください。

- [ブロックチェーン解説](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [スマートコントラクトを理解する](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [初めてのスマートコントラクトを作成する](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidityのコンパイルとデプロイ方法を学ぶ](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## イーサリアムクライアントの操作 {#working-with-ethereum-clients}

2つの主要なJavaイーサリアムクライアントである[Web3J](https://github.com/web3j/web3j)とHyperledger Besuの使用方法を学びましょう

- [Java、Eclipse、Web3Jでイーサリアムクライアントに接続する](https://kauri.io/article/b9eb647c47a546bc95693acc0be72546/connecting-to-an-ethereum-client-with-java-eclipse-and-web3j)
- [JavaとWeb3jでイーサリアムアカウントを管理する](https://kauri.io/article/925d923e12c543da9a0a3e617be963b4/manage-an-ethereum-account-with-java-and-web3j)
- [スマートコントラクトからJavaラッパーを生成する](https://kauri.io/article/84475132317d4d6a84a2c42eb9348e4b/generate-a-java-wrapper-from-your-smart-contract)
- [イーサリアムのスマートコントラクトを操作する](https://kauri.io/article/14dc434d11ef4ee18bf7d57f079e246e/interacting-with-an-ethereum-smart-contract-in-java)
- [イーサリアムのスマートコントラクトイベントをリッスンする](https://kauri.io/article/760f495423db42f988d17b8c145b0874/listening-for-ethereum-smart-contract-events-in-java)
- [LinuxでJavaイーサリアムクライアントのBesu (Pantheon) を使用する](https://kauri.io/article/276dd27f1458443295eea58403fd6965/using-pantheon-the-java-ethereum-client-with-linux)
- [Java統合テストでHyperledger Besu (Pantheon)ノードを実行する](https://kauri.io/article/7dc3ecc391e54f7b8cbf4e5fa0caf780/running-a-pantheon-node-in-java-integration-tests)
- [Web3j チートシート](https://kauri.io/web3j-cheat-sheet-\(java-ethereum\)/5dfa1ea941ac3d0001ce1d90/c)

EVMベースのブロックチェーンと対話するための非同期で高性能なKotlinライブラリ、[ethers-kt](https://github.com/Kr1ptal/ethers-kt)の使用方法を学びましょう。 JVMおよびAndroidプラットフォームをターゲットにしています。

- [ERC20トークンを転送する](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/abi/TransferERC20.kt)
- [イベントリッスンを伴うUniswapV2スワップ](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/tokenswapwitheventlistening/TokenSwapWithEventListening.kt)
- [ETH / ERC20残高トラッカー](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/balancetracker/BalanceTracker.kt)

## 中級者向けの記事 {#intermediate-articles}

- [IPFSを使用したJavaアプリケーションにおけるストレージ管理](https://kauri.io/article/3e8494f4f56f48c4bb77f1f925c6d926/managing-storage-in-a-java-application-with-ipfs)
- [Web3jを使用してJavaでERC20トークンを管理する](https://kauri.io/article/d13e911bbf624108b1d5718175a5e0a0/manage-erc20-tokens-in-java-with-web3j)
- [Web3jトランザクションマネージャー](https://kauri.io/article/4cb780bb4d0846438d11885a25b6d7e7/web3j-transaction-managers)

## 高度な使用パターン {#advanced-use-patterns}

- [Eventeumを使用してJavaスマートコントラクトデータキャッシュを構築する](https://kauri.io/article/fe81ee9612eb45a9ab72790ef24283d/using-eventeum-to-build-a-java-smart-contract-data-cache)

## Javaプロジェクトとツール {#java-projects-and-tools}

- [Web3J (イーサリアムクライアントと対話するためのライブラリ)](https://github.com/web3j/web3j)
- [ethers-kt (EVMベースのブロックチェーン用の非同期、高性能なKotlin/Java/Androidライブラリ。)](https://github.com/Kr1ptal/ethers-kt)
- [Eventeum (イベントリスナー)](https://github.com/ConsenSys/eventeum)
- [Mahuta (IPFS開発ツール)](https://github.com/ConsenSys/mahuta)

もっとリソースをお探しですか？ [ethereum.org/developers](/developers/)をチェックしてください。

## Javaコミュニティのコントリビューター {#java-community-contributors}

- [IO Builders](https://io.builders)
- [Kauri](https://kauri.io)
