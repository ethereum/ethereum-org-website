---
title: Das Portal-Netzwerk
description: "Ein Überblick über das Portal-Netzwerk, ein Peer-to-Peer-Netzwerk, das die Historie von Ethereum verfügbar hält, während Clients aufhören, diese vollständig zu speichern."
lang: de
---

[Ethereum](/) ist ein Netzwerk aus Computern, auf denen Ethereum-Client-Software ausgeführt wird. Jeder dieser Computer wird als „Knoten“ bezeichnet. Die Client-Software ermöglicht es einem Knoten, Daten im Ethereum-Netzwerk zu senden und zu empfangen, und verifiziert Daten anhand der Ethereum-Protokollregeln. Knoten speichern viele historische Daten auf ihren Festplatten und fügen diesen hinzu, wenn sie neue Informationspakete, sogenannte Blöcke, von anderen Knoten im Netzwerk erhalten. Dies ist notwendig, um stets zu überprüfen, ob ein Knoten über Informationen verfügt, die mit dem Rest des Netzwerks konsistent sind. Das bedeutet, dass der Betrieb eines Knotens viel Speicherplatz erfordern kann. Einige Knotenoperationen können auch viel RAM benötigen.

Ausführungs-Clients müssen nicht mehr all diese Daten aufbewahren. Seit Juli 2025 können sie die Körper und Transaktionsbelege von Blöcken aus der Zeit vor [dem Merge](/roadmap/merge/) verwerfen, und die Ethereum-Roadmap sieht vor, im Laufe der Zeit noch mehr von der Historie der Chain zu verwerfen. Diese Historie muss jedoch weiterhin für jeden verfügbar bleiben, der sie benötigt, wie z. B. Block-Explorer, Indexer oder eine Wallet, die eine alte Transaktion nachschlägt.

Das Portal-Netzwerk hält diese Historie verfügbar, indem es sie in kleinen Teilen über viele Knoten verteilt. Kein Knoten muss alles speichern, und ein Knoten kann jedes Teil abrufen und es mit Daten abgleichen, die er bereits besitzt, ohne dem Knoten vertrauen zu müssen, der es gesendet hat.

Mehr über [Knoten und Clients](/developers/docs/nodes-and-clients/)

## Warum brauchen wir das Portal-Netzwerk? {#why-do-we-need-portal-network}

Ethereum-Knoten speichern ihre eigene vollständige oder teilweise Kopie der Ethereum-Blockchain. Diese lokale Kopie wird verwendet, um Transaktionen zu validieren und sicherzustellen, dass der Knoten der richtigen Chain folgt. Diese lokal gespeicherten Daten ermöglichen es Knoten, unabhängig zu überprüfen, ob eingehende Daten gültig und korrekt sind, ohne einer anderen Entität vertrauen zu müssen.

