---
title: Vytvořte si vlastního obchodního AI agenta na Ethereu
description: V tomto tutoriálu se naučíte, jak vytvořit jednoduchého obchodního AI agenta. Tento agent čte informace z blockchainu, požádá LLM o doporučení na základě těchto informací, provede obchod, který LLM doporučí, a poté čeká a proces opakuje.
author: Ori Pomerantz
tags:
  - AI
  - obchodování
  - agent
  - Python
skill: intermediate
breadcrumb: Obchodní AI agent
published: 2026-02-13
lang: cs
sidebarDepth: 3
---

V tomto tutoriálu se naučíte, jak vytvořit jednoduchého obchodního AI agenta. Tento agent funguje v následujících krocích:

1. Přečte aktuální a minulé ceny tokenu a další potenciálně relevantní informace.
2. Vytvoří dotaz s těmito informacemi spolu s kontextem, který vysvětluje, jak by mohly být relevantní.
3. Odešle dotaz a obdrží zpět odhadovanou cenu.
4. Provede obchod na základě doporučení.
5. Počká a proces zopakuje.

Tento agent ukazuje, jak číst informace, převést je na dotaz, který přinese použitelnou odpověď, a tuto odpověď využít. Všechny tyto kroky jsou pro AI agenta nezbytné. Tento agent je implementován v jazyce Python, protože jde o nejběžnější jazyk používaný v oblasti AI.

## Proč to dělat? {#why-do-this}

Automatizovaní obchodní agenti umožňují vývojářům vybrat a provádět obchodní strategii. [AI agenti](/ai-agents) umožňují složitější a dynamičtější obchodní strategie, které mohou využívat informace a algoritmy, o kterých vývojář ani neuvažoval.

## Nástroje {#tools}

