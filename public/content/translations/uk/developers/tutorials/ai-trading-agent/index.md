---
title: "Створіть власного торгового ШІ-агента на Етеріумі"
description: "У цьому посібнику ви дізнаєтеся, як створити простого торгового ШІ-агента. Цей агент зчитує інформацію з блокчейну, запитує у великої мовної моделі (LLM) рекомендацію на основі цієї інформації, здійснює торгівлю, яку рекомендує LLM, а потім чекає і повторює процес."
author: "Орі Померанц"
tags: ["ШІ", "торгівля", "агент", "Python"]
skill: intermediate
breadcrumb: "Торговий ШІ-агент"
published: 2026-02-13
lang: uk
sidebarDepth: 3
---

У цьому посібнику ви дізнаєтеся, як створити простого торгового ШІ-агента. Цей агент працює за такими кроками:

1. Зчитування поточних та минулих цін токена, а також іншої потенційно релевантної інформації
2. Створення запиту з цією інформацією разом із довідковою інформацією, щоб пояснити, як вона може бути релевантною
3. Надсилання запиту та отримання прогнозованої ціни
4. Торгівля на основі рекомендації
5. Очікування та повторення

Цей агент демонструє, як зчитувати інформацію, перетворювати її на запит, який дає корисну відповідь, і використовувати цю відповідь. Усі ці кроки необхідні для ШІ-агента. Цей агент реалізований на Python, оскільки це найпоширеніша мова, що використовується у сфері ШІ.

## Навіщо це робити? {#why-do-this}

Автоматизовані торгові агенти дозволяють розробникам вибирати та виконувати торгову стратегію. [ШІ-агенти](/ai-agents) уможливлюють складніші та динамічніші торгові стратегії, потенційно використовуючи інформацію та алгоритми, про використання яких розробник навіть не замислювався.

## Інструменти {#tools}

