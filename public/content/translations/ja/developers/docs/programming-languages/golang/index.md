---
title: Go開発者のためのイーサリアム
description: Goベースのプロジェクトとツールを使用してイーサリアム向けに開発する方法を学ぶ
lang: ja
incomplete: true
---

<FeaturedText>Goベースのプロジェクトとツールを使用してイーサリアム向けに開発する方法を学ぶ</FeaturedText>

イーサリアムを使用して、分散型アプリケーション (dapp) を作成します。これらのdappは信頼性が高く、一度イーサリアムにデプロイされると、常にプログラムされた通りに実行されます。これらは分散型であり、ピア・ツー・ピアのネットワーク上で実行されるため、単一障害点がありません。単一の組織や個人がこれらを制御することはなく、検閲することはほぼ不可能です。これらはデジタル資産を制御して、新しい種類のアプリケーションを作成することができます。

## スマート・コントラクトとSolidity言語の基礎 {#getting-started-with-smart-contracts-and-solidity}

**Goとイーサリアムを統合するための第一歩を踏み出す**

まずはより基本的な入門書が必要ですか？ [ethereum.org/learn](/learn/) または [ethereum.org/developers](/developers/) を確認してください。

- [ブロックチェーンの解説](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [スマート・コントラクトの理解](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [初めてのスマート・コントラクトを作成する](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidityのコンパイルとデプロイ方法を学ぶ](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [コントラクトのチュートリアル](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## 初心者向けの記事と書籍 {#beginner-articles-and-books}

- [Gethの基礎](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [Golangを使用してイーサリアムに接続する](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Golangを使用してイーサリアムのスマート・コントラクトをデプロイする](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Goでイーサリアムのスマート・コントラクトをテストおよびデプロイするためのステップバイステップガイド](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [電子書籍: Goによるイーサリアム開発](https://goethereumbook.org/) - _Goでイーサリアムアプリケーションを開発する_

## 中級者向けの記事とドキュメント {#intermediate-articles-and-docs}

- [Go Ethereumドキュメント](https://geth.ethereum.org/docs) - _公式のイーサリアムGolang実装のドキュメント_
- [エリゴン・プログラマーズガイド](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _状態ツリー、マルチプルーフ、トランザクション処理を含む図解ガイド_
- [エリゴンとステートレス・イーサリアム](https://youtu.be/3-Mn7OckSus?t=394) - _2020年イーサリアムコミュニティカンファレンス (EthCC 3)_
- [エリゴン: イーサリアムクライアントの最適化](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _2018年 Devcon 4_
- [Go Ethereum GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [Gethを使用してGoでdappを作成する](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [GolangとGethを使用してイーサリアムのプライベートネットワークを操作する](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Goを使用してイーサリアム上のSolidityコントラクトをユニットテストする](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [Gethをライブラリとして使用するためのクイックリファレンス](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## 高度な使用パターン {#advanced-use-patterns}

- [GETHシミュレートバックエンド](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [イーサリアムとQuorumを使用したBlockchain-as-a-Serviceアプリ](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [イーサリアムのブロックチェーンアプリケーションにおける分散ストレージIPFSとスウォーム](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [モバイルクライアント: ライブラリとインプロセス・イーサリアムノード](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [ネイティブdapp: イーサリアムコントラクトへのGoバインディング](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Goのプロジェクトとツール {#go-projects-and-tools}

- [Geth / Go Ethereum](https://github.com/ethereum/go-ethereum) - _イーサリアムプロトコルの公式Go実装_
- [Go Ethereumコード分析](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _Go Ethereumソースコードのレビューと分析_
- [エリゴン](https://github.com/ledgerwatch/erigon) - _アーカイブノードに焦点を当てた、Go Ethereumのより高速な派生版_
- [Golem](https://github.com/golemfactory/golem) - _Golemはコンピューティングパワーのグローバル市場を構築しています_
- [Quorum](https://github.com/jpmorganchase/quorum) - _データプライバシーをサポートするイーサリアムのパーミッションド実装_
- [プリズム](https://github.com/prysmaticlabs/prysm) - _イーサリアム「Serenity」2.0のGo実装_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _分散型ツイッター: イーサリアムのブロックチェーン上で実行されるマイクロブログサービス_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _Minimum Viable Plasma仕様のGolang実装および拡張_
- [Open Ethereum Mining Pool](https://github.com/sammy007/open-ethereum-pool) - _オープンソースのイーサリアムのマイニングプール_
- [Ethereum HD Wallet](https://github.com/miguelmota/go-ethereum-hdwallet) - _GoでのイーサリアムHDウォレットの派生_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _多くの種類のイーサリアムネットワークのサポート_
- [Gethライト・クライアント](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _Light Ethereum SubprotocolのGeth実装_
- [Ethereum Golang SDK](https://github.com/everFinance/goether) - _Golangでのシンプルなイーサリアムウォレット実装とユーティリティ_
- [Covalent Golang SDK](https://github.com/covalenthq/covalent-api-sdk-go) - _200以上のブロックチェーンに対するGo SDKを介した効率的なブロックチェーンデータアクセス_

さらにリソースをお探しですか？ [ethereum.org/developers](/developers/) を確認してください。

## Goコミュニティの貢献者 {#go-community-contributors}

- [Gethディスコード](https://discordapp.com/invite/nthXNEv)
- [Geth Gist](https://gitter.im/ethereum/go-ethereum)
- [Gophers Slack](https://invite.slack.golangbridge.org/) - [#ethereum チャンネル](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - イーサリアム](https://ethereum.stackexchange.com/)
- [Multi Geth Gitter](https://gitter.im/ethoxy/multi-geth)
- [イーサリアム Gitter](https://gitter.im/ethereum/home)
- [Gethライト・クライアント Gitter](https://gitter.im/ethereum/light-client)

## その他のまとめリスト {#other-aggregated-lists}

- [Awesome Ethereum](https://github.com/btomashvili/awesome-ethereum)
- [コンセンシス: イーサリアム開発者ツールの決定版リスト](https://web.archive.org/web/2023/https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [GitHubソース](https://github.com/ConsenSys/ethereum-developer-tools-list)