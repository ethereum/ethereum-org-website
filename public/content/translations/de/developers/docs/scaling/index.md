---
title: Skalierung
description: Eine Einführung in die verschiedenen Skalierungsoptionen, die derzeit von der Ethereum Community entwickelt werden.
lang: de
sidebarDepth: 3
---

## Skalierungsübersicht {#scaling-overview}

Da die Zahl der Nutzer von Ethereum gestiegen ist, hat die Blockchain gewisse Kapazitätsgrenzen erreicht. Dies hat die Kosten für die Nutzung des Netzes in die Höhe getrieben und den Bedarf an „Skalierungslösungen" geschaffen. Es gibt mehrere Lösungen, die erforscht, getestet und umgesetzt werden, die unterschiedliche Ansätze verfolgen, um ähnliche Ziele zu erreichen.

Das Hauptziel der Skalierbarkeit ist die Erhöhung der Transaktionsgeschwindigkeit (schnellere Endgültigkeit) und des Transaktionsdurchsatzes (viele Transaktionen pro Sekunde), ohne dabei die Dezentralisierung oder die Sicherheit zu opfern (mehr zur [Ethereum Vision](/roadmap/vision/)). Hohe Nachfrage auf der Layer-1 Ethereum Blockchain, führt zu langsameren Transaktionen und untragbaren [Gas Preisen](/developers/docs/gas/). Die Erhöhung der Netzwerkkapazität in Bezug auf Geschwindigkeit und Durchsatz ist von grundlegender Bedeutung für eine sinnvolle und massenhafte Einführung von Ethereum.

Geschwindigkeit und Durchsatz sind zwar von Bedeutung, aber es ist entscheidend, dass Skalierungslösungen, die diese Ziele ermöglichen, dezentralisiert und sicher bleiben. Eine niedrige Einstiegshürde für die Betreiber von Knotenpunkten ist von entscheidender Bedeutung, um eine Entwicklung hin zu zentralisierter und unsicherer Rechenleistung zu verhindern.

Konzeptionell unterteilen wir die Skalierung zunächst in On-Chain-Skalierung und Off-Chain-Skalierung.

## Voraussetzungen {#prerequisites}

Sie sollten über ein gutes Verständnis aller grundlegenden Themen verfügen. Die Umsetzung von Skalierungslösungen ist weit fortgeschritten, da die Technologie weniger erprobt ist und weiter erforscht und entwickelt wird.

## On-Chain Skalierung {#on-chain-scaling}

