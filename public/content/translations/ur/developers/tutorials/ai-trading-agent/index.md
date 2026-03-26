---
title: "ایتھریم پر اپنا AI ٹریڈنگ ایجنٹ بنائیں"
description: "اس ٹیوٹوریل میں آپ ایک سادہ AI ٹریڈنگ ایجنٹ بنانا سیکھیں گے۔ یہ ایجنٹ بلاک چین سے معلومات پڑھتا ہے، اس معلومات کی بنیاد پر LLM سے سفارش مانگتا ہے، LLM کی تجویز کردہ ٹریڈ کرتا ہے، اور پھر انتظار کرتا ہے اور دہراتا ہے۔"
author: "اوری پومرانٹز"
tags: ["مصنوعی ذہانت", "ٹریڈنگ", "ایجنٹ", "Python"]
skill: intermediate
breadcrumb: "AI ٹریڈنگ ایجنٹ"
published: 2026-02-13
lang: ur
sidebarDepth: 3
---

اس ٹیوٹوریل میں آپ ایک سادہ AI ٹریڈنگ ایجنٹ بنانا سیکھیں گے۔ یہ ایجنٹ ان اقدامات کا استعمال کرتے ہوئے کام کرتا ہے:

1. ٹوکن کی موجودہ اور ماضی کی قیمتیں پڑھیں، نیز دیگر ممکنہ متعلقہ معلومات
2. اس معلومات کے ساتھ ایک استفسار (query) بنائیں، اور ساتھ ہی پس منظر کی معلومات بھی شامل کریں تاکہ یہ واضح ہو سکے کہ یہ کیسے متعلقہ ہو سکتی ہے
3. استفسار جمع کروائیں اور متوقع قیمت واپس حاصل کریں
4. سفارش کی بنیاد پر ٹریڈ کریں
5. انتظار کریں اور دہرائیں

یہ ایجنٹ ظاہر کرتا ہے کہ معلومات کو کیسے پڑھا جائے، اسے ایک ایسے استفسار میں کیسے تبدیل کیا جائے جو قابل استعمال جواب دے، اور اس جواب کو کیسے استعمال کیا جائے۔ یہ تمام اقدامات ایک AI ایجنٹ کے لیے ضروری ہیں۔ یہ ایجنٹ Python میں لاگو کیا گیا ہے کیونکہ یہ AI میں استعمال ہونے والی سب سے عام زبان ہے۔

## ایسا کیوں کریں؟ {#why-do-this}

خودکار ٹریڈنگ ایجنٹس ڈیولپرز کو ٹریڈنگ کی حکمت عملی منتخب کرنے اور اس پر عمل کرنے کی اجازت دیتے ہیں۔ [AI ایجنٹس](/ai-agents) زیادہ پیچیدہ اور متحرک ٹریڈنگ حکمت عملیوں کی اجازت دیتے ہیں، ممکنہ طور پر ایسی معلومات اور الگورتھم استعمال کرتے ہوئے جن کے استعمال پر ڈیولپر نے غور بھی نہ کیا ہو۔

## ٹولز {#tools}

