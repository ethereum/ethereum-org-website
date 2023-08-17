---
title: Daten und Analysen
description: So bekommen Sie Analysen und Daten in der Chain für die Nutzung in Ihren dApps
lang: de
---

## Einführung {#Introduction}

Da die Nutzung des Netzwerks weiter zunimmt, steigt damit die Menge an wertvollen Informationen in den On-Chain-Daten. Da das Datenvolumen stark ansteigt, kann die Berechnung und Aggregation dieser Informationen für die Berichtersterstellung oder den Betrieb einer dApp zu einem zeit- und prozessintensiven Unterfangen werden.

Wenn Sie dabei auf vorhandene Datenanbieter setzen, können Sie die Entwicklung beschleunigen, genauere Ergebnisse liefern und den laufenden Wartungsaufwand reduzieren. Das bietet Ihnen die Möglichkeit, dass Sie ein Team nur mit den wesentlichen Funktionen betrauen, das Sie mit Ihrem Projekt bieten möchten.

## Voraussetzungen {#prerequisites}

Sie sollten das Grundkonzept des [Block -Explorers](/developers/docs/data-and-analytics/block-explorers/) kennen, um dessen Einsatz im Kontext der Datenanalyse besser zu verstehen. Zusätzlich sollten Sie sich mit dem Konzept eines [Index](/glossary/#index) vertraut machen, um besser verstehen zu können, welche Vorteile sie für ein Systemdesign bedeuten.

In puncto architektonische Grundlagen sollten Sie mit den Begriffen [API](https://www.wikipedia.org/wiki/API) und [REST](https://www.wikipedia.org/wiki/Representational_state_transfer) vertraut sein, auch in der Theorie.

## The Graph {#the-graph}

Das [Graph Network](https://thegraph.com/) ist ein dezentrales Indexierungsprotokoll zur Organisation von Blockchain-Daten. Anstatt für die Aggregation von On-Chain-Daten Datenspeicher, ob zentral oder außerhalb der Chain, zu erstellen und zu verwalten, können Entwickler mit The Graph serverlose Anwendungen erstellen, die vollständig auf einer öffentlichen Infrastruktur laufen.

Mit [GraphQL](https://graphql.org/) können Entwickler jede der verfügbaren offenen APIs abfragen, die als Sub-Graphen bekannt sind, um die für ihre dApp erforderlichen Informationen zu erhalten. Durch die Abfrage dieser indizierten Sub-Graphen profitieren Berichte und dApps nicht nur von Leistung und Skalierbarkeit, sondern auch von der integrierten Genauigkeit, die über Netzwerkkonsens bereitgestellt wird. Sobald dem Netzwerk neue Verbesserungen und/oder Sub-Graphen hinzugefügt werden, können Ihre Projekte schnell iterieren, um von diesen Verbesserungen zu profitieren.

## Block-Explorer {#block-explorers}

Viele [Block-Explorer](/developers/docs/data-and-analytics/block-explorers/) bieten [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer)-[API-](https://www.wikipedia.org/wiki/API)Gateways, die Entwicklern Einblick in Echtzeitdaten zu Blöcken, Transaktionen, Minern, Konten und anderen Aktivitäten in der Chain gewähren.

Entwickler können diese Daten dann verarbeiten und umwandeln, um ihren Nutzern einzigartige Einblicke und Interaktionen mit der [Blockchain](/glossary/#blockchain) zu ermöglichen.

## Weiterführende Informationen {#further-reading}

- [Graph Network-Übersicht](https://thegraph.com/docs/en/about/network/)
- [Graph-Abfrageplatz](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [API-Code-Beispiele auf EtherScan](https://etherscan.io/apis#contracts)
