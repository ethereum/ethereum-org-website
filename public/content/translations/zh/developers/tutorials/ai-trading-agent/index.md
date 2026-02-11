---
title: 在以太坊上创建你自己的 AI 交易代理
description: 在本教程中，您将学习如何创建一个简单的 AI 交易代理。 该代理从区块链读取信息，根据该信息向大语言模型 (LLM) 请求建议，执行 LLM 推荐的交易，然后等待并重复。
author: Ori Pomerantz
tags: [ "AI", "交易", "代理", "python" ]
skill: intermediate
published: 2026-02-13
lang: zh
sidebarDepth: 3
---

在本教程中，您将学习如何构建一个简单的 AI 交易代理。 该代理的工作步骤如下：

1. 读取代币的当前和过去价格以及其他潜在的相关信息
2. 利用此信息和用于解释其相关性的背景信息来构建查询
3. 提交查询并接收预测价格
4. 根据建议进行交易
5. 等待并重复

此代理演示了如何读取信息，将其转换为可生成可用答案的查询，以及如何使用该答案。 所有这些都是 AI 代理所需的步骤。 此代理使用 Python 实现，因为它是人工智能领域最常用的语言。

## 为什么要这样做？ {#why-do-this}

自动化交易代理允许开发者选择并执行交易策略。 [AI 代理](/ai-agents) 允许采用更复杂、更动态的交易策略，可能会使用开发者甚至没有考虑过使用的信息和算法。

## 工具 {#tools}