یہ ٹیوٹوریل کوٹس (quotes) اور ٹریڈنگ کے لیے [Python](https://www.python.org/)، [Web3 لائبریری](https://web3py.readthedocs.io/en/stable/)، اور [Uniswap v3](https://github.com/Uniswap/v3-periphery) کا استعمال کرتا ہے۔

### Python کیوں؟ {#python}

AI کے لیے سب سے زیادہ استعمال ہونے والی زبان [Python](https://www.python.org/) ہے، اس لیے ہم اسے یہاں استعمال کرتے ہیں۔ اگر آپ Python نہیں جانتے تو پریشان نہ ہوں۔ یہ زبان بہت واضح ہے، اور میں بالکل سمجھاؤں گا کہ یہ کیا کرتی ہے۔

[Web3 لائبریری](https://web3py.readthedocs.io/en/stable/) سب سے عام Python ایتھریم API ہے۔ اسے استعمال کرنا کافی آسان ہے۔

### بلاک چین پر ٹریڈنگ {#trading-on-blockchain}

ایسی [بہت سی ڈسٹری بیوٹڈ ایکسچینجز (DEX)](/apps/categories/defi/) ہیں جو آپ کو ایتھریم پر ٹوکنز کی ٹریڈ کرنے دیتی ہیں۔ تاہم، [آربٹراج (arbitrage)](/developers/docs/smart-contracts/composability/#better-user-experience) کی وجہ سے ان کے ایکسچینج ریٹس عموماً ایک جیسے ہوتے ہیں۔

[Uniswap](https://app.uniswap.org/) ایک وسیع پیمانے پر استعمال ہونے والی DEX ہے جسے ہم کوٹس (ٹوکن کی متعلقہ قدریں دیکھنے کے لیے) اور ٹریڈز دونوں کے لیے استعمال کر سکتے ہیں۔

### OpenAI {#openai}

ایک بڑے لینگویج ماڈل (LLM) کے لیے، میں نے [OpenAI](https://openai.com/) کے ساتھ شروعات کرنے کا انتخاب کیا۔ اس ٹیوٹوریل میں ایپلیکیشن چلانے کے لیے آپ کو API تک رسائی کے لیے ادائیگی کرنی ہوگی۔ کم از کم $5 کی ادائیگی کافی سے زیادہ ہے۔

## ڈیولپمنٹ، مرحلہ وار {#step-by-step}

ڈیولپمنٹ کو آسان بنانے کے لیے، ہم مراحل میں آگے بڑھتے ہیں۔ ہر مرحلہ GitHub میں ایک برانچ ہے۔

### شروعات کرنا {#getting-started}

UNIX یا Linux (بشمول [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)) کے تحت شروعات کرنے کے اقدامات یہ ہیں:

1. اگر آپ کے پاس پہلے سے نہیں ہے، تو [Python](https://www.python.org/downloads/) ڈاؤن لوڈ اور انسٹال کریں۔

2. GitHub ریپوزٹری کو کلون کریں۔

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. [`uv`](https://docs.astral.sh/uv/getting-started/installation/) انسٹال کریں۔ آپ کے سسٹم پر کمانڈ مختلف ہو سکتی ہے۔

   ```sh
   pipx install uv
   ```

4. لائبریریاں ڈاؤن لوڈ کریں۔

   ```sh
   uv sync
   ```

5. ورچوئل انوائرنمنٹ کو فعال کریں۔

   ```sh
   source .venv/bin/activate
   ```

6. یہ تصدیق کرنے کے لیے کہ Python اور Web3 درست طریقے سے کام کر رہے ہیں، `python3` چلائیں اور اسے یہ پروگرام فراہم کریں۔ آپ اسے `>>>` پرامپٹ پر درج کر سکتے ہیں؛ کوئی فائل بنانے کی ضرورت نہیں ہے۔

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### بلاک چین سے پڑھنا {#read-blockchain}

اگلا قدم بلاک چین سے پڑھنا ہے۔ ایسا کرنے کے لیے، آپ کو `02-read-quote` برانچ میں تبدیل ہونا ہوگا اور پھر پروگرام چلانے کے لیے `uv` کا استعمال کرنا ہوگا۔

```sh
git checkout 02-read-quote
uv run agent.py
```

آپ کو `Quote` آبجیکٹس کی ایک فہرست ملنی چاہیے، جن میں سے ہر ایک میں ٹائم اسٹیمپ، قیمت، اور اثاثہ (فی الحال ہمیشہ `WETH/USDC`) شامل ہو۔

یہاں لائن بہ لائن وضاحت دی گئی ہے۔

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

ہمیں درکار لائبریریاں امپورٹ کریں۔ جب انہیں استعمال کیا جائے گا تو ان کی وضاحت نیچے دی گئی ہے۔

```python
print = functools.partial(print, flush=True)
```

Python کے `print` کو ایک ایسے ورژن سے بدل دیتا ہے جو ہمیشہ آؤٹ پٹ کو فوری طور پر فلش (flush) کرتا ہے۔ یہ ایک طویل عرصے تک چلنے والے اسکرپٹ میں مفید ہے کیونکہ ہم اسٹیٹس اپ ڈیٹس یا ڈیبگنگ آؤٹ پٹ کا انتظار نہیں کرنا چاہتے۔

```python
MAINNET_URL = "https://eth.drpc.org"
```

مین نیٹ تک پہنچنے کے لیے ایک URL۔ آپ اسے [نوڈ بطور سروس](/developers/docs/nodes-and-clients/nodes-as-a-service/) سے حاصل کر سکتے ہیں یا [Chainlist](https://chainlist.org/chain/1) میں مشتہر کردہ میں سے کوئی ایک استعمال کر سکتے ہیں۔

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

ایتھریم مین نیٹ کا بلاک عام طور پر ہر بارہ سیکنڈ میں بنتا ہے، لہذا یہ ان بلاکس کی تعداد ہے جن کی ہم ایک مخصوص وقت میں توقع کریں گے۔ نوٹ کریں کہ یہ کوئی درست ہندسہ نہیں ہے۔ جب [بلاک پروپوزر](/developers/docs/consensus-mechanisms/pos/block-proposal/) ڈاؤن ہوتا ہے، تو وہ بلاک چھوڑ دیا جاتا ہے، اور اگلے بلاک کا وقت 24 سیکنڈ ہوتا ہے۔ اگر ہم کسی ٹائم اسٹیمپ کے لیے بالکل درست بلاک حاصل کرنا چاہتے ہیں، تو ہم [بائنری سرچ](https://en.wikipedia.org/wiki/Binary_search) استعمال کریں گے۔ تاہم، یہ ہمارے مقاصد کے لیے کافی قریب ہے۔ مستقبل کی پیشین گوئی کرنا کوئی قطعی سائنس نہیں ہے۔

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

سائیکل کا سائز۔ ہم فی سائیکل ایک بار کوٹس کا جائزہ لیتے ہیں اور اگلے سائیکل کے اختتام پر قدر کا اندازہ لگانے کی کوشش کرتے ہیں۔

```python
# اس پول کا ایڈریس جسے ہم پڑھ رہے ہیں
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

کوٹ کی قدریں Uniswap 3 USDC/WETH پول سے ایڈریس [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract) پر لی گئی ہیں۔ یہ ایڈریس پہلے ہی چیک سم (checksum) کی شکل میں ہے، لیکن کوڈ کو دوبارہ قابل استعمال بنانے کے لیے [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address) کا استعمال کرنا بہتر ہے۔

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

یہ ان دو کنٹریکٹس کے لیے [ABIs](https://docs.soliditylang.org/en/latest/abi-spec.html) ہیں جن سے ہمیں رابطہ کرنے کی ضرورت ہے۔ کوڈ کو مختصر رکھنے کے لیے، ہم صرف وہی فنکشنز شامل کرتے ہیں جنہیں ہمیں کال کرنے کی ضرورت ہے۔

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

[`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) لائبریری شروع کریں اور ایتھریم نوڈ سے جڑیں۔

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

Python میں ڈیٹا کلاس بنانے کا یہ ایک طریقہ ہے۔ [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) ڈیٹا ٹائپ کا استعمال کنٹریکٹ سے جڑنے کے لیے کیا جاتا ہے۔ `(frozen=True)` کو نوٹ کریں۔ Python میں [بولینز (booleans)](https://en.wikipedia.org/wiki/Boolean_data_type) کو `True` یا `False` کے طور پر بیان کیا جاتا ہے، جن کا پہلا حرف بڑا ہوتا ہے۔ یہ ڈیٹا کلاس `frozen` ہے، جس کا مطلب ہے کہ فیلڈز میں ترمیم نہیں کی جا سکتی۔

انڈینٹیشن (indentation) کو نوٹ کریں۔ [C سے ماخوذ زبانوں](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages) کے برعکس، Python بلاکس کو ظاہر کرنے کے لیے انڈینٹیشن کا استعمال کرتا ہے۔ Python انٹرپریٹر جانتا ہے کہ درج ذیل تعریف اس ڈیٹا کلاس کا حصہ نہیں ہے کیونکہ یہ ڈیٹا کلاس فیلڈز جیسی انڈینٹیشن سے شروع نہیں ہوتی ہے۔

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

[`Decimal`](https://docs.python.org/3/library/decimal.html) ٹائپ کا استعمال اعشاریہ کسروں کو درست طریقے سے سنبھالنے کے لیے کیا جاتا ہے۔

```python
    def get_price(self, block: int) -> Decimal:
```

Python میں فنکشن کی تعریف کرنے کا یہ طریقہ ہے۔ تعریف کو انڈینٹ کیا گیا ہے تاکہ یہ ظاہر ہو سکے کہ یہ اب بھی `PoolInfo` کا حصہ ہے۔

ایک فنکشن میں جو ڈیٹا کلاس کا حصہ ہے، پہلا پیرامیٹر ہمیشہ `self` ہوتا ہے، جو ڈیٹا کلاس کا وہ انسٹینس (instance) ہے جس نے یہاں کال کی ہے۔ یہاں ایک اور پیرامیٹر ہے، بلاک نمبر۔

```python
        assert block <= w3.eth.block_number, "Block is in the future"
```

اگر ہم مستقبل پڑھ سکتے، تو ہمیں ٹریڈنگ کے لیے AI کی ضرورت نہ ہوتی۔

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

Web3 سے EVM پر فنکشن کال کرنے کا سنٹیکس یہ ہے: `<contract object>.functions.<function name>().call(<parameters>)`۔ پیرامیٹرز EVM فنکشن کے پیرامیٹرز (اگر کوئی ہوں؛ یہاں نہیں ہیں) یا بلاک چین کے رویے میں ترمیم کرنے کے لیے [نامزد پیرامیٹرز (named parameters)](https://en.wikipedia.org/wiki/Named_parameter) ہو سکتے ہیں۔ یہاں ہم ایک، `block_identifier` کا استعمال کرتے ہیں، تاکہ [بلاک نمبر](/developers/docs/apis/json-rpc/#default-block) کی وضاحت کی جا سکے جس میں ہم چلانا چاہتے ہیں۔

نتیجہ [یہ اسٹرکٹ (struct) ہے، جو سرنی (array) کی شکل میں ہے](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72)۔ پہلی قدر دونوں ٹوکنز کے درمیان ایکسچینج ریٹ کا ایک فنکشن ہے۔

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

آن چین حسابات کو کم کرنے کے لیے، Uniswap v3 اصل ایکسچینج فیکٹر کو اسٹور نہیں کرتا بلکہ اس کا مربع جزر (square root) اسٹور کرتا ہے۔ چونکہ EVM فلوٹنگ پوائنٹ ریاضی یا کسروں کو سپورٹ نہیں کرتا، اس لیے اصل قدر کے بجائے، جواب <span dir="ltr"><math><msqrt><mi>price</mi></msqrt><mo>&#x22C5;</mo><msup><mn>2</mn><mn>96</mn></msup></math></span> ہوتا ہے۔

```python
         # (ٹوکن 1 فی ٹوکن 0)
        return 1/(raw_price * self.decimal_factor)
```

ہمیں جو خام قیمت ملتی ہے وہ `token0` کی وہ تعداد ہے جو ہمیں ہر `token1` کے لیے ملتی ہے۔ ہمارے پول میں `token0` USDC (ایک اسٹیبل کوائن جس کی قدر امریکی ڈالر کے برابر ہے) ہے اور `token1` [WETH](https://opensea.io/learn/blockchain/what-is-weth) ہے۔ وہ قدر جو ہم واقعی چاہتے ہیں وہ فی WETH ڈالرز کی تعداد ہے، نہ کہ اس کا الٹ۔

ڈیسیمل فیکٹر دونوں ٹوکنز کے لیے [ڈیسیمل فیکٹرز](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) کے درمیان کا تناسب ہے۔

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

یہ ڈیٹا کلاس ایک کوٹ کی نمائندگی کرتی ہے: کسی دیے گئے وقت پر کسی مخصوص اثاثے کی قیمت۔ اس مقام پر، `asset` فیلڈ غیر متعلقہ ہے کیونکہ ہم ایک ہی پول استعمال کرتے ہیں اور اس لیے ہمارے پاس ایک ہی اثاثہ ہے۔ تاہم، ہم بعد میں مزید اثاثے شامل کریں گے۔

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

یہ فنکشن ایک ایڈریس لیتا ہے اور اس ایڈریس پر ٹوکن کنٹریکٹ کے بارے میں معلومات واپس کرتا ہے۔ ایک نیا [Web3 `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) بنانے کے لیے، ہم `w3.eth.contract` کو ایڈریس اور ABI فراہم کرتے ہیں۔

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

یہ فنکشن ہمیں [ایک مخصوص پول](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol) کے بارے میں درکار ہر چیز واپس کرتا ہے۔ سنٹیکس `f"<string>"` ایک [فارمیٹڈ اسٹرنگ](https://docs.python.org/3/reference/lexical_analysis.html#f-strings) ہے۔

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

ایک `Quote` آبجیکٹ حاصل کریں۔ `block_number` کی ڈیفالٹ قدر `None` (کوئی قدر نہیں) ہے۔

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

اگر بلاک نمبر کی وضاحت نہیں کی گئی تھی، تو `w3.eth.block_number` استعمال کریں، جو کہ تازہ ترین بلاک نمبر ہے۔ یہ [ایک `if` اسٹیٹمنٹ](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement) کا سنٹیکس ہے۔

ایسا لگ سکتا ہے کہ ڈیفالٹ کو صرف `w3.eth.block_number` پر سیٹ کرنا بہتر ہوتا، لیکن یہ اچھی طرح کام نہیں کرتا کیونکہ یہ اس وقت کا بلاک نمبر ہوگا جب فنکشن کی تعریف کی گئی تھی۔ ایک طویل عرصے تک چلنے والے ایجنٹ میں، یہ ایک مسئلہ ہوگا۔

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

اسے انسانوں اور بڑے لینگویج ماڈلز (LLMs) کے لیے قابل مطالعہ فارمیٹ میں فارمیٹ کرنے کے لیے [`datetime` لائبریری](https://docs.python.org/3/library/datetime.html) کا استعمال کریں۔ قدر کو دو اعشاریہ مقامات تک راؤنڈ کرنے کے لیے [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize) کا استعمال کریں۔

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

Python میں آپ ایک [فہرست (list)](https://docs.python.org/3/library/stdtypes.html#typesseq-list) کی تعریف کرتے ہیں جس میں `list[<type>]` کا استعمال کرتے ہوئے صرف ایک مخصوص ٹائپ شامل ہو سکتی ہے۔

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

Python میں ایک [`for` لوپ](https://docs.python.org/3/tutorial/controlflow.html#for-statements) عام طور پر ایک فہرست پر اعادہ (iterate) کرتا ہے۔ کوٹس تلاش کرنے کے لیے بلاک نمبرز کی فہرست [`range`](https://docs.python.org/3/library/stdtypes.html#range) سے آتی ہے۔

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

ہر بلاک نمبر کے لیے، ایک `Quote` آبجیکٹ حاصل کریں اور اسے `quotes` فہرست میں شامل کریں۔ پھر وہ فہرست واپس کریں۔

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

یہ اسکرپٹ کا مرکزی کوڈ ہے۔ پول کی معلومات پڑھیں، بارہ کوٹس حاصل کریں، اور انہیں [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint) کریں۔

### ایک پرامپٹ بنانا {#prompt}

اس کے بعد، ہمیں کوٹس کی اس فہرست کو LLM کے لیے ایک پرامپٹ میں تبدیل کرنے اور متوقع مستقبل کی قدر حاصل کرنے کی ضرورت ہے۔

```sh
git checkout 03-create-prompt
uv run agent.py
```

آؤٹ پٹ اب LLM کے لیے ایک پرامپٹ ہونے جا رہا ہے، جو اس سے ملتا جلتا ہے:

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

غور کریں کہ یہاں دو اثاثوں، `WETH/USDC` اور `WBTC/WETH` کے لیے کوٹس موجود ہیں۔ کسی دوسرے اثاثے سے کوٹس شامل کرنے سے پیشین گوئی کی درستگی بہتر ہو سکتی ہے۔

#### پرامپٹ کیسا لگتا ہے {#prompt-explanation}

اس پرامپٹ میں تین حصے شامل ہیں، جو LLM پرامپٹس میں کافی عام ہیں۔

1. معلومات۔ LLMs کے پاس اپنی ٹریننگ سے بہت سی معلومات ہوتی ہیں، لیکن ان کے پاس عام طور پر تازہ ترین معلومات نہیں ہوتیں۔ یہی وجہ ہے کہ ہمیں یہاں تازہ ترین کوٹس بازیافت کرنے کی ضرورت ہے۔ پرامپٹ میں معلومات شامل کرنے کو [retrieval augmented generation (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) کہا جاتا ہے۔

2. اصل سوال۔ یہ وہ ہے جو ہم جاننا چاہتے ہیں۔

3. آؤٹ پٹ فارمیٹنگ کی ہدایات۔ عام طور پر، ایک LLM ہمیں ایک تخمینہ دے گا جس کی وضاحت ہوگی کہ وہ اس تک کیسے پہنچا۔ یہ انسانوں کے لیے بہتر ہے، لیکن کمپیوٹر پروگرام کو صرف حتمی نتیجے کی ضرورت ہوتی ہے۔

#### کوڈ کی وضاحت {#prompt-code}

یہاں نیا کوڈ ہے۔

```python
from datetime import datetime, timezone, timedelta
```

ہمیں LLM کو وہ وقت فراہم کرنے کی ضرورت ہے جس کے لیے ہم تخمینہ چاہتے ہیں۔ مستقبل میں "n منٹ/گھنٹے/دن" کا وقت حاصل کرنے کے لیے، ہم [`timedelta` کلاس](https://docs.python.org/3/library/datetime.html#datetime.timedelta) کا استعمال کرتے ہیں۔

```python
# ان پولز کے ایڈریسز جنہیں ہم پڑھ رہے ہیں
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

ہمارے پاس دو پولز ہیں جنہیں ہمیں پڑھنے کی ضرورت ہے۔

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
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2 # (ٹوکن 1 فی ٹوکن 0)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

WETH/USDC پول میں، ہم جاننا چاہتے ہیں کہ ہمیں ایک `token1` (WETH) خریدنے کے لیے کتنے `token0` (USDC) کی ضرورت ہے۔ WETH/WBTC پول میں، ہم جاننا چاہتے ہیں کہ ہمیں ایک `token0` (WBTC، جو کہ ریپڈ بٹ کوائن ہے) خریدنے کے لیے کتنے `token1` (WETH) کی ضرورت ہے۔ ہمیں یہ ٹریک کرنے کی ضرورت ہے کہ آیا پول کے تناسب کو الٹنے کی ضرورت ہے۔

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

یہ جاننے کے لیے کہ آیا کسی پول کو الٹنے کی ضرورت ہے، ہم اسے `read_pool` کے ان پٹ کے طور پر حاصل کرتے ہیں۔ اس کے علاوہ، اثاثے کی علامت کو درست طریقے سے سیٹ کرنے کی ضرورت ہے۔

سنٹیکس `<a> if <b> else <c>` [ٹرنری کنڈیشنل آپریٹر (ternary conditional operator)](https://en.wikipedia.org/wiki/Ternary_conditional_operator) کا Python متبادل ہے، جو C سے ماخوذ زبان میں `<b> ? <a> : <c>` ہوگا۔

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

یہ فنکشن ایک اسٹرنگ بناتا ہے جو `Quote` آبجیکٹس کی فہرست کو فارمیٹ کرتا ہے، یہ فرض کرتے ہوئے کہ وہ سب ایک ہی اثاثے پر لاگو ہوتے ہیں۔

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

Python میں [ملٹی لائن اسٹرنگ لٹرلز (multi-line string literals)](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) کو `"""` .... `"""` کے طور پر لکھا جاتا ہے۔

```python
Given these quotes:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

یہاں، ہم `format_quotes` کے ساتھ ہر کوٹ لسٹ کے لیے ایک اسٹرنگ بنانے کے لیے [MapReduce](https://en.wikipedia.org/wiki/MapReduce) پیٹرن کا استعمال کرتے ہیں، پھر انہیں پرامپٹ میں استعمال کے لیے ایک ہی اسٹرنگ میں کم (reduce) کرتے ہیں۔

```python
What would you expect the value for {asset} to be at time {expected_time}?

Provide your answer as a single number rounded to two decimal places,
without any other text.
    """
```

باقی پرامپٹ توقع کے مطابق ہے۔

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

دونوں پولز کا جائزہ لیں اور دونوں سے کوٹس حاصل کریں۔

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

مستقبل کے اس وقت کا تعین کریں جس کے لیے ہم تخمینہ چاہتے ہیں، اور پرامپٹ بنائیں۔

### LLM کے ساتھ انٹرفیسنگ {#interface-llm}

اس کے بعد، ہم ایک حقیقی LLM کو پرامپٹ کرتے ہیں اور متوقع مستقبل کی قدر حاصل کرتے ہیں۔ میں نے یہ پروگرام OpenAI کا استعمال کرتے ہوئے لکھا ہے، لہذا اگر آپ کوئی مختلف پرووائیڈر استعمال کرنا چاہتے ہیں، تو آپ کو اسے ایڈجسٹ کرنا ہوگا۔

1. ایک [OpenAI اکاؤنٹ](https://auth.openai.com/create-account) حاصل کریں
2. [اکاؤنٹ میں فنڈز ڈالیں](https://platform.openai.com/settings/organization/billing/overview)—لکھتے وقت کم از کم رقم $5 ہے
3. [ایک API کلید بنائیں](https://platform.openai.com/settings/organization/api-keys)
4. کمانڈ لائن میں، API کلید کو ایکسپورٹ کریں تاکہ آپ کا پروگرام اسے استعمال کر سکے

   ```sh
   export OPENAI_API_KEY=sk-<the rest of the key goes here>
   ```

5. ایجنٹ کو چیک آؤٹ کریں اور چلائیں

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

یہاں نیا کوڈ ہے۔

```python
from openai import OpenAI

open_ai = OpenAI() # کلائنٹ OPENAI_API_KEY انوائرنمنٹ ویری ایبل کو پڑھتا ہے
```

OpenAI API کو امپورٹ کریں اور انسٹینشیٹ (instantiate) کریں۔

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

جواب بنانے کے لیے OpenAI API (`open_ai.chat.completions.create`) کو کال کریں۔

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

قیمت آؤٹ پٹ کریں اور خریدنے یا بیچنے کی سفارش فراہم کریں۔

#### پیشین گوئیوں کی جانچ کرنا {#testing-the-predictions}

اب جب کہ ہم پیشین گوئیاں تیار کر سکتے ہیں، ہم تاریخی ڈیٹا کا استعمال بھی کر سکتے ہیں تاکہ یہ اندازہ لگایا جا سکے کہ آیا ہم مفید پیشین گوئیاں تیار کرتے ہیں۔

```sh
uv run test-predictor.py
```

متوقع نتیجہ اس سے ملتا جلتا ہے:

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

ٹیسٹر کا زیادہ تر حصہ ایجنٹ جیسا ہی ہے، لیکن یہاں وہ حصے ہیں جو نئے ہیں یا جن میں ترمیم کی گئی ہے۔

```python
CYCLES_FOR_TEST = 40 # بیک ٹیسٹ کے لیے، ہم کتنے سائیکلز پر ٹیسٹ کرتے ہیں

# بہت سارے کوٹس حاصل کریں
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

ہم `CYCLES_FOR_TEST` (یہاں 40 کے طور پر بیان کیا گیا ہے) دن پیچھے دیکھتے ہیں۔

```python
# پیش گوئیاں بنائیں اور حقیقی تاریخ سے ان کی جانچ کریں

total_error = Decimal(0)
changes = []
```

ہمیں دو قسم کی غلطیوں میں دلچسپی ہے۔ پہلی، `total_error`، محض ان غلطیوں کا مجموعہ ہے جو پیشین گوئی کرنے والے نے کی ہیں۔

دوسری، `changes` کو سمجھنے کے لیے، ہمیں ایجنٹ کا مقصد یاد رکھنے کی ضرورت ہے۔ یہ WETH/USDC تناسب (ETH کی قیمت) کی پیشین گوئی کرنا نہیں ہے۔ یہ بیچنے اور خریدنے کی سفارشات جاری کرنا ہے۔ اگر قیمت فی الحال $2000 ہے اور یہ کل $2010 کی پیشین گوئی کرتا ہے، تو ہمیں کوئی اعتراض نہیں اگر اصل نتیجہ $2020 ہو اور ہم اضافی رقم کمائیں۔ لیکن ہمیں _ضرور_ اعتراض ہوگا اگر اس نے $2010 کی پیشین گوئی کی، اور اس سفارش کی بنیاد پر ETH خریدا، اور قیمت گر کر $1990 ہو گئی۔

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

ہم صرف ان صورتوں کو دیکھ سکتے ہیں جہاں مکمل تاریخ (پیشین گوئی کے لیے استعمال ہونے والی قدریں اور اس کا موازنہ کرنے کے لیے حقیقی دنیا کی قدر) دستیاب ہو۔ اس کا مطلب ہے کہ سب سے نیا کیس وہ ہونا چاہیے جو `CYCLES_BACK` پہلے شروع ہوا تھا۔

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

ایجنٹ کے استعمال کردہ نمونوں کی تعداد کے برابر نمونے حاصل کرنے کے لیے [سلائسز (slices)](https://www.w3schools.com/python/ref_func_slice.asp) کا استعمال کریں۔ یہاں اور اگلے حصے کے درمیان کا کوڈ وہی پیشین گوئی حاصل کرنے والا کوڈ ہے جو ہمارے پاس ایجنٹ میں ہے۔

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

متوقع قیمت، اصل قیمت، اور پیشین گوئی کے وقت کی قیمت حاصل کریں۔ ہمیں پیشین گوئی کے وقت کی قیمت کی ضرورت ہے تاکہ یہ تعین کیا جا سکے کہ آیا سفارش خریدنے کی تھی یا بیچنے کی۔

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Prediction for {prediction_time}: predicted {predicted_price} USD, real {real_price} USD, error {error} USD")
```

غلطی کا حساب لگائیں، اور اسے کل میں شامل کریں۔

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

`changes` کے لیے، ہم ایک ETH خریدنے یا بیچنے کا مالی اثر چاہتے ہیں۔ لہذا پہلے، ہمیں سفارش کا تعین کرنے کی ضرورت ہے، پھر اندازہ لگائیں کہ اصل قیمت کیسے بدلی، اور آیا سفارش نے پیسے کمائے (مثبت تبدیلی) یا پیسے خرچ کروائے (منفی تبدیلی)۔

```python
print (f"Mean prediction error over {len(wethusdc_quotes)-CYCLES_BACK} predictions: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Mean change per recommendation: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Standard variance of changes: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

نتائج کی رپورٹ دیں۔

```python
print (f"Profitable days: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Losing days: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

منافع بخش دنوں کی تعداد اور نقصان دہ دنوں کی تعداد گننے کے لیے [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) کا استعمال کریں۔ نتیجہ ایک فلٹر آبجیکٹ ہے، جسے لمبائی حاصل کرنے کے لیے ہمیں ایک فہرست میں تبدیل کرنے کی ضرورت ہے۔

### ٹرانزیکشنز جمع کروانا {#submit-txn}

اب ہمیں درحقیقت ٹرانزیکشنز جمع کروانے کی ضرورت ہے۔ تاہم، میں اس مقام پر، سسٹم کے ثابت ہونے سے پہلے، حقیقی رقم خرچ نہیں کرنا چاہتا۔ اس کے بجائے، ہم مین نیٹ کا ایک مقامی فورک (fork) بنائیں گے، اور اس نیٹ ورک پر "ٹریڈ" کریں گے۔

مقامی فورک بنانے اور ٹریڈنگ کو فعال کرنے کے اقدامات یہ ہیں۔

1. [Foundry](https://getfoundry.sh/introduction/installation) انسٹال کریں

2. [`anvil`](https://getfoundry.sh/anvil/overview) شروع کریں

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` Foundry کے ڈیفالٹ URL، http://localhost:8545 پر سن رہا ہے، لہذا ہمیں [اس `cast` کمانڈ](https://getfoundry.sh/cast/overview) کے لیے URL کی وضاحت کرنے کی ضرورت نہیں ہے جسے ہم بلاک چین میں ہیرا پھیری کرنے کے لیے استعمال کرتے ہیں۔

3. `anvil` میں چلاتے وقت، دس ٹیسٹ اکاؤنٹس ہوتے ہیں جن میں ETH ہوتا ہے—پہلے والے کے لیے انوائرنمنٹ ویری ایبلز سیٹ کریں

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. یہ وہ کنٹریکٹس ہیں جنہیں ہمیں استعمال کرنے کی ضرورت ہے۔ [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) وہ Uniswap v3 کنٹریکٹ ہے جسے ہم درحقیقت ٹریڈ کرنے کے لیے استعمال کرتے ہیں۔ ہم براہ راست پول کے ذریعے ٹریڈ کر سکتے ہیں، لیکن یہ بہت آسان ہے۔

   نیچے والے دو ویری ایبلز Uniswap v3 پاتھس ہیں جو WETH اور USDC کے درمیان سویپ (swap) کرنے کے لیے درکار ہیں۔

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. ہر ٹیسٹ اکاؤنٹ میں 10,000 ETH ہیں۔ ٹریڈنگ کے لیے 1000 WETH حاصل کرنے کے لیے 1000 ETH کو ریپ (wrap) کرنے کے لیے WETH کنٹریکٹ کا استعمال کریں۔

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. USDC کے لیے 500 WETH کی ٹریڈ کرنے کے لیے `SwapRouter` کا استعمال کریں۔

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   `approve` کال ایک الاؤنس (allowance) بناتی ہے جو `SwapRouter` کو ہمارے کچھ ٹوکنز خرچ کرنے کی اجازت دیتی ہے۔ کنٹریکٹس ایونٹس کی نگرانی نہیں کر سکتے، لہذا اگر ہم ٹوکنز براہ راست `SwapRouter` کنٹریکٹ میں منتقل کرتے ہیں، تو اسے معلوم نہیں ہوگا کہ اسے ادائیگی کی گئی تھی۔ اس کے بجائے، ہم `SwapRouter` کنٹریکٹ کو ایک مخصوص رقم خرچ کرنے کی اجازت دیتے ہیں، اور پھر `SwapRouter` ایسا کرتا ہے۔ یہ `SwapRouter` کے ذریعے کال کیے گئے ایک فنکشن کے ذریعے کیا جاتا ہے، تاکہ اسے معلوم ہو سکے کہ آیا یہ کامیاب رہا۔

7. تصدیق کریں کہ آپ کے پاس دونوں ٹوکنز کافی مقدار میں ہیں۔

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

اب جب کہ ہمارے پاس WETH اور USDC ہیں، ہم درحقیقت ایجنٹ کو چلا سکتے ہیں۔

```sh
git checkout 05-trade
uv run agent.py
```

آؤٹ پٹ اس سے ملتا جلتا نظر آئے گا:

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

اسے درحقیقت استعمال کرنے کے لیے، آپ کو چند معمولی تبدیلیوں کی ضرورت ہے۔

- لائن 14 میں، `MAINNET_URL` کو ایک حقیقی ایکسیس پوائنٹ میں تبدیل کریں، جیسے `https://eth.drpc.org`
- لائن 28 میں، `PRIVATE_KEY` کو اپنی پرائیویٹ کلید میں تبدیل کریں
- جب تک کہ آپ بہت امیر نہ ہوں اور ایک غیر ثابت شدہ ایجنٹ کے لیے ہر روز 1 ETH خرید یا بیچ نہ سکیں، آپ `WETH_TRADE_AMOUNT` کو کم کرنے کے لیے 29 کو تبدیل کرنا چاہیں گے

#### کوڈ کی وضاحت {#trading-code}

یہاں نیا کوڈ ہے۔

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

وہی ویری ایبلز جو ہم نے مرحلہ 4 میں استعمال کیے تھے۔

```python
WETH_TRADE_AMOUNT=1
```

ٹریڈ کرنے کی رقم۔

```python
ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... },
    { "name": "balanceOf", ...},
    { "name": "approve", ...}
]
```

درحقیقت ٹریڈ کرنے کے لیے، ہمیں `approve` فنکشن کی ضرورت ہے۔ ہم پہلے اور بعد کے بیلنس بھی دکھانا چاہتے ہیں، اس لیے ہمیں `balanceOf` کی بھی ضرورت ہے۔

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

`SwapRouter` ABI میں ہمیں صرف `exactInput` کی ضرورت ہے۔ ایک متعلقہ فنکشن، `exactOutput` ہے، جسے ہم بالکل ایک WETH خریدنے کے لیے استعمال کر سکتے ہیں، لیکن سادگی کے لیے ہم دونوں صورتوں میں صرف `exactInput` استعمال کرتے ہیں۔

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

[`account`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) اور `SwapRouter` کنٹریکٹ کے لیے Web3 کی تعریفیں۔

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

ٹرانزیکشن کے پیرامیٹرز۔ ہمیں یہاں ایک فنکشن کی ضرورت ہے کیونکہ [نونس (nonce)](https://en.wikipedia.org/wiki/Cryptographic_nonce) کو ہر بار تبدیل ہونا چاہیے۔

```python
def approve_token(contract: Contract, amount: int):
```

`SwapRouter` کے لیے ٹوکن الاؤنس منظور کریں۔

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

اس طرح ہم Web3 میں ٹرانزیکشن بھیجتے ہیں۔ پہلے ہم ٹرانزیکشن بنانے کے لیے [`Contract` آبجیکٹ](https://web3py.readthedocs.io/en/stable/web3.contract.html) کا استعمال کرتے ہیں۔ پھر ہم `PRIVATE_KEY` کا استعمال کرتے ہوئے ٹرانزیکشن پر دستخط کرنے کے لیے [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) کا استعمال کرتے ہیں۔ آخر میں، ہم ٹرانزیکشن بھیجنے کے لیے [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) کا استعمال کرتے ہیں۔

```python
    print(f"Approve transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Approve transaction mined.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) اس وقت تک انتظار کرتا ہے جب تک کہ ٹرانزیکشن مائن نہ ہو جائے۔ ضرورت پڑنے پر یہ رسید واپس کرتا ہے۔

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

WETH بیچتے وقت یہ پیرامیٹرز ہوتے ہیں۔

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

`SELL_PARAMS` کے برعکس، خریدنے کے پیرامیٹرز تبدیل ہو سکتے ہیں۔ ان پٹ کی رقم 1 WETH کی قیمت ہے، جیسا کہ `quote` میں دستیاب ہے۔

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

`buy()` اور `sell()` فنکشنز تقریباً ایک جیسے ہیں۔ پہلے ہم `SwapRouter` کے لیے کافی الاؤنس منظور کرتے ہیں، اور پھر ہم اسے درست پاتھ اور رقم کے ساتھ کال کرتے ہیں۔

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

دونوں کرنسیوں میں صارف کے بیلنس کی رپورٹ دیں۔

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

یہ ایجنٹ فی الحال صرف ایک بار کام کرتا ہے۔ تاہم، آپ اسے مسلسل کام کرنے کے لیے تبدیل کر سکتے ہیں یا تو اسے [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) سے چلا کر یا لائنز 368-400 کو ایک لوپ میں لپیٹ کر اور اگلے سائیکل کا وقت آنے تک انتظار کرنے کے لیے [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) کا استعمال کر کے۔

## ممکنہ بہتری {#improvements}

یہ مکمل پروڈکشن ورژن نہیں ہے؛ یہ محض بنیادی باتیں سکھانے کی ایک مثال ہے۔ بہتری کے لیے کچھ خیالات یہ ہیں۔

### اسمارٹ ٹریڈنگ {#smart-trading}

دو اہم حقائق ہیں جنہیں ایجنٹ یہ فیصلہ کرتے وقت نظر انداز کر دیتا ہے کہ کیا کرنا ہے۔

- _متوقع تبدیلی کی شدت_۔ اگر قیمت میں کمی کی توقع ہو تو ایجنٹ `WETH` کی ایک مقررہ رقم بیچ دیتا ہے، قطع نظر اس کے کہ کمی کی شدت کیا ہے۔
  یقیناً، معمولی تبدیلیوں کو نظر انداز کرنا اور اس بنیاد پر بیچنا بہتر ہوگا کہ ہم قیمت میں کتنی کمی کی توقع کرتے ہیں۔
- _موجودہ پورٹ فولیو_۔ اگر آپ کے پورٹ فولیو کا 10% WETH میں ہے اور آپ کو لگتا ہے کہ قیمت اوپر جائے گی، تو شاید مزید خریدنا سمجھ میں آتا ہے۔ لیکن اگر آپ کے پورٹ فولیو کا 90% WETH میں ہے، تو آپ کو کافی حد تک ایکسپوژر (exposure) حاصل ہو سکتا ہے، اور مزید خریدنے کی ضرورت نہیں ہے۔ اگر آپ کو قیمت نیچے جانے کی توقع ہے تو اس کا الٹ سچ ہے۔

### کیا ہوگا اگر آپ اپنی ٹریڈنگ کی حکمت عملی کو خفیہ رکھنا چاہتے ہیں؟ {#secret}

AI وینڈرز وہ استفسارات دیکھ سکتے ہیں جو آپ ان کے LLMs کو بھیجتے ہیں، جو آپ کے ایجنٹ کے ساتھ تیار کردہ شاندار ٹریڈنگ سسٹم کو بے نقاب کر سکتا ہے۔ ایک ٹریڈنگ سسٹم جسے بہت زیادہ لوگ استعمال کرتے ہیں وہ بے کار ہے کیونکہ جب آپ خریدنا چاہتے ہیں تو بہت سے لوگ خریدنے کی کوشش کرتے ہیں (اور قیمت اوپر جاتی ہے) اور جب آپ بیچنا چاہتے ہیں تو بیچنے کی کوشش کرتے ہیں (اور قیمت نیچے جاتی ہے)۔

اس مسئلے سے بچنے کے لیے آپ مقامی طور پر ایک LLM چلا سکتے ہیں، مثال کے طور پر، [LM-Studio](https://lmstudio.ai/) کا استعمال کرتے ہوئے۔

### AI بوٹ سے AI ایجنٹ تک {#bot-to-agent}

آپ یہ اچھی دلیل دے سکتے ہیں کہ یہ [ایک AI بوٹ ہے، نہ کہ AI ایجنٹ](/ai-agents/#ai-agents-vs-ai-bots)۔ یہ ایک نسبتاً سادہ حکمت عملی کو نافذ کرتا ہے جو پہلے سے طے شدہ معلومات پر انحصار کرتی ہے۔ ہم خود کو بہتر بنانے کے قابل بنا سکتے ہیں، مثال کے طور پر، Uniswap v3 پولز اور ان کی تازہ ترین قدروں کی فہرست فراہم کر کے اور یہ پوچھ کر کہ کس امتزاج کی پیشین گوئی کی قدر بہترین ہے۔

### سلپیج پروٹیکشن (Slippage protection) {#slippage-protection}

فی الحال کوئی [سلپیج پروٹیکشن](https://uniswapv3book.com/milestone_3/slippage-protection.html) نہیں ہے۔ اگر موجودہ کوٹ $2000 ہے، اور متوقع قیمت $2100 ہے، تو ایجنٹ خریدے گا۔ تاہم، اگر ایجنٹ کے خریدنے سے پہلے قیمت بڑھ کر $2200 ہو جاتی ہے، تو مزید خریدنے کا کوئی مطلب نہیں ہے۔

سلپیج پروٹیکشن کو لاگو کرنے کے لیے، [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325) کی لائنز 325 اور 334 میں `amountOutMinimum` کی قدر کی وضاحت کریں۔

## نتیجہ {#conclusion}

امید ہے، اب آپ AI ایجنٹس کے ساتھ شروعات کرنے کے لیے کافی جانتے ہوں گے۔ یہ اس موضوع کا جامع جائزہ نہیں ہے؛ اس کے لیے پوری کتابیں وقف ہیں، لیکن یہ آپ کو شروع کرنے کے لیے کافی ہے۔ گڈ لک!

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