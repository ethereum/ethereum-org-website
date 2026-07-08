---
title: "Java開発者向けのイーサリアム"
description: "Javaベースのプロジェクトやツールを使用してイーサリアム向けに開発する方法を学びます"
lang: ja
incomplete: true
---

<FeaturedText>Javaベースのプロジェクトやツールを使用してイーサリアム向けに開発する方法を学びます</FeaturedText>

イーサリアムを使用して、暗号資産とブロックチェーン技術の利点を活用した分散型アプリケーション (dapp) を作成します。これらのdappは信頼性が高く、一度イーサリアムにデプロイされると、常にプログラムされた通りに実行されます。デジタル資産を制御して、新しい種類の金融アプリケーションを作成できます。また、分散型であるため、単一の組織や個人が制御することはなく、検閲することはほぼ不可能です。

## スマート・コントラクトとSolidity言語の基礎 {#getting-started-with-smart-contracts-and-solidity}

**Javaとイーサリアムを統合するための第一歩を踏み出しましょう**

まずはより基本的な入門書が必要ですか？ [ethereum.org/learn](/learn/) または [ethereum.org/developers](/developers/) を確認してください。

- [ブロックチェーンの解説](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [スマート・コントラクトの理解](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [初めてのスマート・コントラクトを作成する](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidityのコンパイルとデプロイ方法を学ぶ](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## イーサリアムクライアントの操作 {#working-with-ethereum-clients}

2つの主要なJavaイーサリアムクライアントである[Web3j](https://github.com/web3j/web3j)とHyperledger ベスの使用方法を学びます

- [Java、Eclipse、Web3jを使用してイーサリアムクライアントに接続する](https://kauri.io/article/b9eb647c47a546bc95693acc0be72546/connecting-to-an-ethereum-client-with-java-eclipse-and-web3j)
- [JavaとWeb3jでイーサリアムアカウントを管理する](https://kauri.io/article/925d923e12c543da9a0a3e617be963b4/manage-an-ethereum-account-with-java-and-web3j)
- [スマート・コントラクトからJavaラッパーを生成する](https://kauri.io/article/84475132317d4d6a84a2c42eb9348e4b/generate-a-java-wrapper-from-your-smart-contract)
- [イーサリアムのスマート・コントラクトと対話する](https://kauri.io/article/14dc434d11ef4ee18bf7d57f079e246e/interacting-with-an-ethereum-smart-contract-in-java)
- [イーサリアムのスマート・コントラクトのイベントをリッスンする](https://kauri.io/article/760f495423db42f988d17b8c145b0874/listening-for-ethereum-smart-contract-events-in-java)
- [LinuxでJavaイーサリアムクライアントのベス (Pantheon) を使用する](https://kauri.io/article/276dd27f1458443295eea58403fd6965/using-pantheon-the-java-ethereum-client-with-linux)
- [Java統合テストでHyperledger ベス (Pantheon) ノードを実行する](https://kauri.io/article/7dc3ecc391e54f7b8cbf4e5fa0caf780/running-a-pantheon-node-in-java-integration-tests)
- [Web3jチートシート](<https://kauri.io/web3j-cheat-sheet-(java-ethereum)/5dfa1ea941ac3d0001ce1d90/c>)

EVMベースのブロックチェーンと対話するための非同期で高性能なKotlinライブラリである[ethers-kt](https://github.com/Kr1ptal/ethers-kt)の使用方法を学びます。JVMおよびAndroidプラットフォームを対象としています。
- [ERC-20トークンの送金](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/abi/TransferERC20.kt)
- [イベントリスニングを伴うUniswapV2のスワップ](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/tokenswapwitheventlistening/TokenSwapWithEventListening.kt)
- [ETH / ERC-20残高トラッカー](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/balancetracker/BalanceTracker.kt)

## 中級者向けの記事 {#intermediate-articles}

- [IPFSを使用したJavaアプリケーションでのストレージ管理](https://kauri.io/article/3e8494f4f56f48c4bb77f1f925c6d926/managing-storage-in-a-java-application-with-ipfs)
- [Web3jを使用したJavaでのERC-20トークン管理](https://kauri.io/article/d13e911bbf624108b1d5718175a5e0a0/manage-erc20-tokens-in-java-with-web3j)
- [Web3jトランザクションマネージャー](https://kauri.io/article/4cb780bb4d0846438d11885a25b6d7e7/web3j-transaction-managers)

## 高度な使用パターン {#advanced-use-patterns}

- [Eventeumを使用したJavaスマート・コントラクトのデータキャッシュの構築](https://kauri.io/article/fe81ee9612eb4e5a9ab72790ef24283d/using-eventeum-to-build-a-java-smart-contract-data-cache)

## Javaのプロジェクトとツール {#java-projects-and-tools}

- [Web3j (イーサリアムクライアントと対話するためのライブラリ)](https://github.com/web3j/web3j)
- [ethers-kt (EVMベースのブロックチェーン向けの非同期で高性能なKotlin/Java/Androidライブラリ)](https://github.com/Kr1ptal/ethers-kt)
- [Eventeum (イベントリスナー)](https://github.com/ConsenSys/eventeum)
- [Mahuta (IPFS開発ツール)](https://github.com/ConsenSys/mahuta)

さらにリソースをお探しですか？ [ethereum.org/developers](/developers/) を確認してください。

## Javaコミュニティの貢献者 {#java-community-contributors}

- [IO Builders](https://io.builders)
- [Kauri](https://kauri.io)