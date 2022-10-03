---
title: Imparare gli argomenti fondamentali di Ethereum con SQL
description: Questo tutorial aiuta i lettori a comprendere i concetti fondamentali di Ethereum, incluse transazioni, blocchi e carburante, effettuando query di dati sulla catena con lo Structured Query Language (SQL).
author: "Paul Apivat"
tags:
  - "SQL"
  - "Interrogazioni"
  - "Analisi"
  - "Primi passi"
  - "Dune Analytics"
  - "Blocchi"
  - "Transazioni"
  - "Carburante"
skill: beginner
lang: it
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

Molti tutorial di Ethereum sono rivolti agli sviluppatori, mancano invece risorse educative per gli analisti di dati o per le persone che vogliono visualizzare dati sulla catena senza eseguire un client o un nodo.

Questo tutorial aiuta i lettori a comprendere i concetti fondamentali di Ethereum, incluse transazioni, blocchi e carburante, effettuando query di dati sulla catena con lo Structured Query Language (SQL) tramite un'interfaccia fornita da [Dune Analytics](https://dune.xyz/home).

I dati sulla catena possono aiutarci a comprendere Ethereum, la rete e, un'economia per la potenza di calcolo, e dovrebbero servire come una base per la comprensione delle sfide che Ethereum sta affrontando oggi (es., aumento dei prezzi del carburante) e, soprattutto, come confronto sulle soluzioni di scaling.

### Transazioni {#transactions}

Il percorso di un utente su Ethereum inizia inizializzando l'account controllato da un utente o un'entità con un saldo di ETH. Esistono due tipi di account: account controllato dall'utente o smart contract (vedi [ethereum.org](/developers/docs/accounts/)).

