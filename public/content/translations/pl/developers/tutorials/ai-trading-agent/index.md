---
title: Stwórz własnego agenta AI do tradingu na Ethereum
description: W tym samouczku dowiesz się, jak stworzyć prostego agenta AI do tradingu. Agent ten odczytuje informacje z blockchaina, prosi model LLM o rekomendację na podstawie tych informacji, wykonuje transakcję zaleconą przez LLM, a następnie czeka i powtarza proces.
author: Ori Pomerantz
tags:
  - AI
  - trading
  - agent
  - Python
skill: intermediate
breadcrumb: Agent AI do tradingu
published: 2026-02-13
lang: pl
sidebarDepth: 3
---

W tym samouczku dowiesz się, jak zbudować prostego agenta AI do tradingu. Agent ten działa w następujących krokach:

1. Odczytuje obecne i przeszłe ceny tokena, a także inne potencjalnie istotne informacje
2. Buduje zapytanie z tymi informacjami, wraz z informacjami kontekstowymi wyjaśniającymi, dlaczego mogą być one istotne
3. Przesyła zapytanie i otrzymuje z powrotem prognozowaną cenę
4. Handluje na podstawie rekomendacji
5. Czeka i powtarza proces

Ten agent demonstruje, jak odczytywać informacje, przekształcać je w zapytanie, które daje użyteczną odpowiedź, i jak z tej odpowiedzi korzystać. Wszystkie te kroki są wymagane dla agenta AI. Ten agent jest zaimplementowany w języku Python, ponieważ jest to najpopularniejszy język używany w AI.

## Dlaczego warto to zrobić? {#why-do-this}

Zautomatyzowani agenci do tradingu pozwalają deweloperom na wybór i realizację strategii. [Agenci AI](/ai-agents) pozwalają na bardziej złożone i dynamiczne strategie, potencjalnie wykorzystując informacje i algorytmy, o których deweloper nawet nie pomyślał.

## Narzędzia {#tools}

