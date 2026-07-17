---
title: Skalierung
description: "Eine Einführung in die verschiedenen Skalierungsoptionen, die derzeit von der Ethereum-Community entwickelt werden."
lang: de
sidebarDepth: 3
---

## Übersicht zur Skalierung {#scaling-overview}

Da die Anzahl der Personen, die [Ethereum](/) nutzen, gewachsen ist, hat die Blockchain bestimmte Kapazitätsgrenzen erreicht. Dies hat die Kosten für die Nutzung des Netzwerks in die Höhe getrieben und den Bedarf an „Skalierungslösungen“ geschaffen. Es werden mehrere Lösungen erforscht, getestet und implementiert, die unterschiedliche Ansätze verfolgen, um ähnliche Ziele zu erreichen.

Das Hauptziel der Skalierbarkeit besteht darin, die Transaktionsgeschwindigkeit (schnellere Endgültigkeit) und den Transaktionsdurchsatz (höhere Anzahl von Transaktionen pro Sekunde) zu erhöhen, ohne die Dezentralisierung oder Sicherheit zu opfern. Auf der Layer 1 (L1) Ethereum-Blockchain führt eine hohe Nachfrage zu langsameren Transaktionen und unrentablen [Gaspreisen](/developers/docs/gas/). Die Erhöhung der Netzwerkkapazität in Bezug auf Geschwindigkeit und Transaktionsdurchsatz ist grundlegend für die sinnvolle und massenhafte Akzeptanz von Ethereum.

Während Geschwindigkeit und Transaktionsdurchsatz wichtig sind, ist es unerlässlich, dass Skalierungslösungen, die diese Ziele ermöglichen, dezentral und sicher bleiben. Die Eintrittsbarriere für Knotenbetreiber niedrig zu halten, ist entscheidend, um eine Entwicklung hin zu zentralisierter und unsicherer Rechenleistung zu verhindern.

Konzeptionell kategorisieren wir die Skalierung zunächst entweder als Onchain-Skalierung oder als offchain-Skalierung.

## Voraussetzungen {#prerequisites}

Sie sollten ein gutes Verständnis aller grundlegenden Themen haben. Die Implementierung von Skalierungslösungen ist fortgeschritten, da die Technologie weniger praxiserprobt ist und weiterhin erforscht und entwickelt wird.

## Onchain-Skalierung {#onchain-scaling}

