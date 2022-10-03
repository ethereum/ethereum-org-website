---
title: Nodes und Clients
description: Eine Übersicht über Ethereum-Nodes und Client-Software, wie eine Node eingerichtet wird und warum du dies tun solltest.
lang: de
sidebarDepth: 2
---

Ethereum ist ein verteiltes Netzwerk von Computern, auf denen Software (sogenannte Nodes) läuft, die Blöcke und Transaktionsdaten verifizieren kann. Du benötigst eine Anwendung, bekannt als Client, auf deinem Gerät, um einen Node zu "betreiben".

## Voraussetzungen {#prerequisites}

Du solltest das Konzept eines Peer-to-Peer-Netzwerks und die [Grundlagen der EVM](/developers/docs/evm/) verstehen, bevor du tiefer eintauchst und deine eigene Instanz eines Ethereum-Clients startest. Lies unsere [Einführung in Ethereum](/developers/docs/intro-to-ethereum/).

Wenn dir das Thema Nodes neu ist, empfehlen wir dir, zunächst unsere benutzerfreundliche Einführung zum [Betreiben eines Ethereum-Nodes](/run-a-node) zu lesen.

## Was sind Nodes und Clients? {#what-are-nodes-and-clients}

"Node" bezieht sich auf eine laufende Client-Software. Ein Client ist eine Implementierung von Ethereum, die alle Transaktionen in jedem Block prüft und das Netzwerk somit sicher und die Daten genau hält.

