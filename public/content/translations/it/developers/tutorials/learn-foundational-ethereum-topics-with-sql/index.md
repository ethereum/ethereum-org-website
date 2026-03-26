---
title: Imparare gli argomenti fondamentali di Ethereum con SQL
description: Questo tutorial aiuta i lettori a comprendere i concetti fondamentali di Ethereum, tra cui transazioni, blocchi e gas, interrogando i dati on-chain con lo Structured Query Language (SQL).
author: "Paul Apivat"
tags: ["SQL", "Interrogazione", "Transazioni", "dati e analisi"]
skill: beginner
breadcrumb: Ethereum con SQL
lang: it
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

Molti tutorial su Ethereum si rivolgono agli sviluppatori, ma mancano risorse educative per gli analisti di dati o per le persone che desiderano vedere i dati on-chain senza eseguire un client o un nodo.

Questo tutorial aiuta i lettori a comprendere i concetti fondamentali di Ethereum, tra cui transazioni, blocchi e gas, interrogando i dati on-chain con lo structured query language (SQL) attraverso un'interfaccia fornita da [Dune Analytics](https://dune.com/).

I dati on-chain possono aiutarci a comprendere Ethereum, la rete, e come economia per la potenza di calcolo e dovrebbero servire come base per comprendere le sfide che Ethereum affronta oggi (ad es., l'aumento dei prezzi del gas) e, cosa più importante, le discussioni sulle soluzioni di scalabilità.

### Transazioni {#transactions}

Il viaggio di un utente su Ethereum inizia con l'inizializzazione di un account controllato dall'utente o di un'entità con un saldo in ETH. Esistono due tipi di account: controllato dall'utente o un contratto intelligente (vedi [ethereum.org](/developers/docs/accounts/)).

Qualsiasi account può essere visualizzato su un esploratore di blocchi come [Etherscan](https://etherscan.io/) o [Blockscout](https://eth.blockscout.com/). Gli esploratori di blocchi sono un portale per i dati di Ethereum. Mostrano, in tempo reale, dati su blocchi, transazioni, minatori, account e altre attività on-chain (vedi [qui](/developers/docs/data-and-analytics/block-explorers/)).

Tuttavia, un utente potrebbe voler interrogare i dati direttamente per riconciliare le informazioni fornite dagli esploratori di blocchi esterni. [Dune Analytics](https://dune.com/) offre questa capacità a chiunque abbia una certa conoscenza di SQL.

Come riferimento, l'account del contratto intelligente per la Ethereum Foundation (EF) può essere visualizzato su [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe).

Una cosa da notare è che tutti gli account, incluso quello della EF, hanno un indirizzo pubblico che può essere utilizzato per inviare e ricevere transazioni.

Il saldo dell'account su Etherscan comprende transazioni regolari e transazioni interne. Le transazioni interne, nonostante il nome, non sono _effettive_ transazioni che cambiano lo stato della catena. Sono trasferimenti di valore avviati dall'esecuzione di un contratto ([fonte](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Poiché le transazioni interne non hanno firma, **non** sono incluse nella blockchain e non possono essere interrogate con Dune Analytics.

Pertanto, questo tutorial si concentrerà sulle transazioni regolari. Queste possono essere interrogate in questo modo:

```sql
WITH temp_table AS (
SELECT
    hash,
    "from",
    "to",
    value / 1e18 AS ether,
    data,
    "gas_limit",
    "gas_price" / 1e9 AS gas_price_gwei,
    "gas_used",
    ROUND(((gas_used / gas_limit) * 100),2) AS gas_used_pct
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
)
SELECT
    hash,
    "from",
    "to",
    ether,
    data,
    gas_limit,
    gas_price_gwei,
    gas_used,
    gas_used_pct,
    (gas_used * gas_price_gwei) / 1e9 AS txn_fee
FROM temp_table
```

Questo produrrà le stesse informazioni fornite sulla pagina delle transazioni di Etherscan. Per confronto, ecco le due fonti:

#### Etherscan {#etherscan}

![Screenshot della vista dell'esploratore di transazioni di Etherscan](./etherscan_view.png)

[Pagina del contratto della EF su Blockscout.](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![Screenshot di una dashboard di interrogazione di Dune Analytics](./dune_view.png)

Puoi trovare la dashboard [qui](https://dune.com/paulapivat/Learn-Ethereum). Clicca sulla tabella per vedere l'interrogazione (vedi anche sopra).

### Scomposizione delle Transazioni {#breaking_down_transactions}

Una transazione inviata include diverse informazioni, tra cui ([fonte](/developers/docs/transactions/)):

- **Destinatario**: L'indirizzo di ricezione (interrogato come "to")
- **Firma**: Mentre le chiavi private di un mittente firmano una transazione, ciò che possiamo interrogare con SQL è l'indirizzo pubblico del mittente ("from").
- **Valore**: Questo è l'importo di ETH trasferito (vedi la colonna `ether`).
- **Dati**: Si tratta di dati arbitrari che sono stati sottoposti a hash (vedi la colonna `data`)
- **gasLimit** – la quantità massima di unità di gas che può essere consumata dalla transazione. Le unità di gas rappresentano i passaggi computazionali
- **maxPriorityFeePerGas** - la quantità massima di gas da includere come mancia al minatore
- **maxFeePerGas** - la quantità massima di gas che si è disposti a pagare per la transazione (inclusi baseFeePerGas e maxPriorityFeePerGas)

Possiamo interrogare queste informazioni specifiche per le transazioni verso l'indirizzo pubblico della Ethereum Foundation:

```sql
SELECT
    "to",
    "from",
    value / 1e18 AS ether,
    data,
    gas_limit,
    gas_price / 1e9 AS gas_price_gwei,
    gas_used,
    ROUND(((gas_used / gas_limit) * 100),2) AS gas_used_pct
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### Blocchi {#blocks}

Ogni transazione cambierà lo stato della macchina virtuale di Ethereum ([EVM](/developers/docs/evm/)) ([fonte](/developers/docs/transactions/)). Le transazioni vengono trasmesse alla rete per essere verificate e incluse in un blocco. Ogni transazione è associata a un numero di blocco. Per vedere i dati, potremmo interrogare un numero di blocco specifico: 12396854 (il blocco più recente tra le transazioni della Ethereum Foundation al momento in cui scriviamo, 11/5/21).

Inoltre, quando interroghiamo i due blocchi successivi, possiamo vedere che ogni blocco contiene l'hash del blocco precedente (ovvero, l'hash genitore), illustrando come si forma la blockchain.

Ogni blocco contiene un riferimento al suo blocco genitore. Questo è mostrato di seguito tra le colonne `hash` e `parent_hash` ([fonte](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

Ecco l'[interrogazione](https://dune.com/queries/44856/88292) su Dune Analytics:

```sql
SELECT
    time,
    number,
    difficulty,
    hash,
    parent_hash,
    nonce
FROM ethereum."blocks"
WHERE "number" = 12396854 OR "number" = 12396855 OR "number" = 12396856
LIMIT 10
```

Possiamo esaminare un blocco interrogando tempo, numero di blocco, difficoltà, hash, hash genitore e nonce.

L'unica cosa che questa interrogazione non copre è la _lista delle transazioni_, che richiede un'interrogazione separata di seguito, e la _radice di stato_ (state root). Un nodo completo o di archivio memorizzerà tutte le transazioni e le transizioni di stato, consentendo ai client di interrogare lo stato della catena in qualsiasi momento. Poiché ciò richiede un ampio spazio di archiviazione, possiamo separare i dati della catena dai dati di stato:

- Dati della catena (lista di blocchi, transazioni)
- Dati di stato (risultato della transizione di stato di ogni transazione)

La radice di stato rientra in quest'ultimo ed è un dato _implicito_ (non memorizzato on-chain), mentre i dati della catena sono espliciti e memorizzati sulla catena stessa ([fonte](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

Per questo tutorial, ci concentreremo sui dati on-chain che _possono_ essere interrogati con SQL tramite Dune Analytics.

Come affermato sopra, ogni blocco contiene una lista di transazioni; possiamo interrogarla filtrando per un blocco specifico. Proveremo con il blocco più recente, 12396854:

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
```

Ecco l'output SQL su Dune:

![Screenshot di una lista di transazioni di Ethereum](./list_of_txn.png)

L'aggiunta di questo singolo blocco alla catena cambia lo stato della macchina virtuale di Ethereum ([EVM](/developers/docs/evm/)). Dozzine, a volte centinaia di transazioni vengono verificate contemporaneamente. In questo caso specifico, sono state incluse 222 transazioni.

Per vedere quante hanno avuto effettivamente successo, aggiungeremmo un altro filtro per contare le transazioni riuscite:

```sql
SELECT
    COUNT(success) AS successful_txn
FROM ethereum."transactions"
WHERE block_number = 12396854 AND success = true
```

Per il blocco 12396854, su 222 transazioni totali, 204 sono state verificate con successo:

![Screenshot di una transazione di Ethereum riuscita](./successful_txn.png)

Le richieste di transazioni avvengono dozzine di volte al secondo, ma i blocchi vengono confermati circa una volta ogni 15 secondi ([fonte](/developers/docs/blocks/)).

Per vedere che viene prodotto un blocco circa ogni 15 secondi, potremmo prendere il numero di secondi in un giorno (86400) diviso per 15 per ottenere un numero medio stimato di blocchi al giorno (~ 5760).

Il grafico dei blocchi di Ethereum prodotti al giorno (dal 2016 a oggi) è:

![Grafico che mostra la produzione giornaliera di blocchi di Ethereum](./daily_blocks.png)

Il numero medio di blocchi prodotti quotidianamente in questo periodo di tempo è ~5.874:

![Grafico che mostra la produzione giornaliera di blocchi di Ethereum](./avg_daily_blocks.png)

Le interrogazioni sono:

```sql
-- query for daily blocks produced
SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1

-- query for average blocks produced per day
WITH temp_table AS (
SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
)
SELECT
    AVG(block_count) AS avg_block_count
FROM temp_table
```

Il numero medio di blocchi prodotti al giorno dal 2016 è leggermente superiore a quel numero, a 5.874. In alternativa, dividendo 86400 secondi per 5874 blocchi medi si ottengono 14,7 secondi, ovvero circa un blocco ogni 15 secondi.

### Gas {#gas}

I blocchi hanno dimensioni limitate. La dimensione massima del blocco è dinamica e varia in base alla domanda della rete tra 12.500.000 e 25.000.000 di unità. I limiti sono necessari per evitare che dimensioni di blocco arbitrariamente grandi mettano sotto sforzo i nodi completi in termini di spazio su disco e requisiti di velocità ([fonte](/developers/docs/blocks/)).

Un modo per concettualizzare il limite del gas del blocco è pensarlo come l'**offerta** di spazio disponibile nel blocco in cui raggruppare le transazioni. Il limite del gas del blocco può essere interrogato e visualizzato dal 2016 a oggi:

![Grafico che mostra il limite medio del gas di Ethereum nel tempo](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Poi c'è il gas effettivo utilizzato quotidianamente per pagare il calcolo eseguito sulla catena di Ethereum (ad es., inviare una transazione, chiamare un contratto intelligente, coniare un NFT). Questa è la **domanda** di spazio disponibile nei blocchi di Ethereum:

![Grafico che mostra il gas di Ethereum utilizzato quotidianamente](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Possiamo anche giustapporre questi due grafici per vedere come si allineano **domanda e offerta**:

![gas_demand_supply](./gas_demand_supply.png)

Pertanto possiamo comprendere i prezzi del gas come una funzione della domanda di spazio nei blocchi di Ethereum, data l'offerta disponibile.

Infine, potremmo voler interrogare i prezzi medi giornalieri del gas per la catena di Ethereum; tuttavia, farlo comporterà un tempo di interrogazione particolarmente lungo, quindi filtreremo la nostra interrogazione per la quantità media di gas pagata per transazione dalla Ethereum Foundation.

![Grafico che mostra l'utilizzo giornaliero di gas della Ethereum Foundation](./ef_daily_gas.png)

Possiamo vedere i prezzi del gas pagati per tutte le transazioni effettuate verso l'indirizzo della Ethereum Foundation nel corso degli anni. Ecco l'interrogazione:

```sql
SELECT
    block_time,
    gas_price / 1e9 AS gas_price_gwei
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### Riepilogo {#summary}

Con questo tutorial, comprendiamo i concetti fondamentali di Ethereum e come funziona la blockchain di Ethereum interrogando e prendendo confidenza con i dati on-chain.

La dashboard che contiene tutto il codice utilizzato in questo tutorial può essere trovata [qui](https://dune.com/paulapivat/Learn-Ethereum).

Per un ulteriore utilizzo dei dati per esplorare il web3 [trovami su Twitter](https://twitter.com/paulapivat).