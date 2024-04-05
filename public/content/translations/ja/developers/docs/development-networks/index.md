---
title: 開発用ネットワーク
description: 開発用ネットワークとイーサリアムアプリケーションの構築に役立つツールの概要。
lang: ja
---

スマートコントラクトを使用するイーサリアムアプリケーションを構築する場合は、デプロイする前にローカルネットワーク上で実行して動作を確認することをお勧めします。

ウェブ開発において自分のコンピュータ上でローカルサーバを実行する場合と同様に、開発用ネットワークを使用してローカルブロックチェーンのインスタンスを作成し、dappをテストできます。 このイーサリアムの開発用ネットワークには、パブリックテストネットワークと比較して反復処理を大幅に迅速化する機能があります (たとえば、テストネットフォーセットからETHを取得する必要がありません)。

## 前提知識 {#prerequisites}

開発用ネットワークについて学ぶ前に、[イーサリアムスタック](/developers/docs/ethereum-stack/)と[イーサリアムネットワーク](/developers/docs/networks/)の基本を理解する必要があります。

## 開発用ネットワークとは {#what-is-a-development-network}

開発用ネットワークは、基本的にはローカル開発のために設計された専用のイーサリアムクライアント (イーサリアムの実装) です。

**標準的なイーサリアムノードをローカルで実行してみましょう。**

そのまま[ノードの実行](/developers/docs/nodes-and-clients/#running-your-own-node)に進むことも_可能_ですが、開発用ネットワークは開発用に構築されているため、多くの場合に以下のような便利な機能が搭載されています。

- ローカルブロックチェーンにデータを確定的にシードする (ETH残高を持つアカウントなど) 機能
- 受け取ったトランザクションごとに、順序どおり遅延なく即時にブロックを生成する機能
- デバッグとロギングの拡張機能

## 利用可能なツール {#available-projects}

**注**: ほとんどの[開発フレームワーク](/developers/docs/frameworks/)には、組み込みの開発用ネットワークが含まれています。 フレームワークの[ローカル開発環境のセットアップ](/developers/local-environment/)から始めることをお勧めします。

### Ganache {#ganache}

テストの実行、コマンドの実行、状態の調査に使用できる専用のイーサリアムブロックチェーンを迅速に起動し、チェーンの動作を制御します。

Ganacheは、デスクトップアプリケーション(Ganache UI)とコマンドラインツール(`ganache-cli`)の両方を提供しています。 Truffle Suiteというツールスイートに組み込まれています。

- [ウェブサイト](https://www.trufflesuite.com/ganache)
- [GitHub](https://github.com/trufflesuite/ganache)
- [ドキュメント](https://www.trufflesuite.com/docs/ganache/overview)

### Hardhat Network {#hardhat-network}

開発用に設計されたローカルイーサリアムネットワークです。 コントラクトのデプロイ、テストの実行、コードのデバッグを可能にします。

Hardhat Networkには、プロフェッショナルのためのイーサリアム開発環境であるHardhatが組み込まれています。

- [ウェブサイト](https://hardhat.org/)
- [GitHub](https://github.com/nomiclabs/hardhat)

### ローカルビーコンチェーン {#local-beacon-chains}

一部のコンセンサスクライアントには、テスト用にローカルビーコンチェーンをスピンアップするためのツールが組み込まれています。 Lighthouse、Nimbus、Lodestarでの手順は、以下で確認できます。

- [Lodestarを使用したローカルテストネット](https://chainsafe.github.io/lodestar/usage/local/)
- [Lighthouseを使用したローカルテストネット](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)
- [Nimbusを使用したローカルテストネット](https://github.com/status-im/nimbus-eth1/blob/master/fluffy/docs/local_testnet.md)

### 公開イーサリアムテストチェーン {#public-beacon-testchains}

また、イーサリアムにはGoerliとSepoliaという、2つの維持されている公開テスト環境の実装もあります。 長期的なサポートが受けられる推奨テストネットはGoerliです。Goerliは、誰でも自由に検証できます。 Sepoliaは、より新しい小規模なチェーンであり、当面は維持されると予測されています。許可されたバリデータのみがアクセスできます(つまり、このテストネットには、新規のバリデータは通常アクセスできません)。 Ropstenチェーンは、2022年の第4期に廃止される予定です。Rinkebyチェーンは、2023年の第2期または第3期に廃止される予定です。

- [Goerliステーキングランチパッド](https://goerli.launchpad.ethereum.org/)
- [Ropsten、Rinkeby、Kilnの廃止のお知らせ](https://blog.ethereum.org/2022/06/21/testnet-deprecation)

### Kurtosisイーサリアムパッケージ {#kurtosis}

Kurtosisは、マルチコンテナテスト環境のビルドシステムで、デベロッパーがブロックチェーンネットワークの再現可能なインスタンスをローカルで起動できるようにします。

イーサリアムKurtosisパッケージでは、複数の異なる実行レイヤー(EL)およびコンセンサスレイヤー(CL)クライアントとn個のノードをサポートし、コンテナ化されたパラメータ化可能なイーサリアムテストネットをローカルでインスタンス化します。 Kurtosisによって、すべてのローカルポートマッピングとサービス接続を適切に処理することで、dAppやスマートコントラクトのプロトタイピングとテストを容易にします。

- [イーサリアムネットワークパッケージ](https://github.com/kurtosis-tech/eth-network-package)
- [ウェブサイト](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [ドキュメント](https://docs.kurtosis.com/)

## 参考文献 {#further-reading}

_役に立ったコミュニティリソースがあれば、 ぜひこのページに追加してください。_

## 関連トピック {#related-topics}

- [開発フレームワーク](/developers/docs/frameworks/)
- [ローカル開発環境のセットアップ](/developers/local-environment/)
