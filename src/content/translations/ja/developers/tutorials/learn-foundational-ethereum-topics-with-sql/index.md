---
title: SQLでイーサリアムの基礎的なトピックについて学ぶ
description: このチュートリアルは、SQL（Structured Query Language）を使用してブロックチェーン上のデータに対するクエリを実行することで、トランザクション、ブロック、ガスといったイーサリアムの基本的な概念についての理解を深めるものです。
author: "Paul Apivat"
tags:
  - "SQL"
  - "クエリ"
  - "Dune Analytics"
  - "トランザクション"
skill: beginner
lang: ja
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

イーサリアムに関するチュートリアルの多くはデベロッパ向けのものですが、データアナリストや、クライアント／ノードを実行することなくオンチェーンのデータを確認したい人々を対象とする学習リソースは多くありません。

このチュートリアルは、[Dune Analytics](https://dune.xyz/home)が提供するインターフェースを用いて、オンチェーンのデータに対して SQL（Structured Query Language）のクエリを実行することで、トランザクション、ブロック、ガスといったイーサリアムの基本的なコンセプトについての理解を深めるものです。

オンチェーンのデータは、イーサリアムやイーサリアム・ネットワークに関する理解を深めるのに役立つだけでなく、コンピュータ処理能力の経済学といった現在のイーサリアムが直面している課題（例：ガス代の上昇）や、より重要性が高いスケーリング・ソリューションに関する議論について、基本的な事項を理解する土台となるものです。

### トランザクション {#transactions}

イーサリアムの新規ユーザーはまず、ETH 残高を持つエンティティであるユーザー管理アカウントを初期化する必要があります。 イーサリアムのアカウントには、ユーザー管理アカウントとスマートコントラクトの 2 種類があります（[ethereum.org](/developers/docs/accounts/)を参照)してください）。

