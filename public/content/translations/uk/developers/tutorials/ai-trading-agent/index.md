---
title: "Створіть власного торгового AI-агента на Ethereum"
description: "У цьому посібнику ви дізнаєтеся, як створити простого торгового AI-агента. Цей агент зчитує інформацію з блокчейну, запитує в LLM рекомендацію на основі цієї інформації, виконує рекомендовану LLM угоду, а потім чекає й повторює."
author: "Орі Померанц"
tags: [ "ШІ", "торгівля", "агент", "python" ]
skill: intermediate
published: 2026-02-13
lang: uk
sidebarDepth: 3
---

У цьому посібнику ви дізнаєтеся, як створити простого торгового AI-агента. Цей агент працює за такими кроками:

1. Зчитування поточних і минулих цін токена, а також іншої потенційно релевантної інформації
2. Створення запиту з цією інформацією, а також довідкової інформації для пояснення її можливої релевантності
3. Надсилання запиту й отримання прогнозованої ціни у відповідь
4. Здійснення угоди на основі рекомендації
5. Очікування та повторення

Цей агент демонструє, як зчитувати інформацію, перетворювати її на запит, що дає корисну відповідь, і використовувати цю відповідь. Усе це — кроки, необхідні для AI-агента. Цей агент реалізовано на Python, оскільки це найпоширеніша мова, що використовується в ШІ.

## Навіщо це робити? {#why-do-this}

Автоматизовані торгові агенти дозволяють розробникам вибирати й виконувати торгову стратегію. [AI-агенти](/ai-agents) уможливлюють складніші та динамічніші торгові стратегії, потенційно використовуючи інформацію й алгоритми, які розробник навіть не розглядав для використання.

## Інструменти {#tools}

