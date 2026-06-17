---
title: 在以太坊上构建你自己的 AI 交易代理
description: 在本教程中，你将学习如何制作一个简单的 AI 交易代理。该代理从区块链读取信息，根据该信息向大语言模型 (LLM) 寻求建议，执行 LLM 推荐的交易，然后等待并重复该过程。
author: 奥里·波梅兰茨
tags:
  - AI
  - 交易
  - 代理
  - python
skill: intermediate
breadcrumb: AI 交易代理
published: 2026-02-13
lang: zh
sidebarDepth: 3
---

在本教程中，你将学习如何构建一个简单的 AI 交易代理。该代理按以下步骤工作：

1. 读取代币的当前和历史价格，以及其他可能相关的信息
2. 使用这些信息以及解释其相关性的背景信息构建查询
3. 提交查询并接收预测价格
4. 根据建议进行交易
5. 等待并重复

该代理演示了如何读取信息，将其转换为能产生可用答案的查询，并使用该答案。所有这些都是 AI 代理所需的步骤。该代理使用 Python 实现，因为它是 AI 中最常用的语言。

## 为什么要这样做？ {#why-do-this}

自动化交易代理允许开发者选择并执行交易策略。[AI 代理](/ai-agents)允许使用更复杂和动态的交易策略，甚至可能使用开发者从未考虑过的信息和算法。

## 工具 {#tools}

