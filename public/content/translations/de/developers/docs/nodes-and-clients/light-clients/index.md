---
title: Light-Clients
description: Einführung in Ethereum-Light-Clients.
lang: de
---

Einen Full Node zu betreiben, ist die vertrauensloseste, privateste, dezentralste und zensurresistenteste Art, mit [Ethereum](/) zu interagieren. Mit einem Full Node behalten Sie Ihre eigene Kopie der Blockchain, die Sie sofort abfragen können, und Sie erhalten direkten Zugang zum Peer-to-Peer-Netzwerk von Ethereum. Der Betrieb eines Full Nodes erfordert jedoch eine erhebliche Menge an Arbeitsspeicher, Speicherplatz und CPU-Leistung. Das bedeutet, dass es nicht für jeden machbar ist, einen eigenen Knoten zu betreiben. Es gibt mehrere Lösungen dafür auf der Ethereum-Roadmap, einschließlich Zustandslosigkeit, aber deren Implementierung ist noch einige Jahre entfernt. Die kurzfristige Antwort besteht darin, einige der Vorteile des Betriebs eines Full Nodes gegen große Leistungsverbesserungen einzutauschen, die es ermöglichen, Knoten mit sehr geringen Hardwareanforderungen zu betreiben. Knoten, die diesen Kompromiss eingehen, werden als Light Nodes bezeichnet.

## Was ist ein Light-Client? {#what-is-a-light-client}

Ein Light Node ist ein Knoten, auf dem Light-Client-Software ausgeführt wird. Anstatt lokale Kopien der Blockchain-Daten zu behalten und alle Änderungen unabhängig zu verifizieren, fordern sie die erforderlichen Daten stattdessen von einem Anbieter an. Der Anbieter könnte eine direkte Verbindung zu einem Full Node sein oder über einen zentralisierten RPC-Server erfolgen. Die Daten werden dann vom Light Node verifiziert, was es ihm ermöglicht, mit der Spitze der Chain Schritt zu halten. Der Light Node verarbeitet nur Block-Header und lädt nur gelegentlich die tatsächlichen Blockinhalte herunter. Knoten können in ihrer "Leichtigkeit" variieren, abhängig von den Kombinationen aus Light- und Full-Client-Software, die sie ausführen. Die leichteste Konfiguration wäre beispielsweise die Ausführung eines Light-Ausführungsclients und eines Light-Konsens-Clients. Es ist auch wahrscheinlich, dass viele Knoten sich dafür entscheiden werden, Light-Konsens-Clients mit Full-Ausführungsclients auszuführen oder umgekehrt.

## Wie funktionieren Light-Clients? {#how-do-light-clients-work}

Als Ethereum begann, einen auf Proof-of-Stake (PoS) basierenden Konsensmechanismus zu verwenden, wurde eine neue Infrastruktur speziell zur Unterstützung von Light-Clients eingeführt. Dies funktioniert, indem alle 1,1 Tage zufällig eine Teilmenge von 512 Validatoren ausgewählt wird, die als **Sync-Komitee** fungieren. Das Sync-Komitee signiert den Header der neuesten Blöcke. Jeder Block-Header enthält die aggregierte Signatur der Validatoren im Sync-Komitee und ein "Bitfeld", das zeigt, welche Validatoren signiert haben und welche nicht. Jeder Header enthält auch eine Liste von Validatoren, von denen erwartet wird, dass sie am Signieren des nächsten Blocks teilnehmen. Das bedeutet, dass ein Light-Client schnell erkennen kann, dass das Sync-Komitee die empfangenen Daten abgesegnet hat, und er kann auch überprüfen, ob das Sync-Komitee das echte ist, indem er das empfangene mit dem vergleicht, das er laut dem vorherigen Block erwarten sollte. Auf diese Weise kann der Light-Client sein Wissen über den neuesten Ethereum-Block kontinuierlich aktualisieren, ohne den Block selbst herunterzuladen, sondern nur den Header, der zusammenfassende Informationen enthält.

Auf der Ausführungsschicht gibt es keine einheitliche Spezifikation für einen Light-Ausführungsclient. Der Umfang eines Light-Ausführungsclients kann von einem "Light-Modus" eines Full-Ausführungsclients variieren, der über die gesamte EVM- und Netzwerkfunktionalität eines Full Nodes verfügt, aber nur Block-Header verifiziert, ohne die zugehörigen Daten herunterzuladen, oder es kann ein stärker reduzierter Client sein, der sich stark darauf verlässt, Anfragen an einen RPC-Anbieter weiterzuleiten, um mit Ethereum zu interagieren.

