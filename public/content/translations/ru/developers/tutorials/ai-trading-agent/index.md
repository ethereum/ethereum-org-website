---
title: "Создайте собственного торгового ИИ-агента на Эфириуме"
description: "В этом руководстве вы узнаете, как создать простого торгового ИИ-агента. Этот агент считывает информацию из блокчейна, запрашивает у LLM рекомендацию на основе этой информации, выполняет сделку, рекомендованную LLM, а затем ждет и повторяет процесс."
author: "Ори Померанц"
tags: ["ИИ", "трейдинг", "агент", "Python"]
skill: intermediate
breadcrumb: "Торговый ИИ-агент"
published: 2026-02-13
lang: ru
sidebarDepth: 3
---

В этом руководстве вы узнаете, как создать простого торгового ИИ-агента. Этот агент работает по следующим шагам:

1. Считывание текущих и прошлых цен токена, а также другой потенциально важной информации
2. Создание запроса с этой информацией, а также с контекстными данными, объясняющими ее значимость
3. Отправка запроса и получение прогнозируемой цены
4. Торговля на основе рекомендации
5. Ожидание и повторение

Этот агент демонстрирует, как считывать информацию, преобразовывать ее в запрос, который дает полезный ответ, и использовать этот ответ. Все это — необходимые шаги для ИИ-агента. Этот агент реализован на Python, поскольку это наиболее распространенный язык, используемый в сфере ИИ.

## Зачем это нужно? {#why-do-this}

Автоматизированные торговые агенты позволяют разработчикам выбирать и выполнять торговую стратегию. [ИИ-агенты](/ai-agents) позволяют использовать более сложные и динамичные торговые стратегии, потенциально задействуя информацию и алгоритмы, о которых разработчик даже не задумывался.

## Инструменты {#tools}

