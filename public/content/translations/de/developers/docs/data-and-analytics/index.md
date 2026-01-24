---
title: Daten und Analysen
description: Wie man On-Chain-Analysen und Daten für die Nutzung in deinen dApps erhält
lang: de
---

## Einführung {#Introduction}

Da die Nutzung des Netzwerks weiter wächst, wird sich eine zunehmende Menge wertvoller Informationen in den On-Chain-Daten befinden. Da das Datenvolumen rapide zunimmt, kann die Berechnung und Aggregation dieser Informationen zur Erstellung von Berichten oder zur Steuerung einer dApp ein Zeit- und arbeitsintensives Unterfangen werden.

Wenn Sie dabei auf vorhandene Datenanbieter setzen, können Sie die Entwicklung beschleunigen, genauere Ergebnisse liefern und den laufenden Wartungsaufwand reduzieren. Das bietet Ihnen die Möglichkeit, dass Sie ein Team nur mit den wesentlichen Funktionen betrauen, das Sie mit Ihrem Projekt bieten möchten.

## Voraussetzungen {#prerequisites}

Sie sollten das Grundkonzept von [Block-Explorern](/developers/docs/data-and-analytics/block-explorers/) verstehen, um deren Verwendung im Kontext der Datenanalyse besser zu verstehen. Machen Sie sich außerdem mit dem Konzept eines [Index](/glossary/#index) vertraut, um die Vorteile zu verstehen, die dieser für ein Systemdesign mit sich bringt.

Im Hinblick auf die Grundlagen der Architektur ist es wichtig, zumindest in der Theorie zu verstehen, was eine [API](https://www.wikipedia.org/wiki/API) und [REST](https://www.wikipedia.org/wiki/Representational_state_transfer) sind.

## Block-Explorer {#block-explorers}

Viele [Block-Explorer](/developers/docs/data-and-analytics/block-explorers/) bieten [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [API](https://www.wikipedia.org/wiki/API)-Gateways, die Entwicklern Einblicke in Echtzeitdaten zu Blöcken, Transaktionen, Validatoren, Konten und anderen On-Chain-Aktivitäten gewähren.

Entwickler können diese Daten dann verarbeiten und umwandeln, um ihren Benutzern einzigartige Einblicke und Interaktionen mit der [Blockchain](/glossary/#blockchain) zu ermöglichen. Zum Beispiel stellen [Etherscan](https://etherscan.io) und [Blockscout](https://eth.blockscout.com) Ausführungs- und Konsensdaten für jeden 12-Sekunden-Slot bereit.

## The Graph {#the-graph}

[The Graph](https://thegraph.com/) ist ein Indexierungsprotokoll, das eine einfache Möglichkeit bietet, Blockchain-Daten über offene APIs, sogenannte Subgraphen, abzufragen.

Mit The Graph können Entwickler folgende Vorteile nutzen:

- Dezentrale Indizierung: Ermöglicht die Indizierung von Blockchain-Daten durch mehrere
  indizierter, wodurch einzelne Fehlerquellen vermieden werden.
- Grafik-Abfragen: Bietet eine leistungsstarke Grafik-Schnittstelle für die Abfrage indizierter Daten, wodurch das Abrufen von Daten extrem einfach wird.
- Anpassung: Definieren Sie Ihre eigene Logik für die Transformation und Speicherung von Blockchain-Daten und verwenden Sie Subgraphen wieder, die von anderen Entwicklern im The Graph Network veröffentlicht wurden.

Folgen Sie dieser [Schnellstartanleitung](https://thegraph.com/docs/en/quick-start/), um innerhalb von 5 Minuten einen Subgraphen zu erstellen, bereitzustellen und abzufragen.

## Client-Diversität {#client-diversity}

[Client-Diversität](/developers/docs/nodes-and-clients/client-diversity/) ist wichtig für die allgemeine Gesundheit des Ethereum-Netzwerks, da sie Widerstandsfähigkeit gegen Bugs und Exploits bietet. Es gibt mittlerweile mehrere Dashboards zur Client-Diversität, darunter [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://www.rated.network), [supermajority.info](https://supermajority.info//) und [Ethernodes](https://ethernodes.org/).

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) verarbeitet Blockchain-Daten vor und wandelt sie in relationale Datenbanktabellen (DuneSQL) um, was es Benutzern ermöglicht, Blockchain-Daten mit SQL abzufragen und auf Abfrageergebnissen basierende Dashboards zu erstellen. On-Chain-Daten sind in 4 Rohdatentabellen organisiert: `blocks`, `transactions`, (Ereignis-) `logs` und (Aufruf-) `traces`. Beliebte Verträge und Protokolle liegen entschlüsselt vor und jedes hat seinen eigenen Satz von Event- und Call-Tabellen. Diese Event- und Call-Tabellen werden weiterverarbeitet und in Abstraktionstabellen nach der Art der Protokolle organisiert, z. B. Dex, Lending, Stablecoins usw.

## SQD {#sqd}

[SQD](https://sqd.dev/) ist eine dezentrale, hyperskalierbare Datenplattform, die für den effizienten, genehmigungsfreien Zugriff auf große Datenmengen optimiert ist. Derzeit werden historische In-Chai-Daten bereitgestellt, darunter Ereignisprotokolle, Transaktionsbelege, Traces und Statusunterschiede pro Transaktion. SQD bietet ein leistungsstarkes Toolkit zum Erstellen benutzerdefinierter Pipelines für die Datenextraktion und -verarbeitung, mit denen eine Indizierungsgeschwindigkeit von bis zu 150.000 Blöcken pro Sekunde erreicht werden kann.

Besuchen Sie für den Einstieg die [Dokumentation](https://docs.sqd.dev/) oder sehen Sie sich [EVM-Beispiele](https://github.com/subsquid-labs/squid-evm-examples) dafür an, was Sie mit SQD erstellen können.

## SubQuery-Netzwerk {#subquery-network}

[SubQuery](https://subquery.network/) ist ein führender Datenindexierer, der Entwicklern schnelle, zuverlässige, dezentrale und maßgeschneiderte APIs für ihre web3-Projekte bietet. SubQuery befähigt Entwickler aus über 165 Ökosystemen (einschließlich Ethereum) mit reichhaltigen indizierten Daten, um intuitive und immersive Erlebnisse für ihre Benutzer zu schaffen. Das SubQuery Network versorgt Ihre unaufhaltsamen Apps mit einem widerstandsfähigen und dezentralen Infrastrukturnetzwerk. Nutzen Sie das Blockchain-Entwickler-Toolkit von SubQuery, um die Web3-Anwendungen der Zukunft zu bauen, ohne dabei Zeit mit dem Aufbau eines benutzerdefinierten Backends für die Datenverarbeitung verbringen zu müssen.

Besuchen Sie zunächst die [Ethereum-Schnellstartanleitung](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html), um in wenigen Minuten mit der Indizierung von Ethereum-Blockchain-Daten in einer lokalen Docker-Umgebung zu Testzwecken zu beginnen, bevor Sie live auf den [Managed Service von SubQuery](https://managedservice.subquery.network/) oder in das [dezentrale Netzwerk von SubQuery](https://app.subquery.network/dashboard) wechseln.

## EVM-Abfragesprache {#evm-query-language}

Die EVM-Abfragesprache (EQL) ist eine SQL-ähnliche Sprache, die entwickelt wurde, um EVM-Blockchains (Ethereum Virtual Machine) abzufragen. Das ultimative Ziel von EQL ist es, komplexe relationale Abfragen für die ersten Klassen der EVM-Blockchain (Blöcke, Konten und Transaktionen) zu unterstützen, während Entwicklern und Forschern eine benutzerfreundliche Syntax für den täglichen Gebrauch zur Verfügung gestellt wird. Mit EQL können Entwickler Blockchain-Daten mit einer vertrauten, SQL-ähnlichen Syntax abrufen und so den Bedarf an komplexem Boilerplate-Code eliminieren. EQL unterstützt standardmäßige Blockchain-Datenanfragen (z. B. das Abrufen des Nonces und Kontostands eines Ethereum-Kontos oder das Abrufen der aktuellen Blockgröße und des Zeitstempels) und erweitert kontinuierlich die Unterstützung für komplexere Anfragen und Funktionen.

## Weiterführende Lektüre {#further-reading}

- [Exploring Crypto Data I: Data Flow Architectures](https://web.archive.org/web/20250125012042/https://research.2077.xyz/exploring-crypto-data-1-data-flow-architectures)
- [Überblick über das Graph-Netzwerk](https://thegraph.com/docs/en/about/)
- [Graph Query Playground](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [API-Codebeispiele auf EtherScan](https://etherscan.io/apis#contracts)
- [API-Dokumentation auf Blockscout](https://docs.blockscout.com/devs/apis)
- [Beaconcha.in Beacon-Chain-Explorer](https://beaconcha.in)
- [Dune-Grundlagen](https://docs.dune.com/#dune-basics)
- [SubQuery Ethereum-Schnellstartanleitung](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
- [Überblick über das SQD-Netzwerk](https://docs.sqd.dev/)
- [EVM-Abfragesprache](https://eql.sh/blog/alpha-release-notes)
