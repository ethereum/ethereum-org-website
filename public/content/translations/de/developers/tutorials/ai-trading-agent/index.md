---
title: Erstellen Sie Ihren eigenen KI-Trading-Agenten auf Ethereum
description: "In diesem Tutorial lernen Sie, wie Sie einen einfachen KI-Trading-Agenten erstellen. Dieser Agent liest Informationen aus der Blockchain, bittet ein LLM um eine Empfehlung basierend auf diesen Informationen, führt den vom LLM empfohlenen Handel aus, wartet dann und wiederholt den Vorgang."
author: Ori Pomerantz
tags: ["KI", "Trading", "Agent", "Python"]
skill: intermediate
breadcrumb: KI-Trading-Agent
published: 2026-02-13
lang: de
sidebarDepth: 3
---

In diesem Tutorial lernen Sie, wie Sie einen einfachen KI-Trading-Agenten erstellen. Dieser Agent arbeitet nach folgenden Schritten:

1. Lesen der aktuellen und vergangenen Preise eines Tokens sowie anderer potenziell relevanter Informationen
2. Erstellen einer Abfrage mit diesen Informationen, zusammen mit Hintergrundinformationen, um zu erklären, wie sie relevant sein könnten
3. Einreichen der Abfrage und Erhalt eines prognostizierten Preises
4. Handeln basierend auf der Empfehlung
5. Warten und wiederholen

Dieser Agent demonstriert, wie man Informationen liest, sie in eine Abfrage übersetzt, die eine brauchbare Antwort liefert, und diese Antwort verwendet. All dies sind Schritte, die für einen KI-Agenten erforderlich sind. Dieser Agent ist in Python implementiert, da dies die am häufigsten verwendete Sprache in der KI ist.

## Warum das tun? {#why-do-this}

Automatisierte Trading-Agenten ermöglichen es Entwicklern, eine Handelsstrategie auszuwählen und auszuführen. [KI-Agenten](/ai-agents) ermöglichen komplexere und dynamischere Handelsstrategien, die potenziell Informationen und Algorithmen nutzen, an deren Verwendung der Entwickler noch nicht einmal gedacht hat.

## Die Werkzeuge {#tools}

