---
title: Grundlegende Ethereum-Themen mit SQL lernen
description: "Dieses Tutorial hilft Lesern, grundlegende Ethereum-Konzepte wie Transaktionen, Blöcke und Gas zu verstehen, indem sie On-Chain-Daten mit der Structured Query Language (SQL) abfragen."
author: "Paul Apivat"
tags: ["SQL", "Querying", "Transactions"]
skill: beginner
lang: de
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

Viele Ethereum-Tutorials richten sich an Entwickler, aber es mangelt an Lernressourcen für Datenanalysten oder für Leute, die On-Chain-Daten einsehen möchten, ohne einen Client oder einen Knoten zu betreiben.

Dieses Tutorial hilft Lesern, grundlegende Ethereum-Konzepte wie Transaktionen, Blöcke und Gas zu verstehen, indem sie On-Chain-Daten mit der Structured Query Language (SQL) über eine von [Dune Analytics](https://dune.com/) bereitgestellte Schnittstelle abfragen.

On-Chain-Daten können uns helfen, Ethereum, das Netzwerk und seine Wirtschaftlichkeit in Bezug auf die Rechenleistung zu verstehen. Sie sollten als Grundlage für das Verständnis der Herausforderungen dienen, mit denen Ethereum heute konfrontiert ist (z. B. steigende Gaspreise) und, was noch wichtiger ist, für Diskussionen über Skalierungslösungen.

### Transaktionen {#transactions}

Die Reise eines Nutzers auf Ethereum beginnt mit der Initialisierung eines nutzergesteuerten Kontos oder einer Entität mit einem ETH-Guthaben. Es gibt zwei Kontotypen – benutzergesteuert oder ein Smart Contract (siehe [ethereum.org](/developers/docs/accounts/)).

Jedes Konto kann in einem Block-Explorer wie [Etherscan](https://etherscan.io/) oder [Blockscout](https://eth.blockscout.com/) eingesehen werden. Block-Explorer sind ein Portal zu den Daten von Ethereum. Sie zeigen in Echtzeit Daten zu Blöcken, Transaktionen, Minern, Konten und anderen On-Chain-Aktivitäten an (siehe [hier](/developers/docs/data-and-analytics/block-explorers/)).

Ein Benutzer möchte die Daten jedoch möglicherweise direkt abfragen, um die von externen Block-Explorern bereitgestellten Informationen abzugleichen. [Dune Analytics](https://dune.com/) bietet diese Möglichkeit jedem, der über SQL-Kenntnisse verfügt.

Als Referenz kann das Smart-Contract-Konto der Ethereum Foundation (EF) auf [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) eingesehen werden.

Es ist zu beachten, dass alle Konten, einschließlich desjenigen der EF, eine öffentliche Adresse haben, die zum Senden und Empfangen von Transaktionen verwendet werden kann.

Der Kontostand auf Etherscan umfasst reguläre Transaktionen und interne Transaktionen. Interne Transaktionen sind, trotz des Namens, keine _tatsächlichen_ Transaktionen, die den Zustand der Chain ändern. Es handelt sich um Wertübertragungen, die durch die Ausführung eines Vertrags initiiert werden ([Quelle](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Da interne Transaktionen keine Signatur haben, sind sie **nicht** in der Blockchain enthalten und können nicht mit Dune Analytics abgefragt werden.

Daher wird sich dieses Tutorial auf reguläre Transaktionen konzentrieren. Dies kann wie folgt abgefragt werden:

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

Dies liefert die gleichen Informationen wie auf der Transaktionsseite von Etherscan. Zum Vergleich, hier die beiden Quellen:

#### Etherscan {#etherscan}

![](./etherscan_view.png)

[Vertragsseite der EF auf Blockscout.](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![](./dune_view.png)

Das Dashboard finden Sie [hier](https://dune.com/paulapivat/Learn-Ethereum). Klicken Sie auf die Tabelle, um die Abfrage zu sehen (siehe auch oben).

### Transaktionen im Detail {#breaking_down_transactions}

Eine übermittelte Transaktion enthält mehrere Informationen, darunter ([Quelle](/developers/docs/transactions/)):

- **Empfänger**: Die Empfangsadresse (abgefragt als „to“)
- **Signatur**: Während die privaten Schlüssel eines Absenders eine Transaktion signieren, können wir mit SQL die öffentliche Adresse eines Absenders abfragen („from“).
- **Wert**: Dies ist der Betrag an transferiertem ETH (siehe Spalte `ether`).
- **Daten**: Das sind beliebige Daten, die gehasht wurden (siehe Spalte `data`)
- **gasLimit** – die maximale Menge an Gaseinheiten, die von der Transaktion verbraucht werden kann. Gaseinheiten stellen Rechenschritte dar.
- **maxPriorityFeePerGas** – die maximale Gasmenge, die als Trinkgeld für den Miner enthalten sein soll
- **maxFeePerGas** – die maximale Menge an Gas, die für die Transaktion gezahlt werden soll (einschließlich baseFeePerGas und maxPriorityFeePerGas)

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

Jede Transaktion ändert den Zustand der Ethereum Virtual Machine ([EVM](/developers/docs/evm/)) ([Quelle](/developers/docs/transactions/)). Transaktionen werden an das Netzwerk gesendet, um verifiziert und in einen Block aufgenommen zu werden. Jede Transaktion ist mit einer Blocknummer verknüpft. Um die Daten zu sehen, können wir eine bestimmte Blocknummer abfragen: 12396854 (der jüngste Block der Ethereum-Foundation-Transaktionen zum Zeitpunkt des Schreibens dieses Tutorials am 5.11.2021).

Wenn wir die nächsten beiden Blöcke abfragen, können wir außerdem sehen, dass jeder Block den Hash des vorherigen Blocks (d. h. den übergeordneten Hash) enthält, was zeigt, wie die Blockchain aufgebaut ist.

Jeder Block enthält einen Verweis auf seinen übergeordneten Block. Dies wird unten zwischen den Spalten `hash` und `parent_hash` gezeigt ([Quelle](/developers/docs/blocks/)):

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

Wir können einen Block untersuchen, indem wir Zeit, Blocknummer, Schwierigkeitsgrad, Hash, übergeordneten Hash und die Nonce abfragen.

Das Einzige, was diese Abfrage nicht abdeckt, ist die _Liste der Transaktionen_, die eine separate Abfrage unten erfordert, und der _State-Root_. Ein Full- oder Archiv-Node speichert alle Transaktionen und Zustandsübergänge, sodass Clients den Zustand der Chain jederzeit abfragen können. Da dies viel Speicherplatz erfordert, können wir Chain-Daten von Zustandsdaten trennen:

- Chain-Daten (Liste von Blöcken, Transaktionen)
- Zustandsdaten (Ergebnis des Zustandsübergangs jeder Transaktion)

Der State-Root fällt unter Letzteres und ist _implizite_ Daten (nicht on-chain gespeichert), während Chain-Daten explizit sind und auf der Chain selbst gespeichert werden ([Quelle](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

In diesem Tutorial konzentrieren wir uns auf On-Chain-Daten, die mit SQL über Dune Analytics abgefragt werden _können_.

Wie oben erwähnt, enthält jeder Block eine Liste von Transaktionen. Wir können diese abfragen, indem wir nach einem bestimmten Block filtern. Wir versuchen es mit dem letzten Block, 12396854:

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

Hier ist die SQL-Ausgabe auf Dune:

![](./list_of_txn.png)

Dieser einzelne Block, der der Chain hinzugefügt wird, ändert den Zustand der Ethereum Virtual Machine ([EVM](/developers/docs/evm/)). Dutzende, manchmal Hunderte von Transaktionen werden auf einmal verifiziert. In diesem speziellen Fall waren 222 Transaktionen enthalten.

Um zu sehen, wie viele tatsächlich erfolgreich waren, fügen wir einen weiteren Filter hinzu, um erfolgreiche Transaktionen zu zählen:

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

![](./successful_txn.png)

Transaktionsanfragen kommen Dutzende Male pro Sekunde vor, aber Blöcke werden etwa alle 15 Sekunden committet ([Quelle](/developers/docs/blocks/)).

Um zu sehen, dass ungefähr alle 15 Sekunden ein Block produziert wird, können wir die Anzahl der Sekunden pro Tag (86.400) durch 15 teilen, um eine geschätzte durchschnittliche Anzahl von Blöcken pro Tag (~ 5.760) zu erhalten.

Das Diagramm der täglich erzeugten Ethereum-Blöcke (2016 – heute) ist:

![](./daily_blocks.png)

Die durchschnittliche Anzahl der in diesem Zeitraum täglich produzierten Blöcke beträgt ~5.874:

![](./avg_daily_blocks.png)

Die Abfragen lauten:

```sql
# Abfrage zur Visualisierung der täglich produzierten Blöcke seit 2016

SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1

# durchschnittliche Anzahl der pro Tag produzierten Blöcke

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

Die durchschnittliche Anzahl der seit 2016 pro Tag produzierten Blöcke liegt mit 5.874 leicht über diesem Wert. Alternativ ergeben 86.400 Sekunden geteilt durch 5.874 durchschnittliche Blöcke 14,7 Sekunden oder ungefähr einen Block alle 15 Sekunden.

### Gas {#gas}

Blöcke sind in ihrer Größe begrenzt. Die maximale Blockgröße ist dynamisch und variiert je nach Netzwerknachfrage zwischen 12.500.000 und 25.000.000 Einheiten. Limits sind erforderlich, um zu verhindern, dass willkürlich große Blöcke die Full Nodes in Bezug auf Speicherplatz- und Geschwindigkeitsanforderungen belasten ([Quelle](/developers/docs/blocks/)).

Eine Möglichkeit, sich das Block-Gaslimit vorzustellen, ist, es als das **Angebot** an verfügbarem Blockspace zu betrachten, in dem Transaktionen gebündelt werden. Das Block-Gaslimit kann von 2016 bis heute abgefragt und visualisiert werden:

![](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Dann gibt es das tatsächlich täglich verwendete Gas, um für Berechnungen auf der Ethereum-Chain zu bezahlen (d. h. das Senden von Transaktionen, das Aufrufen eines Smart Contracts, das Prägen eines NFT). Dies ist die **Nachfrage** nach verfügbarem Ethereum-Blockspace:

![](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Wir können diese beiden Diagramme auch einander gegenüberstellen, um zu sehen, wie sich **Angebot und Nachfrage** beeinflussen:

![gas_demand_supply](./gas_demand_supply.png)

Daher können wir Gaspreise als eine Funktion der Nachfrage nach Ethereum-Blockspace bei gegebenem Angebot verstehen.

Schließlich möchten wir vielleicht die durchschnittlichen täglichen Gaspreise für die Ethereum-Chain abfragen. Dies würde jedoch zu einer besonders langen Abfragezeit führen, also filtern wir unsere Abfrage auf die durchschnittliche Gasmenge, die von der Ethereum Foundation pro Transaktion bezahlt wird.

![](./ef_daily_gas.png)

Wir können die Gaspreise sehen, die über die Jahre für alle an die Adresse der Ethereum Foundation getätigten Transaktionen gezahlt wurden. Hier ist die Abfrage:

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

Mit diesem Tutorial verstehen wir grundlegende Ethereum-Konzepte und wie die Ethereum-Blockchain funktioniert, indem wir On-Chain-Daten abfragen und ein Gefühl für sie bekommen.

Das Dashboard mit dem gesamten in diesem Tutorial verwendeten Code finden Sie [hier](https://dune.com/paulapivat/Learn-Ethereum).

Für weitere Datennutzung zur Erkundung von Web3 [finden Sie mich auf Twitter](https://twitter.com/paulapivat).