Ogni conto è visualizzabile su un esploratore di blocchi come [Etherscan](https://etherscan.io/). Gli esploratori di blocchi sono un portale ai dati di Ethereum. Mostrano, in tempo reale, i dati su blocchi, transazioni, miner, account e altre attività sulla catena (vedi [qui](/developers/docs/data-and-analytics/block-explorers/)).

Tuttavia, è possibile che un utente voglia interrogare i dati direttamente per riconciliare le informazioni fornite da esploratori di blocchi esterni. [Dune Analytics](https://duneanalytics.com/)mette a disposizione questa capacità a chiunque abbia una conoscenza di SQL.

Per riferimento, l'account dello smart contract per la Ethereum Foundation (EF) può visualizzato visto su [Etherscan](https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae).

Una cosa da notare è che tutti gli account, incluso quello dell'EF, hanno un indirizzo pubblico utilizzabile per inviare e ricevere le transazioni.

Il saldo del conto su Etherscan comprende transazioni regolari e interne. Le transazioni interne, nonostante il nome, non sono transazioni _reali_ che modificano lo stato della catena. Sono trasferimenti di valore avviati eseguendo un contratto ([sorgente](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Poiché le transazioni interne non hanno firma, **non** sono incluse sulla blockchain e non sono interrogabili con Dune Analytics.

Questo tutorial si concentrerà dunque sulle transazioni regolari. Queste sono interrogabili come segue:

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

Questo produrrà le stesse informazioni fornite sulla pagina della transazione di Etherscan. A titolo di confronto, ecco le due sorgenti:

#### Etherscan {#etherscan}

![etherscan_view](./etherscan_view.png)

[Pagina del contratto dell'EF su Etherscan.](https://etherscan.io/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![dune_view](./dune_view.png)

Puoi trovare la dashboard [qui](https://duneanalytics.com/paulapivat/Learn-Ethereum). Clicca sulla tabella per vedere l'interrogazione (vedi anche sopra).

### Spezzare le Transazioni {#breaking_down_transactions}

Una transazione inviata presenta diverse informazioni, tra cui ([sorgente](/developers/docs/transactions/)):

- **Destinatario**: l'indirizzo ricevente (interrogato come "a")
- **Firma**: mentre le chiavi private di un mittente firmano una transazione, con SQL possiamo interrogare l'indirizzo pubblico di un mittente ("da").
- **Valore**: questo è l'importo di ETH trasferito (vedi la colonna di `ether`).
- **Dati**: sono i dati arbitrari che hanno ricevuto l'hashing (vedi la colonna `data`)
- **gasLimit**: la massima quantità di carburante, o il costo del calcolo, consumabile da una transazione (vedi `gas_limit`).
- **gasPrice**: la commissione che il mittente paga per firmare una transazione sulla blockchain. Il carburante è denominato in Gwei, ovvero 0,000000001 ETH (nove decimali).

Possiamo richiedere informazioni specifici per le transazioni all'indirizzo pubblico della Ethereum Foundation:

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

Ogni transazione cambierà lo stato della macchina virtuale di Ethereum ([EVM](/developers/docs/evm/)) ([sorgente](/developers/docs/transactions/)). Le transazioni sono trasmesse alla rete per esser verificate e incluse in un blocco. Ogni transazione è associata al numero di un blocco. Per vedere i dati, potremmo interrogare un numero di blocco specifico: 12396854 (il blocco più recente tra le transazioni di Ethereum Foundation al momento della scrittura, 05/11/2021).

Inoltre, quando interroghiamo i due blocchi successivi, possiamo vedere che ogni blocco contiene l'hash del blocco precedente (cioè l'hash padre), e questo illustra com'è formata la blockchain.

Ogni blocco contiene un riferimento al suo blocco padre. Questo è mostrato di sotto tra le colonne `hash` e `parent_hash` ([sorgente](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

Ecco l'[interrogazione](https://duneanalytics.com/queries/44856/88292) su Dune Analytics:

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

Possiamo esaminare un blocco interrogando orario, numero del blocco, difficoltà, hash, hash padre e nonce.

L'unica cosa che questa interrogazione non copre è l'_elenco di transazioni_, che richiede un'apposita interrogazione successiva, e il _root di stato_. Un nodo completo o d'archivio memorizzerà tutte le transazioni e transizioni di stato, consentendo ai client di interrogare lo stato della catena in qualsiasi momento. Poiché questo richiede un grande spazio d'archiviazione, possiamo separare i dati della catena dai dati di stato:

- Dati della catena (elenco di blocchi, transazioni)
- Dati di stato (risultato della transizione di stato di ogni transazione)

Il root di stato rientra nel secondo gruppo e si compone di dati _impliciti_ (non memorizzati sulla catena), mentre i dati della catena sono espliciti e memorizzati nella catena stessa ([sorgente](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

Per questo tutorial, ci concentreremo sui dati sulla catena che sono _interrogabili_ con SQL tramite Dune Analytics.

Come indicato sopra, ogni blocco contiene un elenco di transazioni, possiamo interrogarlo filtrando per un blocco specifico. Proveremo con il blocco più recente, 12396854:

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

Ecco l'output in SQL su Dune:

![list_of_txn](./list_of_txn.png)

Questo singolo blocco aggiunto alla catena cambia lo stato della macchina virtuale di Ethereum ([EVM](/developers/docs/evm/)). Dozzine, a volte, centinaia di transazioni vengono verificate in un solo colpo. In questo caso specifico, sono state incluse 222 transazioni.

Per vedere quante sono realmente riuscite, aggiungeremmo un altro filtro per contare le transazioni riuscite:

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

Per il blocco 12396854, di 222 transazioni totali, 204 sono state verificate correttamente:

![successful_txn](./successful_txn.png)

Le richieste di transazioni si verificano dozzine di volte al secondo, ma i blocchi sono impegnati approssimativamente ogni 15 secondi ([sorgente](/developers/docs/blocks/)).

Per vedere che un blocco è prodotto approssimativamente ogni 15 secondi, potremmo prendere il numero di secondi in un giorno (86400) diviso per 15 per ottenere una _stima_ del numero medio di blocchi al giorno (~ 5760).

Il grafico per i blocchi di Ethereum prodotti al giorno (2016 - presente) è:

![daily_blocks](./daily_blocks.png)

Il numero medio di blocchi prodotti giornalmente in questo periodo di tempo è di ~5.874:

![avg_daily_blocks](./avg_daily_blocks.png)

Le interrogazioni sono:

```sql
# query to visualize number of blocks produced daily since 2016

SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1

# average number of blocks produced per day

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

Il numero medio di blocchi prodotto ogni giorno dal 2016 è lievemente superiore a quel numero, a 5.874. In alternativa, dividendo 86400 secondi per i 5874 blocchi medi, si ottiene 14,7 secondi, pari a circa un blocco ogni 15 secondi.

### Carburante {#gas}

I blocchi hanno dimensioni limitate. Ogni blocco ha un limite di carburante che è collettivamente impostato dai miner e dalla rete per prevenire una dimensione del blocco arbitrariamente grande, così da ridurre il peso sul nodo completo in termini di requisiti di spazio su disco e velocità ([sorgente](/developers/docs/blocks/)).

Un modo per concettualizzare il limite di carburante del blocco è pensare a esso come la **fornitura** di spazio per i blocchi disponibile in cui raggruppare le transazioni. Il limite di carburante del blocco è interrogabile e visualizzabile dal 2016 a oggi:

![avg_gas_limit](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Poi c'è il carburante reale usato giornalmente per pagare per i calcoli effettuati sulla catena di Ethereum (es., inviare una transazione, chiamare uno smart contract, coniare un NFT). Questa è la **domanda** di spazio per i blocchi disponibile di Ethereum:

![daily_gas_used](./daily_gas_used.png)

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

Possiamo quindi vedere i prezzi del carburante come una funzione della domanda di spazio per i blocchi di Ethereum, alla luce dell'offerta disponibile.

Infine, potremmo voler interrogare i prezzi giornalieri medi del carburante per la catena di Ethereum, per farlo occorrerà però un tempo di interrogazione particolarmente lungo, quindi filtreremo la nostra interrogazione alla quantità di carburante media pagata per transazione dalla Ethereum Foundation.

![ef_daily_gas](./ef_daily_gas.png)

Possiamo vedere i prezzi del carburante pagati negli anni nelle transazioni all'indirizzo dell'Ethereum Foundation. Ecco l'interrogazione:

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

Con questo tutorial esaminiamo i concetti fondamentali di Ethereum e come funziona la blockchain di Ethereum interrogando e comprendendo i dati sulla catena.

La dashboard che contiene tutto il codice usato in questo tutorial si può trovare [qui](https://duneanalytics.com/paulapivat/Learn-Ethereum).

Per altri usi dei dati per l'esplorazione di web3 [cercami su Twitter](https://twitter.com/paulapivat).
