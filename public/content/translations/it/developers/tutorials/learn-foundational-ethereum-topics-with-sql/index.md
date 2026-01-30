---
title: Imparare gli argomenti fondamentali di Ethereum con SQL
description: Questo tutorial aiuta i lettori a comprendere i concetti fondamentali di Ethereum, incluse le transazioni, i blocchi e il gas, interrogando i dati on-chain con lo Structured Query Language (SQL).
author: "Paul Apivat"
tags: [ "SQL", "Interrogazione", "Transazioni" ]
skill: beginner
lang: it
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

Molti tutorial di Ethereum sono rivolti agli sviluppatori, ma mancano risorse didattiche per gli analisti di dati o per le persone che desiderano visualizzare i dati on-chain senza eseguire un client o un nodo.

Questo tutorial aiuta i lettori a comprendere i concetti fondamentali di Ethereum, tra cui transazioni, blocchi e gas, interrogando i dati on-chain con il linguaggio di interrogazione strutturato (SQL) tramite un'interfaccia fornita da [Dune Analytics](https://dune.com/).

I dati on-chain possono aiutarci a comprendere Ethereum, la rete e un'economia per la potenza di calcolo e dovrebbero servire da base per comprendere le sfide che Ethereum affronta oggi (ad esempio, l'aumento dei prezzi del gas) e, cosa più importante, le discussioni sulle soluzioni di ridimensionamento.

### Transazioni {#transactions}

Il percorso di un utente su Ethereum inizia inizializzando un conto controllato da un utente o un'entità con un saldo in ETH. Esistono due tipi di conto: controllato dall'utente o un contratto intelligente (vedi [ethereum.org](/developers/docs/accounts/)).

