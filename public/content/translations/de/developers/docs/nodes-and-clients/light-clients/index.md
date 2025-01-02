---
title: Leichte Clients
description: Einführung zu leichten Clients von Ethereum.
lang: de
---

Der Betrieb eines vollständigen Knotens ist die vertrauenswürdigste, dezentralste, privateste und zensurresistenteste Möglichkeit, um mit Ethereum zu interagieren. Mit einem vollständigen Knoten können Sie Ihre eigene Kopie der Blockchain behalten. Auf dieser können sie Abfragen direkt ausführen und Sie haben einen direkten Zugriff auf das Peer-to-Peer-Netzwerk von Ethereum. Jedoch erfordert der Betrieb eines vollständigen Knotens eine signifikante Menge an Arbeitsspeicher, Speicherplatz und CPU. Das bedeutet, dass es nicht für jeden möglich ist seinen eigenen Knoten zu betreiben. Es gibt mehrere Lösungen dazu in der Ethereum-Roadmap, dazu gehört auch die Zustandslosigkeit, jedoch sind diese noch Jahre von ihrer Implementierung entfernt. Die kurzfristige Lösung dazu ist, einige Vorteile eines vollständigen Knotens mit großen Leistungsverbesserungen, die es ermöglichen einen Knoten mit sehr geringen Hardware-Anforderungen zu betreiben, einzutauschen. Knoten, die diesen Kompromiss erzielen, werden leichte Knoten (Light Nodes) genannt.

## Was ist ein leichter Client {#what-is-a-light-client}

Ein leichter Knoten ist ein Knoten, der auf der Software eines leichten Clients betrieben werden kann. Statt lokale Kopien der gesamten Daten der Blockchain zu speichern und unabhängig alle Änderungen mitzuverfolgen, fragen sie die notwendigen Daten von irgendeinem Anbieter ab. Der Anbieter könnte eine direkte Verbindung zu einem vollständigen Knoten oder irgendein zentraler RPC-Server sein. Die Daten werden dann vom leichten Knoten verifiziert. Dadurch kann er mit der Spitze der Blockchain mithalten. Der leichte Knoten verarbeitet nur Block-Header und lädt gelegentlich die echten Inhalte des Blocks herunter. Die Leichtigkeit der Nodes kann variieren, abhängig von den Kombinationen der Light- und vollständigen Client-Software, die sie ausführen. Zum Beispiel würde die leichteste Konfiguration darin bestehen, einen leichten Ausführungs-, sowie Konsensclient zu betreiben. Es ist auch wahrscheinlich, dass viele Knoten sich entscheiden, einen leichten Konsensclient mit einem vollen Ausführungsclient oder andersherum zu betreiben.

## Wie funktionieren leichte Clients? {#how-do-light-clients-work}

Als Ethereum damit begann, einen auf Proof-of-Stake basierenden Konsensmechanismus zu nutzen, wurde neue Infrastruktur, vor allem für leichte Clients, aufgebaut. Das funktioniert, indem alle 1,1 Tage eine Teilmenge von 512 Validatoren als **Synchronisierungskomitee** ausgewählt werden. Das Synchronisierungskomitee unterschreibt den Header von den letzten Blöcken. Jeder Block-Header beinhaltet die gesammelten Unterschriften der Validatoren im Synchronisierungskomitee und ein „Bitfeld“, das zeigt, welche Validatoren unterschrieben haben und welche nicht. Jeder Header beinhaltet auch eine Liste von Validatoren, von denen erwartet wird, den nächsten Block zu unterschreiben. Das bedeutet, dass ein leichter Client schnell sehen kann, dass das Synchronisierungskomitee den empfangenen Daten zustimmt und dass sie auch überprüfen können, ob das Synchronisierungskomitee das Original ist, indem sie die empfangenen mit den im letzten Block erwarteten Daten vergleichen. So kann der leichte Client sein Wissen über den letzten Ethereum-Block immer wieder erneuern, ohne den Block selbst, sondern nur den Header, herunterzuladen.

Auf der Ausführungsebene gibt es keine einzige Spezifikation für einen leichten Ausführungsclient. Der Anwendungsbereich eines leichten Ausführungsclients kann ein „leichter Modus“ eines vollständigen Ausführungsclients sein, der über das gesamte EVM und alle Netzwerkfunktionen eines vollständigen Knotens verfügt, jedoch nur die Block Header verifiziert. Es kann jedoch auch ein stärker zerlegter Client sein, der sich stark darauf stützt, Anfragen an einen RPC-Anbieter weiterzuleiten, um mit Ethereum zu interagieren.

