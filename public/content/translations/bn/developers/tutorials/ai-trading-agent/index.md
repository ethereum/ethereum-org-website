---
title: "ইথিরিয়ামে আপনার নিজস্ব AI ট্রেডিং এজেন্ট তৈরি করুন"
description: "এই টিউটোরিয়ালে আপনি শিখবেন কীভাবে একটি সাধারণ AI ট্রেডিং এজেন্ট তৈরি করতে হয়। এই এজেন্ট ব্লকচেইন থেকে তথ্য পড়ে, সেই তথ্যের উপর ভিত্তি করে একটি LLM-এর কাছে সুপারিশ চায়, LLM-এর সুপারিশ অনুযায়ী ট্রেড করে এবং তারপর অপেক্ষা করে ও পুনরাবৃত্তি করে।"
author: "ওরি পোমেরান্টজ"
tags: ["AI", "ট্রেডিং", "এজেন্ট", "Python"]
skill: intermediate
breadcrumb: "AI ট্রেডিং এজেন্ট"
published: 2026-02-13
lang: bn
sidebarDepth: 3
---

এই টিউটোরিয়ালে আপনি শিখবেন কীভাবে একটি সাধারণ AI ট্রেডিং এজেন্ট তৈরি করতে হয়। এই এজেন্ট নিচের ধাপগুলো ব্যবহার করে কাজ করে:

1. একটি টোকেন-এর বর্তমান এবং অতীতের দাম, সেইসাথে অন্যান্য সম্ভাব্য প্রাসঙ্গিক তথ্য পড়া
2. এই তথ্যগুলোর সাথে ব্যাকগ্রাউন্ড তথ্য যুক্ত করে একটি কোয়েরি তৈরি করা, যাতে বোঝানো যায় এটি কীভাবে প্রাসঙ্গিক হতে পারে
3. কোয়েরি জমা দেওয়া এবং একটি সম্ভাব্য দাম ফেরত পাওয়া
4. সুপারিশের উপর ভিত্তি করে ট্রেড করা
5. অপেক্ষা করা এবং পুনরাবৃত্তি করা

এই এজেন্টটি দেখায় কীভাবে তথ্য পড়তে হয়, সেটিকে একটি কোয়েরিতে রূপান্তর করতে হয় যা একটি ব্যবহারযোগ্য উত্তর দেয় এবং সেই উত্তরটি ব্যবহার করতে হয়। এগুলোর সবগুলোই একটি AI এজেন্টের জন্য প্রয়োজনীয় ধাপ। এই এজেন্টটি Python-এ তৈরি করা হয়েছে কারণ এটি AI-তে ব্যবহৃত সবচেয়ে সাধারণ ভাষা।

## এটি কেন করবেন? {#why-do-this}

স্বয়ংক্রিয় ট্রেডিং এজেন্ট ডেভেলপারদের একটি ট্রেডিং কৌশল নির্বাচন এবং কার্যকর করার সুযোগ দেয়। [AI এজেন্ট](/ai-agents) আরও জটিল এবং ডাইনামিক ট্রেডিং কৌশলের সুযোগ দেয়, যা সম্ভাব্যভাবে এমন তথ্য এবং এ্যালগরিদম ব্যবহার করে যা ডেভেলপার হয়তো ব্যবহারের কথা ভাবেনওনি।

## টুলস {#tools}

