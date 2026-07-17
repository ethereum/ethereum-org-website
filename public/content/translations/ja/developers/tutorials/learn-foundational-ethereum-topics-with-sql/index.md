---
title: "SQLでイーサリアムの基礎トピックを学ぶ"
description: "このチュートリアルは、構造化照会言語（SQL）を使用してオンチェーンのデータをクエリすることで、読者がトランザクション、ブロック、ガスなどのイーサリアムの基本的な概念を理解するのに役立ちます。"
author: "ポール・アピヴァット"
tags: ["SQL", "クエリ", "トランザクション", "データと分析"]
skill: beginner
breadcrumb: "SQLでイーサリアムを学ぶ"
lang: ja
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

多くのイーサリアムのチュートリアルは開発者を対象としていますが、データアナリストや、クライアントやノードを実行せずにオンチェーンのデータを見たい人向けの教育リソースが不足しています。

このチュートリアルは、[Dune Analytics](https://dune.com/)が提供するインターフェースを通じて、構造化照会言語（SQL）を使用してオンチェーンのデータをクエリすることで、読者がトランザクション、ブロック、ガスなどのイーサリアムの基本的な概念を理解するのに役立ちます。

オンチェーンのデータは、イーサリアム、ネットワーク、そして計算能力の経済圏としての理解を深めるのに役立ちます。また、今日のイーサリアムが直面している課題（ガス価格の高騰など）や、さらに重要なスケーリング・ソリューションに関する議論を理解するための基盤となるはずです。

### トランザクション {#transactions}

イーサリアムでのユーザーの旅は、ユーザーが管理するアカウント、またはETH残高を持つエンティティを初期化することから始まります。アカウントには、ユーザーが管理するものとスマート・コントラクトの2種類があります（[ethereum.org](/developers/docs/accounts/)を参照）。

すべてのアカウントは、[Etherscan](https://etherscan.io/)や[Blockscout](https://eth.blockscout.com/)などのブロック・エクスプローラーで確認できます。ブロック・エクスプローラーは、イーサリアムのデータへのポータルです。ブロック、トランザクション、マイナー、アカウント、その他のオンチェーンのアクティビティに関するデータをリアルタイムで表示します（[こちら](/developers/docs/data-and-analytics/block-explorers/)を参照）。

しかし、外部のブロック・エクスプローラーが提供する情報を照合するために、ユーザーが直接データをクエリしたい場合もあるでしょう。[Dune Analytics](https://dune.com/)は、SQLの知識が少しでもある人なら誰でもこの機能を利用できるようにしています。

参考までに、イーサリアム財団（EF）のスマート・コントラクトのアカウントは[Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)で確認できます。

注意すべき点の1つは、EFのアカウントを含め、すべてのアカウントにはトランザクションの送受信に使用できる公開アドレスがあるということです。

Etherscan上のアカウント残高は、通常のトランザクションと内部トランザクションで構成されています。内部トランザクションは、その名前に反して、チェーンの状態を変更する実際のトランザクションではありません。これらは、コントラクトの実行によって開始される価値の移転です（[ソース](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)）。内部トランザクションには署名がないため、ブロックチェーンには含まれ**ず**、Dune Analyticsでクエリすることはできません。

したがって、このチュートリアルでは通常のトランザクションに焦点を当てます。これは次のようにクエリできます。

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

これにより、Etherscanのトランザクションページで提供されるのと同じ情報が得られます。比較のために、2つのソースを以下に示します。

#### Etherscan {#etherscan}

![Screenshot of Etherscan transaction explorer view](./etherscan_view.png)

[Blockscout上のEFのコントラクトページ。](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![Screenshot of a Dune Analytics query dashboard](./dune_view.png)

ダッシュボードは[こちら](https://dune.com/paulapivat/Learn-Ethereum)にあります。テーブルをクリックしてクエリを確認してください（上記も参照）。

### トランザクションの分解 {#breaking-down-transactions}

送信されたトランザクションには、以下のようないくつかの情報が含まれています（[ソース](/developers/docs/transactions/)）。

- **受信者**: 受信アドレス（「to」としてクエリされます）
- **署名**: 送信者の秘密鍵がトランザクションに署名しますが、SQLでクエリできるのは送信者の公開アドレス（「from」）です。
- **値**: これは転送されたETHの量です（`ether`列を参照）。
- **データ**: これはハッシュ化された任意のデータです（`data`列を参照）。
- **gasLimit** – トランザクションによって消費される可能性のあるガス単位の最大量。ガスの単位は計算ステップを表します。
- **maxPriorityFeePerGas** - マイナーへのチップとして含まれるガスの最大量。
- **maxFeePerGas** - トランザクションに対して支払う意思のあるガスの最大量（baseFeePerGasとmaxPriorityFeePerGasを含む）。

イーサリアム財団の公開アドレスへのトランザクションについて、これらの特定の情報をクエリできます。

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

各トランザクションは、イーサリアム仮想マシン（[EVM](/developers/docs/evm/)）の状態を変更します（[ソース](/developers/docs/transactions/)）。トランザクションはネットワークにブロードキャストされ、検証されてブロックに含まれます。各トランザクションはブロック番号に関連付けられています。データを確認するために、特定のブロック番号をクエリできます。12396854（執筆時点の2021年5月11日において、イーサリアム財団のトランザクションの中で最も新しいブロック）。

さらに、次の2つのブロックをクエリすると、各ブロックに前のブロックのハッシュ（つまり、親ハッシュ）が含まれていることがわかり、ブロックチェーンがどのように形成されているかがわかります。

各ブロックには、その親ブロックへの参照が含まれています。これは、以下の`hash`列と`parent_hash`列の間に示されています（[ソース](/developers/docs/blocks/)）。

![parent_hash](./parent_hash.png)

Dune Analyticsでの[クエリ](https://dune.com/queries/44856/88292)は次のとおりです。

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

時間、ブロック番号、難易度、ハッシュ、親ハッシュ、ナンスをクエリすることで、ブロックを調べることができます。

このクエリでカバーされていないのは、以下の別のクエリを必要とするトランザクションのリストと状態ルートだけです。フルノードまたはアーカイブノードは、すべてのトランザクションと状態遷移を保存し、クライアントがいつでもチェーンの状態をクエリできるようにします。これには大きなストレージスペースが必要になるため、チェーンデータと状態データを分けることができます。

- チェーンデータ（ブロック、トランザクションのリスト）
- 状態データ（各トランザクションの状態遷移の結果）

状態ルートは後者に該当し、暗黙的なデータ（オンチェーンには保存されない）ですが、チェーンデータは明示的であり、チェーン自体に保存されます（[ソース](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)）。

このチュートリアルでは、Dune Analyticsを介してSQLでクエリできるオンチェーンのデータに焦点を当てます。

上記のように、各ブロックにはトランザクションのリストが含まれており、特定のブロックでフィルタリングすることでこれをクエリできます。最も新しいブロックである12396854を試してみましょう。

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

DuneでのSQLの出力は次のとおりです。

![Screenshot of a list of Ethereum transactions](./list_of_txn.png)

この単一のブロックがチェーンに追加されることで、イーサリアム仮想マシン（[EVM](/developers/docs/evm/)）の状態が変化します。数十、時には数百のトランザクションが一度に検証されます。この特定のケースでは、222のトランザクションが含まれていました。

実際に成功した数を確認するには、成功したトランザクションをカウントする別のフィルターを追加します。

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

ブロック12396854の場合、合計222のトランザクションのうち、204が正常に検証されました。

![Screenshot of a successful Ethereum transaction](./successful_txn.png)

トランザクションの要求は1秒間に数十回発生しますが、ブロックは約15秒に1回コミットされます（[ソース](/developers/docs/blocks/)）。

約15秒ごとに1つのブロックが生成されることを確認するには、1日の秒数（86400）を15で割り、1日あたりの推定平均ブロック数（約5760）を求めます。

1日あたりに生成されるイーサリアムのブロック数（2016年〜現在）のチャートは次のとおりです。

![Chart showing daily Ethereum block production](./daily_blocks.png)

この期間に毎日生成されたブロックの平均数は約5,874です。

![Chart showing daily Ethereum block production](./avg_daily_blocks.png)

クエリは次のとおりです。

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

2016年以降に1日あたりに生成されたブロックの平均数は、その数値をわずかに上回る5,874です。あるいは、86400秒を平均ブロック数の5874で割ると、14.7秒、つまり約15秒に1ブロックになります。

### ガス {#gas}

ブロックのサイズには上限があります。最大ブロックサイズは動的であり、ネットワークの需要に応じて12,500,000から25,000,000単位の間で変動します。ディスクスペースと速度の要件の観点から、任意に大きなブロックサイズがフルノードに負担をかけるのを防ぐために、制限が必要です（[ソース](/developers/docs/blocks/)）。

ブロックのガス・リミットを概念化する1つの方法は、トランザクションをバッチ処理するために利用可能なブロックスペースの**供給**と考えることです。ブロックのガス・リミットは、2016年から現在までクエリして視覚化できます。

![Chart showing average Ethereum gas limit over time](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

次に、イーサリアムチェーンで行われる計算（トランザクションの送信、スマート・コントラクトの呼び出し、NFTのミンティングなど）の支払いに毎日使用される実際のガスがあります。これは、利用可能なイーサリアムのブロックスペースに対する**需要**です。

![Chart showing daily Ethereum gas used](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

これら2つのチャートを並べて、**需要と供給**がどのように一致しているかを確認することもできます。

![gas_demand_supply](./gas_demand_supply.png)

したがって、ガス価格は、利用可能な供給が与えられた場合の、イーサリアムのブロックスペースに対する需要の関数として理解できます。

最後に、イーサリアムチェーンの1日あたりの平均ガス価格をクエリしたいと思うかもしれませんが、そうするとクエリ時間が非常に長くなるため、イーサリアム財団がトランザクションごとに支払ったガスの平均量にクエリをフィルタリングします。

![Chart showing Ethereum Foundation daily gas usage](./ef_daily_gas.png)

長年にわたってイーサリアム財団のアドレスに対して行われたすべてのトランザクションで支払われたガス価格を確認できます。クエリは次のとおりです。

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

このチュートリアルでは、オンチェーンのデータをクエリして感覚をつかむことで、イーサリアムの基本的な概念とイーサリアムのブロックチェーンがどのように機能するかを理解しました。

このチュートリアルで使用されているすべてのコードを保持するダッシュボードは、[こちら](https://dune.com/paulapivat/Learn-Ethereum)にあります。

Web3を探索するためのデータのさらなる活用については、[ツイッターで私を見つけてください](https://twitter.com/paulapivat)。