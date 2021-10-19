---
title: Shard Chains
description: Lerne mehr über Shard Chains – Aufteilung des Netzwerks um Ethereum mehr Kapazität für Transaktionen zu verleihen und es leichter zum Laufen zu bringen.
lang: de
template: eth2
sidebar: true
image: ../../../../../assets/eth2/newrings.png
summaryPoints:
  [
    "Sharding ist ein mehrphasiges Update um Ethereums Skalierbarkeit und Kapazität zu erhöhen.",
    "Shard Chains verteilen die Last des Netzwerks auf 64 neue Chains.",
    "Sie machen es einfacher, eine Node zu betreiben, indem sie die Anforderungen an die Hardware niedrig halten.",
    "Die technische Roadmap beinhaltet die Arbeit an Shard Chains in Phase 1 und möglicherweise Phase 2.",
  ]
---

<UpgradeStatus date="~2022">
    Shard Chains sollten irgendwann in 2022 implementiert werden – in Abhängigkeit davon, wie schnell die Arbeit voranschreitet, nachdem <a href="/eth2/beacon-chain/"> die Beacon Chain </a> eingeführt wurde. Diese Shards werden Ethereum mehr Kapazität für das Speichern und den Zugriff auf Daten geben, aber sie werden nicht für die Ausführung von Codes verwendet. Die Details hierfür werden noch ausgearbeitet.
</UpgradeStatus>

## Was ist Sharding? {#what-is-sharding}

Sharding umfasst den Prozess, eine Datenbank horizontal aufzusplitten, um die Verarbeitungslast zu verteilen – ein gängiges Konzept in der Informatik. Im Kontext von Ethereum soll Sharding die Überlastung des Netzwerkes reduzieren und die Transaktionen pro Sekunde erhöhen, indem es neue Chains schafft, welche als "Shards" bezeichnet werden.

Dies ist aus anderen Gründen als Skalierbarkeit wichtig.

## Funktionen von Sharding {#features-of-sharding}

### Jeder kann eine Node betreiben {#everyone-can-run-a-node}

Sharding ermöglicht es, Skalierbarkeit auf dezentrale Art und Weise zu gewährleisten, statt Skalierbarkeit schlicht durch Vergrößerung der bestehenden Datenbank zu erlangen. Letzteres würde Ethereum weniger zugänglich für Netzwerk-Validatoren machen, da diese leistungsstarke und teure Computer erfordern. Mit Shard Chains müssen Validatoren nur Daten für jenen Shard speichern/ausführen, welchen sie überprüfen, und nicht für das gesamte Netzwerk (wie es aktuell der Fall ist). Dies beschleunigt den Prozess drastisch und reduziert die Hardwareanforderungen.

### Mehr Netzwerkbeteiligung {#more-network-participation}

Durch Sharding kannst du früher oder später Ethereum auf deinem eigenen Laptop oder Smartphone benutzen. Somit sollte es mehr Menschen möglich sein, am Netzwerk zu partizipieren oder [Clients](/developers/docs/nodes-and-clients/) in Ethereum mit Sharding zu betreiben. Dies wird die Netzwerksicherheit erhöhen. Denn je dezentralisierter das Netzwerk ist, desto geringer ist dessen Angriffsfläche.

Dank Sharding werden geringere Hardwareanforderungen es vereinfachen, [Clients](/developers/docs/nodes-and-clients/) selbst zu betreiben, ohne dabei auf zwischengeschaltete Dienste zurückgreifen zu müssen. Wenn möglich, kannst du damit sogar mehrere Clients betreiben. Damit stärkst du das Netzwerk, indem potentielle Fehlerquellen zusätzlich reduziert werden. [Einen Eth2-Client betreiben](/eth2/get-involved/).

<br />

<InfoBanner isWarning={true}>
  Zunächst benötigst du neben deinem Eth2-Client auch einen Mainnet-Client. <a href="https://launchpad.ethereum.org" target="_blank">Das Launchpad</a> wird dich durch die Hardwareanforderungen und den Prozess begleiten. Alternativ kannst du einen <a href="/en/developers/docs/apis/backend/#available-libraries">Backend-API</a> verwenden.