Tento tutoriál používá [Python](https://www.python.org/), [knihovnu Web3](https://web3py.readthedocs.io/en/stable/) a [Uniswap v3](https://github.com/Uniswap/v3-periphery) pro získávání cenových nabídek a obchodování.

### Proč Python? {#python}

Nejpoužívanějším jazykem pro AI je [Python](https://www.python.org/), proto ho zde použijeme. Nebojte se, pokud Python neznáte. Tento jazyk je velmi srozumitelný a já přesně vysvětlím, co dělá.

[Knihovna Web3](https://web3py.readthedocs.io/en/stable/) je nejběžnější Python API pro Ethereum. Její použití je poměrně snadné.

### Obchodování na blockchainu {#trading-on-blockchain}

Existuje [mnoho decentralizovaných burz (DEX)](/apps/categories/defi/), které vám umožňují obchodovat s tokeny na Ethereu. Vzhledem k [arbitráži](/developers/docs/smart-contracts/composability/#better-user-experience) však mívají podobné směnné kurzy.

[Uniswap](https://app.uniswap.org/) je široce používaná DEX, kterou můžeme využít jak pro cenové nabídky (abychom viděli relativní hodnoty tokenů), tak pro obchody.

### OpenAI {#openai}

Jako velký jazykový model (LLM) jsem pro začátek zvolil [OpenAI](https://openai.com/). Ke spuštění aplikace v tomto tutoriálu si budete muset zaplatit přístup k API. Minimální platba 5 dolarů je více než dostačující.

## Vývoj krok za krokem {#step-by-step}

Abychom vývoj zjednodušili, budeme postupovat po fázích. Každý krok představuje větev na GitHubu.

### Začínáme {#getting-started}

Zde jsou kroky, jak začít v systémech UNIX nebo Linux (včetně [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)):

1. Pokud ho ještě nemáte, stáhněte si a nainstalujte [Python](https://www.python.org/downloads/).

2. Naklonujte si repozitář z GitHubu.

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. Nainstalujte [`uv`](https://docs.astral.sh/uv/getting-started/installation/). Příkaz ve vašem systému se může lišit.

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

6. Chcete-li ověřit, že Python a Web3 fungují správně, spusťte `python3` a zadejte tento program. Můžete jej zadat přímo do příkazového řádku `>>>`; není nutné vytvářet soubor.

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### Čtení z blockchainu {#read-blockchain}

Dalším krokem je čtení z blockchainu. K tomu je třeba přepnout na větev `02-read-quote` a poté pomocí `uv` spustit program.

```sh
git checkout 02-read-quote
uv run agent.py
```

Měli byste obdržet seznam objektů `Quote`, z nichž každý obsahuje časové razítko, cenu a aktivum (v současnosti vždy `WETH/USDC`).

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

Importujeme knihovny, které potřebujeme. Jsou vysvětleny níže při jejich použití.

```python
print = functools.partial(print, flush=True)
```

Nahrazuje `print` v Pythonu verzí, která vždy okamžitě vyprazdňuje výstup (flush). To je užitečné u dlouho běžícího skriptu, protože nechceme čekat na aktualizace stavu nebo ladicí výstup.

```python
MAINNET_URL = "https://eth.drpc.org"
```

URL adresa pro přístup na Mainnet. Můžete ji získat z [uzlu jako služby (Node as a service)](/developers/docs/nodes-and-clients/nodes-as-a-service/) nebo použít některou z těch, které jsou inzerovány na [Chainlistu](https://chainlist.org/chain/1).

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

Blok na síti Ethereum Mainnet se obvykle vytvoří každých dvanáct sekund, takže toto je počet bloků, které bychom očekávali v daném časovém období. Upozorňujeme, že se nejedná o přesný údaj. Když je [navrhovatel bloku](/developers/docs/consensus-mechanisms/pos/block-proposal/) nedostupný, tento blok se přeskočí a čas do dalšího bloku je 24 sekund. Pokud bychom chtěli získat přesný blok pro dané časové razítko, použili bychom [binární vyhledávání](https://en.wikipedia.org/wiki/Binary_search). Pro naše účely je to však dostatečně blízko. Předpovídání budoucnosti není exaktní věda.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

Velikost cyklu. Cenové nabídky kontrolujeme jednou za cyklus a snažíme se odhadnout hodnotu na konci dalšího cyklu.

```python
# Adresa poolu, který čteme
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

Hodnoty cenových nabídek jsou převzaty z poolu Uniswap v3 USDC/WETH na adrese [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract). Tato adresa je již ve formátu s kontrolním součtem (checksum), ale je lepší použít [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address), aby byl kód znovu použitelný.

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

Toto jsou [ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) pro dva kontrakty, které potřebujeme kontaktovat. Aby byl kód stručný, zahrnujeme pouze funkce, které potřebujeme volat.

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

Inicializujeme knihovnu [`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) a připojíme se k uzlu Etherea.

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

Toto je jeden ze způsobů, jak vytvořit datovou třídu v Pythonu. Datový typ [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) se používá k připojení ke kontraktu. Všimněte si `(frozen=True)`. V Pythonu jsou [booleovské hodnoty](https://en.wikipedia.org/wiki/Boolean_data_type) definovány jako `True` nebo `False` s velkým počátečním písmenem. Tato datová třída je `frozen`, což znamená, že její pole nelze upravovat.

Všimněte si odsazení. Na rozdíl od [jazyků odvozených od C](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages) používá Python k označení bloků odsazení. Interpret Pythonu ví, že následující definice není součástí této datové třídy, protože nezačíná na stejném odsazení jako pole datové třídy.

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

Typ [`Decimal`](https://docs.python.org/3/library/decimal.html) se používá pro přesné zpracování desetinných zlomků.

```python
    def get_price(self, block: int) -> Decimal:
```

Tímto způsobem se v Pythonu definuje funkce. Definice je odsazená, aby bylo zřejmé, že je stále součástí `PoolInfo`.

Ve funkci, která je součástí datové třídy, je prvním parametrem vždy `self`, instance datové třídy, která byla volána. Zde je ještě další parametr, číslo bloku.

```python
        assert block <= w3.eth.block_number, "Block is in the future"
```

Kdybychom uměli číst budoucnost, nepotřebovali bychom k obchodování AI.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

Syntaxe pro volání funkce na EVM z Web3 je následující: `<contract object>.functions.<function name>().call(<parameters>)`. Parametry mohou být parametry funkce EVM (pokud nějaké jsou; zde nejsou) nebo [pojmenované parametry](https://en.wikipedia.org/wiki/Named_parameter) pro úpravu chování blockchainu. Zde používáme jeden, `block_identifier`, k určení [čísla bloku](/developers/docs/apis/json-rpc/#default-block), ve kterém chceme funkci spustit.

Výsledkem je [tato struktura ve formě pole](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72). První hodnota je funkcí směnného kurzu mezi těmito dvěma tokeny.

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

Aby se omezily onchain výpočty, Uniswap v3 neukládá skutečný směnný faktor, ale spíše jeho druhou odmocninu. Protože EVM nepodporuje matematiku s plovoucí desetinnou čárkou ani zlomky, namísto skutečné hodnoty je odpovědí <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5;</mo><msup><mn>2</mn><mn>96</mn></msup></math>

```python
         # (token1 za token0)
        return 1/(raw_price * self.decimal_factor)
```

Hrubá cena, kterou získáme, je počet `token0`, které dostaneme za každý `token1`. V našem poolu je `token0` USDC (stablecoin se stejnou hodnotou jako americký dolar) a `token1` je [zabalený ether (WETH)](https://opensea.io/learn/blockchain/what-is-weth). Hodnota, kterou skutečně chceme, je počet dolarů za WETH, nikoli naopak.

Desetinný faktor je poměr mezi [desetinnými faktory](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) pro tyto dva tokeny.

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

Tato datová třída představuje cenovou nabídku: cenu konkrétního aktiva v daném okamžiku. V tuto chvíli je pole `asset` irelevantní, protože používáme jeden pool, a proto máme jediné aktivum. Později však přidáme další aktiva.

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

Tato funkce přijímá adresu a vrací informace o kontraktu tokenu na této adrese. K vytvoření nového [Web3 `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) poskytneme adresu a ABI do `w3.eth.contract`.

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

Tato funkce vrací vše, co potřebujeme vědět o [konkrétním poolu](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol). Syntaxe `f"<string>"` je [formátovaný řetězec](https://docs.python.org/3/reference/lexical_analysis.html#f-strings).

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

Získá objekt `Quote`. Výchozí hodnota pro `block_number` je `None` (žádná hodnota).

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

Pokud nebylo zadáno číslo bloku, použije se `w3.eth.block_number`, což je číslo nejnovějšího bloku. Toto je syntaxe pro [příkaz `if`](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement).

Mohlo by se zdát, že by bylo lepší nastavit výchozí hodnotu rovnou na `w3.eth.block_number`, ale to nefunguje dobře, protože by to bylo číslo bloku v době definice funkce. U dlouho běžícího agenta by to představovalo problém.

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

Použijte [knihovnu `datetime`](https://docs.python.org/3/library/datetime.html) k formátování do podoby čitelné pro lidi a velké jazykové modely (LLM). Použijte [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize) k zaokrouhlení hodnoty na dvě desetinná místa.

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

V Pythonu definujete [seznam](https://docs.python.org/3/library/stdtypes.html#typesseq-list), který může obsahovat pouze určitý typ, pomocí `list[<type>]`.

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

V Pythonu smyčka [`for`](https://docs.python.org/3/tutorial/controlflow.html#for-statements) obvykle iteruje přes seznam. Seznam čísel bloků, ve kterých se mají hledat cenové nabídky, pochází z [`range`](https://docs.python.org/3/library/stdtypes.html#range).

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

Pro každé číslo bloku získá objekt `Quote` a připojí ho k seznamu `quotes`. Poté tento seznam vrátí.

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

Toto je hlavní kód skriptu. Přečte informace o poolu, získá dvanáct cenových nabídek a [vytiskne](https://docs.python.org/3/library/pprint.html#pprint.pprint) je pomocí `pprint`.

### Vytvoření promptu {#prompt}

Dále musíme tento seznam cenových nabídek převést na prompt pro LLM a získat očekávanou budoucí hodnotu.

```sh
git checkout 03-create-prompt
uv run agent.py
```

Výstupem nyní bude prompt pro LLM, podobný tomuto:

```
Vzhledem k těmto cenovým nabídkám:
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

Uveďte svou odpověď jako jediné číslo zaokrouhlené na dvě desetinná místa,
bez jakéhokoli dalšího textu.
```

Všimněte si, že zde jsou cenové nabídky pro dvě aktiva, `WETH/USDC` a `WBTC/WETH`. Přidání cenových nabídek z dalšího aktiva by mohlo zlepšit přesnost predikce.

#### Jak vypadá prompt {#prompt-explanation}

Tento prompt obsahuje tři části, které jsou v promptech pro LLM poměrně běžné.

1. Informace. LLM mají ze svého tréninku spoustu informací, ale obvykle nemají ty nejnovější. To je důvod, proč zde musíme načíst nejnovější cenové nabídky. Přidávání informací do promptu se nazývá [retrieval augmented generation (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation).

2. Samotná otázka. To je to, co chceme vědět.

3. Pokyny pro formátování výstupu. Normálně nám LLM poskytne odhad s vysvětlením, jak k němu dospěl. To je lepší pro lidi, ale počítačový program potřebuje jen konečný výsledek.

#### Vysvětlení kódu {#prompt-code}

Zde je nový kód.

```python
from datetime import datetime, timezone, timedelta
```

Musíme LLM poskytnout čas, pro který chceme odhad. K získání času „n minut/hodin/dní“ v budoucnosti použijeme [třídu `timedelta`](https://docs.python.org/3/library/datetime.html#datetime.timedelta).

```python
# Adresy poolů, které čteme
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

Máme dva pooly, které potřebujeme přečíst.

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
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (token1 za token0)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

V poolu WETH/USDC chceme vědět, kolik `token0` (USDC) potřebujeme k nákupu jednoho `token1` (WETH). V poolu WETH/WBTC chceme vědět, kolik `token1` (WETH) potřebujeme k nákupu jednoho `token0` (WBTC, což je zabalený Bitcoin). Musíme sledovat, zda je nutné poměr poolu převrátit.

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

Abychom věděli, zda je třeba pool převrátit, získáme to jako vstup do `read_pool`. Také je třeba správně nastavit symbol aktiva.

Syntaxe `<a> if <b> else <c>` je v Pythonu ekvivalentem [ternárního podmíněného operátoru](https://en.wikipedia.org/wiki/Ternary_conditional_operator), který by v jazyce odvozeném od C vypadal jako `<b> ? <a> : <c>`.

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

Tato funkce sestaví řetězec, který formátuje seznam objektů `Quote` za předpokladu, že se všechny týkají stejného aktiva.

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

V Pythonu se [víceřádkové textové řetězce](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) zapisují jako `"""` .... `"""`.

```python
Given these quotes:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

Zde používáme návrhový vzor [MapReduce](https://en.wikipedia.org/wiki/MapReduce) k vygenerování řetězce pro každý seznam cenových nabídek pomocí `format_quotes` a následně je zredukujeme do jediného řetězce pro použití v promptu.

```python
What would you expect the value for {asset} to be at time {expected_time}?

Provide your answer as a single number rounded to two decimal places,
without any other text.
    """
```

Zbytek promptu je podle očekávání.

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

Projde oba pooly a získá z nich cenové nabídky.

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

Určí budoucí časový bod, pro který chceme odhad, a vytvoří prompt.

### Propojení s LLM {#interface-llm}

Dále zadáme prompt skutečnému LLM a obdržíme očekávanou budoucí hodnotu. Tento program jsem napsal s využitím OpenAI, takže pokud chcete použít jiného poskytovatele, budete jej muset upravit.

1. Založte si [účet u OpenAI](https://auth.openai.com/create-account).
2. [Vložte na účet prostředky](https://platform.openai.com/settings/organization/billing/overview) – minimální částka v době psaní tohoto textu je 5 dolarů.
3. [Vytvořte si API klíč](https://platform.openai.com/settings/organization/api-keys).
4. V příkazovém řádku exportujte API klíč, aby jej váš program mohl používat.

   ```sh
   export OPENAI_API_KEY=sk-<the rest of the key goes here>
   ```

5. Přepněte větev (checkout) a spusťte agenta.

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

Zde je nový kód.

```python
from openai import OpenAI

open_ai = OpenAI()  # Klient čte proměnnou prostředí OPENAI_API_KEY
```

Importuje a instancuje OpenAI API.

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

Zavolá OpenAI API (`open_ai.chat.completions.create`) k vytvoření odpovědi.

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

Vypíše cenu a poskytne doporučení k nákupu nebo prodeji.

#### Testování predikcí {#testing-the-predictions}

Nyní, když umíme generovat predikce, můžeme také použít historická data k posouzení, zda vytváříme užitečné predikce.

```sh
uv run test-predictor.py
```

Očekávaný výsledek je podobný tomuto:

```
Predikce pro 2026-01-05T19:50: předpovězeno 3138.93 USD, skutečnost 3218.92 USD, chyba 79.99 USD
Predikce pro 2026-01-06T19:56: předpovězeno 3243.39 USD, skutečnost 3221.08 USD, chyba 22.31 USD
Predikce pro 2026-01-07T20:02: předpovězeno 3223.24 USD, skutečnost 3146.89 USD, chyba 76.35 USD
Predikce pro 2026-01-08T20:11: předpovězeno 3150.47 USD, skutečnost 3092.04 USD, chyba 58.43 USD
.
.
.
Predikce pro 2026-01-31T22:33: předpovězeno 2637.73 USD, skutečnost 2417.77 USD, chyba 219.96 USD
Predikce pro 2026-02-01T22:41: předpovězeno 2381.70 USD, skutečnost 2318.84 USD, chyba 62.86 USD
Predikce pro 2026-02-02T22:49: předpovězeno 2234.91 USD, skutečnost 2349.28 USD, chyba 114.37 USD
Průměrná chyba predikce z 29 predikcí: 83.87103448275862068965517241 USD
Průměrná změna na doporučení: 4.787931034482758620689655172 USD
Standardní rozptyl změn: 104.42 USD
Ziskové dny: 51.72%
Ztrátové dny: 48.28%
```

Většina testeru je identická s agentem, ale zde jsou části, které jsou nové nebo upravené.

```python
CYCLES_FOR_TEST = 40 # Pro backtest, kolik cyklů testujeme

# Získat mnoho kotací
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

Díváme se `CYCLES_FOR_TEST` (zde specifikováno jako 40) dní zpět.

```python
# Vytvořit predikce a porovnat je se skutečnou historií

total_error = Decimal(0)
changes = []
```

Zajímají nás dva typy chyb. První, `total_error`, je jednoduše součet chyb, které prediktor udělal.

Abychom pochopili druhou chybu, `changes`, musíme si připomenout účel agenta. Tím není předpovídat poměr WETH/USDC (cenu ETH). Jeho účelem je vydávat doporučení k prodeji a nákupu. Pokud je cena aktuálně 2000 $ a on předpoví na zítřek 2010 $, nevadí nám, když bude skutečný výsledek 2020 $ a my vyděláme peníze navíc. Ale _vadí_ nám, pokud předpověděl 2010 $, na základě tohoto doporučení koupil ETH a cena klesne na 1990 $.

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

Můžeme se dívat pouze na případy, kdy je k dispozici kompletní historie (hodnoty použité pro predikci a skutečná hodnota pro porovnání). To znamená, že nejnovější případ musí být ten, který začal před `CYCLES_BACK`.

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

Použijte [řezy (slices)](https://www.w3schools.com/python/ref_func_slice.asp) k získání stejného počtu vzorků, jaký používá agent. Kód mezi tímto a dalším segmentem je stejný kód pro získání predikce, jaký máme v agentovi.

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

Získá předpokládanou cenu, skutečnou cenu a cenu v době predikce. Cenu v době predikce potřebujeme k určení, zda bylo doporučením nakoupit nebo prodat.

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Prediction for {prediction_time}: predicted {predicted_price} USD, real {real_price} USD, error {error} USD")
```

Vypočítá chybu a přičte ji k celkovému součtu.

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

U `changes` chceme znát peněžní dopad nákupu nebo prodeje jednoho ETH. Nejprve tedy musíme určit doporučení, poté posoudit, jak se skutečná cena změnila, a zda doporučení vydělalo peníze (pozitivní změna) nebo stálo peníze (negativní změna).

```python
print (f"Mean prediction error over {len(wethusdc_quotes)-CYCLES_BACK} predictions: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Mean change per recommendation: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Standard variance of changes: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

Nahlásí výsledky.

```python
print (f"Profitable days: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Losing days: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

Použijte [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) ke spočítání počtu ziskových a ztrátových dnů. Výsledkem je objekt filtru, který musíme převést na seznam, abychom získali jeho délku.

### Odesílání transakcí {#submit-txn}

Nyní musíme skutečně odesílat transakce. V této fázi, než se systém osvědčí, však nechci utrácet skutečné peníze. Místo toho vytvoříme lokální fork sítě Mainnet a budeme „obchodovat“ na této síti.

Zde jsou kroky k vytvoření lokálního forku a povolení obchodování.

1. Nainstalujte [Foundry](https://getfoundry.sh/introduction/installation).

2. Spusťte [`anvil`](https://getfoundry.sh/anvil/overview).

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` naslouchá na výchozí URL adrese pro Foundry, http://localhost:8545, takže nemusíme specifikovat URL pro [příkaz `cast`](https://getfoundry.sh/cast/overview), který používáme k manipulaci s blockchainem.

3. Při spuštění v `anvil` je k dispozici deset testovacích účtů, které mají ETH – nastavte proměnné prostředí pro ten první.

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. Toto jsou kontrakty, které potřebujeme použít. [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) je kontrakt Uniswap v3, který používáme k samotnému obchodování. Mohli bychom obchodovat přímo přes pool, ale toto je mnohem jednodušší.

   Dvě spodní proměnné jsou cesty Uniswap v3 potřebné pro swap mezi WETH a USDC.

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. Každý z testovacích účtů má 10 000 ETH. Použijte kontrakt WETH k zabalení 1000 ETH, abyste získali 1000 WETH pro obchodování.

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. Použijte `SwapRouter` k provedení obchodu 500 WETH za USDC.

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   Volání `approve` vytvoří povolený limit, který umožňuje kontraktu `SwapRouter` utratit část našich tokenů. Kontrakty nemohou monitorovat události, takže pokud bychom převedli tokeny přímo na kontrakt `SwapRouter`, nevěděl by, že mu bylo zaplaceno. Místo toho povolíme kontraktu `SwapRouter` utratit určitou částku a `SwapRouter` to pak provede. To se děje prostřednictvím funkce volané kontraktem `SwapRouter`, takže ví, zda byl úspěšný.

7. Ověřte, že máte dostatek obou tokenů.

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

Nyní, když máme WETH a USDC, můžeme agenta skutečně spustit.

```sh
git checkout 05-trade
uv run agent.py
```

Výstup bude vypadat podobně jako tento:

```
(ai-trading-agent) qbzzt@Ori-Cloudnomics:~/260215-ai-agent$ uv run agent.py
Aktuální cena: 1843.16
V 2026-02-06T23:07, očekávaná cena: 1724.41 USD
Zůstatky na účtu před obchodem:
Zůstatek USDC: 927301.578272
Zůstatek WETH: 500
Prodat, očekávám, že cena klesne o 118.75 USD
Transakce schválení odeslána: 74e367ddbb407c1aaf567d87aa5863049991b1d2aa092b6b85195d925e2bd41f
Transakce schválení vytěžena.
Transakce prodeje odeslána: fad1bcf938585c9e90364b26ac7a80eea9efd34c37e5db81e58d7655bcae28bf
Transakce prodeje vytěžena.
Zůstatky na účtu po obchodu:
Zůstatek USDC: 929143.797116
Zůstatek WETH: 499
```

Abyste jej mohli skutečně používat, potřebujete několik drobných změn.

- Na řádku 14 změňte `MAINNET_URL` na skutečný přístupový bod, jako je `https://eth.drpc.org`.
- Na řádku 28 změňte `PRIVATE_KEY` na svůj vlastní soukromý klíč.
- Pokud nejste velmi bohatí a nemůžete si dovolit kupovat nebo prodávat 1 ETH každý den pro neověřeného agenta, možná budete chtít změnit řádek 29 a snížit `WETH_TRADE_AMOUNT`.

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

K samotnému obchodování potřebujeme funkci `approve`. Chceme také zobrazit zůstatky před a po, takže potřebujeme i `balanceOf`.

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

V ABI `SwapRouter` potřebujeme pouze `exactInput`. Existuje související funkce, `exactOutput`, kterou bychom mohli použít k nákupu přesně jednoho WETH, ale pro jednoduchost použijeme v obou případech pouze `exactInput`.

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

Definice Web3 pro [`account`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) a kontrakt `SwapRouter`.

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

Parametry transakce. Zde potřebujeme funkci, protože [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) se musí pokaždé změnit.

```python
def approve_token(contract: Contract, amount: int):
```

Schválí povolený limit tokenů pro `SwapRouter`.

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

Takto odesíláme transakci ve Web3. Nejprve použijeme [objekt `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) k sestavení transakce. Poté použijeme [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) k podepsání transakce pomocí `PRIVATE_KEY`. Nakonec použijeme [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) k odeslání transakce.

```python
    print(f"Approve transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Approve transaction mined.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) čeká, dokud není transakce vytěžena. V případě potřeby vrací stvrzenku.

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

Toto jsou parametry při prodeji WETH.

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

Na rozdíl od `SELL_PARAMS` se parametry nákupu mohou měnit. Vstupní částka je cena 1 WETH, jak je k dispozici v `quote`.

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

Funkce `buy()` a `sell()` jsou téměř identické. Nejprve schválíme dostatečný povolený limit pro `SwapRouter` a poté jej zavoláme se správnou cestou a částkou.

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

Nahlásí zůstatky uživatele v obou měnách.

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

Tento agent v současnosti funguje pouze jednou. Můžete jej však změnit tak, aby pracoval nepřetržitě, a to buď jeho spuštěním z [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html), nebo zabalením řádků 368-400 do smyčky a použitím [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) k čekání, dokud nenastane čas pro další cyklus.

## Možná vylepšení {#improvements}

Toto není plná produkční verze; je to pouze příklad k výuce základů. Zde je několik nápadů na vylepšení.

### Chytřejší obchodování {#smart-trading}

Existují dva důležité fakty, které agent při rozhodování, co dělat, ignoruje.

- _Velikost očekávané změny_. Agent prodá pevně stanovené množství `WETH`, pokud se očekává pokles ceny, bez ohledu na velikost tohoto poklesu.
  Pravděpodobně by bylo lepší ignorovat drobné změny a prodávat na základě toho, jak velký pokles ceny očekáváme.
- _Aktuální portfolio_. Pokud je 10 % vašeho portfolia ve WETH a myslíte si, že cena půjde nahoru, pravděpodobně dává smysl koupit více. Ale pokud je 90 % vašeho portfolia ve WETH, můžete být dostatečně exponováni a není potřeba kupovat další. Opak platí, pokud očekáváte, že cena klesne.

### Co když chcete udržet svou obchodní strategii v tajnosti? {#secret}

Prodejci AI mohou vidět dotazy, které posíláte jejich LLM, což by mohlo odhalit geniální obchodní systém, který jste se svým agentem vyvinuli. Obchodní systém, který používá příliš mnoho lidí, je bezcenný, protože příliš mnoho lidí se snaží nakupovat, když chcete nakupovat vy (a cena stoupá), a snaží se prodávat, když chcete prodávat vy (a cena klesá).

Abyste se tomuto problému vyhnuli, můžete spustit LLM lokálně, například pomocí [LM-Studio](https://lmstudio.ai/).

### Od AI bota k AI agentovi {#bot-to-agent}

Můžete oprávněně tvrdit, že se jedná o [AI bota, nikoli o AI agenta](/ai-agents/#ai-agents-vs-ai-bots). Implementuje relativně jednoduchou strategii, která se spoléhá na předdefinované informace. Můžeme umožnit sebezdokonalování, například poskytnutím seznamu poolů Uniswap v3 a jejich nejnovějších hodnot a dotazem, která kombinace má nejlepší prediktivní hodnotu.

### Ochrana proti cenovému skluzu {#slippage-protection}

V současné době neexistuje žádná [ochrana proti cenovému skluzu](https://uniswapv3book.com/milestone_3/slippage-protection.html). Pokud je aktuální cenová nabídka 2000 $ a očekávaná cena je 2100 $, agent nakoupí. Pokud však předtím, než agent nakoupí, cena stoupne na 2200 $, nemá už smysl nakupovat.

Chcete-li implementovat ochranu proti cenovému skluzu, zadejte hodnotu `amountOutMinimum` na řádcích 325 a 334 v [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325).

## Závěr {#conclusion}

Doufejme, že nyní víte dost na to, abyste mohli začít s AI agenty. Nejedná se o komplexní přehled tohoto tématu; jsou mu věnovány celé knihy, ale pro začátek to stačí. Hodně štěstí!

[Zde najdete další mou práci](https://cryptodocguy.pro/).