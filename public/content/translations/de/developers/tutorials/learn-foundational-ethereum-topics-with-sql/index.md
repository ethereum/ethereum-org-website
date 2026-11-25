---
title: Grundlegende Ethereum-Themen mit SQL lernen
description: "Dieses Tutorial hilft Lesern, grundlegende Ethereum-Konzepte wie Transaktionen, Blöcke und Gas zu verstehen, indem Onchain-Daten mit der Structured Query Language (SQL) abgefragt werden."
author: "Paul Apivat"
tags:
  - SQL
  - Abfragen
  - Transaktionen
  - Daten und Analytik
skill: beginner
breadcrumb: Ethereum mit SQL
lang: de
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://web.archive.org/web/20260516182620/https://paulapivat.com/post/query_ethereum/
---

Viele Ethereum-Tutorials richten sich an Entwickler, aber es mangelt an Bildungsressourcen für Datenanalysten oder für Personen, die Onchain-Daten einsehen möchten, ohne einen Client oder Knoten auszuführen.

Dieses Tutorial hilft Lesern, grundlegende Ethereum-Konzepte wie Transaktionen, Blöcke und Gas zu verstehen, indem Onchain-Daten mit der Structured Query Language (SQL) über eine von [Dune](https://dune.com/) bereitgestellte Schnittstelle abgefragt werden. Die Abfragen verwenden [DuneSQL](https://docs.dune.com/query-engine/overview), den SQL-Dialekt von Dune.

Onchain-Daten können uns helfen, Ethereum, das Netzwerk und seine Rolle als Wirtschaftssystem für Rechenleistung zu verstehen. Sie sollten als Grundlage dienen, um die heutigen Herausforderungen von Ethereum (z. B. steigende Gaspreise) und, noch wichtiger, die Diskussionen über Skalierungslösungen zu verstehen.

### Transaktionen {#transactions}

Die Reise eines Benutzers auf Ethereum beginnt mit der Initialisierung eines benutzergesteuerten Kontos oder einer Entität mit einem ETH-Guthaben. Es gibt zwei Kontotypen – benutzergesteuert oder ein Smart Contract (siehe [ethereum.org](/developers/docs/accounts/)).

Jedes Konto kann in einem Block-Explorer wie [Etherscan](https://etherscan.io/) oder [Blockscout](https://eth.blockscout.com/) eingesehen werden. Block-Explorer sind ein Portal zu den Daten von Ethereum. Sie zeigen in Echtzeit Daten zu Blöcken, Transaktionen, Validatoren, Konten und anderen Onchain-Aktivitäten an (siehe [hier](/developers/docs/data-and-analytics/block-explorers/)).

Ein Benutzer möchte die Daten jedoch möglicherweise direkt abfragen, um die von externen Block-Explorern bereitgestellten Informationen abzugleichen. [Dune](https://dune.com/) bietet diese Möglichkeit für jeden mit etwas SQL-Wissen.

Als Referenz kann das Smart Contract-Konto der Ethereum Foundation (EF) auf [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) eingesehen werden.

Es ist zu beachten, dass alle Konten, einschließlich des der EF, eine öffentliche Adresse haben, die zum Senden und Empfangen von Transaktionen verwendet werden kann.

Der Kontostand auf Etherscan setzt sich aus regulären Transaktionen und internen Transaktionen zusammen. Interne Transaktionen sind trotz des Namens keine _tatsächlichen_ Transaktionen, die den Zustand der Chain ändern. Es handelt sich um Werttransfers, die durch die Ausführung eines Vertrags initiiert werden ([Quelle](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Da interne Transaktionen keine Signatur haben, werden sie **nicht** als Transaktionen in die Blockchain aufgenommen. Dune erfasst sie separat in der Tabelle `ethereum.traces`.

Daher konzentriert sich dieses Tutorial auf reguläre Transaktionen. Diese können wie folgt abgefragt werden:

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

Beachten Sie, dass Adressen als `0x...`-Literale ohne Anführungszeichen geschrieben werden. In DuneSQL sind Adressen und Hashes Binärwerte, keine Strings.

Dies liefert dieselben Informationen, die auf der Transaktionsseite von Etherscan bereitgestellt werden. Zum Vergleich sind hier die beiden Quellen:

#### Etherscan {#etherscan}

![Screenshot of Etherscan transaction explorer view](./etherscan_view.png)

[Die Vertragsseite der EF auf Blockscout.](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune {#dune-analytics}

![Screenshot of a Dune query dashboard](./dune_view.png)

Sie finden das Dashboard [hier](https://dune.com/paulapivat/Learn-Ethereum). Klicken Sie auf die Tabelle, um die Abfrage zu sehen (siehe auch oben).

### Transaktionen aufschlüsseln {#breaking-down-transactions}

Eine eingereichte Transaktion enthält mehrere Informationen, darunter ([Quelle](/developers/docs/transactions/)):

- **Empfänger**: Die empfangende Adresse (abgefragt als „to“)
- **Signatur**: Während der private Schlüssel eines Senders eine Transaktion signiert, können wir mit SQL die öffentliche Adresse des Senders („from“) abfragen.
- **Wert**: Dies ist die Menge an übertragenen ETH (siehe Spalte `ether`).
- **Daten**: Dies sind beliebige Daten, die gehasht wurden (siehe Spalte `data`)
- **gasLimit** – die maximale Menge an Gaseinheiten, die von der Transaktion verbraucht werden kann. Gaseinheiten repräsentieren Rechenschritte
- **maxPriorityFeePerGas** – die maximale Menge an Gas, die als Prioritätsgebühr für den Validator enthalten sein soll
- **maxFeePerGas** – die maximale Menge an Gas, die man bereit ist, für die Transaktion zu zahlen (einschließlich baseFeePerGas und maxPriorityFeePerGas)

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
    ROUND(CAST(gas_used AS DOUBLE) / gas_limit * 100, 2) AS gas_used_pct
FROM ethereum.transactions
WHERE "to" = 0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe
ORDER BY block_time DESC
```

Das `CAST` ist notwendig, da die Division einer Ganzzahl durch eine andere in DuneSQL ein ganzzahliges Ergebnis liefert, was fast jeden Prozentsatz auf null abrunden würde.

### Blöcke {#blocks}

Jede Transaktion ändert den Zustand der Virtuellen Ethereum-Maschine ([EVM](/developers/docs/evm/)) ([Quelle](/developers/docs/transactions/)). Transaktionen werden an das Netzwerk gesendet, um verifiziert und in einen Block aufgenommen zu werden. Jede Transaktion ist mit einer Blocknummer verknüpft. Um die Daten zu sehen, könnten wir eine bestimmte Blocknummer abfragen: 12396854 (der aktuellste Block unter den Transaktionen der Ethereum Foundation zum Zeitpunkt des Schreibens im Mai 2021).

Wenn wir außerdem die nächsten beiden Blöcke abfragen, können wir sehen, dass jeder Block den Hash des vorherigen Blocks (d. h. den Parent-Hash) enthält, was veranschaulicht, wie die Blockchain gebildet wird.

Jeder Block enthält einen Verweis auf seinen Parent-Block. Dies wird unten zwischen den Spalten `hash` und `parent_hash` gezeigt ([Quelle](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

Hier ist die Abfrage:

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

Wir können einen Block untersuchen, indem wir Zeit, Blocknummer, Hash, Parent-Hash und Nonce abfragen. Block 12396854 wurde vor [dem Merge](/roadmap/merge/) produziert, als Blöcke mit Proof-of-Work (PoW) gemint wurden und die Nonce von Bedeutung war. In Proof-of-Stake (PoS)-Blöcken ist die Nonce immer null.

Das Einzige, was diese Abfrage nicht abdeckt, ist die _Transaktionsliste_, die unten eine separate Abfrage erfordert, und die _State Root_. Ein Full- oder Archival-Knoten speichert alle Transaktionen und Zustandsübergänge, sodass Clients den Zustand der Chain jederzeit abfragen können. Da dies viel Speicherplatz erfordert, können wir Chain-Daten von Zustandsdaten trennen:

- Chain-Daten (Liste von Blöcken, Transaktionen)
- Zustandsdaten (Ergebnis des Zustandsübergangs jeder Transaktion)

Die State Root fällt in Letzteres und besteht aus _impliziten_ Daten (nicht Onchain gespeichert), während Chain-Daten explizit sind und auf der Chain selbst gespeichert werden ([Quelle](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

Für dieses Tutorial konzentrieren wir uns auf Onchain-Daten, die mit SQL über Dune abgefragt werden _können_.

Wie oben erwähnt, enthält jeder Block eine Liste von Transaktionen. Wir können diese abfragen, indem wir nach einem bestimmten Block filtern. Wir versuchen es mit Block 12396854:

```sql
SELECT * FROM ethereum.transactions
WHERE block_number = 12396854
```

Hier ist die SQL-Ausgabe auf Dune:

![Screenshot of a list of Ethereum transactions](./list_of_txn.png)

Das Hinzufügen dieses einzelnen Blocks zur Chain ändert den Zustand der Virtuellen Ethereum-Maschine ([EVM](/developers/docs/evm/)). Dutzende, manchmal Hunderte von Transaktionen werden auf einmal verifiziert. In diesem speziellen Fall waren 222 Transaktionen enthalten.

Um zu sehen, wie viele tatsächlich erfolgreich waren, würden wir einen weiteren Filter hinzufügen, um erfolgreiche Transaktionen zu zählen:

```sql
SELECT
    COUNT(*) AS num_successful_txn
FROM ethereum.transactions
WHERE block_number = 12396854 AND success = true
```

Für Block 12396854 wurden von insgesamt 222 Transaktionen 204 erfolgreich verifiziert:

![Screenshot of a successful Ethereum transaction](./successful_txn.png)

Transaktionsanfragen treten dutzende Male pro Sekunde auf, aber Blöcke werden nur periodisch hinzugefügt ([Quelle](/developers/docs/blocks/)). Unter Proof-of-Work wurde im Durchschnitt alle 13 bis 15 Sekunden ein Block gemint, mit großer Variation. Seit [dem Merge](/roadmap/merge/) im September 2022 unterteilt Proof-of-Stake die Zeit in 12-Sekunden-Slots, und jeder Slot kann höchstens einen Block haben.

Heute kann es also höchstens 86400 / 12 = 7200 Blöcke pro Tag geben. In der Praxis sind es etwas weniger, da ein Validator gelegentlich seinen Slot verpasst.

Das Diagramm für die pro Tag produzierten Ethereum-Blöcke (2016 - 2021) lautet:

![Chart showing daily Ethereum block production](./daily_blocks.png)

Die durchschnittliche Anzahl der täglich produzierten Blöcke in diesem Zeitraum beträgt ~5.874:

![Chart showing daily Ethereum block production](./avg_daily_blocks.png)

Die Abfragen lauten:

Hier ist die Abfrage zur Visualisierung der Anzahl der täglich produzierten Blöcke. Die Klausel `WHERE` schließt den aktuellen Tag aus, der noch nicht beendet ist.

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum.blocks
WHERE time < DATE_TRUNC('day', NOW())
GROUP BY 1
ORDER BY 1
```

Und diese Abfrage berechnet die durchschnittliche Anzahl der pro Tag produzierten Blöcke vor und nach dem Merge. Block 15537394 ist der erste Proof-of-Stake-Block.

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

Als dieses Tutorial im Mai 2021 erstmals geschrieben wurde, lag der Durchschnitt bei 5.874 Blöcken pro Tag oder einem Block alle 14,7 Sekunden. Nach dem Merge liegt der Durchschnitt knapp unter dem Maximum von 7200, also etwa ein Block alle 12 Sekunden.

### Gas {#gas}

Blöcke sind in ihrer Größe begrenzt. Jeder Block hat ein Gaslimit, und seit [EIP-1559](/developers/docs/gas/#base-fee) hat jeder Block auch ein Gasziel, das der Hälfte des Limits entspricht. Wenn Blöcke mehr Gas als das Ziel verbrauchen, steigt die Grundgebühr, und wenn sie weniger verbrauchen, sinkt sie. Das Gaslimit selbst wird von Validatoren angepasst und wurde im Laufe der Jahre mehrmals angehoben. Limits sind erforderlich, um zu verhindern, dass beliebig große Blockgrößen Full-Knoten in Bezug auf Speicherplatz und Geschwindigkeitsanforderungen belasten ([Quelle](/developers/docs/blocks/)).

Eine Möglichkeit, das Block-Gaslimit zu konzeptualisieren, besteht darin, es als das **Angebot** an verfügbarem Blockplatz zu betrachten, in dem Transaktionen gebündelt werden können. Das Block-Gaslimit kann von 2016 bis heute abgefragt und visualisiert werden:

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

Dann gibt es das tatsächliche Gas, das täglich verwendet wird, um für Berechnungen auf der Ethereum-Chain zu bezahlen (z. B. das Senden einer Transaktion, das Aufrufen eines Smart Contracts, das Prägen eines Nicht-fungiblen Tokens (NFT)). Dies ist die **Nachfrage** nach verfügbarem Ethereum-Blockplatz:

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
FROM ethereum.transactions
WHERE "to" = 0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe
ORDER BY block_time DESC
```

### Zusammenfassung {#summary}

Mit diesem Tutorial verstehen wir grundlegende Ethereum-Konzepte und wie die Ethereum-Blockchain funktioniert, indem wir Onchain-Daten abfragen und ein Gefühl dafür bekommen.

Das Dashboard, das den gesamten in diesem Tutorial verwendeten Code enthält, finden Sie [hier](https://dune.com/paulapivat/Learn-Ethereum).

Für weitere Datennutzung zur Erkundung von Web3 [finden Sie mich auf Twitter](https://twitter.com/paulapivat).
