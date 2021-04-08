---
title: Go開発者のためのイーサリアム
description: Goベースのプロジェクトとツールを使ってイーサリアムの開発方法を学ぶ
lang: ja
sidebar: true
sidebarDepth: 1
---

# Go 開発者のためのイーサリアム {#ethereum-for-go-devs}

<div class="featured">Goベースのプロジェクトとツールを使ってイーサリアムの開発方法を学ぶ</div>

イーサリアムを使用して、暗号通貨とブロックチェーン技術の利点を利用した分散型アプリケーション (decentralized applications; dapps) を作成します。 これらの dapps は信頼でき、一度イーサリアムにデプロイすれば、常にプログラム通りに動作することを意味します。 そしてデジタルアセットを取り扱うことで新たな金融アプリケーションを作ることができます。 それらは分散化できます。つまり、単一のエンティティや人がそれらをコントロールすることはなく、検閲はほぼ不可能です。

<img src="https://i.imgur.com/MFg8Nop.png" width="100%" />

## スマートコントラクトと Solidity 言語の入門 {#getting-started-with-smart-contracts-and-solidity}

**Go をイーサリアムに統合するための最初のステップを踏み出してみましょう。**

先により基礎的なことを学びたい人は [ethereum.org/learn](/ja/learn/)あるいは[ethereum.org/developers](/developers/)をチェックしてください。

- [ブロックチェーンの説明](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [スマートコントラクトを理解する](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [初めてのスマートコントラクトを書く](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity のコンパイルとデプロイ方法を学ぶ](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [コントラクトのチュートリアル](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## 初級記事と本 {#beginner-articles-and-books}

- [イーサリアムクライアントの選択](https://www.trufflesuite.com/docs/truffle/reference/choosing-an-ethereum-client)
- [Geth の入門](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [Golang を使用してイーサリアムに接続](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Golang を使用してイーサリアムスマートコントラクトをデプロイ](https://www.youtube.com/watch?v=pytGqQmDslE)
- [イーサリアムスマートコントラクトのテストとデプロイのためのステップバイステップ・ガイド](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [eBook: Go を使ったイーサリアム開発](https://goethereumbook.org/) - _Go を使ってイーサリアムアプリケーションを開発する_

## 中級記事とドキュメント {#intermediate-articles-and-docs}

- [Go Ethereum のドキュメント](https://geth.ethereum.org/docs/) - _公式のイーサリアムの Golang についてのドキュメント_
- [Go Ethereum GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [Geth を使って Go で DApp を作成する](https://kauri.io/article/60a36c1b17d645939f63415218dc24f9/creating-a-dapp-in-go-with-geth)
- [Golang と Geth を使ったイーサリアムプライベートネットワークでの作業](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Go を使ってイーサリアム上で Solidity コントラクトをユニットテストする](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)

## 高度な利用パターン {#advanced-use-patterns}

- [GETH のシミュレーティッド・バックエンド](https://kauri.io/article/6285c9692883411aa041b6b970405a17/v1/the-geth-simulated-backend)
- [イーサリアムと Quorum を利用した Blockchain-as-a-Service アプリ](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [イーサリアムブロックチェーンアプリケーションにおける分散型ストレージ IPFS と Swarm](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [Mobile Clients: ライブラリとインプロックなイーサリアムノード](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [Native DApps: イーサリアムコントラクトへの Go バインディング](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Go のプロジェクトとツール {#go-projects-and-tools}

- [Geth / Go Ethereum](https://github.com/ethereum/go-ethereum) - _イーサリアムプロトコルの公式 Go 実装_
- [Go Ethereum Code Analysis](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _Go Ethereum のソースコードのレビューと分析_
- [Golem](https://github.com/golemfactory/golem) - _Golem はコンピューティングパワーのワールドマーケットを創造している_
- [Quorum](https://github.com/jpmorganchase/quorum) - _データプライバシーをサポートするイーサリアムのパーミッションド実装_
- [Prysm](https://github.com/prysmaticlabs/prysm) - _イーサリアム 'Serenity' 2.0 の Go 実装_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _分散型 Twitter: イーサリアムブロックチェーン上で動くマイクロブログサービス_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _Golang の実装と Minimum Viable Plasma の仕様の拡張_
- [Open Ethereum Mining Pool](https://github.com/sammy007/open-ethereum-pool) - _オープンソースのイーサリアムマイニングプール_
- [Ethereum HD Wallet](https://github.com/miguelmota/go-ethereum-hdwallet) - _Go のイーサリアム HD ウォレットの派生_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _多くの種類のイーサリアムネットワークをサポート_
- [Geth Light Client](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _軽量なイーサリアムサブプロトコルの Geth 実装_

もっとリソースをお探しですか？ [ethereum.org/developers](/ja/developers/) をチェックしてください

## Go コミュニティコントリビューター {#go-community-contributors}

- [Geth Discord](https://discordapp.com/invite/nthXNEv)
- [Geth Gist](https://gitter.im/ethereum/go-ethereum)
- [Gophers Slack](https://invite.slack.golangbridge.org/) - [#ethereum channel](https://https:/gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - Ethereum](https://ethereum.stackexchange.com/)
- [Multi Geth Gitter](https://gitter.im/ethoxy/multi-geth)
- [Ethereum Gitter](https://gitter.im/ethereum/home)
- [Geth ライトクライアント Gitter](https://gitter.im/ethereum/light-client)

## 他のリスト {#other-aggregated-lists}

- [素晴らしいイーサリアム](https://github.com/btomashvili/awesome-ethereum)
- [Consensys: イーサリアム開発者ツールの決定版リスト](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [GitHub ソース](https://github.com/ConsenSys/ethereum-developer-tools-list)