</InfoBanner>

## Shard Chains Version 1: Datenverfügbarkeit {#data-availability}

Wenn die ersten Shard Chains implementiert sein werden, werden diese zunächst einmal lediglich zusätzliche Daten an das Netzwerk liefern. Sie werden keine Transaktionen oder Smart Contracts verarbeiten. Aber dennoch werden sie unglaubliche Verbesserungen für die Transaktionen pro Sekunde bringen, wenn sie mit Rollups kombiniert werden.

Rollups sind eine "Layer 2"-Technologie, die heute bereits existiert. Sie erlauben dApps, Transaktionen zu bündeln oder sie mittels "Roll up" in eine einzelne Transaktions-Off-Chain zu vereinen, einen kryptographischen Beweis zu erstellen und diesen dann zur Chain zu senden. Dies reduziert die Datenmenge, die für eine Transaktion benötigt wird. Kombiniert mit der zusäzlichen Datenverfügbarkeit durch die Shards erhält man 100.000 Transaktionen pro Sekunde.

[Mehr zu Rollups](/developers/docs/scaling/layer-2-rollups/)

## Shard Chains Version 2: Codeausführung {#code-execution}

Der Plan war es immer, den Shards eine extra Funktionalität hinzuzufügen, um sie ähnlich dem heutigen [Ethereum-Mainnet](/glossary/#mainnet) zu gestalten. Dies ermöglicht ihnen, Smart Contracts zu speichern und auszuführen und Konten zu verwalten. Aber ist das in Anbetracht des Anstiegs der Transaktionen pro Sekunde, den Shards der Version 1 bieten, überhaupt noch nötig? Dies wird in der Community nach wie vor diskutiert und es scheint, als gäbe es verschiedene Optionen.

### Benötigen Shards Codeausführung? {#do-shards-need-code-execution}

Vitalik Buterin hat im Gespräch mit dem Bankless-Podcast 3 mögliche Optionen vorgestellt, die diskutiert werden sollten.

<iframe width="100%" height="315" src="https://www.youtube.com/embed/-R0j5AMUSzA?start=5841" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

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

Die Eth2-Upgrades stehen alle miteinander in Verbindung. Im Folgenden wollen wir einen kurzen Blick darauf werfen, wie Shard Chains zu anderen Upgrades in Beziehung stehen.

### Shards und die Beacon Chain {#shards-and-beacon-chain}

Die Beacon Chain enthält die komplette Logik, um Shards sicher und synchron zu halten. Die Beacon Chain wird die Staker im Netzwerk koordinieren und sie den Shards zuweisen, an denen sie arbeiten müssen. Sie wird außerdem die Kommunikation zwischen den einzelnen Shards sicherstellen, indem sie Transaktionsdaten einzelner Shards empfängt und abspeichert, auf die andere Shards wiederum zugreifen können. Jeder Shard hat dadurch Zugriff auf den Status von Ethereum und kann diesen laufend aktualisieren.

<ButtonLink to="/eth2/beacon-chain/">Die Beacon Chain</ButtonLink>

### Shards und das Andocken {#shards-and-docking}

Auch nach der Einführung von Shards wird das heutige Ethereum-Mainnet weiterhin existieren. An einem gewissen Punkt wird das Mainnet allerdings ein Shard werden müssen, damit der Übergang von Proof-of-Work zu Proof-of-Stake – und damit zum Staking – möglich wird. Es muss sich noch herausstellen, ob das Mainnet der einzige sogenannte "smarte" Shard sein wird, der Code ausführen kann. So oder so wird eine Entscheidung darüber in Phase 2 des Sharding fallen.

<ButtonLink to="/eth2/merge/">Das Andocken</ButtonLink>

<Divider />

### Weiterlesen {#read-more}

<Eth2ShardChainsList />
