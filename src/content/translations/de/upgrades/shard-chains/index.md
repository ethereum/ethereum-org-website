---
title: Shard Chains
description: Lerne mehr über Shard Chains – Aufteilung des Netzwerks um Ethereum mehr Kapazität für Transaktionen zu verleihen und es leichter zum Laufen zu bringen.
lang: de
template: upgrade
sidebar: true
image: ../../../../../assets/upgrades/newrings.png
summaryPoint1: Sharding ist ein mehrstufiges Upgrade zur Verbesserung der Skalierbarkeit und Kapazität von Ethereum.
summaryPoint2: Shard Chains verteilen die Last des Netzes auf 64 neue Ketten.
summaryPoint3: Sie erleichtern den Betrieb einer Node, indem sie die Hardwareanforderungen niedrig halten.
summaryPoint4: Dieses Upgrade ist nach der Verkupplung des Mainnet mit der Beacon Chain geplant.
---

<UpgradeStatus dateKey="page-upgrades-shards-date">
    Shard Chains sollten irgendwann im Jahr 2023 erscheinen, je nachdem, wie schnell die Arbeit nach <a href="/upgrades/merge/">der Verkupplung</a> voranschreitet. Diese Shards werden Ethereum mehr Kapazität für das Speichern und den Zugriff auf Daten geben, aber sie werden nicht für die Ausführung von Codes verwendet. Die Details hierfür werden noch ausgearbeitet.
</UpgradeStatus>

## Was ist Sharding? {#what-is-sharding}

Sharding umfasst den Prozess, eine Datenbank horizontal aufzusplitten, um die Verarbeitungslast zu verteilen – ein gängiges Konzept in der Informatik. Im Kontext von Ethereum soll Sharding die Überlastung des Netzwerkes reduzieren und die Transaktionen pro Sekunde erhöhen, indem es neue Chains schafft, welche als "Shards" bezeichnet werden.

Dies ist aus anderen Gründen als Skalierbarkeit wichtig.

## Funktionen von Sharding {#features-of-sharding}

### Jeder kann eine Node betreiben {#everyone-can-run-a-node}

Sharding ermöglicht es, Skalierbarkeit auf dezentrale Art und Weise zu gewährleisten, statt Skalierbarkeit schlicht durch Vergrößerung der bestehenden Datenbank zu erlangen. Letzteres würde Ethereum weniger zugänglich für Netzwerk-Validatoren machen, da diese leistungsstarke und teure Computer erfordern. Mit Shard Chains müssen Validatoren nur Daten für jenen Shard speichern/ausführen, welchen sie überprüfen, und nicht für das gesamte Netzwerk (wie es aktuell der Fall ist). Dies beschleunigt den Prozess drastisch und reduziert die Hardwareanforderungen.

### Mehr Netzwerkbeteiligung {#more-network-participation}

Durch Sharding kannst du früher oder später Ethereum auf deinem eigenen Laptop oder Smartphone benutzen. Somit sollte es mehr Menschen möglich sein, am Netzwerk zu partizipieren oder [Clients](/developers/docs/nodes-and-clients/) in Ethereum mit Sharding zu betreiben. Dies wird die Netzwerksicherheit erhöhen. Denn je dezentralisierter das Netzwerk ist, desto geringer ist dessen Angriffsfläche.

Dank Sharding werden geringere Hardwareanforderungen es vereinfachen, [Clients](/developers/docs/nodes-and-clients/) selbst zu betreiben, ohne dabei auf zwischengeschaltete Dienste zurückgreifen zu müssen. Wenn möglich, kannst du damit sogar mehrere Clients betreiben. Damit stärkst du das Netzwerk, indem potentielle Fehlerquellen zusätzlich reduziert werden. [Einen Eth2-Client betreiben](/upgrades/get-involved/).

<br />

<InfoBanner isWarning={true}>
  Zunächst benötigst du neben deinem Eth2-Client auch einen Mainnet-Client. <a href="https://launchpad.ethereum.org" target="_blank">Das Launchpad</a> wird dich durch die Hardwareanforderungen und den Prozess begleiten. Alternativ kannst du einen <a href="/developers/docs/apis/backend/#available-libraries">Backend-API</a> verwenden.
</InfoBanner>

## Shard Chains Version 1: Datenverfügbarkeit {#data-availability}

Wenn die ersten Shard Chains implementiert sein werden, werden diese zunächst einmal lediglich zusätzliche Daten an das Netzwerk liefern. Sie werden keine Transaktionen oder Smart Contracts verarbeiten. Aber dennoch werden sie unglaubliche Verbesserungen für die Transaktionen pro Sekunde bringen, wenn sie mit Rollups kombiniert werden.

Rollups sind eine "Layer 2"-Technologie, die heute bereits existiert. Sie erlauben dApps, Transaktionen zu bündeln oder sie mittels "Roll up" in eine einzelne Transaktions-Off-Chain zu vereinen, einen kryptographischen Beweis zu erstellen und diesen dann zur Chain zu senden. Dies reduziert die Datenmenge, die für eine Transaktion benötigt wird. Kombiniert mit der zusäzlichen Datenverfügbarkeit durch die Shards erhält man 100.000 Transaktionen pro Sekunde.