すべてのアカウントは、[Etherscan](https://etherscan.io/)のようなブロックエクスプローラーで表示できます。 ブロックエクスプローラーは、イーサリアム上のデータポータルです。 このポータルから、ブロックのデータ、トランザクション、マイナー、アカウント、および他のオンチェーンのアクティビティをリアルタイムで確認できます（[こちら](/developers/docs/data-and-analytics/block-explorers/)をご覧ください）。

しかし、外部のブロックエスプローラーが提供する情報と直接照合したい場合は、オンチェーンのデータに対するクエリを実行したいと思うかもしれません。 [Dune Analytics](https://duneanalytics.com/)は、SQL に関する一定の知識を前提として、あらゆるユーザーにこのクエリ機能を提供します。

参考までに、イーサリアム・ファウンデーション (EF) のスマートコントラクトアカウントは[Etherscan](https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae)で表示することができます。

EF のアカウントを含むすべてのアカウントは、トランザクションの送受信に使用できる公開アドレスを持つ点に留意してください。

Etherscan のアカウント残高は、通常のトランザクションと内部トランザクションで構成されています。 内部トランザクションは誤解を招きやすい名前ですが、チェーンの状態を変更する *実際の*トランザクションではありません。 内部トランザクションとは、コントラクト（[ソース](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)）を実行することで開始される「値の移転」を意味します。 内部トランザクションは署名を持たないためブロックチェーンには **含まれず**、Dune Analytics でクエリを実行することができません。

従って、このチュートリアルでは通常のトランザクションのみを取り上げます。 通常のトランザクションに対しては、以下のようにクエリを実行します：

```sql
WITH temp_table AS (
SELECT
    hash,
    block_number,
    block_time,
    "from",
    "to",
    value / 1e18 AS ether,
    gas_used,
    gas_price / 1e9 AS gas_price_gwei
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
)
SELECT
    hash,
    block_number,
    block_time,
    "from",
    "to",
    ether,
    (gas_used * gas_price_gwei) / 1e9 AS txn_fee
FROM temp_table
```

これにより、Etherscan のトランザクションページで提供されるのと同一の情報が返されます。 これら 2 つのソースを比較してみましょう：

#### Etherscan {#etherscan}

![](./etherscan_view.png)

[Etherscan 上の EF のコントラクトのページ](https://etherscan.io/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![](./dune_view.png)

ダッシュボードは、[こちら](https://duneanalytics.com/paulapivat/Learn-Ethereum)からアクセスしてください。 テーブルをクリックすると、クエリを確認できます（上記も参照してください）。

### トランザクションの内容を見る {#breaking_down_transactions}

送信されたトランザクションには、（[ソース](/developers/docs/transactions/)）を含むいくつかの情報が含まれています。

- **Recipient**：受信者のアドレス（「to」のクエリに該当したアドレス）。
- **Signature**：トランザクションに署名するのは送信者の秘密鍵ですが、SQL でクエリできるのは送信者の公開アドレス（「from」）です。
- **Value**：送信された ETH の量 （`ether`列を参照してください）。
- **Data**：ハッシュ化した任意のデータ（`data`列を参照してください）。
- **gasLimit**：トランザクションで消費できるガスユニットの上限。 ガスユニットは、計算ステップを示します。
- **maxPriorityFeePerGas**：マイナーへのチップとして提供できるガス量の上限。
- **maxFeePerGas**：トランザクションに対して支払い可能であるガス代の上限（baseFeePerGas と maxPriorityFeePerGas を含む） 。

イーサリアムファウンデーションのパブリックアドレスへのトランザクションにつき、これらの具体的な情報をクエリしたい場合は以下を実行します：

```sql
SELECT
    "to",
    "from",
    value / 1e18 AS ether,
    data,
    gas_limit,
    gas_price / 1e9 AS gas_price_gwei,
    gas_used,
    ROUND(((gas_used / gas_limit) * 100),2) AS gas_used_pct
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### ブロック {#blocks}

各トランザクションは、イーサリアム仮想マシン（[EVM](/developers/docs/evm/)）の状態を変更します（[ソース](/developers/docs/transactions/)）。 トランザクションは、ネットワークにブロードキャストされ、検証を経てブロックに追加されます。 トランザクションごとに、ブロック番号が割り振られます。 データを見るには、特定のブロック番号でクエリすることができます。ブロック番号: 12396854 は、執筆時点である 2021 年 11 月 5 日のイーサリアム・ファウンデーション内のトランザクションで最も最新のブロックです。

さらに、次の 2 つのブロックに対してクエリを実行すると、各ブロックが 1 つ前のブロックのハッシュ（親ハッシュ）を含んでいることが確認でき、ブロックチェーンがどのように形成されるかを理解できます。

各ブロックには、親ブロックに対する参照情報が含まれています。 これは、`hash`列と`parent_hash`列の間に表示されます（[ソース](/developers/docs/blocks/)）。

![parent_hash](./parent_hash.png)

Dune Analytics では、[クエリ](https://duneanalytics.com/queries/44856/88292)は以下のように表示されます：

```sql
SELECT
   time,
   number,
   hash,
   parent_hash,
   nonce
FROM ethereum."blocks"
WHERE "number" = 12396854 OR "number" = 12396855 OR "number" = 12396856
LIMIT 10
```

ブロックを調べるには、時間、ブロック番号、難易度、ハッシュ、親ハッシュ、およびノンスに対してクエリを実行します。

このクエリでは、*トランザクションのリスト*だけは調べることができません。このためトランザクションのリストについては、*state root*を使って後述する別のクエリを実行します。 フルノードまたはアーカイブノードは、すべてのトランザクションと状態遷移を保存しますので、クライアントはいつでもチェーンの状態をクエリすることができます。 これには大容量のストレージが必要になりますので、チェーンデータと状態データを分離することができます：

- チェーンデータ（ブロックおよびトランザクションのリスト）
- 状態データ（各トランザクションによる状態遷移の結果）

状態ルートは後者（状態データ）であり、*暗黙的な*データである（オンチェーンで保存されない）のに対し、チェーンデータは明示的なデータであり、チェーン自体に保存されます（[ソース](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)）。

このチュートリアルでは、Dune Analytics を使って SQL で*クエリ可能*であるオンチェーンのデータを取り上げます。

すでに述べたように、各ブロックにはトランザクションのリストが含まれているので、特定のブロックに絞り込んでクエリを実行できます。 さっそく、最新ブロック「12396854」を試してみましょう。

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

Dune では、このような SQL 出力が得られます：

![](./list_of_txn.png)

ブロックチェーンにこの 1 つのブロックが追加されると、イーサリアム仮想マシン （[EVM](/developers/docs/evm/)）の状態が変化します。 ブロックチェーンでは、一度に数十、時には数百ものトランザクションが検証されます。 このブロックの場合、222 件のトランザクションが含まれていました。

実際にトランザクションが成功した件数を調べるには、成功したトランザクションのみを絞り込むフィルターを追加します：

```sql
WITH temp_table AS (
    SELECT * FROM ethereum."transactions"
    WHERE block_number = 12396854 AND success = true
    ORDER BY block_time DESC
)
SELECT
    COUNT(success) AS num_successful_txn
FROM temp_table
```

ブロック 12396854 では、計 222 件のトランザクションのうち、204 件が正常に検証されました：

![](./successful_txn.png)

トランザクションリクエストは、毎秒あたり数十回発生しますが、ブロックがコミットされるのはおよそ 15 秒に 1 回です（[ソース](/developers/docs/blocks/)）。

約 15 秒ごとに 1 つのブロックが生成されることを確認するには、1 日に含まれる合計の秒数（86,400 秒）を 15 で割ることで、1 日に生成される平均ブロック数（およそ 5,760）が分かります。

2016 年から現在までに、イーサリアムで生成された 1 日あたりのブロック数については、この表を参照してください：

![](./daily_blocks.png)

この期間に毎日生成されたブロックの平均数は、約 5,874 です。

![](./avg_daily_blocks.png)

クエリは、次のように行います：

```sql
# query to visualize number of blocks produced daily since 2016

SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1

# average number of blocks produced per day

WITH temp_table AS (
SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
)
SELECT
    AVG(block_count) AS avg_block_count
FROM temp_table
```

2016 年から現在までに 1 日に生成されたブロック数の平均は、5,874 をわずかに上回っています。 反対に、86,400 秒を平均ブロック数である 5,874 で割ると 14.7 となるため、およそ 15 秒に 1 回の頻度でブロックが生成されたことが分かります。

### ガス {#gas}

ブロックのサイズは、制限されています。 ブロックの最大サイズは、ネットワーク需要に応じて 12,500,000 ユニットから 25,000,000 ユニットの間で動的に変化します。 ブロックのサイズを制限する理由は、フルノードに対してディスク容量や処理速度の要件（[ソース](/developers/docs/blocks/)）が過剰な負担となるのを防ぐために、無駄に大きなサイズのブロックが発生することを防ぐためです。

ブロックに対するガス上限という概念を理解するには、トランザクションをバッチ処理するために利用できるブロックのスペースをどれだけ**供給**できるか、と考えるとよいでしょう。 ブロックのガス上限に対してもクエリを実行できるので、2016 年から現在までのグラフは以下のようになります：

![](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

さらに、イーサリアム・ブロックチェーン上で実行された処理（トランザクションの送信、スマートコントラクトの呼び出し、NFT のミント）のために実際に支払われた 1 日あたりのガスを調べることもできます。 これは、利用可能なイーサリアムのブロックスペースに対する**需要**を示します：

![](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

これら 2 つのグラフを比較することで、 **需要と供給**の関係を確認することができます：

![gas_demand_supply](./gas_demand_supply.png)

ここから、ブロックスペースが十分に供給されている場合、ガス価格はブロックスペースへの需要に応じて上下することが分かります。

最後に、イーサリアムチェーンにおける 1 日のガス価格の平均値を調べたい場合、クエリ時間が非常に長くなるため、イーサリアム・ファウンデーションがトランザクション 1 件あたりに支払ったガス代の平均値を調べるようにクエリを絞り込みます。

![](./ef_daily_gas.png)

2016 年から現在までに、イーサリアム・ファウンデーションのアドレスに対して実行されたすべてのトランザクションにおいて支払われたガス価格を確認することができます。 クエリは、以下のように実行します：

```sql
SELECT
    block_time,
    gas_price / 1e9 AS gas_price_gwei,
    value / 1e18 AS eth_sent
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### まとめ {#summary}

このチュートリアルでは、クエリを実行し、オンチェーンのデータを確認することで、イーサリアムの基本的な概念やイーサリアム・ブロックチェーンの仕組みについて学びました。

このチュートリアルで使用したすべてのコードをまとめたダッシュボードは、[こちら](https://duneanalytics.com/paulapivat/Learn-Ethereum)からアクセスしてください。

データを通じて Web3 の知識をさらに深めたい方は、[私を Twitter でフォローしてください](https://twitter.com/paulapivat)。
