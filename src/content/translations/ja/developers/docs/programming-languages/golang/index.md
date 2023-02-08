---
title: Goデベロッパーのためのイーサリアム
description: Goベースのプロジェクトとツールを使ってイーサリアムの開発方法を学ぶ
lang: ja
incomplete: true
---

<div class="featured">Goベースのプロジェクトとツールを使ってイーサリアムの開発方法を学ぶ</div>

イーサリアムを使用して分散型アプリケーション (「dapp」) を作成します。 dapp は、信頼性の高いアプリケーションです。つまり、イーサリアムにデプロイした後は、常にプログラムしたとおりに動作します。 分散型であるため、ピアツーピアのネットワーク上で動作します。単一障害点はありません。 単一のエンティティや個人によって制御されず、検閲はほぼ不可能です。 デジタル資産を制御して、新たなタイプのアプリケーションを作成できます。

## スマートコントラクトと Solidity を使い始める {#getting-started-with-smart-contracts-and-solidity}

**Go をイーサリアムに統合するための最初のステップを踏み出してみましょう。**

先に基礎を学習したい場合は、 [ethereum.org/learn](/learn/)または[ethereum.org/developers](/developers/)をご確認ください。

- [ブロックチェーンの説明](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [スマートコントラクトを理解する](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [初めてのスマートコントラクトを記述する](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity のコンパイルとデプロイの方法を学ぶ](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [コントラクトのチュートリアル](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## 初心者向けの記事と書籍 {#beginner-articles-and-books}

- [イーサリアムクライアントの選択](https://www.trufflesuite.com/docs/truffle/reference/choosing-an-ethereum-client)
- [Geth 入門](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [Golang を使用してイーサリアムに接続する](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Golang を使用してイーサリアムスマートコントラクトをデプロイする](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Go でのイーサリアムスマートコントラクトのテストとデプロイのための段階的ガイド](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [eBook: Go を使用したイーサリアム開発](https://goethereumbook.org/) - _Go を使用してイーサリアムアプリケーションを開発する_

## 中級者向けの記事とドキュメント {#intermediate-articles-and-docs}

- [Go イーサリアムのドキュメント](https://geth.ethereum.org/docs/) - _公式のイーサリアムの Golang についてのドキュメント_
- [Erigon のプログラマーガイド](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _状態ツリー、マルチプルーフ、トランザクション処理などについて図示したガイド_
- [Erigon とステートレスイーサリアム](https://youtu.be/3-Mn7OckSus?t=394) - _2020 年イーサリアムコミュニティカンファレンス (EthCC 3)_
- [Erigon：イーサリアムクライアントの最適化](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _2018 年開発者会議 4_
- [Go イーサリアム GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [Go で Geth を使用して dapp を作成する](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [Golang と Geth を使用してイーサリアムプライベートネットワークで作業する](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Go を使用してイーサリアム上で Solidity コントラクトの単体テストを行う](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [Geth をライブラリとして使用するためのクイックリファレンス](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## 発展的なユースケース {#advanced-use-patterns}

- [Geth のシミュレートされたバックエンド](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [イーサリアムと Quorum を使用したアズ・ア・サービス型のブロックチェーンアプリケーション](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [イーサリアムブロックチェーンアプリケーションにおける分散型ストレージ IPFS と Swarm](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [モバイルクライアント: ライブラリと InProc のイーサリアムノード](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [ネイティブ dapp: イーサリアムコントラクトへの Go バインディング](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Go のプロジェクトとツール {#go-projects-and-tools}

- [Geth / Go イーサリアム](https://github.com/ethereum/go-ethereum) - _イーサリアムプロトコルの公式 Go 実装_
- [Go イーサリアム コード分析](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _Go Ethereum のソースコードのレビューと分析_
- [Erigon](https://github.com/ledgerwatch/erigon) - _Go イーサリアムの派生。アーカイブノードにフォーカスしており、より高速_
- [Golem](https://github.com/golemfactory/golem) - _Golem はコンピューティングパワーのグローバル市場を創造している_
- [Quorum](https://github.com/jpmorganchase/quorum) - _データプライバシーをサポートするイーサリアムの許可された実装_
- [Prysm](https://github.com/prysmaticlabs/prysm) - _イーサリアム「Serenity」2.0 の Go 実装_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _分散型 Twitter: イーサリアムブロックチェーン上で稼動するマイクロブログサービス_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) - _Minimum Viable Plasma 仕様の Golang の実装と拡張_
- [Open Ethereum Mining Pool](https://github.com/sammy007/open-ethereum-pool) - _オープンソースのイーサリアムマイニングプール_
- [Ethereum HD Wallet](https://github.com/miguelmota/go-ethereum-hdwallet) - _Go イーサリアム HD ウォレットの派生_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _多くの種類のイーサリアムネットワークをサポート_
- [Geth ライトクライアント](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _ライトイーサリアムサブプロトコルの Geth 実装_
- [イーサリアム Golang SDK](https://github.com/everFinance/goether) - _Golang でのシンプルなイーサリアムウォレットの実装とユーティリティ_

もっとリソースをお探しですか？ [ethereum.org/developers](/developers/)をご確認ください。

## Go コミュニティコントリビューター {#go-community-contributors}

- [Geth Discord](https://discordapp.com/invite/nthXNEv)
- [Geth Gist](https://gitter.im/ethereum/go-ethereum)
- [Gophers Slack](https://invite.slack.golangbridge.org/) - [#ethereum channel](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - Ethereum](https://ethereum.stackexchange.com/)
- [Multi Geth Gitter](https://gitter.im/ethoxy/multi-geth)
- [イーサリアム Gitter](https://gitter.im/ethereum/home)
- [Geth ライトクライアント Gitter](https://gitter.im/ethereum/light-client)

## その他のリスト {#other-aggregated-lists}

- [素晴らしいイーサリアム](https://github.com/btomashvili/awesome-ethereum)
- [Consensys: イーサリアムデベロッパーツールの決定版リスト](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [GitHub ソース](https://github.com/ConsenSys/ethereum-developer-tools-list)
