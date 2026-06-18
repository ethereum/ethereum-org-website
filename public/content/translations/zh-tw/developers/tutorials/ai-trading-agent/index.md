---
title: "在以太坊上打造你自己的 AI 交易代理"
description: "在本教學中，你將學習如何製作一個簡單的 AI 交易代理。該代理會從區塊鏈讀取資訊，根據這些資訊向大型語言模型 (LLM) 尋求建議，執行 LLM 建議的交易，然後等待並重複此過程。"
author: "奧里·波梅蘭茨"
tags:
  - AI
  - 交易
  - 代理
  - Python
skill: intermediate
breadcrumb: "AI 交易代理"
published: 2026-02-13
lang: zh-tw
sidebarDepth: 3
---

在本教學中，你將學習如何建立一個簡單的 AI 交易代理。此代理的運作步驟如下：

1. 讀取代幣的當前與歷史價格，以及其他可能相關的資訊
2. 使用這些資訊建立查詢，並附上背景資訊以解釋其相關性
3. 提交查詢並接收預測價格
4. 根據建議進行交易
5. 等待並重複

此代理示範了如何讀取資訊、將其轉換為能產生可用答案的查詢，並使用該答案。這些都是 AI 代理所需的步驟。此代理使用 Python 實作，因為它是 AI 領域中最常用的語言。

## 為什麼要這麼做？ {#why-do-this}

自動化交易代理允許開發者選擇並執行交易策略。 [AI 代理](/ai-agents)允許更複雜且動態的交易策略，甚至可能使用開發者從未考慮過的資訊與演算法。

## 工具 {#tools}