У цьому посібнику використовуються [Python](https://www.python.org/), [бібліотека Web3](https://web3py.readthedocs.io/en/stable/) та [Юнісвоп v3](https://github.com/Uniswap/v3-periphery) для отримання котирувань і торгівлі.

### Чому Python? {#python}

Найбільш поширеною мовою для ШІ є [Python](https://www.python.org/), тому ми використовуємо її тут. Не хвилюйтеся, якщо ви не знаєте Python. Ця мова дуже зрозуміла, і я детально поясню, що саме вона робить.

[Бібліотека Web3](https://web3py.readthedocs.io/en/stable/) є найпоширенішим API Етеріуму для Python. Вона досить проста у використанні.

### Торгівля на блокчейні {#trading-on-blockchain}

Існує [багато децентралізованих бірж (DEX)](/apps/categories/defi/), які дозволяють торгувати токенами на Етеріумі. Однак вони, як правило, мають схожі обмінні курси через [арбітраж](/developers/docs/smart-contracts/composability/#better-user-experience).

[Юнісвоп](https://app.uniswap.org/) — це широко використовувана DEX, яку ми можемо застосовувати як для котирувань (щоб бачити відносну вартість токенів), так і для торгівлі.

### OpenAI {#openai}

Для великої мовної моделі я вирішив почати з [OpenAI](https://openai.com/). Щоб запустити застосунок із цього посібника, вам потрібно буде заплатити за доступ до API. Мінімального платежу в 5 доларів більш ніж достатньо.

## Розробка крок за кроком {#step-by-step}

Щоб спростити розробку, ми будемо рухатися поетапно. Кожен крок — це гілка на GitHub.

### Початок роботи {#getting-started}

Ось кроки для початку роботи в UNIX або Linux (включно з [WSL](https://learn.microsoft.com/en-us/windows/wsl/install))

1. Якщо у вас його ще немає, завантажте та встановіть [Python](https://www.python.org/downloads/).

2. Клонуйте репозиторій GitHub.

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. Встановіть [`uv`](https://docs.astral.sh/uv/getting-started/installation/). Команда у вашій системі може відрізнятися.

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

6. Щоб перевірити, чи правильно працюють Python та Web3, запустіть `python3` і надайте йому цю програму. Ви можете ввести її в командному рядку `>>>`; створювати файл не потрібно.

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### Зчитування з блокчейну {#read-blockchain}

Наступний крок — зчитування з блокчейну. Для цього вам потрібно перейти на гілку `02-read-quote`, а потім використати `uv` для запуску програми.

```sh
git checkout 02-read-quote
uv run agent.py
```

Ви маєте отримати список об'єктів `Quote`, кожен з яких містить часову мітку, ціну та актив (наразі завжди `WETH/USDC`).

Ось покрокове пояснення кожного рядка.

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

Імпортуємо необхідні бібліотеки. Вони пояснюються нижче під час використання.

```python
print = functools.partial(print, flush=True)
```

Замінює `print` у Python на версію, яка завжди негайно скидає буфер виводу. Це корисно в скриптах, що довго виконуються, оскільки ми не хочемо чекати на оновлення статусу або вивід для налагодження.

```python
MAINNET_URL = "https://eth.drpc.org"
```

URL-адреса для доступу до Головної мережі. Ви можете отримати її через [Вузол як послугу (Node as a service)](/developers/docs/nodes-and-clients/nodes-as-a-service/) або використати одну з тих, що рекламуються на [Chainlist](https://chainlist.org/chain/1).

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

Блок у головній мережі Ethereum зазвичай створюється кожні дванадцять секунд, тому це кількість блоків, яку ми очікуємо за певний період часу. Зверніть увагу, що це не точна цифра. Коли [пропонувач блоку](/developers/docs/consensus-mechanisms/pos/block-proposal/) не працює, цей блок пропускається, і час до наступного блоку становить 24 секунди. Якби ми хотіли отримати точний блок для часової мітки, ми б використали [бінарний пошук](https://en.wikipedia.org/wiki/Binary_search). Однак для наших цілей цього цілком достатньо. Прогнозування майбутнього — не точна наука.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

Розмір циклу. Ми переглядаємо котирування один раз за цикл і намагаємося оцінити вартість наприкінці наступного циклу.

```python
# Адреса пулу, який ми читаємо
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

Значення котирувань беруться з пулу Юнісвоп 3 USDC/WETH за адресою [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract). Ця адреса вже має форму контрольної суми, але краще використовувати [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address), щоб код можна було використовувати повторно.

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

Це [ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) для двох контрактів, до яких нам потрібно звернутися. Щоб код був лаконічним, ми включаємо лише ті функції, які нам потрібно викликати.

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

Ініціалізуємо бібліотеку [`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) та підключаємося до вузла Етеріуму.

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

Це один зі способів створення класу даних у Python. Тип даних [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) використовується для підключення до контракту. Зверніть увагу на `(frozen=True)`. У Python [логічні значення](https://en.wikipedia.org/wiki/Boolean_data_type) визначаються як `True` або `False` з великої літери. Цей клас даних є `frozen`, що означає, що поля не можна змінювати.

Зверніть увагу на відступи. На відміну від [C-подібних мов](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages), Python використовує відступи для позначення блоків. Інтерпретатор Python знає, що наступне визначення не є частиною цього класу даних, оскільки воно не починається з таким самим відступом, як поля класу даних.

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

Тип [`Decimal`](https://docs.python.org/3/library/decimal.html) використовується для точної обробки десяткових дробів.

```python
    def get_price(self, block: int) -> Decimal:
```

Це спосіб визначення функції у Python. Визначення має відступ, щоб показати, що воно все ще є частиною `PoolInfo`.

У функції, яка є частиною класу даних, першим параметром завжди є `self` — екземпляр класу даних, який викликається тут. Тут є ще один параметр — номер блоку.

```python
        assert block <= w3.eth.block_number, "Block is in the future"
```

Якби ми могли читати майбутнє, нам би не знадобився ШІ для торгівлі.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

Синтаксис для виклику функції на EVM з Web3 такий: `<contract object>.functions.<function name>().call(<parameters>)`. Параметрами можуть бути параметри функції EVM (якщо такі є; тут їх немає) або [іменовані параметри](https://en.wikipedia.org/wiki/Named_parameter) для зміни поведінки блокчейну. Тут ми використовуємо один із них, `block_identifier`, щоб вказати [номер блоку](/developers/docs/apis/json-rpc/#default-block), у якому ми хочемо виконати функцію.

Результатом є [ця структура у формі масиву](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72). Перше значення є функцією обмінного курсу між двома токенами.

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

Щоб зменшити ончейн-обчислення, Юнісвоп v3 зберігає не фактичний коефіцієнт обміну, а його квадратний корінь. Оскільки EVM не підтримує математику з рухомою комою або дроби, замість фактичного значення відповідь має вигляд <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5;</mo><msup><mn>2</mn><mn>96</mn></msup></math>

```python
         # (токен1 за токен0)
        return 1/(raw_price * self.decimal_factor)
```

Необроблена ціна, яку ми отримуємо, — це кількість `token0`, яку ми отримуємо за кожен `token1`. У нашому пулі `token0` — це USDC (стейблкоїн з такою ж вартістю, як і долар США), а `token1` — це [WETH](https://opensea.io/learn/blockchain/what-is-weth). Значення, яке ми насправді хочемо отримати, — це кількість доларів за WETH, а не навпаки.

Десятковий коефіцієнт — це співвідношення між [десятковими коефіцієнтами](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) для двох токенів.

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

Цей клас даних представляє котирування: ціну конкретного активу в певний момент часу. На цьому етапі поле `asset` не має значення, оскільки ми використовуємо один пул і, відповідно, маємо один актив. Однак пізніше ми додамо більше активів.

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

Ця функція приймає адресу та повертає інформацію про контракт токена за цією адресою. Щоб створити новий [Web3 `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html), ми передаємо адресу та ABI до `w3.eth.contract`.

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

Ця функція повертає все необхідне про [конкретний пул](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol). Синтаксис `f"<string>"` — це [форматований рядок](https://docs.python.org/3/reference/lexical_analysis.html#f-strings).

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

Отримуємо об'єкт `Quote`. Значення за замовчуванням для `block_number` — `None` (немає значення).

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

Якщо номер блоку не вказано, використовуємо `w3.eth.block_number`, що є останнім номером блоку. Це синтаксис для [оператора `if`](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement).

Може здатися, що було б краще просто встановити значення за замовчуванням на `w3.eth.block_number`, але це не спрацює належним чином, оскільки це був би номер блоку на момент визначення функції. У довготривалому агенті це стало б проблемою.

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

Використовуємо [бібліотеку `datetime`](https://docs.python.org/3/library/datetime.html), щоб відформатувати його у формат, зрозумілий для людей та великих мовних моделей (LLM). Використовуємо [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize), щоб округлити значення до двох знаків після коми.

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

У Python ви визначаєте [список](https://docs.python.org/3/library/stdtypes.html#typesseq-list), який може містити лише певний тип, використовуючи `list[<type>]`.

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

У Python цикл [`for`](https://docs.python.org/3/tutorial/controlflow.html#for-statements) зазвичай ітерує по списку. Список номерів блоків для пошуку котирувань береться з [`range`](https://docs.python.org/3/library/stdtypes.html#range).

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

Для кожного номера блоку отримуємо об'єкт `Quote` і додаємо його до списку `quotes`. Потім повертаємо цей список.

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

Це основний код скрипта. Зчитуємо інформацію про пул, отримуємо дванадцять котирувань і [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint) їх.

### Створення промпту {#prompt}

Далі нам потрібно перетворити цей список котирувань на промпт для LLM і отримати очікувану майбутню вартість.

```sh
git checkout 03-create-prompt
uv run agent.py
```

Тепер виводом буде промпт для LLM, схожий на:

```
Враховуючи ці котирування:
Актив: WETH/USDC
        2026-01-20T16:34 3016.21
        .
        .
        .
        2026-02-01T17:49 2299.10

Актив: WBTC/WETH
        2026-01-20T16:34 29.84
        .
        .
        .
        2026-02-01T17:50 33.46


Якою, на вашу думку, буде вартість WETH/USDC на момент 2026-02-02T17:56?

Надайте відповідь у вигляді одного числа, округленого до двох знаків після коми,
без будь-якого іншого тексту.
```

Зверніть увагу, що тут є котирування для двох активів: `WETH/USDC` та `WBTC/WETH`. Додавання котирувань іншого активу може підвищити точність прогнозу.

#### Як виглядає промпт {#prompt-explanation}

Цей промпт містить три розділи, які є досить поширеними в промптах для LLM.

1. Інформація. LLM мають багато інформації зі свого навчання, але зазвичай вони не мають найновішої. Саме тому нам потрібно отримувати тут останні котирування. Додавання інформації до промпту називається [генерацією з доповненим пошуком (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation).

2. Власне запитання. Це те, що ми хочемо дізнатися.

3. Інструкції щодо форматування виводу. Зазвичай LLM дає нам оцінку з поясненням того, як вона до неї дійшла. Це краще для людей, але комп'ютерній програмі потрібен лише кінцевий результат.

#### Пояснення коду {#prompt-code}

Ось новий код.

```python
from datetime import datetime, timezone, timedelta
```

Нам потрібно надати LLM час, для якого ми хочемо отримати оцінку. Щоб отримати час «n хвилин/годин/днів» у майбутньому, ми використовуємо [клас `timedelta`](https://docs.python.org/3/library/datetime.html#datetime.timedelta).

```python
# Адреси пулів, які ми читаємо
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

У нас є два пули, які нам потрібно зчитати.

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
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (токен1 за токен0)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

У пулі WETH/USDC ми хочемо знати, скільки `token0` (USDC) нам потрібно, щоб купити один `token1` (WETH). У пулі WETH/WBTC ми хочемо знати, скільки `token1` (WETH) нам потрібно, щоб купити один `token0` (WBTC, який є обгорнутим Біткоїном). Нам потрібно відстежувати, чи потрібно перевертати співвідношення пулу.

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

Щоб дізнатися, чи потрібно перевертати пул, ми маємо отримати це як вхідні дані для `read_pool`. Крім того, символ активу має бути налаштований правильно.

Синтаксис `<a> if <b> else <c>` є еквівалентом [тернарного умовного оператора](https://en.wikipedia.org/wiki/Ternary_conditional_operator) у Python, який у C-подібній мові мав би вигляд `<b> ? <a> : <c>`.

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

Ця функція створює рядок, який форматує список об'єктів `Quote`, припускаючи, що всі вони стосуються одного активу.

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

У Python [багаторядкові рядкові літерали](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) записуються як `"""` .... `"""`.

```python
Given these quotes:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

Тут ми використовуємо патерн [MapReduce](https://en.wikipedia.org/wiki/MapReduce), щоб згенерувати рядок для кожного списку котирувань за допомогою `format_quotes`, а потім зводимо їх в один рядок для використання в промпті.

```python
What would you expect the value for {asset} to be at time {expected_time}?

Provide your answer as a single number rounded to two decimal places,
without any other text.
    """
```

Решта промпту виглядає так, як і очікувалося.

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

Переглядаємо два пули та отримуємо котирування з обох.

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

Визначаємо майбутній момент часу, для якого ми хочемо отримати оцінку, і створюємо промпт.

### Взаємодія з LLM {#interface-llm}

Далі ми надсилаємо промпт до реальної LLM і отримуємо очікувану майбутню вартість. Я написав цю програму з використанням OpenAI, тому якщо ви хочете використовувати іншого провайдера, вам доведеться її адаптувати.

1. Створіть [акаунт OpenAI](https://auth.openai.com/create-account)
2. [Поповніть акаунт](https://platform.openai.com/settings/organization/billing/overview) — мінімальна сума на момент написання статті становить 5 доларів
3. [Створіть ключ API](https://platform.openai.com/settings/organization/api-keys)
4. У командному рядку експортуйте ключ API, щоб ваша програма могла його використовувати

   ```sh
   export OPENAI_API_KEY=sk-<the rest of the key goes here>
   ```

5. Перейдіть на відповідну гілку та запустіть агента

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

Ось новий код.

```python
from openai import OpenAI

open_ai = OpenAI()  # Клієнт читає змінну середовища OPENAI_API_KEY
```

Імпортуємо та створюємо екземпляр API OpenAI.

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

Викликаємо API OpenAI (`open_ai.chat.completions.create`) для створення відповіді.

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

Виводимо ціну та надаємо рекомендацію щодо купівлі або продажу.

#### Тестування прогнозів {#testing-the-predictions}

Тепер, коли ми можемо генерувати прогнози, ми також можемо використовувати історичні дані, щоб оцінити, чи створюємо ми корисні прогнози.

```sh
uv run test-predictor.py
```

Очікуваний результат схожий на:

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

Більша частина тестувальника ідентична агенту, але ось частини, які є новими або зміненими.

```python
CYCLES_FOR_TEST = 40 # Для бектесту, скільки циклів ми тестуємо

# Отримати багато котирувань
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

Ми дивимося на `CYCLES_FOR_TEST` (тут вказано 40) днів назад.

```python
# Створити прогнози та перевірити їх на реальній історії

total_error = Decimal(0)
changes = []
```

Нас цікавлять два типи похибок. Перший, `total_error`, — це просто сума похибок, допущених прогнозатором.

Щоб зрозуміти другий, `changes`, нам потрібно згадати мету агента. Вона полягає не в прогнозуванні співвідношення WETH/USDC (ціни ETH). Вона полягає у видачі рекомендацій щодо продажу та купівлі. Якщо поточна ціна становить 2000 доларів, а він прогнозує 2010 доларів на завтра, ми не проти, якщо фактичний результат складе 2020 доларів, і ми заробимо додаткові гроші. Але ми _будемо_ проти, якщо він спрогнозував 2010 доларів і купив ETH на основі цієї рекомендації, а ціна впала до 1990 доларів.

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

Ми можемо розглядати лише ті випадки, коли доступна повна історія (значення, використані для прогнозу, та реальне значення для порівняння). Це означає, що найновішим випадком має бути той, що розпочався `CYCLES_BACK` тому.

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

Використовуємо [зрізи](https://www.w3schools.com/python/ref_func_slice.asp), щоб отримати таку саму кількість зразків, яку використовує агент. Код між цим і наступним сегментом — це той самий код отримання прогнозу, який ми маємо в агенті.

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

Отримуємо прогнозовану ціну, реальну ціну та ціну на момент прогнозу. Нам потрібна ціна на момент прогнозу, щоб визначити, чи була рекомендація купувати чи продавати.

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Prediction for {prediction_time}: predicted {predicted_price} USD, real {real_price} USD, error {error} USD")
```

Обчислюємо похибку та додаємо її до загальної суми.

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

Для `changes` ми хочемо дізнатися грошовий вплив від купівлі або продажу одного ETH. Тому спочатку нам потрібно визначити рекомендацію, потім оцінити, як змінилася фактична ціна, і чи принесла рекомендація гроші (позитивна зміна), чи призвела до збитків (негативна зміна).

```python
print (f"Mean prediction error over {len(wethusdc_quotes)-CYCLES_BACK} predictions: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Mean change per recommendation: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Standard variance of changes: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

Звітуємо про результати.

```python
print (f"Profitable days: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Losing days: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

Використовуємо [`filter`](https://www.w3schools.com/python/ref_func_filter.asp), щоб підрахувати кількість прибуткових і збиткових днів. Результатом є об'єкт фільтра, який нам потрібно перетворити на список, щоб отримати довжину.

### Надсилання транзакцій {#submit-txn}

Тепер нам потрібно фактично надсилати транзакції. Однак я не хочу витрачати реальні гроші на цьому етапі, поки система не буде перевірена. Замість цього ми створимо локальний форк Головної мережі і будемо «торгувати» в цій мережі.

Ось кроки для створення локального форку та увімкнення торгівлі.

1. Встановіть [Foundry](https://getfoundry.sh/introduction/installation)

2. Запустіть [`anvil`](https://getfoundry.sh/anvil/overview)

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` прослуховує URL-адресу за замовчуванням для Foundry, http://localhost:8545, тому нам не потрібно вказувати URL-адресу для [команди `cast`](https://getfoundry.sh/cast/overview), яку ми використовуємо для маніпуляцій з блокчейном.

3. Під час роботи в `anvil` є десять тестових акаунтів, які мають ETH — встановіть змінні середовища для першого з них

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. Це контракти, які нам потрібно використовувати. [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) — це контракт Юнісвоп v3, який ми використовуємо для фактичної торгівлі. Ми могли б торгувати безпосередньо через пул, але так набагато простіше.

   Дві нижні змінні — це шляхи Юнісвоп v3, необхідні для обміну між WETH та USDC.

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. Кожен із тестових акаунтів має 10 000 ETH. Використовуйте контракт WETH, щоб обгорнути 1000 ETH для отримання 1000 WETH для торгівлі.

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. Використовуйте `SwapRouter` для обміну 500 WETH на USDC.

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   Виклик `approve` створює дозвіл, який дозволяє `SwapRouter` витрачати частину наших токенів. Контракти не можуть відстежувати події, тому якби ми переказали токени безпосередньо на контракт `SwapRouter`, він би не дізнався, що йому заплатили. Замість цього ми дозволяємо контракту `SwapRouter` витратити певну суму, а потім `SwapRouter` робить це. Це робиться через функцію, яку викликає `SwapRouter`, тому він знає, чи була вона успішною.

7. Переконайтеся, що у вас достатньо обох токенів.

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

Тепер, коли у нас є WETH та USDC, ми можемо фактично запустити агента.

```sh
git checkout 05-trade
uv run agent.py
```

Вивід буде схожий на:

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

Щоб фактично використовувати його, вам потрібно внести кілька незначних змін.

- У рядку 14 змініть `MAINNET_URL` на реальну точку доступу, наприклад `https://eth.drpc.org`
- У рядку 28 змініть `PRIVATE_KEY` на ваш власний приватний ключ
- Якщо ви не дуже багаті і не можете купувати або продавати 1 ETH щодня для неперевіреного агента, ви, можливо, захочете змінити рядок 29, щоб зменшити `WETH_TRADE_AMOUNT`

#### Пояснення коду {#trading-code}

Ось новий код.

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

Ті самі змінні, які ми використовували на кроці 4.

```python
WETH_TRADE_AMOUNT=1
```

Сума для торгівлі.

```python
ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... },
    { "name": "balanceOf", ...},
    { "name": "approve", ...}
]
```

Для фактичної торгівлі нам потрібна функція `approve`. Ми також хочемо показувати баланси до і після, тому нам також потрібна `balanceOf`.

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

В ABI `SwapRouter` нам потрібна лише `exactInput`. Існує пов'язана функція, `exactOutput`, яку ми могли б використати для купівлі рівно одного WETH, але для простоти ми просто використовуємо `exactInput` в обох випадках.

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

Визначення Web3 для [`account`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) та контракту `SwapRouter`.

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

Параметри транзакції. Нам потрібна функція тут, оскільки [нонс](https://en.wikipedia.org/wiki/Cryptographic_nonce) має змінюватися щоразу.

```python
def approve_token(contract: Contract, amount: int):
```

Схвалюємо дозвіл на токени для `SwapRouter`.

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

Ось як ми надсилаємо транзакцію у Web3. Спочатку ми використовуємо [об'єкт `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) для побудови транзакції. Потім ми використовуємо [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) для підписання транзакції за допомогою `PRIVATE_KEY`. Нарешті, ми використовуємо [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) для надсилання транзакції.

```python
    print(f"Approve transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Approve transaction mined.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) чекає, поки транзакція буде видобута. Вона повертає квитанцію, якщо це необхідно.

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

Це параметри під час продажу WETH.

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

На відміну від `SELL_PARAMS`, параметри купівлі можуть змінюватися. Вхідна сума — це вартість 1 WETH, як доступно в `quote`.

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

Функції `buy()` та `sell()` майже ідентичні. Спочатку ми схвалюємо достатній дозвіл для `SwapRouter`, а потім викликаємо його з правильним шляхом і сумою.

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

Звітуємо про баланси користувача в обох валютах.

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

Наразі цей агент працює лише один раз. Однак ви можете змінити його для безперервної роботи, запустивши його з [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) або обгорнувши рядки 368-400 у цикл і використовуючи [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) для очікування часу наступного циклу.

## Можливі покращення {#improvements}

Це не повноцінна робоча версія; це лише приклад для навчання основам. Ось кілька ідей для покращення.

### Розумніша торгівля {#smart-trading}

Є два важливі факти, які агент ігнорує під час прийняття рішення про те, що робити.

- _Величина очікуваної зміни_. Агент продає фіксовану суму `WETH`, якщо очікується зниження ціни, незалежно від величини цього зниження.
  Можливо, було б краще ігнорувати незначні зміни і продавати залежно від того, наскільки, за нашими очікуваннями, знизиться ціна.
- _Поточний портфель_. Якщо 10% вашого портфеля складається з WETH і ви вважаєте, що ціна зросте, ймовірно, є сенс купити більше. Але якщо 90% вашого портфеля в WETH, ви можете бути достатньо забезпечені, і немає потреби купувати більше. Зворотне твердження є правильним, якщо ви очікуєте зниження ціни.

### Що робити, якщо ви хочете зберегти свою торгову стратегію в таємниці? {#secret}

Постачальники ШІ можуть бачити запити, які ви надсилаєте до їхніх LLM, що може розкрити геніальну торгову систему, яку ви розробили за допомогою свого агента. Торгова система, якою користується занадто багато людей, нічого не варта, оскільки занадто багато людей намагаються купити, коли ви хочете купити (і ціна зростає), і намагаються продати, коли ви хочете продати (і ціна падає).

Ви можете запустити LLM локально, наприклад, використовуючи [LM-Studio](https://lmstudio.ai/), щоб уникнути цієї проблеми.

### Від ШІ-бота до ШІ-агента {#bot-to-agent}

Можна навести вагомі аргументи, що це [ШІ-бот, а не ШІ-агент](/ai-agents/#ai-agents-vs-ai-bots). Він реалізує відносно просту стратегію, яка спирається на заздалегідь визначену інформацію. Ми можемо увімкнути самовдосконалення, наприклад, надавши список пулів Юнісвоп v3 та їхні останні значення і запитавши, яка комбінація має найкращу прогностичну цінність.

### Захист від проковзування {#slippage-protection}

Наразі немає [захисту від проковзування](https://uniswapv3book.com/milestone_3/slippage-protection.html). Якщо поточне котирування становить 2000 доларів, а очікувана ціна — 2100 доларів, агент здійснить покупку. Однак, якщо до того, як агент купить, вартість зросте до 2200 доларів, купувати більше не має сенсу.

Щоб реалізувати захист від проковзування, вкажіть значення `amountOutMinimum` у рядках 325 і 334 [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325).

## Висновок {#conclusion}

Сподіваємося, тепер ви знаєте достатньо, щоб почати роботу з ШІ-агентами. Це не вичерпний огляд теми; цьому присвячені цілі книги, але цього достатньо для початку. Хай щастить!

[Більше моїх робіт можна знайти тут](https://cryptodocguy.pro/).