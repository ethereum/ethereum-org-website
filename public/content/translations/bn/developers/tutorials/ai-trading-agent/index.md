---
title: ইথেরিয়ামে আপনার নিজস্ব AI ট্রেডিং এজেন্ট তৈরি করুন
description: এই টিউটোরিয়ালে আপনি একটি সহজ AI ট্রেডিং এজেন্ট কীভাবে তৈরি করতে হয় তা শিখবেন। এই এজেন্টটি ব্লকচেইন থেকে তথ্য পড়ে, সেই তথ্যের উপর ভিত্তি করে একটি LLM-এর কাছে সুপারিশ চায়, LLM-এর সুপারিশকৃত ট্রেডটি সম্পাদন করে এবং তারপর অপেক্ষা করে ও পুনরাবৃত্তি করে।
author: Ori Pomerantz
tags: [ "AI", "ট্রেডিং", "এজেন্ট", "python" ]
skill: intermediate
published: 2026-02-13
lang: bn
sidebarDepth: 3
---

এই টিউটোরিয়ালে আপনি একটি সহজ AI ট্রেডিং এজেন্ট কীভাবে তৈরি করতে হয় তা শিখবেন। এই এজেন্টটি এই ধাপগুলো ব্যবহার করে কাজ করে:

1. একটি টোকেনের বর্তমান এবং অতীতের মূল্য, সেইসাথে অন্যান্য সম্ভাব্য প্রাসঙ্গিক তথ্য পড়ুন
2. এই তথ্যের সাথে একটি কোয়েরি তৈরি করুন, সাথে ব্যাকগ্রাউন্ড তথ্য যোগ করে ব্যাখ্যা করুন যে এটি কীভাবে প্রাসঙ্গিক হতে পারে
3. কোয়েরি জমা দিন এবং একটি অনুমানিত মূল্য ফেরত পান
4. সুপারিশের ভিত্তিতে ট্রেড করুন
5. অপেক্ষা করুন এবং পুনরাবৃত্তি করুন

এই এজেন্টটি দেখায় কীভাবে তথ্য পড়তে হয়, এটিকে একটি কোয়েরিতে রূপান্তর করতে হয় যা একটি ব্যবহারযোগ্য উত্তর দেয় এবং সেই উত্তরটি ব্যবহার করতে হয়। এগুলো সবই একটি AI এজেন্টের জন্য প্রয়োজনীয় ধাপ। এই এজেন্টটি Python-এ প্রয়োগ করা হয়েছে কারণ এটি AI-তে ব্যবহৃত সবচেয়ে সাধারণ ভাষা।

## এটা কেন করবেন? {#why-do-this}

স্বয়ংক্রিয় ট্রেডিং এজেন্ট ডেভেলপারদের একটি ট্রেডিং কৌশল নির্বাচন এবং কার্যকর করার সুযোগ দেয়। [AI এজেন্ট](/ai-agents) আরও জটিল এবং গতিশীল ট্রেডিং কৌশলের সুযোগ দেয়, সম্ভাব্যভাবে এমন তথ্য এবং অ্যালগরিদম ব্যবহার করে যা ডেভেলপার ব্যবহার করার কথাও ভাবেনি।

## টুলস {#tools}