本教學使用 [Python](https://www.python.org/)、[Web3 函式庫](https://web3py.readthedocs.io/en/stable/) 以及 [尤尼斯瓦普 (Uniswap) v3](https://github.com/Uniswap/v3-periphery) 來獲取報價與進行交易。

### 為什麼選擇 Python？ {#python}

AI 領域最廣泛使用的語言是 [Python](https://www.python.org/)，因此我們在這裡使用它。如果你不懂 Python 也不用擔心。這門語言非常清晰，我會準確解釋它的作用。

[Web3 函式庫](https://web3py.readthedocs.io/en/stable/) 是最常見的 Python 以太坊 API。它非常容易使用。

### 在區塊鏈上交易 {#trading-on-blockchain}

有[許多去中心化交易所 (DEX)](/apps/categories/defi/) 讓你在以太坊上交易代幣。然而，由於[套利](/developers/docs/smart-contracts/composability/#better-user-experience)的關係，它們的匯率往往很相似。

[尤尼斯瓦普](https://app.uniswap.org/) 是一個廣泛使用的 DEX，我們可以用它來獲取報價（查看代幣相對價值）和進行交易。

### OpenAI {#openai}

至於大型語言模型 (LLM)，我選擇從 [OpenAI](https://openai.com/) 開始。要執行本教學中的應用程式，你需要付費取得 API 存取權限。最低 5 美元的付款已經綽綽有餘。

## 逐步開發 {#step-by-step}

為了簡化開發，我們分階段進行。每個步驟都是 GitHub 中的一個分支。

### 入門指南 {#getting-started}

以下是在 UNIX 或 Linux（包含 [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)）環境下開始的步驟：

1. 如果你尚未安裝，請下載並安裝 [Python](https://www.python.org/downloads/)。

2. 複製 GitHub 儲存庫。

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. 安裝 [`uv`](https://docs.astral.sh/uv/getting-started/installation/)。你系統上的指令可能會有所不同。

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

6. 若要驗證 Python 和 Web3 是否正常運作，請執行 `python3` 並提供此程式。你可以在 `>>>` 提示字元下輸入；不需要建立檔案。

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### 從區塊鏈讀取 {#read-blockchain}

下一步是從區塊鏈讀取資料。為此，你需要切換到 `02-read-quote` 分支，然後使用 `uv` 執行程式。

```sh
git checkout 02-read-quote
uv run agent.py
```

你應該會收到一個 `Quote` 物件列表，每個物件都包含時間戳記、價格和資產（目前始終為 `WETH/USDC`）。

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

匯入我們需要的函式庫。它們會在下方使用時進行解釋。

```python
print = functools.partial(print, flush=True)
```

將 Python 的 `print` 替換為始終立即刷新輸出的版本。這在長時間執行的腳本中很有用，因為我們不想等待狀態更新或除錯輸出。

```python
MAINNET_URL = "https://eth.drpc.org"
```

連接至主網的 URL。你可以從 [節點即服務 (Node as a service)](/developers/docs/nodes-and-clients/nodes-as-a-service/) 取得一個，或使用 [Chainlist](https://chainlist.org/chain/1) 中宣傳的 URL。

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

以太坊主網區塊通常每 12 秒產生一個，因此這些是我們預期在一段時間內會產生的區塊數量。請注意，這不是一個精確的數字。當[區塊提案者](/developers/docs/consensus-mechanisms/pos/block-proposal/)停機時，該區塊會被跳過，下一個區塊的時間將是 24 秒。如果我們想取得特定時間戳記的確切區塊，我們會使用[二元搜尋](https://en.wikipedia.org/wiki/Binary_search)。然而，這對我們的目的來說已經足夠接近了。預測未來並非一門精確的科學。

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

週期的長度。我們每個週期審查一次報價，並嘗試估計下一個週期結束時的價值。

```python
# 我們正在讀取的池地址
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

報價取自地址為 [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract) 的尤尼斯瓦普 3 USDC/WETH 資金池。此地址已採用校驗和 (checksum) 格式，但最好使用 [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address) 以使程式碼可重複使用。

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

這些是我們需要互動的兩個合約的 [ABI](https://docs.soliditylang.org/en/latest/abi-spec.html)。為了保持程式碼簡潔，我們只包含需要呼叫的函式。

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

初始化 [`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) 函式庫並連接到以太坊節點。

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

這是 Python 中建立資料類別 (data class) 的一種方式。[`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) 資料型別用於連接合約。請注意 `(frozen=True)`。在 Python 中，[布林值](https://en.wikipedia.org/wiki/Boolean_data_type)定義為 `True` 或 `False`，首字母大寫。此資料類別是 `frozen`，這意味著欄位無法修改。

注意縮排。與[衍生自 C 的語言](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages)不同，Python 使用縮排來表示區塊。Python 直譯器知道以下定義不屬於此資料類別，因為它的起始縮排與資料類別欄位不同。

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

[`Decimal`](https://docs.python.org/3/library/decimal.html) 型別用於精確處理小數。

```python
    def get_price(self, block: int) -> Decimal:
```

這是 Python 中定義函式的方式。定義有縮排，表示它仍然是 `PoolInfo` 的一部分。

在屬於資料類別的函式中，第一個參數始終是 `self`，即呼叫此處的資料類別實例。這裡還有另一個參數：區塊號碼。

```python
        assert block <= w3.eth.block_number, "Block is in the future"
```

如果我們能預知未來，我們就不需要 AI 來進行交易了。

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

從 Web3 呼叫 EVM 上函式的語法如下：`<contract object>.functions.<function name>().call(<parameters>)`。參數可以是 EVM 函式的參數（如果有的話；這裡沒有），或者是用於修改區塊鏈行為的[具名參數](https://en.wikipedia.org/wiki/Named_parameter)。這裡我們使用了一個 `block_identifier`，來指定我們希望在哪個[區塊號碼](/developers/docs/apis/json-rpc/#default-block)中執行。

結果是[這個結構 (struct) 的陣列形式](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72)。第一個值是兩種代幣之間匯率的函數。

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

為了減少鏈上計算，尤尼斯瓦普 v3 不儲存實際的兌換係數，而是儲存其平方根。因為 EVM 不支援浮點數運算或分數，所以回應的不是實際值，而是 <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5;</mo><msup><mn>2</mn><mn>96</mn></msup></math>

```python
         # (每個代幣0的代幣1)
        return 1/(raw_price * self.decimal_factor)
```

我們獲得的原始價格是每個 `token1` 可以換得的 `token0` 數量。在我們的資金池中，`token0` 是 USDC（價值等同於美元的穩定幣），而 `token1` 是 [WETH](https://opensea.io/learn/blockchain/what-is-weth)。我們真正想要的值是每 WETH 多少美元，而不是反過來。

小數係數是兩種代幣的[小數係數](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals)之間的比例。

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

此資料類別代表一個報價：特定資產在給定時間點的價格。在這一點上，`asset` 欄位無關緊要，因為我們使用單一資金池，因此只有單一資產。不過，我們稍後會新增更多資產。

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

此函式接收一個地址，並傳回該地址代幣合約的相關資訊。要建立一個新的 [Web3 `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html)，我們將地址和 ABI 提供給 `w3.eth.contract`。

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

此函式傳回我們需要關於[特定資金池](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol)的所有資訊。語法 `f"<string>"` 是一個[格式化字串](https://docs.python.org/3/reference/lexical_analysis.html#f-strings)。

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

取得一個 `Quote` 物件。`block_number` 的預設值為 `None`（無值）。

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

如果未指定區塊號碼，則使用 `w3.eth.block_number`，即最新的區塊號碼。這是 [`if` 敘述](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement)的語法。

看起來似乎直接將預設值設為 `w3.eth.block_number` 會更好，但這行不通，因為那會是定義函式時的區塊號碼。在長時間執行的代理中，這會是個問題。

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

使用 [`datetime` 函式庫](https://docs.python.org/3/library/datetime.html)將其格式化為人類和大型語言模型 (LLM) 可讀的格式。使用 [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize) 將數值四捨五入到小數點後兩位。

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

在 Python 中，你可以使用 `list[<type>]` 定義一個只能包含特定型別的[列表 (list)](https://docs.python.org/3/library/stdtypes.html#typesseq-list)。

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

在 Python 中，[`for` 迴圈](https://docs.python.org/3/tutorial/controlflow.html#for-statements)通常會迭代一個列表。用來尋找報價的區塊號碼列表來自 [`range`](https://docs.python.org/3/library/stdtypes.html#range)。

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

對於每個區塊號碼，取得一個 `Quote` 物件並將其附加到 `quotes` 列表中。然後傳回該列表。

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

這是腳本的主要程式碼。讀取資金池資訊，取得十二個報價，並將它們[`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint)。

### 建立提示詞 (Prompt) {#prompt}

接下來，我們需要將這個報價列表轉換為給 LLM 的提示詞，並獲得預期的未來價值。

```sh
git checkout 03-create-prompt
uv run agent.py
```

輸出現在將成為給 LLM 的提示詞，類似於：

```
根據這些報價：
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


你預期 WETH/USDC 在 2026-02-02T17:56 時的價值會是多少？

請提供單一數字作為答案，四捨五入至小數點後兩位，
不要包含任何其他文字。
```

請注意，這裡有兩種資產的報價：`WETH/USDC` 和 `WBTC/WETH`。加入另一種資產的報價可能會提高預測的準確性。

#### 提示詞的樣貌 {#prompt-explanation}

這個提示詞包含三個部分，這在 LLM 提示詞中非常常見。

1. 資訊。LLM 從其訓練中獲得了大量資訊，但它們通常沒有最新的資訊。這就是我們需要在此處擷取最新報價的原因。將資訊加入提示詞中稱為[檢索增強生成 (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation)。

2. 實際問題。這是我們想知道的內容。

3. 輸出格式指示。通常，LLM 會給我們一個估計值，並解釋它是如何得出這個結果的。這對人類來說比較好，但電腦程式只需要最終結果。

#### 程式碼解釋 {#prompt-code}

這是新的程式碼。

```python
from datetime import datetime, timezone, timedelta
```

我們需要向 LLM 提供我們想要估計的時間。要取得未來「n 分鐘/小時/天」的時間，我們使用 [`timedelta` 類別](https://docs.python.org/3/library/datetime.html#datetime.timedelta)。

```python
# 我們正在讀取的各個池的地址
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

我們有兩個需要讀取的資金池。

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
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (每個代幣0的代幣1)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

在 WETH/USDC 資金池中，我們想知道需要多少 `token0` (USDC) 才能買到一個 `token1` (WETH)。在 WETH/WBTC 資金池中，我們想知道需要多少 `token1` (WETH) 才能買到一個 `token0` (WBTC，即包裝比特幣)。我們需要追蹤資金池的比例是否需要反轉。

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

要知道資金池是否需要反轉，我們將其作為 `read_pool` 的輸入。此外，資產代號也需要正確設定。

語法 `<a> if <b> else <c>` 是 Python 中等同於[三元條件運算子](https://en.wikipedia.org/wiki/Ternary_conditional_operator)的寫法，在衍生自 C 的語言中會是 `<b> ? <a> : <c>`。

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

此函式建立一個字串，用於格式化 `Quote` 物件列表，假設它們都適用於相同的資產。

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

在 Python 中，[多行字串常值](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp)寫為 `"""` .... `"""`。

```python
Given these quotes:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

這裡，我們使用 [MapReduce](https://en.wikipedia.org/wiki/MapReduce) 模式，透過 `format_quotes` 為每個報價列表產生一個字串，然後將它們縮減為單一字串以用於提示詞中。

```python
What would you expect the value for {asset} to be at time {expected_time}?

Provide your answer as a single number rounded to two decimal places,
without any other text.
    """
```

提示詞的其餘部分如預期。

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

審查這兩個資金池並從兩者取得報價。

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

決定我們想要估計的未來時間點，並建立提示詞。

### 與 LLM 介接 {#interface-llm}

接下來，我們向實際的 LLM 發出提示詞並接收預期的未來價值。我使用 OpenAI 編寫了這個程式，所以如果你想使用不同的提供者，你需要進行調整。

1. 取得一個 [OpenAI 帳戶](https://auth.openai.com/create-account)
2. [為帳戶儲值](https://platform.openai.com/settings/organization/billing/overview)——在撰寫本文時，最低金額為 5 美元
3. [建立 API 金鑰](https://platform.openai.com/settings/organization/api-keys)
4. 在命令列中，匯出 API 金鑰，以便你的程式可以使用它

   ```sh
   export OPENAI_API_KEY=sk-<the rest of the key goes here>
   ```

5. 簽出 (Checkout) 並執行代理

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

這是新的程式碼。

```python
from openai import OpenAI

open_ai = OpenAI()  # 客戶端讀取 OPENAI_API_KEY 環境變數
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

print ("Current price:", wethusdc_quotes[-1].price)
print(f"In {future_time}, expected price: {expected_price} USD")

if (expected_price > current_price):
    print(f"Buy, I expect the price to go up by {expected_price - current_price} USD")
else:
    print(f"Sell, I expect the price to go down by {current_price - expected_price} USD")
```

輸出價格並提供買入或賣出建議。

#### 測試預測 {#testing-the-predictions}

既然我們能夠產生預測，我們也可以使用歷史資料來評估我們是否產生了有用的預測。

```sh
uv run test-predictor.py
```

預期結果類似於：

```
2026-01-05T19:50 的預測：預測值 3138.93 USD，實際值 3218.92 USD，誤差 79.99 USD
2026-01-06T19:56 的預測：預測值 3243.39 USD，實際值 3221.08 USD，誤差 22.31 USD
2026-01-07T20:02 的預測：預測值 3223.24 USD，實際值 3146.89 USD，誤差 76.35 USD
2026-01-08T20:11 的預測：預測值 3150.47 USD，實際值 3092.04 USD，誤差 58.43 USD
.
.
.
2026-01-31T22:33 的預測：預測值 2637.73 USD，實際值 2417.77 USD，誤差 219.96 USD
2026-02-01T22:41 的預測：預測值 2381.70 USD，實際值 2318.84 USD，誤差 62.86 USD
2026-02-02T22:49 的預測：預測值 2234.91 USD，實際值 2349.28 USD，誤差 114.37 USD
29 次預測的平均預測誤差：83.87103448275862068965517241 USD
每次建議的平均變動：4.787931034482758620689655172 USD
變動的標準變異數：104.42 USD
獲利天數：51.72%
虧損天數：48.28%
```

測試程式的大部分與代理相同，但以下是新增或修改的部分。

```python
CYCLES_FOR_TEST = 40 # 回測時，我們測試的週期數

# 獲取大量報價
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

我們回顧 `CYCLES_FOR_TEST`（此處指定為 40）天前的資料。

```python
# 建立預測並與真實歷史進行比對

total_error = Decimal(0)
changes = []
```

我們感興趣的誤差有兩種類型。第一種 `total_error`，單純是預測器所犯誤差的總和。

要理解第二種 `changes`，我們需要記住代理的目的。它的目的不是預測 WETH/USDC 比例（ETH 價格）。它的目的是發出賣出和買入建議。如果目前價格是 2000 美元，而它預測明天是 2010 美元，如果實際結果是 2020 美元讓我們賺了額外的錢，我們並不介意。但如果它預測 2010 美元，我們根據該建議買入了 ETH，結果價格跌到 1990 美元，我們_就會_介意了。

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

我們只能查看具有完整歷史記錄（用於預測的值以及用於比較的真實世界值）的案例。這意味著最新的案例必須是 `CYCLES_BACK` 前開始的案例。

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

使用[切片 (slices)](https://www.w3schools.com/python/ref_func_slice.asp)來取得與代理使用數量相同的樣本數。從這裡到下一個片段之間的程式碼，與我們在代理中取得預測的程式碼相同。

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

取得預測價格、實際價格以及預測時的價格。我們需要預測時的價格來決定建議是買入還是賣出。

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Prediction for {prediction_time}: predicted {predicted_price} USD, real {real_price} USD, error {error} USD")
```

計算誤差，並將其加到總和中。

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

對於 `changes`，我們想要知道買入或賣出 1 ETH 的金錢影響。因此，首先我們需要確定建議，然後評估實際價格如何變動，以及該建議是賺錢（正向變動）還是虧錢（負向變動）。

```python
print (f"Mean prediction error over {len(wethusdc_quotes)-CYCLES_BACK} predictions: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Mean change per recommendation: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Standard variance of changes: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

報告結果。

```python
print (f"Profitable days: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Losing days: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

使用 [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) 來計算獲利天數和虧損天數。結果是一個 filter 物件，我們需要將其轉換為列表才能取得長度。

### 提交交易 {#submit-txn}

現在我們需要實際提交交易。然而，在系統被證明有效之前，我不想在此階段花費真金白銀。相反地，我們將建立一個主網的本地分叉，並在該網路上進行「交易」。

以下是建立本地分叉並啟用交易的步驟。

1. 安裝 [Foundry](https://getfoundry.sh/introduction/installation)

2. 啟動 [`anvil`](https://getfoundry.sh/anvil/overview)

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` 正在監聽 Foundry 的預設 URL (http://localhost:8545)，因此我們不需要為用來操作區塊鏈的[`cast` 指令](https://getfoundry.sh/cast/overview)指定 URL。

3. 在 `anvil` 中執行時，有十個擁有 ETH 的測試帳戶——為第一個帳戶設定環境變數

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. 這些是我們需要使用的合約。[`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) 是我們用來實際交易的尤尼斯瓦普 v3 合約。我們可以直接透過資金池進行交易，但這樣做容易得多。

   底部的兩個變數是在 WETH 和 USDC 之間兌換所需的尤尼斯瓦普 v3 路徑。

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. 每個測試帳戶都有 10,000 ETH。使用 WETH 合約包裝 1000 ETH，以獲得 1000 WETH 用於交易。

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. 使用 `SwapRouter` 將 500 WETH 兌換為 USDC。

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   `approve` 呼叫會建立一個授權額度，允許 `SwapRouter` 花費我們的一些代幣。合約無法監控事件，因此如果我們直接將代幣轉帳給 `SwapRouter` 合約，它不會知道自己已收到付款。相反地，我們允許 `SwapRouter` 合約花費特定金額，然後由 `SwapRouter` 來執行。這是透過由 `SwapRouter` 呼叫的函式來完成的，因此它會知道是否成功。

7. 驗證你擁有足夠的兩種代幣。

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

現在我們有了 WETH 和 USDC，我們可以實際執行代理了。

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
賣出，我預期價格將下跌 118.75 USD
授權交易已發送：74e367ddbb407c1aaf567d87aa5863049991b1d2aa092b6b85195d925e2bd41f
授權交易已打包。
賣出交易已發送：fad1bcf938585c9e90364b26ac7a80eea9efd34c37e5db81e58d7655bcae28bf
賣出交易已打包。
交易後帳戶餘額：
USDC 餘額：929143.797116
WETH 餘額：499
```

要實際使用它，你需要進行一些小修改。

- 在第 14 行，將 `MAINNET_URL` 變更為真實的存取點，例如 `https://eth.drpc.org`
- 在第 28 行，將 `PRIVATE_KEY` 變更為你自己的私鑰
- 除非你非常富有，可以每天為一個未經證實的代理買入或賣出 1 ETH，否則你可能需要修改第 29 行以減少 `WETH_TRADE_AMOUNT`

#### 程式碼解釋 {#trading-code}

這是新的程式碼。

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

我們在步驟 4 中使用的相同變數。

```python
WETH_TRADE_AMOUNT=1
```

交易金額。

```python
ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... },
    { "name": "balanceOf", ...},
    { "name": "approve", ...}
]
```

為了實際進行交易，我們需要 `approve` 函式。我們還想顯示交易前後的餘額，因此我們也需要 `balanceOf`。

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

在 `SwapRouter` ABI 中，我們只需要 `exactInput`。有一個相關的函式 `exactOutput`，我們可以用它來精確買入 1 WETH，但為了簡單起見，我們在兩種情況下都只使用 `exactInput`。

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

交易參數。我們在這裡需要一個函式，因為[隨機數 (nonce)](https://en.wikipedia.org/wiki/Cryptographic_nonce)每次都必須改變。

```python
def approve_token(contract: Contract, amount: int):
```

為 `SwapRouter` 授權代幣額度。

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

這是我們在 Web3 中發送交易的方式。首先，我們使用[`Contract` 物件](https://web3py.readthedocs.io/en/stable/web3.contract.html)來建立交易。然後，我們使用 [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) 並透過 `PRIVATE_KEY` 來簽署交易。最後，我們使用 [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) 來發送交易。

```python
    print(f"Approve transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Approve transaction mined.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) 會等待直到交易被打包。如果需要，它會傳回交易收據。

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

與 `SELL_PARAMS` 相反，買入參數可能會改變。輸入金額是 1 WETH 的成本，可從 `quote` 中取得。

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

`buy()` 和 `sell()` 函式幾乎完全相同。首先我們為 `SwapRouter` 授權足夠的額度，然後我們使用正確的路徑和金額來呼叫它。

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

報告使用者的兩種貨幣餘額。

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

此代理目前只會執行一次。不過，你可以將其變更為持續執行，方法是透過 [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) 執行它，或者將第 368-400 行包裝在迴圈中，並使用 [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) 等待直到下一個週期的時間到來。

## 可能的改進 {#improvements}

這不是完整的正式生產版本；它僅僅是一個用來教授基礎知識的範例。以下是一些改進的想法。

### 更聰明的交易 {#smart-trading}

代理在決定要做什麼時，忽略了兩個重要的事實。

- _預期變動的幅度_。如果預期價格下跌，代理會賣出固定數量的 `WETH`，而不管下跌的幅度有多大。
  可以說，忽略微小的變動，並根據我們預期價格下跌的幅度來進行賣出會更好。
- _目前的投資組合_。如果你的投資組合中有 10% 是 WETH，而且你認為價格會上漲，那麼買入更多可能是合理的。但如果你的投資組合中有 90% 是 WETH，你的曝險可能已經足夠，就沒有必要買入更多。如果你預期價格會下跌，反之亦然。

### 如果你想對你的交易策略保密怎麼辦？ {#secret}

AI 供應商可以看到你發送給他們 LLM 的查詢，這可能會暴露你用代理開發的天才交易系統。太多人使用的交易系統是毫無價值的，因為當你想買入時，太多人也想買入（價格就會上漲），而當你想賣出時，太多人也想賣出（價格就會下跌）。

你可以在本地端執行 LLM，例如使用 [LM-Studio](https://lmstudio.ai/)，以避免這個問題。

### 從 AI 機器人到 AI 代理 {#bot-to-agent}

你有充分的理由認為這是[一個 AI 機器人，而不是 AI 代理](/ai-agents/#ai-agents-vs-ai-bots)。它實作了一個相對簡單的策略，依賴於預先定義的資訊。我們可以啟用自我改進功能，例如，提供一個尤尼斯瓦普 v3 資金池列表及其最新價值，並詢問哪種組合具有最佳的預測價值。

### 滑價保護 {#slippage-protection}

目前沒有[滑價保護](https://uniswapv3book.com/milestone_3/slippage-protection.html)。如果目前的報價是 2000 美元，而預期價格是 2100 美元，代理就會買入。然而，如果在代理買入之前成本上升到 2200 美元，那麼再買入就沒有意義了。

要實作滑價保護，請在 [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325) 的第 325 行和第 334 行中指定一個 `amountOutMinimum` 值。

## 結論 {#conclusion}

希望現在你已經了解足夠的知識，可以開始使用 AI 代理了。這不是對該主題的全面概述；有整本書都在專門探討這個主題，但這足以讓你入門。祝你好運！

[點此查看更多我的作品](https://cryptodocguy.pro/)。