Diese Methode der Skalierung erfordert Änderungen am Ethereum-Protokoll (Layer 1 [Mainnet](/glossary/#mainnet)). Dem Sharding gilt derzeit das Hauptaugenmerk für diese Skalierungsmethode.

### Sharding {#sharding}

Unter Sharding versteht man die horizontale Aufteilung einer Datenbank, um die Last zu verteilen. Im Ethereum-Kontext wird das Sharding die Netzwerküberlastung reduzieren und die Transaktionen pro Sekunde erhöhen, indem neue Ketten, die sogenannten „Shards", geschaffen werden. Dies entlastet auch die einzelnen Prüfer, die nicht mehr die Gesamtheit aller Transaktionen im Netz bearbeiten müssen.

Erfahren Sie mehr über [Sharding](/roadmap/danksharding/).

## Off-Chain-Skalierung {#off-chain-scaling}

Off-Chain-Lösungen werden getrennt vom Layer 1 Mainnet implementiert - sie erfordern keine Änderungen am bestehenden Ethereum-Protokoll. Einige Lösungen, die als „Layer-2"-Lösungen bekannt sind, leiten ihre Sicherheit direkt vom Layer-1 Ethereum Konsens her, wie zum Beispiel [optimistische Rollups](/developers/docs/scaling/optimistic-rollups/),[Zero-Knowledge Rollups](/developers/docs/scaling/zk-rollups/) oder [State Channels](/developers/docs/scaling/state-channels/). Andere Lösungen beinhalten die Schaffung neuer Ketten in verschiedenen Formen, die ihre Sicherheit getrennt vom Mainnet beziehen, wie [Sidechains](#sidechains) oder [Plasma](#plasma) Ketten. Diese Lösungen kommunizieren mit dem Mainnet, leiten aber ihre Sicherheit anders ab, um eine Vielzahl von Zielen zu erreichen.

### Layer-2 Skalierung {#layer-2-scaling}

Diese Kategorie von Off-Chain-Lösungen bezieht ihre Sicherheit aus dem Mainnet Ethereum.

Layer-2 ist ein Sammelbegriff für Lösungen, die dazu dienen, Ihre Anwendung zu skalieren, indem sie Transaktionen außerhalb des Ethereum Mainnet (Layer-1) abwickeln und gleichzeitig das robuste dezentrale Sicherheitsmodell vom Mainnet nutzen. Die Transaktionsgeschwindigkeit leidet, wenn das Netzwerk ausgelastet ist, was die Benutzererfahrung im Umgang mit bestimmten Arten von dApps verschlechtert. Und wenn die Netzwerk-Aktivitäten steigen, dann steigen auch die Gaspreise, während sich Transaktionsabsender gegenseitig überbieten wollen. Dies kann die Verwendung von Ethereum sehr teuer machen.

Die meisten Layer-2-Lösungen basieren auf einem Server oder einer Gruppe von Servern, von denen jeder als Knotenpunkt, Validator, Operator, Sequenzer, Blockproduzent oder ähnlich bezeichnet wird. Je nach Implementierung können diese Layer-2-Knotenpunkte von Einzelpersonen, Unternehmen oder Einrichtungen, die sie nutzen, oder von einem Drittanbieter oder von einer großen Gruppe von Einzelpersonen (ähnlich wie beim Mainnet) betrieben werden. Im Allgemeinen werden die Transaktionen an diese Layer-2-Knotenpunkte übermittelt, anstatt direkt an Layer-1 (Mainnet) übermittelt zu werden. Bei einigen Lösungen fasst die Layer-2-Instanz diese dann in Gruppen zusammen, bevor sie sie in Layer-1 verankert werden, woraufhin sie wiederum von Layer-1 gesichert werden und nicht mehr verändert werden können. Die Details, wie dies geschieht, variieren erheblich zwischen verschiedenen Layer-2-Technologien und -Implementierungen.

Eine bestimmte Layer-2-Instanz kann offen sein und von vielen Anwendungen gemeinsam genutzt werden, oder sie kann von einem Projekt bereitgestellt werden und nur dessen Anwendung unterstützen.

#### Warum wird Layer-2 gebraucht? {#why-is-layer-2-needed}

- Mehr Transaktionen pro Sekunde verbessern die Benutzererfahrung erheblich und reduzieren die Netzwerküberlastung auf dem Ethereum Mainnet.
- Transaktionen werden zu einer einzigen Transaktion auf dem Ethereum Mainnet zusammengefasst, wodurch die Gasgebühren für Benutzer gesenkt werden. Dadurch wiederum wird Ethereum für die Menschen überall integrativer und zugänglicher.
- Keine Aktualisierungen der Skalierbarkeit sollten auf Kosten der Dezentralisierung oder Sicherheit gehen - Layer-2 baut auf Ethereum auf.
- Es gibt anwendungsspezifische Layer-2-Netzwerke, die ihre eigenen Vorteile im Umgang mit Assets im großen Maßstab mit sich bringen.

#### Rollups {#rollups}

Rollups führen Transaktionen außerhalb von Layer-1 aus, und die Daten werden dann an Layer-1 weitergeleitet, wo ein Konsens erzielt wird. Da die Transaktionsdaten in Layer-1-Blöcken enthalten sind, können Rollups durch die eigene Ethereum-Sicherheit gesichert werden.

Es gibt zwei Arten von Rollups mit verschiedenen Sicherheitsmodellen:

- **Optimistische Rollups**: geht davon aus, dass Transaktionen standardmäßig gültig sind, und führt nur im Falle einer Anfechtung Berechnungen über einen [**Betrugsnachweis**](/glossary/#fraud-proof) durch. [Mehr über Optimistische Rollups](/Developers/Docs/Scaling/Optimistic-Rollups/).
- **Zero-Knowledge Rollups**: Führt die Berechnung außerhalb der Kette durch und reicht einen [**Gültigkeitsnachweis**](/glossary/#validity-proof) an die Kette ein. [Mehr zu Zero-Knowledge Rollups](/Developers/Docs/Scaling/Zk-Rollups/).

#### Zustandskanäle {#channels}

Zustandskanäle nutzen Multisig-Verträge, um den Teilnehmenden die Möglichkeit zu geben, schnell und frei Transaktionen außerhalb der Kette durchzuführen und diese dann über das Mainnet abzurechnen. Dadurch werden Netzwerküberlastungen, Gebühren und Verzögerungen auf ein Minimum reduziert. Die beiden Arten von Kanälen sind derzeit Zustandskanäle und Zahlungskanäle.

Erfahren Sie mehr über [Zustandskanäle](/Developers/Docs/Scaling/State-Channels/).

### Seitenketten {#sidechains}

Eine Seitenkette ist eine unabhängige EVM-kompatible Blockchain, die parallel zum Mainnet läuft. Diese sind über Zweiseitige Brücken mit Ethereum kompatibel und laufen nach ihren eigenen Konsensregeln und Blockparametern.

Erfahren Sie mehr über [Seitenketten](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

Eine Plasmakette ist eine separate Blockchain, die an der Ethereum-Blockchain verankert ist und Betrugsnachweise (wie [Optimistische Rollups](/developers/docs/scaling/optimistic-rollups/)) verwendet, um Streitigkeiten zu schlichten.

Erfahren Sie mehr über [Plasma](/Developers/Docs/Scaling/Plasma/).

### Validium {#validium}

Eine Validium-Kette nutzt Gültigkeitsnachweise wie Zero-Knowledge-Rollups, aber Daten werden nicht auf der Main Layer-1 Ethereum Chain gespeichert. Dies kann zu 10.000 Transaktionen pro Sekunde pro Validium-Kette führen, zudem können mehrere Ketten parallel laufen.

Lernen Sie mehr über [Validium](/developers/docs/scaling/validium/).

## Warum werden so viele Skalierungslösungen benötigt? {#why-do-we-need-these}

- Mehrere Lösungen können dazu beitragen, die Gesamtüberlastung in einem Teil des Netzes zu verringern, und verhindern außerdem einzelne Fehlerquellen.
- Das Ganze ist größer als die Summe seiner Teile. Es können verschiedene Lösungen existieren und miteinander harmonieren, was einen exponentiellen Effekt auf die künftige Transaktionsgeschwindigkeit und den Durchsatz ermöglicht.
- Nicht alle Lösungen erfordern die direkte Nutzung des Ethereum-Konsens-Algorithmus, und Alternativen können Vorteile bieten, die sonst nur schwer zu erreichen wären.
- Eine einzige Skalierungslösung reicht nicht aus, um die [Ethereum Vision](/roadmap/vision/) zu erfüllen.

## Eher der visuelle Lernende? {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_Beachten Sie, dass in der Erklärung im Video der Begriff „Layer 2" für alle Off-Chain-Skalierungslösungen verwendet wird, während wir „Layer-2" als eine Off-Chain-Lösung bezeichnen, die ihre Sicherheit aus dem Layer 1 Mainnet-Konsens bezieht._

<YouTube id="7pWxCklcNsU" />

## Weiterführende Informationen {#further-reading}

- [Eine Rollup-zentrische Ethereum Roadmap](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)_Vitalik Buterin_
- [Aktuelle Analysen zu Layer 2 Skalierungslösungen für Ethereum](https://www.l2beat.com/)
- [Evaluierung von Ethereum Layer 2 Skalierungslösungen: Ein Vergleichsrahmen](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Ein unvollständiger Leitfaden für Rollups](https://vitalik.ca/general/2021/01/05/rollup.html)
- [Ethereum-betriebene ZK-Rollups: Weltmeister](https://hackmd.io/@canti/rkUT0BD8K)
- [Optimistische Rollups ggü. ZK-Rollups](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Zero-Knowledge Blockchain Skalierung](https://ethworks.io/assets/download/zero-knowledge-blockchain-scaling-ethworks.pdf)
- [Warum Rollups + Daten-Shards die einzige nachhaltige Lösung für hohe Skalierbarkeit sind](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)

_Kennen Sie eine Community Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_