এই টিউটোরিয়ালটি কোট এবং ট্রেডিংয়ের জন্য [Python](https://www.python.org/), [Web3 লাইব্রেরি](https://web3py.readthedocs.io/en/stable/) এবং [Uniswap v3](https://github.com/Uniswap/v3-periphery) ব্যবহার করে।

### কেন Python? {#python}

AI-এর জন্য সবচেয়ে বেশি ব্যবহৃত ভাষা হল [Python](https://www.python.org/), তাই আমরা এখানে এটি ব্যবহার করেছি। আপনি Python না জানলেও চিন্তা করবেন না। ভাষাটি খুব স্পষ্ট, এবং আমি ব্যাখ্যা করব এটি ঠিক কী করে।

[Web3 লাইব্রেরি](https://web3py.readthedocs.io/en/stable/) হল সবচেয়ে সাধারণ Python ইথেরিয়াম API। এটি ব্যবহার করা বেশ সহজ।

### ব্লকচেইনে ট্রেডিং {#trading-on-blockchain}

[অনেক ডিস্ট্রিবিউটেড এক্সচেঞ্জ (DEX)](/apps/categories/defi/) আছে যা আপনাকে ইথেরিয়ামে টোকেন ট্রেড করার সুযোগ দেয়। তবে, [আর্বিট্রেজ](/developers/docs/smart-contracts/composability/#better-user-experience)-এর কারণে তাদের এক্সচেঞ্জ রেট প্রায় একই রকম থাকে।

[Uniswap](https://app.uniswap.org/) একটি বহুল ব্যবহৃত DEX যা আমরা কোট (টোকেনের আপেক্ষিক মান দেখতে) এবং ট্রেড উভয়ের জন্য ব্যবহার করতে পারি।

### OpenAI {#openai}

একটি বড় ল্যাঙ্গুয়েজ মডেলের জন্য, আমি [OpenAI](https://openai.com/) দিয়ে শুরু করতে চেয়েছি। এই টিউটোরিয়ালের অ্যাপ্লিকেশনটি চালানোর জন্য আপনাকে API অ্যাক্সেসের জন্য অর্থপ্রদান করতে হবে। $5-এর ন্যূনতম পেমেন্ট যথেষ্টর চেয়েও বেশি।

## ডেভেলপমেন্ট, ধাপে ধাপে {#step-by-step}

ডেভেলপমেন্টকে সহজ করার জন্য, আমরা ধাপে ধাপে এগোব। প্রতিটি ধাপ GitHub-এর একটি ব্রাঞ্চ।

### শুরু করা যাক {#getting-started}

UNIX বা Linux-এর অধীনে শুরু করার জন্য কিছু ধাপ রয়েছে (এর মধ্যে [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) অন্তর্ভুক্ত)

1. আপনার কাছে যদি এটি আগে থেকে না থাকে, তাহলে [Python](https://www.python.org/downloads/) ডাউনলোড এবং ইনস্টল করুন।

2. GitHub রিপোজিটরিটি ক্লোন করুন।

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. [`uv`](https://docs.astral.sh/uv/getting-started/installation/) ইনস্টল করুন। আপনার সিস্টেমে কমান্ডটি ভিন্ন হতে পারে।

   ```sh
   pipx install uv
   ```

4. লাইব্রেরিগুলো ডাউনলোড করুন।

   ```sh
   uv sync
   ```

5. ভার্চুয়াল এনভায়রনমেন্ট সক্রিয় করুন।

   ```sh
   source .venv/bin/activate
   ```

6. Python এবং Web3 সঠিকভাবে কাজ করছে কিনা তা যাচাই করতে, `python3` চালান এবং এটিকে এই প্রোগ্রামটি সরবরাহ করুন। আপনি এটি `>>>` প্রম্পটে প্রবেশ করতে পারেন; একটি ফাইল তৈরি করার প্রয়োজন নেই।

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### ব্লকচেইন থেকে পড়া {#read-blockchain}

পরবর্তী ধাপ হল ব্লকচেইন থেকে পড়া। এটি করার জন্য, আপনাকে `02-read-quote` ব্রাঞ্চে পরিবর্তন করতে হবে এবং তারপর প্রোগ্রামটি চালানোর জন্য `uv` ব্যবহার করতে হবে।

```sh
git checkout 02-read-quote
uv run agent.py
```

আপনার একটি `Quote` অবজেক্টের তালিকা পাওয়া উচিত, প্রতিটিতে একটি টাইমস্ট্যাম্প, একটি মূল্য এবং অ্যাসেট (বর্তমানে সবসময় `WETH/USDC`) থাকবে।

এখানে একটি লাইন-বাই-লাইন ব্যাখ্যা দেওয়া হলো।

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

আমাদের প্রয়োজনীয় লাইব্রেরিগুলি আমদানি করুন। এগুলি ব্যবহার করার সময় নীচে ব্যাখ্যা করা হয়েছে।

```python
print = functools.partial(print, flush=True)
```

Python-এর `print`-কে এমন একটি সংস্করণ দিয়ে প্রতিস্থাপন করে যা সবসময় অবিলম্বে আউটপুট ফ্লাশ করে। এটি একটি দীর্ঘ-চলমান স্ক্রিপ্টে উপযোগী কারণ আমরা স্ট্যাটাস আপডেট বা ডিবাগিং আউটপুটের জন্য অপেক্ষা করতে চাই না।

```python
MAINNET_URL = "https://eth.drpc.org"
```

মেইননেটে যাওয়ার জন্য একটি URL। আপনি [নোড অ্যাজ এ সার্ভিস](/developers/docs/nodes-and-clients/nodes-as-a-service/) থেকে একটি পেতে পারেন বা [Chainlist](https://chainlist.org/chain/1)-এ বিজ্ঞাপিত একটি ব্যবহার করতে পারেন।

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

একটি ইথেরিয়াম মেইননেট ব্লক সাধারণত প্রতি বারো সেকেন্ডে ঘটে, তাই এগুলি হল ব্লকের সংখ্যা যা আমরা একটি সময়কালে ঘটার আশা করি। লক্ষ্য করুন যে এটি একটি সঠিক সংখ্যা নয়। যখন [ব্লক প্রস্তাবক](/developers/docs/consensus-mechanisms/pos/block-proposal/) ডাউন থাকে, তখন সেই ব্লকটি এড়িয়ে যাওয়া হয় এবং পরবর্তী ব্লকের জন্য সময় হল 24 সেকেন্ড। আমরা যদি একটি টাইমস্ট্যাম্পের জন্য সঠিক ব্লক পেতে চাই, তাহলে আমরা [বাইনারি সার্চ](https://en.wikipedia.org/wiki/Binary_search) ব্যবহার করব। তবে, এটি আমাদের উদ্দেশ্যের জন্য যথেষ্ট কাছাকাছি। ভবিষ্যদ্বাণী করা কোনো সঠিক বিজ্ঞান নয়।

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

চক্রের আকার। আমরা প্রতি চক্রে একবার কোট পর্যালোচনা করি এবং পরবর্তী চক্রের শেষে মান অনুমান করার চেষ্টা করি।

```python
# আমরা যে পুলটি পড়ছি তার অ্যাড্রেস
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

কোট মানগুলি Uniswap 3 USDC/WETH পুল থেকে [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract) অ্যাড্রেসে নেওয়া হয়েছে। এই অ্যাড্রেসটি ইতিমধ্যেই চেকসাম ফর্মে আছে, কিন্তু কোডটিকে পুনঃব্যবহারযোগ্য করতে [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address) ব্যবহার করা ভাল।

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

এগুলো হল দুটি কন্ট্র্যাক্টের [ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) যার সাথে আমাদের যোগাযোগ করতে হবে। কোডটি সংক্ষিপ্ত রাখতে, আমরা শুধুমাত্র সেই ফাংশনগুলো অন্তর্ভুক্ত করি যা আমাদের কল করতে হবে।

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

[`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) লাইব্রেরি শুরু করুন এবং একটি ইথেরিয়াম নোডের সাথে সংযোগ স্থাপন করুন।

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

এটি Python-এ একটি ডেটা ক্লাস তৈরি করার একটি উপায়। কন্ট্র্যাক্টের সাথে সংযোগ স্থাপন করতে [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) ডেটা টাইপ ব্যবহার করা হয়। ` (frozen=True)` লক্ষ্য করুন। Python-এ [বুলিয়ান](https://en.wikipedia.org/wiki/Boolean_data_type)-কে `True` বা `False` হিসেবে সংজ্ঞায়িত করা হয়, যা ক্যাপিটালাইজড। এই ডেটা ক্লাসটি `frozen`, যার মানে ফিল্ডগুলি পরিবর্তন করা যাবে না।

ইনডেনটেশন লক্ষ্য করুন। [C-থেকে উদ্ভূত ভাষা](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages)-এর বিপরীতে, Python ব্লক বোঝাতে ইনডেনটেশন ব্যবহার করে। Python ইন্টারপ্রেটার জানে যে নিম্নলিখিত সংজ্ঞাটি এই ডেটা ক্লাসের অংশ নয় কারণ এটি ডেটা ক্লাসের ফিল্ডগুলির মতো একই ইনডেনটেশন থেকে শুরু হয় না।

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

দশমিক ভগ্নাংশ সঠিকভাবে পরিচালনা করার জন্য [`Decimal`](https://docs.python.org/3/library/decimal.html) টাইপ ব্যবহার করা হয়।

```python
    def get_price(self, block: int) -> Decimal:
```

এটি Python-এ একটি ফাংশন সংজ্ঞায়িত করার উপায়। সংজ্ঞাটি ইনডেন্ট করা হয়েছে এটি দেখানোর জন্য যে এটি এখনও `PoolInfo`-এর অংশ।

একটি ডেটা ক্লাসের অংশ এমন একটি ফাংশনে প্রথম প্যারামিটারটি সর্বদা `self`, যা এখানে কল করা ডেটা ক্লাস ইনস্ট্যান্স। এখানে আরেকটি প্যারামিটার আছে, ব্লক নম্বর।

```python
        assert block <= w3.eth.block_number, "Block is in the future"
```

আমরা যদি ভবিষ্যৎ পড়তে পারতাম, তবে ট্রেডিংয়ের জন্য AI-এর প্রয়োজন হতো না।

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

Web3 থেকে EVM-এ একটি ফাংশন কল করার সিনট্যাক্স হল: `<contract object>.functions.<function name>"().call(<parameters>)`। প্যারামিটারগুলো EVM ফাংশনের প্যারামিটার হতে পারে (যদি থাকে; এখানে নেই) অথবা ব্লকচেইন আচরণ পরিবর্তন করার জন্য [নামযুক্ত প্যারামিটার](https://en.wikipedia.org/wiki/Named_parameter) হতে পারে। এখানে আমরা `block_identifier` ব্যবহার করি, যা [ব্লক নম্বর](/developers/docs/apis/json-rpc/#default-block) নির্দিষ্ট করে যেখানে আমরা চালাতে চাই।

ফলাফল হল [এই struct, অ্যারে ফর্মে](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72)। প্রথম মানটি দুটি টোকেনের মধ্যে এক্সচেঞ্জ রেটের একটি ফাংশন।

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

অনচেইন গণনা কমাতে, Uniswap v3 আসল এক্সচেঞ্জ ফ্যাক্টর সংরক্ষণ করে না বরং এর বর্গমূল সংরক্ষণ করে। যেহেতু EVM ফ্লোটিং পয়েন্ট ম্যাথ বা ভগ্নাংশ সমর্থন করে না, তাই আসল মানের পরিবর্তে, প্রতিক্রিয়া হল <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5</mo><msup><mn>2</mn><mn>96</mn></msup></math>

```python
         # (টোকেন0 প্রতি টোকেন1)
        return 1/(raw_price * self.decimal_factor)
```

আমরা যে কাঁচা মূল্য পাই তা হল `টোকেন1`-এর প্রতি আমরা কত `টোকেন0` পাব তার সংখ্যা। আমাদের পুলে `টোকেন0` হল USDC (মার্কিন ডলারের সমান মূল্যের স্টেবলকয়েন) এবং `টোকেন1` হল [WETH](https://opensea.io/learn/blockchain/what-is-weth)। আমরা আসলে যে মানটি চাই তা হল প্রতি WETH-এর জন্য ডলারের সংখ্যা, এর বিপরীত নয়।

ডেসিমাল ফ্যাক্টর হলো দুটি টোকেনের [ডেসিমাল ফ্যাক্টর](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) এর মধ্যকার অনুপাত।

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

এই ডেটা ক্লাসটি একটি কোট উপস্থাপন করে: একটি নির্দিষ্ট সময়ে একটি নির্দিষ্ট অ্যাসেটের মূল্য। এই মুহূর্তে, `asset` ফিল্ডটি অপ্রাসঙ্গিক কারণ আমরা একটি একক পুল ব্যবহার করি এবং তাই একটি একক অ্যাসেট আছে। তবে, আমরা পরে আরও অ্যাসেট যোগ করব।

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

এই ফাংশনটি একটি অ্যাড্রেস নেয় এবং সেই অ্যাড্রেসে থাকা টোকেন কন্ট্র্যাক্ট সম্পর্কে তথ্য প্রদান করে। একটি নতুন [Web3 `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) তৈরি করতে, আমরা `w3.eth.contract`-কে অ্যাড্রেস এবং ABI প্রদান করি।

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

এই ফাংশনটি [একটি নির্দিষ্ট পুল](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol) সম্পর্কে আমাদের প্রয়োজনীয় সবকিছু প্রদান করে। সিনট্যাক্স `f"<string>"` একটি [ফরম্যাটেড স্ট্রিং](https://docs.python.org/3/reference/lexical_analysis.html#f-strings)।

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

একটি `Quote` অবজেক্ট পান। `block_number`-এর ডিফল্ট মান হল `None` (কোনো মান নেই)।

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

যদি কোনো ব্লক নম্বর নির্দিষ্ট করা না হয়, তাহলে `w3.eth.block_number` ব্যবহার করুন, যা সর্বশেষ ব্লক নম্বর। এটি [একটি `if` স্টেটমেন্টের](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement) সিনট্যাক্স।

এটা দেখে মনে হতে পারে যে ডিফল্ট হিসেবে `w3.eth.block_number` সেট করাই ভালো ছিল, কিন্তু সেটা ঠিকভাবে কাজ করে না কারণ এটা ফাংশনটি সংজ্ঞায়িত করার সময়ের ব্লক নম্বর হতো। একটি দীর্ঘ-চলমান এজেন্টে, এটি একটি সমস্যা হবে।

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

মানুষ এবং বড় ভাষার মডেলের (LLM) জন্য পঠনযোগ্য ফরম্যাটে ফরম্যাট করতে [`datetime` লাইব্রেরি](https://docs.python.org/3/library/datetime.html) ব্যবহার করুন। মানটিকে দুই দশমিক স্থানে রাউন্ড করতে [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize) ব্যবহার করুন।

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

Python-এ আপনি `list[<type>]` ব্যবহার করে একটি [তালিকা](https://docs.python.org/3/library/stdtypes.html#typesseq-list) সংজ্ঞায়িত করেন যা শুধুমাত্র একটি নির্দিষ্ট টাইপ ধারণ করতে পারে।

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

Python-এ একটি [`for` লুপ](https://docs.python.org/3/tutorial/controlflow.html#for-statements) সাধারণত একটি তালিকার উপর পুনরাবৃত্তি করে। কোট খুঁজে বের করার জন্য ব্লক নম্বরের তালিকাটি [`range`](https://docs.python.org/3/library/stdtypes.html#range) থেকে আসে।

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

প্রতিটি ব্লক নম্বরের জন্য, একটি `Quote` অবজেক্ট পান এবং এটিকে `quotes` তালিকায় যোগ করুন। তারপর সেই তালিকাটি ফেরত দিন।

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

এটি স্ক্রিপ্টের মূল কোড। পুল তথ্য পড়ুন, বারোটি কোট পান, এবং সেগুলোকে [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint) করুন।

### একটি প্রম্পট তৈরি করা {#prompt}

এরপরে, আমাদের এই কোটগুলোর তালিকাকে একটি LLM-এর জন্য প্রম্পটে রূপান্তর করতে হবে এবং একটি প্রত্যাশিত ভবিষ্যৎ মান পেতে হবে।

```sh
git checkout 03-create-prompt
uv run agent.py
```

আউটপুট এখন একটি LLM-এর জন্য একটি প্রম্পট হবে, যা দেখতে অনেকটা এইরকম:

```
এই কোটগুলো দেওয়া আছে:
অ্যাসেট: WETH/USDC
        2026-01-20T16:34 3016.21
        .
        .
        .
        2026-02-01T17:49 2299.10

অ্যাসেট: WBTC/WETH
        2026-01-20T16:34 29.84
        .
        .
        .
        2026-02-01T17:50 33.46


2026-02-02T17:56 সময়ে WETH/USDC-এর মান কী হতে পারে বলে আপনি আশা করেন?

আপনার উত্তরটি দুটি দশমিক স্থানে রাউন্ড করা একটি একক সংখ্যা হিসেবে দিন,
অন্য কোনো লেখা ছাড়া।
```

লক্ষ্য করুন যে এখানে দুটি অ্যাসেটের জন্য কোট রয়েছে, `WETH/USDC` এবং `WBTC/WETH`। অন্য একটি অ্যাসেট থেকে কোট যোগ করলে ভবিষ্যদ্বাণীর নির্ভুলতা উন্নত হতে পারে।

#### একটি প্রম্পট কেমন দেখতে হয় {#prompt-explanation}

এই প্রম্পটটিতে তিনটি বিভাগ রয়েছে, যা LLM প্রম্পটে বেশ সাধারণ।

1. তথ্য। LLM-গুলির প্রশিক্ষণের অনেক তথ্য থাকে, কিন্তু সাধারণত তাদের কাছে সর্বশেষ তথ্য থাকে না। এই কারণে আমাদের এখানে সর্বশেষ কোটগুলি পুনরুদ্ধার করতে হবে। একটি প্রম্পটে তথ্য যোগ করাকে [রিট্রিভাল অগমেন্টেড জেনারেশন (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) বলা হয়।

2. আসল প্রশ্ন। এটাই আমরা জানতে চাই।

3. আউটপুট ফরম্যাটিং নির্দেশাবলী। সাধারণত, একটি LLM আমাদের একটি অনুমান দেয় এবং এটি কীভাবে সেই অনুমানে পৌঁছেছে তার একটি ব্যাখ্যা দেয়। এটি মানুষের জন্য ভালো, কিন্তু একটি কম্পিউটার প্রোগ্রামের শুধু চূড়ান্ত ফলাফল প্রয়োজন।

#### কোড ব্যাখ্যা {#prompt-code}

এখানে নতুন কোডটি দেওয়া হলো।

```python
from datetime import datetime, timezone, timedelta
```

আমাদের LLM-কে সেই সময়টি সরবরাহ করতে হবে যার জন্য আমরা একটি অনুমান চাই। ভবিষ্যতে "n মিনিট/ঘন্টা/দিন" সময় পেতে, আমরা [`timedelta` ক্লাস](https://docs.python.org/3/library/datetime.html#datetime.timedelta) ব্যবহার করি।

```python
# আমরা যে পুলগুলো পড়ছি তার অ্যাড্রেস
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

আমাদের দুটি পুল পড়তে হবে।

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
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (টোকেন0 প্রতি টোকেন1)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

WETH/USDC পুলে, আমরা জানতে চাই একটি `টোকেন1` (WETH) কিনতে কতগুলো `টোকেন0` (USDC) প্রয়োজন। WETH/WBTC পুলে, আমরা জানতে চাই একটি `টোকেন0` (WBTC, যা র‍্যাপড বিটকয়েন) কিনতে কতগুলো `টোকেন1` (WETH) প্রয়োজন। আমাদের পুলের অনুপাত বিপরীত করা প্রয়োজন কিনা তা ট্র্যাক করতে হবে।

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

একটি পুলকে বিপরীত করতে হবে কিনা তা জানতে, আমরা `read_pool`-এ ইনপুট হিসেবে তা পাই। এছাড়াও, অ্যাসেট প্রতীকটি সঠিকভাবে সেট করতে হবে।

`<a> if <b> else <c>` সিনট্যাক্সটি পাইথনে [টারনারি কন্ডিশনাল অপারেটর](https://en.wikipedia.org/wiki/Ternary_conditional_operator) এর সমতুল্য, যা একটি C-ডিরাইভড ভাষায় `<b> ?` হবে। <a> : <c>\`।

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

এই ফাংশনটি `Quote` অবজেক্টের একটি তালিকা ফরম্যাট করে একটি স্ট্রিং তৈরি করে, ধরে নেওয়া হয় যে সবগুলো একই অ্যাসেটের জন্য প্রযোজ্য।

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

Python-এ [মাল্টি-লাইন স্ট্রিং লিটারাল](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) লেখা হয় `"""` .... হিসেবে। `"""`।

```python
এই কোটগুলো দেওয়া আছে:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

এখানে, আমরা প্রতিটি কোট তালিকার জন্য একটি স্ট্রিং তৈরি করতে [MapReduce](https://en.wikipedia.org/wiki/MapReduce) প্যাটার্ন ব্যবহার করি, `format_quotes` দিয়ে, তারপর প্রম্পটে ব্যবহারের জন্য সেগুলোকে একটি একক স্ট্রিং-এ পরিণত করি।

```python
{expected_time} সময়ে {asset}-এর মান কী হবে বলে আপনি আশা করেন?

আপনার উত্তরটি দুই দশমিক স্থান পর্যন্ত রাউন্ড করা একটি একক সংখ্যা হিসেবে দিন,
অন্য কোনো লেখা ছাড়া।
    """
```

প্রম্পটের বাকি অংশ প্রত্যাশিত।

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

দুটি পুল পর্যালোচনা করুন এবং উভয় থেকে কোট সংগ্রহ করুন।

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

ভবিষ্যতের যে সময়বিন্দুর জন্য আমরা অনুমান চাই তা নির্ধারণ করুন এবং প্রম্পটটি তৈরি করুন।

### একটি LLM-এর সাথে ইন্টারফেসিং {#interface-llm}

এরপরে, আমরা একটি আসল LLM-কে প্রম্পট করি এবং একটি প্রত্যাশিত ভবিষ্যৎ মান পাই। আমি এই প্রোগ্রামটি OpenAI ব্যবহার করে লিখেছি, তাই আপনি যদি অন্য কোনো প্রদানকারী ব্যবহার করতে চান, তাহলে আপনাকে এটি অ্যাডজাস্ট করতে হবে।

1. একটি [OpenAI অ্যাকাউন্ট](https://auth.openai.com/create-account) পান

2. [অ্যাকাউন্টে ফান্ড যোগ করুন](https://platform.openai.com/settings/organization/billing/overview)—লেখার সময় ন্যূনতম পরিমাণ হল $5

3. [একটি API কী তৈরি করুন](https://platform.openai.com/settings/organization/api-keys)

4. কমান্ড লাইনে, API কী এক্সপোর্ট করুন যাতে আপনার প্রোগ্রাম এটি ব্যবহার করতে পারে

   ```sh
   export OPENAI_API_KEY=sk-<কী-এর বাকি অংশ এখানে দিন>
   ```

5. এজেন্টটি চেকআউট করুন এবং চালান

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

এখানে নতুন কোডটি দেওয়া হলো।

```python
from openai import OpenAI

open_ai = OpenAI()  # ক্লায়েন্ট OPENAI_API_KEY এনভায়রনমেন্ট ভেরিয়েবল পড়ে
```

OpenAI API ইম্পোর্ট এবং ইনস্ট্যানশিয়েট করুন।

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

প্রতিক্রিয়া তৈরি করতে OpenAI API (`open_ai.chat.completions.create`) কল করুন।

```python
expected_price = Decimal(response.choices[0].message.content.strip())
current_price = wethusdc_quotes[-1].price

print ("বর্তমান মূল্য:", wethusdc_quotes[-1].price)
print(f"{future_time}-এ, প্রত্যাশিত মূল্য: {expected_price} USD")

if (expected_price > current_price):
    print(f"কিনুন, আমি আশা করি মূল্য {expected_price - current_price} USD বাড়বে")
else:
    print(f"বিক্রি করুন, আমি আশা করি মূল্য {current_price - expected_price} USD কমবে")
```

মূল্যটি আউটপুট করুন এবং একটি কেনা বা বেচার সুপারিশ প্রদান করুন।

#### ভবিষ্যদ্বাণী পরীক্ষা করা {#testing-the-predictions}

এখন যেহেতু আমরা ভবিষ্যদ্বাণী তৈরি করতে পারি, আমরা ঐতিহাসিক ডেটা ব্যবহার করে মূল্যায়ন করতে পারি যে আমরা দরকারী ভবিষ্যদ্বাণী তৈরি করছি কিনা।

```sh
uv run test-predictor.py
```

প্রত্যাশিত ফলাফলটি অনেকটা এইরকম:

```
2026-01-05T19:50-এর জন্য ভবিষ্যদ্বাণী: ভবিষ্যদ্বাণী 3138.93 USD, আসল 3218.92 USD, ত্রুটি 79.99 USD
2026-01-06T19:56-এর জন্য ভবিষ্যদ্বাণী: ভবিষ্যদ্বাণী 3243.39 USD, আসল 3221.08 USD, ত্রুটি 22.31 USD
2026-01-07T20:02-এর জন্য ভবিষ্যদ্বাণী: ভবিষ্যদ্বাণী 3223.24 USD, আসল 3146.89 USD, ত্রুটি 76.35 USD
2026-01-08T20:11-এর জন্য ভবিষ্যদ্বাণী: ভবিষ্যদ্বাণী 3150.47 USD, আসল 3092.04 USD, ত্রুটি 58.43 USD
.
.
.
2026-01-31T22:33-এর জন্য ভবিষ্যদ্বাণী: ভবিষ্যদ্বাণী 2637.73 USD, আসল 2417.77 USD, ত্রুটি 219.96 USD
2026-02-01T22:41-এর জন্য ভবিষ্যদ্বাণী: ভবিষ্যদ্বাণী 2381.70 USD, আসল 2318.84 USD, ত্রুটি 62.86 USD
2026-02-02T22:49-এর জন্য ভবিষ্যদ্বাণী: ভবিষ্যদ্বাণী 2234.91 USD, আসল 2349.28 USD, ত্রুটি 114.37 USD
29টি ভবিষ্যদ্বাণীর উপর গড় ভবিষ্যদ্বাণীর ত্রুটি: 83.87103448275862068965517241 USD
প্রতি সুপারিশে গড় পরিবর্তন: 4.787931034482758620689655172 USD
পরিবর্তনের স্ট্যান্ডার্ড ভ্যারিয়েন্স: 104.42 USD
লাভজনক দিন: 51.72%
লোকসানের দিন: 48.28%
```

পরীক্ষকের বেশিরভাগ অংশ এজেন্টের সাথে অভিন্ন, কিন্তু এখানে নতুন বা পরিবর্তিত অংশগুলি রয়েছে।

```python
CYCLES_FOR_TEST = 40 # ব্যাকটেস্টের জন্য, আমরা কতগুলি চক্র পরীক্ষা করি

# অনেক কোট পান
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

আমরা `CYCLES_FOR_TEST` (এখানে 40 হিসাবে নির্দিষ্ট) দিন পিছনে দেখি।

```python
# ভবিষ্যদ্বাণী তৈরি করুন এবং বাস্তব ইতিহাসের সাথে তাদের পরীক্ষা করুন

total_error = Decimal(0)
changes = []
```

দুই ধরনের ত্রুটি আছে যা নিয়ে আমরা আগ্রহী। প্রথমটি, `total_error`, হল ভবিষ্যদ্বাণীকারীর করা ত্রুটিগুলির সমষ্টি।

দ্বিতীয়টি, `changes`, বোঝার জন্য, আমাদের এজেন্টের উদ্দেশ্য মনে রাখতে হবে। এটি WETH/USDC অনুপাত (ETH মূল্য) ভবিষ্যদ্বাণী করার জন্য নয়। এটি বিক্রয় এবং কেনার সুপারিশ জারি করার জন্য। যদি বর্তমানে মূল্য $2000 হয় এবং এটি আগামীকাল $2010 ভবিষ্যদ্বাণী করে, তাহলে আসল ফলাফল যদি $2020 হয় এবং আমরা অতিরিক্ত অর্থ উপার্জন করি তবে আমরা কিছু মনে করি না। কিন্তু আমরা _অবশ্যই_ কিছু মনে করি যদি এটি $2010 ভবিষ্যদ্বাণী করে, এবং সেই সুপারিশের ভিত্তিতে ETH কিনে, এবং দাম $1990-এ নেমে যায়।

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

আমরা কেবল সেইসব ক্ষেত্রে দেখতে পারি যেখানে সম্পূর্ণ ইতিহাস (ভবিষ্যদ্বাণীর জন্য ব্যবহৃত মান এবং এটির সাথে তুলনা করার জন্য বাস্তব-বিশ্বের মান) উপলব্ধ রয়েছে। এর মানে হল যে নতুনতম কেসটি অবশ্যই `CYCLES_BACK` আগে শুরু হয়েছে।

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

এজেন্ট যে সংখ্যক নমুনা ব্যবহার করে সেই একই সংখ্যক নমুনা পেতে [স্লাইস](https://www.w3schools.com/python/ref_func_slice.asp) ব্যবহার করুন। এখানে এবং পরবর্তী সেগমেন্টের মধ্যে কোডটি এজেন্টে আমাদের থাকা একই get-a-prediction কোড।

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

ভবিষ্যদ্বাণী করা মূল্য, আসল মূল্য এবং ভবিষ্যদ্বাণীর সময়ের মূল্য পান। সুপারিশটি কেনার নাকি বেচার ছিল তা নির্ধারণ করার জন্য আমাদের ভবিষ্যদ্বাণীর সময়ের মূল্য প্রয়োজন।

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"{prediction_time}-এর জন্য ভবিষ্যদ্বাণী: ভবিষ্যদ্বাণী {predicted_price} USD, আসল {real_price} USD, ত্রুটি {error} USD")
```

ত্রুটি নির্ণয় করুন, এবং এটিকে মোটের সাথে যোগ করুন।

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

`changes`-এর জন্য, আমরা এক ETH কেনা বা বেচার আর্থিক প্রভাব চাই। তাই প্রথমে, আমাদের সুপারিশটি নির্ধারণ করতে হবে, তারপর আসল মূল্য কীভাবে পরিবর্তিত হয়েছে তা মূল্যায়ন করতে হবে এবং সুপারিশটি লাভজনক ছিল (ধনাত্মক পরিবর্তন) নাকি লোকসানের কারণ হয়েছিল (ঋণাত্মক পরিবর্তন)।

```python
print (f"{len(wethusdc_quotes)-CYCLES_BACK}টি ভবিষ্যদ্বাণীর উপর গড় ভবিষ্যদ্বাণীর ত্রুটি: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"প্রতি সুপারিশে গড় পরিবর্তন: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"পরিবর্তনের স্ট্যান্ডার্ড ভ্যারিয়েন্স: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

ফলাফলগুলি রিপোর্ট করুন।

```python
print (f"লাভজনক দিন: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"লোকসানের দিন: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

লাভজনক দিন এবং লোকসানের দিনের সংখ্যা গণনা করতে [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) ব্যবহার করুন। ফলাফল একটি ফিল্টার অবজেক্ট, যা আমাদের দৈর্ঘ্য পেতে একটি তালিকায় রূপান্তর করতে হবে।

### লেনদেন জমা দেওয়া {#submit-txn}

এখন আমাদের আসলে লেনদেন জমা দিতে হবে। তবে, সিস্টেমটি প্রমাণিত হওয়ার আগে আমি এই মুহূর্তে আসল টাকা খরচ করতে চাই না। পরিবর্তে, আমরা মেইননেটের একটি স্থানীয় ফর্ক তৈরি করব এবং সেই নেটওয়ার্কে "ট্রেড" করব।

এখানে একটি স্থানীয় ফর্ক তৈরি এবং ট্রেডিং সক্ষম করার ধাপগুলি দেওয়া হল।

1. [Foundry](https://getfoundry.sh/introduction/installation) ইনস্টল করুন

2. [`anvil`](https://getfoundry.sh/anvil/overview) শুরু করুন

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` Foundry-এর ডিফল্ট URL, http://localhost:8545-এ লিসেন করছে, তাই ব্লকচেইন ম্যানিপুলেট করার জন্য আমরা যে [`cast` কমান্ড](https://getfoundry.sh/cast/overview) ব্যবহার করি তার জন্য URL নির্দিষ্ট করার প্রয়োজন নেই।

3. `anvil`-এ চালানোর সময়, দশটি টেস্ট অ্যাকাউন্ট থাকে যেগুলোতে ETH আছে—প্রথমটির জন্য এনভায়রনমেন্ট ভেরিয়েবল সেট করুন

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. এগুলো হল কন্ট্র্যাক্ট যা আমাদের ব্যবহার করতে হবে। [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) হল Uniswap v3 কন্ট্র্যাক্ট যা আমরা আসলে ট্রেড করতে ব্যবহার করি। আমরা সরাসরি পুলের মাধ্যমে ট্রেড করতে পারতাম, কিন্তু এটি অনেক সহজ।

   নীচের দুটি ভেরিয়েবল হল WETH এবং USDC-এর মধ্যে সোয়াপ করার জন্য প্রয়োজনীয় Uniswap v3 পাথ।

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. প্রতিটি টেস্ট অ্যাকাউন্টে 10,000 ETH আছে। ট্রেডিংয়ের জন্য 1000 WETH পেতে 1000 ETH র‍্যাপ করতে WETH কন্ট্র্যাক্ট ব্যবহার করুন।

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. `SwapRouter` ব্যবহার করে 500 WETH ট্রেড করে USDC নিন।

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   `approve` কল একটি অ্যালাওয়েন্স তৈরি করে যা `SwapRouter`-কে আমাদের কিছু টোকেন খরচ করার অনুমতি দেয়। কন্ট্র্যাক্টগুলি ইভেন্টগুলি নিরীক্ষণ করতে পারে না, তাই যদি আমরা সরাসরি `SwapRouter` কন্ট্র্যাক্টে টোকেন স্থানান্তর করি, তবে এটি জানতে পারবে না যে এটি পরিশোধ করা হয়েছে। পরিবর্তে, আমরা `SwapRouter` কন্ট্র্যাক্টকে একটি নির্দিষ্ট পরিমাণ খরচ করার অনুমতি দিই, এবং তারপর `SwapRouter` এটি করে। এটি `SwapRouter` দ্বারা কল করা একটি ফাংশনের মাধ্যমে করা হয়, তাই এটি জানে যে এটি সফল হয়েছে কিনা।

7. আপনার কাছে উভয় টোকেন পর্যাপ্ত পরিমাণে আছে কিনা তা যাচাই করুন।

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

এখন যেহেতু আমাদের কাছে WETH এবং USDC আছে, আমরা আসলে এজেন্টটি চালাতে পারি।

```sh
git checkout 05-trade
uv run agent.py
```

আউটপুটটি দেখতে অনেকটা এইরকম হবে:

```
(ai-trading-agent) qbzzt@Ori-Cloudnomics:~/260215-ai-agent$ uv run agent.py
বর্তমান মূল্য: 1843.16
2026-02-06T23:07-এ, প্রত্যাশিত মূল্য: 1724.41 USD
ট্রেডের আগে অ্যাকাউন্টের ব্যালেন্স:
USDC ব্যালেন্স: 927301.578272
WETH ব্যালেন্স: 500
বিক্রি করুন, আমি আশা করি মূল্য 118.75 USD কমবে
অনুমোদন লেনদেন পাঠানো হয়েছে: 74e367ddbb407c1aaf567d87aa5863049991b1d2aa092b6b85195d925e2bd41f
অনুমোদন লেনদেন মাইনিং করা হয়েছে।
বিক্রয় লেনদেন পাঠানো হয়েছে: fad1bcf938585c9e90364b26ac7a80eea9efd34c37e5db81e58d7655bcae28bf
বিক্রয় লেনদেন মাইনিং করা হয়েছে।
ট্রেডের পরে অ্যাকাউন্টের ব্যালেন্স:
USDC ব্যালেন্স: 929143.797116
WETH ব্যালেন্স: 499
```

এটি আসলে ব্যবহার করার জন্য, আপনাকে কয়েকটি ছোট পরিবর্তন করতে হবে।

- লাইন 14-এ, `MAINNET_URL` পরিবর্তন করে একটি বাস্তব অ্যাক্সেস পয়েন্ট, যেমন `https://eth.drpc.org`-এ দিন
- লাইন 28-এ, `PRIVATE_KEY` পরিবর্তন করে আপনার নিজের প্রাইভেট কী দিন
- যদি না আপনি খুব ধনী হন এবং একটি অপ্রমাণিত এজেন্টের জন্য প্রতিদিন 1 ETH কিনতে বা বিক্রি করতে পারেন, তাহলে আপনি `WETH_TRADE_AMOUNT` কমাতে 29 পরিবর্তন করতে চাইতে পারেন

#### কোড ব্যাখ্যা {#trading-code}

এখানে নতুন কোডটি দেওয়া হলো।

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

ধাপ 4-এ আমরা যে একই ভেরিয়েবল ব্যবহার করেছি।

```python
WETH_TRADE_AMOUNT=1
```

ট্রেড করার পরিমাণ।

```python
ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... },
    { "name": "balanceOf", ...},
    { "name": "approve", ...}
]
```

আসলে ট্রেড করার জন্য, আমাদের `approve` ফাংশন প্রয়োজন। আমরা আগে এবং পরে ব্যালেন্সও দেখাতে চাই, তাই আমাদের `balanceOf` ও প্রয়োজন।

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

`SwapRouter` ABI-তে আমাদের শুধু `exactInput` প্রয়োজন। একটি সম্পর্কিত ফাংশন আছে, `exactOutput`, যা আমরা ঠিক একটি WETH কেনার জন্য ব্যবহার করতে পারতাম, কিন্তু সরলতার জন্য আমরা উভয় ক্ষেত্রে `exactInput` ব্যবহার করি।

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

[`account`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) এবং `SwapRouter` কন্ট্র্যাক্টের জন্য Web3 সংজ্ঞা।

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

লেনদেনের প্যারামিটার। এখানে আমাদের একটি ফাংশন প্রয়োজন কারণ [নন্স](https://en.wikipedia.org/wiki/Cryptographic_nonce) প্রতিবার পরিবর্তন হতে হবে।

```python
def approve_token(contract: Contract, amount: int):
```

`SwapRouter`-এর জন্য একটি টোকেন অ্যালাওয়েন্স অনুমোদন করুন।

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

এভাবে আমরা Web3-এ একটি লেনদেন পাঠাই। প্রথমে আমরা লেনদেন তৈরি করতে [`Contract` অবজেক্ট](https://web3py.readthedocs.io/en/stable/web3.contract.html) ব্যবহার করি। তারপর আমরা `PRIVATE_KEY` ব্যবহার করে লেনদেন সাইন করতে [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) ব্যবহার করি। অবশেষে, আমরা লেনদেন পাঠাতে [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) ব্যবহার করি।

```python
    print(f"অনুমোদন লেনদেন পাঠানো হয়েছে: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("অনুমোদন লেনদেন মাইনিং করা হয়েছে।")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) লেনদেন মাইনিং না হওয়া পর্যন্ত অপেক্ষা করে। প্রয়োজন হলে এটি রসিদ প্রদান করে।

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

WETH বিক্রি করার সময় এইগুলি হল প্যারামিটার।

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

`SELL_PARAMS`-এর বিপরীতে, কেনার প্যারামিটারগুলি পরিবর্তন হতে পারে। ইনপুট পরিমাণ হল 1 WETH-এর খরচ, যা `quote`-এ উপলব্ধ।

```python
def buy(quote: Quote):
    buy_params = make_buy_params(quote)
    approve_token(wethusdc_pool.token0.contract, buy_params["amountIn"])
    txn = swap_router.functions.exactInput(buy_params).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"কেনার লেনদেন পাঠানো হয়েছে: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("কেনার লেনদেন মাইনিং করা হয়েছে।")


def sell():
    approve_token(wethusdc_pool.token1.contract,
                  WETH_TRADE_AMOUNT * 10**wethusdc_pool.token1.decimals)
    txn = swap_router.functions.exactInput(SELL_PARAMS).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"বিক্রয় লেনদেন পাঠানো হয়েছে: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("বিক্রয় লেনদেন মাইনিং করা হয়েছে।")
```

`buy()` এবং `sell()` ফাংশনগুলি প্রায় অভিন্ন। প্রথমে আমরা `SwapRouter`-এর জন্য একটি পর্যাপ্ত অ্যালাওয়েন্স অনুমোদন করি এবং তারপর আমরা সঠিক পাথ এবং পরিমাণ দিয়ে এটি কল করি।

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} ব্যালেন্স: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} ব্যালেন্স: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

উভয় মুদ্রায় ব্যবহারকারীর ব্যালেন্স রিপোর্ট করুন।

```python
print("ট্রেডের আগে অ্যাকাউন্টের ব্যালেন্স:")
balances()

if (expected_price > current_price):
    print(f"কিনুন, আমি আশা করি মূল্য {expected_price - current_price} USD বাড়বে")
    buy(wethusdc_quotes[-1])
else:
    print(f"বিক্রি করুন, আমি আশা করি মূল্য {current_price - expected_price} USD কমবে")
    sell()

print("ট্রেডের পরে অ্যাকাউন্টের ব্যালেন্স:")
balances()
```

এই এজেন্ট বর্তমানে শুধুমাত্র একবার কাজ করে। তবে, আপনি এটিকে [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) থেকে চালিয়ে বা একটি লুপে 368-400 লাইনগুলি র‍্যাপ করে এবং পরবর্তী চক্রের জন্য অপেক্ষা করার জন্য [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) ব্যবহার করে ক্রমাগত কাজ করার জন্য পরিবর্তন করতে পারেন।

## সম্ভাব্য উন্নতি {#improvements}

এটি একটি সম্পূর্ণ প্রোডাকশন সংস্করণ নয়; এটি শুধুমাত্র মূল বিষয়গুলি শেখানোর জন্য একটি উদাহরণ। এখানে উন্নতির জন্য কিছু ধারণা দেওয়া হল।

### স্মার্ট ট্রেডিং {#smart-trading}

দুটি গুরুত্বপূর্ণ তথ্য রয়েছে যা এজেন্ট কী করতে হবে তা সিদ্ধান্ত নেওয়ার সময় উপেক্ষা করে।

- _প্রত্যাশিত পরিবর্তনের মাত্রা_। মূল্য হ্রাসের মাত্রা নির্বিশেষে, যদি মূল্য হ্রাসের প্রত্যাশা করা হয় তবে এজেন্ট একটি নির্দিষ্ট পরিমাণ `WETH` বিক্রি করে।
  যুক্তিযুক্তভাবে, ছোটখাটো পরিবর্তন উপেক্ষা করা এবং আমরা কতটা মূল্য হ্রাসের প্রত্যাশা করি তার উপর ভিত্তি করে বিক্রি করা ভাল হবে।
- _বর্তমান পোর্টফোলিও_। যদি আপনার পোর্টফোলিওর 10% WETH-এ থাকে এবং আপনি মনে করেন দাম বাড়বে, তাহলে সম্ভবত আরও কেনা যুক্তিযুক্ত। কিন্তু যদি আপনার পোর্টফোলিওর 90% WETH-এ থাকে, তাহলে আপনি যথেষ্ট এক্সপোজড হতে পারেন, এবং আরও কেনার প্রয়োজন নেই। আপনি যদি দাম কমার আশা করেন তবে এর বিপরীতটি সত্য।

### আপনি যদি আপনার ট্রেডিং কৌশল গোপন রাখতে চান তাহলে কী হবে? {#secret}

AI বিক্রেতারা তাদের LLM-গুলিতে আপনার পাঠানো কোয়েরিগুলি দেখতে পারে, যা আপনার এজেন্টের সাথে আপনি যে জিনিয়াস ট্রেডিং সিস্টেম তৈরি করেছেন তা প্রকাশ করতে পারে। একটি ট্রেডিং সিস্টেম যা অনেক লোক ব্যবহার করে তা মূল্যহীন কারণ যখন আপনি কিনতে চান তখন অনেক লোক কেনার চেষ্টা করে (এবং দাম বেড়ে যায়) এবং যখন আপনি বিক্রি করতে চান তখন বিক্রি করার চেষ্টা করে (এবং দাম কমে যায়)।

এই সমস্যা এড়াতে আপনি স্থানীয়ভাবে একটি LLM চালাতে পারেন, উদাহরণস্বরূপ, [LM-Studio](https://lmstudio.ai/) ব্যবহার করে।

### AI বট থেকে AI এজেন্ট {#bot-to-agent}

আপনি একটি ভাল যুক্তি দিতে পারেন যে এটি [একটি AI বট, AI এজেন্ট নয়](/ai-agents/#ai-agents-vs-ai-bots)। এটি একটি তুলনামূলকভাবে সহজ কৌশল বাস্তবায়ন করে যা পূর্বনির্ধারিত তথ্যের উপর নির্ভর করে। আমরা স্ব-উন্নতি সক্ষম করতে পারি, উদাহরণস্বরূপ, Uniswap v3 পুল এবং তাদের সর্বশেষ মানগুলির একটি তালিকা প্রদান করে এবং জিজ্ঞাসা করে কোন সংমিশ্রণের সেরা ভবিষ্যদ্বাণীমূলক মান রয়েছে।

### স্লিপেজ সুরক্ষা {#slippage-protection}

বর্তমানে কোনো [স্লিপেজ সুরক্ষা](https://uniswapv3book.com/milestone_3/slippage-protection.html) নেই। যদি বর্তমান কোট $2000 হয় এবং প্রত্যাশিত মূল্য $2100 হয়, এজেন্ট কিনবে। তবে, এজেন্ট কেনার আগে যদি খরচ $2200-এ বেড়ে যায়, তবে আর কেনার কোনো মানে হয় না।

স্লিপেজ সুরক্ষা বাস্তবায়ন করতে, [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325)-এর 325 এবং 334 লাইনে একটি `amountOutMinimum` মান নির্দিষ্ট করুন।

## উপসংহার {#conclusion}

আশা করি, এখন আপনি AI এজেন্টদের সাথে শুরু করার জন্য যথেষ্ট জানেন। এটি বিষয়টির একটি ব্যাপক ওভারভিউ নয়; এর জন্য পুরো বই উৎসর্গ করা হয়েছে, তবে এটি আপনাকে শুরু করার জন্য যথেষ্ট। শুভকামনা!

[আমার আরও কাজের জন্য এখানে দেখুন](https://cryptodocguy.pro/)।