Dieses Tutorial verwendet [Python](https://www.python.org/), die [Web3-Bibliothek](https://web3py.readthedocs.io/en/stable/) und [Uniswap v3](https://github.com/Uniswap/v3-periphery) für Preisangebote und den Handel.

### Warum Python? {#python}

Die am weitesten verbreitete Sprache für KI ist [Python](https://www.python.org/), daher verwenden wir sie hier. Machen Sie sich keine Sorgen, wenn Sie Python nicht kennen. Die Sprache ist sehr klar, und ich werde genau erklären, was sie tut.

Die [Web3-Bibliothek](https://web3py.readthedocs.io/en/stable/) ist die gängigste Python-Ethereum-API. Sie ist ziemlich einfach zu bedienen.

### Handeln auf der Blockchain {#trading-on-blockchain}

Es gibt [viele verteilte Börsen (DEX)](/apps/categories/defi/), die es Ihnen ermöglichen, Token auf Ethereum zu handeln. Sie neigen jedoch dazu, aufgrund von [Arbitrage](/developers/docs/smart-contracts/composability/#better-user-experience) ähnliche Wechselkurse zu haben.

[Uniswap](https://app.uniswap.org/) ist eine weit verbreitete DEX, die wir sowohl für Preisangebote (um die relativen Werte der Token zu sehen) als auch für den Handel nutzen können.

### OpenAI {#openai}

Für ein großes Sprachmodell habe ich mich für den Einstieg für [OpenAI](https://openai.com/) entschieden. Um die Anwendung in diesem Tutorial auszuführen, müssen Sie für den API-Zugang bezahlen. Die Mindestzahlung von 5 $ ist mehr als ausreichend.

## Entwicklung, Schritt für Schritt {#step-by-step}

Um die Entwicklung zu vereinfachen, gehen wir in Phasen vor. Jeder Schritt ist ein Branch auf GitHub.

### Erste Schritte {#getting-started}

Es gibt Schritte für den Einstieg unter UNIX oder Linux (einschließlich [WSL](https://learn.microsoft.com/en-us/windows/wsl/install))

1. Falls Sie es noch nicht haben, laden Sie [Python](https://www.python.org/downloads/) herunter und installieren Sie es.

2. Klonen Sie das GitHub-Repository.

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
```

3. Installieren Sie [`uv`](https://docs.astral.sh/uv/getting-started/installation/). Der Befehl auf Ihrem System könnte anders lauten.

   ```sh
   pipx install uv
```

4. Laden Sie die Bibliotheken herunter.

   ```sh
   uv sync
```

5. Aktivieren Sie die virtuelle Umgebung.

   ```sh
   source .venv/bin/activate
```

6. Um zu überprüfen, ob Python und Web3 korrekt funktionieren, führen Sie `python3` aus und übergeben Sie ihm dieses Programm. Sie können es an der Eingabeaufforderung `>>>` eingeben; es ist nicht nötig, eine Datei zu erstellen.

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
```

### Lesen aus der Blockchain {#read-blockchain}

Der nächste Schritt ist das Lesen aus der Blockchain. Dazu müssen Sie in den Branch `02-read-quote` wechseln und dann `uv` verwenden, um das Programm auszuführen.

```sh
git checkout 02-read-quote
uv run agent.py
```

Sie sollten eine Liste von `Quote`-Objekten erhalten, jedes mit einem Zeitstempel, einem Preis und dem Asset (derzeit immer `WETH/USDC`).

Hier ist eine zeilenweise Erklärung.

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

Importieren Sie die benötigten Bibliotheken. Sie werden unten erklärt, wenn sie verwendet werden.

```python
print = functools.partial(print, flush=True)
```

Ersetzt Pythons `print` durch eine Version, die die Ausgabe immer sofort leert. Dies ist in einem lang laufenden Skript nützlich, da wir nicht auf Statusaktualisierungen oder Debugging-Ausgaben warten möchten.

```python
MAINNET_URL = "https://eth.drpc.org"
```

Eine URL, um zum Mainnet zu gelangen. Sie können eine von [Blockchain-Knoten als Dienstleistung](/developers/docs/nodes-and-clients/nodes-as-a-service/) erhalten oder eine der auf [Chainlist](https://chainlist.org/chain/1) beworbenen verwenden.

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

Ein Ethereum-Mainnet-Block entsteht typischerweise alle zwölf Sekunden, daher ist dies die Anzahl der Blöcke, die wir in einem bestimmten Zeitraum erwarten würden. Beachten Sie, dass dies keine exakte Zahl ist. Wenn der [Block-Vorschlagende](/developers/docs/consensus-mechanisms/pos/block-proposal/) ausfällt, wird dieser Block übersprungen, und die Zeit für den nächsten Block beträgt 24 Sekunden. Wenn wir den exakten Block für einen Zeitstempel erhalten wollten, würden wir die [binäre Suche](https://en.wikipedia.org/wiki/Binary_search) verwenden. Für unsere Zwecke ist dies jedoch nah genug. Die Zukunft vorherzusagen ist keine exakte Wissenschaft.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

Die Größe des Zyklus. Wir überprüfen die Preisangebote einmal pro Zyklus und versuchen, den Wert am Ende des nächsten Zyklus zu schätzen.

```python
# Die Adresse des Pools, den wir auslesen
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

Die Werte der Preisangebote stammen aus dem Uniswap 3 USDC/WETH-Pool an der Adresse [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract). Diese Adresse liegt bereits in Prüfsummenform vor, aber es ist besser, [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address) zu verwenden, um den Code wiederverwendbar zu machen.

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

Dies sind die [ABIs](https://docs.soliditylang.org/en/latest/abi-spec.html) für die beiden Verträge, die wir kontaktieren müssen. Um den Code prägnant zu halten, fügen wir nur die Funktionen ein, die wir aufrufen müssen.

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

Initialisieren Sie die [`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers)-Bibliothek und stellen Sie eine Verbindung zu einem Ethereum-Blockchain-Knoten her.

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

Dies ist eine Möglichkeit, eine Datenklasse in Python zu erstellen. Der Datentyp [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) wird verwendet, um eine Verbindung zum Vertrag herzustellen. Beachten Sie das `(frozen=True)`. In Python werden [Booleans](https://en.wikipedia.org/wiki/Boolean_data_type) als `True` oder `False` definiert, großgeschrieben. Diese Datenklasse ist `frozen` (eingefroren), was bedeutet, dass die Felder nicht geändert werden können.

Beachten Sie die Einrückung. Im Gegensatz zu [C-abgeleiteten Sprachen](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages) verwendet Python Einrückungen, um Blöcke zu kennzeichnen. Der Python-Interpreter weiß, dass die folgende Definition nicht Teil dieser Datenklasse ist, da sie nicht mit derselben Einrückung wie die Felder der Datenklasse beginnt.

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

Der Typ [`Decimal`](https://docs.python.org/3/library/decimal.html) wird für die genaue Handhabung von Dezimalbrüchen verwendet.

```python
    def get_price(self, block: int) -> Decimal:
```

Dies ist die Art und Weise, eine Funktion in Python zu definieren. Die Definition ist eingerückt, um zu zeigen, dass sie immer noch Teil von `PoolInfo` ist.

In einer Funktion, die Teil einer Datenklasse ist, ist der erste Parameter immer `self`, die Instanz der Datenklasse, die hier aufgerufen hat. Hier gibt es einen weiteren Parameter, die Blocknummer.

```python
        assert block <= w3.eth.block_number, "Block is in the future"
```

Wenn wir die Zukunft lesen könnten, bräuchten wir keine KI für das Trading.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

Die Syntax zum Aufrufen einer Funktion auf der EVM von Web3 aus lautet: `<contract object>.functions.<function name>().call(<parameters>)`. Die Parameter können die Parameter der EVM-Funktion sein (falls vorhanden; hier gibt es keine) oder [benannte Parameter](https://en.wikipedia.org/wiki/Named_parameter) zur Änderung des Blockchain-Verhaltens. Hier verwenden wir einen, `block_identifier`, um [die Blocknummer](/developers/docs/apis/json-rpc/#default-block) anzugeben, in der wir ausführen möchten.

Das Ergebnis ist [dieses Struct, in Array-Form](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72). Der erste Wert ist eine Funktion des Wechselkurses zwischen den beiden Token.

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

Um Berechnungen auf der Blockchain zu reduzieren, speichert Uniswap v3 nicht den tatsächlichen Umrechnungsfaktor, sondern dessen Quadratwurzel. Da die EVM keine Fließkomma-Mathematik oder Brüche unterstützt, ist die Antwort anstelle des tatsächlichen Wertes <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5;</mo><msup><mn>2</mn><mn>96</mn></msup></math>

```python
         # (token1 pro token0)
        return 1/(raw_price * self.decimal_factor)
```

Der Rohpreis, den wir erhalten, ist die Anzahl von `token0`, die wir für jedes `token1` bekommen. In unserem Pool ist `token0` USDC (Stablecoin mit dem gleichen Wert wie ein US-Dollar) und `token1` ist [WETH](https://opensea.io/learn/blockchain/what-is-weth). Der Wert, den wir wirklich wollen, ist die Anzahl der Dollar pro WETH, nicht umgekehrt.

Der Dezimalfaktor ist das Verhältnis zwischen den [Dezimalfaktoren](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) für die beiden Token.

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

Diese Datenklasse repräsentiert ein Preisangebot (Quote): den Preis eines bestimmten Assets zu einem bestimmten Zeitpunkt. An diesem Punkt ist das Feld `asset` irrelevant, da wir einen einzigen Pool verwenden und daher ein einziges Asset haben. Wir werden jedoch später weitere Assets hinzufügen.

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

Diese Funktion nimmt eine Adresse und gibt Informationen über den Token-Vertrag an dieser Adresse zurück. Um einen neuen [Web3 `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) zu erstellen, übergeben wir die Adresse und die ABI an `w3.eth.contract`.

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

Diese Funktion gibt alles zurück, was wir über [einen bestimmten Pool](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol) benötigen. Die Syntax `f"<string>"` ist ein [formatierter String](https://docs.python.org/3/reference/lexical_analysis.html#f-strings).

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

Holen Sie sich ein `Quote`-Objekt. Der Standardwert für `block_number` ist `None` (kein Wert).

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

Wenn keine Blocknummer angegeben wurde, verwenden Sie `w3.eth.block_number`, was die neueste Blocknummer ist. Dies ist die Syntax für [eine `if`-Anweisung](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement).

Es mag so aussehen, als wäre es besser gewesen, den Standardwert einfach auf `w3.eth.block_number` zu setzen, aber das funktioniert nicht gut, da es die Blocknummer zum Zeitpunkt der Definition der Funktion wäre. In einem lang laufenden Agenten wäre dies ein Problem.

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

Verwenden Sie [die `datetime`-Bibliothek](https://docs.python.org/3/library/datetime.html), um es in ein Format zu formatieren, das für Menschen und große Sprachmodelle (LLMs) lesbar ist. Verwenden Sie [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize), um den Wert auf zwei Dezimalstellen zu runden.

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

In Python definieren Sie eine [Liste](https://docs.python.org/3/library/stdtypes.html#typesseq-list), die nur einen bestimmten Typ enthalten kann, mit `list[<type>]`.

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

In Python iteriert eine [`for`-Schleife](https://docs.python.org/3/tutorial/controlflow.html#for-statements) typischerweise über eine Liste. Die Liste der Blocknummern, in denen nach Preisangeboten gesucht werden soll, stammt von [`range`](https://docs.python.org/3/library/stdtypes.html#range).

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

Holen Sie für jede Blocknummer ein `Quote`-Objekt und hängen Sie es an die Liste `quotes` an. Geben Sie dann diese Liste zurück.

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

Dies ist der Hauptcode des Skripts. Lesen Sie die Pool-Informationen, holen Sie zwölf Preisangebote und geben Sie sie mit [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint) aus.

### Erstellen eines Prompts {#prompt}

Als Nächstes müssen wir diese Liste von Preisangeboten in einen Prompt für ein LLM umwandeln und einen erwarteten zukünftigen Wert erhalten.

```sh
git checkout 03-create-prompt
uv run agent.py
```

Die Ausgabe wird nun ein Prompt an ein LLM sein, ähnlich wie:

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

Beachten Sie, dass es hier Preisangebote für zwei Assets gibt, `WETH/USDC` und `WBTC/WETH`. Das Hinzufügen von Preisangeboten eines anderen Assets könnte die Vorhersagegenauigkeit verbessern.

#### Wie ein Prompt aussieht {#prompt-explanation}

Dieser Prompt enthält drei Abschnitte, die in LLM-Prompts ziemlich üblich sind.

1. Informationen. LLMs haben viele Informationen aus ihrem Training, aber sie verfügen normalerweise nicht über die neuesten. Aus diesem Grund müssen wir hier die neuesten Preisangebote abrufen. Das Hinzufügen von Informationen zu einem Prompt wird als [Retrieval Augmented Generation (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) bezeichnet.

2. Die eigentliche Frage. Das ist es, was wir wissen wollen.

3. Anweisungen zur Ausgabeformatierung. Normalerweise gibt uns ein LLM eine Schätzung mit einer Erklärung, wie es dazu gekommen ist. Das ist besser für Menschen, aber ein Computerprogramm benötigt nur das Endergebnis.

#### Code-Erklärung {#prompt-code}

Hier ist der neue Code.

```python
from datetime import datetime, timezone, timedelta
```

Wir müssen dem LLM die Zeit mitteilen, für die wir eine Schätzung wünschen. Um eine Zeit "n Minuten/Stunden/Tage" in der Zukunft zu erhalten, verwenden wir [die Klasse `timedelta`](https://docs.python.org/3/library/datetime.html#datetime.timedelta).

```python
# Die Adressen der Pools, die wir auslesen
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

Wir haben zwei Pools, die wir lesen müssen.

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
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2 # (token1 pro token0)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

Im WETH/USDC-Pool möchten wir wissen, wie viele von `token0` (USDC) wir benötigen, um eines von `token1` (WETH) zu kaufen. Im WETH/WBTC-Pool möchten wir wissen, wie viele `token1` (WETH) wir benötigen, um ein `token0` (WBTC, was Wrapped Bitcoin ist) zu kaufen. Wir müssen nachverfolgen, ob das Verhältnis des Pools umgekehrt werden muss.

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

Um zu wissen, ob ein Pool umgekehrt werden muss, müssen wir dies als Eingabe für `read_pool` erhalten. Außerdem muss das Asset-Symbol korrekt eingerichtet sein.

Die Syntax `<a> if <b> else <c>` ist das Python-Äquivalent des [ternären bedingten Operators](https://en.wikipedia.org/wiki/Ternary_conditional_operator), der in einer C-abgeleiteten Sprache `<b> ? <a> : <c>` wäre.

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

Diese Funktion erstellt einen String, der eine Liste von `Quote`-Objekten formatiert, unter der Annahme, dass sie alle für dasselbe Asset gelten.

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

In Python werden [mehrzeilige String-Literale](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) als `"""` .... `"""` geschrieben.

```python
Given these quotes:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

Hier verwenden wir das [MapReduce](https://en.wikipedia.org/wiki/MapReduce)-Muster, um mit `format_quotes` einen String für jede Preisangebotsliste zu generieren, und reduzieren sie dann zu einem einzigen String zur Verwendung im Prompt.

```python
What would you expect the value for {asset} to be at time {expected_time}?

Provide your answer as a single number rounded to two decimal places,
without any other text.
    """
```

Der Rest des Prompts ist wie erwartet.

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

Überprüfen Sie die beiden Pools und holen Sie Preisangebote von beiden ein.

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

Bestimmen Sie den zukünftigen Zeitpunkt, für den wir die Schätzung wünschen, und erstellen Sie den Prompt.

### Schnittstelle zu einem LLM {#interface-llm}

Als Nächstes fordern wir ein tatsächliches LLM auf und erhalten einen erwarteten zukünftigen Wert. Ich habe dieses Programm mit OpenAI geschrieben. Wenn Sie also einen anderen Anbieter verwenden möchten, müssen Sie es anpassen.

1. Holen Sie sich ein [OpenAI-Konto](https://auth.openai.com/create-account)
2. [Laden Sie das Konto auf](https://platform.openai.com/settings/organization/billing/overview) – der Mindestbetrag zum Zeitpunkt des Schreibens beträgt 5 $
3. [Erstellen Sie einen API-Schlüssel](https://platform.openai.com/settings/organization/api-keys)
4. Exportieren Sie in der Befehlszeile den API-Schlüssel, damit Ihr Programm ihn verwenden kann

   ```sh
   export OPENAI_API_KEY=sk-<the rest of the key goes here>
```

5. Checken Sie den Agenten aus und führen Sie ihn aus

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
```

Hier ist der neue Code.

```python
from openai import OpenAI

open_ai = OpenAI() # Der Client liest die Umgebungsvariable OPENAI_API_KEY
```

Importieren und instanziieren Sie die OpenAI-API.

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

Rufen Sie die OpenAI-API auf (`open_ai.chat.completions.create`), um die Antwort zu erstellen.

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

Geben Sie den Preis aus und geben Sie eine Kauf- oder Verkaufsempfehlung ab.

#### Testen der Vorhersagen {#testing-the-predictions}

Da wir nun Vorhersagen generieren können, können wir auch historische Daten verwenden, um zu beurteilen, ob wir nützliche Vorhersagen produzieren.

```sh
uv run test-predictor.py
```

Das erwartete Ergebnis ist ähnlich wie:

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

Der Großteil des Testers ist identisch mit dem Agenten, aber hier sind die Teile, die neu oder modifiziert sind.

```python
CYCLES_FOR_TEST = 40 # Für den Backtest, über wie viele Zyklen wir testen

# Viele Kurse abrufen
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

Wir schauen `CYCLES_FOR_TEST` (hier als 40 angegeben) Tage zurück.

```python
# Vorhersagen erstellen und mit der echten Historie abgleichen

total_error = Decimal(0)
changes = []
```

Es gibt zwei Arten von Fehlern, an denen wir interessiert sind. Der erste, `total_error`, ist einfach die Summe der Fehler, die der Prädiktor gemacht hat.

Um den zweiten, `changes`, zu verstehen, müssen wir uns an den Zweck des Agenten erinnern. Es geht nicht darum, das WETH/USDC-Verhältnis (ETH-Preis) vorherzusagen. Es geht darum, Verkaufs- und Kaufempfehlungen abzugeben. Wenn der Preis derzeit 2000 $ beträgt und er für morgen 2010 $ vorhersagt, macht es uns nichts aus, wenn das tatsächliche Ergebnis 2020 $ ist und wir zusätzliches Geld verdienen. Aber es stört uns _sehr wohl_, wenn er 2010 $ vorhergesagt hat und basierend auf dieser Empfehlung ETH gekauft hat, und der Preis auf 1990 $ fällt.

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

Wir können uns nur Fälle ansehen, in denen die vollständige Historie (die für die Vorhersage verwendeten Werte und der reale Wert zum Vergleich) verfügbar ist. Das bedeutet, dass der neueste Fall derjenige sein muss, der vor `CYCLES_BACK` begonnen hat.

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

Verwenden Sie [Slices](https://www.w3schools.com/python/ref_func_slice.asp), um die gleiche Anzahl von Stichproben zu erhalten wie die Anzahl, die der Agent verwendet. Der Code zwischen hier und dem nächsten Segment ist derselbe Code zum Abrufen einer Vorhersage, den wir im Agenten haben.

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

Holen Sie sich den vorhergesagten Preis, den realen Preis und den Preis zum Zeitpunkt der Vorhersage. Wir benötigen den Preis zum Zeitpunkt der Vorhersage, um zu bestimmen, ob die Empfehlung Kaufen oder Verkaufen lautete.

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Prediction for {prediction_time}: predicted {predicted_price} USD, real {real_price} USD, error {error} USD")
```

Berechnen Sie den Fehler und fügen Sie ihn der Gesamtsumme hinzu.

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

Für `changes` wollen wir die monetären Auswirkungen des Kaufs oder Verkaufs von einem ETH. Zuerst müssen wir also die Empfehlung bestimmen, dann beurteilen, wie sich der tatsächliche Preis verändert hat, und ob die Empfehlung Geld eingebracht (positive Veränderung) oder Geld gekostet hat (negative Veränderung).

```python
print (f"Mean prediction error over {len(wethusdc_quotes)-CYCLES_BACK} predictions: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Mean change per recommendation: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Standard variance of changes: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

Berichten Sie die Ergebnisse.

```python
print (f"Profitable days: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Losing days: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

Verwenden Sie [`filter`](https://www.w3schools.com/python/ref_func_filter.asp), um die Anzahl der profitablen Tage und die Anzahl der verlustreichen Tage zu zählen. Das Ergebnis ist ein Filterobjekt, das wir in eine Liste umwandeln müssen, um die Länge zu erhalten.

### Einreichen von Transaktionen {#submit-txn}

Jetzt müssen wir tatsächlich Transaktionen einreichen. Ich möchte jedoch zu diesem Zeitpunkt kein echtes Geld ausgeben, bevor das System nicht erprobt ist. Stattdessen werden wir einen lokalen Fork des Mainnets erstellen und in diesem Netzwerk "handeln".

Hier sind die Schritte, um einen lokalen Fork zu erstellen und den Handel zu ermöglichen.

1. Installieren Sie [Foundry](https://getfoundry.sh/introduction/installation)

2. Starten Sie [`anvil`](https://getfoundry.sh/anvil/overview)

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
```

   `anvil` lauscht auf der Standard-URL für Foundry, http://localhost:8545, sodass wir die URL für [den `cast`-Befehl](https://getfoundry.sh/cast/overview), den wir zur Manipulation der Blockchain verwenden, nicht angeben müssen.

3. Wenn Sie in `anvil` ausführen, gibt es zehn Testkonten, die über ETH verfügen – legen Sie die Umgebungsvariablen für das erste fest.

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
```

4. Dies sind die Verträge, die wir verwenden müssen. [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) ist der Uniswap v3-Vertrag, den wir für den eigentlichen Handel verwenden. Wir könnten direkt über den Pool handeln, aber dies ist viel einfacher.

   Die beiden unteren Variablen sind die Uniswap v3-Pfade, die erforderlich sind, um zwischen WETH und USDC zu tauschen.

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
```

5. Jedes der Testkonten verfügt über 10.000 ETH. Verwenden Sie den WETH-Vertrag, um 1000 ETH zu wrappen, um 1000 WETH für den Handel zu erhalten.

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
```

6. Verwenden Sie `SwapRouter`, um 500 WETH gegen USDC zu handeln.

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
```

   Der `approve`-Aufruf erstellt eine Freigabe (Allowance), die es `SwapRouter` ermöglicht, einige unserer Token auszugeben. Verträge können keine Ereignisse überwachen. Wenn wir also Token direkt an den `SwapRouter`-Vertrag übertragen, wüsste dieser nicht, dass er bezahlt wurde. Stattdessen erlauben wir dem `SwapRouter`-Vertrag, einen bestimmten Betrag auszugeben, und dann tut `SwapRouter` dies. Dies geschieht über eine von `SwapRouter` aufgerufene Funktion, sodass er weiß, ob er erfolgreich war.

7. Überprüfen Sie, ob Sie genug von beiden Token haben.

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
```

Da wir nun WETH und USDC haben, können wir den Agenten tatsächlich ausführen.

```sh
git checkout 05-trade
uv run agent.py
```

Die Ausgabe wird ähnlich aussehen wie:

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

Um ihn tatsächlich zu nutzen, benötigen Sie ein paar kleine Änderungen.

- Ändern Sie in Zeile 14 `MAINNET_URL` in einen echten Zugangspunkt, wie z. B. `https://eth.drpc.org`
- Ändern Sie in Zeile 28 `PRIVATE_KEY` in Ihren eigenen Private-Key
- Es sei denn, Sie sind sehr wohlhabend und können jeden Tag 1 ETH für einen unbewiesenen Agenten kaufen oder verkaufen, möchten Sie vielleicht Zeile 29 ändern, um `WETH_TRADE_AMOUNT` zu verringern

#### Code-Erklärung {#trading-code}

Hier ist der neue Code.

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

Die gleichen Variablen, die wir in Schritt 4 verwendet haben.

```python
WETH_TRADE_AMOUNT=1
```

Der zu handelnde Betrag.

```python
ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... },
    { "name": "balanceOf", ...},
    { "name": "approve", ...}
]
```

Um tatsächlich zu handeln, benötigen wir die Funktion `approve`. Wir möchten auch die Salden davor und danach anzeigen, also benötigen wir auch `balanceOf`.

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

In der `SwapRouter`-ABI benötigen wir nur `exactInput`. Es gibt eine verwandte Funktion, `exactOutput`, die wir verwenden könnten, um genau ein WETH zu kaufen, aber der Einfachheit halber verwenden wir in beiden Fällen nur `exactInput`.

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

Die Web3-Definitionen für das [`account`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) (Konto) und den `SwapRouter`-Vertrag.

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

Die Transaktionsparameter. Wir benötigen hier eine Funktion, da sich [die Nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) jedes Mal ändern muss.

```python
def approve_token(contract: Contract, amount: int):
```

Genehmigen Sie eine Token-Freigabe für `SwapRouter`.

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

So senden wir eine Transaktion in Web3. Zuerst verwenden wir [das `Contract`-Objekt](https://web3py.readthedocs.io/en/stable/web3.contract.html), um die Transaktion aufzubauen. Dann verwenden wir [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction), um die Transaktion mit `PRIVATE_KEY` zu signieren. Schließlich verwenden wir [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction), um die Transaktion zu senden.

```python
    print(f"Approve transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Approve transaction mined.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) wartet, bis die Transaktion gemint wurde. Es gibt bei Bedarf den Beleg zurück.

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

Dies sind die Parameter beim Verkauf von WETH.

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

Im Gegensatz zu `SELL_PARAMS` können sich die Kaufparameter ändern. Der Eingabebetrag sind die Kosten für 1 WETH, wie in `quote` verfügbar.

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

Die Funktionen `buy()` und `sell()` sind nahezu identisch. Zuerst genehmigen wir eine ausreichende Freigabe für `SwapRouter`, und dann rufen wir ihn mit dem korrekten Pfad und Betrag auf.

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

Berichten Sie die Benutzersalden in beiden Währungen.

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

Dieser Agent funktioniert derzeit nur einmal. Sie können ihn jedoch so ändern, dass er kontinuierlich arbeitet, indem Sie ihn entweder über [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) ausführen oder indem Sie die Zeilen 368-400 in eine Schleife packen und [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) verwenden, um zu warten, bis es Zeit für den nächsten Zyklus ist.

## Mögliche Verbesserungen {#improvements}

Dies ist keine vollständige Produktionsversion; es ist lediglich ein Beispiel, um die Grundlagen zu vermitteln. Hier sind einige Ideen für Verbesserungen.

### Intelligenteres Trading {#smart-trading}

Es gibt zwei wichtige Fakten, die der Agent bei der Entscheidung, was zu tun ist, ignoriert.

- _Das Ausmaß der erwarteten Veränderung_. Der Agent verkauft einen festen Betrag an `WETH`, wenn ein Preisrückgang erwartet wird, unabhängig vom Ausmaß des Rückgangs.
  Es wäre wohl besser, geringfügige Änderungen zu ignorieren und basierend darauf zu verkaufen, wie stark der Preis voraussichtlich fallen wird.
- _Das aktuelle Portfolio_. Wenn 10 % Ihres Portfolios in WETH sind und Sie glauben, dass der Preis steigen wird, ist es wahrscheinlich sinnvoll, mehr zu kaufen. Wenn jedoch 90 % Ihres Portfolios in WETH sind, sind Sie möglicherweise ausreichend exponiert, und es besteht keine Notwendigkeit, mehr zu kaufen. Das Gegenteil gilt, wenn Sie erwarten, dass der Preis sinkt.

### Was ist, wenn Sie Ihre Handelsstrategie geheim halten möchten? {#secret}

KI-Anbieter können die Abfragen sehen, die Sie an ihre LLMs senden, was das geniale Handelssystem offenlegen könnte, das Sie mit Ihrem Agenten entwickelt haben. Ein Handelssystem, das zu viele Menschen nutzen, ist wertlos, da zu viele Menschen versuchen zu kaufen, wenn Sie kaufen möchten (und der Preis steigt), und versuchen zu verkaufen, wenn Sie verkaufen möchten (und der Preis sinkt).

Sie können ein LLM lokal ausführen, zum Beispiel mit [LM-Studio](https://lmstudio.ai/), um dieses Problem zu vermeiden.

### Vom KI-Bot zum KI-Agenten {#bot-to-agent}

Man kann gut argumentieren, dass dies [ein KI-Bot und kein KI-Agent](/ai-agents/#ai-agents-vs-ai-bots) ist. Er implementiert eine relativ einfache Strategie, die auf vordefinierten Informationen beruht. Wir können eine Selbstverbesserung ermöglichen, indem wir beispielsweise eine Liste von Uniswap v3-Pools und deren neuesten Werten bereitstellen und fragen, welche Kombination den besten Vorhersagewert hat.

### Slippage-Schutz {#slippage-protection}

Derzeit gibt es keinen [Slippage-Schutz](https://uniswapv3book.com/milestone_3/slippage-protection.html). Wenn das aktuelle Preisangebot 2000 $ beträgt und der erwartete Preis 2100 $ ist, wird der Agent kaufen. Wenn die Kosten jedoch vor dem Kauf durch den Agenten auf 2200 $ steigen, macht es keinen Sinn mehr zu kaufen.

Um einen Slippage-Schutz zu implementieren, geben Sie einen `amountOutMinimum`-Wert in den Zeilen 325 und 334 von [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325) an.

## Fazit {#conclusion}

Hoffentlich wissen Sie jetzt genug, um mit KI-Agenten loszulegen. Dies ist kein umfassender Überblick über das Thema; es gibt ganze Bücher, die sich dem widmen, aber dies reicht aus, um Ihnen den Einstieg zu erleichtern. Viel Glück!

[Weitere meiner Arbeiten finden Sie hier](https://cryptodocguy.pro/).