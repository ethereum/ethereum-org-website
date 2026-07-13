---
title: "ایتھیریم پر اپنا ⁦AI⁩ ٹریڈنگ ایجنٹ بنائیں"
description: "اس ٹیوٹوریل میں آپ ایک سادہ مصنوعی ذہانت کا ایجنٹ (AI agent) بنانا سیکھیں گے۔ یہ ایجنٹ بلاک چین سے معلومات پڑھتا ہے، اس معلومات کی بنیاد پر ⁦LLM⁩ سے سفارش مانگتا ہے، ⁦LLM⁩ کی تجویز کردہ ٹریڈ کرتا ہے، اور پھر انتظار کر کے عمل دہراتا ہے۔"
author: "اوری پومرانٹز"
tags:
  - AI
  - ٹریڈنگ
  - ایجنٹ
  - Python
skill: intermediate
breadcrumb: "⁦AI⁩ ٹریڈنگ ایجنٹ"
published: 2026-02-13
lang: ur
sidebarDepth: 3
---

اس ٹیوٹوریل میں آپ ایک سادہ مصنوعی ذہانت کا ایجنٹ (AI agent) بنانا سیکھیں گے۔ یہ ایجنٹ ان اقدامات کا استعمال کرتے ہوئے کام کرتا ہے:

1. ایک ٹوکن کی موجودہ اور ماضی کی قیمتیں پڑھیں، نیز دیگر ممکنہ متعلقہ معلومات
2. اس معلومات کے ساتھ ایک استفسار (query) بنائیں، اور ساتھ ہی پس منظر کی معلومات دیں تاکہ واضح ہو سکے کہ یہ کیسے متعلقہ ہو سکتی ہے
3. استفسار جمع کرائیں اور متوقع قیمت واپس حاصل کریں
4. سفارش کی بنیاد پر ٹریڈ کریں
5. انتظار کریں اور دہرائیں

یہ ایجنٹ ظاہر کرتا ہے کہ معلومات کو کیسے پڑھا جائے، اسے ایک ایسے استفسار میں کیسے بدلا جائے جو قابل استعمال جواب دے، اور اس جواب کو کیسے استعمال کیا جائے۔ یہ تمام اقدامات ایک مصنوعی ذہانت کے ایجنٹ کے لیے ضروری ہیں۔ یہ ایجنٹ <span dir="ltr">Python</span> میں لاگو کیا گیا ہے کیونکہ یہ <span dir="ltr">AI</span> میں استعمال ہونے والی سب سے عام زبان ہے۔

## ایسا کیوں کریں؟ {#why-do-this}

خودکار ٹریڈنگ ایجنٹس ڈیولپرز کو ٹریڈنگ کی حکمت عملی منتخب کرنے اور اس پر عمل کرنے کی اجازت دیتے ہیں۔ [مصنوعی ذہانت کے ایجنٹس](/ai-agents) زیادہ پیچیدہ اور متحرک ٹریڈنگ کی حکمت عملیوں کی اجازت دیتے ہیں، ممکنہ طور پر ایسی معلومات اور الگورتھم استعمال کرتے ہوئے جن کے استعمال پر ڈیولپر نے غور بھی نہ کیا ہو۔

## ٹولز {#tools}