Du kannst eine Echtzeitansicht des Ethereum-Netzwerks sehen, indem du dir diese [Karte der Nodes](https://etherscan.io/nodetracker) ansiehst.

Es gibt viele [Ethereum-Clients](/developers/docs/nodes-and-clients/#execution-clients) in einer Vielzahl von Programmiersprachen wie Go, Rust, JavaScript, Typescript, Python, C# .NET, Nim und Java. Was diese Implementierungen gemeinsam haben, ist dass sie alle einer formalen Spezifikation folgen (ursprünglich das [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf)). Diese Spezifikation bestimmt, wie das Ethereum-Netzwerk und die Blockchain funktionieren.

![Ausführungs-Client](./client-diagram.png) Vereinfachtes Diagramm dessen, was einen Ethereum-Client ausmacht.

## Node-Typen {#node-types}

Wenn du [einen eigenen Node](/developers/docs/nodes-and-clients/run-a-node/) betreiben willst, solltest du verstehen, dass es verschiedene Arten von Nodes gibt, die Daten unterschiedlich konsumieren. In der Tat können Clients 3 verschiedene Arten von Nodes betreiben: Light, Full und Archive. Es gibt auch Optionen für verschiedene Synchronisierungsstrategien, die eine schnellere Synchronisationszeit ermöglichen. Die Synchronisierung bezieht sich darauf, wie schnell sie die aktuellsten Informationen über Ethereums Zustand erhalten kann.

### Full-Node {#full-node}

- Speichert die kompletten Blockchain-Daten.
- Beteiligt sich an der Blockprüfung, überprüft alle Blöcke und Zustände.
- Alle Zustände können von einem Full-Node abgeleitet werden.
- Bedient das Netzwerk und liefert Daten auf Anfrage.

### Light-Node {#light-node}

- Speichert nur die Header-Kette und fordert alles andere an.
- Kann die Gültigkeit der Daten gegen die Zustandswurzeln in den Block-Headern überprüfen.
- Nützlich für Geräte mit geringer Kapazität, wie Embedded-Geräte oder Mobiltelefone, die es sich nicht leisten können, Gigabyte an Blockchain-Daten zu speichern.

### Archive-Node {#archive-node}

- Speichert alles wie im Full-Node und baut zusätzlich ein Archiv von historischen Zuständen auf. Wird benötigt, wenn du z. B. einen Kontostand bei Block #4.000.000 abfragen oder einfach und zuverlässig [deine eigenen Transaktionen testen willst, ohne sie mit OpenEthereum](https://openethereum.github.io/JSONRPC-trace-module#trace_callmany) zu minen.
- Diese Daten stellen Einheiten von Terabytes dar, was Archive-Nodes für durchschnittliche Benutzer weniger attraktiv macht, aber für Dienste wie Blockexplorer, Wallet-Hersteller und die Blockchainanalyse nützlich sein kann.

Das Synchronisieren von Clients in jedem anderen Modus als dem Archiv führt zu reduzierten (pruned) Blockchain-Daten. Das bedeutet, es gibt kein Archiv mit allen historischen Zuständen, aber der vollständige Node ist in der Lage, diese bei Bedarf zu erstellen.

## Warum sollte ich einen Ethereum-Node betreiben? {#why-should-i-run-an-ethereum-node}

Durch das Ausführen eines Nodes kannst du Ethereum vertraulich und privat nutzen, während das Ökosystem unterstützt wird.

### Vorteile für dich {#benefits-to-you}

Wenn du deinen eigenen Node betreibst, kannst du Ethereum auf eine wirklich private, autarke und vertrauenslose Weise verwenden. Du musst dem Netzwerk nicht vertrauen, weil du die Daten mit deinem Client selbst überprüfen kannst. "Nicht vertrauen, überprüfen" ist ein beliebtes Mantra der Blockchain.

- Dein Node überprüft alle Transaktionen und Blöcke selbstständig gegen Konsensregeln. Das bedeutet, du musst dich nicht auf andere Nodes im Netzwerk verlassen oder ihnen vollständig vertrauen.
- Du musst deine Adressen und Salden nicht an zufälligen Nodes veröffentlichen. Alles kann mit deinem eigenen Client überprüft werden.
- Deine dApp kann sicherer und privater sein, wenn du einen eigenen Node verwendest. [MetaMask](https://metamask.io), [MyEtherWallet](https://myetherwallet.com) und einige andere Wallets können einfach mit deinem eigenen lokalen Node verknüpft werden.
- Du kannst deine eigenen RPC-Endpunkte programmieren.
- Du kannst dich mit deinem Node über **Interprozesskommunikation (IPC)** verbinden oder den Node umschreiben, um dein Programm als Plugin zu laden. Das garantiert eine niedrige Latenzzeit, die erforderlich ist, um deine Transaktionen so schnell wie möglich zu ersetzen (d. h. Frontrunning).

![Wie du auf Ethereum über deine Anwendung und Nodes zugreifst](./nodes.png)

### Netzwerkvorteile {#network-benefits}

Eine Vielzahl von Nodes ist wichtig für Ethereums Gesundheit, Sicherheit und operative Belastbarkeit.

- Sie bieten Light-Clients Zugriff auf Blockchain-Daten, die davon abhängen. Bei hohen Nutzungspitzen muss es genug vollständige Knoten geben, um die Synchronisation von Light-Nodes zu unterstützen. Light-Nodes speichern nicht die gesamte Blockchain, sondern verifizieren die Daten über die [Zustandswurzel in Block-Headern](/developers/docs/blocks/#block-anatomy). Sie können bei Bedarf weitere Informationen von Blöcken anfragen.
- Full-Nodes erzwingen die Konsensregeln für den Proof-of-Work, so dass sie nicht dazu gebracht werden können, Blöcke zu akzeptieren, die den Regeln nicht folgen. Dies bietet zusätzliche Sicherheit im Netzwerk, denn wenn alle Nodes Light-Nodes wären, die keine vollständige Verifizierung durchführen, könnten Miner das Netzwerk angreifen und zum Beispiel Blöcke mit höheren Belohnungen erstellen.

Wenn du einen Full-Node betreibst, profitiert das gesamte Ethereum Netzwerk.

## Betreiben eines eigenen Nodes {#running-your-own-node}

Hast du Interesse, deinen eigenen Ethereum-Client zu betreiben?

Eine anfängerfreundliche Einführung findest du auf unserer [Node-Seite](/run-a-node).

Wenn du eher ein technischer Benutzer bist, kannst du [einen eigenen Node](/developers/docs/nodes-and-clients/run-a-node/) mit der Kommandozeile aufbauen.

### Projekte {#projects}

[**Wähle einen Client aus und folge den Anweisungen.**](#clients)

**Ethnode -** **_Betreibe einen Ethereum-Node (Geth oder OpenEthereum) für lokale Entwicklung._**

- [GitHub](https://github.com/vrde/ethnode)

**dAppNode -** **_Eine Betriebssystem-GUI für den Betrieb von Web3-Nodes, einschließlich Ethereum und der Beacon Chain, auf einer eigenen Maschine._**

- [dappnode.io](https://dappnode.io)

### Ressourcen {#resources}

- [Running Ethereum Full Nodes: A Complete Guide](https://medium.com/coinmonks/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _Nov 7, 2019 - Justin Leroux_
- [Node Configuration Cheat Sheet](https://dev.to/5chdn/ethereum-node-configuration-modes-cheat-sheet-25l8) _Jan 5, 2019 - Afri Schoedon_
- [How To Install & Run a Geth Node](https://www.quiknode.io/guides/infrastructure/how-to-install-and-run-a-geth-node) _Oct 4, 2020 - Sahil Sen_
- [How To Install & Run a OpenEthereum (fka. Parity) Node](https://www.quiknode.io/guides/infrastructure/how-to-run-a-openethereum-ex-parity-client-node) _Sept 22, 2020 - Sahil Sen_

## Alternativen {#alternatives}

Der Betrieb eines eigenen Nodes kann schwierig sein und du musst nicht immer eine eigene Instanz betreiben. In diesem Fall kannst du einen Drittanbieter wie [Infura](https://infura.io), [Alchemy](https://alchemyapi.io) oder [QuikNode](https://www.quiknode.io) verwenden. Alternativ dazu ist [ArchiveNode](https://archivenode.io/) ein von der Community finanzierter Archivknoten, der unabhängigen Entwicklern, die sich dies sonst nicht leisten könnten, Archivdaten auf der Ethereum-Blockchain zur Verfügung stellen soll. Einen Überblick über die Verwendung dieser Dienste findest du unter [Nodes als Dienst](/developers/docs/nodes-and-clients/nodes-as-a-service/).

Wenn jemand in deiner Community einen Ethereum-Node mit einer öffentlichen API betreibt, kannst du deine Light Wallets (wie MetaMask) auf einen Community-Node [via Custom RPC](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node) verweisen lassen und so mehr Privatsphäre erreichen als mit einer zufälligen vertrauenswürdigen Drittpartei.

Wenn du andererseits einen Client betreibst, kannst du ihn mit deinen Freunden teilen, die ihn vielleicht brauchen.

## Ausführungs-Clients (früher "Eth1-Clients") {#execution-clients}

Die Ethereum-Community unterhält mehrere quelloffene Ausführungs-Clients (früher als "Eth1-Clients" oder einfach "Ethereum-Clients" bezeichnet), die von verschiedenen Teams in unterschiedlichen Programmiersprachen entwickelt wurden. Dies macht das Netzwerk stärker und vielfältiger. Das ideale Ziel ist es, Vielfalt zu erreichen, ohne dass ein Client dominiert, um jede Art von Single Point of Failure zu reduzieren.

Diese Tabelle gibt einen Überblick über die verschiedenen Clients. Sie alle bestehen [Client-Tests](https://github.com/ethereum/tests) und werden aktiv gewartet, um mit Netzwerk-Upgrades auf dem neuesten Stand zu bleiben.

| Client                                                                  | Sprache  | Betriebssystem        | Netzwerke                                    | Sync-Strategien     | Zustandsreduzierung |
| ----------------------------------------------------------------------- | -------- | --------------------- | -------------------------------------------- | ------------------- | ------------------- |
| [Geth](https://geth.ethereum.org/)                                      | Go       | Linux, Windows, MacOS | Mainnet, Görli, Rinkeby, Ropsten             | Snap, Full          | Archive, Pruned     |
| [Nethermind](http://nethermind.io/)                                     | C#, .NET | Linux, Windows, MacOS | Mainnet, Görli, Ropsten, Rinkeby und weitere | Fast, Beam, Archive | Archive, Pruned     |
| [Besu](https://besu.hyperledger.org/en/stable/)                         | Java     | Linux, Windows, MacOS | Mainnet, Rinkeby, Ropsten, Görli und weitere | Fast, Full          | Archive, Pruned     |
| [Erigon](https://github.com/ledgerwatch/erigon)                         | Go       | Linux, Windows, MacOS | Mainnet, Görli, Rinkeby, Ropsten             | Full                | Archive, Pruned     |
| [OpenEthereum (veraltet)](https://github.com/openethereum/openethereum) | Rust     | Linux, Windows, MacOS | Mainnet, Kovan, Ropsten und weitere          | Warp, Full          | Archive, Pruned     |

**Beachte, dass OpenEthereum [veraltet](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) ist und nicht mehr gewartet wird.** Verwende es mit Vorsicht und wechsle lieber zu einer anderen Client-Implementierung.

Weitere Informationen zu unterstützten Netzwerken findest du unter [Ethereum-Netzwerke](/developers/docs/networks/).

### Vorteile verschiedener Implementierungen {#advantages-of-different-implementations}

Jeder Client hat einzigartige Anwendungsfälle und Vorteile, daher solltest du einen auf deinen eigenen Präferenzen basierenden wählen. Die Client-Vielfalt ermöglicht die Fokussierung der Implementierungen auf verschiedene Funktionen und Benutzergruppen. Du kannst einen Client basierend auf Features, Support, Programmiersprache oder Lizenzen auswählen.

#### Go Ethereum {#geth}

Go Ethereum (kurz Geth) ist eine der ursprünglichen Implementierungen des Ethereum-Protokolls. Derzeit ist es der am weitesten verbreitete Client mit der größten Benutzerbasis und der größten Vielfalt an Tools für Benutzer und Entwickler. Es ist in Go geschrieben, vollständig Open Source und unter der GNU LGPL v3 lizenziert.

#### OpenEthereum {#openethereum}

OpenEthereum ist ein schneller, funktionsreicher und fortgeschrittener CLI-basierter Ethereum-Client. Es wurde entwickelt, um die notwendige Infrastruktur für schnelle und zuverlässige Dienste bereitzustellen, die eine schnelle Synchronisierung und maximale Laufzeit erfordern. Das Ziel von OpenEthereum ist es, der schnellste, leichteste und sicherste Ethereum-Client zu sein. Es bietet eine saubere, modulare Codebase für

- eine einfache Anpassung,
- eine leichte Integration in Dienstleistungen oder Produkte,
- einen minimalen Arbeitsspeicher und Speicherfußabdruck.

OpenEthereum wird unter Verwendung der neuesten Rust-Programmiersprache entwickelt und unter GPLv3 lizenziert.

**Beachte, dass OpenEthereum [veraltet](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) ist und nicht mehr gewartet wird.** Verwende es mit Vorsicht und wechsle lieber zu einer anderen Client-Implementierung.

#### Nethermind {#nethermind}

Nethermind ist eine Ethereum-Implementierung, die mit dem C# .NET Technologie-Stack erstellt wurde, der auf allen wichtigen Plattformen, einschließlich ARM, läuft. Es bietet eine großartige Leistung mit

- einer optimierten virtuellen Maschine,
- Zustandszugriff,
- Netzwerken und reichhaltigen Funktionen wie Prometheus/Grafana-Dashboards, Seq Enterprise Logging Support, JSON RPC Tracing und Analytics-Plugins.

Nethermind bietet auch eine [detaillierte Dokumentation](https://docs.nethermind.io), starke Entwicklerunterstützung, eine Online-Community und 24/7-Support für Premiumnutzer.

#### Besu {#besu}

Hyperledger Besu ist ein unternehmensorientierter Ethereum-Client für öffentliche und private Netzwerke. Er bietet alle Funktionen des Ethereum-Mainnets, von Tracing bis GraphQL, hat ein umfangreiches Monitoring und wird von ConsenSys unterstützt, sowohl in offenen Community-Kanälen als auch durch kommerzielle SLAs für Unternehmen. Er ist in Java geschrieben und ist durch Apache 2.0 lizenziert.

#### Erigon {#erigon}

Erigon, früher bekannt als Erigon, ist eine Abspaltung von Go Ethereum, die auf Geschwindigkeit und Speicherplatzeffizienz ausgerichtet ist. Erigon ist eine komplett neu entwickelte Implementierung von Ethereum, die derzeit in Go geschrieben ist, aber auch in anderen Sprachen implementiert werden soll. Das Ziel von Erigon ist es, eine schnellere, modularere und optimierte Implementierung von Ethereum anzubieten. Es kann eine vollständige Synchronisierung des Archiv-Nodes mit weniger als 2 Tb Speicherplatz in weniger als 3 Tagen durchführen

### Synchronisationsmodi {#sync-modes}

Um die aktuellen Daten im Netzwerk zu verfolgen und zu überprüfen, muss sich der Ethereum-Client mit dem neuesten Netzwerkstatus synchronisieren. Dazu werden Daten von Peers heruntergeladen, ihre Integrität kryptographisch verifiziert und eine lokale Blockchain-Datenbank aufgebaut.

Die Synchronisationsmodi stellen verschiedene Ansätze für diesen Prozess mit unterschiedlichen Kompromissen dar. Die Clients unterscheiden sich auch in der Implementierung von Synchronisationsalgorithmen. Beziehe dich immer auf die offizielle Dokumentation des von dir gewählten Clients, um Einzelheiten zur Implementierung zu erfahren.

#### Überblick über die Strategien {#overview-of-strategies}

Allgemeiner Überblick über die Synchronisierungsansätze, die in Mainnet-Ready-Clients verwendet werden:

##### Full sync {#full-sync}

Bei full sync werden alle Blöcke (einschließlich Headern, Transaktionen und Quittungen) heruntergeladen und der Zustand der Blockchain inkrementell generiert, indem jeder Block ab Genesis ausgeführt wird.

- Minimiert das Vertrauen und bietet höchste Sicherheit, indem jede Transaktion verifiziert wird.
- Bei einer steigenden Anzahl von Transaktionen kann es Tage bis Wochen dauern, alle Transaktionen zu bearbeiten.

##### Fast sync

Die schnelle Synchronisierung lädt alle Blöcke herunter (einschließlich Headern, Transaktionen und Quittungen), überprüft alle Header, lädt den Zustand herunter und vergleicht ihn mit den Headern.

- Verlässt sich auf die Sicherheit des Konsensmechanismus.
- Die Synchronisierung dauert nur ein paar Stunden.

##### Light sync

Der Light-Client-Modus lädt alle Block-Header und Blockdaten herunter und prüft einige zufällig. Synchronisiert nur die Spitze der Kette vom vertrauenswürdigen Kontrollpunkt.

- Ruft nur den neuesten Zustand ab und verlässt sich dabei auf das Vertrauen in die Entwickler und den Konsensmechanismus.
- Der Client ist in wenigen Minuten mit dem aktuellen Netzwerkstatus einsatzbereit.

[Mehr über Light-Clients](https://www.parity.io/blog/what-is-a-light-client/)

##### Snap sync

Eingeführt von Geth. Durch die Verwendung von dynamischen Snapshots, die von Peers bereitgestellt werden, werden alle Konto- und Speicherdaten abgerufen, ohne dass zwischengeschaltete Trie-Nodes heruntergeladen werden müssen, und der Merkle-Trie wird dann lokal rekonstruiert.

- Schnellste von Geth entwickelte Synchronisierungsstrategie, derzeit die Standardstrategie
- Spart eine Menge Festplattenkapazität und Netzwerkbandbreite, ohne die Sicherheit zu beeinträchtigen.

[Mehr über Snap](https://github.com/ethereum/devp2p/blob/master/caps/snap.md)

##### Warp-Sync

Implementiert durch OpenEthereum. Nodes generieren in regelmäßigen Abständen einen konsenskritischen Zustands-Snapshot, den jeder Peer über das Netzwerk abrufen kann, was eine schnelle Synchronisation von diesem Punkt aus ermöglicht.

- Der schnellste und auch standardmäßige Synchronisationsmodus von OpenEthereum basiert auf den statischen Snapshots, die von Peers generiert werden.
- Das ist eine ähnliche Strategie wie bei Snap-Sync, aber ohne bestimmte Sicherheitsvorteile.

[Mehr über Warp](https://openethereum.github.io/Beginner-Introduction#warping---no-warp)

##### Beam-Sync

Implementiert von Nethermind und Trinity. Beam-Sync funktioniert wie Fast-Sync, lädt aber auch die Daten herunter, die zum Ausführen der neusten Blocks benötigt wird. Dies ermöglicht dir, die Chain schon innerhalb der ersten paar Minuten nach dem Start abzufragen.

- Synchronisiert den Zustand zuerst und ermöglicht die Abfrage von RPC in wenigen Minuten.
- Noch in der Entwicklung und nicht vollständig zuverlässig. Die Hintergrundsynchronisierung ist verlangsamt und RPC-Antworten könnten fehlschlagen.

[Mehr zu Beam](https://medium.com/@jason.carver/intro-to-beam-sync-a0fd168be14a)

#### Setup im Client {#client-setup}

Clients bieten umfangreiche Konfigurationsmöglichkeiten für deine Bedürfnisse an. Wähle einfach einen aus, der am besten zu dir passt, basierend auf dem Niveau der Sicherheit, verfügbaren Daten und Kosten. Neben dem Synchronisations-Algorithmus kannst du auch verschiedene Arten von alten Daten automatisch reduzieren lassen (Pruning). Pruning ermöglicht das Löschen veralteter Daten (z. B. das Entfernen von Zustands-Trie-Nodes), die von den letzten Blocks unerreichbar sind.

Beachte die Dokumentation oder die Hilfeseite des Clients, um herauszufinden, welcher Synchronisationsmodus als Standard festgelegt ist. Du kannst beim Einrichten die standardmäßige Synchronisationsart bestimmen, in etwa so:

**Light-Sync in [GETH](https://geth.ethereum.org/) oder [ERIGON](https://github.com/ledgerwatch/erigon) einrichten**

`geth --syncmode "light"`

Für mehr Informationen, lies die Anleitung dazu, [wie man einen Geth-Light-Node ausführt](/developers/tutorials/run-light-node-geth/).

**Einrichtung von Full-Sync mit Archive in [Besu](https://besu.hyperledger.org/)**

`besu --sync-mode=FULL`

Genau wie jede andere Konfiguration kann es mit der Startup-Flag oder in der Konfigurationsdatei definiert werden. Ein weiteres Beispiel ist [Nethermind](https://docs.nethermind.io/nethermind/), welches dich dazu auffordert, während der ersten Initialisierung eine Konfiguration auszuwählen, und danach eine Konfigurationsdatei erstellt.

## Konsens-Clients (früher als Eth2-Clients bekannt) {#consensus-clients}

Es gibt mehrere Konsens-Clients (früher als Eth2-Clients bekannt), die dazu da sind, die [Konsens-Upgrades](/upgrades/beacon-chain/) zu unterstützen. Sie betreiben die Beacon Chain und werden den Ausführungen nach [The Merge](/upgrades/merge/) einen Proof-of-Stake-Konsensmechanismus zur Verfügung stellen.

[Konsens-Clients anschauen](/upgrades/get-involved/#clients)

| Client                                                      | Sprache    | Betriebssysteme       | Netzwerke                             |
| ----------------------------------------------------------- | ---------- | --------------------- | ------------------------------------- |
| [Teku](https://pegasys.tech/teku)                           | Java       | Linux, Windows, MacOS | Beacon Chain, Prater                  |
| [Nimbus](https://nimbus.team/)                              | Nim        | Linux, Windows, MacOS | Beacon Chain, Prater                  |
| [Lighthouse](https://lighthouse-book.sigmaprime.io/)        | Rust       | Linux, Windows, MacOS | Beacon Chain, Prater, Pyrmont         |
| [Lodestar](https://lodestar.chainsafe.io/)                  | TypeScript | Linux, Windows, MacOS | Beacon Chain, Prater                  |
| [Prysm](https://docs.prylabs.network/docs/getting-started/) | Los        | Linux, Windows, MacOS | Beacon Chain, Gnosis, Prater, Pyrmont |

## Hardware {#hardware}

Die Hardwareanforderungen sind je nach Client unterschiedlich, aber im Allgemeinen nicht besonders hoch, da der Node nur synchronisiert bleiben muss. Verwechsle es nicht mit dem Mining, das viel mehr Rechenleistung erfordert. Die Synchronisation von Zeit und Leistung verbessert sich jedoch mit leistungsstärkerer Hardware. Je nach Bedarf und Wunsch kann Ethereum auf deinem Computer, Home-Server, Single-Board-Computer oder virtuellen privaten Servern in der Cloud ausgeführt werden.

Eine einfache Möglichkeit, deinen eigenen Node zu betreiben, ist die Verwendung von Plug-and-play-Boxen wie [dAppNode](https://dappnode.io/). Es stellt Hardware für laufende Clients und Anwendungen mit einer einfachen Benutzeroberfläche zur Verfügung.

### Voraussetzungen {#requirements}

Bevor du einen Client installierst, stelle bitte sicher, dass dein Computer über genügend Ressourcen verfügt, um ihn auszuführen. Die Mindestanforderungen und die empfohlenen Anforderungen findest du weiter unten. Der wichtigste Teil ist jedoch der Festplattenplatz. Die Synchronisation der Ethereum-Blockchain ist Datentechnisch sehr ein-/ausgangsintensiv. Es ist am besten, ein SSD einzusetzen. Um einen Ethereum-Client auf HDD laufen zu lassen, benötigst du mindestens 8 GB RAM für den Cache.

#### Mindestanforderungen {#recommended-specifications}

- CPU mit 2+ Kernen
- Mindestens 4 GB RAM mit SSD, 8 GB+, wenn du eine HDD-Festplatte verwendest
- 8 MBit/s Bandbreite

#### Empfohlene Spezifikationen {#recommended-specifications}

- Schnelle CPU mit 4+ Kernen
- 16 GB+ RAM
- Schnelle SSD mit mindestens 500 GB freiem Speicherplatz
- 25+ MBit/s Bandbreite

Der Sync-Modus, den du auswählst, wird einen Einfluss auf den benötigten Speicherplatz haben, deswegen haben wir schon einmal den notwendigen Speicherplatz für jeden Client abgeschätzt.

| Client       | Festplattengröße (Fast Sync) | Festplattengröße (Full Archive) |
| ------------ | ---------------------------- | ------------------------------- |
| Geth         | 400 GB+                      | 6 TB+                           |
| OpenEthereum | 280 GB+                      | 6 TB+                           |
| Nethermind   | 200 GB+                      | 5 TB+                           |
| Besu         | 750 GB+                      | 5 TB+                           |
| Erigon       | N/A                          | 1 TB+                           |

- Hinweis: Erigon kann keinen Fast-Sync durchführen, aber Full-Pruning ist möglich (~500 GB)

![Ein Diagramm, das aufzeigt, dass die Gigabytes für eine Full-Synchronisation ansteigen](./full-sync.png)

![Ein Diagramm, das aufzeigt, dass die Gigabytes für eine Archive-Synchronisation ansteigen](./archive-sync.png)

Diese Diagramme zeigen, wie sich die Speicheranforderungen fortwährend ändern. Die aktuellsten Daten für Geth und OpenEthereum findest du auf [Full-Sync-Daten](https://etherscan.io/chartsync/chaindefault) und [Archive-Sync-Daten](https://etherscan.io/chartsync/chainarchive).

### Ethereum auf einem Einzelplatinen-Computer {#ethereum-on-a-single-board-computer}

Die bequemste und günstigste Art, Ethereum-Nodes zu betreiben, ist die Benutzung eines Einzelboard-Computers mit ARM-Architektur wie den Raspberry Pi. [Ethereum auf ARM](https://twitter.com/EthereumOnARM) bietet Bilder von Geth-, OpenEthereum-, Nethermind- und Besu-Clients. Hier ist ein einfaches Tutorial dazu, [wie man einen ARM-Client aufsetzt und einrichtet](/developers/tutorials/run-node-raspberry-pi/).

Kleine, erschwingliche und effiziente Geräte wie diese sind ideal für den Betrieb eines Nodes zu Hause.

## Weiterführende Informationen {#further-reading}

Es gibt eine große Menge an Informationen über Ethereum-Clients im Internet. Hier sind ein paar Anhaltspunkte, die bei der Suche hilfreich sein könnten.

- [Ethereum 101 - Part 2 - Understanding Nodes](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _– Wil Barnes, 13 February 2019_
- [Running Ethereum Full Nodes: A Guide for the Barely Motivated](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 November 2019_
- [Running an Ethereum Node](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/) _– ETHHub, updated often_
- [Analyzing the hardware requirements to be an Ethereum full validated node](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 24 September 2018_
- [Running a Hyperledger Besu Node on the Ethereum Mainnet: Benefits, Requirements, and Setup](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 7 May 2020_

## Verwandte Themen {#related-topics}

- [Blöcke](/developers/docs/blocks/)
- [Netzwerke](/developers/docs/networks/)

## Verwandte Tutorials {#related-tutorials}

- [Running a Node with Geth](/developers/tutorials/run-light-node-geth/) _– How to download, install and run Geth. Covering syncmodes, the JavaScript console, and more._
- [Turn your Raspberry Pi 4 into a validator node just by flashing the MicroSD card – Installation guide](/developers/tutorials/run-node-raspberry-pi/) _– Flash your Raspberry Pi 4, plug in an ethernet cable, connect the SSD disk and power up the device to turn the Raspberry Pi 4 into a full Ethereum node running the execution layer (Mainnet) and / or the consensus layer (Beacon Chain / validator)._
