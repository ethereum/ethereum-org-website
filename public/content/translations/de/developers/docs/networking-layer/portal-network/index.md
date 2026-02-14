---
title: Das Portal-Netzwerk
description: "Ein Überblick über das Portal-Netzwerk – ein in der Entwicklung befindliches Netzwerk, das für die Unterstützung von Clients mit geringen Ressourcen konzipiert ist."
lang: de
---

Ethereum ist ein Netzwerk aus Computern, auf denen Ethereum-Client-Software läuft. Jeder dieser Computer wird als „Node“ bezeichnet. Die Client-Software ermöglicht es einem Node, Daten im Ethereum-Netzwerk zu senden und zu empfangen, und verifiziert die Daten anhand der Regeln des Ethereum-Protokolls. Nodes speichern große Mengen historischer Daten auf ihrem Festplattenspeicher und ergänzen diese, sobald sie neue Informationspakete – sogenannte Blöcke – von anderen Nodes im Netzwerk empfangen. Dies ist notwendig, um ständig zu überprüfen, dass die Informationen eines Nodes mit dem Rest des Netzwerks konsistent sind. Dies hat zur Folge, dass der Betrieb eines Nodes viel Speicherplatz beanspruchen kann. Manche Node-Operationen können ebenfalls viel RAM benötigen.

Um dieses Speicherplatzproblem zu umgehen, wurden „Light“-Nodes entwickelt, die Informationen von Full Nodes anfordern, anstatt sie alle selbst zu speichern. Das bedeutet jedoch, dass der Light Node die Informationen nicht unabhängig verifiziert und stattdessen einem anderen Node vertrauen muss. Es bedeutet auch, dass Full Nodes zusätzliche Arbeit leisten müssen, um diese Light Nodes zu bedienen.

Das Portal-Netzwerk ist ein neues Netzwerkdesign für Ethereum, das darauf abzielt, das Problem der Datenverfügbarkeit für „Light“-Nodes zu lösen, ohne auf Full Nodes vertrauen oder diese zusätzlich belasten zu müssen, indem die notwendigen Daten in kleinen Teilen über das Netzwerk verteilt werden.

Mehr über [Nodes und Clients](/developers/docs/nodes-and-clients/)

## Warum brauchen wir das Portal-Netzwerk? {#why-do-we-need-portal-network}

Ethereum-Nodes speichern ihre eigene vollständige oder teilweise Kopie der Ethereum-Blockchain. Diese lokale Kopie wird verwendet, um Transaktionen zu validieren und sicherzustellen, dass der Node der korrekten Chain folgt. Diese lokal gespeicherten Daten ermöglichen es Nodes, unabhängig zu verifizieren, dass eingehende Daten gültig und korrekt sind, ohne einer anderen Instanz vertrauen zu müssen.

