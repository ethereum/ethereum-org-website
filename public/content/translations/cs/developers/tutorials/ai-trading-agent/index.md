---
title: "Vytvořte si vlastního AI obchodního agenta na Ethereu"
description: "V tomto tutoriálu se naučíte, jak vytvořit jednoduchého AI obchodního agenta. Tento agent čte informace z blockchainu, požádá LLM o doporučení na základě těchto informací, provádí obchod, který LLM doporučí, a pak čeká a opakuje."
author: Ori Pomerantz
tags: [ "AI", "obchodování", "agent", "python" ]
skill: intermediate
published: 2026-02-13
lang: cs
sidebarDepth: 3
---

V tomto tutoriálu se naučíte, jak sestavit jednoduchého AI obchodního agenta. Tento agent funguje pomocí těchto kroků:

1. Přečtěte si aktuální a minulé ceny tokenu, stejně jako další potenciálně relevantní informace
2. Sestavte dotaz s těmito informacemi spolu s doplňujícími informacemi k vysvětlení, jak by to mohlo být relevantní
3. Odešlete dotaz a obdržíte zpět předpokládanou cenu
4. Obchodujte na základě doporučení
5. Počkejte a opakujte

Tento agent demonstruje, jak číst informace, přeložit je do dotazu, který poskytne použitelnou odpověď, a použít tuto odpověď. Všechny tyto kroky jsou nutné pro agenta AI. Tento agent je implementován v Pythonu, protože je to nejběžnější jazyk používaný v AI.

## Proč to dělat? {#why-do-this}

Automatizovaní obchodní agenti umožňují vývojářům vybrat a provést obchodní strategii. [Agenti AI](/ai-agents) umožňují složitější a dynamičtější obchodní strategie, potenciálně s využitím informací a algoritmů, o jejichž použití vývojář ani neuvažoval.

## Nástroje {#tools}