У цьому посібнику для отримання котирувань і торгівлі використовуються [Python](https://www.python.org/), [бібліотека Web3](https://web3py.readthedocs.io/en/stable/) та [Uniswap v3](https://github.com/Uniswap/v3-periphery).

### Чому Python? {#python}

Найпоширенішою мовою для ШІ є [Python](https://www.python.org/), тому ми використовуємо її тут. Не хвилюйтеся, якщо ви не знаєте Python. Мова дуже зрозуміла, і я поясню, що саме вона робить.

[Бібліотека Web3](https://web3py.readthedocs.io/en/stable/) — це найпоширеніший API Python для Ethereum. Вона досить проста у використанні.

### Торгівля на блокчейні {#trading-on-blockchain}

Існує [багато розподілених бірж (DEX)](/apps/categories/defi/), які дозволяють торгувати токенами на Ethereum. Однак вони, як правило, мають схожі обмінні курси через [арбітраж](/developers/docs/smart-contracts/composability/#better-user-experience).

[Uniswap](https://app.uniswap.org/) — це широко використовувана DEX, яку ми можемо використовувати як для отримання котирувань (щоб побачити відносні вартості токенів), так і для угод.

### OpenAI {#openai}

Для роботи з великою мовною моделлю я вирішив почати з [OpenAI](https://openai.com/). Щоб запустити програму з цього посібника, вам потрібно буде сплатити за доступ до API. Мінімального платежу в 5 доларів США більш ніж достатньо.

## Розробка, крок за кроком {#step-by-step}

Щоб спростити розробку, ми будемо діяти поетапно. Кожен крок — це гілка в GitHub.

### Початок роботи {#getting-started}

Нижче наведено кроки для початку роботи в UNIX або Linux (включно з [WSL](https://learn.microsoft.com/en-us/windows/wsl/install))

1. Якщо у вас ще немає [Python](https://www.python.org/downloads/), завантажте й установіть його.

2. Клонуйте репозиторій GitHub.

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started\ncd 260215-ai-agent
   ```

3. Установіть [`uv`](https://docs.astral.sh/uv/getting-started/installation/). Команда у вашій системі може відрізнятися.

   ```sh
   pipx install uv
   ```

4. Завантажте бібліотеки.

   ```sh
   uv sync
   ```

5. Активуйте віртуальне середовище.

   ```sh
   source .venv/bin/activate
   ```

6. Щоб перевірити, чи Python і Web3 працюють правильно, запустіть `python3` і надайте йому цю програму. Ви можете ввести її в командному рядку `>>>`; створювати файл не потрібно.

   ```python
   from web3 import Web3\nMAINNET_URL = \"https://eth.drpc.org\"\nw3 = Web3(Web3.HTTPProvider(MAINNET_URL))\nw3.eth.block_number\nquit()
   ```

### Читання з блокчейну {#read-blockchain}

Наступний крок — читання з блокчейну. Для цього вам потрібно перейти до гілки `02-read-quote`, а потім використати `uv` для запуску програми.

```sh
git checkout 02-read-quote\nuv run agent.py
```

Ви повинні отримати список об’єктів `Quote`, кожен з яких містить часову мітку, ціну та актив (наразі це завжди `WETH/USDC`).

Ось пояснення рядок за рядком.

```python
from web3 import Web3\nfrom web3.contract import Contract\nfrom decimal import Decimal, ROUND_HALF_UP\nfrom dataclasses import dataclass\nfrom datetime import datetime, timezone\nfrom pprint import pprint\nimport time\nimport functools\nimport sys
```

Імпортуйте бібліотеки, які нам потрібні. Вони пояснюються нижче, коли використовуються.

```python
print = functools.partial(print, flush=True)
```

Замінює `print` Python на версію, яка завжди негайно скидає вивід. Це корисно в довготривалому сценарії, оскільки ми не хочемо чекати оновлень статусу або виводу для налагодження.

```python
MAINNET_URL = \"https://eth.drpc.org\"
```

URL-адреса для доступу до основної мережі. Ви можете отримати її в [постачальника вузлів як послуги](/developers/docs/nodes-and-clients/nodes-as-a-service/) або використати одну з тих, що рекламуються в [Chainlist](https://chainlist.org/chain/1).

```python
BLOCK_TIME_SECONDS = 12\nMINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)\nHOUR_BLOCKS = MINUTE_BLOCKS * 60\nDAY_BLOCKS = HOUR_BLOCKS * 24
```

Блок в основній мережі Ethereum зазвичай з’являється кожні дванадцять секунд, тож це кількість блоків, які, як ми очікуємо, з’являться за певний період часу. Зауважте, що це не точне число. Коли [пропонувач блоку](/developers/docs/consensus-mechanisms/pos/block-proposal/) не працює, цей блок пропускається, і час до наступного блоку становить 24 секунди. Якби ми хотіли отримати точний блок для часової мітки, ми б використали [двійковий пошук](https://en.wikipedia.org/wiki/Binary_search). Однак для наших цілей цього достатньо. Прогнозування майбутнього — не точна наука.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

Розмір циклу. Ми переглядаємо котирування раз за цикл і намагаємося оцінити вартість наприкінці наступного циклу.

```python
# Адреса пулу, з якого ми читаємо\nWETHUSDC_ADDRESS = Web3.to_checksum_address(\"0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640\")
```

Значення котирувань беруться з пулу Uniswap 3 USDC/WETH за адресою [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract). Ця адреса вже має формат контрольної суми, але краще використовувати [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address), щоб зробити код придатним для повторного використання.

```python
POOL_ABI = [\n    { \"name\": \"slot0\", ... },\n    { \"name\": \"token0\", ... },\n    { \"name\": \"token1\", ... },\n]\n\nERC20_ABI = [\n    { \"name\": \"symbol\", ... },\n    { \"name\": \"decimals\", ... }\n]
```

Це [ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) для двох контрактів, з якими нам потрібно взаємодіяти. Щоб код був стислим, ми включаємо лише ті функції, які нам потрібно викликати.

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

Ініціюйте бібліотеку [`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) і підключіться до вузла Ethereum.

```python
@dataclass(frozen=True)\nclass ERC20Token:\n    address: str\n    symbol: str\n    decimals: int\n    contract: Contract
```

Це один зі способів створення класу даних у Python. Тип даних [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) використовується для підключення до контракту. Зверніть увагу на `(frozen=True)`. У Python [булеві значення](https://en.wikipedia.org/wiki/Boolean_data_type) визначаються як `True` або `False` з великої літери. Цей клас даних є `frozen` (замороженим), тобто його поля не можна змінювати.

Зверніть увагу на відступ. На відміну від [мов, що походять від C](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages), Python використовує відступи для позначення блоків. Інтерпретатор Python знає, що наступне визначення не є частиною цього класу даних, оскільки воно не починається з того ж відступу, що й поля класу даних.

```python
@dataclass(frozen=True)\nclass PoolInfo:\n    address: str\n    token0: ERC20Token\n    token1: ERC20Token\n    contract: Contract\n    asset: str\n    decimal_factor: Decimal = 1
```

Тип [`Decimal`](https://docs.python.org/3/library/decimal.html) використовується для точної роботи з десятковими дробами.

```python
    def get_price(self, block: int) -> Decimal:
```

Це спосіб визначення функції в Python. Визначення має відступ, щоб показати, що воно все ще є частиною `PoolInfo`.

У функції, яка є частиною класу даних, першим параметром завжди є `self` — екземпляр класу даних, який її викликав. Тут є ще один параметр — номер блоку.

```python
        assert block <= w3.eth.block_number, \"Блок із майбутнього\"
```

Якби ми могли читати майбутнє, нам не знадобився б ШІ для торгівлі.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

Синтаксис виклику функції на EVM з Web3 такий: `<об'єкт контракту>.functions.<назва функції>().call(<параметри>). Параметрами можуть бути параметри функції EVM (якщо вони є; тут їх немає) або [іменовані параметри](https://en.wikipedia.org/wiki/Named_parameter) для зміни поведінки блокчейну. Тут ми використовуємо один з них, `block_identifier`, щоб указати [номер блоку](/developers/docs/apis/json-rpc/#default-block), у якому ми хочемо виконати операцію.

Результатом є [ця структура у формі масиву](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72). Перше значення — це функція обмінного курсу між двома токенами.

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

Щоб зменшити кількість обчислень в мережі, Uniswap v3 зберігає не фактичний коефіцієнт обміну, а його квадратний корінь. Оскільки EVM не підтримує математику з рухомою комою або дроби, замість фактичного значення відповідь — <math><msqrt><mi>ціна</mi></msqrt><mo>⋅</mo><msup><mn>2</mn><mn>96</mn></msup></math>

```python
         # (токен1 за токен0)\n        return 1/(raw_price * self.decimal_factor)
```

Необроблена ціна, яку ми отримуємо, — це кількість `token0`, яку ми отримуємо за кожен `token1`. У нашому пулі `token0` — це USDC (стейблкоїн з такою ж вартістю, що й долар США), а `token1` — [WETH](https://opensea.io/learn/blockchain/what-is-weth). Значення, яке нам насправді потрібне, — це кількість доларів за WETH, а не обернене значення.

Десятковий коефіцієнт — це співвідношення між [десятковими коефіцієнтами](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) для двох токенів.

```python
@dataclass(frozen=True)\nclass Quote:\n    timestamp: str\n    price: Decimal\n    asset: str
```

Цей клас даних представляє котирування: ціну певного активу в певний момент часу. На цьому етапі поле `asset` не має значення, оскільки ми використовуємо один пул і, отже, маємо один актив. Однак пізніше ми додамо більше активів.

```python
def read_token(address: str) -> ERC20Token:\n    token = w3.eth.contract(address=address, abi=ERC20_ABI)\n    symbol = token.functions.symbol().call()\n    decimals = token.functions.decimals().call()\n\n    return ERC20Token(\n        address=address,\n        symbol=symbol,\n        decimals=decimals,\n        contract=token\n    )
```

Ця функція приймає адресу й повертає інформацію про контракт токена за цією адресою. Щоб створити новий [`Contract` Web3](https://web3py.readthedocs.io/en/stable/web3.contract.html), ми надаємо адресу й ABI для `w3.eth.contract`.

```python
def read_pool(address: str) -> PoolInfo:\n    pool_contract = w3.eth.contract(address=address, abi=POOL_ABI)\n    token0Address = pool_contract.functions.token0().call()\n    token1Address = pool_contract.functions.token1().call()\n    token0 = read_token(token0Address)\n    token1 = read_token(token1Address)\n\n    return PoolInfo(\n        address=address,\n        asset=f\"{token1.symbol}/{token0.symbol}\",\n        token0=token0,\n        token1=token1,\n        contract=pool_contract,\n        decimal_factor=Decimal(10) ** Decimal(token0.decimals - token1.decimals)\n    )
```

Ця функція повертає все, що нам потрібно про [конкретний пул](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol). Синтаксис `f\"<рядок>\"` — це [форматований рядок](https://docs.python.org/3/reference/lexical_analysis.html#f-strings).

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

Отримати об’єкт `Quote`. Значенням за замовчуванням для `block_number` є `None` (немає значення).

```python
    if block_number is None:\n        block_number = w3.eth.block_number
```

Якщо номер блоку не вказано, використовуйте `w3.eth.block_number`, що є номером останнього блоку. Це синтаксис [інструкції `if`](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement).

Може здатися, що було б краще просто встановити значення за замовчуванням на `w3.eth.block_number`, але це не спрацює належним чином, оскільки це буде номер блоку на момент визначення функції. У довготривалому агенті це було б проблемою.

```python
    block = w3.eth.get_block(block_number)\n    price = pool.get_price(block_number)\n    return Quote(\n        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),\n        price=price.quantize(Decimal(\"0.01\")),\n        asset=pool.asset\n    )
```

Використовуйте [бібліотеку `datetime`](https://docs.python.org/3/library/datetime.html), щоб відформатувати його у формат, читабельний для людей і великих мовних моделей (LLM). Використовуйте [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize), щоб округлити значення до двох знаків після коми.

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

У Python ви визначаєте [список](https://docs.python.org/3/library/stdtypes.html#typesseq-list), який може містити лише певний тип, за допомогою `list[<тип>]`.

```python
    quotes = []\n    for block in range(start_block, end_block + 1, step):
```

У Python [цикл `for`](https://docs.python.org/3/tutorial/controlflow.html#for-statements) зазвичай ітерує по списку. Список номерів блоків для пошуку котирувань походить від [`range`](https://docs.python.org/3/library/stdtypes.html#range).

```python
        quote = get_quote(pool, block)\n        quotes.append(quote)\n    return quotes
```

Для кожного номера блоку отримайте об’єкт `Quote` і додайте його до списку `quotes`. Потім поверніть цей список.

```python
pool = read_pool(WETHUSDC_ADDRESS)\nquotes = get_quotes(\n    pool,\n    w3.eth.block_number - 12*CYCLE_BLOCKS,\n    w3.eth.block_number,\n    CYCLE_BLOCKS\n)\n\npprint(quotes)
```

Це основний код скрипту. Прочитайте інформацію про пул, отримайте дванадцять котирувань і виведіть їх за допомогою [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint).

### Створення запиту {#prompt}

Далі нам потрібно перетворити цей список котирувань на запит для LLM та отримати очікуване майбутнє значення.

```sh
git checkout 03-create-prompt\nuv run agent.py
```

Тепер вивід буде запитом до LLM, схожим на:

```
З огляду на ці котирування:\nАктив: WETH/USDC\n        2026-01-20T16:34 3016.21\n        .\n        .\n        .\n        2026-02-01T17:49 2299.10\n\nАктив: WBTC/WETH\n        2026-01-20T16:34 29.84\n        .\n        .\n        .\n        2026-02-01T17:50 33.46\n\n\nЯке значення для WETH/USDC ви очікуєте на момент 2026-02-02T17:56?\n\nНадайте відповідь у вигляді одного числа, заокругленого до двох знаків після коми,\nбез будь-якого іншого тексту.
```

Зверніть увагу, що тут є котирування для двох активів, `WETH/USDC` і `WBTC/WETH`. Додавання котирувань з іншого активу може підвищити точність прогнозу.

#### Як виглядає запит {#prompt-explanation}

Цей запит містить три розділи, які досить поширені в запитах до LLM.

1. Інформація. LLM мають багато інформації зі свого навчання, але зазвичай не мають найновішої. Ось чому нам потрібно отримувати тут найновіші котирування. Додавання інформації до запиту називається [генерація, доповнена пошуком (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation).

2. Власне запитання. Це те, що ми хочемо дізнатися.

3. Інструкції з форматування виводу. Зазвичай LLM дає нам оцінку з поясненням того, як вона її отримала. Це краще для людей, але комп’ютерній програмі потрібен лише кінцевий результат.

#### Пояснення коду {#prompt-code}

Ось новий код.

```python
from datetime import datetime, timezone, timedelta
```

Нам потрібно надати LLM час, для якого ми хочемо отримати оцінку. Щоб отримати час «n хвилин/годин/днів» у майбутньому, ми використовуємо [клас `timedelta`](https://docs.python.org/3/library/datetime.html#datetime.timedelta).

```python
# Адреси пулів, які ми читаємо\nWETHUSDC_ADDRESS = Web3.to_checksum_address(\"0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640\")\nWETHWBTC_ADDRESS = Web3.to_checksum_address(\"0xCBCdF9626bC03E24f779434178A73a0B4bad62eD\")
```

У нас є два пули, які нам потрібно прочитати.

```python
@dataclass(frozen=True)\nclass PoolInfo:\n    .\n    .\n    .\n    reverse: bool = False\n\n    def get_price(self, block: int) -> Decimal:\n        assert block <= w3.eth.block_number, \"Блок із майбутнього\"\n        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])\n        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (токен1 за токен0)\n        if self.reverse:\n            return 1/(raw_price * self.decimal_factor)\n        else:\n            return raw_price * self.decimal_factor
```

У пулі WETH/USDC ми хочемо знати, скільки `token0` (USDC) нам потрібно, щоб купити один `token1` (WETH). У пулі WETH/WBTC ми хочемо знати, скільки `token1` (WETH) нам потрібно, щоб купити один `token0` (WBTC, який є обгорнутим Bitcoin). Нам потрібно відстежувати, чи потрібно змінювати співвідношення пулу на обернене.

```python
def read_pool(address: str, reverse: bool = False) -> PoolInfo:\n    .\n    .\n    .\n\n    return PoolInfo(\n        .\n        .\n        .\n\n        asset= f\"{token1.symbol}/{token0.symbol}\" if reverse else f\"{token0.symbol}/{token1.symbol}\",\n        reverse=reverse\n    )
```

Щоб знати, чи потрібно змінювати співвідношення пулу на обернене, ми отримуємо це як вхідні дані для `read_pool`. Крім того, символ активу має бути налаштований правильно.

Синтаксис `<a> if <b> else <c>` є еквівалентом Python [тернарного умовного оператора](https://en.wikipedia.org/wiki/Ternary_conditional_operator), який у мові, що походить від C, виглядав би як `<b> ?` <a> : <c>`.

```python
def format_quotes(quotes: list[Quote]) -> str:\n    result = f\"Актив: {quotes[0].asset}\n\"\n    for quote in quotes:\n        result += f\"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n\"\n    return result
```

Ця функція створює рядок, який форматує список об’єктів `Quote`, припускаючи, що всі вони застосовуються до одного активу.

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:\n    return f\"\"\"
```

У Python [багаторядкові рядкові літерали](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) записуються як `\"\"\"`.... `\"\"\"`.

```python
З огляду на ці котирування:\n{\n    functools.reduce(lambda acc, q: acc + '\n' + q,\n        map(lambda q: format_quotes(q), quotes))\n}
```

Тут ми використовуємо патерн [MapReduce](https://en.wikipedia.org/wiki/MapReduce), щоб згенерувати рядок для кожного списку котирувань за допомогою `format_quotes`, а потім об’єднати їх в один рядок для використання в запиті.

```python
Яке значення для {asset} ви очікуєте на момент {expected_time}?\n\nНадайте відповідь у вигляді одного числа, заокругленого до двох знаків після коми,\nбез будь-якого іншого тексту.\n    \"\"\"
```

Решта запиту така, як і очікувалося.

```python
wethusdc_pool = read_pool(WETHUSDC_ADDRESS, True)\nwethusdc_quotes = get_quotes(\n    wethusdc_pool,\n    w3.eth.block_number - 12*CYCLE_BLOCKS,\n    w3.eth.block_number,\n    CYCLE_BLOCKS,\n)\n\nwethwbtc_pool = read_pool(WETHWBTC_ADDRESS)\nwethwbtc_quotes = get_quotes(\n    wethwbtc_pool,\n    w3.eth.block_number - 12*CYCLE_BLOCKS,\n    w3.eth.block_number,\n    CYCLE_BLOCKS\n)
```

Перегляньте два пули й отримайте котирування з обох.

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]\n\nprint(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

Визначте майбутній момент часу, для якого ми хочемо отримати оцінку, і створіть запит.

### Взаємодія з LLM {#interface-llm}

Далі ми надсилаємо запит до фактичної LLM і отримуємо очікуване майбутнє значення. Я написав цю програму, використовуючи OpenAI, тому, якщо ви хочете використовувати іншого провайдера, вам потрібно буде її скоригувати.

1. Створіть [обліковий запис OpenAI](https://auth.openai.com/create-account)

2. [Поповніть рахунок](https://platform.openai.com/settings/organization/billing/overview) — на момент написання статті мінімальна сума становить 5 доларів США

3. [Створіть ключ API](https://platform.openai.com/settings/organization/api-keys)

4. У командному рядку експортуйте ключ API, щоб ваша програма могла його використовувати

   ```sh
   export OPENAI_API_KEY=sk-<решта ключа вводиться сюди>
   ```

5. Перейдіть до гілки та запустіть агент

   ```sh
   git checkout 04-interface-llm\nuv run agent.py
   ```

Ось новий код.

```python
from openai import OpenAI\n\nopen_ai = OpenAI()  # Клієнт зчитує змінну середовища OPENAI_API_KEY
```

Імпортуйте та створіть екземпляр OpenAI API.

```python
response = open_ai.chat.completions.create(\n    model=\"gpt-4-turbo\",\n    messages=[\n        {\"role\": \"user\", \"content\": prompt}\n    ],\n    temperature=0.0,\n    max_tokens=16,\n)
```

Викличте OpenAI API (`open_ai.chat.completions.create`), щоб створити відповідь.

```python
expected_price = Decimal(response.choices[0].message.content.strip())\ncurrent_price = wethusdc_quotes[-1].price\n\nprint (\"Поточна ціна:\", wethusdc_quotes[-1].price)\nprint(f\"На {future_time} очікувана ціна: {expected_price} USD\")\n\nif (expected_price > current_price):\n    print(f\"Купувати, я очікую, що ціна зросте на {expected_price - current_price} USD\")\nelse:\n    print(f\"Продавати, я очікую, що ціна впаде на {current_price - expected_price} USD\")
```

Виведіть ціну та надайте рекомендацію щодо купівлі чи продажу.

#### Тестування прогнозів {#testing-the-predictions}

Тепер, коли ми можемо генерувати прогнози, ми також можемо використовувати історичні дані для оцінки, чи створюємо ми корисні прогнози.

```sh
uv run test-predictor.py
```

Очікуваний результат схожий на:

```
Прогноз на 2026-01-05T19:50: прогнозовано 3138.93 USD, реальна 3218.92 USD, помилка 79.99 USD\nПрогноз на 2026-01-06T19:56: прогнозовано 3243.39 USD, реальна 3221.08 USD, помилка 22.31 USD\nПрогноз на 2026-01-07T20:02: прогнозовано 3223.24 USD, реальна 3146.89 USD, помилка 76.35 USD\nПрогноз на 2026-01-08T20:11: прогнозовано 3150.47 USD, реальна 3092.04 USD, помилка 58.43 USD\n.\n.\n.\nПрогноз на 2026-01-31T22:33: прогнозовано 2637.73 USD, реальна 2417.77 USD, помилка 219.96 USD\nПрогноз на 2026-02-01T22:41: прогнозовано 2381.70 USD, реальна 2318.84 USD, помилка 62.86 USD\nПрогноз на 2026-02-02T22:49: прогнозовано 2234.91 USD, реальна 2349.28 USD, помилка 114.37 USD\nСередня помилка прогнозу за 29 прогнозів: 83.87103448275862068965517241 USD\nСередня зміна на рекомендацію: 4.787931034482758620689655172 USD\nСтандартне відхилення змін: 104.42 USD\nПрибуткові дні: 51.72%\nЗбиткові дні: 48.28%
```

Більша частина тестера ідентична агенту, але ось частини, які є новими або зміненими.

```python
CYCLES_FOR_TEST = 40 # Для бектесту, скільки циклів ми тестуємо\n\n# Отримати багато котирувань\nwethusdc_pool = read_pool(WETHUSDC_ADDRESS, True)\nwethusdc_quotes = get_quotes(\n    wethusdc_pool,\n    w3.eth.block_number - CYCLE_BLOCKS*CYCLES_FOR_TEST,\n    w3.eth.block_number,\n    CYCLE_BLOCKS,\n)\n\nwethwbtc_pool = read_pool(WETHWBTC_ADDRESS)\nwethwbtc_quotes = get_quotes(\n    wethwbtc_pool,\n    w3.eth.block_number - CYCLE_BLOCKS*CYCLES_FOR_TEST,\n    w3.eth.block_number,\n    CYCLE_BLOCKS\n)
```

Ми розглядаємо `CYCLES_FOR_TEST` (тут вказано 40) днів назад.

```python
# Створення прогнозів та їх перевірка на основі реальної історії\n\ntotal_error = Decimal(0)\nchanges = []
```

Нас цікавлять два типи помилок. Перша, `total_error`, — це просто сума помилок, яких припустився прогнозист.

Щоб зрозуміти другу, `changes`, нам потрібно згадати про призначення агента. Воно полягає не в тому, щоб прогнозувати співвідношення WETH/USDC (ціну ETH). Воно полягає в тому, щоб видавати рекомендації на продаж і купівлю. Якщо поточна ціна становить 2000 доларів, а завтра прогнозується 2010 доларів, ми не проти, якщо фактичний результат буде 2020 доларів і ми заробимо додаткові гроші. Але ми _проти_, якщо він прогнозував 2010 доларів і купив ETH на основі цієї рекомендації, а ціна впала до 1990 доларів.

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

Ми можемо розглядати лише випадки, коли доступна повна історія (значення, що використовуються для прогнозу, і реальне значення для порівняння з ним). Це означає, що найновішим випадком має бути той, що почався `CYCLES_BACK` тому.

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]\n    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

Використовуйте [зрізи](https://www.w3schools.com/python/ref_func_slice.asp), щоб отримати таку ж кількість зразків, яку використовує агент. Код між цим і наступним сегментом — це той самий код для отримання прогнозу, який ми маємо в агенті.

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())\n    real_price = wethusdc_quotes[index+CYCLES_BACK].price\n    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

Отримайте прогнозовану ціну, реальну ціну та ціну на момент прогнозування. Нам потрібна ціна на момент прогнозування, щоб визначити, чи була рекомендація купувати чи продавати.

```python
    error = abs(predicted_price - real_price)\n    total_error += error\n    print (f\"Прогноз на {prediction_time}: прогнозована ціна {predicted_price} USD, реальна ціна {real_price} USD, помилка {error} USD\")
```

Визначте помилку та додайте її до загальної суми.

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'\n    price_increase = real_price - prediction_time_price\n    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

Для `changes` нам потрібен грошовий ефект від купівлі або продажу одного ETH. Отже, спочатку нам потрібно визначити рекомендацію, потім оцінити, як змінилася фактична ціна, і чи принесла рекомендація гроші (позитивна зміна), чи призвела до збитків (негативна зміна).

```python
print (f\"Середня помилка прогнозування за {len(wethusdc_quotes)-CYCLES_BACK} прогнозів: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD\")\n\nlength_changes = Decimal(len(changes))\nmean_change = sum(changes, Decimal(0)) / length_changes\nprint (f\"Середня зміна на рекомендацію: {mean_change} USD\")\nvar = sum((x - mean_change) ** 2 for x in changes) / length_changes\nprint (f\"Стандартне відхилення змін: {var.sqrt().quantize(Decimal(\"0.01\"))} USD\")
```

Повідомте результати.

```python
print (f\"Прибуткові дні: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}\")\nprint (f\"Збиткові дні: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}\")
```

Використовуйте [`filter`](https://www.w3schools.com/python/ref_func_filter.asp), щоб підрахувати кількість прибуткових днів і кількість збиткових днів. Результатом є об’єкт фільтра, який нам потрібно перетворити на список, щоб отримати його довжину.

### Надсилання транзакцій {#submit-txn}

Тепер нам потрібно фактично надсилати транзакції. Однак я не хочу витрачати реальні гроші на цьому етапі, перш ніж система буде перевірена. Натомість ми створимо локальний форк основної мережі й будемо «торгувати» в цій мережі.

Ось кроки для створення локального форку й увімкнення торгівлі.

1. Установіть [Foundry](https://getfoundry.sh/introduction/installation)

2. Запустіть [`anvil`](https://getfoundry.sh/anvil/overview)

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` прослуховує URL-адресу за замовчуванням для Foundry, http://localhost:8545, тому нам не потрібно вказувати URL-адресу для [команди `cast`](https://getfoundry.sh/cast/overview), яку ми використовуємо для маніпулювання блокчейном.

3. Під час роботи в `anvil` є десять тестових облікових записів, які мають ETH — встановіть змінні середовища для першого з них

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80\nADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. Це контракти, які нам потрібно використовувати. [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) — це контракт Uniswap v3, який ми використовуємо для фактичної торгівлі. Ми могли б торгувати безпосередньо через пул, але так набагато простіше.

   Дві нижні змінні — це шляхи Uniswap v3, необхідні для обміну між WETH і USDC.

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2\nUSDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48\nPOOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640\nSWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564\nWETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48\nUSDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. Кожен із тестових облікових записів має 10 000 ETH. Використовуйте контракт WETH, щоб обернути 1000 ETH і отримати 1000 WETH для торгівлі.

   ```sh
   cast send $WETH_ADDRESS \"deposit()\" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. Використовуйте `SwapRouter`, щоб обміняти 500 WETH на USDC.

   ```sh
   cast send $WETH_ADDRESS \"approve(address,uint256)\" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY\nMAXINT=`cast max-int uint256`\ncast send $SWAP_ROUTER \\\n    \"exactInput((bytes,address,uint256,uint256,uint256))\" \\\n    \"($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)\" \\\n    --private-key $PRIVATE_KEY
   ```

   Виклик `approve` створює дозвіл, який дозволяє `SwapRouter` витрачати деякі з наших токенів. Контракти не можуть відстежувати події, тому якщо ми перекажемо токени безпосередньо на контракт `SwapRouter`, він не дізнається, що йому заплатили. Натомість ми дозволяємо контракту `SwapRouter` витратити певну суму, а потім `SwapRouter` робить це. Це робиться за допомогою функції, що викликається `SwapRouter`, тому він знає, чи був виклик успішним.

7. Переконайтеся, що у вас достатньо обох токенів.

   ```sh
   cast call $WETH_ADDRESS \"balanceOf(address)\" $ADDRESS | cast from-wei\necho `cast call $USDC_ADDRESS \"balanceOf(address)\" $ADDRESS | cast to-dec`/10^6 | bc
   ```

Тепер, коли у нас є WETH та USDC, ми можемо фактично запустити агент.

```sh
git checkout 05-trade\nuv run agent.py
```

Вивід буде схожий на:

```
(ai-trading-agent) qbzzt@Ori-Cloudnomics:~/260215-ai-agent$ uv run agent.py\nПоточна ціна: 1843.16\nНа 2026-02-06T23:07, очікувана ціна: 1724.41 USD\nБаланси облікового запису перед угодою:\nБаланс USDC: 927301.578272\nБаланс WETH: 500\nПродавати, я очікую, що ціна впаде на 118.75 USD\nНадіслана транзакція схвалення: 74e367ddbb407c1aaf567d87aa5863049991b1d2aa092b6b85195d925e2bd41f\nТранзакцію схвалення видобуто.\nНадіслано транзакцію продажу: fad1bcf938585c9e90364b26ac7a80eea9efd34c37e5db81e58d7655bcae28bf\nТранзакцію продажу видобуто.\nБаланси облікового запису після угоди:\nБаланс USDC: 929143.797116\nБаланс WETH: 499
```

Щоб фактично використовувати його, вам потрібно внести кілька незначних змін.

- У рядку 14 змініть `MAINNET_URL` на реальну точку доступу, наприклад, `https://eth.drpc.org`
- У рядку 28 змініть `PRIVATE_KEY` на ваш власний приватний ключ
- Якщо ви не дуже багаті й не можете купувати чи продавати 1 ETH щодня для неперевіреного агента, ви можете змінити рядок 29, щоб зменшити `WETH_TRADE_AMOUNT`

#### Пояснення коду {#trading-code}

Ось новий код.

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address(\"0xE592427A0AEce92De3Edee1F18E0157C05861564\")\nWETH_TO_USDC=bytes.fromhex(\"C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48\")\nUSDC_TO_WETH=bytes.fromhex(\"A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2\")\nPRIVATE_KEY=\"0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80\"
```

Ті самі змінні, які ми використовували на кроці 4.

```python
WETH_TRADE_AMOUNT=1
```

Сума для торгівлі.

```python
ERC20_ABI = [\n    { \"name\": \"symbol\", ... },\n    { \"name\": \"decimals\", ... },\n    { \"name\": \"balanceOf\", ...},\n    { \"name\": \"approve\", ...}\n]
```

Щоб фактично торгувати, нам потрібна функція `approve`. Ми також хочемо показувати баланси до та після, тому нам також потрібна `balanceOf`.

```python
SWAP_ROUTER_ABI = [\n  { \"name\": \"exactInput\", ...},\n]
```

В ABI `SwapRouter` нам потрібна лише `exactInput`. Існує пов'язана функція `exactOutput`, яку ми могли б використовувати, щоб купити рівно один WETH, але для простоти ми використовуємо `exactInput` в обох випадках.

```python
account = w3.eth.account.from_key(PRIVATE_KEY)\nswap_router = w3.eth.contract(\n    address=SWAP_ROUTER_ADDRESS,\n    abi=SWAP_ROUTER_ABI\n)
```

Визначення Web3 для [`account`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) і контракту `SwapRouter`.

```python
def txn_params() -> dict:\n    return {\n        \"from\": account.address,\n        \"value\": 0,\n        \"gas\": 300000,\n        \"nonce\": w3.eth.get_transaction_count(account.address),\n    }
```

Параметри транзакції. Тут нам потрібна функція, оскільки [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) має змінюватися щоразу.

```python
def approve_token(contract: Contract, amount: int):
```

Схвалити дозвіл на використання токенів для `SwapRouter`.

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())\n    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)\n    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

Ось як ми надсилаємо транзакцію в Web3. Спочатку ми використовуємо [об’єкт `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) для створення транзакції. Потім ми використовуємо [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) для підписання транзакції за допомогою `PRIVATE_KEY`. Нарешті, ми використовуємо [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) для надсилання транзакції.

```python
    print(f\"Надіслано транзакцію схвалення: {tx_hash.hex()}\")\n    w3.eth.wait_for_transaction_receipt(tx_hash)\n    print(\"Транзакцію схвалення видобуто.\")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) очікує, доки транзакцію не буде видобуто. За потреби він повертає квитанцію.

```python
SELL_PARAMS = {\n    \"path\": WETH_TO_USDC,\n    \"recipient\": account.address,\n    \"deadline\": 2**256 - 1,\n    \"amountIn\": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,\n    \"amountOutMinimum\": 0,\n}
```

Це параметри для продажу WETH.

```python
def make_buy_params(quote: Quote) -> dict:\n    return {\n        \"path\": USDC_TO_WETH,\n        \"recipient\": account.address,\n        \"deadline\": 2**256 - 1,\n        \"amountIn\": int(quote.price*WETH_TRADE_AMOUNT) * 10**wethusdc_pool.token0.decimals,\n        \"amountOutMinimum\": 0,\n    }
```

На відміну від `SELL_PARAMS`, параметри купівлі можуть змінюватися. Вхідна сума — це вартість 1 WETH, доступна в `quote`.

```python
def buy(quote: Quote):\n    buy_params = make_buy_params(quote)\n    approve_token(wethusdc_pool.token0.contract, buy_params[\"amountIn\"])\n    txn = swap_router.functions.exactInput(buy_params).build_transaction(txn_params())\n    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)\n    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)\n    print(f\"Надіслано транзакцію купівлі: {tx_hash.hex()}\")\n    w3.eth.wait_for_transaction_receipt(tx_hash)\n    print(\"Транзакцію купівлі видобуто.\")\n\n\ndef sell():\n    approve_token(wethusdc_pool.token1.contract,\n                  WETH_TRADE_AMOUNT * 10**wethusdc_pool.token1.decimals)\n    txn = swap_router.functions.exactInput(SELL_PARAMS).build_transaction(txn_params())\n    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)\n    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)\n    print(f\"Надіслано транзакцію продажу: {tx_hash.hex()}\")\n    w3.eth.wait_for_transaction_receipt(tx_hash)\n    print(\"Транзакцію продажу видобуто.\")
```

Функції `buy()` та `sell()` майже ідентичні. Спочатку ми схвалюємо достатній дозвіл для `SwapRouter`, а потім викликаємо його з правильним шляхом і сумою.

```python
def balances():\n    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()\n    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()\n\n    print(f\"{wethusdc_pool.token0.symbol} Баланс: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}\")\n    print(f\"{wethusdc_pool.token1.symbol} Баланс: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}\")
```

Повідомте про баланси користувача в обох валютах.

```python
print(\"Баланси облікового запису перед угодою:\")\nbalances()\n\nif (expected_price > current_price):\n    print(f\"Купувати, я очікую, що ціна зросте на {expected_price - current_price} USD\")\n    buy(wethusdc_quotes[-1])\nelse:\n    print(f\"Продавати, я очікую, що ціна впаде на {current_price - expected_price} USD\")\n    sell()\n\nprint(\"Баланси облікового запису після угоди:\")\nbalances()
```

Наразі цей агент працює лише один раз. Однак ви можете змінити його для безперервної роботи, запустивши його з [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) або обернувши рядки 368-400 у цикл і використавши [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) для очікування до настання часу для наступного циклу.

## Можливі вдосконалення {#improvements}

Це не повна виробнича версія; це лише приклад для вивчення основ. Ось кілька ідей для вдосконалень.

### Розумніша торгівля {#smart-trading}

Існують два важливі факти, які агент ігнорує, вирішуючи, що робити.

- _Масштаб очікуваної зміни_. Агент продає фіксовану кількість `WETH`, якщо очікується падіння ціни, незалежно від масштабу падіння.
  Можна стверджувати, що було б краще ігнорувати незначні зміни й продавати залежно від того, наскільки ми очікуємо падіння ціни.
- _Поточний портфель_. Якщо 10 % вашого портфеля знаходиться у WETH, і ви думаєте, що ціна зросте, ймовірно, є сенс купити ще. Але якщо 90 % вашого портфеля знаходиться у WETH, ви можете бути достатньо відкриті, і немає потреби купувати ще. Зворотне вірно, якщо ви очікуєте, що ціна впаде.

### Що робити, якщо ви хочете зберегти свою торгову стратегію в таємниці? {#secret}

Постачальники ШІ можуть бачити запити, які ви надсилаєте до їхніх LLM, що може розкрити геніальну торгову систему, яку ви розробили за допомогою свого агента. Торгова система, яку використовує занадто багато людей, нічого не варта, оскільки занадто багато людей намагаються купити, коли ви хочете купити (і ціна зростає), і намагаються продати, коли ви хочете продати (і ціна падає).

Ви можете запустити LLM локально, наприклад, за допомогою [LM-Studio](https://lmstudio.ai/), щоб уникнути цієї проблеми.

### Від AI-бота до AI-агента {#bot-to-agent}

Можна цілком обґрунтовано стверджувати, що це [AI-бот, а не AI-агент](/ai-agents/#ai-agents-vs-ai-bots). Він реалізує відносно просту стратегію, яка покладається на заздалегідь визначену інформацію. Ми можемо увімкнути самовдосконалення, наприклад, надавши список пулів Uniswap v3 та їхні останні значення й запитавши, яка комбінація має найкращу прогностичну цінність.

### Захист від прослизання {#slippage-protection}

Наразі немає [захисту від прослизання](https://uniswapv3book.com/milestone_3/slippage-protection.html). Якщо поточне котирування становить 2000 доларів США, а очікувана ціна — 2100 доларів США, агент купить. Однак, якщо до того, як агент купить, вартість зросте до 2200 доларів, купувати більше немає сенсу.

Щоб реалізувати захист від прослизання, вкажіть значення `amountOutMinimum` у рядках 325 і 334 файлу [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325).

## Висновок {#conclusion}

Сподіваюся, тепер ви знаєте достатньо, щоб почати роботу з AI-агентами. Це не всеосяжний огляд теми; цьому присвячені цілі книги, але цього достатньо, щоб почати. Успіхів!

[Більше моїх робіт дивіться тут](https://cryptodocguy.pro/).
