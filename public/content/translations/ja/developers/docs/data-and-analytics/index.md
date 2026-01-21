---
title: "データと分析"
description: "dappsで使用するオンチェーンの分析とデータを取得する方法"
lang: ja
---

## はじめに {#Introduction}

ネットワークの利用が拡大し続けるにつれて、オンチェーンデータにはますます多くの貴重な情報が存在するようになります。 データ量の急増に伴い、こうした情報を計算して集約し、レポートを作成したり、dappを動作させたりするためには、多大な時間と労力が必要になってきています。

既存のデータプロバイダを活用することで、開発を迅速化し、より正確な結果を生み出し、維持のための労力を削減できます。 これにより、チームはプロジェクトが提供しようとしているコア機能に集中することができます。

## 前提条件{#prerequisites}

データ分析の文脈で[ブロックエクスプローラー](/developers/docs/data-and-analytics/block-explorers/)の使用をより深く理解するためには、その基本的な概念を理解しておく必要があります。 さらに、システム設計にもたらすメリットを理解するために、[インデックス](/glossary/#index)の概念をよく理解しておきましょう。

アーキテクチャの基礎という点では、たとえ理論上であっても[API](https://www.wikipedia.org/wiki/API)や[REST](https://www.wikipedia.org/wiki/Representational_state_transfer)が何であるかを理解しておくことです。

## ブロックエクスプローラー {#block-explorers}

多くの[ブロックエクスプローラー](/developers/docs/data-and-analytics/block-explorers/)は、ブロック、トランザクション、バリデータ、アカウント、その他のオンチェーンアクティビティに関するリアルタイムデータへの可視性をデベロッパーに提供する[RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [API](https://www.wikipedia.org/wiki/API)ゲートウェイを提供しています。

デベロッパーは、このデータを処理および変換して、ユーザーに[ブロックチェーン](/glossary/#blockchain)とのユニークなインサイトやインタラクションを提供することができます。 例えば、[Etherscan](https://etherscan.io)や[Blockscout](https://eth.blockscout.com)は、12秒のスロットごとに実行とコンセンサスのデータを提供しています。

## The Graph {#the-graph}

[The Graph](https://thegraph.com/)は、サブグラフとして知られるオープンAPIを通じてブロックチェーンデータを簡単にクエリできるインデックス作成プロトコルです。

The Graphを利用することで、デベロッパーは以下のメリットを得ることができます。

- 分散型インデックス作成: 複数のインデクサーを通じてブロックチェーンデータのインデックス作成を可能にし、単一障害点を排除します
- GraphQLクエリ: インデックス化されたデータをクエリするための強力なGraphQLインターフェースを提供し、データ取得を非常に簡単にします
- カスタマイズ: ブロックチェーンデータを変換・保存するための独自のロジックを定義し、The Graphネットワーク上の他のデベロッパーが公開したサブグラフを再利用できます

この[クイックスタート](https://thegraph.com/docs/en/quick-start/)ガイドに従って、5分以内にサブグラフを作成、デプロイ、クエリしましょう。

## クライアントの多様性 {#client-diversity}

[クライアントの多様性](/developers/docs/nodes-and-clients/client-diversity/)は、バグやエクスプロイトに対する回復力を提供するため、イーサリアムネットワーク全体の健全性にとって重要です。 現在、[clientdiversity.org](https://clientdiversity.org/)、[rated.network](https://www.rated.network)、[supermajority.info](https://supermajority.info//)、[Ethernodes](https://ethernodes.org/)など、いくつかのクライアント多様性ダッシュボードがあります。

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/)は、ブロックチェーンデータをリレーショナルデータベース (DuneSQL) テーブルに前処理し、ユーザーがSQLを使用してブロックチェーンデータをクエリし、クエリ結果に基づいてダッシュボードを構築できるようにします。 オンチェーンデータは、`blocks`、`transactions`、(イベント) `logs`、(コール) `traces`の4つの生テーブルに整理されています。 一般的なコントラクトやプロトコルはデコードされており、それぞれにイベントと呼び出しのテーブルのセットがあります。 これらのイベントと呼び出しのテーブルはさらに処理され、DEX、レンディング、ステーブルコインなどのプロトコルの種類によって抽象テーブルに編成されます。

## SQD {#sqd}

[SQD](https://sqd.dev/)は、大量のデータへの効率的でパーミッションレスなアクセスを提供するために最適化された、分散型のハイパースケーラブルなデータプラットフォームです。 現在、イベントログ、トランザクションレシート、トレース、トランザクションごとの状態差分など、過去のオンチェーンデータを提供しています。 SQDは、カスタムデータ抽出および処理パイプラインを作成するための強力なツールキットを提供し、毎秒最大15万ブロックのインデックス作成速度を達成します。

始めるには、[ドキュメント](https://docs.sqd.dev/)にアクセスするか、SQDで構築できるものの[EVMの例](https://github.com/subsquid-labs/squid-evm-examples)をご覧ください。

## SubQueryネットワーク {#subquery-network}

[SubQuery](https://subquery.network/)は、Web3プロジェクト向けに高速で信頼性が高く、分散化されたカスタマイズAPIをデベロッパーに提供する、主要なデータインデクサーです。 SubQueryでは、165以上のエコシステム(イーサリアムを含む)で豊富なインデックスされたデータを用いてデベロッパーがユーザーへ直観的で没入型のエクスペリエンスを構築できるようにします。 SubQueryネットワークは、回復力があり分散型のインフラストラクチャネットワークを用いて止まらないアプリにします。 SubQueryのブロックチェーン・デベロッパー・ツールキットを用いてweb3アプリケーションの未来を構築しましょう。データ処理を行うカスタムバックエンドの構築に時間を費やす必要はありません。

始めるには、[イーサリアムクイックスタートガイド](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html)にアクセスし、[SubQueryのマネージドサービス](https://managedservice.subquery.network/)または[SubQueryの分散型ネットワーク](https://app.subquery.network/dashboard)で公開する前に、ローカルのDocker環境でテストするために数分でイーサリアムブロックチェーンデータのインデックス作成を開始してください。

## EVMクエリ言語 {#evm-query-language}

EVMクエリ言語 (EQL) は、EVM (イーサリアム仮想マシン) チェーンをクエリするために設計されたSQLのような言語です。 EQLの最終的な目標は、EVMチェーンのファーストクラスシチズン (ブロック、アカウント、トランザクション) に対する複雑なリレーショナルクエリをサポートし、同時にデベロッパーや研究者に日常的に使用できる人間工学に基づいた構文を提供することです。 EQLを使用すると、デベロッパーはおなじみのSQLのような構文を使用してブロックチェーンデータを取得でき、複雑な定型コードの必要性を排除できます。 EQLは、標準的なブロックチェーンデータリクエスト (例：イーサリアム上のアカウントのノンスと残高の取得、現在のブロックサイズとタイムスタンプの取得) をサポートしており、より複雑なリクエストや機能セットのサポートを継続的に追加しています。

## 参考リンク{#further-reading}

- [暗号データの探求 I: データフローアーキテクチャ](https://web.archive.org/web/20250125012042/https://research.2077.xyz/exploring-crypto-data-1-data-flow-architectures)
- [Graphネットワークの概要](https://thegraph.com/docs/en/about/)
- [Graphクエリプレイグラウンド](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [EtherScan上のAPIコード例](https://etherscan.io/apis#contracts)
- [BlockscoutのAPIドキュメント](https://docs.blockscout.com/devs/apis)
- [Beaconcha.inビーコンチェーンエクスプローラー](https://beaconcha.in)
- [Duneの基礎](https://docs.dune.com/#dune-basics)
- [SubQuery イーサリアム クイックスタートガイド](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
- [SQDネットワークの概要](https://docs.sqd.dev/)
- [EVMクエリ言語](https://eql.sh/blog/alpha-release-notes)