Qualsiasi conto può essere visualizzato su un esploratore di blocchi come [Etherscan](https://etherscan.io/) o [Blockscout](https://eth.blockscout.com/). Gli esploratori di blocchi sono un portale per i dati di Ethereum. Visualizzano, in tempo reale, dati su blocchi, transazioni, miner, conti e altre attività on-chain (vedi [qui](/developers/docs/data-and-analytics/block-explorers/)).

Tuttavia, un utente potrebbe voler interrogare i dati direttamente per riconciliare le informazioni fornite dagli esploratori di blocchi esterni. [Dune Analytics](https://dune.com/) fornisce questa funzionalità a chiunque abbia una certa conoscenza di SQL.

Come riferimento, il conto del contratto intelligente della Ethereum Foundation (EF) può essere visualizzato su [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe).

Da notare che tutti i conti, compreso quello dell'EF, hanno un indirizzo pubblico che può essere utilizzato per inviare e ricevere transazioni.

Il saldo del conto su Etherscan comprende transazioni regolari e transazioni interne. Le transazioni interne, nonostante il nome, non sono transazioni _effettive_ che modificano lo stato della catena. Sono trasferimenti di valore avviati dall'esecuzione di un contratto ([fonte](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Poiché le transazioni interne non hanno firma, **non** sono incluse nella blockchain e non possono essere interrogate con Dune Analytics.

Pertanto, questo tutorial si concentrerà sulle transazioni regolari. Possono essere interrogate come segue:

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
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
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

Questo restituirà le stesse informazioni fornite sulla pagina delle transazioni di Etherscan. Per confronto, ecco le due fonti:

#### Etherscan {#etherscan}

![](./etherscan_view.png)

[Pagina del contratto dell'EF su Blockscout.](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![](./dune_view.png)

La dashboard è disponibile [qui](https://dune.com/paulapivat/Learn-Ethereum). Fare clic sulla tabella per visualizzare la query (vedi anche sopra).

### Analisi dettagliata delle transazioni {#breaking_down_transactions}

Una transazione inviata include diverse informazioni, tra cui ([fonte](/developers/docs/transactions/)):

- **Destinatario**: l'indirizzo di ricezione (interrogato come "to")
- **Firma**: mentre le chiavi private di un mittente firmano una transazione, ciò che possiamo interrogare con SQL è l'indirizzo pubblico di un mittente ("from").
- **Valore**: questo è l'importo di ETH trasferito (vedi la colonna `ether`).
- **Dati**: sono dati arbitrari a cui è stato applicato l'hashing (vedi la colonna `data`)
- **gasLimit** – la quantità massima di unità di gas che può essere consumata dalla transazione. Le unità di gas rappresentano i passaggi computazionali
- **maxPriorityFeePerGas** - l'importo massimo di gas da includere come mancia per il miner
- **maxFeePerGas** - l'importo massimo di gas che si è disposti a pagare per la transazione (comprensivo di baseFeePerGas e maxPriorityFeePerGas)

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

Ogni transazione modificherà lo stato della macchina virtuale di Ethereum ([EVM](/developers/docs/evm/)) ([fonte](/developers/docs/transactions/)). Le transazioni vengono trasmesse alla rete per essere verificate e incluse in un blocco. Ogni transazione è associata a un numero di blocco. Per visualizzare i dati, potremmo interrogare un numero di blocco specifico: 12396854 (il blocco più recente tra le transazioni della Ethereum Foundation al momento della stesura, 05/11/21).

Inoltre, quando interroghiamo i due blocchi successivi, possiamo vedere che ogni blocco contiene l'hash del blocco precedente (cioè l'hash genitore), illustrando come si forma la blockchain.

Ogni blocco contiene un riferimento al suo blocco genitore. Ciò è mostrato di seguito tra le colonne `hash` e `parent_hash` ([fonte](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

Ecco la [query](https://dune.com/queries/44856/88292) su Dune Analytics:

```sql
SELECT
   time,
   number,
   hash,
   parent_hash,
   nonce
FROM ethereum."blocks"
WHERE "number" = 12396854 OR "number" = 12396855 OR "number" = 12396856
LIMIT 10
```

Possiamo esaminare un blocco interrogando ora, numero del blocco, difficoltà, hash, hash genitore e nonce.

L'unica cosa che questa query non copre è l'_elenco delle transazioni_, che richiede una query separata di seguito, e la _radice di stato_. Un nodo completo o di archivio memorizzerà tutte le transazioni e le transizioni di stato, consentendo ai client di interrogare lo stato della catena in qualsiasi momento. Poiché ciò richiede un ampio spazio di archiviazione, possiamo separare i dati della catena dai dati di stato:

- Dati della catena (elenco di blocchi, transazioni)
- Dati di stato (risultato della transizione di stato di ogni transazione)

La radice di stato rientra in quest'ultima categoria ed è un dato _implicito_ (non memorizzato on-chain), mentre i dati della catena sono espliciti e memorizzati sulla catena stessa ([fonte](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

Per questo tutorial, ci concentreremo sui dati on-chain che _possono_ essere interrogati con SQL tramite Dune Analytics.

Come indicato sopra, ogni blocco contiene un elenco di transazioni, possiamo interrogarlo filtrando per un blocco specifico. Proveremo con il blocco più recente, 12396854:

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

Ecco l'output SQL su Dune:

![](./list_of_txn.png)

Questo singolo blocco, aggiunto alla catena, modifica lo stato della macchina virtuale di Ethereum ([EVM](/developers/docs/evm/)). Decine, a volte centinaia, di transazioni vengono verificate contemporaneamente. In questo caso specifico, sono state incluse 222 transazioni.

Per vedere quante hanno avuto effettivamente successo, aggiungeremmo un altro filtro per contare le transazioni andate a buon fine:

```sql
WITH temp_table AS (
    SELECT * FROM ethereum."transactions"
    WHERE block_number = 12396854 AND success = true
    ORDER BY block_time DESC
)
SELECT
    COUNT(success) AS num_successful_txn
FROM temp_table
```

Per il blocco 12396854, su un totale di 222 transazioni, 204 sono state verificate con successo:

![](./successful_txn.png)

Le richieste di transazione avvengono decine di volte al secondo, ma i blocchi vengono confermati circa una volta ogni 15 secondi ([fonte](/developers/docs/blocks/)).

Per vedere che un blocco viene prodotto circa ogni 15 secondi, potremmo prendere il numero di secondi in un giorno (86.400) e dividerlo per 15 per ottenere un numero medio stimato di blocchi al giorno (~ 5.760).

Il grafico dei blocchi di Ethereum prodotti al giorno (2016 - oggi) è:

![](./daily_blocks.png)

Il numero medio di blocchi prodotti giornalmente in questo periodo di tempo è di ~5.874:

![](./avg_daily_blocks.png)

Le query sono:

```sql
# query per visualizzare il numero di blocchi prodotti giornalmente dal 2016

SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1

# numero medio di blocchi prodotti al giorno

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

Il numero medio di blocchi prodotti al giorno dal 2016 è leggermente superiore a tale numero, attestandosi a 5.874. In alternativa, dividendo 86.400 secondi per 5.874 blocchi medi si ottengono 14,7 secondi, ovvero circa un blocco ogni 15 secondi.

### Gas {#gas}

I blocchi hanno dimensioni limitate. La dimensione massima del blocco è dinamica e varia a seconda della domanda della rete tra 12.500.000 e 25.000.000 di unità. I limiti sono necessari per evitare che le dimensioni arbitrariamente grandi dei blocchi mettano a dura prova i nodi completi, in termini di requisiti di spazio su disco e velocità ([fonte](/developers/docs/blocks/)).

Un modo per concettualizzare il limite del gas del blocco è immaginarlo come l'**offerta** di spazio disponibile nel blocco in cui raggruppare le transazioni. Il limite del gas del blocco può essere interrogato e visualizzato dal 2016 a oggi:

![](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Poi, c'è il gas effettivo, usato quotidianamente per pagare i calcoli effettuati sulla catena di Ethereum (cioè, l'invio della transazione, la chiamata di un contratto intelligente, il conio di un NFT). Questa è la **domanda** di spazio disponibile per i blocchi di Ethereum:

![](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Possiamo anche giustapporre questi due grafici insieme per vedere come si allineano **domanda e offerta**:

![gas_demand_supply](./gas_demand_supply.png)

Dunque, possiamo comprendere i prezzi del gas come una funzione della domanda di spazio per i blocchi di Ethereum, data l'offerta disponibile.

Infine, potremmo voler interrogare i prezzi medi giornalieri del gas per la catena di Ethereum, tuttavia, farlo comporterebbe un tempo di interrogazione particolarmente lungo, quindi filtreremo la nostra query sull'importo medio di gas pagato per transazione dalla Ethereum Foundation.

![](./ef_daily_gas.png)

Possiamo vedere i prezzi del gas pagati per tutte le transazioni effettuate all'indirizzo dell'Ethereum Foundation negli anni. Ecco la query:

```sql
SELECT
    block_time,
    gas_price / 1e9 AS gas_price_gwei,
    value / 1e18 AS eth_sent
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### Riepilogo {#summary}

Con questo tutorial, comprendiamo i concetti fondamentali di Ethereum e il funzionamento della blockchain di Ethereum, interrogando e familiarizzando con i dati on-chain.

La dashboard che contiene tutto il codice utilizzato in questo tutorial è disponibile [qui](https://dune.com/paulapivat/Learn-Ethereum).

Per ulteriori utilizzi dei dati per esplorare il web3, [trovami su Twitter](https://twitter.com/paulapivat).
