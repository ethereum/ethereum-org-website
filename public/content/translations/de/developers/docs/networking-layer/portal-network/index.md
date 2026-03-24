---
title: Das Portal Network
description: "Ein Überblick über das Portal Network – ein in der Entwicklung befindliches Netzwerk zur Unterstützung von ressourcenarmen Anwendungen."
lang: de
---

[Ethereum](/) ist ein Netzwerk aus Computern, auf denen Ethereum-Anwendungssoftware ausgeführt wird. Jeder dieser Computer wird als „Blockchain-Knoten“ bezeichnet. Die Anwendungssoftware ermöglicht es einem Blockchain-Knoten, Daten im Ethereum-Netzwerk zu senden und zu empfangen, und verifiziert Daten anhand der Ethereum-Protokollregeln. Blockchain-Knoten speichern viele historische Daten auf ihren Festplatten und fügen diesen hinzu, wenn sie neue Informationspakete, sogenannte Blöcke, von anderen Blockchain-Knoten im Netzwerk erhalten. Dies ist notwendig, um stets zu überprüfen, ob ein Blockchain-Knoten über Informationen verfügt, die mit dem Rest des Netzwerks übereinstimmen. Das bedeutet, dass der Betrieb eines Blockchain-Knotens viel Speicherplatz erfordern kann. Einige Operationen von Blockchain-Knoten können auch viel RAM erfordern.

Um dieses Speicherplatzproblem zu umgehen, wurden „leichte“ Blockchain-Knoten entwickelt, die Informationen von vollständigen Blockchain-Knoten anfordern, anstatt alles selbst zu speichern. Dies bedeutet jedoch, dass der leichte Blockchain-Knoten die Informationen nicht unabhängig verifiziert und stattdessen einem anderen Blockchain-Knoten vertraut. Es bedeutet auch, dass vollständige Blockchain-Knoten zusätzliche Arbeit übernehmen müssen, um diese leichten Blockchain-Knoten zu bedienen.

Das Portal Network ist ein neues Netzwerkdesign für Ethereum, das darauf abzielt, das Problem der Datenverfügbarkeit für „leichte“ Blockchain-Knoten zu lösen, ohne vollständigen Blockchain-Knoten vertrauen oder diese zusätzlich belasten zu müssen, indem die erforderlichen Daten in kleinen Stücken über das Netzwerk verteilt werden.

Mehr über [Blockchain-Knoten und Anwendungen](/developers/docs/nodes-and-clients/)

## Warum brauchen wir das Portal Network? {#why-do-we-need-portal-network}

Ethereum-Blockchain-Knoten speichern ihre eigene vollständige oder teilweise Kopie der Ethereum-Blockchain. Diese lokale Kopie wird verwendet, um Transaktionen zu validieren und sicherzustellen, dass der Blockchain-Knoten der richtigen Chain folgt. Diese lokal gespeicherten Daten ermöglichen es Blockchain-Knoten, unabhängig zu überprüfen, ob eingehende Daten gültig und korrekt sind, ohne einer anderen Entität vertrauen zu müssen.

