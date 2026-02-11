---
title: "ایتھیریم پر اپنا خود کا AI ٹریڈنگ ایجنٹ بنائیں"
description: "اس ٹیوٹوریل میں آپ سیکھیں گے کہ ایک سادہ AI ٹریڈنگ ایجنٹ کیسے بنایا جائے۔ یہ ایجنٹ بلاک چین سے معلومات پڑھتا ہے، اس معلومات کی بنیاد پر LLM سے سفارش مانگتا ہے، LLM کی تجویز کردہ ٹریڈ کرتا ہے، اور پھر انتظار کرتا ہے اور دہراتا ہے۔"
author: "اوری پومیرانٹز"
tags: [ "AI", "ٹریڈنگ", "ایجنٹ", "python" ]
skill: intermediate
published: 2026-02-13
lang: ur-in
sidebarDepth: 3
---

اس ٹیوٹوریل میں آپ سیکھیں گے کہ ایک سادہ AI ٹریڈنگ ایجنٹ کیسے بنایا جائے۔ یہ ایجنٹ ان مراحل کا استعمال کرتے ہوئے کام کرتا ہے:

1. کسی ٹوکن کی موجودہ اور ماضی کی قیمتیں پڑھیں، ساتھ ہی دیگر ممکنہ طور پر متعلقہ معلومات بھی
2. اس معلومات کے ساتھ ایک سوال تیار کریں، پس منظر کی معلومات کے ساتھ یہ بتانے کے لیے کہ یہ کس طرح متعلقہ ہو سکتا ہے
3. سوال جمع کریں اور ایک متوقع قیمت واپس حاصل کریں
4. سفارش کی بنیاد پر ٹریڈ کریں
5. انتظار کریں اور دہرائیں

یہ ایجنٹ ظاہر کرتا ہے کہ معلومات کو کیسے پڑھا جائے، اسے ایک ایسے سوال میں ترجمہ کیا جائے جو قابل استعمال جواب دے، اور اس جواب کا استعمال کیا جائے۔ یہ سب ایک AI ایجنٹ کے لیے درکار اقدامات ہیں۔ اس ایجنٹ کو Python میں لاگو کیا گیا ہے کیونکہ یہ AI میں استعمال ہونے والی سب سے عام زبان ہے۔

## یہ کیوں کریں؟ {#why-do-this}

خودکار ٹریڈنگ ایجنٹس ڈیولپرز کو ٹریڈنگ کی حکمت عملی منتخب کرنے اور اس پر عمل کرنے کی اجازت دیتے ہیں۔ [AI ایجنٹس](/ai-agents) زیادہ پیچیدہ اور متحرک ٹریڈنگ حکمت عملیوں کی اجازت دیتے ہیں، ممکنہ طور پر ایسی معلومات اور الگورتھم کا استعمال کرتے ہوئے جن کے استعمال پر ڈیولپر نے غور بھی نہیں کیا ہے۔

## ٹولز {#tools}