<InfoBanner isWarning={false}>
  Angesichts der jüngsten Fortschritte bei der Erforschung und Entwicklung von Layer-2-Skalierungslösungen hat dies dazu geführt, dass das Merge-Upgrade vor den Shard Chains Priorität hat. Diese werden nach dem Übergang vom Mainnet zum Proof of Stake im Mittelpunkt stehen.

[Mehr über Rollups](/developers/docs/scaling/layer-2-rollups/)
</InfoBanner>

## Shard Chains Version 2: Codeausführung {#code-execution}

Der Plan war immer den shards extra Funktionalität zu verleihen, um sie ähnlich zu dem heutigen [Ethereum Mainnet](/glossary/#mainnet) zu gestalten. Dies ermöglicht ihnen, Smart Contracts zu speichern, auszuführen und Konten zu verwalten. Aber ist das in Anbetracht des Anstiegs der Transaktionen pro Sekunde, den Shards der Version 1 bieten, überhaupt noch nötig? Dies wird in der Community nach wie vor diskutiert und es scheint, als gäbe es verschiedene Optionen.

### Benötigen Shards Codeausführung? {#do-shards-need-code-execution}

Vitalik Buterin hat im Gespräch mit dem Bankless-Podcast 3 mögliche Optionen vorgestellt, die diskutiert werden sollten.

<YouTube id="-R0j5AMUSzA" start="5841" />

#### 1. Statusausführung nicht notwendig {#state-execution-not-needed}

Dies würde bedeuten, dass wir Shards nicht die Fähigkeit geben, Smart Contracts zu verwalten, und diese als Datenlager belassen.

#### 2. Shards zur Ausführung {#some-execution-shards}

Vielleicht gibt es einen Kompromiss, in dem wir nicht alle Shards benötigen (64 sind aktuell geplant), um intelligenter zu sein. Wir könnten diese Funktionalität einfach zu einigen wenigen hinzufügen und den Rest belassen. Dies könnte die Bereitstellung beschleunigen.

#### 3. Warten auf Zero Knowledge (ZK) Snarks {#wait-for-zk-snarks}

Abschließend sollten wir die Debatte vielleicht noch einmal aufgreifen, wenn die ZK Snarks gefestigt sind. Diese Technologie könnte helfen, wirklich private Transaktionen ins Netzwerk einzubringen. Wahrscheinlich werden diese weiter entwickelte und intelligentere Shards benötigen, jedoch befinden sie sich noch immer in der Entwicklung.

#### Andere Quellen {#other-sources}

Hier sind weitere Gedanken zu den selben Ansätzen:

- [Phase One and Done: Eth2 als Datenverfügbarkeitsmaschine](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8) – _cdetrio, ethresear.ch_

Dies ist immer noch ein aktiver Diskussionspunkt. Wir werden diese Seite updaten, sobald wir mehr wissen.

## Beziehung zwischen Updgrades {#relationship-between-upgrades}

Die Eth2-Upgrades sind alle miteinander verknüpft. Im Folgenden wollen wir einen kurzen Blick darauf werfen, wie Shard Chains zu anderen Upgrades in Beziehung stehen.

### Shards und die Beacon Chain {#shards-and-beacon-chain}

Die Beacon Chain enthält die gesamte Logik für die Sicherheit und Synchronisierung der Shards. Die Beacon Chain koordiniert die Staker im Netzwerk und weist ihnen die Shards zu, an denen sie arbeiten müssen. Sie wird außerdem die Kommunikation zwischen den einzelnen Shards sicherstellen, indem sie Transaktionsdaten einzelner Shards empfängt und abspeichert, auf die andere Shards wiederum zugreifen können. Jeder Shard hat dadurch Zugriff auf den Status von Ethereum und kann diesen laufend aktualisieren.

<ButtonLink to="/upgrades/beacon-chain/">Die Beacon Chain</ButtonLink>

### Shards und die Verkupplung {#shards-and-docking}

Wenn weitere Shards hinzugefügt werden, wird das Ethereum Mainnet bereits durch die Beacon Chain mit Proof of Stake gesichert sein. Dies ermöglicht ein produktives Mainnet, auf dem Shard Chains aufgebaut werden können, angetrieben von Layer-2-Lösungen, die die Skalierbarkeit erhöhen.

Es bleibt abzuwarten, ob das Mainnet als einziger "intelligenter" Shard existieren wird, der die Ausführung von Code ermöglicht - in jedem Fall aber kann die Entscheidung, die Shards zu erweitern, bei Bedarf revidiert werden.

<ButtonLink to="/upgrades/merge/">Die Verkupplung</ButtonLink>

<Divider />

### Weiterlesen {#read-more}

<ShardChainsList />
