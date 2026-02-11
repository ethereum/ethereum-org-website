---
title: Crea il tuo agente di trading IA su Ethereum
description: In questa guida imparerai a creare un semplice agente di trading IA. Questo agente legge le informazioni dalla blockchain, chiede una raccomandazione a un LLM in base a tali informazioni, esegue lo scambio consigliato dall'LLM, quindi attende e ripete.
author: Ori Pomerantz
tags: [ "IA", "trading", "agente", "python" ]
skill: intermediate
published: 2026-02-13
lang: it
sidebarDepth: 3
---

In questa guida imparerai a creare un semplice agente di trading IA. Questo agente funziona seguendo questi passaggi:

1. Leggere i prezzi attuali e passati di un token, nonché altre informazioni potenzialmente pertinenti
2. Costruire una query con queste informazioni, insieme a informazioni di base per spiegare come potrebbero essere pertinenti
3. Inviare la query e ricevere in risposta un prezzo previsto
4. Effettuare uno scambio in base alla raccomandazione
5. Attendere e ripetere

Questo agente dimostra come leggere le informazioni, tradurle in una query che fornisce una risposta utilizzabile e utilizzare tale risposta. Tutti questi sono passaggi richiesti per un agente IA. Questo agente è implementato in Python perché è il linguaggio più comune utilizzato nell'IA.

## Perché farlo? {#why-do-this}

Gli agenti di trading automatizzati consentono agli sviluppatori di selezionare ed eseguire una strategia di trading. Gli [agenti IA](/ai-agents) consentono strategie di trading più complesse e dinamiche, utilizzando potenzialmente informazioni e algoritmi che lo sviluppatore non ha nemmeno considerato di usare.

## Gli strumenti {#tools}

