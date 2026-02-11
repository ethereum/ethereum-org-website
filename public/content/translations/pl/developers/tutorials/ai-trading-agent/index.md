---
title: "Stwórz własnego agenta handlowego AI na Ethereum"
description: "W tym samouczku dowiesz się, jak stworzyć prostego agenta handlowego AI. Agent ten odczytuje informacje z blockchaina, prosi LLM o rekomendację na podstawie tych informacji, wykonuje transakcję zalecaną przez LLM, a następnie czeka i powtarza proces."
author: Ori Pomerantz
tags: [ "AI", "handel", "agent", "python" ]
skill: intermediate
published: 2026-02-13
lang: pl
sidebarDepth: 3
---

W tym samouczku dowiesz się, jak zbudować prostego agenta handlowego AI. Agent ten działa w oparciu o następujące kroki:

1. Odczytanie bieżących i przeszłych cen tokena, a także innych potencjalnie istotnych informacji
2. Zbudowanie zapytania z tymi informacjami, wraz z informacjami ogólnymi, aby wyjaśnić, w jaki sposób mogą być one istotne
3. Przesłanie zapytania i otrzymanie prognozowanej ceny
4. Handel w oparciu o rekomendację
5. Oczekiwanie i powtórzenie

Ten agent pokazuje, jak odczytywać informacje, przekształcać je w zapytanie, które daje użyteczną odpowiedź i jak z tej odpowiedzi korzystać. Wszystkie te kroki są wymagane w przypadku agenta AI. Agent ten jest zaimplementowany w Pythonie, ponieważ jest to najpopularniejszy język używany w AI.

## Po co to robić? {#why-do-this}

Zautomatyzowani agenci handlowi pozwalają deweloperom wybierać i realizować strategię handlową. [Agenci AI](/ai-agents) pozwalają na bardziej złożone i dynamiczne strategie handlowe, potencjalnie wykorzystując informacje i algorytmy, których użycia deweloper nawet nie brał pod uwagę.

## Narzędzia {#tools}

