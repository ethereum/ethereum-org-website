---
title: Skalierung
description: "Eine Einführung in die verschiedenen Skalierungsoptionen, die derzeit von der Ethereum-Community entwickelt werden."
lang: de
sidebarDepth: 3
---

## Skalierungsübersicht {#scaling-overview}

Da die Anzahl der Menschen, die [Ethereum](/) nutzen, gewachsen ist, hat die Blockchain bestimmte Kapazitätsgrenzen erreicht. Dies hat die Kosten für die Nutzung des Netzwerks in die Höhe getrieben und den Bedarf an „Skalierungslösungen“ geschaffen. Es werden mehrere Lösungen erforscht, getestet und implementiert, die unterschiedliche Ansätze verfolgen, um ähnliche Ziele zu erreichen.

Das Hauptziel der Skalierbarkeit ist es, die Transaktionsgeschwindigkeit (schnellere Finalität) und den Transaktionsdurchsatz (höhere Anzahl von Transaktionen pro Sekunde) zu erhöhen, ohne die Dezentralisierung oder Sicherheit zu opfern. Auf der Ebene 1 der Ethereum-Blockchain führt eine hohe Nachfrage zu langsameren Transaktionen und unrentablen [Gaspreisen](/developers/docs/gas/). Die Erhöhung der Netzwerkkapazität in Bezug auf Geschwindigkeit und Durchsatz ist grundlegend für eine sinnvolle und massenhafte Akzeptanz von Ethereum.

Während Geschwindigkeit und Durchsatz wichtig sind, ist es unerlässlich, dass Skalierungslösungen, die diese Ziele ermöglichen, dezentralisiert und sicher bleiben. Die Eintrittsbarriere für Betreiber von Blockchain-Knoten niedrig zu halten, ist entscheidend, um eine Entwicklung hin zu zentralisierter und unsicherer Rechenleistung zu verhindern.

Konzeptionell kategorisieren wir die Skalierung zunächst entweder als Skalierung auf der Blockchain oder als Off-Chain-Skalierung.

## Voraussetzungen {#prerequisites}

Sie sollten ein gutes Verständnis aller grundlegenden Themen haben. Die Implementierung von Skalierungslösungen ist für Fortgeschrittene, da die Technologie weniger praxiserprobt ist und weiterhin erforscht und entwickelt wird.

## Skalierung auf der Blockchain {#onchain-scaling}

