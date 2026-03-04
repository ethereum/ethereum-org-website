---
title: "在以太坊上打造你自己的 AI 交易代理"
description: "在本教學中，你將學會如何打造一個簡單的 AI 交易代理。 這個代理會從區塊鏈讀取資訊，根據該資訊向大型語言模型 (LLM) 尋求建議，執行 LLM 建議的交易，然後等待並重複此過程。"
author: Ori Pomerantz
tags: [ "AI", "交易", "代理", "python" ]
skill: intermediate
published: 2026-02-13
lang: zh-tw
sidebarDepth: 3
---

在本教學中，你將學會如何建立一個簡單的 AI 交易代理。 此代理的運作方式包含以下步驟：

1. 讀取代幣的當前和過去價格，以及其他潛在的相關資訊
2. 使用此資訊建立查詢，並附上背景資訊以解釋其可能存在的關聯性
3. 提交查詢並接收回傳的預測價格
4. 根據建議進行交易
5. 等待並重複

此代理示範了如何讀取資訊、將其轉譯為能產生可用答案的查詢，並使用該答案。 這些都是 AI 代理所需的步驟。 此代理以 Python 實作，因為它是 AI 領域中最常用的語言。

## 為何要這麼做？ {#why-do-this}

自動化交易代理讓開發者可以選擇並執行交易策略。 [AI 代理](/ai-agents)可實現更複雜且動態的交易策略，可能會使用到開發者甚至從未考慮過的資訊和演算法。

## 工具 {#tools}

