---
title: "SQLでイーサリアムの基礎的なトピックについて学ぶ"
description: "このチュートリアルは、SQL（Structured Query Language）を使用してオンチェーンデータにクエリを実行することで、トランザクション、ブロック、ガスといったイーサリアムの基本的な概念についての理解を深めるものです。"
author: "Paul Apivat"
tags: [ "SQL", "クエリ", "トランザクション" ]
skill: beginner
lang: ja
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

イーサリアムに関するチュートリアルの多くはデベロッパー向けのものですが、データアナリストや、クライアント／ノードを実行することなくオンチェーンのデータを確認したい人々を対象とする学習リソースは多くありません。

このチュートリアルは、[Dune Analytics](https://dune.com/)が提供するインターフェースを用いて、オンチェーンのデータに対して構造化問い合わせ言語（SQL）のクエリを実行することで、トランザクション、ブロック、ガスといったイーサリアムの基本的なコンセプトについての理解を深めるものです。

オンチェーンのデータは、イーサリアムやイーサリアム・ネットワークに関する理解を深めるのに役立つだけでなく、コンピュータ処理能力の経済学といった現在のイーサリアムが直面している課題（例：ガス代の上昇）や、より重要性が高いスケーリング・ソリューションに関する議論について、基本的な事項を理解する土台となるものです。

### トランザクション {#transactions}

イーサリアムのユーザーの体験は、ユーザーが管理するアカウント、またはETH残高を持つエンティティを初期化することから始まります。 アカウントには、ユーザー管理アカウントとスマートコントラクトの2種類があります（[ethereum.org](/developers/docs/accounts/)を参照）。

どのアカウントも、[Etherscan](https://etherscan.io/)や[Blockscout](https://eth.blockscout.com/)のようなブロックエクスプローラーで表示できます。 ブロックエクスプローラーは、イーサリアム上のデータポータルです。 このポータルから、ブロックのデータ、トランザクション、マイナー、アカウント、および他のオンチェーンのアクティビティをリアルタイムで確認できます（[こちら](/developers/docs/data-and-analytics/block-explorers/)をご覧ください）。

しかし、外部のブロックエクスプローラーが提供する情報と直接照合したい場合は、オンチェーンのデータに対するクエリを実行したいと思うかもしれません。 [Dune Analytics](https://dune.com/)は、SQLに関する一定の知識を持つ人なら誰でもこの機能を利用できるようにします。

参考までに、イーサリアム財団(EF)のスマートコントラクトアカウントは[Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)で閲覧できます。

注意すべき点として、EFのアカウントを含むすべてのアカウントは、トランザクションの送受信に使用できる公開アドレスを持つということが挙げられます。

Etherscanのアカウント残高は、通常のトランザクションと内部トランザクションで構成されています。 内部トランザクションは、その名前とは裏腹に、チェーンの状態を変更する_実際の_トランザクションではありません。 これらは、コントラクトの実行によって開始される値の転送です([ソース](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions))。 内部トランザクションは署名を持たないためブロックチェーンには**含まれず**、Dune Analyticsでクエリを実行することができません。

したがって、このチュートリアルでは通常のトランザクションのみを取り上げます。 通常のトランザクションに対しては、以下のようにクエリを実行します。

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

これにより、Etherscanのトランザクションページで提供されるのと同一の情報が返されます。 比較のために、2つのソースを以下に示します。

#### Etherscan {#etherscan}

![](./etherscan_view.png)

[Blockscout上のEFのコントラクトページ。](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![](./dune_view.png)

ダッシュボードは[こちら](https://dune.com/paulapivat/Learn-Ethereum)にあります。 テーブルをクリックすると、クエリを確認できます（上記も参照してください）。

### トランザクションの内訳 {#breaking_down_transactions}

送信されたトランザクションには、以下のようないくつかの情報が含まれています([ソース](/developers/docs/transactions/)):

- **受信者**: 受信アドレス(クエリでは「to」)
- **署名**: 送信者の秘密鍵がトランザクションに署名しますが、SQLでクエリできるのは送信者の公開アドレス(「from」)です。
- **値**: これは転送されたETHの量です(`ether`の列を参照)。
- **データ**: ハッシュ化された任意のデータです(`data`列を参照)
- **ガスリミット** – トランザクションで消費できるガスユニットの最大量。 ガスユニットは、計算ステップを示します
- **maxPriorityFeePerGas** - マイナーへのチップとして含めることができるガスの最大量
- **maxFeePerGas** - トランザクションに支払う意思のあるガスの最大額(baseFeePerGasとmaxPriorityFeePerGasを含む)

イーサリアム財団の公開アドレスへのトランザクションについて、これらの具体的な情報を次のようにクエリできます:

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

各トランザクションは、イーサリアム仮想マシン([EVM](/developers/docs/evm/))の状態を変更します([ソース](/developers/docs/transactions/))。 トランザクションは、ネットワークにブロードキャストされ、検証を経てブロックに追加されます。 各トランザクションには、ブロック番号が関連付けられています。 データを見るには、特定のブロック番号でクエリすることができます。ブロック番号: 12396854は、執筆時点(2021/11/5)でイーサリアム財団のトランザクションの中で最も新しいブロックです。

さらに、次の2つのブロックに対してクエリを実行すると、各ブロックが1つ前のブロックのハッシュ（親ハッシュ）を含んでいることが確認でき、ブロックチェーンがどのように形成されるかを理解できます。

各ブロックには、親ブロックへの参照が含まれています。 これは、以下の`hash`列と`parent_hash`列の間に示されます([ソース](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

Dune Analyticsでの[クエリ](https://dune.com/queries/44856/88292)はこちらです:

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

時間、ブロック番号、難易度、ハッシュ、親ハッシュ、およびノンスをクエリすることでブロックを調べることができます。

このクエリがカバーしていないのは、_トランザクションのリスト_と_ステート・ルート_のみで、これらには以下の別のクエリが必要です。 フルノードまたはアーカイブノードは、すべてのトランザクションと状態遷移を保存しますので、クライアントはいつでもチェーンの状態をクエリすることができます。 これには大容量のストレージが必要になりますので、チェーンデータと状態データを分離することができます:

- チェーンデータ（ブロックおよびトランザクションのリスト）
- 状態データ（各トランザクションによる状態遷移の結果）

ステート・ルートは後者に分類され_暗黙的_なデータ（オンチェーンで保存されない）ですが、チェーンデータは明示的であり、チェーン自体に保存されます([ソース](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored))。

このチュートリアルでは、Dune Analyticsを使ってSQLでクエリ_できる_オンチェーンのデータに焦点を当てます。

すでに述べたように、各ブロックにはトランザクションのリストが含まれているので、特定のブロックに絞り込んでクエリを実行できます。 最新ブロック「12396854」を試してみましょう:

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

DuneでのSQL出力はこちらです:

![](./list_of_txn.png)

この1つのブロックがチェーンに追加されると、イーサリアム仮想マシン([EVM](/developers/docs/evm/))の状態が変化します。 一度に数十、時には数百ものトランザクションが検証されます。 このブロックの場合、222件のトランザクションが含まれていました。

実際に成功した件数を調べるには、成功したトランザクションをカウントするフィルターを追加します。

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

ブロック12396854では、計222件のトランザクションのうち、204件が正常に検証されました:

![](./successful_txn.png)

トランザクションリクエストは毎秒数十回発生しますが、ブロックがコミットされるのはおよそ15秒に1回です([ソース](/developers/docs/blocks/))。

約15秒ごとに1つのブロックが生成されることを確認するには、1日に含まれる合計の秒数（86400秒）を15で割ることで、1日に生成される平均ブロック数（およそ5760）が分かります。

イーサリアムで1日あたりに生成されたブロック数（2016年〜現在）のグラフはこちらです:

![](./daily_blocks.png)

この期間に毎日生成されたブロックの平均数は約5,874です:

![](./avg_daily_blocks.png)

クエリは、次のように行います。

```sql
# 2016年以降に毎日生成されたブロック数を可視化するクエリ

SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1

# 1日あたりの平均ブロック生成数

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

2016年から現在までに1日に生成されたブロック数の平均は、この数字をわずかに上回る5,874です。 あるいは、86,400秒を平均ブロック数5,874で割ると14.7秒となり、およそ15秒に1つのブロックが生成されていることになります。

### ガス {#gas}

ブロックのサイズは制限されています。 ブロックの最大サイズは動的で、ネットワーク需要に応じて12,500,000から25,000,000ユニットの間で変動します。 ブロックサイズが任意に大きくなることで、フルノードのディスクスペースや処理速度に負荷がかかることを防ぐため、制限が必要となります([ソース](/developers/docs/blocks/))。

ブロックのガスリミットを理解する一つの方法として、トランザクションをバッチ処理するために利用できるブロックスペースの**供給**量と考えることができます。 ブロックのガスリミットは、クエリを実行して2016年から現在までを可視化できます:

![](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

そして、イーサリアムチェーン上での計算(トランザクションの送信、スマートコントラクトの呼び出し、NFTのミントなど)の支払いに毎日使用される実際のガスがあります。 これは、利用可能なイーサリアムのブロックスペースに対する**需要**です:

![](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

また、これら2つのグラフを並べて比較することで、**需要と供給**がどのように一致するかを確認できます。

![gas_demand_supply](./gas_demand_supply.png)

したがって、利用可能な供給量を前提として、ガス価格はイーサリアムのブロックスペースへの需要の関数として理解できます。

最後に、イーサリアムチェーンの1日あたりの平均ガス価格をクエリすることもできますが、クエリ時間が非常に長くなるため、イーサリアム財団によってトランザクションごとに支払われた平均ガス量にクエリを絞り込みます。

![](./ef_daily_gas.png)

長年にわたるイーサリアム財団のアドレスへのすべてのトランザクションで支払われたガス価格を見ることができます。 クエリは、次のとおりです。

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

このチュートリアルでは、オンチェーンのデータをクエリして理解することで、イーサリアムの基本的な概念とイーサリアムブロックチェーンの仕組みを理解します。

このチュートリアルで使用されたすべてのコードを含むダッシュボードは[こちら](https://dune.com/paulapivat/Learn-Ethereum)にあります。

データを使ってWeb3をさらに探求したい方は、[Twitterで私を見つけてください](https://twitter.com/paulapivat)。
