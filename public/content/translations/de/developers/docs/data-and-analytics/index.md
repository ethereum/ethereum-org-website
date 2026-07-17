---
title: Daten und Analysen
description: "Wie man Onchain-Analysen und -Daten für die Verwendung in eigenen Dapps erhält"
lang: de
---

## Einführung {#introduction}

Da die Nutzung des Netzwerks weiter wächst, wird eine zunehmende Menge an wertvollen Informationen in den Onchain-Daten vorhanden sein. Da das Datenvolumen schnell ansteigt, kann die Berechnung und Aggregation dieser Informationen für Berichte oder den Betrieb einer dezentralen Anwendung (Dapp) zu einem zeit- und rechenintensiven Unterfangen werden.

Die Nutzung bestehender Datenanbieter kann die Entwicklung beschleunigen, genauere Ergebnisse liefern und den laufenden Wartungsaufwand reduzieren. Dies ermöglicht es einem Team, sich auf die Kernfunktionalität zu konzentrieren, die ihr Projekt bereitstellen möchte.

## Voraussetzungen {#prerequisites}

Sie sollten das grundlegende Konzept von [Block-Explorern](/developers/docs/data-and-analytics/block-explorers/) verstehen, um deren Einsatz im Kontext der Datenanalyse besser nachvollziehen zu können. Machen Sie sich außerdem mit dem Konzept eines [Index](/glossary/#index) vertraut, um die Vorteile zu verstehen, die sie einem Systemdesign hinzufügen.

Was die architektonischen Grundlagen betrifft, sollten Sie zumindest theoretisch verstehen, was eine [API](https://www.wikipedia.org/wiki/API) und [REST](https://www.wikipedia.org/wiki/Representational_state_transfer) sind.

## Block-Explorer {#block-explorers}

Viele [Block-Explorer](/developers/docs/data-and-analytics/block-explorers/) bieten [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [API](https://www.wikipedia.org/wiki/API)-Gateways, die Entwicklern Einblick in Echtzeitdaten zu Blöcken, Transaktionen, Validatoren, Konten und anderen Onchain-Aktivitäten geben.

Entwickler können diese Daten dann verarbeiten und transformieren, um ihren Nutzern einzigartige Einblicke und Interaktionen mit der [Blockchain](/glossary/#blockchain) zu bieten. Zum Beispiel stellen [Etherscan](https://etherscan.io) und [Blockscout](https://eth.blockscout.com) Ausführungs- und Konsensdaten für jeden 12-Sekunden-Slot bereit.

## The Graph {#the-graph}

[The Graph](https://thegraph.com/) ist ein Indexierungsprotokoll, das eine einfache Möglichkeit bietet, Blockchain-Daten über offene APIs, sogenannte Subgraphen, abzufragen.

Mit The Graph können Entwickler von Folgendem profitieren:

- Dezentrale Indexierung: Ermöglicht die Indexierung von Blockchain-Daten durch mehrere Indexer und eliminiert so jeden Single Point of Failure.
- GraphQL-Abfragen: Bietet eine leistungsstarke GraphQL-Schnittstelle zur Abfrage indexierter Daten, was den Datenabruf extrem einfach macht.
- Anpassbarkeit: Definieren Sie Ihre eigene Logik zur Transformation und Speicherung von Blockchain-Daten und verwenden Sie Subgraphen wieder, die von anderen Entwicklern im The Graph-Netzwerk veröffentlicht wurden.

Folgen Sie dieser [Schnellstartanleitung](https://thegraph.com/docs/en/quick-start/), um innerhalb von 5 Minuten einen Subgraph zu erstellen, bereitzustellen und abzufragen.

## Client-Diversität {#client-diversity}

[Client-Diversität](/developers/docs/nodes-and-clients/client-diversity/) ist wichtig für die allgemeine Gesundheit des Ethereum-Netzwerks, da sie Widerstandsfähigkeit gegenüber Fehlern und Exploits bietet. Es gibt mittlerweile mehrere Dashboards zur Client-Diversität, darunter [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://www.rated.network), [supermajority.info](https://supermajority.info//) und [Ethernodes](https://ethernodes.org/).

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) verarbeitet Blockchain-Daten in Tabellen einer relationalen Datenbank (DuneSQL) vor, ermöglicht es Nutzern, Blockchain-Daten mit SQL abzufragen und Dashboards basierend auf den Abfrageergebnissen zu erstellen. Onchain-Daten sind in 4 Rohtabellen organisiert: `blocks`, `transactions`, (Ereignis) `logs` und (Aufruf) `traces`. Beliebte Verträge und Protokolle wurden decodiert und jedes hat seine eigenen Ereignis- und Aufruftabellen. Diese Ereignis- und Aufruftabellen werden weiterverarbeitet und nach Protokolltyp in Abstraktionstabellen organisiert, zum Beispiel Dex, Kreditvergabe, Stablecoins usw.

## SQD {#sqd}

[SQD](https://sqd.dev/) ist eine dezentrale, hyperskalierbare Datenplattform, die für die Bereitstellung eines effizienten, erlaubnisfreien Zugriffs auf große Datenmengen optimiert ist. Sie stellt derzeit historische Onchain-Daten bereit, einschließlich Ereignisprotokollen, Transaktionsbelegen, Traces und Zustandsdifferenzen pro Transaktion. SQD bietet ein leistungsstarkes Toolkit zur Erstellung benutzerdefinierter Datenextraktions- und Verarbeitungspipelines und erreicht eine Indexierungsgeschwindigkeit von bis zu 150.000 Blöcken pro Sekunde.

Um loszulegen, besuchen Sie die [Dokumentation](https://docs.sqd.dev/) oder sehen Sie sich [EVM-Beispiele](https://github.com/subsquid-labs/squid-evm-examples) an, was Sie mit SQD erstellen können.

## SubQuery-Netzwerk {#subquery-network}

[SubQuery](https://subquery.network/) ist ein führender Daten-Indexer, der Entwicklern schnelle, zuverlässige, dezentrale und maßgeschneiderte APIs für ihre Web3-Projekte bietet. SubQuery stattet Entwickler aus über 165 Ökosystemen (einschließlich Ethereum) mit umfangreichen indexierten Daten aus, um intuitive und immersive Erlebnisse für ihre Nutzer zu schaffen. Das SubQuery-Netzwerk treibt Ihre unaufhaltsamen Apps mit einem widerstandsfähigen und dezentralen Infrastrukturnetzwerk an. Nutzen Sie das Blockchain-Entwickler-Toolkit von SubQuery, um die Web3-Anwendungen der Zukunft zu entwickeln, ohne Zeit für den Aufbau eines benutzerdefinierten Backends für Datenverarbeitungsaktivitäten aufwenden zu müssen.

Um zu beginnen, besuchen Sie die [Ethereum-Schnellstartanleitung](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html), um innerhalb von Minuten mit der Indexierung von Ethereum-Blockchain-Daten in einer lokalen Docker-Umgebung zu Testzwecken zu beginnen, bevor Sie auf einem [verwalteten Dienst von SubQuery](https://managedservice.subquery.network/) oder im [dezentralen Netzwerk von SubQuery](https://app.subquery.network/dashboard) live gehen.

## Codex {#codex}

[Codex](https://www.codex.io/) ist eine Echtzeit-Blockchain-Daten-API, die angereicherte Daten für über 70 Millionen Token in mehr als 80 Netzwerken bereitstellt. Entwickler können auf strukturierte Token-Preise, Wallet-Guthaben, Transaktionshistorien und aggregierte Analysen (Volumen, Liquidität, einzigartige Wallets) zugreifen, ohne eine eigene Indexierungsinfrastruktur warten zu müssen. Codex unterstützt die Datenbereitstellung in Sekundenbruchteilen über WebSocket- und Webhook-Integrationen.

Um loszulegen, besuchen Sie die [Dokumentation](https://docs.codex.io), probieren Sie den [Explorer](https://docs.codex.io/explore) aus oder melden Sie sich im [Dashboard](https://dashboard.codex.io/signup) an.

## EVM Query Language {#evm-query-language}

Die EVM Query Language (EQL) ist eine SQL-ähnliche Sprache, die für die Abfrage von EVM-Chains (Ethereum Virtual Machine) entwickelt wurde. Das ultimative Ziel von EQL ist es, komplexe relationale Abfragen auf First-Class-Citizens der EVM-Chain (Blöcke, Konten und Transaktionen) zu unterstützen und Entwicklern sowie Forschern gleichzeitig eine ergonomische Syntax für den täglichen Gebrauch zu bieten. Mit EQL können Entwickler Blockchain-Daten mit einer vertrauten SQL-ähnlichen Syntax abrufen und den Bedarf an komplexem Boilerplate-Code eliminieren. EQL unterstützt standardmäßige Blockchain-Datenanfragen (z. B. das Abrufen der Nonce und des Guthabens eines Kontos auf Ethereum oder das Abrufen der aktuellen Blockgröße und des Zeitstempels) und fügt kontinuierlich Unterstützung für komplexere Anfragen und Funktionsumfänge hinzu.

## Weiterführende Literatur {#further-reading}

- [Erkundung von Krypto-Daten I: Datenflussarchitekturen](https://web.archive.org/web/20250125012042/https://research.2077.xyz/exploring-crypto-data-1-data-flow-architectures)
- [Übersicht über das Graph-Netzwerk](https://thegraph.com/docs/en/about/)
- [Graph Query Playground](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [API-Codebeispiele auf Etherscan](https://etherscan.io/apis#contracts)
- [API-Dokumentation auf Blockscout](https://docs.blockscout.com/devs/apis)
- [Beaconcha.in Beacon Chain-Explorer](https://beaconcha.in)
- [Dune-Grundlagen](https://docs.dune.com/#dune-basics)
- [SubQuery Ethereum-Schnellstartanleitung](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
- [Übersicht über das SQD-Netzwerk](https://docs.sqd.dev/)
- [EVM Query Language](https://web.archive.org/web/20250719151453/https://www.eql.sh/blog/alpha-release-notes)

## Tutorials: Daten & Analysen / SQL auf Ethereum {#tutorials}

- [Lernen Sie grundlegende Ethereum-Themen mit SQL](/developers/tutorials/learn-foundational-ethereum-topics-with-sql/) _– Fragen Sie Onchain-Ethereum-Daten mit SQL ab, um die Grundlagen von Transaktionen, Blöcken und Gas zu verstehen._
