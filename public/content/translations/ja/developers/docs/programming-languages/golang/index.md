---
title: Goデベロッパーのためのイーサリアム
description: Goベースのプロジェクトとツールを使ってイーサリアムの開発方法を学ぶ
lang: ja
incomplete: true
---

<FeaturedText>Goベースのプロジェクトとツールを使ってイーサリアムの開発方法を学ぶ</FeaturedText>

イーサリアムを使用して分散型アプリケーション (「dapp」) を作成します。 dappは、信頼性の高いアプリケーションです。つまり、イーサリアムにデプロイした後は、常にプログラムしたとおりに動作します。 分散型であるため、ピアツーピアのネットワーク上で動作します。単一障害点はありません。 単一のエンティティや個人によって制御されず、検閲はほぼ不可能です。 デジタル資産を制御して、新たなタイプのアプリケーションを作成できます。

## スマートコントラクトとSolidityを使い始める {#getting-started-with-smart-contracts-and-solidity}

**Goをイーサリアムに統合するための最初のステップを踏み出してみましょう。**

先に基礎を学習したい場合は、 [ethereum.org/learn](/learn/)または[ethereum.org/developers](/developers/)をご確認ください。

- [ブロックチェーンの説明](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [スマートコントラクトを理解する](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [初めてのスマートコントラクトを記述する](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidityのコンパイルとデプロイの方法を学ぶ](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [コントラクトのチュートリアル](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## 初心者向けの記事と書籍 {#beginner-articles-and-books}

- [Geth入門](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [Golangを使用してイーサリアムに接続する](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Golangを使用してイーサリアムスマートコントラクトをデプロイする](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Goでのイーサリアムスマートコントラクトのテストとデプロイのための段階的ガイド](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [eBook: Goを使用したイーサリアム開発](https://goethereumbook.org/) - _Goを使用してイーサリアムアプリケーションを開発する_

## 中級者向けの記事とドキュメント {#intermediate-articles-and-docs}

- [Goイーサリアムのドキュメント](https://geth.ethereum.org/docs/) - _公式のイーサリアムのGolangについてのドキュメント_
- [Erigonのプログラマーガイド](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _状態ツリー、マルチプルーフ、トランザクション処理などについて図示したガイド_
- [Erigonとステートレスイーサリアム](https://youtu.be/3-Mn7OckSus?t=394) - _2020年イーサリアムコミュニティカンファレンス (EthCC 3)_
- [Erigon：イーサリアムクライアントの最適化](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _2018年開発者会議4_
- [Goイーサリアム GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [GoでGethを使用してdappを作成する](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [GolangとGethを使用してイーサリアムプライベートネットワークで作業する](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Goを使用してイーサリアム上でSolidityコントラクトの単体テストを行う](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [Gethをライブラリとして使用するためのクイックリファレンス](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## 発展的なユースケース {#advanced-use-patterns}

- [Gethのシミュレートされたバックエンド](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [イーサリアムとQuorumを使用したアズ・ア・サービス型のブロックチェーンアプリケーション](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [イーサリアムブロックチェーンアプリケーションにおける分散型ストレージIPFSとSwarm](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [モバイルクライアント: ライブラリとInProcのイーサリアムノード](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [ネイティブdapp: イーサリアムコントラクトへのGoバインディング](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Goのプロジェクトとツール {#go-projects-and-tools}

- [Geth / Goイーサリアム](https://github.com/ethereum/go-ethereum) - _イーサリアムプロトコルの公式Go実装_
- [Goイーサリアム コード分析](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _Go Ethereumのソースコードのレビューと分析_
- [Erigon](https://github.com/ledgerwatch/erigon) - _Goイーサリアムの派生。アーカイブノードにフォーカスしており、より高速_
- [Golem](https://github.com/golemfactory/golem) - _Golemはコンピューティングパワーのグローバル市場を創造している_
- [Quorum](https://github.com/jpmorganchase/quorum) - _データプライバシーをサポートするイーサリアムの許可された実装_
- [Prysm](https://github.com/prysmaticlabs/prysm) - _イーサリアム「Serenity」2.0のGo実装_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _分散型Twitter: イーサリアムブロックチェーン上で稼動するマイクロブログサービス_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) - _Minimum Viable Plasma仕様のGolangの実装と拡張_
- [Open Ethereum Mining Pool](https://github.com/sammy007/open-ethereum-pool) - _オープンソースのイーサリアムマイニングプール_
- [Ethereum HD Wallet](https://github.com/miguelmota/go-ethereum-hdwallet) - _GoイーサリアムHDウォレットの派生_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _多くの種類のイーサリアムネットワークをサポート_
- [Gethライトクライアント](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _ライトイーサリアムサブプロトコルのGeth実装_
- [イーサリアムGolang SDK](https://github.com/everFinance/goether) - _Golangでのシンプルなイーサリアムウォレットの実装とユーティリティ_
- [Covalent Golang SDK](https://github.com/covalenthq/covalent-api-sdk-go) - _Go SDKを通して200以上のブロックチェーンでブロックチェーンデータへ効率的にアクセス_

もっとリソースをお探しですか？ [ethereum.org/developers](/developers/)をご確認ください。

## Goコミュニティコントリビューター {#go-community-contributors}

- [Geth Discord](https://discordapp.com/invite/nthXNEv)
- [Geth Gist](https://gitter.im/ethereum/go-ethereum)
- [Gophers Slack](https://invite.slack.golangbridge.org/) - [#ethereum channel](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - Ethereum](https://ethereum.stackexchange.com/)
- [Multi Geth Gitter](https://gitter.im/ethoxy/multi-geth)
- [イーサリアムGitter](https://gitter.im/ethereum/home)
- [GethライトクライアントGitter](https://gitter.im/ethereum/light-client)

## その他のリスト {#other-aggregated-lists}

- [素晴らしいイーサリアム](https://github.com/btomashvili/awesome-ethereum)
- [Consensys: イーサリアムデベロッパーツールの決定版リスト](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [GitHubソース](https://github.com/ConsenSys/ethereum-developer-tools-list)
