---
title: データと分析
description: オンチェーン分析およびDappで使用するデータを取得する方法
lang: ja
---

## はじめに {#Introduction}

ネットワークの活用が拡大するにつれて、オンチェーンデータには高価値の情報がますます増えています。 データ量の急増に伴い、こうした情報を計算して集約し、レポートを作成したり、dapp を動作させたりするためには、多大な時間と労力が必要になってきています。

既存のデータプロバイダを活用することで、開発を迅速化し、より正確な結果を生み出し、維持のための労力を削減できます。 これにより、チームはプロジェクトが提供しようとしているコア機能に集中することができます。

## 前提知識 {#prerequisites}

データ分析の文脈における[ブロックエクスプローラー](/developers/docs/data-and-analytics/block-explorers/)の使用方法をより深く理解するためには、その基本的な概念を把握しておく必要があります。 また、[インデックス](/glossary/#index)の概念について熟知していると、システム設計に追加されたメリットについても理解できます。

アーキテクチャの基礎としては、[API](https://www.wikipedia.org/wiki/API)および[REST](https://www.wikipedia.org/wiki/Representational_state_transfer)の概念について、少なくとも理論として把握している必要があります。

## ブロックエクスプローラー {#block-explorers}

多くの[ブロックエクスプローラー](/developers/docs/data-and-analytics/block-explorers/)は、[RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [API](https://www.wikipedia.org/wiki/API)ゲートウェイを提供しています。このゲートウェイにより、デベロッパーは、ブロック、トランザクション、マイナー、アカウント、およびその他のオンチェーンアクティビティについて、リアルタイムのデータを可視化できるようになります。

デベロッパーはこうしたデータを処理して変換することで、[ブロックチェーン](/glossary/#blockchain)についての独自のインサイトおよびやり取りをユーザーに提供できます。 たとえば、[Etherscan](https://etherscan.io)は、12 秒のスロットごとに実行データとコンセンサスデータを提供します。

## The Graph {#the-graph}

[Graph ネットワーク](https://thegraph.com/)は、ブロックチェーンデータを編成するための分散型インデックスプロトコルです。 The Graph では、オンチェーンデータを集約するためにオフチェーンの中央データストアの構築と管理を行う必要はありません。デベロッパーは、完全にパブリックインフラストラクチャで実行できるサーバレスアプリケーションを構築できます。

[GraphQL](https://graphql.org/)を使用することにより、デベロッパーはサブグラフと呼ばれるキュレートされた任意のオープン API のクエリを実行して、dapp の動作に必要な情報を取得できます。 このインデックス化されたサブグラフへのクエリを実行することで、レポートと dapp について、パフォーマンスやスケーラビリティ面でのメリットを得られるだけでなく、ネットワークコンセンサスによって本質的な精度も向上します。 新たな機能改善やサブグラフがネットワークに追加されることでプロジェクトの反復処理が迅速化し、こうした機能強化をさらに活用できるようになります。

## クライアントの多様性

[クライアントの多様性](/developers/docs/nodes-and-clients/client-diversity/)は、バグや脆弱性に対する回復力を提供します。そのため、イーサリアムネットワーク全体の健全性にとって重要です。 現在、
clientdiversity.org[rated.network](https://www.rated.network)、[execution-diversity.info](https://execution-diversity.info/)、[Ethernodes](https://ethernodes.org/)など、いくつかのクライアント多様性ダッシュボードが存在します。

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/)は、リレーショナルデータベース(PostgreSQL および DatabricksSQL)テーブルのために、ブロックチェーンデータの前処理を行います。 これにより、ユーザーは SQL を使用してブロックチェーンデータのクエリを実行し、クエリ結果に基づいてダッシュボードを構築できるようになります。 オンチェーンデータは、`blocks`、`transactions`、(event) `logs`、(call) `traces`という、4 つの未加工テーブルに編成されます。 一般的なコントラクトやプロトコルはデコードされており、それぞれにイベントと呼び出しのテーブルのセットがあります。 これらのイベントと呼び出しのテーブルはさらに処理され、DEX、レンディング、ステーブルコインなどのプロトコルの種類によって抽象テーブルに編成されます。

## 参考文献 {#further-reading}

- [Graph ネットワークの概要](https://thegraph.com/docs/en/about/network/)
- [Graph Query Playground](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [EtherScan の API コードの例](https://etherscan.io/apis#contracts)
- [Beaconcha.in ビーコンチェーンエクスプローラー](https://beaconcha.in)
- [Dune の基礎](https://docs.dune.com/#dune-basics)
