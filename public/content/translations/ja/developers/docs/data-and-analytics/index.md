---
title: "データと分析"
description: "分散型アプリケーション (dapp) で使用するオンチェーンの分析とデータを取得する方法"
lang: ja
---

## はじめに {#introduction}

ネットワークの利用が拡大し続けるにつれて、オンチェーンデータにはますます多くの価値ある情報が存在するようになります。データ量が急速に増加する中で、この情報を計算・集約してレポートを作成したり、分散型アプリケーション (dapp) を駆動させたりすることは、時間と処理の負担が大きい作業になる可能性があります。

既存のデータプロバイダーを活用することで、開発を迅速化し、より正確な結果を生み出し、継続的なメンテナンスの労力を削減できます。これにより、チームはプロジェクトが提供しようとしているコア機能に集中できるようになります。

## 前提条件 {#prerequisites}

データ分析のコンテキストでの使用をよりよく理解するために、[ブロックエクスプローラー](/developers/docs/data-and-analytics/block-explorers/)の基本概念を理解しておく必要があります。さらに、システム設計にもたらす利点を理解するために、[インデックス](/glossary/#index)の概念にも慣れておいてください。

アーキテクチャの基礎としては、[API](https://www.wikipedia.org/wiki/API)と[REST](https://www.wikipedia.org/wiki/Representational_state_transfer)が何であるかを、理論上だけでも理解しておく必要があります。

## ブロックエクスプローラー {#block-explorers}

多くの[ブロックエクスプローラー](/developers/docs/data-and-analytics/block-explorers/)は、開発者がブロック、トランザクション、バリデータ、アカウント、およびその他のオンチェーンアクティビティに関するリアルタイムデータを可視化できる[RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer)な[API](https://www.wikipedia.org/wiki/API)ゲートウェイを提供しています。

開発者はこのデータを処理および変換して、ユーザーに独自の洞察を提供し、[ブロックチェーン](/glossary/#blockchain)とのインタラクションを提供できます。たとえば、[Etherscan](https://etherscan.io)や[Blockscout](https://eth.blockscout.com)は、12秒の各スロットの実行データとコンセンサスデータを提供します。

## The Graph {#the-graph}

[The Graph](https://thegraph.com/)は、サブグラフと呼ばれるオープンなAPIを通じてブロックチェーンデータを簡単にクエリできるインデックス作成プロトコルです。

The Graphを使用すると、開発者は以下の利点を得ることができます。

- 分散型インデックス作成: 複数のインデクサーを通じてブロックチェーンデータのインデックスを作成できるため、単一障害点が排除されます。
- GraphQLクエリ: インデックス化されたデータをクエリするための強力なGraphQLインターフェースを提供し、データの取得を非常に簡単にします。
- カスタマイズ: ブロックチェーンデータを変換および保存するための独自のロジックを定義し、The Graphネットワーク上で他の開発者が公開したサブグラフを再利用できます。

この[クイックスタート](https://thegraph.com/docs/en/quick-start/)ガイドに従って、5分以内にサブグラフを作成、デプロイ、およびクエリしてください。

## クライアント・ダイバーシティ {#client-diversity}

[クライアント・ダイバーシティ](/developers/docs/nodes-and-clients/client-diversity/)は、バグやエクスプロイトに対する回復力を提供するため、イーサリアムネットワーク全体の健全性にとって重要です。現在、[clientdiversity.org](https://clientdiversity.org/)、[rated.network](https://www.rated.network)、[supermajority.info](https://supermajority.info//)、[Ethernodes](https://ethernodes.org/)など、いくつかのクライアント・ダイバーシティのダッシュボードが存在します。

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/)は、ブロックチェーンデータをリレーショナルデータベース (DuneSQL) のテーブルに事前処理し、ユーザーがSQLを使用してブロックチェーンデータをクエリし、クエリ結果に基づいてダッシュボードを構築できるようにします。オンチェーンデータは、`blocks`、`transactions`、(イベント) `logs`、(コール) `traces`の4つの生テーブルに整理されています。人気のあるコントラクトやプロトコルはデコードされており、それぞれに独自のイベントテーブルとコールテーブルのセットがあります。これらのイベントテーブルとコールテーブルはさらに処理され、DEX、レンディング、ステーブルコインなどのプロトコルの種類ごとに抽象化テーブルに整理されます。

## SQD {#sqd}

[SQD](https://sqd.dev/)は、大量のデータへの効率的でパーミッションレスなアクセスを提供するように最適化された、分散型のハイパースケーラブルなデータプラットフォームです。現在、イベントログ、トランザクションレシート、トレース、トランザクションごとの状態の差分など、過去のオンチェーンデータを提供しています。SQDは、カスタムのデータ抽出および処理パイプラインを作成するための強力なツールキットを提供し、毎秒最大15万ブロックのインデックス作成速度を実現します。

始めるには、[ドキュメント](https://docs.sqd.dev/)にアクセスするか、SQDで構築できるものの[EVMの例](https://github.com/subsquid-labs/squid-evm-examples)を参照してください。

## SubQueryネットワーク {#subquery-network}

[SubQuery](https://subquery.network/)は、Web3プロジェクト向けに高速で信頼性が高く、分散型でカスタマイズされたAPIを開発者に提供する主要なデータインデクサーです。SubQueryは、165以上のエコシステム (イーサリアムを含む) の開発者に豊富なインデックス化されたデータを提供し、ユーザーにとって直感的で没入感のある体験を構築できるようにします。SubQueryネットワークは、回復力のある分散型インフラストラクチャネットワークで、止まらないアプリを強化します。SubQueryのブロックチェーン開発者ツールキットを使用して、データ処理アクティビティ用のカスタムバックエンドの構築に時間を費やすことなく、未来のWeb3アプリケーションを構築しましょう。

始めるには、[イーサリアムのクイックスタートガイド](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html)にアクセスしてください。[SubQueryのマネージドサービス](https://managedservice.subquery.network/)や[SubQueryの分散型ネットワーク](https://app.subquery.network/dashboard)で本番環境に移行する前に、テスト用のローカルDocker環境で数分でイーサリアムブロックチェーンデータのインデックス作成を開始できます。

## Codex {#codex}

[Codex](https://www.codex.io/)は、80以上のネットワークにわたる7,000万以上のトークンの充実したデータを提供するリアルタイムのブロックチェーンデータAPIです。開発者は、カスタムのインデックス作成インフラストラクチャを維持することなく、構造化されたトークン価格、ウォレット残高、トランザクション履歴、および集計された分析 (取引量、流動性、ユニークウォレット数) にアクセスできます。Codexは、WebSocketおよびWebhook統合による1秒未満のデータ配信をサポートしています。

始めるには、[ドキュメント](https://docs.codex.io)にアクセスするか、[エクスプローラー](https://docs.codex.io/explore)を試すか、[ダッシュボード](https://dashboard.codex.io/signup)でサインアップしてください。

## EVM Query Language {#evm-query-language}

EVM Query Language (EQL) は、EVM (イーサリアム仮想マシン) チェーンをクエリするために設計されたSQLライクな言語です。EQLの最終的な目標は、EVMチェーンのファーストクラスシチズン (ブロック、アカウント、トランザクション) に対する複雑なリレーショナルクエリをサポートすると同時に、開発者や研究者に日常的に使用できる人間工学に基づいた構文を提供することです。EQLを使用すると、開発者は使い慣れたSQLライクな構文を使用してブロックチェーンデータを取得でき、複雑なボイラープレートコードの必要性を排除できます。EQLは、標準的なブロックチェーンデータのリクエスト (例: イーサリアム上のアカウントのナンスと残高の取得、現在のブロックサイズとタイムスタンプの取得など) をサポートしており、より複雑なリクエストや機能セットのサポートを継続的に追加しています。

## 参考文献 {#further-reading}

- [暗号資産データの探索 I: データフローアーキテクチャ](https://web.archive.org/web/20250125012042/https://research.2077.xyz/exploring-crypto-data-1-data-flow-architectures)
- [The Graphネットワークの概要](https://thegraph.com/docs/en/about/)
- [Graphクエリプレイグラウンド](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [EtherScanのAPIコード例](https://etherscan.io/apis#contracts)
- [BlockscoutのAPIドキュメント](https://docs.blockscout.com/devs/apis)
- [Beaconcha.in ビーコン・チェーンエクスプローラー](https://beaconcha.in)
- [Duneの基礎](https://docs.dune.com/#dune-basics)
- [SubQuery イーサリアムクイックスタートガイド](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
- [SQDネットワークの概要](https://docs.sqd.dev/)
- [EVM Query Language](https://web.archive.org/web/20250719151453/https://www.eql.sh/blog/alpha-release-notes)

## チュートリアル: データと分析 / イーサリアム上のSQL {#tutorials}

- [SQLでイーサリアムの基礎トピックを学ぶ](/developers/tutorials/learn-foundational-ethereum-topics-with-sql/) _– SQLを使用してオンチェーンのイーサリアムデータをクエリし、トランザクション、ブロック、ガスの基礎を理解します。_
