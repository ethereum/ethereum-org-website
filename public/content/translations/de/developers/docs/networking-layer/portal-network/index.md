---
title: Das Portal-Netzwerk
description: "Ein Überblick über das Portal-Netzwerk – ein in der Entwicklung befindliches Netzwerk zur Unterstützung ressourcenschonender Clients."
lang: de
---

[Ethereum](/) ist ein Netzwerk aus Computern, auf denen Ethereum-Client-Software ausgeführt wird. Jeder dieser Computer wird als „Knoten“ bezeichnet. Die Client-Software ermöglicht es einem Knoten, Daten im Ethereum-Netzwerk zu senden und zu empfangen, und verifiziert Daten anhand der Ethereum-Protokollregeln. Knoten speichern viele historische Daten auf ihren Festplatten und fügen diesen hinzu, wenn sie neue Informationspakete, sogenannte Blöcke, von anderen Knoten im Netzwerk erhalten. Dies ist notwendig, um stets zu überprüfen, ob ein Knoten über Informationen verfügt, die mit dem Rest des Netzwerks konsistent sind. Das bedeutet, dass der Betrieb eines Knotens viel Speicherplatz erfordern kann. Einige Knotenoperationen können auch viel RAM erfordern.

Um dieses Speicherplatzproblem zu umgehen, wurden „Light Nodes“ entwickelt, die Informationen von Full Nodes anfordern, anstatt alles selbst zu speichern. Dies bedeutet jedoch, dass der Light Node die Informationen nicht unabhängig verifiziert und stattdessen einem anderen Knoten vertraut. Es bedeutet auch, dass Full Nodes zusätzliche Arbeit übernehmen müssen, um diese Light Nodes zu bedienen.

Das Portal-Netzwerk ist ein neues Netzwerkdesign für Ethereum, das darauf abzielt, das Datenverfügbarkeitsproblem für „Light Nodes“ zu lösen, ohne Full Nodes vertrauen oder diese zusätzlich belasten zu müssen, indem die erforderlichen Daten in kleinen Stücken über das Netzwerk verteilt werden.

Mehr über [Knoten und Clients](/developers/docs/nodes-and-clients/)

## Warum brauchen wir das Portal-Netzwerk? {#why-do-we-need-portal-network}

Ethereum-Knoten speichern ihre eigene vollständige oder teilweise Kopie der Ethereum-Blockchain. Diese lokale Kopie wird verwendet, um Transaktionen zu validieren und sicherzustellen, dass der Knoten der richtigen Chain folgt. Diese lokal gespeicherten Daten ermöglichen es Knoten, unabhängig zu überprüfen, ob eingehende Daten gültig und korrekt sind, ohne einer anderen Entität vertrauen zu müssen.

