---
title: "イーサリアムで独自のAIトレーディング・エージェントを作成する"
description: "このチュートリアルでは、シンプルなAIトレーディング・エージェントを作成する方法を学びます。このエージェントは、ブロックチェーンから情報を読み取り、その情報に基づいてLLMに推奨事項を尋ね、LLMが推奨する取引を実行し、その後待機して繰り返します。"
author: "オリ・ポメランツ"
tags:
  - AI
  - トレーディング
  - エージェント
  - python
skill: intermediate
breadcrumb: "AIトレーディング・エージェント"
published: 2026-02-13
lang: ja
sidebarDepth: 3
---

このチュートリアルでは、シンプルなAIトレーディング・エージェントを構築する方法を学びます。このエージェントは以下の手順で動作します。

1. トークンの現在および過去の価格、ならびにその他の関連する可能性のある情報を読み取る
2. この情報と、それがどのように関連するかを説明する背景情報を用いてクエリを構築する
3. クエリを送信し、予測価格を受け取る
4. 推奨事項に基づいて取引する
5. 待機して繰り返す

このエージェントは、情報を読み取り、それを使用可能な回答をもたらすクエリに変換し、その回答を使用する方法を示しています。これらはすべて、AI・エージェントに必要な手順です。このエージェントは、AIで最も一般的に使用されている言語であるPythonで実装されています。

## なぜこれを行うのか？ {#why-do-this}

自動トレーディング・エージェントを使用すると、開発者はトレーディング・ストラテジーを選択して実行できます。[AI・エージェント](/ai-agents)を使用すると、開発者が使用を検討したことすらない情報やアルゴリズムを潜在的に使用して、より複雑で動的なトレーディング・ストラテジーを実現できます。

## ツール {#tools}