এই টিউটোরিয়ালে কোট (quotes) এবং ট্রেডিংয়ের জন্য [Python](https://www.python.org/), [Web3 লাইব্রেরি](https://web3py.readthedocs.io/en/stable/) এবং [Uniswap v3](https://github.com/Uniswap/v3-periphery) ব্যবহার করা হয়েছে।

### কেন Python? {#python}

AI-এর জন্য সবচেয়ে বেশি ব্যবহৃত ভাষা হলো [Python](https://www.python.org/), তাই আমরা এখানে এটি ব্যবহার করছি। আপনি যদি Python না জানেন তবে চিন্তা করবেন না। ভাষাটি খুব স্পষ্ট, এবং এটি ঠিক কী করে তা আমি ব্যাখ্যা করব।

[Web3 লাইব্রেরি](https://web3py.readthedocs.io/en/stable/) হলো সবচেয়ে সাধারণ Python ইথিরিয়াম API। এটি ব্যবহার করা বেশ সহজ।

### ব্লকচেইন-এ ট্রেডিং {#trading-on-blockchain}

এমন [অনেক ডিস্ট্রিবিউটেড এক্সচেঞ্জ (DEX)](/apps/categories/defi/) রয়েছে যা আপনাকে ইথিরিয়ামে টোকেন ট্রেড করতে দেয়। তবে, [আর্বিট্রেজ](/developers/docs/smart-contracts/composability/#better-user-experience)-এর কারণে এগুলোর এক্সচেঞ্জ রেট প্রায় একই রকম হয়ে থাকে।

[Uniswap](https://app.uniswap.org/) হলো একটি বহুল ব্যবহৃত DEX যা আমরা কোট (টোকেনের আপেক্ষিক মান দেখতে) এবং ট্রেড উভয়ের জন্যই ব্যবহার করতে পারি।

### OpenAI {#openai}

একটি লার্জ ল্যাঙ্গুয়েজ মডেলের জন্য, আমি [OpenAI](https://openai.com/) দিয়ে শুরু করার সিদ্ধান্ত নিয়েছি। এই টিউটোরিয়ালের অ্যাপ্লিকেশনটি চালানোর জন্য আপনাকে API অ্যাক্সেসের জন্য অর্থ প্রদান করতে হবে। ন্যূনতম $5 পেমেন্ট এর জন্য যথেষ্টর চেয়েও বেশি।

## ডেভেলপমেন্ট, ধাপে ধাপে {#step-by-step}

ডেভেলপমেন্ট সহজ করার জন্য, আমরা ধাপে ধাপে এগিয়ে যাব। প্রতিটি ধাপ হলো GitHub-এর একটি ব্রাঞ্চ।

### শুরু করা {#getting-started}

UNIX বা Linux-এর (যার মধ্যে [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) অন্তর্ভুক্ত) অধীনে শুরু করার জন্য কিছু ধাপ রয়েছে:

1. যদি আপনার কাছে আগে থেকে না থাকে, তবে [Python](https://www.python.org/downloads/) ডাউনলোড এবং ইনস্টল করুন।

2. GitHub রিপোজিটরি ক্লোন করুন।

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

5. ভার্চুয়াল এনভায়রনমেন্ট অ্যাক্টিভেট করুন।

   ```sh
   source .venv/bin/activate
   ```

6. Python এবং Web3 সঠিকভাবে কাজ করছে কিনা তা যাচাই করতে, `python3` রান করুন এবং এতে এই প্রোগ্রামটি দিন। আপনি এটি `>>>` প্রম্পটে লিখতে পারেন; কোনো ফাইল তৈরি করার প্রয়োজন নেই।

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### ব্লকচেইন থেকে পড়া {#read-blockchain}

পরবর্তী ধাপ হলো ব্লকচেইন থেকে পড়া। এটি করার জন্য, আপনাকে `02-read-quote` ব্রাঞ্চে যেতে হবে এবং তারপর প্রোগ্রামটি রান করতে `uv` ব্যবহার করতে হবে।

```sh
git checkout 02-read-quote
uv run agent.py
```

আপনি `Quote` অবজেক্টের একটি তালিকা পাবেন, যার প্রতিটিতে একটি টাইমস্ট্যাম্প, একটি দাম এবং অ্যাসেট (বর্তমানে সর্বদা `WETH/USDC`) থাকবে।

এখানে লাইন-বাই-লাইন ব্যাখ্যা দেওয়া হলো।

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

আমাদের প্রয়োজনীয় লাইব্রেরিগুলো ইমপোর্ট করুন। এগুলো যখন ব্যবহার করা হবে তখন নিচে ব্যাখ্যা করা হবে।

```python
print = functools.partial(print, flush=True)
```

Python-এর `print`-কে এমন একটি ভার্সন দিয়ে প্রতিস্থাপন করে যা সর্বদা আউটপুট সাথে সাথে ফ্লাশ করে। এটি একটি দীর্ঘ সময় ধরে চলা স্ক্রিপ্টে দরকারী কারণ আমরা স্ট্যাটাস আপডেট বা ডিবাগিং আউটপুটের জন্য অপেক্ষা করতে চাই না।

```python
MAINNET_URL = "https://eth.drpc.org"
```

মেইননেট-এ যাওয়ার জন্য একটি URL। আপনি [নোড অ্যাজ এ সার্ভিস](/developers/docs/nodes-and-clients/nodes-as-a-service/) থেকে একটি পেতে পারেন অথবা [Chainlist](https://chainlist.org/chain/1)-এ বিজ্ঞাপিত যেকোনো একটি ব্যবহার করতে পারেন।

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

একটি ইথিরিয়াম মেইননেট ব্লক সাধারণত প্রতি বারো সেকেন্ডে তৈরি হয়, তাই একটি নির্দিষ্ট সময়ের মধ্যে আমরা এই সংখ্যক ব্লক আশা করতে পারি। মনে রাখবেন যে এটি কোনো সঠিক সংখ্যা নয়। যখন [ব্লক প্রপোজার](/developers/docs/consensus-mechanisms/pos/block-proposal/) ডাউন থাকে, তখন সেই ব্লকটি বাদ দেওয়া হয় এবং পরবর্তী ব্লকের জন্য সময় হয় 24 সেকেন্ড। আমরা যদি একটি টাইমস্ট্যাম্পের জন্য সঠিক ব্লকটি পেতে চাই, তবে আমরা [বাইনারি সার্চ](https://en.wikipedia.org/wiki/Binary_search) ব্যবহার করব। তবে, আমাদের উদ্দেশ্যের জন্য এটি যথেষ্ট কাছাকাছি। ভবিষ্যৎবাণী করা কোনো নিখুঁত বিজ্ঞান নয়।

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

সাইকেলের আকার। আমরা প্রতি সাইকেলে একবার কোটগুলো পর্যালোচনা করি এবং পরবর্তী সাইকেলের শেষে মান অনুমান করার চেষ্টা করি।

```python
# আমরা যে পুলটি পড়ছি তার ঠিকানা
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

কোটের মানগুলো এডড্রেস [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract)-এ থাকা Uniswap 3 USDC/WETH পুল থেকে নেওয়া হয়েছে। এই এডড্রেসটি আগে থেকেই চেকসাম ফর্মে আছে, তবে কোডটি পুনরায় ব্যবহারযোগ্য করার জন্য [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address) ব্যবহার করা ভালো।

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

এগুলো হলো সেই দুটি কন্ট্রাক্টের [ABIs](https://docs.soliditylang.org/en/latest/abi-spec.html) যাদের সাথে আমাদের যোগাযোগ করতে হবে। কোডটি সংক্ষিপ্ত রাখার জন্য, আমরা কেবল সেই ফাংশনগুলো অন্তর্ভুক্ত করেছি যেগুলো আমাদের কল করতে হবে।

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

[`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) লাইব্রেরি ইনিশিয়েট করুন এবং একটি ইথিরিয়াম নোড-এর সাথে কানেক্ট করুন।

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

Python-এ ডেটা ক্লাস তৈরি করার এটি একটি উপায়। কন্ট্রাক্টের সাথে কানেক্ট করার জন্য [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) ডেটা টাইপ ব্যবহার করা হয়। `(frozen=True)` লক্ষ্য করুন। Python-এ [বুলিয়ানগুলো](https://en.wikipedia.org/wiki/Boolean_data_type) `True` বা `False` হিসেবে সংজ্ঞায়িত করা হয়, যার প্রথম অক্ষর বড় হাতের হয়। এই ডেটা ক্লাসটি `frozen`, যার মানে এর ফিল্ডগুলো পরিবর্তন করা যাবে না।

ইনডেন্টেশন লক্ষ্য করুন। [C-ভিত্তিক ভাষাগুলোর](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages) বিপরীতে, Python ব্লক বোঝাতে ইনডেন্টেশন ব্যবহার করে। Python ইন্টারপ্রেটার জানে যে পরবর্তী সংজ্ঞাটি এই ডেটা ক্লাসের অংশ নয় কারণ এটি ডেটা ক্লাসের ফিল্ডগুলোর মতো একই ইনডেন্টেশনে শুরু হয়নি।

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

দশমিক ভগ্নাংশগুলো সঠিকভাবে পরিচালনা করার জন্য [`Decimal`](https://docs.python.org/3/library/decimal.html) টাইপ ব্যবহার করা হয়।

```python
    def get_price(self, block: int) -> Decimal:
```

Python-এ একটি ফাংশন সংজ্ঞায়িত করার এটিই উপায়। সংজ্ঞাটি ইনডেন্ট করা হয়েছে যাতে বোঝা যায় এটি এখনও `PoolInfo`-এর অংশ।

একটি ডেটা ক্লাসের অংশ এমন একটি ফাংশনে প্রথম প্যারামিটারটি সর্বদা `self` হয়, যা ডেটা ক্লাসের ইনস্ট্যান্স যা এখানে কল করেছে। এখানে আরেকটি প্যারামিটার রয়েছে, ব্লক নম্বর।

```python
        assert block <= w3.eth.block_number, "Block is in the future"
```

আমরা যদি ভবিষ্যৎ পড়তে পারতাম, তবে ট্রেডিংয়ের জন্য আমাদের AI-এর প্রয়োজন হতো না।

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

Web3 থেকে ইথিরিয়াম ভার্চুয়াল মেশিন-এ একটি ফাংশন কল করার সিনট্যাক্স হলো: `<contract object>.functions.<function name>().call(<parameters>)`। প্যারামিটারগুলো ইথিরিয়াম ভার্চুয়াল মেশিন ফাংশনের প্যারামিটার হতে পারে (যদি থাকে; এখানে নেই) অথবা ব্লকচেইন আচরণ পরিবর্তন করার জন্য [নেমড প্যারামিটার](https://en.wikipedia.org/wiki/Named_parameter) হতে পারে। এখানে আমরা একটি ব্যবহার করেছি, `block_identifier`, যা দিয়ে আমরা যে [ব্লক নম্বর](/developers/docs/apis/json-rpc/#default-block)-এ রান করতে চাই তা নির্দিষ্ট করি।

ফলাফল হলো [এই স্ট্রাক্ট, অ্যারে ফর্মে](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72)। প্রথম মানটি হলো দুটি টোকেন-এর মধ্যে এক্সচেঞ্জ রেটের একটি ফাংশন।

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

অনচেইন হিসাব কমানোর জন্য, Uniswap v3 প্রকৃত এক্সচেঞ্জ ফ্যাক্টর সংরক্ষণ করে না বরং এর বর্গমূল সংরক্ষণ করে। যেহেতু ইথিরিয়াম ভার্চুয়াল মেশিন ফ্লোটিং পয়েন্ট গণিত বা ভগ্নাংশ সমর্থন করে না, তাই প্রকৃত মানের পরিবর্তে, রেসপন্স হলো <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5;</mo><msup><mn>2</mn><mn>96</mn></msup></math>

```python
         # (প্রতি token0-এর জন্য token1)
        return 1/(raw_price * self.decimal_factor)
```

আমরা যে র (raw) দাম পাই তা হলো প্রতিটি `token1`-এর জন্য আমরা কতগুলো `token0` পাই। আমাদের পুলে `token0` হলো USDC (স্টেবলকয়েন যার মান একটি ইউএস ডলারের সমান) এবং `token1` হলো [WETH](https://opensea.io/learn/blockchain/what-is-weth)। আমরা আসলে যে মানটি চাই তা হলো প্রতি WETH-এর জন্য ডলারের সংখ্যা, এর বিপরীতটি নয়।

ডেসিমাল ফ্যাক্টর হলো দুটি টোকেন-এর [ডেসিমাল ফ্যাক্টরগুলোর](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) মধ্যকার অনুপাত।

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

এই ডেটা ক্লাসটি একটি কোট উপস্থাপন করে: একটি নির্দিষ্ট সময়ে একটি নির্দিষ্ট অ্যাসেটের দাম। এই মুহূর্তে, `asset` ফিল্ডটি অপ্রাসঙ্গিক কারণ আমরা একটি একক পুল ব্যবহার করি এবং তাই আমাদের একটি একক অ্যাসেট রয়েছে। তবে, আমরা পরে আরও অ্যাসেট যোগ করব।

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

এই ফাংশনটি একটি এডড্রেস নেয় এবং সেই এডড্রেস-এ থাকা টোকেন কন্ট্রাক্ট সম্পর্কে তথ্য ফেরত দেয়। একটি নতুন [Web3 `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) তৈরি করতে, আমরা `w3.eth.contract`-এ এডড্রেস এবং ABI প্রদান করি।

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

এই ফাংশনটি [একটি নির্দিষ্ট পুল](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol) সম্পর্কে আমাদের প্রয়োজনীয় সবকিছু ফেরত দেয়। `f"<string>"` সিনট্যাক্সটি হলো একটি [ফরম্যাটেড স্ট্রিং](https://docs.python.org/3/reference/lexical_analysis.html#f-strings)।

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

একটি `Quote` অবজেক্ট পান। `block_number`-এর ডিফল্ট মান হলো `None` (কোনো মান নেই)।

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

যদি কোনো ব্লক নম্বর নির্দিষ্ট করা না থাকে, তবে `w3.eth.block_number` ব্যবহার করুন, যা হলো সর্বশেষ ব্লক নম্বর। এটি [একটি `if` স্টেটমেন্টের](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement) সিনট্যাক্স।

এটি দেখে মনে হতে পারে যে ডিফল্ট হিসেবে শুধু `w3.eth.block_number` সেট করা ভালো হতো, কিন্তু এটি ভালোভাবে কাজ করে না কারণ এটি ফাংশনটি সংজ্ঞায়িত করার সময়ের ব্লক নম্বর হবে। একটি দীর্ঘ সময় ধরে চলা এজেন্টে, এটি একটি সমস্যা হবে।

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

মানুষ এবং লার্জ ল্যাঙ্গুয়েজ মডেলগুলোর (LLMs) পড়ার উপযোগী একটি ফরম্যাটে এটি ফরম্যাট করতে [`datetime` লাইব্রেরি](https://docs.python.org/3/library/datetime.html) ব্যবহার করুন। মানটিকে দুই দশমিক স্থান পর্যন্ত রাউন্ড করতে [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize) ব্যবহার করুন।

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

Python-এ আপনি `list[<type>]` ব্যবহার করে এমন একটি [লিস্ট](https://docs.python.org/3/library/stdtypes.html#typesseq-list) সংজ্ঞায়িত করতে পারেন যা কেবল একটি নির্দিষ্ট টাইপ ধারণ করতে পারে।

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

Python-এ একটি [`for` লুপ](https://docs.python.org/3/tutorial/controlflow.html#for-statements) সাধারণত একটি লিস্টের উপর ইটারেট করে। কোটগুলো খোঁজার জন্য ব্লক নম্বরগুলোর লিস্ট [`range`](https://docs.python.org/3/library/stdtypes.html#range) থেকে আসে।

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

প্রতিটি ব্লক নম্বরের জন্য, একটি `Quote` অবজেক্ট পান এবং এটি `quotes` লিস্টে যুক্ত করুন। তারপর সেই লিস্টটি ফেরত দিন।

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

এটি স্ক্রিপ্টের মূল কোড। পুলের তথ্য পড়ুন, বারোটি কোট পান এবং সেগুলোকে [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint) করুন।

### একটি প্রম্পট তৈরি করা {#prompt}

এরপর, আমাদের কোটগুলোর এই লিস্টটিকে একটি LLM-এর জন্য প্রম্পটে রূপান্তর করতে হবে এবং একটি প্রত্যাশিত ভবিষ্যৎ মান পেতে হবে।

```sh
git checkout 03-create-prompt
uv run agent.py
```

আউটপুটটি এখন একটি LLM-এর জন্য প্রম্পট হতে যাচ্ছে, যা অনেকটা এরকম:

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

লক্ষ্য করুন যে এখানে দুটি অ্যাসেটের কোট রয়েছে, `WETH/USDC` এবং `WBTC/WETH`। অন্য একটি অ্যাসেট থেকে কোট যোগ করলে প্রেডিকশনের নির্ভুলতা উন্নত হতে পারে।

#### একটি প্রম্পট দেখতে কেমন হয় {#prompt-explanation}

এই প্রম্পটে তিনটি বিভাগ রয়েছে, যা LLM প্রম্পটগুলোতে বেশ সাধারণ।

1. তথ্য। LLM-গুলোর কাছে তাদের ট্রেনিং থেকে অনেক তথ্য থাকে, কিন্তু সাধারণত তাদের কাছে সর্বশেষ তথ্য থাকে না। এই কারণেই আমাদের এখানে সর্বশেষ কোটগুলো পুনরুদ্ধার করতে হবে। একটি প্রম্পটে তথ্য যোগ করাকে [রিট্রিভাল অগমেন্টেড জেনারেশন (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) বলা হয়।

2. আসল প্রশ্ন। এটিই আমরা জানতে চাই।

3. আউটপুট ফরম্যাটিং নির্দেশাবলী। সাধারণত, একটি LLM আমাদের একটি অনুমান দেবে এবং এটি কীভাবে সেখানে পৌঁছাল তার একটি ব্যাখ্যা দেবে। এটি মানুষের জন্য ভালো, কিন্তু একটি কম্পিউটার প্রোগ্রামের কেবল মূল ফলাফলটি প্রয়োজন।

#### কোড ব্যাখ্যা {#prompt-code}

এখানে নতুন কোড দেওয়া হলো।

```python
from datetime import datetime, timezone, timedelta
```

আমাদের LLM-কে সেই সময়টি প্রদান করতে হবে যার জন্য আমরা একটি অনুমান চাই। ভবিষ্যতে "n মিনিট/ঘণ্টা/দিন" সময় পেতে, আমরা [`timedelta` ক্লাস](https://docs.python.org/3/library/datetime.html#datetime.timedelta) ব্যবহার করি।

```python
# আমরা যে পুলগুলো পড়ছি সেগুলোর ঠিকানা
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

আমাদের দুটি পুল রয়েছে যা আমাদের পড়তে হবে।

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
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2 # (প্রতি token0-এর জন্য token1)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

WETH/USDC পুলে, আমরা জানতে চাই একটি `token1` (WETH) কিনতে আমাদের কতগুলো `token0` (USDC) প্রয়োজন। WETH/WBTC পুলে, আমরা জানতে চাই একটি `token0` (WBTC, যা হলো র‍্যাপড বিটকয়েন) কিনতে আমাদের কতগুলো `token1` (WETH) প্রয়োজন। পুলের অনুপাতটি উল্টানো দরকার কিনা তা আমাদের ট্র্যাক করতে হবে।

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

একটি পুল উল্টানো দরকার কিনা তা জানতে, আমরা সেটিকে `read_pool`-এর ইনপুট হিসেবে পাই। এছাড়াও, অ্যাসেট সিম্বলটি সঠিকভাবে সেট আপ করতে হবে।

`<a> if <b> else <c>` সিনট্যাক্সটি হলো [টার্নারি কন্ডিশনাল অপারেটরের](https://en.wikipedia.org/wiki/Ternary_conditional_operator) Python সমতুল্য, যা একটি C-ভিত্তিক ভাষায় `<b> ? <a> : <c>` হবে।

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

এই ফাংশনটি এমন একটি স্ট্রিং তৈরি করে যা `Quote` অবজেক্টের একটি লিস্ট ফরম্যাট করে, ধরে নেওয়া হয় যে সেগুলো সবই একই অ্যাসেটের ক্ষেত্রে প্রযোজ্য।

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

Python-এ [মাল্টি-লাইন স্ট্রিং লিটারেলগুলো](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) `"""` .... `"""` হিসেবে লেখা হয়।

```python
Given these quotes:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

এখানে, আমরা `format_quotes` দিয়ে প্রতিটি কোট লিস্টের জন্য একটি স্ট্রিং তৈরি করতে [MapReduce](https://en.wikipedia.org/wiki/MapReduce) প্যাটার্ন ব্যবহার করি, তারপর প্রম্পটে ব্যবহারের জন্য সেগুলোকে একটি একক স্ট্রিংয়ে রিডিউস করি।

```python
What would you expect the value for {asset} to be at time {expected_time}?

Provide your answer as a single number rounded to two decimal places,
without any other text.
    """
```

প্রম্পটের বাকি অংশ প্রত্যাশিত মতোই।

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

দুটি পুল পর্যালোচনা করুন এবং উভয়টি থেকে কোট সংগ্রহ করুন।

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

ভবিষ্যতের সেই সময় বিন্দুটি নির্ধারণ করুন যার জন্য আমরা অনুমান চাই এবং প্রম্পটটি তৈরি করুন।

### একটি LLM-এর সাথে ইন্টারফেসিং {#interface-llm}

এরপর, আমরা একটি আসল LLM-কে প্রম্পট করি এবং একটি প্রত্যাশিত ভবিষ্যৎ মান গ্রহণ করি। আমি OpenAI ব্যবহার করে এই প্রোগ্রামটি লিখেছি, তাই আপনি যদি অন্য কোনো প্রোভাইডার ব্যবহার করতে চান, তবে আপনাকে এটি সামঞ্জস্য করতে হবে।

1. একটি [OpenAI একাউন্ট](https://auth.openai.com/create-account) পান
2. [একাউন্টে ফান্ড যোগ করুন](https://platform.openai.com/settings/organization/billing/overview)—লেখার সময় ন্যূনতম পরিমাণ হলো $5
3. [একটি API কি তৈরি করুন](https://platform.openai.com/settings/organization/api-keys)
4. কমান্ড লাইনে, API কি এক্সপোর্ট করুন যাতে আপনার প্রোগ্রাম এটি ব্যবহার করতে পারে

   ```sh
   export OPENAI_API_KEY=sk-<the rest of the key goes here>
   ```

5. চেকআউট করুন এবং এজেন্ট রান করুন

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

এখানে নতুন কোড দেওয়া হলো।

```python
from openai import OpenAI

open_ai = OpenAI() # ক্লায়েন্ট OPENAI_API_KEY এনভায়রনমেন্ট ভেরিয়েবলটি পড়ে
```

OpenAI API ইমপোর্ট এবং ইনস্ট্যানশিয়েট করুন।

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

রেসপন্স তৈরি করতে OpenAI API (`open_ai.chat.completions.create`) কল করুন।

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

দাম আউটপুট করুন এবং একটি ক্রয় বা বিক্রয়ের সুপারিশ প্রদান করুন।

#### প্রেডিকশনগুলো পরীক্ষা করা {#testing-the-predictions}

যেহেতু এখন আমরা প্রেডিকশন তৈরি করতে পারি, তাই আমরা দরকারী প্রেডিকশন তৈরি করছি কিনা তা মূল্যায়ন করতে ঐতিহাসিক ডেটাও ব্যবহার করতে পারি।

```sh
uv run test-predictor.py
```

প্রত্যাশিত ফলাফল অনেকটা এরকম:

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

টেস্টারের বেশিরভাগ অংশই এজেন্টের মতো একই, তবে এখানে নতুন বা পরিবর্তিত অংশগুলো দেওয়া হলো।

```python
CYCLES_FOR_TEST = 40 # ব্যাকটেস্টের জন্য, আমরা কতগুলো সাইকেল ধরে টেস্ট করি

# প্রচুর কোট সংগ্রহ করুন
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

আমরা `CYCLES_FOR_TEST` (এখানে 40 হিসেবে নির্দিষ্ট করা হয়েছে) দিন পিছনের দিকে তাকাই।

```python
# পূর্বাভাস তৈরি করুন এবং প্রকৃত ইতিহাসের সাথে সেগুলো যাচাই করুন

total_error = Decimal(0)
changes = []
```

আমরা দুই ধরনের ত্রুটির প্রতি আগ্রহী। প্রথমটি, `total_error`, হলো প্রেডিক্টরের করা ত্রুটিগুলোর সাধারণ যোগফল।

দ্বিতীয়টি, `changes`, বোঝার জন্য আমাদের এজেন্টের উদ্দেশ্য মনে রাখতে হবে। এর উদ্দেশ্য WETH/USDC অনুপাত (ETH-এর দাম) প্রেডিক্ট করা নয়। এর উদ্দেশ্য হলো বিক্রয় এবং ক্রয়ের সুপারিশ জারি করা। যদি বর্তমানে দাম $2000 হয় এবং এটি আগামীকাল $2010 প্রেডিক্ট করে, তবে আসল ফলাফল $2020 হলে এবং আমরা অতিরিক্ত অর্থ উপার্জন করলে আমাদের কোনো আপত্তি নেই। কিন্তু আমরা _অবশ্যই_ আপত্তি করব যদি এটি $2010 প্রেডিক্ট করে, এবং সেই সুপারিশের ভিত্তিতে ETH কেনে, এবং দাম $1990-এ নেমে যায়।

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

আমরা কেবল সেই ক্ষেত্রগুলো দেখতে পারি যেখানে সম্পূর্ণ ইতিহাস (প্রেডিকশনের জন্য ব্যবহৃত মানগুলো এবং এর সাথে তুলনা করার জন্য বাস্তব-বিশ্বের মান) উপলব্ধ। এর মানে হলো সবচেয়ে নতুন ক্ষেত্রটি অবশ্যই সেটি হতে হবে যা `CYCLES_BACK` আগে শুরু হয়েছিল।

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

এজেন্ট যে সংখ্যক স্যাম্পল ব্যবহার করে ঠিক সেই সংখ্যক স্যাম্পল পেতে [স্লাইস](https://www.w3schools.com/python/ref_func_slice.asp) ব্যবহার করুন। এখান থেকে পরবর্তী সেগমেন্টের মধ্যবর্তী কোডটি এজেন্টে থাকা প্রেডিকশন পাওয়ার কোডের মতোই।

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

প্রেডিক্ট করা দাম, আসল দাম এবং প্রেডিকশনের সময়ের দাম পান। সুপারিশটি ক্রয় নাকি বিক্রয়ের ছিল তা নির্ধারণ করতে আমাদের প্রেডিকশনের সময়ের দাম প্রয়োজন।

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Prediction for {prediction_time}: predicted {predicted_price} USD, real {real_price} USD, error {error} USD")
```

ত্রুটিটি বের করুন এবং এটি মোটের সাথে যোগ করুন।

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

`changes`-এর জন্য, আমরা একটি ETH কেনা বা বেচার আর্থিক প্রভাব চাই। তাই প্রথমে, আমাদের সুপারিশটি নির্ধারণ করতে হবে, তারপর আসল দাম কীভাবে পরিবর্তিত হয়েছে তা মূল্যায়ন করতে হবে এবং সুপারিশটি অর্থ উপার্জন করেছে (ইতিবাচক পরিবর্তন) নাকি অর্থ ব্যয় করেছে (নেতিবাচক পরিবর্তন) তা দেখতে হবে।

```python
print (f"Mean prediction error over {len(wethusdc_quotes)-CYCLES_BACK} predictions: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Mean change per recommendation: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Standard variance of changes: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

ফলাফল রিপোর্ট করুন।

```python
print (f"Profitable days: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Losing days: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

লাভজনক দিনের সংখ্যা এবং ব্যয়বহুল দিনের সংখ্যা গণনা করতে [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) ব্যবহার করুন। ফলাফলটি একটি ফিল্টার অবজেক্ট, যার দৈর্ঘ্য পেতে আমাদের এটিকে একটি লিস্টে রূপান্তর করতে হবে।

### লেনদেন জমা দেওয়া {#submit-txn}

এখন আমাদের আসলে লেনদেন জমা দিতে হবে। তবে, সিস্টেমটি প্রমাণিত হওয়ার আগে, আমি এই মুহূর্তে আসল অর্থ ব্যয় করতে চাই না। এর পরিবর্তে, আমরা মেইননেট-এর একটি লোকাল ফর্ক তৈরি করব এবং সেই নেটওয়ার্ক-এ "ট্রেড" করব।

একটি লোকাল ফর্ক তৈরি এবং ট্রেডিং সক্ষম করার ধাপগুলো নিচে দেওয়া হলো।

1. [Foundry](https://getfoundry.sh/introduction/installation) ইনস্টল করুন

2. [`anvil`](https://getfoundry.sh/anvil/overview) শুরু করুন

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` Foundry-এর ডিফল্ট URL, http://localhost:8545-এ শুনছে, তাই ব্লকচেইন ম্যানিপুলেট করার জন্য আমরা যে [`cast` কমান্ড](https://getfoundry.sh/cast/overview) ব্যবহার করি তার জন্য আমাদের URL নির্দিষ্ট করার প্রয়োজন নেই।

3. `anvil`-এ রান করার সময়, দশটি টেস্ট একাউন্ট থাকে যেগুলোতে ETH আছে—প্রথমটির জন্য এনভায়রনমেন্ট ভেরিয়েবলগুলো সেট করুন

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. এগুলো হলো সেই কন্ট্রাক্টগুলো যা আমাদের ব্যবহার করতে হবে। [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) হলো সেই Uniswap v3 কন্ট্রাক্ট যা আমরা আসলে ট্রেড করার জন্য ব্যবহার করি। আমরা সরাসরি পুলের মাধ্যমে ট্রেড করতে পারতাম, কিন্তু এটি অনেক সহজ।

   নিচের দুটি ভেরিয়েবল হলো WETH এবং USDC-এর মধ্যে সোয়াপ করার জন্য প্রয়োজনীয় Uniswap v3 পাথ।

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. প্রতিটি টেস্ট একাউন্ট-এ 10,000 ETH রয়েছে। ট্রেডিংয়ের জন্য 1000 WETH পেতে 1000 ETH র‍্যাপ করতে WETH কন্ট্রাক্ট ব্যবহার করুন।

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. USDC-এর জন্য 500 WETH ট্রেড করতে `SwapRouter` ব্যবহার করুন।

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   `approve` কলটি একটি অ্যালাউন্স তৈরি করে যা `SwapRouter`-কে আমাদের কিছু টোকেন ব্যয় করার অনুমতি দেয়। কন্ট্রাক্টগুলো ইভেন্টগুলো মনিটর করতে পারে না, তাই আমরা যদি সরাসরি `SwapRouter` কন্ট্রাক্টে টোকেন ট্রান্সফার করি, তবে এটি জানতে পারবে না যে এটিকে পেমেন্ট করা হয়েছে। এর পরিবর্তে, আমরা `SwapRouter` কন্ট্রাক্টকে একটি নির্দিষ্ট পরিমাণ ব্যয় করার অনুমতি দিই, এবং তারপর `SwapRouter` সেটি করে। এটি `SwapRouter` দ্বারা কল করা একটি ফাংশনের মাধ্যমে করা হয়, তাই এটি জানতে পারে যে এটি সফল হয়েছে কিনা।

7. যাচাই করুন যে আপনার কাছে উভয় টোকেন-এর পর্যাপ্ত পরিমাণ রয়েছে।

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

যেহেতু এখন আমাদের কাছে WETH এবং USDC আছে, তাই আমরা আসলে এজেন্টটি রান করতে পারি।

```sh
git checkout 05-trade
uv run agent.py
```

আউটপুটটি অনেকটা এরকম দেখাবে:

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

এটি আসলে ব্যবহার করার জন্য, আপনার কয়েকটি ছোট পরিবর্তনের প্রয়োজন।

- লাইন 14-এ, `MAINNET_URL`-কে একটি আসল অ্যাক্সেস পয়েন্টে পরিবর্তন করুন, যেমন `https://eth.drpc.org`
- লাইন 28-এ, `PRIVATE_KEY`-কে আপনার নিজস্ব প্রাইভেট কি-তে পরিবর্তন করুন
- যদি না আপনি খুব ধনী হন এবং একটি অপ্রমাণিত এজেন্টের জন্য প্রতিদিন 1 ETH কিনতে বা বেচতে পারেন, তবে আপনি `WETH_TRADE_AMOUNT` কমানোর জন্য 29 পরিবর্তন করতে চাইতে পারেন

#### কোড ব্যাখ্যা {#trading-code}

এখানে নতুন কোড দেওয়া হলো।

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

ধাপ 4-এ আমরা যে ভেরিয়েবলগুলো ব্যবহার করেছি সেগুলোই।

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

আসলে ট্রেড করার জন্য, আমাদের `approve` ফাংশন প্রয়োজন। আমরা আগে এবং পরের ব্যালেন্সও দেখাতে চাই, তাই আমাদের `balanceOf`-ও প্রয়োজন।

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

`SwapRouter` ABI-তে আমাদের শুধু `exactInput` প্রয়োজন। একটি সম্পর্কিত ফাংশন রয়েছে, `exactOutput`, যা আমরা ঠিক একটি WETH কেনার জন্য ব্যবহার করতে পারতাম, কিন্তু সরলতার জন্য আমরা উভয় ক্ষেত্রেই শুধু `exactInput` ব্যবহার করি।

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

[`account`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) এবং `SwapRouter` কন্ট্রাক্টের জন্য Web3 সংজ্ঞাগুলো।

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

লেনদেন প্যারামিটারগুলো। আমাদের এখানে একটি ফাংশন প্রয়োজন কারণ [নন্স](https://en.wikipedia.org/wiki/Cryptographic_nonce) প্রতিবার পরিবর্তন হতে হবে।

```python
def approve_token(contract: Contract, amount: int):
```

`SwapRouter`-এর জন্য একটি টোকেন অ্যালাউন্স অনুমোদন করুন।

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

এভাবেই আমরা Web3-তে একটি লেনদেন পাঠাই। প্রথমে আমরা লেনদেন তৈরি করতে [`Contract` অবজেক্ট](https://web3py.readthedocs.io/en/stable/web3.contract.html) ব্যবহার করি। তারপর আমরা `PRIVATE_KEY` ব্যবহার করে লেনদেন সাইন করতে [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) ব্যবহার করি। সবশেষে, আমরা লেনদেন পাঠাতে [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) ব্যবহার করি।

```python
    print(f"Approve transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Approve transaction mined.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) লেনদেন মাইন হওয়া পর্যন্ত অপেক্ষা করে। প্রয়োজন হলে এটি রসিদ ফেরত দেয়।

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

WETH বিক্রি করার সময় এগুলো হলো প্যারামিটার।

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

`SELL_PARAMS`-এর বিপরীতে, ক্রয়ের প্যারামিটারগুলো পরিবর্তন হতে পারে। ইনপুট পরিমাণ হলো 1 WETH-এর খরচ, যা `quote`-এ উপলব্ধ।

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

`buy()` এবং `sell()` ফাংশনগুলো প্রায় একই রকম। প্রথমে আমরা `SwapRouter`-এর জন্য পর্যাপ্ত অ্যালাউন্স অনুমোদন করি এবং তারপর আমরা সঠিক পাথ এবং পরিমাণ দিয়ে এটিকে কল করি।

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

উভয় কারেন্সিতে ব্যবহারকারীর ব্যালেন্স রিপোর্ট করুন।

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

এই এজেন্টটি বর্তমানে কেবল একবার কাজ করে। তবে, আপনি এটিকে ক্রমাগত কাজ করার জন্য পরিবর্তন করতে পারেন, হয় এটিকে [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) থেকে রান করে অথবা 368-400 লাইনগুলোকে একটি লুপে র‍্যাপ করে এবং পরবর্তী সাইকেলের সময় না হওয়া পর্যন্ত অপেক্ষা করতে [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) ব্যবহার করে।

## সম্ভাব্য উন্নতিসমূহ {#improvements}

এটি কোনো সম্পূর্ণ প্রোডাকশন ভার্সন নয়; এটি কেবল বেসিক বিষয়গুলো শেখানোর একটি উদাহরণ। এখানে উন্নতির জন্য কিছু ধারণা দেওয়া হলো।

### আরও স্মার্ট ট্রেডিং {#smart-trading}

কী করতে হবে তা সিদ্ধান্ত নেওয়ার সময় এজেন্ট দুটি গুরুত্বপূর্ণ বিষয় উপেক্ষা করে।

- _প্রত্যাশিত পরিবর্তনের মাত্রা_। দাম কমার সম্ভাবনা থাকলে এজেন্ট একটি নির্দিষ্ট পরিমাণ `WETH` বিক্রি করে, কমার মাত্রা যাই হোক না কেন।
  যুক্তিযুক্তভাবে, ছোটখাটো পরিবর্তনগুলো উপেক্ষা করা এবং দাম কতটা কমবে বলে আমরা আশা করি তার উপর ভিত্তি করে বিক্রি করা ভালো হবে।
- _বর্তমান পোর্টফোলিও_। যদি আপনার পোর্টফোলিওর 10% WETH-এ থাকে এবং আপনি মনে করেন যে দাম বাড়বে, তবে সম্ভবত আরও কেনা যৌক্তিক। কিন্তু যদি আপনার পোর্টফোলিওর 90% WETH-এ থাকে, তবে আপনি হয়তো যথেষ্ট এক্সপোজড, এবং আরও কেনার কোনো প্রয়োজন নেই। আপনি যদি দাম কমার আশা করেন তবে এর বিপরীতটি সত্য।

### আপনি যদি আপনার ট্রেডিং কৌশল গোপন রাখতে চান তবে কী করবেন? {#secret}

AI ভেন্ডররা তাদের LLM-গুলোতে আপনার পাঠানো কোয়েরিগুলো দেখতে পারে, যা আপনার এজেন্টের সাথে তৈরি করা আপনার জিনিয়াস ট্রেডিং সিস্টেমকে প্রকাশ করতে পারে। এমন একটি ট্রেডিং সিস্টেম যা খুব বেশি মানুষ ব্যবহার করে তা মূল্যহীন কারণ আপনি যখন কিনতে চান তখন খুব বেশি মানুষ কেনার চেষ্টা করে (এবং দাম বেড়ে যায়) এবং আপনি যখন বিক্রি করতে চান তখন বিক্রি করার চেষ্টা করে (এবং দাম কমে যায়)।

এই সমস্যা এড়াতে আপনি স্থানীয়ভাবে একটি LLM রান করতে পারেন, উদাহরণস্বরূপ, [LM-Studio](https://lmstudio.ai/) ব্যবহার করে।

### AI বট থেকে AI এজেন্ট {#bot-to-agent}

আপনি একটি ভালো যুক্তি দিতে পারেন যে এটি [একটি AI বট, কোনো AI এজেন্ট নয়](/ai-agents/#ai-agents-vs-ai-bots)। এটি একটি অপেক্ষাকৃত সহজ কৌশল বাস্তবায়ন করে যা পূর্বনির্ধারিত তথ্যের উপর নির্ভর করে। আমরা সেলফ-ইমপ্রুভমেন্ট সক্ষম করতে পারি, উদাহরণস্বরূপ, Uniswap v3 পুলগুলোর একটি লিস্ট এবং তাদের সর্বশেষ মানগুলো প্রদান করে এবং জিজ্ঞাসা করে যে কোন কম্বিনেশনের সেরা প্রেডিক্টিভ ভ্যালু রয়েছে।

### স্লিপেজ প্রোটেকশন {#slippage-protection}

বর্তমানে কোনো [স্লিপেজ প্রোটেকশন](https://uniswapv3book.com/milestone_3/slippage-protection.html) নেই। যদি বর্তমান কোট $2000 হয় এবং প্রত্যাশিত দাম $2100 হয়, তবে এজেন্ট কিনবে। তবে, এজেন্ট কেনার আগে যদি খরচ বেড়ে $2200 হয়ে যায়, তবে আর কেনার কোনো মানে হয় না।

স্লিপেজ প্রোটেকশন বাস্তবায়ন করতে, [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325)-এর 325 এবং 334 লাইনে একটি `amountOutMinimum` মান নির্দিষ্ট করুন।

## উপসংহার {#conclusion}

আশা করি, এখন আপনি AI এজেন্টগুলো নিয়ে শুরু করার জন্য যথেষ্ট জানেন। এটি এই বিষয়ের কোনো বিস্তৃত ওভারভিউ নয়; এর জন্য পুরো বই নিবেদিত রয়েছে, তবে এটি আপনাকে শুরু করার জন্য যথেষ্ট। শুভকামনা!

[আমার আরও কাজের জন্য এখানে দেখুন](https://cryptodocguy.pro/)।