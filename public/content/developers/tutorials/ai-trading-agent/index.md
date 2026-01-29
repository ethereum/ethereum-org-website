---
title: "Make your own AI trading agent"
description: "In this tutorial you learn how to make a simple AI trading agent. This agent reads information from the blockchain, asks an LLM for recommendation based on that information, performs the trade the LLM recommends, and then waits and repeats.

author: Ori Pomerantz
tags: ["ai", "trading", "agent", "python"]
skill: intermediate
published: 2026-02-15
lang: en
sidebarDepth: 3
---

In this tutorial you learn how to make a simple ai trading agent. This agent works using these steps:

1. Read the current and past prices of a token, as well as other potentially relevant information.
2. Build a query with this information, along with background to explain how it might be relevant.
3. Submit the query and receive back a projected price.
4. Trade based on the recommendation. 
5. Wait and repeat.

This agent demonstrates how to read information, turn it into a query that results in a usable answer, and use that answer. All of these are steps required to for an AI agent. This agent is written in Python because that seems to be the most common language used in AI.

## Why do this? 

Automated trading agents allow developers to decide upon and run a trading strategy. [AI agents](/ai-agents) allow for more complex and dynamic trading strategies, potentially using information and algorithms the developer has not even considered using.

## The tools {#tools}

This article uses [Python](https://www.python.org/), the [Web3 library](https://web3py.readthedocs.io/en/stable/), and [Uniswap v. 3](https://github.com/Uniswap/v3-periphery) for quotes and trading. 

### Why Python? {#python}

The most common language in use for AI is [Python](https://www.python.org/), so that's what we use here. Don't worry if you don't know Python. It is a very clear language, and I am going to explain exactly what it is doing.

The [Web3 library](https://web3py.readthedocs.io/en/stable/) is the most common Python Ethereum API. It is pretty easy to use.

### Trading on the blockchain {#trading-on-blockchain}

There are [many distributed exchanges (DEX)](/apps/categories/defi/) that let you trade token on Ethereum. However, they all tend to have similar exchange rates because of [arbitrage](/developers/docs/smart-contracts/composability/#better-user-experience). 

[Uniswap](https://app.uniswap.org/) is a very common DEX, which we can use both for quotes (to see the relative values of tokens) and trades.

## Development, step by step {#step-by-step}

To simplify the development process, we do it in stages. Each step is a branch in Github.

### Getting started {#getting-started}

There are steps the get started under UNIX or Linux (including [WSL](https://learn.microsoft.com/en-us/windows/wsl/install))

1. If you don't already have it, download and install [Python](https://www.python.org/downloads/). 

2. Clone the GitHub repository.

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git
   cd 260215-ai-agent
   ```

3. Install [`uv`](https://docs.astral.sh/uv/getting-started/installation/). 

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

6. To verify Python is working correctly, run `python3` and provide it with this program. You can enter it at the `>>>` prompt, there is no need to create a file.

    ```python
    1+2
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

You should get a list of `Quote` objects, each with a timestamp, a price, and the asset (always `WETH/USDC`).

Here is a line by line explanation. If you are already familiar with Python and Web3 you can probably understand the code directly, and don't need this.

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

Import libraries we need. They are explained below, when they are used.

```python
print = functools.partial(print, flush=True)
```

Replaces Python’s `print` with a version that always flushes output immediately. This is useful in a long-running script, because we don't want to wait for status and debugging outputs.


```python
MAINNET_URL = "https://eth.drpc.org"
```

A URL to get to mainnet. You can get one from [as a service](/developers/docs/nodes-and-clients/nodes-as-a-service/) or use one of those advertised in [Chainlist](https://chainlist.org/chain/1).

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

A Ethereum mainnet block typically happens every twelve seconds, so these are the number of blocks we'd expect to happen in a time period. Note that this is not an exact figure. When the [block proposer](/developers/docs/consensus-mechanisms/pos/block-proposal/) is down, that block is skipped. If we wanted to get the exact block for a timestamp we'd use [binary search](https://en.wikipedia.org/wiki/Binary_search). However, this is close enough for our purposes. Predicting the future is not an exact science.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

The size of the cycle. We look at quotes once per cycle, and try to anticipate the value at the next cycle.

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

These are the [ABIs](https://docs.soliditylang.org/en/latest/abi-spec.html) for the two contracts we need to contact. To keep the code brief, we only include the functions we need to call.

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

This is one of the ways to create a data class in Python. The [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) data type is used connect to the contract. Note the `(frozen=True)`. In Python [booleans](https://en.wikipedia.org/wiki/Boolean_data_type) are defined as `True` or `False`, capitilized. This data class is `frozen`, meaning the fields cannot be modified.

Note the indentation. In contrast to [C-derived languages](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages), in Python blocks are denoted by indentation. The Python interpreter knows that the following definition is not part of this data class because it doesn't start at the same indentation as the data class field.


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

In a function that is part of a data class the first paramter is always `self`, the data class instance that called here. Here there is another parameter, the block number.

```python
        assert block <= w3.eth.block_number, "Block is in the future"
```

If we could read the future, we'd probably have better things to do than write ai trading agents.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2 
```

```python
         # (token1 per token0)
        return 1/(raw_price * self.decimal_factor)

@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str


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

def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
    if block_number is None:
        block_number = w3.eth.block_number
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP),
        asset=pool.asset
    )

def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
    quotes = []
    for block in range(start_block, end_block + 1, step):
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes

pool = read_pool(WETHUSDC_ADDRESS)
quotes = get_quotes(
    pool,
    w3.eth.block_number - 12*CYCLE_BLOCKS,
    w3.eth.block_number,
    CYCLE_BLOCKS
)

pprint(quotes)
```

### Query generation {#query-generation}

### Interfacing with an LLM {#interface-llm}

### Submitting transactions {#submit-txn}

### Back testing {#back-testing}

### From AI-bot to AI-agent {#bot-to-agent}

## What if you want to keep your trading strategy a secret? {#secret}

## Conclusion {#conclusion}