Die Skalierung auf der Blockchain erfordert Änderungen am Ethereum-Protokoll (Ebene 1 [Mainnet](/glossary/#mainnet)). Lange Zeit wurde erwartet, dass das Sharding der Blockchain Ethereum skalieren würde. Dies hätte bedeutet, die Blockchain in diskrete Teile (Shards) aufzuteilen, die von Teilmengen von Validatoren verifiziert werden. Die Skalierung durch Ebene-2-Rollups hat jedoch als primäre Skalierungstechnik übernommen. Dies wird durch die Hinzufügung einer neuen, günstigeren Form von Daten unterstützt, die an Ethereum-Blöcke angehängt werden und speziell dafür entwickelt wurden, Rollups für Benutzer günstig zu machen.

### Sharding {#sharding}

Sharding ist der Prozess der Aufteilung einer Datenbank. Teilmengen von Validatoren wären für einzelne Shards verantwortlich, anstatt das gesamte Ethereum im Auge zu behalten. Sharding stand lange Zeit auf der Ethereum-[Roadmap](/roadmap/) und sollte einst vor dem Merge zu Proof-of-Stake ausgeliefert werden. Die rasante Entwicklung von [Ebene-2-Rollups](#layer-2-scaling) und die Erfindung von [Danksharding](/roadmap/danksharding) (das Hinzufügen von Blobs mit Rollup-Daten zu Ethereum-Blöcken, die von Validatoren sehr effizient verifiziert werden können) haben jedoch dazu geführt, dass die Ethereum-Community eine Rollup-zentrierte Skalierung anstelle einer Skalierung durch Sharding bevorzugt. Dies wird auch dazu beitragen, die Konsenslogik von Ethereum einfacher zu halten.

## Off-Chain-Skalierung {#offchain-scaling}

Off-Chain-Lösungen werden getrennt vom Ebene-1-Mainnet implementiert – sie erfordern keine Änderungen am bestehenden Ethereum-Protokoll. Einige Lösungen, bekannt als „Ebene 2“-Lösungen, leiten ihre Sicherheit direkt vom Ebene-1-Ethereum-Konsens ab, wie z. B. [Optimistic Rollups](/developers/docs/scaling/optimistic-rollups/), [Zero-Knowledge Rollups](/developers/docs/scaling/zk-rollups/) oder [State Channels](/developers/docs/scaling/state-channels/). Andere Lösungen beinhalten die Schaffung neuer Ketten in verschiedenen Formen, die ihre Sicherheit getrennt vom Mainnet ableiten, wie z. B. [Sidechains](#sidechains), [Validiums](#validium) oder [Plasma-Ketten](#plasma). Diese Lösungen kommunizieren mit dem Mainnet, leiten ihre Sicherheit jedoch unterschiedlich ab, um eine Vielzahl von Zielen zu erreichen.

### Ebene-2-Skalierung {#layer-2-scaling}

Diese Kategorie von Off-Chain-Lösungen leitet ihre Sicherheit vom Mainnet-Ethereum ab.

Ebene 2 ist ein Sammelbegriff für Lösungen, die entwickelt wurden, um bei der Skalierung Ihrer Anwendung zu helfen, indem Transaktionen außerhalb des Ethereum-Mainnets (Ebene 1) abgewickelt werden, während gleichzeitig das robuste dezentralisierte Sicherheitsmodell des Mainnets genutzt wird. Die Transaktionsgeschwindigkeit leidet, wenn das Netzwerk ausgelastet ist, was die Benutzererfahrung für bestimmte Arten von Dapps verschlechtert. Und wenn das Netzwerk stärker ausgelastet ist, steigen die Gaspreise, da die Absender von Transaktionen versuchen, sich gegenseitig zu überbieten. Dies kann die Nutzung von Ethereum sehr teuer machen.

Die meisten Ebene-2-Lösungen konzentrieren sich auf einen Server oder einen Cluster von Servern, von denen jeder als Blockchain-Knoten, Validator, Betreiber, Sequencer, Blockproduzent oder mit einem ähnlichen Begriff bezeichnet werden kann. Abhängig von der Implementierung können diese Ebene-2-Blockchain-Knoten von den Einzelpersonen, Unternehmen oder Entitäten betrieben werden, die sie nutzen, oder von einem Drittanbieter oder von einer großen Gruppe von Einzelpersonen (ähnlich wie beim Mainnet). Im Allgemeinen werden Transaktionen an diese Ebene-2-Blockchain-Knoten übermittelt, anstatt direkt an Ebene 1 (Mainnet) übermittelt zu werden. Bei einigen Lösungen bündelt die Ebene-2-Instanz sie dann in Gruppen, bevor sie in Ebene 1 verankert werden, wonach sie durch Ebene 1 gesichert sind und nicht mehr geändert werden können. Die Details, wie dies geschieht, variieren erheblich zwischen verschiedenen Ebene-2-Technologien und -Implementierungen.

Eine spezifische Ebene-2-Instanz kann offen sein und von vielen Anwendungen gemeinsam genutzt werden, oder sie kann von einem Projekt bereitgestellt werden und ausschließlich der Unterstützung ihrer eigenen Anwendung dienen.

#### Warum wird Ebene 2 benötigt? {#why-is-layer-2-needed}

- Erhöhte Transaktionen pro Sekunde verbessern die Benutzererfahrung erheblich und reduzieren die Netzwerküberlastung im Mainnet-Ethereum.
- Transaktionen werden zu einer einzigen Transaktion an das Mainnet-Ethereum zusammengefasst (Rollups), was die Gasgebühren für Benutzer senkt und Ethereum für Menschen überall inklusiver und zugänglicher macht.
- Jegliche Aktualisierungen der Skalierbarkeit sollten nicht auf Kosten der Dezentralisierung oder Sicherheit gehen – Ebene 2 baut auf Ethereum auf.
- Es gibt anwendungsspezifische Ebene-2-Netzwerke, die ihre eigenen Effizienzen mitbringen, wenn sie mit Vermögenswerten in großem Maßstab arbeiten.

[Mehr zu Ebene 2](/layer-2/).

#### Rollups {#rollups}

Rollups führen die Transaktionsausführung außerhalb von Ebene 1 durch, und dann werden die Daten auf Ebene 1 veröffentlicht, wo ein Konsens erzielt wird. Da Transaktionsdaten in Ebene-1-Blöcke aufgenommen werden, ermöglicht dies, dass Rollups durch die native Ethereum-Sicherheit gesichert werden.

Es gibt zwei Arten von Rollups mit unterschiedlichen Sicherheitsmodellen:

- **Optimistic Rollups**: Gehen standardmäßig davon aus, dass Transaktionen gültig sind, und führen Berechnungen über einen [**Betrugsnachweis**](/glossary/#fraud-proof) nur im Falle einer Anfechtung durch. [Mehr zu Optimistic Rollups](/developers/docs/scaling/optimistic-rollups/).
- **Zero-Knowledge Rollups**: Führen Berechnungen Off-Chain durch und übermitteln einen [**Validitätsnachweis**](/glossary/#validity-proof) an die Blockchain. [Mehr zu Zero-Knowledge Rollups](/developers/docs/scaling/zk-rollups/).

#### State Channels {#channels}

State Channels nutzen Verträge mit Mehrfachsignatur, um es den Teilnehmern zu ermöglichen, schnell und frei Off-Chain zu transagieren und dann die Finalität mit dem Mainnet abzurechnen. Dies minimiert Netzwerküberlastungen, Gebühren und Verzögerungen. Die beiden Arten von Kanälen sind derzeit State Channels und Payment Channels.

Erfahren Sie mehr über [State Channels](/developers/docs/scaling/state-channels/).

### Sidechains {#sidechains}

Eine Sidechain ist eine unabhängige EVM-kompatible Blockchain, die parallel zum Mainnet läuft. Diese sind über kettenübergreifende Brücken in beide Richtungen mit Ethereum kompatibel und laufen unter ihren eigenen gewählten Regeln für Konsens und Blockparameter.

Erfahren Sie mehr über [Sidechains](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

Eine Plasma-Kette ist eine separate Blockchain, die an der Haupt-Ethereum-Kette verankert ist und Betrugsnachweise (wie [Optimistic Rollups](/developers/docs/scaling/optimistic-rollups/)) verwendet, um Streitigkeiten zu schlichten.

Erfahren Sie mehr über [Plasma](/developers/docs/scaling/plasma/).

### Validium {#validium}

Eine Validium-Kette verwendet Validitätsnachweise wie Zero-Knowledge Rollups, aber die Daten werden nicht auf der Haupt-Ebene-1-Ethereum-Kette gespeichert. Dies kann zu 10.000 Transaktionen pro Sekunde pro Validium-Kette führen, und mehrere Ketten können parallel betrieben werden.

Erfahren Sie mehr über [Validium](/developers/docs/scaling/validium/).

## Warum werden so viele Skalierungslösungen benötigt? {#why-do-we-need-these}

- Mehrere Lösungen können dazu beitragen, die allgemeine Überlastung in jedem Teil des Netzwerks zu verringern und auch Single Points of Failure zu verhindern.
- Das Ganze ist mehr als die Summe seiner Teile. Verschiedene Lösungen können existieren und harmonisch zusammenarbeiten, was einen exponentiellen Effekt auf die zukünftige Transaktionsgeschwindigkeit und den Durchsatz ermöglicht.
- Nicht alle Lösungen erfordern die direkte Nutzung des Ethereum-Konsensalgorithmus, und Alternativen können Vorteile bieten, die sonst schwer zu erreichen wären.

## Lernen Sie besser visuell? {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_Beachten Sie, dass die Erklärung im Video den Begriff „Ebene 2“ verwendet, um sich auf alle Off-Chain-Skalierungslösungen zu beziehen, während wir „Ebene 2“ als eine Off-Chain-Lösung differenzieren, die ihre Sicherheit durch den Ebene-1-Mainnet-Konsens ableitet._

<YouTube id="7pWxCklcNsU" />

## Weiterführende Literatur {#further-reading}

- [A rollup-centric Ethereum roadmap](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Up-to-date analytics on Layer 2 scaling solutions for Ethereum](https://www.l2beat.com/)
- [Evaluating Ethereum layer 2 Scaling Solutions: A Comparison Framework](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [An Incomplete Guide to Rollups](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [Ethereum-powered ZK-Rollups: World Beaters](https://hackmd.io/@canti/rkUT0BD8K)
- [Optimistic Rollups vs ZK Rollups](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Why rollups + data shards are the only sustainable solution for high scalability](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [What kind of Layer 3s make sense?](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [Data Availability Or: How Rollups Learned To Stop Worrying And Love Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [The Practical Guide to Ethereum Rollups](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_

## Tutorials: Erstellen Sie skalierbare Ebene 2 auf Ethereum {#tutorials}

- [All you can cache](/developers/tutorials/all-you-can-cache/) _– Wie man einen Caching-Vertrag erstellt und verwendet, um Calldata-Kosten bei Rollups zu reduzieren._
- [Short ABIs for Calldata Optimization](/developers/tutorials/short-abi/) _– Wie man kürzere ABIs verwendet, um Calldata-Kosten für Ebene-2-Transaktionen zu reduzieren._