W tym samouczku wykorzystano [Python](https://www.python.org/), [bibliotekę Web3](https://web3py.readthedocs.io/en/stable/) oraz [Uniswap v3](https://github.com/Uniswap/v3-periphery) do notowań i handlu.

### Dlaczego Python? {#python}

Najczęściej używanym językiem w dziedzinie AI jest [Python](https://www.python.org/), więc używamy go tutaj. Nie martw się, jeśli nie znasz Pythona. Język jest bardzo przejrzysty, a ja dokładnie wyjaśnię, co robi.

[Biblioteka Web3](https://web3py.readthedocs.io/en/stable/) jest najpopularniejszym API Pythona dla Ethereum. Jest dość łatwa w użyciu.

### Handel na blockchainie {#trading-on-blockchain}

Istnieje [wiele zdecentralizowanych giełd (DEX)](/apps/categories/defi/), które pozwalają na handel tokenami na Ethereum. Jednakże, ze względu na [arbitraż](/developers/docs/smart-contracts/composability/#better-user-experience), mają one zazwyczaj podobne kursy wymiany.

[Uniswap](https://app.uniswap.org/) to powszechnie używana giełda DEX, której możemy używać zarówno do notowań (w celu sprawdzenia względnych wartości tokenów), jak i transakcji.

### OpenAI {#openai}

Jeśli chodzi o duży model językowy, zdecydowałem się zacząć od [OpenAI](https://openai.com/). Aby uruchomić aplikację z tego samouczka, trzeba będzie zapłacić za dostęp do API. Minimalna opłata w wysokości 5 USD jest więcej niż wystarczająca.

## Programowanie, krok po kroku {#step-by-step}

Aby uprościć programowanie, postępujemy etapami. Każdy krok to gałąź w GitHub.

### Pierwsze kroki {#getting-started}

Oto kroki, aby rozpocząć pracę w systemie UNIX lub Linux (w tym [WSL](https://learn.microsoft.com/en-us/windows/wsl/install))

1. Jeśli jeszcze go nie masz, pobierz i zainstaluj [Pythona](https://www.python.org/downloads/).

2. Sklonuj repozytorium GitHub.

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. Zainstaluj [`uv`](https://docs.astral.sh/uv/getting-started/installation/). Polecenie w twoim systemie może być inne.

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

6. Aby sprawdzić, czy Python i Web3 działają poprawnie, uruchom `python3` i podaj mu ten program. Można go wpisać w wierszu poleceń `>>>`; nie ma potrzeby tworzenia pliku.

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### Odczyt z blockchaina {#read-blockchain}

Następnym krokiem jest odczyt z blockchaina. Aby to zrobić, należy przełączyć się na gałąź `02-read-quote`, a następnie użyć `uv` do uruchomienia programu.

```sh
git checkout 02-read-quote
uv run agent.py
```

Powinna zostać wyświetlona lista obiektów `Quote`, z których każdy ma znacznik czasu, cenę i aktywo (obecnie zawsze `WETH/USDC`).

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

Zaimportuj biblioteki, których potrzebujemy. Są one wyjaśnione poniżej, gdy są używane.

```python
print = functools.partial(print, flush=True)
```

Zastępuje funkcję `print` Pythona wersją, która zawsze natychmiast opróżnia bufor wyjścia. Jest to przydatne w długo działającym skrypcie, ponieważ nie chcemy czekać na aktualizacje statusu lub dane wyjściowe debugowania.

```python
MAINNET_URL = "https://eth.drpc.org"
```

Adres URL do sieci głównej. Możesz uzyskać go z [węzła jako usługa](/developers/docs/nodes-and-clients/nodes-as-a-service/) lub użyć jednego z tych reklamowanych w [Chainlist](https://chainlist.org/chain/1).

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

Blok w sieci głównej Ethereum pojawia się zazwyczaj co dwanaście sekund, więc są to liczby bloków, których spodziewamy się w danym okresie. Należy pamiętać, że nie jest to dokładna liczba. Gdy [proposer bloku](/developers/docs/consensus-mechanisms/pos/block-proposal/) nie działa, ten blok jest pomijany, a czas do następnego bloku wynosi 24 sekundy. Gdybyśmy chcieli uzyskać dokładny blok dla znacznika czasu, użylibyśmy [wyszukiwania binarnego](https://en.wikipedia.org/wiki/Binary_search). Jednak na nasze potrzeby jest to wystarczająco dokładne. Przewidywanie przyszłości nie jest nauką ścisłą.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

Rozmiar cyklu. Przeglądamy notowania raz na cykl i próbujemy oszacować wartość na koniec następnego cyklu.

```python
# Adres puli, z której odczytujemy
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

Wartości notowań są pobierane z puli Uniswap 3 USDC/WETH pod adresem [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract). Ten adres jest już w formie sumy kontrolnej, ale lepiej jest użyć [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address), aby kod był wielokrotnego użytku.

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

Są to [ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) dla dwóch kontraktów, z którymi musimy się skontaktować. Aby kod był zwięzły, dołączamy tylko te funkcje, które musimy wywołać.

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

Zainicjuj bibliotekę [`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) i połącz się z węzłem Ethereum.

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

Jest to jeden ze sposobów tworzenia klasy danych w Pythonie. Typ danych [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) jest używany do łączenia się z kontraktem. Zwróć uwagę na `(frozen=True)`. W Pythonie wartości [logiczne](https://en.wikipedia.org/wiki/Boolean_data_type) są zdefiniowane jako `True` lub `False`, pisane wielką literą. Ta klasa danych jest `frozen`, co oznacza, że jej pól nie można modyfikować.

Zwróć uwagę na wcięcie. W przeciwieństwie do [języków wywodzących się z C](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages), Python używa wcięć do oznaczania bloków. Interpreter Pythona wie, że poniższa definicja nie jest częścią tej klasy danych, ponieważ nie zaczyna się na tym samym poziomie wcięcia, co pola klasy danych.

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

W ten sposób definiuje się funkcję w Pythonie. Definicja jest wcięta, aby pokazać, że nadal jest częścią `PoolInfo`.

W funkcji, która jest częścią klasy danych, pierwszym parametrem jest zawsze `self`, czyli instancja klasy danych, która została tutaj wywołana. Jest tu jeszcze jeden parametr, numer bloku.

```python
        assert block <= w3.eth.block_number, "Block is in the future"
```

Gdybyśmy potrafili czytać przyszłość, nie potrzebowalibyśmy AI do handlu.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

Składnia wywoływania funkcji na EVM z Web3 jest następująca: `<obiekt kontraktu>.functions.<nazwa funkcji>"().call(<parametry>)`. Parametry mogą być parametrami funkcji EVM (jeśli istnieją; tutaj ich nie ma) lub [parametrami nazwanymi](https://en.wikipedia.org/wiki/Named_parameter) do modyfikowania zachowania blockchaina. Tutaj używamy jednego, `block_identifier`, aby określić [numer bloku](/developers/docs/apis/json-rpc/#default-block), w którym chcemy uruchomić.

Wynikiem jest [ta struktura, w formie tablicy](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72). Pierwsza wartość jest funkcją kursu wymiany między dwoma tokenami.

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

Aby zmniejszyć liczbę obliczeń on-chain, Uniswap v3 nie przechowuje rzeczywistego współczynnika wymiany, a raczej jego pierwiastek kwadratowy. Ponieważ EVM nie obsługuje matematyki zmiennoprzecinkowej ani ułamków, zamiast rzeczywistej wartości, odpowiedzią jest <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5</mo><msup><mn>2</mn><mn>96</mn></msup></math>

```python
         # (token1 na token0)
        return 1/(raw_price * self.decimal_factor)
```

Cena surowa, którą otrzymujemy, to liczba `token0`, którą otrzymujemy za każdy `token1`. W naszej puli `token0` to USDC (stablecoin o tej samej wartości co dolar amerykański), a `token1` to [WETH](https://opensea.io/learn/blockchain/what-is-weth). Wartością, której tak naprawdę potrzebujemy, jest liczba dolarów za WETH, a nie odwrotność.

Współczynnik dziesiętny to stosunek między [współczynnikami dziesiętnymi](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) dla dwóch tokenów.

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

Ta klasa danych reprezentuje notowanie: cenę określonego aktywa w danym momencie. W tym momencie pole `asset` jest nieistotne, ponieważ używamy jednej puli, a zatem mamy jedno aktywo. Jednak później dodamy więcej aktywów.

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

Funkcja ta pobiera adres i zwraca informacje o kontrakcie tokena pod tym adresem. Aby utworzyć nowy [Web3 `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html), podajemy adres i ABI do `w3.eth.contract`.

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

Ta funkcja zwraca wszystko, czego potrzebujemy na temat [określonej puli](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol). Składnia `f"<ciąg znaków>"` to [sformatowany ciąg znaków](https://docs.python.org/3/reference/lexical_analysis.html#f-strings).

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

Pobierz obiekt `Quote`. Domyślna wartość dla `block_number` to `None` (brak wartości).

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

Jeśli numer bloku nie został określony, użyj `w3.eth.block_number`, który jest najnowszym numerem bloku. Jest to składnia dla [instrukcji `if`](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement).

Może się wydawać, że lepiej byłoby po prostu ustawić wartość domyślną na `w3.eth.block_number`, ale to nie działa dobrze, ponieważ byłby to numer bloku w momencie definiowania funkcji. W przypadku długo działającego agenta byłby to problem.

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

Użyj [biblioteki `datetime`](https://docs.python.org/3/library/datetime.html), aby sformatować go do formatu czytelnego dla ludzi i dużych modeli językowych (LLM). Użyj [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize), aby zaokrąglić wartość do dwóch miejsc po przecinku.

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

W Pythonie definiuje się [listę](https://docs.python.org/3/library/stdtypes.html#typesseq-list), która może zawierać tylko określony typ za pomocą `list[<type>]`.

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

W Pythonie pętla [`for`](https://docs.python.org/3/tutorial/controlflow.html#for-statements) zwykle iteruje po liście. Lista numerów bloków do znalezienia notowań pochodzi z [`range`](https://docs.python.org/3/library/stdtypes.html#range).

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

Dla każdego numeru bloku pobierz obiekt `Quote` i dołącz go do listy `quotes`. Następnie zwróć tę listę.

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

To jest główny kod skryptu. Odczytaj informacje o puli, uzyskaj dwanaście notowań i wydrukuj je za pomocą [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint).

### Tworzenie monitu {#prompt}

Następnie musimy przekonwertować tę listę notowań na monit dla LLM i uzyskać oczekiwaną przyszłą wartość.

```sh
git checkout 03-create-prompt
uv run agent.py
```

Dane wyjściowe będą teraz monitem dla LLM, podobnym do:

```
Biorąc pod uwagę te notowania:
Aktywa: WETH/USDC
        2026-01-20T16:34 3016,21
        .
        .
        .
        2026-02-01T17:49 2299,10

Aktywa: WBTC/WETH
        2026-01-20T16:34 29,84
        .
        .
        .
        2026-02-01T17:50 33,46


Jakiej wartości WETH/USDC spodziewałbyś się o godzinie 2026-02-02T17:56?

Podaj odpowiedź jako pojedynczą liczbę zaokrągloną do dwóch miejsc po przecinku,
bez żadnego innego tekstu.
```

Zauważ, że są tu notowania dla dwóch aktywów, `WETH/USDC` i `WBTC/WETH`. Dodanie notowań z innego aktywa może poprawić dokładność prognozy.

#### Jak wygląda monit {#prompt-explanation}

Ten monit zawiera trzy sekcje, które są dość powszechne w monitach LLM.

1. Informacje. Modele LLM mają wiele informacji ze swojego szkolenia, ale zazwyczaj nie mają najnowszych. Z tego powodu musimy pobrać tutaj najnowsze notowania. Dodawanie informacji do monitu nazywa się [generowaniem rozszerzonym o wyszukiwanie (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation).

2. Właściwe pytanie. To jest to, co chcemy wiedzieć.

3. Instrukcje formatowania danych wyjściowych. Zwykle LLM poda nam szacunkową wartość wraz z wyjaśnieniem, w jaki sposób do niej doszedł. Jest to lepsze dla ludzi, ale program komputerowy potrzebuje tylko wyniku końcowego.

#### Wyjaśnienie kodu {#prompt-code}

Oto nowy kod.

```python
from datetime import datetime, timezone, timedelta
```

Musimy podać LLM czas, dla którego chcemy uzyskać oszacowanie. Aby uzyskać czas „n minut/godzin/dni” w przyszłości, używamy [klasy `timedelta`](https://docs.python.org/3/library/datetime.html#datetime.timedelta).

```python
# Adresy pul, z których odczytujemy
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
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (token1 per token0)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

W puli WETH/USDC chcemy wiedzieć, ile `token0` (USDC) potrzebujemy, aby kupić jeden `token1` (WETH). W puli WETH/WBTC chcemy wiedzieć, ile `token1` (WETH) potrzebujemy, aby kupić jeden `token0` (WBTC, czyli opakowany Bitcoin). Musimy śledzić, czy współczynnik puli wymaga odwrócenia.

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

Aby dowiedzieć się, czy pula wymaga odwrócenia, musimy uzyskać te dane wejściowe do `read_pool`. Ponadto symbol aktywa musi być poprawnie skonfigurowany.

Składnia `<a> if <b> else <c>` jest odpowiednikiem w Pythonie [trójargumentowego operatora warunkowego](https://en.wikipedia.org/wiki/Ternary_conditional_operator), który w języku pochodnym C byłby `<b> ? <a> : <c>`.

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

Funkcja ta tworzy ciąg znaków, który formatuje listę obiektów `Quote`, zakładając, że wszystkie dotyczą tego samego aktywa.

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

W Pythonie [wieloliniowe literały ciągów znaków](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) są zapisywane jako `"""` .... `"""`.

```python
Biorąc pod uwagę te notowania:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

W tym miejscu używamy wzorca [MapReduce](https://en.wikipedia.org/wiki/MapReduce) do wygenerowania ciągu znaków dla każdej listy notowań za pomocą `format_quotes`, a następnie redukujemy je do pojedynczego ciągu znaków do użycia w monicie.

```python
Jakiej wartości dla {asset} spodziewałbyś się o godzinie {expected_time}?

Podaj swoją odpowiedź jako pojedynczą liczbę zaokrągloną do dwóch miejsc po przecinku,
bez żadnego innego tekstu.
    """
```

Reszta monitu jest zgodna z oczekiwaniami.

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

Przejrzyj dwie pule i uzyskaj notowania z obu.

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

Określ przyszły punkt czasowy, dla którego chcemy uzyskać oszacowanie i utwórz monit.

### Interfejs z LLM {#interface-llm}

Następnie monitujemy rzeczywisty LLM i otrzymujemy oczekiwaną przyszłą wartość. Napisałem ten program przy użyciu OpenAI, więc jeśli chcesz użyć innego dostawcy, będziesz musiał go dostosować.

1. Załóż [konto OpenAI](https://auth.openai.com/create-account)

2. [Zasil konto](https://platform.openai.com/settings/organization/billing/overview) — minimalna kwota w momencie pisania tego tekstu to 5 USD

3. [Utwórz klucz API](https://platform.openai.com/settings/organization/api-keys)

4. W wierszu poleceń wyeksportuj klucz API, aby program mógł z niego korzystać

   ```sh
   export OPENAI_API_KEY=sk-<reszta klucza znajduje się tutaj>
   ```

5. Zamelduj i uruchom agenta

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

Oto nowy kod.

```python
from openai import OpenAI

open_ai = OpenAI()  # Klient odczytuje zmienną środowiskową OPENAI_API_KEY
```

Zaimportuj i utwórz instancję API OpenAI.

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

Wywołaj API OpenAI (`open_ai.chat.completions.create`), aby utworzyć odpowiedź.

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

Wyświetl cenę i podaj rekomendację kupna lub sprzedaży.

#### Testowanie prognoz {#testing-the-predictions}

Teraz, gdy możemy generować prognozy, możemy również wykorzystać dane historyczne, aby ocenić, czy tworzymy użyteczne prognozy.

```sh
uv run test-predictor.py
```

Oczekiwany wynik jest podobny do:

```
Prognoza na 2026-01-05T19:50: prognozowano 3138,93 USD, realnie 3218,92 USD, błąd 79,99 USD
Prognoza na 2026-01-06T19:56: prognozowano 3243,39 USD, realnie 3221,08 USD, błąd 22,31 USD
Prognoza na 2026-01-07T20:02: prognozowano 3223,24 USD, realnie 3146,89 USD, błąd 76,35 USD
Prognoza na 2026-01-08T20:11: prognozowano 3150,47 USD, realnie 3092,04 USD, błąd 58,43 USD
.
.
.
Prognoza na 2026-01-31T22:33: prognozowano 2637,73 USD, realnie 2417,77 USD, błąd 219,96 USD
Prognoza na 2026-02-01T22:41: prognozowano 2381,70 USD, realnie 2318,84 USD, błąd 62,86 USD
Prognoza na 2026-02-02T22:49: prognozowano 2234,91 USD, realnie 2349,28 USD, błąd 114,37 USD
Średni błąd prognozy dla 29 prognoz: 83.87103448275862068965517241 USD
Średnia zmiana na rekomendację: 4,787931034482758620689655172 USD
Standardowa wariancja zmian: 104,42 USD
Dni zyskowne: 51,72%
Dni stratne: 48,28%
```

Większość testera jest identyczna z agentem, ale oto części, które są nowe lub zmodyfikowane.

```python
CYCLES_FOR_TEST = 40 # W przypadku testu historycznego, ile cykli testujemy

# Uzyskaj wiele notowań
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

Patrzymy wstecz na `CYCLES_FOR_TEST` (określone tutaj jako 40) dni.

```python
# Tworzenie prognoz i sprawdzanie ich pod kątem rzeczywistej historii

total_error = Decimal(0)
changes = []
```

Interesują nas dwa rodzaje błędów. Pierwszy, `total_error`, to po prostu suma błędów popełnionych przez predyktora.

Aby zrozumieć drugi, `changes`, musimy pamiętać o celu agenta. Nie chodzi o przewidywanie współczynnika WETH/USDC (ceny ETH). Chodzi o wydawanie zaleceń sprzedaży i kupna. Jeśli cena wynosi obecnie 2000 USD, a jutro przewiduje się 2010 USD, nie ma znaczenia, czy faktyczny wynik wyniesie 2020 USD i zarobimy dodatkowe pieniądze. Ale _ma_ znaczenie, jeśli przewidywano 2010 USD i kupiono ETH na podstawie tej rekomendacji, a cena spadnie do 1990 USD.

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

Możemy przyjrzeć się tylko przypadkom, w których dostępna jest pełna historia (wartości użyte do prognozy i wartość rzeczywista do porównania). Oznacza to, że najnowszy przypadek musi być tym, który rozpoczął się `CYCLES_BACK` temu.

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

Użyj [fragmentów](https://www.w3schools.com/python/ref_func_slice.asp), aby uzyskać taką samą liczbę próbek, jakiej używa agent. Kod między tym a następnym segmentem to ten sam kod do uzyskiwania prognoz, który mamy w agencie.

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

Uzyskaj przewidywaną cenę, cenę rzeczywistą i cenę w momencie prognozy. Potrzebujemy ceny w momencie prognozy, aby określić, czy rekomendacja dotyczyła kupna czy sprzedaży.

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Prediction for {prediction_time}: predicted {predicted_price} USD, real {real_price} USD, error {error} USD")
```

Ustal błąd i dodaj go do sumy.

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

W przypadku `changes` chcemy uzyskać wpływ pieniężny kupna lub sprzedaży jednego ETH. Najpierw musimy więc określić rekomendację, a następnie ocenić, jak zmieniła się rzeczywista cena i czy rekomendacja przyniosła zysk (zmiana dodatnia) czy stratę (zmiana ujemna).

```python
print (f"Mean prediction error over {len(wethusdc_quotes)-CYCLES_BACK} predictions: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Mean change per recommendation: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Standard variance of changes: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

Zgłoś wyniki.

```python
print (f"Profitable days: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Losing days: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

Użyj [`filter`](https://www.w3schools.com/python/ref_func_filter.asp), aby policzyć liczbę dni zyskownych i liczbę dni kosztownych. Wynikiem jest obiekt filtru, który musimy przekonwertować na listę, aby uzyskać długość.

### Wysyłanie transakcji {#submit-txn}

Teraz musimy faktycznie przesłać transakcje. Nie chcę jednak wydawać prawdziwych pieniędzy na tym etapie, zanim system nie zostanie sprawdzony. Zamiast tego utworzymy lokalny fork sieci głównej i będziemy „handlować” w tej sieci.

Oto kroki, aby utworzyć lokalny fork i włączyć handel.

1. Zainstaluj [Foundry](https://getfoundry.sh/introduction/installation)

2. Uruchom [`anvil`](https://getfoundry.sh/anvil/overview)

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` nasłuchuje na domyślnym adresie URL dla Foundry, http://localhost:8545, więc nie musimy określać adresu URL dla [polecenia `cast`](https://getfoundry.sh/cast/overview), którego używamy do manipulowania blockchainem.

3. Podczas pracy w `anvil` dostępnych jest dziesięć kont testowych z ETH — ustaw zmienne środowiskowe dla pierwszego z nich

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. Są to kontrakty, których musimy użyć. [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) to kontrakt Uniswap v3, którego używamy do faktycznego handlu. Moglibyśmy handlować bezpośrednio przez pulę, ale jest to znacznie łatwiejsze.

   Dwie ostatnie zmienne to ścieżki Uniswap v3 wymagane do wymiany między WETH i USDC.

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. Każde z kont testowych ma 10 000 ETH. Użyj kontraktu WETH, aby opakować 1000 ETH w celu uzyskania 1000 WETH do handlu.

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. Użyj `SwapRouter` do handlu 500 WETH na USDC.

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   Wywołanie `approve` tworzy limit wydatków, który pozwala `SwapRouter` na wydanie niektórych z naszych tokenów. Kontrakty nie mogą monitorować zdarzeń, więc jeśli przekażemy tokeny bezpośrednio do kontraktu `SwapRouter`, nie będzie on wiedział, że został opłacony. Zamiast tego pozwalamy kontraktowi `SwapRouter` wydać określoną kwotę, a następnie `SwapRouter` to robi. Odbywa się to za pomocą funkcji wywoływanej przez `SwapRouter`, dzięki czemu wie on, czy się powiodła.

7. Sprawdź, czy masz wystarczającą ilość obu tokenów.

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
Aktualna cena: 1843.16
O 2026-02-06T23:07 spodziewana cena: 1724.41 USD
Sada kont przed transakcją:
Saldo USDC: 927301.578272
Saldo WETH: 500
Sprzedaj, spodziewam się, że cena spadnie o 118,75 USD
Wysłano transakcję zatwierdzenia: 74e367ddbb407c1aaf567d87aa5863049991b1d2aa092b6b85195d925e2bd41f
Transakcja zatwierdzenia wykopana.
Wysłano transakcję sprzedaży: fad1bcf938585c9e90364b26ac7a80eea9efd34c37e5db81e58d7655bcae28bf
Transakcja sprzedaży wykopana.
Salda kont po transakcji:
Saldo USDC: 929143,797116
Saldo WETH: 499
```

Aby faktycznie z niego skorzystać, potrzeba kilku drobnych zmian.

- W wierszu 14 zmień `MAINNET_URL` na prawdziwy punkt dostępu, taki jak `https://eth.drpc.org`
- W wierszu 28 zmień `PRIVATE_KEY` na swój własny klucz prywatny
- Chyba że jesteś bardzo bogaty i możesz kupować lub sprzedawać 1 ETH każdego dnia dla niesprawdzonego agenta, możesz chcieć zmienić 29, aby zmniejszyć `WETH_TRADE_AMOUNT`

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

W ABI `SwapRouter` potrzebujemy tylko `exactInput`. Istnieje powiązana funkcja, `exactOutput`, której moglibyśmy użyć do zakupu dokładnie jednego WETH, ale dla uproszczenia używamy `exactInput` w obu przypadkach.

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

Definicje Web3 dla [`konta`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) i kontraktu `SwapRouter`.

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

Zatwierdź limit wydatków tokena dla `SwapRouter`.

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

W ten sposób wysyłamy transakcję w Web3. Najpierw używamy [obiektu `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) do zbudowania transakcji. Następnie używamy [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) do podpisania transakcji za pomocą `PRIVATE_KEY`. Na koniec używamy [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) do wysłania transakcji.

```python
    print(f"Approve transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Approve transaction mined.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) czeka na wykopanie transakcji. W razie potrzeby zwraca potwierdzenie.

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

Są to parametry przy sprzedaży WETH.

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

Funkcje `buy()` i `sell()` są prawie identyczne. Najpierw zatwierdzamy wystarczający limit wydatków dla `SwapRouter`, a następnie wywołujemy go z poprawną ścieżką i kwotą.

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

Zgłoś salda użytkowników w obu walutach.

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

Ten agent działa obecnie tylko raz. Można jednak zmienić go tak, aby działał w sposób ciągły, uruchamiając go z [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) lub zawijając wiersze 368-400 w pętlę i używając [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep), aby poczekać, aż nadejdzie czas na następny cykl.

## Możliwe ulepszenia {#improvements}

To nie jest pełna wersja produkcyjna; to tylko przykład, aby nauczyć podstaw. Oto kilka pomysłów na ulepszenia.

### Inteligentniejszy handel {#smart-trading}

Istnieją dwa ważne fakty, które agent ignoruje przy podejmowaniu decyzji, co robić.

- _Wielkość przewidywanej zmiany_. Agent sprzedaje stałą kwotę `WETH`, jeśli oczekuje się spadku ceny, niezależnie od wielkości spadku.
  Prawdopodobnie lepiej byłoby ignorować drobne zmiany i sprzedawać w oparciu o to, jak bardzo spodziewamy się spadku ceny.
- _Aktualne portfolio_. Jeśli 10% Twojego portfela to WETH i uważasz, że cena wzrośnie, prawdopodobnie warto kupić więcej. Ale jeśli 90% Twojego portfela to WETH, możesz być wystarczająco wyeksponowany i nie ma potrzeby kupować więcej. Odwrotnie jest, jeśli spodziewasz się spadku ceny.

### Co, jeśli chcesz zachować swoją strategię handlową w tajemnicy? {#secret}

Dostawcy AI mogą zobaczyć zapytania, które wysyłasz do ich LLM, co może ujawnić genialny system handlowy, który opracowałeś ze swoim agentem. System handlowy, z którego korzysta zbyt wiele osób, jest bezwartościowy, ponieważ zbyt wiele osób próbuje kupować, gdy chcesz kupić (a cena rośnie) i próbuje sprzedawać, gdy chcesz sprzedać (a cena spada).

Aby uniknąć tego problemu, można uruchomić LLM lokalnie, na przykład za pomocą [LM-Studio](https://lmstudio.ai/).

### Od bota AI do agenta AI {#bot-to-agent}

Można argumentować, że jest to [bot AI, a nie agent AI](/ai-agents/#ai-agents-vs-ai-bots). Implementuje on stosunkowo prostą strategię opartą na predefiniowanych informacjach. Możemy włączyć samodoskonalenie, na przykład, dostarczając listę pul Uniswap v3 i ich najnowszych wartości i pytając, która kombinacja ma najlepszą wartość predykcyjną.

### Ochrona przed poślizgiem {#slippage-protection}

Obecnie nie ma [ochrony przed poślizgiem](https://uniswapv3book.com/milestone_3/slippage-protection.html). Jeśli obecne notowanie wynosi 2000 USD, a oczekiwana cena 2100 USD, agent dokona zakupu. Jeśli jednak przed zakupem przez agenta koszt wzrośnie do 2200 USD, dalszy zakup nie ma sensu.

Aby zaimplementować ochronę przed poślizgiem, należy określić wartość `amountOutMinimum` w wierszach 325 i 334 pliku [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325).

## Wnioski {#conclusion}

Mam nadzieję, że wiesz już wystarczająco dużo, aby zacząć z agentami AI. Nie jest to kompleksowy przegląd tematu; istnieją całe książki poświęcone temu zagadnieniu, ale to wystarczy, aby zacząć. Powodzenia!

[Zobacz więcej mojej pracy tutaj](https://cryptodocguy.pro/).