このチュートリアルでは、見積もりと取引に[Python](https://www.python.org/)、[Web3ライブラリ](https://web3py.readthedocs.io/en/stable/)、および[ユニスワップ v3](https://github.com/Uniswap/v3-periphery)を使用します。

### なぜPythonなのか？ {#python}

AIで最も広く使用されている言語は[Python](https://www.python.org/)であるため、ここではそれを使用します。Pythonを知らなくても心配しないでください。この言語は非常に明確であり、それが何を行うかを正確に説明します。

[Web3ライブラリ](https://web3py.readthedocs.io/en/stable/)は、最も一般的なPythonのイーサリアムAPIです。非常に使いやすいです。

### ブロックチェーンでの取引 {#trading-on-blockchain}

イーサリアム上でトークンを取引できる[分散型取引所（DEX）は多数](/apps/categories/defi/)あります。しかし、[アービトラージ](/developers/docs/smart-contracts/composability/#better-user-experience)のため、それらは似たような為替レートになる傾向があります。

[ユニスワップ](https://app.uniswap.org/)は広く使用されているDEXであり、見積もり（トークンの相対価値を確認するため）と取引の両方に使用できます。

### OpenAI {#openai}

大規模言語モデル（LLM）については、[OpenAI](https://openai.com/)から始めることにしました。このチュートリアルのアプリケーションを実行するには、APIアクセスの料金を支払う必要があります。最低支払額の5ドルで十分です。

## 開発のステップバイステップ {#step-by-step}

開発を簡素化するために、段階的に進めます。各ステップはGitHubのブランチになっています。

### はじめに {#getting-started}

UNIXまたはLinux（[WSL](https://learn.microsoft.com/en-us/windows/wsl/install)を含む）で開始するための手順があります。

1. まだインストールしていない場合は、[Python](https://www.python.org/downloads/)をダウンロードしてインストールします。

2. GitHubリポジトリをクローンします。

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. [`uv`](https://docs.astral.sh/uv/getting-started/installation/)をインストールします。お使いのシステムではコマンドが異なる場合があります。

   ```sh
   pipx install uv
   ```

4. ライブラリをダウンロードします。

   ```sh
   uv sync
   ```

5. 仮想環境をアクティブにします。

   ```sh
   source .venv/bin/activate
   ```

6. PythonとWeb3が正しく動作していることを確認するには、`python3`を実行し、このプログラムを提供します。`>>>`プロンプトで入力できます。ファイルを作成する必要はありません。

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### ブロックチェーンからの読み取り {#read-blockchain}

次のステップは、ブロックチェーンから読み取ることです。これを行うには、`02-read-quote`ブランチに変更し、`uv`を使用してプログラムを実行する必要があります。

```sh
git checkout 02-read-quote
uv run agent.py
```

タイムスタンプ、価格、およびアセット（現在は常に`WETH/USDC`）を持つ`Quote`オブジェクトのリストを受け取るはずです。

以下は行ごとの説明です。

```python
from web3 import Web3
from web3.contract import Contract
from decimal import Decimal, ROUND_HALF_UP
from dataclasses import dataclass
from datetime import datetime, timezone
from pprint import pprint
import time
import functools
import sys
```

必要なライブラリをインポートします。これらは使用時に以下で説明します。

```python
print = functools.partial(print, flush=True)
```

Pythonの`print`を、常に出力を即座にフラッシュするバージョンに置き換えます。ステータス更新やデバッグ出力を待ちたくないため、これは長時間実行されるスクリプトで役立ちます。

```python
MAINNET_URL = "https://eth.drpc.org"
```

メインネットにアクセスするためのURLです。[Node as a service](/developers/docs/nodes-and-clients/nodes-as-a-service/)から取得するか、[Chainlist](https://chainlist.org/chain/1)で宣伝されているもののいずれかを使用できます。

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

イーサリアム・メインネットのブロックは通常12秒ごとに発生するため、これらは特定の期間に発生すると予想されるブロック数です。これは正確な数値ではないことに注意してください。[ブロック・プロポーザー](/developers/docs/consensus-mechanisms/pos/block-proposal/)がダウンしている場合、そのブロックはスキップされ、次のブロックまでの時間は24秒になります。タイムスタンプの正確なブロックを取得したい場合は、[二分探索](https://en.wikipedia.org/wiki/Binary_search)を使用します。しかし、私たちの目的にはこれで十分近いです。未来を予測することは厳密な科学ではありません。

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

サイクルのサイズです。サイクルごとに1回見積もりを確認し、次のサイクルの終わりの価値を推定しようとします。

```python
# 読み取るプールのアドレス
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

見積もり値は、アドレス[`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract)にあるユニスワップ 3のUSDC/WETHプールから取得されます。このアドレスはすでにチェックサム形式になっていますが、コードを再利用可能にするために[`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address)を使用する方が良いでしょう。

```python
POOL_ABI = [
    { "name": "slot0", ... },
    { "name": "token0", ... },
    { "name": "token1", ... },
]

ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... }
]
```

これらは、通信する必要がある2つのコントラクトの[ABI](https://docs.soliditylang.org/en/latest/abi-spec.html)です。コードを簡潔に保つために、呼び出す必要のある関数のみを含めています。

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

[`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers)ライブラリを初期化し、イーサリアムのノードに接続します。

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

これはPythonでデータクラスを作成する1つの方法です。[`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html)データ型は、コントラクトに接続するために使用されます。`(frozen=True)`に注意してください。Pythonでは、[ブール値](https://en.wikipedia.org/wiki/Boolean_data_type)は大文字で始まる`True`または`False`として定義されます。このデータクラスは`frozen`であり、フィールドを変更できないことを意味します。

インデントに注意してください。[C言語系の言語](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages)とは対照的に、Pythonはブロックを示すためにインデントを使用します。Pythonインタープリタは、次の定義がデータクラスのフィールドと同じインデントで始まっていないため、このデータクラスの一部ではないことを認識します。

```python
@dataclass(frozen=True)
class PoolInfo:
    address: str
    token0: ERC20Token
    token1: ERC20Token
    contract: Contract
    asset: str
    decimal_factor: Decimal = 1
```

[`Decimal`](https://docs.python.org/3/library/decimal.html)型は、小数を正確に処理するために使用されます。

```python
    def get_price(self, block: int) -> Decimal:
```

これはPythonで関数を定義する方法です。定義はインデントされており、まだ`PoolInfo`の一部であることを示しています。

データクラスの一部である関数では、最初のパラメータは常に`self`であり、ここで呼び出されたデータクラスのインスタンスです。ここにはもう1つのパラメータ、ブロック番号があります。

```python
        assert block <= w3.eth.block_number, "Block is in the future"
```

もし未来を読むことができれば、トレーディングにAIは必要ないでしょう。

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

Web3からEVM上の関数を呼び出す構文は次のとおりです：`<contract object>.functions.<function name>().call(<parameters>)`。パラメータは、EVM関数のパラメータ（もしあれば。ここではなし）、またはブロックチェーンの動作を変更するための[名前付きパラメータ](https://en.wikipedia.org/wiki/Named_parameter)にすることができます。ここでは、実行したい[ブロック番号](/developers/docs/apis/json-rpc/#default-block)を指定するために、`block_identifier`というパラメータを1つ使用します。

結果は[配列形式のこの構造体](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72)です。最初の値は、2つのトークン間の為替レートの関数です。

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

オンチェーンの計算を減らすために、ユニスワップ v3は実際の為替係数ではなく、その平方根を保存します。EVMは浮動小数点演算や分数をサポートしていないため、実際の値の代わりに、応答は<math><msqrt><mi>price</mi></msqrt><mo>&#x22C5;</mo><msup><mn>2</mn><mn>96</mn></msup></math>となります。

```python
         # (トークン0あたりのトークン1)
        return 1/(raw_price * self.decimal_factor)
```

取得する生の価格は、各`token1`に対して得られる`token0`の数です。私たちのプールでは、`token0`はUSDC（米ドルと同じ価値を持つステーブルコイン）であり、`token1`は[WETH](https://opensea.io/learn/blockchain/what-is-weth)です。私たちが本当に欲しい値は、WETHあたりのドル数であり、その逆ではありません。

小数係数は、2つのトークンの[小数係数](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals)の比率です。

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

このデータクラスは見つもりを表します。つまり、特定の時点における特定のアセットの価格です。現時点では、単一のプールを使用しており、したがって単一のアセットしかないため、`asset`フィールドは無関係です。ただし、後でさらにアセットを追加します。

```python
def read_token(address: str) -> ERC20Token:
    token = w3.eth.contract(address=address, abi=ERC20_ABI)
    symbol = token.functions.symbol().call()
    decimals = token.functions.decimals().call()

    return ERC20Token(
        address=address,
        symbol=symbol,
        decimals=decimals,
        contract=token
    )
```

この関数はアドレスを受け取り、そのアドレスにあるトークン・コントラクトに関する情報を返します。新しい[Web3 `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html)を作成するには、アドレスとABIを`w3.eth.contract`に提供します。

```python
def read_pool(address: str) -> PoolInfo:
    pool_contract = w3.eth.contract(address=address, abi=POOL_ABI)
    token0Address = pool_contract.functions.token0().call()
    token1Address = pool_contract.functions.token1().call()
    token0 = read_token(token0Address)
    token1 = read_token(token1Address)

    return PoolInfo(
        address=address,
        asset=f"{token1.symbol}/{token0.symbol}",
        token0=token0,
        token1=token1,
        contract=pool_contract,
        decimal_factor=Decimal(10) ** Decimal(token0.decimals - token1.decimals)
    )
```

この関数は、[特定のプール](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol)について必要なすべてを返します。`f"<string>"`という構文は[フォーマット済み文字列](https://docs.python.org/3/reference/lexical_analysis.html#f-strings)です。

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

`Quote`オブジェクトを取得します。`block_number`のデフォルト値は`None`（値なし）です。

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

ブロック番号が指定されていない場合は、最新のブロック番号である`w3.eth.block_number`を使用します。これは[`if`文](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement)の構文です。

デフォルトを単に`w3.eth.block_number`に設定した方が良かったように見えるかもしれませんが、それは関数が定義された時点のブロック番号になってしまうため、うまく機能しません。長時間実行されるエージェントでは、これが問題になります。

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

[`datetime`ライブラリ](https://docs.python.org/3/library/datetime.html)を使用して、人間や大規模言語モデル（LLM）が読み取れる形式にフォーマットします。[`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize)を使用して、値を小数点以下2桁に丸めます。

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

Pythonでは、`list[<type>]`を使用して、特定の型のみを含めることができる[リスト](https://docs.python.org/3/library/stdtypes.html#typesseq-list)を定義します。

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

Pythonでは、[`for`ループ](https://docs.python.org/3/tutorial/controlflow.html#for-statements)は通常、リストを反復処理します。見積もりを見つけるためのブロック番号のリストは、[`range`](https://docs.python.org/3/library/stdtypes.html#range)から取得されます。

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

各ブロック番号について、`Quote`オブジェクトを取得し、それを`quotes`リストに追加します。その後、そのリストを返します。

```python
pool = read_pool(WETHUSDC_ADDRESS)
quotes = get_quotes(
    pool,
    w3.eth.block_number - 12*CYCLE_BLOCKS,
    w3.eth.block_number,
    CYCLE_BLOCKS
)

pprint(quotes)
```

これがスクリプトのメインコードです。プール情報を読み取り、12個の見積もりを取得し、それらを[`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint)します。

### プロンプトの作成 {#prompt}

次に、この見積もりのリストをLLMのプロンプトに変換し、予想される将来の価値を取得する必要があります。

```sh
git checkout 03-create-prompt
uv run agent.py
```

出力は、次のようなLLMへのプロンプトになります。

```
Given these quotes:
Asset: WETH/USDC
        2026-01-20T16:34 3016.21
        .
        .
        .
        2026-02-01T17:49 2299.10

Asset: WBTC/WETH
        2026-01-20T16:34 29.84
        .
        .
        .
        2026-02-01T17:50 33.46


What would you expect the value for WETH/USDC to be at time 2026-02-02T17:56?

Provide your answer as a single number rounded to two decimal places,
without any other text.
```

ここには、`WETH/USDC`と`WBTC/WETH`の2つのアセットの見積もりがあることに注意してください。別のアセットの見積もりを追加すると、予測の精度が向上する可能性があります。

#### プロンプトの構成 {#prompt-explanation}

このプロンプトには、LLMのプロンプトで非常に一般的な3つのセクションが含まれています。

1. 情報。LLMはトレーニングから多くの情報を持っていますが、通常は最新の情報を持っていません。これが、ここで最新の見積もりを取得する必要がある理由です。プロンプトに情報を追加することは、[検索拡張生成（RAG）](https://en.wikipedia.org/wiki/Retrieval-augmented_generation)と呼ばれます。

2. 実際の質問。これが私たちが知りたいことです。

3. 出力フォーマットの指示。通常、LLMはどのようにその結論に至ったかの説明とともに見積もりを提供します。これは人間にとっては良いことですが、コンピュータプログラムには最終的な結果だけが必要です。

#### コードの説明 {#prompt-code}

新しいコードは以下の通りです。

```python
from datetime import datetime, timezone, timedelta
```

見積もりを希望する時間をLLMに提供する必要があります。将来の「n分/時間/日」の時間を取得するには、[`timedelta`クラス](https://docs.python.org/3/library/datetime.html#datetime.timedelta)を使用します。

```python
# 読み取る複数のプールのアドレス
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

読み取る必要のあるプールが2つあります。

```python
@dataclass(frozen=True)
class PoolInfo:
    .
    .
    .
    reverse: bool = False

    def get_price(self, block: int) -> Decimal:
        assert block <= w3.eth.block_number, "Block is in the future"
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (トークン0あたりのトークン1)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

WETH/USDCプールでは、1つの`token1`（WETH）を購入するためにいくつの`token0`（USDC）が必要かを知りたいです。WETH/WBTCプールでは、1つの`token0`（WBTC、ラップド・ビットコイン）を購入するためにいくつの`token1`（WETH）が必要かを知りたいです。プールの比率を逆にする必要があるかどうかを追跡する必要があります。

```python
def read_pool(address: str, reverse: bool = False) -> PoolInfo:
    .
    .
    .

    return PoolInfo(
        .
        .
        .

        asset= f"{token1.symbol}/{token0.symbol}" if reverse else f"{token0.symbol}/{token1.symbol}",
        reverse=reverse
    )
```

プールを逆にする必要があるかどうかを知るために、それを`read_pool`への入力として取得します。また、アセットのシンボルを正しく設定する必要があります。

`<a> if <b> else <c>`という構文は、Pythonにおける[三項条件演算子](https://en.wikipedia.org/wiki/Ternary_conditional_operator)に相当し、C言語系の言語では`<b> ? <a> : <c>`となります。

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

この関数は、すべてが同じアセットに適用されると仮定して、`Quote`オブジェクトのリストをフォーマットする文字列を構築します。

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

Pythonでは、[複数行の文字列リテラル](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp)は`"""` .... `"""`として記述されます。

```python
Given these quotes:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

ここでは、[MapReduce](https://en.wikipedia.org/wiki/MapReduce)パターンを使用して、`format_quotes`で各見積もりリストの文字列を生成し、それらをプロンプトで使用するための単一の文字列に縮小します。

```python
What would you expect the value for {asset} to be at time {expected_time}?

Provide your answer as a single number rounded to two decimal places,
without any other text.
    """
```

プロンプトの残りの部分は予想通りです。

```python
wethusdc_pool = read_pool(WETHUSDC_ADDRESS, True)
wethusdc_quotes = get_quotes(
    wethusdc_pool,
    w3.eth.block_number - 12*CYCLE_BLOCKS,
    w3.eth.block_number,
    CYCLE_BLOCKS,
)

wethwbtc_pool = read_pool(WETHWBTC_ADDRESS)
wethwbtc_quotes = get_quotes(
    wethwbtc_pool,
    w3.eth.block_number - 12*CYCLE_BLOCKS,
    w3.eth.block_number,
    CYCLE_BLOCKS
)
```

2つのプールを確認し、両方から見積もりを取得します。

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

見積もりを希望する将来の時点を決定し、プロンプトを作成します。

### LLMとのインターフェース {#interface-llm}

次に、実際のLLMにプロンプトを送信し、予想される将来の価値を受け取ります。私はOpenAIを使用してこのプログラムを書いたので、別のプロバイダーを使用したい場合は調整する必要があります。

1. [OpenAIアカウント](https://auth.openai.com/create-account)を取得する
2. [アカウントに資金を入金する](https://platform.openai.com/settings/organization/billing/overview) — 執筆時点での最低金額は5ドルです
3. [APIキーを作成する](https://platform.openai.com/settings/organization/api-keys)
4. コマンドラインで、プログラムが使用できるようにAPIキーをエクスポートする

   ```sh
   export OPENAI_API_KEY=sk-<the rest of the key goes here>
   ```

5. エージェントをチェックアウトして実行する

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

新しいコードは以下の通りです。

```python
from openai import OpenAI

open_ai = OpenAI()  # クライアントはOPENAI_API_KEY環境変数を読み取る
```

OpenAI APIをインポートしてインスタンス化します。

```python
response = open_ai.chat.completions.create(
    model="gpt-4-turbo",
    messages=[
        {"role": "user", "content": prompt}
    ],
    temperature=0.0,
    max_tokens=16,
)
```

OpenAI API（`open_ai.chat.completions.create`）を呼び出してレスポンスを作成します。

```python
expected_price = Decimal(response.choices[0].message.content.strip())
current_price = wethusdc_quotes[-1].price

print ("Current price:", wethusdc_quotes[-1].price)
print(f"In {future_time}, expected price: {expected_price} USD")

if (expected_price > current_price):
    print(f"Buy, I expect the price to go up by {expected_price - current_price} USD")
else:
    print(f"Sell, I expect the price to go down by {current_price - expected_price} USD")
```

価格を出力し、買いまたは売りの推奨事項を提供します。

#### 予測のテスト {#testing-the-predictions}

予測を生成できるようになったので、過去のデータを使用して、有用な予測を生成しているかどうかを評価することもできます。

```sh
uv run test-predictor.py
```

期待される結果は次のようになります。

```
Prediction for 2026-01-05T19:50: predicted 3138.93 USD, real 3218.92 USD, error 79.99 USD
Prediction for 2026-01-06T19:56: predicted 3243.39 USD, real 3221.08 USD, error 22.31 USD
Prediction for 2026-01-07T20:02: predicted 3223.24 USD, real 3146.89 USD, error 76.35 USD
Prediction for 2026-01-08T20:11: predicted 3150.47 USD, real 3092.04 USD, error 58.43 USD
.
.
.
Prediction for 2026-01-31T22:33: predicted 2637.73 USD, real 2417.77 USD, error 219.96 USD
Prediction for 2026-02-01T22:41: predicted 2381.70 USD, real 2318.84 USD, error 62.86 USD
Prediction for 2026-02-02T22:49: predicted 2234.91 USD, real 2349.28 USD, error 114.37 USD
Mean prediction error over 29 predictions: 83.87103448275862068965517241 USD
Mean change per recommendation: 4.787931034482758620689655172 USD
Standard variance of changes: 104.42 USD
Profitable days: 51.72%
Losing days: 48.28%
```

テスターの大部分はエージェントと同じですが、新しく追加または変更された部分は以下の通りです。

```python
CYCLES_FOR_TEST = 40 # バックテストでテストするサイクル数

# 多数のクォートを取得する
wethusdc_pool = read_pool(WETHUSDC_ADDRESS, True)
wethusdc_quotes = get_quotes(
    wethusdc_pool,
    w3.eth.block_number - CYCLE_BLOCKS*CYCLES_FOR_TEST,
    w3.eth.block_number,
    CYCLE_BLOCKS,
)

wethwbtc_pool = read_pool(WETHWBTC_ADDRESS)
wethwbtc_quotes = get_quotes(
    wethwbtc_pool,
    w3.eth.block_number - CYCLE_BLOCKS*CYCLES_FOR_TEST,
    w3.eth.block_number,
    CYCLE_BLOCKS
)
```

`CYCLES_FOR_TEST`（ここでは40と指定）日前に遡って確認します。

```python
# 予測を作成し、実際の履歴と比較検証する

total_error = Decimal(0)
changes = []
```

私たちが関心を持っているエラーには2つのタイプがあります。1つ目の`total_error`は、単に予測器が犯したエラーの合計です。

2つ目の`changes`を理解するには、エージェントの目的を思い出す必要があります。それはWETH/USDCの比率（ETH価格）を予測することではありません。売りと買いの推奨事項を発行することです。現在の価格が2000ドルで、明日2010ドルになると予測した場合、実際の結果が2020ドルになって余分にお金を稼げたとしても気にしません。しかし、2010ドルと予測し、その推奨に基づいてETHを購入したのに、価格が1990ドルに下がった場合は_気にします_。

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

完全な履歴（予測に使用された値と、それと比較するための現実世界の値）が利用可能なケースのみを確認できます。これは、最新のケースが`CYCLES_BACK`前に開始されたものでなければならないことを意味します。

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

[スライス](https://www.w3schools.com/python/ref_func_slice.asp)を使用して、エージェントが使用するのと同じ数のサンプルを取得します。ここと次のセグメントの間のコードは、エージェントにある予測取得コードと同じです。

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

予測価格、実際の価格、および予測時の価格を取得します。推奨が買いだったか売りだったかを判断するために、予測時の価格が必要です。

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Prediction for {prediction_time}: predicted {predicted_price} USD, real {real_price} USD, error {error} USD")
```

エラーを計算し、合計に追加します。

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

`changes`については、1 ETHを売買した場合の金銭的影響を知りたいです。そのため、まず推奨事項を決定し、次に実際の価格がどのように変化したか、そしてその推奨事項が利益をもたらしたか（プラスの変化）、または損失をもたらしたか（マイナスの変化）を評価する必要があります。

```python
print (f"Mean prediction error over {len(wethusdc_quotes)-CYCLES_BACK} predictions: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Mean change per recommendation: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Standard variance of changes: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

結果を報告します。

```python
print (f"Profitable days: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Losing days: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

[`filter`](https://www.w3schools.com/python/ref_func_filter.asp)を使用して、利益が出た日数と損失が出た日数をカウントします。結果はフィルターオブジェクトであり、長さを取得するにはリストに変換する必要があります。

### トランザクションの送信 {#submit-txn}

これで、実際にトランザクションを送信する必要があります。しかし、システムが証明される前の現時点では、実際のお金を使いたくありません。代わりに、メインネットのローカルフォークを作成し、そのネットワーク上で「取引」します。

ローカルフォークを作成し、取引を有効にする手順は以下の通りです。

1. [Foundry](https://getfoundry.sh/introduction/installation)をインストールする

2. [`anvil`](https://getfoundry.sh/anvil/overview)を起動する

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil`はFoundryのデフォルトURLであるhttp://localhost:8545でリッスンしているため、ブロックチェーンを操作するために使用する[`cast`コマンド](https://getfoundry.sh/cast/overview)のURLを指定する必要はありません。

3. `anvil`で実行している場合、ETHを持つ10個のテストアカウントがあります。最初のアカウントの環境変数を設定します。

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. これらは使用する必要があるコントラクトです。[`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol)は、実際に取引するために使用するユニスワップ v3のコントラクトです。プールを通じて直接取引することもできますが、こちらの方がはるかに簡単です。

   下の2つの変数は、WETHとUSDCの間でスワップするために必要なユニスワップ v3のパスです。

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. 各テストアカウントには10,000 ETHがあります。WETHコントラクトを使用して1000 ETHをラップし、取引のための1000 WETHを取得します。

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. `SwapRouter`を使用して、500 WETHをUSDCと取引します。

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   `approve`の呼び出しは、`SwapRouter`が私たちのトークンの一部を消費できるようにするアローワンスを作成します。コントラクトはイベントを監視できないため、トークンを直接`SwapRouter`コントラクトに送金しても、支払われたことを認識できません。代わりに、`SwapRouter`コントラクトが一定額を消費することを許可し、その後`SwapRouter`がそれを実行します。これは`SwapRouter`によって呼び出される関数を通じて行われるため、成功したかどうかを認識できます。

7. 両方のトークンが十分にあることを確認します。

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

WETHとUSDCが手に入ったので、実際にエージェントを実行できます。

```sh
git checkout 05-trade
uv run agent.py
```

出力は次のようになります。

```
(ai-trading-agent) qbzzt@Ori-Cloudnomics:~/260215-ai-agent$ uv run agent.py
Current price: 1843.16
In 2026-02-06T23:07, expected price: 1724.41 USD
Account balances before trade:
USDC Balance: 927301.578272
WETH Balance: 500
Sell, I expect the price to go down by 118.75 USD
Approve transaction sent: 74e367ddbb407c1aaf567d87aa5863049991b1d2aa092b6b85195d925e2bd41f
Approve transaction mined.
Sell transaction sent: fad1bcf938585c9e90364b26ac7a80eea9efd34c37e5db81e58d7655bcae28bf
Sell transaction mined.
Account balances after trade:
USDC Balance: 929143.797116
WETH Balance: 499
```

実際に使用するには、いくつかの小さな変更が必要です。

- 14行目で、`MAINNET_URL`を`https://eth.drpc.org`などの実際のアクセスポイントに変更します
- 28行目で、`PRIVATE_KEY`を自身の秘密鍵に変更します
- 非常に裕福で、証明されていないエージェントのために毎日1 ETHを売買できる場合を除き、29行目を変更して`WETH_TRADE_AMOUNT`を減らすとよいでしょう

#### コードの説明 {#trading-code}

新しいコードは以下の通りです。

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

ステップ4で使用したのと同じ変数です。

```python
WETH_TRADE_AMOUNT=1
```

取引する金額です。

```python
ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... },
    { "name": "balanceOf", ...},
    { "name": "approve", ...}
]
```

実際に取引するには、`approve`関数が必要です。また、前後の残高を表示したいため、`balanceOf`も必要です。

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

`SwapRouter`のABIでは、`exactInput`だけが必要です。関連する関数として、正確に1 WETHを購入するために使用できる`exactOutput`がありますが、簡単にするために両方のケースで`exactInput`を使用します。

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

[`account`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html)および`SwapRouter`コントラクトのWeb3定義です。

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

トランザクションのパラメータです。[ナンス](https://en.wikipedia.org/wiki/Cryptographic_nonce)は毎回変更する必要があるため、ここでは関数が必要です。

```python
def approve_token(contract: Contract, amount: int):
```

`SwapRouter`のトークンのアローワンスを承認します。

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

これがWeb3でトランザクションを送信する方法です。まず、[`Contract`オブジェクト](https://web3py.readthedocs.io/en/stable/web3.contract.html)を使用してトランザクションを構築します。次に、`PRIVATE_KEY`を使用して、[`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction)でトランザクションに署名します。最後に、[`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction)を使用してトランザクションを送信します。

```python
    print(f"Approve transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Approve transaction mined.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt)は、トランザクションがマイニングされるまで待機します。必要に応じてレシートを返します。

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

これらはWETHを販売する際のパラメータです。

```python
def make_buy_params(quote: Quote) -> dict:
    return {
        "path": USDC_TO_WETH,
        "recipient": account.address,
        "deadline": 2**256 - 1,
        "amountIn": int(quote.price*WETH_TRADE_AMOUNT) * 10**wethusdc_pool.token0.decimals,
        "amountOutMinimum": 0,
    }
```

`SELL_PARAMS`とは対照的に、購入パラメータは変更される可能性があります。入力金額は、`quote`で利用可能な1 WETHのコストです。

```python
def buy(quote: Quote):
    buy_params = make_buy_params(quote)
    approve_token(wethusdc_pool.token0.contract, buy_params["amountIn"])
    txn = swap_router.functions.exactInput(buy_params).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"Buy transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Buy transaction mined.")


def sell():
    approve_token(wethusdc_pool.token1.contract,
                  WETH_TRADE_AMOUNT * 10**wethusdc_pool.token1.decimals)
    txn = swap_router.functions.exactInput(SELL_PARAMS).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"Sell transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Sell transaction mined.")
```

`buy()`関数と`sell()`関数はほぼ同じです。まず、`SwapRouter`に十分なアローワンスを承認し、次に正しいパスと金額でそれを呼び出します。

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

両方の通貨でのユーザー残高を報告します。

```python
print("Account balances before trade:")
balances()

if (expected_price > current_price):
    print(f"Buy, I expect the price to go up by {expected_price - current_price} USD")
    buy(wethusdc_quotes[-1])
else:
    print(f"Sell, I expect the price to go down by {current_price - expected_price} USD")
    sell()

print("Account balances after trade:")
balances()
```

このエージェントは現在1回しか機能しません。ただし、[`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html)から実行するか、368〜400行目をループで囲み、[`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep)を使用して次のサイクルの時間になるまで待機することで、継続的に機能するように変更できます。

## 可能な改善点 {#improvements}

これは完全な本番バージョンではありません。基本を教えるための単なる例です。改善のためのいくつかのアイデアを以下に示します。

### よりスマートな取引 {#smart-trading}

エージェントが何をすべきかを決定する際に無視している2つの重要な事実があります。

- _予想される変化の大きさ_。エージェントは、下落の大きさに関係なく、価格が下落すると予想される場合に一定量の`WETH`を販売します。
  間違いなく、小さな変化を無視し、価格がどれだけ下落すると予想されるかに基づいて販売する方が良いでしょう。
- _現在のポートフォリオ_。ポートフォリオの10%がWETHであり、価格が上がると考えている場合、さらに購入することは理にかなっているでしょう。しかし、ポートフォリオの90%がWETHである場合、十分にエクスポージャーを持っており、さらに購入する必要はないかもしれません。価格が下がると予想される場合は、その逆が当てはまります。

### トレーディング・ストラテジーを秘密にしておきたい場合はどうすればよいか？ {#secret}

AIベンダーは、あなたが彼らのLLMに送信するクエリを見ることができ、これにより、あなたがエージェントで開発した天才的なトレーディングシステムが暴露される可能性があります。あまりにも多くの人が使用するトレーディングシステムは無価値です。なぜなら、あなたが買いたいときにあまりにも多くの人が買おうとし（そして価格が上がる）、あなたが売りたいときに売ろうとする（そして価格が下がる）からです。

この問題を回避するために、たとえば[LM-Studio](https://lmstudio.ai/)を使用して、LLMをローカルで実行できます。

### AIボットからAI・エージェントへ {#bot-to-agent}

これが[AI・エージェントではなくAIボットである](/ai-agents/#ai-agents-vs-ai-bots)と主張する十分な理由があります。これは、事前に定義された情報に依存する比較的シンプルなストラテジーを実装しています。たとえば、ユニスワップ v3のプールとその最新の値のリストを提供し、どの組み合わせが最も予測価値が高いかを尋ねることで、自己改善を可能にすることができます。

### スリッページ保護 {#slippage-protection}

現在、[スリッページ保護](https://uniswapv3book.com/milestone_3/slippage-protection.html)はありません。現在の見積もりが2000ドルで、予想価格が2100ドルの場合、エージェントは購入します。しかし、エージェントが購入する前にコストが2200ドルに上昇した場合、もはや購入する意味はありません。

スリッページ保護を実装するには、[`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325)の325行目と334行目に`amountOutMinimum`の値を指定します。

## 結論 {#conclusion}

これで、AI・エージェントを始めるのに十分な知識が得られたことを願っています。これはこの主題の包括的な概要ではありません。それに特化した本が丸ごとありますが、始めるにはこれで十分です。幸運を祈ります！

[私の他の作品についてはこちらをご覧ください](https://cryptodocguy.pro/)。