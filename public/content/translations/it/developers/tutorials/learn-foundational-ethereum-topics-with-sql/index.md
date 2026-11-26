---
title: Imparare gli argomenti fondamentali di Ethereum con SQL
description: Questo tutorial aiuta i lettori a comprendere i concetti fondamentali di Ethereum, tra cui transazioni, blocchi e gas, interrogando i dati onchain con lo Structured Query Language (SQL).
author: "Paul Apivat"
tags: ["SQL", "Interrogazione", "transazioni", "dati-e-analisi"]
skill: beginner
breadcrumb: Ethereum con SQL
lang: it
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://web.archive.org/web/20260516182620/https://paulapivat.com/post/query_ethereum/
---

Molti tutorial su Ethereum si rivolgono agli sviluppatori, ma mancano risorse educative per gli analisti di dati o per le persone che desiderano vedere i dati onchain senza eseguire un client o un nodo.

Questo tutorial aiuta i lettori a comprendere i concetti fondamentali di Ethereum, tra cui transazioni, blocchi e gas, interrogando i dati onchain con lo structured query language (SQL) attraverso un'interfaccia fornita da [Dune](https://dune.com/). Le query utilizzano [DuneSQL](https://docs.dune.com/query-engine/overview), il dialetto SQL di Dune.

I dati onchain possono aiutarci a comprendere Ethereum, la rete e la sua economia per la potenza di calcolo, e dovrebbero fungere da base per comprendere le sfide che Ethereum affronta oggi (ad es. l'aumento dei prezzi del gas) e, cosa più importante, le discussioni sulle soluzioni di ridimensionamento.

### Transazioni {#transactions}

Il viaggio di un utente su Ethereum inizia con l'inizializzazione di un account controllato dall'utente o di un'entità con un saldo in ETH. Esistono due tipi di account: controllati dall'utente o smart contract (vedi [ethereum.org](/developers/docs/accounts/)).

Qualsiasi account può essere visualizzato su un block explorer come [Etherscan](https://etherscan.io/) o [Blockscout](https://eth.blockscout.com/). I block explorer sono un portale per i dati di Ethereum. Mostrano, in tempo reale, dati su blocchi, transazioni, validatori, account e altre attività onchain (vedi [qui](/developers/docs/data-and-analytics/block-explorers/)).

Tuttavia, un utente potrebbe voler interrogare i dati direttamente per riconciliare le informazioni fornite dai block explorer esterni. [Dune](https://dune.com/) offre questa capacità a chiunque abbia una certa conoscenza di SQL.

Come riferimento, l'account dello smart contract della Fondazione Ethereum (EF) può essere visualizzato su [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe).

Una cosa da notare è che tutti gli account, incluso quello della EF, hanno un indirizzo pubblico che può essere utilizzato per inviare e ricevere transazioni.

Il saldo dell'account su Etherscan comprende transazioni regolari e transazioni interne. Le transazioni interne, nonostante il nome, non sono _effettive_ transazioni che cambiano lo stato della catena. Sono trasferimenti di valore avviati dall'esecuzione di un contratto ([fonte](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Poiché le transazioni interne non hanno una firma, **non** sono incluse nella blockchain come transazioni. Dune le registra separatamente, nella tabella `ethereum.traces`.

Pertanto, questo tutorial si concentrerà sulle transazioni regolari. Queste possono essere interrogate in questo modo:

```sql
WITH temp_table AS (
SELECT
    hash,
    block_number,
    block_time,
    "from",
    "to",
    value / 1e18 AS ether,
    gas_used,
    gas_price / 1e9 AS gas_price_gwei
FROM ethereum.transactions
WHERE "to" = 0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe
ORDER BY block_time DESC
)
SELECT
    hash,
    block_number,
    block_time,
    "from",
    "to",
    ether,
    (gas_used * gas_price_gwei) / 1e9 AS txn_fee
FROM temp_table
```

Nota che gli indirizzi sono scritti come letterali `0x...` senza virgolette. In DuneSQL, gli indirizzi e gli hash sono valori binari, non stringhe.

Questo produrrà le stesse informazioni fornite nella pagina delle transazioni di Etherscan. Per un confronto, ecco le due fonti:

#### Etherscan {#etherscan}

![Screenshot of Etherscan transaction explorer view](./etherscan_view.png)

[Pagina del contratto della EF su Blockscout.](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune {#dune-analytics}

![Screenshot of a Dune query dashboard](./dune_view.png)

Puoi trovare la dashboard [qui](https://dune.com/paulapivat/Learn-Ethereum). Clicca sulla tabella per vedere la query (vedi anche sopra).

### Analisi delle transazioni {#breaking-down-transactions}

Una transazione inviata include diverse informazioni, tra cui ([fonte](/developers/docs/transactions/)):

- **Destinatario**: L'indirizzo di ricezione (interrogato come "to")
- **Firma**: Mentre le chiavi private di un mittente firmano una transazione, ciò che possiamo interrogare con SQL è l'indirizzo pubblico del mittente ("from").
- **Valore**: Questo è l'importo di ETH trasferito (vedi la colonna `ether`).
- **Dati**: Si tratta di dati arbitrari che sono stati sottoposti a hash (vedi la colonna `data`)
- **gasLimit** – la quantità massima di unità di gas che può essere consumata dalla transazione. Le unità di gas rappresentano i passaggi computazionali
- **maxPriorityFeePerGas** - la quantità massima di gas da includere come commissione prioritaria per il validatore
- **maxFeePerGas** - la quantità massima di gas che si è disposti a pagare per la transazione (comprensiva di baseFeePerGas e maxPriorityFeePerGas)

Possiamo interrogare queste informazioni specifiche per le transazioni verso l'indirizzo pubblico della Fondazione Ethereum:

```sql
SELECT
    "to",
    "from",
    value / 1e18 AS ether,
    data,
    gas_limit,
    gas_price / 1e9 AS gas_price_gwei,
    gas_used,
    ROUND(CAST(gas_used AS DOUBLE) / gas_limit * 100, 2) AS gas_used_pct
FROM ethereum.transactions
WHERE "to" = 0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe
ORDER BY block_time DESC
```

Il `CAST` è necessario perché dividere un intero per un altro in DuneSQL restituisce un risultato intero, il che arrotonderebbe quasi ogni percentuale per difetto a zero.

### Blocchi {#blocks}

Ogni transazione cambierà lo stato della Macchina Virtuale di Ethereum ([EVM](/developers/docs/evm/)) ([fonte](/developers/docs/transactions/)). Le transazioni vengono trasmesse alla rete per essere verificate e incluse in un blocco. Ogni transazione è associata a un numero di blocco. Per vedere i dati, potremmo interrogare un numero di blocco specifico: 12396854 (il blocco più recente tra le transazioni della Ethereum Foundation al momento della stesura, a maggio 2021).

Inoltre, quando interroghiamo i due blocchi successivi, possiamo vedere che ogni blocco contiene l'hash del blocco precedente (ovvero, l'hash genitore), illustrando come si forma la blockchain.

Ogni blocco contiene un riferimento al suo blocco genitore. Questo è mostrato di seguito tra le colonne `hash` e `parent_hash` ([fonte](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

Ecco la query:

```sql
SELECT
   time,
   number,
   hash,
   parent_hash,
   nonce
FROM ethereum.blocks
WHERE number IN (12396854, 12396855, 12396856)
```

Possiamo esaminare un blocco interrogando l'ora, il numero del blocco, l'hash, l'hash genitore e il nonce. Il blocco 12396854 è stato prodotto prima di [The Merge](/roadmap/merge/), quando i blocchi venivano minati con la Prova di lavoro (PoW) e il nonce era significativo. Nei blocchi Proof-of-Stake (PoS) il nonce è sempre zero.

L'unica cosa che questa query non copre è l'_elenco delle transazioni_, che richiede una query separata di seguito, e la _radice di stato_ (state root). Un nodo completo o di archivio memorizzerà tutte le transazioni e le transizioni di stato, consentendo ai client di interrogare lo stato della catena in qualsiasi momento. Poiché ciò richiede un ampio spazio di archiviazione, possiamo separare i dati della catena dai dati di stato:

- Dati della catena (elenco di blocchi, transazioni)
- Dati di stato (risultato della transizione di stato di ogni transazione)

La radice di stato rientra in questi ultimi e rappresenta dati _impliciti_ (non memorizzati onchain), mentre i dati della catena sono espliciti e memorizzati sulla catena stessa ([fonte](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

Per questo tutorial, ci concentreremo sui dati onchain che _possono_ essere interrogati con SQL tramite Dune.

Come affermato in precedenza, ogni blocco contiene un elenco di transazioni; possiamo interrogarlo filtrando per un blocco specifico. Proveremo con il blocco 12396854:

```sql
SELECT * FROM ethereum.transactions
WHERE block_number = 12396854
```

Ecco l'output SQL su Dune:

![Screenshot of a list of Ethereum transactions](./list_of_txn.png)

L'aggiunta di questo singolo blocco alla catena cambia lo stato della Macchina Virtuale di Ethereum ([EVM](/developers/docs/evm/)). A volte dozzine, centinaia di transazioni vengono verificate contemporaneamente. In questo caso specifico, sono state incluse 222 transazioni.

Per vedere quante hanno effettivamente avuto successo, aggiungeremmo un altro filtro per contare le transazioni riuscite:

```sql
SELECT
    COUNT(*) AS num_successful_txn
FROM ethereum.transactions
WHERE block_number = 12396854 AND success = true
```

Per il blocco 12396854, su 222 transazioni totali, 204 sono state verificate con successo:

![Screenshot of a successful Ethereum transaction](./successful_txn.png)

Le richieste di transazione si verificano dozzine di volte al secondo, ma i blocchi vengono aggiunti solo periodicamente ([fonte](/developers/docs/blocks/)). Con la Prova di lavoro (PoW), un blocco veniva minato in media ogni 13-15 secondi, con molta variazione. Da [The Merge](/roadmap/merge/) a settembre 2022, la Proof-of-Stake (PoS) divide il tempo in slot di 12 secondi e ogni slot può avere al massimo un blocco.

Quindi oggi possono esserci al massimo 86400 / 12 = 7200 blocchi al giorno. In pratica ce ne sono leggermente meno, perché un validatore occasionalmente manca il suo slot.

Il grafico dei blocchi di Ethereum prodotti al giorno (2016 - 2021) è:

![Chart showing daily Ethereum block production](./daily_blocks.png)

Il numero medio di blocchi prodotti quotidianamente in questo periodo di tempo è di circa 5.874:

![Chart showing daily Ethereum block production](./avg_daily_blocks.png)

Le query sono:

Ecco la query per visualizzare il numero di blocchi prodotti quotidianamente. La clausola `WHERE` esclude il giorno corrente, che non è ancora terminato.

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum.blocks
WHERE time < DATE_TRUNC('day', NOW())
GROUP BY 1
ORDER BY 1
```

E questa query calcola il numero medio di blocchi prodotti al giorno, prima e dopo The Merge. Il blocco 15537394 è il primo blocco Proof-of-Stake.

```sql
WITH daily AS (
    SELECT
        DATE_TRUNC('day', time) AS dt,
        MIN(number) >= 15537394 AS after_merge,
        COUNT(*) AS block_count
    FROM ethereum.blocks
    WHERE time < DATE_TRUNC('day', NOW())
    GROUP BY 1
)
SELECT
    after_merge,
    AVG(block_count) AS avg_block_count,
    86400 / AVG(block_count) AS avg_seconds_per_block
FROM daily
GROUP BY 1
```

Quando questo tutorial è stato scritto per la prima volta a maggio 2021, la media era di 5.874 blocchi al giorno, ovvero un blocco ogni 14,7 secondi. Dopo The Merge, la media è appena sotto il massimo di 7200, circa un blocco ogni 12 secondi.

### Gas {#gas}

I blocchi hanno dimensioni limitate. Ogni blocco ha un limite di gas e, a partire dalla [EIP-1559](/developers/docs/gas/#base-fee), ogni blocco ha anche un obiettivo di gas, che è la metà del limite. Quando i blocchi utilizzano più gas dell'obiettivo, la commissione di base aumenta, e quando ne utilizzano meno, diminuisce. Il limite di gas stesso viene regolato dai validatori ed è stato aumentato diverse volte nel corso degli anni. I limiti sono necessari per evitare che dimensioni dei blocchi arbitrariamente grandi mettano a dura prova i nodi completi in termini di spazio su disco e requisiti di velocità ([fonte](/developers/docs/blocks/)).

Un modo per concettualizzare il limite di gas del blocco è pensarlo come l'**offerta** di spazio disponibile nel blocco in cui raggruppare le transazioni. Il limite di gas del blocco può essere interrogato e visualizzato dal 2016 a oggi:

![Chart showing average Ethereum gas limit over time](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum.blocks
WHERE time < DATE_TRUNC('day', NOW())
GROUP BY 1
ORDER BY 1
```

Poi c'è il gas effettivo utilizzato quotidianamente per pagare il calcolo eseguito sulla catena di Ethereum (ad es. inviare una transazione, chiamare uno smart contract, coniare un token non fungibile (NFT)). Questa è la **domanda** di spazio disponibile nei blocchi di Ethereum:

![Chart showing daily Ethereum gas used](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum.blocks
WHERE time < DATE_TRUNC('day', NOW())
GROUP BY 1
ORDER BY 1
```

Possiamo anche giustapporre questi due grafici per vedere come si allineano **domanda e offerta**:

![gas_demand_supply](./gas_demand_supply.png)

Pertanto possiamo comprendere i prezzi del gas come una funzione della domanda di spazio nei blocchi di Ethereum, data l'offerta disponibile.

Infine, potremmo voler interrogare i prezzi medi giornalieri del gas per la catena di Ethereum; tuttavia, farlo comporterà un tempo di query particolarmente lungo, quindi filtreremo la nostra query per la quantità media di gas pagata per transazione dalla Fondazione Ethereum.

![Chart showing Ethereum Foundation daily gas usage](./ef_daily_gas.png)

Possiamo vedere i prezzi del gas pagati per tutte le transazioni effettuate verso l'indirizzo della Fondazione Ethereum nel corso degli anni. Ecco la query:

```sql
SELECT
    block_time,
    gas_price / 1e9 AS gas_price_gwei,
    value / 1e18 AS eth_sent
FROM ethereum.transactions
WHERE "to" = 0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe
ORDER BY block_time DESC
```

### Riepilogo {#summary}

Con questo tutorial, comprendiamo i concetti fondamentali di Ethereum e come funziona la blockchain di Ethereum interrogando e prendendo confidenza con i dati onchain.

La dashboard che contiene tutto il codice utilizzato in questo tutorial può essere trovata [qui](https://dune.com/paulapivat/Learn-Ethereum).

Per un ulteriore utilizzo dei dati per esplorare il Web3 [trovami su Twitter](https://twitter.com/paulapivat).
