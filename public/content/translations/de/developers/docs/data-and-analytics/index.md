---
title: Daten und Analysen
description: So bekommen Sie Analysen und Daten in der Chain für die Nutzung in Ihren dApps
lang: de
---

## Einführung {#Introduction}

Da die Nutzung des Netzwerks weiter zunimmt, steigt damit die Menge an wertvollen Informationen in den On-Chain-Daten. Da das Datenvolumen rapide zunimmt, kann die Berechnung und Aggregation dieser Informationen zur Erstellung von Berichten oder zur Steuerung einer dApp ein Zeit- und arbeitsintensives Unterfangen werden.

Wenn Sie dabei auf vorhandene Datenanbieter setzen, können Sie die Entwicklung beschleunigen, genauere Ergebnisse liefern und den laufenden Wartungsaufwand reduzieren. Das bietet Ihnen die Möglichkeit, dass Sie ein Team nur mit den wesentlichen Funktionen betrauen, das Sie mit Ihrem Projekt bieten möchten.

## Voraussetzungen {#prerequisites}

Sie sollten das Grundkonzept des [Block -Explorers](/developers/docs/data-and-analytics/block-explorers/) kennen, um dessen Einsatz im Kontext der Datenanalyse besser zu verstehen. Zusätzlich sollten Sie sich mit dem Konzept eines [Index](/glossary/#index) vertraut machen, um besser verstehen zu können, welche Vorteile sie für ein Systemdesign bedeuten.

In puncto architektonische Grundlagen sollten Sie mit den Begriffen [API](https://www.wikipedia.org/wiki/API) und [REST](https://www.wikipedia.org/wiki/Representational_state_transfer) vertraut sein, auch in der Theorie.

## Block Explorer {#block-explorers}

Viele [Block-Explorer](/developers/docs/data-and-analytics/block-explorers/) bieten [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer)-[API-](https://www.wikipedia.org/wiki/API)Gateways, die Entwicklern Einblick in Echtzeitdaten zu Blöcken, Transaktionen, Minern, Konten und anderen Aktivitäten in der Chain gewähren.

Entwickler können diese Daten dann verarbeiten und umwandeln, um ihren Nutzern einzigartige Einblicke und Interaktionen mit der [Blockchain](/glossary/#blockchain) zu ermöglichen. So liefert [Etherscan](https://etherscan.io) beispielsweise Ausführungs- und Konsensdaten für jeden 12s-Slot.

## The Graph {#the-graph}

Das [Graph Network](https://thegraph.com/) ist ein dezentrales Indexierungsprotokoll zur Organisation von Blockchain-Daten. Anstatt für die Aggregation von On-Chain-Daten Datenspeicher, ob zentral oder außerhalb der Chain, zu erstellen und zu verwalten, können Entwickler mit The Graph serverlose Anwendungen erstellen, die vollständig auf einer öffentlichen Infrastruktur laufen.

Mit [GraphQL](https://graphql.org/) können Entwickler jede der kuratierten offenen APIs, die sogenannten Sub-Graphen, abfragen, um die notwendigen Informationen zu erhalten, die sie für ihre dApp benötigen. Durch die Abfrage dieser indizierten Sub-Graphen erhalten Berichte und Anwendungen nicht nur Leistungs- und Skalierbarkeitsvorteile, sondern auch die integrierte Genauigkeit, die durch den Netzwerkkonsens bereitgestellt wird. Sobald dem Netzwerk neue Verbesserungen und/oder Sub-Graphen hinzugefügt werden, können Ihre Projekte schnell iterieren, um von diesen Verbesserungen zu profitieren.

## Client-Diversität

Die [Client-Vielfalt](/developers/docs/nodes-and-clients/client-diversity/) ist wichtig für die allgemeine Sicherheit des Ethereum-Netzwerks, da sie die Widerstandsfähigkeit gegen Fehler und Schwachstellen gewährleistet. Es gibt inzwischen mehrere Dashboards zur Client-Vielfalt, darunter [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://rated.network), [execution-diversity.info](https://execution-diversity.info/) und [Ethernodes](https://ethernodes.org/).

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) verarbeitet Blockchain-Daten in relationalen Datenbanktabellen (PostgreSQL und DatabricksSQL) vor, ermöglicht Benutzern die Abfrage von Blockchain-Daten mit SQL und die Erstellung von Dashboards auf der Grundlage der Abfrageergebnisse. Die On-Chain-Daten sind in 4 Rohtabellen organisiert: `Blöcke`, `Transaktionen`, (Event) `Logs` und (Call) `Traces`. Beliebte Verträge und Protokolle liegen entschlüsselt vor und jedes hat seinen eigenen Satz von Event- und Call-Tabellen. Diese Event- und Call-Tabellen werden weiterverarbeitet und in Abstraktionstabellen nach der Art der Protokolle organisiert, z. B. Dex, Lending, Stablecoins usw.

## Weiterführende Informationen {#further-reading}

- [Graph Network-Übersicht](https://thegraph.com/docs/en/about/network/)
- [Graph-Abfrageplatz](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [API-Code-Beispiele auf EtherScan](https://etherscan.io/apis#contracts)
- [Beaconcha.in Beacon Chain Explorer](https://beaconcha.in)
- [Dune Basics](https://docs.dune.com/#dune-basics)