Questa guida utilizza [Python](https://www.python.org/), la [libreria Web3](https://web3py.readthedocs.io/en/stable/) e [Uniswap v3](https://github.com/Uniswap/v3-periphery) per quotazioni e trading.

### Perché Python? {#python}

Il linguaggio più utilizzato per l'IA è [Python](https://www.python.org/), quindi lo usiamo qui. Non ti preoccupare se non conosci Python. Il linguaggio è molto chiaro e spiegherò esattamente cosa fa.

La [libreria Web3](https://web3py.readthedocs.io/en/stable/) è l'API Python di Ethereum più comune. È abbastanza facile da usare.

### Trading sulla blockchain {#trading-on-blockchain}

Ci sono [molti exchange decentralizzati (DEX)](/apps/categories/defi/) che ti permettono di scambiare token su Ethereum. Tuttavia, tendono ad avere tassi di cambio simili a causa dell'[arbitraggio](/developers/docs/smart-contracts/composability/#better-user-experience).

[Uniswap](https://app.uniswap.org/) è un DEX ampiamente utilizzato che possiamo usare sia per le quotazioni (per vedere i valori relativi dei token) sia per gli scambi.

### OpenAI {#openai}

Per un modello linguistico di grandi dimensioni, ho scelto di iniziare con [OpenAI](https://openai.com/). Per eseguire l'applicazione in questa guida dovrai pagare per l'accesso all'API. Il pagamento minimo di 5$ è più che sufficiente.

## Sviluppo, passo dopo passo {#step-by-step}

Per semplificare lo sviluppo, procediamo per fasi. Ogni passaggio è un branch in GitHub.

### Per iniziare {#getting-started}

Ci sono passaggi per iniziare con UNIX o Linux (incluso [WSL](https://learn.microsoft.com/en-us/windows/wsl/install))

1. Se non lo hai già, scarica e installa [Python](https://www.python.org/downloads/).

2. Clona la repository di GitHub.

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. Installa [`uv`](https://docs.astral.sh/uv/getting-started/installation/). Il comando sul tuo sistema potrebbe essere diverso.

   ```sh
   pipx install uv
   ```

4. Scarica le librerie.

   ```sh
   uv sync
   ```

5. Attiva l'ambiente virtuale.

   ```sh
   source .venv/bin/activate
   ```

6. Per verificare che Python e Web3 funzionino correttamente, esegui `python3` e forniscigli questo programma. Puoi inserirlo al prompt `>>>`; non è necessario creare un file.

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### Lettura dalla blockchain {#read-blockchain}

Il passo successivo è leggere dalla blockchain. Per farlo, devi passare al branch `02-read-quote` e quindi usare `uv` per eseguire il programma.

```sh
git checkout 02-read-quote
uv run agent.py
```

Dovresti ricevere un elenco di oggetti `Quote`, ognuno con un indicatore ora, un prezzo e l'asset (attualmente sempre `WETH/USDC`).

Ecco una spiegazione riga per riga.

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

Importa le librerie di cui abbiamo bisogno. Sono spiegati di seguito quando vengono utilizzati.

```python
print = functools.partial(print, flush=True)
```

Sostituisce il `print` di Python con una versione che svuota sempre l'output immediatamente. Questo è utile in uno script a lunga esecuzione perché non vogliamo attendere aggiornamenti di stato o output di debug.

```python
MAINNET_URL = "https://eth.drpc.org"
```

Un URL per accedere alla Rete Principale. Puoi ottenerne uno da [Nodo come servizio](/developers/docs/nodes-and-clients/nodes-as-a-service/) o usare uno di quelli pubblicizzati in [Chainlist](https://chainlist.org/chain/1).

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

Un blocco della Rete Principale di Ethereum si verifica in genere ogni dodici secondi, quindi questo è il numero di blocchi che ci aspetteremmo si verifichino in un periodo di tempo. Nota che questa non è una cifra esatta. Quando il [proponente del blocco](/developers/docs/consensus-mechanisms/pos/block-proposal/) non è attivo, quel blocco viene saltato e il tempo per il blocco successivo è di 24 secondi. Se volessimo ottenere il blocco esatto per un indicatore ora, useremmo la [ricerca binaria](https://en.wikipedia.org/wiki/Binary_search). Tuttavia, questo è sufficientemente vicino per i nostri scopi. Prevedere il futuro non è una scienza esatta.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

La dimensione del ciclo. Esaminiamo le quotazioni una volta per ciclo e proviamo a stimare il valore alla fine del ciclo successivo.

```python
# L'indirizzo del gruppo che stiamo leggendo
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

I valori delle quotazioni sono presi dal gruppo USDC/WETH di Uniswap 3 all'indirizzo [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract). Questo indirizzo è già in formato checksum, ma è meglio usare [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address) per rendere il codice riutilizzabile.

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

Queste sono le [ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) per i due contratti che dobbiamo contattare. Per mantenere il codice conciso, includiamo solo le funzioni che dobbiamo chiamare.

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

Inizializza la libreria [`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) e connettiti a un nodo Ethereum.

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

Questo è un modo per creare una classe di dati in Python. Il tipo di dati [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) viene utilizzato per connettersi al contratto. Nota il `(frozen=True)`. In Python i [booleani](https://en.wikipedia.org/wiki/Boolean_data_type) sono definiti come `True` o `False`, con la lettera maiuscola. Questa classe di dati è `frozen`, il che significa che i campi non possono essere modificati.

Nota l'indentazione. A differenza dei [linguaggi derivati dal C](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages), Python usa l'indentazione per denotare i blocchi. L'interprete Python sa che la seguente definizione non fa parte di questa classe di dati perché non inizia con la stessa indentazione dei campi della classe di dati.

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

Il tipo [`Decimal`](https://docs.python.org/3/library/decimal.html) viene utilizzato per gestire accuratamente le frazioni decimali.

```python
    def get_price(self, block: int) -> Decimal:
```

Questo è il modo per definire una funzione in Python. La definizione è indentata per mostrare che fa ancora parte di `PoolInfo`.

In una funzione che fa parte di una classe di dati il primo parametro è sempre `self`, l'istanza della classe di dati che ha chiamato qui. Qui c'è un altro parametro, il numero del blocco.

```python
        assert block <= w3.eth.block_number, "Il blocco è nel futuro"
```

Se potessimo leggere il futuro, non avremmo bisogno dell'IA per il trading.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

La sintassi per chiamare una funzione sulla EVM da Web3 è questa: `<oggetto contratto>.functions.<nome funzione>().call(<parametri>)`. I parametri possono essere i parametri della funzione EVM (se presenti; qui non ce ne sono) o [parametri nominativi](https://en.wikipedia.org/wiki/Named_parameter) per modificare il comportamento della blockchain. Qui ne usiamo uno, `block_identifier`, per specificare [il numero del blocco](/developers/docs/apis/json-rpc/#default-block) in cui desideriamo eseguire.

Il risultato è [questa struct, in forma di array](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72). Il primo valore è una funzione del tasso di cambio tra i due token.

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

Per ridurre i calcoli sulla catena, Uniswap v3 non memorizza il fattore di cambio effettivo ma la sua radice quadrata. Poiché l'EVM non supporta la matematica in virgola mobile o le frazioni, invece del valore effettivo, la risposta è <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5</mo><msup><mn>2</mn><mn>96</mn></msup></math>

```python
         # (token1 per token0)
        return 1/(raw_price * self.decimal_factor)
```

Il prezzo grezzo che otteniamo è il numero di `token0` che otteniamo per ogni `token1`. Nel nostro gruppo `token0` è USDC (stablecoin con lo stesso valore di un dollaro USA) e `token1` è [WETH](https://opensea.io/learn/blockchain/what-is-weth). Il valore che vogliamo veramente è il numero di dollari per WETH, non l'inverso.

Il fattore decimale è il rapporto tra i [fattori decimali](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) per i due token.

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

Questa classe di dati rappresenta una quotazione: il prezzo di un asset specifico in un dato momento. A questo punto, il campo `asset` è irrilevante perché usiamo un singolo gruppo e quindi abbiamo un singolo asset. Tuttavia, aggiungeremo altri asset in seguito.

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

Questa funzione accetta un indirizzo e restituisce informazioni sul contratto del token a quell'indirizzo. Per creare un nuovo [`Contract` Web3](https://web3py.readthedocs.io/en/stable/web3.contract.html), forniamo l'indirizzo e l'ABI a `w3.eth.contract`.

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

Questa funzione restituisce tutto ciò di cui abbiamo bisogno su [un gruppo specifico](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol). La sintassi `f"<stringa>"` è una [stringa formattata](https://docs.python.org/3/reference/lexical_analysis.html#f-strings).

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

Ottieni un oggetto `Quote`. Il valore predefinito per `block_number` è `None` (nessun valore).

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

Se non è stato specificato un numero di blocco, usa `w3.eth.block_number`, che è l'ultimo numero di blocco. Questa è la sintassi per [un'istruzione `if`](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement).

Potrebbe sembrare che sarebbe stato meglio impostare semplicemente il valore predefinito su `w3.eth.block_number`, ma non funziona bene perché sarebbe il numero di blocco al momento della definizione della funzione. In un agente a lunga esecuzione, questo sarebbe un problema.

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

Usa [la libreria `datetime`](https://docs.python.org/3/library/datetime.html) per formattarlo in un formato leggibile per gli esseri umani e per i modelli linguistici di grandi dimensioni (LLM). Usa [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize) per arrotondare il valore a due cifre decimali.

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

In Python si definisce un [elenco](https://docs.python.org/3/library/stdtypes.html#typesseq-list) che può contenere solo un tipo specifico usando `list[<tipo>]`.

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

In Python un [`ciclo `for``](https://docs.python.org/3/tutorial/controlflow.html#for-statements) di solito itera su un elenco. L'elenco di numeri di blocco in cui trovare le quotazioni proviene da [`range`](https://docs.python.org/3/library/stdtypes.html#range).

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

Per ogni numero di blocco, ottieni un oggetto `Quote` e aggiungilo all'elenco `quotes`. Quindi restituisci quell'elenco.

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

Questo è il codice principale dello script. Leggi le informazioni del gruppo, ottieni dodici quotazioni e visualizzale con [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint).

### Creazione di un prompt {#prompt}

Successivamente, dobbiamo convertire questo elenco di quotazioni in un prompt per un LLM e ottenere un valore futuro atteso.

```sh
git checkout 03-create-prompt
uv run agent.py
```

L'output ora sarà un prompt per un LLM, simile a:

```
Date queste quotazioni:
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


Quale valore ti aspetteresti per WETH/USDC all'ora 2026-02-02T17:56?

Fornisci la tua risposta come un singolo numero arrotondato a due cifre decimali,
senza alcun altro testo.
```

Nota che qui ci sono quotazioni per due asset, `WETH/USDC` e `WBTC/WETH`. L'aggiunta di quotazioni da un altro asset potrebbe migliorare l'accuratezza della previsione.

#### Come appare un prompt {#prompt-explanation}

Questo prompt contiene tre sezioni, che sono abbastanza comuni nei prompt LLM.

1. Informazioni. Gli LLM hanno molte informazioni dal loro addestramento, ma di solito non hanno le più recenti. Questo è il motivo per cui dobbiamo recuperare le ultime quotazioni qui. L'aggiunta di informazioni a un prompt è chiamata [generazione aumentata dal recupero (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation).

2. La domanda vera e propria. Questo è ciò che vogliamo sapere.

3. Istruzioni per la formattazione dell'output. Normalmente, un LLM ci darà una stima con una spiegazione di come ci è arrivato. Questo è meglio per gli esseri umani, ma un programma per computer ha solo bisogno del risultato finale.

#### Spiegazione del codice {#prompt-code}

Ecco il nuovo codice.

```python
from datetime import datetime, timezone, timedelta
```

Dobbiamo fornire all'LLM l'ora per la quale vogliamo una stima. Per ottenere un'ora "n minuti/ore/giorni" nel futuro, usiamo [la classe `timedelta`](https://docs.python.org/3/library/datetime.html#datetime.timedelta).

```python
# Gli indirizzi dei gruppi che stiamo leggendo
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

Abbiamo due gruppi che dobbiamo leggere.

```python
@dataclass(frozen=True)
class PoolInfo:
    .
    .
    .
    reverse: bool = False

    def get_price(self, block: int) -> Decimal:
        assert block <= w3.eth.block_number, "Il blocco è nel futuro"
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (token1 per token0)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

Nel gruppo WETH/USDC, vogliamo sapere quanti `token0` (USDC) ci servono per acquistare un `token1` (WETH). Nel gruppo WETH/WBTC, vogliamo sapere quanti `token1` (WETH) ci servono per acquistare un `token0` (WBTC, che è Bitcoin wrappato). Dobbiamo tenere traccia se il rapporto del gruppo deve essere invertito.

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

Per sapere se un gruppo deve essere invertito, dobbiamo ottenerlo come input per `read_pool`. Inoltre, il simbolo dell'asset deve essere impostato correttamente.

La sintassi `<a> if <b> else <c>` è l'equivalente Python dell'[operatore condizionale ternario](https://en.wikipedia.org/wiki/Ternary_conditional_operator), che in un linguaggio derivato dal C sarebbe `<b> ?` <a> : <c>`.

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

Questa funzione costruisce una stringa che formatta un elenco di oggetti `Quote`, assumendo che si applichino tutti allo stesso asset.

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

In Python le [stringhe letterali multiriga](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) sono scritte come `"""` .... `"""`.

```python
Date queste quotazioni:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

Qui usiamo il modello [MapReduce](https://en.wikipedia.org/wiki/MapReduce) per generare una stringa per ogni elenco di quotazioni con `format_quotes`, quindi li riduciamo in una singola stringa da usare nel prompt.

```python
Quale valore ti aspetteresti per {asset} all'ora {expected_time}?

Fornisci la tua risposta come un singolo numero arrotondato a due cifre decimali,
senza alcun altro testo.
    """
```

Il resto del prompt è come previsto.

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

Esamina i due gruppi e ottieni quotazioni da entrambi.

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

Determina il momento futuro per il quale vogliamo la stima e crea il prompt.

### Interfacciarsi con un LLM {#interface-llm}

Successivamente, inviamo un prompt a un LLM effettivo e riceviamo un valore futuro atteso. Ho scritto questo programma usando OpenAI, quindi se vuoi usare un fornitore diverso, dovrai adattarlo.

1. Ottieni un [conto OpenAI](https://auth.openai.com/create-account)

2. [Ricarica il conto](https://platform.openai.com/settings/organization/billing/overview)—l'importo minimo al momento della scrittura è di 5$

3. [Crea una chiave API](https://platform.openai.com/settings/organization/api-keys)

4. Nella riga di comando, esporta la chiave API in modo che il tuo programma possa usarla

   ```sh
   export OPENAI_API_KEY=sk-<il resto della chiave va qui>
   ```

5. Fai il checkout ed esegui l'agente

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

Ecco il nuovo codice.

```python
from openai import OpenAI

open_ai = OpenAI()  # Il client legge la variabile d'ambiente OPENAI_API_KEY
```

Importa e istanzia l'API di OpenAI.

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

Chiama l'API di OpenAI (`open_ai.chat.completions.create`) per creare la risposta.

```python
expected_price = Decimal(response.choices[0].message.content.strip())
current_price = wethusdc_quotes[-1].price

print ("Prezzo attuale:", wethusdc_quotes[-1].price)
print(f"In {future_time}, prezzo previsto: {expected_price} USD")

if (expected_price > current_price):
    print(f"Compra, mi aspetto che il prezzo salga di {expected_price - current_price} USD")
else:
    print(f"Vendi, mi aspetto che il prezzo scenda di {current_price - expected_price} USD")
```

Mostra il prezzo e fornisci una raccomandazione di acquisto o vendita.

#### Testare le previsioni {#testing-the-predictions}

Ora che possiamo generare previsioni, possiamo anche utilizzare dati storici per valutare se produciamo previsioni utili.

```sh
uv run test-predictor.py
```

Il risultato atteso è simile a:

```
Previsione per 2026-01-05T19:50: previsto 3138.93 USD, reale 3218.92 USD, errore 79.99 USD
Previsione per 2026-01-06T19:56: previsto 3243.39 USD, reale 3221.08 USD, errore 22.31 USD
Previsione per 2026-01-07T20:02: previsto 3223.24 USD, reale 3146.89 USD, errore 76.35 USD
Previsione per 2026-01-08T20:11: previsto 3150.47 USD, reale 3092.04 USD, errore 58.43 USD
.
.
.
Previsione per 2026-01-31T22:33: previsto 2637.73 USD, reale 2417.77 USD, errore 219.96 USD
Previsione per 2026-02-01T22:41: previsto 2381.70 USD, reale 2318.84 USD, errore 62.86 USD
Previsione per 2026-02-02T22:49: previsto 2234.91 USD, reale 2349.28 USD, errore 114.37 USD
Errore medio di previsione su 29 previsioni: 83.87103448275862068965517241 USD
Variazione media per raccomandazione: 4.787931034482758620689655172 USD
Varianza standard delle variazioni: 104.42 USD
Giorni redditizi: 51.72%
Giorni in perdita: 48.28%
```

La maggior parte del tester è identica all'agente, ma ecco le parti nuove o modificate.

```python
CYCLES_FOR_TEST = 40 # Per il backtest, quanti cicli testiamo

# Ottieni molte quotazioni
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

Guardiamo indietro di `CYCLES_FOR_TEST` (specificato come 40 qui) giorni.

```python
# Crea previsioni e confrontale con la cronologia reale

total_error = Decimal(0)
changes = []
```

Ci sono due tipi di errori che ci interessano. Il primo, `total_error`, è semplicemente la somma degli errori commessi dal predittore.

Per capire il secondo, `changes`, dobbiamo ricordare lo scopo dell'agente. Non è prevedere il rapporto WETH/USDC (prezzo di ETH). È emettere raccomandazioni di vendita e acquisto. Se il prezzo è attualmente di 2000 $ e prevede 2010 $ domani, non ci importa se il risultato effettivo è 2020 $ e guadagniamo soldi extra. Ma ci importa se ha previsto 2010 $, e ha comprato ETH sulla base di quella raccomandazione, e il prezzo scende a 1990 $.

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

Possiamo esaminare solo i casi in cui la cronologia completa (i valori utilizzati per la previsione e il valore del mondo reale con cui confrontarla) è disponibile. Ciò significa che il caso più recente deve essere quello iniziato `CYCLES_BACK` fa.

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

Usa le [slice](https://www.w3schools.com/python/ref_func_slice.asp) per ottenere lo stesso numero di campioni utilizzato dall'agente. Il codice tra qui e il segmento successivo è lo stesso codice per ottenere una previsione che abbiamo nell'agente.

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

Ottieni il prezzo previsto, il prezzo reale e il prezzo al momento della previsione. Abbiamo bisogno del prezzo al momento della previsione per determinare se la raccomandazione era di comprare o vendere.

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Previsione per {prediction_time}: previsto {predicted_price} USD, reale {real_price} USD, errore {error} USD")
```

Calcola l'errore e aggiungilo al totale.

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

Per `changes`, vogliamo l'impatto monetario dell'acquisto o della vendita di un ETH. Quindi, prima dobbiamo determinare la raccomandazione, poi valutare come è cambiato il prezzo effettivo e se la raccomandazione ha prodotto un guadagno (variazione positiva) o una perdita (variazione negativa).

```python
print (f"Errore medio di previsione su {len(wethusdc_quotes)-CYCLES_BACK} previsioni: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Variazione media per raccomandazione: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Varianza standard delle variazioni: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

Riporta i risultati.

```python
print (f"Giorni redditizi: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Giorni in perdita: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

Usa [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) per contare il numero di giorni redditizi e il numero di giorni costosi. Il risultato è un oggetto filtro, che dobbiamo convertire in un elenco per ottenerne la lunghezza.

### Invio di transazioni {#submit-txn}

Ora dobbiamo effettivamente inviare le transazioni. Tuttavia, non voglio spendere soldi veri a questo punto, prima che il sistema sia collaudato. Invece, creeremo una biforcazione locale della Rete Principale e faremo "trading" su quella rete.

Ecco i passaggi per creare una biforcazione locale e abilitare il trading.

1. Installa [Foundry](https://getfoundry.sh/introduction/installation)

2. Avvia [`anvil`](https://getfoundry.sh/anvil/overview)

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` è in ascolto sull'URL predefinito per Foundry, http://localhost:8545, quindi non è necessario specificare l'URL per [il comando `cast`](https://getfoundry.sh/cast/overview) che usiamo per manipolare la blockchain.

3. Quando si esegue in `anvil`, ci sono dieci conti di prova che hanno ETH: imposta le variabili d'ambiente per il primo

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. Questi sono i contratti che dobbiamo usare. [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) è il contratto di Uniswap v3 che usiamo per fare trading. Potremmo fare trading direttamente attraverso il gruppo, ma questo è molto più facile.

   Le due variabili in basso sono i percorsi di Uniswap v3 necessari per scambiare tra WETH e USDC.

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. Ognuno dei conti di prova ha 10.000 ETH. Usa il contratto WETH per wrappare 1000 ETH per ottenere 1000 WETH per il trading.

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. Usa `SwapRouter` per scambiare 500 WETH con USDC.

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   La chiamata `approve` crea un'autorizzazione che consente a `SwapRouter` di spendere alcuni dei nostri token. I contratti non possono monitorare gli eventi, quindi se trasferiamo i token direttamente al contratto `SwapRouter`, questo non saprebbe di essere stato pagato. Invece, permettiamo al contratto `SwapRouter` di spendere un certo importo, e poi `SwapRouter` lo fa. Questo viene fatto tramite una funzione chiamata da `SwapRouter`, quindi sa se ha avuto successo.

7. Verifica di avere abbastanza di entrambi i token.

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

Ora che abbiamo WETH e USDC, possiamo effettivamente eseguire l'agente.

```sh
git checkout 05-trade
uv run agent.py
```

L'output sarà simile a:

```
(ai-trading-agent) qbzzt@Ori-Cloudnomics:~/260215-ai-agent$ uv run agent.py
Prezzo attuale: 1843.16
In 2026-02-06T23:07, prezzo previsto: 1724.41 USD
Saldi del conto prima dello scambio:
Saldo USDC: 927301.578272
Saldo WETH: 500
Vendi, mi aspetto che il prezzo scenda di 118.75 USD
Transazione di approvazione inviata: 74e367ddbb407c1aaf567d87aa5863049991b1d2aa092b6b85195d925e2bd41f
Transazione di approvazione minata.
Transazione di vendita inviata: fad1bcf938585c9e90364b26ac7a80eea9efd34c37e5db81e58d7655bcae28bf
Transazione di vendita minata.
Saldi del conto dopo lo scambio:
Saldo USDC: 929143.797116
Saldo WETH: 499
```

Per usarlo effettivamente, hai bisogno di alcune piccole modifiche.

- Nella riga 14, cambia `MAINNET_URL` in un punto di accesso reale, come `https://eth.drpc.org`
- Nella riga 28, cambia `PRIVATE_KEY` con la tua chiave privata
- A meno che tu non sia molto ricco e possa comprare o vendere 1 ETH ogni giorno per un agente non provato, potresti voler cambiare la riga 29 per diminuire `WETH_TRADE_AMOUNT`

#### Spiegazione del codice {#trading-code}

Ecco il nuovo codice.

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

Le stesse variabili che abbiamo usato nel passaggio 4.

```python
WETH_TRADE_AMOUNT=1
```

L'importo da scambiare.

```python
ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... },
    { "name": "balanceOf", ...},
    { "name": "approve", ...}
]
```

Per fare effettivamente trading, abbiamo bisogno della funzione `approve`. Vogliamo anche mostrare i saldi prima e dopo, quindi abbiamo bisogno anche di `balanceOf`.

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

Nell'ABI di `SwapRouter` abbiamo solo bisogno di `exactInput`. Esiste una funzione correlata, `exactOutput`, che potremmo usare per comprare esattamente un WETH, ma per semplicità usiamo solo `exactInput` in entrambi i casi.

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

Le definizioni Web3 per il [`conto`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) e il contratto `SwapRouter`.

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

I parametri della transazione. Abbiamo bisogno di una funzione qui perché [il nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) deve cambiare ogni volta.

```python
def approve_token(contract: Contract, amount: int):
```

Approva un'autorizzazione di token per `SwapRouter`.

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

Questo è il modo in cui inviamo una transazione in Web3. Per prima cosa usiamo [l'oggetto `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) per costruire la transazione. Poi usiamo [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) per firmare la transazione, usando `PRIVATE_KEY`. Infine, usiamo [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) per inviare la transazione.

```python
    print(f"Transazione di approvazione inviata: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Transazione di approvazione minata.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) attende che la transazione venga minata. Restituisce la ricevuta, se necessario.

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

Questi sono i parametri per la vendita di WETH.

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

A differenza di `SELL_PARAMS`, i parametri di acquisto possono cambiare. L'importo in entrata è il costo di 1 WETH, come disponibile in `quote`.

```python
def buy(quote: Quote):
    buy_params = make_buy_params(quote)
    approve_token(wethusdc_pool.token0.contract, buy_params["amountIn"])
    txn = swap_router.functions.exactInput(buy_params).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"Transazione di acquisto inviata: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Transazione di acquisto minata.")


def sell():
    approve_token(wethusdc_pool.token1.contract,
                  WETH_TRADE_AMOUNT * 10**wethusdc_pool.token1.decimals)
    txn = swap_router.functions.exactInput(SELL_PARAMS).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"Transazione di vendita inviata: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Transazione di vendita minata.")
```

Le funzioni `buy()` e `sell()` sono quasi identiche. Per prima cosa approviamo un'autorizzazione sufficiente per `SwapRouter`, e poi lo chiamiamo con il percorso e l'importo corretti.

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Saldo: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Saldo: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

Riporta i saldi dell'utente in entrambe le valute.

```python
print("Saldi del conto prima dello scambio:")
balances()

if (expected_price > current_price):
    print(f"Compra, mi aspetto che il prezzo salga di {expected_price - current_price} USD")
    buy(wethusdc_quotes[-1])
else:
    print(f"Vendi, mi aspetto che il prezzo scenda di {current_price - expected_price} USD")
    sell()

print("Saldi del conto dopo lo scambio:")
balances()
```

Questo agente attualmente funziona solo una volta. Tuttavia, puoi modificarlo per farlo funzionare continuamente eseguendolo da [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) o racchiudendo le righe 368-400 in un ciclo e usando [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) per attendere fino al momento del ciclo successivo.

## Possibili miglioramenti {#improvements}

Questa non è una versione di produzione completa; è semplicemente un esempio per insegnare le basi. Ecco alcune idee per miglioramenti.

### Trading più intelligente {#smart-trading}

Ci sono due fatti importanti che l'agente ignora quando decide cosa fare.

- _L'entità del cambiamento previsto_. L'agente vende una quantità fissa di `WETH` se si prevede che il prezzo diminuisca, indipendentemente dall'entità del calo.
  Probabilmente, sarebbe meglio ignorare le piccole variazioni e vendere in base a quanto ci aspettiamo che il prezzo diminuisca.
- _Il portafoglio attuale_. Se il 10% del tuo portafoglio è in WETH e pensi che il prezzo salirà, probabilmente ha senso acquistarne di più. Ma se il 90% del tuo portafoglio è in WETH, potresti essere sufficientemente esposto e non c'è bisogno di acquistarne di più. Il contrario è vero se ti aspetti che il prezzo scenda.

### E se volessi mantenere segreta la tua strategia di trading? {#secret}

I fornitori di IA possono vedere le query che invii ai loro LLM, il che potrebbe esporre il geniale sistema di trading che hai sviluppato con il tuo agente. Un sistema di trading che troppe persone usano è inutile perché troppe persone cercano di comprare quando vuoi comprare tu (e il prezzo sale) e cercano di vendere quando vuoi vendere tu (e il prezzo scende).

Puoi eseguire un LLM localmente, ad esempio, utilizzando [LM-Studio](https://lmstudio.ai/), per evitare questo problema.

### Da bot IA ad agente IA {#bot-to-agent}

Si può sostenere validamente che questo è [un bot IA, non un agente IA](/ai-agents/#ai-agents-vs-ai-bots). Implementa una strategia relativamente semplice che si basa su informazioni predefinite. Possiamo abilitare l'auto-miglioramento, ad esempio, fornendo un elenco di gruppi di Uniswap v3 e i loro ultimi valori e chiedendo quale combinazione ha il miglior valore predittivo.

### Protezione dallo slippage {#slippage-protection}

Attualmente non c'è [protezione dallo slippage](https://uniswapv3book.com/milestone_3/slippage-protection.html). Se la quotazione attuale è di 2000 $ e il prezzo previsto è di 2100 $, l'agente comprerà. Tuttavia, se prima che l'agente acquisti il costo sale a 2200 $, non ha più senso comprare.

Per implementare la protezione dallo slippage, specifica un valore `amountOutMinimum` nelle righe 325 e 334 di [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325).

## Conclusione {#conclusion}

Speriamo che ora tu sappia abbastanza per iniziare con gli agenti IA. Questa non è una panoramica completa dell'argomento; ci sono interi libri dedicati a questo, ma questo è sufficiente per iniziare. Buona fortuna!

[Vedi qui per altri miei lavori](https://cryptodocguy.pro/).