В этом руководстве используются [Python](https://www.python.org/), [библиотека Web3](https://web3py.readthedocs.io/en/stable/) и [Юнисвоп v3](https://github.com/Uniswap/v3-periphery) для получения котировок и торговли.

### Почему Python? {#python}

Наиболее широко используемым языком для ИИ является [Python](https://www.python.org/), поэтому мы используем его здесь. Не волнуйтесь, если вы не знаете Python. Этот язык очень понятен, и я подробно объясню, что именно он делает.

[Библиотека Web3](https://web3py.readthedocs.io/en/stable/) — это самый распространенный API Эфириума для Python. Ее довольно легко использовать.

### Торговля в блокчейне {#trading-on-blockchain}

Существует [множество децентрализованных бирж (DEX)](/apps/categories/defi/), которые позволяют торговать токенами в Эфириуме. Однако они, как правило, имеют схожие обменные курсы из-за [арбитража](/developers/docs/smart-contracts/composability/#better-user-experience).

[Юнисвоп](https://app.uniswap.org/) — это широко используемая DEX, которую мы можем применять как для получения котировок (чтобы видеть относительную стоимость токенов), так и для торговли.

### OpenAI {#openai}

В качестве большой языковой модели (LLM) для начала я выбрал [OpenAI](https://openai.com/). Для запуска приложения из этого руководства вам потребуется оплатить доступ к API. Минимального платежа в 5 долларов будет более чем достаточно.

## Разработка шаг за шагом {#step-by-step}

Чтобы упростить разработку, мы будем действовать поэтапно. Каждый шаг представляет собой ветку на GitHub.

### Начало работы {#getting-started}

Ниже приведены шаги для начала работы в UNIX или Linux (включая [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)).

1. Если у вас его еще нет, скачайте и установите [Python](https://www.python.org/downloads/).

2. Клонируйте репозиторий GitHub.

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. Установите [`uv`](https://docs.astral.sh/uv/getting-started/installation/). Команда в вашей системе может отличаться.

   ```sh
   pipx install uv
   ```

4. Скачайте библиотеки.

   ```sh
   uv sync
   ```

5. Активируйте виртуальную среду.

   ```sh
   source .venv/bin/activate
   ```

6. Чтобы убедиться, что Python и Web3 работают правильно, запустите `python3` и передайте ему эту программу. Вы можете ввести ее в командной строке `>>>`; создавать файл не нужно.

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### Чтение из блокчейна {#read-blockchain}

Следующий шаг — чтение из блокчейна. Для этого вам нужно переключиться на ветку `02-read-quote`, а затем использовать `uv` для запуска программы.

```sh
git checkout 02-read-quote
uv run agent.py
```

Вы должны получить список объектов `Quote`, каждый из которых содержит временную метку, цену и актив (в настоящее время всегда `WETH/USDC`).

Вот построчное объяснение.

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

Импортируем необходимые библиотеки. Они будут объяснены ниже по мере использования.

```python
print = functools.partial(print, flush=True)
```

Заменяет `print` в Python на версию, которая всегда немедленно сбрасывает вывод. Это полезно в долго работающем скрипте, поскольку мы не хотим ждать обновлений статуса или отладочного вывода.

```python
MAINNET_URL = "https://eth.drpc.org"
```

URL-адрес для доступа к мейннету. Вы можете получить его через [узел как услугу (Node as a service)](/developers/docs/nodes-and-clients/nodes-as-a-service/) или использовать один из тех, что представлены на [Chainlist](https://chainlist.org/chain/1).

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

Блок в мейннете Эфириума обычно создается каждые двенадцать секунд, поэтому это количество блоков, которое мы ожидаем за определенный период времени. Обратите внимание, что это не точная цифра. Если [предлагающий блок](/developers/docs/consensus-mechanisms/pos/block-proposal/) недоступен, этот блок пропускается, и время до следующего блока составляет 24 секунды. Если бы мы хотели получить точный блок для временной метки, мы бы использовали [бинарный поиск](https://en.wikipedia.org/wiki/Binary_search). Однако для наших целей этого вполне достаточно. Предсказание будущего — не точная наука.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

Размер цикла. Мы просматриваем котировки один раз за цикл и пытаемся оценить стоимость в конце следующего цикла.

```python
# Адрес пула, который мы читаем
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

Значения котировок берутся из пула Юнисвоп v3 USDC/WETH по адресу [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract). Этот адрес уже представлен в формате контрольной суммы, но лучше использовать [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address), чтобы сделать код пригодным для повторного использования.

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

Это [ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) для двух контрактов, к которым нам нужно обращаться. Чтобы код был лаконичным, мы включаем только те функции, которые нам нужно вызывать.

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

Инициализируем библиотеку [`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) и подключаемся к узлу Эфириума.

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

Это один из способов создания класса данных в Python. Тип данных [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) используется для подключения к контракту. Обратите внимание на `(frozen=True)`. В Python [логические значения](https://en.wikipedia.org/wiki/Boolean_data_type) определяются как `True` или `False` с заглавной буквы. Этот класс данных имеет атрибут `frozen`, что означает, что его поля не могут быть изменены.

Обратите внимание на отступы. В отличие от [C-подобных языков](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages), Python использует отступы для обозначения блоков. Интерпретатор Python знает, что следующее определение не является частью этого класса данных, поскольку оно не начинается с тем же отступом, что и поля класса данных.

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

Тип [`Decimal`](https://docs.python.org/3/library/decimal.html) используется для точной работы с десятичными дробями.

```python
    def get_price(self, block: int) -> Decimal:
```

Так определяется функция в Python. Определение имеет отступ, чтобы показать, что оно все еще является частью `PoolInfo`.

В функции, которая является частью класса данных, первым параметром всегда является `self` — экземпляр класса данных, который был вызван. Здесь есть еще один параметр — номер блока.

```python
        assert block <= w3.eth.block_number, "Block is in the future"
```

Если бы мы могли читать будущее, нам бы не понадобился ИИ для трейдинга.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

Синтаксис для вызова функции в EVM из Web3 выглядит так: `<contract object>.functions.<function name>().call(<parameters>)`. Параметрами могут быть параметры функции EVM (если они есть; здесь их нет) или [именованные параметры](https://en.wikipedia.org/wiki/Named_parameter) для изменения поведения блокчейна. Здесь мы используем один из них, `block_identifier`, чтобы указать [номер блока](/developers/docs/apis/json-rpc/#default-block), в котором мы хотим выполнить функцию.

Результатом является [эта структура в виде массива](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72). Первое значение — это функция обменного курса между двумя токенами.

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

Чтобы уменьшить количество ончейн-вычислений, Юнисвоп v3 хранит не сам коэффициент обмена, а его квадратный корень. Поскольку EVM не поддерживает математику с плавающей запятой или дроби, вместо фактического значения возвращается <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5;</mo><msup><mn>2</mn><mn>96</mn></msup></math>.

```python
         # (токен1 за токен0)
        return 1/(raw_price * self.decimal_factor)
```

Сырая цена, которую мы получаем, — это количество `token0`, которое мы получаем за каждый `token1`. В нашем пуле `token0` — это USDC (стейблкоин, стоимость которого равна доллару США), а `token1` — это [обернутый эфир (WETH)](https://opensea.io/learn/blockchain/what-is-weth). Значение, которое нам действительно нужно, — это количество долларов за WETH, а не наоборот.

Десятичный коэффициент — это отношение между [десятичными коэффициентами](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) для двух токенов.

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

Этот класс данных представляет котировку: цену конкретного актива в заданный момент времени. На данном этапе поле `asset` не имеет значения, поскольку мы используем один пул и, следовательно, имеем один актив. Однако позже мы добавим больше активов.

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

Эта функция принимает адрес и возвращает информацию о контракте токена по этому адресу. Чтобы создать новый [`Contract` в Web3](https://web3py.readthedocs.io/en/stable/web3.contract.html), мы передаем адрес и ABI в `w3.eth.contract`.

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

Эта функция возвращает все необходимое о [конкретном пуле](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol). Синтаксис `f"<string>"` — это [форматированная строка](https://docs.python.org/3/reference/lexical_analysis.html#f-strings).

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

Получаем объект `Quote`. Значение по умолчанию для `block_number` — `None` (нет значения).

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

Если номер блока не был указан, используем `w3.eth.block_number`, что означает номер последнего блока. Это синтаксис для [оператора `if`](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement).

Может показаться, что было бы лучше просто установить значение по умолчанию на `w3.eth.block_number`, но это не сработает должным образом, поскольку это будет номер блока на момент определения функции. В долго работающем агенте это стало бы проблемой.

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

Используем [библиотеку `datetime`](https://docs.python.org/3/library/datetime.html) для форматирования в вид, читаемый для людей и больших языковых моделей (LLM). Используем [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize) для округления значения до двух знаков после запятой.

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

В Python вы определяете [список](https://docs.python.org/3/library/stdtypes.html#typesseq-list), который может содержать только определенный тип, используя `list[<type>]`.

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

В Python цикл [`for`](https://docs.python.org/3/tutorial/controlflow.html#for-statements) обычно перебирает элементы списка. Список номеров блоков для поиска котировок берется из [`range`](https://docs.python.org/3/library/stdtypes.html#range).

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

Для каждого номера блока получаем объект `Quote` и добавляем его в список `quotes`. Затем возвращаем этот список.

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

Это основной код скрипта. Считываем информацию о пуле, получаем двенадцать котировок и [`pprint` (выводим)](https://docs.python.org/3/library/pprint.html#pprint.pprint) их.

### Создание промпта {#prompt}

Далее нам нужно преобразовать этот список котировок в промпт для LLM и получить ожидаемое будущее значение.

```sh
git checkout 03-create-prompt
uv run agent.py
```

Теперь выводом будет промпт для LLM, похожий на:

```
Учитывая эти котировки:
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


Каким, по вашему мнению, будет значение WETH/USDC в момент времени 2026-02-02T17:56?

Предоставьте свой ответ в виде одного числа, округленного до двух знаков после запятой,
без какого-либо другого текста.
```

Обратите внимание, что здесь представлены котировки для двух активов: `WETH/USDC` и `WBTC/WETH`. Добавление котировок другого актива может повысить точность прогноза.

#### Как выглядит промпт {#prompt-explanation}

Этот промпт состоит из трех разделов, которые довольно часто встречаются в промптах для LLM.

1. Информация. LLM обладают большим объемом информации, полученной в ходе обучения, но обычно у них нет самых свежих данных. Именно поэтому нам нужно извлекать последние котировки здесь. Добавление информации в промпт называется [генерацией с дополненной выборкой (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation).

2. Сам вопрос. Это то, что мы хотим узнать.

3. Инструкции по форматированию вывода. Обычно LLM дает нам оценку с объяснением того, как она к ней пришла. Это лучше для людей, но компьютерной программе нужен только конечный результат.

#### Объяснение кода {#prompt-code}

Вот новый код.

```python
from datetime import datetime, timezone, timedelta
```

Нам нужно предоставить LLM время, для которого мы хотим получить оценку. Чтобы получить время «через n минут/часов/дней» в будущем, мы используем [класс `timedelta`](https://docs.python.org/3/library/datetime.html#datetime.timedelta).

```python
# Адреса пулов, которые мы читаем
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

У нас есть два пула, которые нам нужно считать.

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

В пуле WETH/USDC мы хотим знать, сколько `token0` (USDC) нам нужно, чтобы купить один `token1` (WETH). В пуле WETH/WBTC мы хотим знать, сколько `token1` (WETH) нам нужно, чтобы купить один `token0` (WBTC, который является обернутым биткоином). Нам нужно отслеживать, нужно ли инвертировать соотношение пула.

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

Чтобы узнать, нужно ли инвертировать пул, мы передаем это в качестве входных данных в `read_pool`. Кроме того, символ актива должен быть настроен правильно.

Синтаксис `<a> if <b> else <c>` — это эквивалент [тернарного условного оператора](https://en.wikipedia.org/wiki/Ternary_conditional_operator) в Python, который в C-подобном языке выглядел бы как `<b> ? <a> : <c>`.

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

Эта функция создает строку, которая форматирует список объектов `Quote`, предполагая, что все они относятся к одному и тому же активу.

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

В Python [многострочные строковые литералы](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) записываются как `"""` .... `"""`.

```python
Given these quotes:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

Здесь мы используем паттерн [MapReduce](https://en.wikipedia.org/wiki/MapReduce) для генерации строки для каждого списка котировок с помощью `format_quotes`, а затем сводим их в одну строку для использования в промпте.

```python
What would you expect the value for {asset} to be at time {expected_time}?

Provide your answer as a single number rounded to two decimal places,
without any other text.
    """
```

Остальная часть промпта выглядит так, как и ожидалось.

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

Просматриваем два пула и получаем котировки из обоих.

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

Определяем будущий момент времени, для которого мы хотим получить оценку, и создаем промпт.

### Взаимодействие с LLM {#interface-llm}

Далее мы отправляем промпт реальной LLM и получаем ожидаемое будущее значение. Я написал эту программу с использованием OpenAI, поэтому, если вы хотите использовать другого провайдера, вам придется ее адаптировать.

1. Создайте [аккаунт OpenAI](https://auth.openai.com/create-account)
2. [Пополните счет](https://platform.openai.com/settings/organization/billing/overview) — минимальная сумма на момент написания статьи составляет 5 долларов
3. [Создайте ключ API](https://platform.openai.com/settings/organization/api-keys)
4. В командной строке экспортируйте ключ API, чтобы ваша программа могла его использовать

   ```sh
   export OPENAI_API_KEY=sk-<the rest of the key goes here>
   ```

5. Переключитесь на нужную ветку и запустите агента

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

Вот новый код.

```python
from openai import OpenAI

open_ai = OpenAI()  # Клиент читает переменную окружения OPENAI_API_KEY
```

Импортируем и создаем экземпляр API OpenAI.

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

Вызываем API OpenAI (`open_ai.chat.completions.create`) для создания ответа.

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

Выводим цену и предоставляем рекомендацию о покупке или продаже.

#### Тестирование прогнозов {#testing-the-predictions}

Теперь, когда мы можем генерировать прогнозы, мы также можем использовать исторические данные, чтобы оценить, насколько полезны наши прогнозы.

```sh
uv run test-predictor.py
```

Ожидаемый результат выглядит примерно так:

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

Большая часть тестера идентична агенту, но вот новые или измененные части.

```python
CYCLES_FOR_TEST = 40 # Для бэктеста, сколько циклов мы тестируем

# Получить множество котировок
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

Мы смотрим на `CYCLES_FOR_TEST` (здесь указано 40) дней назад.

```python
# Создать прогнозы и сверить их с реальной историей

total_error = Decimal(0)
changes = []
```

Нас интересуют два типа ошибок. Первый, `total_error`, — это просто сумма ошибок, допущенных предиктором.

Чтобы понять второй тип, `changes`, нам нужно вспомнить цель агента. Она заключается не в прогнозировании соотношения WETH/USDC (цены ETH). Она заключается в выдаче рекомендаций на продажу и покупку. Если текущая цена составляет 2000 долларов, а на завтра прогнозируется 2010 долларов, мы не против, если фактический результат составит 2020 долларов, и мы заработаем дополнительные деньги. Но мы _будем_ против, если он спрогнозировал 2010 долларов, купил ETH на основе этой рекомендации, а цена упала до 1990 долларов.

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

Мы можем рассматривать только те случаи, когда доступна полная история (значения, использованные для прогноза, и реальное значение для сравнения). Это означает, что самый новый случай должен быть тем, который начался `CYCLES_BACK` назад.

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

Используем [срезы](https://www.w3schools.com/python/ref_func_slice.asp), чтобы получить то же количество выборок, которое использует агент. Код между этим и следующим сегментом — это тот же код получения прогноза, что и в агенте.

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

Получаем прогнозируемую цену, реальную цену и цену на момент прогноза. Нам нужна цена на момент прогноза, чтобы определить, была ли рекомендация покупать или продавать.

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Prediction for {prediction_time}: predicted {predicted_price} USD, real {real_price} USD, error {error} USD")
```

Вычисляем ошибку и добавляем ее к общей сумме.

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

Для `changes` мы хотим узнать денежный эффект от покупки или продажи одного ETH. Поэтому сначала нам нужно определить рекомендацию, затем оценить, как изменилась фактическая цена, и принесла ли рекомендация деньги (положительное изменение) или привела к убыткам (отрицательное изменение).

```python
print (f"Mean prediction error over {len(wethusdc_quotes)-CYCLES_BACK} predictions: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Mean change per recommendation: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Standard variance of changes: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

Сообщаем о результатах.

```python
print (f"Profitable days: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Losing days: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

Используем [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) для подсчета количества прибыльных и убыточных дней. Результатом является объект фильтра, который нам нужно преобразовать в список, чтобы получить его длину.

### Отправка транзакций {#submit-txn}

Теперь нам нужно фактически отправлять транзакции. Однако на данном этапе, пока система не проверена, я не хочу тратить реальные деньги. Вместо этого мы создадим локальный форк мейннета и будем «торговать» в этой сети.

Вот шаги для создания локального форка и включения торговли.

1. Установите [Foundry](https://getfoundry.sh/introduction/installation)

2. Запустите [`anvil`](https://getfoundry.sh/anvil/overview)

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` прослушивает URL-адрес по умолчанию для Foundry, http://localhost:8545, поэтому нам не нужно указывать URL-адрес для [команды `cast`](https://getfoundry.sh/cast/overview), которую мы используем для управления блокчейном.

3. При запуске в `anvil` доступно десять тестовых аккаунтов, на которых есть ETH — установите переменные среды для первого из них

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. Это контракты, которые нам нужно использовать. [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) — это контракт Юнисвоп v3, который мы используем для фактической торговли. Мы могли бы торговать напрямую через пул, но так гораздо проще.

   Две нижние переменные — это пути Юнисвоп v3, необходимые для свопа между WETH и USDC.

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. На каждом из тестовых аккаунтов есть 10 000 ETH. Используйте контракт WETH, чтобы обернуть 1000 ETH и получить 1000 WETH для торговли.

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. Используйте `SwapRouter` для обмена 500 WETH на USDC.

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   Вызов `approve` создает разрешение, которое позволяет `SwapRouter` тратить часть наших токенов. Контракты не могут отслеживать события, поэтому, если мы переведем токены напрямую на контракт `SwapRouter`, он не узнает, что ему заплатили. Вместо этого мы разрешаем контракту `SwapRouter` потратить определенную сумму, а затем `SwapRouter` делает это. Это делается через функцию, вызываемую `SwapRouter`, поэтому он знает, была ли операция успешной.

7. Убедитесь, что у вас достаточно обоих токенов.

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

Теперь, когда у нас есть WETH и USDC, мы можем фактически запустить агента.

```sh
git checkout 05-trade
uv run agent.py
```

Вывод будет выглядеть примерно так:

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

Чтобы использовать его на практике, вам потребуется внести несколько незначительных изменений.

- В строке 14 измените `MAINNET_URL` на реальную точку доступа, например `https://eth.drpc.org`
- В строке 28 измените `PRIVATE_KEY` на ваш собственный приватный ключ
- Если вы не очень богаты и не можете покупать или продавать 1 ETH каждый день для непроверенного агента, вы, вероятно, захотите изменить строку 29, чтобы уменьшить `WETH_TRADE_AMOUNT`

#### Объяснение кода {#trading-code}

Вот новый код.

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

Те же переменные, которые мы использовали на шаге 4.

```python
WETH_TRADE_AMOUNT=1
```

Сумма для торговли.

```python
ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... },
    { "name": "balanceOf", ...},
    { "name": "approve", ...}
]
```

Для фактической торговли нам нужна функция `approve`. Мы также хотим показывать балансы до и после, поэтому нам также понадобится `balanceOf`.

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

В ABI `SwapRouter` нам нужна только `exactInput`. Существует связанная функция `exactOutput`, которую мы могли бы использовать для покупки ровно одного WETH, но для простоты мы используем `exactInput` в обоих случаях.

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

Определения Web3 для [`account`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) и контракта `SwapRouter`.

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

Параметры транзакции. Здесь нам нужна функция, потому что [нонс](https://en.wikipedia.org/wiki/Cryptographic_nonce) должен меняться каждый раз.

```python
def approve_token(contract: Contract, amount: int):
```

Одобряем разрешение на использование токенов для `SwapRouter`.

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

Вот как мы отправляем транзакцию в Web3. Сначала мы используем [объект `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) для создания транзакции. Затем мы используем [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) для подписания транзакции с помощью `PRIVATE_KEY`. Наконец, мы используем [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) для отправки транзакции.

```python
    print(f"Approve transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Approve transaction mined.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) ждет, пока транзакция не будет добыта. При необходимости она возвращает квитанцию.

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

Это параметры при продаже WETH.

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

В отличие от `SELL_PARAMS`, параметры покупки могут меняться. Входная сумма — это стоимость 1 WETH, доступная в `quote`.

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

Функции `buy()` и `sell()` почти идентичны. Сначала мы одобряем достаточное разрешение для `SwapRouter`, а затем вызываем его с правильным путем и суммой.

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

Сообщаем балансы пользователя в обеих валютах.

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

В настоящее время этот агент срабатывает только один раз. Однако вы можете изменить его для непрерывной работы, либо запуская его из [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html), либо обернув строки 368-400 в цикл и используя [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) для ожидания времени следующего цикла.

## Возможные улучшения {#improvements}

Это не полноценная рабочая версия; это всего лишь пример для обучения основам. Вот несколько идей для улучшений.

### Более умная торговля {#smart-trading}

Есть два важных факта, которые агент игнорирует при принятии решения о том, что делать.

- _Величина ожидаемого изменения_. Агент продает фиксированное количество `WETH`, если ожидается снижение цены, независимо от масштаба этого снижения.
  Возможно, было бы лучше игнорировать незначительные изменения и продавать в зависимости от того, насколько, по нашим ожиданиям, снизится цена.
- _Текущий портфель_. Если 10% вашего портфеля находится в WETH, и вы думаете, что цена пойдет вверх, вероятно, имеет смысл купить больше. Но если 90% вашего портфеля находится в WETH, вы, возможно, уже достаточно подвержены риску, и нет необходимости покупать больше. Обратное верно, если вы ожидаете снижения цены.

### Что, если вы хотите сохранить свою торговую стратегию в секрете? {#secret}

Поставщики ИИ могут видеть запросы, которые вы отправляете их LLM, что может раскрыть гениальную торговую систему, которую вы разработали с помощью своего агента. Торговая система, которую использует слишком много людей, бесполезна, потому что слишком много людей пытаются купить, когда вы хотите купить (и цена идет вверх), и пытаются продать, когда вы хотите продать (и цена идет вниз).

Вы можете запустить LLM локально, например, используя [LM-Studio](https://lmstudio.ai/), чтобы избежать этой проблемы.

### От ИИ-бота к ИИ-агенту {#bot-to-agent}

Можно с уверенностью сказать, что это [ИИ-бот, а не ИИ-агент](/ai-agents/#ai-agents-vs-ai-bots). Он реализует относительно простую стратегию, которая опирается на заранее определенную информацию. Мы можем включить самосовершенствование, например, предоставив список пулов Юнисвоп v3 и их последние значения и спросив, какая комбинация имеет наилучшую прогностическую ценность.

### Защита от проскальзывания {#slippage-protection}

В настоящее время нет [защиты от проскальзывания](https://uniswapv3book.com/milestone_3/slippage-protection.html). Если текущая котировка составляет 2000 долларов, а ожидаемая цена — 2100 долларов, агент совершит покупку. Однако, если до того, как агент купит, стоимость вырастет до 2200 долларов, покупать больше не имеет смысла.

Чтобы реализовать защиту от проскальзывания, укажите значение `amountOutMinimum` в строках 325 и 334 файла [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325).

## Заключение {#conclusion}

Надеюсь, теперь вы знаете достаточно, чтобы начать работу с ИИ-агентами. Это не всеобъемлющий обзор темы; этому посвящены целые книги, но этого достаточно для начала. Удачи!

[Смотрите здесь другие мои работы](https://cryptodocguy.pro/).