W tym samouczku wykorzystano język [Python](https://www.python.org/), [bibliotekę Web3](https://web3py.readthedocs.io/en/stable/) oraz [Uniswap v3](https://github.com/Uniswap/v3-periphery) do wycen i tradingu.

### Dlaczego Python? {#python}

Najczęściej używanym językiem w AI jest [Python](https://www.python.org/), dlatego używamy go tutaj. Nie martw się, jeśli nie znasz Pythona. Język ten jest bardzo przejrzysty, a ja dokładnie wyjaśnię, co robi.

[Biblioteka Web3](https://web3py.readthedocs.io/en/stable/) to najpopularniejsze API Ethereum dla Pythona. Jest dość łatwa w użyciu.

### Trading na blockchainie {#trading-on-blockchain}

Istnieje [wiele zdecentralizowanych giełd (DEX)](/apps/categories/defi/), które pozwalają na wymianę tokenów na Ethereum. Zazwyczaj mają one jednak podobne kursy wymiany ze względu na [arbitraż](/developers/docs/smart-contracts/composability/#better-user-experience).

[Uniswap](https://app.uniswap.org/) to powszechnie używany DEX, którego możemy użyć zarówno do wycen (aby zobaczyć względne wartości tokenów), jak i do transakcji.

### OpenAI {#openai}

Jako duży model językowy na początek wybrałem [OpenAI](https://openai.com/). Aby uruchomić aplikację z tego samouczka, będziesz musiał zapłacić za dostęp do API. Minimalna wpłata w wysokości 5 USD jest więcej niż wystarczająca.

## Rozwój krok po kroku {#step-by-step}

Aby uprościć rozwój, będziemy postępować etapami. Każdy krok to gałąź na GitHubie.

### Zaczynamy {#getting-started}

Oto kroki, aby zacząć w systemach UNIX lub Linux (w tym [WSL](https://learn.microsoft.com/en-us/windows/wsl/install))

1. Jeśli jeszcze go nie masz, pobierz i zainstaluj [Python](https://www.python.org/downloads/).

2. Sklonuj repozytorium GitHub.

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. Zainstaluj [`uv`](https://docs.astral.sh/uv/getting-started/installation/). Polecenie w Twoim systemie może się różnić.

   ```sh
   pipx install uv
   ```

4. Pobierz biblioteki.

   ```sh
   uv sync
   ```

5. Aktywuj środowisko wirtualne.

   ```sh
   source .venv/bin/activate
   ```

6. Aby sprawdzić, czy Python i Web3 działają poprawnie, uruchom `python3` i podaj mu ten program. Możesz go wpisać w wierszu poleceń `>>>`; nie ma potrzeby tworzenia pliku.

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### Odczyt z blockchaina {#read-blockchain}

Kolejnym krokiem jest odczyt z blockchaina. Aby to zrobić, musisz zmienić gałąź na `02-read-quote`, a następnie użyć `uv` do uruchomienia programu.

```sh
git checkout 02-read-quote
uv run agent.py
```

Powinieneś otrzymać listę obiektów `Quote`, z których każdy zawiera znacznik czasu, cenę i aktywo (obecnie zawsze `WETH/USDC`).

Oto wyjaśnienie linijka po linijce.

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

Importujemy potrzebne biblioteki. Zostały one wyjaśnione poniżej w miejscach ich użycia.

```python
print = functools.partial(print, flush=True)
```

Zastępuje `print` w Pythonie wersją, która zawsze natychmiast opróżnia bufor wyjściowy. Jest to przydatne w długo działającym skrypcie, ponieważ nie chcemy czekać na aktualizacje statusu ani dane wyjściowe debugowania.

```python
MAINNET_URL = "https://eth.drpc.org"
```

Adres URL umożliwiający dostęp do sieci głównej (Mainnet). Możesz go uzyskać z [węzła jako usługi (Node as a service)](/developers/docs/nodes-and-clients/nodes-as-a-service/) lub użyć jednego z tych reklamowanych na [Chainlist](https://chainlist.org/chain/1).

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

Blok w sieci głównej Ethereum pojawia się zazwyczaj co dwanaście sekund, więc jest to liczba bloków, jakiej spodziewalibyśmy się w danym okresie. Zauważ, że nie jest to dokładna liczba. Kiedy [proponujący blok](/developers/docs/consensus-mechanisms/pos/block-proposal/) jest niedostępny, ten blok jest pomijany, a czas do następnego bloku wynosi 24 sekundy. Gdybyśmy chcieli uzyskać dokładny blok dla danego znacznika czasu, użylibyśmy [wyszukiwania binarnego](https://en.wikipedia.org/wiki/Binary_search). Jednak do naszych celów jest to wystarczająco bliskie. Przewidywanie przyszłości nie jest nauką ścisłą.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

Rozmiar cyklu. Przeglądamy wyceny raz na cykl i próbujemy oszacować wartość na koniec następnego cyklu.

```python
# Adres puli, którą odczytujemy
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

Wartości wycen są pobierane z puli Uniswap 3 USDC/WETH pod adresem [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract). Ten adres jest już w formie sumy kontrolnej, ale lepiej jest użyć [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address), aby kod był wielokrotnego użytku.

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

Są to [ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) dla dwóch kontraktów, z którymi musimy się połączyć. Aby kod był zwięzły, dołączamy tylko te funkcje, które musimy wywołać.

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

Inicjujemy bibliotekę [`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) i łączymy się z węzłem Ethereum.

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

To jeden ze sposobów na utworzenie klasy danych (data class) w Pythonie. Typ danych [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) służy do łączenia się z kontraktem. Zwróć uwagę na `(frozen=True)`. W Pythonie [wartości logiczne (booleans)](https://en.wikipedia.org/wiki/Boolean_data_type) są definiowane jako `True` lub `False`, pisane wielką literą. Ta klasa danych jest `frozen`, co oznacza, że jej pola nie mogą być modyfikowane.

Zwróć uwagę na wcięcia. W przeciwieństwie do [języków wywodzących się z C](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages), Python używa wcięć do oznaczania bloków. Interpreter Pythona wie, że poniższa definicja nie jest częścią tej klasy danych, ponieważ nie zaczyna się od tego samego wcięcia co pola klasy danych.

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

Typ [`Decimal`](https://docs.python.org/3/library/decimal.html) służy do dokładnej obsługi ułamków dziesiętnych.

```python
    def get_price(self, block: int) -> Decimal:
```

W ten sposób definiuje się funkcję w Pythonie. Definicja ma wcięcie, aby pokazać, że nadal jest częścią `PoolInfo`.

W funkcji będącej częścią klasy danych pierwszym parametrem jest zawsze `self`, czyli instancja klasy danych, która została tu wywołana. Tutaj znajduje się jeszcze jeden parametr, numer bloku.

```python
        assert block <= w3.eth.block_number, "Block is in the future"
```

Gdybyśmy potrafili czytać przyszłość, nie potrzebowalibyśmy AI do tradingu.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

Składnia wywoływania funkcji na EVM z Web3 wygląda tak: `<contract object>.functions.<function name>().call(<parameters>)`. Parametrami mogą być parametry funkcji EVM (jeśli istnieją; tutaj ich nie ma) lub [parametry nazwane](https://en.wikipedia.org/wiki/Named_parameter) do modyfikowania zachowania blockchaina. Tutaj używamy jednego, `block_identifier`, aby określić [numer bloku](/developers/docs/apis/json-rpc/#default-block), w którym chcemy uruchomić funkcję.

Wynikiem jest [ta struktura w formie tablicy](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72). Pierwsza wartość jest funkcją kursu wymiany między dwoma tokenami.

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

Aby zmniejszyć liczbę obliczeń onchain, Uniswap v3 nie przechowuje rzeczywistego współczynnika wymiany, ale raczej jego pierwiastek kwadratowy. Ponieważ EVM nie obsługuje matematyki zmiennoprzecinkowej ani ułamków, zamiast rzeczywistej wartości odpowiedź to <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5;</mo><msup><mn>2</mn><mn>96</mn></msup></math>

```python
         # (token1 na token0)
        return 1/(raw_price * self.decimal_factor)
```

Surowa cena, którą otrzymujemy, to liczba `token0`, którą dostajemy za każdy `token1`. W naszej puli `token0` to USDC (stablecoin o tej samej wartości co dolar amerykański), a `token1` to [WETH](https://opensea.io/learn/blockchain/what-is-weth). Wartość, której tak naprawdę szukamy, to liczba dolarów za WETH, a nie odwrotnie.

Współczynnik dziesiętny to stosunek między [współczynnikami dziesiętnymi](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) dla obu tokenów.

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

Ta klasa danych reprezentuje wycenę: cenę określonego aktywa w danym momencie. W tym momencie pole `asset` jest nieistotne, ponieważ używamy pojedynczej puli i dlatego mamy jedno aktywo. Jednak później dodamy więcej aktywów.

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

Ta funkcja przyjmuje adres i zwraca informacje o kontrakcie tokena pod tym adresem. Aby utworzyć nowy [`Contract` w Web3](https://web3py.readthedocs.io/en/stable/web3.contract.html), podajemy adres i ABI do `w3.eth.contract`.

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

Ta funkcja zwraca wszystko, czego potrzebujemy na temat [konkretnej puli](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol). Składnia `f"<string>"` to [sformatowany ciąg znaków (f-string)](https://docs.python.org/3/reference/lexical_analysis.html#f-strings).

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

Pobiera obiekt `Quote`. Domyślną wartością dla `block_number` jest `None` (brak wartości).

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

Jeśli numer bloku nie został określony, używa `w3.eth.block_number`, co oznacza najnowszy numer bloku. Jest to składnia dla [instrukcji `if`](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement).

Mogłoby się wydawać, że lepiej byłoby po prostu ustawić wartość domyślną na `w3.eth.block_number`, ale to nie działa dobrze, ponieważ byłby to numer bloku w momencie definiowania funkcji. W długo działającym agencie stanowiłoby to problem.

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

Używa [biblioteki `datetime`](https://docs.python.org/3/library/datetime.html), aby sformatować to do formatu czytelnego dla ludzi i dużych modeli językowych (LLM). Używa [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize), aby zaokrąglić wartość do dwóch miejsc po przecinku.

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

W Pythonie definiuje się [listę](https://docs.python.org/3/library/stdtypes.html#typesseq-list), która może zawierać tylko określony typ, używając `list[<type>]`.

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

W Pythonie [pętla `for`](https://docs.python.org/3/tutorial/controlflow.html#for-statements) zazwyczaj iteruje po liście. Lista numerów bloków, w których należy znaleźć wyceny, pochodzi z [`range`](https://docs.python.org/3/library/stdtypes.html#range).

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

Dla każdego numeru bloku pobiera obiekt `Quote` i dołącza go do listy `quotes`. Następnie zwraca tę listę.

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

To jest główny kod skryptu. Odczytuje informacje o puli, pobiera dwanaście wycen i [`pprint` je (wypisuje)](https://docs.python.org/3/library/pprint.html#pprint.pprint).

### Tworzenie promptu {#prompt}

Następnie musimy przekonwertować tę listę wycen na prompt dla LLM i uzyskać oczekiwaną przyszłą wartość.

```sh
git checkout 03-create-prompt
uv run agent.py
```

Wynikiem będzie teraz prompt do LLM, podobny do:

```
Biorąc pod uwagę te wyceny:
Aktywo: WETH/USDC
        2026-01-20T16:34 3016.21
        .
        .
        .
        2026-02-01T17:49 2299.10

Aktywo: WBTC/WETH
        2026-01-20T16:34 29.84
        .
        .
        .
        2026-02-01T17:50 33.46


Jakiej wartości WETH/USDC spodziewasz się w czasie 2026-02-02T17:56?

Podaj odpowiedź jako pojedynczą liczbę zaokrągloną do dwóch miejsc po przecinku,
bez żadnego innego tekstu.
```

Zauważ, że są tu wyceny dla dwóch aktywów, `WETH/USDC` i `WBTC/WETH`. Dodanie wycen z innego aktywa może poprawić dokładność przewidywań.

#### Jak wygląda prompt {#prompt-explanation}

Ten prompt zawiera trzy sekcje, które są dość powszechne w promptach dla LLM.

1. Informacje. Modele LLM mają wiele informacji ze swojego treningu, ale zazwyczaj nie mają tych najnowszych. Z tego powodu musimy tutaj pobrać najnowsze wyceny. Dodawanie informacji do promptu nazywa się [generowaniem rozszerzonym o wyszukiwanie (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation).

2. Właściwe pytanie. To jest to, co chcemy wiedzieć.

3. Instrukcje formatowania wyjścia. Zazwyczaj LLM poda nam szacunek wraz z wyjaśnieniem, jak do niego doszedł. Jest to lepsze dla ludzi, ale program komputerowy potrzebuje tylko ostatecznego wyniku.

#### Wyjaśnienie kodu {#prompt-code}

Oto nowy kod.

```python
from datetime import datetime, timezone, timedelta
```

Musimy podać LLM czas, dla którego chcemy uzyskać szacunek. Aby uzyskać czas „n minut/godzin/dni” w przyszłości, używamy [klasy `timedelta`](https://docs.python.org/3/library/datetime.html#datetime.timedelta).

```python
# Adresy pul, które odczytujemy
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

Mamy dwie pule, które musimy odczytać.

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
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (token1 na token0)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

W puli WETH/USDC chcemy wiedzieć, ile `token0` (USDC) potrzebujemy, aby kupić jeden `token1` (WETH). W puli WETH/WBTC chcemy wiedzieć, ile `token1` (WETH) potrzebujemy, aby kupić jeden `token0` (WBTC, czyli opakowany Bitcoin). Musimy śledzić, czy stosunek puli musi zostać odwrócony.

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

Aby wiedzieć, czy pula musi zostać odwrócona, przekazujemy to jako wejście do `read_pool`. Ponadto symbol aktywa musi być poprawnie ustawiony.

Składnia `<a> if <b> else <c>` to pythonowy odpowiednik [trójargumentowego operatora warunkowego](https://en.wikipedia.org/wiki/Ternary_conditional_operator), który w języku wywodzącym się z C wyglądałby tak: `<b> ? <a> : <c>`.

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

Ta funkcja buduje ciąg znaków, który formatuje listę obiektów `Quote`, zakładając, że wszystkie dotyczą tego samego aktywa.

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

W Pythonie [wieloliniowe literały łańcuchowe](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) są zapisywane jako `"""` .... `"""`.

```python
Given these quotes:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

Tutaj używamy wzorca [MapReduce](https://en.wikipedia.org/wiki/MapReduce), aby wygenerować ciąg znaków dla każdej listy wycen za pomocą `format_quotes`, a następnie zredukować je do pojedynczego ciągu znaków do użycia w prompcie.

```python
What would you expect the value for {asset} to be at time {expected_time}?

Provide your answer as a single number rounded to two decimal places,
without any other text.
    """
```

Reszta promptu jest zgodna z oczekiwaniami.

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

Przegląda dwie pule i pobiera wyceny z obu.

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

Określa przyszły punkt w czasie, dla którego chcemy uzyskać szacunek, i tworzy prompt.

### Komunikacja z LLM {#interface-llm}

Następnie wysyłamy prompt do rzeczywistego LLM i otrzymujemy oczekiwaną przyszłą wartość. Napisałem ten program używając OpenAI, więc jeśli chcesz użyć innego dostawcy, będziesz musiał go dostosować.

1. Załóż [konto OpenAI](https://auth.openai.com/create-account)
2. [Zasil konto](https://platform.openai.com/settings/organization/billing/overview) — minimalna kwota w momencie pisania tego tekstu to 5 USD
3. [Utwórz klucz API](https://platform.openai.com/settings/organization/api-keys)
4. W wierszu poleceń wyeksportuj klucz API, aby Twój program mógł z niego korzystać

   ```sh
   export OPENAI_API_KEY=sk-<the rest of the key goes here>
   ```

5. Pobierz (checkout) i uruchom agenta

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

Oto nowy kod.

```python
from openai import OpenAI

open_ai = OpenAI()  # Klient odczytuje zmienną środowiskową OPENAI_API_KEY
```

Importuje i tworzy instancję API OpenAI.

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

Wywołuje API OpenAI (`open_ai.chat.completions.create`), aby utworzyć odpowiedź.

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

Wypisuje cenę i podaje rekomendację kupna lub sprzedaży.

#### Testowanie przewidywań {#testing-the-predictions}

Teraz, gdy potrafimy generować przewidywania, możemy również użyć danych historycznych, aby ocenić, czy tworzymy użyteczne prognozy.

```sh
uv run test-predictor.py
```

Oczekiwany wynik jest podobny do:

```
Przewidywanie dla 2026-01-05T19:50: przewidywana 3138.93 USD, rzeczywista 3218.92 USD, błąd 79.99 USD
Przewidywanie dla 2026-01-06T19:56: przewidywana 3243.39 USD, rzeczywista 3221.08 USD, błąd 22.31 USD
Przewidywanie dla 2026-01-07T20:02: przewidywana 3223.24 USD, rzeczywista 3146.89 USD, błąd 76.35 USD
Przewidywanie dla 2026-01-08T20:11: przewidywana 3150.47 USD, rzeczywista 3092.04 USD, błąd 58.43 USD
.
.
.
Przewidywanie dla 2026-01-31T22:33: przewidywana 2637.73 USD, rzeczywista 2417.77 USD, błąd 219.96 USD
Przewidywanie dla 2026-02-01T22:41: przewidywana 2381.70 USD, rzeczywista 2318.84 USD, błąd 62.86 USD
Przewidywanie dla 2026-02-02T22:49: przewidywana 2234.91 USD, rzeczywista 2349.28 USD, błąd 114.37 USD
Średni błąd przewidywania dla 29 prognoz: 83.87103448275862068965517241 USD
Średnia zmiana na rekomendację: 4.787931034482758620689655172 USD
Wariancja standardowa zmian: 104.42 USD
Zyskowne dni: 51.72%
Stratne dni: 48.28%
```

Większość testera jest identyczna z agentem, ale oto części, które są nowe lub zmodyfikowane.

```python
CYCLES_FOR_TEST = 40 # Dla testu historycznego, przez ile cykli testujemy

# Pobierz wiele kwotowań
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

Patrzymy `CYCLES_FOR_TEST` (tutaj określone jako 40) dni wstecz.

```python
# Utwórz prognozy i porównaj je z rzeczywistą historią

total_error = Decimal(0)
changes = []
```

Interesują nas dwa rodzaje błędów. Pierwszy, `total_error`, to po prostu suma błędów popełnionych przez predyktor.

Aby zrozumieć drugi, `changes`, musimy pamiętać o celu agenta. Nie jest nim przewidywanie stosunku WETH/USDC (ceny ETH). Jego celem jest wydawanie rekomendacji sprzedaży i kupna. Jeśli cena wynosi obecnie 2000 USD, a on przewiduje 2010 USD na jutro, nie przeszkadza nam, jeśli rzeczywisty wynik wyniesie 2020 USD i zarobimy dodatkowe pieniądze. Ale _przeszkadza_ nam, jeśli przewidział 2010 USD i kupił ETH na podstawie tej rekomendacji, a cena spadnie do 1990 USD.

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

Możemy patrzeć tylko na przypadki, w których dostępna jest pełna historia (wartości użyte do przewidywania i rzeczywista wartość do porównania). Oznacza to, że najnowszy przypadek musi być tym, który rozpoczął się `CYCLES_BACK` temu.

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

Używa [wycinków (slices)](https://www.w3schools.com/python/ref_func_slice.asp), aby uzyskać taką samą liczbę próbek, jakiej używa agent. Kod między tym miejscem a następnym segmentem to ten sam kod pobierania przewidywań, który mamy w agencie.

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

Pobiera przewidywaną cenę, rzeczywistą cenę i cenę w momencie przewidywania. Potrzebujemy ceny w momencie przewidywania, aby określić, czy rekomendacja dotyczyła kupna, czy sprzedaży.

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Prediction for {prediction_time}: predicted {predicted_price} USD, real {real_price} USD, error {error} USD")
```

Oblicza błąd i dodaje go do sumy.

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

Dla `changes` chcemy poznać wpływ finansowy kupna lub sprzedaży jednego ETH. Najpierw musimy więc określić rekomendację, a następnie ocenić, jak zmieniła się rzeczywista cena i czy rekomendacja przyniosła zysk (zmiana dodatnia), czy stratę (zmiana ujemna).

```python
print (f"Mean prediction error over {len(wethusdc_quotes)-CYCLES_BACK} predictions: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Mean change per recommendation: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Standard variance of changes: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

Raportuje wyniki.

```python
print (f"Profitable days: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Losing days: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

Używa [`filter`](https://www.w3schools.com/python/ref_func_filter.asp), aby policzyć liczbę zyskownych i stratnych dni. Wynikiem jest obiekt filtra, który musimy przekonwertować na listę, aby uzyskać jego długość.

### Wysyłanie transakcji {#submit-txn}

Teraz musimy faktycznie wysyłać transakcje. Nie chcę jednak na tym etapie wydawać prawdziwych pieniędzy, zanim system nie zostanie sprawdzony. Zamiast tego utworzymy lokalne rozwidlenie sieci głównej i będziemy „handlować” w tej sieci.

Oto kroki, aby utworzyć lokalne rozwidlenie i umożliwić trading.

1. Zainstaluj [Foundry](https://getfoundry.sh/introduction/installation)

2. Uruchom [`anvil`](https://getfoundry.sh/anvil/overview)

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` nasłuchuje na domyślnym adresie URL dla Foundry, http://localhost:8545, więc nie musimy określać adresu URL dla [polecenia `cast`](https://getfoundry.sh/cast/overview), którego używamy do manipulowania blockchainem.

3. Podczas działania w `anvil` dostępnych jest dziesięć kont testowych, które posiadają ETH — ustaw zmienne środowiskowe dla pierwszego z nich

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. To są kontrakty, których musimy użyć. [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) to kontrakt Uniswap v3, którego używamy do faktycznego tradingu. Moglibyśmy handlować bezpośrednio przez pulę, ale to jest znacznie łatwiejsze.

   Dwie dolne zmienne to ścieżki Uniswap v3 wymagane do wymiany między WETH a USDC.

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. Każde z kont testowych ma 10 000 ETH. Użyj kontraktu WETH, aby opakować 1000 ETH i uzyskać 1000 WETH do tradingu.

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. Użyj `SwapRouter`, aby wymienić 500 WETH na USDC.

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   Wywołanie `approve` tworzy limit wydatków, który pozwala `SwapRouter` na wydanie części naszych tokenów. Kontrakty nie mogą monitorować zdarzeń, więc gdybyśmy przetransferowali tokeny bezpośrednio do kontraktu `SwapRouter`, nie wiedziałby on, że otrzymał zapłatę. Zamiast tego pozwalamy kontraktowi `SwapRouter` na wydanie określonej kwoty, a następnie `SwapRouter` to robi. Odbywa się to poprzez funkcję wywoływaną przez `SwapRouter`, dzięki czemu wie on, czy operacja się powiodła.

7. Sprawdź, czy masz wystarczająco dużo obu tokenów.

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

Teraz, gdy mamy WETH i USDC, możemy faktycznie uruchomić agenta.

```sh
git checkout 05-trade
uv run agent.py
```

Wynik będzie wyglądał podobnie do:

```
(ai-trading-agent) qbzzt@Ori-Cloudnomics:~/260215-ai-agent$ uv run agent.py
Obecna cena: 1843.16
W 2026-02-06T23:07, oczekiwana cena: 1724.41 USD
Salda konta przed transakcją:
Saldo USDC: 927301.578272
Saldo WETH: 500
Sprzedaj, spodziewam się, że cena spadnie o 118.75 USD
Transakcja zatwierdzenia wysłana: 74e367ddbb407c1aaf567d87aa5863049991b1d2aa092b6b85195d925e2bd41f
Transakcja zatwierdzenia wydobyta.
Transakcja sprzedaży wysłana: fad1bcf938585c9e90364b26ac7a80eea9efd34c37e5db81e58d7655bcae28bf
Transakcja sprzedaży wydobyta.
Salda konta po transakcji:
Saldo USDC: 929143.797116
Saldo WETH: 499
```

Aby faktycznie z niego korzystać, potrzebujesz kilku drobnych zmian.

- W linii 14 zmień `MAINNET_URL` na rzeczywisty punkt dostępu, taki jak `https://eth.drpc.org`
- W linii 28 zmień `PRIVATE_KEY` na swój własny klucz prywatny
- O ile nie jesteś bardzo bogaty i nie możesz kupować lub sprzedawać 1 ETH każdego dnia dla niesprawdzonego agenta, możesz chcieć zmienić linię 29, aby zmniejszyć `WETH_TRADE_AMOUNT`

#### Wyjaśnienie kodu {#trading-code}

Oto nowy kod.

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

Te same zmienne, których użyliśmy w kroku 4.

```python
WETH_TRADE_AMOUNT=1
```

Kwota do handlu.

```python
ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... },
    { "name": "balanceOf", ...},
    { "name": "approve", ...}
]
```

Aby faktycznie handlować, potrzebujemy funkcji `approve`. Chcemy również pokazać salda przed i po, więc potrzebujemy również `balanceOf`.

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

W ABI `SwapRouter` potrzebujemy tylko `exactInput`. Istnieje powiązana funkcja, `exactOutput`, której moglibyśmy użyć do kupienia dokładnie jednego WETH, ale dla uproszczenia w obu przypadkach używamy po prostu `exactInput`.

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

Definicje Web3 dla [`account`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) i kontraktu `SwapRouter`.

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

Parametry transakcji. Potrzebujemy tutaj funkcji, ponieważ [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) musi się zmieniać za każdym razem.

```python
def approve_token(contract: Contract, amount: int):
```

Zatwierdza limit wydatków tokenów dla `SwapRouter`.

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

W ten sposób wysyłamy transakcję w Web3. Najpierw używamy [obiektu `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) do zbudowania transakcji. Następnie używamy [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) do podpisania transakcji, używając `PRIVATE_KEY`. Na koniec używamy [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) do wysłania transakcji.

```python
    print(f"Approve transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Approve transaction mined.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) czeka, aż transakcja zostanie wydobyta. W razie potrzeby zwraca pokwitowanie.

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

To są parametry podczas sprzedaży WETH.

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

W przeciwieństwie do `SELL_PARAMS`, parametry kupna mogą się zmieniać. Kwota wejściowa to koszt 1 WETH, dostępny w `quote`.

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

Funkcje `buy()` i `sell()` są niemal identyczne. Najpierw zatwierdzamy wystarczający limit wydatków dla `SwapRouter`, a następnie wywołujemy go z odpowiednią ścieżką i kwotą.

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

Raportuje salda użytkownika w obu walutach.

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

Ten agent obecnie działa tylko raz. Możesz jednak zmienić go tak, aby działał w sposób ciągły, uruchamiając go z [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) lub opakowując linie 368-400 w pętlę i używając [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep), aby poczekać, aż nadejdzie czas na następny cykl.

## Możliwe ulepszenia {#improvements}

To nie jest pełna wersja produkcyjna; to jedynie przykład mający na celu nauczenie podstaw. Oto kilka pomysłów na ulepszenia.

### Inteligentniejszy trading {#smart-trading}

Istnieją dwa ważne fakty, które agent ignoruje przy podejmowaniu decyzji, co robić.

- _Wielkość przewidywanej zmiany_. Agent sprzedaje stałą kwotę `WETH`, jeśli oczekuje się spadku ceny, niezależnie od wielkości tego spadku.
  Prawdopodobnie lepiej byłoby ignorować drobne zmiany i sprzedawać w oparciu o to, jak dużego spadku ceny się spodziewamy.
- _Obecne portfolio_. Jeśli 10% Twojego portfolio jest w WETH i uważasz, że cena wzrośnie, prawdopodobnie ma sens kupienie więcej. Ale jeśli 90% Twojego portfolio jest w WETH, możesz być wystarczająco wyeksponowany i nie ma potrzeby kupowania więcej. Odwrotna sytuacja ma miejsce, jeśli spodziewasz się spadku ceny.

### Co jeśli chcesz utrzymać swoją strategię w tajemnicy? {#secret}

Dostawcy AI mogą zobaczyć zapytania, które wysyłasz do ich LLM, co mogłoby ujawnić genialny system tradingowy, który opracowałeś ze swoim agentem. System tradingowy, z którego korzysta zbyt wiele osób, jest bezwartościowy, ponieważ zbyt wiele osób próbuje kupować, kiedy Ty chcesz kupić (i cena rośnie), oraz próbuje sprzedawać, kiedy Ty chcesz sprzedać (i cena spada).

Możesz uruchomić LLM lokalnie, na przykład używając [LM-Studio](https://lmstudio.ai/), aby uniknąć tego problemu.

### Od bota AI do agenta AI {#bot-to-agent}

Można śmiało argumentować, że jest to [bot AI, a nie agent AI](/ai-agents/#ai-agents-vs-ai-bots). Implementuje on stosunkowo prostą strategię, która opiera się na predefiniowanych informacjach. Możemy umożliwić samodoskonalenie, na przykład dostarczając listę pul Uniswap v3 i ich najnowsze wartości oraz pytając, która kombinacja ma najlepszą wartość predykcyjną.

### Ochrona przed poślizgiem cenowym {#slippage-protection}

Obecnie nie ma [ochrony przed poślizgiem cenowym](https://uniswapv3book.com/milestone_3/slippage-protection.html). Jeśli obecna wycena wynosi 2000 USD, a oczekiwana cena to 2100 USD, agent dokona zakupu. Jeśli jednak przed zakupem przez agenta koszt wzrośnie do 2200 USD, kupowanie nie ma już sensu.

Aby zaimplementować ochronę przed poślizgiem cenowym, określ wartość `amountOutMinimum` w liniach 325 i 334 w [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325).

## Podsumowanie {#conclusion}

Miejmy nadzieję, że teraz wiesz wystarczająco dużo, aby zacząć pracę z agentami AI. Nie jest to kompleksowy przegląd tematu; poświęcono temu całe książki, ale to wystarczy, aby zacząć. Powodzenia!

[Zobacz tutaj więcej moich prac](https://cryptodocguy.pro/).