Diese lokale Kopie der Blockchain und die zugehörigen Status- und Belegdaten beanspruchen viel Platz auf der Festplatte des Blockchain-Knotens. Beispielsweise wird eine 2-TB-Festplatte für den Betrieb eines Blockchain-Knotens empfohlen, der [Geth](https://geth.ethereum.org) in Verbindung mit einem Konsens-Client verwendet. Bei der Verwendung von Snap Sync, das nur Chain-Daten aus einer relativ aktuellen Menge von Blöcken speichert, belegt Geth typischerweise etwa 650 GB Speicherplatz, wächst jedoch um etwa 14 GB/Woche (Sie können den Blockchain-Knoten regelmäßig wieder auf 650 GB bereinigen).

Das bedeutet, dass der Betrieb von Blockchain-Knoten teuer sein kann, da Ethereum eine große Menge an Speicherplatz zugewiesen werden muss. Es gibt mehrere Lösungen für dieses Problem auf der Ethereum-Roadmap, einschließlich [Historienablauf (History Expiry)](/roadmap/statelessness/#history-expiry), [Statusablauf (State Expiry)](/roadmap/statelessness/#state-expiry) und [Zustandslosigkeit (Statelessness)](/roadmap/statelessness/). Es wird jedoch wahrscheinlich noch einige Jahre dauern, bis diese implementiert sind. Es gibt auch [leichte Blockchain-Knoten](/developers/docs/nodes-and-clients/light-clients/), die keine eigene Kopie der Chain-Daten speichern; sie fordern die benötigten Daten von vollständigen Blockchain-Knoten an. Dies bedeutet jedoch, dass leichte Blockchain-Knoten darauf vertrauen müssen, dass vollständige Blockchain-Knoten ehrliche Daten liefern, und belastet zudem die vollständigen Blockchain-Knoten, die die von den leichten Blockchain-Knoten benötigten Daten bereitstellen müssen.

Das Portal Network zielt darauf ab, eine alternative Möglichkeit für leichte Blockchain-Knoten bereitzustellen, an ihre Daten zu gelangen, die kein Vertrauen erfordert oder die Arbeit, die von vollständigen Blockchain-Knoten geleistet werden muss, erheblich erhöht. Dies soll erreicht werden, indem eine neue Methode für Ethereum-Blockchain-Knoten eingeführt wird, um Daten über das Netzwerk hinweg zu teilen.

## Wie funktioniert das Portal Network? {#how-does-portal-network-work}

Ethereum-Blockchain-Knoten haben strenge Protokolle, die definieren, wie sie miteinander kommunizieren. Ausführungs-Clients kommunizieren über eine Reihe von Subprotokollen, die als [DevP2P](/developers/docs/networking-layer/#devp2p) bekannt sind, während Konsens-Clients einen anderen Stack von Subprotokollen namens [libP2P](/developers/docs/networking-layer/#libp2p) verwenden. Diese definieren die Arten von Daten, die zwischen Blockchain-Knoten weitergegeben werden können.

![devP2P und libP2P](portal-network-devp2p-libp2p.png)

Blockchain-Knoten können auch spezifische Daten über die [JSON-RPC-API](/developers/docs/apis/json-rpc/) bereitstellen. Auf diese Weise tauschen Apps und Wallets Informationen mit Ethereum-Blockchain-Knoten aus. Keines dieser Protokolle ist jedoch ideal, um Daten für leichte Anwendungen bereitzustellen.

Leichte Anwendungen können derzeit keine spezifischen Teile von Chain-Daten über DevP2P oder libP2P anfordern, da diese Protokolle nur darauf ausgelegt sind, die Chain-Synchronisation und das Verbreiten (Gossiping) von Blöcken und Transaktionen zu ermöglichen. Leichte Anwendungen möchten diese Informationen nicht herunterladen, da sie dadurch nicht mehr „leicht“ wären.

Die JSON-RPC-API ist ebenfalls keine ideale Wahl für Datenanfragen von leichten Anwendungen, da sie auf einer Verbindung zu einem bestimmten vollständigen Blockchain-Knoten oder einem zentralisierten RPC-Anbieter beruht, der die Daten bereitstellen kann. Dies bedeutet, dass die leichte Anwendung darauf vertrauen muss, dass dieser spezifische Blockchain-Knoten/Anbieter ehrlich ist, und der vollständige Blockchain-Knoten möglicherweise viele Anfragen von vielen leichten Anwendungen bearbeiten muss, was seine Bandbreitenanforderungen erhöht.

Der Sinn des Portal Networks besteht darin, das gesamte Design zu überdenken und speziell auf Leichtigkeit auszulegen, außerhalb der Designbeschränkungen der bestehenden Ethereum-Anwendungen.

Die Kernidee des Portal Networks besteht darin, die besten Teile des aktuellen Netzwerk-Stacks zu übernehmen, indem Informationen, die von leichten Anwendungen benötigt werden, wie historische Daten und die Identität des aktuellen Kopfes der Chain, über ein leichtgewichtiges dezentralisiertes Peer-to-Peer-Netzwerk im DevP2P-Stil unter Verwendung einer [DHT](https://en.wikipedia.org/wiki/Distributed_hash_table) (ähnlich wie Bittorrent) bereitgestellt werden.

Die Idee ist, jedem Blockchain-Knoten kleine Teile der gesamten historischen Ethereum-Daten und einige spezifische Verantwortlichkeiten für Blockchain-Knoten hinzuzufügen. Anfragen werden dann bedient, indem die Blockchain-Knoten gesucht werden, die die spezifisch angeforderten Daten speichern, und diese von ihnen abgerufen werden.

Dies kehrt das normale Modell um, bei dem leichte Blockchain-Knoten einen einzelnen Blockchain-Knoten finden und diesen auffordern, große Datenmengen zu filtern und bereitzustellen; stattdessen filtern sie schnell ein großes Netzwerk von Blockchain-Knoten, die jeweils kleine Datenmengen verarbeiten.

Das Ziel ist es, einem dezentralisierten Netzwerk von leichten Portal-Anwendungen Folgendes zu ermöglichen:

- den Kopf der Chain zu verfolgen
- aktuelle und historische Chain-Daten zu synchronisieren
- Statusdaten abzurufen
- Transaktionen zu übertragen
- Transaktionen mithilfe der [EVM](/developers/docs/evm/) auszuführen

Die Vorteile dieses Netzwerkdesigns sind:

- Verringerung der Abhängigkeit von zentralisierten Anbietern
- Reduzierung der Internetbandbreitennutzung
- Minimierte oder gar keine Synchronisierung
- Zugänglich für ressourcenbeschränkte Geräte (\<1 GB RAM, \<100 MB Speicherplatz, 1 CPU)

Die folgende Tabelle zeigt die Funktionen bestehender Anwendungen, die durch das Portal Network bereitgestellt werden können, sodass Benutzer auf sehr ressourcenarmen Geräten auf diese Funktionen zugreifen können.

### Die Portal Networks

| Beacon-Light-Client | Status-Netzwerk | Transaktions-Gossip | Historien-Netzwerk |
| ------------------- | ---------------------------- | ------------------- | --------------- |
| Beacon Chain Light | Konto- und Vertragsspeicher | Leichtgewichtiger Mempool | Header |
| Protokolldaten | | | Blockkörper |
| | | | Belege |

## Client-Vielfalt standardmäßig {#client-diversity-as-default}

Die Entwickler des Portal Networks haben sich zudem für das Design entschieden, vom ersten Tag an vier separate Portal Network-Anwendungen zu entwickeln.

Die Portal Network-Anwendungen sind:

- [Trin](https://github.com/ethereum/trin): geschrieben in Rust
- [Fluffy](https://fluffy.guide): geschrieben in Nim
- [Ultralight](https://github.com/ethereumjs/ultralight): geschrieben in TypeScript
- [Shisui](https://github.com/zen-eth/shisui): geschrieben in Go

Mehrere unabhängige Anwendungs-Implementierungen zu haben, erhöht die Widerstandsfähigkeit und Dezentralisierung des Ethereum-Netzwerks.

Wenn eine Anwendung Probleme oder Schwachstellen aufweist, können andere Anwendungen weiterhin reibungslos funktionieren, wodurch ein Single Point of Failure vermieden wird. Darüber hinaus fördern vielfältige Anwendungs-Implementierungen Innovation und Wettbewerb, treiben Verbesserungen voran und reduzieren das Risiko einer Monokultur innerhalb des Ökosystems.

## Weiterführende Literatur {#further-reading}

- [Das Portal Network (Piper Merriam auf der Devcon Bogota)](https://www.youtube.com/watch?v=0stc9jnQLXA).
- [Der Portal Network Discord](https://discord.gg/CFFnmE7Hbs)
- [Die Portal Network Website](https://www.ethportal.net/)