یہ ٹیوٹوریل کوٹس اور ٹریڈنگ کے لیے [Python](https://www.python.org/)، [Web3 لائبریری](https://web3py.readthedocs.io/en/stable/)، اور [Uniswap v3](https://github.com/Uniswap/v3-periphery) کا استعمال کرتا ہے۔

### Python کیوں؟ {#python}

AI کے لیے سب سے زیادہ استعمال ہونے والی زبان [Python](https://www.python.org/) ہے، اس لیے ہم اسے یہاں استعمال کرتے ہیں۔ اگر آپ Python نہیں جانتے تو فکر نہ کریں۔ زبان بہت واضح ہے، اور میں بالکل بتاؤں گا کہ یہ کیا کرتی ہے۔

[Web3 لائبریری](https://web3py.readthedocs.io/en/stable/) سب سے عام Python ایتھیریم API ہے۔ اسے استعمال کرنا بہت آسان ہے۔

### بلاک چین پر ٹریڈنگ {#trading-on-blockchain}

بہت سے [ڈسٹری بیوٹڈ ایکسچینجز (DEX)](/apps/categories/defi/) ہیں جو آپ کو ایتھیریم پر ٹوکنز ٹریڈ کرنے کی اجازت دیتے ہیں۔ تاہم، [آربٹریج](/developers/docs/smart-contracts/composability/#better-user-experience) کی وجہ سے ان کی شرح تبادلہ ایک جیسی ہوتی ہے۔

[Uniswap](https://app.uniswap.org/) ایک وسیع پیمانے پر استعمال ہونے والا DEX ہے جسے ہم کوٹس (ٹوکن کی نسبتی قدریں دیکھنے کے لیے) اور ٹریڈز دونوں کے لیے استعمال کر سکتے ہیں۔

### OpenAI {#openai}

ایک بڑے لینگویج ماڈل کے لیے، میں نے [OpenAI](https://openai.com/) کے ساتھ شروعات کرنے کا انتخاب کیا۔ اس ٹیوٹوریل میں ایپلیکیشن چلانے کے لیے آپ کو API رسائی کے لیے ادائیگی کرنی ہوگی۔ $5 کی کم از کم ادائیگی کافی سے زیادہ ہے۔

## ڈیولپمنٹ، مرحلہ وار {#step-by-step}

ڈیولپمنٹ کو آسان بنانے کے لیے، ہم مراحل میں آگے بڑھتے ہیں۔ ہر مرحلہ GitHub میں ایک برانچ ہے۔

### شروعات کرنا {#getting-started}

UNIX یا Linux (بشمول [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)) کے تحت شروع کرنے کے لیے اقدامات ہیں

1. اگر آپ کے پاس پہلے سے نہیں ہے تو، [Python](https://www.python.org/downloads/) ڈاؤن لوڈ اور انسٹال کریں۔

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

5. ورچوئل ماحول کو فعال کریں۔

   ```sh
   source .venv/bin/activate
   ```

6. یہ تصدیق کرنے کے لیے کہ Python اور Web3 صحیح طریقے سے کام کر رہے ہیں، `python3` چلائیں اور اسے یہ پروگرام فراہم کریں۔ آپ اسے `>>>` پرامپٹ پر درج کر سکتے ہیں۔ فائل بنانے کی کوئی ضرورت نہیں ہے۔

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### بلاک چین سے پڑھنا {#read-blockchain}

اگلا مرحلہ بلاک چین سے پڑھنا ہے۔ ایسا کرنے کے لیے، آپ کو `02-read-quote` برانچ میں تبدیل ہونا ہوگا اور پھر پروگرام چلانے کے لیے `uv` کا استعمال کرنا ہوگا۔

```sh
git checkout 02-read-quote
uv run agent.py
```

آپ کو `Quote` آبجیکٹس کی ایک فہرست موصول ہونی چاہیے، ہر ایک میں ایک ٹائم اسٹیمپ، ایک قیمت، اور اثاثہ (فی الحال ہمیشہ `WETH/USDC`)۔

یہاں لائن بہ لائن وضاحت ہے۔

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

ہمیں جن لائبریریوں کی ضرورت ہے انہیں درآمد کریں۔ ان کی وضاحت نیچے کی گئی ہے جب استعمال کیا جاتا ہے۔

```python
print = functools.partial(print, flush=True)
```

Python کے `print` کو ایک ایسے ورژن سے بدل دیتا ہے جو ہمیشہ آؤٹ پٹ کو فوری طور پر فلش کرتا ہے۔ یہ ایک طویل چلنے والے اسکرپٹ میں مفید ہے کیونکہ ہم اسٹیٹس اپ ڈیٹس یا ڈیبگنگ آؤٹ پٹ کا انتظار نہیں کرنا چاہتے۔

```python
MAINNET_URL = "https://eth.drpc.org"
```

مین نیٹ تک پہنچنے کے لیے ایک URL۔ آپ اسے [نوڈ بطور سروس](/developers/docs/nodes-and-clients/nodes-as-a-service/) سے حاصل کر سکتے ہیں یا [Chainlist](https://chainlist.org/chain/1) میں مشتہر کردہ میں سے ایک استعمال کر سکتے ہیں۔

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

ایک ایتھیریم مین نیٹ بلاک عام طور پر ہر بارہ سیکنڈ میں ہوتا ہے، لہذا یہ ان بلاکس کی تعداد ہے جن کی ہم ایک مدت میں ہونے کی توقع کریں گے۔ نوٹ کریں کہ یہ ایک درست اعداد و شمار نہیں ہے۔ جب [بلاک پروپوزر](/developers/docs/consensus-mechanisms/pos/block-proposal/) ڈاؤن ہوتا ہے، تو اس بلاک کو چھوڑ دیا جاتا ہے، اور اگلے بلاک کا وقت 24 سیکنڈ ہوتا ہے۔ اگر ہم کسی ٹائم اسٹیمپ کے لیے بالکل درست بلاک حاصل کرنا چاہتے ہیں، تو ہم [بائنری سرچ](https://en.wikipedia.org/wiki/Binary_search) استعمال کریں گے۔ تاہم، یہ ہمارے مقاصد کے لیے کافی قریب ہے۔ مستقبل کی پیش گوئی کوئی قطعی سائنس نہیں ہے۔

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

سائیکل کا سائز۔ ہم ہر سائیکل میں ایک بار کوٹس کا جائزہ لیتے ہیں اور اگلے سائیکل کے اختتام پر قدر کا تخمینہ لگانے کی کوشش کرتے ہیں۔

```python
# جس پول کو ہم پڑھ رہے ہیں اس کا پتہ
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

کوٹ کی قدریں Uniswap 3 USDC/WETH پول سے ایڈریس [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract) پر لی جاتی ہیں۔ یہ پتہ پہلے سے ہی چیکسم فارم میں ہے، لیکن کوڈ کو دوبارہ قابل استعمال بنانے کے لیے [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address) استعمال کرنا بہتر ہے۔

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

یہ ان دو معاہدوں کے لیے [ABIs](https://docs.soliditylang.org/en/latest/abi-spec.html) ہیں جن سے ہمیں رابطہ کرنے کی ضرورت ہے۔ کوڈ کو مختصر رکھنے کے لیے، ہم صرف ان فنکشنز کو شامل کرتے ہیں جنہیں ہمیں کال کرنے کی ضرورت ہے۔

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

یہ Python میں ڈیٹا کلاس بنانے کا ایک طریقہ ہے۔ [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) ڈیٹا ٹائپ معاہدے سے جڑنے کے لیے استعمال ہوتا ہے۔ ` (frozen=True)` پر غور کریں۔ Python میں [بولینز](https://en.wikipedia.org/wiki/Boolean_data_type) کو `True` یا `False` کے طور پر بیان کیا جاتا ہے، جو بڑے حروف میں ہوتے ہیں۔ یہ ڈیٹا کلاس `frozen` ہے، جس کا مطلب ہے کہ فیلڈز میں ترمیم نہیں کی جا سکتی۔

انڈینٹیشن پر غور کریں۔ [C- اخذ کردہ زبانوں](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages) کے برعکس، Python بلاکس کو ظاہر کرنے کے لیے انڈینٹیشن کا استعمال کرتا ہے۔ Python مترجم جانتا ہے کہ درج ذیل تعریف اس ڈیٹا کلاس کا حصہ نہیں ہے کیونکہ یہ ڈیٹا کلاس فیلڈز کی طرح اسی انڈینٹیشن سے شروع نہیں ہوتی ہے۔

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

[`Decimal`](https://docs.python.org/3/library/decimal.html) قسم اعشاریہ کسروں کو درست طریقے سے ہینڈل کرنے کے لیے استعمال ہوتی ہے۔

```python
    def get_price(self, block: int) -> Decimal:
```

یہ Python میں ایک فنکشن کی تعریف کرنے کا طریقہ ہے۔ تعریف کو یہ دکھانے کے لیے انڈینٹ کیا گیا ہے کہ یہ اب بھی `PoolInfo` کا حصہ ہے۔

ایک فنکشن میں جو ڈیٹا کلاس کا حصہ ہے، پہلا پیرامیٹر ہمیشہ `self` ہوتا ہے، ڈیٹا کلاس کا وہ نمونہ جو یہاں کال کیا گیا ہے۔ یہاں ایک اور پیرامیٹر ہے، بلاک نمبر۔

```python
        assert block <= w3.eth.block_number, "بلاک مستقبل میں ہے"
```

اگر ہم مستقبل پڑھ سکتے، تو ہمیں ٹریڈنگ کے لیے AI کی ضرورت نہیں ہوتی۔

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

Web3 سے EVM پر فنکشن کال کرنے کا سنٹیکس یہ ہے: `<contract object>.functions.<function name>().call(<parameters>)`۔ پیرامیٹرز EVM فنکشن کے پیرامیٹرز ہو سکتے ہیں (اگر کوئی ہو؛ یہاں کوئی نہیں ہیں) یا بلاک چین کے رویے میں ترمیم کے لیے [نامزد پیرامیٹرز](https://en.wikipedia.org/wiki/Named_parameter)۔ یہاں ہم ایک، `block_identifier`، [بلاک نمبر](/developers/docs/apis/json-rpc/#default-block) کی وضاحت کے لیے استعمال کرتے ہیں جس میں ہم چلنا چاہتے ہیں۔

نتیجہ [یہ struct ہے، ارے فارم میں](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72)۔ پہلی قدر دو ٹوکنز کے درمیان شرح تبادلہ کا ایک فنکشن ہے۔

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

آن چین حسابات کو کم کرنے کے لیے، Uniswap v3 اصل ایکسچینج فیکٹر کو ذخیرہ نہیں کرتا بلکہ اس کا مربع جڑ ذخیرہ کرتا ہے۔ چونکہ EVM فلوٹنگ پوائنٹ ریاضی یا کسروں کو سپورٹ نہیں کرتا، اس لیے اصل قدر کے بجائے، جواب <math><msqrt><mi>price</mi></msqrt><mo>⋅</mo><msup><mn>2</mn><mn>96</mn></msup></math> ہوتا ہے۔

```python
         # (ٹوکن1 فی ٹوکن0)
        return 1/(raw_price * self.decimal_factor)
```

ہمیں جو خام قیمت ملتی ہے وہ ہر `token1` کے لیے ملنے والے `token0` کی تعداد ہے۔ ہمارے پول میں `token0` USDC (امریکی ڈالر کے برابر قدر والا stablecoin) ہے اور `token1` [WETH](https://opensea.io/learn/blockchain/what-is-weth) ہے۔ جو قدر ہم واقعی چاہتے ہیں وہ فی WETH ڈالر کی تعداد ہے، نہ کہ اس کا الٹ۔

اعشاریہ عنصر دو ٹوکنز کے لیے [اعشاریہ عوامل](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) کے درمیان کا تناسب ہے۔

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

یہ ڈیٹا کلاس ایک کوٹ کی نمائندگی کرتی ہے: ایک مخصوص وقت پر ایک مخصوص اثاثہ کی قیمت۔ اس وقت، `asset` فیلڈ غیر متعلقہ ہے کیونکہ ہم ایک ہی پول استعمال کرتے ہیں اور اس لیے ہمارے پاس ایک ہی اثاثہ ہے۔ تاہم، ہم بعد میں مزید اثاثے شامل کریں گے۔

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

یہ فنکشن ایک پتہ لیتا ہے اور اس پتے پر ٹوکن معاہدے کے بارے میں معلومات واپس کرتا ہے۔ ایک نیا [Web3 `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) بنانے کے لیے، ہم `w3.eth.contract` کو پتہ اور ABI فراہم کرتے ہیں۔

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

یہ فنکشن [ایک مخصوص پول](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol) کے بارے میں ہمیں درکار ہر چیز واپس کرتا ہے۔ سنٹیکس `f"<string>"` ایک [فارمیٹڈ سٹرنگ](https://docs.python.org/3/reference/lexical_analysis.html#f-strings) ہے۔

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

ایک `Quote` آبجیکٹ حاصل کریں۔ `block_number` کے لیے ڈیفالٹ ویلیو `None` (کوئی ویلیو نہیں) ہے۔

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

اگر بلاک نمبر کی وضاحت نہیں کی گئی تھی، تو `w3.eth.block_number` استعمال کریں، جو کہ تازہ ترین بلاک نمبر ہے۔ یہ [ایک `if` اسٹیٹمنٹ](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement) کے لیے سنٹیکس ہے۔

ایسا لگ سکتا ہے کہ ڈیفالٹ کو صرف `w3.eth.block_number` پر سیٹ کرنا بہتر ہوتا، لیکن یہ اچھی طرح سے کام نہیں کرتا کیونکہ یہ فنکشن کی تعریف کے وقت بلاک نمبر ہوتا۔ ایک طویل چلنے والے ایجنٹ میں، یہ ایک مسئلہ ہوگا۔

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

اسے انسانوں اور بڑے لینگویج ماڈلز (LLMs) کے لیے پڑھنے کے قابل فارمیٹ میں فارمیٹ کرنے کے لیے [`datetime` لائبریری](https://docs.python.org/3/library/datetime.html) کا استعمال کریں۔ قدر کو دو اعشاریہ مقامات تک راؤنڈ کرنے کے لیے [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize) کا استعمال کریں۔

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

Python میں آپ `list[<type>]` کا استعمال کرتے ہوئے ایک [فہرست](https://docs.python.org/3/library/stdtypes.html#typesseq-list) کی تعریف کرتے ہیں جو صرف ایک مخصوص قسم پر مشتمل ہو سکتی ہے۔

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

Python میں [`for` لوپ](https://docs.python.org/3/tutorial/controlflow.html#for-statements) عام طور پر ایک فہرست پر تکرار کرتا ہے۔ کوٹس تلاش کرنے کے لیے بلاک نمبروں کی فہرست [`range`](https://docs.python.org/3/library/stdtypes.html#range) سے آتی ہے۔

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

ہر بلاک نمبر کے لیے، ایک `Quote` آبجیکٹ حاصل کریں اور اسے `quotes` فہرست میں شامل کریں۔ پھر اس فہرست کو واپس کریں۔

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

اگلا، ہمیں کوٹس کی اس فہرست کو LLM کے لیے ایک پرامپٹ میں تبدیل کرنا ہوگا اور ایک متوقع مستقبل کی قدر حاصل کرنی ہوگی۔

```sh
git checkout 03-create-prompt
uv run agent.py
```

آؤٹ پٹ اب LLM کو ایک پرامپٹ ہوگا، جیسا کہ:

```
یہ کوٹس دیے گئے ہیں:
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


آپ توقع کریں گے کہ WETH/USDC کی قیمت وقت 2026-02-02T17:56 پر کیا ہوگی؟

اپنا جواب دو اعشاریہ مقامات تک گول ایک ہی نمبر کے طور پر فراہم کریں،
کسی اور متن کے بغیر۔
```

غور کریں کہ یہاں دو اثاثوں کے لیے کوٹس ہیں، `WETH/USDC` اور `WBTC/WETH`۔ کسی دوسرے اثاثے سے کوٹس شامل کرنے سے پیشین گوئی کی درستگی بہتر ہو سکتی ہے۔

#### ایک پرامپٹ کیسا لگتا ہے {#prompt-explanation}

اس پرامپٹ میں تین حصے ہیں، جو LLM پرامپٹس میں بہت عام ہیں۔

1. معلومات۔ LLMs کے پاس اپنی تربیت سے بہت سی معلومات ہوتی ہیں، لیکن ان کے پاس عام طور پر تازہ ترین معلومات نہیں ہوتیں۔ یہی وجہ ہے کہ ہمیں یہاں تازہ ترین کوٹس بازیافت کرنے کی ضرورت ہے۔ ایک پرامپٹ میں معلومات شامل کرنا [ریٹریول آگمینٹڈ جنریشن (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) کہلاتا ہے۔

2. اصل سوال۔ یہ وہ ہے جو ہم جاننا چاہتے ہیں۔

3. آؤٹ پٹ فارمیٹنگ ہدایات۔ عام طور پر، ایک LLM ہمیں ایک تخمینہ دے گا جس میں یہ بتایا جائے گا کہ یہ اس تک کیسے پہنچا۔ یہ انسانوں کے لیے بہتر ہے، لیکن ایک کمپیوٹر پروگرام کو صرف نچلی لائن کی ضرورت ہوتی ہے۔

#### کوڈ کی وضاحت {#prompt-code}

یہاں نیا کوڈ ہے۔

```python
from datetime import datetime, timezone, timedelta
```

ہمیں LLM کو وہ وقت فراہم کرنے کی ضرورت ہے جس کے لیے ہم تخمینہ چاہتے ہیں۔ مستقبل میں "n منٹ/گھنٹے/دن" کا وقت حاصل کرنے کے لیے، ہم [`timedelta` کلاس](https://docs.python.org/3/library/datetime.html#datetime.timedelta) کا استعمال کرتے ہیں۔

```python
# جن پولز کو ہم پڑھ رہے ہیں ان کے پتے
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

ہمارے پاس دو پول ہیں جنہیں ہمیں پڑھنے کی ضرورت ہے۔

```python
@dataclass(frozen=True)
class PoolInfo:
    .
    .
    .
    reverse: bool = False

    def get_price(self, block: int) -> Decimal:
        assert block <= w3.eth.block_number, "بلاک مستقبل میں ہے"
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (ٹوکن1 فی ٹوکن0)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

WETH/USDC پول میں، ہم جاننا چاہتے ہیں کہ `token0` (USDC) میں سے کتنے کی ضرورت ہے تاکہ `token1` (WETH) کا ایک خریدا جا سکے۔ WETH/WBTC پول میں، ہم جاننا چاہتے ہیں کہ `token1` (WETH) میں سے کتنے کی ضرورت ہے تاکہ `token0` (WBTC, جو کہ لپیٹا ہوا Bitcoin ہے) کا ایک خریدا جا سکے۔ ہمیں یہ ٹریک کرنے کی ضرورت ہے کہ آیا پول کے تناسب کو الٹنے کی ضرورت ہے۔

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

یہ جاننے کے لیے کہ آیا کسی پول کو الٹنے کی ضرورت ہے، ہم اسے `read_pool` کے ان پٹ کے طور پر حاصل کرتے ہیں۔ اس کے علاوہ، اثاثہ کی علامت کو صحیح طریقے سے ترتیب دینے کی ضرورت ہے۔

سنٹیکس `<a> if <b> else <c>` [ٹرنری کنڈیشنل آپریٹر](https://en.wikipedia.org/wiki/Ternary_conditional_operator) کا Python مساوی ہے، جو C-اخذ کردہ زبان میں `<b> ?` ہوگا <a> : <c>`۔

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"اثاثہ: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

یہ فنکشن ایک سٹرنگ بناتا ہے جو `Quote` آبجیکٹس کی فہرست کو فارمیٹ کرتا ہے، یہ فرض کرتے ہوئے کہ وہ سب ایک ہی اثاثے پر لاگو ہوتے ہیں۔

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

Python میں [ملٹی لائن سٹرنگ لٹرلز](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) کو `"""` .... کے طور پر لکھا جاتا ہے۔ `"""`۔

```python
یہ کوٹس دیے گئے ہیں:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

یہاں، ہم ہر کوٹ فہرست کے لیے `format_quotes` کے ساتھ ایک سٹرنگ بنانے کے لیے [MapReduce](https://en.wikipedia.org/wiki/MapReduce) پیٹرن کا استعمال کرتے ہیں، پھر انہیں پرامپٹ میں استعمال کے لیے ایک ہی سٹرنگ میں کم کرتے ہیں۔

```python
آپ توقع کریں گے کہ {asset} کی قیمت وقت {expected_time} پر کیا ہوگی؟

اپنا جواب دو اعشاریہ مقامات تک گول ایک ہی نمبر کے طور پر فراہم کریں،
کسی اور متن کے بغیر۔
    """
```

پرامپٹ کا باقی حصہ توقع کے مطابق ہے۔

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

اگلا، ہم ایک حقیقی LLM کو پرامپٹ کرتے ہیں اور ایک متوقع مستقبل کی قدر حاصل کرتے ہیں۔ میں نے یہ پروگرام OpenAI کا استعمال کرتے ہوئے لکھا ہے، لہذا اگر آپ کوئی مختلف فراہم کنندہ استعمال کرنا چاہتے ہیں، تو آپ کو اسے ایڈجسٹ کرنا ہوگا۔

1. ایک [OpenAI اکاؤنٹ](https://auth.openai.com/create-account) حاصل کریں

2. [اکاؤنٹ میں فنڈ ڈالیں](https://platform.openai.com/settings/organization/billing/overview)—لکھنے کے وقت کم از کم رقم $5 ہے

3. [ایک API کلید بنائیں](https://platform.openai.com/settings/organization/api-keys)

4. کمانڈ لائن میں، API کلید برآمد کریں تاکہ آپ کا پروگرام اسے استعمال کر سکے

   ```sh
   export OPENAI_API_KEY=sk-<باقی کلید یہاں جاتی ہے>
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

OpenAI API کو امپورٹ اور انسٹینٹیٹ کریں۔

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

print ("موجودہ قیمت:", wethusdc_quotes[-1].price)
print(f"{future_time} میں، متوقع قیمت: {expected_price} USD")

if (expected_price > current_price):
    print(f"خریدیں، مجھے امید ہے کہ قیمت {expected_price - current_price} USD تک بڑھ جائے گی")
else:
    print(f"بیچیں، مجھے امید ہے کہ قیمت {current_price - expected_price} USD تک گر جائے گی")
```

قیمت کو آؤٹ پٹ کریں اور خرید و فروخت کی سفارش فراہم کریں۔

#### پیشین گوئیوں کی جانچ {#testing-the-predictions}

اب جب کہ ہم پیشین گوئیاں پیدا کر سکتے ہیں، ہم تاریخی ڈیٹا کا بھی استعمال کر سکتے ہیں تاکہ یہ اندازہ لگایا جا سکے کہ کیا ہم مفید پیشین گوئیاں پیدا کرتے ہیں۔

```sh
uv run test-predictor.py
```

متوقع نتیجہ اس جیسا ہے:

```
2026-01-05T19:50 کے لیے پیشین گوئی: پیشین گوئی 3138.93 USD، اصل 3218.92 USD، غلطی 79.99 USD
2026-01-06T19:56 کے لیے پیشین گوئی: پیشین گوئی 3243.39 USD، اصل 3221.08 USD، غلطی 22.31 USD
2026-01-07T20:02 کے لیے پیشین گوئی: پیشین گوئی 3223.24 USD، اصل 3146.89 USD، غلطی 76.35 USD
2026-01-08T20:11 کے لیے پیشین گوئی: پیشین گوئی 3150.47 USD، اصل 3092.04 USD، غلطی 58.43 USD
.
.
.
2026-01-31T22:33 کے لیے پیشین گوئی: پیشین گوئی 2637.73 USD، اصل 2417.77 USD، غلطی 219.96 USD
2026-02-01T22:41 کے لیے پیشین گوئی: پیشین گوئی 2381.70 USD، اصل 2318.84 USD، غلطی 62.86 USD
2026-02-02T22:49 کے لیے پیشین گوئی: پیشین گوئی 2234.91 USD، اصل 2349.28 USD، غلطی 114.37 USD
29 پیشین گوئیوں پر اوسط پیشین گوئی کی غلطی: 83.87103448275862068965517241 USD
فی سفارش اوسط تبدیلی: 4.787931034482758620689655172 USD
تبدیلیوں کا معیاری تغیر: 104.42 USD
منافع بخش دن: 51.72%
نقصان والے دن: 48.28%
```

ٹیسٹر کا زیادہ تر حصہ ایجنٹ کی طرح ہی ہے، لیکن یہاں وہ حصے ہیں جو نئے یا ترمیم شدہ ہیں۔

```python
CYCLES_FOR_TEST = 40 # بیک ٹیسٹ کے لیے، ہم کتنے سائیکلوں کی جانچ کرتے ہیں

# بہت سے کوٹس حاصل کریں
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
# پیشین گوئیاں بنائیں اور انہیں حقیقی تاریخ کے خلاف چیک کریں

total_error = Decimal(0)
changes = []
```

دو قسم کی غلطیاں ہیں جن میں ہمیں دلچسپی ہے۔ پہلا، `total_error`، صرف پیش گو نے کی گئی غلطیوں کا مجموعہ ہے۔

دوسرے، `changes`، کو سمجھنے کے لیے، ہمیں ایجنٹ کے مقصد کو یاد رکھنے کی ضرورت ہے۔ یہ WETH/USDC تناسب (ETH قیمت) کی پیش گوئی کرنا نہیں ہے۔ یہ فروخت اور خرید کی سفارشات جاری کرنا ہے۔ اگر قیمت فی الحال $2000 ہے اور یہ کل $2010 کی پیش گوئی کرتا ہے، تو ہمیں کوئی اعتراض نہیں اگر اصل نتیجہ $2020 ہو اور ہم اضافی رقم کمائیں۔ لیکن ہمیں اس وقت اعتراض ہوتا ہے جب اس نے $2010 کی پیش گوئی کی ہو، اور اس سفارش کی بنیاد پر ETH خریدا ہو، اور قیمت $1990 تک گر جائے۔

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

ہم صرف ان معاملات کو دیکھ سکتے ہیں جہاں مکمل تاریخ (پیشین گوئی کے لیے استعمال ہونے والی قدریں اور اس سے موازنہ کرنے کے لیے حقیقی دنیا کی قدر) دستیاب ہے۔ اس کا مطلب ہے کہ سب سے نیا کیس وہ ہونا چاہیے جو `CYCLES_BACK` پہلے شروع ہوا تھا۔

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

[سلائسز](https://www.w3schools.com/python/ref_func_slice.asp) کا استعمال کریں تاکہ نمونوں کی اتنی ہی تعداد حاصل کی جا سکے جتنی ایجنٹ استعمال کرتا ہے۔ یہاں اور اگلے حصے کے درمیان کا کوڈ وہی ہے جو ایجنٹ میں موجود پیشین گوئی حاصل کرنے والا کوڈ ہے۔

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

پیشین گوئی کی گئی قیمت، حقیقی قیمت، اور پیشین گوئی کے وقت کی قیمت حاصل کریں۔ یہ تعین کرنے کے لیے کہ سفارش خریدنے کی تھی یا بیچنے کی، ہمیں پیشین گوئی کے وقت کی قیمت کی ضرورت ہے۔

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Prediction for {prediction_time}: predicted {predicted_price} USD, real {real_price} USD, error {error} USD")
```

غلطی کا اندازہ لگائیں، اور اسے کل میں شامل کریں۔

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

`changes` کے لیے، ہم ایک ETH خریدنے یا بیچنے کے مالیاتی اثرات چاہتے ہیں۔ لہذا پہلے، ہمیں سفارش کا تعین کرنے کی ضرورت ہے، پھر یہ اندازہ لگانا ہے کہ اصل قیمت کس طرح تبدیل ہوئی، اور کیا سفارش نے پیسہ کمایا (مثبت تبدیلی) یا پیسہ خرچ کیا (منفی تبدیلی)۔

```python
print (f"Mean prediction error over {len(wethusdc_quotes)-CYCLES_BACK} predictions: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Mean change per recommendation: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Standard variance of changes: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

نتائج کی اطلاع دیں۔

```python
print (f"Profitable days: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Losing days: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

منافع بخش دنوں اور مہنگے دنوں کی تعداد گننے کے لیے [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) کا استعمال کریں۔ نتیجہ ایک فلٹر آبجیکٹ ہے، جسے ہمیں لمبائی حاصل کرنے کے لیے ایک فہرست میں تبدیل کرنے کی ضرورت ہے۔

### ٹرانزیکشنز جمع کرنا {#submit-txn}

اب ہمیں اصل میں ٹرانزیکشنز جمع کرنے کی ضرورت ہے۔ تاہم، میں اس وقت حقیقی رقم خرچ نہیں کرنا چاہتا، اس سے پہلے کہ سسٹم ثابت ہو جائے۔ اس کے بجائے، ہم مین نیٹ کا ایک مقامی فورک بنائیں گے، اور اس نیٹ ورک پر "ٹریڈ" کریں گے۔

یہاں ایک مقامی فورک بنانے اور ٹریڈنگ کو فعال کرنے کے اقدامات ہیں۔

1. [Foundry](https://getfoundry.sh/introduction/installation) انسٹال کریں

2. [`anvil`](https://getfoundry.sh/anvil/overview) شروع کریں

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` Foundry کے لیے ڈیفالٹ URL، http://localhost:8545 پر سن رہا ہے، لہذا ہمیں [ `cast` کمانڈ](https://getfoundry.sh/cast/overview) کے لیے URL کی وضاحت کرنے کی ضرورت نہیں ہے جسے ہم بلاک چین میں ہیرا پھیری کے لیے استعمال کرتے ہیں۔

3. `anvil` میں چلتے وقت، دس ٹیسٹ اکاؤنٹس ہیں جن میں ETH ہے — پہلے والے کے لیے ماحولیاتی متغیرات سیٹ کریں

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. یہ وہ معاہدے ہیں جنہیں ہمیں استعمال کرنے کی ضرورت ہے۔ [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) Uniswap v3 معاہدہ ہے جسے ہم اصل میں ٹریڈ کرنے کے لیے استعمال کرتے ہیں۔ ہم براہ راست پول کے ذریعے ٹریڈ کر سکتے ہیں، لیکن یہ بہت آسان ہے۔

   نیچے کے دو متغیرات Uniswap v3 کے راستے ہیں جو WETH اور USDC کے درمیان تبادلہ کرنے کے لیے درکار ہیں۔

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. ہر ٹیسٹ اکاؤنٹ میں 10,000 ETH ہیں۔ ٹریڈنگ کے لیے 1000 WETH حاصل کرنے کے لیے 1000 ETH کو لپیٹنے کے لیے WETH معاہدہ استعمال کریں۔

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. USDC کے لیے 500 WETH ٹریڈ کرنے کے لیے `SwapRouter` کا استعمال کریں۔

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   `approve` کال ایک الاؤنس بناتی ہے جو `SwapRouter` کو ہمارے کچھ ٹوکنز خرچ کرنے کی اجازت دیتی ہے۔ معاہدے واقعات کی نگرانی نہیں کر سکتے، لہذا اگر ہم براہ راست `SwapRouter` معاہدے میں ٹوکن منتقل کرتے ہیں، تو اسے یہ معلوم نہیں ہوگا کہ اسے ادائیگی کی گئی ہے۔ اس کے بجائے، ہم `SwapRouter` معاہدے کو ایک خاص رقم خرچ کرنے کی اجازت دیتے ہیں، اور پھر `SwapRouter` یہ کرتا ہے۔ یہ `SwapRouter` کے ذریعے کال کیے گئے فنکشن کے ذریعے کیا جاتا ہے، لہذا یہ جانتا ہے کہ آیا یہ کامیاب تھا۔

7. تصدیق کریں کہ آپ کے پاس دونوں ٹوکنز کافی ہیں۔

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

اب جب کہ ہمارے پاس WETH اور USDC ہے، ہم اصل میں ایجنٹ چلا سکتے ہیں۔

```sh
git checkout 05-trade
uv run agent.py
```

آؤٹ پٹ اس جیسا نظر آئے گا:

```
(ai-trading-agent) qbzzt@Ori-Cloudnomics:~/260215-ai-agent$ uv run agent.py
موجودہ قیمت: 1843.16
2026-02-06T23:07 میں، متوقع قیمت: 1724.41 USD
ٹریڈ سے پہلے اکاؤنٹ بیلنس:
USDC بیلنس: 927301.578272
WETH بیلنس: 500
بیچیں، مجھے امید ہے کہ قیمت 118.75 USD تک گر جائے گی
منظور شدہ ٹرانزیکشن بھیجی گئی: 74e367ddbb407c1aaf567d87aa5863049991b1d2aa092b6b85195d925e2bd41f
منظور شدہ ٹرانزیکشن مائن ہو گئی۔
فروخت ٹرانزیکشن بھیجی گئی: fad1bcf938585c9e90364b26ac7a80eea9efd34c37e5db81e58d7655bcae28bf
فروخت ٹرانزیکشن مائن ہو گئی۔
ٹریڈ کے بعد اکاؤنٹ بیلنس:
USDC بیلنس: 929143.797116
WETH بیلنس: 499
```

اسے اصل میں استعمال کرنے کے لیے، آپ کو کچھ معمولی تبدیلیوں کی ضرورت ہے۔

- لائن 14 میں، `MAINNET_URL` کو ایک حقیقی رسائی پوائنٹ میں تبدیل کریں، جیسے `https://eth.drpc.org`
- لائن 28 میں، `PRIVATE_KEY` کو اپنی ذاتی کلید میں تبدیل کریں
- جب تک آپ بہت امیر نہ ہوں اور ایک غیر ثابت شدہ ایجنٹ کے لیے ہر روز 1 ETH خرید یا بیچ سکتے ہوں، آپ `WETH_TRADE_AMOUNT` کو کم کرنے کے لیے 29 کو تبدیل کرنا چاہ سکتے ہیں۔

#### کوڈ کی وضاحت {#trading-code}

یہاں نیا کوڈ ہے۔

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

وہی متغیرات جو ہم نے مرحلہ 4 میں استعمال کیے تھے۔

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

اصل میں ٹریڈ کرنے کے لیے، ہمیں `approve` فنکشن کی ضرورت ہے۔ ہم پہلے اور بعد میں بیلنس بھی دکھانا چاہتے ہیں، لہذا ہمیں `balanceOf` کی بھی ضرورت ہے۔

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

`SwapRouter` ABI میں ہمیں صرف `exactInput` کی ضرورت ہے۔ ایک متعلقہ فنکشن ہے، `exactOutput`، جسے ہم بالکل ایک WETH خریدنے کے لیے استعمال کر سکتے ہیں، لیکن سادگی کے لیے ہم دونوں صورتوں میں صرف `exactInput` استعمال کرتے ہیں۔

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

[`account`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) اور `SwapRouter` معاہدے کے لیے Web3 کی تعریفیں۔

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

ٹرانزیکشن کے پیرامیٹرز۔ ہمیں یہاں ایک فنکشن کی ضرورت ہے کیونکہ [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) ہر بار تبدیل ہونا چاہیے۔

```python
def approve_token(contract: Contract, amount: int):
```

`SwapRouter` کے لیے ٹوکن الاؤنس منظور کریں۔

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

یہ وہ طریقہ ہے جس سے ہم Web3 میں ٹرانزیکشن بھیجتے ہیں۔ پہلے ہم ٹرانزیکشن بنانے کے لیے [`Contract` آبجیکٹ](https://web3py.readthedocs.io/en/stable/web3.contract.html) کا استعمال کرتے ہیں۔ پھر ہم `PRIVATE_KEY` کا استعمال کرتے ہوئے، ٹرانزیکشن پر دستخط کرنے کے لیے [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) کا استعمال کرتے ہیں۔ آخر میں، ہم ٹرانزیکشن بھیجنے کے لیے [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) کا استعمال کرتے ہیں۔

```python
    print(f"Approve transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Approve transaction mined.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) ٹرانزیکشن کے مائن ہونے تک انتظار کرتا ہے۔ یہ ضرورت پڑنے پر رسید واپس کرتا ہے۔

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

یہ WETH بیچتے وقت کے پیرامیٹرز ہیں۔

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

`SELL_PARAMS` کے برعکس، خرید کے پیرامیٹرز تبدیل ہو سکتے ہیں۔ ان پٹ کی رقم 1 WETH کی قیمت ہے، جیسا کہ `quote` میں دستیاب ہے۔

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

`buy()` اور `sell()` فنکشنز تقریباً ایک جیسے ہیں۔ پہلے ہم `SwapRouter` کے لیے کافی الاؤنس منظور کرتے ہیں، اور پھر ہم اسے صحیح راستے اور رقم کے ساتھ کال کرتے ہیں۔

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

دونوں کرنسیوں میں صارف کے بیلنس کی اطلاع دیں۔

```python
print("ٹریڈ سے پہلے اکاؤنٹ بیلنس:")
balances()

if (expected_price > current_price):
    print(f"خریدیں، مجھے امید ہے کہ قیمت {expected_price - current_price} USD تک بڑھ جائے گی")
    buy(wethusdc_quotes[-1])
else:
    print(f"بیچیں، مجھے امید ہے کہ قیمت {current_price - expected_price} USD تک گر جائے گی")
    sell()

print("ٹریڈ کے بعد اکاؤنٹ بیلنس:")
balances()
```

یہ ایجنٹ فی الحال صرف ایک بار کام کرتا ہے۔ تاہم، آپ اسے [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) سے چلا کر یا لائن 368-400 کو ایک لوپ میں لپیٹ کر اور [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) کا استعمال کرکے اسے مسلسل کام کرنے کے لیے تبدیل کر سکتے ہیں تاکہ اگلے سائیکل کا وقت آنے تک انتظار کیا جا سکے۔

## ممکنہ بہتری {#improvements}

یہ ایک مکمل پروڈکشن ورژن نہیں ہے؛ یہ صرف بنیادی باتیں سکھانے کے لیے ایک مثال ہے۔ یہاں بہتری کے لیے کچھ خیالات ہیں۔

### ہوشیار ٹریڈنگ {#smart-trading}

دو اہم حقائق ہیں جنہیں ایجنٹ نظر انداز کرتا ہے جب وہ فیصلہ کرتا ہے کہ کیا کرنا ہے۔

- _متوقع تبدیلی کی شدت۔_ ایجنٹ ایک مقررہ رقم کا `WETH` فروخت کرتا ہے اگر قیمت میں کمی کی توقع ہو، چاہے کمی کی شدت کچھ بھی ہو۔
  یقیناً، معمولی تبدیلیوں کو نظر انداز کرنا اور اس بات کی بنیاد پر فروخت کرنا بہتر ہوگا کہ ہم قیمت میں کتنی کمی کی توقع کرتے ہیں۔
- _موجودہ پورٹ فولیو۔_ اگر آپ کے پورٹ فولیو کا 10% WETH میں ہے اور آپ کو لگتا ہے کہ قیمت بڑھے گی، تو شاید مزید خریدنا سمجھ میں آتا ہے۔ لیکن اگر آپ کے پورٹ فولیو کا 90% WETH میں ہے، تو آپ کافی حد تک بے نقاب ہو سکتے ہیں، اور مزید خریدنے کی ضرورت نہیں ہے۔ الٹا سچ ہے اگر آپ کو قیمت کم ہونے کی توقع ہے۔

### اگر آپ اپنی ٹریڈنگ کی حکمت عملی کو خفیہ رکھنا چاہتے ہیں تو کیا ہوگا؟ {#secret}

AI وینڈرز آپ کے LLMs کو بھیجے گئے سوالات دیکھ سکتے ہیں، جو آپ کے ایجنٹ کے ساتھ تیار کردہ جینئس ٹریڈنگ سسٹم کو بے نقاب کر سکتے ہیں۔ ایک ٹریڈنگ سسٹم جسے بہت سے لوگ استعمال کرتے ہیں وہ بیکار ہے کیونکہ بہت سے لوگ اس وقت خریدنے کی کوشش کرتے ہیں جب آپ خریدنا چاہتے ہیں (اور قیمت بڑھ جاتی ہے) اور اس وقت بیچنے کی کوشش کرتے ہیں جب آپ بیچنا چاہتے ہیں (اور قیمت گر جاتی ہے)۔

آپ مقامی طور پر ایک LLM چلا سکتے ہیں، مثال کے طور پر، [LM-Studio](https://lmstudio.ai/) کا استعمال کرتے ہوئے، اس مسئلے سے بچنے کے لیے۔

### AI بوٹ سے AI ایجنٹ تک {#bot-to-agent}

آپ ایک اچھا کیس بنا سکتے ہیں کہ یہ [ایک AI بوٹ ہے، نہ کہ AI ایجنٹ](/ai-agents/#ai-agents-vs-ai-bots)۔ یہ ایک نسبتاً آسان حکمت عملی کو نافذ کرتا ہے جو پہلے سے طے شدہ معلومات پر انحصار کرتا ہے۔ ہم خود کو بہتر بنانے کو فعال کر سکتے ہیں، مثال کے طور پر، Uniswap v3 پولز کی ایک فہرست اور ان کی تازہ ترین قدریں فراہم کرکے اور یہ پوچھ کر کہ کس امتزاج کی بہترین پیشین گوئی کی قدر ہے۔

### سلپیج پروٹیکشن {#slippage-protection}

فی الحال کوئی [سلپیج پروٹیکشن](https://uniswapv3book.com/milestone_3/slippage-protection.html) نہیں ہے۔ اگر موجودہ کوٹ $2000 ہے، اور متوقع قیمت $2100 ہے، تو ایجنٹ خریدے گا۔ تاہم، اگر ایجنٹ کے خریدنے سے پہلے لاگت $2200 تک بڑھ جاتی ہے، تو مزید خریدنے کا کوئی مطلب نہیں ہے۔

سلپیج پروٹیکشن کو نافذ کرنے کے لیے، [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325) کی لائن 325 اور 334 میں `amountOutMinimum` کی قدر کی وضاحت کریں۔

## نتیجہ {#conclusion}

امید ہے، اب آپ AI ایجنٹس کے ساتھ شروع کرنے کے لیے کافی جانتے ہیں۔ یہ اس موضوع کا ایک جامع جائزہ نہیں ہے؛ اس کے لیے پوری کتابیں وقف ہیں، لیکن یہ آپ کو شروع کرنے کے لیے کافی ہے۔ گڈ لک!

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔
