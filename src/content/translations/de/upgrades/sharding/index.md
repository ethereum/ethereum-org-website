---
title: Shard Chains
description: Erfahre mehr über Shard Chains – jene Aufteilung des Netzwerks, welche Ethereum mehr Kapazität für Transaktionen gibt und den Betrieb erleichtert.
lang: de
template: upgrade
image: ../../../../../assets/upgrades/newrings.png
summaryPoint1: Sharding ist ein mehrstufiges Upgrade, um Skalierbarkeit und Kapazitäten von Ethereum zu verbessern.
summaryPoint2: Shard Chains bieten zusätzliche kostengünstigere Speicherebenen für Anwendungen und Rollups zur Speicherung von Daten.
summaryPoint3: Sie ermöglichen Layer-2-Lösungen, niedrige Transaktionsgebühren anzubieten und gleichzeitig die Sicherheit von Ethereum zu nutzten.
summaryPoint4: Dieses Upgrade soll auf die Zusammenführung des Mainnets mit der Beacon Chain folgen.
---

<UpgradeStatus dateKey="page-upgrades-shards-date">
    Shard Chains sollen im Jahr 2023 verfügbar sein, abhängig davon, wie schnell die Arbeit nach <a href="/upgrades/merge/">der Zusammenführung</a> voranschreitet. Mit diesen Shards werden Kapazitäten für Ethereum für das Speichern und den Zugriff auf Daten geschaffen, für die Ausführung von Code werden sie allerdings nicht verwendet.
</UpgradeStatus>

## Was ist Sharding? {#what-is-sharding}

Sharding umfasst den Prozess, eine Datenbank horizontal aufzusplitten, um die Verarbeitungslast zu verteilen – ein gängiges Konzept in der Informatik. Im Kontext von Ethereum soll Sharding die Überlastung des Netzwerkes reduzieren und die Transaktionen pro Sekunde erhöhen, indem es neue Chains schafft, welche als "Shards" bezeichnet werden.

Dies ist aus anderen Gründen als Skalierbarkeit wichtig.

## Funktionen von Sharding {#features-of-sharding}

### Jeder kann einen Node betreiben {#everyone-can-run-a-node}

Sharding ermöglicht es, Skalierbarkeit auf dezentrale Art und Weise zu gewährleisten, statt Skalierbarkeit schlicht durch Vergrößerung der bestehenden Datenbank zu erlangen. Letzteres würde Ethereum weniger zugänglich für Netzwerk-Validatoren machen, da diese leistungsstarke und teure Computer erfordern. Mit Shard Chains müssen Validatoren nur Daten für jenen Shard speichern/ausführen, welchen sie überprüfen, und nicht für das gesamte Netzwerk (wie es aktuell der Fall ist). Dies beschleunigt den Prozess drastisch und reduziert die Hardwareanforderungen.

### Mehr Netzwerkbeteiligung {#more-network-participation}

Durch Sharding können Sie früher oder später Ethereum auf Ihrem eigenen Laptop oder Smartphone benutzen. Somit sollte es mehr Menschen möglich sein, am Netzwerk zu partizipieren oder [Clients](/developers/docs/nodes-and-clients/) in Ethereum mit Sharding zu betreiben. Dies wird die Netzwerksicherheit erhöhen. Denn je dezentralisierter das Netzwerk ist, desto geringer ist dessen Angriffsfläche.

Dank Sharding werden geringere Hardwareanforderungen es vereinfachen, [Clients](/developers/docs/nodes-and-clients/) selbst zu betreiben, ohne dabei auf zwischengeschaltete Dienste zurückgreifen zu müssen. Wenn möglich, kannst du damit sogar mehrere Clients betreiben. Damit stärkst du das Netzwerk, indem potentielle Fehlerquellen zusätzlich reduziert werden. [Einen Beacon Chain-Client ausführen](/upgrades/get-involved/)

<br />

<InfoBanner isWarning={true}>
  Zunächst müssen Sie einen Mainnet-Client gleichzeitig mit Ihrem Beacon Chain-Client ausführen. <a href="https://launchpad.ethereum.org" target="_blank">Das Launchpad</a> wird dich durch die Hardwareanforderungen und den Prozess begleiten. Alternativ können Sie auch eine <a href="/developers/docs/apis/backend/#available-libraries">Backend-API</a> verwenden.
</InfoBanner>

## Shard Chains – Version 1: Datenverfügbarkeit {#data-availability}

Wenn die ersten Shard Chains implementiert sein werden, werden diese zunächst einmal lediglich zusätzliche Daten an das Netzwerk liefern. Sie werden keine Transaktionen oder Smart Contracts verarbeiten. Aber dennoch werden sie unglaubliche Verbesserungen für die Transaktionen pro Sekunde bringen, wenn sie mit Rollups kombiniert werden.

Rollups sind eine "Layer 2"-Technologie, die heute bereits existiert. Sie erlauben DApps, Transaktionen zu bündeln oder sie mittels "Roll up" in eine einzelne Transaktions-Off-Chain zu vereinen, einen kryptographischen Beweis zu erstellen und diesen dann zur Chain zu senden. Dies reduziert die Datenmenge, die für eine Transaktion benötigt wird. Kombiniert mit der zusäzlichen Datenverfügbarkeit durch die Shards erhält man 100.000 Transaktionen pro Sekunde.