## Warum sind Light-Clients wichtig? {#why-are-light-clients-important}

Light-Clients sind wichtig, weil sie es Benutzern ermöglichen, eingehende Daten zu verifizieren, anstatt blind darauf zu vertrauen, dass ihr Datenanbieter korrekt und ehrlich ist, während sie nur einen winzigen Bruchteil der Rechenressourcen eines Full Nodes verbrauchen. Die Daten, die Light-Clients empfangen, können gegen Block-Header geprüft werden, von denen sie wissen, dass sie von mindestens 2/3 einer zufälligen Gruppe von 512 Ethereum-Validatoren signiert wurden. Dies ist ein sehr starker Beweis dafür, dass die Daten korrekt sind.

Der Light-Client verbraucht nur eine winzige Menge an Rechenleistung, Arbeitsspeicher und Speicherplatz, sodass er auf einem Mobiltelefon ausgeführt, in eine App eingebettet oder als Teil eines Browsers betrieben werden kann. Light-Clients sind eine Möglichkeit, den vertrauensminimierten Zugang zu Ethereum genauso reibungslos zu gestalten wie das Vertrauen in einen Drittanbieter.

Nehmen wir ein einfaches Beispiel. Stellen Sie sich vor, Sie möchten Ihren Kontostand überprüfen. Dazu müssen Sie eine Anfrage an einen Ethereum-Knoten stellen. Dieser Knoten überprüft seine lokale Kopie des Ethereum-Zustands auf Ihren Kontostand und gibt ihn an Sie zurück. Wenn Sie keinen direkten Zugang zu einem Knoten haben, gibt es zentralisierte Betreiber, die diese Daten als Dienstleistung anbieten. Sie können eine Anfrage an sie senden, sie überprüfen ihren Knoten und senden das Ergebnis an Sie zurück. Das Problem dabei ist, dass Sie dann darauf vertrauen müssen, dass der Anbieter Ihnen die richtigen Informationen gibt. Sie können nie wirklich wissen, ob die Informationen korrekt sind, wenn Sie sie nicht selbst verifizieren können.

Ein Light-Client löst dieses Problem. Sie fordern immer noch Daten von einem externen Anbieter an, aber wenn Sie die Daten zurückerhalten, werden sie mit einem Beweis geliefert, den Ihr Light Node gegen die Informationen prüfen kann, die er im Block-Header erhalten hat. Das bedeutet, dass Ethereum die Korrektheit Ihrer Daten verifiziert, anstatt eines vertrauenswürdigen Betreibers.

## Welche Innovationen ermöglichen Light-Clients? {#what-innovations-do-light-clients-enable}

Der Hauptvorteil von Light-Clients besteht darin, dass mehr Menschen unabhängig, mit vernachlässigbaren Hardwareanforderungen und minimaler Abhängigkeit von Dritten auf Ethereum zugreifen können. Das ist gut für die Benutzer, weil sie ihre eigenen Daten verifizieren können, und es ist gut für das Netzwerk, weil es die Anzahl und Vielfalt der Knoten erhöht, die die Chain verifizieren.

Die Fähigkeit, Ethereum-Knoten auf Geräten mit sehr geringem Speicherplatz, Arbeitsspeicher und Rechenleistung auszuführen, ist einer der wichtigsten Innovationsbereiche, die durch Light-Clients erschlossen werden. Während Ethereum-Knoten heute viele Rechenressourcen benötigen, könnten Light-Clients in Browser eingebettet, auf Mobiltelefonen und vielleicht sogar auf noch kleineren Geräten wie Smartwatches ausgeführt werden. Das bedeutet, dass Ethereum-Wallets mit eingebetteten Clients auf einem Mobiltelefon laufen könnten. Das bedeutet, dass mobile Wallets viel dezentraler sein könnten, da sie für ihre Daten nicht auf zentralisierte Datenanbieter vertrauen müssten.

