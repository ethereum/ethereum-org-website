---
title: Crea il tuo agente di trading IA su Ethereum
description: In questo tutorial imparerai come creare un semplice agente di trading IA. Questo agente legge informazioni dalla blockchain, chiede a un LLM una raccomandazione basata su tali informazioni, esegue lo scambio raccomandato dall'LLM, quindi attende e ripete.
author: Ori Pomerantz
tags: ["IA", "trading", "agente", "Python"]
skill: intermediate
breadcrumb: Agente di trading IA
published: 2026-02-13
lang: it
sidebarDepth: 3
---

In questo tutorial imparerai come costruire un semplice agente di trading IA. Questo agente funziona seguendo questi passaggi:

1. Leggere i prezzi attuali e passati di un token, oltre ad altre informazioni potenzialmente rilevanti
2. Costruire una query con queste informazioni, insieme a informazioni di base per spiegare come potrebbero essere rilevanti
3. Inviare la query e ricevere in risposta un prezzo previsto
4. Fare trading in base alla raccomandazione
5. Attendere e ripetere

Questo agente dimostra come leggere informazioni, tradurle in una query che produce una risposta utilizzabile e utilizzare tale risposta. Tutti questi sono passaggi richiesti per un agente IA. Questo agente è implementato in Python perché è il linguaggio più comune utilizzato nell'IA.

## Perché farlo? {#why-do-this}

Gli agenti di trading automatizzati consentono agli sviluppatori di selezionare ed eseguire una strategia di trading. Gli [agenti IA](/ai-agents) consentono strategie di trading più complesse e dinamiche, utilizzando potenzialmente informazioni e algoritmi che lo sviluppatore non ha nemmeno preso in considerazione.

## Gli strumenti {#tools}