Diese lokale Kopie der Blockchain und die zugehörigen State- und Belegdaten nehmen viel Platz auf der Festplatte des Nodes ein. Für den Betrieb eines Nodes, der [Geth](https://geth.ethereum.org) zusammen mit einem Konsens-Client nutzt, wird zum Beispiel eine 2-TB-Festplatte empfohlen. Bei Verwendung von Snap Sync, das nur Kettendaten aus einem relativ aktuellen Satz von Blöcken speichert, belegt Geth normalerweise etwa 650 GB Festplattenspeicher, wächst aber um etwa 14 GB/Woche (Sie können den Node regelmäßig auf 650 GB bereinigen).

Das heißt, dass der Node-Betrieb teuer sein kann, weil ein großer Teil des Speicherplatzes für Ethereum dediziert werden muss. Es gibt mehrere Lösungen für dieses Problem in der Ethereum-Roadmap, darunter der [Ablauf der Historie](/roadmap/statelessness/#history-expiry), der [Ablauf des Zustands](/roadmap/statelessness/#state-expiry) und die [Zustandslosigkeit](/roadmap/statelessness/). Bis zur Implementierung dieser Lösungen werden jedoch wahrscheinlich noch einige Jahre vergehen. Es gibt auch [Light-Nodes](/developers/docs/nodes-and-clients/light-clients/), die keine eigene Kopie der Kettendaten speichern; sie fordern die benötigten Daten von Full Nodes an. Das bedeutet jedoch, dass Light-Nodes darauf vertrauen müssen, dass Full Nodes ehrliche Daten liefern, und es belastet auch die Full Nodes, die die von den Light-Nodes benötigten Daten bereitstellen müssen.

Das Portal-Netzwerk zielt darauf ab, Light-Nodes eine alternative Möglichkeit zur Datenbeschaffung zu bieten, die weder Vertrauen in Full Nodes erfordert noch deren Arbeitslast wesentlich erhöht. Um dies zu erreichen, wird ein neues Verfahren für den Datenaustausch zwischen Ethereum-Nodes eingeführt.

## Wie funktioniert das Portal-Netzwerk? {#how-does-portal-network-work}

Für Ethereum-Nodes gelten strikte Protokolle, die festlegen, wie die Kommunikation untereinander abläuft. Ausführungs-Clients kommunizieren über eine Reihe von Subprotokollen, die als [DevP2P](/developers/docs/networking-layer/#devp2p) bekannt sind, während Konsens-Clients einen anderen Protokoll-Stack namens [libP2P](/developers/docs/networking-layer/#libp2p) verwenden. Sie legen fest, welche Datenarten zwischen den Nodes ausgetauscht werden können.

![devP2P und libP2P](portal-network-devp2p-libp2p.png)

Nodes können auch bestimmte Daten über die [JSON-RPC-API](/developers/docs/apis/json-rpc/) bereitstellen. Auf diese Weise tauschen Apps und Wallets Informationen mit Ethereum-Nodes aus. Jedoch eignet sich keines dieser Protokolle optimal für die Datenversorgung von Light-Clients.

Aktuell können Light-Clients keine gezielten Kettendaten über DevP2P oder libP2P abfragen, weil diese Protokolle lediglich für die Synchronisation der Chain und die Verbreitung von Blöcken und Transaktionen konzipiert wurden. Light-Clients wollen diese Informationen nicht herunterladen, da sie sonst nicht mehr „light“ wären.

Die JSON-RPC-API ist ebenfalls keine ideale Wahl für Datenanfragen von Light-Clients, da sie auf einer Verbindung zu einem bestimmten Full Node oder einem zentralisierten RPC-Anbieter beruht, der die Daten bereitstellen kann. Das bedeutet, der Light-Client muss auf die Ehrlichkeit des jeweiligen Nodes/Anbieters vertrauen. Gleichzeitig muss der Full Node potenziell viele Anfragen von vielen Light-Clients bearbeiten, was seinen Bandbreitenbedarf erhöht.

Das Portal-Netzwerk verfolgt den Ansatz, die Architektur von Grund auf neu zu konzipieren. Der Fokus liegt dabei auf einem schlanken Betrieb, unabhängig von den Design-Einschränkungen bestehender Ethereum-Clients.

Die Kernidee des Portal-Netzwerks ist es, die besten Elemente des aktuellen Netzwerk-Stacks zu übernehmen. Informationen, die von Light-Clients benötigt werden, wie historische Daten und die Identität des aktuellen Chain-Heads, werden über ein leichtes dezentrales Peer-to-Peer-Netzwerk im DevP2P-Stil bereitgestellt, das eine [DHT](https://en.wikipedia.org/wiki/Distributed_hash_table) (ähnlich wie Bittorrent) verwendet.

Das Konzept besteht darin, jedem Node nur kleine Teilstücke der gesamten Ethereum-Historie und bestimmte Aufgaben zu übertragen. Zur Beantwortung von Anfragen werden gezielt die Nodes gesucht, welche die spezifischen Daten vorhalten, um diese anschließend von dort zu beziehen.

Damit wird das herkömmliche Modell umgekehrt: Anstatt einen einzelnen Node mit dem Filtern und der Bereitstellung großer Datenmengen zu beauftragen, durchsuchen Light-Nodes zügig ein umfassendes Netzwerk, in dem jeder Node nur geringe Datenmengen verarbeitet.

Das Ziel ist es, einem dezentralen Netzwerk von leichtgewichtigen Portal-Clients zu ermöglichen:

- den Head der Chain zu verfolgen
- aktuelle und historische Kettendaten zu synchronisieren
- Zustandsdaten abzurufen
- Transaktionen zu versenden
- Transaktionen mit der [EVM](/developers/docs/evm/) auszuführen

Die Vorteile dieser Netzwerkarchitektur lauten:

- geringere Abhängigkeit von zentralisierten Anbietern
- Reduzierung der Internet-Bandbreitennutzung
- Minimierter oder gänzlich entfallender Synchronisierungsaufwand
- Zugänglich für Geräte mit begrenzten Ressourcen (<1 GB RAM, <100 MB Festplattenspeicher, 1 CPU)

Die nachstehende Tabelle zeigt die Funktionen bestehender Clients, die vom Portal-Netzwerk bereitgestellt werden können, sodass Benutzer auf diese Funktionen auf Geräten mit sehr geringen Ressourcen zugreifen können.

### Die Portal-Netzwerke

| Beacon Light Client | State-Netzwerk                | Transaktionsklatsch | History-Netzwerk |
| ------------------- | ----------------------------- | ------------------- | ---------------- |
| Beacon Chain Light  | Account- und Contract-Storage | Lightweight-Mempool | Header           |
| Protokolldaten      |                               |                     | Block-Bodies     |
|                     |                               |                     | Belege           |

## Client-Diversität als Standard {#client-diversity-as-default}

Die Entwickler des Portal-Netzwerks trafen auch die Design-Entscheidung, von Anfang an vier separate Portal-Netzwerk-Clients zu entwickeln.

Folgende Clients existieren für das Portal-Netzwerk:

- [Trin](https://github.com/ethereum/trin): geschrieben in Rust
- [Fluffy](https://fluffy.guide): geschrieben in Nim
- [Ultralight](https://github.com/ethereumjs/ultralight): geschrieben in Typescript
- [Shisui](https://github.com/zen-eth/shisui): geschrieben in Go

Mehrere unabhängige Client-Implementierungen erhöhen die Ausfallsicherheit und Dezentralisierung des Ethereum-Netzwerks.

Wenn bei einem Client Probleme oder Schwachstellen auftreten, können andere Clients reibungslos weiterarbeiten, wodurch ein Single Point of Failure verhindert wird. Darüber hinaus fördern vielfältige Client-Implementierungen Innovation und Wettbewerb, was zu Verbesserungen führt und das Risiko einer Monokultur innerhalb des Ökosystems verringert.

## Weiterführende Lektüre {#further-reading}

- [Das Portal-Netzwerk (Piper Merriam auf der Devcon Bogota)](https://www.youtube.com/watch?v=0stc9jnQLXA).
- [Der Discord des Portal-Netzwerks](https://discord.gg/CFFnmE7Hbs)
- [Die Website des Portal-Netzwerks](https://www.ethportal.net/)
