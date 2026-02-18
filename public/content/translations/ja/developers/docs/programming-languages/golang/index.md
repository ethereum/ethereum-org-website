---
title: "Goデベロッパーのためのイーサリアム"
description: "Goベースのプロジェクトとツールを使ってイーサリアムの開発方法を学ぶ"
lang: ja
incomplete: true
---

<FeaturedText>Goベースのプロジェクトとツールを使用してイーサリアムを開発する方法を学ぶ</FeaturedText>

イーサリアムを使用して分散型アプリケーション (「dapp」) を作成します。 dappは、信頼性の高いアプリケーションです。つまり、イーサリアムにデプロイした後は、常にプログラムしたとおりに動作します。 分散型であるため、ピアツーピアのネットワーク上で動作します。単一障害点はありません。 単一のエンティティや個人によって制御されず、検閲はほぼ不可能です。 デジタル資産を制御して、新たなタイプのアプリケーションを作成できます。

## スマートコントラクトとSolidity言語入門 {#getting-started-with-smart-contracts-and-solidity}

**Goをイーサリアムに統合するための最初のステップを踏み出してみましょう**

先に基礎を学習したい場合は、 [ethereum.org/learn](/learn/)または[ethereum.org/developers](/developers/)をご覧ください。

- [ブロックチェーン解説](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [スマートコントラクトを理解する](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [初めてのスマートコントラクトを作成する](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidityのコンパイルとデプロイ方法を学ぶ](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [コントラクトチュートリアル](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## 初心者向けの記事と書籍 {#beginner-articles-and-books}

- [Geth入門](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [Golangを使ってイーサリアムに接続する](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Golangを使用してイーサリアムのスマートコントラクトをデプロイする](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Goでイーサリアムのスマートコントラクトをテストおよびデプロイするためのステップバイステップガイド](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [eBook: Goによるイーサリアム開発](https://goethereumbook.org/) - _Goでイーサリアムアプリケーションを開発_

## 中級者向けの記事とドキュメント {#intermediate-articles-and-docs}

- [Go Ethereumドキュメント](https://geth.ethereum.org/docs/) - _公式イーサリアムGolangのドキュメント_
- [Erigonプログラマーガイド](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _ステートツリー、マルチプルーフ、トランザクション処理を含む図解ガイド_
- [Erigonとステートレスイーサリアム](https://youtu.be/3-Mn7OckSus?t=394) - _2020 イーサリアム・コミュニティ・カンファレンス (EthCC 3)_
- [Erigon: イーサリアムクライアントの最適化](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _2018 Devcon 4_
- [Go Ethereum GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [GethとGoでdappを作成する](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [GolangとGethでイーサリアムのプライベートネットワークを扱う](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Goでイーサリアム上のSolidityコントラクトを単体テストする](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [Gethをライブラリとして使用するためのクイックリファレンス](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## 高度な使用パターン {#advanced-use-patterns}

- [GETHシミュレーテッドバックエンド](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [イーサリアムとQuorumを使用したBlockchain-as-a-Serviceアプリ](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [イーサリアムブロックチェーンアプリケーションにおける分散ストレージIPFSとSwarm](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [モバイルクライアント: ライブラリとインプロセスイーサリアムノード](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [ネイティブdapps: イーサリアムコントラクトへのGoバインディング](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Goのプロジェクトとツール {#go-projects-and-tools}

- [Geth / Go Ethereum](https://github.com/ethereum/go-ethereum) - _イーサリアムプロトコルの公式Go実装_
- [Go Ethereum コード分析](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _Go Ethereumソースコードのレビューと分析_
- [Erigon](https://github.com/ledgerwatch/erigon) - _アーカイブノードに重点を置いた、Go Ethereumの高速な派生版_
- [Golem](https://github.com/golemfactory/golem) - _Golemはコンピューティングパワーのグローバル市場を創造しています_
- [Quorum](https://github.com/jpmorganchase/quorum) - _データプライバシーをサポートするイーサリアムの許可制実装_
- [Prysm](https://github.com/prysmaticlabs/prysm) - _イーサリアム「Serenity」2.0のGo実装_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _分散型Twitter: イーサリアムブロックチェーン上で稼働するマイクロブログサービス_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _Minimum Viable Plasma仕様のGolang実装および拡張_
- [Open Ethereum Mining Pool](https://github.com/sammy007/open-ethereum-pool) - _オープンソースのイーサリアムマイニングプール_
- [イーサリアムHDウォレット](https://github.com/miguelmota/go-ethereum-hdwallet) - _GoによるイーサリアムHDウォレットの派生_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _多くの種類のイーサリアムネットワークをサポート_
- [Gethライトクライアント](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _Light Ethereum SubprotocolのGeth実装_
- [イーサリアムGolang SDK](https://github.com/everFinance/goether) - _Golangでのシンプルなイーサリアムウォレットの実装とユーティリティ_
- [Covalent Golang SDK](https://github.com/covalenthq/covalent-api-sdk-go) - _200以上のブロックチェーンに対応したGo SDKで、ブロックチェーンデータに効率的にアクセス_

もっとリソースをお探しですか？ [ethereum.org/developers](/developers/)をチェックしてください

## Goコミュニティのコントリビューター {#go-community-contributors}

- [Geth Discord](https://discordapp.com/invite/nthXNEv)
- [Geth Gist](https://gitter.im/ethereum/go-ethereum)
- [Gophers Slack](https://invite.slack.golangbridge.org/) - [#ethereumチャンネル](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - Ethereum](https://ethereum.stackexchange.com/)
- [Multi Geth Gitter](https://gitter.im/ethoxy/multi-geth)
- [Ethereum Gitter](https://gitter.im/ethereum/home)
- [GethライトクライアントGitter](https://gitter.im/ethereum/light-client)

## その他の集約リスト {#other-aggregated-lists}

- [Awesome Ethereum](https://github.com/btomashvili/awesome-ethereum)
- [Consensys: イーサリアム開発者ツールの完全版リスト](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-215974) | [GitHubソース](https://github.com/ConsenSys/ethereum-developer-tools-list)