Questo tutorial utilizza [Python](https://www.python.org/), la [libreria Web3](https://web3py.readthedocs.io/en/stable/) e [Uniswap v3](https://github.com/Uniswap/v3-periphery) per le quotazioni e il trading.

### Perché Python? {#python}

Il linguaggio più utilizzato per l'IA è [Python](https://www.python.org/), quindi lo useremo qui. Non preoccuparti se non conosci Python. Il linguaggio è molto chiaro e spiegherò esattamente cosa fa.

La [libreria Web3](https://web3py.readthedocs.io/en/stable/) è l'API Ethereum per Python più comune. È piuttosto facile da usare.

### Fare trading sulla blockchain {#trading-on-blockchain}

Ci sono [molti exchange decentralizzati (DEX)](/apps/categories/defi/) che ti permettono di scambiare token su Ethereum. Tuttavia, tendono ad avere tassi di cambio simili a causa dell'[arbitraggio](/developers/docs/smart-contracts/composability/#better-user-experience).

[Uniswap](https://app.uniswap.org/) è un DEX ampiamente utilizzato che possiamo usare sia per le quotazioni (per vedere i valori relativi dei token) sia per gli scambi.

### OpenAI {#openai}

Per un modello linguistico di grandi dimensioni (LLM), ho scelto di iniziare con [OpenAI](https://openai.com/). Per eseguire l'applicazione in questo tutorial dovrai pagare per l'accesso all'API. Il pagamento minimo di 5$ è più che sufficiente.

## Sviluppo, passo dopo passo {#step-by-step}

Per semplificare lo sviluppo, procederemo per fasi. Ogni passaggio è un branch su GitHub.

### Per iniziare {#getting-started}

Ci sono dei passaggi per iniziare su UNIX o Linux (incluso [WSL](https://learn.microsoft.com/en-us/windows/wsl/install))

1. Se non lo hai già, scarica e installa [Python](https://www.python.org/downloads/).

2. Clona il repository GitHub.

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

6. Per verificare che Python e Web3 funzionino correttamente, esegui `python3` e forniscigli questo programma. Puoi inserirlo al prompt `>>>`; non c'è bisogno di creare un file.

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
```

### Leggere dalla blockchain {#read-blockchain}

Il passaggio successivo è leggere dalla blockchain. Per farlo, devi passare al branch `02-read-quote` e poi usare `uv` per eseguire il programma.

```sh
git checkout 02-read-quote
uv run agent.py
```

Dovresti ricevere un elenco di oggetti `Quote`, ciascuno con un timestamp, un prezzo e l'asset (attualmente sempre `WETH/USDC`).

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

Importa le librerie di cui abbiamo bisogno. Sono spiegate di seguito quando vengono utilizzate.

```python
print = functools.partial(print, flush=True)
```

Sostituisce il `print` di Python con una versione che svuota sempre l'output immediatamente. Questo è utile in uno script a esecuzione prolungata perché non vogliamo aspettare per gli aggiornamenti di stato o l'output di debug.

```python
MAINNET_URL = "https://eth.drpc.org"
```

Un URL per accedere alla rete principale. Puoi ottenerne uno da [Nodo come servizio](/developers/docs/nodes-and-clients/nodes-as-a-service/) o usarne uno tra quelli pubblicizzati su [Chainlist](https://chainlist.org/chain/1).

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

Un blocco della rete principale di Ethereum viene tipicamente prodotto ogni dodici secondi, quindi questo è il numero di blocchi che ci aspetteremmo in un determinato periodo di tempo. Nota che questa non è una cifra esatta. Quando il [proponente del blocco](/developers/docs/consensus-mechanisms/pos/block-proposal/) è inattivo, quel blocco viene saltato e il tempo per il blocco successivo è di 24 secondi. Se volessimo ottenere il blocco esatto per un timestamp, useremmo la [ricerca binaria](https://it.wikipedia.org/wiki/Ricerca_dicotomica). Tuttavia, questo è abbastanza vicino per i nostri scopi. Prevedere il futuro non è una scienza esatta.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

La dimensione del ciclo. Esaminiamo le quotazioni una volta per ciclo e cerchiamo di stimare il valore alla fine del ciclo successivo.

```python
# L'indirizzo della pool che stiamo leggendo
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

I valori delle quotazioni sono presi dalla pool USDC/WETH di Uniswap 3 all'indirizzo [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract). Questo indirizzo è già in formato checksum, ma è meglio usare [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address) per rendere il codice riutilizzabile.

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

Questo è un modo per creare una classe di dati (data class) in Python. Il tipo di dati [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) viene utilizzato per connettersi al contratto. Nota il `(frozen=True)`. In Python i [booleani](https://it.wikipedia.org/wiki/Tipo_booleano) sono definiti come `True` o `False`, con l'iniziale maiuscola. Questa classe di dati è `frozen` (congelata), il che significa che i campi non possono essere modificati.

Nota l'indentazione. A differenza dei [linguaggi derivati dal C](https://it.wikipedia.org/wiki/Linguaggio_C), Python usa l'indentazione per denotare i blocchi. L'interprete Python sa che la definizione seguente non fa parte di questa classe di dati perché non inizia con la stessa indentazione dei campi della classe di dati.

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

In una funzione che fa parte di una classe di dati, il primo parametro è sempre `self`, l'istanza della classe di dati che ha effettuato la chiamata. Qui c'è un altro parametro, il numero del blocco.

```python
        assert block <= w3.eth.block_number, "Block is in the future"
```

Se potessimo leggere il futuro, non avremmo bisogno dell'IA per il trading.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

La sintassi per chiamare una funzione sull'EVM da Web3 è questa: `<contract object>.functions.<function name>().call(<parameters>)`. I parametri possono essere i parametri della funzione EVM (se presenti; qui non ce ne sono) o [parametri nominati](https://it.wikipedia.org/wiki/Parametro_nominato) per modificare il comportamento della blockchain. Qui ne usiamo uno, `block_identifier`, per specificare [il numero del blocco](/developers/docs/apis/json-rpc/#default-block) in cui desideriamo eseguire.

Il risultato è [questa struct, in forma di array](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72). Il primo valore è una funzione del tasso di cambio tra i due token.

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

Per ridurre i calcoli on-chain, Uniswap v3 non memorizza il fattore di cambio effettivo, ma piuttosto la sua radice quadrata. Poiché l'EVM non supporta la matematica in virgola mobile o le frazioni, invece del valore effettivo, la risposta è <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5;</mo><msup><mn>2</mn><mn>96</mn></msup></math>

```python
         # (token1 per token0)
        return 1/(raw_price * self.decimal_factor)
```

Il prezzo grezzo che otteniamo è il numero di `token0` che riceviamo per ogni `token1`. Nella nostra pool `token0` è USDC (stablecoin con lo stesso valore di un dollaro USA) e `token1` è [WETH](https://opensea.io/learn/blockchain/what-is-weth). Il valore che vogliamo veramente è il numero di dollari per WETH, non l'inverso.

Il fattore decimale è il rapporto tra i [fattori decimali](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) per i due token.

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

Questa classe di dati rappresenta una quotazione: il prezzo di un asset specifico in un dato momento. A questo punto, il campo `asset` è irrilevante perché usiamo una singola pool e quindi abbiamo un singolo asset. Tuttavia, aggiungeremo altri asset in seguito.

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

Questa funzione restituisce tutto ciò di cui abbiamo bisogno su [una pool specifica](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol). La sintassi `f"<string>"` è una [stringa formattata](https://docs.python.org/3/reference/lexical_analysis.html#f-strings).

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

Ottieni un oggetto `Quote`. Il valore predefinito per `block_number` è `None` (nessun valore).

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

Se non è stato specificato un numero di blocco, usa `w3.eth.block_number`, che è l'ultimo numero di blocco. Questa è la sintassi per [un'istruzione `if`](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement).

Potrebbe sembrare che sarebbe stato meglio impostare semplicemente il valore predefinito su `w3.eth.block_number`, ma non funziona bene perché sarebbe il numero del blocco al momento in cui la funzione viene definita. In un agente a esecuzione prolungata, questo sarebbe un problema.

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

In Python definisci una [lista](https://docs.python.org/3/library/stdtypes.html#typesseq-list) che può contenere solo un tipo specifico usando `list[<type>]`.

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

In Python un [ciclo `for`](https://docs.python.org/3/tutorial/controlflow.html#for-statements) tipicamente itera su una lista. L'elenco dei numeri di blocco in cui trovare le quotazioni proviene da [`range`](https://docs.python.org/3/library/stdtypes.html#range).

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

Per ogni numero di blocco, ottieni un oggetto `Quote` e aggiungilo alla lista `quotes`. Quindi restituisci quella lista.

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

Questo è il codice principale dello script. Leggi le informazioni sulla pool, ottieni dodici quotazioni e stampale con [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint).

### Creare un prompt {#prompt}

Successivamente, dobbiamo convertire questo elenco di quotazioni in un prompt per un LLM e ottenere un valore futuro atteso.

```sh
git checkout 03-create-prompt
uv run agent.py
```

L'output ora sarà un prompt per un LLM, simile a:

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

Nota che qui ci sono quotazioni per due asset, `WETH/USDC` e `WBTC/WETH`. L'aggiunta di quotazioni da un altro asset potrebbe migliorare l'accuratezza della previsione.

#### Come si presenta un prompt {#prompt-explanation}

Questo prompt contiene tre sezioni, che sono piuttosto comuni nei prompt degli LLM.

1. Informazioni. Gli LLM hanno molte informazioni derivanti dal loro addestramento, ma di solito non hanno le più recenti. Questo è il motivo per cui dobbiamo recuperare le ultime quotazioni qui. L'aggiunta di informazioni a un prompt è chiamata [retrieval augmented generation (RAG)](https://it.wikipedia.org/wiki/Retrieval-augmented_generation).

2. La domanda vera e propria. Questo è ciò che vogliamo sapere.

3. Istruzioni per la formattazione dell'output. Normalmente, un LLM ci darà una stima con una spiegazione di come ci è arrivato. Questo è meglio per gli esseri umani, ma un programma per computer ha solo bisogno del risultato finale.

#### Spiegazione del codice {#prompt-code}

Ecco il nuovo codice.

```python
from datetime import datetime, timezone, timedelta
```

Dobbiamo fornire all'LLM il momento per il quale vogliamo una stima. Per ottenere un tempo "n minuti/ore/giorni" nel futuro, usiamo [la classe `timedelta`](https://docs.python.org/3/library/datetime.html#datetime.timedelta).

```python
# Gli indirizzi delle pool che stiamo leggendo
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

Abbiamo due pool che dobbiamo leggere.

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
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2 # (token1 per token0)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

Nella pool WETH/USDC, vogliamo sapere quanti `token0` (USDC) ci servono per comprare un `token1` (WETH). Nella pool WETH/WBTC, vogliamo sapere quanti `token1` (WETH) ci servono per comprare un `token0` (WBTC, che è Bitcoin avvolto). Dobbiamo tenere traccia se il rapporto della pool deve essere invertito.

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

Per sapere se una pool deve essere invertita, dobbiamo ottenerlo come input per `read_pool`. Inoltre, il simbolo dell'asset deve essere impostato correttamente.

La sintassi `<a> if <b> else <c>` è l'equivalente Python dell'[operatore condizionale ternario](https://it.wikipedia.org/wiki/Operatore_ternario), che in un linguaggio derivato dal C sarebbe `<b> ? <a> : <c>`.

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

Questa funzione costruisce una stringa che formatta un elenco di oggetti `Quote`, supponendo che si applichino tutti allo stesso asset.

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

In Python le [stringhe letterali multilinea](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) sono scritte come `"""` .... `"""`.

```python
Given these quotes:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

Qui, usiamo il pattern [MapReduce](https://it.wikipedia.org/wiki/MapReduce) per generare una stringa per ogni elenco di quotazioni con `format_quotes`, quindi le riduciamo in una singola stringa da usare nel prompt.

```python
What would you expect the value for {asset} to be at time {expected_time}?

Provide your answer as a single number rounded to two decimal places,
without any other text.
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

Esamina le due pool e ottieni le quotazioni da entrambe.

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

Determina il momento futuro per il quale vogliamo la stima e crea il prompt.

### Interfacciarsi con un LLM {#interface-llm}

Successivamente, interroghiamo un vero LLM e riceviamo un valore futuro atteso. Ho scritto questo programma usando OpenAI, quindi se vuoi usare un provider diverso, dovrai adattarlo.

1. Ottieni un [account OpenAI](https://auth.openai.com/create-account)
2. [Finanzia l'account](https://platform.openai.com/settings/organization/billing/overview): l'importo minimo al momento della stesura è di 5$
3. [Crea una chiave API](https://platform.openai.com/settings/organization/api-keys)
4. Nella riga di comando, esporta la chiave API in modo che il tuo programma possa usarla

   ```sh
   export OPENAI_API_KEY=sk-<the rest of the key goes here>
```

5. Fai il checkout ed esegui l'agente

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
```

Ecco il nuovo codice.

```python
from openai import OpenAI

open_ai = OpenAI() # Il client legge la variabile d'ambiente OPENAI_API_KEY
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

print ("Current price:", wethusdc_quotes[-1].price)
print(f"In {future_time}, expected price: {expected_price} USD")

if (expected_price > current_price):
    print(f"Buy, I expect the price to go up by {expected_price - current_price} USD")
else:
    print(f"Sell, I expect the price to go down by {current_price - expected_price} USD")
```

Emetti il prezzo e fornisci una raccomandazione di acquisto o vendita.

#### Testare le previsioni {#testing-the-predictions}

Ora che possiamo generare previsioni, possiamo anche usare i dati storici per valutare se produciamo previsioni utili.

```sh
uv run test-predictor.py
```

Il risultato atteso è simile a:

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

La maggior parte del tester è identica all'agente, ma ecco le parti nuove o modificate.

```python
CYCLES_FOR_TEST = 40 # Per il backtest, su quanti cicli effettuiamo il test

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

Guardiamo indietro di `CYCLES_FOR_TEST` (specificato qui come 40) giorni.

```python
# Crea previsioni e verificale con lo storico reale

total_error = Decimal(0)
changes = []
```

Ci sono due tipi di errori a cui siamo interessati. Il primo, `total_error`, è semplicemente la somma degli errori commessi dal predittore.

Per capire il secondo, `changes`, dobbiamo ricordare lo scopo dell'agente. Non è prevedere il rapporto WETH/USDC (prezzo di ETH). È emettere raccomandazioni di vendita e acquisto. Se il prezzo è attualmente di 2000$ e prevede 2010$ per domani, non ci dispiace se il risultato effettivo è 2020$ e guadagniamo soldi extra. Ma ci _dispiace_ se ha previsto 2010$ e ha comprato ETH in base a quella raccomandazione, e il prezzo scende a 1990$.

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

Possiamo esaminare solo i casi in cui è disponibile la cronologia completa (i valori utilizzati per la previsione e il valore reale con cui confrontarla). Ciò significa che il caso più recente deve essere quello iniziato `CYCLES_BACK` fa.

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

Usa gli [slice](https://www.w3schools.com/python/ref_func_slice.asp) per ottenere lo stesso numero di campioni del numero utilizzato dall'agente. Il codice tra qui e il segmento successivo è lo stesso codice per ottenere una previsione che abbiamo nell'agente.

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

Ottieni il prezzo previsto, il prezzo reale e il prezzo al momento della previsione. Abbiamo bisogno del prezzo al momento della previsione per determinare se la raccomandazione era di comprare o vendere.

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Prediction for {prediction_time}: predicted {predicted_price} USD, real {real_price} USD, error {error} USD")
```

Calcola l'errore e aggiungilo al totale.

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

Per `changes`, vogliamo l'impatto monetario dell'acquisto o della vendita di un ETH. Quindi, per prima cosa, dobbiamo determinare la raccomandazione, quindi valutare come è cambiato il prezzo effettivo e se la raccomandazione ha fatto guadagnare (variazione positiva) o perdere denaro (variazione negativa).

```python
print (f"Mean prediction error over {len(wethusdc_quotes)-CYCLES_BACK} predictions: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Mean change per recommendation: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Standard variance of changes: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

Riporta i risultati.

```python
print (f"Profitable days: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Losing days: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

Usa [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) per contare il numero di giorni redditizi e il numero di giorni in perdita. Il risultato è un oggetto filtro, che dobbiamo convertire in una lista per ottenerne la lunghezza.

### Inviare transazioni {#submit-txn}

Ora dobbiamo effettivamente inviare transazioni. Tuttavia, non voglio spendere soldi veri a questo punto, prima che il sistema sia collaudato. Invece, creeremo una biforcazione locale della rete principale e faremo "trading" su quella rete.

Ecco i passaggi per creare una biforcazione locale e abilitare il trading.

1. Installa [Foundry](https://getfoundry.sh/introduction/installation)

2. Avvia [`anvil`](https://getfoundry.sh/anvil/overview)

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
```

   `anvil` è in ascolto sull'URL predefinito per Foundry, http://localhost:8545, quindi non abbiamo bisogno di specificare l'URL per [il comando `cast`](https://getfoundry.sh/cast/overview) che usiamo per manipolare la blockchain.

3. Quando si esegue in `anvil`, ci sono dieci account di test che hanno ETH: imposta le variabili d'ambiente per il primo

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
```

4. Questi sono i contratti che dobbiamo usare. [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) è il contratto Uniswap v3 che usiamo per fare effettivamente trading. Potremmo fare trading direttamente tramite la pool, ma questo è molto più semplice.

   Le due variabili in basso sono i percorsi di Uniswap v3 necessari per lo scambio tra WETH e USDC.

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
```

5. Ciascuno degli account di test ha 10.000 ETH. Usa il contratto WETH per avvolgere 1000 ETH per ottenere 1000 WETH per il trading.

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

   La chiamata `approve` crea un'indennità (allowance) che consente a `SwapRouter` di spendere alcuni dei nostri token. I contratti non possono monitorare gli eventi, quindi se trasferissimo i token direttamente al contratto `SwapRouter`, non saprebbe di essere stato pagato. Invece, permettiamo al contratto `SwapRouter` di spendere un certo importo, e poi `SwapRouter` lo fa. Questo viene fatto tramite una funzione chiamata da `SwapRouter`, in modo che sappia se ha avuto successo.

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

Per usarlo effettivamente, hai bisogno di alcune piccole modifiche.

- Alla riga 14, cambia `MAINNET_URL` in un vero punto di accesso, come `https://eth.drpc.org`
- Alla riga 28, cambia `PRIVATE_KEY` con la tua chiave privata
- A meno che tu non sia molto ricco e possa comprare o vendere 1 ETH ogni giorno per un agente non collaudato, potresti voler cambiare la riga 29 per diminuire `WETH_TRADE_AMOUNT`

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

Nell'ABI di `SwapRouter` abbiamo solo bisogno di `exactInput`. C'è una funzione correlata, `exactOutput`, che potremmo usare per comprare esattamente un WETH, ma per semplicità usiamo solo `exactInput` in entrambi i casi.

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

Le definizioni Web3 per l'[`account`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) e il contratto `SwapRouter`.

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

I parametri della transazione. Abbiamo bisogno di una funzione qui perché [il nonce](https://it.wikipedia.org/wiki/Nonce) deve cambiare ogni volta.

```python
def approve_token(contract: Contract, amount: int):
```

Approva un'indennità di token per `SwapRouter`.

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

Questo è il modo in cui inviamo una transazione in Web3. Per prima cosa usiamo [l'oggetto `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) per costruire la transazione. Quindi usiamo [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) per firmare la transazione, usando `PRIVATE_KEY`. Infine, usiamo [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) per inviare la transazione.

```python
    print(f"Approve transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Approve transaction mined.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) attende fino a quando la transazione non viene minata. Restituisce la ricevuta se necessario.

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

Questi sono i parametri quando si vende WETH.

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

A differenza di `SELL_PARAMS`, i parametri di acquisto possono cambiare. L'importo di input è il costo di 1 WETH, come disponibile in `quote`.

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

Le funzioni `buy()` e `sell()` sono quasi identiche. Per prima cosa approviamo un'indennità sufficiente per `SwapRouter`, e poi lo chiamiamo con il percorso e l'importo corretti.

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

Riporta i saldi dell'utente in entrambe le valute.

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

Questo agente attualmente funziona solo una volta. Tuttavia, puoi modificarlo per farlo funzionare continuamente eseguendolo da [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) o racchiudendo le righe 368-400 in un ciclo e usando [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) per attendere fino al momento del ciclo successivo.

## Possibili miglioramenti {#improvements}

Questa non è una versione di produzione completa; è semplicemente un esempio per insegnare le basi. Ecco alcune idee per miglioramenti.

### Trading più intelligente {#smart-trading}

Ci sono due fatti importanti che l'agente ignora quando decide cosa fare.

- _L'entità del cambiamento previsto_. L'agente vende un importo fisso di `WETH` se si prevede che il prezzo diminuirà, indipendentemente dall'entità del calo.
  Probabilmente, sarebbe meglio ignorare i cambiamenti minori e vendere in base a quanto ci aspettiamo che il prezzo diminuisca.
- _Il portafoglio attuale_. Se il 10% del tuo portafoglio è in WETH e pensi che il prezzo salirà, probabilmente ha senso comprarne di più. Ma se il 90% del tuo portafoglio è in WETH, potresti essere sufficientemente esposto e non c'è bisogno di comprarne di più. Il contrario è vero se ti aspetti che il prezzo scenda.

### E se volessi mantenere segreta la tua strategia di trading? {#secret}

I fornitori di IA possono vedere le query che invii ai loro LLM, il che potrebbe esporre il geniale sistema di trading che hai sviluppato con il tuo agente. Un sistema di trading che troppe persone usano è inutile perché troppe persone cercano di comprare quando tu vuoi comprare (e il prezzo sale) e cercano di vendere quando tu vuoi vendere (e il prezzo scende).

Puoi eseguire un LLM localmente, ad esempio, usando [LM-Studio](https://lmstudio.ai/), per evitare questo problema.

### Da bot IA ad agente IA {#bot-to-agent}

Si può sostenere a ragione che questo sia [un bot IA, non un agente IA](/ai-agents/#ai-agents-vs-ai-bots). Implementa una strategia relativamente semplice che si basa su informazioni predefinite. Possiamo abilitare l'auto-miglioramento, ad esempio, fornendo un elenco di pool Uniswap v3 e i loro ultimi valori e chiedendo quale combinazione abbia il miglior valore predittivo.

### Protezione dallo slippage {#slippage-protection}

Attualmente non c'è [protezione dallo slippage](https://uniswapv3book.com/milestone_3/slippage-protection.html). Se la quotazione attuale è di 2000$ e il prezzo previsto è di 2100$, l'agente comprerà. Tuttavia, se prima che l'agente compri il costo sale a 2200$, non ha più senso comprare.

Per implementare la protezione dallo slippage, specifica un valore `amountOutMinimum` nelle righe 325 e 334 di [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325).

## Conclusione {#conclusion}

Speriamo che ora tu ne sappia abbastanza per iniziare con gli agenti IA. Questa non è una panoramica completa dell'argomento; ci sono interi libri dedicati a questo, ma è sufficiente per iniziare. Buona fortuna!

[Vedi qui per altri miei lavori](https://cryptodocguy.pro/).