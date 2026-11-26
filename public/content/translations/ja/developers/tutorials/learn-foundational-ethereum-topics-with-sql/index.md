---
title: "SQLで学ぶイーサリアムの基本トピック"
description: "このチュートリアルは、構造化照会言語（SQL）を使用してオンチェーンデータをクエリすることにより、読者がトランザクション、ブロック、ガスなどのイーサリアムの基本概念を理解するのに役立ちます。"
author: "ポール・アピヴァット"
tags: ["SQL", "クエリ", "トランザクション", "データと分析"]
skill: beginner
breadcrumb: "SQLで学ぶイーサリアム"
lang: ja
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://web.archive.org/web/20260516182620/https://paulapivat.com/post/query_ethereum/
---

多くのイーサリアムのチュートリアルは開発者を対象としていますが、データアナリストや、クライアントやノードを実行せずにオンチェーンデータを見たい人向けの教育リソースが不足しています。

このチュートリアルは、[Dune](https://dune.com/)が提供するインターフェースを通じて、構造化照会言語（SQL）でオンチェーンデータをクエリすることにより、読者がトランザクション、ブロック、ガスなどのイーサリアムの基本概念を理解するのに役立ちます。クエリには、DuneのSQL方言である[DuneSQL](https://docs.dune.com/query-engine/overview)を使用します。

オンチェーンデータは、イーサリアム、ネットワーク、そして計算能力の経済圏としての理解を深めるのに役立ちます。また、今日のイーサリアムが直面している課題（ガス代の高騰など）や、さらに重要なスケーリングソリューションに関する議論を理解するための基盤となるはずです。

### トランザクション {#transactions}

イーサリアムでのユーザーの旅は、ユーザーが管理するアカウント、またはETH残高を持つエンティティを初期化することから始まります。アカウントには、ユーザーが管理するものとスマート・コントラクトの2種類があります（[ethereum.org](/developers/docs/accounts/)を参照）。

すべてのアカウントは、[Etherscan](https://etherscan.io/)や[Blockscout](https://eth.blockscout.com/)などのブロック・エクスプローラーで表示できます。ブロック・エクスプローラーは、イーサリアムのデータへのポータルです。ブロック、トランザクション、バリデータ、アカウント、その他のオンチェーン・アクティビティに関するデータをリアルタイムで表示します（[こちら](/developers/docs/data-and-analytics/block-explorers/)を参照）。

しかし、外部のブロック・エクスプローラーが提供する情報を照合するために、ユーザーがデータを直接クエリしたい場合もあるでしょう。[Dune](https://dune.com/)は、SQLの知識がある人なら誰でもこの機能を利用できるようにしています。

参考までに、イーサリアム財団（EF）のスマート・コントラクト・アカウントは[Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)で確認できます。

注意すべき点の1つは、EFのアカウントを含むすべてのアカウントには、トランザクションの送受信に使用できる公開アドレスがあるということです。

Etherscan上のアカウント残高は、通常のトランザクションと内部トランザクションで構成されています。内部トランザクションは、その名前に反して、チェーンの状態を変更する実際のトランザクションではありません。これらは、コントラクトの実行によって開始される価値の移転です（[ソース](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)）。内部トランザクションには署名がないため、トランザクションとしてブロックチェーンに**含まれません**。Duneはこれらを`ethereum.traces`テーブルに個別に記録します。

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
FROM ethereum.transactions
WHERE "to" = 0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe
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

アドレスは引用符なしの`0x...`リテラルとして記述されることに注意してください。DuneSQLでは、アドレスとハッシュは文字列ではなくバイナリ値です。

これにより、Etherscanのトランザクションページで提供されるのと同じ情報が得られます。比較のために、2つのソースを以下に示します。

#### Etherscan {#etherscan}

![Screenshot of Etherscan transaction explorer view](./etherscan_view.png)

[Blockscout上のEFのコントラクトページ。](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune {#dune-analytics}

![Screenshot of a Dune query dashboard](./dune_view.png)

ダッシュボードは[こちら](https://dune.com/paulapivat/Learn-Ethereum)で確認できます。テーブルをクリックしてクエリを表示します（上記も参照）。

### トランザクションの分解 {#breaking-down-transactions}

送信されたトランザクションには、以下のようないくつかの情報が含まれています（[ソース](/developers/docs/transactions/)）。

- **受信者**: 受信アドレス（「to」としてクエリされます）
- **署名**: 送信者の秘密鍵がトランザクションに署名しますが、SQLでクエリできるのは送信者の公開アドレス（「from」）です。
- **値**: これは転送されたETHの量です（`ether`列を参照）。
- **データ**: これはハッシュ化された任意のデータです（`data`列を参照）。
- **gasLimit** – トランザクションによって消費される可能性のあるガス単位の最大量。ガスの単位は計算ステップを表します。
- **maxPriorityFeePerGas** - バリデータへのチップとして含まれるガスの最大量。
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
    ROUND(CAST(gas_used AS DOUBLE) / gas_limit * 100, 2) AS gas_used_pct
FROM ethereum.transactions
WHERE "to" = 0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe
ORDER BY block_time DESC
```

DuneSQLで整数を別の整数で割ると結果が整数になり、ほとんどのパーセンテージがゼロに切り捨てられてしまうため、`CAST`が必要です。

### ブロック {#blocks}

各トランザクションは、イーサリアム仮想マシン（[EVM](/developers/docs/evm/)）の状態を変更します（[ソース](/developers/docs/transactions/)）。トランザクションはネットワークにブロードキャストされ、検証されてブロックに含まれます。各トランザクションはブロック番号に関連付けられています。データを確認するために、特定のブロック番号をクエリできます。ここでは12396854（執筆時点の2021年5月において、イーサリアム財団のトランザクションの中で最も新しいブロック）を使用します。

さらに、次の2つのブロックをクエリすると、各ブロックに前のブロックのハッシュ（つまり、親ハッシュ）が含まれていることがわかり、ブロックチェーンがどのように形成されているかがわかります。

各ブロックには、その親ブロックへの参照が含まれています。これは、以下の`hash`列と`parent_hash`列の間に示されています（[ソース](/developers/docs/blocks/)）。

![parent_hash](./parent_hash.png)

クエリは以下の通りです。

```sql
SELECT
   time,
   number,
   hash,
   parent_hash,
   nonce
FROM ethereum.blocks
WHERE number IN (12396854, 12396855, 12396856)
```

時間、ブロック番号、ハッシュ、親ハッシュ、ナンスをクエリすることで、ブロックを調べることができます。ブロック12396854は、ブロックがプルーフ・オブ・ワーク（PoW）でマイニングされ、ナンスが意味を持っていた[マージ](/roadmap/merge/)の前に生成されました。プルーフ・オブ・ステーク（PoS）のブロックでは、ナンスは常にゼロです。

このクエリでカバーされていないのは、以下の別のクエリを必要とする「トランザクションのリスト」と「状態ルート」だけです。フルノードまたはアーカイブノードは、すべてのトランザクションと状態遷移を保存し、クライアントがいつでもチェーンの状態をクエリできるようにします。これには大きなストレージスペースが必要になるため、チェーンデータと状態データを分けることができます。

- チェーンデータ（ブロック、トランザクションのリスト）
- 状態データ（各トランザクションの状態遷移の結果）

状態ルートは後者に該当し、暗黙的なデータ（オンチェーンには保存されない）ですが、チェーンデータは明示的であり、チェーン自体に保存されます（[ソース](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)）。

このチュートリアルでは、Duneを介してSQLでクエリできるオンチェーンデータに焦点を当てます。

上記のように、各ブロックにはトランザクションのリストが含まれており、特定のブロックでフィルタリングすることでこれをクエリできます。ブロック12396854を試してみましょう。

```sql
SELECT * FROM ethereum.transactions
WHERE block_number = 12396854
```

DuneでのSQL出力は次のとおりです。

![Screenshot of a list of Ethereum transactions](./list_of_txn.png)

この単一のブロックがチェーンに追加されると、イーサリアム仮想マシン（[EVM](/developers/docs/evm/)）の状態が変化します。数十、時には数百のトランザクションが一度に検証されます。この特定のケースでは、222のトランザクションが含まれていました。

実際に成功した数を確認するには、成功したトランザクションをカウントする別のフィルターを追加します。

```sql
SELECT
    COUNT(*) AS num_successful_txn
FROM ethereum.transactions
WHERE block_number = 12396854 AND success = true
```

ブロック12396854の場合、合計222のトランザクションのうち、204が正常に検証されました。

![Screenshot of a successful Ethereum transaction](./successful_txn.png)

トランザクションの要求は1秒間に数十回発生しますが、ブロックは定期的にしか追加されません（[ソース](/developers/docs/blocks/)）。プルーフ・オブ・ワーク（PoW）の下では、ブロックは平均して13〜15秒ごとにマイニングされていましたが、ばらつきが大きくありました。2022年9月の[マージ](/roadmap/merge/)以降、プルーフ・オブ・ステーク（PoS）では時間を12秒のスロットに分割し、各スロットには最大1つのブロックを含めることができます。

したがって、現在では1日に最大86400 / 12 = 7200ブロックが存在する可能性があります。実際には、バリデータが時折スロットを逃すため、これよりわずかに少なくなります。

1日あたりに生成されたイーサリアムのブロックのチャート（2016年〜2021年）は次のとおりです。

![Chart showing daily Ethereum block production](./daily_blocks.png)

この期間に毎日生成されたブロックの平均数は約5,874です。

![Chart showing daily Ethereum block production](./avg_daily_blocks.png)

クエリは次のとおりです。

毎日生成されるブロック数を視覚化するためのクエリは以下の通りです。`WHERE`句は、まだ終了していない現在の日を除外します。

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum.blocks
WHERE time < DATE_TRUNC('day', NOW())
GROUP BY 1
ORDER BY 1
```

そして、このクエリは、マージ前後の1日あたりに生成されたブロックの平均数を計算します。ブロック15537394は、最初のプルーフ・オブ・ステーク（PoS）ブロックです。

```sql
WITH daily AS (
    SELECT
        DATE_TRUNC('day', time) AS dt,
        MIN(number) >= 15537394 AS after_merge,
        COUNT(*) AS block_count
    FROM ethereum.blocks
    WHERE time < DATE_TRUNC('day', NOW())
    GROUP BY 1
)
SELECT
    after_merge,
    AVG(block_count) AS avg_block_count,
    86400 / AVG(block_count) AS avg_seconds_per_block
FROM daily
GROUP BY 1
```

このチュートリアルが最初に書かれた2021年5月の時点では、平均は1日あたり5,874ブロック、つまり14.7秒に1ブロックでした。マージ後、平均は最大値の7200をわずかに下回り、約12秒に1ブロックとなっています。

### ガス {#gas}

ブロックのサイズには上限があります。各ブロックにはガス・リミットがあり、[EIP-1559](/developers/docs/gas/#base-fee)以降、各ブロックにはリミットの半分であるガスターゲットも設定されています。ブロックがターゲットよりも多くのガスを使用すると基本料金が上がり、使用量が少ないと下がります。ガス・リミット自体はバリデータによって調整され、長年にわたって何度か引き上げられてきました。ディスク容量や速度の要件の観点から、任意に大きなブロックサイズがフルノードに負担をかけるのを防ぐために、制限が必要です（[ソース](/developers/docs/blocks/)）。

ブロックのガス・リミットを概念化する1つの方法は、トランザクションをバッチ処理するために利用可能なブロックスペースの**供給**と考えることです。ブロックのガス・リミットは、2016年から現在までクエリして視覚化できます。

![Chart showing average Ethereum gas limit over time](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum.blocks
WHERE time < DATE_TRUNC('day', NOW())
GROUP BY 1
ORDER BY 1
```

次に、イーサリアムチェーンで行われる計算（トランザクションの送信、スマート・コントラクトの呼び出し、NFTのミンティングなど）の支払いのために毎日使用される実際のガスがあります。これは、利用可能なイーサリアムのブロックスペースに対する**需要**です。

![Chart showing daily Ethereum gas used](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum.blocks
WHERE time < DATE_TRUNC('day', NOW())
GROUP BY 1
ORDER BY 1
```

これら2つのチャートを並べて、**需要と供給**がどのように一致しているかを確認することもできます。

![gas_demand_supply](./gas_demand_supply.png)

したがって、ガス代は、利用可能な供給が与えられた場合の、イーサリアムのブロックスペースに対する需要の関数として理解できます。

最後に、イーサリアムチェーンの1日あたりの平均ガス代をクエリしたいと思うかもしれませんが、そうするとクエリ時間が非常に長くなるため、イーサリアム財団がトランザクションごとに支払ったガスの平均量にクエリをフィルタリングします。

![Chart showing Ethereum Foundation daily gas usage](./ef_daily_gas.png)

長年にわたってイーサリアム財団のアドレスに対して行われたすべてのトランザクションで支払われたガス代を確認できます。クエリは以下の通りです。

```sql
SELECT
    block_time,
    gas_price / 1e9 AS gas_price_gwei,
    value / 1e18 AS eth_sent
FROM ethereum.transactions
WHERE "to" = 0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe
ORDER BY block_time DESC
```

### まとめ {#summary}

このチュートリアルでは、オンチェーンデータをクエリして感覚を掴むことで、イーサリアムの基本概念とイーサリアムのブロックチェーンがどのように機能するかを理解しました。

このチュートリアルで使用されたすべてのコードを保持するダッシュボードは、[こちら](https://dune.com/paulapivat/Learn-Ethereum)にあります。

Web3を探索するためのデータのさらなる活用については、[ツイッターで私を見つけてください](https://twitter.com/paulapivat)。