یہ ٹیوٹوریل کوٹس (quotes) اور ٹریڈنگ کے لیے [Python](https://www.python.org/)، [<span dir="ltr">Web3</span> لائبریری](https://web3py.readthedocs.io/en/stable/)، اور [یونی سویپ <span dir="ltr">v3</span>](https://github.com/Uniswap/v3-periphery) کا استعمال کرتا ہے۔

### <span dir="ltr">Python</span> کیوں؟ {#python}

<span dir="ltr">AI</span> کے لیے سب سے زیادہ استعمال ہونے والی زبان [Python](https://www.python.org/) ہے، اس لیے ہم اسے یہاں استعمال کرتے ہیں۔ اگر آپ <span dir="ltr">Python</span> نہیں جانتے تو پریشان نہ ہوں۔ یہ زبان بہت واضح ہے، اور میں بالکل سمجھاؤں گا کہ یہ کیا کرتی ہے۔

[<span dir="ltr">Web3</span> لائبریری](https://web3py.readthedocs.io/en/stable/) سب سے عام <span dir="ltr">Python</span> ایتھیریم <span dir="ltr">API</span> ہے۔ اسے استعمال کرنا کافی آسان ہے۔

### بلاک چین پر ٹریڈنگ {#trading-on-blockchain}

[بہت سی ڈسٹری بیوٹڈ ایکسچینجز (DEX)](/apps/categories/defi/) ہیں جو آپ کو ایتھیریم پر ٹوکنز کی ٹریڈ کرنے دیتی ہیں۔ تاہم، [آربٹراج (arbitrage)](/developers/docs/smart-contracts/composability/#better-user-experience) کی وجہ سے ان کے تبادلے کے نرخ عموماً ایک جیسے ہوتے ہیں۔

[یونی سویپ](https://app.uniswap.org/) ایک وسیع پیمانے پر استعمال ہونے والی <span dir="ltr">DEX</span> ہے جسے ہم کوٹس (ٹوکن کی متعلقہ قدریں دیکھنے کے لیے) اور ٹریڈز دونوں کے لیے استعمال کر سکتے ہیں۔

### <span dir="ltr">OpenAI</span> {#openai}

ایک بڑے لینگویج ماڈل کے لیے، میں نے [<span dir="ltr">OpenAI</span>](https://openai.com/) کے ساتھ شروعات کرنے کا انتخاب کیا۔ اس ٹیوٹوریل میں ایپلیکیشن چلانے کے لیے آپ کو <span dir="ltr">API</span> تک رسائی کے لیے ادائیگی کرنی ہوگی۔ <span dir="ltr">$5</span> کی کم از کم ادائیگی کافی سے زیادہ ہے۔

## ڈیولپمنٹ، قدم بہ قدم {#step-by-step}

ڈیولپمنٹ کو آسان بنانے کے لیے، ہم مراحل میں آگے بڑھتے ہیں۔ ہر قدم <span dir="ltr">GitHub</span> میں ایک برانچ ہے۔

### شروعات {#getting-started}

<span dir="ltr">UNIX</span> یا <span dir="ltr">Linux</span> (بشمول [<span dir="ltr">WSL</span>](https://learn.microsoft.com/en-us/windows/wsl/install)) کے تحت شروعات کرنے کے اقدامات یہ ہیں:

1. اگر آپ کے پاس پہلے سے نہیں ہے، تو [Python](https://www.python.org/downloads/) ڈاؤن لوڈ اور انسٹال کریں۔

2. <span dir="ltr">GitHub</span> ریپوزٹری کو کلون کریں۔

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

6. یہ تصدیق کرنے کے لیے کہ <span dir="ltr">Python</span> اور <span dir="ltr">Web3</span> درست طریقے سے کام کر رہے ہیں، `python3` چلائیں اور اسے یہ پروگرام فراہم کریں۔ آپ اسے `>>>` پرامپٹ پر درج کر سکتے ہیں؛ کوئی فائل بنانے کی ضرورت نہیں ہے۔

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

آپ کو `Quote` آبجیکٹس کی ایک فہرست موصول ہونی چاہیے، جن میں سے ہر ایک کے ساتھ ٹائم اسٹیمپ، قیمت، اور اثاثہ (فی الحال ہمیشہ `WETH/USDC`) ہوگا۔

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

ہمیں درکار لائبریریاں امپورٹ کریں۔ ان کی وضاحت نیچے دی گئی ہے جب وہ استعمال ہوتی ہیں۔

```python
print = functools.partial(print, flush=True)
```

<span dir="ltr">Python</span> کے `print` کو ایک ایسے ورژن سے بدل دیتا ہے جو ہمیشہ آؤٹ پٹ کو فوری طور پر فلش کرتا ہے۔ یہ ایک طویل عرصے تک چلنے والے اسکرپٹ میں مفید ہے کیونکہ ہم اسٹیٹس اپ ڈیٹس یا ڈیبگنگ آؤٹ پٹ کا انتظار نہیں کرنا چاہتے۔

```python
MAINNET_URL = "https://eth.drpc.org"
```

مین نیٹ تک پہنچنے کے لیے ایک <span dir="ltr">URL</span>۔ آپ [نوڈ ایز اے سروس (Node as a service)](/developers/docs/nodes-and-clients/nodes-as-a-service/) سے ایک حاصل کر سکتے ہیں یا [<span dir="ltr">Chainlist</span>](https://chainlist.org/chain/1) میں مشتہر کردہ میں سے کوئی ایک استعمال کر سکتے ہیں۔

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

ایک ایتھیریم مین نیٹ بلاک عام طور پر ہر بارہ سیکنڈ میں بنتا ہے، لہذا یہ ان بلاکس کی تعداد ہے جن کی ہم ایک مخصوص وقت میں توقع کریں گے۔ نوٹ کریں کہ یہ کوئی درست ہندسہ نہیں ہے۔ جب [بلاک تجویز کنندہ](/developers/docs/consensus-mechanisms/pos/block-proposal/) ڈاؤن ہوتا ہے، تو وہ بلاک چھوڑ دیا جاتا ہے، اور اگلے بلاک کا وقت <span dir="ltr">24</span> سیکنڈ ہوتا ہے۔ اگر ہم کسی ٹائم اسٹیمپ کے لیے بالکل درست بلاک حاصل کرنا چاہتے ہیں، تو ہم [بائنری سرچ (binary search)](https://en.wikipedia.org/wiki/Binary_search) استعمال کریں گے۔ تاہم، یہ ہمارے مقاصد کے لیے کافی قریب ہے۔ مستقبل کی پیش گوئی کرنا کوئی قطعی سائنس نہیں ہے۔

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

سائیکل کا سائز۔ ہم فی سائیکل ایک بار کوٹس کا جائزہ لیتے ہیں اور اگلے سائیکل کے اختتام پر قدر کا اندازہ لگانے کی کوشش کرتے ہیں۔

```python
# اس پول کا پتہ جسے ہم پڑھ رہے ہیں
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

کوٹ کی قدریں پتہ [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract) پر موجود یونی سویپ <span dir="ltr">3</span> <span dir="ltr">USDC/WETH</span> پول سے لی گئی ہیں۔ یہ پتہ پہلے ہی چیک سم (checksum) کی شکل میں ہے، لیکن کوڈ کو دوبارہ قابل استعمال بنانے کے لیے [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address) کا استعمال کرنا بہتر ہے۔

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

یہ ان دو کنٹریکٹس کے [<span dir="ltr">ABIs</span>](https://docs.soliditylang.org/en/latest/abi-spec.html) ہیں جن سے ہمیں رابطہ کرنے کی ضرورت ہے۔ کوڈ کو مختصر رکھنے کے لیے، ہم صرف وہی فنکشنز شامل کرتے ہیں جنہیں ہمیں کال کرنے کی ضرورت ہے۔

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

[`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) لائبریری شروع کریں اور ایک ایتھیریم نوڈ سے جڑیں۔

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

یہ <span dir="ltr">Python</span> میں ڈیٹا کلاس بنانے کا ایک طریقہ ہے۔ [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) ڈیٹا ٹائپ کنٹریکٹ سے جڑنے کے لیے استعمال ہوتی ہے۔ `(frozen=True)` کو نوٹ کریں۔ <span dir="ltr">Python</span> میں [بولینز (booleans)](https://en.wikipedia.org/wiki/Boolean_data_type) کو `True` یا `False` کے طور پر بیان کیا جاتا ہے، جن کا پہلا حرف بڑا ہوتا ہے۔ یہ ڈیٹا کلاس `frozen` ہے، جس کا مطلب ہے کہ فیلڈز میں ترمیم نہیں کی جا سکتی۔

انڈینٹیشن (indentation) کو نوٹ کریں۔ [<span dir="ltr">C</span> سے ماخوذ زبانوں](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages) کے برعکس، <span dir="ltr">Python</span> بلاکس کو ظاہر کرنے کے لیے انڈینٹیشن کا استعمال کرتی ہے۔ <span dir="ltr">Python</span> انٹرپریٹر جانتا ہے کہ درج ذیل تعریف اس ڈیٹا کلاس کا حصہ نہیں ہے کیونکہ یہ اسی انڈینٹیشن سے شروع نہیں ہوتی جس پر ڈیٹا کلاس کی فیلڈز ہیں۔

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

[`Decimal`](https://docs.python.org/3/library/decimal.html) ٹائپ اعشاریہ کسروں کو درست طریقے سے سنبھالنے کے لیے استعمال ہوتی ہے۔

```python
    def get_price(self, block: int) -> Decimal:
```

یہ <span dir="ltr">Python</span> میں فنکشن کی تعریف کرنے کا طریقہ ہے۔ تعریف کو انڈینٹ کیا گیا ہے تاکہ یہ ظاہر ہو سکے کہ یہ اب بھی `PoolInfo` کا حصہ ہے۔

ایک فنکشن میں جو ڈیٹا کلاس کا حصہ ہے، پہلا پیرامیٹر ہمیشہ `self` ہوتا ہے، یعنی ڈیٹا کلاس کی وہ مثال (instance) جس نے یہاں کال کیا۔ یہاں ایک اور پیرامیٹر ہے، بلاک نمبر۔

```python
        assert block <= w3.eth.block_number, "Block is in the future"
```

اگر ہم مستقبل پڑھ سکتے، تو ہمیں ٹریڈنگ کے لیے <span dir="ltr">AI</span> کی ضرورت نہ ہوتی۔

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

<span dir="ltr">Web3</span> سے <span dir="ltr">EVM</span> پر فنکشن کال کرنے کا سنٹیکس یہ ہے: `<contract object>.functions.<function name>().call(<parameters>)`۔ پیرامیٹرز <span dir="ltr">EVM</span> فنکشن کے پیرامیٹرز ہو سکتے ہیں (اگر کوئی ہوں؛ یہاں کوئی نہیں ہیں) یا بلاک چین کے رویے میں ترمیم کرنے کے لیے [نامزد پیرامیٹرز (named parameters)](https://en.wikipedia.org/wiki/Named_parameter)۔ یہاں ہم ایک، `block_identifier`، استعمال کرتے ہیں تاکہ [بلاک نمبر](/developers/docs/apis/json-rpc/#default-block) کی وضاحت کر سکیں جس میں ہم چلانا چاہتے ہیں۔

نتیجہ [یہ اسٹرکٹ (struct) ہے، جو سرنی (array) کی شکل میں ہے](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72)۔ پہلی قدر دونوں ٹوکنز کے درمیان شرح تبادلہ کا ایک فنکشن ہے۔

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

آن چین حسابات کو کم کرنے کے لیے، یونی سویپ <span dir="ltr">v3</span> اصل تبادلے کا عنصر (exchange factor) محفوظ نہیں کرتا بلکہ اس کا مربع جزر (square root) محفوظ کرتا ہے۔ چونکہ <span dir="ltr">EVM</span> فلوٹنگ پوائنٹ ریاضی یا کسروں کو سپورٹ نہیں کرتا، اس لیے اصل قدر کے بجائے، جواب <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5;</mo><msup><mn>2</mn><mn>96</mn></msup></math> ہوتا ہے۔

```python
         # (ٹوکن1 فی ٹوکن0)
        return 1/(raw_price * self.decimal_factor)
```

ہمیں جو خام قیمت ملتی ہے وہ `token0` کی وہ تعداد ہے جو ہمیں ہر `token1` کے بدلے ملتی ہے۔ ہمارے پول میں `token0` <span dir="ltr">USDC</span> (سٹیبل کوائن جس کی قدر امریکی ڈالر کے برابر ہے) ہے اور `token1` [<span dir="ltr">WETH</span>](https://opensea.io/learn/blockchain/what-is-weth) ہے۔ جو قدر ہم واقعی چاہتے ہیں وہ فی <span dir="ltr">WETH</span> ڈالرز کی تعداد ہے، نہ کہ اس کا الٹ۔

اعشاریہ کا عنصر (decimal factor) دونوں ٹوکنز کے [اعشاریہ کے عناصر](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) کے درمیان کا تناسب ہے۔

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

یہ ڈیٹا کلاس ایک کوٹ کی نمائندگی کرتی ہے: کسی دیے گئے وقت پر ایک مخصوص اثاثے کی قیمت۔ اس مقام پر، `asset` فیلڈ غیر متعلقہ ہے کیونکہ ہم ایک ہی پول استعمال کرتے ہیں اور اس لیے ہمارے پاس ایک ہی اثاثہ ہے۔ تاہم، ہم بعد میں مزید اثاثے شامل کریں گے۔

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

یہ فنکشن ایک پتہ لیتا ہے اور اس پتے پر موجود ٹوکن کنٹریکٹ کے بارے میں معلومات واپس کرتا ہے۔ ایک نیا [<span dir="ltr">Web3</span> `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) بنانے کے لیے، ہم `w3.eth.contract` کو پتہ اور <span dir="ltr">ABI</span> فراہم کرتے ہیں۔

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

یہ فنکشن [ایک مخصوص پول](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol) کے بارے میں ہماری ضرورت کی ہر چیز واپس کرتا ہے۔ سنٹیکس `f"<string>"` ایک [فارمیٹ شدہ اسٹرنگ (formatted string)](https://docs.python.org/3/reference/lexical_analysis.html#f-strings) ہے۔

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

اسے انسانوں اور بڑے لینگویج ماڈلز (<span dir="ltr">LLMs</span>) کے لیے قابل مطالعہ فارمیٹ میں فارمیٹ کرنے کے لیے [`datetime` لائبریری](https://docs.python.org/3/library/datetime.html) کا استعمال کریں۔ قدر کو دو اعشاریہ مقامات تک راؤنڈ کرنے کے لیے [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize) کا استعمال کریں۔

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

<span dir="ltr">Python</span> میں آپ ایک [فہرست (list)](https://docs.python.org/3/library/stdtypes.html#typesseq-list) کی تعریف کرتے ہیں جو `list[<type>]` کا استعمال کرتے ہوئے صرف ایک مخصوص ٹائپ پر مشتمل ہو سکتی ہے۔

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

<span dir="ltr">Python</span> میں ایک [`for` لوپ](https://docs.python.org/3/tutorial/controlflow.html#for-statements) عام طور پر ایک فہرست پر اعادہ (iterate) کرتا ہے۔ جن بلاک نمبرز میں کوٹس تلاش کرنے ہیں ان کی فہرست [`range`](https://docs.python.org/3/library/stdtypes.html#range) سے آتی ہے۔

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

### پرامپٹ بنانا {#prompt}

اس کے بعد، ہمیں کوٹس کی اس فہرست کو <span dir="ltr">LLM</span> کے لیے ایک پرامپٹ میں تبدیل کرنے اور مستقبل کی متوقع قدر حاصل کرنے کی ضرورت ہے۔

```sh
git checkout 03-create-prompt
uv run agent.py
```

آؤٹ پٹ اب <span dir="ltr">LLM</span> کے لیے ایک پرامپٹ ہونے جا رہا ہے، جو کچھ اس طرح ہوگا:

```
ان کوٹس کو دیکھتے ہوئے:
اثاثہ: WETH/USDC
        2026-01-20T16:34 3016.21
        .
        .
        .
        2026-02-01T17:49 2299.10

اثاثہ: WBTC/WETH
        2026-01-20T16:34 29.84
        .
        .
        .
        2026-02-01T17:50 33.46


آپ کے خیال میں 2026-02-02T17:56 کے وقت WETH/USDC کی قدر کیا ہوگی؟

اپنا جواب دو اعشاریہ مقامات تک راؤنڈ کیے گئے ایک واحد نمبر کے طور پر فراہم کریں،
بغیر کسی اور متن کے۔
```

نوٹ کریں کہ یہاں دو اثاثوں، `WETH/USDC` اور `WBTC/WETH` کے لیے کوٹس موجود ہیں۔ کسی دوسرے اثاثے سے کوٹس شامل کرنے سے پیش گوئی کی درستگی بہتر ہو سکتی ہے۔

#### پرامپٹ کیسا لگتا ہے {#prompt-explanation}

اس پرامپٹ میں تین حصے ہیں، جو <span dir="ltr">LLM</span> پرامپٹس میں کافی عام ہیں۔

1. معلومات۔ <span dir="ltr">LLMs</span> کے پاس اپنی ٹریننگ سے بہت سی معلومات ہوتی ہیں، لیکن عام طور پر ان کے پاس تازہ ترین معلومات نہیں ہوتیں۔ یہی وجہ ہے کہ ہمیں یہاں تازہ ترین کوٹس بازیافت کرنے کی ضرورت ہے۔ پرامپٹ میں معلومات شامل کرنے کو [ریٹریول آگمینٹڈ جنریشن (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) کہا جاتا ہے۔

2. اصل سوال۔ یہ وہ ہے جو ہم جاننا چاہتے ہیں۔

3. آؤٹ پٹ فارمیٹنگ کی ہدایات۔ عام طور پر، ایک <span dir="ltr">LLM</span> ہمیں ایک تخمینہ دے گا اور ساتھ ہی اس کی وضاحت بھی کرے گا کہ وہ اس تک کیسے پہنچا۔ یہ انسانوں کے لیے بہتر ہے، لیکن کمپیوٹر پروگرام کو صرف حتمی نتیجے کی ضرورت ہوتی ہے۔

#### کوڈ کی وضاحت {#prompt-code}

یہاں نیا کوڈ ہے۔

```python
from datetime import datetime, timezone, timedelta
```

ہمیں <span dir="ltr">LLM</span> کو وہ وقت فراہم کرنے کی ضرورت ہے جس کے لیے ہم تخمینہ چاہتے ہیں۔ مستقبل میں "n منٹ/گھنٹے/دن" کا وقت حاصل کرنے کے لیے، ہم [`timedelta` کلاس](https://docs.python.org/3/library/datetime.html#datetime.timedelta) استعمال کرتے ہیں۔

```python
# ان پولز کے پتے جنہیں ہم پڑھ رہے ہیں
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
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (ٹوکن1 فی ٹوکن0)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

<span dir="ltr">WETH/USDC</span> پول میں، ہم جاننا چاہتے ہیں کہ ہمیں ایک `token1` (<span dir="ltr">WETH</span>) خریدنے کے لیے کتنے `token0` (<span dir="ltr">USDC</span>) درکار ہیں۔ <span dir="ltr">WETH/WBTC</span> پول میں، ہم جاننا چاہتے ہیں کہ ہمیں ایک `token0` (<span dir="ltr">WBTC</span>، جو کہ ریپڈ بٹ کوائن ہے) خریدنے کے لیے کتنے `token1` (<span dir="ltr">WETH</span>) درکار ہیں۔ ہمیں یہ ٹریک کرنے کی ضرورت ہے کہ آیا پول کے تناسب کو الٹنے کی ضرورت ہے یا نہیں۔

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

یہ جاننے کے لیے کہ آیا کسی پول کو الٹنے کی ضرورت ہے، ہم اسے `read_pool` کے ان پٹ کے طور پر حاصل کرتے ہیں۔ نیز، اثاثے کی علامت کو درست طریقے سے سیٹ کرنے کی ضرورت ہے۔

سنٹیکس `<a> if <b> else <c>` [ٹرنری کنڈیشنل آپریٹر (ternary conditional operator)](https://en.wikipedia.org/wiki/Ternary_conditional_operator) کا <span dir="ltr">Python</span> متبادل ہے، جو <span dir="ltr">C</span> سے ماخوذ زبان میں `<b> ? <a> : <c>` ہوگا۔

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

<span dir="ltr">Python</span> میں [ملٹی لائن اسٹرنگ لٹرلز (multi-line string literals)](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) کو `"""` .... `"""` کے طور پر لکھا جاتا ہے۔

```python
Given these quotes:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

یہاں، ہم `format_quotes` کے ساتھ ہر کوٹ کی فہرست کے لیے ایک اسٹرنگ بنانے کے لیے [<span dir="ltr">MapReduce</span>](https://en.wikipedia.org/wiki/MapReduce) پیٹرن کا استعمال کرتے ہیں، پھر انہیں پرامپٹ میں استعمال کے لیے ایک واحد اسٹرنگ میں کم (reduce) کر دیتے ہیں۔

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

### ایک <span dir="ltr">LLM</span> کے ساتھ انٹرفیسنگ {#interface-llm}

اس کے بعد، ہم ایک حقیقی <span dir="ltr">LLM</span> کو پرامپٹ کرتے ہیں اور مستقبل کی متوقع قدر حاصل کرتے ہیں۔ میں نے یہ پروگرام <span dir="ltr">OpenAI</span> کا استعمال کرتے ہوئے لکھا ہے، لہذا اگر آپ کوئی مختلف پرووائیڈر استعمال کرنا چاہتے ہیں، تو آپ کو اسے ایڈجسٹ کرنا ہوگا۔

1. ایک [<span dir="ltr">OpenAI</span> اکاؤنٹ](https://auth.openai.com/create-account) حاصل کریں
2. [اکاؤنٹ میں فنڈز ڈالیں](https://platform.openai.com/settings/organization/billing/overview)—لکھتے وقت کم از کم رقم <span dir="ltr">$5</span> ہے
3. ایک [<span dir="ltr">API</span> کلید بنائیں](https://platform.openai.com/settings/organization/api-keys)
4. کمانڈ لائن میں، <span dir="ltr">API</span> کلید کو ایکسپورٹ کریں تاکہ آپ کا پروگرام اسے استعمال کر سکے

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

open_ai = OpenAI()  # کلائنٹ OPENAI_API_KEY ماحولیاتی متغیر کو پڑھتا ہے
```

<span dir="ltr">OpenAI API</span> کو امپورٹ کریں اور انسٹینشی ایٹ (instantiate) کریں۔

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

جواب بنانے کے لیے <span dir="ltr">OpenAI API</span> (`open_ai.chat.completions.create`) کو کال کریں۔

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

#### پیش گوئیوں کی جانچ کرنا {#testing-the-predictions}

اب جب کہ ہم پیش گوئیاں تیار کر سکتے ہیں، ہم تاریخی ڈیٹا کا استعمال کر کے یہ بھی اندازہ لگا سکتے ہیں کہ آیا ہم مفید پیش گوئیاں تیار کرتے ہیں یا نہیں۔

```sh
uv run test-predictor.py
```

متوقع نتیجہ کچھ اس طرح ہے:

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

ہم `CYCLES_FOR_TEST` (یہاں <span dir="ltr">40</span> کے طور پر بیان کیا گیا ہے) دن پیچھے دیکھتے ہیں۔

```python
# پیش گوئیاں بنائیں اور حقیقی تاریخ سے ان کی جانچ کریں

total_error = Decimal(0)
changes = []
```

ہمیں دو قسم کی غلطیوں میں دلچسپی ہے۔ پہلی، `total_error`، محض ان غلطیوں کا مجموعہ ہے جو پیش گوئی کرنے والے نے کیں۔

دوسری، `changes` کو سمجھنے کے لیے، ہمیں ایجنٹ کا مقصد یاد رکھنے کی ضرورت ہے۔ یہ <span dir="ltr">WETH/USDC</span> تناسب (<span dir="ltr">ETH</span> کی قیمت) کی پیش گوئی کرنا نہیں ہے۔ یہ بیچنے اور خریدنے کی سفارشات جاری کرنا ہے۔ اگر قیمت فی الحال <span dir="ltr">$2000</span> ہے اور یہ کل <span dir="ltr">$2010</span> کی پیش گوئی کرتا ہے، تو ہمیں کوئی اعتراض نہیں اگر اصل نتیجہ <span dir="ltr">$2020</span> ہو اور ہم اضافی رقم کمائیں۔ لیکن ہمیں _ضرور_ اعتراض ہوگا اگر اس نے <span dir="ltr">$2010</span> کی پیش گوئی کی، اور اس سفارش کی بنیاد پر <span dir="ltr">ETH</span> خریدا، اور قیمت گر کر <span dir="ltr">$1990</span> ہو گئی۔

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

ہم صرف ان صورتوں کو دیکھ سکتے ہیں جہاں مکمل تاریخ (پیش گوئی کے لیے استعمال ہونے والی قدریں اور اس کا موازنہ کرنے کے لیے حقیقی دنیا کی قدر) دستیاب ہو۔ اس کا مطلب ہے کہ سب سے نیا کیس وہ ہونا چاہیے جو `CYCLES_BACK` پہلے شروع ہوا تھا۔

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

ایجنٹ کے استعمال کردہ نمونوں کی تعداد کے برابر نمونے حاصل کرنے کے لیے [سلائسز (slices)](https://www.w3schools.com/python/ref_func_slice.asp) کا استعمال کریں۔ یہاں اور اگلے حصے کے درمیان کا کوڈ وہی پیش گوئی حاصل کرنے والا کوڈ ہے جو ہمارے پاس ایجنٹ میں ہے۔

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

متوقع قیمت، اصل قیمت، اور پیش گوئی کے وقت کی قیمت حاصل کریں۔ ہمیں پیش گوئی کے وقت کی قیمت درکار ہے تاکہ یہ تعین کیا جا سکے کہ آیا سفارش خریدنے کی تھی یا بیچنے کی۔

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

`changes` کے لیے، ہم ایک <span dir="ltr">ETH</span> خریدنے یا بیچنے کا مالی اثر چاہتے ہیں۔ لہذا پہلے، ہمیں سفارش کا تعین کرنے کی ضرورت ہے، پھر اندازہ لگائیں کہ اصل قیمت کیسے بدلی، اور کیا سفارش نے پیسے کمائے (مثبت تبدیلی) یا پیسے کا نقصان کیا (منفی تبدیلی)۔

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

منافع بخش دنوں کی تعداد اور نقصان والے دنوں کی تعداد گننے کے لیے [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) کا استعمال کریں۔ نتیجہ ایک فلٹر آبجیکٹ ہے، جسے لمبائی حاصل کرنے کے لیے ہمیں ایک فہرست میں تبدیل کرنے کی ضرورت ہے۔

### ٹرانزیکشنز جمع کرانا {#submit-txn}

اب ہمیں درحقیقت ٹرانزیکشنز جمع کرانے کی ضرورت ہے۔ تاہم، میں اس مقام پر، سسٹم کے ثابت ہونے سے پہلے، حقیقی رقم خرچ نہیں کرنا چاہتا۔ اس کے بجائے، ہم مین نیٹ کا ایک مقامی فورک بنائیں گے، اور اس نیٹ ورک پر "ٹریڈ" کریں گے۔

مقامی فورک بنانے اور ٹریڈنگ کو فعال کرنے کے اقدامات یہ ہیں۔

1. [Foundry](https://getfoundry.sh/introduction/installation) انسٹال کریں

2. [`anvil`](https://getfoundry.sh/anvil/overview) شروع کریں

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` <span dir="ltr">Foundry</span> کے ڈیفالٹ <span dir="ltr">URL</span>، <span dir="ltr">http://localhost:8545</span> پر سن رہا ہے، اس لیے ہمیں [`cast` کمانڈ](https://getfoundry.sh/cast/overview) کے لیے <span dir="ltr">URL</span> کی وضاحت کرنے کی ضرورت نہیں ہے جسے ہم بلاک چین میں ہیرا پھیری کرنے کے لیے استعمال کرتے ہیں۔

3. `anvil` میں چلاتے وقت، دس ٹیسٹ اکاؤنٹس ہوتے ہیں جن میں <span dir="ltr">ETH</span> ہوتا ہے—پہلے والے کے لیے انوائرنمنٹ ویری ایبلز سیٹ کریں

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. یہ وہ کنٹریکٹس ہیں جنہیں ہمیں استعمال کرنے کی ضرورت ہے۔ [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) یونی سویپ <span dir="ltr">v3</span> کنٹریکٹ ہے جسے ہم درحقیقت ٹریڈ کرنے کے لیے استعمال کرتے ہیں۔ ہم براہ راست پول کے ذریعے ٹریڈ کر سکتے تھے، لیکن یہ بہت آسان ہے۔

   نیچے والے دو ویری ایبلز یونی سویپ <span dir="ltr">v3</span> پاتھس ہیں جو <span dir="ltr">WETH</span> اور <span dir="ltr">USDC</span> کے درمیان تبادلہ کرنے کے لیے درکار ہیں۔

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. ہر ٹیسٹ اکاؤنٹ میں <span dir="ltr">10,000 ETH</span> ہیں۔ ٹریڈنگ کے لیے <span dir="ltr">1000 WETH</span> حاصل کرنے کے لیے <span dir="ltr">1000 ETH</span> کو ریپ کرنے کے لیے <span dir="ltr">WETH</span> کنٹریکٹ کا استعمال کریں۔

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. <span dir="ltr">USDC</span> کے بدلے <span dir="ltr">500 WETH</span> کی ٹریڈ کرنے کے لیے `SwapRouter` کا استعمال کریں۔

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   `approve` کال ایک الاؤنس بناتی ہے جو `SwapRouter` کو ہمارے کچھ ٹوکنز خرچ کرنے کی اجازت دیتی ہے۔ کنٹریکٹس ایونٹس کی نگرانی نہیں کر سکتے، اس لیے اگر ہم ٹوکنز براہ راست `SwapRouter` کنٹریکٹ میں منتقل کرتے ہیں، تو اسے معلوم نہیں ہوگا کہ اسے ادائیگی کی گئی تھی۔ اس کے بجائے، ہم `SwapRouter` کنٹریکٹ کو ایک مخصوص رقم خرچ کرنے کی اجازت دیتے ہیں، اور پھر `SwapRouter` ایسا کرتا ہے۔ یہ `SwapRouter` کے ذریعے کال کیے گئے ایک فنکشن کے ذریعے کیا جاتا ہے، تاکہ اسے معلوم ہو سکے کہ آیا یہ کامیاب رہا۔

7. تصدیق کریں کہ آپ کے پاس دونوں ٹوکنز کافی مقدار میں ہیں۔

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

اب جب کہ ہمارے پاس <span dir="ltr">WETH</span> اور <span dir="ltr">USDC</span> ہیں، ہم درحقیقت ایجنٹ کو چلا سکتے ہیں۔

```sh
git checkout 05-trade
uv run agent.py
```

آؤٹ پٹ کچھ اس طرح نظر آئے گا:

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

- لائن <span dir="ltr">14</span> میں، `MAINNET_URL` کو ایک حقیقی ایکسیس پوائنٹ میں تبدیل کریں، جیسے کہ `https://eth.drpc.org`
- لائن <span dir="ltr">28</span> میں، `PRIVATE_KEY` کو اپنی نجی کلید میں تبدیل کریں
- جب تک کہ آپ بہت امیر نہ ہوں اور ایک غیر ثابت شدہ ایجنٹ کے لیے ہر روز <span dir="ltr">1 ETH</span> خرید یا بیچ نہ سکیں، آپ `WETH_TRADE_AMOUNT` کو کم کرنے کے لیے <span dir="ltr">29</span> کو تبدیل کرنا چاہیں گے

#### کوڈ کی وضاحت {#trading-code}

یہاں نیا کوڈ ہے۔

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

وہی ویری ایبلز جو ہم نے قدم <span dir="ltr">4</span> میں استعمال کیے تھے۔

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

`SwapRouter` <span dir="ltr">ABI</span> میں ہمیں صرف `exactInput` کی ضرورت ہے۔ ایک متعلقہ فنکشن، `exactOutput` ہے، جسے ہم بالکل ایک <span dir="ltr">WETH</span> خریدنے کے لیے استعمال کر سکتے ہیں، لیکن سادگی کے لیے ہم دونوں صورتوں میں صرف `exactInput` استعمال کرتے ہیں۔

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

[`account`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) اور `SwapRouter` کنٹریکٹ کے لیے <span dir="ltr">Web3</span> کی تعریفیں۔

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

ٹرانزیکشن کے پیرامیٹرز۔ ہمیں یہاں ایک فنکشن کی ضرورت ہے کیونکہ [نانس](https://en.wikipedia.org/wiki/Cryptographic_nonce) کو ہر بار تبدیل ہونا چاہیے۔

```python
def approve_token(contract: Contract, amount: int):
```

`SwapRouter` کے لیے ٹوکن الاؤنس منظور کریں۔

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

اس طرح ہم <span dir="ltr">Web3</span> میں ٹرانزیکشن بھیجتے ہیں۔ پہلے ہم ٹرانزیکشن بنانے کے لیے [`Contract` آبجیکٹ](https://web3py.readthedocs.io/en/stable/web3.contract.html) کا استعمال کرتے ہیں۔ پھر ہم `PRIVATE_KEY` کا استعمال کرتے ہوئے، ٹرانزیکشن پر دستخط کرنے کے لیے [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) کا استعمال کرتے ہیں۔ آخر میں، ہم ٹرانزیکشن بھیجنے کے لیے [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) کا استعمال کرتے ہیں۔

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

<span dir="ltr">WETH</span> بیچتے وقت یہ پیرامیٹرز ہوتے ہیں۔

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

`SELL_PARAMS` کے برعکس، خریدنے کے پیرامیٹرز تبدیل ہو سکتے ہیں۔ ان پٹ کی رقم <span dir="ltr">1 WETH</span> کی قیمت ہے، جیسا کہ `quote` میں دستیاب ہے۔

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

یہ ایجنٹ فی الحال صرف ایک بار کام کرتا ہے۔ تاہم، آپ اسے مسلسل کام کرنے کے لیے تبدیل کر سکتے ہیں یا تو اسے [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) سے چلا کر یا لائنز <span dir="ltr">368-400</span> کو ایک لوپ میں لپیٹ کر اور [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) کا استعمال کر کے اس وقت تک انتظار کر کے جب تک کہ اگلے سائیکل کا وقت نہ ہو جائے۔

## ممکنہ بہتری {#improvements}

یہ مکمل پروڈکشن ورژن نہیں ہے؛ یہ محض بنیادی باتیں سکھانے کی ایک مثال ہے۔ بہتری کے لیے کچھ خیالات یہ ہیں۔

### زیادہ اسمارٹ ٹریڈنگ {#smart-trading}

دو اہم حقائق ہیں جنہیں ایجنٹ یہ فیصلہ کرتے وقت نظر انداز کر دیتا ہے کہ کیا کرنا ہے۔

- _متوقع تبدیلی کی شدت_۔ ایجنٹ `WETH` کی ایک مقررہ رقم بیچتا ہے اگر قیمت میں کمی کی توقع ہو، قطع نظر اس کے کہ کمی کی شدت کیا ہے۔
  یقیناً، یہ بہتر ہوگا کہ معمولی تبدیلیوں کو نظر انداز کیا جائے اور اس بنیاد پر بیچا جائے کہ ہم قیمت میں کتنی کمی کی توقع کرتے ہیں۔
- _موجودہ پورٹ فولیو_۔ اگر آپ کے پورٹ فولیو کا <span dir="ltr">10%</span> حصہ <span dir="ltr">WETH</span> میں ہے اور آپ کو لگتا ہے کہ قیمت اوپر جائے گی، تو شاید مزید خریدنا سمجھ میں آتا ہے۔ لیکن اگر آپ کے پورٹ فولیو کا <span dir="ltr">90%</span> حصہ <span dir="ltr">WETH</span> میں ہے، تو آپ کو کافی حد تک ایکسپوژر مل چکا ہے، اور مزید خریدنے کی ضرورت نہیں ہے۔ اگر آپ کو قیمت نیچے جانے کی توقع ہے تو اس کا الٹ سچ ہے۔

### کیا ہوگا اگر آپ اپنی ٹریڈنگ کی حکمت عملی کو خفیہ رکھنا چاہتے ہیں؟ {#secret}

<span dir="ltr">AI</span> وینڈرز وہ استفسارات دیکھ سکتے ہیں جو آپ ان کے <span dir="ltr">LLMs</span> کو بھیجتے ہیں، جو آپ کے ایجنٹ کے ساتھ تیار کردہ شاندار ٹریڈنگ سسٹم کو بے نقاب کر سکتا ہے۔ ایک ٹریڈنگ سسٹم جسے بہت زیادہ لوگ استعمال کرتے ہیں وہ بے کار ہے کیونکہ جب آپ خریدنا چاہتے ہیں تو بہت سے لوگ خریدنے کی کوشش کرتے ہیں (اور قیمت اوپر جاتی ہے) اور جب آپ بیچنا چاہتے ہیں تو بیچنے کی کوشش کرتے ہیں (اور قیمت نیچے جاتی ہے)۔

اس مسئلے سے بچنے کے لیے آپ مقامی طور پر ایک <span dir="ltr">LLM</span> چلا سکتے ہیں، مثال کے طور پر، [<span dir="ltr">LM-Studio</span>](https://lmstudio.ai/) کا استعمال کرتے ہوئے۔

### <span dir="ltr">AI</span> بوٹ سے <span dir="ltr">AI</span> ایجنٹ تک {#bot-to-agent}

آپ یہ اچھی دلیل دے سکتے ہیں کہ یہ [ایک <span dir="ltr">AI</span> بوٹ ہے، نہ کہ <span dir="ltr">AI</span> ایجنٹ](/ai-agents/#ai-agents-vs-ai-bots)۔ یہ ایک نسبتاً سادہ حکمت عملی کو لاگو کرتا ہے جو پہلے سے طے شدہ معلومات پر انحصار کرتی ہے۔ ہم خود کو بہتر بنانے کے عمل کو فعال کر سکتے ہیں، مثال کے طور پر، یونی سویپ <span dir="ltr">v3</span> پولز اور ان کی تازہ ترین قدروں کی فہرست فراہم کر کے اور یہ پوچھ کر کہ کس امتزاج کی پیش گوئی کی قدر سب سے بہتر ہے۔

### سلپج سے تحفظ {#slippage-protection}

فی الحال کوئی [سلپج سے تحفظ](https://uniswapv3book.com/milestone_3/slippage-protection.html) نہیں ہے۔ اگر موجودہ کوٹ <span dir="ltr">$2000</span> ہے، اور متوقع قیمت <span dir="ltr">$2100</span> ہے، تو ایجنٹ خریدے گا۔ تاہم، اگر ایجنٹ کے خریدنے سے پہلے لاگت بڑھ کر <span dir="ltr">$2200</span> ہو جاتی ہے، تو مزید خریدنے کا کوئی مطلب نہیں ہے۔

سلپج سے تحفظ کو لاگو کرنے کے لیے، [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325) کی لائنز <span dir="ltr">325</span> اور <span dir="ltr">334</span> میں ایک `amountOutMinimum` قدر کی وضاحت کریں۔

## نتیجہ {#conclusion}

امید ہے، اب آپ <span dir="ltr">AI</span> ایجنٹس کے ساتھ شروعات کرنے کے لیے کافی جانتے ہوں گے۔ یہ اس موضوع کا جامع جائزہ نہیں ہے؛ اس کے لیے پوری کتابیں وقف ہیں، لیکن یہ آپ کو شروع کرنے کے لیے کافی ہے۔ گڈ لک!

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