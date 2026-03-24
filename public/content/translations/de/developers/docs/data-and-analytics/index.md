---
title: Daten und Analysen
description: "Wie man Analysen und Daten auf der Blockchain für die Verwendung in Dapps erhält"
lang: de
---

## Einführung {#Introduction}

Da die Nutzung des Netzwerks weiter wächst, wird eine zunehmende Menge an wertvollen Informationen in den Daten auf der Blockchain vorhanden sein. Da das Datenvolumen schnell zunimmt, kann die Berechnung und Aggregation dieser Informationen, um darüber zu berichten oder eine Dapp zu betreiben, zu einem zeit- und prozessintensiven Unterfangen werden.

Die Nutzung bestehender Datenanbieter kann die Entwicklung beschleunigen, genauere Ergebnisse liefern und den laufenden Wartungsaufwand reduzieren. Dies ermöglicht es einem Team, sich auf die Kernfunktionalität zu konzentrieren, die ihr Projekt bereitstellen möchte.

## Voraussetzungen {#prerequisites}

Sie sollten das grundlegende Konzept von [Blocksuchmaschinen](/developers/docs/data-and-analytics/block-explorers/) verstehen, um deren Verwendung im Kontext der Datenanalyse besser nachvollziehen zu können. Machen Sie sich außerdem mit dem Konzept eines [Index](/glossary/#index) vertraut, um die Vorteile zu verstehen, die sie einem Systemdesign hinzufügen.

In Bezug auf architektonische Grundlagen sollten Sie verstehen, was eine [API](https://www.wikipedia.org/wiki/API) und [REST](https://www.wikipedia.org/wiki/Representational_state_transfer) sind, zumindest in der Theorie.

## Blocksuchmaschinen {#block-explorers}

Viele [Blocksuchmaschinen](/developers/docs/data-and-analytics/block-explorers/) bieten [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [API](https://www.wikipedia.org/wiki/API)-Gateways, die Entwicklern Einblick in Echtzeitdaten zu Blöcken, Transaktionen, Validatoren, Konten und anderen Aktivitäten auf der Blockchain geben.

Entwickler können diese Daten dann verarbeiten und transformieren, um ihren Benutzern einzigartige Einblicke und Interaktionen mit der [Blockchain](/glossary/#blockchain) zu bieten. Zum Beispiel stellen [Etherscan](https://etherscan.io) und [Blockscout](https://eth.blockscout.com) Ausführungs- und Konsensdaten für jeden 12-Sekunden-Slot bereit.

## The Graph {#the-graph}

[The Graph](https://thegraph.com/) ist ein Indexierungsprotokoll, das eine einfache Möglichkeit bietet, Blockchain-Daten über offene APIs, sogenannte Subgraphen, abzufragen.

Mit The Graph können Entwickler von Folgendem profitieren:

- Dezentralisierte Indexierung: Ermöglicht die Indexierung von Blockchain-Daten durch mehrere Indexer und eliminiert so jeden Single Point of Failure.
- GraphQL-Abfragen: Bietet eine leistungsstarke GraphQL-Schnittstelle zur Abfrage indexierter Daten, was den Datenabruf extrem einfach macht.
- Anpassbarkeit: Definieren Sie Ihre eigene Logik zur Transformation und Speicherung von Blockchain-Daten und verwenden Sie Subgraphen wieder, die von anderen Entwicklern im The Graph Network veröffentlicht wurden.

Folgen Sie dieser [Schnellstartanleitung](https://thegraph.com/docs/en/quick-start/), um innerhalb von 5 Minuten einen Subgraphen zu erstellen, bereitzustellen und abzufragen.

## Client-Vielfalt {#client-diversity}

[Client-Vielfalt](/developers/docs/nodes-and-clients/client-diversity/) ist wichtig für die allgemeine Gesundheit des Ethereum-Netzwerks, da sie Widerstandsfähigkeit gegen Fehler und Exploits bietet. Es gibt mittlerweile mehrere Dashboards zur Client-Vielfalt, darunter [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://www.rated.network), [supermajority.info](https://supermajority.info//) und [Ethernodes](https://ethernodes.org/).

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) verarbeitet Blockchain-Daten in relationale Datenbanktabellen (DuneSQL) vor, ermöglicht es Benutzern, Blockchain-Daten mit SQL abzufragen und Dashboards basierend auf den Abfrageergebnissen zu erstellen. Daten auf der Blockchain sind in 4 Rohtabellen organisiert: `blocks`, `transactions`, (Ereignis-) `logs` und (Aufruf-) `traces`. Beliebte Verträge und Protokolle wurden decodiert und haben jeweils ihre eigenen Ereignis- und Aufruftabellen. Diese Ereignis- und Aufruftabellen werden weiterverarbeitet und nach Art der Protokolle in Abstraktionstabellen organisiert, zum Beispiel Dex, Kreditvergabe (Lending), Stablecoins usw.

## SQD {#sqd}

[SQD](https://sqd.dev/) ist eine dezentralisierte, hyperskalierbare Datenplattform, die für die Bereitstellung eines effizienten, erlaubnisfreien Zugriffs auf große Datenmengen optimiert ist. Sie stellt derzeit historische Daten auf der Blockchain bereit, einschließlich Ereignisprotokollen, Transaktionsbelegen, Traces und Statusdifferenzen pro Transaktion. SQD bietet ein leistungsstarkes Toolkit zur Erstellung benutzerdefinierter Datenextraktions- und Verarbeitungspipelines und erreicht eine Indexierungsgeschwindigkeit von bis zu 150.000 Blöcken pro Sekunde.

Um loszulegen, besuchen Sie die [Dokumentation](https://docs.sqd.dev/) oder sehen Sie sich [EVM-Beispiele](https://github.com/subsquid-labs/squid-evm-examples) an, was Sie mit SQD erstellen können.

## SubQuery Network {#subquery-network}

[SubQuery](https://subquery.network/) ist ein führender Daten-Indexer, der Entwicklern schnelle, zuverlässige, dezentralisierte und maßgeschneiderierte APIs für ihre Web3-Projekte bietet. SubQuery stattet Entwickler aus über 165 Ökosystemen (einschließlich Ethereum) mit umfangreichen indexierten Daten aus, um intuitive und immersive Erlebnisse für ihre Benutzer zu schaffen. Das SubQuery Network treibt Ihre unaufhaltsamen Apps mit einem widerstandsfähigen und dezentralisierten Infrastruktur-Netzwerk an. Verwenden Sie das Blockchain-Entwickler-Toolkit von SubQuery, um die Web3-Anwendungen der Zukunft zu erstellen, ohne Zeit für den Aufbau eines benutzerdefinierten Backends für Datenverarbeitungsaktivitäten aufwenden zu müssen.

Um zu beginnen, besuchen Sie die [Ethereum-Schnellstartanleitung](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html), um innerhalb von Minuten mit der Indexierung von Ethereum-Blockchain-Daten in einer lokalen Docker-Umgebung zu Testzwecken zu beginnen, bevor Sie auf einem [verwalteten Dienst von SubQuery](https://managedservice.subquery.network/) oder im [dezentralisierten Netzwerk von SubQuery](https://app.subquery.network/dashboard) live gehen.

## Codex {#codex}

[Codex](https://www.codex.io/) ist eine Echtzeit-Blockchain-Daten-API, die angereicherte Daten für über 70 Millionen Token in mehr als 80 Netzwerken bereitstellt. Entwickler können auf strukturierte Token-Preise, Wallet-Guthaben, Transaktionshistorien und aggregierte Analysen (Volumen, Liquidität, einzigartige Wallets) zugreifen, ohne eine eigene Indexierungsinfrastruktur warten zu müssen. Codex unterstützt die Datenbereitstellung in Sekundenbruchteilen über WebSocket- und Webhook-Integrationen.

Um loszulegen, besuchen Sie die [Dokumentation](https://docs.codex.io), probieren Sie den [Explorer](https://docs.codex.io/explore) aus oder melden Sie sich im [Dashboard](https://dashboard.codex.io/signup) an.

## EVM Query Language {#evm-query-language}

EVM Query Language (EQL) ist eine SQL-ähnliche Sprache, die entwickelt wurde, um EVM-Ketten (Ethereum Virtual Machine) abzufragen. Das ultimative Ziel von EQL ist es, komplexe relationale Abfragen auf erstklassigen Bürgern der EVM-Kette (Blöcke, Konten und Transaktionen) zu unterstützen und gleichzeitig Entwicklern und Forschern eine ergonomische Syntax für den täglichen Gebrauch zu bieten. Mit EQL können Entwickler Blockchain-Daten mit einer vertrauten SQL-ähnlichen Syntax abrufen und die Notwendigkeit von komplexem Boilerplate-Code eliminieren. EQL unterstützt standardmäßige Blockchain-Datenanfragen (z. B. das Abrufen der Nonce und des Guthabens eines Kontos auf Ethereum oder das Abrufen der aktuellen Blockgröße und des Zeitstempels) und fügt kontinuierlich Unterstützung für komplexere Anfragen und Funktionsumfänge hinzu.

## Weiterführende Literatur {#further-reading}

- [Exploring Crypto Data I: Data Flow Architectures](https://web.archive.org/web/20250125012042/https://research.2077.xyz/exploring-crypto-data-1-data-flow-architectures)
- [Graph Network Übersicht](https://thegraph.com/docs/en/about/)
- [Graph Query Playground](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [API-Codebeispiele auf EtherScan](https://etherscan.io/apis#contracts)
- [API-Dokumentation auf Blockscout](https://docs.blockscout.com/devs/apis)
- [Beaconcha.in Beacon Chain-Suchmaschine](https://beaconcha.in)
- [Dune-Grundlagen](https://docs.dune.com/#dune-basics)
- [SubQuery Ethereum-Schnellstartanleitung](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
- [SQD Network Übersicht](https://docs.sqd.dev/)
- [EVM Query Language](https://eql.sh/blog/alpha-release-notes)

## Tutorials: Daten & Analysen / SQL auf Ethereum {#tutorials}

- [Lernen Sie grundlegende Ethereum-Themen mit SQL](/developers/tutorials/learn-foundational-ethereum-topics-with-sql/) _– Fragen Sie Ethereum-Daten auf der Blockchain mit SQL ab, um Transaktionen, Blöcke und Gas-Grundlagen zu verstehen._