## Warum sind leichte Clients so wichtig? {#why-are-light-clients-important}

Leichte Clients sind wichtig, da sie Nutzern ermöglichen, eingehende Daten zu verifizieren, statt der Echtheit der Daten des Anbieters blind zu vertrauen. Dabei benötigen sie nur einen Bruchteil der rechnerischen Ressourcen eines vollständigen Knotens. Die Daten, die leichte Clients empfangen, können anhand von Block-Headern überprüft werden, von denen sie wissen, dass mindestens 2/3 einer zufälligen Menge von 512 Ethereum-Validatoren richtig unterschrieben wurden. Das ist ein sehr starker Beweis dafür, dass die Daten korrekt sind.

Der leichte Client nutzt nur eine kleine Menge an Rechenstärke, Arbeitsspeicher und Speicherplatz, deshalb kann er sogar auf einer Anwendung oder im Browser eines Mobiltelefons ausgeführt werden. Leichte Clients ermöglichen vertrauensminimierten Zugriff auf Ethereum, genauso reibungslos wie einfach einem Drittanbieter zu vertrauen.

Lassen Sie uns ein einfaches Beispiel nehmen. Stellen Sie sich vor, Sie wollen das Guthaben Ihres Accounts überprüfen. Dafür müssen sie eine Anfrage an einen Ethereum-Knoten stellen. Dieser Knoten wird seine lokale Kopie des Ethereum-Zustands nach Ihrem Guthaben überprüfen und dieses an Sie weiterleiten. Wenn Sie keinen direkten Zugriff auf einen Knoten haben, gibt es zentrale Betreiber, die diese Daten als Service anbieten. Sie können ihnen eine Anfrage schicken, die Betreiber überprüfen dann den Knoten und leiten die Ergebnisse an Sie weiter. Das Problem dabei ist, dass Sie dem Anbieter vertrauen müssen, Ihnen die korrekten Informationen zu geben. Sie wissen nie, ob die Informationen korrekt sind, wenn Sie sie nicht selbst verifizieren können.

Ein leichter Client behebt dieses Problem. Sie können die Daten immer noch von einem externen Anbieter abfragen, sobald Sie jedoch die Daten erhalten, kommen diese mit einem Beweis, den Ihr leichter Knoten anhand der Informationen, die er vom Block-Header erhalten hat, überprüft. Statt eines vertrauten Betreibers wird Ethereum die Richtigkeit Ihrer Daten überprüfen.

## Welche Innovationen ermöglichen leichte Clients? {#what-innovations-do-light-clients-enable}

Der Hauptvorteil von leichten Clients ist, dass mehr Menschen unabhängigen Zugriff auf Ethereum bekommen können. Dabei sind die Hardware-Anforderungen überschaubar und die Abhängigkeit von Dritten minimal. Das ist gut für Nutzer, da diese ihre eigenen Daten verifizieren können, und gut für das Netzwerk, da es mehr und vielfältige Knoten gibt, die die Blockchain verifizieren.

Die Möglichkeit, Ethereum-Knoten auf Geräten mit minimalem Speicherplatz, Arbeitsspeicher und Rechenleistung zu betreiben, ist einer der großen Innovationsbereiche, die von leichten Clients ermöglicht werden. Während Ethereum-Knoten heute große Mengen an Rechenressourcen benötigen, könnten leichte Clients in Browser eingebettet werden und auch auf Mobiltelefonen oder kleineren Geräten wie Smart Watches laufen. Das bedeutet, dass Ethereum Wallets mit integrierten Clients auch auf Mobiltelefonen betrieben werden könnten. Das bedeutet, dass mobile Wallets viel dezentraler sein könnten, da sie sich nicht auf einen Datenanbieter für ihre Daten verlassen müssen.