Diese lokale Kopie der Blockchain und die zugehörigen Zustands- und Transaktionsbelegdaten beanspruchen viel Platz auf der Festplatte des Knotens. Beispielsweise wird eine 2-TB-Festplatte für den Betrieb eines Knotens empfohlen, der [Geth](https://geth.ethereum.org) in Kombination mit einem Konsens-Client verwendet. Bei Verwendung der Snap-Synchronisierung, die nur Chain-Daten aus einer relativ neuen Menge von Blöcken speichert, belegt Geth typischerweise etwa 650 GB Speicherplatz, wächst aber um etwa 14 GB/Woche (Sie können den Knoten regelmäßig wieder auf 650 GB bereinigen).

Das bedeutet, dass der Betrieb von Knoten teuer sein kann, da Ethereum viel Speicherplatz zugewiesen werden muss. Es gibt mehrere Lösungen für dieses Problem auf der Ethereum-Roadmap, darunter [Historienverfall](/roadmap/statelessness/#history-expiry), [Zustandsablauf](/roadmap/statelessness/#state-expiry) und [Zustandslosigkeit](/roadmap/statelessness/). Es wird jedoch wahrscheinlich noch einige Jahre dauern, bis diese implementiert sind. Es gibt auch [Light Nodes](/developers/docs/nodes-and-clients/light-clients/), die keine eigene Kopie der Chain-Daten speichern; sie fordern die benötigten Daten von Full Nodes an. Dies bedeutet jedoch, dass Light Nodes darauf vertrauen müssen, dass Full Nodes ehrliche Daten bereitstellen, und belastet zudem die Full Nodes, die die von den Light Nodes benötigten Daten bereitstellen müssen.

## Wie funktioniert das Portal-Netzwerk? {#how-does-portal-network-work}

Ethereum-Knoten haben strenge Protokolle, die definieren, wie sie miteinander kommunizieren. Ausführungs-Clients kommunizieren über eine Reihe von Subprotokollen, die als [devp2p](/developers/docs/networking-layer/#devp2p) bekannt sind, während Konsens-Clients einen anderen Stack von Subprotokollen namens [libp2p](/developers/docs/networking-layer/#libp2p) verwenden. Diese definieren die Arten von Daten, die zwischen Knoten weitergegeben werden können.

![devP2P and libP2P](portal-network-devp2p-libp2p.png)

Knoten können auch spezifische Daten über die [JSON-RPC-API](/developers/docs/apis/json-rpc/) bereitstellen, über die Apps und Wallets Informationen mit Ethereum-Knoten austauschen. Keines dieser Protokolle ist jedoch ideal für die Bereitstellung von Daten an Light-Clients.

Light-Clients können derzeit keine spezifischen Teile von Chain-Daten über devp2p oder libp2p anfordern, da diese Protokolle nur dafür ausgelegt sind, die Chain-Synchronisierung und das Gossiping (Verbreiten) von Blöcken und Transaktionen zu ermöglichen. Light-Clients möchten diese Informationen nicht herunterladen, da sie dadurch nicht mehr „light“ (leichtgewichtig) wären.

Die JSON-RPC-API ist auch keine ideale Wahl für Datenanfragen von Light-Clients, da sie auf einer Verbindung zu einem bestimmten Full Node oder einem zentralisierten RPC-Anbieter beruht, der die Daten bereitstellen kann. Dies bedeutet, dass der Light-Client darauf vertrauen muss, dass dieser bestimmte Knoten/Anbieter ehrlich ist, und der Full Node muss möglicherweise viele Anfragen von vielen Light-Clients verarbeiten, was seine Bandbreitenanforderungen erhöht.

Der Sinn des Portal-Netzwerks besteht darin, das gesamte Design zu überdenken und speziell auf Leichtgewichtigkeit auszulegen, außerhalb der Designbeschränkungen der bestehenden Ethereum-Clients.

Die Kernidee des Portal-Netzwerks besteht darin, die besten Teile des aktuellen Netzwerk-Stacks zu übernehmen, indem Informationen, die von Light-Clients benötigt werden, wie historische Daten und die Identität des aktuellen Kopfes der Chain, über ein leichtgewichtiges dezentrales Peer-to-Peer-Netzwerk im devp2p-Stil unter Verwendung einer [DHT](https://en.wikipedia.org/wiki/Distributed_hash_table) (ähnlich wie BitTorrent) bereitgestellt werden.

Die Idee ist, jedem Knoten kleine Teile der gesamten historischen Ethereum-Daten und einige spezifische Knotenverantwortlichkeiten hinzuzufügen. Anfragen werden dann bedient, indem die Knoten gesucht werden, die die spezifischen angeforderten Daten speichern, und diese von ihnen abgerufen werden.

Dies kehrt das normale Modell um, bei dem Light Nodes einen einzelnen Knoten finden und ihn auffordern, große Datenmengen zu filtern und bereitzustellen; stattdessen filtern sie schnell ein großes Netzwerk von Knoten, die jeweils kleine Datenmengen verarbeiten.

Das Ziel ist es, einem dezentralen Netzwerk von leichtgewichtigen Portal-Clients Folgendes zu ermöglichen:

- den Kopf der Chain zu verfolgen
- aktuelle und historische Chain-Daten zu synchronisieren
- Zustandsdaten abzurufen
- Transaktionen zu übertragen
- Transaktionen mithilfe der [EVM](/developers/docs/evm/) auszuführen

Die Vorteile dieses Netzwerkdesigns sind:

- Verringerung der Abhängigkeit von zentralisierten Anbietern
- Reduzierung der Internet-Bandbreitennutzung
- Minimierte oder gar keine Synchronisierung
- Zugänglich für ressourcenbeschränkte Geräte (\<1 GB RAM, \<100 MB Festplattenspeicher, 1 CPU)

Die folgende Tabelle zeigt die Funktionen bestehender Clients, die vom Portal-Netzwerk bereitgestellt werden können, sodass Benutzer auf sehr ressourcenschonenden Geräten auf diese Funktionen zugreifen können.

### Die Portal-Netzwerke {#the-portal-networks}

| Beacon-Light-Client | Zustandsnetzwerk             | Transaktions-Gossip | Historiennetzwerk | Kanonischer Txn-Index |
| ------------------- | ---------------------------- | ------------------- | ----------------- | --------------------- |
| Beacon-Chain-Light  | Konto- und Vertragsspeicher  | Leichtgewichtiger Mempool | Header            | TxHash > Hash, Index  |
| Protokolldaten      |                              |                     | Blockkörper       |                       |
|                     |                              |                     | Transaktionsbelege |                       |

## Client-Diversität als Standard {#client-diversity-as-default}

Die Entwickler des Portal-Netzwerks haben sich zudem für das Design entschieden, vom ersten Tag an vier separate Portal-Netzwerk-Clients zu entwickeln.

Die Portal-Netzwerk-Clients sind:

- [Trin](https://github.com/ethereum/trin): geschrieben in Rust
- [Fluffy](https://fluffy.guide): geschrieben in Nim
- [Ultralight](https://github.com/ethereumjs/ultralight): geschrieben in TypeScript
- [Shisui](https://github.com/zen-eth/shisui): geschrieben in Go

Mehrere unabhängige Client-Implementierungen zu haben, erhöht die Widerstandsfähigkeit und Dezentralisierung des Ethereum-Netzwerks.

Wenn bei einem Client Probleme oder Schwachstellen auftreten, können andere Clients weiterhin reibungslos funktionieren, wodurch ein Single Point of Failure (einzelner Ausfallpunkt) vermieden wird. Darüber hinaus fördern vielfältige Client-Implementierungen Innovation und Wettbewerb, treiben Verbesserungen voran und verringern das Risiko einer Monokultur innerhalb des Ökosystems.

## Weiterführende Literatur {#further-reading}

- [Das Portal-Netzwerk (Piper Merriam auf der Devcon Bogota)](https://www.youtube.com/watch?v=0stc9jnQLXA).
- [Der Discord des Portal-Netzwerks](https://discord.gg/CFFnmE7Hbs)
- [Die Website des Portal-Netzwerks](https://www.ethportal.net/)