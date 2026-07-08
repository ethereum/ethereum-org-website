---
title: "開発ネットワーク"
description: "開発ネットワークと、イーサリアムアプリケーションの構築に役立つツールの概要。"
lang: ja
---

スマートコントラクトを使用した[イーサリアム](/)アプリケーションを構築する際、デプロイする前にローカルネットワーク上で実行して動作を確認したいと考えるでしょう。

Web開発のためにコンピュータ上でローカルサーバーを実行するのと同じように、開発ネットワークを使用してローカルのブロックチェーンインスタンスを作成し、分散型アプリケーション (dapp) をテストできます。これらのイーサリアム開発ネットワークは、パブリックなテストネットよりもはるかに高速なイテレーションを可能にする機能を提供します（たとえば、テストネット・フォーセットからETHを取得する手間が省けます）。

## 前提条件 {#prerequisites}

開発ネットワークについて深く学ぶ前に、[イーサリアムスタックの基礎](/developers/docs/ethereum-stack/)と[イーサリアムネットワーク](/developers/docs/networks/)について理解しておく必要があります。

## 開発ネットワークとは？ {#what-is-a-development-network}

開発ネットワークは、本質的にはローカル開発専用に設計されたイーサリアムクライアント（イーサリアムの実装）です。

**標準のイーサリアムノードをローカルで実行しないのはなぜですか？**

[ノードを実行する](/developers/docs/nodes-and-clients/#running-your-own-node)ことも_可能_ですが、開発ネットワークは開発目的に特化して構築されているため、以下のような便利な機能が備わっていることがよくあります。

- ローカルのブロックチェーンに決定論的にデータをシードする（例：ETH残高を持つアカウント）
- トランザクションを受信するたびに、遅延なく順番にブロックを即座に生成する
- 強化されたデバッグおよびロギング機能

## 利用可能なツール {#available-projects}

**注**: ほとんどの[開発フレームワーク](/developers/docs/frameworks/)には、開発ネットワークが組み込まれています。[ローカル開発環境をセットアップする](/developers/local-environment/)には、フレームワークから始めることをお勧めします。

### Hardhat Network {#hardhat-network}

開発用に設計されたローカルのイーサリアムネットワークです。コントラクトをデプロイし、テストを実行し、コードをデバッグすることができます。

Hardhat Networkは、プロフェッショナル向けのイーサリアム開発環境であるHardhatに組み込まれています。

- [ウェブサイト](https://hardhat.org/)
- [GitHub](https://github.com/NomicFoundation/hardhat)

### ローカルビーコンチェーン {#local-beacon-chains}

一部のコンセンサスクライアントには、テスト目的でローカルビーコンチェーンを立ち上げるためのツールが組み込まれています。ライトハウス、ニンバス、ロードスターの手順は以下の通りです。

- [ロードスターを使用したローカルテストネット](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [ライトハウスを使用したローカルテストネット](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)

### パブリックなイーサリアムテストチェーン {#public-beacon-testchains}

イーサリアムのパブリックなテスト実装として維持されているものが2つあります。SepoliaとHoodiです。長期サポートが提供される推奨テストネットはHoodiであり、誰でも自由にバリデータとして参加できます。Sepoliaはパーミッションドのバリデータセットを使用しているため、このテストネットでは新しいバリデータへの一般的なアクセスはありません。

- [Hoodiステーキング・ローンチパッド](https://hoodi.launchpad.ethereum.org/)

### Kurtosisイーサリアムパッケージ {#kurtosis}

Kurtosisは、マルチコンテナテスト環境向けのビルドシステムであり、開発者がブロックチェーンネットワークの再現可能なインスタンスをローカルで立ち上げることを可能にします。

イーサリアムのKurtosisパッケージを使用すると、DockerまたはKubernetes上で、パラメータ化可能で拡張性の高いプライベートなイーサリアムテストネットを迅速にインスタンス化できます。このパッケージは、すべての主要な実行レイヤー（EL）およびコンセンサス・レイヤー（CL）クライアントをサポートしています。Kurtosisは、イーサリアムのコアインフラストラクチャに関連する検証およびテストワークフローで使用される代表的なネットワークのすべてのローカルポートマッピングとサービス接続を適切に処理します。

- [イーサリアムネットワークパッケージ](https://github.com/kurtosis-tech/ethereum-package)
- [ウェブサイト](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [ドキュメント](https://docs.kurtosis.com/)

## 参考文献 {#further-reading}

_役に立つコミュニティリソースをご存知ですか？このページを編集して追加してください！_

## 関連トピック {#related-topics}

- [開発フレームワーク](/developers/docs/frameworks/)
- [ローカル開発環境のセットアップ](/developers/local-environment/)

## チュートリアル：イーサリアムの開発ネットワークとテスト環境 {#tutorials}

- [マルチクライアントのローカルイーサリアムテストネットを使用したdAppの開発とテスト](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/) _– dAppの開発とテストのために、Kurtosisを使用してローカルのマルチクライアントイーサリアムテストネットを立ち上げる方法。_