本教程使用 [Python](https://www.python.org/)、[Web3 程序库](https://web3py.readthedocs.io/en/stable/) 和 [Uniswap v3](https://github.com/Uniswap/v3-periphery) 进行报价和交易。

### 为什么使用 Python？ {#python}

AI 领域使用最广泛的语言是 [Python](https://www.python.org/)，所以我们在这里使用它。 如果您不了解 Python，也不用担心。 这种语言非常清晰易懂，我会准确地解释它的作用。

[Web3 程序库](https://web3py.readthedocs.io/en/stable/) 是最常见的 Python 以太坊应用程序接口。 它非常易于使用。

### 在区块链上交易 {#trading-on-blockchain}

有[许多去中心化交易所 (DEX)](/apps/categories/defi/) 可以让您在以太坊上交易代币。 然而，由于存在[套利](/developers/docs/smart-contracts/composability/#better-user-experience)，它们的汇率往往类似。

[Uniswap](https://app.uniswap.org/) 是一个广泛使用的去中心化交易所 (DEX)，我们可以用它来进行报价（查看代币的相对价值）和交易。

### OpenAI {#openai}

对于大语言模型，我选择从 [OpenAI](https://openai.com/) 开始。 要运行本教程中的应用，您需要付费访问其应用程序接口。 最低支付 5 美元就绰绰有余了。

## 逐步开发 {#step-by-step}

为简化开发，我们分阶段进行。 每个步骤都是 GitHub 中的一个分支。

### 入门 {#getting-started}

在 UNIX 或 Linux（包括 [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)）下，您可以按照以下步骤开始

1. 如果您还没有安装 [Python](https://www.python.org/downloads/)，请下载并安装它。

2. 克隆 GitHub 存储库。

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. 安装 [`uv`](https://docs.astral.sh/uv/getting-started/installation/)。 您系统上的命令可能有所差异。

   ```sh
   pipx install uv
   ```

4. 下载程序库。

   ```sh
   uv sync
   ```

5. 激活虚拟环境。

   ```sh
   source .venv/bin/activate
   ```

6. 为了验证 Python 和 Web3 是否正常工作，请运行 `python3` 并向其提供此程序。 您可以在 `>>>` 提示符处输入，无需创建文件。

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### 从区块链读取 {#read-blockchain}

下一步是从区块链中读取信息。 为此，您需要切换到 `02-read-quote` 分支，然后使用 `uv` 运行程序。

```sh
git checkout 02-read-quote
uv run agent.py
```

您应该会收到一个 `Quote` 对象列表，每个对象都包含一个时间戳、一个价格和一个资产（目前始终为 `WETH/USDC`）。

下面是逐行解释。

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

导入我们需要的程序库。 在使用时，下面将对它们进行解释。

```python
print = functools.partial(print, flush=True)
```

用一个总是立即刷新输出的版本替换 Python 的 `print`。 这在长时间运行的脚本中很有用，因为我们不想等待状态更新或调试输出。

```python
MAINNET_URL = "https://eth.drpc.org"
```

一个访问主网的 URL。 您可以从[节点即服务](/developers/docs/nodes-and-clients/nodes-as-a-service/)获取一个，或使用 [Chainlist](https://chainlist.org/chain/1) 中宣传的节点。

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

以太坊主网区块通常每十二秒产生一个，因此这些是我们预期在一段时间内产生的区块数量。 请注意，这不是一个精确的数字。 当[区块提议者](/developers/docs/consensus-mechanisms/pos/block-proposal/)宕机时，该区块将被跳过，下一个区块的时间将是 24 秒。 如果我们想获取某个时间戳的精确区块，我们会使用[二分查找](https://en.wikipedia.org/wiki/Binary_search)。 然而，这对我们的目的来说已经足够接近了。 预测未来并非一门精确的科学。

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

周期的大小。 我们每个周期审查一次报价，并尝试估算下一个周期结束时的价值。

```python
# 我们正在读取的池子的地址
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

报价取自地址为 [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract) 的 Uniswap 3 USDC/WETH 池子。 此地址已经是校验和格式，但最好使用 [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address) 以使代码可重用。

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

这些是我们需要联系的两个合约的 [ABI](https://docs.soliditylang.org/en/latest/abi-spec.html)。 为保持代码简洁，我们只包含需要调用的函数。

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

初始化 [`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) 程序库并连接到一个以太坊节点。

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

这是在 Python 中创建数据类的一种方法。 [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) 数据类型用于连接到合约。 注意 `(frozen=True)`。 在 Python 中，[布尔值](https://en.wikipedia.org/wiki/Boolean_data_type) 定义为大写的 `True` 或 `False`。 这个数据类是 `frozen` 的，意味着字段不能被修改。

注意缩进。 与 [C 派生语言](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages) 不同，Python 使用缩进来表示代码块。 Python 解释器知道下面的定义不属于这个数据类，因为它没有与数据类字段相同的缩进。

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

[`Decimal`](https://docs.python.org/3/library/decimal.html) 类型用于精确处理小数。

```python
    def get_price(self, block: int) -> Decimal:
```

这是在 Python 中定义函数的方式。 该定义被缩进以表明它仍然是 `PoolInfo` 的一部分。

在作为数据类一部分的函数中，第一个参数总是 `self`，即调用此函数的数据类实例。 这里有另一个参数，即区块号。

```python
        assert block <= w3.eth.block_number, "区块在未来"
```

如果我们能预知未来，我们就不需要用 AI 来进行交易了。

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

从 Web3 调用 EVM 上的函数的语法是：`<contract object>.functions.<function name>().call(<parameters>)`。 参数可以是 EVM 函数的参数（如果有的话；这里没有），也可以是用于修改区块链行为的[命名参数](https://en.wikipedia.org/wiki/Named_parameter)。 这里我们使用一个参数 `block_identifier` 来指定我们希望运行的[区块号](/developers/docs/apis/json-rpc/#default-block)。

结果是[这个结构体，以数组形式](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72)。 第一个值是两个代币之间汇率的函数。

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

为减少链上计算，Uniswap v3 不存储实际的兑换系数，而是存储其平方根。 由于 EVM 不支持浮点数学或分数，因此响应不是实际值，而是 <math><msqrt><mi>price</mi></msqrt><mo>⋅</mo><msup><mn>2</mn><mn>96</mn></msup></math>

```python
         # (每个 token0 对应的 token1 数量)
        return 1/(raw_price * self.decimal_factor)
```

我们得到的原始价格是每个 `token1` 可以兑换的 `token0` 的数量。 在我们的池子中，`token0` 是 USDC（与美元等值的稳定币），`token1` 是 [WETH](https://opensea.io/learn/blockchain/what-is-weth)。 我们真正想要的价值是每 WETH 对应的美元数量，而不是其倒数。

小数位数因数是两个代币的[小数位数因数](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals)之间的比率。

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

这个数据类代表一个报价：特定资产在特定时间点的价格。 此时，`asset` 字段是无关紧要的，因为我们使用单个池子，因此只有一个资产。 但是，我们稍后会添加更多资产。

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

该函数接受一个地址，并返回该地址上代币合约的信息。 要创建一个新的 [Web3 `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html)，我们需要向 `w3.eth.contract` 提供地址和 ABI。

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

该函数返回我们需要的关于[特定池子](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol)的所有信息。 `f"<string>"` 语法是[格式化字符串](https://docs.python.org/3/reference/lexical_analysis.html#f-strings)。

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

获取一个 `Quote` 对象。 `block_number` 的默认值为 `None`（无值）。

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

如果未指定区块号，则使用 `w3.eth.block_number`，即最新的区块号。 这是 [`if` 语句](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement)的语法。

看起来似乎将默认值设置为 `w3.eth.block_number` 会更好，但这样做效果不佳，因为这会是函数定义时的区块号。 在一个长期运行的代理中，这会是一个问题。

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

使用 [`datetime` 程序库](https://docs.python.org/3/library/datetime.html)将其格式化为人类和大型语言模型 (LLM) 可读的格式。 使用 [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize) 将值四舍五入到两位小数。

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

在 Python 中，您可以使用 `list[<type>]` 定义一个只能包含特定类型的[列表](https://docs.python.org/3/library/stdtypes.html#typesseq-list)。

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

在 Python 中，[`for` 循环](https://docs.python.org/3/tutorial/controlflow.html#for-statements)通常遍历一个列表。 用于查找报价的区块号列表来自 [`range`](https://docs.python.org/3/library/stdtypes.html#range)。

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

对于每个区块号，获取一个 `Quote` 对象并将其附加到 `quotes` 列表中。 然后返回该列表。

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

这是脚本的主代码。 读取池子信息，获取十二个报价，并使用 [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint) 打印它们。

### 创建提示 {#prompt}

接下来，我们需要将此报价列表转换为对大语言模型 (LLM) 的提示，并获取预期的未来价值。

```sh
git checkout 03-create-prompt
uv run agent.py
```

现在的输出将是给大语言模型 (LLM) 的提示，类似如下：

```
给定以下报价：
资产：WETH/USDC
        2026-01-20T16:34 3016.21
        .
        .
        .
        2026-02-01T17:49 2299.10

资产：WBTC/WETH
        2026-01-20T16:34 29.84
        .
        .
        .
        2026-02-01T17:50 33.46


您预计在 2026-02-02T17:56 时 WETH/USDC 的价值会是多少？

请以一个四舍五入到两位小数的数字作为您的答案，
不要包含任何其他文本。
```

请注意，这里有两种资产的报价：`WETH/USDC` 和 `WBTC/WETH`。 添加另一种资产的报价可能会提高预测准确性。

#### 提示是什么样的 {#prompt-explanation}

此提示包含三个部分，这在 LLM 提示中非常常见。

1. 信息。 LLM 从训练中获得了大量信息，但通常没有最新的信息。 这就是我们在这里需要检索最新报价的原因。 向提示中添加信息称为[检索增强生成 (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation)。

2. 实际问题。 这是我们想知道的。

3. 输出格式说明。 通常情况下，LLM 会给我们一个估算值，并解释它是如何得出的。 这对人类来说更好，但计算机程序只需要最终结果。

#### 代码说明 {#prompt-code}

这是新的代码。

```python
from datetime import datetime, timezone, timedelta
```

我们需要向 LLM 提供我们想要估算的时间。 要获得未来“n 分钟/小时/天”的时间，我们使用 [`timedelta` 类](https://docs.python.org/3/library/datetime.html#datetime.timedelta)。

```python
# 我们正在读取的池子的地址
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

我们需要读取两个池子。

```python
@dataclass(frozen=True)
class PoolInfo:
    .
    .
    .
    reverse: bool = False

    def get_price(self, block: int) -> Decimal:
        assert block <= w3.eth.block_number, "区块在未来"
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (token1 per token0)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

在 WETH/USDC 池子中，我们想知道需要多少 `token0` (USDC) 来购买一个 `token1` (WETH)。 在 WETH/WBTC 池子中，我们想知道需要多少 `token1` (WETH) 来购买一个 `token0`（WBTC，即包装比特币）。 我们需要跟踪池子的比率是否需要反转。

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

要了解是否需要反转池子，我们将其作为 `read_pool` 的输入。 此外，资产符号需要正确设置。

语法 `<a> if <b> else <c>` 是 Python 中[三元条件运算符](https://en.wikipedia.org/wiki/Ternary_conditional_operator) 的等价形式，在 C 派生语言中为 `<b> ?` <a> : <c>\`。

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

该函数构建一个字符串来格式化 `Quote` 对象列表，假设它们都适用于同一资产。

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

在 Python 中，[多行字符串字面量](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp)写为 `"""` .... `"""`。

```python
给定以下报价：
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

在这里，我们使用 [MapReduce](https://en.wikipedia.org/wiki/MapReduce) 模式，通过 `format_quotes` 为每个报价列表生成一个字符串，然后将它们归约为一个字符串以在提示中使用。

```python
您预计 {asset} 在 {expected_time} 的价值会是多少？

请以一个四舍五入到两位小数的数字作为您的答案，
不要包含任何其他文本。
    """
```

提示的其余部分与预期一致。

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

查看两个池子并从两者获取报价。

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

确定我们想要估算的未来时间点，并创建提示。

### 与 LLM 交互 {#interface-llm}

接下来，我们提示一个实际的大语言模型 (LLM)，并接收预期的未来价值。 我用 OpenAI 编写了这个程序，所以如果你想使用不同的提供商，你需要进行调整。

1. 获取一个 [OpenAI 帐户](https://auth.openai.com/create-account)

2. [为帐户注资](https://platform.openai.com/settings/organization/billing/overview)——在撰写本文时，最低金额为 5 美元

3. [创建应用程序接口密钥](https://platform.openai.com/settings/organization/api-keys)

4. 在命令行中，导出应用程序接口密钥，以便您的程序可以使用它

   ```sh
   export OPENAI_API_KEY=sk-<密钥的其余部分写在这里>
   ```

5. 检出并运行代理

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

这是新的代码。

```python
from openai import OpenAI

open_ai = OpenAI()  # 客户端读取 OPENAI_API_KEY 环境变量
```

导入并实例化 OpenAI 应用程序接口。

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

调用 OpenAI 应用程序接口 (`open_ai.chat.completions.create`) 来创建响应。

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

输出价格并提供买入或卖出建议。

#### 测试预测 {#testing-the-predictions}

既然我们可以生成预测，我们也可以使用历史数据来评估我们是否产生了有用的预测。

```sh
uv run test-predictor.py
```

预期结果类似：

```
2026-01-05T19:50 的预测：预测 3138.93 美元，实际 3218.92 美元，误差 79.99 美元
2026-01-06T19:56 的预测：预测 3243.39 美元，实际 3221.08 美元，误差 22.31 美元
2026-01-07T20:02 的预测：预测 3223.24 美元，实际 3146.89 美元，误差 76.35 美元
2026-01-08T20:11 的预测：预测 3150.47 美元，实际 3092.04 美元，误差 58.43 美元
.
.
.
2026-01-31T22:33 的预测：预测 2637.73 美元，实际 2417.77 美元，误差 219.96 美元
2026-02-01T22:41 的预测：预测 2381.70 美元，实际 2318.84 美元，误差 62.86 美元
2026-02-02T22:49 的预测：预测 2234.91 美元，实际 2349.28 美元，误差 114.37 美元
29 次预测的平均预测误差：83.87103448275862068965517241 美元
每个建议的平均变化：4.787931034482758620689655172 美元
变化的 标准方差：104.42 美元
盈利天数：51.72%
亏损天数：48.28%
```

测试器的大部分内容与代理相同，但以下是新的或修改过的部分。

```python
CYCLES_FOR_TEST = 40 # 对于回测，我们测试多少个周期

# 获取大量报价
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

我们回顾 `CYCLES_FOR_TEST`（此处指定为 40）天前的数据。

```python
# 创建预测并与真实历史进行比较

total_error = Decimal(0)
changes = []
```

我们感兴趣的错误有两种类型。 第一种，`total_error`，就是预测器所犯错误的总和。

要理解第二种，`changes`，我们需要记住代理的目的。 它不是为了预测 WETH/USDC 比率（ETH 价格）。 而是为了发出卖出和买入的建议。 如果当前价格是 2000 美元，而它预测明天是 2010 美元，如果实际结果是 2020 美元并且我们赚了额外的钱，我们不会介意。 但如果它预测为 2010 美元，并基于该建议购买了 ETH，而价格下跌到 1990 美元，我们_确实_会介意。

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

我们只能看那些历史记录完整（用于预测的值和与之比较的真实世界值都可用）的情况。 这意味着最新的案例必须是 `CYCLES_BACK` 之前开始的那个。

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

使用[切片](https://www.w3schools.com/python/ref_func_slice.asp)来获取与代理使用的样本数量相同的样本。 这里到下一个片段之间的代码与我们在代理中使用的获取预测的代码相同。

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

获取预测价格、真实价格以及预测时的价格。 我们需要预测时的价格来决定建议是买入还是卖出。

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Prediction for {prediction_time}: predicted {predicted_price} USD, real {real_price} USD, error {error} USD")
```

计算误差，并将其加到总误差中。

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

对于 `changes`，我们想要的是买入或卖出一个 ETH 的货币影响。 因此，首先我们需要确定建议，然后评估实际价格的变化，以及建议是盈利（正向变化）还是亏损（负向变化）。

```python
print (f"Mean prediction error over {len(wethusdc_quotes)-CYCLES_BACK} predictions: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Mean change per recommendation: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Standard variance of changes: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

报告结果。

```python
print (f"Profitable days: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Losing days: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

使用 [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) 来计算盈利天数和亏损天数。 结果是一个过滤器对象，我们需要将其转换为列表以获取其长度。

### 提交交易 {#submit-txn}

现在我们需要实际提交交易。 然而，在系统被证明之前，我不想在这个阶段花真钱。 相反，我们将在本地创建一个主网分叉，并在此网络上进行“交易”。

以下是创建本地分叉并启用交易的步骤。

1. 安装 [Foundry](https://getfoundry.sh/introduction/installation)

2. 启动 [`anvil`](https://getfoundry.sh/anvil/overview)

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` 正在 Foundry 的默认 URL http://localhost:8545 上监听，所以我们不需要为用于操作区块链的 [`cast` 命令](https://getfoundry.sh/cast/overview)指定 URL。

3. 在 `anvil` 中运行时，有十个拥有 ETH 的测试帐户——为第一个帐户设置环境变量

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. 这些是我们需要使用的合约。 [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) 是我们用来实际交易的 Uniswap v3 合约。 我们可以直接通过池子进行交易，但这要容易得多。

   底部的两个变量是在 WETH 和 USDC 之间进行交换所需的 Uniswap v3 路径。

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. 每个测试帐户都有 10,000 ETH。 使用 WETH 合约包装 1000 ETH 以获得 1000 WETH 用于交易。

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. 使用 `SwapRouter` 交易 500 WETH 以换取 USDC。

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   `approve` 调用创建了一个许可，允许 `SwapRouter` 花费我们的一些代币。 合约无法监听事件，因此如果我们直接将代币转移到 `SwapRouter` 合约，它将不知道已收到付款。 相反，我们允许 `SwapRouter` 合约花费一定金额，然后由 `SwapRouter` 执行。 这是通过 `SwapRouter` 调用的一个函数完成的，因此它知道是否成功。

7. 验证您是否拥有足够的两种代币。

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

现在我们有了 WETH 和 USDC，可以实际运行代理了。

```sh
git checkout 05-trade
uv run agent.py
```

输出将类似如下：

```
(ai-trading-agent) qbzzt@Ori-Cloudnomics:~/260215-ai-agent$ uv run agent.py
当前价格：1843.16
2026-02-06T23:07，预期价格：1724.41 美元
交易前帐户余额：
USDC 余额：927301.578272
WETH 余额：500
卖出，我预计价格将下跌 118.75 美元
批准交易已发送：74e367ddbb407c1aaf567d87aa5863049991b1d2aa092b6b85195d925e2bd41f
批准交易已挖出。
卖出交易已发送：fad1bcf938585c9e90364b26ac7a80eea9efd34c37e5db81e58d7655bcae28bf
卖出交易已挖出。
交易后帐户余额：
USDC 余额：929143.797116
WETH 余额：499
```

要实际使用它，您需要进行一些小的更改。

- 在第 14 行，将 `MAINNET_URL` 更改为真实的访问点，例如 `https://eth.drpc.org`
- 在第 28 行，将 `PRIVATE_KEY` 更改为您自己的私钥
- 除非您非常富有，并且可以为一个未经证实的代理每天买卖 1 个 ETH，否则您可能希望更改第 29 行以减少 `WETH_TRADE_AMOUNT`

#### 代码说明 {#trading-code}

这是新的代码。

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

我们在第 4 步中使用的相同变量。

```python
WETH_TRADE_AMOUNT=1
```

交易金额。

```python
ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... },
    { "name": "balanceOf", ...},
    { "name": "approve", ...}
]
```

要实际交易，我们需要 `approve` 函数。 我们还希望显示交易前后的余额，因此我们还需要 `balanceOf`。

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

在 `SwapRouter` ABI 中，我们只需要 `exactInput`。 还有一个相关函数 `exactOutput`，我们可以用它来精确购买一个 WETH，但为简单起见，我们在这两种情况下都只使用 `exactInput`。

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

Web3 为 [`account`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) 和 `SwapRouter` 合约的定义。

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

交易参数。 我们在这里需要一个函数，因为[随机数](https://en.wikipedia.org/wiki/Cryptographic_nonce)每次都必须改变。

```python
def approve_token(contract: Contract, amount: int):
```

批准 `SwapRouter` 的代币许可。

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

这是我们在 Web3 中发送交易的方式。 首先我们使用 [`Contract` 对象](https://web3py.readthedocs.io/en/stable/web3.contract.html) 来构建交易。 然后我们使用 [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) 来使用 `PRIVATE_KEY` 签署交易。 最后，我们使用 [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) 来发送交易。

```python
    print(f"Approve transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Approve transaction mined.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) 会等到交易被挖出。 如果需要，它会返回收据。

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

这些是卖出 WETH 时的参数。

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

与 `SELL_PARAMS` 不同，买入参数可能会改变。 输入金额是 1 WETH 的成本，可在 `quote` 中获取。

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

`buy()` 和 `sell()` 函数几乎相同。 我们首先为 `SwapRouter` 批准足够的许可，然后用正确的路径和金额调用它。

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

报告两种货币的用户余额。

```python
print("交易前帐户余额：")
balances()

if (expected_price > current_price):
    print(f"买入，我预计价格将上涨 {expected_price - current_price} 美元")
    buy(wethusdc_quotes[-1])
else:
    print(f"卖出，我预计价格将下跌 {current_price - expected_price} 美元")
    sell()

print("交易后帐户余额：")
balances()
```

该代理目前只能工作一次。 然而，您可以通过从 [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) 运行它，或者将 368-400 行包装在一个循环中并使用 [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) 等待下一个周期的时间，来使其连续工作。

## 可能的改进 {#improvements}

这不是一个完整的生产版本；它仅仅是一个教授基础知识的例子。 以下是一些改进建议。

### 更智能的交易 {#smart-trading}

代理在决定做什么时忽略了两个重要的事实。

- _预期变化的幅度_。 如果价格预期下跌，代理会卖出固定数量的 `WETH`，而不管下跌的幅度如何。
  可以说，更好的做法是忽略微小的变化，并根据我们预期的价格下跌幅度来决定卖出。
- _当前投资组合_。 如果你的投资组合中有 10% 是 WETH，并且你认为价格会上涨，那么买入更多可能是明智的。 但如果你的投资组合中有 90% 是 WETH，你可能已经有足够的敞口，没有必要再买更多。 如果你预期价格会下跌，情况则相反。

### 如果你想对你的交易策略保密怎么办？ {#secret}

AI 供应商可以看到你发送给他们的大语言模型 (LLM) 的查询，这可能会暴露你用代理开发的绝妙交易系统。 一个太多人使用的交易系统是毫无价值的，因为太多人会在你想买的时候尝试买入（价格上涨），在你像卖的时候尝试卖出（价格下跌）。

您可以在本地运行一个大语言模型 (LLM)，例如使用 [LM-Studio](https://lmstudio.ai/)，以避免此问题。

### 从 AI 机器人到 AI 代理 {#bot-to-agent}

你可以很有力地论证这[是一个 AI 机器人，而不是一个 AI 代理](/ai-agents/#ai-agents-vs-ai-bots)。 它实现了一个依赖于预定义信息的相对简单的策略。 我们可以启用自我改进，例如，通过提供 Uniswap v3 池子及其最新值的列表，并询问哪种组合具有最佳的预测价值。

### 滑点保护 {#slippage-protection}

目前没有[滑点保护](https://uniswapv3book.com/milestone_3/slippage-protection.html)。 如果当前报价是 2000 美元，预期价格是 2100 美元，代理将会买入。 然而，如果在代理买入之前，成本上升到 2200 美元，那么再买入就没有意义了。

要实现滑点保护，请在 [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325) 的第 325 行和 334 行中指定一个 `amountOutMinimum` 值。

## 结论 {#conclusion}

希望现在您已经足够了解，可以开始使用 AI 代理了。 这不是对该主题的全面概述；有整本书专门讨论这个问题，但这足以让您入门。 祝你好运！

[点击此处查看我的更多作品](https://cryptodocguy.pro/)。