<InfoBanner isWarning={false}>
  Angesichts der jüngsten Fortschritte bei der Erforschung und Entwicklung von Layer-2-Skalierungslösungen hat dies dazu geführt, dass das Merge-Upgrade vor den Shard Chains Priorität hat. Diese werden nach dem Übergang vom Mainnet zum Proof of Stake im Mittelpunkt stehen.

[Mehr zu Rollups](/developers/docs/scaling/#rollups)
</InfoBanner>

## Shard Chains – Version 2: Codeausführung {#code-execution}

Der Plan war immer den shards extra Funktionalität zu verleihen, um sie ähnlich zu dem heutigen [Ethereum Mainnet](/glossary/#mainnet) zu gestalten. Das würde den Shards erlauben, Code zu speichern und auszuführen und auch Transaktionen zu bearbeiten, da jede Shard ihre eigenen Smart Contracts und Kontostände beinhalten würde. Shard-übergreifende Kommunikation würde Transaktionen zwischen Shards ermöglichen.

Aber ist das in Anbetracht des Anstiegs der Transaktionen pro Sekunde, den Shards der Version 1 bieten, überhaupt noch notwendig? Diese Fragestellung in der Community nach wie vor diskutiert und es scheint, als gäbe es verschiedene Optionen.

### Benötigen Shards Codeausführung? {#do-shards-need-code-execution}

Vitalik Buterin hat im Gespräch mit dem Bankless-Podcast drei mögliche Optionen vorgestellt, die diskutiert werden sollten.

<YouTube id="-R0j5AMUSzA" start="5841" />

#### 1. Statusausführung nicht notwendig {#state-execution-not-needed}

Das würde bedeuten, dass wir Shards nicht die Fähigkeit geben, Smart Contracts zu verwalten, und sie als Datenlager belassen.

#### 2. Shards zur Ausführung {#some-execution-shards}

Vielleicht gibt es einen Kompromiss, für den nicht alle Shards erforderlich sind (64 sind aktuell geplant), um intelligenter zu sein. Wir könnten diese Funktionalität einfach zu einigen wenigen hinzufügen und den Rest belssen. So könnte die Bereitstellung beschleunigt werden.

#### 3. Warten auf Zero Knowledge (ZK) Snarks {#wait-for-zk-snarks}

Abschließend sollte diese Debatte vielleicht nochmals aufgegriffen werden, wenn die ZK Snarks gefestigt sind. Diese Technologie könnte helfen, wirklich private Transaktionen ins Netzwerk einzubringen. Wahrscheinlich werden dafür weiter entwickelte und intelligentere Shards erforderlich sein, doch diese befinden sich noch in der Entwicklung.

#### Andere Quellen {#other-sources}

Im Folgenden werden weitere Ausführungen zu diesen Ansätzen vorgestellt:

- [Phase One and Done: Eth2 als Datenverfügbarkeitsmaschine](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8) – _cdetrio, ethresear.ch_

Das ist ein Punkt, der nach wie vor diskutiert wird. Wir werden diese Seite aktualisieren, sobald wir mehr wissen.

## Beziehung zwischen Updgrades {#relationship-between-upgrades}

Die Ethereum-Upgrades sind alle in gewisser Weise miteinander verbunden. Im Folgenden werfen wir einen kurzen Blick darauf, wie Shard Chains zu anderen Upgrades in Beziehung stehen.

### Shards und die Beacon Chain {#shards-and-beacon-chain}

Die Beacon Chain enthält die gesamte Logik für die Sicherheit und Synchronisierung der Shards. Die Beacon Chain koordiniert die Staker im Netzwerk und weist ihnen die Shards zu, an denen sie arbeiten müssen. Zudem stellt sie die Kommunikation zwischen den einzelnen Shards sicher. Dafür empfängt und speichert sie Transaktionsdaten einzelner Shards, auf die andere Shards wiederum zugreifen können. Jeder Shard hat dadurch Zugriff auf den Status von Ethereum und kann diesen laufend aktualisieren.

<ButtonLink to="/upgrades/beacon-chain/">
  Die Beacon Chain
</ButtonLink>

### Shards und die Zusammenführung {#shards-and-docking}

Wenn zusätzliche Shards hinzugefügt werden, erfolgt die Sicherung des Ethereum-Mainnets bereits durch die Beacon Chain mit Proof-of-Stake. Das ist die Grundlage für ein produktives Mainnet, auf dem Shard Chains aufgebaut werden können, angetrieben von Layer-2-Lösungen, die die Skalierbarkeit erhöhen.

Es bleibt abzuwarten, ob das Mainnet als einziger „intelligenter“ Shard existieren wird, der die Ausführung von Code ermöglicht – in jedem Fall aber kann die Entscheidung, die Shards zu erweitern, bei Bedarf überarbeitet werden.

<ButtonLink to="/upgrades/merge/">
  Die Zusammenführung
</ButtonLink>

<Divider />

### Weiterlesen {#read-more}

<ShardChainsList />
