---
title: Grundlegende Ethereum-Themen mit SQL lernen
description: "Dieses Tutorial hilft Lesern, grundlegende Ethereum-Konzepte wie Transaktionen, Blöcke und Gas zu verstehen, indem Onchain-Daten mit der Structured Query Language (SQL) abgefragt werden."
author: "Paul Apivat"
tags: ["SQL", "Abfragen", "Transaktionen", "Daten und Analysen"]
skill: beginner
breadcrumb: Ethereum mit SQL
lang: de
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

Viele Ethereum-Tutorials richten sich an Entwickler, aber es mangelt an Bildungsressourcen für Datenanalysten oder für Personen, die Onchain-Daten einsehen möchten, ohne einen Client oder Knoten auszuführen.

Dieses Tutorial hilft Lesern, grundlegende Ethereum-Konzepte wie Transaktionen, Blöcke und Gas zu verstehen, indem Onchain-Daten mit der Structured Query Language (SQL) über eine von [Dune Analytics](https://dune.com/) bereitgestellte Schnittstelle abgefragt werden.

Onchain-Daten können uns helfen, Ethereum, das Netzwerk und seine Funktion als Wirtschaftssystem für Rechenleistung zu verstehen. Sie sollten als Grundlage dienen, um die heutigen Herausforderungen von Ethereum (z. B. steigende Gaspreise) und, was noch wichtiger ist, die Diskussionen über Skalierungslösungen zu verstehen.

### Transaktionen {#transactions}

Die Reise eines Benutzers auf Ethereum beginnt mit der Initialisierung eines benutzergesteuerten Kontos oder einer Entität mit einem ETH-Guthaben. Es gibt zwei Arten von Konten – benutzergesteuerte oder ein Smart Contract (siehe [ethereum.org](/developers/docs/accounts/)).

Jedes Konto kann in einem Block-Explorer wie [Etherscan](https://etherscan.io/) oder [Blockscout](https://eth.blockscout.com/) eingesehen werden. Block-Explorer sind ein Portal zu den Daten von Ethereum. Sie zeigen in Echtzeit Daten zu Blöcken, Transaktionen, Minern, Konten und anderen Onchain-Aktivitäten an (siehe [hier](/developers/docs/data-and-analytics/block-explorers/)).

Ein Benutzer möchte die Daten jedoch möglicherweise direkt abfragen, um die von externen Block-Explorern bereitgestellten Informationen abzugleichen. [Dune Analytics](https://dune.com/) bietet diese Möglichkeit für jeden mit grundlegenden SQL-Kenntnissen.

Als Referenz kann das Smart-Contract-Konto der Ethereum Foundation (EF) auf [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) eingesehen werden.

Es ist zu beachten, dass alle Konten, einschließlich des Kontos der EF, eine öffentliche Adresse haben, die zum Senden und Empfangen von Transaktionen verwendet werden kann.

Der Kontostand auf Etherscan setzt sich aus regulären Transaktionen und internen Transaktionen zusammen. Interne Transaktionen sind, trotz des Namens, keine _tatsächlichen_ Transaktionen, die den Zustand der Chain ändern. Es handelt sich um Wertübertragungen, die durch die Ausführung eines Vertrags initiiert werden ([Quelle](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Da interne Transaktionen keine Signatur haben, sind sie **nicht** in der Blockchain enthalten und können nicht mit Dune Analytics abgefragt werden.

Daher wird sich dieses Tutorial auf reguläre Transaktionen konzentrieren. Diese können wie folgt abgefragt werden:

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

Dies liefert dieselben Informationen, die auch auf der Transaktionsseite von Etherscan bereitgestellt werden. Zum Vergleich sind hier die beiden Quellen:

#### Etherscan {#etherscan}

![Screenshot of Etherscan transaction explorer view](./etherscan_view.png)

[Vertragsseite der EF auf Blockscout.](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![Screenshot of a Dune Analytics query dashboard](./dune_view.png)

Das Dashboard finden Sie [hier](https://dune.com/paulapivat/Learn-Ethereum). Klicken Sie auf die Tabelle, um die Abfrage zu sehen (siehe auch oben).

### Transaktionen aufschlüsseln {#breaking-down-transactions}

Eine eingereichte Transaktion enthält mehrere Informationen, darunter ([Quelle](/developers/docs/transactions/)):

- **Empfänger**: Die empfangende Adresse (abgefragt als "to")
- **Signatur**: Während der private Schlüssel eines Senders eine Transaktion signiert, können wir mit SQL die öffentliche Adresse des Senders ("from") abfragen.
- **Wert**: Dies ist die Menge an übertragenen ETH (siehe Spalte `ether`).
- **Daten**: Dies sind beliebige Daten, die gehasht wurden (siehe Spalte `data`)
- **gasLimit** – die maximale Menge an Gas-Einheiten, die von der Transaktion verbraucht werden kann. Gas-Einheiten repräsentieren Rechenschritte
- **maxPriorityFeePerGas** - die maximale Menge an Gas, die als Prioritätsgebühr für den Miner enthalten sein soll
- **maxFeePerGas** - die maximale Menge an Gas, die man bereit ist, für die Transaktion zu zahlen (einschließlich baseFeePerGas und maxPriorityFeePerGas)

Wir können diese spezifischen Informationen für Transaktionen an die öffentliche Adresse der Ethereum Foundation abfragen:

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

### Blöcke {#blocks}

Jede Transaktion ändert den Zustand der Ethereum Virtual Machine ([EVM](/developers/docs/evm/)) ([Quelle](/developers/docs/transactions/)). Transaktionen werden an das Netzwerk übertragen, um verifiziert und in einen Block aufgenommen zu werden. Jede Transaktion ist mit einer Blocknummer verknüpft. Um die Daten zu sehen, könnten wir eine bestimmte Blocknummer abfragen: 12396854 (der zum Zeitpunkt dieses Schreibens, am 11.05.2021, aktuellste Block unter den Transaktionen der Ethereum Foundation).

Wenn wir außerdem die nächsten beiden Blöcke abfragen, können wir sehen, dass jeder Block den Hash des vorherigen Blocks (d. h. den Parent-Hash) enthält, was veranschaulicht, wie die Blockchain gebildet wird.

Jeder Block enthält einen Verweis auf seinen Parent-Block. Dies wird unten zwischen den Spalten `hash` und `parent_hash` gezeigt ([Quelle](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

Hier ist die [Abfrage](https://dune.com/queries/44856/88292) auf Dune Analytics:

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

Wir können einen Block untersuchen, indem wir Zeit, Blocknummer, Schwierigkeit, Hash, Parent-Hash und Nonce abfragen.

Das Einzige, was diese Abfrage nicht abdeckt, ist die _Liste der Transaktionen_, die eine separate Abfrage unten erfordert, und die _State Root_. Ein Full- oder Archival-Knoten speichert alle Transaktionen und Zustandsübergänge, sodass Clients den Zustand der Chain jederzeit abfragen können. Da dies viel Speicherplatz erfordert, können wir Chain-Daten von Zustandsdaten trennen:

- Chain-Daten (Liste von Blöcken, Transaktionen)
- Zustandsdaten (Ergebnis des Zustandsübergangs jeder Transaktion)

Die State Root fällt in Letzteres und ist eine _implizite_ Information (nicht Onchain gespeichert), während Chain-Daten explizit sind und auf der Chain selbst gespeichert werden ([Quelle](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

Für dieses Tutorial konzentrieren wir uns auf Onchain-Daten, die mit SQL über Dune Analytics abgefragt werden _können_.

Wie oben erwähnt, enthält jeder Block eine Liste von Transaktionen. Wir können diese abfragen, indem wir nach einem bestimmten Block filtern. Wir versuchen es mit dem aktuellsten Block, 12396854:

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

Hier ist die SQL-Ausgabe auf Dune:

![Screenshot of a list of Ethereum transactions](./list_of_txn.png)

Das Hinzufügen dieses einzelnen Blocks zur Chain ändert den Zustand der Ethereum Virtual Machine ([EVM](/developers/docs/evm/)). Dutzende, manchmal Hunderte von Transaktionen werden auf einmal verifiziert. In diesem speziellen Fall waren 222 Transaktionen enthalten.

Um zu sehen, wie viele tatsächlich erfolgreich waren, würden wir einen weiteren Filter hinzufügen, um erfolgreiche Transaktionen zu zählen:

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

Für Block 12396854 wurden von insgesamt 222 Transaktionen 204 erfolgreich verifiziert:

![Screenshot of a successful Ethereum transaction](./successful_txn.png)

Transaktionsanfragen erfolgen dutzende Male pro Sekunde, aber Blöcke werden etwa alle 15 Sekunden festgeschrieben ([Quelle](/developers/docs/blocks/)).

Um zu sehen, dass etwa alle 15 Sekunden ein Block produziert wird, könnten wir die Anzahl der Sekunden eines Tages (86400) durch 15 teilen, um eine geschätzte durchschnittliche Anzahl von Blöcken pro Tag zu erhalten (~ 5760).

Das Diagramm für die pro Tag produzierten Ethereum-Blöcke (2016 - heute) sieht so aus:

![Chart showing daily Ethereum block production](./daily_blocks.png)

Die durchschnittliche Anzahl der täglich produzierten Blöcke in diesem Zeitraum beträgt ~5.874:

![Chart showing daily Ethereum block production](./avg_daily_blocks.png)

Die Abfragen lauten:

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

Die durchschnittliche Anzahl der pro Tag produzierten Blöcke seit 2016 liegt mit 5.874 leicht über dieser Zahl. Alternativ ergibt die Division von 86400 Sekunden durch durchschnittlich 5874 Blöcke 14,7 Sekunden oder etwa einen Block alle 15 Sekunden.

### Gas {#gas}

Blöcke sind in ihrer Größe begrenzt. Die maximale Blockgröße ist dynamisch und variiert je nach Netzwerknachfrage zwischen 12.500.000 und 25.000.000 Einheiten. Limits sind erforderlich, um zu verhindern, dass beliebig große Blockgrößen Full-Knoten in Bezug auf Speicherplatz und Geschwindigkeitsanforderungen belasten ([Quelle](/developers/docs/blocks/)).

Eine Möglichkeit, das Block-Gaslimit zu konzeptualisieren, besteht darin, es sich als das **Angebot** an verfügbarem Blockplatz vorzustellen, in dem Transaktionen gebündelt werden können. Das Block-Gaslimit kann von 2016 bis heute abgefragt und visualisiert werden:

![Chart showing average Ethereum gas limit over time](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Dann gibt es das tatsächliche Gas, das täglich verwendet wird, um für Berechnungen auf der Ethereum-Chain zu bezahlen (d. h. Senden einer Transaktion, Aufrufen eines Smart Contracts, Prägen eines NFTs). Dies ist die **Nachfrage** nach verfügbarem Ethereum-Blockplatz:

![Chart showing daily Ethereum gas used](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Wir können diese beiden Diagramme auch gegenüberstellen, um zu sehen, wie **Angebot und Nachfrage** zueinander passen:

![gas_demand_supply](./gas_demand_supply.png)

Daher können wir Gaspreise als eine Funktion der Nachfrage nach Ethereum-Blockplatz bei gegebenem Angebot verstehen.

Schließlich möchten wir vielleicht die durchschnittlichen täglichen Gaspreise für die Ethereum-Chain abfragen. Dies würde jedoch zu einer besonders langen Abfragezeit führen, weshalb wir unsere Abfrage auf die durchschnittliche Gasmenge filtern, die pro Transaktion von der Ethereum Foundation bezahlt wird.

![Chart showing Ethereum Foundation daily gas usage](./ef_daily_gas.png)

Wir können die Gaspreise sehen, die im Laufe der Jahre für alle Transaktionen an die Adresse der Ethereum Foundation gezahlt wurden. Hier ist die Abfrage:

```sql
SELECT
    block_time,
    gas_price / 1e9 AS gas_price_gwei,
    value / 1e18 AS eth_sent
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### Zusammenfassung {#summary}

Mit diesem Tutorial verstehen wir grundlegende Ethereum-Konzepte und wie die Ethereum-Blockchain funktioniert, indem wir Onchain-Daten abfragen und ein Gefühl dafür bekommen.

Das Dashboard, das den gesamten in diesem Tutorial verwendeten Code enthält, finden Sie [hier](https://dune.com/paulapivat/Learn-Ethereum).

Für weitere Datennutzung zur Erkundung von Web3 [finden Sie mich auf Twitter](https://twitter.com/paulapivat).