Eine Erweiterung davon ist die Ermöglichung von **Internet of Things (IoT)**-Geräten (Internet der Dinge). Ein Light-Client könnte verwendet werden, um schnell den Besitz eines Token-Guthabens oder NFTs nachzuweisen, mit allen Sicherheitsgarantien, die von den Sync-Komitees bereitgestellt werden, und so eine Aktion in einem IoT-Netzwerk auszulösen. Stellen Sie sich einen [Fahrradverleih](https://youtu.be/ZHNrAXf3RDE?t=929) vor, der eine App mit einem eingebetteten Light-Client verwendet, um schnell zu verifizieren, dass Sie das NFT des Verleihs besitzen, und wenn ja, ein Fahrrad für Sie freischaltet, mit dem Sie losfahren können!

Ethereum-Rollups würden ebenfalls von Light-Clients profitieren. Eines der großen Probleme für Rollups waren Hacks, die auf die Brücken abzielten, die den Transfer von Geldern vom Ethereum Mainnet zu einem Rollup ermöglichen. Eine Schwachstelle sind die Orakel, die Rollups verwenden, um zu erkennen, dass ein Benutzer eine Einzahlung in die Brücke getätigt hat. Wenn ein Orakel falsche Daten liefert, könnte es das Rollup täuschen, sodass es denkt, es gäbe eine Einzahlung in die Brücke, und fälschlicherweise Gelder freigeben. Ein in das Rollup eingebetteter Light-Client könnte verwendet werden, um sich vor korrumpierten Orakeln zu schützen, da die Einzahlung in die Brücke mit einem Beweis einhergehen könnte, der vom Rollup verifiziert werden kann, bevor Token freigegeben werden. Dasselbe Konzept könnte auch auf andere Interchain-Brücken angewendet werden.

Light-Clients könnten auch verwendet werden, um Ethereum-Wallets zu aktualisieren. Anstatt Daten zu vertrauen, die von einem RPC-Anbieter bereitgestellt werden, könnte Ihre Wallet die Ihnen präsentierten Daten mithilfe eines eingebetteten Light-Clients direkt verifizieren. Dies würde die Sicherheit Ihrer Wallet erhöhen. Wenn Ihr RPC-Anbieter unehrlich wäre und Ihnen falsche Daten liefern würde, könnte der eingebettete Light-Client Sie darauf hinweisen!

## Wie ist der aktuelle Stand der Light-Client-Entwicklung? {#current-state-of-development}

Es befinden sich mehrere Light-Clients in der Entwicklung, darunter Ausführungs-, Konsens- und kombinierte Ausführungs-/Konsens-Light-Clients. Dies sind die Light-Client-Implementierungen, die uns zum Zeitpunkt des Schreibens dieser Seite bekannt sind:

- [Lodestar](https://github.com/ChainSafe/lodestar/tree/unstable/packages/light-client): Konsens-Light-Client in TypeScript
- [Helios](https://github.com/a16z/helios): kombinierter Ausführungs- und Konsens-Light-Client in Rust
- [Geth](https://github.com/ethereum/go-ethereum/tree/master/beacon/light): Light-Modus für Ausführungsclient (in Entwicklung) in Go
- [Nimbus](https://nimbus.guide/el-light-client.html): Konsens-Light-Client in Nim

Unseres Wissens nach gilt noch keiner davon als produktionsreif.

Es wird auch viel daran gearbeitet, die Möglichkeiten zu verbessern, wie Light-Clients auf Ethereum-Daten zugreifen können. Derzeit verlassen sich Light-Clients auf RPC-Anfragen an Full Nodes unter Verwendung eines Client/Server-Modells, aber in Zukunft könnten die Daten auf dezentralere Weise über ein dediziertes Netzwerk wie das [Portal-Netzwerk](https://www.ethportal.net/) angefordert werden, das die Daten für Light-Clients über ein Peer-to-Peer-Gossip-Protokoll bereitstellen könnte.

Andere Punkte auf der [Roadmap](/roadmap/) wie [Verkle-Bäume](/roadmap/verkle-trees/) und [Zustandslosigkeit](/roadmap/statelessness/) werden die Sicherheitsgarantien von Light-Clients letztendlich an die von Full-Clients angleichen.

## Weiterführende Literatur {#further-reading}

- [Zsolt Felfodhi über Geth-Light-Clients](https://www.youtube.com/watch?v=EPZeFXau-RE)
- [Etan Kissling über Light-Client-Netzwerke](https://www.youtube.com/watch?v=85MeiMA4dD8)
- [Etan Kissling über Light-Clients nach dem Merge](https://www.youtube.com/watch?v=ZHNrAXf3RDE)
- [Piper Merriam: Der kurvenreiche Weg zu funktionalen Light-Clients](https://snakecharmers.ethereum.org/the-winding-road-to-functional-light-clients/)