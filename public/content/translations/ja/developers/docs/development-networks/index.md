---
title: "開発用ネットワーク"
description: "開発用ネットワークとイーサリアムアプリケーションの構築に役立つツールの概要。"
lang: ja
---

スマートコントラクトを使用するイーサリアムアプリケーションを構築する場合は、デプロイする前にローカルネットワーク上で実行して動作を確認することをお勧めします。

ウェブ開発において自分のコンピュータ上でローカルサーバを実行する場合と同様に、開発用ネットワークを使用してローカルブロックチェーンのインスタンスを作成し、dappをテストできます。 このイーサリアムの開発用ネットワークには、パブリックテストネットワークと比較して反復処理を大幅に迅速化する機能があります (たとえば、テストネットフォーセットからETHを取得する必要がありません)。

## 前提条件 {#prerequisites}

開発ネットワークについて学ぶ前に、[イーサリアムスタックの基本](/developers/docs/ethereum-stack/)と[イーサリアムネットワーク](/developers/docs/networks/)を理解しておく必要があります。

## 開発用ネットワークとは {#what-is-a-development-network}

開発用ネットワークは、基本的にはローカル開発のために設計された専用のイーサリアムクライアント (イーサリアムの実装) です。

**標準のイーサリアムノードをローカルで実行するだけでは不十分なのはなぜか？**

[ノードを実行する](/developers/docs/nodes-and-clients/#running-your-own-node)ことも_可能_ですが、開発ネットワークは開発専用に作られているため、多くの場合、次のような便利な機能が搭載されています。

- ローカルブロックチェーンへのデータの決定論的なシード（例：ETH残高を持つアカウント）
- 受け取ったトランザクションごとに、順序どおり遅延なく即時にブロックを生成する機能
- デバッグとロギングの拡張機能

## 利用可能なツール {#available-projects}

**注**：ほとんどの[開発フレームワーク](/developers/docs/frameworks/)には、組み込みの開発ネットワークが含まれています。 フレームワークを使って[ローカル開発環境をセットアップする](/developers/local-environment/)ことから始めることをお勧めします。

### Hardhatネットワーク {#hardhat-network}

開発用に設計されたローカルイーサリアムネットワークです。 コントラクトのデプロイ、テストの実行、コードのデバッグを可能にします。

Hardhat Networkには、プロフェッショナルのためのイーサリアム開発環境であるHardhatが組み込まれています。

- [ウェブサイト](https://hardhat.org/)
- [GitHub](https://github.com/NomicFoundation/hardhat)

### ローカルビーコンチェーン {#local-beacon-chains}

一部のコンセンサスクライアントには、テスト用にローカルビーコンチェーンをスピンアップするためのツールが組み込まれています。 Lighthouse、Nimbus、Lodestarでの手順は、以下で確認できます。

- [Lodestarを使用したローカルテストネット](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [Lighthouseを使用したローカルテストネット](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)

### パブリックイーサリアムテストチェーン {#public-beacon-testchains}

また、イーサリアムの維持されている2つのパブリックテスト実装もあります：SepoliaとHoodiです。 長期サポートが推奨されるテストネットはHoodiで、誰でも自由にバリデートできます。 Sepoliaは許可制のバリデーターセットを使用しており、このテストネット上では新しいバリデーターへの一般的なアクセスがありません。

- [Hoodiステーキングランチパッド](https://hoodi.launchpad.ethereum.org/)

### Kurtosisイーサリアムパッケージ {#kurtosis}

Kurtosisは、マルチコンテナテスト環境のビルドシステムで、デベロッパーがブロックチェーンネットワークの再現可能なインスタンスをローカルで起動できるようにします。

イーサリアムKurtosisパッケージを使用すると、パラメータ化された、高スケーラブルで、プライベートのイーサリアムテストネットをDockerもしくはKubernetesで素早くインスタンス化できます。 このパッケージでは、すべての主要な実行レイヤー (EL) およびコンセンサスレイヤー (CL) クライアントをサポートしています。 Kurtosisは、適切にすべてのローカルポートのマッピングを処理し、提供するネットワークへサービス接続をして、イーサリアムコアインフラストラクチャに関する検証およびテストワークフローに使えるようにします。

- [イーサリアムネットワークパッケージ](https://github.com/kurtosis-tech/ethereum-package)
- [ウェブサイト](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [ドキュメント](https://docs.kurtosis.com/)

## 参考リンク {#further-reading}

_役に立つコミュニティリソースを知っていますか? Edit this page and add it!_

## 関連トピック {#related-topics}

- [開発フレームワーク](/developers/docs/frameworks/)
- [ローカル開発環境をセットアップする](/developers/local-environment/)
