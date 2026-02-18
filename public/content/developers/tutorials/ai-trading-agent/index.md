---
title: Make your own AI trading agent on Ethereum
description: In this tutorial you learn how to make a simple AI trading agent. This agent reads information from the blockchain, asks an LLM for a recommendation based on that information, performs the trade the LLM recommends, and then waits and repeats.
author: Ori Pomerantz
tags: ["AI", "trading", "agent", "python"]
skill: intermediate
published: 2026-02-13
lang: en
sidebarDepth: 3
---

In this tutorial you learn how to build a simple AI trading agent. This agent works using these steps:

1. Read the current and past prices of a token, as well as other potentially relevant information
2. Build a query with this information, along with background information to explain how it might be relevant
3. Submit the query and receive back a projected price
4. Trade based on the recommendation
5. Wait and repeat

This agent demonstrates how to read information, translate it into a query that yields a usable answer, and use that answer. All of these are steps required for an AI agent. This agent is implemented in Python because it is the most common language used in AI.

## Why do this? {#why-do-this}

Automated trading agents allow developers to select and execute a trading strategy. [AI agents](/ai-agents) allow for more complex and dynamic trading strategies, potentially using information and algorithms the developer has not even considered using.

## The tools {#tools}

This tutorial uses [Python](https://www.python.org/), the [Web3 library](https://web3py.readthedocs.io/en/stable/), and [Uniswap v3](https://github.com/Uniswap/v3-periphery) for quotes and trading.

### Why Python? {#python}

The most widely used language for AI is [Python](https://www.python.org/), so we use it here. Don't worry if you don't know Python. The language is very clear, and I will explain exactly what it does.

The [Web3 library](https://web3py.readthedocs.io/en/stable/) is the most common Python Ethereum API. It is pretty easy to use.

### Trading on the blockchain {#trading-on-blockchain}

There are [many distributed exchanges (DEX)](/apps/categories/defi/) that let you trade tokens on Ethereum. However, they tend to have similar exchange rates due to [arbitrage](/developers/docs/smart-contracts/composability/#better-user-experience).

[Uniswap](https://app.uniswap.org/) is a widely used DEX that we can use for both quotes (to see token relative values) and trades.

### OpenAI {#openai}

For a large language model, I chose to get started with [OpenAI](https://openai.com/). To run the application in this tutorial you'll need to pay for API access. The minimum payment of $5 is more than sufficient.

## Development, step by step {#step-by-step}

To simplify development, we proceed in stages. Each step is a branch in GitHub.

### Getting started {#getting-started}

There are steps to get started under UNIX or Linux (including [WSL](https://learn.microsoft.com/en-us/windows/wsl/install))

1. If you don't already have it, download and install [Python](https://www.python.org/downloads/).

2. Clone the GitHub repository.

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. Install [`uv`](https://docs.astral.sh/uv/getting-started/installation/). The command on your system might be different.

   ```sh
   pipx install uv
   ```

4. Download the libraries.

   ```sh
   uv sync
   ```

5. Activate the virtual environment.

   ```sh
   source .venv/bin/activate
   ```

6. To verify Python and Web3 are working correctly, run `python3` and provide it with this program. You can enter it at the `>>>` prompt; there is no need to create a file.

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### Reading from the blockchain {#read-blockchain}

The next step is to read from the blockchain. To do that, you need to change to the `02-read-quote` branch and then use `uv` to run the program.

```sh
git checkout 02-read-quote
uv run agent.py
```

You should receive a list of `Quote` objects, each with a timestamp, a price, and the asset (currently always `WETH/USDC`).

Here is a line-by-line explanation.

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

Import the libraries we need. They are explained below when used.

```python
print = functools.partial(print, flush=True)
```

Replaces Python’s `print` with a version that always flushes output immediately. This is useful in a long-running script because we don't want to wait for status updates or debugging output.

```python
MAINNET_URL = "https://eth.drpc.org"
```

A URL to get to mainnet. You can get one from [Node as a service](/developers/docs/nodes-and-clients/nodes-as-a-service/) or use one of those advertised in [Chainlist](https://chainlist.org/chain/1).

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

An Ethereum mainnet block typically happens every twelve seconds, so these are the number of blocks we'd expect to happen in a time period. Note that this is not an exact figure. When the [block proposer](/developers/docs/consensus-mechanisms/pos/block-proposal/) is down, that block is skipped, and the time for the next block is 24 seconds. If we wanted to get the exact block for a timestamp, we'd use [binary search](https://en.wikipedia.org/wiki/Binary_search). However, this is close enough for our purposes. Predicting the future is not an exact science.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

The size of the cycle. We review quotes once per cycle and try to estimate the value at the end of the next cycle.

```python
# The address of the pool we're reading
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

The quote values are taken from the Uniswap 3 USDC/WETH pool at address [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract). This address is already in checksum form, but it's better to use [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address) to make the code reusable.

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

These are the [ABIs](https://docs.soliditylang.org/en/latest/abi-spec.html) for the two contracts we need to contact. To keep the code concise, we include only the functions we need to call.

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

Initiate the [`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) library and connect to an Ethereum node.

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

This is one way to create a data class in Python. The [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) data type is used to connect to the contract. Note the `(frozen=True)`. In Python [booleans](https://en.wikipedia.org/wiki/Boolean_data_type) are defined as `True` or `False`, capitalized. This data class is `frozen`, meaning the fields cannot be modified.

Note the indentation. In contrast to [C-derived languages](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages), Python uses indentation to denote blocks. The Python interpreter knows that the following definition is not part of this data class because it doesn't start at the same indentation as the data class fields.

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

The [`Decimal`](https://docs.python.org/3/library/decimal.html) type is used for accurately handling decimal fractions.

```python
    def get_price(self, block: int) -> Decimal:
```

This is the way to define a function in Python. The definition is indented to show it is still part of `PoolInfo`.

In a function that is part of a data class the first parameter is always `self`, the data class instance that called here. Here there is another parameter, the block number.

```python
        assert block <= w3.eth.block_number, "Block is in the future"
```

If we could read the future, we wouldn't need AI for trading.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

The syntax for calling a function on the EVM from Web3 is this: `<contract object>.functions.<function name>().call(<parameters>)`. The parameters can be the EVM function's parameters (if any; here there aren't) or [named parameters](https://en.wikipedia.org/wiki/Named_parameter) for modifying blockchain behavior. Here we use one, `block_identifier`, to specify [the block number](/developers/docs/apis/json-rpc/#default-block) we wish to run in.

The result is [this struct, in array form](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72). The first value is a function of the exchange rate between the two tokens.

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

To reduce onchain calculations, Uniswap v3 does not store the actual exchange factor but rather its square root. Because the EVM does not support floating point math or fractions, instead of the actual value, the response is <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5;</mo><msup><mn>2</mn><mn>96</mn></msup></math>

```python
         # (token1 per token0)
        return 1/(raw_price * self.decimal_factor)
```

The raw price we get is the number of `token0` we get for each `token1`. In our pool `token0` is USDC (stablecoin with the same value as a US dollar) and `token1` is [WETH](https://opensea.io/learn/blockchain/what-is-weth). The value we really want is the number of dollars per WETH, not the inverse.

The decimal factor is the ratio between the [decimal factors](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) for the two tokens.

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

This data class represents a quote: the price of a specific asset at a given point in time. At this point, the `asset` field is irrelevant because we use a single pool and therefore have a single asset. However, we will add more assets later.

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

This function takes an address and returns information about the token contract at that address. To create a new [Web3 `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html), we provide the address and ABI to `w3.eth.contract`.

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

This function returns everything we need about [a specific pool](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol). The syntax `f"<string>"` is a [formatted string](https://docs.python.org/3/reference/lexical_analysis.html#f-strings).

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

Get a `Quote` object. The default value for `block_number` is `None` (no value).

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

If a block number was not specified, use `w3.eth.block_number`, which is the latest block number. This is the syntax for [an `if` statement](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement).

It might look as if it would have been better to just set the default to `w3.eth.block_number`, but that doesn't work well because it would be the block number at the time the function is defined. In a long-running agent, this would be a problem.

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

Use [the `datetime` library](https://docs.python.org/3/library/datetime.html) to format it to a format readable for humans and large language models (LLMs). Use [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize) to round the value to two decimal places.

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

In Python you define a [list](https://docs.python.org/3/library/stdtypes.html#typesseq-list) that can only contain a specific type using `list[<type>]`.

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

In Python a [`for` loop](https://docs.python.org/3/tutorial/controlflow.html#for-statements) typically iterates over a list. The list of block numbers to find quotes in comes from [`range`](https://docs.python.org/3/library/stdtypes.html#range).

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

For each block number, get a `Quote` object and append it to the `quotes` list. Then return that list.

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

This is the main code of the script. Read the pool information, get twelve quotes, and [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint) them.

### Creating a prompt {#prompt}

Next, we need to convert this list of quotes into a prompt for an LLM and obtain an expected future value.

```sh
git checkout 03-create-prompt
uv run agent.py
```

The output is now going to be a prompt to an LLM, similar to:

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

Notice that there are quotes for two assets here, `WETH/USDC` and `WBTC/WETH`. Adding quotes from another asset might improve the prediction accuracy.

#### What a prompt looks like {#prompt-explanation}

This prompt contains three sections, which are pretty common in LLM prompts.

1. Information. LLMs have a lot of information from their training, but they usually don't have the latest. This is the reason we need to retrieve the latest quotes here. Adding information to a prompt is called [retrieval augmented generation (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation).

2. The actual question. This is what we want to know.

3. Output formatting instructions. Normally, an LLM will give us an estimate with an explanation of how it arrived at it. This is better for humans, but a computer program just needs the bottom line.

#### Code explanation {#prompt-code}

Here is the new code.

```python
from datetime import datetime, timezone, timedelta
```

We need to provide the LLM with the time for which we want an estimate. To get a time "n minutes/hours/days" in the future, we use [the `timedelta` class](https://docs.python.org/3/library/datetime.html#datetime.timedelta).

```python
# The addresses of the pools we're reading
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

We have two pools we need to read.

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
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (token1 per token0)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

In the WETH/USDC pool, we want to know how many of `token0` (USDC) we need to buy one of `token1` (WETH). In the WETH/WBTC pool, we want to know how many `token1` (WETH) we need to buy one `token0` (WBTC, which is wrapped Bitcoin). We need to track whether the pool’s ratio needs to be reversed.

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

To know if a pool needs to be reversed, we get to get that as input to `read_pool`. Also, the asset symbol needs to be set up correctly.

The syntax `<a> if <b> else <c>` is the Python equivalent of the [ternary conditional operator](https://en.wikipedia.org/wiki/Ternary_conditional_operator), which in a C-derived language would be `<b> ? <a> : <c>`.

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

This function builds a string that formats a list of `Quote` objects, assuming they all apply to the same asset.

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

In Python [multi-line string literals](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) are written as `"""` .... `"""`.

```python
Given these quotes:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

Here, we use the [MapReduce](https://en.wikipedia.org/wiki/MapReduce) pattern to generate a string for each quote list with `format_quotes`, then reduce them into a single string for use in the prompt.

```python
What would you expect the value for {asset} to be at time {expected_time}?

Provide your answer as a single number rounded to two decimal places,
without any other text.
    """
```

The rest of the prompt is as expected.

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

Review the two pools and obtain quotes from both.

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

Determine the future time point for which we want the estimate, and create the prompt.

### Interfacing with an LLM {#interface-llm}

Next, we prompt an actual LLM and receive an expected future value. I wrote this program using OpenAI, so if you want to use a different provider, you'll need to adjust it.

1. Get an [OpenAI account](https://auth.openai.com/create-account)
2. [Fund the account](https://platform.openai.com/settings/organization/billing/overview)—the minimum amount at the time of writing is $5
3. [Create an API key](https://platform.openai.com/settings/organization/api-keys)
4. In the command line, export the API key so your program can use it

   ```sh
   export OPENAI_API_KEY=sk-<the rest of the key goes here>
   ```

5. Checkout and run the agent

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

Here is the new code.

```python
from openai import OpenAI

open_ai = OpenAI()  # The client reads the OPENAI_API_KEY environment variable
```

Import and instantiate the OpenAI API.

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

Call the OpenAI API (`open_ai.chat.completions.create`) to create the response.

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

Output the price and provide a buy or sell recommendation.

#### Testing the predictions {#testing-the-predictions}

Now that we can generate predictions, we can also use historical data to assess whether we produce useful predictions.

```sh
uv run test-predictor.py
```

The expected result is similar to:

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

Most of the tester is identical to the agent, but here are the parts that are new or modified.

```python
CYCLES_FOR_TEST = 40 # For the backtest, how many cycles we test over

# Get lots of quotes
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

We look at `CYCLES_FOR_TEST` (specified as 40 here) days back.

```python
# Create predictions and check them against real history

total_error = Decimal(0)
changes = []
```

There are two types of errors we are interested in. The first, `total_error`, is simply the sum of errors the predictor made.

To understand the second, `changes`, we need to remember the agent's purpose. It's not to predict the WETH/USDC ratio (ETH price). It's to issue sell and buy recommendations. If the price is currently $2000 and it predicts $2010 tomorrow, we don't mind if the actual result is $2020 and we earn extra money. But we _do_ mind if it predicted $2010, and bought ETH based on that recommendation, and the price drops to $1990.

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

We can only look at cases where the complete history (the values used for the prediction and the real-world value to compare it to) is available. This means the newest case must be the one that started `CYCLES_BACK` ago.

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

Use [slices](https://www.w3schools.com/python/ref_func_slice.asp) to get the same number of samples as the number the agent uses. The code between here and the next segment is the same get-a-prediction code we have in the agent.

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

Get the predicted price, the real price, and the price at the time of the prediction. We need the price at the time of the prediction to determine whether the recommendation was to buy or sell.

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Prediction for {prediction_time}: predicted {predicted_price} USD, real {real_price} USD, error {error} USD")
```

Figure the error, and add it to the total.

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

For `changes`, we want the monetary impact of buying or selling one ETH. So first, we need to determine the recommendation, then assess how the actual price changed, and whether the recommendation made money (positive change) or cost money (negative change).

```python
print (f"Mean prediction error over {len(wethusdc_quotes)-CYCLES_BACK} predictions: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Mean change per recommendation: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Standard variance of changes: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

Report the results.

```python
print (f"Profitable days: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Losing days: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

Use [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) to count the number of profitable days and the number of costly days. The result is a filter object, which we need to convert to a list to get the length.

### Submitting transactions {#submit-txn}

Now we need to actually submit transactions. However, I don't want to spend real money at this point, before the system is proven. Instead, we will create a local fork of mainnet, and "trade" on that network.

Here are the steps to create a local fork and enable trading.

1. Install [Foundry](https://getfoundry.sh/introduction/installation)

2. Start [`anvil`](https://getfoundry.sh/anvil/overview)

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` is listening on the default URL for Foundry, http://localhost:8545, so we don't need to specify the URL for [the `cast` command](https://getfoundry.sh/cast/overview) we use to manipulate the blockchain.

3. When running in `anvil`, there are ten test accounts that have ETH—set the environment variables for the first one

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. These are the contracts we need to use. [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) is the Uniswap v3 contract we use to actually trade. We could trade directly through the pool, but this is much easier.

   The two bottom variables are the Uniswap v3 paths required to swap between WETH and USDC.

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. Each of the test accounts has 10,000 ETH. Use the WETH contract to wrap 1000 ETH to obtain 1000 WETH for trading.

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. Use `SwapRouter` to trade 500 WETH for USDC.

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   The `approve` call creates an allowance that allows `SwapRouter` to spend some of our tokens. Contracts cannot monitor events, so if we transfer tokens directly to the `SwapRouter` contract, it wouldn't know it was paid. Instead, we permit the `SwapRouter` contract to spend a certain amount, and then `SwapRouter` does it. This is done through a function called by `SwapRouter`, so it knows if it was successful.

7. Verify you have enough of both tokens.

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

Now that we have WETH and USDC, we can actually run the agent.

```sh
git checkout 05-trade
uv run agent.py
```

The output will look similar to:

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

To actually use it, you need a few minor changes.

- In line 14, change `MAINNET_URL` to a real access point, such as `https://eth.drpc.org`
- In line 28, change `PRIVATE_KEY` to your own private key
- Unless you are very wealthy and can buy or sell 1 ETH each day for an unproven agent, you might want to change 29 to decrease `WETH_TRADE_AMOUNT`

#### Code explanation {#trading-code}

Here is the new code.

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

The same variables we used in step 4.

```python
WETH_TRADE_AMOUNT=1
```

The amount to trade.

```python
ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... },
    { "name": "balanceOf", ...},
    { "name": "approve", ...}
]
```

To actually trade, we need the `approve` function. We also want to show balances before and after, so we also need `balanceOf`.

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

In the `SwapRouter` ABI we just need `exactInput`. There is a related function, `exactOutput`, we could use to buy exactly one WETH, but for simplicity we just use `exactInput` in both cases.

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

The Web3 definitions for the [`account`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) and the `SwapRouter` contract.

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

The transaction parameters. We need a function here because [the nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) must change each time.

```python
def approve_token(contract: Contract, amount: int):
```

Approve a token allowance for `SwapRouter`.

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

This is how we send a transaction in Web3. First we use [the `Contract` object](https://web3py.readthedocs.io/en/stable/web3.contract.html) to build the transaction. Then we use [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) to sign the transaction, using `PRIVATE_KEY`. Finally, we use [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) to send the transaction.

```python
    print(f"Approve transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Approve transaction mined.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) waits until the transaction is mined. It returns the receipt if needed.

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

These are the parameters when selling WETH.

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

In contrast to `SELL_PARAMS`, the buy parameters can change. The input amount is the cost of 1 WETH, as available in `quote`.

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

The `buy()` and `sell()` functions are nearly identical. First we approve a sufficient allowance for `SwapRouter`, and then we call it with the correct path and amount.

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

Report user balances in both currencies.

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

This agent currently only works once. However, you can change it to work continuously either by running it from [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) or by wrapping lines 368-400 in a loop and using [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) to wait until it is time for the next cycle.

## Possible improvements {#improvements}

This is not a full production version; it is merely an example to teach the basics. Here are some ideas for improvements.

### Smarter trading {#smart-trading}

There are two important facts the agent ignores when deciding what to do.

- _The magnitude of anticipated change_. The agent sells a fixed amount of `WETH` if the price is expected to decline, regardless of the magnitude of the decline.
  Arguably, it would be better to ignore minor changes and sell based on how much we expect the price to decline.
- _The current portfolio_. If 10% of your portfolio is in WETH and you think the price will go up, it probably makes sense to buy more. But if 90% of your portfolio is in WETH, you may be sufficiently exposed, and there is no need to buy more. The reverse is true if you expect the price to go down.

### What if you want to keep your trading strategy a secret? {#secret}

AI vendors can see the queries you send to their LLMs, which could expose the genius trading system you developed with your agent. A trading system that too many people use is worthless because too many people try to buy when you want to buy (and the price goes up) and try to sell when you want to sell (and the price goes down).

You can run an LLM locally, for example, using [LM-Studio](https://lmstudio.ai/), to avoid this problem.

### From AI bot to AI agent {#bot-to-agent}

You can make a good case that this is [an AI bot, not an AI agent](/ai-agents/#ai-agents-vs-ai-bots). It implements a relatively simple strategy that relies on predefined information. We can enable self-improvement, for example, by providing a list of Uniswap v3 pools and their latest values and asking which combination has the best predictive value.

### Slippage protection {#slippage-protection}

Currently there is no [slippage protection](https://uniswapv3book.com/milestone_3/slippage-protection.html). If the current quote is $2000, and the expected price is $2100, the agent will buy. However, if before the agent buys the cost rises to $2200, it makes no sense to buy anymore.

To implement slippage protection, specify an `amountOutMinimum` value in lines 325 and 334 of [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325).

## Conclusion {#conclusion}

Hopefully, now you know enough to get started with AI agents. This is not a comprehensive overview of the subject; there are whole books dedicated to that, but this is enough to get you started. Good luck!

[See here for more of my work](https://cryptodocguy.pro/).