本教程使用 [Python](https://www.python.org/)、[Web3 库](https://web3py.readthedocs.io/en/stable/)以及 [尤尼斯瓦普 (Uniswap) v3](https://github.com/Uniswap/v3-periphery) 进行报价和交易。

### 为什么选择 Python？ {#python}

AI 领域最广泛使用的语言是 [Python](https://www.python.org/)，因此我们在这里使用它。如果你不懂 Python 也不用担心。这门语言非常清晰，我会准确解释它的作用。

[Web3 库](https://web3py.readthedocs.io/en/stable/)是最常用的 Python 以太坊 API。它非常容易使用。

### 在区块链上交易 {#trading-on-blockchain}

有[许多去中心化交易所 (DEX)](/apps/categories/defi/) 允许你在以太坊上交易代币。然而，由于[套利](/developers/docs/smart-contracts/composability/#better-user-experience)，它们的汇率往往相似。

[尤尼斯瓦普](https://app.uniswap.org/)是一个广泛使用的 DEX，我们可以用它来进行报价（查看代币相对价值）和交易。

### OpenAI {#openai}

对于大语言模型，我选择从 [OpenAI](https://openai.com/) 开始。要运行本教程中的应用程序，你需要支付 API 访问费用。最低 5 美元的付款已绰绰有余。

## 逐步开发 {#step-by-step}

为了简化开发，我们分阶段进行。每个步骤对应 GitHub 中的一个分支。

### 快速入门 {#getting-started}

以下是在 UNIX 或 Linux（包括 [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)）下入门的步骤

1. 如果你还没有安装，请下载并安装 [Python](https://www.python.org/downloads/)。

2. 克隆 GitHub 仓库。

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. 安装 [`uv`](https://docs.astral.sh/uv/getting-started/installation/)。你系统上的命令可能有所不同。

   ```sh
   pipx install uv
   ```

4. 下载库。

   ```sh
   uv sync
   ```

5. 激活虚拟环境。

   ```sh
   source .venv/bin/activate
   ```

6. 要验证 Python 和 Web3 是否正常工作，请运行 `python3` 并向其提供此程序。你可以在 `>>>` 提示符下输入它；无需创建文件。

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### 从区块链读取 {#read-blockchain}

下一步是从区块链读取数据。为此，你需要切换到 `02-read-quote` 分支，然后使用 `uv` 运行程序。

```sh
git checkout 02-read-quote
uv run agent.py
```

你应该会收到一个 `Quote` 对象列表，每个对象都包含时间戳、价格和资产（目前始终为 `WETH/USDC`）。

以下是逐行解释。

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

导入我们需要的库。它们在下面使用时会进行解释。

```python
print = functools.partial(print, flush=True)
```

将 Python 的 `print` 替换为始终立即刷新输出的版本。这在长时间运行的脚本中很有用，因为我们不想等待状态更新或调试输出。

```python
MAINNET_URL = "https://eth.drpc.org"
```

连接到主网的 URL。你可以从[节点即服务 (Node as a service)](/developers/docs/nodes-and-clients/nodes-as-a-service/) 获取一个，或者使用 [Chainlist](https://chainlist.org/chain/1) 中宣传的 URL。

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

以太坊主网区块通常每 12 秒产生一个，因此这些是我们预期在一段时间内产生的区块数量。请注意，这不是一个精确的数字。当[区块提议者](/developers/docs/consensus-mechanisms/pos/block-proposal/)宕机时，该区块会被跳过，下一个区块的时间将是 24 秒。如果我们想获取某个时间戳的精确区块，我们会使用[二分查找](https://en.wikipedia.org/wiki/Binary_search)。然而，对于我们的目的来说，这已经足够接近了。预测未来并不是一门精确的科学。

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

周期的长度。我们每个周期审查一次报价，并尝试估计下一个周期结束时的价值。

```python
# 我们正在读取的池的地址
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

报价取自地址为 [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract) 的尤尼斯瓦普 3 USDC/WETH 资金池。该地址已经是校验和形式，但最好使用 [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address) 以使代码可重用。

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

这些是我们需要联系的两个合约的 [ABI](https://docs.soliditylang.org/en/latest/abi-spec.html)。为了保持代码简洁，我们只包含我们需要调用的函数。

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

初始化 [`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) 库并连接到以太坊节点。

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

这是在 Python 中创建数据类的一种方法。[`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) 数据类型用于连接到合约。注意 `(frozen=True)`。在 Python 中，[布尔值](https://en.wikipedia.org/wiki/Boolean_data_type)定义为 `True` 或 `False`，首字母大写。此数据类是 `frozen`（冻结的），这意味着字段不能被修改。

注意缩进。与 [C 派生语言](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages)相反，Python 使用缩进来表示代码块。Python 解释器知道以下定义不是此数据类的一部分，因为它没有与数据类字段相同的缩进。

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

这是在 Python 中定义函数的方法。定义被缩进以表明它仍然是 `PoolInfo` 的一部分。

在作为数据类一部分的函数中，第一个参数始终是 `self`，即在此处调用的数据类实例。这里还有另一个参数，即区块号。

```python
        assert block <= w3.eth.block_number, "Block is in the future"
```

如果我们能预知未来，我们就不需要 AI 来进行交易了。

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

从 Web3 调用 EVM 上函数的语法是：`<contract object>.functions.<function name>().call(<parameters>)`。参数可以是 EVM 函数的参数（如果有；这里没有），或者是用于修改区块链行为的[命名参数](https://en.wikipedia.org/wiki/Named_parameter)。这里我们使用了一个参数 `block_identifier`，来指定我们希望在其中运行的[区块号](/developers/docs/apis/json-rpc/#default-block)。

结果是[这个结构体，以数组形式呈现](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72)。第一个值是两个代币之间汇率的函数。

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

为了减少链上计算，尤尼斯瓦普 v3 不存储实际的兑换因子，而是存储其平方根。因为 EVM 不支持浮点数学或分数，所以响应的不是实际值，而是 <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5;</mo><msup><mn>2</mn><mn>96</mn></msup></math>

```python
         # (每个代币0的代币1数量)
        return 1/(raw_price * self.decimal_factor)
```

我们获得的原始价格是每个 `token1` 可以换取的 `token0` 数量。在我们的资金池中，`token0` 是 USDC（价值与美元相同的稳定币），而 `token1` 是 [WETH](https://opensea.io/learn/blockchain/what-is-weth)。我们真正想要的值是每个 WETH 对应的美元数量，而不是反过来。

小数因子是两个代币的[小数因子](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals)之间的比率。

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

此数据类表示一个报价：特定资产在给定时间点的价格。在这一点上，`asset` 字段是不相关的，因为我们使用单个资金池，因此只有单一资产。但是，我们稍后会添加更多资产。

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

此函数接受一个地址并返回有关该地址处代币合约的信息。要创建一个新的 [Web3 `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html)，我们将地址和 ABI 提供给 `w3.eth.contract`。

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

此函数返回我们需要了解的关于[特定资金池](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol)的所有信息。语法 `f"<string>"` 是一个[格式化字符串](https://docs.python.org/3/reference/lexical_analysis.html#f-strings)。

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

获取一个 `Quote` 对象。`block_number` 的默认值为 `None`（无值）。

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

如果未指定区块号，则使用 `w3.eth.block_number`，即最新区块号。这是 [`if` 语句](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement)的语法。

看起来似乎直接将默认值设置为 `w3.eth.block_number` 会更好，但这效果不佳，因为那将是定义函数时的区块号。在长时间运行的代理中，这将是一个问题。

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

使用 [`datetime` 库](https://docs.python.org/3/library/datetime.html)将其格式化为人类和大语言模型 (LLM) 可读的格式。使用 [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize) 将值四舍五入到小数点后两位。

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

在 Python 中，你可以使用 `list[<type>]` 定义一个只能包含特定类型的[列表](https://docs.python.org/3/library/stdtypes.html#typesseq-list)。

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

在 Python 中，[`for` 循环](https://docs.python.org/3/tutorial/controlflow.html#for-statements)通常遍历一个列表。用于查找报价的区块号列表来自 [`range`](https://docs.python.org/3/library/stdtypes.html#range)。

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

对于每个区块号，获取一个 `Quote` 对象并将其附加到 `quotes` 列表中。然后返回该列表。

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

这是脚本的主代码。读取资金池信息，获取十二个报价，并[`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint)它们。

### 创建提示词 {#prompt}

接下来，我们需要将此报价列表转换为 LLM 的提示词，并获得预期的未来价值。

```sh
git checkout 03-create-prompt
uv run agent.py
```

现在的输出将是给 LLM 的提示词，类似于：

```
给定这些报价：
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


你预计 WETH/USDC 在 2026-02-02T17:56 时的价值是多少？

请将你的答案作为一个四舍五入到小数点后两位的单一数字提供，
不要包含任何其他文本。
```

请注意，这里有两个资产的报价，`WETH/USDC` 和 `WBTC/WETH`。添加来自另一种资产的报价可能会提高预测准确性。

#### 提示词是什么样的 {#prompt-explanation}

此提示词包含三个部分，这在 LLM 提示词中非常常见。

1. 信息。LLM 从其训练中获得了大量信息，但它们通常没有最新的信息。这就是我们需要在此处检索最新报价的原因。向提示词添加信息称为[检索增强生成 (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation)。

2. 实际问题。这是我们想知道的。

3. 输出格式说明。通常，LLM 会给我们一个估计值，并解释它是如何得出该估计值的。这对人类来说更好，但计算机程序只需要最终结果。

#### 代码解释 {#prompt-code}

这是新代码。

```python
from datetime import datetime, timezone, timedelta
```

我们需要向 LLM 提供我们想要估计的时间。要获取未来“n 分钟/小时/天”的时间，我们使用 [`timedelta` 类](https://docs.python.org/3/library/datetime.html#datetime.timedelta)。

```python
# 我们正在读取的多个池的地址
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

我们需要读取两个资金池。

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
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (每个代币0的代币1数量)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

在 WETH/USDC 资金池中，我们想知道购买一个 `token1` (WETH) 需要多少 `token0` (USDC)。在 WETH/WBTC 资金池中，我们想知道购买一个 `token0` (WBTC，即封装比特币) 需要多少 `token1` (WETH)。我们需要跟踪资金池的比率是否需要反转。

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

要知道资金池是否需要反转，我们将其作为 `read_pool` 的输入。此外，资产符号需要正确设置。

语法 `<a> if <b> else <c>` 是 Python 中等同于[三元条件运算符](https://en.wikipedia.org/wiki/Ternary_conditional_operator)的语法，在 C 派生语言中它将是 `<b> ? <a> : <c>`。

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

此函数构建一个格式化 `Quote` 对象列表的字符串，假设它们都适用于同一资产。

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

在 Python 中，[多行字符串字面量](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp)写为 `"""` .... `"""`。

```python
Given these quotes:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

在这里，我们使用 [MapReduce](https://en.wikipedia.org/wiki/MapReduce) 模式通过 `format_quotes` 为每个报价列表生成一个字符串，然后将它们归约（reduce）为单个字符串以在提示词中使用。

```python
What would you expect the value for {asset} to be at time {expected_time}?

Provide your answer as a single number rounded to two decimal places,
without any other text.
    """
```

提示词的其余部分符合预期。

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

审查这两个资金池并从两者获取报价。

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

确定我们想要估计的未来时间点，并创建提示词。

### 与 LLM 交互 {#interface-llm}

接下来，我们向实际的 LLM 发送提示词并接收预期的未来价值。我使用 OpenAI 编写了这个程序，因此如果你想使用不同的提供商，你需要对其进行调整。

1. 获取一个 [OpenAI 账户](https://auth.openai.com/create-account)
2. [为账户充值](https://platform.openai.com/settings/organization/billing/overview)——在撰写本文时，最低金额为 5 美元
3. [创建 API 密钥](https://platform.openai.com/settings/organization/api-keys)
4. 在命令行中，导出 API 密钥以便你的程序可以使用它

   ```sh
   export OPENAI_API_KEY=sk-<the rest of the key goes here>
   ```

5. 检出并运行代理

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

这是新代码。

```python
from openai import OpenAI

open_ai = OpenAI()  # 客户端读取 OPENAI_API_KEY 环境变量
```

导入并实例化 OpenAI API。

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

调用 OpenAI API (`open_ai.chat.completions.create`) 以创建响应。

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

预期结果类似于：

```
对 2026-01-05T19:50 的预测：预测值 3138.93 USD，实际值 3218.92 USD，误差 79.99 USD
对 2026-01-06T19:56 的预测：预测值 3243.39 USD，实际值 3221.08 USD，误差 22.31 USD
对 2026-01-07T20:02 的预测：预测值 3223.24 USD，实际值 3146.89 USD，误差 76.35 USD
对 2026-01-08T20:11 的预测：预测值 3150.47 USD，实际值 3092.04 USD，误差 58.43 USD
.
.
.
对 2026-01-31T22:33 的预测：预测值 2637.73 USD，实际值 2417.77 USD，误差 219.96 USD
对 2026-02-01T22:41 的预测：预测值 2381.70 USD，实际值 2318.84 USD，误差 62.86 USD
对 2026-02-02T22:49 的预测：预测值 2234.91 USD，实际值 2349.28 USD，误差 114.37 USD
29 次预测的平均预测误差：83.87103448275862068965517241 USD
每次建议的平均变化：4.787931034482758620689655172 USD
变化的标准差：104.42 USD
盈利天数：51.72%
亏损天数：48.28%
```

测试器的大部分内容与代理相同，但以下是新增或修改的部分。

```python
CYCLES_FOR_TEST = 40 # 对于回测，我们测试的周期数

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
# 创建预测并与真实历史进行对比

total_error = Decimal(0)
changes = []
```

我们对两种类型的误差感兴趣。第一种 `total_error`，仅仅是预测器产生的误差总和。

要理解第二种 `changes`，我们需要记住代理的目的。它不是为了预测 WETH/USDC 比率（ETH 价格）。它是为了发布卖出和买入建议。如果当前价格是 2000 美元，它预测明天是 2010 美元，如果实际结果是 2020 美元并且我们赚了额外的钱，我们并不介意。但如果它预测 2010 美元，并根据该建议买入了 ETH，而价格跌至 1990 美元，我们_确实_会介意。

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

我们只能查看具有完整历史记录（用于预测的值以及用于比较的真实世界值）的案例。这意味着最新的案例必须是 `CYCLES_BACK` 前开始的案例。

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

使用[切片](https://www.w3schools.com/python/ref_func_slice.asp)获取与代理使用的数量相同的样本数。此处与下一段之间的代码与我们在代理中拥有的获取预测代码相同。

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

获取预测价格、实际价格以及预测时的价格。我们需要预测时的价格来确定建议是买入还是卖出。

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Prediction for {prediction_time}: predicted {predicted_price} USD, real {real_price} USD, error {error} USD")
```

计算误差，并将其添加到总数中。

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

对于 `changes`，我们想要买入或卖出一个 ETH 的货币影响。因此，首先，我们需要确定建议，然后评估实际价格如何变化，以及该建议是赚钱（正变化）还是亏钱（负变化）。

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

使用 [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) 计算盈利天数和亏损天数。结果是一个过滤器对象，我们需要将其转换为列表以获取长度。

### 提交交易 {#submit-txn}

现在我们需要实际提交交易。然而，在系统得到验证之前，我不想在此时花费真金白银。相反，我们将创建主网的本地分叉，并在该网络上进行“交易”。

以下是创建本地分叉并启用交易的步骤。

1. 安装 [Foundry](https://getfoundry.sh/introduction/installation)

2. 启动 [`anvil`](https://getfoundry.sh/anvil/overview)

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` 正在监听 Foundry 的默认 URL http://localhost:8545，因此我们不需要为用于操作区块链的 [`cast` 命令](https://getfoundry.sh/cast/overview)指定 URL。

3. 在 `anvil` 中运行时，有十个拥有 ETH 的测试账户——为第一个账户设置环境变量

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. 这些是我们需要使用的合约。[`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) 是我们用于实际交易的尤尼斯瓦普 v3 合约。我们可以直接通过资金池进行交易，但这要容易得多。

   底部的两个变量是在 WETH 和 USDC 之间进行兑换所需的尤尼斯瓦普 v3 路径。

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. 每个测试账户都有 10,000 ETH。使用 WETH 合约封装 1000 ETH，以获得 1000 WETH 用于交易。

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. 使用 `SwapRouter` 将 500 WETH 兑换为 USDC。

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   `approve` 调用创建了一个授权额度，允许 `SwapRouter` 花费我们的一些代币。合约无法监控事件，因此如果我们直接将代币转账到 `SwapRouter` 合约，它将不知道自己已收到付款。相反，我们允许 `SwapRouter` 合约花费一定数量，然后 `SwapRouter` 执行此操作。这是通过 `SwapRouter` 调用的函数完成的，因此它知道是否成功。

7. 验证你是否有足够的这两种代币。

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

既然我们有了 WETH 和 USDC，我们就可以实际运行代理了。

```sh
git checkout 05-trade
uv run agent.py
```

输出将类似于：

```
(ai-trading-agent) qbzzt@Ori-Cloudnomics:~/260215-ai-agent$ uv run agent.py
当前价格：1843.16
在 2026-02-06T23:07，预期价格：1724.41 USD
交易前账户余额：
USDC 余额：927301.578272
WETH 余额：500
卖出，我预计价格将下跌 118.75 USD
授权交易已发送：74e367ddbb407c1aaf567d87aa5863049991b1d2aa092b6b85195d925e2bd41f
授权交易已打包。
卖出交易已发送：fad1bcf938585c9e90364b26ac7a80eea9efd34c37e5db81e58d7655bcae28bf
卖出交易已打包。
交易后账户余额：
USDC 余额：929143.797116
WETH 余额：499
```

要实际使用它，你需要进行一些小的更改。

- 在第 14 行，将 `MAINNET_URL` 更改为真实的接入点，例如 `https://eth.drpc.org`
- 在第 28 行，将 `PRIVATE_KEY` 更改为你自己的私钥
- 除非你非常富有，可以每天为一个未经证实的代理买入或卖出 1 ETH，否则你可能需要更改第 29 行以减少 `WETH_TRADE_AMOUNT`

#### 代码解释 {#trading-code}

这是新代码。

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

我们在步骤 4 中使用的相同变量。

```python
WETH_TRADE_AMOUNT=1
```

要交易的金额。

```python
ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... },
    { "name": "balanceOf", ...},
    { "name": "approve", ...}
]
```

为了实际交易，我们需要 `approve` 函数。我们还想显示交易前后的余额，因此我们还需要 `balanceOf`。

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

在 `SwapRouter` ABI 中，我们只需要 `exactInput`。有一个相关的函数 `exactOutput`，我们可以用它来精确购买一个 WETH，但为了简单起见，我们在两种情况下都只使用 `exactInput`。

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

[`account`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) 和 `SwapRouter` 合约的 Web3 定义。

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

交易参数。我们在这里需要一个函数，因为[随机数](https://en.wikipedia.org/wiki/Cryptographic_nonce)每次都必须改变。

```python
def approve_token(contract: Contract, amount: int):
```

为 `SwapRouter` 授权代币授权额度。

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

这就是我们在 Web3 中发送交易的方式。首先，我们使用 [`Contract` 对象](https://web3py.readthedocs.io/en/stable/web3.contract.html)构建交易。然后，我们使用 [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) 并使用 `PRIVATE_KEY` 对交易进行签名。最后，我们使用 [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) 发送交易。

```python
    print(f"Approve transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Approve transaction mined.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) 等待直到交易被打包。如果需要，它会返回收据。

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

与 `SELL_PARAMS` 相反，买入参数可以改变。输入金额是 1 WETH 的成本，可从 `quote` 中获得。

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

`buy()` 和 `sell()` 函数几乎相同。首先，我们为 `SwapRouter` 授权足够的授权额度，然后我们使用正确的路径和金额调用它。

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

报告两种货币的用户余额。

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

此代理目前仅运行一次。但是，你可以通过从 [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) 运行它，或者将第 368-400 行包装在循环中并使用 [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) 等待直到下一个周期的时间，来将其更改为连续工作。

## 可能的改进 {#improvements}

这不是一个完整的生产版本；它仅仅是一个用于教授基础知识的示例。以下是一些改进的想法。

### 更智能的交易 {#smart-trading}

代理在决定做什么时忽略了两个重要的事实。

- _预期变化的幅度_。如果预计价格会下跌，代理会卖出固定数量的 `WETH`，而不管下跌的幅度如何。
  可以说，最好忽略微小的变化，并根据我们预期价格下跌的幅度进行卖出。
- _当前的投资组合_。如果你投资组合的 10% 是 WETH，并且你认为价格会上涨，那么买入更多可能是有意义的。但如果你投资组合的 90% 是 WETH，你可能已经有足够的风险敞口，没有必要买入更多。如果你预计价格会下跌，情况则相反。

### 如果你想对你的交易策略保密怎么办？ {#secret}

AI 供应商可以看到你发送给其 LLM 的查询，这可能会暴露你用代理开发的天才交易系统。太多人使用的交易系统毫无价值，因为太多人在你想买入时尝试买入（价格上涨），在你想卖出时尝试卖出（价格下跌）。

你可以在本地运行 LLM，例如使用 [LM-Studio](https://lmstudio.ai/)，以避免此问题。

### 从 AI 机器人到 AI 代理 {#bot-to-agent}

你可以充分证明这是[一个 AI 机器人，而不是 AI 代理](/ai-agents/#ai-agents-vs-ai-bots)。它实现了一个相对简单的策略，该策略依赖于预定义的信息。我们可以实现自我改进，例如，通过提供尤尼斯瓦普 v3 资金池列表及其最新值，并询问哪种组合具有最佳的预测价值。

### 滑点保护 {#slippage-protection}

目前没有[滑点保护](https://uniswapv3book.com/milestone_3/slippage-protection.html)。如果当前报价是 2000 美元，预期价格是 2100 美元，代理将会买入。然而，如果在代理买入之前成本升至 2200 美元，那么再买入就没有意义了。

要实现滑点保护，请在 [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325) 的第 325 行和第 334 行中指定一个 `amountOutMinimum` 值。

## 结论 {#conclusion}

希望现在你已经了解了足够多的知识来开始使用 AI 代理。这不是对该主题的全面概述；有整本书专门讨论这个主题，但这足以让你入门。祝你好运！

[点击这里查看我的更多作品](https://cryptodocguy.pro/)。