---
title: データと分析
description: オンチェーン分析およびDappで使用するデータを取得する方法
lang: ja
---

## はじめに {#Introduction}

ネットワークの活用が拡大するにつれて、オンチェーンデータには高価値の情報がますます増えています。 データ量の急増に伴い、こうした情報を計算して集約し、レポートを作成したり、dappを動作させたりするためには、多大な時間と労力が必要になってきています。

既存のデータプロバイダを活用することで、開発を迅速化し、より正確な結果を生み出し、維持のための労力を削減できます。 これにより、チームはプロジェクトが提供しようとしているコア機能に集中することができます。

## 前提知識 {#prerequisites}

データ分析の文脈における[ブロックエクスプローラー](/developers/docs/data-and-analytics/block-explorers/)の使用方法をより深く理解するためには、その基本的な概念を把握しておく必要があります。 また、[インデックス](/glossary/#index)の概念について熟知していると、システム設計に追加されたメリットについても理解できます。

アーキテクチャの基礎としては、[API](https://www.wikipedia.org/wiki/API)および[REST](https://www.wikipedia.org/wiki/Representational_state_transfer)の概念について、少なくとも理論として把握している必要があります。

## ブロックエクスプローラー {#block-explorers}

多くの[ブロックエクスプローラー](/developers/docs/data-and-analytics/block-explorers/)は、[RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer)な[API](https://www.wikipedia.org/wiki/API)ゲートウェイを提供しており、デベロッパーはブロック、トランザクション、バリデータ、アカウント、その他のオンチェーン活動に関するリアルタイムデータを確認できます。

デベロッパーはこうしたデータを処理して変換することで、[ブロックチェーン](/glossary/#blockchain)についての独自のインサイトおよびやり取りをユーザーに提供できます。 たとえば、[Etherscan](https://etherscan.io)は、12秒のスロットごとに実行データとコンセンサスデータを提供します。

## The Graph {#the-graph}

[Graphネットワーク](https://thegraph.com/)は、ブロックチェーンデータを編成するための分散型インデックスプロトコルです。 The Graphでは、オンチェーンデータを集約するためにオフチェーンの中央データストアの構築と管理を行う必要はありません。デベロッパーは、完全にパブリックインフラストラクチャで実行できるサーバレスアプリケーションを構築できます。

[GraphQL](https://graphql.org/)を使用することにより、デベロッパーはサブグラフと呼ばれるキュレートされた任意のオープンAPIのクエリを実行して、dappの動作に必要な情報を取得できます。 このインデックス化されたサブグラフへのクエリを実行することで、レポートとdappについて、パフォーマンスやスケーラビリティ面でのメリットを得られるだけでなく、ネットワークコンセンサスによって本質的な精度も向上します。 新たな機能改善やサブグラフがネットワークに追加されることでプロジェクトの反復処理が迅速化し、こうした機能強化をさらに活用できるようになります。

## クライアントの多様性

[クライアントの多様性](/developers/docs/nodes-and-clients/client-diversity/)は、バグや脆弱性に対する回復力を提供します。そのため、イーサリアムネットワーク全体の健全性にとって重要です。 現在、[clientdiversity.org](https://clientdiversity.org/)、[rated.network](https://www.rated.network)、[supermajority.info](https://supermajority.info//)、[Ethernodes](https://ethernodes.org/)など、いくつかのクライアント多様性ダッシュボードが存在します。

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/)は、リレーショナルデータベース(DuneSQL)テーブルのために、ブロックチェーンデータの前処理を行います。 これにより、ユーザーはSQLを使用してブロックチェーンデータのクエリを実行し、クエリ結果に基づいてダッシュボードを構築できるようになります。 オンチェーンデータは、`blocks`、`transactions`、(event) `logs`、(call) `traces`という、4つの未加工テーブルに編成されます。 一般的なコントラクトやプロトコルはデコードされており、それぞれにイベントと呼び出しのテーブルのセットがあります。 これらのイベントと呼び出しのテーブルはさらに処理され、DEX、レンディング、ステーブルコインなどのプロトコルの種類によって抽象テーブルに編成されます。

## SubQueryネットワーク {#subquery-network}

[SubQuery](https://subquery.network/)は、優れたデータインデクサーでデベロッパーにWeb3プロジェクト用の高速で信頼性の高い分散型にカスタマイズされたAPIを提供します。 SubQueryでは、165以上のエコシステム(イーサリアムを含む)で豊富なインデックスされたデータを用いてデベロッパーがユーザーへ直観的で没入型のエクスペリエンスを構築できるようにします。 SubQueryネットワークは、回復力があり分散型のインフラストラクチャネットワークを用いて止まらないアプリにします。 SubQueryのブロックチェーン・デベロッパー・ツールキットを用いてweb3アプリケーションの未来を構築しましょう。データ処理を行うカスタムバックエンドの構築に時間を費やす必要はありません。

開始するには、[イーサリアム・クイック・スタートガイド](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html)を参照し、ローカルDocker環境で数分でイーサリアムブロックチェーンデータをインデックス化してテストを行い、その後、 稼働している[SubQueryのマネージドサービス](https://managedservice.subquery.network/)か[SubQueryの分散型ネットワーク](https://app.subquery.network/dashboard)を使用してみましょう。

## Ethernow - メンプール・データ・プログラム {#ethernow}
[Blocknative](https://www.blocknative.com/)は、イーサリアムの履歴[メンプール・データ・アーカイブ](https://www.ethernow.xyz/mempool-data-archive)へのオープンアクセスを提供しています。 これにより、研究者やコミュニティグッドプロジェクトはイーサリアムメインネットのプレチェーンレイヤーを探索できます。 データセットはアクティブに維持されており、イーサリアムのエコシステム内のメンプールのトランザクションイベントの、最も包括的な履歴レコードを表します。  詳細は[Ethernow](https://www.ethernow.xyz/)をご覧ください。

## 参考文献 {#further-reading}

- [Graphネットワークの概要](https://thegraph.com/docs/en/about/network/)
- [Graph Query Playground](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [EtherScanのAPIコードの例](https://etherscan.io/apis#contracts)
- [Beaconcha.inビーコンチェーンエクスプローラー](https://beaconcha.in)
- [Duneの基礎](https://docs.dune.com/#dune-basics)
- [SubQueryイーサリアム・クイックスタートガイド](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
