---
title: Skalierung
description: Eine Einführung in die verschiedenen Skalierungsoptionen, die derzeit von der Ethereum Community entwickelt werden.
lang: de
sidebarDepth: 3
---

## Skalierungsübersicht {#scaling-overview}

Da die Zahl der Nutzer von Ethereum gestiegen ist, hat die Blockchain gewisse Kapazitätsgrenzen erreicht. Dies hat die Kosten für die Nutzung des Netzes in die Höhe getrieben und den Bedarf an „Skalierungslösungen" geschaffen. Es gibt mehrere Lösungen, die erforscht, getestet und umgesetzt werden, die unterschiedliche Ansätze verfolgen, um ähnliche Ziele zu erreichen.

Das Hauptziel der Skalierbarkeit besteht darin, die Transaktionsgeschwindigkeit (schnellere Finalität) und den Transaktionsdurchsatz (höhere Anzahl von Transaktionen pro Sekunde) zu erhöhen, ohne die Dezentralisierung oder die Sicherheit zu beeinträchtigen. Auf der Layer-1-Ethereum-Blockchain führt eine hohe Nachfrage zu langsameren Transaktionen und untragbaren [Gaspreisen](/developers/docs/gas/). Die Erhöhung der Netzwerkkapazität in Bezug auf Geschwindigkeit und Durchsatz ist von grundlegender Bedeutung für eine sinnvolle und massenhafte Einführung von Ethereum.

Geschwindigkeit und Durchsatz sind zwar von Bedeutung, aber es ist entscheidend, dass Skalierungslösungen, die diese Ziele ermöglichen, dezentralisiert und sicher bleiben. Eine niedrige Einstiegshürde für die Betreiber von Knotenpunkten ist von entscheidender Bedeutung, um eine Entwicklung hin zu zentralisierter und unsicherer Rechenleistung zu verhindern.

Konzeptionell kategorisieren wir Skalierung zunächst entweder als Onchain-Skalierung oder Offchain-Skalierung.

## Voraussetzungen {#prerequisites}

Sie sollten über ein gutes Verständnis aller grundlegenden Themen verfügen. Die Umsetzung von Skalierungslösungen ist weit fortgeschritten, da die Technologie weniger erprobt ist und weiter erforscht und entwickelt wird.

## Onchain-Skalierung {#onchain-scaling}