Diese lokale Kopie der Blockchain und der zugehörigen Zustands- und Transaktionsbelegdaten nimmt viel Platz auf der Festplatte des Knotens ein. Beispielsweise wird eine 4-TB-SSD für den Betrieb eines Knotens empfohlen, der [Geth](https://geth.ethereum.org) in Verbindung mit einem Konsens-Client verwendet. Mit der vollständigen Chain-Historie belegt Geth mehr als 1,8 TB Speicherplatz (Stand September 2026), und dieser wächst mit der Chain weiter an.

Das bedeutet, dass der Betrieb von Knoten teuer sein kann, da Ethereum eine große Menge an Speicherplatz zugewiesen werden muss. Der [Historienverfall](/roadmap/statelessness/#history-expiry) reduziert dies, indem er Clients ermöglicht, alte Blockdaten zu löschen, die sie nicht benötigen, um der Chain zu folgen: Seit dem [teilweisen Historienverfall](https://blog.ethereum.org/2025/07/08/partial-history-exp) im Juli 2025 können Ausführungs-Clients die Körper und Transaktionsbelege jedes Blocks vor dem Merge verwerfen. [Zustandsablauf](/roadmap/statelessness/#state-expiry) und [Zustandslosigkeit](/roadmap/statelessness/) sind weitere Lösungen, an denen noch geforscht wird.

Sobald Knoten aufhören, alte Historien zu speichern, können sie diese nicht mehr für andere bereitstellen. Archive, Torrents und Anbieter behalten Kopien davon; das Portal-Netzwerk verteilt sie über viele Knoten, sodass sie verfügbar bleiben, ohne sich auf einen einzelnen von ihnen verlassen zu müssen.

## Wie funktioniert das Portal-Netzwerk? {#how-does-portal-network-work}

Ethereum-Knoten haben strenge Protokolle, die definieren, wie sie miteinander kommunizieren. Ausführungs-Clients kommunizieren über eine Reihe von Subprotokollen, die als [devp2p](/developers/docs/networking-layer/#devp2p) bekannt sind, während Konsens-Clients einen anderen Stack von Subprotokollen namens [libp2p](/developers/docs/networking-layer/#libp2p) verwenden. devp2p ermöglicht es einem Knoten, Blockkörper und Transaktionsbelege von seinen Peers anzufordern, aber ein Peer, der alte Historien verworfen hat, kann diese nicht bereitstellen. Apps und Wallets können auch Daten von einem Knoten über die [JSON-RPC-Programmierschnittstelle (API)](/developers/docs/apis/json-rpc/) abrufen, aber das setzt voraus, dass ein Knoten oder Anbieter die Daten speichert und man darauf vertraut, dass dieser ehrlich ist.

Das Portal-Netzwerk ist ein separates Peer-to-Peer-Netzwerk, das für das Teilen von Historien entwickelt wurde. Es läuft auf [discv5](https://github.com/ethereum/devp2p/blob/master/discv5/discv5.md), dem Knoten-Erkennungsprotokoll, das auch Konsens-Clients zum Finden von Peers verwenden, und organisiert seine Knoten als [verteilte Hash-Tabelle (DHT)](https://en.wikipedia.org/wiki/Distributed_hash_table), ähnlich wie bei BitTorrent. Jeder Knoten hat eine Knoten-ID, und jeder Inhalt, wie z. B. die Transaktionsbelege eines Blocks, hat eine Inhalts-ID im selben ID-Raum, abgeleitet von seiner Blocknummer. Jeder Knoten speichert die Inhalte, deren IDs seiner eigenen ID am nächsten sind, bis zu einer von ihm gewählten Distanz, die als sein Radius bezeichnet wird. Um einen Inhalt abzurufen, fragt ein Knoten die ihm bekannten Peers, die der Inhalts-ID am nächsten sind. Peers, die ihn nicht haben, antworten mit Knoten, die noch näher dran sind, bis die Anfrage einen Knoten erreicht, der ihn speichert.

<PortalHistoryDiagram />

Ein Knoten muss den empfangenen Daten niemals vertrauen. Er behält jeden Block-Header, und jeder Header bestätigt die Transaktionen und Transaktionsbelege seines Blocks durch Roots wie `transactionsRoot` und `receiptsRoot`. Der Knoten gleicht einen Blockkörper oder die Transaktionsbelege eines Blocks mit diesen Roots ab, bevor er sie verwendet.

### Die Portal-Netzwerke {#the-portal-networks}

Das Portal-Netzwerk wurde zunächst als mehrere Subnetzwerke konzipiert, die es leichtgewichtigen Clients ermöglichen sollten, der Chain zu folgen, ohne einem Full Node zu vertrauen: ein Beacon Chain-Light-Client-Netzwerk, ein Zustandsnetzwerk, ein Transaktions-Gossip-Netzwerk und ein Historiennetzwerk. Im Jahr 2025 wurden die Spezifikationen aller bis auf eines als veraltet (legacy) eingestuft, und die Entwicklung konzentriert sich nun auf das **Historiennetzwerk**, das die Körper und Transaktionsbelege vergangener Blöcke für Ausführungs-Clients speichert, die jeden Block-Header behalten, aber den Rest der Historie verworfen haben.

## Portal-Netzwerk-Clients {#client-diversity-as-default}

Mehrere Teams haben Portal-Netzwerk-Clients entwickelt:

- [Nimbus-Portal-Client](https://fluffy.guide) (ehemals Fluffy): geschrieben in Nim und derjenige, der sich noch in aktiver Entwicklung befindet
- [Trin](https://github.com/ethereum/trin): geschrieben in Rust, wird nicht mehr gepflegt
- [Ultralight](https://github.com/ethereumjs/ultralight): geschrieben in TypeScript, ohne Updates seit Mitte 2025
- [Shisui](https://github.com/zen-eth/shisui): geschrieben in Go, ohne Updates seit Mitte 2025

## Weiterführende Literatur {#further-reading}

- [Spezifikationen des Portal-Netzwerks](https://github.com/ethereum/portal-network-specs)
- [Nutzung des Portal-Netzwerk-Protokolls für den Historienverfall](https://ethresear.ch/t/using-portal-network-protocol-for-history-expiry/22658)
- [Teilweiser Historienverfall](https://blog.ethereum.org/2025/07/08/partial-history-exp)
- [Das Portal-Netzwerk (Piper Merriam auf der Devcon Bogota)](https://www.youtube.com/watch?v=0stc9jnQLXA)
- [Das Portal-Netzwerk auf Discord](https://discord.gg/CFFnmE7Hbs)
- [Website des Portal-Netzwerks](https://www.ethportal.net/)