Tento tutoriál používá [Python](https://www.python.org/), knihovnu [Web3](https://web3py.readthedocs.io/en/stable/) a [Uniswap v3](https://github.com/Uniswap/v3-periphery) pro nabídky a obchodování.

### Proč Python? {#python}

Nejrozšířenějším jazykem pro AI je [Python](https://www.python.org/), takže ho použijeme i tady. Nebojte se, pokud neznáte Python. Tento jazyk je velmi srozumitelný a já vám přesně vysvětlím, co dělá.

[Knihovna Web3](https://web3py.readthedocs.io/en/stable/) je nejběžnější Python API pro Ethereum. Její použití je celkem snadné.

### Obchodování na blockchainu {#trading-on-blockchain}

Existuje [mnoho decentralizovaných burz (DEX)](/apps/categories/defi/), které vám umožní obchodovat s tokeny na Ethereu. Nicméně mívají podobné směnné kurzy kvůli [arbitráži](/developers/docs/smart-contracts/composability/#better-user-experience).

[Uniswap](https://app.uniswap.org/) je široce používaná DEX, kterou můžeme použít jak pro nabídky (pro zobrazení relativních hodnot tokenů), tak pro obchody.

### OpenAI {#openai}

Pro velký jazykový model jsem se rozhodl začít s [OpenAI](https://openai.com/). Abyste mohli spustit aplikaci v tomto tutoriálu, budete muset zaplatit za přístup k API. Minimální platba 5 $ je více než dostačující.

## Vývoj, krok za krokem {#step-by-step}

Pro zjednodušení vývoje postupujeme po etapách. Každý krok je větev v GitHubu.

### Začínáme {#getting-started}

Zde jsou kroky, jak začít v systémech UNIX nebo Linux (včetně [WSL](https://learn.microsoft.com/en-us/windows/wsl/install))

1. Pokud ho ještě nemáte, stáhněte a nainstalujte [Python](https://www.python.org/downloads/).

2. Naklonujte repozitář na GitHubu.

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. Nainstalujte si [`uv`](https://docs.astral.sh/uv/getting-started/installation/). Příkaz na vašem systému se může lišit.

   ```sh
   pipx install uv
   ```

4. Stáhněte si knihovny.

   ```sh
   uv sync
   ```

5. Aktivujte virtuální prostředí.

   ```sh
   source .venv/bin/activate
   ```

6. Chcete-li ověřit, že Python a Web3 fungují správně, spusťte `python3` a zadejte do něj tento program. Můžete jej zadat na příkazový řádek `>>>`, není třeba vytvářet soubor.

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### Čtení z blockchainu {#read-blockchain}

Dalším krokem je čtení z blockchainu. K tomu se musíte přepnout na větev `02-read-quote` a poté pomocí `uv` spustit program.

```sh
git checkout 02-read-quote
uv run agent.py
```

Měli byste obdržet seznam objektů `Quote`, každý s časovým razítkem, cenou a aktivem (v současnosti vždy `WETH/USDC`).

Zde je vysvětlení řádek po řádku.

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

Importujte knihovny, které potřebujeme. Jsou vysvětleny níže, když jsou použity.

```python
print = functools.partial(print, flush=True)
```

Nahrazuje pythonovský `print` verzí, která vždy okamžitě vyprázdní výstup. To je užitečné v dlouho běžícím skriptu, protože nechceme čekat na aktualizace stavu nebo na výstup pro ladění.

```python
MAINNET_URL = "https://eth.drpc.org"
```

URL pro přístup na hlavní síť. Můžete si ji pořídit z [uzlu jako služby](/developers/docs/nodes-and-clients/nodes-as-a-service/) nebo použít jednu z těch, které jsou inzerovány na [Chainlistu](https://chainlist.org/chain/1).

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

Blok na hlavní síti Etherea se obvykle objeví každých dvanáct sekund, takže toto jsou počty bloků, které bychom očekávali, že se objeví v daném časovém období. Upozorňujeme, že se nejedná o přesný údaj. Když je [navrhovatel bloku](/developers/docs/consensus-mechanisms/pos/block-proposal/) mimo provoz, tento blok je přeskočen a čas do dalšího bloku je 24 sekund. Kdybychom chtěli získat přesný blok pro časové razítko, použili bychom [binární vyhledávání](https://en.wikipedia.org/wiki/Binary_search). Pro naše účely je to však dostatečně blízko. Předpovídání budoucnosti není exaktní věda.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

Velikost cyklu. Jednou za cyklus přezkoumáme nabídky a pokusíme se odhadnout hodnotu na konci dalšího cyklu.

```python
# Adresa fondu, který čteme
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

Hodnoty nabídky jsou převzaty z fondu Uniswap 3 USDC/WETH na adrese [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract). Tato adresa je již ve formě kontrolního součtu, ale je lepší použít [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address), aby byl kód znovu použitelný.

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

Toto jsou [ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) pro dvě smlouvy, které potřebujeme kontaktovat. Aby byl kód stručný, zahrnuli jsme pouze funkce, které potřebujeme volat.

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

Inicializujte knihovnu [`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) a připojte se k uzlu Ethereum.

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

Toto je jeden ze způsobů, jak v Pythonu vytvořit datovou třídu. Datový typ [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) se používá pro připojení ke smlouvě. Všimněte si `(frozen=True)`. V Pythonu jsou [booleany](https://en.wikipedia.org/wiki/Boolean_data_type) definovány jako `True` nebo `False` s velkým písmenem. Tato datová třída je `frozen` (zmrazená), což znamená, že pole nelze upravovat.

Všimněte si odsazení. Na rozdíl od [jazyků odvozených od C](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages), Python používá k označení bloků odsazení. Interpret Pythonu ví, že následující definice není součástí této datové třídy, protože nezačíná na stejném odsazení jako pole datové třídy.

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

Typ [`Decimal`](https://docs.python.org/3/library/decimal.html) se používá pro přesnou práci s desetinnými zlomky.

```python
    def get_price(self, block: int) -> Decimal:
```

Takto se definuje funkce v Pythonu. Definice je odsazena, aby bylo vidět, že je stále součástí `PoolInfo`.

Ve funkci, která je součástí datové třídy, je prvním parametrem vždy `self`, instance datové třídy, která zde volala. Zde je další parametr, číslo bloku.

```python
        assert block <= w3.eth.block_number, "Blok je v budoucnosti"
```

Kdybychom uměli číst budoucnost, nepotřebovali bychom AI pro obchodování.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

Syntaxe pro volání funkce na EVM z Web3 je tato: `<contract object>.functions.<function name>().call(<parameters>)`. Parametry mohou být parametry funkce EVM (pokud nějaké jsou; zde nejsou) nebo [pojmenované parametry](https://en.wikipedia.org/wiki/Named_parameter) pro úpravu chování blockchainu. Zde používáme jeden, `block_identifier`, pro určení [čísla bloku](/developers/docs/apis/json-rpc/#default-block), ve kterém chceme pracovat.

Výsledkem je [tato struktura ve formě pole](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72). První hodnota je funkcí směnného kurzu mezi dvěma tokeny.

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

Pro snížení výpočtů na blockchainu Uniswap v3 neukládá skutečný směnný kurz, ale spíše jeho druhou odmocninu. Protože EVM nepodporuje matematiku s plovoucí desetinnou čárkou ani zlomky, místo skutečné hodnoty je odpověď <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5</mo><msup><mn>2</mn><mn>96</mn></msup></math>

```python
         # (token1 za token0)
        return 1/(raw_price * self.decimal_factor)
```

Hrubá cena, kterou dostaneme, je počet `token0`, které získáme za každý `token1`. V našem fondu je `token0` USDC (stabilní kryptoměna se stejnou hodnotou jako americký dolar) a `token1` je [WETH](https://opensea.io/learn/blockchain/what-is-weth). Hodnota, kterou skutečně chceme, je počet dolarů za WETH, ne inverzní.

Desetinný faktor je poměr mezi [desetinnými faktory](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) pro oba tokeny.

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

Tato datová třída představuje nabídku: cenu konkrétního aktiva v daném časovém okamžiku. V tomto okamžiku je pole `asset` irelevantní, protože používáme jeden fond, a proto máme jedno aktivum. Později však přidáme další aktiva.

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

Tato funkce přebírá adresu a vrací informace o tokenové smlouvě na této adrese. Pro vytvoření nové smlouvy [Web3 `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) poskytneme adresu a ABI do `w3.eth.contract`.

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

Tato funkce vrací vše, co potřebujeme o [konkrétním fondu](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol). Syntaxe `f"<string>"` je [formátovaný řetězec](https://docs.python.org/3/reference/lexical_analysis.html#f-strings).

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

Získání objektu `Quote`. Výchozí hodnota pro `block_number` je `None` (žádná hodnota).

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

Pokud nebylo zadáno číslo bloku, použije se `w3.eth.block_number`, což je poslední číslo bloku. Toto je syntaxe pro [příkaz `if`](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement).

Mohlo by se zdát, že by bylo lepší nastavit výchozí hodnotu na `w3.eth.block_number`, ale to nefunguje dobře, protože by to bylo číslo bloku v době definování funkce. V dlouhodobě běžícím agentovi by to byl problém.

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

Použijte [knihovnu `datetime`](https://docs.python.org/3/library/datetime.html) k formátování do formátu čitelného pro lidi a velké jazykové modely (LLM). Použijte [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize) k zaokrouhlení hodnoty na dvě desetinná místa.

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

V Pythonu se definuje [seznam](https://docs.python.org/3/library/stdtypes.html#typesseq-list), který může obsahovat pouze určitý typ, pomocí `list[<type>]`.

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

V Pythonu [`for` cyklus](https://docs.python.org/3/tutorial/controlflow.html#for-statements) obvykle prochází seznam. Seznam čísel bloků, ve kterých se mají hledat nabídky, pochází z [`range`](https://docs.python.org/3/library/stdtypes.html#range).

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

Pro každé číslo bloku získá objekt `Quote` a přidá jej do seznamu `quotes`. Poté tento seznam vrátí.

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

Toto je hlavní kód skriptu. Přečte informace o fondu, získá dvanáct nabídek a [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint) je vytiskne.

### Vytvoření výzvy {#prompt}

Dále musíme tento seznam nabídek převést na výzvu pro LLM a získat očekávanou budoucí hodnotu.

```sh
git checkout 03-create-prompt
uv run agent.py
```

Výstupem nyní bude výzva pro LLM, podobná této:

```
Vzhledem k těmto nabídkám:
Aktivum: WETH/USDC
        2026-01-20T16:34 3016.21
        .
        .
        .
        2026-02-01T17:49 2299.10

Aktivum: WBTC/WETH
        2026-01-20T16:34 29.84
        .
        .
        .
        2026-02-01T17:50 33.46


Jakou hodnotu byste očekávali pro WETH/USDC v čase 2026-02-02T17:56?

Poskytněte odpověď jako jediné číslo zaokrouhlené na dvě desetinná místa,
bez jakéhokoli dalšího textu.
```

Všimněte si, že zde jsou nabídky pro dvě aktiva, `WETH/USDC` a `WBTC/WETH`. Přidání nabídek z jiného aktiva může zlepšit přesnost předpovědi.

#### Jak vypadá výzva {#prompt-explanation}

Tato výzva obsahuje tři sekce, které jsou v LLM výzvách poměrně běžné.

1. Informace. LLM mají spoustu informací ze svého trénování, ale obvykle nemají nejnovější. To je důvod, proč zde musíme získat nejnovější nabídky. Přidávání informací do výzvy se nazývá [retrieval augmented generation (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation).

2. Skutečná otázka. To je to, co chceme vědět.

3. Pokyny pro formátování výstupu. Normálně nám LLM dá odhad s vysvětlením, jak k němu dospěl. To je lepší pro lidi, ale počítačový program potřebuje pouze výsledek.

#### Vysvětlení kódu {#prompt-code}

Zde je nový kód.

```python
from datetime import datetime, timezone, timedelta
```

Musíme poskytnout LLM čas, pro který chceme odhad. Pro získání času „n minut/hodin/dní“ v budoucnu používáme [třídu `timedelta`](https://docs.python.org/3/library/datetime.html#datetime.timedelta).

```python
# Adresy fondů, které čteme
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

Máme dva fondy, které musíme přečíst.

```python
@dataclass(frozen=True)
class PoolInfo:
    .
    .
    .
    reverse: bool = False

    def get_price(self, block: int) -> Decimal:
        assert block <= w3.eth.block_number, "Blok je v budoucnosti"
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (token1 za token0)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

Ve fondu WETH/USDC chceme vědět, kolik `token0` (USDC) potřebujeme k nákupu jednoho `token1` (WETH). Ve fondu WETH/WBTC chceme vědět, kolik `token1` (WETH) potřebujeme k nákupu jednoho `token0` (WBTC, což je wrapped Bitcoin). Musíme sledovat, zda je třeba poměr fondu obrátit.

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

Abychom věděli, zda je třeba fond obrátit, musíme to získat jako vstup do `read_pool`. Také je třeba správně nastavit symbol aktiva.

Syntaxe `<a> if <b> else <c>` je pythonovský ekvivalent [ternárního podmíněného operátoru](https://en.wikipedia.org/wiki/Ternary_conditional_operator), který by v jazyce odvozeném od C byl `<b> ? <a> : <c>`.

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

Tato funkce sestaví řetězec, který formátuje seznam objektů `Quote`, za předpokladu, že se všechny vztahují ke stejnému aktivu.

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

V Pythonu se [víceřádkové řetězcové literály](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) zapisují jako `"""` .... `"""`.

```python
Vzhledem k těmto nabídkám:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

Zde používáme vzor [MapReduce](https://en.wikipedia.org/wiki/MapReduce) k vygenerování řetězce pro každý seznam nabídek pomocí `format_quotes`, a pak je zredukujeme do jediného řetězce pro použití ve výzvě.

```python
Jakou hodnotu byste očekávali pro {asset} v čase {expected_time}?

Poskytněte odpověď jako jediné číslo zaokrouhlené na dvě desetinná místa,
bez jakéhokoli dalšího textu.
    """
```

Zbytek výzvy je podle očekávání.

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

Přezkoumejte oba fondy a získejte nabídky z obou.

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

Určete budoucí časový bod, pro který chcete odhad, a vytvořte výzvu.

### Propojení s LLM {#interface-llm}

Dále vyzveme skutečný LLM a získáme očekávanou budoucí hodnotu. Tento program jsem napsal pomocí OpenAI, takže pokud chcete použít jiného poskytovatele, budete ho muset upravit.

1. Získejte [účet OpenAI](https://auth.openai.com/create-account)

2. [Vložte peníze na účet](https://platform.openai.com/settings/organization/billing/overview) — minimální částka v době psaní je 5 $

3. [Vytvořte API klíč](https://platform.openai.com/settings/organization/api-keys)

4. V příkazovém řádku exportujte API klíč, aby ho váš program mohl použít

   ```sh
   export OPENAI_API_KEY=sk-<sem patří zbytek klíče>
   ```

5. Checkout a spuštění agenta

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

Zde je nový kód.

```python
from openai import OpenAI

open_ai = OpenAI() # Klient čte proměnnou prostředí OPENAI_API_KEY
```

Import a instancování API OpenAI.

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

Zavolejte API OpenAI (`open_ai.chat.completions.create`) pro vytvoření odpovědi.

```python
expected_price = Decimal(response.choices[0].message.content.strip())
current_price = wethusdc_quotes[-1].price

print ("Aktuální cena:", wethusdc_quotes[-1].price)
print(f"V {future_time} je očekávaná cena: {expected_price} USD")

if (expected_price > current_price):
    print(f"Nákup, očekávám, že cena vzroste o {expected_price - current_price} USD")
else:
    print(f"Prodej, očekávám, že cena klesne o {current_price - expected_price} USD")
```

Vypište cenu a poskytněte doporučení na nákup nebo prodej.

#### Testování předpovědí {#testing-the-predictions}

Nyní, když můžeme generovat předpovědi, můžeme také použít historická data k posouzení, zda produkujeme užitečné předpovědi.

```sh
uv run test-predictor.py
```

Očekávaný výsledek je podobný:

```
Předpověď pro 2026-01-05T19:50: předpovězeno 3138,93 USD, reálná 3218,92 USD, chyba 79,99 USD
Předpověď pro 2026-01-06T19:56: předpovězeno 3243,39 USD, reálná 3221,08 USD, chyba 22,31 USD
Předpověď pro 2026-01-07T20:02: předpovězeno 3223,24 USD, reálná 3146,89 USD, chyba 76,35 USD
Předpověď pro 2026-01-08T20:11: předpovězeno 3150,47 USD, reálná 3092,04 USD, chyba 58,43 USD
.
.
.
Předpověď pro 2026-01-31T22:33: předpovězeno 2637,73 USD, reálná 2417,77 USD, chyba 219,96 USD
Předpověď pro 2026-02-01T22:41: předpovězeno 2381,70 USD, reálná 2318,84 USD, chyba 62,86 USD
Předpověď pro 2026-02-02T22:49: předpovězeno 2234,91 USD, reálná 2349,28 USD, chyba 114,37 USD
Průměrná chyba předpovědi u 29 předpovědí: 83,87103448275862068965517241 USD
Průměrná změna na doporučení: 4,787931034482758620689655172 USD
Standardní odchylka změn: 104,42 USD
Ziskové dny: 51,72%
Ztrátové dny: 48,28%
```

Většina testeru je identická s agentem, ale zde jsou části, které jsou nové nebo upravené.

```python
CYCLES_FOR_TEST = 40 # Pro zpětné testování, kolik cyklů testujeme

# Získání velkého množství nabídek
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

Díváme se na `CYCLES_FOR_TEST` (zde uvedeno jako 40) dní zpět.

```python
# Vytvoření předpovědí a jejich kontrola vůči skutečné historii

total_error = Decimal(0)
changes = []
```

Zajímají nás dva typy chyb. První, `total_error`, je jednoduše součet chyb, které prediktor udělal.

Pro pochopení druhé, `changes`, si musíme připomenout účel agenta. Není to předpovídání poměru WETH/USDC (cena ETH). Je to vydávání doporučení na prodej a nákup. Pokud je cena aktuálně 2000 $ a předpovídá 2010 $ zítra, nevadí nám, pokud bude skutečný výsledek 2020 $ a vyděláme více peněz. Ale _vadí_ nám, když předpověděl 2010 $, na základě tohoto doporučení koupil ETH a cena klesla na 1990 $.

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

Můžeme se podívat pouze na případy, kdy je k dispozici kompletní historie (hodnoty použité pro predikci a reálná hodnota pro srovnání). To znamená, že nejnovější případ musí být ten, který začal před `CYCLES_BACK`.

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

Použijte [řezy](https://www.w3schools.com/python/ref_func_slice.asp) k získání stejného počtu vzorků, jaké používá agent. Kód mezi tímto a dalším segmentem je stejný kód pro získání predikce, který máme v agentu.

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

Získejte předpokládanou cenu, skutečnou cenu a cenu v době předpovědi. Cenu v době předpovědi potřebujeme k určení, zda bylo doporučeno nakoupit nebo prodat.

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Předpověď pro {prediction_time}: předpovězeno {predicted_price} USD, skutečná {real_price} USD, chyba {error} USD")
```

Zjistěte chybu a přičtěte ji k celkové.

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

Pro `changes` chceme peněžní dopad nákupu nebo prodeje jednoho ETH. Nejprve tedy musíme určit doporučení, poté posoudit, jak se skutečná cena změnila, a zda doporučení vydělalo peníze (pozitivní změna) nebo stálo peníze (negativní změna).

```python
print (f"Průměrná chyba předpovědi pro {len(wethusdc_quotes)-CYCLES_BACK} předpovědí: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Průměrná změna na doporučení: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Standardní odchylka změn: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

Vypište výsledky.

```python
print (f"Ziskové dny: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Ztrátové dny: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

Použijte [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) k počítání počtu ziskových a ztrátových dnů. Výsledkem je objekt filtru, který je třeba převést na seznam, abychom získali jeho délku.

### Odesílání transakcí {#submit-txn}

Nyní musíme skutečně odesílat transakce. Nechci však v tomto okamžiku utrácet skutečné peníze, než se systém osvědčí. Místo toho vytvoříme lokální větev hlavní sítě a „obchodovat“ budeme v této síti.

Zde jsou kroky k vytvoření lokální větve a povolení obchodování.

1. Nainstalujte si [Foundry](https://getfoundry.sh/introduction/installation)

2. Spusťte [`anvil`](https://getfoundry.sh/anvil/overview)

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` naslouchá na výchozí URL pro Foundry, http://localhost:8545, takže nemusíme specifikovat URL pro příkaz [`cast`](https://getfoundry.sh/cast/overview), který používáme k manipulaci s blockchainem.

3. Při běhu v `anvil` je k dispozici deset testovacích účtů, které mají ETH — nastavte proměnné prostředí pro první z nich

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. Toto jsou smlouvy, které musíme použít. [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) je smlouva Uniswap v3, kterou používáme k samotnému obchodování. Mohli bychom obchodovat přímo přes fond, ale toto je mnohem jednodušší.

   Spodní dvě proměnné jsou cesty Uniswap v3 potřebné pro směnu mezi WETH a USDC.

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. Každý z testovacích účtů má 10 000 ETH. Použijte smlouvu WETH k zabalení 1000 ETH a získejte 1000 WETH pro obchodování.

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. Použijte `SwapRouter` k obchodování 500 WETH za USDC.

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   Volání `approve` vytvoří příspěvek, který umožní `SwapRouter` utratit některé z našich tokenů. Smlouvy nemohou sledovat události, takže pokud bychom převedli tokeny přímo na smlouvu `SwapRouter`, nevěděla by, že byla zaplacena. Místo toho povolíme smlouvě `SwapRouter` utratit určitou částku a poté to `SwapRouter` udělá. To se provádí pomocí funkce volané `SwapRouter`, takže ví, zda byla úspěšná.

7. Ověřte si, že máte dostatek obou tokenů.

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

Nyní, když máme WETH a USDC, můžeme skutečně spustit agenta.

```sh
git checkout 05-trade
uv run agent.py
```

Výstup bude vypadat podobně jako:

```
(ai-trading-agent) qbzzt@Ori-Cloudnomics:~/260215-ai-agent$ uv run agent.py
Aktuální cena: 1843.16
V 2026-02-06T23:07, očekávaná cena: 1724.41 USD
Stavy účtů před obchodem:
USDC Zůstatek: 927301.578272
WETH Zůstatek: 500
Prodej, očekávám, že cena klesne o 118.75 USD
Schvalovací transakce odeslána: 74e367ddbb407c1aaf567d87aa5863049991b1d2aa092b6b85195d925e2bd41f
Schvalovací transakce vytěžena.
Prodejní transakce odeslána: fad1bcf938585c9e90364b26ac7a80eea9efd34c37e5db81e58d7655bcae28bf
Prodejní transakce vytěžena.
Stavy účtů po obchodě:
USDC Zůstatek: 929143.797116
WETH Zůstatek: 499
```

Pro skutečné použití potřebujete několik drobných změn.

- Na řádku 14 změňte `MAINNET_URL` na skutečný přístupový bod, například `https://eth.drpc.org`
- Na řádku 28 změňte `PRIVATE_KEY` na váš vlastní privátní klíč
- Pokud nejste velmi bohatí a nemůžete si dovolit kupovat nebo prodávat 1 ETH každý den pro neprověřeného agenta, možná budete chtít změnit řádek 29 a snížit `WETH_TRADE_AMOUNT`

#### Vysvětlení kódu {#trading-code}

Zde je nový kód.

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

Stejné proměnné, které jsme použili v kroku 4.

```python
WETH_TRADE_AMOUNT=1
```

Částka k obchodování.

```python
ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... },
    { "name": "balanceOf", ...},
    { "name": "approve", ...}
]
```

K samotnému obchodování potřebujeme funkci `approve`. Chceme také zobrazit zůstatky před a po, takže potřebujeme také `balanceOf`.

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

V ABI `SwapRouter` potřebujeme pouze `exactInput`. Existuje příbuzná funkce `exactOutput`, kterou bychom mohli použít k nákupu přesně jednoho WETH, ale pro jednoduchost používáme `exactInput` v obou případech.

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

Definice Web3 pro [`účet`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) a smlouvu `SwapRouter`.

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

Parametry transakce. Potřebujeme zde funkci, protože [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) se musí pokaždé měnit.

```python
def approve_token(contract: Contract, amount: int):
```

Schvalte povolenku tokenu pro `SwapRouter`.

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

Takto posíláme transakci v Web3. Nejprve použijeme [objekt `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) k vytvoření transakce. Poté použijeme [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) k podepsání transakce pomocí `PRIVATE_KEY`. Nakonec použijeme [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) k odeslání transakce.

```python
    print(f"Schvalovací transakce odeslána: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Schvalovací transakce vytěžena.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) čeká, dokud transakce není vytěžena. V případě potřeby vrátí potvrzení.

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

Toto jsou parametry pro prodej WETH.

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

Na rozdíl od `SELL_PARAMS`, parametry pro nákup se mohou měnit. Vstupní částka je cena 1 WETH, jak je uvedeno v `quote`.

```python
def buy(quote: Quote):
    buy_params = make_buy_params(quote)
    approve_token(wethusdc_pool.token0.contract, buy_params["amountIn"])
    txn = swap_router.functions.exactInput(buy_params).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"Nákupní transakce odeslána: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Nákupní transakce vytěžena.")


def sell():
    approve_token(wethusdc_pool.token1.contract,
                  WETH_TRADE_AMOUNT * 10**wethusdc_pool.token1.decimals)
    txn = swap_router.functions.exactInput(SELL_PARAMS).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"Prodejní transakce odeslána: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Prodejní transakce vytěžena.")
```

Funkce `buy()` a `sell()` jsou téměř identické. Nejprve schválíme dostatečnou povolenku pro `SwapRouter` a poté ho zavoláme se správnou cestou a částkou.

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Zůstatek: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Zůstatek: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

Hlásit zůstatky uživatelů v obou měnách.

```python
print("Stav účtu před obchodem:")
balances()

if (expected_price > current_price):
    print(f"Nákup, očekávám, že cena vzroste o {expected_price - current_price} USD")
    buy(wethusdc_quotes[-1])
else:
    print(f"Prodej, očekávám, že cena klesne o {current_price - expected_price} USD")
    sell()

print("Stav účtu po obchodě:")
balances()
```

Tento agent v současné době funguje pouze jednou. Můžete ho však upravit tak, aby pracoval nepřetržitě, buď spuštěním z [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) nebo zabalením řádků 368–400 do smyčky a použitím [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) k čekání, dokud nenastane čas na další cyklus.

## Možná vylepšení {#improvements}

Toto není plná produkční verze; je to pouze příklad pro naučení základů. Zde jsou některé nápady na vylepšení.

### Chytřejší obchodování {#smart-trading}

Existují dvě důležité skutečnosti, které agent ignoruje při rozhodování, co dělat.

- _Velikost očekávané změny_. Agent prodává pevnou částku `WETH`, pokud se očekává pokles ceny, bez ohledu na velikost poklesu.
  Dalo by se namítnout, že by bylo lepší ignorovat drobné změny a prodávat na základě toho, jak moc očekáváme pokles ceny.
- _Současné portfolio_. Pokud je 10 % vašeho portfolia v WETH a myslíte si, že cena poroste, pravděpodobně má smysl koupit více. Pokud je ale 90 % vašeho portfolia v WETH, můžete být dostatečně exponovaní a není třeba kupovat více. Opačně to platí, pokud očekáváte pokles ceny.

### Co když chcete udržet svou obchodní strategii v tajnosti? {#secret}

Prodejci AI mohou vidět dotazy, které posíláte jejich LLM, což by mohlo odhalit geniální obchodní systém, který jste vyvinuli se svým agentem. Obchodní systém, který používá příliš mnoho lidí, je bezcenný, protože příliš mnoho lidí se snaží nakupovat, když chcete nakupovat (a cena stoupá) a snaží se prodávat, když chcete prodávat (a cena klesá).

Tomuto problému se můžete vyhnout spuštěním LLM lokálně, například pomocí [LM-Studio](https://lmstudio.ai/).

### Od AI bota k AI agentovi {#bot-to-agent}

Můžete dobře argumentovat, že se jedná o [AI bota, nikoli AI agenta](/ai-agents/#ai-agents-vs-ai-bots). Implementuje relativně jednoduchou strategii, která se opírá o předdefinované informace. Můžeme umožnit sebezdokonalování, například poskytnutím seznamu fondů Uniswap v3 a jejich nejnovějších hodnot a zeptat se, která kombinace má nejlepší prediktivní hodnotu.

### Ochrana proti prokluzu {#slippage-protection}

V současné době neexistuje žádná [ochrana proti prokluzu](https://uniswapv3book.com/milestone_3/slippage-protection.html). Pokud je aktuální nabídka 2000 $ a očekávaná cena je 2100 $, agent nakoupí. Pokud však předtím, než agent nakoupí, cena vzroste na 2200 $, už nemá smysl nakupovat.

Pro implementaci ochrany proti prokluzu zadejte hodnotu `amountOutMinimum` na řádcích 325 a 334 v [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325).

## Závěr {#conclusion}

Doufejme, že nyní víte dost na to, abyste mohli začít s agenty AI. Toto není komplexní přehled tématu; jsou o tom celé knihy, ale to stačí na to, abyste mohli začít. Hodně štěstí!

[Více z mé práce najdete zde](https://cryptodocguy.pro/).