Onchain-Skalierung erfordert Änderungen am Ethereum-Protokoll (Layer-1-[Mainnet](/glossary/#mainnet)). Seit langem wurde die Partitionierung von Ethereum erwartet: Eine Skalierungslösung für Ethereum. Dies würde beinhalten, die Blockchain in diskrete Stücke (Shards) aufzuteilen, die von Teilgruppen von Validatoren verifiziert werden. Jedoch hat das Skalieren durch Layer-2 Rollups als primäre Skalierungstechnik die Führung übernommen. Dies wird durch die Hinzufügung einer neuen kostengünstigeren Form von Daten unterstützt, die an Ethereum-Blöcke angehängt ist und speziell entwickelt wurde, um Rollups für Benutzer kostengünstig zu machen.

### Sharding {#sharding}

Sharding ist ein Prozess der Datenverwaltung, bei dem alle gespeicherten Daten in mehrere Fragmente aufgeteilt werden. Unterklassen von Validatoren wären für ihre eigenen Shards verantwortlich, anstatt dafür zu sorgen, dass die Gesamtlast des Ethereum-Systems aufrechterhalten wird. Sharding war lange Zeit Teil der Ethereum-[Roadmap](/roadmap/) und sollte ursprünglich vor The Merge zum Proof-of-Stake-Verfahren implementiert werden. Die schnelle Entwicklung von [Layer-2-Rollups](#layer-2-scaling) und die Erfindung von [Danksharding](/roadmap/danksharding) (das Hinzufügen von Blobs mit Rollup-Daten zu Ethereum-Blöcken, die von Validatoren sehr effizient verifiziert werden können) hat jedoch dazu geführt, dass die Ethereum-Community eine Rollup-zentrierte Skalierung anstelle der Skalierung durch Sharding bevorzugt. Dies wird auch dazu beitragen, die Konsenslogik von Ethereum einfacher zu halten.

## Offchain-Skalierung {#offchain-scaling}

Offchain-Lösungen werden separat von Layer 1 Mainnet implementiert – sie erfordern keine Änderungen am bestehenden Ethereum-Protokoll. Einige Lösungen, die als „Layer-2“-Lösungen bekannt sind, leiten ihre Sicherheit direkt vom Layer-1-Ethereum-Konsens ab, wie z. B. [Optimistic Rollups](/developers/docs/scaling/optimistic-rollups/), [Zero-Knowledge-Rollups](/developers/docs/scaling/zk-rollups/) oder [State Channels](/developers/docs/scaling/state-channels/). Andere Lösungen umfassen die Erstellung neuer Chains in verschiedenen Formen, die ihre Sicherheit separat vom Mainnet ableiten, wie z. B. [Sidechains](#sidechains), [Validiums](#validium) oder [Plasma-Chains](#plasma). Diese Lösungen kommunizieren mit dem Mainnet, leiten aber ihre Sicherheit anders ab, um eine Vielzahl von Zielen zu erreichen.

### Layer-2-Skalierung {#layer-2-scaling}

Diese Kategorie von Offchain-Lösungen bezieht ihre Sicherheit aus dem Ethereum-Mainnet.

Layer-2 ist ein Sammelbegriff für Lösungen, die dazu dienen, Ihre Anwendung zu skalieren, indem sie Transaktionen außerhalb des Ethereum Mainnet (Layer-1) abwickeln und gleichzeitig das robuste dezentrale Sicherheitsmodell vom Mainnet nutzen. Die Transaktionsgeschwindigkeit leidet, wenn das Netzwerk ausgelastet ist, was die Benutzererfahrung im Umgang mit bestimmten Arten von dApps verschlechtert. Und wenn die Netzwerk-Aktivitäten steigen, dann steigen auch die Gaspreise, während sich Transaktionsabsender gegenseitig überbieten wollen. Dies kann die Verwendung von Ethereum sehr teuer machen.

Die meisten Layer-2-Lösungen basieren auf einem Server oder einer Gruppe von Servern, von denen jeder als Knotenpunkt, Validator, Operator, Sequenzer, Blockproduzent oder ähnlich bezeichnet wird. Je nach Implementierung können diese Layer-2-Knotenpunkte von Einzelpersonen, Unternehmen oder Einrichtungen, die sie nutzen, oder von einem Drittanbieter oder von einer großen Gruppe von Einzelpersonen (ähnlich wie beim Mainnet) betrieben werden. Im Allgemeinen werden die Transaktionen an diese Layer-2-Knotenpunkte übermittelt, anstatt direkt an Layer-1 (Mainnet) übermittelt zu werden. Bei einigen Lösungen fasst die Layer-2-Instanz diese dann in Gruppen zusammen, bevor sie sie an Layer 1 anheftet, wonach sie durch Layer 1 gesichert sind und nicht mehr geändert werden können. Die Details, wie dies geschieht, variieren erheblich zwischen verschiedenen Layer-2-Technologien und -Implementierungen.

Eine bestimmte Layer-2-Instanz kann offen sein und von vielen Anwendungen gemeinsam genutzt werden, oder sie kann von einem Projekt bereitgestellt werden und nur dessen Anwendung unterstützen.

#### Warum wird Layer-2 gebraucht? {#why-is-layer-2-needed}

- Mehr Transaktionen pro Sekunde verbessern die Benutzererfahrung erheblich und reduzieren die Netzwerküberlastung auf dem Ethereum Mainnet.
- Transaktionen werden in einer einzigen Transaktion an das Ethereum-Mainnet gebündelt, was die Gasgebühren für die Nutzer reduziert und Ethereum für Menschen überall integrativer und zugänglicher macht.
- Keine Aktualisierungen der Skalierbarkeit sollten auf Kosten der Dezentralisierung oder Sicherheit gehen - Layer-2 baut auf Ethereum auf.
- Es gibt anwendungsspezifische Layer-2-Netzwerke, die ihre eigenen Vorteile im Umgang mit Assets im großen Maßstab mit sich bringen.

[Mehr über Layer 2](/layer-2/).

#### Rollups {#rollups}

Rollups führen Transaktionen außerhalb von Layer-1 aus, und die Daten werden dann an Layer-1 weitergeleitet, wo ein Konsens erzielt wird. Da die Transaktionsdaten in Layer-1-Blöcken enthalten sind, können Rollups durch die eigene Ethereum-Sicherheit gesichert werden.

Es gibt zwei Arten von Rollups mit verschiedenen Sicherheitsmodellen:

- **Optimistic Rollups**: Gehen standardmäßig davon aus, dass Transaktionen gültig sind, und führen Berechnungen nur im Falle einer Anfechtung mittels eines [**Betrugsbeweises**](/glossary/#fraud-proof) durch. [Mehr über Optimistic Rollups](/developers/docs/scaling/optimistic-rollups/).
- **Zero-Knowledge-Rollups**: Führen Berechnungen offchain durch und übermitteln einen [**Gültigkeitsnachweis**](/glossary/#validity-proof) an die Chain. [Mehr über Zero-Knowledge-Rollups](/developers/docs/scaling/zk-rollups/).

#### State Channels {#channels}

State Channels nutzen Multisig-Verträge, um Teilnehmern schnelle und freie Transaktionen offchain zu ermöglichen, bevor sie die Endgültigkeit mit dem Mainnet abwickeln. Dadurch werden Netzwerküberlastungen, Gebühren und Verzögerungen auf ein Minimum reduziert. Die beiden Arten von Kanälen sind derzeit Zustandskanäle und Zahlungskanäle.

Erfahren Sie mehr über [State Channels](/developers/docs/scaling/state-channels/).

### Sidechains {#sidechains}

Eine Sidechain ist eine unabhängige, EVM-kompatible Blockchain, die parallel zum Mainnet läuft. Diese sind über zweiseitige kettenübergreifende Brücken mit Ethereum kompatibel und laufen nach ihren eigenen gewählten Konsensregeln und Blockparametern.

Erfahren Sie mehr über [Sidechains](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

Eine Plasma-Chain ist eine separate Blockchain, die an der Ethereum-Hauptchain verankert ist und Betrugsbeweise (wie [Optimistic Rollups](/developers/docs/scaling/optimistic-rollups/)) verwendet, um Streitigkeiten beizulegen.

Erfahren Sie mehr über [Plasma](/developers/docs/scaling/plasma/).

### Validium {#validium}

Eine Validium-Kette nutzt Gültigkeitsnachweise wie Zero-Knowledge-Rollups, aber Daten werden nicht auf der Main Layer-1 Ethereum Chain gespeichert. Dies kann zu 10.000 Transaktionen pro Sekunde pro Validium-Kette führen, zudem können mehrere Ketten parallel laufen.

Erfahren Sie mehr über [Validium](/developers/docs/scaling/validium/).

## Warum werden so viele Skalierungslösungen benötigt? {#why-do-we-need-these}

- Mehrere Lösungen können helfen, die allgemeine Überlastung eines Teils des Netzwerks zu reduzieren und einzelne Fehlerquellen zu vermeiden.
- Das Ganze ist größer als die Summe seiner Teile. Es können verschiedene Lösungen existieren und miteinander harmonieren, was einen exponentiellen Effekt auf die künftige Transaktionsgeschwindigkeit und den Durchsatz ermöglicht.
- Nicht alle Lösungen erfordern die direkte Nutzung des Ethereum-Konsens-Algorithmus, und Alternativen können Vorteile bieten, die sonst nur schwer zu erreichen wären.

## Eher der visuelle Lernende? {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_Beachten Sie, dass die Erklärung im Video den Begriff "Layer 2" verwendet, um alle Offchain-Skalierungslösungen zu beschreiben, während wir "Layer 2" als eine Offchain-Lösung differenzieren, die ihre Sicherheit durch das Layer-1-Mainnet-Konsensverfahren erhält._

<YouTube id="7pWxCklcNsU" />

## Weiterführende Lektüre {#further-reading}

- [Eine Rollup-zentrierte Ethereum-Roadmap](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Aktuelle Analysen zu Layer-2-Skalierungslösungen für Ethereum](https://www.l2beat.com/)
- [Bewertung von Ethereum-Layer-2-Skalierungslösungen: Ein Vergleichsrahmen](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Ein unvollständiger Leitfaden für Rollups](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [Ethereum-betriebene ZK-Rollups: Weltklasse](https://hackmd.io/@canti/rkUT0BD8K)
- [Optimistic Rollups vs. ZK-Rollups](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Warum Rollups + Data Shards die einzig nachhaltige Lösung für hohe Skalierbarkeit sind](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [Welche Art von Layer-3s sind sinnvoll?](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [Data Availability Or: How Rollups Learned To Stop Worrying And Love Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [Der praktische Leitfaden für Ethereum-Rollups](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)

_Sie kennen Community-Resourcen die Ihnen geholfen haben? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_
