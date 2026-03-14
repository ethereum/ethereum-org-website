---
title: "اصنع وكيل تداول الذكاء الاصطناعي الخاص بك على الإيثريوم"
description: "في هذا البرنامج التعليمي، ستتعلم كيفية إنشاء وكيل تداول بسيط للذكاء الاصطناعي. يقرأ هذا الوكيل المعلومات من سلسلة الكتل (blockchain)، ويطلب من LLM توصية بناءً على تلك المعلومات، وينفذ الصفقة التي يوصي بها LLM، ثم ينتظر ويكرر."
author: Ori Pomerantz
tags: [ "الذكاء الاصطناعي", "تداول", "وكيل", "python" ]
skill: intermediate
published: 2026-02-13
lang: ar
sidebarDepth: 3
---

في هذا البرنامج التعليمي، ستتعلم كيفية إنشاء وكيل تداول بسيط للذكاء الاصطناعي. يعمل هذا الوكيل باستخدام هذه الخطوات:

1. قراءة الأسعار الحالية والسابقة لرمز مميز، بالإضافة إلى معلومات أخرى قد تكون ذات صلة
2. إنشاء استعلام بهذه المعلومات، بالإضافة إلى معلومات أساسية لشرح مدى صلتها بالموضوع
3. إرسال الاستعلام واستلام سعر متوقع
4. التداول بناءً على التوصية
5. انتظر وكرر

يوضح هذا الوكيل كيفية قراءة المعلومات وترجمتها إلى استعلام ينتج عنه إجابة قابلة للاستخدام واستخدام تلك الإجابة. كل هذه خطوات مطلوبة لوكيل الذكاء الاصطناعي. يتم تنفيذ هذا الوكيل بلغة بايثون Python لأنها اللغة الأكثر شيوعًا المستخدمة في الذكاء الاصطناعي.

## لماذا نفعل هذا؟ {#why-do-this}

تسمح وكلاء التداول الآلي للمطورين باختيار وتنفيذ استراتيجية تداول. تسمح [وكلاء الذكاء الاصطناعي](/ai-agents) باستراتيجيات تداول أكثر تعقيدًا وديناميكية، ومن المحتمل استخدام معلومات وخوارزميات لم يفكر المطور في استخدامها.

## الأدوات {#tools}