本教學使用 [Python](https://www.python.org/)、[Web3 函式庫](https://web3py.readthedocs.io/en/stable/) 和 [Uniswap v3](https://github.com/Uniswap/v3-periphery) 來進行報價和交易。

### 為何選擇 Python？ {#python}

AI 領域中最廣泛使用的語言是 [Python](https://www.python.org/)，所以我們在這裡使用它。 如果你不懂 Python，不用擔心。 這種語言非常清晰，我會詳細解釋它的功能。

[Web3 函式庫](https://web3py.readthedocs.io/en/stable/) 是最常見的 Python 以太坊應用程式介面 (API)。 它相當容易使用。

### 在區塊鏈上交易 {#trading-on-blockchain}

有[許多去中心化交易所 (DEX)](/apps/categories/defi/) 讓你在以太坊上交易代幣。 然而，由於[套利](/developers/docs/smart-contracts/composability/#better-user-experience)的關係，它們的匯率往往相似。

[Uniswap](https://app.uniswap.org/) 是一個廣泛使用的去中心化交易所 (DEX)，我們可以用它來進行報價（查看代幣的相對價值）和交易。

### OpenAI {#openai}

在大型語言模型方面，我選擇從 [OpenAI](https://openai.com/) 開始。 要執行本教學中的應用程式，你需要付費取得 API 存取權限。 最低付款金額 5 美元已綽綽有餘。

## 開發，按部就班 {#step-by-step}

為了簡化開發過程，我們分階段進行。 每個步驟都是 GitHub 中的一個分支。

### 入門 {#getting-started}

以下是在 UNIX 或 Linux（包含 [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)）下開始的步驟

1. 如果你還沒有，請下載並安裝 [Python](https://www.python.org/downloads/)。

2. 複製 GitHub 存放庫。

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. 安裝 [`uv`](https://docs.astral.sh/uv/getting-started/installation/)。 你系統上的指令可能會有所不同。

   ```sh
   pipx install uv
   ```

4. 下載函式庫。

   ```sh
   uv sync
   ```

5. 啟動虛擬環境。

   ```sh
   source .venv/bin/activate
   ```

6. 為了驗證 Python 和 Web3 是否正常運作，請執行 `python3` 並提供這個程式。 你可以在 `>>>` 提示符號後輸入；不需要建立檔案。

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### 從區塊鏈讀取 {#read-blockchain}

下一步是從區塊鏈讀取資料。 要做到這點，你需要切換到 `02-read-quote` 分支，然後使用 `uv` 執行程式。

```sh
git checkout 02-read-quote
uv run agent.py
```

你應該會收到一個 `Quote` 物件的列表，每個物件都包含一個時間戳、一個價格和資產（目前固定為 `WETH/USDC`）。

以下是逐行解釋。

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

匯入我們需要的庫。 使用到它們時，會在下面解釋。

```python
print = functools.partial(print, flush=True)
```

將 Python 的 `print` 取代為總是立即清空輸出緩衝區的版本。 這在長時間運行的腳本中很有用，因為我們不想等待狀態更新或除錯輸出。

```python
MAINNET_URL = "https://eth.drpc.org"
```

一個用來連線到主網的 URL。 你可以從[節點即服務](/developers/docs/nodes-and-clients/nodes-as-a-service/)取得，或使用 [Chainlist](https://chainlist.org/chain/1) 上所宣傳的其中一個。

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

以太坊主網區塊通常每 12 秒產生一個，所以這些是我們預期在一段時間內會產生的區塊數量。 請注意，這不是一個精確的數字。 當[區塊提議者](/developers/docs/consensus-mechanisms/pos/block-proposal/)離線時，該區塊會被跳過，而下一個區塊的時間將是 24 秒。 如果我們想為某個時間戳取得確切的區塊，我們會使用[二元搜尋法](https://en.wikipedia.org/wiki/Binary_search)。 然而，這對我們的目的來說已經足夠接近了。 預測未來並不是一門精確的科學。

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

週期的規模。 我們每個週期會審視一次報價，並嘗試估計下一個週期結束時的價值。

```python
# 我們正在讀取的資金池地址
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

報價價值取自 Uniswap 3 USDC/WETH 資金池，地址為 [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract)。 這個地址已經是總和檢查碼格式，但最好使用 [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address) 來讓程式碼可重複使用。

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

這些是我們需要聯繫的兩個合約的[應用程式二進位介面 (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html)。 為了讓程式碼保持簡潔，我們只包含需要呼叫的函式。

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

初始化 [`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) 函式庫並連線到一個以太坊節點。

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

這是在 Python 中建立資料類別的一種方式。 [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) 資料類型用於連線到合約。 注意 `(frozen=True)`。 在 Python 中，[布林值](https://en.wikipedia.org/wiki/Boolean_data_type)被定義為 `True` 或 `False`，首字母大寫。 這個資料類別是 `frozen`（凍結）的，意思是欄位不能被修改。

注意縮排。 與[源自 C 的語言](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages)相反，Python 使用縮排來表示區塊。 Python 直譯器知道下一個定義不屬於這個資料類別，因為它的起始縮排與資料類別的欄位不同。

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

[`Decimal`](https://docs.python.org/3/library/decimal.html) 類型用於精確處理小數。

```python
    def get_price(self, block: int) -> Decimal:
```

這是在 Python 中定義函式的方式。 這個定義有縮排，表示它仍然是 `PoolInfo` 的一部分。

在屬於資料類別的函式中，第一個參數總是 `self`，也就是呼叫它的資料類別實例。 這裡還有另一個參數，也就是區塊號碼。

```python
        assert block <= w3.eth.block_number, "區塊在未來"
```

如果我們能預知未來，我們就不需要用 AI 來交易了。

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

從 Web3 呼叫以太坊虛擬機 (EVM) 上函式的語法是：`<contract object>.functions.<function name>``().call(<parameters>)`。 參數可以是 EVM 函式的參數（如果有的話；這裡沒有）或用於修改區塊鏈行為的[具名參數](https://en.wikipedia.org/wiki/Named_parameter)。 這裡我們使用其中一個，`block_identifier`，來指定我們希望執行的[區塊號碼](/developers/docs/apis/json-rpc/#default-block)。

結果是[這個結構體，以陣列形式呈現](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72)。 第一個值是兩種代幣之間匯率的函式。

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

為了減少鏈上計算，Uniswap v3 不儲存實際的匯率因子，而是儲存其平方根。 因為 EVM 不支援浮點數運算或分數，所以回應值並非實際數值，而是 <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5</mo><msup><mn>2</mn><mn>96</mn></msup></math>

```python
         # (每 token0 的 token1 數量)
        return 1/(raw_price * self.decimal_factor)
```

我們得到的原始價格是每一個 `token1` 能換到的 `token0` 數量。 在我們的資金池中，`token0` 是 USDC（一種與美元價值相同的穩定幣），而 `token1` 是 [WETH](https://opensea.io/learn/blockchain/what-is-weth)。 我們真正想要的價值是每一 WETH 對應的美元數量，而不是其倒數。

小數位數因子是兩種代幣的[小數位數因子](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals)之間的比例。

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

這個資料類別代表一個報價：特定資產在特定時間點的價格。 在這個階段，`asset` 欄位不重要，因為我們只使用一個資金池，所以只有一種資產。 不過，我們稍後會新增更多資產。

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

這個函式接收一個地址，並回傳該地址上代幣合約的資訊。 要建立一個新的 [Web3 `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html)，我們將地址和應用程式二進位介面 (ABI) 提供給 `w3.eth.contract`。

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

這個函式回傳關於[特定資金池](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol)的所有所需資訊。 `f"<string>"` 語法是一種[格式化字串](https://docs.python.org/3/reference/lexical_analysis.html#f-strings)。

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

取得一個 `Quote` 物件。 `block_number` 的預設值是 `None`（無值）。

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

如果沒有指定區塊號碼，就使用 `w3.eth.block_number`，也就是最新的區塊號碼。 這是 [一個 `if` 陳述式](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement) 的語法。

看起來似乎直接將預設值設為 `w3.eth.block_number` 會更好，但這行不通，因為那會是函式定義時的區塊號碼。 在長時間運行的代理中，這會是個問題。

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

使用 [`datetime` 函式庫](https://docs.python.org/3/library/datetime.html)將其格式化為人類和大型語言模型 (LLM) 都可讀的格式。 使用 [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize) 將數值四捨五入至小數點後兩位。

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

在 Python 中，你可以使用 `list[<type>]` 來定義一個只能包含特定類型的[列表](https://docs.python.org/3/library/stdtypes.html#typesseq-list)。

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

在 Python 中，[`for` 迴圈](https://docs.python.org/3/tutorial/controlflow.html#for-statements)通常會疊代一個列表。 要尋找報價的區塊號碼列表來自 [`range`](https://docs.python.org/3/library/stdtypes.html#range)。

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

對於每個區塊號碼，取得一個 `Quote` 物件並將其附加到 `quotes` 列表中。 然後回傳該列表。

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

這是腳本的主要程式碼。 讀取資金池資訊，取得十二個報價，然後用 [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint) 將它們印出。

### 建立提示 {#prompt}

接下來，我們需要將這個報價列表轉換為給 LLM 的提示，並取得一個預期的未來價值。

```sh
git checkout 03-create-prompt
uv run agent.py
```

現在的輸出將會是一個給 LLM 的提示，類似於：

```
給定以下報價：
資產：WETH/USDC
        2026-01-20T16:34 3016.21
        .
        .
        .
        2026-02-01T17:49 2299.10

資產：WBTC/WETH
        2026-01-20T16:34 29.84
        .
        .
        .
        2026-02-01T17:50 33.46


您預期在 2026-02-02T17:56 時，WETH/USDC 的價值會是多少？

請以單一數字提供您的答案，四捨五入至小數點後兩位，
不要包含任何其他文字。
```

請注意，這裡有兩種資產的報價：`WETH/USDC` 和 `WBTC/WETH`。 新增另一種資產的報價可能會提高預測的準確性。

#### 提示的樣貌 {#prompt-explanation}

這個提示包含三個部分，這在 LLM 提示中相當常見。

1. 資訊。 LLM 從訓練中獲得了大量資訊，但通常不是最新的。 這就是我們需要在此處擷取最新報價的原因。 在提示中新增資訊的作法稱為[檢索增強生成 (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation)。

2. 實際問題。 這是我們想知道的。

3. 輸出格式說明。 通常，LLM 會給我們一個估計值，並解釋它是如何得出的。 這對人類來說更好，但電腦程式只需要最終結果。

#### 程式碼說明 {#prompt-code}

以下是新的程式碼。

```python
from datetime import datetime, timezone, timedelta
```

我們需要提供 LLM 我們想要估計的時間。 要取得未來「n 分鐘/小時/天」的時間，我們使用 [`timedelta` 類別](https://docs.python.org/3/library/datetime.html#datetime.timedelta)。

```python
# 我們正在讀取的資金池地址
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

我們需要讀取兩個資金池。

```python
@dataclass(frozen=True)
class PoolInfo:
    .
    .
    .
    reverse: bool = False

    def get_price(self, block: int) -> Decimal:
        assert block <= w3.eth.block_number, "區塊在未來"
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (每 token0 的 token1 數量)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

在 WETH/USDC 資金池中，我們想知道需要多少 `token0` (USDC) 才能購買一個 `token1` (WETH)。 在 WETH/WBTC 資金池中，我們想知道需要多少 `token1` (WETH) 才能購買一個 `token0` (WBTC，即包裝比特幣)。 我們需要追蹤資金池的比率是否需要反轉。

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

要知道一個資金池是否需要反轉，我們需要將其作為輸入傳遞給 `read_pool`。 此外，資產符號也需要正確設定。

語法 `<a> if <b> else <c>` 是 Python 中相當於[三元條件運算子](https://en.wikipedia.org/wiki/Ternary_conditional_operator)的寫法，在源自 C 的語言中會是 `<b> ?` `<a> : <c>`。

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

這個函式建立一個格式化 `Quote` 物件列表的字串，假設它們都適用於同一個資產。

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

在 Python 中，[多行字串文字](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp)寫成 `"""` ...。 `"""`。

```python
給定以下報價：
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

在這裡，我們使用 [MapReduce](https://en.wikipedia.org/wiki/MapReduce) 模式，用 `format_quotes` 為每個報價列表產生一個字串，然後將它們縮減成一個單一字串，以便在提示中使用。

```python
您預期在 {expected_time} 時，{asset} 的價值會是多少？

請以單一數字提供您的答案，四捨五入至小數點後兩位，
不要包含任何其他文字。
    """
```

提示的其餘部分如預期。

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

檢查這兩個資金池並從兩者取得報價。

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

確定我們想要估計的未來時間點，並建立提示。

### 與 LLM 介接 {#interface-llm}

接下來，我們提示一個實際的 LLM 並接收一個預期的未來價值。 我用 OpenAI 編寫了這個程式，所以如果你想使用不同的供應商，你需要進行調整。

1. 取得一個 [OpenAI 帳戶](https://auth.openai.com/create-account)

2. [為帳戶儲值](https://platform.openai.com/settings/organization/billing/overview) — 撰寫本文時的最低金額為 5 美元

3. [建立一個 API 金鑰](https://platform.openai.com/settings/organization/api-keys)

4. 在命令列中，匯出 API 金鑰，以便你的程式可以使用它

   ```sh
   export OPENAI_API_KEY=sk-<金鑰的其餘部分放在這裡>
   ```

5. 簽出並執行代理

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

以下是新的程式碼。

```python
from openai import OpenAI

open_ai = OpenAI()  # 用戶端會讀取 OPENAI_API_KEY 環境變數
```

匯入並實例化 OpenAI API。

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

呼叫 OpenAI API (`open_ai.chat.completions.create`) 來建立回應。

```python
expected_price = Decimal(response.choices[0].message.content.strip())
current_price = wethusdc_quotes[-1].price

print ("目前價格：", wethusdc_quotes[-1].price)
print(f"在 {future_time}，預期價格：{expected_price} USD")

if (expected_price > current_price):
    print(f"買入，我預期價格會上漲 {expected_price - current_price} USD")
else:
    print(f"賣出，我預期價格會下跌 {current_price - expected_price} USD")
```

輸出價格並提供買入或賣出建議。

#### 測試預測 {#testing-the-predictions}

既然我們能產生預測，我們也可以使用歷史資料來評估我們是否產生了有用的預測。

```sh
uv run test-predictor.py
```

預期結果類似於：

```
2026-01-05T19:50 的預測：預測 3138.93 USD，實際 3218.92 USD，誤差 79.99 USD
2026-01-06T19:56 的預測：預測 3243.39 USD，實際 3221.08 USD，誤差 22.31 USD
2026-01-07T20:02 的預測：預測 3223.24 USD，實際 3146.89 USD，誤差 76.35 USD
2026-01-08T20:11 的預測：預測 3150.47 USD，實際 3092.04 USD，誤差 58.43 USD
.
.
.
2026-01-31T22:33 的預測：預測 2637.73 USD，實際 2417.77 USD，誤差 219.96 USD
2026-02-01T22:41 的預測：預測 2381.70 USD，實際 2318.84 USD，誤差 62.86 USD
2026-02-02T22:49 的預測：預測 2234.91 USD，實際 2349.28 USD，誤差 114.37 USD
29 次預測的平均預測誤差：83.87103448275862068965517241 USD
每次建議的平均變動：4.787931034482758620689655172 USD
變動的標準差：104.42 USD
獲利天數：51.72%
虧損天數：48.28%
```

測試器的大部分內容與代理相同，但以下是新增或修改的部分。

```python
CYCLES_FOR_TEST = 40 # 針對回測，我們測試多少個週期

# 取得大量報價
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

我們回溯 `CYCLES_FOR_TEST`（此處指定為 40）天。

```python
# 建立預測並與真實歷史進行比對

total_error = Decimal(0)
changes = []
```

我們感興趣的有兩種類型的錯誤。 第一種 `total_error`，是預測器所犯錯誤的總和。

要理解第二種 `changes`，我們需要記住代理的目的。 它的目的不是預測 WETH/USDC 的比率（ETH 價格）。 而是發出賣出和買入的建議。 如果目前價格是 2000 美元，而它預測明天是 2010 美元，我們不介意實際結果是 2020 美元，我們還能多賺錢。 但我們_確實_介意如果它預測了 2010 美元，並根據該建議購買了 ETH，結果價格卻跌到 1990 美元。

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

我們只能檢視那些有完整歷史紀錄的案例（用於預測的數值和與之比較的真實世界數值）。 這表示最新的案例必須是從 `CYCLES_BACK` 之前開始的那個。

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

使用[切片 (slices)](https://www.w3schools.com/python/ref_func_slice.asp) 來取得與代理使用的樣本數量相同的樣本。 從這裡到下一個段落之間的程式碼，與我們在代理中用來取得預測的程式碼相同。

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

取得預測價格、實際價格，以及預測當時的價格。 我們需要預測當時的價格，以判斷建議是買入還是賣出。

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"針對 {prediction_time} 的預測：預測 {predicted_price} USD，實際 {real_price} USD，誤差 {error} USD")
```

計算誤差，並將其加到總和中。

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

對於 `changes`，我們想要知道買入或賣出一個 ETH 的金錢影響。 所以首先，我們需要確定建議，然後評估實際價格的變化，以及該建議是賺錢（正向變動）還是虧錢（負向變動）。

```python
print (f"在 {len(wethusdc_quotes)-CYCLES_BACK} 次預測中的平均預測誤差：{total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"每次建議的平均變動：{mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"變動的標準差：{var.sqrt().quantize(Decimal("0.01"))} USD")
```

回報結果。

```python
print (f"獲利天數：{len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"虧損天數：{len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

使用 [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) 來計算獲利天數和虧損天數。 結果是一個 filter 物件，我們需要將它轉換成列表才能取得長度。

### 提交交易 {#submit-txn}

現在我們需要實際提交交易。 然而，在系統被證實有效之前，我不想在此時花費真金白銀。 取而代之，我們將建立一個主網的本地分叉，並在該網路上進行「交易」。

以下是建立本地分叉並啟用交易的步驟。

1. 安裝 [Foundry](https://getfoundry.sh/introduction/installation)

2. 啟動 [`anvil`](https://getfoundry.sh/anvil/overview)

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` 正在 Foundry 的預設 URL (http://localhost:8545) 上監聽，所以我們不需要為我們用來操作區塊鏈的 [`cast` 指令](https://getfoundry.sh/cast/overview)指定 URL。

3. 在 `anvil` 中運行時，有十個擁有 ETH 的測試帳戶 — 為第一個帳戶設定環境變數

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. 這些是我們需要使用的合約。 [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) 是我們用來實際進行交易的 Uniswap v3 合約。 我們可以透過資金池直接交易，但這樣做要簡單得多。

   下面兩個變數是 WETH 和 USDC 之間進行交換所需的 Uniswap v3 路徑。

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. 每個測試帳戶都有 10,000 ETH。 使用 WETH 合約來包裝 1000 ETH，以取得 1000 WETH 用於交易。

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. 使用 `SwapRouter` 將 500 WETH 交易為 USDC。

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   `approve` 呼叫會建立一個額度，允許 `SwapRouter` 花費我們的一些代幣。 合約無法監控事件，所以如果我們直接將代幣轉移到 `SwapRouter` 合約，它不會知道自己收到了款項。 取而代之，我們允許 `SwapRouter` 合約花費一定金額，然後由 `SwapRouter` 執行此操作。 這是透過 `SwapRouter` 呼叫的一個函式來完成的，所以它知道是否成功。

7. 確認你擁有足夠的兩種代幣。

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

既然我們有了 WETH 和 USDC，我們就可以實際運行代理了。

```sh
git checkout 05-trade
uv run agent.py
```

輸出將類似於：

```
(ai-trading-agent) qbzzt@Ori-Cloudnomics:~/260215-ai-agent$ uv run agent.py
目前價格：1843.16
在 2026-02-06T23:07，預期價格：1724.41 USD
交易前帳戶餘額：
USDC 餘額：927301.578272
WETH 餘額：500
賣出，我預期價格會下跌 118.75 USD
授權交易已發送：74e367ddbb407c1aaf567d87aa5863049991b1d2aa092b6b85195d925e2bd41f
授權交易已上鏈。
賣出交易已發送：fad1bcf938585c9e90364b26ac7a80eea9efd34c37e5db81e58d7655bcae28bf
賣出交易已上鏈。
交易後帳戶餘額：
USDC 餘額：929143.797116
WETH 餘額：499
```

要實際使用它，你需要做一些小小的改動。

- 在第 14 行，將 `MAINNET_URL` 更改為一個真實的存取點，例如 `https://eth.drpc.org`
- 在第 28 行，將 `PRIVATE_KEY` 更改為你自己的私密金鑰
- 除非你非常富有，並且可以每天為一個未經證實的代理買入或賣出 1 個 ETH，否則你可能需要更改第 29 行以減少 `WETH_TRADE_AMOUNT`

#### 程式碼說明 {#trading-code}

以下是新的程式碼。

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

與我們在步驟 4 中使用的變數相同。

```python
WETH_TRADE_AMOUNT=1
```

交易的數量。

```python
ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... },
    { "name": "balanceOf", ...},
    { "name": "approve", ...}
]
```

要實際進行交易，我們需要 `approve` 函式。 我們也想顯示交易前後的餘額，所以我們還需要 `balanceOf`。

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

在 `SwapRouter` ABI 中，我們只需要 `exactInput`。 還有一個相關的函式 `exactOutput`，我們可以用它來剛好買入一個 WETH，但為求簡單，我們在這兩種情況下都只使用 `exactInput`。

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

[`account`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) 和 `SwapRouter` 合約的 Web3 定義。

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

交易參數。 我們在這裡需要一個函式，因為[隨機數 (nonce)](https://en.wikipedia.org/wiki/Cryptographic_nonce) 每次都必須改變。

```python
def approve_token(contract: Contract, amount: int):
```

為 `SwapRouter` 授權一個代幣額度。

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

這就是我們在 Web3 中發送交易的方式。 首先我們使用[`Contract` 物件](https://web3py.readthedocs.io/en/stable/web3.contract.html)來建構交易。 然後我們使用 [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) 來簽署交易，使用 `PRIVATE_KEY`。 最後，我們使用 [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) 來發送交易。

```python
    print(f"授權交易已發送：{tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("授權交易已上鏈。")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) 會等到交易被挖出。 如果需要，它會回傳收據。

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

這些是賣出 WETH 時的參數。

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

與 `SELL_PARAMS` 不同，買入參數是可以變動的。 輸入金額是 1 WETH 的成本，可在 `quote` 中取得。

```python
def buy(quote: Quote):
    buy_params = make_buy_params(quote)
    approve_token(wethusdc_pool.token0.contract, buy_params["amountIn"])
    txn = swap_router.functions.exactInput(buy_params).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"買入交易已發送：{tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("買入交易已上鏈。")


def sell():
    approve_token(wethusdc_pool.token1.contract,
                  WETH_TRADE_AMOUNT * 10**wethusdc_pool.token1.decimals)
    txn = swap_router.functions.exactInput(SELL_PARAMS).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"賣出交易已發送：{tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("賣出交易已上鏈。")
```

`buy()` 和 `sell()` 函式幾乎完全相同。 首先我們為 `SwapRouter` 授權一個足夠的額度，然後用正確的路徑和金額呼叫它。

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} 餘額：{Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} 餘額：{Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

回報使用者兩種貨幣的餘額。

```python
print("交易前帳戶餘額：")
balances()

if (expected_price > current_price):
    print(f"買入，我預期價格會上漲 {expected_price - current_price} USD")
    buy(wethusdc_quotes[-1])
else:
    print(f"賣出，我預期價格會下跌 {current_price - expected_price} USD")
    sell()

print("交易後帳戶餘額：")
balances()
```

這個代理目前只能運作一次。 然而，你可以透過 [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) 運行它，或將第 368-400 行包裝在一個迴圈中並使用 [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) 等待下一個週期，使其連續運作。

## 可能的改進 {#improvements}

這不是一個完整的產品版本；它只是一個用來教導基礎知識的範例。 以下是一些改進的建議。

### 更聰明的交易 {#smart-trading}

代理在決定要做什麼時忽略了兩個重要的事實。

- _預期變動的幅度_。 如果預期價格會下跌，代理會賣出固定數量的 `WETH`，無論下跌幅度如何。
  可以說，忽略微小的變化，並根據我們預期價格下跌的幅度來賣出會更好。
- _目前的投資組合_。 如果你投資組合的 10% 是 WETH，而你認為價格會上漲，那麼購買更多可能是有意義的。 但如果你投資組合的 90% 是 WETH，你可能已經有足夠的曝險，不需要再購買更多。 如果你預期價格會下跌，情況則相反。

### 如果你想讓你的交易策略保密怎麼辦？ {#secret}

AI 供應商可以看到你發送給他們 LLM 的查詢，這可能會暴露你用代理開發出的天才交易系統。 一個太多人使用的交易系統是沒有價值的，因為太多人會在你想要買入時嘗試買入（導致價格上漲），並在你想要賣出時嘗試賣出（導致價格下跌）。

你可以本地運行一個 LLM，例如使用 [LM-Studio](https://lmstudio.ai/)，來避免這個問題。

### 從 AI 機器人到 AI 代理 {#bot-to-agent}

你可以很有力地論證這是一個[AI 機器人，而不是 AI 代理](/ai-agents/#ai-agents-vs-ai-bots)。 它實作了一個相對簡單的策略，依賴於預先定義的資訊。 我們可以啟用自我改進，例如，提供一個 Uniswap v3 資金池及其最新價值的列表，並詢問哪種組合具有最佳的預測價值。

### 滑價保護 {#slippage-protection}

目前沒有[滑價保護](https://uniswapv3book.com/milestone_3/slippage-protection.html)。 如果目前的報價是 2000 美元，預期價格是 2100 美元，代理將會買入。 然而，如果在代理買入前成本上升到 2200 美元，那麼再買入就沒有意義了。

要實作滑價保護，請在 [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325) 的第 325 行和第 334 行指定一個 `amountOutMinimum` 值。

## 結論 {#conclusion}

希望你現在已經學會足夠的知識來開始使用 AI 代理了。 這並不是對這個主題的全面概述；有專門的書籍來探討這個主題，但這足以讓你入門。 祝您好運！

[在此查看我的更多作品](https://cryptodocguy.pro/)。