Eine Erweiterung davon ist das Ermöglichen von Geräten mit **Internet der Dinge (Internet of Things, IoT)**. Ein leichter Client könnte verwendet werden, um schnell das Eigentum an einem Token-Guthaben oder einem NFT beweisen zu können. Mit all den Sicherheiten, die Synchronisierungskomitees anbieten, könnten leichte Clients Veränderungen am IoT hervorrufen. Stellen Sie sich einen [Fahrradverleih](https://youtu.be/ZHNrAXf3RDE?t=929) vor, der eine Anwendung mit integriertem leichten Client nutzt, um schnell zu verifizieren, dass Sie ein NFT des Fahrradverleihs besitzen. Dadurch würde ein Fahrrad für Sie entsperrt werden und Sie könnten es nutzen!

Ethereum-Rollups würden ebenfalls von leichten Clients profitieren. Eines der großen Probleme für Rollups war, dass es bereits Angriffe auf die Brücken gab, die den Transfer von Anlagen vom Ethereum-Hauptnetz zu einem Rollup erlauben. Eine Schwachstelle sind die Oracles, die Rollups verwenden, um zu erkennen, ob ein Benutzer eine Einzahlung auf die Brücke vorgenommen hat. Wenn ein Oracle falsche Daten einspeist, könnte es dem Rollup vorgaukeln, dass eine Einzahlung auf die Brücke stattgefunden hat, und die Mittel fälschlicherweise freigeben. Ein in das Rollup eingebetteter leichter Client könnte zum Schutz vor korrupten Oracles verwendet werden, da die Einzahlung in die Brücke mit einem Nachweis versehen werden könnte, der vom Rollup vor der Freigabe von Token überprüft werden kann. Das gleiche Konzept könnte auch auf andere Brücken innerhalb der Blockchain angewendet werden.

Leichte Clients könnten auch dazu verwendet werden, Ethereum-Wallets zu aktualisieren. Anstatt den von einem RPC-Provider bereitgestellten Daten zu vertrauen, könnte Ihre Wallet die Ihnen präsentierten Daten direkt mit einem eingebetteten leichten Client verifizieren. Dies würde die Sicherheit Ihrer Wallet erhöhen. Wenn Ihr RPC-Anbieter unehrlich war und Ihnen falsche Daten geliefert hat, könnte der eingebettete leichte Client Sie darüber informieren!

## Wie ist der aktuelle Stand der Entwicklung von leichten Clients? {#current-state-of-development}

Es befinden sich mehrere leichte Clients in der Entwicklung, darunter Ausführungs-, Konsens- und kombinierte Ausführungs-/Konsens-Light-Clients. Dies sind die Light-Client-Implementierungen, von denen wir zum Zeitpunkt der Erstellung dieser Seite wissen:

- [Lodestar](https://github.com/ChainSafe/lodestar/tree/unstable/packages/light-client): leichter Konsensclient in TypeScript
- [Helios](https://github.com/a16z/helios): kombinierter leichter Ausführungs- und Konsensclient in Rust
- [Geth](https://github.com/ethereum/go-ethereum/tree/master/beacon/light): Light-Modus für Ausführungs-Client (in Entwicklung) in Go
- [Nimbus](https://nimbus.guide/el-light-client.html): Leichter Konsensclient in Nim

Unseres Wissens nach ist noch keiner dieser Clients produktionsreif.

Es wird auch intensiv daran gearbeitet, die Art und Weise zu verbessern, wie leichte Clients auf Ethereum-Daten zugreifen können. Derzeit verlassen sich leichte Clients bei RPC-Anfragen an Full Nodes, die ein Client/Server-Modell verwenden. In Zukunft könnten die Daten jedoch auf eine dezentralere Weise angefordert werden, indem ein dediziertes Netzwerk wie das [Portal-Netzwerk](https://www.ethportal.net/) verwendet wird, das die Daten über ein Peer-to-Peer Gossip-Protokoll an leichte Clients weiterleiten könnte.

Andere [Roadmap-Elemente](/roadmap/) wie [Verkle-Bäume](/roadmap/verkle-trees/) und [Zustandslosigkeit](/roadmap/statelessness/) werden schließlich dazu führen, dass die Sicherheitsgarantien von leichten Clients denen von vollständigen Clients entsprechen.

## Weiterführende Informationen {#further-reading}

- [Zsolt Felfodhi über Geth Light Clients](https://www.youtube.com/watch?v=EPZeFXau-RE)
- [Etan Kissling über die Vernetzung von Light Clients](https://www.youtube.com/watch?v=85MeiMA4dD8)
- [Etan Kissling über Light Clients nach der Zusammenführung](https://www.youtube.com/watch?v=ZHNrAXf3RDE)
- [Piper Merriam: Der beschwerliche Weg zu funktionalen Light Clients](https://snakecharmers.ethereum.org/the-winding-road-to-functional-light-clients/)