يستخدم هذا البرنامج التعليمي [Python](https://www.python.org/) و[مكتبة Web3](https://web3py.readthedocs.io/en/stable/) و[Uniswap v3](https://github.com/Uniswap/v3-periphery) للحصول على عروض الأسعار والتداول.

### لماذا لغة Python؟ {#python}

اللغة الأكثر استخدامًا في الذكاء الاصطناعي هي [Python](https://www.python.org/)، لذلك نستخدمها هنا. لا تقلق إذا كنت لا تعرف لغة بايثون Python. اللغة واضحة جدًا، وسأشرح بالضبط ما تفعله.

تُعد [مكتبة Web3](https://web3py.readthedocs.io/en/stable/) هي واجهة برمجة تطبيقات Ethereum API الأكثر شيوعًا في لغة Python. إنه سهل الاستخدام إلى حد ما.

### التداول على سلسلة الكتل (blockchain) {#trading-on-blockchain}

هناك [العديد من منصات التداول الموزعة (DEX)](/apps/categories/defi/) التي تتيح لك تداول الرموز المميزة على Ethereum. ومع ذلك، فإنها تميل إلى أن تكون لها أسعار صرف متشابهة بسبب [المراجحة](/developers/docs/smart-contracts/composability/#better-user-experience).

تعتبر [Uniswap](https://app.uniswap.org/) منصة تداول لامركزية مستخدمة على نطاق واسع ويمكننا استخدامها لكل من عروض الأسعار (لرؤية القيم النسبية للرموز المميزة) والصفقات.

### OpenAI {#openai}

بالنسبة لنموذج لغوي كبير، اخترت أن أبدأ مع [OpenAI](https://openai.com/). لتشغيل التطبيق في هذا البرنامج التعليمي، ستحتاج إلى الدفع للوصول إلى واجهة برمجة التطبيقات API. الحد الأدنى للدفع وهو 5 دولارات هو أكثر من كافٍ.

## التطوير، خطوة بخطوة {#step-by-step}

لتبسيط التطوير، ننتقل على مراحل. كل خطوة هي فرع في GitHub.

### البدء {#getting-started}

هناك خطوات للبدء في استخدام UNIX أو Linux (بما في ذلك [WSL](https://learn.microsoft.com/en-us/windows/wsl/install))

1. إذا لم يكن لديك بالفعل، فقم بتنزيل وتثبيت [Python](https://www.python.org/downloads/).

2. استنسخ مستودع GitHub.

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. قم بتثبيت [`uv`](https://docs.astral.sh/uv/getting-started/installation/). قد يكون الأمر على نظامك مختلفًا.

   ```sh
   pipx install uv
   ```

4. قم بتنزيل المكتبات.

   ```sh
   uv sync
   ```

5. قم بتنشيط البيئة الافتراضية.

   ```sh
   source .venv/bin/activate
   ```

6. للتحقق من أن Python وWeb3 يعملان بشكل صحيح، قم بتشغيل `python3` وزوده بهذا البرنامج. يمكنك إدخاله في الموجه `>>>`؛ ليست هناك حاجة لإنشاء ملف.

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### القراءة من سلسلة الكتل (blockchain) {#read-blockchain}

الخطوة التالية هي القراءة من سلسلة الكتل (blockchain). للقيام بذلك، تحتاج إلى التغيير إلى الفرع `02-read-quote` ثم استخدام `uv` لتشغيل البرنامج.

```sh
git checkout 02-read-quote
uv run agent.py
```

يجب أن تتلقى قائمة بكائنات `Quote`، لكل منها طابع زمني وسعر وأصل (حاليًا دائمًا `WETH/USDC`).

إليك شرح سطر بسطر.

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

استورد المكتبات التي نحتاجها. يتم شرحها أدناه عند استخدامها.

```python
print = functools.partial(print, flush=True)
```

يستبدل `print` في لغة Python بإصدار يقوم دائمًا بتفريغ الإخراج على الفور. هذا مفيد في نص برمجي طويل الأمد لأننا لا نريد انتظار تحديثات الحالة أو إخراج تصحيح الأخطاء.

```python
MAINNET_URL = "https://eth.drpc.org"
```

عنوان URL للوصول إلى الشبكة الرئيسية (mainnet). يمكنك الحصول على واحدة من [العقدة كخدمة](/developers/docs/nodes-and-clients/nodes-as-a-service/) أو استخدام إحدى تلك المعلن عنها في [Chainlist](https://chainlist.org/chain/1).

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

تحدث كتلة الشبكة الرئيسية لـ Ethereum عادةً كل اثنتي عشرة ثانية، لذا فهذه هي عدد الكتل التي نتوقع حدوثها في فترة زمنية. لاحظ أن هذا ليس رقمًا دقيقًا. عندما يكون [مقدم الكتلة](/developers/docs/consensus-mechanisms/pos/block-proposal/) معطلاً، يتم تخطي تلك الكتلة، ويكون وقت الكتلة التالية 24 ثانية. إذا أردنا الحصول على الكتلة الدقيقة للطابع الزمني، فسنستخدم [البحث الثنائي](https://en.wikipedia.org/wiki/Binary_search). ومع ذلك، هذا قريب بما فيه الكفاية لأغراضنا. التنبؤ بالمستقبل ليس علمًا دقيقًا.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

حجم الدورة. نراجع عروض الأسعار مرة واحدة في كل دورة ونحاول تقدير القيمة في نهاية الدورة التالية.

```python
# عنوان المجمع الذي نقرأ منه
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

تؤخذ قيم عروض الأسعار من مجمع Uniswap 3 USDC/WETH على العنوان [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract). هذا العنوان موجود بالفعل في شكل المجموع الاختباري، ولكن من الأفضل استخدام [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address) لجعل الكود قابلاً لإعادة الاستخدام.

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

هذه هي [واجهات التطبيق الثنائية ABIs](https://docs.soliditylang.org/en/latest/abi-spec.html) للعقدين اللذين نحتاج إلى الاتصال بهما. للحفاظ على الكود موجزًا، نقوم بتضمين الوظائف التي نحتاج إلى استدعائها فقط.

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

قم ببدء مكتبة [`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) واتصل بعقدة Ethereum.

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

هذه إحدى طرق إنشاء فئة بيانات في لغة Python. يُستخدم نوع البيانات [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) للاتصال بالعقد. لاحظ `(frozen=True)`. في لغة بايثون Python، تُعرَّف [القيم المنطقية booleans](https://en.wikipedia.org/wiki/Boolean_data_type) على أنها `True` أو `False`، بأحرف كبيرة. فئة البيانات هذه `frozen`، مما يعني أنه لا يمكن تعديل الحقول.

لاحظ المسافة البادئة. على عكس [اللغات المشتقة من C](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages)، تستخدم لغة Python المسافة البادئة للإشارة إلى الكتل. يعرف مفسر Python أن التعريف التالي ليس جزءًا من فئة البيانات هذه لأنه لا يبدأ بنفس المسافة البادئة لحقول فئة البيانات.

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

يُستخدم النوع [`Decimal`](https://docs.python.org/3/library/decimal.html) للتعامل مع الكسور العشرية بدقة.

```python
    def get_price(self, block: int) -> Decimal:
```

هذه هي طريقة تعريف دالة في Python. التعريف بمسافة بادئة لإظهار أنه لا يزال جزءًا من `PoolInfo`.

في دالة تعد جزءًا من فئة بيانات، يكون المعامل الأول دائمًا هو `self`، وهو مثيل فئة البيانات الذي تم استدعاؤه هنا. هنا يوجد معلمة أخرى، رقم الكتلة.

```python
        assert block <= w3.eth.block_number, "Block is in the future"
```

إذا استطعنا قراءة المستقبل، فلن نحتاج إلى الذكاء الاصطناعي للتداول.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

بناء الجملة لاستدعاء دالة على آلة الإيثريوم الافتراضية EVM من Web3 هو كالتالي: `<contract object>.functions.<function name>().call(<parameters>)`. يمكن أن تكون المعلمات هي معلمات دالة آلة الإيثريوم الافتراضية EVM (إن وجدت؛ هنا لا توجد) أو [معلمات مسماة](https://en.wikipedia.org/wiki/Named_parameter) لتعديل سلوك سلسلة الكتل (blockchain). هنا نستخدم واحدًا، `block_identifier`، لتحديد [رقم الكتلة](/developers/docs/apis/json-rpc/#default-block) الذي نرغب في التشغيل فيه.

النتيجة هي [هذه البنية، في شكل مصفوفة](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72). القيمة الأولى هي دالة لسعر الصرف بين الرمزين.

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

لتقليل الحسابات على السلسلة، لا يقوم Uniswap v3 بتخزين عامل الصرف الفعلي بل جذره التربيعي. نظرًا لأن آلة إيثريوم الافتراضية (EVM) لا تدعم حسابات النقطة العائمة أو الكسور، فبدلاً من القيمة الفعلية، تكون الاستجابة <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5</mo><msup><mn>2</mn><mn>96</mn></msup></math>

```python
         # (token1 لكل token0)
        return 1/(raw_price * self.decimal_factor)
```

السعر الخام الذي نحصل عليه هو عدد `token0` الذي نحصل عليه مقابل كل `token1`. في مجمعنا، `token0` هو USDC (عملة مستقرة بنفس قيمة الدولار الأمريكي) و`token1` هو [WETH](https://opensea.io/learn/blockchain/what-is-weth). القيمة التي نريدها حقًا هي عدد الدولارات لكل WETH، وليس العكس.

العامل العشري هو النسبة بين [العوامل العشرية](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) للرمزين.

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

تمثل فئة البيانات هذه عرض سعر: سعر أصل معين في نقطة زمنية معينة. في هذه المرحلة، حقل `asset` غير ذي صلة لأننا نستخدم مجمعًا واحدًا وبالتالي لدينا أصل واحد. ومع ذلك، سنضيف المزيد من الأصول لاحقًا.

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

تأخذ هذه الدالة عنوانًا وتعيد معلومات حول عقد الرمز المميز في ذلك العنوان. لإنشاء [عقد Web3 `Contract` جديد](https://web3py.readthedocs.io/en/stable/web3.contract.html)، نوفر العنوان وواجهة التطبيق الثنائية ABI لـ `w3.eth.contract`.

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

تعيد هذه الدالة كل ما نحتاجه حول [مجمع معين](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol). البناء `f"<string>"` هو [سلسلة نصية منسقة](https://docs.python.org/3/reference/lexical_analysis.html#f-strings).

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

الحصول على كائن `Quote`. القيمة الافتراضية لـ `block_number` هي `None` (بدون قيمة).

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

إذا لم يتم تحديد رقم كتلة، فاستخدم `w3.eth.block_number`، وهو أحدث رقم كتلة. هذا هو بناء الجملة لـ[عبارة `if`](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement).

قد يبدو أنه كان من الأفضل تعيين القيمة الافتراضية على `w3.eth.block_number`، ولكن هذا لا يعمل جيدًا لأنه سيكون رقم الكتلة في وقت تعريف الدالة. في وكيل يعمل لفترة طويلة، ستكون هذه مشكلة.

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

استخدم [مكتبة `datetime`](https://docs.python.org/3/library/datetime.html) لتنسيقها إلى تنسيق قابل للقراءة من قبل البشر ونماذج اللغة الكبيرة (LLMs). استخدم [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize) لتقريب القيمة إلى منزلتين عشريتين.

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

في لغة Python، يمكنك تعريف [قائمة](https://docs.python.org/3/library/stdtypes.html#typesseq-list) لا يمكن أن تحتوي إلا على نوع معين باستخدام `list[<type>]`.

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

في Python، تتكرر [حلقة `for`](https://docs.python.org/3/tutorial/controlflow.html#for-statements) عادةً على قائمة. تأتي قائمة أرقام الكتل التي يتم البحث عن عروض الأسعار فيها من [`range`](https://docs.python.org/3/library/stdtypes.html#range).

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

لكل رقم كتلة، احصل على كائن `Quote` وأضفه إلى قائمة `quotes`. ثم قم بإرجاع تلك القائمة.

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

هذا هو الكود الرئيسي للبرنامج النصي. اقرأ معلومات المجمع، واحصل على اثني عشر عرض سعر، وقم بطباعتها بشكل جميل [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint).

### إنشاء موجه {#prompt}

بعد ذلك، نحتاج إلى تحويل هذه القائمة من عروض الأسعار إلى موجه لـ LLM والحصول على قيمة مستقبلية متوقعة.

```sh
git checkout 03-create-prompt
uv run agent.py
```

سيكون الإخراج الآن موجهًا إلى LLM، على غرار:

```
بالنظر إلى عروض الأسعار هذه:
الأصل: WETH/USDC
        2026-01-20T16:34 3016.21
        .
        .
        .
        2026-02-01T17:49 2299.10

الأصل: WBTC/WETH
        2026-01-20T16:34 29.84
        .
        .
        .
        2026-02-01T17:50 33.46


ماذا تتوقع أن تكون قيمة WETH/USDC في الوقت 2026-02-02T17:56؟

قدم إجابتك كرقم واحد مقرب إلى منزلتين عشريتين،
بدون أي نص آخر.
```

لاحظ أن هناك عروض أسعار لأصلين هنا، `WETH/USDC` و`WBTC/WETH`. قد تؤدي إضافة عروض أسعار من أصل آخر إلى تحسين دقة التنبؤ.

#### كيف يبدو الموجه {#prompt-explanation}

يحتوي هذا الموجه على ثلاثة أقسام، وهي شائعة جدًا في موجهات LLM.

1. المعلومات. تحتوي نماذج اللغة الكبيرة على الكثير من المعلومات من تدريبها، لكنها عادة لا تملك الأحدث. هذا هو سبب حاجتنا إلى استرداد أحدث عروض الأسعار هنا. تسمى إضافة المعلومات إلى موجه [التوليد المعزز بالاسترداد (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation).

2. السؤال الفعلي. هذا ما نريد أن نعرفه.

3. تعليمات تنسيق الإخراج. عادة، سيعطينا نموذج اللغة الكبير تقديرًا مع شرح لكيفية وصوله إليه. هذا أفضل للبشر، لكن برنامج الكمبيوتر يحتاج فقط إلى الخلاصة.

#### شرح الكود {#prompt-code}

ها هو الكود الجديد.

```python
from datetime import datetime, timezone, timedelta
```

نحتاج إلى تزويد LLM بالوقت الذي نريد تقديرًا له. للحصول على وقت "n دقيقة/ساعة/يوم" في المستقبل، نستخدم [فئة `timedelta`](https://docs.python.org/3/library/datetime.html#datetime.timedelta).

```python
# عناوين المجمعات التي نقرأها
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

لدينا مجمعان نحتاج إلى قراءتهما.

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

في مجمع WETH/USDC، نريد أن نعرف كم عدد `token0` (USDC) الذي نحتاجه لشراء واحد من `token1` (WETH). في مجمع WETH/WBTC، نريد أن نعرف كم عدد `token1` (WETH) الذي نحتاجه لشراء واحد `token0` (WBTC، وهو بيتكوين مغلف). نحتاج إلى تتبع ما إذا كانت نسبة المجمع بحاجة إلى عكسها.

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

لمعرفة ما إذا كان المجمع بحاجة إلى عكسه، نحصل على ذلك كمدخل إلى `read_pool`. أيضًا، يجب إعداد رمز الأصل بشكل صحيح.

إن البناء `<a> if <b> else <c>` هو المكافئ في لغة Python لـ[المشغل الشرطي الثلاثي](https://en.wikipedia.org/wiki/Ternary_conditional_operator)، والذي سيكون في لغة مشتقة من C `<b> ? <a> : <c>`.

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

تبني هذه الدالة سلسلة نصية تنسق قائمة بكائنات `Quote`، بافتراض أنها تنطبق جميعها على نفس الأصل.

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

في Python، تُكتب [السلاسل النصية الحرفية متعددة الأسطر](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) على النحو التالي: `"""` .... `"""`.

```python
Given these quotes:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

هنا، نستخدم نمط [MapReduce](https://en.wikipedia.org/wiki/MapReduce) لإنشاء سلسلة نصية لكل قائمة عرض أسعار باستخدام `format_quotes`، ثم نختصرها إلى سلسلة نصية واحدة لاستخدامها في الموجه.

```python
What would you expect the value for {asset} to be at time {expected_time}?

Provide your answer as a single number rounded to two decimal places,
without any other text.
    """
```

بقية الموجه كما هو متوقع.

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

راجع المجمعين واحصل على عروض أسعار من كليهما.

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

حدد النقطة الزمنية المستقبلية التي نريد التقدير لها، وقم بإنشاء الموجه.

### التفاعل مع LLM {#interface-llm}

بعد ذلك، نقوم بتوجيه LLM فعلي ونحصل على قيمة مستقبلية متوقعة. لقد كتبت هذا البرنامج باستخدام OpenAI، لذا إذا كنت تريد استخدام مزود مختلف، فستحتاج إلى تعديله.

1. احصل على [حساب OpenAI](https://auth.openai.com/create-account)

2. [قم بتمويل الحساب](https://platform.openai.com/settings/organization/billing/overview)—الحد الأدنى للمبلغ في وقت كتابة هذا التقرير هو 5 دولارات

3. [أنشئ مفتاح واجهة برمجة تطبيقات](https://platform.openai.com/settings/organization/api-keys)

4. في سطر الأوامر، قم بتصدير مفتاح واجهة برمجة التطبيقات حتى يتمكن برنامجك من استخدامه

   ```sh
   export OPENAI_API_KEY=sk-<بقية المفتاح هنا>
   ```

5. سحب الوكيل وتشغيله

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

ها هو الكود الجديد.

```python
from openai import OpenAI

open_ai = OpenAI()  # يقرأ العميل متغير البيئة OPENAI_API_KEY
```

قم باستيراد واجهة برمجة تطبيقات OpenAI وإنشاء مثيل لها.

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

استدعاء واجهة برمجة تطبيقات OpenAI (`open_ai.chat.completions.create`) لإنشاء الاستجابة.

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

إخراج السعر وتقديم توصية بالشراء أو البيع.

#### اختبار التنبؤات {#testing-the-predictions}

الآن بعد أن أصبح بإمكاننا إنشاء تنبؤات، يمكننا أيضًا استخدام البيانات التاريخية لتقييم ما إذا كنا ننتج تنبؤات مفيدة.

```sh
uv run test-predictor.py
```

النتيجة المتوقعة مشابهة لـ:

```
التنبؤ لـ 2026-01-05T19:50: التنبؤ 3138.93 دولارًا أمريكيًا، الحقيقي 3218.92 دولارًا أمريكيًا، الخطأ 79.99 دولارًا أمريكيًا
التنبؤ لـ 2026-01-06T19:56: التنبؤ 3243.39 دولارًا أمريكيًا، الحقيقي 3221.08 دولارًا أمريكيًا، الخطأ 22.31 دولارًا أمريكيًا
التنبؤ لـ 2026-01-07T20:02: التنبؤ 3223.24 دولارًا أمريكيًا، الحقيقي 3146.89 دولارًا أمريكيًا، الخطأ 76.35 دولارًا أمريكيًا
التنبؤ لـ 2026-01-08T20:11: التنبؤ 3150.47 دولارًا أمريكيًا، الحقيقي 3092.04 دولارًا أمريكيًا، الخطأ 58.43 دولارًا أمريكيًا
.
.
.
التنبؤ لـ 2026-01-31T22:33: التنبؤ 2637.73 دولارًا أمريكيًا، الحقيقي 2417.77 دولارًا أمريكيًا، الخطأ 219.96 دولارًا أمريكيًا
التنبؤ لـ 2026-02-01T22:41: التنبؤ 2381.70 دولارًا أمريكيًا، الحقيقي 2318.84 دولارًا أمريكيًا، الخطأ 62.86 دولارًا أمريكيًا
التنبؤ لـ 2026-02-02T22:49: التنبؤ 2234.91 دولارًا أمريكيًا، الحقيقي 2349.28 دولارًا أمريكيًا، الخطأ 114.37 دولارًا أمريكيًا
متوسط خطأ التنبؤ على مدار 29 تنبؤًا: 83.87103448275862068965517241 دولارًا أمريكيًا
متوسط التغيير لكل توصية: 4.787931034482758620689655172 دولار أمريكي
التباين المعياري للتغيرات: 104.42 دولار أمريكي
أيام مربحة: 51.72%
أيام خاسرة: 48.28%
```

معظم المختبر مطابق للوكيل، ولكن إليك الأجزاء الجديدة أو المعدلة.

```python
CYCLES_FOR_TEST = 40 # للاختبار الخلفي، كم عدد الدورات التي نختبرها

# الحصول على الكثير من عروض الأسعار
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

نحن ننظر إلى `CYCLES_FOR_TEST` (المحدد هنا بـ 40) يومًا إلى الوراء.

```python
# إنشاء تنبؤات والتحقق منها مقابل التاريخ الحقيقي

total_error = Decimal(0)
changes = []
```

هناك نوعان من الأخطاء التي نهتم بها. الأول، `total_error`، هو ببساطة مجموع الأخطاء التي ارتكبها المتنبئ.

لفهم الثاني، `changes`، نحتاج إلى تذكر غرض الوكيل. ليس التنبؤ بنسبة WETH/USDC (سعر ETH). بل إصدار توصيات البيع والشراء. إذا كان السعر حاليًا 2000 دولار وتنبأ بـ 2010 دولارات غدًا، فإننا لا نمانع إذا كانت النتيجة الفعلية 2020 دولارًا وحققنا أموالًا إضافية. لكننا نمانع إذا تنبأ بـ 2010 دولارات، واشترى ETH بناءً على تلك التوصية، وانخفض السعر إلى 1990 دولارًا.

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

لا يمكننا النظر إلا في الحالات التي يتوفر فيها السجل الكامل (القيم المستخدمة للتنبؤ والقيمة الحقيقية لمقارنتها بها). وهذا يعني أن أحدث حالة يجب أن تكون تلك التي بدأت قبل `CYCLES_BACK`.

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

استخدم [شرائح](https://www.w3schools.com/python/ref_func_slice.asp) للحصول على نفس عدد العينات التي يستخدمها الوكيل. الكود بين هنا والجزء التالي هو نفس كود الحصول على التنبؤ الموجود لدينا في الوكيل.

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

احصل على السعر المتوقع والسعر الحقيقي والسعر وقت التنبؤ. نحتاج إلى السعر وقت التنبؤ لتحديد ما إذا كانت التوصية بالشراء أو البيع.

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Prediction for {prediction_time}: predicted {predicted_price} USD, real {real_price} USD, error {error} USD")
```

احسب الخطأ، وأضفه إلى الإجمالي.

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

بالنسبة لـ `changes`، نريد التأثير النقدي لشراء أو بيع عملة ETH واحدة. لذا أولاً، نحتاج إلى تحديد التوصية، ثم تقييم كيفية تغير السعر الفعلي، وما إذا كانت التوصية قد حققت ربحًا (تغيير إيجابي) أو كلفت أموالًا (تغيير سلبي).

```python
print (f"Mean prediction error over {len(wethusdc_quotes)-CYCLES_BACK} predictions: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Mean change per recommendation: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Standard variance of changes: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

تقرير النتائج.

```python
print (f"Profitable days: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Losing days: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

استخدم [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) لحساب عدد الأيام المربحة وعدد الأيام المكلفة. النتيجة هي كائن مرشح، والذي نحتاج إلى تحويله إلى قائمة للحصول على الطول.

### إرسال المعاملات {#submit-txn}

الآن نحن بحاجة إلى إرسال المعاملات بالفعل. ومع ذلك، لا أريد إنفاق أموال حقيقية في هذه المرحلة، قبل إثبات النظام. بدلاً من ذلك، سننشئ انقسام محلي للشبكة الرئيسية، و "نتداول" على تلك الشبكة.

فيما يلي خطوات إنشاء انقسام محلي وتمكين التداول.

1. قم بتثبيت [Foundry](https://getfoundry.sh/introduction/installation)

2. ابدأ [`anvil`](https://getfoundry.sh/anvil/overview)

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   يستمع `anvil` على عنوان URL الافتراضي لـ Foundry، http://localhost:8545، لذلك لا نحتاج إلى تحديد عنوان URL لأمر `cast` الذي نستخدمه لمعالجة سلسلة الكتل (blockchain).

3. عند التشغيل في `anvil`، هناك عشرة حسابات اختبار تحتوي على ETH—قم بتعيين متغيرات البيئة للحساب الأول

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. هذه هي العقود التي نحتاج إلى استخدامها. [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) هو عقد Uniswap v3 الذي نستخدمه للتداول الفعلي. يمكننا التداول مباشرة من خلال المجمع، ولكن هذا أسهل بكثير.

   المتغيران السفليان هما مسارات Uniswap v3 المطلوبة للتبديل بين WETH وUSDC.

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. يحتوي كل حساب من حسابات الاختبار على 10000 ETH. استخدم عقد WETH لتغليف 1000 ETH للحصول على 1000 WETH للتداول.

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. استخدم `SwapRouter` لتداول 500 WETH مقابل USDC.

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   ينشئ استدعاء `approve` بدلًا يسمح لـ `SwapRouter` بإنفاق بعض رموزنا. لا يمكن للعقود مراقبة الأحداث، لذلك إذا قمنا بنقل الرموز المميزة مباشرة إلى عقد `SwapRouter`، فلن يعرف أنه تم الدفع له. بدلاً من ذلك، نسمح لعقد `SwapRouter` بإنفاق مبلغ معين، ثم يقوم `SwapRouter` بذلك. يتم ذلك من خلال دالة يستدعيها `SwapRouter`، لذلك يعرف ما إذا كانت ناجحة.

7. تحقق من أن لديك ما يكفي من كلا الرمزين.

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

الآن بعد أن أصبح لدينا WETH وUSDC، يمكننا تشغيل الوكيل بالفعل.

```sh
git checkout 05-trade
uv run agent.py
```

سيبدو الإخراج مشابهًا لـ:

```
(ai-trading-agent) qbzzt@Ori-Cloudnomics:~/260215-ai-agent$ uv run agent.py
السعر الحالي: 1843.16
في 2026-02-06T23:07، السعر المتوقع: 1724.41 دولار أمريكي
أرصدة الحسابات قبل التداول:
رصيد USDC: 927301.578272
رصيد WETH: 500
بيع، أتوقع أن ينخفض السعر بمقدار 118.75 دولارًا أمريكيًا
تم إرسال معاملة الموافقة: 74e367ddbb407c1aaf567d87aa5863049991b1d2aa092b6b85195d925e2bd41f
تم تعدين معاملة الموافقة.
تم إرسال معاملة البيع: fad1bcf938585c9e90364b26ac7a80eea9efd34c37e5db81e58d7655bcae28bf
تم تعدين معاملة البيع.
أرصدة الحسابات بعد التداول:
رصيد USDC: 929143.797116
رصيد WETH: 499
```

لاستخدامه بالفعل، تحتاج إلى بعض التغييرات الطفيفة.

- في السطر 14، قم بتغيير `MAINNET_URL` إلى نقطة وصول حقيقية، مثل `https://eth.drpc.org`
- في السطر 28، قم بتغيير `PRIVATE_KEY` إلى مفتاحك الخاص
- ما لم تكن ثريًا جدًا ويمكنك شراء أو بيع 1 ETH كل يوم لوكيل غير مثبت، فقد ترغب في تغيير 29 لتقليل `WETH_TRADE_AMOUNT`

#### شرح الكود {#trading-code}

ها هو الكود الجديد.

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

نفس المتغيرات التي استخدمناها في الخطوة 4.

```python
WETH_TRADE_AMOUNT=1
```

المبلغ المراد تداوله.

```python
ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... },
    { "name": "balanceOf", ...},
    { "name": "approve", ...}
]
```

للتداول فعليًا، نحتاج إلى وظيفة `approve`. نريد أيضًا إظهار الأرصدة قبل وبعد، لذلك نحتاج أيضًا إلى `balanceOf`.

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

في واجهة التطبيق الثنائية `SwapRouter`، نحتاج فقط إلى `exactInput`. هناك وظيفة ذات صلة، `exactOutput`، يمكننا استخدامها لشراء WETH واحد بالضبط، ولكن من أجل البساطة نستخدم `exactInput` فقط في كلتا الحالتين.

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

تعريفات Web3 للحساب `account` ([https://web3py.readthedocs.io/en/stable/web3.eth.account.html](https://web3py.readthedocs.io/en/stable/web3.eth.account.html)) وعقد `SwapRouter`.

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

معلمات المعاملة. نحتاج إلى وظيفة هنا لأن [النون](https://en.wikipedia.org/wiki/Cryptographic_nonce) يجب أن يتغير في كل مرة.

```python
def approve_token(contract: Contract, amount: int):
```

الموافقة على بدل رمز مميز لـ `SwapRouter`.

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

هذه هي الطريقة التي نرسل بها معاملة في Web3. أولاً نستخدم كائن `Contract` ([https://web3py.readthedocs.io/en/stable/web3.contract.html](https://web3py.readthedocs.io/en/stable/web3.contract.html)) لبناء المعاملة. ثم نستخدم `web3.eth.account.sign_transaction` ([https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction)) لتوقيع المعاملة، باستخدام `PRIVATE_KEY`. أخيرًا، نستخدم `w3.eth.send_raw_transaction` ([https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction)) لإرسال المعاملة.

```python
    print(f"Approve transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Approve transaction mined.")
```

تنتظر `w3.eth.wait_for_transaction_receipt` ([https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt)) حتى يتم تعدين المعاملة. يعيد الإيصال إذا لزم الأمر.

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

هذه هي المعلمات عند بيع WETH.

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

على عكس `SELL_PARAMS`، يمكن أن تتغير معلمات الشراء. مبلغ الإدخال هو تكلفة 1 WETH، كما هو متاح في `quote`.

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

وظائف `buy()` و `sell()` متطابقة تقريبًا. أولاً، نوافق على بدل كافٍ لـ `SwapRouter`، ثم نستدعيه بالمسار والمبلغ الصحيحين.

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

تقرير أرصدة المستخدم بالعملتين.

```python
print("أرصدة الحساب قبل التداول:")
balances()

if (expected_price > current_price):
    print(f"شراء، أتوقع أن يرتفع السعر بمقدار {expected_price - current_price} دولار أمريكي")
    buy(wethusdc_quotes[-1])
else:
    print(f"بيع، أتوقع أن ينخفض السعر بمقدار {current_price - expected_price} دولار أمريكي")
    sell()

print("أرصدة الحساب بعد التداول:")
balances()
```

يعمل هذا الوكيل حاليًا مرة واحدة فقط. ومع ذلك، يمكنك تغييره للعمل بشكل مستمر إما عن طريق تشغيله من [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) أو عن طريق تغليف الأسطر 368-400 في حلقة واستخدام [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) للانتظار حتى يحين وقت الدورة التالية.

## التحسينات الممكنة {#improvements}

هذه ليست نسخة إنتاج كاملة؛ إنها مجرد مثال لتعليم الأساسيات. فيما يلي بعض الأفكار للتحسينات.

### تداول أذكى {#smart-trading}

هناك حقيقتان مهمتان يتجاهلهما الوكيل عند تحديد ما يجب القيام به.

- _حجم التغيير المتوقع_. يبيع الوكيل كمية ثابتة من `WETH` إذا كان من المتوقع أن ينخفض السعر، بغض النظر عن حجم الانخفاض.
  يمكن القول إنه من الأفضل تجاهل التغييرات الطفيفة والبيع بناءً على مدى توقعنا لانخفاض السعر.
- _المحفظة الحالية_. إذا كانت 10% من محفظتك في WETH وتعتقد أن السعر سيرتفع، فمن المحتمل أن يكون من المنطقي شراء المزيد. ولكن إذا كانت 90% من محفظتك في WETH، فقد تكون معرضًا بشكل كافٍ، وليست هناك حاجة لشراء المزيد. والعكس صحيح إذا كنت تتوقع أن ينخفض السعر.

### ماذا لو كنت تريد أن تبقي استراتيجية التداول الخاصة بك سرية؟ {#secret}

يمكن لبائعي الذكاء الاصطناعي رؤية الاستعلامات التي ترسلها إلى نماذج اللغة الكبيرة الخاصة بهم، مما قد يكشف عن نظام التداول العبقري الذي طورته مع وكيلك. نظام التداول الذي يستخدمه عدد كبير جدًا من الأشخاص لا قيمة له لأن عددًا كبيرًا جدًا من الأشخاص يحاولون الشراء عندما تريد الشراء (ويرتفع السعر) ويحاولون البيع عندما تريد البيع (وينخفض السعر).

يمكنك تشغيل LLM محليًا، على سبيل المثال، باستخدام [LM-Studio](https://lmstudio.ai/)، لتجنب هذه المشكلة.

### من بوت الذكاء الاصطناعي إلى وكيل الذكاء الاصطناعي {#bot-to-agent}

يمكنك تقديم حجة جيدة بأن هذا [بوت ذكاء اصطناعي، وليس وكيل ذكاء اصطناعي](/ai-agents/#ai-agents-vs-ai-bots). إنه يطبق استراتيجية بسيطة نسبيًا تعتمد على معلومات محددة مسبقًا. يمكننا تمكين التحسين الذاتي، على سبيل المثال، من خلال توفير قائمة بمجمعات Uniswap v3 وأحدث قيمها والسؤال عن المجموعة التي لديها أفضل قيمة تنبؤية.

### الحماية من الانزلاق {#slippage-protection}

حاليًا لا توجد [حماية من الانزلاق](https://uniswapv3book.com/milestone_3/slippage-protection.html). إذا كان السعر الحالي 2000 دولار، والسعر المتوقع 2100 دولار، فسيقوم الوكيل بالشراء. ومع ذلك، إذا ارتفعت التكلفة إلى 2200 دولار قبل أن يشتري الوكيل، فلن يكون هناك معنى للشراء بعد الآن.

لتنفيذ الحماية من الانزلاق، حدد قيمة `amountOutMinimum` في السطرين 325 و 334 من [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325).

## الخلاصة {#conclusion}

نأمل أن تعرف الآن ما يكفي للبدء في استخدام وكلاء الذكاء الاصطناعي. هذه ليست نظرة عامة شاملة على الموضوع؛ فهناك كتب كاملة مخصصة لذلك، لكن هذا يكفي لتبدأ. حظ سعيد!

[انظر هنا لمزيد من أعمالي](https://cryptodocguy.pro/).