Die Onchain-Skalierung erfordert Änderungen am Ethereum-Protokoll (Layer 1 [Mainnet](/glossary/#mainnet)). Lange Zeit wurde erwartet, dass das Sharding der Blockchain Ethereum skalieren würde. Dies hätte bedeutet, die Blockchain in diskrete Teile (Shards) aufzuteilen, die von Teilmengen von Validatoren verifiziert werden. Die Skalierung durch Layer 2 (L2) Rollups hat sich jedoch als primäre Skalierungstechnik durchgesetzt. Dies wird durch die Hinzufügung einer neuen, günstigeren Form von Daten unterstützt, die an Ethereum-Blöcke angehängt werden und speziell dafür entwickelt wurden, Rollups für Benutzer günstig zu machen.

### Sharding {#sharding}

Sharding ist der Prozess der Aufteilung einer Datenbank. Teilmengen von Validatoren wären für einzelne Shards verantwortlich, anstatt das gesamte Ethereum im Auge zu behalten. Sharding stand lange Zeit auf der Ethereum-[Roadmap](/roadmap/) und sollte einst vor dem Merge zu Proof-of-Stake (PoS) ausgeliefert werden. Die rasante Entwicklung von [Layer-2-Rollups](#layer-2-scaling) und die Erfindung von [Danksharding](/roadmap/danksharding) (das Hinzufügen von Blobs mit Rollup-Daten zu Ethereum-Blöcken, die von Validatoren sehr effizient verifiziert werden können) haben jedoch dazu geführt, dass die Ethereum-Community eine Rollup-zentrierte Skalierung anstelle einer Skalierung durch Sharding bevorzugt. Dies wird auch dazu beitragen, die Konsenslogik von Ethereum einfacher zu halten.

## Offchain-Skalierung {#offchain-scaling}

Offchain-Lösungen werden separat vom Layer-1-Mainnet implementiert – sie erfordern keine Änderungen am bestehenden Ethereum-Protokoll. Einige Lösungen, bekannt als „Layer-2“-Lösungen, leiten ihre Sicherheit direkt vom Layer-1-Ethereum-Konsens ab, wie z. B. [Optimistic Rollups](/developers/docs/scaling/optimistic-rollups/), [Zero-Knowledge-Rollups](/developers/docs/scaling/zk-rollups/) oder [Zustandskanäle](/developers/docs/scaling/state-channels/). Andere Lösungen beinhalten die Erstellung neuer Chains in verschiedenen Formen, die ihre Sicherheit unabhängig vom Mainnet ableiten, wie z. B. [Sidechains](#sidechains), [Validiums](#validium) oder [Plasma-Chains](#plasma). Diese Lösungen kommunizieren mit dem Mainnet, leiten ihre Sicherheit jedoch anders ab, um eine Vielzahl von Zielen zu erreichen.

### Layer-2-Skalierung {#layer-2-scaling}

Diese Kategorie von offchain-Lösungen leitet ihre Sicherheit vom Ethereum Mainnet ab.

Layer 2 ist ein Sammelbegriff für Lösungen, die entwickelt wurden, um bei der Skalierung Ihrer Anwendung zu helfen, indem Transaktionen außerhalb des Ethereum Mainnets (Layer 1) abgewickelt werden, während gleichzeitig das robuste dezentrale Sicherheitsmodell des Mainnets genutzt wird. Die Transaktionsgeschwindigkeit leidet, wenn das Netzwerk ausgelastet ist, was die Benutzererfahrung für bestimmte Arten von Dezentralen Anwendungen (Dapps) verschlechtert. Und je stärker das Netzwerk ausgelastet ist, desto mehr steigen die Gaspreise, da die Absender von Transaktionen versuchen, sich gegenseitig zu überbieten. Dies kann die Nutzung von Ethereum sehr teuer machen.

Die meisten Layer-2-Lösungen konzentrieren sich auf einen Server oder einen Server-Cluster, von denen jeder als Knoten, Validator, Betreiber, Sequencer, Blockproduzent oder mit einem ähnlichen Begriff bezeichnet werden kann. Abhängig von der Implementierung können diese Layer-2-Knoten von den Einzelpersonen, Unternehmen oder Entitäten betrieben werden, die sie nutzen, oder von einem Drittanbieter oder von einer großen Gruppe von Einzelpersonen (ähnlich dem Mainnet). Im Allgemeinen werden Transaktionen an diese Layer-2-Knoten übermittelt, anstatt direkt an Layer 1 (Mainnet) gesendet zu werden. Bei einigen Lösungen fasst die Layer-2-Instanz sie dann in Gruppen zusammen, bevor sie auf Layer 1 verankert werden, wonach sie durch Layer 1 gesichert sind und nicht mehr geändert werden können. Die Details, wie dies geschieht, variieren erheblich zwischen verschiedenen Layer-2-Technologien und -Implementierungen.

Eine spezifische Layer-2-Instanz kann offen sein und von vielen Anwendungen gemeinsam genutzt werden, oder sie kann von einem Projekt bereitgestellt werden und ausschließlich der Unterstützung ihrer eigenen Anwendung dienen.

#### Warum wird Layer 2 benötigt? {#why-is-layer-2-needed}

- Erhöhte Transaktionen pro Sekunde verbessern die Benutzererfahrung erheblich und reduzieren die Netzwerküberlastung im Ethereum Mainnet.
- Transaktionen werden zu einer einzigen Transaktion an das Ethereum Mainnet zusammengefasst (Rollup), was die Gasgebühren für Benutzer senkt und Ethereum für Menschen überall inklusiver und zugänglicher macht.
- Jegliche Updates zur Skalierbarkeit sollten nicht auf Kosten der Dezentralisierung oder Sicherheit gehen – Layer 2 baut auf Ethereum auf.
- Es gibt anwendungsspezifische Layer-2-Netzwerke, die ihre eigenen Effizienzen mitbringen, wenn sie mit Vermögenswerten in großem Maßstab arbeiten.

[Mehr zu Layer 2](/layer-2/).

#### Rollups {#rollups}

Rollups führen die Transaktionsausführung außerhalb von Layer 1 durch und dann werden die Daten auf Layer 1 gepostet, wo ein Konsens erzielt wird. Da Transaktionsdaten in Layer-1-Blöcke aufgenommen werden, ermöglicht dies, dass Rollups durch die native Ethereum-Sicherheit gesichert werden.

Es gibt zwei Arten von Rollups mit unterschiedlichen Sicherheitsmodellen:

- **Optimistic Rollups**: Gehen standardmäßig davon aus, dass Transaktionen gültig sind, und führen Berechnungen über einen [**Betrugsnachweis**](/glossary/#fraud-proof) nur im Falle einer Anfechtung durch. [Mehr zu Optimistic Rollups](/developers/docs/scaling/optimistic-rollups/).
- **Zero-Knowledge-Rollups**: Führen Berechnungen offchain durch und übermitteln einen [**Gültigkeitsbeweis**](/glossary/#validity-proof) an die Chain. [Mehr zu Zero-Knowledge-Rollups](/developers/docs/scaling/zk-rollups/).

#### Zustandskanäle {#channels}

Zustandskanäle nutzen Multisig-Verträge, um es Teilnehmern zu ermöglichen, schnell und frei offchain zu transagieren und dann die Endgültigkeit mit dem Mainnet abzurechnen. Dies minimiert Netzwerküberlastung, Gebühren und Verzögerungen. Die beiden Arten von Kanälen sind derzeit Zustandskanäle und Zahlungskanäle.

Erfahren Sie mehr über [Zustandskanäle](/developers/docs/scaling/state-channels/).

### Sidechains {#sidechains}

Eine Sidechain ist eine unabhängige EVM-kompatible Blockchain, die parallel zum Mainnet läuft. Diese sind über Zwei-Wege-Brücken mit Ethereum kompatibel und laufen unter ihren eigenen gewählten Konsensregeln und Blockparametern.

Erfahren Sie mehr über [Sidechains](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

Eine Plasma-Chain ist eine separate Blockchain, die in der Ethereum-Haupt-Chain verankert ist und Betrugsnachweise (wie [Optimistic Rollups](/developers/docs/scaling/optimistic-rollups/)) verwendet, um Streitigkeiten zu schlichten.

Erfahren Sie mehr über [Plasma](/developers/docs/scaling/plasma/).

### Validium {#validium}

Eine Validium-Chain verwendet Gültigkeitsbeweise wie Zero-Knowledge-Rollups, aber die Daten werden nicht auf der Haupt-Layer-1-Ethereum-Chain gespeichert. Dies kann zu 10.000 Transaktionen pro Sekunde pro Validium-Chain führen, und mehrere Chains können parallel betrieben werden.

Erfahren Sie mehr über [Validium](/developers/docs/scaling/validium/).

## Warum werden so viele Skalierungslösungen benötigt? {#why-do-we-need-these}

- Mehrere Lösungen können dazu beitragen, die Gesamtüberlastung in jedem Teil des Netzwerks zu reduzieren und auch Single Points of Failure zu verhindern.
- Das Ganze ist mehr als die Summe seiner Teile. Verschiedene Lösungen können existieren und harmonisch zusammenarbeiten, was einen exponentiellen Effekt auf die zukünftige Transaktionsgeschwindigkeit und den Transaktionsdurchsatz ermöglicht.
- Nicht alle Lösungen erfordern die direkte Nutzung des Ethereum-Konsensalgorithmus, und Alternativen können Vorteile bieten, die sonst schwer zu erreichen wären.

## Lernen Sie besser visuell? {#visual-learner}

<VideoWatch slug="layer-2-scaling-explained" />

_Beachten Sie, dass die Erklärung im Video den Begriff „Layer 2“ verwendet, um sich auf alle offchain-Skalierungslösungen zu beziehen, während wir „Layer 2“ als eine offchain-Lösung differenzieren, die ihre Sicherheit durch den Layer-1-Mainnet-Konsens ableitet._

<VideoWatch slug="rollups-scaling-strategy" />

## Weiterführende Literatur {#further-reading}

- [Eine Rollup-zentrierte Ethereum-Roadmap](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Aktuelle Analysen zu Layer-2-Skalierungslösungen für Ethereum](https://www.l2beat.com/)
- [Bewertung von Ethereum-Layer-2-Skalierungslösungen: Ein Vergleichsrahmen](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Ein unvollständiger Leitfaden zu Rollups](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [Ethereum-basierte ZK-Rollups: Weltklasse](https://hackmd.io/@canti/rkUT0BD8K)
- [Optimistic Rollups vs. ZK-Rollups](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Warum Rollups + Daten-Shards die einzige nachhaltige Lösung für hohe Skalierbarkeit sind](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [Welche Art von Layer 3s machen Sinn?](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [Datenverfügbarkeit oder: Wie Rollups lernten, sich keine Sorgen mehr zu machen und Ethereum zu lieben](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [Der praktische Leitfaden zu Ethereum-Rollups](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_

## Tutorials: Skalierbare Layer 2s auf Ethereum erstellen {#tutorials}

- [All you can cache](/developers/tutorials/all-you-can-cache/) _– Wie man einen Caching-Vertrag erstellt und verwendet, um Aufrufdaten-Kosten bei Rollups zu reduzieren._
- [Kurze ABIs zur Optimierung von Aufrufdaten](/developers/tutorials/short-abi/) _– Wie man kürzere ABIs verwendet, um die Kosten für Aufrufdaten bei Layer-2-Transaktionen zu reduzieren._